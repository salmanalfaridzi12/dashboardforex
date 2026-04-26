import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Setup Supabase Admin Client using SERVICE_ROLE_KEY to bypass RLS
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://mock.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'mock_service_key';
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { autoRefreshToken: false, persistSession: false }
});

// Define your expected secure key here or in your .env variables
const API_KEY = process.env.BOT_API_KEY || 'hitcher-secure-key';

export async function POST(request: Request) {
  try {
    // 1. Pengecekan API Key (x-api-key) dari MT5
    const apiKey = request.headers.get('x-api-key');
    if (apiKey !== API_KEY) {
      return NextResponse.json({ error: 'Unauthorized: Invalid API Key' }, { status: 401 });
    }

    // 2. Extract and validate JSON Data
    const body = await request.json();
    const { balance, equity, is_active, trade_data } = body;

    // 3. Pastikan parameter inti tidak undefined
    if (balance === undefined || equity === undefined || is_active === undefined) {
      return NextResponse.json({ error: 'Bad Request: Missing core status parameters' }, { status: 400 });
    }

    // 4. Proses is_active sebagai boolean murni untuk menangkal potensi string "true"/"false" dari MT5
    const isActiveBool = is_active === true || is_active === 'true' || is_active === 1;

    // 5. Update bot_status (Targeting row ID 1) otomatis bypass RLS via Service Key
    const { error: botError } = await supabaseAdmin
      .from('bot_status')
      .update({ 
        balance: Number(balance), 
        equity: Number(equity), 
        is_active: isActiveBool, 
        last_ping: new Date().toISOString() 
      })
      .eq('id', 1);

    if (botError) {
      console.error('Bot Status Update Error:', botError);
      return NextResponse.json({ error: 'Database Error: Failed to update bot status' }, { status: 500 });
    }

    // 6. Optionally Upsert executing Trade Data if provided
    if (trade_data && trade_data.ticket_id) {
      const { ticket_id, type, lot, open_price, profit } = trade_data;
      
      const { error: tradeError } = await supabaseAdmin
        .from('trades')
        .upsert({ 
          ticket_id, 
          type, 
          lot: Number(lot), 
          open_price: Number(open_price), 
          profit: Number(profit),
          updated_at: new Date().toISOString() 
        }, { onConflict: 'ticket_id' }); // Replaces row if ticket_id already exists

      if (tradeError) {
        console.error('Trade Upsert Error:', tradeError);
        return NextResponse.json({ error: 'Database Error: Failed to log trade execution' }, { status: 500 });
      }
    }

    // 7. Successful Execution -> Tell MT5 it was received
    return NextResponse.json({ success: true, message: 'Bot state synchronized' }, { status: 200 });

  } catch (error) {
    console.error('Webhook Runtime Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// Define your expected secure key here or in your .env variables
const API_KEY = process.env.BOT_API_KEY || 'hitcher-secure-key';

export async function POST(request: Request) {
  try {
    // 1. Authenticate Request
    const apiKey = request.headers.get('x-api-key');
    if (apiKey !== API_KEY) {
      return NextResponse.json({ error: 'Unauthorized: Invalid API Key' }, { status: 401 });
    }

    // 2. Extract and validate JSON Data
    const body = await request.json();
    const { balance, equity, is_active, trade_data } = body;

    // Reject if core properties are missing
    if (balance === undefined || equity === undefined || is_active === undefined) {
      return NextResponse.json({ error: 'Bad Request: Missing core status parameters' }, { status: 400 });
    }

    // 3. Update the bot's global status (Targeting row ID 1)
    const { error: botError } = await supabase
      .from('bot_status')
      .update({ 
        balance, 
        equity, 
        is_active, 
        last_ping: new Date().toISOString() 
      })
      .eq('id', 1);

    if (botError) {
      console.error('Bot Status Update Error:', botError);
      return NextResponse.json({ error: 'Database Error: Failed to update bot status' }, { status: 500 });
    }

    // 4. Optionally Upsert executing Trade Data if provided
    if (trade_data && trade_data.ticket_id) {
      const { ticket_id, type, lot, open_price, profit } = trade_data;
      
      const { error: tradeError } = await supabase
        .from('trades')
        .upsert({ 
          ticket_id, 
          type, 
          lot, 
          open_price, 
          profit,
          updated_at: new Date().toISOString() 
        }, { onConflict: 'ticket_id' }); // Replaces row if ticket_id already exists

      if (tradeError) {
        console.error('Trade Upsert Error:', tradeError);
        return NextResponse.json({ error: 'Database Error: Failed to log trade execution' }, { status: 500 });
      }
    }

    // 5. Successful Execution -> Tell MT5 it was received
    return NextResponse.json({ success: true, message: 'Bot state synchronized' }, { status: 200 });

  } catch (error) {
    console.error('Webhook Runtime Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

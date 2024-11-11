'use server'

// import OpenAI from 'openai';
import { airbenderOpenAI } from '../airbender-utils';
import { getSessionFromServer } from './airbender-get-session';

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

type ChatMessage = {
  role: 'user' | 'assistant' | 'system';
  content: string;
};

export async function chatCompletion(messages: ChatMessage[]) {
    
  try {
    const session: any = await getSessionFromServer("user1");

    if ('status' in session && session.status === 'error') {
      return {
        success: false,
        message: session.message,
      };
    }

    const completion = await airbenderOpenAI.chat.completions.create({
      messages,
      model: "gpt-4o-mini",
    }, {
        sessionID: session.id,
    });

    return {
      success: true,
      message: completion.choices[0].message.content,
    };
  } catch (error) {
    console.error('OpenAI API Error:', error);
    return {
      success: false,
      error: 'Failed to get chat completion',
    };
  }
}

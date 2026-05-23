import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

export async function POST(req: Request) {
  try {
    const { review, tone } = await req.json();

    if (!review || review.trim() === '') {
      return NextResponse.json({ error: 'Review text cannot be empty.' }, { status: 400 });
    }

    let toneInstruction = '';
    if (tone === 'professional') {
      toneInstruction = 'Use a polished, courteous, and traditional hospitality tone.';
    } else if (tone === 'casual') {
      toneInstruction = 'Use a laid-back, direct, and conversational tone, as if texting a regular customer.';
    } else if (tone === 'witty') {
      toneInstruction = 'Use an upbeat, lively tone with a bit of personality and light humor.';
    } else {
      toneInstruction = 'Use a warm, welcoming, and genuinely appreciative tone.';
    }

    const response = await anthropic.messages.create({
      // 🚀 UPDATED MODEL NAME STRING (Fixes the 404 crash)
      model: 'claude-sonnet-4-6', 
      max_tokens: 1024,
      system: `You are Gary Thompson, the owner of Rocket Beans, responding directly to a guest review. 
CRITICAL INSTRUCTIONS FOR AUTHENTICITY & BREVITY:
- Be exceptionally brief. Limit the entire response to 1 or 2 short paragraphs maximum (around 3-5 sentences total).
- Sound human and authentic. Avoid typical AI hospitality fluff like "Dear Valued Guest", "We pour our hearts into", "words truly mean the world", or generic corporate sign-offs.
- STRICT PUNCTUATION RULE: Do not use em dashes (—) or en dashes (–) under any circumstance. Separate thoughts using standard periods or commas.
- Do not use more than one emoji. Do not use exclamation points in every sentence.
- Address 1 specific compliment or critique mentioned in the review naturally, then stop.
- ${toneInstruction}
- Sign off simply with: "Gary Thompson, Rocket Beans"`,
      messages: [
        { role: 'user', content: `Write a brief reply to this review:\n\n"${review}"` }
      ],
    });

    // Extract the text block safely from the Anthropic array structure
    let textResponse = '';
    const firstBlock = response.content[0]; 

    if (firstBlock && firstBlock.type === 'text') {
      textResponse = firstBlock.text;
    } else {
      throw new Error('Unexpected Claude API response format structure.');
    }

    /* 
     * 🛠️ HARD BACKEND REGEX SANITIZATION LAYER
     * This regex scans your textResponse string for all em dashes (—) and en dashes (–) 
     * and forces them into a standard comma and space before sending it to the dashboard frontend.
     */
    textResponse = textResponse.replace(/[—–]/g, ', ');

    // Return the clean, dash-free response package safely to your Next.js frontend dashboard
    return NextResponse.json({ text: textResponse });

  } catch (error: any) {
    console.error('--- DETAILED CLAUDE API ROUTE ERROR ---');
    console.error(error);
    return NextResponse.json(
      { error: `Claude API Failure: ${error?.message || 'Unknown Server Error'}` },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
import {
  runResearch,
  runBlueprint,
  runGenerate,
  runImage,
  runChat,
} from '@/lib/newsPipeline';

export const dynamic = 'force-dynamic';
export const maxDuration = 300;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { mode } = body;

    if (mode === 'check') {
      const geminiOk = !!process.env.GEMINI_API_KEY;
      if (!geminiOk) {
        return NextResponse.json({ error: 'no_key', gemini: false, anthropic: true });
      }
      return NextResponse.json({ ok: true, gemini: true, anthropic: true });
    }

    if (mode === 'research') {
      const research = await runResearch({ topic: body.topic, notes: body.notes });
      return NextResponse.json({ research });
    }

    if (mode === 'blueprint') {
      const blueprint = await runBlueprint({
        researchContext: body.researchContext,
        topic: body.topic,
        contentType: body.contentType,
      });
      return NextResponse.json({ blueprint });
    }

    if (mode === 'generate') {
      const content = await runGenerate({
        topic: body.topic,
        contentType: body.contentType,
        sourceContext: body.sourceContext,
        researchContext: body.researchContext,
        blueprintContext: body.blueprintContext,
      });
      return NextResponse.json({
        content,
        research: body.researchContext,
        blueprint: body.blueprintContext,
      });
    }

    if (mode === 'image') {
      const { images, featuredImagePath } = await runImage({
        blueprintContext: body.blueprintContext,
        researchContext: body.researchContext,
        topic: body.topic,
        category: body.category,
      });
      return NextResponse.json({ images, featuredImagePath });
    }

    if (mode === 'chat') {
      const content = await runChat(body.messages, body.currentArticle);
      return NextResponse.json({ content });
    }

    return NextResponse.json({ error: 'Unknown mode' }, { status: 400 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('[news-generator]', msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

import { NextResponse } from "next/server";

type IntelligenceRequest = {
  companyName: string;
  industry: string;
  productCategory: string;
  opportunityLayer: string;
  operationalPain: string;
  uxProductProblem: string;
  decisionMaker?: {
    name: string;
    role: string;
    relevance: string;
  };
};

const systemPrompt = [
  "Kudreto için Türkçe, sakin, stratejik ve insani satış içgörüsü üreten bir analiz motorusun.",
  "Kudreto klasik ajans değildir; stratejik ürün tasarım partneri, operasyonel UX düşünürü, sistem odaklı danışman, async ürün işbirlikçisi ve AI-native ürün stratejistidir.",
  "Hem stratejik/operasyonel dönüşüm fırsatlarını hem de arayüz, redesign, tasarım sistemi ve premium visual design fırsatlarını değerli gör.",
  "Yanıtı kısa JSON olarak ver: operationalInsight, uxOpportunity, positioningAngle, outreachMessage.",
  "Agresif satış dili, startup klişesi, fake corporate wording ve uzun açıklama kullanma.",
].join("\n");

const responseCache = new Map<string, { expiresAt: number; payload: Record<string, unknown> }>();
const dailyUsage = {
  date: new Date().toISOString().slice(0, 10),
  count: 0,
};

export async function POST(request: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      {
        error: "ANTHROPIC_API_KEY tanımlı değil.",
      },
      { status: 400 },
    );
  }

  const body = (await request.json()) as IntelligenceRequest;
  const model = process.env.ANTHROPIC_MODEL ?? "claude-3-5-haiku-20241022";
  const maxTokens = Number(process.env.ANTHROPIC_MAX_TOKENS ?? 420);
  const temperature = Number(process.env.ANTHROPIC_TEMPERATURE ?? 0.2);
  const cacheTtlMs = Number(process.env.ANTHROPIC_CACHE_TTL_MS ?? 30 * 60 * 1000);
  const dailyRequestLimit = Number(process.env.ANTHROPIC_DAILY_REQUEST_LIMIT ?? 50);
  const cacheKey = JSON.stringify({ model, maxTokens, temperature, body });
  const cached = responseCache.get(cacheKey);

  if (cached && cached.expiresAt > Date.now()) {
    return NextResponse.json({
      cached: true,
      model,
      ...cached.payload,
    });
  }

  const today = new Date().toISOString().slice(0, 10);

  if (dailyUsage.date !== today) {
    dailyUsage.date = today;
    dailyUsage.count = 0;
  }

  if (dailyUsage.count >= dailyRequestLimit) {
    return NextResponse.json(
      {
        error: "Günlük Anthropic istek limiti doldu.",
        dailyRequestLimit,
      },
      { status: 429 },
    );
  }

  const prompt = [
    `Şirket: ${body.companyName}`,
    `Sektör: ${body.industry}`,
    `Ürün kategorisi: ${body.productCategory}`,
    `Fırsat katmanı: ${body.opportunityLayer}`,
    `Operasyonel problem: ${body.operationalPain}`,
    `UX/ürün problemi: ${body.uxProductProblem}`,
    body.decisionMaker
      ? `Kritik kişi: ${body.decisionMaker.name} / ${body.decisionMaker.role} / ${body.decisionMaker.relevance}`
      : "",
  ].join("\n");

  const anthropicResponse = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model,
      max_tokens: maxTokens,
      temperature,
      system: [
        {
          type: "text",
          text: systemPrompt,
          cache_control: { type: "ephemeral" },
        },
      ],
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    }),
  });

  if (!anthropicResponse.ok) {
    const errorBody = await anthropicResponse.json().catch(() => null);

    return NextResponse.json(
      {
        error: "Anthropic API isteği başarısız oldu.",
        status: anthropicResponse.status,
        providerError: errorBody?.error?.message,
      },
      { status: anthropicResponse.status },
    );
  }

  dailyUsage.count += 1;

  const data = await anthropicResponse.json();
  const text = data?.content?.find((item: { type?: string }) => item.type === "text")?.text;
  const payload = {
    cached: false,
    usage: data?.usage,
    text,
  };

  responseCache.set(cacheKey, {
    expiresAt: Date.now() + cacheTtlMs,
    payload,
  });

  return NextResponse.json({
    model,
    ...payload,
  });
}

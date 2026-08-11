import { NextRequest, NextResponse } from "next/server";

const UPSTREAM_BASE_URL = process.env.HOLOCARE_API_URL || "https://api.holocare.app";

type RouteContext = {
  params: Promise<{ path?: string[] }>;
};

function buildUpstreamUrl(path: string[], request: NextRequest) {
  const upstreamUrl = new URL(`/api/assessment-campaigns/${path.join("/")}`, UPSTREAM_BASE_URL);
  request.nextUrl.searchParams.forEach((value, key) => {
    upstreamUrl.searchParams.append(key, value);
  });
  return upstreamUrl;
}

async function proxyAssessmentCampaign(request: NextRequest, context: RouteContext) {
  const { path = [] } = await context.params;
  const upstreamUrl = buildUpstreamUrl(path, request);

  try {
    const upstreamResponse = await fetch(upstreamUrl, {
      method: request.method,
      headers: {
        accept: request.headers.get("accept") || "application/json",
        "content-type": request.headers.get("content-type") || "application/json",
        cookie: request.headers.get("cookie") || "",
      },
      body: ["GET", "HEAD"].includes(request.method) ? undefined : await request.text(),
      cache: "no-store",
    });

    const response = new NextResponse(await upstreamResponse.text(), {
      status: upstreamResponse.status,
      headers: {
        "content-type": upstreamResponse.headers.get("content-type") || "application/json",
      },
    });

    const setCookie = upstreamResponse.headers.get("set-cookie");
    if (setCookie) {
      response.headers.set("set-cookie", setCookie);
    }

    return response;
  } catch (error) {
    console.error("[TRUEVINE_PROXY] assessment campaign proxy failed", error);
    return NextResponse.json(
      { success: false, error: "Assessment service unavailable" },
      { status: 502 }
    );
  }
}

export const GET = proxyAssessmentCampaign;
export const POST = proxyAssessmentCampaign;
export const PUT = proxyAssessmentCampaign;
export const PATCH = proxyAssessmentCampaign;
export const DELETE = proxyAssessmentCampaign;
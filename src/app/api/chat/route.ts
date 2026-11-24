import { completeWithGateway } from "@/lib/chat/gateway";
import { handleChatPost } from "@/lib/chat/handler";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  return handleChatPost(request, completeWithGateway);
}

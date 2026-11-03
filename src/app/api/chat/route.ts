import { handleChatPost } from "@/lib/chat/handler";
import { completeWithGateway } from "@/lib/chat/gateway";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  return handleChatPost(request, completeWithGateway);
}

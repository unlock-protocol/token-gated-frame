import { renderMessageForFid } from "@/app/api/[message]/render";

export async function GET(
  request: Request,
  { params }: { params: { message: string } }
) {
  const u = new URL(request.url);
  return renderMessageForFid(u.origin, params.message);
}

import { renderMessageForFid } from "@/app/api/[message]/render";

export async function GET(
  request: Request,
  { params }: { params: { message: string } }
) {
  const u = new URL(request.url);
  const fid = u.searchParams.get("fid");
  return renderMessageForFid(u.origin, params.message, fid);
}

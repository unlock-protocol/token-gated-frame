import { render } from "@/app/api/[message]/render";
import { getMessage } from "@/lib/messages";

export async function GET(
  request: Request,
  { params }: { params: { message: string } }
) {
  const u = new URL(request.url);

  const message = await getMessage(params.message);
  if (!message) {
    return new Response("Message not found", { status: 404 });
  }

  return render(u.origin, message, "pending");
}

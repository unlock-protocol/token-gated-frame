"use server";

import { FrameFields } from "@/types";
import { Database } from "@/types";
import { createKysely } from "@vercel/postgres-kysely";

const db = createKysely<Database>();

export async function createFrame(_prev: any, form: FormData) {
  // TODO: perform validation!

  const saved = await db
    .insertInto("frames")
    .values({
      // @ts-expect-error author should not be null
      author: form.get("author"),
      // @ts-expect-error frame format may not match, but it's json!
      frame: {
        title: form.get("frame.title"),
        description: form.get("frame.description"),
        body: form.get("frame.body"),
        denied: form.get("frame.denied"),
        gate: {
          network: Number(form.get("frame.gate.network")),
          type: form.get("frame.gate.type"),
          token: form.get("frame.gate.token"),
          balance: form.get("frame.gate.balance"),
          contract: form.get("frame.gate.contract"),
        },
        checkoutUrl: form.get("frame.checkoutUrl"),
      } as FrameFields,
    })
    .returning(["id"])
    .executeTakeFirst();

  return saved;
}

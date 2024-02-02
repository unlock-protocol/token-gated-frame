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
        body: form.get("frame.body"),
        title: form.get("frame.title"),
        description: form.get("frame.description"),
        checkoutUrl: form.get("frame.checkoutUrl"),
        gate: {
          contract: form.get("frame.gate.contract"),
          network: Number(form.get("frame.gate.network")),
        },
      } as FrameFields,
    })
    .returning(["id"])
    .executeTakeFirst();

  return saved;
}

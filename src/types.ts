import { UUID } from "crypto";
import {
  ColumnType,
  Generated,
  Insertable,
  JSONColumnType,
  Selectable,
  Updateable,
} from "kysely";

export interface Database {
  frames: FrameTable;
}

export interface FrameFields {
  body: string;
  title: string;
  description: string;
  checkoutUrl: string;
  gate: {
    contract: string;
    network: number;
  };
}

export interface FrameTable {
  id: Generated<UUID>;

  author: string;

  createdAt: ColumnType<Date, string | undefined, never>;
  updatedAt: ColumnType<Date, string | undefined, never>;

  frame: JSONColumnType<FrameFields>;
}

export type Frame = Selectable<FrameTable>;
export type NewFrame = Insertable<FrameTable>;
export type FrameUpdate = Updateable<FrameTable>;

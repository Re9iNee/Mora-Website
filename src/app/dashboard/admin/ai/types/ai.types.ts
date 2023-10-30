import { AI, Tag } from "@prisma/client";

export interface AIWithTags extends AI {
  tags: Tag[];
}

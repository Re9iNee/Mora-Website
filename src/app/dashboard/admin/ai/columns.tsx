"use client";

import { ColumnDef } from "@tanstack/react-table";
import { AI } from "./data/schema";

export const columns: ColumnDef<AI>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "complexity_level",
    header: "Complexity Level",
  },
  {
    accessorKey: "date_created",
    header: "Date Created",
  },
  {
    accessorKey: "tags",
    header: "Tags",
  },
  {
    accessorKey: "date_updated",
    header: "Date Updated",
  },
];

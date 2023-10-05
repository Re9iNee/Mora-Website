"use client";

import { ColumnDef } from "@tanstack/react-table";
import { AI } from "./data/schema";
import { Button } from "@/components/ui/button";
import { Delete, DeleteIcon, Trash, Trash2 } from "lucide-react";

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
  {
    id: "delete",
    cell: ({ row }) => (
      <Button variant='outline' size='icon'>
        <Trash className='h-4 w-4' />
      </Button>
    ),
  },
];

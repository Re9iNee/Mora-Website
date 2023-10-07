"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef, Row } from "@tanstack/react-table";
import { Trash } from "lucide-react";
import { AI } from "./data/schema";
import { deleteAiById } from "@/services/ai.service";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

const deleteAi = (row: Row<AI>) => {
  const id = row.original.id;
  if (!id) return;

  deleteAiById(id);
};

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
      <Button
        onClick={() => {
          deleteAi(row);
        }}
        variant='outline'
        size='icon'
      >
        <Trash className='h-4 w-4' />
      </Button>
    ),
  },
];

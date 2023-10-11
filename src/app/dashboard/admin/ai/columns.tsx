"use client";

import { Button } from "@/components/ui/button";
import { deleteAiById } from "@/services/ai.service";
import { ColumnDef, Row } from "@tanstack/react-table";
import { Trash } from "lucide-react";
import { AI } from "./data/schema";
import Link from "next/link";

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
    cell: ({ row }) => {
      // show date in local format
      const date = new Date(row.original.date_created);
      return date.toLocaleDateString();
    },
  },
  {
    accessorKey: "tags",
    header: "Tags",
  },
  {
    accessorKey: "date_updated",
    header: "Date Updated",
    cell: ({ row }) => {
      // show date in local format
      const date = new Date(row.original.date_updated);
      return date.toLocaleDateString();
    },
  },
  {
    id: "edit",
    cell: ({ row }) => (
      <Button variant='outline'>
        <Link href={`./ai/${row.original.slug}/`} replace={false}>
          Edit
        </Link>
      </Button>
    ),
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

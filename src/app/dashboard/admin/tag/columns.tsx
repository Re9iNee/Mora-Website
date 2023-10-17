"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef, Row } from "@tanstack/react-table";
import { Trash } from "lucide-react";

import { deleteTagById } from "@/services/tag.service";
import Link from "next/link";
import { Tag } from "./schema";
import { toast } from "@/components/ui/use-toast";

const deleteTag = (row: Row<Tag>) => {
  const id = row.original.id;
  if (!id) return;

  deleteTagById(id)
    .then(() => {
      toast({
        title: "Tag Deleted",
      });
    })
    .catch(() => {
      toast({ title: "Error deleting tag" });
    });
};

export const columns: ColumnDef<Tag>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    id: "edit",
    cell: ({ row }) => (
      <Button variant='outline'>
        <Link href={`./tag/${row.original.name}/`} replace={false}>
          Edit
        </Link>
      </Button>
    ),
  },
  {
    id: "delete",
    cell: ({ row }) => (
      <Button
        size='icon'
        variant='outline'
        onClick={() => {
          deleteTag(row);
        }}
      >
        <Trash className='h-4 w-4' />
      </Button>
    ),
  },
];

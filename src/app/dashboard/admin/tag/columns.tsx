"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef, Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { deleteTagById } from "@/services/tag.service";
import Link from "next/link";
import { Tag } from "./schema";
import { toast } from "@/components/ui/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Router from "next/router";

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
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const tag = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant={"ghost"}
              className='h-8 w-8 p-0'
              data-cy='action-menu'
            >
              <span className='sr-only'>Open menu</span>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(tag.id)}
            >
              Copy Tag Id
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              data-cy='delete-btn'
              className='text-red-600 cursor-pointer'
              onClick={() => deleteTag(row)}
            >
              Delete
            </DropdownMenuItem>

            <Link
              replace={false}
              data-cy='edit-link'
              href={`./tag/${row.original.id}/`}
            >
              <DropdownMenuItem className='cursor-pointer'>
                Edit
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

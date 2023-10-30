"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteAiById } from "@/services/ai.service";
import { ColumnDef, Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { AIWithTags } from "./types/ai.types";

const deleteAi = (row: Row<AIWithTags>) => {
  const id = row.original.id;
  if (!id) return;

  deleteAiById(id);
};

export const columns: ColumnDef<AIWithTags>[] = [
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
    cell: ({ row }) => (
      <div className='flex flex-wrap gap-1'>
        {row.original.tags.map((tag) => (
          <Badge variant={"outline"} key={tag.name}>
            {tag.name}
          </Badge>
        ))}
      </div>
    ),
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
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const ai = row.original;

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
              onClick={() => navigator.clipboard.writeText(ai.id)}
            >
              Copy AI Id
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              data-cy='delete-btn'
              className='text-red-600 cursor-pointer'
              onClick={() => deleteAi(row)}
            >
              Delete
            </DropdownMenuItem>

            <Link
              replace={false}
              data-cy='edit-link'
              href={`./ai/${row.original.slug}/`}
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

"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef, Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/use-toast";
import { deleteQuestionById } from "@/services/question.service";
import Link from "next/link";
import { Question } from "./schema";

const deleteQuestion = (row: Row<Question>) => {
  const id = row.original.id;
  if (!id) return;

  deleteQuestionById(id)
    .then(() => {
      toast({
        title: "Question Deleted",
      });
    })
    .catch(() => {
      toast({ title: "Error deleting Question" });
    });
};

export const columns: ColumnDef<Question>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const question = row.original;

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
              onClick={() => navigator.clipboard.writeText(question.id)}
            >
              Copy Question Id
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              data-cy='delete-btn'
              className='text-red-600 cursor-pointer'
              onClick={() => deleteQuestion(row)}
            >
              Delete
            </DropdownMenuItem>

            <Link
              replace={false}
              data-cy='edit-link'
              href={`./question/${row.original.id}/`}
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

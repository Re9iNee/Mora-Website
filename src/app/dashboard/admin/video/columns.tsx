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
import { deleteVideoById } from "@/services/video.service";
import Link from "next/link";
import { Video } from "./schema";
import { Badge } from "@/components/ui/badge";

const deleteVideo = (row: Row<Video>) => {
  const id = row.original.id;
  if (!id) return;

  deleteVideoById(id)
    .then(() => {
      toast({
        title: "Video Deleted",
      });
    })
    .catch(() => {
      toast({ title: "Error deleting Video" });
    });
};

export const columns: ColumnDef<Video>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    id: "url",
    header: "Link",
    cell: ({ row }) => {
      const video = row.original;
      return (
        <Link
          href={video.url}
          target='_blank'
          data-cy='video-link'
          className='text-blue-600 hover:text-blue-800'
        >
          {video.url}
        </Link>
      );
    },
  },
  {
    id: "ais",
    header: "Connected AIs",
    cell: ({ row }) => {
      const video = row.original;
      return (
        <div className='flex flex-wrap gap-1'>
          {video.ais.map((ai) => (
            <Link key={ai.slug} href={`/dashboard/admin/ai/${ai.slug}`}>
              <Badge>{ai.title}</Badge>
            </Link>
          ))}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const video = row.original;

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
              onClick={() => navigator.clipboard.writeText(video.id)}
            >
              Copy Video Id
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              data-cy='delete-btn'
              className='text-red-600 cursor-pointer'
              onClick={() => deleteVideo(row)}
            >
              Delete
            </DropdownMenuItem>

            <Link
              replace={false}
              data-cy='edit-link'
              href={`./video/${row.original.id}/`}
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

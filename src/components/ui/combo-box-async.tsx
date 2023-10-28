"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown } from "lucide-react";
import { ControllerRenderProps, UseFormReturn, useForm } from "react-hook-form";
import * as z from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";
import { AI } from "@/app/dashboard/admin/ai/data/schema";
import { useEffect, useState } from "react";
import { Video } from "@prisma/client";
import { getVideosByName } from "@/services/video.service";

const languages = [
  { label: "English", value: "en" },
  { label: "French", value: "fr" },
  { label: "German", value: "de" },
  { label: "Spanish", value: "es" },
  { label: "Portuguese", value: "pt" },
  { label: "Russian", value: "ru" },
  { label: "Japanese", value: "ja" },
  { label: "Korean", value: "ko" },
  { label: "Chinese", value: "zh" },
] as const;

type Props = {
  form: UseFormReturn<AI>;
  field: ControllerRenderProps<AI, "video">;
};

export function ComboboxForm({ field, form }: Props) {
  const [data, setData] = useState<any>([]);
  useEffect(() => {
    getVideosByName("").then((data) => setData(data));
  }, []);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  return (
    <Popover open={isPopoverOpen}>
      <PopoverTrigger onClick={() => setIsPopoverOpen(true)} asChild>
        <FormControl>
          <Button
            variant='outline'
            role='combobox'
            className={cn(
              "w-[200px] justify-between",
              !field.value && "text-muted-foreground"
            )}
          >
            {field.value
              ? data.find((video: any) => video.id === field.value)?.name
              : "Select language"}
            <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className='w-[200px] p-0'>
        <Command>
          <CommandInput placeholder='Search language...' />
          <CommandEmpty>No language found.</CommandEmpty>
          <CommandGroup>
            {data.map((video: any) => (
              <CommandItem
                value={video.id}
                key={video.id}
                onSelect={() => {
                  //   form.setValue("video", language.value);
                  field.onChange(video.id);
                  setIsPopoverOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    video.id === field.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {video.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

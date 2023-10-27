"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Tag, TagSchema } from "./schema";
import { ErrorToast, SuccessToast } from "../components/toast";

type Props = {
  initialValues?: Tag;
  actionFn: (data: Tag, id?: string) => Promise<Tag>;
};

function TagForm({ initialValues, actionFn }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<Tag>({
    defaultValues: { ...initialValues },
    mode: "onChange",
    resolver: zodResolver(TagSchema),
  });

  const submitHandler: SubmitHandler<Tag> = async (data) => {
    setIsLoading(true);

    try {
      const result = await actionFn(data, initialValues?.id);
      SuccessToast({ moduleName: "Tag", result, isUpdating: !!initialValues });
    } catch (e) {
      ErrorToast({ moduleName: "tag", isUpdating: !!initialValues });
    }

    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form
        name='tag-form'
        data-cy='tag-form'
        onSubmit={form.handleSubmit(submitHandler)}
        className='space-y-8'
      >
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Enter Tag Name</FormLabel>
              <FormControl>
                <Input
                  required
                  data-cy='name'
                  placeholder='Enter Tag Name'
                  {...field}
                ></Input>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type='submit'
          data-cy='submit-btn'
          disabled={isLoading}
          aria-disabled={isLoading}
        >
          {isLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
          {initialValues ? "Update Tag" : "Create Tag"}
        </Button>
      </form>
    </Form>
  );
}

export default TagForm;

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
import { createTag } from "@/services/tag.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Tag, TagSchema } from "./schema";

type Props = {
  initialValues?: Tag;
};

function TagsForm({ initialValues }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const form = useForm<Tag>({
    defaultValues: { ...initialValues },
    mode: "onChange",
    resolver: zodResolver(TagSchema),
  });

  const submitHandler: SubmitHandler<Tag> = async (data) => {
    setIsLoading(true);
    const result = await createTag(data);
    setIsLoading(false);
    // TODO Navigate back to the list page
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
        <Button type='submit' aria-disabled={isLoading}>
          {isLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
          Create Tag
        </Button>
      </form>
    </Form>
  );
}

export default TagsForm;

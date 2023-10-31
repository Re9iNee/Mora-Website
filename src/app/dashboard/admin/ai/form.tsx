"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ComplexityLevel, AI as PrismaAi } from "@prisma/client";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { ErrorToast, SuccessToast } from "../components/toast";
import TagSelect from "../tag/select";
import VideoSelect from "../video/select";
import { AI, AiSchema } from "./data/schema";
import { AIModel } from "./types/ai.types";
import { FormProps } from "../types/admin.dashboard.types";

// This can come from your database or API.
const defaultValues: Partial<AIModel> = {
  tags: [],
  version: "",
};

function AiForm({ initialValues, actionFn }: FormProps<PrismaAi, AI>) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<AI>({
    defaultValues: { ...defaultValues, ...initialValues } as AI,
    mode: "onChange",
    resolver: zodResolver(AiSchema),
  });

  const submitHandler: SubmitHandler<AI> = async (data) => {
    setIsLoading(true);

    try {
      const result = await actionFn(data, initialValues?.id);
      SuccessToast({ moduleName: "AI", result, isUpdating: !!initialValues });
    } catch (e) {
      ErrorToast({ moduleName: "AI", isUpdating: !!initialValues });
    }

    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form
        name='ai-form'
        data-cy='ai-form'
        className='space-y-8'
        onSubmit={form.handleSubmit(submitHandler)}
      >
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                {/* TODO: ON change auto complete slug input  */}
                <Input
                  required
                  data-cy='title'
                  placeholder='Enter AI Name'
                  {...field}
                />
              </FormControl>
              <FormDescription>This is AI public display name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name='video'
          control={form.control}
          render={({ field }) => <VideoSelect field={field} />}
        />
        <FormField
          control={form.control}
          name='slug'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug</FormLabel>
              <FormControl>
                <Input
                  data-cy='slug'
                  placeholder='Enter Slug'
                  required
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Slug must be unique. it is used for direct url to AI
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='usage_link'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Usage Link</FormLabel>
              <FormControl>
                <Input
                  data-cy='usage_link'
                  placeholder='https://example.com/app#'
                  {...field}
                />
              </FormControl>
              <FormDescription>This links directly to use AI.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='origin_website'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Origin Website</FormLabel>
              <FormControl>
                <Input
                  data-cy='origin_website'
                  placeholder='https://example.com'
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This links to the original AI Website
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='version'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Version</FormLabel>
              <FormControl>
                <Input data-cy='version' placeholder='1.0.0' {...field} />
              </FormControl>
              <FormDescription>AI Version</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <FormField
          control={form.control}
          name='AI_release_date'
          render={({ field }) => (
            <FormItem>
              <FormLabel>AI Release Date</FormLabel>
              <FormControl>
                <DatePicker />
              </FormControl>
              <FormDescription>AI Release Date</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        <FormField
          control={form.control}
          name='complexity_level'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Complexity Level</FormLabel>
              <Select defaultValue={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger data-cy='complexity_level'>
                    <SelectValue placeholder='Select a Complexity Level' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.keys(ComplexityLevel).map((lvl) => (
                    <SelectItem key={lvl} value={lvl} data-cy={`level_${lvl}`}>
                      {lvl}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name='tags'
          control={form.control}
          render={({ field }) => <TagSelect field={field} />}
        />
        <FormField
          control={form.control}
          name='body'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Body</FormLabel>
              <FormControl>
                <Textarea
                  data-cy='body'
                  placeholder='Paste the content of AI Landing Description (Supports markdown)'
                  className='resize-none'
                  {...field}
                />
              </FormControl>
              <FormDescription>
                You can use{" "}
                <a href='https://stackedit.io/app#'>StackEdit website</a> to see
                your markdown result in realtime.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type='submit'
          data-cy='submit-btn'
          disabled={!form.formState.isDirty || isLoading}
        >
          {isLoading && (
            <Loader2 id='loading' className='mr-2 h-4 w-4 animate-spin' />
          )}
          {initialValues ? "Update AI" : "Create AI"}
        </Button>
      </form>
    </Form>
  );
}

export default AiForm;

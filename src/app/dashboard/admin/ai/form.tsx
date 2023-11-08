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
import { Uploader } from "@/components/ui/uploader";
import { toast } from "@/components/ui/use-toast";
import { ComplexityLevel, AI as PrismaAi } from "@prisma/client";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { ErrorToast, SuccessToast } from "../components/toast";
import TagSelect from "../tag/select";
import { FormProps } from "../types/admin.dashboard.types";
import VideoSelect from "../video/select";
import { AI, AiSchema } from "./data/schema";
import { AIModel } from "./types/ai.types";
import { DatePicker } from "@/components/ui/date-picker";

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

  const watchedTitle = form.watch("title");
  // Watch the title field

  // Function to convert title to slug
  const titleToSlug = useCallback((title: string) => {
    return title.toLowerCase().replace(/\s+/g, "-");
  }, []);

  // Effect to update the slug field when the title changes
  useEffect(() => {
    form.setValue("slug", titleToSlug(watchedTitle ?? ""));
  }, [watchedTitle, form, titleToSlug]);

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

  const onUploadFinished = (url: string) => {
    form.setValue("logo", url);

    toast({
      title: "File uploaded",
      description: (
        <Link
          href={url}
          target='_blank'
          className='font-medium text-blue-600 dark:text-blue-500 hover:underline'
        >
          Link
        </Link>
      ),
    });
  };

  return (
    <Form {...form}>
      <form
        name='ai-form'
        data-cy='ai-form'
        className='space-y-8'
        onSubmit={form.handleSubmit(submitHandler)}
      >
        {form.getValues("logo") && (
          <div className='grid place-items-center'>
            <Image
              width={150}
              height={150}
              src={form.getValues("logo")!}
              alt={form.getValues("logo_alt") ?? "AI Logo"}
              className='rounded-full border-2 border-gray-200 dark:border-gray-800 aspect-square'
            />
          </div>
        )}

        <FormField
          name='logo'
          control={form.control}
          render={() => {
            return (
              <FormItem>
                <FormLabel>Logo</FormLabel>
                <FormControl>
                  <Uploader onUploadFinished={onUploadFinished} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <FormField
          control={form.control}
          name='logo_alt'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Logo Alt Text</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  data-cy='logo_alt'
                  value={field.value ?? ""}
                  placeholder='Enter AI Logo Alt Text'
                />
              </FormControl>
              <FormDescription>
                This is for screen readers and the fallback in case logo
                doesn&apos;t load
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

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
          name='video'
          control={form.control}
          render={({ field }) => <VideoSelect field={field} />}
        />
        <FormField
          control={form.control}
          name='usage_link'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Usage Link</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={field.value ?? ""}
                  data-cy='usage_link'
                  placeholder='https://example.com/app#'
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
                  {...field}
                  value={field.value ?? ""}
                  data-cy='origin_website'
                  placeholder='https://example.com'
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
                <Input
                  {...field}
                  data-cy='version'
                  placeholder='1.0.0'
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormDescription>AI Version</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='google_query_text'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Google Query Text</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  data-cy='google_query_text'
                  value={field.value ?? ""}
                  placeholder='Enter google query text...'
                />
              </FormControl>
              <FormDescription>
                Text to Search on Google ** HELP!! I FORGOT WHAT THIS WAS FOR :D
                **{" "}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='AI_release_date'
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <FormLabel>AI Release Date</FormLabel>
              <DatePicker
                onChange={field.onChange}
                value={field.value ?? undefined}
              />
              <FormMessage />
            </FormItem>
          )}
        />
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

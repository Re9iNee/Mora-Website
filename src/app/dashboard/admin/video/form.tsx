"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ErrorToast, SuccessToast } from "../components/toast";
import { Video, VideoSchema } from "./schema";
import { Textarea } from "@/components/ui/textarea";
import AiSelect from "../ai/select";

type Props = {
  initialValues?: Video;
  actionFn: (data: Video, id?: string) => Promise<Video>;
};

function VideoForm({ initialValues, actionFn }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<Video>({
    defaultValues: { ...initialValues },
    mode: "onChange",
    resolver: zodResolver(VideoSchema),
  });

  const submitHandler: SubmitHandler<Video> = async (data) => {
    setIsLoading(true);

    try {
      const result = await actionFn(data, initialValues?.id);
      SuccessToast({
        moduleName: "Video",
        result,
        isUpdating: !!initialValues,
      });
    } catch (e) {
      ErrorToast({ moduleName: "Video", isUpdating: !!initialValues });
    }

    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form
        name='video-form'
        data-cy='video-form'
        onSubmit={form.handleSubmit(submitHandler)}
        className='space-y-8'
      >
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Enter Video Name</FormLabel>
              <FormControl>
                <Input
                  required
                  data-cy='name'
                  placeholder='Enter Video Name'
                  {...field}
                ></Input>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='url'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Enter Video URL</FormLabel>
              <FormControl>
                <Input
                  required
                  data-cy='url'
                  placeholder='https://'
                  {...field}
                ></Input>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name='ais'
          control={form.control}
          render={({ field }) => <AiSelect field={field} />}
        />
        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  data-cy='description'
                  placeholder='Video Description...'
                  className='resize-none'
                  {...field}
                />
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
          {initialValues ? "Update Video" : "Create Video"}
        </Button>
      </form>
    </Form>
  );
}

export default VideoForm;

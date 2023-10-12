"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
import { ComplexityLevel } from "@prisma/client";
import { AI, AiSchema } from "./data/schema";

// This can come from your database or API.
const defaultValues: Partial<AI> = {
  version: "",
};

type Props = {
  initialValues?: Partial<AI>;
  onSubmit: (data: AI) => void;
};
function AiForm({ initialValues, onSubmit }: Props) {
  const form = useForm<AI>({
    defaultValues: { ...defaultValues, ...initialValues },
    mode: "onChange",
    resolver: zodResolver(AiSchema),
  });

  return (
    <Form {...form}>
      <form
        name='ai-form'
        data-cy='ai-form'
        className='space-y-8'
        onSubmit={form.handleSubmit(onSubmit)}
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

        <Button data-cy='submit-btn' type='submit'>
          {initialValues ? "Update AI" : "Create AI"}
        </Button>
      </form>
    </Form>
  );
}

export default AiForm;

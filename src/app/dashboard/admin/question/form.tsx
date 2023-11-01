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
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { ErrorToast, SuccessToast } from "../components/toast";
import { FormProps } from "../types/admin.dashboard.types";
import { Question, QuestionSchema } from "./schema";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const defaultValues: Partial<Question> = {
  possible_answers: [
    { text: "first one", correct: true },
    { text: "second one", correct: false },
  ],
};

function QuestionForm({ initialValues, actionFn }: FormProps<Question>) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<Question>({
    defaultValues: { ...defaultValues },
    mode: "onChange",
    resolver: zodResolver(QuestionSchema),
  });

  const { fields } = useFieldArray({
    name: "possible_answers",
    control: form.control,
  });

  const submitHandler: SubmitHandler<Question> = async (data) => {
    setIsLoading(true);

    try {
      const result = await actionFn(data, initialValues?.id);
      SuccessToast({
        moduleName: "Question",
        result,
        isUpdating: !!initialValues,
      });
    } catch (e) {
      ErrorToast({ moduleName: "Question", isUpdating: !!initialValues });
    }

    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form
        name='question-form'
        className='space-y-8'
        data-cy='question-form'
        onSubmit={form.handleSubmit(submitHandler)}
      >
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Enter Question Name</FormLabel>
              <FormControl>
                <Input
                  required
                  data-cy='name'
                  placeholder='Enter Question Name'
                  {...field}
                ></Input>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {fields.map((field, index) => {
          return (
            <section key={field.id}>
              <label>
                <span>Text</span>
                <input
                  {...form.register(`possible_answers.${index}.text`, {
                    required: true,
                  })}
                />
              </label>
              <Switch id='airplane-mode' />
              <Label htmlFor='airplane-mode'>Correct Answer</Label>
            </section>
          );
        })}
        <Button
          type='submit'
          data-cy='submit-btn'
          disabled={isLoading}
          aria-disabled={isLoading}
        >
          {isLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
          {initialValues ? "Update Question" : "Create Question"}
        </Button>
      </form>
    </Form>
  );
}

export default QuestionForm;

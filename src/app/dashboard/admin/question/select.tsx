"use client";

import { getQuestionsByName } from "@/services/Question.service";
import { ControllerRenderProps } from "react-hook-form";
import AsyncSelect from "react-select/async";
import { Question } from "./schema";
import { FormItem, FormLabel, FormMessage } from "@/components/ui/form";

interface Props {
  field: ControllerRenderProps<any, "Questions">;
}
function QuestionSelect({ field, ...props }: Props) {
  const promiseOptions = (inputValue: string) =>
    new Promise<Question[]>((resolve) => {
      resolve(getQuestionsByName({ name: inputValue }));
    });

  return (
    <FormItem>
      <FormLabel>Questions</FormLabel>
      <AsyncSelect
        cacheOptions
        defaultOptions
        isMulti={true}
        id='Question-select'
        menuPlacement='auto'
        loadOptions={promiseOptions}
        // set option labels color red
        styles={{
          // TODO: Make it more like shadcn
          option: (provided, state) => ({
            ...provided,
            color: state.isSelected ? "red" : "blue",
          }),
        }}
        getOptionValue={(Question) => Question.id}
        getOptionLabel={(Question) => Question.name}
        defaultValue={field.value}
        {...field}
        {...props}
      />
      <FormMessage />
    </FormItem>
  );
}

export default QuestionSelect;

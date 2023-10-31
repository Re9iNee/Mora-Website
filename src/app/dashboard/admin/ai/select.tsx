"use client";

import { FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ControllerRenderProps } from "react-hook-form";
import AsyncSelect from "react-select/async";
import { getAIsByTitle } from "@/services/ai.service";
import { AI } from "@prisma/client";

interface Props {
  field: ControllerRenderProps<any, "ais">;
}
function AiSelect({ field, ...props }: Props) {
  const promiseOptions = (inputValue: string) =>
    new Promise<AI[]>((resolve) => {
      resolve(getAIsByTitle({ title: inputValue }));
    });

  return (
    <FormItem>
      <FormLabel>AIs</FormLabel>
      <AsyncSelect
        cacheOptions
        loadOptions={promiseOptions}
        defaultOptions
        id='ai-select'
        menuPlacement='auto'
        styles={{
          // TODO: Make it more like shadcn
          option: (provided, state) => ({
            ...provided,
            color: state.isSelected ? "red" : "black",
          }),
        }}
        isMulti={true}
        getOptionValue={(ai) => ai.id}
        getOptionLabel={(ai) => ai.title}
        defaultValue={field.value}
        {...field}
        {...props}
      />
      <FormMessage />
    </FormItem>
  );
}

export default AiSelect;

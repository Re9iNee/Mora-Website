"use client";

import { getTagsByName } from "@/services/tag.service";
import { ControllerRenderProps } from "react-hook-form";
import AsyncSelect from "react-select/async";
import { Tag } from "./schema";
import { FormItem, FormLabel, FormMessage } from "@/components/ui/form";

interface Props {
  field: ControllerRenderProps<any, "tags">;
}
function TagSelect({ field, ...props }: Props) {
  const promiseOptions = (inputValue: string) =>
    new Promise<Tag[]>((resolve) => {
      resolve(getTagsByName({ name: inputValue }));
    });

  return (
    <FormItem>
      <FormLabel>Tags</FormLabel>
      <AsyncSelect
        cacheOptions
        defaultOptions
        isMulti={true}
        id='tag-select'
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
        getOptionValue={(tag) => tag.id}
        getOptionLabel={(tag) => tag.name}
        defaultValue={field.value}
        {...field}
        {...props}
      />
      <FormMessage />
    </FormItem>
  );
}

export default TagSelect;

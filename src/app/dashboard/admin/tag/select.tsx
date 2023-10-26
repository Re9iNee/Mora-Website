"use client";

import { getTagsByName } from "@/services/tag.service";
import { ControllerRenderProps } from "react-hook-form";
import AsyncSelect from "react-select/async";
import { Tag } from "./schema";

interface Props {
  field: ControllerRenderProps<any, "tags">;
}
function TagSelect({ field, ...props }: Props) {
  const promiseOptions = (inputValue: string) =>
    new Promise<Tag[]>((resolve) => {
      resolve(getTagsByName({ name: inputValue }));
    });

  return (
    <AsyncSelect
      cacheOptions
      loadOptions={promiseOptions}
      defaultOptions
      menuPlacement='auto'
      // set option labels color red
      styles={{
        // TODO: Make it more like shadcn
        option: (provided, state) => ({
          ...provided,
          color: state.isSelected ? "red" : "blue",
        }),
      }}
      isMulti={true}
      getOptionValue={(tag) => tag.id}
      getOptionLabel={(tag) => tag.name}
      defaultValue={field.value}
      {...field}
      {...props}
    />
  );
}

export default TagSelect;

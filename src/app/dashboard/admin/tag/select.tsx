"use client";

import { ControllerRenderProps } from "react-hook-form";
import AsyncSelect from "react-select/async";
import { Tag } from "./schema";
import { getTagsByName } from "@/services/tag.service";
import { AI } from "../ai/data/schema";
import { useEffect } from "react";
import { ActionMeta, MultiValue } from "react-select/dist/declarations/src";

interface Props {
  field: ControllerRenderProps<any, "tags">;
}
function TagSelect({ field, ...props }: Props) {
  const promiseOptions = (inputValue: string) =>
    new Promise<Tag[]>((resolve) => {
      resolve(getTagsByName({ name: inputValue }));
    });

  const changeHandler = (tags: MultiValue<Tag>, action: ActionMeta<Tag>) => {
    field.onChange(tags.map((tag) => tag.id));

    return;
  };

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
      // {...field}
      // {...props}
      onChange={changeHandler}
    />
  );
}

export default TagSelect;

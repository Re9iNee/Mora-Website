"use client";

import { getTagsByName } from "@/services/tag.service";
import { ControllerRenderProps } from "react-hook-form";
import AsyncSelect from "react-select/async";
import { Video } from "./schema";
import { FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { getVideosByName } from "@/services/video.service";

interface Props {
  field: ControllerRenderProps<any, "video">;
}
function VideoSelect({ field, ...props }: Props) {
  const promiseOptions = (inputValue: string) =>
    new Promise<Pick<Video, "name" | "id">[]>((resolve) => {
      resolve(getVideosByName(inputValue));
    });

  return (
    <FormItem>
      <FormLabel>Videos</FormLabel>
      <AsyncSelect
        cacheOptions
        loadOptions={promiseOptions}
        defaultOptions
        id='video-select'
        menuPlacement='auto'
        // set option labels color red
        styles={{
          // TODO: Make it more like shadcn
          option: (provided, state) => ({
            ...provided,
            color: state.isSelected ? "white" : "black",
          }),
        }}
        getOptionValue={(video) => video.id}
        getOptionLabel={(video) => video.name}
        defaultValue={field.value}
        {...field}
        {...props}
      />
      <FormMessage />
    </FormItem>
  );
}

export default VideoSelect;

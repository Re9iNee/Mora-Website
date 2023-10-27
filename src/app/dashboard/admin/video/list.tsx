import { Video } from "@prisma/client";

import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { Column, ColumnDef } from "@tanstack/react-table";

type Props = {
  data: Video[];
};
function VideoList({ data }: Props) {
  return (
    <DataTable
      data={data}
      filterBy='name'
      name='video-list'
      columns={columns as ColumnDef<Video>[]}
    />
  );
}

export default VideoList;

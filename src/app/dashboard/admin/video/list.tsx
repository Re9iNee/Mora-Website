import { Video } from "@prisma/client";

import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { columns } from "./columns";

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

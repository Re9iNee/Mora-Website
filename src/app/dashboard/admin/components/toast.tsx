import { toast } from "@/components/ui/use-toast";

type SuccessProps = {
  moduleName: string;
  isUpdating: boolean;
  result: unknown;
};

function SuccessToast({ moduleName, result, isUpdating }: SuccessProps) {
  return toast({
    title: `${moduleName} ${isUpdating ? "updated" : "created"}`,
    description: !isUpdating && (
      <div>
        <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
          <code className='text-white'>{JSON.stringify(result, null, 2)}</code>
        </pre>
      </div>
    ),
  });
}

type ErrorProps = {
  isUpdating: boolean;
  moduleName: string;
};
function ErrorToast({ isUpdating, moduleName }: ErrorProps) {
  return toast({
    title: `Error ${isUpdating ? "updating" : "creating"} ${moduleName}`,
  });
}

export { ErrorToast, SuccessToast };

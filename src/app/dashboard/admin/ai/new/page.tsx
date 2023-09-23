import { toast } from "@/components/ui/use-toast";
import { AI } from "../data/schema";
import AiForm from "../form";
import Link from "next/link";

const CreateAi = () => {
  async function onSubmit(data: AI) {
    const response = await fetch("/api/ai", {
      method: "POST",
      body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log(result);

    toast({
      title: "You submitted the following values:",
      description: (
        <div>
          <Link href={`./edit/${result.slug}`}>Edit Page</Link>
          <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
            <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
          </pre>
        </div>
      ),
    });
  }

  return <AiForm onSubmit={onSubmit} />;
};

export default CreateAi;

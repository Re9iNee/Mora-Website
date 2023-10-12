"use client";

import { toast } from "@/components/ui/use-toast";
import { AI, AiSchema } from "../data/schema";
import AiForm from "../form";
import Link from "next/link";
import { z } from "zod";
import { useState } from "react";

async function createAi(data: AI) {
  const response = await fetch("/api/ai", {
    method: "POST",
    body: JSON.stringify(data),
  });

  return await response.json();
}

const CreateAi = () => {
  const [isLoading, setIsLoading] = useState(false);

  function onSubmit(data: AI) {
    setIsLoading(true);

    createAi(data)
      .then(() =>
        toast({
          title: "You submitted the following values:",
          description: (
            <div>
              <Link href={`./ai/${data.slug}`}>Edit Page</Link>
              <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
                <code className='text-white'>
                  {JSON.stringify(data, null, 2)}
                </code>
              </pre>
            </div>
          ),
        })
      )
      .finally(() => {
        setIsLoading(false);
      });
  }

  return <AiForm onSubmit={onSubmit} isLoading={isLoading} />;
};

export default CreateAi;

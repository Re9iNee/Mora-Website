"use client";

import { getAiBySlug, updateAiBySlug } from "@/services/ai.service";
import { notFound } from "next/navigation";
import { AI } from "../data/schema";
import AiForm from "../form";

import { toast } from "@/components/ui/use-toast";
import { Suspense, useEffect, useState } from "react";

type Props = {
  params: { slug: string };
};

const AiSlug = ({ params }: Props) => {
  const { slug } = params;

  const [ai, setAi] = useState<AI | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getAiBySlug(slug)
      .then((ai) => setAi(ai))
      .catch((err) => {
        console.error(err);
        notFound();
      });

    return () => {
      setAi(undefined);
    };
  }, [slug]);

  const onSubmit = async (data: AI) => {
    setIsLoading(true);

    await updateAiBySlug(slug, data)
      .then(() => {
        toast({
          title: "You submitted the following values:",
          description: (
            <div>
              <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
                <code className='text-white'>
                  {JSON.stringify(data, null, 2)}
                </code>
              </pre>
            </div>
          ),
        });
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <Suspense>
      {ai && (
        <AiForm initialValues={ai} onSubmit={onSubmit} isLoading={isLoading} />
      )}
    </Suspense>
  );
};

export default AiSlug;

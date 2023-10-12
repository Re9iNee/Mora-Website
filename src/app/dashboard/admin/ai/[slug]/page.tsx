"use client";

import { toast } from "@/components/ui/use-toast";
import { getAiBySlug, updateAiBySlug } from "@/services/ai.service";
import { notFound } from "next/navigation";
import { AI } from "../data/schema";
import AiForm from "../form";

import { Suspense, useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

type Props = {
  params: { slug: string };
};

const AiSlug = ({ params }: Props) => {
  const { slug } = params;

  const [ai, setAi] = useState<AI | undefined>();

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
      .catch((e) => {
        toast({ title: "Error", description: e.message });
      });
  };

  return (
    <Suspense>
      {ai && <AiForm initialValues={ai} onSubmit={onSubmit} />}
    </Suspense>
  );
};

export default AiSlug;

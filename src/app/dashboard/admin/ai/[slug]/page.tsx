"use client";

import { getAiBySlug, updateAiBySlug } from "@/services/ai.service";
import { notFound } from "next/navigation";
import { AI } from "../data/schema";
import AiForm from "../form";

import { Suspense, useEffect, useState } from "react";

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
    await updateAiBySlug(slug, data);
  };

  return (
    <Suspense>
      {ai && <AiForm initialValues={ai} onSubmit={onSubmit} />}
    </Suspense>
  );
};

export default AiSlug;

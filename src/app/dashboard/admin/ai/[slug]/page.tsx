import { prisma } from "@/lib/prisma";

type Props = {
  params: { slug: string };
};
async function getAiBySlug(slug: string) {
  const ai = await prisma.aI.findUnique({ where: { slug: "Dua-Lipa" } });

  console.log("ai ->", ai);
  return ai;
}

const AiSlug = async ({ params }: Props) => {
  const { slug } = params;
  const ai = await getAiBySlug(slug);
  // console.log(ai);
  // get ai by slug
  // if ai not found, redirect to /404
  // if ai found, render ai page

  return (
    <div>
      AiSlug, request to visit: <pre>{params.slug}</pre>
      <pre>{JSON.stringify(ai)}</pre>
    </div>
  );
};

export default AiSlug;

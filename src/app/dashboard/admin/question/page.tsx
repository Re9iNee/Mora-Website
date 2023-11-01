import { Metadata } from "next";

import { Button } from "@/components/ui/button";

import Link from "next/link";
import QuestionList from "./list";
import { getAllQuestions } from "@/services/question.service";

export const metadata: Metadata = {
  title: "Question List",
  description: "A List of All the Question",
};

const TagPage = async () => {
  const questions = await getAllQuestions();

  return (
    <div className='h-full flex-1 flex-col space-y-8 p-8 md:flex'>
      <div className='flex items-center justify-between space-y-s2'>
        <div>
          <h2 className='text-2xl font-bold tracking-tight'>Question List</h2>
          <p className='text-muted-foreground'>
            Here&apos;s a list of Question
          </p>
        </div>
        <Button asChild data-cy='create'>
          <Link href='question/new'>Create</Link>
        </Button>
      </div>
      <QuestionList data={questions} />
    </div>
  );
};

export default TagPage;

import {
  getQuestionById,
  updateQuestionById,
} from "@/services/Question.service";
import { notFound } from "next/navigation";
import QuestionForm from "../form";

type Props = {
  params: { id: string };
};
async function QuestionEditPage({ params }: Props) {
  const { id } = params;
  const data = await getQuestionById(id);
  if (!data) notFound();

  return <QuestionForm actionFn={updateQuestionById} initialValues={data} />;
}

export default QuestionEditPage;

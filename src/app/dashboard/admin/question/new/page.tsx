import { createQuestion } from "@/services/question.service";
import QuestionForm from "../form";

function QuestionCreatePage() {
  return <QuestionForm actionFn={createQuestion} />;
}

export default QuestionCreatePage;

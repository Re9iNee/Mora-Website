import { createAi } from "@/services/ai.service";
import AiForm from "../form";

const AiCreatePage = () => {
  return <AiForm actionFn={createAi} />;
};

export default AiCreatePage;

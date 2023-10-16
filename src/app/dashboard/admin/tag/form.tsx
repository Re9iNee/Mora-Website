"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createTag } from "@/services/tag.service";
import { experimental_useFormStatus as useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type='submit' aria-disabled={pending}>
      Add
    </Button>
  );
}

function TagsForm() {
  return (
    <form action={createTag}>
      <Label htmlFor='tags'>Enter Tags</Label>
      <Input type='text' id='tags' name='name' required />
      <SubmitButton />
    </form>
  );
}

export default TagsForm;

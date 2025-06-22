"use client";
import * as actions from "@/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React, { useActionState } from "react";

const CreateSnippetPage = () => {
  const [formStateData, xyz] = useActionState(actions.createSnippet, {
    message: "",
  });

  return (
    <form action={xyz}>
      <div className="flex flex-col gap-2">
        <Label className="font-bold text-xl">Title</Label>
        <Input type="text" name="title" id="title" />
      </div>
      <div className="flex flex-col gap-2">
        <Label className="font-bold text-xl">Code</Label>
        <Textarea name="code" id="code" />
      </div>
      {formStateData.message && (
        <div className="p-2 bg-red-300 border-2 border-red-600 mt-2">
          {formStateData.message}
        </div>
      )}
      <Button type="submit" className="my-4">
        New Snippet
      </Button>
    </form>
  );
};

export default CreateSnippetPage;

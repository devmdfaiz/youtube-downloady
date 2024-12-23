import React from "react";
import { GeneralFormType } from "./home";
import { TypographyH3 } from "@/components/ui/typography";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Tiptap from "./tiptap";

export default function ContentEditor({ form }: { form: GeneralFormType }) {
  return (
    <div>
      <TypographyH3>Content Editor</TypographyH3>

      <FormField
        control={form.control}
        name="content"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Content</FormLabel>
            <FormControl>
              <Tiptap
                field={field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

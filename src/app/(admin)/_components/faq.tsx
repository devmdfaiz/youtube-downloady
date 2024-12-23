"use client";

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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

export default function FaqEditor({ form }: { form: GeneralFormType }) {
  return (
    <div>
      <TypographyH3>Faq Editor</TypographyH3>

      {form.watch("faqs").map((_, i) => {
        return (
          <div key={i} className="border border-primary/30 p-4 rounded-md mt-3">
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => {
                const newValue = form
                  .watch("faqs")
                  .filter((_, index) => i !== index);

                form.setValue("faqs", newValue);
              }}
            >
              <Trash />
            </Button>
            <FormField
              control={form.control}
              name={`faqs.${i}.question`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Question</FormLabel>
                  <FormControl>
                    <Input placeholder="question..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`faqs.${i}.answer`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Answer</FormLabel>
                  <FormControl>
                    <Input placeholder="answer..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        );
      })}
      <Button
        className="mt-4"
        variant="secondary"
        onClick={() => {
          const newValue = [
            ...form.watch("faqs"),
            {
              question: "",
              answer: "",
            },
          ];

          form.setValue("faqs", newValue);
        }}
        type="button"
      >
        Add Faq
      </Button>
    </div>
  );
}

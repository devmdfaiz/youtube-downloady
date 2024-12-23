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

export default function GuideEditor({ form }: { form: GeneralFormType }) {
  return (
    <div>
      <TypographyH3>Guide Editor</TypographyH3>

      {form.getValues("guide").map((guide, i) => {
        return (
          <div key={i} className="border border-primary/30 p-4 rounded-md mt-2">
            {" "}
            <FormField
              control={form.control}
              name={`guide.${i}.title`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Guide title</FormLabel>
                  <FormControl>
                    <Input placeholder="title..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`guide.${i}.desc`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Guide Description</FormLabel>
                  <FormControl>
                    <Input placeholder="description..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        );
      })}
    </div>
  );
}

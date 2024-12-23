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

export default function TestimonialEditor({ form }: { form: GeneralFormType }) {
  return (
    <div>
      <TypographyH3>Testimonial Editor</TypographyH3>

      {form.watch("testimonials").map((testimonial, i) => {
        return (
          <div key={i} className="border border-primary/30 p-4 rounded-md mt-3">
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => {
                const newValue = form
                  .watch("testimonials")
                  .filter((_, index) => i !== index);

                form.setValue("testimonials", newValue);
              }}
            >
              <Trash />
            </Button>
            <FormField
              control={form.control}
              name={`testimonials.${i}.name`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="name..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`testimonials.${i}.cont`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Input placeholder="message..." {...field} />
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
            ...form.watch("testimonials"),
            {
              cont: "",
              name: "",
            },
          ];

          form.setValue("testimonials", newValue);
        }}
        type="button"
      >
        Add Testimonial
      </Button>
    </div>
  );
}

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
import { ContactFormType } from "./contact-editor";

export default function SeoEditor({ form }: { form:  any }) {
  return (
    <div>
      <TypographyH3>Seo Editor</TypographyH3>

      <FormField
        control={form.control}
        name="seo.metaTitle"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Meta title</FormLabel>
            <FormControl>
              <Input placeholder="meta title" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="seo.metaDescription"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Meta Description</FormLabel>
            <FormControl>
              <Input placeholder="meta Description" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="seo.keywords"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Meta keywords</FormLabel>
            <FormControl>
              <Input placeholder="meta keywords" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

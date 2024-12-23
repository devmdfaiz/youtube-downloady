"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { TypographyH3 } from "@/components/ui/typography";
import SeoEditor from "./seo";
import { Contact } from "@/lib/database";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  phone: z.string({ required_error: "Content is required" }).trim(),
  email: z.string({ required_error: "Content is required" }).email().trim(),

  seo: z.object({
    metaTitle: z.string({ required_error: "Meta title is required" }).trim(),
    metaDescription: z
      .string({ required_error: "Meta description is required" })
      .trim(),
    keywords: z.string({ required_error: "Keywords is required" }).trim(),
  }),
});

export type ContactFormType = UseFormReturn<
  z.infer<typeof formSchema>,
  any,
  undefined
>;

const ContactEditor = ({ contact }: { contact: Contact }) => {
  const { toast } = useToast();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: contact.email,
      phone: contact.phone,
      seo: {
        keywords: contact.seo.keywords,
        metaDescription: contact.seo.metaDescription,
        metaTitle: contact.seo.metaTitle,
      },
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_HOST}/api/v1/contact`,
        values
      );

      toast({
        title: res.data.message,
      });
    } catch (error) {
      toast({
        title: "Error!",
        description: `Error: ${error}`,
      });
    }
  }

  return (
    <div className="my-11 space-y-3">
      <TypographyH3>Contact Fields</TypographyH3>

      <div className="border border-primary/70 p-5">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <SeoEditor form={form} />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your phone" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {!isSubmitting ? (
              <Button type="submit">Submit</Button>
            ) : (
              <Loader2 className="animate-spin text-primary" />
            )}
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ContactEditor;

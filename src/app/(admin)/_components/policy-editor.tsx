"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { useMemo, useState } from "react";
import { Loader } from "lucide-react";
import { TypographyH3 } from "@/components/ui/typography";
import { Textarea } from "@/components/ui/textarea";
import { Policy, policyRoute } from "@/lib/database";
import { useToast } from "@/hooks/use-toast";
import Tiptap from "./tiptap";

const formSchema = z.object({
  page: z.string({ required_error: "Path is required" }).trim(),
  metaTitle: z.string({ required_error: "Meta title is required" }).trim(),
  title: z.string({ required_error: "Title is required" }).trim(),
  metaDescription: z
    .string({ required_error: "Meta description is required" })
    .trim(),
  description: z.string({ required_error: "Description is required" }).trim(),
  keywords: z.string({ required_error: "Keywords is required" }).trim(),
});

const PolicyEditor = () => {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      keywords: "",
      metaDescription: "",
      metaTitle: "",
      page: "",
      description: "",
      title: "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  useMemo(() => {
    async function fetch() {
      if (form.watch("page")) {
        try {
          const set = form.setValue;
          const res = await axios.get(
            `${process.env.NEXT_PUBLIC_SERVER_HOST}/api/v1/policy${form.watch(
              "page"
            )}`
          );

          const routeData = res.data.data as Policy;

          set("description", routeData.description || "");
          set("title", routeData.title || "");
          set("metaDescription", routeData.metaDescription || "");
          set("metaTitle", routeData.metaTitle || "");
          set("keywords", routeData.keywords || "");
        } catch (error) {
          toast({
            title: "Error!",
            description: `Error: ${error}`,
          });
        }
      }
    }
    fetch();
  }, [form.watch("page")]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_HOST}/api/v1/policy${form.watch(
          "page"
        )}`,
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
      <TypographyH3>Policy Fields</TypographyH3>
      <div className="border border-primary/70 p-5">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="page"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Page</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a page" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {policyRoute.map((content) => (
                        <SelectItem key={content} value={content}>
                          {content}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {form.watch("page") && (
              <>
                <FormField
                  control={form.control}
                  name="metaTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Meta Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your meta title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="metaDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Meta Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter your meta description"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="keywords"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Keywords</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter your keywords"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Enter your title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Tiptap field={field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
            {!isSubmitting ? (
              <Button type="submit">Submit</Button>
            ) : (
              <Loader className="animate-spin text-primary" />
            )}
          </form>
        </Form>
      </div>
    </div>
  );
};

export default PolicyEditor;

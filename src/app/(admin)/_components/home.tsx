"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useEffect, useMemo } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { customRoutes, Route } from "@/lib/database";
import SeoEditor from "./seo";
import HeroEditor from "./hero";
import GuideEditor from "./guide";
import ContentEditor from "./content";
import TestimonialEditor from "./testimonials";
import FaqEditor from "./faq";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  page: z.string({ required_error: "Path is required" }).trim(),

  hero: z.object({
    description: z.string({ required_error: "Description is required" }).trim(),
    title: z.string({ required_error: "Title is required" }).trim(),
  }),

  guide: z.array(
    z.object({
      title: z.string().min(1, "Title is required"),
      desc: z.string().min(1, "Description is required"),
    })
  ),

  testimonials: z.array(
    z.object({
      name: z.string().min(1, "Name is required"),
      cont: z.string().min(1, "Content is required"),
    })
  ),
  faqs: z.array(
    z.object({
      question: z.string().min(1, "Question is required"),
      answer: z.string().min(1, "Answer is required"),
    })
  ),

  content: z.string({ required_error: "Content is required" }).trim(),

  seo: z.object({
    metaTitle: z.string({ required_error: "Meta title is required" }).trim(),
    metaDescription: z
      .string({ required_error: "Meta description is required" })
      .trim(),
    keywords: z.string({ required_error: "Keywords is required" }).trim(),
  }),
});

export type GeneralFormType = UseFormReturn<
  z.infer<typeof formSchema>,
  any,
  undefined
>;

export default function AdminPageClient() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      hero: {
        description: "",
        title: "",
      },
      page: "",
      guide: [],
      faqs: [],
      testimonials: [],
      content: "",
      seo: {
        keywords: "",
        metaDescription: "",
        metaTitle: "",
      },
    },
  });

  useEffect(() => {
    async function fetch() {
      if (form.watch("page")) {
        try {
          const set = form.setValue;
          const res = await axios.get(
            `${process.env.NEXT_PUBLIC_SERVER_HOST}/api/v1/home${form.watch(
              "page"
            )}`
          );

          const routeData = res.data.data as Route;

          set("content", routeData?.content || "");
          set("faqs", routeData?.faqs || []);
          set("guide", routeData?.guide || []);
          set("hero", routeData?.hero || { description: "", title: "" });
          set(
            "seo",
            routeData.seo || {
              keywords: "",
              metaDescription: "",
              metaTitle: "",
            }
          );
          set("testimonials", routeData?.testimonials || []);
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
        `${process.env.NEXT_PUBLIC_SERVER_HOST}/api/v1/home${form.watch(
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

  const {
    formState: { isSubmitting },
  } = form;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-5 space-y-6 mb-10"
      >
        <FormField
          control={form.control}
          name="page"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select Page</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a page" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {customRoutes.map((route, i) => (
                    <SelectItem value={route} key={i}>
                      {route}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <SeoEditor form={form} />
        <HeroEditor form={form} />
        {form.getValues("guide").length > 0 && <GuideEditor form={form} />}
        <ContentEditor form={form} />
        <TestimonialEditor form={form} />
        <FaqEditor form={form} />

        <Button>
          {isSubmitting ? <Loader2 className="animate-spin" /> : "Save"}
        </Button>
      </form>
    </Form>
  );
}

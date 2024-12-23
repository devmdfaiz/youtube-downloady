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
import axios from "axios";
import { Loader2 } from "lucide-react";
import { TypographyH3 } from "@/components/ui/typography";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  footer: z.string({ required_error: "Footer is required" }).trim(),
});

const FooterEditor = ({ footer }: { footer: string }) => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      footer: footer || "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_HOST}/api/v1/footer`,
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
      <TypographyH3>Footer Fields</TypographyH3>

      <div className="border border-primary/70 p-5">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="footer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Footer</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your footer" {...field} />
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

export default FooterEditor;

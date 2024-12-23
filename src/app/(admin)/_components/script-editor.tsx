"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { TypographyH3 } from "@/components/ui/typography";
import { Textarea } from "@/components/ui/textarea";
import { Script } from "@/lib/database";
import axios from "axios";

const formSchema = z.object({
  headerCode: z.string().trim().optional(),
  footerCode: z.string().trim().optional(),
  bodyCode: z.string().trim().optional(),
  adScript: z.object({
    bannerAd_300_250: z.string().trim().optional(),
    longBannerAd_468_60: z.string().trim().optional(),
  }),
});

const ScriptEditor = ({ scripts }: { scripts: Script }) => {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      adScript: {
        bannerAd_300_250:
          scripts?.adScript?.bannerAd_300_250 || `<script></script>`,
        longBannerAd_468_60:
          scripts?.adScript?.longBannerAd_468_60 || `<script></script>`,
      },
      bodyCode: scripts?.bodyCode || `<script></script>`,
      footerCode: scripts?.footerCode || `<script></script>`,
      headerCode: scripts?.headerCode || `<script></script>`,
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_HOST}/api/v1/script`,
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
              name="headerCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Header Code</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter your header code" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bodyCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Body code</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter your body code" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="adScript.longBannerAd_468_60"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Long banner ad</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter your ad script long type"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Recommended ad size: 468x60 pixels, or a size close to it
                    for optimal display.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="adScript.bannerAd_300_250"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Long square ad</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter your square type ad"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Recommended ad size: 300x250 pixels, or a size close to it
                    for optimal display.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="footerCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Footer code</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter footer code" {...field} />
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

export default ScriptEditor;

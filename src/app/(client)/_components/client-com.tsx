"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Clipboard, DownloadIcon, Loader2 } from "lucide-react";
import { use, useEffect, useState } from "react";
import { ActionResponse, downloadVideo } from "@/app/action";
import { useToast } from "@/hooks/use-toast";
import { DownloaderContext } from "@/context/download-context";
import { TypographyH2, TypographySmall } from "@/components/ui/typography";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

const formSchema = z.object({
  url: z.string().url(),
});

export function DownloaderForm() {
  const { toast } = useToast();
  const { setDownloadData } = use(DownloaderContext);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
    },
  });

  const {
    formState: { isLoading, isSubmitting },
  } = form;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = JSON.parse(await downloadVideo(values.url)) as ActionResponse;

      if (res.status === 200) {
        setDownloadData(res.data);
        return;
      }

      throw new Error(res.error);
    } catch (error) {
      toast({
        title: "Error!",
        description: `${error}`,
      });
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full h-fit items-start justify-center gap-x-4"
      >
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="past url"
                  {...field}
                  className="w-[170px] sm:w-[300px] md:w-[250] lg:[450px]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="button"
          size="icon"
          variant="outline"
          disabled={isSubmitting}
          onClick={async () => {
            const text = await navigator.clipboard.readText();

            form.setValue("url", text);
          }}
        >
          <Clipboard />
        </Button>
        <Button>
          {isSubmitting ? <Loader2 className="animate-spin" /> : "Get"}
        </Button>
      </form>
    </Form>
  );
}

export default function BodyAdScript({
  longBannerAd_468_60,
  bannerAd_300_250,
}: {
  bannerAd_300_250: string;
  longBannerAd_468_60: string;
}) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {isClient && (
        <div className="w-full h-fit flex items-center justify-center mb-6">
          <div className="above-form-add w-[468px] h-[60px] hidden sm:block">
            {longBannerAd_468_60 && (
              <div
                dangerouslySetInnerHTML={{ __html: longBannerAd_468_60 }}
              ></div>
            )}
          </div>

          <div className="above-form-add w-[300px] h-[250px] sm:hidden">
            {bannerAd_300_250 && (
              <div dangerouslySetInnerHTML={{ __html: bannerAd_300_250 }}></div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export const Preview = () => {
  const { downloadData } = use(DownloaderContext);

  return (
    <>
      {downloadData !== "nothing" && (
        <TypographyH2 className="text-primary text-center">
          Download Links
        </TypographyH2>
      )}
      {downloadData?.links?.length > 0 &&
        downloadData.links.map((link: any, i: number) => (
          <div
            key={i}
            className="w-full border border-primary/70 px-3 py-6 my-7"
          >
            <div className="flex items-center justify-between flex-wrap px-3 py-2 gap-3">
              <Avatar className="rounded-none w-9 h-12 object-cover">
                <AvatarImage
                  className="rounded-none"
                  src={downloadData.picture}
                  alt={`cover-${i}`}
                />
                <AvatarFallback className="rounded-none">C</AvatarFallback>
              </Avatar>
              <div>
                <TypographySmall>
                  {`${downloadData.title.slice(0, 30)}${
                    downloadData.title.length > 30 && "..."
                  }`}
                </TypographySmall>
              </div>

              <div>
                <TypographySmall className="text-primary border border-primary/80 bg-primary/20 px-3 py-2">
                  {link.quality}
                </TypographySmall>
              </div>
              <div>
                <Link
                  className={buttonVariants({
                    variant: "default",
                    size: "icon",
                  })}
                  href={link.link}
                >
                  <DownloadIcon className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

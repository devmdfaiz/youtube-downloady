import {
  Content,
  Faq,
  Guide,
  Hero,
  NonBodyAsScript,
  Testimonial,
} from "../_components/server-com";
import { notFound } from "next/navigation";
import { Preview } from "../_components/client-com";
import { home, Route, Script, scripts } from "@/lib/database";
import { Metadata } from "next";
import axios, { AxiosError } from "axios";
import { cache } from "react";
import { cachedScriptData } from "@/lib/fetch";

interface Props {
  params: Promise<{ path: string }>;
}

interface CacheHome {
  data: Route | undefined;
  status: number;
}

async function fetchHomeData(path: string): Promise<CacheHome> {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_HOST}/api/v1/home/${path}`
    );

    return { data: res.data.data, status: res.status };
  } catch (error) {
    console.log("Error in fetching data home page: ", error);

    const individualHome = home.find((d) => d.page === `/${path}`);

    if (error instanceof AxiosError) {
      return {
        data: individualHome,
        status: error.status as number,
      };
    }

    return { data: individualHome, status: 500 };
  }
}

const cachedHomeData = cache(fetchHomeData);


export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const path = (await params).path;

  const res = await cachedHomeData(path);

  const { data } = res;

  return {
    title: data?.seo.metaTitle || "",
    description: data?.seo.metaDescription || "",
    keywords: data?.seo.keywords || "",
  };
}

export default async function Page({ params }: Props) {
  const path = (await params).path;

  const resHome = await cachedHomeData(path);
  const resScript = await cachedScriptData();

  const { data, status } = resHome;

  if (!data || status !== 200) {
    return notFound();
  }

  const { content, faqs, guide, hero, seo, testimonials } = data;

  const bannerAd_300_250 = resScript?.data?.adScript.bannerAd_300_250 as string;

  const longBannerAd_468_60 = resScript.data?.adScript
    .longBannerAd_468_60 as string;

  return (
    <>
      <Hero
        content={hero}
        bannerAd_300_250={bannerAd_300_250}
        longBannerAd_468_60={longBannerAd_468_60}
      />
      <Preview />
      <Guide guides={guide} />
      <Content htmlContent={content} />

      <Testimonial testimonials={testimonials} />
      <Faq faqs={faqs} />
      <NonBodyAsScript script={resScript.data?.bodyCode} />
    </>
  );
}

import { TypographyH1 } from "@/components/ui/typography";
import { policies, Policy } from "@/lib/database";
import axios, { AxiosError } from "axios";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";

interface Props {
  params: Promise<{ path: string }>;
}

interface CachePolicy {
  data: Policy | undefined;
  status: number;
}

async function fetchPolicyData(path: string): Promise<CachePolicy> {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_HOST}/api/v1/policy${path}`
    );

    return { data: res.data.data, status: res.status };
  } catch (error) {
    console.log("Error in fetching data home page: ", error);

    const individualPolicy = policies.find((d) => d.page === `/${path}`);

    if (error instanceof AxiosError) {
      return {
        data: individualPolicy,
        status: error.status as number,
      };
    }

    return { data: individualPolicy, status: 500 };
  }
}

const cachedPolicyData = cache(fetchPolicyData);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const path = (await params).path;

  const res = await cachedPolicyData(path);

  const { data } = res;

  return {
    title: data?.metaTitle || "",
    description: data?.metaDescription || "",
    keywords: data?.keywords || "",
  };
}

export default async function Page({ params }: Props) {
  const path = (await params).path;

  const res = await cachedPolicyData(path);

  if (!res.data) {
    return notFound();
  }

  const { data: policy } = res;

  return (
    <div>
      <TypographyH1 className="my-8">{policy.title}</TypographyH1>

      {policy.description && (
        <div dangerouslySetInnerHTML={{ __html: policy.description }} />
      )}
    </div>
  );
}

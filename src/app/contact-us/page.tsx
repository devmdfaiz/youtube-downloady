import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TypographyP } from "@/components/ui/typography";
import { Contact, contact } from "@/lib/database";
import axios, { AxiosError } from "axios";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";

interface CacheContact {
  data: Contact | undefined;
  status: number;
}

async function fetchContactData(): Promise<CacheContact> {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_HOST}/api/v1/contact`
    );

    return { data: res.data.data, status: res.status };
  } catch (error) {
    console.log("Error in fetching data home page: ", error);

    if (error instanceof AxiosError) {
      return {
        data: contact,
        status: error.status as number,
      };
    }

    return { data: contact, status: 500 };
  }
}

const cachedContactData = cache(fetchContactData);

export async function generateMetadata(): Promise<Metadata> {
  const res = await cachedContactData();

  const { data } = res;

  return {
    title: data?.seo.metaTitle || "",
    description: data?.seo.metaDescription || "",
    keywords: data?.seo.keywords || "",
  };
}

export default async function ContactUs() {
  const res = await cachedContactData();

  if (!res.data) {
    return notFound();
  }

  const { data } = res;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Contact us
        </CardTitle>
      </CardHeader>
      <CardContent>
        <TypographyP>
          <b>Phone:</b> {data.phone}
          <br />
          <b>Email:</b> {data.email}
        </TypographyP>
      </CardContent>
    </Card>
  );
}

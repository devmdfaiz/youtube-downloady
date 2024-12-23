import { Contact } from "@/lib/database";
import axios, { AxiosError } from "axios";
import { Metadata } from "next";
import ContactEditor from "../../_components/contact-editor";

export const metadata: Metadata = {
  title: "Contact page editor",
};

export default async function ContactEditorPage() {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_HOST}/api/v1/contact`
    );

    const contact = res.data.data as Contact;

    return <ContactEditor contact={contact} />;
  } catch (error) {
    console.error("Error in contact editor page: ", error);

    if (error instanceof AxiosError) {
      return <p>{error.message}</p>;
    }

    return <p>{JSON.stringify(error)}</p>;
  }
}

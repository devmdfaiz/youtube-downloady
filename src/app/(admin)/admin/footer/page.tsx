import axios, { AxiosError } from "axios";
import { Metadata } from "next";
import FooterEditor from "../../_components/footer-editor";

export const metadata: Metadata = {
  title: "Footer editor",
};

const ContactEditorPage = async () => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_HOST}/api/v1/footer`
    );

    const footer = res.data.data as string;

    return <FooterEditor footer={footer} />;
  } catch (error) {
    console.error("Error in contact editor page: ", error);
    if (error instanceof AxiosError) {
      return <p>{error.message}</p>;
    }

    return <p>{JSON.stringify(error)}</p>;
  }
};

export default ContactEditorPage;

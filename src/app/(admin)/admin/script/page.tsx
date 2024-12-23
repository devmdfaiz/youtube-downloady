import { Script } from "@/lib/database";
import axios, { AxiosError } from "axios";
import { Metadata } from "next";
import ScriptEditor from "../../_components/script-editor";

export const metadata: Metadata = {
  title: "Policy page editor",
};

const PolicyEditorPage = async () => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_HOST}/api/v1/script`
    );

    const scripts = res.data.data as Script;

    return <ScriptEditor scripts={scripts} />;
  } catch (error) {
    console.error("Error in Policy editor page: ", error);

    if (error instanceof AxiosError) {
      return <p>{error.message}</p>;
    }

    return <p>{JSON.stringify(error)}</p>;
  }
};

export default PolicyEditorPage;

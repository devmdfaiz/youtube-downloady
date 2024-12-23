import { Metadata } from "next";
import PolicyEditor from "../../_components/policy-editor";

export const metadata: Metadata = {
  title: "Policy page editor",
};

const PolicyEditorPage = async () => {

  return <PolicyEditor />;
};

export default PolicyEditorPage;
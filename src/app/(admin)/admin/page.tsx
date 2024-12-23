import { Metadata } from "next";
import AdminPageClient from "../_components/home";

export const metadata: Metadata = {
  title: "Main page editor",
};

export default function Admin () {
  return <AdminPageClient />;
};

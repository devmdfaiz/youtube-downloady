import { TypographyP } from "@/components/ui/typography";
import { footer } from "@/lib/database";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import { NonBodyAsScript } from "./server-com";
import { cachedScriptData } from "@/lib/fetch";

const footerLinks = [
  {
    title: "Privacy Policy",
    path: "/policy/privacy-policy",
  },
  {
    title: "Terms of Service",
    path: "/policy/terms-of-service",
  },
  {
    title: "Contact us",
    path: "/contact-us",
  },
];

async function fetchFooterData(): Promise<string> {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_HOST}/api/v1/footer`
    );

    return res.data.data.footer;
  } catch (error) {
    console.log("Error in fetching data home page: ", error);

    if (error instanceof AxiosError) {
      return footer.footer;
    }

    return footer.footer;
  }
}

export default async function Footer() {
  const res = await fetchFooterData();
  const resScript = await cachedScriptData();

  return (
    <footer className="p-4">
      <div className="flex justify-center items-center gap-5 flex-wrap">
        <TypographyP>{res}</TypographyP>
        <ul className="flex justify-center items-center gap-3">
          {footerLinks.map((link, i) => {
            return (
              <li key={i}>
                <Link
                  className="transition-all border-b hover:text-primary"
                  href={link.path}
                >
                  {link.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <NonBodyAsScript script={resScript.data?.footerCode} />
    </footer>
  );
}

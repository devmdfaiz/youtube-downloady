import { customRoutes, policyRoute } from "@/lib/database";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [...policyRoute, ...customRoutes];

  return routes.map((route) => {
    return {
      url: `${process.env.NEXTAUTH_URL}${route}`,
      changeFrequency: "weekly",
    };
  });
}

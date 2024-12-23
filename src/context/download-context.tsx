"use client"

import { createContext, ReactNode, useState } from "react";

export const DownloaderContext = createContext<any>("nothing");

export function DownloaderContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [downloadData, setDownloadData] = useState<any>("nothing");

  return (
    <DownloaderContext value={{ downloadData, setDownloadData }}>
      {children}
    </DownloaderContext>
  );
}

"use server";

import axios, { AxiosError } from "axios";

export interface ActionResponse {
  data: any;
  status: number;
  error: string;
}

export async function downloadVideo(url: string) {
  const options = {
    method: "GET",
    url: "https://social-media-video-downloader.p.rapidapi.com/smvd/get/all",
    params: {
      url,
    },
    headers: {
      "x-rapidapi-key": process.env.RAPID_API_KEY,
      "x-rapidapi-host": "social-media-video-downloader.p.rapidapi.com",
    },
  };

  try {
    const res = await axios.request(options);

    return JSON.stringify({
      data: res.data,
      status: res.status,
      error: null,
    });
  } catch (error) {
    console.error("Error in getting download links", error);

    if (error instanceof AxiosError) {
      return JSON.stringify({
        data: null,
        status: error.status,
        error: error.message,
      });
    }

    return JSON.stringify({
      data: null,
      status: 500,
      error: `Error: ${error}`,
    });
  }
}

export async function loginAction({
  email,
  pass,
}: {
  email: string;
  pass: string;
}) {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPass = process.env.ADMIN_PASS;

  if (adminEmail === email && pass === adminPass) {
    return true;
  }

  return false;
}

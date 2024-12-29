import { cache } from "react";
import { Script, scripts } from "./database";
import axios, { AxiosError } from "axios";

interface CacheScript {
  data: Script | undefined;
  status: number;
}

export async function fetchScriptData(): Promise<CacheScript> {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_HOST}/api/v1/script`
    );

    return { data: res.data.data, status: res.status };
  } catch (error) {
    console.log("Error in fetching data home page: ", error);

    if (error instanceof AxiosError) {
      return {
        data: scripts,
        status: error.status as number,
      };
    }

    return { data: scripts, status: 500 };
  }
}

export const cachedScriptData = cache(fetchScriptData);

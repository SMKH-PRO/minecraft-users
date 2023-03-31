import { NextApiRequest, NextApiResponse } from "next";
import axios, { AxiosError, AxiosRequestConfig } from "axios";

class Util {
  static filterProperties(raw: object, unallowed: string[]): object {
    return Object.keys(raw)
      .filter((key) => !unallowed.includes(key))
      .reduce((obj, key) => {
        // @ts-ignore
        obj[key] = raw[key];
        return obj;
      }, {});
  }

  static isValidURL = (url: string): boolean => {
    const URLRegExp: RegExp = new RegExp(
      "https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{2,256}\\.[a-z]{2,4}\\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)"
    );

    return URLRegExp.test(url);
  };
}


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { endpoint } = req.query;

  if (!endpoint) {
    const out = {
      error: "Missing endpoint URL!",
    };

    res.status(400).json(out);
    return;
  }

  if (!Util.isValidURL(endpoint as string)) {
    const out = {
      error: "Endpoint parameter must be a valid URL!",
    };

    res.status(400).json(out);
    return;
  }

  try {
    const reqConfig: AxiosRequestConfig = {
      //@ts-ignore
      url: endpoint,
      method: "get",
      headers: {
        "X-Requested-With": "XMLHttpRequest",
      },
      params: Util.filterProperties({ ...req.query }, ["endpoint"]),
    };

    const endpointReq = await axios(reqConfig);
    const endpointRes = await endpointReq.data;

    res.status(200).json(endpointRes);
  } catch (err: Error | any) {

    const error = err instanceof AxiosError ? err.response?.data : err
  

    res.status(500).json(error);
  }
};

export default handler;

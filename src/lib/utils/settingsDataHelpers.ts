"use server";
"server-only";
import { httpRequest } from "@/lib/utils/dataHelpers";
import {
  Audits,
  AppSettings,
  PublicSettings,
  CurrencyListData,
} from "@/lib/utils/dataTypes";

interface IAuditResponse {
  audits: Audits;
  status: number;
}
interface ICurrencyResponse {
  status: number;
  currencyListData: CurrencyListData;
}

export const getAppSettings = async () => {
  try {
    const appId = process.env.APP_ID || "";

    const response: AppSettings = await httpRequest(
      "/appsetting",
      { appId: appId },
      "PATCH"
    );

    if (response.status !== 200) {
      throw new Error("Failed to fetch data");
    }

    return {
      appData: response.appSettings[0],
      appId: appId,
    };
  } catch (error: any) {
    return {
      error: { message: error.message },
    };
  }
};

export const getPublicSettings = async () => {
  try {
    const appId = process.env.APP_ID || "";

    const response: PublicSettings = await httpRequest(
      "/appsetting",
      { appId: appId },
      "PUT",
      { cache: "force-cache" },
      true
    );

    if (response.status !== 200) {
      throw new Error("Failed to fetch data");
    }

    return {
      appData: response.appSettings[0],
      appId: appId,
    };
  } catch (error: any) {
    return { error: error.message };
  }
};

export const getAuditData = async () => {
  try {
    const response: IAuditResponse = await httpRequest("/audit", null, "PATCH");

    if (response.status !== 200) {
      throw new Error("Failed to fetch data");
    }

    return response.audits;

  } catch (error: any) {
    
  }
}

export const getCurrencyData = async () => {
  try {
    const response: ICurrencyResponse = await httpRequest(
      "/currency",
      null,
      "PATCH"
    );

    if (response.status === 200) {
      return response.currencyListData;
    }

    throw new Error("Failed to fetch data");
  } catch (error: any) {
    return { error: error.message };
  }
};

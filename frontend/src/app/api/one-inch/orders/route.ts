"use server";
import { FusionSDK } from "@1inch/fusion-sdk";
import { NextRequest } from "next/server";
export async function GET(req: NextRequest, res: Response) {
  try {
    const sdk = new FusionSDK({
      url: "https://api.1inch.dev/fusion",
      network: 42161,
      authKey: process.env.NEXT_PUBLIC_1INCH_API_KEY,
    });

    const orders = await sdk.getActiveOrders({ page: 1, limit: 2 });
    console.log("orders", orders);
    return Response.json({
      success: true,
      response: orders.items[0],
    });
  } catch (error) {
    console.error(error);
    return Response.json({ success: false, error: error });
  }
}

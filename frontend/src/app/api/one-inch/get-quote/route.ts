"use server";
import { FusionSDK } from "@1inch/fusion-sdk";
import { NextRequest } from "next/server";
export async function POST(req: NextRequest, res: Response) {
  try {
    const sdk = new FusionSDK({
      url: "https://api.1inch.dev/fusion",
      network: 42161,
      authKey: process.env.NEXT_PUBLIC_1INCH_API_KEY,
    });

    const quote = await sdk.getQuote({
      fromTokenAddress: "0x6b175474e89094c44da98b954eedeac495271d0f",
      toTokenAddress: "0xda10009cbd5d07dd0cecc66161fc93d7c9000da1",
      amount: "1000000000000000000000",
    });
    console.log("quote", quote);
    return Response.json({
      success: true,
      response: quote,
    });
  } catch (error) {
    console.error(error);
    return Response.json({ success: false, error: error });
  }
}

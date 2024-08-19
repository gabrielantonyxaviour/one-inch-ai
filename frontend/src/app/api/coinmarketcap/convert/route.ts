import { COINMARKETCAP_IDS } from "@/lib/constants";
import axios from "axios";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";
const url = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest`;
const COINMARKETCAP_API_KEY =
  process.env.NEXT_PUBLIC_COINMARKETCAP_API_KEY || "<your-key-here>";

const getExchangeRate = async (id: number): Promise<number> => {
  const response = await axios.get(url, {
    params: {
      id: id,
      convert: "USD",
    },
    headers: {
      "X-CMC_PRO_API_KEY": COINMARKETCAP_API_KEY,
    },
  });

  const data = response.data;
  const priceInUSD = data.data[id].quote.USD.price;
  return priceInUSD;
};
export async function GET(req: NextRequest, res: NextResponse) {
  try {
    // TODO: I neeed my query params here
    const { searchParams } = req.nextUrl;
    const from = searchParams.get("from");
    const to = searchParams.get("to");
    if (from == null || to == null) {
      return Response.json({
        success: false,
        amount: 0,
        error: "Missing query params",
      });
    }
    const fromToUSD = await getExchangeRate(COINMARKETCAP_IDS[from]);
    const toToUSD = await getExchangeRate(COINMARKETCAP_IDS[to]);

    return Response.json({
      success: true,
      amount: {
        from: fromToUSD,
        to: toToUSD,
      },
      error: null,
    });
  } catch (error) {
    console.error(error);
    return Response.json({ success: false, error: error });
  }
}

// utils/tokenPriceFetcher.ts

import { Connection } from "@solana/web3.js";
import axios from "axios";
import { SUPPORTED_TOKENS } from "./tokens";

// To store the last fetched prices and timestamp
let LAST_UPDATED: number | null = null;
let prices: { [key: string]: { price: string } } = {};

// Refresh every 60 seconds
const TOKEN_PRICE_REFRESH_INTERVAL = 60 * 1000;

// Solana network connection
export const connection = new Connection(
  "https://solana-mainnet.g.alchemy.com/v2/EspGgEsKtp6xdG1-P32lj9raEFUlgXNc"
);

// Token fetcher using CoinGecko
export async function getSupportedTokens() {
  const now = new Date().getTime();

  // Refresh prices only if time interval passed
  if (!LAST_UPDATED || now - LAST_UPDATED > TOKEN_PRICE_REFRESH_INTERVAL) {
    try {
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/simple/price?ids=solana,tether,usd-coin&vs_currencies=usd"
      );
      const data = response.data;

      prices = {
        SOL: { price: data.solana.usd.toString() },
        USDC: { price: data["usd-coin"].usd.toString() },
        USDT: { price: data.tether.usd.toString() }
      };

      LAST_UPDATED = now;
    } catch (e) {
      console.error("❌ Failed to fetch token prices from CoinGecko:", e);
    }
  }

  return SUPPORTED_TOKENS.map((s) => ({
    ...s,
    price: prices[s.name]?.price || "0"
  }));
}

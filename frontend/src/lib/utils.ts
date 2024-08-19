import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Position } from "./type";
import { parseEther } from "viem";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function roundUpToFiveDecimals(floatStr: string): string {
  // Parse the string to a float
  const num = parseFloat(floatStr);

  // If the string cannot be parsed to a number, throw an error
  if (isNaN(num)) {
    return "0.00";
  }

  // Multiply by 10^5, round up using Math.ceil, and then divide back by 10^5
  const roundedNum = Math.ceil(num * 100000) / 100000;

  // Convert the number back to a string with 5 decimal places
  let result = roundedNum.toFixed(5);

  // If the result has more than 2 decimal places but they are all zeros, reduce to 2 decimals
  if (result.endsWith("000") || result.endsWith("00")) {
    result = parseFloat(result).toFixed(2);
  }

  return result;
}
export function timeAgo(timestamp: string | number | Date): string {
  const now = new Date();
  const timeDiff =
    now.getTime() - new Date(parseInt(timestamp + "000")).getTime(); // Difference in milliseconds
  const seconds = Math.floor(timeDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30); // Approximate months

  if (months > 0) return `${months} month${months > 1 ? "s" : ""} ago`;
  if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
}

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatCarbon(value: number) {
    return `${value.toLocaleString("tr-TR")} tCO2e`;
}

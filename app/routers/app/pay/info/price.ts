// 产品价格是多少美金
// export const priceMonth = 25;
// export const priceYear = 17;
export const priceMonth = 25;
export const priceYear = 17;

export function numberFix(price: number, dotTimes = 100): number {
  return Math.round(price * dotTimes) / dotTimes;
}

export const priceTotal = (plan: "month" | "year" | "renewMonth" | "renewYear", count = 1) => {
  if (plan === "month" || plan === "renewMonth") {
    return numberFix(count * priceMonth);
  }
  return numberFix(count * 12 * priceYear);
};

export const priceToRMB = (price: number) => {
  return numberFix(price * 7);
};

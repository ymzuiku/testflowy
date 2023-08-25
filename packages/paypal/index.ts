import { loadScript, PayPalNamespace } from "@paypal/paypal-js";

export const getPaypal = (paypalClientId: string, currency: "CNY" | "USD"): Promise<PayPalNamespace> => {
  return new Promise((res) => {
    loadScript({ "client-id": paypalClientId, currency }).then((paypal) => {
      res(paypal as PayPalNamespace);
    });
  });
};

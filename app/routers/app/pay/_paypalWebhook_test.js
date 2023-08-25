import { paypalSdkConfig } from "./_paypalWebhook";

const paypalSdk = require("paypal-rest-sdk");

paypalSdk.configure(paypalSdkConfig);

const mock = {
  p: {
    id: "WH-6M48869957512541N-0SG96005K0470620A",
    event_version: "1.0",
    create_time: "2022-12-21T00:01:53.645Z",
    resource_type: "capture",
    resource_version: "2.0",
    event_type: "PAYMENT.CAPTURE.COMPLETED",
    summary: "Payment completed for $ 0.01 USD",
    resource: {
      id: "37U79826D3643314X",
      amount: { currency_code: "USD", value: "0.01" },
      final_capture: true,
      seller_protection: { status: "ELIGIBLE", dispute_categories: ["ITEM_NOT_RECEIVED", "UNAUTHORIZED_TRANSACTION"] },
      seller_receivable_breakdown: {
        gross_amount: { currency_code: "USD", value: "0.01" },
        paypal_fee: { currency_code: "USD", value: "0.01" },
        net_amount: { currency_code: "USD", value: "0.00" },
      },
      custom_id: "ritidm0m1mu8h19qvaemq",
      status: "COMPLETED",
      supplementary_data: { related_ids: { order_id: "63L36308KS547082B" } },
      create_time: "2022-12-21T00:01:48Z",
      update_time: "2022-12-21T00:01:48Z",
      links: [
        { href: "https://api.paypal.com/v2/payments/captures/37U79826D3643314X", rel: "self", method: "GET" },
        { href: "https://api.paypal.com/v2/payments/captures/37U79826D3643314X/refund", rel: "refund", method: "POST" },
        { href: "https://api.paypal.com/v2/checkout/orders/63L36308KS547082B", rel: "up", method: "GET" },
      ],
    },
    links: [
      {
        href: "https://api.paypal.com/v1/notifications/webhooks-events/WH-6M48869957512541N-0SG96005K0470620A",
        rel: "self",
        method: "GET",
      },
      {
        href: "https://api.paypal.com/v1/notifications/webhooks-events/WH-6M48869957512541N-0SG96005K0470620A/resend",
        rel: "resend",
        method: "POST",
      },
    ],
  },
  headers: {
    host: "www0.testflowy.com",
    "user-agent": "PayPal/AUHD-214.0-57663719",
    "content-length": "1464",
    "6c8530060c95f361bebee6210b49114d": "tag",
    accept: "*/*",
    c96860ff0fdba38280319179ebf426f0: "tag",
    cal_poolstack:
      "amqunphttpdeliveryd:UNPHTDLVRYHA*CalThreadId=0*TopLevelTxnStartTime=18531fd90dc*Host=ccg13amqunphttpdeliveryd44",
    client_pid: "2035366",
    "content-type": "application/json",
    "correlation-id": "f346284aa9a35",
    "paypal-auth-algo": "SHA256withRSA",
    "paypal-auth-version": "v2",
    "paypal-cert-url": "https://api.paypal.com/v1/notifications/certs/CERT-360caa42-fca2a594-38317689",
    "paypal-transmission-id": "b60a4310-80c2-11ed-bfc6-dfd5aed142d1",
    "paypal-transmission-sig":
      "lJ8FdZmYXajMofikErUiZyLfnFsTUS6u1DhkUHusqkiVsyFnQnzKl/3Dwd1peAaZv0BF8FySWNQSGwq1AldhuNbCXkcdbY5mpAcXLMJoOrbgSMclEovClwSENRM8qydtALFKiipZMIFdCYgybZWsFn5iaEN9XSVdfV4iqEm2SHthkkHaOcRn24YI/W3aJe4mmT+uxh7KpxP/x7kh5QznDDQGkCBx7PhLvnH3Lw+Ck1J5UY5H8OQjrdy7MccjtK4mK8gHrwp+/zXd43Vf7H8UNoM+yji9bdFnzgIMV5DarEbTsO+avLW8N3Yq92uMXvXkz9kh6Jmqk5KAjamUEs/zOQ==",
    "paypal-transmission-time": "2022-12-21T00:02:08Z",
    "tencent-acceleration-domain-name": "testflowy.com",
    "x-b3-spanid": "dc0a9b54affa83c1",
    "x-forwarded-for": "173.0.81.65, 211.152.148.74",
    "x-forwarded-proto": "https",
    "x-lego-via": "200849",
    "x-nws-log-uuid": "7975034984546797009",
    "x-tencent-ua": "Qcloud",
    "accept-encoding": "gzip",
  },
};

function run3() {
  const headers = mock.headers;
  const body = mock.p;
  const webhook_id = process.env.paypal_webhook_id;

  paypalSdk.notification.webhookEvent.verify(
    {
      ...headers,
      Authorization: "Bearer Access-Token",
    },
    body,
    webhook_id,
    function (error, response) {
      if (error) {
        console.log(JSON.stringify(error));
      } else {
        console.log(response);
      }
    },
  );
}
run3();

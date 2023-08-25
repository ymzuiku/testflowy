# testflowy

一个帮您自动测试的平台

## paypal 支付回调

webhookUrl: https://testflowy.com/v1/paypal/webhook
webhook id: XXXXXXXX
webhook events: Payment capture completed, Payment capture refunded

## 自定义的前置

支付前, 前端要先验证一下回调服务是否还在相应
https://testflowy.com/v1/paypal/heart

## Payment capture completed 订单完成事件

```json
{
  "id": "WH-58D329510W468432D-8HN650336L201105X",
  "create_time": "2019-02-14T21:50:07.940Z",
  "resource_type": "capture",
  "event_type": "PAYMENT.CAPTURE.COMPLETED",
  "summary": "Payment completed for $ 30.0 USD",
  "resource": {
    "disbursement_mode": "INSTANT",
    "amount": {
      "currency_code": "USD",
      "value": "30.00"
    },
    "seller_protection": {
      "status": "ELIGIBLE",
      "dispute_categories": ["ITEM_NOT_RECEIVED", "UNAUTHORIZED_TRANSACTION"]
    },
    "supplementary_data": {
      "related_ids": {
        "order_id": "1AB234567A1234567"
      }
    },
    "update_time": "2022-08-23T18:29:50Z",
    "create_time": "2022-08-23T18:29:50Z",
    "final_capture": true,
    "seller_receivable_breakdown": {
      "gross_amount": {
        "currency_code": "USD",
        "value": "30.00"
      },
      "paypal_fee": {
        "currency_code": "USD",
        "value": "1.54"
      },
      "platform_fees": [
        {
          "amount": {
            "currency_code": "USD",
            "value": "2.00"
          },
          "payee": {
            "merchant_id": "ABCDEFGHIJKL1"
          }
        }
      ],
      "net_amount": {
        "currency_code": "USD",
        "value": "26.46"
      }
    },
    "invoice_id": "5840243-146",
    "links": [
      {
        "href": "https://api.paypal.com/v2/payments/captures/12A34567BC123456S",
        "rel": "self",
        "method": "GET"
      },
      {
        "href": "https://api.paypal.com/v2/payments/captures/12A34567BC123456S/refund",
        "rel": "refund",
        "method": "POST"
      },
      {
        "href": "https://api.paypal.com/v2/checkout/orders/1AB234567A1234567",
        "rel": "up",
        "method": "GET"
      }
    ],
    "id": "12A34567BC123456S",
    "status": "COMPLETED"
  },
  "links": [
    {
      "href": "https://api.paypal.com/v1/notifications/webhooks-events/WH-58D329510W468432D-8HN650336L201105X",
      "rel": "self",
      "method": "GET",
      "encType": "application/json"
    },
    {
      "href": "https://api.paypal.com/v1/notifications/webhooks-events/WH-58D329510W468432D-8HN650336L201105X/resend",
      "rel": "resend",
      "method": "POST",
      "encType": "application/json"
    }
  ],
  "event_version": "1.0",
  "resource_version": "2.0"
}
```

## Payment capture refunded 退款事件

```json
{
  "id": "WH-1GE84257G0350133W-6RW800890C634293G",
  "create_time": "2018-08-15T19:14:04.543Z",
  "resource_type": "refund",
  "event_type": "PAYMENT.CAPTURE.REFUNDED",
  "summary": "A $ 0.99 USD capture payment was refunded",
  "resource": {
    "seller_payable_breakdown": {
      "gross_amount": {
        "currency_code": "USD",
        "value": "0.99"
      },
      "paypal_fee": {
        "currency_code": "USD",
        "value": "0.02"
      },
      "net_amount": {
        "currency_code": "USD",
        "value": "0.97"
      },
      "total_refunded_amount": {
        "currency_code": "USD",
        "value": "1.98"
      }
    },
    "amount": {
      "currency_code": "USD",
      "value": "0.99"
    },
    "update_time": "2018-08-15T12:13:29-07:00",
    "create_time": "2018-08-15T12:13:29-07:00",
    "links": [
      {
        "href": "https://api.paypal.com/v2/payments/refunds/1Y107995YT783435V",
        "rel": "self",
        "method": "GET"
      },
      {
        "href": "https://api.paypal.com/v2/payments/captures/0JF852973C016714D",
        "rel": "up",
        "method": "GET"
      }
    ],
    "id": "1Y107995YT783435V",
    "status": "COMPLETED"
  },
  "links": [
    {
      "href": "https://api.paypal.com/v1/notifications/webhooks-events/WH-1GE84257G0350133W-6RW800890C634293G",
      "rel": "self",
      "method": "GET",
      "encType": "application/json"
    },
    {
      "href": "https://api.paypal.com/v1/notifications/webhooks-events/WH-1GE84257G0350133W-6RW800890C634293G/resend",
      "rel": "resend",
      "method": "POST",
      "encType": "application/json"
    }
  ],
  "event_version": "1.0",
  "resource_version": "2.0"
}
```

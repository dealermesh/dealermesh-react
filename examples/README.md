The examples use NextJS to run and is built in React. For more detail go to https://nextjs.org/learn/foundations/about-nextjs.

## Installation

Recommended Node Version - 16.8.0 or higher

Clone or download this repository.

Run `npm install` inside the `examples` folder.

## Setup

Add a config file `.env.development` in the `examples` folder.

Add the following to the file:

```
DEALERMESH_API_SERVER=https://api.dealermesh.com
ACCESS_TOKEN=YzdmMjM5Y...5NDVkMmNmNGVlLTE= (your access token)
ACCESS_KEY=4iLbp...LbeF (your dealer access key)
```

## Start Server

`npm run dev`

After starting the server go to http://localhost:3010. You will find the list of examples on this page.

## Available Examples

| Feature | Url | Source Code |
| ------- | --- | ----------- |
| Configure Payments | http://localhost:3010/configure-payments | [ConfigurePayments.jsx](https://github.com/dealermesh/dealermesh-react/blob/main/examples/src/ConfigurePayments.jsx) |
| Trade (KBB Values) | http://localhost:3010/trade-kbb-values | [TradeEstimateKbbValues.jsx](https://github.com/dealermesh/dealermesh-react/blob/main/examples/src/TradeEstimateKbbValues.jsx) |
| Trade (TradePending) | http://localhost:3010/trade-tp | [TradeEstimateTp.jsx](https://github.com/dealermesh/dealermesh-react/blob/main/examples/src/TradeEstimateTp.jsx) |
| Soft Credit Check | http://localhost:3010/soft-credit | [SoftCredit.jsx](https://github.com/dealermesh/dealermesh-react/blob/main/examples/src/SoftCredit.jsx) |
| Offers / Incentives | http://localhost:3010/offers | [OfferIncentives.jsx](https://github.com/dealermesh/dealermesh-react/blob/main/examples/src/OfferIncentives.jsx) |
| Protection Plans | http://localhost:3010/plans | [ProtectionPlans.jsx](https://github.com/dealermesh/dealermesh-react/blob/main/examples/src/ProtectionPlans.jsx) |


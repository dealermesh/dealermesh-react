import { useRouter } from 'next/router';
import ConfigurePayments from '../src/ConfigurePayments';
import OfferIncentives from '../src/OfferIncentives';
import ProtectionPlans from '../src/ProtectionPlans';
import SoftCredit from '../src/SoftCredit';
import TradeEstimateKbbValues from '../src/TradeEstimateKbbValues';
import TradeEstimateTp from '../src/TradeEstimateTp';

export default function Example(props) {
  const router = useRouter()
  const pageProps = props
  console.log("--- SERVER ", pageProps)
  if (router.query.slug == 'configure-payments') {
    return <ConfigurePayments {...pageProps}></ConfigurePayments>
  } else if (router.query.slug == 'trade-kbb-values') {
    return <TradeEstimateKbbValues {...pageProps}></TradeEstimateKbbValues>
  } else if (router.query.slug == 'trade-tp') {
    return <TradeEstimateTp {...pageProps}></TradeEstimateTp>
  } else if (router.query.slug == 'soft-credit') {
    return <SoftCredit {...pageProps}></SoftCredit>
  } else if (router.query.slug == 'offers') {
    return <OfferIncentives {...pageProps}></OfferIncentives>
  } else if (router.query.slug == 'plans') {
    return <ProtectionPlans {...pageProps}></ProtectionPlans>
  }
  return (
    <div>
    </div>
  )
}

export async function getServerSideProps(context) {
  const config = {
    server: process.env.DEALERMESH_API_SERVER,
    accessToken: process.env.ACCESS_TOKEN,
    accessKey: process.env.ACCESS_KEY,
    vin: "5XYK6CAF3PG075033", 
    msrp: 33740, 
    price: 33740
  }
  return { props: config }
}
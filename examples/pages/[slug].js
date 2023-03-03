import { useRouter } from 'next/router';
import ConfigurePayments from '../src/ConfigurePayments';
import SoftCredit from '../src/SoftCredit';

export default function Example(props) {
  const router = useRouter()
  const pageProps = { ...props, vin: "5XYK6CAF3PG075033", msrp: 33740, price: 33740 }
  if (router.query.slug == 'configure-payments') {
    return <ConfigurePayments {...pageProps}></ConfigurePayments>
  } else if (router.query.slug == 'soft-credit') {
    return <SoftCredit {...pageProps}></SoftCredit>
  }
  return (
    <div>
    </div>
  )
}

import { useRouter } from 'next/router';
import SoftCredit from '../src/SoftCredit';

export default function Example() {
  const router = useRouter()
  if (router.query.slug == 'soft-credit') {
    return <SoftCredit></SoftCredit>
  }
  return (
    <div>
    </div>
  )
}


import useSWR        from 'swr'
import { useRouter } from 'next/router';

import styles      from './styles.module.css'
import { fetcher } from '@/hooks/useAPI'
import QrCode      from '@/components/Widgets/QrCode'

export default function AccountWithdraw() {
  const router   = useRouter();
  const { slug } = router.query;
  const { data, error } = useSWR(`/api/withdraw/create?slug=${slug}`, fetcher);

  return (
    <div>
      <p>Withdraw Module</p>
      {data && data.lnurl && <QrCode data={ data.lnurl }/> }
    </div>
  )
}
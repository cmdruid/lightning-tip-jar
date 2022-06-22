import { useState } from 'react';

import styles  from './styles.module.css'
import ShowBalance from './ShowBalance';
import CreateCode from './CreateCode';
import RecentWithdraws from './RecentWithdraws'



export default function AccountWithdraw() {
  const [ balance, setBalance ] = useState(0)

  return (
    <div>
      <ShowBalance balance={ balance } setBalance={ setBalance } />
      <CreateCode balance={ balance } />
      <RecentWithdraws />
    </div>
  )
}
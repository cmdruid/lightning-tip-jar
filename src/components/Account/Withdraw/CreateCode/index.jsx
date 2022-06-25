import { useRouter } from 'next/router'
import { useState }  from 'react'

import styles from './styles.module.css'
import QrCode from '@/components/Widgets/QrCode'
import { submitData } from '@/lib/utils'

export default function CreateCode({ balance }) {
  const bal = Math.floor(Math.max(0, balance - 10))
  const minAmt = Math.min(10, bal)

  const { slug } = useRouter().query;
  const [ code, setCode ] = useState()
  const [ amt, setAmt ]   = useState(minAmt);
  const [ title, setTitle ] = useState('');
  const [ statusMsg, setStatus ] = useState('')

  async function handleSubmit(e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target))

    if (data.amt < 10) return setStatus('Insufficient funds! Need at least 10 sats.')

    data.amt = data.amt * 1000

    if (data.memo) {
      setTitle('Memo: ' + data.memo)
    } else { setTitle('') }

    submitData(data, '/api/withdraw/create', (err, res) => {
      if (err) {
        return setStatus(err || 'Something happened! Please try again.')
      } else { return setCode(res) }
    })
  }

  return (
    <div className={styles.container}>
      { statusMsg && 
        <div className={styles.statusMsg}>
          <p>{statusMsg}</p>
        </div>
      }
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputrow}>
          <div className={styles.inputfield}>
            <label>Memo</label>
            <input 
              name='memo' 
              type='text'
              maxLength='32'
              placeholder='enter a custom memo ...'
            />
          </div>
          <div className={styles.inputfield}>
            <label>Amount</label>
            <input 
              name='amt' 
              type='number'
              value={amt}
              min={minAmt}
              max={bal}
              onChange={(e) => setAmt(e.target.value)}
            />
            <span></span>
            <div 
              className={styles.maxBtn} 
              onClick={() => setAmt(bal)}
              >
                Max
            </div>
          </div>
        </div>
        <input name='slug' type='hidden' value={slug} />
        <button type='submit'>Create Code</button>
      </form>
      { code?.lnurl && <QrCode title={ title } data={ code.lnurl } /> }
    </div>
  )
}
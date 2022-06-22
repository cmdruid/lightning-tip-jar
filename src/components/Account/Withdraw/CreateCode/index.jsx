import { useRouter }   from 'next/router'
import { useWithdraw } from '@/hooks/useAPI'

import styles  from './styles.module.css'
import Error   from '@/components/Widgets/Error'
import Loading from '@/components/Widgets/Loading'
import QrCode  from '@/components/Widgets/QrCode'


export default function CreateCode({ amt }) {
  const { slug } = useRouter().query;
  const { data, isLoading, isError } = useWithdraw(slug);

  return (
    <>
      { isError 
        ? <Error /> 
        : isLoading
          ? <Loading />
          : <CodeContainer 
            data={ data } 
            amt={ amt }
            slug={ slug }
          />
       }
    </>
  )
}

function CodeContainer({ data, amt, slug }) {

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <label>Message</label>
        <input name='msg' type='text' placeholder='enter a custom message ...' />
        <input name='slug' type='hidden' value={slug} />
        <div>
          <label>Amount</label>
          <input name='amt' type='text' value={ amt ? amt : 0 } />
          <button>Create</button>
        </div>
      </form>
      {data && data.lnurl && <QrCode data={ data.lnurl }/> }
    </div>
  )
}
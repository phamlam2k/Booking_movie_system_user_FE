import { VERIFY_ID } from '@config/const'
import { ButtonPayment } from '@src/common/ButtonPayment'
import { useEffect, useState } from 'react'

const CURRENCY = 'USD'

const Payment = () => {
  const [seat, setSeat] = useState<any>([])

  useEffect(() => {
    if (typeof window !== undefined) {
      setSeat(JSON.parse(localStorage.getItem(VERIFY_ID) || ''))
    }
  }, [])

  const handleAccept = () => {}

  const handleDenied = () => {}

  return (
    <div>
      <div></div>
      <div>
        <ButtonPayment
          money={'10'}
          currency={CURRENCY}
          showSpinner={false}
          onAccept={handleAccept}
          onDenied={handleDenied}
        />
      </div>
    </div>
  )
}

export default Payment

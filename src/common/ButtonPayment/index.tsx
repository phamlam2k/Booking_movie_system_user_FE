import { useEffect } from 'react'
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'

export const ButtonPayment = ({ amount, currency, showSpinner, onAccept, onDenied }: any) => {
  const [{ options, isPending }, dispatch] = usePayPalScriptReducer()

  useEffect(() => {
    dispatch({
      type: 'resetOptions',
      value: {
        ...options,
        currency: currency,
      },
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency, showSpinner])

  return (
    <PayPalButtons
      style={{ layout: 'vertical', color: 'silver' }}
      disabled={false}
      forceReRender={[amount, currency, { layout: 'vertical', color: 'silver' }]}
      fundingSource={undefined}
      createOrder={(data, actions) => {
        return actions.order
          .create({
            purchase_units: [
              {
                amount: {
                  currency_code: currency,
                  value: amount,
                },
              },
            ],
          })
          .then((orderId) => {
            // Your code here after create the order
            return orderId
          })
      }}
      onApprove={onAccept}
      //   onShippingChange={(data: any) => {
      //     console.log(data)
      //   }}
      onCancel={onDenied}
    />
  )
}

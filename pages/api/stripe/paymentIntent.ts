import nc from 'next-connect'
import dbConnect from '../../../config/dbConnect'
import { createStripePaymentIntent, updateStripePaymentIntent } from '../../../controllers/bookingControllers'
import { isAuthenticatedUser } from '../../../middlewares/auth'
import onError from '../../../middlewares/errors'

const handler = nc({ onError })

dbConnect();

handler.use(isAuthenticatedUser).post(createStripePaymentIntent)
handler.use(isAuthenticatedUser).patch(updateStripePaymentIntent)

export default handler
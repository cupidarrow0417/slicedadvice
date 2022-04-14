import nc from 'next-connect'
import dbConnect from '../../../../config/dbConnect'
import { getStripeSetupPayoutsLink } from '../../../../controllers/userControllers'
import { isAuthenticatedUser } from '../../../../middlewares/auth'
import onError from '../../../../middlewares/errors'

const handler = nc({ onError })

dbConnect();

handler.use(isAuthenticatedUser).post(getStripeSetupPayoutsLink)

export default handler
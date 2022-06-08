import nc from 'next-connect'
import dbConnect from '../../../config/dbConnect'
import { currentUserProfile } from '../../../controllers/userControllers'
import { isAuthenticatedUser } from '../../../middlewares/auth'
import onError from '../../../middlewares/errors'

const handler = nc({ onError })

dbConnect();

handler.use(isAuthenticatedUser).get(currentUserProfile)
// handler.get(currentUserProfile)

export default handler
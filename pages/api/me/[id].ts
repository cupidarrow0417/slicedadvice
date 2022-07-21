import nc from 'next-connect'
import dbConnect from '../../../config/dbConnect'
import { getUserProfileById } from '../../../controllers/userControllers'
import { isAuthenticatedUser } from '../../../middlewares/auth'
import onError from '../../../middlewares/errors'

const handler = nc({ onError })

dbConnect();
handler.get(getUserProfileById)

export default handler
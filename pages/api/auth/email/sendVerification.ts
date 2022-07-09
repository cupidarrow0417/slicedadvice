import nc from 'next-connect'
import dbConnect from '../../../../config/dbConnect';
import { sendEmailVerification } from '../../../../controllers/userControllers'
import onError from '../../../../middlewares/errors'

const handler = nc({ onError });

dbConnect();

handler.post(sendEmailVerification)

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '10mb' // Set desired value here
        }
    }
}

export default handler;
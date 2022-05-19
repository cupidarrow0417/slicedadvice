import nc from 'next-connect'
import dbConnect from '../../../config/dbConnect';
import onError from '../../../middlewares/errors'
import { isAuthenticatedUser } from '../../../middlewares/auth';
import { createBooking } from '../../../controllers/bookingControllers';
const handler = nc({ onError });

dbConnect();

// handler.get(allExpertisePosts);
handler.use(isAuthenticatedUser).post(createBooking);

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '10mb' // Set desired value here
        }
    }
}

export default handler;
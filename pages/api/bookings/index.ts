import nc from 'next-connect'
import dbConnect from '../../../config/dbConnect';
import onError from '../../../middlewares/errors'
import { isAuthenticatedUser } from '../../../middlewares/auth';
import { createBooking, allBookings } from '../../../controllers/bookingControllers';
const handler = nc({ onError });

dbConnect();

handler.use(isAuthenticatedUser).get(allBookings);
handler.use(isAuthenticatedUser).post(createBooking);

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '10mb' // Set desired value here
        }
    }
}

export default handler;
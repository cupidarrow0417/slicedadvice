import nc from 'next-connect'
import dbConnect from '../../../config/dbConnect';
import { updateBooking } from '../../../controllers/bookingControllers';
import { isAuthenticatedUser } from '../../../middlewares/auth';
import onError from '../../../middlewares/errors'

const handler = nc({ onError });

dbConnect();

handler.use(isAuthenticatedUser).put(updateBooking);

export default handler;
import nc from 'next-connect'
import dbConnect from '../../../config/dbConnect';
import onError from '../../../middlewares/errors'
import { isAuthenticatedUser } from '../../../middlewares/auth';
import { isStripeOnboardedUser } from '../../../middlewares/stripe';
import { allReviews } from '../../../controllers/reviewControllers';
import { createReview } from '../../../redux/actions/reviewActions';
const handler = nc({ onError });

dbConnect();

handler.get(allReviews);
handler.use(isAuthenticatedUser).post(createReview);

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '10mb' // Set desired value here
        }
    }
}

export default handler;
import nc from 'next-connect'
import dbConnect from '../../../config/dbConnect';
import { allExpertisePosts, createExpertisePost } from '../../../controllers/expertisePostControllers'
import onError from '../../../middlewares/errors'
import { isAuthenticatedUser } from '../../../middlewares/auth';
import { isStripeOnboardedUser } from '../../../middlewares/stripe';
const handler = nc({ onError });

dbConnect();

handler.get(allExpertisePosts);
handler.use(isAuthenticatedUser).use(isStripeOnboardedUser).post(createExpertisePost);

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '10mb' // Set desired value here
        }
    }
}

export default handler;
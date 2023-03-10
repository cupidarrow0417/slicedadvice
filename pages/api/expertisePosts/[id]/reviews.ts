import nc from 'next-connect'
import dbConnect from '../../../../config/dbConnect';
import onError from '../../../../middlewares/errors'
import { isAuthenticatedUser } from '../../../../middlewares/auth';
import { createReview } from '../../../../controllers/reviewControllers';
import { getSinglePostReviews } from '../../../../controllers/reviewControllers'

const handler = nc({ onError });

dbConnect();

handler.get(getSinglePostReviews);
handler.use(isAuthenticatedUser).post(createReview);


export const config = {
    api: {
        bodyParser: {
            sizeLimit: '10mb' // Set desired value here
        }
    }
}

export default handler;
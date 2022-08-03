import nc from 'next-connect'
import dbConnect from '../../../config/dbConnect';
import { updateUserProfile } from '../../../controllers/userControllers'
import onError from '../../../middlewares/errors'
import { isAuthenticatedUser } from '../../../middlewares/auth';
const handler = nc({ onError });

dbConnect();

console.log("hello from update.ts");
handler.use(isAuthenticatedUser).put(updateUserProfile);

// Body Parser limit should be set to 10mb
export const config = {
    api: {
        bodyParser: {
            sizeLimit: '10mb',
        }
    }
}

export default handler;
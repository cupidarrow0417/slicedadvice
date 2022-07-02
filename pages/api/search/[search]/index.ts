import nc from 'next-connect'
import dbConnect from '../../../../config/dbConnect';
import onError from '../../../../middlewares/errors'
import { searchExpertisePosts } from '../../../../controllers/searchControllers';
const handler = nc({ onError });

dbConnect();

handler.get(searchExpertisePosts);

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '10mb' // Set desired value here
        }
    }
}

export default handler;
import nc from 'next-connect'
import dbConnect from '../../../config/dbConnect';
import { allExpertisePosts, newExpertisePost } from '../../../controllers/expertisePostControllers'
import onError from '../../../middlewares/errors'

const handler = nc({ onError });

dbConnect();

handler.get(allExpertisePosts);
handler.post(newExpertisePost);

export default handler;
import nc from 'next-connect'
import dbConnect from '../../../config/dbConnect';
import { allExpertisePosts, newExpertisePost } from '../../../controllers/expertisePostControllers'

const handler = nc();

dbConnect();

handler.get(allExpertisePosts);
handler.post(newExpertisePost);

export default handler;
import nc from 'next-connect'
import dbConnect from '../../../config/dbConnect';
import { getSingleExpertisePost, updateSingleExpertisePost, deleteSingleExpertisePost } from '../../../controllers/expertisePostControllers'

const handler = nc();

dbConnect();

handler.get(getSingleExpertisePost);
handler.put(updateSingleExpertisePost);
handler.delete(deleteSingleExpertisePost);

export default handler;
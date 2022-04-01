import nc from 'next-connect'
import dbConnect from '../../../config/dbConnect';
import { getSingleExpertisePost, updateSingleExpertisePost, deleteSingleExpertisePost } from '../../../controllers/expertisePostControllers'
import onError from '../../../middlewares/errors'

const handler = nc({ onError });

dbConnect();

handler.get(getSingleExpertisePost);
handler.put(updateSingleExpertisePost);
handler.delete(deleteSingleExpertisePost);

export default handler;
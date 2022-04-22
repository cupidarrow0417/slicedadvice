import nc from "next-connect";
import dbConnect from "../../../config/dbConnect";
import { stripeWebhook } from "../../../controllers/webhookControllers";
import onError from "../../../middlewares/errors";

const handler = nc({ onError });

handler.post(stripeWebhook);

export const config = {
    api: {
        bodyParser: false,
    },
};

export default handler;

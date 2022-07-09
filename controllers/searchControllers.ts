import expertisePost from "../models/expertisePost"
import type { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";

const searchExpertisePosts = catchAsyncErrors(
    async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const searchQuery = req.query.search;

        const agg = [
        {
            $search: {
                index: 'expertisePostSearch',
                text: {
                    query: searchQuery,
                    path: "title",
                    fuzzy: {},
                },
            },
        },
        {
            $project: {
                "_id": 1,
                "title": 1,
                "description": 1,
                "images": 1,
            }
        }
    ];

    await expertisePost.aggregate(agg, (err: any, searchQuery: any) => {
        if (err) {
            throw err;
        } else {
            res.status(200).json(searchQuery);
        }
    })
} catch (err) {
        console.error(err);
    }
});

export { searchExpertisePosts };
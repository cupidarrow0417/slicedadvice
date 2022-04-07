import catchAsyncErrors from "./catchAsyncErrors";
import ErrorHandler from "../utils/errorhandler";
import { getSession } from "next-auth/react";
import type { NextApiRequest, NextApiResponse } from 'next'

const isAuthenticatedUser = catchAsyncErrors(async (req: any, res: any, next: any) => {
    const session = await getSession({ req })

    if (!session) {
        return next(new ErrorHandler('Login first to access this resource!', 401))
    }

    req.user = session.user
    next()
})

export {
    isAuthenticatedUser,
}
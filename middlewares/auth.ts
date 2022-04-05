import catchAsyncErrors from "./catchAsyncErrors";
import ErrorHandler from "../utils/errorhandler";
import { getSession } from "next-auth/react";
import type { NextApiRequest, NextApiResponse } from 'next'

const isAuthenticatedUser = catchAsyncErrors(async (req: any, res: any, next: any) => {
    const session = await getSession({ req })
    console.log('session in isAuthenticatedUser: ', session)
    if (!session) {
        return next(new ErrorHandler('Login first to access this resource!', 401))
    }

    console.log("session.user in isAuthenticatedUser: ", session.user)
    req.user = session.user
    console.log('req.user in isAuthenticatedUser', req.user)
    next()
})

export {
    isAuthenticatedUser,
}
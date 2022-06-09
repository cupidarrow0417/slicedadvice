import catchAsyncErrors from "./catchAsyncErrors";
import ErrorHandler from "../utils/errorhandler";
import { getSession } from "next-auth/react";
import type { NextApiRequest, NextApiResponse } from 'next'

/* A middleware function that checks if the user is authenticated. */
const isAuthenticatedUser = catchAsyncErrors(async (req: any, res: any, next: any) => {
    if (req.cookies) {
        // console.log("req.cookies in isAuthenticatedUser", req.cookies);
    } else {
        // console.log("nooooo req.cookies is null :(")
    }
    const session = await getSession({ req })
    console.log("got Session!:", session)
    if (!session) {
        // console.log("not authenticated :( req: ", req)
        console.log("NOT AUTHENTICATED :(")
        return next(new ErrorHandler('Login first to access this resource!', 401))
    } else {
        // console.log("AUTHENTICATED! req: ", req)
    }
    console.log("Authed in!")
    req.user = session.user
    next()
})

export {
    isAuthenticatedUser,
}
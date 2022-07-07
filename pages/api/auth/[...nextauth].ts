import NextAuth, { User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

import UserModel from "../../../models/user";
import dbConnect from "../../../config/dbConnect";
import { JWT } from "next-auth/jwt";

export default NextAuth({
    pages: {
        // signIn: '/login',
        // signOut: '/auth/signout',
        // error: '/auth/error', // Error code passed in query string as ?error=
        // verifyRequest: '/auth/verify-request', // (used for check email message)
        // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
      },
    session: {
        strategy: "jwt",
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                email: {
                    label: "Email",
                    type: "text",
                    placeholder: "email@domain.com",
                },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                dbConnect();

                const email = credentials?.email;
                const password = credentials?.password;

                //Check if email and password is entered
                if (!email || !password) {
                    throw new Error("Please enter your email or password");
                }

                //Find user in the database
                const user = await UserModel.findOne({ email }).select(
                    "+password"
                );

                if (!user) {
                    throw new Error("Invalid Email or Password");
                }

                //Check if password is correct
                const isPasswordMatched = await user.comparePassword(password);

                if (!isPasswordMatched) {
                    throw new Error("Invalid Email or Password");
                }

                //Checks passed, return
                return user;
            },
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            const isAllowedToSignIn = true;
            console.log("user", user);
            if (isAllowedToSignIn) {
                return true;
            } else {
                // Return false to display a default error message
                return false;
                // Or you can return a URL to redirect to:
                // return '/unauthorized'
            }
        },

        // So this is an interesting piece of code. Essentially what this is doing is
        // after the user logs in, it takes the email of the user (from the token) and
        // finds that user in the database, and then adds specific things we want to 
        // to token. (For example, the database id of the user). 
        // This is useful because in the session function, we can then add stuff to the 
        // session itself (via the token). This session is easily available anywhere, anytime in 
        // our app! Really useful to get the currently logged in user's info anytime.
        async jwt({ token, account }) {
            if (token.email) {
                const user = await UserModel.findOne({ email: token.email });
                // console.log("user in jwt", user);
                if (user) {
                    token.name = user.name;
                    token._id = user._id;
                    token.image = user.avatar.url;
                } 
            }
            return token;
        },
        async session({
            session,
            token,
            user,
        }: {
            session: any;
            token: any;
            user: User;
        }) {
            // Send properties to the client, like an access_token from a provider.
            session.user.name = token.name;
            session.user._id = token._id;
            session.user.image = token.image;
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
});

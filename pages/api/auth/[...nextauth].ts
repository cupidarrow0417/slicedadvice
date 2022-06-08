import NextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";

import UserModel from "../../../models/user";
import dbConnect from "../../../config/dbConnect";

export default NextAuth({
    session: {
        strategy: "jwt",
    },
    providers: [
        CredentialProvider({
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
                return user
            },
        }),
    ],
    callbacks: {
        jwt: async ({ token, user }) => {
            user && (token.user = user);
            return Promise.resolve(token);
        },
        session: async ({ session, user, token }: any) => {
            session.user = token.user;
            return Promise.resolve(session);
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
});

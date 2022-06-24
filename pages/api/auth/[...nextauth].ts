import NextAuth, { User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import UserModel from "../../../models/user";
import dbConnect from "../../../config/dbConnect";
import { JWT } from "next-auth/jwt";

export default NextAuth({
    session: {
        strategy: "jwt",
    },
    providers: [
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
              return true
            } else {
              // Return false to display a default error message
              return false
              // Or you can return a URL to redirect to:
              // return '/unauthorized'
            }
          },
        async jwt({ token, account }) {
            // Persist the OAuth access_token to the token right after signin
            if (token.email) {
                const user = await UserModel.findOne({ email: token.email });
                if (user) {
                    token._id = user._id;
                }
            }
            return token;
        },
        async session({ session, token, user }: { session: any; token: JWT; user: User }) {
            // Send properties to the client, like an access_token from a provider.
            session.user._id = token._id;
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
});

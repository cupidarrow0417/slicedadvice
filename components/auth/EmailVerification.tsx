import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Router, { useRouter } from "next/router";

import ButtonLoader from "../layout/ButtonLoader";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { signIn } from "next-auth/react";
import UniversalFadeAnimation from "../atoms/UniversalFadeAnimation";

const EmailVerification = () => {
    const dispatch = useAppDispatch();
    const { query: queryParams } = useRouter();
    const [email, setEmail] = useState("");
    const [showCodeInput, setShowCodeInput] = useState(false);
    const [code, setCode] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Check for queryParam "email". If it exists,
        // auto fill the email state.
        if (queryParams.email) {
            setEmail(queryParams.email.toString());
        }
    }, [queryParams.email]);

    // Build login url. Literally just for that singular button
    // that redirects to the login page.
    let loginUrl: string = "/login";
    if (queryParams.returnUrl && queryParams.returnContext) {
        loginUrl += `?returnUrl=${queryParams.returnUrl.toString()}&returnContext=${queryParams.returnContext.toString()}`;
    }

    const handleSendVerificationCodeClick = async () => {
        setLoading(true);
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const { data } = await axios.post(
                `/api/auth/email/sendVerification`,
                { email },
                config
            );

            if (data.success) {
                toast.success("Verification code was sent to your email!");
                setShowCodeInput(true);
            }
        } catch (error: any) {
            toast.error(error.response.data.message);
        }

        setLoading(false);
    };

    const submitCodeHandler = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        if (!email || !code || code.length !== 6) {
            toast.error("Please fill out all fields.");
            setLoading(false);
            return;
        }

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const { data } = await axios.post(
            `/api/auth/email/checkVerification`,
            { email, code },
            config
        );

        setLoading(false);
        // Email Verified! Push to loginUrl (with returnUrl and returnContext, if they exist)
        if (data.success) {
            toast.success("Verified successfully!");
            const timeout = setTimeout(async () => {
                //await the Credentials (email + password) signIn
                Router.push(loginUrl);
            }, 1500);

            return () => clearTimeout(timeout);
        }
    };

    return (
        <UniversalFadeAnimation animationType="appear">
            <div className="flex flex-col justify-center">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <p className="mt-2 text-center text-sm text-gray-600">
                        {queryParams.returnContext
                            ? `To continue to the ${queryParams.returnContext.toString()},`
                            : ""}
                    </p>
                    <h2 className="mt-1 text-center text-3xl font-extrabold text-gray-900">
                        Verify your email
                    </h2>
                    <p className="mt-2 text-center text-sm font-medium text-brand-primary-light">
                        to be able to login to SlicedAdvice
                    </p>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="flex flex-col gap-4 bg-white py-8 px-4 border border-black/10 shadow sm:rounded-lg sm:px-10">
                        <form
                            className="space-y-6"
                            onSubmit={submitCodeHandler}
                            action="#"
                            method="POST"
                        >
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Email address to verify
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-primary-light/70 focus:border-brand-primary-light/70 sm:text-sm"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                            {/* If the user hasn't sent an email verification code, don't show them the 
                        code input This is set to true in handleSendVerificationCodeClick() */}
                            {!showCodeInput ? (
                                <div>
                                    <button
                                        type="submit"
                                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-primary-light hover:bg-brand-primary-light/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary-light/70"
                                        disabled={loading ? true : false}
                                        onClick={
                                            handleSendVerificationCodeClick
                                        }
                                    >
                                        {loading ? (
                                            <ButtonLoader />
                                        ) : (
                                            "Send Verification Code"
                                        )}
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <div>
                                        <label
                                            htmlFor="code"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Verification code
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                id="code"
                                                name="code"
                                                type="number"
                                                maxLength={6}
                                                required
                                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-primary-light/70 focus:border-brand-primary-light/70 sm:text-sm"
                                                value={code}
                                                onChange={(e) =>
                                                    setCode(e.target.value)
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <button
                                            type="submit"
                                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-primary-light hover:bg-brand-primary-light/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary-light/70"
                                            disabled={loading ? true : false}
                                        >
                                            {loading ? (
                                                <ButtonLoader />
                                            ) : (
                                                "Verify Email"
                                            )}
                                        </button>
                                    </div>
                                </>
                            )}
                        </form>
                    </div>
                    <p className="ml-2 mt-4 block text-xs text-gray-500">
                        Need assistance? Chat with us by clicking the buttom
                        right support widget!
                    </p>
                </div>
            </div>
        </UniversalFadeAnimation>
    );
};

export default EmailVerification;

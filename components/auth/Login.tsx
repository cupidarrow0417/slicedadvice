import { useEffect, useState } from "react";
import Link from "next/link";
import { getSession, signIn } from "next-auth/react";
import { toast } from "react-toastify";

import ButtonLoader from "../layout/ButtonLoader";
import Router, { useRouter } from "next/router";
import { useAppSelector } from "../../redux/hooks";
import GoogleLogo from "../../public/images/googleLogo.png";
import Image from "next/image";
import UniversalFadeAnimation from "../atoms/UniversalFadeAnimation";
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const { query: queryParams } = useRouter();

    const { message } = useAppSelector((state) => state.resetPassword);

    // Build the register url with the optional redirect params,
    // to handle redirects if the user clicks register.
    let registerUrl: string = "/register";
    if (queryParams.returnUrl && queryParams.returnContext) {
        registerUrl += `?returnUrl=${queryParams.returnUrl.toString()}&returnContext=${queryParams.returnContext.toString()}`;
    }

    useEffect(() => {
        if (message) {
            toast.success(message);
        }
    }, [message]);

    const submitHandler = async (providerId: "credentials" | "google") => {
        setLoading(true);

        let result: any;
        if (providerId === "credentials") {
            //await the Credentials (email + password) signIn
            result = await signIn("credentials", {
                redirect: false,
                email,
                password,
            });
        } else if (providerId === "google") {
            let callbackUrl = "/";
            if (queryParams.returnUrl) {
                callbackUrl = queryParams.returnUrl.toString();
            }
            //await the Google signIn
            result = await signIn("google", {
                redirect: false,
                callbackUrl: callbackUrl,
            });
        }

        setLoading(false);

        if (result && result.error) {
            toast.error(result.error);
        } else if (queryParams.returnUrl) {
            //else, successful login! Redirect to either the
            //homepage or the returnUrl (the url from which the user
            //was sent to the sign in page from)
            Router.push(queryParams.returnUrl.toString());
        } else {
            Router.push("/");
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
                        Sign in to your account
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Or{" "}
                        <Link href={registerUrl}>
                            <a className="font-medium text-brand-primary-light hover:text-brand-primary-light/70">
                                create a new account
                            </a>
                        </Link>
                    </p>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 border border-black/10 shadow sm:rounded-lg sm:px-10">
                        {/* <div className=""> */}
                        <button
                            onClick={() => submitHandler("google")}
                            key={"Google"}
                            className="m-auto flex justify-center items-center gap-4 bg-white rounded-md p-3 border border-gray-300 hover:opacity-80"
                        >
                            <Image src={GoogleLogo} width={20} height={20} />
                            <h1 className="text-sm font-semibold text-gray-600">
                                Sign in with Google
                            </h1>
                        </button>
                        <div className="relative my-4">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">
                                    or by credentials
                                </span>
                            </div>
                        </div>
                        <form className="space-y-6" action="#" method="POST">
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Email address
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
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Password
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-primary-light/70 focus:border-brand-primary-light/70 sm:text-sm"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                            <div className="flex items-center justify-end">
                                {/* <div className="flex items-center">
                                    <input
                                        id="remember-me"
                                        name="remember-me"
                                        type="checkbox"
                                        checked={true}
                                        onChange={() => true}
                                        className="h-4 w-4 text-brand-primary-light focus:ring-brand-primary-light/70 border-gray-300 rounded"
                                    />
                                    <label
                                        htmlFor="remember-me"
                                        className="ml-2 block text-sm text-gray-900"
                                    >
                                        Remember me
                                    </label>
                                </div> */}

                                <div className="text-sm">
                                    <Link href="/password/forgot">
                                        <a className="font-medium text-brand-primary-light hover:text-brand-primary-light/70">
                                            Forgot your password?
                                        </a>
                                    </Link>
                                </div>
                            </div>

                            <div>
                                <button
                                    onClick={() => submitHandler("credentials")}
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-primary-light hover:bg-brand-primary-light/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary-light/70"
                                    disabled={loading ? true : false}
                                >
                                    {loading ? <ButtonLoader /> : "Sign in"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </UniversalFadeAnimation>
    );
};

export default Login;

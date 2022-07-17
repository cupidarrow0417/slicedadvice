import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Router, { useRouter } from "next/router";

import ButtonLoader from "../layout/ButtonLoader";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import axios from "axios";
import UniversalFadeAnimation from "../atoms/UniversalFadeAnimation";

// With Register, we are handling the two Sign Up options:
// Credentials, and Google Sign In. Google Sign in is extremely simple.
// It just works. But with credentials, the moment we create the user
// successfully we send them straight to the email verification page
// to verify their email. That's the only way they can log in successfully.
const Register = () => {
    const dispatch = useAppDispatch();
    const { query: queryParams } = useRouter();
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);

    // Build the email verification url with the optional redirect params,
    // to handle redirects after signup.
    let emailVerificationUrl: string = "/emailVerification";
    // Build login url. Literally just for that singular button
    // that redirects to the login page.
    let loginUrl: string = "/login";
    if (queryParams.returnUrl && queryParams.returnContext) {
        // Querys exist, append ? to the url.
        emailVerificationUrl += "?";
        loginUrl += "?";
        // Make sure to add the "&" at the end of each addition to the query string.
        emailVerificationUrl += `returnUrl=${queryParams.returnUrl.toString()}&returnContext=${queryParams.returnContext.toString()}&`;
        loginUrl += `returnUrl=${queryParams.returnUrl.toString()}&returnContext=${queryParams.returnContext.toString()}&`;
    }

    const { name, email, password } = user;

    const [avatar, setAvatar] = useState("/images/default_avatar.jpeg");
    const [avatarPreview, setAvatarPreview] = useState(
        "/images/default_avatar.jpeg"
    );
    const [confirmPassword, setConfirmPassword] = useState("");

    // If the user submits by credentials,
    // register them.
    const submitCredentialsHandler = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        if (password === confirmPassword) {
            const userData = {
                name,
                email,
                password,
                avatar,
            };

            try {
                const { data } = await axios.get(
                    `/api/auth/duplicate?email=${email}&name=${name}`
                );
                if (data.duplicateName) {
                    toast.error("Name is already taken.");
                    setLoading(false);
                    return;
                }
                if (data.duplicateEmail) {
                    toast.error(
                        "Email is already taken. Contact support if you need further assistance."
                    );
                    setLoading(false);
                    return;
                }
            } catch (error: any) {
                toast.error(error.response.data.message);
                setLoading(false);
                return;
            }

            try {
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                    },
                };
                const { data } = await axios.post(
                    `/api/auth/register`,
                    userData,
                    config
                );

                if (data.user) {
                    let newlyRegisteredUser = data.user;

                    // Finally, attach the user email to the emailVerificationUrl
                    // to autofill the email field on the email verification page.
                    // Just for good UX!

                    // Append ? to url if it doesn't exist yet
                    if (!emailVerificationUrl.includes("?")) {
                        emailVerificationUrl += "?";
                    }

                    emailVerificationUrl += `email=${newlyRegisteredUser.email}&`;
                    Router.push(emailVerificationUrl);
                }
            } catch (err: any) {
                toast.error(err.response.data.message);
            }
        } else {
            toast.error("Please try confirming the password again.");
        }
        setLoading(false);
    };

    // If the user clicks the Google button,
    // do the same signin process as Login page!
    // We will handle if the user hasn't created an account yet
    // with whatever email they enter.
    const handleGoogleSignIn = async () => {
        setGoogleLoading(true);
        //await the Google signIn
        let result = await signIn("google", {
            redirect: false,
        });
        setGoogleLoading(false);
        // if (result && result.error) {
        //     toast.error(result.error);
        // } else if (queryParams.returnUrl) {
        //     //else, successful login! Redirect to either the
        //     //homepage or the returnUrl (the url from which the user
        //     //was sent to the sign in page from)
        //     Router.push(loginUrl);
        // } else {
        //     Router.push("/login");
        // }
    };

    // LEFT OFF TESTING EMAIL VERIFICATION. TRY IT AGAIN, TO MAKE SURE.
    // THEN PUSH CHANGES, AND MOVE ONTO FIXING THIS BUG WITH THE USER SETTINGS PAGE.
    // CURRENTLY, USERS CAN"T SIMPLY MAKE A NEW PASSWORD UNLESS THEY ALSO CHANGE THEIR USERNAME.
    const onChange = (e: any) => {
        if (e.target.name === "avatar") {
            const reader: any = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatar(reader.result);
                    setAvatarPreview(reader.result);
                }
            };
            reader.readAsDataURL(e.target.files[0]);
        } else if (e.target.name === "confirm-password") {
            setConfirmPassword(e.target.value);
        } else {
            setUser({ ...user, [e.target.name]: e.target.value });
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
                        Create a new account
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Or{" "}
                        <Link href={loginUrl}>
                            <a className="font-medium text-brand-primary-light hover:text-brand-primary-light/70">
                                login to an existing one
                            </a>
                        </Link>
                    </p>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 border border-black/10 shadow sm:rounded-lg sm:px-10">
                        <div>
                            <div className="relative">
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-gray-500">
                                        Register with
                                    </span>
                                </div>
                            </div>

                            <div className="mt-6 flex justify-center items-center">
                                <button
                                    onClick={() => handleGoogleSignIn()}
                                    className="flex justify-center items-center gap-4 bg-white rounded-md p-3 border border-gray-300 hover:opacity-80"
                                    disabled={googleLoading}
                                >
                                    <Image
                                        src="/images/googleLogo.png"
                                        width={20}
                                        height={20}
                                    />
                                    <h1 className="text-sm font-semibold text-gray-600">
                                        {googleLoading ? (
                                            <ButtonLoader />
                                        ) : (
                                            "Sign in with Google"
                                        )}
                                    </h1>
                                </button>
                                {/* <div>
                                <a
                                    href="#"
                                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                >
                                    <span className="sr-only">
                                        Register with Facebook
                                    </span>
                                    <svg
                                        className="w-5 h-5"
                                        aria-hidden="true"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </a>
                            </div>

                            <div>
                                <a
                                    href="#"
                                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                >
                                    <span className="sr-only">
                                        Register with Twitter
                                    </span>
                                    <svg
                                        className="w-5 h-5"
                                        aria-hidden="true"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                                    </svg>
                                </a>
                            </div>

                            <div>
                                <a
                                    href="#"
                                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                >
                                    <span className="sr-only">
                                        Register with GitHub
                                    </span>
                                    <svg
                                        className="w-5 h-5"
                                        aria-hidden="true"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </a>
                            </div> */}
                            </div>
                            <div className="relative my-6">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300" />
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-gray-500">
                                        or by credentials
                                    </span>
                                </div>
                            </div>
                        </div>
                        <form
                            className="space-y-6"
                            onSubmit={submitCredentialsHandler}
                            action="#"
                            method="POST"
                        >
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
                                        onChange={onChange}
                                    />
                                </div>
                            </div>
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Username
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="name"
                                        name="name"
                                        type="name"
                                        required
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-primary-light/70 focus:border-brand-primary-light/70 sm:text-sm"
                                        value={name}
                                        onChange={onChange}
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between">
                                    <label
                                        htmlFor="password"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Password
                                    </label>
                                    <span
                                        className="text-sm text-gray-500"
                                        id="email-optional"
                                    >
                                        6+ Characters
                                    </span>
                                </div>
                                <div className="mt-1">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-primary-light/70 focus:border-brand-primary-light/70 sm:text-sm"
                                        value={password}
                                        onChange={onChange}
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between">
                                    <label
                                        htmlFor="password"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Confirm Password
                                    </label>
                                </div>
                                <div className="mt-1">
                                    <input
                                        id="confirm-password"
                                        name="confirm-password"
                                        type="password"
                                        required
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-primary-light/70 focus:border-brand-primary-light/70 sm:text-sm"
                                        onChange={onChange}
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between">
                                    <label
                                        htmlFor="profile-picture"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Profile Picture
                                    </label>
                                    <span
                                        className="text-sm text-gray-500"
                                        id="profile-picture-optional"
                                    >
                                        Optional
                                    </span>
                                </div>
                                <div className="flex justify-start gap-5 items-center mt-1">
                                    <img
                                        className="inline-block h-14 w-14 rounded-full"
                                        src={avatarPreview}
                                        alt=""
                                    />
                                    <div className="flex justify-center">
                                        <input
                                            className="appearance-none block px-3 w-full py-2 mt-4 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-primary-light focus:border-brand-primary-light sm:text-sm
                                        file:mr-4 file:py-2 file:px-4
                                        file:rounded-full file:border-0
                                        file:text-sm file:font-semibold
                                        file:bg-brand-primary-light/5 file:text-brand-primary-light
                                        hover:file:bg-brand-primary-light/10"
                                            type="file"
                                            id="formFile"
                                            name="avatar"
                                            onChange={onChange}
                                            accept="images/*"
                                        />
                                    </div>
                                </div>
                            </div>
                            {/* <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Confirm Password
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
                                    onChange={onChange}
                                />
                            </div>
                        </div> */}
                            {/* <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        id="mailing-list"
                                        name="mailing-list"
                                        type="checkbox"
                                        className="h-4 w-4 text-brand-primary-light focus:ring-brand-primary-light/70 border-gray-300 rounded"
                                    />
                                    <label
                                        htmlFor="mailing-list"
                                        className="ml-2 block text-sm text-gray-900"
                                    >
                                        I'd love useful advice, coupons, and
                                        updates sent occassionally to my email.
                                    </label>
                                </div>
                            </div> */}

                            <div>
                                <button
                                    type="submit"
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-primary-light hover:bg-brand-primary-light/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary-light/70"
                                    disabled={loading ? true : false}
                                >
                                    {loading ? <ButtonLoader /> : "Register"}
                                </button>
                            </div>
                        </form>
                    </div>
                    <Link href="/emailVerification">
                        <a className="ml-2 mt-4 block text-xs text-gray-500">
                            Looking for the email verification page? Click here.
                        </a>
                    </Link>
                </div>
            </div>
        </UniversalFadeAnimation>
    );
};

export default Register;

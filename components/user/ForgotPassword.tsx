import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import ButtonLoader from "../layout/ButtonLoader";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { forgotPassword, clearErrors } from "../../redux/actionCreators/userActions";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");

    const dispatch = useAppDispatch();

    const { error, loading, message } = useAppSelector(
        (state) => state.forgotPassword
    );

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors);
        }

        if (message) {
            toast.success(message);
        }
    }, [dispatch, error, message]);

    const submitHandler = (e: any) => {
        e.preventDefault();

        const userData = {
            email,
        };

        dispatch(forgotPassword(userData));
    };
    return (
        <div className="bg-white shadow sm:rounded-lg w-fit mx-auto">
            <div className="px-4 py-5 sm:p-6 w-full">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Forgot your password? No problem!
                </h3>
                <div className="mt-2 max-w-xl text-sm text-gray-500">
                    <p>
                        Just enter your email associated with the account and we&apos;ll send a link that
                        you can use to reset your password. 
                    </p>
                </div>
                <form className="mt-5 sm:flex sm:items-center" onSubmit={submitHandler}>
                    <div className="w-full sm:max-w-xs">
                        <label htmlFor="email" className="sr-only">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="shadow-sm focus:ring-brand-primary focus:border-brand-primary block w-full sm:text-sm border-gray-300 rounded-md"
                            placeholder="you@example.com"
                        />
                    </div>
                    <button
                        type="submit"
                        className="mt-3 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-brand-primary-light hover:bg-brand-primary-light/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                        disabled={loading ? true : false}
                    >
                        {loading ? <ButtonLoader /> : "Send Email"}
                    </button>
                </form>
                <div className="mt-4 ml-[1px] max-w-xl text-xs opacity-60 text-gray-500">
                    <p>
                        Can&apos;t find the email? Check your spam folder.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;

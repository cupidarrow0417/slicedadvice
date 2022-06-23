import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import ButtonLoader from "../layout/ButtonLoader";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { resetPassword, clearErrors } from "../../redux/actionCreators/userActions";

const ResetPassword = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const router = useRouter();
    const dispatch = useAppDispatch();

    const { error, loading, success, message } = useAppSelector(
        (state) => state.resetPassword
    );

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors);
        }

        if (success) {
            router.push("/login");
        }
    }, [dispatch, error, success]);

    const submitHandler = (e: any) => {
        e.preventDefault();

        if (password === confirmPassword) {

            const userData = {
                password,
            }
            dispatch(resetPassword(userData, router.query.token));
        } else {
            toast.error("Passwords do not match. Please try again.");
        }
    };
    return (
        <div className="bg-white shadow sm:rounded-lg w-fit mx-auto">
            <div className="px-4 py-5 sm:p-6 w-full">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Password Reset
                </h3>
                <div className="mt-2 max-w-xl text-sm text-gray-500">
                    <p>
                        Hey! To reset your password, just enter a new password
                        and then confirm it. Make sure it has 6 or more
                        characters.
                    </p>
                </div>
                <form className="mt-5 flex flex-col items-start gap-3" onSubmit={submitHandler}>
                    <div className="w-full sm:max-w-xs">
                        <label htmlFor="password" className="sr-only">
                            Password
                        </label>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="shadow-sm focus:ring-brand-primary focus:border-brand-primary block w-full sm:text-sm border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <div className="w-full sm:max-w-xs">
                        <label htmlFor="confirm-password" className="sr-only">
                            Confirm Password
                        </label>
                        <label
                            htmlFor="confirm-password"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            name="confirm-password"
                            id="confirm-password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="shadow-sm focus:ring-brand-primary focus:border-brand-primary block w-full sm:text-sm border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="mt-3 text-sm inline-flex items-center justify-center px-3 w-full sm:w-auto py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-brand-primary-light hover:bg-brand-primary-light/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary"
                        disabled={loading ? true : false}
                    >
                        {loading ? <ButtonLoader /> : "Reset Password"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;

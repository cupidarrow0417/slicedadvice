import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Router from "next/router";

import ButtonLoader from "../layout/ButtonLoader";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
    updateUserProfile,
    clearErrors,
} from "../../redux/actionCreators/userActions";
import { UPDATE_USER_PROFILE_RESET } from "../../redux/constants/userConstants";

import {
    CreditCardIcon,
    KeyIcon,
    UserCircleIcon,
    UserGroupIcon,
    ViewGridAddIcon,
} from "@heroicons/react/outline";
import UniversalFadeAnimation from "../atoms/UniversalFadeAnimation";
import axios from "axios";
import Loader from "../layout/Loader";
import Image from "next/future/image";
import resizeFile from "../../utils/resizeFile";
import newCloudinaryImage from "../../utils/newCloudinaryImage";

const navigation = [
    { name: "Profile", href: "#", icon: UserCircleIcon, current: true },
    // { name: "Password", href: "#", icon: KeyIcon, current: false },
    // { name: "Billing", href: "#", icon: CreditCardIcon, current: false },
    // { name: "Team", href: "#", icon: UserGroupIcon, current: false },
    // { name: "Integrations", href: "#", icon: ViewGridAddIcon, current: false },
];

export default function Settings() {
    const dispatch = useAppDispatch();

    // All local state
    const [loading, setLoading] = useState(false);
    const [userInteracted, setUserInteracted] = useState(false);
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
    });
    const { name, email, password } = user;
    const [avatar, setAvatar] = useState("");
    const [avatarPreview, setAvatarPreview] = useState(
        "/images/default_avatar.jpeg"
    );
    const [changedAvatar, setChangedAvatar] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");

    // Reach into global state
    const { user: authUser, loading: authLoading } = useAppSelector((state) => {
        return state.auth;
    });
    const {
        error,
        isUpdated,
        user: userAfterUpdating,
        loading: userLoading,
    } = useAppSelector((state) => state.user);

    useEffect(() => {
        // After updating, set frontend user state to match new
        // backend user state
        if (userAfterUpdating) {
            setUser({
                name: userAfterUpdating.name,
                email: userAfterUpdating.email,
                password: "",
            });
            setConfirmPassword("");
            setAvatarPreview(userAfterUpdating.avatar.url);
        } else if (authUser) {
            // Initial Setting of user state so frontend
            // can load stuff.
            setUser({
                name: authUser.name,
                email: authUser.email,
                password: "",
            });
            setAvatarPreview(authUser.avatar.url);
        }

        if (error) {
            toast.error(error);
            dispatch(clearErrors);
        }

        if (isUpdated) {
            dispatch({ type: UPDATE_USER_PROFILE_RESET });
            toast.success("Profile updated successfully!");
            // Refresh to make sure the session is reloaded with the right info.
            setTimeout(() => {
                window.location.href = "/me/settings/";
            }, 1500);
        }
    }, [dispatch, isUpdated, error, authUser, userAfterUpdating]);

    const submitHandler = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        // Only run if authUser is loaded from getServerSideProps
        if (!authUser) {
            setLoading(false);
            return;
        }
        let cloudinaryImageData;
        if (changedAvatar) {
            try {
                let result: any = await newCloudinaryImage(avatar, "avatars_unsigned_upload_preset_slicedadvice");
                cloudinaryImageData = {
                    public_id: result.public_id,
                    url: result.secure_url,
                };
            } catch (error) {
                console.log(error);
                setLoading(false);
                return;
            }
        }

        // Case where user does anything with change password fields
        if (password || confirmPassword) {
            if (password !== confirmPassword) {
                toast.error("Passwords do not match!");
                setLoading(false);
                return;
            }
            if (password.length < 6) {
                toast.error("Password must be at least 6 characters!");
                setLoading(false);
                return;
            }

            // Else, all good to go. Update user
            dispatch(
                updateUserProfile({
                    userId: authUser._id,
                    name,
                    email: "",
                    password,
                    cloudinaryImageData: changedAvatar
                        ? cloudinaryImageData
                        : null,
                })
            );
        } else {
            // Case where user doesn't try to change password (aka password and
            // confirmPassword are empty strings)
            // All good to go. Update user. Don't even input password. Update
            // avatar if changedAvatar === true. Else, send empty string.
            dispatch(
                updateUserProfile({
                    userId: authUser._id,
                    name,
                    email: "",
                    cloudinaryImageData: changedAvatar
                        ? cloudinaryImageData
                        : null,
                })
            );
        }
        setLoading(false);
    };

    const onChange = (e: any) => {
        setUserInteracted(true);
        if (e.target.name === "avatar") {
            setChangedAvatar(true);
            // const reader: any = new FileReader();

            // reader.onload = () => {
            //     if (reader.readyState === 2) {
            //         setAvatar(reader.result);
            //         setAvatarPreview(reader.result);
            //     }
            // };
            // reader.readAsDataURL(e.target.files[0]);
            resizeFile(e.target.files[0], 400, 400).then((resizedFile: any) => {
                setAvatar(resizedFile);
                setAvatarPreview(resizedFile);
            });
        } else if (e.target.name === "confirm-password") {
            setConfirmPassword(e.target.value);
        } else {
            setUser({ ...user, [e.target.name]: e.target.value });
        }
    };

    return (
        <UniversalFadeAnimation>
            <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
                <aside className="py-6 px-2 sm:px-6 lg:py-0 lg:px-0 lg:col-span-3">
                    <nav className="space-y-1">
                        {navigation.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                className={classNames(
                                    item.current
                                        ? "text-brand-primary-light bg-white"
                                        : "text-gray-900 hover:text-gray-900 hover:bg-white",
                                    "group rounded-md px-3 py-2 flex items-center text-sm font-medium"
                                )}
                                aria-current={item.current ? "page" : undefined}
                            >
                                <item.icon
                                    className={classNames(
                                        item.current
                                            ? "text-brand-primary-light group-hover:text-brand-primary-light"
                                            : "text-gray-400 group-hover:text-gray-500",
                                        "flex-shrink-0 -ml-1 mr-3 h-6 w-6"
                                    )}
                                    aria-hidden="true"
                                />
                                <span className="truncate">{item.name}</span>
                            </a>
                        ))}
                    </nav>
                </aside>
                <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
                    <form action="#" method="PUT" onSubmit={submitHandler}>
                        <div className="shadow sm:rounded-md sm:overflow-hidden">
                            <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
                                <div>
                                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                                        Profile
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500">
                                        Only your username and avatar are
                                        publically visible to other users.
                                    </p>
                                </div>

                                <div className="grid grid-cols-3 gap-6">
                                    <div className="col-span-3 sm:col-span-2">
                                        <label
                                            htmlFor="username"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Username
                                        </label>
                                        <div className="mt-1 rounded-md shadow-sm flex">
                                            {/* <span className="bg-gray-50 border border-r-0 border-gray-300 rounded-l-md px-3 inline-flex items-center text-gray-500 sm:text-sm">
                                            workcation.com/
                                        </span> */}
                                            <input
                                                type="text"
                                                name="name"
                                                id="name"
                                                value={user.name}
                                                autoComplete="name"
                                                onChange={onChange}
                                                className="focus:ring-brand-primary-light focus:border-brand-primary-light flex-grow block w-full min-w-0 rounded-md sm:text-sm border-gray-300"
                                            />
                                        </div>
                                    </div>
                                    {/* <div className="col-span-3 sm:col-span-2">
                                        <label
                                            htmlFor="email"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Email
                                        </label>
                                        <div className="mt-1 rounded-md shadow-sm flex">
                                            <input
                                                type="text"
                                                name="email"
                                                id="email"
                                                value={user.email}
                                                autoComplete="email"
                                                onChange={onChange}
                                                className="focus:ring-brand-primary-light focus:border-brand-primary-light flex-grow block w-full min-w-0 rounded-md sm:text-sm border-gray-300"
                                            />
                                        </div>
                                    </div> */}

                                    {/* Google user's shouldn't be able to change their
                                    password! */}
                                    {authLoading ? (
                                        <Loader />
                                    ) : authUser?.role !== "googleUser" ? (
                                        <>
                                            <div className="col-span-3 sm:col-span-2">
                                                <label
                                                    htmlFor="password"
                                                    className="block text-sm font-medium text-gray-700"
                                                >
                                                    New Password
                                                </label>
                                                <div className="mt-1">
                                                    <input
                                                        id="password"
                                                        name="password"
                                                        type="password"
                                                        autoComplete="current-password"
                                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-primary-light focus:border-brand-primary-light sm:text-sm"
                                                        // value={password}
                                                        onChange={onChange}
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-span-3 sm:col-span-2">
                                                <label
                                                    htmlFor="password"
                                                    className="block text-sm font-medium text-gray-700"
                                                >
                                                    Confirm New Password
                                                </label>
                                                <div className="mt-1">
                                                    <input
                                                        id="confirm-password"
                                                        name="confirm-password"
                                                        type="password"
                                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-primary-light focus:border-brand-primary-light sm:text-sm"
                                                        onChange={onChange}
                                                    />
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="col-span-3 sm:col-span-2">
                                            <p className="block text-sm font-medium text-gray-700">
                                                Change Google Password
                                            </p>

                                            <a
                                                href="https://support.google.com/accounts/answer/41078?hl=en&co=GENIE.Platform%3DDesktop"
                                                target="_blank"
                                                rel="noreferrer"
                                                className="w-fit mt-1 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-black/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary-light/70"
                                            >
                                                Click here
                                            </a>
                                        </div>
                                    )}

                                    {/* <div className="col-span-3">
                                    <label
                                        htmlFor="about"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        About
                                    </label>
                                    <div className="mt-1">
                                        <textarea
                                            id="about"
                                            name="about"
                                            rows={3}
                                            className="shadow-sm focus:ring-brand-primary-light focus:border-brand-primary-light mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                                            placeholder="you@example.com"
                                            defaultValue={""}
                                        />
                                    </div>
                                    <p className="mt-2 text-sm text-gray-500">
                                        Brief description for your profile. URLs
                                        are hyperlinked.
                                    </p>
                                </div> */}

                                    <div className="col-span-3">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Avatar
                                        </label>
                                        <div className="flex justify-start gap-3 items-center mt-1">
                                            <Image
                                                className="inline-block h-14 w-14 rounded-full object-cover"
                                                src={avatarPreview}
                                                alt="Preview of profile picture"
                                                width={56}
                                                height={56}
                                            />
                                            <input
                                                className="appearance-none block  px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-primary-light/70 focus:border-brand-primary-light/70 sm:text-sm"
                                                type="file"
                                                id="formFile"
                                                name="avatar"
                                                accept="image/*"
                                                onChange={onChange}
                                            />
                                        </div>
                                    </div>

                                    {/* <div className="col-span-3">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Cover photo
                                    </label>
                                    <div className="mt-1 border-2 border-gray-300 border-dashed rounded-md px-6 pt-5 pb-6 flex justify-center">
                                        <div className="space-y-1 text-center">
                                            <svg
                                                className="mx-auto h-12 w-12 text-gray-400"
                                                stroke="currentColor"
                                                fill="none"
                                                viewBox="0 0 48 48"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                    strokeWidth={2}
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                            <div className="flex text-sm text-gray-600">
                                                <label
                                                    htmlFor="file-upload"
                                                    className="relative cursor-pointer bg-white rounded-md font-medium text-brand-primary-light/70 hover:text-brand-primary-light focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-brand-primary-light"
                                                >
                                                    <span>Upload a file</span>
                                                    <input
                                                        id="file-upload"
                                                        name="file-upload"
                                                        type="file"
                                                        className="sr-only"
                                                    />
                                                </label>
                                                <p className="pl-1">
                                                    or drag and drop
                                                </p>
                                            </div>
                                            <p className="text-xs text-gray-500">
                                                PNG, JPG, GIF up to 10MB
                                            </p>
                                        </div>
                                    </div>
                                </div> */}
                                </div>
                            </div>
                            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                <button
                                    type="submit"
                                    disabled={
                                        !userInteracted ||
                                        userLoading ||
                                        loading
                                            ? true
                                            : false
                                    }
                                    className="bg-brand-primary-light border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-brand-primary-light/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary-light"
                                >
                                    {userLoading || loading ? (
                                        <ButtonLoader />
                                    ) : (
                                        "Save"
                                    )}
                                </button>
                            </div>
                        </div>
                    </form>
                    {/* <form action="#" method="POST">
                    <div className="shadow sm:rounded-md sm:overflow-hidden">
                        <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
                            <div>
                                <h3 className="text-lg leading-6 font-medium text-gray-900">
                                    Notifications
                                </h3>
                                <p className="mt-1 text-sm text-gray-500">
                                    Provide basic informtion about the job. Be
                                    specific with the job title.
                                </p>
                            </div>

                            <fieldset>
                                <legend className="text-base font-medium text-gray-900">
                                    By Email
                                </legend>
                                <div className="mt-4 space-y-4">
                                    <div className="flex items-start">
                                        <div className="h-5 flex items-center">
                                            <input
                                                id="comments"
                                                name="comments"
                                                type="checkbox"
                                                className="focus:ring-brand-primary-light h-4 w-4 text-brand-primary-light/70 border-gray-300 rounded"
                                            />
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label
                                                htmlFor="comments"
                                                className="font-medium text-gray-700"
                                            >
                                                Comments
                                            </label>
                                            <p className="text-gray-500">
                                                Get notified when someones posts
                                                a comment on a posting.
                                            </p>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex items-start">
                                            <div className="h-5 flex items-center">
                                                <input
                                                    id="candidates"
                                                    name="candidates"
                                                    type="checkbox"
                                                    className="focus:ring-brand-primary-light h-4 w-4 text-brand-primary-light/70 border-gray-300 rounded"
                                                />
                                            </div>
                                            <div className="ml-3 text-sm">
                                                <label
                                                    htmlFor="candidates"
                                                    className="font-medium text-gray-700"
                                                >
                                                    Candidates
                                                </label>
                                                <p className="text-gray-500">
                                                    Get notified when a
                                                    candidate applies for a job.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex items-start">
                                            <div className="h-5 flex items-center">
                                                <input
                                                    id="offers"
                                                    name="offers"
                                                    type="checkbox"
                                                    className="focus:ring-brand-primary-light h-4 w-4 text-brand-primary-light/70 border-gray-300 rounded"
                                                />
                                            </div>
                                            <div className="ml-3 text-sm">
                                                <label
                                                    htmlFor="offers"
                                                    className="font-medium text-gray-700"
                                                >
                                                    Offers
                                                </label>
                                                <p className="text-gray-500">
                                                    Get notified when a
                                                    candidate accepts or rejects
                                                    an offer.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </fieldset>
                            <fieldset className="mt-6">
                                <legend className="text-base font-medium text-gray-900">
                                    Push Notifications
                                </legend>
                                <p className="text-sm text-gray-500">
                                    These are delivered via SMS to your mobile
                                    phone.
                                </p>
                                <div className="mt-4 space-y-4">
                                    <div className="flex items-center">
                                        <input
                                            id="push-everything"
                                            name="push-notifications"
                                            type="radio"
                                            className="focus:ring-brand-primary-light h-4 w-4 text-brand-primary-light/70 border-gray-300"
                                        />
                                        <label
                                            htmlFor="push-everything"
                                            className="ml-3"
                                        >
                                            <span className="block text-sm font-medium text-gray-700">
                                                Everything
                                            </span>
                                        </label>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            id="push-email"
                                            name="push-notifications"
                                            type="radio"
                                            className="focus:ring-brand-primary-light h-4 w-4 text-brand-primary-light/70 border-gray-300"
                                        />
                                        <label
                                            htmlFor="push-email"
                                            className="ml-3"
                                        >
                                            <span className="block text-sm font-medium text-gray-700">
                                                Same as email
                                            </span>
                                        </label>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            id="push-nothing"
                                            name="push-notifications"
                                            type="radio"
                                            className="focus:ring-brand-primary-light h-4 w-4 text-brand-primary-light/70 border-gray-300"
                                        />
                                        <label
                                            htmlFor="push-nothing"
                                            className="ml-3"
                                        >
                                            <span className="block text-sm font-medium text-gray-700">
                                                No push notifications
                                            </span>
                                        </label>
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                            <button
                                type="submit"
                                className="bg-brand-primary-light border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-brand-primary-light/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary-light/70"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </form> */}
                </div>
            </div>
        </UniversalFadeAnimation>
    );
}

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(" ");
}

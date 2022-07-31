import { createRef, useEffect, useRef, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { toast } from "react-toastify";
import { ChevronRightIcon, HomeIcon, StarIcon } from "@heroicons/react/solid";
import {
    clearErrors,
    createExpertisePost,
} from "../../redux/actionCreators/expertisePostActions";

import Image from "next/image";
import RatingsWidget from "../atoms/RatingsWidget";
import FormSelectMenu from "../atoms/FormSelectMenu";
import Router from "next/router";
import ButtonLoader from "../layout/ButtonLoader";
import UniversalFadeAnimation from "../atoms/UniversalFadeAnimation";

// Used in form inputs, and also hard
// coded into model schema for expertise posts.
// Change accordingly if schema changes.
const maxTitleLength = 100;
const maxDescriptionLength = 1000;
const maxSubmissionExampleLength = 20;

// Used for the Form Select Menu component
const formSelectMenuOptions = [
    {
        title: "Engineering",
        description:
            "Advice that helps aspiring engineers build a successful career in software, hardware, or other engineering fields.",
        current: true,
    },
    {
        title: "Business",
        description:
            "Advice that helps people build an impactful career in any business field, including growing their own business.",
        current: false,
    },
    {
        title: "Healthcare",
        description:
            "Advice that helps people break into and progress through the healthcare industry.",
        current: false,
    },
    // {
    //     title: "Other",
    //     description:
    //         "Be a trendsetter! This category contains advice not currently focused on by SlicedAdvice at this time.",
    //     current: false,
    // },
];

const CreateExpertisePost = () => {
    const dispatch = useAppDispatch();

    const { user: authUser } = useAppSelector((state) => {
        return state.auth;
    });

    // Access global state that processes the createExpertisePost process,
    // displaying appropriate UI based on progress + errors.
    const {
        expertisePostId,
        success: createExpertisePostSuccess,
        error: createExpertisePostError,
        loading: createExpertisePostLoading,
    } = useAppSelector((state) => {
        return state.createExpertisePost;
    });

    // A post consists of a user, title, description, image, at least one submission
    // type, and a pricePerSubmission. Image is taken care of in the image local state,
    // as well as the submission type strings. The current user is inputted on submission
    // automatically.
    const [post, setPost] = useState({
        title: "",
        description: "",
        pricePerSubmission: "",
        category: "Engineering",
    });
    const { title, description, pricePerSubmission, category } = post;

    const [image, setImage] = useState("");
    const [imagePreview, setImagePreview] = useState("");

    const [submissionType1, setSubmissionType1] = useState("");
    const [submissionType2, setSubmissionType2] = useState("");
    const [submissionType3, setSubmissionType3] = useState("");

    const formSelectMenuInputRef = createRef<HTMLInputElement>();

    // Listen to the global state of the createExpertisePost process
    useEffect(() => {
        if (createExpertisePostError) {
            toast.error(createExpertisePostError);
            dispatch(clearErrors());
        }

        if (createExpertisePostSuccess) {
            toast.success("Created the expertise post successfully.");
        }

        if (expertisePostId) {
            Router.push(`/expertisePost/${expertisePostId}`);
        }
    }, [dispatch, expertisePostId, createExpertisePostError, createExpertisePostSuccess]);

    // On submission of the form, process all of the accumulated
    // local state and pass it as a single object into the
    // appropriate redux action.
    const submitHandler = (e: any) => {
        e.preventDefault();

        if (image === "") {
            toast.error(
                "Please check if you uploaded an image. Also, some problems may occur when your image was too large. Please refresh and try again with a smaller image. Sorry about that!"
            );
            return;
        }
        console.log("image", image);
        // Combine the submission types into a list
        let submissionTypes: string[] = [];
        submissionType1.trim() !== "" &&
            submissionTypes.push(submissionType1.trim());
        submissionType2.trim() !== "" &&
            submissionTypes.push(submissionType2.trim());
        submissionType3.trim() !== "" &&
            submissionTypes.push(submissionType3.trim());

        interface postDataInterface {
            user: string;
            stripeConnectId: string;
            title: string;
            description: string;
            submissionTypes: string[];
            image: string;
            pricePerSubmission: any;
            category: any;
        }

        let category = "";
        if (formSelectMenuInputRef.current) {
            category = formSelectMenuInputRef.current.value;
        }

        const postData: postDataInterface = {
            user: authUser?._id,
            stripeConnectId: authUser?.stripeConnectId,
            title: title,
            description: description,
            submissionTypes: submissionTypes,
            image: image,
            pricePerSubmission,
            category,
        };
        console.log("postData", postData);
        dispatch(createExpertisePost(postData));
    };

    // onChange processes any of the changes in the form fields
    // and sets the local component state based off of the form field
    // values, in preparation for submission (above function)
    const onChange = (e: any) => {
        if (e.target.name === "image") {
            const reader: any = new FileReader();
            //https://stackoverflow.com/questions/5697605/limit-the-size-of-a-file-upload-html-input-element
            if (e.target?.files[0].size > 3145728) {
                toast.error(
                    "Hey, sorry about that! For now, the image must be less than 3MB. Here's a useful website to compress images while this is being fixed: https://imagecompressor.com/"
                );
                return;
            }
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImage(reader.result);
                    setImagePreview(reader.result);
                }
            };
            if (e.target?.files[0]) {
                reader.readAsDataURL(e.target?.files[0]);
            }
        } else if (e.target.name.includes("submissionType")) {
            switch (e.target.name) {
                case "submissionType1":
                    setSubmissionType1(e.target.value);
                    break;
                case "submissionType2":
                    setSubmissionType2(e.target.value);
                    break;
                case "submissionType3":
                    setSubmissionType3(e.target.value);
                    break;
                default:
                    console.log(
                        "Wrong name value for one of the submission type inputs!"
                    );
                    break;
            }
        } else {
            setPost({ ...post, [e.target.name]: e.target.value });
        }
    };

    return (
        <div className="">
            <UniversalFadeAnimation animationType="appear">
                <form
                    className="space-y-6 mb-4"
                    onSubmit={submitHandler}
                    action="#"
                    method="POST"
                >
                    <div className="flex flex-col items-start gap-5 px-4 py-4 max-w-2xl lg:max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="flex flex-col gap-3 bg-brand-primary-light text-white w-full p-8 rounded-xl ">
                            <h1 className="text-xl sm:text-2xl md:text-3xl font-medium text-center">
                                Welcome to the expertise post creation page!
                            </h1>
                            <p className="text-sm md:text-md opacity-80 text-center">
                                This is a preview of a post. Create your post by
                                filling in the fields.
                            </p>
                        </div>
                        {/* <Breadcrumbs pages={pages} /> */}
                        <nav className="flex" aria-label="Breadcrumb">
                            <ol
                                role="list"
                                className="flex items-center space-x-4"
                            >
                                <li>
                                    <div>
                                        <a className="text-gray-400 hover:text-gray-500 cursor-default">
                                            <HomeIcon
                                                className="flex-shrink-0 h-5 w-5"
                                                aria-hidden="true"
                                            />
                                            <span className="sr-only">
                                                Home
                                            </span>
                                        </a>
                                    </div>
                                </li>
                                <li>
                                    <div className="flex items-center">
                                        <ChevronRightIcon
                                            className="flex-shrink-0 h-5 w-5 text-gray-400"
                                            aria-hidden="true"
                                        />
                                    </div>
                                </li>
                                <li>
                                    <FormSelectMenu
                                        inputTypeString="category"
                                        options={formSelectMenuOptions}
                                        required={true}
                                        currentIndex={0}
                                        ref={formSelectMenuInputRef}
                                    />
                                </li>
                            </ol>
                        </nav>
                        <h1 className="text-2xl font-semibold w-full">
                            <input
                                id="title"
                                name="title"
                                type="text"
                                autoComplete="none"
                                required
                                maxLength={maxTitleLength}
                                className="appearance-none block px-3 py-2 w-full border border-gray-300 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-xl"
                                placeholder="Write your title describing your advice here..."
                                value={title}
                                onChange={onChange}
                            />
                        </h1>
                        <RatingsWidget expertisePost={{}} />

                        <div className="flex flex-col lg:flex-row justify-start lg:justify-around items-start w-full gap-7 lg:-mt-2">
                            <div className="expertisePostDetailImageWrapper w-4/5 max-w-lg self-center">
                                {imagePreview === "" ? (
                                    <div className="flex flex-col justify-center items-center w-full h-80 border-2 border-gray-300 border-dashed rounded-lg p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="mx-auto h-12 w-12 text-gray-400"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                            />
                                        </svg>
                                        <span className="mt-2 block text-sm font-medium text-gray-900">
                                            Upload a picture of yourself by clicking &quot;Choose
                                            File&quot; below
                                        </span>
                                    </div>
                                ) : (
                                    <Image
                                        src={imagePreview}
                                        layout="responsive"
                                        width={1.5}
                                        height={1}
                                        className="object-cover"
                                        alt="Picture for expertise posting"
                                    />
                                )}
                                <input
                                    className="appearance-none block mx-auto max-w-full px-3 py-2 mt-4 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-full file:border-0
                                file:text-sm file:font-semibold
                                file:bg-brand-primary-light/5 file:text-brand-primary-light
                                hover:file:bg-brand-primary-light/10"
                                    type="file"
                                    id="file"
                                    name="image"
                                    required
                                    onChange={onChange}
                                    accept="image/*"
                                />
                            </div>
                            <div className="flex flex-col gap-5 self-start w-full h-full md:max-w-2xl mx-auto">
                                <h1 className="text-xl font-medium">
                                    Description
                                </h1>
                                <p className="font-light opacity-60 -mt-2">
                                    <textarea
                                        id="description"
                                        name="description"
                                        autoComplete="none"
                                        required
                                        maxLength={maxDescriptionLength}
                                        rows={5}
                                        cols={70}
                                        className="appearance-none block px-3 py-2 w-full border border-gray-300 rounded-md shadow-sm placeholder-gray-600 focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-md"
                                        placeholder="Write a detailed description describing your qualifications, experience, and the advice you want to give..."
                                        value={description}
                                        onChange={onChange}
                                    />
                                </p>
                                {/* Line Break */}
                                <div className="w-full m-auto h-[1px] bg-black/10"></div>

                                <div className="flex flex-col gap-4 sm:flex-row">
                                    <div className="flex flex-col justify-center items-center gap-4 p-8 w-full sm:w-1/2 sm:h-60 rounded-xl border-[1px] border-black/10">
                                        <p className="text-sm font-light">
                                            Bite-sized submissions might
                                            include:
                                        </p>
                                        <ul className="list-disc flex flex-col gap-2">
                                            <li className="text-lg font-semibold ">
                                                <input
                                                    id="submissionType1"
                                                    name="submissionType1"
                                                    type="text"
                                                    autoComplete="none"
                                                    required
                                                    maxLength={
                                                        maxSubmissionExampleLength
                                                    }
                                                    className="appearance-none block px-3 py-1 w-full border border-gray-300 rounded-md shadow-sm placeholder-gray-500 text-xl focus:outline-none focus:ring-brand-primary focus:border-brand-primary"
                                                    placeholder="Submission type..."
                                                    value={submissionType1}
                                                    onChange={onChange}
                                                />
                                            </li>
                                            <li className="text-lg font-semibold ">
                                                <input
                                                    id="submissionType2"
                                                    name="submissionType2"
                                                    type="text"
                                                    autoComplete="none"
                                                    maxLength={
                                                        maxSubmissionExampleLength
                                                    }
                                                    className="appearance-none block px-3 py-1 w-full border border-gray-300 rounded-md shadow-sm placeholder-gray-500 text-xl focus:outline-none focus:ring-brand-primary focus:border-brand-primary"
                                                    placeholder="Submission type..."
                                                    value={submissionType2}
                                                    onChange={onChange}
                                                />
                                            </li>
                                            <li className="text-lg font-semibold">
                                                <input
                                                    id="submissionType3"
                                                    name="submissionType3"
                                                    type="text"
                                                    autoComplete="none"
                                                    maxLength={
                                                        maxSubmissionExampleLength
                                                    }
                                                    className="appearance-none block px-3 py-1 w-full border border-gray-300 rounded-md shadow-sm placeholder-gray-500 text-xl focus:outline-none focus:ring-brand-primary focus:border-brand-primary"
                                                    placeholder="Submission type..."
                                                    value={submissionType3}
                                                    onChange={onChange}
                                                />
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="flex flex-col justify-center items-center gap-4 p-8 w-full sm:w-1/2 sm:h-60 bg-white rounded-xl border-[1px] border-black/10 shadow-md">
                                        {/* Pricing Statement Header Grouping */}
                                        <div className="flex items-center gap-1">
                                            <h1 className="text-2xl font-semibold self-start ">
                                                ${" "}
                                            </h1>
                                            <span className="flex gap-2 items-center text-md mt-[2px] font-light opacity-60">
                                                <input
                                                    id="pricePerSubmission"
                                                    name="pricePerSubmission"
                                                    type="number"
                                                    autoComplete="none"
                                                    required
                                                    min={1}
                                                    className="block px-1 py-0 w-12 text-center border border-gray-300 rounded-md shadow-sm placeholder-gray-500 text-xl focus:outline-none focus:ring-brand-primary focus:border-brand-primary"
                                                    placeholder="1"
                                                    value={pricePerSubmission}
                                                    onChange={onChange}
                                                />
                                                / submission
                                            </span>
                                        </div>
                                        <p className="text-sm font-light text-center opacity-60">
                                            You&apos;ll get a response within 7 days,
                                            or you&apos;ll never be charged.
                                        </p>
                                        <button
                                            className="opacity-70 bg-brand-primary-light rounded-lg text-white w-full py-3 text-lg flex justify-center items-center"
                                            disabled={true}
                                        >
                                            Send Submission
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="bg-brand-primary-light mx-auto rounded-lg text-white w-full sm:w-96 py-3 text-xl flex justify-center items-center"
                            disabled={
                                createExpertisePostLoading || image === ""
                                    ? true
                                    : false
                            }
                        >
                            {createExpertisePostLoading ? (
                                <ButtonLoader />
                            ) : (
                                "Create Post"
                            )}
                        </button>
                    </div>
                </form>
            </UniversalFadeAnimation>
        </div>
    );
};

export default CreateExpertisePost;

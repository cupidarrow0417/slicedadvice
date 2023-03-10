import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import crypto from "crypto";

interface UserInterface {
    name: String;
    email: String;
    password: any;
    stripeCustomerId: String;
    stripeConnectId: String;
    avatar: Object;
    role: String;
    createdAt: Date;
    verifiedEmail: Boolean;
    emailVerificationCode: String;
    emailVerificationExpire: Date;
    resetPasswordToken: String;
    resetPasswordExpire: Date;
}

const userSchema = new mongoose.Schema<UserInterface>({
    name: {
        type: String,
        required: [true, "Please enter your name"],
        maxLength: [50, "Your name cannot exceed 50 characters"],
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: true,
        validate: [validator.isEmail, "Please enter a valid email address"],
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
        minLength: [6, "Your password must be longer than 6 characters"],
        select: false,
    },
    stripeCustomerId: String,
    stripeConnectId: String,
    avatar: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },
    role: {
        type: String,
        default: "user",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    // For google users, this is
    // always true.
    verifiedEmail: {
        type: Boolean,
        default: false,
    },
    emailVerificationCode: String,
    emailVerificationExpire: Date,
});

//Encrypt password before saving user
userSchema.pre("save", async function (next) {
    //if not modified, don't hash anything. Move on.
    if (!this.isModified("password")) {
        next();
    }

    this.password = await bcrypt.hash(this.password, 10);
});

// When a user is created, we want to instantly create a Stripe Customer,
// HubSpot contact, and more. Important for customer relationship management
// and payments.
userSchema.post("save", async function (next) {
    // Create Stripe Customer object and attach to the stripeCustomerId field
    // of the user document.
    if (this.stripeCustomerId) {
        return;
    }
    // Set your secret key. Remember to switch to your live secret key in production.
    // See your keys here: https://dashboard.stripe.com/apikeys
    const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
    const customer = await stripe.customers.create({
        email: this.email,
        description: `SlicedAdvice Stripe Customer for ${this.email}`,
        metadata: {
            databaseId: this._id.toString(),
            slicedAdviceUsername: this.name,
        },
    });

    this.stripeCustomerId = customer.id;
    // Save the user
    await this.save();

    // Create HubSpot Contact Object by email
    const hubspot = require("@hubspot/api-client");

    const hubspotClient = new hubspot.Client({
        accessToken: process.env.HUBSPOT_AUTOMATIC_CONTACT_CREATION_PRIVATE_KEY,
    });

    const properties = {
        email: this.email,
    };
    const SimplePublicObjectInput = { properties };

    try {
        const apiResponse = await hubspotClient.crm.contacts.basicApi.create(
            SimplePublicObjectInput
        );
        console.log(JSON.stringify(apiResponse.body, null, 2));
    } catch (e: any) {
        console.log(e);
        e.message === "HTTP request failed"
            ? console.error(JSON.stringify(e.response, null, 2))
            : console.error(e);
    }
});

//Compare user password
userSchema.methods.comparePassword = async function (enteredPassword: string) {
    return await bcrypt.compare(enteredPassword, this.password);
};

//Generate password reset token
//Note: remember these types of functions can NOT be arrow functions
//or else 'this' will be undefined
userSchema.methods.getResetPasswordToken = function () {
    //Generate token
    const resetToken = crypto.randomBytes(20).toString("hex");

    //Hash and set to resetPasswordToken field
    this.resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    //Set token expire time
    this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;

    return resetToken;
};

//Generate email verification 6 digit token
//Note: remember these types of functions can NOT be arrow functions
//or else 'this' will be undefined
userSchema.methods.getEmailVerificationCode = function () {
    //Generate 6 digit email verification code from 100000 to 999999
    const emailVerificationCode = Math.floor(Math.random() * 89999 + 100000);

    this.emailVerificationCode = emailVerificationCode.toString();
    this.emailVerificationExpire = Date.now() + 30 * 60 * 1000;

    return emailVerificationCode;
};

export default mongoose.models["User"] ||
    mongoose.model<UserInterface>("User", userSchema);

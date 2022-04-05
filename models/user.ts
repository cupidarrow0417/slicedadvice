import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcryptjs'



interface UserInterface {
    name: String,
    email: String,
    password: any,
    avatar: Object,
    role: String,
    createdAt: Date,
    resetPasswordToken: String,
    resetPasswordExpire: Date

}


const userSchema = new mongoose.Schema<UserInterface>({
    name: {
        type: String,
        required: [true, 'Please enter your name'],
        maxLength: [50, 'Your name cannot exceed 50 characters']
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true,
        validate: [validator.isEmail, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
        minLength: [6, 'Your password must be longer than 6 characters'],
        select: false
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    role: {
        type: String,
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
})


//Encrypt password before saving user
userSchema.pre('save', async function (next) {
    //if not modified, don't hash anything. Move on.
    if (!this.isModified('password')) {
        next()
    } 

    this.password = await bcrypt.hash(this.password, 10)
})


//Compare user password
userSchema.methods.comparePassword = async function(enteredPassword: string) {
    return await bcrypt.compare(enteredPassword, this.password)
}

export default mongoose.models["User"] || mongoose.model<UserInterface>("User", userSchema)
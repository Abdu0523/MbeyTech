import mongoose from 'mongoose';
import jwt from "jsonwebtoken";
import crypto from "crypto";
import * as bcrypt from 'bcryptjs';
import { genSalt, hash, compare } from 'bcryptjs';
import { IPersonne } from "../interfaces/IPersonne";


 const PersonSchema = new mongoose.Schema<IPersonne>({
    nomComplet: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,

    },
    adresse: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    countryCode: {
        type: String,
        required: false,
    },
    statut: {
        type: Boolean,
        required: false,
        default: true
    },
    password: {
        type: String,
        required: true,
        max: 16,
        minlength: 6
    },
    userType: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
  });

  // play function before save into display: 'block',
  PersonSchema.pre("save", async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });

// Compare user password
PersonSchema.methods.comparePassword = async function (enteredPassword: any) {
    return await bcrypt.compare(enteredPassword, this.password)
}

// Return JWT token
PersonSchema.methods.getJwtToken = function (): string {
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET environment variable is not defined');
    }

    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_TIME,
    });
  };


// Generate password reset token
PersonSchema.methods.getResetPasswordToken = function () {
    // Generate token
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Hash and set to resetPasswordToken
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')

    // Set token expire time
    this.resetPasswordExpire = Date.now() + 30 * 60 * 1000

    return resetToken

}
const PersonModel = mongoose.model<IPersonne>("Personne", PersonSchema);
export default PersonModel;
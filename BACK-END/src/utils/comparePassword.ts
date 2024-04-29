import crypto from "crypto";
import * as bcrypt from 'bcryptjs';
import PersonModel from "../data/models/Personne.entity";
const comparePassword = async function (this: any, enteredPassword: any) {
     return await bcrypt.compare(enteredPassword, this.password)
}

export default comparePassword;
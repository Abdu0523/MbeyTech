import { IPersonne } from "../data/interfaces/IPersonne";
import PersonModel from "../data/models/Personne.entity";

// Create and send token and save in the cookie.
const sendToken = ( user:any, statusCode:any, res: any) => {

    // Create Jwt token
    const token = user.getJwtToken();

    // Options for cookie
    const options = {
        expires: process.env.COOKIE_EXPIRES_TIME && typeof process.env.COOKIE_EXPIRES_TIME === 'number'
          ? new Date(Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000)
          : undefined,
        httpOnly: true
      };



    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        token,
        user
    })

}
export default  sendToken;
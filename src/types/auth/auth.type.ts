import { AdapterUser } from "next-auth/adapters"
import { JWT } from "next-auth/jwt"

/**
 * CustomToken interface extends JWT to include additional fields
 * such as accessToken, refreshToken, idToken, expires, and user details.
 * This is used for handling JWT tokens in the application.
 */
export interface CustomToken extends JWT {
    accessToken: string
    refreshToken: string
    idToken: string
    expires: number // Expiration time of the access token
    refreshTokenExpires: number // Expiration time of the refresh token
    user: CustomAdapterUser // The user data associated with the token
  }
  /**
 * CustomAdapterUser interface extends AdapterUser from NextAuth and adds custom fields
 * specific to your application's user data structure.
 */
export interface CustomAdapterUser extends AdapterUser {
    _id: string
    firstName: string
    lastName: string
    username: string
    sub:string
  }
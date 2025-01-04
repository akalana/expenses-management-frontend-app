import axios from "axios";
import { AuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
import KeycloakProvider from "next-auth/providers/keycloak";
import AuthAdapter from "@/utils/auth-adapter";

/**
 * Auth options configuration for NextAuth with Keycloak provider.
 */
export const authOptions: AuthOptions = {
  providers: [
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_CLIENT_ID!,
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET!,
      issuer: process.env.KEYCLOAK_CLIENT_ISSUER!,
      checks: ["pkce"],
      authorization: {
        params: {
          grant_type: "authorization_code",
          scope: "openid email profile offline_access",
          response_type: "code",
          code_challenge_method: "S256",
        },
      },
    }),
  ],
  callbacks: {
    /**
     * JWT callback: Manages token processing and refresh logic.
     * @param token - The current JWT token.
     * @param account - The account object from the provider.
     * @param user - The authenticated user object.
     * @param trigger - The event that triggered this callback.
     * @param session - The session object.
     * @returns The updated token or the previous token if valid.
     */
    async jwt({ token, account, user }) {

      if (account && user) {
        // 'account' is only available the first time this callback is called on a new session
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.idToken = account.id_token;
        token.accessTokenExpires = account.expires_at;
        token.refreshTokenExpires = account.refresh_expires_in;
        token.user = user;
      }

      if (Date.now() / 1000 < (token.accessTokenExpires as number)) {
        return token;
      } else {
        // Renew tokens if access token is expired
        // TODO: Refresh token flow needs to integrate
        return {}
      }
    },

    /**
     * Session callback: Adds custom token data to the session.
     * @param session - The current session object.
     * @param token - The token containing user and authentication data.
     * @returns The extended session object with token and user data.
     */
    session({  token }) {
      const { user } = token as {
        user: {
          _id:string;
          sub: string;
          email: string;
          firstName: string;
          lastName: string;
        };
      };
      //
      return {
        accessToken: token.accessToken as string,
        idToken: token.idToken as string,
        refreshToken: token.refreshToken as string,
        expires: token.accessTokenExpires as string,
        user: {
          firstName: user?.firstName,
          lastName: user?.lastName,
          email: user?.email,
          sub: user?.sub,
          id: user?._id
        },
      };
    },
  },
  adapter: AuthAdapter() as unknown as Adapter,
  events: {
    /**
     * Sign-out event: Logs out from Keycloak using the id_token.
     * @param token - The token containing user and authentication data.
     */
    async signOut({ token }) {
      const logoutUrl = `${process.env.KEYCLOAK_CLIENT_ISSUER}/protocol/openid-connect/logout?id_token_hint=${token.idToken}&post_logout_redirect_uri=${process.env.NEXTAUTH_URL}&client_id=${process.env.KEYCLOAK_CLIENT_ID}`;
      try {
        await axios.get(logoutUrl);
      } catch (error) {
        console.error("Error during sign-out:", error);
      }
    },
  },
  session: {
    strategy: "jwt", // Use JWT for managing session data
  },
  secret: process.env.NEXTAUTH_SECRET, // Secret key for NextAuth
};


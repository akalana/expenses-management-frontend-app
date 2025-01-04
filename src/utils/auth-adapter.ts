/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosResponse } from "axios";
import { AdapterUser } from "next-auth/adapters";

/**
 * Provides authentication adapter functions for managing user sessions and accounts.
 */
export default function getSessionAndUsersAuthAdapter() {
  /**
   * Retrieves a user by their unique identifier (sub).
   *
   * @param id - The unique identifier (sub) of the user.
   * @returns A promise that resolves to the user object or null if not found.
   */
  async function getUser(id: string): Promise<any | null> {
    try {
      const params = { sub: id };
      const response: AxiosResponse<any[]> = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/users`,
        { params }
      );
      // Return the first user if found, otherwise null
      return response.data[0] || null;
    } catch (error) {
      console.error(`Failed to get user by ID: ${id}`, error);
      return null;
    }
  }

  /**
   * Retrieves a user by their email address.
   *
   * @param email - The email address of the user.
   * @returns A promise that resolves to the user object or null if not found.
   */
  async function getUserByEmail(email: string): Promise<any | null> {
    try {
      const params = { username: email };
      const response: AxiosResponse<any[]> = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/users`,
        { params }
      );
      // Return the first user if found, otherwise null
      return response.data[0] || null;
    } catch (error) {
      console.error(`Failed to get user by email: ${email}`, error);
      return null;
    }
  }

  /**
   * Retrieves a user by their account provider details.
   *
   * @param providerAccountId - The provider-specific account ID of the user.
   * @param provider - The name of the authentication provider.
   * @returns A promise that resolves to the user object or null if not found.
   */
  async function getUserByAccount({
    providerAccountId,
  }: any): Promise<any | null> {
    try {
      const params = { sub: providerAccountId };
      const response: AxiosResponse<any[]> = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/users`,
        { params }
      );
      // Return the first user if found, otherwise null
      return response.data[0] || null;
    } catch (error) {
      console.error(
        `Failed to get user by account: ${providerAccountId}`,
        error
      );
      return null;
    }
  }

  async function createUser(user: AdapterUser): Promise<any> {
    const response: AxiosResponse<any> = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/users`,
      {
        firstName: user.name?.split(' ')[0] || '',
        lastName: user.name?.split(' ')[1] || '',
        username: user.email,
      }
    );
    return response.data;
  }
  
  // Return all the adapter methods
  return {
    getUser,
    getUserByEmail,
    getUserByAccount,
    createUser,
  };
  
}

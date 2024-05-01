import { Client, Account, ID } from "appwrite";
import config from "../../components/Configure/configure";

const client = new Client();

client
    .setEndpoint(config.appwriteEndpoint) // Your API Endpoint
    .setProject(config.appwriteId) // Your project ID
;
const account = new Account(client);

// Login Function

async function loginUser(email, password) {
    try {
        const Logindata = await account.createEmailPasswordSession(email, password);
        if (Logindata) {
            console.log(Logindata);
            return Logindata;
        } else {
            throw new Error('Login failed. Invalid response from server.');
        }
    } catch (error) {
        if (error.code === 1002) {
            console.error('Session creation prohibited when a session is active.');
            // Handle this case, such as notifying the user or logging out the active session
        } else {
            console.error('Error logging in user:', error);
            throw error; // Rethrow the error for the caller to handle
        }
    }
}


// Signup finction
async function signUpUser(email, password, name, phone) {
    try {
        const data = await account.create(ID.unique(), email, password, name, phone);
        if (data) {

            console.log(data); // Success
        }
        return data;
    } catch (error) {
        console.log(error); // Failure
        return null;
    }
}

async function logoutUser() {
    try {
        // Call the logout API method here
        const result = await account.deleteSession(
            'current' // sessionId
        );
        // return logoutResponse;
    } catch (error) {
        console.error('Error logging out user:', error);
        throw error; // Rethrow the error for the caller to handle
    }
}

// GET current user 
// GET current user 
async function getCurrentUser() {
    try {
        const user = await account.get();
        // console.log('Current User Data:', user);
        return user;
    } catch (error) {
        if (error.code === 1007) {
            console.error('User is missing required scope for account-related actions.');
            // Handle this case, such as displaying an error message to the user
        } else {
            console.error('Error getting current user data:', error);
            throw error; // Rethrow the error for the caller to handle
        }
    }
}

// Logout user

// async function logoutuser() {
//     try {
//         const response = await account.deleteSessions();
//     } catch (error) {
//         return error;
//     }
// }


export { signUpUser, loginUser, logoutUser, getCurrentUser };
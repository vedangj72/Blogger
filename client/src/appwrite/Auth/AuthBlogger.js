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
        const currentUser = await account.get(); // Get the current user
        console.log('Current User Data:', currentUser); // Log the current user data
        return currentUser; // Return the current user data
    } catch (error) {
        console.error('Error getting current user data:', error); // Log the error
        throw error; // Rethrow the error for the caller to handle
    }
}
async function getAccountById(sessionId) {
    try {
        const session = await account.get(sessionId);
        // console.log('Session Data:', session);
        return session;
    } catch (error) {
        console.error('Error getting session by ID:', error);
        throw error;
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


export { signUpUser, loginUser, logoutUser, getCurrentUser, getAccountById };
import { Client, Databases, ID, Query } from "appwrite";
import config from "../../components/Configure/configure";

const client = new Client()
    .setEndpoint(config.appwriteEndpoint)
    .setProject(config.appwriteId);

const databases = new Databases(client);

async function postBlog(data) {
    try {
        const response = await databases.createDocument(
            config.databaseId,
            config.collectionId,
            ID.unique(),
            data
        );

        return response; // Return the created document response
    } catch (error) {
        console.error("Error posting blog content:", error);
        throw error;
    }
}

async function getPostId(postId) {
    try {
        const response = await databases.listDocuments(
            config.databaseId,
            config.collectionId, [Query.equal("userId", postId)]
        );

        return response.documents; // Return the fetched document or an empty array
    } catch (error) {
        console.error("Error getting post by ID:", error);
        throw error;
    }
}

async function getAllPosts() {
    try {
        const response = await databases.listDocuments(
            config.databaseId,
            config.collectionId
        );

        return response.documents;
    } catch (error) {
        console.error("Error getting all posts:", error);
        throw error;
    }
}

export { postBlog, getAllPosts, getPostId };
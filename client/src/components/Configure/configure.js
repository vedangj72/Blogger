const config = {

        appwriteId: String(process.env.REACT_APP_PROJECTID),
        appwriteEndpoint: String(process.env.REACT_APP_API_ENDPOINT),
        databaseId: String(process.env.REACT_APP_DB_ID),
        collectionId: String(process.env.REACT_APP_COLLECTION_ID),

    }
    // console.log(config);
export default config;
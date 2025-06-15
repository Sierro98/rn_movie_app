import { Client, Databases } from "react-native-appwrite"

const PROJECT_ID = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!;
const DATABASE_ID = process.env.EXPO_PUBLIC_APPRWITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_METRICS_ID;

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(PROJECT_ID);
    
const database = new Databases(client);


// Track the searches made by the user
export const updateSearchCount = async (query: string, movie: Movie) => {
    
}
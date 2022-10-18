import {Client, Databases, Query} from "appwrite";
import appwriteConfig from './appwriteConfig';

let client = new Client();
client
    .setEndpoint(appwriteConfig.ENDPOINT)
    .setProject(appwriteConfig.PROJECT_ID);

const sdk = new Databases(client);

export class AppwriteApi{
    listDocuments(token) {
        return sdk.listDocuments(
            appwriteConfig.DATABSASE_ID,
            appwriteConfig.COLLECTION_ID,
            [
                Query.equal('token', token)
            ]
        );
    }
}

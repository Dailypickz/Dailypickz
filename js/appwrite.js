// Appwrite configuration for DAILYPICKZ
const APPWRITE_ENDPOINT = "https://fra.cloud.appwrite.io/v1";
const APPWRITE_PROJECT_ID = "6ad4c5ad001f9c50ded2";
const APPWRITE_DATABASE_ID = "6ad4c888000462dc46a1";
const PRODUCTS_TABLE_ID = "6ad4ca260038d702aef1";
const ORDERS_TABLE_ID = "6ad7b5d6001adb026af7";

// Load Appwrite Web SDK
const { Client, Account, TablesDB, ID, Query } = Appwrite;

const client = new Client()
  .setEndpoint(APPWRITE_ENDPOINT)
  .setProject(APPWRITE_PROJECT_ID);

const account = new Account(client);
const tablesDB = new TablesDB(client);

// Helper: Get current logged in user
async function getCurrentUser() {
  try {
    return await account.get();
  } catch (error) {
    return null;
  }
}

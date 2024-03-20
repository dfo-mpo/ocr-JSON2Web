// fetch the data from the blob storage, combine them and return the data to the frontend
// data contain the file name and the folder name and verified data
import { BlobServiceClient } from "@azure/storage-blob";

export async function GET() {

  // You need to set up these variables with your values
  const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
  // jsondata is container name which storage the data by folder 
  const containerName = "json";
  // const subContainerName = "jsondatamodified";
  try {
    // Create a BlobServiceClient
    const blobServiceClient =
      BlobServiceClient.fromConnectionString(connectionString);
    // Get a container client from the BlobServiceClient
    const containerClient = blobServiceClient.getContainerClient(containerName);
    // List blobs in the container
    console.log(containerClient);
    let dataObject = [];
 
     
    for await (const blob of containerClient.listBlobsFlat()) {
      const fullFileName = blob.name;
 
      let [, folderName, fileName] = fullFileName.split("/");
      dataObject.push({ folderName, fileName });
    }


    const updatedJsonData = JSON.stringify(dataObject, null, 2);

    // Upload the updated JSON data to the blob

    return new Response(updatedJsonData, { status: 200 });
  } catch (error) {
    console.error("Error reading response:", error);
    return new Response(error.message, { status: 500 });
  }
}

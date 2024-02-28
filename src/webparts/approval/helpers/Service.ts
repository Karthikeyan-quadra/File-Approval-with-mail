//code works good
// Service.ts
import "@pnp/sp/webs";
import "@pnp/sp/files";
import "@pnp/sp/folders";
import "@pnp/sp/items";
import "@pnp/sp/files/folder";
import "@pnp/sp/items/get-all";
import { getSP } from "./Pnpconfig";
import { Approvemail, Deniedmail } from "../MailTrigger/MailTrigger";

export async function Approve(file: any, comment: string, approverEmail: string, fileName: string, userName: string) {
  try {
    const sp = getSP();

    // Get the file by server relative path
    const fileToApprove = sp.web.getFileById(file.UniqueId);

    // Get the user email from the UserEmail column
    const fileProperties: any = await fileToApprove.getItem();
    const userEmail: any = fileProperties ? fileProperties["UserEmail"] : null;

    if (!userEmail) {
      console.error("Unable to retrieve user email for approval.");
      return;
    }

    // Upload the file to the "ApprovedFiles" folder
    const approvedFolder: any = await sp.web.getFolderByServerRelativePath("ApprovedFiles");
    const approvedFile: any = await approvedFolder.files.addUsingPath(file.Name, fileToApprove, { Overwrite: true });
    console.log("File approved and uploaded to ApprovedFiles:", approvedFile);

    // Delete the original file from the "Approval" folder (optional)
    await fileToApprove.delete();

    // Log the approval action with the comment
    console.log(`File approved with comment: ${comment}`);

    // Notify the user who uploaded the file
    // const userDisplayName = fileProperties ? fileProperties["Editor"]["Title"] : "Unknown User";
    const senderName = approverEmail; // Set the approver's email as sender
    // Call the email notification function for approval
    await Approvemail(comment, userEmail, userName, senderName, fileName);

  } catch (error) {
    console.error("Error approving file:", error);
    throw error;
  }
}




export async function Denied(file: any, comment: string, approverEmail: string, fileName: string, userName: string) {
  try {
    const sp = getSP(); // Initialize the SP object
    console.log("Denied function - File object:", file);
    const fileDeny:any = sp.web.getFileById(file.UniqueId);
    const fileProperties:any = await fileDeny.getItem();
    const userEmail:any = fileProperties ? fileProperties["UserEmail"] : null;

    // Ensure that the 'UserEmail' property is populated
    // const userEmail: any = file.UserEmail; // Declare userEmail here

    if (!userEmail) {
      console.error("User email information not available for the file.");
      return;
    }
    // Get the file by server relative path
    const fileToDeny: any = sp.web.getFileByServerRelativePath(file.ServerRelativePath);
    // Log the denial action with the comment (you can implement additional logic here)
    console.log(`File denied with comment: ${comment}`, fileToDeny);
    await fileDeny.delete();
    console.log("File deleted successfully.");
    const senderName: any = approverEmail; // Set the approver's email as sender
    // Call the email notification function for denial
    await Deniedmail(comment, userEmail, userName, senderName, fileName);
  } catch (error) {
    console.error("Error denying file:", error);
    throw error;
  }
}


export async function Fetch() {
  try {
    const sp = getSP();
    const files = await sp.web.getFolderByServerRelativePath("Shared Documents").files();
    return files;
  } catch (error) {
    console.error("Error fetching files:", error);
    throw error;
  }
}

// Modify the UploadFile function to accept user email as a parameter
export async function UploadFile(file: File, filePath: string, userEmail: string,userName: string) {
  try {
    const fileNamePath: any = encodeURI(file.name);
    const decodedFileNamePath = decodeURIComponent(fileNamePath);

    const sp = getSP();
    let result: any;

    if (file.size <= 10485760) {
      // small upload
      result = await sp.web.getFolderByServerRelativePath("Shared Documents").files.addUsingPath(decodedFileNamePath, file, { Overwrite: true });
    } else {
      // large upload
      result = await sp.web.getFolderByServerRelativePath("Shared Documents").files.addChunked(decodedFileNamePath, file, data => {
        console.log(`progress`);
      }, true);
    }

    // Ensure that we have a valid UniqueId
    if (result && result.data && result.data.UniqueId) {
      // Update SharePoint list item with the user's email
      const uploadedFile = await sp.web.getFileById(result.data.UniqueId).getItem();
      await uploadedFile.update({
        UserEmail: userEmail,
        UserName: userName,
      });
    } else {
      throw new Error("Unable to retrieve valid UniqueId from the uploaded file.");
    }

    console.log(`Result of file upload: ${JSON.stringify(result)}`);
    return result;
  } catch (error) {
    console.error("Error during file upload:", error);
    throw error;
  }
}


export async function fetchApproverList() {
  try {
    const sp = getSP();
    const list = sp.web.lists.getByTitle("Approver"); // Replace with your actual list title

    // Use .top(1000) to retrieve up to 1000 items (adjust as needed)
    const items = await list.items.select("Mail").getAll();
    const mail = items.map((item: any) => item.Mail);
    console.log(mail);
    return mail;

  } catch (error) {
    console.error("Error fetching data from Approver list:", error);
    throw error;
  }
}
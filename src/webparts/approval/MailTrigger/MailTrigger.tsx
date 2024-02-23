//MailTrigger.tsx
import "@pnp/sp/lists";
import { IEmailProperties } from "@pnp/sp/presets/all";
import { SPFI } from "@pnp/sp";
import "@pnp/sp/sputilities";
import { getSP } from "../helpers/Pnpconfig";

export async function Approvemail(msg: string, userMail: string, displayName: string, senderName: string) {
  try {
    // Check if the message is not empty
    if (!msg.trim()) {
      throw new Error("Message cannot be empty");
    }

    const emailProps: IEmailProperties = {
      To: [userMail],
      CC: [],
      BCC: [],
      Subject: `File Approved`,
      Body: `
        <html>
          <head>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
          </head>
          <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
            <p>Dear ${displayName},</p>
            <p>${msg}</p>

            <p style="margin-top:100px; font-size:14px; margin-bottom:5px;"><b>Thanks & Regards,</b></p>
            <p style="margin-top:5px; font-size:14px; margin-bottom:0px;"><b>${senderName} | </b></p>
            <p style="font-size:14px; margin-top:5px;"><span style="color:rgb(255,102,0);"><b>Quadrasystems.net (India)</b></span><b> Private Limited</b></p>

          </body>
        </html>
      `,
    };

    // Ensure that getSP returns a valid SPFI object
    const sp: SPFI = getSP();

    if (!sp) {
      throw new Error("Unable to initialize SPFI object");
    }

    await sp.utility.sendEmail(emailProps);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    throw error; // Rethrow the error if needed for further handling
  }
}

export async function Deniedmail(msg: string, userMail: string, displayName: string, senderName: string) {
  try {
    // Check if the message is not empty
    if (!msg.trim()) {
      throw new Error("Message cannot be empty");
    }

    const emailProps: IEmailProperties = {
      To: [userMail],
      CC: [],
      BCC: [],
      Subject: `File Denied`,
      Body: `
        <html>
          <head>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
          </head>
          <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
            <p>Dear ${displayName},</p>
            <p>Your file had been denied due to ${msg}</p>

            <p style="margin-top:100px; font-size:14px; margin-bottom:5px;"><b>Thanks & Regards,</b></p>
            <p style="margin-top:5px; font-size:14px; margin-bottom:0px;"><b>${senderName} | </b></p>
            <p style="font-size:14px; margin-top:5px;"><span style="color:rgb(255,102,0);"><b>Quadrasystems.net (India)</b></span><b> Private Limited</b></p>

          </body>
        </html>
      `,
    };

    // Ensure that getSP returns a valid SPFI object
    const sp: SPFI = getSP();

    if (!sp) {
      throw new Error("Unable to initialize SPFI object");
    }

    await sp.utility.sendEmail(emailProps);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    throw error; // Rethrow the error if needed for further handling
  }
}

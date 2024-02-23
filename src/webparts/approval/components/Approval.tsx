// //Code works good
// import * as React from 'react';
// import { IApprovalProps } from './IApprovalProps';
// import { useState, useEffect } from 'react';
// import { Fetch, Approve, Denied } from '../helpers/Service';

// export default function Approval(props: IApprovalProps) {
//   const [fetchedData, setFetchedData] = useState<any[]>([]);

//   useEffect(() => {
//     // Fetch data when the component mounts
//     fetchAndUpdateData();
//   }, []);

//   const fetchAndUpdateData = async () => {
//     try {
//       const files = await Fetch();
//       setFetchedData(files);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   const handleApprove = async (file: any) => {
//     try {
//       await Approve(file);
//       fetchAndUpdateData();
//     } catch (error) {
//       console.error("Error approving file:", error);
//     }
//   };

//   const handleDeny = async (file: any) => {
//     try {
//       await Denied(file);
//       fetchAndUpdateData();
//     } catch (error) {
//       console.error("Error denying file:", error);
//     }
//   };

//   return (
//     <div>
//       <h2>Fetched data</h2>
//       <ul>
//         {fetchedData.map((file) => (
//           <li key={file.UniqueId}>
//             File Name: {file.Name}
//             <button onClick={() => handleApprove(file)}>Approve</button>
//             <button onClick={() => handleDeny(file)}>Deny</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }


// //code works good
// // Approval.tsx
// import * as React from 'react';
// import { IApprovalProps } from './IApprovalProps';
// import { useState, useEffect } from 'react';
// import { Fetch, Approve, Denied, UploadFile, fetchApproverList } from '../helpers/Service';

// export default function Approval(props: IApprovalProps) {
//   const [fetchedData, setFetchedData] = useState<any[]>([]);
//   const [comments, setComments] = useState<{ [key: string]: string }>({});
//   const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
//   const [filePath, setFilePath] = React.useState<string | null>(null);
//   const [userEmail, setUserEmail] = React.useState<string | null>(null);
//   const [approverListData, setApproverListData] = React.useState<string[]>([]);

//   useEffect(() => {
//     fetchData();
//   }, []); 
  
//   useEffect(() => {
//     const email = props.context.pageContext.user.email;
//     setUserEmail(email || null);
//   }, [props.context.pageContext.user.email]);
//   console.log(userEmail);
  

//   const fetchData = async () => {
//     try {
//       await fetchAndUpdateData();
//       await fetchApproverListData();
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   const fetchAndUpdateData = async () => {
//     try {
//       const files = await Fetch();
//       setFetchedData(files);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   const fetchApproverListData = async () => {
//     try {
//       const approverListData = await fetchApproverList();
//       setApproverListData(approverListData);
//     } catch (error) {
//       console.error("Error fetching Approver list data:", error);
//     }
//   };

//   const handleUpload = () => {
//     if (selectedFile && filePath !== null) {
//       UploadFile(selectedFile, filePath)
//         .then(() => fetchAndUpdateData());
//     } else {
//       console.error('No file selected');
//     }
//   };

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const fileInput = event.target;
//     if (fileInput.files && fileInput.files.length > 0) {
//       const file = fileInput.files[0];
//       const path = fileInput.value;

//       setSelectedFile(file);
//       setFilePath(path);
//     }
//   };

//   const handleApprove = async (file: any) => {
//     try {
//       const comment = comments[file.UniqueId];
  
//       console.log("Handling approval...");
//       console.log("User email:", userEmail);
//       console.log("Approver list data:", approverListData);
  
//       if (!comment) {
//         console.error("Please enter a comment.");
//         return;
//       }
  
//       // Check if the user's email is in the Approver list
//       if (approverListData.includes(userEmail || "") && userEmail) {
//         await Approve(file, comment);
//         await fetchAndUpdateData();
//         setComments((prevComments) => ({ ...prevComments, [file.UniqueId]: "" }));
//       } else {
//         console.error("You are not authorized to approve.");
//       }
//     } catch (error) {
//       console.error("Error approving file:", error);
//     }
//   };

//   const handleDeny = async (file: any) => {
//     try {
//       const comment = comments[file.UniqueId];

//       if (!comment) {
//         console.error("Please enter a comment.");
//         return;
//       }

//       // Check if the user's email is in the Approver list
//       if (approverListData.includes(userEmail || "") && userEmail) {
//         await Denied(file, comment);
//         await fetchAndUpdateData();
//         setComments((prevComments) => ({ ...prevComments, [file.UniqueId]: "" }));
//       } else {
//         console.error("You are not authorized to deny.");
//       }
//     } catch (error) {
//       console.error("Error denying file:", error);
//     }
//   };

//   return (
//     <div>
//       <div>
//         <input type="file" id="thefileinput" onChange={handleFileChange} />
//         <button onClick={handleUpload}>Upload</button>
//       </div>
//       <div>
//         <h2>Files in Shared Documents</h2>
//         <ul>
//           {fetchedData.map((file) => (
//             <li key={file.UniqueId}>
//               File Name: {file.Name}
//               <input
//                 type="text"
//                 placeholder="Enter comment"
//                 value={comments[file.UniqueId] || ""}
//                 onChange={(e) =>
//                   setComments((prevComments) => ({
//                     ...prevComments,
//                     [file.UniqueId]: e.target.value,
//                   }))
//                 }
//               />
//               {approverListData.includes(userEmail || "") && userEmail && (
//                 <>
//                   <button onClick={() => handleApprove(file)}>Approve</button>
//                   <button onClick={() => handleDeny(file)}>Deny</button>
//                 </>
//               )}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

//code works good
// // Approval.tsx
// import * as React from 'react';
// import { IApprovalProps } from './IApprovalProps';
// import { useState, useEffect } from 'react';
// import { Fetch, Approve, Denied, UploadFile, fetchApproverList } from '../helpers/Service';

// export default function Approval(props: IApprovalProps) {
//   const [fetchedData, setFetchedData] = useState<any[]>([]);
//   const [comments, setComments] = useState<{ [key: string]: string }>({});
//   const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
//   const [filePath, setFilePath] = React.useState<string | null>(null);
//   const [userEmail, setUserEmail] = React.useState<string | null>(null);
//   const [approverListData, setApproverListData] = React.useState<string[]>([]);

//   useEffect(() => {
//     fetchData();
//   }, []); 
  
//   useEffect(() => {
//     const email = props.context.pageContext.user.email;
//     setUserEmail(email || null);
//   }, [props.context.pageContext.user.email]);
//   console.log(userEmail);

//   const fetchData = async () => {
//     try {
//       await fetchAndUpdateData();
//       await fetchApproverListData();
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   const fetchAndUpdateData = async () => {
//     try {
//       const files = await Fetch();
//       setFetchedData(files);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   const fetchApproverListData = async () => {
//     try {
//       const approverListData = await fetchApproverList();
//       setApproverListData(approverListData);
//     } catch (error) {
//       console.error("Error fetching Approver list data:", error);
//     }
//   };

//   // const handleUpload = () => {
//   //   if (selectedFile && filePath !== null) {
//   //     UploadFile(selectedFile, filePath)
//   //       .then(() => fetchAndUpdateData());
//   //   } else {
//   //     console.error('No file selected');
//   //   }
//   // };


//   const handleUpload = () => {
//     if (selectedFile && filePath !== null) {
//       // Set status to 'Processing' when uploading
//       const newFile = { Name: selectedFile.name, Status: 'Under Review', UniqueId: Date.now().toString() /* Unique identifier for the new file */ };
      
//       // Append the new file to the existing data
//       setFetchedData((prevData) => [...prevData, newFile]);
  
//       // Upload the file
//       UploadFile(selectedFile, filePath)
//         .then(() => fetchAndUpdateData());
//     } else {
//       console.error('No file selected');
//     }
//   };

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const fileInput = event.target;
//     if (fileInput.files && fileInput.files.length > 0) {
//       const file = fileInput.files[0];
//       const path = fileInput.value;

//       setSelectedFile(file);
//       setFilePath(path);
//     }
//   };


//   const getStatus = (file: any) => {
//     // Determine the status based on the existence of comments and approval status
//     return comments[file.UniqueId]
//       ? 'Under Review'
//       : file.Status === 'Approved'
//       ? 'Approved'
//       : file.Status === 'Denied'
//       ? 'Denied'
//       : 'Under Review';
//   };
  
  
//   const handleApprove = async (file: any) => {
//     try {
//       const comment = comments[file.UniqueId];
  
//       console.log("Handling approval...");
//       console.log("User email:", userEmail);
//       console.log("Approver list data:", approverListData);
  
//       if (!comment) {
//         console.error("Please enter a comment.");
//         return;
//       }
  
//       // Check if the user's email is in the Approver list
//       if (approverListData.includes(userEmail || "") && userEmail) {
//         await Approve(file, comment);
//         await fetchAndUpdateData();
//         setComments((prevComments) => ({ ...prevComments, [file.UniqueId]: "" }));
//       } else {
//         console.error("You are not authorized to approve.");
//       }
//     } catch (error) {
//       console.error("Error approving file:", error);
//     }
//   };
  

//   const handleDeny = async (file: any) => {
//     try {
//       const comment = comments[file.UniqueId];
  
//       if (!comment) {
//         console.error("Please enter a comment.");
//         return;
//       }
  
//       // Check if the user's email is in the Approver list
//       if (approverListData.includes(userEmail || "") && userEmail) {
//         await Denied(file, comment);
//         await fetchAndUpdateData();
  
//         // Set the status to 'Denied' when the denial action is performed
//         const updatedData = fetchedData.map((item) => {
//           if (item.UniqueId === file.UniqueId) {
//             return { ...item, Status: 'Denied' };
//           }
//           return item;
//         });
  
//         setFetchedData(updatedData);
//         setComments((prevComments) => ({ ...prevComments, [file.UniqueId]: "" }));
//       } else {
//         console.error("You are not authorized to deny.");
//       }
//     } catch (error) {
//       console.error("Error denying file:", error);
//     }
//   };
  
  

//  return (
//   <div>
//     <div>
//       <input type="file" id="thefileinput" onChange={handleFileChange} />
//       <button onClick={handleUpload}>Upload</button>
//     </div>
//     <div>
//       <h2>Files in Shared Documents</h2>
//       <ul>
//         {fetchedData.map((file) => (
//           <li key={file.UniqueId}>
//             File Name: {file.Name}
//             <div>Status: {getStatus(file)}</div>
//             {approverListData.includes(userEmail || "") && userEmail && (
//               <>
//                 <input
//                   type="text"
//                   placeholder="Enter comment"
//                   value={comments[file.UniqueId] || ""}
//                   onChange={(e) =>
//                     setComments((prevComments) => ({
//                       ...prevComments,
//                       [file.UniqueId]: e.target.value,
//                     }))
//                   }
//                 />
//                 <div>
//                   <button onClick={() => handleApprove(file)}>Approve</button>
//                   <button onClick={() => handleDeny(file)}>Deny</button>
//                 </div>
//               </>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   </div>
// );
// }


// Approval.tsx
import * as React from 'react';
import { IApprovalProps } from './IApprovalProps';
import { useState, useEffect } from 'react';
import { Fetch, Approve, Denied, UploadFile, fetchApproverList } from '../helpers/Service';
import { Approvemail, Deniedmail } from "../MailTrigger/MailTrigger";


export default function Approval(props: IApprovalProps) {
  const [fetchedData, setFetchedData] = useState<any[]>([]);
  const [comments, setComments] = useState<{ [key: string]: string }>({});
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [filePath, setFilePath] = React.useState<string | null>(null);
  const [userEmail, setUserEmail] = React.useState<string | null>(null);
  const [approverListData, setApproverListData] = React.useState<string[]>([]);

  useEffect(() => {
    fetchData();
    console.log(fetchedData);

  }, []); 
  
  useEffect(() => {
    const email = props.context.pageContext.user.email;
    setUserEmail(email || null);
  }, [props.context.pageContext.user.email]);
  console.log(userEmail);

  const fetchData = async () => {
    try {
      await fetchAndUpdateData();
      await fetchApproverListData();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchAndUpdateData = async () => {
    try {
      const files = await Fetch();
      setFetchedData(files);
      console.log(files);

      console.log(fetchedData);
      
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchApproverListData = async () => {
    try {
      const approverListData = await fetchApproverList();
      setApproverListData(approverListData);
    } catch (error) {
      console.error("Error fetching Approver list data:", error);
    }
  };

  // const handleUpload = () => {
  //   if (selectedFile && filePath !== null) {
  //     UploadFile(selectedFile, filePath)
  //       .then(() => fetchAndUpdateData());
  //   } else {
  //     console.error('No file selected');
  //   }
  // };


 // Pass user email as a parameter to the handleUpload function
const handleUpload = () => {
  if (selectedFile && filePath !== null && userEmail) {
    // Set status to 'Processing' when uploading
    const newFile = {
      Name: selectedFile.name,
      Status: 'Pending',
      UniqueId: Date.now().toString(), // Unique identifier for the new file
      UserEmail: userEmail, // Store the user's email
    };
    console.log(newFile);
    // Append the new file to the existing data
    setFetchedData((prevData) => [...prevData, newFile]);

    // Upload the file
    UploadFile(selectedFile, filePath, userEmail)
      .then(() => fetchAndUpdateData());
  } else {
    console.error('No file selected');
  }
};

  

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileInput = event.target;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const path = fileInput.value;

      setSelectedFile(file);
      setFilePath(path);
    }
  };


  const getStatus = (file: any) => {
    // Determine the status based on the existence of comments and approval status
    return comments[file.UniqueId]
      ? 'Pending'
      : file.Status === 'Approved'
      ? 'Approved'
      : file.Status === 'Denied'
      ? 'Denied'
      : 'Pending';
  };
  
  
  const handleApprove = async (file: any) => {
    try {
      const comment = comments[file.UniqueId];
  
      console.log("Handling approval...");
      console.log("User email:", userEmail); // Retrieve user's email from stored information
      console.log("Approver list data:", approverListData);
  
      if (!comment) {
        console.error("Please enter a comment.");
        return;
      }
  
      // Check if the user's email is in the Approver list
      if (approverListData.includes(userEmail || "") && userEmail) {
        // Assume the first approver's email is used; modify as needed based on your logic
        const approverEmail = approverListData[0];
  
        await Approve(file, comment, approverEmail);
        await fetchAndUpdateData();
        setComments((prevComments) => ({ ...prevComments, [file.UniqueId]: "" }));
  
        // Trigger the email notification to the user
        await Approvemail(comment, userEmail, props.context.pageContext.user.displayName, approverEmail);
      } else {
        console.error("You are not authorized to approve.");
      }
    } catch (error) {
      console.error("Error approving file:", error);
    }
  };
  
  


  const handleDeny = async (file: any) => {
    try {
      const comment = comments[file.UniqueId];
  
      if (!comment) {
        console.error("Please enter a comment.");
        return;
      }
  
      // Check if the user's email is in the Approver list
      if (approverListData.includes(userEmail || "") && userEmail) {
        // Assume the first approver's email is used; modify as needed based on your logic
        const approverEmail = approverListData[0];
  
        await Denied(file, comment, approverEmail);
        await fetchAndUpdateData();
  
        // Set the status to 'Denied' when the denial action is performed
        const updatedData = fetchedData.map((item) => {
          if (item.UniqueId === file.UniqueId) {
            return { ...item, Status: 'Denied' };
          }
          return item;
        });
  
        setFetchedData(updatedData);
        setComments((prevComments) => ({ ...prevComments, [file.UniqueId]: "" }));
  
        // Trigger the email notification for denial
        await Deniedmail(comment, file.UserEmail, props.context.pageContext.user.displayName, approverEmail);
      } else {
        console.error("You are not authorized to deny.");
      }
    } catch (error) {
      console.error("Error denying file:", error);
    }
  };
  
  
  

 return (
  <div>
    <div>
      <input type="file" id="thefileinput" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
    <div>
      <h2>Files in Shared Documents</h2>
      
      <ul>
      {Array.isArray(fetchedData) && fetchedData.map((file) => (

   
          <li key={file.UniqueId}>
            File Name: {file.Name}
            <div>Status: {getStatus(file)}</div>
            {approverListData.includes(userEmail || "") && userEmail && (
              <>
                <input
                  type="text"
                  placeholder="Enter comment"
                  value={comments[file.UniqueId] || ""}
                  onChange={(e) =>
                    setComments((prevComments) => ({
                      ...prevComments,
                      [file.UniqueId]: e.target.value,
                    }))
                  }
                />
                <div>
                  <button onClick={() => handleApprove(file)}>Approve</button>
                  <button onClick={() => handleDeny(file)}>Deny</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  </div>
);
}
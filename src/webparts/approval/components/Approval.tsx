//code works
// // Approval.tsx
// import * as React from 'react';
// import { IApprovalProps } from './IApprovalProps';
// import { useState, useEffect } from 'react';
// import { Fetch, Approve, Denied, UploadFile, fetchApproverList } from '../helpers/Service';

// export default function Approval(props: IApprovalProps) {
//   const [fetchedData, setFetchedData] = useState<any[]>([]);
//   const [comments, setComments] = useState<{ [key: string]: string }>({});
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [filePath, setFilePath] = useState<string | null>(null);
//   const [userEmail, setUserEmail] = useState<string | null>(null);
//   const [approverListData, setApproverListData] = useState<string[]>([]);

//   useEffect(() => {
//     fetchData();
//     console.log(fetchedData);

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
//       console.log(files);

//       console.log(fetchedData);
      
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



// // Pass user email and display name as parameters to the handleUpload function
// const handleUpload = () => {
//   if (selectedFile && filePath !== null && userEmail) {
//     // Set status to 'Processing' when uploading
//     const userName = props.context.pageContext.user.displayName; // Declare userName variable
//     console.log(userName);
//     const newFile = {
//       Name: selectedFile.name,
//       Status: 'Pending',
//       UniqueId: Date.now().toString(), // Unique identifier for the new file
//       UserEmail: userEmail, // Store the user's email
//       UserName: userName, // Store the user's display name
//     };
//     console.log(newFile);
//     // Append the new file to the existing data
//     setFetchedData((prevData) => [...prevData, newFile]);

//     // Upload the file
//     UploadFile(selectedFile, filePath, userEmail, userName)
//       .then(() => fetchAndUpdateData());
//   } else {
//     console.error('No file selected');
//   }
// };


  

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
//       ? 'Pending'
//       : file.Status === 'Approved'
//       ? 'Approved'
//       : file.Status === 'Denied'
//       ? 'Denied'
//       : 'Pending';
//   };
  
//    const handleApprove = async (file: any) => {
//   try {
//     const comment = comments[file.UniqueId];

//     console.log("Handling approval...");
//     console.log("User email:", userEmail); // Retrieve user's email from stored information
//     console.log("Approver list data:", approverListData);
//     const userName = props.context.pageContext.user.displayName;

//     if (!comment) {
//       console.error("Please enter a comment.");
//       return;
//     }

//     // Check if the user's email is in the Approver list
//     if (approverListData.includes(userEmail || "") && userEmail) {
//       // Assume the first approver's email is used; modify as needed based on your logic
//       const approverEmail = approverListData[0];

//       await Approve(file, comment, approverEmail, file.Name, userName);
//       await fetchAndUpdateData();
//       setComments((prevComments) => ({ ...prevComments, [file.UniqueId]: "" }));

//       // No need to trigger the email notification here since it's already triggered in the Approve function
//     } else {
//       console.error("You are not authorized to approve.");
//     }
//   } catch (error) {
//     console.error("Error approving file:", error);
//   }
// };

// const handleDeny = async (file: any) => {
//   try {
//     const comment = comments[file.UniqueId];
    
//     console.log("Handling Denial...");
//     console.log("User email:", userEmail); // Retrieve user's email from stored information
//     console.log("Approver list data:", approverListData);
//     const userName:any = props.context.pageContext.user.displayName;

//     if (!comment) {
//       console.error("Please enter a comment.");
//       return;
//     }

//     // Check if the user's email is in the Approver list
//     if (approverListData.includes(userEmail || "") && userEmail) {
//       // Assume the first approver's email is used; modify as needed based on your logic
//       const approverEmail = approverListData[0];

//       await Denied(file, comment, approverEmail, file.Name, userName);
//       await fetchAndUpdateData();

//       // Set the status to 'Denied' when the denial action is performed
//       const updatedData = fetchedData.map((item) => {
//         if (item.UniqueId === file.UniqueId) {
//           return { ...item, Status: 'Denied' };
//         }
//         return item;
//       });

//       setFetchedData(updatedData);
//       setComments((prevComments) => ({ ...prevComments, [file.UniqueId]: "" }));

//       // No need to trigger the email notification here since it's already triggered in the Denied function
//     } else {
//       console.error("You are not authorized to deny.");
//     }
//   } catch (error) {
//     console.error("Error denying file:", error);
//   }
// };

  

//  return (
//   <div>
//     <div>
//       <input type="file" id="thefileinput" onChange={handleFileChange} />
//       <button onClick={handleUpload}>Upload</button>
//     </div>
//     <div>
//       <h2>Files in Shared Documents</h2>
      
//       <ul>
//       {Array.isArray(fetchedData) && fetchedData.map((file) => (
//   <li key={file.UniqueId}>
//     File Name: {file.Name}
//     <div>Status: </div>
//     {approverListData.includes(userEmail || "") && userEmail && (
//       <>
//         {file.Status !== 'Denied' && (
//           <>
//             <input
//               type="text"
//               placeholder="Enter comment"
//               value={comments[file.UniqueId] || ""}
//               onChange={(e) =>
//                 setComments((prevComments) => ({
//                   ...prevComments,
//                   [file.UniqueId]: e.target.value,
//                 }))
//               }
//             />
//             <div>
//               <button onClick={() => handleApprove(file)}>Approve</button>
//               <button onClick={() => handleDeny(file)}>Deny</button>
//             </div>
//           </>
//         )}
//       </>
//     )}
//   </li>
// ))}</ul>
//     </div>
//   </div>
// );
// }


// Approval.tsx
import * as React from 'react';
import { IApprovalProps } from './IApprovalProps';
import { useState, useEffect} from 'react';
import { UploadFile, fetchApproverList, Approve, Denied, Fetch } from '../helpers/Service';
import { Table, Space, Input, Button, message  } from 'antd';
import 'antd/dist/reset.css';

const { Column } = Table;

export default function Approval(props: IApprovalProps) {
  const [fetchedData, setFetchedData] = useState<any[]>([]);
  const [comments, setComments] = useState<{ [key: string]: string }>({});
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePath, setFilePath] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [approverListData, setApproverListData] = useState<string[]>([]);
  const fileInputRef = React.useRef<HTMLInputElement>(null);


  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const email = props.context.pageContext.user.email;
    setUserEmail(email || null);
  }, [props.context.pageContext.user.email]);

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

  const showSuccessMessage = (msg: string) => {
    message.success(msg);
  };

  const showErrorMessage = (msg: string) => {
    message.error(msg);
  };

  const handleUpload = () => {
    if (selectedFile && filePath !== null && userEmail) {
      const userName = props.context.pageContext.user.displayName;
      const newFile = {
        Name: selectedFile.name,
        Status: 'Pending',
        UniqueId: Date.now().toString(),
        UserEmail: userEmail,
        UserName: userName,
      };
      setFetchedData((prevData) => [...prevData, newFile]);

      UploadFile(selectedFile, filePath, userEmail, userName)
        .then(() => {
          // Reset the selected file and file path after successful upload
          setSelectedFile(null);
          setFilePath(null);
          fetchAndUpdateData();

          if (fileInputRef.current) {
            fileInputRef.current.value = '';
          }
        });
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
      console.log("User email:", userEmail);
      console.log("Approver list data:", approverListData);
      const userName = props.context.pageContext.user.displayName;

      if (!comment) {
        console.error("Please enter a comment.");
        return;
      }

      if (approverListData.includes(userEmail || "") && userEmail) {
        const approverEmail = approverListData[0];

        await Approve(file, comment, approverEmail, file.Name, userName);
        await fetchAndUpdateData();
        setComments((prevComments) => ({ ...prevComments, [file.UniqueId]: "" }));
        showSuccessMessage('File approved successfully');

      } else {
        console.error("You are not authorized to approve.");

      }
    } catch (error) {
      console.error("Error approving file:", error);
      showErrorMessage('File not approved');

    }
  };

  const handleDeny = async (file: any) => {
    try {
      const comment = comments[file.UniqueId];

      console.log("Handling Denial...");
      console.log("User email:", userEmail);
      console.log("Approver list data:", approverListData);
      const userName:any = props.context.pageContext.user.displayName;

      if (!comment) {
        console.error("Please enter a comment.");
        return;
      }

      if (approverListData.includes(userEmail || "") && userEmail) {
        const approverEmail = approverListData[0];

        await Denied(file, comment, approverEmail, file.Name, userName);
        await fetchAndUpdateData();

        const updatedData = fetchedData.map((item) => {
          if (item.UniqueId === file.UniqueId) {
            return { ...item, Status: 'Denied' };
          }
          return item;
        });

        setFetchedData(updatedData);
        setComments((prevComments) => ({ ...prevComments, [file.UniqueId]: "" }));
        showSuccessMessage('File Denied successfully');

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
        <p><input type="file"  id="thefileinput" onChange={handleFileChange} style={{marginLeft:"224px", border:"2px solid black", padding:"5px", borderRadius:"9px"}} ref={fileInputRef}/></p>
        <p>
        <Button type="primary" onClick={handleUpload} style={{marginLeft:"315px"}} disabled={!selectedFile}>
          Upload
        </Button>
        </p>
      </div>
      <div>
        <h2 style={{marginTop:"50px", textAlign:"center", fontSize:"31px"}}>Files in Shared Documents</h2>
        <Table dataSource={fetchedData} pagination={{ pageSize: 10}}>
  <Column title="File Name" dataIndex="Name" key="Name" />
  <Column
    title="Status"
    dataIndex="Status"
    key="Status"
    render={(text: string, record: any) => getStatus(record)}
  />
  {approverListData.includes(userEmail || "") && userEmail && (
    <Column
      title="Action"
      key="action"
      render={(file: any) => (
        <Space size="middle">
          {file.Status !== 'Denied' && (
            <>
              <Input
                type="text"
                placeholder="Enter comment"
                value={comments[file.UniqueId] || ""}
                onChange={(e) => setComments((prevComments) => ({ ...prevComments, [file.UniqueId]: e.target.value }))}
              />
              <Button onClick={() => handleApprove(file)}>Approve</Button>
              <Button onClick={() => handleDeny(file)}>Deny</Button>
            </>
          )}
        </Space>
      )}
    />
  )}
</Table>
      </div>
    </div>
  );
}

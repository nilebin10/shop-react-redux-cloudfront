import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import axios, { AxiosResponse } from "axios";

type CSVFileImportProps = {
  url: string;
  title: string;
  setErrorCB: (err:any) => void
};

export default function CSVFileImport({ url, title, setErrorCB }: CSVFileImportProps) {
  const [file, setFile] = React.useState<File>();

  localStorage.setItem('token', 'bmlsZWJpbjEwOlRFU1RfUEFTU1dPUkQ=');

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setFile(file);
    }
  };

  const removeFile = () => {
    setFile(undefined);
  };

  const uploadFile = async () => {
    console.log("uploadFile to", url);

    const headers = {
      Authorization: `Basic ${localStorage.getItem('token')}`
    }

    // Get the presigned URL
    try{
      const response = await axios({
        method: "GET",
        url,
        headers,
        params: {
          name: encodeURIComponent(file?.name || ''),
        },
      });

      console.log("File to upload: ", file?.name);
      console.log("Uploading to: ", response.data);
      const result = await fetch(response.data.signedUrl, {
        method: "PUT",
        body: file,
      });
      console.log("Result: ", result);
      setFile(undefined);

    } catch(err: any) {
      if(err.response && err.response.status == 403){
        setErrorCB({
          text: err.response?.message
        })
      }

      if(err.response && err.response.status == 401){
        setErrorCB({
          text: "User is not authorized to make request"
        })
      }
    }
  };
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      {!file ? (
        <input type="file" onChange={onFileChange} />
      ) : (
        <div>
          <button onClick={removeFile}>Remove file</button>
          <button onClick={uploadFile}>Upload file</button>
        </div>
      )}
    </Box>
  );
}

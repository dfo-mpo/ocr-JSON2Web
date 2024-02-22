"use client";
import FormRender from "../components/FormRender";
import styles from "./page.module.css";
import ErrorReport from "./ErrorReport";

import LogoHeader from "../components/LogoHeader";
import Iframe from "./Iframe";
import Image from "next/image";
import errorIcon from "../../../public/images/error.svg";
import verifiedIcon from "../../../public/images/verified.svg";
import modifiedIcon from "../../../public/images/modified.svg";
import VerifiedFile from "./VerifiedFile";
import { useState, useEffect, use } from "react";
const File = ({ searchParams }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isFormsettingReady, setIsFormsettingReady] = useState(true);
  const [jsonData, setJsonData] = useState({});
  const [formSetting, setFormSetting] = useState({});

  // this is the Form page
  const fileName = searchParams.fileName;
  const folderName = searchParams.folderName;
  const verified = searchParams.verified;
  const error = searchParams.error;
  const isModified = searchParams.isModified;

  const submitData = {
    fileName: fileName,
    folderName: folderName,

  };

  //fetch json data from blob 
  const asyncFetch = async () => {
    setIsLoading(true);
    const Response = await fetch("/api/jsonData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(submitData)
    });
    if (!Response.ok) {
      throw new Error(Response.statusText);
    } else {
      const reader = Response.body.getReader();
      const readData = async () => {
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) {
              break;
            }
            // `value` contains the chunk of data as a Uint8Array
            const jsonString = new TextDecoder().decode(value);
            // Parse the JSON string into an object
            const dataObject = JSON.parse(jsonString);
            setJsonData(dataObject);
            setIsLoading(false);
          }
        } catch (error) {
          console.error("Error reading response:", error);
        } finally {
          reader.releaseLock(); // Release the reader's lock when done
        }
      };
      readData();
    }
  };

  const asyncFetchFormSetting = async () => {
    setIsFormsettingReady(true);
    const Response = await fetch("/api/formSetting", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!Response.ok) {
      throw new Error(Response.statusText);
    } else if (Response.status === 203) {
      console.log("No data");
    } else {
      const reader = Response.body.getReader();
      const readData = async () => {
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) {
              break;
            }
            // `value` contains the chunk of data as a Uint8Array
            const jsonString = new TextDecoder().decode(value);
            // Parse the JSON string into an object
            const dataObject = JSON.parse(jsonString);
        
            setFormSetting(dataObject);
            setIsFormsettingReady(false);
          }
        } catch (error) {
          console.error("Error reading response:", error);
        } finally {
          reader.releaseLock(); // Release the reader's lock when done
        }
      };
      readData();
    }
  };

  useEffect(() => {
    asyncFetch();
    asyncFetchFormSetting();
    
  }, []);

  return (
    <div>
      <title>{folderName}</title>
      {/* <title>{fileName.replace(".json", "").replace(/_/g, " ").replace(/BC16-\d+ /g, '')}</title> */}
      <LogoHeader />
      {/* <Link className={styles.backButton} href="/">
          Back
        </Link> */}
      <h5 className={styles.fileName}>
        File Name: {fileName.replace(/_/g, " ").replace(".json", "")}{" "}
        {verified && (
          <Image src={verifiedIcon} alt="verified" width={20} height={20} />
        )}{" "}
        {error && <Image src={errorIcon} alt="error" width={15} height={15} />}
        {isModified && (
          <Image src={modifiedIcon} alt="modified" height={23} width={23} />
        )}
      </h5>

      {/* <Link
          className={styles.linkStyle}
          rel="noopener noreferrer"
          target="_blank"
          href={`https://bc16teststorage.blob.core.windows.net/${pdfFolderName}/${fileName.replace(
            ".json",
            ".pdf"
          )}`}
        >
          PDF Version
        </Link> */}
      {(isLoading||isFormsettingReady) ? (
        <div>Loading...</div>
      ) : (
        <>
          <ErrorReport fileName={fileName} folderName={folderName} />
          <br />
          <VerifiedFile
            fileName={fileName}
            folderName={folderName}
            verified={verified}
          />
          <div className={styles.container}>
            <FormRender
              folderName={folderName}
              items={jsonData}
              fileName={fileName}
              formSetting={formSetting}
              // verified={verified}
            />
            <Iframe   formSetting={formSetting}   folderName={folderName} fileName={fileName} />
          </div>
        </>
      )}
    </div>
  );
};

export default File;
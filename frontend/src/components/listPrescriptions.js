import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/listPrescriptions.css"; 

const ListPrescriptions = () => {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileContent, setFileContent] = useState(null);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/list-prescriptions`
        );
        setFiles(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPrescriptions();
  }, []);

  const handleFileClick = async (fileName) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/get-prescription`,
        {
          params: { key: fileName },
        }
      );
      setSelectedFile(fileName);
      setFileContent(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const renderJson = (json) => {
    return (
      <div className="json-container">
        {Object.entries(json).map(([key, value]) => (
          <div key={key} className="json-field">
            <span className="json-key">{key}:</span>
            {Array.isArray(value) ? (
              value.map((item, index) => (
                <div key={index} className="json-array-item">
                  {renderJson(item)}
                </div>
              ))
            ) : (
              <span className="json-value">{value}</span>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="prescriptions-container">
      <h1>Prescriptions</h1>
      <ul className="prescriptions-list">
        {files.map((file, index) => (
          <li
            key={index}
            className="prescription-item"
            onClick={() => handleFileClick(file)}
          >
            {file.replace(".json", "")}
          </li>
        ))}
      </ul>
      {fileContent && (
        <div className="prescription-content">
          <h2>Content of {selectedFile.replace(".json", "")}</h2>
          {renderJson(fileContent)}
        </div>
      )}
    </div>
  );
};

export default ListPrescriptions;

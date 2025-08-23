import React from "react";
import styles from "./DocumentCard.module.css";
import { FaFilePdf, FaFileImage, FaFileVideo, FaDownload } from "react-icons/fa";

const DocumentCard = ({ doc }) => {
  // choose icon based on file extension
  const getIcon = (filename) => {
    if (!filename) return <FaFilePdf className={styles.icon} />;
    const ext = filename.split(".").pop().toLowerCase();
    if (ext === "pdf") return <FaFilePdf className={styles.icon} />;
    if (["jpg", "jpeg", "png"].includes(ext)) return <FaFileImage className={styles.icon} />;
    if (["mp4", "avi", "mov"].includes(ext)) return <FaFileVideo className={styles.icon} />;
    return <FaFilePdf className={styles.icon} />;
  };

  return (
    <div className={styles.card}>
      <div className={styles.left}>
        <div className={styles.iconWrapper}>{getIcon(doc.filename)}</div>
        <div>
          <p className={styles.filename}>{doc.filename}</p>
          <p className={styles.size}>200 KB </p>
        </div>
      </div>
      <a href={doc.key} download className={styles.downloadBtn}>
        <FaDownload />
      </a>
    </div>
  );
};

export default DocumentCard;

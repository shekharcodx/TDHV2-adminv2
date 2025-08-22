import React, { useState } from "react";
import styles from "./VendorProfile.module.css";
import DocumentCard from "./DocumentCard";

const VendorProfile = () => {
  const [isEditing, setIsEditing] = useState(false);

  const [vendor, setVendor] = useState({
    name: "Hamza",
    email: "m.hamza7265+16@gmail.com",
    businessName: "Atlas Cars",
    contact: {
      whatsappNum: "+920000000000",
      landlineNum: "+920000000000",
      mobileNum: "+920000000000",
    },
    address: {
      street: "St#loremIpsum",
      country: "cont#loremIpsum",
      city: "city#loremIpsum",
      state: "state#loremIpsum",
      mapUrl: "url#loremIpsum",
    },
    vendorInformation: {
      fleetSize: 10,
    },
    profilePicture: {
      url: "https://drivehub-uploads.s3.eu-north-1.amazonaws.com/profile_pictures/1755692001361-avatar.svg",
    },
    documents: {
      ijariCertificate: {
        key: "vendor_documents/1755691996480-file-sample_150kB.pdf",
        filename: "Ijari Certificate.pdf",
      },
      tradeLicense: {
        key: "vendor_documents/1755691998684-file-sample_150kB.pdf",
        filename: "Trade License.pdf",
      },
      vatCertificate: {
        key: "vendor_documents/1755691999209-file-sample_150kB.pdf",
        filename: "VAT Certificate.pdf",
      },
      noc: {
        key: "vendor_documents/1755691999676-file-sample_150kB.pdf",
        filename: "NOC.pdf",
      },
      emiratesId: {
        key: "vendor_documents/1755692000176-file-sample_150kB.pdf",
        filename: "Emirates ID.pdf",
      },
      poa: {
        key: "vendor_documents/1755692000742-file-sample_150kB.pdf",
        filename: "Power of Attorney.pdf",
      },
    },
  });

  const handleChange = (section, field, value) => {
    if (typeof vendor[section] === "object" && !Array.isArray(vendor[section])) {
      setVendor((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value,
        },
      }));
    } else {
      setVendor((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const toggleEdit = () => {
    setIsEditing((prev) => !prev);
  };

  return (
    <div className={styles.page}>
      <div
        className={`${styles.card} ${
          isEditing ? styles.editMode : styles.viewMode
        }`}
      >
        {/* Header */}
        <div className={styles.header}>
          <img
            src={vendor.profilePicture.url}
            alt="Profile"
            className={styles.avatar}
          />
          <div className={styles.headerText}>
            {isEditing ? (
              <>
                <input
                  type="text"
                  className={styles.inputEdit}
                  value={vendor.name}
                  onChange={(e) => handleChange(null, "name", e.target.value)}
                />
                <input
                  type="email"
                  className={styles.inputEdit}
                  value={vendor.email}
                  onChange={(e) => handleChange(null, "email", e.target.value)}
                />
              </>
            ) : (
              <>
                <h2>{vendor.name}</h2>
                <p>{vendor.email}</p>
              </>
            )}
          </div>
        </div>

        {/* Basic Information */}
        <div className={styles.section}>
          <h3>Basic Information</h3>
          <div className={styles.infoRow}>
            <div className={styles.infoItem}>
              <strong>Business Name</strong>
              {isEditing ? (
                <input
                  type="text"
                  className={styles.inputEdit}
                  value={vendor.businessName}
                  onChange={(e) =>
                    handleChange(null, "businessName", e.target.value)
                  }
                />
              ) : (
                vendor.businessName
              )}
            </div>

            <div className={styles.infoItem}>
              <strong>Mobile Number</strong>
              {isEditing ? (
                <input
                  type="text"
                  className={styles.inputEdit}
                  value={vendor.contact.mobileNum}
                  onChange={(e) =>
                    handleChange("contact", "mobileNum", e.target.value)
                  }
                />
              ) : (
                vendor.contact.mobileNum
              )}
            </div>

            <div className={styles.infoItem}>
              <strong>WhatsApp</strong>
              {isEditing ? (
                <input
                  type="text"
                  className={styles.inputEdit}
                  value={vendor.contact.whatsappNum}
                  onChange={(e) =>
                    handleChange("contact", "whatsappNum", e.target.value)
                  }
                />
              ) : (
                vendor.contact.whatsappNum
              )}
            </div>

            <div className={styles.infoItem}>
              <strong>Landline</strong>
              {isEditing ? (
                <input
                  type="text"
                  className={styles.inputEdit}
                  value={vendor.contact.landlineNum}
                  onChange={(e) =>
                    handleChange("contact", "landlineNum", e.target.value)
                  }
                />
              ) : (
                vendor.contact.landlineNum
              )}
            </div>
          </div>
        </div>

        {/* Address */}
        <div className={styles.section}>
          <h3>Address</h3>
          <div className={styles.infoRow}>
            {Object.entries(vendor.address).map(([field, value]) => (
              <div className={styles.infoItem} key={field}>
                <strong>{field.charAt(0).toUpperCase() + field.slice(1)}</strong>
                {isEditing ? (
                  <input
                    type="text"
                    className={styles.inputEdit}
                    value={value}
                    onChange={(e) =>
                      handleChange("address", field, e.target.value)
                    }
                  />
                ) : field === "mapUrl" ? (
                  <a href={value} target="_blank" rel="noopener noreferrer">
                    View Map
                  </a>
                ) : (
                  value
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Documents */}
        <div style={{ padding: "20px" }}>
          <h2>Vendor Documents</h2>
          {Object.values(vendor.documents).map((doc, index) => (
            <DocumentCard key={index} doc={doc} />
          ))}
        </div>

        {/* Buttons */}
        <button
  className={`${styles.editBtn} ${
    isEditing ? styles.saveBtn : styles.editModeBtn
  }`}
  onClick={toggleEdit}
>
  {isEditing ? "Save" : "Edit"}
</button>

      </div>
    </div>
  );
};

export default VendorProfile;

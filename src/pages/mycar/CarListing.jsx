import React, { useState } from "react";
import styles from "./CarListing.module.css";

const carData = {
  Audi: {
    models: ["A3", "A4", "Q7"],
    trims: {
      A3: ["Premium", "Sport"],
      A4: ["Premium", "Luxury"],
      Q7: ["Base", "Advanced"],
    },
    years: {
      A3: ["2020", "2021", "2022"],
      A4: ["2019", "2020"],
      Q7: ["2021", "2022"],
    },
  },
  BMW: {
    models: ["X5", "M3", "i8"],
    trims: {
      X5: ["xLine", "M"],
      M3: ["Competition", "Standard"],
      i8: ["Base"],
    },
    years: { X5: ["2021", "2022"], M3: ["2020", "2021"], i8: ["2022"] },
  },
};

const technicalFeaturesList = [
  "ABS",
  "Airbags",
  "Cruise Control",
  "Navigation",
  "Sunroof",
  "Lane Assist",
  "Rear Camera",
  "Parking Sensors",
  "Blind Spot Monitor",
];

const CarListing = () => {
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedTrim, setSelectedTrim] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [models, setModels] = useState([]);
  const [trims, setTrims] = useState([]);
  const [years, setYears] = useState([]);
  const [showTechFeatures, setShowTechFeatures] = useState(false);
  const [technicalFeatures, setTechnicalFeatures] = useState([]);
  const [otherFeatures, setOtherFeatures] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [rentPerDay, setRentPerDay] = useState("");
  const [rentPerMonth, setRentPerMonth] = useState("");
  const [insurance, setInsurance] = useState("");
  const [warranty, setWarranty] = useState("");
  const [images, setImages] = useState([]);

  const handleBrandChange = (e) => {
    const brand = e.target.value;
    setSelectedBrand(brand);
    setSelectedModel("");
    setSelectedTrim("");
    setSelectedYear("");
    setModels(brand ? carData[brand].models : []);
    setTrims([]);
    setYears([]);
  };

  const handleModelChange = (e) => {
    const model = e.target.value;
    setSelectedModel(model);
    setSelectedTrim("");
    setSelectedYear("");
    setTrims(model ? carData[selectedBrand].trims[model] : []);
    setYears(model ? carData[selectedBrand].years[model] : []);
  };

  const handleTrimChange = (e) => setSelectedTrim(e.target.value);
  const handleYearChange = (e) => setSelectedYear(e.target.value);

  const handleTechnicalFeatureChange = (feature) => {
    setTechnicalFeatures((prev) =>
      prev.includes(feature)
        ? prev.filter((f) => f !== feature)
        : [...prev, feature]
    );
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      name: file.name,
      url: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...newImages]);
  };

  return (
    <div className={styles.page}>
      <main className={styles.container}>
        <h2 className={styles.title}>Add Car Details</h2>
        <form className={styles.form}>
          {/* Brand → Model → Trim → Year */}
          <div className={styles.grid}>
            <select
              value={selectedBrand}
              onChange={handleBrandChange}
              className={styles.select}
            >
              <option value="">Select Brand</option>
              {Object.keys(carData).map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>

            <select
              value={selectedModel}
              onChange={handleModelChange}
              className={styles.select}
              disabled={!selectedBrand}
            >
              <option value="">
                {selectedBrand ? "Select Model" : "Select Brand First"}
              </option>
              {models.map((model) => (
                <option key={model} value={model}>
                  {model}
                </option>
              ))}
            </select>

            <select
              value={selectedTrim}
              onChange={handleTrimChange}
              className={styles.select}
              disabled={!selectedModel}
            >
              <option value="">
                {selectedModel ? "Select Trim" : "Select Model First"}
              </option>
              {trims.map((trim) => (
                <option key={trim} value={trim}>
                  {trim}
                </option>
              ))}
            </select>

            <select
              value={selectedYear}
              onChange={handleYearChange}
              className={styles.select}
              disabled={!selectedTrim}
            >
              <option value="">
                {selectedTrim ? "Select Year" : "Select Trim First"}
              </option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          {/* Specs dropdowns */}
          <div className={styles.grid}>
            <select className={styles.select}>
              <option value="">Body Type</option>
              <option value="SUV">SUV</option>
              <option value="Sedan">Sedan</option>
            </select>
            <select className={styles.select}>
              <option value="">Regional Specs</option>
              <option value="EU">EU</option>
              <option value="US">US</option>
            </select>
            <select className={styles.select}>
              <option value="">Horsepower</option>
              <option value="100-150">100-150</option>
              <option value="150-200">150-200</option>
            </select>
            <select className={styles.select}>
              <option value="">Seating Capacity</option>
              <option value="2">2</option>
              <option value="4">4</option>
            </select>
            <select className={styles.select}>
              <option value="">Colors</option>
              <option value="Black">Black</option>
              <option value="White">White</option>
            </select>
            <select className={styles.select}>
              <option value="">Doors</option>
              <option value="2">2</option>
              <option value="4">4</option>
            </select>
            <select className={styles.select}>
              <option value="">Transmission</option>
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
            </select>
            <select className={styles.select}>
              <option value="">Fuel Type</option>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
            </select>
          </div>

          {/* Technical Features */}
          <div className={styles.sectionHeader}>Technical Features</div>
          <div style={{ marginBottom: "10px" }}>
            <button
              type="button"
              onClick={() => setShowTechFeatures(!showTechFeatures)}
              className={`${styles.toggleButton} ${styles.button}`}
            >
              {showTechFeatures ? "Hide Features" : "Add Features"}
            </button>
          </div>
          {showTechFeatures && (
            <div className={styles.techFeaturesGrid}>
              {technicalFeaturesList.map((feature) => (
                <label key={feature} className={styles.checkboxLabel}>
                  <input
                    className={styles.checkBox}
                    type="checkbox"
                    checked={technicalFeatures.includes(feature)}
                    onChange={() => handleTechnicalFeatureChange(feature)}
                  />
                  {feature}
                </label>
              ))}
            </div>
          )}
          {/* Other Features */}
          <input
            className={styles.input}
            placeholder="Other Features"
            value={otherFeatures}
            onChange={(e) => setOtherFeatures(e.target.value)}
          />

          {/* Image Upload */}
          <div className={styles.imageUploadSection}>
            <div className={styles.addImagesLabel}>Add Images</div>
            <input
              id="file-upload"
              type="file"
              className={styles.fileInput}
              onChange={handleImageChange}
              multiple
            />
            <div>
              <label htmlFor="file-upload" className={styles.uploadLabel}>
                Choose Files
              </label>
            </div>
            <div className={styles.imagePreviewGrid}>
              {images.map((img, idx) => (
                <img
                  key={idx}
                  src={img.url}
                  alt={img.name}
                  className={styles.imagePreview}
                />
              ))}
            </div>
          </div>

          {/* Title & Description */}
          <div className={styles.formGroup}>
            <input
              className={styles.input}
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              className={`${styles.input} ${styles.textarea}`}
              placeholder="Description"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            {/* Rent */}
            <div className={styles.grid}>
              <input
                className={styles.input}
                placeholder="Rent per Day"
                value={rentPerDay}
                onChange={(e) => setRentPerDay(e.target.value)}
              />
              <input
                className={styles.input}
                placeholder="Rent per Month"
                value={rentPerMonth}
                onChange={(e) => setRentPerMonth(e.target.value)}
              />
            </div>
          </div>

          {/* Insurance & Warranty */}
          <div className={styles.grid}>
            <select
              className={styles.select}
              value={insurance}
              onChange={(e) => setInsurance(e.target.value)}
            >
              <option value="">Car Insurance</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
            <select
              className={styles.select}
              value={warranty}
              onChange={(e) => setWarranty(e.target.value)}
            >
              <option value="">Warranty</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>

          <div style={{ textAlign: "right", marginTop: "20px" }}>
            <button className={styles.button} type="submit">
              Save Car
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default CarListing;

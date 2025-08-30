import React, { useState } from "react";
import styles from "./carlist.module.css";
import { toaster } from "@/components/ui/toaster";
import {
  useGetCarBrandsQuery,
  useLazyGetModelsQuery,
  useLazyGetCarTrimsQuery,
  useLazyGetYearsQuery,
  useGetCarRegionalSpecsQuery,
  useGetCarHorsePowersQuery,
  useGetCarSeatingCapacitiesQuery,
  useGetCarColorsQuery,
  useGetCarDoorsQuery,
  useGetTransmissionsQuery,
  useGetBodyTypesQuery,
  useGetFuelTypesQuery,
  useGetCarTechFeaturesQuery,
  useGetCarOtherFeaturesQuery,
  useCreateListingMutation,
} from "../../../app/api/carListingApi";

const CarListing = () => {
  // 🔹 Queries
  const { data: brands } = useGetCarBrandsQuery();
  const [fetchModels, { data: models }] = useLazyGetModelsQuery();
  const [fetchTrims, { data: trims }] = useLazyGetCarTrimsQuery();
  const [fetchYears, { data: years }] = useLazyGetYearsQuery();

  const { data: regionalSpecs } = useGetCarRegionalSpecsQuery();
  const { data: horsePowers } = useGetCarHorsePowersQuery();
  const { data: seatingCapacities } = useGetCarSeatingCapacitiesQuery();
  const { data: colors } = useGetCarColorsQuery();
  const { data: doors } = useGetCarDoorsQuery();
  const { data: transmissions } = useGetTransmissionsQuery();
  const { data: fuelTypes } = useGetFuelTypesQuery();
  const { data: bodyTypes } = useGetBodyTypesQuery();
  const { data: techFeatures } = useGetCarTechFeaturesQuery();
  const { data: otherFeatures } = useGetCarOtherFeaturesQuery();

  const [createListing, { isLoading }] = useCreateListingMutation();

  // 🔹 State
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedTrim, setSelectedTrim] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  const [selectedRegionalSpecs, setSelectedRegionalSpecs] = useState("");
  const [selectedHorsePower, setSelectedHorsePower] = useState("");
  const [selectedSeatingCapacity, setSelectedSeatingCapacity] = useState("");
  const [selectedDoors, setSelectedDoors] = useState("");
  const [selectedTransmission, setSelectedTransmission] = useState("");
  const [selectedFuelType, setSelectedFuelType] = useState("");
  const [selectedBodyType, setSelectedBodyType] = useState("");
  const [interiorColor, setInteriorColor] = useState("");
  const [exteriorColor, setExteriorColor] = useState("");

  const [showTechFeatures, setShowTechFeatures] = useState(false);
  const [showOtherFeatures, setShowOtherFeatures] = useState(false);
  const [selectedTechFeatures, setSelectedTechFeatures] = useState([]);
  const [selectedOtherFeatures, setSelectedOtherFeatures] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [rentPerDay, setRentPerDay] = useState("");
  const [rentPerWeek, setRentPerWeek] = useState("");
  const [rentPerMonth, setRentPerMonth] = useState("");
  const [insurance, setInsurance] = useState("");
  const [warranty, setWarranty] = useState("");
  const [mileage, setMileage] = useState("");
  const [location, setLocation] = useState("");
  const [images, setImages] = useState([]);
  const [showImages, setShowImages] = useState(false);

  // 🔹 Handlers
  const handleBrandChange = async (e) => {
    const brandId = e.target.value;
    setSelectedBrand(brandId);
    setSelectedModel("");
    setSelectedTrim("");
    setSelectedYear("");
    if (brandId) await fetchModels(brandId);
  };

  const handleModelChange = async (e) => {
    const modelId = e.target.value;
    setSelectedModel(modelId);
    setSelectedTrim("");
    setSelectedYear("");
    if (modelId) {
      await fetchTrims(modelId);
      await fetchYears(modelId);
    }
  };

  const handleTechFeatureChange = (featureId) => {
    setSelectedTechFeatures((prev) =>
      prev.includes(featureId)
        ? prev.filter((f) => f !== featureId)
        : [...prev, featureId]
    );
  };

  const handleOtherFeatureChange = (featureId) => {
    setSelectedOtherFeatures((prev) =>
      prev.includes(featureId)
        ? prev.filter((f) => f !== featureId)
        : [...prev, featureId]
    );
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      file,
      name: file.name,
      url: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...newImages]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedBrand || !selectedModel || !selectedYear) {
      toaster.error({ title: "Please select brand, model, and year." });
      return;
    }
    if (!location.trim()) {
      toaster.error({ title: "Location is required." });
      return;
    }
    const mileageValue = Number(mileage);
    if (isNaN(mileageValue) || mileageValue < 0) {
      toaster.error({ title: "Mileage must be a non-negative number." });
      return;
    }

    const formData = new FormData();
    formData.append("carBrand", selectedBrand);
    formData.append("carModel", selectedModel);
    formData.append("carTrim", selectedTrim);
    formData.append("modelYear", selectedYear);
    formData.append("regionalSpecs", selectedRegionalSpecs);
    formData.append("horsePower", selectedHorsePower);
    formData.append("seatingCapacity", selectedSeatingCapacity);
    formData.append("carDoors", selectedDoors);
    formData.append("transmission", selectedTransmission);
    formData.append("fuelType", selectedFuelType);
    formData.append("bodyType", selectedBodyType);
    formData.append("interiorColor", interiorColor);
    formData.append("exteriorColor", exteriorColor);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("rentPerDay", rentPerDay);
    formData.append("rentPerWeek", rentPerWeek);
    formData.append("rentPerMonth", rentPerMonth);
    formData.append("carInsurance", insurance);
    formData.append("warranty", warranty);
    formData.append("mileage", mileageValue);
    formData.append("location", location);

    selectedTechFeatures.forEach((f) => formData.append("techFeatures[]", f));
    selectedOtherFeatures.forEach((f) => formData.append("otherFeatures[]", f));
    images.forEach((img) => formData.append("images", img.file));

    toaster.promise(createListing(formData).unwrap(), {
      loading: { title: "Saving Car...", description: "Please wait..." },
      success: (res) => ({ title: res?.message || "Car saved successfully!" }),
      error: (err) => ({ title: err?.data?.message || "Failed to save car." }),
    });
  };

  return (
    <div className={styles.page}>
      <main className={styles.container}>
        <h2 className={styles.title}>Add Car Details</h2>
        <form className={styles.form} onSubmit={handleSubmit}>

          {/* Brand → Model → Trim → Year */}
          <div className={styles.grid}>
            <label className={styles.labelWrapper}>
              Brand
              <div className={styles.selectWrapper}>
                <select
                  value={selectedBrand}
                  onChange={handleBrandChange}
                  className={styles.select}
                >
                  <option value="">Select Brand</option>
                  {(brands?.carBrands || []).map((brand) => (
                    <option key={brand._id} value={brand._id}>{brand.name}</option>
                  ))}
                </select>
              </div>
            </label>

            <label className={styles.labelWrapper}>
              Model
              <div className={styles.selectWrapper}>
                <select
                  value={selectedModel}
                  onChange={handleModelChange}
                  className={styles.select}
                  disabled={!selectedBrand}
                >
                  <option value="">Select Model</option>
                  {(models?.carModels || []).map((model) => (
                    <option key={model._id} value={model._id}>{model.name}</option>
                  ))}
                </select>
              </div>
            </label>

            <label className={styles.labelWrapper}>
              Trim
              <div className={styles.selectWrapper}>
                <select
                  value={selectedTrim}
                  onChange={(e) => setSelectedTrim(e.target.value)}
                  className={styles.select}
                  disabled={!selectedModel}
                >
                  <option value="">Select Trim</option>
                  {(trims?.carTrims || []).map((trim) => (
                    <option key={trim._id} value={trim._id}>{trim.name}</option>
                  ))}
                </select>
              </div>
            </label>

            <label className={styles.labelWrapper}>
              Year
              <div className={styles.selectWrapper}>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className={styles.select}
                  disabled={!selectedModel}
                >
                  <option value="">Select Year</option>
                  {(years?.years || []).map((year) => (
                    <option key={year._id} value={year._id}>{year.year}</option>
                  ))}
                </select>
              </div>
            </label>
          </div>

          {/* Specs */}
          <div className={styles.grid}>
            <label className={styles.labelWrapper}>
              Regional Specs
              <div className={styles.selectWrapper}>
                <select
                  value={selectedRegionalSpecs}
                  onChange={(e) => setSelectedRegionalSpecs(e.target.value)}
                  className={styles.select}
                >
                  <option value="">Regional Specs</option>
                  {(regionalSpecs?.specs || []).map((spec) => (
                    <option key={spec._id} value={spec._id}>{spec.name}</option>
                  ))}
                </select>
              </div>
            </label>

            <label className={styles.labelWrapper}>
              Horse Power
              <div className={styles.selectWrapper}>
                <select
                  value={selectedHorsePower}
                  onChange={(e) => setSelectedHorsePower(e.target.value)}
                  className={styles.select}
                >
                  <option value="">Horse Power</option>
                  {(horsePowers?.horsePowers || []).map((hp) => (
                    <option key={hp._id} value={hp._id}>{hp.power}</option>
                  ))}
                </select>
              </div>
            </label>

            <label className={styles.labelWrapper}>
              Seating Capacity
              <div className={styles.selectWrapper}>
                <select
                  value={selectedSeatingCapacity}
                  onChange={(e) => setSelectedSeatingCapacity(e.target.value)}
                  className={styles.select}
                >
                  <option value="">Seating Capacity</option>
                  {(seatingCapacities?.seatingCapacities || []).map((sc) => (
                    <option key={sc._id} value={sc._id}>{sc.seats}</option>
                  ))}
                </select>
              </div>
            </label>

            <label className={styles.labelWrapper}>
              Exterior Color
              <div className={styles.selectWrapper}>
                <select
                  value={exteriorColor}
                  onChange={(e) => setExteriorColor(e.target.value)}
                  className={styles.select}
                >
                  <option value="">Exterior Color</option>
                  {(colors?.colors || []).map((c) => (
                    <option key={c._id} value={c._id}>{c.name}</option>
                  ))}
                </select>
              </div>
            </label>

            <label className={styles.labelWrapper}>
              Interior Color
              <div className={styles.selectWrapper}>
                <select
                  value={interiorColor}
                  onChange={(e) => setInteriorColor(e.target.value)}
                  className={styles.select}
                >
                  <option value="">Interior Color</option>
                  {(colors?.colors || []).map((c) => (
                    <option key={c._id} value={c._id}>{c.name}</option>
                  ))}
                </select>
              </div>
            </label>

            <label className={styles.labelWrapper}>
              Doors
              <div className={styles.selectWrapper}>
                <select
                  value={selectedDoors}
                  onChange={(e) => setSelectedDoors(e.target.value)}
                  className={styles.select}
                >
                  <option value="">Doors</option>
                  {(doors?.doors || []).map((d) => (
                    <option key={d._id} value={d._id}>{d.doors}</option>
                  ))}
                </select>
              </div>
            </label>

            <label className={styles.labelWrapper}>
              Transmission
              <div className={styles.selectWrapper}>
                <select
                  value={selectedTransmission}
                  onChange={(e) => setSelectedTransmission(e.target.value)}
                  className={styles.select}
                >
                  <option value="">Transmission</option>
                  {(transmissions?.transmissions || []).map((t) => (
                    <option key={t._id} value={t._id}>{t.transmission}</option>
                  ))}
                </select>
              </div>
            </label>

            <label className={styles.labelWrapper}>
              Fuel Type
              <div className={styles.selectWrapper}>
                <select
                  value={selectedFuelType}
                  onChange={(e) => setSelectedFuelType(e.target.value)}
                  className={styles.select}
                >
                  <option value="">Fuel Type</option>
                  {(fuelTypes?.fuelTypes || []).map((f) => (
                    <option key={f._id} value={f._id}>{f.name}</option>
                  ))}
                </select>
              </div>
            </label>

            <label className={styles.labelWrapper}>
              Body Type
              <div className={styles.selectWrapper}>
                <select
                  value={selectedBodyType}
                  onChange={(e) => setSelectedBodyType(e.target.value)}
                  className={styles.select}
                >
                  <option value="">Body Type</option>
                  {(bodyTypes?.bodyTypes || []).map((b) => (
                    <option key={b._id} value={b._id}>{b.name}</option>
                  ))}
                </select>
              </div>
            </label>
          </div>
          {/* Technical & Other Features */}
          <div className={styles.sectionHeader}>Technical Features</div>
          <button
            type="button"
            onClick={() => setShowTechFeatures(!showTechFeatures)}
            className={`${styles.toggleButton} ${styles.button}`}
          >
            {showTechFeatures ? "Hide Features" : "Add Features"}
          </button>
          {showTechFeatures && (
            <div className={styles.featuresGrid}>
              {(techFeatures?.features || []).map((f) => (
                <label key={f._id} className={styles.featureBox}>
                  <input
                    type="checkbox"
                    checked={selectedTechFeatures.includes(f._id)}
                    onChange={() => handleTechFeatureChange(f._id)}
                  />
                  <span>{f.name}</span>
                </label>
              ))}
            </div>
          )}

          <div className={styles.sectionHeader}>Other Features</div>
          <button
            type="button"
            onClick={() => setShowOtherFeatures(!showOtherFeatures)}
            className={`${styles.toggleButton} ${styles.button}`}
          >
            {showOtherFeatures ? "Hide Features" : "Add Features"}
          </button>
          {showOtherFeatures && (
            <div className={styles.featuresGrid}>
              {(otherFeatures?.features || []).map((f) => (
                <label key={f._id} className={styles.featureBox}>
                  <input
                    type="checkbox"
                    checked={selectedOtherFeatures.includes(f._id)}
                    onChange={() => handleOtherFeatureChange(f._id)}
                  />
                  <span>{f.name}</span>
                </label>
              ))}
            </div>
          )}

          {/* Images */}
          <div className={styles.imageUploadSection}>
            <div className={styles.sectionHeader}>Add Images</div>

            <input
              id="file-upload"
              type="file"
              className={styles.fileInput}
              onChange={handleImageChange}
              multiple
              hidden
            />

            <label htmlFor="file-upload" className={styles.uploadLabel}>
              Choose Files
            </label>

            {images.length > 0 && (
              <div className={styles.imageToggleWrapper}>
                <button
                  type="button"
                  onClick={() => setShowImages(!showImages)}
                  className={styles.toggleButton}
                >
                  {showImages ? "Hide Images" : "Show Images"}
                </button>
              </div>
            )}

            {showImages && images.length > 0 && (
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
            )}
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
          </div>

          {/* Rent */}
          <div className={`${styles.grid} ${styles.gapTop}`}>
            <input
              className={styles.input}
              placeholder="Rent per Day"
              value={rentPerDay}
              onChange={(e) => setRentPerDay(e.target.value)}
            />
            <input
              className={styles.input}
              placeholder="Rent per Week"
              value={rentPerWeek}
              onChange={(e) => setRentPerWeek(e.target.value)}
            />
            <input
              className={styles.input}
              placeholder="Rent per Month"
              value={rentPerMonth}
              onChange={(e) => setRentPerMonth(e.target.value)}
            />
          </div>

          {/* Insurance & Warranty */}
          <div className={styles.grid}>
            <label className={styles.labelWrapper}>
              Car Insurance
              <select
                className={styles.select}
                value={insurance}
                onChange={(e) => setInsurance(e.target.value)}
              >
                <option value="">Car Insurance</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </label>

            <label className={styles.labelWrapper}>
              Warranty
              <select
                className={styles.select}
                value={warranty}
                onChange={(e) => setWarranty(e.target.value)}
              >
                <option value="">Warranty</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </label>
          </div>

          {/* Mileage & Location */}
          <div className={styles.grid}>
            <input
              className={styles.input}
              placeholder="Mileage"
              type="number"
              value={mileage}
              onChange={(e) => setMileage(e.target.value)}
            />
            <input
              className={styles.input}
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          {/* Submit */}
          <div style={{ textAlign: "right", marginTop: "20px" }}>
            <button
              className={styles.button}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save Car"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default CarListing;

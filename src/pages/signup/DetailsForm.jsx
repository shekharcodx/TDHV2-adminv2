import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetRegistration } from "../../../app/slices/registrationSlice";
import { useRegisterMutation } from "../../../app/api/authApi";
import { toaster } from "@/components/ui/toaster";
import styles from "./SignupForm.module.css";
import { de } from "zod/v4/locales";

// ✅ Zod schema for step 2
const schema = z.object({
  fleetSize: z
    .string()
    .refine(val => Number(val) > 0, "Fleet size must be a positive number"),
  ijariCertificate: z
    .any()
    .refine(file => file?.length > 0, "Ijari Certificate is required"),
  tradeLicense: z
    .any()
    .refine(file => file?.length > 0, "Trade License is required"),
  vatCertificate: z
    .any()
    .refine(file => file?.length > 0, "VAT Certificate is required"),
  noc: z.any().refine(file => file?.length > 0, "NOC is required"),
  emiratesId: z.any().optional(),
  poa: z.any().optional(),
  termsAccepted: z.literal(true, {
    errorMap: () => ({ message: "You must accept the terms" }),
  }),
});

export default function DetailsForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const registration = useSelector(state => state.registration);
  const [registerVendor, { isLoading }] = useRegisterMutation();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      // ✅ Flatten Step 1 fields
      formData.append("name", registration.name);
      formData.append("email", registration.email);
      formData.append("role", registration.role || "2");
      formData.append("businessName", registration.businessName);

      formData.append("address.street", registration.address.street);
      formData.append("address.city", registration.address.city); // ID
      formData.append("address.state", registration.address.state); // ID
      formData.append("address.country", registration.address.country); // ID
      formData.append("address.mapUrl", registration.address.mapUrl);

      formData.append("contact.mobileNum", registration.contact.mobileNum);
      formData.append("contact.whatsappNum", registration.contact.whatsappNum);
      formData.append("contact.landlineNum", registration.contact.landlineNum);

      // ✅ Step 2 fields
      formData.append("vendorInformation.fleetSize", data.fleetSize);
      formData.append("ijariCertificate", data.ijariCertificate[0]);
      formData.append("tradeLicense", data.tradeLicense[0]);
      formData.append("vatCertificate", data.vatCertificate[0]);
      formData.append("noc", data.noc[0]);

      if (data.emiratesId?.[0]) formData.append("emiratesId", data.emiratesId[0]);
      if (data.poa?.[0]) formData.append("poa", data.poa[0]);

      // ✅ API call with toaster
      await toaster.promise(
        registerVendor(formData).unwrap(),
        {
          loading: { title: "Registering...", description: "Please wait" },
          success: (res) => {
            dispatch(resetRegistration());
            navigate("/login");
            return{ title:res?.message || "Registration successful!", description: " " };
          },
          error: (err) => {return {title:err?.data?.message || "Registration failed", description: "Please try again"}}
        }
      );
    } catch (err) {
      console.error("Register Error:", err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.stepsHeader}>
        <div className={styles.step}>
          <span>1</span>
          <p>Basic Info</p>
        </div>
        <div className={styles.line}></div>
        <div className={`${styles.step} ${styles.active}`}>
          <span>2</span>
          <p>Details</p>
        </div>
      </div>

      <h2 className={styles.heading}>Details</h2>
      <p className={styles.signupSubtitle}>Provide your fleet and document details</p>

      <form className={styles.grid} onSubmit={handleSubmit(onSubmit)}>
        {/* Fleet Size */}
        <div className={styles.inputFull}>
          <label className={styles.label}>Fleet size</label>
          <input
            type="text"
            className={styles.inputFull}
            {...register("fleetSize")}
            placeholder="Up to 500 Cars"
          />
          {errors.fleetSize && <p className={styles.error}>{errors.fleetSize.message}</p>}
        </div>

        {/* File Uploads */}
        {[
          { name: "ijariCertificate", label: "Ijari Certificate *" },
          { name: "tradeLicense", label: "Trade License *" },
          { name: "vatCertificate", label: "VAT Certificate *" },
          { name: "noc", label: "NOC *" },
          { name: "emiratesId", label: "Emirates ID" },
          { name: "poa", label: "POA" },
        ].map((file, idx) => (
          <div key={idx} className={styles.inputFull}>
            <label className={styles.label}>{file.label}</label>
            <input type="file" className={styles.inputFull} {...register(file.name)} />
            {errors[file.name] && <p className={styles.error}>{errors[file.name].message}</p>}
          </div>
        ))}

        {/* Terms */}
        <div className={styles.inputFull}>
          <label className={styles.label}>
            <input type="checkbox" {...register("termsAccepted")} /> I agree to the{" "}
            <a href="#">Terms of Service</a>
          </label>
          {errors.termsAccepted && <p className={styles.error}>{errors.termsAccepted.message}</p>}
        </div>

        {/* Buttons */}
        <div className={styles.inputFull} style={{ display: "flex", justifyContent: "space-between" }}>
          <button type="button" className={styles.backBtn} onClick={() => navigate("/")}>
            Back
          </button>
          <button type="submit" className={styles.nextButton} disabled={isLoading}>
            {isLoading ? "Submitting..." : "Sign up as Vendor"}
          </button>
        </div>
      </form>
    </div>
  );
}

import React from "react";
import styles from "./DetailsForm.module.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Zod schema
const schema = z.object({
  carFleetSize: z.string().min(1, "Car fleet size is required"),
  ejari: z.any().refine((file) => file?.length > 0, "Ejari Certificate is required"),
  tradeLicense: z.any().refine((file) => file?.length > 0, "Trade License is required"),
  vatCertificate: z.any().refine((file) => file?.length > 0, "VAT Certificate is required"),
  noc: z.any().refine((file) => file?.length > 0, "NOC is required"),
  eid: z.any().optional(),
  poa: z.any().optional(),
  termsAccepted: z.literal(true, {
    errorMap: () => ({ message: "You must accept the terms" }),
  }),
});

export default function Details({ }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    onNext();
  };
 const navigate = useNavigate();

  const onPrevious = () => {
    navigate("/"); // Route back to SignupForm
  };

  return (
    <div className={styles.container}>
          {/* Steps Header */}
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
    

      <h2 className={styles.signupTitle}>Details</h2>
      <p className={styles.signupSubtitle}>Provide your fleet and document details</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Car fleet size */}
        <div className={styles.formBlock}>
          <label>Car fleet size</label>
          <input
            type="text"
            placeholder="Up to 500 Cars"
            {...register("carFleetSize")}
          />
          {errors.carFleetSize && <p className={styles.error}>{errors.carFleetSize.message}</p>}
        </div>

        {/* Ejari Certificate */}
        <div className={styles.formBlock}>
          <label>Ejari Certificate *</label>
          <label className={styles.fileUpload}>
            <input type="file" {...register("ejari")} />
            <span>Click to upload Ejari Certificate</span>
          </label>
          {errors.ejari && <p className={styles.error}>{errors.ejari.message}</p>}
        </div>

        {/* Trade License */}
        <div className={styles.formBlock}>
          <label>Trade License *</label>
          <label className={styles.fileUpload}>
            <input type="file" {...register("tradeLicense")} />
            <span>Click to upload Trade License</span>
          </label>
          {errors.tradeLicense && <p className={styles.error}>{errors.tradeLicense.message}</p>}
        </div>

        {/* VAT Certificate */}
        <div className={styles.formBlock}>
          <label>VAT Certificate *</label>
          <label className={styles.fileUpload}>
            <input type="file" {...register("vatCertificate")} />
            <span>Click to upload VAT Certificate</span>
          </label>
          {errors.vatCertificate && <p className={styles.error}>{errors.vatCertificate.message}</p>}
        </div>

        {/* NOC */}
        <div className={styles.formBlock}>
          <label>NOC *</label>
          <label className={styles.fileUpload}>
            <input type="file" {...register("noc")} />
            <span>Click to upload NOC</span>
          </label>
          {errors.noc && <p className={styles.error}>{errors.noc.message}</p>}
        </div>

        {/* Emirates ID + POA */}
        <div className={styles.formRow}>
          <div className={styles.formBlock}>
            <label>Emirates ID</label>
            <label className={styles.fileUpload}>
              <input type="file" {...register("eid")} />
              <span>Click to upload Emirates ID</span>
            </label>
          </div>
          <div className={styles.formBlock}>
            <label>POA</label>
            <label className={styles.fileUpload}>
              <input type="file" {...register("poa")} />
              <span>Click to upload POA</span>
            </label>
          </div>
        </div>

        {/* Terms */}
        <div className={styles.formBlock}>
          <label>
            <input type="checkbox" {...register("termsAccepted")} /> I agree to the{" "}
            <a href="#">Terms of Service</a>
          </label>
          {errors.termsAccepted && <p className={styles.error}>{errors.termsAccepted.message}</p>}
        </div>

        {/* Navigation */}
        <div className={styles.formNavigation}>
          <button type="button" className={styles.backBtn} onClick={onPrevious}>
            Back
          </button>
          <button type="submit" className={styles.nextBtn}>
            Sign up as Vendor
          </button>
        </div>
      </form>
    </div>
  );
}

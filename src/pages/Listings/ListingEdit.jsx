import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const listingSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description is too short"),
  location: z.string().min(2, "Location is required"),
  isFeatured: z.boolean().optional(),
  isPremium: z.boolean().optional(),
  rentPerDay: z.coerce.number().min(1, "Rent/Day is required"),
  rentPerWeek: z.coerce.number().optional(),
  rentPerMonth: z.coerce.number().optional(),
  carBrand: z.string().min(1, "Brand required"),
  carModel: z.string().min(1, "Model required"),
  carTrim: z.string().optional(),
  modelYear: z.coerce.number().min(1900, "Enter a valid year"),
  doors: z.coerce.number().min(2).max(6),
  seatingCapacity: z.coerce.number().min(2),
  horsePower: z.coerce.number().min(50),
  bodyType: z.string().optional(),
  fuelType: z.string().min(1, "Fuel type required"),
  interiorColor: z.string().optional(),
  exteriorColor: z.string().optional(),
  regionalSpecs: z.string().optional(),
  carInsurance: z.string().optional(),
  warranty: z.string().optional(),
  mileage: z.coerce.number().optional(),
  techFeatures: z.array(z.string()).optional(),
  otherFeatures: z.array(z.string()).optional(),
});

const ListingEdit = ({ initialData, onSave }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(listingSchema),
    defaultValues: initialData || {},
  });

  const onSubmit = (values) => {
    onSave(values);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Edit Car Listing</h1>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-gradient-to-r from-[#5b787c] to-[#4b6467] text-white rounded-lg hover:opacity-90"
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      {/* General Information */}
      <section className="rounded-xl border bg-white shadow-sm p-6 space-y-4">
        <h2 className="font-semibold text-lg">General Information</h2>

        <div>
          <label className="block font-medium">Title</label>
          <input
            type="text"
            {...register("title")}
            className="w-full border rounded-lg px-3 py-2"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="block font-medium">Description</label>
          <textarea
            {...register("description")}
            className="w-full border rounded-lg px-3 py-2"
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>

        <div>
          <label className="block font-medium">Location</label>
          <input
            type="text"
            {...register("location")}
            className="w-full border rounded-lg px-3 py-2"
          />
          {errors.location && (
            <p className="text-red-500 text-sm">{errors.location.message}</p>
          )}
        </div>

        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2">
            <input type="checkbox" {...register("isFeatured")} />
            Featured
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" {...register("isPremium")} />
            Premium
          </label>
        </div>
      </section>

      {/* Pricing */}
      <section className="rounded-xl border bg-white shadow-sm p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block font-medium">Rent / Day</label>
          <input
            type="number"
            {...register("rentPerDay")}
            className="w-full border rounded-lg px-3 py-2"
          />
          {errors.rentPerDay && (
            <p className="text-red-500 text-sm">{errors.rentPerDay.message}</p>
          )}
        </div>
        <div>
          <label className="block font-medium">Rent / Week</label>
          <input
            type="number"
            {...register("rentPerWeek")}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>
        <div>
          <label className="block font-medium">Rent / Month</label>
          <input
            type="number"
            {...register("rentPerMonth")}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>
      </section>

      {/* Car Details */}
      <section className="rounded-xl border bg-white shadow-sm p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block font-medium">Brand</label>
          <input
            type="text"
            {...register("carBrand")}
            className="w-full border rounded-lg px-3 py-2"
          />
          {errors.carBrand && (
            <p className="text-red-500 text-sm">{errors.carBrand.message}</p>
          )}
        </div>
        <div>
          <label className="block font-medium">Model</label>
          <input
            type="text"
            {...register("carModel")}
            className="w-full border rounded-lg px-3 py-2"
          />
          {errors.carModel && (
            <p className="text-red-500 text-sm">{errors.carModel.message}</p>
          )}
        </div>
        <div>
          <label className="block font-medium">Trim</label>
          <input
            type="text"
            {...register("carTrim")}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>
        <div>
          <label className="block font-medium">Year</label>
          <input
            type="number"
            {...register("modelYear")}
            className="w-full border rounded-lg px-3 py-2"
          />
          {errors.modelYear && (
            <p className="text-red-500 text-sm">{errors.modelYear.message}</p>
          )}
        </div>
        <div>
          <label className="block font-medium">Doors</label>
          <input
            type="number"
            {...register("doors")}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>
        <div>
          <label className="block font-medium">Seating Capacity</label>
          <input
            type="number"
            {...register("seatingCapacity")}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>
        <div>
          <label className="block font-medium">Horsepower</label>
          <input
            type="number"
            {...register("horsePower")}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>
        <div>
          <label className="block font-medium">Body Type</label>
          <input
            type="text"
            {...register("bodyType")}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>
        <div>
          <label className="block font-medium">Fuel Type</label>
          <input
            type="text"
            {...register("fuelType")}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>
        <div>
          <label className="block font-medium">Interior Color</label>
          <input
            type="text"
            {...register("interiorColor")}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>
        <div>
          <label className="block font-medium">Exterior Color</label>
          <input
            type="text"
            {...register("exteriorColor")}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>
      </section>

      {/* Features */}
      <section className="rounded-xl border bg-white shadow-sm p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block font-medium">Technical Features</label>
          <textarea
            {...register("techFeatures")}
            placeholder="Comma separated features"
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>
        <div>
          <label className="block font-medium">Other Features</label>
          <textarea
            {...register("otherFeatures")}
            placeholder="Comma separated features"
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>
      </section>

      {/* Additional Information */}
      <section className="rounded-xl border bg-white shadow-sm p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block font-medium">Regional Specs</label>
          <input
            type="text"
            {...register("regionalSpecs")}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>
        <div>
          <label className="block font-medium">Insurance</label>
          <input
            type="text"
            {...register("carInsurance")}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>
        <div>
          <label className="block font-medium">Warranty</label>
          <input
            type="text"
            {...register("warranty")}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>
        <div>
          <label className="block font-medium">Mileage</label>
          <input
            type="number"
            {...register("mileage")}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>
      </section>
    </form>
  );
};

export default ListingEdit;

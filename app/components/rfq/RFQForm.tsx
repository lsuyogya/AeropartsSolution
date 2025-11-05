import { useEffect, useState } from "react";
import { useController, useForm } from "react-hook-form";
import { useLocation } from "react-router";
import CountryCombobox from "../ui/CountryCombobox";

type FormValues = {
  firstName: string;
  lastName: string;
  companyName: string;
  email: string;
  phone: string;
  country: string;
  aircraftType: string;
  partNumber: string;
  quantity: number;
  priority: string;
  description: string;
  fileMain: FileList;
  fileAdditional: FileList;
  confirmDetails: boolean;
  agreeTerms: boolean;
};

export default function RFQForm(formClass: { formClass?: string }) {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  const location = useLocation();

  // Get part number from URL parameters
  const getPartNumberFromURL = () => {
    if (typeof window === "undefined") return "";

    const urlParams = new URLSearchParams(window.location.search);
    return (
      urlParams.get("part_number") ||
      urlParams.get("partNumber") ||
      urlParams.get("part") ||
      urlParams.get("pn") ||
      ""
    );
  };

  // Set part number from URL when component mounts
  useEffect(() => {
    const partNumber = getPartNumberFromURL();
    if (partNumber) {
      setValue("partNumber", partNumber);
    }
  }, [setValue, location]);

  const { ref: mainFileRef, ...mainFileRest } = register("fileMain");
  const { ref: additionalFileRef, ...additionalFileRest } =
    register("fileAdditional");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      // Create FormData for file uploads
      const formData = new FormData();

      // Append all text fields
      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);
      formData.append("companyName", data.companyName);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      formData.append("country", data.country);
      formData.append("aircraftType", data.aircraftType || "");
      formData.append("partNumber", data.partNumber || "");
      formData.append("quantity", data.quantity?.toString() || "");
      formData.append("priority", data.priority || "");
      formData.append("description", data.description || "");

      // Append files if they exist
      if (data.fileMain?.[0]) {
        formData.append("fileMain", data.fileMain[0]);
      }
      if (data.fileAdditional?.[0]) {
        formData.append("fileAdditional", data.fileAdditional[0]);
      }

      const response = await fetch(
        `${import.meta.env.VITE_Backend_Base_Url}/contact-form-rfq/`,
        // `https://thisisdemo.com/aeroparts/dev/wp-json/my-api/v2/contact-form-rfq/`,
        {
          method: "POST",
          body: formData,
          // Don't set Content-Type header - browser will set it with boundary for multipart/form-data
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit request");
      }

      const result = await response.json();
      // console.log(result);
      setSubmitStatus({
        type: "success",
        message: "Quote request submitted successfully!",
      });

      // Optional: Reset form after success
      reset();
      setMainFileName("");
      setAdditionalFileName("");
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitStatus({
        type: "error",
        message: "Failed to submit request. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const [mainFileName, setMainFileName] = useState<string>("");
  const [additionalFileName, setAdditionalFileName] = useState<string>("");

  const { field: countryField } = useController({
    name: "country",
    control,
    rules: { required: true },
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`w-[min(100%,_550px)] bg-white-lg space-y-4 relative ${formClass}`}
    >
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-[#464646] mb-2">
            First Name*
          </label>
          <input
            {...register("firstName", { required: true })}
            className="w-full border border-[#dfdfdf] p-3 bg-grey"
          />
          {errors.firstName && (
            <p className="text-red-500 text-xs mt-1">Required</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-[#464646] mb-2">
            Last Name
          </label>
          <input
            {...register("lastName")}
            className="w-full border border-[#dfdfdf] p-3 bg-grey"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-[#464646] mb-2">
          Company Name*
        </label>
        <input
          {...register("companyName", { required: true })}
          className="w-full border border-[#dfdfdf] p-3 bg-grey"
        />
        {errors.companyName && (
          <p className="text-red-500 text-xs mt-1">Required</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-[#464646] mb-2">
          Email Address*
        </label>
        <input
          type="email"
          {...register("email", { required: true })}
          className="w-full border border-[#dfdfdf] p-3 bg-grey"
        />
        {errors.email && <p className="text-red-500 text-xs mt-1">Required</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-[#464646] mb-2">
          Phone Number
        </label>
        <input
          type="tel"
          {...register("phone", { required: true })}
          className="w-full border border-[#dfdfdf] p-3 bg-grey"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#464646] mb-2">
          Country / Region*
        </label>
        <CountryCombobox
          value={countryField.value}
          onChange={countryField.onChange}
          onBlur={countryField.onBlur}
          error={!!errors.country}
          placeholder="-- Select Country/Region --"
          name="country"
        />
        {errors.country && (
          <p className="text-red-500 text-xs mt-1">Required</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 mt-12">
        <div>
          <label className="block text-sm font-medium text-[#464646] mb-2">
            Aircraft Type / Model
          </label>
          <input
            {...register("aircraftType")}
            className="w-full border border-[#dfdfdf] p-3 bg-grey"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#464646] mb-2">
            Part Number(s)
          </label>
          <input
            {...register("partNumber")}
            className="w-full border border-[#dfdfdf] p-3 bg-grey"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-[#464646] mb-2">
            Quantity Required
          </label>
          <input
            type="number"
            {...register("quantity")}
            className="w-full border border-[#dfdfdf] p-3 bg-grey"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#464646] mb-2">
            Priority
          </label>
          <select
            {...register("priority")}
            className="w-full border border-[#dfdfdf] p-3 bg-grey"
          >
            <option value="">-- Select Priority --</option>
            <option value="normal">Normal</option>
            <option value="urgent">Urgent</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-[#464646] mb-2">
          Description of Part(s)
        </label>
        <textarea
          {...register("description")}
          rows={3}
          className="w-full border border-[#dfdfdf] p-3 bg-grey"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#464646] mb-2">
          Upload your parts list / RFP
        </label>
        <div className="flex items-center gap-3">
          <label className="px-4 py-1 bg-[#dadada] text-[rgb(70,70,70)] rounded cursor-pointer hover:bg-[#bbbbbb] transition">
            Choose File
            <input
              type="file"
              accept=".pdf, .doc, .docx, .xls, .xlsx, application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              {...mainFileRest}
              ref={mainFileRef}
              onChange={(e) => {
                mainFileRest.onChange(e);
                const file = e.target.files?.[0];
                setMainFileName(file ? file.name : "");
              }}
              className="hidden"
            />
          </label>
          <span className="text-sm text-gray-600">
            {mainFileName || "No file chosen"}
          </span>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-[#464646] mb-2">
          Upload your parts list / RFP - additional
        </label>
        <div className="flex items-center gap-3">
          <label className="px-4 py-1 bg-[#dadada] text-[rgb(70,70,70)] rounded cursor-pointer hover:bg-[#bbbbbb] transition">
            Choose File
            <input
              type="file"
              accept=".pdf, .doc, .docx, .xls, .xlsx, application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              {...additionalFileRest}
              ref={additionalFileRef}
              onChange={(e) => {
                additionalFileRest.onChange(e);
                const file = e.target.files?.[0];
                setAdditionalFileName(file ? file.name : "");
              }}
              className="hidden"
            />
          </label>
          <span className="text-sm text-gray-600">
            {additionalFileName || "No file chosen"}
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            {...register("confirmDetails", { required: true })}
          />
          <span className="ml-2 text-[#464646]">
            I confirm all part details are correct
          </span>
          {errors.confirmDetails && (
            <p className="text-red-500 text-xs mt-1">Required</p>
          )}
        </label>
        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            {...register("agreeTerms", { required: true })}
          />
          <span className="ml-2 text-[#464646]">
            I agree to the{" "}
            <a href="/terms_of_conditions" className="text-black underline">
              Terms & Conditions
            </a>{" "}
            and{" "}
            <a href="#" className="text-black underline">
              Privacy Policy
            </a>
          </span>
          {errors.agreeTerms && (
            <p className="text-red-500 text-xs mt-1">Required</p>
          )}
        </label>
      </div>

      {submitStatus.type && (
        <div
          className={`p-4 rounded ${
            submitStatus.type === "success"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {submitStatus.message}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-secondary text-white py-2 hover:bg-[#b98a3a] transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "SUBMITTING..." : "SUBMIT"}
      </button>
    </form>
  );
}

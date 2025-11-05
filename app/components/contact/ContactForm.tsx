import { useState } from "react";
import { useForm } from "react-hook-form";

type FormValues = {
  firstName: string;
  lastName: string;
  companyName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      // Create FormData
      const formData = new FormData();

      // Append all fields
      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName || "");
      formData.append("companyName", data.companyName);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      formData.append("subject", data.subject);
      formData.append("message", data.message || "");

      const response = await fetch(
        `${import.meta.env.VITE_Backend_Base_Url}/contact-form/`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit message");
      }

      const result = await response.json();
      // console.log(result);
      setSubmitStatus({
        type: "success",
        message: "Message submitted successfully!",
      });

      // Reset form after success
      reset();
    } catch (error) {
      // console.error("Submission error:", error);
      setSubmitStatus({
        type: "error",
        message: "Failed to submit message. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-[min(100%,_550px)] mr-auto bg-white-lg space-y-4"
    >
      <div className="grid grid-cols-2 gap-4">
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
          Phone Number*
        </label>
        <input
          type="tel"
          {...register("phone", { required: true })}
          className="w-full border border-[#dfdfdf] p-3 bg-grey"
        />
        {errors.phone && <p className="text-red-500 text-xs mt-1">Required</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-[#464646] mb-2">
          Subject*
        </label>
        <select
          {...register("subject", { required: true })}
          className="w-full border border-[#dfdfdf] p-3 bg-grey"
        >
          <option value="">-- Select Subject --</option>
          <option value="general-inquiry">General Inquiry</option>
          <option value="complaints">Complaints</option>
        </select>
        {errors.subject && (
          <p className="text-red-500 text-xs mt-1">Required</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-[#464646] mb-2">
          Message
        </label>
        <textarea
          {...register("message")}
          rows={3}
          className="w-full border border-[#dfdfdf] p-3 bg-grey"
        />
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

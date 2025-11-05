import { useLoaderData } from "react-router";
import favIcon from "~/../assets/images/aero-icon.svg";
import BannerImg from "~/../assets/images/contact-bg.jpg";
import Banner from "~/components/Banner";
import ContactForm from "~/components/contact/ContactForm";
import FadeLeft from "~/components/ui/FadeLeft.client";
import FadeRight from "~/components/ui/FadeRight.client";
import type { Route } from "./+types/Contact";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Contact" },
    { name: "description", content: "Request a quote or contact us." },
  ];
}
export interface ContactLoaderResponse {
  // Define any data you expect from the loader here
  banner_image : string | null;
  banner_title : string ;
  banner_description : string ;
  email : string;
  phone_1 : string;
  phone_2 : string;
  address : string;
  working_hours : string;
}
// Client-side loader for this route.
export async function clientLoader(): Promise<ContactLoaderResponse> {
  const endpoint = `${import.meta.env.VITE_Backend_Base_Url}/contact`;
  try {
    const res = await fetch(endpoint, {
      method: "GET",
      credentials: "same-origin",
    });
    if (!res.ok) {
          throw new Response("Failed to fetch index data", { status: res.status });
    }
    const contactInfo = (await res.json()) as ContactLoaderResponse;
    if (!contactInfo || typeof contactInfo.banner_title !== "string") {
      throw new Response("Invalid index payload", { status: 502 });
    }
    // console.log("About Loader Data:", contactInfo);
    return contactInfo;
  }
  catch (err) {
    if (err instanceof Response) throw err;
    throw new Response("Network error while fetching index data", {
      status: 500,
    });
  }
  }

const Contact = () => {
  const contactData = {
    headOffice: {
      title: "Head Office",
      address:
        "Aeroparts Solutions, Dubai Airport Freezone (DAFZA), Dubai, UAE",
      phone: ["+971 50 219 3737", "+971 50 536 3659"],
      email: "info@aeropartssolution.com",
      workingHours:
        "Monday – Friday: 9:00 AM – 6:00 PM (UAE Time), AOG Support: 24/7",
    },
    urgentSupport: {
      title: "Need Urgent AOG Support?",
      hotline: `Call our <span className="text-secondary">24/7</span> hotline at <span className="text-secondary"> +971 50 219 3737 </span> for immediate assistance.`,
    },
  };
const contactInfo = useLoaderData<ContactLoaderResponse>();
  return (
    <>
      <Banner
        bgImgUrl={contactInfo.banner_image ? contactInfo.banner_image as string : BannerImg}
        title={contactInfo.banner_title}
        desc={contactInfo.banner_description}
      />

      <section className="bg-white">
        <div className="container mx-auto grid lg:grid-cols-2 py-20 gap-y-10" style={{"overflow": "visible", "position": "relative"}}>
          <FadeRight>
            <div className="formDetails text-[#494949] max-w-max max-h-max mx-auto  rounded-r-[30px] relative " style={{ "position":"sticky" , "top": "var(--headerHeight)" }}>
              <p className="grid gap-6 mt-8">
                <span>
                  <strong className="font-bold">
                    {contactData.headOffice.title}
                  </strong>
                  <br />
                  {contactInfo.address}
                </span>
                <span>
                  <strong className=""> Phone:</strong>
                  {[contactInfo.phone_1, contactInfo.phone_2]
                  .filter(Boolean)
                  .map((phone, idx) => (
                  <span key={idx} className={idx === 1 ? "ml-[52px]" : ""}>
                  {phone}
                  {idx === 0 && <br />}
                  </span>
                  ))}
                </span>
                <span>
                  <strong className="font-bold">Email</strong> <br />
                  {contactInfo.email}
                </span>
                <span>
                  <strong className="font-bold">Working Hours</strong> <br />
                  {contactInfo.working_hours}
                </span>
              </p>
            </div>
          </FadeRight>
          <FadeLeft>
            <ContactForm></ContactForm>
          </FadeLeft>
        </div>
      </section>
      <section className="pt-20 bg-primary text-white">
        <div className="container mx-auto text-center space-y-4">
          <h1 className="font-bold text-5xl">
            {contactData.urgentSupport.title}
          </h1>
          <p className="text-2xl">
            {/* {parse(DOMPurify.sanitize(contactData.urgentSupport.hotline))} */}
            Call our <span className="text-secondary">24/7</span> hotline at{" "}
            <span className="text-secondary"> {contactInfo.phone_1} </span> for
            immediate assistance.
          </p>
          <img
            src={favIcon}
            alt=""
            height={200}
            width={200}
            className="h-[150px] w-[240px] object-cover object-top mx-auto"
          />
        </div>
      </section>
    </>
  );
};
export default Contact;

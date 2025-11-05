import { useLoaderData } from "react-router";
import BannerImg from "~/../assets/images/rfq-bg.jpg";
import Banner from "~/components/Banner";
import RFQForm from "~/components/rfq/RFQForm";
import FadeRight from "~/components/ui/FadeRight.client";
import FadeUp from "~/components/ui/FadeUp.client";
import type { Route } from "./+types/RFQ";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Request for Quote" },
    { name: "description", content: "Request a quote or contact us." },
  ];
}
export interface RfqLoaderResponse {
  // Define any data you expect from the loader here
  banner_image : string | null;
  banner_title : string;
  banner_description : string;
  email : string;
  phone_1 : string;
  phone_2 : string;
  address : string;
}
// Client-side loader for this route.
export async function clientLoader(): Promise<RfqLoaderResponse> {
  const endpoint = `${import.meta.env.VITE_Backend_Base_Url}/rfq`;
  try {
    const res = await fetch(endpoint, {
      method: "GET",
      credentials: "same-origin",
    });
    if (!res.ok) {
          throw new Response("Failed to fetch index data", { status: res.status });
    }
    const contactInfo = (await res.json()) as RfqLoaderResponse;
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
const RFQ = () => {
  const contactInfo1 = {
    title: "Contact Our Team",
    description: "No stress, just support 24/7/365. How can we help you today?",
    company: "Aeroparts Solutions",
    // address:
    //   "Third Floor, 6 East A, Dubai Airport Freezone Dubai, United Arab Emirates",
    // phone: ["+971 50 219 3737", "+971 50 536 3659"],
    // email: "contact@aeropartssolution.com",
  };
const contactInfo = useLoaderData<RfqLoaderResponse>();
  return (
    <>
      <Banner
        // bgImgUrl={BannerImg}
        // title="Request a Quote"
        // desc="Fast, Reliable Quotes for Certified Aircraft Parts"
          bgImgUrl={contactInfo.banner_image ? contactInfo.banner_image as string : BannerImg}
        title={contactInfo.banner_title}
        desc={contactInfo.banner_description}
      />

      <section className="min-h-screen bg-white">
        <div className="container mx-auto grid lg:grid-cols-2 py-20 gap-y-10" style={{"overflow": "visible", "position": "relative"}}>
          <FadeRight>
            <div className="formDetails bg-grey text-[#494949] lg:w-[85%] max-h-max p-20 pr-24 pl-0 rounded-r-[30px] relative after:content-[''] after:absolute after:w-full after:h-full after:top-0 after:left-1 after:-z-1 after:bg-grey after:-translate-x-full" style={{ "position":"sticky" , "top": "var(--headerHeight)" }}>
              <h1 className="text-primary font-black text-5xl">
                {contactInfo1.title}
              </h1>
              <p className="grid gap-6 mt-12">
                <span>{contactInfo1.description}</span>
                <span className="font-bold">{contactInfo1.company}</span>
                <span className="max-w-[35ch]">{contactInfo.address}</span>
                <span className="grid">
                  {[contactInfo.phone_1, contactInfo.phone_2]
                    .filter(Boolean)
                    .map((phone, idx) => (
                      <span key={idx}>{phone}</span>
                    ))}
                </span>
                <span>{contactInfo.email}</span>
              </p>
            </div>
          </FadeRight>

          <div className="w-full">
            <FadeUp delay={0.3}>
              <div className="mr-auto">
                <RFQForm formClass="mx-auto"></RFQForm>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>
    </>
  );
};

export default RFQ;

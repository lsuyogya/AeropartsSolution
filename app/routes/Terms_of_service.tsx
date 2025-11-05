import parse from "html-react-parser";
import DOMPurify from "isomorphic-dompurify";
import { useLoaderData } from "react-router";
import BannerImg from "~/../assets/images/policies-bg.jpg";
import Banner from "~/components/Banner";
import type { Route } from "./+types/Terms_of_service";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Terms Of Service" },
    { name: "description", content: "Terms of Service" },
  ];
}
export interface TermsLoaderResponse {
  // Define any data you expect from the loader here
  banner_image : string | null;
  banner_title : string ;
  banner_description : string ;
  content: string ;
}
// Client-side loader for this route.
export async function clientLoader(): Promise<TermsLoaderResponse> {
  const endpoint = `${import.meta.env.VITE_Backend_Base_Url}/terms_of_services/`;
  try {
    const res = await fetch(endpoint, {
      method: "GET",
      credentials: "same-origin",
    });
    if (!res.ok) {
          throw new Response("Failed to fetch index data", { status: res.status });
    }
    const termsData = (await res.json()) as TermsLoaderResponse;
    if (!termsData || typeof termsData.banner_title !== "string") {
      throw new Response("Invalid index payload", { status: 502 });
    }
    // console.log("About Loader Data:", termsData);
    return termsData;
  }
  catch (err) {
    if (err instanceof Response) throw err;
    throw new Response("Network error while fetching index data", {
      status: 500,
    });
  }
  }
const Terms_of_service = () => {
  // const data = {
  //   bannerTitle: "Terms of Service",
  //   bannerImg: BannerImg,
  //   description: `<p>
  //             Welcome to Aeroparts Solutions. By using our website and services,
  //             you agree to the following terms.
  //           </p>
  //           <p>
  //             All Requests for Quote (RFQs) submitted through our website are
  //             subject to review and confirmation. A quotation does not
  //             constitute a binding contract until accepted in writing by
  //             Aeroparts Solutions. Prices are based on availability at the time
  //             of quotation, valid for 30 days unless otherwise stated, and
  //             exclude taxes, duties, and shipping costs unless specified.
  //             Payment terms will be confirmed with each order, and full payment
  //             is generally required prior to dispatch.
  //           </p>
  //           <p>
  //             Delivery times are estimates only; Aeroparts Solutions is not
  //             responsible for delays caused by carriers, customs, or unforeseen
  //             circumstances. Risk of loss passes to the client once goods are
  //             handed to the shipping provider. Returns are accepted only with
  //             prior written approval and in accordance with our Return & Refund
  //             Policy.
  //           </p>
  //           <p>
  //             We supply certified, traceable aircraft parts in compliance with
  //             international aviation standards, but it is the client’s
  //             responsibility to ensure parts are suitable for their intended
  //             application. Unless otherwise stated, all items are provided “as
  //             is” with applicable certification. Liability is limited to
  //             replacement of defective goods or refund of the purchase price,
  //             and Aeroparts Solutions is not responsible for indirect or
  //             consequential damages such as loss of revenue, downtime, or flight
  //             delays.
  //           </p>
  //           <p>
  //             All website content, including text, graphics, and logos, is the
  //             property of Aeroparts Solutions and may not be reproduced or used
  //             without permission. Information exchanged during the RFQ and sales
  //             process will be treated as confidential.
  //           </p>
  //           <p>
  //             These Terms are governed by the laws of the United Arab Emirates,
  //             and any disputes will be subject to the exclusive jurisdiction of
  //             the Dubai courts. Aeroparts Solutions may update these Terms at
  //             any time, and continued use of the website constitutes acceptance
  //             of the revised version.
  //           </p>
  //           <p>
  //             For questions, please contact us at info@aeropartssolution.com
  //           </p>`,
  // };
   const termsData = useLoaderData<TermsLoaderResponse>();
  return (
    <>
      {/* <Banner bgImgUrl={data.bannerImg} title={data.bannerTitle} /> */}
       <Banner
        bgImgUrl={termsData.banner_image ? termsData.banner_image as string : BannerImg}
        title={termsData.banner_title}
        desc={termsData.banner_description}
      />
      <section className="bg-white">
        <div className="container mx-auto py-20 lg:py-40">
          <div className="max-w-[86ch] space-y-6 text-lg text-[#494949] ">
            {parse(DOMPurify.sanitize(termsData.content))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Terms_of_service;

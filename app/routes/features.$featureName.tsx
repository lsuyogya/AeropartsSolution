import { lazy, Suspense } from "react";
import { useLoaderData } from "react-router";
import Loader from "~/components/ui/Loader";
import type { Route } from "./+types/features.$featureName";
import Banner from "~/components/Banner";
import bannerImg from "~/../assets/images/sections/service-banner.jpg";
import Service2col2title from "~/components/services/Service2col2title";
import Service2col1title from "~/components/services/Service2col1title";
import parse from "html-react-parser";
import DOMPurify from "isomorphic-dompurify";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Features | Aero Part Solution" },
    { name: "description", content: "Service Details" },
  ];
}
const data = {
  banner_bg_img: bannerImg,
  banner_title: "Airframe Components",
  banner_subtitle:
    "Reliable and Certified Aircraft Structural Parts with Fast Global Delivery",
  CenterTxtSectionTitle:
    "Reliable and Certified Aircraft Structural Parts with Fast Global Delivery",
  CenterTxtSectionDescription:
    "Aeroparts Solutions supplies a comprehensive range of airframe components for commercial, business and military aircraft, ensuring operational safety, durability, and airworthiness across global fleets. Our strategic Dubai hub enables rapid fulfillment for both scheduled maintenance and urgent AOG demands, reducing aircraft downtime and increasing operational readiness. <br><br> We deliver certified structural and external components, sourced through validated global networks and supported with full documentation for maintenance compliance.",
  serviceDescTitleText1: "Quality & Compliance",
  serviceDescListText1: [
    { list: "CoC (Certificate of Conformity)" },
    { list: "EASA / FAA release documentation" },
    { list: "Complete traceability and serial tracking" },
    { list: "Material batch and inspection reports" },
  ],
  serviceDescTitleText2: "Why Operators Trust Us",
  serviceDescListText2: [
    { list: "Ability to source both modern and legacy platform structures" },
    { list: "Availability for immediate dispatch for in-stock components" },
    {
      list: "Support for heavy checks, D checks & fleet refurbishment programs",
    },
    { list: "Custom structural component sourcing available upon request" },
  ],
  serviceListTitle: "Available Components Include:",
  serviceListDesc:
    "Each part supplied is traceable, certified, and conforming to OEM standards, ensuring direct installability and regulatory acceptance without delays.",
  serviceListText: [
    { list: "Fuselage frames, skin panels & fairings" },
    { list: "Passenger and cargo doors with mechanism assemblies" },
    { list: "Wing components, slats, flaps, spoilers & ailerons" },
    { list: "Horizontal & vertical stabilizers, elevators, rudders" },
    { list: "Access hatches, emergency exits & inspection panels" },
    { list: "Tail cone sections, nacelle skins and mounting structures" },
  ],
};

const B2b = () => {
  return (
    <>
      <Banner
        bgImgUrl={data.banner_bg_img}
        title={data.banner_title}
        desc={data.banner_subtitle}
      />
      <section className="bg-white py-41">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl text-primary font-black max-w-[40ch] mx-auto">
            {data.CenterTxtSectionTitle}
          </h1>
          <div className="text-lg/relaxed max-w-[60ch] mx-auto mt-10 text-text-grey">
            {parse(DOMPurify.sanitize(data.CenterTxtSectionDescription))}
          </div>
        </div>
      </section>
      <Service2col2title
        title1={data.serviceDescTitleText1}
        title2={data.serviceDescTitleText2}
        content1={data.serviceDescListText1}
        content2={data.serviceDescListText2}
      />
      <Service2col1title
        title={data.serviceListTitle}
        desc={data.serviceListDesc}
        content={data.serviceListText}
        bgWhite={true}
      />
    </>
  );
};

export default B2b;

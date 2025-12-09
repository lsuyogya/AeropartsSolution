import { lazy, Suspense } from "react";
import { useLoaderData } from "react-router";
import Loader from "~/components/ui/Loader";
import type { Route } from "./+types/services.B2b";
import Banner from "~/components/Banner";
import bannerImg from "~/../assets/images/sections/b2b-banner.jpg";
import benefitsImg from "~/../assets/images/sections/b2b-img.jpg";
import RibbonSection from "~/components/services/RibbonSection";
import Service2col1title from "~/components/services/Service2col1title";
import Benefits from "~/components/services/Benefits";
import plane from "~/../assets/images/sections/b2b-plane-transparent.png";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "B2B | Aero Part Solution" },
    { name: "description", content: "B2B Service Details" },
  ];
}

const data = {
  banner_bg_img: bannerImg,
  banner_title: "B2B Private Aviation Supply",
  banner_subtitle:
    "Solutions for airlines, MROs, charter fleets & defense operators.",
  RibbonTitle:
    "Build a supply chain partnership with predictable lead time availability.",
  RibbonDescription:
    "Aeroparts Solutions supports airlines, fleet operators, MRO organizations, charter companies and defense aviation entities with high-volume part supply, component replacement cycles, rotable management, and technical procurement support. Designed for commercial operations, our B2B division delivers predictable sourcing, fast logistics, and compliance-ready documentation to keep fleets operational with minimum downtime.",
  RibbonCtaText: "BECOME PARTNER",
  RibbonPlaneImg: plane,
  serviceDescTitleText: "Complete Procurement Support for Aviation Businesses",
  serviceDescDescription:
    "Our B2B model offers direct partnership access for recurring purchasing, maintenance planning and urgent replacement requirements.",
  serviceDescListTitle: "We supply large-volume and scheduled demand for:",
  serviceDescListText: [
    {
      list: "Certified aircraft parts (structures, avionics, engines, interiors & more)",
    },
    { list: "Rotable components with exchange or outright purchase options" },
    { list: "Consumables for continuous maintenance cycles" },
    { list: "AOG support with expedited shipping" },
    { list: "Long-term procurement contracts for fleet operators" },
  ],
  benefitTitleText1: "Benefits to B2B Aviation Clients",
  benefitTitleText2: "Partnership-Based Fleet Support",
  benefitListText1: [
    { list: "Reliable multi-aircraft platform support" },
    { list: "Competitive volume pricing & annual contracts" },
    { list: "Global logistics routing from Dubai" },
    { list: "Dedicated account manager for every partner" },
    { list: "24/7 support for AOG and urgent part requests" },
  ],
  benefitListText2: [
    { list: "Predictable supply for scheduled checks" },
    { list: "Support for C/D check & heavy maintenance" },
    { list: "Urgent sourcing for unscheduled repairs" },
    { list: "Stock reservation for contract clients" },
    { list: "End-to-end logistics with customs handling" },
  ],
  benefitsImg: benefitsImg,
};

const B2b = () => {
  return (
    <>
      <Banner
        bgImgUrl={data.banner_bg_img}
        title={data.banner_title}
        desc={data.banner_subtitle}
      />
      <RibbonSection
        title={data.RibbonTitle}
        desc={data.RibbonDescription}
        cta={data.RibbonCtaText}
        img={data.RibbonPlaneImg}
      />
      <Service2col1title
        title={data.serviceDescTitleText}
        desc={data.serviceDescDescription}
        content={data.serviceDescListText}
        listTitle={data.serviceDescListTitle}
      ></Service2col1title>
      <Benefits
        title1={data.benefitTitleText1}
        title2={data.benefitTitleText2}
        content1={data.benefitListText1}
        content2={data.benefitListText2}
        img={data.benefitsImg}
      ></Benefits>
    </>
  );
};

export default B2b;

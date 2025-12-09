import { lazy, Suspense } from "react";
import { useLoaderData } from "react-router";
import Loader from "~/components/ui/Loader";
import type { Route } from "./+types/services.B2c";
import Banner from "~/components/Banner";
import bannerImg from "~/../assets/images/sections/b2c-banner.jpg";
import benefitsImg from "~/../assets/images/sections/b2c-img.jpg";
import RibbonSection from "~/components/services/RibbonSection";
import Service2col1title from "~/components/services/Service2col1title";
import Benefits from "~/components/services/Benefits";
import plane from "~/../assets/images/sections/b2c-plane-transparent.png";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "B2C | Aero Part Solution" },
    { name: "description", content: "B2C Service Details" },
  ];
}

const data = {
  banner_bg_img: bannerImg,
  banner_title: "B2C Private Aviation Support",
  banner_subtitle: "Premium supply for private jet & VIP aircraft owners.",
  RibbonTitle:
    "Build a supply chain partnership with predictable lead time availability.",
  RibbonDescription:
    "Private jet owners, aircraft management firms and VIP operators require a requirement source built on discretion, speed, and technical precision. Aeroparts Solutions delivers tailored aircraft parts, cable upgrades, and personalized technical sourcing designed specifically for individual aircraft ownership.",
  RibbonCtaText: "PRIVATE SUPPORT REQUEST",
  RibbonPlaneImg: plane,
  serviceDescTitleText:
    "Premium Aircraft Component Supply for Private Aviation",
  serviceDescDescription:
    "Whether restoring an interior, replacing a flight display or sourcing an urgent actuator — our support is personal, responsive, and direct.",
  serviceDescListTitle: "We assist with:",
  serviceDescListText: [
    { list: "Replacement parts for private and business jets" },
    { list: "Avionics upgrades & navigation system enhancements" },
    { list: "Engine and APU components for inspection cycles" },
    { list: "Fast-access consumables for routine maintenance" },
    { list: "Cabin interior upgrades with luxury finishing options" },
  ],
  benefitTitleText1: "Cabin Modernization for VIP Comfort",
  benefitTitleText2: "Personalized Procurement & Support",
  benefitListText1: [
    { list: "Seating reconfiguration and refurbishment" },
    { list: "LED mood lighting & cabin illumination upgrades" },
    { list: "Noise-reduction materials and luxury paneling" },
    { list: "Galley enhancements, mini-bar units & entertainment systems" },
  ],
  benefitListText2: [
    { list: "One-to-one procurement support" },
    { list: "Priority sourcing for low-availability components" },
    { list: "Short lead times through global warehouses" },
    { list: "Discreet, confidential handling of ownership information" },
    { list: "Worldwide delivery — to hangar or home base" },
  ],
  benefitsImg: benefitsImg,
};

const B2c = () => {
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

export default B2c;

import { useRef } from "react";
import icon1 from "../../../assets/images/SVGs/airframe-component.svg";
import icon2 from "../../../assets/images/SVGs/avionics.svg";
import icon3 from "../../../assets/images/SVGs/engine-parts.svg";
import icon4 from "../../../assets/images/SVGs/landing-gear.svg";
import icon5 from "../../../assets/images/SVGs/cabin.svg";
import icon6 from "../../../assets/images/SVGs/consumbles.svg";
import FadeUp from "../ui/FadeUp.client";
import type { IndexSection3Content } from "~/routes/_index";

const OurFeatures = ({
  title,
  desc,
  content,
}: {
  title: string;
  desc: string;
  content: IndexSection3Content[];
}) => {
  const data = {
    titleText: title ?? "Our Features",
    subTitleText:
      desc ?? "Reliable and Fast Delivery of Certified Aircraft Parts",
    description:
      "Aeroparts Solutions provides a wide range of certified aircraft parts and aviation components, with fast and efficient delivery from our Dubai hub to anywhere in the world.",
    featuresData: content ?? [
      {
        image: icon1,
        title: "Airframe Components",
        description:
          "Structural parts, doors, panels, control surfaces ; all certified and traceable.",
      },
      {
        image: icon2,
        title: "Avionics & Instruments",
        description:
          "Navigation systems, communication equipment, cockpit displays, and electronic modules.",
      },
      {
        image: icon3,
        title: "Engine Parts & Accessories",
        description:
          "Turbine engine components, APUs, nacelles, and associated accessories.",
      },
      {
        image: icon4,
        title: "Landing Gear Systems",
        description:
          "Main and nose landing gear, brakes, wheels, actuators, and hydraulics.",
      },
      {
        image: icon5,
        title: "Cabin & Interior Equipment",
        description:
          "Seats, overhead bins, lighting systems, lavatories, galleys, and safety equipment.",
      },
      {
        image: icon6,
        title: "Consumables & Rotables",
        description:
          "Filters, seals, bearings, and other regularly replaced items with certification.",
      },
    ],
  };

  const sectionRef = useRef<HTMLElement>(null);
  const delayTimer = 0.3;
  return (
    <>
      <section className="imgSection bg-light w-screen py-41" ref={sectionRef}>
        <FadeUp>
          <div className="container mx-auto bg-transparent">
            {/* <img src={section3Img} alt="" /> */}
            <h1
              className="underlineDecor text-4xl font-light text-primary"
              style={{
                "--height": "4px",
                "--backgroundColor": "var(--color-primary)",
                // "--bottom": "-0.25lh",
              }}
            >
              {data.titleText}
            </h1>
            <h2 className="text-4xl font-bold mt-12">{data.subTitleText}</h2>
            <p>{data.description}</p>
          </div>
        </FadeUp>
        <div className="container mx-auto details grid lg:grid-cols-3 gap-10 mt-6">
          {data.featuresData.map((data, index) => (
            <FadeUp delay={delayTimer * (index + 1)} key={data.title}>
              {data.link ? (
                <a href={data.link} className="contents">
                  <FeatureCard data={data} />
                </a>
              ) : (
                <FeatureCard data={data} />
              )}
            </FadeUp>
          ))}
        </div>
      </section>
    </>
  );
};

export default OurFeatures;

const FeatureCard = ({ data }: { data: IndexSection3Content }) => {
  return (
    <div
      className={`featureCard bg-light flex flex-col gap-4 px-12 py-8 hover:shadow-lg transition-all ${data.link && "cursor-pointer"}`}
    >
      <img
        src={typeof data.image === "string" ? data.image : ""}
        alt=""
        height={60}
        width={60}
      />
      <h2 className="text-2xl font-normal">{data.title}</h2>
      <p className="text-sm font-normal">{data.description}</p>
    </div>
  );
};

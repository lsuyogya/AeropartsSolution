import icon1 from "~/../assets/images/SVGs/b2b.svg";
import icon2 from "~/../assets/images/SVGs/b2c.svg";
import icon3 from "~/../assets/images/SVGs/freight-solutions.svg";
import arrowIcon from "~/../assets/images/SVGs/right-arrow.svg";
import FadeUp from "~/components/ui/FadeUp.client";
import type { IndexSection1Item } from "~/routes/_index";

const SolutionSection = ({
  sectionData,
}: {
  sectionData: IndexSection1Item[];
}) => {
  const solutionData = sectionData ?? [
    {
      image: icon1,
      title: "B2B Solutions",
      content:
        "Our B2B division caters to airlines and aviation operators worldwide, delivering certified aircraft parts, rotable components, and technical support.",
      link: "#",
    },
    {
      image: icon2,
      title: "B2C Solutions",
      content:
        "For private jet owners, we offer a premium range of parts, upgrades, and personalized support.",
      link: "#",
    },
    {
      image: icon3,
      title: "Freight Solutions",
      content:
        "Our in-house freight division provides end-to-end logistics for aviation parts and equipment.",
      link: "https://bflexee.ae/",
    },
  ];
  return (
    <section className="imgSection bg-light w-screen py-41">
      <div className="container mx-auto bg-transparent">
        <div className="grid lg:grid-cols-3 gap-10">
          {solutionData.map((data, index) => (
            <FadeUp
              key={data.title}
              delay={index * 0.3}
              className="h-full flex"
            >
              <div className="solutionCard bg-white flex flex-col gap-4 px-12 py-8 text-primary hover:shadow-lg transition-all">
                <img
                  src={typeof data.image === "string" ? data.image : ""}
                  alt=""
                  height={42}
                  width={42}
                />
                <h1 className="text-2xl font-normal">{data.title}</h1>
                <p className="text-sm font-normal">{data.content}</p>
                <a
                  className={`contents ${data.link === null  ? "invisible pointer-events-none" : null} `}
                  href={data.link}
                  target="_blank"
                >
              {data.link }
                  <img
                    src={arrowIcon}
                    width={32}
                    height={32}
                    className="mt-auto pt-8"
                  ></img>
                </a>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;

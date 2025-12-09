import FadeUp from "../ui/FadeUp.client";
import type { IndexSection2Content } from "~/routes/_index";
import defaultImg from "~/../assets/images/aboutus-bg.jpg";
import FadeRight from "../ui/FadeRight.client";
import FadeLeft from "../ui/FadeLeft.client";

type data = {
  titleText1: string;
  titleText2: string;
  listText1: IndexSection2Content[];
  listText2: IndexSection2Content[];
  benefitImg: string;
};

const Service2col1title = ({
  title1,
  title2,
  content1,
  content2,
  img,
}: {
  title1: string;
  title2: string;
  content1: IndexSection2Content[];
  content2: IndexSection2Content[];
  img: string;
}) => {
  const delayTimer = 0.3;
  const data: data = {
    titleText1: title1 ?? "Benefits to B2B Aviation Clients",
    titleText2: title2 ?? "Benefits to B2B Aviation Clients",
    listText1: content1 ?? [
      {
        list: "Certified aircraft parts (structures, avionics, engines, interiors & more)",
      },
      { list: "Rotable components with exchange or outright purchase options" },
      { list: "Consumables for continuous maintenance cycles" },
      { list: "AOG support with expedited shipping" },
      { list: "Long-term procurement contracts for fleet operators" },
    ],
    listText2: content2 ?? [
      {
        list: "Certified aircraft parts (structures, avionics, engines, interiors & more)",
      },
      { list: "Rotable components with exchange or outright purchase options" },
      { list: "Consumables for continuous maintenance cycles" },
      { list: "AOG support with expedited shipping" },
      { list: "Long-term procurement contracts for fleet operators" },
    ],
    benefitImg: img ?? defaultImg,
  };
  console.log("benefit img", data.benefitImg);
  return (
    <section className="vidSection w-screen relative overflow-clip bg-white">
      <div className="container mx-auto z-1 relative text-xl">
        <div className="grid lg:grid-cols-[3fr_3fr_3fr] gap-12">
          <FadeRight>
            <div className="grid-item max-lg:pt-41 max-lg:pb-10 lg:py-41">
              <h1 className="text-4xl font-black text-primary">
                {data.titleText1}
              </h1>

              <ul className="mt-8 lg:my-12 list-disc ml-8">
                {data.listText1.map((text, index) => (
                  <li key={index}>{text.list}</li>
                ))}
              </ul>
            </div>
          </FadeRight>
          <FadeUp>
            <div className="grid-item h-full">
              <img
                src={data.benefitImg}
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
          </FadeUp>
          <FadeLeft>
            <div className="grid-item max-lg:pb-41 max-lg:pt-10 lg:py-41">
              <h1 className="text-4xl font-black text-primary">
                {data.titleText2}
              </h1>
              <ul className=" list-disc ml-8 mt-8 lg:my-12">
                {data.listText2.map((text, index) => (
                  <li key={index}>{text.list}</li>
                ))}
              </ul>
            </div>
          </FadeLeft>
        </div>
      </div>
    </section>
  );
};

export default Service2col1title;

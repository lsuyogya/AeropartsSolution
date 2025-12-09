import FadeLeft from "../ui/FadeLeft.client";
import FadeRight from "../ui/FadeRight.client";
import FadeUp from "../ui/FadeUp.client";
import type { IndexSection2Content } from "~/routes/_index";

type data = {
  titleText1: string;
  titleText2: string;
  listText1: IndexSection2Content[];
  listText2: IndexSection2Content[];
};

const Service2col1title = ({
  title1,
  title2,
  content1,
  content2,
}: {
  title1: string;
  title2: string;
  content1: IndexSection2Content[];
  content2: IndexSection2Content[];
}) => {
  const delayTimer = 0.3;
  const data: data = {
    titleText1: title1 ?? "Quality & Compliance",
    titleText2: title2 ?? "Why Operators Trust Us",
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
  };
  return (
    <section className="vidSection w-screen py-41 relative overflow-clip">
      <div className="vidWrapper absolute inset-0 after:content-[''] after:absolute after:inset-0 after:bg-primary"></div>
      <div className="container mx-auto bg-transparent z-1 relative text-white text-xl">
        <div className="grid lg:grid-cols-2 gap-x-12">
          <div className="grid-item">
            <FadeRight>
              <h1
                className="text-4xl font-black underlineDecor"
                style={{
                  "--height": "6px",
                  "--backgroundColor": "white",
                  "--bottom": "-3rem",
                }}
              >
                {data.titleText1}
              </h1>
              <ul className=" list-disc ml-4 mt-12 lg:my-24">
                {data.listText1.map((text, index) => (
                  <li key={index}>{text.list}</li>
                ))}
              </ul>
            </FadeRight>
          </div>
          <div className="grid-item">
            <FadeLeft>
              <h1
                className="text-4xl font-black underlineDecor"
                style={{
                  "--height": "6px",
                  "--backgroundColor": "white",
                  "--bottom": "-3rem",
                }}
              >
                {data.titleText2}
              </h1>
              <ul className=" list-disc ml-4 mt-12 lg:my-24">
                {data.listText2.map((text, index) => (
                  <li key={index}>{text.list}</li>
                ))}
              </ul>
            </FadeLeft>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Service2col1title;

import FadeUp from "../ui/FadeUp.client";
import type { IndexSection2Content } from "~/routes/_index";

type data = {
  titleText: string;
  description: string;
  listTitle?: string;
  listText: IndexSection2Content[];
};

const Service2col1title = ({
  title,
  desc,
  listTitle,
  content,
  bgWhite,
}: {
  title: string;
  desc: string;
  listTitle?: string;
  content: IndexSection2Content[];
  bgWhite?: boolean;
}) => {
  const delayTimer = 0.3;
  const data: data = {
    titleText: title ?? "Complete Procurement Support for Aviation Businesses",
    description:
      desc ??
      "Our B2B model offers direct partnership access for recurring purchasing, maintenance planning and urgent replacement requirements.",
    listTitle: listTitle,
    listText: content ?? [
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
      <div
        className={`vidWrapper absolute inset-0 after:content-[''] after:absolute after:inset-0 ${bgWhite ? "after:bg-white" : "after:bg-primary"}`}
      ></div>
      <div
        className={`container mx-auto bg-transparent z-1 relative ${bgWhite ? "text-primary" : "text-white"} text-xl`}
      >
        <FadeUp>
          <h1
            className={`text-4xl font-black  underlineDecor ${bgWhite ? "max-w-[20ch]" : ""}`}
            style={{
              "--height": "6px",
              "--backgroundColor": "white",
              "--bottom": "-3rem",
            }}
          >
            {data.titleText}
          </h1>
        </FadeUp>
        <div
          className={`grid ${bgWhite ? "lg:grid-cols-[45ch_auto]" : "lg:grid-cols-[auto_auto]"} gap-x-12`}
        >
          <FadeUp delay={delayTimer}>
            <p
              className={`${bgWhite ? "max-w-[40ch]" : "max-w-[45ch]"} ${bgWhite ? "mt-10" : "mt-20"} ${bgWhite ? "lg:my-10" : "lg:my-24"}`}
            >
              {data.description}
            </p>
          </FadeUp>
          <FadeUp
            delay={delayTimer * 2}
            className={`${bgWhite ? "lg:mt-10" : "mt-12"} ${bgWhite ? "lg:my-10" : "lg:my-24"} `}
          >
            {data.listTitle ? <p className="mb-4">{data.listTitle}</p> : null}
            <ul className=" list-disc ml-4">
              {data.listText.map((text, index) => (
                <li key={index}>{text.list}</li>
              ))}
            </ul>
          </FadeUp>
        </div>
      </div>
    </section>
  );
};

export default Service2col1title;

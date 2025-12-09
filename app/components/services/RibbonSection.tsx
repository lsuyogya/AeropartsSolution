import { useRef } from "react";
import FadeUp from "../ui/FadeUp.client";
import arrowIcon from "~/../assets/images/SVGs/right-arrow.svg";
import plane from "~/../assets/images/sections/b2c-plane-transparent.png";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const RibbonSection = ({
  title,
  desc,
  cta,
  img,
}: {
  title: string;
  desc: string;
  cta: string;
  img: string;
}) => {
  const data = {
    title:
      title ??
      "Build a supply chain partnership with predictable lead time availability.",
    description:
      desc ??
      "Private jet owners, aircraft management firms and VIP operators require a requirement source built on discretion, speed, and technical precision. Aeroparts Solutions delivers tailored aircraft parts, cable upgrades, and personalized technical sourcing designed specifically for individual aircraft ownership.",
    ctaText: cta ?? "PRIVATE SUPPORT REQUEST",
    planeImg: img ?? plane,
  };
  const planeRef = useRef<HTMLImageElement>(null);
  const ribbonRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!planeRef.current || !ribbonRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        scrub: true,
      },
    });

    const diff = planeRef.current.offsetWidth - ribbonRef.current.offsetWidth;
    tl.fromTo(
      planeRef.current,
      { x: planeRef.current.offsetWidth },
      { x: diff / 2, ease: "power3.out", duration: 1 }
    );
  }, [
    {
      scope: containerRef.current,
      dependencies: [containerRef.current, planeRef.current, ribbonRef.current],
    },
  ]);
  return (
    <section className="ribbon-section bg-light">
      <div className="container mx-auto grid max-md:grid-rows-[auto_300px] md:grid-cols-2">
        <div className="grid-item pt-41 pb-12 md:py-41">
          <FadeUp>
            <h1 className="text-4xl text-primary font-black">{data.title}</h1>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="mt-8 mb-6 text-lg text-text-grey">
              {data.description}
            </p>
          </FadeUp>
          <FadeUp delay={0.4}>
            <a
              href="/rfq"
              className="text-black py-3 uppercase flex gap-4 cursor-pointer"
            >
              <img
                src={arrowIcon}
                width={24}
                height={24}
                className="my-auto"
              ></img>
              <span>{data.ctaText} </span>
            </a>
          </FadeUp>
        </div>
        <div className="grid-item relative" ref={containerRef}>
          <img
            src={data.planeImg}
            alt="plane"
            className="w-full h-full object-contain absolute inset-0 margin-auto"
            ref={planeRef}
          />
          <div
            className="w-[min(60%,_350px)] bg-secondary h-full md:ml-auto max-md:mx-auto"
            ref={ribbonRef}
          ></div>
        </div>
      </div>
    </section>
  );
};

export default RibbonSection;

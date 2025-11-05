import {
  lazy,
  useEffect,
  useRef,
  useState,
  type ChangeEvent
} from "react";

// import Slider from "../Slider.client";

import cloudBgImg from "../../../assets/images/Clouds.png";
import planeImg from "../../../assets/images/Plane.png";
import skyBgImg from "../../../assets/images/Rectangle 1.png";
import cloud1Img from "../../../assets/images/cloud1.png";
import cloud2Img from "../../../assets/images/cloud2.png";
import cloud3Img from "../../../assets/images/cloud3.png";
import cloud4Img from "../../../assets/images/cloud4.png";
import cloud5Img from "../../../assets/images/cloud5.png";
// import company1Img from "../../../assets/images/company1.png";
// import company2Img from "../../../assets/images/company2.png";
// import company3Img from "../../../assets/images/company3.png";
// import company4Img from "../../../assets/images/company4.png";
// import company5Img from "../../../assets/images/company5.png";
// import company6Img from "../../../assets/images/company6.png";
// import company7Img from "../../../assets/images/company7.png";
// import company8Img from "../../../assets/images/company8.png";
// import company9Img from "../../../assets/images/company9.png";
// import company10Img from "../../../assets/images/company10.png";
// import company11Img from "../../../assets/images/company11.png";
// import company12Img from "../../../assets/images/company12.png";
// import company13Img from "../../../assets/images/company13.png";
// import company14Img from "../../../assets/images/company14.png";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import company1Img from "~/../assets/images/company1_new.png";
import company2Img from "~/../assets/images/company2_new.png";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "~/components/ui/dialog";
import RFQForm from "../rfq/RFQForm";

type data = {};
const Slider = lazy(() => import("../Slider.client"));

const Banner = ({
  bannerTitle,
  bannerSubtitle,
}: {
  bannerTitle: string;
  bannerSubtitle: string;
}) => {
  const data = {
    titleText: bannerTitle ?? "Trusted parts for global skies.",
    description:
      bannerSubtitle ??
      "Supplying premium aircraft components for private and commercial fleets worldwide.",
    searchBtnText: "Search Now",
    dialogTitle: "Request For Quote",
  };

  const planeRef = useRef<HTMLImageElement>(null);
  const bgCloudsRef = useRef<HTMLImageElement>(null);
  const cloudsRef = useRef<HTMLImageElement>(null);
  const companyLogos = Object.values({
    company1Img,
    company2Img,
    // company3Img,
    // company4Img,
    // company5Img,
    // company6Img,
    // company7Img,
    // company8Img,
    // company9Img,
    // company10Img,
    // company11Img,
    // company12Img,
    // company13Img,
    // company14Img,
  });
  const cloudImges = Object.values({
    cloud1Img,
    cloud2Img,
    cloud3Img,
    cloud4Img,
    cloud5Img,
  });


const [partnerLogos, setPartnerLogos] = useState<string[]>([]);

useEffect(() => {
  let mounted = true;
  async function fetchPartnerLogos() {
    try {
      const res = await fetch(`${import.meta.env.VITE_Backend_Base_Url}/partner-logo/`, {
        method: "GET",
        credentials: "same-origin",
      });
      if (!res.ok) throw new Error(`Failed to fetch partner logos: ${res.status}`);
      const data = await res.json();

      if (mounted && Array.isArray(data.partner_logo)) {
        setPartnerLogos(data.partner_logo.map((item: any) => item.logos).filter(Boolean));
      }
    } catch (err) {
      // console.error("Error fetching partner logos:", err);
    }
  }

  fetchPartnerLogos();
  return () => { mounted = false; };
}, []);

  // const { isLoading, isContentReady, signalReady } = usePageLoader();

  // useGSAP(
  //   () => {
  //     // const startAnimations = () => {
  //     // if (!isContentReady) return;

  //     if (planeRef.current) {
  //       console.log("GSAP planeRef Init");
  //       const tlPlane = gsap.timeline();
  //       tlPlane
  //         .from(planeRef.current, {
  //           xPercent: 50,
  //           scale: 0.3,
  //           ease: "power1.inOut",
  //           duration: 2,
  //         })
  //         .to(planeRef.current, {
  //           xPercent: 0,
  //           scale: 1,
  //           ease: "power1.inOut",
  //           duration: 1,
  //         })
  //         .to(planeRef.current, {
  //           yPercent: -5,
  //           yoyo: true,
  //           repeat: -1,
  //           ease: "power1.inOut",
  //           duration: 3,
  //         });
  //     }
  //     // };
  //     // // Wait for loader to be removed
  //     // window.addEventListener("loaderRemoved", startAnimations);

  //     // return () => {
  //     //   window.removeEventListener("loaderRemoved", startAnimations);
  //     // };
  //   },
  //   {
  //     dependencies: [
  //       planeRef.current,
  //       // isContentReady
  //     ],
  //   }
  // );
// ...existing code...
  // prevent re-creating the plane timeline (avoids restart after first run)
  const tlPlaneRef = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      if (!planeRef.current) return;
      if (tlPlaneRef.current) return; // already initialized, don't recreate

      const tl = gsap.timeline();
      tl
        .from(planeRef.current, {
          xPercent: 50,
          scale: 0.3,
          ease: "power1.inOut",
          duration: 2,
        })
        .to(planeRef.current, {
          xPercent: 0,
          scale: 1,
          ease: "power1.inOut",
          duration: 1,
        })
        .to(planeRef.current, {
          yPercent: -5,
          yoyo: true,
          repeat: -1,
          ease: "power1.inOut",
          duration: 3,
        });

      tlPlaneRef.current = tl;

      return () => {
        tl.kill();
        tlPlaneRef.current = null;
      };
    },
    {
      // run once; don't re-run when refs update to avoid restarting animation
      dependencies: [],
    }
  );
// ...existing code...
  useGSAP(
    () => {
      // const startAnimations = () => {
      // if (!isContentReady) return;

      if (bgCloudsRef.current) {
        // console.log("GSAP bgCloud Init");
        gsap.to("img", {
          xPercent: 100,
          repeat: -1,
          ease: "power1.out",
          duration: 500,
        });
      }
      // };

      // window.addEventListener("loaderRemoved", startAnimations);

      // return () => {
      //   window.removeEventListener("loaderRemoved", startAnimations);
      // };
    },
    {
      scope: bgCloudsRef,
      dependencies: [
        bgCloudsRef.current,
        // isContentReady
      ],
    }
  );

  useGSAP(
    () => {
      // if (!isContentReady) return;
      // Use gsap.utils.toArray to get all the img elements within the scope
      const images = gsap.utils.toArray<HTMLImageElement>(
        "img.cloud",
        cloudsRef.current
      );

      // const startAnimations = () => {
      // Loop through the array and apply a unique duration to each image
      images.forEach((img, index) => {
        gsap.from(img, {
          xPercent: -100,
          ease: "linear",
          duration: 8 * (index + 1),
        }); // initial position
        gsap.to(img, {
          xPercent: 100,
          repeat: -1,
          ease: "linear",
          duration: 8 * (index + 1), // duration = 8 * (order + 1)
        });
      });
      // };

      // window.addEventListener("loaderRemoved", startAnimations);

      // return () => {
      //   window.removeEventListener("loaderRemoved", startAnimations);
      // };
    },
    {
      scope: cloudsRef,
      dependencies: [
        cloudsRef.current,
        // isContentReady
      ],
    }
  );

  const [query, setQuery] = useState("");

  // On component mount, read the initial query from the URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const initialQuery = urlParams.get("pn") || "";
    setQuery(initialQuery);
  }, []);

  // Function to update the URL with the current query
  const updateUrl = (newQuery: string) => {
    const urlParams = new URLSearchParams(window.location.search);
    if (newQuery) {
      urlParams.set("pn", newQuery);
    } else {
      urlParams.delete("pn");
    }
    const newUrl = window.location.pathname + "?" + urlParams.toString();
    window.history.replaceState(null, "", newUrl);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    updateUrl(newQuery);
  };

  // useEffect(() => {
  //   // Signal when your component tree is mounted and rendered
  //   requestAnimationFrame(() => {
  //     signalReady();
  //   });
  // }, [signalReady]);
  return (
    <>
      <section className="w-full min-h-dvh -mt-[var(--headerHeight,_100px)] relative max-w-screen overflow-clip flex flex-col bg-light">
        <div
          className="absolute top-0 left-0 w-full h-full pointer-events-none bg-cover bg-center brightness-75"
          style={{
            maskImage:
              "linear-gradient(to bottom, rgba(0, 0, 0, 1.0) 60%, transparent 100%)",
            backgroundImage: `url(${skyBgImg})`,
          }}
        >
          {/* <img
            loading="lazy"
            src={skyBgImg}
            className="object-cover absolute inset-0 w-full h-full"
            alt=""
          /> */}
          <div className="bgClouds" ref={bgCloudsRef}>
            <img
              loading="lazy"
              src={cloudBgImg}
              className="absolute top-[30%]"
              alt=""
            ></img>
            <img
              loading="lazy"
              src={cloudBgImg}
              className="absolute -left-[100%] top-[30%]"
              alt=""
            ></img>
          </div>
        </div>

        <div className="planeWrapper w-full h-dvh mt-auto flex flex-col">
          <div className="headerPlaceholder h-(--headerHeight)"></div>
          <div className="searchContainer w-screen relative text-center my-auto lg:mb-0 text-white flex flex-col gap-2 container mx-auto ">
            <h1 className="text-5xl md:text-7xl font-bold">{data.titleText}</h1>
            <p className="font-medium ">{data.description}</p>
            <div className="flex items-center bg-white/20 backdrop-blur-md rounded-full p-1 w-full max-w-xl shadow mx-auto mt-4 z-10">
              <input
                type="text"
                placeholder="Enter part number here.."
                className="flex-1 bg-transparent placeholder-gray-300 text-white px-4 py-2 rounded-full focus:outline-none"
                value={query}
                onChange={handleChange}
              />
              <Dialog>
                <DialogTrigger className="rounded-full bg-[#52bcd6] hover:bg-[#3f92a7] max-w-max px-6 py-2 mx-1 text-white font-medium shadow z-1 transition-colors cursor-pointer">
                  {data.searchBtnText}
                </DialogTrigger>
                <DialogContent className="bg-white max-h-[80dvh] overflow-auto px-6 lg:px-12 py-8 lg:py-12">
                  <DialogHeader>
                    <DialogTitle>{data.dialogTitle}</DialogTitle>
                    <div>
                      <div className="mt-4 space-y-4">
                        <RFQForm />
                      </div>
                    </div>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <img
            src={planeImg}
            className="w-[110%] object-scale-down max-lg:my-auto"
            ref={planeRef}
          />
        </div>
        <div
          className="cloudWrapper w-full h-auto min-h-[max(30vh,_10rem)] mt-auto absolute bottom-0 left-0"
          ref={cloudsRef}
        >
          <Slider companyLogos={partnerLogos}></Slider>

          {cloudImges.map((img, index) => (
            <img
              className="cloud pointer-events-none max-h-max opacity-40 lg:opacity-60"
              src={img}
              alt={`Company Logo ${index + 1}`}
              key={index}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default Banner;

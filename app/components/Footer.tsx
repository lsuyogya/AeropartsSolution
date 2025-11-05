import { useEffect, useLayoutEffect, useState } from "react";
import footerLogoImg from "../../assets/images/FooterLogo.png";
import footerPlaneImg from "../../assets/images/sections/plane-transparent.png";
import type { SocialLinks } from "./Socials";
import Socials from "./Socials";

import { Link, useLocation } from "react-router";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type propType = {
  footerRef: React.RefObject<HTMLElement | null>;
  planeHolderRef: React.RefObject<HTMLDivElement | null>;
  mainContainerRef: React.RefObject<HTMLDivElement | null>;
  // pageLoaded: boolean; // ADDED
};

const Footer = ({
  footerRef,
  planeHolderRef,
  mainContainerRef,
  // pageLoaded,
}: propType) => {
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });
  const [socialLinks, setSocialLinks] = useState<SocialLinks | null>(null);
const [contacts, setContacts] = useState<{ email: string; phone: string }[]>([]);

  const [pageHeight, setPageHeight] = useState(0);
 const footerLocations = contacts.length
  ? contacts.flatMap((item) => [
      { label: item.email, href: `mailto:${item.email}` },
      { label: item.phone, href: `tel:${item.phone}` },
    ])
  : [];


  const footerLinks = [
    { link: "Home", url: "/" },
    { link: "About Us", url: "/about" },
    // { link: "Careers", url: "/careers" },
    { link: "Contact Us", url: "/contact" },
    // { link: "Solutions", url: "/solutions" },
    { link: "Terms of Service", url: "/terms_of_service" },
    { link: "Privacy Policy", url: "/privacy_policy" },
    { link: "Cookie Policy", url: "/cookie_policy" },
  ];

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const formData = new FormData();
      formData.append("email", email);

      const response = await fetch(
        `${import.meta.env.VITE_Backend_Base_Url}/mailchimp`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to subscribe");
      }

      const result = await response.json();
      // console.log(result);
      setSubmitStatus({
        type: "success",
        message: "Successfully subscribed!",
      });

      // Reset email after success
      setEmail("");
    } catch (error) {
      // console.error("Submission error:", error);
      setSubmitStatus({
        type: "error",
        message: "Failed to subscribe. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const checkFooterHeight = () => {
      const footerEl = footerRef.current;
      if (footerEl) {
        const screenHeight = window.innerHeight;
        const footerHeight = footerEl.offsetHeight;
        if (footerHeight > screenHeight) {
          footerEl.classList.remove("lg:sticky", "lg:bottom-0");
        } else {
          footerEl.classList.add("lg:sticky", "lg:bottom-0");
        }
      }
    };


    checkFooterHeight();
    window.addEventListener("resize", checkFooterHeight);
    return () => {
      window.removeEventListener("resize", checkFooterHeight);
    };
  }, [footerRef]);

useEffect(() => {
  async function fetchFooterData() {
    try {
      const res = await fetch(`${import.meta.env.VITE_Backend_Base_Url}/footer/`, {
        method: "GET",
        credentials: "same-origin",
      });
      if (!res.ok) throw new Error("Failed to fetch footer data");
      const data = await res.json();
      setSocialLinks(data.footer.social);
      setContacts(data.footer.contact_no);
    } catch (err) {
      // console.error("Error fetching footer data:", err);
    }
  }

  fetchFooterData();
}, []);

  useEffect(() => {
    let lastHeight = document.documentElement.offsetHeight;
    let intervalId: ReturnType<typeof setInterval>;
    let hasDetectedChange = false;

    const checkHeight = () => {
      const currentHeight = document.documentElement.offsetHeight;
      // console.log("lastHeight", lastHeight);
      // console.log("currentHeight", currentHeight);
      if (currentHeight !== lastHeight) {
        // console.log("Document offsetHeight changed:", currentHeight);
        lastHeight = currentHeight;
        setPageHeight(lastHeight); // trigger state change

        if (!hasDetectedChange) {
          hasDetectedChange = true;

          // Clear the old 1-second interval
          clearInterval(intervalId);

          // Start a new 60-second interval
          intervalId = setInterval(checkHeight, 5000);
          // console.log("Interval changed to 5 seconds");
        }
      }
    };

    // Initial check
    checkHeight();

    // Check every 1 second initially
    intervalId = setInterval(checkHeight, 1000);

    // Cleanup interval on unmount
    return () => clearInterval(intervalId);
  }, [setPageHeight]);

  // useEffect(() => {
  //   // guard for SSR
  //   if (typeof window === "undefined") return;
  //   gsap.registerPlugin(ScrollTrigger);
  // }, []);

  useGSAP(
    () => {
      if (
        !planeHolderRef.current ||
        !mainContainerRef.current ||
        !footerRef.current
      )
        return;

      // console.log("GSAP Footer Animation Init");

      const footerHeight = footerRef.current?.getBoundingClientRect().height;
      const mainContainerHeight =
        mainContainerRef.current?.getBoundingClientRect().height;
      const footerTriggerThreshold = Math.max(footerHeight, window.innerHeight);
      // Set initial states
      gsap.set(planeHolderRef.current, {
        scale: 0.1,
      });

      // Create the animation timeline
      const footerTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: mainContainerRef.current,
          start: () => `${mainContainerHeight - footerTriggerThreshold}px`, // When bottom of content hits bottom of viewport
          end: () => `${mainContainerHeight - footerTriggerThreshold}px`, // When bottom of content hits top of viewport
          scrub: 1, // Smooth scroll-linked animation
          markers: false,
          onUpdate: (self) => {
            // Optional: log progress for debugging
            // console.log("Footer animation progress:", self.progress);
          },
          // markers: true,       // Uncomment for debugging
        },
      });

      // Animate the plane holder scale
      footerTimeline.to(planeHolderRef.current, {
        scale: 1,
        duration: 1,
        ease: "linear",
      });
      return () => {
        footerTimeline.scrollTrigger?.kill();
        footerTimeline.kill();
      };
    },
    {
      dependencies: [
        planeHolderRef.current,
        mainContainerRef.current,
        location.pathname,
        // pageLoaded, // ADDED pageLoaded to dependencies
        pageHeight,
      ],
      revertOnUpdate: true,
    }
  );

  useLayoutEffect(() => {
    // guard for SSR
    if (typeof window === "undefined") return;
    if (!(ScrollTrigger as any).version) {
      gsap.registerPlugin(ScrollTrigger);
    }
  }, []);

  return (
    <footer
      className="imgSection bg-[#0a0a0a] w-screen pt-21 pb-4 lg:sticky lg:bottom-0"
      ref={footerRef}
    >
      <div className="container mx-auto bg-transparent flex flex-col place-content-center">
        <div className="footerTopSection text-white text-center">
          <h1 className="text-5xl lg:text-7xl font-black">Stay in the Loop</h1>
          <p className="text-lg font-light">
            Join our newsletter to keep up with Aeroparts' latest news and
            insights.
          </p>
          <form
            onSubmit={handleNewsletterSubmit}
            className="inputHolder mt-6 flex gap-4 justify-center"
          >
            <input
              type="email"
              placeholder="Email Address here"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isSubmitting}
              className="text-black bg-white px-4 py-2 rounded-full lg:w-64 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="uppercase bg-[#1a2e45ce] px-4 py-2 rounded-full lg:w-32 cursor-pointer hover:bg-[#1a2e45] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "..." : "Subscribe"}
            </button>
          </form>
          {submitStatus.type && (
            <div
              className={`mt-4 p-3 rounded text-sm ${
                submitStatus.type === "success"
                  ? "text-green-800"
                  : "text-red-800"
              }`}
            >
              {submitStatus.message}
            </div>
          )}
        </div>

        <div className="planeHolder" ref={planeHolderRef}>
          <img src={footerPlaneImg} alt="" />
        </div>
        <img src={footerLogoImg} alt="" className="mx-auto max-h-[7rem]" />
        {/* <img src={footerBottomImg} alt="" /> */}
      </div>

      <hr className="text-white/10 text-lg my-6" />

      <div className="footerBottomSection text-white mt-10 container mx-auto">
        <div className="footerLinks flex gap-x-24 gap-y-4 flex-wrap">
          <div className="footerLinkSection">
            <h2 className="text-lg text-secondary">AOG Desk:</h2>
            <ul className="grid lg:grid-cols-2 gap-x-8 gap-y-1 lg:gap-y-3 mt-4 text-xs">
              {footerLocations.map((location, index) => (
                <li
                  key={location.label}
                  className={`${index === 1 ? "max-lg:order-1" : null} hover:underline`}
                >
                  <a href={location.href} className="contents">
                    {location.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="footerLinkSection">
            <h2 className="text-lg text-secondary">Quick Links</h2>
            <ul className="grid grid-cols-2 gap-x-8 gap-y-3 mt-4 text-xs">
              {footerLinks.map((link) => (
                <li key={link.link}>
                  <Link to={link.url} className="group">
                    {" "}
                    - <span className="group-hover:underline">{link.link}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="footerLinkSection">
            <h2 className="text-lg text-secondary mb-4">Follow Us</h2>
            {/* <Socials /> */}
            {socialLinks && (
  <Socials
    
    links={socialLinks}
  />
)}

          </div>
        </div>

        <div className="copyrights flex justify-between text-xs font-light mt-4">
          <p>
            &copy; {new Date().getFullYear()} Aeroparts. All rights reserved.
          </p>
          <p>
            Design with <span className=" text-red-600"> &#x2764; </span> by
            Fifth Design
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

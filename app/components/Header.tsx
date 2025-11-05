import { useEffect, useRef, useState } from "react";
// import { Divide as Hamburger } from "hamburger-react";
import { Link, useNavigate } from "react-router";
import Menu from "~/components/Menu";
import logo from "../../assets/images/SVGs/Logo-aeroparts.svg";

const Header = () => {
  // const [isOpen, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const headerSizeCalculator = () => {
      if (headerRef.current) {
        document.body.style.setProperty(
          "--headerHeight",
          `${headerRef.current.offsetHeight}px`
        );
      }
    };
    headerSizeCalculator();
    window.addEventListener("resize", headerSizeCalculator);
    // Scroll listener
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", headerSizeCalculator);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleQuoteClick = () => {
    navigate("/rfq");
  };
// ...existing code...
  const [headerLogo, setHeaderLogo] = useState<string>(logo);

  useEffect(() => {
    if (typeof window === "undefined") return;

    async function fetchHeaderLogo() {
      try {
        const res = await fetch(`${import.meta.env.VITE_Backend_Base_Url}/footer/`, {
          method: "GET",
          credentials: "same-origin",
        });
        if (!res.ok) throw new Error("Failed to fetch header");
        const data = await res.json();
        // Expecting response shape: { header: { logo: "https://..." } }
        if (data?.header?.logo) setHeaderLogo(data.header.logo);
      } catch (err) {
        // console.error("Error fetching header logo:", err);
      }
    }
    fetchHeaderLogo();
  }, []);

  return (
    <header
      className={` z-100 sticky top-0  ${scrolled ? "bg-[rgb(24,50,70)]" : "bg-transparent"} transition-colors`}
      ref={headerRef}
    >
      {/* <button>
        <Hamburger toggled={isOpen} toggle={setOpen} color="white" />
      </button> */}
      <div className="container mx-auto flex items-center justify-between p-4">
        <Menu></Menu>
        <Link to="/" prefetch="intent">
          <img loading="lazy" src={headerLogo} height={67} width={203} />
        </Link>
        <Link to={"/rfq"} prefetch="intent" className="contents">
          <button
            className="cursor-pointer bg-white hover:bg-secondary hover:text-white rounded-full px-4 py-2 capitalize max-md:hidden transition-colors"
            onClick={handleQuoteClick}
          >
            Request a Quote
          </button>
        </Link>
        <div className="invisible md:hidden"></div>
      </div>
    </header>
  );
};

export default Header;

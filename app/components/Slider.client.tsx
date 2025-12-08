import { Splide, SplideSlide } from "@splidejs/react-splide";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import "@splidejs/react-splide/css";

const Slider = ({ companyLogos }: { companyLogos: string[] }) => {
  if (companyLogos.length === 0) {
    return null;
  }
  
  return (
    <Splide
      aria-label="My Favorite Images"
      options={{
        pagination: false,
        arrows: false,
        type: "loop",
        autoWidth: true,
        gap: "2rem",
        autoScroll: {
          speed: 0.5,
          pauseOnHover: true,
          pauseOnFocus: false,
        },
      }}
      extensions={{ AutoScroll }}
    >
      {Array.from({ length: 7 }).map((_, outerIndex) =>
        companyLogos.map((logo, innerIndex) => (
          <SplideSlide
            key={`${logo}-${outerIndex}-${innerIndex}`}
            className="logoSlide"
          >
            <img
              src={logo}
              alt={`Company Logo ${innerIndex + 1}`}
              className="h-8 w-auto not-hover:grayscale transition-all opacity-75"
            />
          </SplideSlide>
        ))
      )}
    </Splide>
  );
};

export default Slider;

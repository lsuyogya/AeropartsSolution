import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import type { SocialLinks } from "./Socials";
import Socials from "./Socials";

type MenuLink = {
  label: string;
  href: string;
};

type MenuAccordion = {
  label: string;
  children: MenuLink[];
};

type MenuItem = MenuLink | MenuAccordion;

const Menu = () => {
  const [open, setOpen] = useState(false);
  const [socialLinks, setSocialLinks] = useState<SocialLinks | null>(null);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  const toggleAccordion = (key: string) => {
    setOpenAccordion((prev) => (prev === key ? null : key));
  };

  const menuItems: MenuItem[] = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    {
      label: "Services",
      children: [
        { label: "B2B", href: "/services/b2b" },
        { label: "B2C", href: "/services/b2c" },
      ],
    },
    {
      label: "We Offer",
      children: [
        { label: "Airframe Components", href: "/features/airframe-components" },
        {
          label: "Avionics & Instruments",
          href: "/features/avionics-instruments",
        },
        {
          label: "Engine Parts & Accessories",
          href: "/features/engine-parts-accessories",
        },
        {
          label: "Landing Gear Systems",
          href: "/features/landing-gear-systems",
        },
        {
          label: "Cabin Interior Equipment",
          href: "/features/cabin-interior-equipment",
        },
        {
          label: "Consumables & Rotables",
          href: "/features/consumables-rotables",
        },
      ],
    },
    { label: "RFQ", href: "/rfq" },
    { label: "Contact Us", href: "/contact" },
  ];

  useEffect(() => {
    async function fetchSocials() {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_Backend_Base_Url}/footer/`,
          {
            method: "GET",
            credentials: "same-origin",
          }
        );
        if (!res.ok) throw new Error("Failed to fetch social links");
        const data = await res.json();
        setSocialLinks(data.footer.social);
      } catch (err) {
        // console.error("Error fetching social links:", err);
      }
    }
    fetchSocials();
  }, []);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button className="relative w-10 h-10 flex flex-col items-center justify-center gap-1.5">
          <span
            className={`w-6 h-0.5 bg-white transition-all duration-300 ${open ? "rotate-45 translate-y-2" : ""}`}
          />
          <span
            className={`w-6 h-0.5 bg-white transition-opacity duration-300 ${open ? "opacity-0" : ""}`}
          />
          <span
            className={`w-6 h-0.5 bg-white transition-all duration-300 ${open ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 overlay-animate" />
        <Dialog.Content className="fixed left-0 top-0 h-full w-[min(100%,25rem)] bg-white shadow-2xl z-100 flex flex-col transition-transform duration-300 focus:outline-none content-animate">
          <div className="flex items-center justify-between p-6 border-b border-slate-200">
            <Dialog.Title className="text-xl font-semibold text-slate-900">
              Menu
            </Dialog.Title>
            <Dialog.Close asChild>
              <button className="rounded-full p-2 hover:bg-slate-100 transition-colors">
                <svg
                  className="w-5 h-5 text-slate-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </Dialog.Close>
          </div>

          <nav className="grow overflow-y-auto p-4 flex flex-col">
            {/* <div className="space-y-2 grow">
              {menuItems.map((item, idx) => (
                <Link
                  key={idx}
                  to={item.href}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                  onClick={() => setOpen(false)}
                  prefetch="intent"
                >
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
            </div> */}

            <div className="space-y-2 grow">
              {menuItems.map((item, idx) => {
                const isAccordion = "children" in item;
                const isOpen = openAccordion === item.label;

                if (!isAccordion) {
                  return (
                    <Link
                      key={idx}
                      to={item.href}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                      onClick={() => setOpen(false)}
                      prefetch="intent"
                    >
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  );
                }

                return (
                  <div key={idx} className="rounded-lg overflow-hidden">
                    {/* Accordion trigger */}
                    <button
                      type="button"
                      onClick={() => toggleAccordion(item.label)}
                      className="w-full flex items-center justify-between px-4 py-3 text-slate-700 hover:bg-slate-100 transition-colors"
                    >
                      <span className="font-medium">{item.label}</span>
                      <svg
                        className={`w-4 h-4 transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>

                    {/* Accordion content */}
                    <div
                      className={`
            grid transition-[grid-template-rows] duration-300 ease-in-out
            ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}
          `}
                    >
                      <div className="overflow-hidden">
                        <div className="pl-6 pb-2 space-y-1">
                          {item.children.map((child, cIdx) => (
                            <Link
                              key={cIdx}
                              to={child.href}
                              className="block px-4 py-2 rounded-md text-sm text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                              onClick={() => setOpen(false)}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 pt-4 border-t border-slate-200">
              <Link
                to="/privacy_policy"
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                onClick={() => setOpen(false)}
              >
                <span className="font-medium">Privacy Policy</span>
              </Link>

              <div className="px-4 py-3">
                {socialLinks && (
                  <Socials
                    liClass="bg-black!"
                    contextValue={{ color: "white", size: "1em" }}
                    links={socialLinks} // pass fetched links as props
                  />
                )}
              </div>
            </div>
          </nav>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Menu;

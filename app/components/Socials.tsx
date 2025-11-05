import React from "react";
import { IconContext } from "react-icons";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTiktok,
  FaXTwitter,
} from "react-icons/fa6";

export interface SocialLinks {
  facebook?: string;
  twitter?: string;
  instagram?: string;
  linkedin?: string;
  tiktok?: string;
}

type SocialsProps = {
  liClass?: string;
  contextValue?: {
    color?: string;
    size?: string;
    className?: string;
    style?: React.CSSProperties;
    attr?: any;
  };
  links?: SocialLinks; // optional, if not provided fallback will be used
};

const Socials: React.FC<SocialsProps> = ({ liClass, contextValue, links }) => {
  const defaultLinks: SocialLinks = {
    facebook: "#",
    twitter: "#",
    instagram: "#",
    linkedin: "#",
    tiktok: "#",
  };

  const socialsData: { icon: React.ReactNode; url: string }[] = [
    { icon: <FaFacebookF />, url: links?.facebook || defaultLinks.facebook! },
    { icon: <FaXTwitter />, url: links?.twitter || defaultLinks.twitter! },
    { icon: <FaTiktok />, url: links?.tiktok || defaultLinks.tiktok! },
    { icon: <FaLinkedinIn />, url: links?.linkedin || defaultLinks.linkedin! },
    { icon: <FaInstagram />, url: links?.instagram || defaultLinks.instagram! },
  ];

  return (
    <ul className="flex flex-wrap gap-x-4 gap-y-1 text-xs">
      <IconContext.Provider value={contextValue ?? { color: "black", size: "1em" }}>
        {socialsData.map((social, index) => (
          <li
            key={index}
            className={`p-1 rounded-full bg-white cursor-pointer hover:scale-[1.1] transition-all ${liClass}`}
          >
            <a href={social.url} className="contents" target="_blank" rel="noopener noreferrer">
              {social.icon}
            </a>
          </li>
        ))}
      </IconContext.Provider>
    </ul>
  );
};

export default Socials;

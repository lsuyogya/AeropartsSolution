import { lazy, Suspense } from "react";
import { useLoaderData } from "react-router";
import Loader from "~/components/ui/Loader";
import type { Route } from "./+types/_index";
import "./_index/style.css";
// import Banner from "~/components/index/Banner";
// import SolutionSection from "~/components/index/SolutionSection";
// import WhyUs from "~/components/index/WhyUs";
// import OurFeatures from "~/components/index/OurFeatures";
// import OurLocation from "~/components/index/OurLocation";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Home" },
    { name: "description", content: "Welcome to Aerospace!" },
  ];
}

const Banner = lazy(() => import("~/components/index/Banner"));
const SolutionSection = lazy(
  () => import("~/components/index/SolutionSection")
);
const WhyUs = lazy(() => import("~/components/index/WhyUs"));
const OurFeatures = lazy(() => import("~/components/index/OurFeatures"));
const OurLocation = lazy(() => import("~/components/index/OurLocation"));
export default function Index() {
  const data = useLoaderData<IndexLoaderResponse>();
  return (
    <>
      <Suspense fallback={<Loader />}>
        <Banner
          bannerTitle={data.banner_title}
          bannerSubtitle={data.banner_subtitle}
        ></Banner>
        <SolutionSection sectionData={data.section_1_content} />
        <WhyUs
          title={data.section_2_title}
          desc={data.section_2_description}
          content={data.section_2_content}
          btnLink={data.section_2_button_link}
          btnTxt={data.section_2_button_text}
        />
        <OurFeatures
          title={data.section_3_title}
          desc={data.section_3_description}
          content={data.section_3_content}
        />
        <OurLocation />
      </Suspense>
    </>
  );
}

// Client-side loader for this route.
// This uses the React Router data API. Because this app is configured with `ssr: false`
// in `react-router.config.ts`, the loader will run on the client.
// Type describing the loader response for this route
export type IndexSection1Item = {
  image: boolean | string;
  title: string;
  content: string;
  link: string;
};

export type IndexSection2Content = { list: string };

export type IndexSection3Content = {
  image: boolean | string;
  title: string;
  description: string;
};

export interface IndexLoaderResponse {
  banner_title: string;
  banner_subtitle: string;
  section_1_content: IndexSection1Item[];
  section_2_title: string;
  section_2_description: string;
  section_2_button_text: string;
  section_2_button_link: string;
  section_2_content: IndexSection2Content[];
  section_3_title: string;
  section_3_description: string;
  section_3_content: IndexSection3Content[];
}

// Typed Client-side loader for this route.
export async function clientLoader(): Promise<IndexLoaderResponse> {
  const endpoint = `${import.meta.env.VITE_Backend_Base_Url}/homepage`;

  try {
    const res = await fetch(endpoint, {
      method: "GET",
      credentials: "same-origin",
    });

    if (!res.ok) {
      // Let React Router surface the HTTP error status
      throw new Response("Failed to fetch index data", { status: res.status });
    }

    const data = (await res.json()) as IndexLoaderResponse;

    // Basic runtime validation: ensure required top-level keys exist.
    if (!data || typeof data.banner_title !== "string") {
      throw new Response("Invalid index payload", { status: 502 });
    }
    // console.log("Index data fetched:", data);
    return data;
  } catch (err) {
    // Convert network or other errors into a Response so the router can handle them.
    if (err instanceof Response) throw err;
    throw new Response("Network error while fetching index data", {
      status: 500,
    });
  }
}

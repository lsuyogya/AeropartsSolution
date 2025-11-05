import parse from "html-react-parser";
import DOMPurify from "isomorphic-dompurify";
import { useLoaderData } from "react-router";
import BannerImg from "~/../assets/images/policies-bg.jpg";
import Banner from "~/components/Banner";
import type { Route } from "./+types/Privacy_policy";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Privacy Policy" },
    { name: "description", content: "Privacy Policy" },
  ];
}
export interface PrivacyLoaderResponse {
  // Define any data you expect from the loader here
  banner_image : string | null;
  banner_title : string ;
  banner_description : string ;
  content: string ;
}
// Client-side loader for this route.
export async function clientLoader(): Promise<PrivacyLoaderResponse> {
  const endpoint = `${import.meta.env.VITE_Backend_Base_Url}/policies/privacy-policy/`;
  try {
    const res = await fetch(endpoint, {
      method: "GET",
      credentials: "same-origin",
    });
    if (!res.ok) {
          throw new Response("Failed to fetch index data", { status: res.status });
    }
    const PrivacyData = (await res.json()) as PrivacyLoaderResponse;
    if (!PrivacyData || typeof PrivacyData.banner_title !== "string") {
      throw new Response("Invalid index payload", { status: 502 });
    }
    // console.log("About Loader Data:", PrivacyData);
    return PrivacyData;
  }
  catch (err) {
    if (err instanceof Response) throw err;
    throw new Response("Network error while fetching index data", {
      status: 500,
    });
  }
  }
const Privacy_policy = () => {
  const data = {
    bannerTitle: "Privacy Policy",
    bannerImg: BannerImg,
    description: ` 
  <h2>1. Introduction</h2>
  <p>Welcome to “Aeroparts” (we, us, our). We respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website <a href="https://aeroparts-solution-iota.vercel.app/" target="_blank">https://aeroparts-solution-iota.vercel.app/</a> (the “Site”). By using the Site, you agree to the collection and use of information in accordance with this policy.</p>

  <h2>2. Information We Collect</h2>
  <ul>
    <li><strong>Personal Data:</strong> Information such as your name, email address, telephone number, company name, job title, billing/shipping address, when you fill out contact forms or request a quote.</li>
    <li><strong>Usage Data:</strong> Information about how you access and use the Site — e.g., IP address, browser type, pages visited, time spent, referrer URL, operating system, and device type.</li>
    <li><strong>Tracking & Cookies Data:</strong> We use cookies and similar tracking technologies (see our Cookie Policy below) to track activity on the Site and hold certain information.</li>
  </ul>

  <h2>3. How We Use Your Information</h2>
  <ul>
    <li>Provide, operate and maintain our Site</li>
    <li>Improve, personalize and expand our Site</li>
    <li>Process your requests (e.g., quotes, contact forms)</li>
    <li>Send you newsletters or promotional materials (only if you opt-in)</li>
    <li>Monitor usage and detect, prevent or address technical issues</li>
    <li>Comply with legal obligations</li>
  </ul>

  <h2>4. Legal Basis for Processing (GDPR)</h2>
  <ul>
    <li>Your consent</li>
    <li>The performance of a contract</li>
    <li>Compliance with a legal obligation</li>
    <li>Our legitimate interests (provided your rights do not override those interests)</li>
  </ul>

  <h2>5. Sharing Your Information</h2>
  <p>We do not sell your personal data. We may share your information with:</p>
  <ul>
    <li>Service providers (e.g., hosting, email delivery, analytics)</li>
    <li>Affiliates or business partners when needed to provide services</li>
    <li>Authorities, if required by law</li>
    <li>In case of a business transfer (e.g., merger, acquisition)</li>
  </ul>

  <h2>6. Data Retention</h2>
  <p>We will retain your personal data only for as long as necessary for the purposes outlined in this Privacy Policy, unless a longer retention period is required by law.</p>

  <h2>7. Your Rights</h2>
  <p>You may have the right to:</p>
  <ul>
    <li>Access the personal data we hold about you</li>
    <li>Request correction or deletion of your data</li>
    <li>Object to or restrict processing</li>
    <li>Withdraw consent at any time</li>
    <li>Lodge a complaint with a data protection authority</li>
  </ul>

  <h2>8. International Transfers</h2>
  <p>Your data may be transferred to — and stored on — servers located outside your jurisdiction. We ensure appropriate safeguards are in place to protect your data.</p>

  <h2>9. Security</h2>
  <p>We take reasonable administrative, technical, and physical measures to protect your personal data. However, no method of transmission over the internet is completely secure.</p>

  <h2>10. Children’s Privacy</h2>
  <p>Our Site is not intended for children under 16. We do not knowingly collect personal data from children under this age.</p>

  <h2>11. Changes to This Privacy Policy</h2>
  <p>We may update this policy from time to time. Updates will be posted here with a new “Last Updated” date. Please review periodically.</p>

  <h2>12. Contact Us</h2>
  <p>If you have questions about this Privacy Policy, contact us at:</p>
  <p>
    info@aeropartssolution.com <br>
    Aeroparts Solutions, Dubai Airport Freezone (DAFZA), Dubai, UAE <br>
    +971 50 219 3737 
  </p>`,
  };
  const PrivacyData = useLoaderData<PrivacyLoaderResponse>();
  return (
    <>
      {/* <Banner bgImgUrl={data.bannerImg} title={data.bannerTitle} /> */}
       <Banner
        bgImgUrl={PrivacyData.banner_image ? PrivacyData.banner_image as string : BannerImg}
        title={PrivacyData.banner_title}
        desc={PrivacyData.banner_description}
      />
      <section className="bg-white">
        <div className="container mx-auto py-20 lg:py-40">
          <div className="max-w-[86ch] space-y-6 text-lg text-[#494949] policyContent">
            {parse(DOMPurify.sanitize(PrivacyData.content))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Privacy_policy;

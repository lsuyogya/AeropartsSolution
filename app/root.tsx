import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Suspense, useEffect, useRef } from "react";
import Loader from "~/components/ui/Loader";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CSSPlugin from "gsap/CSSPlugin";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
  {
    rel: "icon",
    href: "/favicon.ico",
    sizes: "any",
    type: "image/x-icon",
  },
  {
    rel: "apple-touch-icon",
    type: "image/png",
    href: "/apple-touch-icon.png",
  },
  {
    rel: "manifest",
    href: "/site.webmanifest",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  // const Header = lazy(() => import("~/components/Header"));
  // const Footer = lazy(() => import("~/components/Footer"));
  const cssPlugin = [CSSPlugin];
  const mainRef = useRef<HTMLDivElement | null>(null);
  const planeHolderRef = useRef<HTMLDivElement | null>(null);
  const footerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // guard for SSR
    if (typeof window === "undefined" || !mainRef.current) return;
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Suspense fallback={<Loader />}>
          <Header />
          <div className="mainContent curtainWrapper" ref={mainRef}>
            {children}
            <Footer
              mainContainerRef={mainRef}
              footerRef={footerRef}
              planeHolderRef={planeHolderRef}
            />
          </div>
          <ScrollRestoration />
          <Scripts />
        </Suspense>
        {/* {isLoading && (
          <div className="loaderContainer fixed inset-0 z-[500] bg-black grid place-content-center">
            <div className="loader z-20"></div>
          </div>
        )} */}
      </body>
    </html>
  );
}

export function HydrateFallback() {
  return <Loader />;
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="h-screen 2-full bg-black relative z-1 -mt-(--headerHeight,_100px) pt-(--headerHeight,_100px) flex">
      <div className="pt-16 p-4 container m-auto text-white text-center my-auto text-4xl">
        <h1 className="text-9xl mx-auto mb-10">{message}</h1>
        <p>{details}</p>
        <a
          href="/"
          className="text-2xl underline mt-20 block tracking-wider hover:color-secondary transition"
        >
          ← Return Home
        </a>
        {stack && (
          <pre className="w-full p-4 overflow-x-auto">
            <code>{stack}</code>
          </pre>
        )}
      </div>
    </main>
  );
}

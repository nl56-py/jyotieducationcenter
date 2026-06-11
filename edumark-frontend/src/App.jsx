import { useEffect, useState } from "react";
import { normalizePath } from "./utils/router.js";
import { countries } from "./data/countries.js";
import { testCourses } from "./data/testCourses.js";
import { services } from "./data/services.js";
import { blogs } from "./data/blogs.js";
import { Header } from "./components/Header.jsx";
import { Footer } from "./components/Footer.jsx";
import { SearchOverlay } from "./components/SearchOverlay.jsx";
import { HomePage } from "./pages/HomePage.jsx";
import { AboutPage } from "./pages/AboutPage.jsx";
import { ServicesPage } from "./pages/ServicesPage.jsx";
import { ServiceDetailPage } from "./pages/ServiceDetailPage.jsx";
import { DestinationsPage } from "./pages/DestinationsPage.jsx";
import { CountryDetailPage } from "./pages/CountryDetailPage.jsx";
import { TestPreparationPage } from "./pages/TestPreparationPage.jsx";
import { TestCoursePage } from "./pages/TestCoursePage.jsx";
import { EntrancePage } from "./pages/EntrancePage.jsx";
import { BlogsPage } from "./pages/BlogsPage.jsx";
import { BlogDetailPage } from "./pages/BlogDetailPage.jsx";
import { VideosPage } from "./pages/VideosPage.jsx";
import { ContactPage } from "./pages/ContactPage.jsx";
import { BookingPage } from "./pages/BookingPage.jsx";
import { AdminPage } from "./pages/AdminPage.jsx";
import { NotFoundPage } from "./pages/NotFoundPage.jsx";

function renderPage(path, navigate) {
  const countryMatch = path.match(/^\/destinations\/([^/]+)$/);
  if (countryMatch) {
    const country = countries.find((item) => item.slug === countryMatch[1]);
    return country ? <CountryDetailPage country={country} navigate={navigate} /> : <NotFoundPage navigate={navigate} />;
  }

  const testMatch = path.match(/^\/test-preparation\/([^/]+)$/);
  if (testMatch) {
    const course = testCourses.find((item) => item.slug === testMatch[1]);
    return course ? <TestCoursePage course={course} navigate={navigate} /> : <NotFoundPage navigate={navigate} />;
  }

  const serviceMatch = path.match(/^\/services\/([^/]+)$/);
  if (serviceMatch) {
    const service = services.find((item) => item.slug === serviceMatch[1]);
    return service ? <ServiceDetailPage service={service} navigate={navigate} /> : <NotFoundPage navigate={navigate} />;
  }

  const blogMatch = path.match(/^\/blogs\/([^/]+)$/);
  if (blogMatch) {
    const blog = blogs.find((item) => item.slug === blogMatch[1]);
    return blog ? <BlogDetailPage blog={blog} navigate={navigate} /> : <NotFoundPage navigate={navigate} />;
  }

  const adminMatch = path.match(/^\/admin\/([^/]+)$/);
  if (adminMatch) {
    return <AdminPage initialView={adminMatch[1]} navigate={navigate} />;
  }

  switch (path) {
    case "/":
      return <HomePage navigate={navigate} />;
    case "/about":
      return <AboutPage navigate={navigate} />;
    case "/services":
      return <ServicesPage navigate={navigate} />;
    case "/destinations":
      return <DestinationsPage navigate={navigate} />;
    case "/test-preparation":
      return <TestPreparationPage navigate={navigate} />;
    case "/entrance-preparations":
      return <EntrancePage navigate={navigate} />;
    case "/blogs":
      return <BlogsPage navigate={navigate} />;
    case "/videos":
    case "/videos-gallery":
      return <VideosPage />;
    case "/contact":
      return <ContactPage navigate={navigate} />;
    case "/book-free-consultation":
      return <BookingPage />;
    case "/admin":
      return <AdminPage navigate={navigate} />;
    default:
      return <NotFoundPage navigate={navigate} />;
  }
}

export function App() {
  const [path, setPath] = useState(normalizePath(window.location.pathname));
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onPopState = () => setPath(normalizePath(window.location.pathname));
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const navigate = (nextPath) => {
    const normalized = normalizePath(nextPath);
    window.history.pushState({}, "", normalized);
    setPath(normalized);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Header path={path} navigate={navigate} onSearch={() => setSearchOpen(true)} />
      {renderPage(path, navigate)}
      <Footer navigate={navigate} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} navigate={navigate} />
    </>
  );
}

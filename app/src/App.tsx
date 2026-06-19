import { Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import Projects from "@/pages/Projects";
import ProjectDetail from "@/pages/ProjectDetail";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import AdminLogin from "@/pages/AdminLogin";
import AdminDashboard from "@/pages/AdminDashboard";
import AdminMessages from "@/pages/AdminMessages";
import AdminTestimonials from "@/pages/AdminTestimonials";
import PortfolioForm from "@/pages/PortfolioForm";

function Layout() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");

  if (isAdminPage) {
    return (
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/messages" element={<AdminMessages />} />
        <Route path="/admin/testimonials" element={<AdminTestimonials />} />
        <Route path="/admin/portfolio/new" element={<PortfolioForm />} />
        <Route path="/admin/portfolio/:id/edit" element={<PortfolioForm />} />
      </Routes>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Toaster position="top-right" richColors />
      <Navbar />
      <main className="flex-1 animate-fade-from-abyss">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return <Layout />;
}

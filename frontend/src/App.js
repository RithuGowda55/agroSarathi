import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Landingpage from "./components/Landingpage";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Govscheme from "./components/govscheme";
import ProductionCostCalculator from "./components/costpredictor";
import DiseaseDetector from "./components/plantdisease";
import CropInputForm from "./components/CropInputForm";
import Irrigation from "./components/Irrigation";
import PricePrediction from "./components/Price";
import Dashboard from "./components/Dashboard";
import Cropsuggest from "./components/Cropsuggest";
import Login from "./components/Login";
import Register from "./components/Register";
import { AuthProvider } from './AuthContext';
import Purchases from "./components/Purchases";
import { Cancel, Success, Store } from "./components/CartContext";
import CourseHome from "./components/CourseHome";

function App() {
  return (
    <AuthProvider>
      <Router>
        <MainContent />
      </Router>
    </AuthProvider>
  );
}

function MainContent() {
  const location = useLocation();
  
  // Define routes that don't require header and footer
  const noHeaderFooterRoutes = ["/"];

  // Check if the current route is in the noHeaderFooterRoutes array
  const showHeaderFooter = !noHeaderFooterRoutes.includes(location.pathname);

  return (
    <>
      {showHeaderFooter && <Header />}
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/courses" element={<CourseHome />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/govscheme" element={<Govscheme />} />
        <Route path="/costpredict" element={<ProductionCostCalculator />} />
        <Route path="/pdd" element={<DiseaseDetector />} />
        <Route path="/CropInputForm" element={<CropInputForm />} />
        <Route path="/irrigation" element={<Irrigation />} />
        <Route path="/price" element={<PricePrediction />} />
        <Route path="/explore" element={<Dashboard />} />
        <Route path="/crop" element={<Cropsuggest />} />
        <Route path="/purchases" element={<Purchases />} />
        <Route path="/store" element={<Store />} />
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />
      </Routes>
      {showHeaderFooter && <Footer />}
    </>
  );
}

export default App;

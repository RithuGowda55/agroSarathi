import "./App.css";
import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./components/About";
import CourseHome from "./components/CourseHome";
import Pricing from "./components/Pricing";
import Blog from "./components/Blog";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Govscheme from "./components/govscheme";
import ProductionCostCalculator from "./components/costpredictor"
import DiseaseDetector from "./components/plantdisease";
import CropInputForm from "./components/CropInputForm";
import Irrigation from "./components/Irrigation";
import PricePrediction from "./components/Price";
import Dashboard from "./components/Dashboard";
// import ResponsePage from "./components/plantdiseasedetection/ResponsePage";
// import Blogpost from "./components/blogpost/Blog";
import Cropsuggest from "./components/Cropsuggest";
 

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/courses" element={<CourseHome />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/journal" element={<Blog />} />
          <Route path="/govscheme" element={<Govscheme />} />
          <Route path="/costpredict" element={<ProductionCostCalculator />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/pdd" element={<DiseaseDetector />} />
          <Route path="/CropInputForm" element={<CropInputForm />} />
          <Route path="/irrigation" element={<Irrigation />} />
          <Route path="/price" element={<PricePrediction />} />
          <Route path="/explore" element={<Dashboard />} />
          {/* <Route path="/response" element={<ResponsePage />} /> */}
          <Route path="/crop" element={<Cropsuggest />} />
          {/* <Route path="/blogpost" element={<Blogpost />} /> */}
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;

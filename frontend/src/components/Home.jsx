import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Hero from "./Hero";
import Testimonal from "./Testimonal";
import "../css/about.css";
import Heading from "./Heading";
import { homeAbout } from "../dummydata";

const Home = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  // Define route mapping for each item
  const routeMapping = {
    1: "/crop",
    2: "/pdd",
    3: "/Price",
    4: "/govscheme",
    5: "/irrigation",
    6: "/CropInputForm",
  };

  return (
    <>
      <Hero />
      <section className="aboutHome">
        <div className="container flexSB">
          <div className="left row">
            <img src="./images/b7.jpg" alt="" />
          </div>
          <div className="right row">
            <Heading subtitle="Enhance Your Farming Practices" title="AI-Powered Features for Smarter Agriculture" />
            <div className="items">
              {homeAbout.map((val) => {
                return (
                  <div
                    key={val.id}
                    className="item flexSB"
                    onClick={() => navigate(routeMapping[val.id])} // Redirect on click
                    style={{ cursor: "pointer" }} // Indicate clickable item
                  >
                    <div className="img">
                      <img src={val.cover} alt="" />
                    </div>
                    <div className="text">
                      <h2>{val.title}</h2>
                      <p>{val.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      <Testimonal />
    </>
  );
};

export default Home;

// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../Header/Header";
import * as cheerio from 'cheerio';
import Config from "../Helper/Config.json";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import LifiCustomWidget from "../../widgets/LifiCustomWidget.jsx";

function Swap() {
  const [columnText, setColumnText] = useState([]);
  const internalCSS = `
    .set-anchor-color-2 {
        color: #61F8E1 !important;
    }
  `;

  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = () => {
    axios
      .get(`${Config.baseUrl}/1633`)
      .then((res) => {
        if (res.data) {
          const $ = cheerio.load(res.data.content.rendered);
          const headingText = $('#react-6 .elementor-widget-container h2').text();
          setColumnText(headingText);
        } else {
          console.error("No post data found");
        }
      })
      .catch((error) => {
        console.error("Error fetching post:", error);
      });
  };

  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setPosition({ x, y });
  };


  return (
    <>
    <HelmetProvider><Helmet>
        <title>Swap - DEGENS</title>
      </Helmet></HelmetProvider>
      
      <style>{internalCSS}</style>
      <div onMouseMove={handleMouseMove} className=" set-container swap-res-1 swap-desktop-set-1">
      <div className="set-grid-img-1"></div>
      <div className="set-bg-1" style={{
          '--translateX': `${position.x / 25}px`,
          '--translateY': `${position.y / 25}px`,
        }}></div>
        <div className="set-grid-bg-1"></div>
        <div className="content swap-desktop-set-2">
          <Header/>
          <div className="container">
            <div className="set-div-3">
              <h2>{columnText}</h2>
              <div className="mt-5">
                <LifiCustomWidget />
              </div>
            </div>
          </div>
        </div>
       
      </div>

      
    </>
  );
}

export default Swap;

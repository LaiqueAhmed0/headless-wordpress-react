// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../Header/Header";
import * as cheerio from 'cheerio';
import Config from "../Helper/Config.json";
import { Link } from "react-router-dom";
import { Helmet, HelmetProvider } from 'react-helmet-async';
function Staking() {
  const [columnText, setColumnText] = useState([]);
  const [columnText2, setColumnText2] = useState([]);
  const [columnButton, setColumnButton] = useState([]);
  const [inputTags, setInputTags] = useState([]);

  useEffect(() => {
    fetchPost();
}, []);
const internalCSS = `
    .set-anchor-color-5 {
        color: #61F8E1 !important;
    }
  `;
  const fetchPost = () => {
    axios
        axios.get(`${Config.baseUrl}/1548`)
        .then((res) => {
            if (res.data) {
              const $ = cheerio.load(res.data.content.rendered);
              const headingText = $('#react-24 .elementor-widget-container h2').text();
              setColumnText(headingText);
              const headingText2 = $('#react-25 .elementor-widget-container p').text();
              setColumnText2(headingText2);

              const inputTags = [];
          $('div.elementor-widget-container').find('input').each((index, element) => {
            inputTags.push($.html(element));
          });
          setInputTags(inputTags);


              const items1 = [];
              $('#react-37 .elementor-button-wrapper a').each((index, element) => {
                  items1.push($(element).text());
              });
              setColumnButton(items1);
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
    <HelmetProvider>
    <Helmet>
      <title>Staking - DEGENS</title>
    </Helmet>
    </HelmetProvider>
    
    <style>{internalCSS}</style>
    <div onMouseMove={handleMouseMove} className="set-container swap-desktop-set-1">
    <div className="set-grid-img-1"></div>
      <div className="set-bg-1" style={{
          '--translateX': `${position.x / 25}px`,
          '--translateY': `${position.y / 25}px`,
        }}></div>
        <div className="set-grid-bg-1"></div>
    <div className="content swap-desktop-set-2">
            <Header />
            <div className="container">
              <div className="set-div-3 set-div-10">
                <h2>{columnText}</h2>
                <div className="set-div-8">
                    <div>
                    <p className="m-0">{columnText2}</p>
                    </div>
                    <div>
                    {inputTags.map((tag, index) => (
                  <p key={index} dangerouslySetInnerHTML={{ __html: tag }}></p>
                ))}
                    </div>
                </div>
                <div className="set-div-9 how-div-5">
                {columnButton.map((item, index) => (
                            <Link key={index} to={`/${item.replace(/\s/g, '')}`}>{item}</Link>
                            ))}
                </div>
              </div>
            </div>
        </div>
  
    </div>
        
    </>
  );
}

export default Staking;

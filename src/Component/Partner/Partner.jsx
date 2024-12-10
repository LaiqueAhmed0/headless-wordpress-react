// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../Header/Header";
import * as cheerio from 'cheerio';
import Config from "../Helper/Config.json";
import { Link } from "react-router-dom";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Skeleton, {SkeletonTheme} from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
function Partner() {
  const [columnText, setColumnText] = useState([]);
  const [columnButton, setColumnButton] = useState([]);
  const [columnImages, setColumnImages] = useState([]);

  useEffect(() => {
    fetchPost();
}, []);

const internalCSS = `
    .set-anchor-color-4 {
        color: #61F8E1 !important;
    }
  `;
  const fetchPost = () => {
    axios
        axios.get(`${Config.baseUrl}/1869`)
        .then((res) => {
            if (res.data) {
              const $ = cheerio.load(res.data.content.rendered);
              const headingText = $('#react-34 .elementor-widget-container h2').text();
              setColumnText(headingText);
              const items1 = [];
              $('#react-36 .elementor-button-wrapper a').each((index, element) => {
                  items1.push($(element).text());
              });
              setColumnButton(items1);

              const items2 = [];
              $('#react-35 .elementor-widget-container img').each((index, element) => {
                  items2.push($(element).attr('src'));
              });
              setColumnImages(items2);
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
      <title>Partner - DEGENS</title>
    </Helmet></HelmetProvider>
    
    <style>{internalCSS}</style>
    <div onMouseMove={handleMouseMove} className="set-container swap-res-1 swap-desktop-set-1">
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
                {columnText.length > 0 ? (<h2>{columnText}</h2>) : (<SkeletonTheme baseColor="#61f8e1" highlightColor="#00b4d8"><Skeleton /></SkeletonTheme>)}
                {
                  columnImages.length > 0 ? (
<div className="set-div-8 partner-res-1">
{columnImages.map((item, index) => (
                              <img key={index} src={item} alt="" />
                              ))}
                </div>
                  ) : (
<SkeletonTheme baseColor="#61f8e1" highlightColor="#00b4d8"><Skeleton count={5}/></SkeletonTheme>
                  )
                }
                
                {
                  columnButton.length > 0 ? (<div className="set-div-9 how-div-5">
                  {columnButton.map((item, index) => (
                              <Link key={index} to={`/${item.replace(/\s/g, '')}`}>{item}</Link>
                              ))}
                  </div>) : (<SkeletonTheme baseColor="#61f8e1" highlightColor="#00b4d8"><Skeleton count={2}/></SkeletonTheme>)
                }
                
              </div>
            </div>
        </div>
     
    </div>
        
    </>
  );
}

export default Partner;

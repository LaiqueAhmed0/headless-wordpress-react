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
function Bridge() {
  const [columnText, setColumnText] = useState([]);
  const [columnText2, setColumnText2] = useState([]);
  const [columnText3, setColumnText3] = useState([]);
  const [columnText3Src, setColumnText3Src] = useState([]);
  const [columnButton, setColumnButton] = useState([]);
  const [columnImage, setColumnImage] = useState([]);
  const internalCSS = `
    .set-anchor-color-3 {
        color: #61F8E1 !important;
    }
  `;

  useEffect(() => {
    fetchPost();
    fetchPost1();
}, []);

  const fetchPost = () => {
    axios
        axios.get(`${Config.baseUrl}/1896`)
        .then((res) => {
            if (res.data) {
              const $ = cheerio.load(res.data.content.rendered);
              const headingText = $('#react-8 .elementor-widget-container h2').text();
              setColumnText(headingText);
              const itemsp = [];
              $('#react-9 .elementor-widget-container p').each((index, element) => {
                itemsp.push($(element).text());
            });
            setColumnText2(itemsp);
              // const headingText2 = $('#react-9 .elementor-widget-container p').text();
              // setColumnText2(headingText2);
              const headingText3 = $('#react-9 .elementor-widget-container a span span').text();
              setColumnText3(headingText3);
              const headingText3Src = $('#react-9 .elementor-widget-container a').attr('href');
              setColumnText3Src(headingText3Src);

              const Image = $('#react-9 .elementor-widget-container img').attr('src');
              setColumnImage(Image);

            } else {
                console.error("No post data found");
            }
        })
        .catch((error) => {
            console.error("Error fetching post:", error);
        });
};

const fetchPost1 = () => {
    axios
        axios.get(`${Config.baseUrl}/1279`)
        .then((res) => {
            if (res.data) {
              const $ = cheerio.load(res.data.content.rendered);
              const items1 = [];
              $('#react-5 .elementor-button-wrapper a').each((index, element) => {
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
      <title>Bridge - DEGENS</title>
    </Helmet>
    </HelmetProvider>
    
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
              <div className="set-div-3 set-div-10 set-brigde-1">
                {columnText.length > 0 ? (<h2>{columnText}</h2>) : (<SkeletonTheme baseColor="#61f8e1" highlightColor="#00b4d8"><Skeleton /></SkeletonTheme>)}
                {columnText2.length > 0 && columnText3.length > 0 ? (
                  <div className="set-div-8 set-bridge-3">
                    {columnText2.map((item, index) => (
                            <p key={index}>{item.trim(/&nbsp;/g, '')}</p>
                            ))}
                    <div className="set-bridge-2">
                      <img src={columnImage} alt="" />
                    </div>
                    <Link to={`/${columnText3Src}`}>{columnText3}</Link>
                </div>
                ) :
                 (
                  <SkeletonTheme baseColor="#61f8e1" highlightColor="#00b4d8"><Skeleton count={10}/></SkeletonTheme>
                 )

                }

                

                {
                  columnButton.length > 0 ? (
                <div className="set-div-9">
                {columnButton.map((item, index) => (
                            <Link key={index} to={`/${item.replace(/\s/g, '')}`}>{item}</Link>
                            ))}
                </div>
                  ) : (
                <SkeletonTheme baseColor="#61f8e1" highlightColor="#00b4d8"><Skeleton count={2}/></SkeletonTheme>
                  )
                }
                
              </div>
            </div>
          </div>
         
            
        </div>
    </>
  );
}

export default Bridge;

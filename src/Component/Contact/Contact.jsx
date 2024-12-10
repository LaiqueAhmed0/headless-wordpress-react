// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import axios from "axios";
import * as cheerio from 'cheerio';
import Config from "../Helper/Config.json";
import Header from '../Header/Header';
import emailImg from '../../assets/email.png'
import { Link } from "react-router-dom";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Skeleton, {SkeletonTheme} from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function Contact() {

    const [columnText, setColumnText] = useState([]);
    const [columnText2, setColumnText2] = useState([]);
    const [columnSrc, setColumnSrc] = useState([]);
    const [columnSrcText, setColumnSrcText] = useState([]);
    const [columnImg, setColumnImg] = useState([]);
    const [footerText, setFooterText] = useState([]);

    const internalCSS = `
    .set-anchor-color-5 {
        color: #61F8E1 !important;
    }
  `;

  useEffect(() => {
    fetchPost();
}, []);

  const fetchPost = () => {
    axios
        axios.get(`${Config.baseUrl}/1357`)
        .then((res) => {
            if (res.data) {
              const $ = cheerio.load(res.data.content.rendered);
              const headingText = $('#react-10 .elementor-widget-container h2').text();
              setColumnText(headingText)
              const headingText2 = $('#react-38 .elementor-widget-container h6').text();
              setColumnText2(headingText2)

              const headingSrc = $('#react-13 .elementor-widget-container a').attr('href');
              setColumnSrc(headingSrc)

              const headingSrcText = $('#react-13 .elementor-widget-container a').text();
              setColumnSrcText(headingSrcText)

              const fooText = $('#react-14 .elementor-widget-container p').text();
              setFooterText(fooText)

              const items1 = [];
              $('#react-12 .elementor-widget-container img').each((index, element) => {
                  items1.push($(element).attr('src'));
              });
              setColumnImg(items1);
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
      <title>Contact - DEGENS</title>
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
            <div className="container set-contact-container">
              <div className="set-div-3 set-div-13">
                {columnText.length > 0 ? (<h2>{columnText}</h2>) : (<SkeletonTheme baseColor="#61f8e1" highlightColor="#00b4d8"><Skeleton /></SkeletonTheme>)}
                {columnText2.length > 0 ? (<p>{columnText2}</p>) : (<SkeletonTheme baseColor="#61f8e1" highlightColor="#00b4d8"><Skeleton count={5}/></SkeletonTheme>)}
                {
                  columnImg.length > 0 ? (
<div className="set-div-11">
                {columnImg.map((item, index) => (
                    <img key={index} src={item} alt="" />
                            ))}
                </div>
                  ) : (
<SkeletonTheme baseColor="#61f8e1" highlightColor="#00b4d8"><Skeleton count={3}/></SkeletonTheme>
                  )
                }
                {
                  columnSrcText.length > 0 ?(
<div className="set-div-12">
                    <Link to={columnSrc}><img src={emailImg} alt="" />{columnSrcText}</Link>
                </div>
                  ) : (
<SkeletonTheme baseColor="#61f8e1" highlightColor="#00b4d8"><Skeleton /></SkeletonTheme>
                  )
                }
                
                
              </div>
            </div>
            {
              footerText.length > 0 ? (
<div className="footer-div-1">
                <p>{footerText}</p>
            </div>
              ) : (
                <div className="text-center">
<SkeletonTheme baseColor="#61f8e1" highlightColor="#00b4d8"><Skeleton width={200}/></SkeletonTheme>
                </div>
              )
            }
            
        </div>
       
    </div>
        
    </>
  )
}

export default Contact
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
function HowToBuy() {
  const [columnText, setColumnText] = useState([]);
  const [columnText2, setColumnText2] = useState([]);
  const [columnButton, setColumnButton] = useState([]);
  const [columnImg, setColumnImg] = useState([]);
  const [columnH2Text, setColumnH2Text] = useState([]);
  const [columnParaText, setColumnParaText] = useState([]);

  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = () => {
    axios;
    axios
      .get(`${Config.baseUrl}/1361`)
      .then((res) => {
        if (res.data) {
          const $ = cheerio.load(res.data.content.rendered);
          const headingText = $(
            "#react-20 .elementor-widget-container h2"
          ).text();
          setColumnText(headingText);
          const headingText2 = $(
            "#react-17 .elementor-widget-container p"
          ).text();
          setColumnText2(headingText2);
          const items1 = [];
          $("#react-21 .elementor-button-wrapper a").each((index, element) => {
            items1.push($(element).text());
          });
          setColumnButton(items1);

          const items2 = [];
          $(
            "#react-21 .has_ma_el_bg_slider .elementor-widget-container img"
          ).each((index, element) => {
            items2.push($(element).attr("src"));
          });
          setColumnImg(items2);

          const items3 = [];
          $("#react-21 .elementor-widget-container h2").each(
            (index, element) => {
              items3.push($(element).text());
            }
          );
          setColumnH2Text(items3);

          const items4 = [];
          $("#react-21 .elementor-widget-container p").each(
            (index, element) => {
              items4.push($(element).text());
            }
          );
          setColumnParaText(items4);
        } else {
          console.error("No post data found");
        }
      })
      .catch((error) => {
        console.error("Error fetching post:", error);
      });
  };

  return (
    <>
    <HelmetProvider>
    <Helmet>
        <title>How To Buy - DEGENS</title>
      </Helmet>
    </HelmetProvider>
      
      <div className="set-bg-1">
        <Header />
        <div className="container">
          <div className="set-div-3 set-div-10">
            {columnText.length > 0 ? (<h2>{columnText}</h2>) : (<SkeletonTheme baseColor="#61f8e1" highlightColor="#00b4d8"><Skeleton /></SkeletonTheme>)}
            
            <div className="set-div-8 abt-1">
              <p>{columnText2}</p>
            </div>
            {
              columnImg.length > 0 && columnH2Text.length > 0 && columnParaText.length > 0 ? (
<div className="how-div-4">
              {columnImg.map((item1, index1) => (
                <div className="how-div-1" key={index1}>
                  <div className="how-div-2">
                    <img src={item1} alt="" />
                  </div>
                  <div className="how-div-3">
                    {columnH2Text[index1] && <h2>{columnH2Text[index1]}</h2>}
                    {columnParaText[index1] && <p>{columnParaText[index1]}</p>}
                  </div>
                </div>
              ))}
            </div>
              ) : (
<SkeletonTheme baseColor="#61f8e1" highlightColor="#00b4d8"><Skeleton count={10}/></SkeletonTheme>
              )
            }
            {
              columnButton.length > 0 ? (
                <div className="set-div-9 how-div-5">
              {columnButton.map((item, index) => (
                <Link key={index} to={`/${item.replace(/\s/g, "")}`}>
                  {item}
                </Link>
              ))}
            </div>
              ) : (
                <SkeletonTheme baseColor="#61f8e1" highlightColor="#00b4d8"><Skeleton count={2}/></SkeletonTheme>
              )
            }
            
          </div>
        </div>
      </div>
    </>
  );
}

export default HowToBuy;

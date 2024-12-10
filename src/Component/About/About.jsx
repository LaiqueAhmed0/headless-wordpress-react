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
function About() {
  const [columnText, setColumnText] = useState([]);
  const [columnText2, setColumnText2] = useState([]);
  const [columnButton, setColumnButton] = useState([]);

  useEffect(() => {
    fetchPost();
}, []);

  const fetchPost = () => {
    axios
        axios.get(`${Config.baseUrl}/1354`)
        .then((res) => {
            if (res.data) {
              const $ = cheerio.load(res.data.content.rendered);
              const headingText = $('#react-16 .elementor-widget-container h2').text();
              setColumnText(headingText);
              const headingText2 = $('#react-17 .elementor-widget-container p').text();
              setColumnText2(headingText2);
              const items1 = [];
              $('#react-19 .elementor-button-wrapper a').each((index, element) => {
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

  return (
    <>
    <HelmetProvider>
    <Helmet>
      <title>About - DEGENS</title>
    </Helmet>
    </HelmetProvider>
    
        <div className="set-bg-1">
            <Header />
            <div className="container">
              <div className="set-div-3 set-div-10">
                {columnText.length > 0 ? (<h2>{columnText}</h2>) : (<SkeletonTheme baseColor="#61f8e1" highlightColor="#00b4d8"><Skeleton /></SkeletonTheme>)}
                {
                  columnText2.length > 0 ? (
                <div className="set-div-8 abt-1">
                    <p>{columnText2}</p>
                </div>
                  ) : (
<SkeletonTheme baseColor="#61f8e1" highlightColor="#00b4d8"><Skeleton count={5}/></SkeletonTheme>
                  )
                }

                {
                  columnButton.length > 0 ? (
<div className="set-div-9 abt-2">
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
    </>
  );
}

export default About;

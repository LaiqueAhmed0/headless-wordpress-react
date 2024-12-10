import React, { useState, useEffect } from "react";
import axios from "axios";
import * as cheerio from 'cheerio';
import Header from "../Header/Header";
import Config from "../Helper/Config.json";
import { Link } from "react-router-dom";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function Home() {
  const [data, setData] = useState({ columnImg: "", columnText: "", columnPara: "", columnDivImg: [], columnButton: [] });
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    axios.get(`${Config.baseUrl}/1279`)
      .then((res) => {
        if (res.data) {
          const $ = cheerio.load(res.data.content.rendered);
          setData({
            columnImg: $('.elementor-widget-container img').attr('src') || "",
            columnText: $('#react-2 .elementor-heading-title.elementor-size-default').text() || "",
            columnPara: $('#react-3 .elementor-heading-title.elementor-size-default').html() || "",
            columnDivImg: $('#react-4 .elementor-widget-container img').map((_, el) => $(el).attr('src')).get(),
            columnButton: $('#react-5 .elementor-button-wrapper a').map((_, el) => $(el).text()).get(),
          });
        }
      }).catch(console.error);
  }, []);

  const handleMouseMove = (e) => {
    const rect = e.target.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const renderSkeleton = (count = 1) => <SkeletonTheme baseColor="#61f8e1" highlightColor="#00b4d8"><Skeleton count={count} /></SkeletonTheme>;

  return (
    <>
      <HelmetProvider><Helmet><title>DEGENS</title></Helmet></HelmetProvider>
      <style>{`.set-anchor-color-1 { color: #61F8E1 !important; }`}</style>
      <div onMouseMove={handleMouseMove} className="set-container swap-desktop-set-1">
        <div className="set-grid-img-1"></div>
        <div className="set-bg-1" style={{ '--translateX': `${position.x / 25}px`, '--translateY': `${position.y / 25}px` }}></div>
        <div className="set-grid-bg-1"></div>
        <div className="content swap-desktop-set-2">
          <Header />
          <div className="set-div-6 home-res-2">
            <div className="container">
              <div className="row">
                <div className="col-lg-5 col-md-5 col-sm-12 col-12">
                  <div className="set-div-2">
                    {data.columnImg ? <img src={data.columnImg} alt="Menu Logo" /> : renderSkeleton(6)}
                  </div>
                </div>
                <div className="col-lg-7 col-md-7 col-sm-12 col-12">
                  <div className="set-div-3">
                    {data.columnText ? <h2>{data.columnText}</h2> : renderSkeleton()}
                    {data.columnPara ? <p dangerouslySetInnerHTML={{ __html: data.columnPara }}></p> : renderSkeleton()}
                    {data.columnDivImg.length > 0 ? (
                      <div className="set-div-4">
                        <div>{data.columnDivImg.map((src, i) => <img key={i} src={src} alt="" />)}</div>
                      </div>
                    ) : renderSkeleton(3)}
                    {data.columnButton.length > 0 ? (
                      <div className="set-div-5 home-res-1">
                        {data.columnButton.map((btn, i) => <Link key={i} to={`/${btn.replace(/\s/g, '')}`}>{btn}</Link>)}
                      </div>
                    ) : renderSkeleton()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;

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
function Tokenomics() {
  const [columnText, setColumnText] = useState([]);
  const [columnText1, setColumnText1] = useState([]);
  const [divText, setDivText] = useState([]);
  const [divPara, setDivPara] = useState([]);
  const [divText1, setDivText1] = useState([]);
  const [divPara1, setDivPara1] = useState([]);
  const [divText2, setDivText2] = useState([]);
  const [divPara2, setDivPara2] = useState([]);
  const [divText3, setDivText3] = useState([]);
  const [divPara3, setDivPara3] = useState([]);
  const [divImg, setDivImg] = useState([]);
  const [setBox, setSetBox] = useState([]);
  const [setBoxUl, setSetBoxUl] = useState([]);
  const [columnButton, setColumnButton] = useState([]);

  useEffect(() => {
    fetchPost();
}, []);
  const fetchPost = () => {
    axios
        axios.get(`${Config.baseUrl}/1363`)
        .then((res) => {
            if (res.data) {
              const $ = cheerio.load(res.data.content.rendered);
              const headingText = $('#react-26 .elementor-widget-container h2').text();
              setColumnText(headingText);
              const headingText1 = $('#react-32 .elementor-widget-container h2').text();
              setColumnText1(headingText1);
              const divH2 = $('#react-28 #react-h2 h2').text();
              setDivText(divH2);
              const divptext = $('#react-28 #react-para h2').text();
              setDivPara(divptext);

              const divH21 = $('#react-29 #react-h2 h2').text();
              setDivText1(divH21);
              const divptext1 = $('#react-29 #react-para h2').text();
              setDivPara1(divptext1);

              const divH22 = $('#react-30 #react-h2 h2').text();
              setDivText2(divH22);
              const divptext2 = $('#react-30 #react-para h2').text();
              setDivPara2(divptext2);

              const divH23 = $('#react-31 #react-h2 h2').text();
              setDivText3(divH23);
              const divptext3 = $('#react-31 #react-para h2').text();
              setDivPara3(divptext3);
                
              const items2 = [];
              $('#react-33 .elementor-widget-container h2').each((index, element) => {
                  items2.push($(element).text());
              });
              setSetBox(items2);
              const items3 = [];
                    $('#react-33 .elementor-widget-container ul').each((index, element) => {
                        const listItems = [];
                        $(element).find('li').each((liIndex, liElement) => {
                            listItems.push($(liElement).text());
                        });
                        items3.push(listItems);
                    });
                    setSetBoxUl(items3);

              const divimage = $('#react-img img').attr('src');
              setDivImg(divimage);
              const items1 = [];
              $('#react-27 .elementor-button-wrapper a').each((index, element) => {
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
    <HelmetProvider><Helmet>
      <title>Takenomics & Roadmap - DEGENS</title>
    </Helmet></HelmetProvider>
    
        <div className="set-bg-1">
            <Header />
            <div className="container">
              <div className="set-div-3 set-div-10">
                {columnText.length > 0 ? (<h2 className="toke-res-1 landscape">{columnText}</h2>) : (<SkeletonTheme baseColor="#61f8e1" highlightColor="#00b4d8"><Skeleton /></SkeletonTheme>)}
                
                {
                    divText.length > 0 && divPara.length > 0 && divText1.length > 0 && divPara1.length > 0 && divText2.length > 0 && divPara2.length > 0 && divText3.length > 0 && divPara3.length > 0 ? (
<div className="set-toke-div-4">
                    <div className="set-toke-div-1">
                        <h2 className="toke-res-1">{divText}</h2>
                        <p>{divPara}</p>
                    </div>
                    <div className="set-toke-div-3">
                    <div className="set-toke-div-1">
                        <h2 className="toke-res-1">{divText1}</h2>
                        <p>{divPara1}</p>
                    </div>
                    <div className="set-toke-div-2">
                        <img src={divImg} alt="" />
                    </div>
                    <div className="set-toke-div-1">
                        <h2 className="toke-res-1">{divText2}</h2>
                        <p>{divPara2}</p>
                    </div>
                    </div>
                    <div className="set-toke-div-1">
                        <h2 className="toke-res-1">{divText3}</h2>
                        <p>{divPara3}</p>
                    </div>
                </div>
                    ) : (
                        <SkeletonTheme baseColor="#61f8e1" highlightColor="#00b4d8"><Skeleton count={10}/></SkeletonTheme>
                    )
                }

                {
                    columnText1.length > 0 ? (<h2 className="toke-res-1">{columnText1}</h2>) : (<SkeletonTheme baseColor="#61f8e1" highlightColor="#00b4d8"><Skeleton /></SkeletonTheme>)
                }
                {
                    setBox.length > 0 && setBoxUl.length > 0 ? (
<div className="set-toke-div-6">
                            {setBox.map((item, index) => (
                                <div className="set-toke-div-5" key={index}>
                                    <h3>{item}</h3>
                                    <ul>
                                        {setBoxUl[index] && setBoxUl[index].map((liItem, liIndex) => (
                                            <li key={liIndex}>{liItem}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <SkeletonTheme baseColor="#61f8e1" highlightColor="#00b4d8"><Skeleton /></SkeletonTheme>
                    )
                }
                
                {
                    columnButton.length > 0 ? (
<div className="set-div-9 how-div-5">
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

export default Tokenomics;

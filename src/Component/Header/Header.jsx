// eslint-disable-next-line no-unused-vars
import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import * as cheerio from 'cheerio';
import { Link } from "react-router-dom";
import Config from "../Helper/Config.json"
import MenuBars from '../../assets/bars.png'
import MenuClose from '../../assets/close.png'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import WalletButton from '../WalletConnect/WalletConnect.jsx'
function Header() {

  const [isVisible, setIsVisible] = useState(false);




  const [isVisible1, setIsVisible1] = useState(false);

  const toggleDiv1 = () => {
    setIsVisible1((prev) => !prev);
  };


  const [menuItems, setMenuItems] = useState([]);
  const [menuLogo, setMenuLogo] = useState([]);
  // const [menuButton, setMenuButton] = useState([]);
  const [menuButtonText, setMenuButtonText] = useState([]);
  const [navText, setNavText] = useState([]);
  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = () => {
    axios
    axios.get(`${Config.baseUrl}/1279`)
      .then((res) => {
        if (res.data) {
          const $ = cheerio.load(res.data.content.rendered);
          const items = [];
          $('#menu-main2 li').each((index, element) => {
            items.push($(element).text());
          });
          setMenuItems(items);

          const imageUrl = $('.elementor-widget-container img').attr('src');
          setMenuLogo(imageUrl);

          // const anchorHref = $('#react-1 a').attr('href');
          // setMenuButton(anchorHref);

          const anchorText = $('#react-1 .elementor-button-text').text();
          setMenuButtonText(anchorText);

          const headerText = $('#react-15 .elementor-widget-container h2').text();
          setNavText(headerText);

        } else {
          console.error("No post data found");
        }
      })
      .catch((error) => {
        console.error("Error fetching post:", error);
      });
  };

  const [style, setStyle] = useState("");

  const changeStyle = () => {
    console.log("you just clicked");
    if (style !== "") setStyle("");
    else setStyle("set-ul-1-active");
  };

  const changeStyleDisable = () => {
    console.log("you just clicked");
    if (style !== "set-ul-1-active") setStyle("set-ul-1-active");
    else setStyle("");
    setIsVisible1(false);
  };


  const menuRef = useRef(null);

  useEffect(() => {
    document.addEventListener('click', outSideClick);
    return () => {
      document.removeEventListener('click', outSideClick);
    };
  }, []);

  const outSideClick = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setIsVisible(false);
      setIsVisible1(false);
    }
  };

  return (
    <>
      <div className="container" ref={menuRef}>
        <div className="set-div-1">
          <Link to="/" id="set-img-1">
            {menuLogo.length > 0 ? (<img src={menuLogo} alt="Menu Logo" />) :
              (<SkeletonTheme baseColor="#61f8e1" highlightColor="#00b4d8">
                <Skeleton />
              </SkeletonTheme>)}
          </Link>
          <ul className="set-ul-1" id={style}>
            {/* {menuButtonText.length > 0 ?(<li className="set-res-li-1"><button id="set-btn-1">{menuButtonText}</button></li>) : (<SkeletonTheme baseColor="#61f8e1" highlightColor="#00b4d8"><Skeleton width={50}/></SkeletonTheme>)}  */}
            <li className="set-res-li-1">
              <WalletButton />
            </li>
            {
              <button className="set-menu-bar-1" onClick={changeStyleDisable}><img src={MenuClose} alt="" /></button>
            }
            {
              menuItems.length > 0 ? (menuItems.map((item, index) => (
                <li key={index}><Link
                  className={`set-anchor-color-${index + 1}`}
                  to={`/${item}`}
                >
                  {item}
                </Link></li>
              ))) : (<span className="set-loader-1"><SkeletonTheme baseColor="#61f8e1" highlightColor="#00b4d8"><Skeleton width={500} /></SkeletonTheme></span>)
            }
          </ul>
          {/* {menuButtonText.length > 0 ? (<Link id="set-btn-1" to='/Swap'>{menuButtonText}</Link>) : (<SkeletonTheme baseColor="#61f8e1" highlightColor="#00b4d8"><Skeleton width={100}/></SkeletonTheme>)} */}
          <div className="set-div-wid">
            <WalletButton />
          </div>
          <div className="set-res-div-1">
            {navText.length > 0 ? (<h2>{navText}</h2>) : (<SkeletonTheme baseColor="#61f8e1" highlightColor="#00b4d8"><Skeleton width={50} /></SkeletonTheme>)}
            {navText.length > 0 ? (<button onClick={changeStyle}><img src={MenuBars} alt="" /></button>) : (<SkeletonTheme baseColor="#61f8e1" highlightColor="#00b4d8"><Skeleton width={20} /></SkeletonTheme>)}

          </div>
        </div>
      </div>
    </>
  )
}

export default Header;

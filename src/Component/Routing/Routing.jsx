// eslint-disable-next-line no-unused-vars
import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../Home/Home";
import Swap from "../Swap/Swap";
import Bridge from '../Bridge/Bridge';
import NotFound from '../NotFound/NotFound';
import Contact from '../Contact/Contact';
import About from '../About/About';
import HowToBuy from '../HowToBuy/HowToBuy';
import Partner from '../Partner/Partner';
import Staking from '../Staking/Staking';
import Tokenomics from '../Tokenomics/Tokenomics';
function Routing() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path={"/*"} element={<Home />} />
        <Route path={"/Home/*"} element={<Home />} />
        <Route path={"/Swap/*"} element={<Swap />} />
        <Route path={"/Bridge/*"} element={<Bridge />} />
        <Route path={"/Contact/*"} element={<Contact />} />
        <Route path={"/About/*"} element={<About />} />
        <Route path={"/HowToBuy/*"} element={<HowToBuy />} />
        <Route path={"/Partner/*"} element={<Partner />} />
        <Route path={"/Staking/*"} element={<Staking />} />
        <Route path={"/Tokenomics/*"} element={<Tokenomics />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Routing
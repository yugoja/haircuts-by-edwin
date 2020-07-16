import React from "react";
import { Route, Link } from "react-router-dom";
import { AiOutlineScissor } from 'react-icons/ai';

import '../styles/header.css';


export default function Header() {
  return (
    <header>
      <Link to="/">
        <h2 className="logo">Haircuts By Edwin</h2>
      </Link>
    </header>
  );
}

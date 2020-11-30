import React from "react";
import "./Navbar.css";

export default () => {
  // JavaScript goes here
  var openAdBoard = () => {
    console.log("open ad board");
  };
  var openCampaigns = () => {
    console.log("open campaigns");
  };
  var openAddModal = () => {
    console.log("open add modal");
  };
  var logout = () => {
    console.log("logout");
  };

  return (
    // JSX goes here
    <div className="navbar-wrapper">
      <h2>Navbar</h2>
      <div className="navbar-bar">
        <a className="ad-board-button" onClick={() => openAdBoard()}>
          Ad Board
        </a>
        <a className="new-ad-button" onClick={() => openAddModal()}>
          New Ad
        </a>
        <a className="logout-button" onClick={() => logout()}>
          Logout
        </a>
      </div>
    </div>
  );
};

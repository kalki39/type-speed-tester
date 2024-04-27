import React from "react";
import AccountCircle from "./AccountCircle";
import KeyboardAltRoundedIcon from "@mui/icons-material/KeyboardAltRounded";

function Header() {
  return (
    <div className="header">
      <div className="logo">
        <KeyboardAltRoundedIcon fontSize="large" />
      </div>
      <div className="project-title">Typing Speed Tester</div>
      <div className="user-icon">
        {/* user icon here */}
        <AccountCircle />
      </div>
    </div>
  );
}

export default Header;

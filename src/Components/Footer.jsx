import React from "react";
import Select from "react-select";
import { themeOptions } from "../Utils/ThemeOptions";
import { useTheme } from "../Context/ThemeContext";
import { Book, GitHub, LinkedIn } from "@mui/icons-material";

function Footer() {
  const gitHubRepoLink = "https://github.com/kalki39/type-speed-tester";
  const linkedInLink = "https://www.linkedin.com/in/kalki39/";
  const buyMeCoffeLink = 'https://www.buymeacoffee.com/asdeiva';
  const { theme, setTheme } = useTheme();
  const handleChange = (e) => {
    setTheme(e.value);
    localStorage.setItem("theme", JSON.stringify(e.value));
  };

  // console.log(themeOptions);

  return (
    <div className="footer">
      <div className="footer-left">
        <a href={gitHubRepoLink}  className="link" target="_blank" rel="noopener noreferrer">
          <GitHub fontSize="large" />
        </a>
        <a href={linkedInLink} className="link" target="_blank" rel="noopener noreferrer">
          <LinkedIn fontSize="large" />
        </a>
      </div>
      <div className="footer-right">
        <Select
          onChange={handleChange}
          options={themeOptions}
          menuPlacement="top"
          defaultValue={{ label: theme.label, value: theme }}
          styles={{
            control: (styles) => ({
              ...styles,
              backgroundColor: theme.textColor,
            }),
            menu: (styles) => ({
              ...styles,
              backgroundColor: theme.background,
            }),
            option: (styles, { isFocused }) => {
              return {
                ...styles,
                backgroundColor: !isFocused
                  ? theme.background
                  : theme.textColor,
                color: !isFocused ? theme.textColor : theme.background,
                cursor: "pointer",
              };
            },
          }}
        />
      </div>
    </div>
  );
}

export default Footer;

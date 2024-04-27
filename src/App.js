import { ToastContainer } from "react-toastify";
import { useTheme } from "./Context/ThemeContext";
import { GlobalStyles } from "./Styles/global";
import { ThemeProvider } from "styled-components";
import "react-toastify/dist/ReactToastify.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import UserPage from "./Pages/UserPage";

function App() {
  const { theme } = useTheme();
  return (
    <ThemeProvider theme={theme}>
      <ToastContainer />
      <GlobalStyles />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/user" element={<UserPage />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;

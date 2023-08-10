import { Provider } from "react-redux";
import { styled } from "styled-components";
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Main from "./pages/Main";
import InGame from "./pages/InGame";
import backgroundColor from "./assets/images/interfaces/backgroundColor.svg"
import backgroundField from "./assets/images/interfaces/backgroundField.svg"
import { store } from "./store/store"

const LeftBorder = styled.div`
  background-color: black;
  position: fixed;
  left: 0;
  top: 0;
  width: 10%;
  height: 100%;
  z-index: 3;
`;
const RightBorder = styled.div`
  background-color: black;
  position: fixed;
  right: 0;
  top: 0;
  width: 10%;
  height: 100%;
  z-index: 3;
`;
const BackGround = styled.img`
  position: absolute;
  left: 0;
  bottom: 0;
  width:3735px;
  z-index: 0;
`;

function App() {

  return (
    <BrowserRouter>
      <Provider store={store}>
        <LeftBorder></LeftBorder>
        <BackGround src={backgroundColor}></BackGround>
        <BackGround src={backgroundField}></BackGround>
        <RightBorder></RightBorder>
        <Routes>
            <Route path="/" element={<Main />}></Route>
            <Route path="/InGame" element={<InGame />}></Route>
        </Routes>
      </Provider>
    </BrowserRouter>
    );
}

export default App;

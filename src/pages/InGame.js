import { styled } from "styled-components";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import backgroundMusic from "../assets/sounds/backgroundMusic.mp3"
import Menu from "../components/menu/Menu"
import Field from "../components/Field";
import { fieldWidth } from "../utils/data/dataSet";
import { useDispatch, useSelector } from "react-redux";
import { selectedTurret } from "../store/slices/selectedTurret";

const Container = styled.div`
    position: absolute;
    left: 10%;
    top: 0;
    width: 80%;
    height: 100%;
`;
const Screen = styled.div`
    position: fixed;
    left: 10%;
    top: 0;
    width: 80%;
    height: 100%;
`;
const CouserImg = styled.img`
    position: absolute;
    background-color: red;
    opacity: 0.5;
    display: "block";
    display: ${props => props.selectTurret !== null ? "block" : "none"};
    left: ${props => {
        if(props.selectTurret !== null){
            return props.selectTurret.imgLocation.x - 250 + "px"
        }else{

            return "0px"
        }
    }};
    top: ${props => {
        if(props.selectTurret !== null)
            return props.selectTurret.imgLocation.y - 180 + "px"
        else
            return "0px"
    }};
    width: 100px;
    height: 100px;
    z-index: 10;

`;
export default function InGame(){

    const goMainPage = useNavigate()
    const dispatch = useDispatch()
    const selectTurret = useSelector(state => state.selectedTurret)
    window.addEventListener("beforeunload", () => localStorage.setItem("refresh", "/"))

    useEffect(() => goMainPage(localStorage.getItem("refresh")), [])

    return(
        <Container onMouseMove={e => {
            dispatch(selectedTurret.actions.setImagelocation({x:e.screenX, y:e.screenY}))
        }}>
            <CouserImg src={require("../assets/images/turrets/level1/turret1/대기.gif")} selectTurret={selectTurret}></CouserImg>
            <Field></Field>
            <Screen><Menu/></Screen>
            <audio src={backgroundMusic} autoPlay loop />
        </Container>
    )
}   
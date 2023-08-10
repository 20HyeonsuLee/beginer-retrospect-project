import { Link } from "react-router-dom";
import { styled } from "styled-components"
import tittleImg from "../assets/images/interfaces/tittle.png"

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 200px;
    z-index: 3;
`;
const Title = styled.img`
    position: relative;
    left: 19%;
    top: 100px;
    width: 60vw;
    z-index: 1;
`;
const Play = styled(Link)`
    width: 100vw;
    font: 80px bold;
    
    color: white;
    text-decoration-line: none;
    text-align: center;
    text-shadow: 5px 5px 5px gray;
    font-family: 'Courier New', Courier, monospace;
    letter-spacing: 2rem;
    z-index: 1;
`;

export default function Main(){
    return (
        <Container>
            <Title src={tittleImg}></Title>
            <Play to={'/InGame'} onClick={e => localStorage.setItem("refresh", "")}>Play</Play>
        </Container>
    ); 
}
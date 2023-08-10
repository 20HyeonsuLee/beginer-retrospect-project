import { useSelector } from "react-redux";
import { styled } from "styled-components"
import coinIcon from "../../../assets/images/interfaces/menu/icons/coinIcon.png"

const Container = styled.div`
    z-index: 1;
    width: 19%;
    height: 60%;
`;
const Row = styled.div`
    margin-top: 3%;
    margin-left: 3%;
    display: flex;
    align-items: center;
`;
const CoinKey = styled.img`
    width: 25px;
    height: 25px;
`;
const CoinValue = styled.div`
    color: yellow;
    font-size: 25px;
    text-shadow: 2px 2px 0px black;
`;
const ExpKey = styled.div`
    font-size: 25px;
    font-family: "Courier New", monospace;
`;
const ExpValue = styled.div`
    color: red;
    font-size: 25px;
    text-shadow: 2px 2px 0px black;
`;


export default function Wallet(){

    // const wallet = useSelector(state => state.status)

    return (
        <Container>
            <Row>
                <CoinKey src={coinIcon}></CoinKey>
                <CoinValue>10</CoinValue>
            </Row>
            <Row>
                <ExpKey>Exp: </ExpKey>
                <ExpValue>10</ExpValue>
            </Row>
        </Container>
    )
}
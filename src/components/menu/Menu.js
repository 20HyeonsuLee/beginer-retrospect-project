import { styled } from "styled-components";
import menuImg from "../../assets/images/interfaces/menu/menuBar.png"
import Wallet from "./wallet/Wallet";
import Loading from "./production/Loading";
import ShopTurret from "./shop/ShopTurret";
import ShopMain from "./shop/ShopMain";
import ShopUnit from "./shop/ShopUnit";
import ShopCancel from "./shop/ShopCancel";

const Container = styled.div`
    position: absolute;
    width: 100%;
`;
const MenuBar = styled.div`
    display: flex;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    gap: 5px 1%;
`;

export default function Menu(){


    return(
        <Container>
            <img src={menuImg} width={"100%"}></img>
            <MenuBar>
                <Wallet></Wallet>
                <Loading></Loading>
                <ShopTurret></ShopTurret>
                <ShopUnit></ShopUnit>
                <ShopMain></ShopMain>
                <ShopCancel></ShopCancel>
            </MenuBar>
        </Container>
    )
}
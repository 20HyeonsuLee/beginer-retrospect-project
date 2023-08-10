import { useDispatch, useSelector } from "react-redux";
import { styled } from "styled-components"
import { status } from "../../../store/slices/status";
import { selectedTurret } from "../../../store/slices/selectedTurret";
import { useEffect, useRef } from "react";

const Container = styled.div`
    display: ${props => props.menu === "turret" ? "flex" : "none"};
    flex-wrap: wrap;
    width: 35%;
    height: 50%;
    gap: 0px 3%;
    margin-left: 2%;
    
`;
const Title = styled.div`
    color: yellow;
    font-size: 25px;
    width: 100%;
    height: 35%;
`;
const Item = styled.img`
    width: 15%;
    margin-left: ${props => {
        return props.left
    }};
    -webkit-filter: brightness(0.9);
    &:hover{
        -webkit-filter: brightness(1);
    }
`;

export default function ShopTurret(){

    const ref = useRef(null)
    const dispatch = useDispatch()
    const statusInfo = useSelector(state => state.status[0])
    const selectTurret = useSelector(state => state.selectedTurret);
    const turrets = require("../../../utils/data/turret/level" + statusInfo.level)
    return(
        <Container menu={statusInfo.menu}>
            <Title>Menu-Turrets</Title>
            <Item src={require("../../../assets/images/interfaces/menu/icons/shopTurret/level" + statusInfo.level + "/Turret_1.png")} onClick={e => {
                dispatch(selectedTurret.actions.setSelectedTurret({turret:{...turrets.turret1, imgLocation:{x:0,y:0}}}))
                dispatch(status.actions.setMenu({menu:"add"}))
            }}></Item>
            <Item src={require("../../../assets/images/interfaces/menu/icons/shopTurret/level" + statusInfo.level + "/Turret_2.png")} onClick={e => {
                dispatch(status.actions.setMenu({menu:"add"}))
            }}></Item>
            <Item src={require("../../../assets/images/interfaces/menu/icons/shopTurret/level" + statusInfo.level + "/Turret_3.png")} onClick={e => {
                dispatch(status.actions.setMenu({menu:"add"}))
            }}></Item>
            <Item src={require("../../../assets/images/interfaces/menu/icons/prevIcon.png")} left={"20%"}  onClick={e => dispatch(status.actions.setMenu({menu:"main"}))}></Item>
        </Container>
    )
}
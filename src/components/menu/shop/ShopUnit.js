import { useDispatch, useSelector } from "react-redux";
import { styled } from "styled-components"
import { createSlice } from "@reduxjs/toolkit";
import { status } from "../../../store/slices/status";
import { fieldUnit } from "../../../store/slices/fieldUnit";
import { trainingList } from "../../../store/slices/trainingList";

const Container = styled.div`
    display: ${props => props.menu === "unit" ? "flex" : "none"};
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
export default function ShopUnit(){
    
    const dispatch = useDispatch()
    const statusInfo = useSelector(state => state.status[0])
    const unitInfo = require("../../../utils/data/unit/level" + statusInfo.level)
    return(
        <Container menu={statusInfo.menu}>
            <Title>Menu-Units</Title>
            <Item src={require("../../../assets/images/interfaces/menu/icons/shopUnit/level" + statusInfo.level + "/Unit_1.png")} onClick={() => {
                // if(status.coin >= unitData[0].price && load.length < 5){
                // }
                dispatch(trainingList.actions.addTrain({unit:unitInfo.unit1}))
            }}></Item>
            <Item src={require("../../../assets/images/interfaces/menu/icons/shopUnit/level" + statusInfo.level + "/Unit_2.png")}onClick={() => {
                dispatch(trainingList.actions.addTrain({unit:unitInfo.unit2}))
            }}></Item>
            <Item src={require("../../../assets/images/interfaces/menu/icons/shopUnit/level" + statusInfo.level + "/Unit_3.png")} onClick={() => {
                dispatch(trainingList.actions.addTrain({unit:unitInfo.unit3}))
            }}></Item>
            <Item src={require("../../../assets/images/interfaces/menu/icons/prevIcon.png")} left="20%" onClick={() => dispatch(status.actions.setMenu({menu:"main"}))}></Item>
        </Container>
    )
}
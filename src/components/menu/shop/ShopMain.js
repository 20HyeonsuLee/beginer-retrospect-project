import { useDispatch, useSelector } from "react-redux";
import { styled } from "styled-components"
import { status } from "../../../store/slices/status";
import { ally } from "../../../utils/data/dataSet";

const Container = styled.div`
    display: ${props => props.menu === "main" ? "flex" : "none"};
    flex-wrap: wrap;
    width: 35%;
    height: 50%;
    gap: 0px 3%;
    margin-left: 2%;
    z-index: 10;
`;
const Title = styled.div`
    color: yellow;
    font-size: 25px;
    width: 100%;
    height: 35%;
`;
const Item = styled.img`
    width: 15%;
    -webkit-filter: brightness(0.9);
    &:hover{
        -webkit-filter: brightness(1);
    }
`;

export default function ShopMain(){

    const dispatch = useDispatch();
    const statusInfo = useSelector(state => state.status[0])
    
    return(
        <Container menu={statusInfo.menu}>
            <Title>Menu</Title>
            <Item src={require("../../../assets/images/interfaces/menu/icons/shopMain/unitIcon.png")} onClick={e => dispatch(status.actions.setMenu({menu:"unit"}))}></Item>
            <Item src={require("../../../assets/images/interfaces/menu/icons/shopMain/turretIcon.png")} onClick={e => dispatch(status.actions.setMenu({menu:"turret"}))}></Item>
            <Item src={require("../../../assets/images/interfaces/menu/icons/shopMain/turretIcon.png")} onClick={e => {
                dispatch(status.actions.setMenu({menu:"cell"}))
            }}></Item>
            <Item src={require("../../../assets/images/interfaces/menu/icons/shopMain/turretIcon.png")} onClick={() => {
                dispatch(status.actions.addTower({team:ally}))
            }}></Item>
            <Item src={require("../../../assets/images/interfaces/menu/icons/shopMain/levelUpIcon.png")} onClick={() => {
                dispatch(status.actions.levelUp({team:ally}))
            }}></Item>
        </Container>
    )
}
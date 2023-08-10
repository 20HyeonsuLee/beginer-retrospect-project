import { useDispatch, useSelector } from "react-redux";
import { styled } from "styled-components"
import { status } from "../../../store/slices/status";
import { selectedTurret } from "../../../store/slices/selectedTurret";

const Container = styled.div`
    display: ${props => props.menu === "add" || props.menu === "cell" ? "flex" : "none"};
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
const CancelButton = styled.button`
    color: red;
    background-color: lightgray;
    border: 2px solid black;
    font-size: 30px;
    width: 65%;
    height: 75%;
    margin-left: 14%;
    &:hover{
        background-color: rgb(240, 240, 240)
    }
`;

export default function ShopCancel(){

    const dispatch = useDispatch();
    const menu = useSelector(state => state.status[0].menu)
    const selectTurret = useSelector(state => state.selectedTurret)

    return(
        <Container menu={menu}>
            <Title>Menu</Title>
            
            <CancelButton onClick={ e => {
                dispatch(status.actions.setMenu({menu:"main"}))
                dispatch(selectedTurret.actions.setSelectedTurret({turret:null}))
            }}>CANCEL</CancelButton>
        </Container>
    )
}
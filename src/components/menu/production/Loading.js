import { useDispatch, useSelector } from "react-redux";
import { keyframes, styled } from "styled-components"
import { trainingList } from "../../../store/slices/trainingList";
import { fieldUnit } from "../../../store/slices/fieldUnit";
import { useEffect, useState } from "react";
import getKey from "../../../utils/functions/getKey";

const loading = keyframes`
    0%{width:0%}
    100%{width:100%}
`;

const Container = styled.div`
    margin-top: 2px;
    display: flex;
    flex-wrap: wrap;
    align-content: start;
    width: 43%;
    height: 100%;
    gap: 1%;
    z-index: 1;
`;
const LoadingBar = styled.div`
    border: 2.5px solid black;
    width: 70%;
    height: 8%;
`;
const Progress = styled.div`
    width: 0%;
    height: 100%;
    background-color: lightgray;
    animation: ${loading} ${props => (props.trainingList.length > 0 ? props.trainingList[0].createTime : 0) + "s"} 0s 1;
`;
const UnitInfo = styled.div`
    color: yellow;
    font-size: 30px;
`;
const LoadWait = styled.div`
    border: 2.5px solid black;
    width: 3.5%;
    height: 9%;
    background-color: ${props => props.trainingList.length >= props.index ? "lightgray" : "none"};
`;

export default function Loading(){

    const [update, setUpdate] = useState(0);
    const list = useSelector(state => state.trainingList)
    const dispatch = useDispatch();

    useEffect(() => {
        if(list.length === 1) setUpdate(prev => prev + 1)
    }, [list])

    return(
        <Container>
            <LoadingBar>
                <Progress key={update} trainingList={list} onAnimationEnd={e => {
                    if(list.length > 0){
                        dispatch(fieldUnit.actions.addUnit({unit:{...list[0], id:getKey()}}))
                        dispatch(trainingList.actions.completeTrain({}))
                        setUpdate(prev => prev + 1)
                    }
                }}></Progress>
            </LoadingBar>
            <LoadWait trainingList={list} index={1}></LoadWait>
            <LoadWait trainingList={list} index={2}></LoadWait>
            <LoadWait trainingList={list} index={3}></LoadWait>
            <LoadWait trainingList={list} index={4}></LoadWait>
            <LoadWait trainingList={list} index={5}></LoadWait>
            <UnitInfo>Club Man...</UnitInfo>
        </Container>
    )
}
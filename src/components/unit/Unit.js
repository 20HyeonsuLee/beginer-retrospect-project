import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { keyframes } from "styled-components"
import { ally } from "../../utils/data/dataSet";
import { rangeCheck } from "../../utils/functions/isRange";
import { fieldUnit } from "../../store/slices/fieldUnit";

const moveAlly = keyframes`
    0%{left: 400px;}
    100%{left: 2000px;}
`;
const moveEnemy = keyframes`
    0%{left: 1700px;}
    100%{left: 100px;}
`;
const Container = styled.div`
    display: flex;
    position: absolute;
    justify-content: center;
    bottom: 50px;
    width: 100px;
    height: 130px;
    animation: ${props => props.team === ally ? moveAlly : moveEnemy} 30s 0s 1 linear alternate;
    animation-play-state: ${(props) => props.animation === "걷기" ? "running" : "paused"};
    transform: ${(props) => props.team === ally ? "scaleX(1)" : "scaleX(-1)"};
`;
const UpperBody = styled.img`
    position: absolute;
    height: ${props => props.height + "%"};
    z-index: 0;
`;
const LowerBody = styled.img`
    position: absolute;
    height: ${props => props.height + "%"};
    z-index: 0;
`;
const HPBox = styled.div`
    position: relative;
    top: -20px;
    left: 0;
    width: 50px;
    height: 7px;
    background-image: ${(props) => "linear-gradient(to left, red " + props.hp +  "%, transparent 0%);"};
    display: none;
`;
const HitBox = styled.div`
    width: 45%;
    height: calc(100% - 30px);
    z-index: 0;
    &:hover {
        ${HPBox} {
            display: block;
        }
    }
    z-index: 1;
`;
const Body = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: end;
    width: 100%;
    height: 100%;
    z-index: 0;
`;

function delay(ms){
    return new Promise(resolve => setTimeout(resolve, ms))
}

async function executeAttack(before, action){
    await delay(before)
    action()
}

export default function Unit({id, team}){
    
    const fieldUnits = useSelector(state => state.fieldUnit)
    const myUnit = fieldUnits.filter(e => e.id === id)[0]
    const myUnitIndex = fieldUnits.findIndex(e => e.id === id)
    const attackSound = useRef(null);
    const deadSound = useRef(null);
    const dispatch = useDispatch();
    let target;
    
    const attackEvent = () => {
        dispatch(fieldUnit.actions.hitUnit({id:target.id, damage:myUnit.damage}))
        try {
            attackSound.current.currentTime = 0
            attackSound.current.play()
        } catch (error) {}
    }

    useEffect(() => {
        if(myUnit.hp < 0){
            dispatch(fieldUnit.actions.setLowerBody({motion:"죽기", id:id}))
            dispatch(fieldUnit.actions.setUpperBody({motion:"죽기", id:id}))
            if(myUnit.upperBody !== "죽기"){
                try {deadSound.current.play()} catch (error) {}
                console.log("죽음");
                setTimeout(() => {
                    dispatch(fieldUnit.actions.removeUnit({id:id}))
                }, 1000);
            }
        }else{
            const checkAllyRange = rangeCheck(fieldUnits, myUnit, team, myUnit.hitRange)
            const checkEnemyRange = rangeCheck(fieldUnits, myUnit, Number(!team), myUnit.hitRange)
            const checkAttackRange = rangeCheck(fieldUnits, myUnit, Number(!team), myUnit.attackRange)
            
            if(checkAllyRange > -1 && checkAllyRange < myUnitIndex)
                dispatch(fieldUnit.actions.setLowerBody({motion:"대기", id:id}))
            else if(checkEnemyRange > -1)
                dispatch(fieldUnit.actions.setLowerBody({motion:"공격", id:id}))
            else
                dispatch(fieldUnit.actions.setLowerBody({motion:"걷기", id:id}))
    
            if(checkAttackRange > -1){
                target = fieldUnits[checkAttackRange]
                dispatch(fieldUnit.actions.setUpperBody({motion:"공격", id:id}))
            }else if(checkAllyRange > -1 && checkAllyRange < myUnitIndex){
                dispatch(fieldUnit.actions.setUpperBody({motion:"대기", id:id}))
            }else{
                dispatch(fieldUnit.actions.setUpperBody({motion:"걷기", id:id}))
            }
        }

    }, [myUnit])

    useEffect(() => {

        let interval = null

        if(myUnit.upperBody === "공격"){
            executeAttack(myUnit.preDelay, attackEvent)

            interval = setInterval(() => {
                executeAttack(myUnit.preDelay, attackEvent)
            }, myUnit.attackSpeed);
        }

        return () => clearInterval(interval)

    }, [myUnit.upperBody])
    
    return (
        <Container id={id} team={team} animation={myUnit.lowerBody}>
            <Body>
                <UpperBody height={myUnit.height} src={require("../../assets/images/units/level" + myUnit.level + "/" + myUnit.unit + "/" + myUnit.lowerBody + "하체.gif")}></UpperBody>
                <LowerBody height={myUnit.height} src={require("../../assets/images/units/level" + myUnit.level + "/" + myUnit.unit + "/" + myUnit.upperBody + "상체.gif")}></LowerBody>
            </Body>
            <HitBox><HPBox hp={(myUnit.hp / myUnit.maxHp) * 100}/></HitBox>
            <audio ref={attackSound} src={require("../../assets/sounds/units/level" + myUnit.level + "/" + myUnit.unit + "/공격.mp3")} />
            <audio ref={deadSound} src={require("../../assets/sounds/units/level" + myUnit.level + "/" + myUnit.unit + "/죽기.mp3")} />
        </Container>
    )
}
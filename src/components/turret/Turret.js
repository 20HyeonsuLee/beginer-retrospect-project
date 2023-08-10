import { useDispatch, useSelector } from "react-redux";
import { styled } from "styled-components";
import targetImg from "../../assets/images/turrets//target.png"
import { selectedTower, selectedTurret } from "../../store/slices/selectedTurret";
import { status } from "../../store/slices/status";
import { ally, enemy, fieldWidth } from "../../utils/data/dataSet";
import { useEffect, useRef, useState } from "react";
import { rangeCheck } from "../../utils/functions/isRange";
import { attacks} from "../../store/slices/attacks"
import getKey from "../../utils/functions/getKey";

const Container = styled.div`
    display: flex;
    position: absolute;
    align-items: center;
    justify-content: center;
    width: 55px;
    height: 55px;
    left: ${props => props.location.left};
    bottom: ${props => props.location.bottom};
    z-index: 3;
`;
const TurretImage = styled.img`
    position: absolute;
    width: 140px;
    height: 140px;
    transform: rotate( ${props => props.deg + "deg"});
`;
const TargetImage = styled.img`
    position: absolute;
    width: 55px;
    height: 55px;
    z-index: 10;
    &:hover{
        background-color: rgba(240, 240, 240, 0.5);
    }
    display: ${props =>{
        if(props.menu === "add"){
            if(props.towerInfo === null)
                return "block"
            else
                return "none"
        }else if(props.menu === "cell"){
            if(props.towerInfo !== null)
                return "block"
            else
                return "none"
        }else{
            return "none"
        }
    }};
`;

export default function Turret({location, menu, team, turretInfo, index}){

    const dispatch = useDispatch();
    const selectTurret = useSelector(state => state.selectedTurret)
    const fieldUnits = useSelector(state => state.fieldUnit)
    const turret = useSelector(state => state.status[team].tower[index])
    const turretRef = useRef(null);
    const [update, setUpdate] = useState(0);
    const [turretLocation, setLocation] = useState(null);
    const _ = require("lodash")

    useEffect(() => {
        
        if(turretInfo !== null){
            const element = turretRef.current
            const left = element.parentElement.offsetLeft + element.offsetLeft
            const top = element.parentElement.offsetTop + element.offsetTop
            setLocation({
                x:left,
                y:element.offsetTop,
                left:left,
                right:fieldWidth - left - element.offsetWidth,
                top:top,
                bottom:element.offsetBottom,
                centerX:left + element.offsetWidth / 2,
            })
            let targetIndex;
            if((targetIndex = rangeCheck(fieldUnits, {id:null, location:turretLocation}, Number(!team), turretInfo.range)) > -1){
                dispatch(status.actions.setMotion({team:team, index:index, motion:"공격", target:targetIndex}))

                const x = Math.abs(fieldUnits[targetIndex].location.left - turretLocation.left)
                const y = Math.abs(fieldUnits[targetIndex].location.top - turretLocation.top)
                const deg = Math.atan(y / x) * 100
                dispatch(status.actions.setDeg({index:index, deg:deg, team:team}))
                
                // 공격일 때 투사체 발사해야하는데 투사체의 애니메이션 좌표를 어떻게 줄것인가....
            }else{
                dispatch(status.actions.setMotion({team:team, index:index, motion:"대기"}))
                dispatch(status.actions.setDeg({index:index, deg:0, team:team}))
            }
        }
    }, [fieldUnits])
    
    const attack = useSelector(state => state.attacks)

    useEffect(() => {
        let interval = null
        if(turret !== null && turret.attackMotion === "공격"){
            interval = setInterval(() => {
                dispatch(attacks.actions.addAttack({attack:{...turret, id:getKey(), target:fieldUnits[turret.target], startLocation:turretLocation}}))
                setUpdate(prev => prev + 1)
            }, turret.attackLongSpeed);
        }

        return () => clearInterval(interval)

    }, [turret === null ? "" : turret.attackMotion, update])

    return (
        <Container ref={turretRef} location={location}>
            {turretInfo !== null && turretInfo !== undefined ? <TurretImage deg={turretInfo.deg} src={require("../../assets/images/turrets/level" + turretInfo.level + "/turret" + turretInfo.turret + "/" + turretInfo.attackMotion + ".gif")}></TurretImage> : <div></div>}
            <TargetImage src={targetImg} menu={menu} towerInfo={turretInfo} onClick={e => {
                if(menu === "add") {
                    const turret = _.clone(selectTurret)
                    turret.team = enemy
                    dispatch(status.actions.setTurret({index:index, turret:selectTurret, team:team}))
                    dispatch(status.actions.setTurret({index:index, turret:turret, team:Number(!team)}))
                    dispatch(status.actions.setMenu({menu:"main"}))
                    dispatch(selectedTurret.actions.setSelectedTurret({turret:null}))
                } else {
                    dispatch(status.actions.removeTurret({index:index, team:team}))
                    dispatch(status.actions.setMenu({menu:"main"}))
                    dispatch(selectedTurret.actions.setSelectedTurret({turret:null}))
                }
            }}></TargetImage>
        </Container>
    )
}
import { useDispatch, useSelector } from "react-redux";
import { styled } from "styled-components";
import { enemy, turretLocation } from "../../utils/data/dataSet";
import Turret from "../turret/Turret";
import { fieldUnit } from "../../store/slices/fieldUnit";
import getKey from "../../utils/functions/getKey";

const Container = styled.div`
    position: absolute;
    width: 400px;
    height: 530px;
    bottom: 0;
    left: ${props => props.className === enemy ? "1800px" : "0px"};
    transform: ${props => props.className === enemy ? "scaleX(-1)" : "scaleX(1)"};
`;
const HpState = styled.div`
    position: absolute;
    display: flex;
    top: 0px;
    left: 70px;
    width: 100px;
    height: 270px;
    gap: 10px;
`;
const HpNumber = styled.div`
    font-size: 20px;
    color: red;
    text-align: center;
    transform: ${props => props.className === enemy ? "scaleX(-1)" : "scaleX(1)"};
`;
const HpBar = styled.div`
    background-image: ${props =>"linear-gradient(to top, red " + props.hp +  "%, transparent 50%);"};
    border: 2px solid black;
    width: 20px;
    height: 100%;
`;
const MainBase = styled.img`
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
`;
const BaseTurret = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    width: 80px;
    height: 80px;
    left: 130px;
    bottom: 120px;
    z-index: 1;
`;
const TowerImage = styled.img`
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
`;

export default function Nexus({className, id}){

    const dispatch = useDispatch();
    const nexusInfo = useSelector(state => state.fieldUnit[className])
    const status = useSelector(state => state.status[className])
    const towers = status.tower
    const unitInfo = require("../../utils/data/unit/level1")

    return (
        <Container id={id} className={className} onClick={e => className === enemy ? dispatch(fieldUnit.actions.addUnit({unit:{...unitInfo.unit2, team:enemy, id:getKey()}})) : null}>
            <HpState className={className}>
                <HpBar hp={(nexusInfo.hp / status.maxHp) * 100}></HpBar>
                <HpNumber className={className}>{nexusInfo.hp}</HpNumber>
            </HpState>
            <MainBase className={className} src={require("../../assets/images/nexus/level" + status.level + ".png")}></MainBase>
            {towers.map((e, k) => k > 0 ? <TowerImage src={require("../../assets/images/towers/level" + status.level + "/" + (Number(k)) + ".png")}></TowerImage> : <div></div>)}
            {towers.map((e, k) => <Turret location={turretLocation[Number(k)]} index={k} team={nexusInfo.team} turretInfo={e} menu={status.menu}></Turret>)}
        </Container>
    )
}
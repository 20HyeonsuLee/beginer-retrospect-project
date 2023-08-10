import { styled } from "styled-components"
import { useDispatch, useSelector } from "react-redux";
import { ally, enemy, fieldWidth } from "../utils/data/dataSet"
import Nexus from "./nexus/Nexus";
import Unit from "./unit/Unit";
import { useEffect, useRef } from "react";
import { fieldUnit } from "../store/slices/fieldUnit";
import Attack from "./turret/Attack";
import { attacks } from "../store/slices/attacks";

const Container = styled.div`
    position: absolute;
    left: -20px;
    bottom: 50px;
    width: ${fieldWidth + "px"};
    height: 250px;
    z-index: 2;
`;

export default function Field(){
    
    const fieldUnits = useSelector(state => state.fieldUnit.filter(e => e.id !== "ally" && e.id !== "enemy"))
    const fieldRef = useRef(null);
    const fieldAttacks = useSelector(state => state.attacks)
    const dispatch = useDispatch();

    useEffect(() => {

        const interval = setInterval(() => {
            
            Array.from(fieldRef.current.children).map(e => {
                const location = {
                    x:e.offsetLeft,
                    y:e.offsetTop,
                    left:e.offsetLeft,
                    right:fieldWidth - e.offsetLeft - e.offsetWidth,
                    top:e.offsetTop,
                    bottom:e.offsetBottom,
                    centerX:e.offsetLeft + e.offsetWidth / 2,
                }
                if(e.id !== null){
                    dispatch(fieldUnit.actions.updateLocation({location:location, id:e.id}))
                    dispatch(attacks.actions.updateLocation({location:location, id:e.id}))
                }
            })
        }, 300);
        
        return () => clearInterval(interval)

    }, [])

    return (
        <Container ref={fieldRef}>
            <Nexus id={"ally"} className={ally}></Nexus>
            <Nexus id={"enemy"} className={enemy}></Nexus>
            {fieldUnits.map((e) => <Unit key={e.id} id={e.id} team={e.team}></Unit>)}
            {fieldAttacks.map(e => <Attack key={e.id} id={e.id} team={e.team}></Attack>)}
        </Container>
    )
}
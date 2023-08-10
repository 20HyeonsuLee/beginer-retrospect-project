import { useDispatch, useSelector } from "react-redux";
import { keyframes, styled } from "styled-components";
import { attacks } from "../../store/slices/attacks";
import { useEffect, useRef, useState } from "react";
import { rangeCheck } from "../../utils/functions/isRange";
import {fieldUnit} from "../../store/slices/fieldUnit"

const animation = (start, finish) => keyframes`
    0%{
        left: ${start.left + "px"};
        top: ${start.top + "px"};
    }
    100%{
        left: ${finish.left + "px"};
        top: ${finish.top + "px"};
    }
`;

const Container = styled.div`
    position: absolute;
    width: 50px;
    height: 50px;
    background-color: red;
    animation-duration: 2s;
    animation-iteration-count: 1;
    animation-timing-function: linear;
    animation-name: ${props => animation(props.start, props.finish)};
`;

export default function Attack({id, team}){

    const dispatch = useDispatch();
    const attack = useSelector(state => state.attacks[state.attacks.findIndex(e => e.id === id)])
    const target = useSelector(state => state.fieldUnit[state.fieldUnit.findIndex(e => e.id === attack.target)])
    const [location, setLocation] = useState(target !== undefined ? target.location : null)
    const fieldUnits = useSelector(state => state.fieldUnit)
    const attackRef = useRef(null);
    
    useEffect(() => {
        let index
        if((index = rangeCheck(fieldUnits, attack, Number(!team), 50)) > -1) {
            attackRef.current.style.display = "none"
            dispatch(fieldUnit.actions.hitUnit({id:fieldUnits[index].id, damage:attack.damage}))
        }
    }, [attack])
    return (
        <>
          {
          <Container
            ref={attackRef}
            id={id}
            start={{ left: attack.startLocation.left, top: attack.startLocation.top }}
            finish={{ left: attack.target.location.left, top: attack.target.location.top }}
            onAnimationEnd={e => {
                dispatch(attacks.actions.removeAttack({ id: id }))
            }}
            ></Container>}
        </>
      );
}
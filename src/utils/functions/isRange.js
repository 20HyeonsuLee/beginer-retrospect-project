export function isRange(range, myUnit, otherUnit){
    
    const myLocation = myUnit.location
    const leftRange = myLocation.centerX - range
    const rightRange = myLocation.centerX + range;
    return (
        (leftRange < otherUnit.location.centerX - otherUnit.hitRange && rightRange > otherUnit.location.centerX - otherUnit.hitRange) ||
        (leftRange < otherUnit.location.centerX + otherUnit.hitRange && rightRange > otherUnit.location.centerX + otherUnit.hitRange) 
    )

}

export function rangeCheck(fieldUnitList, myUnit, team, range){
    
    const rangedIndex = fieldUnitList.findIndex(e => {
        if(myUnit.team === 0){
            return (e.team === team
                && e.location !== null
                && e.id !== myUnit.id 
                && e.id !== "ally"
                && myUnit.location !== null
                && e.lowerBody !== "죽기"
                && isRange(range, myUnit, e))
        }else{
            return (e.team === team
                && e.location !== null
                && e.id !== myUnit.id 
                && e.id !== "enemy"
                && myUnit.location !== null
                && e.lowerBody !== "죽기"
                && isRange(range, myUnit, e))
        }
        
    })
    return rangedIndex === -1 ? -1 : rangedIndex
}

export function getIndex(state, id){
    return state.findIndex(e => e.id === id)
}
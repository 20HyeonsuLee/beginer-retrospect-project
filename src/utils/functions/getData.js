
export function getUnit(level, index) {

    switch (index) {
        case 1:
            return require("../data/unit/level" + level).unit1       
        case 2:
            return require("../data/unit/level" + level).unit2       
        case 3:
            return require("../data/unit/level" + level).unit3       
        default:
            break;
    }
}
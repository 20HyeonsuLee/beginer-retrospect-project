
const keySet = new Set()

export default function getKey(){
    const size = keySet.size
    let key = null;

    while(size === keySet.size){
        key = Math.floor(Math.random() * 100000 + 1)
        keySet.add(key)
    }
    return key
}
import {
     atom,
     selector
} from "recoil";
import { 
    dataChars 
} from "../../story/chars";



const CharsAtom=atom({
    key:'atomDataChars',
    default:dataChars
})

const CharsSelect=selector({
    key:'selectDataChars',
    get:(({get})=>{
        return get(CharsAtom);
    })
})

export {
    CharsSelect
}
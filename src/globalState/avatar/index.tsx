import {
     atom,
     selector
} from "recoil";



const AvatarDomainAtom=atom({
    key:'atomAvatarDomain',
    default:'http://localhost:8000/storage/avatar/'
})

const AvatarDomainSelectSelect=selector({
    key:'selectAvatarDomain',
    get:(({get})=>{
        return get(AvatarDomainAtom);
    })
})

export {
    AvatarDomainSelectSelect
}
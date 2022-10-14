import { atom } from "recoil";
import { BASIC_CONSTANT } from "../variables/basic.constants";

const authAtom = atom({
    key: 'auth',
    default: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem(BASIC_CONSTANT.ADMIN_TOKEN)) : null
})

export {authAtom};
import store from "../store";

import {ethers} from "ethers";

export default ({to, from, next}) => {
    console.log(store.state.provider);

    if (store.state.provider && ethers.utils.isAddress(store.state.provider)) {
        next();
    } else {
        next("/login");
        return false;
    }
};

import {useCookies} from "vue3-cookies";
import {ethers} from "ethers";

const {cookies} = useCookies();

export default ({to, from, next}) => {
    let address = cookies.get("address");

    if (address && ethers.utils.isAddress(address)) {
        next();
    } else {
        next("/login");
        return false;
    }
};

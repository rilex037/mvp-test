import {useUserStore} from "@/stores/user";

export default ({to, from, next}) => {
    const user = useUserStore();

    if (user.provider) {
        next();
    } else {
        next("/login");
        return false;
    }
};

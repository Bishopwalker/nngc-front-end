import {useAppSelector} from "../../redux/hooks";

export const userInfo = useAppSelector((state) => state.userInfo);

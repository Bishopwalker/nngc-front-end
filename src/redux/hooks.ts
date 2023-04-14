import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "./types";

//export const useAppDispatch = () => useDispatch<AppDispatch>()
//export const useAppSelector = (selector: (state: RootState) => any) => useSelector(selector)
export const useAppDispatch:()=>AppDispatch=useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
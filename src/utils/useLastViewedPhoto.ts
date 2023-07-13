import { createGlobalState } from "react-hooks-global-state";

interface StateType {
  photoToScrollTo: string | string[] | null;
}

const initialState: StateType = { photoToScrollTo: null };
const { useGlobalState } = createGlobalState(initialState);

export const useLastViewedPhoto = () => {
  return useGlobalState("photoToScrollTo");
};

"use client";

import { createContext, useContext, useReducer } from "react";
// reducer
import EditContextReducer from "./EditContextReducer";

const initialState = {
  isEdit: false,
  brightness: 100,
  contrast: 100,
  saturation: 100,
  grayscale: 0,
  rotate: 0,
  flipHorizontal: false,
  flipVertical: false,
  zoom: 1,
  downloadImage: false,
  saveImage: false,
};

const EditContext = createContext(initialState);

export const EditContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(EditContextReducer, initialState);

  const value = {
    ...state,
    dispatch,
  };
  return <EditContext.Provider value={value}>{children}</EditContext.Provider>;
};

export const useEditContext = () => useContext(EditContext);

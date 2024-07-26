import { EDIT_CONTEXT_ACTIONS } from "./actions.types";

const EditContextReducer = (state, action) => {
  switch (action.type) {
    case EDIT_CONTEXT_ACTIONS.EDIT_STATUS:
      return {
        ...state,
        isEdit: action.payload,
        zoom: action.payload ? 1 : state.zoom,
        rotate: action.payload ? 0 : state.rotate,
      };
    case EDIT_CONTEXT_ACTIONS.UPDATE_BRIGHTNESS:
      return { ...state, brightness: action.payload };
    case EDIT_CONTEXT_ACTIONS.UPDATE_CONTRAST:
      return { ...state, contrast: action.payload };
    case EDIT_CONTEXT_ACTIONS.UPDATE_SATURATION:
      return { ...state, saturation: action.payload };
    case EDIT_CONTEXT_ACTIONS.UPDATE_GRAYSCALE:
      return { ...state, grayscale: action.payload };
    case EDIT_CONTEXT_ACTIONS.UPDATE_ROTATE:
      return { ...state, rotate: action.payload };
    case EDIT_CONTEXT_ACTIONS.UPDATE_ZOOM:
      return { ...state, zoom: action.payload };
    case EDIT_CONTEXT_ACTIONS.UPDATE_HORIZONTAL_FLIP:
      return { ...state, flipHorizontal: !state.flipHorizontal };
    case EDIT_CONTEXT_ACTIONS.UPDATE_VERTICAL_FLIP:
      return { ...state, flipVertical: !state.flipVertical };
    case EDIT_CONTEXT_ACTIONS.SAVE_EDIT:
      return { ...state, saveImage: !state.saveImage };
    case EDIT_CONTEXT_ACTIONS.DOWNLOAD_IMAGE:
      return { ...state, downloadImage: !state.downloadImage };
    case EDIT_CONTEXT_ACTIONS.RESET:
      return {
        ...state,
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
    default:
      return state;
  }
};

export default EditContextReducer;

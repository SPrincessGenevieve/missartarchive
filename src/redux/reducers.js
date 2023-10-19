// reducers.js
const initialState = {
  selectedImageData: null,
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SELECTED_IMAGE_DATA":
      return { ...state, selectedImageData: action.payload };
    default:
      return state;
  }
};

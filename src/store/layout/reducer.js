import {GET_LAYOUT_DATA, GET_GENRES_DATA, ADD_LAYOUT_DATA } from "../actionTypes";
import {updateObject} from "../utility";

const initialState = {
  layouts: [],
  genres: []
}

const reducer = (state = initialState, action) => {
  switch (action.type) {

    case GET_LAYOUT_DATA:
      return updateObject(state, {
        layouts: action.payload
        // layouts: [...state.layouts, action.payload]
      });

    case GET_GENRES_DATA:
      return updateObject(state, {
        genres: action.payload
      });

    case ADD_LAYOUT_DATA:
      const isAvailableAdd = state.layouts.find((item) => item.id === action.payload.id);

      return updateObject(state, {
        layouts: isAvailableAdd ? [...state.layouts] : [...state.layouts, action.payload]
      });

    default:
      return state;
  }
}

export default reducer;
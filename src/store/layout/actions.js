import * as actionTypes from "../actionTypes";
import LayoutApi from "../../api/LayoutApi";
import GenresApi from "../../api/GenresApi";

export const getLayoutData = (res) => ({
    type: actionTypes.GET_LAYOUT_DATA,
    payload: res,
});

export const getGenresData = (res) => ({
    type: actionTypes.GET_GENRES_DATA,
    payload: res,
});

export const addLayoutData = (res) => ({
    type: actionTypes.ADD_LAYOUT_DATA,
    payload: res,
});

export const getApiLayoutFiftyFlicks = () => {
  return (dispatch) => {

    LayoutApi.getLayoutFiftyFlicks()
    .then(async(res) => {
      if(res.data.pageRails){
        res.data.pageRails.map(async(item) => {
          const dd = await LayoutApi.getRail(item.id);
          dispatch(addLayoutData({...item, ...dd}));
        })
      }
    })
    .catch((err) => console.log(err));
  }
};

export const getApiGenres = () => {
  return (dispatch) => {
    GenresApi.getGenres()
    .then((res) => {
      dispatch(getGenresData(res.data));
    })
    .catch((err) => console.log(err));
  }
};

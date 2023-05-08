import { createSlice } from "@reduxjs/toolkit";
import { userSlice } from "./user.slice";
import {
  ProductModel,
  SmartPhone,
} from "../../../interfaces/product.interfaces";
interface SerchState {
  search: string;
  filters: string[];
  founded: ProductModel[];
  currentBrand: string;
  currentSecondCategory: string;
  isFound: boolean;
}
const initialState: SerchState = {
  search: "",
  isFound: true,
};
const searchSlice = createSlice({
  name: "phones",
  initialState,
  reducers: {
    getFounded: (state, { payload }) => {
      console.log(payload);
      state.founded = payload.filter((p: ProductModel) =>
        p.name.includes(state.search)
      );
      console.log(state.founded);
      // if(state.search.search) {
      //
      // };
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },

    getPhonesFetchBySearch: (state) => {
      state.isFound = false;
    },
    getPhonesFailureBySearch: (state) => {
      state.isFound = false;
    },
    getPhonesSuccessBySearch: (state, action) => {
      state.isFound = true;
    },
  },
});
export const {
  setSearch,
  getFounded,
  getPhonesFetchBySearch,
  getPhonesFailureBySearch,
  getPhonesSuccessBySearch,
} = searchSlice.actions;
export default searchSlice.reducer;

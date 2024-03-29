import { createSlice } from "@reduxjs/toolkit";
import { userSlice } from "./user.slice";
import {
  ProductModel,
  SmartPhone,
} from "../../../interfaces/product.interfaces";
interface SerchState {
  search: string;
  filters: string[] | null;
  founded: ProductModel[] | null;
  currentBrand: string | null;
  currentSecondCategory: string | null;
  isFound: boolean;
}
const initialState: SerchState = {
  search: "",
  filters: null,
  currentBrand: null,
  currentSecondCategory: null,
  founded: null,
  isFound: true,
};
const searchSlice = createSlice({
  name: "phones",
  initialState,
  reducers: {
    getFounded: (state, { payload }) => {
      console.log(payload);
      state.founded = payload.filter((p: ProductModel) =>
        p.name.includes(state.search) || p.brand.name.includes(state.search)
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

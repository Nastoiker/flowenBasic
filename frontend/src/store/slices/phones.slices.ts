import { createSlice } from "@reduxjs/toolkit";
import {
  ModelDevice,
  ProductModel,
  SmartPhone,
} from "../../../interfaces/product.interfaces";

interface StatePhones {
  phones: ProductModel[] | null;
  staticPhones?: ProductModel[];
  currentModel?: ProductModel;
  filtered?: ProductModel[];
  isLoading: boolean;
}
const initialState: StatePhones = {
  phones: null,
  isLoading: true,
};
const phonesSlice = createSlice({
  name: "phones",
  initialState,
  reducers: {
    getPhonesFetch: (state) => {
      state.isLoading = true;
    },
    getPhonesFailure: (state) => {
      state.isLoading = false;
    },
    getPhonesSuccess: (state, action) => {
      if (!state.staticPhones) state.staticPhones = action.payload;
      state.phones = action.payload;
      state.isLoading = false;
    },
    getPhonesByBrand: (state , { payload }) => {
      state.filtered = state.staticPhones?.filter(
        (p) => p.brand.name === payload
      );
      console.log(state.staticPhones);
    },
    setCurrentModel: (state, { payload }) => {
      let model;
      for (const phone of state.staticPhones as any) {
        if (phone.id === payload) {
          console.log(phone + "mmmm");
          state.currentModel = phone;
        }
      }
    },
    getWithAction: (state, { payload }) => {
      state.filtered = payload.filtered.map((p: any) => p.price < p.oldPrice);
    },
    getByPrice: (state, { payload }) => {
      const models: ProductModel[] = [];
      for (const model of state.staticPhones as any) {
        const thisModel = model;
        const phones: SmartPhone[] = [];
        for (const phone of model.product) {
          if (
            phone.price > payload.minPrice &&
            phone.price < payload.maxPrice
          ) {
            phones.push(phone);
          }
          console.log(phone);
        }
        thisModel.product = phones;
        console.log(phones);
        models.push(thisModel);
      }
      state.filtered = models;
    },

  },
});
export const {
  getPhonesFetch,
  getPhonesFailure,
  getPhonesSuccess,
  setCurrentModel,
  getPhonesByBrand,
  getByPrice,
} = phonesSlice.actions;
export default phonesSlice.reducer;

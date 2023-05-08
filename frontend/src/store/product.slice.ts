import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DOMEN } from "../../domen.api";
import { ProductModel } from "../../interfaces/product.interfaces";
import axios from "axios";

export type ProductState = {
  product: ProductModel[];
  search: string;
  filteredProduct: ProductModel[];
  currentProduct?: ProductModel;
  pending: boolean;
  error: boolean;
};
const initialState: ProductState = {
  product: [],
  search: "search",
  filteredProduct: [],
  pending: false,
  error: false,
};
export const getProducts = createAsyncThunk<
  ProductModel[],
  undefined,
  { rejectValue: string }
>("Product/getByCategory", async (_, { rejectWithValue }) => {
  const response = await axios
    .get<ProductModel[]>(DOMEN.product.getAll)
    .then((e) => e.data);
  if (!response) {
    return rejectWithValue("Not found");
  }
  // if(!response.ok) {
  //     return rejectWithValue('SERVER ERROR 500');
  // }
  console.log(`response`);
  await new Promise((resolve) => setTimeout(() => resolve(""), 1000));
  return response;
});
export const getProductById = createAsyncThunk<
  ProductModel,
  string,
  { rejectValue: string; state: { todos: ProductModel } }
>("/product:id", async function (id, { rejectWithValue, dispatch, getState }) {
  const Product = await fetch(DOMEN.product.getById + `${id}`);
  if (!Product) {
    return rejectWithValue("Not found");
  }
  if (!Product.ok) {
    rejectWithValue("Server Error");
  }
  await new Promise((resolve) => setTimeout(() => resolve(""), 1000));
  return (await Product.json()) as ProductModel;
});
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setSearch(state, action) {
      state.search = action.payload;
      state.filteredProduct = state.product.filter(({ name }) =>
        name.toLowerCase().includes(state.search.toLowerCase())
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.pending = true;
      })
      .addCase(getProducts.fulfilled, (state, { payload }) => {
        state.pending = false;
        state.product = payload;
        state.filteredProduct = payload;
      })
      .addCase(getProducts.rejected, (state) => {
        state.pending = false;
        state.error = true;
      })
      .addCase(getProductById.fulfilled, (state, { payload }) => {
        state.currentProduct = payload;
      });
  },
});
export default productSlice.reducer;

import {
  ModelDevice,
  ProductModel,
  SmartPhone,
} from "../../interfaces/product.interfaces";
import { api_url } from "../../domen.api";
import { CommentUser, userState } from "../store/slices/user.slice";

export const ProductImagePath = (
  model: ProductModel,
  phone: SmartPhone,
  img: string
) => {
  const photo = `${api_url}/product/${model.brand.name}/${model.name.replace(
    " ",
    "-"
  )}/${phone.ColorAlias}/${img}`;
  return photo;
};
export const ProfileImage = (profile: userState) => {
  if (profile.avatar === null) {
    return `${api_url}/user/avatar/userDefault.svg`;
  }
  const photo = `${api_url}/user/avatar/${profile.id}/${profile.avatar}`;
  return photo;
};
export const ProductConvertImageNotModel = (phone: SmartPhone) => {
  const image = phone.image.split(",");
  const photo = `${api_url}/product/${
    phone.brand.name
  }/${phone.modelDevice.name.replace(" ", "-")}/${phone.ColorAlias}/${
    image[0]
  }`;
  return photo;
};
export const CommentImage = (id: string, img: string, phone: ProductModel) => {
  const photo = `${api_url}/comment/${phone.brand.name}/${phone.name.replace(
    " ",
    "-"
  )}/${id}/${img}`;
  return photo;
};
export const BrandPath = (brand: string) => {
  return `${api_url}/brands/${brand}.png`;
};

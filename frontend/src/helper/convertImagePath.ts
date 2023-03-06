import {SmartPhone} from "../../interfaces/product.interfaces";
import {api_url} from "../../domen.api";

export const ProductImagePath = (phone: SmartPhone) => {
    const photo =  `${api_url}/product/${phone.brand.name}/${phone.modelDevice.name.replace(' ', '-')}/${phone.ColorAlias}/${img[0]}`;
        return photo;
};
export const ProfileImage = (profile: ) => {
    return;
}
export const CommentImage = (comment: ) => {
    const photo =  `${api_url}/product/${phone.brand.name}/${phone.modelDevice.name.replace(' ', '-')}/${phone.ColorAlias}/${img[0]}`;

    return;
}
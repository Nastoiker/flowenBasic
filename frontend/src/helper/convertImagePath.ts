import {SmartPhone} from "../../interfaces/product.interfaces";
import {api_url} from "../../domen.api";
import {CommentUser, userState} from "../store/slices/user.slice";

export const ProductImagePath = (phone: SmartPhone) => {
    const photo =  `${api_url}/product/${phone.brand.name}/${phone.modelDevice.name.replace(' ', '-')}/${phone.ColorAlias}/${img[0]}`;
        return photo;
};
export const ProfileImage = (profile: userState) => {
    if(profile.avatar?.length===0) {
        return `${api_url}/user/avatar/defaultAvatar.webp`;
    }
    const photo =  `${api_url}/user/avatar/${profile.id}/${profile.avatar}`;
    return photo;
}
export const CommentImage = (comment: CommentUser, phone: SmartPhone) => {
    const photo =  `${api_url}/product/${phone.brand.name}/${phone.modelDevice.name.replace(' ', '-')}/${comment.id}/${img[0]}`;
    return photo;
}
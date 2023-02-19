import {Button} from "../../../ui/button";
import {PhoneCardProps} from "./phone.card.props";

export const PhoneCard = ({name, img, price}: PhoneCardProps): JSX.Element => {
    const picture = img;
    return <div>
        <img src={picture} alt="pictureCard"/>
        <h1>
            {name}
        </h1>
        <h1> {price} </h1>
        <Button>Добавить в корзину </Button>
    </div>;
}
import {Button} from "../../../ui/button";
import {PhoneCardProps} from "./phone.card.props";
import { useNavigate} from "react-router-dom";
export const PhoneCard = ({name, img, price, alias}: PhoneCardProps): JSX.Element => {
    const picture = img;
    const navigate = useNavigate();
    const redirectTo =  (to: string) => {
          navigate(to);
    };
    return <div  className={"text-center hover:scale-110 hover:shadow-xl pb-6 mx-auto  transition-all duration-300 inline-block mb-16 z space-y-2 w-72 justify-items-center"} onClick={() => redirectTo(alias)}>
        <img   className="rounded-3xl h-56 mx-auto" src={picture} alt="pictureCard"/>
        <h1>
            {name}
        </h1>
        <h1> {price} </h1>
        <Button>Добавить в корзину </Button>
    </div>;
}
import {phoneProps} from "./phone.props";
import {Paragraph} from "../../Paragraph/Paragraph";
import path from "path";

export const Phone = ({phone}: phoneProps): JSX.Element => {
    const img = phone.image?.split(',');
// ../../../../../backEnd/uploads
    console.log(path);
    return <div>
        {
            img && <img src={`../../../../../backEnd/uploads${img[0]}`} alt=""/>
        }
        <div>
            <h1>{phone.name}</h1>
            <Paragraph type={'small'}>{phone.Description}</Paragraph>
        </div>
    </div>;
};
import {Htag} from "../Htag/Htag";
import {CommentProps} from "./Comment.props";
import {Paragraph} from "../Paragraph/Paragraph";

export const Comment = ({name, images, comment, avatar, date }: CommentProps) : JSX.Element => {
    const img =` ${avatar}`;
    return <div className={"flex"}>
        <img src={img} className="rounded-full" alt="avatar"/>
        <div className={}>
            <Htag type={"h3"}>
                {name}
            </Htag>
            <span>{date}</span>
            <Paragraph type={"medium"}>{comment}</Paragraph>
        </div>
        { images && images.map(image => <img src={`${image}`} className={"rounded-md"} alt="photoComments"/>)}
    </div>
}
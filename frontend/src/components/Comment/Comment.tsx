import {Htag} from "../Htag/Htag";
import {CommentProps} from "./Comment.props";
import {Paragraph} from "../Paragraph/Paragraph";

export const Comment = ({userId, images, comment, date }: CommentProps) : JSX.Element => {
    const img =``;
    return <div className={"flex"}>
        <img src={img} className="rounded-full" alt="avatar"/>
        <div>
            <Htag type={"h3"}>
                {userId}
            </Htag>
            <span>{date.toString()}</span>
            <Paragraph type={"medium"}>{comment}</Paragraph>
        </div>
        { images && images.map(image => <img src={`${image}`} className={"rounded-md"} alt="photoComments"/>)}
    </div>
}
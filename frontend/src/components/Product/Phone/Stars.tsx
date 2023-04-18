import { ReactComponent as StarIcon } from './phoneStar.svg';
import styles from './Rating.module.css';
import cn from "classnames";

export const Stars = ({ rating }: { rating: number}) => {
    const stars = [1,2,3,4,5];

        return <div>
            {
                stars.map( r => <span className={cn(styles.star, {
                    [styles.filled]: r <= rating,

                })}>
                    <StarIcon />
                </span>)
            }
        </div>
}
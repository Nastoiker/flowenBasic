import {RatingProps} from "./Rating.props";
import styles from './Rating.module.css';
import cn from "classnames";
import {useEffect, useState, KeyboardEvent, ForwardedRef, forwardRef, useRef} from "react";
import {number} from "style-value-types";
import { ReactComponent as StarIcon } from './star.svg';

// eslint-disable-next-line react/display-name
export const Rating = forwardRef(({ className, isEditable = false, rating, setRating, error, tabIndex, ...props }: RatingProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element =>
{
    const ratingArrayRef = useRef<(HTMLSpanElement | null)[]>([]);
    const [ratingArray, setRatingArray] = useState<JSX.Element[]>(new Array(5).fill(<></>));
    const computeFocus = (r: number, i: number ): number => {
        if(!isEditable) {
            return -1;
        }
    if(!rating && i == 0) {
        return tabIndex ?? 0;
    }
    if( r==i + 1) {
        return tabIndex ?? 0;
    }
    return -1;
}
    useEffect(() =>
    {
        constructorRating(rating);
    }, [rating, tabIndex]);

    const constructorRating = (currentRating: number) =>
    {
        const updatedArray = ratingArray.map((r: JSX.Element, i: number) =>
        {
            return (
                       <span
                           key={i}
                           className={cn(styles.star, {
                               [styles.filled]: i < currentRating, [styles.editable]: isEditable,

                           })}
                           onMouseEnter = {() => changeDisplay(i + 1)}
                           onMouseLeave = {() => changeDisplay(rating)} onClick= {() => onClick(i + 1)}
                           tabIndex={ computeFocus(rating, i)}
                           onKeyDown = {handleKey}
                           ref={(r) => ratingArrayRef.current?.push(r)}
                           role={isEditable ? 'slider' : ''}
                           aria-valuenow={rating}
                           aria-valuemax={5}
                           aria-label={isEditable ? 'выберите кол-во звезд для оценки' : ('рейтинг' + rating)}
                           aria-valuemin={1}
                       >
                <StarIcon

                />
            </span>
            );
        });
        setRatingArray(updatedArray);
    };
    const onClick = (i: number) => {
        if(!isEditable || !setRating) {
            return;
        }
        setRating(i);
    }
    const changeDisplay = (i: number) => {
        if(!isEditable) {
            return;
        }
        constructorRating(i);
    };
    const handleKey = ( e: KeyboardEvent) => {
        if (!isEditable || !setRating) {
            return;
        }
        if(e.code=='ArrowRight' || e.code =='ArrowUp') {
            if(!rating) {
                setRating(1);
            } else {
                e.preventDefault();
                setRating(rating < 5 ? rating++ : 5);
            }
            ratingArrayRef.current[rating]?.focus();
        }
        if(e.code=='ArrowLeft' || e.code =='ArrowDown') {
            e.preventDefault();
            setRating(rating < 1 ? rating-- : 1);
        }
    }
    return (
        <div  {...props} ref={ref} className={cn(className, styles.ratingWrapper,{[styles.error]: error, })}>
        {ratingArray.map((r, i) =>
            (<span key={i}>{r}</span>))}
        {error && <span className={styles.errorMessage}>{error.message}</span> }
        </div>
    )
});

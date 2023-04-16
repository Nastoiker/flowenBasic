import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "../../ui/alert-dialog"
import {DetailedHTMLProps, HTMLAttributes} from "react";
 interface ImageModalProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
     img: string;
 }

export const ImageModal = ({img, className}: ImageModalProps) => {
    return  <AlertDialog>
        <AlertDialogTrigger asChild>
            <img className={className} src={img} alt=""/>
        </AlertDialogTrigger>
        <AlertDialogContent>
            <img className={"w-full h-full"}   src={img} alt=""/>
            <AlertDialogFooter>
                <AlertDialogCancel>Закрыть</AlertDialogCancel>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
}

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
} from "../ui/alert-dialog"
import { Button } from "../ui/button"

export function ModalDeliverySite() {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button className={"px-0"} variant="ghost">Доставка и оплата</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Доставка и оплата</AlertDialogTitle>
                    <AlertDialogDescription>
                        Все заказы с шаблоном доставки, в котором используются методы от «Почты России» и AliExpress будут поступать в раздел Заказы — вам нужно создать отправление, распечатать ярлык, прикрепить лист передачи и отнести посылку в выбранное отделение «Почты России».
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Закрыть</AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
import { Htag } from "../Htag/Htag";
import { motion, AnimatePresence } from "framer-motion";
import { Alert, AlertDescription, AlertTitle } from "../../ui/alert/alert";
import { useEffect, useState } from "react";
export const NotifyAuth = ({
  timeOutValue = false,
}: {
  timeOutValue: boolean;
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (timeOutValue) return;
    const timeout = setTimeout(() => {
      setVisible(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);
  return (
    visible && (
      <Alert>
        <AlertTitle>Авторизируйтесь</AlertTitle>
        <AlertDescription>
          Вы не можете добавить товар в корзине не авторизировшись
        </AlertDescription>
      </Alert>
    )
  );
};

import { format } from "date-fns";
import { ru } from "date-fns/locale";

export function convertDate(date: Date) {
  return format(new Date(date.toString()), "dd MMMM yyyy", { locale: ru });
}

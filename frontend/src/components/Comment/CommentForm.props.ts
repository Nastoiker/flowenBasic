import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface CommentFormProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  modelProductId: string;
  userId: string;
}
export interface ICommentForm {
  title: string;
  comment: string;
  files: File;
  modelDeviceId: string;
}

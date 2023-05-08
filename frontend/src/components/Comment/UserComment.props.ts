export interface UserCommentProps {
  productId: string;
  images: string;
  title: string;
  description: string;
  date: Date;
  user: User;
}
interface User {
  avatar: string;
  login: string;
}

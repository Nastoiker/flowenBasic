import { userState } from "../../../store/slices/user.slice";
import { Htag } from "../../Htag/Htag";
import { useBanUserMutation } from "../../../store/slices/users.slice";
import { Button } from "../../../ui/button";

export const UserAdmin = ({
  user,
  onDelete,
}: {
  user: userState;
  onDelete: () => void;
}) => {
  return (
    <div className="p-10 flex flex-wrap justify-between items-center">
      <div>
        <Htag type="h2">login: {user.login}</Htag>
        <Htag type="h2">email: {user.email}</Htag>
      </div>
      <div className="sm:space-x-10">
        <span>Активирован:{user.isActive.toString()}</span>
        <Button onClick={onDelete}>Удалить юзера</Button>
      </div>
    </div>
  );
};

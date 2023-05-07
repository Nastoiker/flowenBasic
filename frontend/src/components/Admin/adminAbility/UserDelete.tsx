import { userState } from "../../../store/slices/user.slice"
import { Htag } from "../../Htag/Htag"
import {useBanUserMutation} from "../../../store/slices/users.slice";
import {Button} from "../../../ui/button";

export const UserAdmin = ({ user, onDelete }: {user: userState, onDelete: () => void}) => {

    return <div className="p-10 flex justify-between items-center">
        <div>
            <Htag type='h2'>{user.login}</Htag>
            <Htag type='h2'>{user.email}</Htag>
        </div>
        <div>
            <span>Активирован:{user.isActive.toString()}</span>
            <Button onClick={onDelete}>Удалить юзера</Button>
        </div>
    </div>
}
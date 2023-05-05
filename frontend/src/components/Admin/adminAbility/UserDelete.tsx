import { userState } from "../../../store/slices/user.slice"
import { Htag } from "../../Htag/Htag"

export const UserAdmin = ({ user }: {user: userState}) => {
    return <div className="p-10">
        <Htag type='h2'>{user.login}</Htag>
        <Htag type='h2'>{user.email}</Htag>
    </div>
}
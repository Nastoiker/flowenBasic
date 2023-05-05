import { UserAdmin } from "./UserDelete"

export const ContainerUserAdmin = ({ users }: { users: any[]} ) => {
    return <div className="bg-white p-10">
        {users.map(u => <UserAdmin user={u} />)}
        </div>
}
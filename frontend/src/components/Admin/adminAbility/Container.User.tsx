import { UserAdmin } from "./UserDelete";
import { useBanUserMutation } from "../../../store/slices/users.slice";
import { useEffect } from "react";

export const ContainerUserAdmin = ({
  users,
  onChange,
}: {
  users: any[];
  onChange: () => void;
}) => {
  const [banUser] = useBanUserMutation();
  const BunUserSubmit = async (id: string) => {
    await banUser({ id });
    onChange();
  };
  return (
    <div className="bg-white p-10">
      {users.map((u) => (
        <UserAdmin onDelete={() => BunUserSubmit(u.id)} key={u.id} user={u} />
      ))}
    </div>
  );
};

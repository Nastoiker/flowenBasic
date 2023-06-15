import { CreatePhone } from "../../components/Admin/createPhone";
import { CreateModel } from "../../components/Admin/createModel";
import { CreateSecondCategoryWithBrand } from "../../components/Admin/createSecondCategory";
import { CreateBrandsWIthSecond } from "../../components/Admin/createBrandsWIthSecond";
import { AddImageProduct } from "../../components/Admin/addImage.product";
import { useState } from "react";
import { Button } from "../../ui/button";
import { DeleteModel } from "../../components/Admin/deleteModelId";
import { DeleteProduct } from "../../components/Admin/delete.product";
import { useUsersQuery } from "../../store/slices/users.slice";
import { ContainerUserAdmin } from "../../components/Admin/adminAbility/Container.User";
import {useNavigate} from "react-router-dom";
import {useAppSelector} from "../../store";

const AdminPage = () => {
  const [currentCreate, setCurrentCreate] = useState<string>();
  const [currentSector, setCurrentSector] = useState<string>();
  const navigate = useNavigate();
    const user =useAppSelector(state=>state.user.user);
    const redirectTo = (to: string) => {
        navigate(to, { replace: true });
    };
  const users = useUsersQuery({});
    if(user?.email!=='damur2004@gmail.com') {
        redirectTo('/')
    }
  return (
    <div className={"h-full"}>
      <div className="flex justify-around my-10 text-white">
        <button className="bg-orange-500 px-5 py-2 rounded-full" onClick={() => {setCurrentSector('data')}}>Данные</button>
        <button className="bg-orange-500 px-5 py-2 rounded-full" onClick={() => { setCurrentSector('editData') }}>Создание и редактирование продуктов и категории</button>
      </div>
      {currentSector === 'data' && 
        <>
        
        
      <div className={"mx-5 space-y-2 sm:flex space-y-0 justify-around my-15"}>
        <Button onClick={() => setCurrentCreate("isAddImageProduct")}>
          isAddImageProduct
        </Button>
        <Button onClick={() => setCurrentCreate("isCreatePhone")}>
          isCreatePhone
        </Button>
        <Button onClick={() => setCurrentCreate("isCreateModel")}>
          isCreateModel
        </Button>
        <Button onClick={() => setCurrentCreate("deleteProduct")}>
          deleteProduct
        </Button>
        <Button onClick={() => setCurrentCreate("deleteModel")}>
          deleteModel
        </Button>
        <Button
          onClick={() => setCurrentCreate("isCreateSecondCategoryWithBrand")}
        >
          isCreateSecondCategoryWithBrand
        </Button>
        <Button onClick={() => setCurrentCreate("isCreateBrandsWIthSecond")}>
          isCreateBrandsWIthSecond
        </Button>
      </div>

      {currentCreate === "isAddImageProduct" && <AddImageProduct />}
      {currentCreate === "isCreatePhone" && <CreatePhone />}
      {currentCreate === "deleteModel" && <DeleteModel />}
      {currentCreate === "deleteProduct" && <DeleteProduct />}
      {currentCreate === "isCreateModel" && <CreateModel />}
      {currentCreate === "isCreateSecondCategoryWithBrand" && (
        <CreateSecondCategoryWithBrand />
      )}
      {currentCreate === "isCreateBrandsWIthSecond" && (
        <CreateBrandsWIthSecond />
        )}
        </>
      }
      {
        currentSector === 'editData' && 
        <>
         { users.data && (
        <ContainerUserAdmin
          onChange={() => users.refetch()}
          users={users.data}
        />
          )}
        </>
      }
     
    </div>
  );
};
export default AdminPage;

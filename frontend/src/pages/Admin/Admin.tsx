import {CreatePhone} from "../../components/Admin/createPhone";
import {CreateModel} from "../../components/Admin/createModel";
import {CreateSecondCategoryWithBrand} from "../../components/Admin/createSecondCategory";
import {CreateBrandsWIthSecond} from "../../components/Admin/createBrandsWIthSecond";
import {AddImageProduct} from "../../components/Admin/addImage.product";
import {useState} from "react";
import {Button} from "../../ui/button";

 const AdminPage = () => {
     const [isAddImageProduct, setIsOpenAddImageProduct] = useState<boolean>(false);
     const [isCreatePhone, setIsOpenCreatePhone] = useState<boolean>(false);
     const [isCreateModel, setIsOpenCreateModel] = useState<boolean>(false);
     const [isCreateSecondCategoryWithBrand, setIsCreateSecondCategoryWithBrand] = useState<boolean>(false);
     const [isCreateBrandsWIthSecond, setIsCreateBrandsWIthSecond] = useState<boolean>(false);
     return <div className={"h-full"}>
        <Button onClick={() => setIsOpenAddImageProduct(a => !a)}>isAddImageProduct</Button>
         {
             isAddImageProduct &&  <AddImageProduct />
         }
         <Button onClick={() => setIsOpenCreatePhone(a => !a)}>isCreatePhone</Button>
         {
             isCreatePhone &&  <CreatePhone />
         }
         <Button onClick={() => setIsOpenCreateModel(a => !a)}>isCreateModel</Button>
         {
             isCreateModel && <CreateModel />
         }
         <Button onClick={() => setIsCreateSecondCategoryWithBrand(a => !a)}>isCreateSecondCategoryWithBrand</Button>
         {
             isCreateSecondCategoryWithBrand && <CreateSecondCategoryWithBrand />
         }
         <Button onClick={() => setIsCreateBrandsWIthSecond(a => !a)}>isCreateBrandsWIthSecond</Button>
         {
             isCreateBrandsWIthSecond && <CreateBrandsWIthSecond />
         }



    </div>;
};
export default AdminPage;
import {CreatePhone} from "../../components/Admin/createPhone";
import {CreateModel} from "../../components/Admin/createModel";
import {CreateSecondCategoryWithBrand} from "../../components/Admin/createSecondCategory";
import {CreateBrandsWIthSecond} from "../../components/Admin/createBrandsWIthSecond";
import {AddImageProduct} from "../../components/Admin/addImage.product";

 const AdminPage = () => {
    return <div className={"h-full"}>
        <AddImageProduct />
        <CreatePhone />
        <CreateModel />
        <CreateSecondCategoryWithBrand />
        <CreateBrandsWIthSecond />
    </div>;
};
export default AdminPage;
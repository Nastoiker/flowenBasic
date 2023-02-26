import {CreatePhone} from "../../components/Admin/createPhone";
import {CreateModel} from "../../components/Admin/createModel";
import {CreateSecondCategoryWithBrand} from "../../components/Admin/createSecondCategory";
import {CreateBrandsWIthSecond} from "../../components/Admin/createBrandsWIthSecond";

 const AdminPage = () => {
    return <div>
        <CreatePhone />
        <CreateModel />
        <CreateSecondCategoryWithBrand />
        <CreateBrandsWIthSecond />
    </div>;
};
export default AdminPage;
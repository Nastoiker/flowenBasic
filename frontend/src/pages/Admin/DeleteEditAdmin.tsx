import { CreatePhone } from "../../components/Admin/createPhone";
import { CreateModel } from "../../components/Admin/createModel";
import { CreateSecondCategoryWithBrand } from "../../components/Admin/createSecondCategory";
import { CreateBrandsWIthSecond } from "../../components/Admin/createBrandsWIthSecond";
import { AddImageProduct } from "../../components/Admin/addImage.product";
import { useState } from "react";
import { Button } from "../../ui/button";
import { DeleteModel } from "../../components/Admin/deleteModelId";

const AdminPage = () => {
  const [currentCreate, setCurrentCreate] = useState<string>();
  return (
    <div className={"h-full"}>
      <div className={"flex justify-around my-15"}>
        <Button onClick={() => setCurrentCreate("isAddImageProduct")}>
          isAddImageProduct
        </Button>
        <Button onClick={() => setCurrentCreate("isCreatePhone")}>
          isCreatePhone
        </Button>
        <Button onClick={() => setCurrentCreate("isCreateModel")}>
          isCreateModel
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
      {currentCreate === "isCreatePhone" && <DeleteModel />}

      {currentCreate === "isCreateModel" && <CreateModel />}
      {currentCreate === "isCreateSecondCategoryWithBrand" && (
        <CreateSecondCategoryWithBrand />
      )}
      {currentCreate === "isCreateBrandsWIthSecond" && (
        <CreateBrandsWIthSecond />
      )}
    </div>
  );
};
export default AdminPage;

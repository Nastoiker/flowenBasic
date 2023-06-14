import { format } from "date-fns";
import { FooterProps } from "./Footer.props";
import { Input } from "../../ui/input";
import { Htag } from "../Htag/Htag";
import { Button } from "../../ui/button";
import {
  ModalRulesAboutSite,
} from "../../page-component/modal-aboutSite";
import { ModalDeliverySite } from "../../page-component/modal-aboutdelivery";
export const Footer = ({ className, ...props }: FooterProps): JSX.Element => {
  return (
    <footer
      className={
        "bg-zinc-800 w-full  text-white  bottom-0 z-50 py-20 px-4 sm:px-20 "
      }
    >
      <div className={"space-y-5 w-full mx-auto max-w-screen-xl "}>
        <div
          className={
            "space-y-5 sm:flex sm:space-y-0 justify-between items-center"
          }
        >
          <Htag type={"h2"}>Хотите первым узнавать о скидках в FLOVEN?</Htag>
          <div className={"flex"}>
            <Input type="email" placeholder="Email" />
            <Button className={""}>Подписаться</Button>
          </div>
        </div>
        <div className={"flex space-x-10"}>
          <div className={"space-y-5"}>
            <Htag type={"h2"}>ИНТЕРНЕТ-МАГАЗИН</Htag>
            <p>
              <ModalDeliverySite />{" "}
            </p>
          </div>
          <div className={"space-y-5"}>
            <Htag type={"h2"}>О КОМПАНИИ</Htag>
            <p>
              Телефон: <br />{" "}
              <a href={"tel:+7(900)-999-99-99"}>+7(900)-999-99-99</a>
            </p>
          </div>
        </div>
        <hr className={"my-5 green"} />
        <div className={"sm:flex  justify-between items-center"}>
          <ModalRulesAboutSite />
          <p>
            <a href="#" target="_blank">
              © 2004–2022 Группа компаний «FLOVEN»
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

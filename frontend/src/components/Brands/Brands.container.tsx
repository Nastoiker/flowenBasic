import { useState } from "react";
import {BrandsContainerProps} from "./Brands.container.props";
import { ReactComponent as ArrowIcon } from 'attow.svg';
import { useNavigate } from "react-router-dom";
import { Brand } from "./Brand";
export const BrandsContainer = ({ brands } : BrandsContainerProps) => {
  const [currentNumber, setCurrentNumber] = useState<number>();
  const [currentBrand, setCurrentBrand] = useState<boolean>();
  const navigate = useNavigate();
    const redirectTo =  (to: string) => {
        navigate('../../../' + to);
    };
    return <div className="">
      <button>
                  <ArrowIcon />
      </button>
        {
          brands.map( b => <Brand brand={b} isActive={currentBrand}/>)
        }
         <button>
          <ArrowIcon />
      </button>
      </div>
}
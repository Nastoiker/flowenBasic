interface Brand {
    name: string;
    img: string
}
export const Brand = ({ brand: Brand}) =>{
    return <div className="">
        <image src={brand.image} alt={'brand'}/>
    </div>
}
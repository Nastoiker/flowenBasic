import {useAppSelector} from "../../store";
import {useState} from "react";
import {secondLevelCategory} from "../../../interfaces/product.interfaces";
import {useForm} from "react-hook-form";
import {addImageForProduct, ICreateBrandWithSecondCategory, ICreateModel} from "../../../interfaces/admin.interface";
import {Label} from "../../ui/label";
import {Input} from "../../ui/input";
import axios from "axios";
import {DOMEN} from "../../../domen.api";
import {Htag} from "../Htag/Htag";
import {Button} from "../../ui/button";

export const AddImageProduct = () => {
    const allPhones = useAppSelector(state => state.phone.staticPhones);
    const {register, control, handleSubmit, formState: {errors}, reset} = useForm<addImageForProduct>();
    const onSubmit = async (formData: addImageForProduct) => {
        // @ts-ignore
        const form = { files: formData.files[0], productId: formData.productId };
        console.log(form);
        try {
            const {data} = await axios.post(DOMEN.admin.updatePictureProduct, {...form}, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRhbXVyMjAwNEBnbWFpbC5jb20iLCJpYXQiOjE2NzUzMzI2OTB9.T2hefmVdkX_Zg54NtF_OAg-6u0N6-uk8nqVcWn22Rbs',
                }});
            if  (data.message) {
                console.log(data.message);
                reset();
            }
        } catch(e) {
            if(e instanceof Error ) {
                console.log(e.message);
            }
        }
    }
    return <div>
        <form onSubmit={handleSubmit(onSubmit)}>
            <Htag type={"h1"}>Добавить фотографию</Htag>
            <select  id="productId"  className="mx-auto text-center block"  {...register('productId', {required: true})} >

                {
                    allPhones?.map( m => m.product.map(s =>  <option key={s.id} value={s.id}>{s.name}</option>))
                }
            </select>
            <Label htmlFor={'addImageFile'}>Добавить фотографию</Label>
            <Input type={'file'} {...register('files', {required: true})} id={"addImageFile"}/>
            <Button type={'submit'}>Добавить фотографию</Button>
        </form>

    </div>
}

import {useForm, Controller} from "react-hook-form";
import {ICommentForm} from "../Comment/CommentForm.props";
import {useEffect, useState} from "react";
import axios from "axios";
import {DOMEN} from "../../../domen.api";
import {Htag} from "../Htag/Htag";
import {Label} from "../../ui/label";
import {Button} from "../../ui/button";
import {Input} from "../Input/Input";
import {ICreateModel, ICreatePhone} from "../../../interfaces/admin.interface";
import {Textarea} from "../../ui/textarea";
import {ScrollArea} from "../../ui/scroll-area";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "../../ui/select";
import {useAppSelector} from "../../store";
import {secondLevelCategory} from "../../../interfaces/product.interfaces";

export const CreateModel = () => {
    const brands = useAppSelector(state => state.brands.brands);
    const FirstCategory = useAppSelector(state => state.firstCategory.category);
    const [secondCategory, setSecondCategory] = useState<secondLevelCategory[]>();
    const {register, control, handleSubmit, formState: {errors}, reset} = useForm<ICreateModel>();
    const [succes, setSuccesForm] = useState<boolean>(false);
    const [error, setErrorForm] = useState<string>();
    useEffect(() => {
        (async () => {
            const res  = await fetch('http://localhost:8000/product/byCategory', {
                method: 'post'
            });
            const categories = await res.json();
            await new Promise((resolve) => setTimeout(() => resolve(''), 1000));
            setSecondCategory(categories);
        })();
    },);
    const onSubmit = async (formData: ICreateModel) => {
        console.log(formData);

        try {
            const {data} = await axios.post(DOMEN.admin.createModel, {...formData}, {
                headers: {
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRhbXVyMjAwNEBnbWFpbC5jb20iLCJpYXQiOjE2NzUzMzI2OTB9.T2hefmVdkX_Zg54NtF_OAg-6u0N6-uk8nqVcWn22Rbs',
                }
            });
            if  (data.message) {
                setSuccesForm(true);
                reset();
            } else {
                setErrorForm('что-то пошло не так');
            }
            console.log('success');
        } catch(e) {
            if(e instanceof Error ) {
                setErrorForm(e.message);
            }
        }
    };


    return <div>
        <Htag type={"h2"}>Создать модели</Htag>

        <form action="" className="space-y-6 bg-white rounded-3xl text-center w-full" onSubmit={handleSubmit(onSubmit)}>
            <Label htmlFor={'name'}>Имя</Label>
            <Input error={errors.name} {...register('name', {required: true})} id={'name'}/>

            <Label htmlFor={'brandId'}>бренд</Label>
            <select  className="mx-auto text-center block"   {...register('brandId')} >
                {brands.map( b => {
                    return (
                        <option key={b.id}  value={b.id}>{b.name}</option>
                    );
                })}
            </select>

            <Label htmlFor={'secondCategoryId'}>secondCategoryId</Label>
            <select className="mx-auto text-center block"  {...register('secondCategoryId', {required: true})} >
                {secondCategory?.map( s => {
                    return (
                        <option key={s.id} value={s.id}>{s.name}</option>
                    );
                })}
            </select>
            <Button type={'submit'}> Создать</Button>
        </form>
    </div>
}
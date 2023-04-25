import {IItemsSlider, StaticSliderProps} from "./StaticSliderProps";
import {useState} from "react";
import {Htag} from "../Htag/Htag";
export const StaticSlider = ({items, title}: StaticSliderProps) : JSX.Element=> {
    const [selected, setSelected] = useState<IItemsSlider>();
    return <div>
        <Htag type={"h2"}>{title}</Htag>
        <div className={'text-white my-5 mx-auto justify-center sm:flex items-center'}>
            <div   key={items[0].title} className="bg-zinc-800 w-fit p-5 px-16 m-10 rounded-2xl text-center hover:scale-110 transition-all">
                <img src={items[0].picture} />
                <h2>{items[0].title}</h2>
                <h5>{items[0].subtitle}</h5>
            </div>
            <div className={" grid  grid-cols-2 gap-5 "}>
                {items.map((item, index ) => { if(index===1) { return; } return (
                    <div  className="mx-auto bg-zinc-800 text-center w-fit sm:w-56  h-fit  p-5 rounded-2xl text-center hover:scale-110 transition-all"  >
                        <img className={"mx-auto"} width={120} src={item.picture} />
                        <h5>{item.subtitle}</h5>
                        <h2>{item.title}</h2>
                    </div>
                ) } )}
            </div>

        </div>
    </div>

    {/*<AnimatePresence>*/}
    {/*    {selected && (*/}
    {/*        <motion.div   animate={{ scale: 1.2 }} onClick={() => setSelected(null)} exit={{ opacity: 0 }} className="bg-black w-fit" layoutId={selected.id}>*/}
    {/*            <motion.img src={selected.picture} />*/}
    {/*            <motion.h5>{selected.subtitle}</motion.h5>*/}
    {/*            <motion.h2>{selected.title}</motion.h2>*/}
    {/*        </motion.div>*/}
    {/*    )}*/}
    {/*</AnimatePresence>*/}

};

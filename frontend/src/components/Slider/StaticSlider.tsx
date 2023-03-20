import { motion, AnimatePresence } from 'framer-motion';
import {IItemsSlider, StaticSliderProps} from "./StaticSliderProps";
import {useState} from "react";
export const StaticSlider = ({items}: StaticSliderProps) : JSX.Element=> {
    const [selected, setSelected] = useState<IItemsSlider>();
    return <>
            <div className={'flex items-center'}>
                <motion.div  whileHover={{ scale: 1.1} } key={items[0].title} className="bg-gray-800 w-fit p-5 m-5 rounded-3xl text-center " layoutId={items[0].title}>
                    <motion.img src={items[0].picture} />
                    <motion.h2>{items[0].title}</motion.h2>
                    <motion.h5>{items[0].subtitle}</motion.h5>
                </motion.div>
                <div className={" grid  grid-cols-2 gap-5 "}>
                    {items.map((item, index ) => { if(index===1) { return; } return (
                        <motion.div whileHover={{ scale: 1.1} } key={item.title} className="   bg-gray-800 w-fit  h-fit  p-5 rounded-3xl text-center" layoutId={item.title} >
                            <motion.img width={120} src={item.picture} />
                            <motion.h5>{item.subtitle}</motion.h5>
                            <motion.h2>{item.title}</motion.h2>
                        </motion.div>
                    ) } )}
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
    </>;

};

import type { Goal } from "../types"
import { Cancel } from "../assets/svgs";
import {motion} from 'framer-motion'
import { Pencil } from "../assets/svgs";

const GoalDetails = ({onClose, goal}:{onClose: ()=> void; goal: Goal | undefined}) => {
  if (!goal) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-center flex-col w-full" onClick={onClose}>
        <div className="m-auto w-10/12" onClick={(e)=> e.stopPropagation()} >
            <div className="flex flex-row items-center bg-[#1C2B3C] py-8 justify-between text-[#D4E4FA] font-bold text-xl rounded-t-xl border-[#3C4A46] border-2 flex-1 min-w-0">
                <h2 className="pl-5 wrap-break-word flex-1 min-h-0">{goal.title}</h2>
                <div className="pr-5 pl-2" onClick={onClose}><Cancel height={20} width={20} /></div>
            </div>  
            <div className="bg-[#1C2B3C] flex flex-col px-3 pt-5 border-[#3C4A46] rounded-b-xl border-x-2 border-b-2 pb-5">
                <span className="text-[15px] text-[#BACAC5] font-bold px-3 py-2">Descripcion *</span>
                <p className="px-3 text-[#D4E4FA] mb-2">{goal.description}</p>
                <span className="text-[15px] text-[#BACAC5] font-bold px-3 py-2">Fecha de creacion *</span>
                <p className="px-3 text-[#D4E4FA] mb-2">{goal.timeline.startDate.split('T')[0]}</p>
                <span className="text-[15px] text-[#BACAC5] font-bold px-3 py-2">Fecha limite *</span>
                <p className="px-3 text-[#D4E4FA] mb-2">{goal.timeline.endDate.split('T')[0]}</p>
                <motion.button whileTap={{scale:1.1}} whileHover={{scale:0.9}} className=" items-center p-2  rounded-full bg-[#57F1DB] font-bold text-[#003731] text-xs self-end"><Pencil height={20} width={20}/></motion.button>
            </div>
            
        </div>
    </div>
  )
}

export default GoalDetails

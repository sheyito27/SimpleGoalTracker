import {Mas} from '../assets/svgs'

function HomePage(){

    return (
        <div className="flex-1">
            <h1 className="text-[#D4E4FA] text-2xl font-bold mt-7 ml-5">Mis metas</h1>
            <button className="fixed bottom-6 right-6 w-20 h-20 rounded-full bg-[#57F1DB] text-4xl flex justify-center items-center font-bold"><Mas /></button>
        </div>
    )
}

export default HomePage
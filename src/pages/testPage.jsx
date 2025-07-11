import { useState } from "react";

export default function TestPage(){
    const [count,setCount] = useState(0)
    

    function increment(){
        setCount(count + 1);
    }

    function decrement(){
        setCount(count - 1);
    }

    return(
        <div className="w-full h-screen bg-amber-200 flex justify-center items-center">
            <div className="w-[400px] h-[400px] bg-white flex flex-col justify-center items-center">
                <h1 className="text-3xl font-bold">{count}</h1>
                <div className="w-full h-[80px] flex justify-center items-center">
                    <button onClick={decrement} className="w-[90px] h-[40px] bg-blue-600 flex justify-center items-center text-white rounded-full text-3xl mx-2">
                        -
                    </button>
                    <button onClick={increment} className="w-[90px] h-[40px] bg-blue-600 flex justify-center items-center text-white rounded-full text-3xl mx-2">
                        +
                    </button>
                </div>
                
            </div>
        </div>
    );
}
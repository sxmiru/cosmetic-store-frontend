import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import toast from "react-hot-toast";
import UploadFile from "../utils/mediaUpload";
import Loader from "../components/loader";


export default function TestPage(){
    const [file, setfile] = useState(null);

    function handleUpload(){
        UploadFile(file).then(
            (url)=>{
                console.log(url);
            }
        ).catch(
            (error)=>{
                console.error("Upload failed:", error);
                toast.error("Upload failed: " + error);
            }
        )
    }

    // return(
    //     <div className="w-full h-full flex justify-center items-center">
    //         <input type="file" onChange={
    //             (e)=>{
    //                 setfile(e.target.files[0]);
    //             }
    //         }/>
    //         <button onClick={handleUpload} className="bg-blue-500 text-white p-2 rounded-lg">
    //             Upload
    //         </button>
    //     </div>
    // );
    return (
        <Loader/>
    );
}
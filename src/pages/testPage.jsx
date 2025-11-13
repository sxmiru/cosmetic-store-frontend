import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import uploadFile from "../utils/mediaUpload.jsx";
import toast from "react-hot-toast";

const url = "https://tsxsxbetowapbmdrnugq.supabase.co"
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRzeHN4YmV0b3dhcGJtZHJudWdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIzMzQ1NzYsImV4cCI6MjA2NzkxMDU3Nn0.H8BBmITixWMafCc4ocgLvUTe4o_BrbISxbYz6XMrgow"

const supabase = createClient(url,key);


export default function TestPage(){

    const [file,setFile] = useState(null);

    //USING IMAGE UPLOAD UTILITY
    function handleUpload(){
        uploadFile(file).then(
            (url)=>{
                console.log(url)
                toast.success("File uploaded successfully")
            }
        ).catch(
            (error)=>{
                console.error("Error uploading file", error);
                toast.error("Error uploading file");
            }
        )
    }

    // // BASIC IMAGE UPLOAD CODE!!!
    // function handleUpload(){
    //     console.log(file);

    //     if(file == null){
    //         toast.error("Please select a file to upload");
    //         return;
    //     }

    //     supabase.storage.from("images").upload(file.name, file, {
    //         cacheControl: '3600',
    //         upsert: false
    //     }).then(
    //         ()=>{
    //             toast.success("File upoaded successfully")
    //             const publicurl = supabase.storage.from("images").getPublicUrl(file.name);
    //             console.log("Public URL:", publicurl);
    //         }
    //     ).catch(
    //         (error)=>{
    //         console.error("Error uploading file", error);
    //         toast.error("Error uploading file")
    //         }
    //     )
    // }

    return (
        <div>
            <input type="file" onChange={
                (e)=>{
                    console.log(e.target.files)
                    setFile(e.target.files[0]);
                }
            } />
            <button className="w-[60px] h-[30px] border-black border-2 bg-blue-500 text-white" onClick={handleUpload}>
                Upload
            </button>
        </div>
    );
}
import { createClient } from "@supabase/supabase-js";
import toast from "react-hot-toast";

const url = "https://tsxsxbetowapbmdrnugq.supabase.co"
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRzeHN4YmV0b3dhcGJtZHJudWdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIzMzQ1NzYsImV4cCI6MjA2NzkxMDU3Nn0.H8BBmITixWMafCc4ocgLvUTe4o_BrbISxbYz6XMrgow"


const supabase = createClient(url, key);

export default function UploadFile(file){
    const promise = new Promise(
        (resolve, reject)=>{
            if(file == null){
                reject("Please select a file to upload");
                return;
            }

            const timeStamp = new Date().getTime();
            const fileName = timeStamp + "-" + file.name;

            supabase.storage.from("images").upload(fileName, file, {
                cacheControl: '3600',
                upsert: false
            }).then(
                ()=>{
                    const publicUrl = supabase.storage.from("images").getPublicUrl(fileName).data.publicUrl;
                    console.log("Public URL:", publicUrl);
                    resolve(publicUrl);
                    toast.success("File uploaded successfully!");
                }
            ).catch(
                (error)=>{
                    console.error("Error uploading file:", error);
                    reject("Failed to upload file");
                    toast.error("Failed to upload file: " + error.message);
                }
                
            )
        }
    )
    return promise;
}
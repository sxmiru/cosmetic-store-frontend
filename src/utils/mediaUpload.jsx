const url = "https://tsxsxbetowapbmdrnugq.supabase.co"
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRzeHN4YmV0b3dhcGJtZHJudWdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIzMzQ1NzYsImV4cCI6MjA2NzkxMDU3Nn0.H8BBmITixWMafCc4ocgLvUTe4o_BrbISxbYz6XMrgow"

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(url,key);

export default function uploadFile(file){

    const promise = new Promise(
        (ressolve, reject)=>{
            
            if(file == null){
                reject("Please select a file to upload")
                return;
            }

            const timeStamp =  new Date().getTime();
            const fileName = timeStamp + "-" + file.name;

            supabase.storage.from("images").upload(fileName, file, {
                cacheControl: '3600',
                uspert: 'fasle'
            }).then(
                ()=>{
                    const publicUrl = supabase.storage.from("images").getPublicUrl(fileName).data.publicUrl;
                    ressolve(publicUrl);
                }
            ).catch(
                (error)=>{
                    console.error("Error uploading file", error);
                    reject("Failed to upload file");
                }
            )

        }
    )
    return promise;
}
import {useEffect,useState} from "react";
export function useToast(){const [message,setMessage]=useState("");useEffect(()=>{if(!message)return;const id=setTimeout(()=>setMessage(""),2800);return()=>clearTimeout(id)},[message]);return{message,show:setMessage,hide:()=>setMessage("")}}

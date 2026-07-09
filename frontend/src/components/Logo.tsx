import { HeartPulse } from "lucide-react";
export function Logo({compact=false}:{compact?:boolean}){return <div className="logo"><span className="logoMark"><HeartPulse size={22}/></span>{!compact&&<span><b>CareVoice</b><small>Patient experience</small></span>}</div>}

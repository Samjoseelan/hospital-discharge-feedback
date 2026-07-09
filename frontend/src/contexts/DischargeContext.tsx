import {createContext,useContext,useEffect,useMemo,useState,type ReactNode} from "react";
import QRCode from "qrcode";
import {patientData} from "../lib/data";
import type {DischargeRecord,Patient,QRStatus} from "../types";

const FEEDBACK_ORIGIN="http://localhost:5175";
const tokenFor=(seed:string)=>`fb_${seed.replace(/\D/g,"").slice(-4)}${Math.random().toString(36).slice(2,8).toUpperCase()}`;
const discharged=patientData.filter(p=>p.status==="Discharged");
const ready=patientData.filter(p=>p.status==="Discharge planned");
const initialRecords:DischargeRecord[]=[
  ...discharged.map((patient,index)=>{const feedbackToken=index===0?"fb_8G72KLM29":tokenFor(patient.id);return{dischargeId:`DIS-2026-${1048-index}`,patient,billingStatus:"Completed" as const,dischargeStatus:"Discharged" as const,feedbackToken,feedbackUrl:`${FEEDBACK_ORIGIN}/feedback/${feedbackToken}`,qrCodeDataUrl:"",qrStatus:index===3?"Disabled" as const:"Active" as const,scanCount:[3,1,5,0][index]??0,lastScannedAt:["Today, 10:14","Today, 08:52","Yesterday, 17:20","Never"][index]??"Never",feedbackSubmitted:index===1,feedbackStatus:index===1?"Submitted" as const:"Pending" as const,createdAt:patient.discharge,submittedAt:index===1?"Today, 09:06":undefined,referenceNumber:index===1?"FB-2480":undefined}}),
  ...ready.map((patient,index)=>({dischargeId:`READY-${index+1}`,patient,billingStatus:index===0?"Completed" as const:"Pending" as const,dischargeStatus:"Ready" as const,feedbackToken:"",feedbackUrl:"",qrCodeDataUrl:"",qrStatus:"Disabled" as const,scanCount:0,lastScannedAt:"Never",feedbackSubmitted:false,feedbackStatus:"Pending" as const,createdAt:"—"})),
];

type DischargeStore={
  records:DischargeRecord[];
  markDischarged:(dischargeId:string)=>Promise<DischargeRecord|null>;
  setQRStatus:(dischargeId:string,status:QRStatus)=>void;
  regenerateQR:(dischargeId:string)=>Promise<void>;
  recordScan:(token:string)=>void;
  submitFeedback:(token:string)=>string|null;
  findByToken:(token:string)=>DischargeRecord|undefined;
  findByPatient:(patientId:string)=>DischargeRecord|undefined;
};
const Context=createContext<DischargeStore|null>(null);
const makeQR=(url:string)=>QRCode.toDataURL(url,{width:360,margin:2,color:{dark:"#173b45",light:"#ffffff"}});

export function DischargeProvider({children}:{children:ReactNode}){
  const [records,setRecords]=useState(initialRecords);
  useEffect(()=>{let live=true;Promise.all(records.filter(r=>r.feedbackUrl&&!r.qrCodeDataUrl).map(async r=>[r.dischargeId,await makeQR(r.feedbackUrl)] as const)).then(items=>{if(live&&items.length)setRecords(current=>current.map(r=>{const found=items.find(x=>x[0]===r.dischargeId);return found?{...r,qrCodeDataUrl:found[1]}:r}))});return()=>{live=false}},[]);
  const markDischarged=async(dischargeId:string)=>{const current=records.find(r=>r.dischargeId===dischargeId);if(!current||current.dischargeStatus!=="Ready"||current.billingStatus!=="Completed")return null;const token=tokenFor(current.patient.id);const url=`${FEEDBACK_ORIGIN}/feedback/${token}`;const updated:DischargeRecord={...current,dischargeId:`DIS-2026-${1050+records.filter(r=>r.dischargeStatus==="Discharged").length}`,patient:{...current.patient,status:"Discharged",discharge:new Date().toLocaleDateString("en-GB",{day:"2-digit",month:"short",year:"numeric"})},dischargeStatus:"Discharged",feedbackToken:token,feedbackUrl:url,qrCodeDataUrl:await makeQR(url),qrStatus:"Active",feedbackStatus:"Pending",createdAt:"Just now"};setRecords(v=>v.map(r=>r.dischargeId===dischargeId?updated:r));return updated};
  const setQRStatus=(id:string,status:QRStatus)=>setRecords(v=>v.map(r=>r.dischargeId===id?{...r,qrStatus:status}:r));
  const regenerateQR=async(id:string)=>{const current=records.find(r=>r.dischargeId===id);if(!current||current.qrStatus==="Active")return;const token=tokenFor(current.patient.id);const url=`${FEEDBACK_ORIGIN}/feedback/${token}`;const data=await makeQR(url);setRecords(v=>v.map(r=>r.dischargeId===id?{...r,feedbackToken:token,feedbackUrl:url,qrCodeDataUrl:data,qrStatus:"Active",scanCount:0,lastScannedAt:"Never"}:r))};
  const recordScan=(token:string)=>setRecords(v=>v.map(r=>r.feedbackToken===token?{...r,scanCount:r.scanCount+1,lastScannedAt:"Just now"}:r));
  const submitFeedback=(token:string)=>{const current=records.find(r=>r.feedbackToken===token);if(!current||current.feedbackSubmitted)return null;const reference=`FB-${Math.floor(100000+Math.random()*900000)}`;setRecords(v=>v.map(r=>r.feedbackToken===token?{...r,feedbackSubmitted:true,feedbackStatus:"Submitted",submittedAt:"Just now",referenceNumber:reference}:r));return reference};
  const value=useMemo<DischargeStore>(()=>({records,markDischarged,setQRStatus,regenerateQR,recordScan,submitFeedback,findByToken:token=>records.find(r=>r.feedbackToken===token),findByPatient:id=>records.find(r=>r.patient.id===id)}),[records]);
  return <Context.Provider value={value}>{children}</Context.Provider>;
}
export function useDischarges(){const value=useContext(Context);if(!value)throw new Error("useDischarges must be used within DischargeProvider");return value}

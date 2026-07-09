import type { Complaint,Department,Doctor,Feedback,Patient,QRItem,Report } from "../types";
export const feedback:Feedback[]=[
{id:"FB-2481",patient:"Aarav Mehta",department:"Cardiology",doctor:"Dr. Neha Kapoor",rating:5,nps:10,date:"Today, 09:42",comment:"The nurses were exceptionally kind and explained every medicine."},
{id:"FB-2480",patient:"Meera Iyer",department:"Orthopaedics",doctor:"Dr. Vikram Shah",rating:4,nps:9,date:"Today, 08:16",comment:"A smooth discharge. The room was clean and comfortable."},
{id:"FB-2479",patient:"Kabir Singh",department:"Neurology",doctor:"Dr. Ananya Rao",rating:3,nps:7,date:"Yesterday",comment:"Good care, though billing took longer than expected.",complaint:true},
{id:"FB-2478",patient:"Sara Khan",department:"Maternity",doctor:"Dr. Riya Sen",rating:5,nps:10,date:"Yesterday",comment:"We felt safe, heard and cared for throughout."},
{id:"FB-2477",patient:"Rohan Das",department:"General Medicine",doctor:"Dr. Arjun Menon",rating:2,nps:4,date:"07 Jul",comment:"Medicine delivery was delayed.",complaint:true},
];
export const complaints:Complaint[]=[
{id:"CMP-1042",patient:"Kabir Singh",category:"Billing",priority:"Medium",status:"In progress",assignee:"Priya N.",age:"18h"},
{id:"CMP-1041",patient:"Rohan Das",category:"Medicine",priority:"High",status:"Pending",assignee:"Unassigned",age:"1d"},
{id:"CMP-1040",patient:"Diya Patel",category:"Housekeeping",priority:"Low",status:"Resolved",assignee:"Manoj K.",age:"2d"},
];
export const trend=[{day:"Mon",score:82},{day:"Tue",score:86},{day:"Wed",score:84},{day:"Thu",score:90},{day:"Fri",score:92},{day:"Sat",score:88},{day:"Sun",score:94}];
export const departments=[{name:"Maternity",score:96,color:"#0f9f8f"},{name:"Cardiology",score:92,color:"#33a6c6"},{name:"Orthopaedics",score:88,color:"#67b66f"},{name:"Neurology",score:84,color:"#8c83ce"}];
export const patientData:Patient[]=[
{id:"HSP-204891",name:"Aarav Mehta",age:54,gender:"Male",ward:"Cardiac Care",room:"C-204",department:"Cardiology",doctor:"Dr. Neha Kapoor",admission:"02 Jul 2026",discharge:"09 Jul 2026",status:"Discharged"},
{id:"HSP-204890",name:"Meera Iyer",age:42,gender:"Female",ward:"Ortho Ward",room:"O-118",department:"Orthopaedics",doctor:"Dr. Vikram Shah",admission:"03 Jul 2026",discharge:"10 Jul 2026",status:"Discharge planned"},
{id:"HSP-204889",name:"Kabir Singh",age:61,gender:"Male",ward:"Neuro Care",room:"N-302",department:"Neurology",doctor:"Dr. Ananya Rao",admission:"05 Jul 2026",discharge:"—",status:"Admitted"},
{id:"HSP-204888",name:"Sara Khan",age:29,gender:"Female",ward:"Maternity",room:"M-105",department:"Maternity",doctor:"Dr. Riya Sen",admission:"06 Jul 2026",discharge:"09 Jul 2026",status:"Discharged"},
{id:"HSP-204887",name:"Rohan Das",age:67,gender:"Male",ward:"General Ward",room:"G-221",department:"General Medicine",doctor:"Dr. Arjun Menon",admission:"01 Jul 2026",discharge:"08 Jul 2026",status:"Discharged"},
{id:"HSP-204886",name:"Diya Patel",age:35,gender:"Female",ward:"Cardiac Care",room:"C-211",department:"Cardiology",doctor:"Dr. Neha Kapoor",admission:"07 Jul 2026",discharge:"—",status:"Admitted"},
{id:"HSP-204885",name:"Nikhil Jain",age:48,gender:"Male",ward:"Surgical Ward",room:"S-110",department:"General Surgery",doctor:"Dr. Karan Sethi",admission:"04 Jul 2026",discharge:"10 Jul 2026",status:"Discharge planned"},
{id:"HSP-204884",name:"Anika Roy",age:73,gender:"Female",ward:"Neuro Care",room:"N-307",department:"Neurology",doctor:"Dr. Ananya Rao",admission:"30 Jun 2026",discharge:"07 Jul 2026",status:"Discharged"},
{id:"HSP-204883",name:"Vivaan Nair",age:12,gender:"Male",ward:"Paediatrics",room:"P-108",department:"Paediatrics",doctor:"Dr. Ishita Bose",admission:"08 Jul 2026",discharge:"—",status:"Admitted"},
{id:"HSP-204882",name:"Tara Joshi",age:31,gender:"Female",ward:"Maternity",room:"M-112",department:"Maternity",doctor:"Dr. Riya Sen",admission:"08 Jul 2026",discharge:"11 Jul 2026",status:"Discharge planned"},
];
export const doctorData:Doctor[]=[
{id:"DOC-101",name:"Dr. Neha Kapoor",department:"Cardiology",specialization:"Interventional Cardiology",patients:184,rating:4.9,feedback:156,experience:14,email:"neha.kapoor@carevoice.health"},
{id:"DOC-102",name:"Dr. Vikram Shah",department:"Orthopaedics",specialization:"Joint Replacement",patients:162,rating:4.7,feedback:139,experience:18,email:"vikram.shah@carevoice.health"},
{id:"DOC-103",name:"Dr. Ananya Rao",department:"Neurology",specialization:"Clinical Neurology",patients:147,rating:4.6,feedback:128,experience:12,email:"ananya.rao@carevoice.health"},
{id:"DOC-104",name:"Dr. Riya Sen",department:"Maternity",specialization:"Obstetrics & Gynaecology",patients:201,rating:4.9,feedback:188,experience:11,email:"riya.sen@carevoice.health"},
{id:"DOC-105",name:"Dr. Arjun Menon",department:"General Medicine",specialization:"Internal Medicine",patients:226,rating:4.5,feedback:174,experience:16,email:"arjun.menon@carevoice.health"},
{id:"DOC-106",name:"Dr. Karan Sethi",department:"General Surgery",specialization:"Laparoscopic Surgery",patients:133,rating:4.6,feedback:106,experience:13,email:"karan.sethi@carevoice.health"},
{id:"DOC-107",name:"Dr. Ishita Bose",department:"Paediatrics",specialization:"Paediatric Medicine",patients:194,rating:4.8,feedback:169,experience:10,email:"ishita.bose@carevoice.health"},
];
export const departmentData:Department[]=[
{name:"Maternity",feedback:438,rating:4.8,complaints:9,satisfaction:96,nps:78,color:"#149b8b"},
{name:"Cardiology",feedback:412,rating:4.7,complaints:12,satisfaction:92,nps:72,color:"#3b9fc5"},
{name:"Paediatrics",feedback:356,rating:4.7,complaints:8,satisfaction:91,nps:70,color:"#68af72"},
{name:"Orthopaedics",feedback:389,rating:4.5,complaints:18,satisfaction:88,nps:64,color:"#8b7ec8"},
{name:"Neurology",feedback:318,rating:4.4,complaints:21,satisfaction:84,nps:58,color:"#e19d49"},
{name:"General Medicine",feedback:341,rating:4.3,complaints:26,satisfaction:82,nps:54,color:"#df7378"},
];
export const wardData=[{name:"Cardiac Care",score:94,feedback:286},{name:"Maternity",score:96,feedback:301},{name:"Neuro Care",score:84,feedback:218},{name:"Ortho Ward",score:88,feedback:247},{name:"General Ward",score:81,feedback:264}];
export const analyticsTrend=[{date:"03 Jul",feedback:112,nps:62,psat:86},{date:"04 Jul",feedback:128,nps:64,psat:87},{date:"05 Jul",feedback:119,nps:63,psat:85},{date:"06 Jul",feedback:142,nps:67,psat:89},{date:"07 Jul",feedback:151,nps:66,psat:90},{date:"08 Jul",feedback:138,nps:69,psat:91},{date:"09 Jul",feedback:164,nps:72,psat:93}];
export const complaintCategories=[{name:"Billing",value:34},{name:"Housekeeping",value:24},{name:"Medicine",value:19},{name:"Food",value:14},{name:"Clinical care",value:9}];
export const reportData:Report[]=[
{id:"RPT-0831",name:"Monthly patient experience",period:"01–30 Jun 2026",department:"All departments",format:"PDF",created:"01 Jul 2026, 09:30",size:"2.4 MB"},
{id:"RPT-0830",name:"Cardiology satisfaction",period:"01–30 Jun 2026",department:"Cardiology",format:"Excel",created:"30 Jun 2026, 16:18",size:"842 KB"},
{id:"RPT-0829",name:"Complaint resolution audit",period:"01 Apr–30 Jun 2026",department:"All departments",format:"CSV",created:"29 Jun 2026, 11:42",size:"186 KB"},
{id:"RPT-0828",name:"Doctor performance summary",period:"01–31 May 2026",department:"All departments",format:"PDF",created:"02 Jun 2026, 08:15",size:"3.1 MB"},
];
export const qrData:QRItem[]=[
{id:"QR-0184",scope:"Department",assignedTo:"Cardiology",created:"09 Jul 2026",scans:142,status:"Active"},
{id:"QR-0183",scope:"Ward",assignedTo:"Maternity Ward",created:"07 Jul 2026",scans:98,status:"Active"},
{id:"QR-0182",scope:"Doctor",assignedTo:"Dr. Ananya Rao",created:"03 Jul 2026",scans:67,status:"Active"},
{id:"QR-0181",scope:"Room",assignedTo:"C-204",created:"01 Jul 2026",scans:31,status:"Paused"},
];
export const departmentsList=departmentData.map(d=>d.name);
export const wards=["Cardiac Care","Ortho Ward","Neuro Care","Maternity","General Ward","Surgical Ward","Paediatrics"];

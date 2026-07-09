export type Feedback={id:string;patient:string;department:string;doctor:string;rating:number;nps:number;date:string;comment:string;complaint?:boolean};
export type Complaint={id:string;patient:string;category:string;priority:"High"|"Medium"|"Low";status:"Pending"|"In progress"|"Resolved";assignee:string;age:string};
export type Patient={id:string;name:string;age:number;gender:string;ward:string;room:string;department:string;doctor:string;admission:string;discharge:string;status:"Admitted"|"Discharged"|"Discharge planned"};
export type Doctor={id:string;name:string;department:string;specialization:string;patients:number;rating:number;feedback:number;experience:number;email:string};
export type Department={name:string;feedback:number;rating:number;complaints:number;satisfaction:number;nps:number;color:string};
export type Report={id:string;name:string;period:string;department:string;format:"PDF"|"Excel"|"CSV";created:string;size:string};
export type QRItem={id:string;scope:string;assignedTo:string;created:string;scans:number;status:"Active"|"Paused"};
export type QRStatus="Active"|"Disabled"|"Expired";
export type FeedbackStatus="Pending"|"Submitted";
export type BillingStatus="Completed"|"Pending";
export type DischargeStatus="Ready"|"Discharged";
export type DischargeRecord={
  dischargeId:string;patient:Patient;billingStatus:BillingStatus;dischargeStatus:DischargeStatus;
  feedbackToken:string;feedbackUrl:string;qrCodeDataUrl:string;qrStatus:QRStatus;
  scanCount:number;lastScannedAt:string;feedbackSubmitted:boolean;feedbackStatus:FeedbackStatus;
  createdAt:string;submittedAt?:string;referenceNumber?:string;
};

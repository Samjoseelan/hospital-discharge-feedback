import {useEffect,useRef,useState} from "react";
import {Bell,CheckCheck,ChevronDown,CircleHelp,Clock3,FileCheck2,Hospital,LogOut,Menu,MessageSquareHeart,QrCode,Search,Settings,ShieldAlert,SlidersHorizontal,UserRound} from "lucide-react";
import {useNavigate} from "react-router-dom";
import {Modal} from "./Modal";
import {Toast} from "./Toast";
import {useToast} from "../hooks/useToast";

type AdminProfile={name:string;role:string;email:string;phone:string;hospital:string;lastLogin:string};
type Notification={id:number;title:string;detail:string;time:string;unread:boolean;type:"feedback"|"complaint"|"qr"|"report"|"alert"};

const initialNotifications:Notification[]=[
  {id:1,title:"New feedback submitted",detail:"Aarav Mehta rated Cardiology 5 stars.",time:"4 min ago",unread:true,type:"feedback"},
  {id:2,title:"Complaint assigned",detail:"CMP-1042 was assigned to Priya N.",time:"18 min ago",unread:true,type:"complaint"},
  {id:3,title:"QR code generated",detail:"A new QR code was created for Maternity Ward.",time:"1 hour ago",unread:true,type:"qr"},
  {id:4,title:"Report ready",detail:"June patient experience report is ready.",time:"2 hours ago",unread:false,type:"report"},
  {id:5,title:"Low satisfaction alert",detail:"General Medicine PSAT fell below 80%.",time:"Yesterday",unread:true,type:"alert"},
];

const notificationIcon={feedback:MessageSquareHeart,complaint:ShieldAlert,qr:QrCode,report:FileCheck2,alert:ShieldAlert};

export function Header({onMenu}:{onMenu?:()=>void}){
  const navigate=useNavigate();
  const toast=useToast();
  const notificationRef=useRef<HTMLDivElement>(null);
  const profileRef=useRef<HTMLDivElement>(null);
  const [panel,setPanel]=useState<"notifications"|"profile"|null>(null);
  const [notifications,setNotifications]=useState(initialNotifications);
  const [profile,setProfile]=useState<AdminProfile>({name:"Arjun Kumar",role:"Hospital administrator",email:"arjun.kumar@carevoice.health",phone:"+91 98765 43210",hospital:"CareVoice Central Hospital",lastLogin:"9 July 2026, 08:42 AM"});
  const [profileModal,setProfileModal]=useState(false);
  const [editing,setEditing]=useState(false);
  const [draft,setDraft]=useState(profile);
  const unread=notifications.filter(n=>n.unread).length;
  const initials=profile.name.split(" ").map(x=>x[0]).slice(0,2).join("").toUpperCase();

  useEffect(()=>{
    const outside=(event:MouseEvent)=>{const target=event.target as Node;if(!notificationRef.current?.contains(target)&&!profileRef.current?.contains(target))setPanel(null)};
    const escape=(event:KeyboardEvent)=>{if(event.key==="Escape"){setPanel(null);setProfileModal(false)}};
    document.addEventListener("mousedown",outside);document.addEventListener("keydown",escape);
    return()=>{document.removeEventListener("mousedown",outside);document.removeEventListener("keydown",escape)};
  },[]);

  const openSettings=(section:string)=>{setPanel(null);navigate("/admin/settings");toast.show(`${section} opened`)};
  const saveProfile=()=>{setProfile(draft);setEditing(false);toast.show("Profile updated successfully")};
  const logout=()=>{setPanel(null);if(window.confirm("Are you sure you want to log out?")){toast.show("You have been logged out safely");navigate("/admin")}};

  return <header className="header">
    <button className="mobileMenu" onClick={onMenu} aria-label="Open navigation menu"><Menu/></button>
    <div className="search"><Search size={18}/><input aria-label="Search hospital records" placeholder="Search feedback, patients, complaints…"/></div>
    <div className="headerActions">
      <div className="headerPopover" ref={notificationRef}>
        <button className="iconBtn" aria-label={`Notifications, ${unread} unread`} aria-expanded={panel==="notifications"} onClick={()=>setPanel(v=>v==="notifications"?null:"notifications")}><Bell size={19}/>{unread>0&&<span className="notificationCount">{unread}</span>}</button>
        {panel==="notifications"&&<div className="dropdownPanel notificationPanel" role="dialog" aria-label="Notifications">
          <div className="dropdownHead"><div><h3>Notifications</h3><p>{unread?`${unread} unread updates`:"You’re all caught up"}</p></div>{unread>0&&<button onClick={()=>{setNotifications(v=>v.map(n=>({...n,unread:false})));toast.show("All notifications marked as read")}}><CheckCheck size={15}/>Mark all as read</button>}</div>
          <div className="notificationList">{notifications.map(n=>{const Icon=notificationIcon[n.type];return <button key={n.id} className={`notificationItem ${n.unread?"unread":""}`} onClick={()=>setNotifications(v=>v.map(x=>x.id===n.id?{...x,unread:false}:x))}><span className={`notificationIcon ${n.type}`}><Icon size={17}/></span><span><b>{n.title}</b><small>{n.detail}</small><em><Clock3 size={11}/>{n.time}</em></span>{n.unread&&<i/>}</button>})}</div>
          <button className="dropdownFooter" onClick={()=>{setPanel(null);toast.show("All notifications are displayed")}}>View all notifications</button>
        </div>}
      </div>
      <div className="headerPopover" ref={profileRef}>
        <button className="profile" aria-label="Open user profile menu" aria-expanded={panel==="profile"} onClick={()=>setPanel(v=>v==="profile"?null:"profile")}><span>{initials}</span><div><b>{profile.name}</b><small>{profile.role}</small></div><ChevronDown size={16} className={panel==="profile"?"rotated":""}/></button>
        {panel==="profile"&&<div className="dropdownPanel profilePanel" role="menu">
          <div className="profileMenuHead"><span>{initials}</span><div><b>{profile.name}</b><small>{profile.email}</small></div></div>
          <div className="profileMenuGroup">
            <button role="menuitem" onClick={()=>{setPanel(null);setDraft(profile);setEditing(false);setProfileModal(true)}}><UserRound/>My Profile</button>
            <button role="menuitem" onClick={()=>openSettings("Account settings")}><Settings/>Account Settings</button>
            <button role="menuitem" onClick={()=>openSettings("Hospital profile")}><Hospital/>Hospital Profile</button>
            <button role="menuitem" onClick={()=>openSettings("Notification preferences")}><SlidersHorizontal/>Notification Preferences</button>
            <button role="menuitem" onClick={()=>{setPanel(null);toast.show("Help centre opened — support is available 24/7")}}><CircleHelp/>Help & Support</button>
          </div>
          <button className="profileLogout" role="menuitem" onClick={logout}><LogOut/>Logout</button>
        </div>}
      </div>
    </div>
    {profileModal&&<Modal title={editing?"Edit profile":"My profile"} onClose={()=>{setProfileModal(false);setEditing(false)}}><div className="adminProfileHero"><span>{initials}</span><div><h3>{profile.name}</h3><p>{profile.role}</p></div></div>{editing?<div className="adminProfileForm"><label>Full name<input value={draft.name} onChange={e=>setDraft({...draft,name:e.target.value})}/></label><label>Email address<input type="email" value={draft.email} onChange={e=>setDraft({...draft,email:e.target.value})}/></label><label>Phone number<input value={draft.phone} onChange={e=>setDraft({...draft,phone:e.target.value})}/></label><div className="modalActions"><button className="secondary" onClick={()=>{setEditing(false);setDraft(profile)}}>Cancel</button><button className="primary" onClick={saveProfile} disabled={!draft.name.trim()||!draft.email.trim()}>Save changes</button></div></div>:<><div className="adminDetails">{[["Role",profile.role],["Email",profile.email],["Phone",profile.phone],["Hospital",profile.hospital],["Last login",profile.lastLogin]].map(([label,value])=><div key={label}><small>{label}</small><b>{value}</b></div>)}</div><div className="profileModalActions"><button className="primary" onClick={()=>setEditing(true)}><UserRound size={16}/>Edit Profile</button></div></>}</Modal>}
    {toast.message&&<Toast message={toast.message} onClose={toast.hide}/>}
  </header>
}

/* ============================================================
   Student OS — Vision (Vanilla HTML/CSS/JS build)
============================================================ */
const uid = () => Math.random().toString(36).slice(2,10);
const fmtDate = d => { const y=d.getFullYear(), m=String(d.getMonth()+1).padStart(2,'0'), day=String(d.getDate()).padStart(2,'0'); return `${y}-${m}-${day}`; };
const daysInMonth = (y,m) => new Date(y,m+1,0).getDate();
const firstWeekday = (y,m) => new Date(y,m,1).getDay();
const WEEKDAYS = ["أحد","اثنين","ثلاثاء","أربعاء","خميس","جمعة","سبت"];
const MONTHS = ["يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر"];
function relativeTime(ts){
  if(!ts) return "لم يسجّل الدخول بعد";
  const diff = Date.now()-ts, mins = Math.floor(diff/60000);
  if(mins<1) return "الآن";
  if(mins<60) return `منذ ${mins} دقيقة`;
  const hrs = Math.floor(mins/60);
  if(hrs<24) return `منذ ${hrs} ساعة`;
  return `منذ ${Math.floor(hrs/24)} يوم`;
}
function daysUntil(dateStr){
  const today = new Date("2026-08-24T00:00:00");
  const target = new Date(dateStr+"T00:00:00");
  return Math.ceil((target-today)/86400000);
}
function esc(s){ return String(s??"").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c])); }

/* ---------------- i18n (lightweight) ---------------- */
const I18N = {
  "الرئيسية":"Home","المهام":"Tasks","المواد الدراسية":"Subjects","الاختبارات":"Exams","التقويم":"Calendar",
  "الأهداف":"Goals","الملاحظات":"Notes","الإحصائيات":"Statistics","الإعدادات":"Settings",
  "مرحبًا بك 👋":"Welcome 👋","اليوم هو يوم رائع للتقدم خطوة نحو هدفك. ⭐":"Today is a great day to move toward your goal. ⭐",
  "مرحبًا بك!":"Welcome!","استمر في التقدم نحو أهدافك 🌟":"Keep progressing toward your goals 🌟",
  "المهام القادمة":"Upcoming Tasks","عرض الكل":"View all","أهدافك":"Your Goals","إحصائيات":"Stats",
  "المهام اليوم":"Today's Tasks","مهام متبقية":"tasks left","الاختبارات القادمة":"Upcoming Exams","اختبارات":"exams",
  "مواد":"subjects","نسبة الإنجاز":"Completion","إجمالي المهام":"Total Tasks","المهام المنجزة":"Completed Tasks",
  "طالب":"Student","تسجيل الخروج":"Log out","بحث...":"Search...",
  "اقترب موعد اختبار الرياضيات":"Math exam is coming up","لديك مهام مستحقة اليوم":"You have tasks due today",
  "تم تحديث تقدم هدف «معدل ممتاز»":"Progress updated for “Excellent GPA” goal",
  "تسجيل الدخول":"Log in","أدخل بياناتك للمتابعة إلى حسابك":"Enter your details to continue to your account",
  "اسم المستخدم":"Username","كلمة المرور":"Password","دخول":"Log in","جارٍ التحقق...":"Checking...",
  "الرجاء إدخال اسم المستخدم وكلمة المرور":"Please enter your username and password",
  "بيانات الدخول غير صحيحة":"Incorrect login details",
  "تم تعطيل هذا الحساب، يرجى التواصل مع المسؤول":"This account is disabled, please contact the admin",
  "المظهر":"Appearance","الوضع الليلي":"Dark mode","يبدّل شكل الواجهة بالكامل":"Switches the whole interface look",
  "حفظ الملف الشخصي":"Save profile","إضافة":"Add","حفظ":"Save","إلغاء":"Cancel","حذف":"Delete",
  "تم حفظ التغييرات":"Changes saved",
  "متوسط الدرجات حسب المادة":"Average Grades by Subject","حالة المهام":"Task Status","منجزة":"Done","متبقية":"Remaining",
  "المهام المكتملة":"Completed Tasks","عدد المواد":"Subjects Count",
  "لوحة تحكم المسؤول":"Admin Dashboard","إجمالي الطلاب":"Total Students","متصلون الآن":"Online Now",
  "غير متصلين":"Offline","حسابات معطّلة":"Disabled Accounts","إنشاء حساب طالب":"Create Student Account",
  "ابحث بالاسم أو اسم المستخدم...":"Search by name or username...","الكل":"All","متصل":"Online","غير متصل":"Offline","معطّل":"Disabled",
  "لا توجد مهام بعد — أضف مهمتك الأولى":"No tasks yet — add your first one",
  "لا توجد أهداف بعد":"No goals yet",
  "لا توجد مهام مطابقة":"No matching tasks","مهمة جديدة":"New task","لا توجد مواد بعد":"No subjects yet","مادة جديدة":"New subject",
  "لا توجد اختبارات مضافة":"No exams added","اختبار جديد":"New exam","هدف جديد":"New goal","لا توجد ملاحظات بعد":"No notes yet","ملاحظة جديدة":"New note",
  "المؤقتات":"Timers","بومودورو":"Pomodoro","الجولات":"Rounds","وقت التركيز":"Focus time","وقت الاستراحة":"Break time",
  "إيقاف مؤقت":"Pause","ابدأ":"Start","إعادة تعيين":"Reset","دقائق التركيز":"Focus minutes","دقائق الاستراحة":"Break minutes",
  "ساعة إيقاف":"Stopwatch","عداد تنازلي":"Countdown","عدد الدقائق":"Minutes","جرعة تحفيز":"Motivation Boost",
  "دعاء":"Dua","تحفيز":"Motivation","عبارة جديدة":"New quote",
  "انتهت فترة التركيز! خذ استراحة قصيرة ☕":"Focus session done! Take a short break ☕",
  "انتهت الاستراحة، بالتوفيق بجولة جديدة 💪":"Break's over, good luck with a new round 💪",
  "انتهى الوقت! ⏰":"Time's up! ⏰","تم تسجيل الخروج":"Logged out","لا توجد تنبيهات حاليًا":"No notifications right now",
  "الجدول":"Schedule","حديث":"Hadith","مسح":"Dismiss","مسح كل التنبيهات":"Clear all notifications","تم مسح التنبيهات":"Notifications cleared",
  "الاسم المعروض":"Display name","الرجاء إدخال الاسم المعروض":"Please enter a display name","تم تحديث الاسم المعروض 🎉":"Display name updated 🎉",
  "بدون انتهاء":"No expiry","منتهي":"Expired","تم النسخ 📋":"Copied 📋","تم نسخ كلمة المرور 📋":"Password copied 📋","تعذّر النسخ، انسخه يدويًا":"Couldn't copy, copy it manually",
  "اسم المستخدم لا يمكن تغييره، تواصل مع المسؤول عند الحاجة":"Username can't be changed — contact the admin if needed",
  "لا توجد حصص في الجدول — أضف يومًا ووقتًا لموادك من صفحة المواد الدراسية":"No classes yet — add a day and time to your subjects from the Subjects page",
};
function t(ar){ return S.lang==="en" ? (I18N[ar] ?? ar) : ar; }
function toggleLang(){ S.lang = S.lang==="ar" ? "en" : "ar"; render(); }

/* ---------------- storage (Supabase) ---------------- */
const ONLINE_WINDOW_MS = 40000, HEARTBEAT_MS = 15000;

// SUPABASE_URL / SUPABASE_ANON_KEY تُعرّف في index.html قبل تحميل هذا الملف.
// إذا ما عدّلتهما بعد، db تضل null والموقع يشتغل مؤقتًا بالذاكرة بدون حفظ
// (بدل ما ينهار) — انظر try/catch بالأسفل.
const db = (typeof supabase !== "undefined"
  && typeof SUPABASE_URL === "string" && SUPABASE_URL.startsWith("http")
  && typeof SUPABASE_ANON_KEY === "string" && SUPABASE_ANON_KEY.length > 10)
  ? supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

async function storeGet(key, shared){
  if(!db) return null;
  try{
    const { data, error } = await db.from("vision_data").select("value").eq("key", key).maybeSingle();
    if(error) throw error;
    return data ? data.value : null;
  }catch(e){ console.error("Supabase read failed:", e.message); return null; }
}
async function storeSet(key, value, shared){
  if(!db) return false;
  try{
    const { error } = await db.from("vision_data").upsert({ key, value, updated_at: new Date().toISOString() });
    if(error) throw error;
    return true;
  }catch(e){ console.error("Supabase write failed:", e.message); return false; }
}

/* ============================================================
   كلمات مرور قوية + انتهاء صلاحية الحسابات
============================================================ */
function generateStrongPassword(len=12){
  const upper="ABCDEFGHJKLMNPQRSTUVWXYZ", lower="abcdefghijkmnpqrstuvwxyz", digits="23456789", symbols="!@#$%&*";
  const all = upper+lower+digits+symbols;
  let pass = [
    upper[Math.floor(Math.random()*upper.length)],
    lower[Math.floor(Math.random()*lower.length)],
    digits[Math.floor(Math.random()*digits.length)],
    symbols[Math.floor(Math.random()*symbols.length)],
  ];
  for(let i=pass.length;i<len;i++) pass.push(all[Math.floor(Math.random()*all.length)]);
  for(let i=pass.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [pass[i],pass[j]]=[pass[j],pass[i]]; }
  return pass.join("");
}
async function copyText(text, label){
  try{
    await navigator.clipboard.writeText(text);
    toast(label || t("تم النسخ 📋"));
  }catch(e){
    toast(t("تعذّر النسخ، انسخه يدويًا"),"danger");
  }
}
const EXPIRY_PRESETS = [
  {v:"none", days:0,  label:"بدون انتهاء (يدوي فقط)"},
  {v:"7",    days:7,  label:"7 أيام"},
  {v:"30",   days:30, label:"30 يوم (شهر)"},
  {v:"60",   days:60, label:"60 يوم (شهرين)"},
  {v:"90",   days:90, label:"90 يوم (3 أشهر)"},
  {v:"custom", days:0, label:"مخصص (عدد أيام)"},
];
function expirySelectHtml(id){
  return `<select id="${id}" onchange="document.getElementById('${id}_custom').style.display=this.value==='custom'?'block':'none';">
    ${EXPIRY_PRESETS.map(o=>`<option value="${o.v}">${o.label}</option>`).join("")}
  </select>
  <input id="${id}_custom" type="number" min="1" placeholder="عدد الأيام" style="display:none;margin-top:8px;" />`;
}
function readExpirySelection(selectId){
  const v = document.getElementById(selectId).value;
  if(v==="none") return null;
  if(v==="custom"){
    const n = parseInt(document.getElementById(selectId+"_custom").value, 10);
    if(!n || n<1) return {error:true};
    return Date.now() + n*86400000;
  }
  return Date.now() + parseInt(v,10)*86400000;
}
function fmtExpiry(acc){
  if(!acc.expiresAt) return {text:t("بدون انتهاء"), tone:"default"};
  const daysLeft = Math.ceil((acc.expiresAt - Date.now())/86400000);
  if(daysLeft<=0) return {text:t("منتهي"), tone:"danger"};
  if(daysLeft<=3) return {text:(S.lang==="en"?`Expires in ${daysLeft}d`:`ينتهي خلال ${daysLeft} يوم`), tone:"danger"};
  const d = new Date(acc.expiresAt);
  const dateStr = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
  return {text:(S.lang==="en"?`Until ${dateStr}`:`حتى ${dateStr}`), tone: daysLeft<=7 ? "gold" : "default"};
}
function applyExpirations(list){
  let changed=false;
  const out = list.map(a=>{
    if(a.role==="student" && a.status==="active" && a.expiresAt && Date.now()>=a.expiresAt){
      changed=true;
      return {...a, status:"disabled", online:false, autoDisabledAt:Date.now()};
    }
    return a;
  });
  return {list:out, changed};
}

function seedAccounts(){
  return [
    { id:uid(), username:"admin", password:"Vision@2026", role:"admin", name:"مدير النظام", status:"active", online:false, lastActive:null, createdAt:Date.now(), expiresAt:null },
    { id:uid(), username:"sara", password:"Sara@123", role:"student", name:"سارة العلي", status:"active", online:false, lastActive:null, createdAt:Date.now(), expiresAt:null },
    { id:uid(), username:"khaled", password:"Khaled@123", role:"student", name:"خالد المطيري", status:"active", online:false, lastActive:null, createdAt:Date.now(), expiresAt:null },
    { id:uid(), username:"nora", password:"Nora@123", role:"student", name:"نورة الزهراني", status:"disabled", online:false, lastActive:null, createdAt:Date.now(), expiresAt:null },
  ];
}
function seedWorkspace(){
  return {
    dismissedNotifs: [],
    subjects: [
      { id:uid(), name:"الرياضيات", teacher:"أ. سالم العتيبي", hours:4, color:"#0F2345", avgGrade:92, day:"الأحد", time:"08:00", reminder:15 },
      { id:uid(), name:"الفيزياء", teacher:"أ. نورة القحطاني", hours:3, color:"#C8A15A", avgGrade:87, day:"الأحد", time:"10:30", reminder:10 },
      { id:uid(), name:"الكيمياء", teacher:"أ. فهد الدوسري", hours:3, color:"#2F7D5D", avgGrade:90, day:"الاثنين", time:"09:00", reminder:15 },
      { id:uid(), name:"الحاسب", teacher:"أ. منى الحربي", hours:2, color:"#7A7A7A", avgGrade:95, day:"الثلاثاء", time:"11:00", reminder:0 },
      { id:uid(), name:"اللغة الإنجليزية", teacher:"أ. عبدالله الشمري", hours:3, color:"#B4483C", avgGrade:84, day:"الأربعاء", time:"08:30", reminder:30 },
      { id:uid(), name:"الأحياء", teacher:"أ. ريم الغامدي", hours:2, color:"#16305F", avgGrade:88, day:"الخميس", time:"13:00", reminder:10 },
    ],
    tasks: [
      { id:uid(), title:"حل واجب الرياضيات", subject:"الرياضيات", date:"2026-08-25", done:false },
      { id:uid(), title:"تقرير مادة الفيزياء", subject:"الفيزياء", date:"2026-08-26", done:false },
      { id:uid(), title:"مراجعة درس الكيمياء", subject:"الكيمياء", date:"2026-08-27", done:false },
      { id:uid(), title:"تحضير مشروع الحاسب", subject:"الحاسب", date:"2026-08-28", done:false },
      { id:uid(), title:"قراءة فصل الأحياء الثالث", subject:"الأحياء", date:"2026-08-24", done:true },
      { id:uid(), title:"حفظ مفردات اللغة الإنجليزية", subject:"اللغة الإنجليزية", date:"2026-08-24", done:true },
    ],
    exams: [
      { id:uid(), subject:"الرياضيات", date:"2026-09-02", time:"09:00", place:"قاعة 3", notes:"الفصول 1-4" },
      { id:uid(), subject:"الفيزياء", date:"2026-09-05", time:"11:00", place:"قاعة 1", notes:"قوانين نيوتن" },
      { id:uid(), subject:"الكيمياء", date:"2026-09-10", time:"10:00", place:"المختبر 2", notes:"الجدول الدوري" },
    ],
    goals: [
      { id:uid(), title:"تحقيق معدل ممتاز", progress:65, deadline:"2026-12-20", priority:"عالية", status:"قيد التنفيذ" },
      { id:uid(), title:"إنهاء مشروع التخرج", progress:30, deadline:"2026-11-01", priority:"عالية", status:"قيد التنفيذ" },
      { id:uid(), title:"قراءة 5 كتب هذا الفصل", progress:80, deadline:"2026-12-01", priority:"متوسطة", status:"قيد التنفيذ" },
    ],
    notes: [
      { id:uid(), title:"ملخص نظرية الأعداد", content:"أهم القوانين والنظريات المتعلقة بالأعداد الأولية...", updatedAt:"2026-08-20" },
      { id:uid(), title:"أفكار مشروع الحاسب", content:"بناء تطبيق لإدارة المهام باستخدام JavaScript...", updatedAt:"2026-08-22" },
    ],
    events: [
      { id:uid(), date:"2026-08-25", title:"واجب الرياضيات", type:"task" },
      { id:uid(), date:"2026-09-02", title:"اختبار الرياضيات", type:"exam" },
      { id:uid(), date:"2026-08-27", title:"اجتماع فريق المشروع", type:"event" },
    ],
  };
}

/* ---------------- global state ---------------- */
const S = {
  dark:false, ready:false,
  accounts:[], workspace:null,
  screen:"loading", // loading | login | student | admin
  currentUser:null,
  loginBusy:false, loginError:"",
  sidebarOpen:false, page:"dashboard",
  notifOpen:false, profileOpen:false,
  modal:null, confirm:null, toasts:[],
  adminQuery:"", adminFilter:"الكل",
  taskQuery:"", taskFilter:"الكل", taskSortAsc:true,
  calCursor: new Date(2026,7,1), miniCalCursor:new Date(2026,7,1), miniSelected:fmtDate(new Date(2026,7,24)),
  lang:"ar",
};
let heartbeatTimer=null, adminPollTimer=null;

function toast(message, tone="success"){
  const id = uid();
  S.toasts.push({id,message,tone});
  render();
  setTimeout(()=>{ S.toasts = S.toasts.filter(t=>t.id!==id); render(); }, 3200);
}
function openModal(m){ S.modal=m; render(); }
function closeModal(){ S.modal=null; render(); }
function askConfirm(message, onYes){ S.confirm={message, onYes}; render(); }
function closeConfirm(){ S.confirm=null; render(); }

/* ---------------- icons (inline svg, lucide-like) ---------------- */
const ICONS = {
  home:'<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/><path d="M9 21v-6h6v6"/>',
  tasks:'<path d="M9 6h11M9 12h11M9 18h11"/><path d="M4 6h.01M4 12h.01M4 18h.01"/>',
  book:'<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z"/>',
  examcheck:'<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M9 2v4M15 2v4M9 14l2 2 4-4"/>',
  calendar:'<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
  target:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.2" fill="currentColor"/>',
  note:'<path d="M15 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M15 3v6h6"/>',
  chart:'<path d="M3 3v18h18"/><rect x="7" y="12" width="3" height="6"/><rect x="12" y="8" width="3" height="10"/><rect x="17" y="5" width="3" height="13"/>',
  settings:'<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1 1.55V21a2 2 0 0 1-4 0v-.09a1.7 1.7 0 0 0-1-1.55 1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.7 1.7 0 0 0 .34-1.87 1.7 1.7 0 0 0-1.55-1H3a2 2 0 0 1 0-4h.09a1.7 1.7 0 0 0 1.55-1 1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.7 1.7 0 0 0 1.87.34H9a1.7 1.7 0 0 0 1-1.55V3a2 2 0 0 1 4 0v.09a1.7 1.7 0 0 0 1 1.55 1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.7 1.7 0 0 0-.34 1.87V9a1.7 1.7 0 0 0 1.55 1H21a2 2 0 0 1 0 4h-.09a1.7 1.7 0 0 0-1.55 1z"/>',
  search:'<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>',
  bell:'<path d="M6 8a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6"/><path d="M10 21a2 2 0 0 0 4 0"/>',
  chevdown:'<path d="m6 9 6 6 6-6"/>',
  menu:'<path d="M4 6h16M4 12h16M4 18h16"/>',
  x:'<path d="M18 6 6 18M6 6l12 12"/>',
  plus:'<path d="M12 5v14M5 12h14"/>',
  trash:'<path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14"/>',
  copy:'<rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/>',
  edit:'<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/>',
  check:'<path d="M20 6 9 17l-5-5"/>',
  sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  moon:'<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/>',
  logout:'<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5"/><path d="M21 12H9"/>',
  userplus:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M19 8v6M22 11h-6"/>',
  userx:'<path d="M13 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="8" cy="7" r="4"/><path d="m17 8 5 5M22 8l-5 5"/>',
  usercheck:'<path d="M13 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="8" cy="7" r="4"/><path d="m16 11 2 2 4-4"/>',
  wifi:'<path d="M5 12.5a11 11 0 0 1 14 0"/><path d="M8.5 16a6 6 0 0 1 7 0"/><path d="M12 19.5h.01"/>',
  wifioff:'<path d="M2 8.8a11 11 0 0 1 3-1.9M22 8.8a11 11 0 0 0-9-3.3M5 12.5a11 11 0 0 1 3.3-1.9M8.5 16a6 6 0 0 1 7 0M12 19.5h.01M2 2l20 20"/>',
  key:'<circle cx="7.5" cy="15.5" r="4.5"/><path d="m10.5 12.5 8-8M16 7l2 2M19 4l2 2"/>',
  users:'<circle cx="9" cy="7" r="4"/><path d="M2 21v-2a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v2"/><path d="M17 3.5a4 4 0 0 1 0 7.5M23 21v-2a4 4 0 0 0-3-3.9"/>',
  eye:'<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>',
  eyeoff:'<path d="M17.9 17.9A10.4 10.4 0 0 1 12 19c-6.5 0-10-7-10-7a18.3 18.3 0 0 1 4.2-5.2M9.9 4.2A9.7 9.7 0 0 1 12 4c6.5 0 10 7 10 7a18.4 18.4 0 0 1-2.2 3.1M14.1 14.1a3 3 0 1 1-4.2-4.2M2 2l20 20"/>',
  shield:'<path d="M12 2 4 5v6c0 5.2 3.4 9.7 8 11 4.6-1.3 8-5.8 8-11V5Z"/>',
  rocket:'<path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09Z"/><path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 19 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2Z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>',
  sparkle:'<path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8"/>',
  mappin:'<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
  clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/>',
  trend:'<path d="M3 17 9 11 13 15 21 7"/><path d="M15 7h6v6"/>',
  alert:'<circle cx="12" cy="12" r="9"/><path d="M12 8v5M12 16h.01"/>',
  checkcircle:'<circle cx="12" cy="12" r="9"/><path d="m9 12 2 2 4-4"/>',
  arrowsort:'<path d="m7 15 5 5 5-5M7 9l5-5 5 5"/>',
  grad:'<path d="m2 9 10-5 10 5-10 5-10-5Z"/><path d="M6 11v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5"/>',
};
function icon(name,size=18){ return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${ICONS[name]||""}</svg>`; }

/* ---------------- small helpers ---------------- */
function card(inner, style=""){ return `<div class="card" style="${style}">${inner}</div>`; }
function progressBar(val, thin=false){ return `<div class="progress-track ${thin?'thin':''}"><div class="progress-fill" style="width:${Math.min(100,Math.max(0,val))}%"></div></div>`; }
function badge(text, tone="default"){ return `<span class="badge ${tone}">${text}</span>`; }
function emptyState(iconName, text){ return `<div class="empty-state"><div class="circle">${icon(iconName,22)}</div><p style="font-size:14px;margin:0;">${esc(text)}</p></div>`; }

/* ============================================================
   TIMERS + MOTIVATION (Pomodoro / Stopwatch / Countdown)
============================================================ */
let pomo = { workMin:25, breakMin:5, remaining:25*60, mode:"work", running:false, cycles:0 };
let stopwatch = { elapsed:0, running:false };
let countdown = { totalSec:5*60, remaining:5*60, running:false };
let timersTickHandle = null;

const MOTIVATION_ITEMS = [
  // ===== أدعية =====
  {type:"dua", text:"رَبِّ زِدْنِي عِلْمًا 🤍"},
  {type:"dua", text:"اللَّهُمَّ لا سَهْلَ إِلَّا مَا جَعَلْتَهُ سَهْلًا، وَأَنْتَ تَجْعَلُ الْحَزَنَ إِذَا شِئْتَ سَهْلًا"},
  {type:"dua", text:"رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي"},
  {type:"dua", text:"اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا، وَرِزْقًا طَيِّبًا، وَعَمَلًا مُتَقَبَّلًا"},
  {type:"dua", text:"اللَّهُمَّ افْتَحْ عَلَيَّ فَتْحَ العَارِفِينَ، وَارْزُقْنِي فَهْمَ النَّبِيِّينَ"},
  {type:"dua", text:"اللَّهُمَّ أَعِنِّي وَلا تُعِنْ عَلَيَّ، وَانْصُرْنِي وَلا تَنْصُرْ عَلَيَّ"},
  {type:"dua", text:"حَسْبِيَ اللَّهُ وَنِعْمَ الوَكِيل"},
  {type:"dua", text:"اللَّهُمَّ بَارِكْ لِي فِي وَقْتِي، وَاجْعَلْ جُهْدِي مَقْبُولًا"},
  {type:"dua", text:"اللَّهُمَّ ثَبِّتْ مَا حَفِظْتُ، وَذَكِّرْنِي مَا نَسِيتُ"},
  {type:"dua", text:"رَبَّنَا آتِنَا مِنْ لَدُنْكَ رَحْمَةً وَهَيِّئْ لَنَا مِنْ أَمْرِنَا رَشَدًا"},
  {type:"dua", text:"اللَّهُمَّ نَوِّرْ بِالكِتَابِ بَصَرِي، وَاشْرَحْ بِهِ صَدْرِي"},
  {type:"dua", text:"اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ العَجْزِ وَالكَسَلِ"},
  {type:"dua", text:"اللَّهُمَّ اجْعَلْ عَمَلِي كُلَّهُ صَالِحًا وَلِوَجْهِكَ خَالِصًا"},
  {type:"dua", text:"تَوَكَّلْتُ عَلَى اللَّهِ، لا حَوْلَ وَلا قُوَّةَ إِلَّا بِاللَّهِ"},
  {type:"dua", text:"اللَّهُمَّ أَلْهِمْنِي الصَّوَابَ وَسَدِّدْ خُطَايَ"},
  {type:"dua", text:"اللَّهُمَّ ارْزُقْنِي هِمَّةً لا تَفْتُرُ وَعَزِيمَةً لا تَلِينُ"},
  {type:"dua", text:"اللَّهُمَّ اجْعَلْ لِي مِنْ كُلِّ هَمٍّ فَرَجًا، وَمِنْ كُلِّ ضِيقٍ مَخْرَجًا"},
  {type:"dua", text:"رَبِّ أَوْزِعْنِي أَنْ أَشْكُرَ نِعْمَتَكَ الَّتِي أَنْعَمْتَ عَلَيَّ"},
  {type:"dua", text:"اللَّهُمَّ إِنِّي أَسْأَلُكَ التَّوْفِيقَ فِي كُلِّ خُطْوَةٍ أَخْطُوهَا"},
  {type:"dua", text:"اللَّهُمَّ اجْعَلْ هَذَا اليَوْمَ خَيْرًا مِنْ أَمْسِي"},
  {type:"dua", text:"اللَّهُمَّ إِنِّي أَسْتَخِيرُكَ بِعِلْمِكَ وَأَسْتَعِينُكَ بِقُدْرَتِكَ"},
  {type:"dua", text:"اللَّهُمَّ لَكَ الحَمْدُ عَلَى كُلِّ حَالٍ، وَعَلَى كُلِّ نِعْمَةٍ"},
  {type:"dua", text:"اللَّهُمَّ اصْرِفْ عَنِّي الغَفْلَةَ، وَاشْغَلْنِي بِمَا يَنْفَعُنِي"},
  {type:"dua", text:"اللَّهُمَّ اجْعَلْ فِي قَلْبِي نُورًا وَفِي عَقْلِي فَهْمًا"},
  {type:"dua", text:"اللَّهُمَّ إِنِّي أَسْأَلُكَ الثَّبَاتَ حَتَّى آخِرِ الطَّرِيقِ"},

  // ===== أحاديث نبوية صحيحة (البخاري ومسلم) =====
  {type:"hadith", text:"«مَنْ سَلَكَ طَرِيقًا يَطْلُبُ فِيهِ عِلْمًا سَلَكَ اللَّهُ بِهِ طَرِيقًا إِلَى الجَنَّةِ» — رواه مسلم"},
  {type:"hadith", text:"«إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى» — رواه البخاري ومسلم"},
  {type:"hadith", text:"«مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَاليَوْمِ الآخِرِ فَلْيَقُلْ خَيْرًا أَوْ لِيَصْمُتْ» — رواه البخاري ومسلم"},
  {type:"hadith", text:"«المُؤْمِنُ القَوِيُّ خَيْرٌ وَأَحَبُّ إِلَى اللَّهِ مِنَ المُؤْمِنِ الضَّعِيفِ، وَفِي كُلٍّ خَيْرٌ» — رواه مسلم"},
  {type:"hadith", text:"«احْرِصْ عَلَى مَا يَنْفَعُكَ» — رواه مسلم"},
  {type:"hadith", text:"«لا تَحْقِرَنَّ مِنَ المَعْرُوفِ شَيْئًا» — رواه مسلم"},
  {type:"hadith", text:"«الدِّينُ النَّصِيحَةُ» — رواه مسلم"},
  {type:"hadith", text:"«مَنْ لا يَشْكُرِ النَّاسَ لا يَشْكُرِ اللَّهَ» — رواه أحمد والترمذي"},
  {type:"hadith", text:"«إِنَّ اللَّهَ يُحِبُّ إِذَا عَمِلَ أَحَدُكُمْ عَمَلًا أَنْ يُتْقِنَهُ» — رواه البيهقي"},
  {type:"hadith", text:"«اتَّقِ اللَّهَ حَيْثُمَا كُنْتَ، وَخَالِقِ النَّاسَ بِخُلُقٍ حَسَنٍ» — رواه الترمذي"},
  {type:"hadith", text:"«أَحَبُّ الأَعْمَالِ إِلَى اللَّهِ أَدْوَمُهَا وَإِنْ قَلَّ» — رواه البخاري ومسلم"},
  {type:"hadith", text:"«لا يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لِأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ» — رواه البخاري ومسلم"},
  {type:"hadith", text:"«الطُّهُورُ شَطْرُ الإِيمَانِ» — رواه مسلم"},
  {type:"hadith", text:"«مَنْ صَمَتَ نَجَا» — رواه الترمذي"},
  {type:"hadith", text:"«المُسْلِمُ مَنْ سَلِمَ المُسْلِمُونَ مِنْ لِسَانِهِ وَيَدِهِ» — رواه البخاري ومسلم"},
  {type:"hadith", text:"«الكَلِمَةُ الطَّيِّبَةُ صَدَقَةٌ» — رواه البخاري ومسلم"},
  {type:"hadith", text:"«مَنْ تَعَلَّمَ عِلْمًا فَعَلِمَ بِهِ كَانَ لَهُ أَجْرٌ عَظِيمٌ» — معنى مستفاد من أحاديث طلب العلم"},
  {type:"hadith", text:"«الصَّبْرُ ضِيَاءٌ» — رواه مسلم"},
  {type:"hadith", text:"«مَنْ يَسْتَغْنِ يُغْنِهِ اللَّهُ، وَمَنْ يَتَصَبَّرْ يُصَبِّرْهُ اللَّهُ» — رواه البخاري"},
  {type:"hadith", text:"«وَمَا أُعْطِيَ أَحَدٌ عَطَاءً خَيْرًا وَأَوْسَعَ مِنَ الصَّبْرِ» — رواه البخاري ومسلم"},
  {type:"hadith", text:"«لا يَلْدَغُ المُؤْمِنُ مِنْ جُحْرٍ مَرَّتَيْنِ» — رواه البخاري ومسلم"},
  {type:"hadith", text:"«اسْتَعِينُوا بِاللَّهِ وَلا تَعْجَزُوا» — رواه مسلم"},
  {type:"hadith", text:"«نِعْمَتَانِ مَغْبُونٌ فِيهِمَا كَثِيرٌ مِنَ النَّاسِ: الصِّحَّةُ وَالفَرَاغُ» — رواه البخاري"},
  {type:"hadith", text:"«مَنْ أَصْبَحَ مُعَافًى فِي جَسَدِهِ، آمِنًا فِي سِرْبِهِ، عِنْدَهُ قُوتُ يَوْمِهِ، فَقَدْ حِيزَتْ لَهُ الدُّنْيَا» — رواه الترمذي"},
  {type:"hadith", text:"«التَّأَنِّي مِنَ الرَّحْمَنِ وَالعَجَلَةُ مِنَ الشَّيْطَانِ» — رواه البيهقي"},

  // ===== عبارات تحفيزية =====
  {type:"motivation", text:"كل دقيقة تركيز الآن هي خطوة نحو النجاح الذي تستحقه 🌱"},
  {type:"motivation", text:"لا تنتظر الحماس الكامل، فقط ابدأ — الحماس يأتي مع الخطوة الأولى 🚀"},
  {type:"motivation", text:"التعب المؤقت في المذاكرة أفضل من الندم الطويل بعد الاختبار 📚"},
  {type:"motivation", text:"أنت أقرب للنجاح مما تتخيل، استمر خطوة أخرى 🌟"},
  {type:"motivation", text:"النجاح تراكم أيام صغيرة من الاستمرار، لا يوم واحد من الحظ ✨"},
  {type:"motivation", text:"صفحة واحدة الآن أفضل من كتاب كامل «بعد قليل» 📖"},
  {type:"motivation", text:"لا تقارن بدايتك بنهاية غيرك، لكل واحد طريقه وسرعته 🛤️"},
  {type:"motivation", text:"المذاكرة ليست عقوبة، هي استثمار في نسخة أفضل منك 💎"},
  {type:"motivation", text:"٢٥ دقيقة تركيز صادق تساوي ساعتين من التشتت ⏱️"},
  {type:"motivation", text:"أغلق الهاتف، واسمح لعقلك أن يعمل بكامل قوته 📵"},
  {type:"motivation", text:"الانتظام أقوى من الحماس المؤقت، ابنِ روتينك 🔁"},
  {type:"motivation", text:"الفشل في تجربة ليس فشلًا فيك، هو معلومة تساعدك تتحسن 🧭"},
  {type:"motivation", text:"ابدأ بأصعب مهمة وأنت نشيط، وستشعر بالراحة بقية اليوم 💪"},
  {type:"motivation", text:"لا تحتاج أن تكون مثاليًا، تحتاج أن تكون مستمرًا 🎯"},
  {type:"motivation", text:"عقلك مثل العضلة، يقوى كل مرة تتحدى نفسك فيها 🧠"},
  {type:"motivation", text:"اكتب هدفك وعلّقه أمامك، الأهداف المكتوبة تتحقق أكثر ✍️"},
  {type:"motivation", text:"استراحة قصيرة منظمة أفضل من ساعات من التعب المتواصل ☕"},
  {type:"motivation", text:"جودة النوم جزء من خطة الدراسة، لا تسرقه من نفسك 😴"},
  {type:"motivation", text:"راجع بصوت مسموع أو اشرح لغيرك، ستكتشف ما لم تفهمه 🗣️"},
  {type:"motivation", text:"قسّم الكبير إلى صغير، وستجد أن كل شيء ممكن 🧩"},
  {type:"motivation", text:"المتفوق ليس الأذكى دائمًا، بل الأكثر انتظامًا 📈"},
  {type:"motivation", text:"لا تنتظر يوم غد المثالي، اليوم كافٍ للبدء 🌤️"},
  {type:"motivation", text:"اشرب ماءً، وتنفس بعمق، ثم عد للتركيز 💧"},
  {type:"motivation", text:"ضع هدفًا صغيرًا جدًا الآن، وأنجزه، فالإنجاز يولّد الإنجاز ✅"},
  {type:"motivation", text:"حتى الخطوة البطيئة تقرّبك، فقط لا تتوقف 🐢"},
  {type:"motivation", text:"اجعل مكتبك مرتبًا، الفوضى تشتت الذهن 🧹"},
  {type:"motivation", text:"راجع اليوم ما درسته أمس، التكرار سر الحفظ 🔄"},
  {type:"motivation", text:"لا تخف من الأسئلة، السؤال باب الفهم ❓"},
  {type:"motivation", text:"أنت لست متأخرًا، أنت في طريقك الخاص ⏳"},
  {type:"motivation", text:"احتفل بالإنجازات الصغيرة، فهي وقود للاستمرار 🎉"},
  {type:"motivation", text:"اجعل لديك خطة مكتوبة قبل أن تبدأ، توفّر عليك ساعات 🗒️"},
  {type:"motivation", text:"الملل أحيانًا علامة أنك تقترب من الإتقان، اصبر قليلًا 🎻"},
  {type:"motivation", text:"لا تستهن بيوم واحد من الجهد، الأيام تتجمع بسرعة 📅"},
  {type:"motivation", text:"عندما تتعب، تذكر لماذا بدأت 💭"},
  {type:"motivation", text:"اختبر نفسك قبل الاختبار، التدريب يقلل الخوف 📝"},
  {type:"motivation", text:"النجاح ليس خط النهاية، بل عادة تبنيها كل يوم 🧱"},
  {type:"motivation", text:"تعلم شيئًا واحدًا جديدًا اليوم، هذا يكفي للتقدم 🌍"},
  {type:"motivation", text:"لا تنتظر الاعتراف من أحد، اعرف قيمة جهدك بنفسك 🏅"},
  {type:"motivation", text:"خصص وقتًا للراحة بلا شعور بالذنب، فأنت إنسان لا آلة 🌿"},
  {type:"motivation", text:"المراجعة المنتظمة تهزم الحفظ الليلي دائمًا 🌙"},
  {type:"motivation", text:"اكتب ملاحظاتك بأسلوبك، فهمك أهم من نسخ الكلمات 🖊️"},
  {type:"motivation", text:"عندما تقع، انفض الغبار وأكمل، فلا أحد ينجح بلا تعثر 🩹"},
  {type:"motivation", text:"ركز على التقدم لا على الكمال 📊"},
  {type:"motivation", text:"ابدأ بخمس دقائق فقط، غالبًا ستكمل أكثر ⏲️"},
  {type:"motivation", text:"طريقك الدراسي ماراثون لا سباق سرعة 🏃"},
  {type:"motivation", text:"احترم وقتك، فهو أغلى ما تملك ⌛"},
  {type:"motivation", text:"ذاكر في مكان مخصص للدراسة، عقلك سيتكيف بسرعة 🪑"},
  {type:"motivation", text:"اليوم الذي لا تتعلم فيه شيئًا هو اليوم الوحيد الخالي 🕳️"},
  {type:"motivation", text:"ثق أن جهدك الخفي سيظهر في نتيجتك الظاهرة 🌾"},
  {type:"motivation", text:"لا تخذل نفسك التي وثقت بك وبدأت هذا الطريق 🤝"},
];
let currentMotivation = MOTIVATION_ITEMS[0];
function motivationLabel(type){
  if(type==='dua') return t('دعاء');
  if(type==='hadith') return t('حديث');
  return t('تحفيز');
}
function nextMotivation(){
  let next;
  do{ next = MOTIVATION_ITEMS[Math.floor(Math.random()*MOTIVATION_ITEMS.length)]; }while(next===currentMotivation && MOTIVATION_ITEMS.length>1);
  currentMotivation = next;
  render();
}

function fmtHMS(totalSec, withHours){
  totalSec = Math.max(0, Math.floor(totalSec));
  const h = Math.floor(totalSec/3600), m = Math.floor((totalSec%3600)/60), s = totalSec%60;
  const pad = n=>String(n).padStart(2,"0");
  return (withHours || h>0) ? `${pad(h)}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`;
}
function ensureTimersTicking(){
  if(timersTickHandle) return;
  timersTickHandle = setInterval(()=>{
    let dirty = false;
    if(pomo.running){
      pomo.remaining--;
      if(pomo.remaining<=0){
        if(pomo.mode==="work"){ pomo.cycles++; pomo.mode="break"; pomo.remaining=pomo.breakMin*60; toast(t("انتهت فترة التركيز! خذ استراحة قصيرة ☕")); return; }
        else { pomo.mode="work"; pomo.remaining=pomo.workMin*60; toast(t("انتهت الاستراحة، بالتوفيق بجولة جديدة 💪")); return; }
      }
      dirty = true;
    }
    if(stopwatch.running){ stopwatch.elapsed++; dirty = true; }
    if(countdown.running){
      countdown.remaining--;
      if(countdown.remaining<=0){ countdown.remaining=0; countdown.running=false; toast(t("انتهى الوقت! ⏰")); return; }
      dirty = true;
    }
    if(dirty && S.screen!=="admin" && S.page==="timers") updateTimersDOM();
  }, 1000);
}
function updateTimersDOM(){
  const pd = document.getElementById('pomoDisplay'); 
  if(pd){
    pd.textContent = fmtHMS(pomo.remaining);
    const total = (pomo.mode==="work"?pomo.workMin:pomo.breakMin)*60;
    const pf = document.getElementById('pomoProgressFill');
    if(pf) pf.style.width = (total ? Math.round((1-pomo.remaining/total)*100) : 0)+"%";
  }
  const sd = document.getElementById('swDisplay');
  if(sd) sd.textContent = fmtHMS(stopwatch.elapsed, true);
  const cd = document.getElementById('cdDisplay');
  if(cd) cd.textContent = fmtHMS(countdown.remaining);
  const cf = document.getElementById('cdProgressFill');
  if(cf) cf.style.width = (countdown.totalSec ? Math.round((1-countdown.remaining/countdown.totalSec)*100) : 0)+"%";
}
function togglePomoRun(){ pomo.running = !pomo.running; if(pomo.running) ensureTimersTicking(); render(); }
function resetPomo(){ pomo.running=false; pomo.mode="work"; pomo.remaining=pomo.workMin*60; pomo.cycles=0; render(); }
function setPomoWork(v){ const n=Math.max(1,Math.min(180,parseInt(v)||25)); pomo.workMin=n; if(!pomo.running && pomo.mode==="work") pomo.remaining=n*60; render(); }
function setPomoBreak(v){ const n=Math.max(1,Math.min(60,parseInt(v)||5)); pomo.breakMin=n; if(!pomo.running && pomo.mode==="break") pomo.remaining=n*60; render(); }
function toggleStopwatchRun(){ stopwatch.running=!stopwatch.running; if(stopwatch.running) ensureTimersTicking(); render(); }
function resetStopwatch(){ stopwatch.running=false; stopwatch.elapsed=0; render(); }
function toggleCountdownRun(){
  if(!countdown.running && countdown.remaining<=0) countdown.remaining = countdown.totalSec;
  countdown.running = !countdown.running; if(countdown.running) ensureTimersTicking(); render();
}
function resetCountdown(){ countdown.running=false; countdown.remaining=countdown.totalSec; render(); }
function setCountdownMinutes(v){ const n=Math.max(1,Math.min(180,parseInt(v)||5)); countdown.totalSec=n*60; countdown.remaining=n*60; countdown.running=false; render(); }

function renderTimersPage(){
  const pomoTotal = (pomo.mode==="work"?pomo.workMin:pomo.breakMin)*60;
  const pomoPct = pomoTotal ? Math.round((1-pomo.remaining/pomoTotal)*100) : 0;
  const cdPct = countdown.totalSec ? Math.round((1-countdown.remaining/countdown.totalSec)*100) : 0;
  return `
  <div class="grid lg-grid-2" style="grid-template-columns:1fr;">
    ${card(`
      <div class="section-header"><h3 class="section-title">${icon('clock',18)} ${t("بومودورو")}</h3><span class="badge default">${t("الجولات")}: ${pomo.cycles}</span></div>
      <p id="pomoStatus" style="text-align:center;font-size:13px;color:var(--gray);margin:4px 0 10px;">${pomo.mode==="work" ? t("وقت التركيز") : t("وقت الاستراحة")}</p>
      <div id="pomoDisplay" style="text-align:center;font-size:46px;font-weight:800;letter-spacing:1px;margin-bottom:14px;">${fmtHMS(pomo.remaining)}</div>
      <div class="progress-track" style="margin-bottom:18px;"><div id="pomoProgressFill" class="progress-fill" style="width:${pomoPct}%"></div></div>
      <div class="flex-gap" style="justify-content:center;margin-bottom:16px;">
        <button class="btn-primary" onclick="togglePomoRun()">${pomo.running ? t("إيقاف مؤقت") : t("ابدأ")}</button>
        <button class="btn-ghost" style="flex:0 0 auto;" onclick="resetPomo()">${t("إعادة تعيين")}</button>
      </div>
      <div class="flex-gap" style="justify-content:center;gap:18px;${pomo.running?'opacity:.45;pointer-events:none;':''}">
        <div class="field" style="margin:0;width:110px;"><span class="field-label">${t("دقائق التركيز")}</span><input type="number" min="1" max="180" value="${pomo.workMin}" onchange="setPomoWork(this.value)" /></div>
        <div class="field" style="margin:0;width:110px;"><span class="field-label">${t("دقائق الاستراحة")}</span><input type="number" min="1" max="60" value="${pomo.breakMin}" onchange="setPomoBreak(this.value)" /></div>
      </div>
    `)}
    ${card(`
      <div class="section-header"><h3 class="section-title">${icon('trend',18)} ${t("ساعة إيقاف")}</h3></div>
      <div id="swDisplay" style="text-align:center;font-size:46px;font-weight:800;letter-spacing:1px;margin:22px 0 26px;">${fmtHMS(stopwatch.elapsed,true)}</div>
      <div class="flex-gap" style="justify-content:center;">
        <button class="btn-primary" onclick="toggleStopwatchRun()">${stopwatch.running ? t("إيقاف مؤقت") : t("ابدأ")}</button>
        <button class="btn-ghost" style="flex:0 0 auto;" onclick="resetStopwatch()">${t("إعادة تعيين")}</button>
      </div>
    `)}
  </div>
  <div class="grid lg-grid-2" style="grid-template-columns:1fr;margin-top:20px;">
    ${card(`
      <div class="section-header"><h3 class="section-title">${icon('alert',18)} ${t("عداد تنازلي")}</h3></div>
      <div id="cdDisplay" style="text-align:center;font-size:46px;font-weight:800;letter-spacing:1px;margin-bottom:14px;">${fmtHMS(countdown.remaining)}</div>
      <div class="progress-track" style="margin-bottom:18px;"><div id="cdProgressFill" class="progress-fill" style="width:${cdPct}%"></div></div>
      <div class="flex-gap" style="justify-content:center;margin-bottom:16px;">
        <button class="btn-primary" onclick="toggleCountdownRun()">${countdown.running ? t("إيقاف مؤقت") : t("ابدأ")}</button>
        <button class="btn-ghost" style="flex:0 0 auto;" onclick="resetCountdown()">${t("إعادة تعيين")}</button>
      </div>
      <div class="field" style="max-width:160px;margin:0 auto;${countdown.running?'opacity:.45;pointer-events:none;':''}">
        <span class="field-label">${t("عدد الدقائق")}</span>
        <input type="number" min="1" max="180" value="${Math.round(countdown.totalSec/60)}" onchange="setCountdownMinutes(this.value)" />
      </div>
    `)}
  </div>`;
}

function statusInfo(acc){
  if(acc.status==="disabled") return {label:"معطّل", tone:"danger", icon:"userx"};
  const isOnline = acc.online && acc.lastActive && (Date.now()-acc.lastActive < ONLINE_WINDOW_MS);
  return isOnline ? {label:"متصل", tone:"success", icon:"wifi"} : {label:"غير متصل", tone:"default", icon:"wifioff"};
}

/* ============================================================
   RENDER — top level router
============================================================ */
function render(){
  const scrollY = window.scrollY;
  document.documentElement.classList.toggle('dark', S.dark);
  document.documentElement.setAttribute('dir', S.lang==="en" ? "ltr" : "rtl");
  document.documentElement.setAttribute('lang', S.lang==="en" ? "en" : "ar");
  const app = document.getElementById('app');
  let html = "";
  if(S.screen==="loading") html = renderLoading();
  else if(S.screen==="login") html = renderLogin();
  else if(S.screen==="admin") html = renderAdmin();
  else html = renderStudentApp();

  html += renderModalLayer();
  html += renderToasts();
  app.innerHTML = html;
  wireGlobalEvents();
  window.scrollTo(0, scrollY);
}

function renderLoading(){
  return `<div class="loading-wrap"><div class="spinner"></div><p style="font-size:14px;color:var(--gray)">جارٍ تجهيز Student OS...</p></div>`;
}

/* ============================================================
   LOGIN
============================================================ */
function renderLogin(){
  return `
  <div class="login-wrap">
    <div class="top-left-btn" style="display:flex;gap:8px;">
      <button class="icon-btn" onclick="toggleLang()">${S.lang==="ar" ? "EN" : "AR"}</button>
      <button class="icon-btn" onclick="toggleDark()">${icon(S.dark?'sun':'moon',17)}</button>
    </div>
    <div class="login-card">
      <div style="display:flex;flex-direction:column;align-items:center;gap:6px;margin-bottom:26px;">
        <div class="login-logo">${icon('rocket',24)}</div>
        <div class="logo-row"><span class="logo-title">VISION</span></div>
        <span class="logo-sub">STUDENT OS</span>
      </div>
      <h2 style="text-align:center;font-size:18px;font-weight:800;margin:0 0 4px;">${t("تسجيل الدخول")}</h2>
      <p style="text-align:center;font-size:12px;color:var(--gray);margin:0 0 22px;">${t("أدخل بياناتك للمتابعة إلى حسابك")}</p>
      <form id="loginForm">
        <div class="field">
          <span class="field-label">${t("اسم المستخدم")}</span>
          <input id="loginUsername" type="text" placeholder="${t("اسم المستخدم")}" autocomplete="username" autofocus />
        </div>
        <div class="field">
          <span class="field-label">${t("كلمة المرور")}</span>
          <div style="position:relative;">
            <input id="loginPassword" type="password" placeholder="••••••••" autocomplete="current-password" style="padding-left:40px;" />
            <button type="button" onclick="toggleLoginPass()" style="position:absolute;left:10px;top:50%;transform:translateY(-50%);background:none;border:none;color:var(--gray);display:flex;">${icon('eye',16)}</button>
          </div>
        </div>
        ${S.loginError ? `<div style="display:flex;align-items:center;gap:6px;font-size:12px;margin-bottom:14px;padding:10px 12px;border-radius:12px;background:var(--danger-soft);color:var(--danger);">${icon('alert',14)} ${esc(t(S.loginError))}</div>` : ""}
        <button type="submit" class="btn-primary full">${S.loginBusy ? t("جارٍ التحقق...") : t("دخول")}</button>
      </form>
      <div class="login-about">
        <div class="login-about-title">${icon('sparkle',13)} عن Student OS - Vision</div>
        <p>منصة ذكية تساعد الطالب على تنظيم حياته الدراسية بالكامل — المهام، الاختبارات، الجدول، والأهداف، كلها في مكان واحد سهل ومرتب.</p>
      </div>
    </div>
  </div>`;
}
function toggleLoginPass(){
  const inp = document.getElementById('loginPassword');
  inp.type = inp.type === 'password' ? 'text' : 'password';
}
async function handleLoginSubmit(e){
  e.preventDefault();
  const username = document.getElementById('loginUsername').value.trim();
  const password = document.getElementById('loginPassword').value;
  S.loginError = "";
  if(!username || !password){ S.loginError = "الرجاء إدخال اسم المستخدم وكلمة المرور"; render(); return; }
  S.loginBusy = true; render();
  const list = (await storeGet('vision_accounts_v1', true)) || S.accounts;
  S.accounts = list;
  let found = list.find(a => a.username.toLowerCase() === username.toLowerCase());
  S.loginBusy = false;
  if(!found || found.password !== password){ S.loginError = "بيانات الدخول غير صحيحة"; render(); return; }
  if(found.role==="student" && found.status==="active" && found.expiresAt && Date.now()>=found.expiresAt){
    const expChk = applyExpirations(list);
    S.accounts = expChk.list; await storeSet('vision_accounts_v1', expChk.list, true);
    found = expChk.list.find(a=>a.id===found.id);
  }
  if(found.status === "disabled"){ S.loginError = "تم تعطيل هذا الحساب، يرجى التواصل مع المسؤول"; render(); return; }
  const updated = list.map(a => a.id===found.id ? {...a, online:true, lastActive:Date.now()} : a);
  S.accounts = updated; await storeSet('vision_accounts_v1', updated, true);
  S.currentUser = found;
  S.screen = found.role === "admin" ? "admin" : "student";
  S.page = "dashboard";
  if(found.role === "student") await loadWorkspaceForCurrentUser();
  startSessionTimers();
  render();
}
async function handleLogout(){
  if(S.currentUser){
    const list = (await storeGet('vision_accounts_v1', true)) || S.accounts;
    const updated = list.map(a => a.id===S.currentUser.id ? {...a, online:false} : a);
    S.accounts = updated; await storeSet('vision_accounts_v1', updated, true);
  }
  clearInterval(heartbeatTimer); clearInterval(adminPollTimer);
  S.currentUser = null; S.screen = "login"; S.loginError=""; S.workspace = seedWorkspace();
  toast(t("تم تسجيل الخروج"));
}
function startSessionTimers(){
  clearInterval(heartbeatTimer); clearInterval(adminPollTimer);
  if(S.currentUser?.role === "student"){
    const tick = async () => {
      const list = await storeGet('vision_accounts_v1', true);
      if(!list) return;
      const self = list.find(a=>a.id===S.currentUser.id);
      if(!self) return;
      if(self.status === "disabled"){
        clearInterval(heartbeatTimer);
        S.currentUser = null; S.screen = "login";
        toast("تم تعطيل حسابك من قبل المسؤول","danger");
        render();
        return;
      }
      const updated = list.map(a => a.id===S.currentUser.id ? {...a, online:true, lastActive:Date.now()} : a);
      S.accounts = updated; await storeSet('vision_accounts_v1', updated, true);
    };
    tick();
    heartbeatTimer = setInterval(tick, HEARTBEAT_MS);
  }
  if(S.currentUser?.role === "admin"){
    adminPollTimer = setInterval(async ()=>{
      let list = await storeGet('vision_accounts_v1', true);
      if(list){
        const expChk = applyExpirations(list);
        if(expChk.changed){ list = expChk.list; await storeSet('vision_accounts_v1', list, true); }
        S.accounts = list;
        const active = document.activeElement;
        const typing = active && ["INPUT","SELECT","TEXTAREA"].includes(active.tagName);
        if(S.screen==="admin" && !typing) render();
      }
    }, 10000);
  }
}
function toggleDark(){ S.dark = !S.dark; render(); }

/* ============================================================
   MODALS / TOASTS
============================================================ */
function renderModalLayer(){
  let out = "";
  if(S.modal){
    out += `<div class="modal-backdrop" onclick="if(event.target===this) closeModal()">
      <div class="modal-box ${S.modal.wide?'wide':''}">
        <div class="modal-head"><h3 class="modal-title">${esc(S.modal.title)}</h3><button class="modal-close" onclick="closeModal()">${icon('x',16)}</button></div>
        ${S.modal.body}
      </div>
    </div>`;
  }
  if(S.confirm){
    out += `<div class="modal-backdrop" onclick="if(event.target===this) closeConfirm()">
      <div class="modal-box">
        <div class="modal-head"><h3 class="modal-title">تأكيد</h3><button class="modal-close" onclick="closeConfirm()">${icon('x',16)}</button></div>
        <p style="font-size:14px;color:var(--gray);margin:0 0 20px;">${esc(S.confirm.message)}</p>
        <div style="display:flex;gap:10px;">
          <button class="btn-danger" onclick="confirmYes()">حذف</button>
          <button class="btn-ghost" onclick="closeConfirm()">إلغاء</button>
        </div>
      </div>
    </div>`;
  }
  return out;
}
function confirmYes(){ const fn = S.confirm?.onYes; closeConfirm(); if(fn) fn(); }
function renderToasts(){
  if(!S.toasts.length) return "";
  return `<div class="toast-stack">${S.toasts.map(t=>`<div class="toast ${t.tone==='danger'?'danger':''}">${icon(t.tone==='danger'?'alert':'checkcircle',16)}<span>${esc(t.message)}</span></div>`).join("")}</div>`;
}

/* ============================================================
   ADMIN PANEL
============================================================ */
function renderAdmin(){
  const students = S.accounts.filter(a=>a.role==="student");
  const online = students.filter(s=>statusInfo(s).label==="متصل").length;
  const disabled = students.filter(s=>s.status==="disabled").length;
  const offline = students.length - online - disabled;
  const filtered = students.filter(s=>{
    const q = S.adminQuery;
    const matchesQ = !q || s.name.includes(q) || s.username.includes(q);
    const st = statusInfo(s).label;
    const matchesF = S.adminFilter==="الكل" || st===S.adminFilter;
    return matchesQ && matchesF;
  });

  const rows = filtered.length===0 ? `<tr><td colspan="7">${emptyState('users','لا توجد حسابات مطابقة')}</td></tr>` :
    filtered.map(s=>{
      const st = statusInfo(s);
      const exp = fmtExpiry(s);
      return `<tr>
        <td style="font-weight:700;">${esc(s.name)}</td>
        <td style="color:var(--gray);">${esc(s.username)}</td>
        <td>
          <div class="pw-cell">
            <span class="pw-text">${esc(s.password)}</span>
            <button class="icon-sm-btn" title="نسخ كلمة المرور" onclick="copyText('${esc(s.password)}', 'تم نسخ كلمة المرور 📋')">${icon('copy',12)}</button>
          </div>
        </td>
        <td>${badge(`${icon(st.icon,11)} ${st.label}`, st.tone)}</td>
        <td class="hide-sm">${badge(exp.text, exp.tone)}</td>
        <td style="color:var(--gray);font-size:12px;" class="hide-sm">${relativeTime(s.lastActive)}</td>
        <td>
          <div class="row-actions" style="flex-wrap:wrap;">
            <button class="icon-sm-btn" title="تعديل" onclick="openEditStudent('${s.id}')">${icon('edit',13)}</button>
            <button class="icon-sm-btn" title="إعادة تعيين كلمة المرور" onclick="openResetStudent('${s.id}')">${icon('key',13)}</button>
            <button class="icon-sm-btn" title="تحديد/تمديد الصلاحية" onclick="openRenewStudent('${s.id}')">${icon('calendar',13)}</button>
            <button class="icon-sm-btn" style="color:${s.status==='disabled'?'var(--success)':'var(--danger)'}" title="${s.status==='disabled'?'تفعيل':'تعطيل'}" onclick="toggleDisableStudent('${s.id}')">${icon(s.status==='disabled'?'usercheck':'userx',13)}</button>
            <button class="icon-sm-btn danger" title="حذف" onclick="askDeleteStudent('${s.id}')">${icon('trash',13)}</button>
          </div>
        </td>
      </tr>`;
    }).join("");

  return `
  <div class="main" style="max-width:1200px;margin:0 auto;">
    <div class="header">
      <div class="header-left">
        <div class="stat-icon" style="margin-bottom:0;">${icon('shield',20)}</div>
        <div>
          <h1 class="header-title" style="font-size:22px;">${t("لوحة تحكم المسؤول")}</h1>
          <p class="header-sub">${S.lang==="en" ? `Welcome ${esc(S.currentUser?.name||"")} — manage student accounts` : `مرحبًا ${esc(S.currentUser?.name||"")} — إدارة حسابات الطلاب`}</p>
        </div>
      </div>
      <div class="header-right">
        <button class="icon-btn" onclick="toggleLang()" title="Language">${S.lang==="ar" ? "EN" : "AR"}</button>
        <button class="icon-btn" onclick="toggleDark()">${icon(S.dark?'sun':'moon',17)}</button>
        <div style="position:relative;">
          <button class="profile-btn" onclick="S.profileOpen=!S.profileOpen; render();"><div class="avatar">م</div>${icon('chevdown',14)}</button>
          ${S.profileOpen ? `<div class="dropdown">
            <div style="padding:8px 12px;font-size:14px;font-weight:700;">${esc(S.currentUser?.name||"")}</div>
            <div style="padding:0 12px 8px;font-size:12px;color:var(--gray);">${S.lang==="en"?"System Admin":"مسؤول النظام"}</div>
            <div style="height:1px;background:var(--border);margin:4px 0;"></div>
            <button class="dropdown-item" onclick="openChangeOwnPassword()">${icon('key',14)} ${S.lang==="en"?"Change password":"تغيير كلمة المرور"}</button>
            <button class="dropdown-item" style="color:var(--danger);" onclick="handleLogout()">${icon('logout',14)} ${t("تسجيل الخروج")}</button>
          </div>` : ""}
        </div>
      </div>
    </div>

    <div class="grid grid-4" style="margin-bottom:20px;">
      ${card(`<div class="flex-gap"><div class="stat-icon" style="margin-bottom:0;">${icon('users',18)}</div><div><div class="stat-value">${students.length}</div><div style="font-size:12px;color:var(--gray);">${t("إجمالي الطلاب")}</div></div></div>`)}
      ${card(`<div class="flex-gap"><div class="stat-icon" style="margin-bottom:0;background:var(--success);">${icon('wifi',18)}</div><div><div class="stat-value">${online}</div><div style="font-size:12px;color:var(--gray);">${t("متصلون الآن")}</div></div></div>`)}
      ${card(`<div class="flex-gap"><div class="stat-icon" style="margin-bottom:0;background:var(--gray);">${icon('wifioff',18)}</div><div><div class="stat-value">${offline}</div><div style="font-size:12px;color:var(--gray);">${t("غير متصلين")}</div></div></div>`)}
      ${card(`<div class="flex-gap"><div class="stat-icon" style="margin-bottom:0;background:var(--danger);">${icon('userx',18)}</div><div><div class="stat-value">${disabled}</div><div style="font-size:12px;color:var(--gray);">${t("حسابات معطّلة")}</div></div></div>`)}
    </div>

    ${card(`
      <div class="flex-between" style="margin-bottom:16px;">
        <div class="flex-gap" style="flex:1;">
          <div class="search-box" style="display:flex;flex:1;">${icon('search',15)}<input value="${esc(S.adminQuery)}" oninput="S.adminQuery=this.value; render();" placeholder="${t("ابحث بالاسم أو اسم المستخدم...")}" /></div>
          <select onchange="S.adminFilter=this.value; render();" style="padding:10px 14px;border-radius:12px;background:var(--bg);border:1px solid var(--border);font-size:13px;">
            ${["الكل","متصل","غير متصل","معطّل"].map(o=>`<option ${S.adminFilter===o?'selected':''}>${t(o)}</option>`).join("")}
          </select>
        </div>
        <button class="btn-primary" onclick="openCreateStudent()">${icon('userplus',16)} ${t("إنشاء حساب طالب")}</button>
      </div>
      <div class="table-wrap"><table><thead><tr><th>${S.lang==="en"?"Student":"الطالب"}</th><th>${t("اسم المستخدم")}</th><th>${S.lang==="en"?"Password":"كلمة المرور"}</th><th>${S.lang==="en"?"Status":"الحالة"}</th><th class="hide-sm">${S.lang==="en"?"Expiry":"الصلاحية"}</th><th class="hide-sm">${S.lang==="en"?"Last active":"آخر نشاط"}</th><th>${S.lang==="en"?"Actions":"إجراءات"}</th></tr></thead><tbody>${rows}</tbody></table></div>
    `)}
  </div>`;
}

function openCreateStudent(){
  openModal({ title:"إنشاء حساب طالب", body:`
    <div class="field"><span class="field-label">اسم الطالب</span><input id="f_name" /></div>
    <div class="field"><span class="field-label">اسم المستخدم</span><input id="f_username" /></div>
    <div class="field">
      <span class="field-label">كلمة المرور</span>
      <div class="flex-gap">
        <input id="f_password" type="text" style="flex:1;" />
        <button type="button" class="icon-sm-btn" title="توليد كلمة مرور قوية" onclick="document.getElementById('f_password').value=generateStrongPassword();">${icon('sparkle',14)}</button>
      </div>
      <p style="font-size:11px;color:var(--gray);margin:6px 0 0;">اضغط أيقونة التوليد لإنشاء كلمة مرور قوية تلقائيًا، أو اكتب كلمتك الخاصة.</p>
    </div>
    <div class="field"><span class="field-label">مدة صلاحية الحساب</span>${expirySelectHtml('f_expiry')}</div>
    <button class="btn-primary full" id="f_submit" onclick="saveCreateStudent()">إنشاء الحساب</button>
  `});
}
async function saveCreateStudent(){
  const name=document.getElementById('f_name').value.trim();
  const username=document.getElementById('f_username').value.trim();
  const password=document.getElementById('f_password').value.trim();
  if(!name||!username||!password) return toast("الرجاء تعبئة جميع الحقول","danger");
  if(S.accounts.some(a=>a.username.toLowerCase()===username.toLowerCase())) return toast("اسم المستخدم مستخدم بالفعل","danger");
  const expiresAt = readExpirySelection('f_expiry');
  if(expiresAt && expiresAt.error) return toast("أدخل عدد أيام صحيح للمدة المخصصة","danger");
  const newAcc = {id:uid(), username, password, role:"student", name, status:"active", online:false, lastActive:null, createdAt:Date.now(), expiresAt};
  const updated = [...S.accounts, newAcc];
  S.accounts = updated; await storeSet('vision_accounts_v1', updated, true);
  closeModal(); toast("تم إنشاء حساب الطالب بنجاح 🎉");
}
function openRenewStudent(id){
  const s = S.accounts.find(a=>a.id===id); if(!s) return;
  openModal({ title:`تحديد/تمديد صلاحية حساب ${s.name}`, body:`
    <div class="field"><span class="field-label">مدة صلاحية الحساب</span>${expirySelectHtml('f_expiry')}</div>
    <button class="btn-primary full" onclick="saveRenewStudent('${id}')">حفظ</button>
  `});
}
async function saveRenewStudent(id){
  const expiresAt = readExpirySelection('f_expiry');
  if(expiresAt && expiresAt.error) return toast("أدخل عدد أيام صحيح للمدة المخصصة","danger");
  const updated = S.accounts.map(a=>a.id===id?{...a, expiresAt, status: a.status==="disabled" && a.autoDisabledAt ? "active" : a.status}:a);
  S.accounts = updated; await storeSet('vision_accounts_v1', updated, true);
  closeModal(); toast("تم تحديث مدة صلاحية الحساب"); render();
}
function openEditStudent(id){
  const s = S.accounts.find(a=>a.id===id); if(!s) return;
  openModal({ title:"تعديل بيانات الطالب", body:`
    <div class="field"><span class="field-label">اسم الطالب</span><input id="f_name" value="${esc(s.name)}" /></div>
    <div class="field"><span class="field-label">اسم المستخدم</span><input id="f_username" value="${esc(s.username)}" /></div>
    <button class="btn-primary full" onclick="saveEditStudent('${id}')">حفظ التعديلات</button>
  `});
}
async function saveEditStudent(id){
  const name=document.getElementById('f_name').value.trim();
  const username=document.getElementById('f_username').value.trim();
  if(!name||!username) return toast("الرجاء تعبئة الحقول المطلوبة","danger");
  if(S.accounts.some(a=>a.id!==id && a.username.toLowerCase()===username.toLowerCase())) return toast("اسم المستخدم مستخدم بالفعل","danger");
  const updated = S.accounts.map(a=>a.id===id?{...a,name,username}:a);
  S.accounts = updated; await storeSet('vision_accounts_v1', updated, true);
  closeModal(); toast("تم تحديث بيانات الطالب");
}
function openResetStudent(id){
  const s = S.accounts.find(a=>a.id===id); if(!s) return;
  openModal({ title:`إعادة تعيين كلمة مرور ${s.name}`, body:`
    <div class="field"><span class="field-label">كلمة المرور الجديدة</span><input id="f_password" /></div>
    <button class="btn-primary full" onclick="saveResetStudent('${id}')">تحديث كلمة المرور</button>
  `});
}
async function saveResetStudent(id){
  const password=document.getElementById('f_password').value.trim();
  if(!password) return toast("الرجاء إدخال كلمة مرور جديدة","danger");
  const updated = S.accounts.map(a=>a.id===id?{...a,password}:a);
  S.accounts = updated; await storeSet('vision_accounts_v1', updated, true);
  closeModal(); toast("تم تحديث كلمة مرور الطالب");
}
function openChangeOwnPassword(){
  S.profileOpen=false;
  openModal({ title:"تغيير كلمة مروري", body:`
    <div class="field"><span class="field-label">كلمة المرور الجديدة</span><input id="f_password" /></div>
    <button class="btn-primary full" onclick="saveOwnPassword()">تحديث</button>
  `});
}
async function saveOwnPassword(){
  const password=document.getElementById('f_password').value.trim();
  if(!password) return toast("الرجاء إدخال كلمة مرور جديدة","danger");
  const updated = S.accounts.map(a=>a.id===S.currentUser.id?{...a,password}:a);
  S.accounts = updated; S.currentUser = {...S.currentUser, password};
  await storeSet('vision_accounts_v1', updated, true);
  closeModal(); toast("تم تحديث كلمة مرورك بنجاح");
}
async function toggleDisableStudent(id){
  const s = S.accounts.find(a=>a.id===id); if(!s) return;
  const updated = S.accounts.map(a=>a.id===id?{...a,status:a.status==='disabled'?'active':'disabled', online:a.status==='disabled'?a.online:false}:a);
  S.accounts = updated; await storeSet('vision_accounts_v1', updated, true);
  toast(s.status==='disabled' ? "تم تفعيل الحساب" : "تم تعطيل الحساب");
  render();
}
function askDeleteStudent(id){
  askConfirm("هل أنت متأكد من حذف حساب هذا الطالب نهائيًا؟", async ()=>{
    const updated = S.accounts.filter(a=>a.id!==id);
    S.accounts = updated; await storeSet('vision_accounts_v1', updated, true);
    toast("تم حذف الحساب"); render();
  });
}

/* ============================================================
   STUDENT APP SHELL
============================================================ */
const NAV_ITEMS = [
  {key:"dashboard", label:"الرئيسية", icon:"home"},
  {key:"tasks", label:"المهام", icon:"tasks"},
  {key:"subjects", label:"المواد الدراسية", icon:"book"},
  {key:"schedule", label:"الجدول", icon:"calendar"},
  {key:"exams", label:"الاختبارات", icon:"examcheck"},
  {key:"calendar", label:"التقويم", icon:"calendar"},
  {key:"goals", label:"الأهداف", icon:"target"},
  {key:"notes", label:"الملاحظات", icon:"note"},
  {key:"timers", label:"المؤقتات", icon:"clock"},
  {key:"statistics", label:"الإحصائيات", icon:"chart"},
  {key:"settings", label:"الإعدادات", icon:"settings"},
];

function computeNotifications(){
  const w = S.workspace;
  if(!w) return [];
  const dismissed = new Set(S.workspace.dismissedNotifs || []);
  const list = [];
  const push = (id, text) => { if(!dismissed.has(id)) list.push({id, text}); };
  const dueTasks = (w.tasks||[]).filter(x=>!x.done && daysUntil(x.date)<=0);
  if(dueTasks.length===1) push("task:"+dueTasks[0].id, S.lang==="en" ? `Task due: ${dueTasks[0].title}` : `لديك مهمة مستحقة: ${dueTasks[0].title}`);
  else if(dueTasks.length>1) push("tasks:"+dueTasks.map(x=>x.id).join(","), S.lang==="en" ? `You have ${dueTasks.length} tasks due` : `لديك ${dueTasks.length} مهام مستحقة`);

  (w.exams||[]).forEach(ex=>{
    const d = daysUntil(ex.date);
    if(d>=0 && d<=3){
      const when = d===0 ? (S.lang==="en"?"today":"اليوم") : (S.lang==="en"?`in ${d} day(s)`:`بعد ${d} يوم`);
      push("exam:"+ex.id, S.lang==="en" ? `${ex.subject} exam ${when}` : `اختبار ${ex.subject} ${when}`);
    }
  });

  (w.goals||[]).forEach(g=>{
    const d = daysUntil(g.deadline);
    if(g.status!=="مكتمل" && d>=0 && d<=3){
      push("goal:"+g.id, S.lang==="en" ? `Goal deadline approaching: ${g.title}` : `اقترب موعد هدف: ${g.title}`);
    }
  });

  // حصص اليوم التي فعّل الطالب تنبيهًا لها
  const todayName = WEEK_DAYS[new Date().getDay()];
  (w.subjects||[])
    .filter(s=>s.day===todayName && s.time && Number(s.reminder)>0)
    .sort((a,b)=>minutesOf(a.time)-minutesOf(b.time))
    .forEach(s=>{
      push("class:"+s.id, S.lang==="en"
        ? `${s.name} class at ${to12h(s.time)} — reminder ${reminderLabel(s.reminder)}`
        : `حصة ${s.name} الساعة ${to12h(s.time)} — تنبيه ${reminderLabel(s.reminder)}`);
    });

  return list;
}

async function dismissNotif(id){
  if(!S.workspace) return;
  S.workspace.dismissedNotifs = [...new Set([...(S.workspace.dismissedNotifs||[]), id])];
  await persistWorkspace();
  render();
}
async function clearAllNotifs(){
  if(!S.workspace) return;
  const ids = computeNotifications().map(n=>n.id);
  S.workspace.dismissedNotifs = [...new Set([...(S.workspace.dismissedNotifs||[]), ...ids])];
  await persistWorkspace();
  S.notifOpen = false;
  toast(t("تم مسح التنبيهات"));
}

function renderStudentApp(){
  const pageTitle = t(NAV_ITEMS.find(n=>n.key===S.page)?.label || "");
  const greeting = S.page==="dashboard" ? t("مرحبًا بك 👋") : pageTitle;
  const sub = S.page==="dashboard" ? t("اليوم هو يوم رائع للتقدم خطوة نحو هدفك. ⭐") : (S.lang==="en" ? `Manage your ${pageTitle} easily.` : `إدارة ${pageTitle} الخاصة بك بسهولة.`);
  const initial = (S.currentUser?.name||"س").trim().charAt(0);
  const notifList = computeNotifications();

  let pageHtml = "";
  if(S.page==="dashboard") pageHtml = renderDashboard();
  else if(S.page==="tasks") pageHtml = renderTasksPage();
  else if(S.page==="subjects") pageHtml = renderSubjectsPage();
  else if(S.page==="exams") pageHtml = renderExamsPage();
  else if(S.page==="calendar") pageHtml = renderCalendarPage();
  else if(S.page==="goals") pageHtml = renderGoalsPage();
  else if(S.page==="notes") pageHtml = renderNotesPage();
  else if(S.page==="schedule") pageHtml = renderSchedulePage();
  else if(S.page==="timers") pageHtml = renderTimersPage();
  else if(S.page==="statistics") pageHtml = renderStatisticsPage();
  else if(S.page==="settings") pageHtml = renderSettingsPage();

  return `
  <div class="shell">
    ${S.sidebarOpen ? `<div class="sidebar-overlay" onclick="S.sidebarOpen=false; render();"></div>` : ""}
    <aside class="sidebar ${S.sidebarOpen?'open':''}">
      <div style="display:flex;align-items:center;justify-content:space-between;" class="hide-lg">
        <span style="color:rgba(255,255,255,.7);font-size:12px;font-weight:700;">القائمة</span>
        <button onclick="S.sidebarOpen=false; render();" style="background:none;border:none;color:rgba(255,255,255,.8);padding:4px;">${icon('x',18)}</button>
      </div>
      <div class="logo-card">
        <div class="logo-row">${icon('rocket',20)}<span class="logo-title">VISION</span></div>
        <span class="logo-sub">STUDENT OS</span>
      </div>
      <nav class="nav">
        ${NAV_ITEMS.map(item=>`<button class="nav-btn ${S.page===item.key?'active':''}" onclick="setPage('${item.key}')">${icon(item.icon,18)}<span>${t(item.label)}</span></button>`).join("")}
      </nav>
      <div class="motivation-card">
        <div class="motivation-title">${icon('sparkle',15)} ${motivationLabel(currentMotivation.type)}</div>
        <div class="motivation-text">${esc(currentMotivation.text)}</div>
        <button class="motivation-refresh" onclick="nextMotivation()">${icon('sparkle',12)} ${t("عبارة جديدة")}</button>
      </div>
    </aside>

    <main class="main" style="flex:1;min-width:0;">
      <div class="header">
        <div class="header-left">
          <button class="icon-btn hide-lg" onclick="S.sidebarOpen=true; render();">${icon('menu',18)}</button>
          <div><h1 class="header-title">${greeting}</h1><p class="header-sub">${sub}</p></div>
        </div>
        <div class="header-right">
          <button class="icon-btn" onclick="toggleLang()" title="Language">${S.lang==="ar" ? "EN" : "AR"}</button>
          <button class="icon-btn" onclick="toggleDark()">${icon(S.dark?'sun':'moon',17)}</button>
          <div style="position:relative;">
            <button class="icon-btn" onclick="S.notifOpen=!S.notifOpen; S.profileOpen=false; render();">${icon('bell',17)}${notifList.length ? `<span class="badge-dot">${notifList.length}</span>` : ""}</button>
            ${S.notifOpen ? `<div class="dropdown" style="width:270px;">
              ${notifList.length ? notifList.map(n=>`<div class="notif-item"><span>${esc(n.text)}</span><button class="notif-x" title="${t("مسح")}" onclick="dismissNotif('${esc(n.id)}')">${icon('x',13)}</button></div>`).join("")
                + `<button class="notif-clear" onclick="clearAllNotifs()">${icon('trash',13)} ${t("مسح كل التنبيهات")}</button>`
                : `<div class="dropdown-item" style="cursor:default;color:var(--gray);text-align:center;">${t("لا توجد تنبيهات حاليًا")}</div>`}
            </div>` : ""}
          </div>
          <div style="position:relative;">
            <button class="profile-btn" onclick="S.profileOpen=!S.profileOpen; S.notifOpen=false; render();"><div class="avatar">${esc(initial)}</div>${icon('chevdown',14)}</button>
            ${S.profileOpen ? `<div class="dropdown">
              <div style="padding:8px 12px;font-size:14px;font-weight:700;">${esc(S.currentUser?.name||"")}</div>
              <div style="padding:0 12px 8px;font-size:12px;color:var(--gray);">${t("طالب")}</div>
              <div style="height:1px;background:var(--border);margin:4px 0;"></div>
              <button class="dropdown-item" style="color:var(--danger);" onclick="handleLogout()">${icon('logout',14)} ${t("تسجيل الخروج")}</button>
            </div>` : ""}
          </div>
        </div>
      </div>
      ${pageHtml}
    </main>
  </div>`;
}
function setPage(p){ S.page=p; S.sidebarOpen=false; render(); }

/* ============================================================
   DASHBOARD
============================================================ */
function renderDashboard(){
  const w = S.workspace;
  const done = w.tasks.filter(t=>t.done).length;
  const completion = w.tasks.length ? Math.round(done/w.tasks.length*100) : 0;
  const todayTasks = w.tasks.filter(t=>!t.done).length;
  const topGoal = w.goals[0];

  const taskRows = w.tasks.slice(0,5).map(t=>`
    <div class="task-row">
      <button class="check-circle ${t.done?'done':''}" onclick="toggleTaskDone('${t.id}')">${t.done?icon('check',13):''}</button>
      <span class="task-title ${t.done?'done':''}">${esc(t.title)}</span>
      ${badge(esc(t.subject))}
      <span style="font-size:12px;color:var(--gray);" class="hide-sm">${t.date}</span>
    </div>`).join("");

  return `
  <div style="display:flex;flex-direction:column;gap:24px;">
    <div class="grid grid-4 home-stats">
      ${card(`<div class="stat-icon">${icon('tasks',19)}</div><div class="stat-value">${todayTasks}</div><div class="stat-label">${t("المهام اليوم")}</div><div class="stat-sub">${t("مهام متبقية")}</div>`)}
      ${card(`<div class="stat-icon">${icon('examcheck',19)}</div><div class="stat-value">${w.exams.length}</div><div class="stat-label">${t("الاختبارات القادمة")}</div><div class="stat-sub">${t("اختبارات")}</div>`)}
      ${card(`<div class="stat-icon">${icon('book',19)}</div><div class="stat-value">${w.subjects.length}</div><div class="stat-label">${t("المواد الدراسية")}</div><div class="stat-sub">${t("مواد")}</div>`)}
      ${card(`<div class="stat-icon gold">${icon('grad',19)}</div><div class="stat-value">${completion}%</div><div class="stat-label" style="margin-bottom:8px;">${t("نسبة الإنجاز")}</div>${progressBar(completion,true)}`)}
    </div>

    <div class="grid lg-grid-3" style="grid-template-columns:1fr;">
      <div class="lg-col-2">${card(`
        <div class="section-header"><h3 class="section-title">${t("المهام القادمة")}</h3><button class="link-btn" onclick="setPage('tasks')">${icon('plus',14)} ${t("عرض الكل")}</button></div>
        ${w.tasks.length===0 ? emptyState('tasks', t('لا توجد مهام بعد — أضف مهمتك الأولى')) : taskRows}
      `)}</div>
      ${card(`<div class="section-header"><h3 class="section-title">${t("التقويم")}</h3></div>${renderMiniCalendar()}`)}
    </div>

    <div class="grid lg-grid-2" style="grid-template-columns:1fr;">
      ${card(topGoal ? `
        <div class="section-header"><h3 class="section-title">${t("أهدافك")}</h3></div>
        <div class="flex-gap" style="align-items:flex-start;">
          <div class="stat-icon" style="margin-bottom:0;background:var(--bg);color:var(--gold);flex-shrink:0;">${icon('target',20)}</div>
          <div style="flex:1;">
            <div class="flex-between" style="margin-bottom:6px;"><span style="font-size:14px;font-weight:600;">${esc(topGoal.title)}</span><span style="font-size:14px;font-weight:800;color:var(--gold);">${topGoal.progress}%</span></div>
            ${progressBar(topGoal.progress)}
          </div>
        </div>` : `<div class="section-header"><h3 class="section-title">${t("أهدافك")}</h3></div>${emptyState('target', t('لا توجد أهداف بعد'))}`)}
      ${card(`
        <div class="section-header"><h3 class="section-title">${t("إحصائيات")}</h3></div>
        <div class="grid grid-3" style="align-items:center;">
          <div><div style="font-size:12px;color:var(--gray);margin-bottom:4px;">${t("إجمالي المهام")}</div><div class="stat-value">${w.tasks.length}</div></div>
          <div><div style="font-size:12px;color:var(--gray);margin-bottom:4px;">${t("المهام المنجزة")}</div><div class="stat-value">${done}</div></div>
          <div style="justify-self:end;color:var(--gold);">${icon('trend',30)}</div>
        </div>
      `)}
    </div>
  </div>`;
}
async function toggleTaskDone(id){
  const t = S.workspace.tasks.find(x=>x.id===id);
  S.workspace.tasks = S.workspace.tasks.map(x=>x.id===id?{...x,done:!x.done}:x);
  await persistWorkspace();
  toast(t.done ? "أُعيدت المهمة للمتبقية" : "تم إنجاز المهمة بنجاح 🎉");
  render();
}
function workspaceKey(){ return "vision_workspace_" + (S.currentUser?.id || "guest"); }
async function persistWorkspace(){ if(!S.currentUser || S.currentUser.role!=="student") return; await storeSet(workspaceKey(), S.workspace, true); }

function renderMiniCalendar(){
  const c = S.miniCalCursor, y=c.getFullYear(), m=c.getMonth();
  const total = daysInMonth(y,m), start = firstWeekday(y,m);
  const eventDates = new Set(S.workspace.events.map(e=>e.date));
  let cells = "";
  for(let i=0;i<start;i++) cells += `<div></div>`;
  for(let d=1;d<=total;d++){
    const dateStr = fmtDate(new Date(y,m,d));
    const sel = dateStr===S.miniSelected;
    cells += `<button class="mini-cell ${sel?'selected':''}" onclick="S.miniSelected='${dateStr}'; render();">${d}${eventDates.has(dateStr)&&!sel?'<span class="mini-dot"></span>':''}</button>`;
  }
  return `
  <div class="calendar-head">
    <button class="calendar-nav-btn" onclick="miniCalNav(-1)">${icon('chevdown',16)}</button>
    <span style="font-weight:700;font-size:14px;">${MONTHS[m]} ${y}</span>
    <button class="calendar-nav-btn" onclick="miniCalNav(1)">${icon('chevdown',16)}</button>
  </div>
  <div class="mini-grid" style="margin-bottom:6px;">${WEEKDAYS.map(d=>`<span class="mini-day-label">${d[0]}</span>`).join("")}</div>
  <div class="mini-grid">${cells}</div>`;
}
function miniCalNav(dir){ const c=S.miniCalCursor; S.miniCalCursor=new Date(c.getFullYear(), c.getMonth()+dir, 1); render(); }

/* ============================================================
   TASKS PAGE
============================================================ */
function renderTasksPage(){
  const w=S.workspace;
  let list = w.tasks.filter(t=>t.title.includes(S.taskQuery));
  if(S.taskFilter==="منجزة") list = list.filter(t=>t.done);
  if(S.taskFilter==="متبقية") list = list.filter(t=>!t.done);
  list = [...list].sort((a,b)=> S.taskSortAsc ? a.date.localeCompare(b.date) : b.date.localeCompare(a.date));

  const rows = list.length===0 ? emptyState('tasks', t('لا توجد مهام مطابقة')) : list.map(t=>`
    <div class="task-row">
      <button class="check-circle ${t.done?'done':''}" onclick="toggleTaskDone('${t.id}')">${t.done?icon('check',13):''}</button>
      <span class="task-title ${t.done?'done':''}">${esc(t.title)}</span>
      ${badge(esc(t.subject))}
      <span style="font-size:12px;color:var(--gray);" class="hide-sm">${t.date}</span>
      <div class="row-actions">
        <button class="icon-sm-btn" onclick="openEditTask('${t.id}')">${icon('edit',13)}</button>
        <button class="icon-sm-btn danger" onclick="askDeleteTask('${t.id}')">${icon('trash',13)}</button>
      </div>
    </div>`).join("");

  return `
  <div style="display:flex;flex-direction:column;gap:20px;">
    ${card(`
      <div class="flex-between">
        <div class="flex-gap" style="flex:1;">
          <div class="search-box" style="display:flex;flex:1;">${icon('search',15)}<input value="${esc(S.taskQuery)}" oninput="S.taskQuery=this.value; render();" placeholder="ابحث عن مهمة..." /></div>
          <select onchange="S.taskFilter=this.value; render();" style="padding:10px 14px;border-radius:12px;background:var(--bg);border:1px solid var(--border);font-size:13px;">
            ${["الكل","منجزة","متبقية"].map(o=>`<option ${S.taskFilter===o?'selected':''}>${o}</option>`).join("")}
          </select>
          <button class="icon-btn" title="ترتيب حسب التاريخ" onclick="S.taskSortAsc=!S.taskSortAsc; render();">${icon('arrowsort',16)}</button>
        </div>
        <button class="btn-primary" onclick="openAddTask()">${icon('plus',16)} ${t("مهمة جديدة")}</button>
      </div>
    `)}
    ${card(rows)}
  </div>`;
}
function subjectOptions(selected){
  return S.workspace.subjects.map(s=>`<option value="${esc(s.name)}" ${s.name===selected?'selected':''}>${esc(s.name)}</option>`).join("");
}
function openAddTask(){
  openModal({ title:"مهمة جديدة", body:`
    <div class="field"><span class="field-label">اسم المهمة</span><input id="f_title" placeholder="مثال: حل واجب الرياضيات" /></div>
    <div class="field"><span class="field-label">المادة</span><select id="f_subject">${subjectOptions(S.workspace.subjects[0]?.name)}</select></div>
    <div class="field"><span class="field-label">التاريخ</span><input id="f_date" type="date" value="${fmtDate(new Date(2026,7,24))}" /></div>
    <button class="btn-primary full" onclick="saveNewTask()">حفظ</button>
  `});
}
async function saveNewTask(){
  const title=document.getElementById('f_title').value.trim();
  const subject=document.getElementById('f_subject').value;
  const date=document.getElementById('f_date').value;
  if(!title) return toast("الرجاء إدخال اسم المهمة","danger");
  S.workspace.tasks = [{id:uid(),title,subject,date,done:false}, ...S.workspace.tasks];
  await persistWorkspace(); closeModal(); toast("تمت إضافة المهمة 🎉");
}
function openEditTask(id){
  const t = S.workspace.tasks.find(x=>x.id===id); if(!t) return;
  openModal({ title:"تعديل المهمة", body:`
    <div class="field"><span class="field-label">اسم المهمة</span><input id="f_title" value="${esc(t.title)}" /></div>
    <div class="field"><span class="field-label">المادة</span><select id="f_subject">${subjectOptions(t.subject)}</select></div>
    <div class="field"><span class="field-label">التاريخ</span><input id="f_date" type="date" value="${t.date}" /></div>
    <button class="btn-primary full" onclick="saveEditTask('${id}')">حفظ</button>
  `});
}
async function saveEditTask(id){
  const title=document.getElementById('f_title').value.trim();
  const subject=document.getElementById('f_subject').value;
  const date=document.getElementById('f_date').value;
  if(!title) return toast("الرجاء إدخال اسم المهمة","danger");
  S.workspace.tasks = S.workspace.tasks.map(t=>t.id===id?{...t,title,subject,date}:t);
  await persistWorkspace(); closeModal(); toast("تم تحديث المهمة");
}
function askDeleteTask(id){
  askConfirm("هل أنت متأكد من حذف هذه المهمة؟", async ()=>{
    S.workspace.tasks = S.workspace.tasks.filter(t=>t.id!==id);
    await persistWorkspace(); toast("تم حذف المهمة"); render();
  });
}

/* ============================================================
   SUBJECTS PAGE
============================================================ */
const SUBJECT_COLORS = ["#0F2345","#C8A15A","#2F7D5D","#7A7A7A","#B4483C","#16305F"];
/* ============================================================
   الجدول الدراسي: أيام + أوقات + تنبيهات
============================================================ */
const WEEK_DAYS = ["الأحد","الاثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"];
const REMINDER_OPTIONS = [
  {v:0,  label:"بدون تنبيه"},
  {v:5,  label:"قبل 5 دقائق"},
  {v:10, label:"قبل 10 دقائق"},
  {v:15, label:"قبل 15 دقيقة"},
  {v:30, label:"قبل 30 دقيقة"},
  {v:60, label:"قبل ساعة"},
];
// "14:30" -> "2:30 م"
function to12h(hhmm){
  if(!hhmm) return "";
  const [hRaw, mRaw] = hhmm.split(":");
  let h = parseInt(hRaw,10); const m = (mRaw||"00").padStart(2,"0");
  if(isNaN(h)) return "";
  const isPM = h >= 12;
  let h12 = h % 12; if(h12===0) h12 = 12;
  const suffix = S.lang==="en" ? (isPM?"PM":"AM") : (isPM?"م":"ص");
  return `${h12}:${m} ${suffix}`;
}
function minutesOf(hhmm){
  if(!hhmm) return 0;
  const [h,m] = hhmm.split(":").map(x=>parseInt(x,10)||0);
  return h*60+m;
}
function dayLabel(d){
  if(S.lang!=="en") return d;
  const map = {"الأحد":"Sunday","الاثنين":"Monday","الثلاثاء":"Tuesday","الأربعاء":"Wednesday","الخميس":"Thursday","الجمعة":"Friday","السبت":"Saturday"};
  return map[d]||d;
}
function reminderLabel(mins){
  const found = REMINDER_OPTIONS.find(o=>o.v===Number(mins));
  if(!found) return "";
  return S.lang==="en"
    ? (found.v===0 ? "No reminder" : `${found.v} min before`)
    : found.label;
}
function daySelectHtml(id, selected){
  return `<select id="${id}">${WEEK_DAYS.map(d=>`<option value="${d}" ${d===selected?'selected':''}>${d}</option>`).join("")}</select>`;
}
function reminderSelectHtml(id, selected){
  return `<select id="${id}">${REMINDER_OPTIONS.map(o=>`<option value="${o.v}" ${Number(selected)===o.v?'selected':''}>${o.label}</option>`).join("")}</select>`;
}

function renderSchedulePage(){
  const w = S.workspace;
  const withTime = (w.subjects||[]).filter(s=>s.day && s.time);
  if(withTime.length===0){
    return card(emptyState('calendar', t('لا توجد حصص في الجدول — أضف يومًا ووقتًا لموادك من صفحة المواد الدراسية')));
  }
  const blocks = WEEK_DAYS.map(day=>{
    const classes = withTime.filter(s=>s.day===day).sort((a,b)=>minutesOf(a.time)-minutesOf(b.time));
    if(classes.length===0) return "";
    return card(`
      <div class="section-header">
        <h3 class="section-title">${icon('calendar',17)} ${dayLabel(day)}</h3>
        ${badge(classes.length + (S.lang==="en" ? " class(es)" : " حصص"),'default')}
      </div>
      <div style="display:flex;flex-direction:column;">
        ${classes.map(c=>`
          <div class="sched-row">
            <div class="sched-time">${to12h(c.time)}</div>
            <div class="sched-bar" style="background:${c.color}"></div>
            <div style="flex:1;min-width:0;">
              <div style="font-size:14px;font-weight:700;">${esc(c.name)}</div>
              <div style="font-size:12px;color:var(--gray);margin-top:2px;">${esc(c.teacher||"")}</div>
            </div>
            ${Number(c.reminder)>0 ? badge(icon('bell',11)+" "+reminderLabel(c.reminder),'gold') : ""}
          </div>`).join("")}
      </div>
    `);
  }).filter(Boolean).join("");
  return `<div style="display:flex;flex-direction:column;gap:20px;">${blocks}</div>`;
}

function renderSubjectsPage(){
  const w=S.workspace;
  const cardsHtml = w.subjects.length===0 ? card(emptyState('book', t('لا توجد مواد بعد'))) :
    `<div class="grid sm-grid-2 lg-grid-3">${w.subjects.map(s=>{
      const related = w.tasks.filter(t=>t.subject===s.name).length;
      return card(`
        <div class="flex-between" style="margin-bottom:12px;">
          <div style="width:40px;height:40px;border-radius:12px;background:${s.color};"></div>
          <div class="row-actions"><button class="icon-sm-btn" onclick="openEditSubject('${s.id}')">${icon('edit',13)}</button><button class="icon-sm-btn danger" onclick="askDeleteSubject('${s.id}')">${icon('trash',13)}</button></div>
        </div>
        <h4 style="font-size:14px;font-weight:700;margin:0;">${esc(s.name)}</h4>
        <p style="font-size:12px;color:var(--gray);margin:2px 0 12px;">${esc(s.teacher)}</p>
        <div class="flex-between" style="font-size:12px;color:var(--gray);margin-bottom:8px;"><span>${s.hours} ساعات أسبوعيًا</span><span>${related} مهام</span></div>
        ${s.day && s.time ? `<div class="flex-gap" style="font-size:12px;color:var(--gray);margin-bottom:8px;flex-wrap:wrap;">${icon('calendar',12)} <span>${dayLabel(s.day)}</span> ${icon('clock',12)} <span>${to12h(s.time)}</span></div>` : ""}
        <div class="flex-between"><span style="font-size:12px;color:var(--gray);">متوسط الدرجات</span>${badge(s.avgGrade+'%','gold')}</div>
      `);
    }).join("")}</div>`;
  return `<div style="display:flex;flex-direction:column;gap:20px;">
    <div style="display:flex;justify-content:flex-end;"><button class="btn-primary" onclick="openAddSubject()">${icon('plus',16)} ${t("مادة جديدة")}</button></div>
    ${cardsHtml}
  </div>`;
}
function colorSwatches(selected){
  return SUBJECT_COLORS.map(c=>`<button type="button" class="color-swatch ${c===selected?'selected':''}" style="background:${c}" onclick="selectSwatch('${c}')"></button>`).join("");
}
let pendingColor = SUBJECT_COLORS[0];
function selectSwatch(c){ pendingColor=c; document.querySelectorAll('.color-swatch').forEach(el=>el.classList.remove('selected')); event.target.classList.add('selected'); }
function openAddSubject(){
  pendingColor = SUBJECT_COLORS[0];
  openModal({ title:"مادة جديدة", body:`
    <div class="field"><span class="field-label">اسم المادة</span><input id="f_name" /></div>
    <div class="field"><span class="field-label">المدرس</span><input id="f_teacher" /></div>
    <div class="field"><span class="field-label">عدد الساعات</span><input id="f_hours" type="number" value="2" /></div>
    <div class="field"><span class="field-label">متوسط الدرجات (%)</span><input id="f_grade" type="number" value="80" /></div>
    <div class="field"><span class="field-label">يوم الحصة</span>${daySelectHtml('f_day', WEEK_DAYS[0])}</div>
    <div class="field"><span class="field-label">وقت الحصة</span><input id="f_time" type="time" value="08:00" /></div>
    <div class="field"><span class="field-label">التنبيه قبل الحصة</span>${reminderSelectHtml('f_reminder', 15)}</div>
    <div class="field"><span class="field-label">اللون</span><div class="flex-gap">${colorSwatches(pendingColor)}</div></div>
    <button class="btn-primary full" onclick="saveAddSubject()">حفظ</button>
  `});
}
async function saveAddSubject(){
  const name=document.getElementById('f_name').value.trim();
  const teacher=document.getElementById('f_teacher').value.trim();
  const hours=Number(document.getElementById('f_hours').value)||0;
  const avgGrade=Number(document.getElementById('f_grade').value)||0;
  const day=document.getElementById('f_day').value;
  const time=document.getElementById('f_time').value;
  const reminder=Number(document.getElementById('f_reminder').value)||0;
  if(!name) return toast("الرجاء إدخال اسم المادة","danger");
  S.workspace.subjects=[{id:uid(),name,teacher,hours,avgGrade,day,time,reminder,color:pendingColor}, ...S.workspace.subjects];
  await persistWorkspace(); closeModal(); toast("تمت إضافة المادة وتم ترتيبها في الجدول 🎉");
}
function openEditSubject(id){
  const s = S.workspace.subjects.find(x=>x.id===id); if(!s) return;
  pendingColor = s.color;
  openModal({ title:"تعديل المادة", body:`
    <div class="field"><span class="field-label">اسم المادة</span><input id="f_name" value="${esc(s.name)}" /></div>
    <div class="field"><span class="field-label">المدرس</span><input id="f_teacher" value="${esc(s.teacher)}" /></div>
    <div class="field"><span class="field-label">عدد الساعات</span><input id="f_hours" type="number" value="${s.hours}" /></div>
    <div class="field"><span class="field-label">متوسط الدرجات (%)</span><input id="f_grade" type="number" value="${s.avgGrade}" /></div>
    <div class="field"><span class="field-label">يوم الحصة</span>${daySelectHtml('f_day', s.day || WEEK_DAYS[0])}</div>
    <div class="field"><span class="field-label">وقت الحصة</span><input id="f_time" type="time" value="${s.time||'08:00'}" /></div>
    <div class="field"><span class="field-label">التنبيه قبل الحصة</span>${reminderSelectHtml('f_reminder', s.reminder ?? 15)}</div>
    <div class="field"><span class="field-label">اللون</span><div class="flex-gap">${colorSwatches(pendingColor)}</div></div>
    <button class="btn-primary full" onclick="saveEditSubject('${id}')">حفظ</button>
  `});
}
async function saveEditSubject(id){
  const name=document.getElementById('f_name').value.trim();
  const teacher=document.getElementById('f_teacher').value.trim();
  const hours=Number(document.getElementById('f_hours').value)||0;
  const avgGrade=Number(document.getElementById('f_grade').value)||0;
  const day=document.getElementById('f_day').value;
  const time=document.getElementById('f_time').value;
  const reminder=Number(document.getElementById('f_reminder').value)||0;
  if(!name) return toast("الرجاء إدخال اسم المادة","danger");
  S.workspace.subjects = S.workspace.subjects.map(s=>s.id===id?{...s,name,teacher,hours,avgGrade,day,time,reminder,color:pendingColor}:s);
  await persistWorkspace(); closeModal(); toast("تم تحديث المادة");
}
function askDeleteSubject(id){
  askConfirm("هل أنت متأكد من حذف هذه المادة؟", async ()=>{
    S.workspace.subjects = S.workspace.subjects.filter(s=>s.id!==id);
    await persistWorkspace(); toast("تم حذف المادة"); render();
  });
}

/* ============================================================
   EXAMS PAGE
============================================================ */
function renderExamsPage(){
  const w=S.workspace;
  const sorted = [...w.exams].sort((a,b)=>a.date.localeCompare(b.date));
  const next = sorted.find(e=>daysUntil(e.date)>=0) || sorted[0];
  const hero = next ? `<div class="exam-hero">
    <div><p style="font-size:12px;color:rgba(255,255,255,.6);margin:0 0 4px;">أقرب اختبار قادم</p><h3 style="font-size:20px;font-weight:800;margin:0;">${esc(next.subject)}</h3>
    <p style="font-size:12px;color:rgba(255,255,255,.7);margin:6px 0 0;display:flex;align-items:center;gap:4px;">${icon('mappin',12)} ${esc(next.place||"—")} • ${to12h(next.time)}</p></div>
    <div style="text-align:center;"><div class="days">${Math.max(0,daysUntil(next.date))}</div><p style="font-size:12px;color:rgba(255,255,255,.6);margin:0;">يوم متبقي</p></div>
  </div>` : "";

  const listHtml = w.exams.length===0 ? card(emptyState('examcheck', t('لا توجد اختبارات مضافة'))) :
    `<div class="grid sm-grid-2">${sorted.map(e=>card(`
      <div class="flex-between" style="margin-bottom:8px;"><h4 style="font-size:14px;font-weight:700;margin:0;">${esc(e.subject)}</h4>
        <div class="row-actions"><button class="icon-sm-btn" onclick="openEditExam('${e.id}')">${icon('edit',13)}</button><button class="icon-sm-btn danger" onclick="askDeleteExam('${e.id}')">${icon('trash',13)}</button></div>
      </div>
      <div class="flex-gap" style="font-size:12px;color:var(--gray);flex-wrap:wrap;">
        <span class="flex-gap">${icon('calendar',12)} ${e.date}</span>
        <span class="flex-gap">${icon('clock',12)} ${to12h(e.time)}</span>
        <span class="flex-gap">${icon('mappin',12)} ${esc(e.place||"—")}</span>
      </div>
      ${e.notes?`<p style="font-size:12px;color:var(--gray);margin:8px 0 0;">${esc(e.notes)}</p>`:""}
    `)).join("")}</div>`;

  return `<div style="display:flex;flex-direction:column;gap:20px;">
    ${hero}
    <div style="display:flex;justify-content:flex-end;"><button class="btn-primary" onclick="openAddExam()">${icon('plus',16)} ${t("اختبار جديد")}</button></div>
    ${listHtml}
  </div>`;
}
function openAddExam(){
  openModal({ title:"اختبار جديد", body:`
    <div class="field"><span class="field-label">المادة</span><select id="f_subject">${subjectOptions(S.workspace.subjects[0]?.name)}</select></div>
    <div class="field"><span class="field-label">التاريخ</span><input id="f_date" type="date" value="2026-09-01" /></div>
    <div class="field"><span class="field-label">الوقت</span><input id="f_time" type="time" value="09:00" /></div>
    <div class="field"><span class="field-label">المكان</span><input id="f_place" /></div>
    <div class="field"><span class="field-label">ملاحظات</span><textarea id="f_notes" rows="2"></textarea></div>
    <button class="btn-primary full" onclick="saveAddExam()">حفظ</button>
  `});
}
async function saveAddExam(){
  const subject=document.getElementById('f_subject').value;
  const date=document.getElementById('f_date').value;
  const time=document.getElementById('f_time').value;
  const place=document.getElementById('f_place').value.trim();
  const notes=document.getElementById('f_notes').value.trim();
  S.workspace.exams=[{id:uid(),subject,date,time,place,notes}, ...S.workspace.exams];
  await persistWorkspace(); closeModal(); toast("تمت إضافة الاختبار 🎉");
}
function openEditExam(id){
  const e = S.workspace.exams.find(x=>x.id===id); if(!e) return;
  openModal({ title:"تعديل الاختبار", body:`
    <div class="field"><span class="field-label">المادة</span><select id="f_subject">${subjectOptions(e.subject)}</select></div>
    <div class="field"><span class="field-label">التاريخ</span><input id="f_date" type="date" value="${e.date}" /></div>
    <div class="field"><span class="field-label">الوقت</span><input id="f_time" type="time" value="${e.time}" /></div>
    <div class="field"><span class="field-label">المكان</span><input id="f_place" value="${esc(e.place)}" /></div>
    <div class="field"><span class="field-label">ملاحظات</span><textarea id="f_notes" rows="2">${esc(e.notes)}</textarea></div>
    <button class="btn-primary full" onclick="saveEditExam('${id}')">حفظ</button>
  `});
}
async function saveEditExam(id){
  const subject=document.getElementById('f_subject').value;
  const date=document.getElementById('f_date').value;
  const time=document.getElementById('f_time').value;
  const place=document.getElementById('f_place').value.trim();
  const notes=document.getElementById('f_notes').value.trim();
  S.workspace.exams = S.workspace.exams.map(e=>e.id===id?{...e,subject,date,time,place,notes}:e);
  await persistWorkspace(); closeModal(); toast("تم تحديث الاختبار");
}
function askDeleteExam(id){
  askConfirm("هل أنت متأكد من حذف هذا الاختبار؟", async ()=>{
    S.workspace.exams = S.workspace.exams.filter(e=>e.id!==id);
    await persistWorkspace(); toast("تم حذف الاختبار"); render();
  });
}

/* ============================================================
   CALENDAR PAGE
============================================================ */
function renderCalendarPage(){
  const c=S.calCursor, y=c.getFullYear(), m=c.getMonth();
  const total=daysInMonth(y,m), start=firstWeekday(y,m);
  const typeColor = t => t==='exam' ? 'var(--danger)' : t==='task' ? 'var(--gold)' : 'var(--navy)';
  let cells="";
  for(let i=0;i<start;i++) cells+=`<div></div>`;
  for(let d=1; d<=total; d++){
    const dateStr = fmtDate(new Date(y,m,d));
    const dayEvents = S.workspace.events.filter(e=>e.date===dateStr);
    cells += `<button class="full-cal-cell" onclick="openAddEvent('${dateStr}')">
      <span class="full-cal-num">${d}</span>
      ${dayEvents.slice(0,2).map(e=>`<span class="cal-event-chip" style="background:${typeColor(e.type)}">${esc(e.title)}</span>`).join("")}
      ${dayEvents.length>2?`<span style="font-size:9px;color:var(--gray);">+${dayEvents.length-2}</span>`:""}
    </button>`;
  }
  return card(`
    <div class="calendar-head">
      <button class="calendar-nav-btn" onclick="calNav(-1)">${icon('chevdown',16)}</button>
      <h3 style="font-size:17px;font-weight:800;margin:0;">${MONTHS[m]} ${y}</h3>
      <div class="flex-gap">
        <button class="calendar-nav-btn" style="background:var(--gold);color:var(--navy);" onclick="openAddEvent('')">${icon('plus',16)}</button>
        <button class="calendar-nav-btn" onclick="calNav(1)">${icon('chevdown',16)}</button>
      </div>
    </div>
    <div class="full-cal-grid" style="margin-bottom:8px;">${WEEKDAYS.map(d=>`<span class="full-cal-label">${d}</span>`).join("")}</div>
    <div class="full-cal-grid">${cells}</div>
  `);
}
function calNav(dir){ const c=S.calCursor; S.calCursor=new Date(c.getFullYear(), c.getMonth()+dir, 1); render(); }
function openAddEvent(dateStr){
  const d = dateStr || fmtDate(new Date(S.calCursor.getFullYear(), S.calCursor.getMonth(), 1));
  openModal({ title:"إضافة حدث", body:`
    <div class="field"><span class="field-label">عنوان الحدث</span><input id="f_title" /></div>
    <div class="field"><span class="field-label">التاريخ</span><input id="f_date" type="date" value="${d}" /></div>
    <div class="field"><span class="field-label">النوع</span><select id="f_type"><option value="event">حدث</option><option value="task">مهمة</option><option value="exam">اختبار</option></select></div>
    <button class="btn-primary full" onclick="saveAddEvent()">حفظ الحدث</button>
  `});
}
async function saveAddEvent(){
  const title=document.getElementById('f_title').value.trim();
  const date=document.getElementById('f_date').value;
  const type=document.getElementById('f_type').value;
  if(!title) return toast("الرجاء إدخال عنوان الحدث","danger");
  S.workspace.events=[...S.workspace.events, {id:uid(),title,date,type}];
  await persistWorkspace(); closeModal(); toast("تمت إضافة الحدث 🎉");
}

/* ============================================================
   GOALS PAGE
============================================================ */
function renderGoalsPage(){
  const w=S.workspace;
  const priorityTone = p => p==='عالية' ? 'danger' : p==='متوسطة' ? 'gold' : 'success';
  const listHtml = w.goals.length===0 ? card(emptyState('target', t('لا توجد أهداف بعد'))) :
    `<div class="grid sm-grid-2">${w.goals.map(g=>card(`
      <div class="flex-between" style="align-items:flex-start;margin-bottom:12px;">
        <div><h4 style="font-size:14px;font-weight:700;margin:0;">${esc(g.title)}</h4><p style="font-size:12px;color:var(--gray);margin:4px 0 0;">الموعد النهائي: ${g.deadline}</p></div>
        <div class="row-actions"><button class="icon-sm-btn" onclick="openEditGoal('${g.id}')">${icon('edit',13)}</button><button class="icon-sm-btn danger" onclick="askDeleteGoal('${g.id}')">${icon('trash',13)}</button></div>
      </div>
      <div class="flex-between" style="margin-bottom:6px;"><span style="font-size:12px;color:var(--gray);">التقدم</span><span style="font-size:14px;font-weight:800;color:var(--gold);">${g.progress}%</span></div>
      ${progressBar(g.progress)}
      <div class="flex-gap" style="margin-top:12px;">${badge(g.priority, priorityTone(g.priority))}${badge(g.status)}</div>
    `)).join("")}</div>`;
  return `<div style="display:flex;flex-direction:column;gap:20px;">
    <div style="display:flex;justify-content:flex-end;"><button class="btn-primary" onclick="openAddGoal()">${icon('plus',16)} ${t("هدف جديد")}</button></div>
    ${listHtml}
  </div>`;
}
function openAddGoal(){
  openModal({ title:"هدف جديد", body:`
    <div class="field"><span class="field-label">اسم الهدف</span><input id="f_title" /></div>
    <div class="field"><span class="field-label">نسبة التقدم (%)</span><input id="f_progress" type="number" min="0" max="100" value="0" /></div>
    <div class="field"><span class="field-label">الموعد النهائي</span><input id="f_deadline" type="date" value="2026-12-01" /></div>
    <div class="field"><span class="field-label">الأولوية</span><select id="f_priority"><option>عالية</option><option>متوسطة</option><option>منخفضة</option></select></div>
    <div class="field"><span class="field-label">الحالة</span><select id="f_status"><option>قيد التنفيذ</option><option>مكتمل</option><option>متوقف</option></select></div>
    <button class="btn-primary full" onclick="saveAddGoal()">حفظ</button>
  `});
}
async function saveAddGoal(){
  const title=document.getElementById('f_title').value.trim();
  const progress=Number(document.getElementById('f_progress').value)||0;
  const deadline=document.getElementById('f_deadline').value;
  const priority=document.getElementById('f_priority').value;
  const status=document.getElementById('f_status').value;
  if(!title) return toast("الرجاء إدخال اسم الهدف","danger");
  S.workspace.goals=[{id:uid(),title,progress,deadline,priority,status}, ...S.workspace.goals];
  await persistWorkspace(); closeModal(); toast("تمت إضافة الهدف 🎉");
}
function openEditGoal(id){
  const g = S.workspace.goals.find(x=>x.id===id); if(!g) return;
  openModal({ title:"تعديل الهدف", body:`
    <div class="field"><span class="field-label">اسم الهدف</span><input id="f_title" value="${esc(g.title)}" /></div>
    <div class="field"><span class="field-label">نسبة التقدم (%)</span><input id="f_progress" type="number" min="0" max="100" value="${g.progress}" /></div>
    <div class="field"><span class="field-label">الموعد النهائي</span><input id="f_deadline" type="date" value="${g.deadline}" /></div>
    <div class="field"><span class="field-label">الأولوية</span><select id="f_priority">${["عالية","متوسطة","منخفضة"].map(o=>`<option ${o===g.priority?'selected':''}>${o}</option>`).join("")}</select></div>
    <div class="field"><span class="field-label">الحالة</span><select id="f_status">${["قيد التنفيذ","مكتمل","متوقف"].map(o=>`<option ${o===g.status?'selected':''}>${o}</option>`).join("")}</select></div>
    <button class="btn-primary full" onclick="saveEditGoal('${id}')">حفظ</button>
  `});
}
async function saveEditGoal(id){
  const title=document.getElementById('f_title').value.trim();
  const progress=Number(document.getElementById('f_progress').value)||0;
  const deadline=document.getElementById('f_deadline').value;
  const priority=document.getElementById('f_priority').value;
  const status=document.getElementById('f_status').value;
  if(!title) return toast("الرجاء إدخال اسم الهدف","danger");
  S.workspace.goals = S.workspace.goals.map(g=>g.id===id?{...g,title,progress,deadline,priority,status}:g);
  await persistWorkspace(); closeModal(); toast("تم تحديث الهدف");
}
function askDeleteGoal(id){
  askConfirm("هل أنت متأكد من حذف هذا الهدف؟", async ()=>{
    S.workspace.goals = S.workspace.goals.filter(g=>g.id!==id);
    await persistWorkspace(); toast("تم حذف الهدف"); render();
  });
}

/* ============================================================
   NOTES PAGE
============================================================ */
function renderNotesPage(){
  const w=S.workspace;
  const listHtml = w.notes.length===0 ? card(emptyState('note', t('لا توجد ملاحظات بعد'))) :
    `<div class="grid sm-grid-2 lg-grid-3">${w.notes.map(n=>card(`
      <div class="flex-between" style="align-items:flex-start;margin-bottom:8px;">
        <h4 style="font-size:14px;font-weight:700;margin:0;">${esc(n.title)}</h4>
        <div class="row-actions"><button class="icon-sm-btn" onclick="openEditNote('${n.id}')">${icon('edit',13)}</button><button class="icon-sm-btn danger" onclick="askDeleteNote('${n.id}')">${icon('trash',13)}</button></div>
      </div>
      <p style="font-size:12px;color:var(--gray);margin:0;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;">${esc(n.content)}</p>
      <span style="font-size:10px;color:var(--gray);display:block;margin-top:8px;">آخر تحديث: ${n.updatedAt}</span>
    `)).join("")}</div>`;
  return `<div style="display:flex;flex-direction:column;gap:20px;">
    <div style="display:flex;justify-content:flex-end;"><button class="btn-primary" onclick="openAddNote()">${icon('plus',16)} ${t("ملاحظة جديدة")}</button></div>
    ${listHtml}
  </div>`;
}
function openAddNote(){
  openModal({ title:"ملاحظة جديدة", body:`
    <div class="field"><span class="field-label">العنوان</span><input id="f_title" /></div>
    <div class="field"><span class="field-label">المحتوى</span><textarea id="f_content" rows="5"></textarea></div>
    <button class="btn-primary full" onclick="saveAddNote()">حفظ</button>
  `});
}
async function saveAddNote(){
  const title=document.getElementById('f_title').value.trim();
  const content=document.getElementById('f_content').value.trim();
  if(!title) return toast("الرجاء إدخال عنوان الملاحظة","danger");
  S.workspace.notes=[{id:uid(),title,content,updatedAt:fmtDate(new Date(2026,7,24))}, ...S.workspace.notes];
  await persistWorkspace(); closeModal(); toast("تمت إضافة الملاحظة 🎉");
}
function openEditNote(id){
  const n = S.workspace.notes.find(x=>x.id===id); if(!n) return;
  openModal({ title:"تعديل الملاحظة", body:`
    <div class="field"><span class="field-label">العنوان</span><input id="f_title" value="${esc(n.title)}" /></div>
    <div class="field"><span class="field-label">المحتوى</span><textarea id="f_content" rows="5">${esc(n.content)}</textarea></div>
    <button class="btn-primary full" onclick="saveEditNote('${id}')">حفظ</button>
  `});
}
async function saveEditNote(id){
  const title=document.getElementById('f_title').value.trim();
  const content=document.getElementById('f_content').value.trim();
  if(!title) return toast("الرجاء إدخال عنوان الملاحظة","danger");
  S.workspace.notes = S.workspace.notes.map(n=>n.id===id?{...n,title,content,updatedAt:fmtDate(new Date(2026,7,24))}:n);
  await persistWorkspace(); closeModal(); toast("تم تحديث الملاحظة");
}
function askDeleteNote(id){
  askConfirm("هل أنت متأكد من حذف هذه الملاحظة؟", async ()=>{
    S.workspace.notes = S.workspace.notes.filter(n=>n.id!==id);
    await persistWorkspace(); toast("تم حذف الملاحظة"); render();
  });
}

/* ============================================================
   STATISTICS PAGE
============================================================ */
function renderStatisticsPage(){
  const w=S.workspace;
  const done = w.tasks.filter(t=>t.done).length, remaining=w.tasks.length-done;
  const completion = w.tasks.length ? Math.round(done/w.tasks.length*100) : 0;
  const maxGrade = Math.max(...w.subjects.map(s=>s.avgGrade), 100);
  const bars = w.subjects.map(s=>`<div class="bar-col"><span class="bar-value">${s.avgGrade}</span><div class="bar" style="height:${(s.avgGrade/maxGrade*100)}%;background:${s.color}"></div><span class="bar-label">${esc(s.name)}</span></div>`).join("");
  const donePct = w.tasks.length ? Math.round(done/w.tasks.length*100) : 0;
  const donut = `background: conic-gradient(var(--success) 0% ${donePct}%, var(--gold) ${donePct}% 100%);`;

  return `<div style="display:flex;flex-direction:column;gap:20px;">
    <div class="grid grid-4" style="grid-template-columns:repeat(2,1fr);">
      ${card(`<div class="stat-icon">${icon('tasks',18)}</div><div class="stat-value">${w.tasks.length}</div><div class="stat-label">إجمالي المهام</div>`)}
      ${card(`<div class="stat-icon">${icon('checkcircle',18)}</div><div class="stat-value">${done}</div><div class="stat-label">المهام المكتملة</div>`)}
      ${card(`<div class="stat-icon">${icon('trend',18)}</div><div class="stat-value">${completion}%</div><div class="stat-label">نسبة الإنجاز</div>`)}
      ${card(`<div class="stat-icon">${icon('book',18)}</div><div class="stat-value">${w.subjects.length}</div><div class="stat-label">عدد المواد</div>`)}
    </div>
    <div class="grid lg-grid-3" style="grid-template-columns:1fr;">
      <div class="lg-col-2">${card(`<div class="section-header"><h3 class="section-title">${t("متوسط الدرجات حسب المادة")}</h3></div><div class="bar-chart">${bars}</div>`)}</div>
      ${card(`<div class="section-header"><h3 class="section-title">${t("حالة المهام")}</h3></div>
        <div class="donut-wrap"><div class="donut" style="${donut}"></div>
          <div class="legend"><div class="legend-item"><span class="legend-dot" style="background:var(--success);"></span>منجزة (${done})</div><div class="legend-item"><span class="legend-dot" style="background:var(--gold);"></span>متبقية (${remaining})</div></div>
        </div>`)}
    </div>
  </div>`;
}

/* ============================================================
   SETTINGS PAGE
============================================================ */
async function saveNickname(){
  const el = document.getElementById('f_nickname');
  if(!el) return;
  const name = el.value.trim();
  if(!name) return toast(t("الرجاء إدخال الاسم المعروض"),"danger");
  if(name === S.currentUser.name) return toast(t("تم حفظ التغييرات"));
  const list = (await storeGet('vision_accounts_v1', true)) || S.accounts;
  const updated = list.map(a => a.id===S.currentUser.id ? {...a, name} : a);
  S.accounts = updated;
  S.currentUser = {...S.currentUser, name};
  await storeSet('vision_accounts_v1', updated, true);
  toast(t("تم تحديث الاسم المعروض 🎉"));
}

function renderSettingsPage(){
  const initial=(S.currentUser?.name||"س").trim().charAt(0);
  return `<div class="grid lg-grid-3" style="grid-template-columns:1fr;">
    ${card(`
      <div style="display:flex;flex-direction:column;align-items:center;text-align:center;gap:10px;">
        <div class="avatar" style="width:80px;height:80px;font-size:26px;">${esc(initial)}</div>
        <div>
          <h3 style="margin:0;font-size:15px;font-weight:700;">${esc(S.currentUser?.name||"")}</h3>
          <p style="font-size:12px;color:var(--gray);margin:4px 0 0;">${t("طالب")} · @${esc(S.currentUser?.username||"")}</p>
        </div>
        <div class="field" style="width:100%;text-align:start;margin:6px 0 0;">
          <span class="field-label">${t("الاسم المعروض")}</span>
          <input id="f_nickname" type="text" value="${esc(S.currentUser?.name||"")}" maxlength="40" placeholder="${t("الاسم المعروض")}" />
        </div>
        <p style="font-size:11px;color:var(--gray);margin:0;">${t("اسم المستخدم لا يمكن تغييره، تواصل مع المسؤول عند الحاجة")}</p>
        <button class="btn-primary full" onclick="saveNickname()">${t("حفظ الملف الشخصي")}</button>
      </div>
    `)}
    <div class="lg-col-2" style="display:flex;flex-direction:column;gap:20px;">
      ${card(`
        <div class="section-header"><h3 class="section-title">${t("المظهر")}</h3></div>
        <div class="flex-between" style="padding:12px 0;">
          <div><p style="font-size:14px;font-weight:600;margin:0;">${t("الوضع الليلي")}</p><p style="font-size:12px;color:var(--gray);margin:2px 0 0;">${t("يبدّل شكل الواجهة بالكامل")}</p></div>
          <button class="toggle ${S.dark?'on':''}" onclick="toggleDark()"><span class="toggle-knob"></span></button>
        </div>
      `)}
    </div>
  </div>`;
}

/* ============================================================
   WIRE + BOOT
============================================================ */
function wireGlobalEvents(){
  const f = document.getElementById('loginForm');
  if(f) f.addEventListener('submit', handleLoginSubmit);
  document.querySelectorAll('.hide-lg').forEach(el=>{ if(window.innerWidth>=1024) el.style.display='none'; });
}

async function boot(){
  if(!db){
    console.warn("Supabase غير مهيّأ بعد — عدّل SUPABASE_URL و SUPABASE_ANON_KEY في index.html. البيانات ستعمل مؤقتًا في الذاكرة فقط ولن تُحفظ.");
  }
  let accounts = await storeGet('vision_accounts_v1', true);
  if(!accounts || accounts.length===0){ accounts = seedAccounts(); await storeSet('vision_accounts_v1', accounts, true); }
  const expChk = applyExpirations(accounts);
  if(expChk.changed){ accounts = expChk.list; await storeSet('vision_accounts_v1', accounts, true); }
  S.accounts = accounts;

  // كل طالب له نسخته الخاصة من البيانات — تُحمّل بعد تسجيل الدخول (انظر loadWorkspaceForCurrentUser)
  S.workspace = seedWorkspace();

  S.ready = true;
  S.screen = "login";
  render();
}
async function loadWorkspaceForCurrentUser(){
  const key = workspaceKey();
  let workspace = await storeGet(key, true);
  if(!workspace){ workspace = seedWorkspace(); await storeSet(key, workspace, true); }
  S.workspace = workspace;
}
setTimeout(boot, 600);
render();

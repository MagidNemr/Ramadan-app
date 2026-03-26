// الوضع الفاتح / الداكن
const toggleBtn = document.getElementById('toggleTheme');
function applyTheme(theme){
  document.body.classList.remove('light','dark');
  document.body.classList.add(theme);
  localStorage.setItem('theme',theme);
}
const savedTheme = localStorage.getItem('theme');
if(savedTheme) applyTheme(savedTheme);
else applyTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
toggleBtn.onclick = () => {
  const current = document.body.classList.contains('dark') ? 'dark' : 'light';
  applyTheme(current === 'dark' ? 'light' : 'dark');
};

// الوقت الحالي
const nowTime = document.getElementById('nowTime');
function updateTime(){ const now = new Date(); nowTime.textContent = now.toLocaleTimeString('ar-EG',{hour12:false}); }
setInterval(updateTime,1000); updateTime();

// مسبحة رمضان
const counterEl = document.getElementById('counter');
let count = parseInt(localStorage.getItem('tasbeeh')) || 0;
counterEl.textContent = count;
document.getElementById('inc').onclick = ()=>{ count++; counterEl.textContent=count; localStorage.setItem('tasbeeh',count); };
document.getElementById('reset').onclick = ()=>{ count=0; counterEl.textContent=count; localStorage.setItem('tasbeeh',count); };

// حكمة يومية
const quotes=["الصبر مفتاح الفرج.","خير الأعمال أدومها وإن قل.","الحياء شعبة من الإيمان.","أحب للناس ما تحب لنفسك.","التوكل على الله نصف الرزق."];
const dailyEl=document.getElementById('daily');
function newQuote(){ const q=quotes[Math.floor(Math.random()*quotes.length)]; dailyEl.textContent=q; }
newQuote();
document.getElementById('newQuote').onclick=newQuote;
document.getElementById('shareQuote').onclick=()=>{ navigator.clipboard.writeText(dailyEl.textContent); alert('تم نسخ الحكمه!'); };

// تقويم رمضان
const calendarEl=document.getElementById('calendar');
function createCalendar(){ calendarEl.innerHTML=''; for(let i=1;i<=30;i++){ const day=document.createElement('div'); day.className='p-2 rounded-lg bg-gray-800 hover:bg-amber-400'; day.textContent=i; calendarEl.appendChild(day); } }
createCalendar();

// أوقات الإفطار والسحور
let iftarTime='18:30', suhoorTime='04:30';
const countdownIftar=document.getElementById('countdownIftar');
const countdownSuhoor=document.getElementById('countdownSuhoor');
const locationName = document.getElementById('locationName');
function updateCountdown(target,element){
  const now=new Date(); const [h,m]=target.split(':');
  let targetDate=new Date(now.getFullYear(),now.getMonth(),now.getDate(),h,m,0);
  if(targetDate<now) targetDate.setDate(targetDate.getDate()+1);
  const diff=targetDate-now;
  const hrs=Math.floor(diff/1000/60/60);
  const mins=Math.floor((diff/1000/60)%60);
  const secs=Math.floor((diff/1000)%60);
  element.textContent=`${hrs}س ${mins}د ${secs}ث`;
}
setInterval(()=>{ updateCountdown(iftarTime,countdownIftar); updateCountdown(suhoorTime,countdownSuhoor); },1000);

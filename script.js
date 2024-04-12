let h1=document.querySelector(".h1");
let selectMenu=document.querySelectorAll("select");
let alarmBtn=document.querySelector("button");
let content=document.querySelector(".content");
let alarmTime;
let ringtone=new Audio("./Files/alarm_clock.mp3");
let isAlarmSet=false;
for(let i=12;i>0;i--)
{
    i= i<10 ? "0"+i : i;
    let option=`<option value=${i}>${i}</option>`
    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend",option);
}
for(let i=59;i>=0;i--)
{
    i= i<10 ? "0"+i : i;
    let option=`<option value=${i}>${i}</option>`
    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend",option);
}
for(let i=2;i>0;i--)
{
    let ampm= i==1?"AM" : "PM";
    let option=`<option value=${ampm}>${ampm}</option>`
    selectMenu[2].firstElementChild.insertAdjacentHTML("afterend",option);
}
let ampm="AM";


setInterval(()=>{
    let date=new Date();
    let h=date.getHours();
    let m=date.getMinutes();
    let s=date.getSeconds();
    if(h>=12)
    {
        h=h-12;
        ampm="PM";
    }
    h= h==0?h=12:h;
    h=h<10? "0"+h:h;
    m=m<10? "0"+m:m;
    s=s<10? "0"+s:s;
    h1.innerText= `${h} : ${m} : ${s} ${ampm}`;
    if(alarmTime==`${h}:${m} ${ampm}`)
    {
        ringtone.play();
        ringtone.loop=true;
    }
},1000);

function setAlarm()
{
    if(isAlarmSet)
    {
        alarmTime="";
        ringtone.pause();
        content.classList.remove("disable");
        alarmBtn.innerText="Set Alarm";
        return isAlarmSet=false;
    }
    let time= `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`;
    if(time.includes("Hour") || time.includes("Minute") || time.includes("AM/PM"))
    {
        return alert("Please, select valid time to set an Alarm!")
    }
    isAlarmSet=true;
    alarmTime=time;
    content.classList.add("disable");
    alarmBtn.innerText="Clear Alarm";
}
alarmBtn.addEventListener("click", setAlarm);
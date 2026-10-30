// Datos de ejemplo para generar las capturas del README sin usar información real.
// Simula window.claude (Google Calendar, Microsoft 365, base de datos y asistente).
(function(){
const CANVAS="TU_CALENDARIO_DE_CANVAS@import.calendar.google.com";
const HOL="es.spain#holiday@group.v.calendar.google.com";
let id=1;
const T=(d,h1,h2,s,c)=>({id:"e"+(id++),summary:s,colorId:c,status:"confirmed",start:{dateTime:d+"T"+h1+":00"},end:{dateTime:d+"T"+h2+":00"}});
const A=(d,s,c,cal,desc)=>{const x=new Date(d+"T00:00:00");x.setDate(x.getDate()+1);const e2=x.toISOString().slice(0,10);return {id:"e"+(id++),summary:s,colorId:c,status:"confirmed",description:desc||"",start:{date:d},end:{date:e2},_calId:cal}};
const ev=[
T("2026-10-05","09:00","11:00","Clase Programación","9"),T("2026-10-07","10:00","12:00","Clase Lenguaje de Marcas","3"),
A("2026-10-14","Test HTML Unidad 1","11"),T("2026-10-15","17:00","18:30","Repaso JavaScript","10"),
T("2026-10-19","09:00","11:00","Clase Programación","9"),A("2026-10-20","✓ Entrega Práctica 2 (Entornos)","8"),
T("2026-10-22","16:00","17:00","Tutoría","7"),T("2026-10-23","12:00","13:00","Charla empleabilidad","4"),
T("2026-10-26","09:00","11:00","Clase Programación","9"),T("2026-10-27","18:00","19:30","Estudiar Bases de Datos","10"),
T("2026-10-28","10:00","12:00","Clase Lenguaje de Marcas","3"),T("2026-10-29","16:00","17:30","Reunión grupo proyecto","6"),
T("2026-10-30","10:00","12:00","Clase Lenguaje de Marcas","3"),T("2026-10-30","18:00","19:30","Repaso CSS Grid","10"),
T("2026-11-02","09:00","11:00","Clase Programación","9"),A("2026-11-03","Examen Bases de Datos","11"),
T("2026-11-05","16:00","17:00","Reunión grupo proyecto","6"),A("2026-11-10","Test HTML Unidad 2","11"),
T("2026-11-12","11:00","12:00","Visita a empresa","7"),A("2026-11-18","Entrega Proyecto web (LLMM)","11"),
A("2026-11-04","Cuestionario Unidad 3 [1º DAW]",null,CANVAS),A("2026-11-09","Práctica 4 Entornos [1º DAW]",null,CANVAS),
A("2026-10-12","Fiesta Nacional de España",null,HOL,"Día festivo"),A("2026-11-01","Todos los Santos",null,HOL,"Día festivo"),
A("2026-12-06","Día de la Constitución",null,HOL,"Día festivo"),A("2026-12-08","Inmaculada Concepción",null,HOL,"Día festivo"),
A("2026-12-25","Navidad",null,HOL,"Día festivo"),A("2027-01-01","Año Nuevo",null,HOL,"Día festivo"),A("2027-01-06","Epifanía del Señor",null,HOL,"Día festivo")];
const XLS=["## Sheet: Agenda x","Módulo\tActividad\tFecha","Programación\tEjercicio puntuable 2\t13/11/2026","Bases de Datos\tEjercicio puntuable SQL\t24/11/2026","",
"## Sheet: Prácticas Programación x","Nº\tGrupo\tAlumno\tPráctica 3 - 06/11/2026\tPráctica 4 - 20/11/2026","1\tA\tApellidos Nombre\tEn curso\tSin empezar","",
"## Sheet: Prácticas LLMM x","Nº\tGrupo\tAlumno\tPráctica 2 Markdown - 20/10/2026\tProyecto web - 18/11/2026","1\tA\tApellidos Nombre\tLa he terminado\tEn curso",""].join("\n");
const mcp={callTool:async(srv,tool,i)=>{
  if(srv==="Microsoft 365")return {payload:XLS};
  if(tool==="list_events"){
    if(i.fullText)return {payload:{events:ev.filter(e=>(e.description||"").includes(i.fullText))}};
    const cal=i.calendarId||null,a=i.startTime.slice(0,10),b=i.endTime.slice(0,10);
    return {payload:{events:ev.filter(e=>(e._calId||null)===cal&&((e.start.date||e.start.dateTime).slice(0,10)>=a)&&((e.start.date||e.start.dateTime).slice(0,10)<b))}};}
  if(tool==="create_event"){const e=i.allDay?A(i.startTime.slice(0,10),i.summary,i.colorId,null,i.description):T(i.startTime.slice(0,10),i.startTime.slice(11,16),i.endTime.slice(11,16),i.summary,i.colorId);e.description=i.description||"";ev.push(e);return {payload:e}}
  if(tool==="update_event"){const e=ev.find(x=>x.id===i.eventId);if(e){if(i.summary)e.summary=i.summary;if(i.colorId)e.colorId=i.colorId;if(i.description)e.description=i.description}return {payload:e}}
  return {payload:{}};
}};
const store={pendientes:[{id:"p1",text:"Repasar apuntes de SQL",done:false,createdAt:1,due:"2026-11-02"},{id:"p2",text:"Subir el README del proyecto a GitHub",done:false,createdAt:2,due:""},{id:"p3",text:"Actualizar portfolio en LinkedIn",done:false,createdAt:3,due:"2026-11-06"}]};
function coll(n){const c={onSnapshot:(f)=>{setTimeout(()=>f({docs:(store[n]||[]).map(x=>({id:x.id,data:()=>x}))}),50);return ()=>{}},add:async(x)=>({id:"x"}),where:()=>c};return c}
const db={collection:coll,doc:()=>({set:async()=>{},update:async()=>{},delete:async()=>{}})};
const sample=async(p,o)=>{const t="Esta semana tienes:\n• Lun 2 – Clase de Programación (9:00)\n• Mar 3 – Examen de Bases de Datos ⚠️\n• Mié 4 – Cuestionario Unidad 3 (Canvas)\n• Vie 6 – Entrega Práctica 3 de Programación\n\nHuecos buenos para estudiar:\n• Domingo 1, de 10:00 a 13:00 → repaso de SQL para el examen\n• Lunes 2, de 16:00 a 19:00 → avanzar la Práctica 3\n• Miércoles 4, de 17:00 a 20:00 → cuestionario de Canvas\n\nConsejo: prioriza el examen del martes y deja la práctica para el miércoles y jueves.";o&&o.onText&&o.onText({text:t});return t};
sample.limits=async()=>({});
window.claude={use:async(n)=>n==="mcp"?mcp:n==="db"?db:n==="sample"?sample:null};
})();

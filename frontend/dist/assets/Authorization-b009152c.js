import{r as h,u as g,a as w,b as x,j as c,c as t,I as n,B as f,l as S}from"./index-23bb8cab.js";import{u as b}from"./index.esm-ca144db0.js";const k=()=>{h.useState(!1);const i=g(),l=w(),a=x(e=>e.auth.error),m=e=>{l(e,{replace:!0})},{register:s,control:y,handleSubmit:u,formState:{errors:o},reset:d}=b();return c("div",{className:"bg-white  m-10 max-w-2xl space-y-6 md:mx-auto rounded-3xl text-center p-10",children:[t("h1",{children:"Авторизация"}),c("form",{action:"",className:"space-y-5",onSubmit:u(async e=>{try{i(S(e)),await new Promise(p=>setTimeout(()=>p(""),1e3));const r=localStorage.getItem("token");r&&r.length>0&&(m("/"),window.location.reload()),d()}catch(r){r instanceof Error&&console.log(r.message)}}),children:[t(n,{type:"email",error:o.email,...s("email",{required:{value:!0,message:"Заполните email"}}),placeholder:"email"}),t(n,{error:o.password,type:"password",...s("password",{required:{value:!0,message:"Заполните password"}}),placeholder:"password"}),t(f,{children:"Авторизироваться"}),a.length>0&&t("span",{className:"block text-red-600",children:a})]})]})};export{k as default};
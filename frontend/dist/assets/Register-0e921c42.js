import{u as v,a as x,r as l,j as p,c as e,H as j,I as t,B as F,D as h}from"./index-5dd63a37.js";import{u as q}from"./index.esm-5614a77f.js";import{L as a}from"./label-4337ff5d.js";import"./tag.module-4ed993c7.js";import"./paragraph.module-b13e4475.js";import"./index.module-786cb49c.js";const V=()=>{const{register:r,control:E,handleSubmit:w,formState:{errors:i},watch:m}=q();v();const f=x(),[u,n]=l.useState(""),g=s=>{f(s,{replace:!0})},y=m("password",""),b=m("confirmpassword",""),N=y!==b,[c,S]=l.useState(!1);return l.useEffect(()=>{},[c]),p("div",{className:"bg-white max-w-2xl space-y-6 my-20 m-auto rounded-3xl sm:p-10",children:[e(j,{type:"h2",className:"text-center",children:"Регистрация"}),p("form",{action:"",className:"space-b-4",onSubmit:w(async s=>{if(console.log(s),s.password!==s.confirmpassword)throw new Error("failed password");if(c){const{email:d,code:o}=s;if(console.log(o,d),(await(await fetch(h.user.verify,{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:d,confirm:o})})).json()).error)n("Неверный код");else return n(""),g("/")}else{const o=await(await fetch(h.user.register,{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify(s)})).json();o.error?(console.log(o),n("Данный пользователь уже существует")):(n(""),S(!0))}}),children:[e(a,{htmlFor:"login",children:"Логин"}),e(t,{error:i.login,...r("login",{required:{value:!0,message:"Заполните login"}}),id:"login"}),e(a,{htmlFor:"email",children:"email"}),e(t,{error:i.email,...r("email",{required:{value:!0,message:"Заполните email"}}),id:"email"}),e(a,{htmlFor:"password",children:"password"}),e(t,{error:i.password,type:"password",...r("password",{required:{value:!0,message:"Заполните password"}}),id:"password"}),e(a,{htmlFor:"password",children:"Подтвердите пароль"}),e(t,{error:i.confirmpassword,type:"password",...r("confirmpassword",{required:{value:!0,message:"Заполните confirmpassword"}}),id:"confirmpassword"}),N&&e("p",{style:{color:"red"},children:"Пароли не совпадают"}),e(F,{type:"submit",children:"Регистрация"}),c&&p("div",{className:"block",children:[e(a,{htmlFor:"code",children:"Код для верификации аккаунта"}),e(t,{className:"",...r("code",{required:!0})})]}),u&&e("h1",{className:"text-red-200",children:u})]})]})};export{V as default};

import{u as i,p as d,b as r,r as m,W as u,X as h,j as l,c as s,H as f,B as x}from"./index-5dd63a37.js";import"./tag.module-4ed993c7.js";import"./paragraph.module-b13e4475.js";import{F as g}from"./FilterLayoutPhone-0fc43132.js";import"./phone.card-5f4d8707.js";import"./checkbox-24ea0404.js";import"./index.module-786cb49c.js";const E=()=>{const e=i(),{SearchValue:o}=d(),p=o==null?void 0:o.split(":")[1],n=r(t=>t.phone.phones);m.useEffect(()=>{e(u(p)),e(h(n))},[e]);const a=r(t=>t.search.founded);return console.log(a),a?s("div",{children:s(g,{phones:a.map(t=>t.product.map(c=>c)).flat(),text:"Результат поиска"})}):l("div",{className:" text-center my-20 m-auto",children:[" ",s(f,{type:"h1",children:"К сожалению ничего не найдено"}),s(x,{children:"Вернуться на главную"})]})};export{E as default};

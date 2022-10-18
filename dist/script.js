let pokemonRepository=function(){let t=[];function e(e){return t.push(e)}function n(){return t}function o(t){return fetch(t.detailsUrl).then(function(t){return t.json()}).then(function(e){return t.imageUrl=e.sprites.front_default,t.height=e.height,t.types=e.types,t}).catch(function(t){console.error(t)})}function i(t){let e=document.getElementById("modal-container"),n=e.querySelector(".modal-body");n.innerHTML="";e.querySelector(".modal-title").innerText=t.name;let o=`Height: ${t.height}`,i=document.createElement("p");i.innerText=o;let l=t.types.map(t=>t.type.name);console.log(l);let r=`Types: ${l.join(", ")}`,a=document.createElement("p");a.innerText=r;let s=document.createElement("img");s.src=t.imageUrl,console.log(t),n.appendChild(s),n.appendChild(i),n.appendChild(a)}function l(t){o(t).then(function(t){console.log(t),i(t)})}return{getAll:n,add:e,addListItem:function t(e){let n=document.querySelector(".container");n.classList.add("list-group"),n.classList.add("mt-4","mx-auto");let o=document.createElement("li");o.classList.add("group-list-item");let i=document.createElement("button");i.classList.add("btn","btn-primary","mt-3","btn-md","p-4","btn-block","list-unstyled"),o.style.listStyleType="none",i.setAttribute("data-toggle","modal"),i.setAttribute("data-target","#modal-container"),i.setAttribute("data-backdrop","true"),i.innerText=e.name,o.appendChild(i),n.appendChild(o),i.addEventListener("click",function(t){l(e)})},showDetails:l,loadList:function t(){return fetch("https://pokeapi.co/api/v2/pokemon/?limit=150").then(function(t){return t.json()}).then(function(t){let n=t.results;n.forEach(function(t){e({name:t.name,detailsUrl:t.url})})}).catch(function(t){console.error(t)})},loadDetails:o,showModal:i}}();pokemonRepository.loadList().then(()=>{pokemonRepository.getAll().forEach(function(t){pokemonRepository.addListItem(t)})});
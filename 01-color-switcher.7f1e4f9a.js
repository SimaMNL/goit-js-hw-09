document.addEventListener("DOMContentLoaded",(function(){var t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]"),n=null;t.addEventListener("click",(function(){n=setInterval((function(){document.body.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16).padStart(6,"0"))}),10),t.disabled=!0})),e.addEventListener("click",(function(){clearInterval(n),t.disabled=!1}))}));
//# sourceMappingURL=01-color-switcher.7f1e4f9a.js.map

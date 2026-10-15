/* AiCoN editorial layer: content stays visible and links navigate immediately. */
(function(){
 'use strict';
 var root=document.documentElement;
 try{if(!localStorage.getItem('aicon-theme')){root.dataset.theme='dark';root.style.colorScheme='dark';}}catch(e){}
})();

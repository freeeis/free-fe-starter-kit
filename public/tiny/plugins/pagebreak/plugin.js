/**
 * TinyMCE version 7.1.1 (2024-05-22)
 */
!function(){"use strict";var e=tinymce.util.Tools.resolve("tinymce.PluginManager"),a=tinymce.util.Tools.resolve("tinymce.Env");const t=e=>a=>a.options.get(e),n=t("pagebreak_separator"),o=t("pagebreak_split_block"),r="mce-pagebreak",s=e=>{const t=`<img src="${a.transparentSrc}" class="${r}" data-mce-resize="false" data-mce-placeholder />`;return e?`<p>${t}</p>`:t},c=e=>a=>{const t=()=>{a.setEnabled(e.selection.isEditable())};return e.on("NodeChange",t),t(),()=>{e.off("NodeChange",t)}};e.add("pagebreak",(e=>{(e=>{const a=e.options.register;a("pagebreak_separator",{processor:"string",default:"\x3c!-- pagebreak --\x3e"}),a("pagebreak_split_block",{processor:"boolean",default:!1})})(e),(e=>{e.addCommand("mcePageBreak",(()=>{e.insertContent(s(o(e)))}))})(e),(e=>{const a=()=>e.execCommand("mcePageBreak");e.ui.registry.addButton("pagebreak",{icon:"page-break",tooltip:"Page break",onAction:a,onSetup:c(e)}),e.ui.registry.addMenuItem("pagebreak",{text:"Page break",icon:"page-break",onAction:a,onSetup:c(e)})})(e),(e=>{const a=n(e),t=()=>o(e),c=new RegExp(a.replace(/[\?\.\*\[\]\(\)\{\}\+\^\$\:]/g,(e=>"\\"+e)),"gi");e.on("BeforeSetContent",(e=>{e.content=e.content.replace(c,s(t()))})),e.on("PreInit",(()=>{e.serializer.addNodeFilter("img",(n=>{let o,s,c=n.length;for(;c--;)if(o=n[c],s=o.attr("class"),s&&-1!==s.indexOf(r)){const n=o.parent;if(n&&e.schema.getBlockElements()[n.name]&&t()){n.type=3,n.value=a,n.raw=!0,o.remove();continue}o.type=3,o.value=a,o.raw=!0}}))}))})(e),(e=>{e.on("ResolveName",(a=>{"IMG"===a.target.nodeName&&e.dom.hasClass(a.target,r)&&(a.name="pagebreak")}))})(e)}))}();
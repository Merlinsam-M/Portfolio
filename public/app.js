const dialog=document.querySelector('#chat'), input=document.querySelector('#message'), log=document.querySelector('#messages'), status=document.querySelector('#status'), send=document.querySelector('#send'), retry=document.querySelector('#retry');
let history=[], pending=null, busy=false;
document.querySelectorAll('.open-chat').forEach(b=>b.addEventListener('click',()=>{dialog.showModal();input.focus();}));
document.querySelector('#close').onclick=()=>dialog.close();
function bubble(role,text){const el=document.createElement('div');el.className=`bubble ${role}`;el.textContent=text;log.append(el);log.scrollTop=log.scrollHeight;}
async function ask(message,isRetry=false){if(busy)return;busy=true;pending=message;send.disabled=true;retry.hidden=true;status.textContent='Thinking…';if(!isRetry)bubble('user',message);input.value='';
try{const response=await fetch('/api/ai-recruiter/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message,history}),signal:AbortSignal.timeout(25000)});const data=await response.json();if(!response.ok)throw new Error(data.error || 'Unable to respond.');bubble('assistant',data.answer);history=[...history,{role:'user',content:message},{role:'assistant',content:data.answer.slice(0,2000)}].slice(-12);pending=null;status.textContent='';}
catch(error){status.textContent=error.name==='TimeoutError'?'Request timed out. Please retry.':error.message;retry.hidden=false;}
finally{busy=false;send.disabled=false;input.focus();}}
document.querySelector('#chat-form').addEventListener('submit',e=>{e.preventDefault();const message=input.value.trim();if(message)ask(message);});
document.querySelectorAll('#suggestions button').forEach(b=>b.onclick=()=>ask(b.textContent));retry.onclick=()=>pending&&ask(pending,true);

'use strict';
const AS_OF='2026-09-27';
const BASE_RECORDS=[
  {invoiceId:'INV-1001',customer:'Northstar Studio',invoiceDate:'2026-07-19',dueDate:'2026-08-18',amountUSD:1850},
  {invoiceId:'INV-1002',customer:'Harbor & Pine',invoiceDate:'2026-08-22',dueDate:'2026-09-06',amountUSD:760},
  {invoiceId:'INV-1003',customer:'Maple Works',invoiceDate:'2026-09-03',dueDate:'2026-09-18',amountUSD:2400},
  {invoiceId:'INV-1004',customer:'Brightwell Lab',invoiceDate:'2026-09-12',dueDate:'2026-09-30',amountUSD:495},
  {invoiceId:'INV-1005',customer:'Cedar Route Co.',invoiceDate:'2026-09-18',dueDate:'2026-10-15',amountUSD:1250},
  {invoiceId:'INV-1006',customer:'Review Required Demo',invoiceDate:'2026-09-20',dueDate:'',amountUSD:900}
];
let records=structuredClone(BASE_RECORDS);
const $=s=>document.querySelector(s);
const cards=$('#queueCards');
const dialog=$('#overrideDialog');
$('#asOfLabel').textContent=AS_OF;
function agingLabel(v){ if(v===null) return 'Unknown'; if(v>0) return `${v} days overdue`; if(v===0) return 'Due today'; return `Due in ${Math.abs(v)} days`; }
function render(){
  const q=QueueLogic.sortQueue(records,AS_OF);
  const counts=q.reduce((a,r)=>(a[r.effectivePriority]=(a[r.effectivePriority]||0)+1,a),{});
  $('#queueSummary').textContent=`${q.length} synthetic invoices · ${counts.CRITICAL||0} critical · ${counts.HIGH||0} high · ${counts.REVIEW||0} review`;
  cards.innerHTML=q.map(r=>`<article class="queue-card" data-id="${r.invoiceId}">
    <div class="card-top"><span class="priority p-${r.effectivePriority.toLowerCase()}">${r.effectivePriority}</span><span class="invoice-id">${r.invoiceId}</span></div>
    <h3>${r.customer}</h3>
    <dl>
      <div><dt>Amount</dt><dd>$${Number(r.amountUSD).toLocaleString('en-US')}</dd></div>
      <div><dt>Due</dt><dd>${r.dueDate||'Missing'}</dd></div>
      <div><dt>Aging</dt><dd>${agingLabel(r.agingDays)}</dd></div>
      <div><dt>Computed</dt><dd>${r.computedPriority}</dd></div>
    </dl>
    <p class="reason"><strong>Reason:</strong> ${r.reason}</p>
    ${r.overrideReason?`<p class="override-note"><strong>Manual override:</strong> ${r.overrideReason} <span>(computed: ${r.computedPriority})</span></p>`:''}
    <button type="button" class="overrideBtn" data-id="${r.invoiceId}">Manual override</button>
  </article>`).join('');
  document.querySelectorAll('.overrideBtn').forEach(btn=>btn.addEventListener('click',()=>openOverride(btn.dataset.id)));
}
function openOverride(id){
  const inv=records.find(x=>x.invoiceId===id); const e=QueueLogic.enrich(inv,AS_OF);
  $('#overrideId').value=id; $('#overrideInvoiceLabel').textContent=`${id} · current effective priority: ${e.effectivePriority}`;
  $('#overridePriority').value=e.effectivePriority; $('#overrideReason').value=inv.override?.reason||''; $('#overrideError').textContent='';
  $('#removeOverride').disabled=!inv.override; dialog.showModal();
}
$('#cancelOverride').addEventListener('click',()=>dialog.close());
$('#removeOverride').addEventListener('click',()=>{const id=$('#overrideId').value; const inv=records.find(x=>x.invoiceId===id); delete inv.override; dialog.close(); render();});
$('#overrideForm').addEventListener('submit',e=>{
  e.preventDefault(); const reason=$('#overrideReason').value.trim(); if(reason.length<3){$('#overrideError').textContent='Enter a short reason for the override.'; return;}
  const inv=records.find(x=>x.invoiceId===$('#overrideId').value); inv.override={priority:$('#overridePriority').value,reason}; dialog.close(); render();
});
$('#resetBtn').addEventListener('click',()=>{records=structuredClone(BASE_RECORDS);render();});
$('#exportBtn').addEventListener('click',()=>{
  const blob=new Blob([QueueLogic.toCsv(records,AS_OF)],{type:'text/csv;charset=utf-8'}); const url=URL.createObjectURL(blob); const a=document.createElement('a');
  a.href=url;a.download='invoice-follow-up-queue-demo.csv';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),0);
});
render();

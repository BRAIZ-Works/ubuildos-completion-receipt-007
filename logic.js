(function(global){
  'use strict';
  const PRIORITY_ORDER = {CRITICAL:0,HIGH:1,MEDIUM:2,WATCH:3,LOW:4,REVIEW:5};
  const MS_DAY = 86400000;
  function parseDate(s){
    if(!/^\d{4}-\d{2}-\d{2}$/.test(String(s||''))) return null;
    const d = new Date(`${s}T00:00:00Z`);
    return Number.isNaN(d.getTime()) ? null : d;
  }
  function classifyInvoice(inv, asOf='2026-09-27'){
    const due = parseDate(inv.dueDate);
    const now = parseDate(asOf);
    if(!due || !now){
      return {agingDays:null, computedPriority:'REVIEW', reason:'Missing or invalid due date requires human review.'};
    }
    const diff = Math.floor((now-due)/MS_DAY);
    if(diff >= 31) return {agingDays:diff, computedPriority:'CRITICAL', reason:`${diff} days overdue (31+ day threshold).`};
    if(diff >= 15) return {agingDays:diff, computedPriority:'HIGH', reason:`${diff} days overdue (15–30 day threshold).`};
    if(diff >= 1) return {agingDays:diff, computedPriority:'MEDIUM', reason:`${diff} days overdue (1–14 day threshold).`};
    const daysUntil = Math.abs(diff);
    if(diff <= 0 && daysUntil <= 7) return {agingDays:diff, computedPriority:'WATCH', reason:`Due in ${daysUntil} day${daysUntil===1?'':'s'} (within 7-day watch window).`};
    return {agingDays:diff, computedPriority:'LOW', reason:`Due in ${daysUntil} days (outside 7-day watch window).`};
  }
  function enrich(inv, asOf='2026-09-27'){
    const c = classifyInvoice(inv, asOf);
    return {...inv,...c,effectivePriority:inv.override?.priority || c.computedPriority,overrideReason:inv.override?.reason || ''};
  }
  function sortQueue(records, asOf='2026-09-27'){
    return records.map(x=>enrich(x,asOf)).sort((a,b)=>{
      const p=PRIORITY_ORDER[a.effectivePriority]-PRIORITY_ORDER[b.effectivePriority];
      if(p) return p;
      const ad=a.agingDays===null?-999999:a.agingDays;
      const bd=b.agingDays===null?-999999:b.agingDays;
      if(ad!==bd) return bd-ad;
      return String(a.invoiceId).localeCompare(String(b.invoiceId));
    });
  }
  function csvEscape(v){ const s=String(v??''); return /[",\n]/.test(s)?`"${s.replace(/"/g,'""')}"`:s; }
  function toCsv(records, asOf='2026-09-27'){
    const q=sortQueue(records,asOf);
    const headers=['invoice_id','customer_label','invoice_date','due_date','amount_usd','aging_days','computed_priority','effective_priority','priority_reason','manual_override_reason'];
    const rows=q.map(r=>[r.invoiceId,r.customer,r.invoiceDate,r.dueDate,r.amountUSD,r.agingDays??'',r.computedPriority,r.effectivePriority,r.reason,r.overrideReason]);
    return [headers,...rows].map(row=>row.map(csvEscape).join(',')).join('\n')+'\n';
  }
  global.QueueLogic={PRIORITY_ORDER,parseDate,classifyInvoice,enrich,sortQueue,toCsv};
})(typeof window!=='undefined'?window:globalThis);

# Invoice Follow-Up Queue™ — UBuildOS Day 06

A public-safe static demo showing how a small business can prioritize **manual** invoice follow-up with transparent deterministic rules.

## Required campaign proof

- Aging: computed from a fixed demo date (`2026-09-27`).
- Priority: `CRITICAL`, `HIGH`, `MEDIUM`, `WATCH`, `LOW`, or fail-closed `REVIEW`.
- Reason: every computed priority displays the rule that produced it.
- Manual override: a human may change effective priority only with a recorded reason; the original computed priority remains visible.
- Export: the current queue downloads as CSV.

## Boundaries

This demo uses synthetic records only. It does not connect to bank or accounting accounts, move money, collect payments, contact customers, provide financial/legal advice, or predict credit/default/collectability.

## Run locally

Serve the `public/` directory with any static HTTP server. Example:

```text
python3 -m http.server 8000 -d public
```

Then open `http://127.0.0.1:8000/`.

## Queue rules

1. 31+ days overdue → `CRITICAL`.
2. 15–30 days overdue → `HIGH`.
3. 1–14 days overdue → `MEDIUM`.
4. Due within 7 days → `WATCH`.
5. Due later than 7 days → `LOW`.
6. Missing/invalid due date → `REVIEW`.

## Accessibility and responsive behavior

The build includes a skip link, semantic headings, labeled form controls, keyboard-reachable native controls, visible focus behavior, live queue summary, touch-sized buttons, safe wrapping, and responsive phone/tablet/desktop layouts.

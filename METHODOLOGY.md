# Methodology

The demo uses an explicit fixed as-of date (`2026-09-27`) and deterministic due-date rules.

Priority rules:
- 31+ days overdue → `CRITICAL`
- 15–30 days overdue → `HIGH`
- 1–14 days overdue → `MEDIUM`
- due within 7 days → `WATCH`
- due later than 7 days → `LOW`
- missing/invalid due date → `REVIEW`

Manual override never deletes the computed state. The override changes effective queue position only after a human supplies a reason, while the computed priority remains inspectable.

The workflow intentionally avoids inferred collectability, credit risk, default probability, legal status, and business-impact claims.

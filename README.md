# Invoice Follow-Up Queue™ — UBuildOS Day 06

A public-safe static workflow demo for prioritizing **manual** invoice follow-up with transparent, deterministic rules.

## Live build

https://braiz-works.github.io/ubuildos-completion-receipt-007/

## Public repository role

This repository is the public release/evidence projection for UBuildOS Day 06. It contains the static demo, bounded public documentation, and integrity records for the public tree. It does **not** contain private UBuildOS control logic, credentials, customer data, or internal Fresh-IQA evidence packages.

## What the workflow proves

- **Aging:** calculated from the fixed demo date `2026-09-27`.
- **Priority:** `CRITICAL`, `HIGH`, `MEDIUM`, `WATCH`, `LOW`, or fail-closed `REVIEW`.
- **Reason:** every computed priority exposes the rule that produced it.
- **Manual override:** a human may change effective priority only with a recorded reason; the original computed priority remains visible.
- **Export:** the current queue downloads as CSV.

## Boundaries

This demo uses synthetic records only. It does not connect to bank or accounting accounts, move money, collect payments, contact customers, provide financial/legal advice, or predict credit/default/collectability.

See [LIMITATIONS.md](LIMITATIONS.md), [PRIVACY.md](PRIVACY.md), and [SECURITY.md](SECURITY.md).

## Queue rules

1. 31+ days overdue → `CRITICAL`.
2. 15–30 days overdue → `HIGH`.
3. 1–14 days overdue → `MEDIUM`.
4. Due within 7 days → `WATCH`.
5. Due later than 7 days → `LOW`.
6. Missing/invalid due date → `REVIEW`.

## Run locally

Serve the repository root with any static HTTP server. Example:

```text
python3 -m http.server 8000
```

Then open `http://127.0.0.1:8000/`.

## Verification scope

The product release subject and the Day-06 LinkedIn distribution subject each passed structurally separate Fresh Independent IQA before this closeout stage. Public product runtime files in this repository remain unchanged from the product-qualified projection. This statement does not claim business impact, production accounting readiness, legal compliance, or universal security.

## Security / contact

For ordinary non-sensitive defects, use this repository's GitHub issue workflow. For security-sensitive reports, do **not** place secrets or exploit details in a public issue; use the repository/organization private GitHub security/contact route when available. See [SECURITY_CONTACT.md](SECURITY_CONTACT.md).

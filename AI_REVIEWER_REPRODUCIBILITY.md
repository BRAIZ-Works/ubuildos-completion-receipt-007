# Reviewer Reproducibility

A reviewer can inspect the public release without private UBuildOS materials:

1. Compare the public tree to `PUBLIC_MANIFEST.json`.
2. Replay SHA-256 values in `SHA256SUMS.txt`.
3. Serve the repository root locally.
4. Verify the visible priority rules and fail-closed `REVIEW` behavior.
5. Verify a manual override requires a reason and preserves the computed priority.
6. Export the queue as CSV and compare visible/computed fields.
7. Review the claim boundaries in `LIMITATIONS.md`, `PRIVACY.md`, and `SECURITY.md`.

The exact independent IQA evidence packages are preserved outside this public repository; this public record does not substitute for those review transports.

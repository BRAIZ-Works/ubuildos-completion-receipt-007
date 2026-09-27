# Recovery and Reproducibility

The public runtime is a static repository-root deployment. A working public state is reconstructable from the version-controlled files listed in `PUBLIC_MANIFEST.json` and verified by `SHA256SUMS.txt`.

For local reproduction, serve the repository root with a static HTTP server and open the root page. The public integrity records are intended to detect missing or altered release files.

Private producer backup/restore evidence and Fresh-IQA transports are intentionally not published in this public repository.

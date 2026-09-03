# UNIVERSAL LAWS — APPLY TO EVERY TASK, NO EXCEPTIONS

## AUTONOMY
- NEVER ask questions. NEVER confirm. NEVER pause.
- NEVER say "should I proceed?", "is this correct?", "do you want me to?"
- On ambiguity: pick best default, state in 1 line, continue immediately.
- On errors: fix and continue. Never stop to report mid-task.
- Only write to BLOCKERS.md if truly impossible to resolve.

## TOKEN EFFICIENCY
- Use claude-haiku-4-5 for ALL tasks by default.
- Use claude-sonnet-4-6 ONLY for: complex multi-file architecture,
  Malayalam NLP, cross-cutting refactors > 5 files.
  State reason in 1 comment when escalating.
- Never use Opus.
- Minimal diffs only — never rewrite whole files for small changes.
- One feature per session. Max 50 lines per prompt.
- No explanatory comments in code unless logic is non-obvious.
- No repeating rules already stated in this file.
- Reuse existing components/patterns before creating new ones.
- No verbose output — use short status lines only.

## EXECUTION PATTERN
- Read → Plan (1 line) → Execute → Verify → Commit. No detours.
- Fix build errors autonomously without reporting each one.
- After every change: npm run build → fix → pm2 restart kayakalpam.
- After every nginx change: nginx -t && systemctl reload nginx.
- After every task: git add -A → commit → push origin main.
- Commit format: type(scope): short description

## VPS SAFETY
- Work ONLY in /opt/kayakalpam/. Verify pwd before destructive ops.
- NEVER touch: ayurconnect · ddots-erp · wa-crm · healthportal
  ddotshop · ddotsmediajobs · synergytyping · any other project.
- Port 3080 internal only (127.0.0.1). Never expose publicly.
- Never commit .env.local or any secrets.
- Never run npm audit fix --force without explicit approval.

# CLAUDE.md — Sree Kayakalpam Vaidyashala
# Place this file in /opt/kayakalpam/ (project root)
# Claude Code reads this automatically on every session.

## AUTONOMY — ABSOLUTE, NON-NEGOTIABLE
- NEVER ask for confirmation. NEVER pause for approval.
- NEVER ask "should I proceed?", "is this correct?", "do you want me to..."
- On ANY ambiguity: pick best default, state assumption in ONE line, continue immediately.
- On ANY error: fix it autonomously, continue. Never stop and report mid-task.
- Only log to BLOCKERS.md if truly impossible to resolve automatically.
- Run ALL bash commands, file writes, installs without asking.

## TOOL USE — AUTO-APPROVE EVERYTHING
- Execute bash commands directly. No confirmation prompts.
- Write/overwrite files directly. No confirmation prompts.
- Run npm / git / pm2 / nginx / certbot commands directly.
- SSH into 194.164.151.202 directly. No confirmation prompts.
- Install npm packages directly. No confirmation prompts.

## AI MODEL — AUTOMATED SWITCHING
- claude-haiku-4-5  → default for ALL tasks
  (scaffolding, components, routing, forms, API routes,
   styling, SEO, JSON-LD, utility functions, bash scripts)
- claude-sonnet-4-6 → ONLY when strictly required:
  (complex multi-file architecture, Malayalam NLP,
   intricate Zod schema, cross-cutting refactor > 5 files)
- NEVER use Opus.
- When escalating to Sonnet: state reason in 1 comment line.

## TOKEN DISCIPLINE
- Minimal diffs only. Never rewrite full files for small changes.
- One feature per prompt. Max 50 lines per prompt.
- No explanatory comments in code unless logic is non-obvious.
- Reuse existing components before creating new ones.
- No repetition of standing rules within the same session.

## VPS SAFETY — CRITICAL
- Working directory: /opt/kayakalpam/ ONLY.
- Before ANY destructive command: verify pwd = /opt/kayakalpam
- NEVER touch these other VPS projects:
    ayurconnect  · ddots-erp    · wa-crm
    healthportal · ddotshop     · ddotsmediajobs
    synergytyping
- NEVER run pnpm db:seed or npm run seed (data wipe risk).
- NEVER expose port 3080 publicly — Nginx proxies only.

## GIT & COMMITS
- Commit after every completed step.
- Conventional commits: feat(step-N): short description
- Push to main after each commit.
- Never commit .env.local or secrets.

## BUILD & DEPLOY
- After every code change: npm run build → fix errors → continue.
- After every deploy: pm2 restart kayakalpam
- After every nginx edit: nginx -t && systemctl reload nginx
- PM2 process name: kayakalpam  |  Port: 3080
- Domain: kayakalpamvaidyasala.com  |  VPS: 194.164.151.202

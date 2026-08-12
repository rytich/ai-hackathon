# Software Engineering Practices For Agentic Development

## Purpose

AI agents make diffs faster. They do not automatically make software easier to maintain.

This framework keeps long-lived software engineering practices in the repository so agents can execute quickly without losing scope, safety, traceability, or reviewability.

Source inspiration: [今だから押さえておきたいソフトウェア工学のベストプラクティス](https://zenn.dev/zapabob/articles/software-engineering-best-practices-agent-era)

## Practices

### 1. Verifiable Requirements

Every Issue must define Done as commands or observable states.

Use:

```text
## Done
- `<lint-command>` passes
- `<test-command>` passes
- Expected user-visible behavior:
```

Do not treat implementation completed as validation completed.

### 2. Small Single-Purpose Changes

Use one Issue, one branch, one PR, and one reason for change.

Rules:

- Keep unrelated formatting, rename, cleanup, and refactor out of the PR.
- Record out-of-scope findings in work notes or a follow-up Issue.
- Split when the diff combines independent reasons.

### 3. Tests As Contract

Tests are evidence that a change did not break the expected contract.

Rules:

- Document the required test, lint, typecheck, and build commands.
- Run the commands before claiming Done.
- If a command cannot run locally, explain why and identify the equivalent CI or follow-up gate.

### 4. Explicit Boundaries

Make permission, data, network, filesystem, and deployment boundaries visible.

Rules:

- Document sandbox, MCP, secret, environment, and production access assumptions.
- Keep write tools and destructive operations opt-in.
- Default production, billing, auth, secret, privacy, and destructive operations to human approval.

### 5. Traceability

Git records what changed. Repository docs must record why.

Rules:

- Link Issue, PR, work note, objective review, and decision log where applicable.
- Keep design decisions in `docs/decisions/`, not only in chat.
- Keep investigation and handoff material in `docs/work-notes/`.

### 6. Separation Of Concerns

Each document, module, and workflow should have one primary role.

Rules:

- Keep `AGENTS.md` focused on standing rules.
- Put repeatable workflows in `.agents/skills`.
- Put setup and runtime details in dedicated docs.
- Avoid mixing design, SOP, incident log, and task summary in one file.

### 7. Type And Static Analysis

Use typecheck or static analysis as a default quality gate when the project stack supports it.

If a project lacks static analysis, document the reason and the nearest substitute.

### 8. Fail Fast With Clear Errors

Failures should be visible and actionable.

Rules:

- Do not hide errors behind silent fallbacks.
- Prefer explicit failures with useful messages.
- If a user-facing fallback is intentional, document the condition, behavior, and validation evidence.

### 9. YAGNI And Existing Patterns

Prefer the existing codebase pattern over new abstraction.

Before adding code, stop at the first option that satisfies the verifiable requirement:

1. Is it required by the current requirement at all?
2. Can existing code or an established local pattern satisfy it?
3. Can the standard library or a native platform feature satisfy it?
4. Can an already-installed dependency satisfy it?
5. Only then, add the smallest implementation that satisfies the verifiable requirement.

This ladder never overrides trust-boundary validation, data-loss prevention, security controls, accessibility basics, explicitly requested tests or docs, project quality gates, or human-approval requirements.

Rules:

- Add abstraction only when it removes current, demonstrated complexity or matches an established local pattern.
- Do not add future-proof wrappers, frameworks, dependencies, or generic modules without a current requirement.
- Keep the smallest diff that satisfies the verifiable requirement and the safety boundary above.

### 10. CI As Shared Truth

Local commands and CI must represent the same bar.

Rules:

- Document commands that match CI, or explain the difference.
- Do not report local-only success as project success when CI is stricter.
- Required checks should be visible in `docs/framework/github-configuration.md`.

### 11. Review As A Quality Gate

Review is not a summary pass. It looks for bugs, regressions, missing tests, scope creep, and unsafe assumptions.

Rules:

- Objective review must run before merge.
- Findings should reference files, commands, or acceptance criteria.
- Review should challenge mock-only success and unverifiable Done claims.

### 12. Human Gate For Irreversible Operations

Do not auto-complete irreversible or high-risk operations.

Human approval is required for:

- production deploy
- destructive migration or data deletion
- secret rotation or secret exposure handling
- auth, permission, billing, legal, or privacy changes
- force push or history rewrite
- bulk external messaging

## Where To Put Rules

| Practice | Primary Location | Supporting Location |
| --- | --- | --- |
| Verifiable requirements | Issue template | PR template, work notes |
| Small changes | `AGENTS.md` | collaboration rules |
| Tests as contract | quality gates | CI configuration |
| Explicit boundaries | `AGENTS.md` | runtime, secrets, environment docs |
| Traceability | work notes, decision log | PR template |
| Separation of concerns | agent settings replication docs | `.agents/skills` |
| Static analysis | quality gates | CI configuration |
| Fail fast | project-specific engineering docs | objective review |
| YAGNI | `AGENTS.md` | objective review |
| CI as shared truth | quality gates | GitHub configuration |
| Review | quality gates | completion pipeline |
| Human gate | `AGENTS.md` | quality gates |

## Done Checklist

- [ ] Done is expressed as commands or observable states.
- [ ] Diff has one reason and no drive-by refactors.
- [ ] Documented validation commands were run or gaps were explained.
- [ ] Local validation and CI expectations match or differences are documented.
- [ ] Secrets, personal paths, and production data are absent.
- [ ] Boundaries and human-approval requirements were respected.
- [ ] Design decisions are stored in repository docs when they outlive the task.
- [ ] Objective review challenged scope, tests, fallback behavior, and mock-only evidence.

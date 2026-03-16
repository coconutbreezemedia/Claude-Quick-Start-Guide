# Claude Code Mastery Curriculum

**4-Week Self-Paced Learning Plan for Developers**

For developers with a technical coding background new to Claude Code
Format: Self-Paced | Framework: Traditional (I Do / We Do / You Do)
Bloom's Progression: Remember → Understand → Apply → Analyze → Create
March 2026

---

## Course Overview

This curriculum is designed for developers with a solid coding background who are completely new to Claude Code. No prior experience with AI coding tools is required. You'll go from installation to advanced multi-agent workflows in four weeks.

By the end of this 4-week curriculum, you will be able to:

- Install, configure, and authenticate Claude Code across any project with a production-ready CLAUDE.md
- Execute complex, multi-file development tasks using Plan Mode, Git integration, and context management strategies
- Extend Claude Code with custom skills, hooks, MCP servers, and subagents tailored to your team's workflows
- Orchestrate Agent Teams and headless automation to multiply your development throughput on real projects

## Prerequisites

- A Claude Pro ($20/mo) or Max ($100/mo) subscription
- Proficiency with the terminal/command line (cd, ls, mkdir, git, running scripts)
- A code editor you're comfortable in (VS Code, Cursor, JetBrains, Vim — anything works)
- At least one existing codebase to practice on (any language, any framework)
- Node.js 18+ installed (check with: `node --version`)
- Git installed and configured (check with: `git --version`)

## Key Resources

- Official Quickstart: code.claude.com/docs/en/quickstart
- Official Docs: code.claude.com/docs
- Builder.io Guide: builder.io/blog/how-to-use-claude-code
- Ultimate Guide (GitHub): github.com/FlorianBruniaux/claude-code-ultimate-guide
- CLI Cheatsheet: shipyard.build/blog/claude-code-cheat-sheet
- Extensions Deep Dive: Medium — "Claude Code Extensions Explained: Skills, MCP, Hooks, Subagents, Agent Teams & Plugins"

## Time Commitment

Plan for roughly 1–2 hours per day, 5 days per week. Weekends are flex days for catching up or deeper exploration. Each week builds on the previous one, so try to stay on pace. That said, this is self-paced — if a week takes you 10 days instead of 7, that's fine. The important thing is doing the hands-on activities, not rushing through the reading.

## A Note Before You Start

Claude Code is a fundamentally different way to write code. It's not autocomplete, and it's not a chatbot you paste code into. It's an agent that lives in your terminal, reads your entire codebase, edits files directly, and runs commands — all through natural language. The learning curve isn't about syntax; it's about learning to delegate effectively and review AI-generated changes critically. Approach this like learning a new development workflow, not a new tool.

---

## Week 1: Foundation & First Commands

*Installation, navigation, CLAUDE.md, and your first real coding tasks*
**Bloom's Level:** Remember / Understand / Apply

### Learning Objectives

By the end of this week, you will be able to:

- Install Claude Code via the native installer and authenticate successfully
- Navigate the CLI interface using core slash commands (`/help`, `/clear`, `/compact`, `/model`, `/doctor`)
- Create a CLAUDE.md file that configures Claude Code for a real project
- Execute basic file reading, code generation, and debugging tasks through natural language prompts

### Days 1–2: Installation & Authentication

**Topics Covered:** Install via native installer (macOS: curl, Linux: curl, Windows: PowerShell iex or WinGet). Authenticate with your Claude Pro or Max account. Verify with `claude --version`. Run `claude` in a project directory. Understand the welcome screen, session info, model in use, and how to exit. Note: the old `npm install -g @anthropic-ai/claude-code` method is deprecated — use the native installer.

#### Hands-On Activity

Install Claude Code, authenticate, and run your first session. Navigate to one of your existing projects and ask Claude to explain it: "What does this project do? Walk me through the architecture." Then try a follow-up: "What are the main dependencies and how do they connect?" Observe how Claude reads your files automatically without you pointing to them.

**Deliverable:** Screenshot of a successful Claude Code session running in your terminal with a codebase summary.

### Days 3–4: Core Commands & Navigation

**Topics Covered:** Slash commands: `/help` (list all commands), `/clear` (reset context), `/compact` (summarize to free tokens), `/model` (switch models), `/doctor` (diagnostics), `/plan` (enter Plan Mode), `/resume` (continue previous session). Keyboard shortcuts: Tab (completion), Up arrow (history), Esc (cancel current action), Esc x2 (rewind menu). Model selection: Sonnet 4.6 for ~80% of tasks (fast, cost-effective — writing functions, fixing bugs, adding features, tests, explaining code). Opus 4.6 for the hard ~20% (large refactors, complex architecture, Agent Teams).

#### Hands-On Activity

Create a personal cheat sheet of all slash commands by running `/help` and documenting each one with your own notes on when you'd use them. Practice: start a session, ask Claude a few questions, `/clear`, switch models with `/model`, run `/doctor`. Open a real project and try: reading specific files, asking Claude to explain a function, then asking it to refactor that function. Review the diff before approving.

**Deliverable:** Personal cheat sheet of Claude Code commands with your own usage notes (you'll reference this all month).

### Days 5–7: CLAUDE.md & Your First Real Tasks

**Topics Covered:** CLAUDE.md: a markdown file at your project root that Claude reads at the start of every session. It's your onboarding doc for an AI teammate. Run `/init` to auto-generate a starter based on detected build systems, test frameworks, and code patterns. Customize with: tech stack, coding standards, build/run commands, architecture decisions, testing conventions. CLAUDE.local.md for personal settings (add to .gitignore). Keep CLAUDE.md concise — bloated files cause Claude to ignore instructions. First real coding tasks: generate a utility function, fix a bug in existing code, add a feature to an existing component.

#### Hands-On Activity

Pick one of your active projects. Run `/init` to generate a starter CLAUDE.md, then customize it: add your tech stack, coding standards, preferred patterns, build commands, and key architecture decisions. Trim aggressively — most of what `/init` generates is info Claude can already discover. Then give Claude three real tasks: (1) generate a utility function you actually need, (2) fix a real bug or code smell, (3) add a small feature. Review every diff before approving.

**Deliverable:** A working CLAUDE.md for a real project + three completed code changes made through Claude Code.

### Weekly Assessment

Create a CLAUDE.md for one of your projects that includes tech stack, coding standards, build commands, and architecture notes. Then use Claude Code to: (1) generate a utility function, (2) fix an existing bug, (3) explain a complex part of your codebase back to you. Submit the CLAUDE.md and a brief write-up of how each task went.

### Tips & Common Pitfalls

- Don't skip `/init` — it gives Claude a head start, but always review and trim the output
- Keep CLAUDE.md under 50 lines. Longer files cause Claude to lose focus on your instructions
- Use `/clear` every time you switch to a new task — stale context from previous tasks causes bad suggestions
- Most common issue: PATH not found after installation. Restart your terminal. If still broken, reinstall
- Claude always asks permission before modifying files — you're in control. Review every diff early on

---

## Week 2: Productive Workflows & Plan Mode

*Multi-file tasks, Plan Mode, permissions, Git integration, and context management*
**Bloom's Level:** Apply / Analyze

### Learning Objectives

By the end of this week, you will be able to:

- Use Plan Mode (`/plan`) to architect multi-file changes before executing them
- Configure permission modes to control Claude's autonomy level on a per-project basis
- Leverage Git integration for commits, diffs, branch management, and PR descriptions
- Manage context effectively using `/clear`, `/compact`, and subagent isolation to prevent degraded output

### Days 8–9: Plan Mode Mastery

**Topics Covered:** When to use `/plan`: any task touching 2+ files. The plan-review-approve cycle: Claude proposes an approach, you review it, ask questions or request changes, then approve for execution. Iterative planning: "That's good, but can we also handle the edge case where X?" and "Why did you choose this approach over Y?" Plan Mode for architecture decisions, multi-step refactors, feature implementations, and migration planning.

#### Hands-On Activity

Pick a multi-file task from your current work (e.g., add a new API endpoint + frontend component + tests, or refactor a module that touches several files). Use `/plan` to have Claude architect the entire approach. Don't approve immediately — ask at least two clarifying questions and request one modification to the plan. Then approve and watch execution. Afterward, review every changed file and note anything you would have done differently.

**Deliverable:** One completed multi-file feature implemented entirely through Plan Mode, with notes on what the plan got right and what you adjusted.

### Days 10–11: Permissions & Safety

**Topics Covered:** Permission system: Claude asks before every file edit and command execution by default. Permission modes: ask (default — explicit approval for everything), auto-approve in settings (approve reads automatically, ask for writes), `--dangerously-skip-permissions` (no prompts at all — use only on trusted codebases). Project-level configuration in `.claude/settings.json`: allowedTools, disallowedTools. Why permissions matter: Claude can run bash commands, delete files, install packages, and make network requests. Permission modes are workflow tools, not just security features — they control how much autonomy Claude has.

#### Hands-On Activity

Configure three different permission setups and test each: (1) Strict: default ask-for-everything mode. (2) Moderate: auto-approve read operations, ask for writes (configure in settings.json). (3) Open: run with `--dangerously-skip-permissions` on a disposable test project. Notice how drastically the workflow changes at each level. Then create a `.claude/settings.json` for one of your real projects with a permission setup that matches your trust level for that codebase.

**Deliverable:** A `.claude/settings.json` with a thoughtful permission configuration + a brief write-up comparing the three permission levels.

### Days 12–14: Git Integration & Context Management

**Topics Covered:** Git operations through Claude: staging, commits with well-structured messages, branch creation, viewing diffs, generating PR descriptions, reviewing changes. Context window management: Claude Code has a ~200K token context window. At 70% capacity, precision starts dropping. At 85%, hallucinations increase. At 90%+, responses become erratic. Strategies: `/compact` to summarize and free context, `/clear` to reset entirely, `/resume` and `claude -c` to pick up previous sessions. Message queuing: type multiple prompts back-to-back and Claude works through them intelligently — it pauses the queue if it needs your feedback.

#### Hands-On Activity

Do a full Git workflow through Claude Code: create a feature branch, implement a feature (use `/plan`), commit with Claude-generated messages (evaluate their quality), then have Claude write a PR description. Next, do a long session: keep working until you notice context degradation, then use `/compact` and observe the difference. Finally, try message queuing: stack 3 related tasks and go do something else — come back and review the results.

**Deliverable:** A completed feature branch with clean commit history and a PR description, all done through Claude Code. Document your context management strategy: when do you `/clear` vs `/compact` vs `/resume`?

### Weekly Assessment

Take a real task from your current work. Use Plan Mode to architect the solution, implement it across multiple files, commit with meaningful messages, and push to a feature branch with a PR description. Write up: (1) your Plan Mode process, (2) your permission configuration, (3) your context management approach.

### Tips & Common Pitfalls

- Plan Mode is the single biggest productivity unlock in Claude Code — invest serious time here
- Context thresholds to memorize: 70% = pay attention, 85% = `/compact` now, 90% = `/clear` mandatory
- Never use `--dangerously-skip-permissions` on unfamiliar or production codebases
- Message queuing is a huge workflow accelerator: queue tasks, go handle other work, come back to results
- Ask Claude "Why did you choose this approach?" after every Plan Mode execution — you'll learn patterns fast

---

## Week 3: Customization & Extensions

*Custom skills, slash commands, hooks, MCP servers, and subagents*
**Bloom's Level:** Apply / Analyze / Create

### Learning Objectives

By the end of this week, you will be able to:

- Build custom skills (.md files) that teach Claude repeatable workflows specific to your projects
- Configure hooks to automate actions (linting, formatting, notifications, safety guards) at lifecycle events
- Connect MCP servers to give Claude access to external tools and services (GitHub, databases, APIs)
- Create and invoke subagents for specialized tasks like code review, testing, and documentation

### Days 15–16: Custom Skills & Slash Commands

**Topics Covered:** Skills: markdown files in `.claude/skills/` that Claude reads and follows when relevant. They're invoked by natural language — Claude decides when to apply them based on the description. Slash commands: markdown files in `.claude/commands/` invoked explicitly with `/command-name`. Parameterized commands using `$ARGUMENTS` (e.g., `/fix-issue 123`). Scope: project-level (`.claude/commands/`) vs user-level (`~/.claude/commands/`). Key difference: skills are automatic (Claude picks them up), commands are explicit (you invoke them).

#### Hands-On Activity

Create three custom skills/commands for your workflow: (1) A `/review` command that checks code against your team's coding standards (define the standards in the .md file). (2) A skill that teaches Claude how to write tests in your project's testing framework and conventions. (3) A parameterized `/fix-issue` command that takes a GitHub/Jira issue number and uses it as context. Test each on real code in your project.

**Deliverable:** Three working custom commands/skills, each tested on real code with documented results.

### Days 17–18: Hooks for Automation

**Topics Covered:** Hook lifecycle events: PreToolUse (before Claude uses a tool), PostToolUse (after), session start/end. Configuration: in settings.json under the "hooks" key, or interactively via `/hooks`. Each hook specifies: event, matcher (which tool to match, e.g., "Write", "Bash"), and action (command to run). Hook input: JSON via stdin with tool details. Exit codes: 0 = allow, 2 = block operation (error message fed back to Claude). Think of hooks like Git hooks but for Claude Code. Common use cases: auto-lint after every file write, auto-format code, block dangerous commands (rm -rf), send notifications when tasks complete, run tests after code changes.

#### Hands-On Activity

Set up three hooks in your settings.json: (1) A PostToolUse hook on "Write" that runs your linter/formatter after every file write (e.g., eslint --fix, prettier, black). (2) A PreToolUse hook on "Bash" that blocks dangerous commands (write a small script that checks for rm -rf, DROP TABLE, etc.). (3) A PostToolUse hook that logs completed write operations to a file for audit. Test each hook by triggering the relevant action and verifying the hook fires.

**Deliverable:** A settings.json with three working hooks + a brief doc explaining what each hook does and when it fires.

### Days 19–21: MCP Servers & Subagents

**Topics Covered:** MCP (Model Context Protocol): a standard for connecting Claude Code to external services. Configuration in `.mcp.json` at project root. Adding servers: `claude mcp add <name> -- <command>`. Popular MCP servers: GitHub (PRs, issues, repos), filesystem, databases (Postgres, SQLite), Slack, browser automation, and many more. MCP Tool Search: lazy loading that reduces context usage by up to 95%. Subagents: specialized Claude instances with their own system prompts, tool restrictions, permissions, and model selection. Defined as markdown files with YAML frontmatter in `.claude/agents/`. Create via `/agents` interactively or manually. Key constraint: subagents report back to the parent agent — they cannot talk to each other (for that, you need Agent Teams in Week 4).

#### Hands-On Activity

Connect at least two MCP servers to a project. Good starting options: GitHub (for PR/issue management) + a database server or filesystem server. Verify they work by asking Claude to use them in a task. Then create two subagents: (1) A code-reviewer agent restricted to read-only tools (Read, Glob, Grep) that reviews code quality and suggests improvements. (2) A documentation-writer agent that generates or updates READMEs, API docs, and inline comments. Invoke each on real code and evaluate the output quality.

**Deliverable:** Working `.mcp.json` with 2+ connected servers + two custom subagent definitions tested on real code.

### Weekly Assessment

Build a complete Claude Code configuration for one of your projects: CLAUDE.md + custom skills/commands + hooks + MCP servers + at least one subagent. Document the entire setup in a README that another developer on your team could follow to replicate it.

### Tips & Common Pitfalls

- Skills fire automatically (Claude decides); commands fire explicitly (`/command-name`). Use skills for conventions Claude should always follow, commands for on-demand workflows
- Start simple with hooks — auto-lint on Write is the highest-value hook for most projects
- MCP servers consume context. Enable MCP Tool Search (lazy loading) to keep context overhead minimal
- Subagents can't spawn other subagents — keep each one focused on a single responsibility
- When creating subagents, restrict their tools tightly. A code reviewer doesn't need Write access

---

## Week 4: Advanced Patterns & Real-World Mastery

*Agent Teams, CI/CD integration, headless mode, and capstone project*
**Bloom's Level:** Analyze / Evaluate / Create

### Learning Objectives

By the end of this week, you will be able to:

- Orchestrate Agent Teams for parallel multi-agent development on complex, multi-domain projects
- Run Claude Code in headless/non-interactive mode for CI/CD pipelines and automation scripts
- Evaluate when to use Claude Code vs. other tools and articulate a clear decision framework
- Complete a capstone project demonstrating mastery of all Claude Code features on a real codebase

### Days 22–23: Agent Teams

**Topics Covered:** Agent Teams vs. subagents: subagents report to a parent and can't communicate with each other. Agent Teams are collaborative — multiple independent Claude sessions that coordinate, message each other, and work in parallel on a shared project. Structure: one lead agent + multiple teammates, each with their own context window. Teammates load project context (CLAUDE.md, MCP servers, skills) but not the lead's conversation history. Communication: direct messages, broadcasts, shared task list with claiming and dependency tracking. Enabling: set `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` in settings.json env. Display: in-process (Shift+Down to cycle) or split panes (requires tmux/iTerm2). Cost awareness: each teammate is a separate Claude instance — costs scale with team size.

#### Hands-On Activity

Enable Agent Teams and run a real multi-agent task. Create a team with a lead + 2–3 teammates to tackle a substantial project task. Example: one teammate handles backend API changes, one handles frontend UI, one handles test coverage. Observe how they coordinate through the shared task list and messaging. After completion, evaluate: (1) quality of output vs. doing it sequentially, (2) coordination overhead, (3) cost implications. Try a second run where you let Claude decide the team structure vs. explicitly defining it.

**Deliverable:** Documentation of your Agent Teams experiment: prompt used, team structure, coordination patterns, quality assessment, and time/cost comparison vs. sequential work.

### Days 24–25: Headless Mode & CI/CD Integration

**Topics Covered:** Non-interactive (headless) mode: `claude -p "prompt"` runs a single prompt and outputs the result. Output formats: default text, `--output-format json`, `--output-format stream-json`. `--max-turns` to limit how many autonomous steps Claude takes. `--json-schema` for structured output (Claude returns data matching your schema). `--allowedTools` to restrict which tools Claude can use in automated runs. CI/CD use cases: automated code review on PRs, test generation for new code, documentation updates, security audits, changelog generation. Combining flags for production safety: `claude -p "review this PR" --output-format json --allowedTools Read,Grep,Glob --max-turns 3`.

#### Hands-On Activity

Build two CI/CD-style automation scripts: (1) A script that runs Claude Code in headless mode to review code in a directory and output a JSON quality report (use `--output-format json` and `--json-schema`). (2) A script that auto-generates unit tests for any file passed as an argument. Test both on real code in your project. Bonus: integrate one of these into a Git pre-commit hook or GitHub Action.

**Deliverable:** Two working automation scripts using Claude Code in headless mode, tested on real code.

### Days 26–28: Capstone Project

**Topics Covered:** Apply everything from the past 3 weeks to a real project. The capstone should demonstrate: CLAUDE.md configuration, Plan Mode for architecture, custom skills/commands, hooks, MCP server integration, and either subagents or Agent Teams. The goal is not just to build something — it's to build it using Claude Code as your primary development interface and to document the workflow so others can replicate it.

#### Hands-On Activity

Choose a real project: build a new feature, refactor a significant module, create a new service, or set up a complete new project from scratch. Use Claude Code as your primary development interface for the entire build. Document everything: your CLAUDE.md, skills, hooks, MCP config, subagent/team setup, the prompts you used, and the decisions you made. The final deliverable is both the working code AND a workflow guide.

**Deliverable:** Completed capstone project (working code, committed and pushed) + a comprehensive workflow document that another developer could use to replicate your Claude Code setup and process.

### Weekly Assessment

Capstone: deliver a real, production-quality project (or significant feature) built primarily through Claude Code. Include a workflow document covering your complete Claude Code setup (CLAUDE.md, skills, hooks, MCP, agents) and process. The workflow doc should be detailed enough that a teammate could follow it to set up their own Claude Code environment for the same project.

### Tips & Common Pitfalls

- Agent Teams is still experimental — expect some rough edges. Start with 2–3 teammates, not 8
- Headless mode is incredibly powerful for automation — think about what repetitive dev tasks you could eliminate
- For the capstone, depth of Claude Code usage matters more than project scope. A small project with full CC integration beats a large project where you only used basic prompts
- Your workflow document is as valuable as the code — it becomes your team's Claude Code playbook
- After the capstone, revisit your Week 1 CLAUDE.md — you'll be amazed how much better you can make it now

---

## Capstone Project Rubric

Your capstone should demonstrate mastery across all four weeks. Use this rubric to self-evaluate before you consider the curriculum complete.

| Component | Success Criteria |
|---|---|
| CLAUDE.md & Configuration | Complete CLAUDE.md with tech stack, standards, and architecture. Settings.json with permissions and hooks configured appropriately for the project. |
| Plan Mode Usage | Evidence of using `/plan` for architecture decisions. Plan was reviewed, questioned, and modified before execution — not just rubber-stamped. |
| Custom Skills & Commands | At least 2 custom skills or commands relevant to the project. Each is documented, tested, and genuinely reusable. |
| Hooks | At least 1 working hook (auto-lint, safety guard, or notification). Configured in settings.json with documented behavior. |
| MCP Server Integration | At least 1 MCP server connected and actively used in the workflow (GitHub, database, etc.). |
| Subagents or Agent Teams | At least 1 subagent created and used with restricted tools, OR an Agent Teams session documented with results and evaluation. |
| Git Workflow | Clean commit history with meaningful, well-structured messages. Feature branch with a quality PR description. All done through Claude Code. |
| Workflow Documentation | Written guide detailed enough for a teammate to replicate your entire Claude Code setup and process for the same project. |

---

## Quick Reference: Essential Commands

| Command / Shortcut | What It Does |
|---|---|
| `claude` | Start a new interactive session in current directory |
| `claude -c` | Continue most recent session in current directory |
| `claude -r <session-id>` | Resume a specific session by ID |
| `claude -p "prompt"` | Run a single prompt in headless (non-interactive) mode |
| `claude --version` | Check installed version |
| `/help` | Show all available commands including custom ones |
| `/clear` | Reset conversation context completely |
| `/compact` | Summarize context to free tokens without losing key info |
| `/plan` | Enter Plan Mode for multi-step tasks |
| `/model` | Switch between Sonnet 4.6 and Opus 4.6 |
| `/doctor` | Run diagnostics on your Claude Code setup |
| `/init` | Auto-generate starter CLAUDE.md for current project |
| `/agents` | Create, list, or manage subagents |
| `/hooks` | Configure lifecycle hooks interactively |
| `/effort <level>` | Set effort level (low, medium, high) |
| `/rewind` | Undo recent changes (Esc x2 for menu) |
| Esc (x2) | Open rewind menu for rollback options |
| Tab | Autocomplete suggestions |
| Up Arrow | Navigate through prompt history (incl. past sessions) |
| Shift+Down | Cycle through Agent Team teammates (in-process mode) |

## Quick Reference: Project File Structure

A fully configured Claude Code project includes these files. You'll build this structure piece by piece across the four weeks.

```
your-project/
├── CLAUDE.md                  # Shared project instructions (git-managed)
├── CLAUDE.local.md            # Personal instructions (.gitignore)
├── .mcp.json                  # MCP server configuration (git-managed)
└── .claude/
    ├── settings.json          # Project shared settings (git-managed)
    ├── settings.local.json    # Personal settings (.gitignore)
    ├── rules/                 # Modular rules (git-managed)
    │   ├── code-style.md
    │   └── security.md
    ├── skills/                # Custom skills (git-managed)
    │   └── review-pr/
    │       └── SKILL.md
    ├── commands/              # Custom slash commands
    │   └── fix-issue.md
    ├── agents/                # Subagent definitions
    │   └── code-reviewer.md
    └── hooks/                 # Hook scripts
        └── validate-command.sh
```

## Quick Reference: Context Management

| Context Usage | Action |
|---|---|
| 0–50% | Work freely. No action needed. |
| 50–70% | Pay attention. Consider `/compact` if context is bloated with irrelevant history. |
| 70–85% | Precision is dropping. Run `/compact` to summarize and free tokens. |
| 85–90% | Hallucinations increasing. `/compact` immediately or `/clear` if you can start fresh. |
| 90%+ | `/clear` is mandatory. Responses become erratic. Start a new session. |

## Quick Reference: Model Selection

| Task | Model | Why |
|---|---|---|
| Writing functions & features | Sonnet 4.6 | Fast, cost-effective, handles most tasks well |
| Fixing bugs | Sonnet 4.6 | Quick iterations, good at targeted fixes |
| Writing tests | Sonnet 4.6 | Straightforward pattern, doesn't need heavy reasoning |
| Explaining code | Sonnet 4.6 | Good comprehension at lower cost |
| Large-scale refactoring | Opus 4.6 | Needs to reason across many files simultaneously |
| Complex architecture decisions | Opus 4.6 | Deeper reasoning for trade-off analysis |
| Agent Teams | Opus 4.6 | Required for multi-agent orchestration |
| Analyzing large codebases | Opus 4.6 | 1M token context window (beta) for massive projects |

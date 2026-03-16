// ─── Curriculum Data ───
const curriculum = [
  {
    week: 1,
    title: "Foundation & First Commands",
    bloom: "Remember / Understand / Apply",
    days: [
      {
        label: "Days 1–2: Installation & Authentication",
        activities: [
          { text: "Install Claude Code and authenticate", deliverable: false },
          { text: "Run first session, ask Claude to explain a project", deliverable: false },
          { text: "Screenshot of successful session", deliverable: true },
        ],
      },
      {
        label: "Days 3–4: Core Commands & Navigation",
        activities: [
          { text: "Create personal cheat sheet from /help", deliverable: false },
          { text: "Practice /clear, /model, /doctor", deliverable: false },
          { text: "Personal cheat sheet with usage notes", deliverable: true },
        ],
      },
      {
        label: "Days 5–7: CLAUDE.md & First Real Tasks",
        activities: [
          { text: "Run /init and customize CLAUDE.md", deliverable: false },
          { text: "Write a utility function with Claude Code", deliverable: false },
          { text: "Fix a bug with Claude Code", deliverable: false },
          { text: "Build a small feature with Claude Code", deliverable: false },
          { text: "Working CLAUDE.md + three code changes", deliverable: true },
        ],
      },
    ],
  },
  {
    week: 2,
    title: "Productive Workflows & Plan Mode",
    bloom: "Apply / Analyze",
    days: [
      {
        label: "Days 8–9: Plan Mode Mastery",
        activities: [
          { text: "Complete a multi-file task using /plan", deliverable: false },
          { text: "Ask clarifying questions, modify plan before approving", deliverable: false },
          { text: "Completed multi-file feature via Plan Mode", deliverable: true },
        ],
      },
      {
        label: "Days 10–11: Permissions & Safety",
        activities: [
          { text: "Test strict permission level", deliverable: false },
          { text: "Test moderate permission level", deliverable: false },
          { text: "Test open permission level", deliverable: false },
          { text: "Create .claude/settings.json", deliverable: false },
          { text: "settings.json + permission comparison write-up", deliverable: true },
        ],
      },
      {
        label: "Days 12–14: Git Integration & Context Management",
        activities: [
          { text: "Full Git workflow through Claude Code", deliverable: false },
          { text: "Practice /compact and context management", deliverable: false },
          { text: "Feature branch + PR description + context strategy doc", deliverable: true },
        ],
      },
    ],
  },
  {
    week: 3,
    title: "Customization & Extensions",
    bloom: "Apply / Analyze / Create",
    days: [
      {
        label: "Days 15–16: Custom Skills & Slash Commands",
        activities: [
          { text: "Create a /review custom command", deliverable: false },
          { text: "Create a testing skill", deliverable: false },
          { text: "Create a /fix-issue command", deliverable: false },
          { text: "Three working custom commands/skills", deliverable: true },
        ],
      },
      {
        label: "Days 17–18: Hooks for Automation",
        activities: [
          { text: "Build a PostToolUse lint hook", deliverable: false },
          { text: "Build a PreToolUse safety hook", deliverable: false },
          { text: "Build an audit log hook", deliverable: false },
          { text: "settings.json with three hooks + documentation", deliverable: true },
        ],
      },
      {
        label: "Days 19–21: MCP Servers & Subagents",
        activities: [
          { text: "Connect 2+ MCP servers", deliverable: false },
          { text: "Create a code-reviewer subagent", deliverable: false },
          { text: "Create a doc-writer subagent", deliverable: false },
          { text: ".mcp.json + two subagent definitions", deliverable: true },
        ],
      },
    ],
  },
  {
    week: 4,
    title: "Advanced Patterns & Real-World Mastery",
    bloom: "Analyze / Evaluate / Create",
    days: [
      {
        label: "Days 22–23: Agent Teams",
        activities: [
          { text: "Run a multi-agent task with lead + 2–3 teammates", deliverable: false },
          { text: "Agent Teams experiment documentation", deliverable: true },
        ],
      },
      {
        label: "Days 24–25: Headless Mode & CI/CD",
        activities: [
          { text: "Write a JSON quality report script (headless)", deliverable: false },
          { text: "Write a test generation script (headless)", deliverable: false },
          { text: "Two headless automation scripts", deliverable: true },
        ],
      },
      {
        label: "Days 26–28: Capstone Project",
        activities: [
          { text: "Plan and build a full project using all Claude Code features", deliverable: false },
          { text: "Completed project + workflow document", deliverable: true },
        ],
      },
    ],
  },
];

// ─── State ───
const STORAGE_KEY = "claude-training-progress";

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveProgress(progress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

function activityId(weekIdx, dayIdx, actIdx) {
  return `w${weekIdx}-d${dayIdx}-a${actIdx}`;
}

// ─── Count Helpers ───
function getTotalActivities() {
  let count = 0;
  curriculum.forEach((w) =>
    w.days.forEach((d) => (count += d.activities.length))
  );
  return count;
}

function getCompletedActivities(progress) {
  return Object.values(progress).filter(Boolean).length;
}

function getWeekCounts(weekIdx, progress) {
  let total = 0;
  let completed = 0;
  curriculum[weekIdx].days.forEach((day, di) => {
    day.activities.forEach((_, ai) => {
      total++;
      if (progress[activityId(weekIdx, di, ai)]) completed++;
    });
  });
  return { total, completed };
}

// ─── DOM Refs ───
const weeksContainer = document.getElementById("weeksContainer");
const healthBarFill = document.getElementById("healthBarFill");
const healthPercent = document.getElementById("healthPercent");
const completedCount = document.getElementById("completedCount");
const totalCount = document.getElementById("totalCount");
const resetBtn = document.getElementById("resetBtn");
const modalOverlay = document.getElementById("modalOverlay");
const modalCancel = document.getElementById("modalCancel");
const modalConfirm = document.getElementById("modalConfirm");
const statusDot = document.getElementById("statusDot");
const statusText = document.getElementById("statusText");

let progress = loadProgress();
let openWeeks = new Set([0]);

// ─── Render ───
function renderWeeks() {
  weeksContainer.innerHTML = "";

  curriculum.forEach((week, wi) => {
    const { total, completed } = getWeekCounts(wi, progress);
    const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
    const isOpen = openWeeks.has(wi);
    const isComplete = completed === total;

    const card = document.createElement("div");
    card.className = `week-card${isOpen ? " open" : ""}${isComplete ? " week-complete" : ""}`;

    card.innerHTML = `
      <div class="week-header" data-week="${wi}">
        <div class="week-indicator"></div>
        <span class="week-tag">WK ${week.week}</span>
        <div class="week-info">
          <div class="week-title">${week.title}</div>
          <div class="week-bloom">${week.bloom}</div>
        </div>
        <div class="week-progress">
          <div class="week-progress-bar">
            <div class="week-progress-fill" style="width: ${pct}%"></div>
          </div>
          <span class="week-progress-text">${pct}%</span>
        </div>
        <svg class="week-chevron" viewBox="0 0 20 20" fill="none">
          <path d="M7 5l5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <div class="week-body">
        <div class="week-content">
          ${week.days
            .map(
              (day, di) => `
            <div class="day-group">
              <div class="day-label">${day.label}</div>
              ${day.activities
                .map((act, ai) => {
                  const id = activityId(wi, di, ai);
                  const checked = progress[id] ? "checked" : "";
                  const completedClass = progress[id] ? " completed" : "";
                  return `
                  <label class="activity${completedClass}" data-id="${id}">
                    <div class="activity-checkbox">
                      <input type="checkbox" ${checked} data-id="${id}">
                      <span class="checkmark">
                        <svg viewBox="0 0 12 12" fill="none">
                          <path d="M2 6l3 3 5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </span>
                    </div>
                    <div class="activity-content">
                      <span class="activity-text">${act.text}</span>
                      ${act.deliverable ? '<span class="activity-tag deliverable">DELIVERABLE</span>' : ""}
                    </div>
                  </label>`;
                })
                .join("")}
            </div>`
            )
            .join("")}
        </div>
      </div>
    `;

    weeksContainer.appendChild(card);
  });

  // Bind week toggles
  document.querySelectorAll(".week-header").forEach((header) => {
    header.addEventListener("click", () => {
      const wi = parseInt(header.dataset.week, 10);
      if (openWeeks.has(wi)) {
        openWeeks.delete(wi);
      } else {
        openWeeks.add(wi);
      }
      renderWeeks();
    });
  });

  // Bind checkboxes
  document.querySelectorAll('.activity-checkbox input[type="checkbox"]').forEach((cb) => {
    cb.addEventListener("change", (e) => {
      e.stopPropagation();
      const id = cb.dataset.id;
      progress[id] = cb.checked;
      saveProgress(progress);
      updateHealthBar();

      const label = cb.closest(".activity");
      if (cb.checked) {
        label.classList.add("completed");
      } else {
        label.classList.remove("completed");
      }

      // Update week progress
      const weekCard = cb.closest(".week-card");
      const wi = parseInt(weekCard.querySelector(".week-header").dataset.week, 10);
      const { total, completed } = getWeekCounts(wi, progress);
      const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
      weekCard.querySelector(".week-progress-fill").style.width = `${pct}%`;
      weekCard.querySelector(".week-progress-text").textContent = `${pct}%`;

      // Update week completion state
      if (completed === total) {
        weekCard.classList.add("week-complete");
      } else {
        weekCard.classList.remove("week-complete");
      }
    });
  });

  updateHealthBar();
}

function updateHealthBar() {
  const total = getTotalActivities();
  const completed = getCompletedActivities(progress);
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

  healthBarFill.style.width = `${pct}%`;
  healthPercent.textContent = pct;
  completedCount.textContent = completed;
  totalCount.textContent = total;

  // Gauge completion glow
  if (pct === 100) {
    healthBarFill.classList.add("complete");
  } else {
    healthBarFill.classList.remove("complete");
  }

  // Status indicator
  if (pct === 0) {
    statusDot.className = "status-dot";
    statusText.className = "status-text";
    statusText.textContent = "STANDBY";
  } else if (pct === 100) {
    statusDot.className = "status-dot complete";
    statusText.className = "status-text complete";
    statusText.textContent = "MISSION COMPLETE";
  } else {
    statusDot.className = "status-dot active";
    statusText.className = "status-text active";
    statusText.textContent = "IN PROGRESS";
  }
}

// ─── Reset Modal ───
resetBtn.addEventListener("click", () => {
  modalOverlay.classList.add("visible");
});

modalCancel.addEventListener("click", () => {
  modalOverlay.classList.remove("visible");
});

modalOverlay.addEventListener("click", (e) => {
  if (e.target === modalOverlay) {
    modalOverlay.classList.remove("visible");
  }
});

modalConfirm.addEventListener("click", () => {
  progress = {};
  saveProgress(progress);
  modalOverlay.classList.remove("visible");
  renderWeeks();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modalOverlay.classList.contains("visible")) {
    modalOverlay.classList.remove("visible");
  }
});

// ─── Theme Toggle ───
const themeToggle = document.getElementById("themeToggle");
const THEME_KEY = "claude-training-theme";

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem(THEME_KEY, theme);
}

function loadTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved) {
    applyTheme(saved);
  }
}

themeToggle.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme");
  applyTheme(current === "light" ? "dark" : "light");
});

loadTheme();

// ─── Confetti ───
function launchConfetti() {
  const canvas = document.getElementById("confettiCanvas");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const colors = ["#d4a846", "#e8be5a", "#c55a3a", "#5a9a5c", "#5a8a9a", "#e8e4db", "#b8922e"];
  const particles = [];
  const PARTICLE_COUNT = 120;

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height * -1 - 20,
      w: Math.random() * 8 + 4,
      h: Math.random() * 4 + 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: (Math.random() - 0.5) * 3,
      vy: Math.random() * 3 + 2,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 12,
      opacity: 1,
      delay: Math.random() * 600,
    });
  }

  const start = performance.now();
  const DURATION = 3500;

  function animate(now) {
    const elapsed = now - start;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let active = false;
    particles.forEach((p) => {
      if (elapsed < p.delay) { active = true; return; }

      p.x += p.vx;
      p.vy += 0.06;
      p.y += p.vy;
      p.rotation += p.rotationSpeed;

      if (elapsed > DURATION - 1000) {
        p.opacity = Math.max(0, p.opacity - 0.02);
      }

      if (p.y < canvas.height + 20 && p.opacity > 0) {
        active = true;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      }
    });

    if (active && elapsed < DURATION + 500) {
      requestAnimationFrame(animate);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  requestAnimationFrame(animate);

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }, { once: true });
}

// ─── Init ───
renderWeeks();
launchConfetti();

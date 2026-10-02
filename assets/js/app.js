(() => {
  "use strict";

  const API_URL = "https://script.google.com/macros/s/AKfycbx74jCwq-XWlHDQWP-EMWd_Jqfbgd8AwflgpSY_vVCu5eI-ShWh7AXgX-Sl3aL0XTs2og/exec";
  const TOKEN_STORAGE_KEY = "epsilon_class1_session_v1";
  const API_TIMEOUT_MS = 60000;
  const INSTALL_FLAG_KEY = "epsilon_class1_pwa_installed_v1";

  const HOME_TABS = [
    { id: "class1", label: "Lớp 1", icon: "🎒", tone: "purple" },
    { id: "epsilon", label: "Epsilon Edu", icon: "🌐", tone: "pink" },
    { id: "games", label: "Games", icon: "🎮", tone: "blue" },
    { id: "tools", label: "Tools", icon: "🧰", tone: "green" },
    { id: "contact", label: "Liên hệ", icon: "💌", tone: "amber" }
  ];

  const SUBJECTS = [
    {
      id: "math",
      apiId: "toan",
      label: "Toán",
      fullLabel: "Toán 1",
      icon: "🧮",
      tone: "blue",
      description: "Không gian học Toán của bé."
    },
    {
      id: "vietnamese",
      apiId: "tv",
      label: "Tiếng Việt",
      fullLabel: "Tiếng Việt 1",
      icon: "📚",
      tone: "pink",
      description: "Không gian học Tiếng Việt của bé."
    },
    {
      id: "english",
      apiId: "ta",
      label: "Tiếng Anh",
      fullLabel: "Tiếng Anh 1",
      icon: "🔤",
      tone: "green",
      description: "Không gian học Tiếng Anh của bé."
    }
  ];

  const SUBJECT_TABS = [
    { id: "discover", label: "Khám phá", icon: "🧭", tone: "purple" },
    { id: "lessons", label: "Bài học", icon: "📖", tone: "pink" },
    { id: "exercises", label: "Bài tập", icon: "✏️", tone: "blue" },
    { id: "review", label: "Ôn tập", icon: "🧠", tone: "amber" },
    { id: "exams", label: "Đề thi", icon: "🏆", tone: "green" },
    { id: "games", label: "Mini games", icon: "🎮", tone: "indigo" }
  ];

  const AVATARS = [
    "🐰","🐼","🐯","🦊","🐨","🐸","🐧","🦁","🐱","🐶","🐵","🦄",
    "🌟","🚀","🎨","📚","⚽","🎵","🌈","🍀","🌻","🦋","🐳","🐙"
  ];

  const PREVIEW_TONES = ["pink", "purple", "blue", "green", "teal", "amber"];

  const state = {
    screen: "home",
    homeTab: "class1",
    subjectId: null,
    subjectTab: "discover",
    profileSubjectId: null,
    detail: null,
    installPrompt: window.__class1InstallPrompt || null,
    auth: {
      ready: false,
      token: null,
      user: null,
      access: emptyAccess(),
      requests: []
    },
    profile: {
      subjectId: null,
      loading: false,
      data: null,
      failed: false
    },
    account: {
      view: "overview"
    },
    admin: {
      loading: false,
      loaded: false,
      overview: null,
      requests: [],
      users: [],
      query: ""
    }
  };

  const el = {
    nav: document.getElementById("primary-nav"),
    homeButton: document.getElementById("home-button"),
    content: document.getElementById("content-stage"),
    mainBanner: document.getElementById("main-banner"),
    subBanner: document.getElementById("sub-banner"),
    subPill: document.getElementById("sub-pill"),
    scoreBox: document.getElementById("score-box"),
    installButton: document.getElementById("install-button"),
    accountButton: document.getElementById("account-button"),
    authModal: document.getElementById("auth-modal"),
    authClose: document.getElementById("auth-close"),
    authLater: document.getElementById("auth-later"),
    authTabs: document.getElementById("auth-tabs"),
    authTabLogin: document.getElementById("auth-tab-login"),
    authTabRegister: document.getElementById("auth-tab-register"),
    loginForm: document.getElementById("login-form"),
    registerForm: document.getElementById("register-form"),
    loginSubmit: document.getElementById("login-submit"),
    registerSubmit: document.getElementById("register-submit"),
    dialog: document.getElementById("app-dialog"),
    dialogIcon: document.getElementById("dialog-icon"),
    dialogTitle: document.getElementById("dialog-title"),
    dialogMessage: document.getElementById("dialog-message"),
    dialogOk: document.getElementById("dialog-ok"),
    dialogSecondary: document.getElementById("dialog-secondary"),
    toast: document.getElementById("toast")
  };

  let dialogPrimaryHandler = null;
  let dialogSecondaryHandler = null;
  let toastTimer = 0;

  function emptyAccess() {
    const out = {};
    SUBJECTS.forEach((subject) => {
      out[subject.id] = { type: "regular", startAt: "", endAt: "" };
    });
    return out;
  }

  function currentSubject() {
    return SUBJECTS.find((item) => item.id === state.subjectId) || SUBJECTS[0];
  }

  function subjectByFrontId(subjectId) {
    return SUBJECTS.find((item) => item.id === subjectId) || null;
  }

  function normalizeAccess(raw) {
    const out = emptyAccess();
    SUBJECTS.forEach((subject) => {
      const item = raw && raw[subject.apiId] ? raw[subject.apiId] : null;
      if (!item) return;
      const type = ["trial", "vip"].includes(String(item.type || "").toLowerCase()) ? String(item.type).toLowerCase() : "regular";
      out[subject.id] = {
        type,
        startAt: item.startAt || "",
        endAt: item.endAt || ""
      };
    });
    return out;
  }

  function accessTypeFor(subjectId) {
    if (state.auth.user && state.auth.user.role === "admin") return "admin";
    const item = state.auth.access[subjectId] || { type: "regular", endAt: "" };
    if ((item.type === "trial" || item.type === "vip") && item.endAt) {
      const end = new Date(item.endAt);
      if (!Number.isNaN(end.getTime()) && end.getTime() <= Date.now()) return "regular";
    }
    return item.type || "regular";
  }

  function hasPremiumAccess(subjectId) {
    const type = accessTypeFor(subjectId);
    return type === "admin" || type === "trial" || type === "vip";
  }

  function readStoredToken() {
    try {
      const token = String(window.localStorage.getItem(TOKEN_STORAGE_KEY) || "").trim();
      if (token) return token;
    } catch (_) {}
    try {
      return String(window.sessionStorage.getItem(TOKEN_STORAGE_KEY) || "").trim();
    } catch (_) {
      return "";
    }
  }

  function storeToken(token) {
    let stored = false;
    try {
      if (token) {
        window.localStorage.setItem(TOKEN_STORAGE_KEY, token);
        stored = String(window.localStorage.getItem(TOKEN_STORAGE_KEY) || "") === String(token);
      } else {
        window.localStorage.removeItem(TOKEN_STORAGE_KEY);
        stored = true;
      }
    } catch (_) {}

    // Fallback cho môi trường trình duyệt chặn localStorage. sessionStorage vẫn sống qua F5.
    try {
      if (token && !stored) window.sessionStorage.setItem(TOKEN_STORAGE_KEY, token);
      else window.sessionStorage.removeItem(TOKEN_STORAGE_KEY);
    } catch (_) {}
    return stored;
  }

  function applyAuthData(data, token) {
    const user = data && data.user ? data.user : null;
    if (!user || !user.userId) throw new Error("INVALID_AUTH_RESPONSE");
    state.auth.token = token || data.token || state.auth.token;
    state.auth.user = {
      userId: String(user.userId || ""),
      name: String(user.name || ""),
      role: String(user.role || "student").toLowerCase() === "admin" ? "admin" : "student",
      avatarEmoji: AVATARS.includes(String(user.avatarEmoji || "")) ? String(user.avatarEmoji) : "🐰",
      createdAt: user.createdAt || ""
    };
    state.auth.access = normalizeAccess(data.access || {});
    state.auth.ready = true;
    if (state.auth.token) storeToken(state.auth.token);
    updateAccountButton();
  }

  function clearAuthState() {
    storeToken("");
    state.auth.token = null;
    state.auth.user = null;
    state.auth.access = emptyAccess();
    state.auth.requests = [];
    state.auth.ready = true;
    state.profile = { subjectId: null, loading: false, data: null, failed: false };
    state.account = { view: "overview" };
    state.admin = { loading: false, loaded: false, overview: null, requests: [], users: [], query: "" };
    updateAccountButton();
  }

  class ApiError extends Error {
    constructor(message, code, kind) {
      super(message || "REQUEST_FAILED");
      this.name = "ApiError";
      this.code = code || "REQUEST_FAILED";
      this.kind = kind || "server";
    }
  }

  async function apiRequest(action, payload = {}, options = {}) {
    const req = Object.assign({ action }, payload || {});
    const token = options.token !== undefined ? options.token : state.auth.token;
    if (options.auth !== false && token) req.token = token;

    const controller = typeof AbortController === "function" ? new AbortController() : null;
    const timeoutId = controller ? window.setTimeout(() => controller.abort(), API_TIMEOUT_MS) : 0;
    let response;
    try {
      response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=UTF-8" },
        body: JSON.stringify(req),
        cache: "no-store",
        credentials: "omit",
        redirect: "follow",
        referrerPolicy: "no-referrer",
        signal: controller ? controller.signal : undefined
      });
    } catch (_) {
      throw new ApiError("NETWORK_ERROR", "NETWORK_ERROR", "network");
    } finally {
      if (timeoutId) window.clearTimeout(timeoutId);
    }

    let data;
    try {
      data = await response.json();
    } catch (_) {
      throw new ApiError("INVALID_SERVER_RESPONSE", "SERVER_ERROR", "server");
    }

    if (!data || data.ok !== true) {
      const err = new ApiError(String((data && data.error) || "REQUEST_DENIED"), String((data && data.code) || "REQUEST_DENIED"), "server");
      if (err.code === "UNAUTHORIZED" && options.keepSessionOnUnauthorized !== true) {
        clearAuthState();
      }
      throw err;
    }
    return data.data || {};
  }

  function friendlyError(err, context) {
    const code = err && err.code ? err.code : "";
    if (context === "login") {
      if (code === "RATE_LIMITED") return "Bạn đã thử đăng nhập nhiều lần. Vui lòng thử lại sau.";
      return "Chưa đăng nhập được. Vui lòng kiểm tra ID, mật khẩu và thử lại.";
    }
    if (context === "register") {
      if (code === "RATE_LIMITED") return "Bạn thao tác quá nhanh. Vui lòng thử đăng ký lại sau.";
      if (code === "INVALID_PASSWORD") return "Mật khẩu cần từ 6 đến 128 ký tự.";
      if (code === "INVALID_INPUT") return "Họ và tên chưa hợp lệ. Vui lòng kiểm tra lại.";
      return "Chưa tạo được tài khoản. Vui lòng thử lại.";
    }
    if (code === "UNAUTHORIZED") return "Phiên đăng nhập không còn hiệu lực. Vui lòng đăng nhập lại.";
    if (code === "FORBIDDEN") return "Tài khoản không có quyền thực hiện thao tác này.";
    if (code === "RATE_LIMITED") return "Bạn thao tác quá nhanh. Vui lòng thử lại sau.";
    if (code === "REQUEST_EXISTS") return "Đã có yêu cầu đang chờ cho một môn đã chọn.";
    if (code === "ACCESS_ALREADY_ACTIVE") return "Một môn đã chọn đang có quyền học còn hiệu lực.";
    if (code === "ACCOUNT_NOT_FOUND") return "Tài khoản không còn tồn tại.";
    return "Chưa thực hiện được. Vui lòng thử lại.";
  }

  async function bootstrapAuth() {
    const token = readStoredToken();
    if (!token) {
      state.auth.ready = true;
      updateAccountButton();
      render();
      return;
    }

    state.auth.token = token;
    state.auth.ready = false;
    updateAccountButton(true);

    let lastError = null;
    for (let attempt = 0; attempt < 3; attempt += 1) {
      try {
        const data = await apiRequest("sessionVerify", {}, {
          token,
          auth: true,
          keepSessionOnUnauthorized: true
        });
        applyAuthData(data, token);
        state.auth.ready = true;
        render();
        return;
      } catch (err) {
        lastError = err;
        if (err && (err.code === "UNAUTHORIZED" || err.code === "ACCOUNT_NOT_FOUND")) {
          clearAuthState();
          state.auth.ready = true;
          render();
          return;
        }
        if (attempt < 2) {
          await new Promise((resolve) => window.setTimeout(resolve, 900 * (attempt + 1)));
        }
      }
    }

    // Lỗi mạng/server tạm thời không được biến thành logout. Giữ token để lần tải sau
    // còn xác minh lại, nhưng không coi trạng thái client là đã đăng nhập khi server chưa xác nhận.
    state.auth.token = token;
    state.auth.user = null;
    state.auth.access = emptyAccess();
    state.auth.ready = true;
    updateAccountButton();
    render();
    if (lastError) showToast("Chưa xác minh được phiên đăng nhập. Vui lòng thử lại sau.");
  }

  function setScreen(screen) {
    state.screen = screen;
    state.detail = null;
    render();
  }

  function goHome() {
    state.screen = "home";
    state.homeTab = "class1";
    state.subjectId = null;
    state.subjectTab = "discover";
    state.profileSubjectId = null;
    state.detail = null;
    render();
    focusContent();
  }

  function openHomeTab(tabId) {
    state.screen = "home";
    state.homeTab = HOME_TABS.some((t) => t.id === tabId) ? tabId : "class1";
    state.subjectId = null;
    state.profileSubjectId = null;
    state.detail = null;
    render();
    focusContent();
  }

  function openSubject(subjectId) {
    const subject = subjectByFrontId(subjectId);
    if (!subject) return;
    state.screen = "subject";
    state.subjectId = subject.id;
    state.subjectTab = "discover";
    state.profileSubjectId = null;
    state.detail = null;
    render();
    focusContent();
  }

  async function openLearningProfile(subjectId) {
    const subject = subjectByFrontId(subjectId);
    if (!subject) return;
    if (!state.auth.ready) {
      showToast("Đang kiểm tra phiên đăng nhập…");
      return;
    }
    if (!state.auth.user) {
      showToast("Đăng nhập để xem Hồ sơ học tập.");
      openAuth("login");
      return;
    }

    state.screen = "profile";
    state.homeTab = "class1";
    state.subjectId = null;
    state.profileSubjectId = subject.id;
    state.detail = null;
    state.profile = { subjectId: subject.id, loading: true, data: null, failed: false };
    render();
    focusContent();

    try {
      const data = await apiRequest("learningProfileGet", { subjectId: subject.apiId });
      if (state.screen === "profile" && state.profileSubjectId === subject.id) {
        state.profile = { subjectId: subject.id, loading: false, data, failed: false };
        render();
      }
    } catch (err) {
      if (state.screen === "profile" && state.profileSubjectId === subject.id) {
        state.profile = { subjectId: subject.id, loading: false, data: null, failed: true };
        render();
        showToast(friendlyError(err));
      }
    }
  }

  function openSubjectTab(tabId) {
    if (!SUBJECT_TABS.some((t) => t.id === tabId)) return;
    if (tabId !== "discover" && !hasPremiumAccess(state.subjectId)) {
      if (!state.auth.ready) {
        showToast("Đang kiểm tra phiên đăng nhập…");
        return;
      }
      if (!state.auth.user) {
        showDialog({
          title: "Cần đăng nhập",
          message: "Bài học, Bài tập, Ôn tập, Đề thi và Mini games cần quyền Trial/VIP của môn này.",
          icon: "🔐",
          primaryLabel: "Đăng nhập",
          onPrimary: () => openAuth("login")
        });
      } else {
        showDialog({
          title: "Cần quyền học",
          message: "Tài khoản hiện là Regular ở môn này. Bạn có thể gửi yêu cầu quyền học để Admin duyệt.",
          icon: "🌟",
          primaryLabel: "Đăng ký quyền học",
          onPrimary: () => openAuth("request")
        });
      }
      return;
    }

    state.screen = "subject";
    state.subjectTab = tabId;
    state.detail = null;
    render();
    focusContent();
  }

  function openDetail(index) {
    const tab = SUBJECT_TABS.find((t) => t.id === state.subjectTab) || SUBJECT_TABS[0];
    const title = state.subjectTab === "exams"
      ? ["Học kỳ I", "Học kỳ II", "Học sinh giỏi"][index % 3]
      : state.subjectTab === "games"
        ? `Game ${index + 1}`
        : state.subjectTab === "lessons"
          ? `Bài học ${index + 1}`
          : state.subjectTab === "exercises"
            ? `Bài tập ${index + 1}`
            : state.subjectTab === "review"
              ? `Ôn tập ${index + 1}`
              : `Mục khám phá ${index + 1}`;

    state.detail = { title, tabLabel: tab.label };
    render();
    focusContent();
  }

  function render() {
    renderNav();
    renderBanner();
    renderContent();
    el.scoreBox.classList.toggle("hidden", state.screen !== "subject");
    updateInstallVisibility();
    updateAccountButton();
  }

  function renderNav() {
    const tabs = state.screen === "subject" ? SUBJECT_TABS : HOME_TABS;
    el.nav.replaceChildren();

    tabs.forEach((tab, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `nav-tab tone-${tab.tone}`;
      button.dataset.id = tab.id;

      const active = state.screen === "subject"
        ? state.subjectTab === tab.id
        : state.homeTab === tab.id;

      if (active) button.classList.add("is-active");

      const displayLabel = state.screen === "subject" && index === 0
        ? currentSubject().label
        : tab.label;

      const icon = document.createElement("span");
      icon.className = "tab-icon";
      icon.setAttribute("aria-hidden", "true");
      icon.textContent = tab.icon;

      const label = document.createElement("span");
      label.textContent = displayLabel;
      button.append(icon, label);

      if (state.screen === "subject" && tab.id !== "discover" && !hasPremiumAccess(state.subjectId)) {
        button.classList.add("is-locked");
        button.title = "Cần Trial/VIP của môn";
      }

      button.addEventListener("click", () => {
        if (state.screen === "subject") openSubjectTab(tab.id);
        else openHomeTab(tab.id);
      });
      el.nav.appendChild(button);
    });
  }

  function renderBanner() {
    const detailMode = state.screen === "subject" && !!state.detail;
    el.mainBanner.classList.toggle("hidden", detailMode);
    el.subBanner.classList.toggle("hidden", !detailMode);
    if (detailMode) el.subPill.textContent = `🌸 ${state.detail.title}`;
  }

  function renderContent() {
    if (state.screen === "home") return renderHomeContent();
    if (state.screen === "profile") return renderLearningProfile();
    if (state.screen === "account") return renderAccountPage();
    if (state.screen === "admin") return renderAdmin();
    if (state.detail) return renderDetailContent();
    renderSubjectContent();
  }

  function renderHomeContent() {
    switch (state.homeTab) {
      case "epsilon": renderEpsilonTab(); break;
      case "games": renderEmptyHomeTab("🎮", "Games", "Khu Games của Trang chủ sẽ được bổ sung ở bước nội dung."); break;
      case "tools": renderEmptyHomeTab("🧰", "Tools", "Khu công cụ sẽ được bổ sung sau."); break;
      case "contact": renderContactTab(); break;
      case "class1":
      default: renderClass1Tab(); break;
    }
  }

  function accessBadge(subjectId) {
    const type = accessTypeFor(subjectId);
    if (type === "admin") return "Admin";
    if (type === "vip") return "VIP";
    if (type === "trial") return "Trial";
    return state.auth.user ? "Regular" : "Vào môn học";
  }

  function renderClass1Tab() {
    const cards = SUBJECTS.map((subject) => `
      <div class="subject-column">
        <button class="content-card subject-card" data-tone="${subject.tone}" data-subject="${subject.id}" type="button">
          <div class="card-top">
            <span class="card-icon" aria-hidden="true">${subject.icon}</span>
            <div class="card-copy">
              <h2 class="card-title">${escapeHtml(subject.fullLabel)}</h2>
              <p class="card-desc">${escapeHtml(subject.description)}</p>
            </div>
          </div>
          <div class="card-foot">
            <span class="badge">${escapeHtml(accessBadge(subject.id))}</span>
            <span class="arrow"><span>→</span></span>
          </div>
        </button>

        <button class="subject-profile-card" data-tone="${subject.tone}" data-profile-subject="${subject.id}" type="button" aria-label="Mở Hồ sơ học tập ${escapeHtml(subject.fullLabel)}">
          <span class="subject-profile-icon" aria-hidden="true">📊</span>
          <span class="subject-profile-copy">
            <span class="subject-profile-title">Hồ sơ học tập</span>
            <span class="subject-profile-note">${state.auth.user ? "Xem tiến trình của bé" : "Đăng nhập để xem"}</span>
          </span>
          <span class="subject-profile-arrow" aria-hidden="true">→</span>
        </button>
      </div>
    `).join("");

    el.content.innerHTML = `
      <div class="section-heading">
        <div>
          <h1>🌟 Lớp 1</h1>
          <p>Chọn môn học để bắt đầu.</p>
        </div>
      </div>
      <section class="subject-grid" aria-label="Ba môn học Lớp 1">${cards}</section>
    `;

    el.content.querySelectorAll("[data-subject]").forEach((card) => {
      card.addEventListener("click", () => openSubject(card.dataset.subject));
    });
    el.content.querySelectorAll("[data-profile-subject]").forEach((card) => {
      card.addEventListener("click", () => openLearningProfile(card.dataset.profileSubject));
    });
  }

  function renderLearningProfile() {
    const subject = subjectByFrontId(state.profileSubjectId) || SUBJECTS[0];
    const profileState = state.profile;

    let body = "";
    if (profileState.loading) {
      body = `<div class="empty-panel"><div><span class="inline-spinner" aria-hidden="true"></span><strong>Đang tải Hồ sơ học tập…</strong></div></div>`;
    } else if (profileState.failed) {
      body = `
        <div class="learning-profile-empty">
          <strong>🐰 Chưa tải được Hồ sơ học tập</strong>
          Vui lòng thử lại sau.
        </div>`;
    } else {
      const summary = profileState.data && profileState.data.summary ? profileState.data.summary : null;
      const attempts = summary ? Number(summary.attempts || 0) : 0;
      const correct = summary ? Number(summary.correct || 0) : 0;
      const wrong = summary ? Number(summary.wrong || 0) : 0;
      const mastery = summary && summary.mastery != null ? `${Number(summary.mastery)}%` : "Chưa đủ dữ liệu";
      const independence = summary && summary.independentPercent != null ? `${Number(summary.independentPercent)}%` : "Chưa đủ dữ liệu";

      body = `
        <section class="learning-profile-grid" aria-label="Tổng quan Hồ sơ học tập ${escapeHtml(subject.fullLabel)}">
          <div class="learning-profile-stat"><div class="stat-icon">🎯</div><strong>Đã luyện</strong><span>${attempts ? `${attempts} lượt` : "Chưa đủ dữ liệu"}</span></div>
          <div class="learning-profile-stat"><div class="stat-icon">🌟</div><strong>Đang làm tốt</strong><span>${attempts ? `${correct} lượt đúng` : "Chưa đủ dữ liệu"}</span></div>
          <div class="learning-profile-stat"><div class="stat-icon">🌱</div><strong>Cần luyện thêm</strong><span>${attempts ? `${wrong} lượt cần xem lại` : "Chưa đủ dữ liệu"}</span></div>
          <div class="learning-profile-stat"><div class="stat-icon">🧠</div><strong>Mức tự học</strong><span>${independence}</span></div>
        </section>
        <div class="learning-profile-empty">
          <strong>${attempts ? `Mức thành thạo tham khảo: ${mastery}` : "🐰 Cô Thỏ Hồng đang chờ thêm dữ liệu học tập"}</strong>
          ${attempts ? "Hồ sơ này phục vụ hỗ trợ học thích ứng, không phải khung đánh giá 6 năng lực chính thức." : "Khi bé bắt đầu luyện tập, hồ sơ sẽ dần cho biết phần bé đang làm tốt, phần cần ôn lại và mức độ tự làm của bé."}
        </div>`;
    }

    el.content.innerHTML = `
      <div class="section-heading">
        <div>
          <h1>📊 Hồ sơ học tập · ${escapeHtml(subject.fullLabel)}</h1>
          <p>Theo dõi quá trình luyện tập và mức độ tự học của bé.</p>
        </div>
        <button id="profile-back-button" class="back-btn" type="button">← Lớp 1</button>
      </div>
      ${body}
    `;
    document.getElementById("profile-back-button")?.addEventListener("click", () => openHomeTab("class1"));
  }

  function renderEpsilonTab() {
    const grades = Array.from({ length: 9 }, (_, i) => i + 1);
    const cards = grades.map((grade, index) => `
      <button class="content-card" data-tone="${PREVIEW_TONES[index % PREVIEW_TONES.length]}" data-grade="${grade}" type="button">
        <div class="card-top">
          <span class="card-icon" aria-hidden="true">🏫</span>
          <div class="card-copy">
            <h2 class="card-title">Lớp ${grade}</h2>
            <p class="card-desc">${grade === 1 ? "Website Lớp 1 hiện tại." : "Liên kết website sẽ được gắn sau."}</p>
          </div>
        </div>
        <div class="card-foot">
          <span class="badge">${grade === 1 ? "Đang mở" : "Mở website"}</span>
          <span class="arrow"><span>↗</span></span>
        </div>
      </button>
    `).join("");

    el.content.innerHTML = `
      <div class="section-heading"><div><h1>🌐 Epsilon Edu</h1><p>Danh mục website Lớp 1 đến Lớp 9.</p></div></div>
      <section class="home-link-grid" aria-label="Danh sách lớp">${cards}</section>
    `;

    el.content.querySelectorAll("[data-grade]").forEach((card) => {
      card.addEventListener("click", () => {
        const grade = Number(card.dataset.grade);
        if (grade === 1) return openHomeTab("class1");
        showToast(`Liên kết Lớp ${grade} hiện chưa được cập nhật.`);
      });
    });
  }

  function renderEmptyHomeTab(icon, title, message) {
    el.content.innerHTML = `
      <div class="section-heading"><div><h1>${icon} ${escapeHtml(title)}</h1><p>Khung giao diện đã sẵn sàng.</p></div></div>
      <div class="empty-panel"><div><strong>Chưa có nội dung</strong>${escapeHtml(message)}</div></div>
    `;
  }

  function renderContactTab() {
    el.content.innerHTML = `
      <div class="section-heading"><div><h1>💌 Liên hệ</h1><p>Khung giới thiệu và thông tin liên hệ của chương trình.</p></div></div>
      <section class="subject-grid">
        <div class="content-card subject-card" data-tone="purple"><div class="card-top"><span class="card-icon">🌱</span><div class="card-copy"><h2 class="card-title">Giới thiệu chương trình</h2><p class="card-desc">Nội dung giới thiệu sẽ được bổ sung ở bước nội dung.</p></div></div></div>
        <div class="content-card subject-card" data-tone="blue"><div class="card-top"><span class="card-icon">📞</span><div class="card-copy"><h2 class="card-title">Thông tin liên hệ</h2><p class="card-desc">Thông tin liên hệ chi tiết sẽ được chốt sau.</p></div></div></div>
        <div class="content-card subject-card" data-tone="green"><div class="card-top"><span class="card-icon">🐰</span><div class="card-copy"><h2 class="card-title">Cô Thỏ Hồng</h2><p class="card-desc">Mascot đồng hành cùng bé trong toàn bộ Lớp 1.</p></div></div></div>
      </section>
    `;
  }

  function renderSubjectContent() {
    const subject = currentSubject();
    const tab = SUBJECT_TABS.find((item) => item.id === state.subjectTab) || SUBJECT_TABS[0];
    const count = state.subjectTab === "games" ? 12 : state.subjectTab === "exams" ? 3 : 8;
    const cards = Array.from({ length: count }, (_, index) => {
      const tone = PREVIEW_TONES[index % PREVIEW_TONES.length];
      const meta = previewMeta(state.subjectTab, index);
      return `
        <button class="content-card" data-tone="${tone}" data-preview-index="${index}" type="button">
          <div class="card-top">
            <span class="card-icon" aria-hidden="true">${meta.icon}</span>
            <div class="card-copy">
              <h2 class="card-title">${escapeHtml(meta.title)}</h2>
              <p class="card-desc">${escapeHtml(meta.description)}</p>
            </div>
          </div>
          <div class="card-foot"><span class="badge">${escapeHtml(meta.badge)}</span><span class="arrow"><span>→</span></span></div>
        </button>`;
    }).join("");

    const heading = state.subjectTab === "discover"
      ? `${subject.icon} ${subject.fullLabel}`
      : `${tab.icon} ${tab.label} · ${subject.fullLabel}`;

    const access = accessTypeFor(subject.id);
    const accessText = access === "admin" ? "Admin" : access.charAt(0).toUpperCase() + access.slice(1);

    el.content.innerHTML = `
      <div class="section-heading">
        <div><h1>${heading}</h1><p>Khung hiển thị đang chờ nạp học liệu thật · Quyền môn: ${escapeHtml(accessText)}</p></div>
      </div>
      <section class="card-grid" aria-label="${escapeHtml(tab.label)}">${cards}</section>
    `;

    el.content.querySelectorAll("[data-preview-index]").forEach((card) => {
      card.addEventListener("click", () => openDetail(Number(card.dataset.previewIndex)));
    });
  }

  function previewMeta(tabId, index) {
    const n = index + 1;
    if (tabId === "games") return { icon: "🎮", title: `Game ${n}`, description: "Nội dung game sẽ bổ sung sau.", badge: "Mẫu giao diện" };
    if (tabId === "exams") {
      const names = ["Học kỳ I", "Học kỳ II", "Học sinh giỏi"];
      return { icon: "🏆", title: names[index % 3], description: "Bộ đề sẽ bổ sung sau.", badge: "Chưa có dữ liệu" };
    }
    if (tabId === "lessons") return { icon: "📖", title: `Bài học ${n}`, description: "Học liệu sẽ bổ sung sau.", badge: "Mẫu giao diện" };
    if (tabId === "exercises") return { icon: "✏️", title: `Bài tập ${n}`, description: "Bộ 20 câu sẽ bổ sung sau.", badge: "Mẫu giao diện" };
    if (tabId === "review") return { icon: "🧠", title: `Ôn tập ${n}`, description: "Nội dung sẽ bổ sung sau.", badge: "Mẫu giao diện" };
    return { icon: "🌟", title: `Mục khám phá ${n}`, description: "Học liệu sẽ bổ sung sau.", badge: "Mẫu giao diện" };
  }

  function renderDetailContent() {
    const subject = currentSubject();
    el.content.innerHTML = `
      <div class="section-heading">
        <div><h1>${subject.icon} ${escapeHtml(state.detail.title)}</h1><p>${escapeHtml(subject.fullLabel)} · ${escapeHtml(state.detail.tabLabel)}</p></div>
        <button id="back-to-list" class="back-btn" type="button">← Quay lại</button>
      </div>
      <div class="detail-panel"><div class="empty-panel"><div><strong>Khung mục học đã sẵn sàng</strong>Học liệu, bài giảng và tương tác sẽ được bổ sung ở bước tiếp theo.</div></div></div>
    `;
    document.getElementById("back-to-list").addEventListener("click", () => {
      state.detail = null;
      render();
      focusContent();
    });
  }

  function openAuth(mode = "login") {
    if (state.auth.user) {
      closeAuth();
      openAccountPage();
      return;
    }
    const safeMode = mode === "register" ? "register" : "login";
    switchAuthView(safeMode);
    el.authModal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
    window.setTimeout(() => {
      const target = safeMode === "register"
        ? document.getElementById("register-name")
        : document.getElementById("login-id");
      target?.focus();
    }, 50);
  }

  function closeAuth() {
    el.authModal.classList.add("hidden");
    document.body.style.overflow = "";
  }

  function switchAuthView(mode) {
    const register = mode === "register";
    el.authTabs.classList.remove("hidden");
    el.authTabLogin.classList.toggle("is-active", !register);
    el.authTabRegister.classList.toggle("is-active", register);
    el.loginForm.classList.toggle("hidden", register);
    el.registerForm.classList.toggle("hidden", !register);
    el.authLater.textContent = "Để sau nhé";
  }

  function updateAccountButton(verifying = false) {
    if (!el.accountButton) return;

    const avatar = document.createElement("span");
    avatar.className = "user-btn-avatar";
    avatar.setAttribute("aria-hidden", "true");

    const label = document.createElement("span");
    label.className = "user-btn-name";

    if (verifying || !state.auth.ready) {
      avatar.textContent = "🐰";
      label.textContent = "Đang tải";
      el.accountButton.title = "Đang kiểm tra phiên đăng nhập";
      el.accountButton.setAttribute("aria-label", "Đang kiểm tra tài khoản");
    } else if (state.auth.user) {
      avatar.textContent = state.auth.user.avatarEmoji || "🐰";
      label.textContent = state.auth.user.name || "Tài khoản";
      el.accountButton.title = `${state.auth.user.name} · ${state.auth.user.userId}`;
      el.accountButton.setAttribute("aria-label", `Tài khoản ${state.auth.user.name}`);
    } else {
      avatar.textContent = "👤";
      label.textContent = "Tài khoản";
      el.accountButton.title = "Tài khoản";
      el.accountButton.setAttribute("aria-label", "Tài khoản");
    }

    el.accountButton.replaceChildren(avatar, label);
  }

  function openAccountPage(view = "overview") {
    if (!state.auth.user) {
      openAuth("login");
      return;
    }
    state.screen = "account";
    state.account.view = view === "request" ? "request" : "overview";
    state.homeTab = "class1";
    state.subjectId = null;
    state.profileSubjectId = null;
    state.detail = null;
    render();
    focusContent();
    refreshAccessState(true);
  }

  async function refreshAccessState(rerenderAccount = false) {
    if (!state.auth.user || !state.auth.token) return;
    try {
      const data = await apiRequest("accessStateGet");
      if (data.user && data.user.userId) {
        state.auth.user = {
          userId: String(data.user.userId || ""),
          name: String(data.user.name || ""),
          role: String(data.user.role || "student").toLowerCase() === "admin" ? "admin" : "student",
          avatarEmoji: AVATARS.includes(String(data.user.avatarEmoji || "")) ? String(data.user.avatarEmoji) : "🐰",
          createdAt: data.user.createdAt || ""
        };
        updateAccountButton();
      }
      state.auth.access = normalizeAccess(data.access || {});
      state.auth.requests = Array.isArray(data.requests) ? data.requests : [];
      if (rerenderAccount && state.screen === "account") render();
      if (state.screen === "home" || state.screen === "subject") render();
    } catch (err) {
      if (err.code === "UNAUTHORIZED") {
        if (state.screen === "account") goHome();
        render();
        showToast("Phiên đăng nhập không còn hiệu lực. Vui lòng đăng nhập lại.");
      } else if (rerenderAccount) {
        showToast(friendlyError(err));
      }
    }
  }

  function accountAccessRowsHtml() {
    return SUBJECTS.map((subject) => {
      const access = state.auth.access[subject.id] || { type: "regular", endAt: "" };
      const type = accessTypeFor(subject.id);
      const label = type === "admin" ? "Admin" : type.charAt(0).toUpperCase() + type.slice(1);
      return `<div class="account-access-row"><div><strong>${escapeHtml(subject.fullLabel)}</strong><span>${escapeHtml(accessExpiryText(type, access.endAt))}</span></div><span class="access-chip access-${escapeHtml(type)}">${escapeHtml(label)}</span></div>`;
    }).join("");
  }

  function accountRequestsHtml() {
    if (!state.auth.requests.length) return `<div class="account-request-empty">Chưa có yêu cầu quyền học đang chờ.</div>`;
    return state.auth.requests.map((request) => {
      const subjectLabels = (request.subjectIds || []).map(apiIdToLabel).filter(Boolean).join(", ");
      return `<div class="account-request-item"><div><strong>Đang chờ duyệt</strong><span>${escapeHtml(subjectLabels || "Quyền học")} · ${escapeHtml(String(request.accessType || "vip").toUpperCase())}</span></div><button class="mini-action" type="button" data-cancel-request="${escapeHtml(request.requestId)}">Hủy</button></div>`;
    }).join("");
  }

  function renderAccountPage() {
    const user = state.auth.user;
    if (!user) {
      state.screen = "home";
      render();
      openAuth("login");
      return;
    }
    if (state.account.view === "request") return renderAccessRequestPage();

    const avatarOptions = AVATARS.map((avatar) => `<option value="${escapeHtml(avatar)}"${avatar === user.avatarEmoji ? " selected" : ""}>${escapeHtml(avatar)}</option>`).join("");
    const adminButtonClass = user.role === "admin" ? "secondary-action" : "secondary-action hidden";

    el.content.innerHTML = `
      <div class="section-heading">
        <div><h1>👤 Tài khoản</h1><p>Thông tin cá nhân và quyền học của Lớp 1.</p></div>
        <button id="account-back" class="back-btn" type="button">← Lớp 1</button>
      </div>
      <section class="account-page" aria-label="Tài khoản đang đăng nhập">
        <div class="account-page-hero">
          <div class="account-page-avatar" aria-hidden="true">${escapeHtml(user.avatarEmoji || "🐰")}</div>
          <div><strong>${escapeHtml(user.name || "Tài khoản Lớp 1")}</strong><span>ID đăng nhập: ${escapeHtml(user.userId || "")}</span></div>
        </div>

        <div class="account-page-grid">
          <section class="account-section">
            <h2>Thông tin tài khoản</h2>
            <p>Có thể sửa lại họ tên nếu lúc đăng ký nhập nhầm. ID đăng nhập không thay đổi.</p>
            <div class="account-field-block">
              <label class="account-field-label" for="account-name-input">Họ và tên học sinh</label>
              <div class="account-inline-control">
                <input id="account-name-input" type="text" maxlength="80" autocomplete="name" value="${escapeHtml(user.name || "")}">
                <button id="account-name-save" class="mini-action" type="button">Lưu tên</button>
              </div>
            </div>
            <div class="account-field-block">
              <label class="account-field-label" for="account-avatar-select">Avatar</label>
              <div class="account-inline-control">
                <select id="account-avatar-select" aria-label="Chọn avatar">${avatarOptions}</select>
                <button id="account-avatar-save" class="mini-action" type="button">Lưu</button>
              </div>
            </div>
          </section>

          <section class="account-section">
            <h2>Quyền học theo môn</h2>
            <div class="account-access-list">${accountAccessRowsHtml()}</div>
          </section>
        </div>

        <section class="account-section">
          <h2>Yêu cầu đang chờ</h2>
          <div class="account-requests">${accountRequestsHtml()}</div>
        </section>

        <div class="account-page-actions">
          <button id="account-request-button" class="primary-action" type="button">Đăng ký quyền học</button>
          <button id="account-admin-button" class="${adminButtonClass}" type="button">Quản trị</button>
          <button id="account-logout-button" class="secondary-action" type="button">Đăng xuất</button>
        </div>
      </section>`;

    document.getElementById("account-back")?.addEventListener("click", goHome);
    document.getElementById("account-request-button")?.addEventListener("click", () => openAccountPage("request"));
    document.getElementById("account-admin-button")?.addEventListener("click", openAdmin);
    document.getElementById("account-logout-button")?.addEventListener("click", onLogout);
    document.getElementById("account-avatar-save")?.addEventListener("click", onAvatarSave);
    document.getElementById("account-name-save")?.addEventListener("click", onNameSave);
    el.content.querySelectorAll("[data-cancel-request]").forEach((button) => {
      button.addEventListener("click", () => cancelAccessRequest(button.dataset.cancelRequest, button));
    });
  }

  function renderAccessRequestPage() {
    if (!state.auth.user) return openAuth("login");
    const pendingApiIds = new Set();
    state.auth.requests.forEach((r) => (r.subjectIds || []).forEach((id) => pendingApiIds.add(id)));
    const choices = SUBJECTS.map((subject) => {
      const type = accessTypeFor(subject.id);
      const active = type === "trial" || type === "vip" || type === "admin";
      const pending = pendingApiIds.has(subject.apiId);
      return `<label class="subject-choice${active || pending ? " is-disabled" : ""}"><input type="checkbox" name="subject-choice" value="${escapeHtml(subject.apiId)}"${active || pending ? " disabled" : ""}><span><strong>${escapeHtml(subject.fullLabel)}</strong><small>${active ? "Đang có quyền học" : pending ? "Đang chờ duyệt" : "Có thể đăng ký"}</small></span></label>`;
    }).join("");

    el.content.innerHTML = `
      <div class="section-heading">
        <div><h1>🌟 Đăng ký quyền học</h1><p>Chọn từ 1 đến 3 môn cần đăng ký.</p></div>
        <button id="access-request-back" class="back-btn" type="button">← Tài khoản</button>
      </div>
      <section class="account-request-page account-section">
        <p class="access-request-note">Yêu cầu này không tự mở quyền học. Admin sẽ xem và duyệt đúng các môn đã chọn.</p>
        <form id="access-request-form" class="form-stack" novalidate>
          <div class="subject-choice-list">${choices}</div>
          <button id="access-request-submit" class="primary-action" type="submit">Gửi yêu cầu VIP</button>
        </form>
      </section>`;

    document.getElementById("access-request-back")?.addEventListener("click", () => openAccountPage("overview"));
    document.getElementById("access-request-form")?.addEventListener("submit", onAccessRequestSubmit);
  }

  async function cancelAccessRequest(requestId, button) {
    setButtonBusy(button, true, "Đang hủy…");
    try {
      await apiRequest("accessRequestCancel", { requestId });
      await refreshAccessState(false);
      if (state.screen === "account") render();
      showToast("Đã hủy yêu cầu quyền học.");
    } catch (err) {
      setButtonBusy(button, false);
      showToast(friendlyError(err));
    }
  }

  function accessExpiryText(type, endAt) {
    if (type === "admin") return "Quyền quản trị";
    if (type === "regular") return "Nội dung Free trong Khám phá";
    const formatted = formatDate(endAt);
    return formatted ? `Đến ${formatted}` : "Đang có hiệu lực";
  }

  function apiIdToLabel(apiId) {
    const subject = SUBJECTS.find((s) => s.apiId === apiId);
    return subject ? subject.fullLabel : "";
  }

  function validateRegistration() {
    const name = document.getElementById("register-name").value.trim();
    const password = document.getElementById("register-password").value;
    const confirm = document.getElementById("register-confirm").value;
    if (!name) return "Vui lòng nhập họ và tên học sinh.";
    if (name.length > 80) return "Họ và tên tối đa 80 ký tự.";
    if (password.length < 6 || password.length > 128) return "Mật khẩu cần từ 6 đến 128 ký tự.";
    if (password !== confirm) return "Hai lần nhập mật khẩu chưa trùng nhau.";
    return "";
  }

  async function onLoginSubmit(event) {
    event.preventDefault();
    const id = document.getElementById("login-id").value.trim().toUpperCase();
    const password = document.getElementById("login-password").value;
    if (!id || !password) return showToast("Vui lòng nhập ID và mật khẩu.");

    setButtonBusy(el.loginSubmit, true, "Đang đăng nhập…");
    try {
      const data = await apiRequest("login", { userId: id, password }, { auth: false });
      applyAuthData(data, data.token);
      document.getElementById("login-password").value = "";
      closeAuth();
      render();
      showToast(`Đã đăng nhập: ${state.auth.user.name}.`);
    } catch (err) {
      showToast(friendlyError(err, "login"));
    } finally {
      setButtonBusy(el.loginSubmit, false);
    }
  }

  async function onRegisterSubmit(event) {
    event.preventDefault();
    const error = validateRegistration();
    if (error) return showToast(error);

    const name = document.getElementById("register-name").value.trim();
    const password = document.getElementById("register-password").value;
    setButtonBusy(el.registerSubmit, true, "Đang đăng ký…");
    try {
      const data = await apiRequest("register", { name, password }, { auth: false });
      applyAuthData(data, data.token);
      document.getElementById("register-password").value = "";
      document.getElementById("register-confirm").value = "";
      closeAuth();
      render();
      const userId = state.auth.user.userId;
      showDialog({
        title: "Cô Thỏ Hồng: Con đã có tài khoản rồi!",
        message: `Tên: ${state.auth.user.name}\nID đăng nhập: ${userId}\n\nCon nhớ lưu lại ID này để đăng nhập lần sau nhé.`,
        icon: "🎉",
        primaryLabel: "Vào học",
        secondaryLabel: "Sao chép ID",
        onSecondary: async () => {
          const copied = await copyText(userId);
          showToast(copied ? "Đã sao chép ID." : `ID của bạn: ${userId}`);
        }
      });
    } catch (err) {
      showToast(friendlyError(err, "register"));
    } finally {
      setButtonBusy(el.registerSubmit, false);
    }
  }

  async function onAccessRequestSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const submit = form.querySelector('button[type="submit"]');
    const subjectIds = Array.from(form.querySelectorAll('input[name="subject-choice"]:checked')).map((input) => input.value);
    if (subjectIds.length < 1 || subjectIds.length > 3) return showToast("Vui lòng chọn từ 1 đến 3 môn.");

    setButtonBusy(submit, true, "Đang gửi…");
    try {
      await apiRequest("accessRequestCreate", { subjectIds, accessType: "vip" });
      await refreshAccessState(false);
      state.account.view = "overview";
      render();
      showToast("Đã gửi yêu cầu. Vui lòng chờ Admin duyệt.");
    } catch (err) {
      showToast(friendlyError(err));
    } finally {
      if (state.screen === "account" && state.account.view === "request") setButtonBusy(submit, false);
    }
  }

  async function onAvatarSave() {
    const select = document.getElementById("account-avatar-select");
    const button = document.getElementById("account-avatar-save");
    if (!select || !button) return;
    const avatarEmoji = select.value;
    setButtonBusy(button, true, "Đang lưu…");
    try {
      const data = await apiRequest("avatarUpdate", { avatarEmoji });
      if (data.user) {
        state.auth.user.avatarEmoji = AVATARS.includes(data.user.avatarEmoji) ? data.user.avatarEmoji : "🐰";
        updateAccountButton();
      }
      if (state.screen === "account") render();
      showToast("Đã cập nhật avatar.");
    } catch (err) {
      setButtonBusy(button, false);
      showToast(friendlyError(err));
    }
  }

  async function onNameSave() {
    const input = document.getElementById("account-name-input");
    const button = document.getElementById("account-name-save");
    if (!input || !button) return;
    const name = input.value.trim();
    if (!name) return showToast("Vui lòng nhập họ và tên học sinh.");
    if (name.length > 80) return showToast("Họ và tên tối đa 80 ký tự.");
    if (name === state.auth.user.name) return showToast("Tên hiện tại chưa thay đổi.");

    setButtonBusy(button, true, "Đang lưu…");
    try {
      const data = await apiRequest("profileNameUpdate", { name });
      if (data.user && data.user.userId === state.auth.user.userId) {
        state.auth.user.name = String(data.user.name || name);
        updateAccountButton();
      }
      if (state.screen === "account") render();
      showToast("Đã cập nhật họ tên.");
    } catch (err) {
      setButtonBusy(button, false);
      showToast(friendlyError(err));
    }
  }

  async function onLogout() {
    const button = document.getElementById("account-logout-button");
    if (!state.auth.token) {
      clearAuthState();
      goHome();
      return;
    }
    setButtonBusy(button, true, "Đang đăng xuất…");
    try {
      await apiRequest("logout");
      clearAuthState();
      goHome();
      showToast("Đã đăng xuất.");
    } catch (err) {
      if (err.code === "UNAUTHORIZED") {
        clearAuthState();
        goHome();
        showToast("Phiên đăng nhập đã kết thúc.");
      } else {
        setButtonBusy(button, false);
        showToast("Chưa đăng xuất được. Vui lòng thử lại.");
      }
    }
  }

  function openAdmin() {
    if (!state.auth.user || state.auth.user.role !== "admin") return;
    state.screen = "admin";
    state.homeTab = "class1";
    state.subjectId = null;
    state.detail = null;
    state.admin.loading = true;
    render();
    focusContent();
    loadAdminData();
  }

  async function loadAdminData() {
    if (!state.auth.user || state.auth.user.role !== "admin") return;
    state.admin.loading = true;
    render();
    try {
      const [overviewData, requestData, userData] = await Promise.all([
        apiRequest("adminOverviewGet"),
        apiRequest("adminAccessRequestsList"),
        apiRequest("adminUsersList")
      ]);
      state.admin.overview = overviewData;
      state.admin.requests = Array.isArray(requestData.requests) ? requestData.requests : [];
      state.admin.users = Array.isArray(userData.users) ? userData.users : [];
      state.admin.loaded = true;
    } catch (err) {
      state.admin.loaded = false;
      showToast(friendlyError(err));
      if (err.code === "UNAUTHORIZED" || err.code === "FORBIDDEN") goHome();
    } finally {
      state.admin.loading = false;
      if (state.screen === "admin") render();
    }
  }

  function renderAdmin() {
    if (!state.auth.user || state.auth.user.role !== "admin") {
      goHome();
      return;
    }

    if (state.admin.loading && !state.admin.loaded) {
      el.content.innerHTML = `
        <div class="section-heading"><div><h1>🛡️ Quản trị Lớp 1</h1><p>Đang tải dữ liệu quản trị…</p></div><button id="admin-back" class="back-btn" type="button">← Lớp 1</button></div>
        <div class="empty-panel"><div><span class="inline-spinner" aria-hidden="true"></span><strong>Đang tải…</strong></div></div>`;
      document.getElementById("admin-back")?.addEventListener("click", goHome);
      return;
    }

    const o = state.admin.overview || {};
    const activeAccess = ["toan", "tv", "ta"].reduce((sum, id) => sum + Number(o.subjectAccess && o.subjectAccess[id] ? o.subjectAccess[id].total || 0 : 0), 0);
    const stats = [
      ["👥", "Tài khoản", Number(o.totalUsers || 0)],
      ["🎓", "Học sinh", Number(o.studentUsers || 0)],
      ["🕒", "Chờ duyệt", Number(o.pendingRequests || 0)],
      ["🔑", "Quyền môn hiệu lực", activeAccess]
    ].map(([icon, label, value]) => `<div class="admin-stat"><span>${icon}</span><strong>${escapeHtml(String(value))}</strong><small>${escapeHtml(label)}</small></div>`).join("");

    const requests = state.admin.requests.length
      ? state.admin.requests.map((request) => {
          const subjects = (request.subjectIds || []).map(apiIdToLabel).filter(Boolean).join(", ");
          return `
            <div class="admin-request-card" data-request-id="${escapeHtml(request.requestId)}">
              <div><strong>${escapeHtml(request.userId)} · ${escapeHtml(request.name || "")}</strong><span>${escapeHtml(subjects)} · ${escapeHtml(String(request.accessType || "vip").toUpperCase())} · ${escapeHtml(formatDateTime(request.createdAt) || "")}</span></div>
              <div class="admin-request-actions">
                <button class="mini-action positive" data-request-decision="approve" type="button">Duyệt</button>
                <button class="mini-action danger" data-request-decision="reject" type="button">Từ chối</button>
              </div>
            </div>`;
        }).join("")
      : `<div class="admin-empty">Không có yêu cầu đang chờ.</div>`;

    const query = state.admin.query.trim().toLowerCase();
    const filteredUsers = state.admin.users.filter((user) => {
      if (!query) return true;
      return String(user.userId || "").toLowerCase().includes(query) || String(user.name || "").toLowerCase().includes(query);
    }).slice(0, 100);

    const users = filteredUsers.length
      ? filteredUsers.map(renderAdminUserCard).join("")
      : `<div class="admin-empty">Không tìm thấy tài khoản phù hợp.</div>`;

    el.content.innerHTML = `
      <div class="section-heading">
        <div><h1>🛡️ Quản trị Lớp 1</h1><p>Quản lý tài khoản, quyền môn và yêu cầu đăng ký.</p></div>
        <button id="admin-back" class="back-btn" type="button">← Lớp 1</button>
      </div>
      <section class="admin-stat-grid">${stats}</section>
      <section class="admin-section">
        <div class="admin-section-head"><div><h2>Yêu cầu quyền học</h2><p>Duyệt đúng môn được yêu cầu.</p></div><button id="admin-refresh" class="mini-action" type="button">Làm mới</button></div>
        <div class="admin-request-list">${requests}</div>
      </section>
      <section class="admin-section">
        <div class="admin-section-head"><div><h2>Tài khoản</h2><p>Hiển thị tối đa 100 kết quả theo bộ lọc.</p></div></div>
        <div class="admin-search"><input id="admin-search-input" type="search" autocomplete="off" placeholder="Tìm theo ID hoặc tên" value="${escapeHtml(state.admin.query)}"></div>
        <div class="admin-user-list">${users}</div>
      </section>`;

    document.getElementById("admin-back")?.addEventListener("click", goHome);
    document.getElementById("admin-refresh")?.addEventListener("click", loadAdminData);
    const search = document.getElementById("admin-search-input");
    search?.addEventListener("input", () => {
      state.admin.query = search.value;
      renderAdmin();
      const next = document.getElementById("admin-search-input");
      if (next) {
        next.focus();
        next.setSelectionRange(next.value.length, next.value.length);
      }
    });

    el.content.querySelectorAll("[data-request-decision]").forEach((button) => {
      button.addEventListener("click", () => {
        const card = button.closest("[data-request-id]");
        resolveAccessRequest(card?.dataset.requestId || "", button.dataset.requestDecision, button);
      });
    });

    el.content.querySelectorAll("[data-save-access]").forEach((button) => {
      button.addEventListener("click", () => saveAdminAccess(button));
    });
    el.content.querySelectorAll("[data-reset-password]").forEach((button) => {
      button.addEventListener("click", () => resetAdminPassword(button));
    });
  }

  function renderAdminUserCard(user) {
    const role = String(user.role || "student");
    const access = normalizeAccess(user.access || {});
    const controls = role === "admin"
      ? `<div class="admin-note">Tài khoản Admin được kiểm tra quyền tươi phía server.</div>`
      : `<div class="admin-user-controls">
          ${SUBJECTS.map((subject) => {
            const type = access[subject.id]?.type || "regular";
            return `<div class="admin-access-control">
              <label>${escapeHtml(subject.label)}</label>
              <select data-access-select="${subject.apiId}">
                <option value="regular"${type === "regular" ? " selected" : ""}>Regular</option>
                <option value="trial"${type === "trial" ? " selected" : ""}>Trial</option>
                <option value="vip"${type === "vip" ? " selected" : ""}>VIP</option>
              </select>
              <button class="mini-action" type="button" data-save-access="${subject.apiId}" data-user-id="${escapeHtml(user.userId)}">Lưu</button>
            </div>`;
          }).join("")}
          <div class="admin-reset-control">
            <label>Mật khẩu mới</label>
            <input type="password" minlength="6" maxlength="128" autocomplete="new-password" data-reset-input="${escapeHtml(user.userId)}" placeholder="Tối thiểu 6 ký tự">
            <button class="mini-action" type="button" data-reset-password="1" data-user-id="${escapeHtml(user.userId)}">Reset</button>
          </div>
        </div>`;

    return `
      <article class="admin-user-card" data-user-card="${escapeHtml(user.userId)}">
        <div class="admin-user-head">
          <div><strong>${escapeHtml(user.avatarEmoji || "🐰")} ${escapeHtml(user.userId)} · ${escapeHtml(user.name || "")}</strong><span>${role === "admin" ? "Admin" : "Student"}${user.lastLearningAt ? ` · Học gần nhất ${escapeHtml(formatDate(user.lastLearningAt))}` : ""}</span></div>
          <span class="access-chip access-${role === "admin" ? "admin" : "regular"}">${role === "admin" ? "Admin" : "Student"}</span>
        </div>
        ${controls}
      </article>`;
  }

  async function resolveAccessRequest(requestId, decision, button) {
    if (!requestId || !["approve", "reject"].includes(decision)) return;
    const label = decision === "approve" ? "Đang duyệt…" : "Đang từ chối…";
    setButtonBusy(button, true, label);
    try {
      const data = await apiRequest("adminAccessRequestResolve", { requestId, decision });
      if (data.orphaned) showToast("Tài khoản đã bị xóa; yêu cầu đã được đóng.");
      else showToast(decision === "approve" ? "Đã duyệt yêu cầu." : "Đã từ chối yêu cầu.");
      await loadAdminData();
    } catch (err) {
      setButtonBusy(button, false);
      showToast(friendlyError(err));
    }
  }

  async function saveAdminAccess(button) {
    const card = button.closest("[data-user-card]");
    const userId = button.dataset.userId || card?.dataset.userCard || "";
    const subjectId = button.dataset.saveAccess || "";
    const select = card?.querySelector(`[data-access-select="${subjectId}"]`);
    if (!userId || !subjectId || !select) return;
    setButtonBusy(button, true, "Đang lưu…");
    try {
      await apiRequest("adminSetSubjectAccess", { userId, subjectId, accessType: select.value });
      showToast("Đã cập nhật quyền môn.");
      await loadAdminData();
    } catch (err) {
      setButtonBusy(button, false);
      showToast(friendlyError(err));
    }
  }

  async function resetAdminPassword(button) {
    const card = button.closest("[data-user-card]");
    const userId = button.dataset.userId || "";
    const input = card?.querySelector(`[data-reset-input="${cssEscape(userId)}"]`);
    const newPassword = input ? input.value : "";
    if (newPassword.length < 6 || newPassword.length > 128) return showToast("Mật khẩu mới cần từ 6 đến 128 ký tự.");

    setButtonBusy(button, true, "Đang reset…");
    try {
      await apiRequest("adminResetPassword", { userId, newPassword });
      if (input) input.value = "";
      showToast("Đã reset mật khẩu và thu hồi các phiên cũ của tài khoản.");
    } catch (err) {
      setButtonBusy(button, false);
      showToast(friendlyError(err));
    }
  }

  function setButtonBusy(button, busy, label) {
    if (!button) return;
    if (busy) {
      if (!button.dataset.originalLabel) button.dataset.originalLabel = button.textContent;
      button.disabled = true;
      button.replaceChildren();
      const spinner = document.createElement("span");
      spinner.className = "spinner";
      spinner.setAttribute("aria-hidden", "true");
      const text = document.createElement("span");
      text.textContent = label;
      button.append(spinner, text);
    } else {
      button.disabled = false;
      button.textContent = button.dataset.originalLabel || "OK";
      delete button.dataset.originalLabel;
    }
  }

  function showDialog(options) {
    const opts = typeof options === "string" ? { title: options } : (options || {});
    el.dialogTitle.textContent = opts.title || "Thông báo";
    el.dialogMessage.textContent = opts.message || "";
    el.dialogIcon.textContent = opts.icon || "🐰";
    el.dialogOk.textContent = opts.primaryLabel || "OK";
    dialogPrimaryHandler = typeof opts.onPrimary === "function" ? opts.onPrimary : null;
    dialogSecondaryHandler = typeof opts.onSecondary === "function" ? opts.onSecondary : null;

    const hasSecondary = !!opts.secondaryLabel;
    el.dialogSecondary.classList.toggle("hidden", !hasSecondary);
    el.dialogSecondary.textContent = opts.secondaryLabel || "";
    el.dialog.classList.remove("hidden");
  }

  function hideDialog() {
    el.dialog.classList.add("hidden");
    dialogPrimaryHandler = null;
    dialogSecondaryHandler = null;
  }

  function showToast(message) {
    window.clearTimeout(toastTimer);
    el.toast.textContent = message;
    el.toast.classList.add("is-visible");
    toastTimer = window.setTimeout(() => el.toast.classList.remove("is-visible"), 2600);
  }

  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (_) {
      return false;
    }
  }

  function focusContent() {
    window.requestAnimationFrame(() => {
      el.content.focus({ preventScroll: true });
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  function getInstallEnvironment() {
    const ua = navigator.userAgent || "";
    const isIOS = /iphone|ipad|ipod/i.test(ua);
    const isMac = /macintosh|mac os x/i.test(ua);
    const isWindows = /windows/i.test(ua);
    const isFirefox = /firefox\//i.test(ua);
    const isEdge = /edg\//i.test(ua);
    const isChromium = /chrome|chromium|crios/i.test(ua) || isEdge;
    const isSafari = /safari/i.test(ua) && !/chrome|chromium|crios|edg|opr|firefox/i.test(ua);
    return { isIOS, isMac, isWindows, isFirefox, isEdge, isChromium, isSafari };
  }

  function isStandalonePwa() {
    return window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;
  }

  function readInstallFlag() {
    try { return localStorage.getItem(INSTALL_FLAG_KEY) === "1"; }
    catch (_) { return false; }
  }

  function writeInstallFlag(installed) {
    try {
      if (installed) localStorage.setItem(INSTALL_FLAG_KEY, "1");
      else localStorage.removeItem(INSTALL_FLAG_KEY);
    } catch (_) {}
  }

  async function detectInstalledPwa() {
    if (isStandalonePwa()) {
      writeInstallFlag(true);
      return true;
    }

    // Chrome/Edge mới có thể xác định PWA cùng origin đã được cài, kể cả khi
    // người dùng đang mở website trong tab trình duyệt thay vì cửa sổ app.
    if (typeof navigator.getInstalledRelatedApps === "function") {
      try {
        const related = await navigator.getInstalledRelatedApps();
        const installed = Array.isArray(related) && related.some((app) => app && app.platform === "webapp");
        writeInstallFlag(installed);
        return installed;
      } catch (_) {
        // Trình duyệt/nguồn hiện tại không hỗ trợ kiểm tra; dùng cờ local làm fallback UX.
      }
    }

    return readInstallFlag();
  }

  async function handleInstall() {
    if (await detectInstalledPwa()) {
      showToast("Lớp 1 đã được cài trên thiết bị này.");
      updateInstallVisibility();
      return;
    }

    if (typeof navigator.install === "function") {
      try {
        await navigator.install();
        writeInstallFlag(true);
        showToast("Đang mở trình cài Lớp 1…");
      } catch (_) {}
      updateInstallVisibility();
      return;
    }

    if (state.installPrompt) {
      const promptEvent = state.installPrompt;
      state.installPrompt = null;
      window.__class1InstallPrompt = null;
      try {
        await promptEvent.prompt();
        const choice = await promptEvent.userChoice.catch(() => null);
        if (choice && choice.outcome === "accepted") {
          writeInstallFlag(true);
          showToast("Đang cài Lớp 1…");
        }
      } catch (_) {}
      updateInstallVisibility();
      return;
    }

    const env = getInstallEnvironment();
    if (env.isIOS) {
      showDialog({ title: "Cài App", message: "Mở menu Chia sẻ của trình duyệt, chọn “Thêm vào Màn hình chính”, rồi xác nhận để cài Lớp 1.", icon: "📱" });
      return;
    }
    if (env.isFirefox && env.isWindows) {
      showDialog({ title: "Cài App", message: "Trên Firefox Windows, hãy dùng chức năng cài ứng dụng web của trình duyệt nếu được hỗ trợ.", icon: "🖥️" });
      return;
    }
    if (env.isSafari && env.isMac) {
      showDialog({ title: "Cài App", message: "Trên Safari, chọn Tệp (File) → Thêm vào Dock (Add to Dock), rồi xác nhận để cài Lớp 1.", icon: "🖥️" });
      return;
    }
    if (env.isChromium) {
      showDialog({ title: "Cài App", message: "Chrome chưa cấp hộp cài trực tiếp cho phiên này. Hãy dùng biểu tượng cài trên thanh địa chỉ hoặc mục cài ứng dụng trong menu Chrome.", icon: "🖥️" });
      return;
    }
    showDialog({ title: "Cài App", message: "Trình duyệt này chưa hỗ trợ mở hộp cài trực tiếp. Hãy dùng chức năng thêm trang web thành ứng dụng của trình duyệt.", icon: "📲" });
  }

  async function updateInstallVisibility() {
    // Nút mặc định ẩn trong HTML. Với Chromium desktop, chỉ hiện khi chính
    // trình duyệt phát beforeinstallprompt (nghĩa là app đang thực sự có thể cài).
    // Sau khi đã cài, Chrome không phát lại sự kiện này ở lần tải trang kế tiếp,
    // nên nút tự ẩn kể cả khi website được mở trong tab Chrome bình thường.
    const installed = await detectInstalledPwa();
    if (installed) {
      el.installButton.classList.add("hidden");
      return;
    }

    const env = getInstallEnvironment();
    if (env.isChromium) {
      el.installButton.classList.toggle("hidden", !state.installPrompt);
      return;
    }

    // iOS/Safari/Firefox không dùng beforeinstallprompt ổn định; vẫn giữ nút
    // để mở hướng dẫn cài thủ công theo đúng đặc tả.
    el.installButton.classList.remove("hidden");
  }

  function formatDate(value) {
    if (!value) return "";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    return new Intl.DateTimeFormat("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" }).format(date);
  }

  function formatDateTime(value) {
    if (!value) return "";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    return new Intl.DateTimeFormat("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" }).format(date);
  }

  function cssEscape(value) {
    if (window.CSS && typeof window.CSS.escape === "function") return window.CSS.escape(String(value));
    return String(value).replace(/[^A-Za-z0-9_-]/g, "\\$&");
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  el.homeButton.addEventListener("click", goHome);
  el.accountButton.addEventListener("click", () => state.auth.user ? openAccountPage() : openAuth("login"));
  el.authClose.addEventListener("click", closeAuth);
  el.authLater.addEventListener("click", closeAuth);
  el.authTabLogin.addEventListener("click", () => switchAuthView("login"));
  el.authTabRegister.addEventListener("click", () => switchAuthView("register"));
  el.loginForm.addEventListener("submit", onLoginSubmit);
  el.registerForm.addEventListener("submit", onRegisterSubmit);
  el.installButton.addEventListener("click", handleInstall);

  el.dialogOk.addEventListener("click", () => {
    const handler = dialogPrimaryHandler;
    hideDialog();
    if (handler) handler();
  });
  el.dialogSecondary.addEventListener("click", async () => {
    const handler = dialogSecondaryHandler;
    if (handler) await handler();
  });

  el.authModal.addEventListener("click", (event) => {
    if (event.target === el.authModal) closeAuth();
  });
  el.dialog.addEventListener("click", (event) => {
    if (event.target === el.dialog) hideDialog();
  });

  window.addEventListener("class1-install-ready", () => {
    if (window.__class1InstallPrompt) {
      state.installPrompt = window.__class1InstallPrompt;
      updateInstallVisibility();
    }
  });

  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    // Nếu sự kiện này xuất hiện thì trình duyệt đang coi app là chưa cài.
    writeInstallFlag(false);
    state.installPrompt = event;
    window.__class1InstallPrompt = event;
    updateInstallVisibility();
  });

  window.addEventListener("appinstalled", () => {
    writeInstallFlag(true);
    state.installPrompt = null;
    window.__class1InstallPrompt = null;
    updateInstallVisibility();
    showToast("Đã cài App.");
  });

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("./service-worker.js", { updateViaCache: "none" })
        .then((registration) => registration.update().catch(() => {}))
        .catch(() => {});
    });
  }

  updateInstallVisibility();
  updateAccountButton(true);
  render();
  bootstrapAuth();
})();

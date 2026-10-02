(() => {
  "use strict";

  const API_URL = "https://script.google.com/macros/s/AKfycbx74jCwq-XWlHDQWP-EMWd_Jqfbgd8AwflgpSY_vVCu5eI-ShWh7AXgX-Sl3aL0XTs2og/exec";

  // BẢN KHUNG GIAO DIỆN LỚP 1
  // Chưa kết nối học liệu, tiến độ, quyền học hoặc backend tài khoản.
  // Không lưu mật khẩu / role / quyền trên trình duyệt.

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
      label: "Toán",
      fullLabel: "Toán 1",
      icon: "🧮",
      tone: "blue",
      description: "Không gian học Toán của bé."
    },
    {
      id: "vietnamese",
      label: "Tiếng Việt",
      fullLabel: "Tiếng Việt 1",
      icon: "📚",
      tone: "pink",
      description: "Không gian học Tiếng Việt của bé."
    },
    {
      id: "english",
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

  const PREVIEW_TONES = ["pink", "purple", "blue", "green", "teal", "amber"];

  const state = {
    screen: "home",
    homeTab: "class1",
    subjectId: null,
    subjectTab: "discover",
    profileSubjectId: null,
    detail: null,
    installPrompt: null
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
    toast: document.getElementById("toast")
  };

  function currentSubject() {
    return SUBJECTS.find((item) => item.id === state.subjectId) || SUBJECTS[0];
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
    const subject = SUBJECTS.find((item) => item.id === subjectId);
    if (!subject) return;
    state.screen = "subject";
    state.subjectId = subject.id;
    state.subjectTab = "discover";
    state.profileSubjectId = null;
    state.detail = null;
    render();
    focusContent();
  }

  function openLearningProfile(subjectId) {
    const subject = SUBJECTS.find((item) => item.id === subjectId);
    if (!subject) return;
    state.screen = "profile";
    state.homeTab = "class1";
    state.subjectId = null;
    state.profileSubjectId = subject.id;
    state.detail = null;
    render();
    focusContent();
  }

  function openSubjectTab(tabId) {
    if (!SUBJECT_TABS.some((t) => t.id === tabId)) return;
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
  }

  function renderNav() {
    const tabs = state.screen === "subject" ? SUBJECT_TABS : HOME_TABS;
    el.nav.innerHTML = "";

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

      button.innerHTML = `<span class="tab-icon" aria-hidden="true">${tab.icon}</span><span>${escapeHtml(displayLabel)}</span>`;

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

    if (detailMode) {
      el.subPill.textContent = `🌸 ${state.detail.title}`;
    }
  }

  function renderContent() {
    if (state.screen === "home") {
      renderHomeContent();
      return;
    }

    if (state.screen === "profile") {
      renderLearningProfile();
      return;
    }

    if (state.detail) {
      renderDetailContent();
      return;
    }

    renderSubjectContent();
  }

  function renderHomeContent() {
    switch (state.homeTab) {
      case "epsilon":
        renderEpsilonTab();
        break;
      case "games":
        renderEmptyHomeTab("🎮", "Games", "Khu Games của Trang chủ sẽ được bổ sung ở bước nội dung.");
        break;
      case "tools":
        renderEmptyHomeTab("🧰", "Tools", "Khu công cụ sẽ được bổ sung sau khi anh chốt danh sách chức năng.");
        break;
      case "contact":
        renderContactTab();
        break;
      case "class1":
      default:
        renderClass1Tab();
        break;
    }
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
            <span class="badge">Vào môn học</span>
            <span class="arrow"><span>→</span></span>
          </div>
        </button>

        <button class="subject-profile-card" data-tone="${subject.tone}" data-profile-subject="${subject.id}" type="button" aria-label="Mở Hồ sơ học tập ${escapeHtml(subject.fullLabel)}">
          <span class="subject-profile-icon" aria-hidden="true">📊</span>
          <span class="subject-profile-copy">
            <span class="subject-profile-title">Hồ sơ học tập</span>
            <span class="subject-profile-note">Chưa đủ dữ liệu</span>
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
    const subject = SUBJECTS.find((item) => item.id === state.profileSubjectId) || SUBJECTS[0];

    el.content.innerHTML = `
      <div class="section-heading">
        <div>
          <h1>📊 Hồ sơ học tập · ${escapeHtml(subject.fullLabel)}</h1>
          <p>Theo dõi quá trình luyện tập và mức độ tự học của bé.</p>
        </div>
        <button id="profile-back-button" class="back-btn" type="button">← Lớp 1</button>
      </div>

      <section class="learning-profile-grid" aria-label="Tổng quan Hồ sơ học tập ${escapeHtml(subject.fullLabel)}">
        <div class="learning-profile-stat"><div class="stat-icon">🎯</div><strong>Đã luyện</strong><span>Chưa đủ dữ liệu</span></div>
        <div class="learning-profile-stat"><div class="stat-icon">🌟</div><strong>Đang làm tốt</strong><span>Chưa đủ dữ liệu</span></div>
        <div class="learning-profile-stat"><div class="stat-icon">🌱</div><strong>Cần luyện thêm</strong><span>Chưa đủ dữ liệu</span></div>
        <div class="learning-profile-stat"><div class="stat-icon">🧠</div><strong>Mức tự học</strong><span>Chưa đủ dữ liệu</span></div>
      </section>

      <div class="learning-profile-empty">
        <strong>🐰 Cô Thỏ Hồng đang chờ thêm dữ liệu học tập</strong>
        Khi bé bắt đầu luyện tập, hồ sơ sẽ dần cho biết phần bé đang làm tốt, phần cần ôn lại và mức độ tự làm của bé.
      </div>
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
      <div class="section-heading">
        <div>
          <h1>🌐 Epsilon Edu</h1>
          <p>Danh mục website Lớp 1 đến Lớp 9.</p>
        </div>
      </div>
      <section class="home-link-grid" aria-label="Danh sách lớp">${cards}</section>
    `;

    el.content.querySelectorAll("[data-grade]").forEach((card) => {
      card.addEventListener("click", () => {
        const grade = Number(card.dataset.grade);
        if (grade === 1) {
          openHomeTab("class1");
          return;
        }
        showToast(`Liên kết Lớp ${grade} sẽ được gắn khi anh cung cấp URL.`);
      });
    });
  }

  function renderEmptyHomeTab(icon, title, message) {
    el.content.innerHTML = `
      <div class="section-heading">
        <div>
          <h1>${icon} ${escapeHtml(title)}</h1>
          <p>Khung giao diện đã sẵn sàng.</p>
        </div>
      </div>
      <div class="empty-panel">
        <div><strong>Chưa có nội dung</strong>${escapeHtml(message)}</div>
      </div>
    `;
  }

  function renderContactTab() {
    el.content.innerHTML = `
      <div class="section-heading">
        <div>
          <h1>💌 Liên hệ</h1>
          <p>Khung giới thiệu và thông tin liên hệ của chương trình.</p>
        </div>
      </div>
      <section class="subject-grid">
        <div class="content-card subject-card" data-tone="purple">
          <div class="card-top">
            <span class="card-icon">🌱</span>
            <div class="card-copy">
              <h2 class="card-title">Giới thiệu chương trình</h2>
              <p class="card-desc">Nội dung giới thiệu sẽ được bổ sung ở bước nội dung.</p>
            </div>
          </div>
        </div>
        <div class="content-card subject-card" data-tone="blue">
          <div class="card-top">
            <span class="card-icon">📞</span>
            <div class="card-copy">
              <h2 class="card-title">Thông tin liên hệ</h2>
              <p class="card-desc">Thông tin liên hệ chi tiết sẽ được chốt sau.</p>
            </div>
          </div>
        </div>
        <div class="content-card subject-card" data-tone="green">
          <div class="card-top">
            <span class="card-icon">🐰</span>
            <div class="card-copy">
              <h2 class="card-title">Cô Thỏ Hồng</h2>
              <p class="card-desc">Mascot đồng hành cùng bé trong toàn bộ Lớp 1.</p>
            </div>
          </div>
        </div>
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
          <div class="card-foot">
            <span class="badge">${escapeHtml(meta.badge)}</span>
            <span class="arrow"><span>→</span></span>
          </div>
        </button>
      `;
    }).join("");

    const heading = state.subjectTab === "discover"
      ? `${subject.icon} ${subject.fullLabel}`
      : `${tab.icon} ${tab.label} · ${subject.fullLabel}`;

    el.content.innerHTML = `
      <div class="section-heading">
        <div>
          <h1>${heading}</h1>
          <p>Đây là khung hiển thị; học liệu thật sẽ nạp ở bước sau.</p>
        </div>
      </div>
      <section class="card-grid" aria-label="${escapeHtml(tab.label)}">${cards}</section>
    `;

    el.content.querySelectorAll("[data-preview-index]").forEach((card) => {
      card.addEventListener("click", () => openDetail(Number(card.dataset.previewIndex)));
    });
  }

  function previewMeta(tabId, index) {
    const n = index + 1;
    if (tabId === "games") {
      return { icon: "🎮", title: `Game ${n}`, description: "Nội dung game sẽ bổ sung sau.", badge: "Mẫu giao diện" };
    }
    if (tabId === "exams") {
      const names = ["Học kỳ I", "Học kỳ II", "Học sinh giỏi"];
      return { icon: "🏆", title: names[index % 3], description: "Bộ đề sẽ bổ sung sau.", badge: "Chưa có dữ liệu" };
    }
    if (tabId === "lessons") {
      return { icon: "📖", title: `Bài học ${n}`, description: "Học liệu sẽ bổ sung sau.", badge: "Mẫu giao diện" };
    }
    if (tabId === "exercises") {
      return { icon: "✏️", title: `Bài tập ${n}`, description: "Bộ 20 câu sẽ bổ sung sau.", badge: "Mẫu giao diện" };
    }
    if (tabId === "review") {
      return { icon: "🧠", title: `Ôn tập ${n}`, description: "Nội dung sẽ bổ sung sau.", badge: "Mẫu giao diện" };
    }
    return { icon: "🌟", title: `Mục khám phá ${n}`, description: "Học liệu sẽ bổ sung sau.", badge: "Mẫu giao diện" };
  }

  function renderDetailContent() {
    const subject = currentSubject();
    el.content.innerHTML = `
      <div class="section-heading">
        <div>
          <h1>${subject.icon} ${escapeHtml(state.detail.title)}</h1>
          <p>${escapeHtml(subject.fullLabel)} · ${escapeHtml(state.detail.tabLabel)}</p>
        </div>
        <button id="back-to-list" class="back-btn" type="button">← Quay lại</button>
      </div>
      <div class="detail-panel">
        <div class="empty-panel">
          <div>
            <strong>Khung mục học đã sẵn sàng</strong>
            Học liệu, bài giảng và tương tác sẽ được bổ sung ở bước tiếp theo.
          </div>
        </div>
      </div>
    `;
    document.getElementById("back-to-list").addEventListener("click", () => {
      state.detail = null;
      render();
      focusContent();
    });
  }

  function focusContent() {
    window.requestAnimationFrame(() => {
      el.content.focus({ preventScroll: true });
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  function openAuth(mode = "login") {
    switchAuthTab(mode);
    el.authModal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
    window.setTimeout(() => {
      const target = mode === "register"
        ? document.getElementById("register-name")
        : document.getElementById("login-id");
      target?.focus();
    }, 50);
  }

  function closeAuth() {
    el.authModal.classList.add("hidden");
    document.body.style.overflow = "";
  }

  function switchAuthTab(mode) {
    const register = mode === "register";
    el.authTabLogin.classList.toggle("is-active", !register);
    el.authTabRegister.classList.toggle("is-active", register);
    el.loginForm.classList.toggle("hidden", register);
    el.registerForm.classList.toggle("hidden", !register);
  }

  function setButtonBusy(button, busy, label) {
    if (!button) return;
    if (busy) {
      button.dataset.originalLabel = button.textContent;
      button.disabled = true;
      button.innerHTML = `<span class="spinner" aria-hidden="true"></span><span>${escapeHtml(label)}</span>`;
    } else {
      button.disabled = false;
      button.textContent = button.dataset.originalLabel || "OK";
    }
  }

  function showDialog(title, message, icon = "🐰") {
    el.dialogTitle.textContent = title;
    el.dialogMessage.textContent = message;
    el.dialogIcon.textContent = icon;
    el.dialog.classList.remove("hidden");
  }

  function hideDialog() {
    el.dialog.classList.add("hidden");
  }

  let toastTimer = 0;
  function showToast(message) {
    window.clearTimeout(toastTimer);
    el.toast.textContent = message;
    el.toast.classList.add("is-visible");
    toastTimer = window.setTimeout(() => el.toast.classList.remove("is-visible"), 2300);
  }

  function validateRegistration() {
    const name = document.getElementById("register-name").value.trim();
    const password = document.getElementById("register-password").value;
    const confirm = document.getElementById("register-confirm").value;

    if (!name) return "Vui lòng nhập họ và tên học sinh.";
    if (password.length < 6) return "Mật khẩu cần tối thiểu 6 ký tự.";
    if (password !== confirm) return "Hai lần nhập mật khẩu chưa trùng nhau.";
    return "";
  }

  function onLoginSubmit(event) {
    event.preventDefault();
    const id = document.getElementById("login-id").value.trim();
    const password = document.getElementById("login-password").value;
    if (!id || !password) {
      showToast("Vui lòng nhập ID và mật khẩu.");
      return;
    }

    setButtonBusy(el.loginSubmit, true, "Đang đăng nhập…");
    window.setTimeout(() => {
      setButtonBusy(el.loginSubmit, false);
      showDialog(
        "Bản khung giao diện",
        "Phần đăng nhập chưa kết nối backend ở bước này.\nEm chỉ dựng UI để anh duyệt khung chương trình.",
        "🔐"
      );
    }, 700);
  }

  function onRegisterSubmit(event) {
    event.preventDefault();
    const error = validateRegistration();
    if (error) {
      showToast(error);
      return;
    }

    setButtonBusy(el.registerSubmit, true, "Đang xác thực đăng ký…");
    window.setTimeout(() => {
      setButtonBusy(el.registerSubmit, false);
      showDialog(
        "Luồng đăng ký đã dựng",
        "Bản này mới là UI nên chưa tạo tài khoản thật.\nKhi nối backend, hệ thống sẽ cấp ID dạng L1-A001 và hiển thị ngay sau khi ghi thành công.",
        "🎉"
      );
    }, 850);
  }

  async function handleInstall() {
    if (state.installPrompt) {
      state.installPrompt.prompt();
      await state.installPrompt.userChoice.catch(() => null);
      state.installPrompt = null;
      updateInstallVisibility();
      return;
    }

    const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
    if (isIOS) {
      showDialog(
        "Cài App trên iPhone/iPad",
        "Mở nút Chia sẻ của Safari, chọn “Thêm vào Màn hình chính”, rồi xác nhận.",
        "📱"
      );
      return;
    }

    showDialog(
      "Cài App",
      "Trình duyệt chưa cung cấp hộp cài tự động. Anh có thể dùng menu của trình duyệt để thêm ứng dụng vào màn hình chính.",
      "📲"
    );
  }

  function updateInstallVisibility() {
    const standalone = window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;
    const outsideHome = state.screen !== "home";
    el.installButton.classList.toggle("hidden", standalone || outsideHome);
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  el.homeButton.addEventListener("click", goHome);
  el.accountButton.addEventListener("click", () => openAuth("login"));
  el.authClose.addEventListener("click", closeAuth);
  el.authLater.addEventListener("click", closeAuth);
  el.authTabLogin.addEventListener("click", () => switchAuthTab("login"));
  el.authTabRegister.addEventListener("click", () => switchAuthTab("register"));
  el.loginForm.addEventListener("submit", onLoginSubmit);
  el.registerForm.addEventListener("submit", onRegisterSubmit);
  el.dialogOk.addEventListener("click", hideDialog);
  el.installButton.addEventListener("click", handleInstall);

  el.authModal.addEventListener("click", (event) => {
    if (event.target === el.authModal) closeAuth();
  });
  el.dialog.addEventListener("click", (event) => {
    if (event.target === el.dialog) hideDialog();
  });

  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    state.installPrompt = event;
    updateInstallVisibility();
  });

  window.addEventListener("appinstalled", () => {
    state.installPrompt = null;
    updateInstallVisibility();
    showToast("Đã cài App.");
  });

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("./service-worker.js").catch(() => {});
    });
  }

  updateInstallVisibility();
  render();
})();

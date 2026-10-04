(() => {
  "use strict";

  window.CLASS1_DATA = Object.freeze({
    API_URL: "https://script.google.com/macros/s/AKfycbx74jCwq-XWlHDQWP-EMWd_Jqfbgd8AwflgpSY_vVCu5eI-ShWh7AXgX-Sl3aL0XTs2og/exec",
    TOKEN_STORAGE_KEY: "epsilon_class1_session_v1",
    API_TIMEOUT_MS: 60000,
    INSTALL_FLAG_KEY: "epsilon_class1_pwa_installed_v1",

    HOME_TABS: [
      { id: "class1", label: "Lớp 1", icon: "🎒", tone: "purple" },
      { id: "epsilon", label: "Epsilon Edu", icon: "🌐", tone: "pink" },
      { id: "games", label: "Games", icon: "🎮", tone: "blue" },
      { id: "tools", label: "Tools", icon: "🧰", tone: "green" },
      { id: "contact", label: "Liên hệ", icon: "💌", tone: "amber" }
    ],

    ADMIN_HOME_TAB: { id: "admin", label: "Quản lý", icon: "🛠️", tone: "indigo" },

    SUBJECTS: [
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
    ],

    SUBJECT_TABS: [
      { id: "discover", label: "Khám phá", icon: "🧭", tone: "purple" },
      { id: "lessons", label: "Bài học", icon: "📖", tone: "pink" },
      { id: "exercises", label: "Bài tập", icon: "✏️", tone: "blue" },
      { id: "review", label: "Ôn tập", icon: "🧠", tone: "amber" },
      { id: "exams", label: "Đề thi", icon: "🏆", tone: "green" },
      { id: "games", label: "Mini games", icon: "🎮", tone: "indigo" }
    ],

    AVATARS: [
      "🐰","🐼","🐯","🦊","🐨","🐸","🐧","🦁","🐱","🐶","🐵","🦄",
      "🐹","🐭","🐻","🐮","🐷","🐔","🐤","🦆","🦉","🐺","🐴","🦓",
      "🦒","🐘","🦏","🦛","🐢","🐬","🐠","🐡","🐙","🦀","🦋","🐝",
      "🐞","🐌","🌟","⭐","🚀","🛸","🎨","📚","⚽","🏀","🏸","🎵",
      "🎧","🌈","🍀","🌻","🌸","🌺","🍎","🍓","🍉","🍒","🧁","🍦",
      "🎈","🎁","👑","💎","🧩","🎯","🏆","🪁","🛼","🚲","⛵","🌞"
    ],

    PREVIEW_TONES: ["pink", "purple", "blue", "green", "teal", "amber"],

    EE_CLASS_SITES: Object.freeze({
      1: "https://epsilon-class-1.pages.dev/",
      2: "https://epsilon-class-2.pages.dev/",
      3: "https://epsilon-class-3.pages.dev/"
    })
  });
})();

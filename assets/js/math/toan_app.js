(() => {
"use strict";
let mathModuleCtx_ = null;
let mathModuleRoot_ = null;
let mathModuleMounted_ = false;
let mathModuleDestroyed_ = false;
let mathModuleAudioPrimed_ = false;
let mathModuleLastTab_ = '';
const MATH_MODULE_STYLE_ID_ = 'class1-math-standalone-style';
const MATH_MODULE_RUNTIME_ID_ = 'class1-math-runtime';
// ==========================================
// CẤU HÌNH 12 MỤC KHÁM PHÁ & MA TRẬN NĂNG LỰC TOAN_C1-C6 (TOÁN LỚP 1)
// ==========================================
const TOPICS_CONFIG = [
    { id: 1, title: "1. Các số đến 10", desc: "Đọc, viết, đếm và so sánh số 0-10", icon: "🔢", color: "pink" },
    { id: 2, title: "2. Phép cộng và phép trừ", desc: "Tách - gộp và thực hiện phép cộng, phép trừ", icon: "➕", color: "purple" },
    { id: 3, title: "3. Các số trong phạm vi 100", desc: "Đọc, viết, cấu tạo, so sánh, sắp xếp và đặc điểm số đến 100", icon: "💯", color: "indigo" },
    { id: 4, title: "4. Dãy số và quy luật", desc: "Liền trước - liền sau, số còn thiếu và quy luật dãy số", icon: "🔗", color: "cyan" },
    { id: 5, title: "5. Hình học", desc: "Nhận biết hình phẳng, hình khối, lắp ghép và đếm hình", icon: "📐", color: "amber" },
    { id: 6, title: "6. Vị trí và không gian", desc: "Trên - dưới, trước - sau, trái - phải, thứ tự, các mặt của khối và tổng hợp", icon: "🧭", color: "violet" },
    { id: 7, title: "7. Độ dài và đo độ dài", desc: "Dài - ngắn, cao - thấp, gang tay - sải tay - bước chân, xăng-ti-mét, ước lượng và đo", icon: "📏", color: "emerald" },
    { id: 8, title: "8. Thời gian, giờ và lịch", desc: "Xem giờ đúng, sinh hoạt theo giờ, ngày trong tuần, hôm qua - hôm nay - ngày mai và đọc lịch hoạt động", icon: "⏰", color: "blue" },
    { id: 9, title: "9. Giải toán bằng câu chuyện", desc: "Hiểu tình huống → chọn phép tính → trả lời bài toán bằng tranh", icon: "📝", color: "rose" },
    { id: 10, title: "10. Toán tư duy nâng cao", desc: "Tìm số bí mật • Chuỗi số • Chữ số • Ô số • Hình học tư duy • Bài toán quan hệ", icon: "🧠", color: "yellow" },
    { id: 11, title: "11. Xưởng thử thách Toán", desc: "Thám tử Toán • Manh mối • Đúng sai • Tuổi - ngày - giờ • Puzzle tổng hợp", icon: "🕵️", color: "purple" },
    { id: 12, title: "12. Math Lab - Toán tư duy Mỹ", desc: "Khám phá • Mô hình • Nhiều cách giải", icon: "✨", color: "fuchsia", engine: "epsilon-method" },
    { id: 13, title: "Ôn tập", desc: "Ôn tập theo học kỳ và tổng ôn cuối năm", icon: "📚", color: "purple", hidden: true, internalRole: "review" }
];

const SUBTOPIC_PALETTES = [
    { card: "bg-pink-50/80 hover:bg-pink-100 border-pink-300 text-pink-800", num: "text-pink-600", badge: "bg-white text-pink-600 border-pink-200" },
    { card: "bg-emerald-50/80 hover:bg-emerald-100 border-emerald-300 text-emerald-800", num: "text-emerald-600", badge: "bg-white text-emerald-600 border-emerald-200" },
    { card: "bg-purple-50/80 hover:bg-purple-100 border-purple-300 text-purple-800", num: "text-purple-600", badge: "bg-white text-purple-600 border-purple-200" },
    { card: "bg-amber-50/80 hover:bg-amber-100 border-amber-300 text-amber-800", num: "text-amber-600", badge: "bg-white text-amber-600 border-amber-200" },
    { card: "bg-indigo-50/80 hover:bg-indigo-100 border-indigo-300 text-indigo-800", num: "text-indigo-600", badge: "bg-white text-indigo-600 border-indigo-200" },
    { card: "bg-rose-50/80 hover:bg-rose-100 border-rose-300 text-rose-800", num: "text-rose-600", badge: "bg-white text-rose-600 border-rose-200" }
];

// Roadmap tuần cũ đã được thay bằng Bài tập theo từng bài SGK trong bai_hoc_toan_1.json.
const examFileMap = {
    hocky1: { file: 'de_thi_toan_1.json', idPrefix: '12.1.', sheet: 'LichSuBaiThi_HK1', label: 'Học kỳ 1', color: 'pink' },
    hocky2: { file: 'de_thi_toan_1.json', idPrefix: '12.2.', sheet: 'LichSuBaiThi_HK2', label: 'Học kỳ 2', color: 'purple' },
    hsg:    { file: 'de_thi_toan_1.json', idPrefix: '12.3.', sheet: 'LichSuBaiThi_HSG', label: 'Học sinh giỏi', color: 'amber' }
};

// 6 nhóm năng lực Toán lớp 1 (TOAN_C1 - TOAN_C6) — khoá nội bộ vẫn dùng C1..C6,
// việc trích tag từ chuỗi "TOAN_C1" sang "C1" được xử lý bằng regex ở nơi dùng.
const SKILL_TAXONOMY = {
    C1: { code: 'C1', sheetCol: 'C1_SoHocHinhHoc', totalCol: 'C1_SoHocHinhHoc_Tong', name: 'Số học cơ bản và Hình học', advice: 'Cần ôn lại cách đọc viết đếm số phạm vi 10 và 100, cấu tạo số chục - đơn vị, đặc điểm chẵn lẻ và nhận diện hình phẳng, hình khối cơ bản.' },
    C2: { code: 'C2', sheetCol: 'C2_PhepTinh', totalCol: 'C2_PhepTinh_Tong', name: 'Phép tính cộng và phép trừ', advice: 'Rèn luyện thêm sơ đồ tách - gộp số, bảng cộng trừ và kỹ năng đặt tính rồi tính không nhớ.' },
    C3: { code: 'C3', sheetCol: 'C3_DoLuongThoiGian', totalCol: 'C3_DoLuongThoiGian_Tong', name: 'Đo lường, Thời gian và Lịch', advice: 'Luyện tập thêm về đo độ dài bằng thước kẻ (cm), xem giờ đúng trên đồng hồ kim và xem lịch tuần.' },
    C4: { code: 'C4', sheetCol: 'C4_ViTriSoSanh', totalCol: 'C4_ViTriSoSanh_Tong', name: 'Vị trí không gian và So sánh', advice: 'Cần luyện thêm về xác định vị trí không gian, so sánh - sắp xếp số và tìm số lớn nhất, số bé nhất theo điều kiện.' },
    C5: { code: 'C5', sheetCol: 'C5_GiaiToan', totalCol: 'C5_GiaiToan_Tong', name: 'Giải toán có lời văn', advice: 'Rèn đọc hiểu tình huống: xác định số ban đầu, điều gì thay đổi, cần tìm gì; sau đó chọn phép tính phù hợp và trả lời bằng câu đầy đủ.' },
    C6: { code: 'C6', sheetCol: 'C6_TuDuy', totalCol: 'C6_TuDuy_Tong', name: 'Dãy số, Quy luật và Tư duy', advice: 'Rèn kỹ năng tìm số liền trước/sau, số còn thiếu, bước nhảy và quy luật dãy số; sau đó mới mở rộng sang tư duy logic IQ.' }
};

// Lời chào tài khoản thuộc shell Lớp 1; module Toán không tự quản lý phiên/tài khoản.

// ==========================================
// BIẾN TOÀN CỤC ENGINE TOÁN TRONG MODULE LỚP 1
// ==========================================
let allTopicsDataCache = null;
let allQuestionsFlatCache = null;
// Bật/tắt đọc câu hỏi TỰ ĐỘNG khi vào câu mới — nút "Nghe câu hỏi" thủ công vẫn luôn hoạt động
// dù tắt tính năng này (đây chỉ tắt phần tự động phát, không tắt hẳn tính năng nghe).
let autoSpeechEnabled = localStorage.getItem('autoSpeechEnabled') !== 'false';
const examsCache = {};

// ==========================================
// BÀI HỌC & BÀI TẬP THEO SGK TOÁN 1
// ==========================================
const CLASS1_MATH_DATA_ROOT = 'assets/data/math/';
const BAI_HOC_DATA_FILE = `${CLASS1_MATH_DATA_ROOT}bai_hoc_toan_1.json`;
const BAI_TAP_HK1_DATA_FILE = `${CLASS1_MATH_DATA_ROOT}bai_tap_toan_1_hk1.json`;
const BAI_TAP_HK2_DATA_FILE = `${CLASS1_MATH_DATA_ROOT}bai_tap_toan_1_hk2.json`;
const ON_TAP_DATA_FILE = `${CLASS1_MATH_DATA_ROOT}on_tap_toan_1.json`;
const SHARED_IMAGE_CATALOG_FILE = 'assets/data/shared_image_catalog.json';
let baiHocDataCache = null;
let activeBaiHocContext = null;
let exerciseSemesterFilter = 1;

let currentUser = null;
let starGreenCount = 0;
let starRedCount = 0;
let activeTopicId = null;
let activeExamContext = null;
let activeRoadmapContext = null;
let activeQuestionsList = [];
let practiceCycleRawPool = [];
let pendingTopicQuiz = null;
let currentQIndex = 0;
let score = 0;
let userAnswers = {};
let wrongAttemptsByQ = {};
let quizWrongAnswers = [];
let quizAnsweredLog = [];
let quizStartTime = null;
let quizTimerInterval = null;
let quizRemainingSeconds = 40 * 60;
let activeAssessmentAttemptId_ = '';
let class1ExerciseUnlockedIndex_ = 1;
let class1ExerciseProgressLoaded_ = false;
let class1ExerciseBestPercent_ = {};

let audioCtx = null;
const banMaiAudio = new Audio();
banMaiAudio.referrerPolicy = 'no-referrer';

let histLineChartInstance = null;
let histBarChartInstance = null;

// ==========================================
// HỘP THOẠI ĐẸP DÙNG CHUNG - thay toàn bộ alert()/confirm() trình duyệt
// ==========================================
let appDialogResolver_ = null;

function showAppDialog(message, options = {}) {
    const modal = document.getElementById('modal-app-dialog');
    if (!modal) {
        // Fallback hiếm gặp nếu HTML cũ chưa có modal.
        console.warn('[Thông báo]', message);
        return Promise.resolve(options.confirm ? false : true);
    }

    const title = options.title || (options.confirm ? 'Xác nhận' : 'Thông báo');
    const icon = options.icon || (options.confirm ? '❓' : '🐰');
    const okText = options.okText || (options.confirm ? 'Đồng ý' : 'Đã hiểu');
    const cancelText = options.cancelText || 'Để sau';
    const tone = options.tone || 'pink';

    const iconEl = document.getElementById('app-dialog-icon');
    const titleEl = document.getElementById('app-dialog-title');
    const msgEl = document.getElementById('app-dialog-message');
    const okBtn = document.getElementById('app-dialog-ok');
    const cancelBtn = document.getElementById('app-dialog-cancel');
    const panel = document.getElementById('app-dialog-panel');

    if (iconEl) iconEl.textContent = icon;
    if (titleEl) titleEl.textContent = title;
    if (msgEl) msgEl.innerHTML = escapeHtml(String(message || '')).replace(/\n/g, '<br>');
    if (okBtn) okBtn.textContent = okText;
    if (cancelBtn) {
        cancelBtn.textContent = cancelText;
        cancelBtn.classList.toggle('hidden', !options.confirm);
    }

    if (panel) {
        panel.classList.remove('ring-rose-200', 'ring-amber-200', 'ring-emerald-200', 'ring-purple-200', 'ring-pink-200');
        const ring = tone === 'rose' ? 'ring-rose-200' : tone === 'amber' ? 'ring-amber-200' : tone === 'emerald' ? 'ring-emerald-200' : tone === 'purple' ? 'ring-purple-200' : 'ring-pink-200';
        panel.classList.add(ring);
    }

    modal.classList.remove('hidden');
    modal.classList.add('flex');

    return new Promise(resolve => {
        appDialogResolver_ = resolve;
        setTimeout(() => okBtn?.focus(), 20);
    });
}

function closeAppDialog(result = true) {
    const modal = document.getElementById('modal-app-dialog');
    modal?.classList.add('hidden');
    modal?.classList.remove('flex');
    if (appDialogResolver_) {
        const resolve = appDialogResolver_;
        appDialogResolver_ = null;
        resolve(!!result);
    }
}

function showAppNotice(message, options = {}) {
    return showAppDialog(message, { ...options, confirm: false });
}

function showAppConfirm(message, options = {}) {
    return showAppDialog(message, { ...options, confirm: true });
}

function escapeJsString_(value) {
    return String(value ?? '').replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\r?\n/g, ' ');
}

// ==========================================
// HÀM TIỆN ÍCH DỮ LIỆU
// ==========================================
function getStudentFirstName() {
    if (!currentUser || currentUser.isGuest || !currentUser.hoTen) return "Bé";
    const parts = currentUser.hoTen.trim().split(/\s+/);
    return parts[parts.length - 1] || "Bé";
}


let sharedImageCatalogCache_ = null;
let sharedImageByBasename_ = new Map();

// Các tên ảnh cũ không còn trong catalog. Chỉ dùng imageId có thật trong catalog mới.
// Đây là lớp tương thích dữ liệu; không tạo/bịa đường dẫn ảnh ngoài catalog.
const LEGACY_IMAGE_REPLACEMENTS_ = Object.freeze({
    'anh-em-cung-chia-se.jpg': 'family_10_playing_toys',
    'bao-ve-moi-truong.jpg': 'family_23_watering_balcony',
    'be-giup-viec-nha.jpg': 'family_22_house_cleaning',
    'do-choi-lap-ghep.jpg': 'ke_do_choi_nhieu_ngan',
    'gia-dinh-nhieu-the-he.jpg': 'family_30_full_family_portrait',
    'goc-hoc-ve-sang-tao.jpg': 'family_05_study_homework',
    'tro-choi-dan-gian.jpg': 'canh_dong_tha_dieu',
    'truong-hoc-ngay-dau.jpg': 'san_bong_tre_em'
});

async function loadSharedImageCatalog_() {
    if (sharedImageCatalogCache_) return sharedImageCatalogCache_;
    const res = await fetch(SHARED_IMAGE_CATALOG_FILE, { cache: 'no-store' });
    if (!res.ok) throw new Error('Không thể tải kho ảnh dùng chung Lớp 1');
    const data = await res.json();
    if (!data || !data.images) throw new Error('Kho ảnh dùng chung không đúng cấu trúc');
    sharedImageCatalogCache_ = data;
    sharedImageByBasename_ = new Map();
    Object.entries(data.images).forEach(([imageId, meta]) => {
        const src = String(meta?.src || '');
        const base = src.split('/').pop().toLowerCase();
        if (base) sharedImageByBasename_.set(base, { imageId, ...meta });
    });
    return data;
}

function catalogMetaByRef_(itemOrPath) {
    if (!sharedImageCatalogCache_) return null;
    if (itemOrPath && typeof itemOrPath === 'object') {
        const imageId = String(itemOrPath.imageId || itemOrPath.image_id || '').trim();
        if (imageId && sharedImageCatalogCache_.images?.[imageId]) {
            return { imageId, ...sharedImageCatalogCache_.images[imageId] };
        }
        itemOrPath = itemOrPath.img || itemOrPath.image_url || itemOrPath.image || itemOrPath.src || '';
    }
    const raw = String(itemOrPath || '').trim();
    if (!raw) return null;
    const base = raw.split('/').pop().toLowerCase();
    const exact = sharedImageByBasename_.get(base);
    if (exact) return exact;
    const replacementId = LEGACY_IMAGE_REPLACEMENTS_[base];
    if (replacementId && sharedImageCatalogCache_.images?.[replacementId]) {
        return { imageId: replacementId, ...sharedImageCatalogCache_.images[replacementId] };
    }
    return null;
}

function resolveCatalogImageSrc_(itemOrPath) {
    const meta = catalogMetaByRef_(itemOrPath);
    return meta?.src || '';
}

// Mini games load lazily as separate scripts, so expose one read-only resolver
// that still resolves strictly through the shared Class 1 image catalog.
window.resolveClass1MathImageSrc = function(imageId) {
    return resolveCatalogImageSrc_({ imageId: String(imageId || '').trim() });
};

function normalizeVisualMedia_(value) {
    if (Array.isArray(value)) return value.map(normalizeVisualMedia_);
    if (!value || typeof value !== 'object') return value;
    const out = {};
    Object.entries(value).forEach(([key, val]) => {
        if ((key === 'image' || key === 'img' || key === 'image_url' || key === 'src') && typeof val === 'string') {
            out[key] = resolveCatalogImageSrc_(val);
        } else {
            out[key] = normalizeVisualMedia_(val);
        }
    });
    return out;
}

function renderLessonCatalogImages_(lesson) {
    if (!sharedImageCatalogCache_) return '';
    const refs = lesson?.image_plan?.catalog_images || [];
    const cards = refs.map(ref => {
        const meta = catalogMetaByRef_(ref);
        if (!meta?.src) return '';
        return `<figure class="rounded-2xl border border-sky-100 bg-white overflow-hidden shadow-xs">
            <img src="${escapeHtml(meta.src)}" alt="${escapeHtml(meta.alt_vi || meta.name_vi || 'Hình minh họa')}" class="w-full h-[190px] md:h-[230px] object-contain bg-white" loading="lazy">
            <figcaption class="px-3 py-2 text-xs md:text-sm font-bold text-slate-600">${escapeHtml(ref.note || meta.description_vi || meta.name_vi || '')}</figcaption>
        </figure>`;
    }).filter(Boolean).join('');
    return cards ? `<section class="grid grid-cols-1 md:grid-cols-2 gap-3">${cards}</section>` : '';
}

function normalizeQuestion(q) {
    if (!q) return null;
    return {
        question_id: q.id ?? q.question_id ?? q.question_no ?? 0,
        // Kho dữ liệu Toán 1 (bản mới) đã tách riêng "sub" = TÊN đầy đủ chủ đề con và "sub_code" = MÃ "X.Y"
        // (dùng để khớp Bài tập theo SGK). Vẫn dự phòng cho định dạng cũ (chỉ có "sub" là mã) để không vỡ dữ liệu cũ.
        sub_topic: String(q.sub_code ?? q.sub ?? q.sub_topic ?? 'Câu hỏi chung').trim(),
        sub_topic_label: String(q.sub ?? q.sub_code ?? q.sub_topic ?? 'Câu hỏi chung').trim(),
        week: q.week ?? q.w ?? null,
        question_text: q.q ?? q.question_text ?? '',
        options: Array.isArray(q.o) ? q.o : (Array.isArray(q.options) ? q.options : []),
        answer: q.a ?? q.answer ?? '',
        hint: q.h ?? q.hint ?? '',
        image_url: resolveCatalogImageSrc_(q) || '',
        audio_text: q.aud ?? q.audio_text ?? '',
        reading_title: q.r_title ?? q.reading_title ?? '',
        reading_passage: q.r_passage ?? q.reading_passage ?? q.passage_text ?? '',
        skill_tag: q.skill_tag ?? q.tag ?? 'TOAN_C1',
        diem: Number(q.diem ?? q.score ?? 0.5),
        explanation: q.explanation ?? q.h ?? 'Không có giải thích chi tiết.',
        muc1_type: q.muc1_type ?? '',
        exercise_mode: q.exercise_mode ?? q.mode ?? '',
        muc5_type: q.muc5_type ?? '',
        muc5_visual: normalizeVisualMedia_(q.muc5_visual ?? null),
        muc6_type: q.muc6_type ?? '',
        muc6_visual: normalizeVisualMedia_(q.muc6_visual ?? null),
        muc7_type: q.muc7_type ?? '',
        muc7_visual: normalizeVisualMedia_(q.muc7_visual ?? null),
        muc8_type: q.muc8_type ?? '',
        muc8_visual: normalizeVisualMedia_(q.muc8_visual ?? null),
        muc9_type: q.muc9_type ?? '',
        muc9_visual: normalizeVisualMedia_(q.muc9_visual ?? null),
        muc10_type: q.muc10_type ?? '',
        muc10_visual: normalizeVisualMedia_(q.muc10_visual ?? null),
        muc11_type: q.muc11_type ?? '',
        muc11_visual: normalizeVisualMedia_(q.muc11_visual ?? null)
    };
}

function normalizeTopic(t) {
    if (!t) return null;
    const rawQuestions = t.qs || t.questions || [];
    return {
        topic_id: Number(t.id ?? t.topic_id),
        topic_name: t.name ?? t.topic_name ?? '',
        description: t.desc ?? t.description ?? '',
        lecture_title: t.l_title ?? t.lecture_title ?? '',
        lecture_content: t.l_content ?? t.lecture_content ?? '',
        lecture_audio_text: t.l_audio ?? t.lecture_audio_text ?? '',
        questions: rawQuestions.map(normalizeQuestion).filter(Boolean)
    };
}

function shuffleArray(arr) {
    if (!arr) return [];
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function buildTrickyChoices(correctAnswer, sameGroupPool, allPool, count = 3) {
    let same = [...new Set(sameGroupPool.filter(x => x !== correctAnswer))];
    same = shuffleArray(same);
    let picks = same.slice(0, count);
    if (picks.length < count) {
        let rest = [...new Set(allPool.filter(x => x !== correctAnswer && !picks.includes(x)))];
        rest = shuffleArray(rest);
        picks = picks.concat(rest.slice(0, count - picks.length));
    }
    return shuffleArray([correctAnswer, ...picks]);
}

function capitalizeFirstLetter(val) {
    if (!val) return '';
    const s = String(val).trim();
    return s.charAt(0).toUpperCase() + s.slice(1);
}

function beautifySubtopicName(name) {
    if (!name) return '';
    let s = String(name).trim();
    if (/đa giác quan/i.test(s)) return 'Trải nghiệm đa giác quan';
    if (/trái nghĩa.*đồng nghĩa/i.test(s) || /đồng nghĩa.*trái nghĩa/i.test(s)) return 'Trái nghĩa - đồng nghĩa';
    if (s.length > 40 && s.includes('(')) {
        s = s.replace(/\s*\([^)]*\)/g, '').trim();
    }
    return s;
}

const TOPICS_DATA_FILES = [
    `${CLASS1_MATH_DATA_ROOT}kham_pha_toan_1_part1.json`,
    `${CLASS1_MATH_DATA_ROOT}kham_pha_toan_1_part2.json`,
    ON_TAP_DATA_FILE
];

// Kho học liệu Toán 1 là MẢNG PHẲNG câu hỏi (mỗi câu tự mang "sub": "X.Y" và "tag": "TOAN_Cx"),
// không bọc sẵn theo từng Mục lớn như bản gốc — nên cần tự gom nhóm theo số Mục (phần trước dấu chấm của "sub").
async function fetchAllQuestionsFlat() {
    if (allQuestionsFlatCache) return allQuestionsFlatCache;
    await loadSharedImageCatalog_();

    const results = await Promise.all(TOPICS_DATA_FILES.map(async (file) => {
        const res = await fetch(file);
        if (!res.ok) throw new Error(`Không thể tải file dữ liệu ${file}`);
        return res.json();
    }));

    const rawQuestions = results.flatMap(data => {
        if (Array.isArray(data)) return data;
        if (data && Array.isArray(data.topics)) return data.topics.flatMap(t => t.qs || t.questions || []);
        return [];
    });

    allQuestionsFlatCache = rawQuestions.map(normalizeQuestion).filter(Boolean);
    return allQuestionsFlatCache;
}

async function fetchAllTopicsData() {
    if (allTopicsDataCache) return allTopicsDataCache;

    const flat = await fetchAllQuestionsFlat();
    const byMuc = {};
    flat.forEach(q => {
        const mucNum = parseInt(String(q.sub_topic).split('.')[0], 10);
        if (!byMuc[mucNum]) byMuc[mucNum] = [];
        byMuc[mucNum].push(q);
    });

    allTopicsDataCache = TOPICS_CONFIG.map(t => ({
        topic_id: t.id,
        topic_name: t.title,
        description: t.desc,
        lecture_title: '',
        lecture_content: '',
        lecture_audio_text: '',
        questions: byMuc[t.id] || []
    }));
    return allTopicsDataCache;
}

async function loadExamDataFile(file) {
    if (examsCache[file]) return examsCache[file];
    await loadSharedImageCatalog_();
    const res = await fetch(`${CLASS1_MATH_DATA_ROOT}${file}`, { cache: 'no-store' });
    if (!res.ok) throw new Error("Không thể tải file đề thi");
    const data = await res.json();
    if (data && Array.isArray(data.exams)) {
        data.exams = data.exams.map(ex => ({
            ...ex,
            questions: (ex.qs || ex.questions || []).map(normalizeQuestion).filter(Boolean)
        }));
    }
    examsCache[file] = data;
    return data;
}

// ==========================================
// RENDER GIAO DIỆN TRANG CHỦ & ĐẤU TRƯỜNG
// ==========================================
async function renderDashboardGrid() {
    const container = document.getElementById('view-dashboard-grid');
    if (!container) return;
    
    let topicsData = [];
    try { topicsData = await fetchAllTopicsData(); } catch (e) {}

    let html = '';
    // Tab Khám phá hiển thị Mục 1-12. Topic 13 chỉ là nguồn nội bộ cho tab Ôn tập.
    TOPICS_CONFIG.filter(t => !t.hidden).forEach(t => {
        const topicObj = topicsData.find(item => Number(item.topic_id) === Number(t.id));
        const totalCount = Number(t.id) === 5 ? buildMuc5Questions_().length : (topicObj && topicObj.questions ? topicObj.questions.length : 0);
        const countLabel = t.engine === 'epsilon-method' ? '6 Lab' : (totalCount > 0 ? `${totalCount} câu` : 'Đang cập nhật');

        const iconHtml = t.isCustomTextIcon 
            ? `<div class="math-topic-icon w-10 h-10 rounded-2xl flex items-center justify-center text-sm font-black text-rose-600 border border-rose-200 bg-gradient-to-br from-white via-rose-50 to-rose-100 group-hover:scale-110 transition-transform shrink-0 tracking-tight" style="box-shadow:0 4px 10px rgba(15,23,42,.12),inset 0 1px 0 rgba(255,255,255,.9)">S/X</div>`
            : `<div class="math-topic-icon w-10 h-10 rounded-2xl flex items-center justify-center text-xl font-extrabold text-${t.color}-600 border border-${t.color}-200 bg-gradient-to-br from-white via-${t.color}-50 to-${t.color}-100 group-hover:scale-110 transition-transform shrink-0" style="box-shadow:0 4px 10px rgba(15,23,42,.12),inset 0 1px 0 rgba(255,255,255,.9);filter:saturate(1.08)">${t.icon}</div>`;

        html += `
            <div onclick="openTopic(${t.id}, '${t.title}', '${t.icon}')" class="math-topic-card pastel-card p-2.5 flex flex-col justify-start cursor-pointer hover:border-${t.color}-400 transition-all group min-h-[98px] md:min-h-[104px]">
                <div class="math-topic-head flex items-center gap-3">
                    ${iconHtml}
                    <h3 class="math-topic-title font-extrabold text-${t.color}-700 text-base md:text-lg leading-snug overflow-hidden" style="display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;">${t.title}</h3>
                </div>
                <div class="math-topic-foot flex justify-between items-end gap-2 mt-1 pt-1 border-t border-pink-100 font-bold text-gray-600">
                    <span class="flex-1 text-sm md:text-[15px] leading-snug overflow-hidden" style="display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;">${t.desc}</span>
                    <span class="shrink-0 bg-${t.color}-50 text-${t.color}-600 px-2.5 py-1 rounded-full text-xs md:text-sm font-extrabold">${countLabel}</span>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
}

async function startRandomExam(categoryKey) {
    if (!requirePremium('Đề thi')) return;
    stopSpeaking();
    // Dữ liệu đề thi Toán 1 phân loại HK1/HK2/HSG theo tiền tố exam_id
    // dựa đúng theo TIỀN TỐ của "exam_id" (12.1.x = HK1, 12.2.x = HK2, 12.3.x = HSG),
    // khớp với ma trận exam_id đã chuẩn hoá trong file dữ liệu.
    const idPrefix = examFileMap[categoryKey]?.idPrefix || '';

    showLoadingOverlay("Đang chuẩn bị đề thi...");
    try {
        const examData = await loadExamDataFile('de_thi_toan_1.json');
        hideLoadingOverlay();

        const pool = (examData && Array.isArray(examData.exams)) ? examData.exams : [];
        let candidates = pool.filter(e => String(e.exam_id || '').startsWith(idPrefix));
        if (!candidates.length) { showAppNotice('Đang cập nhật thêm đề thi cho mục này, bé quay lại sau nhé!', { title: 'Đề thi', icon: '🏆', tone: 'amber' }); return; }

        const exam = candidates[Math.floor(Math.random() * candidates.length)];
        const examIndex = pool.indexOf(exam);
        const examLabel = examFileMap[categoryKey]?.label || 'Đề thi';
        const examTitle = exam.exam_title || exam.name || exam.title || `${examLabel} - Đề số ${examIndex + 1}`;

        activeExamContext = { categoryKey, examIndex, examTitle, examId: String(exam.exam_id || '') };
        activeRoadmapContext = null;
        pendingTopicQuiz = null;

        const questions = Array.isArray(exam.questions) && exam.questions.length ? exam.questions : [];
        if (!questions.length) { showAppNotice('Đề thi này chưa có câu hỏi, bé chọn đề khác nhé!', { title: 'Đề thi', icon: '🏆', tone: 'amber' }); return; }

        updateNavTabs("12. Đấu trường đề thi", "🏆", examTitle);
        startTopicQuiz(0, examTitle, shuffleArray(questions), null);
    } catch (err) {
        hideLoadingOverlay();
        showAppNotice(`Không thể tải đề thi: ${err.message}`, { title: 'Đề thi', icon: '🏆', tone: 'rose' });
    }
}

function startExamCountdown() {
    quizRemainingSeconds = 40 * 60;
    updateExamTimerDisplay();
    clearInterval(quizTimerInterval);
    quizTimerInterval = setInterval(() => {
        quizRemainingSeconds--;
        updateExamTimerDisplay();
        if (quizRemainingSeconds <= 0) {
            clearInterval(quizTimerInterval);
            showAppNotice('Đã hết giờ làm bài! Bài thi sẽ được nộp lại nhé bé.', { title: 'Hết giờ', icon: '⏰', tone: 'amber' });
            showResultScreen();
        }
    }, 1000);
}

function updateExamTimerDisplay() {
    const el = document.getElementById('quiz-timer-display');
    if (!el) return;
    const m = Math.floor(Math.max(0, quizRemainingSeconds) / 60);
    const s = Math.max(0, quizRemainingSeconds) % 60;
    el.textContent = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function openExamHub() {
    setAppShellRootMode_(true);
    setMainTabActive_('exams');
    stopSpeaking();
    activeBaiHocContext = null;
    activeExamContext = null;
    activeRoadmapContext = null;
    activeTopicId = null;
    pendingTopicQuiz = null;
    updateNavTabs("12. Đấu trường đề thi", "🏆", null);
    switchAppView('view-exam-hub');
    showLoadingOverlay("Đang tải kho đề thi...");
    renderExamHubGrid().finally(() => hideLoadingOverlay());
}

async function renderExamHubGrid() {
    const container = document.getElementById('exam-categories-grid');
    if (!container) return;

    let examData = null;
    try { examData = await loadExamDataFile('de_thi_toan_1.json'); } catch (e) {}

    const getCountForPrefix = (idPrefix) => {
        if (!examData || !examData.exams) return 3;
        return examData.exams.filter(e => String(e.exam_id || '').startsWith(idPrefix)).length || 0;
    };

    const countHK1 = getCountForPrefix(examFileMap.hocky1.idPrefix);
    const countHK2 = getCountForPrefix(examFileMap.hocky2.idPrefix);
    const countHSG = getCountForPrefix(examFileMap.hsg.idPrefix);

    let html = `
        <div class="bg-pink-50/70 p-5 rounded-3xl border-2 border-pink-200 flex flex-col justify-between items-center text-center group min-h-[250px] pastel-card">
            <div>
                <div class="text-4xl mb-1.5 group-hover:scale-110 transition-transform">🔢</div>
                <h3 class="font-extrabold text-pink-600 text-lg mb-1">Học kỳ 1</h3>
                <p class="text-xs text-gray-500 font-bold mb-2">Kiểm tra kiến thức HK1</p>
                <span class="inline-block bg-pink-100 text-pink-700 px-3 py-0.5 rounded-full text-xs font-black mb-3">${countHK1} đề thi chuẩn</span>
            </div>
            <div class="w-full space-y-2">
                <button onclick="startRandomExam('hocky1')" class="w-full py-2.5 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-extrabold rounded-xl text-xs pastel-btn shadow-sm">
                    🚀 Vào thi thử
                </button>
                <button onclick="openHistoryModal('LichSuBaiThi_HK1')" class="w-full py-2 bg-white text-pink-700 border border-pink-300 font-extrabold rounded-xl text-xs pastel-btn hover:bg-pink-50">
                    📊 Xem lịch sử thi
                </button>
            </div>
        </div>

        <div class="bg-purple-50/70 p-5 rounded-3xl border-2 border-purple-200 flex flex-col justify-between items-center text-center group min-h-[250px] pastel-card">
            <div>
                <div class="text-4xl mb-1.5 group-hover:scale-110 transition-transform">⭐</div>
                <h3 class="font-extrabold text-purple-600 text-lg mb-1">Học kỳ 2</h3>
                <p class="text-xs text-gray-500 font-bold mb-2">Kiểm tra kiến thức HK2</p>
                <span class="inline-block bg-purple-100 text-purple-700 px-3 py-0.5 rounded-full text-xs font-black mb-3">${countHK2} đề thi chuẩn</span>
            </div>
            <div class="w-full space-y-2">
                <button onclick="startRandomExam('hocky2')" class="w-full py-2.5 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-extrabold rounded-xl text-xs pastel-btn shadow-sm">
                    🚀 Vào thi thử
                </button>
                <button onclick="openHistoryModal('LichSuBaiThi_HK2')" class="w-full py-2 bg-white text-purple-700 border border-purple-300 font-extrabold rounded-xl text-xs pastel-btn hover:bg-purple-50">
                    📊 Xem lịch sử thi
                </button>
            </div>
        </div>

        <div class="bg-amber-50/70 p-5 rounded-3xl border-2 border-amber-200 flex flex-col justify-between items-center text-center group min-h-[250px] pastel-card">
            <div>
                <div class="text-4xl mb-1.5 group-hover:scale-110 transition-transform">🏆</div>
                <h3 class="font-extrabold text-amber-600 text-lg mb-1">Học sinh giỏi</h3>
                <p class="text-xs text-gray-500 font-bold mb-2">Thử thách nâng cao IQ</p>
                <span class="inline-block bg-amber-100 text-amber-700 px-3 py-0.5 rounded-full text-xs font-black mb-3">${countHSG} đề thi tuyển chọn</span>
            </div>
            <div class="w-full space-y-2">
                <button onclick="startRandomExam('hsg')" class="w-full py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-extrabold rounded-xl text-xs pastel-btn shadow-sm">
                    🚀 Vào thi thử
                </button>
                <button onclick="openHistoryModal('LichSuBaiThi_HSG')" class="w-full py-2 bg-white text-amber-700 border border-amber-300 font-extrabold rounded-xl text-xs pastel-btn hover:bg-amber-50">
                    📊 Xem lịch sử thi
                </button>
            </div>
        </div>
    `;
    container.innerHTML = html;
}

// ==========================================
// ĐIỀU HƯỚNG VIEW & BREADCRUMB
// ==========================================
function updateNavTabs(level2Title, level2Icon, level3Title, level4Title) {
    // 6 tab chinh da nam co dinh tren header, breadcrumb chi hien cac cap noi dung ben trong.
    const mainTabBreadcrumbAliases = {
        discover: ['khám phá'],
        lessons: ['bài học'],
        exercises: ['bài tập'],
        review: ['ôn tập'],
        exams: ['đề thi'],
        games: ['mini game', 'mini games', 'trò chơi']
    };
    const normalizeBreadcrumbLabel = (value) => String(value || '').trim().toLowerCase();
    const aliases = mainTabBreadcrumbAliases[currentMainTab] || [];
    if (level2Title && aliases.includes(normalizeBreadcrumbLabel(level2Title))) {
        level2Title = level3Title || null;
        level3Title = level4Title || null;
        level4Title = null;
    }

    const tab2 = document.getElementById('header-level2-tab');
    const tab3 = document.getElementById('header-level3-tab');
    const tab4 = document.getElementById('header-level4-tab');
    const homeBtn = document.getElementById('btn-header-home');

    if (level2Title) {
        document.getElementById('header-level2-title').textContent = level2Title;
        document.getElementById('header-level2-icon').textContent = level2Icon || '🔢';
        tab2.classList.remove('hidden');
        tab2.classList.add('flex');
        homeBtn.classList.add('opacity-80', 'hover:opacity-100');
    } else {
        tab2.classList.add('hidden');
        tab2.classList.remove('flex');
        homeBtn.classList.remove('opacity-80');
    }

    if (level3Title) {
        document.getElementById('header-level3-title').textContent = level3Title;
        tab3.classList.remove('hidden');
        tab3.classList.add('flex');
        const box = tab3.querySelector('div');
        if (box && currentMainTab === 'discover' && activeTopicId) {
            box.setAttribute('role', 'button');
            box.setAttribute('tabindex', '0');
            box.setAttribute('title', 'Quay lại chuyên mục');
            box.classList.add('cursor-pointer','hover:bg-purple-100','transition-colors');
            box.onclick = returnToCurrentDiscoverTopic_;
            box.onkeydown = (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); returnToCurrentDiscoverTopic_(); } };
        } else if (box) {
            box.removeAttribute('role'); box.removeAttribute('tabindex'); box.removeAttribute('title');
            box.classList.remove('cursor-pointer','hover:bg-purple-100','transition-colors');
            box.onclick = null; box.onkeydown = null;
        }
    } else {
        const box = tab3.querySelector('div');
        if (box) { box.onclick = null; box.onkeydown = null; box.removeAttribute('role'); box.removeAttribute('tabindex'); box.removeAttribute('title'); }
        tab3.classList.add('hidden');
        tab3.classList.remove('flex');
    }

    if (level4Title && tab4) {
        document.getElementById('header-level4-title').textContent = level4Title;
        tab4.classList.remove('hidden');
        tab4.classList.add('flex');
    } else if (tab4) {
        tab4.classList.add('hidden');
        tab4.classList.remove('flex');
    }
}

let appShellRootMode_ = true;
function setAppShellRootMode_(isRoot) {
    appShellRootMode_ = !!isRoot;
    const mainBanner = document.getElementById('app-main-banner');
    const contextBanner = document.getElementById('app-context-banner');
    if (mainBanner) mainBanner.classList.toggle('hidden', !appShellRootMode_);
    if (contextBanner) contextBanner.classList.toggle('hidden', appShellRootMode_);
}


function setMiniGamePlayWide_(wide) {
    const dashboard = document.getElementById('screen-dashboard');
    const playInner = document.querySelector('#view-game-play > div');
    if (dashboard) dashboard.style.maxWidth = wide ? '1280px' : '';
    if (playInner) playInner.style.maxWidth = wide ? '1280px' : '';
}

let currentMainTab = 'discover';
function setMainTabActive_(tabName) {
    currentMainTab = tabName || 'discover';
    document.querySelectorAll('.main-module-tab').forEach(btn => {
        const active = btn.dataset.tab === currentMainTab;
        btn.classList.toggle('is-active', active);
        btn.setAttribute('aria-selected', active ? 'true' : 'false');
    });
}

function updateDiscoverBreadcrumb_(topicTitle = null, topicIcon = '🔢', subTitle = null) {
    updateNavTabs('Khám phá', '🧭', topicTitle || null, subTitle || null);
}

function returnToCurrentDiscoverTopic_() {
    stopSpeaking();
    clearInterval(quizTimerInterval);
    const topicId = Number(activeTopicId || pendingTopicQuiz?.topicNum || 0);
    if (!topicId) return goHome();
    const cfg = TOPICS_CONFIG.find(t => Number(t.id) === topicId);
    openTopic(topicId, pendingTopicQuiz?.topicName || cfg?.title || `Chủ đề ${topicId}`, cfg?.icon || '🔢');
}

function openReviewTab() {
    setMainTabActive_('review');
    openTopic(13, 'Ôn tập', '📚');
    setAppShellRootMode_(true);
}

function openMainTab(tabName) {
    stopSpeaking();
    clearInterval(quizTimerInterval);
    switch (tabName) {
        case 'discover': goHome(); break;
        case 'lessons': openBaiHocHub(1); break;
        case 'exercises': openRoadmap(1); break;
        case 'review': openReviewTab(); break;
        case 'exams': openExamHub(); break;
        case 'games': openMiniGameHub(); break;
        default: goHome();
    }
}

function returnToTopicLecture() {
    stopSpeaking();
    clearInterval(quizTimerInterval);
    if (currentMainTab === 'discover') {
        if (activeTopicId) return returnToCurrentDiscoverTopic_();
        return goHome();
    }
    if (activeBaiHocContext?.bai) return openBaiHocHub(activeBaiHocContext.semester || 1);
    if (activeBaiHocContext) return openBaiHocHub(activeBaiHocContext.semester || 1);
    if (activeExamContext) return openExamHub();
    if (activeRoadmapContext) return openRoadmap(exerciseSemesterFilter || 1);
    if (typeof inMiniGameFlow !== 'undefined' && inMiniGameFlow) return openMiniGameHub();
    if (pendingTopicQuiz) return switchAppView('view-lecture');
    goHome();
}

function switchAppView(viewId) {
    stopSpeaking();
    if (viewId !== 'view-game-play') setMiniGamePlayWide_(false);
    if (viewId !== 'view-game-play' && typeof stopActiveMiniGame_ === 'function') stopActiveMiniGame_();
    ['view-dashboard-grid', 'view-epsilon-method-hub', 'view-number-sense', 'view-operation-sense', 'view-bai-hoc-hub', 'view-bai-hoc-lesson', 'view-lecture', 'view-quiz', 'view-roadmap', 'view-minigame-hub', 'view-game-play', 'view-exam-hub', 'view-result'].forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;
        if (id === viewId) el.classList.remove('hidden');
        else el.classList.add('hidden');
    });
}

function goHome() {
    setAppShellRootMode_(true);
    stopSpeaking();
    clearInterval(quizTimerInterval);
    activeBaiHocContext = null;
    activeRoadmapContext = null;
    activeExamContext = null;
    activeTopicId = null;
    pendingTopicQuiz = null;
    updateNavTabs('Khám phá', '🧭', null);
    setMainTabActive_('discover');
    switchAppView('view-dashboard-grid');
}

// ==========================================
// MINI GAME TOÁN 1 — HUB + LAZY LOAD
// 1. Sudoku  |  2. Thám tử đếm  |  3. Chẵn - lẻ  |  4. Cây cầu số  |  5. Tháp số  |  6. Xưởng ghép hình  |  7. Kệ đồ chơi  |  8. Ao cá & Vườn hoa so sánh
// ==========================================
let inMiniGameFlow = false;
const MINIGAME_LIST = [
    { id: 'sudoku', title: '1. Sudoku', desc: 'Điền số đúng theo hàng, cột và từng ô nhỏ', icon: '🔢', ready: true },
    { id: 'counting-scene', title: '2. Thám tử đếm', desc: 'Quan sát tranh thật, chạm từng vật và đếm không lặp', icon: '🔎', ready: true },
    { id: 'even-odd', title: '3. Ghép đôi - Chẵn lẻ', desc: 'Nâng cao · Ghép thành từng đôi để hiểu số chẵn và số lẻ', icon: '👯', ready: true, advanced: true },
    { id: 'number-bridge', title: '4. Cây cầu số', desc: 'Ghép các đoạn cầu vừa khít để hiểu tách - gộp, cộng và phần còn thiếu', icon: '🌉', ready: true },
    { id: 'number-tower', title: '5. Tháp số vươn cao', desc: 'Xây tháp theo thứ tự, số hai chữ số và quy luật cách đều', icon: '🏰', ready: true },
    { id: 'construction-memory', title: '6. Xưởng ghép hình kỳ diệu', desc: 'Ghép đúng hình, màu, hướng và số để lắp mô hình hình học', icon: '🧩', ready: true },
    { id: 'tidy-toy-shelf', title: '7. Kệ đồ chơi ngăn nắp', desc: 'Phân loại, đếm, thêm bớt và làm các ngăn bằng nhau', icon: '🧸', ready: true },
    { id: 'compare-garden-pond', title: '8. Ao cá & Vườn hoa so sánh', desc: 'Ghép cặp, so sánh, thêm bớt và tìm hai nhóm hơn kém nhau bao nhiêu', icon: '🐟', ready: true }
];
const MINIGAME_PALETTES = [
    ['bg-rose-50/80','border-rose-300','text-rose-600'],
    ['bg-sky-50/80','border-sky-300','text-sky-600'],
    ['bg-violet-50/80','border-violet-300','text-violet-600'],
    ['bg-amber-50/80','border-amber-300','text-amber-700'],
    ['bg-fuchsia-50/80','border-fuchsia-300','text-fuchsia-700'],
    ['bg-emerald-50/80','border-emerald-300','text-emerald-700']
];
const GAME_SCRIPT_MAP = {
    'sudoku': 'assets/js/math/games/sudoku.js?v=20261004-math-games-final-1',
    'counting-scene': 'assets/js/math/games/counting-scene.js?v=20261004-math-games-final-1',
    'even-odd': 'assets/js/math/games/even-odd.js?v=20261004-math-games-final-1',
    'number-bridge': 'assets/js/math/games/number-bridge.js?v=20261004-math-games-final-1',
    'number-tower': 'assets/js/math/games/number-tower.js?v=20261004-math-games-final-1',
    'construction-memory': 'assets/js/math/games/construction-memory.js?v=20261004-math-games-final-1',
    'tidy-toy-shelf': 'assets/js/math/games/tidy-toy-shelf.js?v=20261004-math-games-final-1',
    'compare-garden-pond': 'assets/js/math/games/compare-garden-pond.js?v=20261004-math-games-final-1'
};
const GAME_START_FN_MAP = {
    'sudoku': 'startSudokuGame',
    'counting-scene': 'startCountingSceneGame',
    'even-odd': 'startEvenOddGame',
    'number-bridge': 'startNumberBridgeGame',
    'number-tower': 'startNumberTowerGame',
    'construction-memory': 'startConstructionMemoryGame',
    'tidy-toy-shelf': 'startTidyToyShelfGame',
    'compare-garden-pond': 'startCompareGardenPondGame'
};
const GAME_STOP_FN_MAP = {
    'sudoku': 'stopSudokuGame',
    'counting-scene': 'stopCountingSceneGame',
    'even-odd': 'stopEvenOddGame',
    'number-bridge': 'stopNumberBridgeGame',
    'number-tower': 'stopNumberTowerGame',
    'construction-memory': 'stopConstructionMemoryGame',
    'tidy-toy-shelf': 'stopTidyToyShelfGame',
    'compare-garden-pond': 'stopCompareGardenPondGame'
};
let activeMiniGameId_ = null;
const loadedGameScripts = {};
function stopActiveMiniGame_() {
    if (!activeMiniGameId_) return;
    const fnName = GAME_STOP_FN_MAP[activeMiniGameId_];
    const fn = fnName ? window[fnName] : null;
    if (typeof fn === 'function') {
        try { fn(); } catch (_) {}
    }
    activeMiniGameId_ = null;
}
function rewardMiniGameStar_(message) {
    starGreenCount++;
    const el = document.getElementById('star-green-count');
    if (el) el.textContent = starGreenCount;
    if (message && typeof showAppNotice === 'function') showAppNotice(message, { title: 'Xuất sắc!', icon: '⭐', okText: 'Chơi tiếp' });
}
function openMiniGameHub() {
    stopActiveMiniGame_();
    setAppShellRootMode_(true);
    setMainTabActive_('games');
    stopSpeaking();
    clearInterval(quizTimerInterval);
    inMiniGameFlow = true;
    activeBaiHocContext = null;
    activeRoadmapContext = null;
    activeExamContext = null;
    activeTopicId = null;
    pendingTopicQuiz = null;
    updateNavTabs('Mini games', '🎮', null);
    const grid = document.getElementById('minigame-grid');
    if (!grid) return;
    grid.innerHTML = MINIGAME_LIST.map((g, idx) => {
        const p = MINIGAME_PALETTES[idx % MINIGAME_PALETTES.length];
        return `<div onclick="openGamePlay('${g.id}')" class="${p[0]} ${p[1]} border rounded-[26px] p-3.5 md:p-4 min-h-[142px] flex flex-col items-center justify-between text-center cursor-pointer relative shadow-sm pastel-btn group">
            ${g.advanced ? '<span class="absolute bg-amber-100 text-amber-700 text-[10px] font-black px-2 py-0.5 rounded-full border border-amber-200" style="top:8px;left:10px;right:auto;">Nâng cao</span>' : ''}
            <span class="absolute top-2 right-2 bg-emerald-100 text-emerald-700 text-[10px] font-black px-2 py-0.5 rounded-full border border-emerald-200">Chơi ngay</span>
            <div class="text-4xl group-hover:scale-110 transition-transform mt-1">${g.icon}</div>
            <div class="w-full"><h3 class="font-extrabold ${p[2]} text-[17px] md:text-lg leading-tight">${g.title}</h3><p class="text-[15px] text-gray-700 font-bold mt-1 leading-snug">${g.desc}</p></div>
        </div>`;
    }).join('');
    switchAppView('view-minigame-hub');
}
function loadGameScript(src) {
    if (loadedGameScripts[src]) return Promise.resolve();
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => { loadedGameScripts[src] = true; resolve(); };
        script.onerror = () => reject(new Error(`Không tải được file game: ${src}`));
        document.body.appendChild(script);
    });
}
async function openGamePlay(gameId) {
    if (!requirePremium('Mini game')) return;
    const game = MINIGAME_LIST.find(g => g.id === gameId);
    if (!game) return;
    stopActiveMiniGame_();
    setAppShellRootMode_(false);
    setMiniGamePlayWide_(true);
    setMainTabActive_('games');
    stopSpeaking();
    clearInterval(quizTimerInterval);
    inMiniGameFlow = true;
    const title = document.getElementById('game-play-title');
    if (title) title.innerHTML = `<span>${game.icon}</span><span class="truncate">${game.title}</span>`;
    updateNavTabs(game.title, '🎮', null);
    switchAppView('view-game-play');
    const container = document.getElementById('game-play-container');
    if (container) container.innerHTML = '<p class="text-center text-gray-400 font-bold py-8"><i class="fa-solid fa-spinner fa-spin mr-1"></i> Đang tải game...</p>';
    try {
        await loadGameScript(GAME_SCRIPT_MAP[gameId]);
    } catch (e) {
        if (container) container.innerHTML = '<p class="text-center text-rose-500 font-bold py-8">Không tải được game, bé thử lại nhé!</p>';
        return;
    }
    const startFnName = GAME_START_FN_MAP[gameId];
    const startFn = startFnName ? window[startFnName] : null;
    if (typeof startFn === 'function') {
        activeMiniGameId_ = gameId;
        startFn();
    } else if (container) {
        container.innerHTML = '<p class="text-center text-amber-600 font-bold py-8">Game đã tải nhưng chưa tìm thấy hàm khởi động. Bé thử tải lại trang nhé!</p>';
    }
}

// ==========================================
// ADAPTER TÀI KHOẢN / QUYỀN DÙNG CHUNG CỦA LỚP 1
// Module Toán không sở hữu login, đăng ký, session hay Admin riêng.
// Mọi private API đi qua ctx.apiRequest của shell Lớp 1.
// ==========================================
let class1ModuleAccessType_ = 'regular';

async function class1ApiRequest_(action, payload = {}, options = {}) {
    if (!mathModuleCtx_ || typeof mathModuleCtx_.apiRequest !== 'function') {
        throw new Error('CLASS1_SHARED_BACKEND_UNAVAILABLE');
    }
    return mathModuleCtx_.apiRequest(action, payload || {}, options || {});
}

function openAuthModal(tab = 'login') {
    if (mathModuleCtx_ && typeof mathModuleCtx_.openAuth === 'function') {
        mathModuleCtx_.openAuth(tab === 'register' ? 'register' : 'login');
        return;
    }
    showAppNotice('Cô Thỏ Hồng chưa mở được phần đăng nhập. Con vui lòng quay lại trang Lớp 1 và thử lại nhé!', {
        title: 'Tài khoản Lớp 1', icon: '🐰', tone: 'rose'
    });
}

function isAdminUser() {
    return !!mathModuleCtx_?.user && String(mathModuleCtx_.user.role || '').toLowerCase() === 'admin';
}

function hasPremiumAccess() {
    if (isAdminUser()) return true;
    return ['trial','vip'].includes(String(class1ModuleAccessType_ || 'regular').toLowerCase());
}

function showPremiumModal(featureName = 'Nội dung này') {
    const modalId = 'class1-math-premium-access-modal';
    let modal = document.getElementById(modalId);
    if (!modal) {
        modal = document.createElement('div');
        modal.id = modalId;
        modal.className = 'hidden fixed inset-0 z-[90] bg-slate-900/55 backdrop-blur-sm flex items-center justify-center p-4';
        (mathModuleRoot_ || document.body).appendChild(modal);
    }

    const guest = !currentUser || currentUser.isGuest;
    const currentTier = String(class1ModuleAccessType_ || 'regular').toLowerCase();
    const tierText = currentTier === 'regular' ? 'Regular' : capitalizeFirstLetter(currentTier);

    modal.innerHTML = `
        <div class="w-full max-w-[350px] bg-[#fffdf4] rounded-[26px] border-2 border-amber-300 shadow-2xl overflow-hidden">
            <div class="px-5 pt-5 pb-4 text-center">
                <div class="mx-auto w-[70px] h-[70px] rounded-full bg-white border border-amber-300 flex items-center justify-center text-[38px] shadow-sm mb-3">🐰</div>
                <h3 class="text-[17px] font-black text-orange-600 mb-2.5">${escapeHtml(featureName)}</h3>
                <div class="text-[13px] leading-[1.7] font-extrabold text-slate-700">
                    ${guest
                        ? `Đây là ${escapeHtml(featureName)} dành cho tài khoản Trial hoặc VIP của môn Toán.<br>Con đăng nhập bằng tài khoản Lớp 1 để tiếp tục nhé!<br>Nội dung Free trong Khám phá vẫn học bình thường.`
                        : `Quyền Toán hiện tại của con là <span class="text-orange-600">${escapeHtml(tierText)}</span>.<br>${escapeHtml(featureName)} dành cho tài khoản Trial hoặc VIP của môn Toán.<br>Nội dung Free trong Khám phá vẫn học bình thường.`}
                </div>
                <div class="mt-3.5 px-3 py-2.5 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-700 text-[11px] leading-snug font-black flex items-center justify-center gap-1.5">
                    <span>🌻</span><span>Nội dung Free trong Khám phá vẫn học bình thường</span>
                </div>
            </div>
            <div class="bg-white/80 border-t border-pink-100 px-3.5 py-3 space-y-2">
                ${guest ? `<div class="grid grid-cols-2 gap-2">
                    <button onclick="closePremiumModal();openAuthModal('login')" class="h-10 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-400 text-white font-black text-sm shadow-sm">Đăng nhập</button>
                    <button onclick="closePremiumModal();openAuthModal('register')" class="h-10 rounded-2xl bg-white border border-fuchsia-300 text-fuchsia-500 font-black text-sm">Đăng ký</button>
                </div>` : ''}
                <button onclick="closePremiumModal()" class="w-full h-10 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-500 text-sm font-black">Để sau nhé</button>
            </div>
        </div>`;
    modal.classList.remove('hidden');
}

function closePremiumModal() {
    document.getElementById('class1-math-premium-access-modal')?.classList.add('hidden');
}

function requirePremium(featureName) {
    if (hasPremiumAccess()) return true;
    if (typeof mathModuleCtx_?.requestPremiumAccess === 'function') {
        mathModuleCtx_.requestPremiumAccess(featureName);
    } else {
        showPremiumModal(featureName);
    }
    return false;
}

// Đồng bộ icon khóa theo quyền môn do shell Lớp 1 cung cấp.
// Hàm này chỉ cập nhật UI; quyền thật vẫn được kiểm tra ở shell/backend.
function updatePremiumLockDecorations() {
    const locked = !hasPremiumAccess();
    ['bai-hoc-lock-icon','roadmap-lock-icon','review-lock-icon','exam-lock-icon','minigame-lock-icon'].forEach(id => {
        document.getElementById(id)?.classList.toggle('hidden', !locked);
    });

    const grid = document.getElementById('view-dashboard-grid');
    if (!grid) return;
    grid.querySelectorAll('[data-premium-lock-badge]').forEach(x => x.remove());
}

function resetStars() {
    starGreenCount = 0; starRedCount = 0;
    const greenEl = document.getElementById('star-green-count');
    const redEl = document.getElementById('star-red-count');
    if (greenEl) greenEl.textContent = 0;
    if (redEl) redEl.textContent = 0;
}

async function loadBaiHocData() {
    if (baiHocDataCache) return baiHocDataCache;
    await loadSharedImageCatalog_();
    const [lessonRes, hk1Res, hk2Res] = await Promise.all([
        fetch(BAI_HOC_DATA_FILE, { cache: 'no-store' }),
        fetch(BAI_TAP_HK1_DATA_FILE, { cache: 'no-store' }),
        fetch(BAI_TAP_HK2_DATA_FILE, { cache: 'no-store' })
    ]);
    if (!lessonRes.ok) throw new Error('Không thể tải dữ liệu Bài học Toán 1');
    if (!hk1Res.ok || !hk2Res.ok) throw new Error('Không thể tải dữ liệu Bài tập Toán 1');
    const [lessonData, hk1Data, hk2Data] = await Promise.all([lessonRes.json(), hk1Res.json(), hk2Res.json()]);
    baiHocDataCache = {
        ...lessonData,
        bai_tap: [...(hk1Data.bai_tap || []), ...(hk2Data.bai_tap || [])],
        learning_sequence: lessonData.learning_sequence || [...(hk1Data.learning_sequence || []), ...(hk2Data.semester_learning_sequence || [])],
        competency_definitions: hk1Data.competency_definitions || hk2Data.competency_definitions || {},
        __exerciseSources: { 1: hk1Data, 2: hk2Data }
    };
    return baiHocDataCache;
}

async function loadExerciseQuestions_(semesterNumber) {
    const data = await loadBaiHocData();
    const source = data?.__exerciseSources?.[Number(semesterNumber) === 2 ? 2 : 1] || {};
    const raw = (source.question_bank_topics || []).flatMap(t => t.qs || t.questions || []);
    return raw.map(normalizeQuestion).filter(Boolean);
}

function findBaiHocByNumber_(data, baiNumber) {
    return (data?.bai_hoc || []).find(x => Number(x.bai) === Number(baiNumber)) || null;
}

async function openBaiHocHub(semesterNumber = 1) {
    setAppShellRootMode_(true);
    setMainTabActive_('lessons');
    stopSpeaking();
    clearInterval(quizTimerInterval);
    activeBaiHocContext = { semester: Number(semesterNumber) || 1, bai: null, pageNo: 1 };
    activeRoadmapContext = null;
    activeExamContext = null;
    pendingTopicQuiz = null;
    updateNavTabs('Bài học', '📖', null);
    switchAppView('view-bai-hoc-hub');
    showLoadingOverlay('Đang mở Bài học Toán 1...');
    try {
        const data = await loadBaiHocData();
        renderBaiHocHub_(data, activeBaiHocContext.semester);
    } catch (err) {
        showAppNotice(`Không thể mở Bài học: ${err.message}`, { title: 'Bài học', icon: '📖', tone: 'rose' });
    } finally {
        hideLoadingOverlay();
    }
}

function renderBaiHocHub_(data, semesterNumber) {
    const tabs = document.getElementById('bai-hoc-semester-tabs');
    const grid = document.getElementById('bai-hoc-grid');
    const subtitle = document.getElementById('bai-hoc-hub-subtitle');
    if (!tabs || !grid) return;

    const semesters = [1, 2].filter(sem => (data?.bai_hoc || []).some(x => Number(x.semester) === sem));
    tabs.innerHTML = semesters.map(sem => `<button onclick="openBaiHocHub(${sem})" class="semester-switch-btn ${Number(sem) === Number(semesterNumber) ? 'is-active' : 'is-inactive'}">Học kỳ ${sem}</button>`).join('');

    const lessons = (data?.bai_hoc || []).filter(x => Number(x.semester) === Number(semesterNumber));
    if (subtitle) subtitle.textContent = `Học kỳ ${semesterNumber} · ${lessons.length} bài`;
    grid.className = 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2';
    grid.innerHTML = lessons.map((lesson, idx) => {
        const alt = idx % 2 === 0;
        return `<button onclick="openBaiHocLesson(${lesson.bai},1)" class="text-left min-h-[82px] rounded-2xl border-2 ${alt ? 'border-pink-200 bg-gradient-to-br from-white to-pink-50' : 'border-purple-200 bg-gradient-to-br from-white to-purple-50'} px-3 py-2.5 hover:border-fuchsia-400 hover:shadow-md transition-shadow">
            <div class="font-black text-purple-700 text-base">Bài ${lesson.bai}</div>
            <div class="mt-1 text-[12px] md:text-[13px] leading-5 font-bold text-slate-700 line-clamp-2">${escapeHtml(lesson.source_title || '')}</div>
        </button>`;
    }).join('');
}

async function openBaiHocLesson(baiNumber, pageNo = 1) {
    if (!requirePremium('Bài học')) return;
    if (!requirePremium('Bài học')) return;
    setAppShellRootMode_(false);
    stopSpeaking();
    showLoadingOverlay('Đang mở bài học...');
    try {
        const data = await loadBaiHocData();
        const lesson = findBaiHocByNumber_(data, baiNumber);
        if (!lesson) throw new Error(`Không tìm thấy Bài ${baiNumber}`);
        const safePage = Math.min(3, Math.max(1, Number(pageNo) || 1));
        activeBaiHocContext = { semester: Number(lesson.semester), bai: Number(lesson.bai), pageNo: safePage };
        setMainTabActive_('lessons');
        updateNavTabs('Bài học', '📖', `Bài ${lesson.bai}`, lesson.source_title || '');
        renderBaiHocLesson_(lesson, safePage);
        switchAppView('view-bai-hoc-lesson');
    } catch (err) {
        showAppNotice(`Không thể mở bài học: ${err.message}`, { title: 'Bài học', icon: '📖', tone: 'rose' });
    } finally {
        hideLoadingOverlay();
    }
}

function renderBaiHocLesson_(lesson, pageNo) {
    const title = document.getElementById('bai-hoc-lesson-title');
    const meta = document.getElementById('bai-hoc-lesson-meta');
    const tabs = document.getElementById('bai-hoc-page-tabs');
    const content = document.getElementById('bai-hoc-page-content');
    if (!content) return;
    if (title) { title.textContent = ''; title.className = 'hidden'; }
    if (meta) { meta.textContent = `Bài ${lesson.bai} · ${lesson.theme || ''}`; meta.className = 'text-base md:text-lg font-extrabold text-purple-600'; }
    const back = document.getElementById('btn-back-bai-hoc-list');
    if (back) back.onclick = () => openBaiHocHub(lesson.semester);

    const labels = [['🔎','Khám phá'], ['✏️','Luyện cùng cô'], ['🌟','Ghi nhớ & Vận dụng']];
    if (tabs) tabs.innerHTML = labels.map((x, i) => {
        const n = i + 1, active = n === Number(pageNo);
        return `<button onclick="openBaiHocLesson(${lesson.bai}, ${n})" class="h-10 rounded-xl border font-black text-[11px] md:text-xs ${active ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white border-purple-400 shadow-md' : 'bg-pink-50/70 text-purple-700 border-pink-200 hover:bg-purple-50'}">${x[0]} ${x[1]}</button>`;
    }).join('');

    const page = (lesson.pages || []).find(p => Number(p.page_no) === Number(pageNo)) || lesson.pages?.[pageNo - 1] || {};
    if (page.page_type === 'guided_practice') content.innerHTML = renderMathGuidedPage_(page, lesson);
    else if (page.page_type === 'summary') content.innerHTML = renderMathSummaryPage_(page, lesson);
    else content.innerHTML = renderMathDiscoveryPage_(page, lesson);

    const nav = document.getElementById('bai-hoc-bottom-nav');
    if (nav) {
        const prev = pageNo > 1 ? `<button onclick="openBaiHocLesson(${lesson.bai}, ${pageNo - 1})" class="px-4 py-2.5 rounded-xl bg-white border border-purple-200 text-purple-700 font-black text-xs">← Trang trước</button>` : '<span></span>';
        const next = pageNo < 3 ? `<button onclick="openBaiHocLesson(${lesson.bai}, ${pageNo + 1})" class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-black text-xs shadow-sm">Trang tiếp →</button>` : `<button onclick="openRoadmap(${lesson.semester})" class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-black text-xs shadow-sm">✏️ Sang Bài tập</button>`;
        nav.innerHTML = `${prev}<div class="text-[11px] font-black text-slate-400">${pageNo}/3</div>${next}`;
    }
}

function renderMathLessonGeometry_(lesson) {
    const bai = Number(lesson && lesson.bai || 0);
    const wrap = (title, body, tone = 'violet') => `
        <section class="math-lesson-visual rounded-2xl border border-${tone}-200 bg-gradient-to-br from-${tone}-50 via-white to-sky-50 p-3.5 md:p-4">
            <div class="math-lesson-visual-title font-black text-${tone}-700 mb-3">${title}</div>
            ${body}
        </section>`;
    const dot = (n, cls='bg-pink-400') => `<div class="flex flex-wrap gap-2 justify-center">${Array.from({length:n},()=>`<span class="w-8 h-8 rounded-full ${cls} border border-white shadow-sm"></span>`).join('')}</div>`;
    const tenFrame = (n) => `<div class="grid grid-cols-5 gap-1.5 w-fit mx-auto p-2 rounded-xl bg-white border border-sky-200">${Array.from({length:10},(_,i)=>`<span class="w-8 h-8 rounded-md border ${i<n?'bg-sky-400 border-sky-500':'bg-white border-slate-200'}"></span>`).join('')}</div>`;
    const placeValue = (tens, ones, op = '') => `<div class="flex items-end justify-center gap-3"><div class="text-center"><div class="flex gap-1">${Array.from({length:tens},()=>'<span class="inline-block w-4 h-20 rounded bg-amber-300 border border-amber-500"></span>').join('')}</div><div class="mt-1 font-black text-amber-700">${tens} chục</div></div>${op?`<div class="text-2xl font-black text-purple-600 pb-8">${op}</div>`:''}<div class="text-center"><div class="flex flex-wrap max-w-[120px] gap-1 justify-center">${Array.from({length:ones},()=>'<span class="inline-block w-4 h-4 rounded bg-sky-400 border border-sky-500"></span>').join('')}</div><div class="mt-1 font-black text-sky-700">${ones} đơn vị</div></div></div>`;

    if (bai === 1) return wrap('🔢 Nhìn số bằng lượng thật', `
        <div class="grid md:grid-cols-3 gap-3 items-stretch">
            <div class="math-visual-card"><div class="math-big-number">0</div><div class="math-visual-caption">Không có chấm nào</div></div>
            <div class="math-visual-card"><div class="math-big-number text-pink-600">3</div>${dot(3)}<div class="math-visual-caption">Ba chấm</div></div>
            <div class="math-visual-card"><div class="math-big-number text-purple-600">5</div>${dot(5,'bg-purple-400')}<div class="math-visual-caption">Năm chấm</div></div>
        </div>`,'pink');

    if (bai === 2) return wrap('🔟 Các số 6–10 trên khung mười', `
        <div class="grid grid-cols-2 md:grid-cols-5 gap-3">
            ${[6,7,8,9,10].map(n=>`<div class="math-visual-card"><div class="math-big-number text-sky-600">${n}</div>${tenFrame(n)}</div>`).join('')}
        </div>`,'sky');

    if (bai === 3) return wrap('⚖️ Nhiều hơn – ít hơn – bằng nhau', `
        <div class="grid md:grid-cols-3 gap-3">
            <div class="math-visual-card">${dot(5)}<div class="text-3xl font-black text-rose-600 my-2">&gt;</div>${dot(3,'bg-sky-400')}<div class="math-visual-caption">5 nhiều hơn 3</div></div>
            <div class="math-visual-card">${dot(2,'bg-emerald-400')}<div class="text-3xl font-black text-emerald-600 my-2">=</div>${dot(2,'bg-emerald-400')}<div class="math-visual-caption">2 bằng 2</div></div>
            <div class="math-visual-card">${dot(2,'bg-amber-400')}<div class="text-3xl font-black text-indigo-600 my-2">&lt;</div>${dot(4,'bg-indigo-400')}<div class="math-visual-caption">2 ít hơn 4</div></div>
        </div>`,'emerald');

    if (bai === 4) return wrap('🔎 So sánh số bằng dấu', `
        <div class="grid md:grid-cols-3 gap-3 text-center">
            ${[['7','>','4','Bảy lớn hơn bốn'],['3','<','6','Ba bé hơn sáu'],['5','=','5','Năm bằng năm']].map(x=>`<div class="math-visual-card"><div class="flex items-center justify-center gap-4"><span class="math-big-number text-blue-600">${x[0]}</span><span class="text-4xl font-black text-fuchsia-600">${x[1]}</span><span class="math-big-number text-emerald-600">${x[2]}</span></div><div class="math-visual-caption">${x[3]}</div></div>`).join('')}
        </div>`,'blue');

    if (bai === 5) return wrap('🧠 Một số có thể tách thành mấy và mấy', `
        <div class="grid md:grid-cols-2 gap-3 items-center">
            <div class="math-visual-card"><svg viewBox="0 0 320 170" class="w-full max-w-[360px] mx-auto" role="img" aria-label="Sơ đồ tách số 7 thành 5 và 2"><circle cx="160" cy="42" r="30" fill="#ddd6fe" stroke="#7c3aed" stroke-width="4"/><text x="160" y="52" text-anchor="middle" font-size="30" font-weight="900" fill="#6d28d9">7</text><line x1="145" y1="70" x2="98" y2="118" stroke="#64748b" stroke-width="4"/><line x1="175" y1="70" x2="222" y2="118" stroke="#64748b" stroke-width="4"/><circle cx="88" cy="132" r="26" fill="#fbcfe8" stroke="#db2777" stroke-width="4"/><text x="88" y="141" text-anchor="middle" font-size="27" font-weight="900" fill="#be185d">5</text><circle cx="232" cy="132" r="26" fill="#bae6fd" stroke="#0284c7" stroke-width="4"/><text x="232" y="141" text-anchor="middle" font-size="27" font-weight="900" fill="#0369a1">2</text></svg></div>
            <div class="math-visual-card"><div class="text-2xl md:text-3xl font-black text-purple-700">7 = 5 + 2</div><div class="mt-2 text-base md:text-lg font-bold text-slate-700">Cùng một số có thể được ghép từ hai phần.</div></div>
        </div>`,'purple');

    if (bai === 7) return wrap('🔷 Cùng nhìn thật rõ bốn hình cơ bản', `
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div class="math-visual-card"><svg viewBox="0 0 140 120" class="w-full h-[108px]" role="img" aria-label="Hình vuông"><rect x="32" y="18" width="76" height="76" rx="3" fill="#f9a8d4" stroke="#be185d" stroke-width="5"/></svg><div class="font-black text-pink-700 text-lg">Hình vuông</div></div>
            <div class="math-visual-card"><svg viewBox="0 0 140 120" class="w-full h-[108px]" role="img" aria-label="Hình tròn"><circle cx="70" cy="56" r="39" fill="#7dd3fc" stroke="#0369a1" stroke-width="5"/></svg><div class="font-black text-sky-700 text-lg">Hình tròn</div></div>
            <div class="math-visual-card"><svg viewBox="0 0 140 120" class="w-full h-[108px]" role="img" aria-label="Hình tam giác"><polygon points="70,14 116,96 24,96" fill="#86efac" stroke="#047857" stroke-width="5" stroke-linejoin="round"/></svg><div class="font-black text-emerald-700 text-lg">Hình tam giác</div></div>
            <div class="math-visual-card"><svg viewBox="0 0 140 120" class="w-full h-[108px]" role="img" aria-label="Hình chữ nhật"><rect x="18" y="31" width="104" height="58" rx="3" fill="#fde68a" stroke="#b45309" stroke-width="5"/></svg><div class="font-black text-amber-700 text-lg">Hình chữ nhật</div></div>
        </div>
        <div class="mt-3 grid md:grid-cols-[220px_1fr] gap-3 items-center math-visual-card"><svg viewBox="0 0 220 150" class="w-full max-w-[220px] mx-auto" role="img" aria-label="Hình vuông xoay nghiêng"><g transform="translate(110 75) rotate(45)"><rect x="-42" y="-42" width="84" height="84" rx="3" fill="#ddd6fe" stroke="#7c3aed" stroke-width="5"/></g></svg><div><div class="font-black text-purple-700 text-lg">Xoay nghiêng thì hình vẫn không đổi tên</div><div class="text-base md:text-lg font-semibold text-slate-700 leading-7 mt-1">Con hãy nhìn <b>đường bao</b>, đừng dựa vào màu sắc hay hướng đặt.</div></div></div>`,'sky');

    if (bai === 8) return wrap('🧩 Ghép hình từ những mảnh nhỏ', `
        <div class="grid md:grid-cols-2 gap-3">
            <div class="math-visual-card"><div class="font-black text-slate-800 text-center mb-2">Hai tam giác ghép thành một hình vuông</div><svg viewBox="0 0 320 190" class="w-full h-auto" role="img" aria-label="Hai tam giác ghép thành hình vuông"><rect x="84" y="28" width="132" height="132" rx="5" fill="#ffffff" stroke="#64748b" stroke-width="3"/><polygon points="84,28 216,28 84,160" fill="#f9a8d4" stroke="#be185d" stroke-width="4"/><polygon points="216,28 216,160 84,160" fill="#93c5fd" stroke="#1d4ed8" stroke-width="4"/><line x1="84" y1="160" x2="216" y2="28" stroke="#475569" stroke-width="3" stroke-dasharray="7 6"/></svg></div>
            <div class="math-visual-card"><div class="font-black text-slate-800 text-center mb-2">Ngôi nhà được tạo từ nhiều hình</div><svg viewBox="0 0 340 210" class="w-full h-auto" role="img" aria-label="Ngôi nhà ghép từ các hình"><polygon points="170,22 72,96 268,96" fill="#fb7185" stroke="#be123c" stroke-width="4"/><rect x="94" y="96" width="152" height="94" rx="3" fill="#fde68a" stroke="#b45309" stroke-width="4"/><rect x="151" y="132" width="38" height="58" rx="2" fill="#fdba74" stroke="#c2410c" stroke-width="4"/><rect x="111" y="115" width="30" height="30" fill="#bfdbfe" stroke="#2563eb" stroke-width="3"/><rect x="199" y="115" width="30" height="30" fill="#bfdbfe" stroke="#2563eb" stroke-width="3"/></svg></div>
        </div>`,'violet');

    if (bai === 10) return wrap('➕ Phép cộng là gộp hai nhóm lại', `
        <div class="grid md:grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-3"><div class="math-visual-card">${dot(3,'bg-pink-400')}</div><div class="math-symbol">+</div><div class="math-visual-card">${dot(2,'bg-sky-400')}</div><div class="math-symbol">=</div><div class="math-visual-card">${dot(5,'bg-emerald-400')}<div class="math-visual-caption">3 + 2 = 5</div></div></div>`,'emerald');

    if (bai === 11) return wrap('➖ Phép trừ là bớt đi', `
        <div class="grid md:grid-cols-2 gap-3"><div class="math-visual-card">${dot(5,'bg-amber-400')}<div class="mt-3 flex justify-center gap-2"><span class="px-3 py-1.5 rounded-full bg-rose-100 text-rose-700 font-black line-through">2 chấm bớt đi</span></div></div><div class="math-visual-card"><div class="text-3xl md:text-4xl font-black text-purple-700">5 − 2 = 3</div><div class="math-visual-caption">Còn lại 3</div></div></div>`,'amber');

    if (bai === 12) return wrap('🔄 Một gia đình phép tính', `
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">${['3 + 4 = 7','4 + 3 = 7','7 − 3 = 4','7 − 4 = 3'].map((x,i)=>`<div class="math-visual-card"><div class="text-2xl md:text-3xl font-black ${i<2?'text-emerald-700':'text-rose-700'}">${x}</div></div>`).join('')}</div>`,'purple');

    if (bai === 14) return wrap('🧊 Phân biệt khối lập phương và khối hộp chữ nhật', `
        <div class="grid md:grid-cols-2 gap-3">
            <div class="math-visual-card"><svg viewBox="0 0 300 230" class="w-full max-w-[330px] mx-auto" role="img" aria-label="Khối lập phương"><polygon points="82,68 176,38 230,82 137,113" fill="#c4b5fd" stroke="#6d28d9" stroke-width="4"/><polygon points="82,68 137,113 137,202 82,157" fill="#ddd6fe" stroke="#6d28d9" stroke-width="4"/><polygon points="137,113 230,82 230,171 137,202" fill="#a78bfa" stroke="#6d28d9" stroke-width="4"/></svg><div class="text-xl font-black text-violet-700">Khối lập phương</div><div class="math-visual-caption">Các mặt có dạng hình vuông</div></div>
            <div class="math-visual-card"><svg viewBox="0 0 340 230" class="w-full max-w-[360px] mx-auto" role="img" aria-label="Khối hộp chữ nhật"><polygon points="62,80 210,46 282,88 135,123" fill="#bae6fd" stroke="#0369a1" stroke-width="4"/><polygon points="62,80 135,123 135,190 62,147" fill="#e0f2fe" stroke="#0369a1" stroke-width="4"/><polygon points="135,123 282,88 282,155 135,190" fill="#7dd3fc" stroke="#0369a1" stroke-width="4"/></svg><div class="text-xl font-black text-sky-700">Khối hộp chữ nhật</div><div class="math-visual-caption">Dài – rộng – cao có thể khác nhau</div></div>
        </div>
        <div class="mt-3 grid grid-cols-2 md:grid-cols-4 gap-2 text-center"><div class="math-object-chip">🎲 Xúc xắc → lập phương</div><div class="math-object-chip">🧊 Khối đồ chơi → lập phương</div><div class="math-object-chip">📦 Hộp quà dài → hộp chữ nhật</div><div class="math-object-chip">📚 Quyển sách dày → hộp chữ nhật</div></div>`,'violet');

    if (bai === 15) return wrap('🧭 Nhìn vị trí từ một điểm mốc', `
        <div class="math-visual-card max-w-[620px] mx-auto"><div class="grid grid-cols-3 grid-rows-3 gap-2 items-center text-center min-h-[260px]"><div></div><div class="math-position-chip">⬆️ Trên</div><div></div><div class="math-position-chip">⬅️ Trái</div><div class="w-24 h-24 mx-auto rounded-full bg-pink-200 border-2 border-pink-400 flex items-center justify-center font-black text-pink-800">BÉ</div><div class="math-position-chip">Phải ➡️</div><div></div><div class="math-position-chip">⬇️ Dưới</div><div></div></div></div>`,'cyan');

    if (bai === 21) return wrap('🔟 Số có hai chữ số = chục + đơn vị', `
        <div class="grid md:grid-cols-2 gap-3 items-center"><div class="math-visual-card">${placeValue(3,4)}</div><div class="math-visual-card"><div class="text-4xl font-black text-purple-700">34</div><div class="mt-2 text-lg font-bold text-slate-700">3 chục và 4 đơn vị</div><div class="mt-2 text-2xl font-black text-slate-800">34 = 30 + 4</div></div></div>`,'amber');

    if (bai === 22) return wrap('⚖️ So sánh số có hai chữ số', `
        <div class="grid md:grid-cols-[1fr_auto_1fr] items-center gap-3"><div class="math-visual-card">${placeValue(4,7)}<div class="mt-2 text-3xl font-black text-blue-700">47</div></div><div class="math-symbol">&gt;</div><div class="math-visual-card">${placeValue(4,2)}<div class="mt-2 text-3xl font-black text-emerald-700">42</div></div></div><div class="mt-3 text-center text-base md:text-lg font-bold text-slate-700">Cùng 4 chục nên so sánh tiếp hàng đơn vị: 7 &gt; 2.</div>`,'blue');

    if (bai === 23) return wrap('💯 Bảng số giúp nhìn thấy quy luật', `
        <div class="grid grid-cols-10 gap-1 max-w-[720px] mx-auto">${Array.from({length:100},(_,i)=>{const n=i+1;return `<span class="h-8 md:h-9 rounded-md flex items-center justify-center font-black text-[12px] md:text-sm ${n%10===0?'bg-purple-200 text-purple-800':'bg-white border border-slate-200 text-slate-700'}">${n}</span>`}).join('')}</div><div class="mt-2 text-center text-sm md:text-base font-bold text-purple-700">Các số tròn chục nằm ở cuối mỗi hàng.</div>`,'purple');

    if (bai === 25) return wrap('📏 Dài hơn – ngắn hơn', `
        <div class="grid md:grid-cols-2 gap-3"><div class="math-visual-card"><div class="h-5 rounded-full bg-pink-400 w-[92%] mx-auto"></div><div class="math-visual-caption">Băng hồng dài hơn</div></div><div class="math-visual-card"><div class="h-5 rounded-full bg-sky-400 w-[58%] mx-auto"></div><div class="math-visual-caption">Băng xanh ngắn hơn</div></div></div><div class="mt-3 text-center text-base md:text-lg font-bold text-slate-700">Muốn so sánh đúng, đặt hai đầu vật cùng một điểm bắt đầu.</div>`,'pink');

    if (bai === 26) return wrap('📐 Đo bằng các đơn vị bằng nhau', `
        <div class="math-visual-card"><div class="flex justify-center gap-1">${Array.from({length:8},(_,i)=>`<span class="w-12 h-12 border-2 border-sky-400 ${i%2?'bg-sky-100':'bg-white'} flex items-center justify-center font-black text-sky-700">${i+1}</span>`).join('')}</div><div class="math-visual-caption">Thanh dài 8 đơn vị</div></div>`,'sky');

    if (bai === 27) return wrap('🎯 Ước lượng trước – đo kiểm tra sau', `
        <div class="grid md:grid-cols-2 gap-3"><div class="math-visual-card"><div class="text-5xl">🤔</div><div class="text-xl font-black text-purple-700 mt-2">Con đoán: khoảng 6 đơn vị</div></div><div class="math-visual-card"><div class="flex justify-center gap-1">${Array.from({length:7},(_,i)=>`<span class="w-10 h-10 rounded border border-emerald-400 bg-emerald-100 flex items-center justify-center font-black">${i+1}</span>`).join('')}</div><div class="text-xl font-black text-emerald-700 mt-2">Đo thật: 7 đơn vị</div></div></div>`,'emerald');

    if (bai === 29) return wrap('➕ Cộng số có hai chữ số với số có một chữ số', `
        <div class="grid md:grid-cols-[1fr_auto_1fr] gap-3 items-center"><div class="math-visual-card">${placeValue(2,3)}<div class="math-visual-caption">23</div></div><div class="math-symbol">+ 4</div><div class="math-visual-card">${placeValue(2,7)}<div class="math-visual-caption">27</div></div></div><div class="mt-3 text-center text-base md:text-lg font-bold text-slate-700">Giữ nguyên 2 chục, gộp 3 đơn vị với 4 đơn vị.</div>`,'emerald');

    if (bai === 30) return wrap('➕ Cộng chục với chục, đơn vị với đơn vị', `
        <div class="grid md:grid-cols-3 gap-3 items-center"><div class="math-visual-card"><div class="text-3xl font-black text-blue-700">23</div>${placeValue(2,3)}</div><div class="math-visual-card"><div class="text-3xl font-black text-pink-700">+ 14</div>${placeValue(1,4)}</div><div class="math-visual-card"><div class="text-4xl font-black text-emerald-700">= 37</div>${placeValue(3,7)}</div></div>`,'blue');

    if (bai === 31) return wrap('➖ Bớt ở hàng đơn vị', `
        <div class="grid md:grid-cols-2 gap-3 items-center"><div class="math-visual-card"><div class="text-3xl font-black text-blue-700">27</div>${placeValue(2,7)}</div><div class="math-visual-card"><div class="text-3xl font-black text-rose-700">27 − 4 = 23</div><div class="mt-3 text-base md:text-lg font-bold text-slate-700">2 chục giữ nguyên, 7 đơn vị bớt 4 còn 3.</div></div></div>`,'rose');

    if (bai === 32) return wrap('➖ Trừ chục với chục, đơn vị với đơn vị', `
        <div class="grid md:grid-cols-3 gap-3"><div class="math-visual-card"><div class="text-3xl font-black text-blue-700">46</div>${placeValue(4,6)}</div><div class="math-visual-card"><div class="text-3xl font-black text-rose-700">− 23</div>${placeValue(2,3)}</div><div class="math-visual-card"><div class="text-4xl font-black text-emerald-700">= 23</div>${placeValue(2,3)}</div></div>`,'rose');

    if (bai === 34) return wrap('🕒 Xem giờ đúng trên đồng hồ', `
        <div class="grid md:grid-cols-2 gap-3 items-center"><div class="math-visual-card"><svg viewBox="0 0 260 260" class="w-full max-w-[280px] mx-auto" role="img" aria-label="Đồng hồ chỉ 3 giờ"><circle cx="130" cy="130" r="102" fill="#fff" stroke="#7c3aed" stroke-width="6"/>${Array.from({length:12},(_,i)=>{const a=(i*30-90)*Math.PI/180;const x=130+80*Math.cos(a),y=130+80*Math.sin(a);return `<text x="${x.toFixed(1)}" y="${(y+6).toFixed(1)}" text-anchor="middle" font-size="17" font-weight="900" fill="#475569">${i===0?12:i}</text>`}).join('')}<line x1="130" y1="130" x2="130" y2="70" stroke="#db2777" stroke-width="7" stroke-linecap="round"/><line x1="130" y1="130" x2="190" y2="130" stroke="#2563eb" stroke-width="8" stroke-linecap="round"/><circle cx="130" cy="130" r="8" fill="#111827"/></svg></div><div class="math-visual-card"><div class="text-5xl font-black text-purple-700">3:00</div><div class="math-visual-caption">Kim phút ở số 12, kim giờ ở số 3 → 3 giờ đúng.</div></div></div>`,'purple');

    if (bai === 35) return wrap('📅 Một tuần có 7 ngày', `
        <div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">${['Thứ hai','Thứ ba','Thứ tư','Thứ năm','Thứ sáu','Thứ bảy','Chủ nhật'].map((d,i)=>`<div class="rounded-xl p-3 text-center font-black ${i===6?'bg-rose-100 text-rose-700 border border-rose-200':'bg-white text-purple-700 border border-purple-100'}">${d}</div>`).join('')}</div><div class="mt-3 text-center text-base md:text-lg font-bold text-slate-700">Hôm nay → ngày mai → ngày kia: các ngày nối tiếp nhau theo thứ tự.</div>`,'amber');

    if (bai === 36) return wrap('🗓️ Đọc lịch rồi ghép với giờ', `
        <div class="grid md:grid-cols-2 gap-3"><div class="math-visual-card"><div class="grid grid-cols-7 gap-1 max-w-[420px] mx-auto">${['T2','T3','T4','T5','T6','T7','CN'].map(x=>`<span class="font-black text-purple-700">${x}</span>`).join('')}${Array.from({length:14},(_,i)=>`<span class="h-9 rounded flex items-center justify-center font-black ${i===8?'bg-pink-300 text-pink-900':'bg-slate-50 border border-slate-200 text-slate-600'}">${i+1}</span>`).join('')}</div></div><div class="math-visual-card"><div class="text-5xl">🕗</div><div class="text-2xl font-black text-sky-700 mt-2">8 giờ</div><div class="math-visual-caption">Chọn đúng ngày trên lịch và đúng giờ trên đồng hồ.</div></div></div>`,'sky');

    return wrap('👀 Cùng nhìn bằng mô hình', `<div class="grid gap-2">${(lesson?.pages?.[0]?.visual_models || []).map((m,i)=>`<div class="math-visual-card text-left"><div class="font-black text-purple-700">Bước ${i+1}</div><div class="mt-1 text-base md:text-lg font-semibold text-slate-700">${escapeHtml(m.instruction || '')}</div></div>`).join('')}</div>`,'purple');
}

function renderMathDiscoveryPage_(page, lesson) {
    const blocks = (page.concept_blocks || []).map((b, i) => `
        <div class="rounded-2xl border ${i % 2 ? 'border-purple-100 bg-purple-50/60' : 'border-pink-100 bg-pink-50/60'} p-3.5">
            <div class="font-black text-slate-800 text-sm md:text-base">${i + 1}. ${escapeHtml(b.heading || '')}</div>
            <div class="text-sm md:text-base text-slate-700 font-semibold leading-7 mt-1">${escapeHtml(b.text || '')}</div>
            ${b.example ? `<div class="mt-2 px-3 py-2 rounded-xl bg-white border border-white text-purple-700 font-bold text-sm">💡 Ví dụ: ${escapeHtml(b.example)}</div>` : ''}
        </div>`).join('');
    const models = (page.visual_models || []).map(m => `<div class="rounded-xl bg-white border border-emerald-100 px-3 py-2.5 text-sm font-semibold text-slate-700">🧩 ${escapeHtml(m.instruction || '')}</div>`).join('');
    return `<div class="space-y-3">
        <section class="rounded-2xl bg-gradient-to-r from-pink-50 to-purple-50 border border-pink-200 p-4 text-center">
            <div class="text-[11px] font-black text-pink-600">🎯 MỤC TIÊU BÀI HỌC</div>
            <div class="font-black text-slate-800 text-base md:text-lg leading-7 mt-1">${escapeHtml(page.goal || page.intro || lesson.source_title || '')}</div>
        </section>
        ${renderMathLessonGeometry_(lesson)}
        ${renderLessonCatalogImages_(lesson)}
        <section class="grid gap-3">${blocks}</section>
        ${models ? `<section class="rounded-2xl bg-emerald-50/60 border border-emerald-100 p-3.5"><div class="font-black text-emerald-700 mb-2">👀 Mô hình trực quan</div><div class="grid gap-2">${models}</div></section>` : ''}
    </div>`;
}

function renderMathGuidedPage_(page, lesson) {
    const items = (page.items || []).map((item, i) => renderMathLessonItem_(item, i, lesson)).join('');
    return `<div class="space-y-3">
        <section class="rounded-2xl bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 p-3.5">
            <div class="font-black text-purple-700">🐰 Cùng Cô Thỏ Hồng làm từng bước</div>
            <div class="text-sm md:text-base font-semibold text-slate-700 mt-1 leading-7">${escapeHtml(page.recall || '')}</div>
        </section>
        <section class="space-y-3">${items}</section>
    </div>`;
}

function renderMathLessonItem_(item, index, lesson) {
    const id = `bh-${lesson.bai}-${index}`;
    if (item.type === 'choice') {
        return `<div id="${id}" class="rounded-2xl bg-pink-50/60 border border-pink-100 p-3.5">
            <div class="font-black text-slate-800 text-sm md:text-base mb-2">${index + 1}. ${escapeHtml(item.prompt || '')}</div>
            <div class="grid gap-2">${(item.options || []).map((op, j) => `<button onclick="checkMathLessonChoice_('${id}', ${j}, ${Number(item.answer || 0)}, '${escapeJsString_(item.explanation || '')}')" class="bh-choice w-full text-left px-3 py-2.5 rounded-xl bg-white border border-pink-200 font-bold text-sm md:text-base">${String.fromCharCode(65 + j)}. ${escapeHtml(op)}</button>`).join('')}</div>
            <div class="bh-feedback hidden mt-2 text-sm font-bold"></div>
        </div>`;
    }
    if (item.type === 'fill') {
        return `<div id="${id}" class="rounded-2xl bg-sky-50/60 border border-sky-100 p-3.5">
            <div class="font-black text-slate-800 text-sm md:text-base">${index + 1}. ${escapeHtml(item.prompt || '')}</div>
            <div class="flex gap-2 mt-2"><input class="bh-fill flex-1 min-w-0 px-3 py-2 rounded-xl border border-sky-200 bg-white font-black text-center" inputmode="numeric" placeholder="Điền đáp án"><button onclick="checkMathLessonFill_('${id}', '${escapeJsString_(String(item.answer ?? ''))}', '${escapeJsString_(item.hint || '')}')" class="px-4 py-2 rounded-xl bg-sky-500 text-white font-black text-xs">Kiểm tra</button></div>
            <div class="bh-feedback hidden mt-2 text-sm font-bold"></div>
        </div>`;
    }
    if (item.type === 'sequence') {
        return `<div id="${id}" class="rounded-2xl bg-purple-50/60 border border-purple-100 p-3.5"><div class="font-black text-slate-800 text-sm md:text-base">${index + 1}. ${escapeHtml(item.prompt || '')}</div><button onclick="toggleMathLessonAnswer_('${id}', '${escapeJsString_(String(item.answer ?? ''))}')" class="mt-2 px-3 py-2 rounded-xl bg-white border border-purple-200 text-purple-700 font-black text-xs">💡 Kiểm tra cách làm</button><div class="bh-feedback hidden mt-2 text-sm font-bold text-emerald-700"></div></div>`;
    }
    return `<div class="rounded-2xl bg-emerald-50/60 border border-emerald-100 p-3.5"><div class="font-black text-slate-800 text-sm md:text-base">${index + 1}. 🌱 ${escapeHtml(item.prompt || '')}</div><div class="text-xs text-emerald-700 font-bold mt-1">Con nói hoặc làm bằng đồ vật thật quanh mình nhé.</div></div>`;
}

function checkMathLessonChoice_(boxId, selected, answer, explanation) {
    const box = document.getElementById(boxId);
    if (!box) return;
    const buttons = [...box.querySelectorAll('.bh-choice')];
    buttons.forEach((b, i) => {
        b.disabled = true;
        if (i === Number(answer)) b.classList.add('bg-emerald-100','border-emerald-400','text-emerald-800');
        else if (i === Number(selected)) b.classList.add('bg-rose-100','border-rose-400','text-rose-800');
    });
    const ok = Number(selected) === Number(answer);
    const fb = box.querySelector('.bh-feedback');
    if (fb) {
        fb.textContent = ok ? `✅ Chính xác! ${explanation || ''}` : `💡 Chưa đúng. ${explanation || 'Con xem lại phần Khám phá rồi thử lại nhé.'}`;
        fb.className = `bh-feedback mt-2 text-sm font-bold ${ok ? 'text-emerald-700' : 'text-rose-700'}`;
    }
}

function checkMathLessonFill_(boxId, answer, hint) {
    const box = document.getElementById(boxId);
    const input = box?.querySelector('.bh-fill');
    const fb = box?.querySelector('.bh-feedback');
    if (!box || !input || !fb) return;
    const ok = String(input.value || '').trim().toLowerCase() === String(answer || '').trim().toLowerCase();
    input.classList.toggle('border-emerald-400', ok);
    input.classList.toggle('border-rose-400', !ok);
    fb.textContent = ok ? '✅ Đúng rồi!' : `💡 Con thử lại nhé. ${hint || ''}`;
    fb.className = `bh-feedback mt-2 text-sm font-bold ${ok ? 'text-emerald-700' : 'text-rose-700'}`;
}

function toggleMathLessonAnswer_(boxId, answer) {
    const fb = document.getElementById(boxId)?.querySelector('.bh-feedback');
    if (!fb) return;
    fb.textContent = `✅ Đáp án để con tự kiểm tra: ${answer}`;
    fb.classList.remove('hidden');
}

function renderMathSummaryPage_(page, lesson) {
    const points = (page.key_points || []).map(x => `<li>${escapeHtml(x)}</li>`).join('');
    const mistakes = (page.common_mistakes || []).map(x => `<li>${escapeHtml(x)}</li>`).join('');
    const checks = (page.self_check || []).map(x => `<label class="flex gap-2 items-start text-sm font-semibold text-slate-700"><input type="checkbox" class="mt-1 accent-emerald-500"><span>${escapeHtml(x)}</span></label>`).join('');
    return `<div class="space-y-3">
        <section class="rounded-3xl bg-gradient-to-br from-amber-50 via-pink-50 to-purple-50 border-2 border-amber-200 p-4 md:p-5"><div class="text-[11px] font-black text-amber-600">🌟 CON CẦN NHỚ</div><ul class="list-disc pl-5 mt-3 space-y-2 text-sm md:text-base text-slate-700 font-semibold leading-7">${points}</ul></section>
        ${mistakes ? `<section class="rounded-2xl bg-rose-50/70 border border-rose-100 p-4"><div class="font-black text-rose-700 mb-2">⚠️ Lỗi dễ mắc</div><ul class="list-disc pl-5 space-y-1.5 text-sm font-semibold text-slate-700">${mistakes}</ul></section>` : ''}
        <section class="rounded-2xl bg-emerald-50/70 border border-emerald-100 p-4"><div class="font-black text-emerald-700 mb-2">✅ Con tự kiểm tra</div><div class="grid gap-2">${checks}</div></section>
        <section class="rounded-2xl bg-purple-50 border border-purple-100 p-4"><div class="font-black text-purple-700">🌱 Vận dụng</div><div class="text-sm md:text-base font-semibold text-slate-700 mt-1 leading-7">${escapeHtml(page.finish_prompt || '')}</div></section>
    </div>`;
}

function clickProgressOrExam(type) {
    if (type === 'progress') openRoadmap();
    else if (type === 'exam') openExamHub();
}


// ==========================================
// MATH LAB - MỤC 12: TOÁN TƯ DUY MỸ - GRADE 1
// Nội dung kiến thức vẫn bám Toán 1 Việt Nam; cấu trúc trải nghiệm tham chiếu
// Common Core Grade 1 + Mathematical Practices và tiến trình sư phạm IES/NCTM.
// 12.1/12.2 giữ nguyên ID nội bộ để không phá dữ liệu tiến độ hiện có.
// ==========================================
const EPSILON_GRADE1_LABS_ = [
    { code:'12.1', internal_id:'EPSILON_NUMBER_SENSE', engine:'number_sense', icon:'🔢', title:'Number Sense Lab - Cảm nhận số', description:'Nhìn lượng, đếm có ý nghĩa, so sánh, biểu diễn và cấu tạo số bằng nhiều mô hình.', planned_journeys:12, status:'active' },
    { code:'12.2', internal_id:'EPSILON_OPERATION_SENSE', engine:'operation_sense', icon:'➕', title:'Addition & Subtraction Lab - Tư duy cộng trừ', description:'Hiểu thêm - bớt - gộp - tách, số còn thiếu, bằng nhau, gia đình phép tính và chiến lược làm 10.', planned_journeys:14, status:'active' },
    { code:'12.3', engine:'place_value', icon:'🔟', title:'Place Value Lab - Chục, đơn vị & số đến 100', description:'Nhóm chục, giá trị hàng, biểu diễn số, so sánh và tính dựa trên cấu trúc chục - đơn vị.', planned_journeys:12, status:'active' },
    { code:'12.4', engine:'measurement_data', icon:'📏', title:'Measurement & Data Lab - Đo lường, thời gian & dữ liệu', description:'Đo bằng đơn vị lặp, so sánh độ dài, xem giờ, lịch và đọc - tổ chức dữ liệu trực quan.', planned_journeys:10, status:'active' },
    { code:'12.5', engine:'geometry_spatial', icon:'🔷', title:'Geometry & Spatial Lab - Hình học & không gian', description:'Thuộc tính hình, xoay - ghép - tách hình, vị trí không gian và chia hình thành các phần bằng nhau.', planned_journeys:10, status:'active' },
    { code:'12.6', engine:'modeling_reasoning', icon:'🧠', title:'Modeling & Reasoning Lab - Mô hình hóa & lập luận', description:'Giải tình huống bằng vật thật, sơ đồ và phương trình; giải thích cách nghĩ, kiểm tra và tìm nhiều cách giải.', planned_journeys:14, status:'active' }
];

const EPSILON_GRADE1_BLUEPRINTS_ = {
    '12.3': {
        code:'12.3',
        icon:'🔟',
        title:'Place Value Lab - Chục, đơn vị & số đến 100',
        tagline:'Nhìn số theo cấu trúc chục - đơn vị, không chỉ đọc thuộc lòng.',
        focus:'Trọng tâm là gom 10 thành 1 chục, đọc - viết - biểu diễn số, so sánh số và dùng cấu trúc chục đơn vị để tính.',
        vn_link:'Bám mục 3 Toán 1: số đến 100, cấu tạo số, bảng số, số tròn chục, so sánh và tính không nhớ.',
        pedagogy:['Concrete → Pictorial → Abstract', 'Giải thích bằng lời: “vì sao con biết?”', 'Từ mô hình bó chục sang kí hiệu toán học'],
        journeys:[
            ['1','Bó chục đầu tiên','Con gom 10 que/đồ vật thành 1 bó chục và nhận ra 1 chục = 10 đơn vị.'],
            ['2','10 và mấy','Con đọc các số dạng 10 và mấy bằng mô hình bó chục + đồ rời.'],
            ['3','Viết số bằng chục và đơn vị','Con nối mô hình với số đúng, ví dụ 3 chục 8 đơn vị = 38.'],
            ['4','Một số có nhiều cách biểu diễn','Con biểu diễn cùng một số bằng que tính, khung chục và sơ đồ.'],
            ['5','So sánh theo hàng chục','Con biết số nào lớn hơn khi hàng chục khác nhau.'],
            ['6','So sánh theo hàng đơn vị','Khi cùng số chục, con so sánh tiếp hàng đơn vị.'],
            ['7','Số liền trước - liền sau','Con dùng tia số và bảng số để tìm số trước, sau, ở giữa.'],
            ['8','Số tròn chục','Con nhận ra các số 10, 20, 30... và vị trí của chúng.'],
            ['9','Tách số theo chục - đơn vị','Con tách 46 thành 40 và 6; 70 thành 7 chục và 0 đơn vị.'],
            ['10','Cộng theo cấu trúc chục','Con tính 23 + 4, 31 + 20 bằng cách gộp chục và đơn vị.'],
            ['11','Trừ theo cấu trúc chục','Con tính 57 - 3, 80 - 20 bằng cách bớt đơn vị hoặc bớt chục.'],
            ['12','Giải thích và khái quát','Con chọn chiến lược hợp lí rồi giải thích được vì sao kết quả đúng.']
        ]
    },
    '12.4': {
        code:'12.4',
        icon:'📏',
        title:'Measurement & Data Lab - Đo lường, thời gian & dữ liệu',
        tagline:'Đo để so sánh, đọc dữ liệu để kể lại bằng toán.',
        focus:'Trọng tâm là đo độ dài bằng đơn vị lặp, ước lượng, xem giờ đúng, lịch và đọc bảng tranh/cột đơn giản.',
        vn_link:'Kết nối các mạch độ dài, thời gian, lịch và bảng thống kê trực quan trong Toán 1.',
        pedagogy:['Học qua thao tác đo thật', 'So sánh trước khi tính', 'Đọc dữ liệu rồi nói thành câu'],
        journeys:[
            ['1','Dài hơn - ngắn hơn','Con so sánh hai đồ vật bằng quan sát và đặt chồng.'],
            ['2','Đo bằng đơn vị lặp','Con đo chiều dài bằng que, kẹp giấy hoặc ô vuông.'],
            ['3','Vì sao phải đặt sát đầu mút?','Con sửa lỗi khi đo và hiểu cách đo đúng.'],
            ['4','Ước lượng rồi kiểm tra','Con đoán trước rồi mới đo thật để kiểm chứng.'],
            ['5','So sánh ba độ dài','Con sắp xếp theo thứ tự ngắn → dài hoặc ngược lại.'],
            ['6','Giờ đúng trên đồng hồ','Con đọc giờ đúng và ghép với hoạt động hằng ngày.'],
            ['7','Ngày - tuần - lịch','Con xác định hôm qua, hôm nay, ngày mai và đọc lịch đơn giản.'],
            ['8','Bảng tranh','Con đếm dữ liệu bằng tranh rồi trả lời câu hỏi.'],
            ['9','Biểu đồ cột đơn giản','Con đọc cột cao thấp để biết nhiều hơn/ít hơn.'],
            ['10','Dự án mini','Con đo, ghi dữ liệu và kể lại kết quả bằng câu toán học.']
        ]
    },
    '12.5': {
        code:'12.5',
        icon:'🔷',
        title:'Geometry & Spatial Lab - Hình học & không gian',
        tagline:'Nhìn hình, gọi tên, mô tả thuộc tính và thao tác với hình.',
        focus:'Trọng tâm là nhận dạng hình phẳng, hình khối, ghép - tách hình, mô tả vị trí và chia hình thành phần bằng nhau.',
        vn_link:'Liên hệ chặt với mục 5 Hình học và mục 6 Vị trí - không gian của chương trình Toán 1.',
        pedagogy:['Nhìn thuộc tính trước khi nhớ tên', 'Xoay hình nhưng tên không đổi', 'Ghép - tách để thấy cấu tạo của hình'],
        journeys:[
            ['1','Nhìn và gọi tên hình','Con nhận ra hình tròn, tam giác, vuông, chữ nhật trong nhiều tư thế.'],
            ['2','Nói về đặc điểm của hình','Con mô tả số cạnh, góc, cạnh bằng nhau hoặc dài - ngắn.'],
            ['3','Hình nào khác loại?','Con phân loại theo dấu hiệu hình học chứ không theo màu sắc.'],
            ['4','Ghép hình mới từ hình quen','Con dùng các mảnh nhỏ để ghép thành hình lớn.'],
            ['5','Tách hình lớn thành hình nhỏ','Con tìm các hình ẩn trong một hình ghép.'],
            ['6','Hình khối trong đời sống','Con nối đồ vật thật với khối lập phương hoặc khối hộp chữ nhật.'],
            ['7','Vị trí trong không gian','Con nói được trên - dưới, trái - phải, trước - sau, trong - ngoài.'],
            ['8','Xoay và lật hình','Con nhận ra hình vẫn là cùng một hình khi thay đổi hướng.'],
            ['9','Chia hình thành hai phần bằng nhau','Con gấp/tô/chia hình thành các phần bằng nhau.'],
            ['10','Giải thích bằng lời','Con trả lời vì sao một hình là hình vuông hay vì sao hai cách ghép là giống nhau.']
        ]
    },
    '12.6': {
        code:'12.6',
        icon:'🧠',
        title:'Modeling & Reasoning Lab - Mô hình hóa & lập luận',
        tagline:'Biến tình huống thành mô hình toán và nói ra cách nghĩ của mình.',
        focus:'Trọng tâm là đọc tình huống, chọn mô hình phù hợp, viết câu số, thử nhiều chiến lược và kiểm tra lại lời giải.',
        vn_link:'Bổ trợ mạnh cho giải toán có lời văn, toán tư duy, mô hình thanh/sơ đồ và năng lực diễn đạt.',
        pedagogy:['Dùng vật thật → tranh → sơ đồ → phương trình', 'Nhiều chiến lược cùng đúng', 'Khuyến khích trẻ tự giải thích'],
        journeys:[
            ['1','Chuyện gì đang xảy ra?','Con đọc tranh/tình huống và xác định đây là gộp, bớt, so sánh hay tìm phần thiếu.'],
            ['2','Chọn mô hình đúng','Con chọn khung chục, sơ đồ phần - toàn thể hay đồ vật để biểu diễn.'],
            ['3','Viết câu số từ tranh','Con chuyển mô hình thành phép tính phù hợp.'],
            ['4','Một bài - nhiều cách làm','Con giải cùng bài bằng đồ vật, sơ đồ và câu số.'],
            ['5','Tìm số còn thiếu','Con dùng quan hệ giữa các số để tìm ô trống.'],
            ['6','So sánh để lập luận','Con nêu vì sao nhóm A nhiều hơn B, hay số này lớn hơn số kia.'],
            ['7','Kiểm tra lời giải','Con thay kết quả vào tình huống để xem có hợp lí không.'],
            ['8','Sửa một lời giải sai','Con tìm chỗ sai trong cách làm của bạn và nói vì sao sai.'],
            ['9','Gia đình phép tính','Con nhìn ba số để lập các phép cộng trừ liên quan.'],
            ['10','Bài toán hai bước rất nhẹ','Con giải tình huống cần suy nghĩ qua 2 ý nhỏ.'],
            ['11','Ước lượng hợp lí','Con đoán kết quả gần đúng trước khi giải.'],
            ['12','Giải thích bằng câu đầy đủ','Con không chỉ nói đáp án mà còn nói “Con làm thế nào”.'],
            ['13','Tạo bài toán của riêng con','Con tự đặt một bài toán từ tranh hoặc vật thật.'],
            ['14','Chuyển giao tình huống mới','Con dùng chiến lược đã học cho bài toán lạ nhưng cùng cấu trúc.']
        ]
    }
};


function getEpsilonLabAction_(lab) {
    if (!lab) return '';
    if (lab.engine === 'number_sense') return 'openNumberSenseHub()';
    if (lab.engine === 'operation_sense') return 'openOperationSenseHub()';
    return `openGenericMathLab_('${lab.code}')`;
}

function renderEpsilonLabBlueprint_(lab) {
    if (!lab) return '';
    const pedagogy = (lab.pedagogy || []).map(item => `<span class="em-stat-pill">${escapeHtml(item)}</span>`).join('');
    const journeys = (lab.journeys || []).map(item => `
        <div class="rounded-3xl border border-violet-200 bg-white/90 px-4 py-4 shadow-sm">
            <div class="flex items-start justify-between gap-3">
                <div class="min-w-0">
                    <div class="text-xs font-black uppercase tracking-wider text-fuchsia-600">Hành trình ${escapeHtml(item[0])}</div>
                    <h3 class="mt-1 text-lg md:text-xl font-black text-slate-900 leading-tight">${escapeHtml(item[1])}</h3>
                </div>
                <span class="inline-flex shrink-0 rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-[11px] font-black text-violet-600">Khung sư phạm</span>
            </div>
            <p class="mt-2 text-sm md:text-base font-bold text-slate-600 leading-relaxed">${escapeHtml(item[2])}</p>
        </div>`).join('');
    return `<div class="w-full max-w-6xl mx-auto">
        <div class="mb-3"><button onclick="openEpsilonMethodHub_()" class="ns-secondary-btn">← Về Math Lab Grade 1</button></div>
        <section class="em-hero">
            <div class="min-w-0 flex-1">
                <div class="text-[11px] md:text-xs font-black uppercase tracking-[.26em] text-fuchsia-600">${escapeHtml(lab.code)} • ${escapeHtml(lab.icon || '✨')} GRADE 1 LAB</div>
                <h2 class="mt-1 text-2xl md:text-4xl font-black text-slate-900">${escapeHtml(lab.title)}</h2>
                <p class="mt-2 max-w-4xl text-sm md:text-base font-bold text-slate-600 leading-relaxed">${escapeHtml(lab.tagline || '')}</p>
                <div class="mt-3 text-sm md:text-base font-black text-fuchsia-700">${escapeHtml(lab.focus || '')}</div>
            </div>
            <div class="shrink-0 min-w-[210px] rounded-3xl border border-violet-200 bg-white/75 px-5 py-4 text-center shadow-sm">
                <div class="text-3xl md:text-4xl font-black text-violet-600">${(lab.journeys || []).length}</div>
                <div class="mt-1 text-xs md:text-sm font-black text-violet-600">hành trình đã lên khung</div>
                <div class="mt-1 text-[11px] font-bold text-slate-400">Sẵn sàng để phát triển hoạt động</div>
            </div>
        </section>

        <div class="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-4 mt-4">
            <div class="rounded-[28px] border border-pink-100 bg-white/90 px-5 py-5 shadow-sm">
                <div class="text-sm font-black uppercase tracking-wider text-pink-600">Ý tưởng lớn</div>
                <p class="mt-2 text-sm md:text-base font-bold text-slate-600 leading-relaxed">${escapeHtml(lab.focus || '')}</p>
                <div class="mt-4 text-sm font-black uppercase tracking-wider text-pink-600">Liên hệ chương trình Việt Nam</div>
                <p class="mt-2 text-sm md:text-base font-bold text-slate-600 leading-relaxed">${escapeHtml(lab.vn_link || '')}</p>
                <div class="mt-4 text-sm font-black uppercase tracking-wider text-pink-600">Nguyên tắc sư phạm</div>
                <div class="mt-3 flex flex-wrap gap-2">${pedagogy}</div>
            </div>
            <div class="rounded-[28px] border border-violet-100 bg-gradient-to-br from-violet-50 via-white to-fuchsia-50 px-5 py-5 shadow-sm">
                <div class="text-sm font-black uppercase tracking-wider text-violet-600">Cách dùng trong app</div>
                <ul class="mt-3 space-y-2 text-sm md:text-base font-bold text-slate-600 leading-relaxed list-disc pl-5">
                    <li>Mỗi hành trình đi theo trình tự: thao tác → mô hình → nói ra cách nghĩ → ký hiệu toán.</li>
                    <li>Ưu tiên câu hỏi giúp bé giải thích “vì sao”, không chỉ chọn đáp án.</li>
                    <li>Cho phép nhiều chiến lược đúng để nuôi tư duy linh hoạt.</li>
                    <li>Kết nối lại với bài học SGK hiện hành để bé vừa chắc kiến thức vừa mở rộng tư duy.</li>
                </ul>
            </div>
        </div>

        <section class="mt-5">
            <div class="flex items-center justify-between gap-3 flex-wrap">
                <h3 class="text-xl md:text-2xl font-black text-slate-900">Lộ trình hành trình</h3>
                <span class="em-method-badge">${(lab.journeys || []).length} hành trình</span>
            </div>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-3">${journeys}</div>
        </section>
    </div>`;
}

function openEpsilonLabBlueprint_(labCode) {
    stopSpeaking();
    clearInterval(quizTimerInterval);
    setAppShellRootMode_(false);
    setMainTabActive_('discover');
    activeTopicId = 12;
    const lab = EPSILON_GRADE1_BLUEPRINTS_[labCode];
    if (!lab) return openEpsilonMethodHub_();
    updateNavTabs('12. Math Lab - Toán tư duy Mỹ', '✨', `${lab.code} ${lab.title}`, null);
    switchAppView('view-epsilon-method-hub');
    const host = document.getElementById('epsilon-method-content');
    if (host) host.innerHTML = renderEpsilonLabBlueprint_(lab);
}

async function openEpsilonMethodHub_() {
    setAppShellRootMode_(false);
    setMainTabActive_('discover');
    stopSpeaking();
    clearInterval(quizTimerInterval);
    activeBaiHocContext = null;
    activeExamContext = null;
    activeRoadmapContext = null;
    activeTopicId = 12;
    pendingTopicQuiz = null;
    activeNumberSense = null;
    activeOperationSense = null;
    activeGenericLab = null;
    updateDiscoverBreadcrumb_('12. Math Lab - Toán tư duy Mỹ', '✨', null);
    switchAppView('view-epsilon-method-hub');
    const host = document.getElementById('epsilon-method-content');
    if (host) host.innerHTML = '<div class="py-16 text-center font-black text-purple-600">✨ Đang mở không gian học theo phương pháp Epsilon...</div>';
    try {
        const data = await loadEpsilonMuc12Data_();
        renderEpsilonMethodHub_(data);
    } catch (err) {
        if (host) host.innerHTML = `<div class="rounded-3xl border-2 border-rose-200 bg-rose-50 p-6 text-center font-bold text-rose-700">${escapeHtml(err.message)}</div>`;
    }
}

function renderEpsilonMethodHub_(data) {
    const host = document.getElementById('epsilon-method-content');
    if (!host) return;

    const activeByEngine = {};
    (data.tracks || []).forEach(track => { activeByEngine[track.engine] = track; });
    const plannedTotal = EPSILON_GRADE1_LABS_.reduce((sum, lab) => sum + Number(lab.planned_journeys || 0), 0);
    const openJourneyCount = (data.tracks || []).reduce((sum, track) => sum + ((track.content?.journeys || []).length), 0);

    const cards = EPSILON_GRADE1_LABS_.map(lab => {
        const track = activeByEngine[lab.engine];
        const isActive = !!track && lab.status === 'active';
        const isBlueprint = lab.status === 'blueprint';
        const blueprint = EPSILON_GRADE1_BLUEPRINTS_[lab.code];
        const content = track?.content || {};
        const journeyCount = isActive ? (content.journeys || []).length : Number((blueprint?.journeys || []).length || lab.planned_journeys || 0);
        const activityCount = isActive ? (content.journeys || []).reduce((sum, j) => sum + (Array.isArray(j.activities) ? j.activities.length : 0), 0) : 0;
        const action = getEpsilonLabAction_(lab);

        if (isActive) {
            return `<button onclick="${action}" class="em-track-card text-left">
                <div class="flex items-start justify-between gap-3">
                    <div class="flex items-center gap-3 min-w-0">
                        <div class="em-track-icon">${escapeHtml(lab.icon || '✨')}</div>
                        <div class="min-w-0">
                            <div class="text-xs font-black uppercase tracking-wider text-fuchsia-600">${escapeHtml(lab.code)}</div>
                            <h3 class="font-black text-slate-900 text-lg md:text-xl leading-tight mt-0.5">${escapeHtml(lab.title)}</h3>
                        </div>
                    </div>
                    <span class="em-method-badge">${journeyCount} hành trình</span>
                </div>
                <p class="mt-3 text-sm md:text-base font-bold text-slate-600 leading-relaxed">${escapeHtml(lab.description)}</p>
                <div class="mt-4 flex flex-wrap gap-2 text-[11px] font-black text-slate-500">
                    <span class="em-stat-pill">${activityCount} hoạt động</span>
                    <span class="em-stat-pill">Có âm thanh hướng dẫn</span>
                    <span class="em-stat-pill">Đang mở</span>
                </div>
            </button>`;
        }

        if (isBlueprint) {
            return `<button onclick="${action}" class="em-track-card text-left bg-violet-50/50 hover:bg-violet-50 transition-colors">
                <div class="flex items-start justify-between gap-3">
                    <div class="flex items-center gap-3 min-w-0">
                        <div class="em-track-icon">${escapeHtml(lab.icon || '✨')}</div>
                        <div class="min-w-0">
                            <div class="text-xs font-black uppercase tracking-wider text-fuchsia-600">${escapeHtml(lab.code)}</div>
                            <h3 class="font-black text-slate-900 text-lg md:text-xl leading-tight mt-0.5">${escapeHtml(lab.title)}</h3>
                        </div>
                    </div>
                    <span class="inline-flex shrink-0 rounded-full border border-violet-200 bg-white px-3 py-1 text-[11px] font-black text-violet-600">Đã lên khung</span>
                </div>
                <p class="mt-3 text-sm md:text-base font-bold text-slate-600 leading-relaxed">${escapeHtml(lab.description)}</p>
                <div class="mt-4 flex flex-wrap gap-2 text-[11px] font-black text-slate-500">
                    <span class="em-stat-pill">${journeyCount} hành trình</span>
                    <span class="em-stat-pill">Khung sư phạm Mỹ</span>
                    <span class="em-stat-pill">Bấm để xem roadmap</span>
                </div>
            </button>`;
        }

        return `<div class="em-track-card text-left opacity-75 cursor-default bg-slate-50/70">
            <div class="flex items-start justify-between gap-3">
                <div class="flex items-center gap-3 min-w-0">
                    <div class="em-track-icon grayscale-[25%]">${escapeHtml(lab.icon || '✨')}</div>
                    <div class="min-w-0">
                        <div class="text-xs font-black uppercase tracking-wider text-fuchsia-500">${escapeHtml(lab.code)}</div>
                        <h3 class="font-black text-slate-700 text-lg md:text-xl leading-tight mt-0.5">${escapeHtml(lab.title)}</h3>
                    </div>
                </div>
                <span class="inline-flex shrink-0 rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-[11px] font-black text-violet-500">Sắp ra mắt</span>
            </div>
            <p class="mt-3 text-sm md:text-base font-bold text-slate-500 leading-relaxed">${escapeHtml(lab.description)}</p>
            <div class="mt-4 flex flex-wrap gap-2 text-[11px] font-black text-slate-400">
                <span class="em-stat-pill">Dự kiến ${journeyCount} hành trình</span>
            </div>
        </div>`;
    }).join('');

    host.innerHTML = `<div class="w-full max-w-6xl mx-auto">
        <section class="em-hero">
            <div class="min-w-0 flex-1">
                <div class="text-[11px] md:text-xs font-black uppercase tracking-[.26em] text-fuchsia-600">MATH LAB • GRADE 1</div>
                <h2 class="mt-1 text-2xl md:text-4xl font-black text-slate-900">Math Lab - Toán tư duy Mỹ</h2>
                <p class="mt-2 max-w-4xl text-sm md:text-base font-bold text-slate-600 leading-relaxed">Cùng kiến thức Toán 1 Việt Nam, nhưng con học bằng khám phá, thao tác, mô hình, giải thích và nhiều cách giải.</p>
                <div class="mt-3 text-sm md:text-base font-black text-fuchsia-700">Khám phá • Mô hình • Nhiều cách giải</div>
            </div>
            <div class="shrink-0 min-w-[210px] rounded-3xl border border-violet-200 bg-white/75 px-5 py-4 text-center shadow-sm">
                <div class="text-3xl md:text-4xl font-black text-violet-600">${plannedTotal}</div>
                <div class="mt-1 text-xs md:text-sm font-black text-violet-600">hành trình trong khung Grade 1</div>
                <div class="mt-1 text-[11px] font-bold text-slate-400">${openJourneyCount} hành trình đang mở</div>
            </div>
        </section>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">${cards}</div>
    </div>`;
}

function epsilonActivityNarration_(activity) {
    if (!activity) return '';
    const teacher = String(activity.teacher_audio || activity.teacher || '').trim();
    const instruction = String(activity.instruction_audio || activity.prompt || '').trim();
    if (!teacher) return instruction;
    if (!instruction || instruction === teacher) return teacher;
    return `${teacher} ${instruction}`;
}

function speakNumberSenseActivity_() {
    speakVietnamese(epsilonActivityNarration_(currentNumberSenseActivity_()), 0.94);
}

function speakOperationSenseActivity_() {
    speakVietnamese(epsilonActivityNarration_(currentOperationSenseActivity_()), 0.94);
}


// ==========================================
// GENERIC GRADE 1 MATH LAB ENGINE - 12.3 to 12.6
// Mỗi hành trình có chu trình: mô hình -> lựa chọn -> giải thích -> transfer.
// Trả lời sai không khóa đáp án: hệ thống tăng dần gợi ý rồi cho thử lại.
// ==========================================
let activeGenericLab = null;
let genericLabHintLevel_ = 0;
let genericLabWrongCount_ = 0;
let genericLabSolved_ = false;

function genericLabEvidenceKey_(labCode) {
    const id = String(currentUser?.maHS || 'KHACH').toUpperCase();
    return `epsilon_grade1_${String(labCode || '').replace(/\./g,'_')}_evidence_${id}`;
}

function readGenericLabEvidence_(labCode) {
    try { return JSON.parse(localStorage.getItem(genericLabEvidenceKey_(labCode)) || '{}') || {}; }
    catch (e) { return {}; }
}

function writeGenericLabEvidence_(labCode, data) {
    try { localStorage.setItem(genericLabEvidenceKey_(labCode), JSON.stringify(data || {})); } catch (e) {}
}

function genericLabMasteryLabel_(state) {
    return numberSenseMasteryLabel_(state);
}

function genericLabMasteryClass_(state) {
    return numberSenseMasteryClass_(state);
}

async function loadGenericMathLabTrack_(labCode) {
    const root = await loadEpsilonMuc12Data_();
    const lab = EPSILON_GRADE1_LABS_.find(x => x.code === labCode);
    if (!lab) throw new Error(`Không tìm thấy ${labCode}`);
    const track = (root.tracks || []).find(t => t.display_code === labCode || t.engine === lab.engine);
    if (!track?.content?.journeys?.length) throw new Error(`${labCode} chưa có dữ liệu hành trình`);
    return { lab, track, data: track.content };
}

async function openGenericMathLab_(labCode) {
    stopSpeaking();
    clearInterval(quizTimerInterval);
    setAppShellRootMode_(false);
    setMainTabActive_('discover');
    activeTopicId = 12;
    switchAppView('view-epsilon-method-hub');
    const host = document.getElementById('epsilon-method-content');
    if (host) host.innerHTML = '<div class="py-14 text-center font-black text-violet-600">✨ Đang mở Math Lab...</div>';
    try {
        const {lab, track, data} = await loadGenericMathLabTrack_(labCode);
        activeGenericLab = { labCode, lab, track, data, journeyId:null, activityIndex:0 };
        updateNavTabs('12. Math Lab - Toán tư duy Mỹ','✨',`${lab.code} ${lab.title}`,null);
        renderGenericMathLabHub_();
    } catch (err) {
        if (host) host.innerHTML = `<div class="rounded-3xl border-2 border-rose-200 bg-rose-50 p-6 text-center font-bold text-rose-700">${escapeHtml(err.message)}</div>`;
    }
}

function genericLabJourneyState_(journeyId) {
    if (!activeGenericLab) return {mastery:'not_observed',completed:[],attempts:0,hint_uses:0,transfer_correct:0};
    const ev = readGenericLabEvidence_(activeGenericLab.labCode);
    return ev[journeyId] || {mastery:'not_observed',completed:[],attempts:0,hint_uses:0,transfer_correct:0};
}

function renderGenericMathLabHub_() {
    const host = document.getElementById('epsilon-method-content');
    if (!host || !activeGenericLab) return;
    const {lab, data} = activeGenericLab;
    const evidence = readGenericLabEvidence_(activeGenericLab.labCode);
    const completedJourneys = (data.journeys || []).filter(j => {
        const st = evidence[j.id];
        return st && Array.isArray(st.completed) && st.completed.length >= (j.activities || []).length;
    }).length;
    const cards = (data.journeys || []).map(j => {
        const st = genericLabJourneyState_(j.id);
        const done = Array.isArray(st.completed) ? st.completed.length : 0;
        const total = (j.activities || []).length;
        const pct = total ? Math.round(done/total*100) : 0;
        const standards = (j.standards || []).map(s=>`<span class="em-stat-pill">${escapeHtml(s)}</span>`).join('');
        const practices = (j.math_practices || []).map(s=>`<span class="em-stat-pill">${escapeHtml(s)}</span>`).join('');
        return `<button onclick="startGenericMathLabJourney_('${escapeHtml(j.id)}')" class="em-track-card text-left">
            <div class="flex items-start justify-between gap-3">
                <div class="flex items-center gap-3 min-w-0">
                    <div class="em-track-icon">${escapeHtml(j.icon || lab.icon || '✨')}</div>
                    <div class="min-w-0"><div class="text-xs font-black uppercase tracking-wider text-fuchsia-600">${escapeHtml(lab.code)}.${j.order}</div><h3 class="font-black text-slate-900 text-lg md:text-xl leading-tight">${escapeHtml(j.title)}</h3></div>
                </div>
                <span class="inline-flex rounded-full border px-3 py-1 text-[11px] font-black ${genericLabMasteryClass_(st.mastery)}">${escapeHtml(genericLabMasteryLabel_(st.mastery))}</span>
            </div>
            <p class="mt-3 text-sm md:text-base font-bold text-slate-600 leading-relaxed">${escapeHtml(j.goal)}</p>
            <div class="mt-3 flex flex-wrap gap-1.5">${standards}${practices}</div>
            <div class="mt-4 h-2 rounded-full bg-slate-100 overflow-hidden"><div class="h-full bg-gradient-to-r from-fuchsia-400 to-violet-500" style="width:${pct}%"></div></div>
            <div class="mt-1 text-[11px] font-black text-slate-400">${done}/${total} hoạt động</div>
        </button>`;
    }).join('');

    host.innerHTML = `<div class="w-full max-w-6xl mx-auto">
        <div class="mb-3"><button onclick="openEpsilonMethodHub_()" class="ns-secondary-btn">← Math Lab Grade 1</button></div>
        <section class="em-hero">
            <div class="min-w-0 flex-1">
                <div class="text-[11px] md:text-xs font-black uppercase tracking-[.26em] text-fuchsia-600">${escapeHtml(lab.code)} • MATH LAB • GRADE 1</div>
                <h2 class="mt-1 text-2xl md:text-4xl font-black text-slate-900">${escapeHtml(lab.title)}</h2>
                <p class="mt-2 max-w-4xl text-sm md:text-base font-bold text-slate-600 leading-relaxed">${escapeHtml(lab.description)}</p>
                <div class="mt-3 text-sm md:text-base font-black text-fuchsia-700">${escapeHtml(data.pedagogy || 'Thao tác → mô hình → giải thích → kí hiệu → transfer')}</div>
            </div>
            <div class="shrink-0 min-w-[210px] rounded-3xl border border-violet-200 bg-white/75 px-5 py-4 text-center shadow-sm">
                <div class="text-3xl md:text-4xl font-black text-violet-600">${completedJourneys}/${(data.journeys||[]).length}</div>
                <div class="mt-1 text-xs md:text-sm font-black text-violet-600">hành trình hoàn thành</div>
                <div class="mt-1 text-[11px] font-bold text-slate-400">Theo dõi theo từng kỹ năng nhỏ</div>
            </div>
        </section>
        <div class="mt-4 rounded-[24px] border border-amber-200 bg-amber-50/70 px-4 py-3 text-sm md:text-base font-bold text-amber-900">
            🐰 <strong>Cách học:</strong> con nhìn và thao tác với mô hình trước, tự chọn cách nghĩ, được gợi ý nếu cần, rồi mới giải thích bằng kí hiệu. Sai không bị khóa bài; con được thử lại.
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">${cards}</div>
    </div>`;
}

function startGenericMathLabJourney_(journeyId) {
    if (!activeGenericLab) return;
    const journey = (activeGenericLab.data.journeys || []).find(j => j.id === journeyId);
    if (!journey) return;
    activeGenericLab.journeyId = journeyId;
    activeGenericLab.activityIndex = 0;
    genericLabHintLevel_ = 0;
    genericLabWrongCount_ = 0;
    genericLabSolved_ = false;
    updateNavTabs('12. Math Lab - Toán tư duy Mỹ','✨',`${activeGenericLab.lab.code} ${activeGenericLab.lab.title}`,`${journey.order}. ${journey.title}`);
    renderGenericMathLabActivity_();
}

function currentGenericLabJourney_() {
    if (!activeGenericLab?.journeyId) return null;
    return (activeGenericLab.data.journeys || []).find(j => j.id === activeGenericLab.journeyId) || null;
}

function currentGenericLabActivity_() {
    const j = currentGenericLabJourney_();
    return j?.activities?.[activeGenericLab.activityIndex] || null;
}

function genericLabSpeakCurrent_() {
    const a = currentGenericLabActivity_();
    if (!a) return;
    const teacher = String(a.teacher_audio || a.teacher || '').trim();
    const prompt = String(a.instruction_audio || a.prompt || '').trim();
    speakVietnamese(`${teacher}${teacher && prompt ? ' ' : ''}${prompt}`,0.94);
}

function genericBaseTenHtml_(tens=0, ones=0) {
    const rods = Array.from({length:Math.max(0,Number(tens)||0)},()=>`<div class="grid grid-rows-5 grid-cols-2 gap-[2px] rounded-xl border-2 border-violet-300 bg-violet-50 p-1 w-10 md:w-12">${Array.from({length:10},()=>'<span class="block aspect-square rounded-[3px] bg-violet-400"></span>').join('')}</div>`).join('');
    const dots = Array.from({length:Math.max(0,Number(ones)||0)},()=>'<span class="w-8 h-8 md:w-9 md:h-9 rounded-full border-2 border-pink-300 bg-pink-100 inline-flex"></span>').join('');
    return `<div class="flex flex-wrap items-end justify-center gap-3"><div class="flex flex-wrap justify-center gap-2">${rods}</div><div class="flex flex-wrap justify-center gap-2 max-w-[260px]">${dots}</div></div>`;
}

function genericNumberLineHtml_(v) {
    const start=Number(v.start||0), end=Number(v.end||10), step=Number(v.step||1);
    const nums=[]; for(let n=start;n<=end;n+=step) nums.push(n);
    return `<div class="flex flex-wrap items-center justify-center">${nums.map((n,i)=>`<div class="flex items-center"><div class="w-11 h-11 md:w-12 md:h-12 rounded-full border-2 ${n===Number(v.highlight)?'bg-pink-500 border-pink-500 text-white':'bg-white border-violet-200 text-violet-700'} flex items-center justify-center font-black text-lg">${v.hide_highlight_label && n===Number(v.highlight)?'?':n}</div>${i<nums.length-1?'<div class="w-5 md:w-7 h-1 bg-violet-200"></div>':''}</div>`).join('')}</div>`;
}

function genericClockSvg_(hour=3, minute=0) {
    const cx=100, cy=100, r=78;
    const minAng=(Number(minute||0)*6-90)*Math.PI/180;
    const hourAng=((Number(hour||0)%12)*30 + Number(minute||0)*0.5 - 90)*Math.PI/180;
    const hx=cx+Math.cos(hourAng)*42, hy=cy+Math.sin(hourAng)*42;
    const mx=cx+Math.cos(minAng)*62, my=cy+Math.sin(minAng)*62;
    const labels=Array.from({length:12},(_,i)=>{const n=i+1; const a=(n*30-90)*Math.PI/180; return `<text x="${cx+Math.cos(a)*60}" y="${cy+Math.sin(a)*60+5}" text-anchor="middle" font-size="16" font-weight="800" fill="#6d28d9">${n}</text>`}).join('');
    return `<svg viewBox="0 0 200 200" class="w-[210px] md:w-[250px] h-auto"><circle cx="100" cy="100" r="82" fill="#fff" stroke="#ddd6fe" stroke-width="6"/>${labels}<line x1="100" y1="100" x2="${hx}" y2="${hy}" stroke="#ec4899" stroke-width="7" stroke-linecap="round"/><line x1="100" y1="100" x2="${mx}" y2="${my}" stroke="#7c3aed" stroke-width="5" stroke-linecap="round"/><circle cx="100" cy="100" r="6" fill="#111827"/></svg>`;
}

function genericBarChartHtml_(data) {
    const max=Math.max(1,...(data||[]).map(x=>Number(x.count||0)));
    return `<div class="flex items-end justify-center gap-5 h-[220px]">${(data||[]).map(x=>`<div class="flex flex-col items-center justify-end h-full"><div class="font-black text-violet-700 mb-1">${x.count}</div><div class="w-12 md:w-16 rounded-t-xl bg-violet-300 border-2 border-violet-400" style="height:${40+Number(x.count||0)/max*120}px"></div><div class="mt-2 font-black text-slate-600 text-sm">${escapeHtml(x.label)}</div></div>`).join('')}</div>`;
}

function renderGenericLabVisual_(a) {
    const v=a?.visual||{}, k=v.kind||'';
    if(k==='base_ten') return `<div>${genericBaseTenHtml_(v.tens,v.ones)}${v.action==='bundle'?'<div class="mt-3 text-center text-sm font-black text-violet-700">10 đơn vị ↔ 1 chục</div>':''}</div>`;
    if(k==='ten_frame') { const f=Math.max(0,Math.min(10,Number(v.filled||0))); return `<div class="grid grid-cols-5 gap-2 max-w-[330px] mx-auto">${Array.from({length:10},(_,i)=>`<div class="aspect-square rounded-xl border-2 ${i<f?'bg-pink-100 border-pink-300':'bg-white border-sky-200'} flex items-center justify-center">${i<f?'<span class="w-5 h-5 rounded-full bg-pink-500"></span>':''}</div>`).join('')}</div>`; }
    if(k==='place_value_card') return buildTopic3PlaceValueCard_(Number(v.number||0),'violet');
    if(k==='compare_base_ten') return `<div class="grid grid-cols-2 gap-5"><div><div class="text-center text-xl font-black text-violet-700 mb-2">${v.left}</div>${genericBaseTenHtml_(Math.floor(v.left/10),v.left%10)}</div><div><div class="text-center text-xl font-black text-rose-600 mb-2">${v.right}</div>${genericBaseTenHtml_(Math.floor(v.right/10),v.right%10)}</div></div>`;
    if(k==='compare_numbers') return `<div class="flex items-center justify-center gap-5"><div class="rounded-3xl border-2 border-violet-200 bg-violet-50 px-8 py-6 text-4xl font-black text-violet-700">${v.left}</div><div class="text-4xl font-black text-pink-500">?</div><div class="rounded-3xl border-2 border-rose-200 bg-rose-50 px-8 py-6 text-4xl font-black text-rose-700">${v.right}</div></div>`;
    if(k==='representation_pair') return `<div class="grid md:grid-cols-2 gap-4 items-center"><div class="rounded-2xl border border-violet-200 bg-white p-4">${genericBaseTenHtml_(Math.floor(v.number/10),v.number%10)}</div><div class="text-center text-6xl font-black text-violet-700">${v.number}</div></div>`;
    if(k==='number_line'||k==='number_line_jump') return genericNumberLineHtml_(v.kind==='number_line_jump'?{start:Number(v.start)-2,end:Number(v.start)+Number(v.jump)+2,highlight:Number(v.start)+Number(v.jump)}:v);
    if(k==='number_cards') return `<div class="flex flex-wrap justify-center gap-3">${(v.numbers||[]).map(n=>`<div class="w-20 h-20 rounded-2xl border-2 border-violet-200 bg-white flex items-center justify-center text-3xl font-black text-violet-700">${n}</div>`).join('')}</div>`;
    if(k==='part_whole') return buildMuc2NumberBond_(v.whole,v.left,v.right);
    if(k==='base_ten_add'||k==='base_ten_sub') { const start=Number(v.start||0), delta=Number(k==='base_ten_add'?v.add:v.take); return `<div class="space-y-4"><div><div class="text-center font-black text-slate-500 mb-2">Ban đầu: ${start}</div>${genericBaseTenHtml_(Math.floor(start/10),start%10)}</div><div class="text-center text-3xl font-black ${k==='base_ten_add'?'text-emerald-600':'text-rose-600'}">${k==='base_ten_add'?'+':'−'} ${delta}</div></div>`; }
    if(k==='equation') return `<div class="text-center text-4xl md:text-5xl font-black text-violet-700">${escapeHtml(v.text||'')}</div>`;
    if(k==='strategy_cards') return `<div class="grid gap-3">${(v.items||[]).map(x=>`<div class="rounded-2xl border-2 border-violet-100 bg-white px-4 py-3 text-left font-black text-slate-700">${escapeHtml(x)}</div>`).join('')}</div>`;
    if(k==='length_bars') return `<div class="space-y-4 max-w-xl mx-auto">${(v.items||[]).map(x=>`<div class="flex items-center gap-3"><span class="w-8 font-black text-violet-700">${escapeHtml(x.label)}</span><div class="h-8 rounded-xl bg-sky-200 border-2 border-sky-300" style="width:${40+Number(x.length||1)*34}px"></div></div>`).join('')}</div>`;
    if(k==='length_offset') return `<div class="space-y-5 max-w-xl mx-auto"><div class="ml-4 h-8 rounded-xl bg-violet-200 border-2 border-violet-300" style="width:${60+Number(v.a||1)*34}px"></div><div class="ml-24 h-8 rounded-xl bg-rose-200 border-2 border-rose-300" style="width:${60+Number(v.b||1)*34}px"></div></div>`;
    if(k==='logic_chain') return `<div class="flex flex-wrap items-center justify-center gap-3">${(v.items||[]).map((x,i)=>`<div class="rounded-2xl border-2 border-violet-200 bg-white px-5 py-3 font-black text-violet-700">${escapeHtml(x)}</div>${i<(v.items||[]).length-1?'<span class="text-2xl text-pink-500">→</span>':''}`).join('')}</div>`;
    if(k==='unit_measure') { const units=Number(v.units||0); const sym=v.unit_symbol||''; return `<div class="flex flex-wrap justify-center gap-0">${Array.from({length:units},(_,i)=>`<div class="w-12 h-12 border-2 border-sky-300 bg-sky-100 flex items-center justify-center font-black text-sky-700">${sym||i+1}</div>`).join('')}</div>`; }
    if(k==='measure_methods') return `<div class="grid grid-cols-2 gap-3">${(v.methods||[]).map((m,i)=>`<div class="rounded-2xl border-2 border-violet-100 bg-white p-3 text-center"><div class="flex justify-center ${i===1?'gap-2':i===2?'-space-x-3':'gap-0'}">${Array.from({length:4},()=>'<span class="w-10 h-10 border-2 border-sky-300 bg-sky-100"></span>').join('')}</div><div class="mt-2 font-black text-sm text-slate-600">${escapeHtml(m)}</div></div>`).join('')}</div>`;
    if(k==='measure_error') { const err=v.error; const gap=err==='gap'?'gap-3':err==='overlap'?'-space-x-3':'gap-0'; return `<div class="flex justify-center ${gap}">${Array.from({length:5},(_,i)=>`<span class="h-12 border-2 border-rose-300 bg-rose-100 ${err==='unequal'&&i===2?'w-16':'w-11'}"></span>`).join('')}</div>`; }
    if(k==='estimate_bar') return `<div class="mx-auto h-10 rounded-xl bg-amber-200 border-2 border-amber-300" style="width:${80+Number(v.approx||1)*34}px"></div>`;
    if(k==='clock') return genericClockSvg_(v.hour,v.minute);
    if(k==='digital_clock') return `<div class="text-center text-6xl font-black tracking-wider text-violet-700 bg-white border-2 border-violet-200 rounded-3xl px-8 py-5">${escapeHtml(v.text||'')}</div>`;
    if(k==='calendar_strip') return `<div class="flex justify-center gap-2">${(v.days||[]).map(d=>`<div class="w-16 h-16 rounded-2xl border-2 ${d===v.highlight?'bg-pink-500 border-pink-500 text-white':'bg-white border-violet-200 text-violet-700'} flex items-center justify-center text-2xl font-black">${d}</div>`).join('')}</div>`;
    if(k==='week_strip') { const days=['Thứ Hai','Thứ Ba','Thứ Tư','Thứ Năm','Thứ Sáu','Thứ Bảy','Chủ nhật']; return `<div class="grid grid-cols-4 md:grid-cols-7 gap-2">${days.map(d=>`<div class="rounded-xl border-2 ${d===v.highlight?'bg-pink-500 text-white border-pink-500':'bg-white text-violet-700 border-violet-200'} px-2 py-3 text-center text-xs font-black">${d}</div>`).join('')}</div>`; }
    if(k==='pictograph') return `<div class="space-y-2">${(v.data||[]).map(x=>`<div class="flex items-center gap-3"><div class="w-20 text-right font-black text-slate-600">${escapeHtml(x.label)}</div><div class="flex flex-wrap gap-1 text-3xl">${Array.from({length:Number(x.count||0)},()=>escapeHtml(x.emoji||'●')).join('')}</div></div>`).join('')}</div>`;
    if(k==='bar_chart') return genericBarChartHtml_(v.data);
    if(k==='data_table') return `<div class="max-w-md mx-auto overflow-hidden rounded-2xl border-2 border-violet-100 bg-white">${(v.rows||[]).map(r=>`<div class="grid grid-cols-2 border-b last:border-b-0 border-violet-100"><div class="px-4 py-3 font-black text-slate-600">${escapeHtml(r.label)}</div><div class="px-4 py-3 text-center font-black text-violet-700">${escapeHtml(r.value)}</div></div>`).join('')}</div>`;
    if(k==='shape') return `<div class="flex justify-center">${muc5ShapeSvg_(v.shape,{size:180,color:v.color||'#c4b5fd',rotate:v.rotate||0})}</div>`;
    if(k==='shape_set') return `<div class="grid grid-cols-4 gap-3">${(v.shapes||[]).map((s,i)=>`<div class="rounded-2xl bg-white border-2 border-violet-100 p-2 text-center"><div class="font-black text-pink-600">${String.fromCharCode(65+i)}</div>${muc5ShapeSvg_(s,{size:90,color:['#fde68a','#bfdbfe','#bbf7d0','#fecdd3'][i%4],rotate:(v.rotates||[])[i]||0})}</div>`).join('')}</div>`;
    if(k==='real_object_shape') return `<div class="text-center"><div class="text-8xl">${escapeHtml(v.emoji||'📦')}</div>${v.shape?`<div class="mt-3">${muc5ShapeSvg_(v.shape,{size:110,color:'#dbeafe'})}</div>`:''}${v.solid?`<div class="mt-3">${muc5SolidSvg_(v.solid,{size:130})}</div>`:''}</div>`;
    if(k==='compose_shapes') return `<div class="flex items-center justify-center gap-3">${(v.parts||[]).map((s,i)=>muc5ShapeSvg_(s,{size:100,color:['#fecdd3','#bfdbfe'][i%2],rotate:i?180:0})).join('')}<span class="text-3xl font-black text-violet-500">→</span>${muc5ShapeSvg_(v.result,{size:130,color:'#bbf7d0'})}</div>`;
    if(k==='compose_scene') return muc5ComposeSceneSvg_(v.scene,v.missing,true);
    if(k==='pattern') return muc5AdvancedCountSvg_(v.pattern);
    if(k==='solid') return `<div class="flex justify-center">${muc5SolidSvg_(v.solid,{size:180,fill1:'#dbeafe',fill2:'#93c5fd',fill3:'#60a5fa'})}</div>`;
    if(k==='position') return `<div class="flex items-center justify-center gap-20 text-7xl"><span>${escapeHtml(v.left||'')}</span><span>${escapeHtml(v.right||'')}</span></div>`;
    if(k==='inside_outside') return `<div class="relative w-64 h-44 mx-auto rounded-[28px] border-4 border-amber-300 bg-amber-50 flex items-center justify-center"><div class="absolute -top-8 text-5xl">${escapeHtml(v.container||'📦')}</div><div class="text-7xl">${escapeHtml(v.inside||'⚽')}</div></div>`;
    if(k==='shape_pair') return `<div class="grid grid-cols-2 gap-8">${muc5ShapeSvg_(v.left,{size:145,color:'#bfdbfe'})}${muc5ShapeSvg_(v.right,{size:145,color:'#fecdd3',rotate:v.right_rotate||0})}</div>`;
    if(k==='partition_options') return `<svg viewBox="0 0 300 180" class="w-full max-w-[380px]"><rect x="30" y="35" width="240" height="110" rx="8" fill="#f5f3ff" stroke="#7c3aed" stroke-width="4"/><line x1="150" y1="35" x2="150" y2="145" stroke="#ec4899" stroke-width="4" stroke-dasharray="8 6"/></svg>`;
    if(k==='circle_partition') return `<svg viewBox="0 0 220 220" class="w-full max-w-[260px]"><circle cx="110" cy="110" r="82" fill="#fdf2f8" stroke="#ec4899" stroke-width="5"/><line x1="28" y1="110" x2="192" y2="110" stroke="#7c3aed" stroke-width="4" stroke-dasharray="8 6"/><circle cx="110" cy="110" r="5" fill="#7c3aed"/></svg>`;
    if(k==='partition_compare') return `<div class="grid grid-cols-2 gap-5"><div>${renderGenericLabVisual_({visual:{kind:'partition_options'}})}</div><div><svg viewBox="0 0 300 180" class="w-full"><rect x="30" y="35" width="240" height="110" rx="8" fill="#ecfeff" stroke="#0891b2" stroke-width="4"/><line x1="30" y1="90" x2="270" y2="90" stroke="#ec4899" stroke-width="4" stroke-dasharray="8 6"/></svg></div></div>`;
    if(k==='story') { const start=Number(v.start||0), change=Number(v.change||0), obj=v.object||'●'; return `<div class="text-center"><div class="text-sm font-black text-slate-500 mb-2">BAN ĐẦU</div><div class="text-4xl leading-relaxed">${Array.from({length:start},()=>escapeHtml(obj)).join(' ')}</div><div class="my-3 text-xl font-black ${v.action==='take'?'text-rose-600':'text-emerald-600'}">${v.action==='take'?'Bớt':'Thêm'} ${change}</div><div class="text-sm font-bold text-slate-400">Con hãy hình dung hành động đang xảy ra.</div></div>`; }
    if(k==='compare_groups') { const l=Number(v.left||0),r=Number(v.right||0),lo=v.left_object||'🔵',ro=v.right_object||'🟡'; return `<div class="grid grid-cols-2 gap-5"><div class="rounded-2xl border-2 border-violet-100 bg-white p-4 text-center"><div class="font-black text-violet-700 mb-2">Nhóm A</div><div class="text-3xl ${v.spread?'tracking-[.35em]':''}">${Array.from({length:l},()=>escapeHtml(lo)).join(' ')}</div></div><div class="rounded-2xl border-2 border-rose-100 bg-white p-4 text-center"><div class="font-black text-rose-700 mb-2">Nhóm B</div><div class="text-3xl">${Array.from({length:r},()=>escapeHtml(ro)).join(' ')}</div></div></div>`; }
    if(k==='equation_set') return `<div class="grid grid-cols-2 gap-3">${(v.items||[]).map(x=>`<div class="rounded-2xl border-2 border-violet-100 bg-white px-3 py-4 text-center text-xl font-black text-violet-700">${escapeHtml(x)}</div>`).join('')}</div>`;
    return `<div class="rounded-2xl border border-violet-100 bg-white p-6 text-center font-black text-violet-600">Mô hình toán học</div>`;
}

function genericLabChoiceButtons_(a) {
    return (a.choices || []).map((c,i)=>`<button data-value="${escapeHtml(String(c))}" onclick="genericLabChooseFromButton_(this)" class="generic-lab-option w-full min-h-[60px] md:min-h-[68px] px-3 py-2.5 rounded-2xl border-2 border-pink-200 bg-pink-50/40 hover:bg-pink-100/70 font-black text-slate-800 text-sm md:text-base transition-all"><span class="text-pink-600 mr-1.5">${String.fromCharCode(65+i)}.</span>${escapeHtml(String(c))}</button>`).join('');
}

function renderGenericMathLabActivity_() {
    const host=document.getElementById('epsilon-method-content');
    const j=currentGenericLabJourney_(), a=currentGenericLabActivity_();
    if(!host||!j||!a) return;
    genericLabHintLevel_=0; genericLabWrongCount_=0; genericLabSolved_=false;
    const total=j.activities.length, idx=activeGenericLab.activityIndex;
    host.innerHTML=`<div class="w-full max-w-6xl mx-auto">
        <div class="flex items-center justify-between gap-3 mb-3 flex-wrap"><button onclick="renderGenericMathLabHub_()" class="ns-secondary-btn">← Bản đồ ${escapeHtml(activeGenericLab.lab.code)}</button><div class="text-sm font-black text-violet-600">Hoạt động ${idx+1}/${total}</div></div>
        <div class="h-2 rounded-full bg-slate-100 overflow-hidden mb-4"><div class="h-full bg-gradient-to-r from-fuchsia-400 to-violet-500" style="width:${Math.round((idx+1)/total*100)}%"></div></div>
        <div class="rounded-[28px] border-2 border-violet-100 bg-gradient-to-br from-white via-violet-50/40 to-pink-50/40 p-4 md:p-5 shadow-sm">
            <div class="flex flex-wrap items-center justify-between gap-3"><div><div class="text-xs font-black uppercase tracking-wider text-fuchsia-600">${escapeHtml(j.icon||'✨')} ${escapeHtml(j.title)}</div><h2 class="mt-1 text-xl md:text-2xl font-black text-slate-900">${escapeHtml(a.teacher||'')}</h2></div><button onclick="genericLabSpeakCurrent_()" class="ns-secondary-btn">🔊 Nghe cô đọc</button></div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-4 mt-4 items-stretch">
            <div class="min-h-[330px] rounded-[28px] border-2 border-pink-100 bg-gradient-to-br from-amber-50 via-white to-sky-50 p-4 md:p-6 flex items-center justify-center overflow-hidden shadow-sm">${renderGenericLabVisual_(a)}</div>
            <div class="rounded-[28px] border border-pink-100 bg-white p-4 md:p-5 flex flex-col justify-center shadow-sm">
                <h3 class="text-lg md:text-xl font-black text-slate-900 text-center leading-snug">${escapeHtml(a.prompt||'')}</h3>
                <div class="grid grid-cols-2 gap-2.5 mt-4">${genericLabChoiceButtons_(a)}</div>
                <div id="generic-lab-feedback" class="mt-3"></div>
                <div class="mt-4 flex items-center justify-between gap-2"><button onclick="genericLabShowHint_()" class="ns-secondary-btn">💡 Gợi ý</button><button onclick="renderGenericMathLabActivity_()" class="ns-secondary-btn">↻ Làm lại</button><button id="generic-lab-next" onclick="genericLabNext_()" class="hidden ns-primary-btn">Tiếp tục →</button></div>
            </div>
        </div>
    </div>`;
}

function genericLabShowHint_() {
    const a=currentGenericLabActivity_(); if(!a||genericLabSolved_) return;
    const hints=a.hints||[]; if(!hints.length) return;
    const idx=Math.min(genericLabHintLevel_,hints.length-1); genericLabHintLevel_++;
    const fb=document.getElementById('generic-lab-feedback');
    if(fb) fb.innerHTML=`<div class="rounded-2xl border-2 border-amber-200 bg-amber-50 px-4 py-3 text-sm md:text-base font-black text-amber-800">💡 ${escapeHtml(hints[idx])}</div>`;
    const st=genericLabJourneyState_(activeGenericLab.journeyId); st.hint_uses=(st.hint_uses||0)+1; saveGenericLabJourneyState_(st);
    speakVietnamese((a.hints_audio||hints)[idx]||hints[idx],0.94);
}

function saveGenericLabJourneyState_(state) {
    const ev=readGenericLabEvidence_(activeGenericLab.labCode); ev[activeGenericLab.journeyId]=state; writeGenericLabEvidence_(activeGenericLab.labCode,ev);
}

function genericLabChooseFromButton_(btn) {
    genericLabChoose_(btn?.dataset?.value ?? '');
}

function genericLabChoose_(selected) {
    const a=currentGenericLabActivity_(); if(!a||genericLabSolved_) return;
    const selectedStr=String(selected), answerStr=String(a.answer);
    const fb=document.getElementById('generic-lab-feedback');
    if(selectedStr===answerStr) {
        genericLabSolved_=true;
        document.querySelectorAll('.generic-lab-option').forEach(b=>{ b.disabled=true; if(String(b.dataset.value)===answerStr){b.classList.remove('bg-pink-50/40','border-pink-200');b.classList.add('bg-emerald-100','border-emerald-400','text-emerald-900');}});
        const st=genericLabJourneyState_(activeGenericLab.journeyId); st.completed=Array.isArray(st.completed)?st.completed:[]; if(!st.completed.includes(a.id)) st.completed.push(a.id); st.attempts=(st.attempts||0)+genericLabWrongCount_; if(a.transfer) st.transfer_correct=(st.transfer_correct||0)+1;
        const total=currentGenericLabJourney_().activities.length;
        if(st.completed.length>=total) st.mastery=(st.hint_uses||0)>0?'supported':((st.transfer_correct||0)>0?'generalized':'independent'); else st.mastery=(st.hint_uses||0)>0?'supported':'emerging';
        saveGenericLabJourneyState_(st);
        if(fb) fb.innerHTML=`<div class="rounded-2xl border-2 border-emerald-300 bg-emerald-50 px-4 py-3 text-sm md:text-base font-black text-emerald-800">✅ ${escapeHtml(a.success||'Đúng rồi!')}${a.explanation?`<div class="mt-2 text-slate-700">${escapeHtml(a.explanation)}</div>`:''}${a.reflection?`<div class="mt-2 rounded-xl bg-white/70 px-3 py-2 text-violet-700">🗣️ ${escapeHtml(a.reflection)}</div>`:''}</div>`;
        document.getElementById('generic-lab-next')?.classList.remove('hidden');
        speakVietnamese(a.success_audio||a.success||'Đúng rồi!',0.94);
    } else {
        genericLabWrongCount_++;
        const hints=a.hints||[]; const idx=Math.min(genericLabWrongCount_-1,hints.length-1); const hint=hints[idx]||'Con nhìn lại mô hình rồi thử lại nhé.';
        if(fb) fb.innerHTML=`<div class="rounded-2xl border-2 border-rose-200 bg-rose-50 px-4 py-3 text-sm md:text-base font-black text-rose-700">Chưa khớp rồi. <span class="text-amber-800">${escapeHtml(hint)}</span><div class="mt-1 text-xs text-slate-500">Con vẫn được chọn lại, chưa khóa đáp án.</div></div>`;
        speakVietnamese(`${a.wrong_audio||'Chưa khớp rồi.'} ${hint}`,0.94);
    }
}

function genericLabNext_() {
    if(!activeGenericLab||!genericLabSolved_) return;
    const j=currentGenericLabJourney_();
    if(activeGenericLab.activityIndex < j.activities.length-1) { activeGenericLab.activityIndex++; renderGenericMathLabActivity_(); return; }
    renderGenericMathLabJourneyComplete_();
}

function renderGenericMathLabJourneyComplete_() {
    const host=document.getElementById('epsilon-method-content'), j=currentGenericLabJourney_(); if(!host||!j) return;
    const st=genericLabJourneyState_(j.id);
    const next=(activeGenericLab.data.journeys||[]).find(x=>Number(x.order)===Number(j.order)+1);
    host.innerHTML=`<div class="w-full max-w-3xl mx-auto text-center py-8"><div class="text-7xl">🌟</div><h2 class="mt-3 text-2xl md:text-3xl font-black text-violet-700">Con vừa hoàn thành “${escapeHtml(j.title)}”!</h2><p class="mt-3 font-bold text-slate-600 leading-relaxed">${escapeHtml(j.goal)}</p><div class="mt-4 inline-flex rounded-full border px-4 py-2 text-sm font-black ${genericLabMasteryClass_(st.mastery)}">${escapeHtml(genericLabMasteryLabel_(st.mastery))}</div><div class="mt-5 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-left"><div class="font-black text-amber-800">Bằng chứng học tập</div><ul class="mt-2 list-disc pl-5 text-sm font-bold text-slate-600">${(j.evidence||[]).map(e=>`<li>${escapeHtml(e)}</li>`).join('')}</ul></div><div class="mt-6 flex flex-wrap justify-center gap-3"><button onclick="renderGenericMathLabHub_()" class="ns-secondary-btn">← Bản đồ ${escapeHtml(activeGenericLab.lab.code)}</button>${next?`<button onclick="startGenericMathLabJourney_('${escapeHtml(next.id)}')" class="ns-primary-btn">Hành trình tiếp theo →</button>`:''}</div></div>`;
}

// EPSILON METHOD 12.1 - NUMBER SENSE
// Trải nghiệm -> thao tác -> nhìn thấy -> diễn đạt -> ký hiệu -> transfer
// ==========================================
// Mục 12 đã được gộp thành một file JSON đầy đủ. Hỗ trợ cả tên file sạch và tên file
// có hậu tố (1) do trình duyệt/Windows tự thêm khi tải trùng; giữ tên cũ làm fallback
// để không làm vỡ các bản triển khai trước.
const EPSILON_MUC12_DATA_FILES = [
    `${CLASS1_MATH_DATA_ROOT}toan_1_muc12.json`
];
let epsilonMuc12ResolvedFile_ = '';
let epsilonMuc12DataCache = null;
let numberSenseDataCache = null;
let activeNumberSense = null;
let numberSenseHintLevel = 0;
let numberSenseTouched = new Set();
let numberSenseBuildCount = 0;
let numberSenseFrameFilled = new Set();
let numberSenseFlashTimer = null;

async function loadEpsilonMuc12Data_() {
    if (epsilonMuc12DataCache) return epsilonMuc12DataCache;

    const errors = [];
    for (const file of EPSILON_MUC12_DATA_FILES) {
        try {
            const res = await fetch(file, { cache: 'no-store' });
            if (!res.ok) {
                errors.push(`${file}: HTTP ${res.status}`);
                continue;
            }

            const data = await res.json();
            if (!data || Number(data.topic_id) !== 12 || !Array.isArray(data.tracks) || !data.tracks.length) {
                errors.push(`${file}: sai cấu trúc dữ liệu`);
                continue;
            }

            epsilonMuc12ResolvedFile_ = file;
            epsilonMuc12DataCache = data;
            return data;
        } catch (err) {
            errors.push(`${file}: ${err?.message || 'không đọc được JSON'}`);
        }
    }

    console.error('[Mục 12] Không tải được dữ liệu:', errors);
    throw new Error('Không thể tải dữ liệu Mục 12 của module Toán.');
}

async function loadNumberSenseData_() {
    if (numberSenseDataCache) return numberSenseDataCache;
    const root = await loadEpsilonMuc12Data_();
    const track = root.tracks.find(t => t.internal_id === 'EPSILON_NUMBER_SENSE' || t.engine === 'number_sense');
    const data = track?.content;
    if (!data || !Array.isArray(data.journeys)) throw new Error('Dữ liệu 12.1 chưa đúng cấu trúc');
    numberSenseDataCache = data;
    return data;
}

function numberSenseEvidenceKey_() {
    const id = String(currentUser?.maHS || 'KHACH').toUpperCase();
    return `epsilon_ns1_evidence_${id}`;
}

function readNumberSenseEvidence_() {
    try { return JSON.parse(localStorage.getItem(numberSenseEvidenceKey_()) || '{}') || {}; }
    catch (e) { return {}; }
}

function writeNumberSenseEvidence_(data) {
    try { localStorage.setItem(numberSenseEvidenceKey_(), JSON.stringify(data || {})); } catch (e) {}
}

function getNumberSenseJourneyState_(journeyId) {
    const ev = readNumberSenseEvidence_();
    return ev[journeyId] || { mastery: 'not_observed', completed: [], attempts: 0, hint_uses: 0, transfer_correct: 0 };
}

function numberSenseMasteryLabel_(state) {
    const map = {
        not_observed: 'Chưa học',
        emerging: 'Đang hình thành',
        supported: 'Làm được khi có hỗ trợ',
        independent: 'Làm được độc lập',
        generalized: 'Hiểu ở dạng khác',
        retained: 'Ghi nhớ bền vững'
    };
    return map[state] || map.not_observed;
}

function numberSenseMasteryClass_(state) {
    if (state === 'generalized' || state === 'retained') return 'bg-emerald-100 text-emerald-700 border-emerald-200';
    if (state === 'independent') return 'bg-sky-100 text-sky-700 border-sky-200';
    if (state === 'supported') return 'bg-amber-100 text-amber-700 border-amber-200';
    if (state === 'emerging') return 'bg-purple-100 text-purple-700 border-purple-200';
    return 'bg-slate-100 text-slate-500 border-slate-200';
}

async function openNumberSenseHub() {
    setAppShellRootMode_(false);
    setMainTabActive_('discover');
    stopSpeaking();
    clearInterval(quizTimerInterval);
    clearTimeout(numberSenseFlashTimer);
    activeBaiHocContext = null;
    activeExamContext = null;
    activeRoadmapContext = null;
    activeTopicId = 12;
    pendingTopicQuiz = null;
    activeNumberSense = null;
    updateNavTabs('12. Math Lab - Toán tư duy Mỹ', '✨', '12.1 Number Sense Lab - Cảm nhận số', null);
    switchAppView('view-number-sense');
    const host = document.getElementById('number-sense-content');
    if (host) host.innerHTML = '<div class="py-16 text-center font-black text-purple-600">🌱 Đang mở thế giới số lượng...</div>';
    try {
        const data = await loadNumberSenseData_();
        renderNumberSenseHub_(data);
    } catch (err) {
        if (host) host.innerHTML = `<div class="rounded-3xl border-2 border-rose-200 bg-rose-50 p-6 text-center font-bold text-rose-700">${escapeHtml(err.message)}</div>`;
    }
}

function renderNumberSenseHub_(data) {
    const host = document.getElementById('number-sense-content');
    if (!host) return;
    const evidence = readNumberSenseEvidence_();
    const cards = data.journeys.map(j => {
        const st = evidence[j.id] || { mastery: 'not_observed', completed: [] };
        const done = Array.isArray(st.completed) ? st.completed.length : 0;
        const total = Array.isArray(j.activities) ? j.activities.length : 0;
        return `<button onclick="startNumberSenseJourney_('${escapeJsString_(j.id)}')" class="ns-journey-card text-left">
            <div class="flex items-start justify-between gap-3">
                <div class="flex items-center gap-3 min-w-0">
                    <div class="ns-journey-icon">${escapeHtml(j.icon || '🌱')}</div>
                    <div class="min-w-0">
                        <div class="text-[11px] font-black uppercase tracking-wider text-purple-500">Hành trình ${j.order}</div>
                        <h3 class="font-black text-slate-800 text-base md:text-lg leading-tight mt-0.5">${escapeHtml(j.title)}</h3>
                    </div>
                </div>
                <span class="shrink-0 rounded-full border px-2 py-1 text-[10px] md:text-xs font-black ${numberSenseMasteryClass_(st.mastery)}">${escapeHtml(numberSenseMasteryLabel_(st.mastery))}</span>
            </div>
            <p class="mt-3 text-xs md:text-sm font-bold text-slate-500 leading-relaxed">${escapeHtml(j.goal)}</p>
            <div class="mt-3 flex items-center gap-2">
                <div class="h-2 flex-1 rounded-full bg-slate-100 overflow-hidden"><div class="h-full rounded-full bg-gradient-to-r from-pink-400 to-purple-500" style="width:${total ? Math.round(done/total*100) : 0}%"></div></div>
                <span class="text-[11px] font-black text-slate-400">${done}/${total}</span>
            </div>
        </button>`;
    }).join('');

    host.innerHTML = `<div class="w-full max-w-6xl mx-auto">
        <div class="mb-3"><button onclick="openEpsilonMethodHub_()" class="ns-secondary-btn">← Mục 12 · Phương pháp mới</button></div>
        <section class="ns-hero">
            <div>
                <div class="text-xs md:text-sm font-black uppercase tracking-[.16em] text-pink-500">Epsilon Number Sense</div>
                <h2 class="mt-1 text-2xl md:text-3xl font-black text-slate-900">Con hiểu số nghĩa là gì</h2>
                <p class="mt-2 max-w-3xl text-sm md:text-base font-bold text-slate-600 leading-relaxed">Không bắt đầu bằng ký hiệu. Con nhìn lượng, thao tác, đếm có ý nghĩa, tự tạo nhóm, rồi mới nối với từ số và chữ số.</p>
            </div>
            <div class="ns-hero-flow">Trải nghiệm → Thao tác → Nhìn thấy → Diễn đạt → Ký hiệu</div>
        </section>
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 mt-4">${cards}</div>
    </div>`;
}

async function startNumberSenseJourney_(journeyId) {
    clearTimeout(numberSenseFlashTimer);
    const data = await loadNumberSenseData_();
    const journey = data.journeys.find(j => j.id === journeyId);
    if (!journey) return;
    activeNumberSense = { journeyId, journey, activityIndex: 0, activityStartedAt: Date.now() };
    const st = getNumberSenseJourneyState_(journeyId);
    if (Array.isArray(st.completed) && st.completed.length) {
        const firstOpen = journey.activities.findIndex(a => !st.completed.includes(a.id));
        activeNumberSense.activityIndex = firstOpen >= 0 ? firstOpen : 0;
    }
    updateNavTabs('12. Math Lab - Toán tư duy Mỹ', '✨', '12.1 Number Sense Lab - Cảm nhận số', `${journey.order}. ${journey.title}`);
    renderNumberSenseActivity_();
}

function currentNumberSenseActivity_() {
    return activeNumberSense?.journey?.activities?.[activeNumberSense.activityIndex] || null;
}

function resetNumberSenseInteraction_() {
    clearTimeout(numberSenseFlashTimer);
    numberSenseHintLevel = 0;
    numberSenseTouched = new Set();
    numberSenseBuildCount = 0;
    numberSenseFrameFilled = new Set();
    if (activeNumberSense) activeNumberSense.activityStartedAt = Date.now();
}

function renderNumberSenseActivity_() {
    const host = document.getElementById('number-sense-content');
    const activity = currentNumberSenseActivity_();
    const journey = activeNumberSense?.journey;
    if (!host || !activity || !journey) return;
    resetNumberSenseInteraction_();
    const step = activeNumberSense.activityIndex + 1;
    const total = journey.activities.length;
    const evidenceList = (journey.evidence || []).map(x => `<span class="ns-evidence-pill">✓ ${escapeHtml(x)}</span>`).join('');
    host.innerHTML = `<div class="w-full max-w-5xl mx-auto">
        <div class="flex items-center justify-between gap-3 mb-3">
            <button onclick="openNumberSenseHub()" class="ns-secondary-btn">← 12 hành trình</button>
            <div class="text-center min-w-0">
                <div class="text-xs font-black text-purple-500">${escapeHtml(journey.icon)} Hành trình ${journey.order} · Bước ${step}/${total}</div>
                <h2 class="text-lg md:text-xl font-black text-slate-800 truncate">${escapeHtml(journey.title)}</h2>
            </div>
            <div class="w-[108px] text-right text-xs font-black text-slate-400">${Math.round(step/total*100)}%</div>
        </div>
        <div class="h-2 bg-slate-100 rounded-full overflow-hidden mb-3"><div class="h-full bg-gradient-to-r from-pink-400 via-purple-400 to-sky-400" style="width:${Math.round(step/total*100)}%"></div></div>
        <section class="ns-teacher-bubble"><span class="text-2xl">🐰</span><div class="flex-1 min-w-0"><div class="text-[10px] font-black uppercase tracking-wider text-pink-500">Cô Thỏ Hồng</div><div class="font-extrabold text-slate-700 leading-relaxed">${escapeHtml(activity.teacher || '')}</div></div><button onclick="speakNumberSenseActivity_()" class="ns-listen-btn" title="Nghe lại hướng dẫn">🔊 <span>Nghe cô nói</span></button></section>
        <section class="ns-workspace mt-3">
            <h3 class="text-center text-lg md:text-xl font-black text-slate-900 mb-3">${escapeHtml(activity.prompt || '')}</h3>
            <div id="ns-activity-stage" class="w-full">${renderNumberSenseActivityBody_(activity)}</div>
            <div id="ns-feedback" class="hidden mt-3 rounded-2xl border-2 p-3 text-center font-black"></div>
            <div id="ns-hint" class="hidden mt-3 rounded-2xl border border-amber-200 bg-amber-50 p-3 text-center font-bold text-amber-800"></div>
        </section>
        <div class="mt-3 flex flex-wrap justify-center gap-2">${evidenceList}</div>
        <div class="mt-4 flex items-center justify-between gap-2">
            <button onclick="numberSenseShowHint_()" class="ns-secondary-btn">💡 Gợi ý</button>
            <button onclick="renderNumberSenseActivity_()" class="ns-secondary-btn">↻ Làm lại</button>
            <button id="ns-next-btn" onclick="numberSenseNext_()" class="hidden ns-primary-btn">Tiếp tục →</button>
        </div>
    </div>`;
    activateNumberSenseActivity_(activity);
    if (autoSpeechEnabled) setTimeout(() => speakNumberSenseActivity_(), 120);
}

function nsChoiceButtons_(choices) {
    return `<div class="grid grid-cols-1 sm:grid-cols-3 gap-2 max-w-2xl mx-auto">${(choices || []).map(c => {
        const value = typeof c === 'object' ? c.value : c;
        const label = typeof c === 'object' ? c.label : c;
        return `<button class="ns-choice" onclick="numberSenseChoose_('${escapeJsString_(String(value))}', this)">${escapeHtml(String(label))}</button>`;
    }).join('')}</div>`;
}

function nsObjects_(count, object, extraClass = '') {
    return Array.from({length: Number(count) || 0}, (_, i) => `<span class="ns-static-object ${extraClass}" data-i="${i}">${escapeHtml(object || '●')}</span>`).join('');
}

function renderNumberSenseActivityBody_(a) {
    if (a.type === 'flash_quantity') {
        return `<div class="text-center"><div id="ns-flash-box" class="ns-visual-box"><div class="ns-object-row">${nsObjects_(a.quantity,a.object)}</div></div><div id="ns-choice-zone" class="hidden mt-4">${nsChoiceButtons_(a.choices)}</div></div>`;
    }
    if (a.type === 'touch_count') {
        const positions = a.scatter ? ['translate-y-2','-translate-y-3','translate-y-5','-translate-y-1','translate-y-1','-translate-y-4'] : [];
        const objs = Array.from({length:a.quantity},(_,i)=>`<button class="ns-touch-object ${positions[i%positions.length]||''}" onclick="numberSenseTouchCount_(this,${i})"><span>${escapeHtml(a.object)}</span><b class="ns-count-badge hidden"></b></button>`).join('');
        return `<div class="ns-visual-box"><div class="flex flex-wrap justify-center items-center gap-3 md:gap-5">${objs}</div></div><div id="ns-touch-summary" class="mt-3 text-center text-sm font-black text-slate-500">Đã chạm: 0/${a.quantity}</div>`;
    }
    if (a.type === 'build_quantity') {
        const model = a.target_mode === 'model' ? `<div class="mb-3 text-center"><div class="text-xs font-black text-purple-500 mb-1">NHÓM MẪU</div><div class="ns-object-row">${nsObjects_(a.target,a.model_object||'⭐')}</div></div>` : '';
        const bank = Array.from({length: Math.max(6,a.target+3)},(_,i)=>`<button draggable="true" ondragstart="numberSenseDragStart_(event)" onclick="numberSenseAddObject_()" class="ns-bank-object">${escapeHtml(a.object)}</button>`).join('');
        return `${model}<div class="grid md:grid-cols-[1fr_1.2fr] gap-3"><div class="ns-bank"><div class="text-xs font-black text-slate-500 mb-2">KHO ĐỒ VẬT</div><div class="flex flex-wrap justify-center gap-2">${bank}</div></div><div id="ns-build-tray" class="ns-tray" ondragover="event.preventDefault()" ondrop="numberSenseDropObject_(event)"><div class="text-xs font-black text-pink-500">NHÓM CỦA CON</div><div id="ns-build-items" class="flex flex-wrap justify-center gap-2 mt-2 min-h-[62px]"></div><button onclick="numberSenseRemoveObject_()" class="mt-2 text-xs font-black text-slate-400 hover:text-rose-500">Bớt 1 vật</button></div></div><div class="text-center mt-3"><button onclick="numberSenseCheckBuild_()" class="ns-primary-btn">Con làm xong rồi</button></div>`;
    }
    if (a.type === 'hidden_cardinality') {
        return `<div class="text-center"><div id="ns-hidden-group" class="ns-visual-box"><div class="ns-object-row">${nsObjects_(a.quantity,a.object)}</div></div><button id="ns-hide-btn" onclick="numberSenseHideGroup_()" class="mt-3 ns-primary-btn">🙈 Che lại</button><div id="ns-hidden-choices" class="hidden mt-4">${nsChoiceButtons_(a.choices)}</div></div>`;
    }
    if (a.type === 'conservation') {
        const before = nsObjects_(a.quantity,a.object);
        return `<div class="text-center"><div class="text-xs font-black text-slate-400 mb-1">TRƯỚC KHI XẾP LẠI</div><div class="ns-visual-box"><div class="ns-object-row">${before}</div></div><button id="ns-rearrange-btn" onclick="numberSenseRearrange_()" class="mt-3 ns-primary-btn">🔄 Xếp lại</button><div id="ns-conservation-after" class="hidden mt-3"></div><div id="ns-conservation-choices" class="hidden mt-4">${nsChoiceButtons_(a.choices)}</div></div>`;
    }
    if (a.type === 'representation_choice') {
        return `<div class="text-center"><div class="ns-symbol-card whitespace-pre-line">${escapeHtml(a.stimulus || '')}</div><div class="mt-4">${nsChoiceButtons_(a.choices)}</div></div>`;
    }
    if (a.type === 'frame_build') {
        const cells = Array.from({length:a.frame_size},(_,i)=>`<button class="ns-frame-cell" onclick="numberSenseToggleFrame_(this,${i})"></button>`).join('');
        return `<div class="text-center"><div class="ns-frame ${a.frame_size===10?'ns-frame-10':''}">${cells}</div><div id="ns-frame-count" class="mt-2 text-xs font-black text-slate-400">Đã đặt 0 chấm</div><button onclick="numberSenseCheckFrame_()" class="mt-3 ns-primary-btn">Con làm xong rồi</button></div>`;
    }
    if (a.type === 'compare_groups') {
        const leftGap = a.left?.spread ? 'gap-7 md:gap-10' : 'gap-2 md:gap-3';
        const rightGap = a.right?.spread ? 'gap-7 md:gap-10' : 'gap-2 md:gap-3';
        return `<div class="grid md:grid-cols-2 gap-3"><div class="ns-group-card"><div class="text-xs font-black text-sky-600 mb-2">${escapeHtml(a.left.label||'Nhóm A')}</div><div class="flex flex-wrap justify-center ${leftGap}">${nsObjects_(a.left.count,a.left.object)}</div></div><div class="ns-group-card"><div class="text-xs font-black text-amber-600 mb-2">${escapeHtml(a.right.label||'Nhóm B')}</div><div class="flex flex-wrap justify-center ${rightGap}">${nsObjects_(a.right.count,a.right.object)}</div></div></div><div class="mt-4">${nsChoiceButtons_(a.choices)}</div>`;
    }
    if (a.type === 'one_more_less') {
        const after = a.action === 'more' ? a.start + 1 : a.start - 1;
        return `<div class="text-center"><div class="ns-visual-box"><div class="ns-object-row">${nsObjects_(a.start,a.object)}</div></div><div class="my-2 text-sm font-black ${a.action==='more'?'text-emerald-600':'text-rose-500'}">${a.action==='more'?'➕ thêm 1':'➖ bớt 1'}</div><div class="ns-visual-box bg-white"><div class="ns-object-row">${nsObjects_(after,a.object)}</div></div><div class="mt-4">${nsChoiceButtons_(a.choices)}</div></div>`;
    }
    if (a.type === 'part_whole') {
        const known = nsObjects_(a.part,a.object);
        const unknownCount = Math.max(0,a.whole-a.part);
        const unknown = nsObjects_(unknownCount,a.object);
        return `<div class="text-center"><div class="ns-whole-card"><div class="text-xs font-black text-purple-500">CẢ NHÓM</div><div class="ns-object-row mt-2">${nsObjects_(a.whole,a.object)}</div></div><div class="text-2xl my-2">↙️ &nbsp; ↘️</div><div class="grid grid-cols-2 gap-3 max-w-xl mx-auto"><div class="ns-part-card"><div class="text-xs font-black text-sky-600">PHẦN ĐÃ BIẾT</div><div class="ns-object-row mt-2">${known}</div></div><div class="ns-part-card"><div class="text-xs font-black text-pink-600">PHẦN CÒN LẠI</div><div class="text-3xl md:text-5xl font-black text-pink-400 mt-3">?</div><div class="hidden">${unknown}</div></div></div><div class="mt-4">${nsChoiceButtons_(a.choices)}</div></div>`;
    }
    return '<div class="text-center font-bold text-slate-500">Hoạt động đang được hoàn thiện.</div>';
}

function activateNumberSenseActivity_(a) {
    if (a.type === 'flash_quantity') {
        const box = document.getElementById('ns-flash-box');
        const choices = document.getElementById('ns-choice-zone');
        numberSenseFlashTimer = setTimeout(() => {
            if (box) box.innerHTML = '<div class="text-5xl">☁️</div><div class="mt-2 text-base md:text-lg font-black text-slate-400">Hình đã được che</div>';
            choices?.classList.remove('hidden');
        }, Math.max(700, Number(a.display_ms)||1000));
    }
}

function numberSenseShowHint_() {
    const a = currentNumberSenseActivity_();
    if (!a) return;
    numberSenseHintLevel = Math.min(3, numberSenseHintLevel + 1);
    const hint = (a.hints || [])[numberSenseHintLevel - 1] || 'Con thử quan sát lại từng bước nhé.';
    const box = document.getElementById('ns-hint');
    if (box) { box.textContent = `💡 ${hint}`; box.classList.remove('hidden'); }
    speakVietnamese((a.hints_audio || [])[operationSenseHintLevel - 1] || hint, 0.94);
    speakVietnamese((a.hints_audio || [])[numberSenseHintLevel - 1] || hint, 0.94);
    if (a.type === 'flash_quantity' && numberSenseHintLevel >= 2) {
        const flash = document.getElementById('ns-flash-box');
        if (flash) flash.innerHTML = `<div class="ns-object-row">${nsObjects_(a.quantity,a.object)}</div>`;
    }
    if (a.type === 'hidden_cardinality' && numberSenseHintLevel >= 3) {
        const group = document.getElementById('ns-hidden-group');
        if (group) group.innerHTML = `<div class="ns-object-row">${nsObjects_(a.quantity,a.object)}</div>`;
    }
}

function numberSenseChoose_(value, btn) {
    const a = currentNumberSenseActivity_();
    if (!a) return;
    document.querySelectorAll('#ns-activity-stage .ns-choice').forEach(x => x.classList.remove('ring-4','ring-pink-200'));
    btn?.classList.add('ring-4','ring-pink-200');
    const ok = String(value) === String(a.answer);
    if (ok) numberSenseCompleteActivity_();
    else numberSenseWrong_();
}

function numberSenseTouchCount_(btn, index) {
    const a = currentNumberSenseActivity_();
    if (!a || numberSenseTouched.has(index)) return;
    numberSenseTouched.add(index);
    btn.classList.add('is-counted');
    const badge = btn.querySelector('.ns-count-badge');
    if (badge) { badge.textContent = String(numberSenseTouched.size); badge.classList.remove('hidden'); }
    const summary = document.getElementById('ns-touch-summary');
    if (summary) summary.textContent = `Đã chạm: ${numberSenseTouched.size}/${a.quantity}`;
    speakVietnamese(String(numberSenseTouched.size), 0.98);
    if (numberSenseTouched.size === Number(a.quantity)) numberSenseCompleteActivity_();
}

function numberSenseDragStart_(event) {
    if (event?.dataTransfer) event.dataTransfer.setData('text/plain','ns-object');
}
function numberSenseDropObject_(event) { event.preventDefault(); numberSenseAddObject_(); }
function numberSenseAddObject_() {
    const a = currentNumberSenseActivity_();
    if (!a || a.type !== 'build_quantity' || numberSenseBuildCount >= 10) return;
    numberSenseBuildCount++;
    renderNumberSenseBuildItems_();
    speakVietnamese(String(numberSenseBuildCount), 0.98);
}
function numberSenseRemoveObject_() {
    numberSenseBuildCount = Math.max(0, numberSenseBuildCount - 1);
    renderNumberSenseBuildItems_();
}
function renderNumberSenseBuildItems_() {
    const a = currentNumberSenseActivity_();
    const host = document.getElementById('ns-build-items');
    if (!a || !host) return;
    host.innerHTML = nsObjects_(numberSenseBuildCount,a.object);
}
function numberSenseCheckBuild_() {
    const a = currentNumberSenseActivity_();
    if (!a) return;
    if (numberSenseBuildCount === Number(a.target)) numberSenseCompleteActivity_();
    else numberSenseWrong_(numberSenseBuildCount < Number(a.target) ? 'Nhóm của con còn ít hơn nhóm cần tạo.' : 'Nhóm của con đang nhiều hơn nhóm cần tạo.');
}

function numberSenseHideGroup_() {
    const a = currentNumberSenseActivity_();
    const group = document.getElementById('ns-hidden-group');
    if (group) group.innerHTML = '<div class="text-5xl">🙈</div><div class="mt-2 text-base md:text-lg font-black text-slate-400">Cô đã che nhóm lại</div>';
    document.getElementById('ns-hide-btn')?.classList.add('hidden');
    document.getElementById('ns-hidden-choices')?.classList.remove('hidden');
}

function numberSenseRearrange_() {
    const a = currentNumberSenseActivity_();
    const after = document.getElementById('ns-conservation-after');
    if (!a || !after) return;
    const cls = a.compact ? 'gap-0.5 md:gap-1' : 'gap-7 md:gap-12';
    after.innerHTML = `<div class="text-xs font-black text-slate-400 mb-1">SAU KHI XẾP LẠI</div><div class="ns-visual-box"><div class="flex flex-wrap justify-center items-center ${cls}">${nsObjects_(a.quantity,a.object)}</div></div>`;
    after.classList.remove('hidden');
    document.getElementById('ns-rearrange-btn')?.classList.add('hidden');
    document.getElementById('ns-conservation-choices')?.classList.remove('hidden');
}

function numberSenseToggleFrame_(btn, index) {
    if (numberSenseFrameFilled.has(index)) {
        numberSenseFrameFilled.delete(index); btn.classList.remove('is-filled'); btn.textContent = '';
    } else {
        numberSenseFrameFilled.add(index); btn.classList.add('is-filled'); btn.textContent = '●';
    }
    const label = document.getElementById('ns-frame-count');
    if (label) label.textContent = `Đã đặt ${numberSenseFrameFilled.size} chấm`;
    speakVietnamese(String(numberSenseFrameFilled.size), 0.98);
}
function numberSenseCheckFrame_() {
    const a = currentNumberSenseActivity_();
    if (!a) return;
    if (numberSenseFrameFilled.size === Number(a.target)) numberSenseCompleteActivity_();
    else numberSenseWrong_(`Con đang có ${numberSenseFrameFilled.size} chấm. Hãy quan sát lại yêu cầu.`);
}

function numberSenseWrong_(message = '') {
    const a = currentNumberSenseActivity_();
    const fb = document.getElementById('ns-feedback');
    if (fb) {
        fb.className = 'mt-3 rounded-2xl border-2 border-amber-200 bg-amber-50 p-3 text-center font-black text-amber-800';
        fb.textContent = `Chưa khớp rồi. ${message || 'Con thử quan sát lại nhé.'}`;
    }
    speakVietnamese(a?.wrong_audio || message || 'Chưa khớp rồi. Con thử quan sát lại nhé.', 0.94);
    const ev = readNumberSenseEvidence_();
    const jid = activeNumberSense?.journeyId;
    if (jid) {
        const st = ev[jid] || { mastery:'not_observed', completed:[], attempts:0, hint_uses:0, transfer_correct:0 };
        st.attempts = Number(st.attempts||0) + 1;
        if (st.mastery === 'not_observed') st.mastery = 'emerging';
        ev[jid] = st; writeNumberSenseEvidence_(ev);
    }
}

function numberSenseCompleteActivity_() {
    const a = currentNumberSenseActivity_();
    if (!a || !activeNumberSense) return;
    const fb = document.getElementById('ns-feedback');
    if (fb) {
        fb.className = 'mt-3 rounded-2xl border-2 border-emerald-200 bg-emerald-50 p-3 text-center font-black text-emerald-700';
        fb.textContent = `✅ ${a.success || 'Con làm đúng rồi!'}`;
    }
    speakVietnamese(a.success_audio || a.success || 'Con làm đúng rồi!', 0.94);
    document.getElementById('ns-next-btn')?.classList.remove('hidden');
    document.querySelectorAll('#ns-activity-stage button').forEach(b => { if (!b.id?.includes('next')) b.disabled = true; });

    const ev = readNumberSenseEvidence_();
    const jid = activeNumberSense.journeyId;
    const st = ev[jid] || { mastery:'not_observed', completed:[], attempts:0, hint_uses:0, transfer_correct:0 };
    st.attempts = Number(st.attempts||0) + 1;
    st.hint_uses = Number(st.hint_uses||0) + numberSenseHintLevel;
    st.completed = Array.isArray(st.completed) ? st.completed : [];
    if (!st.completed.includes(a.id)) st.completed.push(a.id);
    if (a.transfer && numberSenseHintLevel === 0) st.transfer_correct = Number(st.transfer_correct||0) + 1;
    const allDone = activeNumberSense.journey.activities.every(x => st.completed.includes(x.id));
    if (allDone && Number(st.transfer_correct||0) > 0) st.mastery = 'generalized';
    else if (allDone && numberSenseHintLevel === 0) st.mastery = 'independent';
    else if (allDone) st.mastery = 'supported';
    else if (numberSenseHintLevel === 0) st.mastery = 'independent';
    else st.mastery = 'supported';
    st.last_seen = new Date().toISOString();
    st.last_activity = a.id;
    st.last_hint_level = numberSenseHintLevel;
    st.last_latency_ms = Math.max(0, Date.now() - Number(activeNumberSense.activityStartedAt||Date.now()));
    ev[jid] = st;
    writeNumberSenseEvidence_(ev);
}

function numberSenseNext_() {
    if (!activeNumberSense) return;
    const journey = activeNumberSense.journey;
    if (activeNumberSense.activityIndex < journey.activities.length - 1) {
        activeNumberSense.activityIndex++;
        renderNumberSenseActivity_();
        return;
    }
    const host = document.getElementById('number-sense-content');
    const state = getNumberSenseJourneyState_(journey.id);
    if (host) host.innerHTML = `<div class="w-full max-w-3xl mx-auto text-center py-6"><div class="text-6xl">🌟</div><h2 class="mt-3 text-2xl md:text-3xl font-black text-purple-700">Con vừa hoàn thành một hành trình!</h2><p class="mt-2 font-bold text-slate-600">${escapeHtml(journey.goal)}</p><div class="mt-4 inline-flex rounded-full border px-4 py-2 text-sm font-black ${numberSenseMasteryClass_(state.mastery)}">${escapeHtml(numberSenseMasteryLabel_(state.mastery))}</div><div class="mt-6 flex flex-wrap justify-center gap-3"><button onclick="openNumberSenseHub()" class="ns-secondary-btn">← Bản đồ 12.1</button>${journey.order < 12 ? `<button onclick="startNumberSenseJourney_('NS1.${journey.order+1}')" class="ns-primary-btn">Hành trình tiếp theo →</button>` : ''}</div></div>`;
}


// ==========================================
// EPSILON METHOD 12.2 - OPERATIONAL SENSE
// Tình huống -> thao tác -> nhìn thấy -> diễn đạt -> ký hiệu -> chiến lược -> transfer
// ==========================================
let operationSenseDataCache = null;
let activeOperationSense = null;
let operationSenseHintLevel = 0;
let operationSenseMovedCount = 0;
let operationSenseRemoved = new Set();
let operationSenseSplit = new Set();
let operationSensePathCount = 0;
let operationSenseMakeTenMoved = 0;

async function loadOperationSenseData_() {
    if (operationSenseDataCache) return operationSenseDataCache;
    const root = await loadEpsilonMuc12Data_();
    const track = root.tracks.find(t => t.internal_id === 'EPSILON_OPERATION_SENSE' || t.engine === 'operation_sense');
    const data = track?.content;
    if (!data || !Array.isArray(data.journeys)) throw new Error('Dữ liệu 12.2 chưa đúng cấu trúc');
    operationSenseDataCache = data;
    return data;
}

function operationSenseEvidenceKey_() {
    const id = String(currentUser?.maHS || 'KHACH').toUpperCase();
    return `epsilon_os2_evidence_${id}`;
}
function readOperationSenseEvidence_() {
    try { return JSON.parse(localStorage.getItem(operationSenseEvidenceKey_()) || '{}') || {}; }
    catch (e) { return {}; }
}
function writeOperationSenseEvidence_(data) {
    try { localStorage.setItem(operationSenseEvidenceKey_(), JSON.stringify(data || {})); } catch (e) {}
}
function getOperationSenseJourneyState_(journeyId) {
    const ev = readOperationSenseEvidence_();
    return ev[journeyId] || { mastery:'not_observed', completed:[], attempts:0, hint_uses:0, transfer_correct:0 };
}
function operationSenseMasteryLabel_(state) { return numberSenseMasteryLabel_(state); }
function operationSenseMasteryClass_(state) { return numberSenseMasteryClass_(state); }

async function openOperationSenseHub() {
    setAppShellRootMode_(false);
    setMainTabActive_('discover');
    stopSpeaking();
    clearInterval(quizTimerInterval);
    activeBaiHocContext = null;
    activeExamContext = null;
    activeRoadmapContext = null;
    activeTopicId = 12;
    pendingTopicQuiz = null;
    activeOperationSense = null;
    updateNavTabs('12. Math Lab - Toán tư duy Mỹ', '✨', '12.2 Addition & Subtraction Lab - Tư duy cộng trừ', null);
    switchAppView('view-operation-sense');
    const host = document.getElementById('operation-sense-content');
    if (host) host.innerHTML = '<div class="py-16 text-center font-black text-purple-600">🧩 Đang mở thế giới của những thay đổi...</div>';
    try {
        const data = await loadOperationSenseData_();
        renderOperationSenseHub_(data);
    } catch (err) {
        if (host) host.innerHTML = `<div class="rounded-3xl border-2 border-rose-200 bg-rose-50 p-6 text-center font-bold text-rose-700">${escapeHtml(err.message)}</div>`;
    }
}

function renderOperationSenseHub_(data) {
    const host = document.getElementById('operation-sense-content');
    if (!host) return;
    const evidence = readOperationSenseEvidence_();
    const cards = data.journeys.map(j => {
        const st = evidence[j.id] || { mastery:'not_observed', completed:[] };
        const done = Array.isArray(st.completed) ? st.completed.length : 0;
        const total = Array.isArray(j.activities) ? j.activities.length : 0;
        return `<button onclick="startOperationSenseJourney_('${escapeJsString_(j.id)}')" class="ns-journey-card text-left">
            <div class="flex items-start justify-between gap-3">
                <div class="flex items-center gap-3 min-w-0">
                    <div class="os-journey-icon">${escapeHtml(j.icon || '🧩')}</div>
                    <div class="min-w-0">
                        <div class="text-[11px] font-black uppercase tracking-wider text-indigo-500">Hành trình ${j.order}</div>
                        <h3 class="font-black text-slate-800 text-base md:text-lg leading-tight mt-0.5">${escapeHtml(j.title)}</h3>
                    </div>
                </div>
                <span class="shrink-0 rounded-full border px-2 py-1 text-[10px] md:text-xs font-black ${operationSenseMasteryClass_(st.mastery)}">${escapeHtml(operationSenseMasteryLabel_(st.mastery))}</span>
            </div>
            <p class="mt-3 text-xs md:text-sm font-bold text-slate-500 leading-relaxed">${escapeHtml(j.goal)}</p>
            <div class="mt-3 flex items-center gap-2"><div class="h-2 flex-1 rounded-full bg-slate-100 overflow-hidden"><div class="h-full rounded-full bg-gradient-to-r from-violet-400 via-indigo-400 to-sky-400" style="width:${total ? Math.round(done/total*100) : 0}%"></div></div><span class="text-[11px] font-black text-slate-400">${done}/${total}</span></div>
        </button>`;
    }).join('');
    host.innerHTML = `<div class="w-full max-w-6xl mx-auto">
        <div class="mb-3"><button onclick="openEpsilonMethodHub_()" class="ns-secondary-btn">← Mục 12 · Phương pháp mới</button></div>
        <section class="os-hero">
            <div>
                <div class="text-xs md:text-sm font-black uppercase tracking-[.16em] text-violet-500">Epsilon Operational Sense</div>
                <h2 class="mt-1 text-2xl md:text-3xl font-black text-slate-900">Con hiểu điều gì xảy ra khi số lượng thay đổi</h2>
                <p class="mt-2 max-w-3xl text-sm md:text-base font-bold text-slate-600 leading-relaxed">Không bắt đầu bằng 3 + 2 = ?. Con thêm, bớt, gộp, tách, so sánh và kể lại điều mình thấy; ký hiệu chỉ xuất hiện sau khi ý nghĩa đã rõ.</p>
            </div>
            <div class="os-hero-flow">Câu chuyện → Hành động → Mô hình → Lời nói → Ký hiệu → Chiến lược</div>
        </section>
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 mt-4">${cards}</div>
    </div>`;
}

async function startOperationSenseJourney_(journeyId) {
    const data = await loadOperationSenseData_();
    const journey = data.journeys.find(j => j.id === journeyId);
    if (!journey) return;
    activeOperationSense = { journeyId, journey, activityIndex:0, activityStartedAt:Date.now() };
    const st = getOperationSenseJourneyState_(journeyId);
    if (Array.isArray(st.completed) && st.completed.length) {
        const firstOpen = journey.activities.findIndex(a => !st.completed.includes(a.id));
        activeOperationSense.activityIndex = firstOpen >= 0 ? firstOpen : 0;
    }
    updateNavTabs('12. Math Lab - Toán tư duy Mỹ', '✨', '12.2 Addition & Subtraction Lab - Tư duy cộng trừ', `${journey.order}. ${journey.title}`);
    renderOperationSenseActivity_();
}

function currentOperationSenseActivity_() {
    return activeOperationSense?.journey?.activities?.[activeOperationSense.activityIndex] || null;
}
function resetOperationSenseInteraction_() {
    operationSenseHintLevel = 0;
    operationSenseMovedCount = 0;
    operationSenseRemoved = new Set();
    operationSenseSplit = new Set();
    operationSensePathCount = 0;
    operationSenseMakeTenMoved = 0;
    if (activeOperationSense) activeOperationSense.activityStartedAt = Date.now();
}

function renderOperationSenseActivity_() {
    const host = document.getElementById('operation-sense-content');
    const activity = currentOperationSenseActivity_();
    const journey = activeOperationSense?.journey;
    if (!host || !activity || !journey) return;
    resetOperationSenseInteraction_();
    const step = activeOperationSense.activityIndex + 1;
    const total = journey.activities.length;
    const evidenceList = (journey.evidence || []).map(x => `<span class="ns-evidence-pill">✓ ${escapeHtml(x)}</span>`).join('');
    host.innerHTML = `<div class="w-full max-w-5xl mx-auto">
        <div class="flex items-center justify-between gap-3 mb-3">
            <button onclick="openOperationSenseHub()" class="ns-secondary-btn">← 14 hành trình</button>
            <div class="text-center min-w-0"><div class="text-xs font-black text-indigo-500">${escapeHtml(journey.icon)} Hành trình ${journey.order} · Bước ${step}/${total}</div><h2 class="text-lg md:text-xl font-black text-slate-800 truncate">${escapeHtml(journey.title)}</h2></div>
            <div class="w-[108px] text-right text-xs font-black text-slate-400">${Math.round(step/total*100)}%</div>
        </div>
        <div class="h-2 bg-slate-100 rounded-full overflow-hidden mb-3"><div class="h-full bg-gradient-to-r from-violet-400 via-indigo-400 to-sky-400" style="width:${Math.round(step/total*100)}%"></div></div>
        <section class="ns-teacher-bubble os-teacher-bubble"><span class="text-2xl">🐰</span><div class="flex-1 min-w-0"><div class="text-[10px] font-black uppercase tracking-wider text-violet-500">Cô Thỏ Hồng</div><div class="font-extrabold text-slate-700 leading-relaxed">${escapeHtml(activity.teacher || '')}</div></div><button onclick="speakOperationSenseActivity_()" class="ns-listen-btn" title="Nghe lại hướng dẫn">🔊 <span>Nghe cô nói</span></button></section>
        <section class="ns-workspace mt-3">
            <h3 class="text-center text-lg md:text-xl font-black text-slate-900 mb-3">${escapeHtml(activity.prompt || '')}</h3>
            <div id="os-activity-stage" class="w-full">${renderOperationSenseActivityBody_(activity)}</div>
            <div id="os-feedback" class="hidden mt-3 rounded-2xl border-2 p-3 text-center font-black"></div>
            <div id="os-hint" class="hidden mt-3 rounded-2xl border border-amber-200 bg-amber-50 p-3 text-center font-bold text-amber-800"></div>
        </section>
        <div class="mt-3 flex flex-wrap justify-center gap-2">${evidenceList}</div>
        <div class="mt-4 flex items-center justify-between gap-2"><button onclick="operationSenseShowHint_()" class="ns-secondary-btn">💡 Gợi ý</button><button onclick="renderOperationSenseActivity_()" class="ns-secondary-btn">↻ Làm lại</button><button id="os-next-btn" onclick="operationSenseNext_()" class="hidden ns-primary-btn">Tiếp tục →</button></div>
    </div>`;
    if (autoSpeechEnabled) setTimeout(() => speakOperationSenseActivity_(), 120);
}

function osChoiceButtons_(choices) {
    return `<div class="grid grid-cols-1 sm:grid-cols-3 gap-2 max-w-3xl mx-auto">${(choices || []).map(c => `<button class="ns-choice" onclick="operationSenseChoose_('${escapeJsString_(String(c))}', this)">${escapeHtml(String(c))}</button>`).join('')}</div>`;
}
function osObjects_(count, object, cls='') { return nsObjects_(count, object, cls); }
function osStoryStrip_(a) {
    const opText = a.operation === 'take' ? 'BỚT ĐI' : 'THÊM VÀO';
    const start = a.start == null ? '?' : a.start;
    const change = a.change == null ? '?' : a.change;
    const result = a.result == null ? '?' : a.result;
    return `<div class="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-2 max-w-3xl mx-auto">
        <div class="os-story-card"><div class="os-story-label">LÚC ĐẦU</div><div class="os-story-value">${escapeHtml(String(start))}</div></div>
        <div class="text-[10px] md:text-xs font-black ${a.operation==='take'?'text-rose-500':'text-emerald-600'}"><div class="text-2xl mb-1">${a.operation==='take'?'↘':'↗'}</div>${opText}</div>
        <div class="os-story-card"><div class="os-story-label">THAY ĐỔI</div><div class="os-story-value">${escapeHtml(String(change))}</div></div>
        <div class="text-2xl text-slate-300">→</div>
        <div class="os-story-card"><div class="os-story-label">KẾT QUẢ</div><div class="os-story-value">${escapeHtml(String(result))}</div></div>
    </div>`;
}

function renderOperationSenseActivityBody_(a) {
    if (a.type === 'join_story') {
        const bank = Array.from({length:Number(a.bank||a.change||3)},(_,i)=>`<button class="os-bank-object" onclick="operationSenseAddJoinObject_(this)">${escapeHtml(a.object)}</button>`).join('');
        return `<div><div class="text-center text-xs font-black text-slate-400 mb-2">LÚC ĐẦU</div><div class="ns-visual-box"><div id="os-join-group" class="ns-object-row">${osObjects_(a.start,a.object)}</div></div><div class="mt-3 grid md:grid-cols-[1fr_1.2fr] gap-3"><div class="ns-bank"><div class="text-xs font-black text-violet-500 mb-2">CÁC BẠN CÓ THỂ ĐẾN THÊM</div><div class="flex flex-wrap justify-center gap-2">${bank}</div></div><div class="ns-tray"><div class="text-xs font-black text-pink-500">NHÓM SAU KHI THÊM</div><div id="os-join-final" class="ns-object-row mt-2">${osObjects_(a.start,a.object)}</div><div id="os-join-count" class="mt-2 text-xs font-black text-slate-400">Đã thêm: 0</div></div></div><div class="text-center mt-3"><button onclick="operationSenseCheckJoin_()" class="ns-primary-btn">Con làm xong rồi</button></div></div>`;
    }
    if (a.type === 'take_story') {
        const objs = Array.from({length:Number(a.start)},(_,i)=>`<button class="os-action-object" onclick="operationSenseToggleRemove_(this,${i})"><span>${escapeHtml(a.object)}</span><span class="os-away-mark hidden">↗</span></button>`).join('');
        return `<div><div class="ns-visual-box"><div class="flex flex-wrap justify-center gap-3">${objs}</div></div><div id="os-take-summary" class="mt-2 text-center text-xs font-black text-slate-400">Đã lấy ra: 0/${a.change}</div><div class="text-center mt-3"><button onclick="operationSenseCheckTake_()" class="ns-primary-btn">Con làm xong rồi</button></div></div>`;
    }
    if (a.type === 'combine_story') {
        return `<div><div id="os-combine-before" class="grid grid-cols-2 gap-3 max-w-3xl mx-auto"><div class="ns-group-card"><div class="text-xs font-black text-rose-500 mb-2">PHẦN 1</div><div class="ns-object-row">${osObjects_(a.left,a.left_object)}</div></div><div class="ns-group-card"><div class="text-xs font-black text-emerald-600 mb-2">PHẦN 2</div><div class="ns-object-row">${osObjects_(a.right,a.right_object)}</div></div></div><div class="text-center mt-3"><button id="os-combine-btn" onclick="operationSenseCombine_()" class="ns-primary-btn">🤲 Gộp hai nhóm</button></div><div id="os-combine-after" class="hidden mt-3"></div><div id="os-combine-choices" class="hidden mt-4">${osChoiceButtons_(a.choices)}</div></div>`;
    }
    if (a.type === 'split_story') {
        const objs = Array.from({length:Number(a.whole)},(_,i)=>`<button class="os-action-object" onclick="operationSenseToggleSplit_(this,${i})"><span>${escapeHtml(a.object)}</span></button>`).join('');
        return `<div class="grid md:grid-cols-2 gap-3"><div class="ns-group-card"><div class="text-xs font-black text-violet-500 mb-2">WHOLE ${a.whole}</div><div class="flex flex-wrap justify-center gap-2">${objs}</div></div><div class="ns-part-card"><div class="text-xs font-black text-pink-500">PHẦN ĐƯỢC TÁCH RA</div><div id="os-split-target" class="ns-object-row min-h-[70px] mt-2"></div><div id="os-split-count" class="text-xs font-black text-slate-400 mt-2">Đã tách: 0/${a.target_part}</div></div><div class="md:col-span-2 text-center"><button onclick="operationSenseCheckSplit_()" class="ns-primary-btn">Con tách xong rồi</button></div></div>`;
    }
    if (a.type === 'missing_part') {
        return `<div class="text-center"><div class="ns-whole-card max-w-3xl mx-auto"><div class="text-xs font-black text-violet-500">CẢ NHÓM CÓ ${a.whole}</div><div class="ns-object-row mt-2">${osObjects_(a.whole,a.object)}</div></div><div class="text-2xl my-2">↙️ &nbsp; ↘️</div><div class="grid grid-cols-2 gap-3 max-w-2xl mx-auto"><div class="ns-part-card"><div class="text-xs font-black text-sky-600">PHẦN NHÌN THẤY</div><div class="ns-object-row mt-2">${osObjects_(a.known,a.object)}</div></div><div class="ns-part-card"><div class="text-xs font-black text-pink-600">PHẦN BỊ CHE</div><div class="text-5xl mt-3">📦</div><div class="text-3xl font-black text-pink-500">?</div></div></div><div class="mt-4">${osChoiceButtons_(a.choices)}</div></div>`;
    }
    if (a.type === 'compare_difference') {
        const max = Math.max(Number(a.left),Number(a.right));
        const row = (n,obj) => Array.from({length:max},(_,i)=>`<div class="os-pair-cell">${i<n?`<span>${escapeHtml(obj)}</span>`:'<span class="text-slate-200">○</span>'}</div>`).join('');
        return `<div><div class="max-w-3xl mx-auto rounded-2xl border border-indigo-100 bg-indigo-50/40 p-3"><div class="grid gap-2"><div class="os-pair-row">${row(a.left,a.left_object)}</div><div class="os-pair-row">${row(a.right,a.right_object)}</div></div><div class="mt-2 text-center text-[11px] font-black text-slate-500">Ghép theo từng cột. Phần không có cặp chính là độ chênh.</div></div><div class="mt-4">${osChoiceButtons_(a.choices)}</div></div>`;
    }
    if (a.type === 'story_unknown') {
        return `<div>${osStoryStrip_(a)}<div class="mt-4">${osChoiceButtons_(a.choices)}</div></div>`;
    }
    if (a.type === 'equation_choice') {
        const symbol = a.operation === 'take' ? '−' : '+';
        return `<div class="text-center"><div class="ns-visual-box"><div><div class="ns-object-row">${osObjects_(a.start,a.object)}</div><div class="my-2 text-2xl font-black ${a.operation==='take'?'text-rose-500':'text-emerald-600'}">${symbol} ${a.change}</div><div class="text-sm font-black text-slate-500">Kết quả của câu chuyện: ${a.result}</div></div></div><div class="mt-4">${osChoiceButtons_(a.choices)}</div></div>`;
    }
    if (a.type === 'equality_balance') {
        return `<div class="text-center"><div class="os-balance"><div class="os-balance-pan"><span>${escapeHtml(a.left)}</span></div><div class="text-5xl">⚖️</div><div class="os-balance-pan"><span>${escapeHtml(a.right)}</span></div></div><div class="mt-4">${osChoiceButtons_(a.choices)}</div></div>`;
    }
    if (a.type === 'equality_missing') {
        return `<div class="text-center"><div class="ns-symbol-card">3 + 2 &nbsp; = &nbsp; □ + 1</div><div class="mt-4">${osChoiceButtons_(a.choices)}</div></div>`;
    }
    if (a.type === 'fact_family') {
        return `<div class="text-center"><div class="max-w-xl mx-auto"><div class="ns-whole-card"><div class="text-xs font-black text-violet-500">WHOLE</div><div class="text-4xl font-black text-violet-700">${a.whole}</div></div><div class="text-2xl my-1">↙️ &nbsp; ↘️</div><div class="grid grid-cols-2 gap-3"><div class="ns-part-card"><div class="text-xs font-black text-sky-600">PART</div><div class="text-3xl font-black">${a.part1}</div></div><div class="ns-part-card"><div class="text-xs font-black text-pink-600">PART</div><div class="text-3xl font-black">${a.part2}</div></div></div></div><div class="mt-4">${osChoiceButtons_(a.choices)}</div></div>`;
    }
    if (a.type === 'count_path') {
        const min = Math.max(0, Number(a.start) - 4), max = Math.min(20, Number(a.start) + Math.max(6,Number(a.steps)+3));
        const cells = Array.from({length:max-min+1},(_,k)=>{ const n=min+k; return `<div id="os-path-${n}" class="os-path-cell ${n===Number(a.start)?'is-current':''}">${n}</div>`; }).join('');
        return `<div class="text-center"><div class="flex flex-wrap justify-center gap-1.5">${cells}</div><div id="os-path-status" class="mt-3 font-black text-indigo-600">Bắt đầu ở ${a.start} · đã đi 0/${a.steps} bước</div><button onclick="operationSensePathStep_()" class="mt-3 ns-primary-btn">${Number(a.direction)>0?'➡️ Tiến 1 bước':'⬅️ Lùi 1 bước'}</button></div>`;
    }
    if (a.type === 'strategy_choice') {
        return `<div class="text-center"><div class="ns-symbol-card">${escapeHtml(a.problem || '')}</div><div class="mt-4">${osChoiceButtons_(a.choices)}</div></div>`;
    }
    if (a.type === 'structured_choice') {
        const max=Math.max(Number(a.a),Number(a.b));
        const row=(n)=>Array.from({length:max},(_,i)=>`<span class="ns-static-object ${i<n?'':'opacity-0'}">${escapeHtml(a.object||'●')}</span>`).join('');
        return `<div class="text-center"><div class="max-w-2xl mx-auto rounded-2xl border border-indigo-100 bg-indigo-50/40 p-4"><div class="ns-object-row">${row(a.a)}</div><div class="ns-object-row mt-2">${row(a.b)}</div></div><div class="mt-4">${osChoiceButtons_(a.choices)}</div></div>`;
    }
    if (a.type === 'make_ten') {
        const cells = Array.from({length:10},(_,i)=>`<div class="ns-frame-cell ${i<Number(a.start)?'is-filled':''}" id="os-ten-cell-${i}">${i<Number(a.start)?'●':''}</div>`).join('');
        const bank = Array.from({length:Number(a.addend)},(_,i)=>`<button id="os-ten-bank-${i}" class="os-bank-object" onclick="operationSenseMakeTenMove_(this)">●</button>`).join('');
        return `<div><div class="ns-frame ns-frame-10">${cells}</div><div class="mt-3 ns-bank max-w-xl mx-auto"><div class="text-xs font-black text-indigo-500 mb-2">NHÓM ${a.addend} Ở NGOÀI KHUNG</div><div class="flex justify-center gap-2">${bank}</div></div><div id="os-ten-status" class="mt-2 text-center text-xs font-black text-slate-500">Đã chuyển 0 chấm vào khung.</div><div class="text-center mt-3"><button onclick="operationSenseCheckMakeTen_()" class="ns-primary-btn">Con làm đầy 10 rồi</button></div></div>`;
    }
    return '<div class="text-center font-bold text-slate-500">Hoạt động đang được cập nhật.</div>';
}

function operationSenseShowHint_() {
    const a = currentOperationSenseActivity_();
    if (!a) return;
    operationSenseHintLevel = Math.min(3, operationSenseHintLevel + 1);
    const hint = (a.hints || [])[operationSenseHintLevel - 1] || 'Con thử dựng lại câu chuyện bằng đồ vật nhé.';
    const box = document.getElementById('os-hint');
    if (box) { box.textContent = `💡 ${hint}`; box.classList.remove('hidden'); }
}
function operationSenseChoose_(value, btn) {
    const a = currentOperationSenseActivity_();
    if (!a) return;
    document.querySelectorAll('#os-activity-stage .ns-choice').forEach(x=>x.classList.remove('ring-4','ring-violet-200'));
    btn?.classList.add('ring-4','ring-violet-200');
    if (String(value) === String(a.answer)) operationSenseCompleteActivity_();
    else operationSenseWrong_();
}

function operationSenseAddJoinObject_(btn) {
    const a=currentOperationSenseActivity_();
    if(!a || a.type!=='join_story' || btn.disabled) return;
    if(operationSenseMovedCount >= Number(a.bank||10)) return;
    operationSenseMovedCount++;
    btn.disabled=true; btn.classList.add('opacity-30','scale-90');
    const final=document.getElementById('os-join-final');
    if(final) final.innerHTML=osObjects_(Number(a.start)+operationSenseMovedCount,a.object);
    const label=document.getElementById('os-join-count');
    if(label) label.textContent=`Đã thêm: ${operationSenseMovedCount}`;
    speakVietnamese(`Thêm ${operationSenseMovedCount}`, 0.98);
}
function operationSenseCheckJoin_() {
    const a=currentOperationSenseActivity_(); if(!a) return;
    if(operationSenseMovedCount===Number(a.change)) operationSenseCompleteActivity_();
    else operationSenseWrong_(operationSenseMovedCount<Number(a.change)?'Con mới thêm chưa đủ số vật của câu chuyện.':'Con đã thêm nhiều hơn câu chuyện nói.');
}

function operationSenseToggleRemove_(btn,index) {
    if(operationSenseRemoved.has(index)){operationSenseRemoved.delete(index);btn.classList.remove('is-removed');btn.querySelector('.os-away-mark')?.classList.add('hidden');}
    else {operationSenseRemoved.add(index);btn.classList.add('is-removed');btn.querySelector('.os-away-mark')?.classList.remove('hidden');}
    const a=currentOperationSenseActivity_(); const label=document.getElementById('os-take-summary');
    if(a&&label) label.textContent=`Đã lấy ra: ${operationSenseRemoved.size}/${a.change}`;
    if (a) speakVietnamese(`Đã lấy ra ${operationSenseRemoved.size}`, 0.98);
}
function operationSenseCheckTake_(){const a=currentOperationSenseActivity_();if(!a)return;if(operationSenseRemoved.size===Number(a.change))operationSenseCompleteActivity_();else operationSenseWrong_(`Con đang lấy ra ${operationSenseRemoved.size} vật; câu chuyện cần lấy ra ${a.change}.`);}

function operationSenseCombine_(){const a=currentOperationSenseActivity_();if(!a)return;document.getElementById('os-combine-btn')?.classList.add('hidden');const after=document.getElementById('os-combine-after');if(after){after.innerHTML=`<div class="ns-visual-box"><div class="ns-object-row">${osObjects_(a.left,a.left_object)}${osObjects_(a.right,a.right_object)}</div></div>`;after.classList.remove('hidden');}document.getElementById('os-combine-choices')?.classList.remove('hidden');}

function operationSenseToggleSplit_(btn,index){const a=currentOperationSenseActivity_();if(!a)return;if(operationSenseSplit.has(index)){operationSenseSplit.delete(index);btn.classList.remove('is-selected');}else{operationSenseSplit.add(index);btn.classList.add('is-selected');}const target=document.getElementById('os-split-target');if(target)target.innerHTML=osObjects_(operationSenseSplit.size,a.object);const label=document.getElementById('os-split-count');if(label)label.textContent=`Đã tách: ${operationSenseSplit.size}/${a.target_part}`;speakVietnamese(`Đã tách ${operationSenseSplit.size}`,0.98);}
function operationSenseCheckSplit_(){const a=currentOperationSenseActivity_();if(!a)return;if(operationSenseSplit.size===Number(a.target_part))operationSenseCompleteActivity_();else operationSenseWrong_(`Con đang tách ${operationSenseSplit.size} vật; cần tách ${a.target_part}.`);}

function operationSensePathStep_(){const a=currentOperationSenseActivity_();if(!a||operationSensePathCount>=Number(a.steps))return;const old=Number(a.start)+operationSensePathCount*Number(a.direction);document.getElementById(`os-path-${old}`)?.classList.remove('is-current');operationSensePathCount++;const now=Number(a.start)+operationSensePathCount*Number(a.direction);document.getElementById(`os-path-${now}`)?.classList.add('is-current');const st=document.getElementById('os-path-status');if(st)st.textContent=`Đang ở ${now} · đã đi ${operationSensePathCount}/${a.steps} bước`;speakVietnamese(String(now),0.98);if(operationSensePathCount===Number(a.steps)&&now===Number(a.answer))operationSenseCompleteActivity_();}

function operationSenseMakeTenMove_(btn){const a=currentOperationSenseActivity_();if(!a||btn.disabled)return;const needed=10-Number(a.start);if(operationSenseMakeTenMoved>=needed)return;operationSenseMakeTenMoved++;btn.disabled=true;btn.classList.add('opacity-30','scale-90');const idx=Number(a.start)+operationSenseMakeTenMoved-1;const cell=document.getElementById(`os-ten-cell-${idx}`);if(cell){cell.textContent='●';cell.classList.add('is-filled');}const st=document.getElementById('os-ten-status');if(st)st.textContent=`Đã chuyển ${operationSenseMakeTenMoved} chấm vào khung · còn ${Number(a.addend)-operationSenseMakeTenMoved} chấm ở ngoài.`;speakVietnamese(`Chuyển ${operationSenseMakeTenMoved}`,0.98);}
function operationSenseCheckMakeTen_(){const a=currentOperationSenseActivity_();if(!a)return;if(operationSenseMakeTenMoved===Number(a.answer_needed))operationSenseCompleteActivity_();else operationSenseWrong_(`Khung 10 cần đúng ${a.answer_needed} chấm nữa để đầy.`);}

function operationSenseWrong_(message='') {
    const fb=document.getElementById('os-feedback');
    if(fb){fb.className='mt-3 rounded-2xl border-2 border-amber-200 bg-amber-50 p-3 text-center font-black text-amber-800';fb.textContent=`Chưa khớp với câu chuyện rồi. ${message || 'Con thử dựng lại điều đang xảy ra nhé.'}`;}
    const a=currentOperationSenseActivity_(); speakVietnamese(a?.wrong_audio || message || 'Chưa khớp với câu chuyện rồi. Con thử dựng lại điều đang xảy ra nhé.',0.94);
    const ev=readOperationSenseEvidence_(); const jid=activeOperationSense?.journeyId;
    if(jid){const st=ev[jid]||{mastery:'not_observed',completed:[],attempts:0,hint_uses:0,transfer_correct:0};st.attempts=Number(st.attempts||0)+1;if(st.mastery==='not_observed')st.mastery='emerging';st.last_error_activity=currentOperationSenseActivity_()?.id||'';ev[jid]=st;writeOperationSenseEvidence_(ev);}
}

function operationSenseCompleteActivity_() {
    const a=currentOperationSenseActivity_(); if(!a||!activeOperationSense)return;
    const fb=document.getElementById('os-feedback');
    if(fb){fb.className='mt-3 rounded-2xl border-2 border-emerald-200 bg-emerald-50 p-3 text-center font-black text-emerald-700';fb.textContent=`✅ ${a.success || 'Con đã hiểu đúng điều đang xảy ra!'}`;}
    speakVietnamese(a.success_audio || a.success || 'Con đã hiểu đúng điều đang xảy ra!',0.94);
    document.getElementById('os-next-btn')?.classList.remove('hidden');
    document.querySelectorAll('#os-activity-stage button').forEach(b=>b.disabled=true);
    const ev=readOperationSenseEvidence_(); const jid=activeOperationSense.journeyId;
    const st=ev[jid]||{mastery:'not_observed',completed:[],attempts:0,hint_uses:0,transfer_correct:0};
    st.attempts=Number(st.attempts||0)+1; st.hint_uses=Number(st.hint_uses||0)+operationSenseHintLevel; st.completed=Array.isArray(st.completed)?st.completed:[];
    if(!st.completed.includes(a.id))st.completed.push(a.id); if(a.transfer&&operationSenseHintLevel===0)st.transfer_correct=Number(st.transfer_correct||0)+1;
    const allDone=activeOperationSense.journey.activities.every(x=>st.completed.includes(x.id));
    if(allDone&&Number(st.transfer_correct||0)>0)st.mastery='generalized'; else if(allDone&&operationSenseHintLevel===0)st.mastery='independent'; else if(allDone)st.mastery='supported'; else if(operationSenseHintLevel===0)st.mastery='independent'; else st.mastery='supported';
    st.last_seen=new Date().toISOString();st.last_activity=a.id;st.last_hint_level=operationSenseHintLevel;st.last_latency_ms=Math.max(0,Date.now()-Number(activeOperationSense.activityStartedAt||Date.now()));
    st.last_evidence_type = a.transfer ? 'transfer' : (a.type.includes('story') ? 'meaning_action' : (['equation_choice','equality_balance','equality_missing','fact_family'].includes(a.type)?'representation':'strategy'));
    ev[jid]=st;writeOperationSenseEvidence_(ev);
}

function operationSenseNext_() {
    if(!activeOperationSense)return; const journey=activeOperationSense.journey;
    if(activeOperationSense.activityIndex<journey.activities.length-1){activeOperationSense.activityIndex++;renderOperationSenseActivity_();return;}
    const host=document.getElementById('operation-sense-content');const state=getOperationSenseJourneyState_(journey.id);
    if(host)host.innerHTML=`<div class="w-full max-w-3xl mx-auto text-center py-6"><div class="text-6xl">🌟</div><h2 class="mt-3 text-2xl md:text-3xl font-black text-indigo-700">Con vừa hiểu thêm một mảnh của phép cộng và phép trừ!</h2><p class="mt-2 font-bold text-slate-600">${escapeHtml(journey.goal)}</p><div class="mt-4 inline-flex rounded-full border px-4 py-2 text-sm font-black ${operationSenseMasteryClass_(state.mastery)}">${escapeHtml(operationSenseMasteryLabel_(state.mastery))}</div><div class="mt-6 flex flex-wrap justify-center gap-3"><button onclick="openOperationSenseHub()" class="ns-secondary-btn">← Bản đồ 12.2</button>${journey.order<14?`<button onclick="startOperationSenseJourney_('OS2.${journey.order+1}')" class="ns-primary-btn">Hành trình tiếp theo →</button>`:''}</div></div>`;
}



// ==========================================
// MỞ CÁC MỤC KHÁM PHÁ
// ==========================================
function openTopic(topicNum, topicName, icon) {
    if (Number(topicNum) === 12) return openEpsilonMethodHub_();
    setAppShellRootMode_(false);
    if (Number(topicNum) === 13) setMainTabActive_('review');
    else setMainTabActive_('discover');
    stopSpeaking();
    activeBaiHocContext = null; activeTopicId = topicNum; activeExamContext = null; activeRoadmapContext = null;
    if (Number(topicNum) === 13) updateNavTabs('Ôn tập', '📚', null);
    else updateDiscoverBreadcrumb_(topicName, icon || '🔢', null);

    showLoadingOverlay(`Đang tải chủ đề "${topicName}"...`);
    fetchAllTopicsData().then(topics => {
        hideLoadingOverlay();
        const topicObj = topics.find(t => Number(t.topic_id) === Number(topicNum));
        if (!topicObj || !topicObj.questions || !topicObj.questions.length) throw new Error("Chủ đề không có câu hỏi nào");
        showLectureAndSubtopics(topicNum, topicName, topicObj);
    }).catch(err => {
        hideLoadingOverlay();
        // Tải lỗi thì đưa header về đúng trạng thái trang chủ (không để lại tab/gạch breadcrumb thừa)
        activeTopicId = null;
        setAppShellRootMode_(true);
        updateNavTabs(null, null, null);
        showAppNotice(`Không thể tải chủ đề: ${err.message}`, { title: 'Khám phá', icon: '🧭', tone: 'rose' });
    });
}

function setSubtopicGridColumns(count) {
    const el = document.getElementById('lecture-subtopics-list');
    if (!el) return;
    if (count > 6) {
        el.className = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 w-full max-w-4xl';
    } else {
        el.className = 'grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-5xl';
    }
}


function formatSubtopicLabelWithCode_(code, label) {
    const safeCode = String(code || '').trim();
    const safeLabel = beautifySubtopicName(label || safeCode || '');
    if (!safeCode) return safeLabel;
    if (safeLabel === safeCode || safeLabel.startsWith(`${safeCode} `) || safeLabel.startsWith(`${safeCode}.`) || safeLabel.startsWith(`${safeCode} -`) || safeLabel.startsWith(`${safeCode}:`)) return safeLabel;
    return `${safeCode} ${safeLabel}`.trim();
}

function mapMuc2Stage_(q) {
    const src = String(q?._source_sub_topic || q?.sub_topic || '');
    const id = Number(q?.question_id ?? q?.id ?? 0);

    if (['2.1', '2.2', '2.3'].includes(src)) return { code: '2.1', name: 'Hiểu phép cộng' };
    if (src === '2.4') return { code: '2.2', name: 'Phép cộng trong phạm vi 10' };
    if (['2.6', '2.7', '2.8'].includes(src)) return { code: '2.3', name: 'Hiểu phép trừ' };
    if (src === '2.9') return { code: '2.4', name: 'Phép trừ trong phạm vi 10' };
    if (src === '2.5') return { code: '2.5', name: 'Luyện tập có hỗ trợ' };

    // Ngân hàng tổng hợp cũ: các câu trừ tìm số thiếu được đưa vào 2.5
    // để phần luyện có hỗ trợ có cả cộng và trừ. Phần còn lại là thực hành độc lập.
    if (src === '2.10' && [2291, 2293, 2295, 2297, 2299].includes(id)) {
        return { code: '2.5', name: 'Luyện tập có hỗ trợ' };
    }
    if (src === '2.10') return { code: '2.6', name: 'Thực hành tổng hợp' };

    return { code: src || '2.6', name: q?.sub_topic_label || 'Thực hành tổng hợp' };
}

function remapMuc2Questions_(questions) {
    return (questions || []).map(q => {
        const stage = mapMuc2Stage_(q);
        return {
            ...q,
            _source_sub_topic: String(q?._source_sub_topic || q?.sub_topic || ''),
            _muc2_stage: stage.code,
            sub_topic: stage.code,
            sub_topic_label: stage.name
        };
    });
}

// ==========================================
// MỤC 5 - HÌNH HỌC
// 5.1 Bài giảng nhập môn -> 5.2 nhận biết hình phẳng -> 5.3 lắp ghép -> 5.4 hình khối -> 5.5 đếm hình nâng cao
// Trọng tâm là NHẬN DẠNG / PHÂN LOẠI / CẤU TẠO. 5.5 mới dùng đếm hình trong hình nhiều nét, không đếm emoji rời.
// ==========================================
const MUC5_INTRO_AUDIO_ = `Cô Thỏ Hồng chào con. Hôm nay mình làm quen với hình học nhé. Hình tròn có đường bao cong và không có góc. Hình tam giác có ba cạnh và ba góc. Hình vuông có bốn cạnh bằng nhau. Hình chữ nhật có bốn cạnh, thường nhìn thấy hai cạnh dài và hai cạnh ngắn. Đây là các hình phẳng, giống như hình con vẽ trên giấy. Còn khối lập phương và khối hộp chữ nhật là hình khối, con có thể tưởng tượng như xúc xắc và hộp giày. Khi nhận biết hình, con hãy nhìn vào dạng của hình, đừng dựa vào màu sắc, kích thước hay việc hình đang xoay nghiêng. Sau bài giới thiệu này, mình sẽ luyện nhận biết hình phẳng, ghép hình, nhận biết hình khối trong cuộc sống, rồi thử sức với bài đếm hình nhiều nét nâng cao.`;

function muc5ShapeName_(shape) {
    return ({ circle: 'Hình tròn', triangle: 'Hình tam giác', square: 'Hình vuông', rectangle: 'Hình chữ nhật' })[shape] || shape;
}

function muc5ShapeSvg_(shape, options = {}) {
    const size = Number(options.size || 100);
    const color = options.color || '#60a5fa';
    const stroke = options.stroke || '#334155';
    const rotate = Number(options.rotate || 0);
    const common = `fill="${color}" stroke="${stroke}" stroke-width="4"`;
    let body = '';
    if (shape === 'circle') body = `<circle cx="50" cy="50" r="31" ${common}></circle>`;
    else if (shape === 'triangle') body = `<polygon points="50,15 86,82 14,82" ${common}></polygon>`;
    else if (shape === 'rectangle') body = `<rect x="12" y="27" width="76" height="46" rx="6" ${common}></rect>`;
    else body = `<rect x="20" y="20" width="60" height="60" rx="6" ${common}></rect>`;
    return `<svg viewBox="0 0 100 100" width="${size}" height="${size}" class="block" aria-hidden="true"><g transform="rotate(${rotate} 50 50)">${body}</g></svg>`;
}

function muc5SolidSvg_(solid, options = {}) {
    const size = Number(options.size || 120);
    const fill1 = options.fill1 || '#bfdbfe';
    const fill2 = options.fill2 || '#93c5fd';
    const fill3 = options.fill3 || '#60a5fa';
    const stroke = options.stroke || '#334155';
    if (solid === 'cuboid') {
        return `<svg viewBox="0 0 140 105" width="${size}" height="${Math.round(size*0.75)}" class="block" aria-hidden="true">
            <polygon points="18,35 90,35 122,18 50,18" fill="${fill1}" stroke="${stroke}" stroke-width="3"></polygon>
            <polygon points="90,35 122,18 122,72 90,89" fill="${fill2}" stroke="${stroke}" stroke-width="3"></polygon>
            <rect x="18" y="35" width="72" height="54" fill="${fill3}" stroke="${stroke}" stroke-width="3"></rect>
        </svg>`;
    }
    return `<svg viewBox="0 0 120 110" width="${size}" height="${Math.round(size*0.92)}" class="block" aria-hidden="true">
        <polygon points="20,35 70,35 98,18 48,18" fill="${fill1}" stroke="${stroke}" stroke-width="3"></polygon>
        <polygon points="70,35 98,18 98,70 70,88" fill="${fill2}" stroke="${stroke}" stroke-width="3"></polygon>
        <rect x="20" y="35" width="50" height="53" fill="${fill3}" stroke="${stroke}" stroke-width="3"></rect>
    </svg>`;
}

function muc5BaseQuestion_(id, sub, label, q, options, answer, extra = {}) {
    return {
        question_id: id,
        sub_topic: sub,
        sub_topic_label: label,
        question_text: q,
        options,
        answer,
        hint: extra.hint || '',
        explanation: extra.explanation || '',
        audio_text: extra.audio_text || q,
        skill_tag: 'TOAN_C1',
        diem: 0.5,
        ...extra
    };
}

function buildMuc5Questions_() {
    const out = [];
    const shapes = ['circle', 'triangle', 'square', 'rectangle'];
    const colors = ['#fbbf24', '#60a5fa', '#34d399', '#f472b6', '#a78bfa', '#fb7185'];
    const rotations = [0, 18, 35, 45, 72, 90];
    const flatOptions = shapes.map(muc5ShapeName_);

    // 5.2 - Nhận biết và phân loại hình phẳng: 40 câu.
    for (let i = 0; i < 40; i++) {
        const target = shapes[i % shapes.length];
        const mode = i % 3;
        if (mode === 0) {
            out.push(muc5BaseQuestion_(4200+i, '5.2', 'Nhận biết và phân loại hình phẳng',
                'Hình dưới đây có tên là gì?', flatOptions, muc5ShapeName_(target), {
                    muc5_type: 'flat_identify',
                    muc5_visual: { target, color: colors[i % colors.length], rotate: rotations[i % rotations.length] },
                    explanation: `Dù đổi màu, kích thước hoặc xoay nghiêng, đây vẫn là ${muc5ShapeName_(target).toLowerCase()}.`
                }));
        } else if (mode === 1) {
            const optionShapes = [target, ...shapes.filter(s => s !== target)];
            const shift = i % 4;
            const arranged = optionShapes.slice(shift).concat(optionShapes.slice(0, shift));
            const answerIndex = arranged.indexOf(target);
            out.push(muc5BaseQuestion_(4200+i, '5.2', 'Nhận biết và phân loại hình phẳng',
                `Hình mẫu là ${muc5ShapeName_(target).toLowerCase()}. Con chọn hình cùng loại với hình mẫu nhé.`, ['A','B','C','D'], String.fromCharCode(65+answerIndex), {
                    muc5_type: 'flat_match',
                    muc5_visual: { target, optionShapes: arranged, color: colors[i % colors.length], rotate: rotations[(i+2) % rotations.length] },
                    explanation: `Con nhận ra ${muc5ShapeName_(target).toLowerCase()} bằng dạng của đường bao, không phải bằng màu.`
                }));
        } else {
            const common = target;
            const odd = shapes[(shapes.indexOf(target)+1+(i%2)) % shapes.length];
            let arranged = [common, common, common, odd];
            const shift = i % 4;
            arranged = arranged.slice(shift).concat(arranged.slice(0, shift));
            const answerIndex = arranged.indexOf(odd);
            out.push(muc5BaseQuestion_(4200+i, '5.2', 'Nhận biết và phân loại hình phẳng',
                'Hình nào khác loại với ba hình còn lại?', ['A','B','C','D'], String.fromCharCode(65+answerIndex), {
                    muc5_type: 'flat_odd',
                    muc5_visual: { optionShapes: arranged, color: colors[i % colors.length], rotate: rotations[(i+1) % rotations.length] },
                    explanation: `Ba hình cùng loại là ${muc5ShapeName_(common).toLowerCase()}; hình còn lại là ${muc5ShapeName_(odd).toLowerCase()}.`
                }));
        }
    }


    // Bổ sung các câu hỏi quan sát đặc điểm hình để trẻ không chỉ gọi tên hình,
    // mà còn chú ý tới số cạnh và quan hệ giữa các cạnh.
    const deepShapeQuestions = [
        {
            q: 'Hình vuông có mấy cạnh?',
            target: 'square',
            options: ['3 cạnh', '4 cạnh', '5 cạnh', 'Không có cạnh'],
            answer: '4 cạnh',
            explanation: 'Hình vuông có 4 cạnh.'
        },
        {
            q: 'Con quan sát hình vuông. Bốn cạnh của hình vuông như thế nào?',
            target: 'square',
            options: ['4 cạnh bằng nhau', 'Chỉ 2 cạnh bằng nhau', '3 cạnh bằng nhau', 'Không có cạnh bằng nhau'],
            answer: '4 cạnh bằng nhau',
            explanation: 'Hình vuông có 4 cạnh bằng nhau.'
        },
        {
            q: 'Hình tam giác có mấy cạnh?',
            target: 'triangle',
            options: ['2 cạnh', '3 cạnh', '4 cạnh', '5 cạnh'],
            answer: '3 cạnh',
            explanation: 'Hình tam giác có 3 cạnh.'
        },
        {
            q: 'Hình tam giác có mấy góc?',
            target: 'triangle',
            options: ['2 góc', '3 góc', '4 góc', 'Không có góc'],
            answer: '3 góc',
            explanation: 'Hình tam giác có 3 cạnh và 3 góc.'
        },
        {
            q: 'Hình chữ nhật có tất cả mấy cạnh?',
            target: 'rectangle',
            options: ['3 cạnh', '4 cạnh', '5 cạnh', '6 cạnh'],
            answer: '4 cạnh',
            explanation: 'Hình chữ nhật có 4 cạnh.'
        },
        {
            q: 'Hình chữ nhật thường có mấy cạnh dài và mấy cạnh ngắn?',
            target: 'rectangle',
            options: ['2 cạnh dài và 2 cạnh ngắn', '1 cạnh dài và 3 cạnh ngắn', '4 cạnh dài', '2 cạnh dài và 1 cạnh ngắn'],
            answer: '2 cạnh dài và 2 cạnh ngắn',
            explanation: 'Ở hình chữ nhật quen thuộc, con thường thấy 2 cạnh dài và 2 cạnh ngắn.'
        },
        {
            q: 'Hai cạnh dài của hình chữ nhật nằm như thế nào với nhau?',
            target: 'rectangle',
            options: ['Đối diện nhau', 'Nằm liền nhau', 'Chỉ có 1 cạnh dài', 'Không xác định'],
            answer: 'Đối diện nhau',
            explanation: 'Hai cạnh dài nằm đối diện nhau; hai cạnh ngắn cũng nằm đối diện nhau.'
        },
        {
            q: 'Con nhìn hình chữ nhật. Hai cạnh ngắn nằm như thế nào với nhau?',
            target: 'rectangle',
            options: ['Đối diện nhau', 'Nằm cùng một phía', 'Không có cạnh ngắn', 'Chỉ có 1 cạnh ngắn'],
            answer: 'Đối diện nhau',
            explanation: 'Hai cạnh ngắn của hình chữ nhật nằm đối diện nhau.'
        },
        {
            q: 'Hình vuông có mấy góc?',
            target: 'square',
            options: ['3 góc', '4 góc', '5 góc', 'Không có góc'],
            answer: '4 góc',
            explanation: 'Hình vuông có 4 cạnh và 4 góc.'
        },
        {
            q: 'Hình nào có 3 cạnh?',
            target: 'triangle',
            options: ['Hình tròn', 'Hình tam giác', 'Hình vuông', 'Hình chữ nhật'],
            answer: 'Hình tam giác',
            explanation: 'Hình tam giác có 3 cạnh.'
        }
    ];
    deepShapeQuestions.forEach((item, idx) => {
        out.push(muc5BaseQuestion_(4240 + idx, '5.2', 'Nhận biết và phân loại hình phẳng',
            item.q, item.options, item.answer, {
                muc5_type: 'shape_property',
                muc5_visual: {
                    target: item.target,
                    color: colors[(idx + 2) % colors.length],
                    rotate: rotations[(idx + 1) % rotations.length]
                },
                explanation: item.explanation
            }));
    });

    // 5.3 - Lắp ghép và xếp hình: mỗi cảnh có 2 câu khác nhau, không lặp để đủ số lượng.
    const scenes = [
        { name:'ngôi nhà', missing:'triangle', placed:['square'], components:'1 hình vuông và 1 hình tam giác' },
        { name:'cây kem', missing:'triangle', placed:['circle'], components:'1 hình tròn và 1 hình tam giác' },
        // Hình rô-bốt đang vẽ gồm: 1 đầu vuông + 1 thân chữ nhật + 2 tay chữ nhật.
        { name:'chú rô-bốt', missing:'square', placed:['rectangle','rectangle','rectangle'], components:'1 hình vuông và 3 hình chữ nhật' },
        { name:'cây cờ', missing:'rectangle', placed:['rectangle'], components:'2 hình chữ nhật' },
        { name:'chiếc thuyền', missing:'triangle', placed:['rectangle'], components:'1 hình chữ nhật và 1 hình tam giác' },
        { name:'cửa sổ', missing:'square', placed:['square','square','square'], components:'4 hình vuông' },
        { name:'bông hoa', missing:'circle', placed:['rectangle'], components:'1 hình tròn và 1 hình chữ nhật' },
        { name:'mũi tên', missing:'triangle', placed:['rectangle'], components:'1 hình chữ nhật và 1 hình tam giác' }
    ];
    const componentOptions = [
        '1 hình vuông và 1 hình tam giác', '1 hình tròn và 1 hình tam giác',
        '1 hình vuông và 3 hình chữ nhật', '2 hình chữ nhật',
        '1 hình chữ nhật và 1 hình tam giác', '4 hình vuông',
        '1 hình tròn và 1 hình chữ nhật', '2 hình vuông và 1 hình chữ nhật'
    ];
    const rotateOpts = (arr, shift) => {
        const a = [...arr];
        const k = ((Number(shift) || 0) % a.length + a.length) % a.length;
        return a.slice(k).concat(a.slice(0, k));
    };
    for (let i = 0; i < scenes.length * 2; i++) {
        const scene = scenes[Math.floor(i / 2) % scenes.length];
        if (i % 2 === 0) {
            const options = rotateOpts(flatOptions, (Math.floor(i / 2) + 1) % 4);
            out.push(muc5BaseQuestion_(4300+i, '5.3', 'Lắp ghép và xếp hình',
                `Mảnh nào còn thiếu để hoàn thành ${scene.name}?`, options, muc5ShapeName_(scene.missing), {
                    muc5_type: 'compose_missing',
                    muc5_visual: { scene: scene.name, missing: scene.missing, placed: scene.placed, color: colors[i % colors.length] },
                    explanation: `Chỗ trống có dạng ${muc5ShapeName_(scene.missing).toLowerCase()}, nên con chọn đúng mảnh có cùng dạng.`
                }));
        } else {
            const distractors = componentOptions.filter(x => x !== scene.components);
            const picked = [
                distractors[(i + 0) % distractors.length],
                distractors[(i + 2) % distractors.length],
                distractors[(i + 4) % distractors.length]
            ];
            let options = [...new Set([scene.components, ...picked])];
            for (const d of distractors) {
                if (options.length >= 4) break;
                if (!options.includes(d)) options.push(d);
            }
            options = rotateOpts(options.slice(0,4), (Math.floor(i / 2) + 2) % 4);
            out.push(muc5BaseQuestion_(4300+i, '5.3', 'Lắp ghép và xếp hình',
                `${scene.name.charAt(0).toUpperCase()+scene.name.slice(1)} được ghép từ những mảnh nào?`, options, scene.components, {
                    muc5_type: 'compose_parts',
                    muc5_visual: { scene: scene.name, missing: null, placed: [...scene.placed, scene.missing], color: colors[i % colors.length] },
                    explanation: `Con tách hình lớn thành từng mảnh nhỏ rồi gọi đúng tên từng hình.`
                }));
        }
    }

    // 5.4 - Nhận biết hình khối qua mô hình và đồ vật thật.
    const solidOptions = ['Khối lập phương', 'Khối hộp chữ nhật', 'Hình vuông', 'Hình chữ nhật'];
    const objects = [
        { label:'Xúc xắc', emoji:'🎲', solid:'cube' },
        { label:'Khối Rubik', emoji:'🧊', solid:'cube' },
        { label:'Hộp giày', emoji:'📦', solid:'cuboid' },
        { label:'Viên gạch', emoji:'🧱', solid:'cuboid' }
    ];
    for (let i = 0; i < 40; i++) {
        const solid = i % 2 === 0 ? 'cube' : 'cuboid';
        if (i % 3 === 0) {
            out.push(muc5BaseQuestion_(4400+i, '5.4', 'Nhận biết hình khối trong đời sống',
                'Khối dưới đây có tên là gì?', solidOptions, solid === 'cube' ? 'Khối lập phương' : 'Khối hộp chữ nhật', {
                    muc5_type: 'solid_identify',
                    muc5_visual: { solid },
                    explanation: solid === 'cube'
                        ? 'Khối lập phương có dạng đều như xúc xắc hoặc khối Rubik.'
                        : 'Khối hộp chữ nhật thường dài theo một hoặc hai chiều như hộp giày.'
                }));
        } else {
            const obj = objects[i % objects.length];
            out.push(muc5BaseQuestion_(4400+i, '5.4', 'Nhận biết hình khối trong đời sống',
                `${obj.label} gần với dạng khối nào?`, solidOptions, obj.solid === 'cube' ? 'Khối lập phương' : 'Khối hộp chữ nhật', {
                    muc5_type: 'solid_object',
                    muc5_visual: { solid: obj.solid, objectLabel: obj.label, objectEmoji: obj.emoji },
                    explanation: `${obj.label} là đồ vật có dạng gần với ${obj.solid === 'cube' ? 'khối lập phương' : 'khối hộp chữ nhật'}.`
                }));
        }
    }


    // 5.5 - Đếm hình nâng cao: đếm hình trong một hình nhiều nét, không phải đếm các emoji rời.
    // Dùng ít câu nhưng mỗi hình có cấu trúc rõ và đáp án đã kiểm tra bằng tay.
    const advancedPatterns = [
        { pattern:'tri_fan_2', target:'tam giác', answer:3, explanation:'Có 2 tam giác nhỏ và 1 tam giác lớn: 2 + 1 = 3.' },
        { pattern:'tri_fan_3', target:'tam giác', answer:6, explanation:'Có 3 tam giác nhỏ, 2 tam giác ghép từ hai phần liền nhau và 1 tam giác lớn: 3 + 2 + 1 = 6.' },
        { pattern:'tri_fan_4', target:'tam giác', answer:10, explanation:'Đếm theo tầng: 4 tam giác nhỏ + 3 tam giác ghép 2 phần + 2 tam giác ghép 3 phần + 1 tam giác lớn = 10.' },
        { pattern:'square_diagonals', target:'tam giác', answer:8, explanation:'Có 4 tam giác nhỏ quanh tâm và 4 tam giác lớn bằng nửa hình vuông: tổng cộng 8.' },
        { pattern:'square_grid_2', target:'hình vuông', answer:5, explanation:'Có 4 hình vuông nhỏ và 1 hình vuông lớn: 4 + 1 = 5.' },
        { pattern:'square_grid_3', target:'hình vuông', answer:14, explanation:'Có 9 hình vuông nhỏ, 4 hình vuông cỡ 2 ô và 1 hình vuông lớn: 9 + 4 + 1 = 14.' },
        { pattern:'nested_squares_2', target:'hình vuông', answer:2, explanation:'Có 1 hình vuông ngoài và 1 hình vuông bên trong: tổng cộng 2.' },
        { pattern:'nested_squares_3', target:'hình vuông', answer:3, explanation:'Có 3 hình vuông lồng vào nhau.' },
        { pattern:'rect_cols_3', target:'hình chữ nhật', answer:6, explanation:'Có 3 hình chữ nhật một ô, 2 hình ghép hai ô và 1 hình lớn: 3 + 2 + 1 = 6.' },
        { pattern:'rect_cols_4', target:'hình chữ nhật', answer:10, explanation:'Có 4 hình một ô + 3 hình hai ô + 2 hình ba ô + 1 hình lớn = 10.' },
        { pattern:'rect_grid_2x2', target:'hình chữ nhật', answer:9, explanation:'Có 4 hình nhỏ, 2 hình ghép ngang, 2 hình ghép dọc và 1 hình lớn: tổng cộng 9.' },
        { pattern:'rect_grid_3x2', target:'hình chữ nhật', answer:18, explanation:'Đếm đủ các kích thước: 6 + 4 + 2 + 3 + 2 + 1 = 18 hình chữ nhật.' }
    ];
    const countOptions = (correct, seed) => {
        const c = Number(correct);
        let vals = [c, Math.max(1, c - 1), c + 1, c + 2];
        vals = [...new Set(vals)];
        let d = 2;
        while (vals.length < 4) {
            const v = Math.max(1, c - d);
            if (!vals.includes(v)) vals.push(v);
            d++;
        }
        vals = vals.slice(0,4).map(String);
        return rotateOpts(vals, seed % 4);
    };
    advancedPatterns.forEach((item, idx) => {
        const opts = countOptions(item.answer, idx + 1);
        out.push(muc5BaseQuestion_(4500 + idx, '5.5', 'Đếm hình nâng cao',
            `Trong hình có tất cả bao nhiêu ${item.target}?`, opts, String(item.answer), {
                muc5_type: 'shape_count_advanced',
                muc5_visual: { pattern: item.pattern, target: item.target },
                explanation: item.explanation,
                audio_text: `Trong hình có tất cả bao nhiêu ${item.target}?`
            }));
    });
    return out;
}

function openMuc5IntroLesson_() {
    stopSpeaking();
    setAppShellRootMode_(false);
    updateDiscoverBreadcrumb_('5. Hình học', '📐', '5.1 Làm quen với các hình');
    switchAppView('view-quiz');
    document.getElementById('quiz-top-bar')?.classList.add('hidden');
    document.getElementById('quiz-card-header')?.classList.add('hidden');
    document.getElementById('nav-group-practice')?.classList.add('hidden');
    document.getElementById('nav-group-exam')?.classList.add('hidden');
    const host = document.getElementById('question-box');
    if (!host) return;
    host.innerHTML = `
        <div class="w-full max-w-5xl mx-auto py-2">
            <div class="rounded-[28px] border-2 border-pink-100 bg-gradient-to-br from-sky-50 via-white to-amber-50 px-4 py-5 md:px-7 md:py-6 shadow-sm">
                <div class="text-center">
                    <div class="text-sm md:text-base font-black text-pink-600">🐰 Cô Thỏ Hồng cùng con làm quen với hình học</div>
                    <h2 class="mt-1 text-xl md:text-2xl font-black text-slate-800">Nhìn dạng của hình trước khi nhớ tên</h2>
                    <button onclick="speakVietnamese(MUC5_INTRO_AUDIO_, 0.94)" class="mt-3 px-5 py-2 bg-pink-50 hover:bg-pink-100 text-pink-700 border border-pink-200 rounded-2xl font-black pastel-btn shadow-xs">
                        <i class="fa-solid fa-volume-high mr-1.5"></i> Nghe Cô Thỏ Hồng giảng
                    </button>
                </div>

                <div class="mt-5 grid grid-cols-2 md:grid-cols-4 gap-3">
                    ${[
                        ['circle','Hình tròn','Đường bao cong, không có góc.'],
                        ['triangle','Hình tam giác','Có 3 cạnh và 3 góc.'],
                        ['square','Hình vuông','Có 4 cạnh bằng nhau.'],
                        ['rectangle','Hình chữ nhật','Có 4 góc; hai cặp cạnh đối diện bằng nhau.']
                    ].map((x,i)=>`<div class="rounded-2xl border-2 border-violet-100 bg-white p-3 flex flex-col items-center text-center shadow-xs">
                        ${muc5ShapeSvg_(x[0], {size:82, color:['#fde68a','#fca5a5','#93c5fd','#86efac'][i], rotate:i===1?12:(i===2?25:0)})}
                        <div class="mt-1 font-black text-violet-700">${x[1]}</div>
                        <div class="mt-0.5 text-xs md:text-sm font-bold text-slate-600">${x[2]}</div>
                    </div>`).join('')}
                </div>

                <div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3 max-w-3xl mx-auto">
                    <div class="rounded-2xl border-2 border-sky-100 bg-white p-3 flex items-center gap-3 shadow-xs">
                        ${muc5SolidSvg_('cube',{size:92})}
                        <div><div class="font-black text-sky-700">Khối lập phương</div><div class="text-xs md:text-sm font-bold text-slate-600">Dạng gần giống xúc xắc hoặc khối Rubik.</div></div>
                    </div>
                    <div class="rounded-2xl border-2 border-emerald-100 bg-white p-3 flex items-center gap-3 shadow-xs">
                        ${muc5SolidSvg_('cuboid',{size:112,fill1:'#d1fae5',fill2:'#a7f3d0',fill3:'#6ee7b7'})}
                        <div><div class="font-black text-emerald-700">Khối hộp chữ nhật</div><div class="text-xs md:text-sm font-bold text-slate-600">Dạng gần giống hộp giày hoặc viên gạch.</div></div>
                    </div>
                </div>

                <div class="mt-4 rounded-2xl bg-amber-50 border border-amber-200 px-4 py-3 text-center text-sm md:text-base font-black text-amber-800">
                    Mẹo: màu sắc, kích thước và việc xoay nghiêng không làm đổi tên của hình.
                </div>
                <div class="mt-5 flex flex-wrap justify-center gap-3">
                    <button onclick="switchAppView('view-lecture'); updateDiscoverBreadcrumb_('5. Hình học','📐',null)" class="px-5 py-2 bg-white border border-slate-200 rounded-2xl font-black text-slate-600 pastel-btn">← Về Mục 5</button>
                    <button onclick="switchAppView('view-lecture'); selectSubtopic(0)" class="px-6 py-2 bg-gradient-to-r from-pink-500 to-violet-500 text-white rounded-2xl font-black shadow-md pastel-btn">Học xong – vào 5.2 →</button>
                </div>
            </div>
        </div>`;
}

function showLectureAndSubtopics(topicNum, topicName, topicObj) {
    const topicQuestions = Number(topicNum) === 2
        ? remapMuc2Questions_(topicObj.questions)
        : Number(topicNum) === 5
            ? buildMuc5Questions_()
            : (topicObj.questions || []);
    pendingTopicQuiz = { topicNum, topicName, questions: topicQuestions };

    const isMuc5 = Number(topicNum) === 5;
    document.getElementById('lecture-title').textContent = isMuc5 ? 'Hình học' : (topicObj.lecture_title || topicName);
    document.getElementById('lecture-content').textContent = isMuc5
        ? 'Làm quen tên gọi → nhận biết và phân loại → lắp ghép → nhận biết hình khối → đếm hình nâng cao.'
        : (topicObj.lecture_content || topicObj.description || 'Chào mừng bé yêu! Hãy chọn một mục nhỏ bên dưới để bắt đầu luyện tập nhé.');
    document.getElementById('lecture-content')?.classList.add('text-base', 'md:text-lg');
    document.getElementById('view-lecture').dataset.audioText = isMuc5
        ? 'Mục Hình học gồm năm bước. Trước tiên con làm quen tên gọi và cách nhận biết các hình. Sau đó con luyện phân loại hình phẳng, lắp ghép xếp hình, nhận biết hình khối trong đời sống và cuối cùng thử đếm hình trong các hình nhiều nét.'
        : (topicObj.lecture_audio_text || topicObj.lecture_content || topicObj.description || '');

    const groups = [], groupMap = {}, groupLabels = {};
    topicQuestions.forEach(q => {
        let k = (q.sub_topic || 'Câu hỏi chung').trim();
        let label = q.sub_topic_label || k;

        // Mục 1 và Mục 2 chỉ hiển thị 3 chặng lớn cho trẻ.
        // Mã sub_topic gốc vẫn được giữ trong từng câu để engine dùng đúng trực quan/hỗ trợ.
        if (Number(topicNum) === 1) {
            const stage = String(q?.sub_topic || '');
            if (stage === '1.1' || stage === '1.2') {
                k = '1';
                label = 'Các số từ 0 đến 10';
            } else if (stage === '1.3' || stage === '1.4') {
                k = '2';
                label = 'So sánh số';
            } else {
                k = '3';
                label = 'Tách - gộp và củng cố';
            }
        } else if (Number(topicNum) === 2) {
            const stage = String(q?._muc2_stage || q?.sub_topic || '');
            if (stage === '2.1' || stage === '2.2') {
                k = '1';
                label = 'Phép cộng';
            } else if (stage === '2.3' || stage === '2.4') {
                k = '2';
                label = 'Phép trừ';
            } else {
                k = '3';
                label = 'Luyện tập tổng hợp';
            }
        }

        if (!groupMap[k]) { groupMap[k] = []; groups.push(k); groupLabels[k] = label; }
        groupMap[k].push(q);
    });
    groups.sort((a, b) => {
        const pa = String(a).split('.').map(x => Number(x));
        const pb = String(b).split('.').map(x => Number(x));
        const len = Math.max(pa.length, pb.length);
        for (let i = 0; i < len; i++) {
            const va = Number.isFinite(pa[i]) ? pa[i] : 9999;
            const vb = Number.isFinite(pb[i]) ? pb[i] : 9999;
            if (va !== vb) return va - vb;
        }
        return String(a).localeCompare(String(b), 'vi');
    });
    pendingTopicQuiz.groups = groups; 
    pendingTopicQuiz.groupMap = groupMap;
    pendingTopicQuiz.groupLabels = groupLabels;

    let subHtml = '';
    if (Number(topicNum) === 5) {
        const introStyle = SUBTOPIC_PALETTES[0];
        subHtml += `
            <button onclick="openMuc5IntroLesson_()" class="px-3 py-2.5 ${introStyle.card} border-2 rounded-xl font-bold text-left transition-all flex items-center justify-between gap-2 shadow-sm pastel-btn">
                <span class="text-base md:text-lg leading-tight sm:whitespace-nowrap"><strong class="${introStyle.num} mr-1.5">1.</strong> Làm quen với các hình</span>
                <span class="text-xs md:text-sm font-extrabold ${introStyle.badge} px-2.5 py-0.5 rounded-full border shrink-0 ml-1.5 shadow-inner">🎧 Bài giảng</span>
            </button>`;
    }
    groups.forEach((subName, idx) => {
        const displayIndex = idx + (Number(topicNum) === 5 ? 2 : 1);
        const style = SUBTOPIC_PALETTES[(displayIndex - 1) % SUBTOPIC_PALETTES.length];
        const hideInternalCode = [3,4,5,6,7,8,9,10,11,13].includes(Number(topicNum));
        const isMucThreeStage = Number(topicNum) === 1 || Number(topicNum) === 2;
        const displayTitle = isMucThreeStage
            ? beautifySubtopicName(groupLabels[subName])
            : (hideInternalCode ? beautifySubtopicName(groupLabels[subName]) : formatSubtopicLabelWithCode_(subName, groupLabels[subName]));
        const count = groupMap[subName].length;
        // Mục 1-2: chỉ hiện 1. / 2. / 3. thay cho các mã nhỏ 1.x / 2.x.
        const ordinalHtml = (hideInternalCode || isMucThreeStage)
            ? `<strong class="${style.num} mr-1.5">${displayIndex}.</strong>`
            : '';

        subHtml += `
            <button onclick="selectSubtopic(${idx})" class="px-3 py-2.5 ${style.card} border-2 rounded-xl font-bold text-left transition-all flex items-center justify-between gap-2 shadow-sm pastel-btn">
                <span class="text-base md:text-lg leading-tight sm:whitespace-nowrap">${ordinalHtml}${ordinalHtml ? ' ' : ''}${escapeHtml(displayTitle)}</span>
                <span class="text-sm md:text-base font-extrabold ${style.badge} px-2.5 py-0.5 rounded-full border shrink-0 ml-1.5 shadow-inner">${count} câu</span>
            </button>`;
    });
    setSubtopicGridColumns(groups.length + (Number(topicNum) === 5 ? 1 : 0));
    document.getElementById('lecture-subtopics-list').innerHTML = subHtml;

    if (Number(topicNum) === 13) updateNavTabs('Ôn tập', '📚', topicName);
    else updateDiscoverBreadcrumb_(topicName, TOPICS_CONFIG.find(t => t.id === topicNum)?.icon || '🔢', null);
    switchAppView('view-lecture');
}

function speakLecture() {
    speakVietnamese(document.getElementById('view-lecture').dataset.audioText || '', 0.96);
}


function buildPracticeCycleQuestions_(pool) {
    const source = Array.isArray(pool) ? [...pool] : [];
    if (!source.length) return [];
    const isTopic35 = source.every(q => String(q?.sub_topic || '') === '3.5');
    if (!isTopic35) return shuffleArray(source);

    const phase1 = source.filter(q => Number(q?.question_id || 0) >= 5200 && Number(q?.question_id || 0) <= 5209);
    const phase2 = source.filter(q => Number(q?.question_id || 0) >= 5210 && Number(q?.question_id || 0) <= 5219);
    const phase3 = source.filter(q => Number(q?.question_id || 0) >= 5220 && Number(q?.question_id || 0) <= 5239);
    const other = source.filter(q => ![...phase1, ...phase2, ...phase3].includes(q));

    // 3.5 là lộ trình học có chủ đích: 10 câu số 0-9 → 10 câu chọn trong 4 số → 20 câu số hai chữ số.
    // Chỉ xáo trong từng chặng, không xáo lẫn các chặng.
    return [
        ...shuffleArray(phase1),
        ...shuffleArray(phase2),
        ...shuffleArray(phase3),
        ...shuffleArray(other)
    ];
}

function selectSubtopic(idx) {
    stopSpeaking();
    if (!pendingTopicQuiz) return;
    const { topicNum, topicName, questions, groups, groupMap, groupLabels } = pendingTopicQuiz;
    if (Number(topicNum) === 13 && !requirePremium('Ôn tập')) return;
    const subLabel = idx !== null ? groups[idx] : null;
    const pool = idx !== null ? groupMap[subLabel] : questions;
    const displayLabel = subLabel
        ? ((Number(topicNum) === 1 || Number(topicNum) === 2)
            ? `${subLabel}. ${beautifySubtopicName(groupLabels[subLabel])}`
            : (Number(topicNum) === 13
                ? beautifySubtopicName(groupLabels[subLabel])
                : formatSubtopicLabelWithCode_(subLabel, groupLabels[subLabel])))
        : null;
    const finalTitle = displayLabel ? `${topicName} - ${displayLabel}` : topicName;

    practiceCycleRawPool = [...pool];
    const firstCycleQuestions = buildPracticeCycleQuestions_(pool);

    if (Number(topicNum) === 13) updateNavTabs('Ôn tập', '📚', topicName, displayLabel || 'Tất cả các mục');
    else updateDiscoverBreadcrumb_(topicName, TOPICS_CONFIG.find(t => t.id === topicNum)?.icon || '🔢', displayLabel || 'Tất cả các mục');
    startTopicQuiz(topicNum, finalTitle, firstCycleQuestions, subLabel);
}

// ==========================================
// BÀI TẬP THEO TỪNG BÀI SGK - thay roadmap tuần cũ
// ==========================================
function handleNextExamFromReport() {
    stopSpeaking();
    if (activeRoadmapContext) {
        activeRoadmapContext = null;
        openRoadmap(exerciseSemesterFilter || 1);
    } else if (activeExamContext) {
        activeExamContext = null;
        openExamHub();
    } else {
        goHome();
    }
}

function getExerciseProgressKey_() {
    const id = String(currentUser?.maHS || 'KHACH').toUpperCase();
    return `toan1_bai_tap_unlocked_${id}`;
}

function getLocalExerciseProgressIndex_() {
    if (!currentUser || currentUser.isGuest) return 1;
    try {
        const stored = Number(localStorage.getItem(getExerciseProgressKey_()) || 1);
        return Math.max(1, Number.isFinite(stored) ? stored : 1);
    } catch (_) { return 1; }
}

function getCurrentExerciseIndex_() {
    if (!currentUser || currentUser.isGuest) return 1;
    if (isAdminUser()) return 999;
    if (class1ExerciseProgressLoaded_) return Math.max(1, Number(class1ExerciseUnlockedIndex_) || 1);
    return getLocalExerciseProgressIndex_();
}

function setCurrentExerciseIndex_(idx) {
    if (!currentUser || currentUser.isGuest) return;
    class1ExerciseUnlockedIndex_ = Math.max(1, Number(idx) || 1);
    class1ExerciseProgressLoaded_ = true;
    try { localStorage.setItem(getExerciseProgressKey_(), String(class1ExerciseUnlockedIndex_)); } catch (_) {}
}

async function refreshClass1MathProgress_() {
    if (!currentUser || currentUser.isGuest || isAdminUser()) {
        if (isAdminUser()) { class1ExerciseUnlockedIndex_ = 999; class1ExerciseProgressLoaded_ = true; }
        return;
    }
    const data = await class1ApiRequest_('assessmentProgressGet', { subjectId: 'toan' });
    class1ExerciseUnlockedIndex_ = Math.max(1, Number(data?.unlockedIndex) || 1);
    class1ExerciseBestPercent_ = data?.bestPercentByExercise && typeof data.bestPercentByExercise === 'object' ? data.bestPercentByExercise : {};
    class1ExerciseProgressLoaded_ = true;
    try { localStorage.setItem(getExerciseProgressKey_(), String(class1ExerciseUnlockedIndex_)); } catch (_) {}
}

function newAssessmentAttemptId_() {
    try {
        if (window.crypto && typeof window.crypto.randomUUID === 'function') return window.crypto.randomUUID();
    } catch (_) {}
    return 'math_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 14);
}

function assessmentAnswersPayload_() {
    return activeQuestionsList.map((q, idx) => ({
        questionId: String(q?.question_id ?? ''),
        answer: userAnswers[idx] == null ? '' : String(userAnswers[idx])
    }));
}

async function openRoadmap(semesterNumber = exerciseSemesterFilter || 1) {
    setAppShellRootMode_(true);
    setMainTabActive_('exercises');
    stopSpeaking();
    clearInterval(quizTimerInterval);
    exerciseSemesterFilter = Number(semesterNumber) || 1;
    activeBaiHocContext = null;
    activeExamContext = null;
    pendingTopicQuiz = null;
    updateNavTabs('Bài tập', '✏️', null);
    switchAppView('view-roadmap');
    showLoadingOverlay('Đang mở Bài tập theo SGK...');
    try {
        try { await refreshClass1MathProgress_(); }
        catch (_) {
            showAppNotice('Chưa đồng bộ được tiến độ từ tài khoản Lớp 1. Hệ thống sẽ dùng tiến độ gần nhất trên thiết bị và kiểm tra lại khi lưu kết quả.', { title:'Tiến độ Bài tập', icon:'☁️', tone:'amber' });
        }
        const data = await loadBaiHocData();
        renderRoadmapSVG(data);
    } catch (err) {
        showAppNotice(`Không thể mở Bài tập: ${err.message}`, { title: 'Bài tập', icon: '✏️', tone: 'rose' });
    } finally {
        hideLoadingOverlay();
    }
}

function renderRoadmapSVG(data) {
    const container = document.getElementById('roadmap-svg-container');
    if (!container) return;
    const lessons = (data?.bai_tap || []).filter(x => Number(x.semester) === Number(exerciseSemesterFilter));
    const seq = data?.learning_sequence || [];
    const unlockedIndex = getCurrentExerciseIndex_();
    const tabHost = document.getElementById('roadmap-semester-tabs');
    if (tabHost) {
        tabHost.innerHTML = [1,2].filter(sem => (data?.bai_tap || []).some(x => Number(x.semester) === sem)).map(sem => `<button onclick="openRoadmap(${sem})" class="semester-switch-btn ${Number(sem) === Number(exerciseSemesterFilter) ? 'is-active' : 'is-inactive'}">Học kỳ ${sem}</button>`).join('');
    }

    container.className = 'w-full bg-gradient-to-br from-pink-50/70 via-white to-purple-50/70 rounded-3xl border-2 border-pink-200 p-3 shadow-sm';
    container.innerHTML = `<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2">${lessons.map((ex, idx) => {
        const seqIndex = seq.indexOf(Number(ex.bai)) + 1;
        const locked = seqIndex > unlockedIndex;
        const open = !locked;
        return `<button onclick="${open ? `selectRoadmapWeek(${seqIndex})` : `showLockedExercise_(${ex.bai})`}" class="relative text-left min-h-[92px] rounded-2xl border-2 p-3 ${open ? (idx % 2 ? 'bg-purple-50 border-purple-200 hover:border-purple-400' : 'bg-pink-50 border-pink-200 hover:border-pink-400') : 'bg-slate-50 border-slate-200 opacity-60'} hover:shadow-md transition-shadow">
            <div class="flex justify-between gap-2"><span class="font-black ${open ? 'text-purple-700' : 'text-slate-500'}">Bài ${ex.bai}</span><span>${open ? '' : '🔒'}</span></div>
            <div class="text-[12px] md:text-[13px] font-bold text-slate-600 mt-1 line-clamp-2">${escapeHtml(ex.title || '')}</div>
            <div class="text-[10px] mt-1 ${open ? 'text-emerald-600' : 'text-slate-400'} font-black">${open ? '20 câu' : 'Cần ≥80% bài trước'}</div>
        </button>`;
    }).join('')}</div>`;
}

function showLockedExercise_(bai) {
    if (!requirePremium('Bài tập')) return;
    showAppNotice(`Bài tập ${bai} chưa mở. Bé cần đạt từ 80% ở Bài tập trước để mở khóa nhé!`, { title:'Bài tập đang khóa', icon:'🔒', tone:'amber' });
}

function exerciseOperationMeta_(q, requestedOperation = '') {
    const prompt = String(q?.question_text || '');
    const answer = String(q?.answer || '');
    const options = Array.isArray(q?.options) ? q.options.join(' ') : '';
    const answerExpr = answer.match(/(\d+)\s*([+\-−])\s*(\d+)/);
    const promptExpr = prompt.match(/(\d+)\s*([+\-−])\s*(\d+)/);
    const expr = answerExpr || promptExpr;
    if (expr) {
        return { a:Number(expr[1]), op:expr[2] === '-' ? '−' : expr[2], b:Number(expr[3]) };
    }
    const nums = (prompt.match(/\b\d+\b/g) || []).map(Number).filter(Number.isFinite);
    if (nums.length >= 2) {
        let op = '';
        const text = `${prompt} ${options} ${answer}`.toLowerCase();
        if (requestedOperation === 'addition') op = '+';
        else if (requestedOperation === 'subtraction') op = '−';
        else if (/\+|cộng|thêm|gộp|đưa vào|bay tới|mang tới|xuất hiện thêm|cùng được tính/.test(text)) op = '+';
        else if (/[−-]|trừ|bớt|rời|cất đi|mang về|không còn|ra sân|chuyển sang/.test(text)) op = '−';
        if (op) return { a:nums[0], op, b:nums[1] };
    }
    return null;
}

function questionMatchesFilter_(q, filter) {
    if (!q || !filter) return false;
    if (filter.sub_id && String(q.sub_topic) !== String(filter.sub_id)) return false;
    if (filter.competency && String(q.skill_tag || '').toUpperCase() !== String(filter.competency).toUpperCase()) return false;
    const c = filter.constraints || {};
    if (c.mode && String(q.exercise_mode || '') !== String(c.mode)) return false;
    const text = `${q.question_text || ''} ${(q.options || []).join(' ')} ${q.answer || ''}`.toLowerCase();
    const answerNum = Number(String(q.answer || '').replace(',', '.'));

    if (c.number_min != null && Number.isFinite(answerNum) && answerNum < Number(c.number_min)) return false;
    if (c.number_max != null && Number.isFinite(answerNum) && answerNum > Number(c.number_max)) return false;

    if (c.operation) {
        const op = String(c.operation);
        const hasPlus = /\+|cộng|thêm|tất cả|gộp|đưa vào|bay tới|mang tới/.test(text);
        const hasMinus = /-|−|trừ|bớt|còn lại|lấy đi|rời|cất đi|mang về/.test(text);
        if (op === 'addition' && !hasPlus) return false;
        if (op === 'subtraction' && !hasMinus) return false;
        if (op === 'add_subtract_facts' && !(hasPlus || hasMinus)) return false;
    }

    if (c.left_digits || c.right_digits || c.no_carry || c.no_borrow) {
        const meta = exerciseOperationMeta_(q, c.operation);
        if (!meta) return false;
        const {a,op,b} = meta;
        if (c.left_digits && String(Math.abs(a)).length !== Number(c.left_digits)) return false;
        if (c.right_digits && String(Math.abs(b)).length !== Number(c.right_digits)) return false;
        if (c.no_carry && op === '+' && ((a % 10) + (b % 10) >= 10)) return false;
        if (c.no_borrow && op === '−' && ((a % 10) < (b % 10))) return false;
    }

    if (Array.isArray(c.operators) && c.operators.length && !c.operators.some(op => text.includes(String(op).toLowerCase()))) {
        if (!/so sánh|lớn hơn|bé hơn|nhỏ hơn|bằng nhau/.test(text)) return false;
    }
    if (Array.isArray(c.units) && c.units.length && !c.units.some(u => text.includes(String(u).toLowerCase()))) return false;
    if (c.time_mode === 'whole_hour' && !/giờ|đồng hồ/.test(text)) return false;
    if (c.calendar_mode && !/ngày|tuần|thứ|lịch|hôm qua|hôm nay|ngày mai|giờ/.test(text)) return false;
    return true;
}

function balancedQuestionsForFilters_(filters, allQuestions, targetCount, competency, used) {
    const eligibleFilters = (filters || []).filter(f => !f.competency || String(f.competency).toUpperCase() === String(competency || '').toUpperCase());
    const pools = eligibleFilters.map(filter => shuffleArray(allQuestions.filter(q => {
        if (competency && String(q.skill_tag || '').toUpperCase() !== String(competency).toUpperCase()) return false;
        return questionMatchesFilter_(q, filter);
    })));
    const out = [];
    let progressed = true;
    while (out.length < targetCount && progressed) {
        progressed = false;
        for (const pool of pools) {
            while (pool.length) {
                const q = pool.shift();
                const key = String(q.question_id);
                if (used.has(key)) continue;
                used.add(key); out.push(q); progressed = true; break;
            }
            if (out.length >= targetCount) break;
        }
    }
    return out;
}

function buildExerciseQuestions_(exercise, allQuestions) {
    const total = Number(exercise?.question_count || 20);
    const filters = [...(exercise?.question_bank_filters || [])].sort((a,b) => Number(a.priority || 9) - Number(b.priority || 9));
    const distribution = Array.isArray(exercise?.attempt_blueprint?.distribution) ? exercise.attempt_blueprint.distribution : [];
    const selected = [];
    const used = new Set();

    if (distribution.length) {
        for (const bucket of distribution) {
            const competency = String(bucket.competency || '').toUpperCase();
            const need = Number(bucket.target_questions || 0);
            selected.push(...balancedQuestionsForFilters_(filters, allQuestions, need, competency, used));
        }
    } else {
        selected.push(...balancedQuestionsForFilters_(filters, allQuestions, total, '', used));
    }

    // Runtime-ready Bài tập không được bù bằng câu chỉ khớp sub_id nhưng vi phạm constraints.
    // Nếu dữ liệu thiếu, trả đúng số câu hợp lệ hiện có để UI báo thiếu thay vì trộn sai phạm vi bài học.
    if (selected.length < total) {
        const remaining = balancedQuestionsForFilters_(filters, allQuestions, total - selected.length, '', used);
        selected.push(...remaining);
    }
    selected.forEach(q => {
        const sourceSub = String(q?.sub_topic || '');
        if (/^2\.(?:[1-9]|10)$/.test(sourceSub)) {
            q._source_sub_topic = sourceSub;
            q._muc2_stage = mapMuc2Stage_(q).code;
        }
    });
    return shuffleArray(selected).slice(0, total);
}

async function selectRoadmapWeek(sequenceIndex) {
    if (!requirePremium('Bài tập')) return;
    setAppShellRootMode_(false);
    stopSpeaking();
    const data = await loadBaiHocData();
    const seq = data?.learning_sequence || [];
    const baiNumber = seq[Number(sequenceIndex) - 1];
    const exercise = (data?.bai_tap || []).find(x => Number(x.bai) === Number(baiNumber));
    if (!exercise) return;

    const unlockedIndex = getCurrentExerciseIndex_();
    if (Number(sequenceIndex) > unlockedIndex) {
        const currentBai = seq[unlockedIndex - 1] || seq[0];
        showAppNotice(`Bài tập ${exercise.bai} đang được khóa. Con hãy hoàn thành Bài tập ${currentBai} đạt từ 80% trở lên để mở bài tiếp theo nhé!`, { title: 'Bài tập chưa mở', icon: '🔒', tone: 'purple' });
        return;
    }

    activeRoadmapContext = {
        week: Number(sequenceIndex),
        bai: Number(exercise.bai),
        topicId: exercise.sub_ids?.[0] || '',
        chuDe: `Bài ${exercise.bai}. ${exercise.title}`,
        exerciseId: exercise.exercise_id,
        semester: Number(exercise.semester)
    };
    exerciseSemesterFilter = Number(exercise.semester) || exerciseSemesterFilter;
    activeBaiHocContext = null;
    pendingTopicQuiz = null;
    activeExamContext = null;
    updateNavTabs('Bài tập', '✏️', `Bài ${exercise.bai}`, exercise.title);

    showLoadingOverlay(`Đang chuẩn bị 20 câu Bài tập ${exercise.bai}...`);
    try {
        const allQuestions = await loadExerciseQuestions_(exercise.semester);
        const questions = buildExerciseQuestions_(exercise, allQuestions);
        if (!questions.length) {
            showAppNotice('Bài này đang được bổ sung thêm câu hỏi phù hợp, bé quay lại sau nhé!', { title: 'Bài tập', icon: '✏️', tone: 'amber' });
            return;
        }
        if (questions.length < Number(exercise.question_count || 20)) {
            showAppNotice(`Hiện bài này có ${questions.length} câu phù hợp trong kho. Hệ thống sẽ cho bé luyện các câu đã được kiểm tra trước nhé!`, { title: 'Kho câu hỏi', icon: '🧩', tone: 'amber' });
        }
        startTopicQuiz(sequenceIndex, activeRoadmapContext.chuDe, questions, null);
    } catch (err) {
        showAppNotice(`Không thể tải Bài tập: ${err.message}`, { title: 'Bài tập', icon: '✏️', tone: 'rose' });
    } finally {
        hideLoadingOverlay();
    }
}

// ==========================================
// LOGIC CHẤM ĐIỂM & ĐIỀU KHIỂN CÂU HỎI
// ==========================================
function startTopicQuiz(topicNum, topicName, questions, subLabel) {
    setAppShellRootMode_(false);
    stopSpeaking();
    clearInterval(quizTimerInterval);
    activeQuestionsList = questions; 
    currentQIndex = 0; 
    score = 0;
    userAnswers = {};
    wrongAttemptsByQ = {};
    quizWrongAnswers = []; 
    quizAnsweredLog = []; 
    quizStartTime = Date.now();
    activeAssessmentAttemptId_ = (activeRoadmapContext || activeExamContext) ? newAssessmentAttemptId_() : '';

    const topBar = document.getElementById('quiz-top-bar');
    const cardHeader = document.getElementById('quiz-card-header');
    const navPractice = document.getElementById('nav-group-practice');
    const navExam = document.getElementById('nav-group-exam');

    const submitBtn = document.getElementById('btn-submit-quiz');
    if (submitBtn) {
        if (activeRoadmapContext) submitBtn.classList.add('hidden');
        else submitBtn.classList.remove('hidden');
    }

    const roadmapHistoryBtn = document.getElementById('btn-roadmap-history');
    if (roadmapHistoryBtn) {
        if (activeRoadmapContext) { roadmapHistoryBtn.classList.remove('hidden'); roadmapHistoryBtn.classList.add('flex'); }
        else { roadmapHistoryBtn.classList.add('hidden'); roadmapHistoryBtn.classList.remove('flex'); }
    }

    if (activeRoadmapContext || activeExamContext) {
        if (topBar) {
            if (activeExamContext) topBar.classList.remove('hidden');
            else topBar.classList.add('hidden');
        }
        const timerBox = document.getElementById('quiz-timer-container');
        if (activeExamContext) {
            if (timerBox) timerBox.classList.remove('hidden');
            startExamCountdown();
        } else {
            if (timerBox) timerBox.classList.add('hidden');
        }
        if (cardHeader) { cardHeader.classList.remove('hidden'); cardHeader.classList.add('flex'); }
        if (navPractice) navPractice.classList.add('hidden');
        if (navExam) { navExam.classList.remove('hidden'); navExam.classList.add('flex'); }
        initQuizPallet();
    } else {
        if (topBar) topBar.classList.add('hidden');
        if (cardHeader) { cardHeader.classList.add('hidden'); cardHeader.classList.remove('flex'); }
        if (navPractice) { navPractice.classList.remove('hidden'); navPractice.classList.add('flex'); }
        if (navExam) { navExam.classList.add('hidden'); navExam.classList.remove('flex'); }
    }

    const quizView = document.getElementById('view-quiz');
    if (quizView) quizView.classList.toggle('roadmap-exercise-mode', !!activeRoadmapContext);
    switchAppView('view-quiz');
    loadQuestion();
}


// ==========================================
// FOUNDATION UI - MUC 1 & 2: TRUC QUAN CHO BE LOP 1
// Giữ engine/breadcrumb hiện tại, chỉ thay cách trình bày câu luyện tập.
// ==========================================
function getFoundationEmojiSeed(q) {
    const text = String(q?.question_text || '').toLowerCase();
    const matches = String(q?.question_text || '').match(/\p{Extended_Pictographic}/gu) || [];
    const ignored = new Set(['❌','❓','❔','➕','➖','✖️','✔️','✅','🧺','📦','🏠','🅿️']);
    const found = matches.find(x => !ignored.has(x));
    if (found) return found;

    const rules = [
        [/bút|bút chì|viết/, '✏️'], [/táo/, '🍎'], [/cam/, '🍊'], [/dâu/, '🍓'],
        [/kẹo/, '🍬'], [/bánh/, '🍪'], [/cá/, '🐟'], [/chim/, '🐦'], [/thỏ/, '🐰'],
        [/gà|gà con/, '🐥'], [/hoa/, '🌼'], [/bóng bay|quả bóng/, '🎈'], [/ô tô|xe/, '🚗'],
        [/cà rốt/, '🥕'], [/bướm/, '🦋'], [/sao/, '⭐'], [/quả/, '🍎']
    ];
    for (const [re, emoji] of rules) if (re.test(text)) return emoji;
    return '⭐';
}

function repeatFoundationEmoji(emoji, count, underlinedCount = 0) {
    const n = Number(count);
    const u = Math.max(0, Math.min(n, Number(underlinedCount) || 0));
    if (!Number.isFinite(n) || n < 0 || n > 10) return '<span class="text-4xl md:text-5xl">❔</span>';
    if (n === 0) return '<span class="text-4xl md:text-5xl font-black text-slate-300">∅</span>';

    // Một hàng ngang duy nhất. Kích thước vừa phải để toàn bộ 0-10 luôn nằm gọn trong khung.
    const sizeClass = n >= 9
        ? 'text-[27px] md:text-[32px] lg:text-[36px]'
        : n >= 7
            ? 'text-[30px] md:text-[36px] lg:text-[40px]'
            : 'text-[34px] md:text-[40px] lg:text-[44px]';

    return `<span class="inline-flex flex-nowrap items-end justify-center gap-1 md:gap-1.5 ${sizeClass} leading-none whitespace-nowrap">${Array.from({ length: n }, (_, i) => {
        const underline = i >= (n - u);
        return underline
            ? `<span class="inline-flex items-end border-b-[3px] md:border-b-[4px] border-rose-500 pb-1">${emoji}</span>`
            : `<span class="inline-flex items-end pb-[4px] md:pb-[5px]">${emoji}</span>`;
    }).join('')}</span>`;
}

function buildFoundationEquationVisual(q, expression) {
    const m = String(expression || '').match(/(\d+|\?)\s*([+−-])\s*(\d+|\?)\s*=\s*(\d+|\?)/);
    if (!m) return '';
    const [, left, opRaw, right, result] = m;
    const op = opRaw === '-' ? '−' : opRaw;
    const emoji = getFoundationEmojiSeed(q);
    const isMinus = op === '−';
    const leftN = Number(left);
    const rightN = Number(right);
    const canUnderline = isMinus && Number.isFinite(leftN) && Number.isFinite(rightN) && rightN >= 0 && rightN <= leftN;

    // Mỗi số chỉ xuất hiện MỘT lần. Emoji đặt ngay dưới đúng số tương ứng.
    // Với phép trừ, gạch chân đúng số vật bị bớt trong nhóm bên trái để bé đếm phần còn lại.
    const operand = (value, underlineCount = 0, showEmoji = true) => `
        <div class="min-w-0 flex flex-col items-center justify-start">
            <div class="text-[46px] md:text-[54px] lg:text-[60px] font-black text-indigo-700 leading-none mb-3">${escapeHtml(value)}</div>
            <div class="min-h-[54px] md:min-h-[62px] flex items-center justify-center">
                ${showEmoji ? (value === '?' ? '<span class="text-4xl md:text-5xl">❔</span>' : repeatFoundationEmoji(emoji, value, underlineCount)) : ''}
            </div>
        </div>`;

    return `
        <div class="w-full flex items-start justify-center gap-2 md:gap-4 lg:gap-5 px-1 overflow-hidden">
            ${operand(left, canUnderline ? rightN : 0, true)}
            <div class="pt-1 text-[42px] md:text-[50px] lg:text-[56px] font-black ${isMinus ? 'text-rose-500' : 'text-emerald-500'} leading-none">${op}</div>
            ${operand(right, 0, true)}
            <div class="pt-1 text-[42px] md:text-[50px] lg:text-[56px] font-black text-slate-300 leading-none">=</div>
            <div class="pt-0 min-w-[52px] text-center text-[46px] md:text-[54px] lg:text-[60px] font-black text-pink-600 leading-none">${escapeHtml(result)}</div>
        </div>`;
}

function buildFoundationEmptyScene(q) {
    const text = String(q?.question_text || '').toLowerCase();
    const objectEmoji = getFoundationEmojiSeed(q);
    let container = '';
    if (/giỏ/.test(text)) container = '🧺';
    else if (/hộp/.test(text)) container = '📦';
    else if (/phòng/.test(text)) container = '🏠';
    else if (/bãi đỗ/.test(text)) container = '🅿️';
    else if (/đĩa/.test(text)) container = '🍽️';
    else if (/bể cá/.test(text)) container = '🫙';
    else if (/cành/.test(text)) container = '🌿';
    else if (/chậu|luống/.test(text)) container = '🪴';

    return `
        <div class="flex flex-col items-center justify-center gap-4">
            <div class="text-[110px] md:text-[145px] lg:text-[170px] leading-none">${container || '∅'}</div>
            <div class="flex items-center gap-4 md:gap-6">
                <span class="text-[70px] md:text-[88px] font-black text-indigo-700 leading-none">0</span>
                <span class="text-4xl md:text-5xl font-black text-slate-300">×</span>
                <span class="text-[64px] md:text-[82px] leading-none opacity-45">${objectEmoji}</span>
            </div>
        </div>`;
}

function buildFoundationSceneVisual(q) {
    const text = String(q?.question_text || '');
    const lower = text.toLowerCase();
    const lines = text.split(/\n/).map(x => x.trim()).filter(Boolean);

    // Câu về số 0: minh họa đúng ngữ nghĩa, tuyệt đối không dùng emoji ngẫu nhiên.
    if (/không có|trống|hết sạch|đã hết|không còn|rỗng|số 0|“không có”|"không có"/.test(lower) && !/giỏ a.*giỏ b/i.test(lower)) {
        return buildFoundationEmptyScene(q);
    }

    const groupLine = lines.find(line => /nhìn nhóm hình\s*:/i.test(line));
    if (groupLine) {
        const scene = groupLine.replace(/^.*?:\s*/, '').trim();
        return `<div class="w-full flex items-center justify-center text-[78px] md:text-[105px] lg:text-[128px] leading-[1.25] break-words select-none">${escapeHtml(scene)}</div>`;
    }

    const emojiLines = lines.filter(line => /\p{Extended_Pictographic}/u.test(line));
    if (emojiLines.length) {
        return emojiLines.map(line => {
            let scene = line;
            const colon = line.indexOf(':');
            if (colon >= 0 && colon < 28) scene = line.slice(colon + 1).trim();

            const hasQuestionWords = /(có bao nhiêu|chọn số|đếm|quan sát|con hãy|hãy|tất cả|biểu diễn đúng)/i.test(line);
            const emojisOnly = (scene.match(/\p{Extended_Pictographic}/gu) || []).join(' ');
            const nonEmojiText = scene.replace(/\p{Extended_Pictographic}/gu, '').replace(/[\s?.,:;!"'“”‘’()+\-]/g, '').trim();

            // Dòng câu hỏi có lẫn emoji chỉ thuộc prompt bên phải, không đưa vào khung trực quan.
            if (hasQuestionWords && nonEmojiText.length > 6 && colon < 0) return '';

            // Nếu một dòng vừa có chữ mô tả vừa có emoji, ưu tiên chỉ giữ hình để tránh chữ bị phóng lớn.
            if (emojisOnly && nonEmojiText.length > 0) scene = emojisOnly;

            const parts = scene.split(/\s+và\s+/i);
            if (parts.length === 2) {
                return `<div class="w-full flex items-center justify-center gap-4 md:gap-8 my-2">
                    <div class="flex-1 text-center text-[60px] md:text-[78px] lg:text-[92px] leading-[1.22] break-words select-none">${escapeHtml(parts[0])}</div>
                    <div class="text-2xl md:text-3xl font-black text-pink-500">và</div>
                    <div class="flex-1 text-center text-[60px] md:text-[78px] lg:text-[92px] leading-[1.22] break-words select-none">${escapeHtml(parts[1])}</div>
                </div>`;
            }
            return `<div class="w-full text-center text-[60px] md:text-[80px] lg:text-[96px] leading-[1.24] break-words select-none">${escapeHtml(scene)}</div>`;
        }).filter(Boolean).join('');
    }

    // Hai giỏ / hai nhóm đặc biệt.
    if (/giỏ a.*giỏ b/i.test(lower)) {
        return `<div class="w-full flex items-end justify-center gap-10 md:gap-16">
            <div class="text-center"><div class="text-2xl font-black text-slate-600 mb-2">A</div><div class="text-[110px] md:text-[145px]">🧺</div><div class="text-5xl font-black text-indigo-700">0</div></div>
            <div class="text-center"><div class="text-2xl font-black text-slate-600 mb-2">B</div><div class="text-[110px] md:text-[145px]">🧺</div><div class="text-[70px] md:text-[88px]">🍎</div></div>
        </div>`;
    }

    const comparison = text.match(/(?:chọn dấu thích hợp:\s*)?(\d+)\s*\?\s*(\d+)/i);
    if (comparison) {
        return `<div class="text-[82px] md:text-[105px] lg:text-[126px] font-black text-indigo-700 tracking-[0.06em]">${comparison[1]} <span class="text-pink-500">?</span> ${comparison[2]}</div>`;
    }

    const seq = text.match(/(?:điền số[^:]*:\s*)?([0-9?,\s]+)/i);
    if (seq && /\d/.test(seq[1]) && (seq[1].includes(',') || seq[1].includes('?'))) {
        return `<div class="px-4 text-[52px] md:text-[68px] lg:text-[82px] font-black text-indigo-700 leading-relaxed tracking-wide">${escapeHtml(seq[1].trim())}</div>`;
    }

    const quoted = text.match(/[“"]([^”"]+)[”"]/);
    if (quoted) {
        return `<div class="flex flex-col items-center gap-4"><div class="text-[95px] md:text-[120px]">👂</div><div class="text-[58px] md:text-[76px] lg:text-[90px] font-black text-indigo-700">${escapeHtml(quoted[1])}</div></div>`;
    }

    // Fallback có nghĩa: vật thể được suy ra từ từ khóa, không random theo ID.
    const icon = getFoundationEmojiSeed(q);
    const nums = text.match(/\b(?:10|[0-9])\b/g) || [];
    return `<div class="flex flex-col items-center justify-center gap-4">
        <div class="text-[120px] md:text-[155px] lg:text-[180px] leading-none">${icon}</div>
        ${nums.length ? `<div class="text-[58px] md:text-[76px] font-black text-indigo-700">${escapeHtml(nums.slice(0, 3).join('   '))}</div>` : ''}
    </div>`;
}

function getFoundationPrompt(q) {
    const text = String(q?.question_text || '');
    const lines = text.split(/\n/).map(x => x.trim()).filter(Boolean);
    const expressionRe = /(?:\d+|\?)\s*[+−-]\s*(?:\d+|\?)\s*=\s*(?:\d+|\?)/;
    const cleaned = [];
    for (const line of lines) {
        if (expressionRe.test(line)) continue;
        if (/^\s*[\p{Extended_Pictographic}∅\s❌]+\s*$/u.test(line)) continue;
        if (/^(ban đầu|bớt đi)\s*:/i.test(line)) continue;
        if (/nhìn nhóm hình\s*:/i.test(line)) {
            const after = line.replace(/^.*?:\s*/, '').replace(/\p{Extended_Pictographic}/gu, '').replace(/∅/g,'').trim();
            if (after) cleaned.push(after);
            continue;
        }
        if (/\p{Extended_Pictographic}/u.test(line)) {
            const noEmoji = line.replace(/\p{Extended_Pictographic}/gu, '').replace(/[|]+/g, ' ').replace(/\s+/g, ' ').trim();
            if (noEmoji && !/^(và|a:|b:)$/i.test(noEmoji)) cleaned.push(noEmoji);
            continue;
        }
        cleaned.push(line);
    }
    let prompt = [...new Set(cleaned)].join(' ').replace(/\s+/g,' ').trim();
    // Rút gọn vài câu nền tảng để bé tập trung vào hình.
    prompt = prompt
        .replace(/^gộp hai nhóm\.\s*/i, '')
        .replace(/^nhìn hình rồi\s*/i, '')
        .replace(/^bé hãy\s*/i, '')
        .replace(/^hãy\s*/i, '')
        .replace(/\s*[+−-]\s*$/u, '')
        .replace(/\s+/g, ' ')
        .trim();
    return prompt || 'Con chọn đáp án đúng nhé!';
}



let muc1UiState = null;
let topic3SortUiState_ = {};

function getMuc1QuestionKey_(q) {
    return `${q?.id ?? 'q'}::${q?.sub_topic || ''}::${q?.question_text || ''}`;
}

function extractEmojiTokens_(text) {
    return String(text || '').match(/\p{Extended_Pictographic}/gu) || [];
}

function getMuc1NumericAnswer_(q) {
    const raw = String(q?.answer ?? '').trim();
    if (!raw) return null;
    const n = Number(raw.replace(',', '.'));
    return Number.isFinite(n) ? n : null;
}

function getMuc1ReadablePrompt(q) {
    const lines = String(q?.question_text || '').split('\n').map(x => x.trim()).filter(Boolean);
    const sub = String(q?.sub_topic || '');
    if (sub === '1.1' || sub === '1.2') {
        const lastQuestionLine = [...lines].reverse().find(line => /\?$/.test(line)) || lines[lines.length - 1] || 'Con hãy đếm thật kĩ nhé!';
        return lastQuestionLine.replace(/^Số nào biểu diễn đúng số lượng này\??\s*/i, 'Có bao nhiêu hình? ');
    }
    if (sub === '1.3') return lines[lines.length - 1] || 'Con hãy so sánh hai nhóm nhé!';
    if (sub === '1.4') return lines[lines.length - 1] || lines[0] || 'Con hãy so sánh thật kĩ nhé!';
    if (sub === '1.5') return lines.find(line => /\?$/.test(line)) || lines[0] || 'Con hãy tìm phần còn lại nhé!';
    return getFoundationPrompt(q);
}

function initMuc1UiState_(q) {
    const key = getMuc1QuestionKey_(q);
    if (muc1UiState && muc1UiState.key === key) return muc1UiState;

    const sub = String(q?.sub_topic || '');
    const state = { key, sub, mode: sub, dragType: null };

    if (sub === '1.1' || sub === '1.2') {
        let target = getMuc1NumericAnswer_(q);
        if (!Number.isFinite(target)) {
            const emojiCount = extractEmojiTokens_(q?.question_text || '').length;
            target = emojiCount;
        }
        const frameSize = sub === '1.1' ? 5 : 10;
        state.frameSize = frameSize;
        state.target = Math.max(0, Math.min(frameSize, Number(target) || 0));
        state.placed = 0;
        state.emoji = getFoundationEmojiSeed(q);
    } else if (sub === '1.5') {
        const text = String(q?.question_text || '');
        const nums = [...text.matchAll(/\d+/g)].map(m => Number(m[0]));
        const whole = Number(nums[0] || getMuc1NumericAnswer_(q) || 0);
        const known = Number(nums[1] || 0);
        state.whole = Math.max(0, Math.min(10, whole));
        state.known = Math.max(0, Math.min(state.whole, known));
        state.missing = Math.max(0, state.whole - state.known);
        state.placed = 0;
        state.emoji = getFoundationEmojiSeed(q);
    }

    muc1UiState = state;
    return state;
}

function resetMuc1UiState_() {
    muc1UiState = null;
}

function buildMuc1TopNumberStrip_(count, showFilledOnly = true) {
    return Array.from({ length: count }, (_, i) => `
        <div class="w-11 md:w-12 text-center text-sm md:text-base font-black ${showFilledOnly ? 'text-slate-400' : 'text-violet-500'}">
            ${showFilledOnly ? '' : i + 1}
        </div>`).join('');
}

function getMuc1FrameCellTone_(index, frameSize) {
    if (frameSize !== 10) return 'bg-pink-50 border-pink-200';
    return index < 5 ? 'bg-amber-50 border-amber-200' : 'bg-sky-50 border-sky-200';
}

function buildMuc1CountingVisual_(q) {
    const state = initMuc1UiState_(q);
    const cellSizeClass = state.frameSize === 10 ? 'w-11 h-12 md:w-12 md:h-12 lg:w-[52px] lg:h-[54px]' : 'w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16';
    const emojiSizeClass = 'text-[24px] md:text-[26px] lg:text-[28px]';
    const slots = Array.from({ length: state.frameSize }, (_, i) => {
        const filled = i < state.placed;
        const tone = getMuc1FrameCellTone_(i, state.frameSize);
        return `
            <div class="flex flex-col items-center gap-1 shrink-0">
                <div class="h-8 md:h-9 text-lg md:text-xl lg:text-2xl font-black leading-none ${filled ? 'text-violet-700' : 'text-transparent'}">${i + 1}</div>
                <button type="button" onclick="muc1PlaceCountItem()" ondragover="event.preventDefault()" ondrop="muc1HandleDrop(event, 'count')" class="${cellSizeClass} rounded-xl border-2 ${tone} flex items-center justify-center shadow-inner">
                    ${filled ? `<span class="${emojiSizeClass} leading-none">${state.emoji}</span>` : '<span class="text-pink-200 text-lg font-black">+</span>'}
                </button>
            </div>`;
    }).join('');

    const remaining = Math.max(0, state.target - state.placed);
    const sourceItems = Array.from({ length: remaining }, (_, i) => `
        <button type="button" draggable="true" ondragstart="muc1HandleDragStart(event, 'count', ${i})" onclick="muc1PlaceCountItem()" class="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full bg-white border-2 border-violet-200 hover:border-violet-400 shadow-sm flex items-center justify-center text-[24px] md:text-[26px] lg:text-[28px] leading-none transition-transform hover:scale-105">${state.emoji}</button>
    `).join('');

    const doneHtml = state.placed >= state.target
        ? `<div class="text-center text-sm md:text-base font-black text-emerald-600 mt-2">Con đã đếm xong rồi. Bây giờ con chọn đáp án nhé!</div>`
        : `<div class="text-center text-base md:text-lg font-black text-violet-600 mt-2">Con kéo từng hình lên các ô từ trái sang phải nhé.</div>`;

    return `
        <div class="w-full flex flex-col items-center justify-center">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 border border-violet-200 text-violet-700 text-base md:text-lg font-black mb-3 shadow-sm">
                <span>🐰</span><span>Bước 1: Kéo từng hình lên hàng ô để đếm.</span>
            </div>
            <div class="grid grid-cols-5 md:grid-cols-10 gap-1 md:gap-1.5 justify-items-center w-full max-w-[760px] px-1 md:px-2 overflow-visible">${slots}</div>
            <div class="w-full max-w-[640px] h-px bg-pink-100 my-4"></div>
            <div class="flex flex-wrap items-center justify-center gap-3 md:gap-4 min-h-[70px] w-full px-2">${sourceItems || '<span class="text-base md:text-lg font-black text-slate-400">Không còn hình nào để kéo.</span>'}</div>
            <div class="mt-3 flex items-center gap-2">
                <button type="button" onclick="muc1ResetInteraction()" class="px-3 py-1.5 rounded-full border border-pink-200 bg-pink-50 text-pink-700 text-base md:text-lg font-black pastel-btn shadow-xs">Làm lại</button>
                <div class="px-3 py-1.5 rounded-full bg-white border border-slate-200 text-slate-600 text-base md:text-lg font-black shadow-xs">Đã kéo: ${state.placed} / ${state.target}</div>
            </div>
            ${doneHtml}
        </div>`;
}

function parseMuc1CompareFrameData_(q) {
    const text = String(q?.question_text || '');
    const lines = text.split('\n').map(x => x.trim()).filter(Boolean);
    const emojiLines = lines.filter(line => extractEmojiTokens_(line).length > 0);
    let topTokens = extractEmojiTokens_(emojiLines[0] || '');
    let bottomTokens = extractEmojiTokens_(emojiLines[1] || '');
    if (!topTokens.length || !bottomTokens.length) {
        const nums = [...text.matchAll(/\d+/g)].map(m => Number(m[0]));
        const a = Number(nums[0] || 0), b = Number(nums[1] || 0);
        topTokens = Array.from({ length: a }, () => '🍊');
        bottomTokens = Array.from({ length: b }, () => '🍎');
    }
    return {
        topEmoji: topTokens[0] || '🍊',
        bottomEmoji: bottomTokens[0] || '🍎',
        topCount: topTokens.length,
        bottomCount: bottomTokens.length
    };
}

function buildMuc1CompareWithFrameVisual_(q) {
    const data = parseMuc1CompareFrameData_(q);
    const numbers = Array.from({ length: 10 }, (_, i) => `<div class="w-11 md:w-12 lg:w-[52px] text-center text-lg md:text-xl lg:text-2xl font-black text-violet-700">${i + 1}</div>`).join('');
    const buildRow = (count, emoji, rowTone) => Array.from({ length: 10 }, (_, i) => {
        const filled = i < count;
        const tone = i < 5 ? rowTone[0] : rowTone[1];
        return `<div class="w-11 h-11 md:w-12 md:h-12 lg:w-[52px] lg:h-[52px] rounded-xl border-2 ${tone} flex items-center justify-center shadow-inner">${filled ? `<span class="text-[24px] md:text-[26px] lg:text-[28px] leading-none">${emoji}</span>` : ''}</div>`;
    }).join('');

    return `
        <div class="w-full flex flex-col items-center justify-center">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-base md:text-lg font-black mb-3 shadow-sm">
                <span>👀</span><span>Con nhìn xem hàng nào dài hơn nhé.</span>
            </div>
            <div class="grid grid-cols-5 md:grid-cols-10 gap-1 md:gap-1.5 justify-items-center w-full max-w-[760px] px-1 md:px-2 mb-1">${numbers}</div>
            <div class="grid grid-cols-5 md:grid-cols-10 gap-1 md:gap-1.5 justify-items-center w-full max-w-[760px] px-1 md:px-2 mb-3">${buildRow(data.topCount, data.topEmoji, ['bg-amber-50 border-amber-200','bg-orange-50 border-orange-200'])}</div>
            <div class="grid grid-cols-5 md:grid-cols-10 gap-1 md:gap-1.5 justify-items-center w-full max-w-[760px] px-1 md:px-2">${buildRow(data.bottomCount, data.bottomEmoji, ['bg-sky-50 border-sky-200','bg-violet-50 border-violet-200'])}</div>
            <div class="mt-3 text-center text-base md:text-lg font-black text-slate-700">Hàng nào dài hơn thì nhóm đó nhiều hơn.</div>
        </div>`;
}

function parseMuc1CompareNumbers_(q) {
    const text = String(q?.question_text || '');
    let m = text.match(/số\s+(\d+)\s+và\s+(\d+)/i);
    if (!m) m = text.match(/(\d+)\s*\?\s*(\d+)/);
    if (!m) {
        const nums = [...text.matchAll(/\d+/g)].map(x => Number(x[0]));
        if (nums.length >= 2) m = [null, nums[0], nums[1]];
    }
    const a = Number(m?.[1] || 0);
    const b = Number(m?.[2] || 0);
    return { a, b, topEmoji: '🍊', bottomEmoji: '🍎' };
}

function buildMuc1EmojiRowWithoutFrame_(count, emoji) {
    const n = Math.max(0, Math.min(10, Number(count) || 0));
    const sizeClass = 'text-[24px] md:text-[26px] lg:text-[28px]';
    // Giữ 10 vị trí cố định để số lượng ít hay nhiều đều có cùng kích thước emoji.
    return `<div class="grid grid-cols-5 md:grid-cols-10 items-center w-full max-w-[660px] px-1 md:px-2 ${sizeClass}">${Array.from({ length: 10 }, (_, i) => `
        <div class="min-w-0 h-[50px] md:h-[58px] flex items-center justify-center">${i < n ? `<span class="leading-none">${emoji}</span>` : ''}</div>
    `).join('')}</div>`;
}

function buildMuc1CompareWithoutFrameVisual_(q) {
    const data = parseMuc1CompareNumbers_(q);
    return `
        <div class="w-full flex flex-col items-center justify-center gap-4">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-700 text-base md:text-lg font-black shadow-sm">
                <span>🧠</span><span>Con tự đếm từng hàng rồi so sánh nhé.</span>
            </div>
            <div class="w-full max-w-[660px] rounded-2xl bg-white/85 border border-pink-100 px-4 md:px-6 py-4 shadow-sm">
                <div class="flex justify-center mb-3">${buildMuc1EmojiRowWithoutFrame_(data.a, data.topEmoji)}</div>
                <div class="w-3/4 mx-auto h-px bg-pink-100 mb-3"></div>
                <div class="flex justify-center">${buildMuc1EmojiRowWithoutFrame_(data.b, data.bottomEmoji)}</div>
            </div>
        </div>`;
}

function buildMuc1PartWholeVisual_(q) {
    const state = initMuc1UiState_(q);
    const selectedKnown = Math.min(state.placed, state.known);
    const done = selectedKnown >= state.known;

    // Bé bấm lần lượt các hình ở "Nhóm đã biết".
    // Mỗi lần bấm, một hình tương ứng ở hàng tổng được gạch chân từ trái sang phải.
    // Khi đã bấm đủ phần biết, phần KHÔNG gạch chân chính là phần còn lại.
    const wholeStrip = Array.from({ length: state.whole }, (_, i) => {
        const underlined = i < selectedKnown;
        const isRemaining = done && i >= state.known;
        const remainingClass = isRemaining
            ? 'bg-amber-100 ring-2 ring-amber-300 rounded-lg px-1 py-1'
            : '';
        return `
            <span class="inline-flex items-end text-[24px] md:text-[26px] lg:text-[28px] leading-none ${remainingClass} ${underlined ? 'border-b-[4px] md:border-b-[5px] border-rose-500 pb-1' : 'pb-[5px] md:pb-[6px]'}">
                ${state.emoji}
            </span>`;
    }).join('');

    const knownStrip = Array.from({ length: state.known }, (_, i) => {
        const used = i < selectedKnown;
        return `
            <button type="button" onclick="muc1PlacePartItem()" ${used ? 'disabled' : ''}
                class="w-11 h-11 md:w-12 md:h-12 rounded-full border-2 ${used ? 'border-emerald-100 bg-emerald-50 opacity-30' : 'border-emerald-200 bg-white hover:border-emerald-400 hover:scale-105'} flex items-center justify-center shadow-sm transition-all">
                <span class="text-[24px] md:text-[26px] lg:text-[28px] leading-none">${state.emoji}</span>
            </button>`;
    }).join('');

    const remainingStrip = done
        ? Array.from({ length: state.missing }, () => `
            <span class="w-11 h-11 md:w-12 md:h-12 rounded-full border-2 border-pink-200 bg-white flex items-center justify-center shadow-sm">
                <span class="text-[24px] md:text-[26px] lg:text-[28px] leading-none">${state.emoji}</span>
            </span>`).join('')
        : `<div class="text-3xl md:text-4xl font-black text-pink-300 leading-none">?</div>`;

    return `
        <div class="w-full flex flex-col items-center justify-center">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-base md:text-lg font-black mb-2 shadow-sm">
                <span>🐰</span><span>Con ấn lần lượt vào các hình ở phần đã biết nhé.</span>
            </div>

            <div class="rounded-2xl border border-amber-200 bg-amber-50/70 px-4 py-2.5 shadow-sm mb-2.5 w-full max-w-[640px]">
                <div class="text-center text-base md:text-lg font-black text-amber-700 mb-1.5">Nhóm ban đầu</div>
                <div class="flex flex-wrap items-center justify-center gap-1.5">${wholeStrip}</div>
                ${done ? `<div class="text-center text-sm md:text-base font-black text-pink-600 mt-1.5">Phần không gạch chân là nhóm còn lại.</div>` : ''}
            </div>

            <div class="grid grid-cols-2 gap-2.5 md:gap-4 w-full max-w-[640px]">
                <div class="rounded-2xl border border-emerald-200 bg-emerald-50/70 px-3 py-2.5 shadow-sm">
                    <div class="text-center text-base md:text-lg font-black text-emerald-700 mb-1">Nhóm đã biết</div>
                    <div class="text-center text-xs md:text-sm font-bold text-emerald-600 mb-2">Ấn vào từng hình</div>
                    <div class="flex flex-wrap items-center justify-center gap-1.5 min-h-[48px]">${knownStrip || '<span class="text-xs font-black text-slate-400">0 hình</span>'}</div>
                </div>

                <div class="rounded-2xl border border-pink-200 bg-pink-50/70 px-3 py-2.5 shadow-sm">
                    <div class="text-center text-base md:text-lg font-black text-pink-700 mb-1">Nhóm còn lại</div>
                    <div class="text-center text-xs md:text-sm font-bold ${done ? 'text-pink-600' : 'text-slate-400'} mb-2">${done ? 'Con đã tìm thấy' : 'Chưa lộ ra'}</div>
                    <div class="flex flex-wrap items-center justify-center gap-1.5 min-h-[48px]">${remainingStrip}</div>
                </div>
            </div>

            <div class="mt-2.5 flex items-center gap-2">
                <button type="button" onclick="muc1ResetInteraction()" class="px-3 py-1.5 rounded-full border border-pink-200 bg-pink-50 text-pink-700 text-base md:text-lg font-black pastel-btn shadow-xs">Làm lại</button>
                <div class="px-3 py-1.5 rounded-full bg-white border border-slate-200 text-slate-600 text-base md:text-lg font-black shadow-xs">Đã chọn: ${selectedKnown} / ${state.known}</div>
            </div>
        </div>`;
}

function parseMuc1PartWholeStaticData_(q) {
    const text = String(q?.question_text || '');
    const nums = [...text.matchAll(/\d+/g)].map(m => Number(m[0]));
    const whole = Math.max(0, Math.min(10, Number(nums[0] || 0)));
    const known = Math.max(0, Math.min(whole, Number(nums[1] || 0)));
    return {
        whole,
        known,
        missing: Math.max(0, whole - known),
        emoji: getFoundationEmojiSeed(q)
    };
}

function isMuc1PartWholeStaticQuestion_(q) {
    const text = String(q?.question_text || '').toLowerCase();
    const hasWhole = /có\s+\d+/.test(text);
    const hasKnownPart = /một nhóm có\s+\d+/.test(text) || /đã xếp\s+\d+/.test(text);
    const asksMissing = /nhóm còn lại/.test(text) && /(mấy|bao nhiêu)/.test(text);
    return hasWhole && hasKnownPart && asksMissing;
}

function buildMuc1StaticTenFrame_(count, emoji) {
    const n = Math.max(0, Math.min(10, Number(count) || 0));
    return `
        <div class="grid grid-cols-5 md:grid-cols-10 gap-1 md:gap-1.5 w-full max-w-[660px] px-1 md:px-2">
            ${Array.from({ length: 10 }, (_, i) => {
                const tone = i < 5
                    ? 'bg-pink-50 border-pink-200'
                    : 'bg-sky-50 border-sky-200';
                return `
                    <div class="w-11 h-11 md:w-12 md:h-12 lg:w-[52px] lg:h-[52px] rounded-xl border-2 ${tone} flex items-center justify-center shadow-inner">
                        ${i < n ? `<span class="text-[24px] md:text-[26px] lg:text-[28px] leading-none">${emoji}</span>` : ''}
                    </div>`;
            }).join('')}
        </div>`;
}

function buildMuc1StaticNumberBond_(whole, known) {
    // Nút tròn có đường kính đúng bằng ô của ten-frame bên trên.
    const nodeClass = 'w-11 h-11 md:w-12 md:h-12 lg:w-[52px] lg:h-[52px] rounded-full border-[3px] flex items-center justify-center text-xl md:text-2xl lg:text-[28px] font-black shadow-sm z-10';
    return `
        <div class="relative w-[260px] md:w-[300px] h-[145px] md:h-[160px]">
            <svg class="absolute inset-0 w-full h-full" viewBox="0 0 300 160" preserveAspectRatio="none" aria-hidden="true">
                <line x1="150" y1="36" x2="95" y2="112" stroke="#4f46e5" stroke-width="4" stroke-linecap="round"></line>
                <line x1="150" y1="36" x2="205" y2="112" stroke="#4f46e5" stroke-width="4" stroke-linecap="round"></line>
            </svg>
            <div class="absolute left-1/2 top-0 -translate-x-1/2 ${nodeClass} bg-violet-50 border-violet-600 text-violet-700">${whole}</div>
            <div class="absolute left-[44px] md:left-[55px] bottom-0 ${nodeClass} bg-pink-50 border-pink-500 text-violet-700">${known}</div>
            <div class="absolute right-[44px] md:right-[55px] bottom-0 ${nodeClass} bg-amber-50 border-amber-400 text-violet-700"></div>
        </div>`;
}

function buildMuc1PartWholeStaticVisual_(q) {
    const data = parseMuc1PartWholeStaticData_(q);
    return `
        <div class="w-full flex flex-col items-center justify-center gap-5 md:gap-6">
            ${buildMuc1StaticTenFrame_(data.whole, data.emoji)}
            ${buildMuc1StaticNumberBond_(data.whole, data.known)}
        </div>`;
}

function getMuc1EmojiLines_(q) {
    return String(q?.question_text || '')
        .split('\n')
        .map(x => x.trim())
        .filter(Boolean)
        .filter(line => extractEmojiTokens_(line).length > 0);
}

function buildMuc1UniformEmojiLinesVisual_(q) {
    const emojiLines = getMuc1EmojiLines_(q);
    if (!emojiLines.length) return buildFoundationSceneVisual(q);

    const rows = emojiLines.slice(0, 2).map((line, rowIndex) => {
        const tokens = extractEmojiTokens_(line).slice(0, 10);
        const rowLabel = rowIndex === 0 ? 'A' : 'B';
        return `
            <div class="grid grid-cols-[42px_1fr] md:grid-cols-[52px_1fr] items-center w-full max-w-[700px] px-1 md:px-2">
                <div class="text-2xl md:text-3xl font-black text-violet-700 text-center">${rowLabel}</div>
                <div class="flex flex-wrap items-center justify-center gap-1.5 md:gap-2 min-w-0">
                    ${tokens.map(token => `
                        <div class="w-9 h-9 md:w-11 md:h-11 lg:w-12 lg:h-12 flex items-center justify-center shrink-0">
                            <span class="text-[24px] md:text-[26px] lg:text-[28px] leading-none">${token}</span>
                        </div>`).join('')}
                </div>
            </div>`;
    }).join('<div class="w-3/4 h-px bg-pink-100"></div>');

    return `<div class="w-full flex flex-col items-center justify-center gap-3">${rows}</div>`;
}

function buildMuc1TipText_(q) {
    const sub = String(q?.sub_topic || '');
    const state = initMuc1UiState_(q);
    if (sub === '1.1' || sub === '1.2') {
        if (state.placed < state.target) return 'Cô Thỏ Hồng: Con đếm lần lượt từng hình một nhé. Mỗi hình ứng với một số đếm.';
        return 'Cô Thỏ Hồng: Số cuối cùng con đếm được chính là số lượng của cả nhóm đó.';
    }
    if (sub === '1.3') return 'Cô Thỏ Hồng: Con nhìn xem hàng nào dài hơn. Hàng dài hơn là nhóm nhiều hơn.';
    if (sub === '1.4') return 'Cô Thỏ Hồng: Con tự đếm từng hàng rồi so sánh nhé. Không cần khung ô nữa đâu!';
    if (sub === '1.5') {
        if (state.placed < state.known) return 'Cô Thỏ Hồng: Con ấn lần lượt vào từng hình ở phần đã biết nhé!';
        return 'Cô Thỏ Hồng: Giỏi lắm! Một số có thể tách thành hai phần nhỏ hơn.';
    }
    if (sub === '1.6' && isMuc1PartWholeStaticQuestion_(q)) {
        const data = parseMuc1PartWholeStaticData_(q);
        return `Cô Thỏ Hồng: Cả nhóm có ${data.whole}. Một phần là ${data.known}. Con tìm phần còn lại nhé!`;
    }
    return 'Cô Thỏ Hồng: Con suy nghĩ thật kĩ rồi chọn đáp án đúng nhé!';
}

function buildMuc1VisualOnly_(q) {
    const sub = String(q?.sub_topic || '');
    if (sub === '1.1' || sub === '1.2') return buildMuc1CountingVisual_(q);
    if (sub === '1.3') return buildMuc1CompareWithFrameVisual_(q);
    if (sub === '1.4') return buildMuc1CompareWithoutFrameVisual_(q);
    if (sub === '1.5') return buildMuc1PartWholeVisual_(q);
    if (sub === '1.6') {
        if (isMuc1PartWholeStaticQuestion_(q)) return buildMuc1PartWholeStaticVisual_(q);
        if (getMuc1EmojiLines_(q).length) return buildMuc1UniformEmojiLinesVisual_(q);
    }
    return buildFoundationSceneVisual(q);
}

function refreshMuc1InteractiveZone_() {
    const q = activeQuestionsList?.[currentQIndex];
    if (!q) return;
    const host = document.getElementById('muc1-visual-host');
    if (host) host.innerHTML = buildMuc1VisualOnly_(q);
    const tipHost = document.getElementById('muc1-tip-host');
    if (tipHost) tipHost.innerHTML = `<div class="mt-2 bg-amber-50 border border-amber-200 rounded-2xl px-3 py-2 text-base md:text-lg font-black text-amber-800 text-center shadow-xs">${escapeHtml(buildMuc1TipText_(q))}</div>`;
}

function muc1HandleDragStart(event, type, index) {
    if (!event?.dataTransfer) return;
    event.dataTransfer.setData('text/plain', `${type}:${index}`);
    event.dataTransfer.effectAllowed = 'move';
}

function muc1HandleDrop(event, type) {
    event.preventDefault();
    if (type === 'count') muc1PlaceCountItem();
    if (type === 'part') muc1PlacePartItem();
}

function muc1PlaceCountItem() {
    const q = activeQuestionsList?.[currentQIndex];
    if (!q) return;
    const state = initMuc1UiState_(q);
    if (state.placed >= state.target) return;
    state.placed += 1;
    refreshMuc1InteractiveZone_();
    try { speakVietnamese(String(state.placed), 0.94); } catch (e) {}
}

function muc1PlacePartItem() {
    const q = activeQuestionsList?.[currentQIndex];
    if (!q) return;
    const state = initMuc1UiState_(q);
    if (state.placed >= state.known) return;
    state.placed += 1;
    refreshMuc1InteractiveZone_();
}

function muc1ResetInteraction() {
    const q = activeQuestionsList?.[currentQIndex];
    if (!q) return;
    const state = initMuc1UiState_(q);
    state.placed = 0;
    refreshMuc1InteractiveZone_();
}

function formatMuc1PromptHtml_(q, prompt) {
    const safe = escapeHtml(prompt);
    if (String(q?.sub_topic || '') !== '1.4') return safe;
    // Ở Mục 1.4, làm nổi bật chính hai số cần so sánh để trẻ 4-6 tuổi
    // tập trung vào lượng/số thay vì bị lẫn với dấu hỏi hoặc câu dẫn.
    return safe.replace(/\d+/g, m => `<span class="text-rose-600 font-black">${m}</span>`);
}

let muc1OptionRotationOffset_ = null;
const MUC1_OPTION_ORDER_VERSION_ = 2;

function getMuc1ShuffledOptions_(q) {
    const source = Array.isArray(q?.options) ? q.options.slice() : [];
    const sub = String(q?.sub_topic || '');

    if (Array.isArray(q?._muc1ShuffledOptions)
        && q._muc1ShuffledOptions.length === source.length
        && q._muc1OptionOrderVersion === MUC1_OPTION_ORDER_VERSION_) {
        return q._muc1ShuffledOptions;
    }

    let shuffled = [];

    // 1.3 và 1.4 thường dùng cùng một bộ 4 nhãn (nhiều hơn / ít hơn / bằng nhau / chưa biết).
    // Random độc lập có thể vô tình để một nhãn nằm cùng vị trí nhiều câu liên tiếp.
    // Vì vậy ta dùng vòng quay cân bằng: mỗi câu dịch toàn bộ lựa chọn sang một vị trí,
    // bảo đảm từng nhãn lần lượt xuất hiện ở A/B/C/D trong mỗi 4 câu.
    if ((sub === '1.3' || sub === '1.4') && source.length === 4) {
        if (!Number.isInteger(muc1OptionRotationOffset_)) {
            muc1OptionRotationOffset_ = Math.floor(Math.random() * 4);
        }
        const shift = (Number(currentQIndex || 0) + muc1OptionRotationOffset_) % 4;
        shuffled = source.map((_, index) => source[(index + shift) % 4]);
    } else {
        shuffled = shuffleArray(source);
        // Tránh trường hợp random đúng nguyên thứ tự nguồn ở các mục còn lại.
        if (source.length > 1 && shuffled.every((value, index) => String(value) === String(source[index]))) {
            shuffled = shuffled.slice(1).concat(shuffled[0]);
        }
    }

    q._muc1ShuffledOptions = shuffled;
    q._muc1OptionOrderVersion = MUC1_OPTION_ORDER_VERSION_;
    return shuffled;
}

function buildMuc1QuestionLayout(q, speakerHtml) {
    initMuc1UiState_(q);
    const prompt = getMuc1ReadablePrompt(q);
    const optionSizeClass = 'min-h-[50px] md:min-h-[56px] py-1.5';
    const optionTextClass = 'text-lg md:text-xl lg:text-[22px]';
    const optionList = getMuc1ShuffledOptions_(q);

    let optionsHtml = '';
    optionList.forEach((opt, idx) => {
        const formattedOpt = capitalizeFirstLetter(opt);
        const letter = String.fromCharCode(65 + idx);
        optionsHtml += `
            <button data-opt="${escapeHtml(opt)}" onclick="checkAnswer('${opt.replace(/'/g, "\\'")}')" class="option-btn w-full ${optionSizeClass} px-3 bg-pink-50/40 hover:bg-pink-100/70 border-2 border-pink-200 rounded-2xl font-extrabold text-gray-800 transition-all flex items-center justify-center text-center shadow-xs pastel-btn">
                <span class="flex items-center justify-center gap-2 leading-tight"><strong class="text-pink-600 text-lg md:text-xl">${letter}.</strong><span class="opt-text ${optionTextClass}">${escapeHtml(formattedOpt)}</span></span>
                <span class="option-icon text-pink-500 text-lg md:text-xl ml-1"></span>
            </button>`;
    });

    return `
        <div class="w-full max-w-none grid grid-cols-1 md:grid-cols-[1.38fr_0.62fr] gap-3 md:gap-4 items-stretch py-1">
            <div class="min-h-[250px] md:min-h-[300px] rounded-[28px] border-2 border-pink-100 bg-gradient-to-br from-amber-50 via-white to-sky-50 px-3 py-4 md:px-5 md:py-6 flex flex-col items-center justify-center overflow-hidden shadow-sm">
                <div id="muc1-visual-host" class="w-full flex items-center justify-center">${buildMuc1VisualOnly_(q)}</div>
            </div>
            <div class="rounded-[28px] border border-pink-100 bg-white/95 px-3 py-4 md:px-4 md:py-5 flex flex-col justify-center shadow-sm">
                <h3 class="text-lg md:text-xl lg:text-[22px] font-black text-slate-900 leading-snug text-center mb-1">${escapeHtml(prompt)}</h3>
                ${speakerHtml}
                <div id="muc1-tip-host">${`<div class="mt-2 bg-amber-50 border border-amber-200 rounded-2xl px-3 py-2 text-base md:text-lg font-black text-amber-800 text-center shadow-xs">${escapeHtml(buildMuc1TipText_(q))}</div>`}</div>
                <div class="w-full grid grid-cols-2 gap-2.5 md:gap-3 mt-3">${optionsHtml}</div>
                ${activeRoadmapContext ? `<div id="roadmap-solution-host">${roadmapSolutionHtml_(q)}</div>` : ''}
            </div>
        </div>`;
}


// ==========================================
// MỤC 2 - PHÉP CỘNG VÀ PHÉP TRỪ
// Mô hình sư phạm: thao tác -> nhìn thấy -> ký hiệu -> giảm hỗ trợ -> thực hành độc lập
// ==========================================
let muc2UiState = null;

function getMuc2QuestionKey_(q) {
    return `${q?.question_id ?? q?.id ?? 'q'}::${q?._muc2_stage || q?.sub_topic || ''}::${q?.question_text || ''}`;
}

function getMuc2Stage_(q) {
    return String(q?._muc2_stage || q?.sub_topic || '2.6');
}

function getMuc2Equation_(q) {
    const text = String(q?.question_text || '');
    const m = text.match(/(10|[0-9]|\?)\s*([+−-])\s*(10|[0-9]|\?)\s*=\s*(10|[0-9]|\?)/);
    if (!m) return null;
    return {
        left: m[1] === '?' ? null : Number(m[1]),
        op: m[2] === '−' ? '-' : m[2],
        right: m[3] === '?' ? null : Number(m[3]),
        result: m[4] === '?' ? null : Number(m[4]),
        raw: m[0]
    };
}

function getMuc2Emoji_(q) {
    const tokens = extractEmojiTokens_(String(q?.question_text || '')).filter(x => x !== '❌');
    return tokens[0] || getFoundationEmojiSeed(q) || '●';
}

function parseMuc2Addition_(q) {
    const text = String(q?.question_text || '');
    const eq = getMuc2Equation_(q);
    if (eq && eq.op === '+' && Number.isFinite(eq.left) && Number.isFinite(eq.right)) {
        return { a: eq.left, b: eq.right, emoji: getMuc2Emoji_(q), equation: eq.raw };
    }

    const lines = text.split('\n').map(x => x.trim()).filter(Boolean);
    const visualLine = lines.find(line => extractEmojiTokens_(line).length > 0) || '';
    let parts = visualLine.split(/\s+và\s+|\s*\+\s*/i);
    if (parts.length < 2) parts = text.split(/\s+và\s+|\s*\+\s*/i);
    const a = Math.min(10, extractEmojiTokens_(parts[0] || '').filter(x => x !== '❌').length);
    const b = Math.min(10 - a, extractEmojiTokens_(parts[1] || '').filter(x => x !== '❌').length);
    return { a, b, emoji: getMuc2Emoji_(q), equation: `${a} + ${b} = ?` };
}

function parseMuc2Subtraction_(q) {
    const text = String(q?.question_text || '');
    const eq = getMuc2Equation_(q);
    if (eq && eq.op === '-' && Number.isFinite(eq.left) && Number.isFinite(eq.right)) {
        return { whole: eq.left, take: eq.right, emoji: getMuc2Emoji_(q), equation: eq.raw };
    }

    const lines = text.split('\n').map(x => x.trim()).filter(Boolean);
    const startLine = lines.find(line => /^ban đầu\s*:/i.test(line));
    const takeLine = lines.find(line => /^bớt đi\s*:/i.test(line));
    let whole = startLine ? extractEmojiTokens_(startLine).filter(x => x !== '❌').length : 0;
    let take = takeLine ? extractEmojiTokens_(takeLine).filter(x => x !== '❌').length : 0;
    if (!take) {
        const m = text.match(/bớt đi\s+(10|[0-9])/i);
        if (m) take = Number(m[1]);
    }
    return {
        whole: Math.max(0, Math.min(10, whole)),
        take: Math.max(0, Math.min(whole, take)),
        emoji: getMuc2Emoji_(q),
        equation: `${whole} − ${take} = ?`
    };
}

function initMuc2UiState_(q) {
    const key = getMuc2QuestionKey_(q);
    if (muc2UiState && muc2UiState.key === key) return muc2UiState;

    const stage = getMuc2Stage_(q);
    const eq = getMuc2Equation_(q);
    const state = { key, stage, moved: new Set(), removed: 0 };
    if ((stage === '2.1' || stage === '2.2') || eq?.op === '+') {
        Object.assign(state, parseMuc2Addition_(q));
        state.mode = 'add';
    } else {
        Object.assign(state, parseMuc2Subtraction_(q));
        state.mode = 'sub';
    }
    muc2UiState = state;
    return state;
}

function resetMuc2UiState_() {
    muc2UiState = null;
}

function buildMuc2TenFrameRow_(filled, emoji, numbered = false) {
    return `
        <div class="grid grid-cols-5 md:grid-cols-10 gap-1 md:gap-1.5 w-full max-w-[720px]">
            ${Array.from({ length: 10 }, (_, i) => {
                const active = i < filled;
                const tone = i < 5 ? 'bg-pink-50 border-pink-200' : 'bg-sky-50 border-sky-200';
                return `
                    <div class="flex flex-col items-center gap-1 min-w-0">
                        <div class="h-6 md:h-7 text-sm md:text-base font-black ${active && numbered ? 'text-violet-700' : 'text-transparent'}">${i + 1}</div>
                        <div class="w-10 h-10 md:w-12 md:h-12 lg:w-[54px] lg:h-[54px] rounded-xl border-2 ${tone} flex items-center justify-center shadow-inner">
                            ${active ? `<span class="text-[24px] md:text-[27px] lg:text-[30px] leading-none">${emoji}</span>` : '<span class="text-pink-200 text-lg font-black">+</span>'}
                        </div>
                    </div>`;
            }).join('')}
        </div>`;
}

function buildMuc2AddSourceRow_(count, emoji, group, state, label) {
    return `
        <div class="w-full max-w-[620px]">
            <div class="text-center text-sm md:text-base font-black text-slate-500 mb-1">${label}</div>
            <div class="flex flex-wrap justify-center gap-2 md:gap-2.5 min-h-[52px]">
                ${Array.from({ length: count }, (_, i) => {
                    const key = `${group}:${i}`;
                    const moved = state.moved.has(key);
                    return `
                        <button type="button" onclick="muc2MoveAddItem_('${group}', ${i})" ${moved ? 'disabled' : ''}
                            class="w-11 h-11 md:w-12 md:h-12 rounded-full border-2 ${moved ? 'border-slate-100 bg-slate-50 opacity-25' : 'border-violet-200 bg-white hover:border-violet-400 hover:scale-105'} flex items-center justify-center shadow-sm transition-all">
                            <span class="text-[24px] md:text-[27px] lg:text-[30px] leading-none">${emoji}</span>
                        </button>`;
                }).join('')}
            </div>
        </div>`;
}

function buildMuc2AdditionInteractive_(q) {
    const s = initMuc2UiState_(q);
    const placed = s.moved.size;
    const done = placed >= s.a + s.b;
    return `
        <div class="w-full flex flex-col items-center justify-center gap-3">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 border border-violet-200 text-violet-700 text-sm md:text-base font-black shadow-sm">
                <span>🐰</span><span>Con đưa từng hình lên hàng trên để gộp hai nhóm nhé.</span>
            </div>
            ${buildMuc2TenFrameRow_(placed, s.emoji, true)}
            <div class="w-4/5 h-px bg-pink-100 my-1"></div>
            ${buildMuc2AddSourceRow_(s.a, s.emoji, 'a', s, `Nhóm 1: <span class="inline-block ml-1 text-2xl md:text-3xl font-black text-red-500 leading-none align-middle">${s.a}</span>`)}
            ${buildMuc2AddSourceRow_(s.b, s.emoji, 'b', s, `Nhóm 2: <span class="inline-block ml-1 text-2xl md:text-3xl font-black text-red-500 leading-none align-middle">${s.b}</span>`)}
            <div class="flex items-center gap-2 mt-1">
                <button type="button" onclick="muc2ResetInteraction_()" class="px-3 py-1.5 rounded-full border border-pink-200 bg-pink-50 text-pink-700 text-sm md:text-base font-black">Làm lại</button>
                <div class="px-3 py-1.5 rounded-full bg-white border border-slate-200 text-slate-600 text-sm md:text-base font-black">Đã gộp: ${placed} / ${s.a + s.b}</div>
            </div>
            ${done && s.stage === '2.1' ? `<div class="text-lg md:text-xl font-black text-emerald-600">${s.a} + ${s.b} = ${s.a + s.b}</div>` : ''}
        </div>`;
}

function buildMuc2SubtractionInteractive_(q) {
    const s = initMuc2UiState_(q);
    const remaining = Math.max(0, s.whole - s.removed);
    return `
        <div class="w-full flex flex-col items-center justify-center gap-4">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-sm md:text-base font-black shadow-sm">
                <span>🐰</span><span>Con bấm từng hình ở hàng dưới để bớt đi nhé.</span>
            </div>
            <div class="w-full max-w-[680px]">
                <div class="text-center text-sm md:text-base font-black text-slate-500 mb-2">Ban đầu có <span class="inline-block ml-1 text-2xl md:text-3xl font-black text-red-500 leading-none align-middle">${s.whole}</span></div>
                <div class="flex flex-wrap justify-center gap-2 md:gap-2.5">
                    ${Array.from({ length: s.whole }, (_, i) => {
                        const crossed = i >= s.whole - s.removed;
                        return `
                            <div class="relative w-11 h-11 md:w-12 md:h-12 rounded-full border-2 ${crossed ? 'border-slate-200 bg-slate-50 opacity-45' : 'border-violet-200 bg-white'} flex items-center justify-center shadow-sm">
                                <span class="text-[24px] md:text-[27px] lg:text-[30px] leading-none">${s.emoji}</span>
                                ${crossed ? '<span class="absolute inset-0 flex items-center justify-center text-rose-500 text-4xl md:text-5xl font-black leading-none">╱</span>' : ''}
                            </div>`;
                    }).join('')}
                </div>
            </div>
            <div class="w-3/4 h-px bg-pink-100"></div>
            <div class="w-full max-w-[620px]">
                <div class="text-center text-sm md:text-base font-black text-slate-500 mb-2">Bớt đi <span class="inline-block ml-1 text-2xl md:text-3xl font-black text-red-500 leading-none align-middle">${s.take}</span></div>
                <div class="flex flex-wrap justify-center gap-2 md:gap-2.5">
                    ${Array.from({ length: s.take }, (_, i) => {
                        const used = i < s.removed;
                        return `
                            <button type="button" onclick="muc2RemoveSubItem_(${i})" ${used ? 'disabled' : ''}
                                class="w-11 h-11 md:w-12 md:h-12 rounded-full border-2 ${used ? 'border-slate-100 bg-slate-50 opacity-25' : 'border-rose-200 bg-white hover:border-rose-400 hover:scale-105'} flex items-center justify-center shadow-sm transition-all">
                                <span class="text-[24px] md:text-[27px] lg:text-[30px] leading-none">${s.emoji}</span>
                            </button>`;
                    }).join('')}
                </div>
            </div>
            <div class="flex items-center gap-2">
                <button type="button" onclick="muc2ResetInteraction_()" class="px-3 py-1.5 rounded-full border border-pink-200 bg-pink-50 text-pink-700 text-sm md:text-base font-black">Làm lại</button>
                <div class="px-3 py-1.5 rounded-full bg-white border border-slate-200 text-slate-600 text-sm md:text-base font-black">Đã bớt: ${s.removed} / ${s.take}</div>
            </div>
            ${s.removed >= s.take && s.stage === '2.3' ? `<div class="text-lg md:text-xl font-black text-emerald-600">Còn lại ${remaining}: &nbsp; ${s.whole} − ${s.take} = ${remaining}</div>` : ''}
        </div>`;
}

function buildMuc2StaticEmojiRow_(count, emoji, label, tone = 'violet') {
    const toneClass = tone === 'rose' ? 'border-rose-200 bg-rose-50/40' : 'border-violet-200 bg-violet-50/40';
    return `
        <div class="w-full max-w-[650px] rounded-2xl border ${toneClass} px-3 py-3">
            <div class="text-center text-sm md:text-base font-black text-slate-500 mb-2">${label}</div>
            <div class="flex flex-wrap justify-center gap-2 md:gap-2.5">
                ${Array.from({ length: Math.max(0, count) }, () => `
                    <div class="w-10 h-10 md:w-11 md:h-11 flex items-center justify-center">
                        <span class="text-[24px] md:text-[27px] lg:text-[30px] leading-none">${emoji}</span>
                    </div>`).join('')}
            </div>
        </div>`;
}

function buildMuc2NumberBond_(topValue, leftValue, rightValue) {
    const nodeClass = 'w-11 h-11 md:w-12 md:h-12 lg:w-[52px] lg:h-[52px] rounded-full border-[3px] flex items-center justify-center text-xl md:text-2xl lg:text-[30px] font-black shadow-sm';
    const renderValue = (v) => (v == null ? '' : v);
    return `
        <div class="relative w-[260px] md:w-[300px] h-[160px] md:h-[175px]">
            <svg class="absolute inset-0 w-full h-full" viewBox="0 0 300 175" preserveAspectRatio="none" aria-hidden="true">
                <line x1="150" y1="36" x2="98" y2="110" stroke="#4f46e5" stroke-width="4" stroke-linecap="round"></line>
                <line x1="150" y1="36" x2="202" y2="110" stroke="#4f46e5" stroke-width="4" stroke-linecap="round"></line>
            </svg>
            <div class="absolute left-1/2 top-0 -translate-x-1/2 ${nodeClass} bg-violet-50 border-violet-600 text-violet-700">${renderValue(topValue)}</div>
            <div class="absolute left-[45px] md:left-[52px] top-[88px] md:top-[98px] ${nodeClass} bg-pink-50 border-pink-500 text-violet-700">${renderValue(leftValue)}</div>
            <div class="absolute right-[45px] md:right-[52px] top-[88px] md:top-[98px] ${nodeClass} bg-amber-50 border-amber-400 text-violet-700">${renderValue(rightValue)}</div>
        </div>`;
}

function deriveMuc2ReducedSupportModel_(q) {
    const eq = getMuc2Equation_(q);
    if (!eq) return null;
    const emoji = getMuc2Emoji_(q);

    if (eq.op === '+') {
        const a = Number.isFinite(eq.left) ? eq.left : null;
        const b = Number.isFinite(eq.right) ? eq.right : null;
        const c = Number.isFinite(eq.result) ? eq.result : null;
        const whole = c != null ? c : ((a != null && b != null) ? a + b : null);
        if (whole == null) return null;
        let topValue = c != null ? c : null;
        let leftValue = a;
        let rightValue = b;
        return { op: '+', whole: Math.max(0, Math.min(10, whole)), topValue, leftValue, rightValue, emoji };
    }

    if (eq.op === '-') {
        const whole = Number.isFinite(eq.left) ? eq.left : ((Number.isFinite(eq.right) && Number.isFinite(eq.result)) ? eq.right + eq.result : null);
        if (whole == null) return null;
        const topValue = Number.isFinite(eq.left) ? eq.left : null;
        const leftValue = Number.isFinite(eq.result) ? eq.result : null;
        const rightValue = Number.isFinite(eq.right) ? eq.right : null;
        return { op: '-', whole: Math.max(0, Math.min(10, whole)), topValue, leftValue, rightValue, emoji };
    }

    return null;
}

function buildMuc2ReducedSupport_(q) {
    const model = deriveMuc2ReducedSupportModel_(q);
    if (model) {
        return `
            <div class="w-full flex flex-col items-center gap-4">
                <div class="inline-flex px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-sm md:text-base font-black">Con nhìn hình rồi tự tính nhé.</div>
                ${buildMuc1StaticTenFrame_(model.whole, model.emoji)}
                ${buildMuc2NumberBond_(model.topValue, model.leftValue, model.rightValue)}
            </div>`;
    }

    const eq = getMuc2Equation_(q);
    if (eq?.op === '-') {
        const s = parseMuc2Subtraction_(q);
        return `
            <div class="w-full flex flex-col items-center gap-4">
                <div class="inline-flex px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-sm md:text-base font-black">Nhìn hình và tự nghĩ cách tính nhé.</div>
                ${buildMuc2StaticEmojiRow_(s.whole, s.emoji, `Số bị trừ: ${s.whole}`, 'violet')}
                ${buildMuc2StaticEmojiRow_(s.take, s.emoji, `Số trừ: ${s.take}`, 'rose')}
            </div>`;
    }

    const s = parseMuc2Addition_(q);
    return `
        <div class="w-full flex flex-col items-center gap-4">
            <div class="inline-flex px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-sm md:text-base font-black">Nhìn hình và tự gộp trong đầu nhé.</div>
            ${buildMuc2StaticEmojiRow_(s.a, s.emoji, `Số hạng thứ nhất: ${s.a}`, 'violet')}
            ${buildMuc2StaticEmojiRow_(s.b, s.emoji, `Số hạng thứ hai: ${s.b}`, 'rose')}
        </div>`;
}

function getMuc2Prompt_(q) {
    const text = String(q?.question_text || '');
    const eq = getMuc2Equation_(q);
    const stage = getMuc2Stage_(q);
    if (stage === '2.6') return text;
    const lines = text.split('\n').map(x => x.trim()).filter(Boolean);
    const verbal = lines.find(line => !extractEmojiTokens_(line).length && !/(10|[0-9]|\?)\s*[+−-]/.test(line));
    if (stage === '2.1') return verbal || 'Gộp hai nhóm. Có tất cả bao nhiêu?';
    if (stage === '2.2') return eq?.raw || verbal || 'Con tính phép cộng nhé.';
    if (stage === '2.3') return verbal || 'Bớt đi rồi xem còn lại bao nhiêu.';
    if (stage === '2.4') return eq?.raw || verbal || 'Con tính phép trừ nhé.';
    if (stage === '2.5') return eq?.raw || verbal || 'Con tìm số còn thiếu nhé.';
    return verbal || text;
}

function buildMuc2Tip_(q) {
    const stage = getMuc2Stage_(q);
    if (stage === '2.1') return 'Cô Thỏ Hồng: Cộng là gộp hai nhóm lại thành một nhóm lớn hơn.';
    if (stage === '2.2') return 'Cô Thỏ Hồng: Con có thể dùng hàng ô để kiểm tra kết quả phép cộng.';
    if (stage === '2.3') return 'Cô Thỏ Hồng: Trừ là bớt đi. Những hình không bị gạch chính là phần còn lại.';
    if (stage === '2.4') return 'Cô Thỏ Hồng: Con nhìn phần còn lại rồi liên hệ với phép trừ.';
    if (stage === '2.5') return 'Cô Thỏ Hồng: Con nhìn sơ đồ số và hình rồi tìm số còn thiếu nhé!';
    return '';
}

function buildMuc2Options_(q, compact = true) {
    return (q.options || []).map((opt, idx) => {
        const letter = String.fromCharCode(65 + idx);
        const formattedOpt = capitalizeFirstLetter(opt);
        return `
            <button data-opt="${escapeHtml(opt)}" onclick="checkAnswer('${String(opt).replace(/'/g, "\\'")}')"
                class="option-btn w-full ${compact ? 'min-h-[52px] md:min-h-[58px]' : 'min-h-[64px] md:min-h-[72px]'} px-3 bg-pink-50/40 hover:bg-pink-100/70 border-2 border-pink-200 rounded-2xl font-extrabold text-gray-800 transition-all flex items-center justify-center text-center shadow-xs pastel-btn">
                <span class="flex items-center justify-center gap-2 leading-tight"><strong class="text-pink-600 text-lg md:text-xl">${letter}.</strong><span class="opt-text text-lg md:text-xl lg:text-[22px]">${escapeHtml(formattedOpt)}</span></span>
                <span class="option-icon text-pink-500 text-lg md:text-xl ml-1"></span>
            </button>`;
    }).join('');
}

function buildMuc2ExamLikeLayout_(q, speakerHtml) {
    const text = String(q?.question_text || '');
    const lines = text.split('\n').map(x => x.trim()).filter(Boolean);
    const visualLines = lines.filter(line => extractEmojiTokens_(line).length > 0);
    const textLines = lines.filter(line => !extractEmojiTokens_(line).length);
    const visual = visualLines.length
        ? `<div class="w-full max-w-3xl rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-4 text-center text-[26px] md:text-[30px] leading-relaxed">${visualLines.map(escapeHtml).join('<br>')}</div>`
        : '';
    return `
        <div class="w-full max-w-4xl mx-auto flex flex-col items-center gap-3 py-2">
            ${visual}
            <h3 class="text-lg md:text-xl lg:text-2xl font-black text-slate-900 text-center leading-snug">${escapeHtml(textLines.join(' ') || text)}</h3>
            ${speakerHtml}
            <div class="w-full grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">${buildMuc2Options_(q, false)}</div>
        </div>`;
}

function buildMuc2QuestionLayout_(q, speakerHtml) {
    const stage = getMuc2Stage_(q);
    if (stage === '2.6') return buildMuc2ExamLikeLayout_(q, speakerHtml);

    let visual = '';
    if (stage === '2.1' || stage === '2.2') visual = buildMuc2AdditionInteractive_(q);
    else if (stage === '2.3' || stage === '2.4') visual = buildMuc2SubtractionInteractive_(q);
    else visual = buildMuc2ReducedSupport_(q);

    const prompt = getMuc2Prompt_(q);
    const tip = buildMuc2Tip_(q);
    return `
        <div class="w-full max-w-none grid grid-cols-1 md:grid-cols-[1.4fr_0.6fr] gap-3 md:gap-4 items-stretch py-1">
            <div class="min-h-[300px] md:min-h-[360px] rounded-[28px] border-2 border-pink-100 bg-gradient-to-br from-amber-50 via-white to-sky-50 px-3 py-4 md:px-5 md:py-5 flex flex-col items-center justify-center overflow-hidden shadow-sm">
                <div id="muc2-visual-host" class="w-full flex items-center justify-center">${visual}</div>
            </div>
            <div class="rounded-[28px] border border-pink-100 bg-white/95 px-3 py-4 md:px-4 md:py-5 flex flex-col justify-center shadow-sm">
                <h3 class="text-lg md:text-xl lg:text-[22px] font-black text-slate-900 leading-snug text-center mb-1">${escapeHtml(prompt)}</h3>
                ${speakerHtml}
                ${tip ? `<div id="muc2-tip-host" class="mt-2 bg-amber-50 border border-amber-200 rounded-2xl px-3 py-2 text-sm md:text-base font-black text-amber-800 text-center shadow-xs">${escapeHtml(tip)}</div>` : ''}
                <div class="w-full grid grid-cols-2 gap-2.5 md:gap-3 mt-3">${buildMuc2Options_(q, true)}</div>
                ${activeRoadmapContext ? `<div id="roadmap-solution-host">${roadmapSolutionHtml_(q)}</div>` : ''}
            </div>
        </div>`;
}

function refreshMuc2InteractiveZone_() {
    const q = activeQuestionsList?.[currentQIndex];
    if (!q) return;
    const stage = getMuc2Stage_(q);
    const host = document.getElementById('muc2-visual-host');
    if (!host) return;
    if (stage === '2.1' || stage === '2.2') host.innerHTML = buildMuc2AdditionInteractive_(q);
    else if (stage === '2.3' || stage === '2.4') host.innerHTML = buildMuc2SubtractionInteractive_(q);
    else if (stage === '2.5') host.innerHTML = buildMuc2ReducedSupport_(q);
}

function muc2MoveAddItem_(group, index) {
    const q = activeQuestionsList?.[currentQIndex];
    if (!q) return;
    const s = initMuc2UiState_(q);
    const key = `${group}:${index}`;
    if (s.moved.has(key)) return;
    s.moved.add(key);
    refreshMuc2InteractiveZone_();
    try { speakVietnamese(String(s.moved.size), 0.94); } catch (e) {}
}

function muc2RemoveSubItem_(index) {
    const q = activeQuestionsList?.[currentQIndex];
    if (!q) return;
    const s = initMuc2UiState_(q);
    if (index !== s.removed || s.removed >= s.take) return;
    s.removed += 1;
    refreshMuc2InteractiveZone_();
    try { speakVietnamese(`Bớt ${s.removed}`, 0.94); } catch (e) {}
}

function muc2ResetInteraction_() {
    const q = activeQuestionsList?.[currentQIndex];
    if (!q) return;
    const s = initMuc2UiState_(q);
    s.moved = new Set();
    s.removed = 0;
    refreshMuc2InteractiveZone_();
}

function buildFoundationQuestionLayout(q, speakerHtml) {
    const text = String(q?.question_text || '');
    const expressionMatch = text.match(/(?:\d+|\?)\s*[+−-]\s*(?:\d+|\?)\s*=\s*(?:\d+|\?)/);
    const visual = expressionMatch ? buildFoundationEquationVisual(q, expressionMatch[0]) : buildFoundationSceneVisual(q);
    const prompt = getFoundationPrompt(q);
    // Mục 1 chủ yếu là nhận biết/đếm số 0-10: thu gọn để hình, câu hỏi và đáp án
    // cùng nằm cân đối trên màn hình laptop; không ảnh hưởng Foundation UI của Mục 2.
    const isMuc1Compact = Number(activeTopicId) === 1 || /^1\./.test(String(q?.sub_topic || ''));
    const visualWrapClass = isMuc1Compact
        ? 'w-full flex items-center justify-center origin-center scale-[0.58] md:scale-[0.62] lg:scale-[0.68]'
        : 'w-full flex items-center justify-center';
    const visualPanelClass = isMuc1Compact
        ? 'min-h-[180px] md:min-h-[210px]'
        : 'min-h-[300px] md:min-h-[360px]';
    const optionSizeClass = isMuc1Compact
        ? 'min-h-[50px] md:min-h-[56px] py-1.5'
        : 'min-h-[72px] md:min-h-[84px] py-3';
    const optionTextClass = isMuc1Compact
        ? 'text-lg md:text-xl lg:text-[22px]'
        : 'text-2xl md:text-3xl lg:text-[34px]';

    let optionsHtml = '';
    q.options.forEach((opt, idx) => {
        const formattedOpt = capitalizeFirstLetter(opt);
        const letter = String.fromCharCode(65 + idx);
        optionsHtml += `
            <button data-opt="${escapeHtml(opt)}" onclick="checkAnswer('${opt.replace(/'/g, "\\'")}')" class="option-btn w-full ${optionSizeClass} px-3 bg-pink-50/40 hover:bg-pink-100/70 border-2 border-pink-200 rounded-2xl font-extrabold text-gray-800 transition-all flex items-center justify-center text-center shadow-xs pastel-btn">
                <span class="flex items-center justify-center gap-2 leading-tight"><strong class="text-pink-600 text-lg md:text-xl">${letter}.</strong><span class="opt-text ${optionTextClass}">${escapeHtml(formattedOpt)}</span></span>
                <span class="option-icon text-pink-500 text-lg md:text-xl ml-1"></span>
            </button>`;
    });

    return `
        <div class="w-full max-w-5xl grid grid-cols-1 md:grid-cols-[1.08fr_0.92fr] gap-4 md:gap-5 items-stretch py-1">
            <div class="${visualPanelClass} rounded-[28px] border-2 border-pink-100 bg-gradient-to-br from-amber-50 via-white to-sky-50 px-3 py-5 md:px-6 md:py-7 flex flex-col items-center justify-center overflow-hidden shadow-sm">
                <div class="${visualWrapClass}">${visual}</div>
            </div>
            <div class="rounded-[28px] border border-pink-100 bg-white/95 px-3 py-4 md:px-5 md:py-5 flex flex-col justify-center shadow-sm">
                <h3 class="text-base md:text-lg lg:text-xl font-black text-slate-900 leading-snug text-center mb-1">${formatMuc1PromptHtml_(q, prompt)}</h3>
                ${speakerHtml}
                <div class="w-full grid grid-cols-2 gap-2.5 md:gap-3 mt-2">${optionsHtml}</div>
            </div>
        </div>`;
}

function getTopic3Stage_(q) {
    return String(q?.sub_topic || '');
}

function extractTopic3FocusNumber_(q) {
    const text = String(q?.question_text || '');
    const stage = getTopic3Stage_(q);
    let match = null;
    if (stage === '3.2') match = text.match(/Số\s+(\d+)/i);
    if (!match) {
        const numbers = text.match(/\d+/g) || [];
        const pick = numbers[numbers.length - 1];
        return pick ? Number(pick) : null;
    }
    return Number(match[1]);
}

function formatTopic3PromptHtml_(q, promptText) {
    const stage = getTopic3Stage_(q);
    const safe = escapeHtml(promptText || q?.question_text || '');
    const focus = extractTopic3FocusNumber_(q);
    if ((stage === '3.1' || stage === '3.2') && Number.isFinite(focus)) {
        return safe.replace(String(focus), `<span class="text-rose-600 font-black">${escapeHtml(String(focus))}</span>`);
    }
    return safe;
}


function getTopic3SortQuestionKey_(q) {
    return `${q?.question_id ?? q?.id ?? 'q'}::${q?.sub_topic || ''}::${q?.question_text || ''}`;
}

function parseTopic3SortMeta_(q) {
    const text = String(q?.question_text || '');
    const direction = /bé\s+đến\s+lớn/i.test(text)
        ? 'asc'
        : (/lớn\s+đến\s+bé/i.test(text) ? 'desc' : null);
    const tail = text.includes(':') ? text.split(':').pop() : text;
    const numbers = (String(tail).match(/\d+/g) || []).map(Number).slice(0, 4);
    if (!direction || numbers.length < 4) return null;
    return { direction, numbers };
}

function normalizeTopic3SortAnswer_(value) {
    return (String(value || '').match(/\d+/g) || []).join(',');
}

function getTopic3SortState_(q) {
    const key = getTopic3SortQuestionKey_(q);
    if (!topic3SortUiState_[key]) topic3SortUiState_[key] = { selected: [] };
    const state = topic3SortUiState_[key];
    const completed = userAnswers[currentQIndex];
    if ((!Array.isArray(state.selected) || state.selected.length === 0) && completed !== undefined) {
        state.selected = (String(completed).match(/\d+/g) || []).map(Number);
    }
    if (!Array.isArray(state.selected)) state.selected = [];
    return state;
}

function buildTopic3SortLayout_(q, speakerHtml) {
    const meta = parseTopic3SortMeta_(q);
    if (!meta) return '';
    const directionText = meta.direction === 'asc' ? 'từ bé đến lớn' : 'từ lớn đến bé';
    const helper = meta.direction === 'asc'
        ? 'Con hãy chọn số bé nhất trước rồi chọn dần đến số lớn nhất.'
        : 'Con hãy chọn số lớn nhất trước rồi chọn dần đến số bé nhất.';

    return `
        <div class="w-full max-w-5xl mx-auto py-1">
            <div class="w-full max-w-4xl mx-auto rounded-[28px] border-2 border-indigo-100 bg-white/95 px-3 py-4 md:px-5 md:py-5 shadow-sm">
                <div class="flex flex-col items-center justify-center text-center px-2">
                    <h3 class="text-lg md:text-xl lg:text-[24px] font-black text-slate-900 leading-snug">${escapeHtml(q.question_text)}</h3>
                    ${speakerHtml}
                    <div class="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-4 py-2 text-sm md:text-base font-black text-cyan-700 mt-1">
                        <span>🔢</span><span>${helper}</span>
                    </div>
                </div>
                <div id="topic3-sort-slots" class="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4"></div>
                <div class="mt-4 rounded-3xl border-2 border-pink-100 bg-gradient-to-br from-pink-50 via-white to-amber-50 px-3 py-4 md:px-4 md:py-5 shadow-sm">
                    <div class="text-center text-sm md:text-base font-black text-pink-700 mb-3">Các số cần sắp xếp ${directionText}</div>
                    <div id="topic3-sort-chips" class="grid grid-cols-2 md:grid-cols-4 gap-3"></div>
                </div>
                <div class="mt-3 flex flex-wrap items-center justify-center gap-2.5">
                    <button onclick="topic3SortReset_()" class="px-4 py-2 rounded-2xl border-2 border-amber-200 bg-amber-50 hover:bg-amber-100 text-amber-700 font-black text-sm md:text-base pastel-btn shadow-xs">↺ Làm lại</button>
                </div>
                <div id="topic3-sort-feedback" class="mt-3"></div>
            </div>
        </div>`;
}

function renderTopic3SortInteractive_(q) {
    if (Number(activeTopicId) !== 3 || getTopic3Stage_(q) !== '3.4') return;
    const meta = parseTopic3SortMeta_(q);
    if (!meta) return;
    const state = getTopic3SortState_(q);
    const selected = Array.isArray(state.selected) ? state.selected : [];
    const isLocked = userAnswers[currentQIndex] !== undefined;
    const firstLabel = meta.direction === 'asc' ? 'Số bé nhất' : 'Số lớn nhất';
    const lastLabel = meta.direction === 'asc' ? 'Số lớn nhất' : 'Số bé nhất';
    const slotLabels = [firstLabel, 'Ô thứ 2', 'Ô thứ 3', lastLabel];

    const slotsEl = document.getElementById('topic3-sort-slots');
    if (slotsEl) {
        slotsEl.innerHTML = Array.from({ length: 4 }, (_, idx) => {
            const value = selected[idx];
            const hasValue = value !== undefined;
            const canRemove = hasValue && !isLocked;
            const baseClass = hasValue
                ? 'border-cyan-300 bg-cyan-50 text-cyan-800'
                : 'border-dashed border-slate-300 bg-slate-50 text-slate-400';
            return `
                <button ${canRemove ? `onclick="topic3SortRemoveAt_(${idx})"` : 'disabled'} class="min-h-[98px] rounded-[24px] border-2 ${baseClass} px-3 py-3 flex flex-col items-center justify-center text-center transition-all ${canRemove ? 'hover:scale-[1.02] cursor-pointer' : 'cursor-default'}">
                    <div class="text-[11px] md:text-xs font-black uppercase tracking-wide ${idx === 0 || idx === 3 ? 'text-rose-600' : 'text-slate-500'}">${slotLabels[idx]}</div>
                    <div class="mt-2 text-2xl md:text-3xl font-black">${hasValue ? value : '?'}</div>
                </button>`;
        }).join('');
    }

    const chipsEl = document.getElementById('topic3-sort-chips');
    if (chipsEl) {
        chipsEl.innerHTML = meta.numbers.map(num => {
            const used = selected.includes(num);
            const disabled = used || isLocked;
            const cls = used
                ? 'border-emerald-300 bg-emerald-100 text-emerald-700'
                : 'border-pink-200 bg-white hover:bg-pink-50 text-slate-800';
            return `<button data-num="${num}" onclick="topic3SortPickNumber_(${num})" ${disabled ? 'disabled' : ''} class="min-h-[70px] rounded-2xl border-2 ${cls} font-black text-2xl md:text-3xl transition-all ${disabled ? 'opacity-60 cursor-not-allowed' : 'hover:-translate-y-0.5 pastel-btn'} shadow-xs">${num}</button>`;
        }).join('');
    }

    const feedbackEl = document.getElementById('topic3-sort-feedback');
    if (feedbackEl) {
        const wrongAttempts = wrongAttemptsByQ[currentQIndex] || [];
        if (isLocked && normalizeTopic3SortAnswer_(userAnswers[currentQIndex]) === normalizeTopic3SortAnswer_(q.answer)) {
            const directionText = meta.direction === 'asc' ? 'từ bé đến lớn' : 'từ lớn đến bé';
            feedbackEl.innerHTML = `<div class="rounded-2xl border-2 border-emerald-300 bg-emerald-50 px-4 py-3 text-center font-black text-emerald-800">✅ Giỏi lắm! Con đã sắp xếp đúng ${directionText}: ${escapeHtml(q.answer)}</div>`;
        } else if (!isLocked && wrongAttempts.length > 0 && selected.length === 0) {
            const hint = meta.direction === 'asc' ? 'Hãy tìm số bé nhất trước nhé.' : 'Hãy tìm số lớn nhất trước nhé.';
            feedbackEl.innerHTML = `<div class="rounded-2xl border-2 border-rose-200 bg-rose-50 px-4 py-3 text-center font-black text-rose-700">Con thử lại nhé. ${hint}</div>`;
        } else {
            feedbackEl.innerHTML = `<div class="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-center font-bold text-slate-600">Chạm vào các số bên dưới để đưa lần lượt lên hàng trên.</div>`;
        }
    }
}

function topic3SortPickNumber_(num) {
    const q = activeQuestionsList?.[currentQIndex];
    if (!q || Number(activeTopicId) !== 3 || getTopic3Stage_(q) !== '3.4') return;
    if (userAnswers[currentQIndex] !== undefined) return;
    const state = getTopic3SortState_(q);
    if (state.selected.includes(Number(num)) || state.selected.length >= 4) return;
    state.selected.push(Number(num));
    renderTopic3SortInteractive_(q);
    if (state.selected.length === 4) {
        const attempt = state.selected.join(', ');
        const isCorrect = normalizeTopic3SortAnswer_(attempt) === normalizeTopic3SortAnswer_(q.answer);
        checkAnswer(attempt);
        if (isCorrect) {
            renderTopic3SortInteractive_(q);
        } else {
            setTimeout(() => {
                state.selected = [];
                renderTopic3SortInteractive_(q);
            }, 650);
        }
    }
}

function topic3SortRemoveAt_(idx) {
    const q = activeQuestionsList?.[currentQIndex];
    if (!q || Number(activeTopicId) !== 3 || getTopic3Stage_(q) !== '3.4') return;
    if (userAnswers[currentQIndex] !== undefined) return;
    const state = getTopic3SortState_(q);
    if (!Array.isArray(state.selected) || idx < 0 || idx >= state.selected.length) return;
    state.selected.splice(idx, 1);
    renderTopic3SortInteractive_(q);
}

function topic3SortReset_() {
    const q = activeQuestionsList?.[currentQIndex];
    if (!q || Number(activeTopicId) !== 3 || getTopic3Stage_(q) !== '3.4') return;
    if (userAnswers[currentQIndex] !== undefined) return;
    const state = getTopic3SortState_(q);
    state.selected = [];
    renderTopic3SortInteractive_(q);
}

function getTopic4SequenceStage_(q) {
    return String(q?.sub_topic || '');
}

function getTopic4NeighbourMeta_(q) {
    const text = String(q?.question_text || '');
    let m = text.match(/liền\s+trước\s+của\s+(\d+)/i);
    if (m) return { type: 'before', base: Number(m[1]) };
    m = text.match(/liền\s+sau\s+của\s+(\d+)/i);
    if (m) return { type: 'after', base: Number(m[1]) };
    m = text.match(/ở\s+giữa\s+(\d+)\s+và\s+(\d+)/i);
    if (m) return { type: 'middle', left: Number(m[1]), right: Number(m[2]), base: Math.round((Number(m[1]) + Number(m[2])) / 2) };
    m = text.match(/liền\s+kề\s+với\s+(\d+)/i);
    if (m) return { type: 'around', base: Number(m[1]) };
    return null;
}

function getTopic4NumberStrip_(meta) {
    const center = Number(meta?.base);
    if (!Number.isFinite(center)) return [];
    let start = center - 3;
    if (start < 1) start = 1;
    let end = start + 6;
    if (end > 100) {
        end = 100;
        start = Math.max(1, end - 6);
    }
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

function buildTopic4Sub41SolutionHtml_(q) {
    const chosen = userAnswers[currentQIndex];
    if (chosen === undefined || chosen !== q?.answer) return '';
    const meta = getTopic4NeighbourMeta_(q);
    if (!meta) return '';
    let formula = '';
    if (meta.type === 'before') formula = `${q.answer} = ${meta.base} - 1`;
    else if (meta.type === 'after') formula = `${q.answer} = ${meta.base} + 1`;
    else if (meta.type === 'middle') formula = `${meta.left} < ${q.answer} < ${meta.right}`;
    else if (meta.type === 'around') formula = `${meta.base - 1} ← ${meta.base} → ${meta.base + 1}`;
    return formula ? `<div class="mt-3 rounded-2xl border-2 border-emerald-300 bg-emerald-50 px-4 py-2.5 text-center font-black text-emerald-800 text-xl md:text-2xl shadow-sm">${escapeHtml(formula)}</div>` : '';
}

function buildTopic4Sub41Layout_(q, speakerHtml) {
    const meta = getTopic4NeighbourMeta_(q);
    if (!meta) return '';
    const numbers = getTopic4NumberStrip_(meta);
    const stripHtml = numbers.map((num, idx) => {
        const active = num === meta.base;
        const bubbleClass = active
            ? 'w-14 h-14 md:w-16 md:h-16 rounded-full bg-cyan-500 text-white border-2 border-cyan-500 shadow-sm'
            : 'w-14 h-14 md:w-16 md:h-16 rounded-full bg-white text-purple-700 border-2 border-purple-200 shadow-sm';
        return `
            <div class="flex items-center ${idx < numbers.length - 1 ? 'mr-0.5 md:mr-1' : ''}">
                <div class="${bubbleClass} flex items-center justify-center text-lg md:text-xl font-black">${num}</div>
                ${idx < numbers.length - 1 ? '<div class="w-5 md:w-7 h-1 bg-purple-200"></div>' : ''}
            </div>`;
    }).join('');

    const optionsHtml = q.options.map((opt, idx) => {
        const letter = String.fromCharCode(65 + idx);
        return `
            <button data-opt="${escapeHtml(opt)}" onclick="checkAnswer('${String(opt).replace(/'/g, "\\'")}')" class="option-btn w-full min-h-[60px] md:min-h-[68px] px-2 py-2 bg-cyan-50/40 hover:bg-cyan-100/70 border-2 border-cyan-200 rounded-2xl font-extrabold text-gray-800 transition-all flex items-center justify-center text-center shadow-xs pastel-btn">
                <span class="flex items-center justify-center gap-1.5 leading-tight"><strong class="text-cyan-600 text-lg md:text-xl">${letter}.</strong><span class="opt-text text-xl md:text-2xl lg:text-[26px]">${escapeHtml(capitalizeFirstLetter(opt))}</span></span>
                <span class="option-icon text-cyan-500 text-lg md:text-xl ml-1"></span>
            </button>`;
    }).join('');

    return `
        <div class="w-full max-w-5xl mx-auto py-1">
            <div class="w-full max-w-4xl mx-auto rounded-[28px] border-2 border-cyan-100 bg-white/80 px-3 py-4 md:px-5 md:py-5 shadow-sm">
                <div class="flex items-center justify-center flex-wrap">${stripHtml}</div>
                <div id="topic4-sub41-solution-host">${buildTopic4Sub41SolutionHtml_(q)}</div>
            </div>
            <div class="flex flex-col items-center justify-center max-w-4xl mx-auto text-center px-2 mt-3 mb-1">
                <h3 class="text-lg md:text-xl lg:text-[26px] font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-700 via-violet-600 to-purple-700 leading-snug">${escapeHtml(q.question_text)}</h3>
                ${speakerHtml}
            </div>
            <div class="w-full max-w-5xl mx-auto grid grid-cols-4 gap-2.5 mt-2">${optionsHtml}</div>
        </div>`;
}

function refreshTopic4Sub41SolutionHost_(q) {
    if (Number(activeTopicId) !== 4 || getTopic4SequenceStage_(q) !== '4.1') return;
    const host = document.getElementById('topic4-sub41-solution-host');
    if (host) host.innerHTML = buildTopic4Sub41SolutionHtml_(q);
}

function getTopic3CompareMeta_(q) {
    const text = String(q?.question_text || '');
    const m = text.match(/(\d{1,2})\s*\.{2,}\s*(\d{1,2})/);
    if (!m) return null;
    return { a: Number(m[1]), b: Number(m[2]) };
}

function buildTopic3CompareSolutionHtml_(q) {
    const chosen = userAnswers[currentQIndex];
    if (chosen === undefined || chosen !== q?.answer) return '';
    const meta = getTopic3CompareMeta_(q);
    if (!meta) return '';

    const tensA = Math.floor(meta.a / 10);
    const onesA = meta.a % 10;
    const tensB = Math.floor(meta.b / 10);
    const onesB = meta.b % 10;
    const sign = String(q.answer || '');

    let explanation = '';
    if (tensA !== tensB) {
        explanation = `${tensA} chục ${sign} ${tensB} chục nên ${meta.a} ${sign} ${meta.b}`;
    } else {
        explanation = `Cùng ${tensA} chục, so sánh đơn vị: ${onesA} ${sign} ${onesB} nên ${meta.a} ${sign} ${meta.b}`;
    }

    return `<div class="mt-4 rounded-2xl border-2 border-emerald-300 bg-emerald-50 px-4 py-3 text-center font-black text-emerald-800 text-lg md:text-xl lg:text-[22px] shadow-sm">${escapeHtml(explanation)}</div>`;
}

function buildTopic3PlaceValueCard_(num, tone = 'violet') {
    const tens = Math.floor(num / 10);
    const ones = num % 10;
    const toneClass = tone === 'rose'
        ? 'border-rose-200 bg-rose-50/50 text-rose-700'
        : 'border-violet-200 bg-violet-50/50 text-violet-700';
    return `
        <div class="rounded-2xl border-2 ${toneClass} px-4 py-3 min-w-[180px] md:min-w-[210px] shadow-sm">
            <div class="text-center text-3xl md:text-4xl font-black mb-2">${num}</div>
            <div class="grid grid-cols-2 gap-2 text-center">
                <div class="rounded-xl bg-white/80 border border-current/20 px-2 py-2">
                    <div class="text-xs md:text-sm font-bold opacity-70">Chục</div>
                    <div class="text-xl md:text-2xl font-black">${tens}</div>
                </div>
                <div class="rounded-xl bg-white/80 border border-current/20 px-2 py-2">
                    <div class="text-xs md:text-sm font-bold opacity-70">Đơn vị</div>
                    <div class="text-xl md:text-2xl font-black">${ones}</div>
                </div>
            </div>
        </div>`;
}

function buildTopic3CompareLayout_(q, speakerHtml) {
    const meta = getTopic3CompareMeta_(q);
    if (!meta) return '';

    const optionsHtml = q.options.map((opt, idx) => {
        const formattedOpt = capitalizeFirstLetter(opt);
        const letter = String.fromCharCode(65 + idx);
        return `
            <button data-opt="${escapeHtml(opt)}" onclick="checkAnswer('${opt.replace(/'/g, "\'")}')" class="option-btn w-full min-h-[60px] md:min-h-[68px] px-2 py-2 bg-pink-50/40 hover:bg-pink-100/70 border-2 border-pink-200 rounded-2xl font-extrabold text-gray-800 transition-all flex items-center justify-center text-center shadow-xs pastel-btn">
                <span class="flex items-center justify-center gap-1.5 leading-tight"><strong class="text-pink-600 text-base md:text-lg">${letter}.</strong><span class="opt-text text-lg md:text-xl lg:text-[24px]">${escapeHtml(formattedOpt)}</span></span>
                <span class="option-icon text-pink-500 text-lg md:text-xl ml-1"></span>
            </button>`;
    }).join('');

    return `
        <div class="w-full max-w-5xl mx-auto py-1">
            <div class="w-full max-w-4xl mx-auto rounded-[28px] border-2 border-pink-100 bg-white/80 px-3 py-4 md:px-5 md:py-5 shadow-sm">
                <div class="flex flex-wrap items-center justify-center gap-4 md:gap-6">
                    ${buildTopic3PlaceValueCard_(meta.a, 'violet')}
                    <div class="w-14 h-14 md:w-16 md:h-16 rounded-full border-2 border-pink-300 bg-pink-50 flex items-center justify-center text-3xl md:text-4xl font-black text-pink-500">?</div>
                    ${buildTopic3PlaceValueCard_(meta.b, 'rose')}
                </div>
                <div id="topic3-compare-solution-host">${buildTopic3CompareSolutionHtml_(q)}</div>
            </div>
            <div class="flex flex-col items-center justify-center max-w-4xl mx-auto text-center px-2 mt-3 mb-1">
                <h3 class="text-lg md:text-xl lg:text-[24px] font-black text-violet-700 leading-snug">Bé hãy chọn dấu thích hợp nhé!</h3>
                ${speakerHtml}
            </div>
            <div class="w-full max-w-5xl mx-auto grid grid-cols-4 gap-2.5 mt-2">${optionsHtml}</div>
        </div>`;
}

function refreshTopic3CompareSolutionHost_(q) {
    if (Number(activeTopicId) !== 3 || getTopic3Stage_(q) !== '3.3') return;
    const host = document.getElementById('topic3-compare-solution-host');
    if (!host) return;
    host.innerHTML = buildTopic3CompareSolutionHtml_(q);
}


function getTopic3SortMeta_(q) {
    const text = String(q?.question_text || '');
    const numbers = (text.match(/\d+/g) || []).map(Number).slice(-4);
    if (numbers.length !== 4) return null;
    const order = /lớn\s+đến\s+bé/i.test(text) ? 'desc' : 'asc';
    return { numbers, order };
}

function getTopic3SortState_(q) {
    const meta = getTopic3SortMeta_(q);
    if (!meta) return null;
    const key = `${q?.question_id ?? q?.id ?? 'q'}::${q?.question_text || ''}`;
    if (q._topic3SortState && q._topic3SortState.key === key) return q._topic3SortState;
    let chips = shuffleArray(meta.numbers.slice());
    const desired = String(q?.answer || '').trim();
    const chipOrder = chips.join(', ');
    if (chips.length > 1 && chipOrder === desired) {
        chips = chips.slice(1).concat(chips[0]);
    }
    q._topic3SortState = {
        key,
        chips,
        selected: [],
        feedback: '',
        lastAttempt: ''
    };
    return q._topic3SortState;
}

function topic3SortChoiceDisabled_(q, num) {
    const state = getTopic3SortState_(q);
    if (!state) return true;
    return state.selected.includes(Number(num)) || userAnswers[currentQIndex] !== undefined;
}

function buildTopic3SortFeedbackHtml_(q) {
    const state = getTopic3SortState_(q);
    if (!state) return '';
    const completedAnswer = userAnswers[currentQIndex];
    const wrongAttempts = wrongAttemptsByQ[currentQIndex] || [];

    if (completedAnswer !== undefined && completedAnswer === q.answer) {
        return `<div class="mt-3 rounded-2xl border-2 border-emerald-300 bg-emerald-50 px-4 py-2.5 text-center font-black text-emerald-800 text-sm md:text-base shadow-sm">✅ Giỏi lắm! Con đã sắp xếp đúng thứ tự rồi.</div>`;
    }
    if (state.feedback === 'wrong' || wrongAttempts.length > 0) {
        return `<div class="mt-3 rounded-2xl border-2 border-rose-300 bg-rose-50 px-4 py-2.5 text-center font-black text-rose-700 text-sm md:text-base shadow-sm">💡 Con hãy chọn lần lượt từng số theo đúng thứ tự nhé. Nếu nhầm, bấm “Xóa số cuối” hoặc “Làm lại”.</div>`;
    }
    return `<div class="mt-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-2.5 text-center font-black text-amber-700 text-sm md:text-base shadow-sm">👆 Con chạm các số ở hàng dưới theo đúng thứ tự để đưa lên hàng trên.</div>`;
}

function buildTopic3SortLayout_(q, speakerHtml) {
    const meta = getTopic3SortMeta_(q);
    const state = getTopic3SortState_(q);
    if (!meta || !state) return '';

    const promptShort = meta.order === 'asc'
        ? 'Chọn lần lượt từ bé đến lớn'
        : 'Chọn lần lượt từ lớn đến bé';

    const slotsHtml = Array.from({ length: meta.numbers.length }, (_, idx) => {
        const value = state.selected[idx];
        const baseClass = userAnswers[currentQIndex] !== undefined && userAnswers[currentQIndex] === q.answer
            ? 'border-emerald-300 bg-emerald-50 text-emerald-700'
            : state.feedback === 'wrong'
                ? 'border-rose-300 bg-rose-50 text-rose-700'
                : 'border-violet-200 bg-white text-violet-700';
        return `<div class="w-20 h-16 md:w-24 md:h-18 rounded-2xl border-2 ${baseClass} flex items-center justify-center font-black text-2xl md:text-3xl shadow-sm">${value !== undefined ? value : '<span class="text-violet-200">?</span>'}</div>`;
    }).join('');

    const chipsHtml = state.chips.map((num) => {
        const disabled = topic3SortChoiceDisabled_(q, num);
        return `<button type="button" onclick="topic3SortChoose_(${Number(num)})" ${disabled ? 'disabled' : ''}
            class="topic3-sort-chip min-w-[78px] md:min-w-[92px] h-14 md:h-16 px-4 rounded-2xl border-2 ${disabled ? 'border-slate-100 bg-slate-50 text-slate-300 cursor-not-allowed opacity-70' : 'border-pink-200 bg-pink-50/70 hover:bg-pink-100/80 text-pink-700 hover:scale-[1.03]'} font-black text-2xl md:text-3xl transition-all shadow-sm">${num}</button>`;
    }).join('');

    const done = userAnswers[currentQIndex] !== undefined;

    return `
        <div class="w-full max-w-5xl mx-auto py-1">
            <div class="flex flex-col items-center justify-center max-w-4xl mx-auto text-center px-2 mb-2">
                <h3 class="text-lg md:text-xl lg:text-[24px] font-black text-slate-900 leading-snug">${escapeHtml(q.question_text)}</h3>
                ${speakerHtml}
            </div>

            <div class="w-full max-w-4xl mx-auto rounded-[28px] border-2 border-violet-100 bg-white/90 px-4 py-4 md:px-6 md:py-5 shadow-sm">
                <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 border border-violet-200 text-violet-700 text-sm md:text-base font-black shadow-sm mb-4">
                    <span>🐰</span><span>${escapeHtml(promptShort)}</span>
                </div>

                <div class="flex flex-wrap items-center justify-center gap-2.5 md:gap-3 mb-4">${slotsHtml}</div>

                <div class="flex items-center justify-center gap-2 mb-3 flex-wrap">
                    <button type="button" onclick="topic3SortUndo_()" ${done || !state.selected.length ? 'disabled' : ''} class="px-3 py-2 rounded-2xl border-2 border-sky-200 bg-sky-50 text-sky-700 font-black text-sm md:text-base ${done || !state.selected.length ? 'opacity-40 cursor-not-allowed' : 'hover:bg-sky-100'}">↩️ Xóa số cuối</button>
                    <button type="button" onclick="topic3SortReset_()" ${done || !state.selected.length ? 'disabled' : ''} class="px-3 py-2 rounded-2xl border-2 border-amber-200 bg-amber-50 text-amber-700 font-black text-sm md:text-base ${done || !state.selected.length ? 'opacity-40 cursor-not-allowed' : 'hover:bg-amber-100'}">🔄 Làm lại</button>
                </div>

                <div class="grid grid-cols-2 md:grid-cols-4 gap-2.5 md:gap-3">${chipsHtml}</div>
                <div id="topic3-sort-feedback-host">${buildTopic3SortFeedbackHtml_(q)}</div>
            </div>
        </div>`;
}

function refreshTopic3SortUi_(q) {
    if (Number(activeTopicId) !== 3 || getTopic3Stage_(q) !== '3.4') return;
    const host = document.getElementById('question-box');
    if (!host) return;
    const isEvaluationMode = !!activeExamContext || !!activeRoadmapContext;
    if (isEvaluationMode) return;
    const practiceSpeakerBtnHtml = `
        <div class="flex items-center justify-center mt-1 mb-1">
            <button onclick="speakCurrentQuestion()" class="px-4 py-1.5 bg-pink-50 hover:bg-pink-100 text-pink-700 border border-pink-200 rounded-2xl text-xs md:text-sm font-extrabold flex items-center space-x-1.5 pastel-btn shadow-xs">
                <i class="fa-solid fa-volume-high text-pink-600"></i>
                <span>Nghe câu hỏi</span>
            </button>
        </div>
    `;
    host.innerHTML = buildTopic3SortLayout_(q, practiceSpeakerBtnHtml);
}

function topic3SortChoose_(num) {
    const q = activeQuestionsList?.[currentQIndex];
    if (!q || Number(activeTopicId) !== 3 || getTopic3Stage_(q) !== '3.4') return;
    if (userAnswers[currentQIndex] !== undefined) return;
    const state = getTopic3SortState_(q);
    if (!state || state.selected.includes(Number(num))) return;
    state.selected.push(Number(num));
    state.feedback = '';
    refreshTopic3SortUi_(q);
    try { speakVietnamese(String(num), 0.94); } catch (e) {}
    if (state.selected.length === state.chips.length) {
        setTimeout(() => topic3SortSubmit_(), 120);
    }
}

function topic3SortUndo_() {
    const q = activeQuestionsList?.[currentQIndex];
    if (!q || Number(activeTopicId) !== 3 || getTopic3Stage_(q) !== '3.4') return;
    if (userAnswers[currentQIndex] !== undefined) return;
    const state = getTopic3SortState_(q);
    if (!state || !state.selected.length) return;
    state.selected.pop();
    state.feedback = '';
    refreshTopic3SortUi_(q);
}

function topic3SortReset_() {
    const q = activeQuestionsList?.[currentQIndex];
    if (!q || Number(activeTopicId) !== 3 || getTopic3Stage_(q) !== '3.4') return;
    if (userAnswers[currentQIndex] !== undefined) return;
    const state = getTopic3SortState_(q);
    if (!state) return;
    state.selected = [];
    state.feedback = '';
    refreshTopic3SortUi_(q);
}

function topic3SortSubmit_() {
    const q = activeQuestionsList?.[currentQIndex];
    if (!q || Number(activeTopicId) !== 3 || getTopic3Stage_(q) !== '3.4') return;
    if (userAnswers[currentQIndex] !== undefined) return;
    const state = getTopic3SortState_(q);
    if (!state || !state.selected.length) return;
    const answerText = state.selected.join(', ');
    state.lastAttempt = answerText;
    checkAnswer(answerText);
    if (userAnswers[currentQIndex] === q.answer) {
        state.feedback = 'correct';
        refreshTopic3SortUi_(q);
        return;
    }
    state.feedback = 'wrong';
    refreshTopic3SortUi_(q);
    setTimeout(() => {
        const latestQ = activeQuestionsList?.[currentQIndex];
        if (latestQ !== q) return;
        if (userAnswers[currentQIndex] !== undefined) return;
        state.selected = [];
        state.feedback = '';
        refreshTopic3SortUi_(q);
    }, 850);
}


function getTopic35Phase_(q) {
    const id = Number(q?.question_id || 0);
    if (id >= 5200 && id <= 5209) return 'digit_pairing';
    if (id >= 5210 && id <= 5219) return 'pick_from_four';
    if (id >= 5220 && id <= 5239) return 'two_digit';
    return 'generic';
}

function getTopic35DisplayOptions_(q) {
    const opts = Array.isArray(q?.options) ? [...q.options] : [];
    if (opts.length <= 1) return opts;
    const seed = Number(q?.question_id || 0) + Number(currentQIndex || 0);
    const shift = ((seed % opts.length) + opts.length) % opts.length;
    const rotated = opts.slice(shift).concat(opts.slice(0, shift));
    // Đảo thêm theo seed để đáp án đúng không nằm lì một vị trí qua nhiều câu.
    return seed % 2 === 0 ? rotated : rotated.reverse();
}

function getTopic35MainNumber_(q) {
    const m = String(q?.question_text || '').match(/Số\s+(\d+)/i);
    return m ? Number(m[1]) : null;
}

function topic35EmojiForQuestion_(q) {
    const emojis = ['🍎','🐰','⭐','🐟','🍓','🦋','⚽','🌼','🚗','🧁'];
    return emojis[Math.abs(Number(q?.question_id || 0)) % emojis.length];
}

function buildTopic35PairingVisual_(q) {
    const n = getTopic35MainNumber_(q);
    if (!Number.isFinite(n) || n < 0 || n > 9) return '';
    const emoji = topic35EmojiForQuestion_(q);
    if (n === 0) {
        return `
            <div class="flex flex-col items-center justify-center min-h-[150px]">
                <div class="w-28 h-28 rounded-full border-4 border-dashed border-slate-300 bg-slate-50 flex items-center justify-center text-5xl text-slate-400">∅</div>
                <div class="mt-3 text-base md:text-lg font-black text-slate-600">Không có đồ vật nào</div>
            </div>`;
    }
    const pairs = Math.floor(n / 2);
    const hasSingle = n % 2 === 1;
    let html = '<div class="flex flex-wrap items-center justify-center gap-3 md:gap-4">';
    for (let i = 0; i < pairs; i++) {
        html += `<div class="inline-flex items-center gap-0.5 rounded-2xl border-2 border-emerald-200 bg-emerald-50 px-3 py-2 shadow-xs"><span class="text-4xl md:text-5xl">${emoji}</span><span class="text-4xl md:text-5xl">${emoji}</span></div>`;
    }
    if (hasSingle) {
        html += `<div class="ml-2 md:ml-4 inline-flex flex-col items-center rounded-2xl border-2 border-rose-300 bg-rose-50 px-3 py-2 shadow-xs"><span class="text-4xl md:text-5xl">${emoji}</span><span class="mt-1 text-[11px] md:text-xs font-black text-rose-600">đứng một mình</span></div>`;
    }
    html += '</div>';
    return html;
}

function buildTopic35MemoryStrip_() {
    return `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-2.5 mt-3">
            <div class="rounded-2xl border-2 border-emerald-200 bg-emerald-50 px-3 py-2 text-center"><span class="font-black text-emerald-700">Số chẵn:</span> <span class="font-black text-slate-800">0 · 2 · 4 · 6 · 8</span></div>
            <div class="rounded-2xl border-2 border-violet-200 bg-violet-50 px-3 py-2 text-center"><span class="font-black text-violet-700">Số lẻ:</span> <span class="font-black text-slate-800">1 · 3 · 5 · 7 · 9</span></div>
        </div>`;
}

function buildTopic35FeedbackHtml_(q) {
    const chosen = userAnswers[currentQIndex];
    if (chosen === undefined || chosen !== q?.answer) return '';
    const phase = getTopic35Phase_(q);
    if (phase === 'digit_pairing') {
        const n = getTopic35MainNumber_(q);
        const why = n === 0
            ? '0 được xếp vào nhóm số chẵn.'
            : (n % 2 === 0 ? 'Ghép thành từng đôi và không còn hình nào đứng một mình.' : 'Ghép thành từng đôi còn 1 hình đứng một mình.');
        return `<div class="mt-3 rounded-2xl border-2 border-emerald-300 bg-emerald-50 px-4 py-3 text-center font-black text-emerald-800">✅ ${escapeHtml(why)}</div>`;
    }
    if (phase === 'two_digit') {
        const n = getTopic35MainNumber_(q);
        const unit = Number.isFinite(n) ? n % 10 : '';
        return `<div class="mt-3 rounded-2xl border-2 border-emerald-300 bg-emerald-50 px-4 py-3 text-center font-black text-emerald-800">✅ Chỉ cần nhìn hàng đơn vị: ${unit} → ${escapeHtml(q.answer)}.</div>`;
    }
    return `<div class="mt-3 rounded-2xl border-2 border-emerald-300 bg-emerald-50 px-4 py-3 text-center font-black text-emerald-800">✅ Chính xác!</div>`;
}

function buildTopic35QuestionLayout_(q, speakerHtml) {
    const phase = getTopic35Phase_(q);
    const opts = getTopic35DisplayOptions_(q);
    const n = getTopic35MainNumber_(q);
    let visualHtml = '';
    let guidanceHtml = '';

    if (phase === 'digit_pairing') {
        visualHtml = `
            <div class="rounded-[28px] border-2 border-cyan-100 bg-gradient-to-br from-cyan-50 via-white to-emerald-50 px-4 py-5 shadow-sm">
                <div class="text-center text-sm md:text-base font-black text-cyan-700 mb-3">Ghép các hình thành từng đôi</div>
                ${buildTopic35PairingVisual_(q)}
            </div>`;
        guidanceHtml = '<div class="mt-2 text-center text-sm md:text-base font-bold text-slate-600">Nếu còn 1 hình đứng một mình → số lẻ. Ghép hết thành đôi → số chẵn.</div>';
    } else if (phase === 'pick_from_four') {
        visualHtml = `
            <div class="rounded-[28px] border-2 border-violet-100 bg-gradient-to-br from-violet-50 via-white to-pink-50 px-4 py-6 shadow-sm flex flex-col items-center justify-center min-h-[170px]">
                <div class="text-5xl md:text-6xl">🔎</div>
                <div class="mt-3 text-center text-base md:text-lg font-black text-violet-700">Con hãy tìm đúng một số theo yêu cầu.</div>
            </div>`;
        guidanceHtml = buildTopic35MemoryStrip_();
    } else if (phase === 'two_digit') {
        const tens = Number.isFinite(n) ? Math.floor(n / 10) : '';
        const unit = Number.isFinite(n) ? n % 10 : '';
        visualHtml = `
            <div class="rounded-[28px] border-2 border-amber-100 bg-gradient-to-br from-amber-50 via-white to-rose-50 px-4 py-6 shadow-sm flex flex-col items-center justify-center min-h-[180px]">
                <div class="text-sm md:text-base font-black text-amber-700 mb-3">Hãy nhìn chữ số hàng đơn vị</div>
                <div class="flex items-end gap-1 leading-none">
                    <span class="text-7xl md:text-8xl font-black text-slate-500">${tens}</span>
                    <span class="text-7xl md:text-8xl font-black text-rose-600 underline decoration-4 underline-offset-8">${unit}</span>
                </div>
                <div class="mt-4 rounded-full border-2 border-rose-200 bg-white px-4 py-2 text-sm md:text-base font-black text-rose-700">Hàng đơn vị là ${unit}</div>
            </div>`;
        guidanceHtml = `<div class="mt-2 text-center text-sm md:text-base font-black text-rose-700">💡 Bé hãy để ý chữ số hàng đơn vị nhé!</div>${buildTopic35MemoryStrip_()}`;
    }

    const isNumberChoice = phase === 'pick_from_four';
    const optionsHtml = opts.map((opt, idx) => {
        const letter = String.fromCharCode(65 + idx);
        const label = isNumberChoice ? String(opt) : capitalizeFirstLetter(opt);
        const textClass = isNumberChoice ? 'text-2xl md:text-3xl' : 'text-base md:text-lg lg:text-xl';
        return `<button data-opt="${escapeHtml(opt)}" onclick="checkAnswer('${String(opt).replace(/'/g,"\\'")}')" class="option-btn w-full min-h-[68px] md:min-h-[76px] px-3 py-2.5 bg-pink-50/40 hover:bg-pink-100/70 border-2 border-pink-200 rounded-2xl font-extrabold text-slate-800 transition-all flex items-center justify-center text-center shadow-xs pastel-btn"><span class="flex items-center justify-center gap-2"><strong class="text-pink-600 text-base md:text-lg">${letter}.</strong><span class="opt-text ${textClass} font-black">${escapeHtml(label)}</span></span><span class="option-icon text-pink-500 ml-1"></span></button>`;
    }).join('');

    return `
        <div class="w-full max-w-6xl grid grid-cols-1 md:grid-cols-[1.05fr_0.95fr] gap-4 items-stretch py-1">
            <div class="flex flex-col justify-center">${visualHtml}${guidanceHtml}</div>
            <div class="rounded-[28px] border border-pink-100 bg-white/95 px-3 py-4 md:px-5 md:py-5 flex flex-col justify-center shadow-sm">
                <h3 class="text-lg md:text-xl lg:text-[24px] font-black text-slate-900 leading-snug text-center">${escapeHtml(q.question_text)}</h3>
                ${speakerHtml}
                <div class="grid ${opts.length === 2 ? 'grid-cols-2' : 'grid-cols-2'} gap-2.5 mt-3">${optionsHtml}</div>
                <div id="topic35-feedback-host">${buildTopic35FeedbackHtml_(q)}</div>
            </div>
        </div>`;
}

function refreshTopic35FeedbackHost_(q) {
    if (Number(activeTopicId) !== 3 || getTopic3Stage_(q) !== '3.5') return;
    const host = document.getElementById('topic35-feedback-host');
    if (host) host.innerHTML = buildTopic35FeedbackHtml_(q);
}

function buildMuc5SolutionHtml_(q) {
    const chosen = userAnswers[currentQIndex];
    if (chosen === undefined || chosen !== q?.answer || !q?.explanation) return '';
    return `<div class="mt-3 rounded-2xl border-2 border-emerald-300 bg-emerald-50 px-4 py-2.5 text-center text-sm md:text-base font-black text-emerald-800 shadow-sm">💡 ${escapeHtml(q.explanation)}</div>`;
}

function muc5OptionIcon_(opt) {
    const map = {
        'Hình tròn':'circle', 'Hình tam giác':'triangle', 'Hình vuông':'square', 'Hình chữ nhật':'rectangle'
    };
    if (map[opt]) return muc5ShapeSvg_(map[opt], {size:52, color:'#fbcfe8', stroke:'#7c3aed'});
    if (opt === 'Khối lập phương') return muc5SolidSvg_('cube',{size:58});
    if (opt === 'Khối hộp chữ nhật') return muc5SolidSvg_('cuboid',{size:68,fill1:'#d1fae5',fill2:'#a7f3d0',fill3:'#6ee7b7'});
    if (opt === 'Hình vuông') return muc5ShapeSvg_('square',{size:52,color:'#bfdbfe'});
    if (opt === 'Hình chữ nhật') return muc5ShapeSvg_('rectangle',{size:52,color:'#fde68a'});
    return '';
}

function muc5ComposeSceneSvg_(scene, missingShape = null, showMissing = false) {
    const W = 240, H = 180;
    const filled = (shape, attrs, color) => {
        const stroke = '#475569';
        if (shape === 'triangle') return `<polygon ${attrs} fill="${color}" stroke="${stroke}" stroke-width="3"></polygon>`;
        if (shape === 'circle') return `<circle ${attrs} fill="${color}" stroke="${stroke}" stroke-width="3"></circle>`;
        return `<rect ${attrs} fill="${color}" stroke="${stroke}" stroke-width="3" rx="5"></rect>`;
    };
    const dashed = (shape, attrs) => {
        const common = `fill="#fff1f2" stroke="#f43f5e" stroke-width="4" stroke-dasharray="8 7"`;
        if (shape === 'triangle') return `<polygon ${attrs} ${common}></polygon>`;
        if (shape === 'circle') return `<circle ${attrs} ${common}></circle>`;
        return `<rect ${attrs} ${common} rx="5"></rect>`;
    };
    const part = (shape, attrs, color) => (showMissing && missingShape === shape ? dashed(shape, attrs) : filled(shape, attrs, color));
    let body = '';
    if (scene === 'ngôi nhà') {
        body += part('square','x="75" y="82" width="90" height="76"','#93c5fd');
        body += part('triangle','points="120,24 52,86 188,86"','#fca5a5');
    } else if (scene === 'cây kem') {
        body += part('triangle','points="120,158 78,76 162,76"','#fbbf24');
        body += part('circle','cx="120" cy="62" r="38"','#f9a8d4');
    } else if (scene === 'chú rô-bốt') {
        body += part('square','x="88" y="20" width="64" height="55"','#c4b5fd');
        body += filled('rectangle','x="72" y="82" width="96" height="66"','#93c5fd');
        body += filled('rectangle','x="38" y="92" width="32" height="45"','#86efac');
        body += filled('rectangle','x="170" y="92" width="32" height="45"','#86efac');
    } else if (scene === 'cây cờ') {
        body += filled('rectangle','x="64" y="24" width="18" height="134"','#94a3b8');
        body += part('rectangle','x="82" y="30" width="102" height="58"','#fb7185');
    } else if (scene === 'chiếc thuyền') {
        body += filled('rectangle','x="58" y="108" width="124" height="42"','#60a5fa');
        body += part('triangle','points="120,28 120,108 182,108"','#fde68a');
        body += `<line x1="120" y1="28" x2="120" y2="108" stroke="#475569" stroke-width="4"></line>`;
    } else if (scene === 'cửa sổ') {
        const coords=[[72,32],[122,32],[72,82],[122,82]];
        coords.forEach((c,idx)=>{
            const attrs=`x="${c[0]}" y="${c[1]}" width="46" height="46"`;
            body += (showMissing && missingShape === 'square' && idx === 3) ? dashed('square',attrs) : filled('square',attrs,'#bfdbfe');
        });
    } else if (scene === 'bông hoa') {
        body += filled('rectangle','x="112" y="86" width="16" height="70"','#86efac');
        body += part('circle','cx="120" cy="62" r="38"','#fde68a');
    } else {
        body += filled('rectangle','x="54" y="70" width="104" height="42"','#93c5fd');
        body += part('triangle','points="158,48 210,91 158,134"','#fca5a5');
    }
    return `<svg viewBox="0 0 ${W} ${H}" class="w-full max-w-[330px] h-auto" aria-hidden="true">${body}</svg>`;
}

function muc5AdvancedCountSvg_(pattern) {
    const stroke = '#4338ca';
    const sw = 4;
    const line = (x1,y1,x2,y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${sw}" stroke-linecap="round"></line>`;
    const rect = (x,y,w,h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" stroke="${stroke}" stroke-width="${sw}" rx="2"></rect>`;
    let body = '';

    if (pattern === 'tri_fan_2' || pattern === 'tri_fan_3' || pattern === 'tri_fan_4') {
        const parts = pattern === 'tri_fan_2' ? 2 : (pattern === 'tri_fan_3' ? 3 : 4);
        const left = 25, right = 215, baseY = 160, apexX = 120, apexY = 20;
        body += `<polygon points="${apexX},${apexY} ${left},${baseY} ${right},${baseY}" fill="#eef2ff" stroke="${stroke}" stroke-width="${sw}"></polygon>`;
        for (let i = 1; i < parts; i++) {
            const x = left + (right-left) * i / parts;
            body += line(apexX, apexY, x, baseY);
        }
    } else if (pattern === 'square_diagonals') {
        body += rect(45,20,150,150);
        body += line(45,20,195,170) + line(195,20,45,170);
    } else if (pattern === 'square_grid_2') {
        body += rect(45,20,150,150);
        body += line(120,20,120,170) + line(45,95,195,95);
    } else if (pattern === 'square_grid_3') {
        body += rect(45,15,150,150);
        body += line(95,15,95,165) + line(145,15,145,165);
        body += line(45,65,195,65) + line(45,115,195,115);
    } else if (pattern === 'nested_squares_2' || pattern === 'nested_squares_3') {
        body += rect(40,15,160,160);
        body += rect(75,50,90,90);
        if (pattern === 'nested_squares_3') body += rect(98,73,44,44);
    } else if (pattern === 'rect_cols_3' || pattern === 'rect_cols_4') {
        const cols = pattern === 'rect_cols_3' ? 3 : 4;
        const x0=25, y0=48, w=190, h=82;
        body += rect(x0,y0,w,h);
        for (let i=1;i<cols;i++) body += line(x0+w*i/cols,y0,x0+w*i/cols,y0+h);
    } else if (pattern === 'rect_grid_2x2') {
        const x0=25,y0=40,w=190,h=100;
        body += rect(x0,y0,w,h);
        body += line(x0+w/2,y0,x0+w/2,y0+h) + line(x0,y0+h/2,x0+w,y0+h/2);
    } else if (pattern === 'rect_grid_3x2') {
        const x0=15,y0=40,w=210,h=100;
        body += rect(x0,y0,w,h);
        body += line(x0+w/3,y0,x0+w/3,y0+h) + line(x0+2*w/3,y0,x0+2*w/3,y0+h);
        body += line(x0,y0+h/2,x0+w,y0+h/2);
    }

    return `<svg viewBox="0 0 240 190" class="w-full max-w-[430px] h-auto" aria-hidden="true">${body}</svg>`;
}

function buildMuc5SceneVisual_(q) {
    const v = q?.muc5_visual || {};
    const t = q?.muc5_type || '';
    if (t === 'flat_identify') {
        return `<div class="flex flex-col items-center"><div class="rounded-3xl border-2 border-violet-100 bg-white p-5 shadow-sm">${muc5ShapeSvg_(v.target,{size:150,color:v.color||'#93c5fd',rotate:v.rotate||0})}</div><div class="mt-2 text-sm font-bold text-slate-500">Con nhìn đường bao của hình nhé.</div></div>`;
    }
    if (t === 'flat_match') {
        return `<div class="flex flex-col items-center"><div class="text-sm md:text-base font-black text-slate-500 mb-2">Hình mẫu</div><div class="rounded-3xl border-2 border-violet-200 bg-violet-50/50 p-4 shadow-sm">${muc5ShapeSvg_(v.target,{size:130,color:v.color||'#93c5fd',rotate:v.rotate||0})}</div></div>`;
    }
    if (t === 'flat_odd') {
        return `<div class="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-center font-black text-amber-800">Ba hình cùng loại, chỉ có một hình khác. Con quan sát từng đáp án nhé.</div>`;
    }
    if (t === 'shape_property') {
        return `<div class="flex flex-col items-center"><div class="rounded-3xl border-2 border-violet-100 bg-white p-5 shadow-sm">${muc5ShapeSvg_(v.target,{size:150,color:v.color||'#93c5fd',rotate:v.rotate||0})}</div><div class="mt-2 text-sm font-bold text-slate-500">Con nhìn kĩ số cạnh và các góc của hình nhé.</div></div>`;
    }
    if (t === 'compose_missing' || t === 'compose_parts') {
        return `<div class="w-full max-w-xl rounded-[28px] border-2 border-pink-100 bg-gradient-to-br from-white to-sky-50 p-4 shadow-sm"><div class="text-center text-sm md:text-base font-black text-violet-700 mb-2">${t === 'compose_missing' ? 'Chỗ trống cần mảnh nào?' : 'Con tách hình lớn thành các mảnh nhỏ nhé.'}</div><div class="flex items-center justify-center">${muc5ComposeSceneSvg_(v.scene, v.missing, t === 'compose_missing')}</div><div class="mt-1 text-center text-xs md:text-sm font-bold text-slate-500">${escapeHtml(v.scene||'hình ghép')} · Có thể xoay mảnh khi ghép.</div></div>`;
    }
    if (t === 'solid_identify') {
        return `<div class="rounded-[28px] border-2 border-sky-100 bg-white p-5 shadow-sm">${muc5SolidSvg_(v.solid,{size:v.solid==='cuboid'?180:155,fill1:'#dbeafe',fill2:'#93c5fd',fill3:'#60a5fa'})}</div>`;
    }
    if (t === 'solid_object') {
        const solid = v.solid === 'cuboid' ? 'cuboid' : 'cube';
        return `<div class="flex flex-col items-center rounded-[28px] border-2 border-emerald-100 bg-gradient-to-br from-white to-emerald-50 p-5 shadow-sm"><div class="rounded-3xl border border-sky-100 bg-white px-6 py-4">${muc5SolidSvg_(solid,{size:solid==='cuboid'?190:165,fill1:'#dbeafe',fill2:'#93c5fd',fill3:'#60a5fa'})}</div><div class="mt-3 text-lg md:text-xl font-black text-emerald-700">${escapeHtml(v.objectLabel||'Đồ vật')}</div><div class="mt-1 text-sm md:text-base font-bold text-slate-500">Con quan sát dạng khối của đồ vật nhé.</div></div>`;
    }
    if (t === 'shape_count_advanced') {
        return `<div class="w-full max-w-xl rounded-[28px] border-2 border-violet-100 bg-gradient-to-br from-white to-violet-50 p-4 shadow-sm"><div class="text-center text-sm md:text-base font-black text-violet-700 mb-2">🔎 Con đếm cả hình nhỏ và hình ghép lớn nhé.</div><div class="flex items-center justify-center">${muc5AdvancedCountSvg_(v.pattern)}</div><div class="mt-1 text-center text-xs md:text-sm font-bold text-slate-500">Mẹo: đếm theo kích thước để không bỏ sót.</div></div>`;
    }
    return '';
}

function buildMuc5QuestionLayout_(q, speakerHtml) {
    const v = q?.muc5_visual || {};
    const visual = buildMuc5SceneVisual_(q);
    const isVisualChoice = Array.isArray(v.optionShapes) && v.optionShapes.length === q.options.length;
    const optionsHtml = q.options.map((opt, idx) => {
        let icon = '';
        if (isVisualChoice) {
            icon = muc5ShapeSvg_(v.optionShapes[idx], {size:62,color:['#fde68a','#bfdbfe','#bbf7d0','#fecdd3'][idx%4],rotate:[0,18,35,50][idx%4]});
        } else {
            icon = muc5OptionIcon_(opt);
        }
        const letter = String.fromCharCode(65+idx);
        const label = isVisualChoice ? '' : capitalizeFirstLetter(opt);
        return `<button data-opt="${escapeHtml(opt)}" onclick="checkAnswer('${String(opt).replace(/'/g,"\\'")}')" class="option-btn w-full min-h-[74px] px-2.5 py-2 bg-pink-50/40 hover:bg-pink-100/70 border-2 border-pink-200 rounded-2xl font-extrabold text-slate-800 transition-all flex items-center justify-center gap-2 text-center shadow-xs pastel-btn"><strong class="text-pink-600 text-base md:text-lg">${letter}.</strong>${icon}<span class="opt-text text-sm md:text-base lg:text-lg">${escapeHtml(label)}</span><span class="option-icon text-pink-500"></span></button>`;
    }).join('');

    return `<div class="w-full max-w-6xl grid grid-cols-1 md:grid-cols-[1.12fr_0.88fr] gap-4 items-stretch py-1">
        <div class="min-h-[280px] rounded-[28px] border-2 border-pink-100 bg-gradient-to-br from-amber-50 via-white to-sky-50 px-3 py-4 md:px-5 md:py-5 flex items-center justify-center overflow-hidden shadow-sm">${visual}</div>
        <div class="rounded-[28px] border border-pink-100 bg-white/95 px-3 py-4 md:px-5 md:py-5 flex flex-col justify-center shadow-sm">
            <h3 class="text-lg md:text-xl lg:text-[22px] font-black text-slate-900 leading-snug text-center">${escapeHtml(q.question_text)}</h3>
            ${speakerHtml}
            <div class="grid grid-cols-2 gap-2.5 mt-3">${optionsHtml}</div>
            <div id="muc5-solution-host">${buildMuc5SolutionHtml_(q)}</div>
        </div>
    </div>`;
}

function refreshMuc5SolutionHost_(q) {
    if (!(Number(activeTopicId) === 5 || !!activeRoadmapContext) || !/^5\./.test(String(q?.sub_topic||''))) return;
    const host = document.getElementById('muc5-solution-host');
    if (host) host.innerHTML = buildMuc5SolutionHtml_(q);
}


function speakMuc5SelectedShape_(q, selectedOpt) {
    if (!(Number(activeTopicId) === 5 || !!activeRoadmapContext) || q?.muc5_type !== 'flat_odd') return false;
    const optionShapes = q?.muc5_visual?.optionShapes;
    if (!Array.isArray(optionShapes)) return false;
    const idx = (q.options || []).indexOf(selectedOpt);
    if (idx < 0 || !optionShapes[idx]) return false;
    const shapeName = muc5ShapeName_(optionShapes[idx]);
    setTimeout(() => speakVietnamese(shapeName, 0.94), 180);
    return true;
}


function muc6FaceColorLabel_(face) {
    return face?.name || '';
}

function muc6CuboidSvg_(visual) {
    const front = visual?.front || {name:'Đỏ',color:'#ef4444'};
    const top = visual?.top || {name:'Xanh dương',color:'#3b82f6'};
    const right = visual?.right || {name:'Vàng',color:'#facc15'};
    return `
        <svg viewBox="0 0 360 300" class="w-full max-w-[390px] h-auto" role="img" aria-label="Khối hộp có ba mặt màu khác nhau">
            <defs>
                <filter id="muc6shadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="9" stdDeviation="7" flood-color="#94a3b8" flood-opacity="0.32"/>
                </filter>
            </defs>
            <g filter="url(#muc6shadow)" stroke="#334155" stroke-width="5" stroke-linejoin="round">
                <polygon points="70,105 205,48 305,102 170,160" fill="${escapeHtml(top.color)}"></polygon>
                <polygon points="70,105 170,160 170,267 70,212" fill="${escapeHtml(front.color)}"></polygon>
                <polygon points="170,160 305,102 305,210 170,267" fill="${escapeHtml(right.color)}"></polygon>
            </g>
            <g font-family="Nunito, Arial, sans-serif" font-weight="900" text-anchor="middle">
                <text x="185" y="104" font-size="20" fill="#0f172a">MẶT TRÊN</text>
                <text x="118" y="196" font-size="18" fill="#0f172a">MẶT TRƯỚC</text>
                <text x="238" y="193" font-size="18" fill="#0f172a">MẶT BÊN</text>
            </g>
        </svg>`;
}

function muc6StageGuide_(q) {
    const stage = String(q?.sub_topic || '');
    if (stage === '6.1') return 'Chọn một vật làm mốc rồi nhìn theo chiều trên – dưới.';
    if (stage === '6.2') return 'Quan sát vật nào ở gần phía trước, vật nào ở xa phía sau hoặc nằm giữa.';
    if (stage === '6.3') return 'Nhìn theo hướng của con ở trước màn hình để phân biệt bên trái và bên phải.';
    if (stage === '6.4') return 'Đọc đúng hướng “từ trái sang phải” hoặc “từ phải sang trái” rồi mới đếm thứ tự.';
    if (stage === '6.5') return 'Nhìn đúng mặt được hỏi: mặt trước, mặt trên hay mặt bên phải.';
    if (stage === '6.6') return 'Câu tổng hợp có từ hai điều kiện. Kiểm tra từng điều kiện một rồi mới chọn.';
    return 'Quan sát tranh thật kĩ rồi mới trả lời.';
}

function buildMuc6QuestionLayout_(q, speakerHtml, isEvaluationMode = false) {
    const isFaces = q?.muc6_type === 'faces' || String(q?.sub_topic || '') === '6.5';
    const stageLabel = beautifySubtopicName(q?.sub_topic_label) || 'Quan sát vị trí';
    let visualHtml = '';

    if (isFaces) {
        visualHtml = `
            <div class="w-full h-full flex flex-col items-center justify-center p-2">
                ${muc6CuboidSvg_(q?.muc6_visual || {})}
            </div>`;
    } else if (q?.image_url) {
        visualHtml = `
            <div class="w-full h-full flex items-center justify-center">
                <img src="${escapeHtml(q.image_url)}" alt="Tranh minh họa cho câu hỏi vị trí" class="w-full h-full max-h-[470px] object-contain rounded-2xl" onerror="this.closest('.muc6-image-shell').innerHTML='<div class=&quot;text-center text-rose-600 font-black p-6&quot;>Chưa tìm thấy hình minh họa.<br><span class=&quot;text-sm text-slate-500&quot;>${escapeHtml(q.image_url)}</span></div>'">
            </div>`;
    } else {
        visualHtml = `<div class="min-h-[380px] flex items-center justify-center text-center text-slate-500 font-bold">Chưa có hình minh họa cho câu này.</div>`;
    }

    const optionsHtml = (q.options || []).map((opt, idx) => {
        const letter = String.fromCharCode(65 + idx);
        const optionThemes = [
            'border-pink-200 bg-pink-50/55 hover:bg-pink-100/80',
            'border-sky-200 bg-sky-50/55 hover:bg-sky-100/80',
            'border-amber-200 bg-amber-50/55 hover:bg-amber-100/80',
            'border-emerald-200 bg-emerald-50/55 hover:bg-emerald-100/80'
        ];
        const letterThemes = ['text-pink-600','text-sky-600','text-amber-600','text-emerald-600'];
        return `<button data-opt="${escapeHtml(opt)}" onclick="checkAnswer('${escapeJsString_(opt)}')" class="option-btn w-full min-h-[64px] px-4 py-3 ${optionThemes[idx % optionThemes.length]} border-2 rounded-2xl font-extrabold text-slate-800 transition-all flex items-center justify-start gap-3 text-left shadow-xs pastel-btn">
            <strong class="${letterThemes[idx % letterThemes.length]} text-xl md:text-2xl shrink-0 w-8">${letter}.</strong>
            <span class="opt-text text-lg md:text-xl lg:text-[22px] leading-snug">${escapeHtml(capitalizeFirstLetter(opt))}</span>
            <span class="option-icon ml-auto"></span>
        </button>`;
    }).join('');

    const guide = isEvaluationMode ? '' : `
        <div class="mt-2 text-center text-sm md:text-base font-extrabold text-slate-600">
            👀 ${escapeHtml(muc6StageGuide_(q))}
        </div>`;

    return `
        <div class="w-full max-w-6xl mx-auto rounded-[30px] border-2 border-pink-100 bg-white/95 p-3 md:p-4 shadow-sm">
            <div class="grid grid-cols-1 md:grid-cols-[0.94fr_1.06fr] gap-3 md:gap-4 items-stretch">
                <div class="muc6-image-shell relative min-h-[380px] md:min-h-[430px] rounded-[24px] border-2 border-sky-100 bg-gradient-to-br from-sky-50 via-white to-amber-50 p-2.5 flex items-center justify-center overflow-hidden">
                    ${visualHtml}
                    <div class="absolute left-3 bottom-3 rounded-full border-2 border-pink-200 bg-white/95 px-4 py-1.5 text-sm md:text-base font-black text-pink-600 shadow-sm">${escapeHtml(stageLabel)}</div>
                </div>

                <div class="rounded-[24px] border-2 border-pink-100 bg-gradient-to-br from-white via-pink-50/20 to-sky-50/30 px-3 py-4 md:px-5 md:py-5 flex flex-col justify-center">
                    <h3 class="text-xl md:text-2xl lg:text-[27px] font-black text-slate-900 leading-snug text-center">${escapeHtml(q.question_text)}</h3>
                    ${speakerHtml}
                    <div class="grid grid-cols-1 gap-2.5 mt-3">${optionsHtml}</div>
                    ${guide}
                </div>
            </div>
        </div>`;
}


function muc7StageGuide_(q) {
    const stage = String(q?.sub_topic || '');
    if (stage === '7.1') return 'Đặt các vật cùng điểm đầu rồi so nơi chúng kết thúc.';
    if (stage === '7.2') return 'Các vật phải cùng mặt đất hoặc mặt bàn rồi mới so chiều cao.';
    if (stage === '7.3') return 'Đếm các đơn vị được đặt nối tiếp, không để hở và không chồng lên nhau.';
    if (stage === '7.4') return 'Đặt một đầu vật đúng vạch 0 rồi đọc vạch ở đầu còn lại.';
    if (stage === '7.5') return 'Ước lượng là đoán gần đúng trước khi dùng thước kiểm tra.';
    if (stage === '7.6') return 'Đọc kĩ số đo và điều kiện rồi mới so sánh hoặc lựa chọn.';
    return 'Quan sát mô hình rồi trả lời.';
}

function muc7LengthVisualSvg_(visual, vertical = false) {
    const items = Array.isArray(visual?.items) ? visual.items : [];
    if (vertical) {
        const baseline = 275;
        const xPos = items.length === 2 ? [180, 340] : [135, 260, 385];
        const bodies = items.map((it, idx) => {
            const h = Math.max(60, Math.min(190, Number(it.height || 6) * 13));
            const x = xPos[idx] || (120 + idx * 130);
            const color = escapeHtml(it.color || '#60a5fa');
            return `<g>
                <line x1="${x}" y1="${baseline}" x2="${x}" y2="${baseline-h+28}" stroke="#8b5a2b" stroke-width="12" stroke-linecap="round"></line>
                <circle cx="${x}" cy="${baseline-h+20}" r="35" fill="${color}" stroke="#334155" stroke-width="3"></circle>
                <line x1="${x-46}" y1="${baseline}" x2="${x+46}" y2="${baseline}" stroke="#94a3b8" stroke-width="3"></line>
                <text x="${x}" y="${baseline+28}" text-anchor="middle" font-size="21" font-weight="900" fill="#0f172a">${escapeHtml(it.label || '')}</text>
            </g>`;
        }).join('');
        return `<svg viewBox="0 0 520 330" class="w-full h-auto max-h-[410px]" role="img" aria-label="Mô hình so sánh chiều cao">
            <rect x="25" y="18" width="470" height="290" rx="28" fill="#f0fdf4" stroke="#bbf7d0" stroke-width="3"></rect>
            <line x1="55" y1="275" x2="465" y2="275" stroke="#64748b" stroke-width="4"></line>
            ${bodies}
            <text x="260" y="50" text-anchor="middle" font-size="18" font-weight="900" fill="#047857">Cùng một mặt đất</text>
        </svg>`;
    }

    const yPos = items.length === 2 ? [125, 220] : [92, 173, 254];
    const rows = items.map((it, idx) => {
        const len = Math.max(85, Math.min(340, Number(it.length || 6) * 24));
        const y = yPos[idx] || (90 + idx * 80);
        const color = escapeHtml(it.color || '#38bdf8');
        return `<g>
            <text x="62" y="${y+7}" text-anchor="middle" font-size="22" font-weight="900" fill="#0f172a">${escapeHtml(it.label || '')}</text>
            <rect x="105" y="${y-17}" width="${len}" height="34" rx="16" fill="${color}" stroke="#334155" stroke-width="3"></rect>
            <polygon points="${105+len},${y-17} ${105+len+24},${y} ${105+len},${y+17}" fill="#fde68a" stroke="#334155" stroke-width="3"></polygon>
        </g>`;
    }).join('');
    return `<svg viewBox="0 0 520 330" class="w-full h-auto max-h-[410px]" role="img" aria-label="Mô hình so sánh độ dài">
        <rect x="25" y="18" width="470" height="290" rx="28" fill="#eff6ff" stroke="#bfdbfe" stroke-width="3"></rect>
        <line x1="105" y1="55" x2="105" y2="286" stroke="#ef4444" stroke-width="4" stroke-dasharray="7 7"></line>
        <text x="105" y="43" text-anchor="middle" font-size="16" font-weight="900" fill="#dc2626">CÙNG MỐC</text>
        ${rows}
    </svg>`;
}

function muc7NonstandardSvg_(visual) {
    const count = Math.max(1, Math.min(12, Number(visual?.count || 4)));
    const unit = String(visual?.unit || 'gang');
    const label = unit === 'gang' ? 'gang tay' : (unit === 'sai' ? 'sải tay' : 'bước chân');
    const totalW = 390;
    const seg = totalW / count;
    let marks = '';
    for (let i=0;i<count;i++) {
        const x=65+i*seg;
        if (unit === 'buoc') {
            marks += `<g transform="translate(${x+seg/2-9},205) rotate(${i%2?10:-10})"><ellipse cx="0" cy="0" rx="8" ry="18" fill="#a78bfa"></ellipse><circle cx="0" cy="-20" r="5" fill="#a78bfa"></circle></g>`;
        } else if (unit === 'sai') {
            marks += `<g><circle cx="${x+seg/2}" cy="192" r="8" fill="#f59e0b"></circle><line x1="${x+6}" y1="208" x2="${x+seg-6}" y2="208" stroke="#f59e0b" stroke-width="6" stroke-linecap="round"></line><line x1="${x+seg/2}" y1="200" x2="${x+seg/2}" y2="226" stroke="#f59e0b" stroke-width="5"></line></g>`;
        } else {
            marks += `<g><line x1="${x+4}" y1="208" x2="${x+seg-4}" y2="208" stroke="#10b981" stroke-width="5" stroke-linecap="round"></line><line x1="${x+4}" y1="197" x2="${x+4}" y2="219" stroke="#10b981" stroke-width="4"></line><line x1="${x+seg-4}" y1="197" x2="${x+seg-4}" y2="219" stroke="#10b981" stroke-width="4"></line></g>`;
        }
    }
    return `<svg viewBox="0 0 520 330" class="w-full h-auto max-h-[410px]" role="img" aria-label="Mô hình đo bằng ${escapeHtml(label)}">
        <rect x="25" y="18" width="470" height="290" rx="28" fill="#fff7ed" stroke="#fed7aa" stroke-width="3"></rect>
        <text x="260" y="58" text-anchor="middle" font-size="21" font-weight="900" fill="#9a3412">${escapeHtml(String(visual?.object || 'Đồ vật'))}</text>
        <rect x="65" y="92" width="390" height="65" rx="16" fill="#fdba74" stroke="#9a3412" stroke-width="3"></rect>
        <line x1="65" y1="174" x2="455" y2="174" stroke="#64748b" stroke-width="3"></line>
        ${marks}
        <text x="260" y="275" text-anchor="middle" font-size="19" font-weight="900" fill="#475569">Đếm số ${escapeHtml(label)} được đặt nối tiếp</text>
    </svg>`;
}

function muc7RulerTicks_(max=15, y=245, x0=48, scale=28) {
    let s='';
    for (let i=0;i<=max;i++) {
        const x=x0+i*scale;
        const h=i%5===0?26:18;
        s += `<line x1="${x}" y1="${y}" x2="${x}" y2="${y-h}" stroke="#334155" stroke-width="2"></line>`;
        s += `<text x="${x}" y="${y+23}" text-anchor="middle" font-size="16" font-weight="800" fill="#334155">${i}</text>`;
    }
    return s;
}

function muc7RulerSvg_(visual) {
    const max=Math.max(10,Math.min(15,Number(visual?.max||15)));
    const len=Math.max(1,Math.min(max,Number(visual?.length||8)));
    const start=Math.max(0,Math.min(max-1,Number(visual?.start||0)));
    const x0=48, scale=28, y=245;
    const sx=x0+start*scale, ex=x0+Math.min(max,start+len)*scale;
    return `<svg viewBox="0 0 520 330" class="w-full h-auto max-h-[410px]" role="img" aria-label="Thước đo xăng-ti-mét">
        <rect x="24" y="18" width="472" height="290" rx="28" fill="#fefce8" stroke="#fde68a" stroke-width="3"></rect>
        <text x="260" y="53" text-anchor="middle" font-size="20" font-weight="900" fill="#a16207">${escapeHtml(String(visual?.object||'Vật cần đo'))}</text>
        <rect x="${sx}" y="105" width="${Math.max(35,ex-sx)}" height="38" rx="14" fill="#60a5fa" stroke="#1e3a8a" stroke-width="3"></rect>
        <polygon points="${ex},105 ${ex+22},124 ${ex},143" fill="#fde68a" stroke="#1e3a8a" stroke-width="3"></polygon>
        <rect x="${x0-8}" y="210" width="${max*scale+16}" height="52" rx="8" fill="#facc15" opacity="0.72"></rect>
        ${muc7RulerTicks_(max,y,x0,scale)}
        <text x="475" y="286" text-anchor="end" font-size="16" font-weight="900" fill="#a16207">cm</text>
    </svg>`;
}

function muc7RulerPlacementSvg_(visual) {
    const placements=Array.isArray(visual?.placements)?visual.placements:[];
    const max=15, x0=108, scale=20;
    const rows=placements.map((p,idx)=>{
        const y=72+idx*62;
        const sx=x0+Number(p.start||0)*scale;
        const ex=sx+Number(p.length||7)*scale;
        let ticks='';
        for(let i=0;i<=max;i++){
            const x=x0+i*scale;
            ticks+=`<line x1="${x}" y1="${y+28}" x2="${x}" y2="${y+18}" stroke="#475569" stroke-width="1.5"></line>`;
            if(i%5===0) ticks+=`<text x="${x}" y="${y+45}" text-anchor="middle" font-size="16" fill="#475569">${i}</text>`;
        }
        return `<g><text x="62" y="${y+8}" text-anchor="middle" font-size="20" font-weight="900" fill="#be123c">${escapeHtml(p.label||'')}</text><line x1="${x0}" y1="${y+28}" x2="${x0+max*scale}" y2="${y+28}" stroke="#94a3b8" stroke-width="2"></line>${ticks}<rect x="${sx}" y="${y-10}" width="${Math.max(30,ex-sx)}" height="23" rx="9" fill="#38bdf8" stroke="#075985" stroke-width="2"></rect></g>`;
    }).join('');
    return `<svg viewBox="0 0 520 340" class="w-full h-auto max-h-[430px]" role="img" aria-label="Bốn cách đặt vật lên thước"><rect x="22" y="15" width="476" height="310" rx="26" fill="#f0f9ff" stroke="#bae6fd" stroke-width="3"></rect>${rows}</svg>`;
}

function muc7EstimateSvg_(visual) {
    const obj=escapeHtml(String(visual?.object||'Đồ vật'));
    return `<svg viewBox="0 0 520 330" class="w-full h-auto max-h-[410px]" role="img" aria-label="Ước lượng độ dài">
        <rect x="25" y="18" width="470" height="290" rx="28" fill="#faf5ff" stroke="#e9d5ff" stroke-width="3"></rect>
        <text x="260" y="60" text-anchor="middle" font-size="23" font-weight="900" fill="#7e22ce">${obj}</text>
        <rect x="120" y="118" width="280" height="55" rx="24" fill="#c4b5fd" stroke="#6d28d9" stroke-width="4"></rect>
        <polygon points="400,118 435,145 400,173" fill="#fde68a" stroke="#6d28d9" stroke-width="4"></polygon>
        <path d="M120 218 H400" stroke="#94a3b8" stroke-width="4" stroke-dasharray="9 8"></path>
        <text x="260" y="258" text-anchor="middle" font-size="34" font-weight="900" fill="#9333ea">? cm</text>
        <text x="260" y="292" text-anchor="middle" font-size="16" font-weight="800" fill="#64748b">Đoán gần đúng trước khi dùng thước</text>
    </svg>`;
}

function muc7MeasuredSetSvg_(visual, fitMode=false) {
    const items=Array.isArray(visual?.items)?visual.items:[];
    const maxLen=Math.max(1,...items.map(x=>Number(x.length||1)),Number(visual?.target||0),Number(visual?.threshold||0));
    const scale=Math.min(15,310/maxLen);
    const rows=items.map((it,idx)=>{
        const y=102+idx*48;
        const w=Math.max(35,Number(it.length||1)*scale);
        return `<g><text x="62" y="${y+8}" text-anchor="middle" font-size="20" font-weight="900" fill="#0f172a">${escapeHtml(it.label||'')}</text><rect x="100" y="${y-13}" width="${w}" height="27" rx="12" fill="${['#fb7185','#38bdf8','#34d399','#fbbf24'][idx%4]}" stroke="#334155" stroke-width="2"></rect><text x="${Math.min(458,115+w)}" y="${y+7}" font-size="17" font-weight="900" fill="#475569">${Number(it.length||0)} cm</text></g>`;
    }).join('');
    const target=Number(visual?.target||visual?.threshold||0);
    const title=fitMode?`Hộp bút: ${target} cm`:(visual?.relation?`Mốc so sánh: ${target} cm`:'So sánh các số đo');
    return `<svg viewBox="0 0 520 340" class="w-full h-auto max-h-[430px]" role="img" aria-label="Các vật có số đo khác nhau"><rect x="22" y="15" width="476" height="310" rx="26" fill="#ecfdf5" stroke="#a7f3d0" stroke-width="3"></rect><text x="260" y="58" text-anchor="middle" font-size="21" font-weight="900" fill="#047857">${escapeHtml(title)}</text>${rows}</svg>`;
}

function muc7ReasoningSvg_(visual) {
    const kind=String(visual?.kind||'');
    let inner='';
    if(kind==='align_start') inner=`<line x1="115" y1="100" x2="115" y2="250" stroke="#ef4444" stroke-width="5" stroke-dasharray="8 7"></line><rect x="115" y="125" width="250" height="34" rx="14" fill="#60a5fa"></rect><rect x="160" y="200" width="210" height="34" rx="14" fill="#fbbf24"></rect>`;
    else if(kind==='start_zero') inner=muc7RulerSvg_({length:8,start:1,max:15,object:'Bút đặt lệch vạch 0'}).replace(/^<svg[^>]*>|<\/svg>$/g,'');
    else inner=`<rect x="105" y="118" width="310" height="70" rx="25" fill="#dbeafe" stroke="#3b82f6" stroke-width="4"></rect><text x="260" y="162" text-anchor="middle" font-size="27" font-weight="900" fill="#1d4ed8">ĐO • SO SÁNH • KIỂM TRA</text>`;
    return `<svg viewBox="0 0 520 330" class="w-full h-auto max-h-[410px]" role="img" aria-label="Mô hình suy luận đo độ dài"><rect x="25" y="18" width="470" height="290" rx="28" fill="#f8fafc" stroke="#cbd5e1" stroke-width="3"></rect>${inner}</svg>`;
}

function muc7VisualHtml_(q) {
    const t=String(q?.muc7_type||'');
    const v=q?.muc7_visual||{};
    if(t==='length_pair'||t==='length_set') return muc7LengthVisualSvg_(v,false);
    if(t==='height_pair'||t==='height_set') return muc7LengthVisualSvg_(v,true);
    if(t==='nonstandard') return muc7NonstandardSvg_(v);
    if(t==='ruler_read') return muc7RulerSvg_(v);
    if(t==='ruler_placement') return muc7RulerPlacementSvg_(v);
    if(t==='estimate') return muc7EstimateSvg_(v);
    if(t==='fit_case') return muc7MeasuredSetSvg_(v,true);
    if(t==='measured_set') return muc7MeasuredSetSvg_(v,false);
    if(t==='reasoning') return muc7ReasoningSvg_(v);
    if(t==='cm_concept') return `<div class="w-full h-full min-h-[330px] flex flex-col items-center justify-center rounded-3xl bg-gradient-to-br from-yellow-50 to-sky-50 border-2 border-yellow-200"><svg viewBox="0 0 360 130" class="w-full max-w-[360px] h-auto"><rect x="25" y="36" width="310" height="58" rx="10" fill="#facc15" stroke="#92400e" stroke-width="4"></rect>${muc7RulerTicks_(10,94,40,28)}</svg><div class="mt-1 text-5xl md:text-6xl font-black text-emerald-700">cm</div><div class="mt-3 text-lg font-extrabold text-slate-600">xăng-ti-mét</div></div>`;
    return `<div class="min-h-[350px] flex items-center justify-center font-black text-slate-500">Quan sát mô hình đo độ dài</div>`;
}

function buildMuc7QuestionLayout_(q, speakerHtml, isEvaluationMode=false) {
    const stageLabel=beautifySubtopicName(q?.sub_topic_label)||'Độ dài và đo độ dài';
    const optionsHtml=(q.options||[]).map((opt,idx)=>{
        const letter=String.fromCharCode(65+idx);
        const themes=['border-emerald-200 bg-emerald-50/60 hover:bg-emerald-100','border-sky-200 bg-sky-50/60 hover:bg-sky-100','border-amber-200 bg-amber-50/60 hover:bg-amber-100','border-violet-200 bg-violet-50/60 hover:bg-violet-100'];
        const letters=['text-emerald-700','text-sky-700','text-amber-700','text-violet-700'];
        return `<button data-opt="${escapeHtml(opt)}" onclick="checkAnswer('${escapeJsString_(opt)}')" class="option-btn w-full min-h-[64px] px-4 py-3 ${themes[idx%4]} border-2 rounded-2xl font-extrabold text-slate-800 transition-all flex items-center justify-start gap-3 text-left shadow-xs pastel-btn"><strong class="${letters[idx%4]} text-xl md:text-2xl shrink-0 w-8">${letter}.</strong><span class="opt-text text-lg md:text-xl lg:text-[22px] leading-snug">${escapeHtml(capitalizeFirstLetter(opt))}</span><span class="option-icon ml-auto"></span></button>`;
    }).join('');
    const guide=isEvaluationMode?'':`<div class="mt-2 text-center text-sm md:text-base font-extrabold text-slate-600">${escapeHtml(muc7StageGuide_(q))}</div>`;
    return `<div class="w-full max-w-6xl mx-auto rounded-[30px] border-2 border-emerald-100 bg-white/95 p-3 md:p-4 shadow-sm"><div class="grid grid-cols-1 md:grid-cols-[1.02fr_0.98fr] gap-3 md:gap-4 items-stretch"><div class="relative min-h-[390px] md:min-h-[440px] rounded-[24px] border-2 border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-sky-50 p-2.5 flex items-center justify-center overflow-hidden">${muc7VisualHtml_(q)}<div class="absolute left-3 bottom-3 rounded-full border-2 border-emerald-200 bg-white/95 px-4 py-1.5 text-sm md:text-base font-black text-emerald-700 shadow-sm">${escapeHtml(stageLabel)}</div></div><div class="rounded-[24px] border-2 border-emerald-100 bg-gradient-to-br from-white via-emerald-50/20 to-sky-50/30 px-3 py-4 md:px-5 md:py-5 flex flex-col justify-center"><h3 class="text-xl md:text-2xl lg:text-[27px] font-black text-slate-900 leading-snug text-center">${escapeHtml(q.question_text)}</h3>${speakerHtml}<div class="grid grid-cols-1 gap-2.5 mt-3">${optionsHtml}</div>${guide}</div></div></div>`;
}


function muc8ClockSvg_(hour, minute = 0, opts = {}) {
    const size = opts.size || 300;
    const cx = 160, cy = 160, r = 130;
    const hourAngle = ((Number(hour || 12) % 12) + Number(minute || 0) / 60) * 30 - 90;
    const minuteAngle = Number(minute || 0) * 6 - 90;
    const toPt = (ang, len) => {
        const rad = ang * Math.PI / 180;
        return [cx + Math.cos(rad) * len, cy + Math.sin(rad) * len];
    };
    const hp = toPt(hourAngle, 72);
    const mp = toPt(minuteAngle, 102);
    let nums = '';
    for (let n = 1; n <= 12; n++) {
        const a = n * 30 - 90;
        const [x,y] = toPt(a, 105);
        nums += `<text x="${x.toFixed(1)}" y="${(y+7).toFixed(1)}" text-anchor="middle" font-size="22" font-weight="900" fill="#0f172a">${n}</text>`;
    }
    let ticks='';
    for (let i=0;i<60;i++) {
        const a=i*6-90; const len=i%5===0?12:6;
        const [x1,y1]=toPt(a,r-4); const [x2,y2]=toPt(a,r-4-len);
        ticks += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${i%5===0?'#64748b':'#cbd5e1'}" stroke-width="${i%5===0?3:1.4}" stroke-linecap="round"/>`;
    }
    return `<svg viewBox="0 0 320 320" class="w-full h-auto" style="max-width:${size}px" role="img" aria-label="Đồng hồ chỉ ${hour} giờ">
        <circle cx="160" cy="160" r="142" fill="#fff" stroke="#60a5fa" stroke-width="10"/>
        <circle cx="160" cy="160" r="132" fill="#eff6ff" stroke="#bfdbfe" stroke-width="2"/>
        ${ticks}${nums}
        <line x1="160" y1="160" x2="${hp[0]}" y2="${hp[1]}" stroke="#ef4444" stroke-width="10" stroke-linecap="round"/>
        <line x1="160" y1="160" x2="${mp[0]}" y2="${mp[1]}" stroke="#0f172a" stroke-width="6" stroke-linecap="round"/>
        <circle cx="160" cy="160" r="9" fill="#0f172a"/><circle cx="160" cy="160" r="4" fill="#fff"/>
    </svg>`;
}

function muc8WeekStripHtml_(v) {
    const days = Array.isArray(v?.days) ? v.days : ['Thứ Hai','Thứ Ba','Thứ Tư','Thứ Năm','Thứ Sáu','Thứ Bảy','Chủ nhật'];
    return `<div class="w-full max-w-2xl"><div class="grid grid-cols-2 md:grid-cols-4 gap-2">${days.map((d,i)=>{
        const hi = d === v?.highlight;
        return `<div class="rounded-2xl border-2 ${hi?'border-blue-400 bg-blue-100':'border-slate-200 bg-white'} px-3 py-3 text-center shadow-xs"><div class="text-xs font-black text-slate-500">NGÀY ${i+1}</div><div class="mt-1 text-base md:text-lg font-black ${hi?'text-blue-700':'text-slate-800'}">${escapeHtml(d)}</div></div>`;
    }).join('')}</div><div class="mt-3 text-center text-sm font-black text-blue-700">Một tuần có 7 ngày</div></div>`;
}

function muc8DateStripHtml_(v) {
    const cards=[['Hôm qua',v?.yesterday_day,v?.yesterday_date,'amber'],['Hôm nay',v?.today_day,v?.today_date,'blue'],['Ngày mai',v?.tomorrow_day,v?.tomorrow_date,'emerald']];
    return `<div class="w-full max-w-2xl grid grid-cols-1 md:grid-cols-3 gap-3">${cards.map(([label,day,date,tone],idx)=>`<div class="rounded-[24px] border-2 ${tone==='blue'?'border-blue-300 bg-blue-50':tone==='amber'?'border-amber-300 bg-amber-50':'border-emerald-300 bg-emerald-50'} p-4 text-center shadow-sm"><div class="text-sm font-black text-slate-500">${label}</div><div class="mt-1 text-lg md:text-xl font-black text-slate-800">${escapeHtml(day||'')}</div><div class="mt-2 text-4xl font-black ${tone==='blue'?'text-blue-700':tone==='amber'?'text-amber-700':'text-emerald-700'}">${date ?? '?'}</div></div>`).join('')}</div>`;
}

function muc8ScheduleHtml_(v) {
    const sch=v?.schedule || {};
    const rows=Object.entries(sch);
    return `<div class="w-full max-w-2xl rounded-[24px] border-2 border-blue-200 bg-white overflow-hidden shadow-sm"><div class="bg-blue-100 px-4 py-2 text-center text-lg font-black text-blue-800">${escapeHtml(v?.title||'Lịch hoạt động')}</div><div class="grid grid-cols-[0.9fr_1fr_1fr] text-center font-black text-sm md:text-base"><div class="bg-slate-100 p-2 border-r border-b">Ngày</div><div class="bg-amber-100 p-2 border-r border-b">🌤 Buổi sáng</div><div class="bg-sky-100 p-2 border-b">🌇 Buổi chiều</div>${rows.map(([d,val])=>{const hi=d===v?.highlight_day;return `<div class="p-2 border-r border-b ${hi?'bg-blue-50 text-blue-800':'bg-white'}">${escapeHtml(d)}</div><div class="p-2 border-r border-b ${hi?'bg-blue-50':''}">${escapeHtml(val[0])}</div><div class="p-2 border-b ${hi?'bg-blue-50':''}">${escapeHtml(val[1])}</div>`}).join('')}</div></div>`;
}

function muc8VisualHtml_(q) {
    const t=String(q?.muc8_type||''); const v=q?.muc8_visual||{};
    if (t==='clock') return `<div class="flex flex-col items-center justify-center">${muc8ClockSvg_(v.hour,v.minute||0,{size:330})}<div class="mt-2 rounded-full bg-blue-50 border border-blue-200 px-4 py-1.5 text-sm font-black text-blue-700">Kim dài màu đen · Kim ngắn màu đỏ</div></div>`;
    if (t==='activity_clock') return `<div class="w-full grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-3 items-center"><div class="rounded-[22px] overflow-hidden border-2 border-blue-100 bg-white"><img src="${escapeHtml(v.image||q.image_url||'')}" alt="Hoạt động hằng ngày" class="w-full max-h-[300px] object-contain"></div><div class="flex flex-col items-center">${muc8ClockSvg_(v.hour,v.minute||0,{size:245})}<div class="mt-1 rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-sm font-black text-rose-700">${escapeHtml(v.activity||'Hoạt động')} · ${escapeHtml(v.period||'')}</div></div></div>`;
    if (t==='week') return muc8WeekStripHtml_(v);
    if (t==='date_strip') return muc8DateStripHtml_(v);
    if (t==='schedule') return muc8ScheduleHtml_(v);
    if (t==='combo') return `<div class="w-full flex flex-col items-center gap-3">${muc8DateStripHtml_(v)}<div class="w-full border-t-2 border-dashed border-blue-200 pt-3 flex justify-center">${muc8ClockSvg_(v.hour,v.minute||0,{size:235})}</div></div>`;
    if (t==='two_clocks') return `<div class="w-full grid grid-cols-1 md:grid-cols-2 gap-5 items-center"><div class="text-center"><div class="text-sm font-black text-emerald-700 mb-1">BẮT ĐẦU</div>${muc8ClockSvg_(v.start_hour,0,{size:230})}<div class="text-xl font-black text-slate-800">${v.start_hour} giờ</div></div><div class="text-center"><div class="text-sm font-black text-rose-700 mb-1">KẾT THÚC</div>${muc8ClockSvg_(v.end_hour,0,{size:230})}<div class="text-xl font-black text-slate-800">${v.end_hour} giờ</div></div></div>`;
    return `<div class="text-center text-slate-500 font-bold">Quan sát thông tin thời gian trong câu hỏi.</div>`;
}

function muc8StageGuide_(q) {
    const s=String(q?.sub_topic||'');
    if (s==='8.1') return 'Giờ đúng: kim dài chỉ 12, kim ngắn cho biết mấy giờ.';
    if (s==='8.2') return 'Quan sát đồng hồ rồi liên hệ với hoạt động trong tranh.';
    if (s==='8.3') return 'Đọc các ngày theo thứ tự từ Thứ Hai đến Chủ nhật.';
    if (s==='8.4') return 'Hôm qua lùi 1 ngày; ngày mai tiến 1 ngày.';
    if (s==='8.5') return 'Đọc đúng hàng ngày và đúng cột buổi sáng hoặc buổi chiều.';
    if (s==='8.6') return 'Câu tổng hợp: tách từng dữ kiện về ngày, giờ và lịch rồi xử lí.';
    return 'Quan sát hình thật kĩ rồi trả lời.';
}

function buildMuc8QuestionLayout_(q, speakerHtml, isEvaluationMode=false) {
    const stageLabel=beautifySubtopicName(q?.sub_topic_label)||'Thời gian và lịch';
    const optionsHtml=(q.options||[]).map((opt,idx)=>{
        const letter=String.fromCharCode(65+idx);
        const themes=['border-blue-200 bg-blue-50/65 hover:bg-blue-100','border-sky-200 bg-sky-50/65 hover:bg-sky-100','border-indigo-200 bg-indigo-50/65 hover:bg-indigo-100','border-violet-200 bg-violet-50/65 hover:bg-violet-100'];
        const letters=['text-blue-700','text-sky-700','text-indigo-700','text-violet-700'];
        return `<button data-opt="${escapeHtml(opt)}" onclick="checkAnswer('${escapeJsString_(opt)}')" class="option-btn w-full min-h-[64px] px-4 py-3 ${themes[idx%4]} border-2 rounded-2xl font-extrabold text-slate-800 transition-all flex items-center justify-start gap-3 text-left shadow-xs pastel-btn"><strong class="${letters[idx%4]} text-xl md:text-2xl shrink-0 w-8">${letter}.</strong><span class="opt-text text-lg md:text-xl lg:text-[22px] leading-snug">${escapeHtml(capitalizeFirstLetter(opt))}</span><span class="option-icon ml-auto"></span></button>`;
    }).join('');
    const guide=isEvaluationMode?'':`<div class="mt-2 text-center text-sm md:text-base font-extrabold text-slate-600">${escapeHtml(muc8StageGuide_(q))}</div>`;
    return `<div class="w-full max-w-6xl mx-auto rounded-[30px] border-2 border-blue-100 bg-white/95 p-3 md:p-4 shadow-sm"><div class="grid grid-cols-1 md:grid-cols-[1.06fr_0.94fr] gap-3 md:gap-4 items-stretch"><div class="relative min-h-[390px] md:min-h-[445px] rounded-[24px] border-2 border-blue-100 bg-gradient-to-br from-sky-50 via-white to-indigo-50 p-3 flex items-center justify-center overflow-hidden">${muc8VisualHtml_(q)}<div class="absolute left-3 bottom-3 rounded-full border-2 border-blue-200 bg-white/95 px-4 py-1.5 text-sm md:text-base font-black text-blue-700 shadow-sm">${escapeHtml(stageLabel)}</div></div><div class="rounded-[24px] border-2 border-blue-100 bg-gradient-to-br from-white via-sky-50/20 to-indigo-50/30 px-3 py-4 md:px-5 md:py-5 flex flex-col justify-center"><h3 class="text-xl md:text-2xl lg:text-[27px] font-black text-slate-900 leading-snug text-center">${escapeHtml(q.question_text)}</h3>${speakerHtml}<div class="grid grid-cols-1 gap-2.5 mt-3">${optionsHtml}</div>${guide}</div></div></div>`;
}


function muc9StageGuide_(q) {
    const stage=String(q?.sub_topic||'');
    if(stage==='9.1') return 'Đọc câu chuyện theo 3 ý: ban đầu có gì → chuyện gì xảy ra → cần tìm gì.';
    if(stage==='9.2') return 'Hình dung số lượng tăng hay giảm rồi mới chọn phép tính.';
    if(stage==='9.3') return 'Hai phần cùng được tính vào một nhóm. Con tìm tất cả.';
    if(stage==='9.4') return 'Một phần rời khỏi nhóm ban đầu. Con tìm số còn lại.';
    if(stage==='9.5') return 'Không săn từ khóa. Hãy kể lại câu chuyện bằng lời của con trước khi tính.';
    if(stage==='9.6') return 'Nối đúng ba bước: câu chuyện → phép tính → câu trả lời.';
    return 'Quan sát tranh và các thẻ dữ kiện rồi kể lại câu chuyện toán học.';
}

function muc9VisualHtml_(q) {
    const v=q?.muc9_visual||{};
    const before=Number(v.before);
    const change=Number(v.change);
    const result=Number(v.result);
    const hasBefore=Number.isFinite(before);
    const hasChange=Number.isFinite(change);
    const hasResult=Number.isFinite(result);
    const isAdd=String(v.action||'')==='add';
    const showOp=!!v.show_operator;
    const item=String(v.item||'đồ vật');
    const unit=String(v.unit||'');
    const img=q?.image_url||'';
    const op=isAdd?'+':'−';
    const verb=isAdd?'Đưa vào cùng nhóm':'Rời khỏi nhóm';
    const changeTone=isAdd?'border-emerald-200 bg-emerald-50 text-emerald-800':'border-amber-200 bg-amber-50 text-amber-800';
    const imageHtml=img?`<img src="${escapeHtml(img)}" alt="Tranh bối cảnh bài toán" class="w-full h-full max-h-[285px] object-contain rounded-2xl" onerror="this.remove()">`:`<div class="min-h-[230px] flex items-center justify-center text-slate-400 font-black">Bối cảnh câu chuyện</div>`;

    const beforeCard=hasBefore?`<div class="flex-1 min-w-[112px] rounded-2xl border-2 border-sky-200 bg-sky-50 px-3 py-2 text-center shadow-sm"><div class="text-xs md:text-sm font-black text-sky-700">BAN ĐẦU</div><div class="text-2xl md:text-3xl font-black text-slate-900">${before}</div><div class="text-xs md:text-sm font-bold text-slate-600 line-clamp-1">${escapeHtml(item)}</div></div>`:'';
    const changeCard=hasChange?`<div class="flex-1 min-w-[112px] rounded-2xl border-2 ${changeTone} px-3 py-2 text-center shadow-sm"><div class="text-xs md:text-sm font-black">SAU ĐÓ</div><div class="text-2xl md:text-3xl font-black text-slate-900">${showOp?escapeHtml(op):''}${change}</div><div class="text-xs md:text-sm font-bold text-slate-600 line-clamp-1">${showOp?escapeHtml(unit):escapeHtml(verb)}</div></div>`:'';
    let resultCard='';
    if(hasBefore&&hasChange){
        const value='?';
        resultCard=`<div class="flex-1 min-w-[112px] rounded-2xl border-2 border-rose-200 bg-rose-50 px-3 py-2 text-center shadow-sm"><div class="text-xs md:text-sm font-black text-rose-700">CẦN TÌM</div><div class="text-2xl md:text-3xl font-black text-slate-900">${escapeHtml(String(value))}</div><div class="text-xs md:text-sm font-bold text-slate-600">Con suy nghĩ nhé</div></div>`;
    }
    return `<div class="w-full h-full flex flex-col justify-center gap-3"><div class="w-full min-h-[235px] flex items-center justify-center rounded-[22px] bg-white border border-rose-100 overflow-hidden p-2">${imageHtml}</div><div class="flex items-stretch justify-center gap-2 md:gap-3 flex-wrap">${beforeCard}${changeCard}${resultCard}</div></div>`;
}

function buildMuc9SolutionHtml_(q) {
    const chosen=userAnswers[currentQIndex];
    if(chosen===undefined || chosen!==q?.answer || !q?.explanation) return '';
    return `<div class="mt-3 rounded-2xl border-2 border-emerald-300 bg-emerald-50 px-4 py-2.5 text-center text-sm md:text-base font-black text-emerald-800 shadow-sm">💡 ${escapeHtml(q.explanation)}</div>`;
}

function refreshMuc9SolutionHost_(q) {
    if(Number(activeTopicId)!==9 && !/^9\./.test(String(q?.sub_topic||''))) return;
    const host=document.getElementById('muc9-solution-host');
    if(host) host.innerHTML=buildMuc9SolutionHtml_(q);
}

function buildMuc9QuestionLayout_(q, speakerHtml, isEvaluationMode=false) {
    const stageLabel=beautifySubtopicName(q?.sub_topic_label)||'Giải toán bằng câu chuyện';
    const optionsHtml=(q.options||[]).map((opt,idx)=>{
        const letter=String.fromCharCode(65+idx);
        const themes=['border-rose-200 bg-rose-50/60 hover:bg-rose-100','border-sky-200 bg-sky-50/60 hover:bg-sky-100','border-amber-200 bg-amber-50/60 hover:bg-amber-100','border-emerald-200 bg-emerald-50/60 hover:bg-emerald-100'];
        const letters=['text-rose-700','text-sky-700','text-amber-700','text-emerald-700'];
        return `<button data-opt="${escapeHtml(opt)}" onclick="checkAnswer('${escapeJsString_(opt)}')" class="option-btn w-full min-h-[66px] px-4 py-3 ${themes[idx%4]} border-2 rounded-2xl font-extrabold text-slate-800 transition-all flex items-center justify-start gap-3 text-left shadow-xs pastel-btn"><strong class="${letters[idx%4]} text-xl md:text-2xl shrink-0 w-8">${letter}.</strong><span class="opt-text text-lg md:text-xl lg:text-[22px] leading-snug">${escapeHtml(capitalizeFirstLetter(opt))}</span><span class="option-icon ml-auto"></span></button>`;
    }).join('');
    const guide=isEvaluationMode?'':`<div class="mt-2 text-center text-sm md:text-base font-extrabold text-slate-600">🧠 ${escapeHtml(muc9StageGuide_(q))}</div>`;
    return `<div class="w-full max-w-6xl mx-auto rounded-[30px] border-2 border-rose-100 bg-white/95 p-3 md:p-4 shadow-sm"><div class="grid grid-cols-1 md:grid-cols-[1.04fr_0.96fr] gap-3 md:gap-4 items-stretch"><div class="relative min-h-[420px] md:min-h-[470px] rounded-[24px] border-2 border-rose-100 bg-gradient-to-br from-amber-50/70 via-white to-rose-50/60 p-3 flex items-center justify-center overflow-hidden">${muc9VisualHtml_(q)}<div class="absolute left-3 bottom-3 rounded-full border-2 border-rose-200 bg-white/95 px-4 py-1.5 text-sm md:text-base font-black text-rose-700 shadow-sm">${escapeHtml(stageLabel)}</div></div><div class="rounded-[24px] border-2 border-rose-100 bg-gradient-to-br from-white via-rose-50/15 to-amber-50/20 px-3 py-4 md:px-5 md:py-5 flex flex-col justify-center"><h3 class="text-xl md:text-2xl lg:text-[27px] font-black text-slate-900 leading-snug text-center">${escapeHtml(q.question_text)}</h3>${speakerHtml}<div class="grid grid-cols-1 gap-2.5 mt-3">${optionsHtml}</div>${guide}<div id="muc9-solution-host">${buildMuc9SolutionHtml_(q)}</div></div></div></div>`;
}



// ==========================================
// MỤC 10 - TOÁN TƯ DUY NÂNG CAO
// Mục 10 dạy chiến lược: mô hình rõ, gợi ý ngắn, sau khi đúng mới hiện cách nghĩ.
// ==========================================
function muc10StageGuide_(q) {
    const s=String(q?.sub_topic||'');
    if(s==='10.1') return 'Tìm số làm cho phép tính đúng, không đoán theo đáp án.';
    if(s==='10.2') return 'Đi từng mũi tên một và giữ lại kết quả của mỗi bước.';
    if(s==='10.3') return 'Tách rõ hàng chục và hàng đơn vị trước khi lập số.';
    if(s==='10.4') return 'Tìm tổng của hàng đã đủ rồi suy ra ô còn thiếu.';
    if(s==='10.5') return 'Đếm hình nhỏ trước, sau đó kiểm tra các hình lớn ghép lại.';
    if(s==='10.6') return 'Vẽ quan hệ nhiều hơn / ít hơn thành hai thẻ hoặc hai thanh.';
    return 'Con hãy nói cách nghĩ trước khi chọn đáp án.';
}

function muc1011GeometrySvg_(pattern) {
    const stroke='#334155', fill='none';
    const svg=(inner)=>`<svg viewBox="0 0 320 240" class="w-full max-w-[430px] h-auto" role="img" aria-label="Hình học tư duy"><rect x="6" y="6" width="308" height="228" rx="22" fill="#fff" stroke="#e9d5ff" stroke-width="2"/>${inner}</svg>`;
    const L=(x1,y1,x2,y2)=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="5" stroke-linecap="round"/>`;
    const R=(x,y,w,h)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" stroke="${stroke}" stroke-width="5"/>`;
    if(pattern==='grid2x2') return svg(R(70,30,180,180)+L(160,30,160,210)+L(70,120,250,120));
    if(pattern==='diamond_square') return svg(R(60,25,200,190)+`<polygon points="160,25 260,120 160,215 60,120" fill="none" stroke="${stroke}" stroke-width="5"/>`);
    if(pattern==='cross_diagonals') return svg(R(60,25,200,190)+L(60,25,260,215)+L(260,25,60,215));
    if(pattern==='two_squares') return svg(R(50,70,105,105)+R(155,70,105,105));
    if(pattern==='three_squares') return svg(R(15,70,95,95)+R(110,70,95,95)+R(205,70,95,95));
    if(pattern==='triangle_median') return svg(`<polygon points="160,25 55,210 265,210" fill="none" stroke="${stroke}" stroke-width="5"/>`+L(160,25,160,210));
    if(pattern==='triangle_midline') return svg(`<polygon points="160,25 55,210 265,210" fill="none" stroke="${stroke}" stroke-width="5"/>`+L(105,120,215,120));
    if(pattern==='grid1x3') return svg(R(40,75,240,90)+L(120,75,120,165)+L(200,75,200,165));
    if(pattern==='grid2x1') return svg(R(70,55,180,120)+L(160,55,160,175));
    if(pattern==='square_plus_diag') return svg(R(65,25,190,190)+L(65,25,255,215));
    return svg(R(75,35,170,170));
}

function muc10VisualHtml_(q) {
    const v=q?.muc10_visual||{}; const k=String(v.kind||q?.muc10_type||'');
    if(k==='equation') return `<div class="flex flex-col items-center gap-4"><div class="text-sm font-black text-amber-700 tracking-wide">SỐ BÍ MẬT</div><div class="flex items-center justify-center gap-3 md:gap-4 text-4xl md:text-5xl font-black text-slate-900"><span class="min-w-[78px] h-[78px] px-3 rounded-2xl border-4 border-dashed border-amber-400 bg-amber-50 flex items-center justify-center">${escapeHtml(String(v.left))}</span><span>${escapeHtml(String(v.op))}</span><span class="min-w-[78px] h-[78px] px-3 rounded-2xl border-2 border-slate-200 bg-white flex items-center justify-center">${escapeHtml(String(v.right))}</span><span>=</span><span class="min-w-[78px] h-[78px] px-3 rounded-2xl border-2 border-emerald-200 bg-emerald-50 flex items-center justify-center">${escapeHtml(String(v.result))}</span></div></div>`;
    if(k==='machine') return `<div class="flex flex-col items-center gap-5"><div class="text-6xl">⚙️</div><div class="flex items-center gap-3 text-3xl md:text-4xl font-black"><span class="rounded-2xl border-4 border-dashed border-amber-400 bg-amber-50 px-6 py-4">${escapeHtml(String(v.start))}</span><span class="text-slate-400">→</span><span class="rounded-full bg-violet-100 border-2 border-violet-200 px-5 py-3 text-violet-800">${escapeHtml(String((v.steps||[])[0]||''))}</span><span class="text-slate-400">→</span><span class="rounded-2xl border-2 border-emerald-200 bg-emerald-50 px-6 py-4">${escapeHtml(String(v.end))}</span></div></div>`;
    if(k==='path') return `<div class="w-full flex flex-col items-center gap-6"><div class="text-5xl">🛤️</div><div class="flex items-center justify-center gap-2 md:gap-3 flex-wrap"><div class="w-20 h-20 rounded-full bg-sky-50 border-4 border-sky-300 flex items-center justify-center text-3xl font-black">${v.start}</div><div class="text-center"><div class="font-black text-violet-700">${escapeHtml(String((v.ops||[])[0]||''))}</div><div class="text-3xl text-slate-400">→</div></div><div class="w-20 h-20 rounded-2xl bg-amber-50 border-4 border-amber-300 flex items-center justify-center text-3xl font-black">${escapeHtml(String(v.mid))}</div><div class="text-center"><div class="font-black text-violet-700">${escapeHtml(String((v.ops||[])[1]||''))}</div><div class="text-3xl text-slate-400">→</div></div><div class="w-20 h-20 rounded-full bg-emerald-50 border-4 border-emerald-300 flex items-center justify-center text-3xl font-black">${escapeHtml(String(v.end))}</div></div></div>`;
    if(k==='digits' || k==='digit_cards') {
        const tens=v.tens ?? (v.digits||[])[0] ?? '?'; const ones=v.ones ?? (v.digits||[])[1] ?? '?';
        return `<div class="flex flex-col items-center gap-4"><div class="flex gap-4"><div class="w-32 rounded-3xl border-2 border-indigo-200 bg-indigo-50 p-4 text-center"><div class="text-sm font-black text-indigo-700">HÀNG CHỤC</div><div class="text-6xl font-black text-slate-900 mt-2">${escapeHtml(String(tens))}</div></div><div class="w-32 rounded-3xl border-2 border-rose-200 bg-rose-50 p-4 text-center"><div class="text-sm font-black text-rose-700">HÀNG ĐƠN VỊ</div><div class="text-6xl font-black text-slate-900 mt-2">${escapeHtml(String(ones))}</div></div></div><div class="rounded-full border-2 border-amber-200 bg-amber-50 px-4 py-2 font-black text-amber-800">${escapeHtml(String(v.rule||v.goal||''))}</div></div>`;
    }
    if(k==='equal_rows') {
        const cell=(x,mark=false)=>`<div class="w-20 h-20 rounded-2xl ${mark?'border-4 border-dashed border-amber-400 bg-amber-50':'border-2 border-indigo-200 bg-white'} flex items-center justify-center text-3xl font-black">${escapeHtml(String(x))}</div>`;
        return `<div class="flex flex-col items-center gap-3"><div class="text-lg font-black text-indigo-700">Mỗi hàng có cùng tổng</div><div class="flex gap-2">${(v.row1||[]).map(x=>cell(x)).join('')}</div><div class="flex gap-2">${(v.row2||[]).map(x=>cell(x,String(x)==='?')).join('')}</div><div class="rounded-full bg-emerald-50 border-2 border-emerald-200 px-5 py-2 font-black text-emerald-700">Tổng mẫu: ${v.target}</div></div>`;
    }
    if(k==='geometry') return `<div class="w-full flex items-center justify-center">${muc1011GeometrySvg_(v.pattern)}</div>`;
    if(k==='relation') {
        const img=q.image_url?`<div class="w-full"><img src="${escapeHtml(q.image_url)}" class="w-full max-h-[220px] object-contain rounded-2xl" alt="Bối cảnh minh họa" onerror="this.parentElement.remove()"><div class="mt-1 text-center text-xs font-extrabold text-slate-500">Bối cảnh minh họa • dữ kiện nằm ở sơ đồ bên dưới</div></div>`:'';
        const itemTag=v.item?`<div class="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs md:text-sm font-black text-slate-600">Đối tượng: ${escapeHtml(v.item)}</div>`:'';
        return `<div class="w-full flex flex-col items-center gap-3">${img}<div class="grid grid-cols-[1fr_auto_1fr] items-center gap-2 w-full"><div class="rounded-2xl border-2 border-sky-200 bg-sky-50 p-3 text-center"><div class="font-black text-sky-700">${escapeHtml(v.a_name||'Bạn A')}</div><div class="text-3xl font-black">${escapeHtml(String(v.a_value))}</div></div><div class="rounded-full bg-amber-100 border-2 border-amber-200 px-3 py-2 text-sm font-black text-amber-800">${escapeHtml(v.relation||'')}</div><div class="rounded-2xl border-4 border-dashed border-rose-300 bg-rose-50 p-3 text-center"><div class="font-black text-rose-700">${escapeHtml(v.b_name||'Bạn B')}</div><div class="text-3xl font-black">?</div></div></div>${itemTag}</div>`;
    }
    return `<div class="text-7xl">🧠</div>`;
}

function buildMuc10SolutionHtml_(q) {
    const chosen=userAnswers[currentQIndex];
    if(chosen===undefined || chosen!==q?.answer || !q?.explanation) return '';
    return `<div class="mt-3 rounded-2xl border-2 border-emerald-300 bg-emerald-50 px-4 py-2.5 text-center text-sm md:text-base font-black text-emerald-800 shadow-sm">💡 ${escapeHtml(q.explanation)}</div>`;
}
function refreshMuc10SolutionHost_(q) { if(Number(activeTopicId)!==10 && !/^10\./.test(String(q?.sub_topic||''))) return; const h=document.getElementById('muc10-solution-host'); if(h)h.innerHTML=buildMuc10SolutionHtml_(q); }
function buildMuc10QuestionLayout_(q,speakerHtml,isEvaluationMode=false) {
    const label=beautifySubtopicName(q?.sub_topic_label)||'Toán tư duy nâng cao';
    const options=(q.options||[]).map((opt,idx)=>{const letter=String.fromCharCode(65+idx);const th=['border-amber-200 bg-amber-50/70 hover:bg-amber-100','border-sky-200 bg-sky-50/70 hover:bg-sky-100','border-indigo-200 bg-indigo-50/70 hover:bg-indigo-100','border-emerald-200 bg-emerald-50/70 hover:bg-emerald-100'];return `<button data-opt="${escapeHtml(opt)}" onclick="checkAnswer('${escapeJsString_(opt)}')" class="option-btn w-full min-h-[66px] px-4 py-3 ${th[idx%4]} border-2 rounded-2xl font-extrabold text-slate-800 transition-all flex items-center justify-start gap-3 text-left shadow-xs pastel-btn"><strong class="text-amber-700 text-xl md:text-2xl shrink-0 w-8">${letter}.</strong><span class="opt-text text-lg md:text-xl lg:text-[23px] leading-snug">${escapeHtml(capitalizeFirstLetter(opt))}</span><span class="option-icon ml-auto"></span></button>`}).join('');
    const guide=isEvaluationMode?'':`<div class="mt-2 text-center text-sm md:text-base font-extrabold text-slate-600">🧠 ${escapeHtml(muc10StageGuide_(q))}</div>`;
    return `<div class="w-full max-w-6xl mx-auto rounded-[30px] border-2 border-amber-100 bg-white/95 p-3 md:p-4 shadow-sm"><div class="grid grid-cols-1 md:grid-cols-[1.04fr_0.96fr] gap-3 md:gap-4 items-stretch"><div class="relative min-h-[420px] md:min-h-[470px] rounded-[24px] border-2 border-amber-100 bg-gradient-to-br from-amber-50 via-white to-indigo-50 p-4 flex items-center justify-center overflow-hidden">${muc10VisualHtml_(q)}<div class="absolute left-3 bottom-3 rounded-full border-2 border-amber-200 bg-white/95 px-4 py-1.5 text-sm md:text-base font-black text-amber-700 shadow-sm">${escapeHtml(label)}</div></div><div class="rounded-[24px] border-2 border-amber-100 bg-gradient-to-br from-white via-amber-50/20 to-indigo-50/20 px-3 py-4 md:px-5 md:py-5 flex flex-col justify-center"><h3 class="text-xl md:text-2xl lg:text-[27px] font-black text-slate-900 leading-snug text-center">${escapeHtml(q.question_text)}</h3>${speakerHtml}<div class="grid grid-cols-1 gap-2.5 mt-3">${options}</div>${guide}<div id="muc10-solution-host">${buildMuc10SolutionHtml_(q)}</div></div></div></div>`;
}

// ==========================================
// MỤC 11 - XƯỞNG THỬ THÁCH TOÁN
// Mục 11 là chuyển giao: trẻ tự nhận dạng chiến lược, gợi ý ít hơn Mục 10.
// ==========================================
function muc11StageGuide_(q) {
    const s=String(q?.sub_topic||'');
    if(s==='11.1') return 'Đọc đủ mọi manh mối rồi mới loại đáp án.';
    if(s==='11.2') return 'Manh mối nào thật sự ảnh hưởng đến điều cần tìm?';
    if(s==='11.3') return 'Kiểm tra từng lời nói độc lập trước khi kết luận.';
    if(s==='11.4') return 'So sánh trạng thái trước và sau để suy ra điều đã thay đổi.';
    if(s==='11.5') return 'Vẽ trục thời gian nhỏ nếu con chưa chắc.';
    if(s==='11.6') return 'Không có tên dạng toán: con tự chọn chiến lược phù hợp.';
    return 'Thử thách này cần con tự chọn cách giải.';
}

function muc11VisualHtml_(q) {
    const v=q?.muc11_visual||{}; const k=String(v.kind||q?.muc11_type||''); const img=q?.image_url||'';
    const scene=img?`<div class="w-full rounded-2xl overflow-hidden border-2 border-purple-100 bg-white"><img src="${escapeHtml(img)}" class="w-full max-h-[215px] object-contain" alt="Bối cảnh thử thách" onerror="this.parentElement.remove()"><div class="px-2 py-1 text-center text-xs font-extrabold text-slate-500">Bối cảnh minh họa • hãy đọc dữ kiện trên thẻ/sơ đồ</div></div>`:'';
    if(k==='clues') return `<div class="w-full flex flex-col items-center gap-3">${scene}<div class="text-5xl">${escapeHtml(v.icon||'🔎')}</div><div class="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full">${(v.clues||[]).map((c,i)=>`<div class="rounded-2xl border-2 ${['border-sky-200 bg-sky-50','border-amber-200 bg-amber-50','border-rose-200 bg-rose-50','border-emerald-200 bg-emerald-50'][i%4]} p-3 font-black text-slate-800 text-center">${escapeHtml(String(c))}</div>`).join('')}</div></div>`;
    if(k==='who_right') return `<div class="w-full grid grid-cols-1 gap-4"><div class="rounded-[24px] border-2 border-sky-200 bg-sky-50 p-4"><div class="text-3xl mb-1">🐿️</div><div class="font-black text-sky-700">A. ${escapeHtml(v.a_name||'Bạn A')}</div><div class="mt-2 text-xl md:text-2xl font-black text-slate-900">“${escapeHtml(v.a_text||'')}”</div></div><div class="rounded-[24px] border-2 border-rose-200 bg-rose-50 p-4"><div class="text-3xl mb-1">🐰</div><div class="font-black text-rose-700">B. ${escapeHtml(v.b_name||'Bạn B')}</div><div class="mt-2 text-xl md:text-2xl font-black text-slate-900">“${escapeHtml(v.b_text||'')}”</div></div></div>`;
    if(k==='before_after') {
        const isTransfer=String(v.action||'')==='transfer' || String(v.ask||'')==='after';
        const badge=isTransfer
            ? `Nhận thêm: ${escapeHtml(String(v.change ?? '?'))}`
            : (String(v.action||'')==='same' ? 'Thay đổi: ?' : 'Thay đổi: ?');
        return `<div class="w-full flex flex-col gap-3">${scene}<div class="grid grid-cols-[1fr_auto_1fr] items-center gap-2"><div class="rounded-2xl border-2 border-sky-200 bg-sky-50 p-4 text-center"><div class="text-sm font-black text-sky-700">TRƯỚC</div><div class="text-4xl font-black">${escapeHtml(String(v.before))}</div></div><div class="text-4xl text-purple-400">→</div><div class="rounded-2xl ${String(v.after)==='?'?'border-4 border-dashed border-emerald-300':'border-2 border-emerald-200'} bg-emerald-50 p-4 text-center"><div class="text-sm font-black text-emerald-700">SAU</div><div class="text-4xl font-black">${escapeHtml(String(v.after))}</div></div></div><div class="mx-auto rounded-full border-2 ${isTransfer?'border-emerald-300 bg-emerald-50 text-emerald-800':'border-dashed border-amber-300 bg-amber-50 text-amber-800'} px-5 py-2 font-black">${badge}</div></div>`;
    }
    if(k==='time_logic' || k==='timeline' || k==='weekline' || k==='clock_span') {
        if(Array.isArray(v.labels)) return `<div class="w-full flex items-center justify-center gap-2 flex-wrap">${v.labels.map((x,i)=>`<div class="rounded-2xl border-2 ${i===1?'border-amber-200 bg-amber-50':'border-purple-200 bg-purple-50'} px-5 py-4 text-xl md:text-2xl font-black">${escapeHtml(String(x))}</div>${i<v.labels.length-1?'<span class="text-3xl text-slate-400">→</span>':''}`).join('')}</div>`;
        if(v.today) return `<div class="w-full flex flex-col items-center gap-4"><div class="text-5xl">📅</div><div class="rounded-2xl border-2 border-purple-200 bg-purple-50 px-6 py-4 text-2xl font-black">Hôm nay: ${escapeHtml(v.today)}</div><div class="text-3xl font-black text-amber-700">+ ${v.jump} ngày → ?</div></div>`;
        if(v.start!=null) return `<div class="w-full grid grid-cols-2 gap-4"> <div class="text-center"><div class="font-black text-sky-700 mb-1">BẮT ĐẦU</div>${muc8ClockSvg_(v.start,0,{size:220})}</div><div class="text-center"><div class="font-black text-rose-700 mb-1">KẾT THÚC</div>${muc8ClockSvg_(v.end,0,{size:220})}</div></div>`;
    }
    if(k==='mixed') {
        if(v.kind==='sum_boxes') return `<div class="flex flex-col items-center gap-4"><div class="text-lg font-black text-purple-700">Tổng cần đạt: ${v.target}</div><div class="flex gap-3">${(v.values||[]).map(x=>`<div class="w-24 h-24 rounded-2xl ${String(x)==='?'?'border-4 border-dashed border-amber-300 bg-amber-50':'border-2 border-purple-200 bg-purple-50'} flex items-center justify-center text-4xl font-black">${escapeHtml(String(x))}</div>`).join('')}</div></div>`;
    }
    // mixed records store their real kind directly; support them here too.
    if(k==='sum_boxes') return `<div class="flex flex-col items-center gap-4"><div class="text-lg font-black text-purple-700">Tổng cần đạt: ${v.target}</div><div class="flex gap-3">${(v.values||[]).map(x=>`<div class="w-24 h-24 rounded-2xl ${String(x)==='?'?'border-4 border-dashed border-amber-300 bg-amber-50':'border-2 border-purple-200 bg-purple-50'} flex items-center justify-center text-4xl font-black">${escapeHtml(String(x))}</div>`).join('')}</div></div>`;
    if(k==='relation_chain') return `<div class="w-full flex flex-col items-center gap-3">${scene}<div class="flex items-center justify-center gap-2 flex-wrap">${(v.nodes||[]).map((x,i)=>`<div class="rounded-2xl border-2 border-purple-200 bg-purple-50 px-4 py-4 text-xl font-black">${escapeHtml(String(x))}</div>${i<(v.nodes||[]).length-1?'<span class="text-3xl text-slate-400">→</span>':''}`).join('')}</div></div>`;
    if(k==='digits') return `<div class="flex flex-col items-center gap-4"><div class="flex gap-4"><div class="w-32 rounded-3xl border-2 border-indigo-200 bg-indigo-50 p-4 text-center"><div class="text-sm font-black text-indigo-700">CHỤC</div><div class="text-6xl font-black">${escapeHtml(String(v.tens))}</div></div><div class="w-32 rounded-3xl border-2 border-rose-200 bg-rose-50 p-4 text-center"><div class="text-sm font-black text-rose-700">ĐƠN VỊ</div><div class="text-6xl font-black">${escapeHtml(String(v.ones))}</div></div></div><div class="rounded-full bg-amber-50 border-2 border-amber-200 px-4 py-2 font-black text-amber-800">${escapeHtml(v.rule||'')}</div></div>`;
    if(k==='geometry') return muc1011GeometrySvg_(v.pattern);
    if(k==='length_fit') { const max=Math.max(Number(v.container)||1,Number(v.item)||1); const wc=Math.round((Number(v.container)||1)/max*100); const wi=Math.round((Number(v.item)||1)/max*100); return `<div class="w-full flex flex-col gap-5"><div><div class="font-black text-sky-700 mb-1">Hộp ${v.container} cm</div><div class="h-16 rounded-2xl border-2 border-sky-300 bg-sky-50 flex items-center px-2" style="width:${wc}%"><div class="w-full h-2 bg-sky-300 rounded-full"></div></div></div><div><div class="font-black text-rose-700 mb-1">Bút ${v.item} cm</div><div class="h-10 rounded-full bg-rose-300 border-2 border-rose-400" style="width:${wi}%"></div></div></div>`; }
    return `<div class="text-7xl">🕵️</div>`;
}

function buildMuc11SolutionHtml_(q) { const chosen=userAnswers[currentQIndex]; if(chosen===undefined || chosen!==q?.answer || !q?.explanation)return ''; return `<div class="mt-3 rounded-2xl border-2 border-emerald-300 bg-emerald-50 px-4 py-2.5 text-center text-sm md:text-base font-black text-emerald-800 shadow-sm">🔍 ${escapeHtml(q.explanation)}</div>`; }
function refreshMuc11SolutionHost_(q) { if(Number(activeTopicId)!==11 && !/^11\./.test(String(q?.sub_topic||''))) return; const h=document.getElementById('muc11-solution-host'); if(h)h.innerHTML=buildMuc11SolutionHtml_(q); }
function buildMuc11QuestionLayout_(q,speakerHtml,isEvaluationMode=false) {
    const label=beautifySubtopicName(q?.sub_topic_label)||'Xưởng thử thách Toán';
    const options=(q.options||[]).map((opt,idx)=>{const letter=String.fromCharCode(65+idx);const th=['border-purple-200 bg-purple-50/70 hover:bg-purple-100','border-sky-200 bg-sky-50/70 hover:bg-sky-100','border-rose-200 bg-rose-50/70 hover:bg-rose-100','border-emerald-200 bg-emerald-50/70 hover:bg-emerald-100'];return `<button data-opt="${escapeHtml(opt)}" onclick="checkAnswer('${escapeJsString_(opt)}')" class="option-btn w-full min-h-[66px] px-4 py-3 ${th[idx%4]} border-2 rounded-2xl font-extrabold text-slate-800 transition-all flex items-center justify-start gap-3 text-left shadow-xs pastel-btn"><strong class="text-purple-700 text-xl md:text-2xl shrink-0 w-8">${letter}.</strong><span class="opt-text text-lg md:text-xl lg:text-[23px] leading-snug">${escapeHtml(capitalizeFirstLetter(opt))}</span><span class="option-icon ml-auto"></span></button>`}).join('');
    const guide=isEvaluationMode?'':`<div class="mt-2 text-center text-sm md:text-base font-extrabold text-slate-600">🕵️ ${escapeHtml(muc11StageGuide_(q))}</div>`;
    return `<div class="w-full max-w-6xl mx-auto rounded-[30px] border-2 border-purple-100 bg-white/95 p-3 md:p-4 shadow-sm"><div class="grid grid-cols-1 md:grid-cols-[1.04fr_0.96fr] gap-3 md:gap-4 items-stretch"><div class="relative min-h-[420px] md:min-h-[470px] rounded-[24px] border-2 border-purple-100 bg-gradient-to-br from-purple-50 via-white to-sky-50 p-4 flex items-center justify-center overflow-hidden">${muc11VisualHtml_(q)}<div class="absolute left-3 bottom-3 rounded-full border-2 border-purple-200 bg-white/95 px-4 py-1.5 text-sm md:text-base font-black text-purple-700 shadow-sm">${escapeHtml(label)}</div></div><div class="rounded-[24px] border-2 border-purple-100 bg-gradient-to-br from-white via-purple-50/20 to-sky-50/20 px-3 py-4 md:px-5 md:py-5 flex flex-col justify-center"><h3 class="text-xl md:text-2xl lg:text-[27px] font-black text-slate-900 leading-snug text-center">${escapeHtml(q.question_text)}</h3>${speakerHtml}<div class="grid grid-cols-1 gap-2.5 mt-3">${options}</div>${guide}<div id="muc11-solution-host">${buildMuc11SolutionHtml_(q)}</div></div></div></div>`;
}

function formatQuestionPromptHtml_(q) {
    if (Number(activeTopicId) === 3 && /^3\.[12]$/.test(String(q?.sub_topic || ''))) {
        return formatTopic3PromptHtml_(q, q?.question_text || '');
    }
    return escapeHtml(q?.question_text || '');
}


function roadmapOptionButtons_(q, tone='pink') {
    const toneMap={
        pink:['bg-pink-50/60 hover:bg-pink-100/80 border-pink-200','text-pink-600'],
        violet:['bg-violet-50/60 hover:bg-violet-100/80 border-violet-200','text-violet-700'],
        blue:['bg-sky-50/70 hover:bg-sky-100/80 border-sky-200','text-sky-700'],
        emerald:['bg-emerald-50/60 hover:bg-emerald-100/80 border-emerald-200','text-emerald-700']
    };
    const [box,letter]=toneMap[tone]||toneMap.pink;
    return (q.options||[]).map((opt,i)=>`<button data-opt="${escapeHtml(opt)}" onclick="checkAnswer('${escapeJsString_(opt)}')" class="option-btn w-full min-h-[62px] px-4 py-3 ${box} border-2 rounded-2xl font-extrabold text-slate-800 transition-all flex items-center justify-start gap-3 text-left shadow-xs pastel-btn"><strong class="${letter} text-xl md:text-2xl shrink-0 w-8">${String.fromCharCode(65+i)}.</strong><span class="opt-text text-lg md:text-xl lg:text-[22px] leading-snug">${escapeHtml(capitalizeFirstLetter(opt))}</span><span class="option-icon ml-auto"></span></button>`).join('');
}

function roadmapSolutionHtml_(q) {
    const chosen=userAnswers[currentQIndex];
    if (chosen===undefined || chosen!==q?.answer) return '';
    const text=String(q?.explanation || q?.hint || '').trim();
    return text ? `<div class="mt-3 rounded-2xl border border-emerald-300 bg-emerald-50 px-4 py-3 text-base md:text-lg font-black text-emerald-800 shadow-sm">💡 ${escapeHtml(text)}</div>` : '';
}
function refreshRoadmapSolution_(q){ const h=document.getElementById('roadmap-solution-host'); if(h) h.innerHTML=roadmapSolutionHtml_(q); }

function roadmapTwoDigitOperationVisual_(q){
    const meta=exerciseOperationMeta_(q,'');
    if(!meta) return buildFoundationSceneVisual(q);
    const {a,op,b}=meta;
    const result=String(q.answer||'?');
    const pv=(n)=>`<div class="grid grid-cols-2 gap-2 min-w-[150px]"><div class="rounded-2xl border-2 border-indigo-200 bg-indigo-50 p-3 text-center"><div class="text-xs font-black text-indigo-600">CHỤC</div><div class="text-4xl font-black text-indigo-800">${Math.floor(n/10)}</div></div><div class="rounded-2xl border-2 border-rose-200 bg-rose-50 p-3 text-center"><div class="text-xs font-black text-rose-600">ĐƠN VỊ</div><div class="text-4xl font-black text-rose-800">${n%10}</div></div></div>`;
    return `<div class="flex flex-col items-center gap-4"><div class="flex items-center justify-center gap-3 md:gap-5 flex-wrap">${pv(a)}<div class="text-5xl font-black ${op==='+'?'text-emerald-500':'text-rose-500'}">${op}</div>${pv(b)}</div><div class="rounded-2xl border-2 border-amber-200 bg-amber-50 px-5 py-2 text-3xl md:text-4xl font-black text-slate-800">${a} ${op} ${b} = <span class="text-purple-600">?</span></div></div>`;
}

function roadmapPlaceValueVisual_(q){
    const nums=(String(q.question_text||'').match(/\b\d{2}\b/g)||[]).map(Number);
    const n=nums[0];
    if(!Number.isFinite(n)) return `<div class="text-7xl">🔢</div>`;
    const tens=Math.floor(n/10), ones=n%10;
    const rods=Array.from({length:tens},()=>'<span class="inline-block w-4 h-20 rounded bg-indigo-400 border border-indigo-500"></span>').join('');
    const dots=Array.from({length:ones},()=>'<span class="inline-block w-8 h-8 rounded-full bg-rose-300 border-2 border-rose-400"></span>').join('');
    return `<div class="w-full flex flex-col items-center gap-4"><div class="text-6xl md:text-7xl font-black text-purple-700">${n}</div><div class="flex items-end justify-center gap-6"><div class="text-center"><div class="flex gap-1 justify-center min-h-[86px]">${rods}</div><div class="mt-2 font-black text-indigo-700">${tens} chục</div></div><div class="text-center"><div class="flex gap-1.5 flex-wrap justify-center max-w-[150px] min-h-[86px] items-center">${dots||'<span class="text-3xl text-slate-300">0</span>'}</div><div class="mt-2 font-black text-rose-700">${ones} đơn vị</div></div></div></div>`;
}

function roadmapSequenceVisual_(q){
    const text=String(q.question_text||'');
    let nums=(text.match(/\b\d+\b/g)||[]).map(Number);
    const answer=String(q.answer||'');
    const seqMatch=text.match(/:\s*([^?]+?)(?:\?|\.$)/);
    let tokens=[];
    if(seqMatch) tokens=seqMatch[1].split(/\s*,\s*/).map(x=>x.trim()).filter(Boolean);
    if(tokens.length<3){
        tokens=text.split(/[:,]/).slice(1).join(',').split(',').map(x=>x.trim()).filter(x=>/^\d+|\.{2,}/.test(x));
    }
    if(!tokens.length && nums.length) tokens=nums.slice(-5).map(String);
    tokens=tokens.slice(0,7).map(x=>/\.{2,}|\?/.test(x)?'?':x.match(/\d+/)?.[0]||x);
    return `<div class="w-full flex items-center justify-center gap-2 md:gap-3 flex-wrap">${tokens.map((x,i)=>`<div class="w-16 h-16 md:w-20 md:h-20 rounded-2xl border-2 ${x==='?'?'border-dashed border-amber-400 bg-amber-50 text-amber-700':'border-violet-200 bg-violet-50 text-violet-800'} flex items-center justify-center text-2xl md:text-3xl font-black">${escapeHtml(x)}</div>${i<tokens.length-1?'<span class="text-2xl text-slate-300">→</span>':''}`).join('')}</div>`;
}

function roadmapCompare10Visual_(q){
    const nums=(String(q.question_text||'').match(/\b(?:10|[0-9])\b/g)||[]).map(Number);
    const a=nums[0],b=nums[1];
    if(!Number.isFinite(a)||!Number.isFinite(b)) return buildFoundationSceneVisual(q);
    return `<div class="flex items-center justify-center gap-5 md:gap-8"><div class="w-28 h-28 rounded-3xl bg-indigo-50 border-2 border-indigo-200 flex items-center justify-center text-6xl font-black text-indigo-700">${a}</div><div class="w-20 h-20 rounded-full bg-amber-50 border-4 border-dashed border-amber-300 flex items-center justify-center text-5xl font-black text-amber-600">?</div><div class="w-28 h-28 rounded-3xl bg-rose-50 border-2 border-rose-200 flex items-center justify-center text-6xl font-black text-rose-700">${b}</div></div>`;
}

function roadmapPartWholeVisual_(q){
    const text=String(q.question_text||'');
    const nums=(text.match(/\b(?:10|[0-9])\b/g)||[]).map(Number);
    const whole=nums[0], part=nums[1];
    if(!Number.isFinite(whole)) return buildFoundationSceneVisual(q);
    return `<div class="flex flex-col items-center gap-4"><div class="w-28 h-20 rounded-2xl border-2 border-purple-300 bg-purple-50 flex items-center justify-center text-5xl font-black text-purple-700">${whole}</div><div class="text-3xl text-slate-300">↙︎　↘︎</div><div class="flex gap-6"><div class="w-24 h-20 rounded-2xl border-2 border-sky-300 bg-sky-50 flex items-center justify-center text-4xl font-black text-sky-700">${Number.isFinite(part)?part:'?'}</div><div class="w-24 h-20 rounded-2xl border-4 border-dashed border-amber-300 bg-amber-50 flex items-center justify-center text-4xl font-black text-amber-700">?</div></div></div>`;
}

function buildRoadmapVisualQuestionLayout_(q){
    const sub=String(q?.sub_topic||'');
    let visual=''; let tone='pink';
    if(sub==='1.4') visual=roadmapCompare10Visual_(q);
    else if(sub==='1.5') visual=roadmapPartWholeVisual_(q);
    else if(/^2\.(11|12|13|14)$/.test(sub)) { visual=roadmapTwoDigitOperationVisual_(q); tone='violet'; }
    else if(/^3\.[12]$/.test(sub)) { visual=roadmapPlaceValueVisual_(q); tone='violet'; }
    else if(/^4\./.test(sub)) { visual=roadmapSequenceVisual_(q); tone='blue'; }
    else visual=buildFoundationSceneVisual(q);
    const title=beautifySubtopicName(q?.sub_topic_label)||'Bài tập Toán';
    return `<div class="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[1.08fr_0.92fr] gap-3 md:gap-4 items-stretch"><div class="relative min-h-[280px] md:min-h-[360px] rounded-[26px] border border-pink-100 bg-gradient-to-br from-amber-50 via-white to-sky-50 p-4 flex items-center justify-center overflow-hidden">${visual}<div class="absolute left-3 bottom-3 rounded-full bg-white/95 border border-purple-200 px-3 py-1 text-sm font-black text-purple-700">${escapeHtml(title)}</div></div><div class="rounded-[26px] border border-pink-100 bg-white p-4 md:p-5 flex flex-col justify-center"><h3 class="text-xl md:text-2xl lg:text-[27px] font-black text-slate-900 text-center leading-snug">${escapeHtml(getFoundationPrompt(q)||q.question_text)}</h3><div class="grid grid-cols-1 gap-2.5 mt-3">${roadmapOptionButtons_(q,tone)}</div><div id="roadmap-solution-host">${roadmapSolutionHtml_(q)}</div></div></div>`;
}

function loadQuestion() {
    stopSpeaking();
    const q = activeQuestionsList[currentQIndex];
    if (!q) return;

    const isEvaluationMode = !!activeExamContext || !!activeRoadmapContext;
    const isFoundationPractice = !isEvaluationMode && ([1, 2].includes(Number(activeTopicId)) || /^[12]\./.test(String(q.sub_topic || '')));
    const isTopic3Practice = !isEvaluationMode && Number(activeTopicId) === 3 && /^3\./.test(String(q.sub_topic || ''));
    const isTopic4Practice = !isEvaluationMode && Number(activeTopicId) === 4 && /^4\./.test(String(q.sub_topic || ''));
    const isTopic5Practice = !isEvaluationMode && Number(activeTopicId) === 5 && /^5\.[2345]$/.test(String(q.sub_topic || ''));
    // Mục 6 luôn dùng layout tranh lớn bên trái - câu hỏi bên phải.
    // Kiểm tra cả activeTopicId để không rơi về layout trắc nghiệm chung nếu dữ liệu sub_topic cũ/thiếu.
    const isTopic6Question = Number(activeTopicId) === 6 || /^6\./.test(String(q.sub_topic || ''));
    const isTopic7Question = Number(activeTopicId) === 7 || /^7\./.test(String(q.sub_topic || ''));
    const isTopic8Question = Number(activeTopicId) === 8 || /^8\./.test(String(q.sub_topic || ''));
    const isTopic9Question = Number(activeTopicId) === 9 || /^9\./.test(String(q.sub_topic || ''));
    const isTopic10Question = Number(activeTopicId) === 10 || /^10\./.test(String(q.sub_topic || ''));
    const isTopic11Question = Number(activeTopicId) === 11 || /^11\./.test(String(q.sub_topic || ''));

    if (isEvaluationMode) {
        document.getElementById('q-badge-index').textContent = `CÂU ${currentQIndex + 1} / ${activeQuestionsList.length}`;
        const isRoadmap = !!activeRoadmapContext;
        const skillName = isRoadmap
            ? (beautifySubtopicName(q.sub_topic_label) || 'Kiến thức tổng hợp')
            : (SKILL_TAXONOMY[q.skill_tag]?.name || beautifySubtopicName(q.sub_topic_label) || 'Kiến thức tổng hợp');
        document.getElementById('q-skill-text').textContent = skillName;

        const scoreBadge = document.getElementById('q-badge-score');
        if (scoreBadge) {
            if (isRoadmap) {
                scoreBadge.classList.add('hidden');
            } else {
                scoreBadge.classList.remove('hidden');
                scoreBadge.textContent = `(${q.diem ?? 0.5} điểm)`;
            }
        }
    } else {
        const stepEl = document.getElementById('practice-step-text');
        if (stepEl) stepEl.textContent = `${currentQIndex + 1}/${activeQuestionsList.length}`;
    }

    let mediaHtml = '';
    if (q.image_url && !activeExamContext) {
        mediaHtml = `<img src="${q.image_url}" alt="minh họa" class="w-14 h-14 md:w-16 md:h-16 object-contain mb-1 floating" onerror="this.remove()">`;
    }

    const pText = q.reading_passage;
    const pTitle = q.reading_title;
    const passageLines = pText ? pText.split('\n').map(l => l.trim()).filter(Boolean) : [];
    const avgLineLen = passageLines.length ? passageLines.reduce((a, l) => a + l.length, 0) / passageLines.length : 0;
    const isPoemLike = passageLines.length >= 4 && avgLineLen > 0 && avgLineLen < 35;
    const useTwoColumns = isPoemLike;
    const passageHtml = pText ? `
        <div class="w-full max-w-3xl bg-pink-50/70 border-2 border-pink-200 rounded-2xl p-3 mb-1.5 text-left shadow-xs">
            ${pTitle ? `<p class="font-black text-pink-700 text-sm md:text-base mb-1">${escapeHtml(pTitle)}</p>` : ''}
            <p class="text-gray-800 text-sm md:text-base font-bold whitespace-pre-line leading-relaxed ${useTwoColumns ? 'md:columns-2 md:gap-6' : ''}">${escapeHtml(pText)}</p>
        </div>` : '';

    const practiceSpeakerBtnHtml = !isEvaluationMode ? `
        <div class="flex items-center justify-center mt-1 mb-1">
            <button onclick="speakCurrentQuestion()" class="px-4 py-1.5 bg-pink-50 hover:bg-pink-100 text-pink-700 border border-pink-200 rounded-2xl text-xs md:text-sm font-extrabold flex items-center space-x-1.5 pastel-btn shadow-xs">
                <i class="fa-solid fa-volume-high text-pink-600"></i>
                <span>Nghe câu hỏi</span>
            </button>
        </div>
    ` : '';

    const isLetterListen = q.render_style === 'letter_listen';

    let html;
    const roadmapSub = String(q?.sub_topic || '');
    if (!!activeRoadmapContext && /^1\./.test(roadmapSub)) {
        html = buildMuc1QuestionLayout(q, '');
    } else if (!!activeRoadmapContext && /^2\.(?:[1-9]|10)$/.test(roadmapSub)) {
        html = buildMuc2QuestionLayout_(q, '');
    } else if (!!activeRoadmapContext && /^(?:2\.(?:11|12|13|14)$|3\.[12]$|4\.)/.test(roadmapSub)) {
        html = buildRoadmapVisualQuestionLayout_(q);
    } else if (!!activeRoadmapContext && roadmapSub === '3.3') {
        html = buildTopic3CompareLayout_(q, '');
    } else if (!!activeRoadmapContext && /^5\./.test(roadmapSub) && q?.muc5_type) {
        html = buildMuc5QuestionLayout_(q, '');
    } else if (isFoundationPractice) {
        if (Number(activeTopicId) === 1 && /^1\./.test(String(q.sub_topic || ''))) {
            html = buildMuc1QuestionLayout(q, practiceSpeakerBtnHtml);
        } else if (Number(activeTopicId) === 2 && /^2\./.test(String(q.sub_topic || ''))) {
            html = buildMuc2QuestionLayout_(q, practiceSpeakerBtnHtml);
        } else {
            html = buildFoundationQuestionLayout(q, practiceSpeakerBtnHtml);
        }
    } else if (isTopic3Practice && getTopic3Stage_(q) === '3.3') {
        html = buildTopic3CompareLayout_(q, practiceSpeakerBtnHtml);
    } else if (isTopic3Practice && getTopic3Stage_(q) === '3.4') {
        html = buildTopic3SortLayout_(q, practiceSpeakerBtnHtml);
    } else if (isTopic3Practice && getTopic3Stage_(q) === '3.5') {
        html = buildTopic35QuestionLayout_(q, practiceSpeakerBtnHtml);
    } else if (isTopic4Practice && getTopic4SequenceStage_(q) === '4.1') {
        html = buildTopic4Sub41Layout_(q, practiceSpeakerBtnHtml);
    } else if (isTopic5Practice) {
        html = buildMuc5QuestionLayout_(q, practiceSpeakerBtnHtml);
    } else if (isTopic6Question) {
        html = buildMuc6QuestionLayout_(q, practiceSpeakerBtnHtml, isEvaluationMode);
    } else if (isTopic7Question) {
        html = buildMuc7QuestionLayout_(q, practiceSpeakerBtnHtml, isEvaluationMode);
    } else if (isTopic8Question) {
        html = buildMuc8QuestionLayout_(q, practiceSpeakerBtnHtml, isEvaluationMode);
    } else if (isTopic9Question) {
        html = buildMuc9QuestionLayout_(q, practiceSpeakerBtnHtml, isEvaluationMode);
    } else if (isTopic10Question) {
        html = buildMuc10QuestionLayout_(q, practiceSpeakerBtnHtml, isEvaluationMode);
    } else if (isTopic11Question) {
        html = buildMuc11QuestionLayout_(q, practiceSpeakerBtnHtml, isEvaluationMode);
    } else if (isLetterListen) {
        html = `
            ${mediaHtml}
            <div class="w-full max-w-3xl border-2 border-dashed border-pink-200 bg-pink-50/40 rounded-3xl px-4 py-4 md:py-5 flex flex-col items-center text-center mb-3">
                <div class="text-3xl md:text-4xl mb-1.5 space-x-2">
                    <span>🎧</span><span>👂</span><span>🔢</span>
                </div>
                <p class="text-sm md:text-base lg:text-lg font-black text-rose-600 leading-snug">${formatQuestionPromptHtml_(q)}</p>
                ${practiceSpeakerBtnHtml}
            </div>

            <div class="w-full max-w-3xl flex flex-wrap items-center justify-center gap-3 mt-1">
        `;
        q.options.forEach(opt => {
            html += `
                <button data-opt="${escapeHtml(opt)}" onclick="checkAnswer('${opt.replace(/'/g, "\\'")}')" class="option-btn min-w-[140px] px-6 py-3 bg-white hover:bg-emerald-50 border-2 border-emerald-400 rounded-full font-black text-emerald-700 text-base md:text-lg transition-all pastel-btn shadow-xs">
                    ${escapeHtml(opt)}
                </button>`;
        });
        html += `</div>`;
        if (q.mascot_text) {
            html += `
                <div class="mt-4 inline-flex items-center space-x-1.5 bg-pink-50 border border-pink-200 rounded-full px-3.5 py-1.5">
                    <span>🐰</span>
                    <span class="text-xs md:text-sm font-extrabold text-rose-600">${escapeHtml(q.mascot_text)}</span>
                </div>`;
        }
    } else {
        const isTopic4TextLarge = !isEvaluationMode && Number(activeTopicId) === 4 && /^4\./.test(String(q.sub_topic || ''));
        const isTopic9Or10TextLarge = !isEvaluationMode && [9, 10].includes(Number(activeTopicId)) && /^(9|10)\./.test(String(q.sub_topic || ''));
        const useLargeGenericText = isTopic4TextLarge || isTopic9Or10TextLarge;
        const genericQuestionTextClass = useLargeGenericText
            ? 'text-lg md:text-xl lg:text-[26px]'
            : 'text-sm md:text-base lg:text-lg';
        const genericOptionTextClass = useLargeGenericText
            ? 'text-lg md:text-xl lg:text-[24px]'
            : 'text-sm md:text-base';
        const genericOptionLetterClass = useLargeGenericText
            ? 'text-xl md:text-2xl'
            : 'text-base md:text-lg';
        html = `
        ${mediaHtml}
        ${passageHtml}
        <div class="flex flex-col items-center justify-center max-w-3xl text-center px-2 mb-0.5">
            <h3 class="${genericQuestionTextClass} font-black text-slate-900 leading-snug">
                ${formatQuestionPromptHtml_(q)}
            </h3>
            ${practiceSpeakerBtnHtml}
        </div>
        
        <div class="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-2.5 mt-1">
    `;

    q.options.forEach((opt, idx) => {
        const formattedOpt = capitalizeFirstLetter(opt);
        const letter = String.fromCharCode(65 + idx);

        if (activeExamContext) {
            html += `
                <button data-opt="${escapeHtml(opt)}" onclick="checkAnswer('${opt.replace(/'/g, "\\'")}')" class="option-btn w-full p-2.5 md:p-3 bg-white hover:bg-pink-50/50 border border-pink-200 rounded-2xl font-extrabold text-gray-800 text-left transition-all flex items-center justify-between text-sm md:text-base shadow-xs">
                    <div class="flex items-center space-x-2.5">
                        <span class="opt-badge w-7 h-7 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center font-black text-sm shrink-0">${letter}</span>
                        <span class="opt-text">${escapeHtml(formattedOpt)}</span>
                    </div>
                    <span class="option-icon text-pink-500 text-base md:text-lg"></span>
                </button>`;
        } else {
            html += `
                <button data-opt="${escapeHtml(opt)}" onclick="checkAnswer('${opt.replace(/'/g, "\\'")}')" class="option-btn w-full p-3 md:p-3.5 bg-pink-50/40 hover:bg-pink-100/70 border-2 border-pink-200 rounded-2xl font-extrabold text-gray-800 text-left transition-all flex items-center justify-between ${genericOptionTextClass} shadow-xs pastel-btn">
                    <span><strong class="text-pink-600 mr-2 ${genericOptionLetterClass}">${letter}.</strong> ${escapeHtml(formattedOpt)}</span>
                    <span class="option-icon text-pink-500 text-base md:text-lg"></span>
                </button>`;
        }
    });
        html += `</div>`;
    }

    document.getElementById('question-box').innerHTML = html;

    restoreQuestionState(q);
    refreshTopic4Sub41SolutionHost_(q);
    refreshTopic3CompareSolutionHost_(q);
    renderTopic3SortInteractive_(q);
    refreshTopic35FeedbackHost_(q);
    refreshMuc5SolutionHost_(q);
    refreshMuc9SolutionHost_(q);
    refreshRoadmapSolution_(q);
    updateNavButtons();
    updateQuizPalletUI();

    if (autoSpeechEnabled) speakCurrentQuestion();
}

function restoreQuestionState(q) {
    const isExam = !!activeExamContext;
    const completedAnswer = userAnswers[currentQIndex];
    const wrongAttempts = wrongAttemptsByQ[currentQIndex] || [];

    if (isExam) {
        document.querySelectorAll('.option-btn').forEach(b => {
            const bOpt = b.getAttribute('data-opt');
            const badge = b.querySelector('.opt-badge');
            const iconSpan = b.querySelector('.option-icon');

            if (completedAnswer !== undefined && bOpt === completedAnswer) {
                b.className = "option-btn w-full p-2.5 md:p-3 bg-pink-50/30 border-2 border-pink-500 rounded-2xl font-extrabold text-gray-900 text-left transition-all flex items-center justify-between text-sm md:text-base shadow-xs";
                if (badge) badge.className = "opt-badge w-7 h-7 rounded-xl bg-pink-500 text-white flex items-center justify-center font-black text-sm shrink-0 shadow-xs";
                if (iconSpan) iconSpan.innerHTML = '<i class="fa-regular fa-circle-check text-pink-600 text-lg"></i>';
            } else {
                b.className = "option-btn w-full p-2.5 md:p-3 bg-white hover:bg-pink-50/50 border border-pink-200 rounded-2xl font-extrabold text-gray-800 text-left transition-all flex items-center justify-between text-sm md:text-base shadow-xs";
                if (badge) badge.className = "opt-badge w-7 h-7 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center font-black text-sm shrink-0";
                if (iconSpan) iconSpan.innerHTML = '';
            }
        });
        return;
    }

    if (!!activeRoadmapContext) {
        if (completedAnswer === undefined) return;
        const isCorrect = completedAnswer === q.answer;
        document.querySelectorAll('.option-btn').forEach(b => {
            b.disabled = true;
            const bOpt = b.getAttribute('data-opt');
            if (bOpt === q.answer) {
                b.classList.remove('bg-pink-50/40', 'border-pink-200');
                b.classList.add('bg-green-100', 'border-green-400', 'text-green-800');
            } else if (!isCorrect && bOpt === completedAnswer) {
                b.classList.remove('bg-pink-50/40', 'border-pink-200');
                b.classList.add('bg-red-200', 'border-red-500', 'text-red-900');
            }
        });
        return;
    }

    if (wrongAttempts.length > 0) {
        document.querySelectorAll('.option-btn').forEach(b => {
            const bOpt = b.getAttribute('data-opt');
            if (wrongAttempts.includes(bOpt)) {
                b.classList.remove('bg-pink-50/40', 'border-pink-200');
                b.classList.add('bg-red-200', 'border-red-500', 'text-red-900');
                b.disabled = true;
            }
        });
    }

    if (completedAnswer !== undefined) {
        document.querySelectorAll('.option-btn').forEach(b => {
            const bOpt = b.getAttribute('data-opt');
            if (bOpt === completedAnswer) {
                b.classList.remove('bg-pink-50/40', 'border-pink-200');
                b.classList.add('bg-green-100', 'border-green-400', 'text-green-800');
                b.disabled = true;
            }
        });
    }

    if (Number(activeTopicId) === 3 && getTopic3Stage_(q) === '3.4') {
        refreshTopic3SortUi_(q);
    }
}

function updateNavButtons() {
    const isEvaluationMode = !!activeExamContext || !!activeRoadmapContext;
    const btnPrev = isEvaluationMode ? document.getElementById('btn-prev-q-exam') : document.getElementById('btn-prev-q-prac');
    const nextText = isEvaluationMode ? document.getElementById('btn-next-text-exam') : document.getElementById('btn-next-text-prac');
    const nextIcon = isEvaluationMode ? document.getElementById('btn-next-icon-exam') : document.getElementById('btn-next-icon-prac');

    if (!btnPrev) return;

    if (currentQIndex === 0) {
        btnPrev.disabled = true;
        btnPrev.classList.add('opacity-40', 'cursor-not-allowed');
    } else {
        btnPrev.disabled = false;
        btnPrev.classList.remove('opacity-40', 'cursor-not-allowed');
    }

    if (currentQIndex === activeQuestionsList.length - 1) {
        if (isEvaluationMode) {
            nextText.textContent = "Hoàn thành";
            nextIcon.className = "fa-solid fa-trophy ml-1.5";
        } else {
            nextText.textContent = "Vòng tiếp theo";
            nextIcon.className = "fa-solid fa-rotate-right ml-1.5";
        }
    } else {
        nextText.textContent = "Câu tiếp theo";
        nextIcon.className = "fa-solid fa-chevron-right ml-1.5";
    }
}

function checkAnswer(selectedOpt) {
    const q = activeQuestionsList[currentQIndex];
    const isExam = !!activeExamContext;
    const isRoadmap = !!activeRoadmapContext;

    // RIÊNG ĐỀ THI: YÊN TĨNH TUYỆT ĐỐI, SÁNG VIỀN HỒNG, KHÔNG PHÁT ÂM THANH
    if (isExam) {
        userAnswers[currentQIndex] = selectedOpt;

        document.querySelectorAll('.option-btn').forEach(b => {
            const bOpt = b.getAttribute('data-opt');
            const badge = b.querySelector('.opt-badge');
            const iconSpan = b.querySelector('.option-icon');

            if (bOpt === selectedOpt) {
                b.className = "option-btn w-full p-2.5 md:p-3 bg-pink-50/30 border-2 border-pink-500 rounded-2xl font-extrabold text-gray-900 text-left transition-all flex items-center justify-between text-sm md:text-base shadow-xs";
                if (badge) badge.className = "opt-badge w-7 h-7 rounded-xl bg-pink-500 text-white flex items-center justify-center font-black text-sm shrink-0 shadow-xs";
                if (iconSpan) iconSpan.innerHTML = '<i class="fa-regular fa-circle-check text-pink-600 text-lg"></i>';
            } else {
                b.className = "option-btn w-full p-2.5 md:p-3 bg-white hover:bg-pink-50/50 border border-pink-200 rounded-2xl font-extrabold text-gray-800 text-left transition-all flex items-center justify-between text-sm md:text-base shadow-xs";
                if (badge) badge.className = "opt-badge w-7 h-7 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center font-black text-sm shrink-0";
                if (iconSpan) iconSpan.innerHTML = '';
            }
        });

        updateQuizPalletUI();
        return;
    }

    // RIÊNG TIẾN TRÌNH TUẦN: CHỈ ĐƯỢC CHỌN 1 LẦN DUY NHẤT ĐỂ GHI NHẬN ĐÚNG/SAI CHÍNH XÁC
    if (isRoadmap) {
        if (userAnswers[currentQIndex] !== undefined) return;

        const isCorrect = selectedOpt === q.answer;
        userAnswers[currentQIndex] = selectedOpt;

        if (isCorrect) {
            score += (q.diem ?? 0.5);
            starGreenCount++;
            document.getElementById('star-green-count').textContent = starGreenCount;
        } else {
            starRedCount++;
            document.getElementById('star-red-count').textContent = starRedCount;
        }

        document.querySelectorAll('.option-btn').forEach(b => {
            b.disabled = true;
            const bOpt = b.getAttribute('data-opt');
            if (bOpt === q.answer) {
                b.classList.remove('bg-pink-50/40', 'border-pink-200');
                b.classList.add('bg-green-100', 'border-green-400', 'text-green-800');
            } else if (bOpt === selectedOpt) {
                b.classList.remove('bg-pink-50/40', 'border-pink-200');
                b.classList.add('bg-red-200', 'border-red-500', 'text-red-900');
            }
        });
        if (isCorrect) {
            refreshTopic4Sub41SolutionHost_(q);
            refreshTopic3CompareSolutionHost_(q);
            renderTopic3SortInteractive_(q);
            refreshTopic35FeedbackHost_(q);
            refreshMuc5SolutionHost_(q);
            refreshMuc9SolutionHost_(q);
            refreshMuc10SolutionHost_(q);
            refreshMuc11SolutionHost_(q);
            refreshRoadmapSolution_(q);
        }

        if (isCorrect) {
            playAudio('correct');
            confetti({ particleCount: 30, spread: 55, origin: { y: 0.7 } });
            if (!speakMuc5SelectedShape_(q, selectedOpt)) setTimeout(() => speakVietnamese(`${q.answer}`), 180);
        } else {
            playAudio('wrong');
            speakMuc5SelectedShape_(q, selectedOpt);
        }

        updateQuizPalletUI();
        return;
    }

    // CHẾ ĐỘ LUYỆN TẬP TỰ DO
    const isCorrect = selectedOpt === q.answer;
    if (userAnswers[currentQIndex] !== undefined) return;

    if (isCorrect) {
        userAnswers[currentQIndex] = selectedOpt;
        score += (q.diem ?? 0.5);
        starGreenCount++;
        document.getElementById('star-green-count').textContent = starGreenCount;

        document.querySelectorAll('.option-btn').forEach(b => {
            b.disabled = true;
            if (b.getAttribute('data-opt') === q.answer) {
                b.classList.remove('bg-pink-50/40', 'border-pink-200');
                b.classList.add('bg-green-100', 'border-green-400', 'text-green-800');
            }
        });
        refreshTopic4Sub41SolutionHost_(q);
        refreshTopic3CompareSolutionHost_(q);
        renderTopic3SortInteractive_(q);
        refreshTopic35FeedbackHost_(q);
        refreshMuc5SolutionHost_(q);
        refreshMuc9SolutionHost_(q);
        refreshMuc10SolutionHost_(q);
        refreshMuc11SolutionHost_(q);

        playAudio('correct');
        confetti({ particleCount: 30, spread: 55, origin: { y: 0.7 } });

        // Mục 1-2, 6, 7 và 8: trả lời đúng thì tự chuyển câu để giữ nhịp học liên tục cho bé.
        // Các mục này thiên về nhận biết trực quan / thực hành nhanh nên không cần dừng lâu sau khi đã chọn đúng.
        const isAutoNextPractice = /^(?:1|2|6|7|8)\./.test(String(q.sub_topic || ''));
        if (isAutoNextPractice) {
            setTimeout(() => nextQuestion(), 650);
        } else if (!speakMuc5SelectedShape_(q, selectedOpt)) {
            setTimeout(() => speakVietnamese(`${q.answer}`), 180);
        }
    } else {
        if (!wrongAttemptsByQ[currentQIndex]) wrongAttemptsByQ[currentQIndex] = [];
        if (!wrongAttemptsByQ[currentQIndex].includes(selectedOpt)) {
            wrongAttemptsByQ[currentQIndex].push(selectedOpt);
            starRedCount++;
            document.getElementById('star-red-count').textContent = starRedCount;
        }

        document.querySelectorAll('.option-btn').forEach(b => {
            if (b.getAttribute('data-opt') === selectedOpt) {
                b.classList.remove('bg-pink-50/40', 'border-pink-200');
                b.classList.add('bg-red-200', 'border-red-500', 'text-red-900');
                b.disabled = true;
            }
        });

        playAudio('wrong');
        speakMuc5SelectedShape_(q, selectedOpt);
    }

    updateQuizPalletUI();
}

function prevQuestion() {
    stopSpeaking();
    if (currentQIndex > 0) {
        currentQIndex--;
        loadQuestion();
    }
}

function nextQuestion() {
    stopSpeaking();
    const isEvaluationMode = !!activeExamContext || !!activeRoadmapContext;

    if (!isEvaluationMode && userAnswers[currentQIndex] === undefined) {
        showAppNotice('Bé hãy tìm đáp án đúng để hoàn thành câu này nhé!', { title: 'Cố lên bé!', icon: '🐰', tone: 'pink' });
        return;
    }

    if (currentQIndex < activeQuestionsList.length - 1) {
        currentQIndex++;
        loadQuestion();
    } else {
        if (isEvaluationMode) {
            showResultScreen();
        } else {
            confetti({ particleCount: 75, spread: 75, origin: { y: 0.6 } });
            playAudio('win');
            showAppNotice(`🎉 Chúc mừng bé đã hoàn thành trọn vẹn 1 vòng luyện tập (${activeQuestionsList.length} câu)!\nBây giờ Cô Thỏ Hồng sẽ xáo trộn để con bước vào vòng luyện tập tiếp theo nhé!`, { title: 'Hoàn thành vòng luyện tập', icon: '🎉', tone: 'emerald' });

            const basePool = practiceCycleRawPool.length ? practiceCycleRawPool : activeQuestionsList;
            activeQuestionsList = buildPracticeCycleQuestions_(basePool);
            currentQIndex = 0;
            userAnswers = {};
            wrongAttemptsByQ = {};
            loadQuestion();
        }
    }
}

async function triggerSubmitQuizPrompt() {
    const answeredCount = Object.keys(userAnswers).length;
    const total = activeQuestionsList.length;
    const ok = await showAppConfirm(`Bé đã làm ${answeredCount}/${total} câu. Bé có chắc chắn muốn nộp bài thi ngay không?`, {
        title: 'Nộp bài thi', icon: '✅', okText: 'Nộp bài', cancelText: 'Làm tiếp', tone: 'purple'
    });
    if (ok) showResultScreen();
}

function showResultScreen() {
    stopSpeaking();
    clearInterval(quizTimerInterval);

    let correctCount = 0;
    score = 0;
    quizAnsweredLog = [];
    quizWrongAnswers = [];

    activeQuestionsList.forEach((q, idx) => {
        const studentAns = userAnswers[idx];
        const isCorrect = studentAns === q.answer;
        if (isCorrect) {
            correctCount++;
            score += (q.diem ?? 0.5);
        } else {
            quizWrongAnswers.push({
                question_id: q.question_id,
                question_number: idx + 1,
                question_text: q.question_text,
                sub_topic: q.sub_topic || 'Chủ đề tổng hợp',
                skill_tag: q.skill_tag || 'C1',
                dap_an_chon: studentAns || 'Chưa trả lời',
                dap_an_dung: q.answer,
                explanation: q.explanation || 'Không có giải thích chi tiết.'
            });
        }
        quizAnsweredLog.push({
            question_id: q.question_id,
            question_text: q.question_text,
            skill_tag: q.skill_tag || 'C1',
            source_topic_id: q.source_topic_id,
            diem: q.diem ?? 0.5,
            isCorrect,
            dap_an_chon: studentAns || '',
            dap_an_dung: q.answer
        });
    });

    switchAppView('view-result');
    const totalQ = activeQuestionsList.length;
    const percent = Math.round((correctCount / totalQ) * 100);

    // Bài tập theo SGK: điểm tính riêng theo công thức 10/tổng số câu
    const displayScore = activeRoadmapContext
        ? Math.round((correctCount * 10 / totalQ) * 10) / 10
        : score;

    const examBadgeText = activeExamContext ? activeExamContext.examTitle : (activeRoadmapContext ? activeRoadmapContext.chuDe : 'Bài luyện tập chủ đề');
    document.getElementById('report-exam-badge').textContent = examBadgeText;
    document.getElementById('report-student-display').textContent = `Học sinh: ${currentUser?.hoTen || 'Khách'}`;
    const durationStr = quizStartTime ? formatDuration(Date.now() - quizStartTime) : '35 phút';
    document.getElementById('report-meta-display').textContent = `Mã số: ${currentUser?.maHS || 'KHACH'} | Thời gian: ${durationStr}`;
    document.getElementById('report-total-score-val').textContent = displayScore.toFixed(1);
    document.getElementById('report-correct-ratio-val').textContent = `${correctCount}/${totalQ}`;

    renderReportTopicsBreakdown();

    const nextActionLabel = document.getElementById('report-next-action-label');
    if (nextActionLabel) {
        nextActionLabel.textContent = activeRoadmapContext ? '🔙 Quay lại Bài tập' : '🚀 Làm đề thi tiếp theo';
    }

    const historyBtn = document.getElementById('report-history-btn');
    if (historyBtn) {
        const targetSheet = activeRoadmapContext
            ? 'LichSuTienTrinhTuan'
            : (examFileMap[activeExamContext?.categoryKey]?.sheet || 'LichSuBaiThi_HK1');
        historyBtn.setAttribute('onclick', `openHistoryModal('${targetSheet}')`);
    }

    if (percent >= 80) {
        confetti({ particleCount: 130, spread: 85, origin: { y: 0.6 } });
        playAudio('win');
    }

    if (currentUser && !currentUser.isGuest) {
        if (activeExamContext) saveExamResultToSheet();
        else if (activeRoadmapContext) saveWeeklyProgressToSheet(percent, starCountFromPercent(percent), displayScore);
    }
}

function starCountFromPercent(percent) {
    if (percent === 100) return 3;
    if (percent >= 85) return 2;
    if (percent >= 80) return 1;
    return 0;
}

function getSkillKeyFromTag_(rawTag) {
    const m = String(rawTag || '').toUpperCase().match(/C([1-6])/);
    return m ? `C${m[1]}` : null;
}

function renderReportTopicsBreakdown() {
    const container = document.getElementById('report-topics-list');
    if (!container) return;

    const isRoadmap = !!activeRoadmapContext;
    const skillKeys = ['C1', 'C2', 'C3', 'C4', 'C5', 'C6'];
    const skillStats = {};
    skillKeys.forEach(k => {
        skillStats[k] = { total: 0, correct: 0, maxScore: 0, earnedScore: 0 };
    });

    activeQuestionsList.forEach((q, idx) => {
        const tag = getSkillKeyFromTag_(q.skill_tag);
        if (!tag || !skillStats[tag]) return;

        const point = Number(q.diem ?? 0.5);
        const safePoint = Number.isFinite(point) ? point : 0.5;
        skillStats[tag].total++;
        skillStats[tag].maxScore += safePoint;
        if (userAnswers[idx] === q.answer) {
            skillStats[tag].correct++;
            skillStats[tag].earnedScore += safePoint;
        }
    });

    // Chỉ hiển thị những năng lực THỰC SỰ có câu trong bài/đề hiện tại.
    // Năng lực chưa học/chưa được kiểm tra không được biến thành 0% hay "Cần luyện tập thêm".
    const assessedSkills = skillKeys.filter(k => {
        const data = skillStats[k];
        return isRoadmap ? data.total > 0 : data.maxScore > 0;
    });

    if (!assessedSkills.length) {
        container.innerHTML = `<div class="col-span-full rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center text-sm font-bold text-slate-600">Chưa có dữ liệu năng lực để đánh giá.</div>`;
        return;
    }

    let html = '';
    assessedSkills.forEach(k => {
        const data = skillStats[k];
        const pct = isRoadmap
            ? Math.round((data.correct / data.total) * 100)
            : Math.round((data.earnedScore / data.maxScore) * 100);
        const isPassed = pct >= 50;
        const badgeClass = isPassed ? 'bg-amber-100 text-amber-800 border border-amber-200' : 'bg-rose-50 text-rose-700 border border-rose-200';
        const badgeText = isPassed ? 'Đạt yêu cầu' : 'Cần luyện tập thêm';
        const barColor = isPassed ? 'bg-gradient-to-r from-amber-400 to-orange-400' : 'bg-gradient-to-r from-pink-400 to-rose-400';
        const scoreLine = isRoadmap
            ? `<span>Số câu đúng: <strong class="text-pink-600">${data.correct}/${data.total} câu</strong></span>`
            : `<span>Điểm đạt: <strong class="text-pink-600">${data.earnedScore.toFixed(1)} / ${data.maxScore.toFixed(1)}đ</strong></span>`;

        html += `
            <div class="bg-pink-50/40 border border-pink-100 rounded-2xl p-3 flex flex-col justify-between space-y-2">
                <div class="flex items-center justify-between">
                    <span class="font-black text-slate-800 text-xs sm:text-sm">${SKILL_TAXONOMY[k].name}</span>
                    <span class="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold ${badgeClass}">${badgeText}</span>
                </div>
                <div class="flex items-center justify-between text-xs font-bold text-slate-600">
                    ${scoreLine}
                    <span class="font-math font-black">${pct}%</span>
                </div>
                <div class="w-full bg-pink-100 rounded-full h-2 overflow-hidden">
                    <div class="${barColor} h-full rounded-full transition-all duration-500" style="width: ${pct}%"></div>
                </div>
            </div>
        `;
    });
    container.innerHTML = html;
}

function openReviewWrongModal() {
    const modal = document.getElementById('modal-review-wrong');
    const content = document.getElementById('review-wrong-content');
    if (!modal || !content) return;

    if (!quizWrongAnswers.length) {
        content.innerHTML = `<div class="text-center py-8 text-emerald-600 font-extrabold text-base"><i class="fa-solid fa-circle-check text-3xl mb-2 block"></i>Tuyệt vời! Bé không làm sai câu nào trong bài thi này!</div>`;
    } else {
        let html = '';
        quizWrongAnswers.forEach((item, idx) => {
            html += `
                <div class="bg-rose-50/40 border border-rose-200 rounded-2xl p-3.5 space-y-2">
                    <div class="flex items-center justify-between">
                        <span class="px-2.5 py-0.5 bg-rose-100 text-rose-800 font-black text-xs rounded-lg">CÂU ${item.question_number || (idx + 1)}</span>
                        <span class="text-xs font-bold text-slate-500">${escapeHtml(beautifySubtopicName(item.sub_topic_label) || 'Chủ đề tổng hợp')}</span>
                    </div>
                    <p class="font-extrabold text-slate-800 text-sm">${escapeHtml(item.question_text)}</p>
                    <div class="text-xs space-y-1 font-semibold">
                        <p class="text-rose-600"><i class="fa-solid fa-xmark mr-1"></i> Đáp án con chọn: <strong>${escapeHtml(item.dap_an_chon)}</strong></p>
                        <p class="text-emerald-700"><i class="fa-solid fa-check mr-1"></i> Đáp án đúng chuẩn: <strong>${escapeHtml(item.dap_an_dung)}</strong></p>
                    </div>
                    <div class="p-2.5 bg-amber-50/80 border border-amber-200 rounded-xl text-xs text-amber-900 font-semibold flex items-start gap-2">
                        <i class="fa-solid fa-lightbulb text-amber-600 mt-0.5"></i>
                        <span><strong>Lời giải sư phạm:</strong> ${escapeHtml(item.explanation)}</span>
                    </div>
                </div>
            `;
        });
        content.innerHTML = html;
    }
    modal.classList.remove('hidden');
}

function closeReviewWrongModal() {
    document.getElementById('modal-review-wrong').classList.add('hidden');
}

// ==========================================
// LƯU KẾT QUẢ ĐỀ THI THEO NHỮNG NĂNG LỰC THỰC SỰ ĐƯỢC KIỂM TRA
// ==========================================
async function saveExamResultToSheet() {
    if (!activeExamContext || !currentUser || currentUser.isGuest) return;
    const categoryKey = String(activeExamContext.categoryKey || '');
    const examCategory = categoryKey === 'hocky1' ? 'hk1' : categoryKey === 'hocky2' ? 'hk2' : 'hsg';
    const assessmentId = String(activeExamContext.examId || '');
    if (!assessmentId) return;
    try {
        const result = await class1ApiRequest_('assessmentAttemptSubmit', {
            subjectId:'toan',
            kind:'baithi',
            examCategory,
            assessmentId,
            attemptId:activeAssessmentAttemptId_ || newAssessmentAttemptId_(),
            answers:assessmentAnswersPayload_(),
            durationMs:quizStartTime ? Math.max(0, Date.now() - quizStartTime) : 0
        });
        if (result?.verified && examCategory !== 'hsg') {
            const verified = result.verified;
            const localCorrect = quizAnsweredLog.filter(x => x.isCorrect).length;
            if (Number(verified.correct) !== localCorrect) {
                showAppNotice('Kết quả trên máy và kết quả máy chủ chưa khớp. Báo cáo chính thức đã dùng kết quả máy chủ.', { title:'Đã kiểm tra lại kết quả', icon:'🛡️', tone:'amber' });
            }
        }
    } catch (_) {
        showAppNotice('Kết quả bài thi chưa được lưu vào tài khoản Lớp 1. Bé có thể thử lại khi kết nối ổn định.', { title:'Chưa lưu được kết quả', icon:'☁️', tone:'amber' });
    }
}

async function saveWeeklyProgressToSheet(percent, starCount, scoreVal) {
    if (!activeRoadmapContext || !currentUser || currentUser.isGuest) return;
    const semester = Number(activeRoadmapContext.semester) === 2 ? 'hk2' : 'hk1';
    try {
        const result = await class1ApiRequest_('assessmentAttemptSubmit', {
            subjectId:'toan',
            kind:'baitap',
            semester,
            assessmentId:String(activeRoadmapContext.exerciseId || ''),
            attemptId:activeAssessmentAttemptId_ || newAssessmentAttemptId_(),
            answers:assessmentAnswersPayload_(),
            durationMs:quizStartTime ? Math.max(0, Date.now() - quizStartTime) : 0
        });
        const verifiedPercent = Number(result?.verified?.percent);
        const authoritativePercent = Number.isFinite(verifiedPercent) ? verifiedPercent : Number(percent || 0);
        if (result?.progress) {
            class1ExerciseUnlockedIndex_ = Math.max(1, Number(result.progress.unlockedIndex) || 1);
            class1ExerciseBestPercent_ = result.progress.bestPercentByExercise || {};
            class1ExerciseProgressLoaded_ = true;
            try { localStorage.setItem(getExerciseProgressKey_(), String(class1ExerciseUnlockedIndex_)); } catch (_) {}
        }
        if (authoritativePercent >= 80) {
            const data = await loadBaiHocData();
            const seq = data?.learning_sequence || [];
            const nextIndex = Number(activeRoadmapContext.week) + 1;
            if (nextIndex <= seq.length && nextIndex <= getCurrentExerciseIndex_()) {
                const nextBai = seq[nextIndex - 1];
                setTimeout(() => showAppNotice(`🎉 Chúc mừng bé đạt ${authoritativePercent}%! Bài tập ${nextBai} đã được mở khóa trên tài khoản Lớp 1.`, { title:'Mở khóa bài mới', icon:'🌟', tone:'emerald' }), 350);
            }
        }
    } catch (err) {
        if (String(err?.code || '') === 'EXERCISE_LOCKED') {
            try { await refreshClass1MathProgress_(); } catch (_) {}
            showAppNotice('Tiến độ trên máy chủ cho biết bài này chưa được mở. Bé hãy hoàn thành bài trước đạt từ 80% nhé!', { title:'Bài tập chưa mở', icon:'🔒', tone:'purple' });
            return;
        }
        showAppNotice('Kết quả Bài tập chưa được lưu vào tài khoản Lớp 1. Bé có thể thử lại khi kết nối ổn định.', { title:'Chưa lưu được kết quả', icon:'☁️', tone:'amber' });
    }
}

function normalizeClass1AssessmentHistoryRow_(row, kind) {
    const out = { ...row };
    out.Timestamp = row.Timestamp || row.timestamp || '';
    out.ngayLam = out.Timestamp;
    out.thoiGianLamBai = row.ThoiGianLamBai || row.thoiGianLamBai || '';
    out.tongCauHoi = Number(row.TongCauHoi ?? row.tongCauHoi ?? 0);
    out.soCauDung = Number(row.SoCauDung ?? row.soCauDung ?? 0);
    ['C1','C2','C3','C4','C5','C6'].forEach(k => {
        out[k + '_Dung'] = Number(row[k + '_Dung'] || 0);
        out[k + '_Tong'] = Number(row[k + '_Tong'] || 0);
    });
    if (kind === 'baitap') {
        out.tuan = Number(row.BaiSo || 0);
        out.chuDe = row.BaiSo ? `Bài ${row.BaiSo}` : String(row.BaiId || 'Bài tập');
        out.score = Number(row.PhanTram || 0) / 10;
        out.tongDiem = out.score;
        out.percent = Number(row.PhanTram || 0);
    } else {
        out.deSo = Number(row.DeSo || 0);
        out.score = Number(row.DiemSo || 0);
        out.tongDiem = Number(row.DiemSo || 0);
        out.maxDiem = Number(row.TongDiem || 0);
    }
    return out;
}

async function fetchClass1AssessmentHistory_(sheetName) {
    if (sheetName === 'LichSuTienTrinhTuan') {
        const [a,b] = await Promise.all([
            class1ApiRequest_('assessmentHistoryGet', {subjectId:'toan',kind:'baitap',semester:'hk1'}),
            class1ApiRequest_('assessmentHistoryGet', {subjectId:'toan',kind:'baitap',semester:'hk2'})
        ]);
        return [...(a?.history || []), ...(b?.history || [])]
            .map(r => normalizeClass1AssessmentHistoryRow_(r, 'baitap'))
            .sort((x,y) => new Date(y.Timestamp || 0) - new Date(x.Timestamp || 0));
    }
    if (sheetName === 'LichSuBaiThi_HK1' || sheetName === 'LichSuBaiThi_HK2') {
        const semester = sheetName === 'LichSuBaiThi_HK2' ? 'hk2' : 'hk1';
        const data = await class1ApiRequest_('assessmentHistoryGet', {subjectId:'toan',kind:'baithi',semester});
        return (data?.history || []).map(r => normalizeClass1AssessmentHistoryRow_(r, 'baithi'));
    }
    return [];
}

async function openHistoryModal(sheetName = 'LichSuTienTrinhTuan') {
    if (!currentUser || currentUser.isGuest) {
        showAppNotice('Bé vui lòng đăng nhập bằng tài khoản Lớp 1 để xem lịch sử nhé!', { title:'Cần đăng nhập', icon:'🔐', tone:'purple' });
        mathModuleCtx_?.openAuth?.('login');
        return;
    }

    const modal = document.getElementById('modal-history-progress');
    modal.classList.remove('hidden');
    document.getElementById('hist-info-name').textContent = currentUser.hoTen || '--';
    const classEl = document.getElementById('hist-info-class'); if (classEl) classEl.textContent = '--';
    document.getElementById('hist-info-code').textContent = currentUser.maHS || '--';
    const dobEl = document.getElementById('hist-info-dob'); if (dobEl) dobEl.textContent = '--';
    document.getElementById('hist-report-date').textContent = new Date().toLocaleDateString('vi-VN');

    const titleMap = {
        LichSuTienTrinhTuan: 'Báo cáo tiến trình Bài tập theo SGK',
        LichSuBaiThi_HK1: 'Báo cáo kết quả đấu trường — Học kỳ 1',
        LichSuBaiThi_HK2: 'Báo cáo kết quả đấu trường — Học kỳ 2',
        LichSuBaiThi_HSG: 'Báo cáo kết quả đấu trường — Học sinh giỏi'
    };
    document.getElementById('hist-modal-title').textContent = titleMap[sheetName] || 'Kết quả tiến trình học tập';

    if (sheetName === 'LichSuBaiThi_HSG') {
        await renderHistoryReport([], sheetName);
        showAppNotice('Đề HSG không ghi vào báo cáo sáu năng lực chính thức của Lớp 1.', { title:'Lịch sử HSG', icon:'🏆', tone:'amber' });
        return;
    }

    showLoadingOverlay('Đang trích xuất dữ liệu và vẽ biểu đồ năng lực...');
    try {
        const rows = await fetchClass1AssessmentHistory_(sheetName);
        hideLoadingOverlay();
        await renderHistoryReport(rows, sheetName);
    } catch (_) {
        hideLoadingOverlay();
        showAppNotice('Chưa tải được lịch sử từ tài khoản Lớp 1. Vui lòng thử lại.', { title:'Lịch sử học tập', icon:'📊', tone:'amber' });
    }
}

function closeHistoryModal() {
    document.getElementById('modal-history-progress').classList.add('hidden');
    if (histLineChartInstance) { histLineChartInstance.destroy(); histLineChartInstance = null; }
    if (histBarChartInstance) { histBarChartInstance.destroy(); histBarChartInstance = null; }
}

// ==========================================
// BIỂU ĐỒ THANH NGANG & BẢNG KÈM HÀNG TRUNG BÌNH
// ==========================================
function getSkillCell(row, skillKey) {
    const taxo = SKILL_TAXONOMY[skillKey];
    const rawCorrect = row[taxo.sheetCol] ?? row[skillKey + '_Dung'];
    const rawTotal = row[taxo.totalCol] ?? row[skillKey + '_Tong'];
    const correct = Number(rawCorrect);
    const total = Number(rawTotal);
    if (rawTotal === undefined || rawTotal === null || rawTotal === '' || isNaN(total) || total <= 0) return null;
    return { correct: isNaN(correct) ? 0 : correct, total };
}

function formatDateOnly(value) {
    if (!value) return '--';
    const d = new Date(value);
    if (isNaN(d.getTime())) return String(value).split('T')[0] || String(value);
    return d.toLocaleDateString('vi-VN');
}

function formatDateShort(value) {
    const d = value ? new Date(value) : null;
    if (!d || isNaN(d.getTime())) return '';
    return `${String(d.getDate()).padStart(2, '0')}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}

async function renderHistoryReport(rows, sheetName) {
    const isWeekly = sheetName === 'LichSuTienTrinhTuan';
    const labels = rows.map((r, i) => {
        const dm = formatDateShort(r.Timestamp || r.ngayLam);
        const label = isWeekly ? (r.chuDe || r.chude || `Bài tập ${r.tuan || i + 1}`) : (r.deSo ? `Đề ${r.deSo}` : `Bài tập ${r.tuan || i + 1}`);
        return dm ? `${dm} ${label}` : label;
    });
    const scores = rows.map(r => Number(r.score || r.tongDiem || ((r.soCauDung / (r.tongCauHoi || 30)) * 10).toFixed(1)));

    const ctxLine = document.getElementById('progressChartCanvas').getContext('2d');
    if (histLineChartInstance) histLineChartInstance.destroy();

    histLineChartInstance = new Chart(ctxLine, {
        type: 'line',
        data: {
            labels: labels.length ? labels : ['Chưa có bài thi'],
            datasets: [{
                label: 'Điểm số (/10)',
                data: scores.length ? scores : [0],
                borderColor: '#e11d48',
                backgroundColor: 'rgba(254, 226, 226, 0.5)',
                borderWidth: 3.5,
                pointBackgroundColor: '#be123c',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
                pointRadius: 6,
                pointHoverRadius: 8,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    min: 0, max: 10.5,
                    ticks: { stepSize: 2, color: '#000000', font: { family: 'Quicksand', weight: 'bold' } }
                },
                x: {
                    grid: { display: false },
                    ticks: {
                        color: '#000000',
                        font: { family: 'Quicksand', weight: 'bold', size: 11 },
                        maxRotation: 90,
                        minRotation: 90
                    }
                }
            },
            plugins: { legend: { display: false } }
        }
    });

    const skillKeys = ['C1', 'C2', 'C3', 'C4', 'C5', 'C6'];
    // null = chưa được đánh giá. Chỉ năng lực thực sự có bằng chứng mới nhận giá trị %.
    // Không dùng 0 để đại diện cho "chưa học/chưa kiểm tra", vì 0% chỉ hợp lệ khi đã được kiểm tra.
    const skillAverages = { C1: null, C2: null, C3: null, C4: null, C5: null, C6: null };
    const touchedSkills = [];
    let examSkillBlueprint = {};

    if (rows.length && isWeekly) {
        // Bài tập: % = tổng số câu đúng / tổng số câu đã làm THẬT của nhóm kỹ năng đó
        skillKeys.forEach((k) => {
            let sumCorrect = 0, sumTotal = 0;
            rows.forEach(r => {
                const cell = getSkillCell(r, k);
                if (!cell) return;
                sumCorrect += cell.correct;
                sumTotal += cell.total;
            });
            if (sumTotal > 0) {
                skillAverages[k] = Math.min(100, Math.round((sumCorrect / sumTotal) * 100));
                touchedSkills.push(k);
            }
        });
    } else if (rows.length) {
        // Đề thi mới không ép đủ 6 năng lực. Mỗi lần thi chỉ tính những năng lực có câu thật sự.
        // Dùng chính JSON đề thi để lấy điểm tối đa của từng năng lực ở từng đề, thay vì một ma trận cố định 6 nhóm.
        try {
            const examData = await loadExamDataFile('de_thi_toan_1.json');
            const exams = Array.isArray(examData?.exams) ? examData.exams : [];
            exams.forEach((exam, index) => {
                const maxBySkill = { C1: 0, C2: 0, C3: 0, C4: 0, C5: 0, C6: 0 };
                (exam.questions || []).forEach(q => {
                    const tag = getSkillKeyFromTag_(q.skill_tag);
                    if (!tag || maxBySkill[tag] === undefined) return;
                    const point = Number(q.diem ?? 0.5);
                    maxBySkill[tag] += Number.isFinite(point) ? point : 0.5;
                });
                examSkillBlueprint[index + 1] = maxBySkill;
            });
        } catch (e) {
            examSkillBlueprint = {};
        }

        skillKeys.forEach((k) => {
            const colName = SKILL_TAXONOMY[k].sheetCol;
            let sumEarned = 0;
            let sumMax = 0;

            rows.forEach(r => {
                const raw = r[`diem${k}`] ?? r[colName] ?? r[`diem_${k.toLowerCase()}`] ?? r[k];
                const hasStoredValue = raw !== undefined && raw !== null && raw !== '' && raw !== '--';
                const examNo = Number(r.deSo);
                const maxForExam = Number(examSkillBlueprint[examNo]?.[k] || 0);

                // Nếu JSON xác nhận đề này không kiểm tra năng lực k thì bỏ qua hoàn toàn,
                // kể cả dữ liệu cũ từng lưu 0 do lỗi "ép đủ 6 năng lực".
                if (examNo > 0 && examSkillBlueprint[examNo] && maxForExam <= 0) return;
                if (!hasStoredValue) return;

                const earned = Number(raw);
                if (!Number.isFinite(earned)) return;

                // Ưu tiên mẫu đề hiện tại để có mẫu số đúng. Nếu không tìm được đề cũ,
                // chỉ dùng dòng dữ liệu khi backend có cột tổng/max tương ứng.
                let denominator = maxForExam;
                if (denominator <= 0) {
                    const rawTotal = r[SKILL_TAXONOMY[k].totalCol];
                    const parsedTotal = Number(rawTotal);
                    if (rawTotal !== undefined && rawTotal !== null && rawTotal !== '' && Number.isFinite(parsedTotal) && parsedTotal > 0) {
                        denominator = parsedTotal;
                    }
                }
                if (denominator <= 0) return;

                sumEarned += earned;
                sumMax += denominator;
            });

            if (sumMax > 0) {
                skillAverages[k] = Math.min(100, Math.round((sumEarned / sumMax) * 100));
                touchedSkills.push(k);
            }
        });
    }

    const ctxBar = document.getElementById('topicRadarChartCanvas').getContext('2d');
    if (histBarChartInstance) histBarChartInstance.destroy();

    // Biểu đồ chỉ vẽ những năng lực đã có bằng chứng đánh giá; không vẽ cột 0% giả cho năng lực chưa học/chưa thi.
    const chartSkills = touchedSkills.length ? touchedSkills : [];
    const chartLabels = chartSkills.length ? chartSkills.map(k => SKILL_TAXONOMY[k].name) : ['Chưa có dữ liệu năng lực'];
    const chartValues = chartSkills.length ? chartSkills.map(k => skillAverages[k]) : [0];
    const chartColors = ['#f472b6', '#fb7185', '#f59e0b', '#a855f7', '#ec4899', '#e11d48'];

    histBarChartInstance = new Chart(ctxBar, {
        type: 'bar',
        data: {
            labels: chartLabels,
            datasets: [{
                label: 'Độ thành thạo (%)',
                data: chartValues,
                backgroundColor: chartValues.map((_, i) => chartColors[i % chartColors.length]),
                borderRadius: 8,
                borderSkipped: false,
                barThickness: 16
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    min: 0,
                    max: 100,
                    ticks: { stepSize: 20, callback: (v) => v + '%', color: '#000000', font: { family: 'Quicksand', weight: 'bold' } },
                    grid: { color: 'rgba(251, 207, 232, 0.3)' }
                },
                y: {
                    grid: { display: false },
                    ticks: { font: { family: 'Quicksand', weight: 'bold', size: 14 }, color: '#000000' }
                }
            },
            plugins: {
                legend: { display: false },
                tooltip: { callbacks: { label: (ctx) => ` Độ thành thạo: ${ctx.raw}%` } }
            }
        },
        plugins: [{
            id: 'barValueLabels',
            afterDatasetsDraw(chart) {
                const { ctx } = chart;
                if (!chartSkills.length) return;
                chart.data.datasets[0].data.forEach((val, i) => {
                    const meta = chart.getDatasetMeta(0).data[i];
                    if (!meta) return;
                    ctx.save();
                    ctx.font = 'bold 16px Quicksand, sans-serif';
                    ctx.fillStyle = '#1e293b';
                    ctx.textAlign = 'left';
                    ctx.textBaseline = 'middle';
                    ctx.fillText(`${val}%`, meta.x + 6, meta.y);
                    ctx.restore();
                });
            }
        }]
    });

    renderPedagogicalEvaluation(rows, skillAverages, touchedSkills);
    renderHistoryTable(rows, sheetName, examSkillBlueprint);
}

function renderPedagogicalEvaluation(rows, skillAverages, touchedSkills) {
    const box = document.getElementById('pedagogical-evaluation-box');
    if (!box) return;

    const studentName = getStudentFirstName();
    const count = rows.length;
    const avgScore = count ? (rows.reduce((acc, r) => acc + Number(r.score || r.tongDiem || 0), 0) / count) : 0;
    const avgScoreStr = avgScore.toFixed(1);

    // 1. Đánh giá tổng quan — phải khớp thật với điểm số, không khen chung chung bất kể kết quả
    let overviewText;
    if (avgScore >= 8) {
        overviewText = `Con nắm rất vững kiến thức trọng tâm, làm bài nghiêm túc và đạt kết quả xuất sắc.`;
    } else if (avgScore >= 6.5) {
        overviewText = `Con nắm khá tốt kiến thức trọng tâm, tuy nhiên vẫn còn một vài chỗ cần luyện thêm để đạt kết quả cao hơn.`;
    } else if (avgScore >= 5) {
        overviewText = `Con đã nắm được kiến thức cơ bản nhưng chưa thật chắc, cần ôn luyện thêm để tiến bộ hơn.`;
    } else {
        overviewText = `Con còn gặp khó khăn với nội dung này, ba mẹ nên đồng hành ôn luyện thêm cùng con nhé.`;
    }

    // 2 & 3. Thế mạnh / điểm cần khắc phục — CHỈ lấy từ những nhóm bé đã thực sự luyện tập,
    // tuyệt đối không nhận xét về nhóm bé chưa hề động tới (tránh nói sai với thực tế).
    const validSkills = (touchedSkills && touchedSkills.length) ? touchedSkills : [];
    const sortedValid = [...validSkills].sort((a, b) => skillAverages[b] - skillAverages[a]);

    let strengthHtml, weaknessHtml;
    if (sortedValid.length >= 2) {
        const top1 = SKILL_TAXONOMY[sortedValid[0]].name;
        const top2 = SKILL_TAXONOMY[sortedValid[1]].name;
        strengthHtml = `Con đạt độ thành thạo tốt ở các nhóm: <strong>${escapeHtml(top1)}</strong> (${skillAverages[sortedValid[0]]}%) và <strong>${escapeHtml(top2)}</strong> (${skillAverages[sortedValid[1]]}%).`;

        const weak1 = sortedValid[sortedValid.length - 1];
        weaknessHtml = `Con cần luyện thêm ở mảng: <strong>${escapeHtml(SKILL_TAXONOMY[weak1].name)}</strong> (${skillAverages[weak1]}%). ${escapeHtml(SKILL_TAXONOMY[weak1].advice)}`;
    } else if (sortedValid.length === 1) {
        const only1 = sortedValid[0];
        strengthHtml = `Con đạt ${skillAverages[only1]}% ở nhóm <strong>${escapeHtml(SKILL_TAXONOMY[only1].name)}</strong> — mảng duy nhất bé đã luyện tập tới thời điểm này.`;
        weaknessHtml = `Bé mới luyện tập 1 nhóm kỹ năng, cô chưa đủ dữ liệu để đánh giá toàn diện. Ba mẹ khuyến khích con hoàn thành thêm các Bài tập khác nhé!`;
    } else {
        strengthHtml = `Bé chưa có đủ dữ liệu luyện tập để đánh giá thế mạnh.`;
        weaknessHtml = `Bé chưa có đủ dữ liệu luyện tập để đánh giá điểm cần khắc phục.`;
    }

    const plainTextForSpeech =
        `Đánh giá tổng quan năng lực và xu hướng tiến bộ. Học sinh ${currentUser.hoTen} đã hoàn thành ${count} bài kiểm tra với điểm số trung bình tích lũy đạt ${avgScoreStr} trên 10 điểm. ${overviewText} `
        + `Khen ngợi và thế mạnh nổi trội. ${strengthHtml.replace(/<[^>]+>/g, '')} `
        + `Điểm cần lưu ý và khắc phục. ${weaknessHtml.replace(/<[^>]+>/g, '')} `
        + `Kế hoạch bồi dưỡng và hướng dẫn phụ huynh. Ba mẹ nên dành 15 phút mỗi tối cùng con ôn lại các phép tính, đặt câu hỏi gợi mở và khen ngợi kịp thời để giúp ${studentName} giữ vững niềm yêu thích môn Toán nhé!`;
    currentPedagogicalText = plainTextForSpeech;

    box.innerHTML = `
        <div class="bg-white/80 p-3 rounded-xl border border-amber-200">
            <span class="text-amber-700 font-extrabold block mb-0.5">🌟 1. Đánh giá tổng quan năng lực & xu hướng tiến bộ:</span>
            <p class="text-gray-700">Học sinh <strong>${escapeHtml(currentUser.hoTen)}</strong> đã hoàn thành <strong>${count} bài kiểm tra</strong> với điểm số trung bình tích lũy đạt <strong class="text-pink-600">${avgScoreStr}/10 điểm</strong>. ${overviewText}</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div class="bg-emerald-50/70 p-3 rounded-xl border border-emerald-200">
                <span class="text-emerald-700 font-extrabold block mb-0.5">✅ 2. Khen ngợi & thế mạnh nổi trội:</span>
                <p class="text-gray-700">${strengthHtml}</p>
            </div>

            <div class="bg-rose-50/70 p-3 rounded-xl border border-rose-200">
                <span class="text-rose-700 font-extrabold block mb-0.5">⚠️ 3. Điểm cần lưu ý & khắc phục:</span>
                <p class="text-gray-700">${weaknessHtml}</p>
            </div>
        </div>

        <div class="bg-white/80 p-3 rounded-xl border border-purple-200">
            <span class="text-purple-700 font-extrabold block mb-0.5">💡 4. Kế hoạch bồi dưỡng & hướng dẫn phụ huynh:</span>
            <p class="text-gray-700">Ba mẹ nên dành 15 phút mỗi tối cùng con ôn lại các phép tính, đặt câu hỏi gợi mở và khen ngợi kịp thời để giúp ${studentName} giữ vững niềm yêu thích môn Toán nhé!</p>
        </div>
    `;
}

function renderHistoryTable(rows, sheetName, examSkillBlueprint = {}) {
    const tbody = document.getElementById('hist-table-body');
    if (!tbody) return;

    if (!rows.length) {
        tbody.innerHTML = `<tr><td colspan="11" class="py-4 text-gray-400">Chưa ghi nhận lịch sử bài làm nào</td></tr>`;
        return;
    }

    const isWeekly = sheetName === 'LichSuTienTrinhTuan';
    const skillKeys = ['C1', 'C2', 'C3', 'C4', 'C5', 'C6'];

    // Trả về null khi năng lực chưa có dữ liệu. Giá trị 0 chỉ được giữ khi thật sự có dữ liệu 0 điểm.
    const getScoreVal = (r, num, colName) => {
        const candidates = [r[`diemC${num}`], r[colName], r[`diem_c${num}`], r[`C${num}`], r[`C${num}_Dung`]];
        for (const val of candidates) {
            if (val === undefined || val === null || val === '' || val === '--') continue;
            const parsed = Number(val);
            if (Number.isFinite(parsed)) return parsed;
        }
        return null;
    };

    // Với đề thi, JSON đề là nguồn xác định năng lực nào thực sự được kiểm tra.
    // Điều này cũng sửa dữ liệu lịch sử cũ từng lưu 0 cho năng lực không có câu trong đề.
    const isExamSkillAssessed = (r, k) => {
        if (isWeekly) return true;
        const examNo = Number(r.deSo);
        const blueprint = examNo > 0 ? examSkillBlueprint?.[examNo] : null;
        if (!blueprint) return true; // Không có blueprint thì chỉ dựa vào dữ liệu đã lưu.
        return Number(blueprint[k] || 0) > 0;
    };

    const totalRows = rows.length;
    let sumTongDiem = 0;
    rows.forEach(r => { sumTongDiem += Number(r.tongDiem || r.score || 0); });
    const avgTong = (sumTongDiem / totalRows).toFixed(1);

    let summaryCells = '';
    let bodyRows = '';

    if (isWeekly) {
        // Tổng hợp: % = tổng câu đúng / tổng câu đã làm THẬT của đúng nhóm kỹ năng đó
        const agg = {};
        skillKeys.forEach(k => { agg[k] = { correct: 0, total: 0 }; });
        rows.forEach(r => {
            skillKeys.forEach(k => {
                const cell = getSkillCell(r, k);
                if (!cell) return;
                agg[k].correct += cell.correct;
                agg[k].total += cell.total;
            });
        });
        skillKeys.forEach(k => {
            const a = agg[k];
            summaryCells += `<td class="py-2 px-1">${a.total > 0 ? Math.round((a.correct / a.total) * 100) + '%' : ''}</td>`;
        });

        rows.forEach((r, idx) => {
            const itemDiem = r.tongDiem || r.score || '--';
            const dateStr = formatDateOnly(r.Timestamp || r.ngayLam);
            const durationStr = r.thoiGianLamBai || '--';

            let skillCells = '';
            skillKeys.forEach(k => {
                const cell = getSkillCell(r, k);
                if (!cell) { skillCells += `<td class="py-2 px-1"></td>`; return; }
                const pct = cell.total > 0 ? Math.round((cell.correct / cell.total) * 100) : 0;
                skillCells += `<td class="py-2 px-1">${cell.correct}/${cell.total} <span class="text-gray-400">(${pct}%)</span></td>`;
            });

            bodyRows += `
                <tr class="hover:bg-pink-50/30 transition-colors">
                    <td class="py-2.5 px-2">${idx + 1}</td>
                    <td class="py-2.5 px-2 font-black">${escapeHtml(r.chuDe || r.chude || `Bài tập ${r.tuan || (idx + 1)}`)}</td>
                    <td class="py-2.5 px-2 font-black text-rose-600">${itemDiem}</td>
                    ${skillCells}
                    <td class="py-2.5 px-2 text-gray-500">${dateStr}</td>
                    <td class="py-2.5 px-2 text-gray-500">${durationStr}</td>
                </tr>
            `;
        });
    } else {
        // Đề thi: trung bình từng năng lực chỉ tính trên những đề CÓ kiểm tra năng lực đó.
        // Nếu cả học kỳ chưa có dữ liệu của một năng lực, ô tổng hợp để trống hoàn toàn.
        skillKeys.forEach((k, i) => {
            let sum = 0;
            let count = 0;
            rows.forEach(r => {
                if (!isExamSkillAssessed(r, k)) return;
                const val = getScoreVal(r, i + 1, SKILL_TAXONOMY[k].sheetCol);
                if (val === null) return;
                sum += val;
                count++;
            });
            summaryCells += `<td class="py-2 px-1">${count > 0 ? (sum / count).toFixed(1) : ''}</td>`;
        });

        rows.forEach((r, idx) => {
            const itemDiem = r.tongDiem || r.score || '--';
            const dateStr = formatDateOnly(r.Timestamp || r.ngayLam);
            const durationStr = r.thoiGianLamBai || '--';

            let examSkillCells = '';
            skillKeys.forEach((k, i) => {
                if (!isExamSkillAssessed(r, k)) {
                    examSkillCells += `<td class="py-2 px-1"></td>`;
                    return;
                }
                const val = getScoreVal(r, i + 1, SKILL_TAXONOMY[k].sheetCol);
                examSkillCells += `<td class="py-2 px-1">${val === null ? '' : val}</td>`;
            });

            bodyRows += `
                <tr class="hover:bg-pink-50/30 transition-colors">
                    <td class="py-2.5 px-2">${idx + 1}</td>
                    <td class="py-2.5 px-2 font-black">${r.deSo ? `Đề ${r.deSo}` : `Bài tập ${r.tuan || (idx + 1)}`}</td>
                    <td class="py-2.5 px-2 font-black text-rose-600">${itemDiem}</td>
                    ${examSkillCells}
                    <td class="py-2.5 px-2 text-gray-500">${dateStr}</td>
                    <td class="py-2.5 px-2 text-gray-500">${durationStr}</td>
                </tr>
            `;
        });
    }

    const html = `
        <tr class="bg-pink-50/80 font-black text-rose-700 border-b border-pink-200">
            <td class="py-2.5 px-2">TB</td>
            <td class="py-2.5 px-2">Trung bình</td>
            <td class="py-2.5 px-2">${avgTong}</td>
            ${summaryCells}
            <td class="py-2.5 px-2">--</td>
            <td class="py-2.5 px-2">--</td>
        </tr>
        ${bodyRows}
    `;
    tbody.innerHTML = html;
}

// ==========================================
// ĐỘNG CƠ ÂM THANH: GOOGLE TTS CHỊ BAN MAI
// ==========================================
function stopSpeaking() {
    try {
        if (banMaiAudio) {
            banMaiAudio.pause();
            banMaiAudio.currentTime = 0;
            banMaiAudio.onended = null;
        }
    } catch (e) {}
}

function speakVietnamese(text, rate = 0.96) {
    if (!text) return;
    try {
        stopSpeaking();

        let cleanText = String(text)
            .replace(/<[^>]*>/g, '')
            // Chuẩn hóa ký hiệu toán học để Google TTS đọc đúng bằng tiếng Việt.
            // Chỉ thay dấu khi nó nằm giữa số / dấu ?, tránh làm hỏng dấu gạch nối trong chữ.
            .replace(/(\d|\?)\s*[−–—-]\s*(?=\d|\?)/g, '$1 trừ ')
            .replace(/(\d|\?)\s*\+\s*(?=\d|\?)/g, '$1 cộng ')
            .replace(/(\d|\?)\s*=\s*(?=\d|\?)/g, '$1 bằng ')
            .replace(/b-a/g, 'bờ a ba')
            .replace(/c\/k/g, 'cờ hoặc ca')
            .replace(/g\/gh/g, 'gờ đơn hoặc gờ kép')
            .replace(/ng\/ngh/g, 'ngờ đơn hoặc ngờ kép')
            .trim();

        if (!cleanText) return;

        if (cleanText.length <= 180) {
            const encoded = encodeURIComponent(cleanText);
            banMaiAudio.src = `https://translate.google.com/translate_tts?ie=UTF-8&tl=vi&client=tw-ob&q=${encoded}`;
            banMaiAudio.playbackRate = rate;
            const playPromise = banMaiAudio.play();
            if (playPromise !== undefined) {
                playPromise.catch(() => {});
            }
            return;
        }

        const sentences = cleanText.match(/[^.!?\n]+[.!?\n]*/g) || [cleanText];
        let sIdx = 0;
        function playSentence() {
            if (sIdx >= sentences.length) return;
            const s = sentences[sIdx++].trim();
            if (!s) { playSentence(); return; }
            const encoded = encodeURIComponent(s);
            banMaiAudio.src = `https://translate.google.com/translate_tts?ie=UTF-8&tl=vi&client=tw-ob&q=${encoded}`;
            banMaiAudio.playbackRate = rate;
            banMaiAudio.onended = playSentence;
            const playPromise = banMaiAudio.play();
            if (playPromise !== undefined) {
                playPromise.catch(() => {});
            }
        }
        playSentence();
    } catch (err) {}
}

function speakCurrentQuestion() {
    const q = activeQuestionsList[currentQIndex];
    if (!q) return;
    const textToRead = q.audio_text || q.reading_passage || q.question_text;
    speakVietnamese(textToRead, 0.96);
}

let currentPedagogicalText = '';
function speakPedagogicalEvaluation() {
    if (!currentPedagogicalText) return;
    speakVietnamese(currentPedagogicalText, 0.96);
}

function playAudio(type) {
    try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!audioCtx && AudioContext) audioCtx = new AudioContext();
        if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
        if (!audioCtx) return;

        const now = audioCtx.currentTime;

        if (type === 'correct') {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(523.25, now);
            osc.frequency.exponentialRampToValueAtTime(783.99, now + 0.12);
            osc.frequency.exponentialRampToValueAtTime(1046.50, now + 0.25);
            gain.gain.setValueAtTime(0.3, now);
            gain.gain.linearRampToValueAtTime(0.01, now + 0.35);
            osc.start(now);
            osc.stop(now + 0.35);
        } else if (type === 'wrong') {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.type = 'square';
            osc.frequency.setValueAtTime(300, now);
            gain.gain.setValueAtTime(0.001, now);
            gain.gain.linearRampToValueAtTime(0.22, now + 0.01);
            gain.gain.setValueAtTime(0.22, now + 0.09);
            gain.gain.linearRampToValueAtTime(0.001, now + 0.1);
            gain.gain.setValueAtTime(0.001, now + 0.14);
            gain.gain.linearRampToValueAtTime(0.22, now + 0.15);
            gain.gain.setValueAtTime(0.22, now + 0.23);
            gain.gain.linearRampToValueAtTime(0.001, now + 0.24);
            osc.start(now);
            osc.stop(now + 0.25);
        } else if (type === 'win') {
            [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
                setTimeout(() => {
                    const o = audioCtx.createOscillator(), g = audioCtx.createGain();
                    o.connect(g); g.connect(audioCtx.destination);
                    o.frequency.value = freq; g.gain.setValueAtTime(0.2, audioCtx.currentTime);
                    g.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
                    o.start(); o.stop(audioCtx.currentTime + 0.3);
                }, i * 150);
            });
        }
    } catch (e) {}
}

function initQuizPallet() {
    updateQuizPalletUI();
}

function updateQuizPalletUI() {
    const container = document.getElementById('quiz-pallet-container');
    if (!container) return;
    if (!activeQuestionsList || !activeQuestionsList.length) { container.innerHTML = ''; return; }

    const isRoadmap = !!activeRoadmapContext;
    const isExam = !!activeExamContext;
    const total = activeQuestionsList.length;

    if (isExam) {
        container.className = `grid gap-1 max-w-xl mx-2`;
        container.style.gridTemplateColumns = `repeat(${total}, minmax(0, 1fr))`;
    } else {
        container.className = 'grid grid-cols-10 gap-1.5 max-w-xl mx-2';
        container.style.gridTemplateColumns = '';
    }

    const btnSize = isExam ? 'w-6 h-6 md:w-7 md:h-7 text-[10px] md:text-xs' : 'w-8 h-8 text-xs';

    let html = '';
    activeQuestionsList.forEach((q, idx) => {
        const answer = userAnswers[idx];
        const isAnswered = answer !== undefined;
        const isCurrent = idx === currentQIndex;
        let cls = 'bg-white text-pink-400 border-pink-200 hover:bg-pink-50';

        if (isAnswered) {
            if (isRoadmap) {
                const isCorrect = answer === q.answer;
                cls = isCorrect
                    ? 'bg-emerald-400 text-white border-emerald-500 hover:bg-emerald-500'
                    : 'bg-red-200 text-red-800 border-red-400 hover:bg-red-300';
            } else {
                // Chế độ thi: không lộ đúng/sai, nhưng câu ĐÃ TRẢ LỜI phải đổi màu KHÁC HẲN
                // với câu ĐANG LÀM (đang dùng gradient pink->purple) để không bị lẫn khi nhìn nhanh.
                cls = 'bg-emerald-500 text-white border-emerald-600 hover:bg-emerald-600';
            }
        }
        if (isCurrent) cls = 'bg-gradient-to-br from-pink-500 to-purple-500 text-white border-pink-500 shadow-md';
        html += `<button onclick="jumpToQuestion(${idx})" class="${btnSize} shrink-0 rounded-xl border-2 font-black flex items-center justify-center transition-colors duration-150 ${cls}">${idx + 1}</button>`;
    });
    container.innerHTML = html;
}

function jumpToQuestion(idx) {
    stopSpeaking();
    if (idx < 0 || idx >= activeQuestionsList.length) return;
    currentQIndex = idx;
    loadQuestion();
}

function formatDuration(ms) {
    const s = Math.round(ms / 1000);
    return `${Math.floor(s / 60)} phút ${s % 60} giây`;
}

function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

function showLoadingOverlay(msg) {
    let el = document.getElementById('loading-overlay');
    if (!el) {
        el = document.createElement('div');
        el.id = 'loading-overlay';
        el.className = 'fixed inset-0 bg-black/30 flex items-center justify-center z-50';
        el.innerHTML = `<div class="bg-white px-6 py-4 rounded-2xl shadow-xl font-extrabold text-pink-600 flex items-center space-x-3"><i class="fa-solid fa-spinner fa-spin"></i><span id="loading-overlay-text"></span></div>
/* Bài tập Toán: chữ rõ hơn và ưu tiên mô hình trực quan. */
#class1-math-runtime #view-quiz.roadmap-exercise-mode #question-box h3{font-size:clamp(20px,2.05vw,28px)!important;line-height:1.35!important;}
#class1-math-runtime #view-quiz.roadmap-exercise-mode #question-box .option-btn{font-size:clamp(17px,1.55vw,22px)!important;}
#class1-math-runtime #view-quiz.roadmap-exercise-mode #question-box .opt-text{font-size:clamp(17px,1.55vw,22px)!important;line-height:1.3!important;}
#class1-math-runtime #view-quiz.roadmap-exercise-mode #question-box{width:100%!important;max-width:none!important;}
@media(max-width:767px){#class1-math-runtime #view-quiz.roadmap-exercise-mode #question-box h3{font-size:20px!important}#class1-math-runtime #view-quiz.roadmap-exercise-mode #question-box .option-btn,#class1-math-runtime #view-quiz.roadmap-exercise-mode #question-box .opt-text{font-size:17px!important}}
`;
        document.body.appendChild(el);
    }
    document.getElementById('loading-overlay-text').textContent = msg;
    el.classList.remove('hidden');
}
function hideLoadingOverlay() { document.getElementById('loading-overlay')?.classList.add('hidden'); }

function toggleAutoSpeech() {
    autoSpeechEnabled = !autoSpeechEnabled;
    localStorage.setItem('autoSpeechEnabled', autoSpeechEnabled ? 'true' : 'false');
    if (!autoSpeechEnabled) stopSpeaking();
    updateAutoSpeechButtonUI();
}

function updateAutoSpeechButtonUI() {
    const btn = document.getElementById('btn-toggle-autospeech');
    if (!btn) return;
    const icon = btn.querySelector('i');
    if (autoSpeechEnabled) {
        icon.className = 'fa-solid fa-volume-high';
        btn.title = 'Đang BẬT tự động đọc câu hỏi — bấm để tắt';
        btn.classList.remove('bg-gray-100', 'text-gray-400', 'border-gray-200');
        btn.classList.add('bg-pink-50', 'text-pink-600', 'border-pink-200');
    } else {
        icon.className = 'fa-solid fa-volume-xmark';
        btn.title = 'Đang TẮT tự động đọc câu hỏi — bấm để bật';
        btn.classList.remove('bg-pink-50', 'text-pink-600', 'border-pink-200');
        btn.classList.add('bg-gray-100', 'text-gray-400', 'border-gray-200');
    }
}

// Standalone DOMContentLoaded bootstrap is handled by the Class 1 module adapter.



// ============================================================================
// CLASS 1 MODULE ADAPTER
// Educational engine above remains the standalone Math engine. This adapter only
// binds it to the shared Class 1 shell, new JSON layout and shared image catalog.
// ============================================================================
const __mathInlineBridgeGetters_ = {
    "activeBaiHocContext": () => activeBaiHocContext,
    "closeAppDialog": () => closeAppDialog,
    "escapeJsString_": () => escapeJsString_,
    "startRandomExam": () => startRandomExam,
    "updateDiscoverBreadcrumb_": () => updateDiscoverBreadcrumb_,
    "openMainTab": () => openMainTab,
    "returnToTopicLecture": () => returnToTopicLecture,
    "switchAppView": () => switchAppView,
    "goHome": () => goHome,
    "openMiniGameHub": () => openMiniGameHub,
    "openGamePlay": () => openGamePlay,
    "openAuthModal": () => openAuthModal,
    "closePremiumModal": () => closePremiumModal,
    "openBaiHocHub": () => openBaiHocHub,
    "openBaiHocLesson": () => openBaiHocLesson,
    "checkMathLessonChoice_": () => checkMathLessonChoice_,
    "checkMathLessonFill_": () => checkMathLessonFill_,
    "toggleMathLessonAnswer_": () => toggleMathLessonAnswer_,
    "openEpsilonMethodHub_": () => openEpsilonMethodHub_,
    "speakNumberSenseActivity_": () => speakNumberSenseActivity_,
    "speakOperationSenseActivity_": () => speakOperationSenseActivity_,
    "openGenericMathLab_": () => openGenericMathLab_,
    "renderGenericMathLabHub_": () => renderGenericMathLabHub_,
    "startGenericMathLabJourney_": () => startGenericMathLabJourney_,
    "genericLabSpeakCurrent_": () => genericLabSpeakCurrent_,
    "renderGenericMathLabActivity_": () => renderGenericMathLabActivity_,
    "genericLabShowHint_": () => genericLabShowHint_,
    "genericLabChooseFromButton_": () => genericLabChooseFromButton_,
    "genericLabNext_": () => genericLabNext_,
    "openNumberSenseHub": () => openNumberSenseHub,
    "startNumberSenseJourney_": () => startNumberSenseJourney_,
    "renderNumberSenseActivity_": () => renderNumberSenseActivity_,
    "numberSenseShowHint_": () => numberSenseShowHint_,
    "numberSenseChoose_": () => numberSenseChoose_,
    "numberSenseTouchCount_": () => numberSenseTouchCount_,
    "numberSenseAddObject_": () => numberSenseAddObject_,
    "numberSenseRemoveObject_": () => numberSenseRemoveObject_,
    "numberSenseCheckBuild_": () => numberSenseCheckBuild_,
    "numberSenseHideGroup_": () => numberSenseHideGroup_,
    "numberSenseRearrange_": () => numberSenseRearrange_,
    "numberSenseToggleFrame_": () => numberSenseToggleFrame_,
    "numberSenseCheckFrame_": () => numberSenseCheckFrame_,
    "numberSenseNext_": () => numberSenseNext_,
    "openOperationSenseHub": () => openOperationSenseHub,
    "startOperationSenseJourney_": () => startOperationSenseJourney_,
    "renderOperationSenseActivity_": () => renderOperationSenseActivity_,
    "operationSenseShowHint_": () => operationSenseShowHint_,
    "operationSenseChoose_": () => operationSenseChoose_,
    "operationSenseAddJoinObject_": () => operationSenseAddJoinObject_,
    "operationSenseCheckJoin_": () => operationSenseCheckJoin_,
    "operationSenseToggleRemove_": () => operationSenseToggleRemove_,
    "operationSenseCheckTake_": () => operationSenseCheckTake_,
    "operationSenseCombine_": () => operationSenseCombine_,
    "operationSenseToggleSplit_": () => operationSenseToggleSplit_,
    "operationSenseCheckSplit_": () => operationSenseCheckSplit_,
    "operationSensePathStep_": () => operationSensePathStep_,
    "operationSenseMakeTenMove_": () => operationSenseMakeTenMove_,
    "operationSenseCheckMakeTen_": () => operationSenseCheckMakeTen_,
    "operationSenseNext_": () => operationSenseNext_,
    "openTopic": () => openTopic,
    "MUC5_INTRO_AUDIO_": () => MUC5_INTRO_AUDIO_,
    "openMuc5IntroLesson_": () => openMuc5IntroLesson_,
    "speakLecture": () => speakLecture,
    "selectSubtopic": () => selectSubtopic,
    "handleNextExamFromReport": () => handleNextExamFromReport,
    "openRoadmap": () => openRoadmap,
    "showLockedExercise_": () => showLockedExercise_,
    "selectRoadmapWeek": () => selectRoadmapWeek,
    "muc1PlaceCountItem": () => muc1PlaceCountItem,
    "muc1PlacePartItem": () => muc1PlacePartItem,
    "muc1ResetInteraction": () => muc1ResetInteraction,
    "muc2MoveAddItem_": () => muc2MoveAddItem_,
    "muc2RemoveSubItem_": () => muc2RemoveSubItem_,
    "muc2ResetInteraction_": () => muc2ResetInteraction_,
    "topic3SortPickNumber_": () => topic3SortPickNumber_,
    "topic3SortRemoveAt_": () => topic3SortRemoveAt_,
    "topic3SortReset_": () => topic3SortReset_,
    "topic3SortChoose_": () => topic3SortChoose_,
    "topic3SortUndo_": () => topic3SortUndo_,
    "topic3SortReset_": () => topic3SortReset_,
    "checkAnswer": () => checkAnswer,
    "prevQuestion": () => prevQuestion,
    "nextQuestion": () => nextQuestion,
    "triggerSubmitQuizPrompt": () => triggerSubmitQuizPrompt,
    "openReviewWrongModal": () => openReviewWrongModal,
    "closeReviewWrongModal": () => closeReviewWrongModal,
    "openHistoryModal": () => openHistoryModal,
    "closeHistoryModal": () => closeHistoryModal,
    "speakVietnamese": () => speakVietnamese,
    "speakCurrentQuestion": () => speakCurrentQuestion,
    "speakPedagogicalEvaluation": () => speakPedagogicalEvaluation,
    "jumpToQuestion": () => jumpToQuestion,
    "escapeHtml": () => escapeHtml,
};
const __mathPreviousGlobals_ = new Map();
function installMathInlineBridge_() {
    Object.entries(__mathInlineBridgeGetters_).forEach(([name, getter]) => {
        if (__mathPreviousGlobals_.has(name)) return;
        const prev = Object.getOwnPropertyDescriptor(window, name);
        if (prev && !prev.configurable) return;
        __mathPreviousGlobals_.set(name, prev || null);
        Object.defineProperty(window, name, { configurable:true, enumerable:false, get:getter });
    });
}
function removeMathInlineBridge_() {
    __mathPreviousGlobals_.forEach((desc, name) => {
        try { if (desc) Object.defineProperty(window, name, desc); else delete window[name]; } catch (_) {}
    });
    __mathPreviousGlobals_.clear();
}

const MATH_RUNTIME_HTML_ = "<div class=\"w-full max-w-5xl flex flex-col space-y-1.5 md:space-y-2 p-1 md:p-2\" id=\"screen-dashboard\">\n<header class=\"app-main-header w-full bg-white/95 backdrop-blur-md rounded-2xl shadow-sm border-2 border-pink-200\">\n<button class=\"flex items-center justify-center bg-white border border-pink-300 shadow-sm shrink-0 overflow-hidden p-0 transition-shadow duration-200 hover:border-pink-400 hover:shadow-[0_0_18px_rgba(244,114,182,0.65)]\" id=\"btn-header-home\" onclick=\"goHome()\" title=\"Về trang chủ\">\n<img alt=\"Trang chủ Toán 1\" class=\"w-full h-full object-cover\" src=\"logo-home.png\"/>\n</button>\n<nav aria-label=\"Điều hướng chính\" id=\"main-module-tabs\">\n<div>\n<button class=\"main-module-tab\" data-tab=\"discover\" id=\"main-tab-discover\" onclick=\"openMainTab('discover')\"><span>🧭</span><span>Khám phá</span></button>\n<button class=\"main-module-tab\" data-tab=\"lessons\" id=\"main-tab-lessons\" onclick=\"openMainTab('lessons')\"><span>📖</span><span>Bài học</span><span class=\"hidden absolute -top-1 -right-1 text-[10px]\" id=\"bai-hoc-lock-icon\">🔒</span></button>\n<button class=\"main-module-tab\" data-tab=\"exercises\" id=\"main-tab-exercises\" onclick=\"openMainTab('exercises')\"><span>✏️</span><span>Bài tập</span><span class=\"hidden absolute -top-1 -right-1 text-[10px]\" id=\"roadmap-lock-icon\">🔒</span></button>\n<button class=\"main-module-tab\" data-tab=\"review\" id=\"main-tab-review\" onclick=\"openMainTab('review')\"><span>🧠</span><span>Ôn tập</span><span class=\"hidden absolute -top-1 -right-1 text-[10px]\" id=\"review-lock-icon\">🔒</span></button>\n<button class=\"main-module-tab\" data-tab=\"exams\" id=\"main-tab-exams\" onclick=\"openMainTab('exams')\"><span>🏆</span><span>Đề thi</span><span class=\"hidden absolute -top-1 -right-1 text-[10px]\" id=\"exam-lock-icon\">🔒</span></button>\n<button class=\"main-module-tab\" data-tab=\"games\" id=\"main-tab-games\" onclick=\"openMainTab('games')\"><span>🎮</span><span>Mini games</span><span class=\"hidden absolute -top-1 -right-1 text-[10px]\" id=\"minigame-lock-icon\">🔒</span></button>\n</div>\n</nav>\n<div class=\"flex items-center\" id=\"header-info-zone\">\n<div class=\"flex flex-col space-y-0.5 bg-pink-50/90 px-1.5 md:px-2.5 py-1 rounded-xl border border-pink-200 shadow-inner\" id=\"header-star-box\">\n<div class=\"flex items-center justify-between space-x-2 font-extrabold\">\n<span class=\"px-1.5 py-0.5 bg-emerald-500 text-white rounded text-[10px] shadow-sm flex items-center justify-center\"><i class=\"fa-solid fa-star md:mr-0.5\"></i><span class=\"hidden md:inline\"> Đúng</span></span>\n<span class=\"text-emerald-600 font-extrabold text-xs\" id=\"star-green-count\">0</span>\n</div>\n<div class=\"flex items-center justify-between space-x-2 font-extrabold\">\n<span class=\"px-1.5 py-0.5 bg-rose-500 text-white rounded text-[10px] shadow-sm flex items-center justify-center\"><i class=\"fa-solid fa-star md:mr-0.5\"></i><span class=\"hidden md:inline\"> Sai</span></span>\n<span class=\"text-rose-600 font-extrabold text-xs\" id=\"star-red-count\">0</span>\n</div>\n</div>\n<div class=\"text-xs font-bold text-gray-600 text-right\" id=\"user-info-box\"></div>\n</div>\n</header>\n<section aria-label=\"Không gian nhận diện và điều hướng\" id=\"app-banner-slot\">\n<div id=\"app-main-banner\">\n<picture>\n<source media=\"(max-width: 767px)\" srcset=\"banner-main-mobile.jpg\"/>\n<img alt=\"Khu vườn học tập của Cô Thỏ Hồng\" src=\"banner-main.jpg\"/>\n</picture>\n</div>\n<div class=\"hidden\" id=\"app-context-banner\">\n<div class=\"flex items-center min-w-0\" id=\"header-learning-tabs\">\n<div class=\"hidden items-center\" id=\"header-level2-tab\">\n<button class=\"flex items-center space-x-1.5 shrink-0 transition-shadow duration-200\" onclick=\"returnToTopicLecture()\">\n<span id=\"header-level2-icon\">🔢</span><span class=\"truncate\" id=\"header-level2-title\">Chủ đề học</span>\n</button>\n</div>\n<div class=\"hidden items-center space-x-1\" id=\"header-level3-tab\"><span class=\"font-bold\">›</span><div class=\"truncate flex items-center\"><span class=\"truncate\" id=\"header-level3-title\">Mục nhỏ</span></div></div>\n<div class=\"hidden items-center space-x-1\" id=\"header-level4-tab\"><span class=\"font-bold\">›</span><div class=\"truncate flex items-center\"><span class=\"truncate\" id=\"header-level4-title\">Mục sâu</span></div></div>\n</div>\n</div>\n</section>\n<main class=\"w-full\" id=\"app-viewport\">\n<!-- VIEW 1: TRANG CHỦ 12 CHỦ ĐỀ -->\n<div class=\"w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2\" id=\"view-dashboard-grid\"></div>\n<!-- VIEW: MỤC 12 - HỌC TOÁN THEO PHƯƠNG PHÁP MỚI -->\n<div class=\"w-full hidden\" id=\"view-epsilon-method-hub\">\n<div class=\"w-full\" id=\"epsilon-method-content\"></div>\n</div>\n<!-- VIEW: 12.1 - HIỂU SỐ VÀ SỐ LƯỢNG -->\n<div class=\"w-full hidden\" id=\"view-number-sense\">\n<div class=\"w-full\" id=\"number-sense-content\"></div>\n</div>\n<!-- VIEW: 12.2 - HIỂU PHÉP CỘNG VÀ PHÉP TRỪ -->\n<div class=\"w-full hidden\" id=\"view-operation-sense\">\n<div class=\"w-full\" id=\"operation-sense-content\"></div>\n</div>\n<!-- MODULE BAI HOC: HIEN THI TRUC TIEP DANH SACH BAI -->\n<div class=\"w-full hidden pastel-card p-3 md:p-5\" id=\"view-bai-hoc-hub\">\n<div class=\"w-full max-w-6xl mx-auto\">\n<div class=\"grid grid-cols-[auto_1fr_auto] items-center gap-3 mb-3\">\n<div class=\"flex items-center gap-2 justify-self-start\" id=\"bai-hoc-semester-tabs\"></div>\n<div class=\"text-center min-w-0\">\n<h2 class=\"text-lg md:text-xl font-black text-purple-700 flex items-center justify-center gap-2\"><span>📖</span><span>Bài học Toán 1</span></h2>\n<p class=\"text-xs md:text-sm text-slate-500 font-bold mt-0.5\" id=\"bai-hoc-hub-subtitle\">Chọn bài và học ngay</p>\n</div>\n<div aria-hidden=\"true\" class=\"w-[180px] hidden md:block\"></div>\n</div>\n<div class=\"grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2\" id=\"bai-hoc-grid\"></div>\n</div>\n</div>\n<!-- VIEW: NỘI DUNG MỘT BÀI HỌC -->\n<div class=\"w-full hidden pastel-card p-3 md:p-5 flex flex-col items-center min-h-[480px]\" id=\"view-bai-hoc-lesson\">\n<div class=\"w-full max-w-5xl\">\n<div class=\"flex items-start justify-between gap-3 mb-3\">\n<div class=\"min-w-0\">\n<div class=\"text-sm md:text-base font-extrabold text-purple-600 mb-1\" id=\"bai-hoc-lesson-meta\">📖 Bài học</div>\n<h2 class=\"text-lg md:text-xl font-black text-slate-800\" id=\"bai-hoc-lesson-title\"></h2>\n</div>\n<button class=\"px-3 py-2 bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 rounded-xl text-xs md:text-sm font-extrabold shrink-0\" id=\"btn-back-bai-hoc-list\" onclick=\"openBaiHocHub(activeBaiHocContext?.semester || 1)\">← Danh sách bài</button>\n</div>\n<div class=\"grid grid-cols-3 gap-2 mb-3\" id=\"bai-hoc-page-tabs\"></div>\n<div class=\"w-full\" id=\"bai-hoc-page-content\"></div>\n<div class=\"flex items-center justify-between gap-3 mt-3 pt-2 border-t border-pink-100\" id=\"bai-hoc-bottom-nav\"></div>\n</div>\n</div>\n<!-- VIEW 2: BÀI GIẢNG -->\n<div class=\"w-full hidden pastel-card p-4 md:p-6 flex flex-col justify-between items-center min-h-[480px]\" id=\"view-lecture\">\n<div class=\"w-full max-w-4xl flex flex-col items-center\">\n<h2 class=\"hidden\" id=\"lecture-title\"></h2>\n<div class=\"w-full bg-pink-50/40 p-3.5 md:p-4 rounded-2xl border-2 border-pink-100 mb-3\">\n<p class=\"text-base md:text-lg text-gray-700 leading-relaxed whitespace-pre-line text-center\" id=\"lecture-content\"></p>\n</div>\n<button class=\"w-full max-w-xs py-2 bg-purple-100 hover:bg-purple-200 text-purple-700 font-extrabold rounded-xl text-sm md:text-base pastel-btn flex items-center justify-center space-x-2 border-2 border-purple-200 shadow-sm mb-2.5\" onclick=\"speakLecture()\">\n<i class=\"fa-solid fa-volume-high text-base\"></i><span>Nghe cô đọc</span>\n</button>\n<div class=\"w-full pt-2 border-t border-pink-100 flex flex-col items-center\">\n<div class=\"grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-2xl\" id=\"lecture-subtopics-list\"></div>\n</div>\n</div>\n<div class=\"w-full flex justify-center mt-2.5 pt-1\">\n<button class=\"w-full max-w-xs py-2 bg-gradient-to-r from-purple-400 to-indigo-400 text-white font-extrabold rounded-xl text-xs md:text-sm pastel-btn shadow-md\" onclick=\"selectSubtopic(null)\">\n                            🌟 Học trộn tất cả các mục\n                        </button>\n</div>\n</div>\n<!-- VIEW 3: PHÒNG LÀM BÀI / THI CHUẨN 16:9 -->\n<div class=\"w-full hidden flex flex-col space-y-1.5\" id=\"view-quiz\">\n<!-- TOP BAR CỦA ĐỀ THI (ẨN HOÀN TOÀN TRONG CHẾ ĐỘ LUYỆN TẬP) -->\n<div class=\"w-full bg-white rounded-2xl p-2.5 border-2 border-pink-200 flex flex-wrap items-center justify-between gap-2.5 shadow-xs\" id=\"quiz-top-bar\">\n<div class=\"flex items-center space-x-2\" id=\"quiz-timer-container\">\n<div class=\"w-8 h-8 rounded-xl bg-pink-50 border border-pink-200 flex items-center justify-center text-pink-500 font-bold text-sm\">\n<i class=\"fa-solid fa-stopwatch\"></i>\n</div>\n<div>\n<span class=\"text-xs font-bold text-gray-400 uppercase tracking-wider block\">Thời gian</span>\n<span class=\"text-base font-black text-rose-500 tracking-wider\" id=\"quiz-timer-display\">40:00</span>\n</div>\n</div>\n<button class=\"ml-auto px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-black text-xs md:text-sm flex items-center space-x-1.5 transition-all shadow-sm pastel-btn\" id=\"btn-submit-quiz\" onclick=\"triggerSubmitQuizPrompt()\">\n<i class=\"fa-solid fa-circle-check\"></i>\n<span>Nộp bài thi</span>\n</button>\n</div>\n<!-- THẺ CARD LÀM BÀI CHÍNH -->\n<div class=\"w-full pastel-card p-3.5 md:p-5 flex flex-col justify-between min-h-[380px]\">\n<!-- HEADER TRONG CARD (CHỈ HIỆN KHI THI) -->\n<div class=\"hidden items-center justify-between flex-wrap gap-2 border-b border-pink-100 pb-2\" id=\"quiz-card-header\">\n<div class=\"flex items-center space-x-2\">\n<span class=\"px-2.5 py-1 bg-pink-100 text-pink-800 text-sm font-black rounded-lg\" id=\"q-badge-index\">CÂU 1 / 13</span>\n<span class=\"px-2.5 py-1 bg-pink-50 text-pink-700 border border-pink-200 text-sm font-bold rounded-lg flex items-center space-x-1\" id=\"q-badge-skill\">\n<i class=\"fa-solid fa-tag text-xs\"></i>\n<span id=\"q-skill-text\">Kiến thức cơ bản</span>\n</span>\n<span class=\"px-2 py-1 bg-amber-50 text-amber-700 border border-amber-200 text-sm font-bold rounded-lg\" id=\"q-badge-score\">(0.5 điểm)</span>\n</div>\n<button class=\"hidden px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-xl text-sm font-extrabold items-center space-x-1.5 transition-shadow duration-200 hover:shadow-[0_0_10px_rgba(99,102,241,0.5)] shadow-xs\" id=\"btn-roadmap-history\" onclick=\"openHistoryModal('LichSuTienTrinhTuan')\">\n<i class=\"fa-solid fa-chart-line\"></i>\n<span>Lịch sử Bài tập</span>\n</button>\n<button class=\"px-3 py-1.5 bg-pink-50 hover:bg-pink-100 text-pink-700 border border-pink-200 rounded-xl text-sm font-extrabold flex items-center space-x-1.5 transition-all pastel-btn shadow-xs\" onclick=\"speakCurrentQuestion()\">\n<i class=\"fa-solid fa-volume-high text-pink-600\"></i>\n<span>Nghe câu hỏi</span>\n</button>\n</div>\n<!-- KHU VỰC CÂU HỎI & ĐÁP ÁN -->\n<div class=\"w-full flex flex-col justify-center items-center flex-1 my-0.5\" id=\"question-box\"></div>\n<!-- ĐIỀU HƯỚNG ĐÁY -->\n<div class=\"w-full pt-1\" id=\"quiz-bottom-nav\">\n<!-- 1. GIAO DIỆN LUYỆN TẬP -->\n<div class=\"flex items-center justify-center gap-3 w-full\" id=\"nav-group-practice\">\n<button class=\"px-5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-extrabold rounded-2xl text-xs md:text-sm pastel-btn border border-gray-200 flex items-center justify-center space-x-1.5 shadow-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed\" id=\"btn-prev-q-prac\" onclick=\"prevQuestion()\">\n<i class=\"fa-solid fa-chevron-left\"></i><span>Câu trước</span>\n</button>\n<div class=\"px-5 py-1.5 bg-pink-50 border border-pink-200 text-pink-700 font-black rounded-full text-xs md:text-sm flex items-center justify-center shadow-xs select-none\" id=\"practice-step-indicator\">\n<span id=\"practice-step-text\">1/59</span>\n</div>\n<button class=\"px-6 py-2 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-black rounded-2xl text-xs md:text-sm pastel-btn shadow-md flex items-center justify-center space-x-1.5 transition-all\" id=\"btn-next-q-prac\" onclick=\"nextQuestion()\">\n<span id=\"btn-next-text-prac\">Câu tiếp theo</span>\n<i class=\"fa-solid fa-chevron-right ml-1\" id=\"btn-next-icon-prac\"></i>\n</button>\n</div>\n<!-- 2. GIAO DIỆN ĐỀ THI -->\n<div class=\"hidden items-center justify-between w-full\" id=\"nav-group-exam\">\n<button class=\"px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-extrabold rounded-xl text-xs md:text-sm pastel-btn border border-gray-200 flex items-center justify-center space-x-1.5 shadow-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed\" id=\"btn-prev-q-exam\" onclick=\"prevQuestion()\">\n<i class=\"fa-solid fa-chevron-left\"></i><span>Câu trước</span>\n</button>\n<div class=\"grid grid-cols-10 gap-1.5 max-w-xl mx-2\" id=\"quiz-pallet-container\"></div>\n<button class=\"px-5 py-2 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-black rounded-xl text-xs md:text-sm pastel-btn shadow-md flex items-center justify-center space-x-1.5 transition-all\" id=\"btn-next-q-exam\" onclick=\"nextQuestion()\">\n<span id=\"btn-next-text-exam\">Câu tiếp theo</span>\n<i class=\"fa-solid fa-chevron-right ml-1\" id=\"btn-next-icon-exam\"></i>\n</button>\n</div>\n</div>\n</div>\n</div>\n<!-- VIEW 4: BÀI TẬP THEO TỪNG BÀI SGK -->\n<div class=\"w-full hidden pastel-card p-3 md:p-5 flex flex-col justify-start items-center\" id=\"view-roadmap\">\n<div class=\"w-full max-w-6xl flex flex-col items-center\">\n<div class=\"flex flex-col sm:flex-row items-center justify-between w-full px-2 mb-2 gap-2\">\n<div>\n<h2 class=\"text-base md:text-lg font-extrabold text-indigo-600 flex items-center space-x-2\"><span>✏️</span><span>Bài tập</span></h2>\n<p class=\"text-[11px] md:text-xs text-gray-500 font-bold\">20 câu mỗi bài · đạt từ 80% để mở Bài tập tiếp theo.</p>\n</div>\n<div class=\"flex items-center gap-3 shrink-0\">\n<div class=\"flex items-center gap-2\" id=\"roadmap-semester-tabs\"></div>\n<button class=\"px-3 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-extrabold rounded-xl border border-indigo-200 text-xs pastel-btn flex items-center space-x-1.5 shadow-sm\" onclick=\"openHistoryModal('LichSuTienTrinhTuan')\">\n<i class=\"fa-solid fa-chart-line text-indigo-600\"></i><span>📊 Lịch sử Bài tập</span>\n</button>\n</div>\n</div>\n<div class=\"w-full flex justify-center items-center overflow-hidden bg-gradient-to-b from-pink-50/30 to-purple-50/30 rounded-2xl border-2 border-pink-100 p-1\" id=\"roadmap-svg-container\"></div>\n</div>\n</div>\n<!-- VIEW: TRUNG TÂM MINI GAME TOÁN 1 -->\n<div class=\"w-full hidden pastel-card p-3 md:p-5 flex flex-col items-center\" id=\"view-minigame-hub\">\n<div class=\"w-full max-w-5xl\">\n<div class=\"text-center mb-4\">\n<h2 class=\"text-base md:text-lg font-extrabold text-teal-600 flex items-center justify-center space-x-2\">\n<span>🎮</span><span>Trung tâm Mini Game Toán 1</span>\n</h2>\n<p class=\"text-[11px] md:text-xs text-gray-500 font-bold\">Học mà chơi - luyện tư duy Toán cùng Cô giáo Thỏ Hồng</p>\n</div>\n<div class=\"grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3\" id=\"minigame-grid\"></div>\n</div>\n</div>\n<!-- VIEW: MÀN CHƠI GAME -->\n<div class=\"w-full hidden pastel-card p-3 md:p-5 flex flex-col items-center\" id=\"view-game-play\">\n<div class=\"w-full max-w-5xl\">\n<div class=\"flex items-center justify-between mb-3 gap-2\">\n<h2 class=\"text-base md:text-lg font-extrabold text-teal-600 flex items-center gap-2 min-w-0\" id=\"game-play-title\"></h2>\n<button class=\"px-3 py-1.5 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-extrabold rounded-xl text-xs md:text-sm shadow-sm pastel-btn shrink-0\" onclick=\"openMiniGameHub()\">\n<i class=\"fa-solid fa-arrow-left\"></i> Chọn game khác\n                            </button>\n</div>\n<div class=\"w-full\" id=\"game-play-container\"></div>\n</div>\n</div>\n<!-- VIEW 5: ĐẤU TRƯỜNG ĐỀ THI (TAB RIÊNG) -->\n<div class=\"w-full hidden pastel-card p-5 md:p-7 flex flex-col justify-between items-center min-h-[480px]\" id=\"view-exam-hub\">\n<div class=\"w-full max-w-5xl\">\n<div class=\"text-center mb-5\">\n<h2 class=\"font-extrabold text-amber-600 text-lg md:text-xl flex items-center justify-center space-x-2\">\n<span>🏆</span><span>Đấu trường đề thi thử</span>\n</h2>\n<p class=\"text-xs md:text-sm text-gray-500 font-bold mt-1\">Thử sức các bộ đề thi chuẩn ma trận 13 câu - đánh giá theo năng lực</p>\n</div>\n<div class=\"grid grid-cols-1 md:grid-cols-3 gap-4\" id=\"exam-categories-grid\"></div>\n</div>\n</div>\n<!-- VIEW 6: MÀN HÌNH KẾT QUẢ & BÁO CÁO -->\n<div class=\"w-full hidden flex flex-col space-y-3\" id=\"view-result\">\n<div class=\"bg-gradient-to-tr from-rose-900 via-pink-950 to-rose-900 rounded-3xl p-4 sm:p-5 text-white shadow-xl relative overflow-hidden\">\n<div class=\"relative z-10 flex flex-col md:flex-row items-center justify-between gap-4\">\n<div class=\"space-y-1 text-center md:text-left\">\n<span class=\"px-3 py-0.5 bg-white/10 backdrop-blur-md rounded-full text-xs font-bold tracking-wider text-pink-200 border border-white/15 inline-block\" id=\"report-exam-badge\">\n                                    Kết quả bài thi\n                                </span>\n<h2 class=\"text-lg sm:text-xl font-black tracking-tight\" id=\"report-student-display\">Học sinh: --</h2>\n<p class=\"text-xs text-pink-200\" id=\"report-meta-display\">Lớp: -- | Mã số: -- | Thời gian: --</p>\n</div>\n<div class=\"flex items-center gap-3\">\n<div class=\"bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-2 text-center\">\n<span class=\"text-[10px] uppercase tracking-wider text-pink-200 font-bold block mb-0.5\">Tổng điểm</span>\n<div class=\"text-2xl sm:text-3xl font-black font-math text-amber-300\" id=\"report-total-score-val\">0.0</div>\n<span class=\"text-[9px] text-pink-200\">Thang điểm 10</span>\n</div>\n<div class=\"bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-2 text-center\">\n<span class=\"text-[10px] uppercase tracking-wider text-pink-200 font-bold block mb-0.5\">Độ chính xác</span>\n<div class=\"text-2xl sm:text-3xl font-black font-math text-emerald-300\" id=\"report-correct-ratio-val\">0/13</div>\n<span class=\"text-[9px] text-pink-200\">Câu đúng</span>\n</div>\n</div>\n</div>\n</div>\n<div class=\"bg-white rounded-3xl p-4 sm:p-5 border border-pink-100 soft-shadow-pink space-y-2.5\">\n<h3 class=\"text-sm sm:text-base font-black text-slate-800 tracking-tight flex items-center space-x-2\">\n<i class=\"fa-solid fa-chart-bar text-pink-600\"></i>\n<span>Bóc tách điểm số &amp; đánh giá năng lực</span>\n</h3>\n<div class=\"grid grid-cols-1 sm:grid-cols-2 gap-2\" id=\"report-topics-list\"></div>\n</div>\n<div class=\"grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-0.5\">\n<button class=\"py-2.5 px-3 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-black text-xs rounded-2xl shadow-xs transition-all flex items-center justify-center space-x-1.5 pastel-btn\" onclick=\"openReviewWrongModal()\">\n<i class=\"fa-solid fa-circle-question text-rose-500\"></i>\n<span>👉 Xem lại các câu làm sai</span>\n</button>\n<button class=\"py-2.5 px-3 bg-pink-50 hover:bg-pink-100 text-pink-700 border border-pink-200 font-black text-xs rounded-2xl shadow-xs transition-all flex items-center justify-center space-x-1.5 pastel-btn\" id=\"report-history-btn\" onclick=\"openHistoryModal('LichSuBaiThi_HK1')\">\n<i class=\"fa-solid fa-chart-line text-pink-600\"></i>\n<span>📊 Lịch sử &amp; biểu đồ tiến trình</span>\n</button>\n<button class=\"py-2.5 px-3 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-black text-xs rounded-2xl shadow-sm transition-all flex items-center justify-center space-x-1.5 pastel-btn\" id=\"report-next-action-btn\" onclick=\"handleNextExamFromReport()\">\n<span id=\"report-next-action-label\">🚀 Làm đề thi tiếp theo</span>\n<i class=\"fa-solid fa-arrow-right\"></i>\n</button>\n</div>\n</div>\n</main>\n</div>\n<div class=\"hidden fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3\" id=\"modal-review-wrong\">\n<div class=\"bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-pink-100 overflow-hidden\">\n<div class=\"p-3.5 border-b border-pink-100 flex items-center justify-between bg-rose-50/50\">\n<div class=\"flex items-center space-x-2 text-rose-800\">\n<i class=\"fa-solid fa-triangle-exclamation text-rose-600\"></i>\n<h3 class=\"font-black text-sm\">Chi tiết các câu trả lời chưa chính xác</h3>\n</div>\n<button class=\"w-7 h-7 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-700\" onclick=\"closeReviewWrongModal()\"><i class=\"fa-solid fa-xmark\"></i></button>\n</div>\n<div class=\"p-4 overflow-y-auto space-y-3 flex-grow text-xs sm:text-sm\" id=\"review-wrong-content\"></div>\n<div class=\"p-3 border-t border-slate-100 flex justify-end bg-slate-50\">\n<button class=\"px-5 py-2 bg-slate-800 text-white font-bold rounded-xl text-xs pastel-btn\" onclick=\"closeReviewWrongModal()\">Đóng lại</button>\n</div>\n</div>\n</div>\n<div class=\"hidden fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4\" id=\"modal-history-progress\">\n<div class=\"bg-white rounded-3xl max-w-5xl w-full max-h-[96vh] flex flex-col shadow-2xl border-2 border-pink-200 overflow-hidden\">\n<div class=\"p-4 sm:p-6 overflow-y-auto space-y-4 flex-grow bg-white\" id=\"printable-report-area\">\n<!-- TRANG 1: THÔNG TIN & BIỂU ĐỒ -->\n<div class=\"space-y-4 page-break-1\">\n<div class=\"p-3.5 sm:p-4 rounded-2xl border border-pink-200 bg-pink-50/70 flex flex-col md:flex-row items-center justify-between gap-3 shadow-xs\">\n<div class=\"flex items-center space-x-3 text-pink-950 flex-1\">\n<div class=\"w-10 h-10 rounded-2xl bg-pink-100 text-pink-600 flex items-center justify-center shadow-xs shrink-0\">\n<i class=\"fa-solid fa-award text-xl\"></i>\n</div>\n<div>\n<h3 class=\"font-black text-base sm:text-lg text-pink-950\" id=\"hist-modal-title\">Kết quả tiến trình học tập</h3>\n<p class=\"text-xs font-bold text-pink-600 whitespace-nowrap\">Phân tích chuyên sâu theo năng lực &amp; nhận xét sư phạm chi tiết</p>\n</div>\n</div>\n<div class=\"bg-white/95 border-2 border-pink-200 px-4 py-2 rounded-2xl shadow-xs text-left shrink-0\">\n<div class=\"text-sm font-black text-slate-900 leading-tight\">\n                                Học sinh: <span class=\"text-pink-600\" id=\"hist-info-name\">--</span>\n</div>\n<div class=\"text-xs font-bold text-slate-600 mt-0.5\">\n                                Lớp: <span class=\"text-slate-900 font-extrabold\" id=\"hist-info-class\">--</span>  |  \n                                Mã số: <span class=\"text-slate-900 font-extrabold\" id=\"hist-info-code\">--</span>  |  \n                                Ngày sinh: <span class=\"text-slate-900 font-extrabold\" id=\"hist-info-dob\">--</span>\n</div>\n</div>\n<div class=\"flex items-center space-x-2 shrink-0\">\n<div class=\"text-xs font-bold text-slate-700 bg-white/95 px-3 py-2 rounded-xl border border-pink-200 text-center shadow-xs leading-snug\">\n<div>Ngày báo cáo</div>\n<div><span class=\"font-bold text-rose-600\" id=\"hist-report-date\">03/09/2026</span></div>\n</div>\n<button class=\"w-8 h-8 rounded-full bg-white border border-pink-200 flex items-center justify-center text-pink-400 hover:text-rose-600 transition-all shadow-xs no-print\" onclick=\"closeHistoryModal()\">\n<i class=\"fa-solid fa-xmark\"></i>\n</button>\n</div>\n</div>\n<div class=\"flex flex-col md:flex-row gap-4 w-full\">\n<div class=\"w-full md:w-[60%] bg-pink-50/40 border border-pink-100 rounded-2xl p-4 flex flex-col justify-between shadow-xs\">\n<h4 class=\"text-xs sm:text-sm font-black text-slate-800 mb-2 flex items-center space-x-1.5\">\n<i class=\"fa-solid fa-chart-line text-pink-600\"></i>\n<span>Biến thiên tổng điểm các bài thi (/10)</span>\n</h4>\n<div class=\"h-64 w-full relative\">\n<canvas id=\"progressChartCanvas\"></canvas>\n</div>\n</div>\n<div class=\"w-full md:w-[40%] bg-pink-50/40 border border-pink-100 rounded-2xl p-4 flex flex-col justify-between shadow-xs\">\n<h4 class=\"text-xs sm:text-sm font-black text-slate-800 mb-2 flex items-center space-x-1.5\">\n<i class=\"fa-solid fa-chart-bar text-rose-600\"></i>\n<span>Năng lực trung bình đã được đánh giá (%)</span>\n</h4>\n<div class=\"h-64 w-full relative\">\n<canvas id=\"topicRadarChartCanvas\"></canvas>\n</div>\n</div>\n</div>\n</div>\n<!-- TRANG 2: NHẬN XÉT SƯ PHẠM CHI TIẾT -->\n<div class=\"space-y-4 page-break-2\">\n<div class=\"bg-gradient-to-br from-amber-50/90 via-orange-50/60 to-rose-50/50 border border-amber-200/80 rounded-2xl p-4 space-y-3 shadow-xs\">\n<div class=\"flex items-center justify-between space-x-2.5 border-b border-amber-200/60 pb-1.5\">\n<div class=\"flex items-center space-x-2.5\">\n<div class=\"w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shadow-xs shrink-0\">\n<i class=\"fa-solid fa-award\"></i>\n</div>\n<div>\n<h4 class=\"text-base font-black text-amber-950 leading-tight\">Nhận xét sư phạm &amp; kế hoạch bồi dưỡng của giáo viên</h4>\n<p class=\"text-xs font-bold text-amber-700\">Đánh giá năng lực &amp; lời khuyên phụ huynh đồng hành</p>\n</div>\n</div>\n<button class=\"no-print shrink-0 px-3 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-800 border border-amber-300 rounded-xl text-xs md:text-sm font-extrabold flex items-center space-x-1.5 transition-all pastel-btn shadow-xs whitespace-nowrap\" onclick=\"speakPedagogicalEvaluation()\">\n<i class=\"fa-solid fa-volume-high\"></i>\n<span>Nghe cô giáo đọc</span>\n</button>\n</div>\n<div class=\"space-y-2.5 text-xs sm:text-sm text-slate-800 leading-normal font-semibold\" id=\"pedagogical-evaluation-box\"></div>\n</div>\n</div>\n<!-- TRANG 3: BẢNG THỐNG KÊ CHI TIẾT TỪNG BÀI THI -->\n<div class=\"space-y-3 page-break-3\">\n<h4 class=\"text-base font-black text-slate-900 flex items-center space-x-2\">\n<i class=\"fa-solid fa-table text-pink-600\"></i>\n<span>Bảng thống kê điểm số chi tiết từng bài thi</span>\n</h4>\n<div class=\"border border-pink-200 rounded-2xl overflow-hidden shadow-xs bg-white overflow-x-auto\">\n<table class=\"w-full text-center text-xs border-collapse\">\n<thead class=\"bg-pink-100/70 text-pink-950 font-black border-b border-pink-200\">\n<tr class=\"divide-x divide-pink-200\">\n<th class=\"py-2.5 px-2 whitespace-nowrap\">Lần thi</th>\n<th class=\"py-2.5 px-2 whitespace-nowrap\">Đề / Bài</th>\n<th class=\"py-2.5 px-2 whitespace-nowrap text-rose-600\">Tổng điểm</th>\n<th class=\"py-2 px-1 leading-tight\">C1: Số học<br/><span class=\"text-[10px] text-pink-700\">(&amp; Hình học)</span></th>\n<th class=\"py-2 px-1 leading-tight\">C2: Phép tính<br/><span class=\"text-[10px] text-pink-700\">(Cộng &amp; Trừ)</span></th>\n<th class=\"py-2 px-1 leading-tight\">C3: Đo lường<br/><span class=\"text-[10px] text-pink-700\">(Thời gian)</span></th>\n<th class=\"py-2 px-1 leading-tight\">C4: Vị trí<br/><span class=\"text-[10px] text-pink-700\">(So sánh)</span></th>\n<th class=\"py-2 px-1 leading-tight\">C5: Giải toán<br/><span class=\"text-[10px] text-pink-700\">(Lời văn)</span></th>\n<th class=\"py-2 px-1 leading-tight\">C6: Dãy số<br/><span class=\"text-[10px] text-pink-700\">(Quy luật)</span></th>\n<th class=\"py-2.5 px-2 whitespace-nowrap\">Ngày làm</th>\n<th class=\"py-2.5 px-2 whitespace-nowrap\">Thời gian</th>\n</tr>\n</thead>\n<tbody class=\"divide-y divide-pink-100 font-bold text-slate-700\" id=\"hist-table-body\"></tbody>\n</table>\n</div>\n</div>\n</div>\n<div class=\"p-3.5 border-t border-pink-100 flex items-center justify-between bg-pink-50/40 no-print\">\n<button class=\"px-5 py-2.5 bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 text-white font-extrabold text-xs md:text-sm rounded-xl transition-all shadow-md pastel-btn flex items-center space-x-1.5\" onclick=\"exportReportToPDF()\">\n<i class=\"fa-solid fa-file-pdf\"></i>\n<span>Xuất PDF</span>\n</button>\n<button class=\"px-8 py-2.5 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-xl text-xs md:text-sm transition-all pastel-btn\" onclick=\"closeHistoryModal()\">\n                    Đóng lại\n                </button>\n</div>\n</div>\n</div>\n<div class=\"hidden fixed inset-0 z-[120] bg-slate-950/55 backdrop-blur-sm items-center justify-center p-4\" id=\"modal-app-dialog\" onclick=\"if(event.target===this) closeAppDialog(false)\">\n<div class=\"w-full max-w-md rounded-[28px] bg-white shadow-2xl ring-4 ring-pink-200 overflow-hidden\" id=\"app-dialog-panel\">\n<div class=\"bg-gradient-to-br from-pink-50 via-white to-purple-50 px-5 pt-5 pb-4 text-center\">\n<div class=\"mx-auto w-14 h-14 rounded-2xl bg-white border-2 border-pink-200 shadow-sm flex items-center justify-center text-3xl\" id=\"app-dialog-icon\">🐰</div>\n<h3 class=\"mt-3 text-lg font-black text-purple-800\" id=\"app-dialog-title\">Thông báo</h3>\n<div class=\"mt-2 text-sm md:text-base leading-7 font-semibold text-slate-700\" id=\"app-dialog-message\"></div>\n</div>\n<div class=\"px-4 py-3 bg-white border-t border-pink-100 flex gap-2 justify-center\">\n<button class=\"hidden min-w-[110px] px-5 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-black text-sm\" id=\"app-dialog-cancel\" onclick=\"closeAppDialog(false)\">Để sau</button>\n<button class=\"min-w-[120px] px-6 py-2.5 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-500 hover:brightness-105 text-white font-black text-sm shadow-md\" id=\"app-dialog-ok\" onclick=\"closeAppDialog(true)\">Đã hiểu</button>\n</div>\n</div>\n</div>";
const MATH_RUNTIME_CSS_ = "/*! tailwindcss v4.1.10 | MIT License | https://tailwindcss.com */\n@layer properties;\n#class1-math-runtime,#class1-math-runtime {\n  --color-red-200: oklch(88.5% 0.062 18.334);\n  --color-red-300: oklch(80.8% 0.114 19.571);\n  --color-red-400: oklch(70.4% 0.191 22.216);\n  --color-red-500: oklch(63.7% 0.237 25.331);\n  --color-red-600: oklch(57.7% 0.245 27.325);\n  --color-red-700: oklch(50.5% 0.213 27.518);\n  --color-red-800: oklch(44.4% 0.177 26.899);\n  --color-red-900: oklch(39.6% 0.141 25.723);\n  --color-orange-50: oklch(98% 0.016 73.684);\n  --color-orange-200: oklch(90.1% 0.076 70.697);\n  --color-orange-400: oklch(75% 0.183 55.934);\n  --color-orange-500: oklch(70.5% 0.213 47.604);\n  --color-orange-600: oklch(64.6% 0.222 41.116);\n  --color-amber-50: oklch(98.7% 0.022 95.277);\n  --color-amber-100: oklch(96.2% 0.059 95.617);\n  --color-amber-200: oklch(92.4% 0.12 95.746);\n  --color-amber-300: oklch(87.9% 0.169 91.605);\n  --color-amber-400: oklch(82.8% 0.189 84.429);\n  --color-amber-500: oklch(76.9% 0.188 70.08);\n  --color-amber-600: oklch(66.6% 0.179 58.318);\n  --color-amber-700: oklch(55.5% 0.163 48.998);\n  --color-amber-800: oklch(47.3% 0.137 46.201);\n  --color-amber-900: oklch(41.4% 0.112 45.904);\n  --color-amber-950: oklch(27.9% 0.077 45.635);\n  --color-yellow-50: oklch(98.7% 0.026 102.212);\n  --color-yellow-200: oklch(94.5% 0.129 101.54);\n  --color-green-100: oklch(96.2% 0.044 156.743);\n  --color-green-400: oklch(79.2% 0.209 151.711);\n  --color-green-800: oklch(44.8% 0.119 151.328);\n  --color-emerald-50: oklch(97.9% 0.021 166.113);\n  --color-emerald-100: oklch(95% 0.052 163.051);\n  --color-emerald-200: oklch(90.5% 0.093 164.15);\n  --color-emerald-300: oklch(84.5% 0.143 164.978);\n  --color-emerald-400: oklch(76.5% 0.177 163.223);\n  --color-emerald-500: oklch(69.6% 0.17 162.48);\n  --color-emerald-600: oklch(59.6% 0.145 163.225);\n  --color-emerald-700: oklch(50.8% 0.118 165.612);\n  --color-emerald-800: oklch(43.2% 0.095 166.913);\n  --color-emerald-900: oklch(37.8% 0.077 168.94);\n  --color-teal-500: oklch(70.4% 0.14 182.503);\n  --color-teal-600: oklch(60% 0.118 184.704);\n  --color-cyan-50: oklch(98.4% 0.019 200.873);\n  --color-cyan-100: oklch(95.6% 0.045 203.388);\n  --color-cyan-200: oklch(91.7% 0.08 205.041);\n  --color-cyan-300: oklch(86.5% 0.127 207.078);\n  --color-cyan-500: oklch(71.5% 0.143 215.221);\n  --color-cyan-600: oklch(60.9% 0.126 221.723);\n  --color-cyan-700: oklch(52% 0.105 223.128);\n  --color-cyan-800: oklch(45% 0.085 224.283);\n  --color-sky-50: oklch(97.7% 0.013 236.62);\n  --color-sky-100: oklch(95.1% 0.026 236.824);\n  --color-sky-200: oklch(90.1% 0.058 230.902);\n  --color-sky-300: oklch(82.8% 0.111 230.318);\n  --color-sky-400: oklch(74.6% 0.16 232.661);\n  --color-sky-500: oklch(68.5% 0.169 237.323);\n  --color-sky-600: oklch(58.8% 0.158 241.966);\n  --color-sky-700: oklch(50% 0.134 242.749);\n  --color-blue-50: oklch(97% 0.014 254.604);\n  --color-blue-100: oklch(93.2% 0.032 255.585);\n  --color-blue-200: oklch(88.2% 0.059 254.128);\n  --color-blue-300: oklch(80.9% 0.105 251.813);\n  --color-blue-400: oklch(70.7% 0.165 254.624);\n  --color-blue-700: oklch(48.8% 0.243 264.376);\n  --color-blue-800: oklch(42.4% 0.199 265.638);\n  --color-indigo-50: oklch(96.2% 0.018 272.314);\n  --color-indigo-100: oklch(93% 0.034 272.788);\n  --color-indigo-200: oklch(87% 0.065 274.039);\n  --color-indigo-300: oklch(78.5% 0.115 274.713);\n  --color-indigo-400: oklch(67.3% 0.182 276.935);\n  --color-indigo-500: oklch(58.5% 0.233 277.117);\n  --color-indigo-600: oklch(51.1% 0.262 276.966);\n  --color-indigo-700: oklch(45.7% 0.24 277.023);\n  --color-indigo-800: oklch(39.8% 0.195 277.366);\n  --color-violet-50: oklch(96.9% 0.016 293.756);\n  --color-violet-100: oklch(94.3% 0.029 294.588);\n  --color-violet-200: oklch(89.4% 0.057 293.283);\n  --color-violet-300: oklch(81.1% 0.111 293.571);\n  --color-violet-400: oklch(70.2% 0.183 293.541);\n  --color-violet-500: oklch(60.6% 0.25 292.717);\n  --color-violet-600: oklch(54.1% 0.281 293.009);\n  --color-violet-700: oklch(49.1% 0.27 292.581);\n  --color-violet-800: oklch(43.2% 0.232 292.759);\n  --color-purple-50: oklch(97.7% 0.014 308.299);\n  --color-purple-100: oklch(94.6% 0.033 307.174);\n  --color-purple-200: oklch(90.2% 0.063 306.703);\n  --color-purple-300: oklch(82.7% 0.119 306.383);\n  --color-purple-400: oklch(71.4% 0.203 305.504);\n  --color-purple-500: oklch(62.7% 0.265 303.9);\n  --color-purple-600: oklch(55.8% 0.288 302.321);\n  --color-purple-700: oklch(49.6% 0.265 301.924);\n  --color-purple-800: oklch(43.8% 0.218 303.724);\n  --color-fuchsia-50: oklch(97.7% 0.017 320.058);\n  --color-fuchsia-300: oklch(83.3% 0.145 321.434);\n  --color-fuchsia-400: oklch(74% 0.238 322.16);\n  --color-fuchsia-500: oklch(66.7% 0.295 322.15);\n  --color-fuchsia-600: oklch(59.1% 0.293 322.896);\n  --color-fuchsia-700: oklch(51.8% 0.253 323.949);\n  --color-pink-50: oklch(97.1% 0.014 343.198);\n  --color-pink-100: oklch(94.8% 0.028 342.258);\n  --color-pink-200: oklch(89.9% 0.061 343.231);\n  --color-pink-300: oklch(82.3% 0.12 346.018);\n  --color-pink-400: oklch(71.8% 0.202 349.761);\n  --color-pink-500: oklch(65.6% 0.241 354.308);\n  --color-pink-600: oklch(59.2% 0.249 0.584);\n  --color-pink-700: oklch(52.5% 0.223 3.958);\n  --color-pink-800: oklch(45.9% 0.187 3.815);\n  --color-pink-950: oklch(28.4% 0.109 3.907);\n  --color-rose-50: oklch(96.9% 0.015 12.422);\n  --color-rose-100: oklch(94.1% 0.03 12.58);\n  --color-rose-200: oklch(89.2% 0.058 10.001);\n  --color-rose-300: oklch(81% 0.117 11.638);\n  --color-rose-400: oklch(71.2% 0.194 13.428);\n  --color-rose-500: oklch(64.5% 0.246 16.439);\n  --color-rose-600: oklch(58.6% 0.253 17.585);\n  --color-rose-700: oklch(51.4% 0.222 16.935);\n  --color-rose-800: oklch(45.5% 0.188 13.697);\n  --color-rose-900: oklch(41% 0.159 10.272);\n  --color-slate-50: oklch(98.4% 0.003 247.858);\n  --color-slate-100: oklch(96.8% 0.007 247.896);\n  --color-slate-200: oklch(92.9% 0.013 255.508);\n  --color-slate-300: oklch(86.9% 0.022 252.894);\n  --color-slate-400: oklch(70.4% 0.04 256.788);\n  --color-slate-500: oklch(55.4% 0.046 257.417);\n  --color-slate-600: oklch(44.6% 0.043 257.281);\n  --color-slate-700: oklch(37.2% 0.044 257.287);\n  --color-slate-800: oklch(27.9% 0.041 260.031);\n  --color-slate-900: oklch(20.8% 0.042 265.755);\n  --color-slate-950: oklch(12.9% 0.042 264.695);\n  --color-gray-100: oklch(96.7% 0.003 264.542);\n  --color-gray-200: oklch(92.8% 0.006 264.531);\n  --color-gray-300: oklch(87.2% 0.01 258.338);\n  --color-gray-400: oklch(70.7% 0.022 261.325);\n  --color-gray-500: oklch(55.1% 0.027 264.364);\n  --color-gray-600: oklch(44.6% 0.03 256.802);\n  --color-gray-700: oklch(37.3% 0.034 259.733);\n  --color-gray-800: oklch(27.8% 0.033 256.848);\n  --color-gray-900: oklch(21% 0.034 264.665);\n  --color-black: #000;\n  --color-white: #fff;\n  --spacing: 0.25rem;\n  --container-xs: 20rem;\n  --container-md: 28rem;\n  --container-xl: 36rem;\n  --container-2xl: 42rem;\n  --container-3xl: 48rem;\n  --container-4xl: 56rem;\n  --container-5xl: 64rem;\n  --container-6xl: 72rem;\n  --text-xs: 1rem;\n  --text-xs--line-height: calc(1 / 0.75);\n  --text-sm: 1rem;\n  --text-sm--line-height: calc(1.25 / 0.875);\n  --text-base: 1rem;\n  --text-base--line-height: calc(1.5 / 1);\n  --text-lg: 1.125rem;\n  --text-lg--line-height: calc(1.75 / 1.125);\n  --text-xl: 1.25rem;\n  --text-xl--line-height: calc(1.75 / 1.25);\n  --text-2xl: 1.5rem;\n  --text-2xl--line-height: calc(2 / 1.5);\n  --text-3xl: 1.875rem;\n  --text-3xl--line-height: calc(2.25 / 1.875);\n  --text-4xl: 2.25rem;\n  --text-4xl--line-height: calc(2.5 / 2.25);\n  --text-5xl: 3rem;\n  --text-5xl--line-height: 1;\n  --text-6xl: 3.75rem;\n  --text-6xl--line-height: 1;\n  --text-7xl: 4.5rem;\n  --text-7xl--line-height: 1;\n  --text-8xl: 6rem;\n  --text-8xl--line-height: 1;\n  --font-weight-semibold: 600;\n  --font-weight-bold: 700;\n  --font-weight-extrabold: 800;\n  --font-weight-black: 900;\n  --tracking-tight: -0.025em;\n  --tracking-wide: 0.025em;\n  --tracking-wider: 0.05em;\n  --leading-tight: 1.25;\n  --leading-snug: 1.375;\n  --leading-normal: 1.5;\n  --leading-relaxed: 1.625;\n  --radius-lg: 0.5rem;\n  --radius-xl: 0.75rem;\n  --radius-2xl: 1rem;\n  --radius-3xl: 1.5rem;\n  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);\n  --blur-xs: 4px;\n  --blur-sm: 8px;\n  --blur-md: 12px;\n  --default-transition-duration: 150ms;\n  --default-transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n}\n#class1-math-runtime .visible {\n  visibility: visible;\n}\n#class1-math-runtime .absolute {\n  position: absolute;\n}\n#class1-math-runtime .fixed {\n  position: fixed;\n}\n#class1-math-runtime .relative {\n  position: relative;\n}\n#class1-math-runtime .sticky {\n  position: sticky;\n}\n#class1-math-runtime .inset-0 {\n  inset: calc(var(--spacing) * 0);\n}\n#class1-math-runtime .inset-y-0 {\n  inset-block: calc(var(--spacing) * 0);\n}\n#class1-math-runtime .-top-1 {\n  top: calc(var(--spacing) * -1);\n}\n#class1-math-runtime .-top-8 {\n  top: calc(var(--spacing) * -8);\n}\n#class1-math-runtime .top-0 {\n  top: calc(var(--spacing) * 0);\n}\n#class1-math-runtime .top-2 {\n  top: calc(var(--spacing) * 2);\n}\n#class1-math-runtime .top-3 {\n  top: calc(var(--spacing) * 3);\n}\n#class1-math-runtime .top-\\[88px\\] {\n  top: 88px;\n}\n#class1-math-runtime .-right-1 {\n  right: calc(var(--spacing) * -1);\n}\n#class1-math-runtime .right-2 {\n  right: calc(var(--spacing) * 2);\n}\n#class1-math-runtime .right-3 {\n  right: calc(var(--spacing) * 3);\n}\n#class1-math-runtime .right-\\[44px\\] {\n  right: 44px;\n}\n#class1-math-runtime .right-\\[45px\\] {\n  right: 45px;\n}\n#class1-math-runtime .bottom-0 {\n  bottom: calc(var(--spacing) * 0);\n}\n#class1-math-runtime .bottom-3 {\n  bottom: calc(var(--spacing) * 3);\n}\n#class1-math-runtime .left-0 {\n  left: calc(var(--spacing) * 0);\n}\n#class1-math-runtime .left-1\\/2 {\n  left: calc(1/2 * 100%);\n}\n#class1-math-runtime .left-3 {\n  left: calc(var(--spacing) * 3);\n}\n#class1-math-runtime .left-\\[44px\\] {\n  left: 44px;\n}\n#class1-math-runtime .left-\\[45px\\] {\n  left: 45px;\n}\n#class1-math-runtime .z-10 {\n  z-index: 10;\n}\n#class1-math-runtime .z-50 {\n  z-index: 50;\n}\n#class1-math-runtime .z-\\[80\\] {\n  z-index: 80;\n}\n#class1-math-runtime .z-\\[90\\] {\n  z-index: 90;\n}\n#class1-math-runtime .z-\\[95\\] {\n  z-index: 95;\n}\n#class1-math-runtime .z-\\[120\\] {\n  z-index: 120;\n}\n#class1-math-runtime .col-span-full {\n  grid-column: 1 / -1;\n}\n#class1-math-runtime .container {\n  width: 100%;\n  @media (width >= 40rem) {\n    max-width: 40rem;\n  }\n  @media (width >= 48rem) {\n    max-width: 48rem;\n  }\n  @media (width >= 64rem) {\n    max-width: 64rem;\n  }\n  @media (width >= 80rem) {\n    max-width: 80rem;\n  }\n  @media (width >= 96rem) {\n    max-width: 96rem;\n  }\n}\n#class1-math-runtime .mx-2 {\n  margin-inline: calc(var(--spacing) * 2);\n}\n#class1-math-runtime .mx-auto {\n  margin-inline: auto;\n}\n#class1-math-runtime .my-0\\.5 {\n  margin-block: calc(var(--spacing) * 0.5);\n}\n#class1-math-runtime .my-1 {\n  margin-block: calc(var(--spacing) * 1);\n}\n#class1-math-runtime .my-2 {\n  margin-block: calc(var(--spacing) * 2);\n}\n#class1-math-runtime .my-3 {\n  margin-block: calc(var(--spacing) * 3);\n}\n#class1-math-runtime .my-4 {\n  margin-block: calc(var(--spacing) * 4);\n}\n#class1-math-runtime .my-auto {\n  margin-block: auto;\n}\n#class1-math-runtime .mt-0 {\n  margin-top: calc(var(--spacing) * 0);\n}\n#class1-math-runtime .mt-0\\.5 {\n  margin-top: calc(var(--spacing) * 0.5);\n}\n#class1-math-runtime .mt-1 {\n  margin-top: calc(var(--spacing) * 1);\n}\n#class1-math-runtime .mt-1\\.5 {\n  margin-top: calc(var(--spacing) * 1.5);\n}\n#class1-math-runtime .mt-2 {\n  margin-top: calc(var(--spacing) * 2);\n}\n#class1-math-runtime .mt-2\\.5 {\n  margin-top: calc(var(--spacing) * 2.5);\n}\n#class1-math-runtime .mt-3 {\n  margin-top: calc(var(--spacing) * 3);\n}\n#class1-math-runtime .mt-3\\.5 {\n  margin-top: calc(var(--spacing) * 3.5);\n}\n#class1-math-runtime .mt-4 {\n  margin-top: calc(var(--spacing) * 4);\n}\n#class1-math-runtime .mt-5 {\n  margin-top: calc(var(--spacing) * 5);\n}\n#class1-math-runtime .mt-6 {\n  margin-top: calc(var(--spacing) * 6);\n}\n#class1-math-runtime .mr-0\\.5 {\n  margin-right: calc(var(--spacing) * 0.5);\n}\n#class1-math-runtime .mr-1 {\n  margin-right: calc(var(--spacing) * 1);\n}\n#class1-math-runtime .mr-1\\.5 {\n  margin-right: calc(var(--spacing) * 1.5);\n}\n#class1-math-runtime .mr-2 {\n  margin-right: calc(var(--spacing) * 2);\n}\n#class1-math-runtime .mb-0\\.5 {\n  margin-bottom: calc(var(--spacing) * 0.5);\n}\n#class1-math-runtime .mb-1 {\n  margin-bottom: calc(var(--spacing) * 1);\n}\n#class1-math-runtime .mb-1\\.5 {\n  margin-bottom: calc(var(--spacing) * 1.5);\n}\n#class1-math-runtime .mb-2 {\n  margin-bottom: calc(var(--spacing) * 2);\n}\n#class1-math-runtime .mb-2\\.5 {\n  margin-bottom: calc(var(--spacing) * 2.5);\n}\n#class1-math-runtime .mb-3 {\n  margin-bottom: calc(var(--spacing) * 3);\n}\n#class1-math-runtime .mb-4 {\n  margin-bottom: calc(var(--spacing) * 4);\n}\n#class1-math-runtime .mb-5 {\n  margin-bottom: calc(var(--spacing) * 5);\n}\n#class1-math-runtime .ml-1 {\n  margin-left: calc(var(--spacing) * 1);\n}\n#class1-math-runtime .ml-1\\.5 {\n  margin-left: calc(var(--spacing) * 1.5);\n}\n#class1-math-runtime .ml-2 {\n  margin-left: calc(var(--spacing) * 2);\n}\n#class1-math-runtime .ml-4 {\n  margin-left: calc(var(--spacing) * 4);\n}\n#class1-math-runtime .ml-24 {\n  margin-left: calc(var(--spacing) * 24);\n}\n#class1-math-runtime .ml-auto {\n  margin-left: auto;\n}\n#class1-math-runtime .line-clamp-1 {\n  overflow: hidden;\n  display: -webkit-box;\n  -webkit-box-orient: vertical;\n  -webkit-line-clamp: 1;\n}\n#class1-math-runtime .line-clamp-2 {\n  overflow: hidden;\n  display: -webkit-box;\n  -webkit-box-orient: vertical;\n  -webkit-line-clamp: 2;\n}\n#class1-math-runtime .block {\n  display: block;\n}\n#class1-math-runtime .flex {\n  display: flex;\n}\n#class1-math-runtime .grid {\n  display: grid;\n}\n#class1-math-runtime .hidden {\n  display: none;\n}\n#class1-math-runtime .inline-block {\n  display: inline-block;\n}\n#class1-math-runtime .inline-flex {\n  display: inline-flex;\n}\n#class1-math-runtime .table {\n  display: table;\n}\n#class1-math-runtime .aspect-square {\n  aspect-ratio: 1 / 1;\n}\n#class1-math-runtime .h-1 {\n  height: calc(var(--spacing) * 1);\n}\n#class1-math-runtime .h-2 {\n  height: calc(var(--spacing) * 2);\n}\n#class1-math-runtime .h-5 {\n  height: calc(var(--spacing) * 5);\n}\n#class1-math-runtime .h-6 {\n  height: calc(var(--spacing) * 6);\n}\n#class1-math-runtime .h-7 {\n  height: calc(var(--spacing) * 7);\n}\n#class1-math-runtime .h-8 {\n  height: calc(var(--spacing) * 8);\n}\n#class1-math-runtime .h-9 {\n  height: calc(var(--spacing) * 9);\n}\n#class1-math-runtime .h-10 {\n  height: calc(var(--spacing) * 10);\n}\n#class1-math-runtime .h-11 {\n  height: calc(var(--spacing) * 11);\n}\n#class1-math-runtime .h-12 {\n  height: calc(var(--spacing) * 12);\n}\n#class1-math-runtime .h-14 {\n  height: calc(var(--spacing) * 14);\n}\n#class1-math-runtime .h-16 {\n  height: calc(var(--spacing) * 16);\n}\n#class1-math-runtime .h-20 {\n  height: calc(var(--spacing) * 20);\n}\n#class1-math-runtime .h-24 {\n  height: calc(var(--spacing) * 24);\n}\n#class1-math-runtime .h-28 {\n  height: calc(var(--spacing) * 28);\n}\n#class1-math-runtime .h-44 {\n  height: calc(var(--spacing) * 44);\n}\n#class1-math-runtime .h-64 {\n  height: calc(var(--spacing) * 64);\n}\n#class1-math-runtime .h-\\[50px\\] {\n  height: 50px;\n}\n#class1-math-runtime .h-\\[70px\\] {\n  height: 70px;\n}\n#class1-math-runtime .h-\\[78px\\] {\n  height: 78px;\n}\n#class1-math-runtime .h-\\[145px\\] {\n  height: 145px;\n}\n#class1-math-runtime .h-\\[150px\\] {\n  height: 150px;\n}\n#class1-math-runtime .h-\\[160px\\] {\n  height: 160px;\n}\n#class1-math-runtime .h-\\[190px\\] {\n  height: 190px;\n}\n#class1-math-runtime .h-\\[220px\\] {\n  height: 220px;\n}\n#class1-math-runtime .h-auto {\n  height: auto;\n}\n#class1-math-runtime .h-full {\n  height: 100%;\n}\n#class1-math-runtime .h-px {\n  height: 1px;\n}\n#class1-math-runtime .max-h-\\[85vh\\] {\n  max-height: 85vh;\n}\n#class1-math-runtime .max-h-\\[92vh\\] {\n  max-height: 92vh;\n}\n#class1-math-runtime .max-h-\\[96vh\\] {\n  max-height: 96vh;\n}\n#class1-math-runtime .max-h-\\[215px\\] {\n  max-height: 215px;\n}\n#class1-math-runtime .max-h-\\[220px\\] {\n  max-height: 220px;\n}\n#class1-math-runtime .max-h-\\[285px\\] {\n  max-height: 285px;\n}\n#class1-math-runtime .max-h-\\[300px\\] {\n  max-height: 300px;\n}\n#class1-math-runtime .max-h-\\[410px\\] {\n  max-height: 410px;\n}\n#class1-math-runtime .max-h-\\[430px\\] {\n  max-height: 430px;\n}\n#class1-math-runtime .max-h-\\[470px\\] {\n  max-height: 470px;\n}\n#class1-math-runtime .min-h-\\[48px\\] {\n  min-height: 48px;\n}\n#class1-math-runtime .min-h-\\[50px\\] {\n  min-height: 50px;\n}\n#class1-math-runtime .min-h-\\[52px\\] {\n  min-height: 52px;\n}\n#class1-math-runtime .min-h-\\[54px\\] {\n  min-height: 54px;\n}\n#class1-math-runtime .min-h-\\[60px\\] {\n  min-height: 60px;\n}\n#class1-math-runtime .min-h-\\[62px\\] {\n  min-height: 62px;\n}\n#class1-math-runtime .min-h-\\[64px\\] {\n  min-height: 64px;\n}\n#class1-math-runtime .min-h-\\[66px\\] {\n  min-height: 66px;\n}\n#class1-math-runtime .min-h-\\[68px\\] {\n  min-height: 68px;\n}\n#class1-math-runtime .min-h-\\[70px\\] {\n  min-height: 70px;\n}\n#class1-math-runtime .min-h-\\[72px\\] {\n  min-height: 72px;\n}\n#class1-math-runtime .min-h-\\[74px\\] {\n  min-height: 74px;\n}\n#class1-math-runtime .min-h-\\[82px\\] {\n  min-height: 82px;\n}\n#class1-math-runtime .min-h-\\[92px\\] {\n  min-height: 92px;\n}\n#class1-math-runtime .min-h-\\[98px\\] {\n  min-height: 98px;\n}\n#class1-math-runtime .min-h-\\[128px\\] {\n  min-height: 128px;\n}\n#class1-math-runtime .min-h-\\[142px\\] {\n  min-height: 142px;\n}\n#class1-math-runtime .min-h-\\[150px\\] {\n  min-height: 150px;\n}\n#class1-math-runtime .min-h-\\[170px\\] {\n  min-height: 170px;\n}\n#class1-math-runtime .min-h-\\[180px\\] {\n  min-height: 180px;\n}\n#class1-math-runtime .min-h-\\[230px\\] {\n  min-height: 230px;\n}\n#class1-math-runtime .min-h-\\[235px\\] {\n  min-height: 235px;\n}\n#class1-math-runtime .min-h-\\[250px\\] {\n  min-height: 250px;\n}\n#class1-math-runtime .min-h-\\[280px\\] {\n  min-height: 280px;\n}\n#class1-math-runtime .min-h-\\[300px\\] {\n  min-height: 300px;\n}\n#class1-math-runtime .min-h-\\[330px\\] {\n  min-height: 330px;\n}\n#class1-math-runtime .min-h-\\[350px\\] {\n  min-height: 350px;\n}\n#class1-math-runtime .min-h-\\[380px\\] {\n  min-height: 380px;\n}\n#class1-math-runtime .min-h-\\[390px\\] {\n  min-height: 390px;\n}\n#class1-math-runtime .min-h-\\[420px\\] {\n  min-height: 420px;\n}\n#class1-math-runtime .min-h-\\[480px\\] {\n  min-height: 480px;\n}\n#class1-math-runtime .min-h-full {\n  min-height: 100%;\n}\n#class1-math-runtime .w-3\\/4 {\n  width: calc(3/4 * 100%);\n}\n#class1-math-runtime .w-4\\/5 {\n  width: calc(4/5 * 100%);\n}\n#class1-math-runtime .w-5 {\n  width: calc(var(--spacing) * 5);\n}\n#class1-math-runtime .w-6 {\n  width: calc(var(--spacing) * 6);\n}\n#class1-math-runtime .w-7 {\n  width: calc(var(--spacing) * 7);\n}\n#class1-math-runtime .w-8 {\n  width: calc(var(--spacing) * 8);\n}\n#class1-math-runtime .w-9 {\n  width: calc(var(--spacing) * 9);\n}\n#class1-math-runtime .w-10 {\n  width: calc(var(--spacing) * 10);\n}\n#class1-math-runtime .w-11 {\n  width: calc(var(--spacing) * 11);\n}\n#class1-math-runtime .w-12 {\n  width: calc(var(--spacing) * 12);\n}\n#class1-math-runtime .w-14 {\n  width: calc(var(--spacing) * 14);\n}\n#class1-math-runtime .w-16 {\n  width: calc(var(--spacing) * 16);\n}\n#class1-math-runtime .w-20 {\n  width: calc(var(--spacing) * 20);\n}\n#class1-math-runtime .w-24 {\n  width: calc(var(--spacing) * 24);\n}\n#class1-math-runtime .w-28 {\n  width: calc(var(--spacing) * 28);\n}\n#class1-math-runtime .w-32 {\n  width: calc(var(--spacing) * 32);\n}\n#class1-math-runtime .w-64 {\n  width: calc(var(--spacing) * 64);\n}\n#class1-math-runtime .w-\\[70px\\] {\n  width: 70px;\n}\n#class1-math-runtime .w-\\[108px\\] {\n  width: 108px;\n}\n#class1-math-runtime .w-\\[150px\\] {\n  width: 150px;\n}\n#class1-math-runtime .w-\\[180px\\] {\n  width: 180px;\n}\n#class1-math-runtime .w-\\[210px\\] {\n  width: 210px;\n}\n#class1-math-runtime .w-\\[260px\\] {\n  width: 260px;\n}\n#class1-math-runtime .w-full {\n  width: 100%;\n}\n#class1-math-runtime .max-w-2xl {\n  max-width: var(--container-2xl);\n}\n#class1-math-runtime .max-w-3xl {\n  max-width: var(--container-3xl);\n}\n#class1-math-runtime .max-w-4xl {\n  max-width: var(--container-4xl);\n}\n#class1-math-runtime .max-w-5xl {\n  max-width: var(--container-5xl);\n}\n#class1-math-runtime .max-w-6xl {\n  max-width: var(--container-6xl);\n}\n#class1-math-runtime .max-w-\\[260px\\] {\n  max-width: 260px;\n}\n#class1-math-runtime .max-w-\\[330px\\] {\n  max-width: 330px;\n}\n#class1-math-runtime .max-w-\\[350px\\] {\n  max-width: 350px;\n}\n#class1-math-runtime .max-w-\\[360px\\] {\n  max-width: 360px;\n}\n#class1-math-runtime .max-w-\\[380px\\] {\n  max-width: 380px;\n}\n#class1-math-runtime .max-w-\\[390px\\] {\n  max-width: 390px;\n}\n#class1-math-runtime .max-w-\\[430px\\] {\n  max-width: 430px;\n}\n#class1-math-runtime .max-w-\\[620px\\] {\n  max-width: 620px;\n}\n#class1-math-runtime .max-w-\\[640px\\] {\n  max-width: 640px;\n}\n#class1-math-runtime .max-w-\\[650px\\] {\n  max-width: 650px;\n}\n#class1-math-runtime .max-w-\\[660px\\] {\n  max-width: 660px;\n}\n#class1-math-runtime .max-w-\\[680px\\] {\n  max-width: 680px;\n}\n#class1-math-runtime .max-w-\\[700px\\] {\n  max-width: 700px;\n}\n#class1-math-runtime .max-w-\\[720px\\] {\n  max-width: 720px;\n}\n#class1-math-runtime .max-w-\\[760px\\] {\n  max-width: 760px;\n}\n#class1-math-runtime .max-w-md {\n  max-width: var(--container-md);\n}\n#class1-math-runtime .max-w-none {\n  max-width: none;\n}\n#class1-math-runtime .max-w-xl {\n  max-width: var(--container-xl);\n}\n#class1-math-runtime .max-w-xs {\n  max-width: var(--container-xs);\n}\n#class1-math-runtime .min-w-0 {\n  min-width: calc(var(--spacing) * 0);\n}\n#class1-math-runtime .min-w-\\[52px\\] {\n  min-width: 52px;\n}\n#class1-math-runtime .min-w-\\[78px\\] {\n  min-width: 78px;\n}\n#class1-math-runtime .min-w-\\[110px\\] {\n  min-width: 110px;\n}\n#class1-math-runtime .min-w-\\[112px\\] {\n  min-width: 112px;\n}\n#class1-math-runtime .min-w-\\[120px\\] {\n  min-width: 120px;\n}\n#class1-math-runtime .min-w-\\[140px\\] {\n  min-width: 140px;\n}\n#class1-math-runtime .min-w-\\[180px\\] {\n  min-width: 180px;\n}\n#class1-math-runtime .min-w-\\[210px\\] {\n  min-width: 210px;\n}\n#class1-math-runtime .min-w-\\[860px\\] {\n  min-width: 860px;\n}\n#class1-math-runtime .flex-1 {\n  flex: 1;\n}\n#class1-math-runtime .shrink-0 {\n  flex-shrink: 0;\n}\n#class1-math-runtime .flex-grow {\n  flex-grow: 1;\n}\n#class1-math-runtime .border-collapse {\n  border-collapse: collapse;\n}\n#class1-math-runtime .origin-center {\n  transform-origin: center;\n}\n#class1-math-runtime .-translate-x-1\\/2 {\n  --tw-translate-x: calc(calc(1/2 * 100%) * -1);\n  translate: var(--tw-translate-x) var(--tw-translate-y);\n}\n#class1-math-runtime .-translate-y-1 {\n  --tw-translate-y: calc(var(--spacing) * -1);\n  translate: var(--tw-translate-x) var(--tw-translate-y);\n}\n#class1-math-runtime .-translate-y-3 {\n  --tw-translate-y: calc(var(--spacing) * -3);\n  translate: var(--tw-translate-x) var(--tw-translate-y);\n}\n#class1-math-runtime .-translate-y-4 {\n  --tw-translate-y: calc(var(--spacing) * -4);\n  translate: var(--tw-translate-x) var(--tw-translate-y);\n}\n#class1-math-runtime .translate-y-1 {\n  --tw-translate-y: calc(var(--spacing) * 1);\n  translate: var(--tw-translate-x) var(--tw-translate-y);\n}\n#class1-math-runtime .translate-y-2 {\n  --tw-translate-y: calc(var(--spacing) * 2);\n  translate: var(--tw-translate-x) var(--tw-translate-y);\n}\n#class1-math-runtime .translate-y-5 {\n  --tw-translate-y: calc(var(--spacing) * 5);\n  translate: var(--tw-translate-x) var(--tw-translate-y);\n}\n#class1-math-runtime .scale-90 {\n  --tw-scale-x: 90%;\n  --tw-scale-y: 90%;\n  --tw-scale-z: 90%;\n  scale: var(--tw-scale-x) var(--tw-scale-y);\n}\n#class1-math-runtime .scale-\\[0\\.58\\] {\n  scale: 0.58;\n}\n#class1-math-runtime .transform {\n  transform: var(--tw-rotate-x,) var(--tw-rotate-y,) var(--tw-rotate-z,) var(--tw-skew-x,) var(--tw-skew-y,);\n}\n#class1-math-runtime .cursor-default {\n  cursor: default;\n}\n#class1-math-runtime .cursor-not-allowed {\n  cursor: not-allowed;\n}\n#class1-math-runtime .cursor-pointer {\n  cursor: pointer;\n}\n#class1-math-runtime .cursor-text {\n  cursor: text;\n}\n#class1-math-runtime .list-disc {\n  list-style-type: disc;\n}\n#class1-math-runtime .grid-cols-1 {\n  grid-template-columns: repeat(1, minmax(0, 1fr));\n}\n#class1-math-runtime .grid-cols-2 {\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n}\n#class1-math-runtime .grid-cols-3 {\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n}\n#class1-math-runtime .grid-cols-4 {\n  grid-template-columns: repeat(4, minmax(0, 1fr));\n}\n#class1-math-runtime .grid-cols-5 {\n  grid-template-columns: repeat(5, minmax(0, 1fr));\n}\n#class1-math-runtime .grid-cols-10 {\n  grid-template-columns: repeat(10, minmax(0, 1fr));\n}\n#class1-math-runtime .grid-cols-\\[0\\.9fr_1fr_1fr\\] {\n  grid-template-columns: 0.9fr 1fr 1fr;\n}\n#class1-math-runtime .grid-cols-\\[1fr_auto_1fr\\] {\n  grid-template-columns: 1fr auto 1fr;\n}\n#class1-math-runtime .grid-cols-\\[1fr_auto_1fr_auto_1fr\\] {\n  grid-template-columns: 1fr auto 1fr auto 1fr;\n}\n#class1-math-runtime .grid-cols-\\[42px_1fr\\] {\n  grid-template-columns: 42px 1fr;\n}\n#class1-math-runtime .grid-cols-\\[auto_1fr_auto\\] {\n  grid-template-columns: auto 1fr auto;\n}\n#class1-math-runtime .grid-rows-5 {\n  grid-template-rows: repeat(5, minmax(0, 1fr));\n}\n#class1-math-runtime .flex-col {\n  flex-direction: column;\n}\n#class1-math-runtime .flex-nowrap {\n  flex-wrap: nowrap;\n}\n#class1-math-runtime .flex-wrap {\n  flex-wrap: wrap;\n}\n#class1-math-runtime .items-center {\n  align-items: center;\n}\n#class1-math-runtime .items-end {\n  align-items: flex-end;\n}\n#class1-math-runtime .items-start {\n  align-items: flex-start;\n}\n#class1-math-runtime .items-stretch {\n  align-items: stretch;\n}\n#class1-math-runtime .justify-between {\n  justify-content: space-between;\n}\n#class1-math-runtime .justify-center {\n  justify-content: center;\n}\n#class1-math-runtime .justify-end {\n  justify-content: flex-end;\n}\n#class1-math-runtime .justify-start {\n  justify-content: flex-start;\n}\n#class1-math-runtime .justify-items-center {\n  justify-items: center;\n}\n#class1-math-runtime .gap-0 {\n  gap: calc(var(--spacing) * 0);\n}\n#class1-math-runtime .gap-0\\.5 {\n  gap: calc(var(--spacing) * 0.5);\n}\n#class1-math-runtime .gap-1 {\n  gap: calc(var(--spacing) * 1);\n}\n#class1-math-runtime .gap-1\\.5 {\n  gap: calc(var(--spacing) * 1.5);\n}\n#class1-math-runtime .gap-2 {\n  gap: calc(var(--spacing) * 2);\n}\n#class1-math-runtime .gap-2\\.5 {\n  gap: calc(var(--spacing) * 2.5);\n}\n#class1-math-runtime .gap-3 {\n  gap: calc(var(--spacing) * 3);\n}\n#class1-math-runtime .gap-4 {\n  gap: calc(var(--spacing) * 4);\n}\n#class1-math-runtime .gap-5 {\n  gap: calc(var(--spacing) * 5);\n}\n#class1-math-runtime .gap-6 {\n  gap: calc(var(--spacing) * 6);\n}\n#class1-math-runtime .gap-7 {\n  gap: calc(var(--spacing) * 7);\n}\n#class1-math-runtime .gap-8 {\n  gap: calc(var(--spacing) * 8);\n}\n#class1-math-runtime .gap-10 {\n  gap: calc(var(--spacing) * 10);\n}\n#class1-math-runtime .gap-20 {\n  gap: calc(var(--spacing) * 20);\n}\n#class1-math-runtime .gap-\\[2px\\] {\n  gap: 2px;\n}\n#class1-math-runtime .space-y-0\\.5 {\n  #class1-math-runtime :where(& > :not(:last-child)) {\n    --tw-space-y-reverse: 0;\n    margin-block-start: calc(calc(var(--spacing) * 0.5) * var(--tw-space-y-reverse));\n    margin-block-end: calc(calc(var(--spacing) * 0.5) * calc(1 - var(--tw-space-y-reverse)));\n  }\n}\n#class1-math-runtime .space-y-1 {\n  #class1-math-runtime :where(& > :not(:last-child)) {\n    --tw-space-y-reverse: 0;\n    margin-block-start: calc(calc(var(--spacing) * 1) * var(--tw-space-y-reverse));\n    margin-block-end: calc(calc(var(--spacing) * 1) * calc(1 - var(--tw-space-y-reverse)));\n  }\n}\n#class1-math-runtime .space-y-1\\.5 {\n  #class1-math-runtime :where(& > :not(:last-child)) {\n    --tw-space-y-reverse: 0;\n    margin-block-start: calc(calc(var(--spacing) * 1.5) * var(--tw-space-y-reverse));\n    margin-block-end: calc(calc(var(--spacing) * 1.5) * calc(1 - var(--tw-space-y-reverse)));\n  }\n}\n#class1-math-runtime .space-y-2 {\n  #class1-math-runtime :where(& > :not(:last-child)) {\n    --tw-space-y-reverse: 0;\n    margin-block-start: calc(calc(var(--spacing) * 2) * var(--tw-space-y-reverse));\n    margin-block-end: calc(calc(var(--spacing) * 2) * calc(1 - var(--tw-space-y-reverse)));\n  }\n}\n#class1-math-runtime .space-y-2\\.5 {\n  #class1-math-runtime :where(& > :not(:last-child)) {\n    --tw-space-y-reverse: 0;\n    margin-block-start: calc(calc(var(--spacing) * 2.5) * var(--tw-space-y-reverse));\n    margin-block-end: calc(calc(var(--spacing) * 2.5) * calc(1 - var(--tw-space-y-reverse)));\n  }\n}\n#class1-math-runtime .space-y-3 {\n  #class1-math-runtime :where(& > :not(:last-child)) {\n    --tw-space-y-reverse: 0;\n    margin-block-start: calc(calc(var(--spacing) * 3) * var(--tw-space-y-reverse));\n    margin-block-end: calc(calc(var(--spacing) * 3) * calc(1 - var(--tw-space-y-reverse)));\n  }\n}\n#class1-math-runtime .space-y-4 {\n  #class1-math-runtime :where(& > :not(:last-child)) {\n    --tw-space-y-reverse: 0;\n    margin-block-start: calc(calc(var(--spacing) * 4) * var(--tw-space-y-reverse));\n    margin-block-end: calc(calc(var(--spacing) * 4) * calc(1 - var(--tw-space-y-reverse)));\n  }\n}\n#class1-math-runtime .space-y-5 {\n  #class1-math-runtime :where(& > :not(:last-child)) {\n    --tw-space-y-reverse: 0;\n    margin-block-start: calc(calc(var(--spacing) * 5) * var(--tw-space-y-reverse));\n    margin-block-end: calc(calc(var(--spacing) * 5) * calc(1 - var(--tw-space-y-reverse)));\n  }\n}\n#class1-math-runtime .-space-x-3 {\n  #class1-math-runtime :where(& > :not(:last-child)) {\n    --tw-space-x-reverse: 0;\n    margin-inline-start: calc(calc(var(--spacing) * -3) * var(--tw-space-x-reverse));\n    margin-inline-end: calc(calc(var(--spacing) * -3) * calc(1 - var(--tw-space-x-reverse)));\n  }\n}\n#class1-math-runtime .space-x-1 {\n  #class1-math-runtime :where(& > :not(:last-child)) {\n    --tw-space-x-reverse: 0;\n    margin-inline-start: calc(calc(var(--spacing) * 1) * var(--tw-space-x-reverse));\n    margin-inline-end: calc(calc(var(--spacing) * 1) * calc(1 - var(--tw-space-x-reverse)));\n  }\n}\n#class1-math-runtime .space-x-1\\.5 {\n  #class1-math-runtime :where(& > :not(:last-child)) {\n    --tw-space-x-reverse: 0;\n    margin-inline-start: calc(calc(var(--spacing) * 1.5) * var(--tw-space-x-reverse));\n    margin-inline-end: calc(calc(var(--spacing) * 1.5) * calc(1 - var(--tw-space-x-reverse)));\n  }\n}\n#class1-math-runtime .space-x-2 {\n  #class1-math-runtime :where(& > :not(:last-child)) {\n    --tw-space-x-reverse: 0;\n    margin-inline-start: calc(calc(var(--spacing) * 2) * var(--tw-space-x-reverse));\n    margin-inline-end: calc(calc(var(--spacing) * 2) * calc(1 - var(--tw-space-x-reverse)));\n  }\n}\n#class1-math-runtime .space-x-2\\.5 {\n  #class1-math-runtime :where(& > :not(:last-child)) {\n    --tw-space-x-reverse: 0;\n    margin-inline-start: calc(calc(var(--spacing) * 2.5) * var(--tw-space-x-reverse));\n    margin-inline-end: calc(calc(var(--spacing) * 2.5) * calc(1 - var(--tw-space-x-reverse)));\n  }\n}\n#class1-math-runtime .space-x-3 {\n  #class1-math-runtime :where(& > :not(:last-child)) {\n    --tw-space-x-reverse: 0;\n    margin-inline-start: calc(calc(var(--spacing) * 3) * var(--tw-space-x-reverse));\n    margin-inline-end: calc(calc(var(--spacing) * 3) * calc(1 - var(--tw-space-x-reverse)));\n  }\n}\n#class1-math-runtime .divide-x {\n  #class1-math-runtime :where(& > :not(:last-child)) {\n    --tw-divide-x-reverse: 0;\n    border-inline-style: var(--tw-border-style);\n    border-inline-start-width: calc(1px * var(--tw-divide-x-reverse));\n    border-inline-end-width: calc(1px * calc(1 - var(--tw-divide-x-reverse)));\n  }\n}\n#class1-math-runtime .divide-y {\n  #class1-math-runtime :where(& > :not(:last-child)) {\n    --tw-divide-y-reverse: 0;\n    border-bottom-style: var(--tw-border-style);\n    border-top-style: var(--tw-border-style);\n    border-top-width: calc(1px * var(--tw-divide-y-reverse));\n    border-bottom-width: calc(1px * calc(1 - var(--tw-divide-y-reverse)));\n  }\n}\n#class1-math-runtime .divide-pink-100 {\n  #class1-math-runtime :where(& > :not(:last-child)) {\n    border-color: var(--color-pink-100);\n  }\n}\n#class1-math-runtime .divide-pink-200 {\n  #class1-math-runtime :where(& > :not(:last-child)) {\n    border-color: var(--color-pink-200);\n  }\n}\n#class1-math-runtime .justify-self-start {\n  justify-self: flex-start;\n}\n#class1-math-runtime .truncate {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n#class1-math-runtime .overflow-auto {\n  overflow: auto;\n}\n#class1-math-runtime .overflow-hidden {\n  overflow: hidden;\n}\n#class1-math-runtime .overflow-visible {\n  overflow: visible;\n}\n#class1-math-runtime .overflow-x-auto {\n  overflow-x: auto;\n}\n#class1-math-runtime .overflow-y-auto {\n  overflow-y: auto;\n}\n#class1-math-runtime .rounded {\n  border-radius: 0.25rem;\n}\n#class1-math-runtime .rounded-2xl {\n  border-radius: var(--radius-2xl);\n}\n#class1-math-runtime .rounded-3xl {\n  border-radius: var(--radius-3xl);\n}\n#class1-math-runtime .rounded-\\[3px\\] {\n  border-radius: 3px;\n}\n#class1-math-runtime .rounded-\\[22px\\] {\n  border-radius: 22px;\n}\n#class1-math-runtime .rounded-\\[24px\\] {\n  border-radius: 24px;\n}\n#class1-math-runtime .rounded-\\[26px\\] {\n  border-radius: 26px;\n}\n#class1-math-runtime .rounded-\\[28px\\] {\n  border-radius: 28px;\n}\n#class1-math-runtime .rounded-\\[30px\\] {\n  border-radius: 30px;\n}\n#class1-math-runtime .rounded-full {\n  border-radius: calc(infinity * 1px);\n}\n#class1-math-runtime .rounded-lg {\n  border-radius: var(--radius-lg);\n}\n#class1-math-runtime .rounded-xl {\n  border-radius: var(--radius-xl);\n}\n#class1-math-runtime .rounded-t-xl {\n  border-top-left-radius: var(--radius-xl);\n  border-top-right-radius: var(--radius-xl);\n}\n#class1-math-runtime .border {\n  border-style: var(--tw-border-style);\n  border-width: 1px;\n}\n#class1-math-runtime .border-2 {\n  border-style: var(--tw-border-style);\n  border-width: 2px;\n}\n#class1-math-runtime .border-4 {\n  border-style: var(--tw-border-style);\n  border-width: 4px;\n}\n#class1-math-runtime .border-\\[3px\\] {\n  border-style: var(--tw-border-style);\n  border-width: 3px;\n}\n#class1-math-runtime .border-t {\n  border-top-style: var(--tw-border-style);\n  border-top-width: 1px;\n}\n#class1-math-runtime .border-t-2 {\n  border-top-style: var(--tw-border-style);\n  border-top-width: 2px;\n}\n#class1-math-runtime .border-r {\n  border-right-style: var(--tw-border-style);\n  border-right-width: 1px;\n}\n#class1-math-runtime .border-b {\n  border-bottom-style: var(--tw-border-style);\n  border-bottom-width: 1px;\n}\n#class1-math-runtime .border-b-\\[3px\\] {\n  border-bottom-style: var(--tw-border-style);\n  border-bottom-width: 3px;\n}\n#class1-math-runtime .border-b-\\[4px\\] {\n  border-bottom-style: var(--tw-border-style);\n  border-bottom-width: 4px;\n}\n#class1-math-runtime .border-dashed {\n  --tw-border-style: dashed;\n  border-style: dashed;\n}\n#class1-math-runtime .border-amber-100 {\n  border-color: var(--color-amber-100);\n}\n#class1-math-runtime .border-amber-200 {\n  border-color: var(--color-amber-200);\n}\n#class1-math-runtime .border-amber-200\\/60 {\n  border-color: color-mix(in srgb, oklch(92.4% 0.12 95.746) 60%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    border-color: color-mix(in oklab, var(--color-amber-200) 60%, transparent);\n  }\n}\n#class1-math-runtime .border-amber-200\\/80 {\n  border-color: color-mix(in srgb, oklch(92.4% 0.12 95.746) 80%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    border-color: color-mix(in oklab, var(--color-amber-200) 80%, transparent);\n  }\n}\n#class1-math-runtime .border-amber-300 {\n  border-color: var(--color-amber-300);\n}\n#class1-math-runtime .border-amber-400 {\n  border-color: var(--color-amber-400);\n}\n#class1-math-runtime .border-blue-100 {\n  border-color: var(--color-blue-100);\n}\n#class1-math-runtime .border-blue-200 {\n  border-color: var(--color-blue-200);\n}\n#class1-math-runtime .border-blue-300 {\n  border-color: var(--color-blue-300);\n}\n#class1-math-runtime .border-blue-400 {\n  border-color: var(--color-blue-400);\n}\n#class1-math-runtime .border-current\\/20 {\n  border-color: currentcolor;\n  @supports (color: color-mix(in lab, red, red)) {\n    border-color: color-mix(in oklab, currentcolor 20%, transparent);\n  }\n}\n#class1-math-runtime .border-cyan-100 {\n  border-color: var(--color-cyan-100);\n}\n#class1-math-runtime .border-cyan-200 {\n  border-color: var(--color-cyan-200);\n}\n#class1-math-runtime .border-cyan-300 {\n  border-color: var(--color-cyan-300);\n}\n#class1-math-runtime .border-cyan-500 {\n  border-color: var(--color-cyan-500);\n}\n#class1-math-runtime .border-emerald-100 {\n  border-color: var(--color-emerald-100);\n}\n#class1-math-runtime .border-emerald-200 {\n  border-color: var(--color-emerald-200);\n}\n#class1-math-runtime .border-emerald-300 {\n  border-color: var(--color-emerald-300);\n}\n#class1-math-runtime .border-emerald-400 {\n  border-color: var(--color-emerald-400);\n}\n#class1-math-runtime .border-emerald-500 {\n  border-color: var(--color-emerald-500);\n}\n#class1-math-runtime .border-emerald-600 {\n  border-color: var(--color-emerald-600);\n}\n#class1-math-runtime .border-fuchsia-300 {\n  border-color: var(--color-fuchsia-300);\n}\n#class1-math-runtime .border-gray-200 {\n  border-color: var(--color-gray-200);\n}\n#class1-math-runtime .border-green-400 {\n  border-color: var(--color-green-400);\n}\n#class1-math-runtime .border-indigo-100 {\n  border-color: var(--color-indigo-100);\n}\n#class1-math-runtime .border-indigo-200 {\n  border-color: var(--color-indigo-200);\n}\n#class1-math-runtime .border-indigo-300 {\n  border-color: var(--color-indigo-300);\n}\n#class1-math-runtime .border-orange-200 {\n  border-color: var(--color-orange-200);\n}\n#class1-math-runtime .border-pink-100 {\n  border-color: var(--color-pink-100);\n}\n#class1-math-runtime .border-pink-200 {\n  border-color: var(--color-pink-200);\n}\n#class1-math-runtime .border-pink-300 {\n  border-color: var(--color-pink-300);\n}\n#class1-math-runtime .border-pink-500 {\n  border-color: var(--color-pink-500);\n}\n#class1-math-runtime .border-purple-100 {\n  border-color: var(--color-purple-100);\n}\n#class1-math-runtime .border-purple-200 {\n  border-color: var(--color-purple-200);\n}\n#class1-math-runtime .border-purple-300 {\n  border-color: var(--color-purple-300);\n}\n#class1-math-runtime .border-purple-400 {\n  border-color: var(--color-purple-400);\n}\n#class1-math-runtime .border-red-400 {\n  border-color: var(--color-red-400);\n}\n#class1-math-runtime .border-red-500 {\n  border-color: var(--color-red-500);\n}\n#class1-math-runtime .border-rose-100 {\n  border-color: var(--color-rose-100);\n}\n#class1-math-runtime .border-rose-200 {\n  border-color: var(--color-rose-200);\n}\n#class1-math-runtime .border-rose-300 {\n  border-color: var(--color-rose-300);\n}\n#class1-math-runtime .border-rose-400 {\n  border-color: var(--color-rose-400);\n}\n#class1-math-runtime .border-rose-500 {\n  border-color: var(--color-rose-500);\n}\n#class1-math-runtime .border-sky-100 {\n  border-color: var(--color-sky-100);\n}\n#class1-math-runtime .border-sky-200 {\n  border-color: var(--color-sky-200);\n}\n#class1-math-runtime .border-sky-300 {\n  border-color: var(--color-sky-300);\n}\n#class1-math-runtime .border-slate-100 {\n  border-color: var(--color-slate-100);\n}\n#class1-math-runtime .border-slate-200 {\n  border-color: var(--color-slate-200);\n}\n#class1-math-runtime .border-slate-300 {\n  border-color: var(--color-slate-300);\n}\n#class1-math-runtime .border-violet-100 {\n  border-color: var(--color-violet-100);\n}\n#class1-math-runtime .border-violet-200 {\n  border-color: var(--color-violet-200);\n}\n#class1-math-runtime .border-violet-300 {\n  border-color: var(--color-violet-300);\n}\n#class1-math-runtime .border-violet-400 {\n  border-color: var(--color-violet-400);\n}\n#class1-math-runtime .border-violet-600 {\n  border-color: var(--color-violet-600);\n}\n#class1-math-runtime .border-white {\n  border-color: var(--color-white);\n}\n#class1-math-runtime .border-white\\/15 {\n  border-color: color-mix(in srgb, #fff 15%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    border-color: color-mix(in oklab, var(--color-white) 15%, transparent);\n  }\n}\n#class1-math-runtime .border-white\\/20 {\n  border-color: color-mix(in srgb, #fff 20%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    border-color: color-mix(in oklab, var(--color-white) 20%, transparent);\n  }\n}\n#class1-math-runtime .border-yellow-200 {\n  border-color: var(--color-yellow-200);\n}\n#class1-math-runtime .bg-\\[\\#fffdf4\\] {\n  background-color: #fffdf4;\n}\n#class1-math-runtime .bg-amber-50 {\n  background-color: var(--color-amber-50);\n}\n#class1-math-runtime .bg-amber-50\\/55 {\n  background-color: color-mix(in srgb, oklch(98.7% 0.022 95.277) 55%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    background-color: color-mix(in oklab, var(--color-amber-50) 55%, transparent);\n  }\n}\n#class1-math-runtime .bg-amber-50\\/60 {\n  background-color: color-mix(in srgb, oklch(98.7% 0.022 95.277) 60%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    background-color: color-mix(in oklab, var(--color-amber-50) 60%, transparent);\n  }\n}\n#class1-math-runtime .bg-amber-50\\/70 {\n  background-color: color-mix(in srgb, oklch(98.7% 0.022 95.277) 70%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    background-color: color-mix(in oklab, var(--color-amber-50) 70%, transparent);\n  }\n}\n#class1-math-runtime .bg-amber-50\\/80 {\n  background-color: color-mix(in srgb, oklch(98.7% 0.022 95.277) 80%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    background-color: color-mix(in oklab, var(--color-amber-50) 80%, transparent);\n  }\n}\n#class1-math-runtime .bg-amber-100 {\n  background-color: var(--color-amber-100);\n}\n#class1-math-runtime .bg-amber-200 {\n  background-color: var(--color-amber-200);\n}\n#class1-math-runtime .bg-amber-500 {\n  background-color: var(--color-amber-500);\n}\n#class1-math-runtime .bg-black\\/30 {\n  background-color: color-mix(in srgb, #000 30%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    background-color: color-mix(in oklab, var(--color-black) 30%, transparent);\n  }\n}\n#class1-math-runtime .bg-blue-50 {\n  background-color: var(--color-blue-50);\n}\n#class1-math-runtime .bg-blue-50\\/65 {\n  background-color: color-mix(in srgb, oklch(97% 0.014 254.604) 65%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    background-color: color-mix(in oklab, var(--color-blue-50) 65%, transparent);\n  }\n}\n#class1-math-runtime .bg-blue-100 {\n  background-color: var(--color-blue-100);\n}\n#class1-math-runtime .bg-cyan-50 {\n  background-color: var(--color-cyan-50);\n}\n#class1-math-runtime .bg-cyan-50\\/40 {\n  background-color: color-mix(in srgb, oklch(98.4% 0.019 200.873) 40%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    background-color: color-mix(in oklab, var(--color-cyan-50) 40%, transparent);\n  }\n}\n#class1-math-runtime .bg-cyan-500 {\n  background-color: var(--color-cyan-500);\n}\n#class1-math-runtime .bg-emerald-50 {\n  background-color: var(--color-emerald-50);\n}\n#class1-math-runtime .bg-emerald-50\\/55 {\n  background-color: color-mix(in srgb, oklch(97.9% 0.021 166.113) 55%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    background-color: color-mix(in oklab, var(--color-emerald-50) 55%, transparent);\n  }\n}\n#class1-math-runtime .bg-emerald-50\\/60 {\n  background-color: color-mix(in srgb, oklch(97.9% 0.021 166.113) 60%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    background-color: color-mix(in oklab, var(--color-emerald-50) 60%, transparent);\n  }\n}\n#class1-math-runtime .bg-emerald-50\\/70 {\n  background-color: color-mix(in srgb, oklch(97.9% 0.021 166.113) 70%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    background-color: color-mix(in oklab, var(--color-emerald-50) 70%, transparent);\n  }\n}\n#class1-math-runtime .bg-emerald-50\\/80 {\n  background-color: color-mix(in srgb, oklch(97.9% 0.021 166.113) 80%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    background-color: color-mix(in oklab, var(--color-emerald-50) 80%, transparent);\n  }\n}\n#class1-math-runtime .bg-emerald-100 {\n  background-color: var(--color-emerald-100);\n}\n#class1-math-runtime .bg-emerald-400 {\n  background-color: var(--color-emerald-400);\n}\n#class1-math-runtime .bg-emerald-500 {\n  background-color: var(--color-emerald-500);\n}\n#class1-math-runtime .bg-emerald-600 {\n  background-color: var(--color-emerald-600);\n}\n#class1-math-runtime .bg-fuchsia-50\\/80 {\n  background-color: color-mix(in srgb, oklch(97.7% 0.017 320.058) 80%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    background-color: color-mix(in oklab, var(--color-fuchsia-50) 80%, transparent);\n  }\n}\n#class1-math-runtime .bg-gray-100 {\n  background-color: var(--color-gray-100);\n}\n#class1-math-runtime .bg-green-100 {\n  background-color: var(--color-green-100);\n}\n#class1-math-runtime .bg-indigo-50 {\n  background-color: var(--color-indigo-50);\n}\n#class1-math-runtime .bg-indigo-50\\/40 {\n  background-color: color-mix(in srgb, oklch(96.2% 0.018 272.314) 40%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    background-color: color-mix(in oklab, var(--color-indigo-50) 40%, transparent);\n  }\n}\n#class1-math-runtime .bg-indigo-50\\/65 {\n  background-color: color-mix(in srgb, oklch(96.2% 0.018 272.314) 65%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    background-color: color-mix(in oklab, var(--color-indigo-50) 65%, transparent);\n  }\n}\n#class1-math-runtime .bg-indigo-50\\/70 {\n  background-color: color-mix(in srgb, oklch(96.2% 0.018 272.314) 70%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    background-color: color-mix(in oklab, var(--color-indigo-50) 70%, transparent);\n  }\n}\n#class1-math-runtime .bg-indigo-50\\/80 {\n  background-color: color-mix(in srgb, oklch(96.2% 0.018 272.314) 80%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    background-color: color-mix(in oklab, var(--color-indigo-50) 80%, transparent);\n  }\n}\n#class1-math-runtime .bg-orange-50 {\n  background-color: var(--color-orange-50);\n}\n#class1-math-runtime .bg-pink-50 {\n  background-color: var(--color-pink-50);\n}\n#class1-math-runtime .bg-pink-50\\/20 {\n  background-color: color-mix(in srgb, oklch(97.1% 0.014 343.198) 20%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    background-color: color-mix(in oklab, var(--color-pink-50) 20%, transparent);\n  }\n}\n#class1-math-runtime .bg-pink-50\\/30 {\n  background-color: color-mix(in srgb, oklch(97.1% 0.014 343.198) 30%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    background-color: color-mix(in oklab, var(--color-pink-50) 30%, transparent);\n  }\n}\n#class1-math-runtime .bg-pink-50\\/40 {\n  background-color: color-mix(in srgb, oklch(97.1% 0.014 343.198) 40%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    background-color: color-mix(in oklab, var(--color-pink-50) 40%, transparent);\n  }\n}\n#class1-math-runtime .bg-pink-50\\/55 {\n  background-color: color-mix(in srgb, oklch(97.1% 0.014 343.198) 55%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    background-color: color-mix(in oklab, var(--color-pink-50) 55%, transparent);\n  }\n}\n#class1-math-runtime .bg-pink-50\\/60 {\n  background-color: color-mix(in srgb, oklch(97.1% 0.014 343.198) 60%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    background-color: color-mix(in oklab, var(--color-pink-50) 60%, transparent);\n  }\n}\n#class1-math-runtime .bg-pink-50\\/70 {\n  background-color: color-mix(in srgb, oklch(97.1% 0.014 343.198) 70%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    background-color: color-mix(in oklab, var(--color-pink-50) 70%, transparent);\n  }\n}\n#class1-math-runtime .bg-pink-50\\/80 {\n  background-color: color-mix(in srgb, oklch(97.1% 0.014 343.198) 80%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    background-color: color-mix(in oklab, var(--color-pink-50) 80%, transparent);\n  }\n}\n#class1-math-runtime .bg-pink-50\\/90 {\n  background-color: color-mix(in srgb, oklch(97.1% 0.014 343.198) 90%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    background-color: color-mix(in oklab, var(--color-pink-50) 90%, transparent);\n  }\n}\n#class1-math-runtime .bg-pink-100 {\n  background-color: var(--color-pink-100);\n}\n#class1-math-runtime .bg-pink-100\\/70 {\n  background-color: color-mix(in srgb, oklch(94.8% 0.028 342.258) 70%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    background-color: color-mix(in oklab, var(--color-pink-100) 70%, transparent);\n  }\n}\n#class1-math-runtime .bg-pink-500 {\n  background-color: var(--color-pink-500);\n}\n#class1-math-runtime .bg-purple-50 {\n  background-color: var(--color-purple-50);\n}\n#class1-math-runtime .bg-purple-50\\/60 {\n  background-color: color-mix(in srgb, oklch(97.7% 0.014 308.299) 60%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    background-color: color-mix(in oklab, var(--color-purple-50) 60%, transparent);\n  }\n}\n#class1-math-runtime .bg-purple-50\\/70 {\n  background-color: color-mix(in srgb, oklch(97.7% 0.014 308.299) 70%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    background-color: color-mix(in oklab, var(--color-purple-50) 70%, transparent);\n  }\n}\n#class1-math-runtime .bg-purple-50\\/80 {\n  background-color: color-mix(in srgb, oklch(97.7% 0.014 308.299) 80%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    background-color: color-mix(in oklab, var(--color-purple-50) 80%, transparent);\n  }\n}\n#class1-math-runtime .bg-purple-100 {\n  background-color: var(--color-purple-100);\n}\n#class1-math-runtime .bg-purple-200 {\n  background-color: var(--color-purple-200);\n}\n#class1-math-runtime .bg-red-200 {\n  background-color: var(--color-red-200);\n}\n#class1-math-runtime .bg-rose-50 {\n  background-color: var(--color-rose-50);\n}\n#class1-math-runtime .bg-rose-50\\/40 {\n  background-color: color-mix(in srgb, oklch(96.9% 0.015 12.422) 40%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    background-color: color-mix(in oklab, var(--color-rose-50) 40%, transparent);\n  }\n}\n#class1-math-runtime .bg-rose-50\\/50 {\n  background-color: color-mix(in srgb, oklch(96.9% 0.015 12.422) 50%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    background-color: color-mix(in oklab, var(--color-rose-50) 50%, transparent);\n  }\n}\n#class1-math-runtime .bg-rose-50\\/60 {\n  background-color: color-mix(in srgb, oklch(96.9% 0.015 12.422) 60%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    background-color: color-mix(in oklab, var(--color-rose-50) 60%, transparent);\n  }\n}\n#class1-math-runtime .bg-rose-50\\/70 {\n  background-color: color-mix(in srgb, oklch(96.9% 0.015 12.422) 70%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    background-color: color-mix(in oklab, var(--color-rose-50) 70%, transparent);\n  }\n}\n#class1-math-runtime .bg-rose-50\\/80 {\n  background-color: color-mix(in srgb, oklch(96.9% 0.015 12.422) 80%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    background-color: color-mix(in oklab, var(--color-rose-50) 80%, transparent);\n  }\n}\n#class1-math-runtime .bg-rose-100 {\n  background-color: var(--color-rose-100);\n}\n#class1-math-runtime .bg-rose-200 {\n  background-color: var(--color-rose-200);\n}\n#class1-math-runtime .bg-rose-300 {\n  background-color: var(--color-rose-300);\n}\n#class1-math-runtime .bg-rose-500 {\n  background-color: var(--color-rose-500);\n}\n#class1-math-runtime .bg-sky-50 {\n  background-color: var(--color-sky-50);\n}\n#class1-math-runtime .bg-sky-50\\/55 {\n  background-color: color-mix(in srgb, oklch(97.7% 0.013 236.62) 55%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    background-color: color-mix(in oklab, var(--color-sky-50) 55%, transparent);\n  }\n}\n#class1-math-runtime .bg-sky-50\\/60 {\n  background-color: color-mix(in srgb, oklch(97.7% 0.013 236.62) 60%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    background-color: color-mix(in oklab, var(--color-sky-50) 60%, transparent);\n  }\n}\n#class1-math-runtime .bg-sky-50\\/65 {\n  background-color: color-mix(in srgb, oklch(97.7% 0.013 236.62) 65%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    background-color: color-mix(in oklab, var(--color-sky-50) 65%, transparent);\n  }\n}\n#class1-math-runtime .bg-sky-50\\/70 {\n  background-color: color-mix(in srgb, oklch(97.7% 0.013 236.62) 70%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    background-color: color-mix(in oklab, var(--color-sky-50) 70%, transparent);\n  }\n}\n#class1-math-runtime .bg-sky-50\\/80 {\n  background-color: color-mix(in srgb, oklch(97.7% 0.013 236.62) 80%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    background-color: color-mix(in oklab, var(--color-sky-50) 80%, transparent);\n  }\n}\n#class1-math-runtime .bg-sky-100 {\n  background-color: var(--color-sky-100);\n}\n#class1-math-runtime .bg-sky-200 {\n  background-color: var(--color-sky-200);\n}\n#class1-math-runtime .bg-sky-300 {\n  background-color: var(--color-sky-300);\n}\n#class1-math-runtime .bg-sky-500 {\n  background-color: var(--color-sky-500);\n}\n#class1-math-runtime .bg-slate-50 {\n  background-color: var(--color-slate-50);\n}\n#class1-math-runtime .bg-slate-50\\/70 {\n  background-color: color-mix(in srgb, oklch(98.4% 0.003 247.858) 70%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    background-color: color-mix(in oklab, var(--color-slate-50) 70%, transparent);\n  }\n}\n#class1-math-runtime .bg-slate-100 {\n  background-color: var(--color-slate-100);\n}\n#class1-math-runtime .bg-slate-800 {\n  background-color: var(--color-slate-800);\n}\n#class1-math-runtime .bg-slate-900\\/50 {\n  background-color: color-mix(in srgb, oklch(20.8% 0.042 265.755) 50%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    background-color: color-mix(in oklab, var(--color-slate-900) 50%, transparent);\n  }\n}\n#class1-math-runtime .bg-slate-900\\/55 {\n  background-color: color-mix(in srgb, oklch(20.8% 0.042 265.755) 55%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    background-color: color-mix(in oklab, var(--color-slate-900) 55%, transparent);\n  }\n}\n#class1-math-runtime .bg-slate-900\\/60 {\n  background-color: color-mix(in srgb, oklch(20.8% 0.042 265.755) 60%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    background-color: color-mix(in oklab, var(--color-slate-900) 60%, transparent);\n  }\n}\n#class1-math-runtime .bg-slate-950\\/55 {\n  background-color: color-mix(in srgb, oklch(12.9% 0.042 264.695) 55%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    background-color: color-mix(in oklab, var(--color-slate-950) 55%, transparent);\n  }\n}\n#class1-math-runtime .bg-violet-50 {\n  background-color: var(--color-violet-50);\n}\n#class1-math-runtime .bg-violet-50\\/40 {\n  background-color: color-mix(in srgb, oklch(96.9% 0.016 293.756) 40%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    background-color: color-mix(in oklab, var(--color-violet-50) 40%, transparent);\n  }\n}\n#class1-math-runtime .bg-violet-50\\/50 {\n  background-color: color-mix(in srgb, oklch(96.9% 0.016 293.756) 50%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    background-color: color-mix(in oklab, var(--color-violet-50) 50%, transparent);\n  }\n}\n#class1-math-runtime .bg-violet-50\\/60 {\n  background-color: color-mix(in srgb, oklch(96.9% 0.016 293.756) 60%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    background-color: color-mix(in oklab, var(--color-violet-50) 60%, transparent);\n  }\n}\n#class1-math-runtime .bg-violet-50\\/65 {\n  background-color: color-mix(in srgb, oklch(96.9% 0.016 293.756) 65%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    background-color: color-mix(in oklab, var(--color-violet-50) 65%, transparent);\n  }\n}\n#class1-math-runtime .bg-violet-50\\/80 {\n  background-color: color-mix(in srgb, oklch(96.9% 0.016 293.756) 80%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    background-color: color-mix(in oklab, var(--color-violet-50) 80%, transparent);\n  }\n}\n#class1-math-runtime .bg-violet-100 {\n  background-color: var(--color-violet-100);\n}\n#class1-math-runtime .bg-violet-200 {\n  background-color: var(--color-violet-200);\n}\n#class1-math-runtime .bg-violet-300 {\n  background-color: var(--color-violet-300);\n}\n#class1-math-runtime .bg-violet-400 {\n  background-color: var(--color-violet-400);\n}\n#class1-math-runtime .bg-white {\n  background-color: var(--color-white);\n}\n#class1-math-runtime .bg-white\\/10 {\n  background-color: color-mix(in srgb, #fff 10%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    background-color: color-mix(in oklab, var(--color-white) 10%, transparent);\n  }\n}\n#class1-math-runtime .bg-white\\/70 {\n  background-color: color-mix(in srgb, #fff 70%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    background-color: color-mix(in oklab, var(--color-white) 70%, transparent);\n  }\n}\n#class1-math-runtime .bg-white\\/75 {\n  background-color: color-mix(in srgb, #fff 75%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    background-color: color-mix(in oklab, var(--color-white) 75%, transparent);\n  }\n}\n#class1-math-runtime .bg-white\\/80 {\n  background-color: color-mix(in srgb, #fff 80%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    background-color: color-mix(in oklab, var(--color-white) 80%, transparent);\n  }\n}\n#class1-math-runtime .bg-white\\/85 {\n  background-color: color-mix(in srgb, #fff 85%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    background-color: color-mix(in oklab, var(--color-white) 85%, transparent);\n  }\n}\n#class1-math-runtime .bg-white\\/90 {\n  background-color: color-mix(in srgb, #fff 90%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    background-color: color-mix(in oklab, var(--color-white) 90%, transparent);\n  }\n}\n#class1-math-runtime .bg-white\\/95 {\n  background-color: color-mix(in srgb, #fff 95%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    background-color: color-mix(in oklab, var(--color-white) 95%, transparent);\n  }\n}\n#class1-math-runtime .bg-gradient-to-b {\n  --tw-gradient-position: to bottom in oklab;\n  background-image: linear-gradient(var(--tw-gradient-stops));\n}\n#class1-math-runtime .bg-gradient-to-br {\n  --tw-gradient-position: to bottom right in oklab;\n  background-image: linear-gradient(var(--tw-gradient-stops));\n}\n#class1-math-runtime .bg-gradient-to-r {\n  --tw-gradient-position: to right in oklab;\n  background-image: linear-gradient(var(--tw-gradient-stops));\n}\n#class1-math-runtime .bg-gradient-to-tr {\n  --tw-gradient-position: to top right in oklab;\n  background-image: linear-gradient(var(--tw-gradient-stops));\n}\n#class1-math-runtime .from-amber-50 {\n  --tw-gradient-from: var(--color-amber-50);\n  --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n}\n#class1-math-runtime .from-amber-50\\/70 {\n  --tw-gradient-from: color-mix(in srgb, oklch(98.7% 0.022 95.277) 70%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    --tw-gradient-from: color-mix(in oklab, var(--color-amber-50) 70%, transparent);\n  }\n  --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n}\n#class1-math-runtime .from-amber-50\\/90 {\n  --tw-gradient-from: color-mix(in srgb, oklch(98.7% 0.022 95.277) 90%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    --tw-gradient-from: color-mix(in oklab, var(--color-amber-50) 90%, transparent);\n  }\n  --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n}\n#class1-math-runtime .from-amber-400 {\n  --tw-gradient-from: var(--color-amber-400);\n  --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n}\n#class1-math-runtime .from-amber-500 {\n  --tw-gradient-from: var(--color-amber-500);\n  --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n}\n#class1-math-runtime .from-cyan-50 {\n  --tw-gradient-from: var(--color-cyan-50);\n  --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n}\n#class1-math-runtime .from-cyan-700 {\n  --tw-gradient-from: var(--color-cyan-700);\n  --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n}\n#class1-math-runtime .from-emerald-50 {\n  --tw-gradient-from: var(--color-emerald-50);\n  --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n}\n#class1-math-runtime .from-emerald-500 {\n  --tw-gradient-from: var(--color-emerald-500);\n  --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n}\n#class1-math-runtime .from-fuchsia-400 {\n  --tw-gradient-from: var(--color-fuchsia-400);\n  --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n}\n#class1-math-runtime .from-orange-400 {\n  --tw-gradient-from: var(--color-orange-400);\n  --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n}\n#class1-math-runtime .from-pink-50 {\n  --tw-gradient-from: var(--color-pink-50);\n  --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n}\n#class1-math-runtime .from-pink-50\\/30 {\n  --tw-gradient-from: color-mix(in srgb, oklch(97.1% 0.014 343.198) 30%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    --tw-gradient-from: color-mix(in oklab, var(--color-pink-50) 30%, transparent);\n  }\n  --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n}\n#class1-math-runtime .from-pink-50\\/70 {\n  --tw-gradient-from: color-mix(in srgb, oklch(97.1% 0.014 343.198) 70%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    --tw-gradient-from: color-mix(in oklab, var(--color-pink-50) 70%, transparent);\n  }\n  --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n}\n#class1-math-runtime .from-pink-100 {\n  --tw-gradient-from: var(--color-pink-100);\n  --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n}\n#class1-math-runtime .from-pink-400 {\n  --tw-gradient-from: var(--color-pink-400);\n  --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n}\n#class1-math-runtime .from-pink-500 {\n  --tw-gradient-from: var(--color-pink-500);\n  --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n}\n#class1-math-runtime .from-purple-50 {\n  --tw-gradient-from: var(--color-purple-50);\n  --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n}\n#class1-math-runtime .from-purple-400 {\n  --tw-gradient-from: var(--color-purple-400);\n  --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n}\n#class1-math-runtime .from-purple-500 {\n  --tw-gradient-from: var(--color-purple-500);\n  --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n}\n#class1-math-runtime .from-rose-600 {\n  --tw-gradient-from: var(--color-rose-600);\n  --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n}\n#class1-math-runtime .from-rose-900 {\n  --tw-gradient-from: var(--color-rose-900);\n  --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n}\n#class1-math-runtime .from-sky-50 {\n  --tw-gradient-from: var(--color-sky-50);\n  --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n}\n#class1-math-runtime .from-violet-50 {\n  --tw-gradient-from: var(--color-violet-50);\n  --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n}\n#class1-math-runtime .from-violet-400 {\n  --tw-gradient-from: var(--color-violet-400);\n  --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n}\n#class1-math-runtime .from-white {\n  --tw-gradient-from: var(--color-white);\n  --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n}\n#class1-math-runtime .from-yellow-50 {\n  --tw-gradient-from: var(--color-yellow-50);\n  --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n}\n#class1-math-runtime .via-amber-50\\/20 {\n  --tw-gradient-via: color-mix(in srgb, oklch(98.7% 0.022 95.277) 20%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    --tw-gradient-via: color-mix(in oklab, var(--color-amber-50) 20%, transparent);\n  }\n  --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n  --tw-gradient-stops: var(--tw-gradient-via-stops);\n}\n#class1-math-runtime .via-emerald-50\\/20 {\n  --tw-gradient-via: color-mix(in srgb, oklch(97.9% 0.021 166.113) 20%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    --tw-gradient-via: color-mix(in oklab, var(--color-emerald-50) 20%, transparent);\n  }\n  --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n  --tw-gradient-stops: var(--tw-gradient-via-stops);\n}\n#class1-math-runtime .via-indigo-400 {\n  --tw-gradient-via: var(--color-indigo-400);\n  --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n  --tw-gradient-stops: var(--tw-gradient-via-stops);\n}\n#class1-math-runtime .via-orange-50\\/60 {\n  --tw-gradient-via: color-mix(in srgb, oklch(98% 0.016 73.684) 60%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    --tw-gradient-via: color-mix(in oklab, var(--color-orange-50) 60%, transparent);\n  }\n  --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n  --tw-gradient-stops: var(--tw-gradient-via-stops);\n}\n#class1-math-runtime .via-pink-50 {\n  --tw-gradient-via: var(--color-pink-50);\n  --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n  --tw-gradient-stops: var(--tw-gradient-via-stops);\n}\n#class1-math-runtime .via-pink-50\\/20 {\n  --tw-gradient-via: color-mix(in srgb, oklch(97.1% 0.014 343.198) 20%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    --tw-gradient-via: color-mix(in oklab, var(--color-pink-50) 20%, transparent);\n  }\n  --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n  --tw-gradient-stops: var(--tw-gradient-via-stops);\n}\n#class1-math-runtime .via-pink-950 {\n  --tw-gradient-via: var(--color-pink-950);\n  --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n  --tw-gradient-stops: var(--tw-gradient-via-stops);\n}\n#class1-math-runtime .via-purple-50\\/20 {\n  --tw-gradient-via: color-mix(in srgb, oklch(97.7% 0.014 308.299) 20%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    --tw-gradient-via: color-mix(in oklab, var(--color-purple-50) 20%, transparent);\n  }\n  --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n  --tw-gradient-stops: var(--tw-gradient-via-stops);\n}\n#class1-math-runtime .via-purple-400 {\n  --tw-gradient-via: var(--color-purple-400);\n  --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n  --tw-gradient-stops: var(--tw-gradient-via-stops);\n}\n#class1-math-runtime .via-rose-50\\/15 {\n  --tw-gradient-via: color-mix(in srgb, oklch(96.9% 0.015 12.422) 15%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    --tw-gradient-via: color-mix(in oklab, var(--color-rose-50) 15%, transparent);\n  }\n  --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n  --tw-gradient-stops: var(--tw-gradient-via-stops);\n}\n#class1-math-runtime .via-sky-50\\/20 {\n  --tw-gradient-via: color-mix(in srgb, oklch(97.7% 0.013 236.62) 20%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    --tw-gradient-via: color-mix(in oklab, var(--color-sky-50) 20%, transparent);\n  }\n  --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n  --tw-gradient-stops: var(--tw-gradient-via-stops);\n}\n#class1-math-runtime .via-violet-50\\/40 {\n  --tw-gradient-via: color-mix(in srgb, oklch(96.9% 0.016 293.756) 40%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    --tw-gradient-via: color-mix(in oklab, var(--color-violet-50) 40%, transparent);\n  }\n  --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n  --tw-gradient-stops: var(--tw-gradient-via-stops);\n}\n#class1-math-runtime .via-violet-600 {\n  --tw-gradient-via: var(--color-violet-600);\n  --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n  --tw-gradient-stops: var(--tw-gradient-via-stops);\n}\n#class1-math-runtime .via-white {\n  --tw-gradient-via: var(--color-white);\n  --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n  --tw-gradient-stops: var(--tw-gradient-via-stops);\n}\n#class1-math-runtime .to-amber-50 {\n  --tw-gradient-to: var(--color-amber-50);\n  --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n}\n#class1-math-runtime .to-amber-50\\/20 {\n  --tw-gradient-to: color-mix(in srgb, oklch(98.7% 0.022 95.277) 20%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    --tw-gradient-to: color-mix(in oklab, var(--color-amber-50) 20%, transparent);\n  }\n  --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n}\n#class1-math-runtime .to-amber-500 {\n  --tw-gradient-to: var(--color-amber-500);\n  --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n}\n#class1-math-runtime .to-emerald-50 {\n  --tw-gradient-to: var(--color-emerald-50);\n  --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n}\n#class1-math-runtime .to-fuchsia-50 {\n  --tw-gradient-to: var(--color-fuchsia-50);\n  --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n}\n#class1-math-runtime .to-indigo-50 {\n  --tw-gradient-to: var(--color-indigo-50);\n  --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n}\n#class1-math-runtime .to-indigo-50\\/20 {\n  --tw-gradient-to: color-mix(in srgb, oklch(96.2% 0.018 272.314) 20%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    --tw-gradient-to: color-mix(in oklab, var(--color-indigo-50) 20%, transparent);\n  }\n  --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n}\n#class1-math-runtime .to-indigo-50\\/30 {\n  --tw-gradient-to: color-mix(in srgb, oklch(96.2% 0.018 272.314) 30%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    --tw-gradient-to: color-mix(in oklab, var(--color-indigo-50) 30%, transparent);\n  }\n  --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n}\n#class1-math-runtime .to-indigo-400 {\n  --tw-gradient-to: var(--color-indigo-400);\n  --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n}\n#class1-math-runtime .to-indigo-500 {\n  --tw-gradient-to: var(--color-indigo-500);\n  --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n}\n#class1-math-runtime .to-orange-50 {\n  --tw-gradient-to: var(--color-orange-50);\n  --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n}\n#class1-math-runtime .to-orange-400 {\n  --tw-gradient-to: var(--color-orange-400);\n  --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n}\n#class1-math-runtime .to-orange-500 {\n  --tw-gradient-to: var(--color-orange-500);\n  --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n}\n#class1-math-runtime .to-pink-50 {\n  --tw-gradient-to: var(--color-pink-50);\n  --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n}\n#class1-math-runtime .to-pink-50\\/40 {\n  --tw-gradient-to: color-mix(in srgb, oklch(97.1% 0.014 343.198) 40%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    --tw-gradient-to: color-mix(in oklab, var(--color-pink-50) 40%, transparent);\n  }\n  --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n}\n#class1-math-runtime .to-purple-50 {\n  --tw-gradient-to: var(--color-purple-50);\n  --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n}\n#class1-math-runtime .to-purple-50\\/30 {\n  --tw-gradient-to: color-mix(in srgb, oklch(97.7% 0.014 308.299) 30%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    --tw-gradient-to: color-mix(in oklab, var(--color-purple-50) 30%, transparent);\n  }\n  --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n}\n#class1-math-runtime .to-purple-50\\/70 {\n  --tw-gradient-to: color-mix(in srgb, oklch(97.7% 0.014 308.299) 70%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    --tw-gradient-to: color-mix(in oklab, var(--color-purple-50) 70%, transparent);\n  }\n  --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n}\n#class1-math-runtime .to-purple-100 {\n  --tw-gradient-to: var(--color-purple-100);\n  --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n}\n#class1-math-runtime .to-purple-500 {\n  --tw-gradient-to: var(--color-purple-500);\n  --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n}\n#class1-math-runtime .to-purple-700 {\n  --tw-gradient-to: var(--color-purple-700);\n  --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n}\n#class1-math-runtime .to-red-600 {\n  --tw-gradient-to: var(--color-red-600);\n  --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n}\n#class1-math-runtime .to-rose-50 {\n  --tw-gradient-to: var(--color-rose-50);\n  --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n}\n#class1-math-runtime .to-rose-50\\/50 {\n  --tw-gradient-to: color-mix(in srgb, oklch(96.9% 0.015 12.422) 50%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    --tw-gradient-to: color-mix(in oklab, var(--color-rose-50) 50%, transparent);\n  }\n  --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n}\n#class1-math-runtime .to-rose-50\\/60 {\n  --tw-gradient-to: color-mix(in srgb, oklch(96.9% 0.015 12.422) 60%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    --tw-gradient-to: color-mix(in oklab, var(--color-rose-50) 60%, transparent);\n  }\n  --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n}\n#class1-math-runtime .to-rose-400 {\n  --tw-gradient-to: var(--color-rose-400);\n  --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n}\n#class1-math-runtime .to-rose-500 {\n  --tw-gradient-to: var(--color-rose-500);\n  --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n}\n#class1-math-runtime .to-rose-900 {\n  --tw-gradient-to: var(--color-rose-900);\n  --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n}\n#class1-math-runtime .to-sky-50 {\n  --tw-gradient-to: var(--color-sky-50);\n  --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n}\n#class1-math-runtime .to-sky-50\\/20 {\n  --tw-gradient-to: color-mix(in srgb, oklch(97.7% 0.013 236.62) 20%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    --tw-gradient-to: color-mix(in oklab, var(--color-sky-50) 20%, transparent);\n  }\n  --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n}\n#class1-math-runtime .to-sky-50\\/30 {\n  --tw-gradient-to: color-mix(in srgb, oklch(97.7% 0.013 236.62) 30%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    --tw-gradient-to: color-mix(in oklab, var(--color-sky-50) 30%, transparent);\n  }\n  --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n}\n#class1-math-runtime .to-sky-400 {\n  --tw-gradient-to: var(--color-sky-400);\n  --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n}\n#class1-math-runtime .to-teal-500 {\n  --tw-gradient-to: var(--color-teal-500);\n  --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n}\n#class1-math-runtime .to-violet-50 {\n  --tw-gradient-to: var(--color-violet-50);\n  --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n}\n#class1-math-runtime .to-violet-500 {\n  --tw-gradient-to: var(--color-violet-500);\n  --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n}\n#class1-math-runtime .bg-clip-text {\n  background-clip: text;\n}\n#class1-math-runtime .object-contain {\n  object-fit: contain;\n}\n#class1-math-runtime .object-cover {\n  object-fit: cover;\n}\n#class1-math-runtime .p-0 {\n  padding: calc(var(--spacing) * 0);\n}\n#class1-math-runtime .p-1 {\n  padding: calc(var(--spacing) * 1);\n}\n#class1-math-runtime .p-2 {\n  padding: calc(var(--spacing) * 2);\n}\n#class1-math-runtime .p-2\\.5 {\n  padding: calc(var(--spacing) * 2.5);\n}\n#class1-math-runtime .p-3 {\n  padding: calc(var(--spacing) * 3);\n}\n#class1-math-runtime .p-3\\.5 {\n  padding: calc(var(--spacing) * 3.5);\n}\n#class1-math-runtime .p-4 {\n  padding: calc(var(--spacing) * 4);\n}\n#class1-math-runtime .p-5 {\n  padding: calc(var(--spacing) * 5);\n}\n#class1-math-runtime .p-6 {\n  padding: calc(var(--spacing) * 6);\n}\n#class1-math-runtime .px-1 {\n  padding-inline: calc(var(--spacing) * 1);\n}\n#class1-math-runtime .px-1\\.5 {\n  padding-inline: calc(var(--spacing) * 1.5);\n}\n#class1-math-runtime .px-2 {\n  padding-inline: calc(var(--spacing) * 2);\n}\n#class1-math-runtime .px-2\\.5 {\n  padding-inline: calc(var(--spacing) * 2.5);\n}\n#class1-math-runtime .px-3 {\n  padding-inline: calc(var(--spacing) * 3);\n}\n#class1-math-runtime .px-3\\.5 {\n  padding-inline: calc(var(--spacing) * 3.5);\n}\n#class1-math-runtime .px-4 {\n  padding-inline: calc(var(--spacing) * 4);\n}\n#class1-math-runtime .px-5 {\n  padding-inline: calc(var(--spacing) * 5);\n}\n#class1-math-runtime .px-6 {\n  padding-inline: calc(var(--spacing) * 6);\n}\n#class1-math-runtime .px-8 {\n  padding-inline: calc(var(--spacing) * 8);\n}\n#class1-math-runtime .py-0\\.5 {\n  padding-block: calc(var(--spacing) * 0.5);\n}\n#class1-math-runtime .py-1 {\n  padding-block: calc(var(--spacing) * 1);\n}\n#class1-math-runtime .py-1\\.5 {\n  padding-block: calc(var(--spacing) * 1.5);\n}\n#class1-math-runtime .py-2 {\n  padding-block: calc(var(--spacing) * 2);\n}\n#class1-math-runtime .py-2\\.5 {\n  padding-block: calc(var(--spacing) * 2.5);\n}\n#class1-math-runtime .py-3 {\n  padding-block: calc(var(--spacing) * 3);\n}\n#class1-math-runtime .py-3\\.5 {\n  padding-block: calc(var(--spacing) * 3.5);\n}\n#class1-math-runtime .py-4 {\n  padding-block: calc(var(--spacing) * 4);\n}\n#class1-math-runtime .py-5 {\n  padding-block: calc(var(--spacing) * 5);\n}\n#class1-math-runtime .py-6 {\n  padding-block: calc(var(--spacing) * 6);\n}\n#class1-math-runtime .py-8 {\n  padding-block: calc(var(--spacing) * 8);\n}\n#class1-math-runtime .py-14 {\n  padding-block: calc(var(--spacing) * 14);\n}\n#class1-math-runtime .py-16 {\n  padding-block: calc(var(--spacing) * 16);\n}\n#class1-math-runtime .pt-0 {\n  padding-top: calc(var(--spacing) * 0);\n}\n#class1-math-runtime .pt-0\\.5 {\n  padding-top: calc(var(--spacing) * 0.5);\n}\n#class1-math-runtime .pt-1 {\n  padding-top: calc(var(--spacing) * 1);\n}\n#class1-math-runtime .pt-2 {\n  padding-top: calc(var(--spacing) * 2);\n}\n#class1-math-runtime .pt-3 {\n  padding-top: calc(var(--spacing) * 3);\n}\n#class1-math-runtime .pt-4 {\n  padding-top: calc(var(--spacing) * 4);\n}\n#class1-math-runtime .pt-5 {\n  padding-top: calc(var(--spacing) * 5);\n}\n#class1-math-runtime .pr-3 {\n  padding-right: calc(var(--spacing) * 3);\n}\n#class1-math-runtime .pr-4 {\n  padding-right: calc(var(--spacing) * 4);\n}\n#class1-math-runtime .pb-1 {\n  padding-bottom: calc(var(--spacing) * 1);\n}\n#class1-math-runtime .pb-1\\.5 {\n  padding-bottom: calc(var(--spacing) * 1.5);\n}\n#class1-math-runtime .pb-2 {\n  padding-bottom: calc(var(--spacing) * 2);\n}\n#class1-math-runtime .pb-4 {\n  padding-bottom: calc(var(--spacing) * 4);\n}\n#class1-math-runtime .pb-\\[4px\\] {\n  padding-bottom: 4px;\n}\n#class1-math-runtime .pb-\\[5px\\] {\n  padding-bottom: 5px;\n}\n#class1-math-runtime .pl-4 {\n  padding-left: calc(var(--spacing) * 4);\n}\n#class1-math-runtime .pl-5 {\n  padding-left: calc(var(--spacing) * 5);\n}\n#class1-math-runtime .pl-10 {\n  padding-left: calc(var(--spacing) * 10);\n}\n#class1-math-runtime .pl-11 {\n  padding-left: calc(var(--spacing) * 11);\n}\n#class1-math-runtime .text-center {\n  text-align: center;\n}\n#class1-math-runtime .text-left {\n  text-align: left;\n}\n#class1-math-runtime .text-right {\n  text-align: right;\n}\n#class1-math-runtime .align-middle {\n  vertical-align: middle;\n}\n#class1-math-runtime .text-2xl {\n  font-size: var(--text-2xl);\n  line-height: var(--tw-leading, var(--text-2xl--line-height));\n}\n#class1-math-runtime .text-3xl {\n  font-size: var(--text-3xl);\n  line-height: var(--tw-leading, var(--text-3xl--line-height));\n}\n#class1-math-runtime .text-4xl {\n  font-size: var(--text-4xl);\n  line-height: var(--tw-leading, var(--text-4xl--line-height));\n}\n#class1-math-runtime .text-5xl {\n  font-size: var(--text-5xl);\n  line-height: var(--tw-leading, var(--text-5xl--line-height));\n}\n#class1-math-runtime .text-6xl {\n  font-size: var(--text-6xl);\n  line-height: var(--tw-leading, var(--text-6xl--line-height));\n}\n#class1-math-runtime .text-7xl {\n  font-size: var(--text-7xl);\n  line-height: var(--tw-leading, var(--text-7xl--line-height));\n}\n#class1-math-runtime .text-8xl {\n  font-size: var(--text-8xl);\n  line-height: var(--tw-leading, var(--text-8xl--line-height));\n}\n#class1-math-runtime .text-base {\n  font-size: var(--text-base);\n  line-height: var(--tw-leading, var(--text-base--line-height));\n}\n#class1-math-runtime .text-lg {\n  font-size: var(--text-lg);\n  line-height: var(--tw-leading, var(--text-lg--line-height));\n}\n#class1-math-runtime .text-sm {\n  font-size: var(--text-sm);\n  line-height: var(--tw-leading, var(--text-sm--line-height));\n}\n#class1-math-runtime .text-xl {\n  font-size: var(--text-xl);\n  line-height: var(--tw-leading, var(--text-xl--line-height));\n}\n#class1-math-runtime .text-xs {\n  font-size: var(--text-xs);\n  line-height: var(--tw-leading, var(--text-xs--line-height));\n}\n#class1-math-runtime .text-\\[9px\\] {\n  font-size: 16px;\n}\n#class1-math-runtime .text-\\[10px\\] {\n  font-size: 16px;\n}\n#class1-math-runtime .text-\\[11px\\] {\n  font-size: 16px;\n}\n#class1-math-runtime .text-\\[12px\\] {\n  font-size: 16px;\n}\n#class1-math-runtime .text-\\[13px\\] {\n  font-size: 16px;\n}\n#class1-math-runtime .text-\\[17px\\] {\n  font-size: 17px;\n}\n#class1-math-runtime .text-\\[24px\\] {\n  font-size: 24px;\n}\n#class1-math-runtime .text-\\[26px\\] {\n  font-size: 26px;\n}\n#class1-math-runtime .text-\\[27px\\] {\n  font-size: 27px;\n}\n#class1-math-runtime .text-\\[30px\\] {\n  font-size: 30px;\n}\n#class1-math-runtime .text-\\[34px\\] {\n  font-size: 34px;\n}\n#class1-math-runtime .text-\\[38px\\] {\n  font-size: 38px;\n}\n#class1-math-runtime .text-\\[42px\\] {\n  font-size: 42px;\n}\n#class1-math-runtime .text-\\[46px\\] {\n  font-size: 46px;\n}\n#class1-math-runtime .text-\\[52px\\] {\n  font-size: 52px;\n}\n#class1-math-runtime .text-\\[58px\\] {\n  font-size: 58px;\n}\n#class1-math-runtime .text-\\[60px\\] {\n  font-size: 60px;\n}\n#class1-math-runtime .text-\\[64px\\] {\n  font-size: 64px;\n}\n#class1-math-runtime .text-\\[70px\\] {\n  font-size: 70px;\n}\n#class1-math-runtime .text-\\[78px\\] {\n  font-size: 78px;\n}\n#class1-math-runtime .text-\\[82px\\] {\n  font-size: 82px;\n}\n#class1-math-runtime .text-\\[95px\\] {\n  font-size: 95px;\n}\n#class1-math-runtime .text-\\[110px\\] {\n  font-size: 110px;\n}\n#class1-math-runtime .text-\\[120px\\] {\n  font-size: 120px;\n}\n#class1-math-runtime .leading-5 {\n  --tw-leading: calc(var(--spacing) * 5);\n  line-height: calc(var(--spacing) * 5);\n}\n#class1-math-runtime .leading-7 {\n  --tw-leading: calc(var(--spacing) * 7);\n  line-height: calc(var(--spacing) * 7);\n}\n#class1-math-runtime .leading-\\[1\\.7\\] {\n  --tw-leading: 1.7;\n  line-height: 1.7;\n}\n#class1-math-runtime .leading-\\[1\\.22\\] {\n  --tw-leading: 1.22;\n  line-height: 1.22;\n}\n#class1-math-runtime .leading-\\[1\\.24\\] {\n  --tw-leading: 1.24;\n  line-height: 1.24;\n}\n#class1-math-runtime .leading-\\[1\\.25\\] {\n  --tw-leading: 1.25;\n  line-height: 1.25;\n}\n#class1-math-runtime .leading-none {\n  --tw-leading: 1;\n  line-height: 1;\n}\n#class1-math-runtime .leading-normal {\n  --tw-leading: var(--leading-normal);\n  line-height: var(--leading-normal);\n}\n#class1-math-runtime .leading-relaxed {\n  --tw-leading: var(--leading-relaxed);\n  line-height: var(--leading-relaxed);\n}\n#class1-math-runtime .leading-snug {\n  --tw-leading: var(--leading-snug);\n  line-height: var(--leading-snug);\n}\n#class1-math-runtime .leading-tight {\n  --tw-leading: var(--leading-tight);\n  line-height: var(--leading-tight);\n}\n#class1-math-runtime .font-black {\n  --tw-font-weight: var(--font-weight-black);\n  font-weight: var(--font-weight-black);\n}\n#class1-math-runtime .font-bold {\n  --tw-font-weight: var(--font-weight-bold);\n  font-weight: var(--font-weight-bold);\n}\n#class1-math-runtime .font-extrabold {\n  --tw-font-weight: var(--font-weight-extrabold);\n  font-weight: var(--font-weight-extrabold);\n}\n#class1-math-runtime .font-semibold {\n  --tw-font-weight: var(--font-weight-semibold);\n  font-weight: var(--font-weight-semibold);\n}\n#class1-math-runtime .tracking-\\[\\.16em\\] {\n  --tw-tracking: .16em;\n  letter-spacing: .16em;\n}\n#class1-math-runtime .tracking-\\[\\.26em\\] {\n  --tw-tracking: .26em;\n  letter-spacing: .26em;\n}\n#class1-math-runtime .tracking-\\[\\.35em\\] {\n  --tw-tracking: .35em;\n  letter-spacing: .35em;\n}\n#class1-math-runtime .tracking-\\[0\\.06em\\] {\n  --tw-tracking: 0.06em;\n  letter-spacing: 0.06em;\n}\n#class1-math-runtime .tracking-tight {\n  --tw-tracking: var(--tracking-tight);\n  letter-spacing: var(--tracking-tight);\n}\n#class1-math-runtime .tracking-wide {\n  --tw-tracking: var(--tracking-wide);\n  letter-spacing: var(--tracking-wide);\n}\n#class1-math-runtime .tracking-wider {\n  --tw-tracking: var(--tracking-wider);\n  letter-spacing: var(--tracking-wider);\n}\n#class1-math-runtime .break-words {\n  overflow-wrap: break-word;\n}\n#class1-math-runtime .whitespace-nowrap {\n  white-space: nowrap;\n}\n#class1-math-runtime .whitespace-pre-line {\n  white-space: pre-line;\n}\n#class1-math-runtime .text-amber-300 {\n  color: var(--color-amber-300);\n}\n#class1-math-runtime .text-amber-600 {\n  color: var(--color-amber-600);\n}\n#class1-math-runtime .text-amber-700 {\n  color: var(--color-amber-700);\n}\n#class1-math-runtime .text-amber-800 {\n  color: var(--color-amber-800);\n}\n#class1-math-runtime .text-amber-900 {\n  color: var(--color-amber-900);\n}\n#class1-math-runtime .text-amber-950 {\n  color: var(--color-amber-950);\n}\n#class1-math-runtime .text-blue-700 {\n  color: var(--color-blue-700);\n}\n#class1-math-runtime .text-blue-800 {\n  color: var(--color-blue-800);\n}\n#class1-math-runtime .text-cyan-500 {\n  color: var(--color-cyan-500);\n}\n#class1-math-runtime .text-cyan-600 {\n  color: var(--color-cyan-600);\n}\n#class1-math-runtime .text-cyan-700 {\n  color: var(--color-cyan-700);\n}\n#class1-math-runtime .text-cyan-800 {\n  color: var(--color-cyan-800);\n}\n#class1-math-runtime .text-emerald-300 {\n  color: var(--color-emerald-300);\n}\n#class1-math-runtime .text-emerald-500 {\n  color: var(--color-emerald-500);\n}\n#class1-math-runtime .text-emerald-600 {\n  color: var(--color-emerald-600);\n}\n#class1-math-runtime .text-emerald-700 {\n  color: var(--color-emerald-700);\n}\n#class1-math-runtime .text-emerald-800 {\n  color: var(--color-emerald-800);\n}\n#class1-math-runtime .text-emerald-900 {\n  color: var(--color-emerald-900);\n}\n#class1-math-runtime .text-fuchsia-500 {\n  color: var(--color-fuchsia-500);\n}\n#class1-math-runtime .text-fuchsia-600 {\n  color: var(--color-fuchsia-600);\n}\n#class1-math-runtime .text-fuchsia-700 {\n  color: var(--color-fuchsia-700);\n}\n#class1-math-runtime .text-gray-400 {\n  color: var(--color-gray-400);\n}\n#class1-math-runtime .text-gray-500 {\n  color: var(--color-gray-500);\n}\n#class1-math-runtime .text-gray-600 {\n  color: var(--color-gray-600);\n}\n#class1-math-runtime .text-gray-700 {\n  color: var(--color-gray-700);\n}\n#class1-math-runtime .text-gray-800 {\n  color: var(--color-gray-800);\n}\n#class1-math-runtime .text-gray-900 {\n  color: var(--color-gray-900);\n}\n#class1-math-runtime .text-green-800 {\n  color: var(--color-green-800);\n}\n#class1-math-runtime .text-indigo-500 {\n  color: var(--color-indigo-500);\n}\n#class1-math-runtime .text-indigo-600 {\n  color: var(--color-indigo-600);\n}\n#class1-math-runtime .text-indigo-700 {\n  color: var(--color-indigo-700);\n}\n#class1-math-runtime .text-indigo-800 {\n  color: var(--color-indigo-800);\n}\n#class1-math-runtime .text-orange-600 {\n  color: var(--color-orange-600);\n}\n#class1-math-runtime .text-pink-200 {\n  color: var(--color-pink-200);\n}\n#class1-math-runtime .text-pink-300 {\n  color: var(--color-pink-300);\n}\n#class1-math-runtime .text-pink-400 {\n  color: var(--color-pink-400);\n}\n#class1-math-runtime .text-pink-500 {\n  color: var(--color-pink-500);\n}\n#class1-math-runtime .text-pink-600 {\n  color: var(--color-pink-600);\n}\n#class1-math-runtime .text-pink-700 {\n  color: var(--color-pink-700);\n}\n#class1-math-runtime .text-pink-800 {\n  color: var(--color-pink-800);\n}\n#class1-math-runtime .text-pink-950 {\n  color: var(--color-pink-950);\n}\n#class1-math-runtime .text-purple-400 {\n  color: var(--color-purple-400);\n}\n#class1-math-runtime .text-purple-500 {\n  color: var(--color-purple-500);\n}\n#class1-math-runtime .text-purple-600 {\n  color: var(--color-purple-600);\n}\n#class1-math-runtime .text-purple-700 {\n  color: var(--color-purple-700);\n}\n#class1-math-runtime .text-purple-800 {\n  color: var(--color-purple-800);\n}\n#class1-math-runtime .text-red-500 {\n  color: var(--color-red-500);\n}\n#class1-math-runtime .text-red-800 {\n  color: var(--color-red-800);\n}\n#class1-math-runtime .text-red-900 {\n  color: var(--color-red-900);\n}\n#class1-math-runtime .text-rose-400 {\n  color: var(--color-rose-400);\n}\n#class1-math-runtime .text-rose-500 {\n  color: var(--color-rose-500);\n}\n#class1-math-runtime .text-rose-600 {\n  color: var(--color-rose-600);\n}\n#class1-math-runtime .text-rose-700 {\n  color: var(--color-rose-700);\n}\n#class1-math-runtime .text-rose-800 {\n  color: var(--color-rose-800);\n}\n#class1-math-runtime .text-sky-600 {\n  color: var(--color-sky-600);\n}\n#class1-math-runtime .text-sky-700 {\n  color: var(--color-sky-700);\n}\n#class1-math-runtime .text-slate-200 {\n  color: var(--color-slate-200);\n}\n#class1-math-runtime .text-slate-300 {\n  color: var(--color-slate-300);\n}\n#class1-math-runtime .text-slate-400 {\n  color: var(--color-slate-400);\n}\n#class1-math-runtime .text-slate-500 {\n  color: var(--color-slate-500);\n}\n#class1-math-runtime .text-slate-600 {\n  color: var(--color-slate-600);\n}\n#class1-math-runtime .text-slate-700 {\n  color: var(--color-slate-700);\n}\n#class1-math-runtime .text-slate-800 {\n  color: var(--color-slate-800);\n}\n#class1-math-runtime .text-slate-900 {\n  color: var(--color-slate-900);\n}\n#class1-math-runtime .text-teal-600 {\n  color: var(--color-teal-600);\n}\n#class1-math-runtime .text-transparent {\n  color: transparent;\n}\n#class1-math-runtime .text-violet-200 {\n  color: var(--color-violet-200);\n}\n#class1-math-runtime .text-violet-500 {\n  color: var(--color-violet-500);\n}\n#class1-math-runtime .text-violet-600 {\n  color: var(--color-violet-600);\n}\n#class1-math-runtime .text-violet-700 {\n  color: var(--color-violet-700);\n}\n#class1-math-runtime .text-violet-800 {\n  color: var(--color-violet-800);\n}\n#class1-math-runtime .text-white {\n  color: var(--color-white);\n}\n#class1-math-runtime .uppercase {\n  text-transform: uppercase;\n}\n#class1-math-runtime .underline {\n  text-decoration-line: underline;\n}\n#class1-math-runtime .decoration-4 {\n  text-decoration-thickness: 4px;\n}\n#class1-math-runtime .underline-offset-8 {\n  text-underline-offset: 8px;\n}\n#class1-math-runtime .placeholder-gray-300 {\n  #class1-math-runtime &::placeholder {\n    color: var(--color-gray-300);\n  }\n}\n#class1-math-runtime .accent-emerald-500 {\n  accent-color: var(--color-emerald-500);\n}\n#class1-math-runtime .opacity-0 {\n  opacity: 0%;\n}\n#class1-math-runtime .opacity-25 {\n  opacity: 25%;\n}\n#class1-math-runtime .opacity-30 {\n  opacity: 30%;\n}\n#class1-math-runtime .opacity-40 {\n  opacity: 40%;\n}\n#class1-math-runtime .opacity-45 {\n  opacity: 45%;\n}\n#class1-math-runtime .opacity-60 {\n  opacity: 60%;\n}\n#class1-math-runtime .opacity-70 {\n  opacity: 70%;\n}\n#class1-math-runtime .opacity-75 {\n  opacity: 75%;\n}\n#class1-math-runtime .opacity-80 {\n  opacity: 80%;\n}\n#class1-math-runtime .shadow {\n  --tw-shadow: 0 1px 3px 0 var(--tw-shadow-color, rgb(0 0 0 / 0.1)), 0 1px 2px -1px var(--tw-shadow-color, rgb(0 0 0 / 0.1));\n  box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);\n}\n#class1-math-runtime .shadow-2xl {\n  --tw-shadow: 0 25px 50px -12px var(--tw-shadow-color, rgb(0 0 0 / 0.25));\n  box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);\n}\n#class1-math-runtime .shadow-inner {\n  --tw-shadow: inset 0 2px 4px 0 var(--tw-shadow-color, rgb(0 0 0 / 0.05));\n  box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);\n}\n#class1-math-runtime .shadow-md {\n  --tw-shadow: 0 4px 6px -1px var(--tw-shadow-color, rgb(0 0 0 / 0.1)), 0 2px 4px -2px var(--tw-shadow-color, rgb(0 0 0 / 0.1));\n  box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);\n}\n#class1-math-runtime .shadow-sm {\n  --tw-shadow: 0 1px 3px 0 var(--tw-shadow-color, rgb(0 0 0 / 0.1)), 0 1px 2px -1px var(--tw-shadow-color, rgb(0 0 0 / 0.1));\n  box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);\n}\n#class1-math-runtime .shadow-xl {\n  --tw-shadow: 0 20px 25px -5px var(--tw-shadow-color, rgb(0 0 0 / 0.1)), 0 8px 10px -6px var(--tw-shadow-color, rgb(0 0 0 / 0.1));\n  box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);\n}\n#class1-math-runtime .shadow-xs {\n  --tw-shadow: 0 1px 2px 0 var(--tw-shadow-color, rgb(0 0 0 / 0.05));\n  box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);\n}\n#class1-math-runtime .ring {\n  --tw-ring-shadow: var(--tw-ring-inset,) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color, currentcolor);\n  box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);\n}\n#class1-math-runtime .ring-2 {\n  --tw-ring-shadow: var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color, currentcolor);\n  box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);\n}\n#class1-math-runtime .ring-4 {\n  --tw-ring-shadow: var(--tw-ring-inset,) 0 0 0 calc(4px + var(--tw-ring-offset-width)) var(--tw-ring-color, currentcolor);\n  box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);\n}\n#class1-math-runtime .ring-amber-200 {\n  --tw-ring-color: var(--color-amber-200);\n}\n#class1-math-runtime .ring-amber-300 {\n  --tw-ring-color: var(--color-amber-300);\n}\n#class1-math-runtime .ring-emerald-200 {\n  --tw-ring-color: var(--color-emerald-200);\n}\n#class1-math-runtime .ring-pink-200 {\n  --tw-ring-color: var(--color-pink-200);\n}\n#class1-math-runtime .ring-purple-200 {\n  --tw-ring-color: var(--color-purple-200);\n}\n#class1-math-runtime .ring-rose-200 {\n  --tw-ring-color: var(--color-rose-200);\n}\n#class1-math-runtime .ring-violet-200 {\n  --tw-ring-color: var(--color-violet-200);\n}\n#class1-math-runtime .grayscale-\\[25\\%\\] {\n  --tw-grayscale: grayscale(25%);\n  filter: var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,);\n}\n#class1-math-runtime .filter {\n  filter: var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,);\n}\n#class1-math-runtime .backdrop-blur-md {\n  --tw-backdrop-blur: blur(var(--blur-md));\n  -webkit-backdrop-filter: var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);\n  backdrop-filter: var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);\n}\n#class1-math-runtime .backdrop-blur-sm {\n  --tw-backdrop-blur: blur(var(--blur-sm));\n  -webkit-backdrop-filter: var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);\n  backdrop-filter: var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);\n}\n#class1-math-runtime .backdrop-blur-xs {\n  --tw-backdrop-blur: blur(var(--blur-xs));\n  -webkit-backdrop-filter: var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);\n  backdrop-filter: var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);\n}\n#class1-math-runtime .transition-all {\n  transition-property: all;\n  transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));\n  transition-duration: var(--tw-duration, var(--default-transition-duration));\n}\n#class1-math-runtime .transition-colors {\n  transition-property: color, background-color, border-color, outline-color, text-decoration-color, fill, stroke, --tw-gradient-from, --tw-gradient-via, --tw-gradient-to;\n  transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));\n  transition-duration: var(--tw-duration, var(--default-transition-duration));\n}\n#class1-math-runtime .transition-shadow {\n  transition-property: box-shadow;\n  transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));\n  transition-duration: var(--tw-duration, var(--default-transition-duration));\n}\n#class1-math-runtime .transition-transform {\n  transition-property: transform, translate, scale, rotate;\n  transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));\n  transition-duration: var(--tw-duration, var(--default-transition-duration));\n}\n#class1-math-runtime .duration-150 {\n  --tw-duration: 150ms;\n  transition-duration: 150ms;\n}\n#class1-math-runtime .duration-200 {\n  --tw-duration: 200ms;\n  transition-duration: 200ms;\n}\n#class1-math-runtime .duration-500 {\n  --tw-duration: 500ms;\n  transition-duration: 500ms;\n}\n#class1-math-runtime .ease-in-out {\n  --tw-ease: var(--ease-in-out);\n  transition-timing-function: var(--ease-in-out);\n}\n#class1-math-runtime .outline-none {\n  --tw-outline-style: none;\n  outline-style: none;\n}\n#class1-math-runtime .select-none {\n  -webkit-user-select: none;\n  user-select: none;\n}\n#class1-math-runtime .select-text {\n  -webkit-user-select: text;\n  user-select: text;\n}\n#class1-math-runtime .group-hover\\:scale-110 {\n  #class1-math-runtime &:is(:where(.group):hover *) {\n    @media (hover: hover) {\n      --tw-scale-x: 110%;\n      --tw-scale-y: 110%;\n      --tw-scale-z: 110%;\n      scale: var(--tw-scale-x) var(--tw-scale-y);\n    }\n  }\n}\n#class1-math-runtime .last\\:border-b-0 {\n  #class1-math-runtime &:last-child {\n    border-bottom-style: var(--tw-border-style);\n    border-bottom-width: 0px;\n  }\n}\n#class1-math-runtime .hover\\:-translate-y-0\\.5 {\n  #class1-math-runtime &:hover {\n    @media (hover: hover) {\n      --tw-translate-y: calc(var(--spacing) * -0.5);\n      translate: var(--tw-translate-x) var(--tw-translate-y);\n    }\n  }\n}\n#class1-math-runtime .hover\\:scale-105 {\n  #class1-math-runtime &:hover {\n    @media (hover: hover) {\n      --tw-scale-x: 105%;\n      --tw-scale-y: 105%;\n      --tw-scale-z: 105%;\n      scale: var(--tw-scale-x) var(--tw-scale-y);\n    }\n  }\n}\n#class1-math-runtime .hover\\:scale-\\[1\\.02\\] {\n  #class1-math-runtime &:hover {\n    @media (hover: hover) {\n      scale: 1.02;\n    }\n  }\n}\n#class1-math-runtime .hover\\:scale-\\[1\\.03\\] {\n  #class1-math-runtime &:hover {\n    @media (hover: hover) {\n      scale: 1.03;\n    }\n  }\n}\n#class1-math-runtime .hover\\:border-emerald-400 {\n  #class1-math-runtime &:hover {\n    @media (hover: hover) {\n      border-color: var(--color-emerald-400);\n    }\n  }\n}\n#class1-math-runtime .hover\\:border-fuchsia-400 {\n  #class1-math-runtime &:hover {\n    @media (hover: hover) {\n      border-color: var(--color-fuchsia-400);\n    }\n  }\n}\n#class1-math-runtime .hover\\:border-pink-400 {\n  #class1-math-runtime &:hover {\n    @media (hover: hover) {\n      border-color: var(--color-pink-400);\n    }\n  }\n}\n#class1-math-runtime .hover\\:border-purple-400 {\n  #class1-math-runtime &:hover {\n    @media (hover: hover) {\n      border-color: var(--color-purple-400);\n    }\n  }\n}\n#class1-math-runtime .hover\\:border-rose-400 {\n  #class1-math-runtime &:hover {\n    @media (hover: hover) {\n      border-color: var(--color-rose-400);\n    }\n  }\n}\n#class1-math-runtime .hover\\:border-violet-400 {\n  #class1-math-runtime &:hover {\n    @media (hover: hover) {\n      border-color: var(--color-violet-400);\n    }\n  }\n}\n#class1-math-runtime .hover\\:bg-amber-50 {\n  #class1-math-runtime &:hover {\n    @media (hover: hover) {\n      background-color: var(--color-amber-50);\n    }\n  }\n}\n#class1-math-runtime .hover\\:bg-amber-50\\/30 {\n  #class1-math-runtime &:hover {\n    @media (hover: hover) {\n      background-color: color-mix(in srgb, oklch(98.7% 0.022 95.277) 30%, transparent);\n      @supports (color: color-mix(in lab, red, red)) {\n        background-color: color-mix(in oklab, var(--color-amber-50) 30%, transparent);\n      }\n    }\n  }\n}\n#class1-math-runtime .hover\\:bg-amber-100 {\n  #class1-math-runtime &:hover {\n    @media (hover: hover) {\n      background-color: var(--color-amber-100);\n    }\n  }\n}\n#class1-math-runtime .hover\\:bg-amber-100\\/80 {\n  #class1-math-runtime &:hover {\n    @media (hover: hover) {\n      background-color: color-mix(in srgb, oklch(96.2% 0.059 95.617) 80%, transparent);\n      @supports (color: color-mix(in lab, red, red)) {\n        background-color: color-mix(in oklab, var(--color-amber-100) 80%, transparent);\n      }\n    }\n  }\n}\n#class1-math-runtime .hover\\:bg-amber-200 {\n  #class1-math-runtime &:hover {\n    @media (hover: hover) {\n      background-color: var(--color-amber-200);\n    }\n  }\n}\n#class1-math-runtime .hover\\:bg-amber-600 {\n  #class1-math-runtime &:hover {\n    @media (hover: hover) {\n      background-color: var(--color-amber-600);\n    }\n  }\n}\n#class1-math-runtime .hover\\:bg-blue-100 {\n  #class1-math-runtime &:hover {\n    @media (hover: hover) {\n      background-color: var(--color-blue-100);\n    }\n  }\n}\n#class1-math-runtime .hover\\:bg-cyan-100\\/70 {\n  #class1-math-runtime &:hover {\n    @media (hover: hover) {\n      background-color: color-mix(in srgb, oklch(95.6% 0.045 203.388) 70%, transparent);\n      @supports (color: color-mix(in lab, red, red)) {\n        background-color: color-mix(in oklab, var(--color-cyan-100) 70%, transparent);\n      }\n    }\n  }\n}\n#class1-math-runtime .hover\\:bg-emerald-50 {\n  #class1-math-runtime &:hover {\n    @media (hover: hover) {\n      background-color: var(--color-emerald-50);\n    }\n  }\n}\n#class1-math-runtime .hover\\:bg-emerald-100 {\n  #class1-math-runtime &:hover {\n    @media (hover: hover) {\n      background-color: var(--color-emerald-100);\n    }\n  }\n}\n#class1-math-runtime .hover\\:bg-emerald-100\\/80 {\n  #class1-math-runtime &:hover {\n    @media (hover: hover) {\n      background-color: color-mix(in srgb, oklch(95% 0.052 163.051) 80%, transparent);\n      @supports (color: color-mix(in lab, red, red)) {\n        background-color: color-mix(in oklab, var(--color-emerald-100) 80%, transparent);\n      }\n    }\n  }\n}\n#class1-math-runtime .hover\\:bg-emerald-500 {\n  #class1-math-runtime &:hover {\n    @media (hover: hover) {\n      background-color: var(--color-emerald-500);\n    }\n  }\n}\n#class1-math-runtime .hover\\:bg-emerald-600 {\n  #class1-math-runtime &:hover {\n    @media (hover: hover) {\n      background-color: var(--color-emerald-600);\n    }\n  }\n}\n#class1-math-runtime .hover\\:bg-emerald-700 {\n  #class1-math-runtime &:hover {\n    @media (hover: hover) {\n      background-color: var(--color-emerald-700);\n    }\n  }\n}\n#class1-math-runtime .hover\\:bg-gray-200 {\n  #class1-math-runtime &:hover {\n    @media (hover: hover) {\n      background-color: var(--color-gray-200);\n    }\n  }\n}\n#class1-math-runtime .hover\\:bg-indigo-100 {\n  #class1-math-runtime &:hover {\n    @media (hover: hover) {\n      background-color: var(--color-indigo-100);\n    }\n  }\n}\n#class1-math-runtime .hover\\:bg-pink-50 {\n  #class1-math-runtime &:hover {\n    @media (hover: hover) {\n      background-color: var(--color-pink-50);\n    }\n  }\n}\n#class1-math-runtime .hover\\:bg-pink-50\\/30 {\n  #class1-math-runtime &:hover {\n    @media (hover: hover) {\n      background-color: color-mix(in srgb, oklch(97.1% 0.014 343.198) 30%, transparent);\n      @supports (color: color-mix(in lab, red, red)) {\n        background-color: color-mix(in oklab, var(--color-pink-50) 30%, transparent);\n      }\n    }\n  }\n}\n#class1-math-runtime .hover\\:bg-pink-50\\/50 {\n  #class1-math-runtime &:hover {\n    @media (hover: hover) {\n      background-color: color-mix(in srgb, oklch(97.1% 0.014 343.198) 50%, transparent);\n      @supports (color: color-mix(in lab, red, red)) {\n        background-color: color-mix(in oklab, var(--color-pink-50) 50%, transparent);\n      }\n    }\n  }\n}\n#class1-math-runtime .hover\\:bg-pink-100 {\n  #class1-math-runtime &:hover {\n    @media (hover: hover) {\n      background-color: var(--color-pink-100);\n    }\n  }\n}\n#class1-math-runtime .hover\\:bg-pink-100\\/70 {\n  #class1-math-runtime &:hover {\n    @media (hover: hover) {\n      background-color: color-mix(in srgb, oklch(94.8% 0.028 342.258) 70%, transparent);\n      @supports (color: color-mix(in lab, red, red)) {\n        background-color: color-mix(in oklab, var(--color-pink-100) 70%, transparent);\n      }\n    }\n  }\n}\n#class1-math-runtime .hover\\:bg-pink-100\\/80 {\n  #class1-math-runtime &:hover {\n    @media (hover: hover) {\n      background-color: color-mix(in srgb, oklch(94.8% 0.028 342.258) 80%, transparent);\n      @supports (color: color-mix(in lab, red, red)) {\n        background-color: color-mix(in oklab, var(--color-pink-100) 80%, transparent);\n      }\n    }\n  }\n}\n#class1-math-runtime .hover\\:bg-purple-50 {\n  #class1-math-runtime &:hover {\n    @media (hover: hover) {\n      background-color: var(--color-purple-50);\n    }\n  }\n}\n#class1-math-runtime .hover\\:bg-purple-100 {\n  #class1-math-runtime &:hover {\n    @media (hover: hover) {\n      background-color: var(--color-purple-100);\n    }\n  }\n}\n#class1-math-runtime .hover\\:bg-purple-200 {\n  #class1-math-runtime &:hover {\n    @media (hover: hover) {\n      background-color: var(--color-purple-200);\n    }\n  }\n}\n#class1-math-runtime .hover\\:bg-red-300 {\n  #class1-math-runtime &:hover {\n    @media (hover: hover) {\n      background-color: var(--color-red-300);\n    }\n  }\n}\n#class1-math-runtime .hover\\:bg-rose-100 {\n  #class1-math-runtime &:hover {\n    @media (hover: hover) {\n      background-color: var(--color-rose-100);\n    }\n  }\n}\n#class1-math-runtime .hover\\:bg-rose-200 {\n  #class1-math-runtime &:hover {\n    @media (hover: hover) {\n      background-color: var(--color-rose-200);\n    }\n  }\n}\n#class1-math-runtime .hover\\:bg-sky-100 {\n  #class1-math-runtime &:hover {\n    @media (hover: hover) {\n      background-color: var(--color-sky-100);\n    }\n  }\n}\n#class1-math-runtime .hover\\:bg-sky-100\\/80 {\n  #class1-math-runtime &:hover {\n    @media (hover: hover) {\n      background-color: color-mix(in srgb, oklch(95.1% 0.026 236.824) 80%, transparent);\n      @supports (color: color-mix(in lab, red, red)) {\n        background-color: color-mix(in oklab, var(--color-sky-100) 80%, transparent);\n      }\n    }\n  }\n}\n#class1-math-runtime .hover\\:bg-slate-200 {\n  #class1-math-runtime &:hover {\n    @media (hover: hover) {\n      background-color: var(--color-slate-200);\n    }\n  }\n}\n#class1-math-runtime .hover\\:bg-slate-900 {\n  #class1-math-runtime &:hover {\n    @media (hover: hover) {\n      background-color: var(--color-slate-900);\n    }\n  }\n}\n#class1-math-runtime .hover\\:bg-violet-50 {\n  #class1-math-runtime &:hover {\n    @media (hover: hover) {\n      background-color: var(--color-violet-50);\n    }\n  }\n}\n#class1-math-runtime .hover\\:bg-violet-100 {\n  #class1-math-runtime &:hover {\n    @media (hover: hover) {\n      background-color: var(--color-violet-100);\n    }\n  }\n}\n#class1-math-runtime .hover\\:from-pink-200 {\n  #class1-math-runtime &:hover {\n    @media (hover: hover) {\n      --tw-gradient-from: var(--color-pink-200);\n      --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n    }\n  }\n}\n#class1-math-runtime .hover\\:from-pink-600 {\n  #class1-math-runtime &:hover {\n    @media (hover: hover) {\n      --tw-gradient-from: var(--color-pink-600);\n      --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n    }\n  }\n}\n#class1-math-runtime .hover\\:from-rose-700 {\n  #class1-math-runtime &:hover {\n    @media (hover: hover) {\n      --tw-gradient-from: var(--color-rose-700);\n      --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n    }\n  }\n}\n#class1-math-runtime .hover\\:to-purple-200 {\n  #class1-math-runtime &:hover {\n    @media (hover: hover) {\n      --tw-gradient-to: var(--color-purple-200);\n      --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n    }\n  }\n}\n#class1-math-runtime .hover\\:to-red-700 {\n  #class1-math-runtime &:hover {\n    @media (hover: hover) {\n      --tw-gradient-to: var(--color-red-700);\n      --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n    }\n  }\n}\n#class1-math-runtime .hover\\:to-rose-600 {\n  #class1-math-runtime &:hover {\n    @media (hover: hover) {\n      --tw-gradient-to: var(--color-rose-600);\n      --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n    }\n  }\n}\n#class1-math-runtime .hover\\:text-rose-500 {\n  #class1-math-runtime &:hover {\n    @media (hover: hover) {\n      color: var(--color-rose-500);\n    }\n  }\n}\n#class1-math-runtime .hover\\:text-rose-600 {\n  #class1-math-runtime &:hover {\n    @media (hover: hover) {\n      color: var(--color-rose-600);\n    }\n  }\n}\n#class1-math-runtime .hover\\:text-slate-700 {\n  #class1-math-runtime &:hover {\n    @media (hover: hover) {\n      color: var(--color-slate-700);\n    }\n  }\n}\n#class1-math-runtime .hover\\:opacity-100 {\n  #class1-math-runtime &:hover {\n    @media (hover: hover) {\n      opacity: 100%;\n    }\n  }\n}\n#class1-math-runtime .hover\\:shadow-\\[0_0_10px_rgba\\(99\\,102\\,241\\,0\\.5\\)\\] {\n  #class1-math-runtime &:hover {\n    @media (hover: hover) {\n      --tw-shadow: 0 0 10px var(--tw-shadow-color, rgba(99,102,241,0.5));\n      box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);\n    }\n  }\n}\n#class1-math-runtime .hover\\:shadow-\\[0_0_18px_rgba\\(244\\,114\\,182\\,0\\.65\\)\\] {\n  #class1-math-runtime &:hover {\n    @media (hover: hover) {\n      --tw-shadow: 0 0 18px var(--tw-shadow-color, rgba(244,114,182,0.65));\n      box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);\n    }\n  }\n}\n#class1-math-runtime .hover\\:shadow-md {\n  #class1-math-runtime &:hover {\n    @media (hover: hover) {\n      --tw-shadow: 0 4px 6px -1px var(--tw-shadow-color, rgb(0 0 0 / 0.1)), 0 2px 4px -2px var(--tw-shadow-color, rgb(0 0 0 / 0.1));\n      box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);\n    }\n  }\n}\n#class1-math-runtime .hover\\:brightness-105 {\n  #class1-math-runtime &:hover {\n    @media (hover: hover) {\n      --tw-brightness: brightness(105%);\n      filter: var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,);\n    }\n  }\n}\n#class1-math-runtime .focus\\:border-amber-300 {\n  #class1-math-runtime &:focus {\n    border-color: var(--color-amber-300);\n  }\n}\n#class1-math-runtime .focus\\:border-pink-400 {\n  #class1-math-runtime &:focus {\n    border-color: var(--color-pink-400);\n  }\n}\n#class1-math-runtime .focus\\:outline-none {\n  #class1-math-runtime &:focus {\n    --tw-outline-style: none;\n    outline-style: none;\n  }\n}\n#class1-math-runtime .disabled\\:cursor-not-allowed {\n  #class1-math-runtime &:disabled {\n    cursor: not-allowed;\n  }\n}\n#class1-math-runtime .disabled\\:opacity-40 {\n  #class1-math-runtime &:disabled {\n    opacity: 40%;\n  }\n}\n#class1-math-runtime .sm\\:max-w-md {\n  @media (width >= 40rem) {\n    max-width: var(--container-md);\n  }\n}\n#class1-math-runtime .sm\\:grid-cols-2 {\n  @media (width >= 40rem) {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n}\n#class1-math-runtime .sm\\:grid-cols-3 {\n  @media (width >= 40rem) {\n    grid-template-columns: repeat(3, minmax(0, 1fr));\n  }\n}\n#class1-math-runtime .sm\\:flex-row {\n  @media (width >= 40rem) {\n    flex-direction: row;\n  }\n}\n#class1-math-runtime .sm\\:items-center {\n  @media (width >= 40rem) {\n    align-items: center;\n  }\n}\n#class1-math-runtime .sm\\:justify-between {\n  @media (width >= 40rem) {\n    justify-content: space-between;\n  }\n}\n#class1-math-runtime .sm\\:p-4 {\n  @media (width >= 40rem) {\n    padding: calc(var(--spacing) * 4);\n  }\n}\n#class1-math-runtime .sm\\:p-5 {\n  @media (width >= 40rem) {\n    padding: calc(var(--spacing) * 5);\n  }\n}\n#class1-math-runtime .sm\\:p-6 {\n  @media (width >= 40rem) {\n    padding: calc(var(--spacing) * 6);\n  }\n}\n#class1-math-runtime .sm\\:text-3xl {\n  @media (width >= 40rem) {\n    font-size: var(--text-3xl);\n    line-height: var(--tw-leading, var(--text-3xl--line-height));\n  }\n}\n#class1-math-runtime .sm\\:text-base {\n  @media (width >= 40rem) {\n    font-size: var(--text-base);\n    line-height: var(--tw-leading, var(--text-base--line-height));\n  }\n}\n#class1-math-runtime .sm\\:text-lg {\n  @media (width >= 40rem) {\n    font-size: var(--text-lg);\n    line-height: var(--tw-leading, var(--text-lg--line-height));\n  }\n}\n#class1-math-runtime .sm\\:text-sm {\n  @media (width >= 40rem) {\n    font-size: var(--text-sm);\n    line-height: var(--tw-leading, var(--text-sm--line-height));\n  }\n}\n#class1-math-runtime .sm\\:text-xl {\n  @media (width >= 40rem) {\n    font-size: var(--text-xl);\n    line-height: var(--tw-leading, var(--text-xl--line-height));\n  }\n}\n#class1-math-runtime .sm\\:whitespace-nowrap {\n  @media (width >= 40rem) {\n    white-space: nowrap;\n  }\n}\n#class1-math-runtime .md\\:top-\\[98px\\] {\n  @media (width >= 48rem) {\n    top: 98px;\n  }\n}\n#class1-math-runtime .md\\:right-\\[52px\\] {\n  @media (width >= 48rem) {\n    right: 52px;\n  }\n}\n#class1-math-runtime .md\\:right-\\[55px\\] {\n  @media (width >= 48rem) {\n    right: 55px;\n  }\n}\n#class1-math-runtime .md\\:left-\\[52px\\] {\n  @media (width >= 48rem) {\n    left: 52px;\n  }\n}\n#class1-math-runtime .md\\:left-\\[55px\\] {\n  @media (width >= 48rem) {\n    left: 55px;\n  }\n}\n#class1-math-runtime .md\\:col-span-2 {\n  @media (width >= 48rem) {\n    grid-column: span 2 / span 2;\n  }\n}\n#class1-math-runtime .md\\:mr-0\\.5 {\n  @media (width >= 48rem) {\n    margin-right: calc(var(--spacing) * 0.5);\n  }\n}\n#class1-math-runtime .md\\:mr-1 {\n  @media (width >= 48rem) {\n    margin-right: calc(var(--spacing) * 1);\n  }\n}\n#class1-math-runtime .md\\:ml-4 {\n  @media (width >= 48rem) {\n    margin-left: calc(var(--spacing) * 4);\n  }\n}\n#class1-math-runtime .md\\:block {\n  @media (width >= 48rem) {\n    display: block;\n  }\n}\n#class1-math-runtime .md\\:inline {\n  @media (width >= 48rem) {\n    display: inline;\n  }\n}\n#class1-math-runtime .md\\:h-7 {\n  @media (width >= 48rem) {\n    height: calc(var(--spacing) * 7);\n  }\n}\n#class1-math-runtime .md\\:h-9 {\n  @media (width >= 48rem) {\n    height: calc(var(--spacing) * 9);\n  }\n}\n#class1-math-runtime .md\\:h-11 {\n  @media (width >= 48rem) {\n    height: calc(var(--spacing) * 11);\n  }\n}\n#class1-math-runtime .md\\:h-12 {\n  @media (width >= 48rem) {\n    height: calc(var(--spacing) * 12);\n  }\n}\n#class1-math-runtime .md\\:h-14 {\n  @media (width >= 48rem) {\n    height: calc(var(--spacing) * 14);\n  }\n}\n#class1-math-runtime .md\\:h-16 {\n  @media (width >= 48rem) {\n    height: calc(var(--spacing) * 16);\n  }\n}\n#class1-math-runtime .md\\:h-18 {\n  @media (width >= 48rem) {\n    height: calc(var(--spacing) * 18);\n  }\n}\n#class1-math-runtime .md\\:h-\\[58px\\] {\n  @media (width >= 48rem) {\n    height: 58px;\n  }\n}\n#class1-math-runtime .md\\:h-\\[160px\\] {\n  @media (width >= 48rem) {\n    height: 160px;\n  }\n}\n#class1-math-runtime .md\\:h-\\[175px\\] {\n  @media (width >= 48rem) {\n    height: 175px;\n  }\n}\n#class1-math-runtime .md\\:h-\\[230px\\] {\n  @media (width >= 48rem) {\n    height: 230px;\n  }\n}\n#class1-math-runtime .md\\:min-h-\\[56px\\] {\n  @media (width >= 48rem) {\n    min-height: 56px;\n  }\n}\n#class1-math-runtime .md\\:min-h-\\[58px\\] {\n  @media (width >= 48rem) {\n    min-height: 58px;\n  }\n}\n#class1-math-runtime .md\\:min-h-\\[62px\\] {\n  @media (width >= 48rem) {\n    min-height: 62px;\n  }\n}\n#class1-math-runtime .md\\:min-h-\\[68px\\] {\n  @media (width >= 48rem) {\n    min-height: 68px;\n  }\n}\n#class1-math-runtime .md\\:min-h-\\[72px\\] {\n  @media (width >= 48rem) {\n    min-height: 72px;\n  }\n}\n#class1-math-runtime .md\\:min-h-\\[76px\\] {\n  @media (width >= 48rem) {\n    min-height: 76px;\n  }\n}\n#class1-math-runtime .md\\:min-h-\\[84px\\] {\n  @media (width >= 48rem) {\n    min-height: 84px;\n  }\n}\n#class1-math-runtime .md\\:min-h-\\[142px\\] {\n  @media (width >= 48rem) {\n    min-height: 142px;\n  }\n}\n#class1-math-runtime .md\\:min-h-\\[210px\\] {\n  @media (width >= 48rem) {\n    min-height: 210px;\n  }\n}\n#class1-math-runtime .md\\:min-h-\\[300px\\] {\n  @media (width >= 48rem) {\n    min-height: 300px;\n  }\n}\n#class1-math-runtime .md\\:min-h-\\[360px\\] {\n  @media (width >= 48rem) {\n    min-height: 360px;\n  }\n}\n#class1-math-runtime .md\\:min-h-\\[430px\\] {\n  @media (width >= 48rem) {\n    min-height: 430px;\n  }\n}\n#class1-math-runtime .md\\:min-h-\\[440px\\] {\n  @media (width >= 48rem) {\n    min-height: 440px;\n  }\n}\n#class1-math-runtime .md\\:min-h-\\[445px\\] {\n  @media (width >= 48rem) {\n    min-height: 445px;\n  }\n}\n#class1-math-runtime .md\\:min-h-\\[470px\\] {\n  @media (width >= 48rem) {\n    min-height: 470px;\n  }\n}\n#class1-math-runtime .md\\:w-7 {\n  @media (width >= 48rem) {\n    width: calc(var(--spacing) * 7);\n  }\n}\n#class1-math-runtime .md\\:w-9 {\n  @media (width >= 48rem) {\n    width: calc(var(--spacing) * 9);\n  }\n}\n#class1-math-runtime .md\\:w-11 {\n  @media (width >= 48rem) {\n    width: calc(var(--spacing) * 11);\n  }\n}\n#class1-math-runtime .md\\:w-12 {\n  @media (width >= 48rem) {\n    width: calc(var(--spacing) * 12);\n  }\n}\n#class1-math-runtime .md\\:w-14 {\n  @media (width >= 48rem) {\n    width: calc(var(--spacing) * 14);\n  }\n}\n#class1-math-runtime .md\\:w-16 {\n  @media (width >= 48rem) {\n    width: calc(var(--spacing) * 16);\n  }\n}\n#class1-math-runtime .md\\:w-24 {\n  @media (width >= 48rem) {\n    width: calc(var(--spacing) * 24);\n  }\n}\n#class1-math-runtime .md\\:w-\\[40\\%\\] {\n  @media (width >= 48rem) {\n    width: 40%;\n  }\n}\n#class1-math-runtime .md\\:w-\\[60\\%\\] {\n  @media (width >= 48rem) {\n    width: 60%;\n  }\n}\n#class1-math-runtime .md\\:w-\\[160px\\] {\n  @media (width >= 48rem) {\n    width: 160px;\n  }\n}\n#class1-math-runtime .md\\:w-\\[250px\\] {\n  @media (width >= 48rem) {\n    width: 250px;\n  }\n}\n#class1-math-runtime .md\\:w-\\[300px\\] {\n  @media (width >= 48rem) {\n    width: 300px;\n  }\n}\n#class1-math-runtime .md\\:min-w-\\[92px\\] {\n  @media (width >= 48rem) {\n    min-width: 92px;\n  }\n}\n#class1-math-runtime .md\\:min-w-\\[210px\\] {\n  @media (width >= 48rem) {\n    min-width: 210px;\n  }\n}\n#class1-math-runtime .md\\:scale-\\[0\\.62\\] {\n  @media (width >= 48rem) {\n    scale: 0.62;\n  }\n}\n#class1-math-runtime .md\\:columns-2 {\n  @media (width >= 48rem) {\n    columns: 2;\n  }\n}\n#class1-math-runtime .md\\:grid-cols-2 {\n  @media (width >= 48rem) {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n}\n#class1-math-runtime .md\\:grid-cols-3 {\n  @media (width >= 48rem) {\n    grid-template-columns: repeat(3, minmax(0, 1fr));\n  }\n}\n#class1-math-runtime .md\\:grid-cols-4 {\n  @media (width >= 48rem) {\n    grid-template-columns: repeat(4, minmax(0, 1fr));\n  }\n}\n#class1-math-runtime .md\\:grid-cols-7 {\n  @media (width >= 48rem) {\n    grid-template-columns: repeat(7, minmax(0, 1fr));\n  }\n}\n#class1-math-runtime .md\\:grid-cols-10 {\n  @media (width >= 48rem) {\n    grid-template-columns: repeat(10, minmax(0, 1fr));\n  }\n}\n#class1-math-runtime .md\\:grid-cols-\\[0\\.94fr_1\\.06fr\\] {\n  @media (width >= 48rem) {\n    grid-template-columns: 0.94fr 1.06fr;\n  }\n}\n#class1-math-runtime .md\\:grid-cols-\\[1\\.1fr_0\\.9fr\\] {\n  @media (width >= 48rem) {\n    grid-template-columns: 1.1fr 0.9fr;\n  }\n}\n#class1-math-runtime .md\\:grid-cols-\\[1\\.02fr_0\\.98fr\\] {\n  @media (width >= 48rem) {\n    grid-template-columns: 1.02fr 0.98fr;\n  }\n}\n#class1-math-runtime .md\\:grid-cols-\\[1\\.04fr_0\\.96fr\\] {\n  @media (width >= 48rem) {\n    grid-template-columns: 1.04fr 0.96fr;\n  }\n}\n#class1-math-runtime .md\\:grid-cols-\\[1\\.4fr_0\\.6fr\\] {\n  @media (width >= 48rem) {\n    grid-template-columns: 1.4fr 0.6fr;\n  }\n}\n#class1-math-runtime .md\\:grid-cols-\\[1\\.05fr_0\\.95fr\\] {\n  @media (width >= 48rem) {\n    grid-template-columns: 1.05fr 0.95fr;\n  }\n}\n#class1-math-runtime .md\\:grid-cols-\\[1\\.06fr_0\\.94fr\\] {\n  @media (width >= 48rem) {\n    grid-template-columns: 1.06fr 0.94fr;\n  }\n}\n#class1-math-runtime .md\\:grid-cols-\\[1\\.08fr_0\\.92fr\\] {\n  @media (width >= 48rem) {\n    grid-template-columns: 1.08fr 0.92fr;\n  }\n}\n#class1-math-runtime .md\\:grid-cols-\\[1\\.12fr_0\\.88fr\\] {\n  @media (width >= 48rem) {\n    grid-template-columns: 1.12fr 0.88fr;\n  }\n}\n#class1-math-runtime .md\\:grid-cols-\\[1\\.38fr_0\\.62fr\\] {\n  @media (width >= 48rem) {\n    grid-template-columns: 1.38fr 0.62fr;\n  }\n}\n#class1-math-runtime .md\\:grid-cols-\\[1fr_1\\.2fr\\] {\n  @media (width >= 48rem) {\n    grid-template-columns: 1fr 1.2fr;\n  }\n}\n#class1-math-runtime .md\\:grid-cols-\\[52px_1fr\\] {\n  @media (width >= 48rem) {\n    grid-template-columns: 52px 1fr;\n  }\n}\n#class1-math-runtime .md\\:flex-row {\n  @media (width >= 48rem) {\n    flex-direction: row;\n  }\n}\n#class1-math-runtime .md\\:gap-1 {\n  @media (width >= 48rem) {\n    gap: calc(var(--spacing) * 1);\n  }\n}\n#class1-math-runtime .md\\:gap-1\\.5 {\n  @media (width >= 48rem) {\n    gap: calc(var(--spacing) * 1.5);\n  }\n}\n#class1-math-runtime .md\\:gap-2 {\n  @media (width >= 48rem) {\n    gap: calc(var(--spacing) * 2);\n  }\n}\n#class1-math-runtime .md\\:gap-2\\.5 {\n  @media (width >= 48rem) {\n    gap: calc(var(--spacing) * 2.5);\n  }\n}\n#class1-math-runtime .md\\:gap-3 {\n  @media (width >= 48rem) {\n    gap: calc(var(--spacing) * 3);\n  }\n}\n#class1-math-runtime .md\\:gap-4 {\n  @media (width >= 48rem) {\n    gap: calc(var(--spacing) * 4);\n  }\n}\n#class1-math-runtime .md\\:gap-5 {\n  @media (width >= 48rem) {\n    gap: calc(var(--spacing) * 5);\n  }\n}\n#class1-math-runtime .md\\:gap-6 {\n  @media (width >= 48rem) {\n    gap: calc(var(--spacing) * 6);\n  }\n}\n#class1-math-runtime .md\\:gap-8 {\n  @media (width >= 48rem) {\n    gap: calc(var(--spacing) * 8);\n  }\n}\n#class1-math-runtime .md\\:gap-10 {\n  @media (width >= 48rem) {\n    gap: calc(var(--spacing) * 10);\n  }\n}\n#class1-math-runtime .md\\:gap-12 {\n  @media (width >= 48rem) {\n    gap: calc(var(--spacing) * 12);\n  }\n}\n#class1-math-runtime .md\\:gap-16 {\n  @media (width >= 48rem) {\n    gap: calc(var(--spacing) * 16);\n  }\n}\n#class1-math-runtime .md\\:space-y-2 {\n  @media (width >= 48rem) {\n    #class1-math-runtime :where(& > :not(:last-child)) {\n      --tw-space-y-reverse: 0;\n      margin-block-start: calc(calc(var(--spacing) * 2) * var(--tw-space-y-reverse));\n      margin-block-end: calc(calc(var(--spacing) * 2) * calc(1 - var(--tw-space-y-reverse)));\n    }\n  }\n}\n#class1-math-runtime .md\\:border-b-\\[4px\\] {\n  @media (width >= 48rem) {\n    border-bottom-style: var(--tw-border-style);\n    border-bottom-width: 4px;\n  }\n}\n#class1-math-runtime .md\\:border-b-\\[5px\\] {\n  @media (width >= 48rem) {\n    border-bottom-style: var(--tw-border-style);\n    border-bottom-width: 5px;\n  }\n}\n#class1-math-runtime .md\\:p-2 {\n  @media (width >= 48rem) {\n    padding: calc(var(--spacing) * 2);\n  }\n}\n#class1-math-runtime .md\\:p-3 {\n  @media (width >= 48rem) {\n    padding: calc(var(--spacing) * 3);\n  }\n}\n#class1-math-runtime .md\\:p-3\\.5 {\n  @media (width >= 48rem) {\n    padding: calc(var(--spacing) * 3.5);\n  }\n}\n#class1-math-runtime .md\\:p-4 {\n  @media (width >= 48rem) {\n    padding: calc(var(--spacing) * 4);\n  }\n}\n#class1-math-runtime .md\\:p-5 {\n  @media (width >= 48rem) {\n    padding: calc(var(--spacing) * 5);\n  }\n}\n#class1-math-runtime .md\\:p-6 {\n  @media (width >= 48rem) {\n    padding: calc(var(--spacing) * 6);\n  }\n}\n#class1-math-runtime .md\\:p-7 {\n  @media (width >= 48rem) {\n    padding: calc(var(--spacing) * 7);\n  }\n}\n#class1-math-runtime .md\\:p-8 {\n  @media (width >= 48rem) {\n    padding: calc(var(--spacing) * 8);\n  }\n}\n#class1-math-runtime .md\\:px-2 {\n  @media (width >= 48rem) {\n    padding-inline: calc(var(--spacing) * 2);\n  }\n}\n#class1-math-runtime .md\\:px-2\\.5 {\n  @media (width >= 48rem) {\n    padding-inline: calc(var(--spacing) * 2.5);\n  }\n}\n#class1-math-runtime .md\\:px-4 {\n  @media (width >= 48rem) {\n    padding-inline: calc(var(--spacing) * 4);\n  }\n}\n#class1-math-runtime .md\\:px-5 {\n  @media (width >= 48rem) {\n    padding-inline: calc(var(--spacing) * 5);\n  }\n}\n#class1-math-runtime .md\\:px-6 {\n  @media (width >= 48rem) {\n    padding-inline: calc(var(--spacing) * 6);\n  }\n}\n#class1-math-runtime .md\\:px-7 {\n  @media (width >= 48rem) {\n    padding-inline: calc(var(--spacing) * 7);\n  }\n}\n#class1-math-runtime .md\\:py-5 {\n  @media (width >= 48rem) {\n    padding-block: calc(var(--spacing) * 5);\n  }\n}\n#class1-math-runtime .md\\:py-6 {\n  @media (width >= 48rem) {\n    padding-block: calc(var(--spacing) * 6);\n  }\n}\n#class1-math-runtime .md\\:py-7 {\n  @media (width >= 48rem) {\n    padding-block: calc(var(--spacing) * 7);\n  }\n}\n#class1-math-runtime .md\\:pb-\\[5px\\] {\n  @media (width >= 48rem) {\n    padding-bottom: 5px;\n  }\n}\n#class1-math-runtime .md\\:pb-\\[6px\\] {\n  @media (width >= 48rem) {\n    padding-bottom: 6px;\n  }\n}\n#class1-math-runtime .md\\:text-left {\n  @media (width >= 48rem) {\n    text-align: left;\n  }\n}\n#class1-math-runtime .md\\:text-2xl {\n  @media (width >= 48rem) {\n    font-size: var(--text-2xl);\n    line-height: var(--tw-leading, var(--text-2xl--line-height));\n  }\n}\n#class1-math-runtime .md\\:text-3xl {\n  @media (width >= 48rem) {\n    font-size: var(--text-3xl);\n    line-height: var(--tw-leading, var(--text-3xl--line-height));\n  }\n}\n#class1-math-runtime .md\\:text-4xl {\n  @media (width >= 48rem) {\n    font-size: var(--text-4xl);\n    line-height: var(--tw-leading, var(--text-4xl--line-height));\n  }\n}\n#class1-math-runtime .md\\:text-5xl {\n  @media (width >= 48rem) {\n    font-size: var(--text-5xl);\n    line-height: var(--tw-leading, var(--text-5xl--line-height));\n  }\n}\n#class1-math-runtime .md\\:text-6xl {\n  @media (width >= 48rem) {\n    font-size: var(--text-6xl);\n    line-height: var(--tw-leading, var(--text-6xl--line-height));\n  }\n}\n#class1-math-runtime .md\\:text-8xl {\n  @media (width >= 48rem) {\n    font-size: var(--text-8xl);\n    line-height: var(--tw-leading, var(--text-8xl--line-height));\n  }\n}\n#class1-math-runtime .md\\:text-base {\n  @media (width >= 48rem) {\n    font-size: var(--text-base);\n    line-height: var(--tw-leading, var(--text-base--line-height));\n  }\n}\n#class1-math-runtime .md\\:text-lg {\n  @media (width >= 48rem) {\n    font-size: var(--text-lg);\n    line-height: var(--tw-leading, var(--text-lg--line-height));\n  }\n}\n#class1-math-runtime .md\\:text-sm {\n  @media (width >= 48rem) {\n    font-size: var(--text-sm);\n    line-height: var(--tw-leading, var(--text-sm--line-height));\n  }\n}\n#class1-math-runtime .md\\:text-xl {\n  @media (width >= 48rem) {\n    font-size: var(--text-xl);\n    line-height: var(--tw-leading, var(--text-xl--line-height));\n  }\n}\n#class1-math-runtime .md\\:text-xs {\n  @media (width >= 48rem) {\n    font-size: var(--text-xs);\n    line-height: var(--tw-leading, var(--text-xs--line-height));\n  }\n}\n#class1-math-runtime .md\\:text-\\[13px\\] {\n  @media (width >= 48rem) {\n    font-size: 16px;\n  }\n}\n#class1-math-runtime .md\\:text-\\[15px\\] {\n  @media (width >= 48rem) {\n    font-size: 16px;\n  }\n}\n#class1-math-runtime .md\\:text-\\[26px\\] {\n  @media (width >= 48rem) {\n    font-size: 26px;\n  }\n}\n#class1-math-runtime .md\\:text-\\[27px\\] {\n  @media (width >= 48rem) {\n    font-size: 27px;\n  }\n}\n#class1-math-runtime .md\\:text-\\[30px\\] {\n  @media (width >= 48rem) {\n    font-size: 30px;\n  }\n}\n#class1-math-runtime .md\\:text-\\[32px\\] {\n  @media (width >= 48rem) {\n    font-size: 32px;\n  }\n}\n#class1-math-runtime .md\\:text-\\[36px\\] {\n  @media (width >= 48rem) {\n    font-size: 36px;\n  }\n}\n#class1-math-runtime .md\\:text-\\[40px\\] {\n  @media (width >= 48rem) {\n    font-size: 40px;\n  }\n}\n#class1-math-runtime .md\\:text-\\[50px\\] {\n  @media (width >= 48rem) {\n    font-size: 50px;\n  }\n}\n#class1-math-runtime .md\\:text-\\[54px\\] {\n  @media (width >= 48rem) {\n    font-size: 54px;\n  }\n}\n#class1-math-runtime .md\\:text-\\[68px\\] {\n  @media (width >= 48rem) {\n    font-size: 68px;\n  }\n}\n#class1-math-runtime .md\\:text-\\[76px\\] {\n  @media (width >= 48rem) {\n    font-size: 76px;\n  }\n}\n#class1-math-runtime .md\\:text-\\[78px\\] {\n  @media (width >= 48rem) {\n    font-size: 78px;\n  }\n}\n#class1-math-runtime .md\\:text-\\[80px\\] {\n  @media (width >= 48rem) {\n    font-size: 80px;\n  }\n}\n#class1-math-runtime .md\\:text-\\[82px\\] {\n  @media (width >= 48rem) {\n    font-size: 82px;\n  }\n}\n#class1-math-runtime .md\\:text-\\[88px\\] {\n  @media (width >= 48rem) {\n    font-size: 88px;\n  }\n}\n#class1-math-runtime .md\\:text-\\[105px\\] {\n  @media (width >= 48rem) {\n    font-size: 105px;\n  }\n}\n#class1-math-runtime .md\\:text-\\[120px\\] {\n  @media (width >= 48rem) {\n    font-size: 120px;\n  }\n}\n#class1-math-runtime .md\\:text-\\[145px\\] {\n  @media (width >= 48rem) {\n    font-size: 145px;\n  }\n}\n#class1-math-runtime .md\\:text-\\[155px\\] {\n  @media (width >= 48rem) {\n    font-size: 155px;\n  }\n}\n#class1-math-runtime .lg\\:h-12 {\n  @media (width >= 64rem) {\n    height: calc(var(--spacing) * 12);\n  }\n}\n#class1-math-runtime .lg\\:h-16 {\n  @media (width >= 64rem) {\n    height: calc(var(--spacing) * 16);\n  }\n}\n#class1-math-runtime .lg\\:h-\\[52px\\] {\n  @media (width >= 64rem) {\n    height: 52px;\n  }\n}\n#class1-math-runtime .lg\\:h-\\[54px\\] {\n  @media (width >= 64rem) {\n    height: 54px;\n  }\n}\n#class1-math-runtime .lg\\:w-12 {\n  @media (width >= 64rem) {\n    width: calc(var(--spacing) * 12);\n  }\n}\n#class1-math-runtime .lg\\:w-16 {\n  @media (width >= 64rem) {\n    width: calc(var(--spacing) * 16);\n  }\n}\n#class1-math-runtime .lg\\:w-\\[52px\\] {\n  @media (width >= 64rem) {\n    width: 52px;\n  }\n}\n#class1-math-runtime .lg\\:w-\\[54px\\] {\n  @media (width >= 64rem) {\n    width: 54px;\n  }\n}\n#class1-math-runtime .lg\\:scale-\\[0\\.68\\] {\n  @media (width >= 64rem) {\n    scale: 0.68;\n  }\n}\n#class1-math-runtime .lg\\:grid-cols-2 {\n  @media (width >= 64rem) {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n}\n#class1-math-runtime .lg\\:grid-cols-3 {\n  @media (width >= 64rem) {\n    grid-template-columns: repeat(3, minmax(0, 1fr));\n  }\n}\n#class1-math-runtime .lg\\:grid-cols-4 {\n  @media (width >= 64rem) {\n    grid-template-columns: repeat(4, minmax(0, 1fr));\n  }\n}\n#class1-math-runtime .lg\\:grid-cols-6 {\n  @media (width >= 64rem) {\n    grid-template-columns: repeat(6, minmax(0, 1fr));\n  }\n}\n#class1-math-runtime .lg\\:grid-cols-\\[1\\.1fr_0\\.9fr\\] {\n  @media (width >= 64rem) {\n    grid-template-columns: 1.1fr 0.9fr;\n  }\n}\n#class1-math-runtime .lg\\:grid-cols-\\[1\\.15fr_0\\.85fr\\] {\n  @media (width >= 64rem) {\n    grid-template-columns: 1.15fr 0.85fr;\n  }\n}\n#class1-math-runtime .lg\\:gap-5 {\n  @media (width >= 64rem) {\n    gap: calc(var(--spacing) * 5);\n  }\n}\n#class1-math-runtime .lg\\:text-2xl {\n  @media (width >= 64rem) {\n    font-size: var(--text-2xl);\n    line-height: var(--tw-leading, var(--text-2xl--line-height));\n  }\n}\n#class1-math-runtime .lg\\:text-lg {\n  @media (width >= 64rem) {\n    font-size: var(--text-lg);\n    line-height: var(--tw-leading, var(--text-lg--line-height));\n  }\n}\n#class1-math-runtime .lg\\:text-xl {\n  @media (width >= 64rem) {\n    font-size: var(--text-xl);\n    line-height: var(--tw-leading, var(--text-xl--line-height));\n  }\n}\n#class1-math-runtime .lg\\:text-\\[22px\\] {\n  @media (width >= 64rem) {\n    font-size: 22px;\n  }\n}\n#class1-math-runtime .lg\\:text-\\[23px\\] {\n  @media (width >= 64rem) {\n    font-size: 23px;\n  }\n}\n#class1-math-runtime .lg\\:text-\\[24px\\] {\n  @media (width >= 64rem) {\n    font-size: 24px;\n  }\n}\n#class1-math-runtime .lg\\:text-\\[26px\\] {\n  @media (width >= 64rem) {\n    font-size: 26px;\n  }\n}\n#class1-math-runtime .lg\\:text-\\[27px\\] {\n  @media (width >= 64rem) {\n    font-size: 27px;\n  }\n}\n#class1-math-runtime .lg\\:text-\\[28px\\] {\n  @media (width >= 64rem) {\n    font-size: 28px;\n  }\n}\n#class1-math-runtime .lg\\:text-\\[30px\\] {\n  @media (width >= 64rem) {\n    font-size: 30px;\n  }\n}\n#class1-math-runtime .lg\\:text-\\[34px\\] {\n  @media (width >= 64rem) {\n    font-size: 34px;\n  }\n}\n#class1-math-runtime .lg\\:text-\\[36px\\] {\n  @media (width >= 64rem) {\n    font-size: 36px;\n  }\n}\n#class1-math-runtime .lg\\:text-\\[40px\\] {\n  @media (width >= 64rem) {\n    font-size: 40px;\n  }\n}\n#class1-math-runtime .lg\\:text-\\[44px\\] {\n  @media (width >= 64rem) {\n    font-size: 44px;\n  }\n}\n#class1-math-runtime .lg\\:text-\\[56px\\] {\n  @media (width >= 64rem) {\n    font-size: 56px;\n  }\n}\n#class1-math-runtime .lg\\:text-\\[60px\\] {\n  @media (width >= 64rem) {\n    font-size: 60px;\n  }\n}\n#class1-math-runtime .lg\\:text-\\[82px\\] {\n  @media (width >= 64rem) {\n    font-size: 82px;\n  }\n}\n#class1-math-runtime .lg\\:text-\\[90px\\] {\n  @media (width >= 64rem) {\n    font-size: 90px;\n  }\n}\n#class1-math-runtime .lg\\:text-\\[92px\\] {\n  @media (width >= 64rem) {\n    font-size: 92px;\n  }\n}\n#class1-math-runtime .lg\\:text-\\[96px\\] {\n  @media (width >= 64rem) {\n    font-size: 96px;\n  }\n}\n#class1-math-runtime .lg\\:text-\\[126px\\] {\n  @media (width >= 64rem) {\n    font-size: 126px;\n  }\n}\n#class1-math-runtime .lg\\:text-\\[128px\\] {\n  @media (width >= 64rem) {\n    font-size: 128px;\n  }\n}\n#class1-math-runtime .lg\\:text-\\[170px\\] {\n  @media (width >= 64rem) {\n    font-size: 170px;\n  }\n}\n#class1-math-runtime .lg\\:text-\\[180px\\] {\n  @media (width >= 64rem) {\n    font-size: 180px;\n  }\n}\n#class1-math-runtime .xl\\:grid-cols-3 {\n  @media (width >= 80rem) {\n    grid-template-columns: repeat(3, minmax(0, 1fr));\n  }\n}\n#class1-math-runtime .xl\\:grid-cols-8 {\n  @media (width >= 80rem) {\n    grid-template-columns: repeat(8, minmax(0, 1fr));\n  }\n}\n@property --tw-translate-x {\n  syntax: \"*\";\n  inherits: false;\n  initial-value: 0;\n}\n@property --tw-translate-y {\n  syntax: \"*\";\n  inherits: false;\n  initial-value: 0;\n}\n@property --tw-translate-z {\n  syntax: \"*\";\n  inherits: false;\n  initial-value: 0;\n}\n@property --tw-scale-x {\n  syntax: \"*\";\n  inherits: false;\n  initial-value: 1;\n}\n@property --tw-scale-y {\n  syntax: \"*\";\n  inherits: false;\n  initial-value: 1;\n}\n@property --tw-scale-z {\n  syntax: \"*\";\n  inherits: false;\n  initial-value: 1;\n}\n@property --tw-rotate-x {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-rotate-y {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-rotate-z {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-skew-x {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-skew-y {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-space-y-reverse {\n  syntax: \"*\";\n  inherits: false;\n  initial-value: 0;\n}\n@property --tw-space-x-reverse {\n  syntax: \"*\";\n  inherits: false;\n  initial-value: 0;\n}\n@property --tw-divide-x-reverse {\n  syntax: \"*\";\n  inherits: false;\n  initial-value: 0;\n}\n@property --tw-border-style {\n  syntax: \"*\";\n  inherits: false;\n  initial-value: solid;\n}\n@property --tw-divide-y-reverse {\n  syntax: \"*\";\n  inherits: false;\n  initial-value: 0;\n}\n@property --tw-gradient-position {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-gradient-from {\n  syntax: \"<color>\";\n  inherits: false;\n  initial-value: #0000;\n}\n@property --tw-gradient-via {\n  syntax: \"<color>\";\n  inherits: false;\n  initial-value: #0000;\n}\n@property --tw-gradient-to {\n  syntax: \"<color>\";\n  inherits: false;\n  initial-value: #0000;\n}\n@property --tw-gradient-stops {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-gradient-via-stops {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-gradient-from-position {\n  syntax: \"<length-percentage>\";\n  inherits: false;\n  initial-value: 0%;\n}\n@property --tw-gradient-via-position {\n  syntax: \"<length-percentage>\";\n  inherits: false;\n  initial-value: 50%;\n}\n@property --tw-gradient-to-position {\n  syntax: \"<length-percentage>\";\n  inherits: false;\n  initial-value: 100%;\n}\n@property --tw-leading {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-font-weight {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-tracking {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-shadow {\n  syntax: \"*\";\n  inherits: false;\n  initial-value: 0 0 #0000;\n}\n@property --tw-shadow-color {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-shadow-alpha {\n  syntax: \"<percentage>\";\n  inherits: false;\n  initial-value: 100%;\n}\n@property --tw-inset-shadow {\n  syntax: \"*\";\n  inherits: false;\n  initial-value: 0 0 #0000;\n}\n@property --tw-inset-shadow-color {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-inset-shadow-alpha {\n  syntax: \"<percentage>\";\n  inherits: false;\n  initial-value: 100%;\n}\n@property --tw-ring-color {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-ring-shadow {\n  syntax: \"*\";\n  inherits: false;\n  initial-value: 0 0 #0000;\n}\n@property --tw-inset-ring-color {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-inset-ring-shadow {\n  syntax: \"*\";\n  inherits: false;\n  initial-value: 0 0 #0000;\n}\n@property --tw-ring-inset {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-ring-offset-width {\n  syntax: \"<length>\";\n  inherits: false;\n  initial-value: 0px;\n}\n@property --tw-ring-offset-color {\n  syntax: \"*\";\n  inherits: false;\n  initial-value: #fff;\n}\n@property --tw-ring-offset-shadow {\n  syntax: \"*\";\n  inherits: false;\n  initial-value: 0 0 #0000;\n}\n@property --tw-blur {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-brightness {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-contrast {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-grayscale {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-hue-rotate {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-invert {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-opacity {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-saturate {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-sepia {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-drop-shadow {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-drop-shadow-color {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-drop-shadow-alpha {\n  syntax: \"<percentage>\";\n  inherits: false;\n  initial-value: 100%;\n}\n@property --tw-drop-shadow-size {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-backdrop-blur {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-backdrop-brightness {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-backdrop-contrast {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-backdrop-grayscale {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-backdrop-hue-rotate {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-backdrop-invert {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-backdrop-opacity {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-backdrop-saturate {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-backdrop-sepia {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-duration {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-ease {\n  syntax: \"*\";\n  inherits: false;\n}\n@layer properties {\n  @supports ((-webkit-hyphens: none) and (not (margin-trim: inline))) or ((-moz-orient: inline) and (not (color:rgb(from red r g b)))) {\n    #class1-math-runtime *,#class1-math-runtime ::before,#class1-math-runtime ::after,#class1-math-runtime ::backdrop {\n      --tw-translate-x: 0;\n      --tw-translate-y: 0;\n      --tw-translate-z: 0;\n      --tw-scale-x: 1;\n      --tw-scale-y: 1;\n      --tw-scale-z: 1;\n      --tw-rotate-x: initial;\n      --tw-rotate-y: initial;\n      --tw-rotate-z: initial;\n      --tw-skew-x: initial;\n      --tw-skew-y: initial;\n      --tw-space-y-reverse: 0;\n      --tw-space-x-reverse: 0;\n      --tw-divide-x-reverse: 0;\n      --tw-border-style: solid;\n      --tw-divide-y-reverse: 0;\n      --tw-gradient-position: initial;\n      --tw-gradient-from: #0000;\n      --tw-gradient-via: #0000;\n      --tw-gradient-to: #0000;\n      --tw-gradient-stops: initial;\n      --tw-gradient-via-stops: initial;\n      --tw-gradient-from-position: 0%;\n      --tw-gradient-via-position: 50%;\n      --tw-gradient-to-position: 100%;\n      --tw-leading: initial;\n      --tw-font-weight: initial;\n      --tw-tracking: initial;\n      --tw-shadow: 0 0 #0000;\n      --tw-shadow-color: initial;\n      --tw-shadow-alpha: 100%;\n      --tw-inset-shadow: 0 0 #0000;\n      --tw-inset-shadow-color: initial;\n      --tw-inset-shadow-alpha: 100%;\n      --tw-ring-color: initial;\n      --tw-ring-shadow: 0 0 #0000;\n      --tw-inset-ring-color: initial;\n      --tw-inset-ring-shadow: 0 0 #0000;\n      --tw-ring-inset: initial;\n      --tw-ring-offset-width: 0px;\n      --tw-ring-offset-color: #fff;\n      --tw-ring-offset-shadow: 0 0 #0000;\n      --tw-blur: initial;\n      --tw-brightness: initial;\n      --tw-contrast: initial;\n      --tw-grayscale: initial;\n      --tw-hue-rotate: initial;\n      --tw-invert: initial;\n      --tw-opacity: initial;\n      --tw-saturate: initial;\n      --tw-sepia: initial;\n      --tw-drop-shadow: initial;\n      --tw-drop-shadow-color: initial;\n      --tw-drop-shadow-alpha: 100%;\n      --tw-drop-shadow-size: initial;\n      --tw-backdrop-blur: initial;\n      --tw-backdrop-brightness: initial;\n      --tw-backdrop-contrast: initial;\n      --tw-backdrop-grayscale: initial;\n      --tw-backdrop-hue-rotate: initial;\n      --tw-backdrop-invert: initial;\n      --tw-backdrop-opacity: initial;\n      --tw-backdrop-saturate: initial;\n      --tw-backdrop-sepia: initial;\n      --tw-duration: initial;\n      --tw-ease: initial;\n    }\n  }\n}\n\n\n        #class1-math-runtime { background: #ffffff; }\n        #class1-math-runtime {\n            font-family: 'Quicksand', 'Nunito', sans-serif;\n            background: linear-gradient(135deg, #fdf2f8 0%, #fae8ff 50%, #f3e8ff 100%);\n            color: #4a4a4a;\n            user-select: none;\n            min-height: 100vh;\n            display: flex;\n            flex-direction: column;\n            align-items: center;\n            justify-content: flex-start;\n        }\n        #class1-math-runtime #screen-dashboard {\n            max-width: 82rem !important;\n        }\n\n        #class1-math-runtime .pastel-card {\n            background: #ffffff;\n            border-radius: 28px;\n            box-shadow: 0 12px 30px rgba(236, 72, 153, 0.12);\n            border: 3px solid #fbcfe8;\n        }\n        #class1-math-runtime .pastel-btn {\n            transition: all 0.2s ease;\n            box-shadow: 0 3px 10px rgba(0,0,0,0.05);\n        }\n        #class1-math-runtime .pastel-btn:hover {\n            transform: translateY(-2px);\n            box-shadow: 0 5px 15px rgba(0,0,0,0.09);\n        }\n        #class1-math-runtime .pastel-btn:active { transform: translateY(1px); }\n        @keyframes float {\n            0%, 100% { transform: translateY(0px); }\n            50% { transform: translateY(-6px); }\n        }\n        #class1-math-runtime .floating { animation: float 3s ease-in-out infinite; }\n        @keyframes sway {\n            0%, 100% { transform: translateY(0px) rotate(0deg); }\n            25% { transform: translateY(-5px) rotate(-7deg); }\n            75% { transform: translateY(-5px) rotate(7deg); }\n        }\n        #class1-math-runtime .swaying {\n            animation: sway 2.4s ease-in-out infinite;\n            display: inline-block;\n            transform-origin: bottom center;\n        }\n        @keyframes pulse-glow {\n            0%, 100% { filter: drop-shadow(0 0 6px rgba(236, 72, 153, 0.6)); transform: scale(1); }\n            50% { filter: drop-shadow(0 0 16px rgba(236, 72, 153, 0.9)); transform: scale(1.04); }\n        }\n        #class1-math-runtime .node-current {\n            animation: pulse-glow 2s infinite ease-in-out;\n            transform-origin: center;\n        }\n        #class1-math-runtime ::-webkit-scrollbar { width: 3px; height: 3px; }\n        #class1-math-runtime ::-webkit-scrollbar-track { background: #fdf2f8; }\n        #class1-math-runtime ::-webkit-scrollbar-thumb { background: #f472b6; border-radius: 10px; }\n        #class1-math-runtime ::-webkit-scrollbar-thumb:hover { background: #ec4899; }\n\n        /* TOAN1 UI V11 - 6 tab co dinh theo mau TV1 */\n        #class1-math-runtime .main-module-tab{\n            position:relative; min-height:46px; padding:7px 8px; border-radius:14px;\n            border:1.5px solid #f5c5df; background:linear-gradient(180deg,#fff,#fff8fc);\n            color:#7e3bb8; font-weight:900; font-size:16px; line-height:1.05;\n            display:flex; align-items:center; justify-content:center; gap:6px;\n            box-shadow:0 2px 7px rgba(109,40,217,.07);\n            transition:box-shadow .18s,border-color .18s,background .18s,color .18s;\n        }\n        #class1-math-runtime .main-module-tab:hover{border-color:#e879f9;box-shadow:0 0 13px rgba(217,70,239,.22);}\n        #class1-math-runtime .main-module-tab.is-active{\n            color:#fff; border-color:#d946ef;\n            background:linear-gradient(135deg,#ec4899 0%,#a855f7 55%,#7c3aed 100%);\n            box-shadow:0 5px 14px rgba(168,85,247,.28);\n        }\n        @media (min-width:768px){#class1-math-runtime .main-module-tab{min-height:50px;font-size:16px;}}\n\n        #class1-math-runtime .semester-switch-btn{\n            min-width:88px; height:34px; padding:0 14px; border-radius:12px;\n            font-weight:900; font-size:16px; transform:none !important;\n            transition:background .18s,color .18s,border-color .18s,box-shadow .18s,filter .18s !important;\n        }\n        #class1-math-runtime .semester-switch-btn:hover{transform:none !important;filter:brightness(1.04);}\n        #class1-math-runtime .semester-switch-btn.is-active{\n            color:#fff !important; background:linear-gradient(135deg,#ec4899 0%,#a855f7 100%) !important;\n            border:2px solid #c026d3 !important; box-shadow:0 5px 12px rgba(168,85,247,.28) !important;\n        }\n        #class1-math-runtime .semester-switch-btn.is-inactive{\n            color:#7e22ce !important; background:linear-gradient(135deg,#fff1f7 0%,#f5f3ff 100%) !important;\n            border:1.5px solid #e9d5ff !important; box-shadow:0 2px 6px rgba(126,34,206,.08) !important;\n        }\n\n        /* Toan 1 - breadcrumb header chi hien chu, bo icon de gon */\n        #class1-math-runtime #header-level2-icon { display:none !important; }\n        #class1-math-runtime #header-level2-title { margin-left:0 !important; }\n\n        @media (max-width:767px){\n            #class1-math-runtime #screen-login img[src=\"icon-512.png\"] {\n                border:none !important; border-radius:0 !important; box-shadow:none !important; background:transparent !important;\n            }\n            #class1-math-runtime .app-main-header{display:flex !important;flex-direction:column !important;align-items:stretch !important;gap:.35rem !important;padding:.35rem .45rem !important;}\n            #class1-math-runtime #header-nav-zone{display:flex !important;width:100% !important;min-width:0;justify-content:flex-start !important;overflow:hidden !important;}\n            #class1-math-runtime #btn-header-home{width:72px !important;height:48px !important;min-width:72px !important;}\n            #class1-math-runtime #header-learning-tabs{flex:1;min-width:0;overflow-x:auto;overflow-y:hidden;scrollbar-width:none;}\n            #class1-math-runtime #header-learning-tabs::-webkit-scrollbar{display:none;}\n            #class1-math-runtime #header-level2-icon{display:none !important;}\n            #class1-math-runtime #header-level2-tab > button{padding-left:.5rem !important;padding-right:.5rem !important;column-gap:0 !important;}\n            #class1-math-runtime #header-info-zone{display:flex !important;width:100% !important;justify-content:flex-end !important;gap:.35rem !important;min-width:0;}\n            #class1-math-runtime #btn-toggle-autospeech{width:38px !important;height:38px !important;min-width:38px !important;}\n            #class1-math-runtime #header-star-box{transform:none !important;margin-left:0 !important;}\n            #class1-math-runtime #user-info-box{margin-left:auto !important;min-width:0;text-align:right;}\n            #class1-math-runtime .semester-switch-btn{min-width:76px;height:32px;padding:0 9px;font-size:16px;}\n        }\n\n        @media print {\n            #class1-math-runtime * { visibility: hidden; }\n            #class1-math-runtime #printable-report-area,#class1-math-runtime #printable-report-area * { visibility: visible; }\n            #class1-math-runtime #printable-report-area {\n                position: absolute !important;\n                left: 0 !important;\n                top: 0 !important;\n                width: 100% !important;\n                background: white !important;\n                padding: 10px !important;\n            }\n            #class1-math-runtime .no-print { display: none !important; }\n            #class1-math-runtime .page-break-1 { page-break-after: always; break-after: page; }\n            #class1-math-runtime .page-break-2 { page-break-before: always; break-before: page; page-break-after: always; break-after: page; }\n            #class1-math-runtime .page-break-3 { page-break-before: always; break-before: page; }\n        }\n    \n\n        /* =========================================================\n           TOAN 1 UI 2026-09-20 - APP SHELL THEO CHUAN TV1\n           Chi thay presentation/layout, giu nguyen engine va workflow.\n           ========================================================= */\n        #class1-math-runtime { background:#ffffff !important; }\n        #class1-math-runtime #screen-dashboard { max-width:82rem !important; background:transparent !important; }\n\n        #class1-math-runtime .app-main-header{\n            display:grid !important;\n            grid-template-columns:auto minmax(0,1fr) auto;\n            align-items:center;\n            gap:10px;\n            padding:7px 0 !important;\n            background:transparent !important;\n            border:0 !important;\n            box-shadow:none !important;\n            backdrop-filter:none !important;\n            -webkit-backdrop-filter:none !important;\n            border-radius:0 !important;\n        }\n        #class1-math-runtime #btn-header-home{\n            width:101px !important; min-width:101px !important; height:67px !important;\n            border-radius:16px !important; box-shadow:0 3px 10px rgba(76,29,149,.08) !important;\n        }\n        #class1-math-runtime #header-info-zone{width:auto !important;min-width:0;margin-left:0 !important;justify-content:flex-end !important;gap:7px !important;}\n        #class1-math-runtime #btn-toggle-autospeech{display:none !important;}\n        #class1-math-runtime #header-star-box{\n            background:#fff7fb !important;\n            height:62px !important;\n            min-height:62px !important;\n            padding:5px 8px !important;\n            justify-content:center !important;\n        }\n        #class1-math-runtime #header-star-box > div > span:first-child{font-size:16px !important;padding:3px 7px !important;}\n        #class1-math-runtime #header-star-box > div > span:first-child i{font-size:16px !important;}\n        #class1-math-runtime #star-green-count,#class1-math-runtime #star-red-count{font-size:16px !important;min-width:16px;text-align:center;}\n\n        #class1-math-runtime #main-module-tabs{width:100%;min-width:0;background:transparent !important;border:0 !important;border-radius:0 !important;padding:0 !important;box-shadow:none !important;}\n        #class1-math-runtime #main-module-tabs > div{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:7px;}\n        #class1-math-runtime .main-module-tab{\n            min-width:0;min-height:62px;padding:7px 5px;border-radius:16px;flex-direction:column;gap:3px;\n            font-size:16px;line-height:1.05;border-width:1.5px;box-shadow:0 3px 9px rgba(76,29,149,.08);\n            position:relative;overflow:visible;\n        }\n        #class1-math-runtime .main-module-tab > span:first-child{font-size:21px !important;line-height:1;}\n        #class1-math-runtime .main-module-tab::after{content:'';position:absolute;left:34%;right:34%;bottom:-5px;height:3px;border-radius:99px;opacity:0;transform:scaleX(.45);transition:all .18s ease;background:currentColor;}\n        #class1-math-runtime .main-module-tab.is-active::after{opacity:.95;transform:scaleX(1);}\n        #class1-math-runtime .main-module-tab[data-tab=\"discover\"]{background:#f3e8ff;color:#7c3aed;border-color:#ddd6fe;}\n        #class1-math-runtime .main-module-tab[data-tab=\"lessons\"]{background:#fce7f3;color:#db2777;border-color:#fbcfe8;}\n        #class1-math-runtime .main-module-tab[data-tab=\"exercises\"]{background:#e0f2fe;color:#0369a1;border-color:#bae6fd;}\n        #class1-math-runtime .main-module-tab[data-tab=\"review\"]{background:#fef3c7;color:#b45309;border-color:#fde68a;}\n        #class1-math-runtime .main-module-tab[data-tab=\"exams\"]{background:#dcfce7;color:#15803d;border-color:#bbf7d0;}\n        #class1-math-runtime .main-module-tab[data-tab=\"games\"]{background:#ede9fe;color:#6d28d9;border-color:#ddd6fe;}\n        #class1-math-runtime .main-module-tab[data-tab=\"discover\"].is-active{background:linear-gradient(135deg,#a855f7,#7c3aed);color:#fff;border-color:#8b5cf6;box-shadow:0 7px 17px rgba(124,58,237,.27);}\n        #class1-math-runtime .main-module-tab[data-tab=\"lessons\"].is-active{background:linear-gradient(135deg,#f472b6,#ec4899);color:#fff;border-color:#ec4899;box-shadow:0 7px 17px rgba(236,72,153,.25);}\n        #class1-math-runtime .main-module-tab[data-tab=\"exercises\"].is-active{background:linear-gradient(135deg,#38bdf8,#0284c7);color:#fff;border-color:#0ea5e9;box-shadow:0 7px 17px rgba(14,165,233,.25);}\n        #class1-math-runtime .main-module-tab[data-tab=\"review\"].is-active{background:linear-gradient(135deg,#fbbf24,#f59e0b);color:#fff;border-color:#f59e0b;box-shadow:0 7px 17px rgba(245,158,11,.25);}\n        #class1-math-runtime .main-module-tab[data-tab=\"exams\"].is-active{background:linear-gradient(135deg,#4ade80,#16a34a);color:#fff;border-color:#22c55e;box-shadow:0 7px 17px rgba(34,197,94,.24);}\n        #class1-math-runtime .main-module-tab[data-tab=\"games\"].is-active{background:linear-gradient(135deg,#8b5cf6,#6d28d9);color:#fff;border-color:#7c3aed;box-shadow:0 7px 17px rgba(109,40,217,.25);}\n\n        #class1-math-runtime #app-banner-slot{width:100%;position:relative;}\n        #class1-math-runtime #app-main-banner{position:relative;width:100%;aspect-ratio:6/1;min-height:0;overflow:hidden;border-radius:0;border:0;box-shadow:none;background:#fff;}\n        #class1-math-runtime #app-main-banner picture{display:block;width:100%;height:100%;}\n        #class1-math-runtime #app-main-banner img{width:100%;height:100%;object-fit:cover;display:block;}\n        #class1-math-runtime .app-main-banner-copy{position:absolute;left:50%;top:48%;transform:translate(-50%,-50%);width:36%;text-align:center;pointer-events:none;text-shadow:0 2px 0 rgba(255,255,255,.9),0 3px 12px rgba(126,34,206,.12);}\n        #class1-math-runtime .app-main-banner-title{font-size:clamp(21px,2.35vw,34px);line-height:1;font-weight:900;color:#ec4899;letter-spacing:-.02em;}\n        #class1-math-runtime .app-main-banner-teacher{margin-top:5px;font-size:clamp(16px,1.15vw,17px);font-weight:900;color:#7e22ce;}\n        #class1-math-runtime #app-context-banner.hidden,#class1-math-runtime #app-main-banner.hidden{display:none !important;}\n        #class1-math-runtime #app-context-banner{position:relative;min-height:58px;overflow:hidden;border-radius:0;border:0 !important;background:none !important;box-shadow:none !important;display:flex;align-items:center;padding:7px 10px;}\n        #class1-math-runtime #app-context-banner::before{content:'';position:absolute;inset:0;background-image:url('banner-sub.jpg');background-size:cover;background-position:center;background-repeat:no-repeat;transform:none;opacity:1;filter:none;pointer-events:none;z-index:0;}\n        #class1-math-runtime #header-learning-tabs{width:100% !important;max-width:none !important;flex:1 1 auto !important;min-width:0 !important;overflow-x:auto !important;overflow-y:hidden !important;scrollbar-width:none;gap:5px;position:relative;z-index:2;}\n        #class1-math-runtime #header-learning-tabs::-webkit-scrollbar{display:none;}\n        #class1-math-runtime #header-level2-tab,#class1-math-runtime #header-level3-tab,#class1-math-runtime #header-level4-tab{width:auto !important;min-width:0 !important;max-width:none !important;flex:0 0 auto !important;overflow:visible !important;}\n        #class1-math-runtime #header-level2-tab > button,#class1-math-runtime #header-level3-tab > div,#class1-math-runtime #header-level4-tab > div{height:38px !important;max-width:220px !important;min-width:0 !important;padding:0 12px !important;border-radius:13px !important;background:rgba(255,255,255,.50) !important;backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px);box-shadow:0 2px 7px rgba(76,29,149,.08) !important;}\n        #class1-math-runtime #header-level2-tab > button{color:#be185d !important;border:1.5px solid #f9a8d4 !important;}\n        #class1-math-runtime #header-level3-tab > div{color:#7e22ce !important;border:1.5px solid #d8b4fe !important;}\n        #class1-math-runtime #header-level4-tab > div{color:#b45309 !important;border:1.5px solid #fde68a !important;}\n        #class1-math-runtime #header-level2-title,#class1-math-runtime #header-level3-title,#class1-math-runtime #header-level4-title{font-size:16px !important;font-weight:900 !important;}\n        #class1-math-runtime #header-level3-tab > span,#class1-math-runtime #header-level4-tab > span{color:#c084fc !important;font-size:16px !important;}\n        #class1-math-runtime #header-level2-icon{display:none !important;}\n\n        #class1-math-runtime #app-footer{width:100%;max-width:82rem;min-height:76px;margin:10px auto 0;padding:0 14px;border-radius:0;background-image:url('footer-bg.jpg');background-size:cover;background-position:center;background-repeat:no-repeat;display:flex;align-items:center;justify-content:center;text-align:center;color:#1827f2;border:0;box-shadow:none;}\n        #class1-math-runtime #app-footer .footer-title{font-size:17px;font-weight:900;line-height:1.35;text-shadow:0 1px 0 #fff;}\n        #class1-math-runtime #app-footer .footer-sub{font-size:16px;font-weight:800;line-height:1.35;color:#1827f2;text-shadow:0 1px 0 #fff;}\n\n        /* Root view: bo khung ngoai, chi giu card noi dung. */\n        #class1-math-runtime #view-bai-hoc-hub,#class1-math-runtime #view-roadmap,#class1-math-runtime #view-minigame-hub,#class1-math-runtime #view-exam-hub{background:transparent !important;border:0 !important;box-shadow:none !important;border-radius:0 !important;padding-left:0 !important;padding-right:0 !important;}\n        #class1-math-runtime #roadmap-svg-container{background:transparent !important;border:0 !important;border-radius:0 !important;box-shadow:none !important;padding-left:0 !important;padding-right:0 !important;}\n        #class1-math-runtime:has(#main-tab-review.is-active) #view-lecture{background:transparent !important;border:0 !important;box-shadow:none !important;border-radius:0 !important;padding-left:0 !important;padding-right:0 !important;}\n\n        /* Man nhanh: bo khung ngoai va chieu cao gia. */\n        #class1-math-runtime #view-lecture,#class1-math-runtime #view-bai-hoc-lesson,#class1-math-runtime #view-game-play{background:transparent !important;border:0 !important;box-shadow:none !important;border-radius:0 !important;min-height:0 !important;padding:8px 0 !important;}\n        #class1-math-runtime #view-quiz > .pastel-card{background:transparent !important;border:0 !important;box-shadow:none !important;border-radius:0 !important;min-height:0 !important;padding:8px 0 !important;}\n        #class1-math-runtime #view-lecture{justify-content:flex-start !important;gap:8px !important;}\n        #class1-math-runtime #view-lecture > .w-full{gap:8px !important;}\n        #class1-math-runtime #view-lecture .mb-3,#class1-math-runtime #view-lecture .mb-2\\.5{margin-bottom:8px !important;}\n        #class1-math-runtime #view-lecture .mt-2\\.5{margin-top:8px !important;}\n        #class1-math-runtime #view-lecture .pt-2{padding-top:8px !important;}\n        #class1-math-runtime #view-quiz{gap:8px !important;}\n        #class1-math-runtime #view-quiz #question-box{margin-top:4px !important;margin-bottom:4px !important;}\n        /* Khoảng cách đáp án -> điều hướng = xấp xỉ 1/2 chiều cao nút Câu tiếp theo. */\n        #class1-math-runtime #view-quiz #quiz-bottom-nav{padding-top:22px !important;}\n        #class1-math-runtime #btn-next-q-prac,#class1-math-runtime #btn-next-q-exam{height:43px !important;min-height:43px !important;padding-top:0 !important;padding-bottom:0 !important;}\n\n        @media (max-width:767px){\n            #class1-math-runtime .app-main-header{display:grid !important;grid-template-columns:auto minmax(0,1fr);grid-template-rows:auto auto;gap:7px !important;padding:7px 0 !important;}\n            #class1-math-runtime #btn-header-home{grid-column:1;grid-row:1;width:86px !important;min-width:86px !important;height:58px !important;justify-self:start;}\n            #class1-math-runtime #header-info-zone{grid-column:2;grid-row:1;justify-self:end !important;width:auto !important;gap:5px !important;}\n            #class1-math-runtime #main-module-tabs{grid-column:1 / 3;grid-row:2;width:100% !important;}\n            #class1-math-runtime #main-module-tabs > div{grid-template-columns:repeat(3,minmax(0,1fr));gap:6px;}\n            #class1-math-runtime .main-module-tab{min-height:52px;flex-direction:row;gap:6px;font-size:16px;padding:6px 8px;border-radius:15px;}\n            #class1-math-runtime .main-module-tab > span:first-child{font-size:18px !important;}\n            #class1-math-runtime .main-module-tab::after{bottom:-4px;height:2px;}\n            #class1-math-runtime #header-star-box{transform:none !important;margin-left:0 !important;height:52px !important;min-height:52px !important;padding:3px 6px !important;}\n            #class1-math-runtime #header-star-box > div > span:first-child{font-size:16px !important;padding:2px 5px !important;}\n            #class1-math-runtime #header-star-box > div > span:first-child i{font-size:16px !important;}\n            #class1-math-runtime #star-green-count,#class1-math-runtime #star-red-count{font-size:16px !important;}\n            #class1-math-runtime #user-info-box{margin-left:0 !important;min-width:0;text-align:right;}\n            #class1-math-runtime #user-info-box .admin-manage-label{display:none !important;}\n            #class1-math-runtime #user-info-box button[title=\"Quản lý tài khoản\"]{width:34px !important;padding-left:0 !important;padding-right:0 !important;justify-content:center !important;}\n            #class1-math-runtime #app-main-banner{aspect-ratio:4/1;border-radius:0;}\n            #class1-math-runtime .app-main-banner-copy{width:39%;left:51%;top:49%;}\n            #class1-math-runtime .app-main-banner-title{font-size:clamp(16px,4.2vw,20px);}\n            #class1-math-runtime .app-main-banner-teacher{font-size:clamp(16px,2.8vw,16px);margin-top:2px;}\n            #class1-math-runtime #app-context-banner{min-height:52px;border-radius:0;padding:6px 8px;}\n            #class1-math-runtime #header-learning-tabs{gap:4px;}\n            #class1-math-runtime #header-level2-tab > button,#class1-math-runtime #header-level3-tab > div,#class1-math-runtime #header-level4-tab > div{height:34px !important;max-width:150px !important;padding:0 9px !important;border-radius:11px !important;}\n            #class1-math-runtime #header-level2-title,#class1-math-runtime #header-level3-title,#class1-math-runtime #header-level4-title{font-size:16px !important;}\n            #class1-math-runtime #app-footer{min-height:64px;margin-top:8px;border-radius:0;}\n            #class1-math-runtime #app-footer .footer-title{font-size:16px;}\n            #class1-math-runtime #app-footer .footer-sub{font-size:16px;}\n            #class1-math-runtime #view-lecture,#class1-math-runtime #view-bai-hoc-lesson,#class1-math-runtime #view-game-play,#class1-math-runtime #view-quiz > .pastel-card{padding-top:6px !important;padding-bottom:6px !important;}\n        }\n\n\n        /* TOAN 1 - CHUAN BANNER / FOOTER / NEN THEO TV1 2026-09-22 */\n        #class1-math-runtime,#class1-math-runtime,#class1-math-runtime #screen-dashboard,#class1-math-runtime #app-viewport,#class1-math-runtime #view-dashboard-grid { background:#ffffff !important; }\n\n        /* Khám phá: giữ pastel nhẹ theo nhóm, bỏ shadow để nền trang thật sự thoáng. */\n        #class1-math-runtime #view-dashboard-grid .pastel-card,#class1-math-runtime #view-dashboard-grid .pastel-card:hover {\n            box-shadow:none !important;\n            border-width:1px !important;\n        }\n        #class1-math-runtime #view-dashboard-grid .pastel-card:has(h3.text-pink-700)    { background:rgba(253,242,248,.82) !important; }\n        #class1-math-runtime #view-dashboard-grid .pastel-card:has(h3.text-purple-700)  { background:rgba(250,245,255,.84) !important; }\n        #class1-math-runtime #view-dashboard-grid .pastel-card:has(h3.text-blue-700)    { background:rgba(239,246,255,.86) !important; }\n        #class1-math-runtime #view-dashboard-grid .pastel-card:has(h3.text-fuchsia-700) { background:rgba(253,244,255,.84) !important; }\n        #class1-math-runtime #view-dashboard-grid .pastel-card:has(h3.text-emerald-700) { background:rgba(236,253,245,.86) !important; }\n        #class1-math-runtime #view-dashboard-grid .pastel-card:has(h3.text-indigo-700)  { background:rgba(238,242,255,.86) !important; }\n        #class1-math-runtime #view-dashboard-grid .pastel-card:has(h3.text-amber-700)   { background:rgba(255,251,235,.88) !important; }\n        #class1-math-runtime #view-dashboard-grid .pastel-card:has(h3.text-rose-700)    { background:rgba(255,241,242,.86) !important; }\n        #class1-math-runtime #view-dashboard-grid .pastel-card:has(h3.text-teal-700)    { background:rgba(240,253,250,.88) !important; }\n        #class1-math-runtime #view-dashboard-grid .pastel-card:has(h3.text-yellow-700)  { background:rgba(254,252,232,.90) !important; }\n\n        /* Toán 1 - tăng cỡ chữ 6 tab chính trên header cho cân với tiêu đề card Khám phá. */\n        @media (min-width:768px){\n            #class1-math-runtime .main-module-tab{ font-size:16px !important; }\n        }\n\n        /* Breadcrumb desktop: tự giãn theo nội dung, tối đa 440px như TV1. */\n        @media (min-width:768px){\n            #class1-math-runtime #header-level2-tab > button,#class1-math-runtime #header-level3-tab > div,#class1-math-runtime #header-level4-tab > div {\n                width:auto !important; min-width:0 !important; max-width:440px !important;\n                padding-left:18px !important; padding-right:18px !important;\n            }\n            #class1-math-runtime #header-level2-title,#class1-math-runtime #header-level3-title,#class1-math-runtime #header-level4-title {\n                font-size:16px !important; max-width:400px !important; overflow:hidden !important;\n                text-overflow:ellipsis !important; white-space:nowrap !important;\n            }\n        }\n\n    \n        /* TOAN 1 - FOOTER 8:1 DONG BO TV2 2026-09-22 */\n        #class1-math-runtime #app-footer {\n            aspect-ratio: 8 / 1 !important;\n            min-height: 0 !important;\n            height: auto !important;\n            background-image: url('footer-bg.jpg') !important;\n            background-size: cover !important;\n            background-position: center !important;\n            background-repeat: no-repeat !important;\n        }\n\n        @media (max-width: 767px) {\n            #class1-math-runtime #app-footer {\n                aspect-ratio: 8 / 1 !important;\n                min-height: 0 !important;\n                height: auto !important;\n            }\n        }\n\n\n        /* TOAN 1 - FOOTER RONG BANG BANNER */\n        #class1-math-runtime #app-footer {\n            width: calc(100% - 1rem) !important;\n            max-width: 82rem !important;\n            box-sizing: border-box !important;\n        }\n\n        @media (max-width: 767px) {\n            #class1-math-runtime #app-footer {\n                width: calc(100% - 0.5rem) !important;\n                max-width: none !important;\n            }\n        }\n\n\n        /* TOAN 1 - MOBILE: NUT QUAN LY CHI GIU ICON */\n        @media (max-width: 767px) {\n            #class1-math-runtime #user-info-box button[title=\"Quản lý tài khoản\"] {\n                width: 34px !important;\n                min-width: 34px !important;\n                padding-left: 0 !important;\n                padding-right: 0 !important;\n                justify-content: center !important;\n                font-size: 0 !important;\n                overflow: hidden !important;\n                white-space: nowrap !important;\n            }\n\n            #class1-math-runtime #user-info-box button[title=\"Quản lý tài khoản\"] i {\n                font-size: 16px !important;\n                margin: 0 !important;\n            }\n\n            #class1-math-runtime #user-info-box button[title=\"Quản lý tài khoản\"] .admin-manage-label {\n                display: none !important;\n            }\n        }\n\n\n        /* TOAN 1 - MOBILE: TANG CO CHU HEADER VA CARD KHAM PHA */\n        @media (max-width: 767px) {\n            #class1-math-runtime .main-module-tab {\n                font-size: 16px !important;\n                font-weight: 900 !important;\n            }\n            #class1-math-runtime #view-dashboard-grid .pastel-card h3 {\n                font-size: 18px !important;\n                line-height: 1.25 !important;\n            }\n            #class1-math-runtime #view-dashboard-grid .pastel-card > div:last-child {\n                font-size: 16px !important;\n                line-height: 1.45 !important;\n            }\n        }\n\n\n\n        /* =========================================================\n           MỤC 12 - HỌC TOÁN THEO PHƯƠNG PHÁP MỚI / EPSILON METHOD\n           ========================================================= */\n        #class1-math-runtime #view-epsilon-method-hub,#class1-math-runtime #view-number-sense,#class1-math-runtime #view-operation-sense{background:transparent!important;border:0!important;box-shadow:none!important;padding:0!important;}\n        #class1-math-runtime .em-hero{border:1.5px solid #e9d5ff;border-radius:28px;background:linear-gradient(135deg,#fff7fb 0%,#faf5ff 46%,#eff6ff 100%);padding:20px 22px;display:flex;align-items:center;justify-content:space-between;gap:20px;box-shadow:0 7px 20px rgba(126,34,206,.06);}\n        #class1-math-runtime .em-hero-flow{max-width:390px;border-radius:20px;background:rgba(255,255,255,.88);border:1px solid #d8b4fe;padding:11px 14px;text-align:center;font-size:16px;line-height:1.55;font-weight:900;color:#7e22ce;}\n        #class1-math-runtime .em-track-card{width:100%;border:2px solid #ede9fe;border-radius:24px;background:linear-gradient(180deg,#fff,#fdfcff);padding:17px;box-shadow:0 5px 16px rgba(76,29,149,.06);transition:transform .16s,box-shadow .16s,border-color .16s;}\n        #class1-math-runtime .em-track-card:hover{transform:translateY(-2px);box-shadow:0 11px 25px rgba(76,29,149,.10);border-color:#d8b4fe;}\n        #class1-math-runtime .em-track-icon{width:48px;height:48px;border-radius:17px;background:linear-gradient(135deg,#fce7f3,#ede9fe,#dbeafe);display:flex;align-items:center;justify-content:center;font-size:25px;flex:0 0 auto;}\n        #class1-math-runtime .em-method-badge{flex:0 0 auto;border-radius:999px;border:1px solid #f0abfc;background:#fdf4ff;color:#a21caf;padding:5px 9px;font-size:16px;font-weight:900;}\n        #class1-math-runtime .em-stat-pill{border-radius:999px;border:1px solid #e2e8f0;background:#f8fafc;padding:5px 9px;}\n\n        /* 12.1 - EPSILON NUMBER SENSE */\n        #class1-math-runtime .ns-hero{border:1.5px solid #fbcfe8;border-radius:26px;background:linear-gradient(135deg,#fff7fb 0%,#faf5ff 52%,#f0f9ff 100%);padding:18px 20px;display:flex;align-items:center;justify-content:space-between;gap:18px;}\n        #class1-math-runtime .ns-hero-flow{max-width:360px;border-radius:18px;background:rgba(255,255,255,.82);border:1px solid #e9d5ff;padding:10px 13px;text-align:center;font-size:16px;line-height:1.45;font-weight:900;color:#7e22ce;}\n        #class1-math-runtime .ns-journey-card{width:100%;border:1.5px solid #ede9fe;border-radius:22px;background:#fff;padding:14px;box-shadow:0 4px 13px rgba(76,29,149,.06);transition:transform .16s,box-shadow .16s,border-color .16s;}\n        #class1-math-runtime .ns-journey-card:hover{transform:translateY(-2px);box-shadow:0 9px 22px rgba(76,29,149,.10);border-color:#d8b4fe;}\n        #class1-math-runtime .ns-journey-icon{width:42px;height:42px;border-radius:15px;background:linear-gradient(135deg,#fce7f3,#ede9fe);display:flex;align-items:center;justify-content:center;font-size:22px;flex:0 0 auto;}\n        #class1-math-runtime .ns-teacher-bubble{display:flex;align-items:flex-start;gap:10px;border:1.5px solid #fbcfe8;border-radius:20px;background:linear-gradient(135deg,#fff1f7,#fff);padding:12px 14px;}\n        #class1-math-runtime .ns-listen-btn{flex:0 0 auto;border-radius:14px;border:1px solid #fbcfe8;background:#fff;color:#be185d;padding:7px 10px;font-size:16px;font-weight:900;white-space:nowrap;}\n        #class1-math-runtime .ns-listen-btn:hover{background:#fdf2f8;}\n        #class1-math-runtime .ns-workspace{border:1.5px solid #e9d5ff;border-radius:26px;background:linear-gradient(180deg,#fff 0%,#fdfcff 100%);padding:16px;min-height:340px;display:flex;flex-direction:column;justify-content:center;box-shadow:0 5px 18px rgba(76,29,149,.05);}\n        #class1-math-runtime .ns-visual-box{min-height:126px;border-radius:22px;border:2px dashed #ddd6fe;background:linear-gradient(135deg,#faf5ff,#fff7ed);padding:18px;display:flex;align-items:center;justify-content:center;}\n        #class1-math-runtime .ns-object-row{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:10px;}\n        #class1-math-runtime .ns-static-object{display:inline-flex;align-items:center;justify-content:center;min-width:42px;min-height:42px;font-size:38px;line-height:1.05;}\n        #class1-math-runtime .ns-choice{min-height:56px;border-radius:17px;border:2px solid #e9d5ff;background:#fff;padding:10px 12px;font-size:18px;font-weight:900;color:#4c1d95;box-shadow:0 3px 8px rgba(76,29,149,.06);transition:all .15s;}\n        #class1-math-runtime .ns-choice:hover{border-color:#c084fc;background:#faf5ff;transform:translateY(-1px);}\n        #class1-math-runtime .ns-primary-btn{border-radius:16px;background:linear-gradient(135deg,#ec4899,#8b5cf6);color:#fff;padding:10px 16px;font-weight:900;font-size:16px;box-shadow:0 5px 13px rgba(168,85,247,.20);}\n        #class1-math-runtime .ns-secondary-btn{border-radius:14px;background:#fff;border:1.5px solid #e9d5ff;color:#7e22ce;padding:9px 13px;font-weight:900;font-size:16px;}\n        #class1-math-runtime .ns-evidence-pill{display:inline-flex;align-items:center;border-radius:999px;background:#f8fafc;border:1px solid #e2e8f0;padding:5px 9px;font-size:16px;font-weight:900;color:#64748b;}\n        #class1-math-runtime .ns-touch-object{position:relative;width:68px;height:68px;border-radius:20px;border:2px solid #e9d5ff;background:#fff;font-size:38px;display:inline-flex;align-items:center;justify-content:center;box-shadow:0 3px 8px rgba(76,29,149,.06);transition:all .15s;}\n        #class1-math-runtime .ns-touch-object.is-counted{background:#ecfdf5;border-color:#6ee7b7;transform:scale(.95);}\n        #class1-math-runtime .ns-count-badge{position:absolute;right:-6px;top:-8px;width:26px;height:26px;border-radius:999px;background:#10b981;color:white;font-size:16px;display:flex;align-items:center;justify-content:center;border:2px solid white;}\n        #class1-math-runtime .ns-bank,#class1-math-runtime .ns-tray,#class1-math-runtime .ns-group-card,#class1-math-runtime .ns-whole-card,#class1-math-runtime .ns-part-card{border-radius:20px;border:1.5px solid #e9d5ff;background:#fafaff;padding:14px;text-align:center;}\n        #class1-math-runtime .ns-tray{min-height:155px;background:linear-gradient(180deg,#fff7fb,#fff);border-style:dashed;border-color:#f9a8d4;}\n        #class1-math-runtime .ns-bank-object{width:54px;height:54px;border-radius:16px;border:1.5px solid #e9d5ff;background:white;font-size:30px;cursor:grab;}\n        #class1-math-runtime .ns-symbol-card{max-width:560px;margin:0 auto;border-radius:22px;border:2px solid #ddd6fe;background:linear-gradient(135deg,#f5f3ff,#fff);padding:22px;font-size:34px;font-weight:900;line-height:1.5;color:#4c1d95;}\n        #class1-math-runtime .ns-frame{max-width:460px;margin:0 auto;display:grid;grid-template-columns:repeat(5,minmax(48px,1fr));border:3px solid #7c3aed;border-radius:14px;overflow:hidden;background:#fff;}\n        #class1-math-runtime .ns-frame.ns-frame-10{grid-template-rows:repeat(2,68px);}\n        #class1-math-runtime .ns-frame-cell{height:76px;border-right:2px solid #c4b5fd;border-bottom:2px solid #c4b5fd;background:white;font-size:42px;font-weight:900;color:#ec4899;}\n        #class1-math-runtime .ns-frame-cell:nth-child(5n){border-right:0;}\n        #class1-math-runtime .ns-frame-cell.is-filled{background:#fdf2f8;}\n\n        /* 12.2 - EPSILON OPERATIONAL SENSE */\n        #class1-math-runtime .os-hero{border:1.5px solid #ddd6fe;border-radius:26px;background:linear-gradient(135deg,#faf5ff 0%,#eef2ff 52%,#eff6ff 100%);padding:18px 20px;display:flex;align-items:center;justify-content:space-between;gap:18px;}\n        #class1-math-runtime .os-hero-flow{max-width:390px;border-radius:18px;background:rgba(255,255,255,.85);border:1px solid #c7d2fe;padding:10px 13px;text-align:center;font-size:16px;line-height:1.45;font-weight:900;color:#5b21b6;}\n        #class1-math-runtime .os-journey-icon{width:42px;height:42px;border-radius:15px;background:linear-gradient(135deg,#ede9fe,#dbeafe);display:flex;align-items:center;justify-content:center;font-size:22px;flex:0 0 auto;}\n        #class1-math-runtime .os-teacher-bubble{border-color:#ddd6fe;background:linear-gradient(135deg,#faf5ff,#fff);}\n        #class1-math-runtime .os-bank-object{width:54px;height:54px;border-radius:16px;border:1.5px solid #c7d2fe;background:white;font-size:30px;cursor:pointer;box-shadow:0 3px 8px rgba(79,70,229,.06);transition:all .15s;}\n        #class1-math-runtime .os-bank-object:hover{transform:translateY(-2px);border-color:#8b5cf6;}\n        #class1-math-runtime .os-action-object{position:relative;width:68px;height:68px;border-radius:20px;border:2px solid #ddd6fe;background:#fff;font-size:38px;display:inline-flex;align-items:center;justify-content:center;box-shadow:0 3px 8px rgba(79,70,229,.06);transition:all .15s;}\n        #class1-math-runtime .os-action-object.is-removed{opacity:.42;transform:translateY(-12px) scale(.88);border-style:dashed;border-color:#fb7185;background:#fff1f2;}\n        #class1-math-runtime .os-action-object.is-selected{background:#eef2ff;border-color:#818cf8;transform:scale(.94);}\n        #class1-math-runtime .os-away-mark{position:absolute;right:-5px;top:-8px;width:26px;height:26px;border-radius:999px;background:#f43f5e;color:white;font-size:16px;display:flex;align-items:center;justify-content:center;border:2px solid white;}\n        #class1-math-runtime .os-story-card{border:1.5px solid #c7d2fe;border-radius:18px;background:#fff;padding:12px;text-align:center;min-height:86px;display:flex;flex-direction:column;justify-content:center;}\n        #class1-math-runtime .os-story-label{font-size:16px;font-weight:900;color:#6366f1;letter-spacing:.08em;}\n        #class1-math-runtime .os-story-value{font-size:30px;line-height:1.1;font-weight:900;color:#312e81;margin-top:5px;}\n        #class1-math-runtime .os-pair-row{display:grid;grid-auto-flow:column;grid-auto-columns:minmax(42px,1fr);gap:5px;}\n        #class1-math-runtime .os-pair-cell{min-height:50px;border-radius:13px;border:1px solid #dbeafe;background:#fff;display:flex;align-items:center;justify-content:center;font-size:29px;}\n        #class1-math-runtime .os-balance{display:grid;grid-template-columns:1fr auto 1fr;align-items:end;gap:12px;max-width:720px;margin:0 auto;}\n        #class1-math-runtime .os-balance-pan{min-height:110px;border-radius:20px 20px 28px 28px;border:2px solid #c7d2fe;background:linear-gradient(180deg,#fff,#eef2ff);display:flex;align-items:center;justify-content:center;font-size:28px;font-weight:900;color:#312e81;box-shadow:0 8px 0 -4px #c7d2fe;}\n        #class1-math-runtime .os-path-cell{width:48px;height:48px;border-radius:14px;border:1.5px solid #c7d2fe;background:white;display:flex;align-items:center;justify-content:center;font-weight:900;color:#475569;transition:all .15s;}\n        #class1-math-runtime .os-path-cell.is-current{background:linear-gradient(135deg,#8b5cf6,#4f46e5);color:white;border-color:#4f46e5;transform:translateY(-3px) scale(1.08);box-shadow:0 6px 14px rgba(79,70,229,.25);}\n\n        @media(max-width:767px){\n            #class1-math-runtime .em-hero,#class1-math-runtime .ns-hero,#class1-math-runtime .os-hero{padding:14px;align-items:flex-start;flex-direction:column;}\n            #class1-math-runtime .em-hero-flow,#class1-math-runtime .ns-hero-flow,#class1-math-runtime .os-hero-flow{max-width:none;width:100%;}\n            #class1-math-runtime .em-track-card{padding:14px;}\n            #class1-math-runtime .ns-workspace{padding:12px;min-height:300px}#class1-math-runtime .ns-static-object{font-size:31px;min-width:34px;min-height:34px}#class1-math-runtime .ns-touch-object{width:58px;height:58px;font-size:31px}#class1-math-runtime .ns-choice{min-height:50px;font-size:16px}#class1-math-runtime .ns-frame-cell{height:60px;font-size:34px}#class1-math-runtime .ns-frame.ns-frame-10{grid-template-rows:repeat(2,58px)}#class1-math-runtime .ns-symbol-card{font-size:28px;padding:16px;}\n            #class1-math-runtime .ns-teacher-bubble{flex-wrap:wrap}#class1-math-runtime .ns-listen-btn{margin-left:34px;}\n            #class1-math-runtime .os-action-object{width:58px;height:58px;font-size:31px}#class1-math-runtime .os-story-card{padding:8px;min-height:74px}#class1-math-runtime .os-story-value{font-size:25px}#class1-math-runtime .os-balance-pan{min-height:90px;font-size:22px}#class1-math-runtime .os-path-cell{width:42px;height:42px}#class1-math-runtime .os-pair-cell{min-height:44px;font-size:24px}\n        }\n\n\n#class1-math-runtime{width:100%;max-width:100%;font-family:'Quicksand','Nunito',system-ui,sans-serif;color:#4a4a4a;user-select:none;position:relative;}\n#class1-math-runtime #screen-dashboard{width:100%!important;max-width:100%!important;padding:0!important;margin:0!important;}\n#class1-math-runtime .app-main-header,#class1-math-runtime #app-banner-slot{display:none!important;}\n#class1-math-runtime #app-viewport{width:100%!important;max-width:100%!important;margin-bottom:0!important;padding-bottom:0!important;}\n/* Module Toán: bỏ khoảng đệm đáy của khung Lớp 1 để nội dung chạm sát footer. */\n#content-stage:has(#class1-math-runtime){padding-bottom:0!important;}\n#content-stage:has(#class1-math-runtime)+.app-footer{margin-top:0!important;}\n#class1-math-runtime #view-dashboard-grid{align-items:stretch;}\n#class1-math-runtime .fixed{position:fixed;}\n#class1-math-runtime img{max-width:100%;}\n#class1-math-runtime button,#class1-math-runtime input,#class1-math-runtime select,#class1-math-runtime textarea{font:inherit;}\n#class1-math-runtime [hidden]{display:none!important;}\n\n/* Class 1 compact vertical layout: tiết kiệm chiều cao, sát banner và footer. */\n#class1-math-runtime{min-height:0!important;height:auto!important;display:block!important;}\n#class1-math-runtime #screen-dashboard{min-height:0!important;height:auto!important;gap:0!important;}\n#class1-math-runtime #screen-dashboard > *{margin-block-start:0!important;margin-block-end:0!important;}\n#class1-math-runtime #app-viewport{min-height:0!important;height:auto!important;margin-top:0!important;margin-bottom:0!important;padding-top:0!important;padding-bottom:0!important;}\n#content-stage:has(#class1-math-runtime){min-height:0!important;padding:.12rem .05rem 0!important;}\n#content-stage:has(#class1-math-runtime)+.app-footer{margin-top:0!important;}\n#class1-math-runtime #view-dashboard-grid,\n#class1-math-runtime #view-epsilon-method-hub,\n#class1-math-runtime #view-number-sense,\n#class1-math-runtime #view-operation-sense,\n#class1-math-runtime #view-bai-hoc-hub,\n#class1-math-runtime #view-bai-hoc-lesson,\n#class1-math-runtime #view-lecture,\n#class1-math-runtime #view-quiz,\n#class1-math-runtime #view-roadmap,\n#class1-math-runtime #view-minigame-hub,\n#class1-math-runtime #view-game-play,\n#class1-math-runtime #view-exam-hub,\n#class1-math-runtime #view-result{margin-top:0!important;margin-bottom:0!important;}\n#class1-math-runtime #view-bai-hoc-hub,\n#class1-math-runtime #view-bai-hoc-lesson,\n#class1-math-runtime #view-lecture,\n#class1-math-runtime #view-roadmap,\n#class1-math-runtime #view-minigame-hub,\n#class1-math-runtime #view-game-play,\n#class1-math-runtime #view-exam-hub{min-height:0!important;padding-top:.35rem!important;padding-bottom:.35rem!important;}\n#class1-math-runtime #view-exam-hub{justify-content:flex-start!important;}\n#class1-math-runtime #view-quiz{gap:.3rem!important;}\n#class1-math-runtime #view-quiz > .pastel-card{min-height:0!important;padding-top:.35rem!important;padding-bottom:.35rem!important;}\n#class1-math-runtime #view-quiz #question-box{margin-top:0!important;margin-bottom:0!important;}\n#class1-math-runtime #view-dashboard-grid{padding-top:0!important;padding-bottom:0!important;}\n\n@media(max-width:767px){\n  #content-stage:has(#class1-math-runtime){padding-top:.08rem!important;padding-bottom:0!important;}\n  #class1-math-runtime #view-bai-hoc-hub,\n  #class1-math-runtime #view-bai-hoc-lesson,\n  #class1-math-runtime #view-lecture,\n  #class1-math-runtime #view-roadmap,\n  #class1-math-runtime #view-minigame-hub,\n  #class1-math-runtime #view-game-play,\n  #class1-math-runtime #view-exam-hub,\n  #class1-math-runtime #view-quiz > .pastel-card{padding-top:.25rem!important;padding-bottom:.25rem!important;}\n}\n";

const MATH_SHELL_BREADCRUMB_CSS_ = `
body:has(#class1-math-runtime) #sub-pill.math-sub-breadcrumbs{
    min-width:0!important;
    width:auto!important;
    max-width:calc(100% - 1rem)!important;
    min-height:0!important;
    padding:0!important;
    border:0!important;
    border-radius:0!important;
    background:transparent!important;
    box-shadow:none!important;
    backdrop-filter:none!important;
    -webkit-backdrop-filter:none!important;
    display:flex!important;
    align-items:center!important;
    gap:.34rem!important;
    overflow-x:auto!important;
    overflow-y:hidden!important;
    scrollbar-width:none!important;
    white-space:nowrap!important;
}
body:has(#class1-math-runtime) #sub-pill.math-sub-breadcrumbs::-webkit-scrollbar{display:none!important;}
body:has(#class1-math-runtime) #sub-pill.math-sub-breadcrumbs .math-breadcrumb-sep{
    flex:0 0 auto;
    color:#c084fc;
    font-size:16px;
    font-weight:900;
}
body:has(#class1-math-runtime) #sub-pill.math-sub-breadcrumbs .math-breadcrumb-tab{
    flex:0 0 auto;
    height:38px;
    max-width:min(430px,42vw);
    padding:0 16px;
    border-radius:13px;
    display:inline-flex;
    align-items:center;
    justify-content:center;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
    font-size:16px;
    font-weight:900;
    line-height:1;
    box-shadow:0 2px 7px rgba(76,29,149,.08);
    cursor:default;
}
body:has(#class1-math-runtime) #sub-pill.math-sub-breadcrumbs button.math-breadcrumb-tab{
    cursor:pointer;
    transition:background .16s,border-color .16s,box-shadow .16s,transform .16s;
}
body:has(#class1-math-runtime) #sub-pill.math-sub-breadcrumbs button.math-breadcrumb-tab:hover{
    transform:translateY(-1px);
    box-shadow:0 4px 11px rgba(76,29,149,.13);
}
body:has(#class1-math-runtime) #sub-pill.math-sub-breadcrumbs .math-breadcrumb-level2{
    color:#be185d;
    border:1.5px solid #f9a8d4;
    background:rgba(255,255,255,.78);
}
body:has(#class1-math-runtime) #sub-pill.math-sub-breadcrumbs .math-breadcrumb-level3{
    color:#7e22ce;
    border:1.5px solid #d8b4fe;
    background:rgba(255,255,255,.72);
}
body:has(#class1-math-runtime) #sub-pill.math-sub-breadcrumbs .math-breadcrumb-level4{
    color:#b45309;
    border:1.5px solid #fde68a;
    background:rgba(255,255,255,.72);
}
/* Toán trong Lớp 1: tăng nhẹ chữ thống kê Đúng/Sai theo yêu cầu UI. */
body:has(#class1-math-runtime) #score-box{
    font-size:16px!important;
    font-weight:900!important;
}
body:has(#class1-math-runtime) #score-box strong{font-size:17px!important;}

/* Điều hướng câu hỏi: cùng cỡ rõ hơn trên toàn bộ các luồng dùng quiz engine. */
body:has(#class1-math-runtime) #class1-math-runtime #btn-prev-q-prac,
body:has(#class1-math-runtime) #class1-math-runtime #btn-next-q-prac,
body:has(#class1-math-runtime) #class1-math-runtime #btn-prev-q-exam,
body:has(#class1-math-runtime) #class1-math-runtime #btn-next-q-exam,
body:has(#class1-math-runtime) #class1-math-runtime #practice-step-indicator,
body:has(#class1-math-runtime) #class1-math-runtime #practice-step-text{
    font-size:16px!important;
    font-weight:900!important;
}
@media(max-width:767px){
    body:has(#class1-math-runtime) #score-box{font-size:16px!important;}
    body:has(#class1-math-runtime) #score-box strong{font-size:16px!important;}
    body:has(#class1-math-runtime) #class1-math-runtime #btn-prev-q-prac,
    body:has(#class1-math-runtime) #class1-math-runtime #btn-next-q-prac,
    body:has(#class1-math-runtime) #class1-math-runtime #btn-prev-q-exam,
    body:has(#class1-math-runtime) #class1-math-runtime #btn-next-q-exam,
    body:has(#class1-math-runtime) #class1-math-runtime #practice-step-indicator,
    body:has(#class1-math-runtime) #class1-math-runtime #practice-step-text{font-size:16px!important;}
    body:has(#class1-math-runtime) #sub-pill.math-sub-breadcrumbs{max-width:calc(100% - .35rem)!important;gap:.22rem!important;}
    body:has(#class1-math-runtime) #sub-pill.math-sub-breadcrumbs .math-breadcrumb-tab{
        height:34px;
        max-width:44vw;
        padding:0 10px;
        border-radius:11px;
        font-size:16px;
    }
    body:has(#class1-math-runtime) #sub-pill.math-sub-breadcrumbs .math-breadcrumb-sep{font-size:16px;}
}
`;

const MATH_HUB_CARD_CSS_ = `
/* Class 1 Math hub cards: stronger pastel, larger type, stable varied palette. */
#class1-math-runtime #view-dashboard-grid .pastel-card{
    border-width:1px!important;
    box-shadow:none!important;
    min-height:96px!important;
    padding:6px 10px!important;
}
#class1-math-runtime #view-dashboard-grid .math-topic-card{
    display:flex!important;
    flex-direction:column!important;
    justify-content:space-between!important;
}
#class1-math-runtime #view-dashboard-grid .math-topic-head{
    align-items:center!important;
}
#class1-math-runtime #view-dashboard-grid .math-topic-icon{
    margin-top:0!important;
}
#class1-math-runtime #view-dashboard-grid .math-topic-title{
    margin:0!important;
    transform:none!important;
}
#class1-math-runtime #view-dashboard-grid .math-topic-foot{
    margin-top:4px!important;
    padding-top:4px!important;
    align-items:flex-end!important;
}
#class1-math-runtime #view-dashboard-grid .pastel-card:has(h3.text-pink-700){background:#fbcfe8!important;border-color:#f9a8d4!important;}
#class1-math-runtime #view-dashboard-grid .pastel-card:has(h3.text-purple-700){background:#e9d5ff!important;border-color:#d8b4fe!important;}
#class1-math-runtime #view-dashboard-grid .pastel-card:has(h3.text-indigo-700){background:#e0e7ff!important;border-color:#c7d2fe!important;}
#class1-math-runtime #view-dashboard-grid .pastel-card:has(h3.text-cyan-700){background:#cffafe!important;border-color:#a5f3fc!important;}
#class1-math-runtime #view-dashboard-grid .pastel-card:has(h3.text-amber-700){background:#fef3c7!important;border-color:#fde68a!important;}
#class1-math-runtime #view-dashboard-grid .pastel-card:has(h3.text-violet-700){background:#ede9fe!important;border-color:#ddd6fe!important;}
#class1-math-runtime #view-dashboard-grid .pastel-card:has(h3.text-emerald-700){background:#d1fae5!important;border-color:#a7f3d0!important;}
#class1-math-runtime #view-dashboard-grid .pastel-card:has(h3.text-blue-700){background:#dbeafe!important;border-color:#bfdbfe!important;}
#class1-math-runtime #view-dashboard-grid .pastel-card:has(h3.text-rose-700){background:#ffe4e6!important;border-color:#fecdd3!important;}
#class1-math-runtime #view-dashboard-grid .pastel-card:has(h3.text-yellow-700){background:#fef9c3!important;border-color:#fde68a!important;}
#class1-math-runtime #view-dashboard-grid .pastel-card:has(h3.text-fuchsia-700){background:#fae8ff!important;border-color:#f0abfc!important;}
#class1-math-runtime #view-dashboard-grid .pastel-card h3{font-size:18px!important;line-height:1.2!important;}
#class1-math-runtime #view-dashboard-grid .pastel-card > div:last-child > span:first-child{font-size:16px!important;line-height:1.28!important;color:#334155!important;}
#class1-math-runtime #view-dashboard-grid .pastel-card > div:last-child > span:last-child{font-size:16px!important;}
/* Discover hub spacing: top gap equals the grid gap (gap-2 = .5rem). */
#content-stage:has(#class1-math-runtime #view-dashboard-grid:not(.hidden)){padding-top:.5rem!important;}


/* Lessons: larger text and a stable six-color pastel cycle. */
#class1-math-runtime #view-bai-hoc-hub > div{max-width:100%!important;}
#class1-math-runtime #bai-hoc-grid > button{
    min-height:88px!important;
    border-width:1px!important;
    padding:10px 12px!important;
    box-shadow:none!important;
}
#class1-math-runtime #bai-hoc-grid > button:nth-child(6n+1){background:#fbcfe8!important;border-color:#f9a8d4!important;}
#class1-math-runtime #bai-hoc-grid > button:nth-child(6n+2){background:#e9d5ff!important;border-color:#d8b4fe!important;}
#class1-math-runtime #bai-hoc-grid > button:nth-child(6n+3){background:#dbeafe!important;border-color:#bfdbfe!important;}
#class1-math-runtime #bai-hoc-grid > button:nth-child(6n+4){background:#d1fae5!important;border-color:#a7f3d0!important;}
#class1-math-runtime #bai-hoc-grid > button:nth-child(6n+5){background:#fef3c7!important;border-color:#fde68a!important;}
#class1-math-runtime #bai-hoc-grid > button:nth-child(6n+6){background:#cffafe!important;border-color:#a5f3fc!important;}
#class1-math-runtime #bai-hoc-grid > button > div:first-child{font-size:18px!important;line-height:1.25!important;color:#7e22ce!important;}
#class1-math-runtime #bai-hoc-grid > button > div:nth-child(2){font-size:16px!important;line-height:1.38!important;color:#334155!important;margin-top:4px!important;}
#class1-math-runtime #view-bai-hoc-hub h2{font-size:21px!important;}
#class1-math-runtime #bai-hoc-hub-subtitle{font-size:16px!important;}

/* Exercises: same readable typography and varied pastel cards; lock opacity still communicates state. */
#class1-math-runtime #roadmap-svg-container{
    padding:0!important;
    border-width:0!important;
    background:transparent!important;
    box-shadow:none!important;
}
#class1-math-runtime #roadmap-svg-container > div{width:100%!important;}
#class1-math-runtime #roadmap-svg-container button{
    min-height:94px!important;
    border-width:1px!important;
    padding:10px 12px!important;
    box-shadow:none!important;
}
#class1-math-runtime #roadmap-svg-container button:nth-child(6n+1){background:#fbcfe8!important;border-color:#f9a8d4!important;}
#class1-math-runtime #roadmap-svg-container button:nth-child(6n+2){background:#e9d5ff!important;border-color:#d8b4fe!important;}
#class1-math-runtime #roadmap-svg-container button:nth-child(6n+3){background:#dbeafe!important;border-color:#bfdbfe!important;}
#class1-math-runtime #roadmap-svg-container button:nth-child(6n+4){background:#d1fae5!important;border-color:#a7f3d0!important;}
#class1-math-runtime #roadmap-svg-container button:nth-child(6n+5){background:#fef3c7!important;border-color:#fde68a!important;}
#class1-math-runtime #roadmap-svg-container button:nth-child(6n+6){background:#cffafe!important;border-color:#a5f3fc!important;}
#class1-math-runtime #roadmap-svg-container button > div:first-child span:first-child{font-size:18px!important;line-height:1.25!important;color:#6d28d9!important;}
#class1-math-runtime #roadmap-svg-container button > div:nth-child(2){font-size:16px!important;line-height:1.35!important;color:#334155!important;}
#class1-math-runtime #roadmap-svg-container button > div:nth-child(3){font-size:16px!important;line-height:1.3!important;}
#class1-math-runtime #view-roadmap h2{font-size:20px!important;}
#class1-math-runtime #view-roadmap h2 + p{font-size:16px!important;}

/* Review/subtopic cards: keep controlled palette but make color and type easier to see. */
#class1-math-runtime #lecture-subtopics-list > button{border-width:1px!important;font-size:16px!important;line-height:1.35!important;padding:10px 13px!important;}
#class1-math-runtime #lecture-subtopics-list > button:nth-child(6n+1){background:#fbcfe8!important;}
#class1-math-runtime #lecture-subtopics-list > button:nth-child(6n+2){background:#d1fae5!important;}
#class1-math-runtime #lecture-subtopics-list > button:nth-child(6n+3){background:#e9d5ff!important;}
#class1-math-runtime #lecture-subtopics-list > button:nth-child(6n+4){background:#fef3c7!important;}
#class1-math-runtime #lecture-subtopics-list > button:nth-child(6n+5){background:#e0e7ff!important;}
#class1-math-runtime #lecture-subtopics-list > button:nth-child(6n+6){background:#ffe4e6!important;}

/* Exam hub cards: same pastel family and larger labels. */
#class1-math-runtime #exam-categories-grid > div{border-width:1px!important;min-height:225px!important;box-shadow:none!important;}
#class1-math-runtime #exam-categories-grid > div:nth-child(1){background:#fbcfe8!important;border-color:#f9a8d4!important;}
#class1-math-runtime #exam-categories-grid > div:nth-child(2){background:#e9d5ff!important;border-color:#d8b4fe!important;}
#class1-math-runtime #exam-categories-grid > div:nth-child(3){background:#fef3c7!important;border-color:#fde68a!important;}
#class1-math-runtime #exam-categories-grid h3{font-size:21px!important;line-height:1.25!important;}
#class1-math-runtime #exam-categories-grid p{font-size:17px!important;line-height:1.4!important;}
#class1-math-runtime #exam-categories-grid span{font-size:16px!important;}
#class1-math-runtime #exam-categories-grid button{font-size:16px!important;line-height:1.25!important;}
#class1-math-runtime #view-exam-hub > div > .text-center h2{font-size:22px!important;line-height:1.25!important;}
#class1-math-runtime #view-exam-hub > div > .text-center p{font-size:16px!important;line-height:1.4!important;}

/* Mini games: use the full module width, reduce card height, keep larger readable type. */
#class1-math-runtime #view-minigame-hub > div{width:100%!important;max-width:100%!important;}
#class1-math-runtime #minigame-grid{width:100%!important;grid-template-columns:repeat(4,minmax(0,1fr))!important;gap:10px!important;}
#class1-math-runtime #minigame-grid > div{
    min-height:122px!important;
    padding:11px 13px!important;
    border-width:1px!important;
    border-radius:22px!important;
    box-shadow:none!important;
}
#class1-math-runtime #minigame-grid > div:nth-child(6n+1){background:#ffe4e6!important;border-color:#fda4af!important;}
#class1-math-runtime #minigame-grid > div:nth-child(6n+2){background:#dbeafe!important;border-color:#93c5fd!important;}
#class1-math-runtime #minigame-grid > div:nth-child(6n+3){background:#ede9fe!important;border-color:#c4b5fd!important;}
#class1-math-runtime #minigame-grid > div:nth-child(6n+4){background:#fef3c7!important;border-color:#fcd34d!important;}
#class1-math-runtime #minigame-grid > div:nth-child(6n+5){background:#fae8ff!important;border-color:#e879f9!important;}
#class1-math-runtime #minigame-grid > div:nth-child(6n+6){background:#d1fae5!important;border-color:#6ee7b7!important;}
#class1-math-runtime #minigame-grid > div > div.text-4xl{font-size:30px!important;line-height:1!important;margin-top:0!important;}
#class1-math-runtime #minigame-grid h3{font-size:18px!important;line-height:1.25!important;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}
#class1-math-runtime #minigame-grid p{font-size:16px!important;line-height:1.35!important;margin-top:4px!important;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}
#class1-math-runtime #minigame-grid > div > span{font-size:16px!important;}
#class1-math-runtime #view-minigame-hub h2{font-size:20px!important;}
#class1-math-runtime #view-minigame-hub h2 + p{font-size:16px!important;}

/* Math Lab learning cards follow the same stronger pastel visual language. */
#class1-math-runtime .em-track-card,#class1-math-runtime .ns-journey-card{
    border-width:1px!important;
    box-shadow:none!important;
    background:linear-gradient(135deg,#fce7f3 0%,#f3e8ff 55%,#dbeafe 100%)!important;
}

/* Lesson detail: larger typography and richer generated teaching models. */
#class1-math-runtime #view-bai-hoc-lesson #bai-hoc-lesson-meta{font-size:18px!important;line-height:1.3!important;}
#class1-math-runtime #view-bai-hoc-lesson #bai-hoc-page-tabs button{font-size:16px!important;height:44px!important;}
#class1-math-runtime #view-bai-hoc-lesson #bai-hoc-page-content{font-size:16px!important;}
#class1-math-runtime #view-bai-hoc-lesson #bai-hoc-page-content .font-black.text-slate-800.text-sm{font-size:17px!important;line-height:1.4!important;}
#class1-math-runtime #view-bai-hoc-lesson #bai-hoc-page-content .text-sm.md\\:text-base{font-size:16.5px!important;line-height:1.55!important;}
#class1-math-runtime #view-bai-hoc-lesson #bai-hoc-page-content .text-sm.font-semibold{font-size:16px!important;line-height:1.5!important;}
#class1-math-runtime #view-bai-hoc-lesson #bai-hoc-page-content .text-sm.font-bold{font-size:16px!important;line-height:1.5!important;}
#class1-math-runtime #view-bai-hoc-lesson #bai-hoc-page-content input{font-size:17px!important;min-height:44px!important;}
#class1-math-runtime #view-bai-hoc-lesson #bai-hoc-page-content button{font-size:16px!important;min-height:42px;}
#class1-math-runtime #bai-hoc-bottom-nav button{font-size:16px!important;min-height:44px;}
#class1-math-runtime #bai-hoc-bottom-nav > div{font-size:16px!important;}
#class1-math-runtime .math-lesson-visual-title{font-size:18px;line-height:1.35;}
#class1-math-runtime .math-visual-card{background:#fff;border:1px solid #e9d5ff;border-radius:16px;padding:12px;text-align:center;}
#class1-math-runtime .math-visual-caption{margin-top:8px;font-size:16px;line-height:1.45;font-weight:800;color:#475569;}
#class1-math-runtime .math-big-number{font-size:42px;line-height:1;font-weight:950;color:#7c3aed;margin-bottom:10px;}
#class1-math-runtime .math-symbol{font-size:34px;line-height:1;font-weight:950;color:#7c3aed;text-align:center;}
#class1-math-runtime .math-object-chip{border:1px solid #e2e8f0;background:#fff;border-radius:12px;padding:9px 8px;font-size:16px;font-weight:900;color:#475569;}
#class1-math-runtime .math-position-chip{border:1px solid #a5f3fc;background:#ecfeff;border-radius:12px;padding:10px 8px;font-size:16px;font-weight:900;color:#0e7490;}
@media(max-width:767px){
    #class1-math-runtime #view-bai-hoc-lesson #bai-hoc-lesson-meta{font-size:16px!important;}
    #class1-math-runtime #view-bai-hoc-lesson #bai-hoc-page-tabs button{font-size:16px!important;height:42px!important;}
    #class1-math-runtime .math-big-number{font-size:36px;}
    #class1-math-runtime .math-symbol{font-size:28px;}
    #class1-math-runtime .math-visual-caption{font-size:16px;}
}

@media(max-width:1023px){
    #class1-math-runtime #minigame-grid{grid-template-columns:repeat(3,minmax(0,1fr))!important;}
}
@media(max-width:767px){
    #class1-math-runtime #view-dashboard-grid .pastel-card h3{font-size:17px!important;}
    #class1-math-runtime #view-dashboard-grid .pastel-card > div:last-child > span:first-child{font-size:16px!important;}
    #class1-math-runtime #bai-hoc-grid > button > div:first-child,
    #class1-math-runtime #roadmap-svg-container button > div:first-child span:first-child{font-size:17px!important;}
    #class1-math-runtime #bai-hoc-grid > button > div:nth-child(2),
    #class1-math-runtime #roadmap-svg-container button > div:nth-child(2){font-size:16px!important;}
    #class1-math-runtime #minigame-grid{grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:8px!important;}
    #class1-math-runtime #minigame-grid > div{min-height:118px!important;padding:10px!important;}
    #class1-math-runtime #minigame-grid h3{font-size:16.5px!important;}
    #class1-math-runtime #minigame-grid p{font-size:16px!important;}
}
`;

const MATH_EXPLORE_ICON_TEXT_CSS_ = `

/* Class 1 Math | Only the 12 Explore cards: readable icons and typography. */
#class1-math-runtime #view-dashboard-grid > .math-topic-card{
    min-height:146px!important;
    padding:12px 12px 10px!important;
    transition:border-color .18s ease,box-shadow .18s ease!important;
}
#class1-math-runtime #view-dashboard-grid > .math-topic-card .math-topic-head{
    display:flex!important;align-items:center!important;gap:11px!important;min-width:0!important;
}
#class1-math-runtime #view-dashboard-grid > .math-topic-card .math-topic-icon{
    box-sizing:border-box!important;width:60px!important;height:60px!important;
    min-width:60px!important;min-height:60px!important;flex:0 0 60px!important;
    border-width:2px!important;border-radius:17px!important;
    font-family:'Apple Color Emoji','Segoe UI Emoji','Noto Color Emoji',sans-serif!important;
    font-size:36px!important;line-height:1!important;font-weight:400!important;
    opacity:1!important;filter:saturate(1.22) contrast(1.04)!important;
    box-shadow:0 3px 9px rgba(109,40,217,.16),inset 0 1px 2px rgba(255,255,255,.86)!important;
    transform:none;transition:transform .18s ease,box-shadow .18s ease!important;
}
#class1-math-runtime #view-dashboard-grid > .math-topic-card .math-topic-icon.tracking-tight{
    font-family:inherit!important;font-size:20px!important;font-weight:900!important;
}
#class1-math-runtime #view-dashboard-grid > .math-topic-card .math-topic-title{
    min-width:0!important;font-size:19.5px!important;font-weight:900!important;line-height:1.2!important;
}
#class1-math-runtime #view-dashboard-grid > .math-topic-card .math-topic-foot{
    margin-top:9px!important;padding-top:8px!important;gap:7px!important;align-items:flex-end!important;
}
#class1-math-runtime #view-dashboard-grid > .math-topic-card .math-topic-foot > span:first-child{
    min-width:0!important;font-size:16px!important;line-height:1.3!important;
}
#class1-math-runtime #view-dashboard-grid > .math-topic-card .math-topic-foot > span:last-child{
    font-size:14px!important;white-space:nowrap!important;
}
@media(hover:hover) and (pointer:fine){
  #class1-math-runtime #view-dashboard-grid > .math-topic-card:hover .math-topic-icon{
    transform:translateY(-2px) scale(1.06)!important;
    box-shadow:0 6px 14px rgba(109,40,217,.23),inset 0 1px 2px rgba(255,255,255,.92)!important;
  }
}
@media(max-width:560px){
  #class1-math-runtime #view-dashboard-grid > .math-topic-card{min-height:132px!important;padding:10px!important;}
  #class1-math-runtime #view-dashboard-grid > .math-topic-card .math-topic-icon{
    width:52px!important;height:52px!important;min-width:52px!important;min-height:52px!important;
    flex-basis:52px!important;font-size:31px!important;border-radius:15px!important;
  }
  #class1-math-runtime #view-dashboard-grid > .math-topic-card .math-topic-icon.tracking-tight{font-size:18px!important;}
  #class1-math-runtime #view-dashboard-grid > .math-topic-card .math-topic-title{font-size:18px!important;}
  #class1-math-runtime #view-dashboard-grid > .math-topic-card .math-topic-foot > span:first-child{font-size:14px!important;}
  #class1-math-runtime #view-dashboard-grid > .math-topic-card .math-topic-foot > span:last-child{font-size:12.5px!important;}
}
@media(prefers-reduced-motion:reduce){
  #class1-math-runtime #view-dashboard-grid > .math-topic-card .math-topic-icon{transition:none!important;}
  #class1-math-runtime #view-dashboard-grid > .math-topic-card:hover .math-topic-icon{transform:none!important;}
}

`;

function ensureMathStyles_() {
    if (document.getElementById(MATH_MODULE_STYLE_ID_)) return;
    const style = document.createElement('style');
    style.id = MATH_MODULE_STYLE_ID_;
    style.textContent = MATH_RUNTIME_CSS_ + MATH_SHELL_BREADCRUMB_CSS_ + MATH_HUB_CARD_CSS_ + MATH_EXPLORE_ICON_TEXT_CSS_;
    document.head.appendChild(style);
}

function ensureMathDependency_(kind, id, url) {
    if (document.getElementById(id)) return;
    if (kind === 'link') {
        const el=document.createElement('link'); el.id=id; el.rel='stylesheet'; el.href=url; document.head.appendChild(el); return;
    }
    const el=document.createElement('script'); el.id=id; el.src=url; el.async=true; document.head.appendChild(el);
}
function ensureMathDependencies_() {
    // Same presentation/runtime libraries used by the standalone Math program.
    ensureMathDependency_('link','class1-math-fontawesome','https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');
    ensureMathDependency_('link','class1-math-fonts','https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Quicksand:wght@500;700;800&display=swap');
    ensureMathDependency_('script','class1-math-chartjs','https://cdn.jsdelivr.net/npm/chart.js');
    ensureMathDependency_('script','class1-math-confetti','https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js');
    ensureMathDependency_('script','class1-math-html2pdf','https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js');
}

function class1LocalUser_() {
    const shared = mathModuleCtx_?.user || null;
    const userId = shared?.userId ? String(shared.userId).toUpperCase() : 'KHACH';
    const name = shared?.name ? String(shared.name) : (userId === 'KHACH' ? 'Khách' : 'Bé');
    const access = String(mathModuleCtx_?.accessType || 'regular').toLowerCase();
    const role = String(shared?.role || 'student').toLowerCase() === 'admin' ? 'admin' : 'student';
    return {
        name, hoTen:name, maHS:userId,
        vaiTro:role, role,
        loaiTaiKhoan:access, isGuest:!shared || !userId || userId === 'KHACH'
    };
}
function syncClass1ModuleState_() {
    const previousUserId = String(currentUser?.maHS || '');
    class1ModuleAccessType_ = String(mathModuleCtx_?.accessType || 'regular').toLowerCase();
    currentUser = class1LocalUser_();
    if (previousUserId !== String(currentUser?.maHS || '')) {
        class1ExerciseProgressLoaded_ = false;
        class1ExerciseUnlockedIndex_ = getLocalExerciseProgressIndex_();
        class1ExerciseBestPercent_ = {};
    }
    updatePremiumLockDecorations();
}

// Giữ nguyên breadcrumb/banner của chương trình Toán độc lập, rồi phản chiếu 1:1 sang shell Lớp 1.
// Banner chính/phụ phải bám `appShellRootMode_`, không được suy đoán từ chuỗi tiêu đề.
function mathReadStandaloneBreadcrumb_() {
    const out = [];
    [2,3,4].forEach((level) => {
        const tab = document.getElementById(`header-level${level}-tab`);
        const title = document.getElementById(`header-level${level}-title`);
        if (!tab || !title || tab.classList.contains('hidden')) return;
        const text = String(title.textContent || '').trim();
        if (text) out.push({ level, title:text });
    });
    return out;
}

function mathBreadcrumbLevel2Action_() {
    stopSpeaking();
    clearInterval(quizTimerInterval);
    if (currentMainTab === 'discover') {
        if (Number(activeTopicId) === 12) return openEpsilonMethodHub_();
        if (activeTopicId) return returnToCurrentDiscoverTopic_();
        return goHome();
    }
    if (currentMainTab === 'lessons') return openBaiHocHub(activeBaiHocContext?.semester || 1);
    if (currentMainTab === 'exercises') return openRoadmap(exerciseSemesterFilter || 1);
    if (currentMainTab === 'review') return openReviewTab();
    if (currentMainTab === 'exams') return openExamHub();
    if (currentMainTab === 'games') return openMiniGameHub();
    return returnToTopicLecture();
}

function mathBreadcrumbLevel3Action_() {
    // JS Toán gốc chỉ cho level 3 bấm quay lại chuyên mục ở luồng Khám phá.
    if (currentMainTab !== 'discover' || !activeTopicId) return;
    if (Number(activeTopicId) === 12) return openEpsilonMethodHub_();
    return returnToCurrentDiscoverTopic_();
}

function resetClass1MathBreadcrumb_() {
    const pill = document.getElementById('sub-pill');
    if (!pill) return;
    pill.classList.remove('math-sub-breadcrumbs');
    pill.removeAttribute('aria-label');
    pill.removeAttribute('title');
}

function syncClass1BannerFromMath_() {
    if (!mathModuleCtx_?.hooks) return;

    // Ở hub của mỗi tab (Ôn tập, Mini games, Bài học, Bài tập, Đề thi...) giữ banner chính,
    // giống JS/index Toán độc lập. Chỉ khi đi sâu mới bật banner phụ.
    if (appShellRootMode_) {
        mathModuleCtx_.hooks.clearDetail?.();
        resetClass1MathBreadcrumb_();
        return;
    }

    const crumbs = mathReadStandaloneBreadcrumb_();
    const fallback = crumbs.map(x => x.title).join(' · ') || 'Toán 1';
    mathModuleCtx_.hooks.setDetail?.(fallback);

    // `setDetail` vừa làm parent render banner phụ; thay pill đơn bằng breadcrumb nhiều cấp như bản Toán gốc.
    const pill = document.getElementById('sub-pill');
    if (!pill) return;
    pill.classList.add('math-sub-breadcrumbs');
    pill.setAttribute('aria-label', 'Điều hướng chuyên mục Toán');
    pill.title = fallback;

    if (!crumbs.length) {
        pill.textContent = fallback;
        return;
    }

    pill.replaceChildren();
    crumbs.forEach((crumb, index) => {
        if (index) {
            const sep = document.createElement('span');
            sep.className = 'math-breadcrumb-sep';
            sep.setAttribute('aria-hidden','true');
            sep.textContent = '›';
            pill.appendChild(sep);
        }

        const clickable = crumb.level === 2 || (crumb.level === 3 && currentMainTab === 'discover' && !!activeTopicId);
        const node = document.createElement(clickable ? 'button' : 'span');
        if (clickable) node.type = 'button';
        node.className = `math-breadcrumb-tab math-breadcrumb-level${crumb.level}`;
        node.textContent = crumb.title;
        node.title = crumb.title;
        if (clickable) {
            node.setAttribute('aria-label', `Quay lại ${crumb.title}`);
            node.addEventListener('click', crumb.level === 2 ? mathBreadcrumbLevel2Action_ : mathBreadcrumbLevel3Action_);
        }
        pill.appendChild(node);
    });
}

const __mathStandaloneUpdateNavTabs_ = updateNavTabs;
updateNavTabs = function(level2Title, level2Icon, level3Title, level4Title) {
    const result = __mathStandaloneUpdateNavTabs_.apply(this, arguments);
    syncClass1BannerFromMath_();
    return result;
};

const __mathStandaloneSetAppShellRootMode_ = setAppShellRootMode_;
setAppShellRootMode_ = function(isRoot) {
    const result = __mathStandaloneSetAppShellRootMode_.apply(this, arguments);
    syncClass1BannerFromMath_();
    return result;
};

function syncClass1Score_() {
    mathModuleCtx_?.hooks?.setScore?.(Number(starGreenCount || 0), Number(starRedCount || 0));
}
function resetStars() {
    starGreenCount = 0; starRedCount = 0;
    const g=document.getElementById('star-green-count'); if(g) g.textContent='0';
    const r=document.getElementById('star-red-count'); if(r) r.textContent='0';
    syncClass1Score_();
}

// Preserve standalone star behavior and reflect it to the shared shell score box.
const __mathStandalonePlayAudio_ = playAudio;
playAudio = function(type) {
    const out = __mathStandalonePlayAudio_.apply(this, arguments);
    setTimeout(syncClass1Score_, 0);
    return out;
};

function primeMathAudio_() {
    if (mathModuleAudioPrimed_) return;
    mathModuleAudioPrimed_ = true;
    const once = () => {
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (!audioCtx && AudioContext) audioCtx = new AudioContext();
            if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
        } catch (_) {}
    };
    mathModuleRoot_?.addEventListener('pointerdown', once, { once:true, passive:true });
}

function mountMathRuntime_() {
    if (!mathModuleCtx_?.host) throw new Error('MATH_MODULE_HOST_MISSING');
    ensureMathStyles_();
    ensureMathDependencies_();
    mathModuleCtx_.host.innerHTML = `<div id="${MATH_MODULE_RUNTIME_ID_}">${MATH_RUNTIME_HTML_}</div>`;
    mathModuleRoot_ = document.getElementById(MATH_MODULE_RUNTIME_ID_);
    installMathInlineBridge_();
    syncClass1ModuleState_();
    resetStars();
    updateAutoSpeechButtonUI();
    primeMathAudio_();
    mathModuleMounted_ = true;
}

async function bootstrapMathRuntime_() {
    if (!mathModuleMounted_ || !mathModuleRoot_ || !mathModuleRoot_.isConnected || mathModuleRoot_.parentElement !== mathModuleCtx_.host) {
        mountMathRuntime_();
        // Catalog is mandatory for the integrated module. Load it before first educational render.
        await loadSharedImageCatalog_();
        await Promise.resolve(renderDashboardGrid());
        await Promise.resolve(renderExamHubGrid());
    } else {
        syncClass1ModuleState_();
    }
}

async function renderClass1Math_(ctx) {
    mathModuleDestroyed_ = false;
    mathModuleCtx_ = ctx || null;
    await bootstrapMathRuntime_();
    const tab = String(ctx?.tabId || 'discover');
    mathModuleLastTab_ = tab;
    // Parent shell already enforces subject Premium tabs; standalone guards remain as defense-in-depth UX.
    if (tab === 'lessons') return openBaiHocHub(1);
    if (tab === 'exercises') return openRoadmap(1);
    if (tab === 'review') return openReviewTab();
    if (tab === 'exams') return openExamHub();
    if (tab === 'games') return openMiniGameHub();
    return goHome();
}

function destroyClass1Math_() {
    mathModuleDestroyed_ = true;
    try { stopSpeaking(); } catch (_) {}
    try { clearInterval(quizTimerInterval); } catch (_) {}
    try { stopActiveMiniGame_(); } catch (_) {}
    try { if (typeof numberSenseFlashTimer_ !== 'undefined') clearTimeout(numberSenseFlashTimer_); } catch (_) {}
    try { if (typeof operationSenseFlashTimer_ !== 'undefined') clearTimeout(operationSenseFlashTimer_); } catch (_) {}
    try { histLineChartInstance?.destroy?.(); } catch (_) {}
    try { histBarChartInstance?.destroy?.(); } catch (_) {}
    try { banMaiAudio.pause(); banMaiAudio.currentTime=0; banMaiAudio.onended=null; } catch (_) {}
    try { document.getElementById('class1-math-premium-access-modal')?.remove(); } catch (_) {}
    mathModuleCtx_?.hooks?.clearDetail?.();
    resetClass1MathBreadcrumb_();
    mathModuleCtx_?.hooks?.setScore?.(0,0);
    removeMathInlineBridge_();
    if (mathModuleRoot_?.isConnected) mathModuleRoot_.remove();
    mathModuleRoot_ = null;
    mathModuleMounted_ = false;
    mathModuleAudioPrimed_ = false;
    mathModuleCtx_ = null;
}

window.CLASS1_SUBJECT_MODULES = window.CLASS1_SUBJECT_MODULES || {};
window.CLASS1_SUBJECT_MODULES.math = Object.freeze({ render: renderClass1Math_, destroy: destroyClass1Math_ });
})();

(() => {
"use strict";
// ==========================================
// THÔNG BÁO THÂN THIỆN — THAY TOÀN BỘ alert()/confirm() MẶC ĐỊNH CỦA TRÌNH DUYỆT
// ==========================================
let friendlyDialogConfirmAction_ = null;

function __legacyTa1_ensureFriendlyDialog__1() {
    let modal = document.getElementById('modal-friendly-dialog');
    if (modal) return modal;

    modal = document.createElement('div');
    modal.id = 'modal-friendly-dialog';
    modal.className = 'hidden fixed inset-0 z-[220] bg-slate-900/45 backdrop-blur-sm items-center justify-center p-4';
    modal.innerHTML = `
        <div class="w-full max-w-md overflow-hidden rounded-[30px] border-4 border-pink-200 bg-white shadow-2xl">
            <div class="bg-gradient-to-br from-pink-50 via-fuchsia-50 to-purple-50 px-5 pt-5 pb-4 text-center">
                <div id="friendly-dialog-icon" class="text-6xl mb-1">🐰</div>
                <h3 id="friendly-dialog-title" class="text-lg md:text-xl font-black text-purple-700">Cô Thỏ Hồng nhắn bé</h3>
                <p id="friendly-dialog-message" class="mt-2 text-sm md:text-base font-bold text-slate-600 leading-relaxed whitespace-pre-line"></p>
            </div>
            <div id="friendly-dialog-actions" class="p-4 flex flex-col sm:flex-row gap-2 justify-center bg-white"></div>
        </div>`;
    modal.addEventListener('click', (event) => {
        if (event.target === modal && !friendlyDialogConfirmAction_) closeFriendlyDialog_();
    });
    document.body.appendChild(modal);
    return modal;
}

function showFriendlyDialog_(message, options = {}) {
    const modal = ensureFriendlyDialog_();
    const text = String(message ?? '');
    const isWarning = options.kind === 'warning' || /lỗi|sai|kh[oó]a|không|khong|thiếu|chưa|hết giờ|kết nối/i.test(text);
    const isSuccess = options.kind === 'success' || /chúc mừng|thành công|tuyệt vời/i.test(text);

    document.getElementById('friendly-dialog-icon').textContent = options.icon || (isWarning ? '😿' : (isSuccess ? '🎉' : '🐰'));
    document.getElementById('friendly-dialog-title').textContent = options.title || (isWarning ? 'Có chút trục trặc' : (isSuccess ? 'Tuyệt vời!' : 'Cô Thỏ Hồng nhắn bé'));
    document.getElementById('friendly-dialog-message').textContent = text;

    const actions = document.getElementById('friendly-dialog-actions');
    if (typeof options.onConfirm === 'function') {
        friendlyDialogConfirmAction_ = options.onConfirm;
        actions.innerHTML = `
            <button onclick="closeFriendlyDialog_()" class="px-5 py-2.5 rounded-2xl border-2 border-pink-200 bg-white text-pink-600 font-black text-sm hover:bg-pink-50 pastel-btn">Chưa nộp</button>
            <button onclick="acceptFriendlyDialog_()" class="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-black text-sm shadow-md pastel-btn">Đồng ý</button>`;
    } else {
        friendlyDialogConfirmAction_ = null;
        actions.innerHTML = `
            <button onclick="closeFriendlyDialog_()" class="w-full sm:w-auto px-8 py-2.5 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-black text-sm shadow-md pastel-btn">OK nhé!</button>`;
    }

    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

function closeFriendlyDialog_() {
    const modal = document.getElementById('modal-friendly-dialog');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
    friendlyDialogConfirmAction_ = null;
}

function acceptFriendlyDialog_() {
    const action = friendlyDialogConfirmAction_;
    const modal = document.getElementById('modal-friendly-dialog');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
    friendlyDialogConfirmAction_ = null;
    if (typeof action === 'function') action();
}

// Ghi đè alert toàn cục: mọi chỗ alert(...) cũ tự dùng popup mới.
function alert(message) {
    showFriendlyDialog_(message);
}

function showFriendlyConfirm_(message, onConfirm) {
    showFriendlyDialog_(message, {
        title: 'Con kiểm tra lại nhé!',
        icon: '🐰',
        onConfirm
    });
}

// ==========================================
// CẤU HÌNH 12 CHỦ ĐỀ KHO HỌC LIỆU & MA TRẬN 6 NHÓM NĂNG LỰC ENG_PHO-READ (TIẾNG ANH LỚP 1)
// ==========================================
// Trang chủ "Học tự do" tổ chức theo đúng 12 CHUYÊN MỤC hoạt động (Mục I khung V6) —
// KHÁC với 12 Chủ Đề nội dung (Mục III, dùng riêng cho Lộ trình 24 tuần bên dưới).
// Chuyên mục 1 (Alphabet & IPA phần A-Z + 44 IPA tĩnh) và 12 (Exam Arena) có màn hình riêng,
// nên TOPICS_CONFIG chỉ liệt kê 2-11 + mục 1 dành riêng cho Phonics Matcher (1.3, dạng trắc nghiệm).
const TOPICS_CONFIG = [
    { id: 2, title: "2. Vocabulary", titleVi: "Từ vựng", descEn: "Flashcards, listening & word play", descVi: "Thẻ từ, nghe tranh, trò chơi từ", icon: "📚", color: "pink" },
    { id: 3, title: "3. Remove Letter", titleVi: "Xóa chữ cái thừa", descEn: "Remove the extra letter", descVi: "Chạm xóa chữ cái thừa", icon: "✂️", color: "rose" },
    { id: 4, title: "4. Fill Missing", titleVi: "Điền chữ còn thiếu", descEn: "Complete the word", descVi: "Điền chữ cái còn thiếu", icon: "✏️", color: "amber" },
    { id: 5, title: "5. Odd One Out", titleVi: "Tìm từ khác loại", descEn: "Find the odd word", descVi: "Tìm từ khác nhóm/khác loại", icon: "🧩", color: "fuchsia" },
    { id: 6, title: "6. Reading Stories", titleVi: "Đọc truyện", descEn: "Read and answer", descVi: "Đọc truyện ngắn và trả lời", icon: "📖", color: "emerald" },
    { id: 7, title: "7. Sentence Builder", titleVi: "Sắp xếp câu", descEn: "Put the words in order", descVi: "Sắp xếp từ thành câu", icon: "🧱", color: "indigo" },
    { id: 8, title: "8. Fill Sentence", titleVi: "Điền câu", descEn: "Complete the sentence", descVi: "Điền câu theo ngữ cảnh", icon: "📝", color: "teal" },
    { id: 9, title: "9. Q&A Dialogues", titleVi: "Hỏi & đáp", descEn: "Ask and answer", descVi: "Hội thoại hỏi và đáp", icon: "💬", color: "cyan" },
    { id: 10, title: "10. Grammar Point", titleVi: "Ngữ pháp", descEn: "Learn simple grammar", descVi: "Mạo từ, giới từ, động từ, tính từ", icon: "🅰️", color: "blue" }
];

const SUBTOPIC_PALETTES = [
    { card: "bg-pink-50/80 hover:bg-pink-100 border-pink-300 text-pink-800", num: "text-pink-600", badge: "bg-white text-pink-600 border-pink-200" },
    { card: "bg-emerald-50/80 hover:bg-emerald-100 border-emerald-300 text-emerald-800", num: "text-emerald-600", badge: "bg-white text-emerald-600 border-emerald-200" },
    { card: "bg-purple-50/80 hover:bg-purple-100 border-purple-300 text-purple-800", num: "text-purple-600", badge: "bg-white text-purple-600 border-purple-200" },
    { card: "bg-amber-50/80 hover:bg-amber-100 border-amber-300 text-amber-800", num: "text-amber-600", badge: "bg-white text-amber-600 border-amber-200" },
    { card: "bg-indigo-50/80 hover:bg-indigo-100 border-indigo-300 text-indigo-800", num: "text-indigo-600", badge: "bg-white text-indigo-600 border-indigo-200" },
    { card: "bg-rose-50/80 hover:bg-rose-100 border-rose-300 text-rose-800", num: "text-rose-600", badge: "bg-white text-rose-600 border-rose-200" }
];

// Lộ trình 24 tuần (V4) — mỗi chủ đề lớn (Mục X) tách 2 tuần Part1 (X.1: Từ vựng/Nghe/Ngữ âm)
// và Part2 (X.2: Ngữ pháp/Cú pháp/Đọc hiểu). Tuần 12 = chốt chặn HK1 (đề ôn 15 câu),
// Tuần 17 = ôn tập giữa kỳ (đề ôn 15 câu), Tuần 24 = Đấu trường chung kết.
const roadmapConfig = {
    1:  { name: "Tuần 1: Greetings & Playground (Part 1)", desc: "Từ vựng chào hỏi & đồ chơi sân trường (hello, book, ball, bike). Cấu trúc: Hi, I'm Bill.", icon: "👋" },
    2:  { name: "Tuần 2: Greetings & Playground (Part 2)", desc: "Từ vựng tạm biệt & sân chơi. Cấu trúc: Bye, Ba. Đọc hiểu truyện sân chơi Level 1.", icon: "👋" },
    3:  { name: "Tuần 3: My Family & Home (Part 1)", desc: "Từ vựng người thân (mother, father, mom, dad, brother, sister). Cấu trúc: This is my mother.", icon: "🏠" },
    4:  { name: "Tuần 4: My Family & Home (Part 2)", desc: "Từ vựng phòng ở (bedroom, kitchen, bathroom...). Cấu trúc: Where is Mom? - She's in the kitchen.", icon: "🏠" },
    5:  { name: "Tuần 5: Review & Play 1", desc: "Ôn tập ngắt quãng toàn bộ từ vựng, ngữ âm, ngữ pháp Tuần 1-4 qua game lật thẻ.", icon: "🔁" },
    6:  { name: "Tuần 6: Shapes & Numbers (Part 1)", desc: "Đếm số 1-5 & hình khối cơ bản (circle, square, triangle).", icon: "🔷" },
    7:  { name: "Tuần 7: Shapes & Numbers (Part 2)", desc: "Đếm số 6-10 & hình ngôi sao. Cấu trúc: How many clocks are there? - Six.", icon: "🔷" },
    8:  { name: "Tuần 8: My Toys & Space (Part 1)", desc: "Từ vựng đồ chơi (teddy bear, top, kite, doll, robot...). Cấu trúc: I have a robot.", icon: "🧸" },
    9:  { name: "Tuần 9: My Toys & Space (Part 2)", desc: "Giới từ chỉ vị trí (in, on, under, next to). Cấu trúc: Where is the ball? - It's on the box.", icon: "🧸" },
    10: { name: "Tuần 10: World of Animals (Part 1)", desc: "Động vật nông trại (cat, dog, duck, bird, rabbit, goat, horse, hen).", icon: "🦁" },
    11: { name: "Tuần 11: World of Animals (Part 2)", desc: "Động vật hoang dã (monkey, tiger, elephant, hippo, mouse, fish).", icon: "🦁" },
    12: { name: "Tuần 12: Semester 1 Grand Review", isGrandReview: true, desc: "Chốt chặn Học kỳ I — đề ôn tổng hợp 15 câu, đạt ≥80% để mở khoá Học kỳ II.", icon: "🏅" },
    13: { name: "Tuần 13: Clothes & Outfits (Part 1)", desc: "Từ vựng trang phục (hat, bag, shoes, t-shirt, dress, socks, umbrella).", icon: "👗" },
    14: { name: "Tuần 14: Clothes & Outfits (Part 2)", desc: "Màu sắc cơ bản. Cấu trúc: I have a red hat. He's wearing a blue t-shirt.", icon: "👗" },
    15: { name: "Tuần 15: Yummy Food & Drinks (Part 1)", desc: "Món ăn quen thuộc (cake, fish, chips, milk, chicken, banana, juice). Cấu trúc: I like fish.", icon: "🍕" },
    16: { name: "Tuần 16: Yummy Food & Drinks (Part 2)", desc: "Từ vựng món ăn mở rộng. Cấu trúc: Do you want some milk? - Yes, please.", icon: "🍕" },
    17: { name: "Tuần 17: Review & Play 2", isReview15: true, desc: "Ôn tập tổng hợp 15 câu Tuần 13-16: Clothes & Food.", icon: "🔁" },
    18: { name: "Tuần 18: Go Places & Vehicles (Part 1)", desc: "Phương tiện di chuyển (bus, car, truck, plane, bike). Cấu trúc: Can you see the plane?", icon: "🚌" },
    19: { name: "Tuần 19: Go Places & Vehicles (Part 2)", desc: "Địa điểm & thiên nhiên xung quanh. Cấu trúc: I can see a bus. She is running in the sun.", icon: "🚌" },
    20: { name: "Tuần 20: Creative Classroom (Part 1 - Tools)", desc: "Đồ dùng học tập (pen, pencil, ruler, eraser, crayon, book, school bag).", icon: "🎒" },
    21: { name: "Tuần 21: Creative Classroom (Part 2 - Commands)", desc: "Mệnh lệnh lớp học (Open your book, Close the door, Stand up, Sit down).", icon: "📐" },
    22: { name: "Tuần 22: Beautiful Nature & Home (Part 1)", desc: "Thiên nhiên (lake, leaf, lemon, sky, sun, water, garden, gate).", icon: "🌈" },
    23: { name: "Tuần 23: Beautiful Nature & Home (Part 2)", desc: "Chăm sóc bản thân (wash, water, clean, soap, hands, face).", icon: "🌈" },
    24: { name: "Tuần 24: Grand Exam Arena", isExam: true, desc: "Đề thi chuẩn 13 câu ma trận tích hợp, hiển thị biểu đồ năng lực cuối khoá.", icon: "🏆" }
};

const TOTAL_ROADMAP_WEEKS = 24;

// Toạ độ 35 mốc tuần dạng zigzag rắn bò (serpentine), 7 cột x 5 hàng, tự tính không cần khai báo tay từng điểm
function getRoadmapCoord(weekNum) {
    const cols = 6;
    const colWidth = 110, rowHeight = 89;
    const startX = 44, startY = 42;
    const idx = weekNum - 1;
    const row = Math.floor(idx / cols);
    const posInRow = idx % cols;
    const col = (row % 2 === 0) ? posInRow : (cols - 1 - posInRow);
    return { x: startX + col * colWidth, y: startY + row * rowHeight };
}

function buildRoadmapPathD(totalWeeks) {
    const pts = [];
    for (let w = 1; w <= totalWeeks; w++) pts.push(getRoadmapCoord(w));
    let d = `M ${pts[0].x},${pts[0].y}`;
    for (let i = 1; i < pts.length; i++) {
        const p0 = pts[i - 1], p1 = pts[i];
        const midX = (p0.x + p1.x) / 2, midY = (p0.y + p1.y) / 2;
        const dx = p1.x - p0.x, dy = p1.y - p0.y;
        const len = Math.hypot(dx, dy) || 1;
        const nx = -dy / len, ny = dx / len;
        // Sóng uốn lượn xuống-lên LIÊN TỤC xuyên suốt toàn bộ đường đi (kể cả đoạn chuyển hàng),
        // không để đoạn nào thẳng đơ xen giữa — giống hệt kiểu bản đồ lộ trình game (Duolingo-style).
        const bend = (i % 2 === 0 ? 1 : -1) * 26;
        const cx = midX + nx * bend, cy = midY + ny * bend;
        d += ` Q ${cx},${cy} ${p1.x},${p1.y}`;
    }
    return d;
}

const examFileMap = {
    hocky1: { file: 'de_thi_tieng_anh_1.json', arrayKey: 'semester_1_exams', sheet: 'LichSuBaiThiHK1', label: 'Học kỳ 1', color: 'pink' },
    hocky2: { file: 'de_thi_tieng_anh_1.json', arrayKey: 'semester_2_exams', sheet: 'LichSuBaiThiHK2', label: 'Học kỳ 2', color: 'purple' },
    hsg:    { file: 'de_thi_tieng_anh_1.json', arrayKey: 'hsg_exams', sheet: 'LichSuBaiThiHSG', label: 'Học sinh giỏi', color: 'amber' }
};

// 6 nhóm năng lực ngôn ngữ Tiếng Anh lớp 1 (ENG_PHO, ENG_VOC, ENG_LIS, ENG_GRA, ENG_SYN, ENG_READ).
const SKILL_TAXONOMY = {
    ENG_PHO: { code: 'ENG_PHO', sheetCol: 'ENG_PHO_DungSo', totalCol: 'ENG_PHO_TongSo', name: 'Ngữ âm & Chính tả', advice: 'Con cần luyện thêm cách đánh vần, nhận diện chữ cái và âm đầu/âm cuối của từ vựng.' },
    ENG_VOC: { code: 'ENG_VOC', sheetCol: 'ENG_VOC_DungSo', totalCol: 'ENG_VOC_TongSo', name: 'Từ vựng & Ý nghĩa', advice: 'Con nên ôn lại vốn từ vựng theo từng chủ đề, ghi nhớ nghĩa và cách dùng của từ.' },
    ENG_LIS: { code: 'ENG_LIS', sheetCol: 'ENG_LIS_DungSo', totalCol: 'ENG_LIS_TongSo', name: 'Nghe hiểu', advice: 'Con cần luyện nghe nhiều hơn, tập trung nghe kỹ giọng đọc trước khi chọn đáp án.' },
    ENG_GRA: { code: 'ENG_GRA', sheetCol: 'ENG_GRA_DungSo', totalCol: 'ENG_GRA_TongSo', name: 'Ngữ pháp bối cảnh', advice: 'Con nên ôn lại các mẫu câu, mạo từ, giới từ để dùng đúng ngữ pháp hơn.' },
    ENG_SYN: { code: 'ENG_SYN', sheetCol: 'ENG_SYN_DungSo', totalCol: 'ENG_SYN_TongSo', name: 'Cú pháp & Lập câu', advice: 'Con cần luyện thêm cách sắp xếp từ thành câu đúng trật tự tiếng Anh.' },
    ENG_READ: { code: 'ENG_READ', sheetCol: 'ENG_READ_DungSo', totalCol: 'ENG_READ_TongSo', name: 'Đọc hiểu', advice: 'Con nên luyện đọc đoạn văn kỹ hơn, tìm đúng thông tin trước khi trả lời.' }
};
const SKILL_KEYS = Object.keys(SKILL_TAXONOMY);

const GREETINGS_STUDENT = [
    "Chào {name}, cô Thỏ Hồng rất vui được học tiếng Anh cùng con hôm nay!",
    "Chào mừng {name} quay lại! Sẵn sàng chinh phục thêm thật nhiều từ vựng mới chưa nào?",
    "Cô Thỏ Hồng chào {name}! Cùng nhau nói tiếng Anh thật giỏi hôm nay nhé!",
    "Chào con yêu {name}, hôm nay chúng mình cùng khám phá thế giới tiếng Anh nhé!",
    "Chào mừng {name} đến với giờ học tiếng Anh! Cô Thỏ Hồng tin con sẽ học rất giỏi!"
];

const GREETINGS_GUEST = [
    "Chào bé yêu, cô Thỏ Hồng rất vui được cùng con luyện tiếng Anh hôm nay!",
    "Chào mừng bé đến với lớp tiếng Anh của cô Thỏ Hồng! Mình cùng thử sức xem sao nhé!",
    "Cô Thỏ Hồng chào bé! Cùng khám phá từ vựng mới thật vui nào!",
    "Chào thiên tài nhí! Cô Thỏ Hồng đang chờ xem con nói tiếng Anh giỏi cỡ nào đây!",
    "Chào mừng con đến với Đấu trường Tiếng Anh! Chúc con học thật vui vẻ!"
];


// ==========================================
// ĐỊNH DANH MÁY CHỦ APPS SCRIPT & BIẾN TOÀN CỤC
// ==========================================
// Standalone Apps Script endpoint removed: Class 1 shell owns backend/API.
let allTopicsDataCache = null;
let ALPHABET_DATA = [];
let IPA_DATA = [];
let currentAlphaTab = 'alpha';
let allQuestionsFlatCache = null;
// Bản văn bản thuần của phần "Nhận xét sư phạm & kế hoạch bồi dưỡng" — cập nhật mỗi lần
// renderPedagogicalEvaluation() chạy, dùng cho nút "Nghe cô giáo đọc" (dùng chung Tiến trình tuần + Đề thi).
let pedagogicalEvaluationText = '';
// Bật/tắt đọc câu hỏi TỰ ĐỘNG khi vào câu mới — nút "Nghe câu hỏi" thủ công vẫn luôn hoạt động
// dù tắt tính năng này (đây chỉ tắt phần tự động phát, không tắt hẳn tính năng nghe).
let autoSpeechEnabled = localStorage.getItem('autoSpeechEnabled') !== 'false';
const examsCache = {};

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

let audioCtx = null;
const banMaiAudio = new Audio();
banMaiAudio.referrerPolicy = 'no-referrer';

let histLineChartInstance = null;
let histBarChartInstance = null;

// ==========================================
// HÀM TIỆN ÍCH DỮ LIỆU
// ==========================================
function getStudentFirstName() {
    if (!currentUser || currentUser.isGuest || !currentUser.hoTen) return "Bé";
    const parts = currentUser.hoTen.trim().split(/\s+/);
    return parts[parts.length - 1] || "Bé";
}

function __legacyTa1_normalizeQuestion_1(q) {
    if (!q) return null;
    return {
        question_id: q.id ?? q.question_id ?? q.question_no ?? 0,
        // "sub_topic"/"sub_code" = MÃ Chuyên Mục.Hoạt-động-con THẬT (VD "2.1") — dùng để nhóm
        // câu hỏi cho TRANG CHỦ "Học tự do" theo đúng 12 Chuyên Mục (Mục I khung V6).
        // "week" = MÃ Chủ Đề nội dung.Part (VD "1.1") — dùng RIÊNG để lọc câu hỏi theo
        // Lộ trình 24 tuần (Mục III khung V6). Hai trục KHÔNG được gộp chung với nhau.
        sub_topic: String(q.sub_code ?? q.sub ?? q.sub_topic ?? 'Câu hỏi chung').trim(),
        sub_topic_label: String(q.sub ?? q.sub_code ?? q.sub_topic ?? 'Câu hỏi chung').trim(),
        week: q.week ?? q.w ?? null,
        paired_group: q.pg ?? q.paired_group ?? '',
        content_topic: String(q.topic ?? q.content_topic ?? '').trim(),
        // Phiên âm IPA cho từng đáp án (mảng cùng thứ tự với "options") — JSON mới của anh
        // gắn sẵn dưới tên "o_ipa"/"options_ipa" (2 tên trùng nội dung, chỉ cần đọc 1 trong 2).
        options_ipa: q.o_ipa ?? q.options_ipa ?? q.oipa ?? null,
        question_text: q.q ?? q.question_text ?? '',
        options: Array.isArray(q.o) ? q.o : (Array.isArray(q.options) ? q.options : []),
        answer: q.a ?? q.answer ?? '',
        hint: q.h ?? q.hint ?? '',
        image_url: resolveEnglishImage_(q.img ?? q.image_url ?? '', q.imageId ?? q.image_id ?? ''),
        emoji: q.emo ?? q.emoji ?? '',
        audio_text: q.aud ?? q.audio_text ?? '',
        reading_title: q.r_title ?? q.reading_title ?? '',
        reading_passage: q.r_passage ?? q.reading_passage ?? q.passage_text ?? '',
        skill_tag: q.skill_tag ?? q.tag ?? 'ENG_VOC',
        diem: Number(q.diem ?? q.score ?? 0.5),
        explanation: q.explanation ?? q.h ?? 'Không có giải thích chi tiết.'
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

// Đề ôn tập tổng hợp 15 câu (Tuần 12 chốt chặn HK1 & Tuần 17 ôn giữa kỳ) — đúng ma trận V4:
// 3 ENG_PHO@0.5 + 2 ENG_VOC@0.5 + 2 ENG_LIS@0.5 + 3 ENG_GRA(2x1.0+1x0.5) + 3 ENG_SYN(2x1.0+1x0.5) + 2 ENG_READ@0.75 = 10.0đ
const REVIEW15_SPEC = [
    { tag: 'ENG_PHO', pts: [0.5, 0.5, 0.5] },
    { tag: 'ENG_VOC', pts: [0.5, 0.5] },
    { tag: 'ENG_LIS', pts: [0.5, 0.5] },
    { tag: 'ENG_GRA', pts: [1.0, 1.0, 0.5] },
    { tag: 'ENG_SYN', pts: [1.0, 1.0, 0.5] },
    { tag: 'ENG_READ', pts: [0.75, 0.75] }
];

// Trả về pool 60 câu (đã chuẩn hoá) của đúng 1 tuần, lấy trực tiếp từ weeksByIdCache
// (đã nạp sẵn qua loadSemesterData()) — không còn suy luận qua sub_id/dotted-code nữa,
// vì dữ liệu Tiếng Anh Lớp 1 đã tách sẵn field "weeks" theo đúng weekNum (1-24).
function getWeekRawPool(weekNumber) {
    if (!weeksByIdCache) return [];
    const raw = weeksByIdCache[weekNumber] || [];
    return raw.map(normalizeQuestion).filter(Boolean);
}

function generateReview15(weekNumber) {
    const pool = getWeekRawPool(weekNumber);
    if (!pool.length) return [];

    const bySkill = {};
    SKILL_KEYS.forEach(k => bySkill[k] = shuffleArray(pool.filter(q => q.skill_tag === k)));

    let out = [];
    REVIEW15_SPEC.forEach(spec => {
        const items = bySkill[spec.tag].length ? bySkill[spec.tag] : shuffleArray(pool);
        if (!items.length) return;
        spec.pts.forEach((pts, i) => {
            const src = items[i % items.length];
            out.push({ ...src, diem: pts, id: src.question_id + '_r' + i, question_id: src.question_id + '_r' + i });
        });
    });
    return shuffleArray(out);
}

function getQuestionsForWeek343(weekNumber) {
    // Kho 60 câu/tuần đã dựng sẵn theo đúng tỷ lệ vị trí (Easy đầu / Medium giữa / Hard cuối) —
    // vẫn áp dụng đúng công thức bốc theo VỊ TRÍ 35%-40%-25% rồi rút 9+12+9=30 câu (Mục 5.3),
    // không dựa vào field "difficulty" trực tiếp để không vỡ nếu thứ tự file thay đổi.
    let pool = getWeekRawPool(weekNumber);

    if (pool.length < 30) return shuffleArray([...pool]);

    const size = pool.length;
    const basket1 = pool.slice(0, Math.floor(size * 0.35));
    const basket2 = pool.slice(Math.floor(size * 0.35), Math.floor(size * 0.75));
    const basket3 = pool.slice(Math.floor(size * 0.75));
    
    const easy = shuffleArray([...basket1]).slice(0, 9);
    const medium = shuffleArray([...basket2]).slice(0, 12);
    const hard = shuffleArray([...basket3]).slice(0, 9);
    
    return shuffleArray([...easy, ...medium, ...hard]);
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

// Kho học liệu Tiếng Anh Lớp 1 tách theo 2 học kỳ, mỗi file gồm:
//  - "sections": 12 Chuyên Mục hoạt động (id 1-11 dùng cho trang chủ Học tự do), mỗi section có
//    "subs" (hoạt động con, VD "2.1") chứa sẵn "qs" (mảng câu hỏi đúng schema q/o/a/h/img/sub).
//  - "weeks": pool CÓ SẴN đúng 60 câu/tuần (đã xếp Easy→Medium→Hard theo vị trí) cho Lộ trình 24 tuần,
//    KHÔNG cần suy luận qua sub_id/dotted-code như bản Tiếng Anh Lớp 2 cũ nữa.
const SEMESTER_DATA_FILES = [
    'assets/data/kho_hoc_ky1_tieng_anh_1.json',
    'assets/data/kho_hoc_ky2_tieng_anh_1.json'
];

let semesterDataLoadingPromise = null;
let weeksByIdCache = null; // { 1: [...60 câu thô...], 2: [...], ..., 24: [...] }
let wordMeaningMapCache = {}; // word chuẩn hoá -> mảng tất cả nghĩa tiếng Việt tìm thấy trong Vocabulary
let miniGameVocabCache = null; // nguồn từ vựng Mini Game, lấy đúng từ Chuyên mục 2.1 của TA1


// ==========================================
// VOCABULARY MASTER TA1 — 4 LEVELS × 40 WORDS, 3 SHARED STUDY MODES
// Tham chiếu cách tổ chức của TA2: một pool từ duy nhất dùng cho Flashcards,
// Word-picture Puzzle và Listen and Choose. Đổi tab không đổi từ hiện tại.
// ==========================================
const TA1_VOCAB_LEVEL_GROUPS_ = Object.freeze([
    { level: 1, name: 'Starter', name_vi: 'Khởi đầu', units: [1,2,3,4], icon: '🌱' },
    { level: 2, name: 'Growing', name_vi: 'Tiến bộ', units: [5,6,7,8], icon: '🌼' },
    { level: 3, name: 'Smart', name_vi: 'Tự tin', units: [9,10,11,12], icon: '🌟' },
    { level: 4, name: 'Super', name_vi: 'Thử thách', units: [13,14,15,16], icon: '🏆' }
]);
let activeVocabularyHubQuestions = [];
let activeVocabularyHubTopic = null;
let activeVocabularyStudyMode = 'flashcard';
let vocabularyModeState = {
    flashcard: { answers: {}, wrongs: {} },
    picture: { answers: {}, wrongs: {} },
    listen: { answers: {}, wrongs: {} }
};

function getVocabularyCurriculumLevel_(q) {
    return Math.max(1, Math.min(4, Number(q?.curriculum_level || q?.level || 1) || 1));
}
function getVocabularyLevelGroup_(level) {
    return TA1_VOCAB_LEVEL_GROUPS_.find(g => g.level === Number(level)) || null;
}
function resetVocabularyModeState_() {
    vocabularyModeState = {
        flashcard: { answers: {}, wrongs: {} },
        picture: { answers: {}, wrongs: {} },
        listen: { answers: {}, wrongs: {} }
    };
}
function getVocabularyModeKey_(mode = activeVocabularyStudyMode) {
    return ['picture','listen'].includes(mode) ? mode : 'flashcard';
}
function saveVocabularyModeState_() {
    if (!activeVocabularyHubTopic) return;
    const key = getVocabularyModeKey_();
    vocabularyModeState[key] = {
        answers: { ...userAnswers },
        wrongs: Object.fromEntries(Object.entries(wrongAttemptsByQ || {}).map(([k,v]) => [k, Array.isArray(v) ? [...v] : v]))
    };
}
function restoreVocabularyModeState_() {
    const key = getVocabularyModeKey_();
    const state = vocabularyModeState[key] || { answers: {}, wrongs: {} };
    userAnswers = { ...state.answers };
    wrongAttemptsByQ = Object.fromEntries(Object.entries(state.wrongs || {}).map(([k,v]) => [k, Array.isArray(v) ? [...v] : v]));
}
function renderVocabularyLevelHub_(questions = []) {
    activeVocabularyHubQuestions = (questions || []).filter(q => String(q.sub_topic || '').startsWith('2.1'));
    activeVocabularyHubTopic = null;
    activeVocabularyStudyMode = 'flashcard';
    resetVocabularyModeState_();

    document.getElementById('wrap-mix-all-subtopics')?.classList.add('hidden');
    const title = document.getElementById('lecture-title');
    const content = document.getElementById('lecture-content');
    const view = document.getElementById('view-lecture');
    const list = document.getElementById('lecture-subtopics-list');
    if (title) title.textContent = '2. Vocabulary';
    const intro = '160 từ vựng · 4 cấp độ · mỗi cấp 40 từ. Chọn một cấp độ để học theo 3 cách: Flashcards, Nhìn tranh chọn từ và Nghe chọn từ.';
    if (content) content.textContent = intro;
    if (view) view.dataset.audioText = intro;

    const counts = {};
    activeVocabularyHubQuestions.forEach(q => { const lv = getVocabularyCurriculumLevel_(q); counts[lv] = (counts[lv] || 0) + 1; });
    if (list) {
        list.className = 'grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 w-full max-w-4xl';
        list.innerHTML = TA1_VOCAB_LEVEL_GROUPS_.map((g,i) => {
            const style = SUBTOPIC_PALETTES[i % SUBTOPIC_PALETTES.length];
            return `<button onclick="openVocabularyLevel_(${g.level})" class="p-4 ${style.card} border rounded-2xl font-bold text-left transition-all shadow-sm pastel-btn min-h-[88px]">
                <div class="flex items-center justify-between gap-3">
                    <div class="min-w-0">
                        <div class="text-lg md:text-xl font-black ${style.num}">${g.icon} Level ${g.level} · ${g.name}</div>
                        <div class="text-xs md:text-sm text-slate-500 font-extrabold mt-1">${g.name_vi} · Unit ${g.units[0]}–${g.units[g.units.length-1]}</div>
                    </div>
                    <span class="text-xs font-black ${style.badge} px-3 py-1 rounded-full border shrink-0">${counts[g.level] || 0} words</span>
                </div>
            </button>`;
        }).join('');
    }
    updateNavTabs('2. Vocabulary', '📚', null);
    switchAppView('view-lecture');
}
function openVocabularyLevel_(level) {
    const g = getVocabularyLevelGroup_(level);
    if (!g) return;
    const pool = activeVocabularyHubQuestions.filter(q => getVocabularyCurriculumLevel_(q) === g.level);
    if (!pool.length) { alert(`Level ${g.level} đang được cập nhật từ vựng.`); return; }
    activeVocabularyHubTopic = { ...g, title: `Level ${g.level} · ${g.name}` };
    activeVocabularyStudyMode = 'flashcard';
    resetVocabularyModeState_();
    practiceCycleRawPool = [...pool];
    const label = `Level ${g.level} · ${g.name} / ${g.name_vi} · Unit ${g.units[0]}-${g.units[g.units.length-1]}`;
    updateNavTabs('2. Vocabulary', '📚', label, null);
    startTopicQuiz(2, `Vocabulary - Level ${g.level}`, shuffleArray([...pool]), '2.1');
}
function setVocabularyStudyMode(mode) {
    if (!activeVocabularyHubTopic || !['flashcard','picture','listen'].includes(mode)) return;
    saveVocabularyModeState_();
    activeVocabularyStudyMode = mode;
    restoreVocabularyModeState_();
    loadQuestion();
}
function vocabularyTabsHtml_() {
    const tabs = [
        { key:'flashcard', icon:'🃏', en:'Flashcards', vi:'' },
        { key:'picture', icon:'🖼️', en:'Word-picture Puzzle', vi:'Nhìn tranh chọn từ' },
        { key:'listen', icon:'🎧', en:'Listen and Choose', vi:'Nghe và chọn từ' }
    ];
    return `<div class="grid grid-cols-3 gap-2 md:gap-3 mb-3">${tabs.map(t => {
        const active = activeVocabularyStudyMode === t.key;
        return `<button onclick="setVocabularyStudyMode('${t.key}')" class="h-[48px] md:h-[52px] rounded-[14px] border px-2 md:px-3 py-1 transition-all flex items-center justify-center gap-1.5 md:gap-2 ${active ? 'bg-gradient-to-r from-pink-500 to-violet-500 text-white border-pink-300 shadow-md' : 'bg-white text-slate-600 border-pink-200 hover:bg-pink-50'}">
            <span class="text-[15px] md:text-base leading-none shrink-0">${t.icon}</span>
            <span class="min-w-0 flex flex-col items-start leading-tight"><span class="font-black text-[10px] sm:text-[11px] md:text-sm truncate max-w-full">${t.en}</span>${t.vi ? `<span class="text-[7px] md:text-[9px] font-bold ${active ? 'text-white/90' : 'text-slate-400'} truncate max-w-full">${t.vi}</span>` : ''}</span>
        </button>`;
    }).join('')}</div>`;
}
function getVocabularyRecordByWord_(word) {
    const key = String(word || '').trim().toLowerCase();
    if (!key) return null;
    const pools = [practiceCycleRawPool, activeQuestionsList, activeVocabularyHubQuestions];
    for (const pool of pools) {
        const hit = Array.isArray(pool) ? pool.find(x => String(x?.word || '').trim().toLowerCase() === key) : null;
        if (hit) return hit;
    }
    return null;
}
function getVocabularyChoiceOptions_(q) {
    if (!q) return [];
    const cacheKey = `_vocabChoiceOptions_${getVocabularyModeKey_()}`;
    if (Array.isArray(q[cacheKey]) && q[cacheKey].length === 4) return q[cacheKey];
    const words = practiceCycleRawPool.map(x => String(x.word || '').trim()).filter(Boolean);
    q[cacheKey] = buildTrickyChoices(q.word, words, words, 3);
    return q[cacheKey];
}
function getVocabularyIpaForWord_(word) {
    const rec = getVocabularyRecordByWord_(word);
    if (rec?.ipa) return String(rec.ipa).replace(/^\/+|\/+$/g, '');
    return '';
}
function vocabularyVisualHtml_(q) {
    const src = String(q?.image_url || '').trim();
    const emoji = String(q?.emoji || '').trim();
    if (src) return `<img src="${escapeHtml(src)}" alt="${escapeHtml(q?.word || 'Vocabulary')}" class="w-full h-full object-contain object-center rounded-3xl" onerror="this.style.display='none';const f=this.nextElementSibling;if(f)f.style.display='flex';"><div style="display:none" class="w-full h-full items-center justify-center text-7xl md:text-8xl">${escapeHtml(emoji || '✨')}</div>`;
    if (emoji) return `<div class="w-full h-full flex items-center justify-center text-7xl md:text-8xl">${escapeHtml(emoji)}</div>`;
    return `<div class="w-full h-full flex items-center justify-center"><span class="w-24 h-24 rounded-3xl bg-pink-50 border border-pink-100 flex items-center justify-center text-4xl font-black text-pink-500">${escapeHtml(String(q?.word || '?').slice(0,1).toUpperCase())}</span></div>`;
}
function highlightVocabularyTarget_(text, word) {
    const raw = String(text || '');
    const target = String(word || '').trim();
    if (!target) return escapeHtml(raw);
    const esc = target.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const rx = new RegExp(`(${esc})`, 'ig');
    return raw.split(rx).map(part => part.toLowerCase() === target.toLowerCase() ? `<span class="text-fuchsia-600 font-black bg-fuchsia-50 px-1 rounded">${escapeHtml(part)}</span>` : escapeHtml(part)).join('');
}
function vocabularyExamplesHtml_(q, reveal = true) {
    if (!reveal) return '<div class="h-full min-h-[150px]"></div>';
    const examples = (Array.isArray(q?.examples) ? q.examples : []).slice(0,3);
    const vi = (Array.isArray(q?.examples_vi) ? q.examples_vi : []).slice(0,3);
    if (!examples.length) return '';
    return `<div class="font-black text-fuchsia-600 text-sm md:text-base mb-2">⭐ 3 EXAMPLE SENTENCES:</div><div class="space-y-2">${examples.map((ex,i) => `<div class="bg-white rounded-2xl border border-fuchsia-100 px-3 py-2 text-left"><div class="flex items-center gap-2"><div class="flex-1 min-w-0 font-bold text-slate-700">${highlightVocabularyTarget_(ex, q.word)}</div><button onclick="speakVocabularyExample_(${i})" class="w-9 h-9 shrink-0 rounded-xl bg-sky-100 text-sky-600 hover:bg-sky-200" title="Listen"><i class="fa-solid fa-volume-high text-xs"></i></button></div>${vi[i] ? `<div class="mt-1 text-xs md:text-sm font-semibold text-slate-400">${escapeHtml(vi[i])}</div>` : ''}</div>`).join('')}</div>`;
}
function speakVocabularyExample_(i) {
    const q = activeQuestionsList[currentQIndex];
    const text = Array.isArray(q?.examples) ? q.examples[i] : '';
    if (text) speakEnglish(text, 0.92);
}
function speakVocabularyTarget_() {
    const q = activeQuestionsList[currentQIndex];
    if (q?.word) speakEnglish(q.word, 0.9);
}
function speakVocabularyPrompt_() {
    if (activeVocabularyStudyMode === 'listen') return speakVocabularyTarget_();
    speakEnglish('Choose the correct English word.', 0.92);
}
function revealVocabularyAfterCorrect_() {
    if (!activeVocabularyHubTopic || !['picture','listen'].includes(activeVocabularyStudyMode)) return;
    document.querySelectorAll('.vocab-option-meaning').forEach(el => el.classList.remove('hidden'));
    const q = activeQuestionsList[currentQIndex];
    const box = document.getElementById('vocab-picture-examples');
    if (box && q && activeVocabularyStudyMode === 'picture') box.innerHTML = vocabularyExamplesHtml_(q, true);
}
function renderVocabularySharedStudy_(q) {
    if (!q || !activeVocabularyHubTopic) return;
    const tabs = vocabularyTabsHtml_();
    const visual = vocabularyVisualHtml_(q);
    const group = activeVocabularyHubTopic;
    const optionHtml = (opt,i) => {
        const rec = getVocabularyRecordByWord_(opt);
        const ipa = getVocabularyIpaForWord_(opt);
        const meaning = String(rec?.vietnamese || '').trim();
        return `<button data-opt="${escapeHtml(opt)}" onclick="checkAnswer('${escapeJsStringTa1_(opt)}')" class="option-btn w-full px-3 py-2.5 bg-pink-50/40 hover:bg-pink-100/70 border border-pink-200 rounded-2xl font-black text-slate-800 text-left transition-all"><span class="opt-text flex items-center gap-2 min-w-0"><strong class="text-pink-600 shrink-0">${String.fromCharCode(65+i)}.</strong><span class="font-black leading-tight shrink-0">${escapeHtml(opt)}</span>${ipa ? `<span class="text-sm md:text-base font-bold text-slate-500 shrink-0">/${escapeHtml(ipa)}/</span>` : ''}${meaning ? `<span class="vocab-option-meaning hidden text-sm md:text-base font-bold text-violet-600 truncate">(${escapeHtml(meaning)})</span>` : ''}</span></button>`;
    };

    let body = '';
    if (activeVocabularyStudyMode === 'flashcard') {
        body = `<div class="grid grid-cols-1 md:grid-cols-2 gap-3 items-stretch"><section class="rounded-3xl border border-pink-200 bg-pink-50/40 p-3 shadow-sm flex flex-col"><div class="w-full aspect-[4/3] bg-white rounded-3xl overflow-hidden flex items-center justify-center mb-1" style="max-height:220px">${visual}</div><div class="relative w-full flex flex-col items-center justify-center px-12 text-center min-h-[84px]"><div class="flex items-center justify-center gap-2 flex-wrap"><div class="text-2xl md:text-3xl font-black text-slate-900 leading-tight">${escapeHtml(q.word || '')}</div>${q.part_of_speech ? `<span class="px-2 py-1 rounded-full bg-violet-100 text-violet-700 text-[10px] font-black">${escapeHtml(String(q.part_of_speech).toUpperCase())}</span>` : ''}</div>${q.ipa ? `<div class="mt-1 text-sm md:text-base font-black text-sky-700">/${escapeHtml(String(q.ipa).replace(/^\/+|\/+$/g,''))}/</div>` : ''}<div class="mt-1 text-base md:text-lg font-black text-violet-700">${escapeHtml(q.vietnamese || '')}</div><button onclick="speakVocabularyTarget_()" class="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-sky-100 text-sky-600 hover:bg-sky-200"><i class="fa-solid fa-volume-high"></i></button></div></section><section class="rounded-3xl border border-fuchsia-200 bg-gradient-to-br from-pink-50/60 via-white to-violet-50/60 p-3 shadow-sm">${vocabularyExamplesHtml_(q,true)}</section></div>`;
    } else if (activeVocabularyStudyMode === 'picture') {
        const options = getVocabularyChoiceOptions_(q); q.answer = q.word; q.options = options;
        const solved = userAnswers[currentQIndex] === q.answer;
        body = `<div class="text-center mb-2"><div class="flex items-center justify-center gap-2 flex-wrap"><span class="px-3 py-1 rounded-full bg-pink-50 border border-pink-200 text-pink-700 font-black text-xs">${group.icon} Level ${group.level} · ${group.name}</span><span class="text-lg md:text-xl font-black text-slate-900">Choose the correct English word:</span><button onclick="speakVocabularyPrompt_()" class="w-8 h-8 rounded-full bg-sky-100 text-sky-600"><i class="fa-solid fa-volume-high text-xs"></i></button></div></div><div class="grid grid-cols-1 md:grid-cols-2 gap-3 mb-2"><section class="rounded-3xl border border-dashed border-pink-300 bg-pink-50/30 p-3 flex flex-col"><div class="w-full aspect-[4/3] max-h-[210px] flex items-center justify-center overflow-hidden rounded-2xl bg-white">${visual}</div><div class="mt-2 text-center text-xl md:text-2xl font-black text-violet-700 leading-tight">Nghĩa: ${escapeHtml(q.vietnamese || '')}</div></section><section id="vocab-picture-examples" class="rounded-3xl border border-fuchsia-200 bg-gradient-to-br from-pink-50/50 via-white to-violet-50/50 p-3">${vocabularyExamplesHtml_(q, solved)}</section></div><div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">${options.map(optionHtml).join('')}</div>`;
    } else {
        const options = getVocabularyChoiceOptions_(q); q.answer = q.word; q.options = options;
        body = `<div class="min-h-[275px] flex flex-col items-center justify-center"><div class="text-xl md:text-2xl font-black text-slate-900 mb-1">Listen and choose.</div><div class="text-xs md:text-sm font-bold text-slate-400 mb-3">Nghe và chọn từ đúng</div><button onclick="speakVocabularyTarget_()" class="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-pink-500 to-violet-500 text-white shadow-lg hover:scale-105 transition-transform flex items-center justify-center mb-4"><i class="fa-solid fa-volume-high text-3xl"></i></button><div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full max-w-3xl">${options.map(optionHtml).join('')}</div></div>`;
    }
    document.getElementById('question-box').innerHTML = `<div class="w-full max-w-5xl mx-auto px-1 md:px-2 -mt-2">${tabs}${body}</div>`;
    restoreQuestionState(q);
    if (userAnswers[currentQIndex] === q.answer) revealVocabularyAfterCorrect_();
    updateNavButtons();
    if (activeVocabularyStudyMode === 'listen' && autoSpeechEnabled) setTimeout(() => speakVocabularyTarget_(), 120);
}

// Chuẩn hoá từ tiếng Anh để tra nghĩa: bỏ Emoji nhưng giữ nguyên chữ, số, dấu gạch nối/apostrophe.
function normalizeVocabWordKey(text) {
    return String(text || '')
        .replace(/[\u{0030}-\u{0039}]?[\u{FE0F}]?[\u{20E3}]/gu, '')
        .replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{1F1E6}-\u{1F1FF}\u{FE0F}]/gu, '')
        .replace(/\s+/g, ' ')
        .trim()
        .toLowerCase();
}

// Rút nghĩa tiếng Việt trực tiếp từ câu hỏi Vocabulary trong JSON.
// VD: "Từ nào có nghĩa là 'bà'?" hoặc "... mô tả 'cái cốc' ...".
function extractVocabularyVietnameseMeaning(questionText) {
    const text = String(questionText || '');
    const patterns = [
        /(?:có\s+)?nghĩa(?:\s+là)?\s*['“\"]([^'”\"]+)['”\"]/i,
        /mô\s+tả\s*['“\"]([^'”\"]+)['”\"]/i,
        /cho\s*['“\"]([^'”\"]+)['”\"]/i
    ];
    for (const re of patterns) {
        const m = text.match(re);
        if (m && m[1]) return m[1].trim();
    }
    return '';
}

function addVocabularyMeaning(wordText, meaningText) {
    const key = normalizeVocabWordKey(wordText);
    const meaning = String(meaningText || '').trim();
    if (!key || !meaning) return;
    if (!wordMeaningMapCache[key]) wordMeaningMapCache[key] = [];
    if (!wordMeaningMapCache[key].includes(meaning)) wordMeaningMapCache[key].push(meaning);
}

function extractMiniGameEmoji(text) {
    const m = String(text || '').match(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u);
    return m ? m[0] : '✨';
}

const MINI_GAME_VOCAB_TOPIC_ORDER = [
    'Me, My Family & Home',
    'My School & Playtime',
    'The Animal Kingdom',
    'Numbers, Shapes & Colors',
    'Yummy Food & Garden',
    'Cool Vehicles, Action & Nature'
];

function buildMiniGameVocabItem(q, index) {
    const answerRaw = q.a ?? q.answer ?? '';
    const word = normalizeVocabWordKey(answerRaw);
    const vietnamese = extractVocabularyVietnameseMeaning(q.q || q.question_text || '');
    if (!word || !vietnamese) return null;
    const topicName = String(q.topic ?? q.content_topic ?? 'Từ vựng lớp 1').trim() || 'Từ vựng lớp 1';
    const topicIndex = MINI_GAME_VOCAB_TOPIC_ORDER.indexOf(topicName);
    return {
        id: q.id ?? q.question_id ?? index,
        word,
        vietnamese,
        emoji: extractMiniGameEmoji(answerRaw),
        image_url: resolveEnglishImage_(q.img ?? q.image_url ?? '', q.imageId ?? q.image_id ?? ''),
        sentence: '',
        hint: q.h ?? q.hint ?? '',
        topic_id: topicIndex >= 0 ? topicIndex + 1 : 99,
        topic_name: topicName
    };
}

async function __legacyTa1_loadSemesterData_1() {
    if (semesterDataLoadingPromise) return semesterDataLoadingPromise;

    semesterDataLoadingPromise = (async () => {
        const results = await Promise.all(SEMESTER_DATA_FILES.map(async (file) => {
            const res = await fetch(file);
            if (!res.ok) throw new Error(`Không thể tải file dữ liệu ${file}`);
            return res.json();
        }));

        const sectionsById = {};
        weeksByIdCache = weeksByIdCache || {};
        miniGameVocabCache = miniGameVocabCache || [];

        results.forEach(data => {
            (data.sections || []).forEach(sec => {
                if (!sectionsById[sec.id]) {
                    sectionsById[sec.id] = { id: sec.id, name: sec.name, desc: sec.desc || '', rawQuestions: [] };
                }
                (sec.subs || []).forEach(sub => {
                    (sub.qs || []).forEach((q, qIndex) => {
                        // Mini Game Vocabulary: lấy đúng Chuyên mục 2.1 của TA1 làm nguồn từ vựng chung.
                        if (Number(sec.id) === 2 && String(sub.id || q.sub || '') === '2.1') {
                            const item = buildMiniGameVocabItem(q, qIndex);
                            if (item && !miniGameVocabCache.some(x => x.word === item.word && x.vietnamese === item.vietnamese)) {
                                miniGameVocabCache.push(item);
                            }
                        }

                        // Vocabulary: gom cặp từ tiếng Anh -> nghĩa tiếng Việt từ dữ liệu thật.
                        // Cùng một từ nếu xuất hiện với 2+ nghĩa khác nhau thì giữ TẤT CẢ, không ghi đè.
                        if (Number(sec.id) === 2) {
                            const viMeaning = extractVocabularyVietnameseMeaning(q.q || q.question_text || '');
                            addVocabularyMeaning(q.a ?? q.answer ?? '', viMeaning);
                        }

                        // sub_code = mã hoạt động con thật ("1.3") dùng để LỌC (VD Phonics Matcher = mục 1);
                        // sub = tên hiển thị thân thiện ("Phonics Matcher (Nối âm)") dùng để HIỂN THỊ tiêu đề câu hỏi.
                        sectionsById[sec.id].rawQuestions.push({ ...q, sub_code: q.sub || sub.id, sub: sub.name || q.sub || sub.id });
                    });
                });
            });
            (data.weeks || []).forEach(w => {
                weeksByIdCache[w.week_id] = w.questions || [];
            });
        });

        return { sectionsById };
    })();

    return semesterDataLoadingPromise;
}

async function fetchAllQuestionsFlat() {
    if (allQuestionsFlatCache) return allQuestionsFlatCache;
    const { sectionsById } = await loadSemesterData();
    const rawQuestions = Object.values(sectionsById).flatMap(sec => sec.rawQuestions);
    allQuestionsFlatCache = rawQuestions.map(normalizeQuestion).filter(Boolean);
    return allQuestionsFlatCache;
}

async function fetchAllTopicsData() {
    if (allTopicsDataCache) return allTopicsDataCache;
    const { sectionsById } = await loadSemesterData();

    allTopicsDataCache = TOPICS_CONFIG.map(t => {
        const sec = sectionsById[t.id];
        const questions = sec ? sec.rawQuestions.map(normalizeQuestion).filter(Boolean) : [];
        return {
            topic_id: t.id,
            topic_name: t.title,
            description: sec?.desc || t.desc,
            lecture_title: '',
            lecture_content: '',
            lecture_audio_text: '',
            questions
        };
    });
    return allTopicsDataCache;
}

function getMiniGameVocabPool(options = {}) {
    const { topicId = null, singleWordOnly = false, maxLength = null, minLength = null } = options;
    let pool = Array.isArray(miniGameVocabCache) ? miniGameVocabCache : [];
    if (topicId !== null && topicId !== undefined && topicId !== 'all') {
        pool = pool.filter(item => Number(item.topic_id) === Number(topicId));
    }
    if (singleWordOnly) pool = pool.filter(item => /^[A-Za-z]+$/.test(item.word));
    if (Number.isFinite(minLength)) pool = pool.filter(item => item.word.replace(/[^A-Za-z]/g, '').length >= minLength);
    if (Number.isFinite(maxLength)) pool = pool.filter(item => item.word.replace(/[^A-Za-z]/g, '').length <= maxLength);
    return pool.map(item => ({ ...item }));
}

function getMiniGameTopicGroups() {
    const map = new Map();
    (miniGameVocabCache || []).forEach(item => {
        const id = Number(item.topic_id || 0);
        if (!id || map.has(id)) return;
        map.set(id, { id, name: item.topic_name || `Nhóm ${id}` });
    });
    return [...map.values()].sort((a, b) => a.id - b.id);
}

async function ensureMiniGameVocabReady() {
    await fetchAllQuestionsFlat();
    if (!miniGameVocabCache || !miniGameVocabCache.length) {
        throw new Error('Không tìm thấy dữ liệu từ Chuyên mục 2.1 - Flashcards Library.');
    }
    return miniGameVocabCache;
}

function getMiniGameSectionPool(sectionCodes = []) {
    const codes = new Set((Array.isArray(sectionCodes) ? sectionCodes : [sectionCodes]).map(String));
    const pool = Array.isArray(allQuestionsFlatCache) ? allQuestionsFlatCache : [];
    return pool
        .filter(q => codes.has(String(q.sub_topic || '')))
        .map(q => ({
            ...q,
            options: Array.isArray(q.options) ? q.options.slice() : [],
            options_ipa: Array.isArray(q.options_ipa) ? q.options_ipa.slice() : q.options_ipa
        }));
}

async function ensureMiniGameLearningReady(sectionCodes = []) {
    await fetchAllQuestionsFlat();
    const pool = getMiniGameSectionPool(sectionCodes);
    if (!pool.length) {
        throw new Error(`Không tìm thấy học liệu cho Chuyên mục ${[].concat(sectionCodes).join(', ')}.`);
    }
    return pool;
}

// File đề thi Tiếng Anh Lớp 1 dùng mảng PHẲNG "exams", mỗi đề gắn "exam_category"
// ("Học Kỳ I" / "Học Kỳ II" / "Học Sinh Giỏi") để phân loại — KHÁC với bản Lớp 2 cũ (3 mảng
// semester_1_exams/semester_2_exams/hsg_exams riêng biệt). Nạp 1 lần rồi tự gom nhóm lại
// đúng 3 mảng ấy để toàn bộ code phía dưới (examFileMap, startRandomExam...) không cần đổi gì thêm.
const EXAM_CATEGORY_TO_ARRAY_KEY = {
    'Học Kỳ I': 'semester_1_exams',
    'Học Kỳ II': 'semester_2_exams',
    'Học Sinh Giỏi': 'hsg_exams'
};

async function __legacyTa1_loadExamDataFile_1(file) {
    if (examsCache[file]) return examsCache[file];
    const res = await fetch(`assets/data/${file}`);
    if (!res.ok) throw new Error("Không thể tải file đề thi");
    const raw = await res.json();

    const data = { semester_1_exams: [], semester_2_exams: [], hsg_exams: [] };
    (raw.exams || []).forEach(ex => {
        const arrayKey = EXAM_CATEGORY_TO_ARRAY_KEY[ex.exam_category] || 'semester_1_exams';
        data[arrayKey].push({
            ...ex,
            exam_title: ex.exam_name,
            questions: (ex.questions || []).map(q => normalizeQuestion({ ...q, diem: q.points ?? q.diem })).filter(Boolean)
        });
    });

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

    let html = `
        <div onclick="openAlphabetIPA()" class="pastel-card p-2.5 flex flex-col justify-start cursor-pointer hover:border-violet-400 transition-all group bg-gradient-to-br from-white to-violet-50/50 min-h-[104px]">
            <div class="flex items-center space-x-2.5">
                <div class="w-10 h-10 bg-violet-100 rounded-2xl flex items-center justify-center text-xl font-extrabold text-violet-600 shadow-inner group-hover:scale-110 transition-transform shrink-0">🔤</div>
                <div class="min-w-0"><h3 class="font-extrabold text-violet-700 text-base md:text-lg leading-snug"><span class="card-title-bi"><span class="en">1. Alphabet & IPA</span><span class="vi">Bảng chữ cái & phiên âm</span></span></h3></div>
            </div>
            <div class="flex justify-between items-end gap-2 mt-1.5 pt-1 border-t border-violet-100">
                <div class="min-w-0 leading-snug"><div class="text-sm md:text-[15px] font-bold text-gray-600">Letters & sounds</div><div class="text-[13px] md:text-sm font-bold text-gray-400 mt-0.5">Chữ cái & âm</div></div>
                <span class="bg-violet-100 text-violet-700 px-2.5 py-1 rounded-full text-xs md:text-sm font-extrabold shrink-0">26 chữ + 44 âm</span>
            </div>
        </div>`;

    TOPICS_CONFIG.forEach(t => {
        const topicObj = topicsData.find(item => Number(item.topic_id) === Number(t.id));
        const totalCount = topicObj && topicObj.questions ? topicObj.questions.length : 0;
        const countLabel = totalCount > 0 ? `${totalCount} câu` : 'Đang cập nhật';
        html += `
            <div onclick="openTopic(${t.id}, '${t.title}', '${t.icon}')" class="pastel-card p-2.5 flex flex-col justify-start cursor-pointer hover:border-${t.color}-400 transition-all group min-h-[104px] relative">
                <div class="flex items-center space-x-2.5">
                    <div class="w-10 h-10 bg-${t.color}-100 rounded-2xl flex items-center justify-center text-xl font-extrabold text-${t.color}-600 shadow-inner group-hover:scale-110 transition-transform shrink-0">${t.icon}</div>
                    <div class="min-w-0"><h3 class="font-extrabold text-${t.color}-700 text-base md:text-lg leading-snug"><span class="card-title-bi"><span class="en">${t.title}</span><span class="vi">${t.titleVi || ''}</span></span></h3></div>
                </div>
                <div class="flex justify-between items-end gap-2 mt-1.5 pt-1 border-t border-pink-100">
                    <div class="min-w-0 leading-snug"><div class="text-sm md:text-[15px] font-bold text-gray-600">${t.descEn || ''}</div><div class="text-[13px] md:text-sm font-bold text-gray-400 mt-0.5">${t.descVi || ''}</div></div>
                    <span class="bg-${t.color}-50 text-${t.color}-600 px-2.5 py-1 rounded-full text-xs md:text-sm font-extrabold shrink-0">${countLabel}</span>
                </div>
            </div>`;
    });
    container.innerHTML = html;
}

async function __legacyTa1_startRandomExam_1(categoryKey) {
    stopSpeaking();
    const arrayKey = examFileMap[categoryKey]?.arrayKey || 'semester_1_exams';

    showLoadingOverlay("Đang chuẩn bị đề thi...");
    try {
        const examData = await loadExamDataFile('de_thi_tieng_anh_1.json');
        hideLoadingOverlay();

        const pool = (examData && Array.isArray(examData[arrayKey])) ? examData[arrayKey] : [];
        if (!pool.length) return alert('Đang cập nhật thêm đề thi cho mục này, bé quay lại sau nhé!');

        const examIndex = Math.floor(Math.random() * pool.length);
        const exam = pool[examIndex];
        const examLabel = examFileMap[categoryKey]?.label || 'Đề thi';
        const examTitle = exam.exam_title || `${examLabel} - Đề số ${examIndex + 1}`;

        activeExamContext = { categoryKey, examIndex, examTitle };
        activeRoadmapContext = null;
        pendingTopicQuiz = null;

        const questions = Array.isArray(exam.questions) && exam.questions.length ? exam.questions : [];
        if (!questions.length) return alert('Đề thi này chưa có câu hỏi, bé chọn đề khác nhé!');

        updateNavTabs("12. Đấu trường đề thi", "🏆", examTitle);
        startTopicQuiz(0, examTitle, shuffleArray(questions), null);
    } catch (err) {
        hideLoadingOverlay();
        alert(`Không thể tải đề thi: ${err.message}`);
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
            alert('Đã hết giờ làm bài! Bài thi sẽ được nộp lại nhé bé.');
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
    stopSpeaking();
    if (!requirePremiumAccess('Đấu trường đề thi')) return;
    if (typeof setMainTabActive_ === 'function') setMainTabActive_('exams');
    inAlphaIpaFlow = false;
    inMiniGameFlow = false;
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
    try { examData = await loadExamDataFile('de_thi_tieng_anh_1.json'); } catch (e) {}

    const getCount = (categoryKey) => {
        const arrayKey = examFileMap[categoryKey]?.arrayKey;
        if (!examData || !Array.isArray(examData[arrayKey])) return 0;
        return examData[arrayKey].length;
    };

    const countHK1 = getCount('hocky1');
    const countHK2 = getCount('hocky2');
    const countHSG = getCount('hsg');

    let html = `
        <div class="bg-pink-50/70 p-5 rounded-3xl border-2 border-pink-200 flex flex-col justify-between items-center text-center group min-h-[250px] pastel-card">
            <div>
                <div class="text-4xl mb-1.5 group-hover:scale-110 transition-transform">📘</div>
                <h3 class="font-extrabold text-pink-600 text-lg mb-1">Học kỳ 1</h3>
                <p class="text-xs text-gray-500 font-bold mb-2">Kiểm tra kiến thức HK1</p>
                <span class="inline-block bg-pink-100 text-pink-700 px-3 py-0.5 rounded-full text-xs font-black mb-3">${countHK1} đề thi chuẩn</span>
            </div>
            <div class="w-full space-y-2">
                <button onclick="startRandomExam('hocky1')" class="w-full py-2.5 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-extrabold rounded-xl text-xs pastel-btn shadow-sm">
                    🚀 Vào thi thử
                </button>
                <button onclick="openHistoryModal('LichSuBaiThiHK1')" class="w-full py-2 bg-white text-pink-700 border border-pink-300 font-extrabold rounded-xl text-xs pastel-btn hover:bg-pink-50">
                    📊 Xem lịch sử thi
                </button>
            </div>
        </div>

        <div class="bg-purple-50/70 p-5 rounded-3xl border-2 border-purple-200 flex flex-col justify-between items-center text-center group min-h-[250px] pastel-card">
            <div>
                <div class="text-4xl mb-1.5 group-hover:scale-110 transition-transform">📗</div>
                <h3 class="font-extrabold text-purple-600 text-lg mb-1">Học kỳ 2</h3>
                <p class="text-xs text-gray-500 font-bold mb-2">Kiểm tra kiến thức HK2</p>
                <span class="inline-block bg-purple-100 text-purple-700 px-3 py-0.5 rounded-full text-xs font-black mb-3">${countHK2} đề thi chuẩn</span>
            </div>
            <div class="w-full space-y-2">
                <button onclick="startRandomExam('hocky2')" class="w-full py-2.5 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-extrabold rounded-xl text-xs pastel-btn shadow-sm">
                    🚀 Vào thi thử
                </button>
                <button onclick="openHistoryModal('LichSuBaiThiHK2')" class="w-full py-2 bg-white text-purple-700 border border-purple-300 font-extrabold rounded-xl text-xs pastel-btn hover:bg-purple-50">
                    📊 Xem lịch sử thi
                </button>
            </div>
        </div>

        <div class="bg-amber-50/70 p-5 rounded-3xl border-2 border-amber-200 flex flex-col justify-between items-center text-center group min-h-[250px] pastel-card">
            <div>
                <div class="text-4xl mb-1.5 group-hover:scale-110 transition-transform">👑</div>
                <h3 class="font-extrabold text-amber-600 text-lg mb-1">Học sinh giỏi</h3>
                <p class="text-xs text-gray-500 font-bold mb-2">Thử thách nâng cao</p>
                <span class="inline-block bg-amber-100 text-amber-700 px-3 py-0.5 rounded-full text-xs font-black mb-3">${countHSG} đề thi tuyển chọn</span>
            </div>
            <div class="w-full space-y-2">
                <button onclick="startRandomExam('hsg')" class="w-full py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-extrabold rounded-xl text-xs pastel-btn shadow-sm">
                    🚀 Vào thi thử
                </button>
                <button onclick="openHistoryModal('LichSuBaiThiHSG')" class="w-full py-2 bg-white text-amber-700 border border-amber-300 font-extrabold rounded-xl text-xs pastel-btn hover:bg-amber-50">
                    📊 Xem lịch sử thi
                </button>
            </div>
        </div>
    `;
    container.innerHTML = html;
}

// ==========================================
// CHUYÊN MỤC 1: ALPHABET & IPA (bê nguyên nội dung từ chương trình cũ)
// ==========================================
let alphabetIpaLoaded = false;
let currentAlphabetIndex = 0;
let currentIPAIndex = 0;
let inAlphaIpaFlow = false;
let inMiniGameFlow = false;

async function __legacyTa1_loadAlphabetIPAData_1() {
    if (alphabetIpaLoaded) return;
    const [alphaRes, ipaRes] = await Promise.all([
        fetch('assets/data/alphabet_english_1.json').then(r => r.json()),
        fetch('assets/data/ipa_english_1.json').then(r => r.json())
    ]);
    ALPHABET_DATA = alphaRes;
    IPA_DATA = ipaRes;
    alphabetIpaLoaded = true;
}

async function openAlphabetIPA() {
    stopSpeaking();
    activeTopicId = null; activeExamContext = null; activeRoadmapContext = null; pendingTopicQuiz = null;
    inAlphaIpaFlow = true;
    updateNavTabs("1. Alphabet & IPA", "🔤", null);
    showLoadingOverlay("Đang tải bảng chữ cái & ngữ âm...");
    try {
        await loadAlphabetIPAData();
        let phonicsCount = 0;
        try {
            const flat = await fetchAllQuestionsFlat();
            phonicsCount = flat.filter(q => Math.floor(Number(q.sub_topic)) === 1).length;
        } catch (e) {}
        hideLoadingOverlay();
        renderAlphaIPAMenu(phonicsCount);
    } catch (err) {
        hideLoadingOverlay();
        alert('Không tải được dữ liệu Alphabet & IPA: ' + err.message);
    }
}

// Màn hình chọn 1 trong 3 mục nhỏ — dùng ĐÚNG khung "view-lecture" chuẩn (đồng bộ với mọi chuyên mục khác),
// chỉ khác ở chỗ 3 nút bấm dẫn sang 3 màn hình riêng (Alphabet, IPA, Phonics Matcher) thay vì bốc câu hỏi.
function renderAlphaIPAMenu(phonicsCount = 0) {
    document.getElementById('lecture-title').textContent = '1. Alphabet & IPA';
    document.getElementById('lecture-content').textContent = 'Chào con, đây là góc làm quen với bảng chữ cái và ngữ âm tiếng Anh! Con hãy chọn 1 mục nhỏ bên dưới để bắt đầu nhé.';
    document.getElementById('view-lecture').dataset.audioText = 'Chào con, đây là góc làm quen với bảng chữ cái và ngữ âm tiếng Anh! Con hãy chọn 1 mục nhỏ bên dưới để bắt đầu nhé.';

    const items = [
        { label: 'Alphabet (A-Z)', count: '26 chữ', action: "openAlphabetMenu(0)", style: SUBTOPIC_PALETTES[0] },
        { label: 'Bảng ngữ âm IPA', count: '44 âm', action: "openIPAMenu(0)", style: SUBTOPIC_PALETTES[1] },
        { label: 'Phonics Matcher', count: `${phonicsCount} câu`, action: "openPhonicsMatcher()", style: SUBTOPIC_PALETTES[2] }
    ];
    document.getElementById('lecture-subtopics-list').innerHTML = items.map((it, idx) => `
        <button onclick="${it.action}" class="p-3 ${it.style.card} border-2 rounded-xl font-bold text-left transition-all flex items-center justify-between shadow-sm pastel-btn">
            <span class="text-sm md:text-base leading-snug"><strong class="${it.style.num} mr-1.5">${idx + 1}.</strong> ${escapeHtml(it.label)}</span>
            <span class="text-xs font-extrabold ${it.style.badge} px-2.5 py-0.5 rounded-full border shrink-0 ml-1.5 shadow-inner">${it.count}</span>
        </button>`).join('');
    setSubtopicGridColumns(items.length);

    // Không có khái niệm "học trộn tất cả" ở đây vì 1.1/1.2 là bảng tra cứu tĩnh, 1.3 mới là luyện tập thật
    document.getElementById('wrap-mix-all-subtopics').classList.add('hidden');

    updateNavTabs("1. Alphabet & IPA", "🔤", null);
    switchAppView('view-lecture');
}

// ---------- 1.1 ALPHABET A-Z ----------
function openAlphabetMenu(index = 0) {
    stopSpeaking();
    inAlphaIpaFlow = true;
    if (index < 0) index = 0;
    if (index >= ALPHABET_DATA.length) index = ALPHABET_DATA.length - 1;
    currentAlphabetIndex = index;
    updateNavTabs("1. Alphabet & IPA", "🔤", "Alphabet A-Z");
    switchAppView('view-alphabet');

    const item = ALPHABET_DATA[index];
    const keyboardHtml = ALPHABET_DATA.map((alpha, idx) => {
        const isActive = idx === currentAlphabetIndex;
        return `<button onclick="openAlphabetMenu(${idx})" class="pastel-btn flex flex-col items-center justify-center rounded-xl p-1.5 shadow-sm cursor-pointer ${isActive ? 'bg-pink-500 text-white border-2 border-pink-600 scale-105 ring-2 ring-pink-200' : 'bg-white text-gray-700 border border-gray-200 hover:bg-pink-50 hover:border-pink-300'} min-w-[52px] min-h-[52px]">
            <span class="text-base font-black">${alpha.letter}</span>
            <span class="font-bold ${isActive ? 'text-white' : 'text-pink-600'} text-xs md:text-sm">${alpha.ipaName}</span>
        </button>`;
    }).join('');

    const wordCard = (w, idx) => `
        <div onclick="speakAlphaWord(${index},${idx})" class="card-hover bg-white border-2 border-emerald-300 hover:border-emerald-500 rounded-xl p-2.5 flex flex-col items-center justify-center cursor-pointer shadow-sm">
            ${englishWordCardVisual_(w, 'w-16 h-16 mb-1')}
            <div class="flex items-center gap-1"><span class="text-sm font-black text-emerald-800">${escapeHtml(w.en)}</span><span class="text-[9px] px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-700 font-bold">${w.pos || ''}</span></div>
            <div class="text-emerald-600 text-base mt-0.5">${w.ipa}</div>
            <div class="text-xs font-extrabold text-gray-600 my-0.5">${escapeHtml(w.vi)}</div>
            <div class="text-[10px] font-bold text-gray-400 mb-1.5">"${escapeHtml(w.ex || '')}"</div>
            <span class="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[9px] font-black px-2 py-0.5 rounded-lg">🔊 Listen</span>
        </div>`;

    document.getElementById('alphaipa-content').innerHTML = `
        <div class="w-full max-w-4xl flex flex-col items-center">
            <div class="mb-2 text-center">
                <h2 class="text-lg md:text-xl font-black text-pink-600 mb-0.5">🔤 ENGLISH ALPHABET & PHONICS (A-Z)</h2>
                <p class="text-xs font-bold text-gray-500">Bấm vào chữ cái hoặc từ mẫu để nghe phát âm:</p>
                <button onclick="speakAlphabetLetter(${index})" class="pastel-btn mt-1.5 bg-pink-100 hover:bg-pink-200 text-pink-700 border border-pink-300 font-extrabold px-3.5 py-1 rounded-xl text-xs flex items-center justify-center gap-1 mx-auto shadow-sm cursor-pointer">
                    <i class="fa-solid fa-volume-high"></i><span>Listen to Letter ${item.letter}</span>
                </button>
            </div>
            <div class="bg-pink-50/60 border-2 border-dashed border-pink-300 rounded-2xl p-3 md:p-3.5 w-full mb-3 shadow-sm">
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5 items-stretch">
                    <div onclick="speakAlphabetLetter(${index})" class="card-hover bg-white border-2 border-pink-400 rounded-xl p-3 flex flex-col items-center justify-center cursor-pointer shadow-sm bg-gradient-to-b from-white to-pink-50">
                        <div class="text-5xl md:text-6xl font-black text-pink-600 mb-1">${item.name}</div>
                        <div class="text-xs font-extrabold text-gray-600 mb-2">Cách đọc: <b class="text-purple-600 text-lg">${item.ipaName}</b></div>
                        <span class="bg-pink-100 text-pink-700 text-[10px] font-black px-2.5 py-0.5 rounded-full border border-pink-200">👆 Tap to Listen</span>
                    </div>
                    ${wordCard(item.word1, 1)}${wordCard(item.word2, 2)}${wordCard(item.word3, 3)}
                </div>
            </div>
            <div class="bg-white border border-gray-200 rounded-2xl p-2.5 w-full shadow-inner mb-2.5">
                <div class="flex flex-wrap items-center justify-center gap-1">${keyboardHtml}</div>
            </div>
            <div class="flex items-center justify-center space-x-3 mt-1">
                <button onclick="openAlphabetMenu(${index - 1})" class="pastel-btn bg-sky-50 hover:bg-sky-100 text-sky-600 border-2 border-sky-300 font-black text-xs md:text-sm px-4 py-2 rounded-xl shadow-sm flex items-center space-x-1 cursor-pointer ${index <= 0 ? 'opacity-40 pointer-events-none' : ''}"><i class="fa-solid fa-arrow-left"></i><span>Previous</span></button>
                <button onclick="openPhonicsMatcher()" class="pastel-btn bg-amber-400 hover:bg-amber-500 text-amber-900 border-2 border-amber-500 font-black text-xs md:text-sm px-5 py-2 rounded-xl shadow-sm flex items-center gap-1.5 cursor-pointer"><span>🎯 Phonics Quiz</span></button>
                <button onclick="openAlphabetMenu(${index + 1})" class="pastel-btn bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs md:text-sm px-5 py-2 rounded-xl shadow-sm flex items-center space-x-1 cursor-pointer ${index >= ALPHABET_DATA.length - 1 ? 'opacity-40 pointer-events-none' : ''}"><span>Next</span><i class="fa-solid fa-arrow-right"></i></button>
            </div>
        </div>`;
    speakAlphabetLetter(index);
}
function speakAlphabetLetter(index) { const item = ALPHABET_DATA[index]; if (item) speakEnglish(item.letter); }
function speakAlphaWord(index, wordNum) { const item = ALPHABET_DATA[index]; const w = item['word' + wordNum]; if (w) speakEnglish(w.en); }

// ---------- 1.2 IPA 44 SOUNDS ----------
function openIPAMenu(index = 0) {
    stopSpeaking();
    inAlphaIpaFlow = true;
    if (index < 0) index = 0;
    if (index >= IPA_DATA.length) index = IPA_DATA.length - 1;
    currentIPAIndex = index;
    updateNavTabs("1. Alphabet & IPA", "🔤", "Bảng ngữ âm IPA (44 âm)");
    switchAppView('view-alphabet');

    const item = IPA_DATA[currentIPAIndex];
    const soundButtonsHtml = IPA_DATA.map((snd, idx) => {
        const isActive = idx === currentIPAIndex;
        let badgeColor = isActive ? 'bg-pink-600 text-white border-pink-700' : 'bg-pink-50 text-pink-700 border-pink-200 hover:bg-pink-100';
        if (snd.type === 'vowel_di') badgeColor = isActive ? 'bg-purple-600 text-white border-purple-700' : 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100';
        else if (snd.type && snd.type.startsWith('consonant')) badgeColor = isActive ? 'bg-emerald-600 text-white border-emerald-700' : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100';
        return `<button onclick="openIPAMenu(${idx})" class="pastel-btn flex flex-col items-center justify-center rounded-xl p-1 shadow-sm border ${badgeColor} min-w-[50px] min-h-[46px] cursor-pointer ${isActive ? 'scale-105 ring-2 ring-pink-300 font-black' : ''}">
            <span class="text-base md:text-lg font-black">${snd.ipa}</span>
            <span class="text-[8px] font-bold opacity-80 line-clamp-1">${(snd.name || '').split(' ')[0]}</span>
        </button>`;
    }).join('');

    const examplesHtml = (item.words || []).map((w, wIdx) => `
        <div onclick="speakIPAExampleWord(${currentIPAIndex},${wIdx})" class="card-hover bg-white border-2 border-emerald-300 hover:border-emerald-500 rounded-xl p-2.5 flex flex-col items-center justify-center cursor-pointer shadow-sm text-center">
            ${englishWordCardVisual_(w, 'w-16 h-16 mb-1')}
            <div class="flex items-center gap-1"><span class="text-sm md:text-base font-black text-emerald-800">${escapeHtml(w.word)}</span><span class="text-[9px] px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-700 font-bold">${w.pos || ''}</span></div>
            <div class="text-emerald-600 text-sm md:text-base font-bold my-0.5">${w.ipa}</div>
            <div class="text-xs font-extrabold text-gray-700">${escapeHtml(w.vi)}</div>
            <div class="text-[10px] font-bold text-gray-400 mt-1 italic">"${escapeHtml(w.ex || '')}"</div>
            <span class="mt-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-[9px] font-black px-2.5 py-0.5 rounded-lg">🔊 Listen Word</span>
        </div>`).join('');

    let typeTag = 'Nguyên âm đơn (Monophthong)', typeBg = 'bg-pink-100 text-pink-700 border-pink-300';
    if (item.type === 'vowel_di') { typeTag = 'Nguyên âm đôi (Diphthong)'; typeBg = 'bg-purple-100 text-purple-700 border-purple-300'; }
    else if (item.type === 'consonant_unvoiced') { typeTag = 'Phụ âm vô thanh (Voiceless)'; typeBg = 'bg-blue-100 text-blue-700 border-blue-300'; }
    else if (item.type === 'consonant_voiced') { typeTag = 'Phụ âm hữu thanh (Voiced)'; typeBg = 'bg-emerald-100 text-emerald-700 border-emerald-300'; }

    document.getElementById('alphaipa-content').innerHTML = `
        <div class="w-full max-w-5xl flex flex-col items-center">
            <div class="mb-2 text-center w-full">
                <div class="flex items-center justify-between flex-wrap gap-1 mb-1">
                    <span class="text-xs font-black bg-pink-100 text-pink-700 px-3 py-1 rounded-xl shadow-sm">Âm ${currentIPAIndex + 1} / ${IPA_DATA.length} IPA</span>
                    <h2 class="text-base md:text-xl font-black text-pink-600 flex items-center justify-center gap-1.5"><span>🗣️</span><span>BẢNG PHIÊN ÂM QUỐC TẾ IPA</span><span>🎙️</span></h2>
                    <button onclick="openPhonicsMatcher()" class="pastel-btn bg-amber-400 hover:bg-amber-500 text-amber-900 border-2 border-amber-500 text-xs font-black px-3.5 py-1 rounded-xl shadow-sm flex items-center gap-1 cursor-pointer"><span>🎯 IPA Quiz</span></button>
                </div>
                <p class="text-xs font-bold text-gray-500">Bấm vào bất kỳ âm IPA nào để nghe phát âm chuẩn và xem hướng dẫn chi tiết:</p>
            </div>
            <div class="bg-gradient-to-r from-pink-50/80 via-purple-50/80 to-indigo-50/80 border-2 border-dashed border-pink-300 rounded-2xl p-3 md:p-4 w-full mb-3 shadow-sm">
                <div class="grid grid-cols-1 md:grid-cols-12 gap-3 items-stretch">
                    <div class="md:col-span-5 bg-white/95 rounded-2xl p-3 border border-pink-200 shadow-sm flex flex-col items-center justify-between text-center">
                        <div>
                            <span class="text-[10px] md:text-xs font-black uppercase px-2.5 py-0.5 rounded-full border ${typeBg} inline-block mb-1.5">${typeTag}</span>
                            <div onclick="speakIPASound(${currentIPAIndex})" class="cursor-pointer group">
                                <div class="text-5xl md:text-6xl font-black text-pink-600 drop-shadow-sm group-hover:scale-105 transition transform">${item.ipa}</div>
                                <div class="text-xs md:text-sm font-black text-purple-700 mt-1">${escapeHtml(item.name)}</div>
                            </div>
                        </div>
                        <div class="my-2.5 bg-amber-50/80 border border-amber-200 rounded-xl p-2.5 text-left w-full shadow-inner">
                            <div class="text-[11px] font-black text-amber-800 uppercase tracking-wide flex items-center gap-1 mb-1"><i class="fa-solid fa-lightbulb text-amber-500"></i><span>Hướng dẫn phát âm chuẩn:</span></div>
                            <p class="text-xs font-bold text-gray-700 leading-relaxed">${escapeHtml(item.guide || '')}</p>
                        </div>
                        <div class="flex items-center justify-center gap-2 w-full mt-auto">
                            <button onclick="speakIPASound(${currentIPAIndex})" class="pastel-btn flex-1 bg-pink-500 hover:bg-pink-600 text-white font-black text-xs py-2 px-3 rounded-xl shadow-md flex items-center justify-center gap-1.5 cursor-pointer"><i class="fa-solid fa-volume-high"></i><span>Nghe âm ${item.ipa}</span></button>
                            <button onclick="speakIPAGuideVietnamese(${currentIPAIndex})" class="pastel-btn bg-purple-100 hover:bg-purple-200 text-purple-700 border border-purple-300 font-black text-xs py-2 px-2.5 rounded-xl shadow-sm flex items-center justify-center gap-1 cursor-pointer"><i class="fa-solid fa-language"></i><span>Đọc hướng dẫn</span></button>
                        </div>
                    </div>
                    <div class="md:col-span-7 flex flex-col justify-between">
                        <div class="text-left mb-1.5 flex items-center justify-between">
                            <span class="text-xs font-black text-emerald-800 uppercase tracking-wider flex items-center gap-1"><i class="fa-solid fa-star text-amber-400"></i><span>3 VÍ DỤ TỪ VỰNG CHUẨN CỦA ÂM ${item.ipa}:</span></span>
                        </div>
                        <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 flex-1 items-stretch">${examplesHtml}</div>
                        <div class="mt-2 text-center text-[11px] font-bold text-gray-400">👆 Chạm vào từng thẻ để nghe phát âm từ vựng và câu ví dụ sinh động!</div>
                    </div>
                </div>
            </div>
            <div class="bg-white border border-gray-200 rounded-2xl p-2.5 w-full shadow-inner mb-2.5">
                <div class="flex flex-wrap items-center justify-center gap-1">${soundButtonsHtml}</div>
            </div>
            <div class="flex items-center justify-center space-x-3">
                <button onclick="openIPAMenu(${currentIPAIndex - 1})" class="pastel-btn bg-sky-50 hover:bg-sky-100 text-sky-600 border-2 border-sky-300 font-black text-sm px-5 py-2 rounded-xl shadow-sm flex items-center space-x-1.5 cursor-pointer ${currentIPAIndex <= 0 ? 'opacity-40 pointer-events-none' : ''}"><i class="fa-solid fa-arrow-left"></i><span>Previous Sound</span></button>
                <button onclick="openIPAMenu(${currentIPAIndex + 1})" class="pastel-btn bg-amber-400 hover:bg-amber-500 text-amber-900 border-2 border-amber-500 font-black text-sm px-6 py-2 rounded-xl shadow-md flex items-center space-x-1.5 cursor-pointer ${currentIPAIndex >= IPA_DATA.length - 1 ? 'opacity-40 pointer-events-none' : ''}"><span>Next Sound</span><i class="fa-solid fa-arrow-right"></i></button>
            </div>
        </div>`;
    speakIPASound(currentIPAIndex);
}
function speakIPASound(index) { const item = IPA_DATA[index]; if (item) speakEnglish(item.soundWord || item.ipa); }
function speakIPAGuideVietnamese(index) { const item = IPA_DATA[index]; if (item) speakVietnamese(item.guide || ''); }
function speakIPAExampleWord(index, wordIdx) { const item = IPA_DATA[index]; const w = item.words && item.words[wordIdx]; if (w) speakEnglish(w.word); }

// ---------- 1.3 PHONICS MATCHER (dùng đúng ngân hàng câu hỏi thật, chuyên mục 1) ----------
function openPhonicsMatcher() {
    stopSpeaking();
    showLoadingOverlay("Đang tải Phonics Matcher...");
    fetchAllQuestionsFlat().then(flat => {
        hideLoadingOverlay();
        const questions = shuffleArray(flat.filter(q => Math.floor(Number(q.sub_topic)) === 1));
        if (!questions.length) return alert('Đang cập nhật thêm câu hỏi cho Phonics Matcher, bé quay lại sau nhé!');
        activeTopicId = 1;
        pendingTopicQuiz = null; activeExamContext = null; activeRoadmapContext = null;
        practiceCycleRawPool = [...questions];
        updateNavTabs("1. Alphabet & IPA", "🔤", "1.3 Phonics Matcher");
        startTopicQuiz(1, '1.3 Phonics Matcher', questions, '1.3 Phonics Matcher');
    }).catch(err => { hideLoadingOverlay(); alert('Lỗi tải Phonics Matcher: ' + err.message); });
}

// ==========================================
// MODULE BÀI HỌC — 16 UNIT BÁM SGK TIẾNG ANH 1 GLOBAL SUCCESS
// Giao diện hiện tại chỉ dựng khung chức năng cơ bản; bước sau mới tinh chỉnh UI.
// ==========================================
const LESSON_DATA_FILE = 'assets/data/bai_hoc_tieng_anh_1.json';
let lessonDataCache_ = null;
let inLessonFlow = false;
let activeLessonUnit_ = null;
let activeLessonPage_ = 1;
let activeLessonSemester_ = 1;

async function __legacyTa1_loadLessonData__1() {
    if (lessonDataCache_) return lessonDataCache_;
    const res = await fetch(LESSON_DATA_FILE);
    if (!res.ok) throw new Error('Không tải được dữ liệu Bài học.');
    const data = await res.json();
    if (!data || !Array.isArray(data.bai_hoc) || !data.bai_hoc.length) {
        throw new Error('Dữ liệu Bài học chưa đúng cấu trúc.');
    }
    lessonDataCache_ = data;
    return lessonDataCache_;
}

async function __legacyTa1_openLessonsHub_1() {
    stopSpeaking();
    clearInterval(quizTimerInterval);
    inLessonFlow = true;
    activeLessonUnit_ = null;
    activeLessonPage_ = 1;
    activeExamContext = null;
    activeRoadmapContext = null;
    pendingTopicQuiz = null;
    inAlphaIpaFlow = false;
    inMiniGameFlow = false;

    updateNavTabs('Bài học', '📘', null, null);
    switchAppView('view-lessons');
    showLoadingOverlay('Đang mở Bài học...');
    try {
        const data = await loadLessonData_();
        renderLessonsHub_(data.bai_hoc);
    } catch (err) {
        const container = document.getElementById('lessons-content');
        if (container) container.innerHTML = '<div class="text-center py-12 text-slate-500 font-bold">Chưa tải được dữ liệu Bài học.</div>';
        alert('Không tải được Bài học. Bé thử tải lại trang nhé!');
    } finally {
        hideLoadingOverlay();
    }
}

function renderLessonsHub_(lessons) {
    const container = document.getElementById('lessons-content');
    if (!container) return;

    const semester1 = lessons.filter(x => Number(x.semester) === 1);
    const semester2 = lessons.filter(x => Number(x.semester) === 2);
    const currentItems = activeLessonSemester_ === 2 ? semester2 : semester1;

    const renderLessonCards = (items) => `
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            ${items.map((lesson, idx) => {
                const page1 = Array.isArray(lesson.pages) ? lesson.pages[0] : null;
                const phonics = page1?.phonics || {};
                const words = Array.isArray(phonics.words) ? phonics.words.join(', ') : '';
                return `
                    <button onclick="openLessonUnit_(${Number(lesson.source_unit || lesson.bai || idx + 1)}, 1)" class="pastel-card p-3 text-left hover:border-pink-400 transition-all group min-h-[118px] bg-gradient-to-br from-white to-pink-50/40">
                        <div class="flex items-start gap-2.5">
                            <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-pink-500 to-purple-500 text-white flex items-center justify-center font-black shadow-sm shrink-0">${Number(lesson.bai || lesson.source_unit || idx + 1)}</div>
                            <div class="min-w-0 flex-1">
                                <div class="text-xs font-black uppercase tracking-wide text-pink-500">Unit ${Number(lesson.source_unit || lesson.bai || idx + 1)}</div>
                                <div class="text-base md:text-lg font-black text-slate-700 leading-snug mt-0.5">${escapeHtml(lesson.source_title || `Unit ${idx + 1}`)}</div>
                                <div class="text-[13px] md:text-sm font-bold text-slate-400 mt-1">${escapeHtml(lesson.source_title_vi || '')}</div>
                            </div>
                        </div>
                        <div class="mt-2 pt-2 border-t border-pink-100 text-[13px] md:text-sm font-bold text-slate-500 leading-snug">
                            <span class="text-purple-600">${escapeHtml(phonics.letter || '')}${phonics.sound ? ' ' + escapeHtml(phonics.sound) : ''}</span>${words ? ' · ' + escapeHtml(words) : ''}
                        </div>
                    </button>`;
            }).join('')}
        </div>`;

    const tabClass = (semester) => semester === activeLessonSemester_
        ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white border-pink-400 shadow-md'
        : 'bg-white text-purple-700 border-purple-200 hover:bg-purple-50';

    container.innerHTML = `
        <div class="w-full">
            <div class="text-center mb-3">
                <h2 class="text-xl md:text-2xl font-black text-pink-600">📘 Bài học Tiếng Anh 1</h2>
                <p class="text-xs md:text-sm font-bold text-slate-500 mt-1">16 Unit song hành với sách Tiếng Anh 1 - Global Success</p>
            </div>

            <div class="grid grid-cols-2 gap-2 md:gap-3 mb-4">
                <button onclick="switchLessonSemester_(1)" class="min-h-[48px] md:min-h-[54px] rounded-2xl border-2 px-3 md:px-5 py-2.5 font-black text-sm md:text-base transition-all pastel-btn ${tabClass(1)}">
                    🌸 Học kỳ 1
                    <span class="ml-1 text-[10px] md:text-xs font-extrabold opacity-80">(${semester1.length} Unit)</span>
                </button>
                <button onclick="switchLessonSemester_(2)" class="min-h-[48px] md:min-h-[54px] rounded-2xl border-2 px-3 md:px-5 py-2.5 font-black text-sm md:text-base transition-all pastel-btn ${tabClass(2)}">
                    🌷 Học kỳ 2
                    <span class="ml-1 text-[10px] md:text-xs font-extrabold opacity-80">(${semester2.length} Unit)</span>
                </button>
            </div>

            <div class="flex items-center justify-between mb-2 px-1">
                <h3 class="text-sm md:text-base font-black text-purple-700">${activeLessonSemester_ === 2 ? '🌷 Học kỳ 2 · Unit 9–16' : '🌸 Học kỳ 1 · Unit 1–8'}</h3>
                <span class="text-xs font-extrabold text-pink-600 bg-pink-50 border border-pink-200 rounded-full px-2.5 py-1">${currentItems.length} Unit</span>
            </div>
            ${renderLessonCards(currentItems)}
        </div>`;
}

function switchLessonSemester_(semester) {
    activeLessonSemester_ = Number(semester) === 2 ? 2 : 1;
    if (lessonDataCache_?.bai_hoc) renderLessonsHub_(lessonDataCache_.bai_hoc);
}

async function openLessonUnit_(unitNo, pageNo = 1) {
    stopSpeaking();
    inLessonFlow = true;
    activeLessonUnit_ = Number(unitNo);
    activeLessonPage_ = Math.max(1, Math.min(3, Number(pageNo) || 1));
    switchAppView('view-lessons');

    try {
        const data = await loadLessonData_();
        const lesson = data.bai_hoc.find(x => Number(x.source_unit || x.bai) === activeLessonUnit_);
        if (!lesson) return alert('Chưa tìm thấy Unit này trong dữ liệu Bài học.');
        activeLessonSemester_ = Number(lesson.semester) === 2 ? 2 : 1;
        updateNavTabs('Bài học', '📘', `Unit ${activeLessonUnit_}: ${lesson.source_title || ''}`, `Trang ${activeLessonPage_}/3`);
        renderLessonPage_(lesson, activeLessonPage_);
    } catch (err) {
        alert('Không mở được Unit này. Bé thử lại nhé!');
    }
}

function renderLessonPage_(lesson, pageNo) {
    const container = document.getElementById('lessons-content');
    if (!container) return;
    const pages = Array.isArray(lesson.pages) ? lesson.pages : [];
    const page = pages.find(p => Number(p.page_no) === Number(pageNo)) || pages[pageNo - 1];
    if (!page) return;

    const nav = [1, 2, 3].map(n => {
        const labels = {1: 'Bài học', 2: 'Luyện tập', 3: 'Tổng kết'};
        const active = n === Number(pageNo);
        return `<button onclick="openLessonUnit_(${Number(lesson.source_unit || lesson.bai)}, ${n})" class="px-3 py-2 rounded-xl text-xs md:text-sm font-black border transition-all ${active ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white border-pink-400 shadow-md' : 'bg-white text-purple-600 border-purple-200 hover:bg-purple-50'}">${n}. ${labels[n]}</button>`;
    }).join('');

    let body = '';
    if (page.page_type === 'lesson') body = renderLessonLearnPage_(page);
    else if (page.page_type === 'questions') body = renderLessonPracticePage_(page);
    else body = renderLessonSummaryPage_(page);

    container.innerHTML = `
        <div class="w-full max-w-5xl mx-auto">
            <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
                <button onclick="openLessonsHub()" class="px-3 py-2 rounded-xl bg-white border-2 border-pink-200 text-pink-600 font-black text-xs md:text-sm pastel-btn">← Danh sách bài</button>
                <div class="text-center flex-1 min-w-[220px]">
                    <div class="text-[10px] md:text-xs font-black uppercase tracking-wider text-purple-500">Unit ${Number(lesson.source_unit || lesson.bai)} · Học kỳ ${Number(lesson.semester || 1)}</div>
                    <h2 class="text-lg md:text-2xl font-black text-slate-700 leading-tight">${escapeHtml(lesson.source_title || '')}</h2>
                    ${lesson.source_title_vi ? `<div class="text-xs md:text-sm font-bold text-slate-400 mt-0.5">${escapeHtml(lesson.source_title_vi)}</div>` : ''}
                </div>
                <div class="hidden md:block w-[110px]"></div>
            </div>
            <div class="flex flex-wrap justify-center gap-2 mb-3">${nav}</div>
            ${body}
            <div class="flex items-center justify-between gap-2 mt-4 pt-3 border-t border-pink-100">
                <button onclick="openLessonUnit_(${Number(lesson.source_unit || lesson.bai)}, ${Math.max(1, pageNo - 1)})" class="px-4 py-2 rounded-xl border-2 border-purple-200 bg-white text-purple-600 font-black text-xs md:text-sm pastel-btn ${pageNo <= 1 ? 'opacity-40 pointer-events-none' : ''}">← Trang trước</button>
                <span class="text-xs font-black text-slate-400">${pageNo} / 3</span>
                <button onclick="openLessonUnit_(${Number(lesson.source_unit || lesson.bai)}, ${Math.min(3, pageNo + 1)})" class="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-black text-xs md:text-sm pastel-btn ${pageNo >= 3 ? 'opacity-40 pointer-events-none' : ''}">Trang sau →</button>
            </div>
        </div>`;
}

function renderLessonLearnPage_(page) {
    const phonics = page.phonics || {};
    const vocabulary = Array.isArray(page.vocabulary) ? page.vocabulary : [];
    const dialogue = Array.isArray(page.mini_dialogue) ? page.mini_dialogue : [];
    return `
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-3">
            <div class="rounded-2xl border-2 border-pink-100 bg-pink-50/50 p-4">
                <div class="text-xs font-black uppercase tracking-wide text-pink-500 mb-2">🔤 Phonics</div>
                <div class="flex items-center gap-3">
                    <div class="w-16 h-16 rounded-2xl bg-white border-2 border-pink-300 flex items-center justify-center text-3xl font-black text-pink-600 shadow-sm">${escapeHtml(phonics.letter || '')}</div>
                    <div class="min-w-0">
                        <div class="text-xl font-black text-purple-700">${escapeHtml(phonics.sound || '')}</div>
                        <div class="text-sm font-bold text-slate-600 mt-1">${escapeHtml((phonics.words || []).join(' · '))}</div>
                        <button onclick="speakLessonPhonics_()" class="mt-2 px-3 py-1.5 rounded-xl bg-white border border-pink-200 text-pink-600 text-xs font-black pastel-btn">🔊 Nghe từ</button>
                    </div>
                </div>
            </div>
            <div class="rounded-2xl border-2 border-purple-100 bg-purple-50/40 p-4">
                <div class="text-xs font-black uppercase tracking-wide text-purple-500 mb-2">💬 Mẫu câu</div>
                <div class="text-base md:text-lg font-black text-slate-700 leading-relaxed">${escapeHtml(page.sentence_pattern || '')}</div>
                <button onclick="speakLessonSentence_()" class="mt-2 px-3 py-1.5 rounded-xl bg-white border border-purple-200 text-purple-600 text-xs font-black pastel-btn">🔊 Nghe mẫu câu</button>
                ${dialogue.length ? `<div class="mt-3 pt-3 border-t border-purple-100 space-y-1">${dialogue.map(line => `<div class="text-sm font-bold text-slate-600">${escapeHtml(line)}</div>`).join('')}</div>` : ''}
            </div>
        </div>
        <div class="mt-3 rounded-2xl border-2 border-fuchsia-100 bg-white p-4">
            <div class="text-xs font-black uppercase tracking-wide text-fuchsia-500 mb-2">📚 Từ vựng trọng tâm</div>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                ${vocabulary.map((v, i) => `
                    <button onclick="speakLessonWord_(${i})" class="text-left rounded-xl border-2 border-pink-100 bg-gradient-to-br from-white to-pink-50/50 p-3 hover:border-pink-300 transition-all pastel-btn">
                        <div class="text-base font-black text-purple-700">${escapeHtml(v.word || '')}</div>
                        ${v.ipa ? `<div class="text-sm font-bold text-pink-500 mt-0.5">/${escapeHtml(String(v.ipa).replace(/^\/+|\/+$/g, ''))}/</div>` : ''}
                        <div class="text-xs font-bold text-slate-500 mt-1">${escapeHtml(v.meaning || '')}</div>
                        <div class="text-[10px] font-black text-pink-500 mt-2">🔊 Chạm để nghe</div>
                    </button>`).join('')}
            </div>
        </div>
        ${page.learning_goal_vi ? `<div class="mt-3 text-center text-xs md:text-sm font-bold text-slate-500 bg-amber-50 border border-amber-100 rounded-xl px-3 py-2">🎯 ${escapeHtml(page.learning_goal_vi)}</div>` : ''}`;
}

function renderLessonPracticePage_(page) {
    const items = Array.isArray(page.items) ? page.items : [];
    return `
        <div class="rounded-2xl border-2 border-purple-100 bg-white p-3 md:p-4">
            <div class="text-center mb-3">
                <div class="text-lg font-black text-purple-700">${escapeHtml(page.title || 'Practice')}</div>
                <div class="text-xs font-bold text-slate-400">${escapeHtml(page.recall_vi || page.recall || '')}</div>
            </div>
            <div class="space-y-2.5">
                ${items.map((item, idx) => {
                    if (item.type === 'speak') {
                        return `<div class="rounded-xl border border-pink-100 bg-pink-50/40 p-3 flex items-center justify-between gap-3">
                            <div><div class="text-sm font-black text-slate-700">${idx + 1}. ${escapeHtml(item.prompt || '')}</div><div class="text-xs font-bold text-slate-400 mt-0.5">${escapeHtml(item.prompt_vi || '')}</div></div>
                            <button onclick="speakLessonPractice_(${idx})" class="px-3 py-1.5 rounded-xl bg-white border border-pink-200 text-pink-600 text-xs font-black pastel-btn shrink-0">🔊 Nghe mẫu</button>
                        </div>`;
                    }
                    const options = Array.isArray(item.options) ? item.options : [];
                    return `<div class="rounded-xl border border-purple-100 bg-purple-50/30 p-3">
                        <div class="text-sm font-black text-slate-700">${idx + 1}. ${escapeHtml(item.prompt || '')}</div>
                        <div class="text-xs font-bold text-slate-400 mt-0.5">${escapeHtml(item.prompt_vi || '')}</div>
                        <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2">${options.map(opt => `<div class="rounded-lg bg-white border border-purple-100 px-3 py-2 text-xs md:text-sm font-bold text-slate-600">${escapeHtml(String(opt))}</div>`).join('')}</div>
                    </div>`;
                }).join('')}
            </div>
        </div>`;
}

function renderLessonSummaryPage_(page) {
    const points = Array.isArray(page.key_points) ? page.key_points : [];
    const pointsVi = Array.isArray(page.key_points_vi) ? page.key_points_vi : [];
    return `
        <div class="rounded-2xl border-2 border-pink-100 bg-gradient-to-br from-pink-50/60 to-purple-50/60 p-4 md:p-5">
            <div class="text-center mb-3"><div class="text-3xl">🌟</div><h3 class="text-lg md:text-xl font-black text-purple-700">${escapeHtml(page.title_vi || 'Tổng kết')}</h3></div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div class="rounded-xl bg-white border border-pink-100 p-3">
                    <div class="text-xs font-black uppercase tracking-wide text-pink-500 mb-2">English</div>
                    <div class="space-y-2">${points.map(p => `<div class="text-sm font-bold text-slate-700">• ${escapeHtml(p)}</div>`).join('')}</div>
                    <button onclick="speakLessonSummary_()" class="mt-3 px-3 py-1.5 rounded-xl bg-pink-50 border border-pink-200 text-pink-600 text-xs font-black pastel-btn">🔊 Nghe tổng kết</button>
                </div>
                <div class="rounded-xl bg-white border border-purple-100 p-3">
                    <div class="text-xs font-black uppercase tracking-wide text-purple-500 mb-2">Ghi nhớ</div>
                    <div class="space-y-2">${pointsVi.map(p => `<div class="text-sm font-bold text-slate-600">• ${escapeHtml(p)}</div>`).join('')}</div>
                    ${page.finish_prompt_vi ? `<div class="mt-3 rounded-lg bg-amber-50 border border-amber-100 px-3 py-2 text-xs font-black text-amber-700">🎯 ${escapeHtml(page.finish_prompt_vi)}</div>` : ''}
                </div>
            </div>
        </div>`;
}

function getActiveLessonPageData_() {
    const lesson = lessonDataCache_?.bai_hoc?.find(x => Number(x.source_unit || x.bai) === Number(activeLessonUnit_));
    if (!lesson) return { lesson: null, page: null };
    const page = (lesson.pages || []).find(p => Number(p.page_no) === Number(activeLessonPage_)) || lesson.pages?.[activeLessonPage_ - 1] || null;
    return { lesson, page };
}

function speakLessonPhonics_() {
    const { page } = getActiveLessonPageData_();
    const words = page?.phonics?.words || [];
    if (words.length) speakEnglish(words.join('. '));
}
function speakLessonSentence_() {
    const { page } = getActiveLessonPageData_();
    if (page?.sentence_pattern) speakEnglish(page.sentence_pattern);
}
function speakLessonWord_(index) {
    const { page } = getActiveLessonPageData_();
    const item = page?.vocabulary?.[Number(index)];
    if (item?.word) speakEnglish(item.word);
}
function speakLessonSummary_() {
    const { page } = getActiveLessonPageData_();
    const lines = Array.isArray(page?.key_points) ? page.key_points : [];
    if (lines.length) speakEnglish(lines.join('. '));
}
function speakLessonPractice_(index) {
    const { page } = getActiveLessonPageData_();
    const item = page?.items?.[Number(index)];
    if (item?.speak_text) speakEnglish(item.speak_text);
}

// ==========================================
// ĐIỀU HƯỚNG VIEW & BREADCRUMB
// ==========================================
function getHeaderEnglishLabel_(value) {
    if (!value) return '';
    let s = String(value).trim();

    // Các nhãn module cũ có thể còn dạng song ngữ / tiếng Việt. Header chỉ hiển thị tiếng Anh.
    const exactMap = {
        'Bài học': 'Lessons',
        'Bản đồ tiến trình tuần': 'Exercises',
        'Tiến trình tuần': 'Exercises',
        'Bản đồ tuần': 'Exercises',
        'Đấu trường đề thi': 'Exams',
        '12. Đấu trường đề thi': 'Exams',
        'Bảng ngữ âm IPA (44 âm)': 'IPA Chart',
        'Mini Game': 'Mini Games'
    };
    if (exactMap[s]) return exactMap[s];

    // Ví dụ: "Lessons / Bài học", "Exercise 1 / Bài 1" -> giữ phần tiếng Anh phía trước.
    if (s.includes(' / ')) s = s.split(' / ')[0].trim();

    // Ví dụ: "Flashcards Library (Thẻ lật)" -> "Flashcards Library".
    s = s.replace(/\s*\(([^)]*[À-ỹ][^)]*)\)\s*/gu, ' ').replace(/\s{2,}/g, ' ').trim();
    return s;
}

function updateNavTabs(level2Title, level2Icon, level3Title, level4Title) {
    const tab2 = document.getElementById('header-level2-tab');
    const tab3 = document.getElementById('header-level3-tab');
    const tab4 = document.getElementById('header-level4-tab');
    const homeBtn = document.getElementById('btn-header-home');

    const level2En = getHeaderEnglishLabel_(level2Title);
    const level3En = getHeaderEnglishLabel_(level3Title);
    const level4En = getHeaderEnglishLabel_(level4Title);

    if (level2En) {
        document.getElementById('header-level2-title').textContent = level2En;
        document.getElementById('header-level2-icon').textContent = level2Icon || '🔢';
        tab2.classList.remove('hidden');
        tab2.classList.add('flex');
        homeBtn.classList.add('opacity-80', 'hover:opacity-100');
    } else {
        tab2.classList.add('hidden');
        tab2.classList.remove('flex');
        homeBtn.classList.remove('opacity-80');
    }

    if (level3En) {
        document.getElementById('header-level3-title').textContent = level3En;
        tab3.classList.remove('hidden');
        tab3.classList.add('flex');
    } else {
        tab3.classList.add('hidden');
        tab3.classList.remove('flex');
    }

    if (level4En && tab4) {
        document.getElementById('header-level4-title').textContent = level4En;
        tab4.classList.remove('hidden');
        tab4.classList.add('flex');
    } else if (tab4) {
        tab4.classList.add('hidden');
        tab4.classList.remove('flex');
    }
}

// Bấm breadcrumb cấp 3 (ví dụ "Flashcards Library") để quay lại đúng menu con đó.
function onHeaderLevel3Click() {
    stopSpeaking();
    if (pendingPairedGroupContext) {
        const { topicNum, topicName, subLabel, displayLabel, pool, pairedGroups, useContentTopic } = pendingPairedGroupContext;
        if (Number(topicNum) === 2 && useContentTopic) {
            showVocabularyTopicMenu(topicNum, topicName, subLabel, displayLabel, pool, pairedGroups);
        } else {
            showPairedGroupMenu(topicNum, topicName, subLabel, displayLabel, pool, pairedGroups);
        }
        return;
    }
    if (pendingTopicQuiz) {
        showLectureAndSubtopics(pendingTopicQuiz.topicNum, pendingTopicQuiz.topicName, { questions: pendingTopicQuiz.questions });
    }
}

function __legacyTa1_returnToTopicLecture_1() {
    stopSpeaking();
    clearInterval(quizTimerInterval);
    if (inLessonFlow) {
        openLessonsHub();
    } else if (inMiniGameFlow) {
        openMiniGameHub();
    } else if (activeExamContext) {
        openExamHub();
    } else if (activeRoadmapContext) {
        openRoadmap();
    } else if (pendingTopicQuiz) {
        // Render lại đúng danh sách mục nhỏ CẤP 1 (không phải màn chọn Nhóm Kép cấp 3 vừa hiện trước đó)
        showLectureAndSubtopics(pendingTopicQuiz.topicNum, pendingTopicQuiz.topicName, { questions: pendingTopicQuiz.questions });
    } else if (inAlphaIpaFlow) {
        // Đang duyệt Alphabet A-Z hoặc Bảng IPA (không phải quiz) -> quay về đúng menu 3 lựa chọn
        openAlphabetIPA();
    }
}

function __legacyTa1_switchAppView_1(viewId) {
    stopSpeaking();
    if (viewId !== 'view-lessons') inLessonFlow = false;
    ['view-dashboard-grid', 'view-lessons', 'view-alphabet', 'view-lecture', 'view-quiz', 'view-roadmap', 'view-minigame-hub', 'view-game-play', 'view-exam-hub', 'view-result'].forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;
        if (id === viewId) el.classList.remove('hidden');
        else el.classList.add('hidden');
    });
}

function __legacyTa1_goHome_1() {
    stopSpeaking();
    clearInterval(quizTimerInterval);
    inLessonFlow = false;
    inAlphaIpaFlow = false;
    inMiniGameFlow = false;
    updateNavTabs(null, null, null);
    switchAppView('view-dashboard-grid');
}

// ==========================================
// Standalone auth/admin/session block removed; Class 1 shell owns identity and authorization.
// CHỦ ĐỀ 1: BẢNG CHỮ CÁI TƯƠNG TÁC (1.1 ĐẾN 1.4)
// ==========================================
function openTopic(topicNum, topicName, icon) {
    stopSpeaking();
    if (Number(topicNum) !== 2) { activeVocabularyHubTopic = null; activeVocabularyHubQuestions = []; }
    if (Number(topicNum) === 11 && !requirePremiumAccess('Practice & Play')) return;
    inAlphaIpaFlow = false;
    inMiniGameFlow = false;
    activeTopicId = topicNum; activeExamContext = null; activeRoadmapContext = null;
    updateNavTabs(topicName, icon || '🐰', null);

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
        updateNavTabs(null, null, null);
        alert(`Không thể tải chủ đề: ${err.message}`);
    });
}

function setSubtopicGridColumns(count) {
    const el = document.getElementById('lecture-subtopics-list');
    if (!el) return;
    if (count > 6) {
        el.className = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 w-full max-w-4xl';
    } else {
        el.className = 'grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-2xl';
    }
}

function showLectureAndSubtopics(topicNum, topicName, topicObj) {
    if (Number(topicNum) === 2) {
        pendingTopicQuiz = { topicNum, topicName, questions: topicObj.questions || [] };
        renderVocabularyLevelHub_(topicObj.questions || []);
        return;
    }
    document.getElementById('wrap-mix-all-subtopics').classList.remove('hidden');
    document.getElementById('btn-mix-all-subtopics').setAttribute('onclick', 'selectSubtopic(null)');
    pendingTopicQuiz = { topicNum, topicName, questions: topicObj.questions };
    
    document.getElementById('lecture-title').textContent = topicObj.lecture_title || topicName;
    document.getElementById('lecture-content').textContent = topicObj.lecture_content || topicObj.description || 'Chào mừng bé yêu! Hãy chọn một mục nhỏ bên dưới để bắt đầu luyện tập nhé.';
    document.getElementById('view-lecture').dataset.audioText = topicObj.lecture_audio_text || topicObj.lecture_content || topicObj.description || '';

    const groups = [], groupMap = {}, groupLabels = {};
    topicObj.questions.forEach(q => {
        const k = (q.sub_topic || 'Câu hỏi chung').trim();
        if (!groupMap[k]) { groupMap[k] = []; groups.push(k); groupLabels[k] = q.sub_topic_label || k; }
        groupMap[k].push(q);
    });
    pendingTopicQuiz.groups = groups; 
    pendingTopicQuiz.groupMap = groupMap;
    pendingTopicQuiz.groupLabels = groupLabels;

    let subHtml = '';
    groups.forEach((subName, idx) => {
        const style = SUBTOPIC_PALETTES[idx % SUBTOPIC_PALETTES.length];
        const displayTitle = beautifySubtopicName(groupLabels[subName]);
        const count = groupMap[subName].length;

        subHtml += `
            <button onclick="selectSubtopic(${idx})" class="p-3 ${style.card} border-2 rounded-xl font-bold text-left transition-all flex items-center justify-between shadow-sm pastel-btn">
                <span class="text-sm md:text-base leading-snug"><strong class="${style.num} mr-1.5">${idx + 1}.</strong> ${escapeHtml(displayTitle)}</span>
                <span class="text-xs font-extrabold ${style.badge} px-2.5 py-0.5 rounded-full border shrink-0 ml-1.5 shadow-inner">${count} câu</span>
            </button>`;
    });
    setSubtopicGridColumns(groups.length);
    document.getElementById('lecture-subtopics-list').innerHTML = subHtml;

    updateNavTabs(topicName, TOPICS_CONFIG.find(t => t.id === topicNum)?.icon || '🔢', null);
    switchAppView('view-lecture');
}

function speakLecture() {
    speakVietnamese(document.getElementById('view-lecture').dataset.audioText || '', 0.96);
}

let pendingPairedGroupContext = null;

function selectSubtopic(idx) {
    stopSpeaking();
    if (!pendingTopicQuiz) return;
    const { topicNum, topicName, questions, groups, groupMap, groupLabels } = pendingTopicQuiz;

    if (idx === null) {
        return launchSubtopicQuiz(topicNum, topicName, questions, null, null);
    }

    const subLabel = groups[idx];
    const pool = groupMap[subLabel];
    const displayLabel = beautifySubtopicName(groupLabels[subLabel]);

    // Vocabulary: 2.1 / 2.2 / 2.3 -> 6 chủ đề -> câu hỏi.
    const vocabularyTopics = Number(topicNum) === 2
        ? [...new Set(pool.map(q => q.content_topic).filter(Boolean))]
        : [];
    if (vocabularyTopics.length > 1) {
        return showVocabularyTopicMenu(topicNum, topicName, subLabel, displayLabel, pool, vocabularyTopics);
    }

    // Giữ tương thích dữ liệu cũ nếu phần khác còn dùng paired_group.
    const pairedGroups = [...new Set(pool.map(q => q.paired_group).filter(Boolean))];
    if (pairedGroups.length > 1) {
        return showPairedGroupMenu(topicNum, topicName, subLabel, displayLabel, pool, pairedGroups);
    }
    launchSubtopicQuiz(topicNum, topicName, pool, subLabel, displayLabel);
}

function showVocabularyTopicMenu(topicNum, topicName, subLabel, displayLabel, pool, vocabularyTopics) {
    pendingPairedGroupContext = { topicNum, topicName, subLabel, displayLabel, pool, pairedGroups: vocabularyTopics, useContentTopic: true };

    document.getElementById('lecture-title').textContent = displayLabel;
    const introText = `Chọn 1 trong ${vocabularyTopics.length} chủ đề từ vựng để bắt đầu luyện "${displayLabel}" nhé!`;
    document.getElementById('lecture-content').textContent = introText;
    document.getElementById('view-lecture').dataset.audioText = introText;

    let html = '';
    vocabularyTopics.forEach((pg, i) => {
        const style = SUBTOPIC_PALETTES[i % SUBTOPIC_PALETTES.length];
        const count = pool.filter(q => q.content_topic === pg).length;
        html += `
            <button onclick="selectPairedGroup(${i})" class="p-3 ${style.card} border-2 rounded-xl font-bold text-left transition-all flex items-center justify-between shadow-sm pastel-btn">
                <span class="text-sm md:text-base leading-snug"><strong class="${style.num} mr-1.5">${i + 1}.</strong> ${escapeHtml(pg)}</span>
                <span class="text-xs font-extrabold ${style.badge} px-2.5 py-0.5 rounded-full border shrink-0 ml-1.5 shadow-inner">${count} câu</span>
            </button>`;
    });
    document.getElementById('lecture-subtopics-list').innerHTML = html;
    setSubtopicGridColumns(vocabularyTopics.length);

    document.getElementById('wrap-mix-all-subtopics').classList.remove('hidden');
    document.getElementById('btn-mix-all-subtopics').setAttribute('onclick', 'selectPairedGroup(null)');

    updateNavTabs(topicName, TOPICS_CONFIG.find(t => t.id === topicNum)?.icon || '📚', displayLabel);
    switchAppView('view-lecture');
}

function showPairedGroupMenu(topicNum, topicName, subLabel, displayLabel, pool, pairedGroups) {
    pendingPairedGroupContext = { topicNum, topicName, subLabel, displayLabel, pool, pairedGroups, useContentTopic: false };

    document.getElementById('lecture-title').textContent = displayLabel;
    const introText = `Chọn 1 trong ${pairedGroups.length} Nhóm Kép để bắt đầu luyện "${displayLabel}" nhé!`;
    document.getElementById('lecture-content').textContent = introText;
    document.getElementById('view-lecture').dataset.audioText = introText;

    let html = '';
    pairedGroups.forEach((pg, i) => {
        const style = SUBTOPIC_PALETTES[i % SUBTOPIC_PALETTES.length];
        const count = pool.filter(q => q.paired_group === pg).length;
        html += `
            <button onclick="selectPairedGroup(${i})" class="p-3 ${style.card} border-2 rounded-xl font-bold text-left transition-all flex items-center justify-between shadow-sm pastel-btn">
                <span class="text-sm md:text-base leading-snug"><strong class="${style.num} mr-1.5">${i + 1}.</strong> ${escapeHtml(pg)}</span>
                <span class="text-xs font-extrabold ${style.badge} px-2.5 py-0.5 rounded-full border shrink-0 ml-1.5 shadow-inner">${count} câu</span>
            </button>`;
    });
    document.getElementById('lecture-subtopics-list').innerHTML = html;
    setSubtopicGridColumns(pairedGroups.length);

    document.getElementById('wrap-mix-all-subtopics').classList.remove('hidden');
    document.getElementById('btn-mix-all-subtopics').setAttribute('onclick', 'selectPairedGroup(null)');

    updateNavTabs(topicName, TOPICS_CONFIG.find(t => t.id === topicNum)?.icon || '🔢', displayLabel);
    switchAppView('view-lecture');
}

function selectPairedGroup(i) {
    stopSpeaking();
    if (!pendingPairedGroupContext) return;
    const { topicNum, topicName, subLabel, displayLabel, pool, pairedGroups, useContentTopic } = pendingPairedGroupContext;
    const chosenPool = (i === null)
        ? pool
        : pool.filter(q => useContentTopic ? q.content_topic === pairedGroups[i] : q.paired_group === pairedGroups[i]);
    const chosenTopic = (i === null) ? null : pairedGroups[i];
    launchSubtopicQuiz(topicNum, topicName, chosenPool, subLabel, displayLabel, chosenTopic);
}

function launchSubtopicQuiz(topicNum, topicName, pool, subLabel, displayLabel, level4Title = null) {
    const finalTitle = level4Title
        ? `${topicName} - ${displayLabel} - ${level4Title}`
        : (displayLabel ? `${topicName} - ${displayLabel}` : topicName);
    practiceCycleRawPool = [...pool];
    const firstCycleQuestions = shuffleArray([...pool]);

    // Header theo 3 cấp: Vocabulary / Flashcards Library / My Family & Home.
    updateNavTabs(
        topicName,
        TOPICS_CONFIG.find(t => t.id === topicNum)?.icon || '🔢',
        displayLabel || 'All activities',
        level4Title
    );
    startTopicQuiz(topicNum, finalTitle, firstCycleQuestions, subLabel);
}

// ==========================================
// TIẾN TRÌNH TUẦN: BẢN ĐỒ SVG
// ==========================================
function __legacyTa1_handleNextExamFromReport_1() {
    stopSpeaking();
    if (activeRoadmapContext) {
        activeRoadmapContext = null;
        openRoadmap();
    } else if (activeExamContext) {
        activeExamContext = null;
        openExamHub();
    } else {
        goHome();
    }
}

function __legacyTa1_openRoadmap_1() {
    stopSpeaking();
    if (!requirePremiumAccess('Bản đồ tuần')) return;
    inAlphaIpaFlow = false;
    updateNavTabs("Bản đồ tiến trình tuần", "🗺️", null);
    renderRoadmapSVG();
    switchAppView('view-roadmap');
}

function wrapCaptionLines(text, maxLen = 24, maxLines = 3) {
    const words = String(text || '').split(' ');
    const lines = [''];
    for (const w of words) {
        const cur = lines[lines.length - 1];
        const candidate = (cur + ' ' + w).trim();
        if (candidate.length <= maxLen) {
            lines[lines.length - 1] = candidate;
        } else if (lines.length < maxLines) {
            lines.push(w);
        } else {
            lines[lines.length - 1] = candidate;
        }
    }
    while (lines.length < maxLines) lines.push('');
    if (lines[maxLines - 1].length > maxLen) {
        lines[maxLines - 1] = lines[maxLines - 1].slice(0, maxLen - 1) + '…';
    }
    return lines.slice(0, maxLines);
}

function renderRoadmapSVG() {
    const container = document.getElementById('roadmap-svg-container');
    if (!container) return;
    const tuanHienTai = Number(currentUser?.tuanHienTai) || 1;

    let nodesHtml = '';
    for (let w = 1; w <= TOTAL_ROADMAP_WEEKS; w++) {
        const item = roadmapConfig[w];
        const coord = getRoadmapCoord(w);
        const isDone = w < tuanHienTai;
        const isCurrent = w === tuanHienTai;
        const isLocked = w > tuanHienTai;

        let nodeColor = isDone ? "#10b981" : (isCurrent ? "#ec4899" : "#cbd5e1");
        let strokeColor = isDone ? "#34d399" : (isCurrent ? "#f43f5e" : "#94a3b8");
        let badgeHtml = '';

        if (isDone) {
            badgeHtml = `<text x="${coord.x}" y="${coord.y + 32}" text-anchor="middle" font-size="12" fill="#f59e0b">⭐⭐⭐</text>`;
        } else if (isCurrent) {
            badgeHtml = `<text x="${coord.x}" y="${coord.y + 32}" text-anchor="middle" font-size="10" font-weight="900" fill="#ec4899">Đang học</text>`;
        } else {
            badgeHtml = `<text x="${coord.x}" y="${coord.y + 30}" text-anchor="middle" font-size="11" fill="#94a3b8">🔒 Khóa</text>`;
        }

        const cursorCls = isLocked ? "cursor-not-allowed opacity-60" : "cursor-pointer hover:scale-105 transition-transform";
        const animCls = isCurrent ? "node-current" : "";

        nodesHtml += `
            <g class="${cursorCls} ${animCls}" onclick="selectRoadmapWeek(${w})" id="svg-node-week-${w}">
                <circle cx="${coord.x}" cy="${coord.y}" r="32" fill="#ffffff" stroke="${strokeColor}" stroke-width="3" filter="drop-shadow(0 3px 4px rgba(0,0,0,0.08))"/>
                <circle cx="${coord.x}" cy="${coord.y}" r="26" fill="${nodeColor}" opacity="${isLocked ? '0.25' : '0.15'}"/>
                <text x="${coord.x}" y="${coord.y - 3}" text-anchor="middle" font-size="20">${item.icon || '🔢'}</text>
                <text x="${coord.x}" y="${coord.y + 13}" text-anchor="middle" font-size="11" font-weight="800" fill="${isLocked ? '#64748b' : '#1e293b'}">Tuần ${w}</text>
                ${badgeHtml}
            </g>
        `;
    }

    const pathD = buildRoadmapPathD(TOTAL_ROADMAP_WEEKS);
    const svgHtml = `
        <svg viewBox="0 0 640 360" preserveAspectRatio="xMidYMid meet" class="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
            <path d="${pathD}" fill="none" stroke="#fbcfe8" stroke-width="9" stroke-dasharray="11,11" stroke-linecap="round"/>
            <path d="${pathD}" fill="none" stroke="#f472b6" stroke-width="3" stroke-dasharray="11,11" stroke-linecap="round"/>
            ${nodesHtml}
        </svg>
    `;
    container.innerHTML = svgHtml;
}

async function selectRoadmapWeek(weekNum) {
    stopSpeaking();
    const config = roadmapConfig[weekNum];
    if (!config) return;
    
    const tuanHienTai = Number(currentUser?.tuanHienTai) || 1;
    if (weekNum > tuanHienTai) {
        return alert(`Tuần ${weekNum} đang bị khóa. Bé hãy hoàn thành Tuần ${tuanHienTai} đạt từ 80% trở lên để mở khóa nhé!`);
    }

    if (config.isExam) return openExamHub();

    activeRoadmapContext = { week: weekNum, topicId: String(weekNum), chuDe: config.name, isReview15: !!(config.isGrandReview || config.isReview15) };
    pendingTopicQuiz = null; activeExamContext = null;
    const topicLabel = config.name.replace(/^Tuần\s*\d+:\s*/i, '');
    updateNavTabs("Tiến trình tuần", "📅", `Tuần ${weekNum}`, topicLabel);

    const isReviewMode = !!(config.isGrandReview || config.isReview15);
    showLoadingOverlay(isReviewMode ? `Đang chuẩn bị đề ôn tổng hợp 15 câu Tuần ${weekNum}...` : `Đang bốc 30 câu hỏi Tuần ${weekNum} (tỷ lệ 3:4:3)...`);
    try {
        await fetchAllTopicsData();
        hideLoadingOverlay();

        const weekQuestions = isReviewMode ? generateReview15(weekNum) : getQuestionsForWeek343(weekNum);
        if (!weekQuestions.length) return alert('Tuần này đang chuẩn bị thêm câu hỏi, bé quay lại sau nhé!');

        startTopicQuiz(weekNum, config.name, weekQuestions, null);
    } catch (err) {
        hideLoadingOverlay();
        alert(`Lỗi tải dữ liệu tuần: ${err.message}`);
    }
}

// ==========================================
// LOGIC CHẤM ĐIỂM & ĐIỀU KHIỂN CÂU HỎI
// ==========================================
function startTopicQuiz(topicNum, topicName, questions, subLabel) {
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

    switchAppView('view-quiz');
    loadQuestion();
}

function loadQuestion() {
    stopSpeaking();
    const q = activeQuestionsList[currentQIndex];
    if (!q) return;

    const isEvaluationMode = !!activeExamContext || !!activeRoadmapContext;

    if (!isEvaluationMode && activeVocabularyHubTopic && q.render_style === 'vocab_flashcard') {
        renderVocabularySharedStudy_(q);
        return;
    }

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
        if (stepEl) stepEl.textContent = `Câu ${currentQIndex + 1} / ${activeQuestionsList.length}`;
    }

// Trích ký tự Emoji ĐẦU TIÊN xuất hiện trong 1 chuỗi văn bản (VD trong question_text) —
// dùng làm ảnh minh hoạ dự phòng khi ảnh thật (image_url) chưa có hoặc bị lỗi link.
function extractFirstEmoji(text) {
    if (!text) return null;
    const match = String(text).match(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{1F1E6}-\u{1F1FF}]/u);
    return match ? match[0] : null;
}

// Từ điển tra Emoji theo NGHĨA TIẾNG VIỆT trong ngoặc — dùng khi câu hỏi/đáp án/lựa chọn không tự
// mang sẵn Emoji nào (VD các câu Phonics/Remove Letter/Fill Missing chỉ ghi "'bike' (xe đạp)" suông).
// Tra theo nghĩa tiếng Việt đáng tin cậy hơn tra theo từ tiếng Anh, vì từ tiếng Anh trong các câu
// Remove Letter/Fill Missing thường bị cố tình viết sai chính tả (đúng bản chất bài luyện).
const VOCAB_EMOJI_MAP = {
    'bàn học': '🪑', 'bàn tay': '✋', 'bé gái': '👧', 'bút chì': '✏️', 'bút mực': '🖊️',
    'bạn ba': '👦', 'bạn bill': '👦', 'bạn lucy': '👧', 'chiếc lá': '🍃', 'con chuột': '🐭',
    'con cá': '🐟', 'con dê': '🐐', 'con gà': '🐔', 'con hổ': '🐯', 'con ngựa': '🐴',
    'con quay': '🪀', 'con rùa': '🐢', 'cái chuông': '🔔', 'cái chổi lau nhà': '🧹',
    'cái cốc': '🥤', 'cái khóa': '🔒', 'cái lon': '🥫', 'cái mũ': '👒', 'cái nồi': '🍲',
    'cái đầu': '👤', 'cặp sách': '🎒', 'cổng': '🚪', 'cửa ra vào': '🚪', 'gấu bông': '🧸',
    'hạt khô': '🥜', 'hồ nước': '🏞️', 'khoai tây chiên': '🍟', 'khu vườn': '🌳', 'mì sợi': '🍜',
    'mẹ': '👩', 'con chó': '🐶', 'con vịt': '🦆', 'quyển sách': '📖', 'quả táo': '🍎',
    'tóc': '👱', 'xe đạp': '🚲', 'ô tô': '🚗', 'quả chanh': '🍋', 'quả chuối': '🍌',
    'quả xoài': '🥭', 'xe tải': '🚚', 'ông mặt trời': '☀️', 'đồng hồ': '⏰'
};
function lookupVocabEmoji(text) {
    if (!text) return null;
    const m = String(text).match(/\(([^)]+)\)/);
    if (!m) return null;
    let gloss = m[1].trim().toLowerCase().replace(/^nghĩa là:\s*/i, '').trim();
    gloss = gloss.replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu, '').trim();
    return VOCAB_EMOJI_MAP[gloss] || null;
}

    let mediaHtml = '';
    if (!activeExamContext) {
        // Ưu tiên 1: ảnh thật từ kho học liệu (image_url/img) — nếu link lỗi/chưa có file,
        // tự động rớt xuống dùng Emoji thay thế theo thứ tự: field "emoji" riêng → Emoji có sẵn
        // trong câu hỏi → trong đáp án đúng → trong các lựa chọn khác → tra theo nghĩa tiếng Việt
        // trong ngoặc. Nếu câu hỏi thuần ngữ pháp/câu ghép không có từ vựng cụ thể nào để minh hoạ
        // (không tra ra Emoji nào hợp lý) thì ẨN HẲN khung ảnh, không hiện icon mặc định vô nghĩa.
        const fallbackEmoji = q.emoji
            || extractFirstEmoji(q.question_text)
            || extractFirstEmoji(q.answer)
            || (q.options || []).map(extractFirstEmoji).find(Boolean)
            || lookupVocabEmoji(q.question_text);
        const fallbackEmojiHtml = fallbackEmoji ? `<div class="text-4xl md:text-5xl floating">${fallbackEmoji}</div>` : '';
        if (q.image_url) {
            // fallbackEmojiHtml sẽ được nhúng làm giá trị thuộc tính onerror="..." (delimiter nháy kép) —
            // nên phải escape dấu nháy kép bên trong thành &quot; để không làm vỡ cấu trúc thẻ <img>,
            // trình duyệt sẽ tự giải mã lại &quot; -> " trước khi thực thi đoạn JS trong onerror.
            const fallbackForOnerror = fallbackEmojiHtml
                ? fallbackEmojiHtml.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/"/g, '&quot;')
                : ''; // Không tra ra Emoji hợp lý -> ảnh lỗi thì biến mất hẳn, không để lại icon sai.
            mediaHtml = `<div class="w-20 h-20 md:w-24 md:h-24 mb-1 flex items-center justify-center">
                <img src="${escapeHtml(q.image_url)}" alt="" class="w-full h-full object-contain drop-shadow-sm floating"
                     onerror="this.onerror=null; this.outerHTML='${fallbackForOnerror}';">
            </div>`;
        } else if (fallbackEmoji) {
            mediaHtml = `<div class="w-14 h-14 md:w-16 md:h-16 mb-1 flex items-center justify-center">${fallbackEmojiHtml}</div>`;
        }
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
    if (isLetterListen) {
        html = `
            ${mediaHtml}
            <div class="w-full max-w-3xl border-2 border-dashed border-pink-200 bg-pink-50/40 rounded-3xl px-4 py-4 md:py-5 flex flex-col items-center text-center mb-3">
                <div class="text-3xl md:text-4xl mb-1.5 space-x-2">
                    <span>🎧</span><span>👂</span><span>🔢</span>
                </div>
                <p class="text-sm md:text-base lg:text-lg font-black text-rose-600 leading-snug">${escapeHtml(q.question_text)}</p>
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
        html = `
        ${mediaHtml}
        ${passageHtml}
        <div class="flex flex-col items-center justify-center max-w-3xl text-center px-2 mb-0.5">
            <h3 class="text-sm md:text-base lg:text-lg font-black text-slate-900 leading-snug">
                ${escapeHtml(q.question_text)}
            </h3>
            ${practiceSpeakerBtnHtml}
        </div>
        
        <div class="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-2.5 mt-1">
    `;

    q.options.forEach((opt, idx) => {
        const formattedOpt = capitalizeFirstLetter(opt);
        const letter = String.fromCharCode(65 + idx);
        // Chỉ hiện phiên âm khi JSON thật sự có field "options_ipa" (mảng cùng thứ tự với "options") —
        // không tự bịa phiên âm để tránh sai, chờ dữ liệu thật bổ sung.
        const ipaText = q.options_ipa && q.options_ipa[idx] ? q.options_ipa[idx] : '';
        const ipaHtml = ipaText ? `<span class="text-sm md:text-base text-gray-500 font-semibold ml-1.5 whitespace-nowrap">/${escapeHtml(ipaText.replace(/^\/|\/$/g, ''))}/</span>` : '';

        if (activeExamContext) {
            html += `
                <button data-opt="${escapeHtml(opt)}" onclick="checkAnswer('${opt.replace(/'/g, "\\'")}')" class="option-btn w-full p-2.5 md:p-3 bg-white hover:bg-pink-50/50 border border-pink-200 rounded-2xl font-extrabold text-gray-800 text-left transition-all flex items-center justify-between text-sm md:text-base shadow-xs">
                    <div class="flex items-center space-x-2.5">
                        <span class="opt-badge w-7 h-7 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center font-black text-sm shrink-0">${letter}</span>
                        <span class="opt-text">${escapeHtml(formattedOpt)}${ipaHtml}</span>
                    </div>
                    <span class="option-icon text-pink-500 text-base md:text-lg"></span>
                </button>`;
        } else {
            html += `
                <button data-opt="${escapeHtml(opt)}" onclick="checkAnswer('${opt.replace(/'/g, "\\'")}')" class="option-btn w-full p-3 md:p-3.5 bg-pink-50/40 hover:bg-pink-100/70 border-2 border-pink-200 rounded-2xl font-extrabold text-gray-800 text-left transition-all flex items-center justify-between text-sm md:text-base shadow-xs pastel-btn">
                    <span class="opt-text"><strong class="text-pink-600 mr-2 text-base md:text-lg">${letter}.</strong> ${escapeHtml(formattedOpt)}${ipaHtml}</span>
                    <span class="option-icon text-pink-500 text-base md:text-lg"></span>
                </button>`;
        }
    });
        html += `</div>`;
    }

    document.getElementById('question-box').innerHTML = html;

    restoreQuestionState(q);
    updateNavButtons();
    updateQuizPalletUI();

    // Đề thi chính thức: chỉ tự phát âm câu NGHE có audio_text; không đọc hộ câu đọc hiểu/ngữ pháp/từ vựng.
    if (autoSpeechEnabled && (!activeExamContext || q.audio_text)) speakCurrentQuestion();
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
        if (completedAnswer === q.answer) showVocabularyMeaningForOption(q.answer);
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

// Sau khi bé đã trả lời xong 1 câu (không phải Đề thi), các nút đáp án KHÔNG bị disable cứng nữa —
// thay vào đó khoá việc chấm điểm lần 2 (cờ answeredLocked) nhưng vẫn cho bé BẤM LẠI từng đáp án
// để nghe đọc to chính từ đó. Mục đích: mỗi câu có 4 từ, bé được luyện nghe cả 4, không chỉ đáp án đúng.
function enableReplayOnOptions() {
    document.querySelectorAll('.option-btn').forEach(b => {
        b.disabled = false; // vẫn cho click, nhưng checkAnswer sẽ tự chặn chấm điểm lại nhờ cờ khoá
        b.style.cursor = 'pointer';
        b.setAttribute('title', 'Bấm để nghe lại từ này');
    });
}

// Đọc to 1 đáp án cụ thể khi bé bấm lại (sau khi câu đã được trả lời). Đọc bằng giọng Anh vì đây
// là từ vựng tiếng Anh; giữ nguyên chữ gốc, bỏ các Emoji minh hoạ đính kèm để TTS không đọc nhịu.
function replaySpeakOption(optText) {
    // Bỏ cụm biểu tượng minh hoạ ở CUỐI đáp án (emoji, và emoji-số dạng "1️⃣" = số + U+FE0F + U+20E3)
    // để TTS đọc gọn phần chữ; không đụng tới số/chữ nằm giữa nội dung.
    const clean = String(optText)
        .replace(/[\u{0030}-\u{0039}]?[\u{FE0F}]?[\u{20E3}]/gu, '')
        .replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{1F1E6}-\u{1F1FF}\u{FE0F}]/gu, '')
        .trim();
    if (clean) speakEnglish(clean);
}

// Hiện nghĩa tiếng Việt ngay sau IPA theo đúng cách TA2 đang làm.
// Chỉ áp dụng cho chuyên mục Vocabulary (2.x). Nghĩa lấy từ chính 2 JSON, không tự dịch.
// Nếu một từ có nhiều nghĩa tiếng Việt trong kho dữ liệu, hiển thị toàn bộ, ngăn cách bằng " / ".
function showVocabularyMeaningForOption(optText) {
    const q = activeQuestionsList[currentQIndex];
    if (!q || !String(q.sub_topic || '').startsWith('2.')) return;

    const key = normalizeVocabWordKey(optText);
    const meanings = wordMeaningMapCache[key] || [];
    if (!meanings.length) return;

    document.querySelectorAll('.option-btn').forEach(b => {
        if (b.getAttribute('data-opt') !== optText) return;
        const textSpan = b.querySelector('.opt-text');
        if (!textSpan) return;

        let meaningSpan = textSpan.querySelector('.opt-meaning');
        if (!meaningSpan) {
            meaningSpan = document.createElement('span');
            meaningSpan.className = 'opt-meaning text-xs md:text-sm font-bold text-purple-500 ml-1.5 italic';
            textSpan.appendChild(meaningSpan);
        }
        meaningSpan.textContent = `(${meanings.join(' / ')})`;
    });
}

function speakOptionWithMeaning(optText) {
    replaySpeakOption(optText);
    showVocabularyMeaningForOption(optText);
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
        // Đã trả lời rồi -> lần bấm sau chỉ để NGHE LẠI từ đó, không chấm điểm lại.
        if (userAnswers[currentQIndex] !== undefined) { speakOptionWithMeaning(selectedOpt); return; }

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
            const bOpt = b.getAttribute('data-opt');
            if (bOpt === q.answer) {
                b.classList.remove('bg-pink-50/40', 'border-pink-200');
                b.classList.add('bg-green-100', 'border-green-400', 'text-green-800');
            } else if (bOpt === selectedOpt) {
                b.classList.remove('bg-pink-50/40', 'border-pink-200');
                b.classList.add('bg-red-200', 'border-red-500', 'text-red-900');
            }
        });
        enableReplayOnOptions();

        if (isCorrect) {
            playAudio('correct');
            confetti({ particleCount: 30, spread: 55, origin: { y: 0.7 } });
            setTimeout(() => speakOptionWithMeaning(q.answer), 180);
        } else {
            playAudio('wrong');
        }

        updateQuizPalletUI();
        return;
    }

    // CHẾ ĐỘ LUYỆN TẬP TỰ DO
    const isCorrect = selectedOpt === q.answer;
    // Đã trả lời đúng rồi -> lần bấm sau chỉ để NGHE LẠI từ đó (học đủ cả 4 từ), không chấm lại.
    if (userAnswers[currentQIndex] !== undefined) { speakOptionWithMeaning(selectedOpt); return; }

    if (isCorrect) {
        userAnswers[currentQIndex] = selectedOpt;
        score += (q.diem ?? 0.5);
        starGreenCount++;
        document.getElementById('star-green-count').textContent = starGreenCount;

        document.querySelectorAll('.option-btn').forEach(b => {
            if (b.getAttribute('data-opt') === q.answer) {
                b.classList.remove('bg-pink-50/40', 'border-pink-200');
                b.classList.add('bg-green-100', 'border-green-400', 'text-green-800');
            }
        });
        enableReplayOnOptions();

        playAudio('correct');
        confetti({ particleCount: 30, spread: 55, origin: { y: 0.7 } });
        setTimeout(() => speakOptionWithMeaning(q.answer), 180);
        revealVocabularyAfterCorrect_();
    } else {
        // Bé đã bấm từ sai này trước đó rồi -> lần bấm sau chỉ NGHE LẠI, không trừ sao thêm lần nữa.
        if (wrongAttemptsByQ[currentQIndex] && wrongAttemptsByQ[currentQIndex].includes(selectedOpt)) {
            speakOptionWithMeaning(selectedOpt);
            return;
        }
        if (!wrongAttemptsByQ[currentQIndex]) wrongAttemptsByQ[currentQIndex] = [];
        wrongAttemptsByQ[currentQIndex].push(selectedOpt);
        starRedCount++;
        document.getElementById('star-red-count').textContent = starRedCount;

        document.querySelectorAll('.option-btn').forEach(b => {
            if (b.getAttribute('data-opt') === selectedOpt) {
                b.classList.remove('bg-pink-50/40', 'border-pink-200');
                b.classList.add('bg-red-200', 'border-red-500', 'text-red-900');
                // KHÔNG disable cứng — để bé vẫn bấm lại nghe được từ này (nhánh replay ở trên xử lý).
                b.setAttribute('title', 'Bấm để nghe lại từ này');
            }
        });

        playAudio('wrong');
    }

    updateQuizPalletUI();
}

function prevQuestion() {
    stopSpeaking();
    if (activeVocabularyHubTopic) saveVocabularyModeState_();
    if (currentQIndex > 0) {
        currentQIndex--;
        loadQuestion();
    }
}

function nextQuestion() {
    stopSpeaking();
    if (activeVocabularyHubTopic) saveVocabularyModeState_();
    const isEvaluationMode = !!activeExamContext || !!activeRoadmapContext;

    if (!isEvaluationMode && activeVocabularyHubTopic && activeVocabularyStudyMode === 'flashcard') {
        if (currentQIndex < activeQuestionsList.length - 1) { currentQIndex++; loadQuestion(); }
        else { activeQuestionsList = shuffleArray([...(practiceCycleRawPool.length ? practiceCycleRawPool : activeQuestionsList)]); currentQIndex = 0; userAnswers = {}; wrongAttemptsByQ = {}; resetVocabularyModeState_(); loadQuestion(); }
        return;
    }

    if (!isEvaluationMode && userAnswers[currentQIndex] === undefined) {
        alert('Bé hãy tìm đáp án đúng để hoàn thành câu này nhé!');
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
            alert(`🎉 Chúc mừng bé đã hoàn thành trọn vẹn 1 vòng luyện tập (${activeQuestionsList.length} câu)!\nBây giờ cô giáo Thỏ Hồng sẽ xáo trộn ngẫu nhiên để con bước vào vòng luyện tập tiếp theo nhé!`);

            const basePool = practiceCycleRawPool.length ? practiceCycleRawPool : activeQuestionsList;
            activeQuestionsList = shuffleArray([...basePool]);
            currentQIndex = 0;
            userAnswers = {};
            wrongAttemptsByQ = {};
            loadQuestion();
        }
    }
}

function triggerSubmitQuizPrompt() {
    const answeredCount = Object.keys(userAnswers).length;
    const total = activeQuestionsList.length;
    showFriendlyConfirm_(`Bé đã làm ${answeredCount}/${total} câu. Bé có chắc chắn muốn nộp bài thi ngay không?`, () => {
        showResultScreen();
    });
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

    // Tiến trình tuần thường: điểm tính đều tay 10/tổng số câu (không trọng số).
    // Riêng đề ôn 15 câu (Tuần 12/17): mỗi câu có trọng số điểm thật khác nhau, phải dùng đúng "score" thực tế.
    const displayScore = (activeRoadmapContext && !activeRoadmapContext.isReview15)
        ? Math.round((correctCount * 10 / totalQ) * 10) / 10
        : score;

    const examBadgeText = activeExamContext ? activeExamContext.examTitle : (activeRoadmapContext ? activeRoadmapContext.chuDe : 'Bài luyện tập chủ đề');
    document.getElementById('report-exam-badge').textContent = examBadgeText;
    document.getElementById('report-student-display').textContent = `Học sinh: ${currentUser?.hoTen || 'Khách'}`;
    const durationStr = quizStartTime ? formatDuration(Date.now() - quizStartTime) : '35 phút';
    document.getElementById('report-meta-display').textContent = `Lớp: ${currentUser?.lop || '1A'} | Mã số: ${currentUser?.maHS || 'KHACH'} | Thời gian: ${durationStr}`;
    document.getElementById('report-total-score-val').textContent = displayScore.toFixed(1);
    document.getElementById('report-correct-ratio-val').textContent = `${correctCount}/${totalQ}`;

    renderReportTopicsBreakdown();

    const nextActionLabel = document.getElementById('report-next-action-label');
    if (nextActionLabel) {
        nextActionLabel.textContent = activeRoadmapContext ? '🔙 Quay lại tiến trình tuần' : '🚀 Làm đề thi tiếp theo';
    }

    const historyBtn = document.getElementById('report-history-btn');
    if (historyBtn) {
        const targetSheet = activeRoadmapContext
            ? 'LichSuTienTrinhTuan'
            : (examFileMap[activeExamContext?.categoryKey]?.sheet || 'LichSuBaiThiHK1');
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

function renderReportTopicsBreakdown() {
    const container = document.getElementById('report-topics-list');
    if (!container) return;

    const isRoadmap = !!activeRoadmapContext;
    const skillKeys = SKILL_KEYS;
    const skillStats = {};
    skillKeys.forEach(k => {
        skillStats[k] = { total: 0, correct: 0, maxScore: 0, earnedScore: 0 };
    });

    activeQuestionsList.forEach((q, idx) => {
        let tag = String(q.skill_tag || 'ENG_VOC').toUpperCase();
        if (!skillKeys.includes(tag)) tag = 'ENG_VOC';

        if (!skillStats[tag]) skillStats[tag] = { total: 0, correct: 0, maxScore: 0, earnedScore: 0 };
        skillStats[tag].total++;
        skillStats[tag].maxScore += (q.diem ?? 0.5);
        if (userAnswers[idx] === q.answer) {
            skillStats[tag].correct++;
            skillStats[tag].earnedScore += (q.diem ?? 0.5);
        }
    });

    let html = '';
    skillKeys.forEach(k => {
        const data = skillStats[k];

        // Không có câu hỏi đo năng lực này = chưa đánh giá, tuyệt đối không quy thành 0%/yếu.
        if (data.total <= 0 || data.maxScore <= 0) {
            html += `
                <div class="bg-slate-50/70 border border-slate-200 rounded-2xl p-3 flex flex-col justify-between space-y-2">
                    <div class="flex items-center justify-between">
                        <span class="font-black text-slate-700 text-xs sm:text-sm">${SKILL_TAXONOMY[k].name}</span>
                        <span class="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-slate-100 text-slate-500 border border-slate-200">Chưa đánh giá</span>
                    </div>
                    <div class="flex items-center justify-between text-xs font-bold text-slate-400">
                        <span>Chưa có câu hỏi phù hợp trong phạm vi đề</span>
                        <span class="font-math font-black">--</span>
                    </div>
                    <div class="w-full bg-slate-100 rounded-full h-2 overflow-hidden"></div>
                </div>
            `;
            return;
        }

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
// LƯU KẾT QUẢ & ĐỒNG BỘ ĐIỂM C1-C6 LÊN GOOGLE SHEETS
// ==========================================
async function __legacyTa1_saveExamResultToSheet_1() {
    const { categoryKey, examIndex } = activeExamContext;
    const thoiGianLamBai = quizStartTime ? formatDuration(Date.now() - quizStartTime) : '';

    const skillScores = {};
    const skillTotals = {};
    SKILL_KEYS.forEach(k => { skillScores[k] = 0; skillTotals[k] = 0; });
    quizAnsweredLog.forEach(item => {
        let tag = String(item.skill_tag || 'ENG_VOC').toUpperCase();
        if (!SKILL_KEYS.includes(tag)) tag = 'ENG_VOC';
        skillTotals[tag]++;
        if (item.isCorrect) skillScores[tag] += (item.diem || 0.5);
    });

    const payload = {
        maHS: currentUser.maHS,
        token: getStoredSessionToken(),
        hoTen: currentUser.hoTen,
        lop: currentUser.lop,
        examCategory: categoryKey,
        sheetName: examFileMap[categoryKey]?.sheet || 'LichSuBaiThiHK1',
        deSo: examIndex + 1,
        thoiGianLamBai,
        tongDiem: score.toFixed(1),
        soCauDung: quizAnsweredLog.filter(x => x.isCorrect).length,
        tongCauHoi: activeQuestionsList.length,
        wrongQuestions: quizWrongAnswers
    };
    // Ghi điểm từng nhóm năng lực vào ĐÚNG tên cột "diem" + mã kỹ năng (diemENG_PHO, diemENG_VOC...)
    // — không hard-code tên cột, tránh lệch dữ liệu nếu sau này đổi lại taxonomy.
    // Năng lực không xuất hiện trong đề phải để trống, không ghi 0.0 vì 0.0 dễ bị hiểu sai là học sinh yếu.
    SKILL_KEYS.forEach(k => {
        payload['diem' + k] = skillTotals[k] > 0 ? skillScores[k].toFixed(1) : '';
    });
    try { await callAppsScript('saveExamResult', payload); } catch (e) {}
}

async function __legacyTa1_saveWeeklyProgressToSheet_1(percent, starCount, scoreVal) {
    const { week, topicId, chuDe } = activeRoadmapContext;
    const thoiGianLamBai = quizStartTime ? formatDuration(Date.now() - quizStartTime) : '';
    const scoreThang10 = (scoreVal ?? ((score / activeQuestionsList.length) * 10)).toFixed(1);

    // Đếm CHÍNH XÁC số câu đúng / tổng số câu của từng nhóm năng lực, dựa theo skill_tag
    // (ENG_PHO-READ) mà mỗi câu tự mang sẵn — không ước lượng chia đều, không suy luận gián tiếp qua chủ đề Mục lớn.
    const skillCorrect = {}; const skillTotal = {};
    SKILL_KEYS.forEach(k => { skillCorrect[k] = 0; skillTotal[k] = 0; });
    quizAnsweredLog.forEach(item => {
        let tag = String(item.skill_tag || 'ENG_VOC').toUpperCase();
        if (!SKILL_KEYS.includes(tag)) tag = 'ENG_VOC';
        skillTotal[tag]++;
        if (item.isCorrect) skillCorrect[tag]++;
    });
    const payload = {
        student_id: currentUser.maHS,
        maHS: currentUser.maHS,
        token: getStoredSessionToken(),
        hoTen: currentUser.hoTen,
        lop: currentUser.lop,
        sheetName: 'LichSuTienTrinhTuan',
        week_completed: week,
        tuan: week,
        chuDe,
        topicId,
        score: scoreThang10,
        stars_earned: starCount,
        tongCauHoi: activeQuestionsList.length,
        soCauDung: quizAnsweredLog.filter(x => x.isCorrect).length,
        percent,
        thoiGianLamBai,
        wrongQuestions: quizWrongAnswers
    };
    Object.keys(SKILL_TAXONOMY).forEach(k => {
        payload[SKILL_TAXONOMY[k].sheetCol] = skillCorrect[k];
        payload[SKILL_TAXONOMY[k].totalCol] = skillTotal[k];
    });

    try {
        await callAppsScript('saveWeeklyProgress', payload);
        if (percent >= 80) {
            const nextWeek = week + 1;
            if (nextWeek > (Number(currentUser.tuanHienTai) || 1) && nextWeek <= TOTAL_ROADMAP_WEEKS) {
                currentUser.tuanHienTai = nextWeek;
                setTimeout(() => alert(`🎉 Chúc mừng bé đạt ${percent}% điểm! Tuần ${nextWeek} đã được mở khóa trên bản đồ!`), 500);
            }
        }
    } catch (e) {}
}

async function __legacyTa1_openHistoryModal_1(sheetName = 'LichSuTienTrinhTuan') {
    if (!currentUser || currentUser.isGuest) {
        return alert('Bé vui lòng đăng nhập để xem lịch sử tiến trình nhé!');
    }

    const modal = document.getElementById('modal-history-progress');
    modal.classList.remove('hidden');

    document.getElementById('hist-info-name').textContent = currentUser.hoTen || '--';
    document.getElementById('hist-info-class').textContent = currentUser.lop || '--';
    document.getElementById('hist-info-code').textContent = currentUser.maHS || '--';
    document.getElementById('hist-info-dob').textContent = currentUser.ngaySinh || '03/09/2019';
    document.getElementById('hist-report-date').textContent = new Date().toLocaleDateString('vi-VN');

    const titleMap = {
        LichSuTienTrinhTuan: "Báo cáo tiến trình 24 tuần học tập",
        LichSuBaiThiHK1: "Báo cáo kết quả đấu trường — Học kỳ 1",
        LichSuBaiThiHK2: "Báo cáo kết quả đấu trường — Học kỳ 2",
        LichSuBaiThiHSG: "Báo cáo kết quả đấu trường — Học sinh giỏi"
    };
    document.getElementById('hist-modal-title').textContent = titleMap[sheetName] || "Kết quả tiến trình học tập";

    showLoadingOverlay('Đang trích xuất dữ liệu và vẽ biểu đồ năng lực...');
    try {
        const res = await callAppsScript('getHistory', { maHS: currentUser.maHS, sheetName, token: getStoredSessionToken() });
        hideLoadingOverlay();
        const rows = (res && res.history) ? res.history : [];
        renderHistoryReport(rows, sheetName);
    } catch (err) {
        hideLoadingOverlay();
        alert('Không thể tải lịch sử: ' + err.message);
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
    const correct = Number(row[taxo.sheetCol]);
    const total = Number(row[taxo.totalCol]);
    if (!row[taxo.totalCol] || isNaN(total) || total <= 0) return null;
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

function renderHistoryReport(rows, sheetName) {
    const isWeekly = sheetName === 'LichSuTienTrinhTuan';
    const labels = rows.map((r, i) => {
        const dm = formatDateShort(r.Timestamp || r.ngayLam);
        const label = isWeekly ? `Tuần ${r.tuan || i + 1}` : (r.deSo ? `Đề ${r.deSo}` : `Tuần ${r.tuan || i + 1}`);
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

    const skillKeys = SKILL_KEYS;
    const skillAverages = { ENG_PHO: null, ENG_VOC: null, ENG_LIS: null, ENG_GRA: null, ENG_SYN: null, ENG_READ: null };
    const touchedSkills = [];

    if (rows.length && isWeekly) {
        // Tiến trình tuần: % = tổng số câu đúng / tổng số câu đã làm THẬT của nhóm kỹ năng đó
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
        // Ma trận V3: HK1 chỉ đo 4 năng lực; HK2/HSG đo đủ 6. Dữ liệu trống được loại khỏi mẫu tính.
        const MAX_BY_SHEET = {
            LichSuBaiThiHK1: { ENG_PHO: 2.5, ENG_VOC: 2.5, ENG_LIS: 2.5, ENG_GRA: 0, ENG_SYN: 2.5, ENG_READ: 0 },
            LichSuBaiThiHK2: { ENG_PHO: 1.25, ENG_VOC: 1.25, ENG_LIS: 1.5, ENG_GRA: 1.75, ENG_SYN: 1.75, ENG_READ: 2.5 },
            LichSuBaiThiHSG: { ENG_PHO: 1.25, ENG_VOC: 1.25, ENG_LIS: 1.5, ENG_GRA: 1.75, ENG_SYN: 1.75, ENG_READ: 2.5 }
        };
        const maxMap = MAX_BY_SHEET[sheetName] || MAX_BY_SHEET.LichSuBaiThiHK2;
        skillKeys.forEach((k) => {
            const maxPts = Number(maxMap[k] || 0);
            const vals = rows.map(r => {
                const raw = r[`diem${k}`];
                if (raw === undefined || raw === null || raw === '--' || raw === '') return null;
                const num = Number(raw);
                return Number.isFinite(num) ? num : null;
            }).filter(v => v !== null);
            if (vals.length > 0 && maxPts > 0) {
                const sum = vals.reduce((a, b) => a + b, 0);
                skillAverages[k] = Math.min(100, Math.round((sum / (vals.length * maxPts)) * 100));
                touchedSkills.push(k);
            }
        });
    }

    const ctxBar = document.getElementById('topicRadarChartCanvas').getContext('2d');
    if (histBarChartInstance) histBarChartInstance.destroy();

    histBarChartInstance = new Chart(ctxBar, {
        type: 'bar',
        data: {
            labels: skillKeys.map(k => SKILL_TAXONOMY[k].name),
            datasets: [{
                label: 'Độ thành thạo (%)',
                data: skillKeys.map(k => touchedSkills.includes(k) ? skillAverages[k] : null),
                backgroundColor: ['#f472b6', '#fb7185', '#f59e0b', '#a855f7', '#ec4899', '#e11d48'],
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
                tooltip: { callbacks: { label: (ctx) => ctx.raw == null ? ' Chưa đánh giá' : ` Độ thành thạo: ${ctx.raw}%` } }
            }
        },
        plugins: [{
            id: 'barValueLabels',
            afterDatasetsDraw(chart) {
                const { ctx } = chart;
                chart.data.datasets[0].data.forEach((val, i) => {
                    const meta = chart.getDatasetMeta(0).data[i];
                    if (!meta || val == null) return;
                    ctx.save();
                    ctx.font = 'bold 12px Quicksand, sans-serif';
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
    renderHistoryTable(rows, sheetName);
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
        weaknessHtml = `Bé mới luyện tập 1 nhóm kỹ năng, cô chưa đủ dữ liệu để đánh giá toàn diện. Ba mẹ khuyến khích con hoàn thành thêm các tuần khác nhé!`;
    } else {
        strengthHtml = `Bé chưa có đủ dữ liệu luyện tập để đánh giá thế mạnh.`;
        weaknessHtml = `Bé chưa có đủ dữ liệu luyện tập để đánh giá điểm cần khắc phục.`;
    }

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
            <p class="text-gray-700">Ba mẹ nên dành 15 phút mỗi tối cùng con ôn lại từ vựng, đặt câu hỏi gợi mở bằng tiếng Anh đơn giản và khen ngợi kịp thời để giúp ${studentName} giữ vững niềm yêu thích tiếng Anh nhé!</p>
        </div>
    `;

    // Lưu lại bản văn bản thuần (không thẻ HTML) của toàn bộ 4 phần nhận xét — dùng để đọc to
    // qua nút "Nghe cô giáo đọc" (dùng chung cho cả Tiến trình tuần lẫn Đề thi vì cùng 1 khung này).
    pedagogicalEvaluationText = box.textContent.replace(/\s+/g, ' ').trim();
}

function speakPedagogicalEvaluation() {
    if (!pedagogicalEvaluationText) return;
    speakVietnamese(pedagogicalEvaluationText);
}

function renderHistoryTable(rows, sheetName) {
    const tbody = document.getElementById('hist-table-body');
    if (!tbody) return;

    if (!rows.length) {
        tbody.innerHTML = `<tr><td colspan="11" class="py-4 text-gray-400">Chưa ghi nhận lịch sử bài làm nào</td></tr>`;
        return;
    }

    const isWeekly = sheetName === 'LichSuTienTrinhTuan';
    const skillKeys = SKILL_KEYS;

    const getScoreVal = (r, skillKey) => {
        const val = r['diem' + skillKey];
        if (val === undefined || val === null || val === '' || val === '--') return null;
        const num = Number(val);
        return Number.isFinite(num) ? num : null;
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
            summaryCells += `<td class="py-2 px-1">${a.total > 0 ? Math.round((a.correct / a.total) * 100) + '%' : '--'}</td>`;
        });

        rows.forEach((r, idx) => {
            const itemDiem = r.tongDiem || r.score || '--';
            const dateStr = formatDateOnly(r.Timestamp || r.ngayLam);
            const durationStr = r.thoiGianLamBai || '--';

            let skillCells = '';
            skillKeys.forEach(k => {
                const cell = getSkillCell(r, k);
                if (!cell) { skillCells += `<td class="py-2 px-1 text-gray-300">--</td>`; return; }
                const pct = cell.total > 0 ? Math.round((cell.correct / cell.total) * 100) : 0;
                skillCells += `<td class="py-2 px-1">${cell.correct}/${cell.total} <span class="text-gray-400">(${pct}%)</span></td>`;
            });

            bodyRows += `
                <tr class="hover:bg-pink-50/30 transition-colors">
                    <td class="py-2.5 px-2">${idx + 1}</td>
                    <td class="py-2.5 px-2 font-black">Tuần ${r.tuan || (idx + 1)}</td>
                    <td class="py-2.5 px-2 font-black text-rose-600">${itemDiem}</td>
                    ${skillCells}
                    <td class="py-2.5 px-2 text-gray-500">${dateStr}</td>
                    <td class="py-2.5 px-2 text-gray-500">${durationStr}</td>
                </tr>
            `;
        });
    } else {
        skillKeys.forEach((k) => {
            const vals = rows.map(r => getScoreVal(r, k)).filter(v => v !== null);
            if (!vals.length) {
                summaryCells += `<td class="py-2 px-1 text-gray-400">--</td>`;
            } else {
                const sum = vals.reduce((acc, v) => acc + v, 0);
                summaryCells += `<td class="py-2 px-1">${(sum / vals.length).toFixed(1)}</td>`;
            }
        });

        rows.forEach((r, idx) => {
            const itemDiem = r.tongDiem || r.score || '--';
            const dateStr = formatDateOnly(r.Timestamp || r.ngayLam);
            const durationStr = r.thoiGianLamBai || '--';

            let examSkillCells = '';
            skillKeys.forEach((k) => {
                const val = getScoreVal(r, k);
                examSkillCells += val === null
                    ? `<td class="py-2 px-1 text-gray-300">--</td>`
                    : `<td class="py-2 px-1">${val}</td>`;
            });

            bodyRows += `
                <tr class="hover:bg-pink-50/30 transition-colors">
                    <td class="py-2.5 px-2">${idx + 1}</td>
                    <td class="py-2.5 px-2 font-black">${r.deSo ? `Đề ${r.deSo}` : `Tuần ${r.tuan || (idx + 1)}`}</td>
                    <td class="py-2.5 px-2 font-black text-rose-600">${itemDiem}</td>
                    ${examSkillCells}
                    <td class="py-2.5 px-2 text-gray-500">${dateStr}</td>
                    <td class="py-2.5 px-2 text-gray-500">${durationStr}</td>
                </tr>
            `;
        });
    }

    const html = `
        <tr class="bg-amber-100/90 text-amber-950 font-black border-b-2 border-amber-200">
            <td class="py-2.5 px-2" colspan="2">Điểm trung bình</td>
            <td class="py-2.5 px-2 text-rose-600">${avgTong}</td>
            ${summaryCells}
            <td class="py-2.5 px-2" colspan="2">--</td>
        </tr>
        ${bodyRows}
    `;
    tbody.innerHTML = html;
}

function exportReportToPDF() {
    const area = document.getElementById('printable-report-area');
    if (!area) return;
    showLoadingOverlay('Đang khởi tạo file PDF chuẩn in ấn...');
    
    const opt = {
        margin: [5, 5, 5, 5],
        filename: `Bao_Cao_Tien_Trinh_${currentUser?.maHS || 'HocSinh'}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' },
        pagebreak: { mode: ['css', 'legacy'] }
    };

    html2pdf().set(opt).from(area).save().then(() => {
        hideLoadingOverlay();
    }).catch(err => {
        hideLoadingOverlay();
        window.print();
    });
}

// ==========================================
// ĐỘNG CƠ ÂM THANH: GOOGLE TTS CHỊ BAN MAI
// ==========================================
function __legacyTa1_stopSpeaking_1() {
    try {
        if (banMaiAudio) {
            banMaiAudio.pause();
            banMaiAudio.currentTime = 0;
            banMaiAudio.onended = null;
        }
    } catch (e) {}
}

function __legacyTa1_speakVietnamese_1(text, rate = 0.96) {
    if (!text) return;
    speakGoogleTTS(text, 'vi', rate);
}

function __legacyTa1_speakEnglish_1(text, rate = 0.92) {
    if (!text) return;
    speakGoogleTTS(text, 'en', rate);
}

function __legacyTa1_speakGoogleTTS_1(text, lang, rate) {
    try {
        stopSpeaking();

        let cleanText = String(text)
            .replace(/<[^>]*>/g, '')
            .replace(/b-a/g, 'bờ a ba')
            .replace(/c\/k/g, 'cờ hoặc ca')
            .replace(/g\/gh/g, 'gờ đơn hoặc gờ kép')
            .replace(/ng\/ngh/g, 'ngờ đơn hoặc ngờ kép')
            .trim();

        if (!cleanText) return;
        const tl = lang === 'en' ? 'en' : 'vi';

        if (cleanText.length <= 180) {
            const encoded = encodeURIComponent(cleanText);
            banMaiAudio.src = `https://translate.google.com/translate_tts?ie=UTF-8&tl=${tl}&client=tw-ob&q=${encoded}`;
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
            banMaiAudio.src = `https://translate.google.com/translate_tts?ie=UTF-8&tl=${tl}&client=tw-ob&q=${encoded}`;
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
    // Nội dung tiếng Anh thật (câu nghe, đoạn văn đọc hiểu) đọc bằng giọng Anh;
    // phần hướng dẫn/câu hỏi tiếng Việt đọc bằng giọng Việt.
    if (q.audio_text) return speakEnglish(q.audio_text);
    if (q.reading_passage) return speakEnglish(q.reading_passage);
    speakVietnamese(q.question_text, 0.96);
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

function __legacyTa1_showLoadingOverlay_1(msg) {
    let el = document.getElementById('loading-overlay');
    if (!el) {
        el = document.createElement('div');
        el.id = 'loading-overlay';
        el.className = 'fixed inset-0 bg-black/30 flex items-center justify-center z-50';
        el.innerHTML = `<div class="bg-white px-6 py-4 rounded-2xl shadow-xl font-extrabold text-pink-600 flex items-center space-x-3"><i class="fa-solid fa-spinner fa-spin"></i><span id="loading-overlay-text"></span></div>`;
        document.body.appendChild(el);
    }
    document.getElementById('loading-overlay-text').textContent = msg;
    el.classList.remove('hidden');
}
function __legacyTa1_hideLoadingOverlay_1() { document.getElementById('loading-overlay')?.classList.add('hidden'); }

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

// Standalone DOMContentLoaded boot removed; Class 1 module mount owns lifecycle.

// TRUNG TÂM MINI GAME (12 game, lưới 3x4)
// ==========================================
// ==========================================
// THEME DÙNG CHUNG CHO TOÀN BỘ MINI GAME
// Giữ ngôn ngữ thiết kế của phần Học: card pastel, 2 cột, badge số lượng,
// màu sắc luân phiên theo từng game để vui mắt nhưng vẫn đồng bộ toàn app.
// ==========================================
const MINIGAME_TOPIC_PALETTES = SUBTOPIC_PALETTES;

function miniGameHash(text = '') {
    return [...String(text)].reduce((acc, ch) => ((acc * 31) + ch.charCodeAt(0)) >>> 0, 7);
}

function getMiniGamePaletteOrder(seed = 'minigame') {
    const order = MINIGAME_TOPIC_PALETTES.map((_, i) => i);
    let state = miniGameHash(seed) || 1;
    for (let i = order.length - 1; i > 0; i--) {
        state = (state * 1664525 + 1013904223) >>> 0;
        const j = state % (i + 1);
        [order[i], order[j]] = [order[j], order[i]];
    }
    return order.map(i => MINIGAME_TOPIC_PALETTES[i]);
}

function getMiniGameTopicName(topicId) {
    if (topicId === null || topicId === undefined || topicId === 'all') return 'Trộn tất cả các nhóm';
    const g = getMiniGameTopicGroups().find(x => Number(x.id) === Number(topicId));
    return g ? `${g.id}. ${g.name}` : `Nhóm ${topicId}`;
}

function renderMiniGameTopicMenu({
    gameKey,
    onChoose,
    subtitle = 'Chọn 1 trong 6 Nhóm từ vựng để bắt đầu chơi nhé!',
    countFilter = null,
    mixLabel = 'Trộn tất cả các nhóm'
}) {
    const groups = getMiniGameTopicGroups();
    const palettes = getMiniGamePaletteOrder(gameKey || 'minigame');
    const countFor = (topicId) => {
        let pool = getMiniGameVocabPool({ topicId });
        if (typeof countFilter === 'function') pool = pool.filter(countFilter);
        return pool.length;
    };
    const total = countFor('all');
    return `
        <div class="mg-topic-menu w-full max-w-4xl mx-auto">
            <div class="w-full bg-pink-50/35 border-2 border-pink-100 rounded-2xl px-4 py-4 md:py-5 text-center mb-3">
                <p class="text-base md:text-lg text-gray-700 font-bold leading-relaxed">${escapeHtml(subtitle)}</p>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full">
                ${groups.map((g, idx) => {
                    const style = palettes[idx % palettes.length];
                    return `
                        <button onclick="${onChoose}(${g.id})" class="mg-topic-card p-3.5 md:p-4 ${style.card} border-2 rounded-xl font-bold text-left transition-all flex items-center justify-between shadow-sm pastel-btn min-h-[76px]">
                            <span class="text-base md:text-[17px] leading-snug pr-2"><strong class="${style.num} mr-1.5">${g.id}.</strong>${escapeHtml(g.name)}</span>
                            <span class="text-sm font-extrabold ${style.badge} px-2.5 py-0.5 rounded-full border shrink-0 ml-1.5 shadow-inner">${countFor(g.id)} từ</span>
                        </button>`;
                }).join('')}
            </div>
            <div class="mt-3 flex justify-center">
                <button onclick="${onChoose}('all')" class="mg-mix-btn pastel-btn inline-flex items-center justify-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-purple-400 to-indigo-400 hover:from-purple-500 hover:to-indigo-500 text-white font-extrabold text-sm md:text-base shadow-md border border-purple-300">
                    <span>🌟 ${escapeHtml(mixLabel)}</span>
                    <span class="text-xs md:text-sm font-black bg-white/20 px-2 py-0.5 rounded-full">${total} từ</span>
                </button>
            </div>
        </div>`;
}

function ensureMiniGameThemeStyles() {
    if (document.getElementById('minigame-theme-v3')) return;
    const style = document.createElement('style');
    style.id = 'minigame-theme-v3';
    style.textContent = `
        #view-game-play > div { max-width: 56rem !important; }
        #game-play-title { font-size: 1.2rem !important; }
        #game-play-container { font-size: 16px; }
        #game-play-container .text-\\[10px\\] { font-size: 12px !important; }
        #game-play-container .text-\\[11px\\] { font-size: 13px !important; }
        #game-play-container .text-xs { font-size: 14px !important; }
        #game-play-container .mg-topic-card { min-height: 78px; }
        #game-play-container .mg-topic-card:hover { transform: translateY(-2px); }
        #game-play-container .mg-mix-btn { min-width: 250px; }
        @media (max-width: 640px) {
            #view-game-play > div { max-width: 100% !important; }
            #game-play-title { font-size: 1.05rem !important; }
            #game-play-container .mg-mix-btn { min-width: 0; width: auto; }
        }
    `;
    document.head.appendChild(style);
}

const MINIGAME_LIST = [
    { id: 'word-search', title: '1. Word Search', desc: 'Tìm từ giấu trong ô chữ', icon: '🔍', ready: true },
    { id: 'word-scramble', title: '2. Word Scramble', desc: 'Sắp xếp chữ cái thành từ', icon: '🔤', ready: true },
    { id: 'bingo', title: '3. Bingo', desc: 'Nghe và tìm đúng từ trên bảng', icon: '🎲', ready: true },
    { id: 'fishing-game', title: '4. Fishing Game', desc: 'Câu đúng con cá mang từ', icon: '🎣', ready: true },
    { id: 'sentence-train', title: '5. Sentence Train', desc: 'Xếp toa từ thành câu đúng', icon: '🚂', ready: true },
    { id: 'grammar-river', title: '6. Grammar River', desc: 'Nhảy qua đúng giới từ', icon: '🐸', ready: true },
    { id: 'qa-bridge', title: '7. Q&A Bridge', desc: 'Ghép đúng câu hỏi - trả lời', icon: '🌉', ready: true },
    { id: 'sentence-doctor', title: '8. Sentence Doctor', desc: 'Tìm và chữa lỗi ngữ pháp', icon: '🩺', ready: true },
    { id: 'action-race', title: '9. Action Race', desc: 'Đua xe cùng động từ hành động', icon: '🏎️', ready: true },
    { id: 'feeling-detective', title: '10. Feeling Detective', desc: 'Truy tìm tính từ và trạng thái', icon: '🕵️', ready: true },
    { id: 'a-or-an-factory', title: '11. A or An Factory', desc: 'Phân loại mạo từ a / an', icon: '🏭', ready: true },
    { id: 'teacher-says', title: '12. Teacher Says', desc: 'Phản xạ với câu mệnh lệnh', icon: '🤖', ready: true }
];

function openMiniGameHub() {
    stopSpeaking();
    if (!requirePremiumAccess('Mini Game')) return;
    if (typeof setMainTabActive_ === 'function') setMainTabActive_('games');
    inAlphaIpaFlow = false;
    inMiniGameFlow = true;
    activeExamContext = null; activeRoadmapContext = null; activeTopicId = null; pendingTopicQuiz = null;
    updateNavTabs("Mini Game", "🎮", null);

    ensureMiniGameThemeStyles();
    const grid = document.getElementById('minigame-grid');
    grid.innerHTML = MINIGAME_LIST.map((g, idx) => {
        const style = getMiniGamePaletteOrder('hub')[idx % MINIGAME_TOPIC_PALETTES.length];
        return `
        <div onclick="openGamePlay('${g.id}')" class="p-3.5 md:p-4 flex flex-col items-center text-center cursor-pointer transition-all group ${style.card} border-2 rounded-[26px] min-h-[132px] justify-between relative shadow-sm pastel-btn">
            ${!g.ready ? `<span class="absolute top-2 right-2 bg-amber-100 text-amber-700 text-[10px] font-black px-2 py-0.5 rounded-full border border-amber-200">Sắp ra mắt</span>` : ''}
            <div class="text-4xl group-hover:scale-110 transition-transform mt-1">${g.icon}</div>
            <div class="w-full">
                <h3 class="font-extrabold ${style.num} text-base leading-tight">${g.title}</h3>
                <p class="text-sm text-gray-700 font-bold mt-1 w-full leading-snug">${g.desc}</p>
            </div>
        </div>`;
    }).join('');

    switchAppView('view-minigame-hub');
}

// Đường dẫn file JS riêng của từng game — chỉ tải về máy khi bé THẬT SỰ bấm vào game đó,
// không bắt tải sẵn hết 12 game ngay từ đầu (giữ app.js gọn nhẹ dù sau này thêm bao nhiêu game).
const GAME_SCRIPT_MAP = {
    'word-search': 'assets/js/english/games/word-search.js?v=mg4',
    'word-scramble': 'assets/js/english/games/word-scramble.js?v=mg4',
    'bingo': 'assets/js/english/games/bingo.js?v=mg4',
    'fishing-game': 'assets/js/english/games/fishing-game.js?v=mg4',
    'sentence-train': 'assets/js/english/games/sentence-train.js?v=mg5',
    'grammar-river': 'assets/js/english/games/grammar-river.js?v=mg6',
    'qa-bridge': 'assets/js/english/games/qa-bridge.js?v=mg7',
    'sentence-doctor': 'assets/js/english/games/sentence-doctor.js?v=mg8',
    'action-race': 'assets/js/english/games/action-race.js?v=mg9',
    'feeling-detective': 'assets/js/english/games/feeling-detective.js?v=mg10',
    'a-or-an-factory': 'assets/js/english/games/a-or-an-factory.js?v=mg11',
    'teacher-says': 'assets/js/english/games/teacher-says.js?v=mg12'
};
const loadedGameScripts = {};

function __legacyTa1_loadGameScript_1(src) {
    if (loadedGameScripts[src]) return Promise.resolve();
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => { loadedGameScripts[src] = true; resolve(); };
        script.onerror = () => reject(new Error(`Không tải được file game: ${src}`));
        document.body.appendChild(script);
    });
}

async function __legacyTa1_openGamePlay_1(gameId) {
    stopSpeaking();
    ensureMiniGameThemeStyles();
    inMiniGameFlow = true;
    const game = MINIGAME_LIST.find(g => g.id === gameId);
    if (!game) return;

    if (!game.ready) {
        alert(`Game "${game.title}" đang được xây dựng, sắp ra mắt sớm nhé! Con quay lại sau nha!`);
        return;
    }

    document.getElementById('game-play-title').innerHTML = `<span>${game.icon}</span><span>${game.title}</span>`;
    updateNavTabs("Mini Game", "🎮", game.title);
    switchAppView('view-game-play');

    const scriptSrc = GAME_SCRIPT_MAP[gameId];
    if (scriptSrc) {
        document.getElementById('game-play-container').innerHTML = `<p class="text-center text-gray-400 font-bold py-8">Đang tải game...</p>`;
        try {
            await loadGameScript(scriptSrc);
        } catch (e) {
            document.getElementById('game-play-container').innerHTML = `<p class="text-center text-rose-500 font-bold py-8">Không tải được game, bé thử lại nhé!</p>`;
            return;
        }
    }

    if (gameId === 'word-search') startWordSearchGame();
    if (gameId === 'word-scramble') startWordScrambleGame();
    if (gameId === 'bingo') startBingoGame();
    if (gameId === 'fishing-game') startFishingGame();
    if (gameId === 'sentence-train') startSentenceTrainGame();
    if (gameId === 'grammar-river') startGrammarRiverGame();
    if (gameId === 'qa-bridge') startQABridgeGame();
    if (gameId === 'sentence-doctor') startSentenceDoctorGame();
    if (gameId === 'action-race') startActionRaceGame();
    if (gameId === 'feeling-detective') startFeelingDetectiveGame();
    if (gameId === 'a-or-an-factory') startAOrAnFactoryGame();
    if (gameId === 'teacher-says') startTeacherSaysGame();
}

/** Lấy nguồn từ vựng thật của chương trình (kho tra nghĩa xây từ Flashcards Library) —
 * chỉ lấy từ ĐƠN (không dấu cách/gạch nối), độ dài 3-7 ký tự để vừa vặn lưới ô chữ. */
function getWordSearchVocabPool(topicId = 'all') {
    return getMiniGameVocabPool({ topicId, singleWordOnly: true, minLength: 3, maxLength: 7 })
        .map(item => ({ w: item.word.toUpperCase(), vi: item.vietnamese }));
}


// ===== TA1 6-TAB / LESSON-EXERCISE BRANCH — bám cách làm TA2, giữ nội dung TA1 =====
let currentMainTab = 'discover';
let activeBaiHocContext = { semester: 1, bai: null, lessonId: null, pageNo: 1 };

// ============================================================
// TA1 APP SHELL 2026: banner chinh o root tab, banner phu + breadcrumb khi vao noi dung.
// Chi dieu khien presentation, khong thay doi nghiep vu/du lieu.
// ============================================================
let appShellRootMode_ = true;
function setAppShellRootMode_(isRoot) {
    appShellRootMode_ = !!isRoot;
    const mainBanner = document.getElementById('app-main-banner');
    const contextBanner = document.getElementById('app-context-banner');
    if (mainBanner) mainBanner.classList.toggle('hidden', !appShellRootMode_);
    if (contextBanner) contextBanner.classList.toggle('hidden', appShellRootMode_);
}

function switchAppView(viewId) {
    stopSpeaking();
    if (!['view-bai-hoc-hub','view-bai-hoc-lesson'].includes(viewId)) inLessonFlow=false;

    // Root cua 6 tab: hien banner chinh. Cac man noi dung sau khi di vao nhanh: banner phu.
    const rootViews = new Set(['view-dashboard-grid','view-bai-hoc-hub','view-roadmap','view-minigame-hub','view-exam-hub']);
    const reviewRoot = viewId === 'view-lecture' && currentMainTab === 'review' && !activeExamContext && !activeRoadmapContext;
    setAppShellRootMode_(rootViews.has(viewId) || reviewRoot);

    ['view-dashboard-grid','view-bai-hoc-hub','view-bai-hoc-lesson','view-alphabet','view-lecture','view-quiz','view-roadmap','view-minigame-hub','view-game-play','view-exam-hub','view-result'].forEach(id => {
        const el=document.getElementById(id); if(!el)return;
        if(id===viewId) el.classList.remove('hidden'); else el.classList.add('hidden');
    });
}
function setMainTabActive_(tabName){
    currentMainTab=tabName||'discover';
    document.querySelectorAll('.main-module-tab').forEach(btn=>{
        const active=btn.dataset.tab===currentMainTab;
        btn.classList.toggle('is-active',active);
        btn.setAttribute('aria-selected',active?'true':'false');
    });
    refreshMainTabLocks_();
}
function refreshMainTabLocks_(){
    // Chỉ Explore / Khám phá là mở tự do. 5 tab còn lại dùng quyền Premium
    // (Admin, Trial còn hạn hoặc VIP còn hạn).
    const locked = !hasPremiumAccess();
    ['lessons-lock-icon','roadmap-lock-icon','review-lock-icon','exam-lock-icon','minigame-lock-icon']
        .forEach(id=>document.getElementById(id)?.classList.toggle('hidden',!locked));
}
function openMainTab(tabName){
    stopSpeaking(); clearInterval(quizTimerInterval);
    switch(tabName){
        case 'discover': goHome(); break;
        case 'lessons': openBaiHocHub(1); break;
        case 'exercises': openRoadmap(1); break;
        case 'review': openReviewTab(); break;
        case 'exams': openExamHub(); break;
        case 'games': openMiniGameHub(); break;
        default: goHome();
    }
}
function goHome(){
    setAppShellRootMode_(true);
    stopSpeaking(); clearInterval(quizTimerInterval);
    inLessonFlow=false; inAlphaIpaFlow=false; inMiniGameFlow=false;
    activeExamContext=null; activeRoadmapContext=null; activeTopicId=null; pendingTopicQuiz=null;
    setMainTabActive_('discover'); updateNavTabs(null,null,null); switchAppView('view-dashboard-grid');
    const grid=document.getElementById('view-dashboard-grid'); if(grid&&!grid.children.length) renderDashboardGrid();
}
async function __legacyTa1_openReviewTab_1(){
    if(!requirePremiumAccess('Review / Ôn tập')) return;
    stopSpeaking(); clearInterval(quizTimerInterval); setMainTabActive_('review');
    inLessonFlow=false; inAlphaIpaFlow=false; inMiniGameFlow=false; activeExamContext=null; activeRoadmapContext=null; activeTopicId=11; pendingTopicQuiz=null;
    updateNavTabs('Review / Ôn tập','🧠',null); showLoadingOverlay('Đang tải nội dung ôn tập...');
    try{
        const flat=await fetchAllQuestionsFlat();
        const reviewQuestions=flat.filter(q=>q.sub_topic==='11.1'||q.sub_topic==='11.2');
        if(!reviewQuestions.length) throw new Error('Không tìm thấy dữ liệu ôn tập Học kỳ 1 / Học kỳ 2');
        hideLoadingOverlay();
        showLectureAndSubtopics(11,'Review / Ôn tập',{topic_id:11,topic_name:'Review / Ôn tập',description:'Choose a semester to review. / Chọn học kỳ để ôn tập.',lecture_title:'Review',lecture_content:'Choose Semester 1 or Semester 2 to start reviewing.',lecture_audio_text:'Choose Semester 1 or Semester 2 to start reviewing.',questions:reviewQuestions});
    }catch(err){ hideLoadingOverlay(); activeTopicId=null; alert(`Không thể tải nội dung ôn tập: ${err.message}`); }
}

// ----- BÀI HỌC: 16 Unit TA1, Premium, 2 semester filters -----
function getBaiHocTa1ProgressKey_(){return `ta1_bai_hoc_done_v1_${String(currentUser?.maHS||'KHACH').toUpperCase()}`;}
function getBaiHocTa1CompletedSet_(){try{return new Set(JSON.parse(localStorage.getItem(getBaiHocTa1ProgressKey_())||'[]'));}catch(e){return new Set();}}
function saveBaiHocTa1CompletedSet_(s){try{localStorage.setItem(getBaiHocTa1ProgressKey_(),JSON.stringify([...s]));}catch(e){}}
async function openBaiHocHub(semesterNumber=1){
    stopSpeaking(); clearInterval(quizTimerInterval);
    if(!requirePremiumAccess('Lessons / Bài học')) return;
    setMainTabActive_('lessons');
    inLessonFlow=true; inMiniGameFlow=false; inAlphaIpaFlow=false; activeExamContext=null; activeRoadmapContext=null; activeTopicId=null; pendingTopicQuiz=null;
    activeBaiHocContext={semester:Number(semesterNumber)||1,bai:null,lessonId:null,pageNo:1};
    updateNavTabs('Lessons / Bài học','📖',null); switchAppView('view-bai-hoc-hub'); showLoadingOverlay('Đang mở Bài học Tiếng Anh 1...');
    try{const data=await loadLessonData_();renderBaiHocTa1Hub_(data,activeBaiHocContext.semester);}catch(err){alert(`Không thể mở Bài học: ${err.message}`);}finally{hideLoadingOverlay();}
}
function openLessonsHub(){return openBaiHocHub(activeBaiHocContext?.semester||1);}
function renderBaiHocTa1Hub_(data,semester){
    const tabs=document.getElementById('bai-hoc-semester-tabs'),grid=document.getElementById('bai-hoc-grid'),sub=document.getElementById('bai-hoc-hub-subtitle');if(!tabs||!grid)return;
    const arr=(data.bai_hoc||[]).filter(x=>Number(x.semester)===Number(semester));
    tabs.innerHTML=[1,2].map(s=>`<button onclick="openBaiHocHub(${s})" class="semester-switch-btn ${Number(s)===Number(semester)?'is-active':'is-inactive'}"><span class="block">Semester ${s}</span><span class="semester-vi">Học kỳ ${s}</span></button>`).join('');
    if(sub)sub.innerHTML=`Semester ${semester} · ${arr.length} Units · 3 pages each<span class="lesson-hub-vi">Học kỳ ${semester} · mỗi bài 3 trang · khoảng 12–18 phút</span>`;
    const done=getBaiHocTa1CompletedSet_();
    grid.innerHTML=arr.map((l,idx)=>{const ok=done.has(`${l.lesson_id}_done`);return `<button onclick="openBaiHocTa1_(${l.bai},1)" class="text-left min-h-[112px] rounded-2xl border-2 ${ok?'border-emerald-300 bg-emerald-50/60':(idx%2?'border-purple-200 bg-gradient-to-br from-white to-purple-50':'border-pink-200 bg-gradient-to-br from-white to-pink-50')} px-3 py-3 hover:border-fuchsia-400 hover:shadow-md transition-shadow"><div class="flex items-center justify-between"><span class="font-black text-purple-700 text-[15px] md:text-base">Lesson ${l.bai}<span class="block text-[11px] font-extrabold text-slate-400 mt-0.5">Bài ${l.bai}</span></span><span>${ok?'✅':'›'}</span></div><div class="mt-1.5 text-[13px] md:text-[14px] leading-5 font-extrabold text-slate-700">${escapeHtml(l.source_title||'')}</div><div class="text-[12px] md:text-[13px] leading-4 font-extrabold text-slate-400 mt-1.5">${escapeHtml(l.source_title_vi||'')}</div></button>`}).join('');
}
async function openBaiHocTa1_(bai,pageNo=1){
    stopSpeaking();const data=await loadLessonData_();const l=(data.bai_hoc||[]).find(x=>Number(x.bai)===Number(bai));if(!l)return alert('Không tìm thấy bài học.');
    const p=Math.max(1,Math.min(3,Number(pageNo)||1));activeBaiHocContext={semester:Number(l.semester),bai:Number(bai),lessonId:l.lesson_id,pageNo:p};
    setMainTabActive_('lessons');updateNavTabs('Lessons / Bài học','📖',`Lesson ${bai} / Bài ${bai}`,l.source_title||'');switchAppView('view-bai-hoc-lesson');renderBaiHocTa1Lesson_(l,p);
}
function renderBaiHocTa1Lesson_(l,pageNo){
    const meta=document.getElementById('bai-hoc-lesson-meta'),host=document.getElementById('bai-hoc-sections');if(!host)return;
    if(meta)meta.innerHTML=`Lesson ${l.bai} · ${escapeHtml(l.source_title||'')}<div class="text-[12px] font-extrabold text-slate-400 mt-1">Bài ${l.bai}${l.source_title_vi?' · '+escapeHtml(l.source_title_vi):''}</div>`;
    const page=(l.pages||[]).find(x=>Number(x.page_no)===Number(pageNo))||l.pages?.[0];if(!page)return;
    let body='';if(page.page_type==='lesson')body=renderTa1LessonPage_(page);else if(page.page_type==='questions')body=renderTa1QuestionsPage_(page);else body=renderTa1SummaryPage_(page,l);
    host.innerHTML=`${renderTa1LessonTabs_(l,pageNo)}${body}${renderTa1LessonBottom_(l,pageNo)}`;
}
function renderTa1LessonTabs_(l,pageNo){const a=[['📖','Learn','Bài học'],['❓','Practice','Câu hỏi'],['🌟','Review','Tổng kết']];return `<div class="grid grid-cols-3 gap-2 mb-3">${a.map((x,i)=>{const n=i+1,ac=Number(pageNo)===n;return `<button onclick="openBaiHocTa1_(${l.bai},${n})" class="py-2.5 rounded-xl border font-black text-sm ${ac?'bg-gradient-to-r from-pink-500 to-purple-500 text-white border-purple-400 shadow-md':'bg-pink-50/60 text-purple-700 border-pink-200'}"><span>${x[0]}</span><span class="block">${x[1]}</span><span class="block text-[9px] opacity-75">${x[2]}</span></button>`}).join('')}</div>`;}
function escapeJsStringTa1_(value){return String(value??'').replace(/\\/g,'\\\\').replace(/'/g,"\\'").replace(/\r/g,'\\r').replace(/\n/g,'\\n').replace(/<\//g,'<\\/');}
function handleTa1PracticeChoice_(btn,isCorrect,correctText){if(!btn||btn.disabled)return;const card=btn.closest('[data-ta1-practice-card]'),feedback=card?.querySelector('[data-ta1-practice-feedback]');if(isCorrect){card?.querySelectorAll('button[data-ta1-choice]').forEach(b=>{b.disabled=true;b.classList.add('opacity-75');});btn.classList.remove('border-pink-200','bg-white','opacity-75');btn.classList.add('bg-emerald-100','border-emerald-400','text-emerald-800');if(feedback){feedback.className='mt-2 rounded-xl bg-emerald-50 border border-emerald-200 px-3 py-2 text-xs font-extrabold text-emerald-700';feedback.textContent='✅ Great! Đúng rồi. Con đọc lại đáp án một lần nhé.';}if(correctText)speakEnglish(correctText,0.9);}else{btn.disabled=true;btn.classList.remove('border-pink-200','bg-white');btn.classList.add('bg-rose-100','border-rose-400','text-rose-700','opacity-70');if(feedback){feedback.className='mt-2 rounded-xl bg-amber-50 border border-amber-200 px-3 py-2 text-xs font-extrabold text-amber-700';feedback.textContent='💡 Chưa đúng. Con thử lại một đáp án khác nhé.';}}}
function __legacyTa1_renderTa1LessonPage__1(p){
    const ph=p.phonics||{},voc=p.vocabulary||[],dialog=p.mini_dialogue||[];
    const words=(ph.words||[]).map(w=>`<button onclick="speakEnglish('${escapeJsStringTa1_(w)}',0.88)" class="lesson-chip hover:border-violet-400">${escapeHtml(w)} <span class="ml-1 text-[10px]">🔊</span></button>`).join('');
    const vocab=voc.map(v=>`<div class="rounded-xl bg-white border border-pink-100 px-3 py-2 font-black text-slate-700"><div class="flex items-start justify-between gap-2"><div>${escapeHtml(v.word||'')}<div class="text-[10px] font-bold text-slate-400 mt-0.5">${v.ipa?`/${escapeHtml(String(v.ipa).replace(/^\/+|\/+$/g,''))}/ · `:''}${escapeHtml(v.meaning||'')}</div></div><button onclick="speakEnglish('${escapeJsStringTa1_(v.word||'')}',0.88)" class="shrink-0 w-8 h-8 rounded-lg bg-pink-50 text-pink-600 border border-pink-100">🔊</button></div></div>`).join('');
    const dlgVi=p.mini_dialogue_vi||[];const dlg=dialog.map((x,i)=>`<div class="rounded-xl bg-purple-50 border border-purple-100 px-3 py-2 text-sm font-bold text-slate-700"><div class="flex items-start justify-between gap-2"><div>${escapeHtml(x)}${dlgVi[i]?`<div class="text-[10px] text-slate-400 mt-1">${escapeHtml(dlgVi[i])}</div>`:''}</div><button onclick="speakEnglish('${escapeJsStringTa1_(x)}',0.9)" class="shrink-0 w-8 h-8 rounded-lg bg-white text-purple-600 border border-purple-100">🔊</button></div></div>`).join('');
    return `<div class="space-y-3"><section class="rounded-3xl border-2 border-pink-200 bg-gradient-to-br from-pink-50 via-white to-purple-50 p-4"><div class="flex flex-col md:flex-row gap-4"><div class="md:w-[42%]">${p.image?`<img src="${escapeHtml(p.image)}" onerror="this.style.display='none'" class="w-full aspect-square object-cover rounded-2xl border border-pink-100 shadow-sm">`:''}<div class="mt-2 rounded-xl bg-white/80 border border-pink-100 px-3 py-2 text-[11px] font-extrabold text-slate-500">👀 Look · 🔊 Listen · 🗣️ Say<span class="block text-[9px] text-slate-400 mt-1">Nhìn · Nghe · Nói theo</span></div></div><div class="md:w-[58%] space-y-3"><div class="flex items-start justify-between gap-2"><div><p class="text-sm md:text-base font-bold text-slate-600 leading-6">${escapeHtml(p.intro||'')}</p>${p.intro_vi?`<p class="text-[10px] font-bold text-slate-400 mt-1">${escapeHtml(p.intro_vi)}</p>`:''}</div><button onclick="speakBaiHocTa1_()" class="shrink-0 px-3 py-2 rounded-xl bg-pink-500 text-white text-xs font-black">🔊 Listen<span class="block text-[9px] opacity-80">Nghe toàn bài</span></button></div><div class="rounded-2xl bg-white border border-violet-100 p-3"><div class="text-xs font-black text-violet-600 mb-2">1 · 🔤 PHONICS <span class="text-slate-400">Ngữ âm</span></div><div class="text-lg font-black text-violet-800">${escapeHtml(ph.letter||'')} · ${escapeHtml(ph.sound||'')}</div><div class="flex flex-wrap gap-2 mt-2">${words}</div></div><div class="rounded-2xl bg-white border border-fuchsia-100 p-3"><div class="text-xs font-black text-fuchsia-600 mb-2">2 · 📚 VOCABULARY <span class="text-slate-400">Từ vựng</span></div><div class="grid grid-cols-1 sm:grid-cols-3 gap-2">${vocab}</div></div></div></div></section><section class="rounded-2xl bg-gradient-to-br from-pink-50 to-violet-50 border border-fuchsia-200 p-4"><div class="flex items-start justify-between gap-3"><div><div class="text-xs font-black text-fuchsia-700 mb-1">3 · 💬 SENTENCE PATTERN<br><span class="text-[10px] text-slate-400">Mẫu câu</span></div><div class="text-lg md:text-xl font-black text-slate-800">${escapeHtml(p.sentence_pattern||'')}</div></div><button onclick="speakEnglish('${escapeJsStringTa1_(p.sentence_pattern||'')}',0.88)" class="shrink-0 px-3 py-2 rounded-xl bg-white text-fuchsia-700 border border-fuchsia-200 text-xs font-black">🔊 Listen<span class="block text-[9px]">Nghe</span></button></div></section>${dlg?`<section class="rounded-2xl bg-white border border-purple-100 p-4"><div class="font-black text-purple-700 mb-2">4 · 🐰 SPEAK WITH BUNNY<br><span class="text-[10px] text-slate-400">Nghe từng câu rồi nói theo</span></div><div class="space-y-2">${dlg}</div></section>`:''}</div>`;
}
function renderTa1QuestionsPage_(p){
    const items=(p.items||[]).map((it,i)=>{if(it.type==='choice'){const correct=Number(it.answer),correctText=(it.options||[])[correct]||'';const opts=(it.options||[]).map((o,j)=>`<button data-ta1-choice onclick="handleTa1PracticeChoice_(this,${j===correct},'${escapeJsStringTa1_(correctText)}')" class="text-left rounded-xl border border-pink-200 bg-white px-3 py-2.5 font-bold text-sm hover:border-fuchsia-300">${String.fromCharCode(65+j)}. ${escapeHtml(o)}</button>`).join('');return `<div data-ta1-practice-card class="rounded-2xl bg-pink-50/50 border border-pink-100 p-4"><div class="flex items-start gap-2 mb-2"><span class="w-6 h-6 shrink-0 rounded-full bg-pink-500 text-white flex items-center justify-center text-[11px] font-black">${i+1}</span><div class="font-black text-slate-800">${escapeHtml(it.prompt||'')}${it.prompt_vi?`<div class="text-[10px] text-slate-400 mt-1">${escapeHtml(it.prompt_vi)}</div>`:''}</div></div><div class="grid gap-2">${opts}</div><div data-ta1-practice-feedback class="hidden"></div></div>`;}const speakText=it.speak_text||it.tts_text||'';return `<div class="rounded-2xl bg-purple-50/60 border border-purple-100 p-4"><div class="flex items-start gap-2"><span class="w-6 h-6 shrink-0 rounded-full bg-purple-500 text-white flex items-center justify-center text-[11px] font-black">${i+1}</span><div class="font-black text-purple-700">🎙️ ${escapeHtml(it.prompt||'')}${it.prompt_vi?`<div class="text-[10px] text-slate-400 mt-1">${escapeHtml(it.prompt_vi)}</div>`:''}</div></div><div class="mt-3 rounded-xl bg-white border border-purple-100 px-3 py-2 text-sm font-extrabold text-slate-700">${escapeHtml(speakText)}</div><button onclick="speakEnglish('${escapeJsStringTa1_(speakText)}',0.88)" class="mt-2 px-3 py-1.5 rounded-lg bg-purple-100 text-purple-700 text-xs font-black">🔊 Hear model<span class="block text-[9px]">Nghe mẫu</span></button></div>`;}).join('');
    return `<div class="space-y-3"><div class="rounded-2xl bg-sky-50 border border-sky-100 p-3 text-sm font-bold text-slate-600"><div class="font-black text-sky-700 mb-1">🎯 Practice · Luyện tập</div>${escapeHtml(p.recall||'')}${p.recall_vi?`<div class="text-[10px] text-slate-400 mt-1">${escapeHtml(p.recall_vi)}</div>`:''}</div>${items}</div>`;
}
function renderTa1SummaryPage_(p,l){const pts=(p.key_points||[]).map(x=>`<li>${escapeHtml(x)}</li>`).join(''),lines=(p.practice_lines||[]).map(x=>`<div class="rounded-xl bg-white border border-pink-100 px-3 py-2 font-black text-slate-700 flex items-center justify-between gap-2"><span>${escapeHtml(x)}</span><button onclick="speakEnglish('${escapeJsStringTa1_(x)}',0.88)" class="shrink-0 w-8 h-8 rounded-lg bg-pink-50 text-pink-600 border border-pink-100">🔊</button></div>`).join(''),challenge=p.finish_prompt||'',challengeVi=p.finish_prompt_vi||'';return `<div class="space-y-3"><section class="rounded-3xl bg-gradient-to-br from-pink-50 via-fuchsia-50 to-violet-50 border-2 border-fuchsia-200 p-4"><div class="text-xs font-black text-fuchsia-600">1 · 🧠 RECALL · NHỚ LẠI</div><ul class="list-disc pl-5 mt-3 space-y-2 text-sm md:text-base text-slate-700 font-semibold leading-7">${pts}</ul></section><section class="rounded-2xl bg-white border border-pink-100 p-4"><div class="font-black text-pink-700 mb-2">2 · 🗣️ USE · CON NÓI LẠI</div><div class="grid gap-2">${lines}</div></section><section class="rounded-2xl bg-violet-50 border border-violet-200 p-4"><div class="text-xs font-black text-violet-600 mb-1">3 · ⭐ MINI CHALLENGE</div><div class="font-black text-violet-800">${escapeHtml(challenge)}</div>${challengeVi?`<div class="text-[11px] text-slate-500 font-extrabold mt-1">${escapeHtml(challengeVi)}</div>`:''}</section><button onclick="markBaiHocTa1Complete_(${l.bai})" class="w-full py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-black shadow-md">✅ Complete Lesson ${l.bai}<span class="block text-[10px] opacity-80">Hoàn thành Bài ${l.bai}</span></button></div>`;}
function renderTa1LessonBottom_(l,pageNo){const prev=pageNo>1?`<button onclick="openBaiHocTa1_(${l.bai},${pageNo-1})" class="px-4 py-2 rounded-xl bg-white border border-purple-200 text-purple-700 font-black text-xs">← Previous<span class="block text-[9px]">Trang trước</span></button>`:'<span></span>';const next=pageNo<3?`<button onclick="openBaiHocTa1_(${l.bai},${pageNo+1})" class="px-5 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-black text-xs">Next →<span class="block text-[9px] opacity-80">Trang tiếp</span></button>`:`<button onclick="openBaiHocTa1_(${l.bai},1)" class="px-4 py-2 rounded-xl bg-purple-50 border border-purple-200 text-purple-700 font-black text-xs">↺ Review<span class="block text-[9px]">Xem lại</span></button>`;return `<div class="flex items-center justify-between gap-3 pt-2">${prev}<div class="text-xs font-black text-slate-400">${pageNo}/3</div>${next}</div>`;}
function markBaiHocTa1Complete_(bai){const id=activeBaiHocContext?.lessonId;if(!id)return;const s=getBaiHocTa1CompletedSet_();s.add(`${id}_done`);saveBaiHocTa1CompletedSet_(s);alert(`✅ Bé đã hoàn thành Bài ${bai}!`);}
function speakBaiHocTa1_(){const data=lessonDataCache_,l=(data?.bai_hoc||[]).find(x=>Number(x.bai)===Number(activeBaiHocContext?.bai)),p=(l?.pages||[]).find(x=>Number(x.page_no)===1);if(!p)return;const ph=p.phonics||{};const text=[...(ph.words||[]),...(p.vocabulary||[]).map(v=>v.word),p.sentence_pattern,...(p.mini_dialogue||[])].filter(Boolean).join('. ');speakEnglish(text,0.88);}

// ----- BÀI TẬP: thay hoàn toàn roadmap 24 tuần bằng 16 bài song hành 16 Unit -----
function getBaiTapTa1UnlockKey_(){return `ta1_bai_tap_unlocked_v1_${String(currentUser?.maHS||'KHACH').toUpperCase()}`;}
function __legacyTa1_getUnlockedBaiTapTa1__1(){let local=1;try{local=Number(localStorage.getItem(getBaiTapTa1UnlockKey_())||1)||1;}catch(e){}const session=Number(currentUser?.baiTapHienTai||1)||1;return Math.max(1,Math.min(16,local,16),Math.min(16,session));}
function __legacyTa1_saveUnlockedBaiTapTa1__1(n){const v=Math.max(1,Math.min(16,Number(n)||1));try{localStorage.setItem(getBaiTapTa1UnlockKey_(),String(v));}catch(e){}if(currentUser)currentUser.baiTapHienTai=Math.max(Number(currentUser.baiTapHienTai||1),v);}
function getBaiTapTa1RecentKey_(bai){return `ta1_bt_recent_${String(currentUser?.maHS||'KHACH').toUpperCase()}_${bai}`;}
function getBaiTapTa1Recent_(bai){try{return JSON.parse(localStorage.getItem(getBaiTapTa1RecentKey_(bai))||'[]');}catch(e){return[];}}
function saveBaiTapTa1Recent_(bai,ids){try{localStorage.setItem(getBaiTapTa1RecentKey_(bai),JSON.stringify(ids.slice(-40)));}catch(e){}}
function questionSearchTextTa1_(q){return [q.question_text,q.answer,q.audio_text,q.reading_title,q.reading_passage,q.hint,...(q.options||[])].filter(Boolean).join(' ').toLowerCase();}
function matchesAnyTa1_(text,words){return (words||[]).some(k=>text.includes(String(k).toLowerCase()));}
function selectBalancedTa1_(pool,count){const by={};pool.forEach(q=>{const k=SKILL_KEYS.includes(String(q.skill_tag||'').toUpperCase())?String(q.skill_tag).toUpperCase():'ENG_VOC';(by[k]||=[]).push(q);});Object.keys(by).forEach(k=>by[k]=shuffleArray(by[k]));const out=[],used=new Set();let progressed=true;while(out.length<count&&progressed){progressed=false;for(const k of SKILL_KEYS){const a=by[k]||[];while(a.length&&used.has(a[0].question_id))a.shift();if(a.length&&out.length<count){const q=a.shift();used.add(q.question_id);out.push(q);progressed=true;}}}for(const q of shuffleArray(pool)){if(out.length>=count)break;if(!used.has(q.question_id)){used.add(q.question_id);out.push(q);}}return shuffleArray(out.slice(0,count));}
function __legacyTa1_getQuestionsForBaiTapTa1__1(bt){const all=allQuestionsFlatCache||[];if(!bt||!all.length)return[];const recent=new Set(getBaiTapTa1Recent_(bt.bai));const primary=all.filter(q=>matchesAnyTa1_(questionSearchTextTa1_(q),bt.keywords)),extended=all.filter(q=>!primary.includes(q)&&matchesAnyTa1_(questionSearchTextTa1_(q),bt.extended_keywords));let candidate=[...shuffleArray(primary),...shuffleArray(extended)].filter(q=>!recent.has(q.question_id));const target=Math.min(Number(bt.candidate_pool_target)||30,primary.length+extended.length);candidate=candidate.slice(0,target);if(candidate.length<Math.min(20,primary.length+extended.length))candidate=[...shuffleArray(primary),...shuffleArray(extended)].slice(0,target);const chosen=selectBalancedTa1_(candidate,Math.min(Number(bt.draw_count)||20,candidate.length));saveBaiTapTa1Recent_(bt.bai,chosen.map(q=>q.question_id));return chosen;}
async function __legacyTa1_openRoadmap_2(semesterNumber=1){
    stopSpeaking();if(!requirePremiumAccess('Exercises / Bài tập'))return;setMainTabActive_('exercises');inMiniGameFlow=false;inLessonFlow=false;activeExamContext=null;activeRoadmapContext=null;activeTopicId=null;pendingTopicQuiz=null;updateNavTabs('Exercises / Bài tập','✏️',null);switchAppView('view-roadmap');showLoadingOverlay('Đang mở Bài tập...');
    try{const data=await loadLessonData_();renderBaiTapTa1Grid_(data,semesterNumber);}catch(err){alert(`Không thể mở Bài tập: ${err.message}`);}finally{hideLoadingOverlay();}
}
function __legacyTa1_renderBaiTapTa1Grid__1(data,semester){const host=document.getElementById('roadmap-svg-container'),tabs=document.getElementById('bai-tap-semester-tabs');if(!host)return;const arr=(data.bai_tap||[]).filter(x=>Number(x.semester)===Number(semester)),unlocked=getUnlockedBaiTapTa1_();if(tabs)tabs.innerHTML=[1,2].map(s=>`<button onclick="openRoadmap(${s})" class="semester-switch-btn ${Number(s)===Number(semester)?'is-active':'is-inactive'}"><span class="block">Semester ${s}</span><span class="block text-[9px] opacity-75">Học kỳ ${s}</span></button>`).join('');host.innerHTML=`<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">${arr.map((bt,idx)=>{const open=Number(bt.bai)<=unlocked;return `<button onclick="${open?`selectBaiTapTa1_(${bt.bai})`:`showLockedBaiTapTa1_(${bt.bai})`}" class="relative text-left min-h-[105px] rounded-2xl border-2 p-3 ${open?(idx%2?'bg-purple-50 border-purple-200 hover:border-purple-400':'bg-pink-50 border-pink-200 hover:border-pink-400'):'bg-slate-50 border-slate-200 opacity-60'} hover:shadow-md transition-shadow"><div class="flex justify-between"><span class="font-black ${open?'text-purple-700':'text-slate-500'}">Exercise ${bt.bai}<span class="block text-[9px] text-slate-400">Bài tập ${bt.bai}</span></span><span>${open?'':'🔒'}</span></div><div class="text-[12px] md:text-[13px] font-bold text-slate-600 mt-1 line-clamp-2">${escapeHtml(bt.title||'')}</div><div class="text-[11px] font-extrabold text-slate-400 mt-1 line-clamp-1">${escapeHtml(bt.title_vi||'')}</div><div class="text-[10px] mt-2 ${open?'text-fuchsia-600':'text-slate-400'} font-black">${open?'20 questions · 6 skills<br><span class="text-[9px] text-slate-400">20 câu · 6 năng lực</span>':'Score ≥80% to unlock<br><span class="text-[9px] text-slate-400">Cần ≥80% bài trước</span>'}</div></button>`}).join('')}</div>`;}
function showLockedBaiTapTa1_(bai){alert(`🔒 Bài tập ${bai} chưa mở. Bé cần đạt từ 80% ở Bài tập trước để mở khóa nhé!`);}
async function __legacyTa1_selectBaiTapTa1__1(bai){stopSpeaking();showLoadingOverlay(`Đang chuẩn bị Bài tập ${bai}...`);try{const data=await loadLessonData_(),bt=(data.bai_tap||[]).find(x=>Number(x.bai)===Number(bai));if(!bt)throw new Error('Không tìm thấy Bài tập');if(Number(bai)>getUnlockedBaiTapTa1_()){showLockedBaiTapTa1_(bai);return;}await fetchAllQuestionsFlat();const qs=getQuestionsForBaiTapTa1_(bt);if(qs.length<10)throw new Error('Kho câu hỏi phù hợp Unit này chưa đủ dữ liệu để tạo lượt luyện ổn định');activeRoadmapContext={week:Number(bai),bai:Number(bai),topicId:`TA1_BT${String(bai).padStart(2,'0')}`,chuDe:`Bài tập ${bai} · ${bt.title||''}`};pendingTopicQuiz=null;activeExamContext=null;updateNavTabs('Exercises / Bài tập','✏️',`Exercise ${bai} / Bài ${bai}`,bt.title||'');startTopicQuiz(bai,activeRoadmapContext.chuDe,qs,null);}catch(err){alert(`Không thể mở Bài tập: ${err.message}`);}finally{hideLoadingOverlay();}}
async function __legacyTa1_saveWeeklyProgressToSheet_2(percent,starCount,scoreVal){
    const bai=Number(activeRoadmapContext?.bai??activeRoadmapContext?.week??1),chuDe=activeRoadmapContext?.chuDe||`Bài tập ${bai}`,thoiGianLamBai=quizStartTime?formatDuration(Date.now()-quizStartTime):'',scoreThang10=(scoreVal??((score/activeQuestionsList.length)*10)).toFixed(1),skillCorrect={},skillTotal={};SKILL_KEYS.forEach(k=>{skillCorrect[k]=0;skillTotal[k]=0});quizAnsweredLog.forEach(item=>{let k=String(item.skill_tag||'ENG_VOC').toUpperCase();if(!SKILL_KEYS.includes(k))k='ENG_VOC';skillTotal[k]++;if(item.isCorrect)skillCorrect[k]++;});
    const payload={student_id:currentUser.maHS,maHS:currentUser.maHS,token:currentUser.token,hoTen:currentUser.hoTen,lop:currentUser.lop,sheetName:'LichSuTienTrinhTuan',week_completed:bai,tuan:bai,baiTap:bai,chuDe,topicId:activeRoadmapContext?.topicId||`TA1_BT${String(bai).padStart(2,'0')}`,score:scoreThang10,stars_earned:starCount,tongCauHoi:activeQuestionsList.length,soCauDung:quizAnsweredLog.filter(x=>x.isCorrect).length,percent,thoiGianLamBai,wrongQuestions:quizWrongAnswers};Object.keys(SKILL_TAXONOMY).forEach(k=>{payload[SKILL_TAXONOMY[k].sheetCol]=skillCorrect[k];payload[SKILL_TAXONOMY[k].totalCol]=skillTotal[k];});
    let next=null;if(percent>=80&&bai<16){next=bai+1;saveUnlockedBaiTapTa1_(next);}try{await callAppsScript('saveWeeklyProgress',payload);}catch(e){console.warn('[Bài tập] Lỗi lưu tiến trình:',e);}if(next)setTimeout(()=>alert(`🎉 Chúc mừng bé đạt ${percent}%! Bài tập ${next} đã được mở khóa.`),500);
}
function handleNextExamFromReport(){stopSpeaking();if(activeRoadmapContext){const sem=Number(activeRoadmapContext.bai||activeRoadmapContext.week)>8?2:1;activeRoadmapContext=null;openRoadmap(sem);}else if(activeExamContext){activeExamContext=null;openExamHub();}else goHome();}
function returnToTopicLecture(){stopSpeaking();clearInterval(quizTimerInterval);if(inLessonFlow){openBaiHocHub(activeBaiHocContext?.semester||1);return;}if(activeExamContext){openExamHub();return;}if(activeRoadmapContext){openRoadmap(Number(activeRoadmapContext?.bai||activeRoadmapContext?.week)>8?2:1);return;}if(pendingTopicQuiz){showLectureAndSubtopics(pendingTopicQuiz.topicNum,pendingTopicQuiz.topicName,{questions:pendingTopicQuiz.questions});return;}if(inAlphaIpaFlow){openAlphabetIPA();return;}if(inMiniGameFlow){openMiniGameHub();return;}goHome();}


// Standalone auto-login removed; Class 1 shell owns authentication.



// ============================================================================
// CLASS 1 ENGLISH MODULE ADAPTER — shell/backend/data integration
// ============================================================================
const CLASS1_ENGLISH_DATA_ROOT_ = 'assets/data/english/';
const CLASS1_ENGLISH_FILES_ = Object.freeze({
  discover1: CLASS1_ENGLISH_DATA_ROOT_ + 'kham_pha_tieng_anh_1_part1.json',
  discover2: CLASS1_ENGLISH_DATA_ROOT_ + 'kham_pha_tieng_anh_1_part2.json',
  lessons: CLASS1_ENGLISH_DATA_ROOT_ + 'bai_hoc_tieng_anh_1.json',
  exercises1: CLASS1_ENGLISH_DATA_ROOT_ + 'bai_tap_tieng_anh_1_hk1.json',
  exercises2: CLASS1_ENGLISH_DATA_ROOT_ + 'bai_tap_tieng_anh_1_hk2.json',
  review: CLASS1_ENGLISH_DATA_ROOT_ + 'on_tap_tieng_anh_1.json',
  exams: CLASS1_ENGLISH_DATA_ROOT_ + 'de_thi_tieng_anh_1.json',
  catalog: 'assets/data/shared_image_catalog.json'
});

let englishModuleCtx_ = null;
let englishModuleRoot_ = null;
let englishModuleMounted_ = false;
let englishModuleDestroyed_ = false;
let englishModuleAudioPrimed_ = false;
let englishModuleLastTab_ = '';
let englishBridgePrevious_ = new Map();
let englishGameGlobalPrevious_ = new Map();
let englishGameScriptElements_ = [];
const ENGLISH_GAME_GLOBAL_NAMES_ = ["aafBuildBalancedPool", "aafChoose", "aafEnsureStyles", "aafEsc", "aafExtractPhrase", "aafFinish", "aafNextItem", "aafRenderRound", "aafRenderStart", "aafShowHint", "aafSparks", "aafSpeak", "aafStartLevel", "aafUpdateTimer", "arAnimateCars", "arBuildBalancedPool", "arChoose", "arEnsureStyles", "arEsc", "arExtractSentence", "arFinish", "arFormatTime", "arGetOptions", "arNextRound", "arRenderRound", "arRenderStart", "arRenderTrack", "arShowHint", "arSpeakSentence", "arStartLevel", "arUpdateTimer", "arVerbIcon", "arWordCount", "bgoCellHtml", "bgoChooseCell", "bgoChooseTopic", "bgoCountLines", "bgoEscapeHtml", "bgoFinish", "bgoNextCall", "bgoRenderBoard", "bgoRenderTopicScreen", "bgoReplayCall", "bgoStartWithDifficulty", "bgoUpdateTimer", "fdBuildBalancedPool", "fdBurstClues", "fdChoose", "fdEnsureStyles", "fdEsc", "fdExtractSentence", "fdExtractVietnameseState", "fdFinish", "fdGetOptions", "fdNextCase", "fdRenderCase", "fdRenderEvidenceBoard", "fdRenderHintButtonOnly", "fdRenderStart", "fdShowHint", "fdSpeakSentence", "fdStartLevel", "fdUpdateTimer", "fgBuildRound", "fgChooseTopic", "fgFinishGame", "fgHandleFishClick", "fgInjectSwimStyleOnce", "fgNextRound", "fgRenderPondDecorations", "fgRenderRound", "fgRenderTopicScreen", "fgStartWithDifficulty", "fgToggleRules", "fgUpdateTimerDisplay", "getFishingVocabPool", "grvBuildOptions", "grvChoose", "grvEnsureStyles", "grvEsc", "grvExtractSentence", "grvFilledSentence", "grvFinish", "grvHighlightBlank", "grvJs", "grvNextRound", "grvRenderRound", "grvRenderStart", "grvShowHint", "grvSpeakSentence", "grvStartLevel", "grvUpdateTimer", "qbrBuildOptions", "qbrChoose", "qbrCountBySection", "qbrEnsureStyles", "qbrEsc", "qbrExtractDialogue", "qbrFillBlank", "qbrFinish", "qbrFormatClock", "qbrFormatTime", "qbrNextRound", "qbrRenderHintCountOnly", "qbrRenderRound", "qbrRenderStart", "qbrShowHint", "qbrSpeakCompletedDialogue", "qbrSpeakQuestion", "qbrSplitDialogue", "qbrStartLevel", "qbrUpdateTimer", "renderFishingDifficultyScreen", "renderFishingPlayShell", "renderWordSearchDifficultyScreen", "renderWordSearchUI", "sdocBuildTokens", "sdocCure", "sdocDiagnose", "sdocEnsureStyles", "sdocEsc", "sdocExtractSentence", "sdocFinish", "sdocNextCase", "sdocRenderCase", "sdocRenderCureStage", "sdocRenderStart", "sdocRenderTokenSentence", "sdocShowHealEffect", "sdocShowHint", "sdocSpeakPatient", "sdocStartLevel", "sdocUpdateTimer", "sdocWordCount", "startAOrAnFactoryGame", "startActionRaceGame", "startBingoGame", "startFeelingDetectiveGame", "startFishingGame", "startGrammarRiverGame", "startQABridgeGame", "startSentenceDoctorGame", "startSentenceTrainGame", "startTeacherSaysGame", "startWordScrambleGame", "startWordSearchGame", "stnCheck", "stnChoose", "stnEnsureStyles", "stnEsc", "stnFinish", "stnHint", "stnNextRound", "stnRemoveChosen", "stnRenderRound", "stnRenderStart", "stnRenderTiles", "stnReset", "stnStartLevel", "stnUndo", "stnUpdateTimer", "stnWords", "tsBuildChoices", "tsChooseAction", "tsChooseFreeze", "tsCorrectRound", "tsEnsureStyles", "tsEsc", "tsFinish", "tsHopStudent", "tsNextRound", "tsRenderRound", "tsRenderStart", "tsShakeStudent", "tsSpeakPrompt", "tsStars", "tsStartLevel", "tsUpdateTimer", "wsBindEvents", "wsCellKey", "wsCheckMatch", "wsChooseTopic", "wsClearTempHighlight", "wsFinishGame", "wsGenerateAndRender", "wsGetCellFromPoint", "wsHighlightPath", "wsMarkFound", "wsPathBetween", "wsRenderTopicScreen", "wsStartWithDifficulty", "wsToggleRules", "wsTryPlaceWord", "wsUpdateTimerDisplay", "wsUseHint", "wscBackspace", "wscCheckAnswer", "wscChooseTopic", "wscCurrentAnswer", "wscDisableRoundButtons", "wscEscapeHtml", "wscEscapeRegExp", "wscFinish", "wscNextRound", "wscPickLetter", "wscPickNextItem", "wscRenderRound", "wscRenderTopicScreen", "wscResetAnswer", "wscScrambleWord", "wscStartWithDifficulty", "wscUpdateAnswerUI", "wscUpdateTimer", "wscUseHint"];
const ENGLISH_GAME_STYLE_IDS_ = ["aaf-style", "action-race-style", "feeling-detective-style", "fg-swim-style", "grammar-river-style", "qa-bridge-style", "sentence-doctor-style", "sentence-train-style", "teacher-says-style"];
let englishCatalog_ = null;
let englishLessonData_ = null;
let englishExerciseData_ = {1:null,2:null};
let englishReviewData_ = null;
let englishTtsNonce_ = 0;
let englishActiveGameId_ = '';
let headerLevel3ClickHandler = null;
let activeAssessmentAttemptId_ = '';
let class1EnglishExerciseUnlocked_ = 1;
let class1EnglishProgressLoaded_ = false;
let class1EnglishBestPercent_ = {};
const ENGLISH_MODULE_RUNTIME_ID_ = 'class1-english-runtime';
const ENGLISH_MODULE_STYLE_ID_ = 'class1-english-standalone-style';

function class1EnglishApi_(action,payload={},options={}){
  if(!englishModuleCtx_?.apiRequest) return Promise.reject(new Error('CLASS1_API_MISSING'));
  return englishModuleCtx_.apiRequest(action,payload,options);
}
function class1EnglishUser_(){
  const shared=englishModuleCtx_?.user||null;
  const userId=shared?.userId?String(shared.userId).toUpperCase():'KHACH';
  const name=shared?.name?String(shared.name):(userId==='KHACH'?'Khách':'Bé');
  const role=String(shared?.role||'student').toLowerCase()==='admin'?'admin':'student';
  const access=String(englishModuleCtx_?.accessType||'regular').toLowerCase();
  return {name,hoTen:name,maHS:userId,role,vaiTro:role,loaiTaiKhoan:access,isGuest:!shared||!userId||userId==='KHACH'};
}
function syncClass1EnglishState_(){
  const oldId=String(currentUser?.maHS||'');
  currentUser=class1EnglishUser_();
  if(oldId!==String(currentUser?.maHS||'')){
    class1EnglishProgressLoaded_=false; class1EnglishExerciseUnlocked_=getLocalEnglishExerciseProgress_(); class1EnglishBestPercent_={};
  }
  try{refreshMainTabLocks_();}catch(_){}
}
function ensureFriendlyDialog_(){
  let modal=document.getElementById('modal-friendly-dialog'); if(modal)return modal;
  modal=document.createElement('div'); modal.id='modal-friendly-dialog'; modal.className='hidden fixed inset-0 z-[220] bg-slate-900/45 backdrop-blur-sm items-center justify-center p-4';
  modal.innerHTML=`<div class="w-full max-w-md overflow-hidden rounded-[30px] border-4 border-pink-200 bg-white shadow-2xl"><div class="bg-gradient-to-br from-pink-50 via-fuchsia-50 to-purple-50 px-5 pt-5 pb-4 text-center"><div id="friendly-dialog-icon" class="text-6xl mb-1">🐰</div><h3 id="friendly-dialog-title" class="text-lg md:text-xl font-black text-purple-700">Cô Thỏ Hồng nhắn bé</h3><p id="friendly-dialog-message" class="mt-2 text-sm md:text-base font-bold text-slate-600 leading-relaxed whitespace-pre-line"></p></div><div id="friendly-dialog-actions" class="p-4 flex flex-col sm:flex-row gap-2 justify-center bg-white"></div></div>`;
  modal.addEventListener('click',event=>{if(event.target===modal&&!friendlyDialogConfirmAction_)closeFriendlyDialog_();});
  (englishModuleRoot_||englishModuleCtx_?.host||document.body).appendChild(modal); return modal;
}
function showLoadingOverlay(msg){
  let overlay=document.getElementById('loading-overlay');
  if(!overlay){overlay=document.createElement('div');overlay.id='loading-overlay';overlay.className='fixed inset-0 bg-black/30 flex items-center justify-center z-50';overlay.innerHTML='<div class="bg-white px-6 py-4 rounded-2xl shadow-xl font-extrabold text-pink-600 flex items-center space-x-3"><i class="fa-solid fa-spinner fa-spin"></i><span id="loading-overlay-text"></span></div>';(englishModuleRoot_||englishModuleCtx_?.host||document.body).appendChild(overlay);}
  const text=document.getElementById('loading-overlay-text');if(text)text.textContent=String(msg||'Đang…');overlay.classList.remove('hidden');
}
function hideLoadingOverlay(){document.getElementById('loading-overlay')?.classList.add('hidden');}
function isAdminUser(){ return String(englishModuleCtx_?.user?.role||'').toLowerCase()==='admin'; }
function hasPremiumAccess(){ if(isAdminUser())return true; return ['trial','vip'].includes(String(englishModuleCtx_?.accessType||'regular').toLowerCase()); }
function showPremiumAccessWarning(featureName='khu vực này'){
  if(!englishModuleCtx_) return;
  if(!englishModuleCtx_.isAuthenticated){
    englishModuleCtx_.hooks?.showDialog?.({title:'Cần đăng nhập',message:`${featureName} dành cho tài khoản Trial hoặc VIP. Khám phá vẫn học miễn phí.`,icon:'🔐'});
    englishModuleCtx_.openAuth?.('login');
  }else{
    englishModuleCtx_.hooks?.showDialog?.({title:'Nội dung Premium',message:`${featureName} cần quyền Trial hoặc VIP của môn Tiếng Anh.`,icon:'🔒'});
  }
}
function requirePremiumAccess(featureName){ if(hasPremiumAccess())return true; showPremiumAccessWarning(featureName); return false; }
function openAuthScreen(tab='login'){ englishModuleCtx_?.openAuth?.(tab==='register'?'register':'login'); }
function getStoredSessionToken(){ return ''; }
async function callAppsScript(action,payload={}){
  // Legacy actions are deliberately not forwarded with client-declared identity/score.
  if(action==='getHistory') return {history:await fetchClass1EnglishHistoryByLegacySheet_(payload?.sheetName||'LichSuTienTrinhTuan')};
  throw Object.assign(new Error('LEGACY_PRIVATE_ACTION_DISABLED'),{code:'LEGACY_PRIVATE_ACTION_DISABLED'});
}

async function fetchJsonEnglish_(url){
  const res=await fetch(url,{cache:'no-store'}); if(!res.ok)throw new Error(`Không thể tải dữ liệu: ${url}`); return res.json();
}

async function loadSharedImageCatalog_(){
  if(englishCatalog_)return englishCatalog_;
  try{englishCatalog_=await fetchJsonEnglish_(CLASS1_ENGLISH_FILES_.catalog);}catch(_){englishCatalog_={images:{}};}
  return englishCatalog_;
}
function catalogImage_(id){return englishCatalog_?.images?.[id]||null;}
function catalogSrc_(id){return catalogImage_(id)?.src||'';}
function englishWordCardVisual_(item,boxClass='w-16 h-16 mb-1'){
  const iid=String(item?.imageId||item?.image_id||'').trim();
  const src=iid?catalogSrc_(iid):'';
  if(src)return `<img src="${escapeHtml(src)}" alt="${escapeHtml(item?.en||item?.word||item?.vi||'Vocabulary')}" class="${boxClass} rounded-xl object-cover border border-emerald-100 bg-white" onerror="this.style.display='none'">`;
  return `<div class="${boxClass} flex items-center justify-center text-3xl">${item?.emoji||'✨'}</div>`;
}
const ENGLISH_SAFE_IMAGE_ALIASES_=Object.freeze({
  'blue_ball.png':'do_vat_ball','ball.png':'do_vat_ball','school_bag.png':'do_vat_bag','bag.png':'do_vat_bag',
  'toy_car.png':'family_03_front_yard_car','happy_mother.png':'family_01_dinner','happy_father.png':'family_03_front_yard_car',
  'little_brother.png':'family_11_cycling_yard','little_sister.png':'family_11_cycling_yard','cute_house.png':'family_30_full_family_portrait',
  'story_book.png':'ban_hoc'
});
function resolveEnglishImage_(candidate,imageId=''){
  if(imageId&&catalogSrc_(imageId))return catalogSrc_(imageId);
  const raw=String(candidate||'').trim(); if(!raw)return '';
  if(catalogSrc_(raw))return catalogSrc_(raw);
  const base=raw.split('/').pop().toLowerCase();
  const alias=ENGLISH_SAFE_IMAGE_ALIASES_[base]; if(alias&&catalogSrc_(alias))return catalogSrc_(alias);
  const hit=Object.values(englishCatalog_?.images||{}).find(x=>String(x?.src||'').split('/').pop().toLowerCase()===base);
  return hit?.src||'';
}
const ENGLISH_LESSON_SCENE_=Object.freeze({1:'san_truong',2:'family_01_dinner',3:'quay_trai_cay_ro_rang',4:'phong_ngu',5:'noi_chon_fish_and_chip_shop',6:'noi_chon_classroom_clean',7:'vuon_nha',8:'cong_vien',9:'cua_hang_tap_hoa',10:'noi_chon_zoo',11:'traffic_09_bus_stop',12:'cay_lieu_ben_ho',13:'noi_chon_school_canteen',14:'mall_14_toy_store',15:'san_bong_tre_em',16:'noi_chon_washing_window'});
function lessonSceneSrc_(lesson){return catalogSrc_(ENGLISH_LESSON_SCENE_[Number(lesson?.bai||lesson?.source_unit)])||'';}
const ENGLISH_VOCAB_VISUAL_=Object.freeze({
  'ball':{imageId:'do_vat_ball'},'bike':{imageId:'family_11_cycling_yard'},'book':{imageId:'ban_hoc'},
  'cake':{imageId:'tiem_banh'},'car':{imageId:'family_03_front_yard_car'},'cat':{imageId:'family_08_pet_feeding'},'cup':{imageId:'do_vat_cup'},
  'apple':{imageId:'quay_trai_cay_ro_rang'},'bag':{imageId:'do_vat_bag'},'can':{imageId:'do_vat_can'},'hat':{imageId:'do_vat_hat'},
  'desk':{imageId:'ban_hoc'},'dog':{imageId:'family_08_pet_feeding'},'door':{emoji:'🚪'},'duck':{emoji:'🦆'},
  'chicken':{imageId:'do_an_chicken'},'chips':{emoji:'🍟'},'fish':{imageId:'do_an_fish_food'},'milk':{imageId:'family_27_breakfast_kitchen'},
  'bell':{emoji:'🔔'},'pen':{emoji:'🖊️'},'pencil':{imageId:'ban_hoc'},'red':{color:'#ef4444'},
  'garden':{imageId:'vuon_nha'},'gate':{imageId:'noi_chon_gate'},'girl':{emoji:'👧'},'goat':{emoji:'🐐'},
  'hair':{imageId:'co_the_hair'},'hand':{emoji:'✋'},'head':{imageId:'co_the_head'},'horse':{emoji:'🐴'},
  'clocks':{emoji:'🕒'},'locks':{emoji:'🔒'},'mops':{imageId:'gia_dung_mop'},'pots':{imageId:'gia_dung_pot'},
  'mango':{emoji:'🥭'},'monkey':{emoji:'🐒'},'mother':{imageId:'family_01_dinner'},'mouse':{emoji:'🐭'},
  'bus':{imageId:'traffic_09_bus_stop'},'run':{imageId:'family_18_dog_fetch'},'truck':{emoji:'🚚'},
  'lake':{imageId:'cay_lieu_ben_ho'},'leaf':{emoji:'🍃'},'lemons':{emoji:'🍋'},
  'bananas':{imageId:'sieu_thi'},'noodles':{emoji:'🍜'},'nuts':{emoji:'🥜'},
  'teddy bear':{imageId:'family_20_sleeping_toddler'},'tiger':{emoji:'🐯'},'top':{imageId:'do_choi_spinning_top'},'turtle':{emoji:'🐢'},
  'face':{imageId:'co_the_face'},'father':{imageId:'family_03_front_yard_car'},'foot':{emoji:'🦶'},'football':{imageId:'san_bong_tre_em'},
  'wash':{imageId:'noi_chon_washing_window'},'water':{imageId:'do_an_water'},'window':{imageId:'ba_chau_ben_cua_so'}
});
function englishVocabVisualHtml_(word,meaning='',explicitImageId=''){
  const explicit=String(explicitImageId||'').trim();
  if(explicit){const src=catalogSrc_(explicit);if(src)return `<img src="${escapeHtml(src)}" alt="${escapeHtml(word||meaning||'Vocabulary')}" class="w-16 h-16 rounded-xl object-cover border border-pink-100 bg-white shrink-0" onerror="this.style.display='none'">`;}
  const key=String(word||'').trim().toLowerCase(),v=ENGLISH_VOCAB_VISUAL_[key]; if(!v)return '';
  if(v.imageId){const src=catalogSrc_(v.imageId);if(src)return `<img src="${escapeHtml(src)}" alt="${escapeHtml(word||meaning||'Vocabulary')}" class="w-16 h-16 rounded-xl object-cover border border-pink-100 bg-white shrink-0" onerror="this.style.display='none'">`;}
  if(v.emoji)return `<span class="w-16 h-16 rounded-xl border border-pink-100 bg-pink-50 flex items-center justify-center text-4xl shrink-0" aria-hidden="true">${v.emoji}</span>`;
  if(v.color)return `<span class="w-16 h-16 rounded-xl border border-pink-100 bg-white flex items-center justify-center shrink-0"><span class="w-10 h-10 rounded-full border border-slate-200" style="background:${v.color}"></span></span>`;
  return '';
}
function renderTa1LessonPage_(p){
  const ph=p.phonics||{},voc=p.vocabulary||[],dialog=p.mini_dialogue||[];
  const words=(ph.words||[]).map(w=>`<button onclick="speakEnglish('${escapeJsStringTa1_(w)}',0.88)" class="lesson-chip hover:border-violet-400">${escapeHtml(w)} <span class="ml-1 text-[10px]">🔊</span></button>`).join('');
  const vocab=voc.map(v=>{const visual=englishVocabVisualHtml_(v.word,v.meaning,v.imageId||v.image_id||'');return `<div class="rounded-xl bg-white border border-pink-100 px-3 py-2 font-black text-slate-700"><div class="flex items-center gap-2.5">${visual}<div class="min-w-0 flex-1"><div class="flex items-start justify-between gap-2"><div class="min-w-0"><div class="text-base leading-tight">${escapeHtml(v.word||'')}</div><div class="text-[10px] font-bold text-slate-400 mt-1">${v.ipa?`/${escapeHtml(String(v.ipa).replace(/^\/+|\/+$/g,''))}/ · `:''}${escapeHtml(v.meaning||'')}</div></div><button onclick="speakEnglish('${escapeJsStringTa1_(v.word||'')}',0.88)" class="shrink-0 w-8 h-8 rounded-lg bg-pink-50 text-pink-600 border border-pink-100">🔊</button></div></div></div></div>`;}).join('');
  const dlgVi=p.mini_dialogue_vi||[];const dlg=dialog.map((x,i)=>`<div class="rounded-xl bg-purple-50 border border-purple-100 px-3 py-2 text-sm font-bold text-slate-700"><div class="flex items-start justify-between gap-2"><div>${escapeHtml(x)}${dlgVi[i]?`<div class="text-[10px] text-slate-400 mt-1">${escapeHtml(dlgVi[i])}</div>`:''}</div><button onclick="speakEnglish('${escapeJsStringTa1_(x)}',0.9)" class="shrink-0 w-8 h-8 rounded-lg bg-white text-purple-600 border border-purple-100">🔊</button></div></div>`).join('');
  return `<div class="space-y-3"><section class="rounded-3xl border-2 border-pink-200 bg-gradient-to-br from-pink-50 via-white to-purple-50 p-4"><div class="flex flex-col md:flex-row gap-4"><div class="md:w-[42%]">${p.image?`<img src="${escapeHtml(p.image)}" onerror="this.style.display='none'" class="w-full aspect-square object-cover rounded-2xl border border-pink-100 shadow-sm">`:''}<div class="mt-2 rounded-xl bg-white/80 border border-pink-100 px-3 py-2 text-[11px] font-extrabold text-slate-500">👀 Look · 🔊 Listen · 🗣️ Say<span class="block text-[9px] text-slate-400 mt-1">Nhìn · Nghe · Nói theo</span></div></div><div class="md:w-[58%] space-y-3"><div class="flex items-start justify-between gap-2"><div><p class="text-sm md:text-base font-bold text-slate-600 leading-6">${escapeHtml(p.intro||'')}</p>${p.intro_vi?`<p class="text-[10px] font-bold text-slate-400 mt-1">${escapeHtml(p.intro_vi)}</p>`:''}</div><button onclick="speakBaiHocTa1_()" class="shrink-0 px-3 py-2 rounded-xl bg-pink-500 text-white text-xs font-black">🔊 Listen<span class="block text-[9px] opacity-80">Nghe toàn bài</span></button></div><div class="rounded-2xl bg-white border border-violet-100 p-3"><div class="text-xs font-black text-violet-600 mb-2">1 · 🔤 PHONICS <span class="text-slate-400">Ngữ âm</span></div><div class="text-lg font-black text-violet-800">${escapeHtml(ph.letter||'')} · ${escapeHtml(ph.sound||'')}</div><div class="flex flex-wrap gap-2 mt-2">${words}</div></div><div class="rounded-2xl bg-white border border-fuchsia-100 p-3"><div class="text-xs font-black text-fuchsia-600 mb-2">2 · 📚 VOCABULARY <span class="text-slate-400">Từ vựng</span></div><div class="grid grid-cols-1 sm:grid-cols-2 gap-2">${vocab}</div></div></div></div></section><section class="rounded-2xl bg-gradient-to-br from-pink-50 to-violet-50 border border-fuchsia-200 p-4"><div class="flex items-start justify-between gap-3"><div><div class="text-xs font-black text-fuchsia-700 mb-1">3 · 💬 SENTENCE PATTERN<br><span class="text-[10px] text-slate-400">Mẫu câu</span></div><div class="text-lg md:text-xl font-black text-slate-800">${escapeHtml(p.sentence_pattern||'')}</div></div><button onclick="speakEnglish('${escapeJsStringTa1_(p.sentence_pattern||'')}',0.88)" class="shrink-0 px-3 py-2 rounded-xl bg-white text-fuchsia-700 border border-fuchsia-200 text-xs font-black">🔊 Listen<span class="block text-[9px]">Nghe</span></button></div></section>${dlg?`<section class="rounded-2xl bg-white border border-purple-100 p-4"><div class="font-black text-purple-700 mb-2">4 · 🐰 SPEAK WITH BUNNY<br><span class="text-[10px] text-slate-400">Nghe từng câu rồi nói theo</span></div><div class="space-y-2">${dlg}</div></section>`:''}</div>`;
}

function normalizeQuestion(q){
  if(!q)return null;
  const rawImage=q.imageId||q.image_id||q.img||q.image_url||'';
  return {
    question_id:q.id??q.question_id??q.question_no??0,
    unit_id:Number(q.unit_id??q.source_unit??q.unit??0)||0,
    exercise_id:String(q.exercise_id??'').trim(),
    source_unit:Number(q.source_unit??q.unit_id??q.unit??0)||0,
    question_type:String(q.question_type??q.type??'choice').trim(),
    sub_topic:String(q.sub_code??q.sub??q.sub_topic??'Câu hỏi chung').trim(),
    sub_topic_label:String(q.sub_label??q.sub_name??q.sub??q.sub_code??q.sub_topic??'Câu hỏi chung').trim(),
    week:q.week??q.w??null, paired_group:q.pg??q.paired_group??'', content_topic:String(q.topic??q.content_topic??'').trim(),
    options_ipa:q.o_ipa??q.options_ipa??q.oipa??null,
    question_text:q.q??q.question_text??'', options:Array.isArray(q.o)?q.o:(Array.isArray(q.options)?q.options:[]),
    answer:q.a??q.answer??'', hint:q.h??q.hint??'', image_url:resolveEnglishImage_(rawImage,q.imageId||q.image_id||''),
    emoji:q.emo??q.emoji??'', audio_text:q.aud??q.audio_text??'', reading_title:q.r_title??q.reading_title??'',
    reading_passage:q.r_passage??q.reading_passage??q.passage_text??'', skill_tag:q.skill_tag??q.competency??q.tag??'ENG_VOC',
    diem:Number(q.diem??q.score??q.points??0.5), explanation:q.explanation??q.h??'Không có giải thích chi tiết.',
    word:String(q.word??q.a??q.answer??'').trim(), vietnamese:String(q.vietnamese??'').trim(), ipa:String(q.ipa??'').trim(),
    part_of_speech:String(q.part_of_speech??'').trim(), examples:Array.isArray(q.examples)?[...q.examples]:[], examples_vi:Array.isArray(q.examples_vi)?[...q.examples_vi]:[],
    curriculum_level:Number(q.curriculum_level??q.level??0)||0, unit_group:String(q.unit_group??'').trim(), render_style:String(q.render_style??'').trim()
  };
}

async function loadSemesterData(){
  if(semesterDataLoadingPromise)return semesterDataLoadingPromise;
  semesterDataLoadingPromise=(async()=>{
    const [p1,p2]=await Promise.all([fetchJsonEnglish_(CLASS1_ENGLISH_FILES_.discover1),fetchJsonEnglish_(CLASS1_ENGLISH_FILES_.discover2)]);
    const sectionsById={}; miniGameVocabCache=[]; wordMeaningMapCache={}; weeksByIdCache={};
    for(const data of [p1,p2]) for(const sec of (data.topics||[])){
      if(!sectionsById[sec.id])sectionsById[sec.id]={id:sec.id,name:sec.name,desc:sec.desc||'',rawQuestions:[]};
      for(const sub of (sec.subs||[])) for(const q of (sub.qs||[])){
        const enriched={...q,sub_code:q.sub||sub.id,sub:sub.name||q.sub||sub.id,sub_name:sub.name||''};
        sectionsById[sec.id].rawQuestions.push(enriched);
        if(Number(sec.id)===2&&String(sub.id||q.sub||'')==='2.1'){
          const item=buildMiniGameVocabItem(q,miniGameVocabCache.length); if(item&&!miniGameVocabCache.some(x=>x.word===item.word&&x.vietnamese===item.vietnamese))miniGameVocabCache.push(item);
        }
        if(Number(sec.id)===2)addVocabularyMeaning(q.word??q.a??q.answer??'',q.vietnamese??extractVocabularyVietnameseMeaning(q.q||q.question_text||''));
      }
    }
    return {sectionsById};
  })(); return semesterDataLoadingPromise;
}

async function loadLessonData_(){ if(englishLessonData_){lessonDataCache_=englishLessonData_;return englishLessonData_;} englishLessonData_=await fetchJsonEnglish_(CLASS1_ENGLISH_FILES_.lessons); lessonDataCache_=englishLessonData_; return englishLessonData_; }
async function loadAlphabetIPAData(){
  if(alphabetIpaLoaded)return;
  const data=await loadLessonData_();
  ALPHABET_DATA=Array.isArray(data?.learning_resources?.alphabet?.items)?data.learning_resources.alphabet.items:[];
  IPA_DATA=Array.isArray(data?.learning_resources?.ipa?.items)?data.learning_resources.ipa.items:[];
  alphabetIpaLoaded=true;
}
async function loadExerciseData_(semester){
  const s=Number(semester)===2?2:1; if(englishExerciseData_[s])return englishExerciseData_[s];
  const d=await fetchJsonEnglish_(s===2?CLASS1_ENGLISH_FILES_.exercises2:CLASS1_ENGLISH_FILES_.exercises1);
  if(d?.mapping_status?.runtime_ready===false) console.warn('[TA1] Exercise mapping is marked runtime_ready=false; keeping source mapping unchanged.',d.mapping_status.reason||'');
  englishExerciseData_[s]=d; return d;
}
async function loadReviewData_(){ if(englishReviewData_)return englishReviewData_; englishReviewData_=await fetchJsonEnglish_(CLASS1_ENGLISH_FILES_.review); return englishReviewData_; }

async function loadExamDataFile(file){
  const key='class1-english-exams'; if(examsCache[key])return examsCache[key];
  const raw=await fetchJsonEnglish_(CLASS1_ENGLISH_FILES_.exams); const data={semester_1_exams:[],semester_2_exams:[],hsg_exams:[]};
  (raw.exams||[]).forEach(ex=>{const arrayKey=EXAM_CATEGORY_TO_ARRAY_KEY[ex.exam_category]||'semester_1_exams';data[arrayKey].push({...ex,exam_title:ex.exam_name,questions:(ex.questions||[]).map(q=>normalizeQuestion({...q,diem:q.score??q.diem})).filter(Boolean)});});
  examsCache[key]=data; return data;
}

async function openReviewTab(){
  if(!requirePremiumAccess('Review / Ôn tập'))return;
  stopSpeaking();clearInterval(quizTimerInterval);setMainTabActive_('review');stopActiveMiniGame_();
  inLessonFlow=false;inAlphaIpaFlow=false;inMiniGameFlow=false;activeExamContext=null;activeRoadmapContext=null;activeTopicId=11;pendingTopicQuiz=null;
  updateNavTabs('Review / Ôn tập','🧠',null);showLoadingOverlay('Đang tải nội dung ôn tập...');
  try{
    const data=await loadReviewData_(); const sec=data?.source_section||{}; const questions=[];
    (sec.subs||[]).forEach(sub=>(sub.qs||[]).forEach(q=>questions.push(normalizeQuestion({...q,sub_code:sub.id,sub_name:sub.name,sub:sub.id}))));
    if(!questions.length)throw new Error('Chưa có dữ liệu ôn tập'); hideLoadingOverlay();
    showLectureAndSubtopics(11,'Review / Ôn tập',{topic_id:11,topic_name:'Review / Ôn tập',description:sec.desc||'Choose a semester to review. / Chọn học kỳ để ôn tập.',lecture_title:'Review',lecture_content:'Choose Semester 1 or Semester 2 to start reviewing.',lecture_audio_text:'Choose Semester 1 or Semester 2 to start reviewing.',questions});
  }catch(err){hideLoadingOverlay();activeTopicId=null;alert(`Không thể tải nội dung ôn tập: ${err.message}`);}
}

function getEnglishExerciseProgressKey_(){return `ta1_bai_tap_unlocked_class1_${String(currentUser?.maHS||'KHACH').toUpperCase()}`;}
function getLocalEnglishExerciseProgress_(){if(!currentUser||currentUser.isGuest)return 1;try{return Math.max(1,Number(localStorage.getItem(getEnglishExerciseProgressKey_())||1)||1);}catch(_){return 1;}}
function getUnlockedBaiTapTa1_(){if(isAdminUser())return 999;if(class1EnglishProgressLoaded_)return Math.max(1,Number(class1EnglishExerciseUnlocked_)||1);return getLocalEnglishExerciseProgress_();}
function saveUnlockedBaiTapTa1_(n){if(!currentUser||currentUser.isGuest)return;class1EnglishExerciseUnlocked_=Math.max(1,Math.min(16,Number(n)||1));class1EnglishProgressLoaded_=true;try{localStorage.setItem(getEnglishExerciseProgressKey_(),String(class1EnglishExerciseUnlocked_));}catch(_){}}
async function refreshClass1EnglishProgress_(){
  if(!currentUser||currentUser.isGuest){class1EnglishExerciseUnlocked_=1;class1EnglishProgressLoaded_=true;return;}
  if(isAdminUser()){class1EnglishExerciseUnlocked_=999;class1EnglishProgressLoaded_=true;return;}
  const d=await class1EnglishApi_('assessmentProgressGet',{subjectId:'ta'}); class1EnglishExerciseUnlocked_=Math.max(1,Number(d?.unlockedIndex)||1);class1EnglishBestPercent_=d?.bestPercentByExercise&&typeof d.bestPercentByExercise==='object'?d.bestPercentByExercise:{};class1EnglishProgressLoaded_=true;try{localStorage.setItem(getEnglishExerciseProgressKey_(),String(class1EnglishExerciseUnlocked_));}catch(_){}
}
function newAssessmentAttemptId_(){try{if(window.crypto?.randomUUID)return window.crypto.randomUUID();}catch(_){}return 'ta_'+Date.now().toString(36)+'_'+Math.random().toString(36).slice(2,14);}
function assessmentAnswersPayload_(){return activeQuestionsList.map((q,idx)=>({questionId:String(q?.question_id??''),answer:userAnswers[idx]==null?'':String(userAnswers[idx])}));}
function exerciseBankQuestions_(data){return (data?.question_bank?.weeks||[]).flatMap(w=>(w.questions||[]).map(q=>normalizeQuestion(q)).filter(Boolean));}
function getQuestionsForBaiTapTa1_(bt,data){
  const all=exerciseBankQuestions_(data);if(!bt||!all.length)return[];
  const recent=new Set(getBaiTapTa1Recent_(bt.bai));
  const unitId=Number(bt.bai)||0, exerciseId=String(bt.exercise_id||'').trim();
  // JSON mới đã được map chính xác SGK/SBT theo Unit. Luôn ưu tiên khóa định danh,
  // không dùng keyword để kéo nhầm câu của Unit khác.
  const exact=all.filter(q=>(unitId>0&&Number(q.unit_id)===unitId)||(exerciseId&&String(q.exercise_id||'')===exerciseId));
  if(exact.length>=20){
    const drawCount=Math.min(Number(bt.draw_count)||20,exact.length);
    let pool=shuffleArray(exact).filter(q=>!recent.has(q.question_id));
    // Mỗi Unit hiện có đúng 20 câu; từ lượt thứ hai cho phép dùng lại sau khi đã xoay hết bank.
    if(pool.length<drawCount)pool=shuffleArray(exact);
    const chosen=selectBalancedTa1_(pool,drawCount);
    saveBaiTapTa1Recent_(bt.bai,chosen.map(q=>q.question_id));
    return chosen;
  }
  // Fallback chỉ để tương thích dữ liệu legacy nếu một file cũ được nạp nhầm.
  const primary=all.filter(q=>matchesAnyTa1_(questionSearchTextTa1_(q),bt.keywords)),extended=all.filter(q=>!primary.includes(q)&&matchesAnyTa1_(questionSearchTextTa1_(q),bt.extended_keywords));
  let candidate=[...shuffleArray(primary),...shuffleArray(extended)].filter(q=>!recent.has(q.question_id));const target=Math.min(Number(bt.candidate_pool_target)||30,primary.length+extended.length);candidate=candidate.slice(0,target);if(candidate.length<Math.min(20,primary.length+extended.length))candidate=[...shuffleArray(primary),...shuffleArray(extended)].slice(0,target);const chosen=selectBalancedTa1_(candidate,Math.min(Number(bt.draw_count)||20,candidate.length));saveBaiTapTa1Recent_(bt.bai,chosen.map(q=>q.question_id));return chosen;
}
async function openRoadmap(semesterNumber=1){
  stopSpeaking();stopActiveMiniGame_();if(!requirePremiumAccess('Exercises / Bài tập'))return;setMainTabActive_('exercises');inMiniGameFlow=false;inLessonFlow=false;activeExamContext=null;activeRoadmapContext=null;activeTopicId=null;pendingTopicQuiz=null;updateNavTabs('Exercises / Bài tập','✏️',null);switchAppView('view-roadmap');showLoadingOverlay('Đang mở Bài tập...');
  try{try{await refreshClass1EnglishProgress_();}catch(_){console.warn('[TA1] Chưa đồng bộ được tiến độ, dùng bản gần nhất trên thiết bị.');}const data=await loadExerciseData_(semesterNumber);renderBaiTapTa1Grid_(data,semesterNumber);}catch(err){alert(`Không thể mở Bài tập: ${err.message}`);}finally{hideLoadingOverlay();}
}
async function selectBaiTapTa1_(bai){
  stopSpeaking();showLoadingOverlay(`Đang chuẩn bị Bài tập ${bai}...`);try{const sem=Number(bai)>8?2:1,data=await loadExerciseData_(sem),bt=(data.bai_tap||[]).find(x=>Number(x.bai)===Number(bai));if(!bt)throw new Error('Không tìm thấy Bài tập');if(Number(bai)>getUnlockedBaiTapTa1_()){showLockedBaiTapTa1_(bai);return;}const qs=getQuestionsForBaiTapTa1_(bt,data);if(qs.length<10)throw new Error('Kho câu hỏi phù hợp Unit này chưa đủ dữ liệu để tạo lượt luyện ổn định');activeRoadmapContext={week:Number(bai),bai:Number(bai),semester:sem,exerciseId:String(bt.exercise_id||`TA1_BT${String(bai).padStart(2,'0')}`),topicId:String(bt.exercise_id||''),chuDe:`Bài tập ${bai} · ${bt.title||''}`};activeAssessmentAttemptId_=newAssessmentAttemptId_();pendingTopicQuiz=null;activeExamContext=null;updateNavTabs('Exercises / Bài tập','✏️',`Exercise ${bai} / Bài ${bai}`,bt.title||'');startTopicQuiz(bai,activeRoadmapContext.chuDe,qs,null);}catch(err){alert(`Không thể mở Bài tập: ${err.message}`);}finally{hideLoadingOverlay();}
}
function renderBaiTapTa1Grid_(data,semester){
  const host=document.getElementById('roadmap-svg-container'),tabs=document.getElementById('bai-tap-semester-tabs');if(!host)return;const arr=(data?.bai_tap||[]).filter(x=>Number(x.semester)===Number(semester)),unlocked=getUnlockedBaiTapTa1_();if(tabs)tabs.innerHTML=[1,2].map(s=>`<button onclick="openRoadmap(${s})" class="semester-switch-btn ${Number(s)===Number(semester)?'is-active':'is-inactive'}"><span class="block">Semester ${s}</span><span class="block text-[9px] opacity-75">Học kỳ ${s}</span></button>`).join('');
  host.innerHTML=`<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">${arr.map((bt,idx)=>{const open=Number(bt.bai)<=unlocked,best=Number(class1EnglishBestPercent_?.[String(bt.exercise_id||'')]??class1EnglishBestPercent_?.[String(bt.bai)]??0);return `<button onclick="${open?`selectBaiTapTa1_(${bt.bai})`:`showLockedBaiTapTa1_(${bt.bai})`}" class="relative text-left min-h-[105px] rounded-2xl border-2 p-3 ${open?(idx%2?'bg-purple-50 border-purple-200 hover:border-purple-400':'bg-pink-50 border-pink-200 hover:border-pink-400'):'bg-slate-50 border-slate-200 opacity-60'} hover:shadow-md transition-shadow"><div class="flex justify-between"><span class="font-black ${open?'text-purple-700':'text-slate-500'}">Exercise ${bt.bai}<span class="block text-[9px] text-slate-400">Bài tập ${bt.bai}</span></span><span>${open?(best?`⭐ ${best}%`:''):'🔒'}</span></div><div class="text-[12px] md:text-[13px] font-bold text-slate-600 mt-1 line-clamp-2">${escapeHtml(bt.title||'')}</div><div class="text-[11px] font-extrabold text-slate-400 mt-1 line-clamp-1">${escapeHtml(bt.title_vi||'')}</div><div class="text-[10px] mt-2 ${open?'text-fuchsia-600':'text-slate-400'} font-black">${open?'20 questions · ≥80% unlock<br><span class="text-[9px] text-slate-400">20 câu · đạt ≥80% mở bài sau</span>':'Score ≥80% to unlock<br><span class="text-[9px] text-slate-400">Cần ≥80% bài trước</span>'}</div></button>`}).join('')}</div>`;
}
async function saveWeeklyProgressToSheet(percent,starCount,scoreVal){
  if(!activeRoadmapContext||!currentUser||currentUser.isGuest)return;try{const r=await class1EnglishApi_('assessmentAttemptSubmit',{subjectId:'ta',kind:'baitap',semester:Number(activeRoadmapContext.semester)===2?'hk2':'hk1',assessmentId:String(activeRoadmapContext.exerciseId||''),attemptId:activeAssessmentAttemptId_||newAssessmentAttemptId_(),answers:assessmentAnswersPayload_(),durationMs:quizStartTime?Math.max(0,Date.now()-quizStartTime):0});const vp=Number(r?.verified?.percent),authoritative=Number.isFinite(vp)?vp:Number(percent||0);if(r?.progress){class1EnglishExerciseUnlocked_=Math.max(1,Number(r.progress.unlockedIndex)||1);class1EnglishBestPercent_=r.progress.bestPercentByExercise||{};class1EnglishProgressLoaded_=true;try{localStorage.setItem(getEnglishExerciseProgressKey_(),String(class1EnglishExerciseUnlocked_));}catch(_){}}if(authoritative>=80&&Number(activeRoadmapContext.bai)<16)setTimeout(()=>alert(`🎉 Chúc mừng bé đạt ${authoritative}%! Nếu đủ điều kiện, Bài tập tiếp theo đã được mở khóa trên tài khoản Lớp 1.`),350);}catch(err){if(String(err?.code||'')==='EXERCISE_LOCKED'){try{await refreshClass1EnglishProgress_();}catch(_){}alert('Tiến độ trên máy chủ cho biết bài này chưa được mở. Bé hãy hoàn thành bài trước đạt từ 80% nhé!');return;}alert('Kết quả Bài tập chưa được lưu vào tài khoản Lớp 1. Bé có thể thử lại khi kết nối ổn định.');}
}
async function saveExamResultToSheet(){
  if(!activeExamContext||!currentUser||currentUser.isGuest)return;const k=String(activeExamContext.categoryKey||''),cat=k==='hocky1'?'hk1':k==='hocky2'?'hk2':'hsg',assessmentId=String(activeExamContext.examId||'');if(!assessmentId)return;try{const r=await class1EnglishApi_('assessmentAttemptSubmit',{subjectId:'ta',kind:'baithi',examCategory:cat,assessmentId,attemptId:activeAssessmentAttemptId_||newAssessmentAttemptId_(),answers:assessmentAnswersPayload_(),durationMs:quizStartTime?Math.max(0,Date.now()-quizStartTime):0});if(r?.verified&&cat!=='hsg'&&Number(r.verified.correct)!==quizAnsweredLog.filter(x=>x.isCorrect).length)alert('Kết quả trên máy và máy chủ chưa khớp. Báo cáo chính thức đã dùng kết quả máy chủ.');}catch(_){alert('Kết quả bài thi chưa được lưu vào tài khoản Lớp 1. Bé có thể thử lại khi kết nối ổn định.');}
}

function normalizeEnglishHistoryRow_(row,kind){
  const out={...row};out.Timestamp=row.Timestamp||row.timestamp||row.UpdatedAt||'';out.ngayLam=out.Timestamp;out.thoiGianLamBai=row.ThoiGianLamBai||row.thoiGianLamBai||'';out.tongCauHoi=Number(row.TongCauHoi??row.tongCauHoi??0);out.soCauDung=Number(row.SoCauDung??row.soCauDung??0);
  SKILL_KEYS.forEach(k=>{const meta=SKILL_TAXONOMY[k],obj=row.competencies?.[k]||{};out[meta.sheetCol]=Number(row[meta.sheetCol]??row[k+'_Dung']??row[k+'_Correct']??obj.correct??0);out[meta.totalCol]=Number(row[meta.totalCol]??row[k+'_Tong']??row[k+'_Total']??obj.total??0);});
  if(kind==='baitap'){out.tuan=Number(row.BaiSo??row.baiSo??0);out.chuDe=out.tuan?`Bài tập ${out.tuan}`:String(row.BaiId||row.assessmentId||'Bài tập');out.percent=Number(row.PhanTram??row.percent??0);out.score=out.percent/10;out.tongDiem=out.score;}else{out.deSo=Number(row.DeSo??row.deSo??0);out.score=Number(row.DiemSo??row.score??0);out.tongDiem=out.score;}return out;
}
async function fetchClass1EnglishHistoryByLegacySheet_(sheetName){
  if(sheetName==='LichSuTienTrinhTuan'){const [a,b]=await Promise.all([class1EnglishApi_('assessmentHistoryGet',{subjectId:'ta',kind:'baitap',semester:'hk1'}),class1EnglishApi_('assessmentHistoryGet',{subjectId:'ta',kind:'baitap',semester:'hk2'})]);return [...(a?.history||[]),...(b?.history||[])].map(x=>normalizeEnglishHistoryRow_(x,'baitap')).sort((x,y)=>new Date(y.Timestamp||0)-new Date(x.Timestamp||0));}
  if(sheetName==='LichSuBaiThiHSG'){return [];}
  const sem=sheetName==='LichSuBaiThiHK2'?'hk2':'hk1';const d=await class1EnglishApi_('assessmentHistoryGet',{subjectId:'ta',kind:'baithi',semester:sem});return (d?.history||[]).map(x=>normalizeEnglishHistoryRow_(x,'baithi'));
}
async function openHistoryModal(sheetName='LichSuTienTrinhTuan'){
  if(!currentUser||currentUser.isGuest){alert('Bé vui lòng đăng nhập bằng tài khoản Lớp 1 để xem lịch sử nhé!');englishModuleCtx_?.openAuth?.('login');return;}if(sheetName==='LichSuBaiThiHSG'){alert('Đề HSG không đưa vào báo cáo sáu năng lực chính thức.');return;}
  const modal=document.getElementById('modal-history-progress');if(!modal)return;modal.classList.remove('hidden');document.getElementById('hist-info-name').textContent=currentUser.hoTen||'--';const cl=document.getElementById('hist-info-class');if(cl)cl.textContent='--';document.getElementById('hist-info-code').textContent=currentUser.maHS||'--';const dob=document.getElementById('hist-info-dob');if(dob)dob.textContent='--';document.getElementById('hist-report-date').textContent=new Date().toLocaleDateString('vi-VN');const titleMap={LichSuTienTrinhTuan:'Báo cáo tiến trình Bài tập Tiếng Anh 1',LichSuBaiThiHK1:'Báo cáo kết quả — Học kỳ 1',LichSuBaiThiHK2:'Báo cáo kết quả — Học kỳ 2'};document.getElementById('hist-modal-title').textContent=titleMap[sheetName]||'Kết quả học tập';showLoadingOverlay('Đang tải lịch sử...');try{const rows=await fetchClass1EnglishHistoryByLegacySheet_(sheetName);hideLoadingOverlay();renderHistoryReport(rows,sheetName);}catch(_){hideLoadingOverlay();alert('Chưa tải được lịch sử từ tài khoản Lớp 1. Vui lòng thử lại.');}
}

async function startRandomExam(categoryKey){
  stopSpeaking();const arrayKey=examFileMap[categoryKey]?.arrayKey||'semester_1_exams';showLoadingOverlay('Đang chuẩn bị đề thi...');try{const examData=await loadExamDataFile('de_thi_tieng_anh_1.json');hideLoadingOverlay();const pool=Array.isArray(examData?.[arrayKey])?examData[arrayKey]:[];if(!pool.length)return alert('Đang cập nhật thêm đề thi cho mục này, bé quay lại sau nhé!');const examIndex=Math.floor(Math.random()*pool.length),exam=pool[examIndex],examLabel=examFileMap[categoryKey]?.label||'Đề thi',examTitle=exam.exam_title||`${examLabel} - Đề số ${examIndex+1}`;activeExamContext={categoryKey,examIndex,examTitle,examId:String(exam.exam_id??exam.id??examIndex+1),semester:Number(exam.semester)||null};activeAssessmentAttemptId_=newAssessmentAttemptId_();activeRoadmapContext=null;pendingTopicQuiz=null;const questions=Array.isArray(exam.questions)?exam.questions:[];if(!questions.length)return alert('Đề thi này chưa có câu hỏi, bé chọn đề khác nhé!');updateNavTabs('Đấu trường đề thi','🏆',examTitle);startTopicQuiz(0,examTitle,shuffleArray(questions),null);}catch(err){hideLoadingOverlay();alert(`Không thể tải đề thi: ${err.message}`);}
}

function stopSpeaking(){englishTtsNonce_++;try{banMaiAudio.pause();banMaiAudio.currentTime=0;banMaiAudio.onended=null;banMaiAudio.onerror=null;banMaiAudio.removeAttribute('src');banMaiAudio.load();}catch(_){} }
function speakVietnamese(text,rate=.96){if(text)speakGoogleTTS(text,'vi',rate);}
function speakEnglish(text,rate=.92){if(text)speakGoogleTTS(text,'en-US',rate);}
function speakGoogleTTS(text,lang,rate){
  const nonce=++englishTtsNonce_;try{banMaiAudio.pause();banMaiAudio.currentTime=0;banMaiAudio.onended=null;}catch(_){}let clean=String(text||'').replace(/<[^>]*>/g,'').trim();if(!clean)return;const tl=String(lang||'').toLowerCase().startsWith('en')?'en-US':'vi';if(tl==='vi')clean=clean.replace(/b-a/g,'bờ a ba').replace(/c\/k/g,'cờ hoặc ca').replace(/g\/gh/g,'gờ đơn hoặc gờ kép').replace(/ng\/ngh/g,'ngờ đơn hoặc ngờ kép');const chunks=clean.length<=180?[clean]:(clean.match(/[^.!?\n]+[.!?\n]*/g)||[clean]);let i=0;const playNext=()=>{if(nonce!==englishTtsNonce_||englishModuleDestroyed_||i>=chunks.length)return;const s=chunks[i++].trim();if(!s)return playNext();banMaiAudio.src=`https://translate.google.com/translate_tts?ie=UTF-8&tl=${encodeURIComponent(tl)}&client=tw-ob&q=${encodeURIComponent(s)}`;banMaiAudio.playbackRate=rate;banMaiAudio.onended=playNext;banMaiAudio.play().catch(()=>{});};playNext();
}

function rememberEnglishGameGlobals_(){
  ENGLISH_GAME_GLOBAL_NAMES_.forEach(name=>{if(englishGameGlobalPrevious_.has(name))return;englishGameGlobalPrevious_.set(name,Object.prototype.hasOwnProperty.call(window,name)?Object.getOwnPropertyDescriptor(window,name):null);});
}
function loadGameScript(src){
  if(loadedGameScripts[src])return Promise.resolve(); rememberEnglishGameGlobals_();
  return new Promise((resolve,reject)=>{const script=document.createElement('script');script.src=src;script.async=true;script.dataset.class1EnglishGame='1';script.onload=()=>{loadedGameScripts[src]=true;englishGameScriptElements_.push(script);resolve();};script.onerror=()=>{try{script.remove();}catch(_){}reject(new Error(`Không tải được file game: ${src}`));};document.body.appendChild(script);});
}
function removeEnglishGameGlobals_(){
  for(const [name,desc] of englishGameGlobalPrevious_){try{if(desc)Object.defineProperty(window,name,desc);else delete window[name];}catch(_){try{if(desc&&'value' in desc)window[name]=desc.value;else window[name]=undefined;}catch(__){}}}
  englishGameGlobalPrevious_.clear(); englishGameScriptElements_.forEach(el=>{try{el.remove();}catch(_){}}); englishGameScriptElements_=[]; Object.keys(loadedGameScripts||{}).forEach(k=>{try{delete loadedGameScripts[k];}catch(_){}}); ENGLISH_GAME_STYLE_IDS_.forEach(id=>{try{document.getElementById(id)?.remove();}catch(_){}});
}
function stopActiveMiniGame_(){
  const f={ 'word-search':'wsRenderTopicScreen','word-scramble':'wscRenderTopicScreen','bingo':'bgoRenderTopicScreen','fishing-game':'fgRenderTopicScreen','sentence-train':'stnRenderStart','grammar-river':'grvRenderStart','qa-bridge':'qbrRenderStart','sentence-doctor':'sdocRenderStart','action-race':'arRenderStart','feeling-detective':'fdRenderStart','a-or-an-factory':'aafRenderStart','teacher-says':'tsRenderStart' }[englishActiveGameId_];
  if(f&&typeof window[f]==='function'){try{window[f]();}catch(_){}}englishActiveGameId_='';const box=document.getElementById('game-play-container');if(box)box.innerHTML='';
}
async function openGamePlay(gameId){
  stopSpeaking();stopActiveMiniGame_();ensureMiniGameThemeStyles();inMiniGameFlow=true;const game=MINIGAME_LIST.find(g=>g.id===gameId);if(!game)return;if(!game.ready){alert(`Game "${game.title}" đang được xây dựng.`);return;}englishActiveGameId_=gameId;document.getElementById('game-play-title').innerHTML=`<span>${game.icon}</span><span>${game.title}</span>`;updateNavTabs('Mini Game','🎮',game.title);switchAppView('view-game-play');const src=GAME_SCRIPT_MAP[gameId];if(src){document.getElementById('game-play-container').innerHTML='<p class="text-center text-gray-400 font-bold py-8">Đang tải game...</p>';try{await loadGameScript(src);}catch(_){document.getElementById('game-play-container').innerHTML='<p class="text-center text-rose-500 font-bold py-8">Không tải được game, bé thử lại nhé!</p>';return;}}
  const starts={'word-search':'startWordSearchGame','word-scramble':'startWordScrambleGame','bingo':'startBingoGame','fishing-game':'startFishingGame','sentence-train':'startSentenceTrainGame','grammar-river':'startGrammarRiverGame','qa-bridge':'startQABridgeGame','sentence-doctor':'startSentenceDoctorGame','action-race':'startActionRaceGame','feeling-detective':'startFeelingDetectiveGame','a-or-an-factory':'startAOrAnFactoryGame','teacher-says':'startTeacherSaysGame'};const fn=window[starts[gameId]];if(typeof fn==='function')fn();
}

function syncClass1Score_(){englishModuleCtx_?.hooks?.setScore?.(Number(starGreenCount||0),Number(starRedCount||0));}
const __englishStandalonePlayAudio_=playAudio;
playAudio=function(type){const out=__englishStandalonePlayAudio_.apply(this,arguments);setTimeout(syncClass1Score_,0);return out;};
function resetStars(){starGreenCount=0;starRedCount=0;const g=document.getElementById('star-green-count');if(g)g.textContent='0';const r=document.getElementById('star-red-count');if(r)r.textContent='0';syncClass1Score_();}

// Project standalone breadcrumb into Class 1 shared sub-banner.
function englishReadBreadcrumb_(){const out=[];[2,3,4].forEach(level=>{const tab=document.getElementById(`header-level${level}-tab`),title=document.getElementById(`header-level${level}-title`);if(!tab||!title||tab.classList.contains('hidden'))return;const text=String(title.textContent||'').trim();if(text)out.push({level,title:text});});return out;}
function resetClass1EnglishBreadcrumb_(){const pill=document.getElementById('sub-pill');if(!pill)return;pill.classList.remove('english-sub-breadcrumbs');pill.removeAttribute('aria-label');pill.removeAttribute('title');}
function syncClass1BannerFromEnglish_(){if(!englishModuleCtx_?.hooks)return;if(appShellRootMode_){englishModuleCtx_.hooks.clearDetail?.();resetClass1EnglishBreadcrumb_();return;}const crumbs=englishReadBreadcrumb_(),fallback=crumbs.map(x=>x.title).join(' · ')||'Tiếng Anh 1';englishModuleCtx_.hooks.setDetail?.(fallback);const pill=document.getElementById('sub-pill');if(!pill)return;pill.classList.add('english-sub-breadcrumbs');pill.setAttribute('aria-label','Điều hướng chuyên mục Tiếng Anh');pill.title=fallback;if(!crumbs.length){pill.textContent=fallback;return;}pill.replaceChildren();crumbs.forEach((c,i)=>{if(i){const sep=document.createElement('span');sep.className='english-breadcrumb-sep';sep.setAttribute('aria-hidden','true');sep.textContent='›';pill.appendChild(sep);}const clickable=c.level===2||(c.level===3&&currentMainTab==='discover'&&(!!activeTopicId||!!pendingPairedGroupContext||!!pendingTopicQuiz));const node=document.createElement(clickable?'button':'span');if(clickable)node.type='button';node.className=`english-breadcrumb-tab english-breadcrumb-level${c.level}`;node.textContent=c.title;node.title=c.title;if(clickable){node.setAttribute('aria-label',`Back to ${c.title}`);node.addEventListener('click',c.level===2?()=>returnToTopicLecture():()=>onHeaderLevel3Click());}pill.appendChild(node);});}
const __englishStandaloneUpdateNavTabs_=updateNavTabs;updateNavTabs=function(){const out=__englishStandaloneUpdateNavTabs_.apply(this,arguments);syncClass1BannerFromEnglish_();return out;};
const __englishStandaloneSetRoot_=setAppShellRootMode_;setAppShellRootMode_=function(isRoot){const out=__englishStandaloneSetRoot_.apply(this,arguments);syncClass1BannerFromEnglish_();return out;};

// Add lesson scene from shared catalog when page 1 has no explicit image.
const __englishStandaloneRenderLessonPage_=renderTa1LessonPage_;
renderTa1LessonPage_=function(p){
  const data=englishLessonData_;
  const lesson=(data?.bai_hoc||[]).find(x=>Number(x.bai)===Number(activeBaiHocContext?.bai));
  if(p&&Number(p.page_no)===1){
    const resolved=resolveEnglishImage_(p.image||'',p.imageId||p.image_id||'')||lessonSceneSrc_(lesson);
    if(resolved)p={...p,image:resolved};
  }
  return __englishStandaloneRenderLessonPage_(p);
};

function primeEnglishAudio_(){if(englishModuleAudioPrimed_)return;englishModuleAudioPrimed_=true;const once=()=>{try{const AC=window.AudioContext||window.webkitAudioContext;if(!audioCtx&&AC)audioCtx=new AC();if(audioCtx?.state==='suspended')audioCtx.resume();}catch(_){}};englishModuleRoot_?.addEventListener('pointerdown',once,{once:true,passive:true});}

function installEnglishInlineBridge_(){
  const names=["acceptFriendlyDialog_", "addVocabularyMeaning", "alert", "assessmentAnswersPayload_", "beautifySubtopicName", "buildMiniGameVocabItem", "buildRoadmapPathD", "buildTrickyChoices", "callAppsScript", "capitalizeFirstLetter", "catalogImage_", "catalogSrc_", "checkAnswer", "class1EnglishApi_", "class1EnglishUser_", "closeFriendlyDialog_", "closeHistoryModal", "closeReviewWrongModal", "enableReplayOnOptions", "englishReadBreadcrumb_", "englishVocabVisualHtml_", "ensureFriendlyDialog_", "ensureMiniGameLearningReady", "ensureMiniGameThemeStyles", "ensureMiniGameVocabReady", "escapeHtml", "escapeJsStringTa1_", "exerciseBankQuestions_", "exportReportToPDF", "extractFirstEmoji", "extractMiniGameEmoji", "extractVocabularyVietnameseMeaning", "fetchAllQuestionsFlat", "fetchAllTopicsData", "fetchClass1EnglishHistoryByLegacySheet_", "fetchJsonEnglish_", "formatDateOnly", "formatDateShort", "formatDuration", "generateReview15", "getActiveLessonPageData_", "getBaiHocTa1CompletedSet_", "getBaiHocTa1ProgressKey_", "getBaiTapTa1RecentKey_", "getBaiTapTa1Recent_", "getBaiTapTa1UnlockKey_", "getEnglishExerciseProgressKey_", "getHeaderEnglishLabel_", "getLocalEnglishExerciseProgress_", "getMiniGamePaletteOrder", "getMiniGameSectionPool", "getMiniGameTopicGroups", "getMiniGameTopicName", "getMiniGameVocabPool", "getQuestionsForBaiTapTa1_", "getQuestionsForWeek343", "getRoadmapCoord", "getSkillCell", "getStoredSessionToken", "getStudentFirstName", "getUnlockedBaiTapTa1_", "getWeekRawPool", "getWordSearchVocabPool", "goHome", "handleNextExamFromReport", "handleTa1PracticeChoice_", "hasPremiumAccess", "hideLoadingOverlay", "initQuizPallet", "isAdminUser", "jumpToQuestion", "launchSubtopicQuiz", "lessonSceneSrc_", "loadAlphabetIPAData", "loadExamDataFile", "loadExerciseData_", "loadGameScript", "loadLessonData_", "loadQuestion", "loadReviewData_", "loadSemesterData", "loadSharedImageCatalog_", "lookupVocabEmoji", "markBaiHocTa1Complete_", "matchesAnyTa1_", "miniGameHash", "newAssessmentAttemptId_", "nextQuestion", "normalizeEnglishHistoryRow_", "normalizeQuestion", "normalizeTopic", "normalizeVocabWordKey", "onHeaderLevel3Click", "openAlphabetIPA", "openAlphabetMenu", "openAuthScreen", "openBaiHocHub", "openBaiHocTa1_", "openExamHub", "openGamePlay", "openHistoryModal", "openIPAMenu", "openLessonUnit_", "openLessonsHub", "openMainTab", "openMiniGameHub", "openPhonicsMatcher", "openReviewTab", "openReviewWrongModal", "openRoadmap", "openTopic", "openVocabularyLevel_", "playAudio", "prevQuestion", "primeEnglishAudio_", "questionSearchTextTa1_", "refreshClass1EnglishProgress_", "refreshMainTabLocks_", "rememberEnglishGameGlobals_", "removeEnglishGameGlobals_", "renderAlphaIPAMenu", "renderBaiHocTa1Hub_", "renderBaiHocTa1Lesson_", "renderBaiTapTa1Grid_", "renderDashboardGrid", "renderExamHubGrid", "renderHistoryReport", "renderHistoryTable", "renderLessonLearnPage_", "renderLessonPage_", "renderLessonPracticePage_", "renderLessonSummaryPage_", "renderLessonsHub_", "renderMiniGameTopicMenu", "renderPedagogicalEvaluation", "renderReportTopicsBreakdown", "renderRoadmapSVG", "renderTa1LessonBottom_", "renderTa1LessonPage_", "renderTa1LessonTabs_", "renderTa1QuestionsPage_", "renderTa1SummaryPage_", "replaySpeakOption", "requirePremiumAccess", "resetClass1EnglishBreadcrumb_", "resetStars", "resolveEnglishImage_", "restoreQuestionState", "returnToTopicLecture", "saveBaiHocTa1CompletedSet_", "saveBaiTapTa1Recent_", "saveExamResultToSheet", "saveUnlockedBaiTapTa1_", "saveWeeklyProgressToSheet", "selectBaiTapTa1_", "selectBalancedTa1_", "selectPairedGroup", "selectRoadmapWeek", "selectSubtopic", "setAppShellRootMode_", "setMainTabActive_", "setSubtopicGridColumns", "setVocabularyStudyMode", "showFriendlyConfirm_", "showFriendlyDialog_", "showLectureAndSubtopics", "showLoadingOverlay", "showLockedBaiTapTa1_", "showPairedGroupMenu", "showPremiumAccessWarning", "showResultScreen", "showVocabularyMeaningForOption", "showVocabularyTopicMenu", "shuffleArray", "speakAlphaWord", "speakAlphabetLetter", "speakBaiHocTa1_", "speakCurrentQuestion", "speakEnglish", "speakGoogleTTS", "speakIPAExampleWord", "speakIPAGuideVietnamese", "speakIPASound", "speakLecture", "speakLessonPhonics_", "speakLessonPractice_", "speakLessonSentence_", "speakLessonSummary_", "speakLessonWord_", "speakOptionWithMeaning", "speakPedagogicalEvaluation", "speakVocabularyExample_", "speakVocabularyPrompt_", "speakVocabularyTarget_", "speakVietnamese", "starCountFromPercent", "startExamCountdown", "startRandomExam", "startTopicQuiz", "stopActiveMiniGame_", "stopSpeaking", "switchAppView", "switchLessonSemester_", "syncClass1BannerFromEnglish_", "syncClass1EnglishState_", "syncClass1Score_", "toggleAutoSpeech", "triggerSubmitQuizPrompt", "updateAutoSpeechButtonUI", "updateExamTimerDisplay", "updateNavButtons", "updateNavTabs", "updateQuizPalletUI", "wrapCaptionLines"];
  names.forEach(name=>{
    if(englishBridgePrevious_.has(name))return;
    englishBridgePrevious_.set(name,Object.prototype.hasOwnProperty.call(window,name)?Object.getOwnPropertyDescriptor(window,name):null);
    let fn=null; try{fn=eval(name);}catch(_){}
    if(typeof fn==='function')Object.defineProperty(window,name,{configurable:true,writable:true,value:fn});
  });
  // Game files are classic scripts loaded outside this module IIFE.
  // Expose the shared palette explicitly so Bingo and any future game can
  // use the same Mini Game theme without duplicating palette data.
  if(!englishBridgePrevious_.has('MINIGAME_TOPIC_PALETTES')){
    englishBridgePrevious_.set('MINIGAME_TOPIC_PALETTES',Object.prototype.hasOwnProperty.call(window,'MINIGAME_TOPIC_PALETTES')?Object.getOwnPropertyDescriptor(window,'MINIGAME_TOPIC_PALETTES'):null);
    Object.defineProperty(window,'MINIGAME_TOPIC_PALETTES',{configurable:true,writable:false,value:MINIGAME_TOPIC_PALETTES});
  }
  if(!englishBridgePrevious_.has('activeBaiHocContext')){
    englishBridgePrevious_.set('activeBaiHocContext',Object.prototype.hasOwnProperty.call(window,'activeBaiHocContext')?Object.getOwnPropertyDescriptor(window,'activeBaiHocContext'):null);
    Object.defineProperty(window,'activeBaiHocContext',{configurable:true,get:()=>activeBaiHocContext,set:(x)=>{activeBaiHocContext=x;}});
  }
  if(!englishBridgePrevious_.has('currentUser')){
    englishBridgePrevious_.set('currentUser',Object.prototype.hasOwnProperty.call(window,'currentUser')?Object.getOwnPropertyDescriptor(window,'currentUser'):null);
    Object.defineProperty(window,'currentUser',{configurable:true,get:()=>currentUser,set:(x)=>{currentUser=x;}});
  }
  if(!englishBridgePrevious_.has('currentMainTab')){
    englishBridgePrevious_.set('currentMainTab',Object.prototype.hasOwnProperty.call(window,'currentMainTab')?Object.getOwnPropertyDescriptor(window,'currentMainTab'):null);
    Object.defineProperty(window,'currentMainTab',{configurable:true,get:()=>currentMainTab,set:(x)=>{currentMainTab=x;}});
  }
  if(!englishBridgePrevious_.has('headerLevel3ClickHandler')){
    englishBridgePrevious_.set('headerLevel3ClickHandler',Object.prototype.hasOwnProperty.call(window,'headerLevel3ClickHandler')?Object.getOwnPropertyDescriptor(window,'headerLevel3ClickHandler'):null);
    Object.defineProperty(window,'headerLevel3ClickHandler',{configurable:true,get:()=>headerLevel3ClickHandler,set:(x)=>{headerLevel3ClickHandler=x;}});
  }
  if(!englishBridgePrevious_.has('inMiniGameFlow')){
    englishBridgePrevious_.set('inMiniGameFlow',Object.prototype.hasOwnProperty.call(window,'inMiniGameFlow')?Object.getOwnPropertyDescriptor(window,'inMiniGameFlow'):null);
    Object.defineProperty(window,'inMiniGameFlow',{configurable:true,get:()=>inMiniGameFlow,set:(x)=>{inMiniGameFlow=x;}});
  }
  if(!englishBridgePrevious_.has('inAlphaIpaFlow')){
    englishBridgePrevious_.set('inAlphaIpaFlow',Object.prototype.hasOwnProperty.call(window,'inAlphaIpaFlow')?Object.getOwnPropertyDescriptor(window,'inAlphaIpaFlow'):null);
    Object.defineProperty(window,'inAlphaIpaFlow',{configurable:true,get:()=>inAlphaIpaFlow,set:(x)=>{inAlphaIpaFlow=x;}});
  }
  if(!englishBridgePrevious_.has('activeTopicId')){
    englishBridgePrevious_.set('activeTopicId',Object.prototype.hasOwnProperty.call(window,'activeTopicId')?Object.getOwnPropertyDescriptor(window,'activeTopicId'):null);
    Object.defineProperty(window,'activeTopicId',{configurable:true,get:()=>activeTopicId,set:(x)=>{activeTopicId=x;}});
  }
}
function removeEnglishInlineBridge_(){
  for(const [name,desc] of englishBridgePrevious_){try{if(desc)Object.defineProperty(window,name,desc);else delete window[name];}catch(_){}}
  englishBridgePrevious_.clear();
}

const ENGLISH_RUNTIME_HTML_ = "<div class=\"w-full flex flex-col space-y-1.5 md:space-y-2 p-1 md:p-2\" id=\"screen-dashboard\" style=\"max-width: 82rem !important;\">\n<header class=\"app-main-header w-full\" id=\"dashboard-header\">\n<button class=\"flex items-center justify-center bg-white border border-pink-300 shadow-sm shrink-0 overflow-hidden p-0 transition-shadow duration-200 hover:border-pink-400 hover:shadow-[0_0_18px_rgba(244,114,182,0.65)]\" id=\"btn-header-home\" onclick=\"goHome()\" title=\"Home\">\n<img alt=\"Tiếng Anh 1\" class=\"w-full h-full object-cover\" src=\"logo-home.png\"/>\n</button>\n<nav aria-label=\"Main learning modules\" id=\"main-module-tabs\">\n<div>\n<button class=\"main-module-tab is-active\" data-tab=\"discover\" id=\"main-tab-discover\" onclick=\"openMainTab('discover')\"><span>🧭</span><span>Explore</span></button>\n<button class=\"main-module-tab\" data-tab=\"lessons\" id=\"main-tab-lessons\" onclick=\"openMainTab('lessons')\"><span>📖</span><span>Lessons</span><span class=\"hidden absolute -top-1 -right-1 text-[10px]\" id=\"lessons-lock-icon\">🔒</span></button>\n<button class=\"main-module-tab\" data-tab=\"exercises\" id=\"main-tab-exercises\" onclick=\"openMainTab('exercises')\"><span>✏️</span><span>Exercises</span><span class=\"hidden absolute -top-1 -right-1 text-[10px]\" id=\"roadmap-lock-icon\">🔒</span></button>\n<button class=\"main-module-tab\" data-tab=\"review\" id=\"main-tab-review\" onclick=\"openMainTab('review')\"><span>🧠</span><span>Review</span><span class=\"hidden absolute -top-1 -right-1 text-[10px]\" id=\"review-lock-icon\">🔒</span></button>\n<button class=\"main-module-tab\" data-tab=\"exams\" id=\"main-tab-exams\" onclick=\"openMainTab('exams')\"><span>🏆</span><span>Exams</span><span class=\"hidden absolute -top-1 -right-1 text-[10px]\" id=\"exam-lock-icon\">🔒</span></button>\n<button class=\"main-module-tab\" data-tab=\"games\" id=\"main-tab-games\" onclick=\"openMainTab('games')\"><span>🎮</span><span>Mini Games</span><span class=\"hidden absolute -top-1 -right-1 text-[10px]\" id=\"minigame-lock-icon\">🔒</span></button>\n</div>\n</nav>\n<div class=\"flex items-center\" id=\"header-info-zone\">\n<div class=\"flex flex-col space-y-0.5 bg-pink-50/90 px-1.5 md:px-2.5 py-1 rounded-xl border border-pink-200 shadow-inner\" id=\"header-score-box\">\n<div class=\"flex items-center justify-between space-x-2 font-extrabold\">\n<span class=\"px-1.5 py-0.5 bg-emerald-500 text-white rounded text-[10px] shadow-sm flex items-center justify-center\"><i class=\"fa-solid fa-star md:mr-0.5\"></i><span class=\"hidden md:inline\"> True</span></span>\n<span class=\"text-emerald-600 font-extrabold text-xs\" id=\"star-green-count\">0</span>\n</div>\n<div class=\"flex items-center justify-between space-x-2 font-extrabold\">\n<span class=\"px-1.5 py-0.5 bg-rose-500 text-white rounded text-[10px] shadow-sm flex items-center justify-center\"><i class=\"fa-solid fa-star md:mr-0.5\"></i><span class=\"hidden md:inline\"> False</span></span>\n<span class=\"text-rose-600 font-extrabold text-xs\" id=\"star-red-count\">0</span>\n</div>\n</div>\n<div class=\"text-xs font-bold text-gray-600 text-right\" id=\"user-info-box\"></div>\n</div>\n</header>\n<section aria-label=\"Banner and breadcrumb\" id=\"app-banner-slot\">\n<div id=\"app-main-banner\">\n<picture>\n<source media=\"(max-width: 767px)\" srcset=\"banner-main-mobile.jpg\"/>\n<img alt=\"Tiếng Anh 1 - Cô Thỏ Hồng\" src=\"banner-main.jpg\"/>\n</picture>\n</div>\n<div class=\"hidden\" id=\"app-context-banner\">\n<div class=\"flex items-center min-w-0\" id=\"header-learning-tabs\">\n<div class=\"hidden items-center\" id=\"header-level2-tab\">\n<button class=\"flex items-center space-x-1.5 shrink-0 transition-shadow duration-200\" onclick=\"returnToTopicLecture()\">\n<span id=\"header-level2-icon\">🌸</span><span class=\"truncate\" id=\"header-level2-title\">Topic</span>\n</button>\n</div>\n<div class=\"hidden items-center space-x-1\" id=\"header-level3-tab\"><span class=\"font-bold\">›</span><div class=\"truncate flex items-center\"><span class=\"truncate\" id=\"header-level3-title\">Subtopic</span></div></div>\n<div class=\"hidden items-center space-x-1\" id=\"header-level4-tab\"><span class=\"font-bold\">›</span><div class=\"truncate flex items-center\"><span class=\"truncate\" id=\"header-level4-title\">Detail</span></div></div>\n</div>\n</div>\n</section>\n<main class=\"w-full\" id=\"app-viewport\">\n<!-- VIEW 1: TRANG CHỦ 12 CHỦ ĐỀ -->\n<div class=\"w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5\" id=\"view-dashboard-grid\"></div>\n<!-- MODULE BÀI HỌC: 16 UNIT THEO SGK GLOBAL SUCCESS -->\n<div class=\"w-full hidden pastel-card p-3 md:p-5\" id=\"view-bai-hoc-hub\">\n<div class=\"w-full max-w-5xl mx-auto\">\n<div class=\"grid grid-cols-[auto_1fr_auto] items-center gap-3 mb-3\">\n<div class=\"flex items-center gap-2 justify-self-start\" id=\"bai-hoc-semester-tabs\"></div>\n<div class=\"text-center min-w-0\">\n<h2 class=\"text-lg md:text-xl font-black text-purple-700 flex items-center justify-center gap-2\"><span>📖</span><span class=\"bi-label\"><span class=\"en\">English 1 Lessons</span><span class=\"vi\">Bài học Tiếng Anh 1</span></span></h2>\n<p class=\"text-xs md:text-sm text-slate-500 font-bold mt-0.5\" id=\"bai-hoc-hub-subtitle\">16 Units · Global Success<br/><span class=\"text-[10px] text-slate-400\">16 Unit theo SGK Global Success</span></p>\n</div>\n<div aria-hidden=\"true\" class=\"w-[170px] hidden md:block\"></div>\n</div>\n<div class=\"grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-2.5\" id=\"bai-hoc-grid\"></div>\n</div>\n</div>\n<div class=\"w-full hidden pastel-card p-3 md:p-5\" id=\"view-bai-hoc-lesson\">\n<div class=\"w-full max-w-4xl mx-auto space-y-3\">\n<div class=\"flex items-center justify-between gap-2\">\n<div class=\"text-base md:text-lg font-extrabold text-purple-600\" id=\"bai-hoc-lesson-meta\"></div>\n<button class=\"px-3 py-2 bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 rounded-xl text-xs font-extrabold shrink-0\" id=\"btn-back-bai-hoc\" onclick=\"openBaiHocHub(activeBaiHocContext.semester || 1)\">← Lessons<br/><span class=\"text-[9px] opacity-70\">Danh sách bài</span></button>\n</div>\n<div class=\"space-y-3\" id=\"bai-hoc-sections\"></div>\n</div>\n</div>\n<!-- VIEW 2: BÀI GIẢNG -->\n<div class=\"w-full hidden pastel-card p-4 md:p-6 flex flex-col justify-between items-center min-h-[480px]\" id=\"view-lecture\">\n<div class=\"w-full max-w-4xl flex flex-col items-center\">\n<h2 class=\"hidden\" id=\"lecture-title\"></h2>\n<div class=\"w-full bg-pink-50/40 p-3.5 md:p-4 rounded-2xl border-2 border-pink-100 mb-3\">\n<p class=\"text-base md:text-lg text-gray-700 leading-relaxed whitespace-pre-line text-center\" id=\"lecture-content\"></p>\n</div>\n<button class=\"w-full max-w-xs py-2 bg-purple-100 hover:bg-purple-200 text-purple-700 font-extrabold rounded-xl text-sm md:text-base pastel-btn flex items-center justify-center space-x-2 border-2 border-purple-200 shadow-sm mb-2.5\" onclick=\"speakLecture()\">\n<i class=\"fa-solid fa-volume-high text-base\"></i><span>Nghe cô đọc</span>\n</button>\n<div class=\"w-full pt-2 border-t border-pink-100 flex flex-col items-center\">\n<div class=\"grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-2xl\" id=\"lecture-subtopics-list\"></div>\n</div>\n</div>\n<div class=\"w-full flex justify-center mt-2.5 pt-1\" id=\"wrap-mix-all-subtopics\">\n<button class=\"w-full max-w-xs py-2 bg-gradient-to-r from-purple-400 to-indigo-400 text-white font-extrabold rounded-xl text-xs md:text-sm pastel-btn shadow-md\" id=\"btn-mix-all-subtopics\" onclick=\"selectSubtopic(null)\">\n                            🌟 Học trộn tất cả các mục\n                        </button>\n</div>\n</div>\n<!-- VIEW ALPHABET & IPA (CHUYÊN MỤC 1 — bê nguyên nội dung cũ) -->\n<div class=\"w-full hidden pastel-card p-4 md:p-6 flex flex-col items-center min-h-[480px]\" id=\"view-alphabet\">\n<div class=\"w-full flex flex-col items-center\" id=\"alphaipa-content\"></div>\n</div>\n<!-- VIEW 3: PHÒNG LÀM BÀI / THI CHUẨN 16:9 -->\n<div class=\"w-full hidden flex flex-col space-y-1.5\" id=\"view-quiz\">\n<!-- TOP BAR CỦA ĐỀ THI (ẨN HOÀN TOÀN TRONG CHẾ ĐỘ LUYỆN TẬP) -->\n<div class=\"w-full bg-white rounded-2xl p-2.5 border-2 border-pink-200 flex flex-wrap items-center justify-between gap-2.5 shadow-xs\" id=\"quiz-top-bar\">\n<div class=\"flex items-center space-x-2\" id=\"quiz-timer-container\">\n<div class=\"w-8 h-8 rounded-xl bg-pink-50 border border-pink-200 flex items-center justify-center text-pink-500 font-bold text-sm\">\n<i class=\"fa-solid fa-stopwatch\"></i>\n</div>\n<div>\n<span class=\"text-xs font-bold text-gray-400 uppercase tracking-wider block\">Thời gian</span>\n<span class=\"text-base font-black text-rose-500 tracking-wider\" id=\"quiz-timer-display\">40:00</span>\n</div>\n</div>\n<button class=\"ml-auto px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-black text-xs md:text-sm flex items-center space-x-1.5 transition-all shadow-sm pastel-btn\" id=\"btn-submit-quiz\" onclick=\"triggerSubmitQuizPrompt()\">\n<i class=\"fa-solid fa-circle-check\"></i>\n<span>Nộp bài thi</span>\n</button>\n</div>\n<!-- THẺ CARD LÀM BÀI CHÍNH -->\n<div class=\"w-full pastel-card p-3.5 md:p-5 flex flex-col justify-between min-h-[380px]\">\n<!-- HEADER TRONG CARD (CHỈ HIỆN KHI THI) -->\n<div class=\"hidden items-center justify-between flex-wrap gap-2 border-b border-pink-100 pb-2\" id=\"quiz-card-header\">\n<div class=\"flex items-center space-x-2\">\n<span class=\"px-2.5 py-1 bg-pink-100 text-pink-800 text-sm font-black rounded-lg\" id=\"q-badge-index\">CÂU 1 / --</span>\n<span class=\"px-2.5 py-1 bg-pink-50 text-pink-700 border border-pink-200 text-sm font-bold rounded-lg flex items-center space-x-1\" id=\"q-badge-skill\">\n<i class=\"fa-solid fa-tag text-xs\"></i>\n<span id=\"q-skill-text\">Kiến thức cơ bản</span>\n</span>\n<span class=\"px-2 py-1 bg-amber-50 text-amber-700 border border-amber-200 text-sm font-bold rounded-lg\" id=\"q-badge-score\">(0.5 điểm)</span>\n</div>\n<button class=\"hidden px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-xl text-sm font-extrabold items-center space-x-1.5 transition-shadow duration-200 hover:shadow-[0_0_10px_rgba(99,102,241,0.5)] shadow-xs\" id=\"btn-roadmap-history\" onclick=\"openHistoryModal('LichSuTienTrinhTuan')\">\n<i class=\"fa-solid fa-chart-line\"></i>\n<span>Lịch sử tiến trình tuần</span>\n</button>\n<button class=\"px-3 py-1.5 bg-pink-50 hover:bg-pink-100 text-pink-700 border border-pink-200 rounded-xl text-sm font-extrabold flex items-center space-x-1.5 transition-all pastel-btn shadow-xs\" onclick=\"speakCurrentQuestion()\">\n<i class=\"fa-solid fa-volume-high text-pink-600\"></i>\n<span>Nghe câu hỏi</span>\n</button>\n</div>\n<!-- KHU VỰC CÂU HỎI & ĐÁP ÁN -->\n<div class=\"w-full flex flex-col justify-center items-center flex-1 my-0.5\" id=\"question-box\"></div>\n<!-- ĐIỀU HƯỚNG ĐÁY -->\n<div class=\"w-full pt-1\" id=\"quiz-bottom-nav\">\n<!-- 1. GIAO DIỆN LUYỆN TẬP -->\n<div class=\"flex items-center justify-center gap-3 w-full\" id=\"nav-group-practice\">\n<button class=\"px-5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-extrabold rounded-2xl text-xs md:text-sm pastel-btn border border-gray-200 flex items-center justify-center space-x-1.5 shadow-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed\" id=\"btn-prev-q-prac\" onclick=\"prevQuestion()\">\n<i class=\"fa-solid fa-chevron-left\"></i><span>Câu trước</span>\n</button>\n<div class=\"px-5 py-1.5 bg-pink-50 border border-pink-200 text-pink-700 font-black rounded-full text-xs md:text-sm flex items-center justify-center space-x-1.5 shadow-xs select-none\" id=\"practice-step-indicator\">\n<span id=\"practice-step-text\">Câu 1 / 59</span>\n</div>\n<button class=\"px-6 py-2 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-black rounded-2xl text-xs md:text-sm pastel-btn shadow-md flex items-center justify-center space-x-1.5 transition-all\" id=\"btn-next-q-prac\" onclick=\"nextQuestion()\">\n<span id=\"btn-next-text-prac\">Câu tiếp theo</span>\n<i class=\"fa-solid fa-chevron-right ml-1\" id=\"btn-next-icon-prac\"></i>\n</button>\n</div>\n<!-- 2. GIAO DIỆN ĐỀ THI -->\n<div class=\"hidden items-center justify-between w-full\" id=\"nav-group-exam\">\n<button class=\"px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-extrabold rounded-xl text-xs md:text-sm pastel-btn border border-gray-200 flex items-center justify-center space-x-1.5 shadow-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed\" id=\"btn-prev-q-exam\" onclick=\"prevQuestion()\">\n<i class=\"fa-solid fa-chevron-left\"></i><span>Câu trước</span>\n</button>\n<div class=\"grid grid-cols-10 gap-1.5 max-w-xl mx-2\" id=\"quiz-pallet-container\"></div>\n<button class=\"px-5 py-2 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-black rounded-xl text-xs md:text-sm pastel-btn shadow-md flex items-center justify-center space-x-1.5 transition-all\" id=\"btn-next-q-exam\" onclick=\"nextQuestion()\">\n<span id=\"btn-next-text-exam\">Câu tiếp theo</span>\n<i class=\"fa-solid fa-chevron-right ml-1\" id=\"btn-next-icon-exam\"></i>\n</button>\n</div>\n</div>\n</div>\n</div>\n<!-- VIEW: BÀI TẬP THEO 16 UNIT SGK / SBT -->\n<div class=\"w-full hidden pastel-card p-3 md:p-5 flex flex-col items-center\" id=\"view-roadmap\">\n<div class=\"w-full max-w-5xl flex flex-col items-center\">\n<div class=\"flex flex-col sm:flex-row items-center justify-between w-full px-1 mb-3 gap-2\">\n<div>\n<h2 class=\"text-base md:text-lg font-extrabold text-indigo-600 flex items-center space-x-2\"><span>✏️</span><span class=\"bi-label bi-left\"><span class=\"en\">Exercises</span><span class=\"vi\">Bài tập</span></span></h2>\n<p class=\"text-[11px] md:text-xs text-gray-500 font-bold\">20 questions each · Score 80% to unlock the next exercise · 6-skill assessment<br/><span class=\"text-[10px] text-slate-400\">20 câu mỗi bài · đạt 80% để mở bài tiếp theo · đánh giá 6 năng lực</span></p>\n</div>\n<div class=\"flex items-center gap-2 shrink-0\">\n<div class=\"flex items-center gap-2\" id=\"bai-tap-semester-tabs\"></div>\n<button class=\"px-3 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-extrabold rounded-xl border border-indigo-200 text-xs pastel-btn flex items-center space-x-1.5 shadow-sm\" onclick=\"openHistoryModal('LichSuTienTrinhTuan')\"><i class=\"fa-solid fa-chart-line text-indigo-600\"></i><span>📊 Exercise History<br/><span class=\"text-[9px] opacity-70\">Lịch sử Bài tập</span></span></button>\n</div>\n</div>\n<div class=\"w-full bg-gradient-to-br from-pink-50/70 via-white to-purple-50/70 rounded-3xl border-2 border-pink-200 p-3 shadow-sm\" id=\"roadmap-svg-container\"></div>\n</div>\n</div>\n<!-- VIEW: TRUNG TÂM MINI GAME (12 GAME, LƯỚI 3x4) -->\n<div class=\"w-full hidden pastel-card p-3 md:p-5 flex flex-col items-center\" id=\"view-minigame-hub\">\n<div class=\"w-full max-w-5xl\">\n<div class=\"flex items-center justify-between w-full px-2 mb-3 gap-2\">\n<h2 class=\"text-base md:text-lg font-extrabold text-teal-600 flex items-center space-x-2\">\n<span>🎮</span><span class=\"bi-label bi-left\"><span class=\"en\">Mini Games</span><span class=\"vi\">Trò chơi</span></span>\n</h2>\n<span class=\"text-[11px] md:text-xs font-bold text-gray-500\">Học mà chơi - chơi mà nhớ</span>\n</div>\n<div class=\"grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3\" id=\"minigame-grid\"></div>\n</div>\n</div>\n<!-- VIEW: MÀN CHƠI GAME (dùng chung khung cho mọi mini game) -->\n<div class=\"w-full hidden pastel-card p-3 md:p-5 flex flex-col items-center\" id=\"view-game-play\">\n<div class=\"w-full max-w-5xl\">\n<div class=\"flex items-center justify-between gap-2 mb-3\">\n<h2 class=\"text-base md:text-lg font-extrabold text-teal-600 flex items-center gap-2\" id=\"game-play-title\"></h2>\n<button class=\"px-3 py-1.5 bg-gradient-to-r from-fuchsia-500 to-pink-500 hover:from-fuchsia-600 hover:to-pink-600 text-white font-extrabold rounded-xl text-xs md:text-sm shadow-sm pastel-btn shrink-0\" onclick=\"openMiniGameHub()\">\n<i class=\"fa-solid fa-arrow-left\"></i> Chọn game khác\n                            </button>\n</div>\n<div class=\"w-full\" id=\"game-play-container\"></div>\n</div>\n</div>\n<!-- VIEW 5: ĐẤU TRƯỜNG ĐỀ THI (MỤC 12) -->\n<div class=\"w-full hidden pastel-card p-5 md:p-7 flex flex-col justify-between items-center min-h-[480px]\" id=\"view-exam-hub\">\n<div class=\"w-full max-w-5xl\">\n<div class=\"text-center mb-5\">\n<h2 class=\"font-extrabold text-amber-600 text-lg md:text-xl flex items-center justify-center space-x-2\">\n<span>🏆</span><span class=\"bi-label\"><span class=\"en\">Test Arena</span><span class=\"vi\">Đấu trường đề thi thử</span></span>\n</h2>\n<p class=\"text-xs md:text-sm text-gray-500 font-bold mt-1\">Semester-aligned tests · competency-based assessment<br/><span class=\"text-[10px] text-slate-400\">Đề thi bám đúng phạm vi từng học kỳ · đánh giá năng lực có dữ liệu</span></p>\n</div>\n<div class=\"grid grid-cols-1 md:grid-cols-3 gap-4\" id=\"exam-categories-grid\"></div>\n</div>\n</div>\n<!-- VIEW 6: MÀN HÌNH KẾT QUẢ & BÁO CÁO -->\n<div class=\"w-full hidden flex flex-col space-y-3\" id=\"view-result\">\n<div class=\"bg-gradient-to-tr from-rose-900 via-pink-950 to-rose-900 rounded-3xl p-4 sm:p-5 text-white shadow-xl relative overflow-hidden\">\n<div class=\"relative z-10 flex flex-col md:flex-row items-center justify-between gap-4\">\n<div class=\"space-y-1 text-center md:text-left\">\n<span class=\"px-3 py-0.5 bg-white/10 backdrop-blur-md rounded-full text-xs font-bold tracking-wider text-pink-200 border border-white/15 inline-block\" id=\"report-exam-badge\">\n                                    Kết quả bài thi\n                                </span>\n<h2 class=\"text-lg sm:text-xl font-black tracking-tight\" id=\"report-student-display\">Học sinh: --</h2>\n<p class=\"text-xs text-pink-200\" id=\"report-meta-display\">Lớp: -- | Mã số: -- | Thời gian: --</p>\n</div>\n<div class=\"flex items-center gap-3\">\n<div class=\"bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-2 text-center\">\n<span class=\"text-[10px] uppercase tracking-wider text-pink-200 font-bold block mb-0.5\">Tổng điểm</span>\n<div class=\"text-2xl sm:text-3xl font-black font-math text-amber-300\" id=\"report-total-score-val\">0.0</div>\n<span class=\"text-[9px] text-pink-200\">Thang điểm 10</span>\n</div>\n<div class=\"bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-2 text-center\">\n<span class=\"text-[10px] uppercase tracking-wider text-pink-200 font-bold block mb-0.5\">Độ chính xác</span>\n<div class=\"text-2xl sm:text-3xl font-black font-math text-emerald-300\" id=\"report-correct-ratio-val\">0/--</div>\n<span class=\"text-[9px] text-pink-200\">Câu đúng</span>\n</div>\n</div>\n</div>\n</div>\n<div class=\"bg-white rounded-3xl p-4 sm:p-5 border border-pink-100 soft-shadow-pink space-y-2.5\">\n<h3 class=\"text-sm sm:text-base font-black text-slate-800 tracking-tight flex items-center space-x-2\">\n<i class=\"fa-solid fa-chart-bar text-pink-600\"></i>\n<span>Bóc tách điểm số &amp; đánh giá năng lực</span>\n</h3>\n<div class=\"grid grid-cols-1 sm:grid-cols-2 gap-2\" id=\"report-topics-list\"></div>\n</div>\n<div class=\"grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-0.5\">\n<button class=\"py-2.5 px-3 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-black text-xs rounded-2xl shadow-xs transition-all flex items-center justify-center space-x-1.5 pastel-btn\" onclick=\"openReviewWrongModal()\">\n<i class=\"fa-solid fa-circle-question text-rose-500\"></i>\n<span>👉 Xem lại các câu làm sai</span>\n</button>\n<button class=\"py-2.5 px-3 bg-pink-50 hover:bg-pink-100 text-pink-700 border border-pink-200 font-black text-xs rounded-2xl shadow-xs transition-all flex items-center justify-center space-x-1.5 pastel-btn\" id=\"report-history-btn\" onclick=\"openHistoryModal('LichSuBaiThi_HK1')\">\n<i class=\"fa-solid fa-chart-line text-pink-600\"></i>\n<span>📊 Lịch sử &amp; biểu đồ tiến trình</span>\n</button>\n<button class=\"py-2.5 px-3 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-black text-xs rounded-2xl shadow-sm transition-all flex items-center justify-center space-x-1.5 pastel-btn\" id=\"report-next-action-btn\" onclick=\"handleNextExamFromReport()\">\n<span id=\"report-next-action-label\">🚀 Làm đề thi tiếp theo</span>\n<i class=\"fa-solid fa-arrow-right\"></i>\n</button>\n</div>\n</div>\n</main>\n</div>\n<div class=\"hidden fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3\" id=\"modal-review-wrong\">\n<div class=\"bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-pink-100 overflow-hidden\">\n<div class=\"p-3.5 border-b border-pink-100 flex items-center justify-between bg-rose-50/50\">\n<div class=\"flex items-center space-x-2 text-rose-800\">\n<i class=\"fa-solid fa-triangle-exclamation text-rose-600\"></i>\n<h3 class=\"font-black text-sm\">Chi tiết các câu trả lời chưa chính xác</h3>\n</div>\n<button class=\"w-7 h-7 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-700\" onclick=\"closeReviewWrongModal()\"><i class=\"fa-solid fa-xmark\"></i></button>\n</div>\n<div class=\"p-4 overflow-y-auto space-y-3 flex-grow text-xs sm:text-sm\" id=\"review-wrong-content\"></div>\n<div class=\"p-3 border-t border-slate-100 flex justify-end bg-slate-50\">\n<button class=\"px-5 py-2 bg-slate-800 text-white font-bold rounded-xl text-xs pastel-btn\" onclick=\"closeReviewWrongModal()\">Đóng lại</button>\n</div>\n</div>\n</div>\n<div class=\"hidden fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4\" id=\"modal-history-progress\">\n<div class=\"bg-white rounded-3xl max-w-5xl w-full max-h-[96vh] flex flex-col shadow-2xl border-2 border-pink-200 overflow-hidden\">\n<div class=\"p-4 sm:p-6 overflow-y-auto space-y-4 flex-grow bg-white\" id=\"printable-report-area\">\n<!-- TRANG 1: THÔNG TIN & BIỂU ĐỒ -->\n<div class=\"space-y-4 page-break-1\">\n<div class=\"p-3.5 sm:p-4 rounded-2xl border border-pink-200 bg-pink-50/70 flex flex-col md:flex-row items-center justify-between gap-3 shadow-xs\">\n<div class=\"flex items-center space-x-3 text-pink-950 flex-1\">\n<div class=\"w-10 h-10 rounded-2xl bg-pink-100 text-pink-600 flex items-center justify-center shadow-xs shrink-0\">\n<i class=\"fa-solid fa-award text-xl\"></i>\n</div>\n<div>\n<h3 class=\"font-black text-base sm:text-lg text-pink-950\" id=\"hist-modal-title\">Kết quả tiến trình học tập</h3>\n<p class=\"text-xs font-bold text-pink-600 whitespace-nowrap\">Phân tích chuyên sâu 6 chủ đề &amp; nhận xét sư phạm chi tiết</p>\n</div>\n</div>\n<div class=\"bg-white/95 border-2 border-pink-200 px-4 py-2 rounded-2xl shadow-xs text-left shrink-0\">\n<div class=\"text-sm font-black text-slate-900 leading-tight\">\n                                Học sinh: <span class=\"text-pink-600\" id=\"hist-info-name\">--</span>\n</div>\n<div class=\"text-xs font-bold text-slate-600 mt-0.5\">\n                                Lớp: <span class=\"text-slate-900 font-extrabold\" id=\"hist-info-class\">--</span>  |  \n                                Mã số: <span class=\"text-slate-900 font-extrabold\" id=\"hist-info-code\">--</span>  |  \n                                Ngày sinh: <span class=\"text-slate-900 font-extrabold\" id=\"hist-info-dob\">--</span>\n</div>\n</div>\n<div class=\"flex items-center space-x-2 shrink-0\">\n<div class=\"text-xs font-bold text-slate-700 bg-white/95 px-3 py-2 rounded-xl border border-pink-200 text-center shadow-xs leading-tight\">\n<span class=\"block\">Ngày báo cáo</span>\n<span class=\"block font-bold text-rose-600\" id=\"hist-report-date\">03/09/2026</span>\n</div>\n<button class=\"w-8 h-8 rounded-full bg-white border border-pink-200 flex items-center justify-center text-pink-400 hover:text-rose-600 transition-all shadow-xs no-print\" onclick=\"closeHistoryModal()\">\n<i class=\"fa-solid fa-xmark\"></i>\n</button>\n</div>\n</div>\n<div class=\"flex flex-col md:flex-row gap-4 w-full\">\n<div class=\"w-full md:w-[60%] bg-pink-50/40 border border-pink-100 rounded-2xl p-4 flex flex-col justify-between shadow-xs\">\n<h4 class=\"text-xs sm:text-sm font-black text-slate-800 mb-2 flex items-center space-x-1.5\">\n<i class=\"fa-solid fa-chart-line text-pink-600\"></i>\n<span>Biến thiên tổng điểm các bài thi (/10)</span>\n</h4>\n<div class=\"h-64 w-full relative\">\n<canvas id=\"progressChartCanvas\"></canvas>\n</div>\n</div>\n<div class=\"w-full md:w-[40%] bg-pink-50/40 border border-pink-100 rounded-2xl p-4 flex flex-col justify-between shadow-xs\">\n<h4 class=\"text-xs sm:text-sm font-black text-slate-800 mb-2 flex items-center space-x-1.5\">\n<i class=\"fa-solid fa-chart-bar text-rose-600\"></i>\n<span>Năng lực trung bình (%)</span>\n</h4>\n<div class=\"h-64 w-full relative\">\n<canvas id=\"topicRadarChartCanvas\"></canvas>\n</div>\n</div>\n</div>\n</div>\n<!-- TRANG 2: NHẬN XÉT SƯ PHẠM CHI TIẾT -->\n<div class=\"space-y-4 page-break-2\">\n<div class=\"bg-gradient-to-br from-amber-50/90 via-orange-50/60 to-rose-50/50 border border-amber-200/80 rounded-2xl p-4 space-y-3 shadow-xs\">\n<div class=\"flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-amber-200/60 pb-1.5\">\n<div class=\"flex items-center space-x-2.5\">\n<div class=\"w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shadow-xs shrink-0\">\n<i class=\"fa-solid fa-award\"></i>\n</div>\n<div>\n<h4 class=\"text-base font-black text-amber-950 leading-tight\">Nhận xét sư phạm &amp; kế hoạch bồi dưỡng của giáo viên</h4>\n<p class=\"text-xs font-bold text-amber-700\">Đánh giá năng lực tư duy 6 chủ đề &amp; lời khuyên phụ huynh đồng hành</p>\n</div>\n</div>\n<button class=\"shrink-0 self-start sm:self-auto px-3 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-800 border border-amber-300 rounded-xl text-xs font-extrabold flex items-center space-x-1.5 pastel-btn shadow-xs no-print\" id=\"btn-speak-pedagogical\" onclick=\"speakPedagogicalEvaluation()\">\n<i class=\"fa-solid fa-volume-high\"></i><span>Nghe cô giáo đọc</span>\n</button>\n</div>\n<div class=\"space-y-2.5 text-xs sm:text-sm text-slate-800 leading-normal font-semibold\" id=\"pedagogical-evaluation-box\"></div>\n</div>\n</div>\n<!-- TRANG 3: BẢNG THỐNG KÊ CHI TIẾT TỪNG BÀI THI -->\n<div class=\"space-y-3 page-break-3\">\n<h4 class=\"text-base font-black text-slate-900 flex items-center space-x-2\">\n<i class=\"fa-solid fa-table text-pink-600\"></i>\n<span>Bảng thống kê điểm số chi tiết từng bài thi</span>\n</h4>\n<div class=\"border border-pink-200 rounded-2xl overflow-hidden shadow-xs bg-white overflow-x-auto\">\n<table class=\"w-full text-center text-xs border-collapse\">\n<thead class=\"bg-pink-100/70 text-pink-950 font-black border-b border-pink-200\">\n<tr class=\"divide-x divide-pink-200\">\n<th class=\"py-2.5 px-2 whitespace-nowrap\">Lần thi</th>\n<th class=\"py-2.5 px-2 whitespace-nowrap\">Đề / Tuần</th>\n<th class=\"py-2.5 px-2 whitespace-nowrap text-rose-600\">Tổng điểm</th>\n<th class=\"py-2 px-1 leading-tight\">Ngữ âm<br/><span class=\"text-[10px] text-pink-700\">(Spelling)</span></th>\n<th class=\"py-2 px-1 leading-tight\">Từ vựng<br/><span class=\"text-[10px] text-pink-700\">(Vocabulary)</span></th>\n<th class=\"py-2 px-1 leading-tight\">Nghe hiểu<br/><span class=\"text-[10px] text-pink-700\">(Listening)</span></th>\n<th class=\"py-2 px-1 leading-tight\">Ngữ pháp<br/><span class=\"text-[10px] text-pink-700\">(Grammar)</span></th>\n<th class=\"py-2 px-1 leading-tight\">Cú pháp<br/><span class=\"text-[10px] text-pink-700\">(Syntax)</span></th>\n<th class=\"py-2 px-1 leading-tight\">Đọc hiểu<br/><span class=\"text-[10px] text-pink-700\">(Reading)</span></th>\n<th class=\"py-2.5 px-2 whitespace-nowrap\">Ngày làm</th>\n<th class=\"py-2.5 px-2 whitespace-nowrap\">Thời gian</th>\n</tr>\n</thead>\n<tbody class=\"divide-y divide-pink-100 font-bold text-slate-700\" id=\"hist-table-body\"></tbody>\n</table>\n</div>\n</div>\n</div>\n<div class=\"p-3.5 border-t border-pink-100 flex items-center justify-between bg-pink-50/40 no-print\">\n<button class=\"px-5 py-2.5 bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 text-white font-extrabold text-xs md:text-sm rounded-xl transition-all shadow-md pastel-btn flex items-center space-x-1.5\" onclick=\"exportReportToPDF()\">\n<i class=\"fa-solid fa-file-pdf\"></i>\n<span>Xuất PDF</span>\n</button>\n<button class=\"px-8 py-2.5 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-xl text-xs md:text-sm transition-all pastel-btn\" onclick=\"closeHistoryModal()\">\n                    Đóng lại\n                </button>\n</div>\n</div>\n</div>";
const ENGLISH_RUNTIME_CSS_ = "/*! tailwindcss v4.1.10 | MIT License | https://tailwindcss.com */\n@layer properties;\n#class1-english-runtime,#class1-english-runtime {\n  --color-red-200: oklch(88.5% 0.062 18.334);\n  --color-red-300: oklch(80.8% 0.114 19.571);\n  --color-red-400: oklch(70.4% 0.191 22.216);\n  --color-red-500: oklch(63.7% 0.237 25.331);\n  --color-red-600: oklch(57.7% 0.245 27.325);\n  --color-red-700: oklch(50.5% 0.213 27.518);\n  --color-red-800: oklch(44.4% 0.177 26.899);\n  --color-red-900: oklch(39.6% 0.141 25.723);\n  --color-orange-50: oklch(98% 0.016 73.684);\n  --color-orange-200: oklch(90.1% 0.076 70.697);\n  --color-orange-400: oklch(75% 0.183 55.934);\n  --color-orange-500: oklch(70.5% 0.213 47.604);\n  --color-orange-600: oklch(64.6% 0.222 41.116);\n  --color-amber-50: oklch(98.7% 0.022 95.277);\n  --color-amber-100: oklch(96.2% 0.059 95.617);\n  --color-amber-200: oklch(92.4% 0.12 95.746);\n  --color-amber-300: oklch(87.9% 0.169 91.605);\n  --color-amber-400: oklch(82.8% 0.189 84.429);\n  --color-amber-500: oklch(76.9% 0.188 70.08);\n  --color-amber-600: oklch(66.6% 0.179 58.318);\n  --color-amber-700: oklch(55.5% 0.163 48.998);\n  --color-amber-800: oklch(47.3% 0.137 46.201);\n  --color-amber-900: oklch(41.4% 0.112 45.904);\n  --color-amber-950: oklch(27.9% 0.077 45.635);\n  --color-yellow-50: oklch(98.7% 0.026 102.212);\n  --color-yellow-200: oklch(94.5% 0.129 101.54);\n  --color-green-100: oklch(96.2% 0.044 156.743);\n  --color-green-400: oklch(79.2% 0.209 151.711);\n  --color-green-800: oklch(44.8% 0.119 151.328);\n  --color-emerald-50: oklch(97.9% 0.021 166.113);\n  --color-emerald-100: oklch(95% 0.052 163.051);\n  --color-emerald-200: oklch(90.5% 0.093 164.15);\n  --color-emerald-300: oklch(84.5% 0.143 164.978);\n  --color-emerald-400: oklch(76.5% 0.177 163.223);\n  --color-emerald-500: oklch(69.6% 0.17 162.48);\n  --color-emerald-600: oklch(59.6% 0.145 163.225);\n  --color-emerald-700: oklch(50.8% 0.118 165.612);\n  --color-emerald-800: oklch(43.2% 0.095 166.913);\n  --color-emerald-900: oklch(37.8% 0.077 168.94);\n  --color-teal-500: oklch(70.4% 0.14 182.503);\n  --color-teal-600: oklch(60% 0.118 184.704);\n  --color-cyan-50: oklch(98.4% 0.019 200.873);\n  --color-cyan-100: oklch(95.6% 0.045 203.388);\n  --color-cyan-200: oklch(91.7% 0.08 205.041);\n  --color-cyan-300: oklch(86.5% 0.127 207.078);\n  --color-cyan-500: oklch(71.5% 0.143 215.221);\n  --color-cyan-600: oklch(60.9% 0.126 221.723);\n  --color-cyan-700: oklch(52% 0.105 223.128);\n  --color-cyan-800: oklch(45% 0.085 224.283);\n  --color-sky-50: oklch(97.7% 0.013 236.62);\n  --color-sky-100: oklch(95.1% 0.026 236.824);\n  --color-sky-200: oklch(90.1% 0.058 230.902);\n  --color-sky-300: oklch(82.8% 0.111 230.318);\n  --color-sky-400: oklch(74.6% 0.16 232.661);\n  --color-sky-500: oklch(68.5% 0.169 237.323);\n  --color-sky-600: oklch(58.8% 0.158 241.966);\n  --color-sky-700: oklch(50% 0.134 242.749);\n  --color-blue-50: oklch(97% 0.014 254.604);\n  --color-blue-100: oklch(93.2% 0.032 255.585);\n  --color-blue-200: oklch(88.2% 0.059 254.128);\n  --color-blue-300: oklch(80.9% 0.105 251.813);\n  --color-blue-400: oklch(70.7% 0.165 254.624);\n  --color-blue-700: oklch(48.8% 0.243 264.376);\n  --color-blue-800: oklch(42.4% 0.199 265.638);\n  --color-indigo-50: oklch(96.2% 0.018 272.314);\n  --color-indigo-100: oklch(93% 0.034 272.788);\n  --color-indigo-200: oklch(87% 0.065 274.039);\n  --color-indigo-300: oklch(78.5% 0.115 274.713);\n  --color-indigo-400: oklch(67.3% 0.182 276.935);\n  --color-indigo-500: oklch(58.5% 0.233 277.117);\n  --color-indigo-600: oklch(51.1% 0.262 276.966);\n  --color-indigo-700: oklch(45.7% 0.24 277.023);\n  --color-indigo-800: oklch(39.8% 0.195 277.366);\n  --color-violet-50: oklch(96.9% 0.016 293.756);\n  --color-violet-100: oklch(94.3% 0.029 294.588);\n  --color-violet-200: oklch(89.4% 0.057 293.283);\n  --color-violet-300: oklch(81.1% 0.111 293.571);\n  --color-violet-400: oklch(70.2% 0.183 293.541);\n  --color-violet-500: oklch(60.6% 0.25 292.717);\n  --color-violet-600: oklch(54.1% 0.281 293.009);\n  --color-violet-700: oklch(49.1% 0.27 292.581);\n  --color-violet-800: oklch(43.2% 0.232 292.759);\n  --color-purple-50: oklch(97.7% 0.014 308.299);\n  --color-purple-100: oklch(94.6% 0.033 307.174);\n  --color-purple-200: oklch(90.2% 0.063 306.703);\n  --color-purple-300: oklch(82.7% 0.119 306.383);\n  --color-purple-400: oklch(71.4% 0.203 305.504);\n  --color-purple-500: oklch(62.7% 0.265 303.9);\n  --color-purple-600: oklch(55.8% 0.288 302.321);\n  --color-purple-700: oklch(49.6% 0.265 301.924);\n  --color-purple-800: oklch(43.8% 0.218 303.724);\n  --color-fuchsia-50: oklch(97.7% 0.017 320.058);\n  --color-fuchsia-300: oklch(83.3% 0.145 321.434);\n  --color-fuchsia-400: oklch(74% 0.238 322.16);\n  --color-fuchsia-500: oklch(66.7% 0.295 322.15);\n  --color-fuchsia-600: oklch(59.1% 0.293 322.896);\n  --color-fuchsia-700: oklch(51.8% 0.253 323.949);\n  --color-pink-50: oklch(97.1% 0.014 343.198);\n  --color-pink-100: oklch(94.8% 0.028 342.258);\n  --color-pink-200: oklch(89.9% 0.061 343.231);\n  --color-pink-300: oklch(82.3% 0.12 346.018);\n  --color-pink-400: oklch(71.8% 0.202 349.761);\n  --color-pink-500: oklch(65.6% 0.241 354.308);\n  --color-pink-600: oklch(59.2% 0.249 0.584);\n  --color-pink-700: oklch(52.5% 0.223 3.958);\n  --color-pink-800: oklch(45.9% 0.187 3.815);\n  --color-pink-950: oklch(28.4% 0.109 3.907);\n  --color-rose-50: oklch(96.9% 0.015 12.422);\n  --color-rose-100: oklch(94.1% 0.03 12.58);\n  --color-rose-200: oklch(89.2% 0.058 10.001);\n  --color-rose-300: oklch(81% 0.117 11.638);\n  --color-rose-400: oklch(71.2% 0.194 13.428);\n  --color-rose-500: oklch(64.5% 0.246 16.439);\n  --color-rose-600: oklch(58.6% 0.253 17.585);\n  --color-rose-700: oklch(51.4% 0.222 16.935);\n  --color-rose-800: oklch(45.5% 0.188 13.697);\n  --color-rose-900: oklch(41% 0.159 10.272);\n  --color-slate-50: oklch(98.4% 0.003 247.858);\n  --color-slate-100: oklch(96.8% 0.007 247.896);\n  --color-slate-200: oklch(92.9% 0.013 255.508);\n  --color-slate-300: oklch(86.9% 0.022 252.894);\n  --color-slate-400: oklch(70.4% 0.04 256.788);\n  --color-slate-500: oklch(55.4% 0.046 257.417);\n  --color-slate-600: oklch(44.6% 0.043 257.281);\n  --color-slate-700: oklch(37.2% 0.044 257.287);\n  --color-slate-800: oklch(27.9% 0.041 260.031);\n  --color-slate-900: oklch(20.8% 0.042 265.755);\n  --color-slate-950: oklch(12.9% 0.042 264.695);\n  --color-gray-100: oklch(96.7% 0.003 264.542);\n  --color-gray-200: oklch(92.8% 0.006 264.531);\n  --color-gray-300: oklch(87.2% 0.01 258.338);\n  --color-gray-400: oklch(70.7% 0.022 261.325);\n  --color-gray-500: oklch(55.1% 0.027 264.364);\n  --color-gray-600: oklch(44.6% 0.03 256.802);\n  --color-gray-700: oklch(37.3% 0.034 259.733);\n  --color-gray-800: oklch(27.8% 0.033 256.848);\n  --color-gray-900: oklch(21% 0.034 264.665);\n  --color-black: #000;\n  --color-white: #fff;\n  --spacing: 0.25rem;\n  --container-xs: 20rem;\n  --container-md: 28rem;\n  --container-xl: 36rem;\n  --container-2xl: 42rem;\n  --container-3xl: 48rem;\n  --container-4xl: 56rem;\n  --container-5xl: 64rem;\n  --container-6xl: 72rem;\n  --text-xs: 0.75rem;\n  --text-xs--line-height: calc(1 / 0.75);\n  --text-sm: 0.875rem;\n  --text-sm--line-height: calc(1.25 / 0.875);\n  --text-base: 1rem;\n  --text-base--line-height: calc(1.5 / 1);\n  --text-lg: 1.125rem;\n  --text-lg--line-height: calc(1.75 / 1.125);\n  --text-xl: 1.25rem;\n  --text-xl--line-height: calc(1.75 / 1.25);\n  --text-2xl: 1.5rem;\n  --text-2xl--line-height: calc(2 / 1.5);\n  --text-3xl: 1.875rem;\n  --text-3xl--line-height: calc(2.25 / 1.875);\n  --text-4xl: 2.25rem;\n  --text-4xl--line-height: calc(2.5 / 2.25);\n  --text-5xl: 3rem;\n  --text-5xl--line-height: 1;\n  --text-6xl: 3.75rem;\n  --text-6xl--line-height: 1;\n  --text-7xl: 4.5rem;\n  --text-7xl--line-height: 1;\n  --text-8xl: 6rem;\n  --text-8xl--line-height: 1;\n  --font-weight-semibold: 600;\n  --font-weight-bold: 700;\n  --font-weight-extrabold: 800;\n  --font-weight-black: 900;\n  --tracking-tight: -0.025em;\n  --tracking-wide: 0.025em;\n  --tracking-wider: 0.05em;\n  --leading-tight: 1.25;\n  --leading-snug: 1.375;\n  --leading-normal: 1.5;\n  --leading-relaxed: 1.625;\n  --radius-lg: 0.5rem;\n  --radius-xl: 0.75rem;\n  --radius-2xl: 1rem;\n  --radius-3xl: 1.5rem;\n  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);\n  --blur-xs: 4px;\n  --blur-sm: 8px;\n  --blur-md: 12px;\n  --default-transition-duration: 150ms;\n  --default-transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n}\n#class1-english-runtime .visible {\n  visibility: visible;\n}\n#class1-english-runtime .absolute {\n  position: absolute;\n}\n#class1-english-runtime .fixed {\n  position: fixed;\n}\n#class1-english-runtime .relative {\n  position: relative;\n}\n#class1-english-runtime .sticky {\n  position: sticky;\n}\n#class1-english-runtime .inset-0 {\n  inset: calc(var(--spacing) * 0);\n}\n#class1-english-runtime .inset-y-0 {\n  inset-block: calc(var(--spacing) * 0);\n}\n#class1-english-runtime .-top-1 {\n  top: calc(var(--spacing) * -1);\n}\n#class1-english-runtime .-top-8 {\n  top: calc(var(--spacing) * -8);\n}\n#class1-english-runtime .top-0 {\n  top: calc(var(--spacing) * 0);\n}\n#class1-english-runtime .top-2 {\n  top: calc(var(--spacing) * 2);\n}\n#class1-english-runtime .top-3 {\n  top: calc(var(--spacing) * 3);\n}\n#class1-english-runtime .top-\\[88px\\] {\n  top: 88px;\n}\n#class1-english-runtime .-right-1 {\n  right: calc(var(--spacing) * -1);\n}\n#class1-english-runtime .right-2 {\n  right: calc(var(--spacing) * 2);\n}\n#class1-english-runtime .right-3 {\n  right: calc(var(--spacing) * 3);\n}\n#class1-english-runtime .right-\\[44px\\] {\n  right: 44px;\n}\n#class1-english-runtime .right-\\[45px\\] {\n  right: 45px;\n}\n#class1-english-runtime .bottom-0 {\n  bottom: calc(var(--spacing) * 0);\n}\n#class1-english-runtime .bottom-3 {\n  bottom: calc(var(--spacing) * 3);\n}\n#class1-english-runtime .left-0 {\n  left: calc(var(--spacing) * 0);\n}\n#class1-english-runtime .left-1\\/2 {\n  left: calc(1/2 * 100%);\n}\n#class1-english-runtime .left-3 {\n  left: calc(var(--spacing) * 3);\n}\n#class1-english-runtime .left-\\[44px\\] {\n  left: 44px;\n}\n#class1-english-runtime .left-\\[45px\\] {\n  left: 45px;\n}\n#class1-english-runtime .z-10 {\n  z-index: 10;\n}\n#class1-english-runtime .z-50 {\n  z-index: 50;\n}\n#class1-english-runtime .z-\\[80\\] {\n  z-index: 80;\n}\n#class1-english-runtime .z-\\[90\\] {\n  z-index: 90;\n}\n#class1-english-runtime .z-\\[95\\] {\n  z-index: 95;\n}\n#class1-english-runtime .z-\\[120\\] {\n  z-index: 120;\n}\n#class1-english-runtime .col-span-full {\n  grid-column: 1 / -1;\n}\n#class1-english-runtime .container {\n  width: 100%;\n  @media (width >= 40rem) {\n    max-width: 40rem;\n  }\n  @media (width >= 48rem) {\n    max-width: 48rem;\n  }\n  @media (width >= 64rem) {\n    max-width: 64rem;\n  }\n  @media (width >= 80rem) {\n    max-width: 80rem;\n  }\n  @media (width >= 96rem) {\n    max-width: 96rem;\n  }\n}\n#class1-english-runtime .mx-2 {\n  margin-inline: calc(var(--spacing) * 2);\n}\n#class1-english-runtime .mx-auto {\n  margin-inline: auto;\n}\n#class1-english-runtime .my-0\\.5 {\n  margin-block: calc(var(--spacing) * 0.5);\n}\n#class1-english-runtime .my-1 {\n  margin-block: calc(var(--spacing) * 1);\n}\n#class1-english-runtime .my-2 {\n  margin-block: calc(var(--spacing) * 2);\n}\n#class1-english-runtime .my-3 {\n  margin-block: calc(var(--spacing) * 3);\n}\n#class1-english-runtime .my-4 {\n  margin-block: calc(var(--spacing) * 4);\n}\n#class1-english-runtime .my-auto {\n  margin-block: auto;\n}\n#class1-english-runtime .mt-0 {\n  margin-top: calc(var(--spacing) * 0);\n}\n#class1-english-runtime .mt-0\\.5 {\n  margin-top: calc(var(--spacing) * 0.5);\n}\n#class1-english-runtime .mt-1 {\n  margin-top: calc(var(--spacing) * 1);\n}\n#class1-english-runtime .mt-1\\.5 {\n  margin-top: calc(var(--spacing) * 1.5);\n}\n#class1-english-runtime .mt-2 {\n  margin-top: calc(var(--spacing) * 2);\n}\n#class1-english-runtime .mt-2\\.5 {\n  margin-top: calc(var(--spacing) * 2.5);\n}\n#class1-english-runtime .mt-3 {\n  margin-top: calc(var(--spacing) * 3);\n}\n#class1-english-runtime .mt-3\\.5 {\n  margin-top: calc(var(--spacing) * 3.5);\n}\n#class1-english-runtime .mt-4 {\n  margin-top: calc(var(--spacing) * 4);\n}\n#class1-english-runtime .mt-5 {\n  margin-top: calc(var(--spacing) * 5);\n}\n#class1-english-runtime .mt-6 {\n  margin-top: calc(var(--spacing) * 6);\n}\n#class1-english-runtime .mr-0\\.5 {\n  margin-right: calc(var(--spacing) * 0.5);\n}\n#class1-english-runtime .mr-1 {\n  margin-right: calc(var(--spacing) * 1);\n}\n#class1-english-runtime .mr-1\\.5 {\n  margin-right: calc(var(--spacing) * 1.5);\n}\n#class1-english-runtime .mr-2 {\n  margin-right: calc(var(--spacing) * 2);\n}\n#class1-english-runtime .mb-0\\.5 {\n  margin-bottom: calc(var(--spacing) * 0.5);\n}\n#class1-english-runtime .mb-1 {\n  margin-bottom: calc(var(--spacing) * 1);\n}\n#class1-english-runtime .mb-1\\.5 {\n  margin-bottom: calc(var(--spacing) * 1.5);\n}\n#class1-english-runtime .mb-2 {\n  margin-bottom: calc(var(--spacing) * 2);\n}\n#class1-english-runtime .mb-2\\.5 {\n  margin-bottom: calc(var(--spacing) * 2.5);\n}\n#class1-english-runtime .mb-3 {\n  margin-bottom: calc(var(--spacing) * 3);\n}\n#class1-english-runtime .mb-4 {\n  margin-bottom: calc(var(--spacing) * 4);\n}\n#class1-english-runtime .mb-5 {\n  margin-bottom: calc(var(--spacing) * 5);\n}\n#class1-english-runtime .ml-1 {\n  margin-left: calc(var(--spacing) * 1);\n}\n#class1-english-runtime .ml-1\\.5 {\n  margin-left: calc(var(--spacing) * 1.5);\n}\n#class1-english-runtime .ml-2 {\n  margin-left: calc(var(--spacing) * 2);\n}\n#class1-english-runtime .ml-4 {\n  margin-left: calc(var(--spacing) * 4);\n}\n#class1-english-runtime .ml-24 {\n  margin-left: calc(var(--spacing) * 24);\n}\n#class1-english-runtime .ml-auto {\n  margin-left: auto;\n}\n#class1-english-runtime .line-clamp-1 {\n  overflow: hidden;\n  display: -webkit-box;\n  -webkit-box-orient: vertical;\n  -webkit-line-clamp: 1;\n}\n#class1-english-runtime .line-clamp-2 {\n  overflow: hidden;\n  display: -webkit-box;\n  -webkit-box-orient: vertical;\n  -webkit-line-clamp: 2;\n}\n#class1-english-runtime .block {\n  display: block;\n}\n#class1-english-runtime .flex {\n  display: flex;\n}\n#class1-english-runtime .grid {\n  display: grid;\n}\n#class1-english-runtime .hidden {\n  display: none;\n}\n#class1-english-runtime .inline-block {\n  display: inline-block;\n}\n#class1-english-runtime .inline-flex {\n  display: inline-flex;\n}\n#class1-english-runtime .table {\n  display: table;\n}\n#class1-english-runtime .aspect-square {\n  aspect-ratio: 1 / 1;\n}\n#class1-english-runtime .h-1 {\n  height: calc(var(--spacing) * 1);\n}\n#class1-english-runtime .h-2 {\n  height: calc(var(--spacing) * 2);\n}\n#class1-english-runtime .h-5 {\n  height: calc(var(--spacing) * 5);\n}\n#class1-english-runtime .h-6 {\n  height: calc(var(--spacing) * 6);\n}\n#class1-english-runtime .h-7 {\n  height: calc(var(--spacing) * 7);\n}\n#class1-english-runtime .h-8 {\n  height: calc(var(--spacing) * 8);\n}\n#class1-english-runtime .h-9 {\n  height: calc(var(--spacing) * 9);\n}\n#class1-english-runtime .h-10 {\n  height: calc(var(--spacing) * 10);\n}\n#class1-english-runtime .h-11 {\n  height: calc(var(--spacing) * 11);\n}\n#class1-english-runtime .h-12 {\n  height: calc(var(--spacing) * 12);\n}\n#class1-english-runtime .h-14 {\n  height: calc(var(--spacing) * 14);\n}\n#class1-english-runtime .h-16 {\n  height: calc(var(--spacing) * 16);\n}\n#class1-english-runtime .h-20 {\n  height: calc(var(--spacing) * 20);\n}\n#class1-english-runtime .h-24 {\n  height: calc(var(--spacing) * 24);\n}\n#class1-english-runtime .h-28 {\n  height: calc(var(--spacing) * 28);\n}\n#class1-english-runtime .h-44 {\n  height: calc(var(--spacing) * 44);\n}\n#class1-english-runtime .h-64 {\n  height: calc(var(--spacing) * 64);\n}\n#class1-english-runtime .h-\\[50px\\] {\n  height: 50px;\n}\n#class1-english-runtime .h-\\[70px\\] {\n  height: 70px;\n}\n#class1-english-runtime .h-\\[78px\\] {\n  height: 78px;\n}\n#class1-english-runtime .h-\\[145px\\] {\n  height: 145px;\n}\n#class1-english-runtime .h-\\[150px\\] {\n  height: 150px;\n}\n#class1-english-runtime .h-\\[160px\\] {\n  height: 160px;\n}\n#class1-english-runtime .h-\\[190px\\] {\n  height: 190px;\n}\n#class1-english-runtime .h-\\[220px\\] {\n  height: 220px;\n}\n#class1-english-runtime .h-auto {\n  height: auto;\n}\n#class1-english-runtime .h-full {\n  height: 100%;\n}\n#class1-english-runtime .h-px {\n  height: 1px;\n}\n#class1-english-runtime .max-h-\\[85vh\\] {\n  max-height: 85vh;\n}\n#class1-english-runtime .max-h-\\[92vh\\] {\n  max-height: 92vh;\n}\n#class1-english-runtime .max-h-\\[96vh\\] {\n  max-height: 96vh;\n}\n#class1-english-runtime .max-h-\\[215px\\] {\n  max-height: 215px;\n}\n#class1-english-runtime .max-h-\\[220px\\] {\n  max-height: 220px;\n}\n#class1-english-runtime .max-h-\\[285px\\] {\n  max-height: 285px;\n}\n#class1-english-runtime .max-h-\\[300px\\] {\n  max-height: 300px;\n}\n#class1-english-runtime .max-h-\\[410px\\] {\n  max-height: 410px;\n}\n#class1-english-runtime .max-h-\\[430px\\] {\n  max-height: 430px;\n}\n#class1-english-runtime .max-h-\\[470px\\] {\n  max-height: 470px;\n}\n#class1-english-runtime .min-h-\\[48px\\] {\n  min-height: 48px;\n}\n#class1-english-runtime .min-h-\\[50px\\] {\n  min-height: 50px;\n}\n#class1-english-runtime .min-h-\\[52px\\] {\n  min-height: 52px;\n}\n#class1-english-runtime .min-h-\\[54px\\] {\n  min-height: 54px;\n}\n#class1-english-runtime .min-h-\\[60px\\] {\n  min-height: 60px;\n}\n#class1-english-runtime .min-h-\\[62px\\] {\n  min-height: 62px;\n}\n#class1-english-runtime .min-h-\\[64px\\] {\n  min-height: 64px;\n}\n#class1-english-runtime .min-h-\\[66px\\] {\n  min-height: 66px;\n}\n#class1-english-runtime .min-h-\\[68px\\] {\n  min-height: 68px;\n}\n#class1-english-runtime .min-h-\\[70px\\] {\n  min-height: 70px;\n}\n#class1-english-runtime .min-h-\\[72px\\] {\n  min-height: 72px;\n}\n#class1-english-runtime .min-h-\\[74px\\] {\n  min-height: 74px;\n}\n#class1-english-runtime .min-h-\\[82px\\] {\n  min-height: 82px;\n}\n#class1-english-runtime .min-h-\\[92px\\] {\n  min-height: 92px;\n}\n#class1-english-runtime .min-h-\\[98px\\] {\n  min-height: 98px;\n}\n#class1-english-runtime .min-h-\\[128px\\] {\n  min-height: 128px;\n}\n#class1-english-runtime .min-h-\\[142px\\] {\n  min-height: 142px;\n}\n#class1-english-runtime .min-h-\\[150px\\] {\n  min-height: 150px;\n}\n#class1-english-runtime .min-h-\\[170px\\] {\n  min-height: 170px;\n}\n#class1-english-runtime .min-h-\\[180px\\] {\n  min-height: 180px;\n}\n#class1-english-runtime .min-h-\\[230px\\] {\n  min-height: 230px;\n}\n#class1-english-runtime .min-h-\\[235px\\] {\n  min-height: 235px;\n}\n#class1-english-runtime .min-h-\\[250px\\] {\n  min-height: 250px;\n}\n#class1-english-runtime .min-h-\\[280px\\] {\n  min-height: 280px;\n}\n#class1-english-runtime .min-h-\\[300px\\] {\n  min-height: 300px;\n}\n#class1-english-runtime .min-h-\\[330px\\] {\n  min-height: 330px;\n}\n#class1-english-runtime .min-h-\\[350px\\] {\n  min-height: 350px;\n}\n#class1-english-runtime .min-h-\\[380px\\] {\n  min-height: 380px;\n}\n#class1-english-runtime .min-h-\\[390px\\] {\n  min-height: 390px;\n}\n#class1-english-runtime .min-h-\\[420px\\] {\n  min-height: 420px;\n}\n#class1-english-runtime .min-h-\\[480px\\] {\n  min-height: 480px;\n}\n#class1-english-runtime .min-h-full {\n  min-height: 100%;\n}\n#class1-english-runtime .w-3\\/4 {\n  width: calc(3/4 * 100%);\n}\n#class1-english-runtime .w-4\\/5 {\n  width: calc(4/5 * 100%);\n}\n#class1-english-runtime .w-5 {\n  width: calc(var(--spacing) * 5);\n}\n#class1-english-runtime .w-6 {\n  width: calc(var(--spacing) * 6);\n}\n#class1-english-runtime .w-7 {\n  width: calc(var(--spacing) * 7);\n}\n#class1-english-runtime .w-8 {\n  width: calc(var(--spacing) * 8);\n}\n#class1-english-runtime .w-9 {\n  width: calc(var(--spacing) * 9);\n}\n#class1-english-runtime .w-10 {\n  width: calc(var(--spacing) * 10);\n}\n#class1-english-runtime .w-11 {\n  width: calc(var(--spacing) * 11);\n}\n#class1-english-runtime .w-12 {\n  width: calc(var(--spacing) * 12);\n}\n#class1-english-runtime .w-14 {\n  width: calc(var(--spacing) * 14);\n}\n#class1-english-runtime .w-16 {\n  width: calc(var(--spacing) * 16);\n}\n#class1-english-runtime .w-20 {\n  width: calc(var(--spacing) * 20);\n}\n#class1-english-runtime .w-24 {\n  width: calc(var(--spacing) * 24);\n}\n#class1-english-runtime .w-28 {\n  width: calc(var(--spacing) * 28);\n}\n#class1-english-runtime .w-32 {\n  width: calc(var(--spacing) * 32);\n}\n#class1-english-runtime .w-64 {\n  width: calc(var(--spacing) * 64);\n}\n#class1-english-runtime .w-\\[70px\\] {\n  width: 70px;\n}\n#class1-english-runtime .w-\\[108px\\] {\n  width: 108px;\n}\n#class1-english-runtime .w-\\[150px\\] {\n  width: 150px;\n}\n#class1-english-runtime .w-\\[180px\\] {\n  width: 180px;\n}\n#class1-english-runtime .w-\\[210px\\] {\n  width: 210px;\n}\n#class1-english-runtime .w-\\[260px\\] {\n  width: 260px;\n}\n#class1-english-runtime .w-full {\n  width: 100%;\n}\n#class1-english-runtime .max-w-2xl {\n  max-width: var(--container-2xl);\n}\n#class1-english-runtime .max-w-3xl {\n  max-width: var(--container-3xl);\n}\n#class1-english-runtime .max-w-4xl {\n  max-width: var(--container-4xl);\n}\n#class1-english-runtime .max-w-5xl {\n  max-width: var(--container-5xl);\n}\n#class1-english-runtime .max-w-6xl {\n  max-width: var(--container-6xl);\n}\n#class1-english-runtime .max-w-\\[260px\\] {\n  max-width: 260px;\n}\n#class1-english-runtime .max-w-\\[330px\\] {\n  max-width: 330px;\n}\n#class1-english-runtime .max-w-\\[350px\\] {\n  max-width: 350px;\n}\n#class1-english-runtime .max-w-\\[360px\\] {\n  max-width: 360px;\n}\n#class1-english-runtime .max-w-\\[380px\\] {\n  max-width: 380px;\n}\n#class1-english-runtime .max-w-\\[390px\\] {\n  max-width: 390px;\n}\n#class1-english-runtime .max-w-\\[430px\\] {\n  max-width: 430px;\n}\n#class1-english-runtime .max-w-\\[620px\\] {\n  max-width: 620px;\n}\n#class1-english-runtime .max-w-\\[640px\\] {\n  max-width: 640px;\n}\n#class1-english-runtime .max-w-\\[650px\\] {\n  max-width: 650px;\n}\n#class1-english-runtime .max-w-\\[660px\\] {\n  max-width: 660px;\n}\n#class1-english-runtime .max-w-\\[680px\\] {\n  max-width: 680px;\n}\n#class1-english-runtime .max-w-\\[700px\\] {\n  max-width: 700px;\n}\n#class1-english-runtime .max-w-\\[720px\\] {\n  max-width: 720px;\n}\n#class1-english-runtime .max-w-\\[760px\\] {\n  max-width: 760px;\n}\n#class1-english-runtime .max-w-md {\n  max-width: var(--container-md);\n}\n#class1-english-runtime .max-w-none {\n  max-width: none;\n}\n#class1-english-runtime .max-w-xl {\n  max-width: var(--container-xl);\n}\n#class1-english-runtime .max-w-xs {\n  max-width: var(--container-xs);\n}\n#class1-english-runtime .min-w-0 {\n  min-width: calc(var(--spacing) * 0);\n}\n#class1-english-runtime .min-w-\\[52px\\] {\n  min-width: 52px;\n}\n#class1-english-runtime .min-w-\\[78px\\] {\n  min-width: 78px;\n}\n#class1-english-runtime .min-w-\\[110px\\] {\n  min-width: 110px;\n}\n#class1-english-runtime .min-w-\\[112px\\] {\n  min-width: 112px;\n}\n#class1-english-runtime .min-w-\\[120px\\] {\n  min-width: 120px;\n}\n#class1-english-runtime .min-w-\\[140px\\] {\n  min-width: 140px;\n}\n#class1-english-runtime .min-w-\\[180px\\] {\n  min-width: 180px;\n}\n#class1-english-runtime .min-w-\\[210px\\] {\n  min-width: 210px;\n}\n#class1-english-runtime .min-w-\\[860px\\] {\n  min-width: 860px;\n}\n#class1-english-runtime .flex-1 {\n  flex: 1;\n}\n#class1-english-runtime .shrink-0 {\n  flex-shrink: 0;\n}\n#class1-english-runtime .flex-grow {\n  flex-grow: 1;\n}\n#class1-english-runtime .border-collapse {\n  border-collapse: collapse;\n}\n#class1-english-runtime .origin-center {\n  transform-origin: center;\n}\n#class1-english-runtime .-translate-x-1\\/2 {\n  --tw-translate-x: calc(calc(1/2 * 100%) * -1);\n  translate: var(--tw-translate-x) var(--tw-translate-y);\n}\n#class1-english-runtime .-translate-y-1 {\n  --tw-translate-y: calc(var(--spacing) * -1);\n  translate: var(--tw-translate-x) var(--tw-translate-y);\n}\n#class1-english-runtime .-translate-y-3 {\n  --tw-translate-y: calc(var(--spacing) * -3);\n  translate: var(--tw-translate-x) var(--tw-translate-y);\n}\n#class1-english-runtime .-translate-y-4 {\n  --tw-translate-y: calc(var(--spacing) * -4);\n  translate: var(--tw-translate-x) var(--tw-translate-y);\n}\n#class1-english-runtime .translate-y-1 {\n  --tw-translate-y: calc(var(--spacing) * 1);\n  translate: var(--tw-translate-x) var(--tw-translate-y);\n}\n#class1-english-runtime .translate-y-2 {\n  --tw-translate-y: calc(var(--spacing) * 2);\n  translate: var(--tw-translate-x) var(--tw-translate-y);\n}\n#class1-english-runtime .translate-y-5 {\n  --tw-translate-y: calc(var(--spacing) * 5);\n  translate: var(--tw-translate-x) var(--tw-translate-y);\n}\n#class1-english-runtime .scale-90 {\n  --tw-scale-x: 90%;\n  --tw-scale-y: 90%;\n  --tw-scale-z: 90%;\n  scale: var(--tw-scale-x) var(--tw-scale-y);\n}\n#class1-english-runtime .scale-\\[0\\.58\\] {\n  scale: 0.58;\n}\n#class1-english-runtime .transform {\n  transform: var(--tw-rotate-x,) var(--tw-rotate-y,) var(--tw-rotate-z,) var(--tw-skew-x,) var(--tw-skew-y,);\n}\n#class1-english-runtime .cursor-default {\n  cursor: default;\n}\n#class1-english-runtime .cursor-not-allowed {\n  cursor: not-allowed;\n}\n#class1-english-runtime .cursor-pointer {\n  cursor: pointer;\n}\n#class1-english-runtime .cursor-text {\n  cursor: text;\n}\n#class1-english-runtime .list-disc {\n  list-style-type: disc;\n}\n#class1-english-runtime .grid-cols-1 {\n  grid-template-columns: repeat(1, minmax(0, 1fr));\n}\n#class1-english-runtime .grid-cols-2 {\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n}\n#class1-english-runtime .grid-cols-3 {\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n}\n#class1-english-runtime .grid-cols-4 {\n  grid-template-columns: repeat(4, minmax(0, 1fr));\n}\n#class1-english-runtime .grid-cols-5 {\n  grid-template-columns: repeat(5, minmax(0, 1fr));\n}\n#class1-english-runtime .grid-cols-10 {\n  grid-template-columns: repeat(10, minmax(0, 1fr));\n}\n#class1-english-runtime .grid-cols-\\[0\\.9fr_1fr_1fr\\] {\n  grid-template-columns: 0.9fr 1fr 1fr;\n}\n#class1-english-runtime .grid-cols-\\[1fr_auto_1fr\\] {\n  grid-template-columns: 1fr auto 1fr;\n}\n#class1-english-runtime .grid-cols-\\[1fr_auto_1fr_auto_1fr\\] {\n  grid-template-columns: 1fr auto 1fr auto 1fr;\n}\n#class1-english-runtime .grid-cols-\\[42px_1fr\\] {\n  grid-template-columns: 42px 1fr;\n}\n#class1-english-runtime .grid-cols-\\[auto_1fr_auto\\] {\n  grid-template-columns: auto 1fr auto;\n}\n#class1-english-runtime .grid-rows-5 {\n  grid-template-rows: repeat(5, minmax(0, 1fr));\n}\n#class1-english-runtime .flex-col {\n  flex-direction: column;\n}\n#class1-english-runtime .flex-nowrap {\n  flex-wrap: nowrap;\n}\n#class1-english-runtime .flex-wrap {\n  flex-wrap: wrap;\n}\n#class1-english-runtime .items-center {\n  align-items: center;\n}\n#class1-english-runtime .items-end {\n  align-items: flex-end;\n}\n#class1-english-runtime .items-start {\n  align-items: flex-start;\n}\n#class1-english-runtime .items-stretch {\n  align-items: stretch;\n}\n#class1-english-runtime .justify-between {\n  justify-content: space-between;\n}\n#class1-english-runtime .justify-center {\n  justify-content: center;\n}\n#class1-english-runtime .justify-end {\n  justify-content: flex-end;\n}\n#class1-english-runtime .justify-start {\n  justify-content: flex-start;\n}\n#class1-english-runtime .justify-items-center {\n  justify-items: center;\n}\n#class1-english-runtime .gap-0 {\n  gap: calc(var(--spacing) * 0);\n}\n#class1-english-runtime .gap-0\\.5 {\n  gap: calc(var(--spacing) * 0.5);\n}\n#class1-english-runtime .gap-1 {\n  gap: calc(var(--spacing) * 1);\n}\n#class1-english-runtime .gap-1\\.5 {\n  gap: calc(var(--spacing) * 1.5);\n}\n#class1-english-runtime .gap-2 {\n  gap: calc(var(--spacing) * 2);\n}\n#class1-english-runtime .gap-2\\.5 {\n  gap: calc(var(--spacing) * 2.5);\n}\n#class1-english-runtime .gap-3 {\n  gap: calc(var(--spacing) * 3);\n}\n#class1-english-runtime .gap-4 {\n  gap: calc(var(--spacing) * 4);\n}\n#class1-english-runtime .gap-5 {\n  gap: calc(var(--spacing) * 5);\n}\n#class1-english-runtime .gap-6 {\n  gap: calc(var(--spacing) * 6);\n}\n#class1-english-runtime .gap-7 {\n  gap: calc(var(--spacing) * 7);\n}\n#class1-english-runtime .gap-8 {\n  gap: calc(var(--spacing) * 8);\n}\n#class1-english-runtime .gap-10 {\n  gap: calc(var(--spacing) * 10);\n}\n#class1-english-runtime .gap-20 {\n  gap: calc(var(--spacing) * 20);\n}\n#class1-english-runtime .gap-\\[2px\\] {\n  gap: 2px;\n}\n#class1-english-runtime .space-y-0\\.5 {\n  #class1-english-runtime :where(& > :not(:last-child)) {\n    --tw-space-y-reverse: 0;\n    margin-block-start: calc(calc(var(--spacing) * 0.5) * var(--tw-space-y-reverse));\n    margin-block-end: calc(calc(var(--spacing) * 0.5) * calc(1 - var(--tw-space-y-reverse)));\n  }\n}\n#class1-english-runtime .space-y-1 {\n  #class1-english-runtime :where(& > :not(:last-child)) {\n    --tw-space-y-reverse: 0;\n    margin-block-start: calc(calc(var(--spacing) * 1) * var(--tw-space-y-reverse));\n    margin-block-end: calc(calc(var(--spacing) * 1) * calc(1 - var(--tw-space-y-reverse)));\n  }\n}\n#class1-english-runtime .space-y-1\\.5 {\n  #class1-english-runtime :where(& > :not(:last-child)) {\n    --tw-space-y-reverse: 0;\n    margin-block-start: calc(calc(var(--spacing) * 1.5) * var(--tw-space-y-reverse));\n    margin-block-end: calc(calc(var(--spacing) * 1.5) * calc(1 - var(--tw-space-y-reverse)));\n  }\n}\n#class1-english-runtime .space-y-2 {\n  #class1-english-runtime :where(& > :not(:last-child)) {\n    --tw-space-y-reverse: 0;\n    margin-block-start: calc(calc(var(--spacing) * 2) * var(--tw-space-y-reverse));\n    margin-block-end: calc(calc(var(--spacing) * 2) * calc(1 - var(--tw-space-y-reverse)));\n  }\n}\n#class1-english-runtime .space-y-2\\.5 {\n  #class1-english-runtime :where(& > :not(:last-child)) {\n    --tw-space-y-reverse: 0;\n    margin-block-start: calc(calc(var(--spacing) * 2.5) * var(--tw-space-y-reverse));\n    margin-block-end: calc(calc(var(--spacing) * 2.5) * calc(1 - var(--tw-space-y-reverse)));\n  }\n}\n#class1-english-runtime .space-y-3 {\n  #class1-english-runtime :where(& > :not(:last-child)) {\n    --tw-space-y-reverse: 0;\n    margin-block-start: calc(calc(var(--spacing) * 3) * var(--tw-space-y-reverse));\n    margin-block-end: calc(calc(var(--spacing) * 3) * calc(1 - var(--tw-space-y-reverse)));\n  }\n}\n#class1-english-runtime .space-y-4 {\n  #class1-english-runtime :where(& > :not(:last-child)) {\n    --tw-space-y-reverse: 0;\n    margin-block-start: calc(calc(var(--spacing) * 4) * var(--tw-space-y-reverse));\n    margin-block-end: calc(calc(var(--spacing) * 4) * calc(1 - var(--tw-space-y-reverse)));\n  }\n}\n#class1-english-runtime .space-y-5 {\n  #class1-english-runtime :where(& > :not(:last-child)) {\n    --tw-space-y-reverse: 0;\n    margin-block-start: calc(calc(var(--spacing) * 5) * var(--tw-space-y-reverse));\n    margin-block-end: calc(calc(var(--spacing) * 5) * calc(1 - var(--tw-space-y-reverse)));\n  }\n}\n#class1-english-runtime .-space-x-3 {\n  #class1-english-runtime :where(& > :not(:last-child)) {\n    --tw-space-x-reverse: 0;\n    margin-inline-start: calc(calc(var(--spacing) * -3) * var(--tw-space-x-reverse));\n    margin-inline-end: calc(calc(var(--spacing) * -3) * calc(1 - var(--tw-space-x-reverse)));\n  }\n}\n#class1-english-runtime .space-x-1 {\n  #class1-english-runtime :where(& > :not(:last-child)) {\n    --tw-space-x-reverse: 0;\n    margin-inline-start: calc(calc(var(--spacing) * 1) * var(--tw-space-x-reverse));\n    margin-inline-end: calc(calc(var(--spacing) * 1) * calc(1 - var(--tw-space-x-reverse)));\n  }\n}\n#class1-english-runtime .space-x-1\\.5 {\n  #class1-english-runtime :where(& > :not(:last-child)) {\n    --tw-space-x-reverse: 0;\n    margin-inline-start: calc(calc(var(--spacing) * 1.5) * var(--tw-space-x-reverse));\n    margin-inline-end: calc(calc(var(--spacing) * 1.5) * calc(1 - var(--tw-space-x-reverse)));\n  }\n}\n#class1-english-runtime .space-x-2 {\n  #class1-english-runtime :where(& > :not(:last-child)) {\n    --tw-space-x-reverse: 0;\n    margin-inline-start: calc(calc(var(--spacing) * 2) * var(--tw-space-x-reverse));\n    margin-inline-end: calc(calc(var(--spacing) * 2) * calc(1 - var(--tw-space-x-reverse)));\n  }\n}\n#class1-english-runtime .space-x-2\\.5 {\n  #class1-english-runtime :where(& > :not(:last-child)) {\n    --tw-space-x-reverse: 0;\n    margin-inline-start: calc(calc(var(--spacing) * 2.5) * var(--tw-space-x-reverse));\n    margin-inline-end: calc(calc(var(--spacing) * 2.5) * calc(1 - var(--tw-space-x-reverse)));\n  }\n}\n#class1-english-runtime .space-x-3 {\n  #class1-english-runtime :where(& > :not(:last-child)) {\n    --tw-space-x-reverse: 0;\n    margin-inline-start: calc(calc(var(--spacing) * 3) * var(--tw-space-x-reverse));\n    margin-inline-end: calc(calc(var(--spacing) * 3) * calc(1 - var(--tw-space-x-reverse)));\n  }\n}\n#class1-english-runtime .divide-x {\n  #class1-english-runtime :where(& > :not(:last-child)) {\n    --tw-divide-x-reverse: 0;\n    border-inline-style: var(--tw-border-style);\n    border-inline-start-width: calc(1px * var(--tw-divide-x-reverse));\n    border-inline-end-width: calc(1px * calc(1 - var(--tw-divide-x-reverse)));\n  }\n}\n#class1-english-runtime .divide-y {\n  #class1-english-runtime :where(& > :not(:last-child)) {\n    --tw-divide-y-reverse: 0;\n    border-bottom-style: var(--tw-border-style);\n    border-top-style: var(--tw-border-style);\n    border-top-width: calc(1px * var(--tw-divide-y-reverse));\n    border-bottom-width: calc(1px * calc(1 - var(--tw-divide-y-reverse)));\n  }\n}\n#class1-english-runtime .divide-pink-100 {\n  #class1-english-runtime :where(& > :not(:last-child)) {\n    border-color: var(--color-pink-100);\n  }\n}\n#class1-english-runtime .divide-pink-200 {\n  #class1-english-runtime :where(& > :not(:last-child)) {\n    border-color: var(--color-pink-200);\n  }\n}\n#class1-english-runtime .justify-self-start {\n  justify-self: flex-start;\n}\n#class1-english-runtime .truncate {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n#class1-english-runtime .overflow-auto {\n  overflow: auto;\n}\n#class1-english-runtime .overflow-hidden {\n  overflow: hidden;\n}\n#class1-english-runtime .overflow-visible {\n  overflow: visible;\n}\n#class1-english-runtime .overflow-x-auto {\n  overflow-x: auto;\n}\n#class1-english-runtime .overflow-y-auto {\n  overflow-y: auto;\n}\n#class1-english-runtime .rounded {\n  border-radius: 0.25rem;\n}\n#class1-english-runtime .rounded-2xl {\n  border-radius: var(--radius-2xl);\n}\n#class1-english-runtime .rounded-3xl {\n  border-radius: var(--radius-3xl);\n}\n#class1-english-runtime .rounded-\\[3px\\] {\n  border-radius: 3px;\n}\n#class1-english-runtime .rounded-\\[22px\\] {\n  border-radius: 22px;\n}\n#class1-english-runtime .rounded-\\[24px\\] {\n  border-radius: 24px;\n}\n#class1-english-runtime .rounded-\\[26px\\] {\n  border-radius: 26px;\n}\n#class1-english-runtime .rounded-\\[28px\\] {\n  border-radius: 28px;\n}\n#class1-english-runtime .rounded-\\[30px\\] {\n  border-radius: 30px;\n}\n#class1-english-runtime .rounded-full {\n  border-radius: calc(infinity * 1px);\n}\n#class1-english-runtime .rounded-lg {\n  border-radius: var(--radius-lg);\n}\n#class1-english-runtime .rounded-xl {\n  border-radius: var(--radius-xl);\n}\n#class1-english-runtime .rounded-t-xl {\n  border-top-left-radius: var(--radius-xl);\n  border-top-right-radius: var(--radius-xl);\n}\n#class1-english-runtime .border {\n  border-style: var(--tw-border-style);\n  border-width: 1px;\n}\n#class1-english-runtime .border-2 {\n  border-style: var(--tw-border-style);\n  border-width: 2px;\n}\n#class1-english-runtime .border-4 {\n  border-style: var(--tw-border-style);\n  border-width: 4px;\n}\n#class1-english-runtime .border-\\[3px\\] {\n  border-style: var(--tw-border-style);\n  border-width: 3px;\n}\n#class1-english-runtime .border-t {\n  border-top-style: var(--tw-border-style);\n  border-top-width: 1px;\n}\n#class1-english-runtime .border-t-2 {\n  border-top-style: var(--tw-border-style);\n  border-top-width: 2px;\n}\n#class1-english-runtime .border-r {\n  border-right-style: var(--tw-border-style);\n  border-right-width: 1px;\n}\n#class1-english-runtime .border-b {\n  border-bottom-style: var(--tw-border-style);\n  border-bottom-width: 1px;\n}\n#class1-english-runtime .border-b-\\[3px\\] {\n  border-bottom-style: var(--tw-border-style);\n  border-bottom-width: 3px;\n}\n#class1-english-runtime .border-b-\\[4px\\] {\n  border-bottom-style: var(--tw-border-style);\n  border-bottom-width: 4px;\n}\n#class1-english-runtime .border-dashed {\n  --tw-border-style: dashed;\n  border-style: dashed;\n}\n#class1-english-runtime .border-amber-100 {\n  border-color: var(--color-amber-100);\n}\n#class1-english-runtime .border-amber-200 {\n  border-color: var(--color-amber-200);\n}\n#class1-english-runtime .border-amber-200\\/60 {\n  border-color: color-mix(in srgb, oklch(92.4% 0.12 95.746) 60%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    border-color: color-mix(in oklab, var(--color-amber-200) 60%, transparent);\n  }\n}\n#class1-english-runtime .border-amber-200\\/80 {\n  border-color: color-mix(in srgb, oklch(92.4% 0.12 95.746) 80%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    border-color: color-mix(in oklab, var(--color-amber-200) 80%, transparent);\n  }\n}\n#class1-english-runtime .border-amber-300 {\n  border-color: var(--color-amber-300);\n}\n#class1-english-runtime .border-amber-400 {\n  border-color: var(--color-amber-400);\n}\n#class1-english-runtime .border-blue-100 {\n  border-color: var(--color-blue-100);\n}\n#class1-english-runtime .border-blue-200 {\n  border-color: var(--color-blue-200);\n}\n#class1-english-runtime .border-blue-300 {\n  border-color: var(--color-blue-300);\n}\n#class1-english-runtime .border-blue-400 {\n  border-color: var(--color-blue-400);\n}\n#class1-english-runtime .border-current\\/20 {\n  border-color: currentcolor;\n  @supports (color: color-mix(in lab, red, red)) {\n    border-color: color-mix(in oklab, currentcolor 20%, transparent);\n  }\n}\n#class1-english-runtime .border-cyan-100 {\n  border-color: var(--color-cyan-100);\n}\n#class1-english-runtime .border-cyan-200 {\n  border-color: var(--color-cyan-200);\n}\n#class1-english-runtime .border-cyan-300 {\n  border-color: var(--color-cyan-300);\n}\n#class1-english-runtime .border-cyan-500 {\n  border-color: var(--color-cyan-500);\n}\n#class1-english-runtime .border-emerald-100 {\n  border-color: var(--color-emerald-100);\n}\n#class1-english-runtime .border-emerald-200 {\n  border-color: var(--color-emerald-200);\n}\n#class1-english-runtime .border-emerald-300 {\n  border-color: var(--color-emerald-300);\n}\n#class1-english-runtime .border-emerald-400 {\n  border-color: var(--color-emerald-400);\n}\n#class1-english-runtime .border-emerald-500 {\n  border-color: var(--color-emerald-500);\n}\n#class1-english-runtime .border-emerald-600 {\n  border-color: var(--color-emerald-600);\n}\n#class1-english-runtime .border-fuchsia-300 {\n  border-color: var(--color-fuchsia-300);\n}\n#class1-english-runtime .border-gray-200 {\n  border-color: var(--color-gray-200);\n}\n#class1-english-runtime .border-green-400 {\n  border-color: var(--color-green-400);\n}\n#class1-english-runtime .border-indigo-100 {\n  border-color: var(--color-indigo-100);\n}\n#class1-english-runtime .border-indigo-200 {\n  border-color: var(--color-indigo-200);\n}\n#class1-english-runtime .border-indigo-300 {\n  border-color: var(--color-indigo-300);\n}\n#class1-english-runtime .border-orange-200 {\n  border-color: var(--color-orange-200);\n}\n#class1-english-runtime .border-pink-100 {\n  border-color: var(--color-pink-100);\n}\n#class1-english-runtime .border-pink-200 {\n  border-color: var(--color-pink-200);\n}\n#class1-english-runtime .border-pink-300 {\n  border-color: var(--color-pink-300);\n}\n#class1-english-runtime .border-pink-500 {\n  border-color: var(--color-pink-500);\n}\n#class1-english-runtime .border-purple-100 {\n  border-color: var(--color-purple-100);\n}\n#class1-english-runtime .border-purple-200 {\n  border-color: var(--color-purple-200);\n}\n#class1-english-runtime .border-purple-300 {\n  border-color: var(--color-purple-300);\n}\n#class1-english-runtime .border-purple-400 {\n  border-color: var(--color-purple-400);\n}\n#class1-english-runtime .border-red-400 {\n  border-color: var(--color-red-400);\n}\n#class1-english-runtime .border-red-500 {\n  border-color: var(--color-red-500);\n}\n#class1-english-runtime .border-rose-100 {\n  border-color: var(--color-rose-100);\n}\n#class1-english-runtime .border-rose-200 {\n  border-color: var(--color-rose-200);\n}\n#class1-english-runtime .border-rose-300 {\n  border-color: var(--color-rose-300);\n}\n#class1-english-runtime .border-rose-400 {\n  border-color: var(--color-rose-400);\n}\n#class1-english-runtime .border-rose-500 {\n  border-color: var(--color-rose-500);\n}\n#class1-english-runtime .border-sky-100 {\n  border-color: var(--color-sky-100);\n}\n#class1-english-runtime .border-sky-200 {\n  border-color: var(--color-sky-200);\n}\n#class1-english-runtime .border-sky-300 {\n  border-color: var(--color-sky-300);\n}\n#class1-english-runtime .border-slate-100 {\n  border-color: var(--color-slate-100);\n}\n#class1-english-runtime .border-slate-200 {\n  border-color: var(--color-slate-200);\n}\n#class1-english-runtime .border-slate-300 {\n  border-color: var(--color-slate-300);\n}\n#class1-english-runtime .border-violet-100 {\n  border-color: var(--color-violet-100);\n}\n#class1-english-runtime .border-violet-200 {\n  border-color: var(--color-violet-200);\n}\n#class1-english-runtime .border-violet-300 {\n  border-color: var(--color-violet-300);\n}\n#class1-english-runtime .border-violet-400 {\n  border-color: var(--color-violet-400);\n}\n#class1-english-runtime .border-violet-600 {\n  border-color: var(--color-violet-600);\n}\n#class1-english-runtime .border-white {\n  border-color: var(--color-white);\n}\n#class1-english-runtime .border-white\\/15 {\n  border-color: color-mix(in srgb, #fff 15%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    border-color: color-mix(in oklab, var(--color-white) 15%, transparent);\n  }\n}\n#class1-english-runtime .border-white\\/20 {\n  border-color: color-mix(in srgb, #fff 20%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    border-color: color-mix(in oklab, var(--color-white) 20%, transparent);\n  }\n}\n#class1-english-runtime .border-yellow-200 {\n  border-color: var(--color-yellow-200);\n}\n#class1-english-runtime .bg-\\[\\#fffdf4\\] {\n  background-color: #fffdf4;\n}\n#class1-english-runtime .bg-amber-50 {\n  background-color: var(--color-amber-50);\n}\n#class1-english-runtime .bg-amber-50\\/55 {\n  background-color: color-mix(in srgb, oklch(98.7% 0.022 95.277) 55%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    background-color: color-mix(in oklab, var(--color-amber-50) 55%, transparent);\n  }\n}\n#class1-english-runtime .bg-amber-50\\/60 {\n  background-color: color-mix(in srgb, oklch(98.7% 0.022 95.277) 60%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    background-color: color-mix(in oklab, var(--color-amber-50) 60%, transparent);\n  }\n}\n#class1-english-runtime .bg-amber-50\\/70 {\n  background-color: color-mix(in srgb, oklch(98.7% 0.022 95.277) 70%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    background-color: color-mix(in oklab, var(--color-amber-50) 70%, transparent);\n  }\n}\n#class1-english-runtime .bg-amber-50\\/80 {\n  background-color: color-mix(in srgb, oklch(98.7% 0.022 95.277) 80%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    background-color: color-mix(in oklab, var(--color-amber-50) 80%, transparent);\n  }\n}\n#class1-english-runtime .bg-amber-100 {\n  background-color: var(--color-amber-100);\n}\n#class1-english-runtime .bg-amber-200 {\n  background-color: var(--color-amber-200);\n}\n#class1-english-runtime .bg-amber-500 {\n  background-color: var(--color-amber-500);\n}\n#class1-english-runtime .bg-black\\/30 {\n  background-color: color-mix(in srgb, #000 30%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    background-color: color-mix(in oklab, var(--color-black) 30%, transparent);\n  }\n}\n#class1-english-runtime .bg-blue-50 {\n  background-color: var(--color-blue-50);\n}\n#class1-english-runtime .bg-blue-50\\/65 {\n  background-color: color-mix(in srgb, oklch(97% 0.014 254.604) 65%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    background-color: color-mix(in oklab, var(--color-blue-50) 65%, transparent);\n  }\n}\n#class1-english-runtime .bg-blue-100 {\n  background-color: var(--color-blue-100);\n}\n#class1-english-runtime .bg-cyan-50 {\n  background-color: var(--color-cyan-50);\n}\n#class1-english-runtime .bg-cyan-50\\/40 {\n  background-color: color-mix(in srgb, oklch(98.4% 0.019 200.873) 40%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    background-color: color-mix(in oklab, var(--color-cyan-50) 40%, transparent);\n  }\n}\n#class1-english-runtime .bg-cyan-500 {\n  background-color: var(--color-cyan-500);\n}\n#class1-english-runtime .bg-emerald-50 {\n  background-color: var(--color-emerald-50);\n}\n#class1-english-runtime .bg-emerald-50\\/55 {\n  background-color: color-mix(in srgb, oklch(97.9% 0.021 166.113) 55%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    background-color: color-mix(in oklab, var(--color-emerald-50) 55%, transparent);\n  }\n}\n#class1-english-runtime .bg-emerald-50\\/60 {\n  background-color: color-mix(in srgb, oklch(97.9% 0.021 166.113) 60%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    background-color: color-mix(in oklab, var(--color-emerald-50) 60%, transparent);\n  }\n}\n#class1-english-runtime .bg-emerald-50\\/70 {\n  background-color: color-mix(in srgb, oklch(97.9% 0.021 166.113) 70%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    background-color: color-mix(in oklab, var(--color-emerald-50) 70%, transparent);\n  }\n}\n#class1-english-runtime .bg-emerald-50\\/80 {\n  background-color: color-mix(in srgb, oklch(97.9% 0.021 166.113) 80%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    background-color: color-mix(in oklab, var(--color-emerald-50) 80%, transparent);\n  }\n}\n#class1-english-runtime .bg-emerald-100 {\n  background-color: var(--color-emerald-100);\n}\n#class1-english-runtime .bg-emerald-400 {\n  background-color: var(--color-emerald-400);\n}\n#class1-english-runtime .bg-emerald-500 {\n  background-color: var(--color-emerald-500);\n}\n#class1-english-runtime .bg-emerald-600 {\n  background-color: var(--color-emerald-600);\n}\n#class1-english-runtime .bg-fuchsia-50\\/80 {\n  background-color: color-mix(in srgb, oklch(97.7% 0.017 320.058) 80%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    background-color: color-mix(in oklab, var(--color-fuchsia-50) 80%, transparent);\n  }\n}\n#class1-english-runtime .bg-gray-100 {\n  background-color: var(--color-gray-100);\n}\n#class1-english-runtime .bg-green-100 {\n  background-color: var(--color-green-100);\n}\n#class1-english-runtime .bg-indigo-50 {\n  background-color: var(--color-indigo-50);\n}\n#class1-english-runtime .bg-indigo-50\\/40 {\n  background-color: color-mix(in srgb, oklch(96.2% 0.018 272.314) 40%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    background-color: color-mix(in oklab, var(--color-indigo-50) 40%, transparent);\n  }\n}\n#class1-english-runtime .bg-indigo-50\\/65 {\n  background-color: color-mix(in srgb, oklch(96.2% 0.018 272.314) 65%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    background-color: color-mix(in oklab, var(--color-indigo-50) 65%, transparent);\n  }\n}\n#class1-english-runtime .bg-indigo-50\\/70 {\n  background-color: color-mix(in srgb, oklch(96.2% 0.018 272.314) 70%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    background-color: color-mix(in oklab, var(--color-indigo-50) 70%, transparent);\n  }\n}\n#class1-english-runtime .bg-indigo-50\\/80 {\n  background-color: color-mix(in srgb, oklch(96.2% 0.018 272.314) 80%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    background-color: color-mix(in oklab, var(--color-indigo-50) 80%, transparent);\n  }\n}\n#class1-english-runtime .bg-orange-50 {\n  background-color: var(--color-orange-50);\n}\n#class1-english-runtime .bg-pink-50 {\n  background-color: var(--color-pink-50);\n}\n#class1-english-runtime .bg-pink-50\\/20 {\n  background-color: color-mix(in srgb, oklch(97.1% 0.014 343.198) 20%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    background-color: color-mix(in oklab, var(--color-pink-50) 20%, transparent);\n  }\n}\n#class1-english-runtime .bg-pink-50\\/30 {\n  background-color: color-mix(in srgb, oklch(97.1% 0.014 343.198) 30%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    background-color: color-mix(in oklab, var(--color-pink-50) 30%, transparent);\n  }\n}\n#class1-english-runtime .bg-pink-50\\/40 {\n  background-color: color-mix(in srgb, oklch(97.1% 0.014 343.198) 40%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    background-color: color-mix(in oklab, var(--color-pink-50) 40%, transparent);\n  }\n}\n#class1-english-runtime .bg-pink-50\\/55 {\n  background-color: color-mix(in srgb, oklch(97.1% 0.014 343.198) 55%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    background-color: color-mix(in oklab, var(--color-pink-50) 55%, transparent);\n  }\n}\n#class1-english-runtime .bg-pink-50\\/60 {\n  background-color: color-mix(in srgb, oklch(97.1% 0.014 343.198) 60%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    background-color: color-mix(in oklab, var(--color-pink-50) 60%, transparent);\n  }\n}\n#class1-english-runtime .bg-pink-50\\/70 {\n  background-color: color-mix(in srgb, oklch(97.1% 0.014 343.198) 70%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    background-color: color-mix(in oklab, var(--color-pink-50) 70%, transparent);\n  }\n}\n#class1-english-runtime .bg-pink-50\\/80 {\n  background-color: color-mix(in srgb, oklch(97.1% 0.014 343.198) 80%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    background-color: color-mix(in oklab, var(--color-pink-50) 80%, transparent);\n  }\n}\n#class1-english-runtime .bg-pink-50\\/90 {\n  background-color: color-mix(in srgb, oklch(97.1% 0.014 343.198) 90%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    background-color: color-mix(in oklab, var(--color-pink-50) 90%, transparent);\n  }\n}\n#class1-english-runtime .bg-pink-100 {\n  background-color: var(--color-pink-100);\n}\n#class1-english-runtime .bg-pink-100\\/70 {\n  background-color: color-mix(in srgb, oklch(94.8% 0.028 342.258) 70%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    background-color: color-mix(in oklab, var(--color-pink-100) 70%, transparent);\n  }\n}\n#class1-english-runtime .bg-pink-500 {\n  background-color: var(--color-pink-500);\n}\n#class1-english-runtime .bg-purple-50 {\n  background-color: var(--color-purple-50);\n}\n#class1-english-runtime .bg-purple-50\\/60 {\n  background-color: color-mix(in srgb, oklch(97.7% 0.014 308.299) 60%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    background-color: color-mix(in oklab, var(--color-purple-50) 60%, transparent);\n  }\n}\n#class1-english-runtime .bg-purple-50\\/70 {\n  background-color: color-mix(in srgb, oklch(97.7% 0.014 308.299) 70%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    background-color: color-mix(in oklab, var(--color-purple-50) 70%, transparent);\n  }\n}\n#class1-english-runtime .bg-purple-50\\/80 {\n  background-color: color-mix(in srgb, oklch(97.7% 0.014 308.299) 80%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    background-color: color-mix(in oklab, var(--color-purple-50) 80%, transparent);\n  }\n}\n#class1-english-runtime .bg-purple-100 {\n  background-color: var(--color-purple-100);\n}\n#class1-english-runtime .bg-purple-200 {\n  background-color: var(--color-purple-200);\n}\n#class1-english-runtime .bg-red-200 {\n  background-color: var(--color-red-200);\n}\n#class1-english-runtime .bg-rose-50 {\n  background-color: var(--color-rose-50);\n}\n#class1-english-runtime .bg-rose-50\\/40 {\n  background-color: color-mix(in srgb, oklch(96.9% 0.015 12.422) 40%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    background-color: color-mix(in oklab, var(--color-rose-50) 40%, transparent);\n  }\n}\n#class1-english-runtime .bg-rose-50\\/50 {\n  background-color: color-mix(in srgb, oklch(96.9% 0.015 12.422) 50%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    background-color: color-mix(in oklab, var(--color-rose-50) 50%, transparent);\n  }\n}\n#class1-english-runtime .bg-rose-50\\/60 {\n  background-color: color-mix(in srgb, oklch(96.9% 0.015 12.422) 60%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    background-color: color-mix(in oklab, var(--color-rose-50) 60%, transparent);\n  }\n}\n#class1-english-runtime .bg-rose-50\\/70 {\n  background-color: color-mix(in srgb, oklch(96.9% 0.015 12.422) 70%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    background-color: color-mix(in oklab, var(--color-rose-50) 70%, transparent);\n  }\n}\n#class1-english-runtime .bg-rose-50\\/80 {\n  background-color: color-mix(in srgb, oklch(96.9% 0.015 12.422) 80%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    background-color: color-mix(in oklab, var(--color-rose-50) 80%, transparent);\n  }\n}\n#class1-english-runtime .bg-rose-100 {\n  background-color: var(--color-rose-100);\n}\n#class1-english-runtime .bg-rose-200 {\n  background-color: var(--color-rose-200);\n}\n#class1-english-runtime .bg-rose-300 {\n  background-color: var(--color-rose-300);\n}\n#class1-english-runtime .bg-rose-500 {\n  background-color: var(--color-rose-500);\n}\n#class1-english-runtime .bg-sky-50 {\n  background-color: var(--color-sky-50);\n}\n#class1-english-runtime .bg-sky-50\\/55 {\n  background-color: color-mix(in srgb, oklch(97.7% 0.013 236.62) 55%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    background-color: color-mix(in oklab, var(--color-sky-50) 55%, transparent);\n  }\n}\n#class1-english-runtime .bg-sky-50\\/60 {\n  background-color: color-mix(in srgb, oklch(97.7% 0.013 236.62) 60%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    background-color: color-mix(in oklab, var(--color-sky-50) 60%, transparent);\n  }\n}\n#class1-english-runtime .bg-sky-50\\/65 {\n  background-color: color-mix(in srgb, oklch(97.7% 0.013 236.62) 65%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    background-color: color-mix(in oklab, var(--color-sky-50) 65%, transparent);\n  }\n}\n#class1-english-runtime .bg-sky-50\\/70 {\n  background-color: color-mix(in srgb, oklch(97.7% 0.013 236.62) 70%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    background-color: color-mix(in oklab, var(--color-sky-50) 70%, transparent);\n  }\n}\n#class1-english-runtime .bg-sky-50\\/80 {\n  background-color: color-mix(in srgb, oklch(97.7% 0.013 236.62) 80%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    background-color: color-mix(in oklab, var(--color-sky-50) 80%, transparent);\n  }\n}\n#class1-english-runtime .bg-sky-100 {\n  background-color: var(--color-sky-100);\n}\n#class1-english-runtime .bg-sky-200 {\n  background-color: var(--color-sky-200);\n}\n#class1-english-runtime .bg-sky-300 {\n  background-color: var(--color-sky-300);\n}\n#class1-english-runtime .bg-sky-500 {\n  background-color: var(--color-sky-500);\n}\n#class1-english-runtime .bg-slate-50 {\n  background-color: var(--color-slate-50);\n}\n#class1-english-runtime .bg-slate-50\\/70 {\n  background-color: color-mix(in srgb, oklch(98.4% 0.003 247.858) 70%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    background-color: color-mix(in oklab, var(--color-slate-50) 70%, transparent);\n  }\n}\n#class1-english-runtime .bg-slate-100 {\n  background-color: var(--color-slate-100);\n}\n#class1-english-runtime .bg-slate-800 {\n  background-color: var(--color-slate-800);\n}\n#class1-english-runtime .bg-slate-900\\/50 {\n  background-color: color-mix(in srgb, oklch(20.8% 0.042 265.755) 50%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    background-color: color-mix(in oklab, var(--color-slate-900) 50%, transparent);\n  }\n}\n#class1-english-runtime .bg-slate-900\\/55 {\n  background-color: color-mix(in srgb, oklch(20.8% 0.042 265.755) 55%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    background-color: color-mix(in oklab, var(--color-slate-900) 55%, transparent);\n  }\n}\n#class1-english-runtime .bg-slate-900\\/60 {\n  background-color: color-mix(in srgb, oklch(20.8% 0.042 265.755) 60%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    background-color: color-mix(in oklab, var(--color-slate-900) 60%, transparent);\n  }\n}\n#class1-english-runtime .bg-slate-950\\/55 {\n  background-color: color-mix(in srgb, oklch(12.9% 0.042 264.695) 55%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    background-color: color-mix(in oklab, var(--color-slate-950) 55%, transparent);\n  }\n}\n#class1-english-runtime .bg-violet-50 {\n  background-color: var(--color-violet-50);\n}\n#class1-english-runtime .bg-violet-50\\/40 {\n  background-color: color-mix(in srgb, oklch(96.9% 0.016 293.756) 40%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    background-color: color-mix(in oklab, var(--color-violet-50) 40%, transparent);\n  }\n}\n#class1-english-runtime .bg-violet-50\\/50 {\n  background-color: color-mix(in srgb, oklch(96.9% 0.016 293.756) 50%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    background-color: color-mix(in oklab, var(--color-violet-50) 50%, transparent);\n  }\n}\n#class1-english-runtime .bg-violet-50\\/60 {\n  background-color: color-mix(in srgb, oklch(96.9% 0.016 293.756) 60%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    background-color: color-mix(in oklab, var(--color-violet-50) 60%, transparent);\n  }\n}\n#class1-english-runtime .bg-violet-50\\/65 {\n  background-color: color-mix(in srgb, oklch(96.9% 0.016 293.756) 65%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    background-color: color-mix(in oklab, var(--color-violet-50) 65%, transparent);\n  }\n}\n#class1-english-runtime .bg-violet-50\\/80 {\n  background-color: color-mix(in srgb, oklch(96.9% 0.016 293.756) 80%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    background-color: color-mix(in oklab, var(--color-violet-50) 80%, transparent);\n  }\n}\n#class1-english-runtime .bg-violet-100 {\n  background-color: var(--color-violet-100);\n}\n#class1-english-runtime .bg-violet-200 {\n  background-color: var(--color-violet-200);\n}\n#class1-english-runtime .bg-violet-300 {\n  background-color: var(--color-violet-300);\n}\n#class1-english-runtime .bg-violet-400 {\n  background-color: var(--color-violet-400);\n}\n#class1-english-runtime .bg-white {\n  background-color: var(--color-white);\n}\n#class1-english-runtime .bg-white\\/10 {\n  background-color: color-mix(in srgb, #fff 10%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    background-color: color-mix(in oklab, var(--color-white) 10%, transparent);\n  }\n}\n#class1-english-runtime .bg-white\\/70 {\n  background-color: color-mix(in srgb, #fff 70%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    background-color: color-mix(in oklab, var(--color-white) 70%, transparent);\n  }\n}\n#class1-english-runtime .bg-white\\/75 {\n  background-color: color-mix(in srgb, #fff 75%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    background-color: color-mix(in oklab, var(--color-white) 75%, transparent);\n  }\n}\n#class1-english-runtime .bg-white\\/80 {\n  background-color: color-mix(in srgb, #fff 80%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    background-color: color-mix(in oklab, var(--color-white) 80%, transparent);\n  }\n}\n#class1-english-runtime .bg-white\\/85 {\n  background-color: color-mix(in srgb, #fff 85%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    background-color: color-mix(in oklab, var(--color-white) 85%, transparent);\n  }\n}\n#class1-english-runtime .bg-white\\/90 {\n  background-color: color-mix(in srgb, #fff 90%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    background-color: color-mix(in oklab, var(--color-white) 90%, transparent);\n  }\n}\n#class1-english-runtime .bg-white\\/95 {\n  background-color: color-mix(in srgb, #fff 95%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    background-color: color-mix(in oklab, var(--color-white) 95%, transparent);\n  }\n}\n#class1-english-runtime .bg-gradient-to-b {\n  --tw-gradient-position: to bottom in oklab;\n  background-image: linear-gradient(var(--tw-gradient-stops));\n}\n#class1-english-runtime .bg-gradient-to-br {\n  --tw-gradient-position: to bottom right in oklab;\n  background-image: linear-gradient(var(--tw-gradient-stops));\n}\n#class1-english-runtime .bg-gradient-to-r {\n  --tw-gradient-position: to right in oklab;\n  background-image: linear-gradient(var(--tw-gradient-stops));\n}\n#class1-english-runtime .bg-gradient-to-tr {\n  --tw-gradient-position: to top right in oklab;\n  background-image: linear-gradient(var(--tw-gradient-stops));\n}\n#class1-english-runtime .from-amber-50 {\n  --tw-gradient-from: var(--color-amber-50);\n  --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n}\n#class1-english-runtime .from-amber-50\\/70 {\n  --tw-gradient-from: color-mix(in srgb, oklch(98.7% 0.022 95.277) 70%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    --tw-gradient-from: color-mix(in oklab, var(--color-amber-50) 70%, transparent);\n  }\n  --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n}\n#class1-english-runtime .from-amber-50\\/90 {\n  --tw-gradient-from: color-mix(in srgb, oklch(98.7% 0.022 95.277) 90%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    --tw-gradient-from: color-mix(in oklab, var(--color-amber-50) 90%, transparent);\n  }\n  --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n}\n#class1-english-runtime .from-amber-400 {\n  --tw-gradient-from: var(--color-amber-400);\n  --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n}\n#class1-english-runtime .from-amber-500 {\n  --tw-gradient-from: var(--color-amber-500);\n  --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n}\n#class1-english-runtime .from-cyan-50 {\n  --tw-gradient-from: var(--color-cyan-50);\n  --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n}\n#class1-english-runtime .from-cyan-700 {\n  --tw-gradient-from: var(--color-cyan-700);\n  --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n}\n#class1-english-runtime .from-emerald-50 {\n  --tw-gradient-from: var(--color-emerald-50);\n  --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n}\n#class1-english-runtime .from-emerald-500 {\n  --tw-gradient-from: var(--color-emerald-500);\n  --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n}\n#class1-english-runtime .from-fuchsia-400 {\n  --tw-gradient-from: var(--color-fuchsia-400);\n  --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n}\n#class1-english-runtime .from-orange-400 {\n  --tw-gradient-from: var(--color-orange-400);\n  --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n}\n#class1-english-runtime .from-pink-50 {\n  --tw-gradient-from: var(--color-pink-50);\n  --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n}\n#class1-english-runtime .from-pink-50\\/30 {\n  --tw-gradient-from: color-mix(in srgb, oklch(97.1% 0.014 343.198) 30%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    --tw-gradient-from: color-mix(in oklab, var(--color-pink-50) 30%, transparent);\n  }\n  --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n}\n#class1-english-runtime .from-pink-50\\/70 {\n  --tw-gradient-from: color-mix(in srgb, oklch(97.1% 0.014 343.198) 70%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    --tw-gradient-from: color-mix(in oklab, var(--color-pink-50) 70%, transparent);\n  }\n  --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n}\n#class1-english-runtime .from-pink-100 {\n  --tw-gradient-from: var(--color-pink-100);\n  --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n}\n#class1-english-runtime .from-pink-400 {\n  --tw-gradient-from: var(--color-pink-400);\n  --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n}\n#class1-english-runtime .from-pink-500 {\n  --tw-gradient-from: var(--color-pink-500);\n  --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n}\n#class1-english-runtime .from-purple-50 {\n  --tw-gradient-from: var(--color-purple-50);\n  --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n}\n#class1-english-runtime .from-purple-400 {\n  --tw-gradient-from: var(--color-purple-400);\n  --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n}\n#class1-english-runtime .from-purple-500 {\n  --tw-gradient-from: var(--color-purple-500);\n  --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n}\n#class1-english-runtime .from-rose-600 {\n  --tw-gradient-from: var(--color-rose-600);\n  --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n}\n#class1-english-runtime .from-rose-900 {\n  --tw-gradient-from: var(--color-rose-900);\n  --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n}\n#class1-english-runtime .from-sky-50 {\n  --tw-gradient-from: var(--color-sky-50);\n  --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n}\n#class1-english-runtime .from-violet-50 {\n  --tw-gradient-from: var(--color-violet-50);\n  --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n}\n#class1-english-runtime .from-violet-400 {\n  --tw-gradient-from: var(--color-violet-400);\n  --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n}\n#class1-english-runtime .from-white {\n  --tw-gradient-from: var(--color-white);\n  --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n}\n#class1-english-runtime .from-yellow-50 {\n  --tw-gradient-from: var(--color-yellow-50);\n  --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n}\n#class1-english-runtime .via-amber-50\\/20 {\n  --tw-gradient-via: color-mix(in srgb, oklch(98.7% 0.022 95.277) 20%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    --tw-gradient-via: color-mix(in oklab, var(--color-amber-50) 20%, transparent);\n  }\n  --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n  --tw-gradient-stops: var(--tw-gradient-via-stops);\n}\n#class1-english-runtime .via-emerald-50\\/20 {\n  --tw-gradient-via: color-mix(in srgb, oklch(97.9% 0.021 166.113) 20%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    --tw-gradient-via: color-mix(in oklab, var(--color-emerald-50) 20%, transparent);\n  }\n  --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n  --tw-gradient-stops: var(--tw-gradient-via-stops);\n}\n#class1-english-runtime .via-indigo-400 {\n  --tw-gradient-via: var(--color-indigo-400);\n  --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n  --tw-gradient-stops: var(--tw-gradient-via-stops);\n}\n#class1-english-runtime .via-orange-50\\/60 {\n  --tw-gradient-via: color-mix(in srgb, oklch(98% 0.016 73.684) 60%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    --tw-gradient-via: color-mix(in oklab, var(--color-orange-50) 60%, transparent);\n  }\n  --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n  --tw-gradient-stops: var(--tw-gradient-via-stops);\n}\n#class1-english-runtime .via-pink-50 {\n  --tw-gradient-via: var(--color-pink-50);\n  --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n  --tw-gradient-stops: var(--tw-gradient-via-stops);\n}\n#class1-english-runtime .via-pink-50\\/20 {\n  --tw-gradient-via: color-mix(in srgb, oklch(97.1% 0.014 343.198) 20%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    --tw-gradient-via: color-mix(in oklab, var(--color-pink-50) 20%, transparent);\n  }\n  --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n  --tw-gradient-stops: var(--tw-gradient-via-stops);\n}\n#class1-english-runtime .via-pink-950 {\n  --tw-gradient-via: var(--color-pink-950);\n  --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n  --tw-gradient-stops: var(--tw-gradient-via-stops);\n}\n#class1-english-runtime .via-purple-50\\/20 {\n  --tw-gradient-via: color-mix(in srgb, oklch(97.7% 0.014 308.299) 20%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    --tw-gradient-via: color-mix(in oklab, var(--color-purple-50) 20%, transparent);\n  }\n  --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n  --tw-gradient-stops: var(--tw-gradient-via-stops);\n}\n#class1-english-runtime .via-purple-400 {\n  --tw-gradient-via: var(--color-purple-400);\n  --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n  --tw-gradient-stops: var(--tw-gradient-via-stops);\n}\n#class1-english-runtime .via-rose-50\\/15 {\n  --tw-gradient-via: color-mix(in srgb, oklch(96.9% 0.015 12.422) 15%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    --tw-gradient-via: color-mix(in oklab, var(--color-rose-50) 15%, transparent);\n  }\n  --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n  --tw-gradient-stops: var(--tw-gradient-via-stops);\n}\n#class1-english-runtime .via-sky-50\\/20 {\n  --tw-gradient-via: color-mix(in srgb, oklch(97.7% 0.013 236.62) 20%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    --tw-gradient-via: color-mix(in oklab, var(--color-sky-50) 20%, transparent);\n  }\n  --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n  --tw-gradient-stops: var(--tw-gradient-via-stops);\n}\n#class1-english-runtime .via-violet-50\\/40 {\n  --tw-gradient-via: color-mix(in srgb, oklch(96.9% 0.016 293.756) 40%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    --tw-gradient-via: color-mix(in oklab, var(--color-violet-50) 40%, transparent);\n  }\n  --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n  --tw-gradient-stops: var(--tw-gradient-via-stops);\n}\n#class1-english-runtime .via-violet-600 {\n  --tw-gradient-via: var(--color-violet-600);\n  --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n  --tw-gradient-stops: var(--tw-gradient-via-stops);\n}\n#class1-english-runtime .via-white {\n  --tw-gradient-via: var(--color-white);\n  --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n  --tw-gradient-stops: var(--tw-gradient-via-stops);\n}\n#class1-english-runtime .to-amber-50 {\n  --tw-gradient-to: var(--color-amber-50);\n  --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n}\n#class1-english-runtime .to-amber-50\\/20 {\n  --tw-gradient-to: color-mix(in srgb, oklch(98.7% 0.022 95.277) 20%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    --tw-gradient-to: color-mix(in oklab, var(--color-amber-50) 20%, transparent);\n  }\n  --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n}\n#class1-english-runtime .to-amber-500 {\n  --tw-gradient-to: var(--color-amber-500);\n  --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n}\n#class1-english-runtime .to-emerald-50 {\n  --tw-gradient-to: var(--color-emerald-50);\n  --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n}\n#class1-english-runtime .to-fuchsia-50 {\n  --tw-gradient-to: var(--color-fuchsia-50);\n  --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n}\n#class1-english-runtime .to-indigo-50 {\n  --tw-gradient-to: var(--color-indigo-50);\n  --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n}\n#class1-english-runtime .to-indigo-50\\/20 {\n  --tw-gradient-to: color-mix(in srgb, oklch(96.2% 0.018 272.314) 20%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    --tw-gradient-to: color-mix(in oklab, var(--color-indigo-50) 20%, transparent);\n  }\n  --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n}\n#class1-english-runtime .to-indigo-50\\/30 {\n  --tw-gradient-to: color-mix(in srgb, oklch(96.2% 0.018 272.314) 30%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    --tw-gradient-to: color-mix(in oklab, var(--color-indigo-50) 30%, transparent);\n  }\n  --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n}\n#class1-english-runtime .to-indigo-400 {\n  --tw-gradient-to: var(--color-indigo-400);\n  --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n}\n#class1-english-runtime .to-indigo-500 {\n  --tw-gradient-to: var(--color-indigo-500);\n  --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n}\n#class1-english-runtime .to-orange-50 {\n  --tw-gradient-to: var(--color-orange-50);\n  --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n}\n#class1-english-runtime .to-orange-400 {\n  --tw-gradient-to: var(--color-orange-400);\n  --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n}\n#class1-english-runtime .to-orange-500 {\n  --tw-gradient-to: var(--color-orange-500);\n  --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n}\n#class1-english-runtime .to-pink-50 {\n  --tw-gradient-to: var(--color-pink-50);\n  --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n}\n#class1-english-runtime .to-pink-50\\/40 {\n  --tw-gradient-to: color-mix(in srgb, oklch(97.1% 0.014 343.198) 40%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    --tw-gradient-to: color-mix(in oklab, var(--color-pink-50) 40%, transparent);\n  }\n  --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n}\n#class1-english-runtime .to-purple-50 {\n  --tw-gradient-to: var(--color-purple-50);\n  --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n}\n#class1-english-runtime .to-purple-50\\/30 {\n  --tw-gradient-to: color-mix(in srgb, oklch(97.7% 0.014 308.299) 30%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    --tw-gradient-to: color-mix(in oklab, var(--color-purple-50) 30%, transparent);\n  }\n  --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n}\n#class1-english-runtime .to-purple-50\\/70 {\n  --tw-gradient-to: color-mix(in srgb, oklch(97.7% 0.014 308.299) 70%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    --tw-gradient-to: color-mix(in oklab, var(--color-purple-50) 70%, transparent);\n  }\n  --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n}\n#class1-english-runtime .to-purple-100 {\n  --tw-gradient-to: var(--color-purple-100);\n  --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n}\n#class1-english-runtime .to-purple-500 {\n  --tw-gradient-to: var(--color-purple-500);\n  --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n}\n#class1-english-runtime .to-purple-700 {\n  --tw-gradient-to: var(--color-purple-700);\n  --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n}\n#class1-english-runtime .to-red-600 {\n  --tw-gradient-to: var(--color-red-600);\n  --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n}\n#class1-english-runtime .to-rose-50 {\n  --tw-gradient-to: var(--color-rose-50);\n  --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n}\n#class1-english-runtime .to-rose-50\\/50 {\n  --tw-gradient-to: color-mix(in srgb, oklch(96.9% 0.015 12.422) 50%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    --tw-gradient-to: color-mix(in oklab, var(--color-rose-50) 50%, transparent);\n  }\n  --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n}\n#class1-english-runtime .to-rose-50\\/60 {\n  --tw-gradient-to: color-mix(in srgb, oklch(96.9% 0.015 12.422) 60%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    --tw-gradient-to: color-mix(in oklab, var(--color-rose-50) 60%, transparent);\n  }\n  --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n}\n#class1-english-runtime .to-rose-400 {\n  --tw-gradient-to: var(--color-rose-400);\n  --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n}\n#class1-english-runtime .to-rose-500 {\n  --tw-gradient-to: var(--color-rose-500);\n  --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n}\n#class1-english-runtime .to-rose-900 {\n  --tw-gradient-to: var(--color-rose-900);\n  --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n}\n#class1-english-runtime .to-sky-50 {\n  --tw-gradient-to: var(--color-sky-50);\n  --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n}\n#class1-english-runtime .to-sky-50\\/20 {\n  --tw-gradient-to: color-mix(in srgb, oklch(97.7% 0.013 236.62) 20%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    --tw-gradient-to: color-mix(in oklab, var(--color-sky-50) 20%, transparent);\n  }\n  --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n}\n#class1-english-runtime .to-sky-50\\/30 {\n  --tw-gradient-to: color-mix(in srgb, oklch(97.7% 0.013 236.62) 30%, transparent);\n  @supports (color: color-mix(in lab, red, red)) {\n    --tw-gradient-to: color-mix(in oklab, var(--color-sky-50) 30%, transparent);\n  }\n  --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n}\n#class1-english-runtime .to-sky-400 {\n  --tw-gradient-to: var(--color-sky-400);\n  --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n}\n#class1-english-runtime .to-teal-500 {\n  --tw-gradient-to: var(--color-teal-500);\n  --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n}\n#class1-english-runtime .to-violet-50 {\n  --tw-gradient-to: var(--color-violet-50);\n  --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n}\n#class1-english-runtime .to-violet-500 {\n  --tw-gradient-to: var(--color-violet-500);\n  --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n}\n#class1-english-runtime .bg-clip-text {\n  background-clip: text;\n}\n#class1-english-runtime .object-contain {\n  object-fit: contain;\n}\n#class1-english-runtime .object-cover {\n  object-fit: cover;\n}\n#class1-english-runtime .p-0 {\n  padding: calc(var(--spacing) * 0);\n}\n#class1-english-runtime .p-1 {\n  padding: calc(var(--spacing) * 1);\n}\n#class1-english-runtime .p-2 {\n  padding: calc(var(--spacing) * 2);\n}\n#class1-english-runtime .p-2\\.5 {\n  padding: calc(var(--spacing) * 2.5);\n}\n#class1-english-runtime .p-3 {\n  padding: calc(var(--spacing) * 3);\n}\n#class1-english-runtime .p-3\\.5 {\n  padding: calc(var(--spacing) * 3.5);\n}\n#class1-english-runtime .p-4 {\n  padding: calc(var(--spacing) * 4);\n}\n#class1-english-runtime .p-5 {\n  padding: calc(var(--spacing) * 5);\n}\n#class1-english-runtime .p-6 {\n  padding: calc(var(--spacing) * 6);\n}\n#class1-english-runtime .px-1 {\n  padding-inline: calc(var(--spacing) * 1);\n}\n#class1-english-runtime .px-1\\.5 {\n  padding-inline: calc(var(--spacing) * 1.5);\n}\n#class1-english-runtime .px-2 {\n  padding-inline: calc(var(--spacing) * 2);\n}\n#class1-english-runtime .px-2\\.5 {\n  padding-inline: calc(var(--spacing) * 2.5);\n}\n#class1-english-runtime .px-3 {\n  padding-inline: calc(var(--spacing) * 3);\n}\n#class1-english-runtime .px-3\\.5 {\n  padding-inline: calc(var(--spacing) * 3.5);\n}\n#class1-english-runtime .px-4 {\n  padding-inline: calc(var(--spacing) * 4);\n}\n#class1-english-runtime .px-5 {\n  padding-inline: calc(var(--spacing) * 5);\n}\n#class1-english-runtime .px-6 {\n  padding-inline: calc(var(--spacing) * 6);\n}\n#class1-english-runtime .px-8 {\n  padding-inline: calc(var(--spacing) * 8);\n}\n#class1-english-runtime .py-0\\.5 {\n  padding-block: calc(var(--spacing) * 0.5);\n}\n#class1-english-runtime .py-1 {\n  padding-block: calc(var(--spacing) * 1);\n}\n#class1-english-runtime .py-1\\.5 {\n  padding-block: calc(var(--spacing) * 1.5);\n}\n#class1-english-runtime .py-2 {\n  padding-block: calc(var(--spacing) * 2);\n}\n#class1-english-runtime .py-2\\.5 {\n  padding-block: calc(var(--spacing) * 2.5);\n}\n#class1-english-runtime .py-3 {\n  padding-block: calc(var(--spacing) * 3);\n}\n#class1-english-runtime .py-3\\.5 {\n  padding-block: calc(var(--spacing) * 3.5);\n}\n#class1-english-runtime .py-4 {\n  padding-block: calc(var(--spacing) * 4);\n}\n#class1-english-runtime .py-5 {\n  padding-block: calc(var(--spacing) * 5);\n}\n#class1-english-runtime .py-6 {\n  padding-block: calc(var(--spacing) * 6);\n}\n#class1-english-runtime .py-8 {\n  padding-block: calc(var(--spacing) * 8);\n}\n#class1-english-runtime .py-14 {\n  padding-block: calc(var(--spacing) * 14);\n}\n#class1-english-runtime .py-16 {\n  padding-block: calc(var(--spacing) * 16);\n}\n#class1-english-runtime .pt-0 {\n  padding-top: calc(var(--spacing) * 0);\n}\n#class1-english-runtime .pt-0\\.5 {\n  padding-top: calc(var(--spacing) * 0.5);\n}\n#class1-english-runtime .pt-1 {\n  padding-top: calc(var(--spacing) * 1);\n}\n#class1-english-runtime .pt-2 {\n  padding-top: calc(var(--spacing) * 2);\n}\n#class1-english-runtime .pt-3 {\n  padding-top: calc(var(--spacing) * 3);\n}\n#class1-english-runtime .pt-4 {\n  padding-top: calc(var(--spacing) * 4);\n}\n#class1-english-runtime .pt-5 {\n  padding-top: calc(var(--spacing) * 5);\n}\n#class1-english-runtime .pr-3 {\n  padding-right: calc(var(--spacing) * 3);\n}\n#class1-english-runtime .pr-4 {\n  padding-right: calc(var(--spacing) * 4);\n}\n#class1-english-runtime .pb-1 {\n  padding-bottom: calc(var(--spacing) * 1);\n}\n#class1-english-runtime .pb-1\\.5 {\n  padding-bottom: calc(var(--spacing) * 1.5);\n}\n#class1-english-runtime .pb-2 {\n  padding-bottom: calc(var(--spacing) * 2);\n}\n#class1-english-runtime .pb-4 {\n  padding-bottom: calc(var(--spacing) * 4);\n}\n#class1-english-runtime .pb-\\[4px\\] {\n  padding-bottom: 4px;\n}\n#class1-english-runtime .pb-\\[5px\\] {\n  padding-bottom: 5px;\n}\n#class1-english-runtime .pl-4 {\n  padding-left: calc(var(--spacing) * 4);\n}\n#class1-english-runtime .pl-5 {\n  padding-left: calc(var(--spacing) * 5);\n}\n#class1-english-runtime .pl-10 {\n  padding-left: calc(var(--spacing) * 10);\n}\n#class1-english-runtime .pl-11 {\n  padding-left: calc(var(--spacing) * 11);\n}\n#class1-english-runtime .text-center {\n  text-align: center;\n}\n#class1-english-runtime .text-left {\n  text-align: left;\n}\n#class1-english-runtime .text-right {\n  text-align: right;\n}\n#class1-english-runtime .align-middle {\n  vertical-align: middle;\n}\n#class1-english-runtime .text-2xl {\n  font-size: var(--text-2xl);\n  line-height: var(--tw-leading, var(--text-2xl--line-height));\n}\n#class1-english-runtime .text-3xl {\n  font-size: var(--text-3xl);\n  line-height: var(--tw-leading, var(--text-3xl--line-height));\n}\n#class1-english-runtime .text-4xl {\n  font-size: var(--text-4xl);\n  line-height: var(--tw-leading, var(--text-4xl--line-height));\n}\n#class1-english-runtime .text-5xl {\n  font-size: var(--text-5xl);\n  line-height: var(--tw-leading, var(--text-5xl--line-height));\n}\n#class1-english-runtime .text-6xl {\n  font-size: var(--text-6xl);\n  line-height: var(--tw-leading, var(--text-6xl--line-height));\n}\n#class1-english-runtime .text-7xl {\n  font-size: var(--text-7xl);\n  line-height: var(--tw-leading, var(--text-7xl--line-height));\n}\n#class1-english-runtime .text-8xl {\n  font-size: var(--text-8xl);\n  line-height: var(--tw-leading, var(--text-8xl--line-height));\n}\n#class1-english-runtime .text-base {\n  font-size: var(--text-base);\n  line-height: var(--tw-leading, var(--text-base--line-height));\n}\n#class1-english-runtime .text-lg {\n  font-size: var(--text-lg);\n  line-height: var(--tw-leading, var(--text-lg--line-height));\n}\n#class1-english-runtime .text-sm {\n  font-size: var(--text-sm);\n  line-height: var(--tw-leading, var(--text-sm--line-height));\n}\n#class1-english-runtime .text-xl {\n  font-size: var(--text-xl);\n  line-height: var(--tw-leading, var(--text-xl--line-height));\n}\n#class1-english-runtime .text-xs {\n  font-size: var(--text-xs);\n  line-height: var(--tw-leading, var(--text-xs--line-height));\n}\n#class1-english-runtime .text-\\[9px\\] {\n  font-size: 9px;\n}\n#class1-english-runtime .text-\\[10px\\] {\n  font-size: 10px;\n}\n#class1-english-runtime .text-\\[11px\\] {\n  font-size: 11px;\n}\n#class1-english-runtime .text-\\[12px\\] {\n  font-size: 12px;\n}\n#class1-english-runtime .text-\\[13px\\] {\n  font-size: 13px;\n}\n#class1-english-runtime .text-\\[17px\\] {\n  font-size: 17px;\n}\n#class1-english-runtime .text-\\[24px\\] {\n  font-size: 24px;\n}\n#class1-english-runtime .text-\\[26px\\] {\n  font-size: 26px;\n}\n#class1-english-runtime .text-\\[27px\\] {\n  font-size: 27px;\n}\n#class1-english-runtime .text-\\[30px\\] {\n  font-size: 30px;\n}\n#class1-english-runtime .text-\\[34px\\] {\n  font-size: 34px;\n}\n#class1-english-runtime .text-\\[38px\\] {\n  font-size: 38px;\n}\n#class1-english-runtime .text-\\[42px\\] {\n  font-size: 42px;\n}\n#class1-english-runtime .text-\\[46px\\] {\n  font-size: 46px;\n}\n#class1-english-runtime .text-\\[52px\\] {\n  font-size: 52px;\n}\n#class1-english-runtime .text-\\[58px\\] {\n  font-size: 58px;\n}\n#class1-english-runtime .text-\\[60px\\] {\n  font-size: 60px;\n}\n#class1-english-runtime .text-\\[64px\\] {\n  font-size: 64px;\n}\n#class1-english-runtime .text-\\[70px\\] {\n  font-size: 70px;\n}\n#class1-english-runtime .text-\\[78px\\] {\n  font-size: 78px;\n}\n#class1-english-runtime .text-\\[82px\\] {\n  font-size: 82px;\n}\n#class1-english-runtime .text-\\[95px\\] {\n  font-size: 95px;\n}\n#class1-english-runtime .text-\\[110px\\] {\n  font-size: 110px;\n}\n#class1-english-runtime .text-\\[120px\\] {\n  font-size: 120px;\n}\n#class1-english-runtime .leading-5 {\n  --tw-leading: calc(var(--spacing) * 5);\n  line-height: calc(var(--spacing) * 5);\n}\n#class1-english-runtime .leading-7 {\n  --tw-leading: calc(var(--spacing) * 7);\n  line-height: calc(var(--spacing) * 7);\n}\n#class1-english-runtime .leading-\\[1\\.7\\] {\n  --tw-leading: 1.7;\n  line-height: 1.7;\n}\n#class1-english-runtime .leading-\\[1\\.22\\] {\n  --tw-leading: 1.22;\n  line-height: 1.22;\n}\n#class1-english-runtime .leading-\\[1\\.24\\] {\n  --tw-leading: 1.24;\n  line-height: 1.24;\n}\n#class1-english-runtime .leading-\\[1\\.25\\] {\n  --tw-leading: 1.25;\n  line-height: 1.25;\n}\n#class1-english-runtime .leading-none {\n  --tw-leading: 1;\n  line-height: 1;\n}\n#class1-english-runtime .leading-normal {\n  --tw-leading: var(--leading-normal);\n  line-height: var(--leading-normal);\n}\n#class1-english-runtime .leading-relaxed {\n  --tw-leading: var(--leading-relaxed);\n  line-height: var(--leading-relaxed);\n}\n#class1-english-runtime .leading-snug {\n  --tw-leading: var(--leading-snug);\n  line-height: var(--leading-snug);\n}\n#class1-english-runtime .leading-tight {\n  --tw-leading: var(--leading-tight);\n  line-height: var(--leading-tight);\n}\n#class1-english-runtime .font-black {\n  --tw-font-weight: var(--font-weight-black);\n  font-weight: var(--font-weight-black);\n}\n#class1-english-runtime .font-bold {\n  --tw-font-weight: var(--font-weight-bold);\n  font-weight: var(--font-weight-bold);\n}\n#class1-english-runtime .font-extrabold {\n  --tw-font-weight: var(--font-weight-extrabold);\n  font-weight: var(--font-weight-extrabold);\n}\n#class1-english-runtime .font-semibold {\n  --tw-font-weight: var(--font-weight-semibold);\n  font-weight: var(--font-weight-semibold);\n}\n#class1-english-runtime .tracking-\\[\\.16em\\] {\n  --tw-tracking: .16em;\n  letter-spacing: .16em;\n}\n#class1-english-runtime .tracking-\\[\\.26em\\] {\n  --tw-tracking: .26em;\n  letter-spacing: .26em;\n}\n#class1-english-runtime .tracking-\\[\\.35em\\] {\n  --tw-tracking: .35em;\n  letter-spacing: .35em;\n}\n#class1-english-runtime .tracking-\\[0\\.06em\\] {\n  --tw-tracking: 0.06em;\n  letter-spacing: 0.06em;\n}\n#class1-english-runtime .tracking-tight {\n  --tw-tracking: var(--tracking-tight);\n  letter-spacing: var(--tracking-tight);\n}\n#class1-english-runtime .tracking-wide {\n  --tw-tracking: var(--tracking-wide);\n  letter-spacing: var(--tracking-wide);\n}\n#class1-english-runtime .tracking-wider {\n  --tw-tracking: var(--tracking-wider);\n  letter-spacing: var(--tracking-wider);\n}\n#class1-english-runtime .break-words {\n  overflow-wrap: break-word;\n}\n#class1-english-runtime .whitespace-nowrap {\n  white-space: nowrap;\n}\n#class1-english-runtime .whitespace-pre-line {\n  white-space: pre-line;\n}\n#class1-english-runtime .text-amber-300 {\n  color: var(--color-amber-300);\n}\n#class1-english-runtime .text-amber-600 {\n  color: var(--color-amber-600);\n}\n#class1-english-runtime .text-amber-700 {\n  color: var(--color-amber-700);\n}\n#class1-english-runtime .text-amber-800 {\n  color: var(--color-amber-800);\n}\n#class1-english-runtime .text-amber-900 {\n  color: var(--color-amber-900);\n}\n#class1-english-runtime .text-amber-950 {\n  color: var(--color-amber-950);\n}\n#class1-english-runtime .text-blue-700 {\n  color: var(--color-blue-700);\n}\n#class1-english-runtime .text-blue-800 {\n  color: var(--color-blue-800);\n}\n#class1-english-runtime .text-cyan-500 {\n  color: var(--color-cyan-500);\n}\n#class1-english-runtime .text-cyan-600 {\n  color: var(--color-cyan-600);\n}\n#class1-english-runtime .text-cyan-700 {\n  color: var(--color-cyan-700);\n}\n#class1-english-runtime .text-cyan-800 {\n  color: var(--color-cyan-800);\n}\n#class1-english-runtime .text-emerald-300 {\n  color: var(--color-emerald-300);\n}\n#class1-english-runtime .text-emerald-500 {\n  color: var(--color-emerald-500);\n}\n#class1-english-runtime .text-emerald-600 {\n  color: var(--color-emerald-600);\n}\n#class1-english-runtime .text-emerald-700 {\n  color: var(--color-emerald-700);\n}\n#class1-english-runtime .text-emerald-800 {\n  color: var(--color-emerald-800);\n}\n#class1-english-runtime .text-emerald-900 {\n  color: var(--color-emerald-900);\n}\n#class1-english-runtime .text-fuchsia-500 {\n  color: var(--color-fuchsia-500);\n}\n#class1-english-runtime .text-fuchsia-600 {\n  color: var(--color-fuchsia-600);\n}\n#class1-english-runtime .text-fuchsia-700 {\n  color: var(--color-fuchsia-700);\n}\n#class1-english-runtime .text-gray-400 {\n  color: var(--color-gray-400);\n}\n#class1-english-runtime .text-gray-500 {\n  color: var(--color-gray-500);\n}\n#class1-english-runtime .text-gray-600 {\n  color: var(--color-gray-600);\n}\n#class1-english-runtime .text-gray-700 {\n  color: var(--color-gray-700);\n}\n#class1-english-runtime .text-gray-800 {\n  color: var(--color-gray-800);\n}\n#class1-english-runtime .text-gray-900 {\n  color: var(--color-gray-900);\n}\n#class1-english-runtime .text-green-800 {\n  color: var(--color-green-800);\n}\n#class1-english-runtime .text-indigo-500 {\n  color: var(--color-indigo-500);\n}\n#class1-english-runtime .text-indigo-600 {\n  color: var(--color-indigo-600);\n}\n#class1-english-runtime .text-indigo-700 {\n  color: var(--color-indigo-700);\n}\n#class1-english-runtime .text-indigo-800 {\n  color: var(--color-indigo-800);\n}\n#class1-english-runtime .text-orange-600 {\n  color: var(--color-orange-600);\n}\n#class1-english-runtime .text-pink-200 {\n  color: var(--color-pink-200);\n}\n#class1-english-runtime .text-pink-300 {\n  color: var(--color-pink-300);\n}\n#class1-english-runtime .text-pink-400 {\n  color: var(--color-pink-400);\n}\n#class1-english-runtime .text-pink-500 {\n  color: var(--color-pink-500);\n}\n#class1-english-runtime .text-pink-600 {\n  color: var(--color-pink-600);\n}\n#class1-english-runtime .text-pink-700 {\n  color: var(--color-pink-700);\n}\n#class1-english-runtime .text-pink-800 {\n  color: var(--color-pink-800);\n}\n#class1-english-runtime .text-pink-950 {\n  color: var(--color-pink-950);\n}\n#class1-english-runtime .text-purple-400 {\n  color: var(--color-purple-400);\n}\n#class1-english-runtime .text-purple-500 {\n  color: var(--color-purple-500);\n}\n#class1-english-runtime .text-purple-600 {\n  color: var(--color-purple-600);\n}\n#class1-english-runtime .text-purple-700 {\n  color: var(--color-purple-700);\n}\n#class1-english-runtime .text-purple-800 {\n  color: var(--color-purple-800);\n}\n#class1-english-runtime .text-red-500 {\n  color: var(--color-red-500);\n}\n#class1-english-runtime .text-red-800 {\n  color: var(--color-red-800);\n}\n#class1-english-runtime .text-red-900 {\n  color: var(--color-red-900);\n}\n#class1-english-runtime .text-rose-400 {\n  color: var(--color-rose-400);\n}\n#class1-english-runtime .text-rose-500 {\n  color: var(--color-rose-500);\n}\n#class1-english-runtime .text-rose-600 {\n  color: var(--color-rose-600);\n}\n#class1-english-runtime .text-rose-700 {\n  color: var(--color-rose-700);\n}\n#class1-english-runtime .text-rose-800 {\n  color: var(--color-rose-800);\n}\n#class1-english-runtime .text-sky-600 {\n  color: var(--color-sky-600);\n}\n#class1-english-runtime .text-sky-700 {\n  color: var(--color-sky-700);\n}\n#class1-english-runtime .text-slate-200 {\n  color: var(--color-slate-200);\n}\n#class1-english-runtime .text-slate-300 {\n  color: var(--color-slate-300);\n}\n#class1-english-runtime .text-slate-400 {\n  color: var(--color-slate-400);\n}\n#class1-english-runtime .text-slate-500 {\n  color: var(--color-slate-500);\n}\n#class1-english-runtime .text-slate-600 {\n  color: var(--color-slate-600);\n}\n#class1-english-runtime .text-slate-700 {\n  color: var(--color-slate-700);\n}\n#class1-english-runtime .text-slate-800 {\n  color: var(--color-slate-800);\n}\n#class1-english-runtime .text-slate-900 {\n  color: var(--color-slate-900);\n}\n#class1-english-runtime .text-teal-600 {\n  color: var(--color-teal-600);\n}\n#class1-english-runtime .text-transparent {\n  color: transparent;\n}\n#class1-english-runtime .text-violet-200 {\n  color: var(--color-violet-200);\n}\n#class1-english-runtime .text-violet-500 {\n  color: var(--color-violet-500);\n}\n#class1-english-runtime .text-violet-600 {\n  color: var(--color-violet-600);\n}\n#class1-english-runtime .text-violet-700 {\n  color: var(--color-violet-700);\n}\n#class1-english-runtime .text-violet-800 {\n  color: var(--color-violet-800);\n}\n#class1-english-runtime .text-white {\n  color: var(--color-white);\n}\n#class1-english-runtime .uppercase {\n  text-transform: uppercase;\n}\n#class1-english-runtime .underline {\n  text-decoration-line: underline;\n}\n#class1-english-runtime .decoration-4 {\n  text-decoration-thickness: 4px;\n}\n#class1-english-runtime .underline-offset-8 {\n  text-underline-offset: 8px;\n}\n#class1-english-runtime .placeholder-gray-300 {\n  #class1-english-runtime &::placeholder {\n    color: var(--color-gray-300);\n  }\n}\n#class1-english-runtime .accent-emerald-500 {\n  accent-color: var(--color-emerald-500);\n}\n#class1-english-runtime .opacity-0 {\n  opacity: 0%;\n}\n#class1-english-runtime .opacity-25 {\n  opacity: 25%;\n}\n#class1-english-runtime .opacity-30 {\n  opacity: 30%;\n}\n#class1-english-runtime .opacity-40 {\n  opacity: 40%;\n}\n#class1-english-runtime .opacity-45 {\n  opacity: 45%;\n}\n#class1-english-runtime .opacity-60 {\n  opacity: 60%;\n}\n#class1-english-runtime .opacity-70 {\n  opacity: 70%;\n}\n#class1-english-runtime .opacity-75 {\n  opacity: 75%;\n}\n#class1-english-runtime .opacity-80 {\n  opacity: 80%;\n}\n#class1-english-runtime .shadow {\n  --tw-shadow: 0 1px 3px 0 var(--tw-shadow-color, rgb(0 0 0 / 0.1)), 0 1px 2px -1px var(--tw-shadow-color, rgb(0 0 0 / 0.1));\n  box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);\n}\n#class1-english-runtime .shadow-2xl {\n  --tw-shadow: 0 25px 50px -12px var(--tw-shadow-color, rgb(0 0 0 / 0.25));\n  box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);\n}\n#class1-english-runtime .shadow-inner {\n  --tw-shadow: inset 0 2px 4px 0 var(--tw-shadow-color, rgb(0 0 0 / 0.05));\n  box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);\n}\n#class1-english-runtime .shadow-md {\n  --tw-shadow: 0 4px 6px -1px var(--tw-shadow-color, rgb(0 0 0 / 0.1)), 0 2px 4px -2px var(--tw-shadow-color, rgb(0 0 0 / 0.1));\n  box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);\n}\n#class1-english-runtime .shadow-sm {\n  --tw-shadow: 0 1px 3px 0 var(--tw-shadow-color, rgb(0 0 0 / 0.1)), 0 1px 2px -1px var(--tw-shadow-color, rgb(0 0 0 / 0.1));\n  box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);\n}\n#class1-english-runtime .shadow-xl {\n  --tw-shadow: 0 20px 25px -5px var(--tw-shadow-color, rgb(0 0 0 / 0.1)), 0 8px 10px -6px var(--tw-shadow-color, rgb(0 0 0 / 0.1));\n  box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);\n}\n#class1-english-runtime .shadow-xs {\n  --tw-shadow: 0 1px 2px 0 var(--tw-shadow-color, rgb(0 0 0 / 0.05));\n  box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);\n}\n#class1-english-runtime .ring {\n  --tw-ring-shadow: var(--tw-ring-inset,) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color, currentcolor);\n  box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);\n}\n#class1-english-runtime .ring-2 {\n  --tw-ring-shadow: var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color, currentcolor);\n  box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);\n}\n#class1-english-runtime .ring-4 {\n  --tw-ring-shadow: var(--tw-ring-inset,) 0 0 0 calc(4px + var(--tw-ring-offset-width)) var(--tw-ring-color, currentcolor);\n  box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);\n}\n#class1-english-runtime .ring-amber-200 {\n  --tw-ring-color: var(--color-amber-200);\n}\n#class1-english-runtime .ring-amber-300 {\n  --tw-ring-color: var(--color-amber-300);\n}\n#class1-english-runtime .ring-emerald-200 {\n  --tw-ring-color: var(--color-emerald-200);\n}\n#class1-english-runtime .ring-pink-200 {\n  --tw-ring-color: var(--color-pink-200);\n}\n#class1-english-runtime .ring-purple-200 {\n  --tw-ring-color: var(--color-purple-200);\n}\n#class1-english-runtime .ring-rose-200 {\n  --tw-ring-color: var(--color-rose-200);\n}\n#class1-english-runtime .ring-violet-200 {\n  --tw-ring-color: var(--color-violet-200);\n}\n#class1-english-runtime .grayscale-\\[25\\%\\] {\n  --tw-grayscale: grayscale(25%);\n  filter: var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,);\n}\n#class1-english-runtime .filter {\n  filter: var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,);\n}\n#class1-english-runtime .backdrop-blur-md {\n  --tw-backdrop-blur: blur(var(--blur-md));\n  -webkit-backdrop-filter: var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);\n  backdrop-filter: var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);\n}\n#class1-english-runtime .backdrop-blur-sm {\n  --tw-backdrop-blur: blur(var(--blur-sm));\n  -webkit-backdrop-filter: var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);\n  backdrop-filter: var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);\n}\n#class1-english-runtime .backdrop-blur-xs {\n  --tw-backdrop-blur: blur(var(--blur-xs));\n  -webkit-backdrop-filter: var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);\n  backdrop-filter: var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);\n}\n#class1-english-runtime .transition-all {\n  transition-property: all;\n  transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));\n  transition-duration: var(--tw-duration, var(--default-transition-duration));\n}\n#class1-english-runtime .transition-colors {\n  transition-property: color, background-color, border-color, outline-color, text-decoration-color, fill, stroke, --tw-gradient-from, --tw-gradient-via, --tw-gradient-to;\n  transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));\n  transition-duration: var(--tw-duration, var(--default-transition-duration));\n}\n#class1-english-runtime .transition-shadow {\n  transition-property: box-shadow;\n  transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));\n  transition-duration: var(--tw-duration, var(--default-transition-duration));\n}\n#class1-english-runtime .transition-transform {\n  transition-property: transform, translate, scale, rotate;\n  transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));\n  transition-duration: var(--tw-duration, var(--default-transition-duration));\n}\n#class1-english-runtime .duration-150 {\n  --tw-duration: 150ms;\n  transition-duration: 150ms;\n}\n#class1-english-runtime .duration-200 {\n  --tw-duration: 200ms;\n  transition-duration: 200ms;\n}\n#class1-english-runtime .duration-500 {\n  --tw-duration: 500ms;\n  transition-duration: 500ms;\n}\n#class1-english-runtime .ease-in-out {\n  --tw-ease: var(--ease-in-out);\n  transition-timing-function: var(--ease-in-out);\n}\n#class1-english-runtime .outline-none {\n  --tw-outline-style: none;\n  outline-style: none;\n}\n#class1-english-runtime .select-none {\n  -webkit-user-select: none;\n  user-select: none;\n}\n#class1-english-runtime .select-text {\n  -webkit-user-select: text;\n  user-select: text;\n}\n#class1-english-runtime .group-hover\\:scale-110 {\n  #class1-english-runtime &:is(:where(.group):hover *) {\n    @media (hover: hover) {\n      --tw-scale-x: 110%;\n      --tw-scale-y: 110%;\n      --tw-scale-z: 110%;\n      scale: var(--tw-scale-x) var(--tw-scale-y);\n    }\n  }\n}\n#class1-english-runtime .last\\:border-b-0 {\n  #class1-english-runtime &:last-child {\n    border-bottom-style: var(--tw-border-style);\n    border-bottom-width: 0px;\n  }\n}\n#class1-english-runtime .hover\\:-translate-y-0\\.5 {\n  #class1-english-runtime &:hover {\n    @media (hover: hover) {\n      --tw-translate-y: calc(var(--spacing) * -0.5);\n      translate: var(--tw-translate-x) var(--tw-translate-y);\n    }\n  }\n}\n#class1-english-runtime .hover\\:scale-105 {\n  #class1-english-runtime &:hover {\n    @media (hover: hover) {\n      --tw-scale-x: 105%;\n      --tw-scale-y: 105%;\n      --tw-scale-z: 105%;\n      scale: var(--tw-scale-x) var(--tw-scale-y);\n    }\n  }\n}\n#class1-english-runtime .hover\\:scale-\\[1\\.02\\] {\n  #class1-english-runtime &:hover {\n    @media (hover: hover) {\n      scale: 1.02;\n    }\n  }\n}\n#class1-english-runtime .hover\\:scale-\\[1\\.03\\] {\n  #class1-english-runtime &:hover {\n    @media (hover: hover) {\n      scale: 1.03;\n    }\n  }\n}\n#class1-english-runtime .hover\\:border-emerald-400 {\n  #class1-english-runtime &:hover {\n    @media (hover: hover) {\n      border-color: var(--color-emerald-400);\n    }\n  }\n}\n#class1-english-runtime .hover\\:border-fuchsia-400 {\n  #class1-english-runtime &:hover {\n    @media (hover: hover) {\n      border-color: var(--color-fuchsia-400);\n    }\n  }\n}\n#class1-english-runtime .hover\\:border-pink-400 {\n  #class1-english-runtime &:hover {\n    @media (hover: hover) {\n      border-color: var(--color-pink-400);\n    }\n  }\n}\n#class1-english-runtime .hover\\:border-purple-400 {\n  #class1-english-runtime &:hover {\n    @media (hover: hover) {\n      border-color: var(--color-purple-400);\n    }\n  }\n}\n#class1-english-runtime .hover\\:border-rose-400 {\n  #class1-english-runtime &:hover {\n    @media (hover: hover) {\n      border-color: var(--color-rose-400);\n    }\n  }\n}\n#class1-english-runtime .hover\\:border-violet-400 {\n  #class1-english-runtime &:hover {\n    @media (hover: hover) {\n      border-color: var(--color-violet-400);\n    }\n  }\n}\n#class1-english-runtime .hover\\:bg-amber-50 {\n  #class1-english-runtime &:hover {\n    @media (hover: hover) {\n      background-color: var(--color-amber-50);\n    }\n  }\n}\n#class1-english-runtime .hover\\:bg-amber-50\\/30 {\n  #class1-english-runtime &:hover {\n    @media (hover: hover) {\n      background-color: color-mix(in srgb, oklch(98.7% 0.022 95.277) 30%, transparent);\n      @supports (color: color-mix(in lab, red, red)) {\n        background-color: color-mix(in oklab, var(--color-amber-50) 30%, transparent);\n      }\n    }\n  }\n}\n#class1-english-runtime .hover\\:bg-amber-100 {\n  #class1-english-runtime &:hover {\n    @media (hover: hover) {\n      background-color: var(--color-amber-100);\n    }\n  }\n}\n#class1-english-runtime .hover\\:bg-amber-100\\/80 {\n  #class1-english-runtime &:hover {\n    @media (hover: hover) {\n      background-color: color-mix(in srgb, oklch(96.2% 0.059 95.617) 80%, transparent);\n      @supports (color: color-mix(in lab, red, red)) {\n        background-color: color-mix(in oklab, var(--color-amber-100) 80%, transparent);\n      }\n    }\n  }\n}\n#class1-english-runtime .hover\\:bg-amber-200 {\n  #class1-english-runtime &:hover {\n    @media (hover: hover) {\n      background-color: var(--color-amber-200);\n    }\n  }\n}\n#class1-english-runtime .hover\\:bg-amber-600 {\n  #class1-english-runtime &:hover {\n    @media (hover: hover) {\n      background-color: var(--color-amber-600);\n    }\n  }\n}\n#class1-english-runtime .hover\\:bg-blue-100 {\n  #class1-english-runtime &:hover {\n    @media (hover: hover) {\n      background-color: var(--color-blue-100);\n    }\n  }\n}\n#class1-english-runtime .hover\\:bg-cyan-100\\/70 {\n  #class1-english-runtime &:hover {\n    @media (hover: hover) {\n      background-color: color-mix(in srgb, oklch(95.6% 0.045 203.388) 70%, transparent);\n      @supports (color: color-mix(in lab, red, red)) {\n        background-color: color-mix(in oklab, var(--color-cyan-100) 70%, transparent);\n      }\n    }\n  }\n}\n#class1-english-runtime .hover\\:bg-emerald-50 {\n  #class1-english-runtime &:hover {\n    @media (hover: hover) {\n      background-color: var(--color-emerald-50);\n    }\n  }\n}\n#class1-english-runtime .hover\\:bg-emerald-100 {\n  #class1-english-runtime &:hover {\n    @media (hover: hover) {\n      background-color: var(--color-emerald-100);\n    }\n  }\n}\n#class1-english-runtime .hover\\:bg-emerald-100\\/80 {\n  #class1-english-runtime &:hover {\n    @media (hover: hover) {\n      background-color: color-mix(in srgb, oklch(95% 0.052 163.051) 80%, transparent);\n      @supports (color: color-mix(in lab, red, red)) {\n        background-color: color-mix(in oklab, var(--color-emerald-100) 80%, transparent);\n      }\n    }\n  }\n}\n#class1-english-runtime .hover\\:bg-emerald-500 {\n  #class1-english-runtime &:hover {\n    @media (hover: hover) {\n      background-color: var(--color-emerald-500);\n    }\n  }\n}\n#class1-english-runtime .hover\\:bg-emerald-600 {\n  #class1-english-runtime &:hover {\n    @media (hover: hover) {\n      background-color: var(--color-emerald-600);\n    }\n  }\n}\n#class1-english-runtime .hover\\:bg-emerald-700 {\n  #class1-english-runtime &:hover {\n    @media (hover: hover) {\n      background-color: var(--color-emerald-700);\n    }\n  }\n}\n#class1-english-runtime .hover\\:bg-gray-200 {\n  #class1-english-runtime &:hover {\n    @media (hover: hover) {\n      background-color: var(--color-gray-200);\n    }\n  }\n}\n#class1-english-runtime .hover\\:bg-indigo-100 {\n  #class1-english-runtime &:hover {\n    @media (hover: hover) {\n      background-color: var(--color-indigo-100);\n    }\n  }\n}\n#class1-english-runtime .hover\\:bg-pink-50 {\n  #class1-english-runtime &:hover {\n    @media (hover: hover) {\n      background-color: var(--color-pink-50);\n    }\n  }\n}\n#class1-english-runtime .hover\\:bg-pink-50\\/30 {\n  #class1-english-runtime &:hover {\n    @media (hover: hover) {\n      background-color: color-mix(in srgb, oklch(97.1% 0.014 343.198) 30%, transparent);\n      @supports (color: color-mix(in lab, red, red)) {\n        background-color: color-mix(in oklab, var(--color-pink-50) 30%, transparent);\n      }\n    }\n  }\n}\n#class1-english-runtime .hover\\:bg-pink-50\\/50 {\n  #class1-english-runtime &:hover {\n    @media (hover: hover) {\n      background-color: color-mix(in srgb, oklch(97.1% 0.014 343.198) 50%, transparent);\n      @supports (color: color-mix(in lab, red, red)) {\n        background-color: color-mix(in oklab, var(--color-pink-50) 50%, transparent);\n      }\n    }\n  }\n}\n#class1-english-runtime .hover\\:bg-pink-100 {\n  #class1-english-runtime &:hover {\n    @media (hover: hover) {\n      background-color: var(--color-pink-100);\n    }\n  }\n}\n#class1-english-runtime .hover\\:bg-pink-100\\/70 {\n  #class1-english-runtime &:hover {\n    @media (hover: hover) {\n      background-color: color-mix(in srgb, oklch(94.8% 0.028 342.258) 70%, transparent);\n      @supports (color: color-mix(in lab, red, red)) {\n        background-color: color-mix(in oklab, var(--color-pink-100) 70%, transparent);\n      }\n    }\n  }\n}\n#class1-english-runtime .hover\\:bg-pink-100\\/80 {\n  #class1-english-runtime &:hover {\n    @media (hover: hover) {\n      background-color: color-mix(in srgb, oklch(94.8% 0.028 342.258) 80%, transparent);\n      @supports (color: color-mix(in lab, red, red)) {\n        background-color: color-mix(in oklab, var(--color-pink-100) 80%, transparent);\n      }\n    }\n  }\n}\n#class1-english-runtime .hover\\:bg-purple-50 {\n  #class1-english-runtime &:hover {\n    @media (hover: hover) {\n      background-color: var(--color-purple-50);\n    }\n  }\n}\n#class1-english-runtime .hover\\:bg-purple-100 {\n  #class1-english-runtime &:hover {\n    @media (hover: hover) {\n      background-color: var(--color-purple-100);\n    }\n  }\n}\n#class1-english-runtime .hover\\:bg-purple-200 {\n  #class1-english-runtime &:hover {\n    @media (hover: hover) {\n      background-color: var(--color-purple-200);\n    }\n  }\n}\n#class1-english-runtime .hover\\:bg-red-300 {\n  #class1-english-runtime &:hover {\n    @media (hover: hover) {\n      background-color: var(--color-red-300);\n    }\n  }\n}\n#class1-english-runtime .hover\\:bg-rose-100 {\n  #class1-english-runtime &:hover {\n    @media (hover: hover) {\n      background-color: var(--color-rose-100);\n    }\n  }\n}\n#class1-english-runtime .hover\\:bg-rose-200 {\n  #class1-english-runtime &:hover {\n    @media (hover: hover) {\n      background-color: var(--color-rose-200);\n    }\n  }\n}\n#class1-english-runtime .hover\\:bg-sky-100 {\n  #class1-english-runtime &:hover {\n    @media (hover: hover) {\n      background-color: var(--color-sky-100);\n    }\n  }\n}\n#class1-english-runtime .hover\\:bg-sky-100\\/80 {\n  #class1-english-runtime &:hover {\n    @media (hover: hover) {\n      background-color: color-mix(in srgb, oklch(95.1% 0.026 236.824) 80%, transparent);\n      @supports (color: color-mix(in lab, red, red)) {\n        background-color: color-mix(in oklab, var(--color-sky-100) 80%, transparent);\n      }\n    }\n  }\n}\n#class1-english-runtime .hover\\:bg-slate-200 {\n  #class1-english-runtime &:hover {\n    @media (hover: hover) {\n      background-color: var(--color-slate-200);\n    }\n  }\n}\n#class1-english-runtime .hover\\:bg-slate-900 {\n  #class1-english-runtime &:hover {\n    @media (hover: hover) {\n      background-color: var(--color-slate-900);\n    }\n  }\n}\n#class1-english-runtime .hover\\:bg-violet-50 {\n  #class1-english-runtime &:hover {\n    @media (hover: hover) {\n      background-color: var(--color-violet-50);\n    }\n  }\n}\n#class1-english-runtime .hover\\:bg-violet-100 {\n  #class1-english-runtime &:hover {\n    @media (hover: hover) {\n      background-color: var(--color-violet-100);\n    }\n  }\n}\n#class1-english-runtime .hover\\:from-pink-200 {\n  #class1-english-runtime &:hover {\n    @media (hover: hover) {\n      --tw-gradient-from: var(--color-pink-200);\n      --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n    }\n  }\n}\n#class1-english-runtime .hover\\:from-pink-600 {\n  #class1-english-runtime &:hover {\n    @media (hover: hover) {\n      --tw-gradient-from: var(--color-pink-600);\n      --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n    }\n  }\n}\n#class1-english-runtime .hover\\:from-rose-700 {\n  #class1-english-runtime &:hover {\n    @media (hover: hover) {\n      --tw-gradient-from: var(--color-rose-700);\n      --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n    }\n  }\n}\n#class1-english-runtime .hover\\:to-purple-200 {\n  #class1-english-runtime &:hover {\n    @media (hover: hover) {\n      --tw-gradient-to: var(--color-purple-200);\n      --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n    }\n  }\n}\n#class1-english-runtime .hover\\:to-red-700 {\n  #class1-english-runtime &:hover {\n    @media (hover: hover) {\n      --tw-gradient-to: var(--color-red-700);\n      --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n    }\n  }\n}\n#class1-english-runtime .hover\\:to-rose-600 {\n  #class1-english-runtime &:hover {\n    @media (hover: hover) {\n      --tw-gradient-to: var(--color-rose-600);\n      --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n    }\n  }\n}\n#class1-english-runtime .hover\\:text-rose-500 {\n  #class1-english-runtime &:hover {\n    @media (hover: hover) {\n      color: var(--color-rose-500);\n    }\n  }\n}\n#class1-english-runtime .hover\\:text-rose-600 {\n  #class1-english-runtime &:hover {\n    @media (hover: hover) {\n      color: var(--color-rose-600);\n    }\n  }\n}\n#class1-english-runtime .hover\\:text-slate-700 {\n  #class1-english-runtime &:hover {\n    @media (hover: hover) {\n      color: var(--color-slate-700);\n    }\n  }\n}\n#class1-english-runtime .hover\\:opacity-100 {\n  #class1-english-runtime &:hover {\n    @media (hover: hover) {\n      opacity: 100%;\n    }\n  }\n}\n#class1-english-runtime .hover\\:shadow-\\[0_0_10px_rgba\\(99\\,102\\,241\\,0\\.5\\)\\] {\n  #class1-english-runtime &:hover {\n    @media (hover: hover) {\n      --tw-shadow: 0 0 10px var(--tw-shadow-color, rgba(99,102,241,0.5));\n      box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);\n    }\n  }\n}\n#class1-english-runtime .hover\\:shadow-\\[0_0_18px_rgba\\(244\\,114\\,182\\,0\\.65\\)\\] {\n  #class1-english-runtime &:hover {\n    @media (hover: hover) {\n      --tw-shadow: 0 0 18px var(--tw-shadow-color, rgba(244,114,182,0.65));\n      box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);\n    }\n  }\n}\n#class1-english-runtime .hover\\:shadow-md {\n  #class1-english-runtime &:hover {\n    @media (hover: hover) {\n      --tw-shadow: 0 4px 6px -1px var(--tw-shadow-color, rgb(0 0 0 / 0.1)), 0 2px 4px -2px var(--tw-shadow-color, rgb(0 0 0 / 0.1));\n      box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);\n    }\n  }\n}\n#class1-english-runtime .hover\\:brightness-105 {\n  #class1-english-runtime &:hover {\n    @media (hover: hover) {\n      --tw-brightness: brightness(105%);\n      filter: var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,);\n    }\n  }\n}\n#class1-english-runtime .focus\\:border-amber-300 {\n  #class1-english-runtime &:focus {\n    border-color: var(--color-amber-300);\n  }\n}\n#class1-english-runtime .focus\\:border-pink-400 {\n  #class1-english-runtime &:focus {\n    border-color: var(--color-pink-400);\n  }\n}\n#class1-english-runtime .focus\\:outline-none {\n  #class1-english-runtime &:focus {\n    --tw-outline-style: none;\n    outline-style: none;\n  }\n}\n#class1-english-runtime .disabled\\:cursor-not-allowed {\n  #class1-english-runtime &:disabled {\n    cursor: not-allowed;\n  }\n}\n#class1-english-runtime .disabled\\:opacity-40 {\n  #class1-english-runtime &:disabled {\n    opacity: 40%;\n  }\n}\n#class1-english-runtime .sm\\:max-w-md {\n  @media (width >= 40rem) {\n    max-width: var(--container-md);\n  }\n}\n#class1-english-runtime .sm\\:grid-cols-2 {\n  @media (width >= 40rem) {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n}\n#class1-english-runtime .sm\\:grid-cols-3 {\n  @media (width >= 40rem) {\n    grid-template-columns: repeat(3, minmax(0, 1fr));\n  }\n}\n#class1-english-runtime .sm\\:flex-row {\n  @media (width >= 40rem) {\n    flex-direction: row;\n  }\n}\n#class1-english-runtime .sm\\:items-center {\n  @media (width >= 40rem) {\n    align-items: center;\n  }\n}\n#class1-english-runtime .sm\\:justify-between {\n  @media (width >= 40rem) {\n    justify-content: space-between;\n  }\n}\n#class1-english-runtime .sm\\:p-4 {\n  @media (width >= 40rem) {\n    padding: calc(var(--spacing) * 4);\n  }\n}\n#class1-english-runtime .sm\\:p-5 {\n  @media (width >= 40rem) {\n    padding: calc(var(--spacing) * 5);\n  }\n}\n#class1-english-runtime .sm\\:p-6 {\n  @media (width >= 40rem) {\n    padding: calc(var(--spacing) * 6);\n  }\n}\n#class1-english-runtime .sm\\:text-3xl {\n  @media (width >= 40rem) {\n    font-size: var(--text-3xl);\n    line-height: var(--tw-leading, var(--text-3xl--line-height));\n  }\n}\n#class1-english-runtime .sm\\:text-base {\n  @media (width >= 40rem) {\n    font-size: var(--text-base);\n    line-height: var(--tw-leading, var(--text-base--line-height));\n  }\n}\n#class1-english-runtime .sm\\:text-lg {\n  @media (width >= 40rem) {\n    font-size: var(--text-lg);\n    line-height: var(--tw-leading, var(--text-lg--line-height));\n  }\n}\n#class1-english-runtime .sm\\:text-sm {\n  @media (width >= 40rem) {\n    font-size: var(--text-sm);\n    line-height: var(--tw-leading, var(--text-sm--line-height));\n  }\n}\n#class1-english-runtime .sm\\:text-xl {\n  @media (width >= 40rem) {\n    font-size: var(--text-xl);\n    line-height: var(--tw-leading, var(--text-xl--line-height));\n  }\n}\n#class1-english-runtime .sm\\:whitespace-nowrap {\n  @media (width >= 40rem) {\n    white-space: nowrap;\n  }\n}\n#class1-english-runtime .md\\:top-\\[98px\\] {\n  @media (width >= 48rem) {\n    top: 98px;\n  }\n}\n#class1-english-runtime .md\\:right-\\[52px\\] {\n  @media (width >= 48rem) {\n    right: 52px;\n  }\n}\n#class1-english-runtime .md\\:right-\\[55px\\] {\n  @media (width >= 48rem) {\n    right: 55px;\n  }\n}\n#class1-english-runtime .md\\:left-\\[52px\\] {\n  @media (width >= 48rem) {\n    left: 52px;\n  }\n}\n#class1-english-runtime .md\\:left-\\[55px\\] {\n  @media (width >= 48rem) {\n    left: 55px;\n  }\n}\n#class1-english-runtime .md\\:col-span-2 {\n  @media (width >= 48rem) {\n    grid-column: span 2 / span 2;\n  }\n}\n#class1-english-runtime .md\\:mr-0\\.5 {\n  @media (width >= 48rem) {\n    margin-right: calc(var(--spacing) * 0.5);\n  }\n}\n#class1-english-runtime .md\\:mr-1 {\n  @media (width >= 48rem) {\n    margin-right: calc(var(--spacing) * 1);\n  }\n}\n#class1-english-runtime .md\\:ml-4 {\n  @media (width >= 48rem) {\n    margin-left: calc(var(--spacing) * 4);\n  }\n}\n#class1-english-runtime .md\\:block {\n  @media (width >= 48rem) {\n    display: block;\n  }\n}\n#class1-english-runtime .md\\:inline {\n  @media (width >= 48rem) {\n    display: inline;\n  }\n}\n#class1-english-runtime .md\\:h-7 {\n  @media (width >= 48rem) {\n    height: calc(var(--spacing) * 7);\n  }\n}\n#class1-english-runtime .md\\:h-9 {\n  @media (width >= 48rem) {\n    height: calc(var(--spacing) * 9);\n  }\n}\n#class1-english-runtime .md\\:h-11 {\n  @media (width >= 48rem) {\n    height: calc(var(--spacing) * 11);\n  }\n}\n#class1-english-runtime .md\\:h-12 {\n  @media (width >= 48rem) {\n    height: calc(var(--spacing) * 12);\n  }\n}\n#class1-english-runtime .md\\:h-14 {\n  @media (width >= 48rem) {\n    height: calc(var(--spacing) * 14);\n  }\n}\n#class1-english-runtime .md\\:h-16 {\n  @media (width >= 48rem) {\n    height: calc(var(--spacing) * 16);\n  }\n}\n#class1-english-runtime .md\\:h-18 {\n  @media (width >= 48rem) {\n    height: calc(var(--spacing) * 18);\n  }\n}\n#class1-english-runtime .md\\:h-\\[58px\\] {\n  @media (width >= 48rem) {\n    height: 58px;\n  }\n}\n#class1-english-runtime .md\\:h-\\[160px\\] {\n  @media (width >= 48rem) {\n    height: 160px;\n  }\n}\n#class1-english-runtime .md\\:h-\\[175px\\] {\n  @media (width >= 48rem) {\n    height: 175px;\n  }\n}\n#class1-english-runtime .md\\:h-\\[230px\\] {\n  @media (width >= 48rem) {\n    height: 230px;\n  }\n}\n#class1-english-runtime .md\\:min-h-\\[56px\\] {\n  @media (width >= 48rem) {\n    min-height: 56px;\n  }\n}\n#class1-english-runtime .md\\:min-h-\\[58px\\] {\n  @media (width >= 48rem) {\n    min-height: 58px;\n  }\n}\n#class1-english-runtime .md\\:min-h-\\[62px\\] {\n  @media (width >= 48rem) {\n    min-height: 62px;\n  }\n}\n#class1-english-runtime .md\\:min-h-\\[68px\\] {\n  @media (width >= 48rem) {\n    min-height: 68px;\n  }\n}\n#class1-english-runtime .md\\:min-h-\\[72px\\] {\n  @media (width >= 48rem) {\n    min-height: 72px;\n  }\n}\n#class1-english-runtime .md\\:min-h-\\[76px\\] {\n  @media (width >= 48rem) {\n    min-height: 76px;\n  }\n}\n#class1-english-runtime .md\\:min-h-\\[84px\\] {\n  @media (width >= 48rem) {\n    min-height: 84px;\n  }\n}\n#class1-english-runtime .md\\:min-h-\\[142px\\] {\n  @media (width >= 48rem) {\n    min-height: 142px;\n  }\n}\n#class1-english-runtime .md\\:min-h-\\[210px\\] {\n  @media (width >= 48rem) {\n    min-height: 210px;\n  }\n}\n#class1-english-runtime .md\\:min-h-\\[300px\\] {\n  @media (width >= 48rem) {\n    min-height: 300px;\n  }\n}\n#class1-english-runtime .md\\:min-h-\\[360px\\] {\n  @media (width >= 48rem) {\n    min-height: 360px;\n  }\n}\n#class1-english-runtime .md\\:min-h-\\[430px\\] {\n  @media (width >= 48rem) {\n    min-height: 430px;\n  }\n}\n#class1-english-runtime .md\\:min-h-\\[440px\\] {\n  @media (width >= 48rem) {\n    min-height: 440px;\n  }\n}\n#class1-english-runtime .md\\:min-h-\\[445px\\] {\n  @media (width >= 48rem) {\n    min-height: 445px;\n  }\n}\n#class1-english-runtime .md\\:min-h-\\[470px\\] {\n  @media (width >= 48rem) {\n    min-height: 470px;\n  }\n}\n#class1-english-runtime .md\\:w-7 {\n  @media (width >= 48rem) {\n    width: calc(var(--spacing) * 7);\n  }\n}\n#class1-english-runtime .md\\:w-9 {\n  @media (width >= 48rem) {\n    width: calc(var(--spacing) * 9);\n  }\n}\n#class1-english-runtime .md\\:w-11 {\n  @media (width >= 48rem) {\n    width: calc(var(--spacing) * 11);\n  }\n}\n#class1-english-runtime .md\\:w-12 {\n  @media (width >= 48rem) {\n    width: calc(var(--spacing) * 12);\n  }\n}\n#class1-english-runtime .md\\:w-14 {\n  @media (width >= 48rem) {\n    width: calc(var(--spacing) * 14);\n  }\n}\n#class1-english-runtime .md\\:w-16 {\n  @media (width >= 48rem) {\n    width: calc(var(--spacing) * 16);\n  }\n}\n#class1-english-runtime .md\\:w-24 {\n  @media (width >= 48rem) {\n    width: calc(var(--spacing) * 24);\n  }\n}\n#class1-english-runtime .md\\:w-\\[40\\%\\] {\n  @media (width >= 48rem) {\n    width: 40%;\n  }\n}\n#class1-english-runtime .md\\:w-\\[60\\%\\] {\n  @media (width >= 48rem) {\n    width: 60%;\n  }\n}\n#class1-english-runtime .md\\:w-\\[160px\\] {\n  @media (width >= 48rem) {\n    width: 160px;\n  }\n}\n#class1-english-runtime .md\\:w-\\[250px\\] {\n  @media (width >= 48rem) {\n    width: 250px;\n  }\n}\n#class1-english-runtime .md\\:w-\\[300px\\] {\n  @media (width >= 48rem) {\n    width: 300px;\n  }\n}\n#class1-english-runtime .md\\:min-w-\\[92px\\] {\n  @media (width >= 48rem) {\n    min-width: 92px;\n  }\n}\n#class1-english-runtime .md\\:min-w-\\[210px\\] {\n  @media (width >= 48rem) {\n    min-width: 210px;\n  }\n}\n#class1-english-runtime .md\\:scale-\\[0\\.62\\] {\n  @media (width >= 48rem) {\n    scale: 0.62;\n  }\n}\n#class1-english-runtime .md\\:columns-2 {\n  @media (width >= 48rem) {\n    columns: 2;\n  }\n}\n#class1-english-runtime .md\\:grid-cols-2 {\n  @media (width >= 48rem) {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n}\n#class1-english-runtime .md\\:grid-cols-3 {\n  @media (width >= 48rem) {\n    grid-template-columns: repeat(3, minmax(0, 1fr));\n  }\n}\n#class1-english-runtime .md\\:grid-cols-4 {\n  @media (width >= 48rem) {\n    grid-template-columns: repeat(4, minmax(0, 1fr));\n  }\n}\n#class1-english-runtime .md\\:grid-cols-7 {\n  @media (width >= 48rem) {\n    grid-template-columns: repeat(7, minmax(0, 1fr));\n  }\n}\n#class1-english-runtime .md\\:grid-cols-10 {\n  @media (width >= 48rem) {\n    grid-template-columns: repeat(10, minmax(0, 1fr));\n  }\n}\n#class1-english-runtime .md\\:grid-cols-\\[0\\.94fr_1\\.06fr\\] {\n  @media (width >= 48rem) {\n    grid-template-columns: 0.94fr 1.06fr;\n  }\n}\n#class1-english-runtime .md\\:grid-cols-\\[1\\.1fr_0\\.9fr\\] {\n  @media (width >= 48rem) {\n    grid-template-columns: 1.1fr 0.9fr;\n  }\n}\n#class1-english-runtime .md\\:grid-cols-\\[1\\.02fr_0\\.98fr\\] {\n  @media (width >= 48rem) {\n    grid-template-columns: 1.02fr 0.98fr;\n  }\n}\n#class1-english-runtime .md\\:grid-cols-\\[1\\.04fr_0\\.96fr\\] {\n  @media (width >= 48rem) {\n    grid-template-columns: 1.04fr 0.96fr;\n  }\n}\n#class1-english-runtime .md\\:grid-cols-\\[1\\.4fr_0\\.6fr\\] {\n  @media (width >= 48rem) {\n    grid-template-columns: 1.4fr 0.6fr;\n  }\n}\n#class1-english-runtime .md\\:grid-cols-\\[1\\.05fr_0\\.95fr\\] {\n  @media (width >= 48rem) {\n    grid-template-columns: 1.05fr 0.95fr;\n  }\n}\n#class1-english-runtime .md\\:grid-cols-\\[1\\.06fr_0\\.94fr\\] {\n  @media (width >= 48rem) {\n    grid-template-columns: 1.06fr 0.94fr;\n  }\n}\n#class1-english-runtime .md\\:grid-cols-\\[1\\.08fr_0\\.92fr\\] {\n  @media (width >= 48rem) {\n    grid-template-columns: 1.08fr 0.92fr;\n  }\n}\n#class1-english-runtime .md\\:grid-cols-\\[1\\.12fr_0\\.88fr\\] {\n  @media (width >= 48rem) {\n    grid-template-columns: 1.12fr 0.88fr;\n  }\n}\n#class1-english-runtime .md\\:grid-cols-\\[1\\.38fr_0\\.62fr\\] {\n  @media (width >= 48rem) {\n    grid-template-columns: 1.38fr 0.62fr;\n  }\n}\n#class1-english-runtime .md\\:grid-cols-\\[1fr_1\\.2fr\\] {\n  @media (width >= 48rem) {\n    grid-template-columns: 1fr 1.2fr;\n  }\n}\n#class1-english-runtime .md\\:grid-cols-\\[52px_1fr\\] {\n  @media (width >= 48rem) {\n    grid-template-columns: 52px 1fr;\n  }\n}\n#class1-english-runtime .md\\:flex-row {\n  @media (width >= 48rem) {\n    flex-direction: row;\n  }\n}\n#class1-english-runtime .md\\:gap-1 {\n  @media (width >= 48rem) {\n    gap: calc(var(--spacing) * 1);\n  }\n}\n#class1-english-runtime .md\\:gap-1\\.5 {\n  @media (width >= 48rem) {\n    gap: calc(var(--spacing) * 1.5);\n  }\n}\n#class1-english-runtime .md\\:gap-2 {\n  @media (width >= 48rem) {\n    gap: calc(var(--spacing) * 2);\n  }\n}\n#class1-english-runtime .md\\:gap-2\\.5 {\n  @media (width >= 48rem) {\n    gap: calc(var(--spacing) * 2.5);\n  }\n}\n#class1-english-runtime .md\\:gap-3 {\n  @media (width >= 48rem) {\n    gap: calc(var(--spacing) * 3);\n  }\n}\n#class1-english-runtime .md\\:gap-4 {\n  @media (width >= 48rem) {\n    gap: calc(var(--spacing) * 4);\n  }\n}\n#class1-english-runtime .md\\:gap-5 {\n  @media (width >= 48rem) {\n    gap: calc(var(--spacing) * 5);\n  }\n}\n#class1-english-runtime .md\\:gap-6 {\n  @media (width >= 48rem) {\n    gap: calc(var(--spacing) * 6);\n  }\n}\n#class1-english-runtime .md\\:gap-8 {\n  @media (width >= 48rem) {\n    gap: calc(var(--spacing) * 8);\n  }\n}\n#class1-english-runtime .md\\:gap-10 {\n  @media (width >= 48rem) {\n    gap: calc(var(--spacing) * 10);\n  }\n}\n#class1-english-runtime .md\\:gap-12 {\n  @media (width >= 48rem) {\n    gap: calc(var(--spacing) * 12);\n  }\n}\n#class1-english-runtime .md\\:gap-16 {\n  @media (width >= 48rem) {\n    gap: calc(var(--spacing) * 16);\n  }\n}\n#class1-english-runtime .md\\:space-y-2 {\n  @media (width >= 48rem) {\n    #class1-english-runtime :where(& > :not(:last-child)) {\n      --tw-space-y-reverse: 0;\n      margin-block-start: calc(calc(var(--spacing) * 2) * var(--tw-space-y-reverse));\n      margin-block-end: calc(calc(var(--spacing) * 2) * calc(1 - var(--tw-space-y-reverse)));\n    }\n  }\n}\n#class1-english-runtime .md\\:border-b-\\[4px\\] {\n  @media (width >= 48rem) {\n    border-bottom-style: var(--tw-border-style);\n    border-bottom-width: 4px;\n  }\n}\n#class1-english-runtime .md\\:border-b-\\[5px\\] {\n  @media (width >= 48rem) {\n    border-bottom-style: var(--tw-border-style);\n    border-bottom-width: 5px;\n  }\n}\n#class1-english-runtime .md\\:p-2 {\n  @media (width >= 48rem) {\n    padding: calc(var(--spacing) * 2);\n  }\n}\n#class1-english-runtime .md\\:p-3 {\n  @media (width >= 48rem) {\n    padding: calc(var(--spacing) * 3);\n  }\n}\n#class1-english-runtime .md\\:p-3\\.5 {\n  @media (width >= 48rem) {\n    padding: calc(var(--spacing) * 3.5);\n  }\n}\n#class1-english-runtime .md\\:p-4 {\n  @media (width >= 48rem) {\n    padding: calc(var(--spacing) * 4);\n  }\n}\n#class1-english-runtime .md\\:p-5 {\n  @media (width >= 48rem) {\n    padding: calc(var(--spacing) * 5);\n  }\n}\n#class1-english-runtime .md\\:p-6 {\n  @media (width >= 48rem) {\n    padding: calc(var(--spacing) * 6);\n  }\n}\n#class1-english-runtime .md\\:p-7 {\n  @media (width >= 48rem) {\n    padding: calc(var(--spacing) * 7);\n  }\n}\n#class1-english-runtime .md\\:p-8 {\n  @media (width >= 48rem) {\n    padding: calc(var(--spacing) * 8);\n  }\n}\n#class1-english-runtime .md\\:px-2 {\n  @media (width >= 48rem) {\n    padding-inline: calc(var(--spacing) * 2);\n  }\n}\n#class1-english-runtime .md\\:px-2\\.5 {\n  @media (width >= 48rem) {\n    padding-inline: calc(var(--spacing) * 2.5);\n  }\n}\n#class1-english-runtime .md\\:px-4 {\n  @media (width >= 48rem) {\n    padding-inline: calc(var(--spacing) * 4);\n  }\n}\n#class1-english-runtime .md\\:px-5 {\n  @media (width >= 48rem) {\n    padding-inline: calc(var(--spacing) * 5);\n  }\n}\n#class1-english-runtime .md\\:px-6 {\n  @media (width >= 48rem) {\n    padding-inline: calc(var(--spacing) * 6);\n  }\n}\n#class1-english-runtime .md\\:px-7 {\n  @media (width >= 48rem) {\n    padding-inline: calc(var(--spacing) * 7);\n  }\n}\n#class1-english-runtime .md\\:py-5 {\n  @media (width >= 48rem) {\n    padding-block: calc(var(--spacing) * 5);\n  }\n}\n#class1-english-runtime .md\\:py-6 {\n  @media (width >= 48rem) {\n    padding-block: calc(var(--spacing) * 6);\n  }\n}\n#class1-english-runtime .md\\:py-7 {\n  @media (width >= 48rem) {\n    padding-block: calc(var(--spacing) * 7);\n  }\n}\n#class1-english-runtime .md\\:pb-\\[5px\\] {\n  @media (width >= 48rem) {\n    padding-bottom: 5px;\n  }\n}\n#class1-english-runtime .md\\:pb-\\[6px\\] {\n  @media (width >= 48rem) {\n    padding-bottom: 6px;\n  }\n}\n#class1-english-runtime .md\\:text-left {\n  @media (width >= 48rem) {\n    text-align: left;\n  }\n}\n#class1-english-runtime .md\\:text-2xl {\n  @media (width >= 48rem) {\n    font-size: var(--text-2xl);\n    line-height: var(--tw-leading, var(--text-2xl--line-height));\n  }\n}\n#class1-english-runtime .md\\:text-3xl {\n  @media (width >= 48rem) {\n    font-size: var(--text-3xl);\n    line-height: var(--tw-leading, var(--text-3xl--line-height));\n  }\n}\n#class1-english-runtime .md\\:text-4xl {\n  @media (width >= 48rem) {\n    font-size: var(--text-4xl);\n    line-height: var(--tw-leading, var(--text-4xl--line-height));\n  }\n}\n#class1-english-runtime .md\\:text-5xl {\n  @media (width >= 48rem) {\n    font-size: var(--text-5xl);\n    line-height: var(--tw-leading, var(--text-5xl--line-height));\n  }\n}\n#class1-english-runtime .md\\:text-6xl {\n  @media (width >= 48rem) {\n    font-size: var(--text-6xl);\n    line-height: var(--tw-leading, var(--text-6xl--line-height));\n  }\n}\n#class1-english-runtime .md\\:text-8xl {\n  @media (width >= 48rem) {\n    font-size: var(--text-8xl);\n    line-height: var(--tw-leading, var(--text-8xl--line-height));\n  }\n}\n#class1-english-runtime .md\\:text-base {\n  @media (width >= 48rem) {\n    font-size: var(--text-base);\n    line-height: var(--tw-leading, var(--text-base--line-height));\n  }\n}\n#class1-english-runtime .md\\:text-lg {\n  @media (width >= 48rem) {\n    font-size: var(--text-lg);\n    line-height: var(--tw-leading, var(--text-lg--line-height));\n  }\n}\n#class1-english-runtime .md\\:text-sm {\n  @media (width >= 48rem) {\n    font-size: var(--text-sm);\n    line-height: var(--tw-leading, var(--text-sm--line-height));\n  }\n}\n#class1-english-runtime .md\\:text-xl {\n  @media (width >= 48rem) {\n    font-size: var(--text-xl);\n    line-height: var(--tw-leading, var(--text-xl--line-height));\n  }\n}\n#class1-english-runtime .md\\:text-xs {\n  @media (width >= 48rem) {\n    font-size: var(--text-xs);\n    line-height: var(--tw-leading, var(--text-xs--line-height));\n  }\n}\n#class1-english-runtime .md\\:text-\\[13px\\] {\n  @media (width >= 48rem) {\n    font-size: 13px;\n  }\n}\n#class1-english-runtime .md\\:text-\\[15px\\] {\n  @media (width >= 48rem) {\n    font-size: 15px;\n  }\n}\n#class1-english-runtime .md\\:text-\\[26px\\] {\n  @media (width >= 48rem) {\n    font-size: 26px;\n  }\n}\n#class1-english-runtime .md\\:text-\\[27px\\] {\n  @media (width >= 48rem) {\n    font-size: 27px;\n  }\n}\n#class1-english-runtime .md\\:text-\\[30px\\] {\n  @media (width >= 48rem) {\n    font-size: 30px;\n  }\n}\n#class1-english-runtime .md\\:text-\\[32px\\] {\n  @media (width >= 48rem) {\n    font-size: 32px;\n  }\n}\n#class1-english-runtime .md\\:text-\\[36px\\] {\n  @media (width >= 48rem) {\n    font-size: 36px;\n  }\n}\n#class1-english-runtime .md\\:text-\\[40px\\] {\n  @media (width >= 48rem) {\n    font-size: 40px;\n  }\n}\n#class1-english-runtime .md\\:text-\\[50px\\] {\n  @media (width >= 48rem) {\n    font-size: 50px;\n  }\n}\n#class1-english-runtime .md\\:text-\\[54px\\] {\n  @media (width >= 48rem) {\n    font-size: 54px;\n  }\n}\n#class1-english-runtime .md\\:text-\\[68px\\] {\n  @media (width >= 48rem) {\n    font-size: 68px;\n  }\n}\n#class1-english-runtime .md\\:text-\\[76px\\] {\n  @media (width >= 48rem) {\n    font-size: 76px;\n  }\n}\n#class1-english-runtime .md\\:text-\\[78px\\] {\n  @media (width >= 48rem) {\n    font-size: 78px;\n  }\n}\n#class1-english-runtime .md\\:text-\\[80px\\] {\n  @media (width >= 48rem) {\n    font-size: 80px;\n  }\n}\n#class1-english-runtime .md\\:text-\\[82px\\] {\n  @media (width >= 48rem) {\n    font-size: 82px;\n  }\n}\n#class1-english-runtime .md\\:text-\\[88px\\] {\n  @media (width >= 48rem) {\n    font-size: 88px;\n  }\n}\n#class1-english-runtime .md\\:text-\\[105px\\] {\n  @media (width >= 48rem) {\n    font-size: 105px;\n  }\n}\n#class1-english-runtime .md\\:text-\\[120px\\] {\n  @media (width >= 48rem) {\n    font-size: 120px;\n  }\n}\n#class1-english-runtime .md\\:text-\\[145px\\] {\n  @media (width >= 48rem) {\n    font-size: 145px;\n  }\n}\n#class1-english-runtime .md\\:text-\\[155px\\] {\n  @media (width >= 48rem) {\n    font-size: 155px;\n  }\n}\n#class1-english-runtime .lg\\:h-12 {\n  @media (width >= 64rem) {\n    height: calc(var(--spacing) * 12);\n  }\n}\n#class1-english-runtime .lg\\:h-16 {\n  @media (width >= 64rem) {\n    height: calc(var(--spacing) * 16);\n  }\n}\n#class1-english-runtime .lg\\:h-\\[52px\\] {\n  @media (width >= 64rem) {\n    height: 52px;\n  }\n}\n#class1-english-runtime .lg\\:h-\\[54px\\] {\n  @media (width >= 64rem) {\n    height: 54px;\n  }\n}\n#class1-english-runtime .lg\\:w-12 {\n  @media (width >= 64rem) {\n    width: calc(var(--spacing) * 12);\n  }\n}\n#class1-english-runtime .lg\\:w-16 {\n  @media (width >= 64rem) {\n    width: calc(var(--spacing) * 16);\n  }\n}\n#class1-english-runtime .lg\\:w-\\[52px\\] {\n  @media (width >= 64rem) {\n    width: 52px;\n  }\n}\n#class1-english-runtime .lg\\:w-\\[54px\\] {\n  @media (width >= 64rem) {\n    width: 54px;\n  }\n}\n#class1-english-runtime .lg\\:scale-\\[0\\.68\\] {\n  @media (width >= 64rem) {\n    scale: 0.68;\n  }\n}\n#class1-english-runtime .lg\\:grid-cols-2 {\n  @media (width >= 64rem) {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n}\n#class1-english-runtime .lg\\:grid-cols-3 {\n  @media (width >= 64rem) {\n    grid-template-columns: repeat(3, minmax(0, 1fr));\n  }\n}\n#class1-english-runtime .lg\\:grid-cols-4 {\n  @media (width >= 64rem) {\n    grid-template-columns: repeat(4, minmax(0, 1fr));\n  }\n}\n#class1-english-runtime .lg\\:grid-cols-6 {\n  @media (width >= 64rem) {\n    grid-template-columns: repeat(6, minmax(0, 1fr));\n  }\n}\n#class1-english-runtime .lg\\:grid-cols-\\[1\\.1fr_0\\.9fr\\] {\n  @media (width >= 64rem) {\n    grid-template-columns: 1.1fr 0.9fr;\n  }\n}\n#class1-english-runtime .lg\\:grid-cols-\\[1\\.15fr_0\\.85fr\\] {\n  @media (width >= 64rem) {\n    grid-template-columns: 1.15fr 0.85fr;\n  }\n}\n#class1-english-runtime .lg\\:gap-5 {\n  @media (width >= 64rem) {\n    gap: calc(var(--spacing) * 5);\n  }\n}\n#class1-english-runtime .lg\\:text-2xl {\n  @media (width >= 64rem) {\n    font-size: var(--text-2xl);\n    line-height: var(--tw-leading, var(--text-2xl--line-height));\n  }\n}\n#class1-english-runtime .lg\\:text-lg {\n  @media (width >= 64rem) {\n    font-size: var(--text-lg);\n    line-height: var(--tw-leading, var(--text-lg--line-height));\n  }\n}\n#class1-english-runtime .lg\\:text-xl {\n  @media (width >= 64rem) {\n    font-size: var(--text-xl);\n    line-height: var(--tw-leading, var(--text-xl--line-height));\n  }\n}\n#class1-english-runtime .lg\\:text-\\[22px\\] {\n  @media (width >= 64rem) {\n    font-size: 22px;\n  }\n}\n#class1-english-runtime .lg\\:text-\\[23px\\] {\n  @media (width >= 64rem) {\n    font-size: 23px;\n  }\n}\n#class1-english-runtime .lg\\:text-\\[24px\\] {\n  @media (width >= 64rem) {\n    font-size: 24px;\n  }\n}\n#class1-english-runtime .lg\\:text-\\[26px\\] {\n  @media (width >= 64rem) {\n    font-size: 26px;\n  }\n}\n#class1-english-runtime .lg\\:text-\\[27px\\] {\n  @media (width >= 64rem) {\n    font-size: 27px;\n  }\n}\n#class1-english-runtime .lg\\:text-\\[28px\\] {\n  @media (width >= 64rem) {\n    font-size: 28px;\n  }\n}\n#class1-english-runtime .lg\\:text-\\[30px\\] {\n  @media (width >= 64rem) {\n    font-size: 30px;\n  }\n}\n#class1-english-runtime .lg\\:text-\\[34px\\] {\n  @media (width >= 64rem) {\n    font-size: 34px;\n  }\n}\n#class1-english-runtime .lg\\:text-\\[36px\\] {\n  @media (width >= 64rem) {\n    font-size: 36px;\n  }\n}\n#class1-english-runtime .lg\\:text-\\[40px\\] {\n  @media (width >= 64rem) {\n    font-size: 40px;\n  }\n}\n#class1-english-runtime .lg\\:text-\\[44px\\] {\n  @media (width >= 64rem) {\n    font-size: 44px;\n  }\n}\n#class1-english-runtime .lg\\:text-\\[56px\\] {\n  @media (width >= 64rem) {\n    font-size: 56px;\n  }\n}\n#class1-english-runtime .lg\\:text-\\[60px\\] {\n  @media (width >= 64rem) {\n    font-size: 60px;\n  }\n}\n#class1-english-runtime .lg\\:text-\\[82px\\] {\n  @media (width >= 64rem) {\n    font-size: 82px;\n  }\n}\n#class1-english-runtime .lg\\:text-\\[90px\\] {\n  @media (width >= 64rem) {\n    font-size: 90px;\n  }\n}\n#class1-english-runtime .lg\\:text-\\[92px\\] {\n  @media (width >= 64rem) {\n    font-size: 92px;\n  }\n}\n#class1-english-runtime .lg\\:text-\\[96px\\] {\n  @media (width >= 64rem) {\n    font-size: 96px;\n  }\n}\n#class1-english-runtime .lg\\:text-\\[126px\\] {\n  @media (width >= 64rem) {\n    font-size: 126px;\n  }\n}\n#class1-english-runtime .lg\\:text-\\[128px\\] {\n  @media (width >= 64rem) {\n    font-size: 128px;\n  }\n}\n#class1-english-runtime .lg\\:text-\\[170px\\] {\n  @media (width >= 64rem) {\n    font-size: 170px;\n  }\n}\n#class1-english-runtime .lg\\:text-\\[180px\\] {\n  @media (width >= 64rem) {\n    font-size: 180px;\n  }\n}\n#class1-english-runtime .xl\\:grid-cols-3 {\n  @media (width >= 80rem) {\n    grid-template-columns: repeat(3, minmax(0, 1fr));\n  }\n}\n#class1-english-runtime .xl\\:grid-cols-8 {\n  @media (width >= 80rem) {\n    grid-template-columns: repeat(8, minmax(0, 1fr));\n  }\n}\n@property --tw-translate-x {\n  syntax: \"*\";\n  inherits: false;\n  initial-value: 0;\n}\n@property --tw-translate-y {\n  syntax: \"*\";\n  inherits: false;\n  initial-value: 0;\n}\n@property --tw-translate-z {\n  syntax: \"*\";\n  inherits: false;\n  initial-value: 0;\n}\n@property --tw-scale-x {\n  syntax: \"*\";\n  inherits: false;\n  initial-value: 1;\n}\n@property --tw-scale-y {\n  syntax: \"*\";\n  inherits: false;\n  initial-value: 1;\n}\n@property --tw-scale-z {\n  syntax: \"*\";\n  inherits: false;\n  initial-value: 1;\n}\n@property --tw-rotate-x {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-rotate-y {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-rotate-z {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-skew-x {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-skew-y {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-space-y-reverse {\n  syntax: \"*\";\n  inherits: false;\n  initial-value: 0;\n}\n@property --tw-space-x-reverse {\n  syntax: \"*\";\n  inherits: false;\n  initial-value: 0;\n}\n@property --tw-divide-x-reverse {\n  syntax: \"*\";\n  inherits: false;\n  initial-value: 0;\n}\n@property --tw-border-style {\n  syntax: \"*\";\n  inherits: false;\n  initial-value: solid;\n}\n@property --tw-divide-y-reverse {\n  syntax: \"*\";\n  inherits: false;\n  initial-value: 0;\n}\n@property --tw-gradient-position {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-gradient-from {\n  syntax: \"<color>\";\n  inherits: false;\n  initial-value: #0000;\n}\n@property --tw-gradient-via {\n  syntax: \"<color>\";\n  inherits: false;\n  initial-value: #0000;\n}\n@property --tw-gradient-to {\n  syntax: \"<color>\";\n  inherits: false;\n  initial-value: #0000;\n}\n@property --tw-gradient-stops {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-gradient-via-stops {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-gradient-from-position {\n  syntax: \"<length-percentage>\";\n  inherits: false;\n  initial-value: 0%;\n}\n@property --tw-gradient-via-position {\n  syntax: \"<length-percentage>\";\n  inherits: false;\n  initial-value: 50%;\n}\n@property --tw-gradient-to-position {\n  syntax: \"<length-percentage>\";\n  inherits: false;\n  initial-value: 100%;\n}\n@property --tw-leading {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-font-weight {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-tracking {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-shadow {\n  syntax: \"*\";\n  inherits: false;\n  initial-value: 0 0 #0000;\n}\n@property --tw-shadow-color {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-shadow-alpha {\n  syntax: \"<percentage>\";\n  inherits: false;\n  initial-value: 100%;\n}\n@property --tw-inset-shadow {\n  syntax: \"*\";\n  inherits: false;\n  initial-value: 0 0 #0000;\n}\n@property --tw-inset-shadow-color {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-inset-shadow-alpha {\n  syntax: \"<percentage>\";\n  inherits: false;\n  initial-value: 100%;\n}\n@property --tw-ring-color {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-ring-shadow {\n  syntax: \"*\";\n  inherits: false;\n  initial-value: 0 0 #0000;\n}\n@property --tw-inset-ring-color {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-inset-ring-shadow {\n  syntax: \"*\";\n  inherits: false;\n  initial-value: 0 0 #0000;\n}\n@property --tw-ring-inset {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-ring-offset-width {\n  syntax: \"<length>\";\n  inherits: false;\n  initial-value: 0px;\n}\n@property --tw-ring-offset-color {\n  syntax: \"*\";\n  inherits: false;\n  initial-value: #fff;\n}\n@property --tw-ring-offset-shadow {\n  syntax: \"*\";\n  inherits: false;\n  initial-value: 0 0 #0000;\n}\n@property --tw-blur {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-brightness {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-contrast {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-grayscale {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-hue-rotate {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-invert {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-opacity {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-saturate {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-sepia {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-drop-shadow {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-drop-shadow-color {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-drop-shadow-alpha {\n  syntax: \"<percentage>\";\n  inherits: false;\n  initial-value: 100%;\n}\n@property --tw-drop-shadow-size {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-backdrop-blur {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-backdrop-brightness {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-backdrop-contrast {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-backdrop-grayscale {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-backdrop-hue-rotate {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-backdrop-invert {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-backdrop-opacity {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-backdrop-saturate {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-backdrop-sepia {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-duration {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-ease {\n  syntax: \"*\";\n  inherits: false;\n}\n@layer properties {\n  @supports ((-webkit-hyphens: none) and (not (margin-trim: inline))) or ((-moz-orient: inline) and (not (color:rgb(from red r g b)))) {\n    #class1-english-runtime *,#class1-english-runtime ::before,#class1-english-runtime ::after,#class1-english-runtime ::backdrop {\n      --tw-translate-x: 0;\n      --tw-translate-y: 0;\n      --tw-translate-z: 0;\n      --tw-scale-x: 1;\n      --tw-scale-y: 1;\n      --tw-scale-z: 1;\n      --tw-rotate-x: initial;\n      --tw-rotate-y: initial;\n      --tw-rotate-z: initial;\n      --tw-skew-x: initial;\n      --tw-skew-y: initial;\n      --tw-space-y-reverse: 0;\n      --tw-space-x-reverse: 0;\n      --tw-divide-x-reverse: 0;\n      --tw-border-style: solid;\n      --tw-divide-y-reverse: 0;\n      --tw-gradient-position: initial;\n      --tw-gradient-from: #0000;\n      --tw-gradient-via: #0000;\n      --tw-gradient-to: #0000;\n      --tw-gradient-stops: initial;\n      --tw-gradient-via-stops: initial;\n      --tw-gradient-from-position: 0%;\n      --tw-gradient-via-position: 50%;\n      --tw-gradient-to-position: 100%;\n      --tw-leading: initial;\n      --tw-font-weight: initial;\n      --tw-tracking: initial;\n      --tw-shadow: 0 0 #0000;\n      --tw-shadow-color: initial;\n      --tw-shadow-alpha: 100%;\n      --tw-inset-shadow: 0 0 #0000;\n      --tw-inset-shadow-color: initial;\n      --tw-inset-shadow-alpha: 100%;\n      --tw-ring-color: initial;\n      --tw-ring-shadow: 0 0 #0000;\n      --tw-inset-ring-color: initial;\n      --tw-inset-ring-shadow: 0 0 #0000;\n      --tw-ring-inset: initial;\n      --tw-ring-offset-width: 0px;\n      --tw-ring-offset-color: #fff;\n      --tw-ring-offset-shadow: 0 0 #0000;\n      --tw-blur: initial;\n      --tw-brightness: initial;\n      --tw-contrast: initial;\n      --tw-grayscale: initial;\n      --tw-hue-rotate: initial;\n      --tw-invert: initial;\n      --tw-opacity: initial;\n      --tw-saturate: initial;\n      --tw-sepia: initial;\n      --tw-drop-shadow: initial;\n      --tw-drop-shadow-color: initial;\n      --tw-drop-shadow-alpha: 100%;\n      --tw-drop-shadow-size: initial;\n      --tw-backdrop-blur: initial;\n      --tw-backdrop-brightness: initial;\n      --tw-backdrop-contrast: initial;\n      --tw-backdrop-grayscale: initial;\n      --tw-backdrop-hue-rotate: initial;\n      --tw-backdrop-invert: initial;\n      --tw-backdrop-opacity: initial;\n      --tw-backdrop-saturate: initial;\n      --tw-backdrop-sepia: initial;\n      --tw-duration: initial;\n      --tw-ease: initial;\n    }\n  }\n}\n\n\n        #class1-english-runtime { background: #ffffff; }\n        #class1-english-runtime {\n            font-family: 'Quicksand', 'Nunito', sans-serif;\n            background: linear-gradient(135deg, #fdf2f8 0%, #fae8ff 50%, #f3e8ff 100%);\n            color: #4a4a4a;\n            user-select: none;\n            min-height: 100vh;\n            display: flex;\n            flex-direction: column;\n            align-items: center;\n            justify-content: flex-start;\n        }\n        #class1-english-runtime #screen-dashboard {\n            max-width: 82rem !important;\n        }\n\n        #class1-english-runtime .pastel-card {\n            background: #ffffff;\n            border-radius: 28px;\n            box-shadow: 0 12px 30px rgba(236, 72, 153, 0.12);\n            border: 3px solid #fbcfe8;\n        }\n        #class1-english-runtime .pastel-btn {\n            transition: all 0.2s ease;\n            box-shadow: 0 3px 10px rgba(0,0,0,0.05);\n        }\n        #class1-english-runtime .pastel-btn:hover {\n            transform: translateY(-2px);\n            box-shadow: 0 5px 15px rgba(0,0,0,0.09);\n        }\n        #class1-english-runtime .pastel-btn:active { transform: translateY(1px); }\n        @keyframes float {\n            0%, 100% { transform: translateY(0px); }\n            50% { transform: translateY(-6px); }\n        }\n        #class1-english-runtime .floating { animation: float 3s ease-in-out infinite; }\n        @keyframes sway {\n            0%, 100% { transform: translateY(0px) rotate(0deg); }\n            25% { transform: translateY(-5px) rotate(-7deg); }\n            75% { transform: translateY(-5px) rotate(7deg); }\n        }\n        #class1-english-runtime .swaying {\n            animation: sway 2.4s ease-in-out infinite;\n            display: inline-block;\n            transform-origin: bottom center;\n        }\n        @keyframes pulse-glow {\n            0%, 100% { filter: drop-shadow(0 0 6px rgba(236, 72, 153, 0.6)); transform: scale(1); }\n            50% { filter: drop-shadow(0 0 16px rgba(236, 72, 153, 0.9)); transform: scale(1.04); }\n        }\n        #class1-english-runtime .node-current {\n            animation: pulse-glow 2s infinite ease-in-out;\n            transform-origin: center;\n        }\n        #class1-english-runtime ::-webkit-scrollbar { width: 3px; height: 3px; }\n        #class1-english-runtime ::-webkit-scrollbar-track { background: #fdf2f8; }\n        #class1-english-runtime ::-webkit-scrollbar-thumb { background: #f472b6; border-radius: 10px; }\n        #class1-english-runtime ::-webkit-scrollbar-thumb:hover { background: #ec4899; }\n\n        /* TOAN1 UI V11 - 6 tab co dinh theo mau TV1 */\n        #class1-english-runtime .main-module-tab{\n            position:relative; min-height:46px; padding:7px 8px; border-radius:14px;\n            border:1.5px solid #f5c5df; background:linear-gradient(180deg,#fff,#fff8fc);\n            color:#7e3bb8; font-weight:900; font-size:13px; line-height:1.05;\n            display:flex; align-items:center; justify-content:center; gap:6px;\n            box-shadow:0 2px 7px rgba(109,40,217,.07);\n            transition:box-shadow .18s,border-color .18s,background .18s,color .18s;\n        }\n        #class1-english-runtime .main-module-tab:hover{border-color:#e879f9;box-shadow:0 0 13px rgba(217,70,239,.22);}\n        #class1-english-runtime .main-module-tab.is-active{\n            color:#fff; border-color:#d946ef;\n            background:linear-gradient(135deg,#ec4899 0%,#a855f7 55%,#7c3aed 100%);\n            box-shadow:0 5px 14px rgba(168,85,247,.28);\n        }\n        @media (min-width:768px){#class1-english-runtime .main-module-tab{min-height:50px;font-size:14px;}}\n\n        #class1-english-runtime .semester-switch-btn{\n            min-width:88px; height:34px; padding:0 14px; border-radius:12px;\n            font-weight:900; font-size:12px; transform:none !important;\n            transition:background .18s,color .18s,border-color .18s,box-shadow .18s,filter .18s !important;\n        }\n        #class1-english-runtime .semester-switch-btn:hover{transform:none !important;filter:brightness(1.04);}\n        #class1-english-runtime .semester-switch-btn.is-active{\n            color:#fff !important; background:linear-gradient(135deg,#ec4899 0%,#a855f7 100%) !important;\n            border:2px solid #c026d3 !important; box-shadow:0 5px 12px rgba(168,85,247,.28) !important;\n        }\n        #class1-english-runtime .semester-switch-btn.is-inactive{\n            color:#7e22ce !important; background:linear-gradient(135deg,#fff1f7 0%,#f5f3ff 100%) !important;\n            border:1.5px solid #e9d5ff !important; box-shadow:0 2px 6px rgba(126,34,206,.08) !important;\n        }\n\n        /* Toan 1 - breadcrumb header chi hien chu, bo icon de gon */\n        #class1-english-runtime #header-level2-icon { display:none !important; }\n        #class1-english-runtime #header-level2-title { margin-left:0 !important; }\n\n        @media (max-width:767px){\n            #class1-english-runtime #screen-login img[src=\"icon-512.png\"] {\n                border:none !important; border-radius:0 !important; box-shadow:none !important; background:transparent !important;\n            }\n            #class1-english-runtime .app-main-header{display:flex !important;flex-direction:column !important;align-items:stretch !important;gap:.35rem !important;padding:.35rem .45rem !important;}\n            #class1-english-runtime #header-nav-zone{display:flex !important;width:100% !important;min-width:0;justify-content:flex-start !important;overflow:hidden !important;}\n            #class1-english-runtime #btn-header-home{width:72px !important;height:48px !important;min-width:72px !important;}\n            #class1-english-runtime #header-learning-tabs{flex:1;min-width:0;overflow-x:auto;overflow-y:hidden;scrollbar-width:none;}\n            #class1-english-runtime #header-learning-tabs::-webkit-scrollbar{display:none;}\n            #class1-english-runtime #header-level2-icon{display:none !important;}\n            #class1-english-runtime #header-level2-tab > button{padding-left:.5rem !important;padding-right:.5rem !important;column-gap:0 !important;}\n            #class1-english-runtime #header-info-zone{display:flex !important;width:100% !important;justify-content:flex-end !important;gap:.35rem !important;min-width:0;}\n            #class1-english-runtime #btn-toggle-autospeech{width:38px !important;height:38px !important;min-width:38px !important;}\n            #class1-english-runtime #header-star-box{transform:none !important;margin-left:0 !important;}\n            #class1-english-runtime #user-info-box{margin-left:auto !important;min-width:0;text-align:right;}\n            #class1-english-runtime .semester-switch-btn{min-width:76px;height:32px;padding:0 9px;font-size:11px;}\n        }\n\n        @media print {\n            #class1-english-runtime * { visibility: hidden; }\n            #class1-english-runtime #printable-report-area,#class1-english-runtime #printable-report-area * { visibility: visible; }\n            #class1-english-runtime #printable-report-area {\n                position: absolute !important;\n                left: 0 !important;\n                top: 0 !important;\n                width: 100% !important;\n                background: white !important;\n                padding: 10px !important;\n            }\n            #class1-english-runtime .no-print { display: none !important; }\n            #class1-english-runtime .page-break-1 { page-break-after: always; break-after: page; }\n            #class1-english-runtime .page-break-2 { page-break-before: always; break-before: page; page-break-after: always; break-after: page; }\n            #class1-english-runtime .page-break-3 { page-break-before: always; break-before: page; }\n        }\n    \n\n        /* =========================================================\n           TOAN 1 UI 2026-09-20 - APP SHELL THEO CHUAN TV1\n           Chi thay presentation/layout, giu nguyen engine va workflow.\n           ========================================================= */\n        #class1-english-runtime { background:#ffffff !important; }\n        #class1-english-runtime #screen-dashboard { max-width:82rem !important; background:transparent !important; }\n\n        #class1-english-runtime .app-main-header{\n            display:grid !important;\n            grid-template-columns:auto minmax(0,1fr) auto;\n            align-items:center;\n            gap:10px;\n            padding:7px 0 !important;\n            background:transparent !important;\n            border:0 !important;\n            box-shadow:none !important;\n            backdrop-filter:none !important;\n            -webkit-backdrop-filter:none !important;\n            border-radius:0 !important;\n        }\n        #class1-english-runtime #btn-header-home{\n            width:101px !important; min-width:101px !important; height:67px !important;\n            border-radius:16px !important; box-shadow:0 3px 10px rgba(76,29,149,.08) !important;\n        }\n        #class1-english-runtime #header-info-zone{width:auto !important;min-width:0;margin-left:0 !important;justify-content:flex-end !important;gap:7px !important;}\n        #class1-english-runtime #btn-toggle-autospeech{display:none !important;}\n        #class1-english-runtime #header-star-box{\n            background:#fff7fb !important;\n            height:62px !important;\n            min-height:62px !important;\n            padding:5px 8px !important;\n            justify-content:center !important;\n        }\n        #class1-english-runtime #header-star-box > div > span:first-child{font-size:12px !important;padding:3px 7px !important;}\n        #class1-english-runtime #header-star-box > div > span:first-child i{font-size:13px !important;}\n        #class1-english-runtime #star-green-count,#class1-english-runtime #star-red-count{font-size:15px !important;min-width:16px;text-align:center;}\n\n        #class1-english-runtime #main-module-tabs{width:100%;min-width:0;background:transparent !important;border:0 !important;border-radius:0 !important;padding:0 !important;box-shadow:none !important;}\n        #class1-english-runtime #main-module-tabs > div{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:7px;}\n        #class1-english-runtime .main-module-tab{\n            min-width:0;min-height:62px;padding:7px 5px;border-radius:16px;flex-direction:column;gap:3px;\n            font-size:13px;line-height:1.05;border-width:1.5px;box-shadow:0 3px 9px rgba(76,29,149,.08);\n            position:relative;overflow:visible;\n        }\n        #class1-english-runtime .main-module-tab > span:first-child{font-size:21px !important;line-height:1;}\n        #class1-english-runtime .main-module-tab::after{content:'';position:absolute;left:34%;right:34%;bottom:-5px;height:3px;border-radius:99px;opacity:0;transform:scaleX(.45);transition:all .18s ease;background:currentColor;}\n        #class1-english-runtime .main-module-tab.is-active::after{opacity:.95;transform:scaleX(1);}\n        #class1-english-runtime .main-module-tab[data-tab=\"discover\"]{background:#f3e8ff;color:#7c3aed;border-color:#ddd6fe;}\n        #class1-english-runtime .main-module-tab[data-tab=\"lessons\"]{background:#fce7f3;color:#db2777;border-color:#fbcfe8;}\n        #class1-english-runtime .main-module-tab[data-tab=\"exercises\"]{background:#e0f2fe;color:#0369a1;border-color:#bae6fd;}\n        #class1-english-runtime .main-module-tab[data-tab=\"review\"]{background:#fef3c7;color:#b45309;border-color:#fde68a;}\n        #class1-english-runtime .main-module-tab[data-tab=\"exams\"]{background:#dcfce7;color:#15803d;border-color:#bbf7d0;}\n        #class1-english-runtime .main-module-tab[data-tab=\"games\"]{background:#ede9fe;color:#6d28d9;border-color:#ddd6fe;}\n        #class1-english-runtime .main-module-tab[data-tab=\"discover\"].is-active{background:linear-gradient(135deg,#a855f7,#7c3aed);color:#fff;border-color:#8b5cf6;box-shadow:0 7px 17px rgba(124,58,237,.27);}\n        #class1-english-runtime .main-module-tab[data-tab=\"lessons\"].is-active{background:linear-gradient(135deg,#f472b6,#ec4899);color:#fff;border-color:#ec4899;box-shadow:0 7px 17px rgba(236,72,153,.25);}\n        #class1-english-runtime .main-module-tab[data-tab=\"exercises\"].is-active{background:linear-gradient(135deg,#38bdf8,#0284c7);color:#fff;border-color:#0ea5e9;box-shadow:0 7px 17px rgba(14,165,233,.25);}\n        #class1-english-runtime .main-module-tab[data-tab=\"review\"].is-active{background:linear-gradient(135deg,#fbbf24,#f59e0b);color:#fff;border-color:#f59e0b;box-shadow:0 7px 17px rgba(245,158,11,.25);}\n        #class1-english-runtime .main-module-tab[data-tab=\"exams\"].is-active{background:linear-gradient(135deg,#4ade80,#16a34a);color:#fff;border-color:#22c55e;box-shadow:0 7px 17px rgba(34,197,94,.24);}\n        #class1-english-runtime .main-module-tab[data-tab=\"games\"].is-active{background:linear-gradient(135deg,#8b5cf6,#6d28d9);color:#fff;border-color:#7c3aed;box-shadow:0 7px 17px rgba(109,40,217,.25);}\n\n        #class1-english-runtime #app-banner-slot{width:100%;position:relative;}\n        #class1-english-runtime #app-main-banner{position:relative;width:100%;aspect-ratio:6/1;min-height:0;overflow:hidden;border-radius:0;border:0;box-shadow:none;background:#fff;}\n        #class1-english-runtime #app-main-banner picture{display:block;width:100%;height:100%;}\n        #class1-english-runtime #app-main-banner img{width:100%;height:100%;object-fit:cover;display:block;}\n        #class1-english-runtime .app-main-banner-copy{position:absolute;left:50%;top:48%;transform:translate(-50%,-50%);width:36%;text-align:center;pointer-events:none;text-shadow:0 2px 0 rgba(255,255,255,.9),0 3px 12px rgba(126,34,206,.12);}\n        #class1-english-runtime .app-main-banner-title{font-size:clamp(21px,2.35vw,34px);line-height:1;font-weight:900;color:#ec4899;letter-spacing:-.02em;}\n        #class1-english-runtime .app-main-banner-teacher{margin-top:5px;font-size:clamp(12px,1.15vw,17px);font-weight:900;color:#7e22ce;}\n        #class1-english-runtime #app-context-banner.hidden,#class1-english-runtime #app-main-banner.hidden{display:none !important;}\n        #class1-english-runtime #app-context-banner{position:relative;min-height:58px;overflow:hidden;border-radius:0;border:0 !important;background:none !important;box-shadow:none !important;display:flex;align-items:center;padding:7px 10px;}\n        #class1-english-runtime #app-context-banner::before{content:'';position:absolute;inset:0;background-image:url('banner-sub.jpg');background-size:cover;background-position:center;background-repeat:no-repeat;transform:none;opacity:1;filter:none;pointer-events:none;z-index:0;}\n        #class1-english-runtime #header-learning-tabs{width:100% !important;max-width:none !important;flex:1 1 auto !important;min-width:0 !important;overflow-x:auto !important;overflow-y:hidden !important;scrollbar-width:none;gap:5px;position:relative;z-index:2;}\n        #class1-english-runtime #header-learning-tabs::-webkit-scrollbar{display:none;}\n        #class1-english-runtime #header-level2-tab,#class1-english-runtime #header-level3-tab,#class1-english-runtime #header-level4-tab{width:auto !important;min-width:0 !important;max-width:none !important;flex:0 0 auto !important;overflow:visible !important;}\n        #class1-english-runtime #header-level2-tab > button,#class1-english-runtime #header-level3-tab > div,#class1-english-runtime #header-level4-tab > div{height:38px !important;max-width:220px !important;min-width:0 !important;padding:0 12px !important;border-radius:13px !important;background:rgba(255,255,255,.50) !important;backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px);box-shadow:0 2px 7px rgba(76,29,149,.08) !important;}\n        #class1-english-runtime #header-level2-tab > button{color:#be185d !important;border:1.5px solid #f9a8d4 !important;}\n        #class1-english-runtime #header-level3-tab > div{color:#7e22ce !important;border:1.5px solid #d8b4fe !important;}\n        #class1-english-runtime #header-level4-tab > div{color:#b45309 !important;border:1.5px solid #fde68a !important;}\n        #class1-english-runtime #header-level2-title,#class1-english-runtime #header-level3-title,#class1-english-runtime #header-level4-title{font-size:12px !important;font-weight:900 !important;}\n        #class1-english-runtime #header-level3-tab > span,#class1-english-runtime #header-level4-tab > span{color:#c084fc !important;font-size:13px !important;}\n        #class1-english-runtime #header-level2-icon{display:none !important;}\n\n        #class1-english-runtime #app-footer{width:100%;max-width:82rem;min-height:76px;margin:10px auto 0;padding:0 14px;border-radius:0;background-image:url('footer-bg.jpg');background-size:cover;background-position:center;background-repeat:no-repeat;display:flex;align-items:center;justify-content:center;text-align:center;color:#1827f2;border:0;box-shadow:none;}\n        #class1-english-runtime #app-footer .footer-title{font-size:17px;font-weight:900;line-height:1.35;text-shadow:0 1px 0 #fff;}\n        #class1-english-runtime #app-footer .footer-sub{font-size:13px;font-weight:800;line-height:1.35;color:#1827f2;text-shadow:0 1px 0 #fff;}\n\n        /* Root view: bo khung ngoai, chi giu card noi dung. */\n        #class1-english-runtime #view-bai-hoc-hub,#class1-english-runtime #view-roadmap,#class1-english-runtime #view-minigame-hub,#class1-english-runtime #view-exam-hub{background:transparent !important;border:0 !important;box-shadow:none !important;border-radius:0 !important;padding-left:0 !important;padding-right:0 !important;}\n        #class1-english-runtime #roadmap-svg-container{background:transparent !important;border:0 !important;border-radius:0 !important;box-shadow:none !important;padding-left:0 !important;padding-right:0 !important;}\n        #class1-english-runtime:has(#main-tab-review.is-active) #view-lecture{background:transparent !important;border:0 !important;box-shadow:none !important;border-radius:0 !important;padding-left:0 !important;padding-right:0 !important;}\n\n        /* Man nhanh: bo khung ngoai va chieu cao gia. */\n        #class1-english-runtime #view-lecture,#class1-english-runtime #view-bai-hoc-lesson,#class1-english-runtime #view-game-play{background:transparent !important;border:0 !important;box-shadow:none !important;border-radius:0 !important;min-height:0 !important;padding:8px 0 !important;}\n        #class1-english-runtime #view-quiz > .pastel-card{background:transparent !important;border:0 !important;box-shadow:none !important;border-radius:0 !important;min-height:0 !important;padding:8px 0 !important;}\n        #class1-english-runtime #view-lecture{justify-content:flex-start !important;gap:8px !important;}\n        #class1-english-runtime #view-lecture > .w-full{gap:8px !important;}\n        #class1-english-runtime #view-lecture .mb-3,#class1-english-runtime #view-lecture .mb-2\\.5{margin-bottom:8px !important;}\n        #class1-english-runtime #view-lecture .mt-2\\.5{margin-top:8px !important;}\n        #class1-english-runtime #view-lecture .pt-2{padding-top:8px !important;}\n        #class1-english-runtime #view-quiz{gap:8px !important;}\n        #class1-english-runtime #view-quiz #question-box{margin-top:4px !important;margin-bottom:4px !important;}\n        /* Khoảng cách đáp án -> điều hướng = xấp xỉ 1/2 chiều cao nút Câu tiếp theo. */\n        #class1-english-runtime #view-quiz #quiz-bottom-nav{padding-top:22px !important;}\n        #class1-english-runtime #btn-next-q-prac,#class1-english-runtime #btn-next-q-exam{height:43px !important;min-height:43px !important;padding-top:0 !important;padding-bottom:0 !important;}\n\n        @media (max-width:767px){\n            #class1-english-runtime .app-main-header{display:grid !important;grid-template-columns:auto minmax(0,1fr);grid-template-rows:auto auto;gap:7px !important;padding:7px 0 !important;}\n            #class1-english-runtime #btn-header-home{grid-column:1;grid-row:1;width:86px !important;min-width:86px !important;height:58px !important;justify-self:start;}\n            #class1-english-runtime #header-info-zone{grid-column:2;grid-row:1;justify-self:end !important;width:auto !important;gap:5px !important;}\n            #class1-english-runtime #main-module-tabs{grid-column:1 / 3;grid-row:2;width:100% !important;}\n            #class1-english-runtime #main-module-tabs > div{grid-template-columns:repeat(3,minmax(0,1fr));gap:6px;}\n            #class1-english-runtime .main-module-tab{min-height:52px;flex-direction:row;gap:6px;font-size:12px;padding:6px 8px;border-radius:15px;}\n            #class1-english-runtime .main-module-tab > span:first-child{font-size:18px !important;}\n            #class1-english-runtime .main-module-tab::after{bottom:-4px;height:2px;}\n            #class1-english-runtime #header-star-box{transform:none !important;margin-left:0 !important;height:52px !important;min-height:52px !important;padding:3px 6px !important;}\n            #class1-english-runtime #header-star-box > div > span:first-child{font-size:10px !important;padding:2px 5px !important;}\n            #class1-english-runtime #header-star-box > div > span:first-child i{font-size:11px !important;}\n            #class1-english-runtime #star-green-count,#class1-english-runtime #star-red-count{font-size:13px !important;}\n            #class1-english-runtime #user-info-box{margin-left:0 !important;min-width:0;text-align:right;}\n            #class1-english-runtime #user-info-box .admin-manage-label{display:none !important;}\n            #class1-english-runtime #user-info-box button[title=\"Quản lý tài khoản\"]{width:34px !important;padding-left:0 !important;padding-right:0 !important;justify-content:center !important;}\n            #class1-english-runtime #app-main-banner{aspect-ratio:4/1;border-radius:0;}\n            #class1-english-runtime .app-main-banner-copy{width:39%;left:51%;top:49%;}\n            #class1-english-runtime .app-main-banner-title{font-size:clamp(13px,4.2vw,20px);}\n            #class1-english-runtime .app-main-banner-teacher{font-size:clamp(9px,2.8vw,13px);margin-top:2px;}\n            #class1-english-runtime #app-context-banner{min-height:52px;border-radius:0;padding:6px 8px;}\n            #class1-english-runtime #header-learning-tabs{gap:4px;}\n            #class1-english-runtime #header-level2-tab > button,#class1-english-runtime #header-level3-tab > div,#class1-english-runtime #header-level4-tab > div{height:34px !important;max-width:150px !important;padding:0 9px !important;border-radius:11px !important;}\n            #class1-english-runtime #header-level2-title,#class1-english-runtime #header-level3-title,#class1-english-runtime #header-level4-title{font-size:11px !important;}\n            #class1-english-runtime #app-footer{min-height:64px;margin-top:8px;border-radius:0;}\n            #class1-english-runtime #app-footer .footer-title{font-size:14px;}\n            #class1-english-runtime #app-footer .footer-sub{font-size:12px;}\n            #class1-english-runtime #view-lecture,#class1-english-runtime #view-bai-hoc-lesson,#class1-english-runtime #view-game-play,#class1-english-runtime #view-quiz > .pastel-card{padding-top:6px !important;padding-bottom:6px !important;}\n        }\n\n\n        /* TOAN 1 - CHUAN BANNER / FOOTER / NEN THEO TV1 2026-09-22 */\n        #class1-english-runtime,#class1-english-runtime,#class1-english-runtime #screen-dashboard,#class1-english-runtime #app-viewport,#class1-english-runtime #view-dashboard-grid { background:#ffffff !important; }\n\n        /* Khám phá: giữ pastel nhẹ theo nhóm, bỏ shadow để nền trang thật sự thoáng. */\n        #class1-english-runtime #view-dashboard-grid .pastel-card,#class1-english-runtime #view-dashboard-grid .pastel-card:hover {\n            box-shadow:none !important;\n            border-width:1px !important;\n        }\n        #class1-english-runtime #view-dashboard-grid .pastel-card:has(h3.text-pink-700)    { background:rgba(253,242,248,.82) !important; }\n        #class1-english-runtime #view-dashboard-grid .pastel-card:has(h3.text-purple-700)  { background:rgba(250,245,255,.84) !important; }\n        #class1-english-runtime #view-dashboard-grid .pastel-card:has(h3.text-blue-700)    { background:rgba(239,246,255,.86) !important; }\n        #class1-english-runtime #view-dashboard-grid .pastel-card:has(h3.text-fuchsia-700) { background:rgba(253,244,255,.84) !important; }\n        #class1-english-runtime #view-dashboard-grid .pastel-card:has(h3.text-emerald-700) { background:rgba(236,253,245,.86) !important; }\n        #class1-english-runtime #view-dashboard-grid .pastel-card:has(h3.text-indigo-700)  { background:rgba(238,242,255,.86) !important; }\n        #class1-english-runtime #view-dashboard-grid .pastel-card:has(h3.text-amber-700)   { background:rgba(255,251,235,.88) !important; }\n        #class1-english-runtime #view-dashboard-grid .pastel-card:has(h3.text-rose-700)    { background:rgba(255,241,242,.86) !important; }\n        #class1-english-runtime #view-dashboard-grid .pastel-card:has(h3.text-teal-700)    { background:rgba(240,253,250,.88) !important; }\n        #class1-english-runtime #view-dashboard-grid .pastel-card:has(h3.text-yellow-700)  { background:rgba(254,252,232,.90) !important; }\n\n        /* Toán 1 - tăng cỡ chữ 6 tab chính trên header cho cân với tiêu đề card Khám phá. */\n        @media (min-width:768px){\n            #class1-english-runtime .main-module-tab{ font-size:16px !important; }\n        }\n\n        /* Breadcrumb desktop: tự giãn theo nội dung, tối đa 440px như TV1. */\n        @media (min-width:768px){\n            #class1-english-runtime #header-level2-tab > button,#class1-english-runtime #header-level3-tab > div,#class1-english-runtime #header-level4-tab > div {\n                width:auto !important; min-width:0 !important; max-width:440px !important;\n                padding-left:18px !important; padding-right:18px !important;\n            }\n            #class1-english-runtime #header-level2-title,#class1-english-runtime #header-level3-title,#class1-english-runtime #header-level4-title {\n                font-size:14px !important; max-width:400px !important; overflow:hidden !important;\n                text-overflow:ellipsis !important; white-space:nowrap !important;\n            }\n        }\n\n    \n        /* TOAN 1 - FOOTER 8:1 DONG BO TV2 2026-09-22 */\n        #class1-english-runtime #app-footer {\n            aspect-ratio: 8 / 1 !important;\n            min-height: 0 !important;\n            height: auto !important;\n            background-image: url('footer-bg.jpg') !important;\n            background-size: cover !important;\n            background-position: center !important;\n            background-repeat: no-repeat !important;\n        }\n\n        @media (max-width: 767px) {\n            #class1-english-runtime #app-footer {\n                aspect-ratio: 8 / 1 !important;\n                min-height: 0 !important;\n                height: auto !important;\n            }\n        }\n\n\n        /* TOAN 1 - FOOTER RONG BANG BANNER */\n        #class1-english-runtime #app-footer {\n            width: calc(100% - 1rem) !important;\n            max-width: 82rem !important;\n            box-sizing: border-box !important;\n        }\n\n        @media (max-width: 767px) {\n            #class1-english-runtime #app-footer {\n                width: calc(100% - 0.5rem) !important;\n                max-width: none !important;\n            }\n        }\n\n\n        /* TOAN 1 - MOBILE: NUT QUAN LY CHI GIU ICON */\n        @media (max-width: 767px) {\n            #class1-english-runtime #user-info-box button[title=\"Quản lý tài khoản\"] {\n                width: 34px !important;\n                min-width: 34px !important;\n                padding-left: 0 !important;\n                padding-right: 0 !important;\n                justify-content: center !important;\n                font-size: 0 !important;\n                overflow: hidden !important;\n                white-space: nowrap !important;\n            }\n\n            #class1-english-runtime #user-info-box button[title=\"Quản lý tài khoản\"] i {\n                font-size: 14px !important;\n                margin: 0 !important;\n            }\n\n            #class1-english-runtime #user-info-box button[title=\"Quản lý tài khoản\"] .admin-manage-label {\n                display: none !important;\n            }\n        }\n\n\n        /* TOAN 1 - MOBILE: TANG CO CHU HEADER VA CARD KHAM PHA */\n        @media (max-width: 767px) {\n            #class1-english-runtime .main-module-tab {\n                font-size: 15px !important;\n                font-weight: 900 !important;\n            }\n            #class1-english-runtime #view-dashboard-grid .pastel-card h3 {\n                font-size: 18px !important;\n                line-height: 1.25 !important;\n            }\n            #class1-english-runtime #view-dashboard-grid .pastel-card > div:last-child {\n                font-size: 14px !important;\n                line-height: 1.45 !important;\n            }\n        }\n\n\n\n        /* =========================================================\n           MỤC 12 - HỌC TOÁN THEO PHƯƠNG PHÁP MỚI / EPSILON METHOD\n           ========================================================= */\n        #class1-english-runtime #view-epsilon-method-hub,#class1-english-runtime #view-number-sense,#class1-english-runtime #view-operation-sense{background:transparent!important;border:0!important;box-shadow:none!important;padding:0!important;}\n        #class1-english-runtime .em-hero{border:1.5px solid #e9d5ff;border-radius:28px;background:linear-gradient(135deg,#fff7fb 0%,#faf5ff 46%,#eff6ff 100%);padding:20px 22px;display:flex;align-items:center;justify-content:space-between;gap:20px;box-shadow:0 7px 20px rgba(126,34,206,.06);}\n        #class1-english-runtime .em-hero-flow{max-width:390px;border-radius:20px;background:rgba(255,255,255,.88);border:1px solid #d8b4fe;padding:11px 14px;text-align:center;font-size:12px;line-height:1.55;font-weight:900;color:#7e22ce;}\n        #class1-english-runtime .em-track-card{width:100%;border:2px solid #ede9fe;border-radius:24px;background:linear-gradient(180deg,#fff,#fdfcff);padding:17px;box-shadow:0 5px 16px rgba(76,29,149,.06);transition:transform .16s,box-shadow .16s,border-color .16s;}\n        #class1-english-runtime .em-track-card:hover{transform:translateY(-2px);box-shadow:0 11px 25px rgba(76,29,149,.10);border-color:#d8b4fe;}\n        #class1-english-runtime .em-track-icon{width:48px;height:48px;border-radius:17px;background:linear-gradient(135deg,#fce7f3,#ede9fe,#dbeafe);display:flex;align-items:center;justify-content:center;font-size:25px;flex:0 0 auto;}\n        #class1-english-runtime .em-method-badge{flex:0 0 auto;border-radius:999px;border:1px solid #f0abfc;background:#fdf4ff;color:#a21caf;padding:5px 9px;font-size:10px;font-weight:900;}\n        #class1-english-runtime .em-stat-pill{border-radius:999px;border:1px solid #e2e8f0;background:#f8fafc;padding:5px 9px;}\n\n        /* 12.1 - EPSILON NUMBER SENSE */\n        #class1-english-runtime .ns-hero{border:1.5px solid #fbcfe8;border-radius:26px;background:linear-gradient(135deg,#fff7fb 0%,#faf5ff 52%,#f0f9ff 100%);padding:18px 20px;display:flex;align-items:center;justify-content:space-between;gap:18px;}\n        #class1-english-runtime .ns-hero-flow{max-width:360px;border-radius:18px;background:rgba(255,255,255,.82);border:1px solid #e9d5ff;padding:10px 13px;text-align:center;font-size:12px;line-height:1.45;font-weight:900;color:#7e22ce;}\n        #class1-english-runtime .ns-journey-card{width:100%;border:1.5px solid #ede9fe;border-radius:22px;background:#fff;padding:14px;box-shadow:0 4px 13px rgba(76,29,149,.06);transition:transform .16s,box-shadow .16s,border-color .16s;}\n        #class1-english-runtime .ns-journey-card:hover{transform:translateY(-2px);box-shadow:0 9px 22px rgba(76,29,149,.10);border-color:#d8b4fe;}\n        #class1-english-runtime .ns-journey-icon{width:42px;height:42px;border-radius:15px;background:linear-gradient(135deg,#fce7f3,#ede9fe);display:flex;align-items:center;justify-content:center;font-size:22px;flex:0 0 auto;}\n        #class1-english-runtime .ns-teacher-bubble{display:flex;align-items:flex-start;gap:10px;border:1.5px solid #fbcfe8;border-radius:20px;background:linear-gradient(135deg,#fff1f7,#fff);padding:12px 14px;}\n        #class1-english-runtime .ns-listen-btn{flex:0 0 auto;border-radius:14px;border:1px solid #fbcfe8;background:#fff;color:#be185d;padding:7px 10px;font-size:11px;font-weight:900;white-space:nowrap;}\n        #class1-english-runtime .ns-listen-btn:hover{background:#fdf2f8;}\n        #class1-english-runtime .ns-workspace{border:1.5px solid #e9d5ff;border-radius:26px;background:linear-gradient(180deg,#fff 0%,#fdfcff 100%);padding:16px;min-height:340px;display:flex;flex-direction:column;justify-content:center;box-shadow:0 5px 18px rgba(76,29,149,.05);}\n        #class1-english-runtime .ns-visual-box{min-height:126px;border-radius:22px;border:2px dashed #ddd6fe;background:linear-gradient(135deg,#faf5ff,#fff7ed);padding:18px;display:flex;align-items:center;justify-content:center;}\n        #class1-english-runtime .ns-object-row{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:10px;}\n        #class1-english-runtime .ns-static-object{display:inline-flex;align-items:center;justify-content:center;min-width:42px;min-height:42px;font-size:38px;line-height:1.05;}\n        #class1-english-runtime .ns-choice{min-height:56px;border-radius:17px;border:2px solid #e9d5ff;background:#fff;padding:10px 12px;font-size:18px;font-weight:900;color:#4c1d95;box-shadow:0 3px 8px rgba(76,29,149,.06);transition:all .15s;}\n        #class1-english-runtime .ns-choice:hover{border-color:#c084fc;background:#faf5ff;transform:translateY(-1px);}\n        #class1-english-runtime .ns-primary-btn{border-radius:16px;background:linear-gradient(135deg,#ec4899,#8b5cf6);color:#fff;padding:10px 16px;font-weight:900;font-size:14px;box-shadow:0 5px 13px rgba(168,85,247,.20);}\n        #class1-english-runtime .ns-secondary-btn{border-radius:14px;background:#fff;border:1.5px solid #e9d5ff;color:#7e22ce;padding:9px 13px;font-weight:900;font-size:12px;}\n        #class1-english-runtime .ns-evidence-pill{display:inline-flex;align-items:center;border-radius:999px;background:#f8fafc;border:1px solid #e2e8f0;padding:5px 9px;font-size:10px;font-weight:900;color:#64748b;}\n        #class1-english-runtime .ns-touch-object{position:relative;width:68px;height:68px;border-radius:20px;border:2px solid #e9d5ff;background:#fff;font-size:38px;display:inline-flex;align-items:center;justify-content:center;box-shadow:0 3px 8px rgba(76,29,149,.06);transition:all .15s;}\n        #class1-english-runtime .ns-touch-object.is-counted{background:#ecfdf5;border-color:#6ee7b7;transform:scale(.95);}\n        #class1-english-runtime .ns-count-badge{position:absolute;right:-6px;top:-8px;width:26px;height:26px;border-radius:999px;background:#10b981;color:white;font-size:12px;display:flex;align-items:center;justify-content:center;border:2px solid white;}\n        #class1-english-runtime .ns-bank,#class1-english-runtime .ns-tray,#class1-english-runtime .ns-group-card,#class1-english-runtime .ns-whole-card,#class1-english-runtime .ns-part-card{border-radius:20px;border:1.5px solid #e9d5ff;background:#fafaff;padding:14px;text-align:center;}\n        #class1-english-runtime .ns-tray{min-height:155px;background:linear-gradient(180deg,#fff7fb,#fff);border-style:dashed;border-color:#f9a8d4;}\n        #class1-english-runtime .ns-bank-object{width:54px;height:54px;border-radius:16px;border:1.5px solid #e9d5ff;background:white;font-size:30px;cursor:grab;}\n        #class1-english-runtime .ns-symbol-card{max-width:560px;margin:0 auto;border-radius:22px;border:2px solid #ddd6fe;background:linear-gradient(135deg,#f5f3ff,#fff);padding:22px;font-size:34px;font-weight:900;line-height:1.5;color:#4c1d95;}\n        #class1-english-runtime .ns-frame{max-width:460px;margin:0 auto;display:grid;grid-template-columns:repeat(5,minmax(48px,1fr));border:3px solid #7c3aed;border-radius:14px;overflow:hidden;background:#fff;}\n        #class1-english-runtime .ns-frame.ns-frame-10{grid-template-rows:repeat(2,68px);}\n        #class1-english-runtime .ns-frame-cell{height:76px;border-right:2px solid #c4b5fd;border-bottom:2px solid #c4b5fd;background:white;font-size:42px;font-weight:900;color:#ec4899;}\n        #class1-english-runtime .ns-frame-cell:nth-child(5n){border-right:0;}\n        #class1-english-runtime .ns-frame-cell.is-filled{background:#fdf2f8;}\n\n        /* 12.2 - EPSILON OPERATIONAL SENSE */\n        #class1-english-runtime .os-hero{border:1.5px solid #ddd6fe;border-radius:26px;background:linear-gradient(135deg,#faf5ff 0%,#eef2ff 52%,#eff6ff 100%);padding:18px 20px;display:flex;align-items:center;justify-content:space-between;gap:18px;}\n        #class1-english-runtime .os-hero-flow{max-width:390px;border-radius:18px;background:rgba(255,255,255,.85);border:1px solid #c7d2fe;padding:10px 13px;text-align:center;font-size:12px;line-height:1.45;font-weight:900;color:#5b21b6;}\n        #class1-english-runtime .os-journey-icon{width:42px;height:42px;border-radius:15px;background:linear-gradient(135deg,#ede9fe,#dbeafe);display:flex;align-items:center;justify-content:center;font-size:22px;flex:0 0 auto;}\n        #class1-english-runtime .os-teacher-bubble{border-color:#ddd6fe;background:linear-gradient(135deg,#faf5ff,#fff);}\n        #class1-english-runtime .os-bank-object{width:54px;height:54px;border-radius:16px;border:1.5px solid #c7d2fe;background:white;font-size:30px;cursor:pointer;box-shadow:0 3px 8px rgba(79,70,229,.06);transition:all .15s;}\n        #class1-english-runtime .os-bank-object:hover{transform:translateY(-2px);border-color:#8b5cf6;}\n        #class1-english-runtime .os-action-object{position:relative;width:68px;height:68px;border-radius:20px;border:2px solid #ddd6fe;background:#fff;font-size:38px;display:inline-flex;align-items:center;justify-content:center;box-shadow:0 3px 8px rgba(79,70,229,.06);transition:all .15s;}\n        #class1-english-runtime .os-action-object.is-removed{opacity:.42;transform:translateY(-12px) scale(.88);border-style:dashed;border-color:#fb7185;background:#fff1f2;}\n        #class1-english-runtime .os-action-object.is-selected{background:#eef2ff;border-color:#818cf8;transform:scale(.94);}\n        #class1-english-runtime .os-away-mark{position:absolute;right:-5px;top:-8px;width:26px;height:26px;border-radius:999px;background:#f43f5e;color:white;font-size:12px;display:flex;align-items:center;justify-content:center;border:2px solid white;}\n        #class1-english-runtime .os-story-card{border:1.5px solid #c7d2fe;border-radius:18px;background:#fff;padding:12px;text-align:center;min-height:86px;display:flex;flex-direction:column;justify-content:center;}\n        #class1-english-runtime .os-story-label{font-size:9px;font-weight:900;color:#6366f1;letter-spacing:.08em;}\n        #class1-english-runtime .os-story-value{font-size:30px;line-height:1.1;font-weight:900;color:#312e81;margin-top:5px;}\n        #class1-english-runtime .os-pair-row{display:grid;grid-auto-flow:column;grid-auto-columns:minmax(42px,1fr);gap:5px;}\n        #class1-english-runtime .os-pair-cell{min-height:50px;border-radius:13px;border:1px solid #dbeafe;background:#fff;display:flex;align-items:center;justify-content:center;font-size:29px;}\n        #class1-english-runtime .os-balance{display:grid;grid-template-columns:1fr auto 1fr;align-items:end;gap:12px;max-width:720px;margin:0 auto;}\n        #class1-english-runtime .os-balance-pan{min-height:110px;border-radius:20px 20px 28px 28px;border:2px solid #c7d2fe;background:linear-gradient(180deg,#fff,#eef2ff);display:flex;align-items:center;justify-content:center;font-size:28px;font-weight:900;color:#312e81;box-shadow:0 8px 0 -4px #c7d2fe;}\n        #class1-english-runtime .os-path-cell{width:48px;height:48px;border-radius:14px;border:1.5px solid #c7d2fe;background:white;display:flex;align-items:center;justify-content:center;font-weight:900;color:#475569;transition:all .15s;}\n        #class1-english-runtime .os-path-cell.is-current{background:linear-gradient(135deg,#8b5cf6,#4f46e5);color:white;border-color:#4f46e5;transform:translateY(-3px) scale(1.08);box-shadow:0 6px 14px rgba(79,70,229,.25);}\n\n        @media(max-width:767px){\n            #class1-english-runtime .em-hero,#class1-english-runtime .ns-hero,#class1-english-runtime .os-hero{padding:14px;align-items:flex-start;flex-direction:column;}\n            #class1-english-runtime .em-hero-flow,#class1-english-runtime .ns-hero-flow,#class1-english-runtime .os-hero-flow{max-width:none;width:100%;}\n            #class1-english-runtime .em-track-card{padding:14px;}\n            #class1-english-runtime .ns-workspace{padding:12px;min-height:300px}#class1-english-runtime .ns-static-object{font-size:31px;min-width:34px;min-height:34px}#class1-english-runtime .ns-touch-object{width:58px;height:58px;font-size:31px}#class1-english-runtime .ns-choice{min-height:50px;font-size:16px}#class1-english-runtime .ns-frame-cell{height:60px;font-size:34px}#class1-english-runtime .ns-frame.ns-frame-10{grid-template-rows:repeat(2,58px)}#class1-english-runtime .ns-symbol-card{font-size:28px;padding:16px;}\n            #class1-english-runtime .ns-teacher-bubble{flex-wrap:wrap}#class1-english-runtime .ns-listen-btn{margin-left:34px;}\n            #class1-english-runtime .os-action-object{width:58px;height:58px;font-size:31px}#class1-english-runtime .os-story-card{padding:8px;min-height:74px}#class1-english-runtime .os-story-value{font-size:25px}#class1-english-runtime .os-balance-pan{min-height:90px;font-size:22px}#class1-english-runtime .os-path-cell{width:42px;height:42px}#class1-english-runtime .os-pair-cell{min-height:44px;font-size:24px}\n        }\n\n\n#class1-english-runtime{width:100%;max-width:100%;font-family:'Quicksand','Nunito',system-ui,sans-serif;color:#4a4a4a;user-select:none;position:relative;}\n#class1-english-runtime #screen-dashboard{width:100%!important;max-width:100%!important;padding:0!important;margin:0!important;}\n#class1-english-runtime .app-main-header,#class1-english-runtime #dashboard-header,#class1-english-runtime #app-banner-slot{display:none!important;}\n#class1-english-runtime #app-viewport{width:100%!important;max-width:100%!important;margin-bottom:0!important;padding-bottom:0!important;}\n/* Module Toán: bỏ khoảng đệm đáy của khung Lớp 1 để nội dung chạm sát footer. */\n#content-stage:has(#class1-english-runtime){padding-bottom:0!important;}\n#content-stage:has(#class1-english-runtime)+.app-footer{margin-top:0!important;}\n#class1-english-runtime #view-dashboard-grid{align-items:stretch;}\n#class1-english-runtime .fixed{position:fixed;}\n#class1-english-runtime img{max-width:100%;}\n#class1-english-runtime button,#class1-english-runtime input,#class1-english-runtime select,#class1-english-runtime textarea{font:inherit;}\n#class1-english-runtime [hidden]{display:none!important;}\n\n/* Class 1 compact vertical layout: tiết kiệm chiều cao, sát banner và footer. */\n#class1-english-runtime{min-height:0!important;height:auto!important;display:block!important;}\n#class1-english-runtime #screen-dashboard{min-height:0!important;height:auto!important;gap:0!important;}\n#class1-english-runtime #screen-dashboard > *{margin-block-start:0!important;margin-block-end:0!important;}\n#class1-english-runtime #app-viewport{min-height:0!important;height:auto!important;margin-top:0!important;margin-bottom:0!important;padding-top:0!important;padding-bottom:0!important;}\n#content-stage:has(#class1-english-runtime){min-height:0!important;padding:.5rem .05rem 0!important;}\n#content-stage:has(#class1-english-runtime)+.app-footer{margin-top:0!important;}\n#class1-english-runtime #view-dashboard-grid,\n#class1-english-runtime #view-epsilon-method-hub,\n#class1-english-runtime #view-number-sense,\n#class1-english-runtime #view-operation-sense,\n#class1-english-runtime #view-bai-hoc-hub,\n#class1-english-runtime #view-bai-hoc-lesson,\n#class1-english-runtime #view-lecture,\n#class1-english-runtime #view-quiz,\n#class1-english-runtime #view-roadmap,\n#class1-english-runtime #view-minigame-hub,\n#class1-english-runtime #view-game-play,\n#class1-english-runtime #view-exam-hub,\n#class1-english-runtime #view-result{margin-top:0!important;margin-bottom:0!important;}\n#class1-english-runtime #view-bai-hoc-hub,\n#class1-english-runtime #view-bai-hoc-lesson,\n#class1-english-runtime #view-lecture,\n#class1-english-runtime #view-roadmap,\n#class1-english-runtime #view-minigame-hub,\n#class1-english-runtime #view-game-play,\n#class1-english-runtime #view-exam-hub{min-height:0!important;padding-top:.35rem!important;padding-bottom:.35rem!important;}\n#class1-english-runtime #view-exam-hub{justify-content:flex-start!important;}\n#class1-english-runtime #view-quiz{gap:.3rem!important;}\n#class1-english-runtime #view-quiz > .pastel-card{min-height:0!important;padding-top:.35rem!important;padding-bottom:.35rem!important;}\n#class1-english-runtime #view-quiz #question-box{margin-top:0!important;margin-bottom:0!important;}\n#class1-english-runtime #view-dashboard-grid{padding-top:0!important;padding-bottom:0!important;}\n\n@media(max-width:767px){\n  #content-stage:has(#class1-english-runtime){padding-top:.08rem!important;padding-bottom:0!important;}\n  #class1-english-runtime #view-bai-hoc-hub,\n  #class1-english-runtime #view-bai-hoc-lesson,\n  #class1-english-runtime #view-lecture,\n  #class1-english-runtime #view-roadmap,\n  #class1-english-runtime #view-minigame-hub,\n  #class1-english-runtime #view-game-play,\n  #class1-english-runtime #view-exam-hub,\n  #class1-english-runtime #view-quiz > .pastel-card{padding-top:.25rem!important;padding-bottom:.25rem!important;}\n}\n\n\n        #class1-english-runtime{ background: #ffffff; }\n        #class1-english-runtime{\n            font-family: \"Quicksand\", \"Nunito\", sans-serif;\n            background: linear-gradient(135deg, #fdf2f8 0%, #fae8ff 50%, #f3e8ff 100%);\n            color: #4a4a4a;\n            user-select: none;\n            min-height: 100vh;\n            display: flex;\n            flex-direction: column;\n            align-items: center;\n            justify-content: flex-start;\n        }\n        #class1-english-runtime .pastel-card{\n            background: #ffffff;\n            border-radius: 28px;\n            box-shadow: 0 12px 30px rgba(236, 72, 153, 0.12);\n            border: 3px solid #fbcfe8;\n        }\n        #class1-english-runtime .pastel-btn{\n            transition: all 0.2s ease;\n            box-shadow: 0 3px 10px rgba(0,0,0,0.05);\n        }\n        #class1-english-runtime .pastel-btn:hover{\n            transform: translateY(-2px);\n            box-shadow: 0 5px 15px rgba(0,0,0,0.09);\n        }\n        #class1-english-runtime .pastel-btn:active{ transform: translateY(1px); }\n        @keyframes float {\n            0%, 100% { transform: translateY(0px); }\n            50% { transform: translateY(-6px); }\n        }\n        #class1-english-runtime .floating{ animation: float 3s ease-in-out infinite; }\n        @keyframes sway {\n            0%, 100% { transform: translateY(0px) rotate(0deg); }\n            25% { transform: translateY(-5px) rotate(-7deg); }\n            75% { transform: translateY(-5px) rotate(7deg); }\n        }\n        #class1-english-runtime .swaying{\n            animation: sway 2.4s ease-in-out infinite;\n            display: inline-block;\n            transform-origin: bottom center;\n        }\n        @keyframes pulse-glow {\n            0%, 100% { filter: drop-shadow(0 0 6px rgba(236, 72, 153, 0.6)); transform: scale(1); }\n            50% { filter: drop-shadow(0 0 16px rgba(236, 72, 153, 0.9)); transform: scale(1.04); }\n        }\n        #class1-english-runtime .node-current{\n            animation: pulse-glow 2s infinite ease-in-out;\n            transform-origin: center;\n        }\n        #class1-english-runtime ::-webkit-scrollbar{ width: 3px; height: 3px; }\n        #class1-english-runtime ::-webkit-scrollbar-track{ background: #fdf2f8; }\n        #class1-english-runtime ::-webkit-scrollbar-thumb{ background: #f472b6; border-radius: 10px; }\n        #class1-english-runtime ::-webkit-scrollbar-thumb:hover{ background: #ec4899; }\n\n        /* Mobile header theo bố cục chuẩn TV1: Logo + Chuyên mục + Tuần + Game / Loa + sao + tài khoản */\n        @media (max-width: 767px) {\n            #class1-english-runtime .ta-main-header{\n                display: grid !important;\n                grid-template-columns: auto minmax(0, 1fr) auto auto;\n                grid-template-rows: auto auto;\n                gap: 0.35rem 0.35rem !important;\n                align-items: center;\n                padding: 0.35rem 0.45rem !important;\n            }\n\n            #class1-english-runtime .ta-header-left,#class1-english-runtime .ta-header-actions{\n                display: contents !important;\n            }\n\n            #class1-english-runtime #btn-header-home{\n                grid-row: 1;\n                grid-column: 1;\n            }\n\n            #class1-english-runtime #header-learning-tabs{\n                grid-row: 1;\n                grid-column: 2;\n                min-width: 0;\n                overflow-x: auto;\n                overflow-y: hidden;\n                scrollbar-width: none;\n                margin-left: 0;\n            }\n            #class1-english-runtime #header-learning-tabs::-webkit-scrollbar{ display: none; }\n\n            #class1-english-runtime #header-level2-icon{ display: none !important; }\n            #class1-english-runtime #header-level2-tab > button{\n                padding-left: 0.5rem !important;\n                padding-right: 0.5rem !important;\n                column-gap: 0 !important;\n            }\n\n            #class1-english-runtime #btn-weekly-progress{\n                grid-row: 1;\n                grid-column: 3;\n                justify-self: end;\n            }\n\n            #class1-english-runtime #btn-mini-game{\n                grid-row: 1;\n                grid-column: 4;\n                justify-self: end;\n            }\n\n            #class1-english-runtime #btn-toggle-autospeech{\n                grid-row: 2;\n                grid-column: 1;\n                justify-self: start;\n                margin: 0;\n            }\n\n            #class1-english-runtime #header-score-box{\n                grid-row: 2;\n                grid-column: 1;\n                justify-self: start;\n                margin-left: 0 !important;\n                transform: translateX(2.7rem);\n            }\n\n            #class1-english-runtime #user-info-box{\n                grid-row: 2;\n                grid-column: 2 / 5;\n                justify-self: end;\n                width: auto;\n                min-width: 0;\n                margin-left: auto;\n                text-align: right !important;\n            }\n\n            #class1-english-runtime #user-info-box > div,#class1-english-runtime #user-info-box > span{ margin-left: auto; }\n            #class1-english-runtime #user-info-box > *{ max-width: 100%; }\n        }\n\n\n        /* Đưa icon khóa trên các thẻ Premium của trang chủ lên góc trên bên phải\n           để không chiếm chỗ trên dòng tiêu đề. */\n        #class1-english-runtime #view-dashboard-grid .pastel-card{\n            position: relative;\n        }\n\n        #class1-english-runtime #view-dashboard-grid .pastel-card h3 .fa-lock{\n            position: absolute;\n            top: 8px;\n            right: 10px;\n            margin: 0 !important;\n            z-index: 2;\n        }\n\n\n        /* Đưa icon khóa của Bản đồ tuần và Mini Game lên góc trên,\n           không chiếm chiều ngang trong nội dung nút. */\n        #class1-english-runtime #btn-weekly-progress,#class1-english-runtime #btn-mini-game{\n            position: relative;\n            overflow: visible;\n        }\n\n        #class1-english-runtime #btn-weekly-progress > .fa-lock,#class1-english-runtime #btn-mini-game > .fa-lock{\n            position: absolute;\n            top: -7px;\n            right: -4px;\n            margin: 0 !important;\n            z-index: 3;\n        }\n\n        @media print {\n            #class1-english-runtime *{ visibility: hidden; }\n            #class1-english-runtime #printable-report-area,#class1-english-runtime #printable-report-area *{ visibility: visible; }\n            #class1-english-runtime #printable-report-area{\n                position: absolute !important;\n                left: 0 !important;\n                top: 0 !important;\n                width: 100% !important;\n                background: white !important;\n                padding: 10px !important;\n            }\n            #class1-english-runtime .no-print{ display: none !important; }\n            #class1-english-runtime .page-break-1{ page-break-after: always; break-after: page; }\n            #class1-english-runtime .page-break-2{ page-break-before: always; break-before: page; page-break-after: always; break-after: page; }\n            #class1-english-runtime .page-break-3{ page-break-before: always; break-before: page; }\n        }\n\n\n        /* ===== TA1 6-TAB UI — bám chuẩn TA2 ===== */\n        #class1-english-runtime .main-module-tab{\n            position: relative; min-height: 46px; padding: 7px 8px; border-radius: 14px;\n            border: 1.5px solid #f5c5df; background: linear-gradient(180deg,#fff,#fff8fc);\n            color: #7e3bb8; font-weight: 900; font-size: 13px; line-height: 1.05;\n            display: flex; align-items: center; justify-content: center; gap: 6px;\n            box-shadow: 0 2px 7px rgba(109,40,217,.07);\n            transition: box-shadow .18s,border-color .18s,background .18s,color .18s;\n        }\n        #class1-english-runtime .main-module-tab:hover{ border-color:#e879f9; box-shadow:0 0 13px rgba(217,70,239,.22); }\n        #class1-english-runtime .main-module-tab.is-active{\n            color:#fff; border-color:#d946ef;\n            background:linear-gradient(135deg,#ec4899 0%,#a855f7 55%,#7c3aed 100%);\n            box-shadow:0 5px 14px rgba(168,85,247,.28);\n        }\n        @media (min-width:768px) { #class1-english-runtime .main-module-tab{ min-height:50px; font-size:14px; } }\n\n        #class1-english-runtime .bi-label{display:flex;flex-direction:column;align-items:center;justify-content:center;line-height:1.08;text-align:center}\n        #class1-english-runtime .bi-label .en{display:block;font-weight:900}\n        #class1-english-runtime .bi-label .vi{display:block;font-size:13px;font-weight:800;opacity:.78;margin-top:4px;line-height:1.15}\n        #class1-english-runtime .bi-left{align-items:flex-start;text-align:left}\n        #class1-english-runtime .card-title-bi{display:flex;flex-direction:column;align-items:flex-start;min-width:0;line-height:1.12}\n        #class1-english-runtime .card-title-bi .en{display:block;font-weight:900}\n        #class1-english-runtime .card-title-bi .vi{display:block;font-size:14px;font-weight:800;color:#94a3b8;margin-top:3px;line-height:1.2}\n        #class1-english-runtime .card-vi{display:block;font-size:14px;font-weight:800;color:#94a3b8;margin-top:3px;line-height:1.2}\n\n        #class1-english-runtime .semester-switch-btn{min-width:92px;height:42px;padding:0 14px;border-radius:12px;font-weight:900;font-size:12px;line-height:1.05;transition:.18s;border:1.5px solid #e9d5ff;}\n        #class1-english-runtime .semester-switch-btn.is-active{color:#fff;background:linear-gradient(135deg,#ec4899 0%,#a855f7 100%);border-color:#c026d3;box-shadow:0 4px 10px rgba(168,85,247,.22);}\n        #class1-english-runtime .semester-switch-btn.is-inactive{color:#7e22ce;background:linear-gradient(135deg,#fff1f7 0%,#f5f3ff 100%);}\n        #class1-english-runtime .lesson-chip{border:1px solid #fbcfe8;background:#fff7fb;border-radius:12px;padding:6px 10px;font-weight:800;font-size:12px;color:#7e22ce;}\n        #class1-english-runtime #view-bai-hoc-hub .bi-label .vi{font-size:13px;margin-top:5px;opacity:.82;}\n        #class1-english-runtime #view-bai-hoc-hub #bai-hoc-hub-subtitle{font-size:13px;line-height:1.35;}\n        #class1-english-runtime #view-bai-hoc-hub #bai-hoc-hub-subtitle .lesson-hub-vi{font-size:12px;color:#94a3b8;font-weight:800;display:block;margin-top:4px;}\n        #class1-english-runtime #view-bai-hoc-hub .semester-switch-btn .semester-vi{font-size:11px;display:block;margin-top:3px;opacity:.82;}\n\n        /* Mobile: header chỉ giữ chức năng hệ thống; module học nằm ở 6 tab phía dưới */\n        @media (max-width: 767px) {\n            #class1-english-runtime #dashboard-header{\n                display:grid !important; grid-template-columns:auto minmax(0,1fr); grid-template-rows:auto auto;\n                align-items:center; column-gap:.35rem !important; row-gap:.35rem !important; padding:.35rem .45rem !important;\n            }\n            #class1-english-runtime #header-nav-group,#class1-english-runtime #header-actions-group{display:contents !important;}\n            #class1-english-runtime #btn-header-home{grid-row:1;grid-column:1;width:93px !important;height:62px !important;min-width:93px !important;margin:0 !important;}\n            #class1-english-runtime #header-learning-tabs{grid-row:1;grid-column:2;min-width:0;overflow-x:auto;overflow-y:hidden;scrollbar-width:none;}\n            #class1-english-runtime #header-learning-tabs::-webkit-scrollbar{display:none;}\n            #class1-english-runtime #btn-toggle-autospeech{grid-row:2;grid-column:1;justify-self:start;}\n            #class1-english-runtime #header-score-box{grid-row:2;grid-column:1;justify-self:start;margin-left:2.7rem !important;transform:none !important;padding-left:.4rem !important;padding-right:.4rem !important;}\n            #class1-english-runtime #user-info-box{grid-row:2;grid-column:2;justify-self:end;width:auto;min-width:0;margin-left:auto;text-align:right !important;}\n        }\n\n    \n\n        /* =========================================================\n           TA1 UI 2026-09-20 - APP SHELL THEO CHUAN TV1\n           Chi thay presentation/layout, giu nguyen engine va workflow.\n           ========================================================= */\n        #class1-english-runtime{\n            background: #ffffff !important;\n        }\n        #class1-english-runtime #screen-dashboard{\n            max-width:82rem !important;\n            background:transparent !important;\n        }\n        #class1-english-runtime #dashboard-header{\n            display:grid !important;\n            grid-template-columns:auto minmax(0,1fr) auto;\n            align-items:center;\n            gap:10px;\n            padding:7px 0 !important;\n            background:transparent !important;\n            border:0 !important;\n            box-shadow:none !important;\n            backdrop-filter:none !important;\n            -webkit-backdrop-filter:none !important;\n            border-radius:0 !important;\n        }\n        #class1-english-runtime #btn-header-home{\n            width:101px !important;\n            min-width:101px !important;\n            height:67px !important;\n            border-radius:16px !important;\n            box-shadow:0 3px 10px rgba(76,29,149,.08) !important;\n        }\n        #class1-english-runtime #header-info-zone{\n            width:auto !important;\n            min-width:0;\n            margin-left:0 !important;\n            justify-content:flex-end !important;\n            gap:7px !important;\n        }\n        #class1-english-runtime #btn-toggle-autospeech{display:none !important;}\n\n        #class1-english-runtime #main-module-tabs{\n            width:100%; min-width:0;\n            background:transparent !important;\n            border:0 !important;\n            border-radius:0 !important;\n            padding:0 !important;\n            box-shadow:none !important;\n        }\n        #class1-english-runtime #main-module-tabs > div{\n            display:grid;\n            grid-template-columns:repeat(6,minmax(0,1fr));\n            gap:7px;\n        }\n        #class1-english-runtime .main-module-tab{\n            min-width:0; min-height:62px; padding:7px 5px;\n            border-radius:16px; flex-direction:column; gap:3px;\n            font-size:16px; line-height:1.05; border-width:1.5px;\n            box-shadow:0 3px 9px rgba(76,29,149,.08);\n            position:relative; overflow:visible;\n        }\n        #class1-english-runtime .main-module-tab > span:first-child{font-size:21px !important;line-height:1;}\n        #class1-english-runtime .main-module-tab::after{\n            content:\"\"; position:absolute; left:34%; right:34%; bottom:-5px;\n            height:3px; border-radius:99px; opacity:0; transform:scaleX(.45);\n            transition:all .18s ease; background:currentColor;\n        }\n        #class1-english-runtime .main-module-tab.is-active::after{opacity:.95;transform:scaleX(1);}\n        #class1-english-runtime .main-module-tab[data-tab=\"discover\"]{background:#f3e8ff;color:#7c3aed;border-color:#ddd6fe;}\n        #class1-english-runtime .main-module-tab[data-tab=\"lessons\"]{background:#fce7f3;color:#db2777;border-color:#fbcfe8;}\n        #class1-english-runtime .main-module-tab[data-tab=\"exercises\"]{background:#e0f2fe;color:#0369a1;border-color:#bae6fd;}\n        #class1-english-runtime .main-module-tab[data-tab=\"review\"]{background:#fef3c7;color:#b45309;border-color:#fde68a;}\n        #class1-english-runtime .main-module-tab[data-tab=\"exams\"]{background:#dcfce7;color:#15803d;border-color:#bbf7d0;}\n        #class1-english-runtime .main-module-tab[data-tab=\"games\"]{background:#ede9fe;color:#6d28d9;border-color:#ddd6fe;}\n        #class1-english-runtime .main-module-tab[data-tab=\"discover\"].is-active{background:linear-gradient(135deg,#a855f7,#7c3aed);color:#fff;border-color:#8b5cf6;box-shadow:0 7px 17px rgba(124,58,237,.27);}\n        #class1-english-runtime .main-module-tab[data-tab=\"lessons\"].is-active{background:linear-gradient(135deg,#f472b6,#ec4899);color:#fff;border-color:#ec4899;box-shadow:0 7px 17px rgba(236,72,153,.25);}\n        #class1-english-runtime .main-module-tab[data-tab=\"exercises\"].is-active{background:linear-gradient(135deg,#38bdf8,#0284c7);color:#fff;border-color:#0ea5e9;box-shadow:0 7px 17px rgba(14,165,233,.25);}\n        #class1-english-runtime .main-module-tab[data-tab=\"review\"].is-active{background:linear-gradient(135deg,#fbbf24,#f59e0b);color:#fff;border-color:#f59e0b;box-shadow:0 7px 17px rgba(245,158,11,.25);}\n        #class1-english-runtime .main-module-tab[data-tab=\"exams\"].is-active{background:linear-gradient(135deg,#4ade80,#16a34a);color:#fff;border-color:#22c55e;box-shadow:0 7px 17px rgba(34,197,94,.24);}\n        #class1-english-runtime .main-module-tab[data-tab=\"games\"].is-active{background:linear-gradient(135deg,#8b5cf6,#6d28d9);color:#fff;border-color:#7c3aed;box-shadow:0 7px 17px rgba(109,40,217,.25);}\n\n        #class1-english-runtime #app-banner-slot{width:100%;position:relative;}\n        #class1-english-runtime #app-main-banner{\n            position:relative; width:100%; aspect-ratio:6/1; min-height:0;\n            overflow:hidden; border-radius:0; border:0; box-shadow:none; background:#fff;\n        }\n        #class1-english-runtime #app-main-banner picture{display:block;width:100%;height:100%;}\n        #class1-english-runtime #app-main-banner img{width:100%;height:100%;object-fit:cover;display:block;}\n        #class1-english-runtime #app-context-banner.hidden,#class1-english-runtime #app-main-banner.hidden{display:none !important;}\n        #class1-english-runtime #app-context-banner{\n            position:relative; min-height:58px; overflow:hidden; border-radius:0;\n            border:0 !important; background:none !important; box-shadow:none !important;\n            display:flex; align-items:center; padding:7px 10px;\n        }\n        #class1-english-runtime #app-context-banner::before{\n            content:\"\"; position:absolute; inset:0;\n            background-image:url(\"banner-sub.jpg\"); background-size:cover;\n            background-position:center; background-repeat:no-repeat;\n            transform:none;\n            opacity:1; filter:none; pointer-events:none; z-index:0;\n        }\n        #class1-english-runtime #header-learning-tabs{\n            width:100% !important; max-width:none !important; flex:1 1 auto !important;\n            min-width:0 !important; overflow-x:auto !important; overflow-y:hidden !important;\n            scrollbar-width:none; gap:5px; position:relative; z-index:2;\n        }\n        #class1-english-runtime #header-learning-tabs::-webkit-scrollbar{display:none;}\n        #class1-english-runtime #header-level2-tab,#class1-english-runtime #header-level3-tab,#class1-english-runtime #header-level4-tab{\n            width:auto !important; min-width:0 !important; max-width:none !important;\n            flex:0 0 auto !important; overflow:visible !important;\n        }\n        #class1-english-runtime #header-level2-tab > button,#class1-english-runtime #header-level3-tab > div,#class1-english-runtime #header-level4-tab > div{\n            height:38px !important; max-width:220px !important; min-width:0 !important;\n            padding:0 12px !important; border-radius:13px !important;\n            background:rgba(255,255,255,.50) !important;\n            backdrop-filter:blur(4px); -webkit-backdrop-filter:blur(4px);\n            box-shadow:0 2px 7px rgba(76,29,149,.08) !important;\n        }\n        #class1-english-runtime #header-level2-tab > button{color:#be185d !important;border:1.5px solid #f9a8d4 !important;}\n        #class1-english-runtime #header-level3-tab > div{color:#7e22ce !important;border:1.5px solid #d8b4fe !important;}\n        #class1-english-runtime #header-level4-tab > div{color:#b45309 !important;border:1.5px solid #fde68a !important;}\n        #class1-english-runtime #header-level2-title,#class1-english-runtime #header-level3-title,#class1-english-runtime #header-level4-title{font-size:12px !important;font-weight:900 !important;}\n        #class1-english-runtime #header-level3-tab > span,#class1-english-runtime #header-level4-tab > span{color:#c084fc !important;font-size:13px !important;}\n\n        #class1-english-runtime #app-footer{\n            width:100%; max-width:82rem; min-height:76px; margin:10px auto 0; padding:0 14px;\n            border-radius:0; background-image:url(\"footer-bg.jpg\"); background-size:cover;\n            background-position:center; background-repeat:no-repeat; display:flex; align-items:center;\n            justify-content:center; text-align:center; color:#1827f2;\n            border:0; box-shadow:none;\n        }\n        #class1-english-runtime #app-footer .footer-title{font-size:17px;font-weight:900;line-height:1.35;color:#1827f2;text-shadow:0 1px 0 #fff;}\n        #class1-english-runtime #app-footer .footer-sub{font-size:13px;font-weight:800;line-height:1.35;color:#1827f2;text-shadow:0 1px 0 #fff;}\n\n        /* Root view: bo card ngoai cung, giu card noi dung. */\n        #class1-english-runtime #view-bai-hoc-hub,#class1-english-runtime #view-roadmap,#class1-english-runtime #view-minigame-hub,#class1-english-runtime #view-exam-hub{\n            background:transparent !important; border:0 !important; box-shadow:none !important;\n            border-radius:0 !important; padding-left:0 !important; padding-right:0 !important;\n        }\n        #class1-english-runtime #roadmap-svg-container{\n            background:transparent !important; border:0 !important; border-radius:0 !important;\n            box-shadow:none !important; padding-left:0 !important; padding-right:0 !important;\n        }\n        #class1-english-runtime body:has(#main-tab-review.is-active) #view-lecture{\n            background:transparent !important; border:0 !important; box-shadow:none !important;\n            border-radius:0 !important; padding-left:0 !important; padding-right:0 !important;\n        }\n\n        /* Man nhanh: bo khung lon va min-height gia. */\n        #class1-english-runtime #view-lecture,#class1-english-runtime #view-bai-hoc-lesson,#class1-english-runtime #view-alphabet,#class1-english-runtime #view-game-play{\n            background:transparent !important; border:0 !important; box-shadow:none !important;\n            border-radius:0 !important; min-height:0 !important; padding:8px 0 !important;\n        }\n        #class1-english-runtime #view-quiz > .pastel-card{\n            background:transparent !important; border:0 !important; box-shadow:none !important;\n            border-radius:0 !important; min-height:0 !important; padding:8px 0 !important;\n        }\n        #class1-english-runtime #view-lecture{justify-content:flex-start !important;gap:8px !important;}\n        #class1-english-runtime #view-lecture > .w-full{gap:8px !important;}\n        #class1-english-runtime #view-lecture .mb-3,#class1-english-runtime #view-lecture .mb-2\\\\/**/.5{margin-bottom:8px !important;}\n        #class1-english-runtime #view-lecture .mt-2\\\\/**/.5{margin-top:8px !important;}\n        #class1-english-runtime #view-lecture .pt-2{padding-top:8px !important;}\n        #class1-english-runtime #view-quiz{gap:8px !important;}\n        #class1-english-runtime #view-quiz #question-box{margin-top:4px !important;margin-bottom:4px !important;}\n        #class1-english-runtime #view-quiz #quiz-bottom-nav{padding-top:6px !important;}\n\n        @media (max-width:767px){\n            #class1-english-runtime #dashboard-header{\n                display:grid !important; grid-template-columns:auto minmax(0,1fr);\n                grid-template-rows:auto auto; gap:7px !important; padding:7px 0 !important;\n            }\n            #class1-english-runtime #btn-header-home{grid-column:1;grid-row:1;width:86px !important;min-width:86px !important;height:58px !important;justify-self:start;}\n            #class1-english-runtime #header-info-zone{grid-column:2;grid-row:1;justify-self:end !important;width:auto !important;gap:5px !important;}\n            #class1-english-runtime #main-module-tabs{grid-column:1 / 3;grid-row:2;width:100% !important;}\n            #class1-english-runtime #main-module-tabs > div{grid-template-columns:repeat(3,minmax(0,1fr));gap:6px;}\n            #class1-english-runtime .main-module-tab{min-height:52px;flex-direction:row;gap:6px;font-size:14px;padding:6px 8px;border-radius:15px;}\n            #class1-english-runtime .main-module-tab > span:first-child{font-size:18px !important;}\n            #class1-english-runtime .main-module-tab::after{bottom:-4px;height:2px;}\n            #class1-english-runtime #header-score-box{transform:none !important;margin-left:0 !important;padding:3px 5px !important;}\n            #class1-english-runtime #user-info-box{margin-left:0 !important;min-width:0;text-align:right;}\n            #class1-english-runtime #user-info-box .admin-manage-label{display:none !important;}\n            #class1-english-runtime #user-info-box button[title=\"Quản lý tài khoản\"]{width:34px !important;padding-left:0 !important;padding-right:0 !important;justify-content:center !important;}\n            #class1-english-runtime #app-main-banner{aspect-ratio:4/1;border-radius:0;}\n            #class1-english-runtime #app-context-banner{min-height:52px;border-radius:0;padding:6px 8px;}\n            #class1-english-runtime #header-learning-tabs{gap:4px;}\n            #class1-english-runtime #header-level2-tab > button,#class1-english-runtime #header-level3-tab > div,#class1-english-runtime #header-level4-tab > div{height:34px !important;max-width:150px !important;padding:0 9px !important;border-radius:11px !important;}\n            #class1-english-runtime #header-level2-title,#class1-english-runtime #header-level3-title,#class1-english-runtime #header-level4-title{font-size:11px !important;}\n            #class1-english-runtime #header-level2-icon{display:none !important;}\n            #class1-english-runtime #app-footer{min-height:64px;margin-top:8px;border-radius:0;}\n            #class1-english-runtime #app-footer .footer-title{font-size:14px;}\n            #class1-english-runtime #app-footer .footer-sub{font-size:12px;}\n            #class1-english-runtime #view-lecture,#class1-english-runtime #view-bai-hoc-lesson,#class1-english-runtime #view-alphabet,#class1-english-runtime #view-game-play,#class1-english-runtime #view-quiz > .pastel-card{padding-top:6px !important;padding-bottom:6px !important;}\n        }\n\n\n        /* TA1 - tinh chỉnh score box + viền card theo yêu cầu 2026-09-22 */\n        @media (min-width: 768px) {\n            #class1-english-runtime #header-score-box{\n                min-height: 62px !important;\n                height: 62px !important;\n                justify-content: center !important;\n                padding-top: 5px !important;\n                padding-bottom: 5px !important;\n            }\n            #class1-english-runtime #header-score-box > div{\n                min-height: 23px;\n            }\n            #class1-english-runtime #header-score-box > div > span:first-child{\n                font-size: 12px !important;\n                padding: 3px 7px !important;\n                line-height: 1.1 !important;\n            }\n            #class1-english-runtime #header-score-box > div > span:first-child i{\n                font-size: 12px !important;\n            }\n            #class1-english-runtime #star-green-count,#class1-english-runtime #star-red-count{\n                font-size: 14px !important;\n                min-width: 14px;\n                text-align: center;\n            }\n        }\n        @media (max-width: 767px) {\n            #class1-english-runtime #header-score-box{\n                min-height: 52px !important;\n                height: 52px !important;\n                justify-content: center !important;\n            }\n            #class1-english-runtime #header-score-box > div > span:first-child{\n                font-size: 11px !important;\n                padding: 2px 5px !important;\n            }\n            #class1-english-runtime #header-score-box > div > span:first-child i{\n                font-size: 11px !important;\n            }\n            #class1-english-runtime #star-green-count,#class1-english-runtime #star-red-count{\n                font-size: 12px !important;\n                min-width: 12px;\n                text-align: center;\n            }\n        }\n        #class1-english-runtime #view-dashboard-grid .pastel-card{\n            border-width: 1px !important;\n        }\n\n        /* TA1 - chuẩn banner/footer/nền theo TV1 */\n        #class1-english-runtime #screen-dashboard,#class1-english-runtime #app-viewport,#class1-english-runtime #view-dashboard-grid{\n            background: #ffffff !important;\n        }\n\n        /* Card Khám phá: nền trang trắng, card giữ pastel rất nhẹ và bỏ shadow. */\n        #class1-english-runtime #view-dashboard-grid .pastel-card,#class1-english-runtime #view-dashboard-grid .pastel-card:hover{\n            box-shadow: none !important;\n        }\n        #class1-english-runtime #view-dashboard-grid .pastel-card:has(h3.text-pink-700){ background: rgba(253,242,248,.82) !important; }\n        #class1-english-runtime #view-dashboard-grid .pastel-card:has(h3.text-purple-700){ background: rgba(250,245,255,.84) !important; }\n        #class1-english-runtime #view-dashboard-grid .pastel-card:has(h3.text-blue-700){ background: rgba(239,246,255,.86) !important; }\n        #class1-english-runtime #view-dashboard-grid .pastel-card:has(h3.text-fuchsia-700){ background: rgba(253,244,255,.84) !important; }\n        #class1-english-runtime #view-dashboard-grid .pastel-card:has(h3.text-emerald-700){ background: rgba(236,253,245,.86) !important; }\n        #class1-english-runtime #view-dashboard-grid .pastel-card:has(h3.text-indigo-700){ background: rgba(238,242,255,.86) !important; }\n        #class1-english-runtime #view-dashboard-grid .pastel-card:has(h3.text-amber-700){ background: rgba(255,251,235,.88) !important; }\n        #class1-english-runtime #view-dashboard-grid .pastel-card:has(h3.text-rose-700){ background: rgba(255,241,242,.86) !important; }\n        #class1-english-runtime #view-dashboard-grid .pastel-card:has(h3.text-teal-700){ background: rgba(240,253,250,.88) !important; }\n        #class1-english-runtime #view-dashboard-grid .pastel-card:has(h3.text-violet-700){ background: rgba(245,243,255,.86) !important; }\n\n        /* Banner phụ desktop: tab tự giãn theo nội dung, tối đa 440px; cả hàng tự cuộn ngang nếu quá dài. */\n        @media (min-width: 768px) {\n            #class1-english-runtime #header-level2-tab > button,#class1-english-runtime #header-level3-tab > div,#class1-english-runtime #header-level4-tab > div{\n                width: auto !important;\n                min-width: 0 !important;\n                max-width: 440px !important;\n                padding-left: 18px !important;\n                padding-right: 18px !important;\n            }\n            #class1-english-runtime #header-level2-title,#class1-english-runtime #header-level3-title,#class1-english-runtime #header-level4-title{\n                font-size: 14px !important;\n                max-width: 400px !important;\n                overflow: hidden !important;\n                text-overflow: ellipsis !important;\n                white-space: nowrap !important;\n            }\n        }\n\n    \n        /* TA1 2026-09-22 - Footer dung ti le artwork 8:1, dong bo TV2 */\n        #class1-english-runtime #app-footer{\n            width: calc(100% - 1rem) !important;\n            max-width: 82rem !important;\n            aspect-ratio: 8 / 1 !important;\n            min-height: 0 !important;\n            height: auto !important;\n            background-image: url(\"footer-bg.jpg\") !important;\n            background-size: cover !important;\n            background-position: center !important;\n            background-repeat: no-repeat !important;\n        }\n        @media (max-width: 767px) {\n            #class1-english-runtime #app-footer{\n                width: calc(100% - 0.5rem) !important;\n                max-width: none !important;\n                aspect-ratio: 8 / 1 !important;\n                min-height: 0 !important;\n                height: auto !important;\n                background-image: url(\"footer-bg.jpg\") !important;\n            }\n        }\n\n\n\n#class1-english-runtime{width:100%;max-width:100%;font-family:'Quicksand','Nunito',system-ui,sans-serif;color:#4a4a4a;position:relative;}\n#class1-english-runtime #screen-dashboard{width:100%!important;max-width:100%!important;padding:0!important;margin:0!important;}\n#class1-english-runtime .app-main-header,#class1-english-runtime #dashboard-header,#class1-english-runtime #app-banner-slot{display:none!important;}\n#class1-english-runtime #app-viewport{width:100%!important;max-width:100%!important;margin:0!important;padding:0!important;}\n#content-stage:has(#class1-english-runtime){min-height:0!important;padding:.5rem .05rem 0!important;}\n#content-stage:has(#class1-english-runtime)+.app-footer{margin-top:0!important;}\n#class1-english-runtime .from-fuchsia-500{--tw-gradient-from:#d946ef var(--tw-gradient-from-position);--tw-gradient-to:rgb(217 70 239 / 0) var(--tw-gradient-to-position);--tw-gradient-stops:var(--tw-gradient-from),var(--tw-gradient-to)}\n#class1-english-runtime .to-pink-500{--tw-gradient-to:#ec4899 var(--tw-gradient-to-position)}\n#class1-english-runtime .md\\\\:w-\\\\[60\\\\%\\\\]{width:60%} #class1-english-runtime .md\\\\:w-\\\\[40\\\\%\\\\]{width:40%}\n#class1-english-runtime .w-\\\\[170px\\\\]{width:170px}\n#class1-english-runtime .self-start{align-self:flex-start}.sm\\\\:self-auto{align-self:auto}\n#class1-english-runtime .sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border-width:0}\n@media(max-width:767px){#content-stage:has(#class1-english-runtime){padding-top:.375rem!important;padding-bottom:0!important;}}\n/* Shared-shell breadcrumb projection - dong bo voi toan_app */\nbody:has(#class1-english-runtime) #sub-pill.english-sub-breadcrumbs{\n    min-width:0!important;\n    width:auto!important;\n    max-width:calc(100% - 1rem)!important;\n    min-height:0!important;\n    padding:0!important;\n    border:0!important;\n    border-radius:0!important;\n    background:transparent!important;\n    box-shadow:none!important;\n    backdrop-filter:none!important;\n    -webkit-backdrop-filter:none!important;\n    display:flex!important;\n    align-items:center!important;\n    gap:.34rem!important;\n    overflow-x:auto!important;\n    overflow-y:hidden!important;\n    scrollbar-width:none!important;\n    white-space:nowrap!important;\n}\nbody:has(#class1-english-runtime) #sub-pill.english-sub-breadcrumbs::-webkit-scrollbar{display:none!important;}\nbody:has(#class1-english-runtime) #sub-pill.english-sub-breadcrumbs .english-breadcrumb-sep{\n    flex:0 0 auto;\n    color:#c084fc;\n    font-size:15px;\n    font-weight:900;\n}\nbody:has(#class1-english-runtime) #sub-pill.english-sub-breadcrumbs .english-breadcrumb-tab{\n    flex:0 0 auto;\n    height:38px;\n    max-width:min(430px,42vw);\n    padding:0 16px;\n    border-radius:13px;\n    display:inline-flex;\n    align-items:center;\n    justify-content:center;\n    overflow:hidden;\n    text-overflow:ellipsis;\n    white-space:nowrap;\n    font-size:15px;\n    font-weight:900;\n    line-height:1;\n    box-shadow:0 2px 7px rgba(76,29,149,.08);\n    cursor:default;\n}\nbody:has(#class1-english-runtime) #sub-pill.english-sub-breadcrumbs button.english-breadcrumb-tab{\n    cursor:pointer;\n    transition:background .16s,border-color .16s,box-shadow .16s,transform .16s;\n}\nbody:has(#class1-english-runtime) #sub-pill.english-sub-breadcrumbs button.english-breadcrumb-tab:hover{\n    transform:translateY(-1px);\n    box-shadow:0 4px 11px rgba(76,29,149,.13);\n}\nbody:has(#class1-english-runtime) #sub-pill.english-sub-breadcrumbs .english-breadcrumb-level2{\n    color:#be185d;\n    border:1.5px solid #f9a8d4;\n    background:rgba(255,255,255,.78);\n}\nbody:has(#class1-english-runtime) #sub-pill.english-sub-breadcrumbs .english-breadcrumb-level3{\n    color:#7e22ce;\n    border:1.5px solid #d8b4fe;\n    background:rgba(255,255,255,.72);\n}\nbody:has(#class1-english-runtime) #sub-pill.english-sub-breadcrumbs .english-breadcrumb-level4{\n    color:#b45309;\n    border:1.5px solid #fde68a;\n    background:rgba(255,255,255,.72);\n}\n@media(max-width:767px){\n    body:has(#class1-english-runtime) #sub-pill.english-sub-breadcrumbs{max-width:calc(100% - .35rem)!important;gap:.22rem!important;}\n    body:has(#class1-english-runtime) #sub-pill.english-sub-breadcrumbs .english-breadcrumb-tab{\n        height:34px;\n        max-width:44vw;\n        padding:0 10px;\n        border-radius:11px;\n        font-size:12px;\n    }\n    body:has(#class1-english-runtime) #sub-pill.english-sub-breadcrumbs .english-breadcrumb-sep{font-size:12px;}\n}\n";


const ENGLISH_HUB_UI_OVERRIDES_ = `
/* =========================================================
   CLASS 1 ENGLISH - HUB TYPOGRAPHY / PASTEL CARDS / 1PX BORDER
   Dong bo cam giac voi toan_app va Mini Games.
   ========================================================= */
#class1-english-runtime .border-2{border-width:1px!important;}
#class1-english-runtime .semester-switch-btn{border-width:1px!important;}
body:has(#class1-english-runtime) #sub-pill.english-sub-breadcrumbs .english-breadcrumb-level2,
body:has(#class1-english-runtime) #sub-pill.english-sub-breadcrumbs .english-breadcrumb-level3,
body:has(#class1-english-runtime) #sub-pill.english-sub-breadcrumbs .english-breadcrumb-level4{border-width:1px!important;}

/* Tieu de / mo ta cac hub */
#class1-english-runtime #view-bai-hoc-hub h2,
#class1-english-runtime #view-roadmap h2,
#class1-english-runtime #view-exam-hub h2,
#class1-english-runtime #view-minigame-hub h2{font-size:20px!important;line-height:1.25!important;}
#class1-english-runtime #view-bai-hoc-hub #bai-hoc-hub-subtitle,
#class1-english-runtime #view-roadmap p,
#class1-english-runtime #view-exam-hub > div > div:first-child > p,
#class1-english-runtime #view-minigame-hub > div > div:first-child > p{font-size:14px!important;line-height:1.45!important;}

/* BAI HOC - font lon hon va card pastel da mau */
#class1-english-runtime #bai-hoc-grid > button{border-width:1px!important;}
#class1-english-runtime #bai-hoc-grid > button > div:first-child > span:first-child{font-size:18px!important;line-height:1.2!important;}
#class1-english-runtime #bai-hoc-grid > button > div:first-child > span:first-child > span{font-size:13px!important;line-height:1.25!important;}
#class1-english-runtime #bai-hoc-grid > button > div:nth-child(2){font-size:15px!important;line-height:1.4!important;}
#class1-english-runtime #bai-hoc-grid > button > div:nth-child(3){font-size:14px!important;line-height:1.35!important;}
#class1-english-runtime #bai-hoc-grid > button:nth-child(6n+1){background:#fff1f7!important;border-color:#f9a8d4!important;}
#class1-english-runtime #bai-hoc-grid > button:nth-child(6n+2){background:#f0f9ff!important;border-color:#7dd3fc!important;}
#class1-english-runtime #bai-hoc-grid > button:nth-child(6n+3){background:#f5f3ff!important;border-color:#c4b5fd!important;}
#class1-english-runtime #bai-hoc-grid > button:nth-child(6n+4){background:#fffbeb!important;border-color:#fcd34d!important;}
#class1-english-runtime #bai-hoc-grid > button:nth-child(6n+5){background:#ecfdf5!important;border-color:#6ee7b7!important;}
#class1-english-runtime #bai-hoc-grid > button:nth-child(6n+6){background:#fff1f2!important;border-color:#fda4af!important;}
#class1-english-runtime #bai-hoc-grid > button[class*="bg-emerald-50"]{background:#ecfdf5!important;border-color:#6ee7b7!important;}

/* BAI TAP - font lon hon va dung cung palette voi Mini Games */
#class1-english-runtime #view-roadmap #roadmap-svg-container .grid > button{border-width:1px!important;}
#class1-english-runtime #view-roadmap #roadmap-svg-container .grid > button > div:first-child > span:first-child{font-size:18px!important;line-height:1.2!important;}
#class1-english-runtime #view-roadmap #roadmap-svg-container .grid > button > div:first-child > span:first-child > span{font-size:13px!important;line-height:1.25!important;}
#class1-english-runtime #view-roadmap #roadmap-svg-container .grid > button > div:nth-child(2){font-size:15px!important;line-height:1.4!important;}
#class1-english-runtime #view-roadmap #roadmap-svg-container .grid > button > div:nth-child(3){font-size:14px!important;line-height:1.35!important;}
#class1-english-runtime #view-roadmap #roadmap-svg-container .grid > button > div:nth-child(4){font-size:13px!important;line-height:1.35!important;}
#class1-english-runtime #view-roadmap #roadmap-svg-container .grid > button:not(.opacity-60):nth-child(6n+1){background:#fff1f7!important;border-color:#f9a8d4!important;}
#class1-english-runtime #view-roadmap #roadmap-svg-container .grid > button:not(.opacity-60):nth-child(6n+2){background:#f0f9ff!important;border-color:#7dd3fc!important;}
#class1-english-runtime #view-roadmap #roadmap-svg-container .grid > button:not(.opacity-60):nth-child(6n+3){background:#f5f3ff!important;border-color:#c4b5fd!important;}
#class1-english-runtime #view-roadmap #roadmap-svg-container .grid > button:not(.opacity-60):nth-child(6n+4){background:#fffbeb!important;border-color:#fcd34d!important;}
#class1-english-runtime #view-roadmap #roadmap-svg-container .grid > button:not(.opacity-60):nth-child(6n+5){background:#ecfdf5!important;border-color:#6ee7b7!important;}
#class1-english-runtime #view-roadmap #roadmap-svg-container .grid > button:not(.opacity-60):nth-child(6n+6){background:#fff1f2!important;border-color:#fda4af!important;}

/* DE THI */
#class1-english-runtime #exam-categories-grid > div{border-width:1px!important;}
#class1-english-runtime #exam-categories-grid > div h3{font-size:20px!important;line-height:1.25!important;}
#class1-english-runtime #exam-categories-grid > div p{font-size:15px!important;line-height:1.4!important;}
#class1-english-runtime #exam-categories-grid > div span.inline-block{font-size:14px!important;}
#class1-english-runtime #exam-categories-grid > div button{font-size:15px!important;border-width:1px!important;}

/* MINI GAMES */
#class1-english-runtime #minigame-grid > div{border-width:1px!important;}
#class1-english-runtime #minigame-grid > div h3{font-size:18px!important;line-height:1.25!important;}
#class1-english-runtime #minigame-grid > div p{font-size:16px!important;line-height:1.4!important;}

@media(max-width:767px){
  #class1-english-runtime #view-bai-hoc-hub h2,
  #class1-english-runtime #view-roadmap h2,
  #class1-english-runtime #view-exam-hub h2,
  #class1-english-runtime #view-minigame-hub h2{font-size:18px!important;}
  #class1-english-runtime #bai-hoc-grid > button > div:first-child > span:first-child,
  #class1-english-runtime #view-roadmap #roadmap-svg-container .grid > button > div:first-child > span:first-child,
  #class1-english-runtime #minigame-grid > div h3{font-size:17px!important;}
  #class1-english-runtime #bai-hoc-grid > button > div:nth-child(2),
  #class1-english-runtime #view-roadmap #roadmap-svg-container .grid > button > div:nth-child(2),
  #class1-english-runtime #minigame-grid > div p{font-size:14px!important;}
}
`;

function ensureEnglishStyles_(){if(document.getElementById(ENGLISH_MODULE_STYLE_ID_))return;const style=document.createElement('style');style.id=ENGLISH_MODULE_STYLE_ID_;style.textContent=ENGLISH_RUNTIME_CSS_+ENGLISH_HUB_UI_OVERRIDES_;document.head.appendChild(style);}
function ensureEnglishDependency_(tag,id,url){if(document.getElementById(id))return;const exists=[...document.querySelectorAll(tag)].some(el=>String(tag==='link'?el.href:el.src)===String(new URL(url,document.baseURI).href));if(exists)return;const el=document.createElement(tag);el.id=id;if(tag==='link'){el.rel='stylesheet';el.href=url;}else{el.src=url;el.async=true;}document.head.appendChild(el);}
function ensureEnglishDependencies_(){ensureEnglishDependency_('link','class1-english-fontawesome','https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');ensureEnglishDependency_('link','class1-english-fonts','https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Quicksand:wght@500;700;800&display=swap');ensureEnglishDependency_('script','class1-english-chartjs','https://cdn.jsdelivr.net/npm/chart.js');ensureEnglishDependency_('script','class1-english-confetti','https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js');ensureEnglishDependency_('script','class1-english-html2pdf','https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js');}
function mountEnglishRuntime_(){if(!englishModuleCtx_?.host)throw new Error('ENGLISH_MODULE_HOST_MISSING');ensureEnglishStyles_();ensureEnglishDependencies_();englishModuleCtx_.host.innerHTML=`<div id="${ENGLISH_MODULE_RUNTIME_ID_}">${ENGLISH_RUNTIME_HTML_}</div>`;englishModuleRoot_=document.getElementById(ENGLISH_MODULE_RUNTIME_ID_);installEnglishInlineBridge_();syncClass1EnglishState_();resetStars();try{updateAutoSpeechButtonUI();}catch(_){}primeEnglishAudio_();englishModuleMounted_=true;}
async function bootstrapEnglishRuntime_(){if(!englishModuleMounted_||!englishModuleRoot_||!englishModuleRoot_.isConnected||englishModuleRoot_.parentElement!==englishModuleCtx_.host){mountEnglishRuntime_();await loadSharedImageCatalog_();await Promise.resolve(renderDashboardGrid());await Promise.resolve(renderExamHubGrid());}else syncClass1EnglishState_();}
async function renderClass1English_(ctx){englishModuleDestroyed_=false;englishModuleCtx_=ctx||null;await bootstrapEnglishRuntime_();const tab=String(ctx?.tabId||'discover');englishModuleLastTab_=tab;if(tab!=='games')stopActiveMiniGame_();if(tab==='lessons')return openBaiHocHub(1);if(tab==='exercises')return openRoadmap(1);if(tab==='review')return openReviewTab();if(tab==='exams')return openExamHub();if(tab==='games')return openMiniGameHub();return goHome();}
function destroyClass1English_(){englishModuleDestroyed_=true;try{stopSpeaking();}catch(_){}try{clearInterval(quizTimerInterval);}catch(_){}try{stopActiveMiniGame_();}catch(_){}try{removeEnglishGameGlobals_();}catch(_){}try{histLineChartInstance?.destroy?.();}catch(_){}try{histBarChartInstance?.destroy?.();}catch(_){}try{document.getElementById('modal-friendly-dialog')?.remove();}catch(_){}try{document.getElementById('premium-access-modal')?.remove();}catch(_){}try{document.getElementById('ta1-minigame-theme-styles')?.remove();}catch(_){}englishModuleCtx_?.hooks?.clearDetail?.();resetClass1EnglishBreadcrumb_();englishModuleCtx_?.hooks?.setScore?.(0,0);removeEnglishInlineBridge_();if(englishModuleRoot_?.isConnected)englishModuleRoot_.remove();englishModuleRoot_=null;englishModuleMounted_=false;englishModuleAudioPrimed_=false;englishModuleCtx_=null;}
window.CLASS1_SUBJECT_MODULES=window.CLASS1_SUBJECT_MODULES||{};window.CLASS1_SUBJECT_MODULES.english=Object.freeze({render:renderClass1English_,destroy:destroyClass1English_});
})();

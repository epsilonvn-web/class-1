// ==========================================
// CẤU HÌNH KHO HỌC LIỆU & MA TRẬN NĂNG LỰC TOAN_C1-C6 (TOÁN LỚP 2)
// ==========================================
const TOPICS_CONFIG = [
    { id: 1, title: "1. Cấu tạo số", desc: "Đọc viết số, giá trị hàng, tách – gộp và ước lượng", icon: "🔢", color: "pink" },
    { id: 2, title: "2. Dãy số và phép so sánh", desc: "Số liền trước/sau, phép so sánh, sắp xếp và quy luật dãy số", icon: "🔢", color: "cyan" },
    { id: 3, title: "3. Phép cộng và trừ", desc: "Không nhớ, có nhớ, đặt tính, tên gọi thành phần", icon: "➕", color: "purple" },
    { id: 4, title: "4. Phép nhân và chia", desc: "Ý nghĩa phép nhân/chia, bảng nhân chia 2 và 5", icon: "✖️", color: "indigo" },
    { id: 5, title: "5. Hình học", desc: "Đường thẳng, hình phẳng, khối hình, xếp hình", icon: "📐", color: "amber" },
    { id: 6, title: "6. Đơn vị đo và thời gian", desc: "Độ dài, khối lượng, dung tích, giờ, lịch, tiền", icon: "⏰", color: "emerald" },
    { id: 7, title: "7. Tìm số chưa biết", desc: "Tìm x trong phép cộng, trừ, nhân, chia", icon: "❓", color: "violet" },
    { id: 8, title: "8. Quy luật nâng cao & IQ", desc: "Dãy số, bước nhảy lặp lại, sơ đồ số và quy luật hình trực quan", icon: "🔗", color: "cyan" },
    { id: 9, title: "9. Toán có lời văn", desc: "Thêm bớt, nhiều hơn ít hơn, giải 2 bước tính", icon: "📝", color: "rose" },
    { id: 10, title: "10. Thống kê và xác suất", desc: "Kiểm đếm, biểu đồ tranh, khả năng xảy ra", icon: "📊", color: "blue" },
    { id: 11, title: "11. Toán nâng cao", desc: "Tính nhanh, cấu tạo số, hình học và IQ nâng cao", icon: "🧠", color: "yellow" },
    { id: 12, title: "12. Math Lab – Toán tư duy Mỹ", desc: "Khám phá • Mô hình • Nhiều cách giải", icon: "✨", color: "fuchsia", mathLab: true }
];

const SUBTOPIC_PALETTES = [
    { card: "bg-pink-50/80 hover:bg-pink-100 border-pink-300 text-pink-800", num: "text-pink-600", badge: "bg-white text-pink-600 border-pink-200" },
    { card: "bg-emerald-50/80 hover:bg-emerald-100 border-emerald-300 text-emerald-800", num: "text-emerald-600", badge: "bg-white text-emerald-600 border-emerald-200" },
    { card: "bg-purple-50/80 hover:bg-purple-100 border-purple-300 text-purple-800", num: "text-purple-600", badge: "bg-white text-purple-600 border-purple-200" },
    { card: "bg-amber-50/80 hover:bg-amber-100 border-amber-300 text-amber-800", num: "text-amber-600", badge: "bg-white text-amber-600 border-amber-200" },
    { card: "bg-indigo-50/80 hover:bg-indigo-100 border-indigo-300 text-indigo-800", num: "text-indigo-600", badge: "bg-white text-indigo-600 border-indigo-200" },
    { card: "bg-rose-50/80 hover:bg-rose-100 border-rose-300 text-rose-800", num: "text-rose-600", badge: "bg-white text-rose-600 border-rose-200" }
];

// Lộ trình 24 tuần (Tỷ lệ Vàng 30/60) — mapping tới đúng chủ đề con (sub_id dạng "X.Y")
// Tuần 18 = Đấu trường thi Học kỳ I | Tuần 35 = Đấu trường thi Học kỳ II + Học sinh giỏi
const roadmapConfig = {
    1:  { name: "Tuần 1: Khởi Động Số Học", subIds: ["1.1", "1.2", "1.5"], desc: "Đọc viết số đến 100, cấu tạo số chục/đơn vị, so sánh lớn bé, điền số tia số, ước lượng số lượng trực quan.", icon: "🔟" },
    2:  { name: "Tuần 2: Phép Cộng Trừ Nhẩm", subIds: ["2.1", "2.6"], desc: "Cộng trừ không nhớ phạm vi 100. Đọc gọi tên thành phần phép tính: số hạng, tổng, số bị trừ, số trừ, hiệu.", icon: "➕" },
    3:  { name: "Tuần 3: Cộng Trừ Có Nhớ 20", subIds: ["2.2"], desc: "Các phép tính nhẩm có nhớ qua 10 trong phạm vi 20 (9, 8, 7 cộng một số; 11, 12, 13 trừ đi một số).", icon: "➕" },
    4:  { name: "Tuần 4: Độ Dài & Đường Thẳng", subIds: ["5.1", "4.1"], desc: "Làm quen Đề-xi-mét (dm), thực hành quy đổi cm-dm; nhận diện đường thẳng, đường cong, đoạn thẳng, ba điểm thẳng hàng.", icon: "📏" },
    5:  { name: "Tuần 5: Đặt Tính Cộng Trừ 100", subIds: ["2.3"], desc: "Đặt tính rồi tính cộng, trừ có nhớ phạm vi 100 (số có 2 chữ số với số có 1 hoặc 2 chữ số).", icon: "➕" },
    6:  { name: "Tuần 6: Khối Lượng & Khối Hình", subIds: ["5.2", "4.4"], desc: "Đại lượng Ki-lô-gam (kg), Lít (l), tính danh số thực tế; nhận diện khối lập phương, hộp chữ nhật, trụ, cầu.", icon: "🧊" },
    7:  { name: "Tuần 7: Đường Gấp Khúc & Hình", subIds: ["4.3", "4.2", "4.5"], desc: "Nhận dạng đếm hình tam giác, tứ giác; tính độ dài đường gấp khúc; xếp hình Tangram, gấp giấy.", icon: "📐" },
    8:  { name: "Tuần 8: Thế Giới Hàng Trăm", subIds: ["1.3", "1.4"], desc: "Các số trong phạm vi 1000 (đọc, viết, cấu tạo số trăm/chục/đơn vị, so sánh thứ tự lớn bé và tia số).", icon: "💯" },
    9:  { name: "Tuần 9: Tính Toán 1000 & Nhân Chia", subIds: ["2.4", "2.5", "3.1"], desc: "Cộng trừ không nhớ & có nhớ (1 lần) phạm vi 1000; ý nghĩa phép nhân (tổng bằng nhau), phép chia (chia đều).", icon: "✖️" },
    10: { name: "Tuần 10: Thời Gian & Tiền Tệ", subIds: ["5.3", "5.4", "5.5", "5.6"], desc: "Đọc đồng hồ chính xác đến 5 phút, quy tắc ngày giờ 24h, lịch tờ, lịch tháng; mệnh giá tiền giấy và mua bán nhỏ.", icon: "⏰" },
    11: { name: "Tuần 11: Bảng Tính 2 & 5 & Ôn Tập", subIds: ["3.2", "3.3", "11.1"], desc: "Thuộc lòng bảng nhân/chia 2 và 5; ôn tập tổng hợp kiến thức số học, đo lường và hình học Học kỳ I.", icon: "🔢" },
    12: { name: "Tuần 12: Đấu Trường Học Kỳ I", isExam: true, subIds: [], desc: "Bé thực hành làm đề kiểm tra cuối kì I tổng hợp chuẩn ma trận 13 câu (40 phút, đạt >= 80% vượt ải).", icon: "🏆" },
    13: { name: "Tuần 13: Quy Luật & Dãy Số", subIds: ["6.1", "6.2", "6.3", "6.4"], desc: "Tìm dãy số cách đều, nhận ra bước nhảy lặp lại, giải sơ đồ liên kết số và hoàn thành chuỗi hình trực quan.", icon: "🔗" },
    14: { name: "Tuần 14: Tìm Số Chưa Biết Cơ Bản", subIds: ["7.1", "7.2"], desc: "Đi tìm ẩn số x trong phép tính cộng (tìm số hạng) và phép tính trừ (tìm số bị trừ, tìm số trừ chưa biết).", icon: "❓" },
    15: { name: "Tuần 15: Tìm x Nâng Cao", subIds: ["7.3", "7.4"], desc: "Tìm thừa số chưa biết, tìm số bị chia; giải bài toán tìm x nâng cao chứa 2 phép tính phức tạp.", icon: "❓" },
    16: { name: "Tuần 16: Toán Lời Văn Thêm Bớt", subIds: ["8.1", "8.2"], desc: "Bài toán đơn có lời văn dạng thêm, bớt một số đơn vị; bài toán nhiều hơn, ít hơn và chênh lệch hơn kém.", icon: "📝" },
    17: { name: "Tuần 17: Toán Nhân Chia Thực Tế", subIds: ["8.3"], desc: "Bài toán đố liên quan phép nhân, phép chia trong đời sống (gấp lên/giảm đi một số lần, chia đều đồ vật).", icon: "✖️" },
    18: { name: "Tuần 18: Thống Kê Biểu Đồ", subIds: ["9.1", "9.2"], desc: "Thu thập dữ liệu trực quan, phân loại và kiểm đếm số lượng vật thể; đọc hiểu phân tích thông tin biểu đồ tranh.", icon: "📊" },
    19: { name: "Tuần 19: Toán Lời Văn 2 Bước Tính", subIds: ["8.4"], desc: "Đọc hiểu phân tích ngữ cảnh phức tạp và thực hiện giải toán bằng chính xác 2 bước tính tích hợp.", icon: "📝" },
    20: { name: "Tuần 20: Xác Suất & Hình Học Khó", subIds: ["9.3", "10.3"], desc: "Khả năng xảy ra sự kiện (chắc chắn/có thể/không thể); đếm hình tam giác/tứ giác lồng nhau và khối chồng xếp phức tạp.", icon: "🎲" },
    21: { name: "Tuần 21: Siêu Tư Duy Số Học", subIds: ["10.1", "10.2", "10.4"], desc: "Tính nhanh thuận tiện gộp số tròn chục, tròn trăm; cấu tạo số và lập số có ràng buộc kép; toán cân thăng bằng logic.", icon: "🧠" },
    22: { name: "Tuần 22: Ôn Tập Tổng Hợp HK2", subIds: ["11.2"], desc: "Hệ thống hóa toàn bộ kiến thức tính toán nâng cao học kỳ II, các dạng toán tìm x và toán đố có lời văn cả năm.", icon: "📘" },
    23: { name: "Tuần 23: Thử Thách Học Sinh Giỏi", subIds: ["11.3"], desc: "Thử thách trí tuệ bứt phá giới hạn dành cho học sinh giỏi xuất sắc; luyện tập tổng hợp toán IQ nâng cao.", icon: "🎓" },
    24: { name: "Tuần 24: Đấu Trường Cuối Năm", isExam: true, subIds: [], desc: "Làm bài kiểm tra cuối năm chuẩn hóa ma trận 13 câu (40 phút). Đạt >= 80% chính thức phá đảo khóa học Toán lớp 2.", icon: "🏆" }
};

const TOTAL_ROADMAP_WEEKS = 24;


// Toạ độ 35 mốc tuần dạng zigzag rắn bò (serpentine), 7 cột x 5 hàng, tự tính không cần khai báo tay từng điểm
function getRoadmapCoord(weekNum) {
    const cols = 6;
    const colWidth = 140, rowHeight = 105;
    const startX = 90, startY = 80;
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
        const bend = (i % 2 === 0 ? 1 : -1) * 45;
        const cx = midX + nx * bend, cy = midY + ny * bend;
        d += ` Q ${cx},${cy} ${p1.x},${p1.y}`;
    }
    return d;
}

const examFileMap = {
    hocky1: { file: 'de_thi_toan_2.json', idPrefix: '12.1.', sheet: 'LichSuBaiThi_HK1', label: 'Học kỳ 1', color: 'pink' },
    hocky2: { file: 'de_thi_toan_2.json', idPrefix: '12.2.', sheet: 'LichSuBaiThi_HK2', label: 'Học kỳ 2', color: 'purple' },
    hsg:    { file: 'de_thi_toan_2.json', idPrefix: '12.3.', sheet: 'LichSuBaiThi_HSG', label: 'Học sinh giỏi', color: 'amber' }
};

// 6 nhóm năng lực Toán lớp 2 (TOAN_C1 - TOAN_C6) — khoá nội bộ vẫn dùng C1..C6,
// việc trích tag từ chuỗi "TOAN_C1" sang "C1" được xử lý bằng regex ở nơi dùng.
const SKILL_TAXONOMY = {
    C1: { code: 'C1', sheetCol: 'C1_NhanBiet', totalCol: 'C1_NhanBiet_Tong', name: 'Nhận biết số và hình', advice: 'Cần ôn lại cách đọc viết số, phân tích cấu tạo số và nhận diện hình phẳng, hình khối cơ bản.' },
    C2: { code: 'C2', sheetCol: 'C2_PhepTinh', totalCol: 'C2_PhepTinh_Tong', name: 'Phép tính và tính nhẩm', advice: 'Rèn luyện thêm kỹ năng đặt tính rồi tính và tính nhẩm nhanh phép cộng, trừ, nhân, chia.' },
    C3: { code: 'C3', sheetCol: 'C3_DoLuong', totalCol: 'C3_DoLuong_Tong', name: 'Đo lường và thời gian', advice: 'Luyện tập thêm về đo đạc, quy đổi đơn vị, xem đồng hồ, xem lịch và nhận biết tiền Việt Nam.' },
    C4: { code: 'C4', sheetCol: 'C4_QuyLuat', totalCol: 'C4_QuyLuat_Tong', name: 'Quy luật và cấu trúc', advice: 'Cần luyện thêm về phát hiện quy luật dãy số/hình ảnh và các dạng bài tìm x.' },
    C5: { code: 'C5', sheetCol: 'C5_GiaiToan', totalCol: 'C5_GiaiToan_Tong', name: 'Giải toán có lời văn', advice: 'Tăng cường đọc hiểu ngữ cảnh bài toán đố và luyện giải toán bằng 1-2 bước tính.' },
    C6: { code: 'C6', sheetCol: 'C6_TuDuy', totalCol: 'C6_TuDuy_Tong', name: 'Tư duy logic và IQ', advice: 'Rèn kỹ năng suy luận logic, giải các bài toán cân thăng bằng và đếm hình phức tạp.' }
};

// Chuẩn đánh giá năng lực: khung C1-C6 là khung TOÀN CHƯƠNG TRÌNH, không phải checklist bắt buộc của từng đề.
// Không có câu đo năng lực => Chưa đánh giá. Có quá ít câu => Chưa đủ dữ liệu. Tuyệt đối không quy thành 0%.
const DEFAULT_ASSESSMENT_POLICY = {
    minQuestions: 2,
    noDataLabel: 'Chưa đánh giá',
    insufficientLabel: 'Chưa đủ dữ liệu'
};

function extractSkillKey_(value) {
    const m = String(value || '').toUpperCase().match(/C([1-6])/);
    return m ? `C${m[1]}` : null;
}

function getAssessmentPolicy_() {
    const p = activeExamContext?.assessmentPolicy || examsCache['de_thi_toan_2.json']?.assessment_policy || {};
    const minQuestions = Math.max(1, Number(p.min_questions_for_competency ?? p.minQuestions ?? DEFAULT_ASSESSMENT_POLICY.minQuestions) || DEFAULT_ASSESSMENT_POLICY.minQuestions);
    return {
        minQuestions,
        noDataLabel: p.no_data_label || p.noDataLabel || DEFAULT_ASSESSMENT_POLICY.noDataLabel,
        insufficientLabel: p.insufficient_data_label || p.insufficientLabel || DEFAULT_ASSESSMENT_POLICY.insufficientLabel
    };
}

const GREETINGS_STUDENT = [
    "Chào {name}, cô Thỏ Ngọc đố con hôm nay mình tính nhanh và chính xác đến đâu nhé!",
    "Chào mừng {name} quay lại! Não bộ đã khởi động, sẵn sàng chinh phục những con số chưa nào!",
    "Cô Thỏ Ngọc chào {name}! Kính đã đeo, bút đã cầm, giờ là lúc bứt phá điểm 10 Toán học!",
    "Chào con yêu {name}, hôm nay chúng mình cùng khám phá xem con số nào đang trốn ở đâu nhé!",
    "Chào mừng {name} đến với giờ học Toán! Cô Thỏ Ngọc tin con sẽ giải đề nhanh như chớp!"
];

const GREETINGS_GUEST = [
    "Chào bé yêu, cô Thỏ Ngọc rất vui được cùng con luyện Toán hôm nay!",
    "Chào mừng bé đến với lớp Toán của cô Thỏ Ngọc! Mình cùng thử sức xem sao nhé!",
    "Cô Thỏ Ngọc chào bé! Đeo kính vào là tư duy lên hạng liền, cùng bắt đầu nào!",
    "Chào thiên tài nhí! Cô Thỏ Ngọc đang chờ xem con giải bài nhanh cỡ nào đây!",
    "Chào mừng con đến với Đấu trường Toán học! Chúc con tính toán thật minh mẫn và vui vẻ!"
];


// ==========================================
// ĐỊNH DANH MÁY CHỦ APPS SCRIPT & BIẾN TOÀN CỤC
// ==========================================
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbycCVh4WjbjUrjn0UoHXWg6jeh8K2dwFW-a65HBozowSgQJ_orgiqWIkwHOO2P_sPE/exec";
let allTopicsDataCache = null;
let allQuestionsFlatCache = null;
// Bật/tắt đọc câu hỏi TỰ ĐỘNG khi vào câu mới — nút "Nghe câu hỏi" thủ công vẫn luôn hoạt động
// dù tắt tính năng này (đây chỉ tắt phần tự động phát, không tắt hẳn tính năng nghe).
let autoSpeechEnabled = localStorage.getItem('autoSpeechEnabled') !== 'false';
const examsCache = {};
let poetryGardenCache = null;
let poetryGardenState = { category: null, poemIndex: null };

// ==========================================
// BÀI HỌC <-> BÀI TẬP THEO SGK TOÁN 2
// 48 bài học chính; bỏ Luyện tập chung và Ôn tập khỏi module Bài học/Bài tập.
// Khung TOAN_C1-C6 phía trên vẫn là trục đánh giá xuyên suốt.
// ==========================================
const BAI_HOC_DATA_FILE = 'assets/data/bai_hoc_toan_2.json';
let baiHocDataCache = null;

async function loadBaiHocData() {
    if (baiHocDataCache) return baiHocDataCache;
    const res = await fetch(BAI_HOC_DATA_FILE);
    if (!res.ok) throw new Error('Không thể tải dữ liệu Bài học/Bài tập Toán 2');
    baiHocDataCache = await res.json();
    return baiHocDataCache;
}


let currentUser = null;
let starGreenCount = 0;
let starRedCount = 0;
let activeTopicId = null;
let activeExamContext = null;
let activeRoadmapContext = null;
let inMiniGameFlow = false;
let activeQuestionsList = [];
let practiceCycleRawPool = [];
let pendingTopicQuiz = null;
let currentQIndex = 0;
let score = 0;
let userAnswers = {};
let wrongAttemptsByQ = {};
let orderInteractionState = {};
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
// ACCOUNT ACCESS MODEL: GUEST / REGULAR / TRIAL / VIP / ADMIN
// ==========================================
const PREMIUM_TOPIC_IDS = new Set([11]);

function normalizeRole(user) {
    const raw = user?.vaiTro ?? user?.VaiTro ?? user?.role ?? user?.Role ?? '';
    return String(raw || '').trim().toLowerCase() === 'admin' ? 'admin' : 'student';
}

function normalizeAccountType(user) {
    if (normalizeRole(user) === 'admin') return 'admin';
    const raw = user?.loaiTaiKhoan ?? user?.LoaiTaiKhoan ?? user?.accountType ?? user?.tier ?? 'regular';
    const v = String(raw || 'regular').trim().toLowerCase();
    return ['regular', 'trial', 'vip'].includes(v) ? v : 'regular';
}

function hydrateAccountFields(user) {
    if (!user) return user;
    return {
        ...user,
        vaiTro: normalizeRole(user),
        loaiTaiKhoan: normalizeAccountType(user),
        hanDungThu: user.hanDungThu ?? user.HanDungThu ?? '',
        hanVIP: user.hanVIP ?? user.HanVIP ?? ''
    };
}

function isPremiumUser() {
    if (!currentUser || currentUser.isGuest) return false;
    const role = normalizeRole(currentUser);
    const tier = normalizeAccountType(currentUser);
    return role === 'admin' || tier === 'trial' || tier === 'vip';
}

function isAdminUser() {
    return !!currentUser && !currentUser.isGuest && normalizeRole(currentUser) === 'admin';
}

function refreshAccessUI() {
    const unlocked = isPremiumUser();
    ['bai-hoc-lock-icon','roadmap-lock-icon','review-lock-icon','exam-lock-icon','minigame-lock-icon'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.toggle('hidden', unlocked);
    });
}

function openAuthFromGuest(tab = 'login') {
    stopSpeaking();
    switchAuthTab(tab);
    document.getElementById('screen-dashboard')?.classList.add('hidden');
    document.getElementById('screen-login')?.classList.remove('hidden');
}

function ensurePremiumAccess(featureName, onAllowed) {
    if (isPremiumUser()) {
        if (typeof onAllowed === 'function') onAllowed();
        return true;
    }
    showPremiumAccessModal(featureName);
    return false;
}

function showPremiumAccessModal(featureName = 'Tính năng này') {
    let modal = document.getElementById('premium-access-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'premium-access-modal';
        modal.className = 'hidden fixed inset-0 z-[70] bg-slate-900/55 backdrop-blur-sm flex items-center justify-center p-3';
        modal.innerHTML = `
            <div class="w-full max-w-[350px] bg-white rounded-[28px] border-[3px] border-pink-200 shadow-2xl overflow-hidden text-center">
                <div class="px-5 pt-5 pb-4 bg-gradient-to-b from-pink-50 to-white">
                    <div id="premium-modal-icon" class="text-5xl leading-none mb-3">🐰</div>
                    <h3 id="premium-modal-title" class="text-xl md:text-2xl font-black text-purple-600 mb-3">Nội dung Premium</h3>
                    <div id="premium-modal-message" class="text-[14px] leading-[1.55] font-bold text-slate-600"></div>
                    <div class="mt-4 rounded-2xl border border-pink-200 bg-pink-50/80 px-3 py-3 text-xs md:text-sm leading-relaxed font-extrabold text-pink-500">
                        🌸 Các chuyên đề cơ bản vẫn học miễn phí bình thường nhé!
                    </div>
                </div>
                <div id="premium-modal-actions" class="px-4 py-3.5 border-t border-pink-100 bg-white"></div>
            </div>`;
        document.body.appendChild(modal);
    }

    const guest = !currentUser || currentUser.isGuest;
    const iconMap = {
        'Bản đồ tuần': '🗺️',
        'Mini Game': '🎮',
        '11. Ôn tập': '🎮',
        '12. Đấu trường đề thi': '🏆'
    };
    const icon = iconMap[featureName] || (String(featureName).toLowerCase().includes('đấu trường') ? '🏆' : '🐰');

    const iconEl = document.getElementById('premium-modal-icon');
    if (iconEl) iconEl.textContent = icon;
    document.getElementById('premium-modal-title').textContent = featureName;
    document.getElementById('premium-modal-message').innerHTML = guest
        ? `Đây là <strong>${escapeHtml(featureName)}</strong> dành cho tài khoản Trial hoặc VIP.<br>Con có thể Sign in nếu đã có tài khoản hoặc Sign up để đăng ký nhé!`
        : `Tài khoản hiện tại của con là <strong>Regular</strong>.<br><strong>${escapeHtml(featureName)}</strong> chỉ dành cho tài khoản Trial hoặc VIP.`;

    const actions = document.getElementById('premium-modal-actions');
    actions.innerHTML = guest
        ? `<div class="grid grid-cols-2 gap-2">
               <button onclick="closePremiumAccessModal();openAuthFromGuest('login')" class="py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-black text-sm shadow-sm pastel-btn">Sign in</button>
               <button onclick="closePremiumAccessModal();openAuthFromGuest('register')" class="py-3 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-black text-sm shadow-sm pastel-btn">Sign up</button>
           </div>
           <button onclick="closePremiumAccessModal()" class="mt-2.5 w-full py-2 text-sm md:text-base font-black text-slate-400 hover:text-slate-600">Để sau nhé</button>`
        : `<button onclick="closePremiumAccessModal()" class="w-full py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-black text-sm shadow-sm pastel-btn">Đã hiểu</button>`;
    modal.classList.remove('hidden');
}
function closePremiumAccessModal() {
    document.getElementById('premium-access-modal')?.classList.add('hidden');
}

function formatAccountTierLabel() {
    if (!currentUser || currentUser.isGuest) return 'Khách';
    if (isAdminUser()) return 'Admin';
    const t = normalizeAccountType(currentUser);
    return t === 'vip' ? 'VIP' : (t === 'trial' ? 'Trial' : 'Regular');
}



// ==========================================
// THÔNG BÁO TRONG APP - KHÔNG DÙNG HỘP THOẠI TRÌNH DUYỆT
// ==========================================
function ensureAppDialog() {
    let modal = document.getElementById('app-dialog-modal');
    if (modal) return modal;
    modal = document.createElement('div');
    modal.id = 'app-dialog-modal';
    modal.className = 'hidden fixed inset-0 z-[120] bg-slate-900/55 backdrop-blur-sm flex items-center justify-center p-3';
    modal.innerHTML = `
        <div class="w-full max-w-[380px] bg-white rounded-[28px] border-[3px] border-pink-200 shadow-2xl overflow-hidden text-center">
            <div class="px-5 pt-5 pb-4 bg-gradient-to-b from-pink-50 via-purple-50/40 to-white">
                <div id="app-dialog-icon" class="text-5xl leading-none mb-2">🐰</div>
                <h3 id="app-dialog-title" class="text-xl font-black text-purple-600 mb-2">Cô Thỏ Ngọc nhắn bé</h3>
                <div id="app-dialog-message" class="text-sm leading-6 font-bold text-slate-600 whitespace-pre-line"></div>
            </div>
            <div id="app-dialog-actions" class="px-4 py-3.5 border-t border-pink-100 bg-white"></div>
        </div>`;
    document.body.appendChild(modal);
    modal.addEventListener('click', e => { if (e.target === modal && modal.dataset.dismissible === '1') closeAppDialog(); });
    return modal;
}
function closeAppDialog() {
    document.getElementById('app-dialog-modal')?.classList.add('hidden');
}
function showAppNotice(message, options = {}) {
    const modal = ensureAppDialog();
    modal.dataset.dismissible = '1';
    document.getElementById('app-dialog-icon').textContent = options.icon || (String(message).includes('🎉') ? '🎉' : '🐰');
    document.getElementById('app-dialog-title').textContent = options.title || (String(message).includes('🎉') ? 'Giỏi lắm!' : 'Cô Thỏ Ngọc nhắn bé');
    document.getElementById('app-dialog-message').textContent = String(message ?? '');
    document.getElementById('app-dialog-actions').innerHTML = `<button id="app-dialog-ok" class="w-full py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-black text-sm shadow-sm pastel-btn">${options.okText || 'Đã hiểu'}</button>`;
    document.getElementById('app-dialog-ok').onclick = () => { closeAppDialog(); if (typeof options.onClose === 'function') options.onClose(); };
    modal.classList.remove('hidden');
}
function showAppConfirm(message, onConfirm, options = {}) {
    const modal = ensureAppDialog();
    modal.dataset.dismissible = '0';
    document.getElementById('app-dialog-icon').textContent = options.icon || '📝';
    document.getElementById('app-dialog-title').textContent = options.title || 'Xác nhận nộp bài';
    document.getElementById('app-dialog-message').textContent = String(message ?? '');
    document.getElementById('app-dialog-actions').innerHTML = `
        <div class="grid grid-cols-2 gap-2">
            <button id="app-dialog-cancel" class="py-3 rounded-2xl border-2 border-pink-200 bg-pink-50 text-pink-600 font-black text-sm pastel-btn">${options.cancelText || 'Làm tiếp'}</button>
            <button id="app-dialog-confirm" class="py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-black text-sm shadow-sm pastel-btn">${options.confirmText || 'Đồng ý'}</button>
        </div>`;
    document.getElementById('app-dialog-cancel').onclick = closeAppDialog;
    document.getElementById('app-dialog-confirm').onclick = () => { closeAppDialog(); if (typeof onConfirm === 'function') onConfirm(); };
    modal.classList.remove('hidden');
}

// ==========================================
// HÀM TIỆN ÍCH DỮ LIỆU
// ==========================================
function getStudentFirstName() {
    if (!currentUser || currentUser.isGuest || !currentUser.hoTen) return "Bé";
    const parts = currentUser.hoTen.trim().split(/\s+/);
    return parts[parts.length - 1] || "Bé";
}


function buildGeometryAssemblyNumberOptions_(answer, seed = 0) {
    const a = Math.max(0, Number(answer) || 0);
    const pool = [a, a + 1, Math.max(0, a - 1), a + 2, Math.max(0, a - 2), a + 3]
        .filter((v, i, arr) => arr.indexOf(v) === i)
        .map(String);
    while (pool.length < 4) pool.push(String(pool.length + a + 4));
    const out = pool.slice(0, 4);
    const shift = Math.abs(Number(seed) || 0) % out.length;
    return out.slice(shift).concat(out.slice(0, shift));
}

function enhanceGeometryAssemblyQuestion_(q) {
    if (!q || String(q.sub_id || q.sub_topic || '').trim() !== '4.5') return q;
    const seed = Math.abs(Number(q.question_id) || 45000);
    const variant = seed % 12;
    const cycle = Math.max(0, Math.floor((seed - 45000) / 12));
    const shapes = ['Hình vuông', 'Hình chữ nhật', 'Hình tam giác'];
    const shape = shapes[seed % shapes.length];
    let question = '';
    let answer = '';
    let options = [];
    let hint = '';
    let vd = { assembly_task: '', target_shape: shape };

    if (variant === 0) {
        const total = 7 + (cycle % 3);
        const used = 3 + (cycle % 3);
        const left = total - used;
        question = `Trong khay có ${total} mảnh tam giác. Bạn dùng ${used} mảnh để hoàn thành một hình ghép. Hỏi còn lại bao nhiêu mảnh?`;
        answer = String(left); options = buildGeometryAssemblyNumberOptions_(left, seed);
        hint = `Lấy số mảnh ban đầu trừ số mảnh đã dùng: ${total} − ${used} = ${left}.`;
        vd = { ...vd, assembly_task:'remaining', piece_count:total, used_count:used, leftover:left };
    } else if (variant === 1) {
        const count = [4,6,8,10][cycle % 4];
        const squares = count / 2;
        question = `Cứ 2 mảnh tam giác vuông cân ghép được 1 hình vuông nhỏ. Với ${count} mảnh, ghép được bao nhiêu hình vuông nhỏ?`;
        answer = String(squares); options = buildGeometryAssemblyNumberOptions_(squares, seed);
        hint = `Ghép theo từng cặp 2 mảnh: ${count} ÷ 2 = ${squares}.`;
        vd = { ...vd, assembly_task:'pair_count', piece_count:count, pieces_per_target:2, target_count:squares, target_shape:'Hình vuông' };
    } else if (variant === 2) {
        const targetCount = 2 + (cycle % 4);
        const need = targetCount * 2;
        question = `Mỗi hình vuông nhỏ cần 2 mảnh tam giác. Muốn ghép ${targetCount} hình vuông như nhau, cần tất cả bao nhiêu mảnh tam giác?`;
        answer = String(need); options = buildGeometryAssemblyNumberOptions_(need, seed);
        hint = `Có ${targetCount} nhóm, mỗi nhóm 2 mảnh: ${targetCount} × 2 = ${need}.`;
        vd = { ...vd, assembly_task:'pieces_needed', target_count:targetCount, pieces_per_target:2, piece_count:need, target_shape:'Hình vuông' };
    } else if (variant === 3) {
        const intro = ['Hai mảnh tam giác vuông cân giống nhau', 'Hai nửa tam giác của một miếng ghép', 'Hai tam giác trong khay thực hành'][cycle % 3];
        question = `${intro} được ghép khít theo cạnh dài như hình. Đường bao ngoài tạo thành hình gì?`;
        answer = 'Hình vuông';
        options = ['Hình chữ nhật','Hình vuông','Hình tam giác','Hình tròn'];
        hint = 'Quan sát đường bao ngoài: có 4 cạnh bằng nhau và 4 góc vuông.';
        vd = { ...vd, assembly_task:'target_name', piece_count:2, target_shape:'Hình vuông' };
    } else if (variant === 4) {
        const targetShape = shapes[cycle % shapes.length];
        const vertices = targetShape === 'Hình tam giác' ? 3 : 4;
        question = `Sau khi ghép các mảnh, đường bao ngoài tạo thành ${targetShape.toLowerCase()}. Hình đó có bao nhiêu đỉnh?`;
        answer = String(vertices); options = buildGeometryAssemblyNumberOptions_(vertices, seed);
        hint = `Chỉ đếm các góc ở đường bao ngoài của ${targetShape.toLowerCase()}, không đếm đường ghép bên trong.`;
        vd = { ...vd, assembly_task:'vertices', target_shape:targetShape, vertex_count:vertices, piece_count:4 };
    } else if (variant === 5) {
        const total = 8 + 2 * (cycle % 3);
        const used = total - (2 + (cycle % 2));
        const left = total - used;
        const diff = used - left;
        question = `Có ${total} mảnh tam giác. Bạn dùng ${used} mảnh để ghép hình, còn ${left} mảnh. Số mảnh đã dùng nhiều hơn số mảnh còn lại bao nhiêu?`;
        answer = String(diff); options = buildGeometryAssemblyNumberOptions_(diff, seed);
        hint = `So sánh hai nhóm: ${used} − ${left} = ${diff}.`;
        vd = { ...vd, assembly_task:'difference', piece_count:total, used_count:used, leftover:left, difference:diff };
    } else if (variant === 6) {
        const total = [5,7,9][cycle % 3];
        const maxSquares = Math.floor(total / 2);
        const left = total % 2;
        question = `Mỗi hình vuông nhỏ cần đúng 2 mảnh tam giác. Với ${total} mảnh, ghép được nhiều nhất bao nhiêu hình vuông hoàn chỉnh?`;
        answer = String(maxSquares); options = buildGeometryAssemblyNumberOptions_(maxSquares, seed);
        hint = `${total} mảnh chia thành các cặp 2 mảnh: ghép được ${maxSquares} hình và còn ${left} mảnh.`;
        vd = { ...vd, assembly_task:'max_complete', piece_count:total, pieces_per_target:2, target_count:maxSquares, leftover:left, target_shape:'Hình vuông' };
    } else if (variant === 7) {
        const targetCount = 2 + (cycle % 3);
        const leftover = 1 + (cycle % 2);
        const total = targetCount * 2 + leftover;
        question = `Bạn đã ghép ${targetCount} hình vuông, mỗi hình dùng 2 mảnh tam giác và còn dư ${leftover} mảnh. Lúc đầu bạn có bao nhiêu mảnh?`;
        answer = String(total); options = buildGeometryAssemblyNumberOptions_(total, seed);
        hint = `Số mảnh đã dùng là ${targetCount} × 2 = ${targetCount*2}; cộng ${leftover} mảnh còn dư được ${total}.`;
        vd = { ...vd, assembly_task:'reverse_total', target_count:targetCount, pieces_per_target:2, leftover, piece_count:total, target_shape:'Hình vuông' };
    } else if (variant === 8) {
        const total = [6,8,10][cycle % 3];
        const targetCount = total / 2;
        question = `Có ${total} mảnh tam giác và mỗi hình vuông cần 2 mảnh. Phương án nào dưới đây dùng hết các mảnh?`;
        answer = `Ghép ${targetCount} hình vuông`;
        options = [`Ghép ${Math.max(1,targetCount-1)} hình vuông`,`Ghép ${targetCount} hình vuông`,`Ghép ${targetCount+1} hình vuông`,`Chỉ ghép 1 hình vuông`];
        hint = `${total} ÷ 2 = ${targetCount}, nên dùng hết mảnh khi ghép ${targetCount} hình vuông.`;
        vd = { ...vd, assembly_task:'choose_plan', piece_count:total, pieces_per_target:2, target_count:targetCount, target_shape:'Hình vuông' };
    } else if (variant === 9) {
        const targetCount = 2 + (cycle % 3);
        const need = targetCount * 2;
        question = `Một hình vuông được cắt theo đường chéo thành 2 mảnh tam giác. Muốn ghép lại ${targetCount} hình vuông như ban đầu, cần bao nhiêu mảnh tam giác?`;
        answer = String(need); options = buildGeometryAssemblyNumberOptions_(need, seed);
        hint = `Mỗi hình vuông có 2 nửa tam giác: ${targetCount} × 2 = ${need}.`;
        vd = { ...vd, assembly_task:'reassemble', target_count:targetCount, pieces_per_target:2, piece_count:need, target_shape:'Hình vuông' };
    } else if (variant === 10) {
        const aCount = 2 + cycle;
        const bCount = aCount + 2 + (cycle % 2);
        const diff = bCount - aCount;
        question = `Hình A dùng ${aCount} mảnh tam giác, hình B dùng ${bCount} mảnh. Hình B dùng nhiều hơn hình A bao nhiêu mảnh?`;
        answer = String(diff); options = buildGeometryAssemblyNumberOptions_(diff, seed);
        hint = `Lấy ${bCount} mảnh của hình B trừ ${aCount} mảnh của hình A: ${bCount} − ${aCount} = ${diff}.`;
        vd = { ...vd, assembly_task:'compare_targets', target_a:aCount, target_b:bCount, difference:diff, target_shape:'Hình vuông' };
    } else {
        const total = [5,7,9][cycle % 3];
        question = `Có ${total} mảnh tam giác. Mỗi hình vuông cần 2 mảnh. Cần thêm ít nhất bao nhiêu mảnh để có thể dùng hết tất cả mảnh vào các hình vuông?`;
        answer = '1'; options = ['0','1','2','3'];
        hint = `${total} là số lẻ. Thêm 1 mảnh sẽ được ${total+1}, là số chẵn và chia hết thành các cặp 2 mảnh.`;
        vd = { ...vd, assembly_task:'add_to_even', piece_count:total, add_count:1, pieces_per_target:2, target_shape:'Hình vuông' };
    }

    return {
        ...q,
        question_text: question,
        options,
        answer,
        hint,
        explanation: hint,
        audio_text: question,
        explore_type: 'geometry_assembly_reasoning',
        visual_data: vd
    };
}

function normalizeQuestion(q) {
    if (!q) return null;
    const normalized = {
        question_id: q.id ?? q.question_id ?? q.question_no ?? 0,
        // Kho dữ liệu Toán 2 (bản mới) đã tách riêng "sub" = TÊN đầy đủ chủ đề con và "sub_code" = MÃ "X.Y"
        // (dùng để khớp roadmap 24 tuần). Vẫn dự phòng cho định dạng cũ (chỉ có "sub" là mã) để không vỡ dữ liệu cũ.
        sub_topic: String(q.sub_code ?? q.sub ?? q.sub_topic ?? 'Câu hỏi chung').trim(),
        sub_id: String(q.sub_code ?? q.sub_id ?? q.sub ?? q.sub_topic ?? '').trim(),
        sub_topic_label: String(q.sub ?? q.sub_code ?? q.sub_topic ?? 'Câu hỏi chung').trim(),
        week: q.week ?? q.w ?? null,
        question_text: q.q ?? q.question_text ?? '',
        options: Array.isArray(q.o) ? q.o : (Array.isArray(q.options) ? q.options : []),
        answer: q.a ?? q.answer ?? '',
        hint: q.h ?? q.hint ?? '',
        image_url: q.img ?? q.image_url ?? '',
        audio_text: q.aud ?? q.audio_text ?? '',
        reading_title: q.r_title ?? q.reading_title ?? '',
        reading_passage: q.r_passage ?? q.reading_passage ?? q.passage_text ?? '',
        skill_tag: q.skill_tag ?? q.tag ?? '',
        skill: q.skill ?? '',
        difficulty: q.difficulty ?? '',
        semester: q.semester ?? '',
        scope: q.scope ?? '',
        source_basis: Array.isArray(q.source_basis) ? q.source_basis : [],
        explore_topic_id: Number(q.explore_topic_id ?? inferExploreTopicIdFromSubCode_(q.sub_code ?? q.sub_id ?? q.sub ?? q.sub_topic)),
        explore_topic: q.explore_topic ?? '',
        explore_group: q.explore_group ?? '',
        explore_group_label: q.explore_group_label ?? '',
        explore_level: Number(q.explore_level ?? 0),
        explore_type: q.explore_type ?? '',
        explore_branch: q.explore_branch ?? '',
        explore_hidden: Boolean(q.explore_hidden ?? false),
        visual_data: q.visual_data ?? null,
        lesson_refs: Array.isArray(q.lesson_refs) ? q.lesson_refs.map(String) : [],
        diem: Number(q.diem ?? q.score ?? 0.5),
        explanation: q.explanation ?? q.h ?? 'Không có giải thích chi tiết.'
    };
    return normalized;
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

function getQuestionsForWeek343(weekNumber) {
    const config = roadmapConfig[weekNumber];
    if (!config || !allQuestionsFlatCache) return [];

    // Gom toàn bộ câu hỏi thuộc đúng các chủ đề con (sub_id dạng "X.Y") của tuần này —
    // mỗi câu đã tự mang theo skill_tag riêng (TOAN_C1-C6), không cần bảng TOPIC_TO_SKILL suy luận gián tiếp.
    let pool = allQuestionsFlatCache.filter(q => config.subIds.includes(q.sub_topic));

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

// Nhãn mục con hiển thị theo số Mục đang thấy trên giao diện (3.1, 4.1, 5.1...).
// Dữ liệu JSON vẫn giữ nguyên sub_topic cũ để không làm vỡ roadmap/bài tập; chỉ chuẩn hóa presentation.
function getExploreSubtopicDisplayLabel_(topicNum, index, rawLabel) {
    const major = Number(topicNum);
    const minor = Number(index) + 1;
    let label = beautifySubtopicName(rawLabel);
    // Nếu dữ liệu cũ đã có tiền tố số (ví dụ 3.1), bỏ nó đi rồi gắn lại theo Mục hiện tại.
    label = label.replace(/^\s*\d+(?:\.\d+)?[.)]?\s*/, '').trim();
    if (!Number.isFinite(major) || major <= 0 || !Number.isFinite(minor) || minor <= 0) return label;
    return `${major}.${minor}${label ? ` ${label}` : ''}`;
}

const DATA_VERSION = '20260930-topic56-solution-assembly-v2';
const TOPICS_DATA_FILES = [
    'assets/data/kho_hoc_toan_2_hk1.json',
    'assets/data/kho_hoc_toan_2_hk2.json'
];

function inferExploreTopicIdFromSubCode_(subCode) {
    const code = String(subCode || '').trim();
    if (!code) return 0;
    const parts = code.split('.');
    const major = Number(parts[0]);
    const minor = Number(parts[1]);
    if (major === 1) {
        if ([1, 3, 5].includes(minor)) return 1; // Cấu tạo số + ước lượng
        if ([2, 4].includes(minor)) return 2;    // Tia số + so sánh
        return 0;
    }
    // Sau khi đổi vị trí Mục 7 và 8:
    // sub 6.x = Quy luật nâng cao & IQ -> Mục 8
    // sub 7.x = Tìm số chưa biết       -> Mục 7
    if (major === 6) return 8;
    if (major === 7) return 7;
    if (major >= 2 && major <= 5) return major + 1;
    if (major >= 8 && major <= 10) return major + 1;
    return 0;
}

// Kho học liệu Toán 2 là MẢNG PHẲNG câu hỏi (mỗi câu tự mang "sub": "X.Y" và "tag": "TOAN_Cx"),
// không bọc sẵn theo từng Mục lớn như bản gốc — nên cần tự gom nhóm theo số Mục (phần trước dấu chấm của "sub").
async function fetchAllQuestionsFlat() {
    if (allQuestionsFlatCache) return allQuestionsFlatCache;

    const results = await Promise.all(TOPICS_DATA_FILES.map(async (file) => {
        const res = await fetch(`${file}?v=${DATA_VERSION}`, { cache: 'no-store' });
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
        // Khám phá dùng explore_topic_id riêng để tách "Số học" thành 2 mục lớn,
        // trong khi sub_code gốc vẫn giữ nguyên cho Bài tập/Roadmap/Bài học.
        const mucNum = Number(q.explore_topic_id || inferExploreTopicIdFromSubCode_(q.sub_id || q.sub_topic) || 0);
        if (!mucNum || q.explore_hidden) return;
        if (!byMuc[mucNum]) byMuc[mucNum] = [];
        // Chỉ Khám phá Mục 5.5 dùng bộ câu hỏi lắp ghép mới; Roadmap/Bài tập/Đề thi giữ nguyên dữ liệu gốc.
        byMuc[mucNum].push(mucNum === 5 ? enhanceGeometryAssemblyQuestion_({ ...q }) : q);
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
    const res = await fetch(`assets/data/${file}`, { cache: 'no-store' });
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

    // Luon khoi phuc layout Khám phá khi quay ve trang chu.
    // Desktop rong: 4 cot; man hinh vua: 3 cot; nho hon: 2/1 cot.
    // Cac man con co the tam thoi doi className cua container, nen neu khong
    // reset tai day thi trang Khám phá se bi ket o layout 2 cot.
    container.className = 'w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5';
    
    let topicsData = [];
    try { topicsData = await fetchAllTopicsData(); } catch (e) {}

    let html = '';
    TOPICS_CONFIG.forEach(t => {
        const topicObj = topicsData.find(item => Number(item.topic_id) === Number(t.id));
        const totalCount = topicObj && topicObj.questions ? topicObj.questions.length : 0;
        const countLabel = Number(t.id) === 12 ? '72 hành trình' : (totalCount > 0 ? `${totalCount} câu` : 'Đang cập nhật');

        const iconHtml = t.isCustomTextIcon 
            ? `<div class="w-8 h-8 bg-rose-100 rounded-xl flex items-center justify-center text-[11px] font-black text-rose-600 shadow-inner group-hover:scale-110 transition-transform shrink-0 tracking-tight">S/X</div>`
            : `<div class="w-8 h-8 bg-${t.color}-100 rounded-xl flex items-center justify-center text-sm font-extrabold text-${t.color}-600 shadow-inner group-hover:scale-110 transition-transform shrink-0">${t.icon}</div>`;

        const premiumLocked = PREMIUM_TOPIC_IDS.has(Number(t.id)) && !isPremiumUser();
        html += `
            <div onclick="openTopic(${t.id}, '${t.title}', '${t.icon}')" class="pastel-card relative p-3 flex flex-col justify-between cursor-pointer hover:border-${t.color}-400 transition-all group min-h-[92px]">
                ${premiumLocked ? '<i class="fa-solid fa-lock absolute top-2.5 right-3 text-slate-400 text-xs"></i>' : ''}
                <div class="flex items-center space-x-2.5">
                    ${iconHtml}
                    <h3 class="font-extrabold text-${t.color}-700 text-sm md:text-base leading-tight">${t.title}</h3>
                </div>
                <div class="flex justify-between items-center mt-1.5 pt-1 border-t border-pink-100 text-[11px] font-bold text-gray-500">
                    <span>${t.desc}</span>
                    <span class="bg-${t.color}-50 text-${t.color}-600 px-2 py-0.5 rounded-full">${countLabel}</span>
                </div>
            </div>
        `;
    });

    // Khám phá hiển thị 11 chuyên mục truyền thống + Math Lab; Ôn tập và Đề thi có tab riêng.
    container.innerHTML = html;
}

async function startRandomExam(categoryKey) {
    stopSpeaking();
    // Dữ liệu đề thi Toán 2 không có field "exam_category" dạng chữ — phân loại HK1/HK2/HSG
    // dựa đúng theo TIỀN TỐ của "exam_id" (12.1.x = HK1, 12.2.x = HK2, 12.3.x = HSG),
    // khớp với ma trận exam_id đã chuẩn hoá trong file dữ liệu.
    const idPrefix = examFileMap[categoryKey]?.idPrefix || '';

    showLoadingOverlay("Đang chuẩn bị đề thi...");
    try {
        const examData = await loadExamDataFile('de_thi_toan_2.json');
        hideLoadingOverlay();

        const pool = (examData && Array.isArray(examData.exams)) ? examData.exams : [];
        let candidates = pool.filter(e => String(e.exam_id || '').startsWith(idPrefix));
        if (!candidates.length) return showAppNotice('Đang cập nhật thêm đề thi cho mục này, bé quay lại sau nhé!');

        const exam = candidates[Math.floor(Math.random() * candidates.length)];
        const examIndex = pool.indexOf(exam);
        const examId = String(exam.exam_id || '');
        const parsedExamNo = Number(examId.split('.').pop());
        const categoryExamIndex = candidates.indexOf(exam);
        const examNo = Number.isFinite(parsedExamNo) && parsedExamNo > 0 ? parsedExamNo : (categoryExamIndex + 1);
        const examLabel = examFileMap[categoryKey]?.label || 'Đề thi';
        const examTitle = exam.exam_title || exam.name || exam.title || `${examLabel} - Đề số ${examNo}`;

        activeExamContext = {
            categoryKey,
            examIndex,
            examNo,
            examId,
            examTitle,
            measuredCompetencies: Array.isArray(exam.measured_competencies) ? exam.measured_competencies : [],
            assessmentPolicy: examData?.assessment_policy || null,
            scopeSummary: exam.scope_summary || ''
        };
        activeRoadmapContext = null;
        pendingTopicQuiz = null;

        const questions = Array.isArray(exam.questions) && exam.questions.length ? exam.questions : [];
        if (!questions.length) return showAppNotice('Đề thi này chưa có câu hỏi, bé chọn đề khác nhé!');

        updateNavTabs(examTitle, '🏆', null);
        startTopicQuiz(0, examTitle, shuffleArray(questions), null);
    } catch (err) {
        hideLoadingOverlay();
        showAppNotice(`Không thể tải đề thi: ${err.message}`);
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
            showAppNotice('Đã hết giờ làm bài! Bài thi sẽ được nộp lại nhé bé.');
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
    stopSpeaking();
    if (!isPremiumUser()) { showPremiumAccessModal('Đấu trường đề thi'); return; }
    setMainTabActive_('exams');
    activeExamContext = null;
    activeRoadmapContext = null;
    activeTopicId = null;
    pendingTopicQuiz = null;
    updateNavTabs(null, null, null);
    switchAppView('view-exam-hub');
    showLoadingOverlay("Đang tải kho đề thi...");
    renderExamHubGrid().finally(() => hideLoadingOverlay());
}

async function renderExamHubGrid() {
    const container = document.getElementById('exam-categories-grid');
    if (!container) return;

    let examData = null;
    try { examData = await loadExamDataFile('de_thi_toan_2.json'); } catch (e) {}

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
                <span class="inline-block bg-pink-100 text-pink-700 px-3 py-0.5 rounded-full text-sm md:text-base font-black mb-3">${countHK1} đề thi chuẩn</span>
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
                <span class="inline-block bg-purple-100 text-purple-700 px-3 py-0.5 rounded-full text-sm md:text-base font-black mb-3">${countHK2} đề thi chuẩn</span>
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
                <span class="inline-block bg-amber-100 text-amber-700 px-3 py-0.5 rounded-full text-sm md:text-base font-black mb-3">${countHSG} đề thi tuyển chọn</span>
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
// MINI GAME TOÁN 2 — HUB 12 GAME + LAZY LOAD
// ==========================================
const MINIGAME_LIST = [
    { id: 'sudoku', title: '1. Sudoku', desc: 'Điền số đúng theo hàng, cột và từng ô nhỏ', icon: '🔢', ready: true },
    { id: 'balance-scale', title: '2. Balance Scale', desc: 'Cân bằng hai vế bằng tư duy phép tính', icon: '⚖️', ready: true },
    { id: 'place-value-factory', title: '3. Nhà máy đổi chục', desc: 'Xây số bằng khối trăm, chục và đơn vị', icon: '🏭', ready: true },
    { id: 'equal-share-farm', title: '4. Nông trại chia đều', desc: 'Chia nhóm bằng nhau để hiểu nhân và chia', icon: '🥕', ready: true },
    { id: 'number-bridge', title: '5. Cây cầu số', desc: 'Ghép các đoạn cầu vừa khít bằng cộng và tách số', icon: '🌉', ready: true },
    { id: 'number-train', title: '6. Đường ray số', desc: 'Ghép ray đúng quãng đường để đưa tàu về ga', icon: '🚂', ready: true },
    { id: 'data-detective', title: '7. Thám tử dữ liệu', desc: 'Phân loại, kiểm đếm và sửa báo cáo sai', icon: '🕵️', ready: true },
    { id: 'shape-builder', title: '8. Shape Builder', desc: 'Ghép hình và khám phá hình học', icon: '📐', ready: true },
    { id: 'time-master', title: '9. Time Master', desc: 'Chinh phục đồng hồ và thời gian', icon: '🕐', ready: true },
    { id: 'little-shop', title: '10. Little Shop', desc: 'Mua bán, tính tiền và tiền thừa', icon: '🛒', ready: true },
    { id: 'math-factory', title: '11. Math Factory', desc: 'Phân loại số và phép tính vào đúng máy', icon: '🏭', ready: true },
    { id: 'math-race', title: '12. Math Race', desc: 'Đua xe bằng phản xạ tính toán', icon: '🏎️', ready: true }
];
const MINIGAME_PALETTES = [
    ['bg-rose-50/80','border-rose-300','text-rose-600'], ['bg-sky-50/80','border-sky-300','text-sky-600'],
    ['bg-violet-50/80','border-violet-300','text-violet-600'], ['bg-amber-50/80','border-amber-300','text-amber-600'],
    ['bg-indigo-50/80','border-indigo-300','text-indigo-600'], ['bg-emerald-50/80','border-emerald-300','text-emerald-600'],
    ['bg-fuchsia-50/80','border-fuchsia-300','text-fuchsia-600'], ['bg-orange-50/80','border-orange-300','text-orange-600'],
    ['bg-cyan-50/80','border-cyan-300','text-cyan-600'], ['bg-lime-50/80','border-lime-300','text-lime-700'],
    ['bg-purple-50/80','border-purple-300','text-purple-600'], ['bg-teal-50/80','border-teal-300','text-teal-600']
];
const GAME_SCRIPT_MAP = {
    'sudoku': 'assets/js/games/sudoku.js?v=20260930-wide-numpad-side', 'balance-scale': 'assets/js/games/balance-scale.js?v=20260930-interactive-v2',
    'place-value-factory': 'assets/js/games/place-value-factory.js?v=20260930-v1', 'equal-share-farm': 'assets/js/games/equal-share-farm.js?v=20260930-v1',
    'number-bridge': 'assets/js/games/number-bridge.js?v=20260930-v1', 'number-train': 'assets/js/games/number-train.js?v=20260930-v1',
    'data-detective': 'assets/js/games/data-detective.js?v=20260930-v1', 'shape-builder': 'assets/js/games/shape-builder.js?v=20260930-interactive-v2',
    'time-master': 'assets/js/games/time-master.js?v=20260930-interactive-v2', 'little-shop': 'assets/js/games/little-shop.js?v=20260930-interactive-v2',
    'math-factory': 'assets/js/games/math-factory.js?v=20260930-interactive-v2', 'math-race': 'assets/js/games/math-race.js?v=20260930-interactive-v2'
};
const GAME_START_FN_MAP = {
    'sudoku': 'startSudokuGame', 'balance-scale': 'startBalanceScaleGame',
    'place-value-factory': 'startPlaceValueFactoryGame', 'equal-share-farm': 'startEqualShareFarmGame',
    'number-bridge': 'startNumberBridgeGame', 'number-train': 'startNumberTrainGame',
    'data-detective': 'startDataDetectiveGame', 'shape-builder': 'startShapeBuilderGame',
    'time-master': 'startTimeMasterGame', 'little-shop': 'startLittleShopGame',
    'math-factory': 'startMathFactoryGame', 'math-race': 'startMathRaceGame'
};
const GAME_STOP_FN_MAP = {
    'sudoku': 'stopSudokuGame', 'balance-scale': 'stopBalanceScaleGame',
    'place-value-factory': 'stopPlaceValueFactoryGame', 'equal-share-farm': 'stopEqualShareFarmGame',
    'number-bridge': 'stopNumberBridgeGame', 'number-train': 'stopNumberTrainGame',
    'data-detective': 'stopDataDetectiveGame', 'shape-builder': 'stopShapeBuilderGame',
    'time-master': 'stopTimeMasterGame', 'little-shop': 'stopLittleShopGame',
    'math-factory': 'stopMathFactoryGame', 'math-race': 'stopMathRaceGame'
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
    if (message) showAppNotice(message, { title: 'Xuất sắc!', icon: '⭐', okText: 'Chơi tiếp' });
}
function openMiniGameHub() {
    stopActiveMiniGame_();
    setAppShellRootMode_(true);
    if (!isPremiumUser()) { showPremiumAccessModal('Mini Game'); return; }
    setMainTabActive_('games');
    stopSpeaking(); inMiniGameFlow = true; activeExamContext = null; activeRoadmapContext = null; activeTopicId = null; pendingTopicQuiz = null;
    updateNavTabs(null, null, null);
    const grid = document.getElementById('minigame-grid'); if (!grid) return;
    grid.innerHTML = MINIGAME_LIST.map((g, idx) => { const p = MINIGAME_PALETTES[idx % MINIGAME_PALETTES.length]; return `
        <div onclick="openGamePlay('${g.id}')" class="${p[0]} ${p[1]} border-2 rounded-[26px] p-3.5 md:p-4 min-h-[132px] flex flex-col items-center justify-between text-center cursor-pointer relative shadow-sm pastel-btn group">
            ${!g.ready ? '<span class="absolute top-2 right-2 bg-slate-100 text-slate-500 text-[10px] font-black px-2 py-0.5 rounded-full border border-slate-200">Sắp ra mắt</span>' : '<span class="absolute top-2 right-2 bg-emerald-100 text-emerald-700 text-[10px] font-black px-2 py-0.5 rounded-full border border-emerald-200">Chơi ngay</span>'}
            <div class="text-4xl group-hover:scale-110 transition-transform mt-1">${g.icon}</div><div class="w-full"><h3 class="font-extrabold ${p[2]} text-base leading-tight">${g.title}</h3><p class="text-sm text-gray-700 font-bold mt-1 leading-snug">${g.desc}</p></div>
        </div>`; }).join('');
    switchAppView('view-minigame-hub');
}
function loadGameScript(src) {
    if (loadedGameScripts[src]) return Promise.resolve();
    return new Promise((resolve, reject) => { const script = document.createElement('script'); script.src = src; script.onload = () => { loadedGameScripts[src] = true; resolve(); }; script.onerror = () => reject(new Error(`Không tải được file game: ${src}`)); document.body.appendChild(script); });
}
async function openGamePlay(gameId) {
    setAppShellRootMode_(false);
    if (!isPremiumUser()) { showPremiumAccessModal('Mini Game'); return; }
    stopSpeaking(); inMiniGameFlow = true; const game = MINIGAME_LIST.find(g => g.id === gameId); if (!game) return;
    if (!game.ready) { showAppNotice(`Game "${game.title}" đang được xây dựng. Cô Thỏ Ngọc sẽ mở game này ở bản cập nhật sau nhé!`); return; }
    const title = document.getElementById('game-play-title'); if (title) title.innerHTML = `<span>${game.icon}</span><span class="truncate">${game.title}</span>`;
    updateNavTabs(game.title, '🎮', null); switchAppView('view-game-play');
    const container = document.getElementById('game-play-container'); if (container) container.innerHTML = '<p class="text-center text-gray-400 font-bold py-8"><i class="fa-solid fa-spinner fa-spin mr-1"></i> Đang tải game...</p>';
    try { await loadGameScript(GAME_SCRIPT_MAP[gameId]); } catch (e) { if (container) container.innerHTML = '<p class="text-center text-rose-500 font-bold py-8">Không tải được game, bé thử lại nhé!</p>'; return; }
    const startFnName = GAME_START_FN_MAP[gameId];
    const startFn = startFnName ? window[startFnName] : null;
    if (typeof startFn === 'function') {
        stopActiveMiniGame_();
        activeMiniGameId_ = gameId;
        startFn();
    } else if (container) {
        container.innerHTML = '<p class="text-center text-amber-600 font-bold py-8">Game đã tải nhưng chưa tìm thấy hàm khởi động. Bé thử tải lại trang nhé!</p>';
    }
}

// ============================================================
// TOAN 2 APP SHELL 2026 - banner chinh o root tab, banner phu + breadcrumb khi vao noi dung.
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

// ==========================================
// ĐIỀU HƯỚNG VIEW & BREADCRUMB
// ==========================================
function getActiveMainModuleMeta_() {
    const active = document.querySelector('.main-module-tab.is-active')?.dataset?.tab || 'discover';
    const map = {
        discover:  { label: 'Khám phá',   icon: '🧭', target: 'discover' },
        lessons:   { label: 'Bài học',    icon: '📖', target: 'lessons' },
        exercises: { label: 'Bài tập',    icon: '✏️', target: 'exercises' },
        review:    { label: 'Ôn tập',     icon: '🧠', target: 'review' },
        exams:     { label: 'Đề thi',     icon: '🏆', target: 'exams' },
        games:     { label: 'Mini games', icon: '🎮', target: 'games' }
    };
    return map[active] || map.discover;
}

// Breadcrumb chỉ dùng khi đi sâu vào nội dung.
// Nút đầu tiên luôn bám theo module đang active, tránh bị sót "Khám phá"
// khi người dùng đã chuyển sang Bài học/Bài tập/Đề thi/Mini games.
function updateNavTabs(level2Title, level2Icon, level3Title, level4Title) {
    const tab2 = document.getElementById('header-level2-tab');
    const tab3 = document.getElementById('header-level3-tab');
    const tab4 = document.getElementById('header-level4-tab');
    const homeBtn = document.getElementById('btn-header-home');

    if (!level2Title) {
        if (tab2) { tab2.classList.add('hidden'); tab2.classList.remove('flex'); }
        if (tab3) { tab3.classList.add('hidden'); tab3.classList.remove('flex'); }
        if (tab4) { tab4.classList.add('hidden'); tab4.classList.remove('flex'); }
        if (homeBtn) homeBtn.classList.remove('opacity-80');
        return;
    }

    if (tab2) {
        const t2 = document.getElementById('header-level2-title');
        const i2 = document.getElementById('header-level2-icon');
        const btn2 = tab2.querySelector('button');
        if (t2) t2.textContent = level2Title;
        if (i2) i2.textContent = level2Icon || getActiveMainModuleMeta_().icon;
        if (btn2) btn2.setAttribute('onclick', Number(activeTopicId) === 12 ? 'openMathLab()' : 'returnToTopicLecture()');
        tab2.classList.remove('hidden'); tab2.classList.add('flex');
    }
    if (homeBtn) homeBtn.classList.add('opacity-80', 'hover:opacity-100');

    if (level3Title && tab3) {
        const t3 = document.getElementById('header-level3-title');
        if (t3) t3.textContent = level3Title;
        tab3.classList.remove('hidden'); tab3.classList.add('flex');
    } else if (tab3) { tab3.classList.add('hidden'); tab3.classList.remove('flex'); }

    if (level4Title && tab4) {
        const t4 = document.getElementById('header-level4-title');
        if (t4) t4.textContent = level4Title;
        tab4.classList.remove('hidden'); tab4.classList.add('flex');
    } else if (tab4) { tab4.classList.add('hidden'); tab4.classList.remove('flex'); }
}

function returnToLevel3FromHeader() {
    stopSpeaking();
    if (Number(activeTopicId) === 12) {
        if (mathLabState.trackCode && mathLabCache) return renderMathLabTrack_(mathLabCache);
        return openMathLab();
    }
    if (pendingTopicQuiz) {
        if (Number(pendingTopicQuiz.topicNum) === 1 && pendingTopicQuiz.selectedNumberScope && pendingTopicQuiz.selectedNumberScopePool) {
            return renderExploreNumberActivities(pendingTopicQuiz.selectedNumberScopeLabel, pendingTopicQuiz.selectedNumberScopePool);
        }
        if (Number(pendingTopicQuiz.topicNum) === 2) {
            // Mục 2.1 có thêm tầng chọn 3 level. Khi bấm breadcrumb "2.1",
            // phải quay về đúng màn hình 3 level của 2.1, không nhảy ra màn hình Mục 2.
            if (pendingTopicQuiz.selectedCompareBranch === 'neighbors') {
                const pool = pendingTopicQuiz.neighborLevelPool || getTopic2BranchPool_(pendingTopicQuiz.questions || [], 'neighbors');
                return renderTopic2NeighborLevels_(pool);
            }
            if (pendingTopicQuiz.selectedCompareBranch === 'compare') {
                const pool = pendingTopicQuiz.compareLevelPool || getTopic2BranchPool_(pendingTopicQuiz.questions || [], 'compare');
                return renderTopic2CompareLevels_(pool);
            }
            return renderExploreComparisonBranches(2, pendingTopicQuiz.topicName, pendingTopicQuiz.questions || []);
        }
        const label = document.getElementById('header-level3-title')?.textContent || '';
        const groups = pendingTopicQuiz.groups || [];
        const idx = groups.findIndex((k, i) => {
            const displayLabel = pendingTopicQuiz.groupDisplayLabels?.[k]
                || getExploreSubtopicDisplayLabel_(pendingTopicQuiz.topicNum, i, pendingTopicQuiz.groupLabels?.[k] || k);
            return displayLabel === label || beautifySubtopicName(pendingTopicQuiz.groupLabels?.[k] || k) === label;
        });
        if (idx >= 0) return selectSubtopic(idx);
        return returnToTopicLecture();
    }
    if (activeRoadmapContext) return openRoadmap(activeRoadmapContext.semester || 1);
    return returnToTopicLecture();
}

function returnToLevel4FromHeader() {
    stopSpeaking();
    if (Number(activeTopicId) === 12 && mathLabState.journeyIndex !== null && mathLabCache) {
        return renderMathLabActivity_();
    }
    if (activeRoadmapContext) return openRoadmap(activeRoadmapContext.semester || 1);
    if (Number(pendingTopicQuiz?.topicNum) === 2 && pendingTopicQuiz?.selectedCompareBranch === 'neighbors') {
        const pool = pendingTopicQuiz.neighborLevelPool || getTopic2BranchPool_(pendingTopicQuiz.questions || [], 'neighbors');
        return renderTopic2NeighborLevels_(pool);
    }
    if (Number(pendingTopicQuiz?.topicNum) === 2 && pendingTopicQuiz?.selectedCompareBranch === 'compare') {
        const pool = pendingTopicQuiz.compareLevelPool || getTopic2BranchPool_(pendingTopicQuiz.questions || [], 'compare');
        return renderTopic2CompareLevels_(pool);
    }
    return returnToLevel3FromHeader();
}

function returnToTopicLecture() {
    stopSpeaking();
    clearInterval(quizTimerInterval);
    if (Number(activeTopicId) === 12) {
        return openMathLab();
    }
    if (activeExamContext) {
        openExamHub();
    } else if (activeRoadmapContext) {
        openRoadmap();
    } else if (pendingTopicQuiz) {
        if (Number(pendingTopicQuiz.topicNum) === 1) {
            renderExploreNumberScopes(pendingTopicQuiz.topicNum, pendingTopicQuiz.topicName, pendingTopicQuiz.questions || []);
        } else if (Number(pendingTopicQuiz.topicNum) === 2) {
            renderExploreComparisonBranches(2, pendingTopicQuiz.topicName, pendingTopicQuiz.questions || []);
        } else if (Number(pendingTopicQuiz.topicNum) === 3) {
            // Nhấn breadcrumb cấp Mục lớn "3. Phép cộng và trừ" phải quay về đúng
            // danh sách 6 mục con, không mắc lại ở màn hình chọn Cấp 1/Cấp 2.
            renderExploreSubtopics(pendingTopicQuiz.topicNum, pendingTopicQuiz.topicName, pendingTopicQuiz);
        } else if (pendingTopicQuiz.carryLearningSub) {
            renderCarryLearningModes_(pendingTopicQuiz.carryLearningSub, pendingTopicQuiz.carryLearningLabel, pendingTopicQuiz.carryLearningPool || []);
        } else if (pendingTopicQuiz.selectedExploreGroup) {
            const pool = pendingTopicQuiz.groupMap?.[pendingTopicQuiz.selectedExploreGroup] || [];
            renderExploreLevelsForGroup(pendingTopicQuiz.selectedExploreGroup, pendingTopicQuiz.selectedExploreGroupLabel, pool);
        } else if (pendingTopicQuiz.directLevelPool) {
            renderExploreLevelsForTopic(pendingTopicQuiz.topicNum, pendingTopicQuiz.topicName, pendingTopicQuiz.directLevelPool);
        } else {
            renderExploreSubtopics(pendingTopicQuiz.topicNum, pendingTopicQuiz.topicName, pendingTopicQuiz);
        }
    } else if (inMiniGameFlow) {
        openMiniGameHub();
    }
}

function switchAppView(viewId) {
    stopSpeaking();
    ['view-dashboard-grid', 'view-quiz', 'view-roadmap', 'view-bai-hoc-detail', 'view-minigame-hub', 'view-game-play', 'view-exam-hub', 'view-result'].forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;
        if (id === viewId) el.classList.remove('hidden');
        else el.classList.add('hidden');
    });
}

function setMainTabActive_(tabName) {
    document.querySelectorAll('.main-module-tab').forEach(btn => {
        btn.classList.toggle('is-active', btn.dataset.tab === tabName);
    });
}

function openMainTab(tabName) {
    stopActiveMiniGame_();
    stopSpeaking();
    clearInterval(quizTimerInterval);
    switch (tabName) {
        case 'discover':
            goHome();
            break;
        case 'lessons':
            if (!isPremiumUser()) { showPremiumAccessModal('Bài học'); return; }
            openBaiHocHub(1);
            break;
        case 'exercises':
            openRoadmap(1);
            break;
        case 'review':
            if (!isPremiumUser()) { showPremiumAccessModal('Ôn tập'); return; }
            openReviewHubFromQuestionBank();
            break;
        case 'exams':
            openExamHub();
            break;
        case 'games':
            openMiniGameHub();
            break;
        default:
            goHome();
    }
}

async function openReviewHubFromQuestionBank() {
    setAppShellRootMode_(true);
    stopSpeaking();
    setMainTabActive_('review');
    activeTopicId = 'review'; activeExamContext = null; activeRoadmapContext = null;
    updateNavTabs('Ôn tập', '📚', null);
    showLoadingOverlay('Đang tải nội dung Ôn tập...');
    try {
        const flat = await fetchAllQuestionsFlat();
        const reviewQuestions = flat.filter(q => String(q.sub_topic || '').startsWith('11.'));
        hideLoadingOverlay();
        if (!reviewQuestions.length) throw new Error('Chưa có câu hỏi Ôn tập');
        renderExploreSubtopics('review', 'Ôn tập', { questions: reviewQuestions });
        setMainTabActive_('review');
    } catch (err) {
        hideLoadingOverlay();
        showAppNotice(`Không thể tải Ôn tập: ${err.message}`);
    }
}

function goHome() {
    stopActiveMiniGame_();
    setAppShellRootMode_(true);
    stopSpeaking();
    clearInterval(quizTimerInterval);
    inMiniGameFlow = false;
    activeTopicId = null;
    activeExamContext = null;
    activeRoadmapContext = null;
    pendingTopicQuiz = null;
    mathLabState.view = 'home';
    mathLabState.trackCode = null;
    mathLabState.journeyIndex = null;
    setMainTabActive_('discover');
    updateNavTabs(null, null, null);
    renderDashboardGrid();
    switchAppView('view-dashboard-grid');
}

// ==========================================
// HỆ THỐNG XÁC THỰC TÀI KHOẢN & LỜI CHÀO ĐÓN
// ==========================================
function switchAuthTab(tab) {
    const isLogin = tab === 'login';
    document.getElementById('form-login').classList.toggle('hidden', !isLogin);
    document.getElementById('form-register').classList.toggle('hidden', isLogin);
    document.getElementById('tab-btn-login').className = `py-2.5 rounded-xl font-extrabold text-sm pastel-btn ${isLogin ? 'bg-white text-pink-600 shadow-sm' : 'text-gray-400'}`;
    document.getElementById('tab-btn-register').className = `py-2.5 rounded-xl font-extrabold text-sm pastel-btn ${!isLogin ? 'bg-white text-pink-600 shadow-sm' : 'text-gray-400'}`;
    hideAuthError();
}

function updateMaHSPreview() {
    const lop = document.getElementById('reg-lop').value.trim().toUpperCase();
    const stt = document.getElementById('reg-stt').value.trim();
    document.getElementById('mahs-preview').textContent = (lop && stt) ? `${lop}-${stt.padStart(2, '0')}` : '--';
}

function showAuthError(msg) {
    const el = document.getElementById('auth-error-msg');
    if (!el) return;
    el.textContent = msg;
    el.classList.remove('hidden');
}
function hideAuthError() { 
    const el = document.getElementById('auth-error-msg');
    if (el) el.classList.add('hidden'); 
}

const APPS_SCRIPT_TIMEOUT_MS = 30000;

async function callAppsScript(action, payload, timeoutMs = APPS_SCRIPT_TIMEOUT_MS) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
    try {
        const res = await fetch(APPS_SCRIPT_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
            body: JSON.stringify({ action, payload }),
            cache: 'no-store',
            credentials: 'omit',
            signal: controller.signal
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const rawText = await res.text();
        try {
            return JSON.parse(rawText);
        } catch (e) {
            console.error('[Toan2] Apps Script returned non-JSON:', rawText.slice(0, 300));
            const parseErr = new Error('BACKEND_INVALID_RESPONSE');
            parseErr.code = 'BACKEND_INVALID_RESPONSE';
            throw parseErr;
        }
    } catch (err) {
        if (err && err.name === 'AbortError') {
            const timeoutErr = new Error('REQUEST_TIMEOUT');
            timeoutErr.code = 'REQUEST_TIMEOUT';
            throw timeoutErr;
        }
        throw err;
    } finally {
        clearTimeout(timeoutId);
    }
}

async function doLogin() {
    clearTimeout(sessionRestoreRetryTimer);
    hideAuthError();
    const maHSInput = document.getElementById('login-mahs');
    const maPinInput = document.getElementById('login-mapin');
    const maHS = (maHSInput?.value || '').trim().toUpperCase();
    const maPin = (maPinInput?.value || '').trim();

    if (!maHS || !maPin) {
        const msg = 'Bé nhập đủ mã ID và mã PIN nhé!';
        showAuthError(msg);
        showAppNotice(msg);
        return;
    }

    const btn = document.getElementById('btn-do-login');
    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-1"></i> Đang đăng nhập...';

    try {
        const result = await callAppsScript('login', { maHS, maPin });
        if (!result.ok) {
            const errMsg = result.error || 'Mã ID thẻ học sinh hoặc mã PIN không đúng!';
            showAuthError(errMsg);
            showAppNotice(errMsg);
            return;
        }
        const sessionToken = result.sessionToken || result.token;
        if (!sessionToken) { const e = new Error('SESSION_TOKEN_MISSING'); e.code = 'SESSION_TOKEN_MISSING'; throw e; }
        currentUser = hydrateAccountFields({ ...result.student, isGuest: false, token: sessionToken });
        // Persistent session: client CHỈ lưu token; role/tier luôn lấy từ backend khi login/restoreSession.
        localStorage.setItem('toan2_token', sessionToken);
        localStorage.removeItem('toan2_pending_logout_token');
        enterDashboard();
    } catch (err) {
        console.warn('[Toan2] Login request failed:', err);
        const friendly = 'Hệ thống đang bận một chút. Bé thử lại nhé!';
        showAuthError(friendly);
        // Không bật popup kỹ thuật ở màn đăng nhập; thông báo ngắn ngay dưới form là đủ.
    } finally {
        btn.disabled = false;
        btn.innerHTML = '<i class="fa-solid fa-right-to-bracket mr-1"></i> Đăng nhập';
    }
}

async function doRegister() {
    hideAuthError();
    const hoTen = document.getElementById('reg-hoten').value.trim();
    const ngaySinhRaw = document.getElementById('reg-ngaysinh').value;
    const lop = document.getElementById('reg-lop').value.trim().toUpperCase();
    const soThuTu = document.getElementById('reg-stt').value.trim();
    const maPin = document.getElementById('reg-mapin').value.trim();

    if (!hoTen || !ngaySinhRaw || !lop || !soThuTu || !maPin) {
        const msg = 'Bé điền đủ tất cả các ô có dấu * nhé!';
        showAuthError(msg);
        showAppNotice(msg);
        return;
    }
    if (!/^\d{6}$/.test(maPin)) {
        const msg = 'Mã PIN phải gồm đúng 6 chữ số!';
        showAuthError(msg);
        showAppNotice(msg);
        return;
    }

    const [y, m, d] = ngaySinhRaw.split('-');
    const ngaySinh = `${d}-${m}-${y.slice(2)}`;
    const btn = document.getElementById('btn-do-register');
    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-1"></i> Đang đăng ký...';

    try {
        const result = await callAppsScript('register', { hoTen, ngaySinh, lop, soThuTu, maPin });
        if (!result.ok) {
            showAuthError(result.error);
            showAppNotice(result.error);
            return;
        }
        showAppNotice(`Đã gửi đăng ký thành công, vui lòng chờ Admin duyệt! Mã ID của bé là: ${result.student.maHS}`);
        document.getElementById('login-mahs').value = result.student.maHS;
        switchAuthTab('login');
    } catch (err) {
        console.warn('[Toan2] Register request failed:', err);
        const friendly = 'Hệ thống đang bận một chút. Bé thử lại nhé!';
        showAuthError(friendly);
    } finally {
        btn.disabled = false;
        btn.innerHTML = '<i class="fa-solid fa-user-plus mr-1"></i> Đăng ký ngay';
    }
}

let sessionRestoreRetryTimer = null;
let sessionRestoreInFlight = false;

function showSessionRestorePending(message) {
    // Có token nhưng mạng tạm thời lỗi: GIỮ NGUYÊN token, không chuyển sang Khách và không tự đăng xuất.
    // Vì client không được phép tin role/tier lưu cục bộ, app chờ backend xác thực lại rồi mới vào dashboard.
    document.getElementById('screen-dashboard')?.classList.add('hidden');
    document.getElementById('screen-login')?.classList.remove('hidden');
    showAuthError(message || 'Hệ thống đang kết nối lại. Bé chờ một chút nhé!');
}

function scheduleSessionRestoreRetry(delayMs = 5000) {
    clearTimeout(sessionRestoreRetryTimer);
    sessionRestoreRetryTimer = setTimeout(() => tryAutoLogin(true), delayMs);
}

async function tryAutoLogin(isRetry = false) {
    // Client chỉ lưu SESSION TOKEN. Tuyệt đối không lưu PIN/mật khẩu hay object quyền Admin/Trial/VIP.
    localStorage.removeItem('tv1_mahs');
    localStorage.removeItem('tv1_mapin');
    localStorage.removeItem('toan2_current_user');

    const token = localStorage.getItem('toan2_token');
    if (!token) {
        clearTimeout(sessionRestoreRetryTimer);
        handleGuestMode(true);
        return;
    }
    if (sessionRestoreInFlight) return;
    sessionRestoreInFlight = true;

    try {
        const res = await callAppsScript('restoreSession', { token });

        // Nếu trong lúc request đang chạy người dùng đã đăng nhập và nhận token mới,
        // tuyệt đối bỏ qua phản hồi của token cũ để không xóa nhầm phiên vừa đăng nhập.
        if (localStorage.getItem('toan2_token') !== token) return;

        if (res.ok && res.student) {
            clearTimeout(sessionRestoreRetryTimer);
            hideAuthError();
            currentUser = hydrateAccountFields({ ...res.student, isGuest: false, token });
            enterDashboard(true);
            return;
        }

        // Backend đã trả lời rõ token không còn hợp lệ (ví dụ token bị thu hồi/tài khoản bị xóa).
        // Chỉ trường hợp xác thực thất bại rõ ràng này mới bỏ token; lỗi mạng KHÔNG đi vào nhánh này.
        if (res && (res.code === 'SESSION_INVALID' || res.code === 'ACCOUNT_NOT_FOUND')) {
            localStorage.removeItem('toan2_token');
            currentUser = null;
            document.getElementById('screen-dashboard')?.classList.add('hidden');
            document.getElementById('screen-login')?.classList.remove('hidden');
            showAuthError('Phiên đăng nhập không còn hợp lệ. Bé đăng nhập lại nhé!');
            return;
        }

        showSessionRestorePending('Hệ thống đang kết nối lại. Bé chờ một chút nhé!');
        scheduleSessionRestoreRetry();
    } catch (err) {
        // Nếu token đã được thay bằng phiên đăng nhập mới, request cũ không được phép can thiệp UI/session.
        if (localStorage.getItem('toan2_token') !== token) return;

        // Lỗi mạng/HTTP tạm thời: giữ token, giữ trạng thái "đang chờ restore", tuyệt đối không về Khách.
        showSessionRestorePending('Mạng đang gián đoạn hoặc máy chủ phản hồi chậm. Phiên đăng nhập vẫn được giữ; app sẽ tự kết nối lại.');
        scheduleSessionRestoreRetry(isRetry ? 7000 : 5000);
    } finally {
        sessionRestoreInFlight = false;
    }
}

async function flushPendingLogout() {
    const pendingToken = localStorage.getItem('toan2_pending_logout_token');
    if (!pendingToken) return;

    // Trạng thái localStorage bất thường không được phép thu hồi token đang hoạt động.
    const activeToken = localStorage.getItem('toan2_token');
    if (activeToken && pendingToken === activeToken) {
        localStorage.removeItem('toan2_pending_logout_token');
        return;
    }

    try {
        const res = await callAppsScript('logout', { token: pendingToken });
        if (res?.ok) localStorage.removeItem('toan2_pending_logout_token');
    } catch (e) {
        // Giữ token thu hồi chờ lần có mạng tiếp theo; KHÔNG dùng token này để restore session.
    }
}

async function logout() {
    stopSpeaking();
    clearTimeout(sessionRestoreRetryTimer);
    clearInterval(adminRegistrationPollTimer);
    adminRegistrationPollTimer = null;
    adminNewRegistrationCount = 0;
    const tokenToRevoke = currentUser?.token || localStorage.getItem('toan2_token');

    // Người dùng đã chủ động bấm Đăng xuất: xóa token phiên hoạt động trên client ngay lập tức.
    localStorage.removeItem('toan2_token');
    if (tokenToRevoke) localStorage.setItem('toan2_pending_logout_token', tokenToRevoke);

    currentUser = { name: "Khách (Guest)", isGuest: true, tuanHienTai: 1, hoTen: "Bé Khách", lop: "", maHS: "KHACH" };
    enterDashboard(true);

    // Thu hồi token trên backend. Nếu đang mất mạng, flushPendingLogout() sẽ thử lại khi app chạy lần sau.
    await flushPendingLogout();
}

function handleGuestMode(isSilent = false) {
    currentUser = { name: "Khách (Guest)", isGuest: true, tuanHienTai: 1, hoTen: "Bé Khách", lop: "", maHS: "KHACH" };
    enterDashboard(isSilent);
}

function enterDashboard(isSilent = false) {
    document.getElementById('screen-login').classList.add('hidden');
    document.getElementById('screen-dashboard').classList.remove('hidden');
    updateUserInfoBox();
    refreshAccessUI();
    resetStars();
    renderDashboardGrid();
    renderExamHubGrid();
    goHome();
    startAdminRegistrationPolling();

    // Phát ngẫu nhiên lời chào sư phạm (Không nhạc)
    if (!isSilent) {
        setTimeout(() => {
            if (currentUser && !currentUser.isGuest) {
                const template = GREETINGS_STUDENT[Math.floor(Math.random() * GREETINGS_STUDENT.length)];
                const msg = template.replace('{name}', currentUser.hoTen);
                speakVietnamese(msg, 0.96);
            } else {
                const msg = GREETINGS_GUEST[Math.floor(Math.random() * GREETINGS_GUEST.length)];
                speakVietnamese(msg, 0.96);
            }
        }, 450);
    }
}

let adminNewRegistrationCount = 0;
let adminRegistrationPollTimer = null;

function renderAdminRegistrationBadge() {
    const badge = document.getElementById('admin-new-registration-badge');
    if (!badge) return;
    const count = Math.max(0, Number(adminNewRegistrationCount) || 0);
    badge.textContent = count > 99 ? '99+' : String(count);
    badge.classList.toggle('hidden', count <= 0);
}

async function refreshAdminRegistrationBadge() {
    if (!isAdminUser() || !currentUser?.token) return;
    try {
        const res = await callAppsScript('getNewRegistrationsCount', { token: currentUser.token });
        if (!res?.ok) return;
        adminNewRegistrationCount = Number(res.count) || 0;
        renderAdminRegistrationBadge();
    } catch (e) {
        // Badge là thông tin phụ, không làm gián đoạn ứng dụng khi mạng tạm thời lỗi.
    }
}

function startAdminRegistrationPolling() {
    clearInterval(adminRegistrationPollTimer);
    adminRegistrationPollTimer = null;
    if (!isAdminUser()) {
        adminNewRegistrationCount = 0;
        return;
    }
    refreshAdminRegistrationBadge();
    adminRegistrationPollTimer = setInterval(refreshAdminRegistrationBadge, 15000);
}

async function markAdminRegistrationsSeen() {
    if (!isAdminUser() || !currentUser?.token) return;
    try {
        const res = await callAppsScript('markRegistrationsSeen', { token: currentUser.token });
        if (res?.ok) {
            adminNewRegistrationCount = 0;
            renderAdminRegistrationBadge();
        }
    } catch (e) {}
}

window.addEventListener('focus', () => { if (isAdminUser()) refreshAdminRegistrationBadge(); });
document.addEventListener('visibilitychange', () => { if (!document.hidden && isAdminUser()) refreshAdminRegistrationBadge(); });

function updateUserInfoBox() {
    const box = document.getElementById('user-info-box');
    if (!box) return;
    if (currentUser && !currentUser.isGuest) {
        const adminBtn = isAdminUser()
            ? `<button onclick="openAdminAccountManager()" class="relative h-8 px-3 flex items-center justify-center gap-1 bg-amber-100 hover:bg-amber-200 text-amber-700 rounded-xl border border-amber-200 text-sm md:text-base font-black"><i class="fa-solid fa-users-gear"></i><span class="admin-manage-label">Quản lý</span><span id="admin-new-registration-badge" class="hidden absolute -top-2 -right-2 min-w-[19px] h-[19px] px-1 rounded-full bg-rose-500 text-white text-[10px] leading-[19px] text-center font-black border-2 border-white shadow-md">0</span></button>`
            : '';
        box.innerHTML = `
            <div class="flex items-center space-x-2">
                <div class="text-right">
                    <div class="text-pink-600 font-extrabold text-xs md:text-sm leading-tight">${escapeHtml(currentUser.hoTen || '')}</div>
                    <div class="text-gray-500 font-semibold text-[10px]">${escapeHtml(formatAccountTierLabel())} · ID: ${escapeHtml(currentUser.maHS || '')}</div>
                </div>
                ${adminBtn}
                <button onclick="logout()" title="Đăng xuất" class="w-8 h-8 flex items-center justify-center bg-rose-100 hover:bg-rose-200 text-rose-500 rounded-xl border border-rose-200 text-xs"><i class="fa-solid fa-right-from-bracket"></i></button>
            </div>`;
    } else {
        box.innerHTML = `
            <div class="flex items-center gap-1.5">
                <span class="text-amber-600 font-black text-xs mr-1">Khách</span>
                <button onclick="openAuthFromGuest('login')" class="px-3 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-sm md:text-base font-black">Sign in</button>
                <button onclick="openAuthFromGuest('register')" class="px-3 py-2 bg-white text-purple-600 border border-purple-200 rounded-xl text-sm md:text-base font-black">Sign up</button>
            </div>`;
    }
}

async function openAdminAccountManager() {
    if (!isAdminUser()) return;
    let modal = document.getElementById('admin-account-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'admin-account-modal';
        modal.className = 'hidden fixed inset-0 z-[80] bg-slate-900/55 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4';
        modal.innerHTML = `
          <div class="w-full max-w-6xl max-h-[94vh] bg-white rounded-3xl border-2 border-fuchsia-100 shadow-2xl overflow-hidden flex flex-col">
            <div class="px-5 py-4 bg-fuchsia-50/70 border-b border-fuchsia-100 flex items-start justify-between gap-3">
              <div><h3 class="text-lg font-black text-fuchsia-700">👥 Quản lý tài khoản <span id="admin-account-count" class="ml-1 px-2 py-1 rounded-full bg-white border border-fuchsia-200 text-xs">0 tài khoản</span></h3><p class="text-xs font-bold text-slate-500 mt-1">Chuyển hạng tài khoản Regular / Trial / VIP. Trial có hạn 1 tháng, VIP có hạn 1 năm.</p></div>
              <button onclick="closeAdminAccountManager()" class="w-8 h-8 rounded-xl bg-white border border-fuchsia-200 text-fuchsia-500"><i class="fa-solid fa-xmark"></i></button>
            </div>
            <div class="p-4 border-b border-slate-100"><input id="admin-account-search" oninput="filterAdminAccountRows()" placeholder="Tìm theo ID, họ tên, lớp hoặc loại tài khoản..." class="w-full px-4 py-2.5 rounded-xl border-2 border-fuchsia-100 focus:border-fuchsia-300 outline-none text-sm font-bold"></div>
            <div class="overflow-auto flex-1 p-3"><table class="w-full text-sm"><thead class="sticky top-0 bg-fuchsia-50 text-fuchsia-700"><tr><th class="p-3 text-left">Mã HS</th><th class="p-3 text-left">Họ tên</th><th class="p-3">Lớp</th><th class="p-3">Loại tài khoản</th><th class="p-3">Hạn dùng thử</th><th class="p-3">Hạn VIP</th></tr></thead><tbody id="admin-account-body"></tbody></table></div>
            <div class="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3 text-[11px] font-bold text-slate-500"><span>Regular: miễn phí • Trial: Premium 1 tháng • VIP: Premium 1 năm.</span><button onclick="loadAdminAccounts()" class="px-4 py-2 rounded-xl bg-white border border-fuchsia-200 text-fuchsia-600 font-black">⟳ Làm mới</button></div>
          </div>`;
        document.body.appendChild(modal);
    }
    modal.classList.remove('hidden');
    await loadAdminAccounts();
    await markAdminRegistrationsSeen();
}

function closeAdminAccountManager() { document.getElementById('admin-account-modal')?.classList.add('hidden'); }
let adminAccountCache = [];
async function loadAdminAccounts() {
    const body = document.getElementById('admin-account-body');
    if (body) body.innerHTML = '<tr><td colspan="6" class="p-6 text-center text-slate-400 font-bold">Đang tải...</td></tr>';
    try {
        const res = await callAppsScript('adminListAccounts', { token: currentUser?.token });
        if (!res?.ok) throw new Error(res?.error || 'Không tải được danh sách tài khoản');
        adminAccountCache = res.accounts || res.students || res.data || [];
        renderAdminAccounts(adminAccountCache);
    } catch (err) {
        if (body) body.innerHTML = `<tr><td colspan="6" class="p-6 text-center text-rose-500 font-bold">${escapeHtml(err.message)}</td></tr>`;
    }
}
let adminSortState = { key: 'maHS', dir: 'asc' };

function normalizeAdminSortValue(row, key) {
    if (key === 'maHS') return String(row.maHS ?? row.MaHS ?? '').toLowerCase();
    if (key === 'hoTen') return String(row.hoTen ?? row.HoTen ?? '').toLowerCase();
    if (key === 'lop') return String(row.lop ?? row.Lop ?? '').toLowerCase();
    if (key === 'loaiTaiKhoan') return String(row.loaiTaiKhoan ?? row.LoaiTaiKhoan ?? 'regular').toLowerCase();
    if (key === 'hanDungThu') return String(row.hanDungThu ?? row.HanDungThu ?? '');
    if (key === 'hanVIP') return String(row.hanVIP ?? row.HanVIP ?? '');
    return '';
}

function sortAdminAccounts(key) {
    if (adminSortState.key === key) adminSortState.dir = adminSortState.dir === 'asc' ? 'desc' : 'asc';
    else adminSortState = { key, dir: 'asc' };
    renderAdminAccounts(adminAccountCache);
}

function adminSortIcon(key) {
    if (adminSortState.key !== key) return '<i class="fa-solid fa-sort ml-1 text-fuchsia-200"></i>';
    return adminSortState.dir === 'asc'
        ? '<i class="fa-solid fa-sort-up ml-1 text-fuchsia-500"></i>'
        : '<i class="fa-solid fa-sort-down ml-1 text-fuchsia-500"></i>';
}

function getTierSelectClass(tier) {
    if (tier === 'vip') return 'border-purple-300 text-purple-700 bg-purple-50';
    if (tier === 'trial') return 'border-amber-300 text-amber-700 bg-amber-50';
    return 'border-slate-300 text-slate-600 bg-slate-50';
}

function updateTierSelectStyle(selectEl) {
    if (!selectEl) return;
    selectEl.classList.remove('border-purple-300','text-purple-700','bg-purple-50','border-amber-300','text-amber-700','bg-amber-50','border-slate-300','text-slate-600','bg-slate-50');
    getTierSelectClass(selectEl.value).split(' ').forEach(c => selectEl.classList.add(c));
}

function renderAdminAccounts(rows) {
    const body = document.getElementById('admin-account-body');
    if (!body) return;
    document.getElementById('admin-account-count').textContent = `${rows.length} tài khoản`;

    const head = document.querySelector('#admin-account-modal thead tr');
    if (head) {
        head.innerHTML = `
            <th onclick="sortAdminAccounts('maHS')" class="p-3 text-left cursor-pointer select-none">Mã HS ${adminSortIcon('maHS')}</th>
            <th onclick="sortAdminAccounts('hoTen')" class="p-3 text-left cursor-pointer select-none">Họ tên ${adminSortIcon('hoTen')}</th>
            <th onclick="sortAdminAccounts('lop')" class="p-3 text-center cursor-pointer select-none">Lớp ${adminSortIcon('lop')}</th>
            <th onclick="sortAdminAccounts('loaiTaiKhoan')" class="p-3 text-center cursor-pointer select-none">Loại tài khoản ${adminSortIcon('loaiTaiKhoan')}</th>
            <th onclick="sortAdminAccounts('hanDungThu')" class="p-3 text-center cursor-pointer select-none">Hạn dùng thử ${adminSortIcon('hanDungThu')}</th>
            <th onclick="sortAdminAccounts('hanVIP')" class="p-3 text-center cursor-pointer select-none">Hạn VIP ${adminSortIcon('hanVIP')}</th>`;
    }

    const sortedRows = [...rows].sort((a, b) => {
        const av = normalizeAdminSortValue(a, adminSortState.key);
        const bv = normalizeAdminSortValue(b, adminSortState.key);
        const cmp = av.localeCompare(bv, 'vi', { numeric: true, sensitivity: 'base' });
        return adminSortState.dir === 'asc' ? cmp : -cmp;
    });

    body.innerHTML = sortedRows.map(r => {
        const id = r.maHS ?? r.MaHS ?? '';
        const name = r.hoTen ?? r.HoTen ?? '';
        const lop = r.lop ?? r.Lop ?? '';
        const tierRaw = String(r.loaiTaiKhoan ?? r.LoaiTaiKhoan ?? 'regular').toLowerCase();
        const tier = ['regular','trial','vip'].includes(tierRaw) ? tierRaw : 'regular';
        const trial = r.hanDungThu ?? r.HanDungThu ?? '—';
        const vip = r.hanVIP ?? r.HanVIP ?? '—';
        return `<tr class="border-b border-slate-100 admin-account-row" data-search="${escapeHtml(`${id} ${name} ${lop} ${tier}`.toLowerCase())}"><td class="p-3 font-black text-slate-700">${escapeHtml(id)}</td><td class="p-3 font-bold text-slate-700">${escapeHtml(name)}</td><td class="p-3 text-center font-bold">${escapeHtml(lop)}</td><td class="p-3 text-center"><select onchange="updateTierSelectStyle(this); changeAdminAccountType('${String(id).replace(/'/g,"\\'")}', this.value, this)" class="min-w-[102px] px-3 py-2 rounded-xl border-2 font-black text-center ${getTierSelectClass(tier)}"><option class="text-slate-600" value="regular" ${tier==='regular'?'selected':''}>Regular</option><option class="text-amber-700" value="trial" ${tier==='trial'?'selected':''}>Trial</option><option class="text-purple-700" value="vip" ${tier==='vip'?'selected':''}>VIP</option></select></td><td class="p-3 text-center font-bold text-slate-500">${escapeHtml(trial || '—')}</td><td class="p-3 text-center font-bold text-purple-600">${escapeHtml(vip || '—')}</td></tr>`;
    }).join('') || '<tr><td colspan="6" class="p-6 text-center text-slate-400">Chưa có tài khoản học sinh.</td></tr>';
}

function filterAdminAccountRows() {
    const q = (document.getElementById('admin-account-search')?.value || '').trim().toLowerCase();
    document.querySelectorAll('.admin-account-row').forEach(tr => tr.classList.toggle('hidden', q && !tr.dataset.search.includes(q)));
}
async function changeAdminAccountType(maHS, loaiTaiKhoan, selectEl) {
    selectEl.disabled = true;
    try {
        const res = await callAppsScript('adminSetAccountType', { token: currentUser?.token, maHS, loaiTaiKhoan });
        if (!res?.ok) throw new Error(res?.error || 'Không cập nhật được tài khoản');
        await loadAdminAccounts();
    } catch (err) { showAppNotice(err.message); await loadAdminAccounts(); }
    finally { selectEl.disabled = false; }
}

function resetStars() {
    starGreenCount = 0; starRedCount = 0;
    const greenEl = document.getElementById('star-green-count');
    const redEl = document.getElementById('star-red-count');
    if (greenEl) greenEl.textContent = 0;
    if (redEl) redEl.textContent = 0;
}

function clickProgressOrExam(type) {
    if (type === 'progress') return ensurePremiumAccess('Bài tập', () => openRoadmap());
    if (type === 'exam') return ensurePremiumAccess('Đấu trường đề thi', () => openExamHub());
}

// ==========================================
// CHỦ ĐỀ 1: BẢNG CHỮ CÁI TƯƠNG TÁC (1.1 ĐẾN 1.4)
// ==========================================
function openTopic(topicNum, topicName, icon) {
    setAppShellRootMode_(false);
    stopSpeaking();
    if (Number(topicNum) === 12) return openMathLab();
    setMainTabActive_('discover');
    if (PREMIUM_TOPIC_IDS.has(Number(topicNum)) && !isPremiumUser()) {
        showPremiumAccessModal(topicName || 'Nội dung Premium');
        return;
    }
    activeTopicId = topicNum; activeExamContext = null; activeRoadmapContext = null;
    updateNavTabs(topicName, icon || '🐰', null);

    showLoadingOverlay(`Đang tải chủ đề "${topicName}"...`);
    fetchAllTopicsData().then(topics => {
        hideLoadingOverlay();
        const topicObj = topics.find(t => Number(t.topic_id) === Number(topicNum));
        if (!topicObj || !topicObj.questions || !topicObj.questions.length) throw new Error("Chủ đề không có câu hỏi nào");
        if (Number(topicNum) === 1) {
            // Cấu tạo số: chọn phạm vi trước, sau đó vào các hoạt động phù hợp từng phạm vi.
            renderExploreNumberScopes(Number(topicNum), topicName, topicObj.questions);
        } else if (Number(topicNum) === 2) {
            // Mục 2 dùng 4 nhánh: liền trước/sau, so sánh, sắp xếp dãy số, dãy số quy luật.
            renderExploreComparisonBranches(Number(topicNum), topicName, topicObj.questions);
        } else {
            renderExploreSubtopics(topicNum, topicName, topicObj);
        }
    }).catch(err => {
        hideLoadingOverlay();
        // Tải lỗi thì đưa header về đúng trạng thái trang chủ (không để lại tab/gạch breadcrumb thừa)
        activeTopicId = null;
        updateNavTabs(null, null, null);
        showAppNotice(`Không thể tải chủ đề: ${err.message}`);
    });
}


const EXPLORE_COMPARE_BRANCHES = [
    {
        key: 'neighbors',
        label: '2.1 Số liền trước, số liền sau',
        icon: '🚂',
        desc: 'Nhận biết số đứng ngay trước, ngay sau và các số liên tiếp.',
        types: ['number_line_neighbor']
    },
    {
        key: 'compare',
        label: '2.2 Phép so sánh',
        icon: '⚖️',
        desc: 'Tách riêng so sánh số có 2 chữ số và 3 chữ số; có câu suy luận phù hợp từng mức.',
        types: ['compare_pair']
    },
    {
        key: 'order',
        label: '2.3 Sắp xếp dãy số',
        icon: '🧩',
        desc: 'Sắp xếp các số theo thứ tự từ bé đến lớn hoặc từ lớn đến bé.',
        types: ['order_numbers', 'between_number', 'range_reasoning']
    },
    {
        key: 'pattern',
        label: '2.4 Điền theo quy luật',
        icon: '🔗',
        desc: 'Khởi động với dãy số tăng/giảm đều và dãy emoji lặp lại.',
        types: ['sequence_missing']
    }
];

function getTopic2BranchPool_(pool, key) {
    const branchMap = { neighbors: '2.1', compare: '2.2', order: '2.3', pattern: '2.4' };
    const branchId = branchMap[key] || '';
    if (!branchId) return [];
    // Kiến trúc mới hoàn toàn data-driven: mỗi câu trong JSON tự khai báo explore_branch.
    // Không còn sinh câu, không còn tách 100/1000 bằng logic trong JS.
    return (pool || []).filter(q => String(q.explore_branch || '').trim() === branchId);
}

function renderExploreComparisonBranches(topicNum, topicName, pool) {
    const allPool = Array.isArray(pool) ? pool : [];
    pendingTopicQuiz = {
        topicNum,
        topicName,
        questions: allPool,
        selectedCompareBranch: null,
        selectedCompareBranchLabel: null
    };

    const container = document.getElementById('view-dashboard-grid');
    if (!container) return;
    container.className = 'w-full grid grid-cols-1 sm:grid-cols-2 gap-2.5';

    container.innerHTML = EXPLORE_COMPARE_BRANCHES.map((item, idx) => {
        const palette = SUBTOPIC_PALETTES[idx % SUBTOPIC_PALETTES.length];
        const count = getTopic2BranchPool_(allPool, item.key).length;
        return `
            <button onclick="selectExploreComparisonBranch('${item.key}')" class="p-4 ${palette.card} border-2 rounded-2xl text-left shadow-sm pastel-btn min-h-[118px] flex flex-col justify-between">
                <div class="flex items-start justify-between gap-3">
                    <span class="text-lg md:text-xl font-black leading-snug"><span class="mr-2">${item.icon}</span>${escapeHtml(item.label)}</span>
                    <span class="text-xs font-extrabold ${palette.badge} px-2.5 py-0.5 rounded-full border shrink-0">${count} câu</span>
                </div>
                <span class="mt-2 text-xs md:text-sm font-bold text-slate-500 leading-snug">${escapeHtml(item.desc)}</span>
            </button>`;
    }).join('');

    updateNavTabs(topicName, TOPICS_CONFIG.find(t => t.id === topicNum)?.icon || '🔢', null);
    switchAppView('view-dashboard-grid');
}

const TOPIC2_NEIGHBOR_LEVELS = {
    1: { icon: '🚂', title: 'Cấp 1 · Tia số trực quan', desc: 'Nhìn tia số, nhận biết liền trước/liền sau; làm đúng sẽ thấy ngay quy tắc −1 hoặc +1.' },
    2: { icon: '🧩', title: 'Cấp 2 · Suy luận 2 bước', desc: 'Tìm số gốc từ một đặc điểm, rồi xác định số liền trước hoặc liền sau.' },
    3: { icon: '🧠', title: 'Cấp 3 · Suy luận 3 bước', desc: 'Kết hợp hai điều kiện để tìm số gốc, rồi mới xác định số liền trước hoặc liền sau.' }
};

function renderTopic2NeighborLevels_(pool) {
    if (!pendingTopicQuiz) return;
    const sourcePool = Array.isArray(pool) ? pool : [];
    pendingTopicQuiz.neighborLevelPool = sourcePool;
    pendingTopicQuiz.selectedNeighborLevel = null;

    const container = document.getElementById('view-dashboard-grid');
    if (!container) return;
    container.className = 'w-full grid grid-cols-1 sm:grid-cols-3 gap-2.5';
    container.innerHTML = [1,2,3].map((level, idx) => {
        const meta = TOPIC2_NEIGHBOR_LEVELS[level];
        const palette = SUBTOPIC_PALETTES[idx % SUBTOPIC_PALETTES.length];
        const count = sourcePool.filter(q => Number(q.explore_level) === level).length;
        return `
            <button onclick="selectTopic2NeighborLevel_(${level})" class="p-4 ${palette.card} border-2 rounded-2xl text-left shadow-sm pastel-btn min-h-[126px] flex flex-col justify-between ${count ? '' : 'opacity-50 cursor-not-allowed'}" ${count ? '' : 'disabled'}>
                <div class="flex items-start justify-between gap-3">
                    <span class="text-base md:text-lg font-black leading-snug"><span class="mr-2">${meta.icon}</span>${escapeHtml(meta.title)}</span>
                    <span class="text-xs font-extrabold ${palette.badge} px-2.5 py-0.5 rounded-full border shrink-0">${count} câu</span>
                </div>
                <span class="mt-2 text-xs md:text-sm font-bold text-slate-500 leading-snug">${escapeHtml(meta.desc)}</span>
            </button>`;
    }).join('');

    const { topicNum, topicName } = pendingTopicQuiz;
    updateNavTabs(topicName, TOPICS_CONFIG.find(t => t.id === topicNum)?.icon || '🔢', '2.1 Số liền trước, số liền sau');
    switchAppView('view-dashboard-grid');
}

function selectTopic2NeighborLevel_(level) {
    stopSpeaking();
    if (!pendingTopicQuiz) return;
    const sourcePool = pendingTopicQuiz.neighborLevelPool || getTopic2BranchPool_(pendingTopicQuiz.questions || [], 'neighbors');
    const pool = sourcePool.filter(q => Number(q.explore_level) === Number(level));
    if (!pool.length) return showAppNotice('Cấp này đang được cập nhật thêm câu hỏi nhé bé!');

    pendingTopicQuiz.selectedNeighborLevel = Number(level);
    practiceCycleRawPool = [...pool];
    const firstCycleQuestions = shuffleArray([...pool]);
    const meta = TOPIC2_NEIGHBOR_LEVELS[level];
    const { topicNum, topicName } = pendingTopicQuiz;
    updateNavTabs(topicName, TOPICS_CONFIG.find(t => t.id === topicNum)?.icon || '🔢', '2.1 Số liền trước, số liền sau', meta.title);
    startTopicQuiz(topicNum, `${topicName} - 2.1 - ${meta.title}`, firstCycleQuestions, `topic2-neighbors-l${level}`);
}


const TOPIC2_COMPARE_LEVELS = {
    1: {
        icon: '🔢',
        title: '2 chữ số · So sánh & suy luận',
        desc: 'So sánh số có 2 chữ số; xen câu suy luận để bé phải xác định số trước khi chọn dấu.'
    },
    2: {
        icon: '💯',
        title: '3 chữ số · So sánh',
        desc: 'Luyện điền < hoặc > với số có 3 chữ số; xen một số câu suy luận để tránh làm máy móc.'
    }
};

function renderTopic2CompareLevels_(pool) {
    if (!pendingTopicQuiz) return;
    const sourcePool = Array.isArray(pool) ? pool : [];
    pendingTopicQuiz.compareLevelPool = sourcePool;
    pendingTopicQuiz.selectedCompareLevel = null;

    const container = document.getElementById('view-dashboard-grid');
    if (!container) return;
    container.className = 'w-full grid grid-cols-1 sm:grid-cols-2 gap-2.5';
    container.innerHTML = [1,2].map((level, idx) => {
        const meta = TOPIC2_COMPARE_LEVELS[level];
        const palette = SUBTOPIC_PALETTES[idx % SUBTOPIC_PALETTES.length];
        const count = sourcePool.filter(q => Number(q.explore_level) === level).length;
        return `
            <button onclick="selectTopic2CompareLevel_(${level})" class="p-4 ${palette.card} border-2 rounded-2xl text-left shadow-sm pastel-btn min-h-[126px] flex flex-col justify-between ${count ? '' : 'opacity-50 cursor-not-allowed'}" ${count ? '' : 'disabled'}>
                <div class="flex items-start justify-between gap-3">
                    <span class="text-base md:text-lg font-black leading-snug"><span class="mr-2">${meta.icon}</span>${escapeHtml(meta.title)}</span>
                    <span class="text-xs font-extrabold ${palette.badge} px-2.5 py-0.5 rounded-full border shrink-0">${count} câu</span>
                </div>
                <span class="mt-2 text-xs md:text-sm font-bold text-slate-500 leading-snug">${escapeHtml(meta.desc)}</span>
            </button>`;
    }).join('');

    const { topicNum, topicName } = pendingTopicQuiz;
    updateNavTabs(topicName, TOPICS_CONFIG.find(t => t.id === topicNum)?.icon || '🔢', '2.2 Phép so sánh');
    switchAppView('view-dashboard-grid');
}

function selectTopic2CompareLevel_(level) {
    stopSpeaking();
    if (!pendingTopicQuiz) return;
    const sourcePool = pendingTopicQuiz.compareLevelPool || getTopic2BranchPool_(pendingTopicQuiz.questions || [], 'compare');
    const pool = sourcePool.filter(q => Number(q.explore_level) === Number(level));
    if (!pool.length) return showAppNotice('Mục này đang được cập nhật thêm câu hỏi nhé bé!');

    pendingTopicQuiz.selectedCompareLevel = Number(level);
    practiceCycleRawPool = [...pool];
    const firstCycleQuestions = shuffleArray([...pool]);
    const meta = TOPIC2_COMPARE_LEVELS[level];
    const { topicNum, topicName } = pendingTopicQuiz;
    updateNavTabs(topicName, TOPICS_CONFIG.find(t => t.id === topicNum)?.icon || '🔢', '2.2 Phép so sánh', meta.title);
    startTopicQuiz(topicNum, `${topicName} - 2.2 - ${meta.title}`, firstCycleQuestions, `topic2-compare-l${level}`);
}

function selectExploreComparisonBranch(key) {
    stopSpeaking();
    if (!pendingTopicQuiz) return;
    const meta = EXPLORE_COMPARE_BRANCHES.find(x => x.key === key);
    if (!meta) return;

    const pool = getTopic2BranchPool_(pendingTopicQuiz.questions || [], key);
    if (!pool.length) return showAppNotice('Mục này đang được cập nhật thêm câu hỏi nhé bé!');

    pendingTopicQuiz.selectedCompareBranch = key;
    pendingTopicQuiz.selectedCompareBranchLabel = meta.label;

    if (key === 'neighbors') {
        return renderTopic2NeighborLevels_(pool);
    }
    if (key === 'compare') {
        return renderTopic2CompareLevels_(pool);
    }

    practiceCycleRawPool = [...pool];
    const firstCycleQuestions = shuffleArray([...pool]);
    const { topicNum, topicName } = pendingTopicQuiz;
    updateNavTabs(topicName, TOPICS_CONFIG.find(t => t.id === topicNum)?.icon || '🔢', meta.label);
    startTopicQuiz(topicNum, `${topicName} - ${meta.label}`, firstCycleQuestions, `topic2-${key}`);
}

function renderExploreSubtopics(topicNum, topicName, topicObj) {
    const sourceQuestions = topicObj?.questions || pendingTopicQuiz?.questions || [];
    // Mục 2 đã có kiến trúc 4 nhánh riêng. Chặn tuyệt đối luồng cũ
    // (gom 1.2/1.4 thành các thẻ phạm vi) để không thể xuất hiện lại.
    if (Number(topicNum) === 2) {
        return renderExploreComparisonBranches(Number(topicNum), topicName, sourceQuestions);
    }
    pendingTopicQuiz = { topicNum, topicName, questions: sourceQuestions };

    const groups = [], groupMap = {}, groupLabels = {};
    sourceQuestions.forEach(q => {
        const k = (q.sub_topic || 'Câu hỏi chung').trim();
        if (!groupMap[k]) {
            groups.push(k);
            groupMap[k] = [];
            groupLabels[k] = q.sub_topic_label || k;
        }
        groupMap[k].push(q);
    });
    // Mục 3 · Phép cộng và trừ: cho "Tên gọi thành phần phép cộng và phép trừ" lên đầu.
    // Dữ liệu gốc vẫn giữ sub_code 2.6 để không làm vỡ roadmap/bài tập cũ; chỉ đổi thứ tự hiển thị Khám phá.
    if (Number(topicNum) === 3) {
        const preferredOrder = ['2.6', '2.1', '2.2', '2.3', '2.4', '2.5'];
        groups.sort((a, b) => {
            const ai = preferredOrder.indexOf(String(a));
            const bi = preferredOrder.indexOf(String(b));
            const ar = ai === -1 ? 999 : ai;
            const br = bi === -1 ? 999 : bi;
            return ar - br;
        });
    }

    const groupDisplayLabels = {};
    groups.forEach((subName, idx) => {
        groupDisplayLabels[subName] = getExploreSubtopicDisplayLabel_(topicNum, idx, groupLabels[subName]);
    });

    pendingTopicQuiz.groups = groups;
    pendingTopicQuiz.groupMap = groupMap;
    pendingTopicQuiz.groupLabels = groupLabels;
    pendingTopicQuiz.groupDisplayLabels = groupDisplayLabels;

    const container = document.getElementById('view-dashboard-grid');
    if (!container) return;
    container.className = `w-full grid grid-cols-1 sm:grid-cols-2 ${groups.length > 6 ? 'lg:grid-cols-3' : ''} gap-2.5`;

    let subHtml = '';
    const compactTopic3Cards = Number(topicNum) === 3;
    groups.forEach((subName, idx) => {
        const style = SUBTOPIC_PALETTES[idx % SUBTOPIC_PALETTES.length];
        const displayTitle = beautifySubtopicName(groupLabels[subName]).replace(/^\s*\d+(?:\.\d+)?[.)]?\s*/, '').trim();
        const displayCode = `${Number(topicNum)}.${idx + 1}`;
        const count = groupMap[subName].length;
        const topic3PedagogyDesc = {
            '2.2': 'Cầu 10: tách số → về 10 → tính phần còn lại',
            '2.3': 'Đơn vị trước → nhớ/mượn 1 chục → chục sau'
        };
        const desc = Number(topicNum) === 1
            ? (subName === '1A'
                ? 'Đọc – viết – tách gộp – giá trị hàng – ước lượng'
                : 'Liền trước/sau – vị trí trên tia số – so sánh – sắp xếp')
            : (Number(topicNum) === 3 ? (topic3PedagogyDesc[String(subName)] || '') : '');
        const needsPedagogyDesc = Number(topicNum) === 3 && ['2.2', '2.3'].includes(String(subName));
        const cardSizeClass = compactTopic3Cards
            ? (needsPedagogyDesc ? 'px-4 py-3 min-h-[88px]' : 'px-4 py-3 min-h-[76px]')
            : 'p-4 min-h-[96px]';
        subHtml += `
            <button onclick="selectSubtopic(${idx})" class="${cardSizeClass} ${style.card} border-2 rounded-2xl font-bold text-left transition-all flex flex-col justify-between shadow-sm pastel-btn">
                <div class="flex items-start justify-between gap-3 w-full">
                    <span class="text-base md:text-lg leading-snug"><strong class="${style.num} mr-1.5">${escapeHtml(displayCode)}</strong> ${escapeHtml(displayTitle)}</span>
                    <span class="text-xs font-extrabold ${style.badge} px-2.5 py-0.5 rounded-full border shrink-0 shadow-inner">${count} câu</span>
                </div>
                ${desc ? `<span class="mt-2 text-xs md:text-sm font-bold text-slate-500 leading-snug">${escapeHtml(desc)}</span>` : ''}
            </button>`;
    });
    container.innerHTML = subHtml;
    updateNavTabs(topicName, TOPICS_CONFIG.find(t => t.id === topicNum)?.icon || '', null);
    switchAppView('view-dashboard-grid');
}


function getExploreNumberScopePool_(pool, scope) {
    const wanted = String(scope) === '1000' ? new Set(['1.3']) : new Set(['1.1', '1.5']);
    return (pool || []).filter(q => wanted.has(String(q.sub_id || q.sub_topic || q.sub_code || '').trim()));
}

function renderExploreNumberScopes(topicNum, topicName, pool) {
    pendingTopicQuiz = {
        topicNum,
        topicName,
        questions: pool,
        selectedNumberScope: null,
        selectedNumberScopeLabel: null,
        selectedNumberScopePool: null
    };

    const container = document.getElementById('view-dashboard-grid');
    if (!container) return;
    container.className = 'w-full grid grid-cols-1 sm:grid-cols-2 gap-2.5';

    const scopes = [
        { key: '100', label: 'Phạm vi 100', icon: '🔢', desc: 'Số có hai chữ số · chục và đơn vị · tách gộp · ước lượng.' },
        { key: '1000', label: 'Phạm vi 1000', icon: '💯', desc: 'Số có ba chữ số · trăm, chục và đơn vị · giá trị hàng.' }
    ];

    container.innerHTML = scopes.map((item, idx) => {
        const palette = SUBTOPIC_PALETTES[idx % SUBTOPIC_PALETTES.length];
        const count = getExploreNumberScopePool_(pool, item.key).length;
        return `
            <button onclick="selectExploreNumberScope('${item.key}')" class="p-4 ${palette.card} border-2 rounded-2xl text-left shadow-sm pastel-btn min-h-[112px] flex flex-col justify-between ${count ? '' : 'opacity-50 cursor-not-allowed'}" ${count ? '' : 'disabled'}>
                <div class="flex items-center justify-between gap-3">
                    <span class="text-lg md:text-xl font-black"><span class="mr-2">${item.icon}</span>${escapeHtml(item.label)}</span>
                    <span class="text-xs font-extrabold ${palette.badge} px-2.5 py-0.5 rounded-full border shrink-0">${count} câu</span>
                </div>
                <span class="mt-2 text-xs md:text-sm font-bold text-slate-500 leading-snug">${escapeHtml(item.desc)}</span>
            </button>`;
    }).join('');

    updateNavTabs(topicName, TOPICS_CONFIG.find(t => t.id === topicNum)?.icon || '🔢', null);
    switchAppView('view-dashboard-grid');
}

function selectExploreNumberScope(scope) {
    stopSpeaking();
    if (!pendingTopicQuiz) return;
    const pool = getExploreNumberScopePool_(pendingTopicQuiz.questions || [], scope);
    if (!pool.length) return showAppNotice('Phạm vi này đang được cập nhật thêm câu hỏi nhé bé!');

    const label = String(scope) === '1000' ? 'Phạm vi 1000' : 'Phạm vi 100';
    pendingTopicQuiz.selectedNumberScope = String(scope);
    pendingTopicQuiz.selectedNumberScopeLabel = label;
    pendingTopicQuiz.selectedNumberScopePool = pool;
    renderExploreNumberActivities(label, pool);
}

function getNumberComposePool_(scope, pool) {
    const targetSub = String(scope) === '1000' ? '1.3' : '1.1';
    return (pool || []).filter(q =>
        String(q.sub_id || q.sub_topic || '').trim() === targetSub &&
        q.explore_type === 'compose_words'
    );
}

function getNumberEstimatePool_(scope, pool) {
    if (String(scope) === '1000') return [];
    return (pool || []).filter(q => q.explore_type === 'quantity_estimate');
}

function getFindNumberPool_(scope, pool) {
    if (String(scope) !== '100') return [];
    return (pool || []).filter(q => q.explore_type === 'find_number');
}

function renderExploreNumberActivities(scopeLabel, pool) {
    if (!pendingTopicQuiz) return;
    const scope = pendingTopicQuiz.selectedNumberScope || (String(scopeLabel).includes('1000') ? '1000' : '100');
    const composeCount = getNumberComposePool_(scope, pool).length;
    const estimateCount = getNumberEstimatePool_(scope, pool).length;
    const findNumberCount = getFindNumberPool_(scope, pool).length;
    const container = document.getElementById('view-dashboard-grid');
    if (!container) return;
    container.className = 'w-full grid grid-cols-1 sm:grid-cols-2 gap-2.5';

    const cards = [
        { key:'lecture', icon:'📖', title:'1. Bài giảng', desc: scope === '1000' ? 'Hiểu hàng trăm, hàng chục, hàng đơn vị và cách tách số.' : 'Hiểu hàng chục, hàng đơn vị và cách tách số.', count:'' },
        { key:'compose', icon:'🧩', title:'2. Ghép số', desc:'Đọc giá trị từng hàng rồi ghép thành số đúng.', count: composeCount ? `${composeCount} câu` : '' },
        ...(scope === '100' ? [
            { key:'estimate', icon:'🎯', title:'3. Ước lượng số lượng', desc:'Nhìn nhanh theo nhóm chục rồi ước lượng số lượng gần đúng.', count:`${estimateCount} câu` },
            { key:'find-number', icon:'🔎', title:'4. Tìm số', desc:'Nhận biết số lớn nhất, bé nhất, chẵn, lẻ, tròn chục và các số đặc biệt.', count:`${findNumberCount} câu` }
        ] : [])
    ];
    container.innerHTML = cards.map((item, idx) => {
        const palette = SUBTOPIC_PALETTES[idx % SUBTOPIC_PALETTES.length];
        return `<button onclick="selectExploreNumberActivity('${item.key}')" class="p-4 ${palette.card} border-2 rounded-2xl text-left shadow-sm pastel-btn min-h-[126px] flex flex-col justify-between">
            <div class="flex items-start justify-between gap-3">
                <span class="text-lg md:text-xl font-black"><span class="mr-2">${item.icon}</span>${item.title}</span>
                ${item.count ? `<span class="text-xs font-extrabold ${palette.badge} px-2.5 py-0.5 rounded-full border shrink-0">${item.count}</span>` : ''}
            </div>
            <span class="mt-2 text-sm md:text-base font-bold text-slate-500 leading-snug">${item.desc}</span>
        </button>`;
    }).join('');

    const { topicName, topicNum } = pendingTopicQuiz;
    updateNavTabs(topicName, TOPICS_CONFIG.find(t => t.id === topicNum)?.icon || '🔢', scopeLabel);
    switchAppView('view-dashboard-grid');
}

function selectExploreNumberActivity(activity) {
    stopSpeaking();
    if (!pendingTopicQuiz) return;
    pendingTopicQuiz.selectedNumberActivity = activity;
    const scope = pendingTopicQuiz.selectedNumberScope || '100';
    const scopeLabel = pendingTopicQuiz.selectedNumberScopeLabel || (scope === '1000' ? 'Phạm vi 1000' : 'Phạm vi 100');
    const pool = pendingTopicQuiz.selectedNumberScopePool || [];
    if (activity === 'lecture') return renderNumberPlaceValueLecture_(scope, scopeLabel);

    let questions = [];
    let label = '';
    if (activity === 'compose') {
        label = 'Ghép số';
        questions = getNumberComposePool_(scope, pool);
    } else if (activity === 'estimate') {
        label = 'Ước lượng số lượng';
        questions = getNumberEstimatePool_(scope, pool);
    } else if (activity === 'find-number') {
        label = 'Tìm số';
        questions = getFindNumberPool_(scope, pool);
    }
    if (!questions.length) return showAppNotice('Phần này đang được cập nhật thêm câu hỏi nhé bé!');
    practiceCycleRawPool = [...questions];
    const firstCycleQuestions = shuffleArray([...questions]);
    const { topicName, topicNum } = pendingTopicQuiz;
    updateNavTabs(topicName, TOPICS_CONFIG.find(t => t.id === topicNum)?.icon || '🔢', scopeLabel, label);
    startTopicQuiz(topicNum, `${topicName} - ${scopeLabel} - ${label}`, firstCycleQuestions, `number-${scope}-${activity}`);
}

function renderNumberPlaceValueLecture_(scope, scopeLabel) {
    const container = document.getElementById('view-dashboard-grid');
    if (!container) return;
    const is1000 = String(scope) === '1000';
    container.className = 'w-full';

    const exampleCards = is1000 ? `
        <div class="grid grid-cols-4 gap-2.5 mt-4">
            ${[['365','300 + 60 + 5','pink'],['420','400 + 20 + 0','purple'],['708','700 + 0 + 8','amber'],['900','900 + 0 + 0','emerald']].map(([n,split,c]) => `<div class="rounded-2xl bg-${c}-50 border-2 border-${c}-200 p-3 text-center"><div class="text-2xl md:text-3xl font-black text-${c}-600">${n}</div><div class="mt-1 text-base md:text-lg font-black text-slate-700">= ${split}</div></div>`).join('')}
        </div>` : `
        <div class="grid grid-cols-4 gap-2.5 mt-4">
            ${[['10','10 + 0','pink'],['80','80 + 0','purple'],['36','30 + 6','amber'],['92','90 + 2','emerald']].map(([n,split,c]) => `<div class="rounded-2xl bg-${c}-50 border-2 border-${c}-200 p-3 text-center"><div class="text-3xl md:text-4xl font-black text-${c}-600">${n}</div><div class="mt-1 text-base md:text-lg font-black text-slate-700">= ${split}</div></div>`).join('')}
        </div>`;

    const placeGrid = is1000 ? `
        <div class="grid grid-cols-3 gap-2 max-w-xl mx-auto mt-4">
            <div class="rounded-2xl border-2 border-amber-200 bg-amber-50 p-3 text-center"><div class="text-xs md:text-sm font-black text-amber-700">HÀNG TRĂM</div><div class="text-4xl md:text-5xl font-black text-amber-600 mt-1">3</div><div class="text-xs md:text-sm font-bold text-slate-500">3 trăm = 300</div></div>
            <div class="rounded-2xl border-2 border-pink-200 bg-pink-50 p-3 text-center"><div class="text-xs md:text-sm font-black text-pink-700">HÀNG CHỤC</div><div class="text-4xl md:text-5xl font-black text-pink-600 mt-1">6</div><div class="text-xs md:text-sm font-bold text-slate-500">6 chục = 60</div></div>
            <div class="rounded-2xl border-2 border-purple-200 bg-purple-50 p-3 text-center"><div class="text-xs md:text-sm font-black text-purple-700">HÀNG ĐƠN VỊ</div><div class="text-4xl md:text-5xl font-black text-purple-600 mt-1">5</div><div class="text-xs md:text-sm font-bold text-slate-500">5 đơn vị = 5</div></div>
        </div>` : `
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 mt-4">
            ${[{n:'10',t:'1',o:'0'},{n:'80',t:'8',o:'0'},{n:'36',t:'3',o:'6'},{n:'92',t:'9',o:'2'}].map((x,i) => `
                <div class="rounded-2xl border-2 ${i%2===0?'border-pink-200 bg-pink-50/60':'border-purple-200 bg-purple-50/60'} p-3">
                    <div class="text-center text-2xl md:text-3xl font-black text-slate-700 mb-2">Số ${x.n}</div>
                    <div class="grid grid-cols-2 gap-1.5">
                        <div class="rounded-xl border border-pink-200 bg-white/80 p-2 text-center"><div class="text-sm md:text-base font-black text-pink-700">HÀNG CHỤC</div><div class="text-3xl md:text-4xl font-black text-pink-600">${x.t}</div><div class="text-sm md:text-base font-bold text-slate-500">${x.t} chục = ${Number(x.t)*10}</div></div>
                        <div class="rounded-xl border border-purple-200 bg-white/80 p-2 text-center"><div class="text-sm md:text-base font-black text-purple-700">HÀNG ĐƠN VỊ</div><div class="text-3xl md:text-4xl font-black text-purple-600">${x.o}</div><div class="text-sm md:text-base font-bold text-slate-500">${x.o} đơn vị = ${x.o}</div></div>
                    </div>
                </div>`).join('')}
        </div>`;

    const speech = is1000
        ? 'Bé ơi, một số có ba chữ số gồm hàng trăm, hàng chục và hàng đơn vị. Chữ số đứng bên trái là hàng trăm, chữ số ở giữa là hàng chục, chữ số đứng bên phải là hàng đơn vị. Ví dụ số ba trăm sáu mươi lăm có 3 ở hàng trăm, 6 ở hàng chục và 5 ở hàng đơn vị. Giá trị của 3 trăm là 300, của 6 chục là 60 và của 5 đơn vị là 5. Vì vậy 365 bằng 300 cộng 60 cộng 5. Nếu một hàng có chữ số 0 thì hàng đó vẫn giữ vị trí nhưng có giá trị bằng 0.'
        : 'Bé ơi, một số có hai chữ số gồm hàng chục và hàng đơn vị. Chữ số đứng bên trái là hàng chục, chữ số đứng bên phải là hàng đơn vị. Ví dụ số ba mươi sáu có 3 ở hàng chục và 6 ở hàng đơn vị. Ba chục có giá trị là 30, sáu đơn vị có giá trị là 6, nên 36 bằng 30 cộng 6. Với số tròn chục như 10 hoặc 80, chữ số hàng đơn vị là 0. Vì vậy 10 bằng 10 cộng 0, còn 80 bằng 80 cộng 0. Bé nhớ nhé, mỗi chữ số vừa có vị trí, vừa có giá trị theo hàng của nó.';

    const visibleLesson = is1000
        ? `Bé ơi, một số có <b>3 chữ số</b> gồm <b>hàng trăm – hàng chục – hàng đơn vị</b>. Chữ số bên trái cho biết số trăm, chữ số ở giữa cho biết số chục, chữ số bên phải cho biết số đơn vị. Mỗi chữ số mang giá trị theo hàng của mình. Ví dụ: <b>365 = 300 + 60 + 5</b>. Nếu một hàng có chữ số <b>0</b>, hàng đó vẫn giữ vị trí nhưng có giá trị bằng 0.`
        : `Bé ơi, một số có <b>2 chữ số</b> gồm <b>hàng chục</b> và <b>hàng đơn vị</b>. Chữ số bên trái là hàng chục, chữ số bên phải là hàng đơn vị. Mỗi chữ số mang giá trị theo hàng của mình. Ví dụ: <b>36 = 30 + 6</b>. Với số tròn chục như <b>10</b> hay <b>80</b>, hàng đơn vị là <b>0</b>, nên <b>10 = 10 + 0</b> và <b>80 = 80 + 0</b>.`;

    container.innerHTML = `<div class="w-full pastel-card p-4 md:p-6">
        <div class="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-3">
            <div class="hidden md:block"></div>
            <div class="text-center"><div class="text-4xl mb-1">🧮</div><h2 class="text-2xl md:text-3xl font-black text-purple-700">Bài giảng · ${scopeLabel}</h2></div>
            <div class="flex justify-center md:justify-end">
                <button onclick="speakVietnamese(${JSON.stringify(speech)})" class="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-500 text-white text-sm md:text-base font-black shadow-md pastel-btn whitespace-nowrap">🔊 Nghe Cô Thỏ Ngọc đọc</button>
            </div>
        </div>
        <div class="mt-4 rounded-2xl border-2 border-pink-200 bg-gradient-to-r from-pink-50/80 to-purple-50/80 p-4 md:p-5">
            <div class="flex items-start gap-3 max-w-4xl mx-auto"><div class="text-3xl shrink-0">🐰</div><div><div class="text-base md:text-lg font-black text-pink-600 mb-1">Cô Thỏ Ngọc giảng bài</div><p class="text-base md:text-lg font-bold leading-relaxed text-slate-600">${visibleLesson}</p></div></div>
        </div>
        <div class="mt-4 rounded-3xl border-2 border-pink-200 bg-white/80 p-4 md:p-5">
            <div class="text-center text-lg md:text-xl font-black text-slate-700">Quan sát vị trí các chữ số</div>
            ${placeGrid}
            <div class="mt-4 rounded-2xl bg-gradient-to-r from-pink-50 to-purple-50 border-2 border-purple-200 p-4 text-center"><div class="text-base md:text-lg font-black text-slate-600">Tách số theo giá trị hàng</div><div class="mt-1 text-3xl md:text-4xl font-black text-purple-700">${is1000 ? '365 = 300 + 60 + 5' : '36 = 30 + 6'}</div></div>
            ${exampleCards}
            <div class="mt-4 rounded-2xl bg-emerald-50 border-2 border-emerald-200 p-3 text-center text-base md:text-lg font-black text-emerald-700">💡 ${is1000 ? 'Chữ số 0 vẫn giữ chỗ cho hàng của nó.' : 'Số tròn chục có hàng đơn vị bằng 0.'}</div>
        </div>
    </div>`;

    const { topicName, topicNum } = pendingTopicQuiz;
    updateNavTabs(topicName, TOPICS_CONFIG.find(t => t.id === topicNum)?.icon || '🔢', scopeLabel, 'Bài giảng');
    switchAppView('view-dashboard-grid');

    // Mở bài giảng là Cô Thỏ Ngọc đọc luôn. Lệnh này chạy ngay trong thao tác bấm mở bài
    // để trình duyệt vẫn coi đây là phát âm thanh do người dùng khởi tạo.
    speakVietnamese(speech, 0.96);
}

const EXPLORE_LEVELS = {
    1: { label: 'Cấp 1 · Mắt tinh Toán học', icon: '👀', desc: 'Nhìn trực quan, nhận biết và chọn đáp án.' },
    2: { label: 'Cấp 2 · Hiểu số thật chắc', icon: '💡', desc: 'Hiểu quan hệ giữa số, vị trí và giá trị hàng.' },
    3: { label: 'Cấp 3 · Biến hóa con số', icon: '🔄', desc: 'Đảo thứ tự, ẩn dữ kiện và đổi cách biểu diễn.' },
    4: { label: 'Cấp 4 · Thám tử suy luận', icon: '🧠', desc: 'Kết hợp điều kiện, so sánh và suy luận nhiều bước.' }
};

function renderExploreLevelsForTopic(topicNum, topicName, pool) {
    pendingTopicQuiz = { topicNum, topicName, questions: pool, directLevelPool: pool };
    const container = document.getElementById('view-dashboard-grid');
    if (!container) return;
    container.className = 'w-full grid grid-cols-1 sm:grid-cols-2 gap-2.5';
    let html = '';
    [1,2,3,4].forEach(level => {
        const meta = EXPLORE_LEVELS[level];
        const count = pool.filter(q => Number(q.explore_level) === level).length;
        const palette = SUBTOPIC_PALETTES[(level - 1) % SUBTOPIC_PALETTES.length];
        html += `
            <button onclick="selectExploreLevel(${level})" class="p-4 ${palette.card} border-2 rounded-2xl text-left shadow-sm pastel-btn min-h-[112px] flex flex-col justify-between ${count ? '' : 'opacity-50 cursor-not-allowed'}" ${count ? '' : 'disabled'}>
                <div class="flex items-center justify-between gap-3">
                    <span class="text-lg md:text-xl font-black"><span class="mr-2">${meta.icon}</span>${escapeHtml(meta.label)}</span>
                    <span class="text-xs font-extrabold ${palette.badge} px-2.5 py-0.5 rounded-full border shrink-0">${count} câu</span>
                </div>
                <span class="mt-2 text-xs md:text-sm font-bold text-slate-500 leading-snug">${escapeHtml(meta.desc)}</span>
            </button>`;
    });
    container.innerHTML = html;
    updateNavTabs(topicName, TOPICS_CONFIG.find(t => t.id === topicNum)?.icon || '🔢', null);
    switchAppView('view-dashboard-grid');
}

function renderExploreLevelsForGroup(groupKey, groupLabel, pool) {
    if (!pendingTopicQuiz) return;
    pendingTopicQuiz.selectedExploreGroup = groupKey;
    pendingTopicQuiz.selectedExploreGroupLabel = groupLabel;

    const container = document.getElementById('view-dashboard-grid');
    if (!container) return;
    container.className = 'w-full grid grid-cols-1 sm:grid-cols-2 gap-2.5';

    let html = '';
    [1,2,3,4].forEach(level => {
        const meta = EXPLORE_LEVELS[level];
        const count = pool.filter(q => Number(q.explore_level) === level).length;
        const palette = SUBTOPIC_PALETTES[(level - 1) % SUBTOPIC_PALETTES.length];
        html += `
            <button onclick="selectExploreLevel(${level})" class="p-4 ${palette.card} border-2 rounded-2xl text-left shadow-sm pastel-btn min-h-[112px] flex flex-col justify-between ${count ? '' : 'opacity-50 cursor-not-allowed'}" ${count ? '' : 'disabled'}>
                <div class="flex items-center justify-between gap-3">
                    <span class="text-lg md:text-xl font-black"><span class="mr-2">${meta.icon}</span>${escapeHtml(meta.label)}</span>
                    <span class="text-xs font-extrabold ${palette.badge} px-2.5 py-0.5 rounded-full border shrink-0">${count} câu</span>
                </div>
                <span class="mt-2 text-xs md:text-sm font-bold text-slate-500 leading-snug">${escapeHtml(meta.desc)}</span>
            </button>`;
    });
    container.innerHTML = html;
    const { topicName, topicNum } = pendingTopicQuiz;
    updateNavTabs(topicName, TOPICS_CONFIG.find(t => t.id === topicNum)?.icon || '🔢', groupLabel);
    switchAppView('view-dashboard-grid');
}

function selectExploreLevel(level) {
    stopSpeaking();
    if (!pendingTopicQuiz) return;
    const { topicNum, topicName, groupMap, selectedExploreGroup, selectedExploreGroupLabel, directLevelPool, selectedNumberScopePool, selectedNumberScopeLabel } = pendingTopicQuiz;
    const sourcePool = selectedNumberScopePool || directLevelPool || groupMap?.[selectedExploreGroup] || [];
    const pool = sourcePool.filter(q => Number(q.explore_level) === Number(level));
    if (!pool.length) return showAppNotice('Level này đang được cập nhật thêm câu hỏi nhé bé!');

    practiceCycleRawPool = [...pool];
    const levelMeta = EXPLORE_LEVELS[level];
    const firstCycleQuestions = shuffleArray([...pool]);
    const contextLabel = selectedNumberScopeLabel || selectedExploreGroupLabel || '';
    const levelContext = contextLabel ? `${contextLabel} · ${levelMeta.label}` : levelMeta.label;
    const title = contextLabel ? `${topicName} - ${contextLabel} - ${levelMeta.label}` : `${topicName} - ${levelMeta.label}`;
    updateNavTabs(topicName, TOPICS_CONFIG.find(t => t.id === topicNum)?.icon || '🔢', levelContext);
    startTopicQuiz(topicNum, title, firstCycleQuestions, selectedNumberScopeLabel || selectedExploreGroup || `topic-${topicNum}`);
}


function isCarryLearningSub_(subCode) {
    return ['2.2', '2.3'].includes(String(subCode || '').trim());
}

function renderCarryLearningModes_(subCode, subLabel, pool) {
    if (!pendingTopicQuiz) return;
    const code = String(subCode || '').trim();
    const label = subLabel || (code === '2.2'
        ? 'Phép cộng, phép trừ có nhớ phạm vi 20'
        : 'Phép cộng, phép trừ có nhớ phạm vi 100');
    const sourcePool = Array.isArray(pool) ? pool : [];

    pendingTopicQuiz.carryLearningSub = code;
    pendingTopicQuiz.carryLearningLabel = label;
    pendingTopicQuiz.carryLearningPool = sourcePool;
    pendingTopicQuiz.carryLearningMode = null;

    const container = document.getElementById('view-dashboard-grid');
    if (!container) return;
    container.className = 'w-full grid grid-cols-1 sm:grid-cols-2 gap-2.5';

    const cards = [
        {
            key: 'guided', icon: '🧩', title: 'Cấp 1 · Học có hướng dẫn',
            desc: code === '2.2'
                ? 'Có bảng về 10, gợi ý tách số; làm đúng mới hiện đầy đủ cách tính.'
                : 'Có bảng về 10, gợi ý tách số và ô nhớ/mượn 1; làm đúng mới hiện đầy đủ cách tính.'
        },
        {
            key: 'practice', icon: '✍️', title: 'Cấp 2 · Tự thực hành',
            desc: 'Dùng đúng cùng bộ câu hỏi, xáo trộn ngẫu nhiên; không bảng, không gợi ý.'
        }
    ];

    container.innerHTML = cards.map((item, idx) => {
        const palette = SUBTOPIC_PALETTES[idx % SUBTOPIC_PALETTES.length];
        return `<button onclick="startCarryLearningMode_('${item.key}')" class="p-4 ${palette.card} border-2 rounded-2xl text-left shadow-sm pastel-btn min-h-[112px] flex flex-col justify-between">
            <div class="flex items-start justify-between gap-3">
                <span class="text-lg md:text-xl font-black"><span class="mr-2">${item.icon}</span>${item.title}</span>
                <span class="text-xs font-extrabold ${palette.badge} px-2.5 py-0.5 rounded-full border shrink-0">${sourcePool.length} câu</span>
            </div>
            <span class="mt-2 text-sm md:text-base font-bold text-slate-500 leading-snug">${item.desc}</span>
        </button>`;
    }).join('');

    const { topicName, topicNum } = pendingTopicQuiz;
    updateNavTabs(topicName, TOPICS_CONFIG.find(t => t.id === topicNum)?.icon || '🔢', label);
    switchAppView('view-dashboard-grid');
}

function startCarryLearningMode_(mode) {
    stopSpeaking();
    if (!pendingTopicQuiz || !['guided', 'practice'].includes(mode)) return;
    const pool = pendingTopicQuiz.carryLearningPool || [];
    if (!pool.length) return showAppNotice('Mục này đang được cập nhật thêm câu hỏi nhé bé!');

    pendingTopicQuiz.carryLearningMode = mode;
    practiceCycleRawPool = [...pool];
    const firstCycleQuestions = shuffleArray([...pool]);
    const modeLabel = mode === 'guided' ? 'Cấp 1 · Học có hướng dẫn' : 'Cấp 2 · Tự thực hành';
    const { topicNum, topicName, carryLearningLabel, carryLearningSub } = pendingTopicQuiz;
    updateNavTabs(topicName, TOPICS_CONFIG.find(t => t.id === topicNum)?.icon || '🔢', carryLearningLabel, modeLabel);
    startTopicQuiz(topicNum, `${topicName} - ${carryLearningLabel} - ${modeLabel}`, firstCycleQuestions, `${carryLearningSub}-${mode}`);
}

function selectSubtopic(idx) {
    stopSpeaking();
    if (!pendingTopicQuiz) return;
    if (Number(pendingTopicQuiz.topicNum) === 2) {
        return renderExploreComparisonBranches(2, pendingTopicQuiz.topicName, pendingTopicQuiz.questions || []);
    }
    const { topicNum, topicName, questions, groups, groupMap, groupLabels, groupDisplayLabels } = pendingTopicQuiz;
    const subLabel = idx !== null ? groups[idx] : null;
    const pool = idx !== null ? groupMap[subLabel] : questions;
    const displayLabel = subLabel
        ? (groupDisplayLabels?.[subLabel] || getExploreSubtopicDisplayLabel_(topicNum, idx, groupLabels[subLabel]))
        : null;

    if (Number(topicNum) === 3 && isCarryLearningSub_(subLabel)) {
        return renderCarryLearningModes_(subLabel, displayLabel, pool);
    }

    const finalTitle = displayLabel ? `${topicName} - ${displayLabel}` : topicName;
    practiceCycleRawPool = [...pool];
    const firstCycleQuestions = shuffleArray([...pool]);

    updateNavTabs(topicName, TOPICS_CONFIG.find(t => t.id === topicNum)?.icon || '🔢', displayLabel || 'Tất cả các mục');
    startTopicQuiz(topicNum, finalTitle, firstCycleQuestions, subLabel);
}



// ==========================================
// 12. MATH LAB - TOÁN TƯ DUY MỸ
// Khám phá • Mô hình • Nhiều cách giải
// SGK Toán 2 là đích kiến thức; trải nghiệm học được thiết kế lại theo hướng
// number sense, thao tác, mô hình trực quan, giải thích và transfer.
// ==========================================
const MATH_LAB_TRACKS_CONFIG = [
    { code:'12.1', icon:'🔢', title:'Number Sense Lab – Cảm nhận số', journeys:10, desc:'Số đến 1000, giá trị hàng, nhiều cách biểu diễn, tia số và ước lượng.' },
    { code:'12.2', icon:'➕', title:'Addition & Subtraction Lab – Cộng trừ linh hoạt', journeys:12, desc:'Ý nghĩa cộng trừ, làm 10, bù trừ, regrouping và lựa chọn chiến lược.' },
    { code:'12.3', icon:'✖️', title:'Equal Groups Lab – Tư duy nhân chia', journeys:10, desc:'Nhóm bằng nhau, array, bảng 2–5, chia đều và chia theo nhóm.' },
    { code:'12.4', icon:'📏', title:'Measurement Lab – Đo lường & tiền', journeys:8, desc:'Ước lượng, đo, đơn vị, khối lượng, dung tích và tiền Việt Nam.' },
    { code:'12.5', icon:'⏰', title:'Time Lab – Thời gian & lịch', journeys:7, desc:'Giờ, phút, ngày, tuần, tháng và đọc lịch trong tình huống thật.' },
    { code:'12.6', icon:'📐', title:'Geometry Lab – Hình học & không gian', journeys:8, desc:'Đường, hình phẳng, ghép hình, tưởng tượng không gian và hình khối.' },
    { code:'12.7', icon:'🧩', title:'Patterns & Unknowns Lab – Quy luật & số ẩn', journeys:6, desc:'Quy luật, số ẩn, dấu bằng như quan hệ và suy luận ngược.' },
    { code:'12.8', icon:'📊', title:'Data & Chance Lab – Dữ liệu & khả năng', journeys:5, desc:'Thu thập, phân loại, biểu đồ tranh và khả năng xảy ra.' },
    { code:'12.9', icon:'💡', title:'Problem Solving Studio – Giải quyết vấn đề', journeys:6, desc:'Mô hình hóa bài toán, nhiều cách giải, giải thích và thuyết phục.' }
];
const MATH_LAB_DATA_FILE = 'assets/data/math_lab_toan_2_12.json?v=20260929-2';
let mathLabBundle = null;
const mathLabCaches = {};
let mathLabCache = null;
let mathLabState = {
    view:'home', trackCode:null, journeyIndex:null, activityIndex:0,
    selectedIndex:null, selectedMulti:[], build:{hundreds:0,tens:0,ones:0}, rangeValue:null,
    orderPicked:[], tradeDone:false, grouped:false, feedback:null, hintLevel:0,
    groups:1, perGroup:1, rows:1, cols:1, shareRounds:0, measureValue:null,
    moneyCounts:{}, clockHour:12, clockMinute:0, selectedDay:null, tallyCounts:[]
};

function mathLabTrackConfig_(code) { return MATH_LAB_TRACKS_CONFIG.find(t => t.code === code) || MATH_LAB_TRACKS_CONFIG[0]; }
function mathLabTrackShortTitle_(data) {
    const t=mathLabTrackConfig_(data?.display_code || mathLabState.trackCode);
    return `${t.code} ${String(t.title||'').split(' – ')[0].split(' - ')[0]}`;
}
function ensureMathLabStyles_() {
    if (document.getElementById('math-lab-style')) return;
    const style=document.createElement('style'); style.id='math-lab-style';
    style.textContent=`
        .ml-hero{background:linear-gradient(135deg,#fff7ff 0%,#f5f3ff 46%,#eefcff 100%);border:2px solid #ead7ff;border-radius:28px;padding:20px 22px;box-shadow:0 8px 26px rgba(126,34,206,.06)}
        .ml-kicker{font-size:.72rem;font-weight:1000;letter-spacing:.18em;text-transform:uppercase;color:#c026d3}
        .ml-track-card,.ml-journey-card{border:2px solid #ead7ff;border-radius:24px;background:rgba(255,255,255,.96);box-shadow:0 4px 14px rgba(99,102,241,.06);transition:.18s ease}.ml-track-card:hover,.ml-journey-card:hover{transform:translateY(-2px);border-color:#d8b4fe;box-shadow:0 10px 24px rgba(168,85,247,.11)}
        .ml-progress{height:7px;border-radius:999px;background:#f1f5f9;overflow:hidden}.ml-progress>i{display:block;height:100%;background:linear-gradient(90deg,#d946ef,#8b5cf6,#38bdf8);border-radius:inherit}
        .ml-teacher{background:linear-gradient(135deg,#fdf4ff,#f5f3ff);border:1.5px solid #e9d5ff;border-radius:20px;padding:12px 14px;color:#6b21a8;font-weight:800;line-height:1.45}
        .ml-prompt{font-weight:1000;color:#0f172a;font-size:clamp(1.05rem,2vw,1.35rem);line-height:1.42}.ml-chip{padding:7px 11px;border-radius:999px;background:#f5f3ff;border:1.5px solid #ddd6fe;color:#6d28d9;font-weight:900}
        .ml-choice{width:100%;min-height:58px;border:2px solid #e2e8f0;border-radius:18px;background:#fff;padding:10px 12px;font-weight:900;color:#334155;text-align:left;transition:.15s ease}.ml-choice:hover{border-color:#c084fc;background:#faf5ff}.ml-choice.is-selected{border-color:#a855f7;background:#f3e8ff;color:#6b21a8;box-shadow:0 0 0 3px rgba(168,85,247,.08)}.ml-choice.is-correct{border-color:#34d399;background:#ecfdf5;color:#047857}.ml-choice.is-wrong{border-color:#fb7185;background:#fff1f2;color:#be123c}
        .ml-base10{display:flex;align-items:flex-end;justify-content:center;gap:9px;flex-wrap:wrap;min-height:96px;padding:12px;border-radius:20px;background:#f8fafc;border:1.5px dashed #cbd5e1}.ml-hundred{width:64px;height:64px;border-radius:8px;border:2px solid #38bdf8;background-color:#e0f2fe;background-image:linear-gradient(#bae6fd 1px,transparent 1px),linear-gradient(90deg,#bae6fd 1px,transparent 1px);background-size:6.4px 6.4px}.ml-ten{width:12px;height:64px;border-radius:5px;border:2px solid #a78bfa;background:repeating-linear-gradient(to bottom,#ede9fe 0 5px,#c4b5fd 5px 6px)}.ml-one{width:15px;height:15px;border-radius:4px;border:2px solid #f59e0b;background:#fef3c7}.ml-block-group{display:flex;align-items:flex-end;gap:4px;flex-wrap:wrap;justify-content:center}
        .ml-counter{display:flex;align-items:center;justify-content:center;gap:9px;padding:9px;border-radius:18px;background:#f8fafc;border:1.5px solid #e2e8f0}.ml-counter button{width:36px;height:36px;border-radius:12px;background:#fff;border:2px solid #ddd6fe;color:#7c3aed;font-size:1.15rem;font-weight:1000}.ml-counter strong{min-width:30px;text-align:center;font-size:1.2rem;color:#312e81}
        .ml-number-line{position:relative;padding:20px 8px 8px}.ml-number-line input[type=range]{width:100%;accent-color:#a855f7}.ml-number-line-labels{display:flex;justify-content:space-between;font-weight:900;color:#64748b;font-size:.8rem}.ml-number-line-value{text-align:center;font-size:1.25rem;font-weight:1000;color:#7e22ce;margin-bottom:4px}
        .ml-dot{width:10px;height:10px;border-radius:50%;background:#a78bfa;display:inline-block;margin:2px}.ml-dotbox{max-width:520px;margin:auto;text-align:center;padding:14px;border-radius:20px;background:#faf5ff;border:1.5px dashed #d8b4fe}.ml-group{display:inline-flex;gap:3px;flex-wrap:wrap;justify-content:center;align-items:center;min-width:62px;min-height:54px;padding:8px;margin:4px;border-radius:16px;background:white;border:1.5px solid #ddd6fe}.ml-array{display:grid;gap:7px;justify-content:center;margin:auto;padding:16px;border-radius:20px;background:#f8fafc;border:1.5px dashed #cbd5e1}.ml-array i{width:15px;height:15px;border-radius:50%;background:#8b5cf6}.ml-sharebox{display:flex;flex-wrap:wrap;gap:4px;align-content:flex-start;justify-content:center;min-width:92px;min-height:80px;padding:10px;border-radius:18px;background:#fff;border:2px solid #c4b5fd}
        .ml-clock{width:150px;height:150px;border-radius:50%;border:7px solid #ddd6fe;background:white;margin:auto;position:relative;box-shadow:inset 0 0 0 2px #f5f3ff}.ml-clock::after{content:'';position:absolute;width:10px;height:10px;border-radius:50%;background:#7c3aed;left:50%;top:50%;transform:translate(-50%,-50%)}.ml-hand{position:absolute;left:50%;bottom:50%;transform-origin:50% 100%;border-radius:999px}.ml-hour{width:5px;height:39px;background:#7c3aed}.ml-minute{width:3px;height:55px;background:#ec4899}.ml-clock-num{position:absolute;font-size:11px;font-weight:900;color:#64748b;transform:translate(-50%,-50%)}
        .ml-calendar{display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:5px;max-width:520px;margin:auto}.ml-cal-head{font-size:10px;font-weight:1000;color:#64748b;text-align:center}.ml-cal-day{min-height:42px;border:1.5px solid #e2e8f0;border-radius:11px;background:#fff;font-weight:900;color:#475569}.ml-cal-day.selected{border-color:#a855f7;background:#f3e8ff;color:#7e22ce}.ml-cal-blank{min-height:42px}
        .ml-feedback{border-radius:18px;padding:12px 14px;font-weight:900;line-height:1.45}.ml-feedback.ok{background:#ecfdf5;border:1.5px solid #6ee7b7;color:#047857}.ml-feedback.no{background:#fff1f2;border:1.5px solid #fda4af;color:#be123c}.ml-hint{background:#fffbeb;border:1.5px solid #fde68a;color:#92400e;border-radius:16px;padding:10px 12px;font-weight:800}.ml-step-dot{width:9px;height:9px;border-radius:999px;background:#e2e8f0}.ml-step-dot.done{background:#34d399}.ml-step-dot.current{width:22px;background:#a855f7}
        @media(max-width:640px){.ml-hero{padding:16px}.ml-hundred{width:54px;height:54px;background-size:5.4px 5.4px}.ml-ten{height:54px}.ml-track-card,.ml-journey-card{border-radius:20px}}
    `; document.head.appendChild(style);
}
async function loadMathLabBundle_() {
    if (mathLabBundle) return mathLabBundle;
    let res;
    try {
        res = await fetch(MATH_LAB_DATA_FILE, { cache: 'no-store' });
    } catch (err) {
        throw new Error('Không kết nối được dữ liệu Math Lab. Hãy kiểm tra file assets/data/math_lab_toan_2_12.json');
    }
    if(!res.ok) throw new Error(`Không tải được Math Lab (${res.status}). Cần file assets/data/math_lab_toan_2_12.json`);
    let data;
    try {
        data = await res.json();
    } catch (err) {
        throw new Error('File math_lab_toan_2_12.json không phải JSON hợp lệ');
    }
    const labs = Array.isArray(data?.labs)
        ? data.labs
        : (Array.isArray(data?.tracks) ? data.tracks : (data?.display_code ? [data] : []));
    if(!labs.length) throw new Error('Dữ liệu Math Lab không có Learning Lab');
    mathLabBundle=data;
    Object.keys(mathLabCaches).forEach(k => delete mathLabCaches[k]);
    labs.forEach(lab=>{ if(lab?.display_code) mathLabCaches[String(lab.display_code)]=lab; });
    if(!mathLabCaches['12.1']) throw new Error('Dữ liệu Math Lab thiếu Learning Lab 12.1');
    return mathLabBundle;
}
async function loadMathLabData_(code='12.1') {
    if (mathLabCaches[code]) { mathLabCache=mathLabCaches[code]; return mathLabCache; }
    await loadMathLabBundle_();
    const data=mathLabCaches[code];
    if(!data) throw new Error('Không tìm thấy dữ liệu '+code);
    mathLabCache=data;
    return mathLabCache;
}
function mathLabProgress_(){try{return JSON.parse(localStorage.getItem('mathLabG2ProgressV1')||'{}')||{}}catch(_){return{}}}
function mathLabMarkDone_(id){const p=mathLabProgress_();p[id]={done:true,at:new Date().toISOString()};localStorage.setItem('mathLabG2ProgressV1',JSON.stringify(p))}
function mathLabJourneyProgress_(j){const p=mathLabProgress_(),acts=j?.activities||[];const done=acts.filter(a=>p[a.id]?.done).length;return{done,total:acts.length,pct:acts.length?Math.round(done*100/acts.length):0}}
function mathLabTotalDone_(data){const p=mathLabProgress_(),acts=(data?.journeys||[]).flatMap(j=>j.activities||[]);return{done:acts.filter(a=>p[a.id]?.done).length,total:acts.length}}
function resetMathLabActivityState_(){Object.assign(mathLabState,{selectedIndex:null,selectedMulti:[],build:{hundreds:0,tens:0,ones:0},rangeValue:null,orderPicked:[],tradeDone:false,grouped:false,feedback:null,hintLevel:0,groups:1,perGroup:1,rows:1,cols:1,shareRounds:0,measureValue:null,moneyCounts:{},clockHour:12,clockMinute:0,selectedDay:null,tallyCounts:[]})}
async function openMathLab(){setAppShellRootMode_(false);stopSpeaking();ensureMathLabStyles_();activeTopicId=12;activeExamContext=null;activeRoadmapContext=null;pendingTopicQuiz=null;setMainTabActive_('discover');mathLabState.view='home';mathLabState.trackCode=null;mathLabState.journeyIndex=null;updateNavTabs('12. Math Lab – Toán tư duy Mỹ','✨',null);showLoadingOverlay('Đang mở Math Lab...');try{await loadMathLabData_('12.1');hideLoadingOverlay();renderMathLabHome_()}catch(err){hideLoadingOverlay();showAppNotice(err.message||'Không tải được Math Lab')}}
function renderMathLabHome_(){ensureMathLabStyles_();const c=document.getElementById('view-dashboard-grid');if(!c)return;c.className='w-full grid grid-cols-1 md:grid-cols-2 gap-3';const total=MATH_LAB_TRACKS_CONFIG.reduce((n,t)=>n+t.journeys,0);const tracks=MATH_LAB_TRACKS_CONFIG.map(t=>{const d=mathLabCaches[t.code],p=d?mathLabTotalDone_(d):{done:0,total:t.journeys*4};const pct=p.total?Math.round(p.done*100/p.total):0;return `<button onclick="openMathLabTrack('${t.code}')" class="ml-track-card p-4 text-left min-h-[142px]"><div class="flex items-start justify-between gap-3"><div class="flex items-start gap-3 min-w-0"><div class="w-11 h-11 rounded-2xl bg-fuchsia-50 border border-fuchsia-100 flex items-center justify-center text-2xl shrink-0">${t.icon}</div><div class="min-w-0"><div class="text-[11px] font-black text-fuchsia-500">${t.code}</div><h3 class="text-base md:text-lg font-black text-slate-800 leading-tight mt-0.5">${escapeHtml(t.title)}</h3></div></div><span class="ml-chip text-[11px] shrink-0">${t.journeys} hành trình</span></div><p class="text-sm font-bold text-slate-500 mt-3 leading-relaxed">${escapeHtml(t.desc)}</p>${d?`<div class="mt-3"><div class="flex justify-between text-[11px] font-black text-slate-400 mb-1"><span>${p.done}/${p.total} trải nghiệm</span><span>${pct}%</span></div><div class="ml-progress"><i style="width:${pct}%"></i></div></div>`:''}</button>`}).join('');c.innerHTML=`<section class="ml-hero md:col-span-2"><div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"><div><div class="ml-kicker">Math Lab • Grade 2</div><h2 class="text-2xl md:text-4xl font-black text-slate-900 mt-1">Toán tư duy Mỹ</h2><p class="text-sm md:text-base font-bold text-slate-600 mt-2 max-w-3xl leading-relaxed">Cùng kiến thức Toán 2 Việt Nam, nhưng con học bằng khám phá, thao tác, mô hình, giải thích và nhiều cách giải.</p><p class="font-black text-fuchsia-600 mt-3">Khám phá • Mô hình • Nhiều cách giải</p></div><div class="rounded-2xl bg-white/80 border border-violet-200 px-5 py-3 text-center font-black text-violet-700 min-w-[210px]"><div class="text-2xl">${total}</div><div class="text-xs mt-1">hành trình khám phá</div><div class="text-[11px] text-slate-400 mt-1">9 Learning Labs</div></div></div></section>${tracks}`;updateNavTabs('12. Math Lab – Toán tư duy Mỹ','✨',null);switchAppView('view-dashboard-grid')}
async function openMathLabTrack(code){stopSpeaking();showLoadingOverlay('Đang chuẩn bị '+code+'...');try{const d=await loadMathLabData_(code);hideLoadingOverlay();mathLabState.view='track';mathLabState.trackCode=code;mathLabState.journeyIndex=null;renderMathLabTrack_(d)}catch(err){hideLoadingOverlay();showAppNotice(err.message||'Không tải được Learning Lab')}}
function renderMathLabTrack_(data){const c=document.getElementById('view-dashboard-grid');if(!c)return;const cfg=mathLabTrackConfig_(data?.display_code||mathLabState.trackCode);mathLabState.view='track';mathLabState.trackCode=cfg.code;mathLabState.journeyIndex=null;mathLabCache=data;const total=mathLabTotalDone_(data),pct=total.total?Math.round(total.done*100/total.total):0;c.className='w-full grid grid-cols-1 md:grid-cols-2 gap-3';const cards=(data.journeys||[]).map((j,i)=>{const p=mathLabJourneyProgress_(j),status=p.pct===100?'Hoàn thành':p.done?'Đang khám phá':'Bắt đầu';return `<button onclick="openMathLabJourney(${i})" class="ml-journey-card p-4 text-left min-h-[154px]"><div class="flex items-start justify-between gap-3"><div class="flex gap-3 min-w-0"><div class="w-11 h-11 rounded-2xl bg-violet-50 border border-violet-100 flex items-center justify-center text-2xl shrink-0">${j.icon||'✨'}</div><div><div class="text-[11px] font-black text-fuchsia-500">${escapeHtml(j.id)}</div><h3 class="font-black text-slate-800 text-base md:text-lg leading-tight mt-0.5">${escapeHtml(j.title)}</h3></div></div><span class="ml-chip text-[11px]">${status}</span></div><p class="text-sm font-bold text-slate-500 mt-2 leading-relaxed line-clamp-2">${escapeHtml(j.goal||'')}</p><div class="mt-3"><div class="flex justify-between text-[11px] font-black text-slate-400 mb-1"><span>${p.done}/${p.total} trải nghiệm</span><span>${p.pct}%</span></div><div class="ml-progress"><i style="width:${p.pct}%"></i></div></div></button>`}).join('');c.innerHTML=`<section class="ml-hero md:col-span-2"><div class="flex items-start justify-between gap-4 flex-wrap"><div><div class="ml-kicker">${cfg.code} • Math Lab</div><h2 class="text-2xl md:text-3xl font-black text-slate-900 mt-1">${escapeHtml(cfg.title)}</h2><p class="text-sm md:text-base font-bold text-slate-600 mt-2 max-w-3xl">${escapeHtml(data.subtitle||'')}</p></div><div class="min-w-[190px]"><div class="flex justify-between text-xs font-black text-slate-500 mb-1"><span>Tiến trình</span><span>${pct}%</span></div><div class="ml-progress"><i style="width:${pct}%"></i></div><div class="text-[11px] font-bold text-slate-400 mt-1 text-right">${total.done}/${total.total} trải nghiệm</div></div></div></section>${cards}`;updateNavTabs('12. Math Lab – Toán tư duy Mỹ','✨',mathLabTrackShortTitle_(data));switchAppView('view-dashboard-grid')}
function openMathLabJourney(i){if(!mathLabCache?.journeys?.[i])return;stopSpeaking();mathLabState.view='activity';mathLabState.journeyIndex=Number(i);const j=mathLabCache.journeys[i],p=mathLabProgress_();let first=(j.activities||[]).findIndex(a=>!p[a.id]?.done);if(first<0)first=0;mathLabState.activityIndex=first;resetMathLabActivityState_();renderMathLabActivity_()}
function mathLabBase10Html_(m){if(!m||typeof m!=='object')return'';const h=Math.max(0,Number(m.hundreds||0)),t=Math.max(0,Number(m.tens||0)),o=Math.max(0,Number(m.ones||0));return `<div class="ml-base10"><div class="ml-block-group">${Array.from({length:Math.min(h,10)},()=>'<span class="ml-hundred"></span>').join('')}${Array.from({length:Math.min(t,20)},()=>'<span class="ml-ten"></span>').join('')}${Array.from({length:Math.min(o,30)},()=>'<span class="ml-one"></span>').join('')}</div><div class="w-full text-center text-xs font-black text-slate-500 mt-1">${h?`${h} trăm · `:''}${t?`${t} chục · `:''}${o} đơn vị</div></div>`}
function mathLabChoiceHtml_(x){if(x&&typeof x==='object'&&!Array.isArray(x))return mathLabBase10Html_(x);return `<span>${escapeHtml(String(x))}</span>`}
function mathLabStimulusHtml_(a){if(a.stimulus&&typeof a.stimulus==='object')return mathLabBase10Html_(a.stimulus);if(typeof a.stimulus==='string'||typeof a.stimulus==='number')return `<div class="text-center text-3xl md:text-4xl font-black text-violet-700 py-3 whitespace-pre-line">${escapeHtml(String(a.stimulus))}</div>`;if(a.collection?.clusters)return `<div class="ml-dotbox">${a.collection.clusters.map(n=>`<div class="ml-group">${Array.from({length:n},()=>'<i class="ml-dot"></i>').join('')}</div>`).join('')}</div>`;if(Number.isFinite(a.number))return `<div class="text-center text-4xl font-black text-violet-700 py-2">${a.number}</div>`;if(Number.isFinite(a.left)&&Number.isFinite(a.right))return `<div class="flex justify-center gap-4 py-3"><span class="ml-chip text-lg">${a.left}</span><span class="text-2xl font-black text-slate-300">?</span><span class="ml-chip text-lg">${a.right}</span></div>`;return''}
function mathLabCounter_(label,value,key,max=20){const lock=mathLabState.feedback?.correct?'disabled':'';return `<div class="ml-counter"><span class="font-black text-slate-500 min-w-[72px]">${escapeHtml(label)}</span><button ${lock} onclick="mathLabChangeGeneric('${key}',-1,${max})">−</button><strong>${value}</strong><button ${lock} onclick="mathLabChangeGeneric('${key}',1,${max})">+</button></div>`}
function mathLabInteractionHtml_(a){const lock=!!mathLabState.feedback?.correct;if(a.type==='open_number_line'||a.type==='measure_slider'){if(mathLabState.rangeValue===null)mathLabState.rangeValue=Math.round((Number(a.min)+Number(a.max))/2);return `<div class="ml-number-line"><div class="ml-number-line-value">${a.type==='measure_slider'?'Giá trị con chọn':'Vị trí con chọn'}: ${mathLabState.rangeValue}${a.unit?' '+escapeHtml(a.unit):''}</div><input ${lock?'disabled':''} type="range" min="${a.min}" max="${a.max}" step="1" value="${mathLabState.rangeValue}" oninput="mathLabSetRange(this.value)"><div class="ml-number-line-labels"><span>${a.min}</span><span>${Math.round((a.min+a.max)/2)}</span><span>${a.max}</span></div></div>`}
if(a.type==='base10_build'){const keys=a.allowed||['hundreds','tens','ones'],labs={hundreds:'Trăm',tens:'Chục',ones:'Đơn vị'};return `<div class="space-y-3">${mathLabBase10Html_(mathLabState.build)}<div class="grid grid-cols-1 sm:grid-cols-${Math.min(3,keys.length)} gap-2">${keys.map(k=>`<div class="ml-counter"><span class="font-black text-slate-500 min-w-[52px]">${labs[k]}</span><button ${lock?'disabled':''} onclick="mathLabChangeBuild('${k}',-1)">−</button><strong>${mathLabState.build[k]||0}</strong><button ${lock?'disabled':''} onclick="mathLabChangeBuild('${k}',1)">+</button></div>`).join('')}</div><div class="text-center text-sm font-black text-violet-700">Giá trị đang xây: ${(mathLabState.build.hundreds||0)*100+(mathLabState.build.tens||0)*10+(mathLabState.build.ones||0)}</div></div>`}
if(a.type==='bundle_trade'){const isH=Number.isFinite(a.tens_available),before=isH?{hundreds:0,tens:a.tens_available,ones:0}:{hundreds:0,tens:0,ones:a.ones_available};let after=before;if(mathLabState.tradeDone)after=isH?{hundreds:1,tens:a.tens_available-a.target_bundle_tens,ones:0}:{hundreds:0,tens:1,ones:a.ones_available-a.target_bundle};return `<div class="space-y-3">${mathLabBase10Html_(after)}<div class="text-center"><button ${lock?'disabled':''} onclick="mathLabDoTrade()" class="px-5 py-3 rounded-2xl bg-violet-600 text-white font-black pastel-btn">${mathLabState.tradeDone?'↩️ Đổi lại để quan sát':(isH?'🧺 Gom 10 chục → 1 trăm':'🧺 Bó 10 đơn vị → 1 chục')}</button></div></div>`}
if(a.type==='estimate_then_count'){const dots=Array.from({length:Number(a.actual||0)},()=>'<i class="ml-dot"></i>').join('');return `<div class="space-y-3"><div class="ml-dotbox">${dots}</div>${mathLabState.grouped?`<div class="text-center font-black text-violet-700">${a.expected_groups} nhóm 10 + ${a.remainder} vật lẻ = ${a.actual}</div>`:''}<div class="text-center"><button ${lock?'disabled':''} onclick="mathLabGroupEstimate()" class="px-5 py-3 rounded-2xl bg-violet-600 text-white font-black pastel-btn">🧺 Nhóm thành từng chục</button></div></div>`}
if(a.type==='order_numbers'){const picked=mathLabState.orderPicked||[];return `<div class="space-y-3"><div class="flex flex-wrap justify-center gap-2 min-h-[48px]">${picked.length?picked.map((x,i)=>`<span class="ml-chip text-lg">${i?'<b class="mr-2">→</b>':''}${x.value}</span>`).join(''):'<span class="text-sm font-bold text-slate-400">Chạm các số theo thứ tự</span>'}</div><div class="flex flex-wrap justify-center gap-2">${(a.numbers||[]).map((n,i)=>picked.some(x=>x.index===i)?'':`<button ${lock?'disabled':''} onclick="mathLabPickOrder(${i})" class="ml-choice !w-auto min-w-[88px] text-center text-xl">${n}</button>`).join('')}</div>${picked.length?'<div class="text-center"><button onclick="mathLabResetOrder()" class="text-xs font-black text-slate-500 underline">Làm lại thứ tự</button></div>':''}</div>`}
if(a.type==='group_build'){const g=mathLabState.groups,p=mathLabState.perGroup;return `<div class="space-y-3"><div class="ml-dotbox">${Array.from({length:g},()=>`<div class="ml-group">${Array.from({length:p},()=>'<i class="ml-dot"></i>').join('')}</div>`).join('')}</div><div class="grid sm:grid-cols-2 gap-2">${mathLabCounter_('Số nhóm',g,'groups',10)}${mathLabCounter_('Mỗi nhóm',p,'perGroup',10)}</div><div class="text-center font-black text-violet-700">${g} nhóm × ${p} = ${g*p} vật</div></div>`}
if(a.type==='array_build'){const r=mathLabState.rows,col=mathLabState.cols;return `<div class="space-y-3"><div class="ml-array" style="grid-template-columns:repeat(${col},15px)">${Array.from({length:r*col},()=>'<i></i>').join('')}</div><div class="grid sm:grid-cols-2 gap-2">${mathLabCounter_('Số hàng',r,'rows',10)}${mathLabCounter_('Mỗi hàng',col,'cols',10)}</div><div class="text-center font-black text-violet-700">${r} × ${col} = ${r*col} chấm</div></div>`}
if(a.type==='equal_share'){const rounds=mathLabState.shareRounds,g=Number(a.groups||1),used=rounds*g;return `<div class="space-y-3"><div class="flex flex-wrap justify-center gap-3">${Array.from({length:g},(_,i)=>`<div class="ml-sharebox"><div class="w-full text-center text-xs font-black text-slate-400">Nhóm ${i+1}</div>${Array.from({length:rounds},()=>'<i class="ml-dot"></i>').join('')}</div>`).join('')}</div><div class="text-center font-black text-violet-700">Đã chia ${used}/${a.total} vật • mỗi nhóm ${rounds}</div><div class="flex justify-center gap-2"><button ${lock||rounds<=0?'disabled':''} onclick="mathLabShareRound(-1)" class="px-4 py-2 rounded-xl border-2 border-violet-200 font-black">− 1 vòng</button><button ${lock||used+g>a.total?'disabled':''} onclick="mathLabShareRound(1)" class="px-4 py-2 rounded-xl bg-violet-600 text-white font-black">+ 1 vòng chia</button></div></div>`}
if(a.type==='money_build'){const den=a.denominations||[],sum=den.reduce((s,d)=>s+d*Number(mathLabState.moneyCounts[d]||0),0);return `<div class="space-y-3"><div class="text-center text-2xl font-black text-violet-700">${sum.toLocaleString('vi-VN')} đồng</div><div class="grid sm:grid-cols-${Math.min(3,den.length)} gap-2">${den.map(d=>`<div class="ml-counter"><span class="font-black text-slate-500">${d.toLocaleString('vi-VN')}đ</span><button ${lock?'disabled':''} onclick="mathLabChangeMoney(${d},-1)">−</button><strong>${mathLabState.moneyCounts[d]||0}</strong><button ${lock?'disabled':''} onclick="mathLabChangeMoney(${d},1)">+</button></div>`).join('')}</div></div>`}
if(a.type==='clock_set'){const h=mathLabState.clockHour,m=mathLabState.clockMinute,ha=(h%12)*30+m*.5,ma=m*6;const nums=Array.from({length:12},(_,i)=>{const n=i+1,ang=n*30*Math.PI/180,x=50+41*Math.sin(ang),y=50-41*Math.cos(ang);return `<span class="ml-clock-num" style="left:${x}%;top:${y}%">${n}</span>`}).join('');return `<div class="space-y-3"><div class="ml-clock">${nums}<i class="ml-hand ml-hour" style="transform:translateX(-50%) rotate(${ha}deg)"></i><i class="ml-hand ml-minute" style="transform:translateX(-50%) rotate(${ma}deg)"></i></div><div class="text-center text-xl font-black text-violet-700">${h}:${String(m).padStart(2,'0')}</div><div class="grid sm:grid-cols-2 gap-2">${mathLabCounter_('Giờ',h,'clockHour',12)}${mathLabCounter_('Phút',m,'clockMinute',59)}</div></div>`}
if(a.type==='calendar_pick'){const heads=['T2','T3','T4','T5','T6','T7','CN'],offset=Math.max(0,Number(a.start_weekday||1)-1),blanks=Array.from({length:offset},()=>'<div class="ml-cal-blank"></div>').join('');return `<div class="ml-calendar">${heads.map(x=>`<div class="ml-cal-head">${x}</div>`).join('')}${blanks}${Array.from({length:Number(a.days||30)},(_,i)=>{const d=i+1;return `<button ${lock?'disabled':''} onclick="mathLabPickDay(${d})" class="ml-cal-day ${mathLabState.selectedDay===d?'selected':''}">${d}</button>`}).join('')}</div>`}
if(a.type==='data_tally'){if(!mathLabState.tallyCounts.length)mathLabState.tallyCounts=(a.categories||[]).map(()=>0);return `<div class="space-y-2">${(a.categories||[]).map((cat,i)=>`<div class="grid grid-cols-[1fr_auto] gap-3 items-center rounded-2xl bg-slate-50 border border-slate-200 p-3"><div><div class="font-black text-slate-700">${escapeHtml(cat)}</div><div class="text-lg tracking-widest text-violet-600">${'|'.repeat(mathLabState.tallyCounts[i]||0)||'–'}</div></div><div class="ml-counter"><button ${lock?'disabled':''} onclick="mathLabChangeTally(${i},-1)">−</button><strong>${mathLabState.tallyCounts[i]||0}</strong><button ${lock?'disabled':''} onclick="mathLabChangeTally(${i},1)">+</button></div></div>`).join('')}</div>`}
if(Array.isArray(a.choices)){const multi=Array.isArray(a.answer_indices),cols=a.choices.length===2?'sm:grid-cols-2':a.choices.length===3?'sm:grid-cols-3':'sm:grid-cols-4';return `<div class="grid grid-cols-1 ${cols} gap-2">${a.choices.map((x,i)=>{const sel=multi?mathLabState.selectedMulti.includes(i):mathLabState.selectedIndex===i;let cls=sel?' is-selected':'';if(mathLabState.feedback?.correct&&sel)cls+=' is-correct';if(mathLabState.feedback&&!mathLabState.feedback.correct&&sel)cls+=' is-wrong';return `<button ${lock?'disabled':''} onclick="mathLabSelectChoice(${i},${multi?'true':'false'})" class="ml-choice${cls}">${mathLabChoiceHtml_(x)}</button>`}).join('')}</div>`}return `<div class="text-center text-sm font-bold text-slate-500">Hoạt động đang được chuẩn bị.</div>`}
function renderMathLabActivity_(){const data=mathLabCache,j=data?.journeys?.[mathLabState.journeyIndex],a=j?.activities?.[mathLabState.activityIndex];if(!j||!a)return renderMathLabTrack_(data);const c=document.getElementById('view-dashboard-grid');if(!c)return;c.className='w-full flex justify-center';const p=mathLabJourneyProgress_(j),dots=j.activities.map((x,i)=>`<i class="ml-step-dot ${mathLabProgress_()[x.id]?.done?'done':''} ${i===mathLabState.activityIndex?'current':''}"></i>`).join(''),hint=mathLabState.hintLevel>0?a.hints?.[mathLabState.hintLevel-1]:null,fb=mathLabState.feedback,badge=a.transfer?'<span class="ml-chip text-[11px]">Transfer</span>':'<span class="ml-chip text-[11px]">Khám phá</span>';c.innerHTML=`<section class="w-full max-w-4xl ml-journey-card p-4 md:p-6"><div class="flex flex-wrap items-start justify-between gap-3 border-b border-violet-100 pb-4"><div><div class="text-[11px] font-black text-fuchsia-500">${escapeHtml(j.id)} • ${escapeHtml(j.concept||'')}</div><h2 class="text-xl md:text-2xl font-black text-slate-900 mt-1">${j.icon||'✨'} ${escapeHtml(j.title)}</h2><div class="flex gap-1.5 items-center mt-2">${dots}</div></div><div class="text-right">${badge}<div class="text-xs font-black text-slate-400 mt-2">Trải nghiệm ${mathLabState.activityIndex+1}/${j.activities.length}</div><div class="text-[11px] font-bold text-slate-400">${p.done}/${p.total} đã hoàn thành</div></div></div><div class="mt-4 ml-teacher"><div class="flex items-start gap-2"><span class="text-xl">🐰</span><div class="flex-1">${escapeHtml(a.teacher||'')}</div><button onclick="mathLabSpeakCurrent()" class="shrink-0 w-9 h-9 rounded-xl bg-white border border-violet-200 text-violet-600">🔊</button></div></div><div class="mt-5 ml-prompt">${escapeHtml(a.prompt||'')}</div><div class="mt-4">${mathLabStimulusHtml_(a)}</div><div class="mt-4">${mathLabInteractionHtml_(a)}</div>${hint?`<div class="ml-hint mt-4">💡 ${escapeHtml(hint)}</div>`:''}${fb?`<div class="ml-feedback ${fb.correct?'ok':'no'} mt-4">${fb.correct?'🌟':'🌱'} ${escapeHtml(fb.message)}</div>`:''}<div class="mt-5 flex flex-wrap items-center justify-between gap-2"><div class="flex gap-2"><button onclick="mathLabBackActivity()" class="px-4 py-2.5 rounded-xl bg-white border-2 border-slate-200 text-slate-600 font-black pastel-btn">← ${mathLabState.activityIndex>0?'Trước':'Các hành trình'}</button><button onclick="mathLabShowHint()" class="px-4 py-2.5 rounded-xl bg-amber-50 border-2 border-amber-200 text-amber-700 font-black pastel-btn">💡 Gợi ý</button></div><div>${fb?.correct?`<button onclick="mathLabContinue()" class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white font-black pastel-btn">${mathLabState.activityIndex>=j.activities.length-1?'Hoàn thành Journey →':'Tiếp tục →'}</button>`:`<button onclick="mathLabCheckActivity()" class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-black pastel-btn">Kiểm tra cách nghĩ</button>`}</div></div></section>`;updateNavTabs('12. Math Lab – Toán tư duy Mỹ','✨',mathLabTrackShortTitle_(data),`${j.id} ${j.title}`);switchAppView('view-dashboard-grid')}
function mathLabSelectChoice(i,multi){if(mathLabState.feedback?.correct)return;if(multi){const s=new Set(mathLabState.selectedMulti||[]);s.has(i)?s.delete(i):s.add(i);mathLabState.selectedMulti=[...s]}else mathLabState.selectedIndex=Number(i);mathLabState.feedback=null;renderMathLabActivity_()}
function mathLabSetRange(v){mathLabState.rangeValue=Number(v);mathLabState.feedback=null;renderMathLabActivity_()}
function mathLabChangeBuild(k,d){if(mathLabState.feedback?.correct)return;mathLabState.build[k]=Math.max(0,Math.min(20,(mathLabState.build[k]||0)+Number(d)));mathLabState.feedback=null;renderMathLabActivity_()}
function mathLabChangeGeneric(k,d,max=20){if(mathLabState.feedback?.correct)return;let v=Number(mathLabState[k]||0)+Number(d);if(k==='clockHour'){if(v<1)v=12;if(v>12)v=1}else if(k==='clockMinute'){v=Math.max(0,Math.min(59,v))}else v=Math.max(1,Math.min(Number(max)||20,v));mathLabState[k]=v;mathLabState.feedback=null;renderMathLabActivity_()}
function mathLabDoTrade(){if(mathLabState.feedback?.correct)return;mathLabState.tradeDone=!mathLabState.tradeDone;mathLabState.feedback=null;renderMathLabActivity_()}
function mathLabGroupEstimate(){if(mathLabState.feedback?.correct)return;mathLabState.grouped=true;mathLabState.feedback=null;renderMathLabActivity_()}
function mathLabPickOrder(i){if(mathLabState.feedback?.correct)return;const a=mathLabCache?.journeys?.[mathLabState.journeyIndex]?.activities?.[mathLabState.activityIndex];if(!a||mathLabState.orderPicked.some(x=>x.index===i))return;mathLabState.orderPicked.push({index:i,value:a.numbers[i]});mathLabState.feedback=null;renderMathLabActivity_()}
function mathLabResetOrder(){mathLabState.orderPicked=[];mathLabState.feedback=null;renderMathLabActivity_()}
function mathLabShareRound(d){const a=mathLabCache?.journeys?.[mathLabState.journeyIndex]?.activities?.[mathLabState.activityIndex];if(!a)return;mathLabState.shareRounds=Math.max(0,mathLabState.shareRounds+Number(d));mathLabState.feedback=null;renderMathLabActivity_()}
function mathLabChangeMoney(den,d){const k=String(den);mathLabState.moneyCounts[k]=Math.max(0,Math.min(20,Number(mathLabState.moneyCounts[k]||0)+Number(d)));mathLabState.feedback=null;renderMathLabActivity_()}
function mathLabPickDay(d){mathLabState.selectedDay=Number(d);mathLabState.feedback=null;renderMathLabActivity_()}
function mathLabChangeTally(i,d){mathLabState.tallyCounts[i]=Math.max(0,Math.min(20,Number(mathLabState.tallyCounts[i]||0)+Number(d)));mathLabState.feedback=null;renderMathLabActivity_()}
function mathLabEqual_(a,b){return JSON.stringify(a)===JSON.stringify(b)}
function mathLabCheckActivity(){const j=mathLabCache?.journeys?.[mathLabState.journeyIndex],a=j?.activities?.[mathLabState.activityIndex];if(!a)return;let ok=false,has=true;if(a.type==='open_number_line'||a.type==='measure_slider'){has=mathLabState.rangeValue!==null;ok=has&&Math.abs(mathLabState.rangeValue-Number(a.target))<=Number(a.tolerance||0)}else if(a.type==='base10_build'){const e=a.expected||{};ok=['hundreds','tens','ones'].every(k=>Number(mathLabState.build[k]||0)===Number(e[k]||0))}else if(a.type==='bundle_trade'){has=mathLabState.tradeDone;ok=has}else if(a.type==='estimate_then_count'){has=mathLabState.grouped;ok=has}else if(a.type==='order_numbers'){has=mathLabState.orderPicked.length===(a.numbers||[]).length;ok=has&&mathLabEqual_(mathLabState.orderPicked.map(x=>x.value),a.answer)}else if(a.type==='group_build'){ok=Number(mathLabState.groups)===Number(a.expected_groups)&&Number(mathLabState.perGroup)===Number(a.expected_per_group)}else if(a.type==='array_build'){ok=Number(mathLabState.rows)===Number(a.expected_rows)&&Number(mathLabState.cols)===Number(a.expected_cols)}else if(a.type==='equal_share'){has=mathLabState.shareRounds>0;ok=Number(mathLabState.shareRounds)===Number(a.answer_each)&&Number(mathLabState.shareRounds)*Number(a.groups)===Number(a.total)}else if(a.type==='money_build'){const sum=(a.denominations||[]).reduce((s,d)=>s+Number(d)*Number(mathLabState.moneyCounts[d]||0),0);has=sum>0;ok=sum===Number(a.target)}else if(a.type==='clock_set'){has=true;ok=Number(mathLabState.clockHour)===Number(a.target_hour)&&Number(mathLabState.clockMinute)===Number(a.target_minute)}else if(a.type==='calendar_pick'){has=mathLabState.selectedDay!==null;ok=Number(mathLabState.selectedDay)===Number(a.target_day)}else if(a.type==='data_tally'){has=(mathLabState.tallyCounts||[]).some(x=>x>0);ok=mathLabEqual_((mathLabState.tallyCounts||[]).map(Number),(a.targets||[]).map(Number))}else if(Array.isArray(a.answer_indices)){has=(mathLabState.selectedMulti||[]).length>0;const x=[...(mathLabState.selectedMulti||[])].sort((m,n)=>m-n),y=[...a.answer_indices].sort((m,n)=>m-n);ok=has&&mathLabEqual_(x,y)}else if(Array.isArray(a.choices)){has=mathLabState.selectedIndex!==null;if(has)ok=Number.isInteger(a.answer_index)?Number(mathLabState.selectedIndex)===Number(a.answer_index):mathLabEqual_(a.choices[mathLabState.selectedIndex],a.answer)}else has=false;if(!has)return showAppNotice('Con hãy thao tác hoặc chọn một cách nghĩ trước nhé!');if(ok){mathLabMarkDone_(a.id);mathLabState.feedback={correct:true,message:a.success||'Con đã hiểu đúng ý tưởng này!'};if(a.success_audio)speakVietnamese(a.success_audio,.92)}else{mathLabState.feedback={correct:false,message:a.wrong_audio||'Chưa khớp rồi. Con thử quan sát lại nhé.'};mathLabState.hintLevel=Math.max(1,mathLabState.hintLevel||0);if(a.wrong_audio)speakVietnamese(a.wrong_audio,.92)}renderMathLabActivity_()}
function mathLabShowHint(){const a=mathLabCache?.journeys?.[mathLabState.journeyIndex]?.activities?.[mathLabState.activityIndex];if(!a?.hints?.length)return showAppNotice('Hoạt động này không cần thêm gợi ý.');mathLabState.hintLevel=Math.min(a.hints.length,(mathLabState.hintLevel||0)+1);if(a.hints_audio?.[mathLabState.hintLevel-1])speakVietnamese(a.hints_audio[mathLabState.hintLevel-1],.92);renderMathLabActivity_()}
function mathLabSpeakCurrent(){const a=mathLabCache?.journeys?.[mathLabState.journeyIndex]?.activities?.[mathLabState.activityIndex];if(a)speakVietnamese([a.teacher_audio||a.teacher,a.instruction_audio||a.prompt].filter(Boolean).join('. '),.92)}
function mathLabBackActivity(){stopSpeaking();if(mathLabState.activityIndex>0){mathLabState.activityIndex--;resetMathLabActivityState_();return renderMathLabActivity_()}return renderMathLabTrack_(mathLabCache)}
function mathLabContinue(){const j=mathLabCache?.journeys?.[mathLabState.journeyIndex];if(!j)return;if(mathLabState.activityIndex<j.activities.length-1){mathLabState.activityIndex++;resetMathLabActivityState_();return renderMathLabActivity_()}return renderMathLabJourneyComplete_()}
function renderMathLabJourneyComplete_(){const j=mathLabCache?.journeys?.[mathLabState.journeyIndex];if(!j)return renderMathLabTrack_(mathLabCache);const c=document.getElementById('view-dashboard-grid');c.className='w-full flex justify-center';const ev=(j.evidence||[]).map(x=>`<li class="flex gap-2"><span>✓</span><span>${escapeHtml(x)}</span></li>`).join('');c.innerHTML=`<section class="w-full max-w-3xl ml-hero text-center"><div class="text-5xl mb-2">🌟</div><div class="ml-kicker">Journey complete</div><h2 class="text-2xl md:text-3xl font-black text-slate-900 mt-1">${escapeHtml(j.title)}</h2><p class="font-bold text-slate-600 mt-3">Con vừa hoàn thành một hành trình khám phá, không phải chỉ một bộ câu hỏi.</p><div class="mt-5 text-left bg-white/80 border border-violet-100 rounded-2xl p-4"><div class="text-sm font-black text-violet-700 mb-2">Con đã luyện cách:</div><ul class="space-y-2 text-sm font-bold text-slate-600">${ev}</ul></div><div class="mt-5 flex flex-wrap justify-center gap-2"><button onclick="renderMathLabTrack_(mathLabCache)" class="px-5 py-3 rounded-xl bg-white border-2 border-violet-200 text-violet-700 font-black pastel-btn">← Chọn Journey khác</button><button onclick="openMathLabJourney(${mathLabState.journeyIndex})" class="px-5 py-3 rounded-xl bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white font-black pastel-btn">Khám phá lại</button></div></section>`;updateNavTabs('12. Math Lab – Toán tư duy Mỹ','✨',mathLabTrackShortTitle_(mathLabCache),`${j.id} ${j.title}`);switchAppView('view-dashboard-grid')}


// ==========================================
// 12. VƯỜN THƠ TOÁN HỌC
// 50 bài thơ ngắn bao quát các mảng kiến thức Toán 2.
// Đây là nội dung đọc – nghe – ghi nhớ, không chấm điểm.
// ==========================================
function poetrySentenceCase_(text) {
    const s = String(text || '').trim().toLocaleLowerCase('vi-VN');
    return s ? s.charAt(0).toLocaleUpperCase('vi-VN') + s.slice(1) : '';
}

async function loadPoetryGardenData() {
    if (poetryGardenCache) return poetryGardenCache;
    const res = await fetch('assets/data/vuon_tho_toan_hoc.json');
    if (!res.ok) throw new Error('Không thể tải Vườn thơ Toán học');
    poetryGardenCache = await res.json();
    return poetryGardenCache;
}

async function openPoetryGarden() {
    setAppShellRootMode_(false);
    stopSpeaking();
    activeTopicId = 12;
    activeExamContext = null;
    activeRoadmapContext = null;
    pendingTopicQuiz = null;
    poetryGardenState = { category: null, poemIndex: null };
    setMainTabActive_('discover');
    updateNavTabs('12. Vườn thơ toán học', '', null);
    showLoadingOverlay('Cô Thỏ Ngọc đang mở Vườn thơ toán học...');
    try {
        const data = await loadPoetryGardenData();
        hideLoadingOverlay();
        renderPoetryCategories(data);
    } catch (err) {
        hideLoadingOverlay();
        showAppNotice(err.message || 'Không tải được Vườn thơ toán học');
    }
}

function getPoetryCategoryList_(data) {
    const map = new Map();
    (data?.poems || []).forEach(p => {
        if (!map.has(p.category)) map.set(p.category, { name: p.category, icon: p.category_icon || '🌷', poems: [] });
        map.get(p.category).poems.push(p);
    });
    return [...map.values()];
}

function renderPoetryCategories(data) {
    const container = document.getElementById('view-dashboard-grid');
    if (!container) return;
    const cats = getPoetryCategoryList_(data || poetryGardenCache);
    poetryGardenState = { category: null, poemIndex: null };
    container.className = 'w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5';
    container.innerHTML = cats.map((c, idx) => {
        const p = SUBTOPIC_PALETTES[idx % SUBTOPIC_PALETTES.length];
        return `<button onclick="renderPoetryCategory(${idx})" class="p-4 ${p.card} border-2 rounded-2xl text-left shadow-sm pastel-btn min-h-[112px] flex flex-col justify-between">
            <div class="flex items-start justify-between gap-3">
                <span class="text-base md:text-lg font-black leading-snug"><span class="mr-2 text-xl">${c.icon}</span>${escapeHtml(poetrySentenceCase_(c.name))}</span>
                <span class="text-xs font-extrabold ${p.badge} px-2.5 py-0.5 rounded-full border shrink-0">${c.poems.length} bài</span>
            </div>
            <span class="mt-2 text-xs md:text-sm font-bold text-slate-500">Đọc vui – nghe thơ – nhớ Toán thật tự nhiên.</span>
        </button>`;
    }).join('');
    updateNavTabs('12. Vườn thơ toán học', '', null);
    switchAppView('view-dashboard-grid');
}

function ensurePoetryGardenStyles_() {
    if (document.getElementById('poetry-garden-effects-style')) return;
    const style = document.createElement('style');
    style.id = 'poetry-garden-effects-style';
    style.textContent = `
        .poetry-scene { position: relative; overflow: hidden; isolation: isolate; }
        .poetry-scene > .poetry-content { position: relative; z-index: 5; }
        .poetry-cloud { position:absolute; z-index:1; opacity:.72; filter:drop-shadow(0 4px 8px rgba(148,163,184,.12)); animation:poetryCloud linear infinite; pointer-events:none; }
        .poetry-cloud.c1 { top:8%; left:-16%; font-size:3.2rem; animation-duration:24s; }
        .poetry-cloud.c2 { top:24%; left:-24%; font-size:2.5rem; animation-duration:31s; animation-delay:-8s; opacity:.5; }
        .poetry-cloud.c3 { top:54%; left:-18%; font-size:2rem; animation-duration:27s; animation-delay:-15s; opacity:.38; }
        @keyframes poetryCloud { from{transform:translateX(0)} to{transform:translateX(120vw)} }
        .poetry-bird { position:absolute; z-index:2; pointer-events:none; animation:poetryBird linear infinite; opacity:.78; }
        .poetry-bird.b1 { top:15%; left:-8%; font-size:1.6rem; animation-duration:15s; }
        .poetry-bird.b2 { top:34%; left:-10%; font-size:1.25rem; animation-duration:20s; animation-delay:-7s; }
        @keyframes poetryBird { 0%{transform:translate(0,0) rotate(-4deg)} 50%{transform:translate(55vw,-18px) rotate(4deg)} 100%{transform:translate(112vw,7px) rotate(-3deg)} }
        .poetry-wind { position:absolute; z-index:2; pointer-events:none; opacity:.20; animation:poetryWind 5s ease-in-out infinite; }
        .poetry-wind.w1 { top:38%; left:5%; font-size:2.2rem; }
        .poetry-wind.w2 { top:67%; right:7%; font-size:1.9rem; animation-delay:-2s; }
        @keyframes poetryWind { 0%,100%{transform:translateX(0) scaleX(1)} 50%{transform:translateX(18px) scaleX(1.08)} }
        .poetry-leaf { position:absolute; top:-12%; z-index:3; pointer-events:none; animation:poetryLeaf linear infinite; opacity:.78; }
        @keyframes poetryLeaf { 0%{transform:translate3d(0,-10vh,0) rotate(0deg)} 50%{transform:translate3d(38px,52vh,0) rotate(190deg)} 100%{transform:translate3d(-18px,112vh,0) rotate(380deg)} }
        .poetry-deco { position:absolute; z-index:2; pointer-events:none; opacity:.82; animation:poetryFloat 4s ease-in-out infinite; }
        @keyframes poetryFloat { 0%,100%{transform:translateY(0) rotate(-3deg)} 50%{transform:translateY(-8px) rotate(3deg)} }
        @media (prefers-reduced-motion: reduce) {
            .poetry-cloud,.poetry-bird,.poetry-wind,.poetry-leaf,.poetry-deco { animation:none !important; }
        }
    `;
    document.head.appendChild(style);
}

async function renderPoetryCategory(categoryIndex) {
    const data = poetryGardenCache || await loadPoetryGardenData();
    const cats = getPoetryCategoryList_(data);
    const cat = cats[categoryIndex];
    if (!cat) return openPoetryGarden();
    poetryGardenState = { category: categoryIndex, poemIndex: null };
    const container = document.getElementById('view-dashboard-grid');
    container.className = 'w-full grid grid-cols-1 sm:grid-cols-2 gap-2.5';
    container.innerHTML = cat.poems.map((p, idx) => `
        <button onclick="openMathPoem(${categoryIndex}, ${idx})" class="pastel-card px-4 py-3 text-left hover:border-rose-400 transition-all pastel-btn flex items-center min-h-[58px]">
            <div class="text-base md:text-lg font-black text-purple-700 leading-snug">Bài ${Number(p.no || idx + 1)}. ${escapeHtml(poetrySentenceCase_(p.title))}</div>
        </button>`).join('');
    updateNavTabs('12. Vườn thơ toán học', '', poetrySentenceCase_(cat.name));
    switchAppView('view-dashboard-grid');
}

async function openMathPoem(categoryIndex, poemIndex) {
    setAppShellRootMode_(false);
    stopSpeaking();
    ensurePoetryGardenStyles_();
    const data = poetryGardenCache || await loadPoetryGardenData();
    const cats = getPoetryCategoryList_(data);
    const cat = cats[categoryIndex];
    const poem = cat?.poems?.[poemIndex];
    if (!poem) return renderPoetryCategory(categoryIndex);
    poetryGardenState = { category: categoryIndex, poemIndex };
    const container = document.getElementById('view-dashboard-grid');
    container.className = 'w-full flex justify-center';
    const lines = (poem.lines || []).map((line, i) => `<div class="text-lg md:text-2xl font-extrabold text-slate-700 leading-[1.65] ${i % 2 ? 'md:translate-x-2' : 'md:-translate-x-2'}">${escapeHtml(line)}</div>`).join('');
    const leaves = ['🍂','🍁','🍃','🍂','🍁','🍃','🍂','🍁'].map((x,i) => `<span class="poetry-leaf" style="left:${8+i*12}%;font-size:${1.0+(i%3)*0.28}rem;animation-duration:${8+(i%4)*2}s;animation-delay:-${i*1.15}s">${x}</span>`).join('');
    const decoByCat = [
        ['🔢','⭐','➕','🌼'],
        ['📐','🔺','🟦','🧩'],
        ['📏','⏰','⚖️','💧'],
        ['✖️','➗','🍓','🖐️'],
        ['🧠','📊','🍎','✨']
    ];
    const d = decoByCat[categoryIndex % decoByCat.length];
    container.innerHTML = `
        <div class="w-full max-w-3xl pastel-card poetry-scene border-2 border-rose-200 min-h-[560px] bg-gradient-to-b from-sky-50 via-white to-amber-50">
            <span class="poetry-cloud c1">☁️</span><span class="poetry-cloud c2">☁️</span><span class="poetry-cloud c3">☁️</span>
            <span class="poetry-bird b1">🕊️</span><span class="poetry-bird b2">🐦</span>
            <span class="poetry-wind w1">〰️</span><span class="poetry-wind w2">〰️</span>${leaves}
            <span class="poetry-deco" style="left:5%;bottom:10%;font-size:2rem">${d[0]}</span>
            <span class="poetry-deco" style="right:6%;bottom:14%;font-size:2rem;animation-delay:-1.3s">${d[1]}</span>
            <span class="poetry-deco" style="left:8%;top:31%;font-size:1.7rem;animation-delay:-2.1s">${d[2]}</span>
            <span class="poetry-deco" style="right:8%;top:34%;font-size:1.8rem;animation-delay:-.7s">${d[3]}</span>
            <div class="poetry-content">
                <div class="px-5 md:px-8 py-5 text-center border-b border-pink-100 bg-white/65 backdrop-blur-[2px]">
                    <div class="text-4xl mb-2">${cat.icon}</div>
                    <div class="text-xs md:text-sm font-black text-rose-500 uppercase tracking-wide">Vườn thơ toán học</div>
                    <h2 class="text-2xl md:text-3xl font-black text-purple-700 mt-1">Bài ${Number(poem.no || poemIndex + 1)}. ${escapeHtml(poetrySentenceCase_(poem.title))}</h2>
                </div>
                <div class="px-5 md:px-10 py-7 md:py-9 text-center bg-white/62 backdrop-blur-[1.5px] mx-3 md:mx-6 my-4 rounded-[28px] border border-white/80 shadow-sm">${lines}</div>
                <div class="px-4 md:px-6 py-4 border-t border-pink-100 bg-white/70 backdrop-blur-[2px] grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                    <div class="flex justify-start">
                        <button onclick="openMathPoem(${categoryIndex}, ${poemIndex - 1})" ${poemIndex <= 0 ? 'disabled' : ''} class="h-10 px-4 py-0 rounded-xl bg-white border-2 border-purple-200 text-purple-700 font-black pastel-btn disabled:opacity-35 disabled:cursor-not-allowed flex items-center justify-center">← Bài trước</button>
                    </div>
                    <div class="flex flex-col items-center justify-center gap-2">
                        <div class="px-4 py-1.5 rounded-full bg-white border-2 border-pink-200 text-pink-600 font-black text-sm md:text-base shadow-sm">${poemIndex + 1}/${cat.poems.length}</div>
                        <button onclick="speakMathPoem(${categoryIndex}, ${poemIndex})" class="px-4 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-black pastel-btn whitespace-nowrap">🔊 Nghe Cô Thỏ Ngọc đọc</button>
                    </div>
                    <div class="flex justify-end">
                        <button onclick="openMathPoem(${categoryIndex}, ${poemIndex + 1})" ${poemIndex >= cat.poems.length - 1 ? 'disabled' : ''} class="h-10 px-4 py-0 rounded-xl bg-white border-2 border-purple-200 text-purple-700 font-black pastel-btn disabled:opacity-35 disabled:cursor-not-allowed flex items-center justify-center">Bài tiếp theo →</button>
                    </div>
                </div>
            </div>
        </div>`;
    updateNavTabs('12. Vườn thơ toán học', '', poetrySentenceCase_(cat.name), `Bài ${Number(poem.no || poemIndex + 1)}. ${poetrySentenceCase_(poem.title)}`);
    switchAppView('view-dashboard-grid');
}

async function speakMathPoem(categoryIndex, poemIndex) {
    const data = poetryGardenCache || await loadPoetryGardenData();
    const cats = getPoetryCategoryList_(data);
    const poem = cats[categoryIndex]?.poems?.[poemIndex];
    if (!poem) return;
    speakVietnamese(`${poem.title}. ${(poem.lines || []).join('. ')}`, 0.90);
}

// ==========================================
// TIẾN TRÌNH TUẦN: BẢN ĐỒ SVG
// ==========================================
function handleNextExamFromReport() {
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

function openRoadmap() {
    stopSpeaking();
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
            badgeHtml = `<text x="${coord.x}" y="${coord.y + 40}" text-anchor="middle" font-size="16" fill="#f59e0b">⭐⭐⭐</text>`;
        } else if (isCurrent) {
            badgeHtml = `<text x="${coord.x}" y="${coord.y + 40}" text-anchor="middle" font-size="12" font-weight="900" fill="#ec4899">Đang học</text>`;
        } else {
            badgeHtml = `<text x="${coord.x}" y="${coord.y + 38}" text-anchor="middle" font-size="14" fill="#94a3b8">🔒 Khóa</text>`;
        }

        const cursorCls = isLocked ? "cursor-not-allowed opacity-60" : "cursor-pointer hover:scale-105 transition-transform";
        const animCls = isCurrent ? "node-current" : "";

        nodesHtml += `
            <g class="${cursorCls} ${animCls}" onclick="selectRoadmapWeek(${w})" id="svg-node-week-${w}">
                <circle cx="${coord.x}" cy="${coord.y}" r="40" fill="#ffffff" stroke="${strokeColor}" stroke-width="4" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.08))"/>
                <circle cx="${coord.x}" cy="${coord.y}" r="34" fill="${nodeColor}" opacity="${isLocked ? '0.25' : '0.15'}"/>
                <text x="${coord.x}" y="${coord.y - 4}" text-anchor="middle" font-size="24">${item.icon || '🔢'}</text>
                <text x="${coord.x}" y="${coord.y + 18}" text-anchor="middle" font-size="13" font-weight="800" fill="${isLocked ? '#64748b' : '#1e293b'}">Tuần ${w}</text>
                ${badgeHtml}
            </g>
        `;
    }

    const pathD = buildRoadmapPathD(TOTAL_ROADMAP_WEEKS);
    const svgHtml = `
        <svg viewBox="0 0 900 490" class="w-full max-h-[74vh] select-none" xmlns="http://www.w3.org/2000/svg">
            <path d="${pathD}" fill="none" stroke="#fbcfe8" stroke-width="12" stroke-dasharray="14,14" stroke-linecap="round"/>
            <path d="${pathD}" fill="none" stroke="#f472b6" stroke-width="4" stroke-dasharray="14,14" stroke-linecap="round"/>
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
        return showAppNotice(`Tuần ${weekNum} đang bị khóa. Bé hãy hoàn thành Tuần ${tuanHienTai} đạt từ 80% trở lên để mở khóa nhé!`);
    }

    if (config.isExam) return openExamHub();

    activeRoadmapContext = { week: weekNum, topicId: config.subIds[0] || '1.1', chuDe: config.name };
    pendingTopicQuiz = null; activeExamContext = null;
    const topicLabel = config.name.replace(/^Tuần\s*\d+:\s*/i, '');
    updateNavTabs("Tiến trình tuần", "📅", `Tuần ${weekNum}`, topicLabel);

    showLoadingOverlay(`Đang bốc 30 câu hỏi Tuần ${weekNum} (tỷ lệ 3:4:3)...`);
    try {
        await fetchAllTopicsData();
        hideLoadingOverlay();

        const weekQuestions = getQuestionsForWeek343(weekNum);
        if (!weekQuestions.length) return showAppNotice('Tuần này đang chuẩn bị thêm câu hỏi, bé quay lại sau nhé!');

        startTopicQuiz(weekNum, config.name, weekQuestions, null);
    } catch (err) {
        hideLoadingOverlay();
        showAppNotice(`Lỗi tải dữ liệu tuần: ${err.message}`);
    }
}

// ==========================================
// CHUẨN HÓA ĐIỀU HƯỚNG TRƯỚC / SAU
// - Chiều cao nút: 40px
// - Khoảng cách từ nội dung/đáp án đến hàng điều hướng: 20px (= 1/2 chiều cao nút)
// Áp dụng thống nhất cho luyện tập, Khám phá, tiến trình và đề thi.
// ==========================================
const QUIZ_NAV_BUTTON_HEIGHT_PX = 40;
const QUIZ_NAV_TOP_GAP_PX = QUIZ_NAV_BUTTON_HEIGHT_PX / 2;

function ensureUnifiedQuizNavStyles_() {
    if (document.getElementById('epsilon-unified-quiz-nav-style')) return;
    const style = document.createElement('style');
    style.id = 'epsilon-unified-quiz-nav-style';
    style.textContent = `
        #view-quiz #question-box { margin-bottom: 0 !important; }
        #view-quiz #quiz-bottom-nav { padding-top: 0 !important; }
        #view-quiz #nav-group-practice,
        #view-quiz #nav-group-exam {
            margin-top: ${QUIZ_NAV_TOP_GAP_PX}px !important;
        }
        #view-quiz #btn-prev-q-prac,
        #view-quiz #btn-next-q-prac,
        #view-quiz #btn-prev-q-exam,
        #view-quiz #btn-next-q-exam {
            height: ${QUIZ_NAV_BUTTON_HEIGHT_PX}px !important;
            min-height: ${QUIZ_NAV_BUTTON_HEIGHT_PX}px !important;
            max-height: ${QUIZ_NAV_BUTTON_HEIGHT_PX}px !important;
            padding-top: 0 !important;
            padding-bottom: 0 !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
        }
        #view-quiz #practice-step-indicator {
            height: ${QUIZ_NAV_BUTTON_HEIGHT_PX}px !important;
            min-height: ${QUIZ_NAV_BUTTON_HEIGHT_PX}px !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
        }
    `;
    document.head.appendChild(style);
}

// ==========================================
// LOGIC CHẤM ĐIỂM & ĐIỀU KHIỂN CÂU HỎI
// ==========================================
function startTopicQuiz(topicNum, topicName, questions, subLabel) {
    ensureUnifiedQuizNavStyles_();
    setAppShellRootMode_(false);
    stopSpeaking();
    clearInterval(quizTimerInterval);
    activeQuestionsList = questions; 
    currentQIndex = 0; 
    score = 0;
    userAnswers = {};
    wrongAttemptsByQ = {};
    orderInteractionState = {};
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

function getOperationTermsMeta_(q) {
    if (!q || q.explore_type !== 'operation_terms') return null;
    const raw = String(q.question_text || '').replace(/×/g, 'x').replace(/−/g, '-');
    const equation = raw.match(/(\d+)\s*([+\-])\s*(\d+)\s*=\s*(\d+)/);
    if (!equation) return null;

    const left = equation[1];
    const op = equation[2];
    const right = equation[3];
    const result = equation[4];
    const targetMatch = raw.match(/số\s*(\d+)\s*gọi là gì/i) || raw.match(/thành phần số\s*(\d+)/i);
    const target = targetMatch?.[1] || left;
    const labels = op === '+'
        ? ['Số hạng', 'Số hạng', 'Tổng']
        : ['Số bị trừ', 'Số trừ', 'Hiệu'];

    return { left, op, right, result, target, labels };
}

function revealOperationTermsFeedback_(q) {
    const meta = getOperationTermsMeta_(q);
    if (!meta) return;
    document.querySelectorAll('[data-operation-term-label]').forEach(el => el.classList.remove('hidden'));
    const summary = document.querySelector('[data-operation-terms-summary]');
    if (summary) summary.classList.remove('hidden');
}

function isCarryConceptQuestion_(q) {
    return !!q && ['mental_carry_20', 'vertical_carry_100'].includes(String(q.explore_type || ''));
}

function isCarryLearningGuided_() {
    return String(pendingTopicQuiz?.carryLearningMode || '') === 'guided';
}

function isCarryLearningPractice_() {
    return String(pendingTopicQuiz?.carryLearningMode || '') === 'practice';
}

function getCarryConceptMeta_(q) {
    if (!isCarryConceptQuestion_(q)) return null;
    const raw = String(q.question_text || '').replace(/×/g, 'x').replace(/−/g, '-');
    const m = raw.match(/(\d+)\s*([+\-])\s*(\d+)\s*=\s*\?/);
    if (!m) return null;
    const a = Number(m[1]);
    const op = m[2];
    const b = Number(m[3]);
    const answer = Number(q.answer);
    if (![a, b, answer].every(Number.isFinite)) return null;

    const vd = q.visual_data || {};
    let anchor = Number(vd.anchor);
    let splitNumber = Number(vd.split_number);
    let toTen = Number(vd.to_ten);
    let remainder = Number(vd.remainder);

    if (op === '+') {
        if (!Number.isFinite(anchor)) anchor = Math.max(a % 10, b % 10);
        if (!Number.isFinite(splitNumber)) splitNumber = (anchor === (a % 10)) ? (b % 10) : (a % 10);
        if (!Number.isFinite(toTen)) toTen = 10 - anchor;
        if (!Number.isFinite(remainder)) remainder = splitNumber - toTen;
    } else {
        const aOnes = a % 10;
        const bOnes = b % 10;
        if (!Number.isFinite(splitNumber)) splitNumber = q.explore_type === 'vertical_carry_100' ? bOnes : b;
        if (!Number.isFinite(toTen)) toTen = q.explore_type === 'vertical_carry_100' ? aOnes : (a - 10);
        if (!Number.isFinite(remainder)) remainder = splitNumber - toTen;
    }

    return {
        a, op, b, answer,
        type: String(q.explore_type || ''),
        anchor, splitNumber, toTen, remainder,
        carry: Number(vd.carry ?? 1),
        borrow: Number(vd.borrow ?? (op === '-' ? 1 : 0)),
        onesResult: Number(vd.ones_result),
        tensResult: Number(vd.tens_result)
    };
}

function renderMakeTenTable_(anchor) {
    const rows = [[9,1],[8,2],[7,3],[6,4],[5,5]];
    return `<div class="w-full rounded-2xl border-2 border-amber-200 bg-amber-50/70 px-2.5 py-2 shadow-sm">
        <div class="text-center text-base md:text-lg font-black text-amber-700 mb-1.5">BẢNG VỀ 10</div>
        <div class="space-y-0.5">${rows.map(([a,b]) => {
            const active = Number(anchor) === a;
            return `<div class="rounded-xl border px-2 py-1 min-h-[35px] text-center text-lg md:text-xl font-black transition-all flex items-center justify-center ${active ? 'border-emerald-400 bg-emerald-100 text-emerald-800 shadow-sm scale-[1.02]' : 'border-amber-100 bg-white/80 text-slate-700'}">
                <span class="${active ? 'text-rose-600' : ''}">${a}</span>&nbsp;+&nbsp;${b}&nbsp;=&nbsp;<span class="${active ? 'text-emerald-700' : ''}">10</span>
            </div>`;
        }).join('')}</div>
    </div>`;
}

function revealCarryConceptFeedback_(q) {
    if (!isCarryConceptQuestion_(q) || !isCarryLearningGuided_()) return;
    const meta = getCarryConceptMeta_(q);
    if (meta && meta.type === 'vertical_carry_100') {
        const tens = Math.floor(Number(meta.answer) / 10);
        const ones = Number(meta.answer) % 10;
        document.querySelectorAll('[data-carry-answer-tens]').forEach(el => {
            el.textContent = String(tens);
            el.classList.remove('text-slate-300');
            el.classList.add('text-emerald-700');
        });
        document.querySelectorAll('[data-carry-answer-ones]').forEach(el => {
            el.textContent = String(ones);
            el.classList.remove('text-slate-300');
            el.classList.add('text-emerald-700');
        });
    }
    document.querySelectorAll('[data-carry-concept-feedback]').forEach(el => el.classList.remove('hidden', 'invisible'));
    document.querySelectorAll('[data-carry-one]').forEach(el => {
        el.classList.remove('opacity-25', 'text-slate-300', 'border-slate-200', 'bg-slate-50', 'text-rose-600', 'border-rose-300', 'bg-rose-50');
        el.classList.add('opacity-100', 'text-blue-600', 'border-blue-300', 'bg-blue-50');
    });
}

function buildCarryLearningPresentation_(q) {
    if (!isCarryConceptQuestion_(q)) return null;
    const mode = String(pendingTopicQuiz?.carryLearningMode || '');
    if (!['guided', 'practice'].includes(mode)) return null;
    const guided = mode === 'guided';
    const meta = getCarryConceptMeta_(q);
    if (!meta) return null;
    const { a, op, b, answer, type, anchor, splitNumber, toTen, remainder } = meta;
    const symbol = op === '+' ? '+' : '−';
    const speaker = `<button onclick="speakCurrentQuestion()" class="absolute top-2.5 right-2.5 w-8 h-8 bg-pink-50 hover:bg-pink-100 text-pink-700 border border-pink-200 rounded-xl flex items-center justify-center pastel-btn shadow-xs" title="Nghe câu hỏi" aria-label="Nghe câu hỏi"><i class="fa-solid fa-volume-high text-pink-600 text-xs"></i></button>`;

    // Cấp 2: đúng cùng bộ câu hỏi nhưng bỏ toàn bộ giàn giáo sư phạm.
    if (!guided) {
        if (type === 'mental_carry_20') {
            return {
                prompt: '', hidePrompt: true, inlineSpeaker: true, compactAnswers: true, isCarryLearning: true,
                visual: `<div class="relative w-full max-w-xl rounded-3xl border-2 border-pink-200 bg-gradient-to-br from-white via-pink-50/55 to-purple-50/55 shadow-sm px-4 py-4 text-center">
                    ${speaker}<div class="text-3xl md:text-4xl font-black text-slate-800">${a} <span class="text-pink-500">${symbol}</span> ${b} <span class="text-purple-400">= ?</span></div>
                </div>`
            };
        }
        const aT = Math.floor(a / 10), aO = a % 10, bT = Math.floor(b / 10), bO = b % 10;
        return {
            prompt: '', hidePrompt: true, inlineSpeaker: true, compactAnswers: true, isCarryLearning: true,
            visual: `<div class="relative w-full max-w-xl rounded-3xl border-2 border-pink-200 bg-gradient-to-br from-white via-pink-50/55 to-purple-50/55 shadow-sm px-4 py-3 text-center">
                ${speaker}
                <div class="mx-auto grid grid-cols-[50px_72px_72px] md:grid-cols-[54px_82px_82px] justify-center text-center font-black">
                    <div></div><div class="text-xs md:text-sm text-pink-600 pb-1">CHỤC</div><div class="text-xs md:text-sm text-purple-600 pb-1">ĐƠN VỊ</div>
                    <div></div><div class="border border-pink-200 bg-pink-50 py-1.5 text-2xl md:text-3xl">${aT}</div><div class="border border-purple-200 bg-purple-50 py-1.5 text-2xl md:text-3xl">${aO}</div>
                    <div class="flex items-center justify-center text-2xl md:text-3xl text-pink-500">${symbol}</div><div class="border border-pink-200 bg-white py-1.5 text-2xl md:text-3xl">${bT}</div><div class="border border-purple-200 bg-white py-1.5 text-2xl md:text-3xl">${bO}</div>
                    <div></div><div class="border-t-4 border-slate-700 bg-pink-50/50 py-1.5 text-2xl md:text-3xl text-slate-300">?</div><div class="border-t-4 border-slate-700 bg-purple-50/50 py-1.5 text-2xl md:text-3xl text-slate-300">?</div>
                </div>
            </div>`
        };
    }

    const hintText = `Hãy tách <span class="text-rose-600">${splitNumber}</span> thành <span class="text-purple-600">${toTen} + ${remainder}</span>.`;
    const borrowHintText = (type === 'vertical_carry_100' && op === '-')
        ? `Mượn <span class="text-blue-600">1</span> chục: <span class="text-slate-800">${a % 10}</span> thành <span class="text-blue-600">${(a % 10) + 10}</span>, rồi tính <span class="text-slate-800">${(a % 10) + 10} − ${b % 10}</span>.`
        : '';

    if (type === 'mental_carry_20') {
        const addTable = op === '+' ? renderMakeTenTable_(anchor) : '';
        const mainCard = `<div class="relative min-h-[225px] rounded-2xl border-2 border-pink-200 bg-gradient-to-br from-white via-pink-50/55 to-purple-50/55 px-4 py-2.5 text-center shadow-sm flex flex-col justify-start">
            ${speaker}
            <div class="text-3xl md:text-4xl font-black text-slate-800">${a} <span class="text-pink-500">${symbol}</span> ${b} <span class="text-purple-400">= ?</span></div>
            <div class="mt-2 rounded-xl border border-purple-200 bg-purple-50/75 px-3 py-2 text-base md:text-lg font-black text-slate-700">${hintText}</div>
            <div data-carry-concept-feedback class="hidden mt-2 space-y-1.5">
                <div class="rounded-xl border border-sky-200 bg-sky-50 px-3 py-1.5 text-base md:text-lg font-extrabold text-slate-700">
                    ${op === '+'
                        ? `Tách ${splitNumber} = ${toTen} + ${remainder} → ${anchor} + ${toTen} = <span class="text-emerald-600">10</span>.`
                        : `Tách ${b} = ${toTen} + ${remainder} → ${a} − ${toTen} = <span class="text-emerald-600">10</span>.`}
                </div>
                <div class="rounded-xl border-2 border-emerald-300 bg-emerald-50 px-3 py-1.5 text-lg md:text-xl font-black text-emerald-700">
                    10 ${op === '+' ? '+' : '−'} ${remainder} = ${answer} ✅
                </div>
            </div>
        </div>`;
        const visual = op === '+'
            ? `<div class="w-full max-w-5xl shrink-0 grid grid-cols-1 md:grid-cols-[200px_1fr] gap-3 items-stretch">${addTable}${mainCard}</div>`
            : `<div class="w-full max-w-3xl shrink-0">${mainCard}</div>`;
        return { prompt: '', hidePrompt: true, inlineSpeaker: true, compactAnswers: true, isCarryLearning: true, visual };
    }

    // Phạm vi 100: kế thừa bảng/gợi ý của phạm vi 20 và thêm ô nhớ/mượn 1 dưới hàng chục.
    const aT = Math.floor(a / 10), aO = a % 10, bT = Math.floor(b / 10), bO = b % 10;
    const addTable = op === '+' ? renderMakeTenTable_(anchor) : '';
    const onesLine = op === '+'
        ? `${aO} + ${bO} = ${aO + bO} → viết <span class="text-purple-600">${(aO + bO) % 10}</span>, nhớ <span class="text-rose-600">1</span>.`
        : `${aO} không trừ được ${bO} → mượn <span class="text-rose-600">1</span> chục: ${aO + 10} − ${bO} = <span class="text-purple-600">${aO + 10 - bO}</span>.`;
    const tensLine = op === '+'
        ? `${aT} + ${bT} + <span class="text-rose-600">1</span> = ${Math.floor(answer / 10)} chục.`
        : `${aT} chục mượn 1 còn ${aT - 1}; ${aT - 1} − ${bT} = ${Math.floor(answer / 10)} chục.`;

    const mainCard = `<div class="relative h-full rounded-2xl border-2 border-pink-200 bg-gradient-to-br from-white via-pink-50/55 to-purple-50/55 px-3 py-2 text-center shadow-sm">
        ${speaker}
        <div class="h-full grid grid-cols-1 md:grid-cols-[230px_1fr] gap-2 items-center">
            <div class="flex flex-col items-center justify-center">
                <div class="mx-auto grid grid-cols-[44px_70px_70px] md:grid-cols-[48px_76px_76px] justify-center text-center font-black">
                    <div></div><div class="text-xs text-pink-600 pb-0.5">CHỤC</div><div class="text-xs text-purple-600 pb-0.5">ĐƠN VỊ</div>
                    <div></div><div class="border border-pink-200 bg-pink-50 py-0.5 text-2xl md:text-3xl">${aT}</div><div class="border border-purple-200 bg-purple-50 py-0.5 text-2xl md:text-3xl">${aO}</div>
                    <div class="flex items-center justify-center text-2xl md:text-3xl text-pink-500">${symbol}</div><div class="border border-pink-200 bg-white py-0.5 text-2xl md:text-3xl">${bT}</div><div class="border border-purple-200 bg-white py-0.5 text-2xl md:text-3xl">${bO}</div>
                    <div></div><div class="pt-1 flex items-center justify-center"><span data-carry-one class="inline-flex min-w-[32px] h-6 items-center justify-center rounded-lg border border-blue-300 bg-blue-50 text-base font-black text-blue-600 opacity-100">1</span></div><div></div>
                    <div></div><div data-carry-answer-tens class="border-t-4 border-slate-700 bg-pink-50/50 py-0.5 text-2xl md:text-3xl text-slate-300">?</div><div data-carry-answer-ones class="border-t-4 border-slate-700 bg-purple-50/50 py-0.5 text-2xl md:text-3xl text-slate-300">?</div>
                </div>
            </div>
            <div class="flex flex-col justify-center pr-1 md:pr-6">
                <div class="rounded-xl border border-purple-200 bg-purple-50/75 px-3 py-1.5 text-base md:text-lg font-black text-slate-700">${hintText}</div>
                ${borrowHintText ? `<div class="mt-1 rounded-xl border border-blue-200 bg-blue-50/80 px-3 py-1.5 text-base md:text-lg font-black text-slate-700">${borrowHintText}</div>` : ''}
                <div data-carry-concept-feedback class="invisible mt-1.5 space-y-1">
                    <div class="rounded-xl border border-sky-200 bg-sky-50 px-3 py-1 text-sm md:text-base font-extrabold text-slate-700">${onesLine}</div>
                    <div class="rounded-xl border border-pink-200 bg-pink-50 px-3 py-1 text-sm md:text-base font-extrabold text-slate-700">${tensLine}</div>
                    <div class="rounded-xl border-2 border-emerald-300 bg-emerald-50 px-3 py-1 text-base md:text-lg font-black text-emerald-700">${a} ${symbol} ${b} = ${answer} ✅</div>
                </div>
            </div>
        </div>
    </div>`;
    const visual = op === '+'
        ? `<div class="w-full max-w-5xl md:h-[250px] shrink-0 grid grid-cols-1 md:grid-cols-[190px_1fr] gap-3 items-stretch">${addTable}${mainCard}</div>`
        : `<div class="w-full max-w-4xl md:h-[250px] shrink-0">${mainCard}</div>`;
    return { prompt: '', hidePrompt: true, inlineSpeaker: true, compactAnswers: true, isCarryLearning: true, visual };
}

function revealNeighborRuleFeedback_(q) {
    if (!q || q.explore_type !== 'number_line_neighbor') return;
    document.querySelectorAll('[data-neighbor-rule-feedback]').forEach(el => el.classList.remove('hidden'));
}


function buildMulDivTableVisual_(q, math) {
    if (!q || q.explore_type !== 'mul_div_table_visual' || !math) return null;
    const op = String(math[2] || '').toLowerCase();
    const left = Number(math[1]);
    const right = Number(math[3]);
    if (!Number.isFinite(left) || !Number.isFinite(right)) return null;

    const emoji = String(q?.visual_data?.emoji || (String(q.sub_topic) === '3.2' ? '🍎' : '⭐'));
    const isMultiply = op === 'x';
    const groups = isMultiply ? left : right;
    const perGroup = isMultiply ? right : (right ? left / right : 0);
    if (![2, 5].includes(groups) || !Number.isInteger(perGroup) || perGroup < 1 || perGroup > 10) return null;

    const result = isMultiply ? left * right : left / right;
    const mainOp = isMultiply ? '×' : '÷';
    const repeated = Array.from({ length: groups }, () => perGroup).join(' + ');

    // Emoji lớn theo đúng diện tích nửa màn hình bên trái.
    // 2 hàng có thể dùng emoji lớn hơn; 5 hàng tự thu vừa đủ để không tăng chiều cao màn hình.
    const emojiSize = groups === 2
        ? (perGroup >= 9 ? 30 : perGroup >= 7 ? 34 : 38)
        : (perGroup >= 9 ? 21 : perGroup >= 7 ? 23 : 26);
    const rowMinHeight = groups === 2 ? 62 : 42;

    const rowHtml = Array.from({ length: groups }, (_, rowIdx) => `
        <div class="flex items-center justify-center gap-[3px] rounded-xl border ${rowIdx % 2 === 0 ? 'border-pink-200 bg-pink-50/70' : 'border-purple-200 bg-purple-50/70'} px-2 py-1.5" style="min-height:${rowMinHeight}px">
            ${Array.from({ length: perGroup }, () => `<span class="leading-none select-none" style="font-size:${emojiSize}px">${emoji}</span>`).join('')}
        </div>`).join('');

    const conceptTitle = isMultiply ? 'PHÉP NHÂN = CỘNG CÁC NHÓM BẰNG NHAU' : 'PHÉP CHIA = CHIA ĐỀU THÀNH CÁC NHÓM';
    const conceptLine = isMultiply
        ? `<span class="text-pink-600">${left} hàng</span> × <span class="text-purple-600">${right} hình</span><br><span class="text-slate-600">tương ứng:</span> <span class="text-emerald-700">${repeated}</span>`
        : `<span class="text-pink-600">${left} hình</span> chia đều thành <span class="text-purple-600">${groups} hàng</span><br><span class="text-slate-600">Bé nhìn xem mỗi hàng có bao nhiêu hình nhé!</span>`;

    const feedback = isMultiply
        ? `${repeated} = ${result} &nbsp;→&nbsp; ${left} × ${right} = ${result}`
        : `${left} = ${repeated} &nbsp;→&nbsp; ${left} ÷ ${right} = ${result}`;

    return {
        prompt: '',
        hidePrompt: true,
        inlineSpeaker: true,
        visual: `
            <div class="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 items-stretch">
                <div class="rounded-3xl border-2 border-amber-200 bg-gradient-to-br from-white via-amber-50/70 to-pink-50/70 shadow-sm px-3 py-3 md:px-4 md:py-4 flex flex-col justify-center">
                    <div class="text-center text-sm md:text-base font-black text-amber-700 mb-2">👀 NHÌN BẰNG MẮT</div>
                    <div class="space-y-1.5 md:space-y-2">${rowHtml}</div>
                    <div class="mt-2 text-center text-sm md:text-base font-black text-slate-600">
                        ${isMultiply ? `${groups} hàng · mỗi hàng ${perGroup} hình` : `${left} hình · chia đều thành ${groups} hàng`}
                    </div>
                </div>

                <div class="rounded-3xl border-2 border-pink-200 bg-gradient-to-br from-white via-pink-50/60 to-purple-50/60 shadow-sm px-4 py-3 md:px-5 md:py-4 flex flex-col justify-center text-center relative">
                    <button onclick="speakCurrentQuestion()" class="absolute top-2.5 right-2.5 w-9 h-9 rounded-xl bg-pink-50 hover:bg-pink-100 text-pink-600 border border-pink-200 flex items-center justify-center pastel-btn shadow-xs" title="Nghe câu hỏi">
                        <i class="fa-solid fa-volume-high"></i>
                    </button>
                    <div class="text-4xl md:text-5xl font-black text-slate-800 leading-none pr-8">
                        ${left} <span class="text-pink-500">${mainOp}</span> ${right} <span class="text-purple-400">= ?</span>
                    </div>
                    <div class="mt-3 rounded-2xl border border-purple-200 bg-white/80 px-3 py-3">
                        <div class="text-xs md:text-sm font-black tracking-wide text-purple-500">${conceptTitle}</div>
                        <div class="mt-1.5 text-base md:text-lg font-black leading-snug">${conceptLine}</div>
                    </div>
                    <div data-muldiv-feedback class="hidden mt-3 rounded-2xl border-2 border-emerald-200 bg-emerald-50 px-3 py-2.5 text-base md:text-lg font-black text-emerald-700">
                        ${feedback}
                    </div>
                </div>
            </div>`,
        isMulDivVisual: true
    };
}

function revealMulDivFeedback_() {
    document.querySelectorAll('[data-muldiv-feedback]').forEach(el => el.classList.remove('hidden'));
}



// ===== MỤC 5 - HÌNH HỌC =====
// Dữ liệu gốc vẫn dùng sub_code 4.1-4.5, nhưng giao diện Khám phá hiển thị thành Mục 5.
// Vì vậy nhận diện bằng explore_topic_id=5, không dựa vào số sub hiển thị.
function buildGeometryPresentation_(q) {
    if (Number(q?.explore_topic_id) !== 5) return null;
    const sub = String(q?.sub_id || q?.sub_topic || '').trim();
    if (!/^4\.[1-5]$/.test(sub)) return null;
    const esc = (v) => escapeHtml(String(v ?? ''));
    const raw = String(q?.question_text || '');

    const wrap = (title, inner, note='') => `
        <div class="w-full min-h-[270px] flex flex-col items-center justify-center rounded-3xl border-2 border-amber-200 bg-gradient-to-br from-white via-amber-50/70 to-orange-50/60 p-3 md:p-4 overflow-hidden shadow-sm">
            <div class="text-sm md:text-base font-black text-amber-700 mb-2">${title}</div>
            <div class="w-full flex-1 flex items-center justify-center min-h-0">${inner}</div>
            ${note ? `<div class="mt-2 text-xs md:text-sm font-extrabold text-slate-500 text-center leading-snug">${esc(note)}</div>` : ''}
        </div>`;

    let visual = '';

    if (sub === '4.1') {
        const answerText = String(q?.answer || '');
        const labels = (answerText.match(/^\s*([^,]+),\s*([^,]+),\s*([^\s,]+)\s+thẳng hàng/i) || []).slice(1,4);
        const pts = labels.length === 3 ? labels : ['A','B','C'];
        visual = wrap('📏 BA ĐIỂM TRÊN MỘT ĐƯỜNG THẲNG', `
            <svg viewBox="0 0 520 250" class="w-full max-w-[560px] h-auto" role="img" aria-label="Ba điểm thẳng hàng trên thước">
                <defs>
                    <linearGradient id="geoRuler" x1="0" x2="1"><stop stop-color="#fde68a"/><stop offset="1" stop-color="#fcd34d"/></linearGradient>
                </defs>
                <rect x="42" y="110" width="436" height="70" rx="16" fill="url(#geoRuler)" stroke="#d97706" stroke-width="4"/>
                ${Array.from({length:22},(_,i)=>`<line x1="${58+i*19}" y1="110" x2="${58+i*19}" y2="${i%5===0?138:126}" stroke="#92400e" stroke-width="2"/>`).join('')}
                <line x1="62" y1="92" x2="458" y2="92" stroke="#334155" stroke-width="5" stroke-linecap="round"/>
                ${[150,260,370].map((x,i)=>`<g><circle cx="${x}" cy="92" r="10" fill="#ec4899" stroke="#fff" stroke-width="4"/><text x="${x}" y="67" text-anchor="middle" font-size="24" font-weight="900" fill="#7c3aed">${esc(pts[i])}</text></g>`).join('')}
                <path d="M62 92l18-9v18zM458 92l-18-9v18z" fill="#334155"/>
                <text x="260" y="222" text-anchor="middle" font-size="20" font-weight="900" fill="#92400e">Cùng nằm trên một đường thẳng</text>
            </svg>`, 'Quan sát vị trí của ba điểm trên đường thẳng.');
    } else if (sub === '4.2') {
        const nums = (raw.match(/\d+(?:[.,]\d+)?\s*cm/gi) || []).map(x => Number(x.replace(/\s*cm/i,'').replace(',','.'))).filter(Number.isFinite);
        const a = nums[0] || 10, b = nums[1] || 8;
        visual = wrap('📐 ĐƯỜNG GẤP KHÚC', `
            <svg viewBox="0 0 520 280" class="w-full max-w-[560px] h-auto" role="img" aria-label="Đường gấp khúc gồm hai đoạn">
                <rect x="24" y="25" width="472" height="220" rx="28" fill="#fff" stroke="#fed7aa" stroke-width="3"/>
                <polyline points="72,202 238,70 448,188" fill="none" stroke="#7c3aed" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
                <circle cx="72" cy="202" r="11" fill="#ec4899"/><circle cx="238" cy="70" r="11" fill="#f59e0b"/><circle cx="448" cy="188" r="11" fill="#10b981"/>
                <text x="65" y="230" font-size="22" font-weight="900" fill="#475569">A</text><text x="232" y="49" font-size="22" font-weight="900" fill="#475569">B</text><text x="451" y="218" font-size="22" font-weight="900" fill="#475569">C</text>
                <g transform="translate(123 116) rotate(-38)"><rect x="-5" y="-24" width="100" height="38" rx="14" fill="#fff7ed" stroke="#fb923c" stroke-width="2"/><text x="45" y="2" text-anchor="middle" font-size="21" font-weight="900" fill="#c2410c">${a} cm</text></g>
                <g transform="translate(325 104) rotate(29)"><rect x="-5" y="-24" width="100" height="38" rx="14" fill="#ecfeff" stroke="#22d3ee" stroke-width="2"/><text x="45" y="2" text-anchor="middle" font-size="21" font-weight="900" fill="#0e7490">${b} cm</text></g>
            </svg>`, 'Độ dài đường gấp khúc bằng tổng độ dài các đoạn thẳng.');
    } else if (sub === '4.3') {
        const count = Math.max(3, Math.min(10, Number(q?.answer) || 3));
        const positions = [
            [70,55],[170,55],[270,55],[370,55],[120,140],[220,140],[320,140],[420,140],[180,215],[300,215]
        ];
        const tris = positions.slice(0,count).map((p,i)=>{
            const [x,y]=p; const fills=['#f9a8d4','#93c5fd','#86efac','#fde68a','#c4b5fd','#67e8f9','#fdba74','#fca5a5','#a7f3d0','#bfdbfe'];
            return `<polygon points="${x},${y+54} ${x+34},${y-8} ${x+68},${y+54}" fill="${fills[i]}" stroke="#475569" stroke-width="3" stroke-linejoin="round"/>`;
        }).join('');
        visual = wrap('🔺 NHÌN KĨ RỒI ĐẾM HÌNH', `
            <svg viewBox="0 0 520 300" class="w-full max-w-[560px] h-auto" role="img" aria-label="Các mảnh tam giác để quan sát và đếm">
                <rect x="20" y="18" width="480" height="264" rx="28" fill="#fff" stroke="#fed7aa" stroke-width="3"/>
                ${tris}
                <text x="260" y="278" text-anchor="middle" font-size="18" font-weight="900" fill="#7c3aed">Chỉ từng hình một để tránh đếm trùng</text>
            </svg>`, 'Con có thể dùng ngón tay chỉ lần lượt từng hình.');
    } else if (sub === '4.4') {
        const ans = String(q?.answer || '').toLowerCase();
        const quoted = (raw.match(/[\'“”"]([^\'“”"]+)[\'“”"]/ ) || [])[1] || 'Vật thể';
        let shape='';
        if (ans.includes('trụ')) shape=`<g transform="translate(168 45)"><ellipse cx="90" cy="30" rx="62" ry="25" fill="#bae6fd" stroke="#0284c7" stroke-width="4"/><rect x="28" y="30" width="124" height="120" fill="#7dd3fc" stroke="#0284c7" stroke-width="4"/><ellipse cx="90" cy="150" rx="62" ry="25" fill="#38bdf8" stroke="#0284c7" stroke-width="4"/><ellipse cx="90" cy="30" rx="62" ry="25" fill="#e0f2fe" stroke="#0284c7" stroke-width="4"/></g>`;
        else if (ans.includes('lập phương')) shape=`<g transform="translate(175 55)"><polygon points="80,0 150,38 80,78 10,38" fill="#fde68a" stroke="#d97706" stroke-width="4"/><polygon points="10,38 80,78 80,160 10,120" fill="#fbbf24" stroke="#d97706" stroke-width="4"/><polygon points="80,78 150,38 150,120 80,160" fill="#f59e0b" stroke="#d97706" stroke-width="4"/></g>`;
        else if (ans.includes('cầu')) shape=`<g><defs><radialGradient id="geoBall" cx="38%" cy="30%"><stop stop-color="#fdf2f8"/><stop offset=".35" stop-color="#f9a8d4"/><stop offset="1" stop-color="#db2777"/></radialGradient></defs><circle cx="260" cy="132" r="88" fill="url(#geoBall)" stroke="#be185d" stroke-width="4"/><ellipse cx="228" cy="98" rx="22" ry="13" fill="#fff" opacity=".65"/></g>`;
        else shape=`<g transform="translate(155 62)"><polygon points="45,20 180,20 215,50 80,50" fill="#ddd6fe" stroke="#7c3aed" stroke-width="4"/><polygon points="80,50 215,50 215,145 80,145" fill="#a78bfa" stroke="#7c3aed" stroke-width="4"/><polygon points="45,20 80,50 80,145 45,112" fill="#c4b5fd" stroke="#7c3aed" stroke-width="4"/></g>`;
        visual = wrap('🧊 NHẬN DIỆN KHỐI HÌNH', `
            <div class="w-full flex flex-col items-center justify-center">
                <svg viewBox="0 0 520 245" class="w-full max-w-[540px] h-auto" role="img" aria-label="Minh họa khối hình">${shape}</svg>
                <div class="-mt-2 rounded-2xl border-2 border-amber-200 bg-white px-4 py-2 text-lg md:text-xl font-black text-amber-800 text-center">${esc(quoted)}</div>
            </div>`, 'Quan sát mặt, cạnh và dạng tròn của vật thể.');
    } else {
        const avd = q.visual_data || {};
        const task = String(avd.assembly_task || '');
        const kind = String(avd.target_shape || (/chữ nhật/i.test(raw) ? 'Hình chữ nhật' : (/vuông/i.test(raw) ? 'Hình vuông' : 'Hình tam giác')));
        const pieceCount = Math.max(0, Number(avd.piece_count || 6));
        const usedCount = Math.max(0, Number(avd.used_count || 0));
        const targetCount = Math.max(0, Number(avd.target_count || 1));
        const piecesPerTarget = Math.max(1, Number(avd.pieces_per_target || 2));
        const leftover = Math.max(0, Number(avd.leftover || 0));
        const triangle = (i=0) => `<span class="inline-block w-0 h-0 border-l-[18px] border-r-[18px] border-b-[32px] md:border-l-[20px] md:border-r-[20px] md:border-b-[36px] border-l-transparent border-r-transparent ${['border-b-pink-400','border-b-sky-400','border-b-emerald-400','border-b-amber-400','border-b-violet-400','border-b-orange-400'][i%6]} drop-shadow-sm"></span>`;
        const piecesHtml = Array.from({length:Math.min(pieceCount,12)},(_,i)=>triangle(i)).join('');
        const targetShapeHtml = (shape=kind, label='') => {
            const s=String(shape).toLowerCase();
            const body = s.includes('tam giác')
                ? `<svg viewBox="0 0 120 100" class="w-[100px] h-[84px]"><polygon points="60,8 8,91 112,91" fill="#ecfeff" stroke="#06b6d4" stroke-width="5"/><line x1="60" y1="8" x2="60" y2="91" stroke="#67e8f9" stroke-width="3" stroke-dasharray="5 4"/></svg>`
                : s.includes('chữ nhật')
                    ? `<svg viewBox="0 0 140 95" class="w-[120px] h-[82px]"><rect x="8" y="10" width="124" height="74" rx="4" fill="#fff7ed" stroke="#f97316" stroke-width="5"/><line x1="8" y1="10" x2="132" y2="84" stroke="#fdba74" stroke-width="3" stroke-dasharray="5 4"/></svg>`
                    : `<svg viewBox="0 0 110 110" class="w-[92px] h-[92px]"><rect x="10" y="10" width="90" height="90" rx="4" fill="#f5f3ff" stroke="#8b5cf6" stroke-width="5"/><line x1="10" y1="10" x2="100" y2="100" stroke="#c4b5fd" stroke-width="3"/></svg>`;
            return `<div class="flex flex-col items-center justify-center">${body}${label?`<div class="mt-1 text-xs md:text-sm font-black text-violet-700">${esc(label)}</div>`:''}</div>`;
        };
        const targetsHtml = Array.from({length:Math.min(targetCount,5)},(_,i)=>targetShapeHtml(kind, targetCount>1?`Hình ${i+1}`:'')).join('');
        let center = '';
        let note = '';

        if (task === 'target_name') {
            center = `<div class="flex flex-col items-center gap-3">${targetShapeHtml('Hình vuông','Hai tam giác ghép khít')}<div class="text-sm md:text-base font-black text-slate-600">Nhìn đường bao ngoài, không nhìn đường chéo bên trong.</div></div>`;
            note = 'Hai mảnh tam giác là hai nửa của cùng một hình vuông.';
        } else if (task === 'vertices') {
            center = targetShapeHtml(kind, kind);
            note = 'Chỉ đếm các đỉnh trên đường bao ngoài của hình đã ghép.';
        } else if (task === 'compare_targets') {
            const aCount=Math.max(0,Number(avd.target_a||2)), bCount=Math.max(0,Number(avd.target_b||4));
            center = `<div class="grid grid-cols-2 gap-4 w-full max-w-sm"><div class="rounded-2xl border-2 border-cyan-200 bg-white p-3 text-center"><div class="font-black text-cyan-700 mb-2">Hình A</div><div class="flex justify-center gap-1 flex-wrap">${Array.from({length:Math.min(aCount,8)},(_,i)=>triangle(i)).join('')}</div><div class="mt-2 font-black text-slate-600">${aCount} mảnh</div></div><div class="rounded-2xl border-2 border-violet-200 bg-white p-3 text-center"><div class="font-black text-violet-700 mb-2">Hình B</div><div class="flex justify-center gap-1 flex-wrap">${Array.from({length:Math.min(bCount,8)},(_,i)=>triangle(i+2)).join('')}</div><div class="mt-2 font-black text-slate-600">${bCount} mảnh</div></div></div>`;
            note = 'So sánh trực tiếp số mảnh của hai hình.';
        } else {
            const rule = (task==='remaining'||task==='difference')
                ? `<div class="rounded-xl border border-rose-200 bg-rose-50 px-3 py-1.5 text-sm font-black text-rose-700">Dùng ${usedCount} / ${pieceCount} mảnh</div>`
                : `<div class="rounded-xl border border-violet-200 bg-violet-50 px-3 py-1.5 text-sm font-black text-violet-700">${piecesPerTarget} tam giác → 1 hình vuông</div>`;
            const resultHtml = ['remaining','difference'].includes(task)
                ? `<div class="flex flex-wrap items-center justify-center gap-1.5 min-h-[84px]">${Array.from({length:Math.min(usedCount,10)},(_,i)=>triangle(i+2)).join('')}</div><div class="mt-2 text-sm font-black text-violet-700">${usedCount} mảnh đã dùng</div>`
                : `<div class="flex flex-wrap items-center justify-center gap-2 min-h-[84px]">${targetsHtml || targetShapeHtml(kind)}</div>`;
            center = `<div class="w-full grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] items-center gap-3"><div class="rounded-2xl border-2 border-pink-200 bg-white p-3"><div class="text-xs font-black text-pink-600 mb-2">Khay mảnh ghép</div><div class="flex flex-wrap justify-center gap-2 min-h-[84px] items-center">${piecesHtml}</div><div class="mt-2 text-sm font-black text-slate-600">${pieceCount} mảnh tam giác</div></div><div class="flex flex-col items-center gap-2">${rule}<span class="text-3xl text-slate-300">→</span></div><div class="rounded-2xl border-2 border-violet-200 bg-white p-3"><div class="text-xs font-black text-violet-600 mb-2">Kết quả thao tác</div>${resultHtml}${leftover?`<div class="mt-2 text-sm font-black text-amber-700">Còn ${leftover} mảnh</div>`:''}</div></div>`;
            if (task === 'reverse_total') note = `Đã ghép ${targetCount} hình và còn ${leftover} mảnh chưa dùng.`;
            else if (task === 'pieces_needed' || task === 'reassemble') note = `Mỗi hình cần ${piecesPerTarget} mảnh tam giác.`;
            else if (task === 'pair_count' || task === 'max_complete' || task === 'choose_plan' || task === 'add_to_even') note = `Ghép các mảnh theo từng cặp ${piecesPerTarget} mảnh.`;
            else note = 'Quan sát số mảnh trong khay và số mảnh được dùng để ghép hình.';
        }

        visual = wrap('🧩 LẮP GHÉP HÌNH – NHÌN HÌNH RỒI SUY LUẬN', center, note);
    }

    return {
        prompt: raw,
        visual,
        layout: 'geometry_split',
        inlineSpeaker: true
    };
}

function buildMeasureTimePresentation_(q) {
    const sub = String(q?.sub_topic || q?.sub_id || '').trim();
    if (!/^5\.[1-6]$/.test(sub) || !q?.explore_type) return null;
    const vd = q.visual_data || {};
    const esc = (v) => escapeHtml(String(v ?? ''));

    // Minh họa ngữ cảnh cho toàn bộ Mục 5. Giữ hình nhỏ gọn để không lấn át mô hình toán học chính.
    const topic5Art = (() => {
        if (sub === '5.1') return `<svg viewBox="0 0 220 82" class="w-full max-w-[220px] h-[72px] md:h-[82px]" aria-hidden="true">
            <rect x="9" y="52" width="202" height="18" rx="9" fill="#fef3c7" stroke="#f59e0b" stroke-width="2"/>
            ${Array.from({length:21},(_,i)=>`<line x1="${18+i*9}" y1="52" x2="${18+i*9}" y2="${i%5===0?62:58}" stroke="#92400e" stroke-width="1.6"/>`).join('')}
            <g transform="rotate(-9 112 32)"><rect x="45" y="19" width="132" height="20" rx="10" fill="#f9a8d4" stroke="#db2777" stroke-width="2"/><polygon points="177,19 207,29 177,39" fill="#fde68a" stroke="#d97706" stroke-width="2"/><polygon points="201,27 211,29 201,31" fill="#334155"/></g>
            <circle cx="25" cy="27" r="13" fill="#cffafe"/><path d="M19 28l5 5 9-12" fill="none" stroke="#0891b2" stroke-width="3" stroke-linecap="round"/>
        </svg>`;
        if (sub === '5.2') return `<svg viewBox="0 0 220 82" class="w-full max-w-[220px] h-[72px] md:h-[82px]" aria-hidden="true">
            <line x1="73" y1="18" x2="73" y2="66" stroke="#64748b" stroke-width="6"/><line x1="25" y1="31" x2="121" y2="31" stroke="#0f766e" stroke-width="5" stroke-linecap="round"/>
            <path d="M18 44 Q43 65 68 44" fill="#dbeafe" stroke="#3b82f6" stroke-width="2"/><path d="M78 44 Q103 65 128 44" fill="#dcfce7" stroke="#22c55e" stroke-width="2"/>
            <circle cx="42" cy="42" r="10" fill="#fb7185"/><path d="M42 31q5-8 10-2" fill="none" stroke="#15803d" stroke-width="2"/>
            <path d="M151 25 h34 l7 11 v31 h-48 v-31z" fill="#bae6fd" stroke="#0284c7" stroke-width="2"/><rect x="157" y="15" width="22" height="12" rx="5" fill="#38bdf8"/><path d="M147 49q21-12 42 0v16h-42z" fill="#67e8f9"/>
            <text x="168" y="57" text-anchor="middle" font-size="12" font-weight="900" fill="#0369a1">1 l</text>
        </svg>`;
        if (sub === '5.3') return `<svg viewBox="0 0 220 82" class="w-full max-w-[220px] h-[72px] md:h-[82px]" aria-hidden="true">
            <rect x="47" y="10" width="126" height="64" rx="12" fill="#fff" stroke="#34d399" stroke-width="3"/><rect x="47" y="10" width="126" height="20" rx="10" fill="#10b981"/>
            ${Array.from({length:5},(_,r)=>Array.from({length:7},(_,c)=>`<rect x="${57+c*15}" y="${36+r*7}" width="9" height="5" rx="2" fill="${r===2&&c===4?'#f9a8d4':'#d1fae5'}"/>`).join('')).join('')}
            <circle cx="25" cy="24" r="11" fill="#fde047"/>${Array.from({length:8},(_,i)=>{const a=i*Math.PI/4;return `<line x1="${25+Math.cos(a)*15}" y1="${24+Math.sin(a)*15}" x2="${25+Math.cos(a)*20}" y2="${24+Math.sin(a)*20}" stroke="#f59e0b" stroke-width="2"/>`}).join('')}
            <path d="M184 62h24l-5-25h-14z" fill="#a78bfa"/><path d="M190 37q7-14 14 0" fill="none" stroke="#7c3aed" stroke-width="3"/>
        </svg>`;
        if (sub === '5.4') return `<svg viewBox="0 0 220 82" class="w-full max-w-[220px] h-[72px] md:h-[82px]" aria-hidden="true">
            <circle cx="77" cy="42" r="31" fill="#fff" stroke="#a78bfa" stroke-width="5"/><line x1="77" y1="42" x2="77" y2="21" stroke="#7c3aed" stroke-width="5" stroke-linecap="round"/><line x1="77" y1="42" x2="96" y2="51" stroke="#ec4899" stroke-width="4" stroke-linecap="round"/><circle cx="77" cy="42" r="5" fill="#0f766e"/>
            <path d="M53 14l-12-9 5 18M101 14l12-9-5 18" fill="#f9a8d4" stroke="#db2777" stroke-width="2"/><path d="M53 69l-8 9M101 69l8 9" stroke="#64748b" stroke-width="4" stroke-linecap="round"/>
            <rect x="128" y="30" width="65" height="35" rx="8" fill="#fef3c7" stroke="#f59e0b" stroke-width="2"/><path d="M128 37h65" stroke="#f59e0b" stroke-width="2"/><text x="160" y="57" text-anchor="middle" font-size="16" font-weight="900" fill="#92400e">GIỜ HỌC</text>
        </svg>`;
        if (sub === '5.5') return `<svg viewBox="0 0 220 82" class="w-full max-w-[220px] h-[72px] md:h-[82px]" aria-hidden="true">
            <rect x="24" y="28" width="110" height="45" rx="8" fill="#fff7ed" stroke="#fb923c" stroke-width="2"/><path d="M20 28h118l-10-18H30z" fill="#fb7185"/><path d="M30 10h18v18H30zm36 0h18v18H66zm36 0h18v18h-18z" fill="#fda4af"/>
            <rect x="42" y="44" width="32" height="29" rx="5" fill="#bfdbfe"/><circle cx="106" cy="52" r="12" fill="#fde047"/><circle cx="101" cy="49" r="3" fill="#334155"/><circle cx="111" cy="49" r="3" fill="#334155"/><path d="M101 57q5 5 10 0" fill="none" stroke="#334155" stroke-width="2"/>
            <rect x="149" y="18" width="58" height="25" rx="8" fill="#dcfce7" stroke="#22c55e" stroke-width="2"/><text x="178" y="35" text-anchor="middle" font-size="13" font-weight="900" fill="#15803d">500đ</text><circle cx="163" cy="62" r="11" fill="#fde68a" stroke="#d97706" stroke-width="2"/><circle cx="191" cy="62" r="11" fill="#fde68a" stroke="#d97706" stroke-width="2"/>
        </svg>`;
        return `<svg viewBox="0 0 220 82" class="w-full max-w-[220px] h-[72px] md:h-[82px]" aria-hidden="true">
            <defs><linearGradient id="t5sky" x1="0" x2="1"><stop stop-color="#fde68a"/><stop offset="1" stop-color="#c4b5fd"/></linearGradient></defs><rect x="8" y="12" width="204" height="58" rx="24" fill="url(#t5sky)" opacity=".45"/>
            <circle cx="38" cy="39" r="13" fill="#facc15"/><path d="M74 54h34V31l-17-13-17 13z" fill="#fff" stroke="#60a5fa" stroke-width="2"/><rect x="86" y="39" width="10" height="15" fill="#93c5fd"/><path d="M132 22q15 8 0 16q15 8 0 16" fill="none" stroke="#f97316" stroke-width="4" stroke-linecap="round"/><path d="M178 22a20 20 0 1 0 17 31a16 16 0 1 1-17-31" fill="#818cf8"/><path d="M52 64h122" stroke="#10b981" stroke-width="5" stroke-linecap="round"/>
        </svg>`;
    })();

    const panel = (inner, note='') => `
        <div class="w-full h-full min-h-[260px] flex flex-col items-center justify-center rounded-3xl border-2 border-emerald-100 bg-gradient-to-br from-white via-emerald-50/55 to-cyan-50/55 p-3 md:p-4 overflow-hidden">
            <div class="w-full flex items-center justify-center mb-1 md:mb-2">${topic5Art}</div>
            <div class="w-full flex items-center justify-center min-h-0">${inner}</div>
            ${note ? `<div class="mt-2 md:mt-3 text-xs md:text-sm font-extrabold text-slate-500 text-center leading-snug">${esc(note)}</div>` : ''}
        </div>`;
    const clockSvg = (hour, minute, label='') => {
        const h = Number(hour) || 0, m = Number(minute) || 0;
        const hourAngle = ((h % 12) + m / 60) * 30 - 90;
        const minAngle = m * 6 - 90;
        const cx=110, cy=105;
        const pt=(ang,len)=>({x:cx+Math.cos(ang*Math.PI/180)*len,y:cy+Math.sin(ang*Math.PI/180)*len});
        const hp=pt(hourAngle,46), mp=pt(minAngle,67);
        const ticks=Array.from({length:12},(_,i)=>{
            const a=(i*30-90)*Math.PI/180; const x=cx+Math.cos(a)*82, y=cy+Math.sin(a)*82;
            return `<text x="${x.toFixed(1)}" y="${(y+5).toFixed(1)}" text-anchor="middle" font-size="13" font-weight="800" fill="#475569">${i===0?12:i}</text>`;
        }).join('');
        return `<svg viewBox="0 0 220 220" class="w-full max-w-[250px]" aria-label="Đồng hồ minh họa">
            <circle cx="110" cy="105" r="96" fill="#fff" stroke="#a7f3d0" stroke-width="6"/>
            <circle cx="110" cy="105" r="86" fill="#f8fafc" stroke="#e2e8f0" stroke-width="2"/>
            ${ticks}
            <line x1="110" y1="105" x2="${hp.x.toFixed(1)}" y2="${hp.y.toFixed(1)}" stroke="#7c3aed" stroke-width="8" stroke-linecap="round"/>
            <line x1="110" y1="105" x2="${mp.x.toFixed(1)}" y2="${mp.y.toFixed(1)}" stroke="#ec4899" stroke-width="5" stroke-linecap="round"/>
            <circle cx="110" cy="105" r="8" fill="#0f766e"/>
            ${label ? `<text x="110" y="216" text-anchor="middle" font-size="14" font-weight="900" fill="#0f766e">${esc(label)}</text>` : ''}
        </svg>`;
    };
    const noteSvg = (value) => `<div class="min-w-[112px] rounded-2xl border-2 border-emerald-200 bg-white px-4 py-3 text-center shadow-sm"><div class="text-[11px] font-black uppercase tracking-wide text-emerald-600">TIỀN HỌC TẬP</div><div class="mt-1 text-xl md:text-2xl font-black text-slate-800">${Number(value).toLocaleString('vi-VN')}</div><div class="text-sm font-black text-slate-500">đồng</div></div>`;

    let visual='';
    const type=String(q.explore_type);
    if (type==='length_ruler') {
        const start=Number(vd.start||0), end=Number(vd.end||0), max=Math.max(Number(vd.max||10),end+1);
        const x0=36, width=430, step=width/max;
        const ticks=Array.from({length:max+1},(_,i)=>`<g><line x1="${x0+i*step}" y1="130" x2="${x0+i*step}" y2="${i%5===0?102:112}" stroke="#64748b" stroke-width="2"/><text x="${x0+i*step}" y="151" text-anchor="middle" font-size="13" font-weight="800" fill="#475569">${i}</text></g>`).join('');
        const ox=x0+start*step, ow=(end-start)*step;
        visual=panel(`<svg viewBox="0 0 500 190" class="w-full max-w-[560px]">
            <rect x="24" y="92" width="455" height="68" rx="16" fill="#fef3c7" stroke="#f59e0b" stroke-width="3"/>
            ${ticks}<text x="468" y="151" text-anchor="end" font-size="13" font-weight="900" fill="#92400e">cm</text>
            <rect x="${ox}" y="48" width="${Math.max(34,ow)}" height="28" rx="14" fill="#f0abfc" stroke="#c026d3" stroke-width="3"/>
            <text x="${ox+Math.max(34,ow)/2}" y="68" text-anchor="middle" font-size="18" font-weight="900" fill="#701a75">${esc(vd.emoji||'✏️')} ${esc(vd.object||'vật')}</text>
            <line x1="${ox}" y1="80" x2="${ox}" y2="128" stroke="#db2777" stroke-width="3" stroke-dasharray="5 4"/>
            <line x1="${ox+ow}" y1="80" x2="${ox+ow}" y2="128" stroke="#db2777" stroke-width="3" stroke-dasharray="5 4"/>
        </svg>`,'Đọc vạch đầu và vạch cuối rồi tìm độ dài.');
    } else if (type==='length_unit_choice' || type==='length_estimate') {
        const scale=String(vd.scale||'');
        const context=scale==='far'?'Quãng đường':(scale==='medium'?'Kích thước trong phòng':'Đồ vật cầm tay');
        const valueChip = type==='length_unit_choice' && vd.value_text
            ? `<span class="px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 font-black">Số đo: ${esc(vd.value_text)} ?</span>`
            : `<span class="px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 font-black">Ước lượng trước · đo sau</span>`;
        visual=panel(`<div class="text-7xl md:text-8xl leading-none">${esc(vd.emoji||'📏')}</div><div class="mt-3 text-xl md:text-2xl font-black text-emerald-800">${esc(vd.object||'Đồ vật')}</div><div class="mt-3 flex items-center gap-2 flex-wrap justify-center"><span class="px-3 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-700 font-black">${esc(context)}</span>${valueChip}</div>`,'Chọn đơn vị theo kích thước thật, không chỉ nhìn con số.');
    } else if (type==='length_convert') {
        const val=Number(vd.value||0), from=esc(vd.from_unit), to=esc(vd.to_unit);
        const measureModel = val <= 8
            ? `<div class="flex items-end justify-center gap-1.5 flex-wrap">${Array.from({length:Math.max(1,val)},()=>`<div class="w-9 md:w-11 h-24 rounded-xl border-2 border-cyan-300 bg-cyan-100 flex items-center justify-center font-black text-cyan-800">1 ${from}</div>`).join('')}</div>`
            : `<div class="w-full max-w-sm rounded-3xl border-2 border-cyan-200 bg-cyan-50 px-5 py-5 text-center"><div class="text-sm font-black text-cyan-600">SỐ ĐO BAN ĐẦU</div><div class="mt-1 text-4xl md:text-5xl font-black text-cyan-800">${val} ${from}</div></div>`;
        visual=panel(`${measureModel}<div class="mt-4 flex items-center gap-3 text-2xl md:text-3xl font-black"><span class="text-purple-700">${val} ${from}</span><span class="text-pink-500">→</span><span class="text-emerald-700">? ${to}</span></div>`,'Nhớ các mốc 1 dm = 10 cm, 1 m = 10 dm = 100 cm, 1 km = 1000 m.');
    } else if (type==='length_path') {
        const a=Number(vd.a||0), b=Number(vd.b||0), unit=esc(vd.unit||'m'), op=String(vd.op||'+');
        visual=panel(`<svg viewBox="0 0 520 230" class="w-full max-w-[570px]">
            <path d="M45 170 C145 40, 225 205, 330 85 S455 140,480 55" fill="none" stroke="#86efac" stroke-width="24" stroke-linecap="round"/>
            <path d="M45 170 C145 40, 225 205, 330 85 S455 140,480 55" fill="none" stroke="#16a34a" stroke-width="3" stroke-dasharray="9 8"/>
            <circle cx="45" cy="170" r="18" fill="#f472b6"/><text x="45" y="176" text-anchor="middle" font-size="18">🚩</text>
            <circle cx="480" cy="55" r="18" fill="#60a5fa"/><text x="480" y="61" text-anchor="middle" font-size="18">🏁</text>
            <rect x="100" y="54" width="110" height="42" rx="18" fill="#fff" stroke="#f9a8d4" stroke-width="3"/><text x="155" y="81" text-anchor="middle" font-size="20" font-weight="900" fill="#be185d">${a} ${unit}</text>
            <rect x="315" y="145" width="110" height="42" rx="18" fill="#fff" stroke="#a7f3d0" stroke-width="3"/><text x="370" y="172" text-anchor="middle" font-size="20" font-weight="900" fill="#047857">${b} ${unit}</text>
            <text x="260" y="218" text-anchor="middle" font-size="25" font-weight="900" fill="#7c3aed">${op==='+'?'Cộng hai đoạn':'Tìm phần chênh lệch'}</text>
        </svg>`,'Các số đo đã cùng đơn vị.');
    } else if (type==='weight_balance') {
        const ws=Array.isArray(vd.weights)?vd.weights.map(Number):[];
        visual=panel(`<svg viewBox="0 0 520 260" class="w-full max-w-[560px]">
            <line x1="260" y1="70" x2="260" y2="205" stroke="#64748b" stroke-width="8"/><polygon points="220,220 300,220 260,160" fill="#94a3b8"/>
            <line x1="90" y1="105" x2="430" y2="105" stroke="#0f766e" stroke-width="8" stroke-linecap="round"/>
            <line x1="120" y1="105" x2="120" y2="155" stroke="#64748b" stroke-width="3"/><line x1="400" y1="105" x2="400" y2="155" stroke="#64748b" stroke-width="3"/>
            <path d="M45 155 Q120 205 195 155" fill="#dbeafe" stroke="#3b82f6" stroke-width="4"/><path d="M325 155 Q400 205 475 155" fill="#dcfce7" stroke="#22c55e" stroke-width="4"/>
            <text x="120" y="170" text-anchor="middle" font-size="46">${esc(vd.object_emoji||'📦')}</text>
            ${ws.map((w,i)=>`<g><rect x="${350+i*55}" y="132" width="48" height="42" rx="10" fill="#fef3c7" stroke="#f59e0b" stroke-width="3"/><text x="${374+i*55}" y="159" text-anchor="middle" font-size="16" font-weight="900" fill="#92400e">${w}kg</text></g>`).join('')}
            <circle cx="260" cy="105" r="11" fill="#f43f5e"/>
        </svg>`,'Cân thăng bằng: hai bên có khối lượng bằng nhau.');
    } else if (type==='weight_arithmetic') {
        visual=panel(`<div class="flex items-center justify-center gap-3 md:gap-5"><div class="text-5xl">⚖️</div><div class="rounded-2xl border-2 border-amber-200 bg-amber-50 px-5 py-4 text-2xl md:text-3xl font-black text-amber-800">${esc(vd.a)} kg</div><div class="text-3xl font-black text-pink-500">${esc(vd.op)}</div><div class="rounded-2xl border-2 border-cyan-200 bg-cyan-50 px-5 py-4 text-2xl md:text-3xl font-black text-cyan-800">${esc(vd.b)} kg</div></div>`,'Tính với số đo rồi nhớ ghi kg.');
    } else if (type==='weight_compare') {
        visual=panel(`<div class="grid grid-cols-2 gap-4 w-full max-w-md"><div class="rounded-3xl border-2 border-cyan-200 bg-cyan-50 p-5 text-center"><div class="text-5xl">🛍️</div><div class="mt-2 text-2xl font-black text-cyan-800">${esc(vd.a)} kg</div></div><div class="rounded-3xl border-2 border-pink-200 bg-pink-50 p-5 text-center"><div class="text-5xl">🛍️</div><div class="mt-2 text-2xl font-black text-pink-800">${esc(vd.b)} kg</div></div></div>`,'So sánh trực tiếp hai số đo cùng đơn vị kg.');
    } else if (type==='liter_measure') {
        const a=Number(vd.a||0), b=Number(vd.b||0), kind=String(vd.kind||'plus');
        const cup=(v,tone)=>`<div class="relative w-24 h-32 rounded-b-3xl rounded-t-lg border-4 ${tone==='a'?'border-cyan-300':'border-pink-300'} bg-white overflow-hidden"><div class="absolute inset-x-0 bottom-0 ${tone==='a'?'bg-cyan-200':'bg-pink-200'}" style="height:${Math.max(18,Math.min(92,v*8))}%"></div><div class="absolute inset-0 flex items-center justify-center text-xl font-black text-slate-700">${v} l</div></div>`;
        if (kind==='cups') {
            visual=panel(`<div class="flex flex-col items-center"><div class="text-6xl">🫗</div><div class="mt-3 flex flex-wrap justify-center gap-2">${Array.from({length:a},()=>`<div class="w-16 h-20 rounded-b-2xl border-3 border-cyan-300 bg-cyan-100 flex items-center justify-center font-black text-cyan-800">${b} l</div>`).join('')}</div></div>`,'Ghép các cốc 1 l để thấy dung tích của bình.');
        } else if (kind==='groups') {
            visual=panel(`<div class="flex items-center justify-center gap-4 md:gap-7">${cup(a,'a')}<div class="text-4xl font-black text-purple-500">÷</div>${cup(b,'b')}<div class="text-4xl font-black text-pink-500">= ? can</div></div>`,'Lấy tổng số lít chia cho số lít trong mỗi can.');
        } else {
            visual=panel(`<div class="flex items-center justify-center gap-4 md:gap-7">${cup(a,'a')}<div class="text-3xl font-black text-purple-500">${['minus','difference'].includes(kind)?'−':(kind==='compare'?'↔':'+')}</div>${cup(b,'b')}</div>`,'Lít (l) dùng để đo lượng chất lỏng.');
        }
    } else if (type==='measure_choice') {
        visual=panel(`<div class="text-7xl md:text-8xl">${esc(vd.emoji||'⚖️')}</div><div class="mt-4 flex gap-3"><span class="rounded-2xl border-2 border-amber-200 bg-amber-50 px-4 py-2 text-xl font-black text-amber-800">kg</span><span class="rounded-2xl border-2 border-cyan-200 bg-cyan-50 px-4 py-2 text-xl font-black text-cyan-800">l</span></div>`,'Xác định đại lượng trước rồi chọn đơn vị.');
    } else if (type.startsWith('calendar_')) {
        const month=Number(vd.month||1), days=Number(vd.days||30), start=Number(vd.start_weekday||0);
        const hi=new Set((vd.highlight_days||[]).map(Number));
        if(vd.highlight) hi.add(Number(vd.highlight));
        if(vd.from) hi.add(Number(vd.from));
        // Với bài “sau 1 tuần”, chỉ tô ngày xuất phát để bé tự tìm ngày cùng cột ở tuần kế tiếp.
        if(vd.to && type!=='calendar_week_jump') hi.add(Number(vd.to));
        const names=['T2','T3','T4','T5','T6','T7','CN'];
        const cells=[]; for(let i=0;i<start;i++)cells.push(''); for(let d=1;d<=days;d++)cells.push(d); while(cells.length%7)cells.push('');
        const weekCue=type==='calendar_week_jump'?`<div class="mt-2 inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-3 py-1.5 text-sm font-black text-purple-700"><span>Ngày ${esc(vd.from)}</span><span>→ + 7 ngày →</span><span>?</span></div>`:'';
        visual=panel(`<div class="w-full max-w-[500px]"><div class="rounded-t-2xl bg-emerald-600 px-4 py-2 text-center text-xl md:text-2xl font-black text-white">THÁNG ${month}</div><div class="grid grid-cols-7 border-x-2 border-b-2 border-emerald-200 rounded-b-2xl overflow-hidden">${names.map(n=>`<div class="bg-emerald-50 py-2 text-center text-xs md:text-sm font-black text-emerald-800">${n}</div>`).join('')}${cells.map(d=>`<div class="min-h-[38px] md:min-h-[44px] border-t border-r border-slate-100 flex items-center justify-center text-sm md:text-base font-black ${d&&hi.has(Number(d))?'bg-pink-100 text-pink-700 ring-2 ring-inset ring-pink-300':'bg-white text-slate-700'}">${d||''}</div>`).join('')}</div>${weekCue}</div>`,'Đọc theo cột thứ và hàng tuần.');
    } else if (type==='clock_read') {
        visual=panel(clockSvg(vd.hour,vd.minute),'Kim ngắn chỉ giờ · kim dài chỉ phút.');
    } else if (type==='clock_compare') {
        const labelA=esc(vd.label_a||'Đồng hồ A'), labelB=esc(vd.label_b||'Đồng hồ B');
        visual=panel(`<div class="grid grid-cols-2 gap-2 md:gap-4 w-full"><div class="text-center"><div class="text-sm font-black text-purple-600">${labelA}</div>${clockSvg(vd.a?.hour,vd.a?.minute)}</div><div class="text-center"><div class="text-sm font-black text-pink-600">${labelB}</div>${clockSvg(vd.b?.hour,vd.b?.minute)}</div></div>`,'So giờ trước; nếu cùng giờ thì so tiếp số phút.');
    } else if (type==='clock_duration') {
        visual=panel(`<div class="grid grid-cols-[1fr_auto_1fr] gap-1 md:gap-3 items-center w-full"><div>${clockSvg(vd.start?.hour,vd.start?.minute,'Bắt đầu')}</div><div class="text-3xl font-black text-pink-500">→</div><div>${clockSvg(vd.end?.hour,vd.end?.minute,'Kết thúc')}</div></div>`,'Tiến kim theo các mốc quen thuộc rồi cộng thời gian.');
    } else if (type==='money_note') {
        const notes=Array.isArray(vd.notes)?vd.notes:[];
        visual=panel(`<div class="flex flex-wrap items-center justify-center gap-3">${notes.map(noteSvg).join('')}</div>`,'Đây là thẻ tiền học tập, dùng để nhận biết mệnh giá và tính tiền.');
    } else if (type==='money_shop' || type==='money_make') {
        const price=Number(vd.price||vd.target||0);
        const notes=type==='money_make' ? [100,200,500,1000] : (Array.isArray(vd.notes)?vd.notes:[]);
        const helperText=type==='money_make' ? 'Chọn cách ghép các mệnh giá để đủ đúng số tiền.' : 'Cộng tiền đang có rồi so với giá cần trả.';
        visual=panel(`<div class="flex flex-col items-center"><div class="text-6xl">${esc(vd.emoji||'🛒')}</div><div class="mt-2 rounded-full bg-amber-50 border-2 border-amber-200 px-4 py-1.5 text-lg font-black text-amber-800">${vd.item?esc(vd.item)+' · ':''}${price.toLocaleString('vi-VN')} đồng</div><div class="mt-4 flex flex-wrap justify-center gap-2">${notes.map(noteSvg).join('')}</div></div>`,helperText);
    } else if (type==='clock_24h') {
        const h24=Number(vd.hour24||0), m=Number(vd.minute||0), h12=(h24%12)||12;
        visual=panel(`<div class="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-3 items-center w-full"><div>${clockSvg(h12,m)}</div><div class="flex flex-col items-center gap-2"><div class="text-5xl">${esc(vd.period_icon||'🕒')}</div><div class="rounded-2xl border-2 border-emerald-200 bg-white px-4 py-3 text-2xl md:text-3xl font-black text-emerald-800">${String(h24).padStart(2,'0')}:${String(m).padStart(2,'0')}</div></div></div>`,'Hệ 24 giờ giúp phân biệt rõ sáng, chiều, tối và đêm.');
    } else if (type==='daily_schedule') {
        const h24=Number(vd.hour24||0), m=Number(vd.minute||0), h12=(h24%12)||12;
        visual=panel(`<div class="flex flex-col items-center"><div class="text-6xl">${esc(vd.period_icon||'🌤️')}</div><div class="mt-2 text-xl md:text-2xl font-black text-emerald-800">${esc(vd.activity||'Hoạt động')}</div><div class="mt-2 w-full max-w-[260px]">${clockSvg(h12,m)}</div></div>`,'Nhìn hoạt động và buổi trong ngày để đổi sang hệ 24 giờ.');
    } else if (type==='time_reasoning') {
        const kind=String(vd.kind||'');
        if(kind==='day') {
            visual=panel(`<div class="grid grid-cols-4 gap-2 md:gap-3 w-full max-w-md">${['🌅','☀️','🌇','🌙'].map((x,i)=>`<div class="rounded-2xl border-2 border-cyan-100 bg-white p-3 text-center"><div class="text-4xl">${x}</div><div class="mt-1 text-xs font-black text-slate-500">${['Sáng','Trưa','Chiều','Đêm'][i]}</div></div>`).join('')}</div>`,'Một ngày gồm các buổi nối tiếp nhau. Con nhớ lại mốc của một ngày.');
        } else if(kind==='hour') {
            visual=panel(`<svg viewBox="0 0 360 170" class="w-full max-w-[430px]"><circle cx="180" cy="82" r="64" fill="#fff" stroke="#c4b5fd" stroke-width="5"/>${Array.from({length:12},(_,i)=>{const a=(i*30-90)*Math.PI/180;const x1=180+Math.cos(a)*51,y1=82+Math.sin(a)*51,x2=180+Math.cos(a)*61,y2=82+Math.sin(a)*61;return `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="#7c3aed" stroke-width="4" stroke-linecap="round"/>`}).join('')}<circle cx="180" cy="82" r="6" fill="#ec4899"/><text x="180" y="162" text-anchor="middle" font-size="16" font-weight="900" fill="#475569">Một vòng của kim phút</text></svg>`,'Hãy nhớ kim phút đi trọn một vòng thì kim giờ tiến thêm một số.');
        } else {
            const h24=Number(vd.hour24 ?? vd.a ?? 0), m=Number(vd.minute||0), h12=(h24%12)||12;
            visual=panel(`<div class="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-3 items-center w-full"><div>${clockSvg(h12,m)}</div><div class="flex flex-col items-center gap-2"><div class="text-5xl">${esc(vd.period_icon||'🕒')}</div><div class="rounded-2xl border-2 border-emerald-200 bg-white px-4 py-3 text-2xl md:text-3xl font-black text-emerald-800">${String(h24).padStart(2,'0')}:${String(m).padStart(2,'0')}</div></div></div>`,'Nhìn thời điểm và xác định cách gọi phù hợp trong ngày.');
        }
    }
    if (!visual) return null;
    return {prompt:q.question_text, visual, layout:'measure_split', inlineSpeaker:true};
}


function buildPatternLogicPresentation_(q) {
    const sub = String(q?.sub_topic || q?.sub_id || '').trim();
    if (!/^6\.[1-4]$/.test(sub) || !q?.explore_type) return null;
    const vd = q.visual_data || {};
    const esc = (v) => escapeHtml(String(v ?? ''));
    const chip = (v, tone='cyan', blank=false) => `<div class="min-w-[54px] h-[54px] md:min-w-[64px] md:h-[64px] px-2 rounded-2xl border-2 ${blank ? 'border-dashed border-fuchsia-300 bg-white text-fuchsia-500' : `border-${tone}-200 bg-${tone}-50 text-${tone}-800`} flex items-center justify-center text-xl md:text-2xl font-black shadow-sm">${blank ? '?' : esc(v)}</div>`;
    const arrow = (label='', tone='slate') => `<div class="flex flex-col items-center justify-center shrink-0 px-0.5"><span class="text-[10px] md:text-xs font-black text-${tone}-500 min-h-[16px]">${label ? esc(label) : '&nbsp;'}</span><span class="text-xl md:text-2xl font-black text-${tone}-300">→</span></div>`;
    const panel = (inner, note='') => `<div class="w-full h-full min-h-[270px] flex flex-col items-center justify-center rounded-3xl border-2 border-cyan-100 bg-gradient-to-br from-white via-cyan-50/55 to-indigo-50/55 p-3 md:p-4 overflow-hidden">${inner}${note ? `<div class="mt-4 text-xs md:text-sm font-extrabold text-slate-500 text-center leading-snug">${esc(note)}</div>` : ''}</div>`;

    const shapeHtml = (key, blank=false) => {
        if (blank) return `<div class="w-16 h-16 md:w-[74px] md:h-[74px] rounded-2xl border-3 border-dashed border-fuchsia-300 bg-white flex items-center justify-center text-3xl font-black text-fuchsia-500 shadow-sm">?</div>`;
        const k=String(key||'');
        if (k==='circle') return `<div class="w-14 h-14 md:w-16 md:h-16 rounded-full bg-sky-400 border-4 border-sky-200 shadow-sm"></div>`;
        if (k==='square') return `<div class="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-amber-300 border-4 border-amber-100 shadow-sm"></div>`;
        if (k==='triangle') return `<div class="w-0 h-0 border-l-[30px] md:border-l-[34px] border-r-[30px] md:border-r-[34px] border-b-[56px] md:border-b-[64px] border-l-transparent border-r-transparent border-b-emerald-400 drop-shadow-sm"></div>`;
        if (k==='rectangle') return `<div class="w-[76px] h-12 md:w-[88px] md:h-14 rounded-xl bg-violet-400 border-4 border-violet-200 shadow-sm"></div>`;
        return `<div class="w-14 h-14 rounded-xl bg-slate-100 border-2 border-slate-200"></div>`;
    };

    let visual='';
    const type=String(q.explore_type||'');
    if (type==='pattern_constant_step') {
        const seq=Array.isArray(vd.sequence)?vd.sequence:[];
        const label = vd.show_step_hint ? `${String(vd.direction)==='down' ? '−' : '+'}${Math.abs(Number(vd.step)||0)}` : '';
        visual=panel(`<div class="flex items-center justify-center flex-wrap gap-y-3">${seq.map((v,i)=>`${chip(v,'cyan',v===null)}${i<seq.length-1?arrow(label,'cyan'):''}`).join('')}</div>`, vd.show_step_hint ? 'Mỗi bước thay đổi cùng một lượng.' : 'So sánh khoảng cách giữa các số liền nhau.');
    } else if (type==='pattern_cycle_steps') {
        const seq=Array.isArray(vd.sequence)?vd.sequence:[];
        const steps=Array.isArray(vd.steps)?vd.steps.map(Number):[0,0];
        visual=panel(`<div class="flex items-center justify-center flex-wrap gap-y-3">${seq.map((v,i)=>{ const st=steps[i%2]||0; const lab=vd.show_steps ? `${st>=0?'+':'−'}${Math.abs(st)}` : ''; return `${chip(v,i%2?'indigo':'cyan',v===null)}${i<seq.length-1?arrow(lab,i%2?'indigo':'fuchsia'):''}`; }).join('')}</div><div class="mt-4 flex gap-2"><span class="rounded-full border border-fuchsia-200 bg-fuchsia-50 px-3 py-1 text-xs font-black text-fuchsia-700">Bước 1</span><span class="rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-black text-indigo-700">Bước 2</span></div>`, vd.show_steps ? 'Hai bước nhảy lặp lại theo đúng thứ tự.' : 'Tìm hai bước nhảy rồi kiểm tra xem chúng có lặp lại không.');
    } else if (type==='number_triangle_sum') {
        const val=(x)=>x===null||x===undefined?'?':x;
        const cls=(x)=>x===null||x===undefined?'fill:#fff;stroke:#e879f9;stroke-dasharray:7 5':'fill:#fff;stroke:#67e8f9';
        visual=panel(`<svg viewBox="0 0 430 280" class="w-full max-w-[470px]" aria-label="Sơ đồ tam giác số">
            <path d="M215 42 L76 226 L354 226 Z" fill="none" stroke="#c4b5fd" stroke-width="7" stroke-linejoin="round"/>
            <circle cx="215" cy="42" r="38" style="${cls(vd.top)}" stroke-width="5"/><text x="215" y="51" text-anchor="middle" font-size="26" font-weight="900" fill="#4338ca">${esc(val(vd.top))}</text>
            <circle cx="76" cy="226" r="38" style="${cls(vd.left)}" stroke-width="5"/><text x="76" y="235" text-anchor="middle" font-size="26" font-weight="900" fill="#0e7490">${esc(val(vd.left))}</text>
            <circle cx="354" cy="226" r="38" style="${cls(vd.right)}" stroke-width="5"/><text x="354" y="235" text-anchor="middle" font-size="26" font-weight="900" fill="#0e7490">${esc(val(vd.right))}</text>
            <circle cx="215" cy="157" r="48" style="${cls(vd.center)}" stroke-width="6"/><text x="215" y="167" text-anchor="middle" font-size="30" font-weight="900" fill="#be185d">${esc(val(vd.center))}</text>
            <text x="215" y="270" text-anchor="middle" font-size="15" font-weight="900" fill="#64748b">3 đỉnh cộng lại → số ở giữa</text>
        </svg>`,'Có thể cộng hai số thuận tiện trước, rồi cộng số còn lại.');
    } else if (type==='shape_repeat_pattern') {
        const seq=Array.isArray(vd.sequence)?vd.sequence:[];
        visual=panel(`<div class="flex items-center justify-center flex-wrap gap-2 md:gap-3">${seq.map((k,i)=>`<div class="flex items-center gap-2 md:gap-3">${shapeHtml(k,k===null)}${i<seq.length-1?'<span class="text-2xl font-black text-slate-300">→</span>':''}</div>`).join('')}</div>`, 'Tìm nhóm hình ngắn nhất đang lặp lại rồi tiếp tục đúng thứ tự.');
    }
    if (!visual) return null;
    return {prompt:q.question_text, visual, layout:'pattern_split', inlineSpeaker:true};
}



// ==========================================
// LỜI GIẢI SƯ PHẠM MỤC 5-6
// Giữ hình minh họa ở cột trái; chỉ hiện lời giải ngay dưới hình sau khi bé trả lời đúng.
// ==========================================
function isTopic56PracticeQuestion_(q) {
    if (!q || activeExamContext || activeRoadmapContext) return false;
    return [5, 6].includes(Number(pendingTopicQuiz?.topicNum));
}

function buildTopic56SolutionData_(q) {
    if (!isTopic56PracticeQuestion_(q)) return null;
    const topicNum = Number(pendingTopicQuiz?.topicNum);
    const sub = String(q?.sub_id || q?.sub_topic || '').trim();
    const raw = String(q?.question_text || '');
    const answer = String(q?.answer ?? '');
    const vd = q?.visual_data || {};
    let rule = '';
    let steps = [];
    let check = answer ? `Đáp án đúng: ${answer}.` : '';

    if (topicNum === 5) {
        if (sub === '4.1') {
            rule = 'Ba điểm thẳng hàng khi cả ba cùng nằm trên một đường thẳng.';
            steps = ['Quan sát đường thẳng trong hình.', 'Kiểm tra lần lượt ba điểm có cùng nằm trên đường đó hay không.', `Chọn đáp án ${answer}.`];
        } else if (sub === '4.2') {
            const nums = (raw.match(/\d+(?:[.,]\d+)?\s*cm/gi) || []).map(x=>Number(x.replace(/\s*cm/i,'').replace(',','.'))).filter(Number.isFinite);
            rule = 'Độ dài đường gấp khúc bằng tổng độ dài các đoạn thẳng tạo nên nó.';
            if (nums.length >= 2) {
                const sum = nums.reduce((a,b)=>a+b,0);
                steps = [`Đọc độ dài từng đoạn: ${nums.join(' cm, ')} cm.`, `Cộng các đoạn: ${nums.join(' + ')} = ${sum} cm.`, `Đối chiếu với đáp án: ${answer}.`];
            }
        } else if (sub === '4.3') {
            rule = 'Đếm hình theo một thứ tự cố định để không bỏ sót và không đếm trùng.';
            steps = ['Bắt đầu từ góc trên bên trái.', 'Chỉ lần lượt từng hình theo hàng hoặc theo chiều kim đồng hồ.', `Tổng số hình cần đếm là ${answer}.`];
        } else if (sub === '4.4') {
            rule = 'Nhận diện khối dựa vào mặt, cạnh và bề mặt cong; không chỉ dựa vào màu sắc hay tư thế.';
            steps = ['Quan sát hình vật thể.', 'So sánh đặc điểm với khối lập phương, hộp chữ nhật, khối trụ và khối cầu.', `Vật thể phù hợp với ${answer}.`];
        } else if (sub === '4.5') {
            const task = String(vd.assembly_task || '');
            rule = 'Nhìn số mảnh và quy tắc ghép trên hình trước, rồi mới tính.';
            if (task === 'remaining') steps = [`Có ${vd.piece_count} mảnh ban đầu.`, `Đã dùng ${vd.used_count} mảnh.`, `${vd.piece_count} − ${vd.used_count} = ${vd.leftover}, nên còn ${vd.leftover} mảnh.`];
            else if (task === 'pair_count') steps = [`Mỗi hình vuông cần ${vd.pieces_per_target} mảnh.`, `Chia ${vd.piece_count} mảnh thành các cặp ${vd.pieces_per_target} mảnh.`, `${vd.piece_count} ÷ ${vd.pieces_per_target} = ${vd.target_count} hình vuông.`];
            else if (task === 'pieces_needed' || task === 'reassemble') steps = [`Mỗi hình cần ${vd.pieces_per_target} mảnh.`, `Có ${vd.target_count} hình cần ghép.`, `${vd.target_count} × ${vd.pieces_per_target} = ${vd.piece_count} mảnh.`];
            else if (task === 'target_name') steps = ['Ghép hai tam giác theo cạnh dài.', 'Quan sát đường bao ngoài có 4 cạnh bằng nhau và 4 góc vuông.', 'Hình tạo thành là hình vuông.'];
            else if (task === 'vertices') steps = ['Bỏ qua các đường ghép ở bên trong.', 'Chỉ đi theo đường bao ngoài và đếm từng góc.', `${vd.target_shape} có ${vd.vertex_count} đỉnh.`];
            else if (task === 'difference') steps = [`Đã dùng ${vd.used_count} mảnh và còn ${vd.leftover} mảnh.`, `Tìm phần hơn: ${vd.used_count} − ${vd.leftover} = ${vd.difference}.`];
            else if (task === 'max_complete') steps = [`Ghép ${vd.piece_count} mảnh theo từng cặp ${vd.pieces_per_target}.`, `Tạo được ${vd.target_count} hình hoàn chỉnh và còn ${vd.leftover} mảnh.`, `Vậy nhiều nhất là ${vd.target_count} hình vuông.`];
            else if (task === 'reverse_total') steps = [`${vd.target_count} hình dùng ${vd.target_count} × ${vd.pieces_per_target} = ${vd.target_count*vd.pieces_per_target} mảnh.`, `Cộng ${vd.leftover} mảnh còn dư.`, `Tổng ban đầu là ${vd.piece_count} mảnh.`];
            else if (task === 'choose_plan') steps = [`Mỗi hình cần ${vd.pieces_per_target} mảnh.`, `${vd.piece_count} ÷ ${vd.pieces_per_target} = ${vd.target_count}.`, `Phương án dùng hết mảnh là ghép ${vd.target_count} hình vuông.`];
            else if (task === 'compare_targets') steps = [`Hình A dùng ${vd.target_a} mảnh.`, `Hình B dùng ${vd.target_b} mảnh.`, `${vd.target_b} − ${vd.target_a} = ${vd.difference} mảnh.`];
            else if (task === 'add_to_even') steps = [`Hiện có ${vd.piece_count} mảnh là số lẻ.`, `Mỗi hình cần 2 mảnh nên tổng số mảnh phải là số chẵn.`, `Thêm 1 mảnh để được ${vd.piece_count+1} mảnh.`];
        }
    } else if (topicNum === 6) {
        const type = String(q?.explore_type || '');
        if (type === 'length_ruler') {
            const start=Number(vd.start||0), end=Number(vd.end||0), len=end-start;
            rule = 'Độ dài vật bằng số ở vạch cuối trừ số ở vạch đầu.';
            steps = [`Vạch đầu là ${start} cm, vạch cuối là ${end} cm.`, `${end} − ${start} = ${len} cm.`, `Chọn đáp án ${answer}.`];
        } else if (type === 'length_convert') {
            rule = '1 dm = 10 cm. Đổi về cùng một đơn vị trước khi tính hoặc so sánh.';
            steps = [String(q?.hint || q?.explanation || '').replace(/^Cô giáo Thỏ Ngọc gợi ý:\s*/i,'').trim() || `Đổi số đo về cùng đơn vị rồi chọn ${answer}.`];
        } else if (type === 'length_unit_choice' || type === 'length_estimate') {
            rule = 'Chọn đơn vị phù hợp với kích thước thực tế của đồ vật hoặc quãng đường.';
            steps = ['Xác định vật nhỏ, vật trong phòng hay quãng đường xa.', 'So sánh với các đơn vị cm, dm hoặc đơn vị được cho.', `Đáp án phù hợp là ${answer}.`];
        } else if (type === 'length_path') {
            const a=Number(vd.a||0), b=Number(vd.b||0), op=String(vd.op||'+'), unit=String(vd.unit||'m');
            rule = op === '+' ? 'Tổng quãng đường bằng tổng độ dài các đoạn.' : 'Muốn tìm phần chênh lệch, lấy số đo lớn trừ số đo bé.';
            const result = op === '+' ? a+b : Math.abs(a-b);
            steps = [`Hai đoạn có độ dài ${a} ${unit} và ${b} ${unit}.`, `${Math.max(a,b)} ${op==='+'?'+':'−'} ${op==='+'?Math.min(a,b):Math.min(a,b)} = ${result} ${unit}.`, `Đối chiếu với đáp án ${answer}.`];
        } else if (type === 'weight_balance') {
            const ws=Array.isArray(vd.weights)?vd.weights.map(Number).filter(Number.isFinite):[];
            const total=ws.reduce((a,b)=>a+b,0);
            rule = 'Cân thăng bằng nghĩa là khối lượng hai bên bằng nhau.';
            steps = [`Cộng các quả cân bên phải: ${ws.length?ws.join(' + '):'?'}${ws.length?` = ${total} kg`:''}.`, 'Vì cân đang thăng bằng nên vật bên trái có khối lượng bằng tổng đó.', `Chọn ${answer}.`];
        } else if (type === 'weight_arithmetic') {
            const a=Number(vd.a||0), b=Number(vd.b||0), op=String(vd.op||'+');
            const result=op==='-'?a-b:a+b;
            rule = 'Tính với số đo khối lượng như với số tự nhiên, rồi ghi đơn vị kg.';
            steps = [`Thực hiện phép tính: ${a} ${op==='-'?'−':'+'} ${b} = ${result}.`, `Ghi đơn vị: ${result} kg.`, `Đáp án đúng là ${answer}.`];
        } else if (type === 'weight_compare') {
            const a=Number(vd.a||0), b=Number(vd.b||0);
            rule = 'Hai số đo cùng đơn vị kg có thể so sánh trực tiếp.';
            steps = [`So sánh ${a} và ${b}.`, `${a} ${a>b?'>':a<b?'<':'='} ${b}.`, `Chọn ${answer}.`];
        } else if (type === 'liter_measure') {
            const a=Number(vd.a||0), b=Number(vd.b||0), kind=String(vd.kind||'plus');
            rule = 'Lít (l) dùng để đo dung tích; đọc đúng tình huống rồi chọn cộng, trừ, chia hoặc so sánh.';
            if (kind==='cups') steps = [`Có ${a} cốc, mỗi cốc ${b} l.`, `Tổng dung tích là ${a} × ${b} = ${a*b} l.`, `Chọn ${answer}.`];
            else if (kind==='groups') steps = [`Có ${a} l, mỗi can chứa ${b} l.`, `${a} ÷ ${b} = ${b?Math.floor(a/b):0} can.`, `Chọn ${answer}.`];
            else if (kind==='minus'||kind==='difference') steps = [`So sánh hoặc tìm phần chênh lệch giữa ${a} l và ${b} l.`, `${Math.max(a,b)} − ${Math.min(a,b)} = ${Math.abs(a-b)} l.`, `Chọn ${answer}.`];
            else if (kind==='compare') steps = [`Hai số đo đều là lít nên so sánh trực tiếp ${a} và ${b}.`, `${a} ${a>b?'>':a<b?'<':'='} ${b}.`, `Chọn ${answer}.`];
            else steps = [`Cộng hai lượng chất lỏng: ${a} + ${b} = ${a+b} l.`, `Chọn ${answer}.`];
        } else if (type === 'measure_choice') {
            rule = 'Khối lượng đo bằng kg; dung tích chất lỏng đo bằng l.';
            steps = ['Nhìn vật hoặc chất được hỏi.', 'Nếu hỏi nặng bao nhiêu thì chọn kg; nếu hỏi chứa bao nhiêu chất lỏng thì chọn l.', `Đáp án đúng là ${answer}.`];
        } else if (type.startsWith('calendar_')) {
            rule = 'Đọc lịch theo cột thứ và hàng tuần; sau 1 tuần là sau 7 ngày.';
            if (type==='calendar_week_jump' && Number(vd.from)) {
                const from=Number(vd.from), to=from+7;
                steps = [`Ngày bắt đầu là ${from}.`, `Sau 1 tuần: ${from} + 7 = ${to}.`, `Đối chiếu với đáp án ${answer}.`];
            } else {
                steps = [String(q?.hint || q?.explanation || '').replace(/^Cô giáo Thỏ Ngọc gợi ý:\s*/i,'').trim() || 'Xác định đúng tháng, thứ và ngày trên lịch.', `Chọn ${answer}.`];
            }
        } else if (type === 'clock_read') {
            const h=Number(vd.hour||0), m=Number(vd.minute||0);
            rule = 'Kim ngắn chỉ giờ, kim dài chỉ phút.';
            steps = [`Đọc kim giờ: ${h} giờ.`, `Đọc kim phút: ${m} phút.`, `Thời gian là ${h} giờ ${m} phút; chọn ${answer}.`];
        } else if (type === 'clock_compare') {
            const ah=Number(vd.a?.hour||0), am=Number(vd.a?.minute||0), bh=Number(vd.b?.hour||0), bm=Number(vd.b?.minute||0);
            rule = 'So giờ trước; nếu cùng giờ mới so tiếp số phút.';
            steps = [`Đồng hồ A: ${ah}:${String(am).padStart(2,'0')}. Đồng hồ B: ${bh}:${String(bm).padStart(2,'0')}.`, 'So sánh hai thời điểm theo giờ rồi đến phút.', `Chọn ${answer}.`];
        } else if (type === 'clock_duration') {
            const sh=Number(vd.start?.hour||0), sm=Number(vd.start?.minute||0), eh=Number(vd.end?.hour||0), em=Number(vd.end?.minute||0);
            const startMin=sh*60+sm, endMin=eh*60+em, dur=Math.max(0,endMin-startMin);
            rule = 'Khoảng thời gian bằng thời điểm kết thúc trừ thời điểm bắt đầu.';
            steps = [`Bắt đầu lúc ${sh}:${String(sm).padStart(2,'0')}, kết thúc lúc ${eh}:${String(em).padStart(2,'0')}.`, `Khoảng cách là ${dur} phút.`, `Đối chiếu với đáp án ${answer}.`];
        } else if (type.includes('money')) {
            rule = 'Tính tiền bằng cách cộng các mệnh giá; nếu mua hàng thì so sánh với giá cần trả.';
            steps = [String(q?.hint || q?.explanation || '').replace(/^Cô giáo Thỏ Ngọc gợi ý:\s*/i,'').trim() || 'Cộng lần lượt các tờ/đồng tiền rồi đối chiếu với giá.', `Kết quả là ${answer}.`];
        } else if (type === 'clock_24h' || type === 'daily_schedule') {
            rule = 'Đọc giờ và phút trước; sau đó dùng buổi trong ngày để đổi giữa cách nói 12 giờ và 24 giờ.';
            steps = [String(q?.hint || q?.explanation || '').replace(/^Cô giáo Thỏ Ngọc gợi ý:\s*/i,'').trim() || 'Quan sát kim giờ, kim phút và thời điểm trong ngày.', `Chọn ${answer}.`];
        } else if (type === 'time_reasoning') {
            rule = 'Dựa vào mốc thời gian chuẩn: 1 giờ = 60 phút, 1 ngày = 24 giờ và các buổi nối tiếp nhau.';
            steps = [String(q?.hint || q?.explanation || '').replace(/^Cô giáo Thỏ Ngọc gợi ý:\s*/i,'').trim() || 'Xác định mốc thời gian liên quan rồi suy luận.', `Kết luận: ${answer}.`];
        } else {
            rule = 'Đọc đúng đại lượng, đơn vị và dữ kiện trong hình trước khi tính.';
            steps = [String(q?.hint || q?.explanation || '').replace(/^Cô giáo Thỏ Ngọc gợi ý:\s*/i,'').trim() || `Đối chiếu hình minh họa với câu hỏi để chọn ${answer}.`];
        }
    }

    steps = steps.map(s=>String(s||'').trim()).filter(Boolean);
    return { rule, steps, check };
}

function buildTopic56SolutionHtml_(q) {
    const data = buildTopic56SolutionData_(q);
    if (!data) return '';
    const steps = data.steps.map((s,i)=>`<div class="flex items-start gap-2 text-sm md:text-base font-black text-slate-700 leading-relaxed"><span class="shrink-0 w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs">${i+1}</span><span>${escapeHtml(s)}</span></div>`).join('');
    return `<div data-topic56-solution class="hidden mt-3 w-full rounded-2xl border-2 border-emerald-200 bg-gradient-to-br from-emerald-50/95 to-cyan-50/80 p-3 md:p-4 shadow-sm">
        <div class="text-lg md:text-xl font-black text-emerald-700 mb-2">🌱 Cùng xem lời giải</div>
        ${data.rule ? `<div class="mb-3 rounded-xl border-2 border-violet-200 bg-white/90 px-3 py-2 text-sm md:text-base font-black text-violet-800 leading-snug"><span class="text-violet-500">Quy tắc:</span> ${escapeHtml(data.rule)}</div>` : ''}
        <div class="rounded-xl border border-emerald-100 bg-white/85 px-3 py-3 space-y-2">${steps}</div>
        ${data.check ? `<div class="mt-3 rounded-xl border-2 border-sky-200 bg-sky-50 px-3 py-2 text-sm md:text-base font-black text-sky-800 text-center">✅ ${escapeHtml(data.check)}</div>` : ''}
    </div>`;
}

function revealTopic56Solution_(q) {
    if (!isTopic56PracticeQuestion_(q)) return;
    document.querySelectorAll('[data-topic56-solution]').forEach(el=>el.classList.remove('hidden'));
}

// ==========================================
// LỜI GIẢI SƯ PHẠM MỤC 8-11
// Mục 8: lời giải xuất hiện ngay dưới hình minh họa sau khi trả lời đúng.
// Mục 9-11: desktop/tablet dùng bố cục 2 cột như Mục 7 (trái lời giải, phải câu hỏi + đáp án).
// Chỉ dùng trong Khám phá; không làm lộ lời giải ở Đề thi/Bài tập theo lộ trình.
// ==========================================
function isTopic811PracticeQuestion_(q) {
    if (!q || activeExamContext || activeRoadmapContext) return false;
    return [8, 9, 10, 11].includes(Number(pendingTopicQuiz?.topicNum));
}

function topic811ExplanationLines_(q) {
    const raw = String(q?.explanation || q?.hint || '').trim();
    if (!raw || raw === 'Không có giải thích chi tiết.') return [];
    return raw
        .replace(/\r/g, '')
        .split(/\n+|(?<=[.!?;])\s+/)
        .map(x => x.trim().replace(/^[•\-–]\s*/, ''))
        .filter(Boolean);
}

function topic811ShapeName_(value) {
    const map = {
        circle: 'hình tròn', square: 'hình vuông', triangle: 'hình tam giác',
        rectangle: 'hình chữ nhật'
    };
    const key = String(value ?? '').trim().toLowerCase();
    return map[key] || String(value ?? '');
}

function topic811SignedStep_(n) {
    const v = Number(n) || 0;
    return v >= 0 ? `+ ${v}` : `− ${Math.abs(v)}`;
}

function topic811ApplyStepText_(base, step, result) {
    const v = Number(step) || 0;
    return `${base} ${v >= 0 ? '+' : '−'} ${Math.abs(v)} = ${result}`;
}

function buildTopic811SolutionData_(q) {
    const topicNum = Number(pendingTopicQuiz?.topicNum);
    if (![8, 9, 10, 11].includes(topicNum)) return null;

    const sub = String(q?.sub_topic || q?.sub_id || '').trim();
    const type = String(q?.explore_type || '').trim();
    const vd = q?.visual_data || {};
    const answer = String(q?.answer ?? '').trim();
    const explanationLines = topic811ExplanationLines_(q);
    let rule = '';
    let tip = '';
    let steps = [];
    let check = answer ? `Đáp án đúng: ${answer}.` : '';

    if (topicNum === 8) {
        if (type === 'pattern_constant_step') {
            const seq = Array.isArray(vd.sequence) ? vd.sequence : [];
            const step = Number(vd.step || 0);
            const missing = seq.findIndex(v => v === null || v === undefined);
            rule = `Mỗi số thay đổi cùng một bước: ${topic811SignedStep_(step)}.`;
            tip = 'So sánh hai số liền nhau để tìm bước nhảy trước khi điền ô trống.';
            steps.push(`Nhận ra bước nhảy của dãy là ${topic811SignedStep_(step)}.`);
            if (missing > 0 && Number.isFinite(Number(seq[missing - 1]))) {
                steps.push(topic811ApplyStepText_(Number(seq[missing - 1]), step, answer));
            } else if (missing >= 0 && missing < seq.length - 1 && Number.isFinite(Number(seq[missing + 1]))) {
                const next = Number(seq[missing + 1]);
                const reverse = -step;
                steps.push(`Đi ngược một bước: ${topic811ApplyStepText_(next, reverse, answer)}.`);
            }
            check = `Điền ${answer} thì các bước nhảy của dãy vẫn giữ đúng quy luật.`;
        } else if (type === 'pattern_cycle_steps') {
            const seq = Array.isArray(vd.sequence) ? vd.sequence : [];
            const cycle = Array.isArray(vd.steps) ? vd.steps.map(Number) : [];
            const missing = seq.findIndex(v => v === null || v === undefined);
            rule = `Hai bước nhảy lặp lại theo thứ tự${cycle.length ? `: ${cycle.map(topic811SignedStep_).join(' rồi ')}` : ''}.`;
            tip = 'Không chỉ nhìn một khoảng cách; hãy kiểm tra hai bước liên tiếp rồi xem chúng có lặp lại không.';
            steps.push('Tìm hai bước nhảy đầu tiên và kiểm tra thứ tự lặp lại.');
            if (missing > 0 && cycle.length && Number.isFinite(Number(seq[missing - 1]))) {
                const step = cycle[(missing - 1) % cycle.length];
                steps.push(topic811ApplyStepText_(Number(seq[missing - 1]), step, answer));
            }
            check = `Thay ô trống bằng ${answer}, chu kỳ bước nhảy tiếp tục khớp.`;
        } else if (type === 'number_triangle_sum') {
            const vals = {
                top: vd.top, left: vd.left, right: vd.right, center: vd.center
            };
            rule = 'Ba số ở các đỉnh cộng lại bằng số ở giữa.';
            tip = 'Nếu thiếu số ở đỉnh, lấy số giữa trừ hai đỉnh đã biết.';
            if (vals.center === null || vals.center === undefined) {
                steps.push(`${vals.top} + ${vals.left} + ${vals.right} = ${answer}`);
            } else if (vals.top === null || vals.top === undefined) {
                steps.push(`${answer} = ${vals.center} − ${vals.left} − ${vals.right}`);
            } else if (vals.left === null || vals.left === undefined) {
                steps.push(`${answer} = ${vals.center} − ${vals.top} − ${vals.right}`);
            } else if (vals.right === null || vals.right === undefined) {
                steps.push(`${answer} = ${vals.center} − ${vals.top} − ${vals.left}`);
            }
            check = `Thay ${answer} vào sơ đồ, tổng ba đỉnh đúng bằng số ở giữa.`;
        } else if (type === 'shape_repeat_pattern') {
            rule = 'Tìm nhóm hình ngắn nhất đang lặp lại, rồi tiếp tục đúng thứ tự.';
            tip = 'Có thể dùng ngón tay chia chuỗi thành các nhóm giống nhau để nhìn ra nhịp lặp.';
            steps.push('Quan sát từ đầu chuỗi và khoanh nhóm hình lặp lại ngắn nhất.');
            steps.push(`Vị trí còn thiếu phải là ${topic811ShapeName_(answer)} để nhóm lặp không bị phá vỡ.`);
            check = `Điền ${topic811ShapeName_(answer)}, chuỗi hình tiếp tục đúng nhịp lặp.`;
        }
    } else if (topicNum === 9) {
        if (sub === '8.1') {
            rule = 'Đọc xem số lượng được thêm vào hay bớt đi, rồi chọn phép cộng hoặc phép trừ phù hợp.';
            tip = 'Gạch chân số đã có, số thay đổi và câu hỏi cần tìm.';
        } else if (sub === '8.2') {
            rule = 'Với bài nhiều hơn – ít hơn, xác định rõ đại lượng nào lớn hơn, đại lượng nào bé hơn và phần chênh lệch.';
            tip = 'Có thể vẽ hai đoạn thẳng để nhìn phần hơn/kém.';
        } else if (sub === '8.3') {
            rule = 'Các nhóm bằng nhau dùng phép nhân; chia đều hoặc chia thành các nhóm bằng nhau dùng phép chia.';
            tip = 'Vẽ nhóm hoặc chấm tròn trước khi tính nếu con chưa chắc phép tính.';
        } else if (sub === '8.4') {
            rule = 'Bài toán hai bước: bước 1 tìm dữ kiện trung gian, bước 2 dùng kết quả đó để trả lời câu hỏi cuối.';
            tip = 'Không lấy tất cả các số trong đề ghép vào một phép tính ngay.';
        } else {
            rule = 'Đọc dữ kiện → xác định câu hỏi → chọn phép tính → viết đáp số.';
        }
    } else if (topicNum === 10) {
        if (sub === '9.1') {
            rule = 'Phân loại đúng từng nhóm rồi kiểm đếm có hệ thống, mỗi đối tượng chỉ được tính một lần.';
            tip = 'Đánh dấu hoặc gạch nhẹ mỗi vật sau khi đếm để tránh đếm lặp.';
        } else if (sub === '9.2') {
            rule = 'Đọc chú giải của biểu đồ trước, sau đó đếm số hình ở đúng hàng/cột cần hỏi.';
            tip = 'Nếu 1 hình đại diện nhiều hơn 1 đơn vị, phải nhân theo chú giải.';
        } else if (sub === '9.3') {
            rule = 'Chắc chắn: luôn xảy ra; có thể: có lúc xảy ra; không thể: không xảy ra trong điều kiện đã cho.';
            tip = 'Hãy tưởng tượng tất cả khả năng có thể xảy ra rồi mới chọn.';
        } else {
            rule = 'Đọc dữ liệu theo từng nhóm, đối chiếu đúng thông tin câu hỏi rồi mới kết luận.';
        }
    } else if (topicNum === 11) {
        if (sub === '10.1') {
            rule = 'Tính nhanh bằng cách nhóm các số tạo thành chục hoặc trăm tròn trước.';
            tip = 'Đổi thứ tự nhóm số khi phép tính cho phép để tạo cặp dễ tính.';
        } else if (sub === '10.2') {
            rule = 'Liệt kê từng điều kiện của số cần tìm, rồi loại dần những số không thỏa mãn.';
            tip = 'Kiểm tra lần lượt hàng trăm, hàng chục, hàng đơn vị và các ràng buộc chẵn/lẻ nếu có.';
        } else if (sub === '10.3') {
            rule = 'Đếm hình theo hệ thống: hình nhỏ trước, rồi ghép thành hình lớn hơn; không đếm trùng.';
            tip = 'Có thể đánh số từng hình nhỏ rồi liệt kê các cách ghép.';
        } else if (sub === '10.4') {
            rule = 'Cân thăng bằng nghĩa là hai vế có cùng giá trị; dùng các phần giống nhau để suy ra phần còn thiếu.';
            tip = 'Bỏ cùng một lượng ở cả hai vế thì cân vẫn giữ nguyên.';
        } else {
            rule = 'Tách bài toán thành các điều kiện nhỏ, xử lí từng điều kiện rồi kiểm tra lại kết quả.';
        }
    }

    if (explanationLines.length) {
        // Mục 8 ưu tiên phép suy luận dựng trực tiếp từ visual_data để lời giải bám đúng hình.
        // Mục 9-11 ưu tiên lời giải biên soạn trong JSON vì đó là nội dung sư phạm của từng câu.
        if (topicNum === 8 && steps.length) {
            explanationLines.forEach(line => { if (!steps.includes(line)) steps.push(line); });
        } else {
            steps = explanationLines;
        }
    }

    if (!steps.length) {
        if (topicNum === 9) {
            steps = [
                'Xác định các dữ kiện đã cho và điều bài toán yêu cầu tìm.',
                'Chọn phép tính phù hợp với mối quan hệ giữa các dữ kiện.',
                `Tính và đối chiếu với đáp án: ${answer}.`
            ];
        } else if (topicNum === 10) {
            steps = [
                'Đọc đúng dữ liệu hoặc tất cả khả năng trong hình/bảng.',
                'Kiểm đếm hoặc phân loại theo đúng yêu cầu của câu hỏi.',
                `Đối chiếu kết quả và chọn ${answer}.`
            ];
        } else if (topicNum === 11) {
            steps = [
                'Tìm điều kiện quan trọng nhất của bài toán.',
                'Suy luận từng bước, tránh thử đáp án ngẫu nhiên.',
                `Kiểm tra lại tất cả điều kiện: kết quả là ${answer}.`
            ];
        } else if (topicNum === 8) {
            steps = [
                'Quan sát các phần tử đứng cạnh nhau để tìm quy luật.',
                `Áp dụng đúng quy luật vào vị trí còn thiếu để được ${answer}.`
            ];
        }
    }

    return { topicNum, rule, tip, steps, check };
}

function buildTopic811SolutionHtml_(q, placement = 'side') {
    const data = buildTopic811SolutionData_(q);
    if (!data) return '';
    const side = placement === 'side';
    const stepsHtml = data.steps.map((step, idx) => `
        <div class="flex items-start gap-2 text-sm md:text-base font-black text-slate-700 leading-relaxed">
            <span class="shrink-0 w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs">${idx + 1}</span>
            <span>${escapeHtml(step)}</span>
        </div>`).join('');
    return `<div data-topic811-solution class="hidden ${side ? 'h-full' : 'mt-3'} w-full rounded-2xl border-2 border-emerald-200 bg-gradient-to-br from-emerald-50/95 to-cyan-50/80 p-3 md:p-4 shadow-sm">
        <div class="flex flex-wrap items-center justify-between gap-2 mb-2">
            <div class="text-lg md:text-xl font-black text-emerald-700">🌱 Cùng xem lời giải</div>
            ${data.tip ? `<div class="rounded-xl border border-amber-200 bg-amber-50 px-2.5 py-1.5 text-xs md:text-sm font-black text-amber-800">💡 ${escapeHtml(data.tip)}</div>` : ''}
        </div>
        ${data.rule ? `<div class="mb-3 rounded-xl border-2 border-violet-200 bg-white/90 px-3 py-2 text-sm md:text-base font-black text-violet-800 leading-snug"><span class="text-violet-500">Quy tắc:</span> ${escapeHtml(data.rule)}</div>` : ''}
        <div class="rounded-xl border border-emerald-100 bg-white/85 px-3 py-3 space-y-2">${stepsHtml}</div>
        ${data.check ? `<div class="mt-3 rounded-xl border-2 border-sky-200 bg-sky-50 px-3 py-2 text-sm md:text-base font-black text-sky-800 text-center leading-snug">✅ ${escapeHtml(data.check)}</div>` : ''}
    </div>`;
}

function topic811SolutionPlaceholderHtml_() {
    return `<div data-topic811-solution-placeholder class="h-full min-h-[180px] rounded-2xl border-2 border-emerald-100 bg-gradient-to-br from-emerald-50/55 to-cyan-50/45 px-4 py-4 flex flex-col items-center justify-center text-center">
        <div class="text-3xl mb-2">🌱</div>
        <div class="text-base md:text-lg font-black text-emerald-700">Lời giải sẽ hiện ở đây</div>
        <div class="mt-1 text-xs md:text-sm font-bold text-slate-500">Bé tìm được đáp án đúng rồi mình cùng xem cách suy luận nhé!</div>
    </div>`;
}

function revealTopic811Solution_(q) {
    if (!isTopic811PracticeQuestion_(q)) return;
    document.querySelectorAll('[data-topic811-solution-placeholder]').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('[data-topic811-solution]').forEach(el => el.classList.remove('hidden'));
}


function isUnknownNumberQuestion_(q) {
    const sub = String(q?.sub_topic || q?.sub_id || '').trim();
    return /^7\.[1-4]$/.test(sub);
}

function buildUnknownBridgeSplit_(total, known, answer) {
    total = Number(total); known = Number(known); answer = Number(answer);
    if (![total, known, answer].every(Number.isFinite) || known <= 1) return null;

    // Ưu tiên tách để phép trừ thứ nhất đưa số bị trừ về một số tròn chục
    // gần đáp án. Ví dụ: 52 - 23 -> tách 23 = 22 + 1 -> 52 - 22 = 30.
    const targetTen = Math.ceil(answer / 10) * 10;
    const first = total - targetTen;
    const second = known - first;
    if (first > 0 && second > 0 && first < known && first + second === known) {
        return { first, second, target: targetTen };
    }

    // Nếu đáp án đã tròn chục, dùng cách tách chục - đơn vị quen thuộc.
    const tens = Math.floor(known / 10) * 10;
    const ones = known - tens;
    if (tens > 0 && ones > 0) {
        return { first: tens, second: ones, target: total - tens };
    }
    return null;
}

function getUnknownNumberMeta_(q) {
    if (!isUnknownNumberQuestion_(q)) return null;
    const sub = String(q?.sub_topic || q?.sub_id || '').trim();
    const raw = String(q?.question_text || '').replace(/−/g, '-');
    const answer = Number(q?.answer);
    if (!Number.isFinite(answer)) return null;

    let match = null;
    let meta = { sub, raw, answer, kind: '', operands: [], operators: [], prompt: '' };

    if (sub === '7.1') {
        match = raw.match(/\bx\s*\+\s*(\d+)\s*=\s*(\d+)/i);
        if (match) {
            const known = Number(match[1]), total = Number(match[2]);
            meta = { ...meta, kind: 'unknown_addend', known, total,
                operands: ['x', known, total], operators: ['+', '='] };
        }
    } else if (sub === '7.2') {
        match = raw.match(/\bx\s*-\s*(\d+)\s*=\s*(\d+)/i);
        if (match) {
            const subtrahend = Number(match[1]), difference = Number(match[2]);
            meta = { ...meta, kind: 'unknown_minuend', subtrahend, difference,
                operands: ['x', subtrahend, difference], operators: ['−', '='] };
        } else {
            match = raw.match(/(\d+)\s*-\s*x\s*=\s*(\d+)/i);
            if (match) {
                const minuend = Number(match[1]), difference = Number(match[2]);
                meta = { ...meta, kind: 'unknown_subtrahend', minuend, difference,
                    operands: [minuend, 'x', difference], operators: ['−', '='] };
            }
        }
    } else if (sub === '7.3') {
        match = raw.match(/\bx\s*(?:x|×|\*)\s*(\d+)\s*=\s*(\d+)/i);
        if (match) {
            const factor = Number(match[1]), product = Number(match[2]);
            meta = { ...meta, kind: 'unknown_factor', factor, product,
                operands: ['x', factor, product], operators: ['×', '='] };
        } else {
            match = raw.match(/\bx\s*[:÷]\s*(\d+)\s*=\s*(\d+)/i);
            if (match) {
                const divisor = Number(match[1]), quotient = Number(match[2]);
                meta = { ...meta, kind: 'unknown_dividend', divisor, quotient,
                    operands: ['x', divisor, quotient], operators: ['÷', '='] };
            }
        }
    } else if (sub === '7.4') {
        match = raw.match(/\bx\s*\+\s*(\d+)\s*\+\s*(\d+)\s*=\s*(\d+)/i);
        if (match) {
            const a = Number(match[1]), b = Number(match[2]), total = Number(match[3]);
            meta = { ...meta, kind: 'unknown_two_step_add', a, b, total,
                operands: ['x', a, b, total], operators: ['+', '+', '='] };
        }
    }

    if (!match || !meta.kind) return null;
    const idx = match.index ?? raw.indexOf(match[0]);
    let prompt = idx >= 0 ? raw.slice(0, idx) : raw;
    prompt = prompt.replace(/[\s:]+$/g, '').trim();
    if (!prompt) prompt = 'Bé hãy tìm giá trị của x nhé!';
    meta.prompt = prompt;
    return meta;
}

function buildUnknownSolutionHtml_(meta) {
    if (!meta) return '';
    const xRed = '<span class="text-rose-600">x</span>';
    const line = (html, strong=false) => `<div class="${strong ? 'text-xl md:text-2xl text-rose-700' : 'text-lg md:text-xl text-slate-700'} font-black leading-snug">${html}</div>`;
    const hint = (html) => `<div class="inline-flex items-center gap-2 rounded-xl border-2 border-amber-200 bg-amber-50 px-3 py-1.5 text-sm md:text-base font-black text-amber-800">💡 ${html}</div>`;
    const lines = [];
    let hintHtml = '';
    let ruleText = '';
    let checkText = '';

    if (meta.kind === 'unknown_addend') {
        ruleText = 'Muốn tìm số hạng chưa biết, lấy tổng trừ số hạng đã biết.';
        checkText = `Kiểm tra: ${meta.answer} + ${meta.known} = ${meta.total} ✓`;
        lines.push(line(`${xRed} = ${meta.total} − ${meta.known}`));
        const split = buildUnknownBridgeSplit_(meta.total, meta.known, meta.answer);
        if (split) {
            hintHtml = hint(`Tách ${meta.known} = ${split.first} + ${split.second}`);
            lines.push(line(`${xRed} = ${meta.total} − ${split.first} − ${split.second}`));
            lines.push(line(`${xRed} = ${meta.total - split.first} − ${split.second}`));
        }
        lines.push(line(`${xRed} = <span class="text-rose-600">${meta.answer}</span>`, true));
    } else if (meta.kind === 'unknown_minuend') {
        ruleText = 'Muốn tìm số bị trừ chưa biết, lấy hiệu cộng số trừ.';
        checkText = `Kiểm tra: ${meta.answer} − ${meta.subtrahend} = ${meta.difference} ✓`;
        lines.push(line(`${xRed} = ${meta.difference} + ${meta.subtrahend}`));
        lines.push(line(`${xRed} = <span class="text-rose-600">${meta.answer}</span>`, true));
    } else if (meta.kind === 'unknown_subtrahend') {
        ruleText = 'Muốn tìm số trừ chưa biết, lấy số bị trừ trừ đi hiệu.';
        checkText = `Kiểm tra: ${meta.minuend} − ${meta.answer} = ${meta.difference} ✓`;
        lines.push(line(`${xRed} = ${meta.minuend} − ${meta.difference}`));
        const split = buildUnknownBridgeSplit_(meta.minuend, meta.difference, meta.answer);
        if (split) {
            hintHtml = hint(`Tách ${meta.difference} = ${split.first} + ${split.second}`);
            lines.push(line(`${xRed} = ${meta.minuend} − ${split.first} − ${split.second}`));
            lines.push(line(`${xRed} = ${meta.minuend - split.first} − ${split.second}`));
        }
        lines.push(line(`${xRed} = <span class="text-rose-600">${meta.answer}</span>`, true));
    } else if (meta.kind === 'unknown_factor') {
        ruleText = 'Muốn tìm thừa số chưa biết, lấy tích chia cho thừa số đã biết.';
        checkText = `Kiểm tra: ${meta.answer} × ${meta.factor} = ${meta.product} ✓`;
        lines.push(line(`${xRed} = ${meta.product} ÷ ${meta.factor}`));
        lines.push(line(`${xRed} = <span class="text-rose-600">${meta.answer}</span>`, true));
    } else if (meta.kind === 'unknown_dividend') {
        ruleText = 'Muốn tìm số bị chia chưa biết, lấy thương nhân với số chia.';
        checkText = `Kiểm tra: ${meta.answer} ÷ ${meta.divisor} = ${meta.quotient} ✓`;
        lines.push(line(`${xRed} = ${meta.quotient} × ${meta.divisor}`));
        lines.push(line(`${xRed} = <span class="text-rose-600">${meta.answer}</span>`, true));
    } else if (meta.kind === 'unknown_two_step_add') {
        const known = meta.a + meta.b;
        ruleText = 'Gộp các số hạng đã biết trước, rồi tìm số hạng chưa biết.';
        checkText = `Kiểm tra: ${meta.answer} + ${meta.a} + ${meta.b} = ${meta.total} ✓`;
        hintHtml = hint(`Gộp trước: ${meta.a} + ${meta.b} = ${known}`);
        lines.push(line(`${xRed} + ${known} = ${meta.total}`));
        lines.push(line(`${xRed} = ${meta.total} − ${known}`));
        const split = buildUnknownBridgeSplit_(meta.total, known, meta.answer);
        if (split) {
            lines.push(line(`${xRed} = ${meta.total} − ${split.first} − ${split.second}`));
        }
        lines.push(line(`${xRed} = <span class="text-rose-600">${meta.answer}</span>`, true));
    }

    return `<div data-unknown-solution class="hidden w-full h-full rounded-2xl border-2 border-emerald-200 bg-gradient-to-br from-emerald-50/90 to-cyan-50/80 p-3 md:p-4 shadow-sm">
        <div class="flex flex-wrap items-center justify-between gap-2 mb-2">
            <div class="text-lg md:text-xl font-black text-emerald-700">🌱 Cùng xem lời giải</div>
            ${hintHtml}
        </div>
        ${ruleText ? `<div class="mb-3 rounded-xl border-2 border-violet-200 bg-white/90 px-3 py-2 text-base md:text-lg font-black text-violet-800 text-left leading-snug"><span class="text-violet-500">Quy tắc:</span> ${ruleText}</div>` : ''}
        <div class="rounded-xl bg-white/80 border border-emerald-100 px-3 py-2.5 md:px-4 md:py-3 space-y-1 text-center">${lines.join('')}</div>
        ${checkText ? `<div class="mt-3 rounded-xl border-2 border-sky-200 bg-sky-50 px-3 py-2 text-sm md:text-base font-black text-sky-800 text-center leading-snug">✅ ${checkText}</div>` : ''}
    </div>`;
}

function buildUnknownNumberPresentation_(q) {
    const meta = getUnknownNumberMeta_(q);
    if (!meta) return null;
    const esc = (v) => escapeHtml(String(v));
    const numberBox = (value) => {
        const unknown = String(value).toLowerCase() === 'x';
        return `<div ${unknown ? 'data-unknown-slot' : ''} class="relative min-w-[62px] h-[56px] md:min-w-[74px] md:h-[64px] px-2.5 rounded-xl border-3 ${unknown ? 'border-rose-300 bg-rose-50 text-rose-600' : 'border-violet-200 bg-white text-violet-800'} flex items-center justify-center text-2xl md:text-3xl font-black shadow-sm">${unknown ? '<span class="text-rose-600">x</span>' : esc(value)}</div>`;
    };
    const op = (value) => `<span class="px-0.5 md:px-1 text-2xl md:text-3xl font-black text-slate-500">${esc(value)}</span>`;
    const pieces = [];
    meta.operands.forEach((value, i) => {
        pieces.push(numberBox(value));
        if (i < meta.operators.length) pieces.push(op(meta.operators[i]));
    });
    const visual = `<div class="w-full rounded-2xl border-2 border-violet-150 bg-gradient-to-br from-white via-violet-50/65 to-pink-50/55 px-3 py-3 md:px-4 md:py-4 shadow-sm">
        <div class="flex flex-wrap items-center justify-center gap-1.5 md:gap-2">${pieces.join('')}</div>
    </div>`;
    return {
        layout: 'unknown_number',
        prompt: meta.prompt,
        visual,
        solutionHtml: buildUnknownSolutionHtml_(meta),
        inlineSpeaker: true,
        isUnknownNumber: true
    };
}

function revealUnknownNumberFeedback_(q, fillAnswer = true) {
    if (!isUnknownNumberQuestion_(q)) return;
    if (fillAnswer) {
        const answer = escapeHtml(String(q?.answer ?? ''));
        document.querySelectorAll('[data-unknown-slot]').forEach((slot) => {
            slot.classList.remove('border-rose-300', 'bg-rose-50');
            slot.classList.add('border-rose-400', 'bg-white', 'ring-4', 'ring-rose-100');
            slot.innerHTML = `<span class="absolute top-0.5 left-2 text-[10px] md:text-xs font-black uppercase tracking-wide text-rose-500">x</span><span class="text-rose-600">${answer}</span>`;
        });
    }
    // Mục 7 là phần kiến thức khó: sau MỌI lần bé chọn đáp án đều mở lời giải
    // để bé hiểu quy tắc và cách biến đổi, không chỉ biết đúng/sai.
    document.querySelectorAll('[data-unknown-solution-placeholder]').forEach((panel) => panel.classList.add('hidden'));
    document.querySelectorAll('[data-unknown-solution]').forEach((panel) => panel.classList.remove('hidden'));
}

function getExploreMathPresentation(q) {
    const sub = String(q?.sub_topic || '');
    if (activeExamContext || activeRoadmapContext) return null;
    const unknownNumberPresentation = buildUnknownNumberPresentation_(q);
    if (unknownNumberPresentation) return unknownNumberPresentation;
    // Mục 5 Hình học trên UI vẫn dùng sub_code 4.x trong kho dữ liệu, nên phải cho 4.x đi qua renderer.
    if (!/^[123456]\./.test(sub)) return null;
    const raw = String(q.question_text || '').replace(/×/g,'x').replace(/−/g,'-');
    const nums = (raw.match(/\d+/g)||[]).map(Number);
    const math = raw.match(/(\d+)\s*([+\-x:])\s*(\d+)\s*=\s*\?/i);
    const card = x => `<div class="w-full max-w-2xl rounded-3xl border-2 border-pink-200 bg-gradient-to-br from-white via-pink-50/70 to-purple-50/70 shadow-sm px-4 py-4 md:px-6 md:py-5 text-center">${x}</div>`;
    const digitWords = ['không','một','hai','ba','bốn','năm','sáu','bảy','tám','chín'];
    const seedText = `${q?.question_id ?? q?.id ?? ''}|${q?.question_text ?? ''}|${sub}`;
    let seed = 0;
    for (let i = 0; i < seedText.length; i++) seed = ((seed << 5) - seed + seedText.charCodeAt(i)) | 0;
    const seededShuffle = arr => {
        const out = arr.slice();
        let x = Math.abs(seed) + 1;
        for (let i = out.length - 1; i > 0; i--) {
            x = (x * 1664525 + 1013904223) >>> 0;
            const j = x % (i + 1);
            [out[i], out[j]] = [out[j], out[i]];
        }
        return out;
    };
    const placePhrase = (count, place, tone) =>
        `<span class="inline-flex items-center justify-center rounded-2xl border-2 border-${tone}-200 bg-${tone}-50/85 px-3.5 py-2.5 md:px-4 md:py-3 text-lg md:text-xl font-black text-${tone}-700 whitespace-nowrap shadow-sm">${digitWords[count] || String(count)} ${place}</span>`;
    const vd = q.visual_data || {};
    let prompt = raw, promptHtml = '', visual = '';

    // ===== MỤC 1 - CẤU TẠO SỐ =====
    // Không phụ thuộc explore_group: các bản JSON mới/cũ có thể không chứa trường này.
    // Nhận diện trực tiếp bằng sub_id/sub_topic và explore_type để renderer luôn hoạt động.
    const isNumberStructureQuestion = ['1.1','1.3','1.5'].includes(String(q.sub_id || q.sub_topic || '').trim()) && !!q.explore_type;
    if (isNumberStructureQuestion) {
        switch (q.explore_type) {
            case 'compose_words': {
                prompt = 'Bé hãy chọn đáp án đúng bên dưới nhé!';
                let parts = Array.isArray(vd.parts) ? vd.parts.map((p) => {
                    const tone = p.place === 'trăm' ? 'amber' : (p.place === 'chục' ? 'pink' : 'purple');
                    return { html: placePhrase(Number(p.count), p.place, tone), place: p.place };
                }) : [];
                if (vd.shuffle) parts = seededShuffle(parts);
                // Hai chữ số và ba chữ số dùng cùng một bố cục. Nút loa nằm ngay trong
                // thẻ Ghép số để không tạo thêm một hàng trống phía trên.
                visual = `<div class="relative w-full max-w-2xl rounded-3xl border-2 border-pink-200 bg-gradient-to-br from-white via-pink-50/70 to-purple-50/70 shadow-sm px-4 py-4 md:px-6 md:py-5 text-center">
                    <button onclick="speakCurrentQuestion()" class="absolute top-3 right-3 w-9 h-9 md:w-10 md:h-10 bg-pink-50 hover:bg-pink-100 text-pink-700 border border-pink-200 rounded-xl flex items-center justify-center pastel-btn shadow-xs" title="Nghe phép ghép số" aria-label="Nghe phép ghép số">
                        <i class="fa-solid fa-volume-high text-pink-600 text-sm md:text-base"></i>
                    </button>
                    <div class="flex flex-wrap md:flex-nowrap items-center justify-center gap-2 md:gap-2.5 pr-10 md:pr-11">${parts.map((part,i)=>`${i?'<span class="text-xl md:text-2xl font-black text-fuchsia-400 shrink-0">+</span>':''}${part.html}`).join('')}<span class="text-xl md:text-2xl font-black text-slate-500 ml-1 shrink-0">=</span><span class="inline-flex min-w-[58px] items-center justify-center rounded-2xl border-2 border-dashed border-fuchsia-300 bg-white px-3 py-2.5 text-xl md:text-2xl font-black text-fuchsia-500 shrink-0">?</span></div>
                </div>`;
                break;
            }
            case 'expanded_form_missing': {
                prompt = raw;
                visual = card(`<div class="text-4xl md:text-5xl font-black text-slate-800"><span class="text-purple-700">${vd.number}</span> = ${vd.left} + <span class="inline-flex min-w-[70px] justify-center border-b-4 border-pink-400 text-pink-500">?</span></div>`);
                break;
            }
            case 'place_value_focus': {
                prompt = raw;
                const n = String(vd.number || '').padStart(3,'0').split('');
                const places = ['trăm','chục','đơn vị'];
                visual = card(`<div class="grid grid-cols-3 gap-2 max-w-md mx-auto">${places.map((pl,i)=>`<div class="rounded-2xl border-2 ${pl===vd.focus_place?'border-pink-400 bg-pink-100':'border-purple-200 bg-white'} p-3"><div class="text-xs md:text-sm font-black uppercase text-slate-500">${pl}</div><div class="text-4xl md:text-5xl font-black ${pl===vd.focus_place?'text-pink-600':'text-purple-700'}">${n[i]}</div></div>`).join('')}</div>`);
                break;
            }
            case 'estimate_groups':
            case 'estimate_reasoning': {
                prompt = raw;
                const emoji = vd.emoji || '🍎';
                const g = Math.min(Number(vd.groups)||1, 8), per = Math.min(Number(vd.per_group)||5, 10);
                visual = card(`<div class="text-lg md:text-xl font-black text-purple-600 mb-3">${g} nhóm · khoảng ${per} đồ vật mỗi nhóm</div><div class="flex flex-wrap justify-center gap-2.5">${Array.from({length:g},()=>`<div class="min-w-[72px] min-h-[64px] px-2 py-2 rounded-2xl bg-amber-50 border-2 border-amber-200 flex flex-wrap content-center justify-center gap-0.5 text-xl">${Array.from({length:per},()=>`<span>${emoji}</span>`).join('')}</div>`).join('')}</div>`);
                break;
            }
            case 'find_number': {
                prompt = 'Bé hãy tìm số phù hợp với câu đố nhé!';
                const clue = vd.clue || raw.replace(/^🔎\s*/, '');
                // Nút loa nằm ngay trong thẻ câu đố để tiết kiệm chiều cao và tạo bố cục gọn hơn.
                visual = `<div class="relative w-full max-w-2xl rounded-3xl border-2 border-pink-200 bg-gradient-to-br from-white via-pink-50/70 to-purple-50/70 shadow-sm px-4 py-4 md:px-6 md:py-5 text-center">
                    <button onclick="speakCurrentQuestion()" class="absolute top-3 right-3 w-9 h-9 md:w-10 md:h-10 bg-pink-50 hover:bg-pink-100 text-pink-700 border border-pink-200 rounded-xl flex items-center justify-center pastel-btn shadow-xs" title="Nghe nội dung câu đố" aria-label="Nghe nội dung câu đố">
                        <i class="fa-solid fa-volume-high text-pink-600 text-sm md:text-base"></i>
                    </button>
                    <div class="inline-flex items-center gap-2 rounded-full bg-amber-100 border-2 border-amber-200 px-3 py-1 text-xs md:text-sm font-black text-amber-700">🔎 THÁM TỬ SỐ</div>
                    <div class="mt-3 px-7 md:px-10 text-lg md:text-xl lg:text-2xl font-black leading-snug text-slate-800">${escapeHtml(clue)}</div>
                    <div class="mt-2 text-xs md:text-sm font-bold text-purple-500">Đọc thật kỹ từng điều kiện rồi chọn số đúng nhé!</div>
                </div>`;
                break;
            }
            case 'quantity_estimate': {
                prompt = raw;
                const total = Number(vd.total || 0);
                const emoji = vd.emoji || '🍎';
                const label = vd.label || 'đồ vật';
                const fullRows = Math.floor(total / 10);
                const remain = total % 10;
                const rows = [];
                for (let r = 0; r < fullRows; r++) rows.push(10);
                if (remain) rows.push(remain);
                // Chỉ dựng phần minh hoạ bên trái. loadQuestion() sẽ ghép minh hoạ,
                // câu hỏi và đáp án vào cùng một khung hai cột trên desktop.
                visual = `<div class="w-full"><div class="text-base md:text-lg font-black text-purple-700 mb-3 text-center">Nhìn nhanh rồi ước lượng nhé!</div><div class="mx-auto space-y-1.5 md:space-y-2">${rows.map((count,ri)=>`<div class="flex justify-center gap-1.5 flex-wrap" aria-label="hàng ${ri+1}">${Array.from({length:count},()=>`<span class="text-xl md:text-2xl">${emoji}</span>`).join('')}</div>`).join('')}</div><div class="mt-3 text-xs md:text-sm font-bold leading-snug text-slate-500 text-center">Nhìn theo từng nhóm chục, chưa cần đếm từng ${label}.</div></div>`;
                return { prompt, visual, layout: 'estimate_split' };
            }
            case 'round_estimate': {
                prompt = raw;
                const n = Number(vd.number || 0);
                const unit = vd.unit || 'chục';
                const step = Number(vd.step || (unit === 'trăm' ? 100 : 10));
                const low = Math.floor(n / step) * step;
                const high = low + step;
                visual = card(`<div class="text-sm md:text-base font-black text-slate-500 mb-2">Số cần ước lượng</div><div class="text-6xl md:text-7xl font-black text-purple-700">${n}</div><div class="mt-4 flex items-center justify-center gap-3"><span class="px-4 py-2 rounded-2xl bg-pink-50 border-2 border-pink-200 text-xl font-black text-pink-700">${low}</span><span class="text-xl font-black text-slate-400">← gần số tròn ${unit} nào? →</span><span class="px-4 py-2 rounded-2xl bg-emerald-50 border-2 border-emerald-200 text-xl font-black text-emerald-700">${high}</span></div>`);
                break;
            }
            case 'reverse_decompose': {
                prompt = raw;
                visual = card(`<div class="text-6xl md:text-7xl font-black text-purple-700">${vd.number}</div><div class="mt-2 text-sm md:text-base font-black text-pink-500">Con hãy tách số theo đúng giá trị hàng</div>`);
                break;
            }
            case 'constraint_number': {
                prompt = raw;
                const chips=[];
                if (vd.hundreds !== undefined) chips.push(placePhrase(Number(vd.hundreds),'trăm','amber'));
                if (vd.tens !== undefined) chips.push(placePhrase(Number(vd.tens),'chục','pink'));
                if (vd.ones !== undefined) chips.push(placePhrase(Number(vd.ones),'đơn vị','purple'));
                visual = chips.length ? card(`<div class="flex flex-wrap items-center justify-center gap-3">${seededShuffle(chips).join('')}</div>`) : '';
                break;
            }
        }
        return {prompt, promptHtml, visual};
    }

    const isTopic2Explore = Number(q.explore_topic_id) === 2 || String(q.sub_id || q.sub_topic || '').trim() === '1.2';
    if (isTopic2Explore && q.explore_type) {
        switch (q.explore_type) {
            case 'number_line_neighbor': {
                const min = Number(vd.min ?? 0), max = Number(vd.max ?? min+6), focus=Number(vd.focus);
                const direction = String(vd.direction || 'before') === 'after' ? 'after' : 'before';
                const relation = direction === 'before' ? 'trước' : 'sau';
                const answer = direction === 'before' ? focus - 1 : focus + 1;
                const sign = direction === 'before' ? '−' : '+';
                prompt = `Bé ơi, hãy tìm số liền ${relation} của ${focus} nhé!`;
                promptHtml = `Bé ơi, hãy tìm số liền <span class="text-rose-600 font-black">${relation}</span> của ${focus} nhé!`;
                const vals=[]; for(let n=min;n<=max;n++) vals.push(n);
                visual = card(`<div class="flex items-center justify-center overflow-hidden">${vals.map((x,i)=>`<span class="w-11 h-11 rounded-full flex items-center justify-center font-black text-base md:text-lg ${x===focus?'bg-pink-500 text-white ring-4 ring-pink-100':'bg-white border-2 border-purple-200 text-purple-700'}">${x}</span>${i<vals.length-1?'<i class="w-5 md:w-8 h-[3px] bg-purple-200"></i>':''}`).join('')}</div><div data-neighbor-rule-feedback class="hidden mt-3 rounded-2xl border-2 border-emerald-200 bg-emerald-50 px-4 py-2 text-xl md:text-2xl font-black text-emerald-700">${answer} = ${focus} ${sign} 1</div>`);
                break;
            }
            case 'compare_pair': {
                prompt = raw;
                visual = card(`<div class="flex items-center justify-center gap-4 md:gap-8"><span class="px-6 py-4 rounded-3xl bg-pink-50 border-2 border-pink-200 text-5xl font-black text-pink-700">${vd.left}</span><span class="text-5xl font-black text-purple-400">?</span><span class="px-6 py-4 rounded-3xl bg-purple-50 border-2 border-purple-200 text-5xl font-black text-purple-700">${vd.right}</span></div><div class="mt-3 text-sm md:text-base font-black text-slate-500">Nhớ nhé: trên tia số, số ở bên phải lớn hơn.</div>`);
                break;
            }
            case 'between_number': {
                prompt = raw;
                visual = card(`<div class="flex items-center justify-center gap-2"><span class="w-14 h-14 rounded-full bg-white border-2 border-purple-200 flex items-center justify-center text-2xl font-black">${vd.left}</span><span class="w-10 h-[3px] bg-purple-200"></span><span class="w-14 h-14 rounded-full bg-pink-50 border-2 border-dashed border-pink-400 flex items-center justify-center text-3xl font-black text-pink-500">?</span><span class="w-10 h-[3px] bg-purple-200"></span><span class="w-14 h-14 rounded-full bg-white border-2 border-purple-200 flex items-center justify-center text-2xl font-black">${vd.right}</span></div>`);
                break;
            }
            case 'sequence_missing': {
                prompt = raw;
                const seq = Array.isArray(vd.sequence) ? vd.sequence : [];
                const isEmojiPattern = String(vd.kind || '') === 'emoji';
                if (isEmojiPattern) {
                    visual = card(`<div class="flex flex-wrap items-center justify-center gap-2 md:gap-3">${seq.map((x)=>`<span class="w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center ${x===null?'bg-pink-50 border-2 border-dashed border-pink-400 text-pink-500 text-2xl':'bg-white border-2 border-purple-200 text-3xl md:text-4xl'}">${x===null?'?':x}</span>`).join('')}</div><div class="mt-3 text-xs md:text-sm font-bold text-slate-500">Nhìn mẫu lặp lại rồi chọn emoji còn thiếu nhé!</div>`);
                } else {
                    const dir = String(vd.direction || 'asc') === 'desc' ? 'giảm' : 'tăng';
                    visual = card(`<div class="flex flex-wrap items-center justify-center gap-2 md:gap-3">${seq.map((x,i)=>`<span class="min-w-[58px] h-14 px-3 rounded-2xl flex items-center justify-center font-black text-xl md:text-2xl ${x===null?'bg-pink-50 border-2 border-dashed border-pink-400 text-pink-500':'bg-white border-2 border-purple-200 text-purple-700'}">${x===null?'?':x}</span>${i<seq.length-1?'<span class="text-xl font-black text-purple-300">→</span>':''}`).join('')}</div><div class="mt-3 text-xs md:text-sm font-bold text-slate-500">Dãy số ${dir} theo một quy luật đều. Con hãy tìm số còn thiếu nhé!</div>`);
                }
                break;
            }
            case 'number_line_missing': {
                prompt = raw;
                const seq=Array.isArray(vd.sequence)?vd.sequence:[];
                visual = card(`<div class="flex items-center justify-center overflow-hidden">${seq.map((x,i)=>`<span class="w-12 h-12 rounded-full flex items-center justify-center font-black text-lg ${x===null?'bg-pink-50 border-2 border-dashed border-pink-400 text-pink-500':'bg-white border-2 border-purple-200 text-purple-700'}">${x===null?'?':x}</span>${i<seq.length-1?'<i class="w-6 md:w-9 h-[3px] bg-purple-200"></i>':''}`).join('')}</div>`);
                break;
            }
            case 'order_numbers': {
                prompt = raw;
                const vals=Array.isArray(vd.numbers)?vd.numbers:[];
                visual = card(`<div class="flex flex-wrap justify-center gap-3">${seededShuffle(vals).map(n=>`<span class="px-5 py-3 rounded-2xl bg-white border-2 border-purple-200 text-3xl font-black text-purple-700">${n}</span>`).join('')}</div><div class="mt-3 text-sm md:text-base font-black text-slate-500">Con hãy so sánh từ hàng lớn nhất trước nhé!</div>`);
                break;
            }
            case 'range_reasoning': {
                prompt = raw;
                const vals=[]; for(let n=Number(vd.low);n<=Number(vd.high);n++) vals.push(n);
                visual = card(`<div class="flex items-center justify-center overflow-hidden">${vals.map((n,i)=>`<span class="w-11 h-11 rounded-full flex items-center justify-center font-black ${i===0||i===vals.length-1?'bg-slate-100 text-slate-500':'bg-white border-2 border-purple-200 text-purple-700'}">${n}</span>${i<vals.length-1?'<i class="w-4 md:w-7 h-[3px] bg-purple-200"></i>':''}`).join('')}</div>`);
                break;
            }
            case 'place_value_compare': {
                prompt = raw;
                const vals=Array.isArray(vd.numbers)?vd.numbers:[];
                visual = card(`<div class="flex flex-wrap justify-center gap-3">${vals.map(n=>`<span class="px-5 py-3 rounded-2xl bg-white border-2 border-purple-200 text-3xl font-black text-purple-700">${n}</span>`).join('')}</div><div class="mt-3 text-sm md:text-base font-black text-pink-500">Mẹo: so sánh hàng trăm → hàng chục → hàng đơn vị.</div>`);
                break;
            }
        }
        return {prompt, promptHtml, visual};
    }

    const geometryPresentation = buildGeometryPresentation_(q);
    if (geometryPresentation) return geometryPresentation;

    const measureTimePresentation = buildMeasureTimePresentation_(q);
    if (measureTimePresentation) return measureTimePresentation;

    const patternLogicPresentation = buildPatternLogicPresentation_(q);
    if (patternLogicPresentation) return patternLogicPresentation;

    // ===== MỤC 3 - CỘNG TRỪ: hai cấp độ dùng cùng một kho câu hỏi =====
    // Cấp 1 có bảng/gợi ý và chỉ hiện đầy đủ cách làm sau khi bé trả lời đúng.
    // Cấp 2 dùng chính các câu đó nhưng ẩn toàn bộ giàn giáo sư phạm.
    const carryLearningPresentation = buildCarryLearningPresentation_(q);
    if (carryLearningPresentation) return carryLearningPresentation;

    const mulDivTablePresentation = buildMulDivTableVisual_(q, math);
    if (mulDivTablePresentation) return mulDivTablePresentation;

    else if(/^2\.[1]$/.test(sub)&&math){prompt='Bé ơi, hãy tính nhẩm nhé!';visual=card(`<div class="text-5xl md:text-6xl font-black">${math[1]} <span class="text-pink-500">${math[2]}</span> ${math[3]} <span class="text-purple-400">= ?</span></div>`)}
    else if(/^2\.[45]$/.test(sub)&&(math||nums.length>=2)){const a=math?math[1]:nums[0],op=math?math[2]:(/trừ/i.test(raw)?'-':'+'),b=math?math[3]:nums[1];prompt='Bé ơi, hãy đặt tính rồi tính nhé!';visual=card(`<div class="inline-grid grid-cols-[32px_auto] text-right text-5xl font-black leading-tight"><span></span><span>${a}</span><span class="text-pink-500">${op}</span><span>${b}</span><span class="col-span-2 border-t-4 border-slate-700 mt-1 pt-2 text-purple-400">?</span></div>`)}
    else if(sub==='2.6'&&nums.length>=3){
        const meta = getOperationTermsMeta_(q);
        if (meta) {
            const termClass = value => value === meta.target ? 'text-rose-600' : 'text-slate-700';
            prompt = `Bé ơi, số ${meta.target} trong phép tính trên gọi là gì?`;
            promptHtml = `Bé ơi, số <span class="inline-flex items-center rounded-lg border border-rose-200 bg-rose-50 px-1.5 py-0.5 text-rose-600">${escapeHtml(meta.target)}</span> trong phép tính trên gọi là gì?`;
            visual = card(`
                <div class="inline-grid grid-cols-[minmax(78px,auto)_32px_minmax(78px,auto)_32px_minmax(78px,auto)] items-start justify-center gap-x-1 md:gap-x-2">
                    <div class="flex flex-col items-center">
                        <span class="text-4xl md:text-[42px] leading-none font-black ${termClass(meta.left)}">${escapeHtml(meta.left)}</span>
                        <span data-operation-term-label class="hidden mt-2 rounded-full border border-pink-200 bg-pink-50 px-3 py-1.5 text-lg md:text-xl font-black text-pink-700 whitespace-nowrap leading-none">${escapeHtml(meta.labels[0])}</span>
                    </div>
                    <span class="text-4xl md:text-[42px] leading-none font-black text-pink-500">${meta.op}</span>
                    <div class="flex flex-col items-center">
                        <span class="text-4xl md:text-[42px] leading-none font-black ${termClass(meta.right)}">${escapeHtml(meta.right)}</span>
                        <span data-operation-term-label class="hidden mt-2 rounded-full border border-purple-200 bg-purple-50 px-3 py-1.5 text-lg md:text-xl font-black text-purple-700 whitespace-nowrap leading-none">${escapeHtml(meta.labels[1])}</span>
                    </div>
                    <span class="text-4xl md:text-[42px] leading-none font-black text-purple-400">=</span>
                    <div class="flex flex-col items-center">
                        <span class="text-4xl md:text-[42px] leading-none font-black ${termClass(meta.result)}">${escapeHtml(meta.result)}</span>
                        <span data-operation-term-label class="hidden mt-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-lg md:text-xl font-black text-emerald-700 whitespace-nowrap leading-none">${escapeHtml(meta.labels[2])}</span>
                    </div>
                </div>
                <div data-operation-terms-summary class="hidden mt-3 text-base md:text-lg font-extrabold text-slate-500 leading-snug">
                    ${meta.op === '+'
                        ? `${escapeHtml(meta.left)} và ${escapeHtml(meta.right)} là <span class="text-pink-600">số hạng</span>; ${escapeHtml(meta.result)} là <span class="text-emerald-600">tổng</span>.`
                        : `${escapeHtml(meta.left)} là <span class="text-pink-600">số bị trừ</span>; ${escapeHtml(meta.right)} là <span class="text-purple-600">số trừ</span>; ${escapeHtml(meta.result)} là <span class="text-emerald-600">hiệu</span>.`}
                </div>`);
        }
    }
    else if(sub==='3.1'){const m=raw.match(/((?:\d+\s*\+\s*)+\d+)/);const ts=m?m[1].match(/\d+/g):[];prompt='Bé ơi, hãy viết tổng trên thành phép nhân nhé!';if(ts.length)visual=card(`<div class="text-4xl md:text-5xl font-black">${ts.join(' + ')}</div><div class="mt-3 text-2xl font-black text-purple-500">= ? × ?</div>`)}
    else if(/^3\.[23]$/.test(sub)&&math){prompt='Bé ơi, hãy tính nhẩm nhé!';visual=card(`<div class="text-5xl md:text-6xl font-black">${math[1]} <span class="text-pink-500">${math[2]==='x'?'×':'÷'}</span> ${math[3]} <span class="text-purple-400">= ?</span></div>`)}
    return {prompt,promptHtml,visual};
}

function getComposeSpeechText(q) {
    if (!q || q.explore_type !== 'compose_words') return '';
    const vd = q.visual_data || {};
    const digitWords = ['không','một','hai','ba','bốn','năm','sáu','bảy','tám','chín'];
    let parts = Array.isArray(vd.parts) ? vd.parts.map(p => ({ count: Number(p.count), place: String(p.place || '') })) : [];
    if (!parts.length) return '';
    if (vd.shuffle) {
        const sub = String(q?.sub_topic || q?.sub_id || '');
        const seedText = `${q?.question_id ?? q?.id ?? ''}|${q?.question_text ?? ''}|${sub}`;
        let seed = 0;
        for (let i = 0; i < seedText.length; i++) seed = ((seed << 5) - seed + seedText.charCodeAt(i)) | 0;
        let x = Math.abs(seed) + 1;
        const out = parts.slice();
        for (let i = out.length - 1; i > 0; i--) {
            x = (x * 1664525 + 1013904223) >>> 0;
            const j = x % (i + 1);
            [out[i], out[j]] = [out[j], out[i]];
        }
        parts = out;
    }
    return parts.map(p => `${digitWords[p.count] || p.count} ${p.place}`).join(' cộng ');
}


function isTopic2Practice_() {
    return !activeExamContext && !activeRoadmapContext && Number(pendingTopicQuiz?.topicNum) === 2;
}

function isTopic2OrderInteractive_(q) {
    return isTopic2Practice_()
        && pendingTopicQuiz?.selectedCompareBranch === 'order'
        && q?.explore_type === 'order_numbers_interactive';
}

function getOrderInteractiveState_(q) {
    const key = currentQIndex;
    const nums = Array.isArray(q?.visual_data?.numbers)
        ? q.visual_data.numbers.map(Number).filter(Number.isFinite)
        : [];
    const qid = String(q?.question_id ?? q?.id ?? key);
    let state = orderInteractionState[key];
    if (!state || state.questionId !== qid) {
        state = {
            questionId: qid,
            selected: [],
            remaining: shuffleArray(nums),
            locked: false,
            feedback: ''
        };
        orderInteractionState[key] = state;
    }
    return state;
}

function getOrderDirection_(q) {
    return String(q?.visual_data?.direction || 'asc').toLowerCase() === 'desc' ? 'desc' : 'asc';
}

function renderOrderInteractiveQuestion_(q) {
    const dir = getOrderDirection_(q);
    const dirLabel = dir === 'desc' ? 'từ lớn đến bé' : 'từ bé đến lớn';
    return `
        <div class="w-full max-w-4xl rounded-3xl border-2 border-pink-200 bg-gradient-to-br from-white via-pink-50/65 to-purple-50/65 shadow-sm px-4 py-4 md:px-6 md:py-5">
            <div class="flex items-start justify-between gap-3 mb-2">
                <div class="text-left">
                    <div class="inline-flex items-center gap-2 rounded-full bg-amber-50 border border-amber-200 px-3 py-1 text-xs md:text-sm font-black text-amber-700">🧩 SẮP XẾP DÃY SỐ</div>
                    <h3 class="mt-2 text-lg md:text-xl font-black text-purple-800 leading-snug">Bé hãy chọn lần lượt để xếp ${dirLabel} nhé!</h3>
                </div>
                <button onclick="speakCurrentQuestion()" class="shrink-0 w-9 h-9 md:w-10 md:h-10 bg-pink-50 hover:bg-pink-100 text-pink-700 border border-pink-200 rounded-xl flex items-center justify-center pastel-btn shadow-xs" title="Nghe câu hỏi" aria-label="Nghe câu hỏi">
                    <i class="fa-solid fa-volume-high text-pink-600 text-sm md:text-base"></i>
                </button>
            </div>

            <div class="mt-3 rounded-2xl border-2 border-purple-100 bg-white/75 p-3 md:p-4">
                <div class="text-xs md:text-sm font-black text-slate-500 mb-2">Dãy số bé đang xếp</div>
                <div id="order-selected-row" class="flex items-center justify-center gap-1.5 md:gap-2 min-h-[62px]"></div>
            </div>

            <div class="mt-3 text-sm md:text-base font-extrabold text-slate-500">Chạm vào từng số. Số được chọn sẽ nhảy lên trên.</div>
            <div id="order-available-row" class="grid grid-cols-5 gap-2 md:gap-3 mt-3"></div>

            <div class="mt-3 min-h-[34px] flex items-center justify-center gap-3">
                <button onclick="resetOrderInteractiveCurrent_()" class="px-3 py-1.5 rounded-xl border border-purple-200 bg-white text-purple-700 text-xs md:text-sm font-black pastel-btn">↶ Làm lại</button>
                <span id="order-feedback" class="text-sm md:text-base font-black"></span>
            </div>
        </div>`;
}

function renderOrderInteractiveState_() {
    const q = activeQuestionsList[currentQIndex];
    if (!q || !isTopic2OrderInteractive_(q)) return;
    const state = getOrderInteractiveState_(q);
    const dir = getOrderDirection_(q);
    const symbol = dir === 'desc' ? '>' : '<';
    const total = Array.isArray(q?.visual_data?.numbers) ? q.visual_data.numbers.length : 5;
    const selectedRow = document.getElementById('order-selected-row');
    const availableRow = document.getElementById('order-available-row');
    const feedback = document.getElementById('order-feedback');
    if (!selectedRow || !availableRow) return;

    const slots = [];
    for (let i = 0; i < total; i++) {
        const value = state.selected[i];
        slots.push(`<span class="w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center border-2 ${value !== undefined ? 'border-fuchsia-300 bg-fuchsia-50 text-fuchsia-700' : 'border-dashed border-purple-200 bg-white text-purple-200'} text-xl md:text-2xl font-black shadow-xs">${value !== undefined ? value : '•'}</span>`);
        if (i < total - 1) slots.push(`<span class="text-lg md:text-xl font-black text-purple-300">${symbol}</span>`);
    }
    selectedRow.innerHTML = slots.join('');

    availableRow.innerHTML = state.remaining.map(n => `
        <button onclick="handleOrderNumberPick_(${Number(n)})" ${state.locked ? 'disabled' : ''}
            class="min-h-[58px] md:min-h-[64px] rounded-2xl border-2 border-purple-200 bg-white hover:bg-purple-50 text-purple-800 text-xl md:text-2xl font-black shadow-xs pastel-btn disabled:opacity-50">
            ${Number(n)}
        </button>`).join('');

    if (feedback) {
        feedback.className = `text-sm md:text-base font-black ${state.feedback?.type === 'ok' ? 'text-emerald-600' : state.feedback?.type === 'bad' ? 'text-rose-600' : 'text-slate-500'}`;
        feedback.textContent = state.feedback?.text || '';
    }
}

function resetOrderInteractiveCurrent_() {
    const q = activeQuestionsList[currentQIndex];
    if (!q || !isTopic2OrderInteractive_(q)) return;
    const nums = Array.isArray(q?.visual_data?.numbers) ? q.visual_data.numbers.map(Number) : [];
    orderInteractionState[currentQIndex] = {
        questionId: String(q?.question_id ?? q?.id ?? currentQIndex),
        selected: [],
        remaining: shuffleArray(nums),
        locked: false,
        feedback: ''
    };
    renderOrderInteractiveState_();
}

function handleOrderNumberPick_(value) {
    const q = activeQuestionsList[currentQIndex];
    if (!q || !isTopic2OrderInteractive_(q)) return;
    const state = getOrderInteractiveState_(q);
    if (state.locked) return;
    const idx = state.remaining.indexOf(Number(value));
    if (idx < 0) return;

    state.selected.push(Number(value));
    state.remaining.splice(idx, 1);
    renderOrderInteractiveState_();

    const nums = Array.isArray(q?.visual_data?.numbers) ? q.visual_data.numbers.map(Number) : [];
    if (state.selected.length !== nums.length) return;

    const dir = getOrderDirection_(q);
    const expected = [...nums].sort((a, b) => dir === 'desc' ? b - a : a - b);
    const isCorrect = expected.every((n, i) => n === state.selected[i]);
    state.locked = true;

    if (isCorrect) {
        userAnswers[currentQIndex] = q.answer || expected.join(dir === 'desc' ? ' > ' : ' < ');
        score += (q.diem ?? 0.5);
        starGreenCount++;
        const greenEl = document.getElementById('star-green-count');
        if (greenEl) greenEl.textContent = starGreenCount;
        state.feedback = { type: 'ok', text: '🎉 Chính xác! Bé xếp dãy số rất giỏi!' };
        renderOrderInteractiveState_();
        playAudio('correct');
        confetti({ particleCount: 45, spread: 65, origin: { y: 0.68 } });
        setTimeout(() => speakVietnamese('Giỏi lắm! Dãy số đã được sắp xếp chính xác.'), 120);
        updateQuizPalletUI();
        setTimeout(() => {
            if (userAnswers[currentQIndex] !== undefined) nextQuestion();
        }, 1050);
    } else {
        starRedCount++;
        const redEl = document.getElementById('star-red-count');
        if (redEl) redEl.textContent = starRedCount;
        state.feedback = { type: 'bad', text: 'Chưa đúng rồi. Bé thử xếp lại nhé!' };
        renderOrderInteractiveState_();
        playAudio('wrong');
        setTimeout(() => resetOrderInteractiveCurrent_(), 900);
    }
}

function highlightQuestionNumbers_(text) {
    // Escape trước rồi mới bọc các số để dữ liệu JSON không thể chèn HTML.
    return escapeHtml(String(text ?? '')).replace(/\d+(?:[.,]\d+)?/g, (num) =>
        `<span class="text-rose-600 font-black">${num}</span>`
    );
}

function loadQuestion() {
    stopSpeaking();
    const q = activeQuestionsList[currentQIndex];
    if (!q) return;

    const isEvaluationMode = !!activeExamContext || !!activeRoadmapContext;
    const exploreMath = !isEvaluationMode ? getExploreMathPresentation(q) : null;
    const isNumberCompose = !isEvaluationMode && q.explore_type === 'compose_words';
    const isFindNumber = !isEvaluationMode && q.explore_type === 'find_number';
    // Mục 3 (Cộng - trừ) và Mục 4 (Nhân - chia) có đáp án ngắn,
    // nên dùng bố cục gọn: 4 đáp án trên một hàng ở desktop.
    const isCompactTopic34 = !isEvaluationMode && [3, 4].includes(Number(pendingTopicQuiz?.topicNum));
    // Mục 8-11: vẫn tô đỏ các con số trong câu hỏi, nhưng giảm cỡ chữ để cân bố cục đẹp hơn.
    const isLargeTopic8910 = !isEvaluationMode && [8, 9, 10, 11].includes(Number(pendingTopicQuiz?.topicNum));
    const topic8910QuestionHtml = isLargeTopic8910 ? highlightQuestionNumbers_(q.question_text) : escapeHtml(q.question_text);
    const isOperationTerms = !isEvaluationMode && q.explore_type === 'operation_terms';
    const isCarryConcept = !isEvaluationMode && isCarryConceptQuestion_(q);
    const isCarryLearning = !isEvaluationMode && !!exploreMath?.isCarryLearning;
    const isMulDivVisual = !isEvaluationMode && !!exploreMath?.isMulDivVisual;
    const isOrderInteractive = isTopic2OrderInteractive_(q);
    const activeExploreTopicNum = Number(pendingTopicQuiz?.topicNum);
    const isTopic911ReasoningLayout = !isEvaluationMode && [9, 10, 11].includes(activeExploreTopicNum);

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
            <p class="text-gray-800 text-base md:text-lg font-bold whitespace-pre-line leading-relaxed ${useTwoColumns ? 'md:columns-2 md:gap-6' : ''}">${escapeHtml(pText)}</p>
        </div>` : '';

    const practiceSpeakerBtnHtml = !isEvaluationMode && !isNumberCompose && !isFindNumber && !exploreMath?.inlineSpeaker ? `
        <div class="flex items-center justify-center mt-1 mb-1">
            <button onclick="speakCurrentQuestion()" class="px-4 py-1.5 bg-pink-50 hover:bg-pink-100 text-pink-700 border border-pink-200 rounded-2xl text-xs md:text-sm font-extrabold flex items-center space-x-1.5 pastel-btn shadow-xs">
                <i class="fa-solid fa-volume-high text-pink-600"></i>
                <span>Nghe câu hỏi</span>
            </button>
        </div>
    ` : '';
    // Riêng Ghép số, nút loa đã nằm bên trong thẻ biểu thức.
    const composeSpeakerBtnHtml = '';
    // Riêng Tìm số, nút loa đã được đặt bên trong thẻ câu đố.
    const findNumberSpeakerBtnHtml = '';

    const isLetterListen = q.render_style === 'letter_listen';

    if (isOrderInteractive) {
        document.getElementById('question-box').innerHTML = renderOrderInteractiveQuestion_(q);
        renderOrderInteractiveState_();
        const practiceNav = document.getElementById('nav-group-practice');
        if (practiceNav) practiceNav.style.marginTop = '';
        updateNavButtons();
        updateQuizPalletUI();
        if (autoSpeechEnabled) speakCurrentQuestion();
        return;
    }

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
    } else if (exploreMath?.layout === 'geometry_split') {
        // Mục 5 - Hình học: hình minh họa lớn bên trái, câu hỏi + đáp án bên phải.
        html = `
        ${mediaHtml}
        ${passageHtml}
        <div class="w-full max-w-6xl rounded-3xl border-2 border-amber-200 bg-gradient-to-br from-white via-amber-50/45 to-orange-50/40 shadow-sm p-3 md:p-4">
            <div class="grid grid-cols-1 md:grid-cols-[1.12fr_0.88fr] gap-3 md:gap-5 items-stretch">
                <div class="min-w-0 flex flex-col items-center justify-center">
                    ${exploreMath.visual || ''}
                    ${buildTopic56SolutionHtml_(q)}
                </div>
                <div class="min-w-0 flex flex-col justify-center rounded-3xl border-2 border-orange-100 bg-white/90 px-4 py-4 md:px-5 md:py-5">
                    <div class="flex items-start justify-between gap-3 mb-4">
                        <h3 class="text-lg md:text-xl lg:text-2xl font-black leading-snug text-slate-900 text-left">${escapeHtml(exploreMath.prompt || q.question_text)}</h3>
                        <button onclick="speakCurrentQuestion()" class="shrink-0 w-10 h-10 bg-pink-50 hover:bg-pink-100 text-pink-700 border border-pink-200 rounded-xl flex items-center justify-center pastel-btn shadow-xs" title="Nghe câu hỏi" aria-label="Nghe câu hỏi">
                            <i class="fa-solid fa-volume-high text-pink-600"></i>
                        </button>
                    </div>
                    <div class="grid grid-cols-2 gap-2.5 md:gap-3">`;
        q.options.forEach((opt, idx) => {
            const formattedOpt = capitalizeFirstLetter(opt);
            const letter = String.fromCharCode(65 + idx);
            html += `<button data-opt="${escapeHtml(opt)}" onclick="checkAnswer('${opt.replace(/'/g, "\\'")}')" class="option-btn min-h-[70px] w-full px-3 py-3 bg-white hover:bg-amber-50 border-2 border-amber-200 rounded-2xl font-black text-slate-800 text-left text-base md:text-lg transition-all flex items-center gap-2 shadow-xs pastel-btn"><strong class="text-rose-600">${letter}.</strong><span class="flex-1">${escapeHtml(formattedOpt)}</span><span class="option-icon text-pink-500 text-base md:text-lg"></span></button>`;
        });
        html += `</div></div></div></div>`;
    } else if (exploreMath?.layout === 'measure_split') {
        // Mục đo lường – thời gian: giữ layout quen thuộc, minh họa tự vẽ bên trái, câu hỏi + đáp án bên phải.
        html = `
        ${mediaHtml}
        ${passageHtml}
        <div class="w-full max-w-6xl rounded-3xl border-2 border-emerald-200 bg-gradient-to-br from-white via-emerald-50/45 to-cyan-50/45 shadow-sm p-3 md:p-4">
            <div class="grid grid-cols-1 md:grid-cols-[1.08fr_0.92fr] gap-3 md:gap-5 items-stretch">
                <div class="min-w-0 flex flex-col items-center justify-center">
                    ${exploreMath.visual || ''}
                    ${buildTopic56SolutionHtml_(q)}
                </div>
                <div class="min-w-0 flex flex-col justify-center rounded-3xl border-2 border-purple-100 bg-white/85 px-4 py-4 md:px-5 md:py-5">
                    <div class="flex items-start justify-between gap-3 mb-4">
                        <h3 class="text-lg md:text-xl lg:text-2xl font-black leading-snug text-purple-800 text-left">${escapeHtml(exploreMath.prompt || q.question_text)}</h3>
                        <button onclick="speakCurrentQuestion()" class="shrink-0 w-10 h-10 bg-pink-50 hover:bg-pink-100 text-pink-700 border border-pink-200 rounded-xl flex items-center justify-center pastel-btn shadow-xs" title="Nghe câu hỏi" aria-label="Nghe câu hỏi">
                            <i class="fa-solid fa-volume-high text-pink-600"></i>
                        </button>
                    </div>
                    <div class="grid grid-cols-2 gap-2.5 md:gap-3">`;
        q.options.forEach((opt) => {
            const formattedOpt = capitalizeFirstLetter(opt);
            html += `<button data-opt="${escapeHtml(opt)}" onclick="checkAnswer('${opt.replace(/'/g, "\\'")}')" class="option-btn min-h-[64px] w-full px-3 py-3 bg-white hover:bg-emerald-50 border-2 border-emerald-200 rounded-2xl font-black text-slate-800 text-center text-base md:text-lg transition-all flex items-center justify-center shadow-xs pastel-btn"><span>${escapeHtml(formattedOpt)}</span><span class="option-icon text-pink-500 text-base md:text-lg"></span></button>`;
        });
        html += `</div></div></div></div>`;
    } else if (exploreMath?.layout === 'unknown_number') {
        // Mục 7 - Tìm số chưa biết: desktop/tablet dùng 2 cột để tiết kiệm chiều cao.
        // Trái = lời giải; phải = câu hỏi + biểu thức + đáp án. Mobile tự xếp 1 cột.
        html = `
        ${mediaHtml}
        ${passageHtml}
        <div class="w-full max-w-6xl rounded-3xl border-2 border-violet-200 bg-gradient-to-br from-white via-violet-50/40 to-pink-50/35 shadow-sm p-3 md:p-4">
            <div class="grid grid-cols-1 md:grid-cols-[0.95fr_1.05fr] gap-3 md:gap-4 items-stretch">
                <div class="min-w-0 order-2 md:order-1">
                    <div data-unknown-solution-placeholder class="h-full min-h-[150px] rounded-2xl border-2 border-emerald-100 bg-gradient-to-br from-emerald-50/55 to-cyan-50/45 px-4 py-4 flex flex-col items-center justify-center text-center">
                        <div class="text-3xl mb-2">🌱</div>
                        <div class="text-base md:text-lg font-black text-emerald-700">Lời giải sẽ hiện ở đây</div>
                        <div class="mt-1 text-xs md:text-sm font-bold text-slate-500">Bé chọn một đáp án để xem quy tắc và các bước giải.</div>
                    </div>
                    ${exploreMath.solutionHtml || ''}
                </div>

                <div class="min-w-0 order-1 md:order-2 rounded-2xl border-2 border-violet-100 bg-white/88 px-3 py-3 md:px-4 md:py-4 flex flex-col justify-center">
                    <div class="flex items-start justify-between gap-3">
                        <h3 class="text-xl md:text-2xl lg:text-[26px] font-black leading-snug text-slate-900 text-left">${escapeHtml(exploreMath.prompt || q.question_text)}</h3>
                        <button onclick="speakCurrentQuestion()" class="shrink-0 w-10 h-10 md:w-11 md:h-11 bg-pink-50 hover:bg-pink-100 text-pink-700 border-2 border-pink-200 rounded-xl flex items-center justify-center pastel-btn shadow-xs" title="Nghe câu hỏi" aria-label="Nghe câu hỏi">
                            <i class="fa-solid fa-volume-high text-pink-600"></i>
                        </button>
                    </div>

                    <div class="mt-3">
                        ${exploreMath.visual || ''}
                    </div>

                    <div class="grid grid-cols-2 gap-2.5 md:gap-3 mt-3">`;
        q.options.forEach((opt, idx) => {
            const formattedOpt = capitalizeFirstLetter(opt);
            const letter = String.fromCharCode(65 + idx);
            html += `<button data-opt="${escapeHtml(opt)}" onclick="checkAnswer('${opt.replace(/'/g, "\\'")}')" class="option-btn min-h-[58px] md:min-h-[62px] w-full px-3 py-2.5 bg-pink-50/40 hover:bg-pink-100/70 border-2 border-pink-200 rounded-xl font-black text-slate-900 text-center text-lg md:text-xl transition-all flex items-center justify-center gap-2 shadow-xs pastel-btn">
                <strong class="text-rose-600 text-base md:text-lg">${letter}.</strong><span>${escapeHtml(formattedOpt)}</span><span class="option-icon text-pink-500 text-base md:text-lg"></span>
            </button>`;
        });
        html += `</div></div></div></div>`;
    } else if (exploreMath?.layout === 'pattern_split') {
        // Mục quy luật: minh họa trực quan bên trái, câu hỏi + đáp án bên phải.
        html = `
        ${mediaHtml}
        ${passageHtml}
        <div class="w-full max-w-6xl rounded-3xl border-2 border-cyan-200 bg-gradient-to-br from-white via-cyan-50/45 to-indigo-50/45 shadow-sm p-3 md:p-4">
            <div class="grid grid-cols-1 md:grid-cols-[1.10fr_0.90fr] gap-3 md:gap-5 items-stretch">
                <div class="min-w-0 flex flex-col justify-center">
                    ${exploreMath.visual || ''}
                    ${buildTopic811SolutionHtml_(q, 'below')}
                </div>
                <div class="min-w-0 flex flex-col justify-center rounded-3xl border-2 border-indigo-100 bg-white/88 px-4 py-4 md:px-5 md:py-5">
                    <div class="flex items-start justify-between gap-3 mb-4">
                        <h3 class="text-base md:text-lg lg:text-xl font-black leading-snug text-indigo-800 text-left">${escapeHtml(exploreMath.prompt || q.question_text)}</h3>
                        <button onclick="speakCurrentQuestion()" class="shrink-0 w-10 h-10 bg-cyan-50 hover:bg-cyan-100 text-cyan-700 border border-cyan-200 rounded-xl flex items-center justify-center pastel-btn shadow-xs" title="Nghe câu hỏi" aria-label="Nghe câu hỏi">
                            <i class="fa-solid fa-volume-high text-cyan-600"></i>
                        </button>
                    </div>
                    <div class="grid grid-cols-2 gap-2.5 md:gap-3">`;
        q.options.forEach((opt) => {
            const formattedOpt = capitalizeFirstLetter(opt);
            html += `<button data-opt="${escapeHtml(opt)}" onclick="checkAnswer('${opt.replace(/'/g, "\\'")}')" class="option-btn min-h-[60px] w-full px-3 py-2.5 bg-white hover:bg-cyan-50 border-2 border-cyan-200 rounded-2xl font-black text-slate-800 text-center text-sm md:text-base transition-all flex items-center justify-center shadow-xs pastel-btn"><span>${escapeHtml(formattedOpt)}</span><span class="option-icon text-fuchsia-500 text-sm md:text-base"></span></button>`;
        });
        html += `</div></div></div></div>`;
    } else if (isTopic911ReasoningLayout) {
        // Mục 9-11: giống Mục 7 trên tablet/laptop.
        // Trái = lời giải sau khi làm đúng; phải = câu hỏi + đáp án. Mobile tự xếp 1 cột.
        html = `
        ${mediaHtml}
        ${passageHtml}
        <div class="w-full max-w-6xl rounded-3xl border-2 border-violet-200 bg-gradient-to-br from-white via-violet-50/35 to-pink-50/30 shadow-sm p-3 md:p-4">
            <div class="grid grid-cols-1 md:grid-cols-[0.95fr_1.05fr] gap-3 md:gap-4 items-stretch">
                <div class="min-w-0 order-2 md:order-1">
                    ${topic811SolutionPlaceholderHtml_()}
                    ${buildTopic811SolutionHtml_(q, 'side')}
                </div>
                <div class="min-w-0 order-1 md:order-2 rounded-2xl border-2 border-violet-100 bg-white/90 px-3 py-3 md:px-4 md:py-4 flex flex-col justify-center">
                    <div class="flex items-start justify-between gap-3">
                        <h3 class="text-lg md:text-xl lg:text-2xl font-black leading-snug text-slate-900 text-left">${highlightQuestionNumbers_(q.question_text)}</h3>
                        <button onclick="speakCurrentQuestion()" class="shrink-0 w-10 h-10 md:w-11 md:h-11 bg-pink-50 hover:bg-pink-100 text-pink-700 border-2 border-pink-200 rounded-xl flex items-center justify-center pastel-btn shadow-xs" title="Nghe câu hỏi" aria-label="Nghe câu hỏi">
                            <i class="fa-solid fa-volume-high text-pink-600"></i>
                        </button>
                    </div>
                    <div class="grid grid-cols-2 gap-2.5 md:gap-3 mt-3">`;
        q.options.forEach((opt, idx) => {
            const formattedOpt = capitalizeFirstLetter(opt);
            const letter = String.fromCharCode(65 + idx);
            html += `<button data-opt="${escapeHtml(opt)}" onclick="checkAnswer('${opt.replace(/'/g, "\\'")}')" class="option-btn min-h-[56px] md:min-h-[60px] w-full px-3 py-2.5 bg-pink-50/40 hover:bg-pink-100/70 border-2 border-pink-200 rounded-xl font-black text-slate-900 text-left text-sm md:text-base transition-all flex items-center gap-2 shadow-xs pastel-btn">
                <strong class="shrink-0 text-rose-600 text-sm md:text-base">${letter}.</strong><span class="flex-1">${escapeHtml(formattedOpt)}</span><span class="option-icon text-pink-500 text-sm md:text-base"></span>
            </button>`;
        });
        html += `</div></div></div></div>`;
    } else if (exploreMath?.layout === 'estimate_split') {
        // Ước lượng số lượng: toàn bộ hình + câu hỏi + đáp án nằm trong một khung.
        html = `
        ${mediaHtml}
        ${passageHtml}
        <div class="w-full max-w-5xl rounded-3xl border-2 border-pink-200 bg-gradient-to-br from-white via-pink-50/65 to-purple-50/65 shadow-sm p-4 md:p-5">
            <div class="grid grid-cols-1 md:grid-cols-[1.15fr_0.85fr] gap-4 md:gap-6 items-stretch">
                <div class="rounded-2xl border border-pink-100 bg-white/70 px-3 py-3 md:px-4 md:py-4 flex items-center justify-center min-h-[250px]">
                    ${exploreMath.visual || ''}
                </div>
                <div class="flex flex-col justify-center rounded-2xl border border-purple-100 bg-white/70 px-3 py-4 md:px-5 md:py-5">
                    <div class="flex items-start justify-between gap-3 mb-3">
                        <h3 class="text-lg md:text-xl font-black leading-snug text-purple-700 text-left">${escapeHtml(exploreMath.prompt || q.question_text)}</h3>
                        <button onclick="speakCurrentQuestion()" class="shrink-0 px-2.5 py-1.5 bg-pink-50 hover:bg-pink-100 text-pink-700 border border-pink-200 rounded-xl text-xs font-extrabold flex items-center gap-1 pastel-btn shadow-xs" title="Nghe câu hỏi">
                            <i class="fa-solid fa-volume-high text-pink-600"></i><span class="hidden lg:inline">Nghe</span>
                        </button>
                    </div>
                    <div class="grid grid-cols-2 gap-2.5 md:gap-3 mt-1" id="estimate-options-grid">`;

        q.options.forEach((opt) => {
            const formattedOpt = capitalizeFirstLetter(opt);
            html += `
                        <button data-opt="${escapeHtml(opt)}" onclick="checkAnswer('${opt.replace(/'/g, "\\'")}')" class="option-btn w-full p-3 md:p-3.5 bg-white hover:bg-purple-50 border-2 border-purple-200 rounded-2xl font-black text-purple-800 text-center text-base md:text-lg transition-all flex items-center justify-center shadow-xs pastel-btn">
                            <span>${escapeHtml(formattedOpt)}</span><span class="option-icon text-pink-500 text-base md:text-lg"></span>
                        </button>`;
        });
        html += `</div></div></div></div>`;
    } else {
        html = `
        ${mediaHtml}
        ${passageHtml}
        ${composeSpeakerBtnHtml}
        ${findNumberSpeakerBtnHtml}
        ${exploreMath?.visual || ''}
        ${exploreMath?.hidePrompt ? '' : `<div class="flex flex-col items-center justify-center ${isLargeTopic8910 ? 'max-w-5xl' : 'max-w-3xl'} text-center px-2 mt-2 mb-0.5">
            <h3 class="${isFindNumber ? 'text-base md:text-lg text-purple-700' : (exploreMath ? (isCompactTopic34 ? 'text-lg md:text-xl text-purple-700' : 'text-xl md:text-2xl lg:text-2xl text-purple-700') : (isLargeTopic8910 ? 'text-xl md:text-2xl lg:text-[28px] text-slate-900' : 'text-sm md:text-base lg:text-lg text-slate-900'))} font-black leading-snug">
                ${exploreMath?.promptHtml || (isLargeTopic8910 ? topic8910QuestionHtml : escapeHtml(exploreMath?.prompt || q.question_text))}
            </h3>
            ${practiceSpeakerBtnHtml}
        </div>`}
        
        <div class="w-full ${isCarryLearning ? 'max-w-2xl' : ((isCompactTopic34 || isLargeTopic8910) ? 'max-w-5xl' : 'max-w-3xl')} grid ${isCarryLearning ? 'grid-cols-2 md:grid-cols-4 gap-2 shrink-0' : (isFindNumber ? 'grid-cols-2 md:grid-cols-4 gap-2 md:gap-2.5' : ((isCompactTopic34 || isLargeTopic8910) ? 'grid-cols-2 md:grid-cols-4 gap-3 md:gap-3.5' : 'grid-cols-2 md:grid-cols-4 gap-2 md:gap-2.5'))} ${isCarryLearning ? 'mt-2' : (isLargeTopic8910 ? 'mt-2.5' : 'mt-1')}">
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
                <button data-opt="${escapeHtml(opt)}" onclick="checkAnswer('${opt.replace(/'/g, "\\'")}')" class="option-btn w-full ${exploreMath ? (isNumberCompose ? 'p-3 md:p-3.5 bg-white hover:bg-purple-50 border-purple-200 font-black text-purple-800 text-center justify-center text-base md:text-lg' : (isFindNumber ? 'p-3 md:p-3.5 bg-white hover:bg-purple-50 border-purple-200 font-black text-purple-800 text-center justify-center text-base md:text-lg' : (isOperationTerms ? 'p-3 md:p-3.5 bg-white hover:bg-purple-50 border-purple-200 font-black text-purple-800 text-center justify-center text-lg md:text-xl' : (isCarryLearning ? 'px-3 py-1.5 md:py-2 min-h-[42px] bg-white hover:bg-purple-50 border-purple-200 font-black text-purple-800 text-center justify-center text-base md:text-lg' : (isCompactTopic34 ? 'p-3 md:p-3.5 bg-white hover:bg-purple-50 border-purple-200 font-black text-purple-800 text-center justify-center text-lg md:text-xl' : 'p-3.5 md:p-4 bg-white hover:bg-purple-50 border-purple-200 font-black text-purple-800 text-center justify-center text-lg md:text-xl'))))) : (isLargeTopic8910 ? 'p-3.5 md:p-4 min-h-[64px] bg-white hover:bg-pink-50 border-pink-200 font-black text-slate-900 text-center justify-center text-base md:text-lg lg:text-xl' : 'p-3 md:p-3.5 bg-pink-50/40 hover:bg-pink-100/70 border-pink-200 font-extrabold text-gray-800 text-left justify-between text-sm md:text-base')} border-2 rounded-2xl transition-all flex items-center shadow-xs pastel-btn">
                    <span>${exploreMath ? '' : `<strong class="text-pink-600 mr-2 ${isLargeTopic8910 ? 'text-base md:text-lg' : 'text-base md:text-lg'}">${letter}.</strong>`} ${escapeHtml(formattedOpt)}</span>
                    <span class="option-icon text-pink-500 text-base md:text-lg"></span>
                </button>`;
        }
    });
        html += `</div>`;
    }

    const questionBox = document.getElementById('question-box');
    questionBox.innerHTML = html;

    // Riêng Cộng/Trừ có nhớ: khối bài giảng + đáp án cần đủ chiều cao để flex không co
    // khối hướng dẫn và làm đáp án chồng lên nội dung. Chỉ áp dụng tại màn hình này,
    // không thay đổi index hay chiều cao các phần học khác.
    if (isCarryLearning) {
        const guidedCarry = isCarryLearningGuided_();
        questionBox.style.minHeight = guidedCarry ? '300px' : '210px';
        questionBox.style.justifyContent = 'flex-start';
        questionBox.style.paddingTop = '0';
        questionBox.style.paddingBottom = '0';
        const quizCard = questionBox.closest('.pastel-card');
        if (quizCard) quizCard.style.minHeight = guidedCarry ? '535px' : '405px';
    } else {
        questionBox.style.minHeight = '';
        questionBox.style.justifyContent = '';
        questionBox.style.paddingTop = '';
        questionBox.style.paddingBottom = '';
        const quizCard = questionBox.closest('.pastel-card');
        if (quizCard) quizCard.style.minHeight = '';
    }

    // Khoảng cách tới hàng điều hướng được chuẩn hóa toàn chương trình:
    // 20px = 1/2 chiều cao nút 40px. Không đặt margin riêng theo từng dạng câu nữa.
    const practiceNav = document.getElementById('nav-group-practice');
    if (practiceNav) practiceNav.style.marginTop = '';

    restoreQuestionState(q);
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
        if (completedAnswer === q.answer) {
            revealOperationTermsFeedback_(q);
            revealCarryConceptFeedback_(q);
            revealTopic56Solution_(q);
            revealTopic811Solution_(q);
        }
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
            playAudio('correct');
            confetti({ particleCount: 30, spread: 55, origin: { y: 0.7 } });
            setTimeout(() => speakVietnamese(`${q.answer}`), 180);
        } else {
            playAudio('wrong');
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

        const isOperationTerms = q.explore_type === 'operation_terms';
        const isCarryConcept = isCarryConceptQuestion_(q);
        const isCarryGuided = isCarryConcept && isCarryLearningGuided_();
        const isNeighborBasic = q.explore_type === 'number_line_neighbor';
        const isMulDivVisual = q.explore_type === 'mul_div_table_visual';
        if (isOperationTerms) revealOperationTermsFeedback_(q);
        if (isCarryGuided) revealCarryConceptFeedback_(q);
        if (isNeighborBasic) revealNeighborRuleFeedback_(q);
        if (isMulDivVisual) revealMulDivFeedback_();
        if (isUnknownNumberQuestion_(q)) revealUnknownNumberFeedback_(q);
        revealTopic56Solution_(q);
        revealTopic811Solution_(q);

        playAudio('correct');
        confetti({ particleCount: 30, spread: 55, origin: { y: 0.7 } });
        setTimeout(() => speakVietnamese(`${q.answer}`), 180);

        // Các bài phản xạ ngắn và Cấp 2 tự thực hành có thể tự chuyển.
        // Riêng tên thành phần và Cấp 1 có hướng dẫn phải giữ màn hình để bé đọc lại cách làm.
        const currentTopicNum = Number(pendingTopicQuiz?.topicNum);
        const shouldAutoAdvance = currentTopicNum >= 1 && currentTopicNum <= 4 && !isOperationTerms && !isCarryGuided && !isNeighborBasic && !isMulDivVisual;
        if (shouldAutoAdvance) {
            setTimeout(() => {
                if (userAnswers[currentQIndex] !== undefined) nextQuestion();
            }, 850);
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

        // Mục 7 là phần khó: dù chọn sai vẫn mở lời giải từng bước để bé học cách làm.
        // Chỉ khi chọn đúng mới thay ô x bằng đáp án; chọn sai vẫn giữ x để bé nhìn lại bài toán.
        if (isUnknownNumberQuestion_(q)) revealUnknownNumberFeedback_(q, false);

        // Cấp 1 đã có đúng một gợi ý cố định từ đầu; Cấp 2 không mở thêm gợi ý khi sai.
        playAudio('wrong');
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
        showAppNotice('Bé hãy tìm đáp án đúng để hoàn thành câu này nhé!');
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
            showAppNotice(`🎉 Chúc mừng bé đã hoàn thành trọn vẹn 1 vòng luyện tập (${activeQuestionsList.length} câu)!\nBây giờ cô giáo Thỏ Ngọc sẽ xáo trộn ngẫu nhiên để con bước vào vòng luyện tập tiếp theo nhé!`);

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
    showAppConfirm(`Bé đã làm ${answeredCount}/${total} câu. Bé có chắc chắn muốn nộp bài thi ngay không?`, showResultScreen, {
        icon: '📝', title: 'Xác nhận nộp bài', cancelText: 'Làm tiếp', confirmText: 'Nộp bài'
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
                skill_tag: q.skill_tag || '',
                dap_an_chon: studentAns || 'Chưa trả lời',
                dap_an_dung: q.answer,
                explanation: q.explanation || 'Không có giải thích chi tiết.'
            });
        }
        quizAnsweredLog.push({
            question_id: q.question_id,
            question_text: q.question_text,
            skill_tag: q.skill_tag || '',
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

    // Bài tập: điểm tính riêng theo công thức 10/tổng số câu (không dùng điểm từng câu để tránh lệch)
    const displayScore = activeRoadmapContext
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

function renderReportTopicsBreakdown() {
    const container = document.getElementById('report-topics-list');
    if (!container) return;

    const isRoadmap = !!activeRoadmapContext;
    const skillKeys = ['C1', 'C2', 'C3', 'C4', 'C5', 'C6'];
    const policy = getAssessmentPolicy_();
    const skillStats = {};
    skillKeys.forEach(k => {
        skillStats[k] = { total: 0, correct: 0, maxScore: 0, earnedScore: 0 };
    });

    activeQuestionsList.forEach((q, idx) => {
        const tag = extractSkillKey_(q.skill_tag);
        if (!tag || !skillStats[tag]) return; // Không tự đẩy tag lỗi về C1 vì sẽ làm sai hồ sơ năng lực.

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
        const noData = data.total === 0;
        const insufficient = !noData && data.total < policy.minQuestions;
        const canEvaluate = !noData && !insufficient;
        const pct = canEvaluate
            ? (isRoadmap
                ? Math.round((data.correct / data.total) * 100)
                : Math.round((data.earnedScore / data.maxScore) * 100))
            : null;

        let badgeClass, badgeText, barColor, scoreLine, pctText;
        if (noData) {
            badgeClass = 'bg-slate-100 text-slate-600 border border-slate-200';
            badgeText = policy.noDataLabel;
            barColor = 'bg-slate-200';
            scoreLine = `<span class="text-slate-500">Đề này không có câu đo năng lực này</span>`;
            pctText = '—';
        } else if (insufficient) {
            badgeClass = 'bg-amber-50 text-amber-700 border border-amber-200';
            badgeText = policy.insufficientLabel;
            barColor = 'bg-amber-200';
            scoreLine = `<span class="text-amber-700">Mới có <strong>${data.total}</strong> câu · cần tối thiểu ${policy.minQuestions} câu</span>`;
            pctText = '—';
        } else {
            const isPassed = pct >= 50;
            badgeClass = isPassed ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200';
            badgeText = isPassed ? 'Đạt yêu cầu' : 'Cần luyện tập thêm';
            barColor = isPassed ? 'bg-gradient-to-r from-emerald-400 to-teal-400' : 'bg-gradient-to-r from-pink-400 to-rose-400';
            scoreLine = isRoadmap
                ? `<span>Số câu đúng: <strong class="text-pink-600">${data.correct}/${data.total} câu</strong></span>`
                : `<span>Điểm đạt: <strong class="text-pink-600">${data.earnedScore.toFixed(1)} / ${data.maxScore.toFixed(1)}đ</strong> · ${data.total} câu đo</span>`;
            pctText = `${pct}%`;
        }

        html += `
            <div class="bg-pink-50/40 border border-pink-100 rounded-2xl p-3 flex flex-col justify-between space-y-2">
                <div class="flex items-center justify-between gap-2">
                    <span class="font-black text-slate-800 text-xs sm:text-sm">${SKILL_TAXONOMY[k].name}</span>
                    <span class="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold whitespace-nowrap ${badgeClass}">${badgeText}</span>
                </div>
                <div class="flex items-center justify-between gap-2 text-xs font-bold text-slate-600">
                    ${scoreLine}
                    <span class="font-math font-black shrink-0">${pctText}</span>
                </div>
                <div class="w-full ${canEvaluate ? 'bg-pink-100' : 'bg-slate-100'} rounded-full h-2 overflow-hidden">
                    <div class="${barColor} h-full rounded-full transition-all duration-500" style="width: ${canEvaluate ? pct : 0}%"></div>
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
async function saveExamResultToSheet() {
    const { categoryKey, examNo, examId } = activeExamContext;
    const thoiGianLamBai = quizStartTime ? formatDuration(Date.now() - quizStartTime) : '';
    const policy = getAssessmentPolicy_();

    const skillStats = {};
    Object.keys(SKILL_TAXONOMY).forEach(k => {
        skillStats[k] = { earnedScore: 0, maxScore: 0, totalQuestions: 0, correctQuestions: 0 };
    });

    quizAnsweredLog.forEach(item => {
        const tag = extractSkillKey_(item.skill_tag);
        if (!tag || !skillStats[tag]) return;
        const diem = Number(item.diem ?? 0.5) || 0.5;
        skillStats[tag].totalQuestions++;
        skillStats[tag].maxScore += diem;
        if (item.isCorrect) {
            skillStats[tag].correctQuestions++;
            skillStats[tag].earnedScore += diem;
        }
    });

    const payload = {
        maHS: currentUser.maHS,
        token: currentUser.token,
        hoTen: currentUser.hoTen,
        lop: currentUser.lop,
        examCategory: categoryKey,
        examId: examId || '',
        sheetName: examFileMap[categoryKey]?.sheet || 'LichSuBaiThi_HK1',
        deSo: examNo || 1,
        thoiGianLamBai,
        tongDiem: score.toFixed(1),
        soCauDung: quizAnsweredLog.filter(x => x.isCorrect).length,
        tongCauHoi: activeQuestionsList.length,
        measuredCompetencies: Object.keys(skillStats).filter(k => skillStats[k].totalQuestions > 0).map(k => `TOAN_${k}`).join(','),
        assessmentMinQuestions: policy.minQuestions,
        wrongQuestions: quizWrongAnswers
    };

    Object.keys(SKILL_TAXONOMY).forEach(k => {
        const s = skillStats[k];
        const taxo = SKILL_TAXONOMY[k];
        const measured = s.totalQuestions > 0;
        const status = !measured ? policy.noDataLabel : (s.totalQuestions < policy.minQuestions ? policy.insufficientLabel : 'Đã đánh giá');

        // Nhóm không có câu hỏi được lưu RỖNG chứ không lưu 0 để tránh hiểu nhầm "0%".
        payload[`diem${k}`] = measured ? s.earnedScore.toFixed(1) : '';
        payload[taxo.sheetCol] = measured ? s.earnedScore.toFixed(1) : '';
        // Trên sheet đề thi, *_Tong là tổng điểm tối đa của chính nhóm năng lực trong đề đó.
        // Có mẫu số này client mới được phép tính phần trăm năng lực ở lịch sử.
        payload[taxo.totalCol] = measured ? s.maxScore.toFixed(1) : '';
        payload[`soCau${k}`] = measured ? s.totalQuestions : '';
        payload[`dung${k}`] = measured ? s.correctQuestions : '';
        payload[`trangThai${k}`] = status;
    });

    try { await callAppsScript('saveExamResult', payload); } catch (e) {}
}

async function saveWeeklyProgressToSheet(percent, starCount, scoreVal) {
    const { week, topicId, chuDe } = activeRoadmapContext;
    const thoiGianLamBai = quizStartTime ? formatDuration(Date.now() - quizStartTime) : '';
    const scoreThang10 = (scoreVal ?? ((score / activeQuestionsList.length) * 10)).toFixed(1);

    // Đếm CHÍNH XÁC số câu đúng / tổng số câu của từng nhóm năng lực, dựa theo skill_tag
    // (TOAN_C1-C6) mà mỗi câu tự mang sẵn — không ước lượng chia đều, không suy luận gián tiếp qua chủ đề Mục lớn.
    const skillCorrect = { C1: 0, C2: 0, C3: 0, C4: 0, C5: 0, C6: 0 };
    const skillTotal = { C1: 0, C2: 0, C3: 0, C4: 0, C5: 0, C6: 0 };
    quizAnsweredLog.forEach(item => {
        let rawTag = String(item.skill_tag || 'TOAN_C1').toUpperCase();
        let m = rawTag.match(/C([1-6])/);
        const tag = m ? 'C' + m[1] : 'C1';
        if (skillTotal[tag] === undefined) return;
        skillTotal[tag]++;
        if (item.isCorrect) skillCorrect[tag]++;
    });
    const payload = {
        student_id: currentUser.maHS,
        maHS: currentUser.maHS,
        token: currentUser.token, // bắt buộc để server xác nhận đúng chủ tài khoản mới cho ghi điểm
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
                setTimeout(() => showAppNotice(`🎉 Chúc mừng bé đạt ${percent}% điểm! Tuần ${nextWeek} đã được mở khóa trên bản đồ!`), 500);
            }
        }
    } catch (e) {}
}

async function openHistoryModal(sheetName = 'LichSuTienTrinhTuan') {
    if (!currentUser || currentUser.isGuest) {
        return showAppNotice('Bé vui lòng đăng nhập để xem lịch sử tiến trình nhé!');
    }

    const modal = document.getElementById('modal-history-progress');
    modal.classList.remove('hidden');

    document.getElementById('hist-info-name').textContent = currentUser.hoTen || '--';
    document.getElementById('hist-info-class').textContent = currentUser.lop || '--';
    document.getElementById('hist-info-code').textContent = currentUser.maHS || '--';
    document.getElementById('hist-info-dob').textContent = formatDateOnly(currentUser.ngaySinh) !== '--' ? formatDateOnly(currentUser.ngaySinh) : (currentUser.ngaySinh || '03/09/2019');
    document.getElementById('hist-report-date').textContent = new Date().toLocaleDateString('vi-VN');

    const titleMap = {
        LichSuTienTrinhTuan: "Báo cáo Bài tập theo bài học",
        LichSuBaiThi_HK1: "Báo cáo kết quả đấu trường — Học kỳ 1",
        LichSuBaiThi_HK2: "Báo cáo kết quả đấu trường — Học kỳ 2",
        LichSuBaiThi_HSG: "Báo cáo kết quả đấu trường — Học sinh giỏi"
    };
    document.getElementById('hist-modal-title').textContent = titleMap[sheetName] || "Kết quả tiến trình học tập";

    showLoadingOverlay('Đang trích xuất dữ liệu và vẽ biểu đồ năng lực...');
    try {
        const res = await callAppsScript('getHistory', { maHS: currentUser.maHS, sheetName, token: currentUser.token });
        hideLoadingOverlay();
        if (res && res.ok === false) {
            // Token hết hạn/không hợp lệ hoặc không đúng chủ - đóng modal, báo rõ thay vì âm thầm
            // hiện báo cáo trống (dễ gây hiểu lầm là bé chưa học gì).
            closeHistoryModal();
            showAppNotice(res.error || 'Không thể tải lịch sử - bé đăng nhập lại nhé!');
            return;
        }
        const rows = (res && res.history) ? res.history : [];
        renderHistoryReport(rows, sheetName);
    } catch (err) {
        hideLoadingOverlay();
        showAppNotice('Không thể tải lịch sử: ' + err.message);
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


function getExamSkillCell(row, skillKey) {
    const taxo = SKILL_TAXONOMY[skillKey];
    const policy = getAssessmentPolicy_();
    const earnedRaw = row[`diem${skillKey}`] ?? row[taxo.sheetCol] ?? row[`diem_${skillKey.toLowerCase()}`] ?? row[skillKey];
    const maxRaw = row[taxo.totalCol] ?? row[`maxDiem${skillKey}`] ?? row[`tongDiem${skillKey}`];
    const questionRaw = row[`soCau${skillKey}`] ?? row[`tongCau${skillKey}`] ?? row[`count${skillKey}`];

    const hasEarnedField = earnedRaw !== undefined && earnedRaw !== null && earnedRaw !== '' && earnedRaw !== '--';
    const maxScore = (maxRaw !== undefined && maxRaw !== null && maxRaw !== '' && maxRaw !== '--') ? Number(maxRaw) : NaN;

    // Dữ liệu cũ chỉ lưu điểm C1-C6 nhưng không lưu mẫu số. Ta không thể biết 0 là "làm sai" hay "không được đo".
    // Vì vậy phải trả Chưa đủ dữ liệu, tuyệt đối không suy thành 0%.
    if (!Number.isFinite(maxScore) || maxScore <= 0) {
        return hasEarnedField ? { status: 'insufficient', earned: null, maxScore: null, questionCount: null } : { status: 'unmeasured', earned: null, maxScore: null, questionCount: 0 };
    }

    const earnedNum = Number(earnedRaw);
    const earned = Number.isFinite(earnedNum) ? earnedNum : 0;
    const qNum = (questionRaw !== undefined && questionRaw !== null && questionRaw !== '' && questionRaw !== '--') ? Number(questionRaw) : NaN;
    const questionCount = Number.isFinite(qNum) && qNum >= 0 ? qNum : null;

    if (questionCount !== null && questionCount > 0 && questionCount < policy.minQuestions) {
        return { status: 'insufficient', earned, maxScore, questionCount };
    }
    return { status: 'measured', earned, maxScore, questionCount };
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
        const label = isWeekly ? `Tuần ${r.tuan || i + 1}` : (r.deSo ? `Đề ${r.deSo}` : `Lần ${i + 1}`);
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
                data: scores.length ? scores : [null],
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
    const policy = getAssessmentPolicy_();
    const skillAverages = { C1: null, C2: null, C3: null, C4: null, C5: null, C6: null };
    const touchedSkills = [];
    const insufficientSkills = [];

    if (rows.length && isWeekly) {
        skillKeys.forEach((k) => {
            let sumCorrect = 0, sumTotal = 0;
            rows.forEach(r => {
                const cell = getSkillCell(r, k);
                if (!cell) return;
                sumCorrect += cell.correct;
                sumTotal += cell.total;
            });
            if (sumTotal >= policy.minQuestions) {
                skillAverages[k] = Math.min(100, Math.round((sumCorrect / sumTotal) * 100));
                touchedSkills.push(k);
            } else if (sumTotal > 0) {
                insufficientSkills.push(k);
            }
        });
    } else if (rows.length) {
        skillKeys.forEach((k) => {
            let sumEarned = 0, sumMax = 0, questionCount = 0, hasQuestionCount = false, hadInsufficient = false;
            rows.forEach(r => {
                const cell = getExamSkillCell(r, k);
                if (!cell) return;
                if (cell.status === 'measured') {
                    sumEarned += cell.earned;
                    sumMax += cell.maxScore;
                    if (cell.questionCount !== null) {
                        questionCount += cell.questionCount;
                        hasQuestionCount = true;
                    }
                } else if (cell.status === 'insufficient') {
                    hadInsufficient = true;
                }
            });
            const enoughByCount = !hasQuestionCount || questionCount >= policy.minQuestions;
            if (sumMax > 0 && enoughByCount) {
                skillAverages[k] = Math.min(100, Math.round((sumEarned / sumMax) * 100));
                touchedSkills.push(k);
            } else if (hadInsufficient || (sumMax > 0 && !enoughByCount)) {
                insufficientSkills.push(k);
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
                data: skillKeys.map(k => skillAverages[k]),
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
                tooltip: {
                    callbacks: {
                        label: (ctx) => ctx.raw === null ? ` ${policy.noDataLabel}` : ` Độ thành thạo: ${ctx.raw}%`
                    }
                }
            }
        },
        plugins: [{
            id: 'barValueLabels',
            afterDatasetsDraw(chart) {
                const { ctx } = chart;
                chart.data.datasets[0].data.forEach((val, i) => {
                    if (val === null || val === undefined || Number.isNaN(val)) return;
                    const meta = chart.getDatasetMeta(0).data[i];
                    if (!meta) return;
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

    renderPedagogicalEvaluation(rows, skillAverages, touchedSkills, insufficientSkills);
    renderHistoryTable(rows, sheetName);
}

function renderPedagogicalEvaluation(rows, skillAverages, touchedSkills, insufficientSkills = []) {
    const box = document.getElementById('pedagogical-evaluation-box');
    if (!box) return;

    const studentName = getStudentFirstName();
    const count = rows.length;
    const avgScore = count ? (rows.reduce((acc, r) => acc + Number(r.score || r.tongDiem || 0), 0) / count) : 0;
    const avgScoreStr = avgScore.toFixed(1);
    const skillKeys = ['C1', 'C2', 'C3', 'C4', 'C5', 'C6'];
    const validSkills = (touchedSkills && touchedSkills.length) ? touchedSkills : [];
    const validSet = new Set(validSkills);
    const insufficientSet = new Set(insufficientSkills || []);
    const notEvaluated = skillKeys.filter(k => !validSet.has(k) && !insufficientSet.has(k));

    let overviewText;
    if (count === 0) {
        overviewText = `Chưa có bài kiểm tra nào được ghi nhận nên hệ thống chưa đưa ra kết luận về kết quả học tập.`;
    } else if (avgScore >= 8) {
        overviewText = `Con nắm rất vững kiến thức trọng tâm của các bài đã làm và đạt kết quả tốt.`;
    } else if (avgScore >= 6.5) {
        overviewText = `Con nắm khá tốt kiến thức trọng tâm của các bài đã làm, tuy nhiên vẫn còn một vài chỗ cần luyện thêm.`;
    } else if (avgScore >= 5) {
        overviewText = `Con đã nắm được kiến thức cơ bản trong các bài đã làm nhưng chưa thật chắc, cần ôn luyện thêm.`;
    } else {
        overviewText = `Kết quả các bài đã làm còn thấp; ba mẹ nên đồng hành ôn lại đúng những nội dung đã được kiểm tra.`;
    }

    const sortedValid = [...validSkills].sort((a, b) => skillAverages[b] - skillAverages[a]);
    let strengthHtml, weaknessHtml;
    if (sortedValid.length >= 2) {
        const top1 = SKILL_TAXONOMY[sortedValid[0]].name;
        const top2 = SKILL_TAXONOMY[sortedValid[1]].name;
        strengthHtml = `Trong những năng lực đã có đủ dữ liệu, con đạt tốt ở <strong>${escapeHtml(top1)}</strong> (${skillAverages[sortedValid[0]]}%) và <strong>${escapeHtml(top2)}</strong> (${skillAverages[sortedValid[1]]}%).`;

        const weak1 = sortedValid[sortedValid.length - 1];
        const weakPct = skillAverages[weak1];
        weaknessHtml = weakPct < 70
            ? `Trong những năng lực đã được đo, mảng cần ưu tiên luyện thêm là <strong>${escapeHtml(SKILL_TAXONOMY[weak1].name)}</strong> (${weakPct}%). ${escapeHtml(SKILL_TAXONOMY[weak1].advice)}`
            : `Trong những năng lực đã được đo, chưa có nhóm nào dưới 70%. Bé nên tiếp tục luyện đều để duy trì kết quả.`;
    } else if (sortedValid.length === 1) {
        const only1 = sortedValid[0];
        strengthHtml = `Hiện chỉ có đủ dữ liệu cho nhóm <strong>${escapeHtml(SKILL_TAXONOMY[only1].name)}</strong>, đạt ${skillAverages[only1]}%.`;
        weaknessHtml = `Chưa đủ dữ liệu để kết luận điểm yếu ở các nhóm năng lực khác.`;
    } else {
        strengthHtml = `Chưa có đủ dữ liệu hợp lệ để xác định thế mạnh theo năng lực.`;
        weaknessHtml = `Chưa có đủ dữ liệu hợp lệ để xác định nhóm cần khắc phục.`;
    }

    const coverageParts = [];
    if (insufficientSet.size) {
        const names = [...insufficientSet].map(k => SKILL_TAXONOMY[k].name).join(', ');
        coverageParts.push(`<strong>Chưa đủ dữ liệu:</strong> ${escapeHtml(names)}.`);
    }
    if (notEvaluated.length) {
        const names = notEvaluated.map(k => SKILL_TAXONOMY[k].name).join(', ');
        coverageParts.push(`<strong>Chưa đánh giá:</strong> ${escapeHtml(names)}.`);
    }
    const coverageHtml = coverageParts.length
        ? `${coverageParts.join(' ')} Các nhóm này <strong>không được quy thành 0%</strong> và không dùng để kết luận bé yếu.`
        : `Các nhóm hiển thị phần trăm đều đã có dữ liệu đo hợp lệ.`;

    box.innerHTML = `
        <div class="bg-white/80 p-3 rounded-xl border border-amber-200">
            <span class="text-amber-700 font-extrabold block mb-0.5">🌟 1. Đánh giá tổng quan kết quả:</span>
            <p class="text-gray-700">${count > 0 ? `Học sinh <strong>${escapeHtml(currentUser.hoTen)}</strong> đã hoàn thành <strong>${count} bài kiểm tra</strong> với điểm số trung bình tích lũy <strong class="text-pink-600">${avgScoreStr}/10 điểm</strong>. ${overviewText}` : overviewText}</p>
        </div>

        <div class="bg-sky-50/70 p-3 rounded-xl border border-sky-200">
            <span class="text-sky-700 font-extrabold block mb-0.5">📌 2. Phạm vi dữ liệu năng lực:</span>
            <p class="text-gray-700">${coverageHtml}</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div class="bg-emerald-50/70 p-3 rounded-xl border border-emerald-200">
                <span class="text-emerald-700 font-extrabold block mb-0.5">✅ 3. Thế mạnh trong phần đã đo:</span>
                <p class="text-gray-700">${strengthHtml}</p>
            </div>

            <div class="bg-rose-50/70 p-3 rounded-xl border border-rose-200">
                <span class="text-rose-700 font-extrabold block mb-0.5">⚠️ 4. Nội dung cần ưu tiên:</span>
                <p class="text-gray-700">${weaknessHtml}</p>
            </div>
        </div>

        <div class="bg-white/80 p-3 rounded-xl border border-purple-200">
            <span class="text-purple-700 font-extrabold block mb-0.5">💡 5. Gợi ý đồng hành:</span>
            <p class="text-gray-700">Ba mẹ nên ưu tiên cho ${studentName} ôn đúng những nội dung đã được kiểm tra và còn chưa chắc; không nên coi nhóm chưa được đo là điểm yếu của con.</p>
        </div>
    `;
}

function renderHistoryTable(rows, sheetName) {
    const tbody = document.getElementById('hist-table-body');
    if (!tbody) return;

    if (!rows.length) {
        tbody.innerHTML = `<tr><td colspan="11" class="py-4 text-gray-400">Chưa ghi nhận lịch sử bài làm nào</td></tr>`;
        return;
    }

    const isWeekly = sheetName === 'LichSuTienTrinhTuan';
    const skillKeys = ['C1', 'C2', 'C3', 'C4', 'C5', 'C6'];
    const policy = getAssessmentPolicy_();

    const totalRows = rows.length;
    let sumTongDiem = 0;
    rows.forEach(r => { sumTongDiem += Number(r.tongDiem || r.score || 0); });
    const avgTong = (sumTongDiem / totalRows).toFixed(1);

    let summaryCells = '';
    let bodyRows = '';

    if (isWeekly) {
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
            if (a.total >= policy.minQuestions) summaryCells += `<td class="py-2 px-1">${Math.round((a.correct / a.total) * 100)}%</td>`;
            else if (a.total > 0) summaryCells += `<td class="py-2 px-1 text-amber-600">Chưa đủ DL</td>`;
            else summaryCells += `<td class="py-2 px-1 text-slate-400">Chưa ĐG</td>`;
        });

        rows.forEach((r, idx) => {
            const itemDiem = r.tongDiem || r.score || '--';
            const dateStr = formatDateOnly(r.Timestamp || r.ngayLam);
            const durationStr = r.thoiGianLamBai || '--';

            let skillCells = '';
            skillKeys.forEach(k => {
                const cell = getSkillCell(r, k);
                if (!cell) { skillCells += `<td class="py-2 px-1 text-slate-400">Chưa ĐG</td>`; return; }
                if (cell.total < policy.minQuestions) { skillCells += `<td class="py-2 px-1 text-amber-600">Chưa đủ DL</td>`; return; }
                const pct = Math.round((cell.correct / cell.total) * 100);
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
        skillKeys.forEach(k => {
            let earned = 0, maxScore = 0, hadInsufficient = false;
            rows.forEach(r => {
                const cell = getExamSkillCell(r, k);
                if (cell.status === 'measured') { earned += cell.earned; maxScore += cell.maxScore; }
                else if (cell.status === 'insufficient') hadInsufficient = true;
            });
            if (maxScore > 0) summaryCells += `<td class="py-2 px-1">${Math.round((earned / maxScore) * 100)}%</td>`;
            else if (hadInsufficient) summaryCells += `<td class="py-2 px-1 text-amber-600">Chưa đủ DL</td>`;
            else summaryCells += `<td class="py-2 px-1 text-slate-400">Chưa ĐG</td>`;
        });

        rows.forEach((r, idx) => {
            const itemDiem = r.tongDiem || r.score || '--';
            const dateStr = formatDateOnly(r.Timestamp || r.ngayLam);
            const durationStr = r.thoiGianLamBai || '--';

            let examSkillCells = '';
            skillKeys.forEach(k => {
                const cell = getExamSkillCell(r, k);
                if (cell.status === 'unmeasured') {
                    examSkillCells += `<td class="py-2 px-1 text-slate-400">Chưa ĐG</td>`;
                } else if (cell.status === 'insufficient') {
                    examSkillCells += `<td class="py-2 px-1 text-amber-600">Chưa đủ DL</td>`;
                } else {
                    const pct = Math.round((cell.earned / cell.maxScore) * 100);
                    examSkillCells += `<td class="py-2 px-1">${cell.earned.toFixed(1)}/${cell.maxScore.toFixed(1)} <span class="text-gray-400">(${pct}%)</span></td>`;
                }
            });

            bodyRows += `
                <tr class="hover:bg-pink-50/30 transition-colors">
                    <td class="py-2.5 px-2">${idx + 1}</td>
                    <td class="py-2.5 px-2 font-black">${r.deSo ? `Đề ${r.deSo}` : `Lần ${idx + 1}`}</td>
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
            <td class="py-2.5 px-2" colspan="2">Trung bình / tổng hợp</td>
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
function speakPedagogicalEvaluation() {
    const box = document.getElementById('pedagogical-evaluation-box');
    if (!box) return;
    const text = box.innerText || box.textContent || '';
    if (!text.trim()) return showAppNotice('Chưa có dữ liệu nhận xét để đọc, bé làm bài rồi quay lại xem nhé!');
    speakVietnamese(text, 0.96);
}

function stopSpeaking() {
    try {
        if (banMaiAudio) {
            banMaiAudio.pause();
            banMaiAudio.currentTime = 0;
            banMaiAudio.onended = null;
        }
    } catch (e) {}
}

function normalizeVietnameseMathSpeech_(text) {
    let s = String(text ?? '');

    // ASCII '-' có thể là dấu trừ, dấu nối, khoảng số hoặc ngày tháng.
    // Chỉ đọc là “trừ” khi ngữ cảnh thực sự là biểu thức toán; các dạng
    // 2-3 đoạn, 2026-09-30, mã học sinh... vẫn được giữ nguyên.
    const rawHasMathContext = /[=+×÷−<>≤≥≠]|(?:^|\s)(?:tính|phép\s*tính|phép\s*cộng|phép\s*trừ|hiệu|số\s*bị\s*trừ|số\s*trừ)(?:\s|$)/i.test(s);
    const wholeIsSubtraction = /^\s*(?:[xX]|\d+(?:[.,]\d+)?)\s*-\s*(?:[xX]|\d+(?:[.,]\d+)?)(?:\s*=\s*(?:[xX?]|\d+(?:[.,]\d+)?))?\s*[?.!]*\s*$/.test(s);

    // Dấu trừ ASCII có khoảng trắng hai bên luôn được xem là phép trừ.
    s = s.replace(/([0-9xX?)])\s+-\s+([0-9xX?(])/g, '$1 trừ $2');
    if (rawHasMathContext || wholeIsSubtraction) {
        s = s.replace(/([0-9xX?)])\s*-\s*([0-9xX?(])/g, '$1 trừ $2');
    }

    // Ký hiệu toán học rõ nghĩa: chuẩn hóa trước khi gửi sang Google TTS
    // để tránh engine tự hiểu '-' giữa hai số là “đến”.
    s = s
        .replace(/−/g, ' trừ ')
        .replace(/\+/g, ' cộng ')
        .replace(/÷/g, ' chia ')
        .replace(/×/g, ' nhân ')
        .replace(/≤/g, ' nhỏ hơn hoặc bằng ')
        .replace(/≥/g, ' lớn hơn hoặc bằng ')
        .replace(/≠/g, ' khác ')
        .replace(/=/g, ' bằng ')
        .replace(/</g, ' nhỏ hơn ')
        .replace(/>/g, ' lớn hơn ');

    // Một số dữ liệu dùng "x" hoặc ":" làm toán tử. Chỉ đổi khi nằm giữa số
    // và có ngữ cảnh toán, tránh đọc nhầm ẩn số x hay giờ dạng 7:30.
    s = s.replace(/(\d+(?:[.,]\d+)?)\s+[xX]\s+(\d+(?:[.,]\d+)?)/g, '$1 nhân $2');
    if (rawHasMathContext) {
        s = s.replace(/(\d+(?:[.,]\d+)?)\s*:\s*(\d+(?:[.,]\d+)?)/g, '$1 chia $2');
    } else {
        s = s.replace(/(\d+(?:[.,]\d+)?)\s+:\s+(\d+(?:[.,]\d+)?)/g, '$1 chia $2');
    }

    return s.replace(/\s{2,}/g, ' ').trim();
}

function speakVietnamese(text, rate = 0.96) {
    if (!text) return;
    try {
        stopSpeaking();

        let cleanText = String(text)
            .replace(/<[^>]*>/g, '')
            .replace(/b-a/g, 'bờ a ba')
            .replace(/c\/k/g, 'cờ hoặc ca')
            .replace(/g\/gh/g, 'gờ đơn hoặc gờ kép')
            .replace(/ng\/ngh/g, 'ngờ đơn hoặc ngờ kép');

        cleanText = normalizeVietnameseMathSpeech_(cleanText).trim();

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
    if (q.explore_type === 'find_number') {
        const clue = q.visual_data?.clue || String(q.question_text || '').replace(/^🔎\s*/, '');
        speakVietnamese(clue, 0.96);
        return;
    }
    const composeSpeech = getComposeSpeechText(q);
    if (composeSpeech) {
        speakVietnamese(composeSpeech, 0.94);
        return;
    }
    const exploreMath = (!activeExamContext && !activeRoadmapContext) ? getExploreMathPresentation(q) : null;
    const textToRead = q.audio_text || exploreMath?.prompt || q.reading_passage || q.question_text;
    speakVietnamese(textToRead, 0.96);
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
        el.innerHTML = `<div class="bg-white px-6 py-4 rounded-2xl shadow-xl font-extrabold text-pink-600 flex items-center space-x-3"><i class="fa-solid fa-spinner fa-spin"></i><span id="loading-overlay-text"></span></div>`;
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

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('login-mapin')?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') doLogin();
    });
    document.getElementById('login-mahs')?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') doLogin();
    });

    window.addEventListener('click', () => {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!audioCtx && AudioContext) audioCtx = new AudioContext();
        if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
    }, { once: true });

    updateAutoSpeechButtonUI();
});

flushPendingLogout();
tryAutoLogin();

// ============================================================
// TOÁN 2 V2 - BÀI TẬP BÁM TRỰC TIẾP 48 BÀI HỌC CHÍNH SGK
// Không còn roadmap tuần trong trải nghiệm người dùng.
// TOAN_C1-C6 tiếp tục là trục đánh giá xuyên suốt.
// ============================================================
function getBaiTapUnlockKeyToan2_() {
    const id = currentUser?.maHS || 'KHACH';
    return `toan2_bai_tap_unlocked_v1_${String(id).toUpperCase()}`;
}
function getUnlockedBaiTapToan2_() {
    try { return Math.max(1, Number(localStorage.getItem(getBaiTapUnlockKeyToan2_()) || 1)); }
    catch (e) { return 1; }
}
function saveUnlockedBaiTapToan2_(n) {
    try { localStorage.setItem(getBaiTapUnlockKeyToan2_(), String(Math.max(1, Number(n) || 1))); }
    catch (e) {}
}
function getNextBaiTapToan2_(data, bai) {
    return (data?.bai_tap || []).map(x => Number(x.bai)).sort((a,b)=>a-b).find(x => x > Number(bai)) || null;
}
function isBaiTapUnlockedToan2_(data, bai) {
    return Number(bai) <= getUnlockedBaiTapToan2_();
}

function clickProgressOrExam(type) {
    if (type === 'progress') return ensurePremiumAccess('Bài tập', () => openRoadmap(1));
    if (type === 'exam') return ensurePremiumAccess('Đấu trường đề thi', () => openExamHub());
}

async function openBaiHocHub(semesterNumber = 1) {
    setAppShellRootMode_(true);
    stopSpeaking();
    if (!isPremiumUser()) { showPremiumAccessModal('Bài học'); return; }
    setMainTabActive_('lessons');
    activeExamContext = null; activeRoadmapContext = null; activeTopicId = null; pendingTopicQuiz = null;
    updateNavTabs(null, null, null);
    switchAppView('view-roadmap');
    showLoadingOverlay('Đang mở Bài học...');
    try {
        const data = await loadBaiHocData();
        renderBaiHocGridToan2_(data, semesterNumber);
    } catch (err) {
        showAppNotice(`Không thể mở Bài học: ${err.message}`);
    } finally { hideLoadingOverlay(); }
}

let activeBaiHocToan2_ = { data: null, lesson: null, pageIndex: 0 };

function renderBaiHocGridToan2_(data, semesterNumber) {
    const view = document.getElementById('view-roadmap');
    const container = document.getElementById('roadmap-svg-container');
    if (!view || !container) return;

    // Hub Bài học chỉ giữ bộ lọc Học kỳ + lưới bài. Không lặp tiêu đề/mô tả dài phía trên.
    const h2 = view.querySelector('h2');
    const p = view.querySelector('h2 + p');
    if (h2) h2.classList.add('hidden');
    if (p) p.classList.add('hidden');
    const historyBtn = view.querySelector('button[onclick*="LichSuTienTrinhTuan"]');
    if (historyBtn) historyBtn.classList.add('hidden');

    const arr = (data?.bai_hoc || []).filter(x => Number(x.semester) === Number(semesterNumber));
    const tabHost = document.getElementById('roadmap-semester-tabs');
    if (tabHost) tabHost.innerHTML = [1,2].map(s => `<button onclick="openBaiHocHub(${s})" class="semester-switch-btn ${Number(s)===Number(semesterNumber)?'is-active':'is-inactive'}">Học kỳ ${s}</button>`).join('');

    const palette = [
        {bg:'linear-gradient(145deg,#fff1f7 0%,#fdf4ff 100%)', border:'#f9a8d4', title:'#be185d'},
        {bg:'linear-gradient(145deg,#faf5ff 0%,#f5f3ff 100%)', border:'#d8b4fe', title:'#7e22ce'},
        {bg:'linear-gradient(145deg,#fdf2f8 0%,#fff7ed 100%)', border:'#fbcfe8', title:'#db2777'},
        {bg:'linear-gradient(145deg,#f5f3ff 0%,#fdf2f8 100%)', border:'#c4b5fd', title:'#6d28d9'},
        {bg:'linear-gradient(145deg,#fff7fb 0%,#fce7f3 100%)', border:'#f9a8d4', title:'#c026d3'},
        {bg:'linear-gradient(145deg,#faf5ff 0%,#fff1f7 100%)', border:'#e9d5ff', title:'#9333ea'}
    ];

    container.className = 'w-full rounded-3xl border-2 p-3 md:p-4 shadow-sm';
    container.style.background = 'linear-gradient(135deg,#fff7fb 0%,#faf5ff 50%,#fdf2f8 100%)';
    container.style.borderColor = '#f0abfc';
    container.innerHTML = `<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5 md:gap-3">${arr.map((bh,idx)=>{
        const c = palette[idx % palette.length];
        return `<button onclick="selectBaiHocToan2_(${bh.bai})" class="text-left min-h-[96px] md:min-h-[104px] rounded-2xl border-2 p-3 md:p-3.5 transition-all hover:-translate-y-0.5 hover:shadow-lg flex flex-col items-start justify-start" style="background:${c.bg};border-color:${c.border};box-shadow:0 4px 12px rgba(168,85,247,.08)"><div class="font-black text-base md:text-[17px] leading-tight" style="color:${c.title}">Bài ${bh.bai}</div><div class="text-[13px] md:text-[14px] font-extrabold text-slate-700 mt-2 leading-snug text-left w-full">${escapeHtml(bh.source_title||bh.title||'')}</div></button>`;
    }).join('')}</div>`;
}

async function selectBaiHocToan2_(bai) {
    if (!isPremiumUser()) { showPremiumAccessModal('Bài học'); return; }
    try {
        const data = await loadBaiHocData();
        const lesson = (data?.bai_hoc || []).find(x => Number(x.bai) === Number(bai));
        if (!lesson) throw new Error(`Không tìm thấy dữ liệu Bài ${bai}`);
        activeBaiHocToan2_ = { data, lesson, pageIndex: 0 };
        renderBaiHocDetailToan2_();
    } catch (err) {
        showAppNotice(`Không thể mở Bài học: ${err.message}`);
    }
}

function renderBaiHocDetailToan2_() {
    setAppShellRootMode_(false);
    const ctx = activeBaiHocToan2_;
    const lesson = ctx.lesson;
    if (!lesson) return;
    switchAppView('view-bai-hoc-detail');
    setMainTabActive_('lessons');
    updateNavTabs(`Bài ${lesson.bai}`, '📖', null);

    const meta = document.getElementById('bai-hoc-detail-meta');
    const title = document.getElementById('bai-hoc-detail-title');
    const tabs = document.getElementById('bai-hoc-detail-tabs');
    const body = document.getElementById('bai-hoc-detail-body');
    if (meta) meta.textContent = `Bài ${lesson.bai} · ${lesson.theme || 'Toán 2'}`;
    if (title) title.textContent = lesson.source_title || lesson.title || `Bài ${lesson.bai}`;

    const pages = Array.isArray(lesson.pages) ? lesson.pages : [];
    if (tabs) tabs.innerHTML = pages.map((pg, idx) => `<button onclick="openBaiHocPageToan2_(${idx})" class="px-3 py-2 rounded-xl border font-black text-sm md:text-base ${idx===ctx.pageIndex?'bg-gradient-to-r from-pink-500 to-purple-500 text-white border-purple-400 shadow-sm':'bg-white text-purple-700 border-purple-200 hover:bg-purple-50'}">${escapeHtml(pg.title || `Trang ${idx+1}`)}</button>`).join('');
    if (body) {
        const pageBody = renderBaiHocPageBodyToan2_(pages[ctx.pageIndex] || {});
        body.innerHTML = `${pageBody}${renderBaiHocBottomNavToan2_(lesson, ctx.pageIndex, pages.length)}`;
    }
}

function renderBaiHocBottomNavToan2_(lesson, pageIndex, pageCount) {
    const count = Math.max(1, Number(pageCount) || 3);
    const idx = Math.max(0, Math.min(count - 1, Number(pageIndex) || 0));
    const prev = idx > 0
        ? `<button onclick="openBaiHocPageToan2_(${idx-1})" class="h-10 px-4 md:px-5 py-0 rounded-xl bg-white border border-purple-200 text-purple-700 font-black text-sm md:text-base shadow-sm hover:bg-purple-50 flex items-center justify-center">← Trang trước</button>`
        : '<span></span>';
    const next = idx < count - 1
        ? `<button onclick="openBaiHocPageToan2_(${idx+1})" class="h-10 px-5 md:px-6 py-0 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-black text-sm md:text-base shadow-md hover:brightness-105 flex items-center justify-center">Trang tiếp →</button>`
        : `<button onclick="openBaiHocPageToan2_(0)" class="h-10 px-4 md:px-5 py-0 rounded-xl bg-purple-50 border border-purple-200 text-purple-700 font-black text-sm md:text-base flex items-center justify-center">↺ Xem lại bài</button>`;
    return `<div class="flex items-center justify-between gap-3 pt-4 mt-4 border-t border-pink-100">${prev}<div class="text-sm md:text-base font-black text-slate-400">${idx+1}/${count}</div>${next}</div>`;
}

function openBaiHocPageToan2_(pageIndex) {
    activeBaiHocToan2_.pageIndex = Math.max(0, Number(pageIndex) || 0);
    renderBaiHocDetailToan2_();
}

function speakLessonTeacherToan2_() {
    const lesson = activeBaiHocToan2_?.lesson;
    const idx = Number(activeBaiHocToan2_?.pageIndex || 0);
    const page = lesson?.pages?.[idx];
    const text = String(page?.teacher_script || page?.intro || '').trim();
    if (text) speakVietnamese(text, 0.92);
}

function renderLessonPedagogyPanelToan2_(page) {
    const safe = escapeHtml;
    const scene = String(page?.visual_scene || '').trim();
    const steps = Array.isArray(page?.micro_steps) ? page.micro_steps : [];
    if (!scene && !steps.length) return '';
    return `<div class="rounded-3xl border-2 border-fuchsia-200 bg-gradient-to-br from-fuchsia-50 via-white to-sky-50 p-4 md:p-5">
      <div class="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-4 items-stretch">
        <div class="rounded-2xl bg-white border-2 border-pink-100 min-h-[126px] p-4 flex items-center justify-center text-center">
          <div class="whitespace-pre-line text-lg md:text-xl font-black text-slate-700 leading-relaxed">${safe(scene)}</div>
        </div>
        <div class="grid grid-cols-1 gap-2">${steps.slice(0,3).map((x,i)=>`<div class="rounded-2xl border border-violet-100 bg-white px-3.5 py-3 flex gap-3 items-start"><span class="shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white flex items-center justify-center font-black">${i+1}</span><div><div class="text-[11px] uppercase tracking-wide font-black text-violet-500">${['Nhìn','Hiểu','Làm'][i]||'Bước'}</div><div class="text-sm md:text-base font-extrabold text-slate-700 leading-snug">${safe(x)}</div></div></div>`).join('')}</div>
      </div>
    </div>`;
}

function renderBaiHocPageBodyToan2_(page) {
    const safe = escapeHtml;
    const lesson = activeBaiHocToan2_?.lesson || {};
    if (page.page_type === 'explore') {
        const questions = page.discover_questions || [];
        const cards = page.knowledge_cards || [];
        const worked = page.worked_examples || [];
        let visual = '';
        if (page.activity_type === 'number_line' && page.number_line) {
            const n = page.number_line; const nums=[];
            for(let i=Number(n.min||0); i<=Number(n.max||10); i++) nums.push(i);
            visual = `<div class="rounded-3xl border-2 border-sky-200 bg-gradient-to-br from-sky-50 via-white to-indigo-50 p-4 md:p-5">
              <div class="flex items-center gap-2 font-black text-sky-700 mb-3"><span class="text-xl">🐰</span><span>Thỏ Ngọc đi trên tia số</span></div>
              <div class="relative px-2 pt-8 pb-3"><div class="absolute left-3 right-1 top-[52px] h-1 bg-sky-400 rounded-full"></div><div class="absolute right-0 top-[45px] text-sky-500 text-xl">▶</div>
              <div class="relative grid gap-1" style="grid-template-columns:repeat(${nums.length},minmax(0,1fr))">${nums.map(v=>`<button onclick="lessonNumberPick_(${v},${Number(n.focus||5)})" class="h-11 rounded-xl border-2 ${v===Number(n.focus||5)?'bg-pink-500 text-white border-pink-500 scale-110 shadow-md':'bg-white text-sky-700 border-sky-200'} font-black hover:bg-sky-100 transition-all">${v}</button>`).join('')}</div></div>
              <div id="lesson-interactive-feedback" class="mt-3 min-h-[42px] rounded-xl bg-white border border-sky-100 px-3 py-2 text-center text-base md:text-lg font-bold text-slate-600">Bấm vào một số để xem quan hệ với số ${Number(n.focus||5)}.</div></div>`;
        } else if (page.activity_type === 'operation_parts') {
            const add=page.addition||{}, sub=page.subtraction||{};
            const eq=(o,op,theme)=>`<div class="rounded-3xl border-2 border-${theme}-200 bg-${theme}-50/50 p-4"><div class="flex justify-center items-end gap-2 md:gap-4 text-center">${[o.a,op,o.b,'=',o.result].map((v,i)=> i%2===0?`<button onclick="lessonPartPick_('${safe((o.labels||[])[i/2]||'')}')" class="min-w-[62px] rounded-2xl bg-white border-2 border-${theme}-200 px-3 py-3 text-xl md:text-2xl font-black text-slate-800 hover:shadow-md">${v}<span class="block text-[10px] md:text-xs mt-1 text-${theme}-600">${safe((o.labels||[])[i/2]||'')}</span></button>`:`<span class="pb-5 text-xl font-black text-${theme}-500">${v}</span>`).join('')}</div></div>`;
            visual=`<div class="grid grid-cols-1 md:grid-cols-2 gap-3">${eq(add,'+','pink')}${eq(sub,'−','sky')}</div><div id="lesson-interactive-feedback" class="mt-3 rounded-xl bg-purple-50 border border-purple-100 px-3 py-2 text-center text-base md:text-lg font-bold text-purple-700">Bấm vào một số để gọi tên thành phần của phép tính.</div>`;
        }
        return `<div class="space-y-4">
          ${page.intro?`<div class="rounded-2xl border border-pink-200 bg-gradient-to-r from-pink-50 to-purple-50 p-4 text-base md:text-lg font-extrabold text-pink-700">${safe(page.intro)}</div>`:''}
          ${page.teacher_script?`<div class="rounded-2xl border border-purple-200 bg-white p-3 flex items-center justify-between gap-3"><div class="flex items-center gap-2 min-w-0"><span class="text-2xl">🐰</span><div><div class="font-black text-purple-700">Cô Thỏ Ngọc giảng bài</div><div class="text-xs md:text-sm font-semibold text-slate-500">Phần nghe được giảng kỹ hơn phần chữ hiển thị.</div></div></div><button onclick="speakLessonTeacherToan2_()" class="shrink-0 w-10 h-10 md:w-11 md:h-11 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-md font-black" title="Nghe Cô Thỏ Ngọc giảng">🔊</button></div>`:''}
          ${renderLessonPedagogyPanelToan2_(page)}
          ${page.story?`<div class="rounded-2xl border border-amber-200 bg-amber-50/70 p-4"><div class="font-black text-amber-700 mb-1">🌟 Câu chuyện mở đầu</div><div class="text-base md:text-lg font-semibold text-slate-700 leading-relaxed">${safe(page.story)}</div></div>`:''}
          ${visual}
          ${questions.length?`<div class="rounded-2xl border border-violet-200 bg-violet-50/50 p-4"><div class="font-black text-violet-700 mb-2">🤔 Con thử nghĩ xem</div><div class="grid grid-cols-1 md:grid-cols-3 gap-2">${questions.map((q,i)=>`<div class="rounded-xl bg-white border border-violet-100 p-3 text-base md:text-lg font-bold text-slate-700"><span class="text-violet-500">${i+1}.</span> ${safe(q)}</div>`).join('')}</div></div>`:''}
          ${cards.length?`<div><div class="font-black text-emerald-700 mb-2">📚 Kiến thức mới</div><div class="grid grid-cols-1 md:grid-cols-${Math.min(cards.length,3)} gap-2">${cards.map(c=>`<div class="rounded-2xl border-2 border-emerald-200 bg-emerald-50/60 p-4"><div class="font-black text-emerald-700 mb-1">${safe(c.title)}</div><div class="text-base md:text-lg font-semibold text-slate-700">${safe(c.text)}</div></div>`).join('')}</div></div>`:''}
          ${worked.length?`<div class="rounded-2xl border border-orange-200 bg-orange-50/60 p-4"><div class="font-black text-orange-700 mb-2">✏️ Cô làm mẫu</div><div class="space-y-2">${worked.map(x=>`<div class="rounded-xl bg-white border border-orange-100 px-3 py-2 text-base md:text-lg font-bold text-slate-700">${safe(x)}</div>`).join('')}</div></div>`:''}
          ${(page.common_mistake||page.self_check)?`<div class="grid grid-cols-1 md:grid-cols-2 gap-3">${page.common_mistake?`<div class="rounded-2xl border-2 border-rose-200 bg-rose-50/70 p-4"><div class="font-black text-rose-700 mb-1">⚠️ Bé hay nhầm ở đâu?</div><div class="text-sm md:text-base font-bold text-slate-700 leading-relaxed">${safe(page.common_mistake)}</div></div>`:''}${page.self_check?`<div class="rounded-2xl border-2 border-emerald-200 bg-emerald-50/70 p-4"><div class="font-black text-emerald-700 mb-1">✅ Tự kiểm trước khi sang trang</div><div class="text-sm md:text-base font-bold text-slate-700 leading-relaxed">${safe(page.self_check)}</div></div>`:''}</div>`:''}
        </div>`;
    }
    if (page.page_type === 'practice') {
        const items=page.items||[], extra=page.extra_examples||[];
        const strategy=Array.isArray(page.practice_strategy)?page.practice_strategy:[];
        return `<div class="space-y-4"><div class="rounded-2xl bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 p-3 text-center font-black text-purple-700">🎯 Làm từng thử thách rồi bấm “Xem đáp án” để tự kiểm tra</div>${strategy.length?`<div class="grid grid-cols-1 md:grid-cols-3 gap-2">${strategy.slice(0,3).map((x,i)=>`<div class="rounded-xl border border-purple-100 bg-white p-3"><div class="text-[11px] uppercase font-black text-purple-500">Bước ${i+1}</div><div class="text-sm md:text-base font-extrabold text-slate-700">${safe(x)}</div></div>`).join('')}</div>`:''}<div class="grid grid-cols-1 md:grid-cols-2 gap-3">${items.map((it,i)=>`<div class="rounded-2xl border-2 border-purple-200 bg-white p-4"><div class="flex items-center gap-2 mb-2"><span class="w-7 h-7 rounded-full bg-purple-500 text-white flex items-center justify-center font-black">${i+1}</span><span class="font-black text-purple-700">Thử thách ${i+1}</span></div><div class="text-base md:text-lg font-semibold text-slate-700 leading-relaxed min-h-[48px]">${safe(it.prompt||'')}</div>${it.answer?`<button onclick="this.nextElementSibling.classList.toggle('hidden')" class="mt-3 px-3 py-1.5 rounded-xl bg-purple-50 border border-purple-200 text-purple-700 text-sm md:text-base font-black">👀 Xem đáp án</button><div class="hidden mt-2 rounded-xl bg-emerald-50 border border-emerald-200 p-2 text-base md:text-lg font-black text-emerald-700">✓ ${safe(it.answer)}</div>`:''}</div>`).join('')}</div>${page.feedback_on_wrong?`<div class="rounded-2xl border border-amber-200 bg-amber-50/70 p-4"><div class="font-black text-amber-700 mb-1">🧭 Nếu con chưa đúng</div><div class="text-sm md:text-base font-bold text-slate-700">${safe(page.feedback_on_wrong)}</div></div>`:''}${extra.length?`<div class="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-4"><div class="font-black text-emerald-700 mb-2">🌱 Mẹo của Cô Thỏ Ngọc</div><ul class="list-disc pl-5 space-y-1 text-base md:text-lg font-semibold text-slate-700">${extra.map(x=>`<li>${safe(x)}</li>`).join('')}</ul></div>`:''}</div>`;
    }
    if (page.page_type === 'summary') {
        const points=page.key_points||[], connections=page.connections||[];
        return `<div class="space-y-4"><div class="rounded-3xl border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-4 md:p-5"><div class="text-center font-black text-emerald-700 text-lg mb-3">⭐ Ghi nhớ thật nhanh</div><div class="grid grid-cols-1 md:grid-cols-${Math.min(points.length,3)} gap-2">${points.map((x,i)=>`<div class="rounded-2xl bg-white border border-emerald-200 p-3 text-center"><div class="text-2xl mb-1">${['①','②','③'][i]||'✓'}</div><div class="text-base md:text-lg font-bold text-slate-700">${safe(x)}</div></div>`).join('')}</div></div>${connections.length?`<div class="rounded-2xl border border-sky-200 bg-sky-50/60 p-4"><div class="font-black text-sky-700 mb-2">🔗 Nhìn là nhớ</div>${connections.map(x=>`<div class="rounded-xl bg-white border border-sky-100 px-3 py-2 mb-2 last:mb-0 text-base md:text-lg font-bold text-slate-700">${safe(x)}</div>`).join('')}</div>`:''}${Array.isArray(page.quick_check)&&page.quick_check.length?`<div class="rounded-2xl border border-violet-200 bg-violet-50/60 p-4"><div class="font-black text-violet-700 mb-2">🧠 Con tự kiểm nhé</div><div class="grid grid-cols-1 md:grid-cols-2 gap-2">${page.quick_check.map(x=>`<div class="rounded-xl bg-white border border-violet-100 p-3 text-sm md:text-base font-bold text-slate-700">${safe(x)}</div>`).join('')}</div></div>`:''}${page.finish_prompt?`<div class="rounded-2xl border-2 border-pink-200 bg-gradient-to-r from-pink-50 to-purple-50 p-4 text-center"><div class="text-2xl mb-1">🐰</div><div class="font-black text-pink-700">${safe(page.finish_prompt)}</div></div>`:''}</div>`;
    }
    return `<div class="text-sm font-bold text-slate-500">Chưa có nội dung cho trang này.</div>`;
}

function lessonNumberPick_(value, focus) {
    const el=document.getElementById('lesson-interactive-feedback'); if(!el)return;
    const v=Number(value), f=Number(focus);
    el.innerHTML = v===f ? `🐰 Thỏ Ngọc đang đứng ở <b>${f}</b>.` : v===f-1 ? `⬅️ <b>${v}</b> đứng ngay trước ${f}, nên ${v} là <b>số liền trước</b> của ${f}.` : v===f+1 ? `➡️ <b>${v}</b> đứng ngay sau ${f}, nên ${v} là <b>số liền sau</b> của ${f}.` : v<f ? `${v} nằm bên trái ${f}, nên <b>${v} &lt; ${f}</b>.` : `${v} nằm bên phải ${f}, nên <b>${v} &gt; ${f}</b>.`;
}
function lessonPartPick_(label) { const el=document.getElementById('lesson-interactive-feedback'); if(el) el.innerHTML=`✨ Thành phần này được gọi là <b>${escapeHtml(label)}</b>.`; }

function backToBaiHocHubToan2_() {
    const sem = Number(activeBaiHocToan2_.lesson?.semester || 1);
    openBaiHocHub(sem);
}

async function openRoadmap(semesterNumber = 1) {
    setAppShellRootMode_(true);
    stopSpeaking();
    if (!isPremiumUser()) { showPremiumAccessModal('Bài tập'); return; }
    setMainTabActive_('exercises');
    activeExamContext = null; activeRoadmapContext = null; activeTopicId = null; pendingTopicQuiz = null;
    updateNavTabs(null, null, null);
    switchAppView('view-roadmap');
    showLoadingOverlay('Đang mở Bài tập...');
    try {
        const data = await loadBaiHocData();
        renderBaiTapGridToan2_(data, semesterNumber);
    } catch (err) {
        showAppNotice(`Không thể mở Bài tập: ${err.message}`);
    } finally { hideLoadingOverlay(); }
}

function renderBaiTapGridToan2_(data, semesterNumber) {
    const view = document.getElementById('view-roadmap');
    const container = document.getElementById('roadmap-svg-container');
    if (!view || !container) return;
    const h2 = view.querySelector('h2');
    const p0 = view.querySelector('h2 + p');
    if (h2) h2.classList.remove('hidden');
    if (p0) p0.classList.remove('hidden');
    if (h2) h2.innerHTML = '<span>✏️</span><span>Bài tập</span>';
    const p = view.querySelector('h2 + p');
    if (p) p.textContent = '20 câu mỗi bài · đạt từ 80% để mở Bài tập tiếp theo · đánh giá theo 6 năng lực.';
    const historyBtn = view.querySelector('button[onclick*="LichSuTienTrinhTuan"]');
    if (historyBtn) historyBtn.classList.remove('hidden');
    const history = view.querySelector('button[onclick*="LichSuTienTrinhTuan"] span');
    if (history) history.textContent = '📊 Lịch sử Bài tập';

    const arr = (data?.bai_tap || []).filter(x => Number(x.semester) === Number(semesterNumber));
    const unlocked = getUnlockedBaiTapToan2_();
    const tabHost = document.getElementById('roadmap-semester-tabs');
    if (tabHost) tabHost.innerHTML = [1,2].map(s => `<button onclick="openRoadmap(${s})" class="semester-switch-btn ${Number(s)===Number(semesterNumber)?'is-active':'is-inactive'}">Học kỳ ${s}</button>`).join('');

    const palette = [
        {bg:'linear-gradient(145deg,#fff1f7 0%,#fdf4ff 100%)', border:'#f9a8d4', title:'#be185d'},
        {bg:'linear-gradient(145deg,#faf5ff 0%,#f5f3ff 100%)', border:'#d8b4fe', title:'#7e22ce'},
        {bg:'linear-gradient(145deg,#fdf2f8 0%,#fff7ed 100%)', border:'#fbcfe8', title:'#db2777'},
        {bg:'linear-gradient(145deg,#f5f3ff 0%,#fdf2f8 100%)', border:'#c4b5fd', title:'#6d28d9'},
        {bg:'linear-gradient(145deg,#fff7fb 0%,#fce7f3 100%)', border:'#f9a8d4', title:'#c026d3'},
        {bg:'linear-gradient(145deg,#faf5ff 0%,#fff1f7 100%)', border:'#e9d5ff', title:'#9333ea'}
    ];

    container.className = 'w-full rounded-3xl border-2 p-3 md:p-4 shadow-sm';
    container.style.background = 'linear-gradient(135deg,#fff7fb 0%,#faf5ff 50%,#fdf2f8 100%)';
    container.style.borderColor = '#f0abfc';
    container.innerHTML = `<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5 md:gap-3">${arr.map((bt,idx)=>{
        const open = Number(bt.bai) <= unlocked;
        const c = palette[idx % palette.length];
        const bg = open ? c.bg : 'linear-gradient(145deg,#f8fafc 0%,#faf5ff 100%)';
        const border = open ? c.border : '#e2e8f0';
        const title = open ? c.title : '#94a3b8';
        return `<button onclick="${open?`selectBaiTapToan2_(${bt.bai})`:`showLockedBaiTapToan2_(${bt.bai})`}" class="relative text-left min-h-[108px] md:min-h-[116px] rounded-2xl border-2 p-3 md:p-3.5 transition-all ${open?'hover:-translate-y-0.5 hover:shadow-lg':'opacity-65'} flex flex-col items-start justify-start" style="background:${bg};border-color:${border};box-shadow:${open?'0 4px 12px rgba(168,85,247,.08)':'none'}"><span class="absolute top-2.5 right-2.5 text-[12px]">${open?'':'🔒'}</span><div class="font-black text-base md:text-[17px] leading-tight pr-5" style="color:${title}">Bài ${bt.bai}</div><div class="text-[13px] md:text-[14px] font-extrabold ${open?'text-slate-700':'text-slate-400'} mt-2 pr-5 leading-snug text-left w-full">${escapeHtml(bt.title||'')}</div><div class="text-[11px] md:text-[12px] mt-auto pt-2 ${open?'text-emerald-600':'text-slate-400'} font-black">${open?'20 câu':'Cần ≥80% bài trước'}</div></button>`;
    }).join('')}</div>`;
}
function showLockedBaiTapToan2_(bai) {
    showAppNotice(`🔒 Bài tập ${bai} chưa mở. Bé cần đạt từ 80% ở Bài tập trước để mở khóa nhé!`);
}
function getQuestionsForBaiTapToan2_(bt) {
    if (!bt || !allQuestionsFlatCache) return [];
    const lessonId = String(bt.lesson_id || '').trim();
    const subIds = (bt.sub_ids || []).map(String);
    // Kiến trúc mới: câu hỏi tự khai báo lesson_refs. Nhờ vậy một sub_code có thể dùng cho nhiều bài
    // mà không kéo nhầm phép cộng sang phép trừ, hay câu 2 chữ số sang bài 3 chữ số.
    let scoped = lessonId
        ? allQuestionsFlatCache.filter(q => Array.isArray(q.lesson_refs) && q.lesson_refs.includes(lessonId))
        : [];
    // Fallback chỉ để tương thích kho dữ liệu cũ chưa migrate lesson_refs.
    if (!scoped.length) {
        scoped = allQuestionsFlatCache.filter(q => subIds.length && subIds.includes(String(q.sub_id || q.sub_topic || '')));
    }
    if (!scoped.length) return [];
    const candidateTarget = Math.max(20, Number(bt.candidate_pool_target || 30));
    const candidate = shuffleArray(scoped).slice(0, Math.min(candidateTarget, scoped.length));
    const by = {};
    candidate.forEach(q => {
        const m = String(q.skill_tag || q.tag || 'TOAN_C1').match(/C([1-6])/i);
        const k = m ? `C${m[1]}` : 'C1';
        (by[k] ||= []).push(q);
    });
    const out = [], used = new Set();
    let go = true;
    while (out.length < 20 && go) {
        go = false;
        for (const k of ['C1','C2','C3','C4','C5','C6']) {
            const a = by[k] || [];
            while (a.length && used.has(a[0].question_id)) a.shift();
            if (a.length && out.length < 20) {
                const q = a.shift(); used.add(q.question_id); out.push(q); go = true;
            }
        }
    }
    for (const q of candidate) {
        if (out.length >= 20) break;
        if (!used.has(q.question_id)) { used.add(q.question_id); out.push(q); }
    }
    return shuffleArray(out.slice(0,20));
}
async function selectBaiTapToan2_(bai) {
    stopSpeaking();
    showLoadingOverlay(`Đang chuẩn bị Bài tập ${bai}...`);
    try {
        const data = await loadBaiHocData();
        const bt = (data?.bai_tap || []).find(x => Number(x.bai) === Number(bai));
        if (!bt) throw new Error('Không tìm thấy Bài tập');
        if (!isBaiTapUnlockedToan2_(data, bai)) { showLockedBaiTapToan2_(bai); return; }
        await fetchAllTopicsData();
        const qs = getQuestionsForBaiTapToan2_(bt);
        if (qs.length < 20) throw new Error(`Kho câu hỏi phù hợp hiện chỉ có ${qs.length} câu; cần tối thiểu 20 câu.`);
        activeRoadmapContext = { week:Number(bai), bai:Number(bai), topicId:`BT${bai}`, chuDe:`Bài tập ${bai} · ${bt.title||''}` };
        pendingTopicQuiz = null; activeExamContext = null;
        updateNavTabs(`Bài ${bai}`, '✏️', bt.title || '');
        startTopicQuiz(bai, activeRoadmapContext.chuDe, qs, null);
    } catch (err) { showAppNotice(`Không thể mở Bài tập: ${err.message}`); }
    finally { hideLoadingOverlay(); }
}

// Giữ API/sheet cũ để không phải đổi Apps Script ở bước này; trường "Tuan" được dùng như số Bài tập.
async function saveWeeklyProgressToSheet(percent, starCount, scoreVal) {
    const { week, bai, topicId, chuDe } = activeRoadmapContext;
    const baiSo = Number(bai || week);
    const thoiGianLamBai = quizStartTime ? formatDuration(Date.now() - quizStartTime) : '';
    const scoreThang10 = Number(scoreVal ?? 0).toFixed(1);
    const skillCorrect = { C1:0,C2:0,C3:0,C4:0,C5:0,C6:0 };
    const skillTotal = { C1:0,C2:0,C3:0,C4:0,C5:0,C6:0 };
    quizAnsweredLog.forEach(item => {
        const m = String(item.skill_tag || 'TOAN_C1').toUpperCase().match(/C([1-6])/);
        const tag = m ? `C${m[1]}` : 'C1';
        if (skillTotal[tag] === undefined) return;
        skillTotal[tag]++; if (item.isCorrect) skillCorrect[tag]++;
    });
    const payload = {
        student_id: currentUser.maHS, maHS: currentUser.maHS, token: currentUser.token,
        hoTen: currentUser.hoTen, lop: currentUser.lop, sheetName:'LichSuTienTrinhTuan',
        week_completed:baiSo, tuan:baiSo, chuDe, topicId, score:scoreThang10,
        stars_earned:starCount, tongCauHoi:activeQuestionsList.length,
        soCauDung:quizAnsweredLog.filter(x=>x.isCorrect).length, percent, thoiGianLamBai,
        wrongQuestions:quizWrongAnswers
    };
    Object.keys(SKILL_TAXONOMY).forEach(k => {
        payload[SKILL_TAXONOMY[k].sheetCol] = skillCorrect[k];
        payload[SKILL_TAXONOMY[k].totalCol] = skillTotal[k];
    });
    try {
        await callAppsScript('saveWeeklyProgress', payload);
        if (percent >= 80) {
            const data = await loadBaiHocData();
            const nextBai = getNextBaiTapToan2_(data, baiSo);
            if (nextBai && nextBai > getUnlockedBaiTapToan2_()) {
                saveUnlockedBaiTapToan2_(nextBai);
                setTimeout(()=>showAppNotice(`🎉 Chúc mừng bé đạt ${percent}%! Bài tập ${nextBai} đã được mở khóa.`),500);
            }
        }
    } catch (e) {}
}

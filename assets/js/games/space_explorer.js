(() => {
  "use strict";

  const MODULE_ID = "spaceExplorer";
  const STYLE_ID = "class1-space-explorer-style";

  let controller = null;
  let root = null;
  let activeTab = "overview";
  let selectedObjectId = "solar-system";
  let quizIndex = 0;
  let quizScore = 0;
  let quizLocked = false;

  const narrationAudio = new Audio();
  narrationAudio.referrerPolicy = "no-referrer";
  narrationAudio.preload = "none";
  let narrationNonce = 0;
  let currentSpeakKey = "";

  const SOLAR_SYSTEM = {
    id: "solar-system",
    kind: "system",
    label: "Hệ Mặt Trời",
    title: "Ngôi nhà vũ trụ của chúng ta",
    subtitle: "Mặt Trời ở trung tâm",
    badge: "Tổng quan",
    summary: "Hệ Mặt Trời gồm Mặt Trời ở trung tâm và rất nhiều thiên thể chuyển động xung quanh. Có 8 hành tinh chính, cùng nhiều vệ tinh, tiểu hành tinh, sao chổi và bụi khí trong không gian.",
    more: "Bốn hành tinh gần Mặt Trời là Sao Thủy, Sao Kim, Trái Đất và Sao Hỏa. Bốn hành tinh phía xa là Sao Mộc, Sao Thổ, Sao Thiên Vương và Sao Hải Vương. Mặt Trời cung cấp ánh sáng và nhiệt cho toàn bộ Hệ Mặt Trời.",
    facts: [
      { label: "Trung tâm", value: "Mặt Trời" },
      { label: "Hành tinh", value: "8 hành tinh chính" },
      { label: "Nhóm gần", value: "Thủy, Kim, Trái Đất, Hỏa" },
      { label: "Nhóm xa", value: "Mộc, Thổ, Thiên Vương, Hải Vương" },
      { label: "Vệ tinh", value: "Rất nhiều vệ tinh tự nhiên" },
      { label: "Điều thú vị", value: "Trái Đất là hành tinh duy nhất đã biết có sự sống" }
    ],
    rabbitTip: "🐰 Cô Thỏ Hồng: Con có thể chạm vào từng hành tinh để khám phá thêm, hoặc chạm vào Mặt Trời để xem lại thông tin chung của Hệ Mặt Trời.",
    speech: "Hệ Mặt Trời là ngôi nhà vũ trụ của chúng ta. Ở trung tâm là Mặt Trời. Xung quanh Mặt Trời có 8 hành tinh chính, cùng nhiều vệ tinh, tiểu hành tinh và sao chổi. Bốn hành tinh gần Mặt Trời là Sao Thủy, Sao Kim, Trái Đất và Sao Hỏa. Bốn hành tinh phía xa là Sao Mộc, Sao Thổ, Sao Thiên Vương và Sao Hải Vương."
  };

  const PLANETS = [
    {
      id:"mercury", kind:"planet", name:"Sao Thủy", order:1, type:"Hành tinh đá",
      distance:"Gần Mặt Trời nhất", size:"Đường kính khoảng 4.880 km", day:"Tự quay khoảng 59 ngày Trái Đất", year:"88 ngày Trái Đất",
      temp:"Ban ngày có thể khoảng 430°C, ban đêm có thể xuống khoảng -180°C", moons:"Không có vệ tinh tự nhiên",
      atmosphere:"Gần như không có khí quyển; chỉ có một lớp khí cực mỏng gọi là ngoại quyển", surface:"Bề mặt đá xám, rất nhiều hố va chạm, khá giống Mặt Trăng",
      lightTime:"Ánh sáng Mặt Trời tới đây mất khoảng 3,2 phút", special:"Là hành tinh nhỏ nhất và cũng chạy quanh Mặt Trời nhanh nhất",
      fact:"Sao Thủy là hành tinh gần Mặt Trời nhất nhưng không phải hành tinh nóng nhất.",
      more:"Do gần như không có khí quyển để giữ nhiệt, nhiệt độ giữa ngày và đêm chênh lệch rất lớn. Bề mặt có rất nhiều hố do các thiên thạch va chạm trong thời gian dài.",
      remember:"Bé nhớ: gần Mặt Trời nhất, nhỏ nhất, 1 năm chỉ khoảng 88 ngày và không có vệ tinh.",
      className:"mercury",
      speech:"Sao Thủy là hành tinh gần Mặt Trời nhất và cũng là hành tinh nhỏ nhất. Một năm ở đây chỉ khoảng 88 ngày Trái Đất. Sao Thủy không có vệ tinh và có bề mặt đầy hố va chạm."
    },
    {
      id:"venus", kind:"planet", name:"Sao Kim", order:2, type:"Hành tinh đá",
      distance:"Hành tinh thứ 2", size:"Đường kính khoảng 12.104 km, gần bằng Trái Đất", day:"Tự quay rất chậm: khoảng 243 ngày Trái Đất", year:"Khoảng 225 ngày Trái Đất",
      temp:"Khoảng 465°C ở bề mặt, nóng nhất trong các hành tinh", moons:"Không có vệ tinh tự nhiên",
      atmosphere:"Khí quyển rất dày, chủ yếu là carbon dioxide; mây có axit sulfuric", surface:"Bề mặt đá với đồng bằng, núi và nhiều dấu tích núi lửa",
      lightTime:"Ánh sáng Mặt Trời tới đây mất khoảng 6 phút", special:"Quay ngược chiều so với phần lớn hành tinh; một ngày còn dài hơn một năm",
      fact:"Sao Kim là hành tinh nóng nhất Hệ Mặt Trời vì khí quyển dày giữ nhiệt rất mạnh.",
      more:"Sao Kim có kích thước gần giống Trái Đất nên đôi khi được gọi là hành tinh 'chị em' của Trái Đất. Tuy nhiên môi trường ở đó rất nóng và áp suất cực lớn.",
      remember:"Bé nhớ: hành tinh thứ 2, nóng nhất, không có vệ tinh và quay rất chậm theo chiều ngược đặc biệt.",
      className:"venus",
      speech:"Sao Kim là hành tinh thứ hai tính từ Mặt Trời. Đây là hành tinh nóng nhất vì lớp khí quyển dày giữ nhiệt. Sao Kim quay rất chậm, quay ngược chiều và không có vệ tinh tự nhiên."
    },
    {
      id:"earth", kind:"planet", name:"Trái Đất", order:3, type:"Hành tinh đá",
      distance:"Hành tinh thứ 3", size:"Đường kính khoảng 12.742 km", day:"Khoảng 23,9 giờ", year:"Khoảng 365,25 ngày",
      temp:"Nhiệt độ cho phép nước tồn tại ở dạng lỏng trên bề mặt", moons:"1 vệ tinh tự nhiên: Mặt Trăng",
      atmosphere:"Chủ yếu là nitơ và ôxy, giúp bảo vệ và duy trì sự sống", surface:"Có lục địa, núi, đồng bằng và đại dương; phần lớn bề mặt được nước bao phủ",
      lightTime:"Ánh sáng Mặt Trời tới Trái Đất mất khoảng 8 phút 20 giây", special:"Là nơi duy nhất hiện nay chúng ta biết chắc có sự sống",
      fact:"Trái Đất là ngôi nhà của chúng ta, có nước lỏng, không khí và môi trường phù hợp cho rất nhiều loài sinh vật.",
      more:"Trái Đất có từ trường và khí quyển giúp bảo vệ sự sống khỏi nhiều tác động nguy hiểm từ không gian. Trục Trái Đất nghiêng nên chúng ta có các mùa.",
      remember:"Bé nhớ: hành tinh thứ 3, có 1 Mặt Trăng, có nước lỏng và là ngôi nhà của sự sống.",
      className:"earth",
      speech:"Trái Đất là hành tinh thứ ba tính từ Mặt Trời và là ngôi nhà của chúng ta. Trái Đất có nước lỏng, không khí và một vệ tinh là Mặt Trăng. Đây là nơi duy nhất chúng ta biết chắc có sự sống."
    },
    {
      id:"mars", kind:"planet", name:"Sao Hỏa", order:4, type:"Hành tinh đá",
      distance:"Hành tinh thứ 4", size:"Đường kính khoảng 6.780 km, chỉ hơn một nửa Trái Đất", day:"Khoảng 24,6 giờ, gần giống một ngày Trái Đất", year:"Khoảng 687 ngày Trái Đất",
      temp:"Thường lạnh và khô; nhiệt độ có thể xuống rất thấp", moons:"2 vệ tinh: Phobos và Deimos",
      atmosphere:"Khí quyển rất mỏng, chủ yếu là carbon dioxide", surface:"Sa mạc đá bụi, núi lửa, hẻm vực, chỏm băng ở hai cực",
      lightTime:"Ánh sáng Mặt Trời tới đây mất khoảng 13 phút", special:"Có Olympus Mons, núi lửa lớn nhất được biết đến trong Hệ Mặt Trời",
      fact:"Sao Hỏa có màu đỏ vì sắt trong đất đá bị ôxy hóa, giống như hiện tượng gỉ sắt.",
      more:"Nhiều tàu thăm dò và robot đã khám phá Sao Hỏa. Các dấu vết địa chất cho thấy rất lâu trước đây, Sao Hỏa từng có nhiều nước hơn hiện nay.",
      remember:"Bé nhớ: Hành tinh Đỏ, có 2 vệ tinh, một ngày gần dài bằng Trái Đất và có những robot thăm dò.",
      className:"mars",
      speech:"Sao Hỏa là hành tinh thứ tư và thường được gọi là Hành tinh Đỏ. Một ngày ở Sao Hỏa gần bằng một ngày Trái Đất. Sao Hỏa có hai vệ tinh là Phobos và Deimos."
    },
    {
      id:"jupiter", kind:"planet", name:"Sao Mộc", order:5, type:"Hành tinh khí khổng lồ",
      distance:"Hành tinh thứ 5", size:"Đường kính khoảng 140.000 km, rộng khoảng 11 lần Trái Đất", day:"Khoảng 9,9 giờ, ngắn nhất trong các hành tinh", year:"Khoảng 12 năm Trái Đất",
      temp:"Rất lạnh ở tầng mây trên cao", moons:"Có rất nhiều vệ tinh; nổi bật: Io, Europa, Ganymede, Callisto",
      atmosphere:"Chủ yếu là hydro và heli với các dải mây chuyển động rất mạnh", surface:"Không có bề mặt rắn thật sự; càng xuống sâu khí càng bị nén thành chất lỏng",
      lightTime:"Ánh sáng Mặt Trời tới đây mất khoảng 43 phút", special:"Có Vết Đỏ Lớn, một cơn bão khổng lồ đã tồn tại rất lâu",
      fact:"Sao Mộc là hành tinh lớn nhất Hệ Mặt Trời.",
      more:"Sao Mộc quay rất nhanh nên một ngày chỉ khoảng 10 giờ. Bốn vệ tinh lớn Io, Europa, Ganymede và Callisto được Galileo quan sát từ đầu thế kỷ 17.",
      remember:"Bé nhớ: lớn nhất, ngày ngắn nhất, có Vết Đỏ Lớn và nhiều vệ tinh thú vị.",
      className:"jupiter",
      speech:"Sao Mộc là hành tinh lớn nhất Hệ Mặt Trời. Nó quay rất nhanh nên một ngày chỉ khoảng 10 giờ. Sao Mộc có Vết Đỏ Lớn và nhiều vệ tinh như Io, Europa, Ganymede và Callisto."
    },
    {
      id:"saturn", kind:"planet", name:"Sao Thổ", order:6, type:"Hành tinh khí khổng lồ",
      distance:"Hành tinh thứ 6", size:"Đường kính khoảng 120.500 km, rộng khoảng 9 lần Trái Đất", day:"Khoảng 10,7 giờ", year:"Khoảng 29,4 năm Trái Đất",
      temp:"Rất lạnh ở tầng mây", moons:"Có rất nhiều vệ tinh; nổi bật: Titan và Enceladus",
      atmosphere:"Chủ yếu là hydro và heli", surface:"Không có bề mặt rắn thật sự; bên dưới lớp mây là các lớp khí và chất lỏng bị nén",
      lightTime:"Ánh sáng Mặt Trời tới đây mất khoảng 80 phút", special:"Hệ vành đai lớn gồm vô số mảnh băng, đá và bụi",
      fact:"Sao Thổ nổi tiếng nhất vì những vành đai rộng, sáng và rất đẹp.",
      more:"Không chỉ Sao Thổ mới có vành đai, nhưng vành đai của Sao Thổ rõ và ngoạn mục nhất. Ở cực bắc còn có một dòng khí hình lục giác rất đặc biệt.",
      remember:"Bé nhớ: hành tinh thứ 6, có vành đai nổi bật, ngày khoảng 10,7 giờ và một năm gần 30 năm Trái Đất.",
      className:"saturn",
      speech:"Sao Thổ là hành tinh thứ sáu và nổi tiếng với hệ vành đai tuyệt đẹp gồm băng, đá và bụi. Một ngày ở Sao Thổ chỉ khoảng 10,7 giờ, còn một năm dài gần 30 năm Trái Đất."
    },
    {
      id:"uranus", kind:"planet", name:"Sao Thiên Vương", order:7, type:"Hành tinh băng khổng lồ",
      distance:"Hành tinh thứ 7", size:"Đường kính khoảng 51.100 km, rộng khoảng 4 lần Trái Đất", day:"Khoảng 17 giờ", year:"Khoảng 84 năm Trái Đất",
      temp:"Rất lạnh; có những vùng còn lạnh hơn Sao Hải Vương", moons:"Có nhiều vệ tinh; nổi bật: Titania, Oberon và Miranda",
      atmosphere:"Chủ yếu là hydro, heli và một ít methane", surface:"Không có bề mặt rắn thật sự; bên dưới là các lớp vật chất giàu nước, methane và ammonia",
      lightTime:"Ánh sáng Mặt Trời tới đây mất khoảng 2 giờ 40 phút", special:"Trục quay nghiêng gần 98°, nên trông giống như hành tinh đang lăn quanh Mặt Trời",
      fact:"Methane trong khí quyển góp phần làm Sao Thiên Vương có màu xanh lục nhạt.",
      more:"Sao Thiên Vương có các vành đai mờ và quay rất nghiêng. Đây là hành tinh đầu tiên được phát hiện nhờ kính thiên văn.",
      remember:"Bé nhớ: hành tinh thứ 7, màu xanh lục nhạt, quay nghiêng gần như nằm ngang và một năm dài 84 năm Trái Đất.",
      className:"uranus",
      speech:"Sao Thiên Vương là hành tinh thứ bảy. Nó có màu xanh lục nhạt và quay nghiêng gần như nằm ngang. Một ngày dài khoảng 17 giờ, còn một năm dài khoảng 84 năm Trái Đất."
    },
    {
      id:"neptune", kind:"planet", name:"Sao Hải Vương", order:8, type:"Hành tinh băng khổng lồ",
      distance:"Xa Mặt Trời nhất trong 8 hành tinh", size:"Đường kính khoảng 49.500 km, rộng gần 4 lần Trái Đất", day:"Khoảng 16 giờ", year:"Khoảng 165 năm Trái Đất",
      temp:"Rất lạnh", moons:"Có nhiều vệ tinh; nổi bật nhất là Triton",
      atmosphere:"Chủ yếu là hydro, heli và methane", surface:"Không có bề mặt rắn thật sự; lớp khí dần chuyển sang các lớp vật chất bị nén ở sâu bên trong",
      lightTime:"Ánh sáng Mặt Trời tới đây mất khoảng 4 giờ", special:"Có những luồng gió cực mạnh, thuộc loại nhanh nhất trong Hệ Mặt Trời",
      fact:"Sao Hải Vương là hành tinh thứ 8 và xa Mặt Trời nhất trong tám hành tinh chính.",
      more:"Sao Hải Vương quá xa để nhìn thấy bằng mắt thường. Đây là hành tinh đầu tiên được tìm ra nhờ các dự đoán toán học trước khi quan sát thấy bằng kính thiên văn.",
      remember:"Bé nhớ: xa Mặt Trời nhất, màu xanh, gió rất mạnh, một ngày khoảng 16 giờ và một năm dài khoảng 165 năm Trái Đất.",
      className:"neptune",
      speech:"Sao Hải Vương là hành tinh thứ tám và xa Mặt Trời nhất. Hành tinh này có màu xanh, những cơn gió rất mạnh, một ngày khoảng 16 giờ và một năm dài khoảng 165 năm Trái Đất."
    }
  ];

  const MOONS = [
    { id:"moon", kind:"moon", name:"Mặt Trăng", parent:"Trái Đất", fact:"Mặt Trăng là vệ tinh tự nhiên của Trái Đất và phản chiếu ánh sáng Mặt Trời.", more:"Mặt Trăng giúp tạo nên hiện tượng thủy triều và là thiên thể con người đã đặt chân tới.", className:"moon", speech:"Đây là Mặt Trăng, vệ tinh tự nhiên của Trái Đất. Mặt Trăng phản chiếu ánh sáng Mặt Trời nên chúng ta có thể nhìn thấy nó sáng trên bầu trời." },
    { id:"phobos", kind:"moon", name:"Phobos", parent:"Sao Hỏa", fact:"Phobos là vệ tinh lớn hơn trong hai vệ tinh nhỏ của Sao Hỏa.", more:"Phobos có hình dạng không tròn đều và quay khá gần Sao Hỏa.", className:"rock-moon", speech:"Đây là Phobos, một vệ tinh của Sao Hỏa." },
    { id:"deimos", kind:"moon", name:"Deimos", parent:"Sao Hỏa", fact:"Deimos là vệ tinh nhỏ, có hình dạng không tròn đều.", more:"Deimos nhỏ hơn Phobos và cũng quay quanh Sao Hỏa.", className:"rock-moon", speech:"Đây là Deimos, vệ tinh nhỏ của Sao Hỏa." },
    { id:"io", kind:"moon", name:"Io", parent:"Sao Mộc", fact:"Io là một thế giới có hoạt động núi lửa rất mạnh.", more:"Io là một trong những vệ tinh nổi bật nhất của Sao Mộc.", className:"io", speech:"Đây là Io, vệ tinh của Sao Mộc. Io nổi tiếng với hoạt động núi lửa rất mạnh." },
    { id:"europa", kind:"moon", name:"Europa", parent:"Sao Mộc", fact:"Europa có bề mặt phủ băng và bên dưới có thể có đại dương nước lỏng.", more:"Europa là một trong những nơi các nhà khoa học rất muốn nghiên cứu để tìm hiểu khả năng có sự sống.", className:"europa", speech:"Đây là Europa, vệ tinh của Sao Mộc. Europa có bề mặt phủ băng và có thể có đại dương bên dưới." },
    { id:"ganymede", kind:"moon", name:"Ganymede", parent:"Sao Mộc", fact:"Ganymede là vệ tinh lớn nhất trong Hệ Mặt Trời.", more:"Ganymede còn lớn hơn cả hành tinh Sao Thủy.", className:"ganymede", speech:"Đây là Ganymede, vệ tinh của Sao Mộc và là vệ tinh lớn nhất trong Hệ Mặt Trời." },
    { id:"callisto", kind:"moon", name:"Callisto", parent:"Sao Mộc", fact:"Callisto có bề mặt với rất nhiều hố va chạm cổ xưa.", more:"Callisto là một trong những vệ tinh lớn của Sao Mộc.", className:"callisto", speech:"Đây là Callisto, vệ tinh của Sao Mộc." },
    { id:"titan", kind:"moon", name:"Titan", parent:"Sao Thổ", fact:"Titan có khí quyển dày và những hồ chứa hydrocarbon lỏng.", more:"Titan là vệ tinh lớn nhất của Sao Thổ và là một thế giới rất đặc biệt.", className:"titan", speech:"Đây là Titan, vệ tinh lớn nhất của Sao Thổ. Titan có khí quyển dày." },
    { id:"enceladus", kind:"moon", name:"Enceladus", parent:"Sao Thổ", fact:"Enceladus có lớp băng sáng và các tia vật chất phun ra từ vùng cực nam.", more:"Vệ tinh này khiến các nhà khoa học rất chú ý vì có thể có nước lỏng bên dưới lớp băng.", className:"enceladus", speech:"Đây là Enceladus, vệ tinh của Sao Thổ với lớp băng sáng đẹp." },
    { id:"miranda", kind:"moon", name:"Miranda", parent:"Sao Thiên Vương", fact:"Miranda có bề mặt rất gồ ghề với nhiều vách và hẻm lớn.", more:"Miranda là một trong những vệ tinh thú vị của Sao Thiên Vương.", className:"miranda", speech:"Đây là Miranda, vệ tinh của Sao Thiên Vương." },
    { id:"titania", kind:"moon", name:"Titania", parent:"Sao Thiên Vương", fact:"Titania là vệ tinh lớn nhất của Sao Thiên Vương.", more:"Titania có kích thước lớn hơn nhiều vệ tinh khác của hành tinh này.", className:"titania", speech:"Đây là Titania, vệ tinh lớn nhất của Sao Thiên Vương." },
    { id:"oberon", kind:"moon", name:"Oberon", parent:"Sao Thiên Vương", fact:"Oberon là một vệ tinh lớn có bề mặt nhiều hố va chạm.", more:"Oberon là một trong những vệ tinh xa hơn của Sao Thiên Vương.", className:"oberon", speech:"Đây là Oberon, vệ tinh của Sao Thiên Vương." },
    { id:"triton", kind:"moon", name:"Triton", parent:"Sao Hải Vương", fact:"Triton quay quanh Sao Hải Vương theo hướng ngược với nhiều vệ tinh lớn khác.", more:"Triton là vệ tinh nổi bật nhất của Sao Hải Vương.", className:"triton", speech:"Đây là Triton, vệ tinh của Sao Hải Vương." }
  ];

  const QUIZ = [
    { q:"Hệ Mặt Trời có bao nhiêu hành tinh chính?", a:["6","7","8","9"], c:2, note:"Hệ Mặt Trời có 8 hành tinh chính." },
    { q:"Thiên thể nào nằm ở trung tâm Hệ Mặt Trời?", a:["Trái Đất","Mặt Trời","Sao Mộc","Mặt Trăng"], c:1, note:"Mặt Trời là ngôi sao ở trung tâm Hệ Mặt Trời." },
    { q:"Bốn hành tinh đá gần Mặt Trời là nhóm nào?", a:["Thủy, Kim, Trái Đất, Hỏa","Mộc, Thổ, Thiên Vương, Hải Vương","Kim, Hỏa, Mộc, Thổ","Trái Đất, Mộc, Thổ, Hải Vương"], c:0, note:"Bốn hành tinh đá phía trong là Sao Thủy, Sao Kim, Trái Đất và Sao Hỏa." },
    { q:"Hai hành tinh khí khổng lồ là gì?", a:["Sao Thủy và Sao Kim","Sao Mộc và Sao Thổ","Sao Thiên Vương và Sao Hải Vương","Trái Đất và Sao Hỏa"], c:1, note:"Sao Mộc và Sao Thổ là hai hành tinh khí khổng lồ." },
    { q:"Hai hành tinh băng khổng lồ là gì?", a:["Sao Mộc và Sao Thổ","Sao Thủy và Sao Kim","Sao Thiên Vương và Sao Hải Vương","Trái Đất và Sao Hỏa"], c:2, note:"Sao Thiên Vương và Sao Hải Vương là hai hành tinh băng khổng lồ." },
    { q:"Hành tinh nào xa Mặt Trời nhất trong 8 hành tinh?", a:["Sao Thổ","Sao Hải Vương","Sao Hỏa","Sao Kim"], c:1, note:"Sao Hải Vương là hành tinh thứ 8 và xa Mặt Trời nhất." },
    { q:"Hành tinh nào là nơi duy nhất chúng ta biết chắc có sự sống?", a:["Sao Hỏa","Sao Kim","Trái Đất","Sao Mộc"], c:2, note:"Hiện nay, Trái Đất là nơi duy nhất chúng ta biết chắc có sự sống." },
    { q:"Hành tinh nào là lớn nhất Hệ Mặt Trời?", a:["Sao Mộc","Sao Thổ","Trái Đất","Sao Hải Vương"], c:0, note:"Sao Mộc là hành tinh lớn nhất." },

    { q:"Hành tinh nào gần Mặt Trời nhất?", a:["Sao Thủy","Sao Kim","Trái Đất","Sao Hỏa"], c:0, note:"Sao Thủy đứng thứ nhất tính từ Mặt Trời." },
    { q:"Một năm trên Sao Thủy dài khoảng bao lâu?", a:["24 giờ","88 ngày Trái Đất","225 ngày Trái Đất","12 năm Trái Đất"], c:1, note:"Sao Thủy quay quanh Mặt Trời trong khoảng 88 ngày Trái Đất." },
    { q:"Sao Thủy có bao nhiêu vệ tinh tự nhiên?", a:["Không có","1","2","Rất nhiều"], c:0, note:"Sao Thủy không có vệ tinh tự nhiên." },

    { q:"Hành tinh nào nóng nhất Hệ Mặt Trời?", a:["Sao Thủy","Sao Kim","Sao Hỏa","Sao Mộc"], c:1, note:"Sao Kim nóng nhất do khí quyển rất dày giữ nhiệt." },
    { q:"Điều gì đặc biệt về một ngày trên Sao Kim?", a:["Chỉ dài 10 giờ","Dài hơn một năm Sao Kim","Bằng đúng 24 giờ","Chỉ dài 88 ngày"], c:1, note:"Sao Kim tự quay rất chậm: một vòng tự quay khoảng 243 ngày, dài hơn một năm khoảng 225 ngày." },
    { q:"Sao Kim có vệ tinh tự nhiên không?", a:["Có 1","Có 2","Không có","Có rất nhiều"], c:2, note:"Sao Kim không có vệ tinh tự nhiên." },

    { q:"Trái Đất đứng thứ mấy tính từ Mặt Trời?", a:["Thứ 1","Thứ 2","Thứ 3","Thứ 4"], c:2, note:"Trái Đất là hành tinh thứ 3 tính từ Mặt Trời." },
    { q:"Vệ tinh tự nhiên của Trái Đất là gì?", a:["Titan","Mặt Trăng","Europa","Triton"], c:1, note:"Mặt Trăng là vệ tinh tự nhiên của Trái Đất." },
    { q:"Ánh sáng Mặt Trời tới Trái Đất mất khoảng bao lâu?", a:["8 phút 20 giây","3 giờ","1 ngày","43 phút"], c:0, note:"Ánh sáng từ Mặt Trời tới Trái Đất mất khoảng 8 phút 20 giây." },

    { q:"Vì sao Sao Hỏa trông có màu đỏ?", a:["Vì có lửa","Vì bụi và đá chứa sắt bị ôxy hóa","Vì phản chiếu màu Sao Mộc","Vì có đại dương đỏ"], c:1, note:"Sắt trong đất đá Sao Hỏa bị ôxy hóa, giống gỉ sắt, khiến hành tinh có màu đỏ." },
    { q:"Hai vệ tinh của Sao Hỏa là gì?", a:["Io và Europa","Phobos và Deimos","Titan và Enceladus","Mặt Trăng và Triton"], c:1, note:"Phobos và Deimos là hai vệ tinh của Sao Hỏa." },
    { q:"Một ngày trên Sao Hỏa gần bằng bao lâu?", a:["Khoảng 24,6 giờ","Khoảng 59 ngày","Khoảng 10 giờ","Khoảng 17 giờ"], c:0, note:"Một ngày trên Sao Hỏa dài khoảng 24,6 giờ, khá giống Trái Đất." },

    { q:"Một ngày trên Sao Mộc dài khoảng bao lâu?", a:["Khoảng 10 giờ","Khoảng 24 giờ","Khoảng 59 ngày","Khoảng 17 giờ"], c:0, note:"Sao Mộc có ngày ngắn nhất, chỉ khoảng 9,9 giờ." },
    { q:"Vết Đỏ Lớn của Sao Mộc là gì?", a:["Một lục địa","Một đại dương","Một cơn bão khổng lồ","Một vành đai"], c:2, note:"Vết Đỏ Lớn là một cơn bão khổng lồ trên Sao Mộc." },
    { q:"Nhóm nào gồm các vệ tinh nổi bật của Sao Mộc?", a:["Io, Europa, Ganymede, Callisto","Phobos, Deimos, Titan, Triton","Mặt Trăng, Titania, Oberon, Triton","Titan, Enceladus, Miranda, Phobos"], c:0, note:"Io, Europa, Ganymede và Callisto là bốn vệ tinh lớn nổi tiếng của Sao Mộc." },

    { q:"Sao Thổ nổi tiếng nhất với đặc điểm gì?", a:["Màu đỏ","Hệ vành đai rộng và đẹp","Không có vệ tinh","Nóng nhất"], c:1, note:"Sao Thổ nổi tiếng với hệ vành đai gồm băng, đá và bụi." },
    { q:"Một năm trên Sao Thổ dài khoảng bao lâu?", a:["88 ngày","1 năm Trái Đất","12 năm Trái Đất","29,4 năm Trái Đất"], c:3, note:"Sao Thổ mất khoảng 29,4 năm Trái Đất để đi hết một vòng quanh Mặt Trời." },
    { q:"Hai vệ tinh nổi bật của Sao Thổ trong bài là gì?", a:["Titan và Enceladus","Phobos và Deimos","Io và Callisto","Mặt Trăng và Triton"], c:0, note:"Titan và Enceladus là hai vệ tinh rất thú vị của Sao Thổ." },

    { q:"Điều gì đặc biệt về cách Sao Thiên Vương quay?", a:["Quay gần như nằm ngang","Không tự quay","Quay quanh Trái Đất","Quay nhanh nhất"], c:0, note:"Sao Thiên Vương có trục nghiêng gần 98 độ nên trông như đang lăn quanh Mặt Trời." },
    { q:"Sao Thiên Vương có màu xanh lục nhạt một phần nhờ khí nào?", a:["Ôxy","Methane","Nitơ","Carbon monoxide"], c:1, note:"Methane trong khí quyển góp phần tạo màu xanh lục nhạt của Sao Thiên Vương." },
    { q:"Một năm trên Sao Thiên Vương dài khoảng bao lâu?", a:["12 năm Trái Đất","29 năm Trái Đất","84 năm Trái Đất","165 năm Trái Đất"], c:2, note:"Một năm trên Sao Thiên Vương dài khoảng 84 năm Trái Đất." },

    { q:"Một ngày trên Sao Hải Vương dài khoảng bao lâu?", a:["Khoảng 16 giờ","Khoảng 24,6 giờ","Khoảng 59 ngày","Khoảng 243 ngày"], c:0, note:"Sao Hải Vương tự quay một vòng trong khoảng 16 giờ." },
    { q:"Một năm trên Sao Hải Vương dài khoảng bao lâu?", a:["1 năm Trái Đất","12 năm Trái Đất","84 năm Trái Đất","165 năm Trái Đất"], c:3, note:"Sao Hải Vương mất khoảng 165 năm Trái Đất để quay một vòng quanh Mặt Trời." },
    { q:"Sao Hải Vương nổi bật với hiện tượng nào?", a:["Gió cực mạnh","Nóng nhất Hệ Mặt Trời","Không có khí quyển","Ngày dài 243 ngày"], c:0, note:"Sao Hải Vương có những luồng gió cực mạnh." },

    { q:"Vì sao ta nhìn thấy Mặt Trăng sáng?", a:["Mặt Trăng tự phát sáng như Mặt Trời","Mặt Trăng phản chiếu ánh sáng Mặt Trời","Do đèn từ Trái Đất","Do Sao Hỏa chiếu sáng"], c:1, note:"Mặt Trăng phản chiếu ánh sáng Mặt Trời." },
    { q:"Phobos và Deimos quay quanh hành tinh nào?", a:["Trái Đất","Sao Hỏa","Sao Mộc","Sao Thổ"], c:1, note:"Phobos và Deimos quay quanh Sao Hỏa." },
    { q:"Vệ tinh nào có hoạt động núi lửa rất mạnh?", a:["Io","Mặt Trăng","Triton","Titania"], c:0, note:"Io, vệ tinh của Sao Mộc, nổi tiếng với hoạt động núi lửa mạnh." },
    { q:"Europa có điều gì khiến các nhà khoa học rất quan tâm?", a:["Có rừng cây","Có thể có đại dương dưới lớp băng","Có vành đai lớn","Là hành tinh nóng nhất"], c:1, note:"Europa có bề mặt băng và có thể có đại dương nước lỏng bên dưới." },
    { q:"Vệ tinh lớn nhất trong Hệ Mặt Trời là gì?", a:["Mặt Trăng","Ganymede","Phobos","Enceladus"], c:1, note:"Ganymede, vệ tinh của Sao Mộc, là vệ tinh lớn nhất Hệ Mặt Trời." },
    { q:"Titan quay quanh hành tinh nào?", a:["Sao Mộc","Sao Thổ","Sao Thiên Vương","Sao Hải Vương"], c:1, note:"Titan là vệ tinh lớn nhất của Sao Thổ." },
    { q:"Enceladus nổi bật với đặc điểm nào?", a:["Lớp băng sáng và các tia vật chất phun ra","Bề mặt toàn dung nham","Không có băng","Là hành tinh thứ 8"], c:0, note:"Enceladus có lớp băng sáng và các tia vật chất phun ra từ vùng cực nam." },
    { q:"Triton là vệ tinh nổi bật của hành tinh nào?", a:["Sao Hải Vương","Sao Hỏa","Sao Kim","Trái Đất"], c:0, note:"Triton là vệ tinh nổi bật nhất của Sao Hải Vương." }
  ];

  function injectStyle() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      #space-explorer{
        --sp-pink:#EC4899;--sp-purple:#8B5CF6;--sp-blue:#3B82F6;--sp-green:#10B981;
        --sp-ink:#344054;--sp-muted:#667085;--sp-line:#E9D5FF;
        width:100%;height:min(740px,calc(100vh - 135px));min-height:630px;
        border:1px solid #E9D5FF;border-radius:24px;overflow:hidden;
        background:
          radial-gradient(circle at 18% 14%,rgba(244,114,182,.15),transparent 28%),
          radial-gradient(circle at 82% 18%,rgba(56,189,248,.15),transparent 25%),
          linear-gradient(180deg,#FFFBFE 0%,#FAF7FF 45%,#F5FBFF 100%);
        box-shadow:0 10px 30px rgba(76,29,149,.09);
        display:grid;grid-template-rows:auto auto minmax(0,1fr);color:var(--sp-ink);
      }
      #space-explorer *{box-sizing:border-box}
      .sp-head{display:flex;align-items:center;justify-content:flex-start;gap:12px;padding:14px 18px 10px}
      .sp-title-wrap{display:flex;align-items:center;gap:12px;min-width:0}
      .sp-logo{width:52px;height:52px;border-radius:16px;background:linear-gradient(135deg,#FCE7F3,#EDE9FE);display:flex;align-items:center;justify-content:center;font-size:30px;box-shadow:0 5px 14px rgba(139,92,246,.14);border:1px solid #F9A8D4}
      .sp-title{margin:0;color:#5B216E;font-size:28px;line-height:1.05;font-weight:950}
      .sp-sub{margin:3px 0 0;color:#667085;font-size:15px;font-weight:800}
      .sp-tabs{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px;padding:0 18px 12px}
      .sp-tab{min-height:46px;border:1px solid;border-radius:15px;font-weight:950;font-size:15px;box-shadow:0 3px 8px rgba(76,29,149,.06);transition:.16s ease}
      .sp-tab[data-tab="overview"]{background:#FFF1F7;border-color:#F9A8D4;color:#BE185D}
      .sp-tab[data-tab="planets"]{background:#F5F3FF;border-color:#C4B5FD;color:#6D28D9}
      .sp-tab[data-tab="moons"]{background:#EFF8FF;border-color:#7DD3FC;color:#0369A1}
      .sp-tab[data-tab="quiz"]{background:#ECFDF5;border-color:#86EFAC;color:#047857}
      .sp-tab.is-active{color:#fff!important;border-color:transparent!important;transform:translateY(-1px)}
      .sp-tab[data-tab="overview"].is-active,.sp-tab[data-tab="planets"].is-active{background:linear-gradient(90deg,#EC4899,#8B5CF6)}
      .sp-tab[data-tab="moons"].is-active,.sp-tab[data-tab="quiz"].is-active{background:linear-gradient(90deg,#3B82F6,#10B981)}
      .sp-stage{min-height:0;padding:0 18px 16px}
      .sp-panel{display:none;height:100%;min-height:0}
      .sp-panel.is-active{display:block}
      .sp-card{height:100%;border:1px solid rgba(196,181,253,.78);border-radius:20px;background:rgba(255,255,255,.92);box-shadow:0 7px 18px rgba(76,29,149,.06);overflow:hidden}
      .sp-overview-grid{height:100%;display:grid;grid-template-columns:minmax(0,1.5fr) minmax(320px,.82fr);gap:12px}
      .sp-space-map{position:relative;min-height:0;overflow:hidden;background:
        radial-gradient(circle at 24% 22%,rgba(255,255,255,.95) 0 1px,transparent 2px),
        radial-gradient(circle at 72% 34%,rgba(255,255,255,.8) 0 1px,transparent 2px),
        radial-gradient(circle at 52% 72%,rgba(255,255,255,.75) 0 1px,transparent 2px),
        linear-gradient(145deg,#17113A,#1D2F65 55%,#104A5D);
      }
      .sp-space-map::after{content:"";position:absolute;inset:0;background-image:radial-gradient(circle,#fff 0 1px,transparent 1.4px);background-size:42px 42px;opacity:.18;pointer-events:none}
      .sp-orbit-row{position:absolute;left:4%;right:2.5%;top:50%;transform:translateY(-50%);display:flex;align-items:flex-end;justify-content:space-between;z-index:2}
      .sp-sun-button,.sp-planet-button{border:0;background:transparent;padding:3px;display:flex;flex-direction:column;align-items:center;gap:6px;color:#fff;z-index:2}
      .sp-sun-button{cursor:pointer}
      .sp-sun-button:hover .sp-sun,.sp-sun-button:focus-visible .sp-sun,.sp-planet-button:hover .sp-planet,.sp-planet-button:focus-visible .sp-planet{transform:scale(1.08);filter:brightness(1.08)}
      .sp-sun-wrap{display:flex;flex-direction:column;align-items:center;gap:6px;margin-right:4px}
      .sp-sun{width:82px;height:82px;border-radius:50%;background:radial-gradient(circle at 34% 30%,#FFF7AE,#FBBF24 36%,#F97316 70%,#EA580C);box-shadow:0 0 30px rgba(251,191,36,.78),0 0 70px rgba(249,115,22,.28);animation:spPulse 3s ease-in-out infinite;transition:.16s ease}
      .sp-planet-button{position:relative;font-size:10px;font-weight:950}
      .sp-planet{display:block;width:var(--size);height:var(--size);border-radius:50%;box-shadow:inset -8px -8px 12px rgba(0,0,0,.18),0 2px 8px rgba(0,0,0,.25);transition:.16s ease}
      .sp-planet.mercury{background:linear-gradient(135deg,#D1D5DB,#6B7280)}
      .sp-planet.venus{background:linear-gradient(135deg,#FDE68A,#D97706)}
      .sp-planet.earth{background:radial-gradient(circle at 34% 32%,#86EFAC 0 14%,transparent 15%),radial-gradient(circle at 62% 55%,#22C55E 0 14%,transparent 15%),linear-gradient(135deg,#7DD3FC,#2563EB)}
      .sp-planet.mars{background:linear-gradient(135deg,#FDBA74,#C2410C)}
      .sp-planet.jupiter{background:repeating-linear-gradient(0deg,#D6A46A 0 6px,#F3D4A5 6px 11px,#A96B45 11px 15px)}
      .sp-planet.saturn{background:linear-gradient(135deg,#FDE68A,#C79A4A)}
      .sp-planet.uranus{background:linear-gradient(135deg,#CFFAFE,#22D3EE)}
      .sp-planet.neptune{background:linear-gradient(135deg,#60A5FA,#1D4ED8)}
      .sp-ring{position:absolute;width:calc(var(--size) * 1.9);height:calc(var(--size) * .55);border:2px solid rgba(254,240,138,.84);border-radius:50%;top:calc(var(--size) * .31);left:50%;transform:translateX(-50%) rotate(-16deg);pointer-events:none}
      .sp-map-tip{position:absolute;left:16px;bottom:14px;z-index:3;padding:8px 12px;border-radius:13px;background:rgba(255,255,255,.9);color:#5B216E;font-size:13px;font-weight:900;box-shadow:0 4px 12px rgba(15,23,42,.15)}
      .sp-info,.sp-detail{padding:18px 18px 16px;display:flex;flex-direction:column;justify-content:flex-start;min-height:0;overflow-x:hidden;overflow-y:auto;overscroll-behavior:contain;scrollbar-width:thin;scrollbar-color:#C4B5FD #FAF5FF}

      .sp-info::-webkit-scrollbar,.sp-detail::-webkit-scrollbar{width:8px}
      .sp-info::-webkit-scrollbar-track,.sp-detail::-webkit-scrollbar-track{background:#FAF5FF;border-radius:999px}
      .sp-info::-webkit-scrollbar-thumb,.sp-detail::-webkit-scrollbar-thumb{background:linear-gradient(180deg,#F9A8D4,#C4B5FD);border-radius:999px;border:2px solid #FAF5FF}
      .sp-kicker{color:#EC4899;font-size:12px;font-weight:950;text-transform:uppercase;letter-spacing:.07em}
      .sp-info h3,.sp-detail h3{margin:4px 0 7px;color:#5B216E;font-size:30px;line-height:1.05}
      .sp-info .sp-parent,.sp-detail .sp-parent{margin-top:3px;color:#0369A1;font-size:14px;font-weight:900}
      .sp-info p,.sp-detail-text{margin:0 0 11px;color:#475467;font-size:16px;line-height:1.55;font-weight:780}
      .sp-fact-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px}
      .sp-fact{padding:9px 10px;border-radius:13px;border:1px solid #E9D5FF;background:#FAF5FF}
      .sp-fact strong{display:block;color:#6D28D9;font-size:13px;line-height:1.25}
      .sp-fact span{display:block;margin-top:3px;color:#475467;font-size:12.5px;font-weight:820;line-height:1.38}
      .sp-rabbit-tip{margin-top:11px;padding:10px 11px;border:1px solid #F9A8D4;border-radius:14px;background:#FFF1F7;color:#BE185D;font-size:13px;font-weight:900;line-height:1.45}
      .sp-list-layout{height:100%;display:grid;grid-template-columns:minmax(410px,.88fr) minmax(0,1.22fr);gap:12px}
      .sp-grid-card{padding:10px;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));grid-template-rows:repeat(3,minmax(0,1fr));gap:8px}
      .sp-object{border:1px solid #E9D5FF;border-radius:16px;background:linear-gradient(145deg,#FFF,#FAF5FF);padding:7px;display:flex;align-items:center;gap:7px;text-align:left;min-width:0;transition:.15s ease;box-shadow:0 3px 8px rgba(76,29,149,.05)}
      .sp-object:hover,.sp-object.is-selected{transform:translateY(-1px);border-color:#A855F7;box-shadow:0 7px 15px rgba(139,92,246,.14)}
      .sp-object.is-selected{background:linear-gradient(145deg,#FFF1F7,#F5F3FF)}
      .sp-object-art{width:46px;height:46px;flex:0 0 46px;position:relative;display:flex;align-items:center;justify-content:center}
      .sp-object-art .sp-planet{--size:40px}
      .sp-object-copy{min-width:0}
      .sp-object-copy strong{display:block;color:#344054;font-size:12.5px;white-space:normal;line-height:1.15}
      .sp-object-copy small{display:block;margin-top:3px;color:#667085;font-size:10px;font-weight:800;line-height:1.25}
      .sp-moon-ball{width:36px;height:36px;border-radius:50%;box-shadow:inset -6px -6px 10px rgba(0,0,0,.16),0 2px 7px rgba(0,0,0,.12)}
      .moon{background:linear-gradient(135deg,#F8FAFC,#94A3B8)}
      .rock-moon{background:linear-gradient(135deg,#D6D3D1,#78716C)}
      .io{background:radial-gradient(circle at 65% 35%,#7C2D12 0 8%,transparent 9%),linear-gradient(135deg,#FEF08A,#F59E0B)}
      .europa{background:repeating-linear-gradient(20deg,#E0F2FE 0 7px,#FDBA74 7px 9px,#F8FAFC 9px 14px)}
      .ganymede{background:linear-gradient(135deg,#D6D3D1,#78716C)}
      .callisto{background:radial-gradient(circle at 35% 35%,#D6D3D1 0 8%,transparent 9%),linear-gradient(135deg,#78716C,#292524)}
      .titan{background:linear-gradient(135deg,#FDE68A,#D97706)}
      .enceladus{background:linear-gradient(135deg,#FFF,#BAE6FD)}
      .miranda{background:repeating-linear-gradient(45deg,#E7E5E4 0 6px,#A8A29E 6px 8px)}
      .titania{background:linear-gradient(135deg,#D6D3D1,#64748B)}
      .oberon{background:linear-gradient(135deg,#A8A29E,#57534E)}
      .triton{background:linear-gradient(135deg,#F8FAFC,#93C5FD 60%,#F9A8D4)}
      .sp-detail-hero{display:flex;align-items:center;gap:12px}
      .sp-detail-art{width:72px;height:72px;flex:0 0 72px;border-radius:20px;background:linear-gradient(145deg,#FFF1F7,#EFF8FF);display:flex;align-items:center;justify-content:center;border:1px solid #E9D5FF}
      .sp-detail-art .sp-planet{--size:58px}
      .sp-detail-art .sp-moon-ball{width:54px;height:54px}
      .sp-action-row{display:flex;align-items:center;gap:9px;flex-wrap:wrap;margin:2px 0 11px}
      .sp-read-btn{min-height:40px;padding:0 14px;border:1px solid #A7F3D0;border-radius:12px;background:linear-gradient(90deg,#EFFCF7,#E0F2FE);color:#047857;font-size:14px;font-weight:950;box-shadow:0 3px 8px rgba(14,116,144,.07)}
      .sp-read-btn.is-speaking{background:linear-gradient(90deg,#EC4899,#8B5CF6);border-color:transparent;color:#fff}
      .sp-quiz-card{height:100%;padding:14px;display:grid;grid-template-columns:minmax(0,1.12fr) minmax(280px,.58fr);gap:12px}
      .sp-quiz-main{padding:18px;border:1px solid #E9D5FF;border-radius:18px;background:linear-gradient(145deg,#FFF,#FAF5FF);display:flex;flex-direction:column;min-height:0}
      .sp-quiz-progress{display:flex;align-items:center;justify-content:space-between;gap:10px;color:#667085;font-size:13px;font-weight:900}
      .sp-progress-track{height:9px;border-radius:99px;background:#EDE9FE;overflow:hidden;margin:9px 0 16px}
      .sp-progress-bar{height:100%;background:linear-gradient(90deg,#EC4899,#8B5CF6,#3B82F6,#10B981);border-radius:inherit}
      .sp-question{margin:0 0 14px;color:#344054;font-size:22px;line-height:1.35;font-weight:950}
      .sp-answers{display:grid;grid-template-columns:1fr 1fr;gap:10px}
      .sp-answer{min-height:56px;padding:10px 12px;border:1.5px solid #D8B4FE;border-radius:15px;background:#fff;color:#5B216E;text-align:left;font-size:15px;font-weight:900;transition:.15s ease}
      .sp-answer:hover:not(:disabled){background:#FAF5FF;transform:translateY(-1px)}
      .sp-answer.correct{background:#ECFDF5;border-color:#10B981;color:#047857}
      .sp-answer.wrong{background:#FFF1F2;border-color:#FB7185;color:#BE123C}
      .sp-answer:disabled{cursor:default}
      .sp-feedback{min-height:48px;margin-top:11px;padding:10px 12px;border-radius:13px;background:#F8FAFC;color:#475467;font-size:13px;font-weight:850;line-height:1.5}
      .sp-next{margin-top:auto;align-self:flex-end;min-width:136px;min-height:42px;border:0;border-radius:13px;background:linear-gradient(90deg,#EC4899,#8B5CF6);color:#fff;font-weight:950;box-shadow:0 5px 12px rgba(139,92,246,.2)}
      .sp-next:disabled{opacity:.5;cursor:not-allowed}
      .sp-score-card{padding:16px;border:1px solid #BAE6FD;border-radius:18px;background:linear-gradient(145deg,#EFF8FF,#ECFDF5);display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center}
      .sp-score-orbit{width:112px;height:112px;border:2px dashed #7DD3FC;border-radius:50%;display:flex;align-items:center;justify-content:center;position:relative;margin-bottom:10px}
      .sp-score-orbit::after{content:"🪐";position:absolute;right:-8px;top:10px;font-size:26px}
      .sp-score-num{font-size:34px;font-weight:950;color:#0369A1}
      .sp-score-card strong{color:#047857;font-size:17px}
      .sp-score-card p{margin:5px 0 0;color:#475467;font-size:13px;font-weight:800;line-height:1.45}
      .sp-reset{margin-top:12px;min-height:38px;padding:0 14px;border:1px solid #86EFAC;border-radius:12px;background:#fff;color:#047857;font-weight:950}
      @keyframes spPulse{50%{transform:scale(1.045);box-shadow:0 0 40px rgba(251,191,36,.9),0 0 80px rgba(249,115,22,.34)}}
      @media (max-width:1024px){
        #space-explorer{height:min(705px,calc(100vh - 110px));min-height:600px}
        .sp-head{padding:12px 14px 9px}.sp-tabs{padding:0 14px 10px}.sp-stage{padding:0 14px 14px}
        .sp-title{font-size:25px}.sp-sub{font-size:14px}
        .sp-overview-grid{grid-template-columns:minmax(0,1.34fr) minmax(280px,.82fr)}.sp-list-layout{grid-template-columns:minmax(365px,.86fr) minmax(0,1.18fr)}
        .sp-grid-card{grid-template-columns:repeat(3,minmax(0,1fr));grid-template-rows:repeat(3,minmax(0,1fr));gap:7px;padding:8px}
        .sp-object{padding:6px;gap:6px}.sp-object-art{width:40px;height:40px;flex-basis:40px}.sp-object-art .sp-planet{--size:35px}
        .sp-sun{width:70px;height:70px}.sp-planet-button{font-size:9px}
        .sp-info h3,.sp-detail h3{font-size:26px}.sp-info p,.sp-detail-text{font-size:15px}
      }
      @media (max-width:760px){
        #space-explorer{height:auto;min-height:0;overflow:visible}
        .sp-head{align-items:flex-start}
        .sp-tabs{grid-template-columns:1fr 1fr}
        .sp-stage{min-height:560px}
        .sp-overview-grid,.sp-list-layout,.sp-quiz-card{grid-template-columns:1fr;grid-template-rows:minmax(320px,1fr) auto}
        .sp-info,.sp-detail,.sp-score-card{min-height:220px}
        .sp-grid-card{grid-template-columns:repeat(2,minmax(0,1fr));grid-template-rows:none;grid-auto-rows:minmax(72px,auto);overflow:auto}
        .sp-orbit-row{left:2%;right:2%}.sp-sun{width:52px;height:52px}.sp-planet-button span:last-child{display:none}
        .sp-answers{grid-template-columns:1fr}
        .sp-fact-grid{grid-template-columns:1fr}
      }
      @media (prefers-reduced-motion:reduce){#space-explorer *{animation:none!important;transition:none!important}}
    `;
    document.head.appendChild(style);
  }

  function ttsUrl(text) {
    return `https://translate.google.com/translate_tts?ie=UTF-8&tl=vi&client=tw-ob&q=${encodeURIComponent(text)}`;
  }

  function stopNarration(refreshButtons = true) {
    narrationNonce += 1;
    currentSpeakKey = "";
    try {
      narrationAudio.pause();
      narrationAudio.currentTime = 0;
      narrationAudio.removeAttribute("src");
      narrationAudio.load();
    } catch (_) {}
    if (refreshButtons) updateSpeakButtons();
  }

  function updateSpeakButtons() {
    if (!root) return;
    root.querySelectorAll(".sp-read-btn").forEach((btn) => {
      const speaking = currentSpeakKey && btn.dataset.speakKey === currentSpeakKey && !narrationAudio.paused;
      btn.classList.toggle("is-speaking", speaking);
      btn.textContent = speaking ? "⏹️ Dừng đọc" : "🔊 Nghe cô đọc";
    });
  }

  async function playNarration(key, text) {
    const cleanText = String(text || "").replace(/\s+/g, " ").trim();
    if (!cleanText) return;
    if (currentSpeakKey === key && !narrationAudio.paused) {
      stopNarration();
      return;
    }
    const nonce = ++narrationNonce;
    currentSpeakKey = key;
    updateSpeakButtons();
    try {
      narrationAudio.pause();
      narrationAudio.currentTime = 0;
      narrationAudio.src = ttsUrl(cleanText);
      narrationAudio.playbackRate = 0.96;
      await narrationAudio.play();
      if (nonce !== narrationNonce) return;
      updateSpeakButtons();
    } catch (_) {
      if (nonce === narrationNonce) {
        currentSpeakKey = "";
        updateSpeakButtons();
      }
    }
  }

  function narrationFor(obj) {
    return obj && obj.speech ? obj.speech : "";
  }

  function planetArt(p, size = 46) {
    const ring = p.id === "saturn" ? `<span class="sp-ring" style="--size:${size}px"></span>` : "";
    return `<span class="sp-planet ${p.className}" style="--size:${size}px"></span>${ring}`;
  }

  function moonArt(m) {
    return `<span class="sp-moon-ball ${m.className}"></span>`;
  }

  function objectById(id) {
    if (id === "solar-system") return SOLAR_SYSTEM;
    return PLANETS.find((x) => x.id === id) || MOONS.find((x) => x.id === id) || SOLAR_SYSTEM;
  }

  function detailHtml(obj) {
    if (!obj) return "";
    if (obj.kind === "system") {
      return `
        <div class="sp-kicker">${obj.label}</div>
        <h3>${obj.title}</h3>
        <div class="sp-parent">${obj.subtitle}</div>
        <div class="sp-action-row">
          <button class="sp-read-btn" type="button" data-action="speak" data-speak-key="${obj.id}">🔊 Nghe cô đọc</button>
        </div>
        <p>${obj.summary}</p>
        <p>${obj.more}</p>
        <div class="sp-fact-grid">
          ${obj.facts.map((fact) => `<div class="sp-fact"><strong>${fact.label}</strong><span>${fact.value}</span></div>`).join("")}
        </div>
        <div class="sp-rabbit-tip">${obj.rabbitTip}</div>
      `;
    }

    const artHtml = obj.kind === "planet" ? planetArt(obj, 58) : moonArt(obj);
    const kicker = obj.kind === "planet" ? "Hành tinh" : "Vệ tinh tự nhiên";
    const parent = obj.kind === "planet" ? `Hành tinh thứ ${obj.order} tính từ Mặt Trời` : `Quay quanh ${obj.parent}`;

    const facts = obj.kind === "planet"
      ? [
          { label:"Vị trí", value:`Thứ ${obj.order} từ Mặt Trời` },
          { label:"Kích thước", value:obj.size },
          { label:"Một ngày", value:obj.day },
          { label:"Một năm", value:obj.year },
          { label:"Nhiệt độ", value:obj.temp },
          { label:"Vệ tinh", value:obj.moons },
          { label:"Khí quyển", value:obj.atmosphere },
          { label:"Bề mặt", value:obj.surface },
          { label:"Ánh sáng từ Mặt Trời", value:obj.lightTime },
          { label:"Điểm đặc biệt", value:obj.special }
        ]
      : [
          { label:"Hành tinh mẹ", value:obj.parent },
          { label:"Điểm nổi bật", value:obj.fact },
          { label:"Khám phá thêm", value:obj.more }
        ];

    return `
      <div class="sp-detail-hero">
        <div class="sp-detail-art">${artHtml}</div>
        <div>
          <div class="sp-kicker">${kicker}</div>
          <h3>${obj.name}</h3>
          <div class="sp-parent">${parent}</div>
        </div>
      </div>
      <div class="sp-action-row">
        <button class="sp-read-btn" type="button" data-action="speak" data-speak-key="${obj.id}">🔊 Nghe cô đọc</button>
      </div>
      <p class="sp-detail-text"><strong>🌟 Điều nổi bật:</strong> ${obj.fact}</p>
      <p class="sp-detail-text"><strong>🔭 Khám phá thêm:</strong> ${obj.more}</p>
      ${obj.kind === "planet" ? `<p class="sp-detail-text"><strong>🧠 Bé nhớ nhé:</strong> ${obj.remember}</p>` : ""}
      <div class="sp-fact-grid">
        ${facts.map((fact) => `<div class="sp-fact"><strong>${fact.label}</strong><span>${fact.value}</span></div>`).join("")}
      </div>
      <div class="sp-rabbit-tip">🐰 Cô Thỏ Hồng: ${obj.kind === "planet" ? "Con đọc từng ô nhỏ rồi thử sang tab Hỏi đáp để kiểm tra xem mình nhớ được bao nhiêu nhé!" : `Con thử tìm hành tinh ${obj.parent} để nhớ xem ${obj.name} đang quay quanh ai nhé!`}</div>
    `;
  }

  function overviewHtml() {
    return `
      <div class="sp-overview-grid">
        <div class="sp-card sp-space-map">
          <div class="sp-orbit-row">
            <button class="sp-sun-button" type="button" data-object="solar-system" title="Xem thông tin Hệ Mặt Trời">
              <span class="sp-sun-wrap">
                <span class="sp-sun" aria-hidden="true"></span>
                <span style="color:white;font-size:12px;font-weight:950">Mặt Trời</span>
              </span>
            </button>
            ${PLANETS.map((p, i) => `
              <button class="sp-planet-button" type="button" data-object="${p.id}" title="Khám phá ${p.name}">
                <span style="position:relative;display:flex;align-items:center;justify-content:center">${planetArt(p, [20,25,27,23,48,44,34,34][i])}</span>
                <span>${p.name.replace("Sao ", "")}</span>
              </button>`).join("")}
          </div>
          <div class="sp-map-tip">👆 Chạm vào Mặt Trời để xem Hệ Mặt Trời, hoặc chạm vào từng hành tinh để xem thông tin riêng</div>
        </div>
        <aside class="sp-card sp-info" id="sp-overview-info">${detailHtml(objectById(selectedObjectId === "solar-system" ? "solar-system" : selectedObjectId))}</aside>
      </div>`;
  }

  function listHtml(kind) {
    const items = kind === "planets" ? PLANETS : MOONS;
    const fallbackId = kind === "planets" ? "earth" : "moon";
    if (!items.some((item) => item.id === selectedObjectId)) selectedObjectId = fallbackId;
    return `
      <div class="sp-list-layout">
        <div class="sp-card sp-grid-card">
          ${items.map((o) => `
            <button class="sp-object ${selectedObjectId === o.id ? "is-selected" : ""}" type="button" data-object="${o.id}">
              <span class="sp-object-art">${kind === "planets" ? planetArt(o, 40) : moonArt(o)}</span>
              <span class="sp-object-copy">
                <strong>${o.name}</strong>
                <small>${kind === "planets" ? `Thứ ${o.order} từ Mặt Trời` : o.parent}</small>
              </span>
            </button>`).join("")}
        </div>
        <aside class="sp-card sp-detail" id="sp-detail-panel">${detailHtml(objectById(selectedObjectId))}</aside>
      </div>`;
  }

  function quizHtml() {
    const done = quizIndex >= QUIZ.length;
    if (done) {
      return `<div class="sp-quiz-card">
        <div class="sp-card sp-quiz-main" style="align-items:center;justify-content:center;text-align:center">
          <div style="font-size:54px">🚀</div>
          <h3 class="sp-question" style="margin-top:8px">Hoàn thành chuyến du hành!</h3>
          <div class="sp-feedback">Con đã trả lời đúng <strong>${quizScore}/${QUIZ.length}</strong> câu. Cô Thỏ Hồng rất khen con đó!</div>
          <button class="sp-next" type="button" data-action="reset-quiz" style="align-self:center;margin-top:14px">Chơi lại</button>
        </div>
        <aside class="sp-score-card">
          <div class="sp-score-orbit"><span class="sp-score-num">${quizScore}</span></div>
          <strong>Điểm khám phá</strong>
          <p>Càng quan sát kỹ các tab Hành tinh và Vệ tinh, con càng trả lời giỏi.</p>
        </aside>
      </div>`;
    }

    const q = QUIZ[quizIndex];
    return `
      <div class="sp-quiz-card">
        <div class="sp-card sp-quiz-main">
          <div class="sp-quiz-progress"><span>Câu ${quizIndex + 1}/${QUIZ.length}</span><span>Đúng: ${quizScore}</span></div>
          <div class="sp-progress-track"><div class="sp-progress-bar" style="width:${(quizIndex / QUIZ.length) * 100}%"></div></div>
          <h3 class="sp-question">${q.q}</h3>
          <div class="sp-answers">
            ${q.a.map((answer, index) => `<button class="sp-answer" type="button" data-answer="${index}"><span style="opacity:.65;margin-right:6px">${String.fromCharCode(65 + index)}.</span>${answer}</button>`).join("")}
          </div>
          <div class="sp-feedback" id="sp-feedback">🐰 Cô Thỏ Hồng: Con chọn một đáp án nhé!</div>
          <button class="sp-next" type="button" data-action="next-quiz" disabled>${quizIndex === QUIZ.length - 1 ? "Xem kết quả" : "Câu tiếp theo →"}</button>
        </div>
        <aside class="sp-score-card">
          <div class="sp-score-orbit"><span class="sp-score-num">${quizScore}</span></div>
          <strong>Điểm khám phá</strong>
          <p>Trả lời đúng sẽ được cộng 1 điểm. Nếu sai cũng không sao, con đọc giải thích rồi thử câu tiếp theo nhé!</p>
          <button class="sp-reset" type="button" data-action="reset-quiz">Làm lại từ đầu</button>
        </aside>
      </div>`;
  }

  function renderPanels() {
    if (!root) return;
    const stage = root.querySelector(".sp-stage");
    if (!stage) return;

    stopNarration(false);

    if (activeTab === "overview") {
      if (!objectById(selectedObjectId)) selectedObjectId = "solar-system";
      stage.innerHTML = `<section class="sp-panel is-active">${overviewHtml()}</section>`;
    } else if (activeTab === "planets") {
      stage.innerHTML = `<section class="sp-panel is-active">${listHtml("planets")}</section>`;
    } else if (activeTab === "moons") {
      stage.innerHTML = `<section class="sp-panel is-active">${listHtml("moons")}</section>`;
    } else if (activeTab === "quiz") {
      stage.innerHTML = `<section class="sp-panel is-active">${quizHtml()}</section>`;
    }
    updateSpeakButtons();
  }

  function setActiveTab(tab, hooks) {
    activeTab = tab;
    root.querySelectorAll(".sp-tab").forEach((btn) => {
      btn.classList.toggle("is-active", btn.dataset.tab === tab);
    });
    renderPanels();

    if (hooks && typeof hooks.setSubBanner === "function") {
      const labels = { overview: "Tổng quan", planets: "Các hành tinh", moons: "Các vệ tinh", quiz: "Hỏi đáp" };
      hooks.setSubBanner({
        items: [
          { level: 2, title: "7. Khám phá vũ trụ", action: null },
          { level: 3, title: labels[tab], action: null }
        ]
      });
    }
  }

  function bind(hooks) {
    controller = new AbortController();
    const signal = controller.signal;

    narrationAudio.addEventListener("ended", () => {
      currentSpeakKey = "";
      updateSpeakButtons();
    }, { signal });

    narrationAudio.addEventListener("pause", () => {
      if (narrationAudio.ended || narrationAudio.currentTime === 0) {
        currentSpeakKey = "";
        updateSpeakButtons();
      }
    }, { signal });

    root.addEventListener("click", (event) => {
      const tabBtn = event.target.closest(".sp-tab");
      if (tabBtn) {
        setActiveTab(tabBtn.dataset.tab, hooks);
        return;
      }

      const speakBtn = event.target.closest('[data-action="speak"]');
      if (speakBtn) {
        const obj = objectById(speakBtn.dataset.speakKey);
        void playNarration(speakBtn.dataset.speakKey, narrationFor(obj));
        return;
      }

      const objectBtn = event.target.closest("[data-object]");
      if (objectBtn) {
        selectedObjectId = objectBtn.dataset.object;
        const obj = objectById(selectedObjectId);
        stopNarration();

        if (activeTab === "overview") {
          const info = root.querySelector("#sp-overview-info");
          if (info && obj) info.innerHTML = detailHtml(obj);
        } else {
          root.querySelectorAll(".sp-object").forEach((btn) => {
            btn.classList.toggle("is-selected", btn.dataset.object === selectedObjectId);
          });
          const detail = root.querySelector("#sp-detail-panel");
          if (detail && obj) detail.innerHTML = detailHtml(obj);
        }
        updateSpeakButtons();
        return;
      }

      const answer = event.target.closest("[data-answer]");
      if (answer && activeTab === "quiz" && !quizLocked) {
        const q = QUIZ[quizIndex];
        const chosen = Number(answer.dataset.answer);
        quizLocked = true;

        if (chosen === q.c) quizScore += 1;
        root.querySelectorAll(".sp-answer").forEach((btn) => {
          btn.disabled = true;
          const index = Number(btn.dataset.answer);
          if (index === q.c) btn.classList.add("correct");
          else if (index === chosen) btn.classList.add("wrong");
        });

        const feedback = root.querySelector("#sp-feedback");
        if (feedback) feedback.innerHTML = chosen === q.c ? `🌟 Chính xác! ${q.note}` : `💡 Chưa đúng rồi. ${q.note}`;

        const nextButton = root.querySelector('[data-action="next-quiz"]');
        if (nextButton) nextButton.disabled = false;

        const score = root.querySelector(".sp-score-num");
        if (score) score.textContent = String(quizScore);
        return;
      }

      const action = event.target.closest("[data-action]");
      if (!action) return;

      if (action.dataset.action === "next-quiz") {
        if (!quizLocked) return;
        quizIndex += 1;
        quizLocked = false;
        renderPanels();
      } else if (action.dataset.action === "reset-quiz") {
        quizIndex = 0;
        quizScore = 0;
        quizLocked = false;
        renderPanels();
      }
    }, { signal });
  }

  function render(ctx) {
    injectStyle();
    root = document.createElement("section");
    root.id = "space-explorer";
    root.innerHTML = `
      <header class="sp-head">
        <div class="sp-title-wrap">
          <div class="sp-logo" aria-hidden="true">🪐</div>
          <div>
            <h2 class="sp-title">Khám phá vũ trụ</h2>
            <p class="sp-sub">Cùng Cô Thỏ Hồng du hành qua Hệ Mặt Trời</p>
          </div>
        </div>
      </header>
      <nav class="sp-tabs" aria-label="Các khu vực khám phá">
        <button class="sp-tab is-active" data-tab="overview" type="button">🌞 Tổng quan</button>
        <button class="sp-tab" data-tab="planets" type="button">🪐 Hành tinh</button>
        <button class="sp-tab" data-tab="moons" type="button">🌙 Vệ tinh</button>
        <button class="sp-tab" data-tab="quiz" type="button">🚀 Hỏi đáp</button>
      </nav>
      <div class="sp-stage"></div>
    `;
    ctx.host.replaceChildren(root);
    renderPanels();
    bind(ctx.hooks || {});
  }

  function destroy() {
    stopNarration(false);
    if (controller) controller.abort();
    controller = null;
    if (root && root.isConnected) root.remove();
    root = null;
    activeTab = "overview";
    selectedObjectId = "solar-system";
    quizIndex = 0;
    quizScore = 0;
    quizLocked = false;
  }

  window.CLASS1_GAME_MODULES = window.CLASS1_GAME_MODULES || {};
  window.CLASS1_GAME_MODULES[MODULE_ID] = { render, destroy };
})();

(() => {
  "use strict";

  const MODULE_KEY = "rabbitDrawing";
  const STYLE_ID = "class1-games-rabbit-drawing-style";
  const CATALOG_URL = "assets/data/shared_image_catalog.json?v=6";
  const GAME_NUMBER = 3;
  const DONE_KEY = "class1-rabbit-drawing-done";
  const INK = "#3B2314";

  let activeContext = null;
  let catalog = null;
  let catalogPromise = null;
  let catalogAbort = null;
  let currentLessonId = "";
  let currentStepIndex = 0;
  let padState = null;
  let guideOn = true;
  let brushWidth = 7;

  const esc = (value) => String(value == null ? "" : value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");

  /* Mỗi bài: parts = các bộ phận của tranh theo thứ tự lớp (dưới -> trên),
     steps = thứ tự bé vẽ; mỗi bước chỉ ra bộ phận nào được vẽ thêm.
     Bước "color" hiện tranh màu đầy đủ, trùng với ảnh mẫu trong kho. */
  const LESSONS = Object.freeze([{"id":"turtle","imageId":"dong_vat_turtle","title":"Chú rùa chậm chạp","difficulty":"Dễ","tone":"teal","palette":["#3B2314","#9BD67A","#7CC25A","#4CAF50","#C8E6A0","#F8A5B8"],"parts":[{"id":"chan","svg":"<path d=\"M128 268 L118 312 L152 312 L156 270 Z\" fill=\"#9BD67A\"/><path d=\"M244 270 L248 312 L282 312 L272 268 Z\" fill=\"#9BD67A\"/><path d=\"M168 274 L166 304 L194 304 L196 274 Z M206 274 L206 304 L232 304 L232 274 Z\" fill=\"#7CC25A\"/>"},{"id":"duoi","svg":"<path d=\"M300 252 L338 262 L302 272 Z\" fill=\"#9BD67A\"/>"},{"id":"dau","svg":"<path d=\"M118 236 C88 236 52 224 50 196 C48 166 80 154 104 166 C120 174 128 200 134 222 Z\" fill=\"#9BD67A\"/>"},{"id":"mai","svg":"<path d=\"M106 262 C106 170 156 116 210 116 C264 116 312 170 312 262 Z\" fill=\"#4CAF50\"/>"},{"id":"vien_mai","svg":"<path d=\"M96 258 L320 258 C326 258 330 264 328 270 L324 282 L94 282 L90 270 C88 264 92 258 96 258 Z\" fill=\"#C8E6A0\"/>"},{"id":"hoa_van","svg":"<path d=\"M186 160 L234 160 L250 196 L234 232 L186 232 L170 196 Z\" fill=\"#81C784\" stroke-width=\"4\"/><path d=\"M186 160 L172 128 M234 160 L250 130 M170 196 L124 196 M250 196 L296 196 M186 232 L176 258 M234 232 L244 258\" fill=\"none\" stroke-width=\"4\"/>"},{"id":"mat","svg":"<circle cx=\"78\" cy=\"192\" r=\"8\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"80.8\" cy=\"189.2\" r=\"2.64\" fill=\"#fff\" stroke=\"none\"/><ellipse cx=\"92\" cy=\"214\" rx=\"9\" ry=\"5\" fill=\"#F8A5B8\" stroke=\"none\" opacity=\".9\"/><path d=\"M62.0 212 Q70 219 78.0 212\" fill=\"none\" stroke-width=\"4\"/>"}],"steps":[{"title":"Vẽ mai rùa","instruction":"Vẽ một nửa hình tròn thật to, phần cong ở trên, cạnh thẳng ở dưới. Đây là cái mai.","parts":["mai"],"tip":"Vẽ mai ở giữa tờ giấy, chừa chỗ bên trái để vẽ đầu."},{"title":"Vẽ viền mai","instruction":"Ngay dưới mai, vẽ một dải dài nằm ngang, hai đầu bo tròn.","parts":["vien_mai"],"tip":""},{"title":"Vẽ đầu","instruction":"Bên trái mai, vẽ một hình tròn hơi dẹt thò ra ngoài. Đây là đầu rùa.","parts":["dau"],"tip":""},{"title":"Vẽ mắt và miệng","instruction":"Vẽ một chấm mắt tròn và một nụ cười nhỏ trên đầu rùa.","parts":["mat"],"tip":""},{"title":"Vẽ bốn chân","instruction":"Dưới viền mai, vẽ bốn cái chân ngắn hình chữ nhật, hai chân trước to hơn.","parts":["chan"],"tip":""},{"title":"Vẽ đuôi","instruction":"Bên phải, vẽ một cái đuôi nhỏ hình tam giác.","parts":["duoi"],"tip":""},{"title":"Vẽ hoa văn trên mai","instruction":"Vẽ một hình lục giác ở giữa mai, rồi kẻ các đường nối ra mép mai.","parts":["hoa_van"],"tip":"Hình lục giác là hình có 6 cạnh, giống tổ ong."},{"title":"Tô màu","instruction":"Tô màu cho bức tranh giống tranh mẫu, hoặc chọn những màu bé thích nhất.","parts":[],"tip":"Tô từ phần to trước, phần nhỏ sau. Tô nhẹ tay để màu đều.","color":true}]},{"id":"elephant","imageId":"dong_vat_elephant","title":"Voi con tai to","difficulty":"Dễ","tone":"purple","palette":["#3B2314","#7B8FA6","#A9C1DA","#F8C8D4","#F8A5B8"],"parts":[{"id":"duoi","svg":"<path d=\"M290 250 C312 256 320 276 312 292\" fill=\"none\" stroke-width=\"5\"/><path d=\"M308 288 L318 302 L304 300 Z\" fill=\"#7B8FA6\"/>"},{"id":"than","svg":"<path d=\"M150 210 C130 232 128 280 140 304 L280 304 C300 270 298 222 270 200 C240 180 180 182 150 210 Z\" fill=\"#A9C1DA\"/>"},{"id":"chan","svg":"<path d=\"M146 290 L146 350 L186 350 L186 296 Z M234 296 L234 350 L274 350 L274 290 Z\" fill=\"#A9C1DA\"/><path d=\"M152 350 Q158 340 164 350 M168 350 Q174 340 180 350 M240 350 Q246 340 252 350 M256 350 Q262 340 268 350\" fill=\"#fff\" stroke-width=\"3\"/>"},{"id":"tai","svg":"<path d=\"M132 102 C84 82 52 120 60 166 C66 200 104 214 132 196 Z\" fill=\"#A9C1DA\"/><path d=\"M268 102 C316 82 348 120 340 166 C334 200 296 214 268 196 Z\" fill=\"#A9C1DA\"/><path d=\"M128 120 C98 110 80 134 84 160 C88 182 110 190 126 180 Z M272 120 C302 110 320 134 316 160 C312 182 290 190 274 180 Z\" fill=\"#F8C8D4\" stroke-width=\"3.5\"/>"},{"id":"dau","svg":"<circle cx=\"200\" cy=\"138\" r=\"78\" fill=\"#A9C1DA\"/>"},{"id":"voi","svg":"<path d=\"M184 176 C182 220 184 248 198 260 C212 270 230 262 230 246 C230 236 218 232 214 240 C212 246 208 248 206 242 C202 228 214 204 216 176 Z\" fill=\"#A9C1DA\"/><path d=\"M186 206 L202 206 M188 228 L204 226\" fill=\"none\" stroke-width=\"3\"/>"},{"id":"mat","svg":"<circle cx=\"172\" cy=\"128\" r=\"9\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"175.15\" cy=\"124.85\" r=\"2.97\" fill=\"#fff\" stroke=\"none\"/><circle cx=\"228\" cy=\"128\" r=\"9\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"231.15\" cy=\"124.85\" r=\"2.97\" fill=\"#fff\" stroke=\"none\"/><ellipse cx=\"152\" cy=\"156\" rx=\"11\" ry=\"6.5\" fill=\"#F8A5B8\" stroke=\"none\" opacity=\".9\"/><ellipse cx=\"248\" cy=\"156\" rx=\"11\" ry=\"6.5\" fill=\"#F8A5B8\" stroke=\"none\" opacity=\".9\"/>"}],"steps":[{"title":"Vẽ đầu","instruction":"Vẽ một hình tròn to ở phía trên tờ giấy. Đây là đầu voi.","parts":["dau"],"tip":""},{"title":"Vẽ hai tai","instruction":"Hai bên đầu, vẽ hai cái tai to như hai cái quạt. Bên trong mỗi tai vẽ thêm một vòng nhỏ hơn.","parts":["tai"],"tip":""},{"title":"Vẽ vòi","instruction":"Từ giữa mặt, vẽ cái vòi dài thõng xuống, cuối vòi cuộn tròn lên. Thêm hai vạch ngang trên vòi.","parts":["voi"],"tip":"Vẽ hai đường song song cho vòi, rồi khép lại ở chỗ cuộn."},{"title":"Vẽ mắt và má","instruction":"Vẽ hai chấm mắt hai bên vòi và hai má hồng.","parts":["mat"],"tip":""},{"title":"Vẽ thân","instruction":"Dưới đầu, vẽ thân voi tròn trịa, to hơn đầu một chút.","parts":["than"],"tip":""},{"title":"Vẽ bốn chân","instruction":"Vẽ hai chân trước to như hai cái cột, dưới chân có móng nhỏ.","parts":["chan"],"tip":""},{"title":"Vẽ đuôi","instruction":"Bên phải thân, vẽ cái đuôi cong nhỏ có chỏm lông.","parts":["duoi"],"tip":""},{"title":"Tô màu","instruction":"Tô màu cho bức tranh giống tranh mẫu, hoặc chọn những màu bé thích nhất.","parts":[],"tip":"Tô từ phần to trước, phần nhỏ sau. Tô nhẹ tay để màu đều.","color":true}]},{"id":"bee","imageId":"dong_vat_bee","title":"Chú ong chăm chỉ","difficulty":"Dễ","tone":"amber","palette":["#3B2314","#DFF3FF","#FDD835","#F8A5B8"],"parts":[{"id":"canh","svg":"<path d=\"M196 150 C166 82 196 40 236 52 C268 64 256 120 214 152 Z\" fill=\"#DFF3FF\"/><path d=\"M226 156 C244 96 288 74 316 98 C338 122 304 160 244 166 Z\" fill=\"#DFF3FF\"/>"},{"id":"than","svg":"<path d=\"M110 210 C110 160 170 140 230 146 C292 152 326 182 326 216 C326 256 280 276 220 276 C160 276 110 258 110 210 Z\" fill=\"#FDD835\"/>"},{"id":"soc","svg":"<path d=\"M196 150 C186 186 186 240 196 274 L226 276 C216 240 216 186 228 148 Z M262 158 C252 192 252 236 262 266 L286 260 C278 232 278 192 288 170 Z\" fill=\"#3B2314\"/>"},{"id":"kim","svg":"<path d=\"M324 206 L352 216 L324 228 Z\" fill=\"#3B2314\"/>"},{"id":"dau","svg":"<circle cx=\"118\" cy=\"196\" r=\"56\" fill=\"#FDD835\"/>"},{"id":"rau","svg":"<path d=\"M98 146 C92 112 70 96 52 100 M134 142 C136 108 156 92 176 92\" fill=\"none\" stroke-width=\"4.5\"/><circle cx=\"50\" cy=\"100\" r=\"9\" fill=\"#3B2314\"/><circle cx=\"178\" cy=\"92\" r=\"9\" fill=\"#3B2314\"/>"},{"id":"mat","svg":"<circle cx=\"98\" cy=\"188\" r=\"9\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"101.15\" cy=\"184.85\" r=\"2.97\" fill=\"#fff\" stroke=\"none\"/><circle cx=\"140\" cy=\"188\" r=\"9\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"143.15\" cy=\"184.85\" r=\"2.97\" fill=\"#fff\" stroke=\"none\"/><ellipse cx=\"84\" cy=\"214\" rx=\"11\" ry=\"6.5\" fill=\"#F8A5B8\" stroke=\"none\" opacity=\".9\"/><ellipse cx=\"152\" cy=\"214\" rx=\"11\" ry=\"6.5\" fill=\"#F8A5B8\" stroke=\"none\" opacity=\".9\"/><path d=\"M109.0 214 Q119 223 129.0 214\" fill=\"none\" stroke-width=\"4\"/>"}],"steps":[{"title":"Vẽ thân","instruction":"Vẽ một hình bầu dục nằm ngang làm thân ong.","parts":["than"],"tip":""},{"title":"Vẽ đầu","instruction":"Bên trái thân, vẽ một hình tròn to chồng lên thân một chút.","parts":["dau"],"tip":""},{"title":"Vẽ mặt","instruction":"Vẽ hai mắt, hai má hồng và một nụ cười trên đầu ong.","parts":["mat"],"tip":""},{"title":"Vẽ râu","instruction":"Trên đầu, vẽ hai cái râu cong, đầu mỗi râu có một chấm tròn.","parts":["rau"],"tip":""},{"title":"Vẽ sọc","instruction":"Vẽ hai sọc cong trên thân ong.","parts":["soc"],"tip":"Sọc đen giúp chú ong trông thật giống ong."},{"title":"Vẽ cánh","instruction":"Trên lưng, vẽ hai cái cánh hình giọt nước, cánh sau to hơn.","parts":["canh"],"tip":""},{"title":"Vẽ ngòi","instruction":"Cuối thân bên phải, vẽ một cái ngòi nhỏ hình tam giác.","parts":["kim"],"tip":""},{"title":"Tô màu","instruction":"Tô màu cho bức tranh giống tranh mẫu, hoặc chọn những màu bé thích nhất.","parts":[],"tip":"Tô từ phần to trước, phần nhỏ sau. Tô nhẹ tay để màu đều.","color":true}]},{"id":"butterfly","imageId":"dong_vat_butterfly","title":"Con bướm xinh","difficulty":"Dễ","tone":"pink","palette":["#3B2314","#F48FB1","#B39DDB","#FFF59D","#E1F5FE","#7E57C2"],"parts":[{"id":"canh_tren","svg":"<path d=\"M196 170 C164 92 100 50 64 76 C30 104 48 176 196 196 Z\" fill=\"#F48FB1\"/><path d=\"M204 170 C236 92 300 50 336 76 C370 104 352 176 204 196 Z\" fill=\"#F48FB1\"/>"},{"id":"canh_duoi","svg":"<path d=\"M196 206 C120 206 72 240 84 290 C96 330 156 322 196 236 Z\" fill=\"#B39DDB\"/><path d=\"M204 206 C280 206 328 240 316 290 C304 330 244 322 204 236 Z\" fill=\"#B39DDB\"/>"},{"id":"hoa_van","svg":"<circle cx=\"110\" cy=\"116\" r=\"22\" fill=\"#FFF59D\" stroke-width=\"4\"/><circle cx=\"290\" cy=\"116\" r=\"22\" fill=\"#FFF59D\" stroke-width=\"4\"/><circle cx=\"150\" cy=\"166\" r=\"11\" fill=\"#FFF59D\" stroke-width=\"3.5\"/><circle cx=\"250\" cy=\"166\" r=\"11\" fill=\"#FFF59D\" stroke-width=\"3.5\"/><circle cx=\"126\" cy=\"270\" r=\"16\" fill=\"#E1F5FE\" stroke-width=\"3.5\"/><circle cx=\"274\" cy=\"270\" r=\"16\" fill=\"#E1F5FE\" stroke-width=\"3.5\"/>"},{"id":"than","svg":"<path d=\"M200 130 C214 130 220 150 220 200 C220 270 212 300 200 300 C188 300 180 270 180 200 C180 150 186 130 200 130 Z\" fill=\"#7E57C2\"/>"},{"id":"dau","svg":"<circle cx=\"200\" cy=\"122\" r=\"26\" fill=\"#7E57C2\"/>"},{"id":"rau","svg":"<path d=\"M190 100 C180 74 160 60 144 62 M210 100 C220 74 240 60 256 62\" fill=\"none\" stroke-width=\"4.5\"/><circle cx=\"142\" cy=\"62\" r=\"8\" fill=\"#3B2314\"/><circle cx=\"258\" cy=\"62\" r=\"8\" fill=\"#3B2314\"/>"},{"id":"mat","svg":"<circle cx=\"190\" cy=\"120\" r=\"6\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"192.1\" cy=\"117.9\" r=\"1.98\" fill=\"#fff\" stroke=\"none\"/><circle cx=\"210\" cy=\"120\" r=\"6\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"212.1\" cy=\"117.9\" r=\"1.98\" fill=\"#fff\" stroke=\"none\"/><path d=\"M194.0 132 Q200 137 206.0 132\" fill=\"none\" stroke-width=\"3.5\"/>"}],"steps":[{"title":"Vẽ thân","instruction":"Vẽ một hình bầu dục dài, đứng thẳng ở giữa tờ giấy.","parts":["than"],"tip":""},{"title":"Vẽ đầu","instruction":"Trên thân, vẽ một hình tròn nhỏ làm đầu.","parts":["dau"],"tip":""},{"title":"Vẽ râu","instruction":"Vẽ hai cái râu cong ra hai bên, đầu râu có chấm tròn.","parts":["rau"],"tip":""},{"title":"Vẽ hai cánh trên","instruction":"Hai bên thân, vẽ hai cánh to hướng lên trên. Hai cánh giống nhau như soi gương.","parts":["canh_tren"],"tip":"Vẽ cánh trái trước, rồi vẽ cánh phải y như vậy."},{"title":"Vẽ hai cánh dưới","instruction":"Dưới hai cánh trên, vẽ hai cánh nhỏ hơn hướng xuống dưới.","parts":["canh_duoi"],"tip":""},{"title":"Vẽ hoa văn","instruction":"Vẽ các vòng tròn trang trí trên bốn cánh, bên này có gì thì bên kia có y như vậy.","parts":["hoa_van"],"tip":""},{"title":"Vẽ mặt","instruction":"Vẽ hai mắt nhỏ và nụ cười trên đầu bướm.","parts":["mat"],"tip":""},{"title":"Tô màu","instruction":"Tô màu cho bức tranh giống tranh mẫu, hoặc chọn những màu bé thích nhất.","parts":[],"tip":"Tô từ phần to trước, phần nhỏ sau. Tô nhẹ tay để màu đều.","color":true}]},{"id":"sunflower","imageId":"cay_coi_sunflower","title":"Hoa hướng dương","difficulty":"Dễ","tone":"amber","palette":["#3B2314","#66BB6A","#FFD54F","#8D5A33","#5D3A1E","#F8A5B8","#9CCC65"],"parts":[{"id":"than","svg":"<path d=\"M192 196 L192 360 L208 360 L208 196 Z\" fill=\"#66BB6A\"/>"},{"id":"la","svg":"<path d=\"M192 300 C150 300 118 276 108 248 C146 244 178 262 192 290 Z M208 270 C250 270 282 246 292 218 C254 214 222 232 208 260 Z\" fill=\"#81C784\"/><path d=\"M190 294 C164 280 140 264 120 252 M210 264 C236 250 260 234 280 222\" fill=\"none\" stroke-width=\"3\"/>"},{"id":"canh_hoa","svg":"<ellipse cx=\"200\" cy=\"66\" rx=\"20\" ry=\"40\" fill=\"#FFD54F\" transform=\"rotate(0 200 136)\"/><ellipse cx=\"200\" cy=\"66\" rx=\"20\" ry=\"40\" fill=\"#FFD54F\" transform=\"rotate(30 200 136)\"/><ellipse cx=\"200\" cy=\"66\" rx=\"20\" ry=\"40\" fill=\"#FFD54F\" transform=\"rotate(60 200 136)\"/><ellipse cx=\"200\" cy=\"66\" rx=\"20\" ry=\"40\" fill=\"#FFD54F\" transform=\"rotate(90 200 136)\"/><ellipse cx=\"200\" cy=\"66\" rx=\"20\" ry=\"40\" fill=\"#FFD54F\" transform=\"rotate(120 200 136)\"/><ellipse cx=\"200\" cy=\"66\" rx=\"20\" ry=\"40\" fill=\"#FFD54F\" transform=\"rotate(150 200 136)\"/><ellipse cx=\"200\" cy=\"66\" rx=\"20\" ry=\"40\" fill=\"#FFD54F\" transform=\"rotate(180 200 136)\"/><ellipse cx=\"200\" cy=\"66\" rx=\"20\" ry=\"40\" fill=\"#FFD54F\" transform=\"rotate(210 200 136)\"/><ellipse cx=\"200\" cy=\"66\" rx=\"20\" ry=\"40\" fill=\"#FFD54F\" transform=\"rotate(240 200 136)\"/><ellipse cx=\"200\" cy=\"66\" rx=\"20\" ry=\"40\" fill=\"#FFD54F\" transform=\"rotate(270 200 136)\"/><ellipse cx=\"200\" cy=\"66\" rx=\"20\" ry=\"40\" fill=\"#FFD54F\" transform=\"rotate(300 200 136)\"/><ellipse cx=\"200\" cy=\"66\" rx=\"20\" ry=\"40\" fill=\"#FFD54F\" transform=\"rotate(330 200 136)\"/>"},{"id":"nhuy","svg":"<circle cx=\"200\" cy=\"136\" r=\"52\" fill=\"#8D5A33\"/>"},{"id":"cham","svg":"<circle cx=\"178\" cy=\"104\" r=\"3.5\" fill=\"#5D3A1E\" stroke=\"none\"/><circle cx=\"200\" cy=\"98\" r=\"3.5\" fill=\"#5D3A1E\" stroke=\"none\"/><circle cx=\"222\" cy=\"104\" r=\"3.5\" fill=\"#5D3A1E\" stroke=\"none\"/><circle cx=\"170\" cy=\"124\" r=\"3.5\" fill=\"#5D3A1E\" stroke=\"none\"/><circle cx=\"230\" cy=\"124\" r=\"3.5\" fill=\"#5D3A1E\" stroke=\"none\"/><circle cx=\"182\" cy=\"170\" r=\"3.5\" fill=\"#5D3A1E\" stroke=\"none\"/><circle cx=\"218\" cy=\"170\" r=\"3.5\" fill=\"#5D3A1E\" stroke=\"none\"/>"},{"id":"mat","svg":"<circle cx=\"182\" cy=\"132\" r=\"8\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"184.8\" cy=\"129.2\" r=\"2.64\" fill=\"#fff\" stroke=\"none\"/><circle cx=\"218\" cy=\"132\" r=\"8\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"220.8\" cy=\"129.2\" r=\"2.64\" fill=\"#fff\" stroke=\"none\"/><ellipse cx=\"170\" cy=\"150\" rx=\"8\" ry=\"5\" fill=\"#F8A5B8\" stroke=\"none\" opacity=\".9\"/><ellipse cx=\"230\" cy=\"150\" rx=\"8\" ry=\"5\" fill=\"#F8A5B8\" stroke=\"none\" opacity=\".9\"/><path d=\"M191.0 150 Q200 159 209.0 150\" fill=\"none\" stroke-width=\"4\"/>"},{"id":"co","svg":"<path d=\"M110 360 L126 334 L136 360 L150 330 L162 360 L238 360 L250 332 L262 360 L276 336 L290 360 Z\" fill=\"#9CCC65\"/>"}],"steps":[{"title":"Vẽ nhụy hoa","instruction":"Vẽ một hình tròn ở phía trên tờ giấy. Đây là nhụy hoa.","parts":["nhuy"],"tip":""},{"title":"Vẽ cánh hoa","instruction":"Quanh nhụy, vẽ thật nhiều cánh hoa hình giọt nước, xếp đều thành một vòng.","parts":["canh_hoa"],"tip":"Vẽ 4 cánh ở trên, dưới, trái, phải trước, rồi vẽ thêm vào giữa cho đều."},{"title":"Vẽ mặt cười","instruction":"Vẽ hai mắt, hai má và một nụ cười trong nhụy hoa.","parts":["mat"],"tip":""},{"title":"Vẽ hạt hoa","instruction":"Chấm vài chấm nhỏ quanh mặt làm hạt hướng dương.","parts":["cham"],"tip":""},{"title":"Vẽ thân cây","instruction":"Dưới bông hoa, vẽ hai đường thẳng dài làm thân cây.","parts":["than"],"tip":""},{"title":"Vẽ lá","instruction":"Vẽ hai chiếc lá hai bên thân, mỗi lá có một đường gân ở giữa.","parts":["la"],"tip":""},{"title":"Vẽ cỏ","instruction":"Dưới cùng, vẽ một hàng cỏ răng cưa.","parts":["co"],"tip":""},{"title":"Tô màu","instruction":"Tô màu cho bức tranh giống tranh mẫu, hoặc chọn những màu bé thích nhất.","parts":[],"tip":"Tô từ phần to trước, phần nhỏ sau. Tô nhẹ tay để màu đều.","color":true}]},{"id":"mushroom_house","imageId":"noi_chon_mushroom_house","title":"Ngôi nhà nấm","difficulty":"Dễ","tone":"pink","palette":["#3B2314","#FFF3E0","#E53935","#A0673A","#FDD835","#B3E5FC","#9CCC65","#3E9B3E"],"parts":[{"id":"than","svg":"<path d=\"M126 196 C120 260 118 320 128 346 L272 346 C282 320 280 260 274 196 Z\" fill=\"#FFF3E0\"/>"},{"id":"mu_nam","svg":"<path d=\"M56 206 C56 110 130 52 200 52 C270 52 344 110 344 206 C320 222 80 222 56 206 Z\" fill=\"#E53935\"/>"},{"id":"cham_bi","svg":"<circle cx=\"200\" cy=\"96\" r=\"22\" fill=\"#fff\" stroke-width=\"4\"/><circle cx=\"122\" cy=\"150\" r=\"18\" fill=\"#fff\" stroke-width=\"4\"/><circle cx=\"278\" cy=\"150\" r=\"18\" fill=\"#fff\" stroke-width=\"4\"/><circle cx=\"196\" cy=\"168\" r=\"13\" fill=\"#fff\" stroke-width=\"4\"/><circle cx=\"148\" cy=\"98\" r=\"10\" fill=\"#fff\" stroke-width=\"3.5\"/><circle cx=\"252\" cy=\"98\" r=\"10\" fill=\"#fff\" stroke-width=\"3.5\"/>"},{"id":"cua","svg":"<path d=\"M176 346 L176 282 C176 252 224 252 224 282 L224 346 Z\" fill=\"#A0673A\"/><circle cx=\"214\" cy=\"306\" r=\"5\" fill=\"#FDD835\" stroke-width=\"3\"/>"},{"id":"cua_so","svg":"<circle cx=\"152\" cy=\"252\" r=\"18\" fill=\"#B3E5FC\"/><path d=\"M134 252 L170 252 M152 234 L152 270\" fill=\"none\" stroke-width=\"3.5\"/><circle cx=\"248\" cy=\"252\" r=\"18\" fill=\"#B3E5FC\"/><path d=\"M230 252 L266 252 M248 234 L248 270\" fill=\"none\" stroke-width=\"3.5\"/>"},{"id":"co","svg":"<path d=\"M40 346 L360 346 L360 366 L40 366 Z\" fill=\"#9CCC65\"/><path d=\"M60 346 L66 330 L72 346 M330 346 L336 328 L342 346 M100 346 L104 334 L110 346\" fill=\"#9CCC65\" stroke-width=\"4\"/>"},{"id":"hoa","svg":"<path d=\"M80 346 L80 316 M320 346 L320 312\" fill=\"none\" stroke=\"#3E9B3E\" stroke-width=\"4.5\"/><circle cx=\"80\" cy=\"310\" r=\"10\" fill=\"#F06292\" stroke-width=\"4\"/><circle cx=\"320\" cy=\"306\" r=\"10\" fill=\"#FFD54F\" stroke-width=\"4\"/>"}],"steps":[{"title":"Vẽ mũ nấm","instruction":"Vẽ một nửa hình tròn thật to, đáy hơi cong. Đây là mái nhà nấm.","parts":["mu_nam"],"tip":""},{"title":"Vẽ thân nấm","instruction":"Dưới mái, vẽ thân nấm hơi phình ra ở dưới. Đây là bức tường.","parts":["than"],"tip":""},{"title":"Vẽ cửa ra vào","instruction":"Giữa thân, vẽ cái cửa có đỉnh tròn và một tay nắm nhỏ.","parts":["cua"],"tip":""},{"title":"Vẽ cửa sổ","instruction":"Hai bên cửa, vẽ hai cửa sổ tròn, mỗi cửa có hình chữ thập ở giữa.","parts":["cua_so"],"tip":""},{"title":"Vẽ chấm bi","instruction":"Vẽ các hình tròn to nhỏ trên mũ nấm.","parts":["cham_bi"],"tip":""},{"title":"Vẽ bãi cỏ","instruction":"Dưới chân nhà, vẽ một dải cỏ có vài ngọn cỏ nhọn.","parts":["co"],"tip":""},{"title":"Vẽ hoa","instruction":"Vẽ hai bông hoa nhỏ hai bên nhà.","parts":["hoa"],"tip":""},{"title":"Tô màu","instruction":"Tô màu cho bức tranh giống tranh mẫu, hoặc chọn những màu bé thích nhất.","parts":[],"tip":"Tô từ phần to trước, phần nhỏ sau. Tô nhẹ tay để màu đều.","color":true}]},{"id":"owl","imageId":"dong_vat_owl","title":"Cú mèo trên cành","difficulty":"Vừa","tone":"purple","palette":["#3B2314","#A0673A","#7CC25A","#F5D7B0","#FDB94E","#F59E0B"],"parts":[{"id":"canh_cay","svg":"<path d=\"M40 318 C120 304 280 304 360 318 L360 338 C280 326 120 326 40 338 Z\" fill=\"#A0673A\"/><path d=\"M320 316 C330 290 356 286 370 296 C360 314 340 320 320 316 Z\" fill=\"#7CC25A\"/><path d=\"M80 320 C70 296 46 292 32 302 C44 318 62 324 80 320 Z\" fill=\"#7CC25A\"/>"},{"id":"than","svg":"<path d=\"M200 60 C136 60 112 110 112 190 C112 266 150 318 200 318 C250 318 288 266 288 190 C288 110 264 60 200 60 Z\" fill=\"#B57A4A\"/>"},{"id":"tai","svg":"<path d=\"M126 92 L118 46 L162 72 Z M274 92 L282 46 L238 72 Z\" fill=\"#B57A4A\"/>"},{"id":"bung","svg":"<path d=\"M150 210 C150 170 250 170 250 210 C250 268 228 300 200 300 C172 300 150 268 150 210 Z\" fill=\"#F5D7B0\"/><path d=\"M176 216 L184 224 L192 216 M208 216 L216 224 L224 216 M188 244 L196 252 L204 244 M204 244 L212 252 L220 244 M180 270 L188 278 L196 270 M204 270 L212 278 L220 270\" fill=\"none\" stroke-width=\"3\"/>"},{"id":"canh","svg":"<path d=\"M114 168 C86 198 92 262 134 286 C142 250 140 206 114 168 Z M286 168 C314 198 308 262 266 286 C258 250 260 206 286 168 Z\" fill=\"#8D5A33\"/>"},{"id":"mat","svg":"<circle cx=\"162\" cy=\"132\" r=\"36\" fill=\"#FFFFFF\"/><circle cx=\"238\" cy=\"132\" r=\"36\" fill=\"#FFFFFF\"/><circle cx=\"162\" cy=\"132\" r=\"24\" fill=\"#FDB94E\" stroke-width=\"3.5\"/><circle cx=\"238\" cy=\"132\" r=\"24\" fill=\"#FDB94E\" stroke-width=\"3.5\"/><circle cx=\"162\" cy=\"132\" r=\"12\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"166.2\" cy=\"127.8\" r=\"3.96\" fill=\"#fff\" stroke=\"none\"/><circle cx=\"238\" cy=\"132\" r=\"12\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"242.2\" cy=\"127.8\" r=\"3.96\" fill=\"#fff\" stroke=\"none\"/>"},{"id":"mo","svg":"<path d=\"M188 160 L212 160 L200 184 Z\" fill=\"#F59E0B\"/>"},{"id":"chan","svg":"<path d=\"M170 310 L164 330 M178 312 L178 332 M186 310 L192 330 M214 310 L208 330 M222 312 L222 332 M230 310 L236 330\" fill=\"none\" stroke=\"#E07B12\" stroke-width=\"6\"/>"}],"steps":[{"title":"Vẽ thân","instruction":"Vẽ một hình quả trứng to, đầu nhỏ ở trên. Đây là thân cú.","parts":["than"],"tip":""},{"title":"Vẽ hai tai","instruction":"Trên đỉnh đầu, vẽ hai chỏm tai nhọn.","parts":["tai"],"tip":""},{"title":"Vẽ đôi mắt to","instruction":"Vẽ hai vòng tròn to cạnh nhau, bên trong mỗi vòng có một vòng nhỏ hơn và con ngươi.","parts":["mat"],"tip":"Mắt cú rất to, chiếm gần nửa khuôn mặt."},{"title":"Vẽ mỏ","instruction":"Giữa hai mắt, vẽ cái mỏ nhỏ hình tam giác chúc xuống.","parts":["mo"],"tip":""},{"title":"Vẽ bụng","instruction":"Vẽ cái bụng tròn ở giữa thân, trên bụng có những chữ V nhỏ làm lông.","parts":["bung"],"tip":""},{"title":"Vẽ hai cánh","instruction":"Hai bên thân, vẽ hai cánh hình chiếc lá úp vào người.","parts":["canh"],"tip":""},{"title":"Vẽ chân","instruction":"Dưới thân, vẽ hai bàn chân nhỏ, mỗi bàn ba ngón.","parts":["chan"],"tip":""},{"title":"Vẽ cành cây","instruction":"Vẽ cành cây nằm ngang dưới chân cú, hai đầu có hai chiếc lá.","parts":["canh_cay"],"tip":""},{"title":"Tô màu","instruction":"Tô màu cho bức tranh giống tranh mẫu, hoặc chọn những màu bé thích nhất.","parts":[],"tip":"Tô từ phần to trước, phần nhỏ sau. Tô nhẹ tay để màu đều.","color":true}]},{"id":"cactus","imageId":"cay_coi_cactus","title":"Chậu xương rồng","difficulty":"Vừa","tone":"teal","palette":["#3B2314","#66BB6A","#F06292","#FFF176","#F8A5B8","#E07A4F","#F0956B","#FFF3E0"],"parts":[{"id":"nhanh","svg":"<path d=\"M150 230 C112 230 104 206 104 170 C104 154 128 154 128 170 C128 196 132 204 150 204 Z\" fill=\"#66BB6A\"/><path d=\"M250 210 C288 210 296 186 296 150 C296 134 272 134 272 150 C272 176 268 184 250 184 Z\" fill=\"#66BB6A\"/>"},{"id":"than","svg":"<path d=\"M150 290 L150 120 C150 64 250 64 250 120 L250 290 Z\" fill=\"#81C784\"/>"},{"id":"gai","svg":"<path d=\"M170 110 L162 104 M232 110 L240 104 M166 160 L156 158 M234 160 L244 158 M168 210 L158 212 M232 210 L242 212 M114 182 L106 178 M286 160 L294 156\" fill=\"none\" stroke-width=\"3.5\"/>"},{"id":"hoa","svg":"<path d=\"M200 60 C188 40 196 26 206 34 C214 22 230 30 222 46 C238 46 238 64 222 64 C226 80 208 82 204 68 Z\" fill=\"#F06292\"/><circle cx=\"208\" cy=\"52\" r=\"6\" fill=\"#FFF176\" stroke-width=\"3\"/>"},{"id":"mat","svg":"<circle cx=\"180\" cy=\"150\" r=\"8\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"182.8\" cy=\"147.2\" r=\"2.64\" fill=\"#fff\" stroke=\"none\"/><circle cx=\"220\" cy=\"150\" r=\"8\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"222.8\" cy=\"147.2\" r=\"2.64\" fill=\"#fff\" stroke=\"none\"/><ellipse cx=\"168\" cy=\"170\" rx=\"8\" ry=\"5\" fill=\"#F8A5B8\" stroke=\"none\" opacity=\".9\"/><ellipse cx=\"232\" cy=\"170\" rx=\"8\" ry=\"5\" fill=\"#F8A5B8\" stroke=\"none\" opacity=\".9\"/><path d=\"M192.0 168 Q200 176 208.0 168\" fill=\"none\" stroke-width=\"4\"/>"},{"id":"chau","svg":"<path d=\"M128 290 L272 290 L256 362 L144 362 Z\" fill=\"#E07A4F\"/>"},{"id":"mieng_chau","svg":"<path d=\"M118 272 L282 272 L282 298 L118 298 Z\" fill=\"#F0956B\"/>"},{"id":"trang_tri","svg":"<path d=\"M170 326 L184 316 L198 326 L212 316 L226 326\" fill=\"none\" stroke=\"#FFF3E0\" stroke-width=\"5\"/>"}],"steps":[{"title":"Vẽ thân","instruction":"Vẽ một hình chữ nhật đứng, đỉnh bo tròn. Đây là thân xương rồng.","parts":["than"],"tip":""},{"title":"Vẽ hai nhánh","instruction":"Hai bên thân, vẽ hai nhánh cong chĩa lên như hai cánh tay.","parts":["nhanh"],"tip":""},{"title":"Vẽ miệng chậu","instruction":"Dưới thân, vẽ một hình chữ nhật nằm ngang làm miệng chậu.","parts":["mieng_chau"],"tip":""},{"title":"Vẽ chậu","instruction":"Dưới miệng chậu, vẽ thân chậu hẹp dần xuống đáy.","parts":["chau"],"tip":""},{"title":"Vẽ mặt","instruction":"Vẽ hai mắt, hai má và một nụ cười trên thân xương rồng.","parts":["mat"],"tip":""},{"title":"Vẽ gai","instruction":"Vẽ các vạch ngắn quanh mép thân và nhánh làm gai.","parts":["gai"],"tip":""},{"title":"Vẽ bông hoa","instruction":"Trên đỉnh, vẽ một bông hoa nhỏ có nhụy tròn.","parts":["hoa"],"tip":""},{"title":"Trang trí chậu","instruction":"Vẽ một đường gấp khúc trên thân chậu.","parts":["trang_tri"],"tip":""},{"title":"Tô màu","instruction":"Tô màu cho bức tranh giống tranh mẫu, hoặc chọn những màu bé thích nhất.","parts":[],"tip":"Tô từ phần to trước, phần nhỏ sau. Tô nhẹ tay để màu đều.","color":true}]},{"id":"rooster","imageId":"dong_vat_rooster","title":"Chú gà trống","difficulty":"Vừa","tone":"amber","palette":["#3B2314","#E07B12","#FBA829","#FDE047","#E53935","#F8A5B8"],"parts":[{"id":"chan","svg":"<g fill=\"none\" stroke=\"#E07B12\" stroke-width=\"7\"><path d=\"M182 300 L176 352 M176 352 L158 360 M176 352 L176 364 M176 352 L194 360\"/><path d=\"M226 302 L232 352 M232 352 L214 360 M232 352 L234 364 M232 352 L250 358\"/></g>"},{"id":"duoi","svg":"<path d=\"M262 214 C268 168 284 128 312 112 C330 104 344 118 336 138 C352 132 366 146 356 164 C372 166 378 186 362 198 C374 212 364 234 342 232 C320 238 290 236 270 230 Z\" fill=\"#F59E0B\"/><path d=\"M290 196 C298 168 310 146 326 132 M300 212 C316 192 334 176 350 168 M296 226 C320 220 340 214 356 204\" fill=\"none\" stroke-width=\"3.5\"/>"},{"id":"than","svg":"<path d=\"M140 156 C104 186 98 262 150 296 C196 326 268 318 296 270 C312 240 302 208 276 198 C252 190 228 196 210 178 Z\" fill=\"#FBA829\"/>"},{"id":"canh","svg":"<path d=\"M184 240 C196 208 250 196 280 212 Q296 222 284 234 Q294 246 278 254 Q284 268 262 266 Q256 278 236 272 C214 272 188 266 184 252 C182 248 182 244 184 240 Z\" fill=\"#FDE047\"/><path d=\"M204 246 C226 236 250 230 274 226 M210 258 C232 252 254 248 272 248\" fill=\"none\" stroke-width=\"3.5\"/>"},{"id":"dau","svg":"<path d=\"M118 104 C118 66 162 52 190 70 C214 86 218 120 212 150 L218 172 Q210 194 196 180 Q186 198 172 182 Q160 200 148 182 Q134 196 126 178 Q114 166 120 148 C112 134 114 118 118 104 Z\" fill=\"#FDD835\"/>"},{"id":"mao","svg":"<path d=\"M138 70 C126 52 140 36 154 46 C154 28 176 24 180 42 C188 30 210 36 204 56 C198 66 186 66 176 64 C162 62 150 66 138 70 Z\" fill=\"#E53935\"/>"},{"id":"mo","svg":"<path d=\"M120 102 L88 114 L120 126 Z\" fill=\"#F59E0B\"/><path d=\"M90 114 L118 114\" fill=\"none\" stroke-width=\"3\"/><path d=\"M118 126 C106 132 104 152 116 156 C128 158 132 142 126 128 Z\" fill=\"#E53935\"/>"},{"id":"mat","svg":"<circle cx=\"148\" cy=\"96\" r=\"9\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"151.15\" cy=\"92.85\" r=\"2.97\" fill=\"#fff\" stroke=\"none\"/><ellipse cx=\"166\" cy=\"120\" rx=\"11\" ry=\"6.5\" fill=\"#F8A5B8\" stroke=\"none\" opacity=\".9\"/>"}],"steps":[{"title":"Vẽ đầu và cổ","instruction":"Vẽ cái đầu tròn hơi dài, phía dưới cổ có viền lông lượn sóng.","parts":["dau"],"tip":"Viền lông lượn sóng giống mấy cái chén úp sát nhau."},{"title":"Vẽ thân","instruction":"Dưới cổ, vẽ thân gà to tròn như quả trứng nằm nghiêng.","parts":["than"],"tip":""},{"title":"Vẽ mào","instruction":"Trên đỉnh đầu, vẽ cái mào có ba chỏm tròn.","parts":["mao"],"tip":""},{"title":"Vẽ mỏ và yếm","instruction":"Bên trái đầu, vẽ cái mỏ hình tam giác. Dưới mỏ vẽ cái yếm hình giọt nước.","parts":["mo"],"tip":""},{"title":"Vẽ mắt và má","instruction":"Vẽ một chấm mắt tròn và một má hồng.","parts":["mat"],"tip":""},{"title":"Vẽ cánh","instruction":"Giữa thân, vẽ cái cánh hình chiếc lá, mép sau lượn sóng, bên trong có hai vạch lông.","parts":["canh"],"tip":""},{"title":"Vẽ đuôi","instruction":"Bên phải thân, vẽ cái đuôi xoè như cái quạt, có ba nét lông dài.","parts":["duoi"],"tip":""},{"title":"Vẽ chân","instruction":"Dưới thân, vẽ hai cái chân dài, mỗi chân có ba ngón.","parts":["chan"],"tip":""},{"title":"Tô màu","instruction":"Tô màu cho bức tranh giống tranh mẫu, hoặc chọn những màu bé thích nhất.","parts":[],"tip":"Tô từ phần to trước, phần nhỏ sau. Tô nhẹ tay để màu đều.","color":true}]},{"id":"birthday_cake","imageId":"do_an_birthday_cake","title":"Bánh sinh nhật","difficulty":"Vừa","tone":"pink","palette":["#3B2314","#FFCC80","#F48FB1","#FFF59D","#90CAF9","#FFB300"],"parts":[{"id":"dia","svg":"<ellipse cx=\"200\" cy=\"352\" rx=\"156\" ry=\"20\" fill=\"#E3F2FD\"/>"},{"id":"tang_duoi","svg":"<path d=\"M76 254 L324 254 L324 344 L76 344 Z\" fill=\"#FFCC80\"/>"},{"id":"kem_duoi","svg":"<path d=\"M70 252 L330 252 L330 268 C318 286 306 266 296 280 C284 296 272 270 260 282 C248 296 236 270 224 282 C212 296 200 270 188 282 C176 296 164 270 152 282 C140 296 128 270 116 282 C104 296 92 270 70 270 Z\" fill=\"#FFFFFF\"/>"},{"id":"tang_tren","svg":"<path d=\"M120 176 L280 176 L280 254 L120 254 Z\" fill=\"#F48FB1\"/>"},{"id":"kem_tren","svg":"<path d=\"M114 174 L286 174 L286 188 C276 204 266 186 256 198 C246 212 234 188 224 200 C214 212 202 188 192 200 C182 212 170 188 160 200 C150 212 138 188 114 192 Z\" fill=\"#FFFFFF\"/>"},{"id":"trang_tri","svg":"<circle cx=\"150\" cy=\"228\" r=\"7\" fill=\"#FFF59D\" stroke-width=\"3\"/><circle cx=\"200\" cy=\"232\" r=\"7\" fill=\"#90CAF9\" stroke-width=\"3\"/><circle cx=\"250\" cy=\"228\" r=\"7\" fill=\"#FFF59D\" stroke-width=\"3\"/><circle cx=\"110\" cy=\"312\" r=\"7\" fill=\"#F48FB1\" stroke-width=\"3\"/><circle cx=\"170\" cy=\"316\" r=\"7\" fill=\"#90CAF9\" stroke-width=\"3\"/><circle cx=\"230\" cy=\"316\" r=\"7\" fill=\"#F48FB1\" stroke-width=\"3\"/><circle cx=\"290\" cy=\"312\" r=\"7\" fill=\"#90CAF9\" stroke-width=\"3\"/>"},{"id":"nen","svg":"<path d=\"M150 120 L164 120 L164 176 L150 176 Z M193 110 L207 110 L207 176 L193 176 Z M236 120 L250 120 L250 176 L236 176 Z\" fill=\"#90CAF9\"/><path d=\"M150 140 L164 132 M150 158 L164 150 M193 132 L207 124 M193 152 L207 144 M236 140 L250 132 M236 158 L250 150\" fill=\"none\" stroke-width=\"3\"/>"},{"id":"lua","svg":"<path d=\"M157 116 C146 102 152 88 157 80 C162 88 168 102 157 116 Z M200 106 C189 92 195 78 200 70 C205 78 211 92 200 106 Z M243 116 C232 102 238 88 243 80 C248 88 254 102 243 116 Z\" fill=\"#FFB300\"/>"}],"steps":[{"title":"Vẽ tầng dưới","instruction":"Vẽ một hình chữ nhật to nằm ngang. Đây là tầng bánh dưới.","parts":["tang_duoi"],"tip":""},{"title":"Vẽ tầng trên","instruction":"Trên tầng dưới, vẽ một hình chữ nhật nhỏ hơn.","parts":["tang_tren"],"tip":""},{"title":"Vẽ kem tầng dưới","instruction":"Ở mép trên tầng dưới, vẽ một dải kem có mép dưới lượn sóng như kem chảy.","parts":["kem_duoi"],"tip":""},{"title":"Vẽ kem tầng trên","instruction":"Làm y như vậy ở mép trên tầng trên.","parts":["kem_tren"],"tip":""},{"title":"Vẽ đĩa","instruction":"Dưới bánh, vẽ một hình bầu dục dẹt làm đĩa.","parts":["dia"],"tip":""},{"title":"Vẽ ba cây nến","instruction":"Trên nóc bánh, vẽ ba cây nến, cây giữa cao hơn. Vẽ sọc xiên trên nến.","parts":["nen"],"tip":""},{"title":"Vẽ ngọn lửa","instruction":"Trên mỗi cây nến, vẽ một ngọn lửa hình giọt nước.","parts":["lua"],"tip":""},{"title":"Trang trí","instruction":"Vẽ các chấm tròn trang trí trên hai tầng bánh.","parts":["trang_tri"],"tip":""},{"title":"Tô màu","instruction":"Tô màu cho bức tranh giống tranh mẫu, hoặc chọn những màu bé thích nhất.","parts":[],"tip":"Tô từ phần to trước, phần nhỏ sau. Tô nhẹ tay để màu đều.","color":true}]},{"id":"car","imageId":"giao_thong_car","title":"Ô tô con","difficulty":"Vừa","tone":"pink","palette":["#3B2314","#EF5350","#B3E5FC","#FFF176","#FF8A80","#B0BEC5","#455A64","#9E9E9E"],"parts":[{"id":"than","svg":"<path d=\"M40 280 L40 230 C40 214 52 206 68 204 L110 200 L150 150 C156 142 164 138 176 138 L260 138 C272 138 282 144 288 154 L318 202 L344 206 C356 208 362 218 362 230 L362 280 Z\" fill=\"#EF5350\"/>"},{"id":"cua_so","svg":"<path d=\"M124 202 L160 158 L200 158 L200 202 Z\" fill=\"#B3E5FC\"/><path d=\"M216 158 L262 158 C268 158 272 162 276 168 L296 202 L216 202 Z\" fill=\"#B3E5FC\"/>"},{"id":"cua","svg":"<path d=\"M208 206 L208 278\" fill=\"none\" stroke-width=\"4\"/><path d=\"M178 222 L196 222 M222 222 L240 222\" fill=\"none\" stroke-width=\"5\"/>"},{"id":"den","svg":"<path d=\"M342 222 L362 222 L362 244 L346 244 Z\" fill=\"#FFF176\" stroke-width=\"4\"/><path d=\"M40 222 L56 222 L52 242 L40 242 Z\" fill=\"#FF8A80\" stroke-width=\"4\"/>"},{"id":"can","svg":"<path d=\"M30 268 L372 268 L372 290 L30 290 Z\" fill=\"#B0BEC5\"/>"},{"id":"banh_xe","svg":"<circle cx=\"112\" cy=\"288\" r=\"36\" fill=\"#455A64\"/><circle cx=\"290\" cy=\"288\" r=\"36\" fill=\"#455A64\"/>"},{"id":"mam_xe","svg":"<circle cx=\"112\" cy=\"288\" r=\"15\" fill=\"#ECEFF1\"/><circle cx=\"290\" cy=\"288\" r=\"15\" fill=\"#ECEFF1\"/>"},{"id":"duong","svg":"<path d=\"M20 330 L380 330\" fill=\"none\" stroke-width=\"5\"/><path d=\"M60 344 L100 344 M180 344 L220 344 M300 344 L340 344\" fill=\"none\" stroke=\"#9E9E9E\" stroke-width=\"5\"/>"}],"steps":[{"title":"Vẽ thân xe","instruction":"Vẽ thân xe: phần dưới là hình chữ nhật dài, phía trên là cái nóc nhô lên.","parts":["than"],"tip":"Nóc xe nghiêng ở phía trước và phía sau, giống cái mũ."},{"title":"Vẽ cửa kính","instruction":"Trong phần nóc, vẽ hai ô cửa kính.","parts":["cua_so"],"tip":""},{"title":"Vẽ bánh xe","instruction":"Dưới thân, vẽ hai bánh xe tròn to.","parts":["banh_xe"],"tip":""},{"title":"Vẽ mâm xe","instruction":"Trong mỗi bánh xe, vẽ một vòng tròn nhỏ.","parts":["mam_xe"],"tip":""},{"title":"Vẽ cản xe","instruction":"Dưới thân, vẽ một dải dài nằm ngang làm cản xe.","parts":["can"],"tip":""},{"title":"Vẽ cửa xe","instruction":"Vẽ một đường dọc chia cửa xe, thêm hai tay nắm cửa.","parts":["cua"],"tip":""},{"title":"Vẽ đèn","instruction":"Vẽ đèn pha ở đầu xe và đèn hậu ở đuôi xe.","parts":["den"],"tip":""},{"title":"Vẽ con đường","instruction":"Dưới bánh xe, vẽ một đường thẳng và mấy vạch kẻ đường.","parts":["duong"],"tip":""},{"title":"Tô màu","instruction":"Tô màu cho bức tranh giống tranh mẫu, hoặc chọn những màu bé thích nhất.","parts":[],"tip":"Tô từ phần to trước, phần nhỏ sau. Tô nhẹ tay để màu đều.","color":true}]},{"id":"alarm_clock","imageId":"do_vat_alarm_clock","title":"Đồng hồ báo thức","difficulty":"Vừa","tone":"teal","palette":["#3B2314","#FDD835","#42A5F5","#E53935","#F8A5B8"],"parts":[{"id":"chan","svg":"<path d=\"M128 316 L104 352 M272 316 L296 352\" fill=\"none\" stroke-width=\"10\"/>"},{"id":"chuong","svg":"<path d=\"M86 116 C80 72 114 46 148 62 Z\" fill=\"#FDD835\"/><path d=\"M314 116 C320 72 286 46 252 62 Z\" fill=\"#FDD835\"/>"},{"id":"bua","svg":"<path d=\"M200 74 L200 56\" fill=\"none\" stroke-width=\"6\"/><circle cx=\"200\" cy=\"50\" r=\"10\" fill=\"#FDD835\"/>"},{"id":"vo","svg":"<circle cx=\"200\" cy=\"210\" r=\"132\" fill=\"#42A5F5\"/>"},{"id":"mat_so","svg":"<circle cx=\"200\" cy=\"210\" r=\"106\" fill=\"#FFFFFF\"/>"},{"id":"vach","svg":"<circle cx=\"286.0\" cy=\"210.0\" r=\"6\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"274.47818472546174\" cy=\"253.0\" r=\"3.5\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"243.0\" cy=\"284.4781847254617\" r=\"3.5\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"200.0\" cy=\"296.0\" r=\"6\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"157.00000000000003\" cy=\"284.47818472546174\" r=\"3.5\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"125.52181527453827\" cy=\"253.0\" r=\"3.5\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"114.0\" cy=\"210.0\" r=\"6\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"125.52181527453828\" cy=\"167.0\" r=\"3.5\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"156.99999999999997\" cy=\"135.5218152745383\" r=\"3.5\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"199.99999999999997\" cy=\"124.0\" r=\"6\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"243.0\" cy=\"135.52181527453828\" r=\"3.5\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"274.4781847254617\" cy=\"166.99999999999997\" r=\"3.5\" fill=\"#3B2314\" stroke=\"none\"/>"},{"id":"kim","svg":"<path d=\"M200 210 L200 146 M200 210 L248 230\" fill=\"none\" stroke-width=\"7\"/><circle cx=\"200\" cy=\"210\" r=\"8\" fill=\"#E53935\"/>"},{"id":"mat","svg":"<circle cx=\"166\" cy=\"186\" r=\"8\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"168.8\" cy=\"183.2\" r=\"2.64\" fill=\"#fff\" stroke=\"none\"/><circle cx=\"234\" cy=\"186\" r=\"8\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"236.8\" cy=\"183.2\" r=\"2.64\" fill=\"#fff\" stroke=\"none\"/><ellipse cx=\"150\" cy=\"214\" rx=\"10\" ry=\"6\" fill=\"#F8A5B8\" stroke=\"none\" opacity=\".9\"/><ellipse cx=\"250\" cy=\"214\" rx=\"10\" ry=\"6\" fill=\"#F8A5B8\" stroke=\"none\" opacity=\".9\"/><path d=\"M187.0 258 Q200 270 213.0 258\" fill=\"none\" stroke-width=\"4\"/>"}],"steps":[{"title":"Vẽ vỏ đồng hồ","instruction":"Vẽ một hình tròn thật to ở giữa tờ giấy.","parts":["vo"],"tip":""},{"title":"Vẽ mặt số","instruction":"Bên trong, vẽ thêm một hình tròn nhỏ hơn.","parts":["mat_so"],"tip":""},{"title":"Vẽ hai chuông","instruction":"Trên đỉnh, hai bên trái phải, vẽ hai cái chuông hình nửa vòng tròn.","parts":["chuong"],"tip":""},{"title":"Vẽ núm chuông","instruction":"Giữa hai chuông, vẽ một cái núm tròn có chân.","parts":["bua"],"tip":""},{"title":"Vẽ chân","instruction":"Dưới đồng hồ, vẽ hai cái chân xiên ra hai bên.","parts":["chan"],"tip":""},{"title":"Vẽ vạch giờ","instruction":"Chấm 12 chấm quanh mặt số. Bốn chấm ở trên, dưới, trái, phải to hơn.","parts":["vach"],"tip":"Chấm 4 chấm to trước, rồi chia đều chấm nhỏ vào giữa."},{"title":"Vẽ kim","instruction":"Từ tâm, vẽ kim dài chỉ lên trên và kim ngắn chỉ sang phải. Chấm một chấm ở tâm.","parts":["kim"],"tip":""},{"title":"Vẽ mặt cười","instruction":"Vẽ hai mắt, hai má và một nụ cười trên mặt số.","parts":["mat"],"tip":""},{"title":"Tô màu","instruction":"Tô màu cho bức tranh giống tranh mẫu, hoặc chọn những màu bé thích nhất.","parts":[],"tip":"Tô từ phần to trước, phần nhỏ sau. Tô nhẹ tay để màu đều.","color":true}]},{"id":"teapot","imageId":"gia_dung_teapot","title":"Ấm trà hoa","difficulty":"Vừa","tone":"teal","palette":["#3B2314","#4DB6AC","#80CBC4","#FDD835","#FFF59D","#F48FB1","#81C784","#B0BEC5"],"parts":[{"id":"voi","svg":"<path d=\"M102 236 C70 228 56 196 40 168 C34 160 44 152 52 158 C70 176 84 196 108 204 Z\" fill=\"#4DB6AC\"/>"},{"id":"quai","svg":"<path d=\"M292 190 C344 180 360 248 304 284 L296 262 C326 240 322 210 296 212 Z\" fill=\"#4DB6AC\"/>"},{"id":"than","svg":"<path d=\"M100 236 C100 168 148 140 200 140 C252 140 300 168 300 236 C300 296 256 334 200 334 C144 334 100 296 100 236 Z\" fill=\"#80CBC4\"/>"},{"id":"nap","svg":"<path d=\"M136 150 C150 118 250 118 264 150 Z\" fill=\"#4DB6AC\"/><circle cx=\"200\" cy=\"114\" r=\"14\" fill=\"#FDD835\"/>"},{"id":"de","svg":"<path d=\"M136 324 L264 324 L272 350 L128 350 Z\" fill=\"#4DB6AC\"/>"},{"id":"hoa","svg":"<circle cx=\"200\" cy=\"244\" r=\"10\" fill=\"#FFF59D\" stroke-width=\"3.5\"/><ellipse cx=\"200\" cy=\"222\" rx=\"9\" ry=\"13\" fill=\"#F48FB1\" stroke-width=\"3.5\" transform=\"rotate(0 200 244)\"/><ellipse cx=\"200\" cy=\"222\" rx=\"9\" ry=\"13\" fill=\"#F48FB1\" stroke-width=\"3.5\" transform=\"rotate(72 200 244)\"/><ellipse cx=\"200\" cy=\"222\" rx=\"9\" ry=\"13\" fill=\"#F48FB1\" stroke-width=\"3.5\" transform=\"rotate(144 200 244)\"/><ellipse cx=\"200\" cy=\"222\" rx=\"9\" ry=\"13\" fill=\"#F48FB1\" stroke-width=\"3.5\" transform=\"rotate(216 200 244)\"/><ellipse cx=\"200\" cy=\"222\" rx=\"9\" ry=\"13\" fill=\"#F48FB1\" stroke-width=\"3.5\" transform=\"rotate(288 200 244)\"/><circle cx=\"200\" cy=\"244\" r=\"9\" fill=\"#FFF59D\" stroke-width=\"3.5\"/>"},{"id":"la","svg":"<path d=\"M150 270 C136 258 136 244 144 240 C156 244 160 258 150 270 Z M250 270 C264 258 264 244 256 240 C244 244 240 258 250 270 Z\" fill=\"#81C784\" stroke-width=\"3.5\"/>"},{"id":"hoi","svg":"<path d=\"M44 132 C34 116 54 106 44 88 M64 120 C54 104 74 94 64 76\" fill=\"none\" stroke=\"#B0BEC5\" stroke-width=\"5\"/>"}],"steps":[{"title":"Vẽ thân ấm","instruction":"Vẽ một hình tròn hơi dẹt thật to làm thân ấm.","parts":["than"],"tip":""},{"title":"Vẽ nắp ấm","instruction":"Trên thân, vẽ cái nắp hình vòm và một núm tròn trên đỉnh.","parts":["nap"],"tip":""},{"title":"Vẽ đế","instruction":"Dưới thân, vẽ cái đế hình thang.","parts":["de"],"tip":""},{"title":"Vẽ vòi","instruction":"Bên trái, vẽ cái vòi cong vươn lên.","parts":["voi"],"tip":""},{"title":"Vẽ quai","instruction":"Bên phải, vẽ cái quai cong như tai.","parts":["quai"],"tip":""},{"title":"Vẽ bông hoa","instruction":"Giữa thân ấm, vẽ một bông hoa năm cánh có nhụy tròn.","parts":["hoa"],"tip":""},{"title":"Vẽ lá","instruction":"Hai bên bông hoa, vẽ hai chiếc lá nhỏ.","parts":["la"],"tip":""},{"title":"Vẽ hơi nóng","instruction":"Trên vòi ấm, vẽ hai làn hơi lượn sóng bay lên.","parts":["hoi"],"tip":""},{"title":"Tô màu","instruction":"Tô màu cho bức tranh giống tranh mẫu, hoặc chọn những màu bé thích nhất.","parts":[],"tip":"Tô từ phần to trước, phần nhỏ sau. Tô nhẹ tay để màu đều.","color":true}]},{"id":"goldfish","imageId":"dong_vat_goldfish","title":"Cá vàng tung tăng","difficulty":"Vừa","tone":"amber","palette":["#3B2314","#FF9F43","#FFD180","#F8A5B8"],"parts":[{"id":"duoi","svg":"<path d=\"M262 196 C296 150 344 130 360 150 C368 166 340 192 330 206 C344 222 370 250 360 264 C344 282 296 262 262 216 Z\" fill=\"#FF9F43\"/><path d=\"M290 196 C312 176 334 162 350 156 M290 214 C312 232 334 248 350 256\" fill=\"none\" stroke-width=\"3.5\"/>"},{"id":"vay_tren","svg":"<path d=\"M150 136 C164 92 212 82 246 104 C238 118 226 128 214 136 Z\" fill=\"#FF9F43\"/>"},{"id":"vay_duoi","svg":"<path d=\"M176 270 C176 298 196 316 222 316 C222 296 214 280 204 270 Z\" fill=\"#FF9F43\"/>"},{"id":"than","svg":"<path d=\"M70 206 C70 152 128 124 186 124 C240 124 274 170 274 206 C274 244 240 286 186 286 C128 286 70 260 70 206 Z\" fill=\"#FFB74D\"/>"},{"id":"mang","svg":"<path d=\"M128 150 C146 180 146 236 128 264\" fill=\"none\" stroke-width=\"4.5\"/>"},{"id":"vay","svg":"<path d=\"M170 170 q14 14 28 0 q14 14 28 0 M162 206 q14 14 28 0 q14 14 28 0 q14 14 28 0 M170 242 q14 14 28 0 q14 14 28 0\" fill=\"none\" stroke-width=\"3.5\"/>"},{"id":"vay_canh","svg":"<path d=\"M150 230 C168 232 184 246 186 262 C168 262 152 250 150 230 Z\" fill=\"#FFD180\" stroke-width=\"3.5\"/>"},{"id":"mat","svg":"<circle cx=\"104\" cy=\"190\" r=\"10\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"107.5\" cy=\"186.5\" r=\"3.3000000000000003\" fill=\"#fff\" stroke=\"none\"/><ellipse cx=\"110\" cy=\"218\" rx=\"9\" ry=\"5\" fill=\"#F8A5B8\" stroke=\"none\" opacity=\".9\"/><path d=\"M81.0 222 Q88 228 95.0 222\" fill=\"none\" stroke-width=\"4\"/>"},{"id":"bong_bong","svg":"<circle cx=\"48\" cy=\"150\" r=\"12\" fill=\"#E3F4FF\" stroke-width=\"3.5\"/><circle cx=\"36\" cy=\"112\" r=\"8\" fill=\"#E3F4FF\" stroke-width=\"3.5\"/><circle cx=\"54\" cy=\"82\" r=\"5\" fill=\"#E3F4FF\" stroke-width=\"3\"/>"}],"steps":[{"title":"Vẽ thân cá","instruction":"Vẽ một hình bầu dục to nằm ngang. Đây là thân cá.","parts":["than"],"tip":""},{"title":"Vẽ đuôi","instruction":"Bên phải thân, vẽ cái đuôi to xoè ra như hình trái tim nằm nghiêng.","parts":["duoi"],"tip":""},{"title":"Vẽ vây lưng","instruction":"Trên lưng cá, vẽ một cái vây cong.","parts":["vay_tren"],"tip":""},{"title":"Vẽ vây bụng","instruction":"Dưới bụng cá, vẽ một cái vây nhỏ.","parts":["vay_duoi"],"tip":""},{"title":"Vẽ mắt và miệng","instruction":"Gần đầu, vẽ một chấm mắt, má hồng và nụ cười.","parts":["mat"],"tip":""},{"title":"Vẽ mang","instruction":"Sau mắt, vẽ một đường cong từ trên xuống dưới làm mang cá.","parts":["mang"],"tip":""},{"title":"Vẽ vảy","instruction":"Vẽ ba hàng vảy hình chữ U nhỏ nối tiếp nhau trên thân cá.","parts":["vay"],"tip":"Vảy giống những nụ cười nhỏ xếp hàng."},{"title":"Vẽ vây bên","instruction":"Trên thân, gần bụng, vẽ một cái vây nhỏ hình giọt nước.","parts":["vay_canh"],"tip":""},{"title":"Vẽ bong bóng","instruction":"Trước miệng cá, vẽ ba bong bóng tròn từ to đến nhỏ.","parts":["bong_bong"],"tip":""},{"title":"Tô màu","instruction":"Tô màu cho bức tranh giống tranh mẫu, hoặc chọn những màu bé thích nhất.","parts":[],"tip":"Tô từ phần to trước, phần nhỏ sau. Tô nhẹ tay để màu đều.","color":true}]},{"id":"ice_cream","imageId":"do_an_ice_cream","title":"Kem ốc quế","difficulty":"Vừa","tone":"pink","palette":["#3B2314","#F4C27A","#C98B3E","#F8BBD0","#A5D6A7","#A1887F","#E53935","#FFEB3B"],"parts":[{"id":"oc_que","svg":"<path d=\"M136 214 L264 214 L200 370 Z\" fill=\"#F4C27A\"/>"},{"id":"o_ke","svg":"<path d=\"M156 214 L222 316 M190 214 L240 290 M226 214 L252 254 M244 214 L178 316 M210 214 L160 290 M174 214 L148 254\" fill=\"none\" stroke=\"#C98B3E\" stroke-width=\"3.5\"/>"},{"id":"vien_kem","svg":"<path d=\"M128 214 C128 192 272 192 272 214 C272 234 254 228 248 244 C240 230 226 240 220 230 C210 246 192 238 186 230 C178 244 160 236 156 228 C146 240 128 234 128 214 Z\" fill=\"#F8BBD0\"/>"},{"id":"kem_giua","svg":"<path d=\"M140 196 C130 150 168 128 200 132 C232 128 270 150 260 196 Z\" fill=\"#A5D6A7\"/>"},{"id":"kem_tren","svg":"<path d=\"M156 140 C150 96 176 78 200 80 C224 78 250 96 244 140 C224 152 176 152 156 140 Z\" fill=\"#A1887F\"/>"},{"id":"kem_chay","svg":"<path d=\"M164 196 C164 214 176 214 176 196 M224 196 C224 220 238 220 238 196\" fill=\"#A5D6A7\" stroke-width=\"4\"/>"},{"id":"anh_dao","svg":"<path d=\"M206 62 C210 42 222 32 234 30\" fill=\"none\" stroke-width=\"4\"/><circle cx=\"200\" cy=\"72\" r=\"16\" fill=\"#E53935\"/><circle cx=\"195\" cy=\"66\" r=\"4\" fill=\"#fff\" stroke=\"none\"/>"},{"id":"com","svg":"<path d=\"M176 108 L184 104 M214 102 L222 106 M190 122 L196 116 M226 122 L232 126 M170 166 L178 162 M222 168 L230 164 M196 176 L204 176\" fill=\"none\" stroke=\"#FFEB3B\" stroke-width=\"5\"/>"},{"id":"mat","svg":"<circle cx=\"184\" cy=\"170\" r=\"7\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"186.45\" cy=\"167.55\" r=\"2.31\" fill=\"#fff\" stroke=\"none\"/><circle cx=\"216\" cy=\"170\" r=\"7\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"218.45\" cy=\"167.55\" r=\"2.31\" fill=\"#fff\" stroke=\"none\"/><path d=\"M193.0 180 Q200 186 207.0 180\" fill=\"none\" stroke-width=\"3.5\"/>"}],"steps":[{"title":"Vẽ ốc quế","instruction":"Vẽ một hình tam giác chúc mũi nhọn xuống dưới. Đây là ốc quế.","parts":["oc_que"],"tip":""},{"title":"Vẽ viên kem dưới","instruction":"Trên miệng ốc quế, vẽ viên kem đầu tiên có mép dưới lượn sóng.","parts":["vien_kem"],"tip":""},{"title":"Vẽ viên kem giữa","instruction":"Trên viên dưới, vẽ viên kem thứ hai tròn như cái vòm.","parts":["kem_giua"],"tip":""},{"title":"Vẽ viên kem trên","instruction":"Trên cùng, vẽ viên kem thứ ba nhỏ hơn.","parts":["kem_tren"],"tip":""},{"title":"Vẽ kem chảy","instruction":"Vẽ hai giọt kem chảy xuống từ viên kem giữa.","parts":["kem_chay"],"tip":""},{"title":"Vẽ quả anh đào","instruction":"Trên đỉnh, vẽ một quả anh đào tròn có cuống cong.","parts":["anh_dao"],"tip":""},{"title":"Vẽ ô kẻ ốc quế","instruction":"Kẻ các đường chéo bắt chéo nhau trên ốc quế, thành những ô hình thoi.","parts":["o_ke"],"tip":""},{"title":"Vẽ mặt cười","instruction":"Vẽ hai mắt và nụ cười trên viên kem giữa.","parts":["mat"],"tip":""},{"title":"Vẽ cốm","instruction":"Vẽ những vạch ngắn nho nhỏ trên kem làm cốm rắc.","parts":["com"],"tip":""},{"title":"Tô màu","instruction":"Tô màu cho bức tranh giống tranh mẫu, hoặc chọn những màu bé thích nhất.","parts":[],"tip":"Tô từ phần to trước, phần nhỏ sau. Tô nhẹ tay để màu đều.","color":true}]},{"id":"train","imageId":"giao_thong_train","title":"Tàu hoả xình xịch","difficulty":"Vừa","tone":"amber","palette":["#3B2314","#64B5F6","#1E88E5","#FFF9C4","#EF5350","#FFB74D","#8D6E63","#B3E5FC"],"parts":[{"id":"ray","svg":"<path d=\"M14 336 L386 336\" fill=\"none\" stroke-width=\"6\"/><path d=\"M40 336 L36 350 M90 336 L86 350 M140 336 L136 350 M190 336 L186 350 M240 336 L236 350 M290 336 L286 350 M340 336 L336 350\" fill=\"none\" stroke-width=\"4\"/>"},{"id":"toa","svg":"<path d=\"M30 200 L150 200 L150 300 L30 300 Z\" fill=\"#64B5F6\"/><path d=\"M24 188 L156 188 L156 204 L24 204 Z\" fill=\"#1E88E5\"/><path d=\"M48 222 L82 222 L82 256 L48 256 Z M98 222 L132 222 L132 256 L98 256 Z\" fill=\"#FFF9C4\" stroke-width=\"4\"/>"},{"id":"noi","svg":"<path d=\"M150 284 L176 284\" fill=\"none\" stroke-width=\"6\"/>"},{"id":"dau_tau","svg":"<path d=\"M176 300 L176 210 L300 210 L300 240 L362 240 C372 240 378 248 378 256 L378 300 Z\" fill=\"#EF5350\"/>"},{"id":"buong_lai","svg":"<path d=\"M176 150 L262 150 L262 210 L176 210 Z\" fill=\"#FFB74D\"/><path d=\"M166 136 L272 136 L272 154 L166 154 Z\" fill=\"#8D6E63\"/><path d=\"M196 166 L242 166 L242 198 L196 198 Z\" fill=\"#B3E5FC\" stroke-width=\"4\"/>"},{"id":"ong_khoi","svg":"<path d=\"M318 240 L318 192 L346 192 L346 240 Z\" fill=\"#455A64\"/><path d=\"M310 180 L354 180 L350 194 L314 194 Z\" fill=\"#455A64\"/>"},{"id":"khoi","svg":"<path d=\"M318 168 C300 168 298 146 316 144 C314 126 340 122 344 138 C360 130 374 146 364 160 C372 174 352 184 344 172 C338 182 322 180 318 168 Z\" fill=\"#ECEFF1\" stroke-width=\"4\"/><circle cx=\"296\" cy=\"112\" r=\"14\" fill=\"#ECEFF1\" stroke-width=\"4\"/>"},{"id":"banh_xe","svg":"<circle cx=\"62\" cy=\"312\" r=\"20\" fill=\"#455A64\"/><circle cx=\"118\" cy=\"312\" r=\"20\" fill=\"#455A64\"/><circle cx=\"212\" cy=\"306\" r=\"28\" fill=\"#455A64\"/><circle cx=\"276\" cy=\"312\" r=\"20\" fill=\"#455A64\"/><circle cx=\"336\" cy=\"312\" r=\"20\" fill=\"#455A64\"/><circle cx=\"212\" cy=\"306\" r=\"9\" fill=\"#ECEFF1\" stroke-width=\"3.5\"/>"},{"id":"den","svg":"<circle cx=\"368\" cy=\"262\" r=\"9\" fill=\"#FFF176\" stroke-width=\"4\"/>"}],"steps":[{"title":"Vẽ đầu tàu","instruction":"Vẽ đầu tàu: một hình chữ nhật dài, phía trước có phần mũi thấp hơn.","parts":["dau_tau"],"tip":""},{"title":"Vẽ buồng lái","instruction":"Trên phía sau đầu tàu, vẽ buồng lái hình vuông có mái và một ô cửa.","parts":["buong_lai"],"tip":""},{"title":"Vẽ ống khói","instruction":"Trên mũi tàu, vẽ cái ống khói có miệng loe.","parts":["ong_khoi"],"tip":""},{"title":"Vẽ toa tàu","instruction":"Bên trái đầu tàu, vẽ toa tàu hình chữ nhật có mái và hai ô cửa.","parts":["toa"],"tip":""},{"title":"Vẽ móc nối","instruction":"Vẽ một đoạn ngắn nối toa tàu với đầu tàu.","parts":["noi"],"tip":""},{"title":"Vẽ bánh xe","instruction":"Vẽ các bánh xe tròn dưới tàu, bánh dưới buồng lái to nhất.","parts":["banh_xe"],"tip":""},{"title":"Vẽ đèn","instruction":"Ở mũi tàu, vẽ một cái đèn tròn.","parts":["den"],"tip":""},{"title":"Vẽ khói","instruction":"Trên ống khói, vẽ đám khói như đám mây và một cục khói nhỏ.","parts":["khoi"],"tip":""},{"title":"Vẽ đường ray","instruction":"Dưới bánh xe, vẽ đường ray dài và các thanh tà vẹt.","parts":["ray"],"tip":""},{"title":"Tô màu","instruction":"Tô màu cho bức tranh giống tranh mẫu, hoặc chọn những màu bé thích nhất.","parts":[],"tip":"Tô từ phần to trước, phần nhỏ sau. Tô nhẹ tay để màu đều.","color":true}]},{"id":"kitten","imageId":"dong_vat_kitten","title":"Mèo con ngoan","difficulty":"Khéo tay","tone":"purple","palette":["#3B2314","#F6A04D","#FFE2B8","#F8A5B8","#F472B6"],"parts":[{"id":"duoi","svg":"<path d=\"M246 330 C300 340 334 312 326 270 C322 250 300 246 298 262 C304 290 290 312 250 312 Z\" fill=\"#F6A04D\"/><path d=\"M314 262 L326 270 M318 290 L330 288\" fill=\"none\" stroke-width=\"3.5\"/>"},{"id":"than","svg":"<path d=\"M150 196 C116 236 112 318 144 350 L256 350 C288 318 284 236 250 196 Z\" fill=\"#F6A04D\"/>"},{"id":"bung","svg":"<path d=\"M168 250 C160 290 166 330 180 350 L220 350 C234 330 240 290 232 250 C220 236 180 236 168 250 Z\" fill=\"#FFE2B8\"/>"},{"id":"chan","svg":"<ellipse cx=\"172\" cy=\"350\" rx=\"26\" ry=\"15\" fill=\"#F6A04D\"/><ellipse cx=\"228\" cy=\"350\" rx=\"26\" ry=\"15\" fill=\"#F6A04D\"/><path d=\"M164 346 L164 356 M178 346 L178 356 M222 346 L222 356 M236 346 L236 356\" fill=\"none\" stroke-width=\"3\"/>"},{"id":"tai","svg":"<path d=\"M128 112 L134 40 L188 82 Z\" fill=\"#F6A04D\"/><path d=\"M272 112 L266 40 L212 82 Z\" fill=\"#F6A04D\"/><path d=\"M142 92 L144 62 L168 82 Z M258 92 L256 62 L232 82 Z\" fill=\"#F8A5B8\" stroke-width=\"3.5\"/>"},{"id":"dau","svg":"<ellipse cx=\"200\" cy=\"142\" rx=\"86\" ry=\"70\" fill=\"#F6A04D\"/>"},{"id":"van","svg":"<path d=\"M200 74 L200 94 M182 78 L186 96 M218 78 L214 96\" fill=\"none\" stroke-width=\"4\"/>"},{"id":"mat","svg":"<circle cx=\"166\" cy=\"138\" r=\"10\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"169.5\" cy=\"134.5\" r=\"3.3000000000000003\" fill=\"#fff\" stroke=\"none\"/><circle cx=\"234\" cy=\"138\" r=\"10\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"237.5\" cy=\"134.5\" r=\"3.3000000000000003\" fill=\"#fff\" stroke=\"none\"/><ellipse cx=\"148\" cy=\"166\" rx=\"11\" ry=\"6.5\" fill=\"#F8A5B8\" stroke=\"none\" opacity=\".9\"/><ellipse cx=\"252\" cy=\"166\" rx=\"11\" ry=\"6.5\" fill=\"#F8A5B8\" stroke=\"none\" opacity=\".9\"/>"},{"id":"mieng","svg":"<path d=\"M192 158 L208 158 L200 167 Z\" fill=\"#F472B6\" stroke-width=\"3.5\"/><path d=\"M200 167 L200 174 M200 174 Q190 184 182 176 M200 174 Q210 184 218 176\" fill=\"none\" stroke-width=\"3.5\"/>"},{"id":"ria","svg":"<path d=\"M140 160 L104 152 M140 172 L104 176 M260 160 L296 152 M260 172 L296 176\" fill=\"none\" stroke-width=\"3.5\"/>"}],"steps":[{"title":"Vẽ đầu","instruction":"Vẽ một hình tròn hơi dẹt ở phía trên tờ giấy. Đây là đầu mèo.","parts":["dau"],"tip":""},{"title":"Vẽ hai tai","instruction":"Trên đầu, vẽ hai cái tai hình tam giác, trong mỗi tai có một tam giác nhỏ.","parts":["tai"],"tip":""},{"title":"Vẽ thân","instruction":"Dưới đầu, vẽ thân mèo hình quả lê, đáy bằng.","parts":["than"],"tip":""},{"title":"Vẽ bụng","instruction":"Giữa thân, vẽ cái bụng hình bầu dục dài.","parts":["bung"],"tip":""},{"title":"Vẽ chân","instruction":"Dưới thân, vẽ hai bàn chân tròn, mỗi chân có hai vạch ngón.","parts":["chan"],"tip":""},{"title":"Vẽ đuôi","instruction":"Bên phải thân, vẽ cái đuôi cong vòng lên.","parts":["duoi"],"tip":""},{"title":"Vẽ mắt và má","instruction":"Vẽ hai mắt tròn và hai má hồng.","parts":["mat"],"tip":""},{"title":"Vẽ mũi và miệng","instruction":"Giữa mặt, vẽ cái mũi tam giác nhỏ, dưới mũi là cái miệng hình chữ W.","parts":["mieng"],"tip":""},{"title":"Vẽ ria","instruction":"Hai bên má, mỗi bên vẽ hai sợi ria.","parts":["ria"],"tip":""},{"title":"Vẽ vằn trán","instruction":"Trên trán, vẽ ba vạch vằn ngắn.","parts":["van"],"tip":""},{"title":"Tô màu","instruction":"Tô màu cho bức tranh giống tranh mẫu, hoặc chọn những màu bé thích nhất.","parts":[],"tip":"Tô từ phần to trước, phần nhỏ sau. Tô nhẹ tay để màu đều.","color":true}]},{"id":"puppy","imageId":"dong_vat_puppy","title":"Cún con tai cụp","difficulty":"Khéo tay","tone":"amber","palette":["#3B2314","#F2C48D","#FFF1DC","#E53935","#FDD835","#9A5B34","#F8A5B8","#F472B6"],"parts":[{"id":"duoi","svg":"<path d=\"M262 300 C292 292 306 262 300 236 C296 222 282 226 284 240 C286 262 274 280 256 284 Z\" fill=\"#F2C48D\"/>"},{"id":"than","svg":"<path d=\"M146 210 C116 250 114 320 142 352 L258 352 C286 320 284 250 254 210 Z\" fill=\"#F2C48D\"/>"},{"id":"chan","svg":"<ellipse cx=\"170\" cy=\"352\" rx=\"28\" ry=\"15\" fill=\"#FFF1DC\"/><ellipse cx=\"230\" cy=\"352\" rx=\"28\" ry=\"15\" fill=\"#FFF1DC\"/>"},{"id":"vong_co","svg":"<path d=\"M146 214 C180 232 220 232 254 214 L258 232 C222 252 178 252 142 232 Z\" fill=\"#E53935\"/><circle cx=\"200\" cy=\"254\" r=\"13\" fill=\"#FDD835\"/>"},{"id":"dau","svg":"<path d=\"M118 132 C118 72 162 50 200 50 C238 50 282 72 282 132 C282 186 246 218 200 218 C154 218 118 186 118 132 Z\" fill=\"#F2C48D\"/>"},{"id":"tai","svg":"<path d=\"M132 82 C96 84 80 130 92 178 C98 196 120 192 126 174 C132 150 136 120 148 96 Z\" fill=\"#9A5B34\"/><path d=\"M268 82 C304 84 320 130 308 178 C302 196 280 192 274 174 C268 150 264 120 252 96 Z\" fill=\"#9A5B34\"/>"},{"id":"dom","svg":"<path d=\"M220 100 C238 86 262 98 262 120 C262 142 240 150 224 140 C212 130 210 110 220 100 Z\" fill=\"#9A5B34\" stroke-width=\"4\"/>"},{"id":"mom","svg":"<ellipse cx=\"200\" cy=\"168\" rx=\"42\" ry=\"30\" fill=\"#FFF1DC\"/>"},{"id":"mat","svg":"<circle cx=\"168\" cy=\"122\" r=\"10\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"171.5\" cy=\"118.5\" r=\"3.3000000000000003\" fill=\"#fff\" stroke=\"none\"/><circle cx=\"236\" cy=\"122\" r=\"10\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"239.5\" cy=\"118.5\" r=\"3.3000000000000003\" fill=\"#fff\" stroke=\"none\"/><ellipse cx=\"150\" cy=\"160\" rx=\"11\" ry=\"6.5\" fill=\"#F8A5B8\" stroke=\"none\" opacity=\".9\"/><ellipse cx=\"252\" cy=\"160\" rx=\"11\" ry=\"6.5\" fill=\"#F8A5B8\" stroke=\"none\" opacity=\".9\"/>"},{"id":"mui","svg":"<ellipse cx=\"200\" cy=\"154\" rx=\"14\" ry=\"10\" fill=\"#3B2314\"/><path d=\"M200 164 L200 176 M200 176 Q188 186 180 178 M200 176 Q212 186 220 178\" fill=\"none\" stroke-width=\"3.5\"/><path d=\"M194 182 Q200 198 206 182 Z\" fill=\"#F472B6\" stroke-width=\"3\"/>"}],"steps":[{"title":"Vẽ đầu","instruction":"Vẽ cái đầu tròn hơi vuông ở phía trên tờ giấy.","parts":["dau"],"tip":""},{"title":"Vẽ tai cụp","instruction":"Hai bên đầu, vẽ hai cái tai dài thõng xuống.","parts":["tai"],"tip":""},{"title":"Vẽ mõm","instruction":"Ở nửa dưới khuôn mặt, vẽ một hình bầu dục làm mõm.","parts":["mom"],"tip":""},{"title":"Vẽ mũi và miệng","instruction":"Trên mõm, vẽ cái mũi tròn, cái miệng và chiếc lưỡi nhỏ.","parts":["mui"],"tip":""},{"title":"Vẽ mắt và má","instruction":"Vẽ hai mắt tròn và hai má hồng.","parts":["mat"],"tip":""},{"title":"Vẽ đốm lông","instruction":"Quanh mắt bên phải, vẽ một đốm lông tròn.","parts":["dom"],"tip":""},{"title":"Vẽ thân","instruction":"Dưới đầu, vẽ thân cún hình quả lê, đáy bằng.","parts":["than"],"tip":""},{"title":"Vẽ chân","instruction":"Dưới thân, vẽ hai bàn chân tròn.","parts":["chan"],"tip":""},{"title":"Vẽ vòng cổ","instruction":"Ở cổ, vẽ một dải vòng cổ và cái thẻ tròn.","parts":["vong_co"],"tip":""},{"title":"Vẽ đuôi","instruction":"Bên phải thân, vẽ cái đuôi cong vẫy vẫy.","parts":["duoi"],"tip":""},{"title":"Tô màu","instruction":"Tô màu cho bức tranh giống tranh mẫu, hoặc chọn những màu bé thích nhất.","parts":[],"tip":"Tô từ phần to trước, phần nhỏ sau. Tô nhẹ tay để màu đều.","color":true}]},{"id":"teddy_bear","imageId":"do_choi_teddy_bear","title":"Gấu bông","difficulty":"Khéo tay","tone":"amber","palette":["#3B2314","#C68A56","#F3D3AE","#F8A5B8","#E53935"],"parts":[{"id":"chan","svg":"<ellipse cx=\"148\" cy=\"330\" rx=\"40\" ry=\"32\" fill=\"#C68A56\"/><ellipse cx=\"252\" cy=\"330\" rx=\"40\" ry=\"32\" fill=\"#C68A56\"/><ellipse cx=\"146\" cy=\"336\" rx=\"20\" ry=\"16\" fill=\"#F3D3AE\" stroke-width=\"4\"/><ellipse cx=\"254\" cy=\"336\" rx=\"20\" ry=\"16\" fill=\"#F3D3AE\" stroke-width=\"4\"/>"},{"id":"than","svg":"<path d=\"M200 186 C140 186 118 236 122 286 C126 330 168 344 200 344 C232 344 274 330 278 286 C282 236 260 186 200 186 Z\" fill=\"#C68A56\"/>"},{"id":"bung","svg":"<ellipse cx=\"200\" cy=\"280\" rx=\"44\" ry=\"40\" fill=\"#F3D3AE\"/>"},{"id":"tay","svg":"<path d=\"M128 226 C96 236 86 274 102 290 C118 302 138 284 144 260 Z M272 226 C304 236 314 274 298 290 C282 302 262 284 256 260 Z\" fill=\"#C68A56\"/>"},{"id":"tai","svg":"<circle cx=\"134\" cy=\"72\" r=\"30\" fill=\"#C68A56\"/><circle cx=\"266\" cy=\"72\" r=\"30\" fill=\"#C68A56\"/><circle cx=\"134\" cy=\"72\" r=\"14\" fill=\"#F3D3AE\" stroke-width=\"4\"/><circle cx=\"266\" cy=\"72\" r=\"14\" fill=\"#F3D3AE\" stroke-width=\"4\"/>"},{"id":"dau","svg":"<ellipse cx=\"200\" cy=\"126\" rx=\"80\" ry=\"72\" fill=\"#C68A56\"/>"},{"id":"mom","svg":"<ellipse cx=\"200\" cy=\"152\" rx=\"36\" ry=\"28\" fill=\"#F3D3AE\"/>"},{"id":"mat","svg":"<circle cx=\"166\" cy=\"116\" r=\"9\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"169.15\" cy=\"112.85\" r=\"2.97\" fill=\"#fff\" stroke=\"none\"/><circle cx=\"234\" cy=\"116\" r=\"9\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"237.15\" cy=\"112.85\" r=\"2.97\" fill=\"#fff\" stroke=\"none\"/><ellipse cx=\"146\" cy=\"144\" rx=\"11\" ry=\"6.5\" fill=\"#F8A5B8\" stroke=\"none\" opacity=\".9\"/><ellipse cx=\"254\" cy=\"144\" rx=\"11\" ry=\"6.5\" fill=\"#F8A5B8\" stroke=\"none\" opacity=\".9\"/>"},{"id":"mui","svg":"<ellipse cx=\"200\" cy=\"140\" rx=\"12\" ry=\"9\" fill=\"#3B2314\"/><path d=\"M200 149 L200 158 M200 158 Q190 168 182 160 M200 158 Q210 168 218 160\" fill=\"none\" stroke-width=\"3.5\"/>"},{"id":"no","svg":"<path d=\"M200 196 L164 178 L164 214 Z M200 196 L236 178 L236 214 Z\" fill=\"#E53935\"/><circle cx=\"200\" cy=\"196\" r=\"10\" fill=\"#E53935\"/>"}],"steps":[{"title":"Vẽ đầu","instruction":"Vẽ một hình tròn hơi dẹt ở phía trên tờ giấy. Đây là đầu gấu.","parts":["dau"],"tip":""},{"title":"Vẽ hai tai","instruction":"Trên đầu, vẽ hai tai tròn, trong mỗi tai có một vòng nhỏ.","parts":["tai"],"tip":""},{"title":"Vẽ mõm","instruction":"Ở nửa dưới khuôn mặt, vẽ một hình bầu dục làm mõm.","parts":["mom"],"tip":""},{"title":"Vẽ mũi và miệng","instruction":"Trên mõm, vẽ cái mũi bầu dục và cái miệng hình chữ W.","parts":["mui"],"tip":""},{"title":"Vẽ mắt và má","instruction":"Vẽ hai mắt tròn và hai má hồng.","parts":["mat"],"tip":""},{"title":"Vẽ thân","instruction":"Dưới đầu, vẽ thân gấu tròn trịa như quả trứng.","parts":["than"],"tip":""},{"title":"Vẽ bụng","instruction":"Giữa thân, vẽ cái bụng hình bầu dục.","parts":["bung"],"tip":""},{"title":"Vẽ hai tay","instruction":"Hai bên thân, vẽ hai cánh tay ngắn mũm mĩm.","parts":["tay"],"tip":""},{"title":"Vẽ hai chân","instruction":"Dưới thân, vẽ hai bàn chân tròn to, trong mỗi chân có một miếng đệm.","parts":["chan"],"tip":""},{"title":"Vẽ nơ","instruction":"Ở cổ, vẽ cái nơ gồm hai tam giác và một nút tròn ở giữa.","parts":["no"],"tip":""},{"title":"Tô màu","instruction":"Tô màu cho bức tranh giống tranh mẫu, hoặc chọn những màu bé thích nhất.","parts":[],"tip":"Tô từ phần to trước, phần nhỏ sau. Tô nhẹ tay để màu đều.","color":true}]},{"id":"pink_rabbit","imageId":"dong_vat_pink_rabbit","title":"Cô Thỏ Hồng","difficulty":"Khéo tay","tone":"pink","palette":["#3B2314","#F8BBD0","#F48FB1","#AB47BC","#CE93D8","#E91E63","#FF8A3D","#3E9B3E"],"parts":[{"id":"tai","svg":"<path d=\"M156 92 C130 20 150 -4 170 6 C190 18 192 60 184 92 Z\" fill=\"#F8BBD0\"/><path d=\"M216 92 C222 52 232 10 256 10 C278 12 280 50 246 98 Z\" fill=\"#F8BBD0\"/><path d=\"M162 78 C150 38 158 22 168 26 C178 32 178 56 174 80 Z M226 80 C232 50 240 30 252 32 C262 36 258 60 240 84 Z\" fill=\"#F48FB1\" stroke-width=\"3.5\"/>"},{"id":"no","svg":"<path d=\"M234 40 C214 22 206 46 226 52 C210 64 228 80 240 62 C248 82 266 66 252 54 C270 46 256 26 240 40 Z\" fill=\"#AB47BC\"/><circle cx=\"238\" cy=\"52\" r=\"7\" fill=\"#CE93D8\"/>"},{"id":"chan","svg":"<ellipse cx=\"166\" cy=\"356\" rx=\"34\" ry=\"16\" fill=\"#F8BBD0\"/><ellipse cx=\"234\" cy=\"356\" rx=\"34\" ry=\"16\" fill=\"#F8BBD0\"/>"},{"id":"than","svg":"<path d=\"M150 210 C126 250 124 320 150 350 L250 350 C276 320 274 250 250 210 Z\" fill=\"#F8BBD0\"/>"},{"id":"vay","svg":"<path d=\"M146 270 L254 270 L278 350 L122 350 Z\" fill=\"#CE93D8\"/><path d=\"M122 350 L278 350\" fill=\"none\"/><circle cx=\"170\" cy=\"310\" r=\"6\" fill=\"#fff\" stroke-width=\"3\"/><circle cx=\"200\" cy=\"322\" r=\"6\" fill=\"#fff\" stroke-width=\"3\"/><circle cx=\"230\" cy=\"310\" r=\"6\" fill=\"#fff\" stroke-width=\"3\"/>"},{"id":"duoi","svg":"<circle cx=\"282\" cy=\"318\" r=\"18\" fill=\"#FFFFFF\"/>"},{"id":"dau","svg":"<ellipse cx=\"200\" cy=\"150\" rx=\"78\" ry=\"68\" fill=\"#F8BBD0\"/>"},{"id":"mat","svg":"<circle cx=\"170\" cy=\"146\" r=\"10\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"173.5\" cy=\"142.5\" r=\"3.3000000000000003\" fill=\"#fff\" stroke=\"none\"/><circle cx=\"230\" cy=\"146\" r=\"10\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"233.5\" cy=\"142.5\" r=\"3.3000000000000003\" fill=\"#fff\" stroke=\"none\"/><ellipse cx=\"150\" cy=\"174\" rx=\"11\" ry=\"6.5\" fill=\"#F8A5B8\" stroke=\"none\" opacity=\".9\"/><ellipse cx=\"250\" cy=\"174\" rx=\"11\" ry=\"6.5\" fill=\"#F8A5B8\" stroke=\"none\" opacity=\".9\"/>"},{"id":"mieng","svg":"<path d=\"M192 166 L208 166 L200 175 Z\" fill=\"#E91E63\" stroke-width=\"3\"/><path d=\"M200 175 L200 182 M200 182 Q190 192 182 184 M200 182 Q210 192 218 184\" fill=\"none\" stroke-width=\"3.5\"/>"},{"id":"tay","svg":"<path d=\"M150 226 C120 236 104 262 112 280 C120 292 138 286 144 270 C148 258 154 246 160 240 Z\" fill=\"#F8BBD0\"/><path d=\"M250 226 C276 232 292 248 290 262 C288 276 270 278 262 266 C256 256 248 246 242 240 Z\" fill=\"#F8BBD0\"/>"},{"id":"ca_rot","svg":"<path d=\"M96 300 L128 252 L140 262 Z\" fill=\"#FF8A3D\"/><path d=\"M132 254 C130 236 140 226 150 228 M134 256 C144 242 160 240 166 248\" fill=\"none\" stroke=\"#3E9B3E\" stroke-width=\"5\"/><path d=\"M110 282 L118 286 M118 270 L126 274\" fill=\"none\" stroke-width=\"3\"/>"}],"steps":[{"title":"Vẽ đầu","instruction":"Vẽ một hình tròn hơi dẹt ở phía trên tờ giấy. Đây là đầu Cô Thỏ.","parts":["dau"],"tip":""},{"title":"Vẽ đôi tai dài","instruction":"Trên đầu, vẽ hai cái tai dài, tai bên phải hơi nghiêng. Trong mỗi tai có một hình nhỏ hơn.","parts":["tai"],"tip":""},{"title":"Vẽ mắt và má","instruction":"Vẽ hai mắt tròn và hai má hồng.","parts":["mat"],"tip":""},{"title":"Vẽ mũi và miệng","instruction":"Giữa mặt, vẽ cái mũi tam giác nhỏ và cái miệng hình chữ W.","parts":["mieng"],"tip":""},{"title":"Vẽ thân","instruction":"Dưới đầu, vẽ thân thỏ hình quả lê.","parts":["than"],"tip":""},{"title":"Vẽ váy","instruction":"Ở nửa dưới thân, vẽ cái váy hình thang, trên váy có ba chấm bi.","parts":["vay"],"tip":""},{"title":"Vẽ hai tay","instruction":"Hai bên thân, vẽ hai cánh tay. Tay trái cong xuống như đang cầm đồ.","parts":["tay"],"tip":""},{"title":"Vẽ hai chân","instruction":"Dưới váy, vẽ hai bàn chân hình bầu dục.","parts":["chan"],"tip":""},{"title":"Vẽ đuôi bông","instruction":"Bên phải, vẽ cái đuôi tròn như cục bông.","parts":["duoi"],"tip":""},{"title":"Vẽ nơ","instruction":"Ở gốc tai bên phải, vẽ cái nơ xinh có nút tròn ở giữa.","parts":["no"],"tip":""},{"title":"Vẽ củ cà rốt","instruction":"Ở tay trái, vẽ củ cà rốt hình tam giác dài có lá xanh.","parts":["ca_rot"],"tip":"Cô Thỏ thích cà rốt nhất đấy!"},{"title":"Tô màu","instruction":"Tô màu cho bức tranh giống tranh mẫu, hoặc chọn những màu bé thích nhất.","parts":[],"tip":"Tô từ phần to trước, phần nhỏ sau. Tô nhẹ tay để màu đều.","color":true}]}]);

  const completed = new Set((() => {
    try { return JSON.parse(window.localStorage.getItem(DONE_KEY) || "[]"); } catch (_) { return []; }
  })());
  function markDone(lesson) {
    completed.add(lesson.id);
    try { window.localStorage.setItem(DONE_KEY, JSON.stringify([...completed])); } catch (_) {}
  }

  /* ---------- giọng đọc Cô Thỏ Hồng (chỉ dùng giọng tiếng Việt) ---------- */
  function vietVoice() {
    try {
      const voices = window.speechSynthesis ? window.speechSynthesis.getVoices() : [];
      return voices.find((v) => /^vi/i.test(String(v.lang || ""))) || null;
    } catch (_) { return null; }
  }
  try { if (window.speechSynthesis) window.speechSynthesis.getVoices(); } catch (_) {}
  function stopSpeak() {
    try { if (window.speechSynthesis) window.speechSynthesis.cancel(); } catch (_) {}
  }
  function speak(text) {
    stopSpeak();
    const voice = vietVoice();
    if (!voice || typeof window.SpeechSynthesisUtterance !== "function") return false;
    try {
      const u = new window.SpeechSynthesisUtterance(text);
      u.lang = "vi-VN"; u.voice = voice; u.rate = 0.95; u.pitch = 1.08;
      window.speechSynthesis.speak(u);
      return true;
    } catch (_) { return false; }
  }

  function lessonById(id) {
    return LESSONS.find((item) => item.id === id) || null;
  }

  function lessonIndex(lesson) {
    return Math.max(0, LESSONS.indexOf(lesson));
  }

  function imageMeta(imageId) {
    return catalog && catalog.images && catalog.images[imageId] ? catalog.images[imageId] : null;
  }

  function loadCatalog() {
    if (catalog && catalog.images) return Promise.resolve(catalog);
    if (catalogPromise) return catalogPromise;
    catalogAbort = typeof AbortController === "function" ? new AbortController() : null;
    const options = catalogAbort ? { signal: catalogAbort.signal, cache: "no-store" } : { cache: "no-store" };
    catalogPromise = fetch(CATALOG_URL, options)
      .then((response) => {
        if (!response.ok) throw new Error("CATALOG_HTTP");
        return response.json();
      })
      .then((data) => {
        if (!data || !data.images || typeof data.images !== "object") throw new Error("CATALOG_INVALID");
        catalog = data;
        return catalog;
      })
      .finally(() => {
        catalogPromise = null;
        catalogAbort = null;
      });
    return catalogPromise;
  }

  function setBanner(items) {
    const hook = activeContext && activeContext.hooks && activeContext.hooks.setSubBanner;
    if (typeof hook === "function") hook({ items });
  }

  function setRegistryBanner() {
    setBanner([{ level: 2, title: `${GAME_NUMBER}. Cô Thỏ Hồng dạy vẽ`, action: null }]);
  }

  function setLessonBanner(lesson) {
    const idx = lessonIndex(lesson) + 1;
    setBanner([
      { level: 2, title: `${GAME_NUMBER}. Cô Thỏ Hồng dạy vẽ`, action: () => renderRegistry() },
      { level: 3, title: `${GAME_NUMBER}.${idx} ${lesson.title}`, action: null }
    ]);
  }

  function setStepBanner(lesson) {
    const idx = lessonIndex(lesson) + 1;
    setBanner([
      { level: 2, title: `${GAME_NUMBER}. Cô Thỏ Hồng dạy vẽ`, action: () => renderRegistry() },
      { level: 3, title: `${GAME_NUMBER}.${idx} ${lesson.title}`, action: () => renderLessonIntro(lesson) },
      { level: 4, title: `${GAME_NUMBER}.${idx}.${currentStepIndex + 1} Bước ${currentStepIndex + 1}`, action: null }
    ]);
  }

  function ensureStyles() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      .ee-draw-page{padding:.2rem .15rem .8rem;color:#334155}
      .ee-draw-hero{display:grid;grid-template-columns:1.15fr .85fr;gap:.8rem;border:1px solid #e9d5ff;border-radius:22px;background:linear-gradient(135deg,#fff7ed,#fdf2f8,#f5f3ff);padding:1rem;margin:.2rem 0 .9rem}
      .ee-draw-hero h2{margin:0 0 .3rem;color:#6d28d9;font-size:22px}.ee-draw-hero p{margin:0;color:#475569;font-weight:800;line-height:1.5}
      .ee-draw-bunny{display:flex;align-items:center;gap:.7rem;border:1px solid #bae6fd;border-radius:16px;background:#f0f9ff;padding:.8rem}.ee-draw-bunny .icon{font-size:38px}.ee-draw-bunny strong{display:block;color:#075985}.ee-draw-bunny span{display:block;color:#334155;font-size:13px;font-weight:800;line-height:1.45}
      .ee-draw-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:.75rem}
      .ee-draw-card{min-width:0;border:1px solid #e5e7eb;border-radius:20px;padding:.75rem;background:#fff;cursor:pointer;text-align:left;font:inherit;box-shadow:0 8px 18px rgba(15,23,42,.05);transition:transform .16s,box-shadow .16s}
      .ee-draw-card[data-tone="pink"]{background:#fff1f7;border-color:#fbcfe8}.ee-draw-card[data-tone="teal"]{background:#ecfdf5;border-color:#99f6e4}.ee-draw-card[data-tone="amber"]{background:#fffbeb;border-color:#fde68a}.ee-draw-card[data-tone="purple"]{background:#f5f3ff;border-color:#ddd6fe}
      .ee-draw-card:hover{transform:translateY(-2px);box-shadow:0 10px 22px rgba(15,23,42,.09)}
      .ee-draw-card img{width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:14px;border:1px solid rgba(148,163,184,.25);background:#fff}
      .ee-draw-card h3{margin:.6rem 0 .25rem;color:#5b21b6;font-size:18px;line-height:1.25}.ee-draw-card p{margin:.2rem 0;color:#475569;font-size:13px;font-weight:800;line-height:1.42}.ee-draw-meta{display:flex;gap:.35rem;flex-wrap:wrap;margin-top:.5rem}.ee-draw-chip{border:1px solid #ddd6fe;background:#fff;border-radius:999px;padding:.25rem .48rem;color:#6d28d9;font-size:11px;font-weight:1000}
      .ee-draw-prep{display:grid;grid-template-columns:minmax(0,1.25fr) minmax(220px,.75fr);gap:.85rem;margin:.65rem 0}.ee-draw-prep-card{border:1px solid #e5e7eb;border-radius:20px;background:#fff;padding:.9rem}.ee-draw-prep-card h2{margin:0 0 .4rem;color:#5b21b6;font-size:22px}.ee-draw-prep-card p{margin:.3rem 0;color:#475569;font-weight:800;line-height:1.5}.ee-draw-prep-list{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:.5rem;margin-top:.7rem}.ee-draw-prep-item{border:1px solid #e2e8f0;border-radius:14px;background:#f8fafc;padding:.65rem}.ee-draw-prep-item span{display:block;color:#64748b;font-size:11px;font-weight:900;text-transform:uppercase}.ee-draw-prep-item strong{display:block;margin-top:.2rem;color:#334155;font-size:14px}
      .ee-draw-ref{border:1px solid #fbcfe8;border-radius:20px;background:#fff7fb;padding:.6rem}.ee-draw-ref img{display:block;width:100%;aspect-ratio:4/3;object-fit:contain;border-radius:14px;background:#fff}.ee-draw-ref p{margin:.45rem .2rem .1rem;color:#9d174d;font-size:12px;font-weight:900;text-align:center}
      .ee-draw-btn{min-height:44px;border-radius:14px;border:1px solid #d8b4fe;background:#fff;color:#6d28d9;padding:.65rem 1rem;font:inherit;font-weight:1000;cursor:pointer}.ee-draw-btn.primary{border:none;color:#fff;background:linear-gradient(90deg,#ec4899,#8b5cf6);box-shadow:0 8px 16px rgba(168,85,247,.18)}.ee-draw-btn.secondary{background:#f8fafc;border-color:#cbd5e1;color:#334155}.ee-draw-btn:disabled{opacity:.45;cursor:not-allowed}
      .ee-draw-intro-actions{display:flex;gap:.55rem;flex-wrap:wrap;margin-top:.8rem}
      .ee-draw-work{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:.8rem;align-items:start}.ee-draw-step-card,.ee-draw-pad-card{border:1px solid #e5e7eb;border-radius:22px;background:#fff;padding:.8rem;min-width:0}.ee-draw-step-card{background:linear-gradient(180deg,#fff,#fffbff)}
      .ee-draw-progress{display:flex;align-items:center;gap:.6rem;margin-bottom:.6rem}.ee-draw-progress strong{color:#6d28d9}.ee-draw-progress-track{height:9px;border-radius:999px;background:#ede9fe;overflow:hidden;flex:1}.ee-draw-progress-bar{height:100%;border-radius:inherit;background:linear-gradient(90deg,#ec4899,#8b5cf6)}
      .ee-draw-step-copy h2{margin:.2rem 0;color:#4c1d95;font-size:23px}.ee-draw-step-copy p{margin:.3rem 0;color:#334155;font-size:16px;font-weight:850;line-height:1.52}
      .ee-draw-svg-wrap{margin-top:.65rem;border:1px solid #e9d5ff;border-radius:18px;background:#fff;overflow:hidden}.ee-draw-svg{display:block;width:100%;height:auto;aspect-ratio:4/3}.ee-draw-svg .done{color:#475569}.ee-draw-svg .current{color:#db2777;filter:drop-shadow(0 1px 0 rgba(255,255,255,.9))}
      .ee-draw-current-note{margin-top:.55rem;border:1px solid #fde68a;border-radius:14px;background:#fffbeb;padding:.65rem .75rem;color:#92400e;font-size:13px;font-weight:900;line-height:1.45}
      .ee-draw-controls{display:grid;grid-template-columns:1fr auto 1fr;gap:.55rem;align-items:center;margin-top:.7rem}.ee-draw-count{text-align:center;color:#6d28d9;font-weight:1000}.ee-draw-controls .ee-draw-btn:last-child{justify-self:stretch}.ee-draw-controls .ee-draw-btn:first-child{justify-self:stretch}
      .ee-draw-pad-head{display:flex;align-items:center;justify-content:space-between;gap:.5rem;flex-wrap:wrap;margin-bottom:.55rem}.ee-draw-pad-head h3{margin:0;color:#0f766e;font-size:18px}.ee-draw-tools{display:flex;gap:.35rem;flex-wrap:wrap}.ee-draw-tool{width:38px;height:38px;border-radius:11px;border:1px solid #cbd5e1;background:#fff;cursor:pointer;font-size:16px;font-weight:1000;color:#334155}.ee-draw-tool.active{border-color:#a78bfa;background:#f5f3ff;color:#6d28d9}.ee-draw-color{width:34px;height:34px;border-radius:50%;border:3px solid #fff;box-shadow:0 0 0 1px #cbd5e1;cursor:pointer}.ee-draw-color.active{box-shadow:0 0 0 3px #8b5cf6}
      .ee-draw-canvas-shell{border:1px solid #cbd5e1;border-radius:16px;background:#fff;overflow:hidden}.ee-draw-canvas{display:block;width:100%;height:auto;aspect-ratio:4/3;touch-action:none;background:#fff;cursor:crosshair}.ee-draw-pad-help{margin:.5rem 0 0;color:#64748b;font-size:12px;font-weight:800;line-height:1.4}
      .ee-draw-ref-toggle{display:flex;justify-content:center;margin-top:.55rem}.ee-draw-mini-ref{margin-top:.6rem;border:1px solid #e2e8f0;border-radius:14px;padding:.4rem;background:#f8fafc}.ee-draw-mini-ref.hidden{display:none}.ee-draw-mini-ref img{display:block;width:100%;max-height:180px;object-fit:contain;border-radius:10px;background:#fff}
      .ee-draw-finish{border:1px solid #fbcfe8;border-radius:24px;background:linear-gradient(135deg,#fdf2f8,#f5f3ff);padding:1rem;text-align:center}.ee-draw-finish h2{margin:.2rem;color:#be185d;font-size:26px}.ee-draw-finish p{margin:.45rem auto;color:#475569;font-size:15px;font-weight:800;line-height:1.5;max-width:700px}.ee-draw-finish-grid{display:grid;grid-template-columns:1fr 1fr;gap:.8rem;margin-top:.8rem}.ee-draw-finish-panel{border:1px solid #e5e7eb;border-radius:18px;background:#fff;padding:.6rem}.ee-draw-finish-panel strong{display:block;margin-bottom:.45rem;color:#5b21b6}.ee-draw-finish-panel img{display:block;width:100%;aspect-ratio:4/3;object-fit:contain;border-radius:12px;background:#fff}.ee-draw-finish-actions{display:flex;justify-content:center;gap:.55rem;flex-wrap:wrap;margin-top:.8rem}
      .ee-draw-empty{padding:1rem;border:1px dashed #cbd5e1;border-radius:16px;background:#f8fafc;color:#64748b;text-align:center;font-weight:900}
      @media(max-width:980px){.ee-draw-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.ee-draw-work{grid-template-columns:1fr}.ee-draw-prep{grid-template-columns:1fr}.ee-draw-ref{max-width:420px}.ee-draw-finish-grid{grid-template-columns:1fr}}
      @media(max-width:700px){.ee-draw-hero{grid-template-columns:1fr}.ee-draw-prep-list{grid-template-columns:1fr}.ee-draw-step-copy h2{font-size:20px}.ee-draw-step-copy p{font-size:15px}}
      @media(max-width:500px){.ee-draw-grid{grid-template-columns:1fr}.ee-draw-controls{grid-template-columns:1fr 1fr}.ee-draw-count{grid-column:1/-1;grid-row:1}.ee-draw-controls .ee-draw-btn:first-child{grid-column:1;grid-row:2}.ee-draw-controls .ee-draw-btn:last-child{grid-column:2;grid-row:2}}
    
      .ee-draw-art{display:block;width:100%;height:auto;aspect-ratio:4/3;background:#fff}
      .ee-draw-card .ee-draw-art,.ee-draw-card img{border-radius:14px;border:1px solid rgba(148,163,184,.25)}
      .ee-draw-card img{object-fit:contain}
      .ee-draw-card-done{color:#059669;font-size:11px;font-weight:1000}
      .ee-draw-ln *{fill:#fff;stroke:var(--ln)}
      .ee-draw-ln [fill="none"]{fill:none}
      .ee-draw-ln [stroke="none"]{stroke:none;fill:var(--ln)}
      .ee-draw-ln [stroke="none"][fill="#fff"]{fill:#fff}
      .ee-draw-ln [stroke="none"][fill="#F8A5B8"]{fill:none}
      .ee-draw-ln.done{--ln:#A3AEC2}
      .ee-draw-ln.current{--ln:#EC4899}
      .ee-draw-ln.guide{--ln:#94A3B8}
      .ee-draw-canvas-shell{position:relative}
      .ee-draw-guide{position:absolute;inset:0;width:100%;height:100%;opacity:.28;pointer-events:none}
      .ee-draw-guide.off{display:none}
      .ee-draw-canvas{position:relative;background:transparent}
      .ee-draw-size{width:38px;height:38px;border-radius:11px;border:1px solid #cbd5e1;background:#fff;cursor:pointer;display:inline-flex;align-items:center;justify-content:center}
      .ee-draw-size span{display:block;border-radius:50%;background:#334155}
      .ee-draw-size.active{border-color:#a78bfa;background:#f5f3ff}
      .ee-draw-row{display:flex;gap:.35rem;flex-wrap:wrap;align-items:center}
      .ee-draw-pad-head{flex-direction:column;align-items:stretch}
      .ee-draw-tip{margin-top:.55rem;border:1px solid #a7f3d0;border-radius:14px;background:#ecfdf5;padding:.6rem .75rem;color:#065f46;font-size:13px;font-weight:900;line-height:1.45}
      .ee-draw-listen{display:flex;gap:.45rem;flex-wrap:wrap;margin-top:.45rem}
      .ee-draw-voice-note{margin:.45rem 0 0;color:#9a3412;font-size:12px;font-weight:800}
      .ee-draw-dots{display:flex;flex-wrap:wrap;gap:.25rem;margin-bottom:.55rem}
      .ee-draw-dot{width:26px;height:26px;border-radius:50%;border:2px solid #ddd6fe;background:#fff;color:#7c3aed;font:inherit;font-size:11px;font-weight:1000;cursor:pointer;padding:0}
      .ee-draw-dot.is-done{background:#ede9fe}
      .ee-draw-dot.is-on{background:#7c3aed;border-color:#7c3aed;color:#fff}
      .ee-draw-btn:focus-visible,.ee-draw-tool:focus-visible,.ee-draw-color:focus-visible,.ee-draw-dot:focus-visible,.ee-draw-card:focus-visible{outline:3px solid #f472b6;outline-offset:2px}
      .ee-draw-current .ee-draw-svg-wrap svg{animation:eeDrawIn .35s ease-out both}
      @keyframes eeDrawIn{from{opacity:.4}to{opacity:1}}
      @media (prefers-reduced-motion: reduce){.ee-draw-current .ee-draw-svg-wrap svg{animation:none}}
    `;
    document.head.appendChild(style);
  }

  /* ---------- vẽ tranh từ dữ liệu bộ phận ---------- */
  const VIEWBOX = "-67 -2 534 404";
  function artSvg(lesson, opts = {}) {
    const upto = opts.upto == null ? lesson.steps.length - 1 : opts.upto;
    const colorStep = lesson.steps[upto] && lesson.steps[upto].color;
    const shown = new Set();
    lesson.steps.slice(0, upto + 1).forEach((s) => s.parts.forEach((p) => shown.add(p)));
    const current = new Set(opts.mode === "step" && !colorStep ? lesson.steps[upto].parts : []);
    const fullColor = opts.mode === "color" || (opts.mode === "step" && colorStep);
    const body = lesson.parts.filter((p) => fullColor || shown.has(p.id)).map((p) => {
      if (fullColor) return p.svg;
      const cls = opts.mode === "guide" ? "guide" : current.has(p.id) ? "current" : "done";
      return `<g class="ee-draw-ln ${cls}">${p.svg}</g>`;
    }).join("");
    const label = opts.label || lesson.title;
    return `<svg class="${esc(opts.className || "ee-draw-art")}" viewBox="${VIEWBOX}" role="img" aria-label="${esc(label)}">
      ${opts.bg === false ? "" : `<rect x="-67" y="-2" width="534" height="404" fill="#fff"/>`}
      <g stroke="${INK}" stroke-width="5" stroke-linejoin="round" stroke-linecap="round">${body}</g></svg>`;
  }

  function cardArt(lesson) {
    const meta = imageMeta(lesson.imageId);
    if (meta && meta.src) return `<img class="ee-draw-art" src="${esc(meta.src)}" alt="${esc(meta.alt_vi || meta.name_vi || lesson.title)}" loading="lazy" onerror="this.replaceWith(document.createRange().createContextualFragment(this.dataset.fb))" data-fb="${esc(artSvg(lesson, { mode: "color" }))}">`;
    return artSvg(lesson, { mode: "color" });
  }

  function referenceImageHtml(lesson) {
    return cardArt(lesson);
  }

  function stepDiagramHtml(lesson, index) {
    return artSvg(lesson, { mode: "step", upto: index, className: "ee-draw-svg", label: `Minh họa bước ${index + 1}: ${lesson.steps[index].title}` });
  }

  function cleanupPad() {
    if (padState && typeof padState.cleanup === "function") {
      try { padState.cleanup(); } catch (_) {}
    }
    padState = null;
  }

  function renderLoading(message) {
    const host = activeContext && activeContext.host;
    if (!host) return;
    host.innerHTML = `<div class="empty-panel"><div><span class="inline-spinner" aria-hidden="true"></span><strong>${esc(message || "Đang tải…")}</strong></div></div>`;
  }

  function renderRegistry() {
    cleanupPad();
    stopSpeak();
    currentLessonId = "";
    currentStepIndex = 0;
    setRegistryBanner();
    const host = activeContext && activeContext.host;
    if (!host) return;
    const minS = Math.min(...LESSONS.map((l) => l.steps.length));
    const maxS = Math.max(...LESSONS.map((l) => l.steps.length));
    host.innerHTML = `
      <div class="ee-draw-page">
        <div class="section-heading">
          <div><h1>🖍️ Cô Thỏ Hồng dạy vẽ</h1><p>${LESSONS.length} bức tranh • mỗi tranh ${minS}–${maxS} bước • đi từ hình lớn đến chi tiết nhỏ.</p></div>
          <button id="ee-draw-back-games" class="back-btn" type="button">← Games</button>
        </div>
        <div class="ee-draw-hero">
          <div><h2>Nhìn – vẽ từng bước – tô màu</h2><p>Mỗi bước, nét màu hồng là phần bé vẽ thêm. Bé có thể vẽ trên giấy hoặc vẽ ngay trên bảng vẽ, có nét mờ để vẽ theo. Tranh xếp từ dễ đến khó.</p></div>
          <div class="ee-draw-bunny"><span class="icon" aria-hidden="true">🐰</span><div><strong>Cô Thỏ Hồng nhắc bé</strong><span>Không cần vẽ giống hệt tranh mẫu. Đúng hình cơ bản, thêm nét riêng của bé là bức tranh đã rất đáng yêu rồi!</span></div></div>
        </div>
        <div class="ee-draw-grid">
          ${LESSONS.map((lesson, index) => `<button class="ee-draw-card" data-tone="${esc(lesson.tone)}" data-lesson="${esc(lesson.id)}" type="button">
              ${cardArt(lesson)}
              <h3>${index + 1}. ${esc(lesson.title)}</h3>
              <div class="ee-draw-meta"><span class="ee-draw-chip">${lesson.steps.length} bước</span><span class="ee-draw-chip">${esc(lesson.difficulty)}</span>${completed.has(lesson.id) ? `<span class="ee-draw-card-done">✓ Đã vẽ</span>` : ""}</div>
            </button>`).join("")}
        </div>
      </div>`;
    host.querySelector("#ee-draw-back-games")?.addEventListener("click", () => activeContext && activeContext.back && activeContext.back());
    host.querySelectorAll("[data-lesson]").forEach((button) => button.addEventListener("click", () => {
      const lesson = lessonById(button.dataset.lesson);
      if (lesson) renderLessonIntro(lesson);
    }));
  }

  function renderLessonIntro(lesson) {
    cleanupPad();
    stopSpeak();
    currentLessonId = lesson.id;
    currentStepIndex = 0;
    setLessonBanner(lesson);
    const host = activeContext && activeContext.host;
    if (!host) return;
    const swatches = lesson.palette.map((c) => `<span style="display:inline-block;width:18px;height:18px;border-radius:50%;background:${c};border:1px solid #cbd5e1;margin-right:3px;vertical-align:middle"></span>`).join("");
    host.innerHTML = `
      <div class="ee-draw-page">
        <div class="section-heading">
          <div><h1>🖍️ ${esc(lesson.title)}</h1><p>${lesson.steps.length} bước • ${esc(lesson.difficulty)}.</p></div>
          <button id="ee-draw-back-list" class="back-btn" type="button">← ${LESSONS.length} tranh</button>
        </div>
        <div class="ee-draw-prep">
          <section class="ee-draw-prep-card">
            <h2>Chuẩn bị trước khi vẽ</h2>
            <p>Cô Thỏ Hồng sẽ hướng dẫn từ hình lớn đến chi tiết nhỏ, bước cuối cùng mới tô màu.</p>
            <div class="ee-draw-prep-list">
              <div class="ee-draw-prep-item"><span>Dụng cụ</span><strong>Bút chì + tẩy</strong></div>
              <div class="ee-draw-prep-item"><span>Giấy</span><strong>A4 hoặc giấy vẽ</strong></div>
              <div class="ee-draw-prep-item"><span>Màu cần có</span><strong>${swatches}</strong></div>
              <div class="ee-draw-prep-item"><span>Quy trình</span><strong>${lesson.steps.length - 1} bước vẽ + 1 bước tô màu</strong></div>
            </div>
            <div class="ee-draw-intro-actions"><button id="ee-draw-start" class="ee-draw-btn primary" type="button">Bắt đầu vẽ →</button></div>
          </section>
          <aside class="ee-draw-ref">${referenceImageHtml(lesson)}<p>Tranh mẫu • ${esc(lesson.title)}</p></aside>
        </div>
      </div>`;
    host.querySelector("#ee-draw-back-list")?.addEventListener("click", renderRegistry);
    host.querySelector("#ee-draw-start")?.addEventListener("click", () => {
      currentStepIndex = 0;
      renderStep(lesson, true);
    });
  }

  function setupDrawingPad(canvas) {
    cleanupPad();
    if (!canvas || !canvas.getContext) return;
    const ctx = canvas.getContext("2d");
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    const state = { canvas, ctx, drawing: false, color: INK, eraser: false, history: [], cleanup: null };

    const point = (event) => {
      const rect = canvas.getBoundingClientRect();
      return { x: (event.clientX - rect.left) * (canvas.width / rect.width), y: (event.clientY - rect.top) * (canvas.height / rect.height) };
    };
    const save = () => {
      try {
        state.history.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
        if (state.history.length > 20) state.history.shift();
      } catch (_) {}
    };
    let last = null;
    const onDown = (event) => {
      if (event.button != null && event.button !== 0 && event.pointerType !== "touch") return;
      save();
      state.drawing = true;
      last = point(event);
      ctx.globalCompositeOperation = state.eraser ? "destination-out" : "source-over";
      ctx.fillStyle = state.color;
      ctx.beginPath();
      ctx.arc(last.x, last.y, (state.eraser ? brushWidth * 3 : brushWidth) / 2, 0, Math.PI * 2);
      ctx.fill();
      try { canvas.setPointerCapture(event.pointerId); } catch (_) {}
      event.preventDefault();
    };
    const onMove = (event) => {
      if (!state.drawing) return;
      const p = point(event);
      ctx.globalCompositeOperation = state.eraser ? "destination-out" : "source-over";
      ctx.strokeStyle = state.color;
      ctx.lineWidth = state.eraser ? Math.max(22, brushWidth * 3) : brushWidth;
      ctx.beginPath();
      ctx.moveTo(last.x, last.y);
      ctx.lineTo(p.x, p.y);
      ctx.stroke();
      last = p;
      event.preventDefault();
    };
    const onUp = (event) => {
      if (!state.drawing) return;
      state.drawing = false;
      ctx.globalCompositeOperation = "source-over";
      try { canvas.releasePointerCapture(event.pointerId); } catch (_) {}
      event.preventDefault();
    };
    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onUp);
    state.cleanup = () => {
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
    };
    padState = state;
  }

  function bindDrawingTools(host) {
    const canvas = host.querySelector("#ee-draw-canvas");
    setupDrawingPad(canvas);
    if (!padState) return;
    const colorButtons = host.querySelectorAll("[data-draw-color]");
    colorButtons.forEach((button) => button.addEventListener("click", () => {
      padState.color = String(button.dataset.drawColor || INK);
      padState.eraser = false;
      colorButtons.forEach((item) => item.classList.toggle("active", item === button));
      host.querySelector("#ee-draw-eraser")?.classList.remove("active");
    }));
    host.querySelectorAll("[data-size]").forEach((button) => button.addEventListener("click", () => {
      brushWidth = Number(button.dataset.size) || 7;
      host.querySelectorAll("[data-size]").forEach((item) => item.classList.toggle("active", item === button));
    }));
    host.querySelector("#ee-draw-eraser")?.addEventListener("click", (event) => {
      padState.eraser = !padState.eraser;
      event.currentTarget.classList.toggle("active", padState.eraser);
    });
    host.querySelector("#ee-draw-undo")?.addEventListener("click", () => {
      const image = padState.history.pop();
      if (image) padState.ctx.putImageData(image, 0, 0);
    });
    host.querySelector("#ee-draw-clear")?.addEventListener("click", () => {
      try {
        padState.history.push(padState.ctx.getImageData(0, 0, padState.canvas.width, padState.canvas.height));
      } catch (_) {}
      padState.ctx.clearRect(0, 0, padState.canvas.width, padState.canvas.height);
    });
    host.querySelector("#ee-draw-guide-toggle")?.addEventListener("click", (event) => {
      guideOn = !guideOn;
      host.querySelector(".ee-draw-guide")?.classList.toggle("off", !guideOn);
      event.currentTarget.textContent = guideOn ? "👻 Tắt nét mờ" : "👻 Bật nét mờ";
    });
  }

  function stepSpeech(lesson, item) {
    return `Bước ${currentStepIndex + 1}. ${item.title}. ${item.instruction}${item.tip ? " Cô Thỏ mách bé: " + item.tip : ""}`;
  }

  function renderStep(lesson, fresh = false) {
    const host = activeContext && activeContext.host;
    if (!host) return;
    stopSpeak();
    setStepBanner(lesson);
    const item = lesson.steps[currentStepIndex];
    const oldDrawing = !fresh && padState && padState.canvas ? padState.canvas.toDataURL("image/png") : "";
    cleanupPad();
    const isColor = !!item.color;
    const note = isColor
      ? "Bước cuối: bé tô màu theo tranh mẫu, hoặc chọn màu bé thích nhất."
      : "Nét màu hồng là phần bé vẽ thêm ở bước này. Nét xám là những gì bé đã vẽ ở các bước trước.";
    const dots = lesson.steps.map((s, i) => `<button type="button" class="ee-draw-dot${i === currentStepIndex ? " is-on" : i < currentStepIndex ? " is-done" : ""}" data-step="${i}" aria-label="Bước ${i + 1}: ${esc(s.title)}">${i + 1}</button>`).join("");
    const colors = lesson.palette.map((c, i) => `<button class="ee-draw-color${i === 0 ? " active" : ""}" data-draw-color="${c}" type="button" aria-label="Màu ${i + 1}" style="background:${c}"></button>`).join("");
    const sizes = [[4, 6], [7, 10], [14, 16]].map(([w, d]) => `<button class="ee-draw-size${w === brushWidth ? " active" : ""}" data-size="${w}" type="button" aria-label="Cỡ bút ${w}"><span style="width:${d}px;height:${d}px"></span></button>`).join("");

    host.innerHTML = `
      <div class="ee-draw-page ee-draw-current">
        <div class="section-heading">
          <div><h1>🖍️ ${esc(lesson.title)}</h1><p>Cô Thỏ Hồng hướng dẫn từng nét một.</p></div>
          <button id="ee-draw-back-lesson" class="back-btn" type="button">← Chuẩn bị</button>
        </div>
        <div class="ee-draw-work">
          <section class="ee-draw-step-card">
            <div class="ee-draw-progress"><strong>Bước ${currentStepIndex + 1}/${lesson.steps.length}</strong></div>
            <div class="ee-draw-dots">${dots}</div>
            <div class="ee-draw-step-copy"><h2>${esc(item.title)}</h2><p>${esc(item.instruction)}</p></div>
            <div class="ee-draw-listen"><button id="ee-draw-speak" class="ee-draw-btn secondary" type="button">🔊 Nghe Cô Thỏ đọc</button></div>
            <p id="ee-draw-voice-note" class="ee-draw-voice-note" hidden></p>
            <div class="ee-draw-svg-wrap">${stepDiagramHtml(lesson, currentStepIndex)}</div>
            <div class="ee-draw-current-note">🐰 <strong>Cô Thỏ mách bé:</strong> ${esc(note)}</div>
            ${item.tip ? `<div class="ee-draw-tip">💡 ${esc(item.tip)}</div>` : ""}
            <div class="ee-draw-controls">
              <button id="ee-draw-prev" class="ee-draw-btn secondary" type="button" ${currentStepIndex === 0 ? "disabled" : ""}>← Bước trước</button>
              <div class="ee-draw-count">${currentStepIndex + 1} / ${lesson.steps.length}</div>
              <button id="ee-draw-next" class="ee-draw-btn primary" type="button">${currentStepIndex === lesson.steps.length - 1 ? "Hoàn thành 🎉" : "Em vẽ xong →"}</button>
            </div>
          </section>
          <section class="ee-draw-pad-card">
            <div class="ee-draw-pad-head"><h3>✏️ Bảng vẽ của bé</h3>
              <div class="ee-draw-row">${colors}</div>
              <div class="ee-draw-row">${sizes}
                <button id="ee-draw-eraser" class="ee-draw-tool" type="button" title="Tẩy" aria-label="Tẩy">⌫</button>
                <button id="ee-draw-undo" class="ee-draw-tool" type="button" title="Hoàn tác" aria-label="Hoàn tác">↶</button>
                <button id="ee-draw-clear" class="ee-draw-tool" type="button" title="Xoá bảng" aria-label="Xoá bảng">×</button>
              </div>
            </div>
            <div class="ee-draw-canvas-shell">
              ${artSvg(lesson, { mode: isColor ? "color" : "guide", upto: currentStepIndex, className: "ee-draw-guide" + (guideOn ? "" : " off"), label: "Nét mờ để bé vẽ theo" })}
              <canvas id="ee-draw-canvas" class="ee-draw-canvas" width="720" height="540" aria-label="Bảng vẽ của bé"></canvas>
            </div>
            <p class="ee-draw-pad-help">Bé vẽ bằng chuột hoặc ngón tay, đè lên nét mờ cho dễ. Bảng vẽ không gửi dữ liệu ra ngoài.</p>
            <div class="ee-draw-ref-toggle" style="gap:.45rem;flex-wrap:wrap">
              <button id="ee-draw-guide-toggle" class="ee-draw-btn secondary" type="button">${guideOn ? "👻 Tắt nét mờ" : "👻 Bật nét mờ"}</button>
              <button id="ee-draw-toggle-ref" class="ee-draw-btn secondary" type="button">👁 Hiện / ẩn tranh mẫu</button>
            </div>
            <div id="ee-draw-mini-ref" class="ee-draw-mini-ref hidden">${referenceImageHtml(lesson)}</div>
          </section>
        </div>
      </div>`;

    bindDrawingTools(host);
    if (oldDrawing && padState) {
      const img = new Image();
      img.onload = () => { if (padState && padState.ctx) padState.ctx.drawImage(img, 0, 0, padState.canvas.width, padState.canvas.height); };
      img.src = oldDrawing;
    }

    const go = (index) => { currentStepIndex = index; renderStep(lesson); };
    host.querySelectorAll("[data-step]").forEach((b) => b.addEventListener("click", () => go(Number(b.dataset.step) || 0)));
    host.querySelector("#ee-draw-back-lesson")?.addEventListener("click", () => renderLessonIntro(lesson));
    host.querySelector("#ee-draw-prev")?.addEventListener("click", () => { if (currentStepIndex > 0) go(currentStepIndex - 1); });
    host.querySelector("#ee-draw-next")?.addEventListener("click", () => {
      if (currentStepIndex < lesson.steps.length - 1) return go(currentStepIndex + 1);
      renderFinish(lesson);
    });
    host.querySelector("#ee-draw-toggle-ref")?.addEventListener("click", () => {
      host.querySelector("#ee-draw-mini-ref")?.classList.toggle("hidden");
    });
    host.querySelector("#ee-draw-speak")?.addEventListener("click", () => {
      if (!speak(stepSpeech(lesson, item))) {
        const n = host.querySelector("#ee-draw-voice-note");
        if (n) { n.hidden = false; n.textContent = "Máy này chưa có giọng đọc tiếng Việt. Người lớn có thể cài thêm giọng Tiếng Việt trong Cài đặt › Giọng nói của máy."; }
      }
    });
  }

  function drawingWithWhite() {
    if (!padState || !padState.canvas) return "";
    try {
      const c = document.createElement("canvas");
      c.width = padState.canvas.width; c.height = padState.canvas.height;
      const x = c.getContext("2d");
      x.fillStyle = "#fff"; x.fillRect(0, 0, c.width, c.height);
      x.drawImage(padState.canvas, 0, 0);
      const blank = document.createElement("canvas");
      blank.width = c.width; blank.height = c.height;
      const bx = blank.getContext("2d"); bx.fillStyle = "#fff"; bx.fillRect(0, 0, c.width, c.height);
      const url = c.toDataURL("image/png");
      return url === blank.toDataURL("image/png") ? "" : url;
    } catch (_) { return ""; }
  }

  function renderFinish(lesson) {
    const host = activeContext && activeContext.host;
    if (!host) return;
    stopSpeak();
    const drawing = drawingWithWhite();
    cleanupPad();
    markDone(lesson);
    setLessonBanner(lesson);
    const idx = lessonIndex(lesson);
    const next = LESSONS[idx + 1];
    host.innerHTML = `
      <div class="ee-draw-page">
        <div class="section-heading"><div><h1>🖍️ ${esc(lesson.title)}</h1><p>Hoàn thành bức tranh.</p></div><button id="ee-draw-finish-back" class="back-btn" type="button">← ${LESSONS.length} tranh</button></div>
        <section class="ee-draw-finish">
          <div style="font-size:56px" aria-hidden="true">🎉🐰</div>
          <h2>Bé vẽ xong rồi!</h2>
          <p>Cô Thỏ Hồng rất thích bức tranh của bé. Hai bức tranh không cần giống hệt nhau, quan trọng là bé đã biết đi từ hình lớn đến từng chi tiết nhỏ.</p>
          <div class="ee-draw-finish-grid">
            <div class="ee-draw-finish-panel"><strong>Tranh của bé</strong>${drawing ? `<img src="${drawing}" alt="Bức vẽ của bé">` : `<div class="ee-draw-empty">Bé đã chọn vẽ trên giấy thật.</div>`}</div>
            <div class="ee-draw-finish-panel"><strong>Tranh mẫu</strong>${referenceImageHtml(lesson)}</div>
          </div>
          <div class="ee-draw-finish-actions">
            <button id="ee-draw-again" class="ee-draw-btn secondary" type="button">Vẽ lại từ đầu</button>
            ${next ? `<button id="ee-draw-next-lesson" class="ee-draw-btn primary" type="button">Tranh tiếp theo: ${esc(next.title)} →</button>` : ""}
            <button id="ee-draw-other" class="ee-draw-btn secondary" type="button">Chọn tranh khác</button>
          </div>
        </section>
      </div>`;
    host.querySelector("#ee-draw-finish-back")?.addEventListener("click", renderRegistry);
    host.querySelector("#ee-draw-other")?.addEventListener("click", renderRegistry);
    host.querySelector("#ee-draw-next-lesson")?.addEventListener("click", () => renderLessonIntro(next));
    host.querySelector("#ee-draw-again")?.addEventListener("click", () => {
      currentStepIndex = 0;
      renderStep(lesson, true);
    });
  }

  function render(context) {
    activeContext = context || null;
    ensureStyles();
    currentLessonId = "";
    currentStepIndex = 0;
    renderLoading("Đang mở Cô Thỏ Hồng dạy vẽ…");
    // Kho ảnh chỉ để hiện ảnh JPG; nếu chưa khai báo hoặc lỗi, game vẫn chạy bằng tranh vẽ sẵn.
    loadCatalog().catch(() => null).then(() => {
      if (!activeContext) return;
      renderRegistry();
    });
  }

  function destroy() {
    cleanupPad();
    stopSpeak();
    if (catalogAbort) {
      try { catalogAbort.abort(); } catch (_) {}
    }
    catalogAbort = null;
    catalogPromise = null;
    activeContext = null;
    currentLessonId = "";
    currentStepIndex = 0;
  }

  window.CLASS1_GAME_MODULES = window.CLASS1_GAME_MODULES || {};
  window.CLASS1_GAME_MODULES[MODULE_KEY] = Object.freeze({ render, destroy });
})();

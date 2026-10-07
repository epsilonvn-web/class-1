(() => {
  "use strict";

  /* Vòng đời kỳ diệu – sắp xếp các giai đoạn của vòng đời theo đúng thứ tự. */
  const MODULE_KEY = "lifeCycle";
  const STYLE_ID = "class1-games-life-cycle-style-v4";
  const GAME_NUMBER = 8; // đổi số này cho khớp với vị trí game trong trang Games
  const GAME_TITLE = "Vòng đời kỳ diệu";
  const STARS_KEY = "class1-life-cycle-stars";
  const INK = "#3B2314";

  const ART = Object.freeze({"ga_trung": "<ellipse cx=\"100\" cy=\"116\" rx=\"30\" ry=\"40\" fill=\"#FFF8E1\"/><path d=\"M36 150 C40 186 160 186 164 150 Z\" fill=\"#D7A86E\"/><path d=\"M44 158 L156 158 M52 170 L148 170\" fill=\"none\" stroke=\"#A0673A\" stroke-width=\"3\"/>", "ga_no": "<path d=\"M36 150 C40 186 160 186 164 150 Z\" fill=\"#D7A86E\"/><path d=\"M44 158 L156 158 M52 170 L148 170\" fill=\"none\" stroke=\"#A0673A\" stroke-width=\"3\"/><path d=\"M66 150 L66 118 L76 108 L86 120 L96 106 L106 120 L118 106 L128 118 L134 110 L134 150 Z\" fill=\"#FFF8E1\"/><circle cx=\"100\" cy=\"96\" r=\"22\" fill=\"#FFE066\"/><path d=\"M78 96 L68 100 L78 104 Z\" fill=\"#F59E0B\"/><circle cx=\"92\" cy=\"92\" r=\"4.5\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"93.6\" cy=\"90.4\" r=\"1.6\" fill=\"#fff\" stroke=\"none\"/><ellipse cx=\"104\" cy=\"104\" rx=\"6\" ry=\"3.5\" fill=\"#F8A5B8\" stroke=\"none\"/><path d=\"M96 76 C94 68 102 66 104 74\" fill=\"none\" stroke-width=\"3\"/>", "ga_con": "<g transform=\"translate(104 106) scale(1.25)\"><path d=\"M-10 40 L-12 54 M-12 54 L-20 58 M-12 54 L-4 58 M12 40 L14 54 M14 54 L6 58 M14 54 L22 58\" fill=\"none\" stroke=\"#E07B12\" stroke-width=\"4\"/><ellipse cx=\"2\" cy=\"14\" rx=\"38\" ry=\"30\" fill=\"#FFE066\"/><path d=\"M14 6 C26 0 40 8 34 20 C26 26 14 22 10 14 Z\" fill=\"#FDD835\"/><circle cx=\"-18\" cy=\"-18\" r=\"24\" fill=\"#FFE066\"/><path d=\"M-22 -42 C-24 -50 -16 -52 -14 -44\" fill=\"none\" stroke-width=\"3\"/><path d=\"M-40 -18 L-52 -14 L-40 -10 Z\" fill=\"#F59E0B\"/><circle cx=\"-24\" cy=\"-22\" r=\"4.5\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"-22.4\" cy=\"-23.6\" r=\"1.6\" fill=\"#fff\" stroke=\"none\"/><ellipse cx=\"-14\" cy=\"-10\" rx=\"6\" ry=\"3.5\" fill=\"#F8A5B8\" stroke=\"none\"/></g><path d=\"M30 178 L170 178\" fill=\"none\" stroke=\"#9CCC65\" stroke-width=\"6\"/>", "ga_lon": "<g transform=\"translate(106 92) scale(1.05)\"><path d=\"M-6 50 L-10 72 M-10 72 L-20 76 M-10 72 L0 76 M18 50 L22 72 M22 72 L12 76 M22 72 L32 76\" fill=\"none\" stroke=\"#E07B12\" stroke-width=\"5\"/><path d=\"M40 -6 C58 -20 70 -14 66 4 C74 8 72 24 58 26 Z\" fill=\"#F5F5F5\"/><path d=\"M-40 -10 C-60 20 -40 58 6 58 C48 58 66 30 58 6 C50 -8 30 -6 16 -16 Z\" fill=\"#FFFFFF\"/><path d=\"M-6 16 C8 2 40 4 46 18 C44 34 18 38 -2 32 C-8 28 -10 22 -6 16 Z\" fill=\"#ECEFF1\"/><path d=\"M-40 -6 C-50 -36 -36 -56 -14 -54 C6 -52 14 -30 8 -10 C-4 0 -24 4 -40 -6 Z\" fill=\"#FFFFFF\"/><path d=\"M-34 -50 C-38 -64 -24 -68 -22 -58 C-16 -70 0 -64 -6 -52 Z\" fill=\"#E53935\"/><path d=\"M-48 -34 L-64 -28 L-48 -22 Z\" fill=\"#F59E0B\"/><path d=\"M-46 -20 C-54 -14 -52 -4 -44 -6 Z\" fill=\"#E53935\"/><circle cx=\"-30\" cy=\"-36\" r=\"5\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"-28.2\" cy=\"-37.8\" r=\"1.8\" fill=\"#fff\" stroke=\"none\"/><ellipse cx=\"-20\" cy=\"-24\" rx=\"6\" ry=\"3.5\" fill=\"#F8A5B8\" stroke=\"none\"/></g>", "buom_trung": "<path d=\"M20 140 C40 70 130 50 184 70 C170 140 90 176 20 140 Z\" fill=\"#81C784\"/><path d=\"M28 134 C80 116 130 96 176 74\" fill=\"none\" stroke-width=\"3\"/><circle cx=\"88\" cy=\"104\" r=\"6\" fill=\"#FFF59D\" stroke-width=\"3\"/><circle cx=\"102\" cy=\"98\" r=\"6\" fill=\"#FFF59D\" stroke-width=\"3\"/><circle cx=\"96\" cy=\"116\" r=\"6\" fill=\"#FFF59D\" stroke-width=\"3\"/><circle cx=\"110\" cy=\"110\" r=\"6\" fill=\"#FFF59D\" stroke-width=\"3\"/><circle cx=\"116\" cy=\"96\" r=\"6\" fill=\"#FFF59D\" stroke-width=\"3\"/>", "buom_sau": "<path d=\"M20 140 C40 70 130 50 184 70 C170 140 90 176 20 140 Z\" fill=\"#81C784\"/><path d=\"M28 134 C80 116 130 96 176 74\" fill=\"none\" stroke-width=\"3\"/><circle cx=\"150\" cy=\"90\" r=\"14\" fill=\"#9CCC65\"/><circle cx=\"132\" cy=\"94\" r=\"14\" fill=\"#9CCC65\"/><circle cx=\"114\" cy=\"98\" r=\"14\" fill=\"#9CCC65\"/><circle cx=\"96\" cy=\"102\" r=\"14\" fill=\"#9CCC65\"/><circle cx=\"78\" cy=\"106\" r=\"14\" fill=\"#9CCC65\"/><circle cx=\"60\" cy=\"110\" r=\"17\" fill=\"#8BC34A\"/><circle cx=\"54\" cy=\"106\" r=\"4\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"55.4\" cy=\"104.6\" r=\"1.4\" fill=\"#fff\" stroke=\"none\"/><circle cx=\"66\" cy=\"106\" r=\"4\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"67.4\" cy=\"104.6\" r=\"1.4\" fill=\"#fff\" stroke=\"none\"/><path d=\"M52 92 L46 80 M66 92 L70 80\" fill=\"none\" stroke-width=\"3\"/><path d=\"M56.0 116 Q60 120 64.0 116\" fill=\"none\" stroke-width=\"3\"/>", "buom_nhong": "<path d=\"M20 40 L184 40\" fill=\"none\" stroke=\"#A0673A\" stroke-width=\"10\"/><path d=\"M100 44 L100 58\" fill=\"none\" stroke-width=\"4\"/><path d=\"M100 58 C70 70 72 130 100 168 C128 130 130 70 100 58 Z\" fill=\"#AED581\"/><path d=\"M84 92 L116 92 M82 112 L118 112 M86 132 L114 132\" fill=\"none\" stroke-width=\"3\"/><circle cx=\"108\" cy=\"80\" r=\"3\" fill=\"#FFD54F\" stroke=\"none\"/><circle cx=\"92\" cy=\"122\" r=\"3\" fill=\"#FFD54F\" stroke=\"none\"/>", "buom_lon": "<g transform=\"translate(100 98) scale(1.2)\"><path d=\"M-4 -6 C-20 -50 -60 -60 -70 -40 C-80 -18 -50 0 -4 4 Z M4 -6 C20 -50 60 -60 70 -40 C80 -18 50 0 4 4 Z\" fill=\"#F48FB1\"/><path d=\"M-4 6 C-44 8 -62 30 -54 50 C-44 66 -16 50 -4 18 Z M4 6 C44 8 62 30 54 50 C44 66 16 50 4 18 Z\" fill=\"#B39DDB\"/><circle cx=\"-44\" cy=\"-30\" r=\"10\" fill=\"#FFF59D\" stroke-width=\"3\"/><circle cx=\"44\" cy=\"-30\" r=\"10\" fill=\"#FFF59D\" stroke-width=\"3\"/><path d=\"M0 -30 C8 -30 10 -10 10 10 C10 40 6 52 0 52 C-6 52 -10 40 -10 10 C-10 -10 -8 -30 0 -30 Z\" fill=\"#7E57C2\"/><circle cx=\"0\" cy=\"-36\" r=\"12\" fill=\"#7E57C2\"/><path d=\"M-5 -46 C-10 -60 -20 -66 -28 -64 M5 -46 C10 -60 20 -66 28 -64\" fill=\"none\" stroke-width=\"3\"/><circle cx=\"-5\" cy=\"-37\" r=\"3\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"-4.0\" cy=\"-38.0\" r=\"1.0\" fill=\"#fff\" stroke=\"none\"/><circle cx=\"5\" cy=\"-37\" r=\"3\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"6.0\" cy=\"-38.0\" r=\"1.0\" fill=\"#fff\" stroke=\"none\"/></g>", "nuoc_bien": "<path d=\"M20 120 C40 80 80 100 100 90 C130 74 160 96 180 84\" fill=\"none\" stroke=\"#9CCC65\" stroke-width=\"0\"/><path d=\"M10 100 L60 60 L90 90 L120 50 L190 100 Z\" fill=\"#A5D6A7\"/><path d=\"M10 110 Q30 102 50 110 T90 110 T130 110 T170 110 T190 110 L190 192 L10 192 Z\" fill=\"#81D4FA\"/><path d=\"M30 140 Q40 134 50 140 M110 156 Q120 150 130 156 M150 136 Q160 130 170 136\" fill=\"none\" stroke=\"#fff\" stroke-width=\"4\"/>", "nuoc_boc_hoi": "<path d=\"M180.0 46.0 L190.0 46.0\" fill=\"none\" stroke=\"#F59E0B\" stroke-width=\"4\"/><path d=\"M171.2 67.2 L178.3 74.3\" fill=\"none\" stroke=\"#F59E0B\" stroke-width=\"4\"/><path d=\"M150.0 76.0 L150.0 86.0\" fill=\"none\" stroke=\"#F59E0B\" stroke-width=\"4\"/><path d=\"M128.8 67.2 L121.7 74.3\" fill=\"none\" stroke=\"#F59E0B\" stroke-width=\"4\"/><path d=\"M120.0 46.0 L110.0 46.0\" fill=\"none\" stroke=\"#F59E0B\" stroke-width=\"4\"/><path d=\"M128.8 24.8 L121.7 17.7\" fill=\"none\" stroke=\"#F59E0B\" stroke-width=\"4\"/><path d=\"M150.0 16.0 L150.0 6.0\" fill=\"none\" stroke=\"#F59E0B\" stroke-width=\"4\"/><path d=\"M171.2 24.8 L178.3 17.7\" fill=\"none\" stroke=\"#F59E0B\" stroke-width=\"4\"/><circle cx=\"150\" cy=\"46\" r=\"24\" fill=\"#FFD54F\"/><circle cx=\"142\" cy=\"43\" r=\"3.5\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"143.2\" cy=\"41.8\" r=\"1.2\" fill=\"#fff\" stroke=\"none\"/><circle cx=\"158\" cy=\"43\" r=\"3.5\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"159.2\" cy=\"41.8\" r=\"1.2\" fill=\"#fff\" stroke=\"none\"/><path d=\"M145.0 53 Q150 58 155.0 53\" fill=\"none\" stroke-width=\"3\"/><path d=\"M10 140 Q30 132 50 140 T90 140 T130 140 T170 140 T190 140 L190 192 L10 192 Z\" fill=\"#81D4FA\"/><path d=\"M46 128 C38 116 54 106 46 94 C38 82 54 72 46 60\" fill=\"none\" stroke=\"#4FC3F7\" stroke-width=\"4\"/><path d=\"M39 66 L46 54 L53 66\" fill=\"none\" stroke=\"#4FC3F7\" stroke-width=\"4\"/><path d=\"M82 128 C74 116 90 106 82 94 C74 82 90 72 82 60\" fill=\"none\" stroke=\"#4FC3F7\" stroke-width=\"4\"/><path d=\"M75 66 L82 54 L89 66\" fill=\"none\" stroke=\"#4FC3F7\" stroke-width=\"4\"/><path d=\"M118 128 C110 116 126 106 118 94 C110 82 126 72 118 60\" fill=\"none\" stroke=\"#4FC3F7\" stroke-width=\"4\"/><path d=\"M111 66 L118 54 L125 66\" fill=\"none\" stroke=\"#4FC3F7\" stroke-width=\"4\"/>", "nuoc_may": "<path d=\"M42.50000000000001 98.4 C19.5 98.4 19.5 63.900000000000006 47.1 66.2 C49.400000000000006 36.300000000000004 93.1 31.700000000000003 100 57.0 C111.5 29.400000000000006 157.5 38.6 152.9 68.5 C180.5 68.5 180.5 98.4 155.2 98.4 Z\" fill=\"#ECEFF1\"/><path d=\"M120.0 139.6 C108.0 139.6 108.0 121.6 122.4 122.8 C123.6 107.2 146.4 104.8 150 118.0 C156.0 103.6 180.0 108.4 177.6 124.0 C192.0 124.0 192.0 139.6 178.8 139.6 Z\" fill=\"#FFFFFF\"/><path d=\"M24.499999999999996 144.8 C13.5 144.8 13.5 128.3 26.7 129.4 C27.799999999999997 115.1 48.7 112.9 52 125.0 C57.5 111.8 79.5 116.2 77.3 130.5 C90.5 130.5 90.5 144.8 78.4 144.8 Z\" fill=\"#FFFFFF\"/><circle cx=\"88\" cy=\"76\" r=\"5\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"89.8\" cy=\"74.2\" r=\"1.8\" fill=\"#fff\" stroke=\"none\"/><circle cx=\"112\" cy=\"76\" r=\"5\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"113.8\" cy=\"74.2\" r=\"1.8\" fill=\"#fff\" stroke=\"none\"/><path d=\"M94.0 88 Q100 94 106.0 88\" fill=\"none\" stroke-width=\"3\"/>", "nuoc_mua": "<path d=\"M42.50000000000001 80.4 C19.5 80.4 19.5 45.900000000000006 47.1 48.2 C49.400000000000006 18.300000000000004 93.1 13.700000000000003 100 39.0 C111.5 11.400000000000006 157.5 20.6 152.9 50.5 C180.5 50.5 180.5 80.4 155.2 80.4 Z\" fill=\"#B0BEC5\"/><path d=\"M56 104 C50 114 50 122 56 122 C62 122 62 114 56 104 Z\" fill=\"#4FC3F7\" stroke-width=\"3\"/><path d=\"M84 120 C78 130 78 138 84 138 C90 138 90 130 84 120 Z\" fill=\"#4FC3F7\" stroke-width=\"3\"/><path d=\"M112 104 C106 114 106 122 112 122 C118 122 118 114 112 104 Z\" fill=\"#4FC3F7\" stroke-width=\"3\"/><path d=\"M140 122 C134 132 134 140 140 140 C146 140 146 132 140 122 Z\" fill=\"#4FC3F7\" stroke-width=\"3\"/><path d=\"M70 148 C64 158 64 166 70 166 C76 166 76 158 70 148 Z\" fill=\"#4FC3F7\" stroke-width=\"3\"/><path d=\"M124 150 C118 160 118 168 124 168 C130 168 130 160 124 150 Z\" fill=\"#4FC3F7\" stroke-width=\"3\"/><path d=\"M98 166 C92 176 92 184 98 184 C104 184 104 176 98 166 Z\" fill=\"#4FC3F7\" stroke-width=\"3\"/>", "ong_trung": "<polygon points=\"153.7,131.0 100.0,162.0 46.3,131.0 46.3,69.0 100.0,38.0 153.7,69.0\" fill=\"#FFD54F\"/><polygon points=\"143.3,125.0 100.0,150.0 56.7,125.0 56.7,75.0 100.0,50.0 143.3,75.0\" fill=\"#FFF3C4\" stroke-width=\"3\"/><ellipse cx=\"100\" cy=\"100\" rx=\"9\" ry=\"18\" fill=\"#FFFFFF\" stroke-width=\"3\"/>", "ong_au_trung": "<polygon points=\"153.7,131.0 100.0,162.0 46.3,131.0 46.3,69.0 100.0,38.0 153.7,69.0\" fill=\"#FFD54F\"/><polygon points=\"143.3,125.0 100.0,150.0 56.7,125.0 56.7,75.0 100.0,50.0 143.3,75.0\" fill=\"#FFF3C4\" stroke-width=\"3\"/><path d=\"M78 92 C78 66 122 66 124 94 C126 120 96 132 84 116 C92 118 110 114 110 98 C110 82 88 82 92 100 Z\" fill=\"#FFFFFF\" stroke-width=\"3.5\"/><path d=\"M90 78 L94 90 M106 76 L106 88 M118 86 L112 96\" fill=\"none\" stroke-width=\"2.5\"/>", "ong_nhong": "<polygon points=\"153.7,131.0 100.0,162.0 46.3,131.0 46.3,69.0 100.0,38.0 153.7,69.0\" fill=\"#FFD54F\"/><polygon points=\"143.3,125.0 100.0,150.0 56.7,125.0 56.7,75.0 100.0,50.0 143.3,75.0\" fill=\"#FFF3C4\" stroke-width=\"3\"/><path d=\"M100 62 C82 62 80 80 82 100 C84 124 90 138 100 138 C110 138 116 124 118 100 C120 80 118 62 100 62 Z\" fill=\"#FFF8E1\" stroke-width=\"3.5\"/><circle cx=\"92\" cy=\"76\" r=\"5\" fill=\"#8D6E63\" stroke=\"none\"/><circle cx=\"108\" cy=\"76\" r=\"5\" fill=\"#8D6E63\" stroke=\"none\"/><path d=\"M88 96 L112 96 M88 110 L112 110 M90 124 L110 124\" fill=\"none\" stroke-width=\"2.5\"/>", "ong_lon": "<g transform=\"translate(110 110) scale(1.15)\"><ellipse cx=\"-6\" cy=\"-30\" rx=\"18\" ry=\"24\" fill=\"#DFF3FF\" transform=\"rotate(-20 -6 -30)\"/><ellipse cx=\"18\" cy=\"-28\" rx=\"16\" ry=\"22\" fill=\"#DFF3FF\" transform=\"rotate(25 18 -28)\"/><ellipse cx=\"10\" cy=\"0\" rx=\"44\" ry=\"30\" fill=\"#FDD835\"/><path d=\"M0 -29 C-6 -10 -6 10 0 29 L14 29 C8 10 8 -10 14 -29 Z M30 -22 C24 -8 24 8 30 22 L40 16 C36 6 36 -6 40 -16 Z\" fill=\"#3B2314\"/><path d=\"M54 -4 L68 0 L54 6 Z\" fill=\"#3B2314\"/><circle cx=\"-38\" cy=\"-2\" r=\"24\" fill=\"#FDD835\"/><path d=\"M-46 -24 C-50 -38 -60 -44 -66 -42 M-30 -24 C-28 -38 -20 -46 -12 -46\" fill=\"none\" stroke-width=\"3\"/><circle cx=\"-46\" cy=\"-6\" r=\"4.5\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"-44.4\" cy=\"-7.6\" r=\"1.6\" fill=\"#fff\" stroke=\"none\"/><circle cx=\"-30\" cy=\"-6\" r=\"4.5\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"-28.4\" cy=\"-7.6\" r=\"1.6\" fill=\"#fff\" stroke=\"none\"/><ellipse cx=\"-52\" cy=\"6\" rx=\"5\" ry=\"3\" fill=\"#F8A5B8\" stroke=\"none\"/><ellipse cx=\"-24\" cy=\"6\" rx=\"5\" ry=\"3\" fill=\"#F8A5B8\" stroke=\"none\"/><path d=\"M-43.0 6 Q-38 11 -33.0 6\" fill=\"none\" stroke-width=\"3\"/></g>", "rua_trung": "<path d=\"M0 150 Q100 130 200 150 L200 200 L0 200 Z\" fill=\"#FFE0A3\"/><ellipse cx=\"100\" cy=\"150\" rx=\"70\" ry=\"26\" fill=\"#E8C680\"/><ellipse cx=\"74\" cy=\"146\" rx=\"15\" ry=\"15\" fill=\"#FFFFFF\"/><ellipse cx=\"100\" cy=\"140\" rx=\"15\" ry=\"15\" fill=\"#FFFFFF\"/><ellipse cx=\"126\" cy=\"146\" rx=\"15\" ry=\"15\" fill=\"#FFFFFF\"/><ellipse cx=\"88\" cy=\"160\" rx=\"15\" ry=\"15\" fill=\"#FFFFFF\"/><ellipse cx=\"114\" cy=\"160\" rx=\"15\" ry=\"15\" fill=\"#FFFFFF\"/>", "rua_no": "<path d=\"M0 150 Q100 130 200 150 L200 200 L0 200 Z\" fill=\"#FFE0A3\"/><path d=\"M62 158 C62 120 78 104 100 104 C122 104 138 120 138 158 Z\" fill=\"#FFFFFF\"/><path d=\"M62 128 L74 120 L82 132 L94 118 L106 132 L118 118 L128 130 L138 124\" fill=\"none\" stroke-width=\"3.5\"/><g transform=\"translate(100 106) scale(0.9)\"><path d=\"M-30 6 L-48 18 L-36 22 Z M30 6 L48 18 L36 22 Z M-24 -14 L-44 -26 L-34 -30 Z M24 -14 L44 -26 L34 -30 Z\" fill=\"#9BD67A\"/><circle cx=\"0\" cy=\"-34\" r=\"14\" fill=\"#9BD67A\"/><circle cx=\"-5\" cy=\"-36\" r=\"3.5\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"-3.8\" cy=\"-37.2\" r=\"1.2\" fill=\"#fff\" stroke=\"none\"/><circle cx=\"5\" cy=\"-36\" r=\"3.5\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"6.2\" cy=\"-37.2\" r=\"1.2\" fill=\"#fff\" stroke=\"none\"/><ellipse cx=\"0\" cy=\"0\" rx=\"32\" ry=\"38\" fill=\"#4CAF50\"/><path d=\"M-14 -16 L14 -16 L22 0 L14 16 L-14 16 L-22 0 Z\" fill=\"#81C784\" stroke-width=\"3\"/></g>", "rua_ra_bien": "<path d=\"M0 0 L200 0 L200 70 Q150 80 100 66 Q50 54 0 70 Z\" fill=\"#81D4FA\"/><path d=\"M0 100 Q100 80 200 100 L200 200 L0 200 Z\" fill=\"#FFE0A3\"/><g transform=\"translate(100 140) scale(0.9)\"><path d=\"M-30 6 L-48 18 L-36 22 Z M30 6 L48 18 L36 22 Z M-24 -14 L-44 -26 L-34 -30 Z M24 -14 L44 -26 L34 -30 Z\" fill=\"#9BD67A\"/><circle cx=\"0\" cy=\"-34\" r=\"14\" fill=\"#9BD67A\"/><circle cx=\"-5\" cy=\"-36\" r=\"3.5\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"-3.8\" cy=\"-37.2\" r=\"1.2\" fill=\"#fff\" stroke=\"none\"/><circle cx=\"5\" cy=\"-36\" r=\"3.5\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"6.2\" cy=\"-37.2\" r=\"1.2\" fill=\"#fff\" stroke=\"none\"/><ellipse cx=\"0\" cy=\"0\" rx=\"32\" ry=\"38\" fill=\"#4CAF50\"/><path d=\"M-14 -16 L14 -16 L22 0 L14 16 L-14 16 L-22 0 Z\" fill=\"#81C784\" stroke-width=\"3\"/></g><path d=\"M70 196 L76 186 M130 196 L124 186 M100 200 L100 188\" fill=\"none\" stroke=\"#C9A35A\" stroke-width=\"3\"/>", "rua_lon": "<rect x=\"0\" y=\"0\" width=\"200\" height=\"200\" fill=\"#B3E5FC\" stroke=\"none\"/><g transform=\"translate(100 108) scale(0.95)\"><path d=\"M-20 -20 C-50 -50 -80 -46 -84 -34 C-60 -30 -40 -16 -30 -4 Z M20 22 C40 44 60 52 70 46 C58 36 44 24 34 12 Z M-20 22 C-40 44 -60 52 -70 46 C-58 36 -44 24 -34 12 Z M20 -20 C50 -50 80 -46 84 -34 C60 -30 40 -16 30 -4 Z\" fill=\"#9BD67A\"/><path d=\"M0 -44 C-14 -44 -20 -58 -12 -68 C-4 -76 4 -76 12 -68 C20 -58 14 -44 0 -44 Z\" fill=\"#9BD67A\"/><circle cx=\"-6\" cy=\"-60\" r=\"4\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"-4.6\" cy=\"-61.4\" r=\"1.4\" fill=\"#fff\" stroke=\"none\"/><circle cx=\"6\" cy=\"-60\" r=\"4\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"7.4\" cy=\"-61.4\" r=\"1.4\" fill=\"#fff\" stroke=\"none\"/><ellipse cx=\"0\" cy=\"0\" rx=\"46\" ry=\"52\" fill=\"#4CAF50\"/><path d=\"M-18 -22 L18 -22 L28 0 L18 22 L-18 22 L-28 0 Z\" fill=\"#81C784\" stroke-width=\"3\"/><path d=\"M-18 -22 L-30 -38 M18 -22 L30 -38 M-28 0 L-46 0 M28 0 L46 0 M-18 22 L-30 38 M18 22 L30 38\" fill=\"none\" stroke-width=\"3\"/></g><circle cx=\"34\" cy=\"40\" r=\"6\" fill=\"#E3F2FD\" stroke-width=\"3\"/><circle cx=\"24\" cy=\"62\" r=\"4\" fill=\"#E3F2FD\" stroke-width=\"3\"/>", "dau_hat": "<path d=\"M14 168 Q100 150 186 168 L186 188 L14 188 Z\" fill=\"#A0673A\"/><path d=\"M40 176 L48 176 M120 178 L128 178 M80 182 L86 182\" fill=\"none\" stroke=\"#7A4A28\" stroke-width=\"3\"/><g transform=\"translate(78 150) scale(1.4)\"><path d=\"M0 0 C0 -16 30 -18 34 -4 C38 10 20 12 14 6 C8 12 0 10 0 0 Z\" fill=\"#C98B4E\"/><path d=\"M12 -6 C16 -8 20 -6 20 -2\" fill=\"none\" stroke-width=\"3\"/></g>", "dau_mam": "<path d=\"M14 168 Q100 150 186 168 L186 188 L14 188 Z\" fill=\"#A0673A\"/><path d=\"M40 176 L48 176 M120 178 L128 178 M80 182 L86 182\" fill=\"none\" stroke=\"#7A4A28\" stroke-width=\"3\"/><g transform=\"translate(70 166) scale(1.3)\"><path d=\"M0 0 C0 -16 30 -18 34 -4 C38 10 20 12 14 6 C8 12 0 10 0 0 Z\" fill=\"#C98B4E\"/><path d=\"M12 -6 C16 -8 20 -6 20 -2\" fill=\"none\" stroke-width=\"3\"/></g><path d=\"M94 172 C96 180 90 186 92 192\" fill=\"none\" stroke=\"#EFEBE9\" stroke-width=\"4\"/><path d=\"M96 160 C96 132.0 100 132.0 100 104\" fill=\"none\" stroke=\"#4CAF50\" stroke-width=\"7\"/><path d=\"M96 160 C96 132.0 100 132.0 100 104\" fill=\"none\" stroke=\"#81C784\" stroke-width=\"3\"/><path d=\"M100 104 C88 96 84 84 92 80 C100 86 102 96 100 104 Z\" fill=\"#AED581\"/>", "dau_cay_con": "<path d=\"M14 168 Q100 150 186 168 L186 188 L14 188 Z\" fill=\"#A0673A\"/><path d=\"M40 176 L48 176 M120 178 L128 178 M80 182 L86 182\" fill=\"none\" stroke=\"#7A4A28\" stroke-width=\"3\"/><path d=\"M100 162 C100 121.0 100 121.0 100 80\" fill=\"none\" stroke=\"#4CAF50\" stroke-width=\"7\"/><path d=\"M100 162 C100 121.0 100 121.0 100 80\" fill=\"none\" stroke=\"#81C784\" stroke-width=\"3\"/><path d=\"M0 0 C10 -14 30 -14 40 0 C30 10 10 10 0 0 Z\" fill=\"#81C784\" transform=\"translate(100 92) rotate(-150) scale(1.2)\"/><path d=\"M4 0 L34 0\" fill=\"none\" stroke-width=\"2.5\" transform=\"translate(100 92) rotate(-150) scale(1.2)\"/><path d=\"M0 0 C10 -14 30 -14 40 0 C30 10 10 10 0 0 Z\" fill=\"#81C784\" transform=\"translate(100 92) rotate(-30) scale(1.2)\"/><path d=\"M4 0 L34 0\" fill=\"none\" stroke-width=\"2.5\" transform=\"translate(100 92) rotate(-30) scale(1.2)\"/><path d=\"M0 0 C10 -14 30 -14 40 0 C30 10 10 10 0 0 Z\" fill=\"#81C784\" transform=\"translate(100 124) rotate(160) scale(0.9)\"/><path d=\"M4 0 L34 0\" fill=\"none\" stroke-width=\"2.5\" transform=\"translate(100 124) rotate(160) scale(0.9)\"/>", "dau_ra_hoa": "<path d=\"M14 168 Q100 150 186 168 L186 188 L14 188 Z\" fill=\"#A0673A\"/><path d=\"M40 176 L48 176 M120 178 L128 178 M80 182 L86 182\" fill=\"none\" stroke=\"#7A4A28\" stroke-width=\"3\"/><path d=\"M100 162 C100 96.0 100 96.0 100 30\" fill=\"none\" stroke=\"#4CAF50\" stroke-width=\"7\"/><path d=\"M100 162 C100 96.0 100 96.0 100 30\" fill=\"none\" stroke=\"#81C784\" stroke-width=\"3\"/><path d=\"M0 0 C10 -14 30 -14 40 0 C30 10 10 10 0 0 Z\" fill=\"#81C784\" transform=\"translate(100 132) rotate(160) scale(1.1)\"/><path d=\"M4 0 L34 0\" fill=\"none\" stroke-width=\"2.5\" transform=\"translate(100 132) rotate(160) scale(1.1)\"/><path d=\"M0 0 C10 -14 30 -14 40 0 C30 10 10 10 0 0 Z\" fill=\"#81C784\" transform=\"translate(100 110) rotate(10) scale(1.1)\"/><path d=\"M4 0 L34 0\" fill=\"none\" stroke-width=\"2.5\" transform=\"translate(100 110) rotate(10) scale(1.1)\"/><path d=\"M0 0 C10 -14 30 -14 40 0 C30 10 10 10 0 0 Z\" fill=\"#81C784\" transform=\"translate(100 84) rotate(170) scale(1.0)\"/><path d=\"M4 0 L34 0\" fill=\"none\" stroke-width=\"2.5\" transform=\"translate(100 84) rotate(170) scale(1.0)\"/><path d=\"M0 0 C10 -14 30 -14 40 0 C30 10 10 10 0 0 Z\" fill=\"#81C784\" transform=\"translate(100 62) rotate(-10) scale(0.9)\"/><path d=\"M4 0 L34 0\" fill=\"none\" stroke-width=\"2.5\" transform=\"translate(100 62) rotate(-10) scale(0.9)\"/><path d=\"M66 74 C56 62 64 54 70 64 C76 54 84 64 74 74 Z\" fill=\"#CE93D8\" stroke-width=\"3\"/><path d=\"M128 56 C118 44 126 36 132 46 C138 36 146 46 136 56 Z\" fill=\"#CE93D8\" stroke-width=\"3\"/><path d=\"M70 112 C60 100 68 92 74 102 C80 92 88 102 78 112 Z\" fill=\"#CE93D8\" stroke-width=\"3\"/><path d=\"M126 98 C116 86 124 78 130 88 C136 78 144 88 134 98 Z\" fill=\"#CE93D8\" stroke-width=\"3\"/>", "dau_qua": "<path d=\"M14 168 Q100 150 186 168 L186 188 L14 188 Z\" fill=\"#A0673A\"/><path d=\"M40 176 L48 176 M120 178 L128 178 M80 182 L86 182\" fill=\"none\" stroke=\"#7A4A28\" stroke-width=\"3\"/><path d=\"M100 162 C100 96.0 100 96.0 100 30\" fill=\"none\" stroke=\"#4CAF50\" stroke-width=\"7\"/><path d=\"M100 162 C100 96.0 100 96.0 100 30\" fill=\"none\" stroke=\"#81C784\" stroke-width=\"3\"/><path d=\"M0 0 C10 -14 30 -14 40 0 C30 10 10 10 0 0 Z\" fill=\"#81C784\" transform=\"translate(100 132) rotate(160) scale(1.1)\"/><path d=\"M4 0 L34 0\" fill=\"none\" stroke-width=\"2.5\" transform=\"translate(100 132) rotate(160) scale(1.1)\"/><path d=\"M0 0 C10 -14 30 -14 40 0 C30 10 10 10 0 0 Z\" fill=\"#81C784\" transform=\"translate(100 110) rotate(10) scale(1.1)\"/><path d=\"M4 0 L34 0\" fill=\"none\" stroke-width=\"2.5\" transform=\"translate(100 110) rotate(10) scale(1.1)\"/><path d=\"M0 0 C10 -14 30 -14 40 0 C30 10 10 10 0 0 Z\" fill=\"#81C784\" transform=\"translate(100 70) rotate(170) scale(1.0)\"/><path d=\"M4 0 L34 0\" fill=\"none\" stroke-width=\"2.5\" transform=\"translate(100 70) rotate(170) scale(1.0)\"/><g transform=\"translate(96 80) rotate(18)\"><path d=\"M0 0 C6 26 4 52 -10 66 C-18 52 -14 24 -8 0 Z\" fill=\"#9CCC65\"/><circle cx=\"-4\" cy=\"18\" r=\"4\" fill=\"#C5E1A5\" stroke-width=\"2.5\"/><circle cx=\"-5\" cy=\"34\" r=\"4\" fill=\"#C5E1A5\" stroke-width=\"2.5\"/><circle cx=\"-8\" cy=\"50\" r=\"4\" fill=\"#C5E1A5\" stroke-width=\"2.5\"/></g><g transform=\"translate(108 50) rotate(-24)\"><path d=\"M0 0 C6 26 4 52 -10 66 C-18 52 -14 24 -8 0 Z\" fill=\"#9CCC65\"/><circle cx=\"-4\" cy=\"18\" r=\"4\" fill=\"#C5E1A5\" stroke-width=\"2.5\"/><circle cx=\"-5\" cy=\"34\" r=\"4\" fill=\"#C5E1A5\" stroke-width=\"2.5\"/><circle cx=\"-8\" cy=\"50\" r=\"4\" fill=\"#C5E1A5\" stroke-width=\"2.5\"/></g><g transform=\"translate(98 112) rotate(30)\"><path d=\"M0 0 C6 26 4 52 -10 66 C-18 52 -14 24 -8 0 Z\" fill=\"#9CCC65\"/><circle cx=\"-4\" cy=\"18\" r=\"4\" fill=\"#C5E1A5\" stroke-width=\"2.5\"/><circle cx=\"-5\" cy=\"34\" r=\"4\" fill=\"#C5E1A5\" stroke-width=\"2.5\"/><circle cx=\"-8\" cy=\"50\" r=\"4\" fill=\"#C5E1A5\" stroke-width=\"2.5\"/></g>", "hd_hat": "<path d=\"M14 168 Q100 150 186 168 L186 188 L14 188 Z\" fill=\"#A0673A\"/><path d=\"M40 176 L48 176 M120 178 L128 178 M80 182 L86 182\" fill=\"none\" stroke=\"#7A4A28\" stroke-width=\"3\"/><g transform=\"translate(100 140) rotate(70) scale(1.3)\"><path d=\"M0 -24 C14 -24 18 0 0 26 C-18 0 -14 -24 0 -24 Z\" fill=\"#424242\"/><path d=\"M-5 -16 L-5 12 M5 -16 L5 12\" fill=\"none\" stroke=\"#FFFFFF\" stroke-width=\"3\"/></g>", "hd_mam": "<path d=\"M14 168 Q100 150 186 168 L186 188 L14 188 Z\" fill=\"#A0673A\"/><path d=\"M40 176 L48 176 M120 178 L128 178 M80 182 L86 182\" fill=\"none\" stroke=\"#7A4A28\" stroke-width=\"3\"/><path d=\"M100 162 C100 135.0 100 135.0 100 108\" fill=\"none\" stroke=\"#4CAF50\" stroke-width=\"7\"/><path d=\"M100 162 C100 135.0 100 135.0 100 108\" fill=\"none\" stroke=\"#81C784\" stroke-width=\"3\"/><path d=\"M100 110 C80 112 66 100 66 92 C82 88 96 96 100 110 Z M100 110 C120 112 134 100 134 92 C118 88 104 96 100 110 Z\" fill=\"#AED581\"/>", "hd_cay_non": "<path d=\"M14 168 Q100 150 186 168 L186 188 L14 188 Z\" fill=\"#A0673A\"/><path d=\"M40 176 L48 176 M120 178 L128 178 M80 182 L86 182\" fill=\"none\" stroke=\"#7A4A28\" stroke-width=\"3\"/><path d=\"M100 162 C100 113.0 100 113.0 100 64\" fill=\"none\" stroke=\"#4CAF50\" stroke-width=\"7\"/><path d=\"M100 162 C100 113.0 100 113.0 100 64\" fill=\"none\" stroke=\"#81C784\" stroke-width=\"3\"/><path d=\"M0 0 C10 -14 30 -14 40 0 C30 10 10 10 0 0 Z\" fill=\"#81C784\" transform=\"translate(100 132) rotate(160) scale(1.2)\"/><path d=\"M4 0 L34 0\" fill=\"none\" stroke-width=\"2.5\" transform=\"translate(100 132) rotate(160) scale(1.2)\"/><path d=\"M0 0 C10 -14 30 -14 40 0 C30 10 10 10 0 0 Z\" fill=\"#81C784\" transform=\"translate(100 112) rotate(20) scale(1.2)\"/><path d=\"M4 0 L34 0\" fill=\"none\" stroke-width=\"2.5\" transform=\"translate(100 112) rotate(20) scale(1.2)\"/><path d=\"M0 0 C10 -14 30 -14 40 0 C30 10 10 10 0 0 Z\" fill=\"#81C784\" transform=\"translate(100 86) rotate(165) scale(1.0)\"/><path d=\"M4 0 L34 0\" fill=\"none\" stroke-width=\"2.5\" transform=\"translate(100 86) rotate(165) scale(1.0)\"/><path d=\"M0 0 C10 -14 30 -14 40 0 C30 10 10 10 0 0 Z\" fill=\"#81C784\" transform=\"translate(100 72) rotate(15) scale(0.9)\"/><path d=\"M4 0 L34 0\" fill=\"none\" stroke-width=\"2.5\" transform=\"translate(100 72) rotate(15) scale(0.9)\"/>", "hd_nu": "<path d=\"M14 168 Q100 150 186 168 L186 188 L14 188 Z\" fill=\"#A0673A\"/><path d=\"M40 176 L48 176 M120 178 L128 178 M80 182 L86 182\" fill=\"none\" stroke=\"#7A4A28\" stroke-width=\"3\"/><path d=\"M100 162 C100 104.0 100 104.0 100 46\" fill=\"none\" stroke=\"#4CAF50\" stroke-width=\"7\"/><path d=\"M100 162 C100 104.0 100 104.0 100 46\" fill=\"none\" stroke=\"#81C784\" stroke-width=\"3\"/><path d=\"M0 0 C10 -14 30 -14 40 0 C30 10 10 10 0 0 Z\" fill=\"#81C784\" transform=\"translate(100 132) rotate(160) scale(1.2)\"/><path d=\"M4 0 L34 0\" fill=\"none\" stroke-width=\"2.5\" transform=\"translate(100 132) rotate(160) scale(1.2)\"/><path d=\"M0 0 C10 -14 30 -14 40 0 C30 10 10 10 0 0 Z\" fill=\"#81C784\" transform=\"translate(100 112) rotate(20) scale(1.2)\"/><path d=\"M4 0 L34 0\" fill=\"none\" stroke-width=\"2.5\" transform=\"translate(100 112) rotate(20) scale(1.2)\"/><path d=\"M0 0 C10 -14 30 -14 40 0 C30 10 10 10 0 0 Z\" fill=\"#81C784\" transform=\"translate(100 86) rotate(165) scale(1.0)\"/><path d=\"M4 0 L34 0\" fill=\"none\" stroke-width=\"2.5\" transform=\"translate(100 86) rotate(165) scale(1.0)\"/><path d=\"M100 18 C120 18 124 40 112 50 L88 50 C76 40 80 18 100 18 Z\" fill=\"#9CCC65\"/><path d=\"M92 50 L96 28 M108 50 L104 28 M100 50 L100 24\" fill=\"none\" stroke-width=\"2.5\"/><path d=\"M94 20 C98 14 102 14 106 20\" fill=\"#FFD54F\" stroke-width=\"3\"/>", "hd_hoa": "<path d=\"M14 168 Q100 150 186 168 L186 188 L14 188 Z\" fill=\"#A0673A\"/><path d=\"M40 176 L48 176 M120 178 L128 178 M80 182 L86 182\" fill=\"none\" stroke=\"#7A4A28\" stroke-width=\"3\"/><path d=\"M100 162 C100 126.0 100 126.0 100 90\" fill=\"none\" stroke=\"#4CAF50\" stroke-width=\"7\"/><path d=\"M100 162 C100 126.0 100 126.0 100 90\" fill=\"none\" stroke=\"#81C784\" stroke-width=\"3\"/><path d=\"M0 0 C10 -14 30 -14 40 0 C30 10 10 10 0 0 Z\" fill=\"#81C784\" transform=\"translate(100 140) rotate(160) scale(1.1)\"/><path d=\"M4 0 L34 0\" fill=\"none\" stroke-width=\"2.5\" transform=\"translate(100 140) rotate(160) scale(1.1)\"/><path d=\"M0 0 C10 -14 30 -14 40 0 C30 10 10 10 0 0 Z\" fill=\"#81C784\" transform=\"translate(100 122) rotate(20) scale(1.1)\"/><path d=\"M4 0 L34 0\" fill=\"none\" stroke-width=\"2.5\" transform=\"translate(100 122) rotate(20) scale(1.1)\"/><g transform=\"translate(100 64) scale(1.0)\"><ellipse cx=\"0\" cy=\"-34\" rx=\"10\" ry=\"20\" fill=\"#FFD54F\" transform=\"rotate(0)\"/><ellipse cx=\"0\" cy=\"-34\" rx=\"10\" ry=\"20\" fill=\"#FFD54F\" transform=\"rotate(30)\"/><ellipse cx=\"0\" cy=\"-34\" rx=\"10\" ry=\"20\" fill=\"#FFD54F\" transform=\"rotate(60)\"/><ellipse cx=\"0\" cy=\"-34\" rx=\"10\" ry=\"20\" fill=\"#FFD54F\" transform=\"rotate(90)\"/><ellipse cx=\"0\" cy=\"-34\" rx=\"10\" ry=\"20\" fill=\"#FFD54F\" transform=\"rotate(120)\"/><ellipse cx=\"0\" cy=\"-34\" rx=\"10\" ry=\"20\" fill=\"#FFD54F\" transform=\"rotate(150)\"/><ellipse cx=\"0\" cy=\"-34\" rx=\"10\" ry=\"20\" fill=\"#FFD54F\" transform=\"rotate(180)\"/><ellipse cx=\"0\" cy=\"-34\" rx=\"10\" ry=\"20\" fill=\"#FFD54F\" transform=\"rotate(210)\"/><ellipse cx=\"0\" cy=\"-34\" rx=\"10\" ry=\"20\" fill=\"#FFD54F\" transform=\"rotate(240)\"/><ellipse cx=\"0\" cy=\"-34\" rx=\"10\" ry=\"20\" fill=\"#FFD54F\" transform=\"rotate(270)\"/><ellipse cx=\"0\" cy=\"-34\" rx=\"10\" ry=\"20\" fill=\"#FFD54F\" transform=\"rotate(300)\"/><ellipse cx=\"0\" cy=\"-34\" rx=\"10\" ry=\"20\" fill=\"#FFD54F\" transform=\"rotate(330)\"/><circle r=\"24\" fill=\"#8D5A33\"/><circle cx=\"-8\" cy=\"-2\" r=\"4\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"-6.6\" cy=\"-3.4\" r=\"1.4\" fill=\"#fff\" stroke=\"none\"/><circle cx=\"8\" cy=\"-2\" r=\"4\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"9.4\" cy=\"-3.4\" r=\"1.4\" fill=\"#fff\" stroke=\"none\"/><path d=\"M-5.0 8 Q0 13 5.0 8\" fill=\"none\" stroke-width=\"3\"/></g>", "ech_trung": "<rect x=\"0\" y=\"0\" width=\"200\" height=\"200\" fill=\"#B3E5FC\" stroke=\"none\"/><path d=\"M0 170 Q100 154 200 170 L200 200 L0 200 Z\" fill=\"#A5D6A7\"/><circle cx=\"70\" cy=\"80\" r=\"15\" fill=\"#E3F2FD\" stroke-width=\"3\"/><circle cx=\"70\" cy=\"80\" r=\"5\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"98\" cy=\"72\" r=\"15\" fill=\"#E3F2FD\" stroke-width=\"3\"/><circle cx=\"98\" cy=\"72\" r=\"5\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"126\" cy=\"80\" r=\"15\" fill=\"#E3F2FD\" stroke-width=\"3\"/><circle cx=\"126\" cy=\"80\" r=\"5\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"56\" cy=\"106\" r=\"15\" fill=\"#E3F2FD\" stroke-width=\"3\"/><circle cx=\"56\" cy=\"106\" r=\"5\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"84\" cy=\"102\" r=\"15\" fill=\"#E3F2FD\" stroke-width=\"3\"/><circle cx=\"84\" cy=\"102\" r=\"5\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"112\" cy=\"100\" r=\"15\" fill=\"#E3F2FD\" stroke-width=\"3\"/><circle cx=\"112\" cy=\"100\" r=\"5\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"140\" cy=\"106\" r=\"15\" fill=\"#E3F2FD\" stroke-width=\"3\"/><circle cx=\"140\" cy=\"106\" r=\"5\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"70\" cy=\"128\" r=\"15\" fill=\"#E3F2FD\" stroke-width=\"3\"/><circle cx=\"70\" cy=\"128\" r=\"5\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"98\" cy=\"126\" r=\"15\" fill=\"#E3F2FD\" stroke-width=\"3\"/><circle cx=\"98\" cy=\"126\" r=\"5\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"126\" cy=\"130\" r=\"15\" fill=\"#E3F2FD\" stroke-width=\"3\"/><circle cx=\"126\" cy=\"130\" r=\"5\" fill=\"#3B2314\" stroke=\"none\"/>", "ech_nong_noc": "<rect x=\"0\" y=\"0\" width=\"200\" height=\"200\" fill=\"#B3E5FC\" stroke=\"none\"/><path d=\"M0 170 Q100 154 200 170 L200 200 L0 200 Z\" fill=\"#A5D6A7\"/><g transform=\"translate(80 96) scale(1.3)\"><path d=\"M14 0 C40 -18 60 14 84.0 -4 C60 22 40 10 14 10 Z\" fill=\"#558B2F\"/><ellipse cx=\"-6\" cy=\"4\" rx=\"28\" ry=\"22\" fill=\"#689F38\"/><circle cx=\"-18\" cy=\"-2\" r=\"5\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"-16.2\" cy=\"-3.8\" r=\"1.8\" fill=\"#fff\" stroke=\"none\"/><circle cx=\"4\" cy=\"-4\" r=\"4\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"5.4\" cy=\"-5.4\" r=\"1.4\" fill=\"#fff\" stroke=\"none\"/><path d=\"M-15.0 10 Q-10 14 -5.0 10\" fill=\"none\" stroke-width=\"3\"/></g>", "ech_moc_chan": "<rect x=\"0\" y=\"0\" width=\"200\" height=\"200\" fill=\"#B3E5FC\" stroke=\"none\"/><path d=\"M0 170 Q100 154 200 170 L200 200 L0 200 Z\" fill=\"#A5D6A7\"/><g transform=\"translate(80 96) scale(1.3)\"><path d=\"M14 0 C40 -18 60 14 84.0 -4 C60 22 40 10 14 10 Z\" fill=\"#558B2F\"/><path d=\"M8 12 C14 28 6 36 -2 40 L4 44 C16 38 24 26 18 10 Z\" fill=\"#7CB342\"/><ellipse cx=\"-6\" cy=\"4\" rx=\"28\" ry=\"22\" fill=\"#689F38\"/><circle cx=\"-18\" cy=\"-2\" r=\"5\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"-16.2\" cy=\"-3.8\" r=\"1.8\" fill=\"#fff\" stroke=\"none\"/><circle cx=\"4\" cy=\"-4\" r=\"4\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"5.4\" cy=\"-5.4\" r=\"1.4\" fill=\"#fff\" stroke=\"none\"/><path d=\"M-15.0 10 Q-10 14 -5.0 10\" fill=\"none\" stroke-width=\"3\"/></g><path d=\"M50 120 C44 132 50 140 56 142 L58 136 C54 134 52 130 56 122 Z\" fill=\"#7CB342\"/>", "ech_con": "<rect x=\"0\" y=\"0\" width=\"200\" height=\"200\" fill=\"#B3E5FC\" stroke=\"none\"/><path d=\"M0 170 Q100 154 200 170 L200 200 L0 200 Z\" fill=\"#A5D6A7\"/><g transform=\"translate(96 104) scale(0.85)\"><path d=\"M-52 40 C-74 40 -78 14 -60 6 C-46 0 -36 14 -34 30 Z M52 40 C74 40 78 14 60 6 C46 0 36 14 34 30 Z\" fill=\"#7CB342\"/><path d=\"M0 -40 C-38 -40 -54 -10 -54 16 C-54 44 -30 56 0 56 C30 56 54 44 54 16 C54 -10 38 -40 0 -40 Z\" fill=\"#8BC34A\"/><ellipse cx=\"0\" cy=\"28\" rx=\"30\" ry=\"22\" fill=\"#DCEDC8\"/><circle cx=\"-24\" cy=\"-38\" r=\"18\" fill=\"#8BC34A\"/><circle cx=\"24\" cy=\"-38\" r=\"18\" fill=\"#8BC34A\"/><circle cx=\"-24\" cy=\"-39\" r=\"10\" fill=\"#fff\" stroke-width=\"3\"/><circle cx=\"24\" cy=\"-39\" r=\"10\" fill=\"#fff\" stroke-width=\"3\"/><circle cx=\"-23\" cy=\"-38\" r=\"5\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"-21.2\" cy=\"-39.8\" r=\"1.8\" fill=\"#fff\" stroke=\"none\"/><circle cx=\"23\" cy=\"-38\" r=\"5\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"24.8\" cy=\"-39.8\" r=\"1.8\" fill=\"#fff\" stroke=\"none\"/><ellipse cx=\"-34\" cy=\"-6\" rx=\"6\" ry=\"3.5\" fill=\"#F8A5B8\" stroke=\"none\"/><ellipse cx=\"34\" cy=\"-6\" rx=\"6\" ry=\"3.5\" fill=\"#F8A5B8\" stroke=\"none\"/><path d=\"M-24 -10 Q0 8 24 -10\" fill=\"none\" stroke-width=\"3.5\"/><ellipse cx=\"-18\" cy=\"54\" rx=\"14\" ry=\"6\" fill=\"#8BC34A\"/><ellipse cx=\"18\" cy=\"54\" rx=\"14\" ry=\"6\" fill=\"#8BC34A\"/></g><path d=\"M130 140 C150 146 160 140 166 132\" fill=\"none\" stroke=\"#558B2F\" stroke-width=\"8\"/>", "ech_lon": "<rect x=\"0\" y=\"0\" width=\"200\" height=\"200\" fill=\"#B3E5FC\" stroke=\"none\"/><ellipse cx=\"100\" cy=\"168\" rx=\"86\" ry=\"26\" fill=\"#66BB6A\"/><g transform=\"translate(100 104) scale(1.1)\"><path d=\"M-52 40 C-74 40 -78 14 -60 6 C-46 0 -36 14 -34 30 Z M52 40 C74 40 78 14 60 6 C46 0 36 14 34 30 Z\" fill=\"#7CB342\"/><path d=\"M0 -40 C-38 -40 -54 -10 -54 16 C-54 44 -30 56 0 56 C30 56 54 44 54 16 C54 -10 38 -40 0 -40 Z\" fill=\"#8BC34A\"/><ellipse cx=\"0\" cy=\"28\" rx=\"30\" ry=\"22\" fill=\"#DCEDC8\"/><circle cx=\"-24\" cy=\"-38\" r=\"18\" fill=\"#8BC34A\"/><circle cx=\"24\" cy=\"-38\" r=\"18\" fill=\"#8BC34A\"/><circle cx=\"-24\" cy=\"-39\" r=\"10\" fill=\"#fff\" stroke-width=\"3\"/><circle cx=\"24\" cy=\"-39\" r=\"10\" fill=\"#fff\" stroke-width=\"3\"/><circle cx=\"-23\" cy=\"-38\" r=\"5\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"-21.2\" cy=\"-39.8\" r=\"1.8\" fill=\"#fff\" stroke=\"none\"/><circle cx=\"23\" cy=\"-38\" r=\"5\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"24.8\" cy=\"-39.8\" r=\"1.8\" fill=\"#fff\" stroke=\"none\"/><ellipse cx=\"-34\" cy=\"-6\" rx=\"6\" ry=\"3.5\" fill=\"#F8A5B8\" stroke=\"none\"/><ellipse cx=\"34\" cy=\"-6\" rx=\"6\" ry=\"3.5\" fill=\"#F8A5B8\" stroke=\"none\"/><path d=\"M-24 -10 Q0 8 24 -10\" fill=\"none\" stroke-width=\"3.5\"/><ellipse cx=\"-18\" cy=\"54\" rx=\"14\" ry=\"6\" fill=\"#8BC34A\"/><ellipse cx=\"18\" cy=\"54\" rx=\"14\" ry=\"6\" fill=\"#8BC34A\"/></g>", "muoi_trung": "<rect x=\"0\" y=\"0\" width=\"200\" height=\"200\" fill=\"#B3E5FC\" stroke=\"none\"/><rect x=\"0\" y=\"0\" width=\"200\" height=\"66\" fill=\"#E3F2FD\" stroke=\"none\"/><path d=\"M0 66 Q25 60 50 66 T100 66 T150 66 T200 66\" fill=\"none\" stroke=\"#4FC3F7\" stroke-width=\"4\"/><ellipse cx=\"70\" cy=\"61\" rx=\"3.6\" ry=\"9\" fill=\"#6D4C41\" stroke-width=\"2\"/><ellipse cx=\"78\" cy=\"64\" rx=\"3.6\" ry=\"9\" fill=\"#6D4C41\" stroke-width=\"2\"/><ellipse cx=\"86\" cy=\"64\" rx=\"3.6\" ry=\"9\" fill=\"#6D4C41\" stroke-width=\"2\"/><ellipse cx=\"94\" cy=\"64\" rx=\"3.6\" ry=\"9\" fill=\"#6D4C41\" stroke-width=\"2\"/><ellipse cx=\"102\" cy=\"64\" rx=\"3.6\" ry=\"9\" fill=\"#6D4C41\" stroke-width=\"2\"/><ellipse cx=\"110\" cy=\"64\" rx=\"3.6\" ry=\"9\" fill=\"#6D4C41\" stroke-width=\"2\"/><ellipse cx=\"118\" cy=\"64\" rx=\"3.6\" ry=\"9\" fill=\"#6D4C41\" stroke-width=\"2\"/><ellipse cx=\"126\" cy=\"61\" rx=\"3.6\" ry=\"9\" fill=\"#6D4C41\" stroke-width=\"2\"/><circle cx=\"104\" cy=\"128\" r=\"40\" fill=\"#E1F5FE\" stroke-width=\"5\"/><path d=\"M132 156 L162 186\" fill=\"none\" stroke-width=\"10\"/><ellipse cx=\"82\" cy=\"128\" rx=\"5\" ry=\"14\" fill=\"#6D4C41\" stroke-width=\"2.5\"/><ellipse cx=\"93\" cy=\"128\" rx=\"5\" ry=\"14\" fill=\"#6D4C41\" stroke-width=\"2.5\"/><ellipse cx=\"104\" cy=\"128\" rx=\"5\" ry=\"14\" fill=\"#6D4C41\" stroke-width=\"2.5\"/><ellipse cx=\"115\" cy=\"128\" rx=\"5\" ry=\"14\" fill=\"#6D4C41\" stroke-width=\"2.5\"/><ellipse cx=\"126\" cy=\"128\" rx=\"5\" ry=\"14\" fill=\"#6D4C41\" stroke-width=\"2.5\"/><path d=\"M104 88 L104 72\" fill=\"none\" stroke-width=\"2\" stroke-dasharray=\"4 4\"/>", "muoi_lang_quang": "<rect x=\"0\" y=\"0\" width=\"200\" height=\"200\" fill=\"#B3E5FC\" stroke=\"none\"/><rect x=\"0\" y=\"0\" width=\"200\" height=\"66\" fill=\"#E3F2FD\" stroke=\"none\"/><path d=\"M0 66 Q25 60 50 66 T100 66 T150 66 T200 66\" fill=\"none\" stroke=\"#4FC3F7\" stroke-width=\"4\"/><g transform=\"rotate(-12 100 120)\"><path d=\"M100 66 L100 86\" fill=\"none\" stroke-width=\"7\"/><ellipse cx=\"100\" cy=\"92\" rx=\"9.0\" ry=\"8\" fill=\"#A1887F\" stroke-width=\"3\"/><ellipse cx=\"100\" cy=\"105\" rx=\"9.6\" ry=\"8\" fill=\"#A1887F\" stroke-width=\"3\"/><ellipse cx=\"100\" cy=\"118\" rx=\"10.2\" ry=\"8\" fill=\"#A1887F\" stroke-width=\"3\"/><ellipse cx=\"100\" cy=\"131\" rx=\"10.8\" ry=\"8\" fill=\"#A1887F\" stroke-width=\"3\"/><ellipse cx=\"100\" cy=\"144\" rx=\"11.4\" ry=\"8\" fill=\"#A1887F\" stroke-width=\"3\"/><ellipse cx=\"100\" cy=\"157\" rx=\"12.0\" ry=\"8\" fill=\"#A1887F\" stroke-width=\"3\"/><ellipse cx=\"100\" cy=\"176\" rx=\"16\" ry=\"13\" fill=\"#8D6E63\"/><circle cx=\"94\" cy=\"178\" r=\"3.4\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"95.19\" cy=\"176.81\" r=\"1.292\" fill=\"#fff\" stroke=\"none\"/><circle cx=\"106\" cy=\"178\" r=\"3.4\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"107.19\" cy=\"176.81\" r=\"1.292\" fill=\"#fff\" stroke=\"none\"/><path d=\"M84 104 l-10 -4 M116 104 l10 -4 M84 130 l-10 -2 M116 130 l10 -2 M84 156 l-10 0 M116 156 l10 0\" fill=\"none\" stroke-width=\"2.5\"/></g><circle cx=\"40\" cy=\"120\" r=\"6\" fill=\"#E1F5FE\" stroke-width=\"2\"/><circle cx=\"160\" cy=\"100\" r=\"4\" fill=\"#E1F5FE\" stroke-width=\"2\"/>", "muoi_cung_quang": "<rect x=\"0\" y=\"0\" width=\"200\" height=\"200\" fill=\"#B3E5FC\" stroke=\"none\"/><rect x=\"0\" y=\"0\" width=\"200\" height=\"66\" fill=\"#E3F2FD\" stroke=\"none\"/><path d=\"M0 66 Q25 60 50 66 T100 66 T150 66 T200 66\" fill=\"none\" stroke=\"#4FC3F7\" stroke-width=\"4\"/><path d=\"M90 70 L92 82 M110 70 L108 82\" fill=\"none\" stroke-width=\"5\"/><path d=\"M100 80 C64 80 60 130 92 136 C112 140 128 124 126 104 C124 88 116 80 100 80 Z\" fill=\"#8D6E63\"/><path d=\"M100 136 C96 156 106 172 124 172 C134 172 140 164 136 156\" fill=\"none\" stroke=\"#3B2314\" stroke-width=\"14\"/><path d=\"M100 136 C96 156 106 172 124 172 C134 172 140 164 136 156\" fill=\"none\" stroke=\"#A1887F\" stroke-width=\"8\"/><path d=\"M132 160 l10 -8 M134 162 l12 2\" fill=\"none\" stroke-width=\"3\"/><circle cx=\"86\" cy=\"104\" r=\"5\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"87.75\" cy=\"102.25\" r=\"1.9\" fill=\"#fff\" stroke=\"none\"/><path d=\"M74 118 Q90 128 108 120\" fill=\"none\" stroke-width=\"3\"/><circle cx=\"44\" cy=\"140\" r=\"6\" fill=\"#E1F5FE\" stroke-width=\"2\"/><circle cx=\"160\" cy=\"120\" r=\"5\" fill=\"#E1F5FE\" stroke-width=\"2\"/>", "muoi_lon": "<rect x=\"0\" y=\"0\" width=\"200\" height=\"200\" fill=\"#E3F2FD\" stroke=\"none\"/><rect x=\"0\" y=\"150\" width=\"200\" height=\"50\" fill=\"#B3E5FC\" stroke=\"none\"/><path d=\"M0 150 Q25 144 50 150 T100 150 T150 150 T200 150\" fill=\"none\" stroke=\"#4FC3F7\" stroke-width=\"4\"/><ellipse cx=\"88\" cy=\"70\" rx=\"40\" ry=\"14\" fill=\"#FFFFFF\" stroke-width=\"3\" transform=\"rotate(-24 88 70)\" opacity=\".95\"/><ellipse cx=\"110\" cy=\"66\" rx=\"34\" ry=\"12\" fill=\"#F1F8FF\" stroke-width=\"3\" transform=\"rotate(-48 110 66)\" opacity=\".95\"/><path d=\"M96 100 L70 124 L52 150 M104 100 L96 128 L92 150 M112 100 L128 124 L140 150 M104 98 L150 112 L176 150\" fill=\"none\" stroke-width=\"3.5\"/><path d=\"M48 150 q4 -4 8 0 M88 150 q4 -4 8 0 M136 150 q4 -4 8 0 M172 150 q4 -4 8 0\" fill=\"none\" stroke=\"#0288D1\" stroke-width=\"2.5\"/><ellipse cx=\"62\" cy=\"92\" rx=\"32\" ry=\"9\" fill=\"#90A4AE\" transform=\"rotate(10 62 92)\"/><path d=\"M40 86 L44 98 M52 86 L55 99 M64 88 L66 101 M76 90 L77 102\" fill=\"none\" stroke-width=\"2\"/><ellipse cx=\"104\" cy=\"96\" rx=\"15\" ry=\"11\" fill=\"#78909C\"/><circle cx=\"128\" cy=\"88\" r=\"13\" fill=\"#78909C\"/><path d=\"M138 92 L172 104\" fill=\"none\" stroke-width=\"4\"/><path d=\"M132 78 Q140 62 152 58 M126 76 Q128 60 138 52\" fill=\"none\" stroke-width=\"3\"/><circle cx=\"132\" cy=\"86\" r=\"4.5\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"133.575\" cy=\"84.425\" r=\"1.71\" fill=\"#fff\" stroke=\"none\"/>", "bua_trung": "<rect x=\"0\" y=\"0\" width=\"200\" height=\"200\" fill=\"#E8F5E9\" stroke=\"none\"/><path d=\"M14 180 C20 70 130 26 188 18 C176 96 124 186 14 180 Z\" fill=\"#A5D6A7\"/><path d=\"M24 172 C80 124 132 72 182 26\" fill=\"none\" stroke-width=\"3\"/><ellipse cx=\"80\" cy=\"92\" rx=\"7\" ry=\"11\" fill=\"#FFD54F\" stroke-width=\"3\"/><ellipse cx=\"96\" cy=\"88\" rx=\"7\" ry=\"11\" fill=\"#FFD54F\" stroke-width=\"3\"/><ellipse cx=\"112\" cy=\"92\" rx=\"7\" ry=\"11\" fill=\"#FFD54F\" stroke-width=\"3\"/><ellipse cx=\"72\" cy=\"112\" rx=\"7\" ry=\"11\" fill=\"#FFD54F\" stroke-width=\"3\"/><ellipse cx=\"88\" cy=\"108\" rx=\"7\" ry=\"11\" fill=\"#FFD54F\" stroke-width=\"3\"/><ellipse cx=\"104\" cy=\"108\" rx=\"7\" ry=\"11\" fill=\"#FFD54F\" stroke-width=\"3\"/><ellipse cx=\"120\" cy=\"112\" rx=\"7\" ry=\"11\" fill=\"#FFD54F\" stroke-width=\"3\"/><ellipse cx=\"80\" cy=\"130\" rx=\"7\" ry=\"11\" fill=\"#FFD54F\" stroke-width=\"3\"/><ellipse cx=\"96\" cy=\"128\" rx=\"7\" ry=\"11\" fill=\"#FFD54F\" stroke-width=\"3\"/><ellipse cx=\"112\" cy=\"130\" rx=\"7\" ry=\"11\" fill=\"#FFD54F\" stroke-width=\"3\"/>", "bua_au_trung": "<rect x=\"0\" y=\"0\" width=\"200\" height=\"200\" fill=\"#E8F5E9\" stroke=\"none\"/><path d=\"M14 180 C20 70 130 26 188 18 C176 96 124 186 14 180 Z\" fill=\"#A5D6A7\"/><path d=\"M24 172 C80 124 132 72 182 26\" fill=\"none\" stroke-width=\"3\"/><g transform=\"translate(100 104) scale(1.3) translate(-100 -104)\"><path d=\"M100 112 l-6 14 M112 104 l-4 14 M124 98 l-2 14 M104 98 l-8 -10 M116 90 l-6 -10\" fill=\"none\" stroke-width=\"3\"/><ellipse cx=\"60\" cy=\"132\" rx=\"11\" ry=\"9\" fill=\"#546E7A\" stroke-width=\"3\"/><ellipse cx=\"76\" cy=\"122\" rx=\"11\" ry=\"9\" fill=\"#546E7A\" stroke-width=\"3\"/><ellipse cx=\"92\" cy=\"112\" rx=\"11\" ry=\"9\" fill=\"#546E7A\" stroke-width=\"3\"/><ellipse cx=\"108\" cy=\"102\" rx=\"11\" ry=\"9\" fill=\"#546E7A\" stroke-width=\"3\"/><ellipse cx=\"124\" cy=\"92\" rx=\"11\" ry=\"9\" fill=\"#546E7A\" stroke-width=\"3\"/><circle cx=\"76\" cy=\"116\" r=\"3\" fill=\"#FF8A65\" stroke=\"none\"/><circle cx=\"92\" cy=\"106\" r=\"3\" fill=\"#FF8A65\" stroke=\"none\"/><circle cx=\"108\" cy=\"96\" r=\"3\" fill=\"#FF8A65\" stroke=\"none\"/><circle cx=\"124\" cy=\"86\" r=\"3\" fill=\"#FF8A65\" stroke=\"none\"/><circle cx=\"142\" cy=\"84\" r=\"13\" fill=\"#37474F\"/><circle cx=\"138\" cy=\"82\" r=\"3.6\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"139.3\" cy=\"80.7\" r=\"1.4\" fill=\"#fff\" stroke=\"none\"/><circle cx=\"148\" cy=\"80\" r=\"3.6\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"149.3\" cy=\"78.7\" r=\"1.4\" fill=\"#fff\" stroke=\"none\"/><path d=\"M146 72 q4 -10 12 -12 M138 72 q-2 -10 2 -16\" fill=\"none\" stroke-width=\"3\"/></g>", "bua_nhong": "<rect x=\"0\" y=\"0\" width=\"200\" height=\"200\" fill=\"#E8F5E9\" stroke=\"none\"/><path d=\"M14 180 C20 70 130 26 188 18 C176 96 124 186 14 180 Z\" fill=\"#A5D6A7\"/><path d=\"M24 172 C80 124 132 72 182 26\" fill=\"none\" stroke-width=\"3\"/><path d=\"M64 132 C60 92 92 66 120 72 C146 78 152 110 136 132 C120 150 76 150 64 132 Z\" fill=\"#FFB74D\"/><path d=\"M72 120 C96 112 118 104 140 96\" fill=\"none\" stroke-width=\"3\"/><circle cx=\"90\" cy=\"96\" r=\"5\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"116\" cy=\"90\" r=\"5\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"84\" cy=\"128\" r=\"5\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"110\" cy=\"124\" r=\"5\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"132\" cy=\"112\" r=\"5\" fill=\"#3B2314\" stroke=\"none\"/><path d=\"M64 132 L52 146\" fill=\"none\" stroke-width=\"5\"/>", "bua_lon": "<rect x=\"0\" y=\"0\" width=\"200\" height=\"200\" fill=\"#E8F5E9\" stroke=\"none\"/><path d=\"M14 180 C20 70 130 26 188 18 C176 96 124 186 14 180 Z\" fill=\"#A5D6A7\"/><path d=\"M24 172 C80 124 132 72 182 26\" fill=\"none\" stroke-width=\"3\"/><path d=\"M70 118 l-16 6 M74 136 l-14 12 M130 118 l16 6 M126 136 l14 12\" fill=\"none\" stroke-width=\"4\"/><path d=\"M60 110 C60 70 140 70 140 110 C140 146 60 146 60 110 Z\" fill=\"#E53935\"/><path d=\"M100 76 L100 142\" fill=\"none\" stroke-width=\"3\"/><circle cx=\"80\" cy=\"96\" r=\"7\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"120\" cy=\"96\" r=\"7\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"76\" cy=\"122\" r=\"7\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"124\" cy=\"122\" r=\"7\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"92\" cy=\"136\" r=\"7\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"108\" cy=\"136\" r=\"7\" fill=\"#3B2314\" stroke=\"none\"/><path d=\"M76 74 C76 52 124 52 124 74 Z\" fill=\"#3B2314\"/><path d=\"M86 56 q-6 -14 -16 -16 M114 56 q6 -14 16 -16\" fill=\"none\" stroke-width=\"3\"/><circle cx=\"90\" cy=\"66\" r=\"6\" fill=\"#fff\" stroke=\"none\"/><circle cx=\"110\" cy=\"66\" r=\"6\" fill=\"#fff\" stroke=\"none\"/><circle cx=\"91\" cy=\"66\" r=\"3\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"92.0\" cy=\"65.0\" r=\"1.1\" fill=\"#fff\" stroke=\"none\"/><circle cx=\"109\" cy=\"66\" r=\"3\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"110.0\" cy=\"65.0\" r=\"1.1\" fill=\"#fff\" stroke=\"none\"/>", "lua_hat": "<rect x=\"0\" y=\"0\" width=\"200\" height=\"200\" fill=\"#FFF8E1\" stroke=\"none\"/><ellipse cx=\"100\" cy=\"150\" rx=\"78\" ry=\"20\" fill=\"#BCAAA4\"/><g transform=\"translate(70 110) rotate(-20) scale(1)\"><ellipse cx=\"0\" cy=\"0\" rx=\"10\" ry=\"26\" fill=\"#FBC02D\"/><path d=\"M0 -22 L0 22\" fill=\"none\" stroke-width=\"2.5\"/><path d=\"M0 -26 l0 -10\" fill=\"none\" stroke-width=\"3\"/></g><g transform=\"translate(104 104) rotate(8) scale(1)\"><ellipse cx=\"0\" cy=\"0\" rx=\"10\" ry=\"26\" fill=\"#FBC02D\"/><path d=\"M0 -22 L0 22\" fill=\"none\" stroke-width=\"2.5\"/><path d=\"M0 -26 l0 -10\" fill=\"none\" stroke-width=\"3\"/></g><g transform=\"translate(136 114) rotate(30) scale(1)\"><ellipse cx=\"0\" cy=\"0\" rx=\"10\" ry=\"26\" fill=\"#FBC02D\"/><path d=\"M0 -22 L0 22\" fill=\"none\" stroke-width=\"2.5\"/><path d=\"M0 -26 l0 -10\" fill=\"none\" stroke-width=\"3\"/></g>", "lua_ma": "<rect x=\"0\" y=\"0\" width=\"200\" height=\"200\" fill=\"#E3F2FD\" stroke=\"none\"/><rect x=\"0\" y=\"140\" width=\"200\" height=\"60\" fill=\"#8D6E63\"/><path d=\"M34 142 Q31.799999999999997 112.0 26 92 Q45.8 117.0 47 142 Z\" fill=\"#66BB6A\" stroke-width=\"2.5\"/><path d=\"M46 142 Q49.8 103.6 58 78 Q63.8 110.0 59 142 Z\" fill=\"#66BB6A\" stroke-width=\"2.5\"/><path d=\"M58 142 Q66.6 114.4 86 96 Q80.6 119.0 71 142 Z\" fill=\"#66BB6A\" stroke-width=\"2.5\"/><path d=\"M90 142 Q86.6 108.4 78 86 Q100.6 114.0 103 142 Z\" fill=\"#66BB6A\" stroke-width=\"2.5\"/><path d=\"M102 142 Q105.2 98.80000000000001 112 70 Q119.2 106.0 115 142 Z\" fill=\"#66BB6A\" stroke-width=\"2.5\"/><path d=\"M114 142 Q122.0 110.8 140 90 Q136.0 116.0 127 142 Z\" fill=\"#66BB6A\" stroke-width=\"2.5\"/><path d=\"M144 142 Q142.4 113.2 138 94 Q156.4 118.0 157 142 Z\" fill=\"#66BB6A\" stroke-width=\"2.5\"/><path d=\"M154 142 Q158.4 104.80000000000001 168 80 Q172.4 111.0 167 142 Z\" fill=\"#66BB6A\" stroke-width=\"2.5\"/><path d=\"M166 142 Q174.6 115.6 194 98 Q188.6 120.0 179 142 Z\" fill=\"#66BB6A\" stroke-width=\"2.5\"/>", "lua_cay": "<rect x=\"0\" y=\"0\" width=\"200\" height=\"200\" fill=\"#E3F2FD\" stroke=\"none\"/><rect x=\"0\" y=\"150\" width=\"200\" height=\"50\" fill=\"#B3E5FC\" stroke=\"none\"/><path d=\"M0 150 L200 150\" fill=\"none\" stroke=\"#4FC3F7\" stroke-width=\"4\"/><path d=\"M14 172 h30 M80 182 h34 M146 170 h30\" fill=\"none\" stroke=\"#81D4FA\" stroke-width=\"3\"/><path d=\"M28 152 Q22.2 109.75999999999999 8 81.6 Q36.2 116.8 41 152 Z\" fill=\"#4CAF50\" stroke-width=\"2.5\"/><path d=\"M36 152 Q35.0 99.2 32 64 Q49.0 108.0 49 152 Z\" fill=\"#4CAF50\" stroke-width=\"2.5\"/><path d=\"M44 152 Q48.4 101.84 58 68.4 Q62.4 110.2 57 152 Z\" fill=\"#4CAF50\" stroke-width=\"2.5\"/><path d=\"M52 152 Q61.8 112.4 84 86.0 Q75.8 119.0 65 152 Z\" fill=\"#4CAF50\" stroke-width=\"2.5\"/><path d=\"M86 152 Q80.2 104.0 66 72.0 Q94.2 112.0 99 152 Z\" fill=\"#4CAF50\" stroke-width=\"2.5\"/><path d=\"M94 152 Q93.0 92.0 90 52 Q107.0 102.0 107 152 Z\" fill=\"#4CAF50\" stroke-width=\"2.5\"/><path d=\"M102 152 Q106.4 95.0 116 57.0 Q120.4 104.5 115 152 Z\" fill=\"#4CAF50\" stroke-width=\"2.5\"/><path d=\"M110 152 Q119.8 107.0 142 77.0 Q133.8 114.5 123 152 Z\" fill=\"#4CAF50\" stroke-width=\"2.5\"/><path d=\"M142 152 Q136.2 111.68 122 84.8 Q150.2 118.4 155 152 Z\" fill=\"#4CAF50\" stroke-width=\"2.5\"/><path d=\"M150 152 Q149.0 101.6 146 68 Q163.0 110.0 163 152 Z\" fill=\"#4CAF50\" stroke-width=\"2.5\"/><path d=\"M158 152 Q162.4 104.12 172 72.2 Q176.4 112.1 171 152 Z\" fill=\"#4CAF50\" stroke-width=\"2.5\"/><path d=\"M166 152 Q175.8 114.2 198 89.0 Q189.8 120.5 179 152 Z\" fill=\"#4CAF50\" stroke-width=\"2.5\"/>", "lua_tro": "<rect x=\"0\" y=\"0\" width=\"200\" height=\"200\" fill=\"#E3F2FD\" stroke=\"none\"/><rect x=\"0\" y=\"150\" width=\"200\" height=\"50\" fill=\"#B3E5FC\" stroke=\"none\"/><path d=\"M0 150 L200 150\" fill=\"none\" stroke=\"#4FC3F7\" stroke-width=\"4\"/><path d=\"M14 172 h30 M80 182 h34 M146 170 h30\" fill=\"none\" stroke=\"#81D4FA\" stroke-width=\"3\"/><path d=\"M42 152 Q36.2 105.91999999999999 22 75.19999999999999 Q50.2 113.6 55 152 Z\" fill=\"#4CAF50\" stroke-width=\"2.5\"/><path d=\"M50 152 Q49.0 94.4 46 56 Q63.0 104.0 63 152 Z\" fill=\"#4CAF50\" stroke-width=\"2.5\"/><path d=\"M58 152 Q62.400000000000006 97.28 72 60.80000000000001 Q76.4 106.4 71 152 Z\" fill=\"#4CAF50\" stroke-width=\"2.5\"/><path d=\"M66 152 Q75.8 108.80000000000001 98 80.0 Q89.8 116.0 79 152 Z\" fill=\"#4CAF50\" stroke-width=\"2.5\"/><path d=\"M122 152 Q116.2 105.91999999999999 102 75.19999999999999 Q130.2 113.6 135 152 Z\" fill=\"#4CAF50\" stroke-width=\"2.5\"/><path d=\"M130 152 Q129.0 94.4 126 56 Q143.0 104.0 143 152 Z\" fill=\"#4CAF50\" stroke-width=\"2.5\"/><path d=\"M138 152 Q142.4 97.28 152 60.80000000000001 Q156.4 106.4 151 152 Z\" fill=\"#4CAF50\" stroke-width=\"2.5\"/><path d=\"M146 152 Q155.8 108.80000000000001 178 80.0 Q169.8 116.0 159 152 Z\" fill=\"#4CAF50\" stroke-width=\"2.5\"/><path d=\"M60 80 L60 24 M140 80 L140 24\" fill=\"none\" stroke=\"#2E7D32\" stroke-width=\"5\"/><ellipse cx=\"66\" cy=\"33\" rx=\"5.5\" ry=\"9\" fill=\"#C5E1A5\" stroke-width=\"2\"/><ellipse cx=\"54\" cy=\"42\" rx=\"5.5\" ry=\"9\" fill=\"#C5E1A5\" stroke-width=\"2\"/><ellipse cx=\"66\" cy=\"51\" rx=\"5.5\" ry=\"9\" fill=\"#C5E1A5\" stroke-width=\"2\"/><ellipse cx=\"54\" cy=\"60\" rx=\"5.5\" ry=\"9\" fill=\"#C5E1A5\" stroke-width=\"2\"/><ellipse cx=\"66\" cy=\"69\" rx=\"5.5\" ry=\"9\" fill=\"#C5E1A5\" stroke-width=\"2\"/><ellipse cx=\"146\" cy=\"33\" rx=\"5.5\" ry=\"9\" fill=\"#C5E1A5\" stroke-width=\"2\"/><ellipse cx=\"134\" cy=\"42\" rx=\"5.5\" ry=\"9\" fill=\"#C5E1A5\" stroke-width=\"2\"/><ellipse cx=\"146\" cy=\"51\" rx=\"5.5\" ry=\"9\" fill=\"#C5E1A5\" stroke-width=\"2\"/><ellipse cx=\"134\" cy=\"60\" rx=\"5.5\" ry=\"9\" fill=\"#C5E1A5\" stroke-width=\"2\"/><ellipse cx=\"146\" cy=\"69\" rx=\"5.5\" ry=\"9\" fill=\"#C5E1A5\" stroke-width=\"2\"/><circle cx=\"72\" cy=\"33\" r=\"3\" fill=\"#fff\" stroke-width=\"1.5\"/><circle cx=\"48\" cy=\"42\" r=\"3\" fill=\"#fff\" stroke-width=\"1.5\"/><circle cx=\"72\" cy=\"51\" r=\"3\" fill=\"#fff\" stroke-width=\"1.5\"/><circle cx=\"48\" cy=\"60\" r=\"3\" fill=\"#fff\" stroke-width=\"1.5\"/><circle cx=\"72\" cy=\"69\" r=\"3\" fill=\"#fff\" stroke-width=\"1.5\"/><circle cx=\"152\" cy=\"33\" r=\"3\" fill=\"#fff\" stroke-width=\"1.5\"/><circle cx=\"128\" cy=\"42\" r=\"3\" fill=\"#fff\" stroke-width=\"1.5\"/><circle cx=\"152\" cy=\"51\" r=\"3\" fill=\"#fff\" stroke-width=\"1.5\"/><circle cx=\"128\" cy=\"60\" r=\"3\" fill=\"#fff\" stroke-width=\"1.5\"/><circle cx=\"152\" cy=\"69\" r=\"3\" fill=\"#fff\" stroke-width=\"1.5\"/>", "lua_chin": "<rect x=\"0\" y=\"0\" width=\"200\" height=\"200\" fill=\"#E3F2FD\" stroke=\"none\"/><rect x=\"0\" y=\"150\" width=\"200\" height=\"50\" fill=\"#B3E5FC\" stroke=\"none\"/><path d=\"M0 150 L200 150\" fill=\"none\" stroke=\"#4FC3F7\" stroke-width=\"4\"/><path d=\"M14 172 h30 M80 182 h34 M146 170 h30\" fill=\"none\" stroke=\"#81D4FA\" stroke-width=\"3\"/><path d=\"M42 152 Q36.2 107.84 22 78.39999999999999 Q50.2 115.19999999999999 55 152 Z\" fill=\"#C0CA33\" stroke-width=\"2.5\"/><path d=\"M50 152 Q49.0 96.80000000000001 46 60 Q63.0 106.0 63 152 Z\" fill=\"#C0CA33\" stroke-width=\"2.5\"/><path d=\"M58 152 Q62.400000000000006 99.56 72 64.60000000000001 Q76.4 108.30000000000001 71 152 Z\" fill=\"#C0CA33\" stroke-width=\"2.5\"/><path d=\"M66 152 Q75.8 110.6 98 83.0 Q89.8 117.5 79 152 Z\" fill=\"#C0CA33\" stroke-width=\"2.5\"/><path d=\"M122 152 Q116.2 107.84 102 78.39999999999999 Q130.2 115.19999999999999 135 152 Z\" fill=\"#C0CA33\" stroke-width=\"2.5\"/><path d=\"M130 152 Q129.0 96.80000000000001 126 60 Q143.0 106.0 143 152 Z\" fill=\"#C0CA33\" stroke-width=\"2.5\"/><path d=\"M138 152 Q142.4 99.56 152 64.60000000000001 Q156.4 108.30000000000001 151 152 Z\" fill=\"#C0CA33\" stroke-width=\"2.5\"/><path d=\"M146 152 Q155.8 110.6 178 83.0 Q169.8 117.5 159 152 Z\" fill=\"#C0CA33\" stroke-width=\"2.5\"/><path d=\"M56 80 Q62 26 96 50\" fill=\"none\" stroke=\"#9E9D24\" stroke-width=\"5\"/><ellipse cx=\"64\" cy=\"28.0\" rx=\"5.5\" ry=\"9\" fill=\"#FBC02D\" stroke-width=\"2\" transform=\"rotate(35 64 34.0)\"/><ellipse cx=\"70\" cy=\"43.5\" rx=\"5.5\" ry=\"9\" fill=\"#FBC02D\" stroke-width=\"2\" transform=\"rotate(35 70 37.5)\"/><ellipse cx=\"76\" cy=\"35.0\" rx=\"5.5\" ry=\"9\" fill=\"#FBC02D\" stroke-width=\"2\" transform=\"rotate(35 76 41.0)\"/><ellipse cx=\"82\" cy=\"50.5\" rx=\"5.5\" ry=\"9\" fill=\"#FBC02D\" stroke-width=\"2\" transform=\"rotate(35 82 44.5)\"/><ellipse cx=\"88\" cy=\"42.0\" rx=\"5.5\" ry=\"9\" fill=\"#FBC02D\" stroke-width=\"2\" transform=\"rotate(35 88 48.0)\"/><ellipse cx=\"94\" cy=\"57.5\" rx=\"5.5\" ry=\"9\" fill=\"#FBC02D\" stroke-width=\"2\" transform=\"rotate(35 94 51.5)\"/><path d=\"M136 80 Q142 26 176 50\" fill=\"none\" stroke=\"#9E9D24\" stroke-width=\"5\"/><ellipse cx=\"144\" cy=\"28.0\" rx=\"5.5\" ry=\"9\" fill=\"#FBC02D\" stroke-width=\"2\" transform=\"rotate(35 144 34.0)\"/><ellipse cx=\"150\" cy=\"43.5\" rx=\"5.5\" ry=\"9\" fill=\"#FBC02D\" stroke-width=\"2\" transform=\"rotate(35 150 37.5)\"/><ellipse cx=\"156\" cy=\"35.0\" rx=\"5.5\" ry=\"9\" fill=\"#FBC02D\" stroke-width=\"2\" transform=\"rotate(35 156 41.0)\"/><ellipse cx=\"162\" cy=\"50.5\" rx=\"5.5\" ry=\"9\" fill=\"#FBC02D\" stroke-width=\"2\" transform=\"rotate(35 162 44.5)\"/><ellipse cx=\"168\" cy=\"42.0\" rx=\"5.5\" ry=\"9\" fill=\"#FBC02D\" stroke-width=\"2\" transform=\"rotate(35 168 48.0)\"/><ellipse cx=\"174\" cy=\"57.5\" rx=\"5.5\" ry=\"9\" fill=\"#FBC02D\" stroke-width=\"2\" transform=\"rotate(35 174 51.5)\"/>", "ca_trung": "<rect x=\"0\" y=\"0\" width=\"200\" height=\"200\" fill=\"#B3E5FC\" stroke=\"none\"/><path d=\"M0 186 Q100 170 200 186 L200 200 L0 200 Z\" fill=\"#A1887F\"/><path d=\"M70 190 Q56 140 74 100 Q86 70 70 30\" fill=\"none\" stroke=\"#2E7D32\" stroke-width=\"7\"/><path d=\"M70 150 q-16 -6 -22 -20 M74 110 q18 -6 22 -20 M74 70 q-16 -4 -20 -18\" fill=\"none\" stroke=\"#43A047\" stroke-width=\"5\"/><path d=\"M140 190 Q126 140 144 100 Q156 70 140 30\" fill=\"none\" stroke=\"#2E7D32\" stroke-width=\"7\"/><path d=\"M140 150 q-16 -6 -22 -20 M144 110 q18 -6 22 -20 M144 70 q-16 -4 -20 -18\" fill=\"none\" stroke=\"#43A047\" stroke-width=\"5\"/><circle cx=\"60\" cy=\"140\" r=\"6\" fill=\"#FFF59D\" stroke-width=\"2.5\"/><circle cx=\"61.5\" cy=\"139\" r=\"1.8\" fill=\"#F9A825\" stroke=\"none\"/><circle cx=\"72\" cy=\"132\" r=\"6\" fill=\"#FFF59D\" stroke-width=\"2.5\"/><circle cx=\"73.5\" cy=\"131\" r=\"1.8\" fill=\"#F9A825\" stroke=\"none\"/><circle cx=\"66\" cy=\"120\" r=\"6\" fill=\"#FFF59D\" stroke-width=\"2.5\"/><circle cx=\"67.5\" cy=\"119\" r=\"1.8\" fill=\"#F9A825\" stroke=\"none\"/><circle cx=\"82\" cy=\"112\" r=\"6\" fill=\"#FFF59D\" stroke-width=\"2.5\"/><circle cx=\"83.5\" cy=\"111\" r=\"1.8\" fill=\"#F9A825\" stroke=\"none\"/><circle cx=\"76\" cy=\"96\" r=\"6\" fill=\"#FFF59D\" stroke-width=\"2.5\"/><circle cx=\"77.5\" cy=\"95\" r=\"1.8\" fill=\"#F9A825\" stroke=\"none\"/><circle cx=\"88\" cy=\"86\" r=\"6\" fill=\"#FFF59D\" stroke-width=\"2.5\"/><circle cx=\"89.5\" cy=\"85\" r=\"1.8\" fill=\"#F9A825\" stroke=\"none\"/><circle cx=\"130\" cy=\"150\" r=\"6\" fill=\"#FFF59D\" stroke-width=\"2.5\"/><circle cx=\"131.5\" cy=\"149\" r=\"1.8\" fill=\"#F9A825\" stroke=\"none\"/><circle cx=\"146\" cy=\"140\" r=\"6\" fill=\"#FFF59D\" stroke-width=\"2.5\"/><circle cx=\"147.5\" cy=\"139\" r=\"1.8\" fill=\"#F9A825\" stroke=\"none\"/><circle cx=\"138\" cy=\"126\" r=\"6\" fill=\"#FFF59D\" stroke-width=\"2.5\"/><circle cx=\"139.5\" cy=\"125\" r=\"1.8\" fill=\"#F9A825\" stroke=\"none\"/><circle cx=\"152\" cy=\"114\" r=\"6\" fill=\"#FFF59D\" stroke-width=\"2.5\"/><circle cx=\"153.5\" cy=\"113\" r=\"1.8\" fill=\"#F9A825\" stroke=\"none\"/><circle cx=\"144\" cy=\"98\" r=\"6\" fill=\"#FFF59D\" stroke-width=\"2.5\"/><circle cx=\"145.5\" cy=\"97\" r=\"1.8\" fill=\"#F9A825\" stroke=\"none\"/><circle cx=\"156\" cy=\"84\" r=\"6\" fill=\"#FFF59D\" stroke-width=\"2.5\"/><circle cx=\"157.5\" cy=\"83\" r=\"1.8\" fill=\"#F9A825\" stroke=\"none\"/>", "ca_bot": "<rect x=\"0\" y=\"0\" width=\"200\" height=\"200\" fill=\"#B3E5FC\" stroke=\"none\"/><path d=\"M0 186 Q100 170 200 186 L200 200 L0 200 Z\" fill=\"#A1887F\"/><path d=\"M170 190 Q156 140 174 100 Q186 70 170 30\" fill=\"none\" stroke=\"#2E7D32\" stroke-width=\"7\"/><path d=\"M170 150 q-16 -6 -22 -20 M174 110 q18 -6 22 -20 M174 70 q-16 -4 -20 -18\" fill=\"none\" stroke=\"#43A047\" stroke-width=\"5\"/><g transform=\"translate(86 96) scale(1.25)\"><path d=\"M18 0 L40 -12 L36 0 L40 12 Z\" fill=\"#E1F5FE\"/><path d=\"M-24 0 C-20 -14 14 -14 22 0 C14 12 -20 14 -24 0 Z\" fill=\"#F1F8FF\"/><circle cx=\"-4\" cy=\"10\" r=\"11\" fill=\"#FFB74D\"/><circle cx=\"-14\" cy=\"-4\" r=\"5\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"-12.2\" cy=\"-5.8\" r=\"1.9\" fill=\"#fff\" stroke=\"none\"/></g><g transform=\"translate(70 150) scale(.7)\"><path d=\"M18 0 L40 -12 L36 0 L40 12 Z\" fill=\"#E1F5FE\"/><path d=\"M-24 0 C-20 -14 14 -14 22 0 C14 12 -20 14 -24 0 Z\" fill=\"#F1F8FF\"/><circle cx=\"-4\" cy=\"10\" r=\"11\" fill=\"#FFB74D\"/><circle cx=\"-14\" cy=\"-4\" r=\"5\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"-12.2\" cy=\"-5.8\" r=\"1.9\" fill=\"#fff\" stroke=\"none\"/></g>", "ca_con": "<rect x=\"0\" y=\"0\" width=\"200\" height=\"200\" fill=\"#B3E5FC\" stroke=\"none\"/><path d=\"M0 186 Q100 170 200 186 L200 200 L0 200 Z\" fill=\"#A1887F\"/><path d=\"M40 190 Q26 140 44 100 Q56 70 40 30\" fill=\"none\" stroke=\"#2E7D32\" stroke-width=\"7\"/><path d=\"M40 150 q-16 -6 -22 -20 M44 110 q18 -6 22 -20 M44 70 q-16 -4 -20 -18\" fill=\"none\" stroke=\"#43A047\" stroke-width=\"5\"/><g transform=\"translate(112 100) scale(1.3)\"><path d=\"M30 0 L56 -20 L50 0 L56 20 Z\" fill=\"#FF8A65\"/><path d=\"M-36 0 C-30 -26 22 -28 34 0 C22 28 -30 26 -36 0 Z\" fill=\"#FFB74D\"/><path d=\"M-4 -20 Q8 -36 20 -18 Z\" fill=\"#FF8A65\"/><path d=\"M0 14 Q8 26 16 14 Z\" fill=\"#FF8A65\"/><ellipse cx=\"-14\" cy=\"6\" rx=\"5\" ry=\"3\" fill=\"#F8A5B8\" stroke=\"none\"/><circle cx=\"-20\" cy=\"-5\" r=\"5\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"-18.2\" cy=\"-6.8\" r=\"1.9\" fill=\"#fff\" stroke=\"none\"/><path d=\"M-30 6 q4 3 8 0\" fill=\"none\" stroke-width=\"2.5\"/></g>", "ca_lon": "<rect x=\"0\" y=\"0\" width=\"200\" height=\"200\" fill=\"#B3E5FC\" stroke=\"none\"/><path d=\"M0 186 Q100 170 200 186 L200 200 L0 200 Z\" fill=\"#A1887F\"/><path d=\"M26 190 Q12 140 30 100 Q42 70 26 30\" fill=\"none\" stroke=\"#2E7D32\" stroke-width=\"7\"/><path d=\"M26 150 q-16 -6 -22 -20 M30 110 q18 -6 22 -20 M30 70 q-16 -4 -20 -18\" fill=\"none\" stroke=\"#43A047\" stroke-width=\"5\"/><g transform=\"translate(100 104) scale(1.5)\"><path d=\"M30 0 L56 -20 L50 0 L56 20 Z\" fill=\"#F4511E\"/><path d=\"M-36 0 C-30 -26 22 -28 34 0 C22 28 -30 26 -36 0 Z\" fill=\"#FF9800\"/><path d=\"M-4 -20 Q8 -36 20 -18 Z\" fill=\"#F4511E\"/><path d=\"M0 14 Q8 26 16 14 Z\" fill=\"#F4511E\"/><path d=\"M-10 -8 q6 6 12 0\" fill=\"none\" stroke-width=\"2\"/><path d=\"M-10 4 q6 6 12 0\" fill=\"none\" stroke-width=\"2\"/><path d=\"M4 -8 q6 6 12 0\" fill=\"none\" stroke-width=\"2\"/><path d=\"M4 4 q6 6 12 0\" fill=\"none\" stroke-width=\"2\"/><path d=\"M18 -8 q6 6 12 0\" fill=\"none\" stroke-width=\"2\"/><path d=\"M18 4 q6 6 12 0\" fill=\"none\" stroke-width=\"2\"/><path d=\"M-34 4 q-8 4 -12 12 M-32 8 q-4 6 -4 12\" fill=\"none\" stroke-width=\"2.5\"/><circle cx=\"-20\" cy=\"-5\" r=\"5\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"-18.2\" cy=\"-6.8\" r=\"1.9\" fill=\"#fff\" stroke=\"none\"/><path d=\"M-30 6 q4 3 8 0\" fill=\"none\" stroke-width=\"2.5\"/></g>", "tam_trung": "<rect x=\"0\" y=\"0\" width=\"200\" height=\"200\" fill=\"#FFF8E1\" stroke=\"none\"/><rect x=\"24\" y=\"26\" width=\"152\" height=\"70\" rx=\"8\" fill=\"#FFFDF5\" stroke-width=\"3\"/><circle cx=\"40\" cy=\"40\" r=\"3.4\" fill=\"#BCAAA4\" stroke=\"none\"/><circle cx=\"51\" cy=\"43\" r=\"3.4\" fill=\"#BCAAA4\" stroke=\"none\"/><circle cx=\"62\" cy=\"40\" r=\"3.4\" fill=\"#BCAAA4\" stroke=\"none\"/><circle cx=\"73\" cy=\"43\" r=\"3.4\" fill=\"#BCAAA4\" stroke=\"none\"/><circle cx=\"84\" cy=\"40\" r=\"3.4\" fill=\"#BCAAA4\" stroke=\"none\"/><circle cx=\"95\" cy=\"43\" r=\"3.4\" fill=\"#BCAAA4\" stroke=\"none\"/><circle cx=\"106\" cy=\"40\" r=\"3.4\" fill=\"#BCAAA4\" stroke=\"none\"/><circle cx=\"117\" cy=\"43\" r=\"3.4\" fill=\"#BCAAA4\" stroke=\"none\"/><circle cx=\"128\" cy=\"40\" r=\"3.4\" fill=\"#BCAAA4\" stroke=\"none\"/><circle cx=\"139\" cy=\"43\" r=\"3.4\" fill=\"#BCAAA4\" stroke=\"none\"/><circle cx=\"150\" cy=\"40\" r=\"3.4\" fill=\"#BCAAA4\" stroke=\"none\"/><circle cx=\"161\" cy=\"43\" r=\"3.4\" fill=\"#BCAAA4\" stroke=\"none\"/><circle cx=\"40\" cy=\"52\" r=\"3.4\" fill=\"#BCAAA4\" stroke=\"none\"/><circle cx=\"51\" cy=\"55\" r=\"3.4\" fill=\"#BCAAA4\" stroke=\"none\"/><circle cx=\"62\" cy=\"52\" r=\"3.4\" fill=\"#BCAAA4\" stroke=\"none\"/><circle cx=\"73\" cy=\"55\" r=\"3.4\" fill=\"#BCAAA4\" stroke=\"none\"/><circle cx=\"84\" cy=\"52\" r=\"3.4\" fill=\"#BCAAA4\" stroke=\"none\"/><circle cx=\"95\" cy=\"55\" r=\"3.4\" fill=\"#BCAAA4\" stroke=\"none\"/><circle cx=\"106\" cy=\"52\" r=\"3.4\" fill=\"#BCAAA4\" stroke=\"none\"/><circle cx=\"117\" cy=\"55\" r=\"3.4\" fill=\"#BCAAA4\" stroke=\"none\"/><circle cx=\"128\" cy=\"52\" r=\"3.4\" fill=\"#BCAAA4\" stroke=\"none\"/><circle cx=\"139\" cy=\"55\" r=\"3.4\" fill=\"#BCAAA4\" stroke=\"none\"/><circle cx=\"150\" cy=\"52\" r=\"3.4\" fill=\"#BCAAA4\" stroke=\"none\"/><circle cx=\"161\" cy=\"55\" r=\"3.4\" fill=\"#BCAAA4\" stroke=\"none\"/><circle cx=\"40\" cy=\"64\" r=\"3.4\" fill=\"#BCAAA4\" stroke=\"none\"/><circle cx=\"51\" cy=\"67\" r=\"3.4\" fill=\"#BCAAA4\" stroke=\"none\"/><circle cx=\"62\" cy=\"64\" r=\"3.4\" fill=\"#BCAAA4\" stroke=\"none\"/><circle cx=\"73\" cy=\"67\" r=\"3.4\" fill=\"#BCAAA4\" stroke=\"none\"/><circle cx=\"84\" cy=\"64\" r=\"3.4\" fill=\"#BCAAA4\" stroke=\"none\"/><circle cx=\"95\" cy=\"67\" r=\"3.4\" fill=\"#BCAAA4\" stroke=\"none\"/><circle cx=\"106\" cy=\"64\" r=\"3.4\" fill=\"#BCAAA4\" stroke=\"none\"/><circle cx=\"117\" cy=\"67\" r=\"3.4\" fill=\"#BCAAA4\" stroke=\"none\"/><circle cx=\"128\" cy=\"64\" r=\"3.4\" fill=\"#BCAAA4\" stroke=\"none\"/><circle cx=\"139\" cy=\"67\" r=\"3.4\" fill=\"#BCAAA4\" stroke=\"none\"/><circle cx=\"150\" cy=\"64\" r=\"3.4\" fill=\"#BCAAA4\" stroke=\"none\"/><circle cx=\"161\" cy=\"67\" r=\"3.4\" fill=\"#BCAAA4\" stroke=\"none\"/><circle cx=\"40\" cy=\"76\" r=\"3.4\" fill=\"#BCAAA4\" stroke=\"none\"/><circle cx=\"51\" cy=\"79\" r=\"3.4\" fill=\"#BCAAA4\" stroke=\"none\"/><circle cx=\"62\" cy=\"76\" r=\"3.4\" fill=\"#BCAAA4\" stroke=\"none\"/><circle cx=\"73\" cy=\"79\" r=\"3.4\" fill=\"#BCAAA4\" stroke=\"none\"/><circle cx=\"84\" cy=\"76\" r=\"3.4\" fill=\"#BCAAA4\" stroke=\"none\"/><circle cx=\"95\" cy=\"79\" r=\"3.4\" fill=\"#BCAAA4\" stroke=\"none\"/><circle cx=\"106\" cy=\"76\" r=\"3.4\" fill=\"#BCAAA4\" stroke=\"none\"/><circle cx=\"117\" cy=\"79\" r=\"3.4\" fill=\"#BCAAA4\" stroke=\"none\"/><circle cx=\"128\" cy=\"76\" r=\"3.4\" fill=\"#BCAAA4\" stroke=\"none\"/><circle cx=\"139\" cy=\"79\" r=\"3.4\" fill=\"#BCAAA4\" stroke=\"none\"/><circle cx=\"150\" cy=\"76\" r=\"3.4\" fill=\"#BCAAA4\" stroke=\"none\"/><circle cx=\"161\" cy=\"79\" r=\"3.4\" fill=\"#BCAAA4\" stroke=\"none\"/><circle cx=\"104\" cy=\"140\" r=\"40\" fill=\"#FFFDF5\" stroke-width=\"5\"/><circle cx=\"88\" cy=\"128\" r=\"7\" fill=\"#BCAAA4\" stroke-width=\"2.5\"/><circle cx=\"106\" cy=\"124\" r=\"7\" fill=\"#BCAAA4\" stroke-width=\"2.5\"/><circle cx=\"122\" cy=\"134\" r=\"7\" fill=\"#BCAAA4\" stroke-width=\"2.5\"/><circle cx=\"92\" cy=\"148\" r=\"7\" fill=\"#BCAAA4\" stroke-width=\"2.5\"/><circle cx=\"110\" cy=\"152\" r=\"7\" fill=\"#BCAAA4\" stroke-width=\"2.5\"/><path d=\"M132 168 L160 194\" fill=\"none\" stroke-width=\"10\"/>", "tam_con": "<rect x=\"0\" y=\"0\" width=\"200\" height=\"200\" fill=\"#F1F8E9\" stroke=\"none\"/><path d=\"M30 176 C10 120 40 52 100 40 C160 52 190 120 170 176 C140 164 120 186 100 176 C80 186 60 164 30 176 Z\" fill=\"#81C784\"/><path d=\"M100 46 L100 176 M100 90 L64 70 M100 90 L136 70 M100 126 L58 112 M100 126 L142 112\" fill=\"none\" stroke-width=\"3\"/><path d=\"M150 66 a10 10 0 0 1 -12 12 a10 10 0 0 1 -8 -10\" fill=\"#F1F8E9\" stroke-width=\"3\"/><ellipse cx=\"52\" cy=\"132\" rx=\"12\" ry=\"14\" fill=\"#FAFAFA\" stroke-width=\"3\"/><ellipse cx=\"67\" cy=\"125\" rx=\"12\" ry=\"14\" fill=\"#FAFAFA\" stroke-width=\"3\"/><ellipse cx=\"82\" cy=\"118\" rx=\"12\" ry=\"14\" fill=\"#FAFAFA\" stroke-width=\"3\"/><ellipse cx=\"97\" cy=\"111\" rx=\"12\" ry=\"14\" fill=\"#FAFAFA\" stroke-width=\"3\"/><ellipse cx=\"112\" cy=\"104\" rx=\"12\" ry=\"14\" fill=\"#FAFAFA\" stroke-width=\"3\"/><ellipse cx=\"127\" cy=\"97\" rx=\"12\" ry=\"14\" fill=\"#FAFAFA\" stroke-width=\"3\"/><circle cx=\"142\" cy=\"88\" r=\"13\" fill=\"#E0E0E0\"/><circle cx=\"138\" cy=\"86\" r=\"3.6\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"139.3\" cy=\"84.7\" r=\"1.4\" fill=\"#fff\" stroke=\"none\"/><circle cx=\"148\" cy=\"84\" r=\"3.6\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"149.3\" cy=\"82.7\" r=\"1.4\" fill=\"#fff\" stroke=\"none\"/><ellipse cx=\"140\" cy=\"96\" rx=\"5.5\" ry=\"3.2\" fill=\"#F8A5B8\" stroke=\"none\"/><path d=\"M80 108 l2 6 M110 96 l2 6\" fill=\"none\" stroke-width=\"2.5\"/>", "tam_ken": "<rect x=\"0\" y=\"0\" width=\"200\" height=\"200\" fill=\"#FFF8E1\" stroke=\"none\"/><path d=\"M20 60 L180 60\" fill=\"none\" stroke=\"#A0673A\" stroke-width=\"9\"/><path d=\"M100 64 L100 80\" fill=\"none\" stroke-width=\"2.5\"/><ellipse cx=\"100\" cy=\"124\" rx=\"38\" ry=\"48\" fill=\"#FFF59D\"/><path d=\"M70 96 Q100 124 130 152\" fill=\"none\" stroke=\"#F9A825\" stroke-width=\"2\"/><path d=\"M78 92 Q100 124 122 156\" fill=\"none\" stroke=\"#F9A825\" stroke-width=\"2\"/><path d=\"M86 88 Q100 124 114 160\" fill=\"none\" stroke=\"#F9A825\" stroke-width=\"2\"/><path d=\"M94 84 Q100 124 106 164\" fill=\"none\" stroke=\"#F9A825\" stroke-width=\"2\"/><path d=\"M102 88 Q100 124 98 160\" fill=\"none\" stroke=\"#F9A825\" stroke-width=\"2\"/><path d=\"M110 92 Q100 124 90 156\" fill=\"none\" stroke=\"#F9A825\" stroke-width=\"2\"/><path d=\"M118 96 Q100 124 82 152\" fill=\"none\" stroke=\"#F9A825\" stroke-width=\"2\"/><path d=\"M66 110 Q100 100 134 112 M64 136 Q100 148 136 134\" fill=\"none\" stroke=\"#F9A825\" stroke-width=\"2\"/>", "tam_ngai": "<rect x=\"0\" y=\"0\" width=\"200\" height=\"200\" fill=\"#F3E5F5\" stroke=\"none\"/><path d=\"M96 100 C60 60 18 66 22 100 C26 126 70 124 96 110 Z\" fill=\"#FFF8E1\"/><path d=\"M104 100 C140 60 182 66 178 100 C174 126 130 124 104 110 Z\" fill=\"#FFF8E1\"/><path d=\"M96 110 C70 120 44 146 60 160 C76 168 92 140 98 118 Z\" fill=\"#FFFDE7\"/><path d=\"M104 110 C130 120 156 146 140 160 C124 168 108 140 102 118 Z\" fill=\"#FFFDE7\"/><path d=\"M40 96 Q60 88 84 100 M160 96 Q140 88 116 100\" fill=\"none\" stroke=\"#BCAAA4\" stroke-width=\"2.5\"/><ellipse cx=\"100\" cy=\"124\" rx=\"14\" ry=\"34\" fill=\"#FAFAFA\"/><path d=\"M88 116 h24 M88 130 h24 M90 144 h20\" fill=\"none\" stroke-width=\"2\"/><circle cx=\"100\" cy=\"84\" r=\"13\" fill=\"#FAFAFA\"/><circle cx=\"95\" cy=\"84\" r=\"3.4\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"96.2\" cy=\"82.8\" r=\"1.3\" fill=\"#fff\" stroke=\"none\"/><circle cx=\"105\" cy=\"84\" r=\"3.4\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"106.2\" cy=\"82.8\" r=\"1.3\" fill=\"#fff\" stroke=\"none\"/><path d=\"M94 72 Q80 52 66 46 M106 72 Q120 52 134 46\" fill=\"none\" stroke-width=\"3\"/><path d=\"M84 60 l-6 -2 M78 54 l-6 -2 M116 60 l6 -2 M122 54 l6 -2\" fill=\"none\" stroke-width=\"2.5\"/>", "cc_trung": "<rect x=\"0\" y=\"0\" width=\"200\" height=\"200\" fill=\"#E3F2FD\" stroke=\"none\"/><rect x=\"0\" y=\"86\" width=\"200\" height=\"114\" fill=\"#B3E5FC\" stroke=\"none\"/><path d=\"M0 86 Q25 80 50 86 T100 86 T150 86 T200 86\" fill=\"none\" stroke=\"#4FC3F7\" stroke-width=\"4\"/><path d=\"M0 186 Q100 172 200 186 L200 200 L0 200 Z\" fill=\"#A1887F\"/><path d=\"M120 190 Q124 110 118 20\" fill=\"none\" stroke=\"#558B2F\" stroke-width=\"7\"/><path d=\"M122 140 q20 -20 22 -50\" fill=\"none\" stroke=\"#7CB342\" stroke-width=\"5\"/><ellipse cx=\"110\" cy=\"112\" rx=\"4\" ry=\"6\" fill=\"#FFF59D\" stroke-width=\"2\"/><ellipse cx=\"112\" cy=\"126\" rx=\"4\" ry=\"6\" fill=\"#FFF59D\" stroke-width=\"2\"/><ellipse cx=\"108\" cy=\"140\" rx=\"4\" ry=\"6\" fill=\"#FFF59D\" stroke-width=\"2\"/><ellipse cx=\"130\" cy=\"118\" rx=\"4\" ry=\"6\" fill=\"#FFF59D\" stroke-width=\"2\"/><ellipse cx=\"132\" cy=\"132\" rx=\"4\" ry=\"6\" fill=\"#FFF59D\" stroke-width=\"2\"/><ellipse cx=\"128\" cy=\"146\" rx=\"4\" ry=\"6\" fill=\"#FFF59D\" stroke-width=\"2\"/><ellipse cx=\"112\" cy=\"154\" rx=\"4\" ry=\"6\" fill=\"#FFF59D\" stroke-width=\"2\"/>", "cc_au_trung": "<rect x=\"0\" y=\"0\" width=\"200\" height=\"200\" fill=\"#E3F2FD\" stroke=\"none\"/><rect x=\"0\" y=\"86\" width=\"200\" height=\"114\" fill=\"#B3E5FC\" stroke=\"none\"/><path d=\"M0 86 Q25 80 50 86 T100 86 T150 86 T200 86\" fill=\"none\" stroke=\"#4FC3F7\" stroke-width=\"4\"/><path d=\"M0 186 Q100 172 200 186 L200 200 L0 200 Z\" fill=\"#A1887F\"/><path d=\"M170 190 Q174 110 168 20\" fill=\"none\" stroke=\"#558B2F\" stroke-width=\"7\"/><path d=\"M172 140 q20 -20 22 -50\" fill=\"none\" stroke=\"#7CB342\" stroke-width=\"5\"/><g transform=\"translate(92 138) rotate(0) scale(1.25)\"><path d=\"M-14 -6 l-22 -12 l-6 -14 M-14 4 l-24 6 l-6 14 M0 -10 l-6 -24 l8 -10 M0 10 l-6 24 l8 10 M14 -8 l14 -20 M14 8 l14 20\" fill=\"none\" stroke-width=\"4\"/><ellipse cx=\"34\" cy=\"0\" rx=\"26\" ry=\"16\" fill=\"#8D9F5A\"/><path d=\"M22 -14 v28 M34 -16 v32 M46 -14 v28\" fill=\"none\" stroke-width=\"2\"/><ellipse cx=\"2\" cy=\"0\" rx=\"18\" ry=\"13\" fill=\"#9CCC65\"/><path d=\"M-4 -8 q14 -6 22 4 M-4 8 q14 6 22 -4\" fill=\"#C5E1A5\" stroke-width=\"2\"/><ellipse cx=\"-26\" cy=\"0\" rx=\"12\" ry=\"14\" fill=\"#9CCC65\"/><circle cx=\"-30\" cy=\"-7\" r=\"4.2\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"-28.5\" cy=\"-8.5\" r=\"1.6\" fill=\"#fff\" stroke=\"none\"/><circle cx=\"-30\" cy=\"7\" r=\"4.2\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"-28.5\" cy=\"5.5\" r=\"1.6\" fill=\"#fff\" stroke=\"none\"/></g><circle cx=\"40\" cy=\"110\" r=\"5\" fill=\"#E1F5FE\" stroke-width=\"2\"/><circle cx=\"60\" cy=\"100\" r=\"3.5\" fill=\"#E1F5FE\" stroke-width=\"2\"/>", "cc_len_bo": "<rect x=\"0\" y=\"0\" width=\"200\" height=\"200\" fill=\"#E3F2FD\" stroke=\"none\"/><rect x=\"0\" y=\"86\" width=\"200\" height=\"114\" fill=\"#B3E5FC\" stroke=\"none\"/><path d=\"M0 86 Q25 80 50 86 T100 86 T150 86 T200 86\" fill=\"none\" stroke=\"#4FC3F7\" stroke-width=\"4\"/><path d=\"M0 186 Q100 172 200 186 L200 200 L0 200 Z\" fill=\"#A1887F\"/><path d=\"M104 190 Q108 110 102 10\" fill=\"none\" stroke=\"#558B2F\" stroke-width=\"7\"/><path d=\"M106 140 q20 -20 22 -50\" fill=\"none\" stroke=\"#7CB342\" stroke-width=\"5\"/><g transform=\"translate(104 92) rotate(90) scale(1.05)\"><path d=\"M-14 -6 l-22 -12 l-6 -14 M-14 4 l-24 6 l-6 14 M0 -10 l-6 -24 l8 -10 M0 10 l-6 24 l8 10 M14 -8 l14 -20 M14 8 l14 20\" fill=\"none\" stroke-width=\"4\"/><ellipse cx=\"34\" cy=\"0\" rx=\"26\" ry=\"16\" fill=\"#8D9F5A\"/><path d=\"M22 -14 v28 M34 -16 v32 M46 -14 v28\" fill=\"none\" stroke-width=\"2\"/><ellipse cx=\"2\" cy=\"0\" rx=\"18\" ry=\"13\" fill=\"#9CCC65\"/><path d=\"M-4 -8 q14 -6 22 4 M-4 8 q14 6 22 -4\" fill=\"#C5E1A5\" stroke-width=\"2\"/><ellipse cx=\"-26\" cy=\"0\" rx=\"12\" ry=\"14\" fill=\"#9CCC65\"/><circle cx=\"-30\" cy=\"-7\" r=\"4.2\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"-28.5\" cy=\"-8.5\" r=\"1.6\" fill=\"#fff\" stroke=\"none\"/><circle cx=\"-30\" cy=\"7\" r=\"4.2\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"-28.5\" cy=\"5.5\" r=\"1.6\" fill=\"#fff\" stroke=\"none\"/></g>", "cc_lon": "<rect x=\"0\" y=\"0\" width=\"200\" height=\"200\" fill=\"#E3F2FD\" stroke=\"none\"/><path d=\"M40 190 Q44 110 38 60\" fill=\"none\" stroke=\"#558B2F\" stroke-width=\"7\"/><path d=\"M42 140 q20 -20 22 -50\" fill=\"none\" stroke=\"#7CB342\" stroke-width=\"5\"/><ellipse cx=\"74\" cy=\"78\" rx=\"44\" ry=\"11\" fill=\"#E1F5FE\" stroke-width=\"3\" transform=\"rotate(-14 74 78)\"/><ellipse cx=\"146\" cy=\"78\" rx=\"44\" ry=\"11\" fill=\"#E1F5FE\" stroke-width=\"3\" transform=\"rotate(14 146 78)\"/><ellipse cx=\"76\" cy=\"102\" rx=\"40\" ry=\"10\" fill=\"#E1F5FE\" stroke-width=\"3\" transform=\"rotate(10 76 102)\"/><ellipse cx=\"144\" cy=\"102\" rx=\"40\" ry=\"10\" fill=\"#E1F5FE\" stroke-width=\"3\" transform=\"rotate(-10 144 102)\"/><rect x=\"104\" y=\"100\" width=\"12\" height=\"84\" rx=\"6\" fill=\"#1E88E5\"/><path d=\"M104 118 h12 M104 132 h12 M104 146 h12 M104 160 h12\" fill=\"none\" stroke-width=\"2\"/><ellipse cx=\"110\" cy=\"90\" rx=\"13\" ry=\"16\" fill=\"#1565C0\"/><circle cx=\"100\" cy=\"64\" r=\"12\" fill=\"#43A047\"/><circle cx=\"120\" cy=\"64\" r=\"12\" fill=\"#43A047\"/><circle cx=\"97\" cy=\"60\" r=\"4\" fill=\"#fff\" stroke=\"none\"/><circle cx=\"117\" cy=\"60\" r=\"4\" fill=\"#fff\" stroke=\"none\"/>", "meo_so_sinh": "<rect x=\"0\" y=\"0\" width=\"200\" height=\"200\" fill=\"#FFF3E0\" stroke=\"none\"/><rect x=\"0\" y=\"160\" width=\"200\" height=\"40\" fill=\"#D7CCC8\" stroke=\"none\"/><ellipse cx=\"100\" cy=\"152\" rx=\"80\" ry=\"22\" fill=\"#F8BBD0\"/><path d=\"M30 150 q70 -20 140 0\" fill=\"none\" stroke=\"#F48FB1\" stroke-width=\"3\"/><ellipse cx=\"108\" cy=\"132\" rx=\"40\" ry=\"24\" fill=\"#FFB74D\"/><path d=\"M96 110 l-2 10 M110 108 l0 10 M124 110 l2 10\" fill=\"none\" stroke=\"#F57C00\" stroke-width=\"3\"/><path d=\"M146 136 q22 4 20 -16\" fill=\"none\" stroke=\"#3B2314\" stroke-width=\"9\"/><path d=\"M146 136 q22 4 20 -16\" fill=\"none\" stroke=\"#FFB74D\" stroke-width=\"5\"/><path d=\"M53.3 118.9 L51.6 98.5 L66.9 108.7 Z M90.7 118.9 L92.4 98.5 L77.1 108.7 Z\" fill=\"#FFB74D\"/><path d=\"M55.0 115.5 L54.150000000000006 103.6 L62.65 110.4 Z M89.0 115.5 L89.85 103.6 L81.35 110.4 Z\" fill=\"#F8A5B8\" stroke=\"none\"/><ellipse cx=\"72\" cy=\"124\" rx=\"22.099999999999998\" ry=\"18.7\" fill=\"#FFB74D\"/><path d=\"M66.9 107.0 l2 8 M72 106.15 l0 8 M77.1 107.0 l-2 8\" fill=\"none\" stroke=\"#F57C00\" stroke-width=\"3\"/><path d=\"M61.8 124 q5 4 10 0 M73.7 124 q5 4 10 0\" fill=\"none\" stroke-width=\"3\"/><path d=\"M69.45 129.95 l3 3 l3 -3 Z\" fill=\"#F48FB1\" stroke-width=\"2\"/><path d=\"M72 132.5 q-5 5 -9 2 M72 132.5 q5 5 9 2\" fill=\"none\" stroke-width=\"2.5\"/><path d=\"M58.4 129.1 l-14 -2 M58.4 132.5 l-14 3 M85.6 129.1 l14 -2 M85.6 132.5 l14 3\" fill=\"none\" stroke-width=\"2\"/><ellipse cx=\"59.25\" cy=\"127.4\" rx=\"5.5\" ry=\"3.2\" fill=\"#F8A5B8\" stroke=\"none\"/><ellipse cx=\"84.75\" cy=\"127.4\" rx=\"5.5\" ry=\"3.2\" fill=\"#F8A5B8\" stroke=\"none\"/><text x=\"150\" y=\"60\" font-size=\"22\" font-weight=\"700\" fill=\"#8D6E63\" stroke=\"none\" font-family=\"sans-serif\">z z</text>", "meo_mo_mat": "<rect x=\"0\" y=\"0\" width=\"200\" height=\"200\" fill=\"#FFF3E0\" stroke=\"none\"/><rect x=\"0\" y=\"160\" width=\"200\" height=\"40\" fill=\"#D7CCC8\" stroke=\"none\"/><ellipse cx=\"100\" cy=\"138\" rx=\"30\" ry=\"28\" fill=\"#FFB74D\"/><path d=\"M84 160 v8 M116 160 v8\" fill=\"none\" stroke-width=\"8\"/><path d=\"M84 160 v8 M116 160 v8\" fill=\"none\" stroke=\"#FFB74D\" stroke-width=\"4\"/><path d=\"M128 146 q24 -4 22 -30\" fill=\"none\" stroke=\"#3B2314\" stroke-width=\"9\"/><path d=\"M128 146 q24 -4 22 -30\" fill=\"none\" stroke=\"#FFB74D\" stroke-width=\"5\"/><path d=\"M74.7 87.1 L72.4 59.5 L93.1 73.3 Z M125.3 87.1 L127.6 59.5 L106.9 73.3 Z\" fill=\"#FFB74D\"/><path d=\"M77.0 82.5 L75.85 66.4 L87.35 75.6 Z M123.0 82.5 L124.15 66.4 L112.65 75.6 Z\" fill=\"#F8A5B8\" stroke=\"none\"/><ellipse cx=\"100\" cy=\"94\" rx=\"29.9\" ry=\"25.299999999999997\" fill=\"#FFB74D\"/><path d=\"M93.1 71.0 l2 8 M100 69.85 l0 8 M106.9 71.0 l-2 8\" fill=\"none\" stroke=\"#F57C00\" stroke-width=\"3\"/><circle cx=\"90.8\" cy=\"94\" r=\"5.175\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"92.6\" cy=\"92.2\" r=\"2.0\" fill=\"#fff\" stroke=\"none\"/><circle cx=\"109.2\" cy=\"94\" r=\"5.175\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"111.0\" cy=\"92.2\" r=\"2.0\" fill=\"#fff\" stroke=\"none\"/><path d=\"M96.55 102.05 l3 3 l3 -3 Z\" fill=\"#F48FB1\" stroke-width=\"2\"/><path d=\"M100 105.5 q-5 5 -9 2 M100 105.5 q5 5 9 2\" fill=\"none\" stroke-width=\"2.5\"/><path d=\"M81.6 100.9 l-14 -2 M81.6 105.5 l-14 3 M118.4 100.9 l14 -2 M118.4 105.5 l14 3\" fill=\"none\" stroke-width=\"2\"/><ellipse cx=\"82.75\" cy=\"98.6\" rx=\"5.5\" ry=\"3.2\" fill=\"#F8A5B8\" stroke=\"none\"/><ellipse cx=\"117.25\" cy=\"98.6\" rx=\"5.5\" ry=\"3.2\" fill=\"#F8A5B8\" stroke=\"none\"/><path d=\"M40 60 l6 -8 M34 76 l-8 0 M160 58 l-6 -8 M166 74 l8 0\" fill=\"none\" stroke=\"#FFD54F\" stroke-width=\"4\"/>", "meo_tap_choi": "<rect x=\"0\" y=\"0\" width=\"200\" height=\"200\" fill=\"#FFF3E0\" stroke=\"none\"/><rect x=\"0\" y=\"160\" width=\"200\" height=\"40\" fill=\"#D7CCC8\" stroke=\"none\"/><circle cx=\"152\" cy=\"146\" r=\"22\" fill=\"#CE93D8\"/><path d=\"M134 140 q18 -10 36 4 M136 154 q16 8 32 -2 M146 126 q8 20 2 40\" fill=\"none\" stroke=\"#8E24AA\" stroke-width=\"2.5\"/><path d=\"M152 168 q-20 16 -50 8\" fill=\"none\" stroke=\"#8E24AA\" stroke-width=\"3\"/><path d=\"M54 140 C50 116 70 104 100 108 C120 112 126 130 118 146 Z\" fill=\"#FFB74D\"/><path d=\"M118 132 l22 -2 M114 144 l20 6\" fill=\"none\" stroke-width=\"8\"/><path d=\"M118 132 l22 -2 M114 144 l20 6\" fill=\"none\" stroke=\"#FFB74D\" stroke-width=\"4\"/><path d=\"M56 136 q-30 -10 -24 -42\" fill=\"none\" stroke=\"#3B2314\" stroke-width=\"9\"/><path d=\"M56 136 q-30 -10 -24 -42\" fill=\"none\" stroke=\"#FFB74D\" stroke-width=\"5\"/><path d=\"M66 142 v18 M86 146 v16\" fill=\"none\" stroke-width=\"8\"/><path d=\"M66 142 v18 M86 146 v16\" fill=\"none\" stroke=\"#FFB74D\" stroke-width=\"4\"/><path d=\"M96.0 94.0 L94.0 70.0 L112.0 82.0 Z M140.0 94.0 L142.0 70.0 L124.0 82.0 Z\" fill=\"#FFB74D\"/><path d=\"M98.0 90.0 L97.0 76.0 L107.0 84.0 Z M138.0 90.0 L139.0 76.0 L129.0 84.0 Z\" fill=\"#F8A5B8\" stroke=\"none\"/><ellipse cx=\"118\" cy=\"100\" rx=\"26.0\" ry=\"22.0\" fill=\"#FFB74D\"/><path d=\"M112.0 80.0 l2 8 M118 79.0 l0 8 M124.0 80.0 l-2 8\" fill=\"none\" stroke=\"#F57C00\" stroke-width=\"3\"/><circle cx=\"110.0\" cy=\"100\" r=\"4.5\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"111.6\" cy=\"98.4\" r=\"1.7\" fill=\"#fff\" stroke=\"none\"/><circle cx=\"126.0\" cy=\"100\" r=\"4.5\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"127.6\" cy=\"98.4\" r=\"1.7\" fill=\"#fff\" stroke=\"none\"/><path d=\"M115.0 107.0 l3 3 l3 -3 Z\" fill=\"#F48FB1\" stroke-width=\"2\"/><path d=\"M118 110.0 q-5 5 -9 2 M118 110.0 q5 5 9 2\" fill=\"none\" stroke-width=\"2.5\"/><path d=\"M102.0 106.0 l-14 -2 M102.0 110.0 l-14 3 M134.0 106.0 l14 -2 M134.0 110.0 l14 3\" fill=\"none\" stroke-width=\"2\"/><ellipse cx=\"103.0\" cy=\"104.0\" rx=\"5.5\" ry=\"3.2\" fill=\"#F8A5B8\" stroke=\"none\"/><ellipse cx=\"133.0\" cy=\"104.0\" rx=\"5.5\" ry=\"3.2\" fill=\"#F8A5B8\" stroke=\"none\"/>", "meo_lon": "<rect x=\"0\" y=\"0\" width=\"200\" height=\"200\" fill=\"#FFF3E0\" stroke=\"none\"/><rect x=\"0\" y=\"160\" width=\"200\" height=\"40\" fill=\"#D7CCC8\" stroke=\"none\"/><path d=\"M64 166 C56 120 76 96 100 96 C124 96 144 120 136 166 Z\" fill=\"#FFB74D\"/><path d=\"M80 124 q8 6 0 12 M120 124 q-8 6 0 12 M84 146 q8 6 0 12 M116 146 q-8 6 0 12\" fill=\"none\" stroke=\"#F57C00\" stroke-width=\"3\"/><ellipse cx=\"100\" cy=\"140\" rx=\"16\" ry=\"22\" fill=\"#FFF3E0\" stroke=\"none\"/><path d=\"M136 160 q40 4 30 -40\" fill=\"none\" stroke=\"#3B2314\" stroke-width=\"11\"/><path d=\"M136 160 q40 4 30 -40\" fill=\"none\" stroke=\"#FFB74D\" stroke-width=\"7\"/><ellipse cx=\"84\" cy=\"166\" rx=\"12\" ry=\"6\" fill=\"#FFB74D\"/><ellipse cx=\"116\" cy=\"166\" rx=\"12\" ry=\"6\" fill=\"#FFB74D\"/><path d=\"M72.5 64.5 L70.0 34.5 L92.5 49.5 Z M127.5 64.5 L130.0 34.5 L107.5 49.5 Z\" fill=\"#FFB74D\"/><path d=\"M75.0 59.5 L73.75 42.0 L86.25 52.0 Z M125.0 59.5 L126.25 42.0 L113.75 52.0 Z\" fill=\"#F8A5B8\" stroke=\"none\"/><ellipse cx=\"100\" cy=\"72\" rx=\"32.5\" ry=\"27.5\" fill=\"#FFB74D\"/><path d=\"M92.5 47.0 l2 8 M100 45.75 l0 8 M107.5 47.0 l-2 8\" fill=\"none\" stroke=\"#F57C00\" stroke-width=\"3\"/><circle cx=\"90.0\" cy=\"72\" r=\"5.625\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"92.0\" cy=\"70.0\" r=\"2.1\" fill=\"#fff\" stroke=\"none\"/><circle cx=\"110.0\" cy=\"72\" r=\"5.625\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"112.0\" cy=\"70.0\" r=\"2.1\" fill=\"#fff\" stroke=\"none\"/><path d=\"M96.25 80.75 l3 3 l3 -3 Z\" fill=\"#F48FB1\" stroke-width=\"2\"/><path d=\"M100 84.5 q-5 5 -9 2 M100 84.5 q5 5 9 2\" fill=\"none\" stroke-width=\"2.5\"/><path d=\"M80.0 79.5 l-14 -2 M80.0 84.5 l-14 3 M120.0 79.5 l14 -2 M120.0 84.5 l14 3\" fill=\"none\" stroke-width=\"2\"/><ellipse cx=\"81.25\" cy=\"77.0\" rx=\"5.5\" ry=\"3.2\" fill=\"#F8A5B8\" stroke=\"none\"/><ellipse cx=\"118.75\" cy=\"77.0\" rx=\"5.5\" ry=\"3.2\" fill=\"#F8A5B8\" stroke=\"none\"/>"});
  const CYCLES = Object.freeze([{"id": "chicken", "title": "Vòng đời con gà", "emoji": "🐔", "tone": "amber", "intro": "Gà mẹ đẻ trứng, trứng nở ra gà con, gà con lớn lên lại đẻ trứng.", "stages": [{"key": "ga_trung", "name": "Quả trứng", "fact": "Gà mẹ đẻ trứng và nằm ấp cho trứng luôn ấm."}, {"key": "ga_no", "name": "Gà con nở", "fact": "Khoảng 21 ngày sau, gà con mổ vỡ vỏ trứng để chui ra."}, {"key": "ga_con", "name": "Gà con", "fact": "Gà con có bộ lông vàng mềm, lon ton theo mẹ đi kiếm ăn."}, {"key": "ga_lon", "name": "Gà trưởng thành", "fact": "Gà con lớn lên thành gà trưởng thành. Gà mái lại đẻ trứng."}]}, {"id": "butterfly", "title": "Vòng đời con bướm", "emoji": "🦋", "tone": "pink", "intro": "Từ quả trứng nhỏ xíu, con sâu biến hình thành con bướm xinh đẹp.", "stages": [{"key": "buom_trung", "name": "Trứng trên lá", "fact": "Bướm mẹ đẻ những quả trứng nhỏ xíu trên lá cây."}, {"key": "buom_sau", "name": "Con sâu", "fact": "Trứng nở ra sâu. Sâu ăn lá rất nhiều nên lớn rất nhanh."}, {"key": "buom_nhong", "name": "Con nhộng", "fact": "Sâu treo mình lên cành và hoá thành nhộng. Bên trong, sâu đang dần biến thành bướm."}, {"key": "buom_lon", "name": "Con bướm", "fact": "Bướm chui ra khỏi nhộng, chờ cánh khô rồi bay đi. Bướm mẹ lại đẻ trứng."}]}, {"id": "water", "title": "Vòng tuần hoàn của nước", "emoji": "💧", "tone": "teal", "intro": "Nước không mất đi đâu cả: nước bay lên trời, rồi lại rơi xuống thành mưa.", "stages": [{"key": "nuoc_bien", "name": "Nước ở sông, biển", "fact": "Nước có ở sông, hồ và biển."}, {"key": "nuoc_boc_hoi", "name": "Nước bốc hơi", "fact": "Mặt Trời làm nước nóng lên, nước biến thành hơi nước bay lên cao."}, {"key": "nuoc_may", "name": "Mây", "fact": "Lên cao gặp lạnh, hơi nước thành những giọt nước li ti, tụ lại thành mây."}, {"key": "nuoc_mua", "name": "Mưa", "fact": "Giọt nước trong mây to và nặng dần, rơi xuống thành mưa rồi chảy về sông, biển."}]}, {"id": "bee", "title": "Vòng đời con ong", "emoji": "🐝", "tone": "amber", "intro": "Ong lớn lên trong những ô sáp hình lục giác của tổ ong.", "stages": [{"key": "ong_trung", "name": "Trứng trong ô", "fact": "Ong chúa đẻ mỗi quả trứng vào một ô nhỏ hình lục giác trong tổ."}, {"key": "ong_au_trung", "name": "Ấu trùng", "fact": "Trứng nở thành ấu trùng màu trắng, được ong thợ chăm cho ăn."}, {"key": "ong_nhong", "name": "Nhộng", "fact": "Ô tổ được đậy nắp lại. Bên trong, ấu trùng biến thành nhộng."}, {"key": "ong_lon", "name": "Ong trưởng thành", "fact": "Ong cắn nắp ô chui ra và bắt đầu làm việc cho cả tổ."}]}, {"id": "turtle", "title": "Vòng đời rùa biển", "emoji": "🐢", "tone": "teal", "intro": "Rùa biển sống ở biển, nhưng rùa mẹ lại lên bãi cát để đẻ trứng.", "stages": [{"key": "rua_trung", "name": "Trứng trong cát", "fact": "Rùa mẹ bò lên bãi cát, đào hố đẻ trứng rồi lấp cát lại."}, {"key": "rua_no", "name": "Rùa con nở", "fact": "Khoảng hai tháng sau, rùa con phá vỏ trứng chui ra."}, {"key": "rua_ra_bien", "name": "Rùa con ra biển", "fact": "Rùa con bò thật nhanh về phía biển."}, {"key": "rua_lon", "name": "Rùa trưởng thành", "fact": "Rùa con lớn lên ở biển. Rùa mẹ lại quay về bãi cát để đẻ trứng."}]}, {"id": "bean", "title": "Vòng đời cây đậu", "emoji": "🌱", "tone": "teal", "intro": "Từ một hạt đậu nhỏ, cây lớn lên, ra hoa, kết quả và cho hạt mới.", "stages": [{"key": "dau_hat", "name": "Hạt đậu", "fact": "Hạt đậu được gieo xuống đất ẩm."}, {"key": "dau_mam", "name": "Nảy mầm", "fact": "Có nước và hơi ấm, hạt nảy mầm: rễ mọc xuống, mầm nhú lên."}, {"key": "dau_cay_con", "name": "Cây con", "fact": "Cây con mọc lá xanh và cần ánh nắng để lớn."}, {"key": "dau_ra_hoa", "name": "Cây ra hoa", "fact": "Cây lớn dần và nở hoa."}, {"key": "dau_qua", "name": "Quả đậu", "fact": "Hoa kết thành quả đậu. Trong quả có hạt, gieo xuống lại mọc thành cây mới."}]}, {"id": "sunflower", "title": "Vòng đời hoa hướng dương", "emoji": "🌻", "tone": "amber", "intro": "Hạt hướng dương nhỏ xíu mọc thành bông hoa cao lớn, giữa hoa lại có thật nhiều hạt.", "stages": [{"key": "hd_hat", "name": "Hạt hướng dương", "fact": "Hạt hướng dương có vỏ sọc đen trắng."}, {"key": "hd_mam", "name": "Hạt nảy mầm", "fact": "Hạt nảy mầm, hai lá mầm nhú lên khỏi mặt đất."}, {"key": "hd_cay_non", "name": "Cây non", "fact": "Cây non mọc thêm lá và vươn cao về phía Mặt Trời."}, {"key": "hd_nu", "name": "Nụ hoa", "fact": "Trên ngọn cây xuất hiện một nụ hoa."}, {"key": "hd_hoa", "name": "Hoa nở", "fact": "Nụ nở thành bông hướng dương. Giữa hoa có rất nhiều hạt mới."}]}, {"id": "frog", "title": "Vòng đời con ếch", "emoji": "🐸", "tone": "purple", "intro": "Ếch sống dưới nước khi còn nhỏ, lớn lên mới lên được bờ.", "stages": [{"key": "ech_trung", "name": "Trứng ếch", "fact": "Ếch mẹ đẻ trứng thành từng đám dưới nước."}, {"key": "ech_nong_noc", "name": "Nòng nọc", "fact": "Trứng nở thành nòng nọc. Nòng nọc có đuôi dài và sống dưới nước."}, {"key": "ech_moc_chan", "name": "Nòng nọc mọc chân", "fact": "Nòng nọc lớn dần, mọc chân sau rồi mọc chân trước."}, {"key": "ech_con", "name": "Ếch con", "fact": "Đuôi ngắn dần. Ếch con bắt đầu nhảy lên bờ."}, {"key": "ech_lon", "name": "Ếch trưởng thành", "fact": "Ếch con lớn thành ếch trưởng thành. Ếch mẹ lại đẻ trứng dưới nước."}]}, {"id": "mosquito", "title": "Vòng đời con muỗi", "emoji": "🦟", "tone": "purple", "intro": "Muỗi lớn lên trong nước đọng. Đậy kín lu nước và đổ nước đọng là cách ngăn muỗi sinh sôi.", "stages": [{"key": "muoi_trung", "name": "Trứng trên mặt nước", "fact": "Muỗi mẹ đẻ trứng trên mặt nước đọng, như trong lu, chậu hay lốp xe cũ."}, {"key": "muoi_lang_quang", "name": "Lăng quăng", "fact": "Trứng nở thành lăng quăng, còn gọi là bọ gậy. Lăng quăng sống dưới nước và ngoi lên mặt nước để thở."}, {"key": "muoi_cung_quang", "name": "Cung quăng", "fact": "Lăng quăng lớn lên thành cung quăng. Cung quăng cuộn tròn như dấu phẩy và vẫn sống trong nước."}, {"key": "muoi_lon", "name": "Muỗi trưởng thành", "fact": "Muỗi chui ra, đứng trên mặt nước chờ khô cánh rồi bay đi. Muỗi mẹ lại tìm nước đọng để đẻ trứng."}]}, {"id": "ladybug", "title": "Vòng đời bọ rùa", "emoji": "🐞", "tone": "pink", "intro": "Bọ rùa là bạn của nhà nông vì ăn rệp hại cây. Bọ rùa cũng biến hình qua nhiều giai đoạn.", "stages": [{"key": "bua_trung", "name": "Trứng trên lá", "fact": "Bọ rùa mẹ đẻ những quả trứng nhỏ màu vàng thành từng chùm trên lá."}, {"key": "bua_au_trung", "name": "Ấu trùng", "fact": "Trứng nở thành ấu trùng có gai, trông như con cá sấu tí hon. Ấu trùng ăn rất nhiều rệp cây."}, {"key": "bua_nhong", "name": "Nhộng", "fact": "Ấu trùng bám chặt vào lá rồi hoá thành nhộng."}, {"key": "bua_lon", "name": "Bọ rùa trưởng thành", "fact": "Bọ rùa chui ra khỏi nhộng, lúc đầu màu nhạt rồi mới đỏ dần và có chấm đen. Bọ rùa mẹ lại đẻ trứng."}]}, {"id": "rice", "title": "Vòng đời cây lúa", "emoji": "🌾", "tone": "amber", "intro": "Từ một hạt thóc nhỏ, cây lúa lớn lên cho ta hạt gạo nấu cơm mỗi ngày.", "stages": [{"key": "lua_hat", "name": "Hạt thóc", "fact": "Người nông dân ngâm ủ hạt thóc cho nảy mầm rồi gieo xuống ruộng."}, {"key": "lua_ma", "name": "Cây mạ", "fact": "Hạt nảy mầm thành những cây mạ non xanh mướt."}, {"key": "lua_cay", "name": "Lúa lớn lên", "fact": "Cây mạ được cấy xuống ruộng nước. Cây lúa lớn lên và đẻ thêm nhiều nhánh."}, {"key": "lua_tro", "name": "Lúa trổ bông", "fact": "Lúa trổ bông và nở những bông hoa lúa nhỏ xíu."}, {"key": "lua_chin", "name": "Lúa chín", "fact": "Hạt lúa chín vàng. Người ta gặt lúa lấy thóc và giữ lại hạt giống cho vụ sau."}]}, {"id": "carp", "title": "Vòng đời cá chép", "emoji": "🐟", "tone": "teal", "intro": "Cá chép sống ở ao hồ. Cá con nở ra từ những quả trứng bé xíu dính trên cỏ nước.", "stages": [{"key": "ca_trung", "name": "Trứng cá", "fact": "Cá chép mẹ đẻ trứng dính vào cây cỏ dưới nước."}, {"key": "ca_bot", "name": "Cá bột", "fact": "Trứng nở thành cá bột nhỏ xíu. Bụng cá bột còn một túi thức ăn nhỏ gọi là túi noãn hoàng."}, {"key": "ca_con", "name": "Cá con", "fact": "Cá bột lớn dần thành cá con, có đủ vây và bơi rất giỏi."}, {"key": "ca_lon", "name": "Cá chép trưởng thành", "fact": "Cá con lớn lên thành cá chép trưởng thành. Cá mẹ lại đẻ trứng trên cỏ nước."}]}, {"id": "silkworm", "title": "Vòng đời con tằm", "emoji": "🐛", "tone": "pink", "intro": "Con tằm nhả tơ làm kén. Sợi tơ tằm được dùng để dệt nên tấm lụa mềm mại.", "stages": [{"key": "tam_trung", "name": "Trứng tằm", "fact": "Con ngài mẹ đẻ rất nhiều trứng nhỏ li ti."}, {"key": "tam_con", "name": "Con tằm", "fact": "Trứng nở ra con tằm. Tằm ăn lá dâu rất nhiều nên lớn rất nhanh."}, {"key": "tam_ken", "name": "Kén tằm", "fact": "Tằm nhả tơ quấn quanh mình thành cái kén. Người ta dùng sợi tơ này để dệt lụa."}, {"key": "tam_ngai", "name": "Con ngài", "fact": "Bên trong kén, tằm hoá nhộng rồi thành con ngài. Ngài chui ra khỏi kén và lại đẻ trứng."}]}, {"id": "dragonfly", "title": "Vòng đời chuồn chuồn", "emoji": "🪽", "tone": "teal", "intro": "Chuồn chuồn lúc nhỏ sống dưới nước, lớn lên mới bay lượn trên trời.", "stages": [{"key": "cc_trung", "name": "Trứng trong nước", "fact": "Chuồn chuồn mẹ đẻ trứng xuống nước hoặc vào cây cỏ ven ao."}, {"key": "cc_au_trung", "name": "Ấu trùng dưới nước", "fact": "Trứng nở thành ấu trùng sống dưới nước. Ấu trùng bắt các con vật nhỏ để ăn."}, {"key": "cc_len_bo", "name": "Ấu trùng bò lên cây", "fact": "Ấu trùng lớn dần, rồi bò lên một cành cây ven nước để lột xác."}, {"key": "cc_lon", "name": "Chuồn chuồn trưởng thành", "fact": "Chuồn chuồn chui ra, chờ cánh khô rồi bay đi. Chuồn chuồn không có giai đoạn nhộng."}]}, {"id": "cat", "title": "Vòng đời con mèo", "emoji": "🐱", "tone": "purple", "intro": "Mèo không đẻ trứng. Mèo mẹ đẻ ra mèo con và nuôi con bằng sữa.", "stages": [{"key": "meo_so_sinh", "name": "Mèo con mới sinh", "fact": "Mèo con mới sinh còn nhắm mắt, nằm cạnh mẹ và bú sữa mẹ."}, {"key": "meo_mo_mat", "name": "Mèo con mở mắt", "fact": "Khoảng 1 đến 2 tuần sau, mèo con mở mắt và bắt đầu tập đi."}, {"key": "meo_tap_choi", "name": "Mèo con tập chơi", "fact": "Mèo con thích chạy nhảy, vờn cuộn len và học cách bắt mồi."}, {"key": "meo_lon", "name": "Mèo trưởng thành", "fact": "Mèo con lớn lên thành mèo trưởng thành. Mèo mẹ lại đẻ ra những chú mèo con."}]}]);

  let activeContext = null;
  let current = null;
  let placed = [];
  let tray = [];
  let locked = [];
  let selectedSlot = null;
  let hintsUsed = 0;
  let wrongRounds = 0;
  let busy = false;
  let solved = false;
  let message = "";
  let timers = [];
  let lastStars = 0;
  /* Chế độ chơi: order = xếp vòng đời, odd = tìm thẻ lạ, before = cái gì đến trước, compare = so sánh vòng đời */
  let mode = "order";
  const ODD = 99;
  let odd = null;
  let qz = null;
  const MODES = [
    { id: "order", icon: "🔄", label: "Xếp vòng đời", desc: "Xếp các thẻ theo đúng thứ tự." },
    { id: "odd", icon: "🕵️", label: "Tìm thẻ lạ", desc: "Có 1 thẻ không thuộc vòng đời này. Đừng xếp nhầm nhé!" },
    { id: "before", icon: "⏱️", label: "Cái gì đến trước?", desc: "Chọn hình xảy ra trước trong vòng đời." },
    { id: "compare", icon: "⚖️", label: "So sánh vòng đời", desc: "Hai vòng đời giống và khác nhau thế nào?" }
  ];
  const modeOf = (id) => MODES.find((m) => m.id === id) || MODES[0];
  const cardOf = (s) => (s === ODD ? odd.stage : current.stages[s]);
  const starKey = (c) => (mode === "odd" ? `odd:${c.id}` : c.id);

  const esc = (value) => String(value == null ? "" : value)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;").replace(/'/g, "&#39;");

  const stars = (() => { try { return JSON.parse(window.localStorage.getItem(STARS_KEY) || "{}") || {}; } catch (_) { return {}; } })();
  function saveStars(id, n) {
    stars[id] = Math.max(stars[id] || 0, n);
    try { window.localStorage.setItem(STARS_KEY, JSON.stringify(stars)); } catch (_) {}
  }

  /* ---------- giọng đọc Google TTS, tiếng Việt ---------- */
  const ttsAudio = new Audio();
  ttsAudio.referrerPolicy = "no-referrer";
  ttsAudio.preload = "none";
  let ttsNonce = 0;
  let ttsQueue = [];

  function ttsUrl(text) {
    return `https://translate.google.com/translate_tts?ie=UTF-8&tl=vi&client=tw-ob&q=${encodeURIComponent(String(text || ""))}`;
  }

  function splitTtsText(text, maxLength = 170) {
    const clean = String(text || "").replace(/\s+/g, " ").trim();
    if (!clean) return [];
    const sentences = clean.match(/[^.!?;,:]+[.!?;,:]?/g) || [clean];
    const out = [];
    let current = "";
    sentences.forEach((piece) => {
      const part = piece.trim();
      if (!part) return;
      if (!current) { current = part; return; }
      if ((current + " " + part).length <= maxLength) {
        current += " " + part;
      } else {
        out.push(current);
        current = part;
      }
    });
    if (current) out.push(current);
    return out.flatMap((chunk) => {
      if (chunk.length <= maxLength) return [chunk];
      const words = chunk.split(" ");
      const parts = [];
      let buf = "";
      words.forEach((word) => {
        if (!buf || (buf + " " + word).length <= maxLength) buf = buf ? buf + " " + word : word;
        else { parts.push(buf); buf = word; }
      });
      if (buf) parts.push(buf);
      return parts;
    });
  }

  /* Ưu tiên giọng tiếng Việt có sẵn trong máy (Web Speech API, chạy cả khi mất mạng).
     Máy nào không có giọng Việt thì dùng Google TTS như cũ. */
  const synth = typeof window !== "undefined" && "speechSynthesis" in window ? window.speechSynthesis : null;
  if (synth) { try { synth.getVoices(); } catch (_) {} }
  function viVoice() {
    if (!synth) return null;
    try { return synth.getVoices().find((v) => /^vi([-_]|$)/i.test(v.lang)) || null; } catch (_) { return null; }
  }

  function stopSpeak() {
    ttsNonce += 1;
    ttsQueue = [];
    try { if (synth) synth.cancel(); } catch (_) {}
    try {
      ttsAudio.pause();
      ttsAudio.removeAttribute("src");
      ttsAudio.load();
    } catch (_) {}
  }

  function playNextTts(nonce, quiet) {
    if (nonce !== ttsNonce || !ttsQueue.length) return;
    const chunk = ttsQueue.shift();
    const voice = viVoice();
    if (voice) {
      try {
        const u = new SpeechSynthesisUtterance(chunk);
        u.voice = voice; u.lang = voice.lang; u.rate = 0.9; u.pitch = 1.08;
        u.onend = () => playNextTts(nonce, true);
        u.onerror = (e) => { if (nonce === ttsNonce && !quiet && e.error !== "interrupted" && e.error !== "canceled") showVoiceNote(); };
        synth.speak(u);
        return;
      } catch (_) { /* dùng Google TTS bên dưới */ }
    }
    try {
      ttsAudio.src = ttsUrl(chunk);
      ttsAudio.playbackRate = 0.96;
      const result = ttsAudio.play();
      if (result && typeof result.catch === "function") {
        result.catch(() => { if (nonce === ttsNonce && !quiet) showVoiceNote(); });
      }
    } catch (_) {
      if (!quiet) showVoiceNote();
    }
  }

  ttsAudio.addEventListener("ended", () => {
    const nonce = ttsNonce;
    if (ttsQueue.length) playNextTts(nonce, true);
  });

  function speak(text, quiet) {
    const chunks = splitTtsText(text);
    if (!chunks.length) return false;
    stopSpeak();
    const nonce = ++ttsNonce;
    ttsQueue = chunks.slice();
    playNextTts(nonce, quiet);
    return true;
  }

  function showVoiceNote() {
    const n = activeContext && activeContext.host && activeContext.host.querySelector("#ee-life-voice-note");
    if (n) {
      n.hidden = false;
      n.textContent = "Chưa phát được giọng đọc. Con thử bấm lại hoặc kiểm tra kết nối mạng nhé.";
    }
  }

  function clearTimers() { timers.forEach((t) => clearTimeout(t)); timers = []; }

  function art(key, cls = "ee-life-art") {
    return `<svg class="${cls}" viewBox="0 0 200 200" aria-hidden="true"><rect width="200" height="200" fill="#fff"/><g stroke="${INK}" stroke-width="4" stroke-linejoin="round" stroke-linecap="round">${ART[key] || ""}</g></svg>`;
  }

  function setBanner(items) {
    const hook = activeContext && activeContext.hooks && activeContext.hooks.setSubBanner;
    if (typeof hook === "function") hook({ items });
  }

  function shuffle(list) {
    const a = list.slice();
    for (let i = a.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    if (a.length > 1 && a.every((v, i) => v === i)) return shuffle(list);
    return a;
  }

  function difficulty(c) { return c.stages.length <= 4 ? "Dễ" : "Vừa"; }

  function ensureStyles() {
    if (!document.getElementById("class1-game-explorer-font")) {
      const link = document.createElement("link");
      link.id = "class1-game-explorer-font";
      link.rel = "stylesheet";
      link.href = "https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;600;700;800&display=swap&subset=vietnamese";
      document.head.appendChild(link);
    }
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      .ee-life{padding:.2rem .15rem .8rem;color:#344054;font-family:"Baloo 2","Nunito","Segoe UI",system-ui,sans-serif}
      .ee-life-hero{display:grid;grid-template-columns:1.2fr .8fr;gap:.8rem;border:2px solid #E9D5FF;border-radius:22px;background:linear-gradient(135deg,#FFF1F7,#F5F3FF,#EFF8FF);padding:1rem;margin:.2rem 0 .9rem}
      .ee-life-hero h2{margin:0 0 .3rem;color:#5B216E;font-size:28px;font-weight:800}.ee-life-hero p{margin:0;color:#475467;font-size:18px;font-weight:600;line-height:1.5}
      .ee-life-bunny{display:flex;align-items:center;gap:.7rem;border:1px solid #fbcfe8;border-radius:16px;background:#fff7fb;padding:.8rem}.ee-life-bunny .icon{font-size:36px}.ee-life-bunny strong{display:block;color:#BE185D;font-size:18px}.ee-life-bunny span{display:block;font-size:16px;font-weight:600;line-height:1.45}
      .ee-life-grid{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:.6rem}
      .ee-life-card{display:flex;flex-direction:column;justify-content:flex-start;min-width:0;border:1px solid #e5e7eb;border-radius:18px;padding:.6rem;background:#fff;cursor:pointer;text-align:left;font:inherit;box-shadow:0 8px 18px rgba(15,23,42,.05);transition:transform .16s,box-shadow .16s}
      .ee-life-card:hover{transform:translateY(-2px);box-shadow:0 10px 22px rgba(15,23,42,.09)}
      .ee-life-card[data-tone="pink"]{background:#fff1f7;border-color:#fbcfe8}.ee-life-card[data-tone="teal"]{background:#ecfdf5;border-color:#99f6e4}.ee-life-card[data-tone="amber"]{background:#fffbeb;border-color:#fde68a}.ee-life-card[data-tone="purple"]{background:#f5f3ff;border-color:#ddd6fe}
      .ee-life-card .ee-life-art{display:block;width:100%;aspect-ratio:16/9;border-radius:12px;border:1px solid rgba(148,163,184,.25);background:#fff}
      .ee-life-strip{display:flex;gap:3px;margin-top:.4rem}.ee-life-strip svg{flex:1;min-width:0;aspect-ratio:1/1;border-radius:6px;border:1px solid #e2e8f0}
      .ee-life-card h3{margin:.4rem 0 .25rem;color:#5B216E;font-size:17px;font-weight:800;line-height:1.25;min-height:2.5em}
      @media(max-width:1200px){.ee-life-grid{grid-template-columns:repeat(4,minmax(0,1fr))}}
      .ee-life-meta{display:flex;gap:.25rem;flex-wrap:wrap;align-items:center;margin-top:auto}.ee-life-chip{border:2px solid #E9D5FF;background:#fff;border-radius:999px;padding:0 .45rem;color:#6D28D9;font-size:13px;font-weight:700;white-space:nowrap}
      .ee-life-stars{color:#f59e0b;font-size:18px;letter-spacing:1px}.ee-life-stars .off{color:#e2e8f0}
      .ee-life-btn{min-height:52px;border-radius:16px;border:2px solid #6EE7B7;background:linear-gradient(90deg,#ECFDF5,#E0F2FE);color:#047857;padding:.5rem 1rem;font:inherit;font-weight:700;font-size:18px;cursor:pointer;white-space:nowrap}
      .ee-life-btn.primary{border:none;color:#fff;background:linear-gradient(90deg,#EC4899,#8B5CF6);box-shadow:0 8px 16px rgba(139,92,246,.22)}
      .ee-life-btn.pink{border-color:#F9A8D4;color:#BE185D;background:#FFF1F7}
      .ee-life-btn:disabled{opacity:.45;cursor:not-allowed}
      .ee-life-btn:focus-visible,.ee-life-card:focus-visible,.ee-life-slot:focus-visible,.ee-life-tcard:focus-visible{outline:3px solid #f472b6;outline-offset:2px}
      .ee-life-ask{display:flex;align-items:center;justify-content:space-between;gap:.6rem;flex-wrap:wrap;border:2px solid #E9D5FF;border-radius:18px;background:linear-gradient(135deg,#FFF1F7,#F5F3FF);padding:.75rem .9rem;margin-bottom:.8rem}
      .ee-life-ask p{margin:0;color:#5B216E;font-size:20px;font-weight:700;line-height:1.45;flex:1;min-width:240px}
      .ee-life-play{display:grid;grid-template-columns:minmax(0,1.05fr) minmax(0,.95fr);gap:.9rem;align-items:start}
      .ee-life-ringbox{border:2px solid #E9D5FF;border-radius:22px;background:#fff;padding:.6rem}
      .ee-life-ring{position:relative;width:100%;aspect-ratio:1/1;max-width:560px;margin:0 auto}
      .ee-life-ring > svg.arrows{position:absolute;inset:0;width:100%;height:100%;pointer-events:none}
      .ee-life-ring .arrows path{fill:none;stroke:#C4B5FD;stroke-width:1.6;stroke-linecap:round}
      .ee-life-ring.solved .arrows path{stroke:#EC4899;stroke-dasharray:3 2.2;animation:eeLifeFlow 1.2s linear infinite}
      @keyframes eeLifeFlow{to{stroke-dashoffset:-10.4}}
      .ee-life-center{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:30%;text-align:center;color:#5B216E;font-weight:800;font-size:clamp(14px,1.9vw,19px);line-height:1.25}
      .ee-life-center .em{display:block;font-size:clamp(26px,5vw,44px)}
      .ee-life-slot{position:absolute;transform:translate(-50%,-50%);border-radius:18px;border:3px dashed #C4B5FD;background:#FAF5FF;padding:0;cursor:pointer;font:inherit;display:flex;flex-direction:column;align-items:stretch;overflow:hidden;transition:transform .15s,border-color .15s,box-shadow .15s}
      .ee-life-slot .num{position:absolute;left:6px;top:6px;z-index:2;width:30px;height:30px;border-radius:50%;background:linear-gradient(135deg,#EC4899,#8B5CF6);color:#fff;font-size:17px;font-weight:1000;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 0 rgba(0,0,0,.08)}
      .ee-life-slot .empty{flex:1;display:flex;align-items:center;justify-content:center;color:#C4B5FD;font-size:clamp(26px,5vw,46px);font-weight:800}
      .ee-life-slot .start{position:absolute;right:6px;top:7px;z-index:2;background:#fef3c7;color:#92400e;border:1px solid #fcd34d;border-radius:999px;padding:0 .5rem;font-size:13px;font-weight:700;white-space:nowrap}
      .ee-life-slot.filled{border-style:solid;border-color:#cbd5e1;background:#fff}
      .ee-life-slot.selected{border-color:#ec4899;box-shadow:0 0 0 4px #fce7f3}
      .ee-life-slot.ok{border-color:#10b981;box-shadow:0 0 0 4px #d1fae5}
      .ee-life-slot.bad{border-color:#ef4444;box-shadow:0 0 0 4px #fee2e2;animation:eeLifeShake .45s}
      @keyframes eeLifeShake{0%,100%{transform:translate(-50%,-50%)}25%{transform:translate(calc(-50% - 6px),-50%)}75%{transform:translate(calc(-50% + 6px),-50%)}}
      .ee-life-slot .ee-life-art{display:block;width:100%;flex:1;min-height:0}
      .ee-life-slot .name{background:#f8fafc;border-top:1px solid #e2e8f0;color:#5B216E;font-size:clamp(13px,1.6vw,17px);font-weight:700;padding:.15rem .25rem;line-height:1.2;text-align:center}
      .ee-life-side{display:grid;gap:.7rem}
      .ee-life-panel{border:2px solid #E9D5FF;border-radius:20px;background:#fff;padding:.8rem}
      .ee-life-panel h3{margin:0 0 .55rem;color:#5B216E;font-size:21px;font-weight:800}
      .ee-life-tray{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:.55rem}
      .ee-life-tcard{border:2px solid #e2e8f0;border-radius:16px;background:#fff;padding:0;cursor:pointer;font:inherit;overflow:hidden;display:flex;flex-direction:column;transition:transform .12s,border-color .12s}
      .ee-life-tcard:hover{transform:translateY(-2px);border-color:#C4B5FD}
      .ee-life-tcard .ee-life-art{display:block;width:100%;aspect-ratio:1/1}
      .ee-life-tcard .name{border-top:1px solid #E9D5FF;background:#FAF5FF;color:#5B216E;font-size:17px;font-weight:700;padding:.3rem .25rem;text-align:center;line-height:1.25}
      .ee-life-tray-empty{grid-column:1/-1;color:#667085;font-size:17px;font-weight:700;text-align:center;padding:.7rem}
      .ee-life-actions{display:grid;grid-template-columns:1fr 1fr;gap:.5rem}
      .ee-life-actions .wide{grid-column:1/-1}
      .ee-life-msg{display:flex;gap:.55rem;align-items:flex-start;border:2px solid #F9A8D4;border-radius:16px;background:#FFF1F7;padding:.7rem .8rem;color:#BE185D;font-size:18px;font-weight:700;line-height:1.45}
      .ee-life-msg .icon{font-size:24px;line-height:1}
      .ee-life-voice-note{margin:.2rem 0 .6rem;padding:.4rem .7rem;border-radius:12px;background:#FFF7ED;color:#C2410C;font-size:16px;font-weight:600}
      .ee-life-win{text-align:center}
      .ee-life-win h3{font-size:26px;color:#BE185D;margin:.2rem 0}
      .ee-life-win .big-stars{font-size:40px;color:#f59e0b;letter-spacing:4px}.ee-life-win .big-stars .off{color:#e2e8f0}
      .ee-life-learn{display:grid;gap:.5rem}
      .ee-life-learn-item{display:grid;grid-template-columns:72px 1fr auto;gap:.6rem;align-items:center;border:2px solid #F3E8FF;border-radius:14px;padding:.4rem .5rem;background:#fff}
      .ee-life-learn-item .ee-life-art{width:72px;height:72px;border-radius:10px;border:1px solid #E9D5FF}
      .ee-life-learn-item strong{display:block;color:#5B216E;font-size:19px;font-weight:800}
      .ee-life-learn-item span{display:block;color:#475467;font-size:16.5px;font-weight:600;line-height:1.45}
      .ee-life-mini{min-width:48px;min-height:48px;border-radius:12px;border:2px solid #F9A8D4;background:#FFF1F7;cursor:pointer;font-size:20px}
      .ee-life-modes{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:.6rem;margin:0 0 .9rem}
      .ee-life-mode{display:flex;flex-direction:column;align-items:flex-start;gap:.1rem;text-align:left;border:2px solid #E9D5FF;border-radius:18px;background:#fff;padding:.6rem .8rem;cursor:pointer;font:inherit;color:#5B216E}
      .ee-life-mode .ic{font-size:26px;line-height:1.1}
      .ee-life-mode strong{font-size:19px;font-weight:800}
      .ee-life-mode small{font-size:14.5px;font-weight:600;color:#667085;line-height:1.3}
      .ee-life-mode:hover{border-color:#C4B5FD}
      .ee-life-mode.on{border-color:transparent;background:linear-gradient(135deg,#EC4899,#8B5CF6);color:#fff}
      .ee-life-mode.on small{color:#FCE7F3}
      .ee-life-mode:focus-visible,.ee-life-opt:focus-visible{outline:3px solid #f472b6;outline-offset:2px}
      .ee-life-qstart{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.2fr);gap:1rem;align-items:center;padding:1.2rem}
      .ee-life-qstart h3{font-size:26px}
      .ee-life-qstart p{margin:0;font-size:18px;font-weight:600;line-height:1.5;color:#475467}
      .ee-life-sample{display:flex;align-items:center;gap:.6rem;justify-content:center}
      .ee-life-sample .ee-life-art{width:42%;aspect-ratio:1/1;border-radius:16px;border:2px solid #E9D5FF}
      .ee-life-sample span{font-size:20px;font-weight:800;color:#8B5CF6}
      .ee-life-dots{display:flex;gap:6px;flex-wrap:wrap;margin:0 0 .7rem}
      .ee-life-dot{width:22px;height:22px;border-radius:50%;background:#EDE9FE;border:2px solid transparent}
      .ee-life-dot.now{background:#fff;border-color:#EC4899}.ee-life-dot.ok{background:#10b981}.ee-life-dot.bad{background:#FDA4AF}
      .ee-life-quiz{display:grid;gap:.8rem;max-width:720px}
      .ee-life-opts{display:grid;grid-template-columns:1fr 1fr;gap:1rem}
      .ee-life-opt{border:3px solid #E9D5FF;border-radius:20px;background:#fff;padding:0;cursor:pointer;font:inherit;overflow:hidden;display:flex;flex-direction:column;transition:transform .12s,border-color .12s}
      .ee-life-opt:hover:not(:disabled){transform:translateY(-3px);border-color:#C4B5FD}
      .ee-life-opt .ee-life-art{display:block;width:100%;aspect-ratio:16/10}
      .ee-life-opt .name{border-top:2px solid #E9D5FF;background:#FAF5FF;color:#5B216E;font-size:21px;font-weight:800;padding:.4rem;text-align:center}
      .ee-life-opt.ok{border-color:#10b981;box-shadow:0 0 0 4px #d1fae5}
      .ee-life-opt.bad{border-color:#ef4444;box-shadow:0 0 0 4px #fee2e2}
      .ee-life-opt.dim{opacity:.55}
      .ee-life-opt:disabled{cursor:default}
      .ee-life-msg.good{border-color:#6EE7B7;background:#ECFDF5;color:#047857}
      .ee-life-oddwin{display:grid;grid-template-columns:84px 1fr;gap:.7rem;align-items:center;background:#FFF7ED;border-color:#FDBA74}
      .ee-life-oddwin .ee-life-art{width:84px;height:84px;border-radius:12px;border:1px solid #FDBA74}
      .ee-life-oddwin strong{display:block;color:#C2410C;font-size:19px}
      .ee-life-oddwin span{display:block;color:#475467;font-size:16.5px;font-weight:600;line-height:1.4}
      @media(max-width:900px){.ee-life-modes{grid-template-columns:1fr 1fr}.ee-life-qstart{grid-template-columns:1fr}}
      @media(max-width:620px){.ee-life-opt .name{font-size:17px}.ee-life-mode small{display:none}}
      @media(max-width:1000px){.ee-life-grid{grid-template-columns:repeat(3,minmax(0,1fr))}}
      @media(max-width:900px){.ee-life-play{grid-template-columns:1fr}.ee-life-hero{grid-template-columns:1fr}}
      @media(max-width:620px){.ee-life-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.ee-life-tray{grid-template-columns:repeat(2,minmax(0,1fr))}.ee-life-learn-item{grid-template-columns:52px 1fr auto}.ee-life-learn-item .ee-life-art{width:52px;height:52px}}
      @media (prefers-reduced-motion: reduce){.ee-life-ring.solved .arrows path,.ee-life-slot.bad{animation:none}}
    `;
    document.head.appendChild(style);
  }

  function starHtml(n, cls = "ee-life-stars") {
    return `<span class="${cls}" aria-label="${n} sao">${[1, 2, 3].map((i) => `<span class="${i <= n ? "" : "off"}">★</span>`).join("")}</span>`;
  }

  /* ---------- danh sách ---------- */
  function renderRegistry() {
    clearTimers(); stopSpeak();
    current = null;
    setBanner([{ level: 2, title: `${GAME_NUMBER}. ${GAME_TITLE}`, action: null }]);
    const host = activeContext && activeContext.host;
    if (!host) return;
    host.innerHTML = `
      <div class="ee-life">
        <div class="section-heading">
          <div><h1>🌱 ${GAME_TITLE}</h1><p>${CYCLES.length} vòng đời • xếp các giai đoạn theo đúng thứ tự.</p></div>
          <button id="ee-life-back-games" class="back-btn" type="button">← Games</button>
        </div>
        <div class="ee-life-hero">
          <div><h2>Con vật và cây cối lớn lên thế nào?</h2><p>Mỗi vòng đời có nhiều giai đoạn nối tiếp nhau rồi lại quay về điểm bắt đầu. Bé chạm vào các thẻ để xếp chúng vào vòng tròn theo đúng thứ tự nhé!</p></div>
          <div class="ee-life-bunny"><span class="icon" aria-hidden="true">🐰</span><div><strong>Cô Thỏ Hồng mách bé</strong><span>Bắt đầu từ thứ nhỏ nhất, như quả trứng hay hạt giống, rồi nghĩ xem nó sẽ lớn lên thành gì.</span></div></div>
        </div>
        <div class="ee-life-modes" role="tablist" aria-label="Chọn cách chơi">
          ${MODES.map((m) => `<button type="button" role="tab" class="ee-life-mode${m.id === mode ? " on" : ""}" data-mode="${m.id}" aria-selected="${m.id === mode}"><span class="ic" aria-hidden="true">${m.icon}</span><strong>${m.label}</strong><small>${m.desc}</small></button>`).join("")}
        </div>
        ${mode === "before" || mode === "compare" ? quizStartHtml() : `<div class="ee-life-grid">
          ${CYCLES.filter((c) => mode !== "odd" || c.id !== "water").map((c) => `<button class="ee-life-card" data-tone="${esc(c.tone)}" data-cycle="${esc(c.id)}" type="button">
              ${art(c.stages[c.stages.length - 1].key)}
              <h3>${CYCLES.indexOf(c) + 1}. ${esc(c.emoji)} ${esc(c.title)}</h3>
              <div class="ee-life-meta"><span class="ee-life-chip">${c.stages.length} giai đoạn</span><span class="ee-life-chip">${difficulty(c)}</span>${starHtml(stars[mode === "odd" ? `odd:${c.id}` : c.id] || 0)}</div>
            </button>`).join("")}
        </div>`}
      </div>`;
    host.querySelectorAll("[data-mode]").forEach((b) => b.addEventListener("click", () => { mode = b.dataset.mode; renderRegistry(); }));
    host.querySelector("#ee-life-quiz-start")?.addEventListener("click", startQuiz);
    host.querySelector("#ee-life-back-games")?.addEventListener("click", () => activeContext && activeContext.back && activeContext.back());
    host.querySelectorAll("[data-cycle]").forEach((b) => b.addEventListener("click", () => {
      const c = CYCLES.find((x) => x.id === b.dataset.cycle);
      if (c) startCycle(c);
    }));
  }

  /* ---------- màn chơi ---------- */
  function startCycle(c) {
    clearTimers(); stopSpeak();
    if (mode !== "order" && mode !== "odd") mode = "order";
    current = c;
    const n = c.stages.length;
    placed = Array(n).fill(null);
    locked = Array(n).fill(false);
    odd = null;
    if (mode === "odd") {
      /* Thẻ lạ lấy từ một vòng đời sinh vật khác */
      /* Không chọn thẻ trùng tên với một giai đoạn của vòng đời đang chơi (ví dụ hai thẻ cùng tên "Nhộng") */
      const names = new Set(c.stages.map((st) => st.name));
      const pool = [];
      CYCLES.filter((x) => x.id !== c.id && x.id !== "water").forEach((x) => x.stages.forEach((st) => { if (!names.has(st.name)) pool.push({ cycle: x, stage: st }); }));
      odd = pool[Math.floor(Math.random() * pool.length)];
      tray = shuffle([...Array(n).keys(), ODD]);
      message = `Trong ${n + 1} thẻ có 1 thẻ lạ không thuộc ${c.title.toLowerCase()}. Bé xếp ${n} thẻ đúng vào vòng tròn và để thẻ lạ ở ngoài nhé!`;
    } else {
      tray = shuffle([...Array(n).keys()]);
      message = `Bé chạm vào một thẻ, thẻ sẽ bay vào ô trống đầu tiên. Muốn đặt vào ô khác thì chạm vào ô đó trước.`;
    }
    selectedSlot = null; hintsUsed = 0; wrongRounds = 0; busy = false; solved = false;
    renderPlay();
  }

  function askText(c) {
    if (mode === "odd") return `${c.title}. ${c.intro} Có một thẻ lạ lẫn vào. Bé hãy xếp ${c.stages.length} thẻ đúng theo thứ tự và để thẻ lạ ở ngoài nhé.`;
    return `${c.title}. ${c.intro} Bé hãy xếp ${c.stages.length} thẻ theo đúng thứ tự, bắt đầu từ ô số 1.`;
  }

  function ringHtml(c) {
    const n = c.stages.length;
    const R = 36;
    const size = n <= 4 ? 31 : 27;
    const angle = (i) => -90 + (360 / n) * i;
    const pos = (a) => [50 + R * Math.cos(a * Math.PI / 180), 50 + R * Math.sin(a * Math.PI / 180)];
    const gap = (Math.asin(Math.min(0.99, (size * 0.62) / R)) * 180) / Math.PI + 2;
    const arcs = [...Array(n).keys()].map((i) => {
      const a1 = angle(i) + gap, a2 = angle(i + 1) - gap;
      const [x1, y1] = pos(a1), [x2, y2] = pos(a2);
      const [hx, hy] = pos(a2);
      const t = (a2 * Math.PI) / 180;
      const tx = -Math.sin(t), ty = Math.cos(t);
      const nx = Math.cos(t), ny = Math.sin(t);
      const head = `M${(hx - tx * 3.2 + nx * 2.2).toFixed(2)} ${(hy - ty * 3.2 + ny * 2.2).toFixed(2)} L${hx.toFixed(2)} ${hy.toFixed(2)} L${(hx - tx * 3.2 - nx * 2.2).toFixed(2)} ${(hy - ty * 3.2 - ny * 2.2).toFixed(2)}`;
      return `<path d="M${x1.toFixed(2)} ${y1.toFixed(2)} A${R} ${R} 0 0 1 ${x2.toFixed(2)} ${y2.toFixed(2)}"/><path d="${head}"/>`;
    }).join("");
    const slots = [...Array(n).keys()].map((i) => {
      const [x, y] = pos(angle(i));
      const s = placed[i];
      const cls = ["ee-life-slot", s != null ? "filled" : "", selectedSlot === i ? "selected" : "", locked[i] ? "ok" : ""].join(" ");
      const inner = s != null
        ? `${art(cardOf(s).key)}<span class="name">${esc(cardOf(s).name)}</span>`
        : `<span class="empty">${i + 1}</span>`;
      const label = s != null ? `Ô ${i + 1}: ${cardOf(s).name}${locked[i] ? ", đúng rồi" : ". Chạm để lấy thẻ ra"}` : `Ô ${i + 1} đang trống. Chạm để chọn ô này`;
      return `<button type="button" class="${cls}" data-slot="${i}" style="left:${x.toFixed(2)}%;top:${y.toFixed(2)}%;width:${size}%;height:${size}%" aria-label="${esc(label)}"><span class="num">${i + 1}</span>${inner}${i === 0 ? `<span class="start">Bắt đầu</span>` : ""}</button>`;
    }).join("");
    return `<div class="ee-life-ring${solved ? " solved" : ""}">
      <svg class="arrows" viewBox="0 0 100 100" aria-hidden="true">${arcs}</svg>
      <div class="ee-life-center"><span class="em">${esc(c.emoji)}</span>${solved ? "Vòng đời<br>lại bắt đầu!" : "Vòng đời"}</div>
      ${slots}</div>`;
  }

  function sidePlayHtml(c) {
    const allFilled = placed.every((v) => v != null);
    return `
      <div class="ee-life-msg"><span class="icon" aria-hidden="true">🐰</span><div>${esc(message)}</div></div>
      <section class="ee-life-panel">
        <h3>${mode === "odd" ? "🕵️ Các thẻ (có 1 thẻ lạ)" : "🃏 Các thẻ cần xếp"}</h3>
        <div class="ee-life-tray">${tray.length ? tray.map((s) => `<button type="button" class="ee-life-tcard" data-card="${s}" aria-label="Thẻ ${esc(cardOf(s).name)}">${art(cardOf(s).key)}<span class="name">${esc(cardOf(s).name)}</span></button>`).join("") : `<div class="ee-life-tray-empty">Đã xếp hết thẻ. Bé bấm “Kiểm tra” nhé!</div>`}</div>
      </section>
      <div class="ee-life-actions">
        <button id="ee-life-check" class="ee-life-btn primary wide" type="button" ${allFilled && !busy ? "" : "disabled"}>✅ Kiểm tra</button>
        <button id="ee-life-hint" class="ee-life-btn" type="button" ${busy ? "disabled" : ""}>💡 Gợi ý</button>
        <button id="ee-life-reset" class="ee-life-btn" type="button" ${busy ? "disabled" : ""}>🔄 Xếp lại</button>
      </div>`;
  }

  function sideWinHtml(c, n) {
    const list = mode === "odd" ? CYCLES.filter((x) => x.id !== "water") : CYCLES;
    const next = list[list.indexOf(c) + 1];
    return `
      <section class="ee-life-panel ee-life-win">
        <div style="font-size:42px" aria-hidden="true">🎉🐰</div>
        <h3>Đúng rồi! Bé giỏi quá!</h3>
        <div class="big-stars">${[1, 2, 3].map((i) => `<span class="${i <= n ? "" : "off"}">★</span>`).join("")}</div>
        <p style="margin:.4rem 0 0;font-weight:700;color:#475467;font-size:17px">${n === 3 ? "Xếp đúng ngay lần đầu, không cần gợi ý!" : "Lần sau thử xếp mà không cần gợi ý để được 3 sao nhé."}</p>
      </section>
      ${odd ? `<section class="ee-life-panel ee-life-oddwin">${art(odd.stage.key)}<div><strong>🕵️ Thẻ lạ là “${esc(odd.stage.name)}”</strong><span>Thẻ này thuộc ${esc(odd.cycle.title.toLowerCase())} ${esc(odd.cycle.emoji)}, không phải ${esc(c.title.toLowerCase())}.</span></div></section>` : ""}
      <section class="ee-life-panel">
        <h3>📖 Tìm hiểu ${esc(c.title.toLowerCase())}</h3>
        <div class="ee-life-learn">${c.stages.map((s, i) => `<div class="ee-life-learn-item">${art(s.key)}<div><strong>${i + 1}. ${esc(s.name)}</strong><span>${esc(s.fact)}</span></div><button type="button" class="ee-life-mini" data-say="${i}" aria-label="Nghe giai đoạn ${i + 1}">🔊</button></div>`).join("")}</div>
      </section>
      <div class="ee-life-actions">
        <button id="ee-life-say-all" class="ee-life-btn pink wide" type="button">🔊 Nghe Cô Thỏ kể cả vòng đời</button>
        ${next ? `<button id="ee-life-next" class="ee-life-btn primary wide" type="button">Vòng đời tiếp theo: ${esc(next.title)} →</button>` : ""}
        <button id="ee-life-again" class="ee-life-btn" type="button">🔄 Chơi lại</button>
        <button id="ee-life-list" class="ee-life-btn" type="button">📚 Chọn vòng đời khác</button>
      </div>`;
  }

  function renderPlay() {
    const host = activeContext && activeContext.host;
    const c = current;
    if (!host || !c) return;
    const idx = CYCLES.indexOf(c) + 1;
    setBanner([
      { level: 2, title: `${GAME_NUMBER}. ${GAME_TITLE}`, action: () => renderRegistry() },
      { level: 3, title: `${GAME_NUMBER}.${idx} ${c.title}${mode === "odd" ? " (Tìm thẻ lạ)" : ""}`, action: null }
    ]);
    const n = solved ? lastStars : 0;
    host.innerHTML = `
      <div class="ee-life">
        <div class="section-heading">
          <div><h1>${esc(c.emoji)} ${esc(c.title)}</h1><p>${mode === "odd" ? "🕵️ Tìm thẻ lạ • " : ""}${c.stages.length} giai đoạn • ${difficulty(c)}</p></div>
          <button id="ee-life-back" class="back-btn" type="button">← ${CYCLES.length} vòng đời</button>
        </div>
        <div class="ee-life-ask">
          <p>${esc(c.intro)} ${mode === "odd" ? "Có 1 thẻ lạ lẫn vào, bé đừng xếp nhầm nhé!" : "Bé hãy xếp các thẻ theo đúng thứ tự, bắt đầu từ ô số 1."}</p>
          <button id="ee-life-say-ask" class="ee-life-btn pink" type="button">🔊 Nghe cô đọc</button>
        </div>
        <p id="ee-life-voice-note" class="ee-life-voice-note" hidden></p>
        <div class="ee-life-play">
          <div class="ee-life-ringbox">${ringHtml(c)}</div>
          <div class="ee-life-side">${solved ? sideWinHtml(c, n) : sidePlayHtml(c)}</div>
        </div>
      </div>`;
    bindPlay(host, c);
  }

  function firstEmpty() { return placed.findIndex((v) => v == null); }

  function placeCard(stageIdx) {
    if (busy || solved) return;
    let slot = selectedSlot != null && placed[selectedSlot] == null ? selectedSlot : firstEmpty();
    if (slot < 0) return;
    placed[slot] = stageIdx;
    tray = tray.filter((s) => s !== stageIdx);
    selectedSlot = null;
    message = firstEmpty() >= 0 ? `Đã đặt “${cardOf(stageIdx).name}” vào ô ${slot + 1}.` : "Xếp đủ rồi! Bé bấm “Kiểm tra” xem đúng chưa nhé.";
    renderPlay();
  }

  function tapSlot(i) {
    if (busy || solved || locked[i]) return;
    if (placed[i] != null) {
      tray.push(placed[i]);
      message = `Đã lấy “${cardOf(placed[i]).name}” ra khỏi ô ${i + 1}.`;
      placed[i] = null;
      selectedSlot = null;
    } else {
      selectedSlot = selectedSlot === i ? null : i;
      message = selectedSlot === i ? `Đã chọn ô ${i + 1}. Bé chạm vào thẻ muốn đặt vào ô này.` : "Bé chạm vào một thẻ để xếp vào vòng tròn.";
    }
    renderPlay();
  }

  function giveHint() {
    if (busy || solved) return;
    const c = current;
    const i = placed.findIndex((v, k) => v !== k);
    if (i < 0) return;
    hintsUsed += 1;
    if (placed[i] != null) tray.push(placed[i]);
    const from = placed.indexOf(i);
    if (from >= 0) placed[from] = null;
    tray = tray.filter((s) => s !== i);
    placed[i] = i;
    locked[i] = true;
    selectedSlot = null;
    message = `Gợi ý: ô số ${i + 1} là “${c.stages[i].name}”. ${c.stages[i].fact}`;
    speak(message, true);
    if (placed.every((v, k) => v === k)) return win();
    renderPlay();
  }

  function check() {
    if (busy || solved || !placed.every((v) => v != null)) return;
    const c = current;
    const wrong = placed.map((v, k) => v !== k);
    const wrongCount = wrong.filter(Boolean).length;
    placed.forEach((v, k) => { if (!wrong[k]) locked[k] = true; });
    if (!wrongCount) return win();
    wrongRounds += 1;
    busy = true;
    message = `Có ${wrongCount} thẻ chưa đúng chỗ. Các thẻ đúng đã được giữ lại, bé thử xếp lại những thẻ còn lại nhé!`
      + (placed.includes(ODD) ? " Chú ý: thẻ lạ đã lọt vào vòng tròn đó!" : "");
    speak(message, true);
    renderPlay();
    const host = activeContext && activeContext.host;
    wrong.forEach((w, k) => { if (w) host?.querySelector(`[data-slot="${k}"]`)?.classList.add("bad"); });
    timers.push(setTimeout(() => {
      wrong.forEach((w, k) => { if (w) { tray.push(placed[k]); placed[k] = null; } });
      busy = false;
      renderPlay();
    }, 1100));
  }

  function win() {
    const c = current;
    solved = true;
    const mistakes = hintsUsed + wrongRounds;
    const n = mistakes === 0 ? 3 : mistakes <= 2 ? 2 : 1;
    saveStars(starKey(c), n);
    lastStars = n;
    message = "";
    renderPlay();
    speak(`Đúng rồi! Bé giỏi quá! ${odd ? `Thẻ lạ là ${odd.stage.name}, thuộc ${odd.cycle.title.toLowerCase()}. ` : ""}${c.title}: ${c.stages.map((s) => s.name).join(", rồi ")}. Rồi vòng đời lại bắt đầu.`, true);
  }

  function bindPlay(host, c) {
    host.querySelector("#ee-life-back")?.addEventListener("click", renderRegistry);
    host.querySelector("#ee-life-say-ask")?.addEventListener("click", () => speak(askText(c)));
    host.querySelectorAll("[data-card]").forEach((b) => b.addEventListener("click", () => placeCard(Number(b.dataset.card))));
    host.querySelectorAll("[data-slot]").forEach((b) => b.addEventListener("click", () => tapSlot(Number(b.dataset.slot))));
    host.querySelector("#ee-life-check")?.addEventListener("click", check);
    host.querySelector("#ee-life-hint")?.addEventListener("click", giveHint);
    host.querySelector("#ee-life-reset")?.addEventListener("click", () => startCycle(c));
    host.querySelector("#ee-life-again")?.addEventListener("click", () => startCycle(c));
    host.querySelector("#ee-life-list")?.addEventListener("click", renderRegistry);
    host.querySelector("#ee-life-next")?.addEventListener("click", () => {
      const list = mode === "odd" ? CYCLES.filter((x) => x.id !== "water") : CYCLES;
      const next = list[list.indexOf(c) + 1];
      if (next) startCycle(next);
    });
    host.querySelector("#ee-life-say-all")?.addEventListener("click", () => speak(`${c.title}. ` + c.stages.map((s, i) => `Giai đoạn ${i + 1}, ${s.name}. ${s.fact}`).join(" ") + " Và thế là vòng đời lại bắt đầu."));
    host.querySelectorAll("[data-say]").forEach((b) => b.addEventListener("click", () => {
      const s = c.stages[Number(b.dataset.say)];
      speak(`${s.name}. ${s.fact}`);
    }));
  }

  /* ---------- Chế độ hỏi nhanh: "Cái gì đến trước?" và "So sánh vòng đời" ---------- */
  const LIVING = () => CYCLES.filter((c) => c.id !== "water");
  const shortName = (c) => { const t = c.title.replace(/^Vòng đời\s+/i, ""); return t.charAt(0).toUpperCase() + t.slice(1); };
  const pick = (list) => list[Math.floor(Math.random() * list.length)];
  /* Mỗi câu so sánh: một đặc điểm, các vòng đời CÓ và KHÔNG có đặc điểm đó */
  const TRAITS = [
    { q: "Con nào có giai đoạn nhộng?", yes: ["butterfly", "bee", "ladybug", "mosquito", "silkworm"], no: ["chicken", "turtle", "frog", "carp", "dragonfly", "cat"],
      why: (y, n) => `${shortName(y)} có giai đoạn nhộng${y.id === "mosquito" ? " (ở muỗi gọi là cung quăng)" : y.id === "silkworm" ? " (nằm trong kén)" : ""}. ${shortName(n)} không có giai đoạn nhộng.` },
    { q: "Con nào khi mới nở đã có hình dáng gần giống bố mẹ?", yes: ["chicken", "turtle", "carp", "cat"], no: ["butterfly", "frog", "mosquito", "bee", "ladybug", "silkworm", "dragonfly"],
      why: (y, n) => `${shortName(y)} mới nở đã trông giống bố mẹ, chỉ nhỏ hơn. Còn ${shortName(n).toLowerCase()} phải thay đổi hình dáng rất nhiều mới thành con trưởng thành.` },
    { q: "Vòng đời nào bắt đầu từ một hạt?", yes: ["bean", "sunflower", "rice"], no: ["chicken", "butterfly", "frog", "turtle", "carp", "bee"],
      why: (y, n) => `${shortName(y)} là thực vật, bắt đầu từ hạt. ${shortName(n)} là động vật, bắt đầu từ quả trứng.` },
    { q: "Con nào đẻ trứng trong nước?", yes: ["frog", "mosquito", "carp", "dragonfly"], no: ["chicken", "turtle", "butterfly", "ladybug", "bee", "silkworm"],
      why: (y, n) => `${shortName(y)} đẻ trứng trong nước. ${shortName(n)} đẻ trứng ở trên cạn${n.id === "turtle" ? ", trong bãi cát" : ""}.` },
    { q: "Con nào lúc nhỏ sống dưới nước, lớn lên mới lên bờ hoặc bay đi?", yes: ["frog", "mosquito", "dragonfly"], no: ["chicken", "butterfly", "bee", "ladybug", "silkworm"],
      why: (y, n) => `Lúc nhỏ ${shortName(y).toLowerCase()} sống dưới nước. ${shortName(n)} thì lúc nhỏ đã sống trên cạn.` },
    { q: "Con nào đẻ trứng trên lá cây?", yes: ["butterfly", "ladybug"], no: ["chicken", "frog", "turtle", "carp", "mosquito"],
      why: (y, n) => `${shortName(y)} đẻ trứng trên lá cây. ${shortName(n)} đẻ trứng ở nơi khác.` },
    { q: "Con nào đẻ ra con, không đẻ trứng?", yes: ["cat"], no: ["chicken", "turtle", "frog", "butterfly", "carp", "bee", "ladybug", "silkworm", "dragonfly", "mosquito"],
      why: (y, n) => `${shortName(y)} mẹ đẻ ra con và nuôi con bằng sữa. ${shortName(n)} thì đẻ trứng.` }
  ];
  const byIdC = (id) => CYCLES.find((c) => c.id === id);

  function makeQuiz(kind) {
    const items = [];
    for (let k = 0; k < 10; k += 1) {
      if (kind === "before") {
        const c = pick(LIVING());
        const n = c.stages.length;
        let i, j;
        /* Bỏ cặp giai đoạn đầu và cuối vì vòng đời quay vòng, dễ gây tranh cãi */
        do { i = Math.floor(Math.random() * n); j = Math.floor(Math.random() * n); } while (i === j || (Math.min(i, j) === 0 && Math.max(i, j) === n - 1));
        const a = Math.min(i, j), b = Math.max(i, j);
        const opts = shuffle([a, b]);
        items.push({
          q: `Trong ${c.title.toLowerCase()}, hình nào đến trước?`,
          opts: opts.map((s) => ({ key: c.stages[s].key, label: c.stages[s].name })),
          answer: opts.indexOf(a),
          why: `“${c.stages[a].name}” đến trước, rồi mới đến “${c.stages[b].name}”.`,
          cycle: c
        });
      } else {
        const t = pick(TRAITS);
        const y = byIdC(pick(t.yes)), n = byIdC(pick(t.no));
        const opts = shuffle([y, n]);
        items.push({
          q: t.q,
          opts: opts.map((c) => ({ key: c.stages[c.stages.length - 1].key, label: shortName(c) })),
          answer: opts.indexOf(y),
          why: t.why(y, n)
        });
      }
    }
    return { kind, items, i: 0, score: 0, chosen: -1, results: [] };
  }

  function quizStartHtml() {
    const m = modeOf(mode);
    const best = stars[`mode:${mode}`] || 0;
    const sample = mode === "before"
      ? `<div class="ee-life-sample">${art("ech_nong_noc")}<span>hay</span>${art("ech_moc_chan")}</div>`
      : `<div class="ee-life-sample">${art("buom_lon")}<span>hay</span>${art("ga_lon")}</div>`;
    return `<section class="ee-life-panel ee-life-qstart">
        ${sample}
        <div><h3>${m.icon} ${m.label}</h3>
        <p>${mode === "before"
          ? "Mỗi câu có 2 hình trong cùng một vòng đời. Bé chọn hình xảy ra trước nhé! Có 10 câu."
          : "Mỗi câu hỏi về 2 vòng đời khác nhau, ví dụ: con nào có giai đoạn nhộng? Bé chọn đúng con nhé! Có 10 câu."}</p>
        <div class="ee-life-meta" style="margin:.4rem 0 .8rem">Kỷ lục: ${starHtml(best)}</div>
        <button id="ee-life-quiz-start" class="ee-life-btn primary" type="button">▶ Bắt đầu</button></div>
      </section>`;
  }

  function startQuiz() {
    clearTimers(); stopSpeak();
    current = null;
    qz = makeQuiz(mode);
    renderQuiz(true);
  }

  function renderQuiz(readIt) {
    const host = activeContext && activeContext.host;
    if (!host || !qz) return;
    const m = modeOf(qz.kind);
    setBanner([
      { level: 2, title: `${GAME_NUMBER}. ${GAME_TITLE}`, action: () => renderRegistry() },
      { level: 3, title: m.label, action: null }
    ]);
    const total = qz.items.length;
    const dots = qz.items.map((_, k) => `<span class="ee-life-dot ${qz.results[k] === true ? "ok" : qz.results[k] === false ? "bad" : k === qz.i ? "now" : ""}"></span>`).join("");
    let body;
    if (qz.i >= total) {
      const n = qz.score >= 9 ? 3 : qz.score >= 6 ? 2 : 1;
      body = `<section class="ee-life-panel ee-life-win">
          <div style="font-size:42px" aria-hidden="true">🎉🐰</div>
          <h3>Bé đúng ${qz.score}/${total} câu!</h3>
          <div class="big-stars">${[1, 2, 3].map((k) => `<span class="${k <= n ? "" : "off"}">★</span>`).join("")}</div>
          <div class="ee-life-actions" style="margin-top:.8rem">
            <button id="ee-life-q-again" class="ee-life-btn primary wide" type="button">🔄 Chơi lượt mới</button>
            <button id="ee-life-q-list" class="ee-life-btn wide" type="button">📚 Về trang chọn cách chơi</button>
          </div></section>`;
    } else {
      const it = qz.items[qz.i];
      const answered = qz.chosen >= 0;
      const ok = qz.chosen === it.answer;
      body = `<div class="ee-life-ask"><p>${esc(it.q)}</p><button id="ee-life-q-say" class="ee-life-btn pink" type="button">🔊 Nghe cô đọc</button></div>
        <div class="ee-life-opts">${it.opts.map((o, k) => {
          const cls = answered ? (k === it.answer ? "ok" : k === qz.chosen ? "bad" : "dim") : "";
          return `<button type="button" class="ee-life-opt ${cls}" data-opt="${k}" ${answered ? "disabled" : ""}>${art(o.key)}<span class="name">${esc(o.label)}</span></button>`;
        }).join("")}</div>
        ${answered ? `<div class="ee-life-msg ${ok ? "good" : ""}"><span class="icon" aria-hidden="true">${ok ? "🌟" : "💡"}</span><div>${ok ? "Đúng rồi! " : "Chưa đúng rồi. "}${esc(it.why)}</div></div>
          <div class="ee-life-actions"><button id="ee-life-q-next" class="ee-life-btn primary wide" type="button">${qz.i === total - 1 ? "Xem kết quả" : "Câu tiếp theo →"}</button></div>` : ""}`;
    }
    host.innerHTML = `
      <div class="ee-life">
        <div class="section-heading">
          <div><h1>${m.icon} ${m.label}</h1><p>Câu ${Math.min(qz.i + 1, total)}/${total} • Đúng ${qz.score} câu</p></div>
          <button id="ee-life-back" class="back-btn" type="button">← Trang chọn cách chơi</button>
        </div>
        <div class="ee-life-dots">${dots}</div>
        <p id="ee-life-voice-note" class="ee-life-voice-note" hidden></p>
        <div class="ee-life-quiz">${body}</div>
      </div>`;
    host.querySelector("#ee-life-back")?.addEventListener("click", renderRegistry);
    host.querySelector("#ee-life-q-list")?.addEventListener("click", renderRegistry);
    host.querySelector("#ee-life-q-again")?.addEventListener("click", startQuiz);
    host.querySelector("#ee-life-q-say")?.addEventListener("click", () => speak(quizSpeech()));
    host.querySelector("#ee-life-q-next")?.addEventListener("click", () => { qz.i += 1; qz.chosen = -1; renderQuiz(true); if (qz.i >= qz.items.length) speak(`Bé đúng ${qz.score} trên ${qz.items.length} câu. Giỏi lắm!`, true); });
    host.querySelectorAll("[data-opt]").forEach((b) => b.addEventListener("click", () => answerQuiz(Number(b.dataset.opt))));
    if (qz.i >= total) saveStars(`mode:${qz.kind}`, qz.score >= 9 ? 3 : qz.score >= 6 ? 2 : 1);
    if (readIt && qz.i < total) speak(quizSpeech(), true);
  }
  function quizSpeech() {
    const it = qz.items[qz.i];
    return `${it.q} ${it.opts.map((o) => o.label).join(", hay ")}?`;
  }
  function answerQuiz(k) {
    if (!qz || qz.chosen >= 0 || qz.i >= qz.items.length) return;
    const it = qz.items[qz.i];
    qz.chosen = k;
    const ok = k === it.answer;
    qz.results[qz.i] = ok;
    if (ok) qz.score += 1;
    renderQuiz(false);
    speak(`${ok ? "Đúng rồi!" : "Chưa đúng rồi."} ${it.why}`, true);
  }

  function render(context) {
    activeContext = context || null;
    ensureStyles();
    renderRegistry();
  }

  function destroy() {
    clearTimers();
    stopSpeak();
    activeContext = null;
    current = null;
    qz = null;
  }

  window.CLASS1_GAME_MODULES = window.CLASS1_GAME_MODULES || {};
  window.CLASS1_GAME_MODULES[MODULE_KEY] = Object.freeze({ render, destroy });
})();

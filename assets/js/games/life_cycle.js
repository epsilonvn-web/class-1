(() => {
  "use strict";

  /* Vòng đời kỳ diệu – sắp xếp các giai đoạn của vòng đời theo đúng thứ tự. */
  const MODULE_KEY = "lifeCycle";
  const STYLE_ID = "class1-games-life-cycle-style";
  const GAME_NUMBER = 8; // đổi số này cho khớp với vị trí game trong trang Games
  const GAME_TITLE = "Vòng đời kỳ diệu";
  const STARS_KEY = "class1-life-cycle-stars";
  const INK = "#3B2314";

  const ART = Object.freeze({"ga_trung": "<ellipse cx=\"100\" cy=\"116\" rx=\"30\" ry=\"40\" fill=\"#FFF8E1\"/><path d=\"M36 150 C40 186 160 186 164 150 Z\" fill=\"#D7A86E\"/><path d=\"M44 158 L156 158 M52 170 L148 170\" fill=\"none\" stroke=\"#A0673A\" stroke-width=\"3\"/>", "ga_no": "<path d=\"M36 150 C40 186 160 186 164 150 Z\" fill=\"#D7A86E\"/><path d=\"M44 158 L156 158 M52 170 L148 170\" fill=\"none\" stroke=\"#A0673A\" stroke-width=\"3\"/><path d=\"M66 150 L66 118 L76 108 L86 120 L96 106 L106 120 L118 106 L128 118 L134 110 L134 150 Z\" fill=\"#FFF8E1\"/><circle cx=\"100\" cy=\"96\" r=\"22\" fill=\"#FFE066\"/><path d=\"M78 96 L68 100 L78 104 Z\" fill=\"#F59E0B\"/><circle cx=\"92\" cy=\"92\" r=\"4.5\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"93.6\" cy=\"90.4\" r=\"1.6\" fill=\"#fff\" stroke=\"none\"/><ellipse cx=\"104\" cy=\"104\" rx=\"6\" ry=\"3.5\" fill=\"#F8A5B8\" stroke=\"none\"/><path d=\"M96 76 C94 68 102 66 104 74\" fill=\"none\" stroke-width=\"3\"/>", "ga_con": "<g transform=\"translate(104 106) scale(1.25)\"><path d=\"M-10 40 L-12 54 M-12 54 L-20 58 M-12 54 L-4 58 M12 40 L14 54 M14 54 L6 58 M14 54 L22 58\" fill=\"none\" stroke=\"#E07B12\" stroke-width=\"4\"/><ellipse cx=\"2\" cy=\"14\" rx=\"38\" ry=\"30\" fill=\"#FFE066\"/><path d=\"M14 6 C26 0 40 8 34 20 C26 26 14 22 10 14 Z\" fill=\"#FDD835\"/><circle cx=\"-18\" cy=\"-18\" r=\"24\" fill=\"#FFE066\"/><path d=\"M-22 -42 C-24 -50 -16 -52 -14 -44\" fill=\"none\" stroke-width=\"3\"/><path d=\"M-40 -18 L-52 -14 L-40 -10 Z\" fill=\"#F59E0B\"/><circle cx=\"-24\" cy=\"-22\" r=\"4.5\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"-22.4\" cy=\"-23.6\" r=\"1.6\" fill=\"#fff\" stroke=\"none\"/><ellipse cx=\"-14\" cy=\"-10\" rx=\"6\" ry=\"3.5\" fill=\"#F8A5B8\" stroke=\"none\"/></g><path d=\"M30 178 L170 178\" fill=\"none\" stroke=\"#9CCC65\" stroke-width=\"6\"/>", "ga_lon": "<g transform=\"translate(106 92) scale(1.05)\"><path d=\"M-6 50 L-10 72 M-10 72 L-20 76 M-10 72 L0 76 M18 50 L22 72 M22 72 L12 76 M22 72 L32 76\" fill=\"none\" stroke=\"#E07B12\" stroke-width=\"5\"/><path d=\"M40 -6 C58 -20 70 -14 66 4 C74 8 72 24 58 26 Z\" fill=\"#F5F5F5\"/><path d=\"M-40 -10 C-60 20 -40 58 6 58 C48 58 66 30 58 6 C50 -8 30 -6 16 -16 Z\" fill=\"#FFFFFF\"/><path d=\"M-6 16 C8 2 40 4 46 18 C44 34 18 38 -2 32 C-8 28 -10 22 -6 16 Z\" fill=\"#ECEFF1\"/><path d=\"M-40 -6 C-50 -36 -36 -56 -14 -54 C6 -52 14 -30 8 -10 C-4 0 -24 4 -40 -6 Z\" fill=\"#FFFFFF\"/><path d=\"M-34 -50 C-38 -64 -24 -68 -22 -58 C-16 -70 0 -64 -6 -52 Z\" fill=\"#E53935\"/><path d=\"M-48 -34 L-64 -28 L-48 -22 Z\" fill=\"#F59E0B\"/><path d=\"M-46 -20 C-54 -14 -52 -4 -44 -6 Z\" fill=\"#E53935\"/><circle cx=\"-30\" cy=\"-36\" r=\"5\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"-28.2\" cy=\"-37.8\" r=\"1.8\" fill=\"#fff\" stroke=\"none\"/><ellipse cx=\"-20\" cy=\"-24\" rx=\"6\" ry=\"3.5\" fill=\"#F8A5B8\" stroke=\"none\"/></g>", "buom_trung": "<path d=\"M20 140 C40 70 130 50 184 70 C170 140 90 176 20 140 Z\" fill=\"#81C784\"/><path d=\"M28 134 C80 116 130 96 176 74\" fill=\"none\" stroke-width=\"3\"/><circle cx=\"88\" cy=\"104\" r=\"6\" fill=\"#FFF59D\" stroke-width=\"3\"/><circle cx=\"102\" cy=\"98\" r=\"6\" fill=\"#FFF59D\" stroke-width=\"3\"/><circle cx=\"96\" cy=\"116\" r=\"6\" fill=\"#FFF59D\" stroke-width=\"3\"/><circle cx=\"110\" cy=\"110\" r=\"6\" fill=\"#FFF59D\" stroke-width=\"3\"/><circle cx=\"116\" cy=\"96\" r=\"6\" fill=\"#FFF59D\" stroke-width=\"3\"/>", "buom_sau": "<path d=\"M20 140 C40 70 130 50 184 70 C170 140 90 176 20 140 Z\" fill=\"#81C784\"/><path d=\"M28 134 C80 116 130 96 176 74\" fill=\"none\" stroke-width=\"3\"/><circle cx=\"150\" cy=\"90\" r=\"14\" fill=\"#9CCC65\"/><circle cx=\"132\" cy=\"94\" r=\"14\" fill=\"#9CCC65\"/><circle cx=\"114\" cy=\"98\" r=\"14\" fill=\"#9CCC65\"/><circle cx=\"96\" cy=\"102\" r=\"14\" fill=\"#9CCC65\"/><circle cx=\"78\" cy=\"106\" r=\"14\" fill=\"#9CCC65\"/><circle cx=\"60\" cy=\"110\" r=\"17\" fill=\"#8BC34A\"/><circle cx=\"54\" cy=\"106\" r=\"4\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"55.4\" cy=\"104.6\" r=\"1.4\" fill=\"#fff\" stroke=\"none\"/><circle cx=\"66\" cy=\"106\" r=\"4\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"67.4\" cy=\"104.6\" r=\"1.4\" fill=\"#fff\" stroke=\"none\"/><path d=\"M52 92 L46 80 M66 92 L70 80\" fill=\"none\" stroke-width=\"3\"/><path d=\"M56.0 116 Q60 120 64.0 116\" fill=\"none\" stroke-width=\"3\"/>", "buom_nhong": "<path d=\"M20 40 L184 40\" fill=\"none\" stroke=\"#A0673A\" stroke-width=\"10\"/><path d=\"M100 44 L100 58\" fill=\"none\" stroke-width=\"4\"/><path d=\"M100 58 C70 70 72 130 100 168 C128 130 130 70 100 58 Z\" fill=\"#AED581\"/><path d=\"M84 92 L116 92 M82 112 L118 112 M86 132 L114 132\" fill=\"none\" stroke-width=\"3\"/><circle cx=\"108\" cy=\"80\" r=\"3\" fill=\"#FFD54F\" stroke=\"none\"/><circle cx=\"92\" cy=\"122\" r=\"3\" fill=\"#FFD54F\" stroke=\"none\"/>", "buom_lon": "<g transform=\"translate(100 98) scale(1.2)\"><path d=\"M-4 -6 C-20 -50 -60 -60 -70 -40 C-80 -18 -50 0 -4 4 Z M4 -6 C20 -50 60 -60 70 -40 C80 -18 50 0 4 4 Z\" fill=\"#F48FB1\"/><path d=\"M-4 6 C-44 8 -62 30 -54 50 C-44 66 -16 50 -4 18 Z M4 6 C44 8 62 30 54 50 C44 66 16 50 4 18 Z\" fill=\"#B39DDB\"/><circle cx=\"-44\" cy=\"-30\" r=\"10\" fill=\"#FFF59D\" stroke-width=\"3\"/><circle cx=\"44\" cy=\"-30\" r=\"10\" fill=\"#FFF59D\" stroke-width=\"3\"/><path d=\"M0 -30 C8 -30 10 -10 10 10 C10 40 6 52 0 52 C-6 52 -10 40 -10 10 C-10 -10 -8 -30 0 -30 Z\" fill=\"#7E57C2\"/><circle cx=\"0\" cy=\"-36\" r=\"12\" fill=\"#7E57C2\"/><path d=\"M-5 -46 C-10 -60 -20 -66 -28 -64 M5 -46 C10 -60 20 -66 28 -64\" fill=\"none\" stroke-width=\"3\"/><circle cx=\"-5\" cy=\"-37\" r=\"3\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"-4.0\" cy=\"-38.0\" r=\"1.0\" fill=\"#fff\" stroke=\"none\"/><circle cx=\"5\" cy=\"-37\" r=\"3\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"6.0\" cy=\"-38.0\" r=\"1.0\" fill=\"#fff\" stroke=\"none\"/></g>", "nuoc_bien": "<path d=\"M20 120 C40 80 80 100 100 90 C130 74 160 96 180 84\" fill=\"none\" stroke=\"#9CCC65\" stroke-width=\"0\"/><path d=\"M10 100 L60 60 L90 90 L120 50 L190 100 Z\" fill=\"#A5D6A7\"/><path d=\"M10 110 Q30 102 50 110 T90 110 T130 110 T170 110 T190 110 L190 192 L10 192 Z\" fill=\"#81D4FA\"/><path d=\"M30 140 Q40 134 50 140 M110 156 Q120 150 130 156 M150 136 Q160 130 170 136\" fill=\"none\" stroke=\"#fff\" stroke-width=\"4\"/>", "nuoc_boc_hoi": "<path d=\"M180.0 46.0 L190.0 46.0\" fill=\"none\" stroke=\"#F59E0B\" stroke-width=\"4\"/><path d=\"M171.2 67.2 L178.3 74.3\" fill=\"none\" stroke=\"#F59E0B\" stroke-width=\"4\"/><path d=\"M150.0 76.0 L150.0 86.0\" fill=\"none\" stroke=\"#F59E0B\" stroke-width=\"4\"/><path d=\"M128.8 67.2 L121.7 74.3\" fill=\"none\" stroke=\"#F59E0B\" stroke-width=\"4\"/><path d=\"M120.0 46.0 L110.0 46.0\" fill=\"none\" stroke=\"#F59E0B\" stroke-width=\"4\"/><path d=\"M128.8 24.8 L121.7 17.7\" fill=\"none\" stroke=\"#F59E0B\" stroke-width=\"4\"/><path d=\"M150.0 16.0 L150.0 6.0\" fill=\"none\" stroke=\"#F59E0B\" stroke-width=\"4\"/><path d=\"M171.2 24.8 L178.3 17.7\" fill=\"none\" stroke=\"#F59E0B\" stroke-width=\"4\"/><circle cx=\"150\" cy=\"46\" r=\"24\" fill=\"#FFD54F\"/><circle cx=\"142\" cy=\"43\" r=\"3.5\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"143.2\" cy=\"41.8\" r=\"1.2\" fill=\"#fff\" stroke=\"none\"/><circle cx=\"158\" cy=\"43\" r=\"3.5\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"159.2\" cy=\"41.8\" r=\"1.2\" fill=\"#fff\" stroke=\"none\"/><path d=\"M145.0 53 Q150 58 155.0 53\" fill=\"none\" stroke-width=\"3\"/><path d=\"M10 140 Q30 132 50 140 T90 140 T130 140 T170 140 T190 140 L190 192 L10 192 Z\" fill=\"#81D4FA\"/><path d=\"M46 128 C38 116 54 106 46 94 C38 82 54 72 46 60\" fill=\"none\" stroke=\"#4FC3F7\" stroke-width=\"4\"/><path d=\"M39 66 L46 54 L53 66\" fill=\"none\" stroke=\"#4FC3F7\" stroke-width=\"4\"/><path d=\"M82 128 C74 116 90 106 82 94 C74 82 90 72 82 60\" fill=\"none\" stroke=\"#4FC3F7\" stroke-width=\"4\"/><path d=\"M75 66 L82 54 L89 66\" fill=\"none\" stroke=\"#4FC3F7\" stroke-width=\"4\"/><path d=\"M118 128 C110 116 126 106 118 94 C110 82 126 72 118 60\" fill=\"none\" stroke=\"#4FC3F7\" stroke-width=\"4\"/><path d=\"M111 66 L118 54 L125 66\" fill=\"none\" stroke=\"#4FC3F7\" stroke-width=\"4\"/>", "nuoc_may": "<path d=\"M42.50000000000001 98.4 C19.5 98.4 19.5 63.900000000000006 47.1 66.2 C49.400000000000006 36.300000000000004 93.1 31.700000000000003 100 57.0 C111.5 29.400000000000006 157.5 38.6 152.9 68.5 C180.5 68.5 180.5 98.4 155.2 98.4 Z\" fill=\"#ECEFF1\"/><path d=\"M120.0 139.6 C108.0 139.6 108.0 121.6 122.4 122.8 C123.6 107.2 146.4 104.8 150 118.0 C156.0 103.6 180.0 108.4 177.6 124.0 C192.0 124.0 192.0 139.6 178.8 139.6 Z\" fill=\"#FFFFFF\"/><path d=\"M24.499999999999996 144.8 C13.5 144.8 13.5 128.3 26.7 129.4 C27.799999999999997 115.1 48.7 112.9 52 125.0 C57.5 111.8 79.5 116.2 77.3 130.5 C90.5 130.5 90.5 144.8 78.4 144.8 Z\" fill=\"#FFFFFF\"/><circle cx=\"88\" cy=\"76\" r=\"5\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"89.8\" cy=\"74.2\" r=\"1.8\" fill=\"#fff\" stroke=\"none\"/><circle cx=\"112\" cy=\"76\" r=\"5\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"113.8\" cy=\"74.2\" r=\"1.8\" fill=\"#fff\" stroke=\"none\"/><path d=\"M94.0 88 Q100 94 106.0 88\" fill=\"none\" stroke-width=\"3\"/>", "nuoc_mua": "<path d=\"M42.50000000000001 80.4 C19.5 80.4 19.5 45.900000000000006 47.1 48.2 C49.400000000000006 18.300000000000004 93.1 13.700000000000003 100 39.0 C111.5 11.400000000000006 157.5 20.6 152.9 50.5 C180.5 50.5 180.5 80.4 155.2 80.4 Z\" fill=\"#B0BEC5\"/><path d=\"M56 104 C50 114 50 122 56 122 C62 122 62 114 56 104 Z\" fill=\"#4FC3F7\" stroke-width=\"3\"/><path d=\"M84 120 C78 130 78 138 84 138 C90 138 90 130 84 120 Z\" fill=\"#4FC3F7\" stroke-width=\"3\"/><path d=\"M112 104 C106 114 106 122 112 122 C118 122 118 114 112 104 Z\" fill=\"#4FC3F7\" stroke-width=\"3\"/><path d=\"M140 122 C134 132 134 140 140 140 C146 140 146 132 140 122 Z\" fill=\"#4FC3F7\" stroke-width=\"3\"/><path d=\"M70 148 C64 158 64 166 70 166 C76 166 76 158 70 148 Z\" fill=\"#4FC3F7\" stroke-width=\"3\"/><path d=\"M124 150 C118 160 118 168 124 168 C130 168 130 160 124 150 Z\" fill=\"#4FC3F7\" stroke-width=\"3\"/><path d=\"M98 166 C92 176 92 184 98 184 C104 184 104 176 98 166 Z\" fill=\"#4FC3F7\" stroke-width=\"3\"/>", "ong_trung": "<polygon points=\"153.7,131.0 100.0,162.0 46.3,131.0 46.3,69.0 100.0,38.0 153.7,69.0\" fill=\"#FFD54F\"/><polygon points=\"143.3,125.0 100.0,150.0 56.7,125.0 56.7,75.0 100.0,50.0 143.3,75.0\" fill=\"#FFF3C4\" stroke-width=\"3\"/><ellipse cx=\"100\" cy=\"100\" rx=\"9\" ry=\"18\" fill=\"#FFFFFF\" stroke-width=\"3\"/>", "ong_au_trung": "<polygon points=\"153.7,131.0 100.0,162.0 46.3,131.0 46.3,69.0 100.0,38.0 153.7,69.0\" fill=\"#FFD54F\"/><polygon points=\"143.3,125.0 100.0,150.0 56.7,125.0 56.7,75.0 100.0,50.0 143.3,75.0\" fill=\"#FFF3C4\" stroke-width=\"3\"/><path d=\"M78 92 C78 66 122 66 124 94 C126 120 96 132 84 116 C92 118 110 114 110 98 C110 82 88 82 92 100 Z\" fill=\"#FFFFFF\" stroke-width=\"3.5\"/><path d=\"M90 78 L94 90 M106 76 L106 88 M118 86 L112 96\" fill=\"none\" stroke-width=\"2.5\"/>", "ong_nhong": "<polygon points=\"153.7,131.0 100.0,162.0 46.3,131.0 46.3,69.0 100.0,38.0 153.7,69.0\" fill=\"#FFD54F\"/><polygon points=\"143.3,125.0 100.0,150.0 56.7,125.0 56.7,75.0 100.0,50.0 143.3,75.0\" fill=\"#FFF3C4\" stroke-width=\"3\"/><path d=\"M100 62 C82 62 80 80 82 100 C84 124 90 138 100 138 C110 138 116 124 118 100 C120 80 118 62 100 62 Z\" fill=\"#FFF8E1\" stroke-width=\"3.5\"/><circle cx=\"92\" cy=\"76\" r=\"5\" fill=\"#8D6E63\" stroke=\"none\"/><circle cx=\"108\" cy=\"76\" r=\"5\" fill=\"#8D6E63\" stroke=\"none\"/><path d=\"M88 96 L112 96 M88 110 L112 110 M90 124 L110 124\" fill=\"none\" stroke-width=\"2.5\"/>", "ong_lon": "<g transform=\"translate(110 110) scale(1.15)\"><ellipse cx=\"-6\" cy=\"-30\" rx=\"18\" ry=\"24\" fill=\"#DFF3FF\" transform=\"rotate(-20 -6 -30)\"/><ellipse cx=\"18\" cy=\"-28\" rx=\"16\" ry=\"22\" fill=\"#DFF3FF\" transform=\"rotate(25 18 -28)\"/><ellipse cx=\"10\" cy=\"0\" rx=\"44\" ry=\"30\" fill=\"#FDD835\"/><path d=\"M0 -29 C-6 -10 -6 10 0 29 L14 29 C8 10 8 -10 14 -29 Z M30 -22 C24 -8 24 8 30 22 L40 16 C36 6 36 -6 40 -16 Z\" fill=\"#3B2314\"/><path d=\"M54 -4 L68 0 L54 6 Z\" fill=\"#3B2314\"/><circle cx=\"-38\" cy=\"-2\" r=\"24\" fill=\"#FDD835\"/><path d=\"M-46 -24 C-50 -38 -60 -44 -66 -42 M-30 -24 C-28 -38 -20 -46 -12 -46\" fill=\"none\" stroke-width=\"3\"/><circle cx=\"-46\" cy=\"-6\" r=\"4.5\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"-44.4\" cy=\"-7.6\" r=\"1.6\" fill=\"#fff\" stroke=\"none\"/><circle cx=\"-30\" cy=\"-6\" r=\"4.5\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"-28.4\" cy=\"-7.6\" r=\"1.6\" fill=\"#fff\" stroke=\"none\"/><ellipse cx=\"-52\" cy=\"6\" rx=\"5\" ry=\"3\" fill=\"#F8A5B8\" stroke=\"none\"/><ellipse cx=\"-24\" cy=\"6\" rx=\"5\" ry=\"3\" fill=\"#F8A5B8\" stroke=\"none\"/><path d=\"M-43.0 6 Q-38 11 -33.0 6\" fill=\"none\" stroke-width=\"3\"/></g>", "rua_trung": "<path d=\"M0 150 Q100 130 200 150 L200 200 L0 200 Z\" fill=\"#FFE0A3\"/><ellipse cx=\"100\" cy=\"150\" rx=\"70\" ry=\"26\" fill=\"#E8C680\"/><ellipse cx=\"74\" cy=\"146\" rx=\"15\" ry=\"15\" fill=\"#FFFFFF\"/><ellipse cx=\"100\" cy=\"140\" rx=\"15\" ry=\"15\" fill=\"#FFFFFF\"/><ellipse cx=\"126\" cy=\"146\" rx=\"15\" ry=\"15\" fill=\"#FFFFFF\"/><ellipse cx=\"88\" cy=\"160\" rx=\"15\" ry=\"15\" fill=\"#FFFFFF\"/><ellipse cx=\"114\" cy=\"160\" rx=\"15\" ry=\"15\" fill=\"#FFFFFF\"/>", "rua_no": "<path d=\"M0 150 Q100 130 200 150 L200 200 L0 200 Z\" fill=\"#FFE0A3\"/><path d=\"M62 158 C62 120 78 104 100 104 C122 104 138 120 138 158 Z\" fill=\"#FFFFFF\"/><path d=\"M62 128 L74 120 L82 132 L94 118 L106 132 L118 118 L128 130 L138 124\" fill=\"none\" stroke-width=\"3.5\"/><g transform=\"translate(100 106) scale(0.9)\"><path d=\"M-30 6 L-48 18 L-36 22 Z M30 6 L48 18 L36 22 Z M-24 -14 L-44 -26 L-34 -30 Z M24 -14 L44 -26 L34 -30 Z\" fill=\"#9BD67A\"/><circle cx=\"0\" cy=\"-34\" r=\"14\" fill=\"#9BD67A\"/><circle cx=\"-5\" cy=\"-36\" r=\"3.5\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"-3.8\" cy=\"-37.2\" r=\"1.2\" fill=\"#fff\" stroke=\"none\"/><circle cx=\"5\" cy=\"-36\" r=\"3.5\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"6.2\" cy=\"-37.2\" r=\"1.2\" fill=\"#fff\" stroke=\"none\"/><ellipse cx=\"0\" cy=\"0\" rx=\"32\" ry=\"38\" fill=\"#4CAF50\"/><path d=\"M-14 -16 L14 -16 L22 0 L14 16 L-14 16 L-22 0 Z\" fill=\"#81C784\" stroke-width=\"3\"/></g>", "rua_ra_bien": "<path d=\"M0 0 L200 0 L200 70 Q150 80 100 66 Q50 54 0 70 Z\" fill=\"#81D4FA\"/><path d=\"M0 100 Q100 80 200 100 L200 200 L0 200 Z\" fill=\"#FFE0A3\"/><g transform=\"translate(100 140) scale(0.9)\"><path d=\"M-30 6 L-48 18 L-36 22 Z M30 6 L48 18 L36 22 Z M-24 -14 L-44 -26 L-34 -30 Z M24 -14 L44 -26 L34 -30 Z\" fill=\"#9BD67A\"/><circle cx=\"0\" cy=\"-34\" r=\"14\" fill=\"#9BD67A\"/><circle cx=\"-5\" cy=\"-36\" r=\"3.5\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"-3.8\" cy=\"-37.2\" r=\"1.2\" fill=\"#fff\" stroke=\"none\"/><circle cx=\"5\" cy=\"-36\" r=\"3.5\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"6.2\" cy=\"-37.2\" r=\"1.2\" fill=\"#fff\" stroke=\"none\"/><ellipse cx=\"0\" cy=\"0\" rx=\"32\" ry=\"38\" fill=\"#4CAF50\"/><path d=\"M-14 -16 L14 -16 L22 0 L14 16 L-14 16 L-22 0 Z\" fill=\"#81C784\" stroke-width=\"3\"/></g><path d=\"M70 196 L76 186 M130 196 L124 186 M100 200 L100 188\" fill=\"none\" stroke=\"#C9A35A\" stroke-width=\"3\"/>", "rua_lon": "<rect x=\"0\" y=\"0\" width=\"200\" height=\"200\" fill=\"#B3E5FC\" stroke=\"none\"/><g transform=\"translate(100 108) scale(0.95)\"><path d=\"M-20 -20 C-50 -50 -80 -46 -84 -34 C-60 -30 -40 -16 -30 -4 Z M20 22 C40 44 60 52 70 46 C58 36 44 24 34 12 Z M-20 22 C-40 44 -60 52 -70 46 C-58 36 -44 24 -34 12 Z M20 -20 C50 -50 80 -46 84 -34 C60 -30 40 -16 30 -4 Z\" fill=\"#9BD67A\"/><path d=\"M0 -44 C-14 -44 -20 -58 -12 -68 C-4 -76 4 -76 12 -68 C20 -58 14 -44 0 -44 Z\" fill=\"#9BD67A\"/><circle cx=\"-6\" cy=\"-60\" r=\"4\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"-4.6\" cy=\"-61.4\" r=\"1.4\" fill=\"#fff\" stroke=\"none\"/><circle cx=\"6\" cy=\"-60\" r=\"4\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"7.4\" cy=\"-61.4\" r=\"1.4\" fill=\"#fff\" stroke=\"none\"/><ellipse cx=\"0\" cy=\"0\" rx=\"46\" ry=\"52\" fill=\"#4CAF50\"/><path d=\"M-18 -22 L18 -22 L28 0 L18 22 L-18 22 L-28 0 Z\" fill=\"#81C784\" stroke-width=\"3\"/><path d=\"M-18 -22 L-30 -38 M18 -22 L30 -38 M-28 0 L-46 0 M28 0 L46 0 M-18 22 L-30 38 M18 22 L30 38\" fill=\"none\" stroke-width=\"3\"/></g><circle cx=\"34\" cy=\"40\" r=\"6\" fill=\"#E3F2FD\" stroke-width=\"3\"/><circle cx=\"24\" cy=\"62\" r=\"4\" fill=\"#E3F2FD\" stroke-width=\"3\"/>", "dau_hat": "<path d=\"M14 168 Q100 150 186 168 L186 188 L14 188 Z\" fill=\"#A0673A\"/><path d=\"M40 176 L48 176 M120 178 L128 178 M80 182 L86 182\" fill=\"none\" stroke=\"#7A4A28\" stroke-width=\"3\"/><g transform=\"translate(78 150) scale(1.4)\"><path d=\"M0 0 C0 -16 30 -18 34 -4 C38 10 20 12 14 6 C8 12 0 10 0 0 Z\" fill=\"#C98B4E\"/><path d=\"M12 -6 C16 -8 20 -6 20 -2\" fill=\"none\" stroke-width=\"3\"/></g>", "dau_mam": "<path d=\"M14 168 Q100 150 186 168 L186 188 L14 188 Z\" fill=\"#A0673A\"/><path d=\"M40 176 L48 176 M120 178 L128 178 M80 182 L86 182\" fill=\"none\" stroke=\"#7A4A28\" stroke-width=\"3\"/><g transform=\"translate(70 166) scale(1.3)\"><path d=\"M0 0 C0 -16 30 -18 34 -4 C38 10 20 12 14 6 C8 12 0 10 0 0 Z\" fill=\"#C98B4E\"/><path d=\"M12 -6 C16 -8 20 -6 20 -2\" fill=\"none\" stroke-width=\"3\"/></g><path d=\"M94 172 C96 180 90 186 92 192\" fill=\"none\" stroke=\"#EFEBE9\" stroke-width=\"4\"/><path d=\"M96 160 C96 132.0 100 132.0 100 104\" fill=\"none\" stroke=\"#4CAF50\" stroke-width=\"7\"/><path d=\"M96 160 C96 132.0 100 132.0 100 104\" fill=\"none\" stroke=\"#81C784\" stroke-width=\"3\"/><path d=\"M100 104 C88 96 84 84 92 80 C100 86 102 96 100 104 Z\" fill=\"#AED581\"/>", "dau_cay_con": "<path d=\"M14 168 Q100 150 186 168 L186 188 L14 188 Z\" fill=\"#A0673A\"/><path d=\"M40 176 L48 176 M120 178 L128 178 M80 182 L86 182\" fill=\"none\" stroke=\"#7A4A28\" stroke-width=\"3\"/><path d=\"M100 162 C100 121.0 100 121.0 100 80\" fill=\"none\" stroke=\"#4CAF50\" stroke-width=\"7\"/><path d=\"M100 162 C100 121.0 100 121.0 100 80\" fill=\"none\" stroke=\"#81C784\" stroke-width=\"3\"/><path d=\"M0 0 C10 -14 30 -14 40 0 C30 10 10 10 0 0 Z\" fill=\"#81C784\" transform=\"translate(100 92) rotate(-150) scale(1.2)\"/><path d=\"M4 0 L34 0\" fill=\"none\" stroke-width=\"2.5\" transform=\"translate(100 92) rotate(-150) scale(1.2)\"/><path d=\"M0 0 C10 -14 30 -14 40 0 C30 10 10 10 0 0 Z\" fill=\"#81C784\" transform=\"translate(100 92) rotate(-30) scale(1.2)\"/><path d=\"M4 0 L34 0\" fill=\"none\" stroke-width=\"2.5\" transform=\"translate(100 92) rotate(-30) scale(1.2)\"/><path d=\"M0 0 C10 -14 30 -14 40 0 C30 10 10 10 0 0 Z\" fill=\"#81C784\" transform=\"translate(100 124) rotate(160) scale(0.9)\"/><path d=\"M4 0 L34 0\" fill=\"none\" stroke-width=\"2.5\" transform=\"translate(100 124) rotate(160) scale(0.9)\"/>", "dau_ra_hoa": "<path d=\"M14 168 Q100 150 186 168 L186 188 L14 188 Z\" fill=\"#A0673A\"/><path d=\"M40 176 L48 176 M120 178 L128 178 M80 182 L86 182\" fill=\"none\" stroke=\"#7A4A28\" stroke-width=\"3\"/><path d=\"M100 162 C100 96.0 100 96.0 100 30\" fill=\"none\" stroke=\"#4CAF50\" stroke-width=\"7\"/><path d=\"M100 162 C100 96.0 100 96.0 100 30\" fill=\"none\" stroke=\"#81C784\" stroke-width=\"3\"/><path d=\"M0 0 C10 -14 30 -14 40 0 C30 10 10 10 0 0 Z\" fill=\"#81C784\" transform=\"translate(100 132) rotate(160) scale(1.1)\"/><path d=\"M4 0 L34 0\" fill=\"none\" stroke-width=\"2.5\" transform=\"translate(100 132) rotate(160) scale(1.1)\"/><path d=\"M0 0 C10 -14 30 -14 40 0 C30 10 10 10 0 0 Z\" fill=\"#81C784\" transform=\"translate(100 110) rotate(10) scale(1.1)\"/><path d=\"M4 0 L34 0\" fill=\"none\" stroke-width=\"2.5\" transform=\"translate(100 110) rotate(10) scale(1.1)\"/><path d=\"M0 0 C10 -14 30 -14 40 0 C30 10 10 10 0 0 Z\" fill=\"#81C784\" transform=\"translate(100 84) rotate(170) scale(1.0)\"/><path d=\"M4 0 L34 0\" fill=\"none\" stroke-width=\"2.5\" transform=\"translate(100 84) rotate(170) scale(1.0)\"/><path d=\"M0 0 C10 -14 30 -14 40 0 C30 10 10 10 0 0 Z\" fill=\"#81C784\" transform=\"translate(100 62) rotate(-10) scale(0.9)\"/><path d=\"M4 0 L34 0\" fill=\"none\" stroke-width=\"2.5\" transform=\"translate(100 62) rotate(-10) scale(0.9)\"/><path d=\"M66 74 C56 62 64 54 70 64 C76 54 84 64 74 74 Z\" fill=\"#CE93D8\" stroke-width=\"3\"/><path d=\"M128 56 C118 44 126 36 132 46 C138 36 146 46 136 56 Z\" fill=\"#CE93D8\" stroke-width=\"3\"/><path d=\"M70 112 C60 100 68 92 74 102 C80 92 88 102 78 112 Z\" fill=\"#CE93D8\" stroke-width=\"3\"/><path d=\"M126 98 C116 86 124 78 130 88 C136 78 144 88 134 98 Z\" fill=\"#CE93D8\" stroke-width=\"3\"/>", "dau_qua": "<path d=\"M14 168 Q100 150 186 168 L186 188 L14 188 Z\" fill=\"#A0673A\"/><path d=\"M40 176 L48 176 M120 178 L128 178 M80 182 L86 182\" fill=\"none\" stroke=\"#7A4A28\" stroke-width=\"3\"/><path d=\"M100 162 C100 96.0 100 96.0 100 30\" fill=\"none\" stroke=\"#4CAF50\" stroke-width=\"7\"/><path d=\"M100 162 C100 96.0 100 96.0 100 30\" fill=\"none\" stroke=\"#81C784\" stroke-width=\"3\"/><path d=\"M0 0 C10 -14 30 -14 40 0 C30 10 10 10 0 0 Z\" fill=\"#81C784\" transform=\"translate(100 132) rotate(160) scale(1.1)\"/><path d=\"M4 0 L34 0\" fill=\"none\" stroke-width=\"2.5\" transform=\"translate(100 132) rotate(160) scale(1.1)\"/><path d=\"M0 0 C10 -14 30 -14 40 0 C30 10 10 10 0 0 Z\" fill=\"#81C784\" transform=\"translate(100 110) rotate(10) scale(1.1)\"/><path d=\"M4 0 L34 0\" fill=\"none\" stroke-width=\"2.5\" transform=\"translate(100 110) rotate(10) scale(1.1)\"/><path d=\"M0 0 C10 -14 30 -14 40 0 C30 10 10 10 0 0 Z\" fill=\"#81C784\" transform=\"translate(100 70) rotate(170) scale(1.0)\"/><path d=\"M4 0 L34 0\" fill=\"none\" stroke-width=\"2.5\" transform=\"translate(100 70) rotate(170) scale(1.0)\"/><g transform=\"translate(96 80) rotate(18)\"><path d=\"M0 0 C6 26 4 52 -10 66 C-18 52 -14 24 -8 0 Z\" fill=\"#9CCC65\"/><circle cx=\"-4\" cy=\"18\" r=\"4\" fill=\"#C5E1A5\" stroke-width=\"2.5\"/><circle cx=\"-5\" cy=\"34\" r=\"4\" fill=\"#C5E1A5\" stroke-width=\"2.5\"/><circle cx=\"-8\" cy=\"50\" r=\"4\" fill=\"#C5E1A5\" stroke-width=\"2.5\"/></g><g transform=\"translate(108 50) rotate(-24)\"><path d=\"M0 0 C6 26 4 52 -10 66 C-18 52 -14 24 -8 0 Z\" fill=\"#9CCC65\"/><circle cx=\"-4\" cy=\"18\" r=\"4\" fill=\"#C5E1A5\" stroke-width=\"2.5\"/><circle cx=\"-5\" cy=\"34\" r=\"4\" fill=\"#C5E1A5\" stroke-width=\"2.5\"/><circle cx=\"-8\" cy=\"50\" r=\"4\" fill=\"#C5E1A5\" stroke-width=\"2.5\"/></g><g transform=\"translate(98 112) rotate(30)\"><path d=\"M0 0 C6 26 4 52 -10 66 C-18 52 -14 24 -8 0 Z\" fill=\"#9CCC65\"/><circle cx=\"-4\" cy=\"18\" r=\"4\" fill=\"#C5E1A5\" stroke-width=\"2.5\"/><circle cx=\"-5\" cy=\"34\" r=\"4\" fill=\"#C5E1A5\" stroke-width=\"2.5\"/><circle cx=\"-8\" cy=\"50\" r=\"4\" fill=\"#C5E1A5\" stroke-width=\"2.5\"/></g>", "hd_hat": "<path d=\"M14 168 Q100 150 186 168 L186 188 L14 188 Z\" fill=\"#A0673A\"/><path d=\"M40 176 L48 176 M120 178 L128 178 M80 182 L86 182\" fill=\"none\" stroke=\"#7A4A28\" stroke-width=\"3\"/><g transform=\"translate(100 140) rotate(70) scale(1.3)\"><path d=\"M0 -24 C14 -24 18 0 0 26 C-18 0 -14 -24 0 -24 Z\" fill=\"#424242\"/><path d=\"M-5 -16 L-5 12 M5 -16 L5 12\" fill=\"none\" stroke=\"#FFFFFF\" stroke-width=\"3\"/></g>", "hd_mam": "<path d=\"M14 168 Q100 150 186 168 L186 188 L14 188 Z\" fill=\"#A0673A\"/><path d=\"M40 176 L48 176 M120 178 L128 178 M80 182 L86 182\" fill=\"none\" stroke=\"#7A4A28\" stroke-width=\"3\"/><path d=\"M100 162 C100 135.0 100 135.0 100 108\" fill=\"none\" stroke=\"#4CAF50\" stroke-width=\"7\"/><path d=\"M100 162 C100 135.0 100 135.0 100 108\" fill=\"none\" stroke=\"#81C784\" stroke-width=\"3\"/><path d=\"M100 110 C80 112 66 100 66 92 C82 88 96 96 100 110 Z M100 110 C120 112 134 100 134 92 C118 88 104 96 100 110 Z\" fill=\"#AED581\"/>", "hd_cay_non": "<path d=\"M14 168 Q100 150 186 168 L186 188 L14 188 Z\" fill=\"#A0673A\"/><path d=\"M40 176 L48 176 M120 178 L128 178 M80 182 L86 182\" fill=\"none\" stroke=\"#7A4A28\" stroke-width=\"3\"/><path d=\"M100 162 C100 113.0 100 113.0 100 64\" fill=\"none\" stroke=\"#4CAF50\" stroke-width=\"7\"/><path d=\"M100 162 C100 113.0 100 113.0 100 64\" fill=\"none\" stroke=\"#81C784\" stroke-width=\"3\"/><path d=\"M0 0 C10 -14 30 -14 40 0 C30 10 10 10 0 0 Z\" fill=\"#81C784\" transform=\"translate(100 132) rotate(160) scale(1.2)\"/><path d=\"M4 0 L34 0\" fill=\"none\" stroke-width=\"2.5\" transform=\"translate(100 132) rotate(160) scale(1.2)\"/><path d=\"M0 0 C10 -14 30 -14 40 0 C30 10 10 10 0 0 Z\" fill=\"#81C784\" transform=\"translate(100 112) rotate(20) scale(1.2)\"/><path d=\"M4 0 L34 0\" fill=\"none\" stroke-width=\"2.5\" transform=\"translate(100 112) rotate(20) scale(1.2)\"/><path d=\"M0 0 C10 -14 30 -14 40 0 C30 10 10 10 0 0 Z\" fill=\"#81C784\" transform=\"translate(100 86) rotate(165) scale(1.0)\"/><path d=\"M4 0 L34 0\" fill=\"none\" stroke-width=\"2.5\" transform=\"translate(100 86) rotate(165) scale(1.0)\"/><path d=\"M0 0 C10 -14 30 -14 40 0 C30 10 10 10 0 0 Z\" fill=\"#81C784\" transform=\"translate(100 72) rotate(15) scale(0.9)\"/><path d=\"M4 0 L34 0\" fill=\"none\" stroke-width=\"2.5\" transform=\"translate(100 72) rotate(15) scale(0.9)\"/>", "hd_nu": "<path d=\"M14 168 Q100 150 186 168 L186 188 L14 188 Z\" fill=\"#A0673A\"/><path d=\"M40 176 L48 176 M120 178 L128 178 M80 182 L86 182\" fill=\"none\" stroke=\"#7A4A28\" stroke-width=\"3\"/><path d=\"M100 162 C100 104.0 100 104.0 100 46\" fill=\"none\" stroke=\"#4CAF50\" stroke-width=\"7\"/><path d=\"M100 162 C100 104.0 100 104.0 100 46\" fill=\"none\" stroke=\"#81C784\" stroke-width=\"3\"/><path d=\"M0 0 C10 -14 30 -14 40 0 C30 10 10 10 0 0 Z\" fill=\"#81C784\" transform=\"translate(100 132) rotate(160) scale(1.2)\"/><path d=\"M4 0 L34 0\" fill=\"none\" stroke-width=\"2.5\" transform=\"translate(100 132) rotate(160) scale(1.2)\"/><path d=\"M0 0 C10 -14 30 -14 40 0 C30 10 10 10 0 0 Z\" fill=\"#81C784\" transform=\"translate(100 112) rotate(20) scale(1.2)\"/><path d=\"M4 0 L34 0\" fill=\"none\" stroke-width=\"2.5\" transform=\"translate(100 112) rotate(20) scale(1.2)\"/><path d=\"M0 0 C10 -14 30 -14 40 0 C30 10 10 10 0 0 Z\" fill=\"#81C784\" transform=\"translate(100 86) rotate(165) scale(1.0)\"/><path d=\"M4 0 L34 0\" fill=\"none\" stroke-width=\"2.5\" transform=\"translate(100 86) rotate(165) scale(1.0)\"/><path d=\"M100 18 C120 18 124 40 112 50 L88 50 C76 40 80 18 100 18 Z\" fill=\"#9CCC65\"/><path d=\"M92 50 L96 28 M108 50 L104 28 M100 50 L100 24\" fill=\"none\" stroke-width=\"2.5\"/><path d=\"M94 20 C98 14 102 14 106 20\" fill=\"#FFD54F\" stroke-width=\"3\"/>", "hd_hoa": "<path d=\"M14 168 Q100 150 186 168 L186 188 L14 188 Z\" fill=\"#A0673A\"/><path d=\"M40 176 L48 176 M120 178 L128 178 M80 182 L86 182\" fill=\"none\" stroke=\"#7A4A28\" stroke-width=\"3\"/><path d=\"M100 162 C100 126.0 100 126.0 100 90\" fill=\"none\" stroke=\"#4CAF50\" stroke-width=\"7\"/><path d=\"M100 162 C100 126.0 100 126.0 100 90\" fill=\"none\" stroke=\"#81C784\" stroke-width=\"3\"/><path d=\"M0 0 C10 -14 30 -14 40 0 C30 10 10 10 0 0 Z\" fill=\"#81C784\" transform=\"translate(100 140) rotate(160) scale(1.1)\"/><path d=\"M4 0 L34 0\" fill=\"none\" stroke-width=\"2.5\" transform=\"translate(100 140) rotate(160) scale(1.1)\"/><path d=\"M0 0 C10 -14 30 -14 40 0 C30 10 10 10 0 0 Z\" fill=\"#81C784\" transform=\"translate(100 122) rotate(20) scale(1.1)\"/><path d=\"M4 0 L34 0\" fill=\"none\" stroke-width=\"2.5\" transform=\"translate(100 122) rotate(20) scale(1.1)\"/><g transform=\"translate(100 64) scale(1.0)\"><ellipse cx=\"0\" cy=\"-34\" rx=\"10\" ry=\"20\" fill=\"#FFD54F\" transform=\"rotate(0)\"/><ellipse cx=\"0\" cy=\"-34\" rx=\"10\" ry=\"20\" fill=\"#FFD54F\" transform=\"rotate(30)\"/><ellipse cx=\"0\" cy=\"-34\" rx=\"10\" ry=\"20\" fill=\"#FFD54F\" transform=\"rotate(60)\"/><ellipse cx=\"0\" cy=\"-34\" rx=\"10\" ry=\"20\" fill=\"#FFD54F\" transform=\"rotate(90)\"/><ellipse cx=\"0\" cy=\"-34\" rx=\"10\" ry=\"20\" fill=\"#FFD54F\" transform=\"rotate(120)\"/><ellipse cx=\"0\" cy=\"-34\" rx=\"10\" ry=\"20\" fill=\"#FFD54F\" transform=\"rotate(150)\"/><ellipse cx=\"0\" cy=\"-34\" rx=\"10\" ry=\"20\" fill=\"#FFD54F\" transform=\"rotate(180)\"/><ellipse cx=\"0\" cy=\"-34\" rx=\"10\" ry=\"20\" fill=\"#FFD54F\" transform=\"rotate(210)\"/><ellipse cx=\"0\" cy=\"-34\" rx=\"10\" ry=\"20\" fill=\"#FFD54F\" transform=\"rotate(240)\"/><ellipse cx=\"0\" cy=\"-34\" rx=\"10\" ry=\"20\" fill=\"#FFD54F\" transform=\"rotate(270)\"/><ellipse cx=\"0\" cy=\"-34\" rx=\"10\" ry=\"20\" fill=\"#FFD54F\" transform=\"rotate(300)\"/><ellipse cx=\"0\" cy=\"-34\" rx=\"10\" ry=\"20\" fill=\"#FFD54F\" transform=\"rotate(330)\"/><circle r=\"24\" fill=\"#8D5A33\"/><circle cx=\"-8\" cy=\"-2\" r=\"4\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"-6.6\" cy=\"-3.4\" r=\"1.4\" fill=\"#fff\" stroke=\"none\"/><circle cx=\"8\" cy=\"-2\" r=\"4\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"9.4\" cy=\"-3.4\" r=\"1.4\" fill=\"#fff\" stroke=\"none\"/><path d=\"M-5.0 8 Q0 13 5.0 8\" fill=\"none\" stroke-width=\"3\"/></g>", "ech_trung": "<rect x=\"0\" y=\"0\" width=\"200\" height=\"200\" fill=\"#B3E5FC\" stroke=\"none\"/><path d=\"M0 170 Q100 154 200 170 L200 200 L0 200 Z\" fill=\"#A5D6A7\"/><circle cx=\"70\" cy=\"80\" r=\"15\" fill=\"#E3F2FD\" stroke-width=\"3\"/><circle cx=\"70\" cy=\"80\" r=\"5\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"98\" cy=\"72\" r=\"15\" fill=\"#E3F2FD\" stroke-width=\"3\"/><circle cx=\"98\" cy=\"72\" r=\"5\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"126\" cy=\"80\" r=\"15\" fill=\"#E3F2FD\" stroke-width=\"3\"/><circle cx=\"126\" cy=\"80\" r=\"5\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"56\" cy=\"106\" r=\"15\" fill=\"#E3F2FD\" stroke-width=\"3\"/><circle cx=\"56\" cy=\"106\" r=\"5\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"84\" cy=\"102\" r=\"15\" fill=\"#E3F2FD\" stroke-width=\"3\"/><circle cx=\"84\" cy=\"102\" r=\"5\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"112\" cy=\"100\" r=\"15\" fill=\"#E3F2FD\" stroke-width=\"3\"/><circle cx=\"112\" cy=\"100\" r=\"5\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"140\" cy=\"106\" r=\"15\" fill=\"#E3F2FD\" stroke-width=\"3\"/><circle cx=\"140\" cy=\"106\" r=\"5\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"70\" cy=\"128\" r=\"15\" fill=\"#E3F2FD\" stroke-width=\"3\"/><circle cx=\"70\" cy=\"128\" r=\"5\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"98\" cy=\"126\" r=\"15\" fill=\"#E3F2FD\" stroke-width=\"3\"/><circle cx=\"98\" cy=\"126\" r=\"5\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"126\" cy=\"130\" r=\"15\" fill=\"#E3F2FD\" stroke-width=\"3\"/><circle cx=\"126\" cy=\"130\" r=\"5\" fill=\"#3B2314\" stroke=\"none\"/>", "ech_nong_noc": "<rect x=\"0\" y=\"0\" width=\"200\" height=\"200\" fill=\"#B3E5FC\" stroke=\"none\"/><path d=\"M0 170 Q100 154 200 170 L200 200 L0 200 Z\" fill=\"#A5D6A7\"/><g transform=\"translate(80 96) scale(1.3)\"><path d=\"M14 0 C40 -18 60 14 84.0 -4 C60 22 40 10 14 10 Z\" fill=\"#558B2F\"/><ellipse cx=\"-6\" cy=\"4\" rx=\"28\" ry=\"22\" fill=\"#689F38\"/><circle cx=\"-18\" cy=\"-2\" r=\"5\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"-16.2\" cy=\"-3.8\" r=\"1.8\" fill=\"#fff\" stroke=\"none\"/><circle cx=\"4\" cy=\"-4\" r=\"4\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"5.4\" cy=\"-5.4\" r=\"1.4\" fill=\"#fff\" stroke=\"none\"/><path d=\"M-15.0 10 Q-10 14 -5.0 10\" fill=\"none\" stroke-width=\"3\"/></g>", "ech_moc_chan": "<rect x=\"0\" y=\"0\" width=\"200\" height=\"200\" fill=\"#B3E5FC\" stroke=\"none\"/><path d=\"M0 170 Q100 154 200 170 L200 200 L0 200 Z\" fill=\"#A5D6A7\"/><g transform=\"translate(80 96) scale(1.3)\"><path d=\"M14 0 C40 -18 60 14 84.0 -4 C60 22 40 10 14 10 Z\" fill=\"#558B2F\"/><path d=\"M8 12 C14 28 6 36 -2 40 L4 44 C16 38 24 26 18 10 Z\" fill=\"#7CB342\"/><ellipse cx=\"-6\" cy=\"4\" rx=\"28\" ry=\"22\" fill=\"#689F38\"/><circle cx=\"-18\" cy=\"-2\" r=\"5\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"-16.2\" cy=\"-3.8\" r=\"1.8\" fill=\"#fff\" stroke=\"none\"/><circle cx=\"4\" cy=\"-4\" r=\"4\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"5.4\" cy=\"-5.4\" r=\"1.4\" fill=\"#fff\" stroke=\"none\"/><path d=\"M-15.0 10 Q-10 14 -5.0 10\" fill=\"none\" stroke-width=\"3\"/></g><path d=\"M50 120 C44 132 50 140 56 142 L58 136 C54 134 52 130 56 122 Z\" fill=\"#7CB342\"/>", "ech_con": "<rect x=\"0\" y=\"0\" width=\"200\" height=\"200\" fill=\"#B3E5FC\" stroke=\"none\"/><path d=\"M0 170 Q100 154 200 170 L200 200 L0 200 Z\" fill=\"#A5D6A7\"/><g transform=\"translate(96 104) scale(0.85)\"><path d=\"M-52 40 C-74 40 -78 14 -60 6 C-46 0 -36 14 -34 30 Z M52 40 C74 40 78 14 60 6 C46 0 36 14 34 30 Z\" fill=\"#7CB342\"/><path d=\"M0 -40 C-38 -40 -54 -10 -54 16 C-54 44 -30 56 0 56 C30 56 54 44 54 16 C54 -10 38 -40 0 -40 Z\" fill=\"#8BC34A\"/><ellipse cx=\"0\" cy=\"28\" rx=\"30\" ry=\"22\" fill=\"#DCEDC8\"/><circle cx=\"-24\" cy=\"-38\" r=\"18\" fill=\"#8BC34A\"/><circle cx=\"24\" cy=\"-38\" r=\"18\" fill=\"#8BC34A\"/><circle cx=\"-24\" cy=\"-39\" r=\"10\" fill=\"#fff\" stroke-width=\"3\"/><circle cx=\"24\" cy=\"-39\" r=\"10\" fill=\"#fff\" stroke-width=\"3\"/><circle cx=\"-23\" cy=\"-38\" r=\"5\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"-21.2\" cy=\"-39.8\" r=\"1.8\" fill=\"#fff\" stroke=\"none\"/><circle cx=\"23\" cy=\"-38\" r=\"5\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"24.8\" cy=\"-39.8\" r=\"1.8\" fill=\"#fff\" stroke=\"none\"/><ellipse cx=\"-34\" cy=\"-6\" rx=\"6\" ry=\"3.5\" fill=\"#F8A5B8\" stroke=\"none\"/><ellipse cx=\"34\" cy=\"-6\" rx=\"6\" ry=\"3.5\" fill=\"#F8A5B8\" stroke=\"none\"/><path d=\"M-24 -10 Q0 8 24 -10\" fill=\"none\" stroke-width=\"3.5\"/><ellipse cx=\"-18\" cy=\"54\" rx=\"14\" ry=\"6\" fill=\"#8BC34A\"/><ellipse cx=\"18\" cy=\"54\" rx=\"14\" ry=\"6\" fill=\"#8BC34A\"/></g><path d=\"M130 140 C150 146 160 140 166 132\" fill=\"none\" stroke=\"#558B2F\" stroke-width=\"8\"/>", "ech_lon": "<rect x=\"0\" y=\"0\" width=\"200\" height=\"200\" fill=\"#B3E5FC\" stroke=\"none\"/><ellipse cx=\"100\" cy=\"168\" rx=\"86\" ry=\"26\" fill=\"#66BB6A\"/><g transform=\"translate(100 104) scale(1.1)\"><path d=\"M-52 40 C-74 40 -78 14 -60 6 C-46 0 -36 14 -34 30 Z M52 40 C74 40 78 14 60 6 C46 0 36 14 34 30 Z\" fill=\"#7CB342\"/><path d=\"M0 -40 C-38 -40 -54 -10 -54 16 C-54 44 -30 56 0 56 C30 56 54 44 54 16 C54 -10 38 -40 0 -40 Z\" fill=\"#8BC34A\"/><ellipse cx=\"0\" cy=\"28\" rx=\"30\" ry=\"22\" fill=\"#DCEDC8\"/><circle cx=\"-24\" cy=\"-38\" r=\"18\" fill=\"#8BC34A\"/><circle cx=\"24\" cy=\"-38\" r=\"18\" fill=\"#8BC34A\"/><circle cx=\"-24\" cy=\"-39\" r=\"10\" fill=\"#fff\" stroke-width=\"3\"/><circle cx=\"24\" cy=\"-39\" r=\"10\" fill=\"#fff\" stroke-width=\"3\"/><circle cx=\"-23\" cy=\"-38\" r=\"5\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"-21.2\" cy=\"-39.8\" r=\"1.8\" fill=\"#fff\" stroke=\"none\"/><circle cx=\"23\" cy=\"-38\" r=\"5\" fill=\"#3B2314\" stroke=\"none\"/><circle cx=\"24.8\" cy=\"-39.8\" r=\"1.8\" fill=\"#fff\" stroke=\"none\"/><ellipse cx=\"-34\" cy=\"-6\" rx=\"6\" ry=\"3.5\" fill=\"#F8A5B8\" stroke=\"none\"/><ellipse cx=\"34\" cy=\"-6\" rx=\"6\" ry=\"3.5\" fill=\"#F8A5B8\" stroke=\"none\"/><path d=\"M-24 -10 Q0 8 24 -10\" fill=\"none\" stroke-width=\"3.5\"/><ellipse cx=\"-18\" cy=\"54\" rx=\"14\" ry=\"6\" fill=\"#8BC34A\"/><ellipse cx=\"18\" cy=\"54\" rx=\"14\" ry=\"6\" fill=\"#8BC34A\"/></g>"});
  const CYCLES = Object.freeze([{"id": "chicken", "title": "Vòng đời con gà", "emoji": "🐔", "tone": "amber", "intro": "Gà mẹ đẻ trứng, trứng nở ra gà con, gà con lớn lên lại đẻ trứng.", "stages": [{"key": "ga_trung", "name": "Quả trứng", "fact": "Gà mẹ đẻ trứng và nằm ấp cho trứng luôn ấm."}, {"key": "ga_no", "name": "Gà con nở", "fact": "Khoảng 21 ngày sau, gà con mổ vỡ vỏ trứng để chui ra."}, {"key": "ga_con", "name": "Gà con", "fact": "Gà con có bộ lông vàng mềm, lon ton theo mẹ đi kiếm ăn."}, {"key": "ga_lon", "name": "Gà trưởng thành", "fact": "Gà con lớn lên thành gà trưởng thành. Gà mái lại đẻ trứng."}]}, {"id": "butterfly", "title": "Vòng đời con bướm", "emoji": "🦋", "tone": "pink", "intro": "Từ quả trứng nhỏ xíu, con sâu biến hình thành con bướm xinh đẹp.", "stages": [{"key": "buom_trung", "name": "Trứng trên lá", "fact": "Bướm mẹ đẻ những quả trứng nhỏ xíu trên lá cây."}, {"key": "buom_sau", "name": "Con sâu", "fact": "Trứng nở ra sâu. Sâu ăn lá rất nhiều nên lớn rất nhanh."}, {"key": "buom_nhong", "name": "Con nhộng", "fact": "Sâu treo mình lên cành và hoá thành nhộng. Bên trong, sâu đang dần biến thành bướm."}, {"key": "buom_lon", "name": "Con bướm", "fact": "Bướm chui ra khỏi nhộng, chờ cánh khô rồi bay đi. Bướm mẹ lại đẻ trứng."}]}, {"id": "water", "title": "Vòng tuần hoàn của nước", "emoji": "💧", "tone": "teal", "intro": "Nước không mất đi đâu cả: nước bay lên trời, rồi lại rơi xuống thành mưa.", "stages": [{"key": "nuoc_bien", "name": "Nước ở sông, biển", "fact": "Nước có ở sông, hồ và biển."}, {"key": "nuoc_boc_hoi", "name": "Nước bốc hơi", "fact": "Mặt Trời làm nước nóng lên, nước biến thành hơi nước bay lên cao."}, {"key": "nuoc_may", "name": "Mây", "fact": "Lên cao gặp lạnh, hơi nước thành những giọt nước li ti, tụ lại thành mây."}, {"key": "nuoc_mua", "name": "Mưa", "fact": "Giọt nước trong mây to và nặng dần, rơi xuống thành mưa rồi chảy về sông, biển."}]}, {"id": "bee", "title": "Vòng đời con ong", "emoji": "🐝", "tone": "amber", "intro": "Ong lớn lên trong những ô sáp hình lục giác của tổ ong.", "stages": [{"key": "ong_trung", "name": "Trứng trong ô", "fact": "Ong chúa đẻ mỗi quả trứng vào một ô nhỏ hình lục giác trong tổ."}, {"key": "ong_au_trung", "name": "Ấu trùng", "fact": "Trứng nở thành ấu trùng màu trắng, được ong thợ chăm cho ăn."}, {"key": "ong_nhong", "name": "Nhộng", "fact": "Ô tổ được đậy nắp lại. Bên trong, ấu trùng biến thành nhộng."}, {"key": "ong_lon", "name": "Ong trưởng thành", "fact": "Ong cắn nắp ô chui ra và bắt đầu làm việc cho cả tổ."}]}, {"id": "turtle", "title": "Vòng đời rùa biển", "emoji": "🐢", "tone": "teal", "intro": "Rùa biển sống ở biển, nhưng rùa mẹ lại lên bãi cát để đẻ trứng.", "stages": [{"key": "rua_trung", "name": "Trứng trong cát", "fact": "Rùa mẹ bò lên bãi cát, đào hố đẻ trứng rồi lấp cát lại."}, {"key": "rua_no", "name": "Rùa con nở", "fact": "Khoảng hai tháng sau, rùa con phá vỏ trứng chui ra."}, {"key": "rua_ra_bien", "name": "Rùa con ra biển", "fact": "Rùa con bò thật nhanh về phía biển."}, {"key": "rua_lon", "name": "Rùa trưởng thành", "fact": "Rùa con lớn lên ở biển. Rùa mẹ lại quay về bãi cát để đẻ trứng."}]}, {"id": "bean", "title": "Vòng đời cây đậu", "emoji": "🌱", "tone": "teal", "intro": "Từ một hạt đậu nhỏ, cây lớn lên, ra hoa, kết quả và cho hạt mới.", "stages": [{"key": "dau_hat", "name": "Hạt đậu", "fact": "Hạt đậu được gieo xuống đất ẩm."}, {"key": "dau_mam", "name": "Nảy mầm", "fact": "Có nước và hơi ấm, hạt nảy mầm: rễ mọc xuống, mầm nhú lên."}, {"key": "dau_cay_con", "name": "Cây con", "fact": "Cây con mọc lá xanh và cần ánh nắng để lớn."}, {"key": "dau_ra_hoa", "name": "Cây ra hoa", "fact": "Cây lớn dần và nở hoa."}, {"key": "dau_qua", "name": "Quả đậu", "fact": "Hoa kết thành quả đậu. Trong quả có hạt, gieo xuống lại mọc thành cây mới."}]}, {"id": "sunflower", "title": "Vòng đời hoa hướng dương", "emoji": "🌻", "tone": "amber", "intro": "Hạt hướng dương nhỏ xíu mọc thành bông hoa cao lớn, giữa hoa lại có thật nhiều hạt.", "stages": [{"key": "hd_hat", "name": "Hạt hướng dương", "fact": "Hạt hướng dương có vỏ sọc đen trắng."}, {"key": "hd_mam", "name": "Hạt nảy mầm", "fact": "Hạt nảy mầm, hai lá mầm nhú lên khỏi mặt đất."}, {"key": "hd_cay_non", "name": "Cây non", "fact": "Cây non mọc thêm lá và vươn cao về phía Mặt Trời."}, {"key": "hd_nu", "name": "Nụ hoa", "fact": "Trên ngọn cây xuất hiện một nụ hoa."}, {"key": "hd_hoa", "name": "Hoa nở", "fact": "Nụ nở thành bông hướng dương. Giữa hoa có rất nhiều hạt mới."}]}, {"id": "frog", "title": "Vòng đời con ếch", "emoji": "🐸", "tone": "purple", "intro": "Ếch sống dưới nước khi còn nhỏ, lớn lên mới lên được bờ.", "stages": [{"key": "ech_trung", "name": "Trứng ếch", "fact": "Ếch mẹ đẻ trứng thành từng đám dưới nước."}, {"key": "ech_nong_noc", "name": "Nòng nọc", "fact": "Trứng nở thành nòng nọc. Nòng nọc có đuôi dài và sống dưới nước."}, {"key": "ech_moc_chan", "name": "Nòng nọc mọc chân", "fact": "Nòng nọc lớn dần, mọc chân sau rồi mọc chân trước."}, {"key": "ech_con", "name": "Ếch con", "fact": "Đuôi ngắn dần. Ếch con bắt đầu nhảy lên bờ."}, {"key": "ech_lon", "name": "Ếch trưởng thành", "fact": "Ếch con lớn thành ếch trưởng thành. Ếch mẹ lại đẻ trứng dưới nước."}]}]);

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

  function stopSpeak() {
    ttsNonce += 1;
    ttsQueue = [];
    try {
      ttsAudio.pause();
      ttsAudio.currentTime = 0;
      ttsAudio.removeAttribute("src");
      ttsAudio.load();
    } catch (_) {}
  }

  function playNextTts(nonce, quiet) {
    if (nonce !== ttsNonce || !ttsQueue.length) return;
    const chunk = ttsQueue.shift();
    try {
      ttsAudio.pause();
      ttsAudio.currentTime = 0;
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
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      .ee-life{padding:.2rem .15rem .8rem;color:#334155}
      .ee-life-hero{display:grid;grid-template-columns:1.2fr .8fr;gap:.8rem;border:1px solid #bbf7d0;border-radius:22px;background:linear-gradient(135deg,#f0fdf4,#ecfeff,#fefce8);padding:1rem;margin:.2rem 0 .9rem}
      .ee-life-hero h2{margin:0 0 .3rem;color:#047857;font-size:22px}.ee-life-hero p{margin:0;color:#475569;font-weight:800;line-height:1.5}
      .ee-life-bunny{display:flex;align-items:center;gap:.7rem;border:1px solid #fbcfe8;border-radius:16px;background:#fff7fb;padding:.8rem}.ee-life-bunny .icon{font-size:36px}.ee-life-bunny strong{display:block;color:#9d174d}.ee-life-bunny span{display:block;font-size:13px;font-weight:800;line-height:1.45}
      .ee-life-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:.7rem}
      .ee-life-card{min-width:0;border:1px solid #e5e7eb;border-radius:18px;padding:.6rem;background:#fff;cursor:pointer;text-align:left;font:inherit;box-shadow:0 8px 18px rgba(15,23,42,.05);transition:transform .16s,box-shadow .16s}
      .ee-life-card:hover{transform:translateY(-2px);box-shadow:0 10px 22px rgba(15,23,42,.09)}
      .ee-life-card[data-tone="pink"]{background:#fff1f7;border-color:#fbcfe8}.ee-life-card[data-tone="teal"]{background:#ecfdf5;border-color:#99f6e4}.ee-life-card[data-tone="amber"]{background:#fffbeb;border-color:#fde68a}.ee-life-card[data-tone="purple"]{background:#f5f3ff;border-color:#ddd6fe}
      .ee-life-card .ee-life-art{display:block;width:100%;aspect-ratio:4/3;border-radius:12px;border:1px solid rgba(148,163,184,.25);background:#fff}
      .ee-life-strip{display:flex;gap:3px;margin-top:.4rem}.ee-life-strip svg{flex:1;min-width:0;aspect-ratio:1/1;border-radius:6px;border:1px solid #e2e8f0}
      .ee-life-card h3{margin:.45rem 0 .25rem;color:#065f46;font-size:15px;line-height:1.25;min-height:2.5em}
      .ee-life-meta{display:flex;gap:.3rem;flex-wrap:wrap;align-items:center}.ee-life-chip{border:1px solid #a7f3d0;background:#fff;border-radius:999px;padding:.2rem .5rem;color:#047857;font-size:11px;font-weight:1000}
      .ee-life-stars{color:#f59e0b;font-size:14px;letter-spacing:1px}.ee-life-stars .off{color:#e2e8f0}
      .ee-life-btn{min-height:48px;border-radius:14px;border:2px solid #a7f3d0;background:#fff;color:#047857;padding:.6rem 1rem;font:inherit;font-weight:1000;font-size:15px;cursor:pointer;white-space:nowrap}
      .ee-life-btn.primary{border:none;color:#fff;background:linear-gradient(90deg,#10b981,#06b6d4);box-shadow:0 8px 16px rgba(16,185,129,.2)}
      .ee-life-btn.pink{border-color:#f9a8d4;color:#9d174d;background:#fdf2f8}
      .ee-life-btn:disabled{opacity:.45;cursor:not-allowed}
      .ee-life-btn:focus-visible,.ee-life-card:focus-visible,.ee-life-slot:focus-visible,.ee-life-tcard:focus-visible{outline:3px solid #f472b6;outline-offset:2px}
      .ee-life-ask{display:flex;align-items:center;justify-content:space-between;gap:.6rem;flex-wrap:wrap;border:1px solid #bbf7d0;border-radius:18px;background:#f0fdf4;padding:.75rem .9rem;margin-bottom:.8rem}
      .ee-life-ask p{margin:0;color:#065f46;font-size:17px;font-weight:900;line-height:1.45;flex:1;min-width:240px}
      .ee-life-play{display:grid;grid-template-columns:minmax(0,1.05fr) minmax(0,.95fr);gap:.9rem;align-items:start}
      .ee-life-ringbox{border:1px solid #e2e8f0;border-radius:22px;background:#fff;padding:.6rem}
      .ee-life-ring{position:relative;width:100%;aspect-ratio:1/1;max-width:560px;margin:0 auto}
      .ee-life-ring > svg.arrows{position:absolute;inset:0;width:100%;height:100%;pointer-events:none}
      .ee-life-ring .arrows path{fill:none;stroke:#86efac;stroke-width:1.6;stroke-linecap:round}
      .ee-life-ring.solved .arrows path{stroke:#10b981;stroke-dasharray:3 2.2;animation:eeLifeFlow 1.2s linear infinite}
      @keyframes eeLifeFlow{to{stroke-dashoffset:-10.4}}
      .ee-life-center{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:30%;text-align:center;color:#047857;font-weight:1000;font-size:clamp(11px,1.6vw,15px);line-height:1.25}
      .ee-life-center .em{display:block;font-size:clamp(26px,5vw,44px)}
      .ee-life-slot{position:absolute;transform:translate(-50%,-50%);border-radius:18px;border:3px dashed #a7f3d0;background:#f8fffb;padding:0;cursor:pointer;font:inherit;display:flex;flex-direction:column;align-items:stretch;overflow:hidden;transition:transform .15s,border-color .15s,box-shadow .15s}
      .ee-life-slot .num{position:absolute;left:6px;top:6px;z-index:2;width:26px;height:26px;border-radius:50%;background:#10b981;color:#fff;font-size:14px;font-weight:1000;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 0 rgba(0,0,0,.08)}
      .ee-life-slot .empty{flex:1;display:flex;align-items:center;justify-content:center;color:#6ee7b7;font-size:clamp(26px,5vw,46px);font-weight:1000}
      .ee-life-slot .start{position:absolute;right:6px;top:7px;z-index:2;background:#fef3c7;color:#92400e;border:1px solid #fcd34d;border-radius:999px;padding:.05rem .45rem;font-size:11px;font-weight:1000;white-space:nowrap}
      .ee-life-slot.filled{border-style:solid;border-color:#cbd5e1;background:#fff}
      .ee-life-slot.selected{border-color:#ec4899;box-shadow:0 0 0 4px #fce7f3}
      .ee-life-slot.ok{border-color:#10b981;box-shadow:0 0 0 4px #d1fae5}
      .ee-life-slot.bad{border-color:#ef4444;box-shadow:0 0 0 4px #fee2e2;animation:eeLifeShake .45s}
      @keyframes eeLifeShake{0%,100%{transform:translate(-50%,-50%)}25%{transform:translate(calc(-50% - 6px),-50%)}75%{transform:translate(calc(-50% + 6px),-50%)}}
      .ee-life-slot .ee-life-art{display:block;width:100%;flex:1;min-height:0}
      .ee-life-slot .name{background:#f8fafc;border-top:1px solid #e2e8f0;color:#334155;font-size:clamp(10px,1.3vw,13px);font-weight:1000;padding:.2rem .25rem;line-height:1.2;text-align:center}
      .ee-life-side{display:grid;gap:.7rem}
      .ee-life-panel{border:1px solid #e2e8f0;border-radius:20px;background:#fff;padding:.8rem}
      .ee-life-panel h3{margin:0 0 .55rem;color:#065f46;font-size:17px}
      .ee-life-tray{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:.55rem}
      .ee-life-tcard{border:2px solid #e2e8f0;border-radius:16px;background:#fff;padding:0;cursor:pointer;font:inherit;overflow:hidden;display:flex;flex-direction:column;transition:transform .12s,border-color .12s}
      .ee-life-tcard:hover{transform:translateY(-2px);border-color:#6ee7b7}
      .ee-life-tcard .ee-life-art{display:block;width:100%;aspect-ratio:1/1}
      .ee-life-tcard .name{border-top:1px solid #e2e8f0;background:#f8fafc;color:#334155;font-size:13px;font-weight:1000;padding:.3rem .25rem;text-align:center;line-height:1.25}
      .ee-life-tray-empty{grid-column:1/-1;color:#64748b;font-weight:900;text-align:center;padding:.7rem}
      .ee-life-actions{display:grid;grid-template-columns:1fr 1fr;gap:.5rem}
      .ee-life-actions .wide{grid-column:1/-1}
      .ee-life-msg{display:flex;gap:.55rem;align-items:flex-start;border:1px solid #fde68a;border-radius:16px;background:#fffbeb;padding:.7rem .8rem;color:#92400e;font-size:15px;font-weight:900;line-height:1.45}
      .ee-life-msg .icon{font-size:24px;line-height:1}
      .ee-life-voice-note{margin:.2rem 0 0;color:#9a3412;font-size:12px;font-weight:800}
      .ee-life-win{text-align:center}
      .ee-life-win h3{font-size:22px;color:#be185d;margin:.2rem 0}
      .ee-life-win .big-stars{font-size:34px;color:#f59e0b;letter-spacing:4px}.ee-life-win .big-stars .off{color:#e2e8f0}
      .ee-life-learn{display:grid;gap:.5rem}
      .ee-life-learn-item{display:grid;grid-template-columns:64px 1fr auto;gap:.6rem;align-items:center;border:1px solid #e2e8f0;border-radius:14px;padding:.4rem .5rem;background:#fff}
      .ee-life-learn-item .ee-life-art{width:64px;height:64px;border-radius:10px;border:1px solid #e2e8f0}
      .ee-life-learn-item strong{display:block;color:#065f46;font-size:15px}
      .ee-life-learn-item span{display:block;color:#475569;font-size:13.5px;font-weight:800;line-height:1.4}
      .ee-life-mini{min-width:44px;min-height:44px;border-radius:12px;border:2px solid #f9a8d4;background:#fdf2f8;cursor:pointer;font-size:18px}
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
        <div class="ee-life-grid">
          ${CYCLES.map((c, i) => `<button class="ee-life-card" data-tone="${esc(c.tone)}" data-cycle="${esc(c.id)}" type="button">
              ${art(c.stages[c.stages.length - 1].key)}
              <h3>${i + 1}. ${esc(c.emoji)} ${esc(c.title)}</h3>
              <div class="ee-life-meta"><span class="ee-life-chip">${c.stages.length} giai đoạn</span><span class="ee-life-chip">${difficulty(c)}</span>${starHtml(stars[c.id] || 0)}</div>
            </button>`).join("")}
        </div>
      </div>`;
    host.querySelector("#ee-life-back-games")?.addEventListener("click", () => activeContext && activeContext.back && activeContext.back());
    host.querySelectorAll("[data-cycle]").forEach((b) => b.addEventListener("click", () => {
      const c = CYCLES.find((x) => x.id === b.dataset.cycle);
      if (c) startCycle(c);
    }));
  }

  /* ---------- màn chơi ---------- */
  function startCycle(c) {
    clearTimers(); stopSpeak();
    current = c;
    const n = c.stages.length;
    placed = Array(n).fill(null);
    locked = Array(n).fill(false);
    tray = shuffle([...Array(n).keys()]);
    selectedSlot = null; hintsUsed = 0; wrongRounds = 0; busy = false; solved = false;
    message = `Bé chạm vào một thẻ, thẻ sẽ bay vào ô trống đầu tiên. Muốn đặt vào ô khác thì chạm vào ô đó trước.`;
    renderPlay();
  }

  function askText(c) {
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
        ? `${art(c.stages[s].key)}<span class="name">${esc(c.stages[s].name)}</span>`
        : `<span class="empty">${i + 1}</span>`;
      const label = s != null ? `Ô ${i + 1}: ${c.stages[s].name}${locked[i] ? ", đúng rồi" : ". Chạm để lấy thẻ ra"}` : `Ô ${i + 1} đang trống. Chạm để chọn ô này`;
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
        <h3>🃏 Các thẻ cần xếp</h3>
        <div class="ee-life-tray">${tray.length ? tray.map((s) => `<button type="button" class="ee-life-tcard" data-card="${s}" aria-label="Thẻ ${esc(c.stages[s].name)}">${art(c.stages[s].key)}<span class="name">${esc(c.stages[s].name)}</span></button>`).join("") : `<div class="ee-life-tray-empty">Đã xếp hết thẻ. Bé bấm “Kiểm tra” nhé!</div>`}</div>
      </section>
      <div class="ee-life-actions">
        <button id="ee-life-check" class="ee-life-btn primary wide" type="button" ${allFilled && !busy ? "" : "disabled"}>✅ Kiểm tra</button>
        <button id="ee-life-hint" class="ee-life-btn" type="button" ${busy ? "disabled" : ""}>💡 Gợi ý</button>
        <button id="ee-life-reset" class="ee-life-btn" type="button" ${busy ? "disabled" : ""}>🔄 Xếp lại</button>
      </div>`;
  }

  function sideWinHtml(c, n) {
    const idx = CYCLES.indexOf(c);
    const next = CYCLES[idx + 1];
    return `
      <section class="ee-life-panel ee-life-win">
        <div style="font-size:42px" aria-hidden="true">🎉🐰</div>
        <h3>Đúng rồi! Bé giỏi quá!</h3>
        <div class="big-stars">${[1, 2, 3].map((i) => `<span class="${i <= n ? "" : "off"}">★</span>`).join("")}</div>
        <p style="margin:.4rem 0 0;font-weight:800;color:#475569">${n === 3 ? "Xếp đúng ngay lần đầu, không cần gợi ý!" : "Lần sau thử xếp mà không cần gợi ý để được 3 sao nhé."}</p>
      </section>
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
      { level: 3, title: `${GAME_NUMBER}.${idx} ${c.title}`, action: null }
    ]);
    const n = solved ? lastStars : 0;
    host.innerHTML = `
      <div class="ee-life">
        <div class="section-heading">
          <div><h1>${esc(c.emoji)} ${esc(c.title)}</h1><p>${c.stages.length} giai đoạn • ${difficulty(c)}</p></div>
          <button id="ee-life-back" class="back-btn" type="button">← ${CYCLES.length} vòng đời</button>
        </div>
        <div class="ee-life-ask">
          <p>${esc(c.intro)} Bé hãy xếp các thẻ theo đúng thứ tự, bắt đầu từ ô số 1.</p>
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
    message = tray.length ? `Đã đặt “${current.stages[stageIdx].name}” vào ô ${slot + 1}.` : "Xếp đủ rồi! Bé bấm “Kiểm tra” xem đúng chưa nhé.";
    renderPlay();
  }

  function tapSlot(i) {
    if (busy || solved || locked[i]) return;
    if (placed[i] != null) {
      tray.push(placed[i]);
      message = `Đã lấy “${current.stages[placed[i]].name}” ra khỏi ô ${i + 1}.`;
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
    message = `Có ${wrongCount} thẻ chưa đúng chỗ. Các thẻ đúng đã được giữ lại, bé thử xếp lại những thẻ còn lại nhé!`;
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
    saveStars(c.id, n);
    lastStars = n;
    message = "";
    renderPlay();
    speak(`Đúng rồi! Bé giỏi quá! ${c.title}: ${c.stages.map((s) => s.name).join(", rồi ")}. Rồi vòng đời lại bắt đầu.`, true);
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
    host.querySelector("#ee-life-next")?.addEventListener("click", () => startCycle(CYCLES[CYCLES.indexOf(c) + 1]));
    host.querySelector("#ee-life-say-all")?.addEventListener("click", () => speak(`${c.title}. ` + c.stages.map((s, i) => `Giai đoạn ${i + 1}, ${s.name}. ${s.fact}`).join(" ") + " Và thế là vòng đời lại bắt đầu."));
    host.querySelectorAll("[data-say]").forEach((b) => b.addEventListener("click", () => {
      const s = c.stages[Number(b.dataset.say)];
      speak(`${s.name}. ${s.fact}`);
    }));
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
  }

  window.CLASS1_GAME_MODULES = window.CLASS1_GAME_MODULES || {};
  window.CLASS1_GAME_MODULES[MODULE_KEY] = Object.freeze({ render, destroy });
})();

(() => {
  "use strict";

  const MODULE_KEY = "missingPiece";
  const STYLE_ID = "class1-games-missing-piece-style-v3";
  const GAME_NUMBER = 6;

  let activeContext = null;
  let currentLevelIndex = -1;
  let currentRoundIndex = -1;
  let leftSelected = "";
  let rightSelected = "";
  let matched = new Set();
  let hinted = new Set();
  let revealed = new Set();
  let secondHintChoices = new Set();
  let wrongAttempts = 0;
  let rightOrder = [];
  let toastTimer = 0;

  const LEVELS = [
  {
    "id": "l1",
    "title": "Cấp 1 · Cặp quen thuộc",
    "tone": "pink",
    "summary": "Quan hệ trực tiếp nhưng vẫn phải đọc kỹ.",
    "rounds": [
      {
        "title": "Ai đi với ai?",
        "prompt": "Ghép con vật với thức ăn phù hợp nhất trong các lựa chọn.",
        "tip": "Hãy nghĩ: mỗi con vật thường gắn với món ăn nào nhất trong bốn lựa chọn.",
        "pairs": [
          {
            "left": {
              "text": "Thỏ",
              "icon": "🐰"
            },
            "right": {
              "text": "Cà rốt",
              "icon": "🥕"
            },
            "why": "Cà rốt là một loại rau củ mà thỏ có thể ăn; trong các lựa chọn đây là cặp phù hợp nhất."
          },
          {
            "left": {
              "text": "Gấu trúc",
              "icon": "🐼"
            },
            "right": {
              "text": "Tre",
              "icon": "🎋"
            },
            "why": "Tre là nguồn thức ăn rất quen thuộc của gấu trúc."
          },
          {
            "left": {
              "text": "Mèo",
              "icon": "🐱"
            },
            "right": {
              "text": "Cá",
              "icon": "🐟"
            },
            "why": "Mèo có thể ăn cá; đây là lựa chọn phù hợp và riêng biệt trong màn này."
          },
          {
            "left": {
              "text": "Khỉ",
              "icon": "🐵"
            },
            "right": {
              "text": "Chuối",
              "icon": "🍌"
            },
            "why": "Chuối là loại quả thường được dùng để minh họa thức ăn của khỉ trong bài học trẻ em."
          }
        ]
      },
      {
        "title": "Đồ vật và công dụng",
        "prompt": "Ghép đồ vật với công dụng chính của nó.",
        "tip": "Đừng ghép theo nơi thường thấy. Hãy ghép đúng theo công dụng chính.",
        "pairs": [
          {
            "left": {
              "text": "Ô",
              "icon": "☂️"
            },
            "right": {
              "text": "Che mưa",
              "icon": "🌧️"
            },
            "why": "Ô được mở ra để che mưa hoặc che nắng; ở màn này công dụng cần tìm là che mưa."
          },
          {
            "left": {
              "text": "Kéo",
              "icon": "✂️"
            },
            "right": {
              "text": "Cắt giấy",
              "icon": "📄"
            },
            "why": "Kéo có hai lưỡi dùng để cắt; cắt giấy là công dụng rõ nhất trong các lựa chọn."
          },
          {
            "left": {
              "text": "Bút chì",
              "icon": "✏️"
            },
            "right": {
              "text": "Viết và vẽ",
              "icon": "📝"
            },
            "why": "Bút chì dùng để tạo nét chữ và nét vẽ trên giấy."
          },
          {
            "left": {
              "text": "Cốc",
              "icon": "🥛"
            },
            "right": {
              "text": "Đựng nước uống",
              "icon": "💧"
            },
            "why": "Cốc là đồ dùng để chứa nước hoặc đồ uống khi uống."
          }
        ]
      },
      {
        "title": "Ở đâu nhỉ?",
        "prompt": "Ghép hoạt động với nơi phù hợp nhất.",
        "tip": "Mỗi hoạt động chỉ có một nơi được thiết kế phù hợp nhất trong màn này.",
        "pairs": [
          {
            "left": {
              "text": "Đọc sách",
              "icon": "📖"
            },
            "right": {
              "text": "Thư viện",
              "icon": "📚"
            },
            "why": "Thư viện là nơi dành cho việc đọc, mượn và tìm sách."
          },
          {
            "left": {
              "text": "Bơi",
              "icon": "🏊"
            },
            "right": {
              "text": "Bể bơi",
              "icon": "🌊"
            },
            "why": "Bể bơi được thiết kế để mọi người tập bơi và vui chơi dưới nước."
          },
          {
            "left": {
              "text": "Nấu ăn",
              "icon": "🍳"
            },
            "right": {
              "text": "Nhà bếp",
              "icon": "🍽️"
            },
            "why": "Nhà bếp là nơi chuẩn bị và nấu thức ăn."
          },
          {
            "left": {
              "text": "Ngủ",
              "icon": "😴"
            },
            "right": {
              "text": "Phòng ngủ",
              "icon": "🛏️"
            },
            "why": "Phòng ngủ là nơi phù hợp nhất để nghỉ ngơi và ngủ."
          }
        ]
      },
      {
        "title": "Ai dùng món này?",
        "prompt": "Ghép người với đồ dùng đặc trưng nhất cho công việc hoặc hoạt động.",
        "tip": "Tìm đồ vật đặc trưng nhất, không phải bất cứ thứ gì người đó cũng có thể dùng.",
        "pairs": [
          {
            "left": {
              "text": "Bác sĩ",
              "icon": "🧑‍⚕️"
            },
            "right": {
              "text": "Ống nghe",
              "icon": "🩺"
            },
            "why": "Bác sĩ dùng ống nghe để nghe tim và phổi khi khám bệnh."
          },
          {
            "left": {
              "text": "Họa sĩ",
              "icon": "🧑‍🎨"
            },
            "right": {
              "text": "Cọ vẽ",
              "icon": "🖌️"
            },
            "why": "Cọ vẽ là dụng cụ đặc trưng để họa sĩ đưa màu lên tranh."
          },
          {
            "left": {
              "text": "Đầu bếp",
              "icon": "🧑‍🍳"
            },
            "right": {
              "text": "Nồi",
              "icon": "🍲"
            },
            "why": "Nồi là một trong những dụng cụ nấu ăn đặc trưng của đầu bếp."
          },
          {
            "left": {
              "text": "Cầu thủ",
              "icon": "⚽"
            },
            "right": {
              "text": "Quả bóng",
              "icon": "🏐"
            },
            "why": "Cầu thủ bóng đá cần quả bóng để luyện tập và thi đấu."
          }
        ]
      },
      {
        "title": "Buổi nào?",
        "prompt": "Ghép hoạt động với thời điểm thường phù hợp nhất trong sinh hoạt hằng ngày.",
        "tip": "Hãy dựa vào thói quen sinh hoạt thường ngày.",
        "pairs": [
          {
            "left": {
              "text": "Ăn sáng",
              "icon": "🥣"
            },
            "right": {
              "text": "Buổi sáng",
              "icon": "🌅"
            },
            "why": "Bữa sáng thường được ăn vào đầu ngày."
          },
          {
            "left": {
              "text": "Ăn trưa",
              "icon": "🍱"
            },
            "right": {
              "text": "Buổi trưa",
              "icon": "☀️"
            },
            "why": "Bữa trưa thường diễn ra vào giữa ngày."
          },
          {
            "left": {
              "text": "Ngắm sao",
              "icon": "🔭"
            },
            "right": {
              "text": "Buổi tối",
              "icon": "🌙"
            },
            "why": "Trời tối giúp chúng ta nhìn thấy sao rõ hơn."
          },
          {
            "left": {
              "text": "Đi ngủ",
              "icon": "🛌"
            },
            "right": {
              "text": "Ban đêm",
              "icon": "🌃"
            },
            "why": "Ban đêm là thời điểm thông thường để cơ thể nghỉ ngơi và ngủ."
          }
        ]
      },
      {
        "title": "Đồ dùng thuộc phòng nào?",
        "prompt": "Ghép đồ vật với nơi đặt phù hợp nhất trong nhà.",
        "tip": "Ghép theo nơi đồ vật thường được sử dụng nhất trong một ngôi nhà.",
        "pairs": [
          {
            "left": {
              "text": "Giường",
              "icon": "🛏️"
            },
            "right": {
              "text": "Phòng ngủ",
              "icon": "😴"
            },
            "why": "Giường là đồ dùng chính để nằm nghỉ trong phòng ngủ."
          },
          {
            "left": {
              "text": "Nồi",
              "icon": "🍲"
            },
            "right": {
              "text": "Nhà bếp",
              "icon": "🍳"
            },
            "why": "Nồi dùng để nấu thức ăn nên thường đặt trong nhà bếp."
          },
          {
            "left": {
              "text": "Bàn chải đánh răng",
              "icon": "🪥"
            },
            "right": {
              "text": "Nhà tắm",
              "icon": "🚿"
            },
            "why": "Bàn chải đánh răng thường được dùng và cất ở khu vực vệ sinh cá nhân."
          },
          {
            "left": {
              "text": "Tivi",
              "icon": "📺"
            },
            "right": {
              "text": "Phòng khách",
              "icon": "🛋️"
            },
            "why": "Trong màn này, tivi được ghép với phòng khách là nơi gia đình thường cùng xem."
          }
        ]
      },
      {
        "title": "Đi lại bằng gì?",
        "prompt": "Ghép nơi đến với phương tiện phù hợp nhất theo gợi ý của màn.",
        "tip": "Đọc kỹ đặc điểm chuyến đi chứ không ghép chỉ vì cùng là phương tiện.",
        "pairs": [
          {
            "left": {
              "text": "Qua sông",
              "icon": "🏞️"
            },
            "right": {
              "text": "Thuyền",
              "icon": "🚤"
            },
            "why": "Thuyền có thể đưa người qua mặt nước từ bờ này sang bờ kia."
          },
          {
            "left": {
              "text": "Bay đến thành phố xa",
              "icon": "🌆"
            },
            "right": {
              "text": "Máy bay",
              "icon": "✈️"
            },
            "why": "Máy bay phù hợp với hành trình xa cần di chuyển bằng đường hàng không."
          },
          {
            "left": {
              "text": "Đi trên đường ray",
              "icon": "🛤️"
            },
            "right": {
              "text": "Tàu hỏa",
              "icon": "🚆"
            },
            "why": "Tàu hỏa chạy trên hệ thống đường ray."
          },
          {
            "left": {
              "text": "Đi quanh khu phố",
              "icon": "🏘️"
            },
            "right": {
              "text": "Xe đạp",
              "icon": "🚲"
            },
            "why": "Xe đạp phù hợp cho quãng đường ngắn quanh khu phố."
          }
        ]
      },
      {
        "title": "Mặc khi nào?",
        "prompt": "Ghép đồ dùng với tình huống cần dùng rõ nhất.",
        "tip": "Hãy chọn tình huống mà đồ dùng đó có mục đích rõ ràng nhất.",
        "pairs": [
          {
            "left": {
              "text": "Áo mưa",
              "icon": "🧥"
            },
            "right": {
              "text": "Trời mưa",
              "icon": "🌧️"
            },
            "why": "Áo mưa giúp cơ thể và quần áo bớt bị ướt khi trời mưa."
          },
          {
            "left": {
              "text": "Mũ bảo hiểm",
              "icon": "⛑️"
            },
            "right": {
              "text": "Đi xe máy",
              "icon": "🛵"
            },
            "why": "Mũ bảo hiểm giúp bảo vệ đầu khi đi xe máy."
          },
          {
            "left": {
              "text": "Kính bơi",
              "icon": "🥽"
            },
            "right": {
              "text": "Xuống bể bơi",
              "icon": "🏊"
            },
            "why": "Kính bơi giúp bảo vệ mắt và nhìn rõ hơn dưới nước."
          },
          {
            "left": {
              "text": "Găng tay len",
              "icon": "🧤"
            },
            "right": {
              "text": "Trời lạnh",
              "icon": "❄️"
            },
            "why": "Găng tay len giúp giữ ấm bàn tay khi thời tiết lạnh."
          }
        ]
      }
    ]
  },
  {
    "id": "l2",
    "title": "Cấp 2 · Cùng nhóm, đúng chỗ",
    "tone": "teal",
    "summary": "Phân loại và nơi chốn; phương án nhiễu bắt đầu gần nhau hơn.",
    "rounds": [
      {
        "title": "Xếp đúng nhóm",
        "prompt": "Ghép từng đồ vật với nhóm của nó.",
        "tip": "Mỗi nhóm là một loại khác nhau; đừng ghép theo màu sắc hay hình dạng.",
        "pairs": [
          {
            "left": {
              "text": "Táo",
              "icon": "🍎"
            },
            "right": {
              "text": "Trái cây",
              "icon": "🍉"
            },
            "why": "Táo là một loại trái cây."
          },
          {
            "left": {
              "text": "Cà rốt",
              "icon": "🥕"
            },
            "right": {
              "text": "Rau củ",
              "icon": "🥬"
            },
            "why": "Cà rốt là rau củ, phần củ nằm dưới đất."
          },
          {
            "left": {
              "text": "Bóng",
              "icon": "⚽"
            },
            "right": {
              "text": "Đồ chơi",
              "icon": "🧸"
            },
            "why": "Quả bóng là đồ dùng để chơi và vận động."
          },
          {
            "left": {
              "text": "Áo",
              "icon": "👕"
            },
            "right": {
              "text": "Quần áo",
              "icon": "👗"
            },
            "why": "Áo thuộc nhóm quần áo dùng để mặc."
          }
        ]
      },
      {
        "title": "Ai sống ở đâu?",
        "prompt": "Ghép con vật với môi trường sống phù hợp nhất trong các lựa chọn.",
        "tip": "Hãy chọn môi trường tự nhiên đặc trưng nhất.",
        "pairs": [
          {
            "left": {
              "text": "Cá heo",
              "icon": "🐬"
            },
            "right": {
              "text": "Biển",
              "icon": "🌊"
            },
            "why": "Cá heo là động vật có vú sống trong môi trường biển."
          },
          {
            "left": {
              "text": "Lạc đà",
              "icon": "🐪"
            },
            "right": {
              "text": "Sa mạc",
              "icon": "🏜️"
            },
            "why": "Lạc đà thích nghi tốt với môi trường khô nóng của sa mạc."
          },
          {
            "left": {
              "text": "Ếch",
              "icon": "🐸"
            },
            "right": {
              "text": "Ao hồ",
              "icon": "🪷"
            },
            "why": "Ếch thường sống gần nơi có nước như ao, hồ và đầm lầy."
          },
          {
            "left": {
              "text": "Sóc",
              "icon": "🐿️"
            },
            "right": {
              "text": "Rừng cây",
              "icon": "🌳"
            },
            "why": "Sóc thường sống và tìm thức ăn trên cây trong rừng hoặc vườn cây."
          }
        ]
      },
      {
        "title": "Nghề và nơi làm việc",
        "prompt": "Ghép nghề nghiệp với nơi làm việc đặc trưng nhất.",
        "tip": "Ghép theo nơi làm việc đặc trưng, không phải nơi người đó có thể ghé qua.",
        "pairs": [
          {
            "left": {
              "text": "Giáo viên",
              "icon": "👩‍🏫"
            },
            "right": {
              "text": "Trường học",
              "icon": "🏫"
            },
            "why": "Giáo viên dạy học chủ yếu tại trường học."
          },
          {
            "left": {
              "text": "Bác sĩ",
              "icon": "🧑‍⚕️"
            },
            "right": {
              "text": "Bệnh viện",
              "icon": "🏥"
            },
            "why": "Bác sĩ khám và điều trị người bệnh tại bệnh viện hoặc cơ sở y tế."
          },
          {
            "left": {
              "text": "Đầu bếp",
              "icon": "🧑‍🍳"
            },
            "right": {
              "text": "Nhà bếp",
              "icon": "🍳"
            },
            "why": "Đầu bếp chế biến món ăn trong khu vực bếp."
          },
          {
            "left": {
              "text": "Thủ thư",
              "icon": "🧑‍💼"
            },
            "right": {
              "text": "Thư viện",
              "icon": "📚"
            },
            "why": "Thủ thư sắp xếp, quản lý và hỗ trợ tìm sách trong thư viện."
          }
        ]
      },
      {
        "title": "Đồ dùng học tập",
        "prompt": "Ghép đồ dùng với việc học phù hợp nhất.",
        "tip": "Mỗi đồ dùng có một công việc chính rõ nhất trong màn này.",
        "pairs": [
          {
            "left": {
              "text": "Thước kẻ",
              "icon": "📏"
            },
            "right": {
              "text": "Đo độ dài",
              "icon": "↔️"
            },
            "why": "Thước có vạch chia để đo độ dài và kẻ đường thẳng."
          },
          {
            "left": {
              "text": "Tẩy",
              "icon": "◻️"
            },
            "right": {
              "text": "Xóa nét bút chì",
              "icon": "✏️"
            },
            "why": "Tẩy dùng để làm mờ hoặc xóa nét bút chì."
          },
          {
            "left": {
              "text": "Bút màu",
              "icon": "🖍️"
            },
            "right": {
              "text": "Tô tranh",
              "icon": "🎨"
            },
            "why": "Bút màu dùng để thêm màu sắc cho tranh vẽ."
          },
          {
            "left": {
              "text": "Vở",
              "icon": "📒"
            },
            "right": {
              "text": "Viết bài",
              "icon": "📝"
            },
            "why": "Vở có các trang giấy để ghi bài và luyện viết."
          }
        ]
      },
      {
        "title": "Đồ ăn thuộc bữa nào?",
        "prompt": "Ghép món ăn với bữa hoặc dịp phù hợp nhất theo gợi ý.",
        "tip": "Ghép theo vai trò của món ăn trong màn, không phải món đó chỉ được ăn đúng một thời điểm.",
        "pairs": [
          {
            "left": {
              "text": "Bánh sinh nhật",
              "icon": "🎂"
            },
            "right": {
              "text": "Tiệc sinh nhật",
              "icon": "🎉"
            },
            "why": "Bánh sinh nhật là món đặc trưng của buổi tiệc mừng tuổi mới."
          },
          {
            "left": {
              "text": "Bát cháo",
              "icon": "🥣"
            },
            "right": {
              "text": "Bữa sáng",
              "icon": "🌅"
            },
            "why": "Cháo là món thường được dùng vào bữa sáng trong ví dụ này."
          },
          {
            "left": {
              "text": "Cơm và rau",
              "icon": "🍚"
            },
            "right": {
              "text": "Bữa chính",
              "icon": "🍽️"
            },
            "why": "Cơm và rau thường xuất hiện trong bữa ăn chính."
          },
          {
            "left": {
              "text": "Trái cây",
              "icon": "🍊"
            },
            "right": {
              "text": "Bữa phụ",
              "icon": "🕒"
            },
            "why": "Trái cây có thể dùng như món ăn nhẹ giữa các bữa chính."
          }
        ]
      },
      {
        "title": "Âm thanh từ đâu?",
        "prompt": "Ghép âm thanh với nơi hoặc vật tạo ra âm thanh đặc trưng.",
        "tip": "Hãy tưởng tượng mình đứng ở từng nơi và lắng nghe.",
        "pairs": [
          {
            "left": {
              "text": "Tiếng sóng",
              "icon": "🌊"
            },
            "right": {
              "text": "Bãi biển",
              "icon": "🏖️"
            },
            "why": "Sóng biển vỗ vào bờ tạo âm thanh đặc trưng ở bãi biển."
          },
          {
            "left": {
              "text": "Tiếng còi tàu",
              "icon": "📣"
            },
            "right": {
              "text": "Nhà ga",
              "icon": "🚉"
            },
            "why": "Còi tàu thường nghe rõ khi tàu đến hoặc rời nhà ga."
          },
          {
            "left": {
              "text": "Tiếng trống trường",
              "icon": "🥁"
            },
            "right": {
              "text": "Sân trường",
              "icon": "🏫"
            },
            "why": "Trống trường dùng để báo hiệu giờ học, giờ ra chơi trong trường."
          },
          {
            "left": {
              "text": "Tiếng chim hót",
              "icon": "🐦"
            },
            "right": {
              "text": "Vườn cây",
              "icon": "🌳"
            },
            "why": "Vườn cây là nơi dễ nghe tiếng chim hót trong khung cảnh này."
          }
        ]
      },
      {
        "title": "Phương tiện thuộc đường nào?",
        "prompt": "Ghép phương tiện với môi trường di chuyển chính.",
        "tip": "Mỗi phương tiện có một môi trường di chuyển chính khác nhau.",
        "pairs": [
          {
            "left": {
              "text": "Tàu hỏa",
              "icon": "🚆"
            },
            "right": {
              "text": "Đường ray",
              "icon": "🛤️"
            },
            "why": "Tàu hỏa chạy trên đường ray."
          },
          {
            "left": {
              "text": "Máy bay",
              "icon": "✈️"
            },
            "right": {
              "text": "Đường hàng không",
              "icon": "☁️"
            },
            "why": "Máy bay di chuyển trong không trung theo đường hàng không."
          },
          {
            "left": {
              "text": "Tàu thủy",
              "icon": "🚢"
            },
            "right": {
              "text": "Đường thủy",
              "icon": "🌊"
            },
            "why": "Tàu thủy di chuyển trên sông, hồ hoặc biển."
          },
          {
            "left": {
              "text": "Xe buýt",
              "icon": "🚌"
            },
            "right": {
              "text": "Đường bộ",
              "icon": "🛣️"
            },
            "why": "Xe buýt chạy trên hệ thống đường bộ."
          }
        ]
      },
      {
        "title": "Đồ vật thuộc chất liệu nào?",
        "prompt": "Ghép vật với chất liệu điển hình nhất trong các lựa chọn của màn.",
        "tip": "Tên đồ vật đã được viết đủ cụ thể để chỉ còn một chất liệu đúng trong màn này.",
        "pairs": [
          {
            "left": {
              "text": "Cửa sổ",
              "icon": "🪟"
            },
            "right": {
              "text": "Kính",
              "icon": "🔷"
            },
            "why": "Phần trong suốt của cửa sổ thường làm bằng kính."
          },
          {
            "left": {
              "text": "Quyển vở",
              "icon": "📒"
            },
            "right": {
              "text": "Giấy",
              "icon": "📄"
            },
            "why": "Các trang của quyển vở được làm từ giấy."
          },
          {
            "left": {
              "text": "Khăn len",
              "icon": "🧣"
            },
            "right": {
              "text": "Sợi len",
              "icon": "🧶"
            },
            "why": "Khăn len được đan từ sợi len hoặc sợi tương tự."
          },
          {
            "left": {
              "text": "Nồi inox",
              "icon": "🍲"
            },
            "right": {
              "text": "Kim loại",
              "icon": "⚙️"
            },
            "why": "Nồi inox được làm từ kim loại không gỉ."
          }
        ]
      }
    ]
  },
  {
    "id": "l3",
    "title": "Cấp 3 · Công dụng và dụng cụ",
    "tone": "purple",
    "summary": "5 cặp/màn; các đáp án nhiễu đều có vẻ hợp nếu đọc không kỹ.",
    "rounds": [
      {
        "title": "Dụng cụ giải quyết việc gì?",
        "prompt": "Ghép dụng cụ với nhiệm vụ chính phù hợp nhất.",
        "tip": "Các đồ đều liên quan đến làm sạch/chải, nên phải đọc đúng nhiệm vụ.",
        "pairs": [
          {
            "left": {
              "text": "Chổi",
              "icon": "🧹"
            },
            "right": {
              "text": "Quét bụi trên sàn",
              "icon": "✨"
            },
            "why": "Chổi dùng để gom bụi và rác nhỏ trên sàn."
          },
          {
            "left": {
              "text": "Cây lau nhà",
              "icon": "🧽"
            },
            "right": {
              "text": "Lau sàn ướt",
              "icon": "💦"
            },
            "why": "Cây lau nhà dùng để lau sạch sàn bằng nước hoặc dung dịch vệ sinh."
          },
          {
            "left": {
              "text": "Khăn lau",
              "icon": "🧻"
            },
            "right": {
              "text": "Lau mặt bàn",
              "icon": "🪑"
            },
            "why": "Khăn lau phù hợp để lau bụi hoặc nước trên bề mặt bàn."
          },
          {
            "left": {
              "text": "Bàn chải",
              "icon": "🪥"
            },
            "right": {
              "text": "Chải răng",
              "icon": "😁"
            },
            "why": "Bàn chải đánh răng dùng để làm sạch bề mặt răng."
          },
          {
            "left": {
              "text": "Lược",
              "icon": "🪮"
            },
            "right": {
              "text": "Chải tóc",
              "icon": "💇"
            },
            "why": "Lược dùng để gỡ rối và sắp xếp tóc."
          }
        ]
      },
      {
        "title": "Trong hộp nghề nghiệp",
        "prompt": "Ghép nghề với dụng cụ đặc trưng nhất.",
        "tip": "Chọn dụng cụ đặc trưng cho nghề, không phải đồ vật nghề đó cũng có thể sử dụng.",
        "pairs": [
          {
            "left": {
              "text": "Thợ sửa xe",
              "icon": "🧑‍🔧"
            },
            "right": {
              "text": "Cờ lê",
              "icon": "🔧"
            },
            "why": "Cờ lê giúp siết hoặc tháo đai ốc khi sửa máy, sửa xe."
          },
          {
            "left": {
              "text": "Thợ may",
              "icon": "🧵"
            },
            "right": {
              "text": "Kim khâu",
              "icon": "🪡"
            },
            "why": "Kim khâu dùng với chỉ để may vải."
          },
          {
            "left": {
              "text": "Nhiếp ảnh gia",
              "icon": "📷"
            },
            "right": {
              "text": "Máy ảnh",
              "icon": "📸"
            },
            "why": "Máy ảnh là dụng cụ chính để chụp ảnh."
          },
          {
            "left": {
              "text": "Nha sĩ",
              "icon": "🦷"
            },
            "right": {
              "text": "Gương nha khoa",
              "icon": "🪞"
            },
            "why": "Gương nhỏ giúp nha sĩ quan sát các vị trí trong miệng."
          },
          {
            "left": {
              "text": "Người làm vườn",
              "icon": "🧑‍🌾"
            },
            "right": {
              "text": "Bình tưới",
              "icon": "🚿"
            },
            "why": "Bình tưới giúp đưa nước đến cây trong vườn."
          }
        ]
      },
      {
        "title": "Đo cái gì?",
        "prompt": "Ghép dụng cụ đo với đại lượng nó đo.",
        "tip": "Đây là quan hệ dụng cụ đo → thứ được đo.",
        "pairs": [
          {
            "left": {
              "text": "Thước",
              "icon": "📏"
            },
            "right": {
              "text": "Độ dài",
              "icon": "↔️"
            },
            "why": "Thước có vạch chia để đo chiều dài."
          },
          {
            "left": {
              "text": "Cân",
              "icon": "⚖️"
            },
            "right": {
              "text": "Khối lượng",
              "icon": "🏋️"
            },
            "why": "Cân dùng để xác định vật nặng hay nhẹ theo khối lượng."
          },
          {
            "left": {
              "text": "Đồng hồ",
              "icon": "🕒"
            },
            "right": {
              "text": "Thời gian",
              "icon": "⏰"
            },
            "why": "Đồng hồ cho biết thời gian."
          },
          {
            "left": {
              "text": "Nhiệt kế",
              "icon": "🌡️"
            },
            "right": {
              "text": "Nhiệt độ",
              "icon": "🔥"
            },
            "why": "Nhiệt kế dùng để đo nhiệt độ."
          },
          {
            "left": {
              "text": "Cốc đong",
              "icon": "🥛"
            },
            "right": {
              "text": "Dung tích",
              "icon": "💧"
            },
            "why": "Cốc đong có vạch để ước lượng hoặc đo lượng chất lỏng."
          }
        ]
      },
      {
        "title": "An toàn trước tiên",
        "prompt": "Ghép tình huống với đồ bảo vệ phù hợp nhất.",
        "tip": "Một số món đều là 'mũ', nhưng nhiệm vụ bảo vệ khác nhau.",
        "pairs": [
          {
            "left": {
              "text": "Đi xe đạp",
              "icon": "🚲"
            },
            "right": {
              "text": "Mũ bảo hiểm",
              "icon": "⛑️"
            },
            "why": "Mũ bảo hiểm giúp giảm nguy cơ chấn thương đầu khi đi xe đạp."
          },
          {
            "left": {
              "text": "Bơi ở bể",
              "icon": "🏊"
            },
            "right": {
              "text": "Phao hỗ trợ",
              "icon": "🛟"
            },
            "why": "Phao hỗ trợ nổi dành cho người chưa bơi vững khi có người lớn giám sát."
          },
          {
            "left": {
              "text": "Trời nắng gắt",
              "icon": "☀️"
            },
            "right": {
              "text": "Mũ rộng vành",
              "icon": "👒"
            },
            "why": "Mũ rộng vành giúp che bớt nắng cho đầu và mặt."
          },
          {
            "left": {
              "text": "Làm việc ở công trường",
              "icon": "🏗️"
            },
            "right": {
              "text": "Mũ bảo hộ",
              "icon": "👷"
            },
            "why": "Mũ bảo hộ được thiết kế để bảo vệ đầu ở công trường."
          },
          {
            "left": {
              "text": "Đi ngoài trời mưa",
              "icon": "🌧️"
            },
            "right": {
              "text": "Áo mưa",
              "icon": "🧥"
            },
            "why": "Áo mưa giúp giữ cơ thể và quần áo bớt ướt."
          }
        ]
      },
      {
        "title": "Chọn đúng đồ chứa",
        "prompt": "Ghép thứ cần chứa với vật chứa phù hợp nhất.",
        "tip": "Đừng ghép theo việc 'có thể bỏ vào'; hãy chọn vật chứa được dùng đúng mục đích.",
        "pairs": [
          {
            "left": {
              "text": "Nước uống",
              "icon": "💧"
            },
            "right": {
              "text": "Chai nước",
              "icon": "🍼"
            },
            "why": "Chai nước được thiết kế để chứa và mang nước uống."
          },
          {
            "left": {
              "text": "Sách",
              "icon": "📚"
            },
            "right": {
              "text": "Cặp sách",
              "icon": "🎒"
            },
            "why": "Cặp sách dùng để mang sách vở và đồ dùng học tập."
          },
          {
            "left": {
              "text": "Rác",
              "icon": "🗑️"
            },
            "right": {
              "text": "Thùng rác",
              "icon": "🚮"
            },
            "why": "Rác cần bỏ vào thùng rác để giữ vệ sinh."
          },
          {
            "left": {
              "text": "Quần áo",
              "icon": "👕"
            },
            "right": {
              "text": "Tủ quần áo",
              "icon": "🚪"
            },
            "why": "Tủ quần áo dùng để cất và sắp xếp trang phục."
          },
          {
            "left": {
              "text": "Bút chì",
              "icon": "✏️"
            },
            "right": {
              "text": "Hộp bút",
              "icon": "🖊️"
            },
            "why": "Hộp bút giúp cất gọn bút và đồ dùng nhỏ."
          }
        ]
      },
      {
        "title": "Tín hiệu và hành động",
        "prompt": "Ghép tín hiệu với hành động phù hợp nhất.",
        "tip": "Mỗi tín hiệu báo một hành động hoặc thông tin khác nhau.",
        "pairs": [
          {
            "left": {
              "text": "Đèn đỏ",
              "icon": "🔴"
            },
            "right": {
              "text": "Dừng lại",
              "icon": "✋"
            },
            "why": "Đèn đỏ yêu cầu phương tiện dừng lại trước vạch."
          },
          {
            "left": {
              "text": "Đèn xanh",
              "icon": "🟢"
            },
            "right": {
              "text": "Được đi khi an toàn",
              "icon": "➡️"
            },
            "why": "Đèn xanh cho phép đi tiếp nếu đường phía trước an toàn."
          },
          {
            "left": {
              "text": "Chuông báo cháy",
              "icon": "🚨"
            },
            "right": {
              "text": "Rời nơi nguy hiểm theo hướng dẫn",
              "icon": "🏃"
            },
            "why": "Chuông báo cháy là tín hiệu cần sơ tán theo hướng dẫn của người lớn."
          },
          {
            "left": {
              "text": "Trống vào lớp",
              "icon": "🥁"
            },
            "right": {
              "text": "Vào lớp",
              "icon": "🏫"
            },
            "why": "Tiếng trống vào lớp báo hiệu học sinh chuẩn bị vào học."
          },
          {
            "left": {
              "text": "Chuông cửa",
              "icon": "🔔"
            },
            "right": {
              "text": "Báo có người ở cửa",
              "icon": "🚪"
            },
            "why": "Chuông cửa báo cho người trong nhà biết có người đang chờ ngoài cửa."
          }
        ]
      },
      {
        "title": "Đồ dùng cho hoạt động",
        "prompt": "Ghép hoạt động với đồ dùng không thể thiếu nhất trong màn.",
        "tip": "Hãy tìm món đồ gắn trực tiếp nhất với hoạt động.",
        "pairs": [
          {
            "left": {
              "text": "Vẽ tranh màu",
              "icon": "🎨"
            },
            "right": {
              "text": "Bút màu",
              "icon": "🖍️"
            },
            "why": "Bút màu giúp tạo các mảng màu trên tranh."
          },
          {
            "left": {
              "text": "Đọc truyện",
              "icon": "📖"
            },
            "right": {
              "text": "Quyển truyện",
              "icon": "📚"
            },
            "why": "Quyển truyện chứa nội dung để đọc."
          },
          {
            "left": {
              "text": "Đá bóng",
              "icon": "⚽"
            },
            "right": {
              "text": "Quả bóng",
              "icon": "🏐"
            },
            "why": "Quả bóng là vật trung tâm của trò chơi bóng đá."
          },
          {
            "left": {
              "text": "Trồng cây con",
              "icon": "🌱"
            },
            "right": {
              "text": "Xẻng nhỏ",
              "icon": "🪏"
            },
            "why": "Xẻng nhỏ giúp đào đất để đặt cây con."
          },
          {
            "left": {
              "text": "Quan sát chim xa",
              "icon": "🐦"
            },
            "right": {
              "text": "Ống nhòm",
              "icon": "🔭"
            },
            "why": "Ống nhòm giúp nhìn vật ở xa rõ hơn."
          }
        ]
      },
      {
        "title": "Mở khóa vấn đề",
        "prompt": "Ghép vấn đề với cách xử lý phù hợp nhất.",
        "tip": "Mỗi cách xử lý giải quyết trực tiếp đúng một vấn đề.",
        "pairs": [
          {
            "left": {
              "text": "Bút chì cùn",
              "icon": "✏️"
            },
            "right": {
              "text": "Gọt bút chì",
              "icon": "🔪"
            },
            "why": "Gọt bút giúp đầu bút chì nhọn trở lại để viết dễ hơn."
          },
          {
            "left": {
              "text": "Tay bẩn",
              "icon": "👐"
            },
            "right": {
              "text": "Rửa với xà phòng",
              "icon": "🧼"
            },
            "why": "Rửa tay với xà phòng giúp loại bỏ bụi bẩn và nhiều vi khuẩn."
          },
          {
            "left": {
              "text": "Khát nước",
              "icon": "🥵"
            },
            "right": {
              "text": "Uống nước",
              "icon": "💧"
            },
            "why": "Uống nước giúp cơ thể bổ sung lượng nước cần thiết."
          },
          {
            "left": {
              "text": "Phòng tối",
              "icon": "🌑"
            },
            "right": {
              "text": "Bật đèn",
              "icon": "💡"
            },
            "why": "Bật đèn làm căn phòng sáng để nhìn rõ hơn."
          },
          {
            "left": {
              "text": "Đồ chơi rơi vãi",
              "icon": "🧸"
            },
            "right": {
              "text": "Cất vào hộp",
              "icon": "📦"
            },
            "why": "Cất đồ chơi vào hộp giúp sàn gọn và an toàn hơn."
          }
        ]
      }
    ]
  },
  {
    "id": "l4",
    "title": "Cấp 4 · Trước – sau – nguyên nhân",
    "tone": "amber",
    "summary": "Hiểu quá trình, thứ tự và kết quả thay vì chỉ nhớ tên đồ vật.",
    "rounds": [
      {
        "title": "Trước rồi sau",
        "prompt": "Ghép việc xảy ra trước với kết quả xảy ra sau hợp lý nhất.",
        "tip": "Ghép theo chuỗi trước → sau, không theo việc hai thứ cùng xuất hiện.",
        "pairs": [
          {
            "left": {
              "text": "Gieo hạt",
              "icon": "🌰"
            },
            "right": {
              "text": "Cây nảy mầm",
              "icon": "🌱"
            },
            "why": "Khi hạt gặp điều kiện phù hợp, nó có thể nảy mầm thành cây non."
          },
          {
            "left": {
              "text": "Đổ nước vào khay đá",
              "icon": "💧"
            },
            "right": {
              "text": "Nước đông thành đá",
              "icon": "🧊"
            },
            "why": "Khi được làm lạnh đủ lâu trong ngăn đá, nước có thể đông lại."
          },
          {
            "left": {
              "text": "Bật công tắc đèn",
              "icon": "🔘"
            },
            "right": {
              "text": "Đèn sáng",
              "icon": "💡"
            },
            "why": "Công tắc đóng mạch điện làm đèn sáng khi hệ thống hoạt động bình thường."
          },
          {
            "left": {
              "text": "Thổi bóng bay",
              "icon": "🎈"
            },
            "right": {
              "text": "Bóng căng lên",
              "icon": "⭕"
            },
            "why": "Không khí được thổi vào làm quả bóng bay phồng và căng hơn."
          },
          {
            "left": {
              "text": "Tưới cây khô",
              "icon": "🚿"
            },
            "right": {
              "text": "Đất ẩm hơn",
              "icon": "💦"
            },
            "why": "Nước tưới thấm vào đất làm đất bớt khô."
          }
        ]
      },
      {
        "title": "Nguyên nhân – kết quả",
        "prompt": "Ghép nguyên nhân với kết quả trực tiếp nhất.",
        "tip": "Hãy tìm kết quả xảy ra trực tiếp, không chọn một điều chỉ có thể xảy ra xa hơn.",
        "pairs": [
          {
            "left": {
              "text": "Trời mưa to",
              "icon": "🌧️"
            },
            "right": {
              "text": "Đường bị ướt",
              "icon": "💦"
            },
            "why": "Mưa rơi xuống làm mặt đường ướt."
          },
          {
            "left": {
              "text": "Mặt trời chiếu mạnh",
              "icon": "☀️"
            },
            "right": {
              "text": "Quần áo phơi mau khô",
              "icon": "👕"
            },
            "why": "Nắng và nhiệt giúp nước trong quần áo bay hơi nhanh hơn."
          },
          {
            "left": {
              "text": "Gió mạnh",
              "icon": "💨"
            },
            "right": {
              "text": "Cành cây đung đưa",
              "icon": "🌳"
            },
            "why": "Gió tác động lên cành lá làm chúng chuyển động."
          },
          {
            "left": {
              "text": "Đánh rơi cốc thủy tinh",
              "icon": "🥛"
            },
            "right": {
              "text": "Cốc có thể vỡ",
              "icon": "💥"
            },
            "why": "Thủy tinh giòn nên va đập mạnh có thể làm cốc vỡ."
          },
          {
            "left": {
              "text": "Quên tưới cây nhiều ngày",
              "icon": "🏜️"
            },
            "right": {
              "text": "Cây héo",
              "icon": "🥀"
            },
            "why": "Thiếu nước lâu ngày làm cây mất độ tươi và có thể héo."
          }
        ]
      },
      {
        "title": "Từ nguyên liệu đến món ăn",
        "prompt": "Ghép bước chuẩn bị với kết quả đúng nhất.",
        "tip": "Mỗi kết quả là sản phẩm trực tiếp của bước chế biến bên trái.",
        "pairs": [
          {
            "left": {
              "text": "Vắt cam",
              "icon": "🍊"
            },
            "right": {
              "text": "Có nước cam",
              "icon": "🧃"
            },
            "why": "Vắt phần nước từ quả cam tạo thành nước cam."
          },
          {
            "left": {
              "text": "Nướng bột bánh",
              "icon": "🥣"
            },
            "right": {
              "text": "Có bánh chín",
              "icon": "🧁"
            },
            "why": "Nhiệt của lò làm hỗn hợp bột bánh chín thành bánh."
          },
          {
            "left": {
              "text": "Luộc trứng",
              "icon": "🥚"
            },
            "right": {
              "text": "Trứng chín",
              "icon": "🍳"
            },
            "why": "Nước nóng truyền nhiệt làm trứng chín."
          },
          {
            "left": {
              "text": "Xay trái cây",
              "icon": "🍓"
            },
            "right": {
              "text": "Sinh tố",
              "icon": "🥤"
            },
            "why": "Máy xay nghiền trái cây thành hỗn hợp sinh tố."
          },
          {
            "left": {
              "text": "Vo gạo rồi nấu",
              "icon": "🌾"
            },
            "right": {
              "text": "Cơm chín",
              "icon": "🍚"
            },
            "why": "Gạo được nấu với nước và nhiệt sẽ thành cơm chín."
          }
        ]
      },
      {
        "title": "Một ngày của bé",
        "prompt": "Ghép hoạt động trước với hoạt động thường tiếp theo trong chuỗi đã cho.",
        "tip": "Đây là một chuỗi sinh hoạt cụ thể; ghép theo bước ngay sau chứ không phải bất kỳ việc nào cùng ngày.",
        "pairs": [
          {
            "left": {
              "text": "Thức dậy",
              "icon": "🌅"
            },
            "right": {
              "text": "Gấp chăn",
              "icon": "🛏️"
            },
            "why": "Sau khi thức dậy, bé có thể gấp chăn để giường gọn gàng."
          },
          {
            "left": {
              "text": "Đánh răng",
              "icon": "🪥"
            },
            "right": {
              "text": "Ăn sáng",
              "icon": "🥣"
            },
            "why": "Trong chuỗi sinh hoạt này, đánh răng xong thì bé chuẩn bị ăn sáng."
          },
          {
            "left": {
              "text": "Đeo cặp",
              "icon": "🎒"
            },
            "right": {
              "text": "Ra khỏi nhà đi học",
              "icon": "🚪"
            },
            "why": "Đeo cặp là bước chuẩn bị ngay trước khi rời nhà đi học."
          },
          {
            "left": {
              "text": "Tan học",
              "icon": "🏫"
            },
            "right": {
              "text": "Trở về nhà",
              "icon": "🏠"
            },
            "why": "Sau khi kết thúc buổi học, bé trở về nhà theo kế hoạch gia đình."
          },
          {
            "left": {
              "text": "Thay đồ ngủ",
              "icon": "👕"
            },
            "right": {
              "text": "Lên giường",
              "icon": "🛌"
            },
            "why": "Thay đồ ngủ là bước chuẩn bị ngay trước khi lên giường nghỉ."
          }
        ]
      },
      {
        "title": "Từ con non đến con lớn",
        "prompt": "Ghép con non với con trưởng thành cùng loài.",
        "tip": "Chỉ ghép cùng loài, không ghép vì chúng đều là vật nuôi.",
        "pairs": [
          {
            "left": {
              "text": "Gà con",
              "icon": "🐥"
            },
            "right": {
              "text": "Gà",
              "icon": "🐔"
            },
            "why": "Gà con lớn lên thành gà trưởng thành."
          },
          {
            "left": {
              "text": "Chó con",
              "icon": "🐶"
            },
            "right": {
              "text": "Chó",
              "icon": "🐕"
            },
            "why": "Chó con là giai đoạn nhỏ của chó trưởng thành."
          },
          {
            "left": {
              "text": "Mèo con",
              "icon": "🐱"
            },
            "right": {
              "text": "Mèo",
              "icon": "🐈"
            },
            "why": "Mèo con lớn lên thành mèo trưởng thành."
          },
          {
            "left": {
              "text": "Vịt con",
              "icon": "🐤"
            },
            "right": {
              "text": "Vịt",
              "icon": "🦆"
            },
            "why": "Vịt con lớn lên thành vịt trưởng thành."
          },
          {
            "left": {
              "text": "Ngựa con",
              "icon": "🐴"
            },
            "right": {
              "text": "Ngựa",
              "icon": "🐎"
            },
            "why": "Ngựa con lớn lên thành ngựa trưởng thành."
          }
        ]
      },
      {
        "title": "Trước khi dùng – sau khi dùng",
        "prompt": "Ghép hành động với kết quả trực tiếp sau đó.",
        "tip": "Tìm kết quả xảy ra ngay sau hành động.",
        "pairs": [
          {
            "left": {
              "text": "Mở ô dưới mưa",
              "icon": "☂️"
            },
            "right": {
              "text": "Bớt bị ướt",
              "icon": "🙂"
            },
            "why": "Tán ô chắn phần lớn hạt mưa rơi trực tiếp xuống người."
          },
          {
            "left": {
              "text": "Khóa vòi nước",
              "icon": "🚰"
            },
            "right": {
              "text": "Nước ngừng chảy",
              "icon": "⛔"
            },
            "why": "Khóa vòi làm dòng nước qua vòi dừng lại."
          },
          {
            "left": {
              "text": "Cài dây an toàn",
              "icon": "🚗"
            },
            "right": {
              "text": "Người ngồi được giữ chắc hơn",
              "icon": "🪢"
            },
            "why": "Dây an toàn giúp giữ cơ thể ở vị trí an toàn hơn khi xe chuyển động hoặc phanh."
          },
          {
            "left": {
              "text": "Đóng cửa tủ lạnh",
              "icon": "🧊"
            },
            "right": {
              "text": "Hơi lạnh được giữ bên trong tốt hơn",
              "icon": "❄️"
            },
            "why": "Cửa đóng giúp hạn chế không khí lạnh thoát ra ngoài."
          },
          {
            "left": {
              "text": "Kéo rèm cửa",
              "icon": "🪟"
            },
            "right": {
              "text": "Ánh sáng vào phòng ít hơn",
              "icon": "🌤️"
            },
            "why": "Rèm che bớt ánh sáng từ cửa sổ đi vào phòng."
          }
        ]
      },
      {
        "title": "Tín hiệu trước – việc sau",
        "prompt": "Ghép tín hiệu với việc thường diễn ra ngay sau nó.",
        "tip": "Hãy chọn phản ứng gần nhất và hợp lý nhất sau tín hiệu.",
        "pairs": [
          {
            "left": {
              "text": "Chuông báo thức reo",
              "icon": "⏰"
            },
            "right": {
              "text": "Thức dậy",
              "icon": "😃"
            },
            "why": "Chuông báo thức được đặt để nhắc người ngủ thức dậy."
          },
          {
            "left": {
              "text": "Trống hết giờ học",
              "icon": "🥁"
            },
            "right": {
              "text": "Thu dọn sách vở",
              "icon": "📚"
            },
            "why": "Khi hết tiết, học sinh thường thu dọn hoặc chuẩn bị chuyển hoạt động."
          },
          {
            "left": {
              "text": "Đèn xanh bật",
              "icon": "🟢"
            },
            "right": {
              "text": "Phương tiện được đi khi an toàn",
              "icon": "🚗"
            },
            "why": "Đèn xanh cho phép tiếp tục di chuyển nếu bảo đảm an toàn."
          },
          {
            "left": {
              "text": "Mẹ gọi 'ăn cơm'",
              "icon": "📣"
            },
            "right": {
              "text": "Đến bàn ăn",
              "icon": "🍽️"
            },
            "why": "Lời gọi báo bữa ăn đã sẵn sàng để mọi người đến bàn."
          },
          {
            "left": {
              "text": "Mưa bắt đầu rơi",
              "icon": "🌦️"
            },
            "right": {
              "text": "Tìm chỗ trú hoặc mở ô",
              "icon": "☂️"
            },
            "why": "Khi mưa bắt đầu, cần che mưa hoặc vào nơi an toàn."
          }
        ]
      },
      {
        "title": "Thay đổi trạng thái",
        "prompt": "Ghép tác động với sự thay đổi rõ nhất của vật.",
        "tip": "Mỗi tác động làm thay đổi hoặc cho biết một trạng thái riêng.",
        "pairs": [
          {
            "left": {
              "text": "Cho đá viên ra ngoài lâu",
              "icon": "🧊"
            },
            "right": {
              "text": "Đá tan thành nước",
              "icon": "💧"
            },
            "why": "Ở nhiệt độ cao hơn điểm đông, đá hấp thụ nhiệt và tan dần."
          },
          {
            "left": {
              "text": "Bơm hơi vào lốp",
              "icon": "🛞"
            },
            "right": {
              "text": "Lốp căng hơn",
              "icon": "⭕"
            },
            "why": "Không khí được bơm vào làm áp suất và độ căng của lốp tăng."
          },
          {
            "left": {
              "text": "Gấp tờ giấy",
              "icon": "📄"
            },
            "right": {
              "text": "Giấy có nếp gấp",
              "icon": "📑"
            },
            "why": "Lực gấp tạo một đường nếp trên giấy."
          },
          {
            "left": {
              "text": "Tô màu lên tranh",
              "icon": "🖍️"
            },
            "right": {
              "text": "Tranh có thêm màu",
              "icon": "🎨"
            },
            "why": "Bút màu để lại sắc màu trên vùng được tô."
          },
          {
            "left": {
              "text": "Đặt sách lên cân",
              "icon": "📚"
            },
            "right": {
              "text": "Cân hiển thị khối lượng",
              "icon": "⚖️"
            },
            "why": "Cân phản ứng với vật đặt lên và cho biết giá trị khối lượng."
          }
        ]
      }
    ]
  },
  {
    "id": "l5",
    "title": "Cấp 5 · Một phần của…",
    "tone": "pink",
    "summary": "Bộ phận – toàn thể và cấu tạo; cần phân biệt các cặp gần nghĩa.",
    "rounds": [
      {
        "title": "Bộ phận của phương tiện",
        "prompt": "Ghép bộ phận với phương tiện mà nó thuộc về rõ nhất.",
        "tip": "Các phương tiện đều có nhiều bộ phận; hãy tìm bộ phận đặc trưng được nêu.",
        "pairs": [
          {
            "left": {
              "text": "Cánh quạt lớn",
              "icon": "🌀"
            },
            "right": {
              "text": "Máy bay trực thăng",
              "icon": "🚁"
            },
            "why": "Cánh quạt lớn phía trên là bộ phận đặc trưng giúp trực thăng tạo lực nâng."
          },
          {
            "left": {
              "text": "Đường ray bánh sắt",
              "icon": "🛤️"
            },
            "right": {
              "text": "Tàu hỏa",
              "icon": "🚆"
            },
            "why": "Bánh tàu hỏa được thiết kế để chạy trên đường ray."
          },
          {
            "left": {
              "text": "Cánh buồm",
              "icon": "⛵"
            },
            "right": {
              "text": "Thuyền buồm",
              "icon": "🚤"
            },
            "why": "Cánh buồm hứng gió để giúp thuyền buồm di chuyển."
          },
          {
            "left": {
              "text": "Bàn đạp",
              "icon": "🚲"
            },
            "right": {
              "text": "Xe đạp",
              "icon": "🚴"
            },
            "why": "Bàn đạp truyền lực từ chân người đi sang hệ truyền động của xe đạp."
          },
          {
            "left": {
              "text": "Cánh máy bay",
              "icon": "🪽"
            },
            "right": {
              "text": "Máy bay",
              "icon": "✈️"
            },
            "why": "Cánh là bộ phận tạo lực nâng chính cho máy bay."
          }
        ]
      },
      {
        "title": "Bộ phận cơ thể và chức năng",
        "prompt": "Ghép bộ phận với chức năng chính phù hợp nhất.",
        "tip": "Chọn chức năng chính trong bài học, không phải tất cả việc bộ phận có thể tham gia.",
        "pairs": [
          {
            "left": {
              "text": "Mắt",
              "icon": "👀"
            },
            "right": {
              "text": "Nhìn",
              "icon": "🔭"
            },
            "why": "Mắt tiếp nhận ánh sáng giúp chúng ta nhìn thấy."
          },
          {
            "left": {
              "text": "Tai",
              "icon": "👂"
            },
            "right": {
              "text": "Nghe",
              "icon": "🎵"
            },
            "why": "Tai giúp tiếp nhận âm thanh."
          },
          {
            "left": {
              "text": "Mũi",
              "icon": "👃"
            },
            "right": {
              "text": "Ngửi",
              "icon": "🌸"
            },
            "why": "Mũi giúp cảm nhận mùi."
          },
          {
            "left": {
              "text": "Lưỡi",
              "icon": "👅"
            },
            "right": {
              "text": "Nếm",
              "icon": "🍋"
            },
            "why": "Lưỡi có các cơ quan vị giác giúp cảm nhận vị."
          },
          {
            "left": {
              "text": "Da",
              "icon": "🖐️"
            },
            "right": {
              "text": "Cảm nhận chạm",
              "icon": "✨"
            },
            "why": "Da chứa các thụ thể giúp cảm nhận chạm, nóng lạnh và nhiều kích thích."
          }
        ]
      },
      {
        "title": "Cây có những phần nào?",
        "prompt": "Ghép phần của cây với vai trò phù hợp nhất.",
        "tip": "Mỗi phần có một vai trò được chọn làm trọng tâm trong màn.",
        "pairs": [
          {
            "left": {
              "text": "Rễ",
              "icon": "🌱"
            },
            "right": {
              "text": "Hút nước từ đất",
              "icon": "💧"
            },
            "why": "Rễ giúp cây hút nước và muối khoáng từ đất."
          },
          {
            "left": {
              "text": "Thân",
              "icon": "🎋"
            },
            "right": {
              "text": "Nâng đỡ cây",
              "icon": "⬆️"
            },
            "why": "Thân nâng đỡ lá, hoa, quả và vận chuyển chất trong cây."
          },
          {
            "left": {
              "text": "Lá",
              "icon": "🍃"
            },
            "right": {
              "text": "Nhận ánh sáng",
              "icon": "☀️"
            },
            "why": "Lá thường là nơi nhận nhiều ánh sáng để cây quang hợp."
          },
          {
            "left": {
              "text": "Hoa",
              "icon": "🌼"
            },
            "right": {
              "text": "Tạo hạt và quả sau thụ phấn",
              "icon": "🌰"
            },
            "why": "Hoa tham gia sinh sản của nhiều loài cây và có thể phát triển thành quả chứa hạt."
          },
          {
            "left": {
              "text": "Quả",
              "icon": "🍎"
            },
            "right": {
              "text": "Bao bọc hạt",
              "icon": "🥜"
            },
            "why": "Quả của nhiều cây chứa và bảo vệ hạt bên trong."
          }
        ]
      },
      {
        "title": "Trong một ngôi nhà",
        "prompt": "Ghép phần với toàn thể mà nó thuộc về.",
        "tip": "Ghép theo quan hệ bộ phận → toàn thể, không theo việc hai thứ cùng ở trong nhà.",
        "pairs": [
          {
            "left": {
              "text": "Mái nhà",
              "icon": "🏠"
            },
            "right": {
              "text": "Ngôi nhà",
              "icon": "🏡"
            },
            "why": "Mái là phần che phía trên của ngôi nhà."
          },
          {
            "left": {
              "text": "Bậc thang",
              "icon": "🪜"
            },
            "right": {
              "text": "Cầu thang",
              "icon": "↗️"
            },
            "why": "Nhiều bậc ghép lại tạo thành cầu thang."
          },
          {
            "left": {
              "text": "Ngăn kéo",
              "icon": "📥"
            },
            "right": {
              "text": "Tủ",
              "icon": "🗄️"
            },
            "why": "Ngăn kéo là phần chứa đồ kéo ra vào trong một số loại tủ."
          },
          {
            "left": {
              "text": "Mặt bàn",
              "icon": "▭"
            },
            "right": {
              "text": "Cái bàn",
              "icon": "🪑"
            },
            "why": "Mặt bàn là bề mặt phẳng chính của cái bàn."
          },
          {
            "left": {
              "text": "Tay nắm",
              "icon": "🤏"
            },
            "right": {
              "text": "Cánh cửa",
              "icon": "🚪"
            },
            "why": "Tay nắm giúp cầm, kéo hoặc đẩy cánh cửa."
          }
        ]
      },
      {
        "title": "Một món ăn gồm gì?",
        "prompt": "Ghép thành phần với món mà nó là thành phần đặc trưng trong màn.",
        "tip": "Tên món đã được viết cụ thể để đáp án là duy nhất trong các lựa chọn.",
        "pairs": [
          {
            "left": {
              "text": "Bánh mì kẹp",
              "icon": "🥪"
            },
            "right": {
              "text": "Hai lát bánh mì",
              "icon": "🍞"
            },
            "why": "Hai lát bánh mì tạo phần vỏ kẹp của chiếc bánh mì kẹp."
          },
          {
            "left": {
              "text": "Salad rau",
              "icon": "🥗"
            },
            "right": {
              "text": "Rau xanh",
              "icon": "🥬"
            },
            "why": "Rau xanh là thành phần chính của món salad rau."
          },
          {
            "left": {
              "text": "Nước chanh",
              "icon": "🍋"
            },
            "right": {
              "text": "Nước cốt chanh",
              "icon": "🧃"
            },
            "why": "Nước cốt chanh tạo vị chua đặc trưng cho nước chanh."
          },
          {
            "left": {
              "text": "Cơm rang trứng",
              "icon": "🍚"
            },
            "right": {
              "text": "Trứng",
              "icon": "🥚"
            },
            "why": "Trứng là thành phần được nêu rõ trong món cơm rang trứng."
          },
          {
            "left": {
              "text": "Sữa chua trái cây",
              "icon": "🥣"
            },
            "right": {
              "text": "Trái cây cắt nhỏ",
              "icon": "🍓"
            },
            "why": "Trái cây cắt nhỏ là thành phần phân biệt món sữa chua trái cây với sữa chua thường."
          }
        ]
      },
      {
        "title": "Vật gì tạo nên bộ đồ?",
        "prompt": "Ghép món đồ với nhóm hoàn chỉnh phù hợp nhất.",
        "tip": "Có cặp tạo từ hai món, có cặp tạo từ nhiều món; đọc tên nhóm thật kỹ.",
        "pairs": [
          {
            "left": {
              "text": "Một chiếc tất",
              "icon": "🧦"
            },
            "right": {
              "text": "Đôi tất",
              "icon": "🧦🧦"
            },
            "why": "Hai chiếc tất phù hợp tạo thành một đôi tất."
          },
          {
            "left": {
              "text": "Một chiếc găng",
              "icon": "🧤"
            },
            "right": {
              "text": "Đôi găng tay",
              "icon": "🧤🧤"
            },
            "why": "Hai chiếc găng trái và phải tạo thành một đôi găng tay."
          },
          {
            "left": {
              "text": "Một chiếc đũa",
              "icon": "🥢"
            },
            "right": {
              "text": "Đôi đũa",
              "icon": "🥢🥢"
            },
            "why": "Hai chiếc đũa được dùng cùng nhau thành một đôi."
          },
          {
            "left": {
              "text": "Một quân cờ",
              "icon": "♟️"
            },
            "right": {
              "text": "Bộ cờ",
              "icon": "♟️♟️"
            },
            "why": "Nhiều quân cờ thuộc về một bộ cờ."
          },
          {
            "left": {
              "text": "Một mảnh xếp hình",
              "icon": "🧩"
            },
            "right": {
              "text": "Bức ghép hình",
              "icon": "🖼️"
            },
            "why": "Nhiều mảnh xếp đúng vị trí tạo thành bức ghép hình hoàn chỉnh."
          }
        ]
      },
      {
        "title": "Phần nào thuộc đồ vật nào?",
        "prompt": "Ghép bộ phận với đồ vật có bộ phận đó đặc trưng nhất.",
        "tip": "Một số bộ phận như 'nắp' có thể có ở nhiều đồ vật, nhưng tên và lựa chọn của màn đã giới hạn cặp phù hợp nhất.",
        "pairs": [
          {
            "left": {
              "text": "Quai",
              "icon": "👜"
            },
            "right": {
              "text": "Túi xách",
              "icon": "👛"
            },
            "why": "Quai giúp cầm hoặc đeo túi xách."
          },
          {
            "left": {
              "text": "Nắp",
              "icon": "🫙"
            },
            "right": {
              "text": "Cái nồi",
              "icon": "🍲"
            },
            "why": "Nắp nồi che phần miệng nồi khi nấu."
          },
          {
            "left": {
              "text": "Ngòi",
              "icon": "🖊️"
            },
            "right": {
              "text": "Bút",
              "icon": "✏️"
            },
            "why": "Ngòi là phần tạo nét của nhiều loại bút."
          },
          {
            "left": {
              "text": "Lưỡi",
              "icon": "🔪"
            },
            "right": {
              "text": "Kéo",
              "icon": "✂️"
            },
            "why": "Hai lưỡi kéo khép lại để cắt vật liệu."
          },
          {
            "left": {
              "text": "Màn hình",
              "icon": "🖥️"
            },
            "right": {
              "text": "Máy tính",
              "icon": "💻"
            },
            "why": "Màn hình hiển thị hình ảnh và nội dung từ máy tính."
          }
        ]
      },
      {
        "title": "Con vật và dấu hiệu nhận biết",
        "prompt": "Ghép con vật với đặc điểm cơ thể nổi bật nhất trong các lựa chọn.",
        "tip": "Đây là đặc điểm nhận biết nổi bật, không phải mọi bộ phận mà con vật đều có.",
        "pairs": [
          {
            "left": {
              "text": "Voi",
              "icon": "🐘"
            },
            "right": {
              "text": "Vòi dài",
              "icon": "➰"
            },
            "why": "Vòi là đặc điểm rất nổi bật của voi, dùng để thở, ngửi, hút nước và cầm nắm."
          },
          {
            "left": {
              "text": "Hươu cao cổ",
              "icon": "🦒"
            },
            "right": {
              "text": "Cổ rất dài",
              "icon": "📏"
            },
            "why": "Hươu cao cổ nổi bật với chiếc cổ dài giúp với tới lá cây cao."
          },
          {
            "left": {
              "text": "Rùa",
              "icon": "🐢"
            },
            "right": {
              "text": "Mai cứng",
              "icon": "🛡️"
            },
            "why": "Mai cứng bao quanh và bảo vệ cơ thể rùa."
          },
          {
            "left": {
              "text": "Tê giác",
              "icon": "🦏"
            },
            "right": {
              "text": "Sừng trên mũi",
              "icon": "🔺"
            },
            "why": "Tê giác nổi bật với một hoặc hai sừng trên vùng mũi."
          },
          {
            "left": {
              "text": "Thỏ",
              "icon": "🐰"
            },
            "right": {
              "text": "Tai dài",
              "icon": "👂"
            },
            "why": "Nhiều giống thỏ có đôi tai dài nổi bật giúp nghe âm thanh tốt."
          }
        ]
      }
    ]
  },
  {
    "id": "l6",
    "title": "Cấp 6 · Thám tử liên tưởng",
    "tone": "purple",
    "summary": "6 cặp/màn; phải bám đúng loại quan hệ, phương án nhiễu rất gần nhau.",
    "rounds": [
      {
        "title": "Con non tìm mẹ",
        "prompt": "Ghép con non với con trưởng thành cùng loài.",
        "tip": "Các đáp án đều là động vật nuôi, nên chỉ được ghép đúng cùng loài.",
        "pairs": [
          {
            "left": {
              "text": "Gà con",
              "icon": "🐥"
            },
            "right": {
              "text": "Gà mái",
              "icon": "🐔"
            },
            "why": "Gà con thuộc loài gà và lớn lên thành gà trưởng thành."
          },
          {
            "left": {
              "text": "Vịt con",
              "icon": "🐤"
            },
            "right": {
              "text": "Vịt",
              "icon": "🦆"
            },
            "why": "Vịt con là giai đoạn nhỏ của vịt."
          },
          {
            "left": {
              "text": "Chó con",
              "icon": "🐶"
            },
            "right": {
              "text": "Chó",
              "icon": "🐕"
            },
            "why": "Chó con lớn lên thành chó trưởng thành."
          },
          {
            "left": {
              "text": "Mèo con",
              "icon": "🐱"
            },
            "right": {
              "text": "Mèo",
              "icon": "🐈"
            },
            "why": "Mèo con lớn lên thành mèo trưởng thành."
          },
          {
            "left": {
              "text": "Bê con",
              "icon": "🐮"
            },
            "right": {
              "text": "Bò",
              "icon": "🐄"
            },
            "why": "Bê là con non của bò."
          },
          {
            "left": {
              "text": "Ngựa con",
              "icon": "🐴"
            },
            "right": {
              "text": "Ngựa",
              "icon": "🐎"
            },
            "why": "Ngựa con lớn lên thành ngựa trưởng thành."
          }
        ]
      },
      {
        "title": "Đồ vật phải về đâu?",
        "prompt": "Ghép đồ vật với nơi cất phù hợp nhất sau khi dùng xong.",
        "tip": "Nhiều thứ đều có thể đặt tạm trên bàn, nhưng câu hỏi hỏi nơi cất đúng sau khi dùng.",
        "pairs": [
          {
            "left": {
              "text": "Sách",
              "icon": "📚"
            },
            "right": {
              "text": "Giá sách",
              "icon": "📖"
            },
            "why": "Sách được xếp lên giá để dễ tìm và giữ gọn."
          },
          {
            "left": {
              "text": "Áo quần",
              "icon": "👕"
            },
            "right": {
              "text": "Tủ quần áo",
              "icon": "🚪"
            },
            "why": "Quần áo sạch thường được gấp hoặc treo trong tủ quần áo."
          },
          {
            "left": {
              "text": "Đồ chơi",
              "icon": "🧸"
            },
            "right": {
              "text": "Hộp đồ chơi",
              "icon": "📦"
            },
            "why": "Đồ chơi được cất vào hộp giúp khu vực chơi gọn gàng."
          },
          {
            "left": {
              "text": "Bát đĩa bẩn",
              "icon": "🍽️"
            },
            "right": {
              "text": "Bồn rửa",
              "icon": "🚰"
            },
            "why": "Bát đĩa bẩn được đưa đến bồn rửa để làm sạch."
          },
          {
            "left": {
              "text": "Rác giấy",
              "icon": "🧻"
            },
            "right": {
              "text": "Thùng rác",
              "icon": "🗑️"
            },
            "why": "Rác giấy cần bỏ đúng thùng rác."
          },
          {
            "left": {
              "text": "Giày dép",
              "icon": "👟"
            },
            "right": {
              "text": "Kệ giày",
              "icon": "👞"
            },
            "why": "Giày dép được xếp lên kệ giày để gọn và dễ lấy."
          }
        ]
      },
      {
        "title": "Nghề nào làm việc này?",
        "prompt": "Ghép công việc với nghề chịu trách nhiệm chính trong các lựa chọn.",
        "tip": "Ghép theo trách nhiệm nghề nghiệp chính, không phải người đó 'có thể giúp'.",
        "pairs": [
          {
            "left": {
              "text": "Dạy học sinh đọc viết",
              "icon": "📖"
            },
            "right": {
              "text": "Giáo viên",
              "icon": "👩‍🏫"
            },
            "why": "Giáo viên tổ chức và hướng dẫn hoạt động học tập cho học sinh."
          },
          {
            "left": {
              "text": "Khám người bệnh",
              "icon": "🩺"
            },
            "right": {
              "text": "Bác sĩ",
              "icon": "🧑‍⚕️"
            },
            "why": "Bác sĩ có chuyên môn khám và điều trị bệnh."
          },
          {
            "left": {
              "text": "Dập tắt đám cháy",
              "icon": "🔥"
            },
            "right": {
              "text": "Lính cứu hỏa",
              "icon": "🧑‍🚒"
            },
            "why": "Lính cứu hỏa được huấn luyện để chữa cháy và cứu nạn."
          },
          {
            "left": {
              "text": "Nấu món ăn trong nhà hàng",
              "icon": "🍳"
            },
            "right": {
              "text": "Đầu bếp",
              "icon": "🧑‍🍳"
            },
            "why": "Đầu bếp chịu trách nhiệm chế biến món ăn."
          },
          {
            "left": {
              "text": "Trồng và chăm cây trồng",
              "icon": "🌾"
            },
            "right": {
              "text": "Nông dân",
              "icon": "🧑‍🌾"
            },
            "why": "Nông dân canh tác và chăm sóc cây trồng."
          },
          {
            "left": {
              "text": "Sửa động cơ xe",
              "icon": "🚗"
            },
            "right": {
              "text": "Thợ sửa xe",
              "icon": "🧑‍🔧"
            },
            "why": "Thợ sửa xe kiểm tra và sửa các bộ phận của phương tiện."
          }
        ]
      },
      {
        "title": "Dấu hiệu bí mật",
        "prompt": "Ghép lời mô tả với đồ vật duy nhất phù hợp.",
        "tip": "Mỗi mô tả có nhiều chi tiết. Chỉ chọn khi tất cả chi tiết cùng đúng.",
        "pairs": [
          {
            "left": {
              "text": "Có kim hoặc số để chỉ giờ",
              "icon": "🔍"
            },
            "right": {
              "text": "Đồng hồ",
              "icon": "⌚"
            },
            "why": "Đồng hồ dùng các kim hoặc chữ số để biểu diễn thời gian."
          },
          {
            "left": {
              "text": "Có nhiều trang và có thể đọc",
              "icon": "🔍"
            },
            "right": {
              "text": "Quyển sách",
              "icon": "📕"
            },
            "why": "Quyển sách gồm nhiều trang chứa chữ hoặc hình để đọc."
          },
          {
            "left": {
              "text": "Có hai lưỡi mở khép để cắt",
              "icon": "🔍"
            },
            "right": {
              "text": "Kéo",
              "icon": "✂️"
            },
            "why": "Hai lưỡi kéo khép lại tạo lực cắt."
          },
          {
            "left": {
              "text": "Có tay cầm và dùng để che mưa",
              "icon": "🔍"
            },
            "right": {
              "text": "Ô",
              "icon": "☂️"
            },
            "why": "Ô có cán cầm và tán rộng để che mưa."
          },
          {
            "left": {
              "text": "Có vạch chia để đo chiều dài",
              "icon": "🔍"
            },
            "right": {
              "text": "Thước",
              "icon": "📏"
            },
            "why": "Thước có các vạch chia dùng để đo độ dài."
          },
          {
            "left": {
              "text": "Có quai, dùng để mang sách đến trường",
              "icon": "🔍"
            },
            "right": {
              "text": "Cặp sách",
              "icon": "🎒"
            },
            "why": "Cặp sách có quai đeo và ngăn chứa sách vở."
          }
        ]
      },
      {
        "title": "Tình huống an toàn",
        "prompt": "Ghép tình huống với hành động an toàn nhất trong các lựa chọn.",
        "tip": "Câu hỏi là 'an toàn nhất', vì vậy đừng chọn cách nhanh nhưng có rủi ro.",
        "pairs": [
          {
            "left": {
              "text": "Muốn sang đường",
              "icon": "🚶"
            },
            "right": {
              "text": "Qua ở vạch sang đường khi được phép",
              "icon": "🚸"
            },
            "why": "Qua đường tại nơi dành cho người đi bộ và theo tín hiệu giúp giảm rủi ro."
          },
          {
            "left": {
              "text": "Đi xe đạp",
              "icon": "🚲"
            },
            "right": {
              "text": "Đội mũ bảo hiểm vừa đầu",
              "icon": "⛑️"
            },
            "why": "Mũ bảo hiểm phù hợp giúp bảo vệ đầu khi xảy ra va chạm."
          },
          {
            "left": {
              "text": "Người lạ gõ cửa khi bé ở nhà",
              "icon": "🚪"
            },
            "right": {
              "text": "Không tự mở, báo người lớn",
              "icon": "📞"
            },
            "why": "Bé không nên tự mở cửa cho người lạ; cần báo người lớn đáng tin cậy."
          },
          {
            "left": {
              "text": "Ngửi thấy mùi khét, có khói",
              "icon": "💨"
            },
            "right": {
              "text": "Rời xa và báo người lớn",
              "icon": "🧑"
            },
            "why": "Khói có thể báo hiệu cháy; cần tránh lại gần và báo người lớn ngay."
          },
          {
            "left": {
              "text": "Bị lạc ở siêu thị",
              "icon": "🛒"
            },
            "right": {
              "text": "Đứng nơi an toàn và nhờ nhân viên giúp",
              "icon": "🧑‍💼"
            },
            "why": "Nhân viên tại quầy hỗ trợ có thể giúp liên hệ người thân; không tự đi ra ngoài tìm."
          },
          {
            "left": {
              "text": "Tay dính bẩn trước khi ăn",
              "icon": "👐"
            },
            "right": {
              "text": "Rửa tay với xà phòng",
              "icon": "🧼"
            },
            "why": "Rửa tay sạch trước khi ăn giúp giảm bụi bẩn và vi khuẩn trên tay."
          }
        ]
      },
      {
        "title": "Cây cho ta phần nào để ăn?",
        "prompt": "Ghép cây/thực phẩm với bộ phận thực vật được ăn trong ví dụ.",
        "tip": "Các đáp án đều là bộ phận của cây; phải nhớ chính xác phần nào được ăn.",
        "pairs": [
          {
            "left": {
              "text": "Cà rốt",
              "icon": "🥕"
            },
            "right": {
              "text": "Rễ củ",
              "icon": "🌱"
            },
            "why": "Phần cà rốt chúng ta ăn là rễ phình to dự trữ chất dinh dưỡng."
          },
          {
            "left": {
              "text": "Rau cải",
              "icon": "🥬"
            },
            "right": {
              "text": "Lá",
              "icon": "🍃"
            },
            "why": "Phần lá là bộ phận thường được ăn của rau cải."
          },
          {
            "left": {
              "text": "Súp lơ",
              "icon": "🥦"
            },
            "right": {
              "text": "Cụm hoa",
              "icon": "🌼"
            },
            "why": "Phần ăn của súp lơ là cụm hoa chưa nở hoàn toàn."
          },
          {
            "left": {
              "text": "Mía",
              "icon": "🎋"
            },
            "right": {
              "text": "Thân",
              "icon": "🌿"
            },
            "why": "Thân mía chứa nhiều dịch ngọt và là phần được ép lấy nước."
          },
          {
            "left": {
              "text": "Ngô",
              "icon": "🌽"
            },
            "right": {
              "text": "Hạt",
              "icon": "🌰"
            },
            "why": "Hạt ngô trên bắp là phần thường được ăn."
          },
          {
            "left": {
              "text": "Cà chua",
              "icon": "🍅"
            },
            "right": {
              "text": "Quả",
              "icon": "🍎"
            },
            "why": "Cà chua là quả hình thành từ hoa và chứa hạt bên trong."
          }
        ]
      },
      {
        "title": "Nơi nào có âm thanh ấy?",
        "prompt": "Ghép nơi với âm thanh đặc trưng nhất trong các lựa chọn.",
        "tip": "Nhiều âm thanh có thể xuất hiện ở nhiều nơi, nhưng chọn âm thanh đặc trưng nhất theo bối cảnh màn.",
        "pairs": [
          {
            "left": {
              "text": "Bãi biển",
              "icon": "🏖️"
            },
            "right": {
              "text": "Tiếng sóng vỗ",
              "icon": "🌊"
            },
            "why": "Sóng liên tục xô vào bờ tạo âm thanh đặc trưng của bãi biển."
          },
          {
            "left": {
              "text": "Sân trường",
              "icon": "🏫"
            },
            "right": {
              "text": "Tiếng trống trường",
              "icon": "🥁"
            },
            "why": "Trống trường báo giờ là âm thanh đặc trưng trong nhiều trường học."
          },
          {
            "left": {
              "text": "Nông trại",
              "icon": "🚜"
            },
            "right": {
              "text": "Tiếng gà gáy",
              "icon": "🐓"
            },
            "why": "Tiếng gà gáy thường gắn với khung cảnh nông trại."
          },
          {
            "left": {
              "text": "Nhà ga",
              "icon": "🚉"
            },
            "right": {
              "text": "Tiếng còi tàu",
              "icon": "🚆"
            },
            "why": "Còi tàu báo hiệu tàu đến hoặc rời ga."
          },
          {
            "left": {
              "text": "Sân vận động",
              "icon": "🏟️"
            },
            "right": {
              "text": "Tiếng cổ vũ",
              "icon": "📣"
            },
            "why": "Đám đông khán giả thường tạo tiếng reo hò, cổ vũ trong sân vận động."
          },
          {
            "left": {
              "text": "Rừng cây",
              "icon": "🌲"
            },
            "right": {
              "text": "Tiếng chim và lá xào xạc",
              "icon": "🐦"
            },
            "why": "Trong rừng có thể nghe tiếng chim và tiếng lá chuyển động trong gió."
          }
        ]
      },
      {
        "title": "Vật liệu tạo nên gì?",
        "prompt": "Ghép vật liệu với sản phẩm được nêu rõ là làm chủ yếu từ vật liệu đó.",
        "tip": "Tên sản phẩm đã nói rõ chất liệu để không có hai đáp án đúng.",
        "pairs": [
          {
            "left": {
              "text": "Giấy",
              "icon": "📄"
            },
            "right": {
              "text": "Quyển vở giấy",
              "icon": "📒"
            },
            "why": "Phần trang của quyển vở chủ yếu được làm từ giấy."
          },
          {
            "left": {
              "text": "Thủy tinh",
              "icon": "🔷"
            },
            "right": {
              "text": "Cốc thủy tinh",
              "icon": "🥛"
            },
            "why": "Cốc thủy tinh được tạo từ vật liệu thủy tinh."
          },
          {
            "left": {
              "text": "Gỗ",
              "icon": "🪵"
            },
            "right": {
              "text": "Bàn gỗ",
              "icon": "🪑"
            },
            "why": "Bàn gỗ có các bộ phận chính làm bằng gỗ."
          },
          {
            "left": {
              "text": "Đất sét",
              "icon": "🟤"
            },
            "right": {
              "text": "Chậu đất nung",
              "icon": "🏺"
            },
            "why": "Đất sét được tạo hình rồi nung để làm chậu đất."
          },
          {
            "left": {
              "text": "Len",
              "icon": "🧶"
            },
            "right": {
              "text": "Khăn len",
              "icon": "🧣"
            },
            "why": "Sợi len được đan hoặc dệt thành khăn len."
          },
          {
            "left": {
              "text": "Kim loại",
              "icon": "⚙️"
            },
            "right": {
              "text": "Thìa inox",
              "icon": "🥄"
            },
            "why": "Thìa inox được làm từ hợp kim kim loại không gỉ."
          }
        ]
      }
    ]
  }
];

  /* =====================================================================
     Giao diện mới: ít chữ, hình to, có giọng đọc.
     Bé chạm vào thẻ nào, cô đọc tên thẻ đó.
     ===================================================================== */
  const STARS_KEY = "class1-missing-piece-stars";
  let pairOrder = new Map(); /* thứ tự cặp đã ghép, để đánh số giống nhau ở hai bên */
  let hintStep = new Map(); /* số lần gợi ý của từng cặp */
  let muted = false;
  let finishTimer = 0;

  const esc = (value) => String(value == null ? "" : value)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;").replace(/'/g, "&#39;");

  function shuffle(values) {
    const out = values.slice();
    for (let i = out.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [out[i], out[j]] = [out[j], out[i]];
    }
    return out;
  }

  const stars = (() => { try { return JSON.parse(window.localStorage.getItem(STARS_KEY) || "{}") || {}; } catch (_) { return {}; } })();
  function saveStars(key, n) {
    stars[key] = Math.max(stars[key] || 0, n);
    try { window.localStorage.setItem(STARS_KEY, JSON.stringify(stars)); } catch (_) {}
  }
  const roundKey = (li, ri) => `${li}-${ri}`;
  const shortLevel = (l) => l.title.replace(/^Cấp\s*\d+\s*·\s*/, "");
  const starRow = (n, cls = "ee-mp-stars") => `<span class="${cls}" aria-label="${n} sao">${[1, 2, 3].map((i) => `<span class="${i <= n ? "" : "off"}">★</span>`).join("")}</span>`;

  function host() { return activeContext && activeContext.host; }
  function level() { return LEVELS[currentLevelIndex] || null; }
  function round() { const l = level(); return l && l.rounds[currentRoundIndex] ? l.rounds[currentRoundIndex] : null; }

  /* ---------- Giọng đọc: ưu tiên giọng Việt có sẵn trong máy, không có thì dùng Google ---------- */
  const ttsAudio = new Audio();
  ttsAudio.referrerPolicy = "no-referrer";
  ttsAudio.preload = "none";
  let ttsNonce = 0;
  let ttsQueue = [];
  const synth = typeof window !== "undefined" && "speechSynthesis" in window ? window.speechSynthesis : null;
  if (synth) { try { synth.getVoices(); } catch (_) {} }
  function viVoice() {
    if (!synth) return null;
    try { return synth.getVoices().find((v) => /^vi([-_]|$)/i.test(v.lang)) || null; } catch (_) { return null; }
  }
  function ttsUrl(text) {
    return `https://translate.google.com/translate_tts?ie=UTF-8&tl=vi&client=tw-ob&q=${encodeURIComponent(String(text || ""))}`;
  }
  function splitTtsText(text, maxLength = 170) {
    const clean = String(text || "").replace(/\s+/g, " ").trim();
    if (!clean) return [];
    const pieces = clean.match(/[^.!?;:]+[.!?;:]?/g) || [clean];
    const out = [];
    let buf = "";
    pieces.forEach((p) => {
      const part = p.trim();
      if (!part) return;
      if (!buf) buf = part;
      else if ((buf + " " + part).length <= maxLength) buf += " " + part;
      else { out.push(buf); buf = part; }
    });
    if (buf) out.push(buf);
    return out;
  }
  function stopSpeak() {
    ttsNonce += 1;
    ttsQueue = [];
    try { if (synth) synth.cancel(); } catch (_) {}
    try { ttsAudio.pause(); ttsAudio.removeAttribute("src"); ttsAudio.load(); } catch (_) {}
  }
  function showVoiceNote() {
    const n = host() && host().querySelector("#ee-mp-voice-note");
    if (n) { n.hidden = false; n.textContent = "Chưa phát được giọng đọc. Con nhờ người lớn kiểm tra loa và mạng nhé."; }
  }
  function playNext(nonce, quiet) {
    if (nonce !== ttsNonce || !ttsQueue.length) return;
    const chunk = ttsQueue.shift();
    const voice = viVoice();
    if (voice) {
      try {
        const u = new SpeechSynthesisUtterance(chunk);
        u.voice = voice; u.lang = voice.lang; u.rate = 0.92; u.pitch = 1.08;
        u.onend = () => playNext(nonce, true);
        u.onerror = (e) => { if (nonce === ttsNonce && !quiet && e.error !== "interrupted" && e.error !== "canceled") showVoiceNote(); };
        synth.speak(u);
        return;
      } catch (_) { /* dùng Google bên dưới */ }
    }
    try {
      ttsAudio.src = ttsUrl(chunk);
      ttsAudio.playbackRate = 0.96;
      const p = ttsAudio.play();
      if (p && typeof p.catch === "function") p.catch(() => { if (nonce === ttsNonce && !quiet) showVoiceNote(); });
    } catch (_) { if (!quiet) showVoiceNote(); }
  }
  ttsAudio.addEventListener("ended", () => { if (ttsQueue.length) playNext(ttsNonce, true); });
  /* quiet = true: tự đọc (không báo lỗi); force = true: đọc cả khi đang tắt tiếng tự động */
  function speak(text, quiet = false, force = false) {
    if (muted && !force) return;
    const chunks = splitTtsText(text);
    if (!chunks.length) return;
    stopSpeak();
    const nonce = ++ttsNonce;
    ttsQueue = chunks;
    playNext(nonce, quiet);
  }

  /* ---------- Thanh điều hướng ---------- */
  function setBanner(items) {
    const fn = activeContext && activeContext.hooks && activeContext.hooks.setSubBanner;
    if (typeof fn === "function") fn({ items });
  }
  function setRegistryBanner() {
    setBanner([{ level: 2, title: `${GAME_NUMBER}. Mảnh ghép còn thiếu`, action: null }]);
  }
  function setLevelBanner(levelIndex) {
    setBanner([
      { level: 2, title: `${GAME_NUMBER}. Mảnh ghép còn thiếu`, action: renderLevelRegistry },
      { level: 3, title: `${GAME_NUMBER}.${levelIndex + 1} Cấp ${levelIndex + 1}`, action: null }
    ]);
  }
  function setRoundBanner(levelIndex, roundIndex) {
    setBanner([
      { level: 2, title: `${GAME_NUMBER}. Mảnh ghép còn thiếu`, action: renderLevelRegistry },
      { level: 3, title: `${GAME_NUMBER}.${levelIndex + 1} Cấp ${levelIndex + 1}`, action: () => renderRoundRegistry(levelIndex) },
      { level: 4, title: `${GAME_NUMBER}.${levelIndex + 1}.${roundIndex + 1} Màn ${roundIndex + 1}`, action: null }
    ]);
  }

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
      .ee-mp-page{padding:.15rem .1rem 1rem;color:#344054;font-family:"Baloo 2","Nunito","Segoe UI",system-ui,sans-serif}
      .ee-mp-page button{font-family:inherit}
      .ee-mp-bubble{display:flex;align-items:center;gap:.6rem;border:2px solid #F9A8D4;border-radius:18px;background:#FFF1F7;padding:.55rem .8rem;margin:0 0 .9rem;color:#BE185D;font-size:19px;font-weight:700;line-height:1.35}
      .ee-mp-bubble .ico{font-size:30px;line-height:1}
      .ee-mp-bubble .txt{flex:1}
      .ee-mp-say{flex:0 0 auto;min-width:48px;min-height:48px;border-radius:14px;border:2px solid #F9A8D4;background:#fff;cursor:pointer;font-size:22px}
      .ee-mp-say:hover{border-color:#EC4899}
      .ee-mp-say.mute{opacity:.55}
      .ee-mp-levels{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:.8rem}
      .ee-mp-level{display:flex;flex-direction:column;gap:.35rem;align-items:flex-start;border:2px solid #E9D5FF;border-radius:20px;background:#fff;padding:.8rem .9rem;cursor:pointer;text-align:left;transition:transform .14s,box-shadow .14s}
      .ee-mp-level:hover{transform:translateY(-2px);box-shadow:0 10px 22px rgba(139,92,246,.12)}
      .ee-mp-level[data-tone=pink]{background:#FFF1F7;border-color:#FBCFE8}.ee-mp-level[data-tone=teal]{background:#ECFDF5;border-color:#A7F3D0}.ee-mp-level[data-tone=purple]{background:#F5F3FF;border-color:#DDD6FE}.ee-mp-level[data-tone=amber]{background:#FFFBEB;border-color:#FDE68A}
      .ee-mp-level .top{display:flex;align-items:center;gap:.6rem;width:100%}
      .ee-mp-level .num{width:46px;height:46px;flex:0 0 46px;border-radius:50%;display:grid;place-items:center;background:linear-gradient(135deg,#EC4899,#8B5CF6);color:#fff;font-size:24px;font-weight:800}
      .ee-mp-level h3{margin:0;color:#5B216E;font-size:21px;font-weight:800;line-height:1.2}
      .ee-mp-level .icons{font-size:30px;letter-spacing:4px;line-height:1.3}
      .ee-mp-level .prog{display:flex;align-items:center;gap:.4rem;color:#6D28D9;font-size:15px;font-weight:700}
      .ee-mp-bar{width:110px;height:10px;border-radius:999px;background:#EDE9FE;overflow:hidden}.ee-mp-bar span{display:block;height:100%;background:linear-gradient(90deg,#EC4899,#8B5CF6)}
      .ee-mp-rounds{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:.7rem}
      .ee-mp-round{position:relative;display:flex;flex-direction:column;align-items:center;gap:.25rem;border:2px solid #E9D5FF;border-radius:18px;background:#fff;padding:.75rem .5rem .6rem;cursor:pointer;text-align:center;transition:transform .14s,border-color .14s}
      .ee-mp-round:hover{transform:translateY(-2px);border-color:#C4B5FD}
      .ee-mp-round.done{background:#F0FDF4;border-color:#A7F3D0}
      .ee-mp-round .n{position:absolute;left:8px;top:8px;width:34px;height:34px;border-radius:50%;display:grid;place-items:center;background:linear-gradient(135deg,#EC4899,#8B5CF6);color:#fff;font-size:19px;font-weight:800}
      .ee-mp-round .pair{font-size:38px;line-height:1.2}
      .ee-mp-round .pair i{font-style:normal;font-size:20px;color:#C4B5FD;margin:0 .2rem;vertical-align:middle}
      .ee-mp-round strong{color:#5B216E;font-size:22px;font-weight:800;line-height:1.25}
      .ee-mp-stars{color:#F59E0B;font-size:22px;letter-spacing:2px}.ee-mp-round .ee-mp-stars{margin-top:auto}.ee-mp-stars .off{color:#E5E7EB}
      .ee-mp-head{display:flex;align-items:center;gap:.7rem;flex-wrap:wrap;margin-bottom:.6rem}
      .ee-mp-head h2{margin:0;color:#5B216E;font-size:26px;font-weight:800;line-height:1.2;flex:1;min-width:200px}
      .ee-mp-dots{display:flex;gap:6px}
      .ee-mp-dots span{width:20px;height:20px;border-radius:50%;background:#EDE9FE}
      .ee-mp-dots span.on{background:#10B981}
      .ee-mp-dots span.peek{background:#FBBF24}
      .ee-mp-board{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:1.4rem;padding:.8rem;border:2px solid #E9D5FF;border-radius:22px;background:linear-gradient(180deg,#fff,#FAF5FF)}
      .ee-mp-col{display:flex;flex-direction:column;gap:.6rem;min-width:0}
      .ee-mp-piece{position:relative;min-height:74px;width:100%;border:3px solid #E9D5FF;border-radius:18px;background:#fff;padding:.45rem .7rem;display:flex;align-items:center;gap:.7rem;text-align:left;cursor:pointer;color:#344054;transition:transform .12s,border-color .12s,background .12s,opacity .12s}
      .ee-mp-piece:hover{border-color:#C4B5FD;transform:translateY(-1px)}
      .ee-mp-piece .ico{font-size:40px;line-height:1;flex:0 0 48px;text-align:center}
      .ee-mp-piece .txt{font-size:19px;font-weight:700;line-height:1.25;color:#3B0764}
      .ee-mp-piece.selected{border-color:#EC4899;background:#FFF1F7;box-shadow:0 0 0 4px rgba(236,72,153,.15)}
      .ee-mp-piece.hint{border-color:#38BDF8;background:#F0F9FF}
      .ee-mp-piece.dim{opacity:.25}
      .ee-mp-piece.matched{border-color:#34D399;background:#ECFDF5;cursor:default}
      .ee-mp-piece.revealed{border-color:#FBBF24;background:#FFFBEB}
      .ee-mp-piece .badge{position:absolute;right:8px;top:50%;transform:translateY(-50%);width:32px;height:32px;border-radius:50%;display:grid;place-items:center;background:#10B981;color:#fff;font-size:17px;font-weight:800}
      .ee-mp-piece.revealed .badge{background:#F59E0B}
      .ee-mp-piece.wrong{animation:eeMpShake .45s}
      @keyframes eeMpShake{0%,100%{transform:translateX(0);border-color:#F87171}25%{transform:translateX(-6px);border-color:#F87171}75%{transform:translateX(6px);border-color:#F87171}}
      .ee-mp-foot{margin-top:.7rem;display:grid;grid-template-columns:minmax(0,1fr) auto;gap:.6rem;align-items:stretch}
      .ee-mp-fb{display:flex;align-items:center;gap:.6rem;border:2px solid #E9D5FF;border-radius:18px;background:#fff;padding:.5rem .8rem;color:#5B216E;font-size:18px;font-weight:700;line-height:1.35;min-height:62px}
      .ee-mp-fb .ico{font-size:28px}
      .ee-mp-fb.good{border-color:#6EE7B7;background:#ECFDF5;color:#047857}
      .ee-mp-fb.bad{border-color:#FDA4AF;background:#FFF1F2;color:#BE123C}
      .ee-mp-fb.tip{border-color:#7DD3FC;background:#F0F9FF;color:#0369A1}
      .ee-mp-acts{display:flex;gap:.5rem}
      .ee-mp-btn{min-height:62px;padding:0 1rem;border-radius:18px;border:2px solid #6EE7B7;background:linear-gradient(90deg,#ECFDF5,#E0F2FE);color:#047857;font-size:18px;font-weight:700;cursor:pointer;white-space:nowrap}
      .ee-mp-btn.amber{border-color:#FCD34D;background:#FFFBEB;color:#B45309}
      .ee-mp-btn.primary{border:none;background:linear-gradient(90deg,#EC4899,#8B5CF6);color:#fff;box-shadow:0 8px 16px rgba(139,92,246,.22)}
      .ee-mp-btn:focus-visible,.ee-mp-piece:focus-visible,.ee-mp-level:focus-visible,.ee-mp-round:focus-visible,.ee-mp-say:focus-visible{outline:3px solid #F472B6;outline-offset:2px}
      .ee-mp-voice-note{margin:0 0 .6rem;padding:.4rem .7rem;border-radius:12px;background:#FFF7ED;color:#C2410C;font-size:16px;font-weight:600}
      .ee-mp-finish{border:2px solid #FBCFE8;border-radius:24px;background:linear-gradient(135deg,#FFF1F7,#F5F3FF);padding:1rem;text-align:center}
      .ee-mp-finish .big{font-size:54px;line-height:1.1}
      .ee-mp-finish h2{margin:.2rem 0;color:#BE185D;font-size:30px;font-weight:800}
      .ee-mp-finish .bigstars{font-size:46px;color:#F59E0B;letter-spacing:6px}.ee-mp-finish .bigstars .off{color:#E5E7EB}
      .ee-mp-recap{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:.5rem;margin:.9rem 0;text-align:left}
      .ee-mp-recap button{display:flex;align-items:center;gap:.5rem;border:2px solid #E9D5FF;border-radius:16px;background:#fff;padding:.45rem .6rem;cursor:pointer;color:#3B0764;font-size:16px;font-weight:700;line-height:1.25}
      .ee-mp-recap .e{font-size:28px;white-space:nowrap}
      .ee-mp-finish-actions{display:flex;justify-content:center;gap:.6rem;flex-wrap:wrap}
      @media(max-width:1000px){.ee-mp-rounds{grid-template-columns:repeat(3,minmax(0,1fr))}.ee-mp-levels{grid-template-columns:repeat(2,minmax(0,1fr))}}
      @media(max-width:700px){.ee-mp-rounds{grid-template-columns:repeat(2,minmax(0,1fr))}.ee-mp-round strong{font-size:18px}.ee-mp-round .n{width:28px;height:28px;font-size:16px}.ee-mp-round .pair{font-size:32px;padding-left:18px}.ee-mp-board{gap:.6rem;padding:.5rem}.ee-mp-piece{min-height:66px;padding:.4rem .45rem;gap:.4rem}.ee-mp-piece .ico{font-size:30px;flex-basis:34px}.ee-mp-piece .txt{font-size:16px}.ee-mp-foot{grid-template-columns:1fr}.ee-mp-acts .ee-mp-btn{flex:1}.ee-mp-piece .badge{width:26px;height:26px;font-size:14px;right:4px}}
      @media(max-width:480px){.ee-mp-levels{grid-template-columns:1fr}}
      @media(prefers-reduced-motion:reduce){.ee-mp-piece.wrong{animation:none}}
    `;
    document.head.appendChild(style);
  }

  function resetRoundState(r) {
    leftSelected = "";
    rightSelected = "";
    matched = new Set();
    hinted = new Set();
    revealed = new Set();
    secondHintChoices = new Set();
    pairOrder = new Map();
    hintStep = new Map();
    wrongAttempts = 0;
    rightOrder = shuffle(r.pairs.map((_, i) => String(i)));
  }

  /* ---------- Trang chọn cấp ---------- */
  const INTRO = "Chạm một mảnh bên trái, rồi chạm mảnh hợp với nó bên phải!";
  function renderLevelRegistry() {
    stopSpeak();
    window.clearTimeout(finishTimer);
    currentLevelIndex = -1;
    currentRoundIndex = -1;
    setRegistryBanner();
    const h = host();
    if (!h) return;
    h.innerHTML = `
      <div class="ee-mp-page">
        <div class="section-heading"><div><h1>🔗 Mảnh ghép còn thiếu</h1><p>6 cấp • 48 màn</p></div><button id="ee-mp-back-games" class="back-btn" type="button">← Games</button></div>
        <div class="ee-mp-bubble"><span class="ico" aria-hidden="true">🐰</span><span class="txt">${INTRO}</span><button class="ee-mp-say" id="ee-mp-say-intro" type="button" aria-label="Nghe cô đọc">🔊</button></div>
        <p id="ee-mp-voice-note" class="ee-mp-voice-note" hidden></p>
        <div class="ee-mp-levels">
          ${LEVELS.map((l, i) => {
            const done = l.rounds.filter((_, ri) => stars[roundKey(i, ri)]).length;
            const sample = l.rounds.slice(0, 2).map((r) => `${r.pairs[0].left.icon}${r.pairs[0].right.icon}`).join(" ");
            return `<button class="ee-mp-level" data-level="${i}" data-tone="${esc(l.tone)}" type="button" aria-label="Cấp ${i + 1}: ${esc(shortLevel(l))}">
              <span class="top"><span class="num">${i + 1}</span><h3>${esc(shortLevel(l))}</h3></span>
              <span class="icons" aria-hidden="true">${sample}</span>
              <span class="prog"><span class="ee-mp-bar"><span style="width:${(done / l.rounds.length) * 100}%"></span></span>${done}/${l.rounds.length} màn</span>
            </button>`;
          }).join("")}
        </div>
      </div>`;
    h.querySelector("#ee-mp-back-games")?.addEventListener("click", () => activeContext && activeContext.back && activeContext.back());
    h.querySelector("#ee-mp-say-intro")?.addEventListener("click", () => speak(INTRO, false, true));
    h.querySelectorAll("[data-level]").forEach((button) => button.addEventListener("click", () => renderRoundRegistry(Number(button.dataset.level))));
  }

  /* ---------- Trang chọn màn ---------- */
  function renderRoundRegistry(levelIndex) {
    const l = LEVELS[levelIndex];
    if (!l) return renderLevelRegistry();
    stopSpeak();
    window.clearTimeout(finishTimer);
    currentLevelIndex = levelIndex;
    currentRoundIndex = -1;
    setLevelBanner(levelIndex);
    const h = host();
    if (!h) return;
    h.innerHTML = `
      <div class="ee-mp-page">
        <div class="section-heading"><div><h1>🔗 Cấp ${levelIndex + 1}: ${esc(shortLevel(l))}</h1><p>${l.rounds.length} màn</p></div><button id="ee-mp-back-levels" class="back-btn" type="button">← 6 cấp</button></div>
        <div class="ee-mp-rounds">
          ${l.rounds.map((r, i) => {
            const st = stars[roundKey(levelIndex, i)] || 0;
            return `<button class="ee-mp-round${st ? " done" : ""}" data-round="${i}" type="button" aria-label="Màn ${i + 1}: ${esc(r.title)}">
              <span class="n">${i + 1}</span>
              <span class="pair" aria-hidden="true">${r.pairs[0].left.icon}<i>➜</i>${r.pairs[0].right.icon}</span>
              <strong>${esc(r.title)}</strong>${starRow(st)}
            </button>`;
          }).join("")}
        </div>
      </div>`;
    h.querySelector("#ee-mp-back-levels")?.addEventListener("click", renderLevelRegistry);
    h.querySelectorAll("[data-round]").forEach((button) => button.addEventListener("click", () => startRound(levelIndex, Number(button.dataset.round))));
  }

  function startRound(levelIndex, roundIndex) {
    const l = LEVELS[levelIndex];
    const r = l && l.rounds[roundIndex];
    if (!r) return renderRoundRegistry(levelIndex);
    window.clearTimeout(finishTimer);
    currentLevelIndex = levelIndex;
    currentRoundIndex = roundIndex;
    resetRoundState(r);
    renderRound();
    speak(r.prompt, true);
  }

  /* ---------- Màn chơi ---------- */
  function pieceHtml(side, pairIndex, item) {
    const key = String(pairIndex);
    const isMatched = matched.has(key);
    const isSelected = side === "left" ? leftSelected === key : rightSelected === key;
    const isHint = side === "right" && secondHintChoices.has(key);
    const dim = side === "right" && secondHintChoices.size > 0 && !secondHintChoices.has(key) && !isMatched;
    const cls = ["ee-mp-piece", side, isMatched ? "matched" : "", isSelected ? "selected" : "", isHint ? "hint" : "", dim ? "dim" : "", revealed.has(key) ? "revealed" : ""].filter(Boolean).join(" ");
    const badge = isMatched ? `<span class="badge" aria-hidden="true">${pairOrder.get(key)}</span>` : "";
    return `<button class="${cls}" type="button" data-side="${side}" data-pair="${key}" ${isMatched ? "aria-disabled=\"true\"" : ""}><span class="ico" aria-hidden="true">${esc(item.icon)}</span><span class="txt">${esc(item.text)}</span>${badge}</button>`;
  }

  function renderRound() {
    const l = level();
    const r = round();
    const h = host();
    if (!l || !r || !h) return;
    setRoundBanner(currentLevelIndex, currentRoundIndex);
    const dots = r.pairs.map((_, i) => `<span class="${matched.has(String(i)) ? (revealed.has(String(i)) ? "peek" : "on") : ""}"></span>`).join("");
    h.innerHTML = `
      <div class="ee-mp-page">
        <div class="ee-mp-head"><h2>${esc(r.title)}</h2><div class="ee-mp-dots" aria-label="Đã ghép ${matched.size} trên ${r.pairs.length}">${dots}</div>
          <button id="ee-mp-mute" class="ee-mp-say${muted ? " mute" : ""}" type="button" aria-label="${muted ? "Bật" : "Tắt"} giọng đọc tự động" title="${muted ? "Bật" : "Tắt"} giọng đọc tự động">${muted ? "🔇" : "🔈"}</button></div>
        <div class="ee-mp-bubble"><span class="ico" aria-hidden="true">🐰</span><span class="txt">${esc(r.prompt)}</span><button class="ee-mp-say" id="ee-mp-say-prompt" type="button" aria-label="Nghe cô đọc">🔊</button></div>
        <p id="ee-mp-voice-note" class="ee-mp-voice-note" hidden></p>
        <div class="ee-mp-board">
          <div class="ee-mp-col">${r.pairs.map((p, i) => pieceHtml("left", i, p.left)).join("")}</div>
          <div class="ee-mp-col">${rightOrder.map((key) => pieceHtml("right", Number(key), r.pairs[Number(key)].right)).join("")}</div>
        </div>
        <div class="ee-mp-foot">
          <div id="ee-mp-fb" class="ee-mp-fb" aria-live="polite"><span class="ico" aria-hidden="true">👆</span><span>Chạm một mảnh bên trái trước nhé!</span></div>
          <div class="ee-mp-acts"><button id="ee-mp-hint" class="ee-mp-btn" type="button">💡 Gợi ý</button><button id="ee-mp-answer" class="ee-mp-btn amber" type="button">👀 Đáp án</button></div>
        </div>
      </div>`;
    bindRound();
  }

  function feedback(kind, icon, text, speakText) {
    const node = host() && host().querySelector("#ee-mp-fb");
    if (node) {
      node.className = `ee-mp-fb ${kind}`;
      node.innerHTML = `<span class="ico" aria-hidden="true">${icon}</span><span>${esc(text)}</span>`;
    }
    if (speakText) speak(speakText, true);
  }

  function refresh() {
    const h = host();
    const r = round();
    if (!h || !r) return;
    h.querySelectorAll(".ee-mp-piece").forEach((node) => {
      const side = node.dataset.side;
      const key = String(node.dataset.pair || "");
      const isMatched = matched.has(key);
      node.classList.toggle("selected", !isMatched && (side === "left" ? leftSelected === key : rightSelected === key));
      node.classList.toggle("hint", side === "right" && secondHintChoices.has(key) && !isMatched);
      node.classList.toggle("dim", side === "right" && secondHintChoices.size > 0 && !secondHintChoices.has(key) && !isMatched);
      node.classList.toggle("matched", isMatched);
      node.classList.toggle("revealed", revealed.has(key));
      if (isMatched && !node.querySelector(".badge")) {
        node.insertAdjacentHTML("beforeend", `<span class="badge" aria-hidden="true">${pairOrder.get(key)}</span>`);
        node.setAttribute("aria-disabled", "true");
      }
    });
    const dots = h.querySelector(".ee-mp-dots");
    if (dots) dots.innerHTML = r.pairs.map((_, i) => `<span class="${matched.has(String(i)) ? (revealed.has(String(i)) ? "peek" : "on") : ""}"></span>`).join("");
  }

  function bindRound() {
    const h = host();
    const r = round();
    if (!h || !r) return;
    h.querySelectorAll("[data-side][data-pair]").forEach((button) => button.addEventListener("click", () => {
      const side = button.dataset.side;
      const key = String(button.dataset.pair || "");
      if (!key || matched.has(key)) return;
      const item = side === "left" ? r.pairs[Number(key)].left : r.pairs[Number(key)].right;
      if (side === "left") {
        leftSelected = leftSelected === key ? "" : key;
        rightSelected = "";
        secondHintChoices = new Set();
        if (leftSelected) {
          feedback("", "👉", `Bây giờ chạm mảnh bên phải hợp với “${item.text}”.`);
          speak(item.text, true);
        }
      } else {
        if (!leftSelected) {
          feedback("tip", "👈", "Bé chạm một mảnh bên trái trước nhé!");
          speak(item.text, true);
          refresh();
          return;
        }
        rightSelected = key;
      }
      if (leftSelected && rightSelected) tryMatch(leftSelected, rightSelected);
      else refresh();
    }));
    h.querySelector("#ee-mp-hint")?.addEventListener("click", useHint);
    h.querySelector("#ee-mp-answer")?.addEventListener("click", revealAnswer);
    h.querySelector("#ee-mp-say-prompt")?.addEventListener("click", () => speak(r.prompt, false, true));
    h.querySelector("#ee-mp-mute")?.addEventListener("click", (e) => {
      muted = !muted;
      if (muted) stopSpeak();
      e.currentTarget.textContent = muted ? "🔇" : "🔈";
      e.currentTarget.classList.toggle("mute", muted);
      e.currentTarget.setAttribute("aria-label", `${muted ? "Bật" : "Tắt"} giọng đọc tự động`);
    });
  }

  function markMatched(key, isReveal) {
    matched.add(key);
    pairOrder.set(key, matched.size);
    if (isReveal) revealed.add(key);
    leftSelected = "";
    rightSelected = "";
    secondHintChoices = new Set();
  }

  function tryMatch(leftKey, rightKey) {
    const h = host();
    const r = round();
    if (!h || !r) return;
    if (leftKey === rightKey) {
      const p = r.pairs[Number(leftKey)];
      markMatched(leftKey, false);
      refresh();
      feedback("good", "🎉", p.why, `Đúng rồi! ${p.why}`);
      if (matched.size === r.pairs.length) finishTimer = window.setTimeout(renderFinish, 1600);
      return;
    }
    wrongAttempts += 1;
    [h.querySelector(`[data-side="left"][data-pair="${leftKey}"]`), h.querySelector(`[data-side="right"][data-pair="${rightKey}"]`)].forEach((node) => {
      if (!node) return;
      node.classList.remove("wrong"); void node.offsetWidth; node.classList.add("wrong");
      window.setTimeout(() => node.classList.remove("wrong"), 500);
    });
    rightSelected = "";
    refresh();
    feedback("bad", "🤔", "Chưa đúng rồi. Bé thử mảnh khác nhé!", "Chưa đúng rồi. Bé thử mảnh khác nhé!");
  }

  function unresolvedKey() {
    const r = round();
    if (!r) return "";
    if (leftSelected && !matched.has(leftSelected)) return leftSelected;
    const idx = r.pairs.findIndex((_, i) => !matched.has(String(i)));
    return idx >= 0 ? String(idx) : "";
  }

  /* Gợi ý: chọn sẵn mảnh bên trái, chỉ để sáng 2 mảnh bên phải, cô đọc mẹo của màn */
  function useHint() {
    const r = round();
    const key = unresolvedKey();
    if (!r || !key) return;
    leftSelected = key;
    rightSelected = "";
    hinted.add(key);
    hintStep.set(key, (hintStep.get(key) || 0) + 1);
    const others = r.pairs.map((_, i) => String(i)).filter((k) => k !== key && !matched.has(k));
    secondHintChoices = new Set([key, ...shuffle(others).slice(0, Math.min(1, others.length))]);
    refresh();
    const left = r.pairs[Number(key)].left.text;
    feedback("tip", "💡", `“${left}” đi với một trong ${secondHintChoices.size} mảnh còn sáng.`, `${r.tip} ${left} đi với một trong ${secondHintChoices.size} mảnh còn sáng.`);
  }

  function revealAnswer() {
    const r = round();
    const key = unresolvedKey();
    if (!r || !key) return;
    const p = r.pairs[Number(key)];
    hinted.add(key);
    markMatched(key, true);
    refresh();
    feedback("tip", "👀", `${p.left.text} ➜ ${p.right.text}. ${p.why}`, `${p.left.text} đi với ${p.right.text}. ${p.why}`);
    if (matched.size === r.pairs.length) finishTimer = window.setTimeout(renderFinish, 1800);
  }

  /* ---------- Màn kết thúc ---------- */
  function renderFinish() {
    const l = level();
    const r = round();
    const h = host();
    if (!l || !r || !h) return;
    setRoundBanner(currentLevelIndex, currentRoundIndex);
    const mistakes = wrongAttempts + hinted.size + revealed.size;
    const n = mistakes === 0 ? 3 : mistakes <= 2 ? 2 : 1;
    saveStars(roundKey(currentLevelIndex, currentRoundIndex), n);
    const hasNext = currentRoundIndex < l.rounds.length - 1 || currentLevelIndex < LEVELS.length - 1;
    h.innerHTML = `
      <div class="ee-mp-page"><section class="ee-mp-finish">
        <div class="big" aria-hidden="true">🎉🐰</div>
        <h2>Ghép xong rồi!</h2>
        <div class="bigstars" aria-label="${n} sao">${[1, 2, 3].map((i) => `<span class="${i <= n ? "" : "off"}">★</span>`).join("")}</div>
        <div class="ee-mp-recap">${r.pairs.map((p, i) => `<button type="button" data-say-pair="${i}" aria-label="Nghe: ${esc(p.left.text)} đi với ${esc(p.right.text)}"><span class="e" aria-hidden="true">${p.left.icon}➜${p.right.icon}</span><span>${esc(p.left.text)} – ${esc(p.right.text)}</span></button>`).join("")}</div>
        <div class="ee-mp-finish-actions">
          ${hasNext ? `<button id="ee-mp-next" class="ee-mp-btn primary" type="button">▶ Màn tiếp theo</button>` : ""}
          <button id="ee-mp-replay" class="ee-mp-btn" type="button">🔄 Chơi lại</button>
          <button id="ee-mp-rounds" class="ee-mp-btn" type="button">📚 Chọn màn</button>
        </div>
      </section></div>`;
    speak(n === 3 ? "Giỏi quá! Bé ghép đúng hết mà không cần gợi ý!" : "Ghép xong rồi! Bé giỏi lắm!", true);
    h.querySelectorAll("[data-say-pair]").forEach((b) => b.addEventListener("click", () => {
      const p = r.pairs[Number(b.dataset.sayPair)];
      speak(`${p.left.text} đi với ${p.right.text}. ${p.why}`, false, true);
    }));
    h.querySelector("#ee-mp-replay")?.addEventListener("click", () => startRound(currentLevelIndex, currentRoundIndex));
    h.querySelector("#ee-mp-next")?.addEventListener("click", () => {
      if (currentRoundIndex < l.rounds.length - 1) startRound(currentLevelIndex, currentRoundIndex + 1);
      else if (currentLevelIndex < LEVELS.length - 1) startRound(currentLevelIndex + 1, 0);
    });
    h.querySelector("#ee-mp-rounds")?.addEventListener("click", () => renderRoundRegistry(currentLevelIndex));
  }

  function render(context) {
    activeContext = context || null;
    ensureStyles();
    renderLevelRegistry();
  }

  function destroy() {
    window.clearTimeout(toastTimer);
    window.clearTimeout(finishTimer);
    stopSpeak();
    activeContext = null;
    currentLevelIndex = -1;
    currentRoundIndex = -1;
    leftSelected = "";
    rightSelected = "";
    matched = new Set();
    hinted = new Set();
    revealed = new Set();
    secondHintChoices = new Set();
  }

  window.CLASS1_GAME_MODULES = window.CLASS1_GAME_MODULES || {};
  window.CLASS1_GAME_MODULES[MODULE_KEY] = Object.freeze({ render, destroy });
})();

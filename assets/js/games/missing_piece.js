(() => {
  "use strict";

  const MODULE_KEY = "missingPiece";
  const STYLE_ID = "class1-games-missing-piece-style";
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
              "icon": "🚪"
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
              "icon": "🌱"
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
              "icon": "🛏️"
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
              "icon": "🌰"
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
              "icon": "🗄️"
            },
            "right": {
              "text": "Tủ",
              "icon": "🚪"
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
              "icon": "✂️"
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
              "icon": "🕐"
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
              "icon": "📄"
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
              "icon": "✂️"
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
              "icon": "🤚"
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
              "icon": "📐"
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
              "icon": "🎒"
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

  const esc = (value) => String(value == null ? "" : value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");

  function shuffle(values) {
    const out = values.slice();
    for (let i = out.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [out[i], out[j]] = [out[j], out[i]];
    }
    return out;
  }

  function host() { return activeContext && activeContext.host; }
  function level() { return LEVELS[currentLevelIndex] || null; }
  function round() { const l = level(); return l && l.rounds[currentRoundIndex] ? l.rounds[currentRoundIndex] : null; }

  function setBanner(items) {
    const fn = activeContext && activeContext.hooks && activeContext.hooks.setSubBanner;
    if (typeof fn === "function") fn({ items });
  }

  function setRegistryBanner() {
    setBanner([{ level: 2, title: `${GAME_NUMBER}. Mảnh ghép còn thiếu`, action: null }]);
  }

  function setLevelBanner(levelIndex) {
    const l = LEVELS[levelIndex];
    if (!l) return;
    setBanner([
      { level: 2, title: `${GAME_NUMBER}. Mảnh ghép còn thiếu`, action: renderLevelRegistry },
      { level: 3, title: `${GAME_NUMBER}.${levelIndex + 1} Cấp ${levelIndex + 1}`, action: null }
    ]);
  }

  function setRoundBanner(levelIndex, roundIndex) {
    const l = LEVELS[levelIndex];
    if (!l) return;
    setBanner([
      { level: 2, title: `${GAME_NUMBER}. Mảnh ghép còn thiếu`, action: renderLevelRegistry },
      { level: 3, title: `${GAME_NUMBER}.${levelIndex + 1} Cấp ${levelIndex + 1}`, action: () => renderRoundRegistry(levelIndex) },
      { level: 4, title: `${GAME_NUMBER}.${levelIndex + 1}.${roundIndex + 1} Màn ${roundIndex + 1}`, action: null }
    ]);
  }

  function ensureStyles() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      .ee-mp-page{padding:.15rem .1rem 1rem;color:#334155}
      .ee-mp-hero{display:grid;grid-template-columns:1.2fr .8fr;gap:.8rem;padding:1rem;border:1px solid #e9d5ff;border-radius:22px;background:linear-gradient(135deg,#fff7ed,#fdf2f8,#f5f3ff);margin-bottom:.9rem}
      .ee-mp-hero h2{margin:0 0 .35rem;color:#6d28d9;font-size:22px}.ee-mp-hero p{margin:0;color:#475569;font-weight:800;line-height:1.55}
      .ee-mp-bunny{border:1px solid #bae6fd;border-radius:18px;background:#f0f9ff;padding:.8rem;display:flex;gap:.7rem;align-items:center}.ee-mp-bunny .ico{font-size:38px}.ee-mp-bunny strong{display:block;color:#0369a1}.ee-mp-bunny span{display:block;font-size:13px;line-height:1.45;font-weight:800;color:#334155}
      .ee-mp-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:.75rem}.ee-mp-card{min-width:0;border:1px solid #e5e7eb;border-radius:19px;padding:.85rem;background:#fff;text-align:left;cursor:pointer;font:inherit;box-shadow:0 7px 16px rgba(15,23,42,.05);transition:transform .16s,box-shadow .16s}.ee-mp-card:hover{transform:translateY(-2px);box-shadow:0 10px 22px rgba(15,23,42,.09)}
      .ee-mp-card[data-tone=pink]{background:#fff1f7;border-color:#fbcfe8}.ee-mp-card[data-tone=teal]{background:#ecfdf5;border-color:#99f6e4}.ee-mp-card[data-tone=purple]{background:#f5f3ff;border-color:#ddd6fe}.ee-mp-card[data-tone=amber]{background:#fffbeb;border-color:#fde68a}
      .ee-mp-card .num{width:38px;height:38px;border-radius:13px;display:grid;place-items:center;background:#fff;border:1px solid rgba(148,163,184,.35);font-weight:1000;color:#7e22ce}.ee-mp-card h3{margin:.55rem 0 .25rem;color:#5b21b6;font-size:18px}.ee-mp-card p{margin:0;color:#475569;font-size:13px;font-weight:800;line-height:1.45}.ee-mp-meta{margin-top:.55rem;display:flex;gap:.35rem;flex-wrap:wrap}.ee-mp-chip{border:1px solid #ddd6fe;background:#fff;border-radius:999px;padding:.24rem .48rem;color:#6d28d9;font-size:11px;font-weight:1000}
      .ee-mp-round-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:.7rem}.ee-mp-round{border:1px solid #e5e7eb;border-radius:18px;background:#fff;padding:.8rem;text-align:left;cursor:pointer;font:inherit;transition:.16s}.ee-mp-round:hover{border-color:#c4b5fd;box-shadow:0 8px 18px rgba(109,40,217,.08)}.ee-mp-round strong{display:block;color:#5b21b6;font-size:17px}.ee-mp-round span{display:block;margin-top:.3rem;color:#64748b;font-size:13px;font-weight:800;line-height:1.4}
      .ee-mp-game-head{display:flex;align-items:flex-start;justify-content:space-between;gap:.7rem;flex-wrap:wrap;margin-bottom:.7rem}.ee-mp-game-head h2{margin:0;color:#5b21b6;font-size:23px}.ee-mp-game-head p{margin:.3rem 0 0;color:#475569;font-size:15px;font-weight:850;line-height:1.5;max-width:850px}.ee-mp-progress{display:flex;gap:.35rem;align-items:center;flex-wrap:wrap}.ee-mp-progress span{border:1px solid #e2e8f0;border-radius:999px;background:#fff;padding:.3rem .55rem;color:#475569;font-size:12px;font-weight:1000}
      .ee-mp-board{position:relative;display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:2rem;padding:.8rem;border:1px solid #e9d5ff;border-radius:22px;background:linear-gradient(180deg,#fff,#fffaff)}
      .ee-mp-column{display:flex;flex-direction:column;gap:.55rem;min-width:0}.ee-mp-col-title{text-align:center;color:#7e22ce;font-size:12px;font-weight:1000;text-transform:uppercase;letter-spacing:.05em;margin-bottom:.05rem}
      .ee-mp-piece{position:relative;min-height:66px;width:100%;border:1px solid #d8b4fe;border-radius:16px;background:#fff;padding:.55rem .7rem;display:flex;align-items:center;gap:.65rem;text-align:left;font:inherit;cursor:pointer;color:#334155;box-shadow:0 3px 9px rgba(76,29,149,.05);transition:transform .14s,border-color .14s,background .14s,box-shadow .14s;overflow:hidden}.ee-mp-piece:hover{border-color:#a78bfa}.ee-mp-piece .ico{font-size:29px;flex:0 0 34px;text-align:center}.ee-mp-piece .txt{font-size:15px;line-height:1.28;font-weight:950;min-width:0}.ee-mp-piece.left:after{content:"";position:absolute;right:-11px;top:50%;width:22px;height:22px;border:1px solid #d8b4fe;border-left:0;border-bottom:0;background:#fff;border-radius:50%;transform:translateY(-50%) rotate(45deg)}.ee-mp-piece.right:before{content:"";position:absolute;left:-11px;top:50%;width:22px;height:22px;border:1px solid #d8b4fe;border-right:0;border-top:0;background:#fff;border-radius:50%;transform:translateY(-50%) rotate(45deg)}
      .ee-mp-piece.selected{border-color:#ec4899;background:#fff1f7;box-shadow:0 0 0 3px rgba(236,72,153,.12)}.ee-mp-piece.hint{border-color:#0ea5e9;background:#f0f9ff;box-shadow:0 0 0 3px rgba(14,165,233,.10)}.ee-mp-piece.dim{opacity:.28;filter:grayscale(.45)}.ee-mp-piece.matched{border-color:#34d399;background:#ecfdf5;color:#065f46;cursor:default;box-shadow:none}.ee-mp-piece.revealed{border-color:#f59e0b;background:#fffbeb}.ee-mp-piece.wrong{animation:eeMpShake .3s linear}@keyframes eeMpShake{25%{transform:translateX(-5px)}50%{transform:translateX(5px)}75%{transform:translateX(-3px)}}
      .ee-mp-help{margin-top:.7rem;display:grid;grid-template-columns:minmax(0,1fr) auto;gap:.6rem;align-items:stretch}.ee-mp-why{border:1px solid #bae6fd;border-radius:17px;background:#f0f9ff;padding:.75rem .85rem;color:#334155;font-size:14px;font-weight:800;line-height:1.5;min-height:62px}.ee-mp-why strong{color:#0369a1}.ee-mp-actions{display:flex;gap:.45rem;flex-wrap:wrap;justify-content:flex-end;align-items:center}.ee-mp-btn{min-height:44px;border-radius:13px;border:1px solid #d8b4fe;background:#fff;color:#6d28d9;padding:.6rem .85rem;font:inherit;font-size:13px;font-weight:1000;cursor:pointer}.ee-mp-btn.primary{border:0;color:#fff;background:linear-gradient(90deg,#ec4899,#8b5cf6);box-shadow:0 7px 15px rgba(168,85,247,.18)}.ee-mp-btn.blue{border-color:#7dd3fc;color:#0369a1;background:#f0f9ff}.ee-mp-btn.amber{border-color:#fde68a;color:#92400e;background:#fffbeb}.ee-mp-btn:disabled{opacity:.45;cursor:not-allowed}
      .ee-mp-status{margin-top:.65rem;border:1px solid #e2e8f0;border-radius:15px;background:#f8fafc;padding:.65rem .75rem;display:flex;justify-content:space-between;gap:.6rem;align-items:center;flex-wrap:wrap}.ee-mp-status b{color:#7e22ce}.ee-mp-status span{color:#64748b;font-size:12px;font-weight:900}
      .ee-mp-finish{border:1px solid #fbcfe8;border-radius:23px;background:linear-gradient(135deg,#fdf2f8,#f5f3ff);padding:1rem;text-align:center}.ee-mp-finish .big{font-size:54px}.ee-mp-finish h2{margin:.2rem 0;color:#be185d;font-size:26px}.ee-mp-finish p{margin:.45rem auto;color:#475569;font-weight:800;line-height:1.5;max-width:720px}.ee-mp-finish-actions{display:flex;justify-content:center;gap:.5rem;flex-wrap:wrap;margin-top:.8rem}
      .ee-mp-toast{position:sticky;bottom:.6rem;margin:.6rem auto 0;width:max-content;max-width:92%;padding:.55rem .8rem;border-radius:999px;background:#312e81;color:#fff;font-size:13px;font-weight:950;box-shadow:0 8px 18px rgba(49,46,129,.2);z-index:4}.ee-mp-toast.hidden{display:none}
      @media(max-width:900px){.ee-mp-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.ee-mp-help{grid-template-columns:1fr}.ee-mp-actions{justify-content:flex-start}}
      @media(max-width:680px){.ee-mp-hero{grid-template-columns:1fr}.ee-mp-board{gap:.9rem;padding:.55rem}.ee-mp-piece{min-height:72px;padding:.48rem .55rem}.ee-mp-piece .ico{font-size:25px;flex-basis:28px}.ee-mp-piece .txt{font-size:13px}.ee-mp-piece.left:after,.ee-mp-piece.right:before{display:none}.ee-mp-round-grid{grid-template-columns:1fr}.ee-mp-game-head h2{font-size:20px}}
      @media(max-width:480px){.ee-mp-grid{grid-template-columns:1fr}.ee-mp-board{grid-template-columns:1fr;gap:.7rem}.ee-mp-column{gap:.42rem}.ee-mp-col-title{margin-top:.15rem}.ee-mp-piece{min-height:56px}.ee-mp-actions{display:grid;grid-template-columns:1fr 1fr;width:100%}.ee-mp-actions .ee-mp-btn{width:100%}}
    `;
    document.head.appendChild(style);
  }

  function showLocalToast(message) {
    const h = host();
    const node = h && h.querySelector("#ee-mp-toast");
    if (!node) return;
    window.clearTimeout(toastTimer);
    node.textContent = String(message || "");
    node.classList.remove("hidden");
    toastTimer = window.setTimeout(() => node.classList.add("hidden"), 1800);
  }

  function resetRoundState(r) {
    leftSelected = "";
    rightSelected = "";
    matched = new Set();
    hinted = new Set();
    revealed = new Set();
    secondHintChoices = new Set();
    wrongAttempts = 0;
    rightOrder = shuffle(r.pairs.map((_, i) => String(i)));
  }

  function renderLevelRegistry() {
    currentLevelIndex = -1;
    currentRoundIndex = -1;
    setRegistryBanner();
    const h = host();
    if (!h) return;
    h.innerHTML = `
      <div class="ee-mp-page">
        <div class="section-heading"><div><h1>🔗 Mảnh ghép còn thiếu</h1><p>6 cấp độ • 48 màn • 232 cặp liên tưởng có giải thích.</p></div><button id="ee-mp-back-games" class="back-btn" type="button">← Games</button></div>
        <div class="ee-mp-hero">
          <div><h2>Tìm đúng mối liên hệ, không đoán mò</h2><p>Mỗi màn nêu rõ loại quan hệ cần tìm. Hai cột có nhiều phương án gần nhau nhưng chỉ có một cách ghép hợp lý. Ghép đúng sẽ hiện “Vì sao?”, còn khi bí bé có thể xin gợi ý từng tầng.</p></div>
          <div class="ee-mp-bunny"><span class="ico" aria-hidden="true">🐰</span><div><strong>Cô Thỏ Hồng nhắc bé</strong><span>Gợi ý không bị tính là sai. Nếu xem đáp án, Cô Thỏ vẫn giải thích để bé hiểu vì sao hai mảnh thuộc về nhau.</span></div></div>
        </div>
        <div class="ee-mp-grid">
          ${LEVELS.map((l, i) => `<button class="ee-mp-card" data-level="${i}" data-tone="${esc(l.tone)}" type="button"><span class="num">${i + 1}</span><h3>${esc(l.title)}</h3><p>${esc(l.summary)}</p><div class="ee-mp-meta"><span class="ee-mp-chip">8 màn</span><span class="ee-mp-chip">${l.rounds[0].pairs.length} cặp/màn</span></div></button>`).join("")}
        </div>
      </div>`;
    h.querySelector("#ee-mp-back-games")?.addEventListener("click", () => activeContext && activeContext.back && activeContext.back());
    h.querySelectorAll("[data-level]").forEach((button) => button.addEventListener("click", () => renderRoundRegistry(Number(button.dataset.level))));
  }

  function renderRoundRegistry(levelIndex) {
    const l = LEVELS[levelIndex];
    if (!l) return renderLevelRegistry();
    currentLevelIndex = levelIndex;
    currentRoundIndex = -1;
    setLevelBanner(levelIndex);
    const h = host();
    if (!h) return;
    h.innerHTML = `
      <div class="ee-mp-page">
        <div class="section-heading"><div><h1>🔗 ${esc(l.title)}</h1><p>${esc(l.summary)}</p></div><button id="ee-mp-back-levels" class="back-btn" type="button">← 6 cấp độ</button></div>
        <div class="ee-mp-round-grid">
          ${l.rounds.map((r, i) => `<button class="ee-mp-round" data-round="${i}" type="button"><strong>${i + 1}. ${esc(r.title)}</strong><span>${esc(r.prompt)} · ${r.pairs.length} cặp</span></button>`).join("")}
        </div>
      </div>`;
    h.querySelector("#ee-mp-back-levels")?.addEventListener("click", renderLevelRegistry);
    h.querySelectorAll("[data-round]").forEach((button) => button.addEventListener("click", () => startRound(levelIndex, Number(button.dataset.round))));
  }

  function startRound(levelIndex, roundIndex) {
    const l = LEVELS[levelIndex];
    const r = l && l.rounds[roundIndex];
    if (!r) return renderRoundRegistry(levelIndex);
    currentLevelIndex = levelIndex;
    currentRoundIndex = roundIndex;
    resetRoundState(r);
    renderRound();
  }

  function pieceHtml(side, pairIndex, item) {
    const key = String(pairIndex);
    const isMatched = matched.has(key);
    const isSelected = side === "left" ? leftSelected === key : rightSelected === key;
    const isHint = secondHintChoices.has(key) && side === "right";
    const dim = secondHintChoices.size > 0 && side === "right" && !secondHintChoices.has(key) && !isMatched;
    const cls = ["ee-mp-piece", side, isMatched ? "matched" : "", isSelected ? "selected" : "", isHint ? "hint" : "", dim ? "dim" : "", revealed.has(key) ? "revealed" : ""].filter(Boolean).join(" ");
    return `<button class="${cls}" type="button" data-side="${side}" data-pair="${key}" ${isMatched ? "disabled" : ""}><span class="ico" aria-hidden="true">${esc(item.icon)}</span><span class="txt">${esc(item.text)}</span></button>`;
  }

  function renderRound() {
    const l = level();
    const r = round();
    const h = host();
    if (!l || !r || !h) return;
    setRoundBanner(currentLevelIndex, currentRoundIndex);
    const lastWhy = h.querySelector("#ee-mp-why")?.dataset.lastWhy || "";
    h.innerHTML = `
      <div class="ee-mp-page">
        <div class="ee-mp-game-head"><div><h2>${esc(r.title)}</h2><p>${esc(r.prompt)}</p></div><div class="ee-mp-progress"><span>Cấp ${currentLevelIndex + 1}/6</span><span>Màn ${currentRoundIndex + 1}/8</span><span>${r.pairs.length} cặp</span></div></div>
        <div class="ee-mp-board">
          <div class="ee-mp-column"><div class="ee-mp-col-title">Mảnh bên trái</div>${r.pairs.map((p, i) => pieceHtml("left", i, p.left)).join("")}</div>
          <div class="ee-mp-column"><div class="ee-mp-col-title">Mảnh bên phải</div>${rightOrder.map((key) => { const i = Number(key); return pieceHtml("right", i, r.pairs[i].right); }).join("")}</div>
        </div>
        <div class="ee-mp-help">
          <div id="ee-mp-why" class="ee-mp-why" data-last-why="${esc(lastWhy)}"><strong>🐰 Cô Thỏ:</strong> ${lastWhy ? esc(lastWhy) : "Chọn một mảnh bên trái rồi chọn mảnh bên phải mà bé nghĩ có liên quan đúng theo yêu cầu của màn."}</div>
          <div class="ee-mp-actions"><button id="ee-mp-hint1" class="ee-mp-btn blue" type="button">💡 Gợi ý 1</button><button id="ee-mp-hint2" class="ee-mp-btn blue" type="button">💡 Gợi ý 2</button><button id="ee-mp-answer" class="ee-mp-btn amber" type="button">👀 Xem đáp án</button></div>
        </div>
        <div class="ee-mp-status"><div><b>Đã ghép ${matched.size}/${r.pairs.length}</b> · Sai ${wrongAttempts} lần</div><span>Gợi ý không tính là sai.</span></div>
        <div id="ee-mp-toast" class="ee-mp-toast hidden" aria-live="polite"></div>
      </div>`;

    bindRound();
  }

  function bindRound() {
    const h = host();
    const r = round();
    if (!h || !r) return;
    h.querySelectorAll("[data-side][data-pair]").forEach((button) => button.addEventListener("click", () => {
      const side = button.dataset.side;
      const key = String(button.dataset.pair || "");
      if (!key || matched.has(key)) return;
      if (side === "left") {
        leftSelected = leftSelected === key ? "" : key;
        rightSelected = "";
        secondHintChoices = new Set();
      } else {
        rightSelected = rightSelected === key ? "" : key;
      }
      if (leftSelected && rightSelected) tryMatch(leftSelected, rightSelected);
      else refreshSelectionClasses();
    }));
    h.querySelector("#ee-mp-hint1")?.addEventListener("click", useHint1);
    h.querySelector("#ee-mp-hint2")?.addEventListener("click", useHint2);
    h.querySelector("#ee-mp-answer")?.addEventListener("click", revealAnswer);
  }

  function refreshSelectionClasses() {
    const h = host();
    if (!h) return;
    h.querySelectorAll(".ee-mp-piece").forEach((node) => {
      const side = node.dataset.side;
      const key = String(node.dataset.pair || "");
      node.classList.toggle("selected", side === "left" ? leftSelected === key : rightSelected === key);
      node.classList.toggle("hint", side === "right" && secondHintChoices.has(key));
      node.classList.toggle("dim", side === "right" && secondHintChoices.size > 0 && !secondHintChoices.has(key) && !matched.has(key));
    });
  }

  function updateWhy(text) {
    const h = host();
    const node = h && h.querySelector("#ee-mp-why");
    if (!node) return;
    const clean = String(text || "");
    node.dataset.lastWhy = clean;
    node.innerHTML = `<strong>🐰 Cô Thỏ:</strong> ${esc(clean)}`;
  }

  function tryMatch(leftKey, rightKey) {
    const h = host();
    const r = round();
    if (!h || !r) return;
    if (leftKey === rightKey) {
      matched.add(leftKey);
      leftSelected = "";
      rightSelected = "";
      secondHintChoices = new Set();
      updateWhy(`Đúng rồi! ${r.pairs[Number(leftKey)].why}`);
      h.querySelectorAll(`[data-pair="${leftKey}"]`).forEach((node) => { node.classList.add("matched"); node.classList.remove("selected","hint","dim"); node.disabled = true; });
      const stat = h.querySelector(".ee-mp-status b");
      if (stat) stat.textContent = `Đã ghép ${matched.size}/${r.pairs.length}`;
      showLocalToast("Khớp rồi! ✨");
      if (matched.size === r.pairs.length) window.setTimeout(renderFinish, 650);
      return;
    }
    wrongAttempts += 1;
    const left = h.querySelector(`[data-side="left"][data-pair="${leftKey}"]`);
    const right = h.querySelector(`[data-side="right"][data-pair="${rightKey}"]`);
    [left,right].forEach((node) => { if (!node) return; node.classList.remove("wrong"); void node.offsetWidth; node.classList.add("wrong"); });
    rightSelected = "";
    updateWhy("Hai mảnh này có liên quan theo một cách nào đó, nhưng chưa đúng loại quan hệ mà màn đang hỏi. Bé đọc lại câu yêu cầu nhé!");
    const stat = h.querySelector(".ee-mp-status div");
    if (stat) stat.innerHTML = `<b>Đã ghép ${matched.size}/${r.pairs.length}</b> · Sai ${wrongAttempts} lần`;
    showLocalToast("Chưa khớp, thử lại nhé 🐰");
    refreshSelectionClasses();
  }

  function unresolvedKey() {
    const r = round();
    if (!r) return "";
    if (leftSelected && !matched.has(leftSelected)) return leftSelected;
    const idx = r.pairs.findIndex((_, i) => !matched.has(String(i)));
    return idx >= 0 ? String(idx) : "";
  }

  function useHint1() {
    const r = round();
    const key = unresolvedKey();
    if (!r || !key) return;
    leftSelected = key;
    rightSelected = "";
    secondHintChoices = new Set();
    hinted.add(key);
    updateWhy(`Gợi ý 1: ${r.tip} Bé đang tìm mảnh phù hợp với “${r.pairs[Number(key)].left.text}”.`);
    refreshSelectionClasses();
    showLocalToast("Cô Thỏ đã nhắc loại quan hệ 💡");
  }

  function useHint2() {
    const r = round();
    const key = unresolvedKey();
    if (!r || !key) return;
    leftSelected = key;
    rightSelected = "";
    hinted.add(key);
    const unresolvedWrong = r.pairs.map((_, i) => String(i)).filter((k) => k !== key && !matched.has(k));
    const keepWrongCount = Math.min(1, unresolvedWrong.length);
    const keep = shuffle(unresolvedWrong).slice(0, keepWrongCount);
    secondHintChoices = new Set([key, ...keep]);
    updateWhy(`Gợi ý 2: Cô Thỏ đã làm mờ những phương án không phù hợp. Bé chỉ cần cân nhắc ${secondHintChoices.size} mảnh còn sáng.`);
    refreshSelectionClasses();
    showLocalToast("Đã thu hẹp lựa chọn 🔎");
  }

  function revealAnswer() {
    const r = round();
    const key = unresolvedKey();
    if (!r || !key) return;
    matched.add(key);
    revealed.add(key);
    hinted.add(key);
    leftSelected = "";
    rightSelected = "";
    secondHintChoices = new Set();
    updateWhy(`Đáp án: “${r.pairs[Number(key)].left.text}” ↔ “${r.pairs[Number(key)].right.text}”. ${r.pairs[Number(key)].why}`);
    const h = host();
    if (h) {
      h.querySelectorAll(`[data-pair="${key}"]`).forEach((node) => { node.classList.add("matched","revealed"); node.classList.remove("selected","hint","dim"); node.disabled = true; });
      const stat = h.querySelector(".ee-mp-status b");
      if (stat) stat.textContent = `Đã ghép ${matched.size}/${r.pairs.length}`;
    }
    showLocalToast("Đã hiện 1 đáp án và lời giải 👀");
    if (matched.size === r.pairs.length) window.setTimeout(renderFinish, 850);
  }

  function renderFinish() {
    const l = level();
    const r = round();
    const h = host();
    if (!l || !r || !h) return;
    setRoundBanner(currentLevelIndex, currentRoundIndex);
    const helpCount = hinted.size;
    const answerCount = revealed.size;
    h.innerHTML = `
      <div class="ee-mp-page"><section class="ee-mp-finish"><div class="big">🔗🐰✨</div><h2>Ghép xong rồi!</h2><p>Bé đã hoàn thành <strong>${esc(r.title)}</strong>. Có ${r.pairs.length} cặp, dùng gợi ý cho ${helpCount} cặp và xem đáp án ${answerCount} cặp. Gợi ý không phải lỗi — điều quan trọng là bé hiểu vì sao mỗi cặp đi với nhau.</p><div class="ee-mp-finish-actions"><button id="ee-mp-replay" class="ee-mp-btn primary" type="button">Chơi lại màn này</button><button id="ee-mp-next" class="ee-mp-btn" type="button">${currentRoundIndex < l.rounds.length - 1 ? "Màn tiếp theo →" : "Chọn màn khác"}</button><button id="ee-mp-rounds" class="ee-mp-btn" type="button">Danh sách màn</button></div></section></div>`;
    h.querySelector("#ee-mp-replay")?.addEventListener("click", () => startRound(currentLevelIndex, currentRoundIndex));
    h.querySelector("#ee-mp-next")?.addEventListener("click", () => {
      if (currentRoundIndex < l.rounds.length - 1) startRound(currentLevelIndex, currentRoundIndex + 1);
      else renderRoundRegistry(currentLevelIndex);
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
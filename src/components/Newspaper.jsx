import "../pages/News.css";
// import "./Book.css";

import Article from "./Article";

import React, { useState, useEffect, useRef } from "react";
import { setCurNewsIdx, setIsReading } from "../redux/features/playerSlice";
import { useStore, useDispatch, useSelector } from "react-redux";

const articles = [
  {
    title:
      "Công tác nhân sự của Đảng: Vun gốc để tránh lụi cành",
    description:
      "Ngày 13/3, chủ trì phiên họp Tiểu ban Nhân sự Đại hội XIV của Đảng, Tổng Bí thư Nguyễn Phú Trọng, Trưởng Tiểu ban, yêu cầu các ủy viên Ban Chấp hành Trung ương phải có bản lĩnh chính trị thực sự vững vàng, có đủ bản lĩnh, phẩm chất, trí tuệ, có uy tín cao. Đội ngũ tinh hoa này không chỉ quyết định sự thành bại của một nhiệm kỳ đại hội Đảng mà phẩm chất, tài năng của họ gắn liền với vận mệnh của Đảng, sự tồn vong của chế độ, sự phát triển của đất nước. Nói một cách khái quát, các ủy viên Ban Chấp hành Trung ương khóa XIV phải vừa có đức vừa có tài, trong đó đức là gốc.",
    audioUrl: "",
    audioTitle: "",
    image: "https://photo-baomoi.bmcdn.me/w700_r1/2024_03_21_294_48617724/c28046a2c4ee2db074ff.jpg",
  },
  {
    title:
      "Vùng Sardinia (Italy) mong muốn tăng cường hợp tác với Việt Nam",
    description:
      "Lãnh đạo Vùng Sardinia bày tỏ hoan nghênh và đánh giá cao chuyến thăm của Đại sứ Việt Nam, đồng thời bày tỏ hy vọng chuyến thăm sẽ mở ra những cơ hội hợp tác cụ thể với Việt Nam trong nhiều lĩnh vực về thương mại, đầu tư, hàng hải, du lịch và giáo dục đào tạo.",
    audioUrl: "",
    audioTitle: "",
    image: "https://photo-baomoi.bmcdn.me/w700_r1/2024_05_17_294_49125142/93fbda9fe7d00e8e57c1.jpg",
  },
  {
    title:
      "Bình Thuận: Mở lớp truyền dạy nhạc cụ truyền thống của người Chăm",
    description:
      "22 học viên sẽ được các nghệ nhân ưu tú người Chăm truyền dạy giai điệu, kỹ thuật sử dụng nhạc cụ Chăm như trống Ginăng, kèn Sarana, phục vụ hệ thống lễ hội của người Chăm đang có nguy cơ bị mai một.",
    audioUrl: "",
    audioTitle: "",
    image: "https://image.nhandan.vn/w800/Uploaded/2024/cvjntciwxpcwspd/2024_05_17/nhom-doi-tuong-ca-cc-2738.jpg",
  },
  {
    title:
      "Xử lý 162 trường hợp xe khách vi phạm tại cửa ngõ phía Nam",
    description:
      "Ngày 17-5, Phòng Cảnh sát giao thông (Công an thành phố Hà Nội) cho biết, khu vực cửa ngõ phía Nam thành phố có đầy đủ loại hình giao thông đường sắt, đường bộ, đường thủy… và là đầu mối giao thông quan trọng giữa nội thành với ngoại thành nên đã giao Đội Cảnh sát giao thông số 14 tổ chức các giải pháp bảo đảm an toàn giao thông phù hợp, đạt hiệu quả cao.",
    date: "05/12/2023",
    audioUrl: "",
    audioTitle: "",
    image: "https://photo-baomoi.bmcdn.me/w700_r1/2024_05_17_8_49125140/137b221f1f50f60eaf41.jpg",
  },
  {
    title:
      "Cô đỡ thôn bản miệt mài cống hiến sức trẻ trên Cao nguyên đá",
    description:
      "Trải qua hơn 13 năm, không lương, không có tiền hỗ trợ nhưng cô đỡ Mỷ vẫn miệt mài cống hiến sức trẻ cho công việc đỡ đẻ, hỗ trợ chăm sóc thai nhi, vận động các bà mẹ mang thai và đang nuôi con nhỏ đi tiêm chủng. Bên cạnh đó, chị Mỷ còn trực tiếp tuyên truyền giúp người dân bỏ dần các hủ tục, tiếp cận với điều kiện chăm sóc sức khỏe cho người mẹ và trẻ trong cả quá trình mang thai và sinh đẻ.",
    date: "05/12/2023",
    audioUrl: "",
    audioTitle: "",
    image: "https://cdnmedia.baotintuc.vn/Upload/c2tvplmdloSDblsn03qN2Q/files/2024/05/17/co-thon-do-ban-vu-thi-my-1752024a.jpeg",
  },
  {
    title: "Bắt nhóm đối tượng tạo trang web đánh bạc giả để lừa đảo chiếm đoạt hơn 500 triệu đồng",
    description:
      "Theo cơ quan điều tra, khoảng giữa tháng 5, qua công tác nắm tình hình địa bàn và các biện pháp nghiệp vụ, Phòng Cảnh sát hình sự, Công an thành phố thu thập được nhiều thông tin nhóm đối tượng gồm Dương Văn Tịnh (31 tuổi) cầm đầu cùng với Trần Mỹ Phú An, Bùi Ngọc Hậu, Lý Huỳnh Huy, Trương Thái Huy, tuổi từ 17 đến 25 (cùng trú huyện Thăng Bình, tỉnh Quảng Nam) có nhiều biểu hiện nghi vấn hoạt động phạm tội.",
    date: "05/12/2023",
    audioUrl: "",
    audioTitle: "",
    image: "https://static.kinhtedothi.vn/w960/images/upload/2024/05/17/vien-ksat.jpg",
  },
];

const Newspaper = () => {
  const [articles1, setArticles1] = useState([]);
  useEffect(() => {
    const getArticles = async () => {

      // setArticles(articles);
      const url = "https://api.fpt.ai/hmi/tts/v5";
      const headers = new Headers({
        "Content-Type": "application/json",
        "api-key": "atXmVJ42hw6yJm0rZJ9RaCSinzYZeN19",
        speed: "",
        voice: "banmai",
      });

      const articlePromises = articles.map(async (article) => {
        const response1 = await fetch(url, {
          method: "POST",
          headers: headers,
          body: article.title,
        });
        const response2 = await fetch(url, {
          method: "POST",
          headers: headers,
          body: article.description, // send the article content to the API
        });

        const data1 = await response1.json();
        const data2 = await response2.json();
        // replace the article's audioUrl with the API response
        article.audioTitle = data1.async; // replace 'async' with the actual property from the API response
        article.audioUrl = data2.async;
        return article;
      });
      const updatedArticles = await Promise.all(articlePromises);
      setArticles1(updatedArticles);
    };
    getArticles();
  }, []);

  const dispatch = useDispatch();
  const { curNewsIdx, isReading } = useSelector((state) => state.player);
  const store = useStore();
  const audioRef = useRef(null);

  const handleKeyboardPress = (event) => {
    let newsIdx = store.getState().player.curNewsIdx;
    const isShowing = store.getState().player.isShowingSpeech;
    const reading = store.getState().player.isReading;
    if (event.key === 'ArrowRight') {
      newsIdx = (newsIdx + 1) % 6;
      const val = newsIdx;
      dispatch(setCurNewsIdx({ val }));
    }
    else if (event.key === 'ArrowLeft') {
      if (newsIdx !== 0) {
        newsIdx = (newsIdx - 1);
      }
      else {
        newsIdx = 5;
      }
      const val = newsIdx;
      dispatch(setCurNewsIdx({ val }));
    }
    else if (event.key === 'Enter' && newsIdx !== -1 && !isShowing) {
      dispatch(setIsReading(!reading));

      if (!reading) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  };

  useEffect(() => {
    const val = -1;
    dispatch(setCurNewsIdx({ val }));
    window.addEventListener("keydown", handleKeyboardPress)

    return () => {
      window.removeEventListener("keydown", handleKeyboardPress)
    };
  }, []);
  console.log(articles1);
  useEffect(() => {
    if (curNewsIdx !== -1) {
      let audio = new Audio(articles1[curNewsIdx]?.audioTitle);
      audio.play();
      audioRef.current = new Audio(articles1[curNewsIdx]?.audioUrl);
      console.log(audioRef);
    }
  }, [curNewsIdx])

  return (
    <div>
      <div className="all__news">
        {articles.map((article, index) => (
          <Article key={index} article={article} idx={index} curIdx={curNewsIdx} isReading={isReading} />
        ))}
      </div>
    </div>
  );
};

export default Newspaper;

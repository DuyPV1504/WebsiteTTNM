import "./Book.css";
import Article from "./Article";
import React, { useState, useEffect, useContext } from "react";
import ReadMoreButton from "./Card/ReadMoreButton/ReadMoreButton";
import Book from "./Book";
import "./Card/card.css";

import { Grid } from "@mui/material";
import { useStore, useSelector, useDispatch } from "react-redux";
import { setCurBookIdx } from "../redux/features/playerSlice";
import { useNavigate } from "react-router-dom";

const articles = [
  {
    title: "x",
    description: "y",
    date: "05/12/2023",
    audioUrl: "",
    img: "https://upload.wikimedia.org/wikipedia/vi/4/48/Ph%C3%B9_th%E1%BB%A7y_x%E1%BB%A9_Oz_%28s%C3%A1ch%29.jpg",
    audioTitle: "",
    name: "Phù thủy xứ Oz",
  },
  {
    title:
      "1. Tài liệu hỏi - đáp về vệ sinh môi trường nông thôn, bảo vệ người sản xuất và cộng đồng",
    description:
      "“Tài liệu hỏi - đáp về vệ sinh môi trường nông thôn, bảo vệ người sản xuất và cộng đồng” được biên soạn dựa trên nội dung cuốn sách cùng tên là “Hỏi - đáp về vệ sinh môi trường nông thôn, bảo vệ người sản xuất và cộng đồng”. Tài liệu là chuỗi các câu hỏi – đáp về các kiến thức về môi trường, vệ sinh lao động, các vấn đề về nguyên nhân, tình trạng ô nhiễm môi trường, cách xử lý rác thải, cách sử dụng thuốc bảo vệ thực vật an toàn, .... Đây là các kiến thức cơ bản, hữu ích dành cho mỗi tổ chức, cá nhân. Cùng lắng nghe để hiểu và biết cách bảo vệ môi trường sống cho chính mình và những người xung quanh, vì một môi trường xanh sạch đẹp.",
    date: "05/12/2023",
    audioUrl: "",
    img: "https://nxbhcm.com.vn/Image/Biasach/dacnhantam86.jpg",
    audioTitle: "",
    name: "Đắc Nhân Tâm",
  },
  {
    title:
      "1. Tài liệu hỏi - đáp về vệ sinh môi trường nông thôn, bảo vệ người sản xuất và cộng đồng",
    description:
      "“Tài liệu hỏi - đáp về vệ sinh môi trường nông thôn, bảo vệ người sản xuất và cộng đồng” được biên soạn dựa trên nội dung cuốn sách cùng tên là “Hỏi - đáp về vệ sinh môi trường nông thôn, bảo vệ người sản xuất và cộng đồng”. Tài liệu là chuỗi các câu hỏi – đáp về các kiến thức về môi trường, vệ sinh lao động, các vấn đề về nguyên nhân, tình trạng ô nhiễm môi trường, cách xử lý rác thải, cách sử dụng thuốc bảo vệ thực vật an toàn, .... Đây là các kiến thức cơ bản, hữu ích dành cho mỗi tổ chức, cá nhân. Cùng lắng nghe để hiểu và biết cách bảo vệ môi trường sống cho chính mình và những người xung quanh, vì một môi trường xanh sạch đẹp.",
    date: "05/12/2023",
    audioUrl: "",
    img: "data:image/jpeg;base64,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",
    audioTitle: "",
    name: "Tuổi Trẻ Đáng Giá Bao Nhiêu",
  },
  {
    title:
      "1. Tài liệu hỏi - đáp về vệ sinh môi trường nông thôn, bảo vệ người sản xuất và cộng đồng",
    description:
      "“Tài liệu hỏi - đáp về vệ sinh môi trường nông thôn, bảo vệ người sản xuất và cộng đồng” được biên soạn dựa trên nội dung cuốn sách cùng tên là “Hỏi - đáp về vệ sinh môi trường nông thôn, bảo vệ người sản xuất và cộng đồng”. Tài liệu là chuỗi các câu hỏi – đáp về các kiến thức về môi trường, vệ sinh lao động, các vấn đề về nguyên nhân, tình trạng ô nhiễm môi trường, cách xử lý rác thải, cách sử dụng thuốc bảo vệ thực vật an toàn, .... Đây là các kiến thức cơ bản, hữu ích dành cho mỗi tổ chức, cá nhân. Cùng lắng nghe để hiểu và biết cách bảo vệ môi trường sống cho chính mình và những người xung quanh, vì một môi trường xanh sạch đẹp.",
    date: "05/12/2023",
    audioUrl: "",
    img: "https://salt.tikicdn.com/ts/product/e3/22/b4/1dd53d007da57bbb0f3afee583a8878d.jpg",
    audioTitle: "",
    name: "Einstein Cuộc Đời Và Vũ Trụ",
  },
];
const Allbooks = () => {
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
          body: article.name,
        });

        const data1 = await response1.json();
        // replace the article's audioUrl with the API response
        article.audioTitle = data1.async; // replace 'async' with the actual property from the API response
        // article.audioUrl = data2.async;
        return article;
      });
      const updatedArticles = await Promise.all(articlePromises);
      setArticles1(updatedArticles);
    };
    getArticles();
  }, []);
  // console.log(data);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { curBookIdx } = useSelector((state) => state.player);
  const store = useStore();


  const handleKeyboardPress = (event) => {
    let bookIdx = store.getState().player.curBookIdx;
    const isShowing = store.getState().player.isShowingSpeech;
    if (event.key === 'ArrowRight') {
      bookIdx = (bookIdx + 1) % 4;
      const val = bookIdx;
      console.log(articles1[bookIdx]);

      dispatch(setCurBookIdx({ val }));
    }
    else if (event.key === 'ArrowLeft') {
      if (bookIdx !== 0) {
        bookIdx = (bookIdx - 1);
      }
      else {
        bookIdx = 3;
      }
      const val = bookIdx;
      dispatch(setCurBookIdx({ val }));
    }
    else if (event.key === 'Enter' && bookIdx !== -1 && !isShowing) {
      navigate("/book_details");
    }
  };

  useEffect(() => {
    const val = -1;
    dispatch(setCurBookIdx({ val }));
    window.addEventListener("keydown", handleKeyboardPress)

    return () => {
      window.removeEventListener("keydown", handleKeyboardPress)
    };
  }, []);

  useEffect(() => {
    if (curBookIdx !== -1) {
      let audio = new Audio(articles1[curBookIdx]?.audioTitle);
      audio.play();
    }
  }, [curBookIdx])
  return (
    <div>
      <div className="all_books animate-slideup">
        {/* <Grid
          container
          rowSpacing={1}
          columnSpacing={4}
          className="flex justify-center"
        > */}
        {articles1.map((article, index) => (
          <div className={curBookIdx === index ? "card bg-gray-400" : "card"}>
            <div className="card-img">
              <img src={article.img} alt={article.name} />
              {/* tf article.img */}
            </div>
            <div className="body">
              <h5>{article.name}</h5>
            </div>
            <ReadMoreButton id={index} book={article} />
          </div>
        ))}
        {/* </Grid> */}
      </div>
    </div>
  );
};

export default Allbooks;
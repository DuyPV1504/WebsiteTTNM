import "./Book.css";
import Article from "./Article";
import React, { useState, useEffect } from "react";
import RadioVideo from "./RadioVideo";

const RadioVideos = () => {
  const articles = [
    {
      name: " Tháng 4 Là Lời Nói Dối Của Em",
      auther: "Hà Anh Tuấn",
      date: "05/12/2023",
      audioUrl: Thang4,
    },
    {
      name: "Chiều Hôm Ấy",
      auther: "JayKii",
      date: "05/12/2023",
      audioUrl: ChieuHomAy,
    },
    {
      name: "Cơn Mưa Ngang Qua",
      auther: " Sơn Tùng M-TP",
      date: "05/12/2023",
      audioUrl: ConMuaNgangQua,
    },
    {
      name: " Lạc Trôi ",
      auther: " Sơn Tùng M-TP",
      date: "05/12/2023",
      audioUrl: LacTroi,
    },
  ];

  return (
    <div>
      <div className="flex flex-wrap justify-around space-4">
        {articles.map((article, index) => (
          <RadioVideo key={index} video={article} />
        ))}
      </div>
    </div>
  );
};

export default RadioVideos;

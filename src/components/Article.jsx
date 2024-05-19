import * as React from "react";
import CardMedia from "@mui/material/CardMedia";
import "./Article.css";
import { FaPlayCircle } from "react-icons/fa";
import { FaPauseCircle } from "react-icons/fa";

function Article({ article, idx, curIdx, isReading }) {

  return (
    <div
      class="animate-slideup block border border-primary rounded-lg bg-white shadow-secondary-1 dark:bg-surface-dark ">

      <div
        class="relative overflow-hidden bg-cover bg-no-repeat"
        data-twe-ripple-init
        data-twe-ripple-color="light">
        <CardMedia
          sx={{ height: 235.58 }}
          image={article?.image}
          title="green iguana"
        />  
        <a href="#!">
          <div
            class="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-[hsla(0,0%,98%,0.15)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100"></div>
        </a>
        <div className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${(idx === curIdx) ? 'flex bg-black bg-opacity-70' : 'hidden'}`}>
          {!isReading ?
            <FaPlayCircle
              size={35}
              className="text-gray-300"
            />
            :
            <FaPauseCircle
              size={35}
              className="text-gray-300"
            />

          }
        </div>
      </div>

      <div class="p-6 text-surface dark:text-white">
        <h5 class="mb-2 text-xl font-medium leading-tight">{article.title}</h5>
      </div>
    </div>
  );
}

export default Article;

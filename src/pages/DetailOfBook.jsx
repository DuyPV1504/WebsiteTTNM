import React from "react";
import "./detail.css";
import { useState, useEffect } from "react";
import AudioButton from "../components/BookAudioButton";
import { useNavigate } from "react-router-dom";
export default function DetailOfBook() {
  // const single_book = useSelector((state) => state.book.individual_book);
  // console.log(single_book);
  const [text, setText] = useState("");
  const [single_book, set_single_book] = useState([]);

  useEffect(() => {
    const paragraphElement = document.getElementById("x");
    setText(paragraphElement.textContent);
    const get_single_book = async () => {
      const single_book = [
        {
          title: "Phù thủy xứ Oz",
          description:
            "Dorothy sống giữa vùng đồng cỏ Kansas bao la…” Bắt đầu như thế là cuốn truyện thiếu nhi kinh điển của nước Mỹ. Cơn lốc xoáy đã vô tình cuốn Dorothy cùng chú chó nhỏ Toto đến một nơi lạ lùng, tên gọi xứ Oz; và cô bé sợ rằng mình chẳng bao giờ được về với Chú Henry, Dì Em trong căn nhà xám giữa đồng cỏ bao la. Nhưng cô đã gặp những người Munchkin, họ chỉ cho cô Con đường Gạch vàng dẫn tới Thành phố Ngọc Lục bảo, nơi có Oz, vị Phù thủy có khả năng thỏa mãn mọi điều ước. Trên đường đi, cô gặp Bù nhìn rơm, Thợ rừng Thiếc, Sư tử Nhát, tất cả đồng lòng cùng cô dấn bước vào phiêu lưu, xuyên qua đồng anh túc chết chóc, đối mặt các quái thú, đối mặt phù thủy Ác… và cả Phù thủy xứ Oz hùng mạnh, để tìm ra chìa khóa cho điều họ mong mỏi nhất…",
          author:
            "Frank Baum sinh ra tại Chittenango, New York, năm 1856, là nhà văn viết truyện thần thoại nổi tiếng nhất của Mỹ. Ông đã từng thử qua rất nhiều nghề nhưng đều không như ý, cho đến tuổi bốn mươi mới khẳng định được chân tài của mình qua trong việc viết truyện theo kiểu tổ chức thần kỳ. Trong khi ở Chicago, vợ ông, bà Maud, đã giục ông viết ra những câu chuyện mà ông vẫn kể cho lũ trẻ con hàng xóm nghe mỗi tối. Phù thủy xứ OZ, câu chuyện đầu tiên được in vào năm 1900 trong số mười bốn câu chuyện dài về xứ OZ chính là tác phẩm nổi tiếng nhất của ông. Tuy nhiên Frank Baun còn rất nổi danh với nhiều chuyện thần thoại khác cũng như những cuốn mà ông viết với bút danh khác.",
          publisher:
            "Ebook được blog Đào Tiểu Vũ hoàn thành với mục đích phi thương mại, nhằm chia sẻ với những bạn ở xa hoặc không có điều kiện mua sách, khi sao lưu xin ghi rõ nguồn. Trong điều kiện có thể bạn hãy mua sách để ủng hộ nhà xuất bản và tác",
          contributor: "Xù Risan – Du Ca – trangchic",
        },
      ];
      // setArticles(articles);
      const url = "https://api.fpt.ai/hmi/tts/v5";
      const headers = new Headers({
        "Content-Type": "application/json",
        "api-key": "u6PXADUPP0luylzHNLJaVYYN1kT7ltP7",
        speed: "",
        voice: "banmai",
      });

      const articlePromises = single_book.map(async (article) => {
        const response1 = await fetch(url, {
          method: "POST",
          headers: headers,
          body: JSON.stringify({ text: article.title }),
        });
        const response2 = await fetch(url, {
          method: "POST",
          headers: headers,
          body: JSON.stringify({ text: article.content }), // send the article content to the API
        });

        const data1 = await response1.json();
        const data2 = await response2.json();
        // replace the article's audioUrl with the API response
        article.audioTitle = data1.async; // replace 'async' with the actual property from the API response
        // article.audioUrl = data2.async;
        return article;
      });
      const updatedArticles = await Promise.all(articlePromises);
      set_single_book(updatedArticles);
    };
    get_single_book();
  }, []);
  // console.log(data);
  console.log(single_book.description);

  const navigate = useNavigate();
  const handleKeyboardPress = (event) => {
    console.log(event.key);
    if (event.key === 'Enter') {
      var bookButton = document.getElementById("audioBookButton");
      bookButton.click()
    }
    else if (event.key === 'Escape') {
      navigate("/Books");
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyboardPress)

    return () => {
      window.removeEventListener("keydown", handleKeyboardPress)
    };
  }, []);

  return (
    <div>
      <div style={{ margin: 20, padding: 20, textAlign: "justify" }}>
        {single_book.map((single_book, index) => (
          <div className="grid">
            <div className="main-img">
              <img
                src={
                  "https://upload.wikimedia.org/wikipedia/vi/4/48/Ph%C3%B9_th%E1%BB%A7y_x%E1%BB%A9_Oz_%28s%C3%A1ch%29.jpg"
                }
                alt=""
              />
            </div>
            <div className="text">
              <h2>{single_book.title}</h2>
              <p>
                <strong>Description</strong>: {single_book.description}
              </p>
              <span>
                <strong>Author</strong>: {single_book.author}
              </span>
              <span>
                <strong>Publisher</strong> :{single_book.publisher}
              </span>
              <span>
                <strong>Contributor</strong> :{single_book.contributor}
              </span>
              {/* <a href={single_book.amazon_product_url} target='_blank'>Buy directly from Amazon</a> */}
            </div>
          </div>
        ))}

        <div>
          <p hidden id="x">
            Dorothy sống giữa những đồng cỏ Kansas bao la, cùng với chú Henry,
            là nông dân, và Thím Em, vợ người nông dân. Căn nhà của họ bé nhỏ,
            bởi gỗ để dựng nhà phải chở nhiều dặm bằng xe ngựa. Bốn bức tường,
            sàn nhà, mái nhà, làm nên một căn phòng; và căn phòng đó có một bếp
            nấu trông han gỉ, một cái tủ đĩa, một cái bàn, ba hay bốn cái ghế,
            cùng những chiếc giường. Chú Henry và Thím Em nằm chiếc giường to ở
            một góc còn góc kia là chiếc giường nhỏ của Dorothy. Nhà không hề có
            mái xép, không có tầng hầm, ngoại trừ một cái lỗ nhỏ đào vào trong
            nền, gọi là hầm lốc xoáy, là nơi cả nhà chạy vào nấp khi một trong
            những cơn lốc khổng lồ nào đó nổi lên, mạnh tới nỗi nghiền nát bất
            kỳ dinh thự nào trên đường nó đi. Muốn tới tầng hầm, ta phải qua một
            cái cửa lật ở giữa sàn, từ đó là cái thang trải xuống một lỗ nhỏ,
            tăm tối. [Chúc bạn đọc sách vui vẻ tại www./ - gác nhỏ cho người yêu
            sách.] Khi Dorothy đứng trên bục cửa và nhìn quanh, cô chẳng thấy gì
            khác ngoài đồng cỏ xám bao la từ mọi hướng. Không có ngọn cây hay
            ngôi nhà nào phá vỡ khung cảnh rộng lớn của miền đất bằng phẳng tứ
            phía lan tới mép bầu trời. Mặt trời thiêu đốt mảnh đất đã cày thành
            một khối xám xịt, với những vết nứt nhỏ chạy suốt qua. Cả bọn cỏ
            cũng chẳng xanh, vì mặt trời đã đốt cháy những ngọn cỏ dài tới khi
            nhuộm chúng vào cái màu xám đang hiện diện nơi nơi. Ngôi nhà cũng đã
            từng phủ sơn nhưng mặt trời làm cho nước sơn phồng rộp lên, và giờ
            đây nó cũng xám xịt như tất cả mọi thứ. Khi mới tới nơi này, Thím Em
            còn trẻ và là một cô vợ xinh xắn. Mặt trời và gió cũng làm thím đổi
            thay. Chúng lấy đi cái lấp lánh trong đôi mắt và để lại màu xám bình
            thản, lấy đi màu hồng trên má và môi thím, và chúng cũng thành ra
            xám. Thím thật gầy gò hốc hác, giờ đây thì không khi nào mỉm cười.
            Buổi đầu khi Dorothy, một em bé mồ côi, tới đây sống cùng, Thím Em
            cứ giật nảy mình bởi tiếng cười trẻ con đến nỗi phải hét lên, xiết
            tay lên ngực bất cứ khi nào cái giọng vui vẻ của Dorothi vọng đến,
            và thím vẫn nhìn Dorothy băn khoăn không biết cô tìm thấy điều chi
            mà cười. Chú Henry không bao giờ cười. Chú làm việc cần mẫn từ sáng
            đến tối không biết tới niềm vui. Chú cũng xám xịt, từ bộ râu dài tới
            đôi ủng thô, cái nhìn của chú trịnh trọng và khắc nghiệt, chú hiếm
            khi cất lời. Toto chính là kẻ đã làm cho Dorothy cười, và giữ cho
            Dorothy lớn lên khỏi xám xịt như mọi thứ vây quanh. Toto không xám,
            nó là một con chó đen nhỏ bé, với bộ lông dài mượt mà cùng đôi mắt
            đen lấp lánh tươi vui trên cái mũi nhỏ xíu tức cười. Toto chơi bời
            cả ngày, Dorothy chơi với nó và yêu nó hết mình. Tuy nhiên, hôm nay,
            họ không chơi. Chú Henry ngồi trên bục cửa lo lắng ngước lên bầu
            trời còn tái xám hơn thường lệ. Bên cửa, Dorothy đứng ôm Toto trong
            lòng, cũng ngước nhìn lên. Thím Em đang rửa đĩa. Từ phương bắc xa
            tít họ nghe thấy tiếng gió khẽ rền rĩ. Chú Henry và Dorothy thấy
            những ngọn cỏ dài rạp xuống từng đợt trước cơn bão đang kéo tới. Giờ
            là lúc tiếng rít sắc nhọn vọng lại từ phương nam, và quay đầu về đó,
            họ trông thấy những sóng cỏ gợn lên cùng một hướng. Chú Henry đột
            nhiên đứng dậy. “Một cơn lốc đang tới, Em à,” chú gọi vợ. “Tôi đi
            xem kho đây.” Rồi chú chạy về đám chuồng bò chuồng ngựa. Thím Em
            buông rơi công việc và bước ra cửa. Liếc mắt nhìn qua, thím biết mối
            hiểm nguy đã gần kề. “Mau lên, Dorothy!” thím hét, “chạy tới hầm
            đi!” Toto nhảy vụt khỏi tay Dorothy rồi trốn dưới giường, và cô bé
            vội đi bắt nó. Thím Em, kinh hoàng quá đỗi, mở cái cửa lật giữa sàn
            ra, leo xuống thang chui vào cái lỗ bé nhỏ tối tăm. Sau cùng,
            Dorothy cũng tóm được Toto và bắt đầu chạy theo thím. Khi cô chạy
            được nửa gian phòng thì có tiếng gió rít chói tai và ngôi nhà rung
            lắc dữ dội khiến cô trượt chân và bất thình lình ngồi phệt xuống
            sàn. Khi đó, một điều kỳ lạ đã xảy ra. Ngôi nhà lắc mình sang bên
            hai ba lần rồi từ từ bay vào không trung. Dorothy cảm thấy như cô
            đang bay lên trong một khí cầu. Gió bắc và gió nam đã gặp nhau chính
            nơi ngôi nhà đứng, khiến nó trở thành tâm điểm của lốc xoáy. Ở giữa
            lốc xoáy, không khí thường tĩnh lặng, nhưng áp suất ghê gớm của gió
            từ mọi phía quanh nhà bốc lên cao, cao tới khi chạm đỉnh lốc xoáy.
            Nó ngự trên đó và bị cuốn phăng đi bao nhiêu dặm đường một cách dễ
            dàng như thể người ta mang một cái lông. Trời rất tối và gió hú kinh
            khủng quanh mình, nhưng Dorothy thấy cô đang bay thoải mái. Sau
            những vòng xoáy đầu tiên, vào lúc mà ngôi nhà ngả nghiêng hết cỡ, cô
            thấy mình được lắc lư êm ái như một em bé ở trong nôi. Toto thì
            không thích. Nó chạy đôn đáo khắp phòng, sủa lên nhặng xị. Dorothy
            một mực bình thản ngồi trên sàn, chờ xem điều gì sẽ đến. Có một lúc
            Toto tới gần cái cửa lật và rơi vào đó. Thoạt đầu cô nghĩ mình đã
            mất chó con. Nhưng rồi cô thấy cái tai của nó đính ở miệng lỗ, bởi
            áp suất quá mạnh của không khí cứ giữ nó tại đó không thể rơi được.
            Cô bò tới lỗ, túm tai Toto, kéo nó vào phòng. Sau đó cô đóng cửa lật
            lại để không còn tai nạn nào xảy đến. Giờ lại giờ trôi qua chậm
            chạp. Dorothy đã hết sợ, nhưng cô cảm thấy thật cô đơn, và xung
            quanh gió rít ầm ĩ đến nỗi cô gần như điếc. Thoạt tiên cô tự hỏi
            không biết mình có tan ra từng mảnh khi ngôi nhà lại rơi xuống.
            Nhưng rồi thời gian cứ trôi qua mà chẳng thấy có điều gì kinh khủng,
            cô không lo lắng nữa và cả quyết sẽ lặng yên chờ đợi những gì tương
            lai mang tới. Cuối cùng cô bò qua sàn nhà đang đu đưa, tới bên
            giường của mình và nằm lên đó. Toto bước theo, nằm xuống cạnh cô.
            Mặc cho ngôi nhà rung lắc trong tiếng gió rền rĩ, Dorothy mau chóng
            khép mí mắt và chìm vào giấc ngủ.
          </p>

          <script>text = document.getElementById("x").innerHTML;</script>
          <br></br>
          <div>
            <AudioButton />
            {/* ... other content ... */}
          </div>
          <br></br>

          <p text={text} />

          <p>{text}</p>
        </div>
      </div>
    </div>
  );
}
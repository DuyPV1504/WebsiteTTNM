import {
  Navigate,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import UserSelect from "./pages/UserSelect";
import Homepage from "./pages/Homepage";
import News from "./pages/News";
import Profile from "./pages/Profile";
import Chatroom from "./pages/Chatroom";
import Books from "./pages/Books";
import Music from "./pages/Music";
import DetailOfBook from "./pages/DetailOfBook";
// import AllBooks from "./pages/All Books/AllBooks";
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Home />} />
      <Route path="/user-select" element={<UserSelect />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home-page" element={<Homepage />} />
      <Route path="/news" element={<News />} />
      <Route path="/Chatroom" element={<Chatroom />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/Music" element={<Music />} />
      <Route path="/Books" element={<Books />} />
      <Route path="/book_details" element={<DetailOfBook />} />

      <Route path="*" element={<Navigate to="/" />} />
      {/* </Route> */}
    </>
  ),
  // { basename: import.meta.env.DEV ? "/" : "/react-face-auth/" }
  { basename: "/" }
);

export default router;

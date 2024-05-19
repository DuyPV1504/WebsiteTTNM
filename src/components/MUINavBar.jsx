import { AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material";
import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { Stack } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { NavLink } from 'react-router-dom';
import { HiOutlineHashtag, HiOutlineHome, HiOutlineNewspaper, HiOutlineMusicNote, HiChat } from 'react-icons/hi';
import { ImBooks } from "react-icons/im";

const links = [
  { name: 'Home', to: '/home-page', icon: HiOutlineHome },
  { name: 'News', to: '/news', icon: HiOutlineNewspaper },
  { name: 'Books', to: '/books', icon: ImBooks },
  { name: 'Music', to: '/Music', icon: HiOutlineMusicNote },
  { name: 'Chatroom', to: '/Chatroom', icon: HiChat },
];

export const MUINavBar = () => {
  const navigate = useNavigate();

  console.log(window.location.pathname);
  return (
    <AppBar position="static" sx={{ backgroundColor: "#264b8d" }}>
      <Toolbar>

        <Stack direction="row" spacing={5}>

          {links.map((item) => (
            <NavLink
              key={item.name}
              to={item.to}
              className="flex flex-row justify-start items-center my-8 text-sm font-medium hover:text-cyan-400"

            >
              <item.icon className="w-6 h-6 mr-2" color={window.location.pathname.toUpperCase() === item.to.toUpperCase() ? "cyan" : "white"} />
              <div className={window.location.pathname.toUpperCase() === item.to.toUpperCase() ? "text-cyan-400" : "text-white-400"}>
                {item.name}
              </div>
            </NavLink>
          ))}

        </Stack>
      </Toolbar>
    </AppBar>
  );
};

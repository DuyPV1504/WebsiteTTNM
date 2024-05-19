import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Button,
    InputBase,
    alpha,
  } from "@mui/material";
  import React, { useState } from 'react';
 

const SearchBar = () => {
  return (
    <div>
      <InputBase
          placeholder="Search..."
  
          sx={{
            color: "inherit",
            ml: 1,
            flex: 1,
            borderRadius: 4,
            backgroundColor: alpha("#fff", 0.15),
            "&:hover": {
              backgroundColor: alpha("#fff", 0.25),
            },
            p: "8px 12px",
          }}
        />
    </div>
  );
};

export default SearchBar;
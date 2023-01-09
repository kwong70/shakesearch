import DropdownCheckbox from "./DropdownCheckbox";
import SearchIcon from "@mui/icons-material/Search";
import {
  Button,
  Checkbox,
  TextField,
  FormGroup,
  FormControlLabel,
} from "@mui/material";
import React, { useState } from "react";
import RenderList from "./RenderList";
import "../styles/Search.css";

export default function Search() {
  const [searchBar, setSearchBar] = useState("");
  const [wantedTitles, setWantedTitles] = useState([]);
  const [exactMatch, setExactMatch] = useState(true);
  const [listProps, setListProps] = useState({});

  function handleSelectedTitles(selected) {
    setWantedTitles(selected);
  }

  function handleSubmit(e) {
    e.preventDefault();
    let selectedTitles = [];
    for (const titleObject of wantedTitles) {
      selectedTitles.push(titleObject.value);
    }
    if( searchBar != "" ) {
      setListProps({
        Query: searchBar.toLowerCase(),
        ExactMatch: exactMatch,
        Titles: wantedTitles,
      });
    } else {
      console.log("Invalid input")
    }
    
  }
  return (
    <div>
      <div className="search-wrapper">
        <div>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  onClick={() => setExactMatch(!exactMatch)}
                  defaultChecked
                />
              }
              label="*Exact match (Case insensitive)"
            />
          </FormGroup>
        </div>
        <form noValidate className="searchbar-button">
          <div className="searchbar">
            <TextField
              aria-required
              label='Try "infectious pestilence"'
              variant="outlined"
              fullWidth
              onChange={(e) => setSearchBar(e.target.value)}
            />
          </div>
          <div className="button">
            <Button
              onClick={handleSubmit}
              variant="contained"
              endIcon={<SearchIcon />}
              sx={{
                minHeight: "100%",
                maxHeight: "100%",
              }}
            >
              Search
            </Button>
          </div>
        </form>
        <div className="title-dropdown">
          <DropdownCheckbox handleSelectedTitles={handleSelectedTitles} />
        </div>
      </div>
      {listProps.Query != undefined && <RenderList {...listProps} />}
    </div>
  );
}

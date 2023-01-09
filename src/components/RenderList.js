import axios from "axios";
import HighlightSnippet from "./HighlightSnippet";
import {
  Alert,
  Divider,
  List,
  ListItem,
  ListItemText,
  Pagination as PaginationBar,
} from "@mui/material";
import React, { useState, useEffect } from "react";
function RenderList(props) {
  const ITEMS_PER_PAGE = 5;
  const [works, setWorks] = useState([]);
  const [page, setPage] = useState(1); 
  const [bounds, setBounds] = useState([0, page * ITEMS_PER_PAGE]);
  const [errorMessage, setErrorMessage] = useState("");
  var baseURL = ""
  if (process.env.NODE_ENV == "development") {
    baseURL = "http://localhost:3001"
  } else {
    baseURL = "https://kw-shakesearch-api.onrender.com"
  }
    useEffect(() => {
      // props.Query, props.ExactMatch, props.Titles
      const params =
        "?" + "q=" + props.Query + "&" + "exactMatch=" + props.ExactMatch;
      const endpoint = baseURL + "/search" + params
      var config = {
        method: "post",
        url: endpoint,
        headers: {
          "Content-Type": "text/plain",
        },
        data: props.Titles,
      };
      if (props.Query != "") {
        axios(config)
          .then((response) => {
            if (response.status == 200) {
              setErrorMessage("");
              const data = response.data;
              if (data == null || data.length == 0) {
                setErrorMessage("No matches found for: " + props.Query);
              } else {
                let data = response.data;
                setWorks(data);
              }
            } else {
              setErrorMessage("Error status code:  ", response.status);
            }
          })
          .catch((error) => {
            setErrorMessage("Error status code:  ", error);
          });
      }
    }, [props]);


  const changePage = (e, p) => {
    const newBounds = [(p - 1) * ITEMS_PER_PAGE, p * ITEMS_PER_PAGE]
    setBounds(newBounds)
    setPage(p);
  };

  if( errorMessage != "" ) {
    return (
      <div style={{marginTop: "15px"}}>
        <Alert severity="error">{errorMessage}</Alert>
      </div>
    );
  }

  var queryHeaderFormatted = "Results (" + works.length + "): ";

  if( !props.ExactMatch ) {
    var splitQuery = props.Query.split(" ");
    if (splitQuery.length != 1) {
      splitQuery.map((word, i) => {
        queryHeaderFormatted = queryHeaderFormatted + word + ", ";
      });
    }
  } 
  queryHeaderFormatted = queryHeaderFormatted + props.Query

  return (
    <div>
      <h3 style={{ textAlign: "center" }}>{queryHeaderFormatted}</h3>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {works.slice(bounds[0], bounds[1] - 1).map((snippet, i) => {
          return (
            <div key={i}>
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary={snippet.Title}
                  secondary={
                    <HighlightSnippet
                      Query={props.Query}
                      Snippet={snippet.Snippet}
                      ExactMatch={props.ExactMatch}
                    />
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </div>
          );
        })}
      </List>
      <PaginationBar
        count={Math.ceil(works.length / ITEMS_PER_PAGE)}
        size="large"
        page={page}
        variant="outlined"
        shape="rounded"
        onChange={changePage}
      />
    </div>
  );
}

export default React.memo(RenderList);
import { getData } from "../helpers/helper";
import HighlightSnippet from "./HighlightSnippet";
import {
  Alert,
  Divider,
  List,
  ListItem,
  ListItemText,
  LinearProgress,
  Pagination as PaginationBar,
} from "@mui/material";
import React, { useState, useEffect } from "react";

/*
<RenderList> 
Handles: 
1. api request
2. displaying results
3. loading message
4. error messages
5. pagination 

Usage: 
Works as a child of <Search> and a parent of <HighlightSnippet>.
<Search> handles the user input and passes the user's request to <RenderList> to do the work.
<RenderList> then calls the api with the given request arguments. 
Assuming a successful response then sends each snippet to be highlighted and formatted to <HighlightSnippet>.

props.Query, props.ExactMatch, props.Titles
*/
function RenderList(props) {
  const ITEMS_PER_PAGE = 5;
  const [works, setWorks] = useState([]);
  const [page, setPage] = useState(1);
  const [bounds, setBounds] = useState([0, page * ITEMS_PER_PAGE]);
  const [errorMessage, setErrorMessage] = useState("");
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    setShowLoading(true);
    getData(props.Query, props.ExactMatch, props.Titles).then((response) => {
      setShowLoading(false);
      if (!response.isError) {
        setErrorMessage("");
        setWorks(response.data);
      } else {
        setErrorMessage(response.errorMessage);
      }
    });
  }, [props]);

  const changePage = (e, p) => {
    const newBounds = [(p - 1) * ITEMS_PER_PAGE, p * ITEMS_PER_PAGE];
    setBounds(newBounds);
    setPage(p);
  };

  var queryHeaderFormatted = "Results (" + works.length + "): ";
  var query = "";
  if (!props.ExactMatch) {
    var splitQuery = props.Query.split(" ");
    if (splitQuery.length != 1) {
      splitQuery.map((word, i) => {
        query = query + word + ", ";
      });
    }
  }
  query = query + props.Query;
  queryHeaderFormatted = queryHeaderFormatted + query;

  if (errorMessage != "") {
    return (
      <div style={{ marginTop: "100px" }}>
        <Alert severity="error">{errorMessage}</Alert>
      </div>
    );
  }

  if (showLoading) {
    return (
      <div className="loading" style={{ marginTop: "100px" }}>
        <LinearProgress />
        <h3>Searching for "{query}"</h3>
        <p>
          If this is your first request please allow us to wake up our brain.
          Subsequent reqeusts should be fast!
        </p>
      </div>
    );
  }

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

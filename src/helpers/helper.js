import axios from "axios";

export async function getData(query, exactMatch, titles) {
  const params = "?" + "q=" + query + "&" + "exactMatch=" + exactMatch;
  const baseURL = process.env.REACT_APP_BASE_URL;
  const endpoint = baseURL + "/search" + params;

  var customResponse = {
    isError: false,
    errorMessage: "",
    data: [],
  };

  var config = {
    method: "post",
    url: endpoint,
    headers: {
      "Content-Type": "text/plain",
    },
    data: titles,
  };
  try {
    const axiosResponse = await axios(config)
    if (axiosResponse.status == 200) {
      const data = axiosResponse.data;
      if (data == null || data.length == 0) {
        customResponse.isError = true;
        customResponse.errorMessage = "No matches found for: " + query;
      } else {
        customResponse.data = data;
      }
    } else {
      customResponse.isError = true;
      customResponse.errorMessage = "Error: API returned a non-200 status";
    }
      console.log(customResponse);
  }catch( error ) {
    customResponse.isError = true;
    customResponse.errorMessage = error.name + ": " + error.message;
    console.log(customResponse);
  }

  return customResponse
}

export function getIndices(s, query, exactMatch) {
  const indexRangeToHighlight = [];
  var queries = [];
  if (exactMatch) {
    queries.push(query);
  } else {
    queries = query.split(" ");
  }
  queries.map((q) => {
    var re = new RegExp(q, "gi");
    var match = re.exec(s);
    while (match) {
      // console.log(match.index);
      const matchToAdd = [match.index, match.index + q.length];
      var add = true;
      for (var i = 0; i < indexRangeToHighlight.length; i++) {
        const [currStart, currEnd] = indexRangeToHighlight[i];
        if (currStart <= matchToAdd[1] || currEnd >= matchToAdd[0]) {
          if (currStart <= matchToAdd[0] && currEnd >= matchToAdd[1]) {
            add = false;
          }
          if (
            currStart > matchToAdd[0] &&
            currStart <= matchToAdd[1] &&
            currEnd >= matchToAdd[0] &&
            currEnd >= matchToAdd[1]
          ) {
            indexRangeToHighlight[i][0] = matchToAdd[0];
            add = false;
          }
          if (
            currStart <= matchToAdd[0] &&
            currStart <= matchToAdd[1] &&
            currEnd >= matchToAdd[0] &&
            currEnd < matchToAdd[1]
          ) {
            indexRangeToHighlight[i][1] = matchToAdd[1];
            add = false;
          }
        }
      }
      if (add) {
        indexRangeToHighlight.push(matchToAdd);
      }
      match = re.exec(s);
    }
  });
  indexRangeToHighlight.sort(function (a, b) {
    return a[0] - b[0];
  });
  return indexRangeToHighlight;
}


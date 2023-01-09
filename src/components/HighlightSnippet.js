const HighlightSnippet = (props) => {
  const indicesToHighlight = getIndices(
    props.Snippet,
    props.Query,
    props.ExactMatch
  );

  var formattedSnippet = props.Snippet.split(/\r/).map((line) => {
    var shift = 0;
    const indicesToHighlight = getIndices(line, props.Query, props.ExactMatch);
    var partiallyFormattedLine = indicesToHighlight.map(([start, end]) => {
      const nonHighlighted = line.substring(shift, start);
      const highlighted = <mark>{line.substring(start, end)}</mark>;
      shift = end;
      return (
        <a key={start + end}>
          {nonHighlighted}
          {highlighted}
        </a>
      );
    });
    return (
      <div>
        {partiallyFormattedLine}
        <a>{line.substring(shift, line.length)}</a>
      </div>
    );
  });

  return <p>{formattedSnippet}</p>;
};
export default HighlightSnippet;

function getIndices(s, query, exactMatch) {
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

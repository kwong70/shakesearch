import { getIndices } from "../helpers/helper";

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


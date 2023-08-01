import D3WordCloud from 'react-d3-cloud';

type Props = {
  data: { value: number; text: string }[];
  height: number;
  font: string;
  fontSize: (word: { value: number }) => number;
  rotate: number;
  padding: number;
  fill: string;
};

const WordCloud = ({
  data,
  height,
  font,
  fontSize,
  rotate,
  padding,
  fill,
}: Props) => {
  return (
    <D3WordCloud
      data={data}
      height={height}
      font="Times"
      fontSize={fontSize}
      rotate={rotate}
      padding={padding}
      fill={fill}
    />
  );
};

export default WordCloud;

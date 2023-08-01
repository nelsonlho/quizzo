'use client';
import dynamic from 'next/dynamic';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import React from 'react';

// Needs this to resolve NextJS document not found issue
const DynamicWordCloud = dynamic(() => import('@/components/WordCloud'), {
  ssr: false,
});

type Props = {
  formattedTopics: { text: string; value: number }[];
};

const fontSizeMapper = (word: { value: number }) =>
  Math.log2(word.value) * 5 + 16;

const CustomWordCloud = ({ formattedTopics }: Props) => {
  const theme = useTheme();
  const router = useRouter();
  const props = {
    data: formattedTopics,
    height: 550,
    font: 'Times',
    fontSize: fontSizeMapper,
    rotate: 0,
    padding: 10,
    fill: theme.theme === 'dark' ? 'white' : 'black',
  };

  return (
    <>
      <DynamicWordCloud
        data={formattedTopics}
        height={550}
        font="Times"
        fontSize={fontSizeMapper}
        rotate={0}
        padding={10}
        fill={theme.resolvedTheme === 'dark' ? 'white' : 'black'}
      />
    </>
  );
};

export default CustomWordCloud;

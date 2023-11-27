import React from 'react';

type Props = {
  html: string;
  className?: string | undefined;
};

export default function RawDiv({ html, className }: Props) {
  if (!html) return null;
  return (
    <div className={className} dangerouslySetInnerHTML={{ __html: html }} />
  );
}

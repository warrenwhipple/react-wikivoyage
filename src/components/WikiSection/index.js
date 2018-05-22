// @flow
import React from 'react';
import type { SectionData } from '../../wiki-fetch-cache';
import DOMPurify from 'dompurify';

type Props = {
  sectionData: SectionData
};

const WikiSection = (props: Props) => {
  const { line, text } = props.sectionData;
  return (
    <div className="WikiSection">
      <h2>{line}</h2>
      <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(text) }} />
    </div>
  );
};

export default WikiSection;

import * as React from 'react';

import sections from '#data/sections.yaml';
import Fallback from '#components/fallback/Fallback.component';
import ComponentHelpers from '#lib/Helpers/Components.Helpers';

export default function Home() {
  const { blocks } = sections;
  return (
    <>
      {blocks.map((block) => {
        const { id, type, data, elementId } = block;
        const Component = ComponentHelpers[type] || Fallback;

        return (
          <div id={elementId} key={id}>
            <Component {...data} />
          </div>
        );
      })}
    </>
  );
}

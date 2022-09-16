/* eslint-disable @typescript-eslint/no-explicit-any */

declare module '*info.yaml' {
  const value: import('./src/types/Info.type').Info;
  export = value;
}

declare module '*sections.yaml' {
  const value: import('./src/types/Sections.type').Sections;
  export = value;
}

declare module '*design.yaml' {
  const value: import('./src/types/Design.type').Design;
  export = value;
}

declare module '*keys.yaml' {
  const value: import('./src/types/Keys.type').Keys;
  export = value;
}

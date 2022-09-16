import Design from '#data/design.yaml';

export const colors = {
  primary: Design.primary,
  secondary: Design.secondary,

  background: Design.secondary || Design.background,
  contentTextColor: Design.ContentTextColor || Design.primary,
  active: Design.active,
  navBackground: Design.navBackground || Design.secondary,

  muted: Design.muted,
  mutedBackground: Design.mutedBackground || Design.muted,
  mutedTextColor: Design.mutedTextColor || Design.primary,

  buttonBackground: Design.buttonBackground || Design.primary,
  buttonTextColor: Design.buttonTextColor || Design.secondary,
  buttonActiveBackground: Design.buttonActiveBackground || Design.active,
  buttonActiveTextColor: Design.buttonActiveTextColor || Design.secondary,

  buttonReversedBackground: Design.buttonReversedBackground || Design.secondary,
  buttonReversedTextColor: Design.buttonReversedTextColor || Design.primary,
  buttonReversedActiveBackground: Design.buttonReversedActiveBackground || Design.primary,
  buttonReversedActiveTextColor: Design.buttonReversedActiveTextColor || Design.secondary,

  blockBackground: Design.blockBackground || Design.primary,
  blockTextColor: Design.blockTextColor || Design.secondary,

  black: Design.black,
};

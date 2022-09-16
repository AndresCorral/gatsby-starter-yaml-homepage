import { style } from '@vanilla-extract/css';

import { colors } from '#styles/Colors.css';
import { theme } from '#styles/Theme.css';

export const fixedHeader = style(
  {
    position: 'fixed',
    background: colors.navBackground,
    zIndex: 1,
    width: '100%',
  },
);

export const fixedContainer = style(
  { paddingTop: theme.space[5] },
);

import { style } from '@vanilla-extract/css';

import { media } from '#components/ui/Ui.css';
import { theme } from '#styles/Theme.css';

export const statList = style({ '@media': { [media.small]: { gap: theme.space[6] } } });

export const statContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  '@media': { [media.small]: { alignItems: 'flex-start' } },
});

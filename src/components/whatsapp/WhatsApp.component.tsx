import React, { SVGAttributes } from 'react';

import { StyledLink } from '#components/globalStyles/Elements.style';
import { sendWpMessage } from '#lib/utils/Whatsapp.util';

import { StyledWhatsApp } from './WhatsApp.style';

function SocialWhatsApp(props: SVGAttributes<SVGElement>) {
  return (
    <span>
      <StyledWhatsApp {...props} />
      {' '}
      <StyledLink style={{ cursor: 'pointer' }} onClick={() => sendWpMessage('Hola Le potet 🍟')}>
        Envíanos un mensaje
      </StyledLink>
    </span>
  );
}

export default SocialWhatsApp;

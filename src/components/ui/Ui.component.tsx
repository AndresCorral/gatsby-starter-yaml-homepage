import { Link as GatsbyLink } from 'gatsby';
import { ImageDataLike } from 'gatsby-plugin-image';
import isAbsoluteURL from 'is-absolute-url';
import * as React from 'react';

import { Radii, SpaceTokens } from '#styles/Theme.css';
import { HomepageLink } from '#types/Link.types';

import * as styles from './Ui.css';

export const cx = (...args: (string | undefined)[]) => args.filter(Boolean).join(' ');

// eslint-disable-next-line @typescript-eslint/ban-types
type WithChildren<T = {}> = T & { children?: React.ReactNode };
export interface BaseProps extends React.HTMLAttributes<HTMLElement> {
  id?: string,
  as?: React.ElementType | React.FC,
  cx?: string[],
  className?: string,
}

export function Base({
  id,
  as: Component = 'div',
  cx: _cx = [],
  className,
  ...props
}: BaseProps) {
  return <Component id={id} className={cx(..._cx, className)} {...props} />;
}

interface ContainerProps extends BaseProps {
  width?: styles.Containers,
}

export function Container({
  width = 'normal',
  ...props
}: WithChildren<ContainerProps>) {
  return <Base cx={[styles.containers[width]]} {...props} />;
}

interface FlexProps extends BaseProps {
  variant?: styles.FlexVariants,
  gap?: SpaceTokens,
  gutter?: SpaceTokens,
  wrap?: boolean,
  responsive?: boolean,
  marginY?: SpaceTokens,
  alignItems?: styles.FlexVariants,
}

export function Flex({
  variant,
  gap = 3,
  gutter,
  wrap,
  responsive,
  marginY,
  alignItems,
  cx: _cx = [],
  ...props
}: WithChildren<FlexProps>) {
  return (
    <Base
      cx={[
        styles.flex,
        variant && styles.flexVariants[variant],
        responsive && styles.flexVariants.responsive,
        wrap && styles.flexVariants.wrap,
        gutter && styles.gutter[gutter],
        gutter ? styles.flexGap[0] : styles.flexGap[gap],
        marginY && styles.marginY[marginY],
        alignItems && styles.flexVariants[alignItems],
        ..._cx,
      ]}
      {...props}
    />
  );
}

interface BoxProps extends BaseProps {
  width?: styles.Widths,
  background?: styles.Backgrounds,
  padding?: SpaceTokens,
  paddingY?: SpaceTokens,
  radius?: Radii,
  center?: boolean,
  order?: 0 | 1 | 2 | 3,
}

export function Box({
  width = 'full',
  background,
  padding,
  paddingY,
  radius,
  center = false,
  order,
  cx: _cx = [],
  ...props
}: WithChildren<BoxProps>) {
  return (
    <Base
      cx={[
        styles.widths[width],
        background && styles.backgrounds[background],
        padding && styles.padding[padding],
        paddingY && styles.paddingY[paddingY],
        radius && styles.radii[radius],
        center && styles.box.center,
        order && styles.order[order],
        ..._cx,
      ]}
      {...props}
    />
  );
}

type FlexListProps = FlexProps;

export function FlexList(props: WithChildren<FlexListProps>) {
  return <Flex as="ul" cx={[styles.list]} {...props} />;
}

export function List(props) {
  return <Base as="ul" cx={[styles.list]} {...props} />;
}

interface SpaceProps extends BaseProps {
  size?: SpaceTokens | 'auto',
}

export function Space({ size = 'auto', ...props }: SpaceProps) {
  return <Base cx={[styles.margin[size]]} {...props} />;
}

interface NudgeProps {
  left?: number,
  right?: number,
  top?: number,
  bottom?: number,
}

export function Nudge({
  left,
  right,
  top,
  bottom,
  ...props
}: WithChildren<NudgeProps>) {
  return (
    <Base
      cx={[
        left && styles.marginLeft[-left],
        right && styles.marginRight[-right],
        top && styles.marginTop[-top],
        bottom && styles.marginBottom[-bottom],
      ]}
      {...props}
    />
  );
}

type SectionProps = BoxProps;

export function Section(props: WithChildren<SectionProps>) {
  return <Box as="section" className={styles.section} {...props} />;
}

interface TextProps extends BaseProps {
  variant?: styles.TextVariants,
  center?: boolean,
  bold?: boolean,
}

export function Text({
  variant = 'body',
  center = false,
  bold = false,
  ...props
}: WithChildren<TextProps>) {
  return (
    <Base
      cx={[
        styles.text[variant],
        center && styles.text.center,
        bold && styles.text.bold,
      ]}
      {...props}
    />
  );
}

export function SuperHeading({ ...props }) {
  return <Text as="h1" variant="superHeading" {...props} />;
}

export function Heading({ ...props }) {
  return <Text as="h2" variant="heading" {...props} />;
}

export function Subhead({ ...props }) {
  return <Text as="h3" variant="subhead" {...props} />;
}

export function Kicker({ ...props }) {
  return <Text variant="kicker" {...props} />;
}

interface LinkProps extends BaseProps {
  to?: string,
  href?: string,
}

export function Link({ to, href, ...props }: WithChildren<LinkProps>) {
  const url = href || to || '';
  if (isAbsoluteURL(url)) {
    return (
      // eslint-disable-next-line jsx-a11y/anchor-has-content
      <a href={url} className={styles.link} {...props} target="_blank" rel="noreferrer" />
    );
  }
  return <GatsbyLink to={url} className={styles.link} {...props} />;
}

export function NavLink({ ...props }: WithChildren<LinkProps>) {
  return <Base as={Link} cx={[styles.navlink]} {...props} />;
}

export function NavButtonLink({ ...props }) {
  return <Base as="button" cx={[styles.navButtonlink]} {...props} />;
}

interface ButtonProps extends BaseProps {
  variant?: styles.ButtonVariants,
  href?: string,
  to?: string,
}

export function Button({
  variant = 'primary',
  ...props
}: WithChildren<ButtonProps>) {
  return <Base as={Link} cx={[styles.buttons[variant]]} {...props} />;
}

interface ButtonListProps extends BaseProps {
  links: HomepageLink[],
  variant?: styles.FlexVariants,
  reversed?: boolean,
}

export function ButtonList({
  links = [],
  reversed = false,
  ...props
}: ButtonListProps) {
  const getVariant = (i): styles.ButtonVariants => {
    if (reversed) {
      return i === 0 ? 'reversed' : 'linkReversed';
    }
    return i === 0 ? 'primary' : 'link';
  };
  return (
    <FlexList marginY={4} {...props}>
      {links
        && links.map((link, i) => (
          <li key={link.id}>
            <Button href={link.href} variant={getVariant(i)}>
              {link.text}
            </Button>
          </li>
        ))}
    </FlexList>
  );
}

export function CTALink(props) {
  return <Base as={Link} cx={[styles.ctaLink]} {...props} />;
}

interface LinkListProps extends BaseProps {
  links: HomepageLink[],
}

export function LinkList({ links = [], ...props }: LinkListProps) {
  return (
    <FlexList {...props}>
      {links
        && links.map((link) => (
          <li key={link.id}>
            <CTALink href={link.href}>{link.text}</CTALink>
          </li>
        ))}
    </FlexList>
  );
}

export function Blockquote(props) {
  return <Base as="blockquote" cx={[styles.blockquote]} {...props} />;
}

export interface AvatarProps {
  alt: string,
  image: ImageDataLike,
}

export function IconLink(props) {
  return <NavLink cx={[styles.iconLink]} {...props} />;
}

export function InteractiveIcon(props) {
  return <Base as="button" cx={[styles.interactiveIcon]} {...props} />;
}

export function VisuallyHidden(props) {
  return <Base as="span" cx={[styles.visuallyHidden]} {...props} />;
}

export function BlockLink(props) {
  return <Link className={styles.blockLink} {...props} />;
}

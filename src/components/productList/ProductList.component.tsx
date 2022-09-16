import * as React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import { Product as ProductProps } from '#types/Product.type';
import { ProductList as productListProps } from '#types/ProductList.type';
import {
  Container,
  Section,
  FlexList,
  Text,
  Kicker,
  Heading,
  Subhead,
  Box,
  LinkList,
} from '#components/ui/Ui.component';
import { parseImages } from '#lib/utils/ImageQuery.util';
import ImageRenderer from '#components/imageRenderer/ImageRenderer.component';
import { icons } from '#components/ui/Ui.css';

const productsQuery = graphql`
  query GetProductsQuery {
    allFile(filter: {relativeDirectory: {eq: "product"}}) {
      nodes {
        name
        childImageSharp {
          gatsbyImageData(
            placeholder: BLURRED
            layout: CONSTRAINED
            quality: 100
          )
        }
      }
    }
  }
`;

function Product(props: ProductProps) {
  const { heading, image, links, text } = props;
  const { allFile: { nodes } } = useStaticQuery(productsQuery);
  const parsedImages = parseImages(nodes);

  const imageProps = { ...image, gatsbyImage: parsedImages[image.name] };

  return (
    <Box center>
      <ImageRenderer
        {...imageProps}
        className={icons.large}
      />
      <Subhead>{heading}</Subhead>
      <Text>{text}</Text>
      <LinkList links={links} />
    </Box>
  );
}

export default function ProductList(props: productListProps) {
  const { products, heading, kicker, text } = props;

  return (
    <Section>
      <Container>
        <Box center paddingY={4}>
          <Heading>
            {kicker && <Kicker>{kicker}</Kicker>}
            {heading}
          </Heading>
          {text && <Text>{text}</Text>}
        </Box>
        <FlexList gap={4} variant="responsive">
          {products.map((product) => (
            <li key={product.id}>
              <Product {...product} />
            </li>
          ))}
        </FlexList>
      </Container>
    </Section>
  );
}

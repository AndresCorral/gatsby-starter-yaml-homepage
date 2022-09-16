import { IGatsbyImageData } from 'gatsby-plugin-image';
import { FileSystemNode } from 'gatsby-source-filesystem';

interface HomeImage extends FileSystemNode {
  childImageSharp: {
    gatsbyImageData: IGatsbyImageData,
  },
}

export function parseImages(nodes : HomeImage[]) {
  return nodes.reduce((map: {[key: string]: HomeImage }, current) => ({ ...map, [current.name]: current }), {});
}

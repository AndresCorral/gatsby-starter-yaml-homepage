/** @type {import('gatsby').GatsbyConfig} */
module.exports = {
  siteMetadata: {
    title: 'gatsby-starter-yaml-homepage',
    siteUrl: 'https://lepotet.com',
  },
  plugins: [
    'gatsby-plugin-sass',
    'gatsby-plugin-styled-components',
    'gatsby-plugin-image',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-vanilla-extract',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: './src/images/',
      },
      __key: 'images',
    },
    {
      resolve: 'gatsby-plugin-alias-imports',
      options: {
        alias: {
          '#components': 'src/components',
          '#contexts': 'src/contexts',
          '#data': 'data',
          '#images': 'src/images',
          '#lib': 'src/lib',
          '#styles': 'src/styles',
          '#types': 'src/types',
          '#views': 'src/views',
        },
        extensions: ['tsx', 'ts', 'jsx', 'js', 'scss', 'png'],
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'gatsby-starter-yaml-homepage',
        short_name: 'gatsby-starter-yaml-homepage',
        theme_color: '#004ca3',
        start_url: '/',
        icon: 'src/images/brand/favicon.png',
        display: 'standalone',
      },
    },
  ],
};

module.exports = {
  siteMetadata: {
    title: `bobaekang`,
    description: `Hello World! I am a Chicago-based social scientist turned software engineer. I built this place to share my experience & reflections on software development.`,
    author: `Bobae Kang`,
    image: `/images/home.png`, 
    url: `https://bobaekang.com`
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-catch-links`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: "markdown-pages",
        path: `${__dirname}/src/blogs`
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-remark-external-links`,
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              showLineNumbers: true
            }
          }
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        icon: `src/images/logo-icon.png`
      },
    },
    {
      resolve: `gatsby-plugin-material-ui`
    }
  ],
}

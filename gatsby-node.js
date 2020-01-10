const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    parseFilepath = s => s.substring(1).split('_')

    const filepath = createFilePath({ node, getNode, basePath: `src/blogs/` })
    const [date, slug] = parseFilepath(filepath)

    createNodeField({ node, name: `date`, value: date })
    createNodeField({ node, name: `slug`, value: `/blog/${slug}` })
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return graphql(`
    {
      allMarkdownRemark (
        sort: {order: ASC, fields: [fields___date]}
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
            }
          }
        }
      }
    }
  `).then(result => {
    const posts =  result.data.allMarkdownRemark.edges
    
    posts.forEach(({ node }, index) => {
      createPage({
        path: node.fields.slug,
        component: path.resolve(`./src/templates/blogPost.js`),
        context: {
          // Data passed to context is available
          // in page queries as GraphQL variables.
          slug: node.fields.slug,
          prev: index === 0 ? null : posts[index - 1].node,
          next: index === (posts.length - 1) ? null : posts[index + 1].node,
        },
      })
    })
  })
}
const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onPreInit = require('./fetchBlogSrc')

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

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPostTemplate = path.resolve('src/templates/blogPost.js')
  const blogTagTemplate = path.resolve('src/templates/blogTags.js')
  const result = await graphql(`
    {
      postsRemark: allMarkdownRemark(
        sort: { order: ASC, fields: [fields___date] }
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
              tags
            }
          }
        }
      }
      tagsGroup: allMarkdownRemark(limit: 2000) {
        group(field: frontmatter___tags) {
          fieldValue
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  const posts = result.data.postsRemark.edges
  posts.forEach(({ node }, index) => {
    createPage({
      path: node.fields.slug,
      component: blogPostTemplate,
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        slug: node.fields.slug,
        prev: index === 0 ? null : posts[index - 1].node,
        next: index === posts.length - 1 ? null : posts[index + 1].node,
      },
    })
  })
  const tags = result.data.tagsGroup.group
  tags.forEach(tag => {
    createPage({
      path: `blog/tags/${tag.fieldValue.replace(' ', '-')}/`,
      component: blogTagTemplate,
      context: {
        tag: tag.fieldValue,
      },
    })
  })
}

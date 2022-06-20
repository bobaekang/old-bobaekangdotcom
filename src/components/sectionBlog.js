import React from 'react'
import { Link, graphql, useStaticQuery } from 'gatsby'
import BlogPreview from '../components/blogPreview'

const SectionBlog = () => {
  const {
    allMarkdownRemark: { edges },
  } = useStaticQuery(
    graphql`
      query {
        allMarkdownRemark(
          limit: 2
          sort: { fields: [fields___date], order: DESC }
        ) {
          edges {
            node {
              id
              frontmatter {
                title
                tags
              }
              fields {
                date(formatString: "DD MMMM, YYYY")
                slug
              }
              excerpt(pruneLength: 100)
            }
          }
        }
      }
    `
  )

  return (
    <div className="my-16">
      <h2 className="text-red">Latest writings</h2>
      {edges.map(({ node }) => (
        <BlogPreview
          key={node.id}
          postNode={node}
          showAll={false}
        ></BlogPreview>
      ))}
      <Link to={'/blog'}>
        <h3 className="mt-10 hover:text-red">Read more...</h3>
      </Link>
    </div>
  )
}

export default SectionBlog

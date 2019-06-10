import React, { useState } from "react"

// components
import Fullpage from '../components/fullpage'
import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => {
  const [section, setSection] = useState(0)

  return (
    <Layout
      fullpageSection={section}
      isBlog={false}
      onSectionChange={setSection}
    >
      <SEO title="Home" />
      <Fullpage onSectionChange={setSection} fullpageSection={section} />
    </Layout>
  )
}

export default IndexPage
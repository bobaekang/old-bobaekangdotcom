import React, { useState } from 'react'

// layout
import Layout from '../components/layout'

// components
import Fullpage from '../components/fullpage'
import SEO from '../components/seo'

const IndexPage = () => {
  const [section, setSection] = useState(0)

  return (
    <Layout
      currentPage={'home'}
      fullpageSection={section}
      onSectionChange={setSection}
    >
      <SEO title="Home" />
      <Fullpage onSectionChange={setSection} fullpageSection={section} />
    </Layout>
  )
}

export default IndexPage

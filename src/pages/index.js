import React, { useState } from 'react'

// layout
import Layout from '../components/layout'

// components
import Fullpage from '../components/fullpage'
import SEO from '../components/seo'

const IndexPage = () => {
  const [fullpageSection, setFullpageSection] = useState(0)

  return (
    <Layout
      currentPage={'index'}
      fullpageSection={fullpageSection}
      setFullpageSection={setFullpageSection}
    >
      <SEO title="Home" />
      <Fullpage
        fullpageSection={fullpageSection}
        setFullpageSection={setFullpageSection}
      />
    </Layout>
  )
}

export default IndexPage

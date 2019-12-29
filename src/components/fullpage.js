import React, { useState } from 'react'

// fullpage
import ReactFullpage from '@fullpage/react-fullpage'

// styles
import '../styles/fullpage.css'

// components
import SectionHome from './sectionHome'
import SectionAbout from './sectionAbout'
import SectionBlog from './sectionBlog'

const Fullpage = ({ fullpageSection, onSectionChange }) => {
  const [api, setApi] = useState({})

  const handleLeave = index => onSectionChange(index)

  if (api && api.moveTo) api.moveTo(fullpageSection + 1)

  return (
    <ReactFullpage
      licenseKey={process.env.GATSBY_FULLPAGE_LICENSE_KEY}
      onLeave={(origin, destination, direction) => {
        handleLeave(destination.index)
      }}
      pluginWrapper={() => {
        require('fullpage.js/vendors/scrolloverflow')
      }}
      scrollOverflow={true}
      scrollOverflowOptions={{
        fadeScrollbars: true,
      }}
      navigation={true}
      navigationTooltips={['home', 'about', 'blog']}
      render={({ state, fullpageApi }) => {
        setApi(fullpageApi)
        return (
          <ReactFullpage.Wrapper>
            <div className="section">
              <SectionHome />
            </div>

            <div
              className="section"
              style={{
                visibility: state.initialized ? '' : 'hidden',
              }}
            >
              <SectionAbout />
            </div>

            <div
              className="section"
              style={{
                visibility: state.initialized ? '' : 'hidden',
              }}
            >
              <SectionBlog />
            </div>
          </ReactFullpage.Wrapper>
        )
      }}
    />
  )
}

export default Fullpage

import React, { useState } from 'react'

// fullpage
import ReactFullpage from '@fullpage/react-fullpage'

// styles
import '../styles/fullpage.css'

// components
import SectionHome from './sectionHome'
import SectionAbout from './sectionAbout'
import SectionBlog from './sectionBlog'

const Fullpage = ({ fullpageSection, setFullpageSection }) => {
  const [api, setApi] = useState({})

  if (api && api.moveTo) api.moveTo(fullpageSection + 1)

  return (
    <ReactFullpage
      licenseKey={process.env.GATSBY_FULLPAGE_LICENSE_KEY}
      onLeave={(origin, destination, direction) =>
        setFullpageSection(destination.index)
      }
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

        const sections = [<SectionHome />, <SectionAbout />, <SectionBlog />]
        const visibility = state.initialized ? '' : 'hidden'

        return (
          <ReactFullpage.Wrapper>
            {sections.map(section => (
              <div className="section" style={{ visibility }}>
                {section}
              </div>
            ))}
          </ReactFullpage.Wrapper>
        )
      }}
    />
  )
}

export default Fullpage

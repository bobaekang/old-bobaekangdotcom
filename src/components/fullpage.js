import React, { useState } from "react"

// fullpage
import ReactFullpage from '@fullpage/react-fullpage'

// material ui
import IconButton from '@material-ui/core/IconButton'
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp'
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown'

// components
import SectionHome from './sectionHome'
import SectionAbout from './sectionAbout'
import SectionBlog from './sectionBlog'

const Fullpage = ({ fullpageSection, onSectionChange }) => {
  const [api, setApi] = useState({})
  const [isTop, setIsTop] = useState(true)
  const [isBottom, setIsBottom] = useState(false)
  
  const handleLeave = index => {
    onSectionChange(index)
    index === 0 ? setIsTop(true) : setIsTop(false)
    index === 2 ? setIsBottom(true) : setIsBottom(false)
  }

  if (api && api.moveTo) api.moveTo(fullpageSection + 1)

  return (
    <>
      {
        !isTop &&
        <IconButton
          aria-label="Arrow up"
          style={{
            position: 'absolute',
            top: '3%',
            left: '50%',
            zIndex: '2'
          }}
          onClick={() => api.moveSectionUp()}
        >
          <KeyboardArrowUp />
        </IconButton>
      }
      
      {
        !isBottom &&
        <IconButton
          aria-label="Arrow down"
          style={{
            position: 'absolute',
            top: '94%',
            left: '50%',
            zIndex: '2'
          }}
          onClick={() => api.moveSectionDown()}
        >
          <KeyboardArrowDown />
        </IconButton>
      }

      <ReactFullpage
        onLeave={(origin, destination, direction) => {
          handleLeave(destination.index)
        }}
        render={({ state, fullpageApi }) => {
          setApi(fullpageApi)
          return (
            <ReactFullpage.Wrapper>
              <div className="section">
                <SectionHome />
              </div>

              <div className="section">                            
                <SectionAbout />
              </div>

              <div className="section">
                <SectionBlog />
              </div>
            </ReactFullpage.Wrapper>
          )
        }}
      />
    </>
  )
}

export default Fullpage
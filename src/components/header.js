import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link, navigate } from 'gatsby'

const Header = ({ currentPage }) => {
  // logo
  const logo = (
    <a
      href="/"
      className="bg-red text-white text-[1.6rem] px-[0.15rem] pb-[0.8rem]"
    >
      bobae kang
    </a>
  )

  // index page
  const [activeSection, setActiveSection] = useState('home')
  const indexSections = ['home', 'about', 'blog']

  const navItemClass = isActive =>
    [
      'float-left list-none pt-[0.1rem] text-[1.2rem] pl-8 hover:text-red hidden sm:inline',
      isActive ? 'text-red' : 'text-blue',
    ].join(' ')
  const navIndex = indexSections.map(s => (
    <a
      className={navItemClass(activeSection === s)}
      key={s}
      href={`#${s}`}
      onClick={() => navigate(`#${s}`)}
    >
      {s}
    </a>
  ))

  useEffect(() => {
    const onScroll = e => {
      indexSections.forEach(s => {
        if (
          document.querySelector(`#${s}`).getBoundingClientRect().top <
          e.target.documentElement.scrollTop
        )
          setActiveSection(s)
      })
    }

    if (currentPage === 'index') window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [currentPage, indexSections])

  // blog page
  const navBlog = (
    <Link to="/blog" className={navItemClass(true)}>
      blog
    </Link>
  )

  return (
    <header className="bg-white font-['Ubuntu'] font-bold h-[2.4rem] fixed w-full z-50">
      <div className="max-w-[960px] mx-auto px-[24px]">
        <div className="flex justify-between">
          <div>
            {(currentPage !== 'index' || activeSection !== 'home') && logo}
          </div>
          <div className="">
            {currentPage === 'index' && navIndex}
            {currentPage === 'blog' && navBlog}
          </div>
        </div>
      </div>
    </header>
  )
}

Header.propTypes = {
  currentPage: PropTypes.string.isRequired,
}

export default Header

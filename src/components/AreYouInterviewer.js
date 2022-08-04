import React, { useEffect, useRef, useState } from 'react'
import { navigate } from 'gatsby'
import '../styles/spotify.css'

const STATUS = {
  /** @type {'PROMPT'} */
  PROMPT: 'PROMPT',
  /** @type {'SPOTIFY'} */
  SPOTIFY: 'SPOTIFY',
  /** @type {'NOT_SPOTIFY'} */
  NOT_SPOTIFY: 'NOT_SPOTIFY',
}

const STATUS_STORAGE_KEY = 'hasUserSeenPrompt'

const AreYouInterviewer = () => {
  const [showModal, setShowModal] = useState(false)
  const [status, setStatus] = useState(STATUS.PROMPT)
  const initialScroll = useRef(true)
  useEffect(() => {
    function showPrompt() {
      if (
        initialScroll.current &&
        !sessionStorage.getItem(STATUS_STORAGE_KEY)
      ) {
        sessionStorage.setItem(STATUS_STORAGE_KEY, true)
        initialScroll.current = false
        const id = setTimeout(() => {
          setStatus(STATUS.PROMPT)
          setShowModal(true)
          clearTimeout(id)
        }, 500)
      }
    }
    document.addEventListener('scroll', showPrompt)
    return () => document.removeEventListener('scroll', showPrompt)
  }, [])
  function handleSpotify() {
    setStatus(STATUS.SPOTIFY)
    setTimeout(() => {
      navigate('spotify')
    }, 1500)
  }
  function handleNotSpotify() {
    setStatus(STATUS.NOT_SPOTIFY)
    setTimeout(() => {
      setShowModal(false)
    }, 1200)
  }
  return (
    <div className="relative z-50">
      {showModal && (
        <div className="fixed min-h-screen w-full top-0 bg-[#000d] text-white font-spotify font-normal fade-in">
          <div className="flex flex-col min-h-screen w-full justify-center items-center text-center px-4">
            {status === STATUS.PROMPT ? (
              <>
                <h1 className="text-xl">
                  🤫<span className="psst inline-block">Psst!</span> Are you an
                  interviewer from{' '}
                  <img
                    className="h-[1.25em] inline mx-1 my-2"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Spotify_logo_with_text.svg/559px-Spotify_logo_with_text.svg.png"
                  ></img>
                  ?
                </h1>
                <section className="">
                  <button
                    className="px-4 py-2 mx-2 rounded-full bg-white text-[#000] transition ease-in-out delay-150 bg-blue-500 hover:bg-spotify duration-150"
                    onClick={handleSpotify}
                  >
                    I am!
                  </button>
                  <button
                    className="px-4 py-2 mx-2 rounded-full transition ease-in-out delay-150 bg-blue-500 hover:text-[#fff9] duration-150"
                    onClick={handleNotSpotify}
                  >
                    Spotify who?
                  </button>
                </section>
              </>
            ) : status === STATUS.SPOTIFY ? (
              <h1 className="text-xl">
                Awesome! Let me take you to a secret page... 👨‍💻
              </h1>
            ) : status === STATUS.NOT_SPOTIFY ? (
              <h1 className="text-xl">Never mind! Thanks for visiting 🤗</h1>
            ) : null}
          </div>
        </div>
      )}
    </div>
  )
}

export default AreYouInterviewer

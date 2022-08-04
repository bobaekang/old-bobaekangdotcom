import { Link } from 'gatsby'
import React, { useEffect, useState } from 'react'
import SEO from '../components/seo'
import '../styles/spotify.css'

const meetings = [
  {
    name: 'web domain',
    interviewers: ['Mithun', 'Sean'],
    time: new Date('2022-08-08T10:30-04:00'),
  },
  {
    name: 'programming',
    interviewers: ['Calvin'],
    time: new Date('2022-08-08T11:30-04:00'),
  },
  {
    name: 'system design',
    interviewers: ['Josh', 'Jason'],
    time: new Date('2022-08-08T13:30-04:00'),
  },
  {
    name: 'values',
    interviewers: ['Marlena'],
    time: new Date('2022-08-08T14:30-04:00'),
  },
]

/**
 * @param {Date} meetingTime
 * @param {Date} currentTime
 */
function getTimeDiffs(meetingTime, currentTime) {
  // units
  const second = 1000
  const minute = 60 * second
  const hour = 60 * minute
  const day = 24 * hour

  const diff = meetingTime.getTime() - currentTime.getTime()

  // diff in units
  const days = Math.floor(diff / day)
  const hours = Math.floor((diff - days * day) / hour)
  const minutes = Math.floor((diff - days * day - hours * hour) / minute)
  const seconds = Math.floor(
    (diff - days * day - hours * hour - minutes * minute) / second
  )

  return { days, hours, minutes, seconds }
}

const SpotifyPage = () => {
  const [currentTime, setCurrentTime] = useState(new Date())
  useEffect(() => {
    const id = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const [meeting, setMeeting] = useState(meetings[0])
  const timeDiff = getTimeDiffs(meeting.time, currentTime)

  return (
    <main className="bg-[#000] min-h-screen font-spotify text-white flex items-center">
      <SEO title="Spotify" />
      <div className="min-h-full max-w-[960px] mx-auto px-[24px] fade-in">
        <section className="py-6">
          <div className="text-4xl md:text-5xl wave-hand inline-block">👋</div>
          <h1 className="text-3xl md:text-5xl font-spotify tracking-tighter font-black">
            Hello interviewer from{' '}
            <img
              className="h-[1.2em] md:h-[1em] inline mx-0 mb-2"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Spotify_logo_with_text.svg/559px-Spotify_logo_with_text.svg.png"
            ></img>
            !
            <br />
            Thanks for finding me.
          </h1>
          <p className="max-w-md">
            My name is Bobae, and I love building on web, making data useful,
            and crafting enjoyable user experiences.
          </p>
        </section>
        <section className="font-spotify py-6">
          <p className="font-bold">{meeting.interviewers.join(' and ')},</p>
          <label className="text-3xl font-spotify tracking-tighter">
            I look forward to chatting with you about{' '}
            <select
              className="text-spotify capitalize tracking-tighter font-bold border-b border-spotify bg-[#000]"
              defaultValue={meeting}
              onClick={e => setMeeting(meetings[e.target.value])}
            >
              {meetings.map((m, i) => (
                <option key={m.name} className="font-light text-sm" value={i}>
                  {m.name}
                </option>
              ))}
            </select>
          </label>
          <p className="my-2">
            in {timeDiff.days} days {timeDiff.hours} hours {timeDiff.minutes}{' '}
            minutes {timeDiff.seconds} seconds from now!
          </p>
        </section>
        <Link
          className="inline-block px-4 py-2 my-6 rounded-full bg-white text-[#000] transition ease-in-out delay-150 bg-blue-500 hover:bg-spotify duration-150"
          to="/"
        >
          Back to homepage
        </Link>
      </div>
    </main>
  )
}

export default SpotifyPage

const fetch = require('node-fetch')
const fs = require('fs')
const path = require('path')
const { pipeline } = require('stream')
const { promisify } = require('util')

require('dotenv').config()

function fetchFromGitHub(url) {
  return fetch(url, {
    headers: { Authorization: `token ${process.env.GITHUB_TOKEN}` },
  })
    .then(res => {
      if (res.ok) return res
      throw new Error(`Failed to fetch from ${url} with status ${res.status}`)
    })
    .catch(e => {
      console.error('fetchFromGitHub', e)
      throw e
    })
}

function writeFromGithub(url, filename) {
  return fetchFromGitHub(url)
    .then(res => promisify(pipeline)(res.body, fs.createWriteStream(filename)))
    .catch(e => {
      console.error('writeFromGithub', e)
      throw e
    })
}

function writeFilesFromGitHub(url, dirname = '') {
  if (dirname !== '' && !fs.existsSync(path.join(__dirname, dirname)))
    fs.mkdirSync(path.join(__dirname, dirname), { recursive: true })

  return fetchFromGitHub(url)
    .then(res => res.json())
    .then(files =>
      Promise.all(
        files.map(({ download_url: url, name }) =>
          writeFromGithub(url, path.join(__dirname, dirname, name))
        )
      )
    )
    .catch(e => {
      console.error('writeFromGitHub', e)
      throw e
    })
}

module.exports = async function() {
  console.log('Fetch blog source files...')
  try {
    const postsSrcUrl = `${process.env.BLOG_SRC_URL}/posts`
    const postsPath = '/src/blogs'
    await writeFilesFromGitHub(postsSrcUrl, postsPath)

    const imagesSrcUrl = `${process.env.BLOG_SRC_URL}/assets/images`
    const imagesPath = '/static/images/blog'
    await writeFilesFromGitHub(imagesSrcUrl, imagesPath)
  } catch (e) {
    console.error('fetchBlogSrc', e)
    process.exit(1)
  }
}

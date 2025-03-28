import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'

export default function Home() {
  const [markdown, setMarkdown] = useState('Loading...')

  useEffect(() => {
    fetch('/HomePageContent.md')
      .then((res) => res.text())
      .then(setMarkdown)
  }, [])

  return (
    <div style={{ maxWidth: '800px' }}>
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </div>
  )
}

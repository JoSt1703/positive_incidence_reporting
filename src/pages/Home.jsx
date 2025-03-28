import { Typography, Box } from '@mui/material'
import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'

export default function Home() {
  const [content, setContent] = useState('')

  useEffect(() => {
    fetch('/HomePageContent.md')
      .then((res) => res.text())
      .then(setContent)
  }, [])

  return (
    <Box sx={{ textAlign: 'justify' }}>
      <Typography variant="h4" gutterBottom>
        Positive Incidence Reporting
      </Typography>

      <ReactMarkdown>{content}</ReactMarkdown>
    </Box>
  )
}

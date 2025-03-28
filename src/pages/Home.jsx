import { Box, Typography } from '@mui/material'
import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'

export default function Home() {
  const [content, setContent] = useState('')

  useEffect(() => {
    fetch('/HomePageContent.md')
      .then((res) => res.text())
      .then(setContent)
  }, [])

  return (
    <Box sx={{ maxWidth: '800px', mx: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Positive Incidence Reporting
      </Typography>
      <ReactMarkdown>{content}</ReactMarkdown>
    </Box>
  )
}

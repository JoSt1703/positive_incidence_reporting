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
    <Box
      sx={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '2rem',
        textAlign: 'justify',
      }}
    >
      <Typography variant="h4" gutterBottom>
        Positive Incidence Reporting
      </Typography>

      <ReactMarkdown
        components={{
          p: ({ node, ...props }) => (
            <Typography
              variant="body1"
              paragraph
              sx={{ textAlign: 'justify' }}
              {...props}
            />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </Box>
  )
}

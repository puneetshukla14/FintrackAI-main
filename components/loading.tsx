'use client'

import React, { useState, useEffect } from 'react'

const Loading = () => {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  if (!show) return null

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'black',
        overflow: 'hidden',
        padding: '0 5vw', // ✅ Padding to prevent overflow
        zIndex: 9999,
      }}
    >
      <h1
        style={{
          fontFamily: "'Oswald', sans-serif",
          fontSize: '9vw', // ✅ Responsive font
          fontWeight: 600,
          letterSpacing: '0.1em',
          textAlign: 'center',
          background: 'linear-gradient(to right, rgb(0, 255, 255), rgb(53, 53, 240))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          animation: 'netflix_style 4.5s ease-out',
          whiteSpace: 'normal', // ✅ allow wrapping on small screens
          wordBreak: 'break-word', // ✅ prevents cut-off
          lineHeight: '1.1',
        }}
      >
        FINTRACK V.7.0.25
      </h1>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;600&display=swap');

        @keyframes netflix_style {
          0% {
            text-shadow: 0px 0px transparent, 100px 100px #aaa;
            transform: scale(1.5);
            color: #f3f3f3;
          }
          10% {
            text-shadow: 1.5px 1.5px #aaa;
          }
          20% {
            color: #e90418;
            text-shadow: none;
            transform: scale(1.1);
          }
          80% {
            opacity: 0;
            transform: scale(0.85);
          }
          100% {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}

export default Loading

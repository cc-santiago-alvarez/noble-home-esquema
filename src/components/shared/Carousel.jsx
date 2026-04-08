import React, { useState, useRef } from 'react'

export default function Carousel({ children }) {
  const [activePage, setActivePage] = useState(0)
  const touchStart = useRef(0)
  const pages = React.Children.toArray(children)

  const onTouchStart = (e) => {
    touchStart.current = e.touches[0].clientX
  }

  const onTouchEnd = (e) => {
    const delta = touchStart.current - e.changedTouches[0].clientX
    if (delta > 50 && activePage < pages.length - 1) setActivePage(p => p + 1)
    if (delta < -50 && activePage > 0) setActivePage(p => p - 1)
  }

  return (
    <div className="carousel">
      <div
        className="carousel-viewport"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="carousel-track"
          style={{ transform: `translateX(-${activePage * 100}%)` }}
        >
          {pages.map((page, i) => (
            <div className="carousel-page" key={i}>
              {page}
            </div>
          ))}
        </div>
      </div>
      {pages.length > 1 && (
        <div className="carousel-dots">
          {pages.map((_, i) => (
            <button
              key={i}
              className={`carousel-dot ${i === activePage ? 'active' : ''}`}
              onClick={() => setActivePage(i)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

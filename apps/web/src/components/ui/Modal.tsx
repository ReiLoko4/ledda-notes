import React, { useEffect, useState } from 'react'
import { X } from 'lucide-react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children
}) => {
  const [isAnimating, setIsAnimating] = useState(false)
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose()
      }
    }

    if (isOpen) {
      setShouldRender(true)
      setTimeout(() => setIsAnimating(true), 10)
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    } else if (shouldRender) {
      setIsAnimating(false)
      setTimeout(() => setShouldRender(false), 200)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, shouldRender])

  const handleClose = () => {
    setIsAnimating(false)
    setTimeout(() => {
      onClose()
      setShouldRender(false)
    }, 150)
  }

  if (!shouldRender) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={handleClose}
    >
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 z-40 bg-background/20  transition-all duration-200 ${
          isAnimating ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          backdropFilter: isAnimating ? 'blur(4px)' : 'blur(0px)',
        }}
      />
      
      {/* Modal Content */}
      <div 
        className={`relative z-50 w-full max-w-2xl mx-4 backdrop-blur-xl text-card-foreground p-8 shadow-2xl rounded-2xl border border-border/50 transition-all duration-200 ${
          isAnimating 
            ? 'opacity-100 scale-100 translate-y-0' 
            : 'opacity-0 scale-95 translate-y-4'
        }`}
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: document.documentElement.getAttribute('data-theme') === 'dark' 
            ? 'rgba(26, 35, 50, 0.6)' 
            : 'rgba(255, 255, 255, 0.6)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.05)',
        }}
      >
        <button
          onClick={handleClose}
          className="absolute flex items-center right-4 top-4 rounded-sm p-1 opacity-70 ring-offset-background transition-all duration-200 hover:opacity-100 hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none text-muted-foreground hover:text-foreground z-10"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
        
        <div className="flex flex-col space-y-2 text-center sm:text-left pr-12 mb-6">
          <h2 id="modal-title" className="text-xl font-semibold leading-none tracking-tight text-card-foreground">
            {title}
          </h2>
        </div>
        <div className="space-y-6">
          {children}
        </div>
      </div>
    </div>
  )
}

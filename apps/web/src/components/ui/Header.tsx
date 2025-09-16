import React from 'react'
import { ThemeToggle } from './ThemeToggle'
import { Button } from './Button'
import { Plus } from 'lucide-react'

interface HeaderProps {
  onCreateNote: () => void
}

export const Header: React.FC<HeaderProps> = ({ onCreateNote }) => {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary-hover flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-full opacity-90"></div>
          </div>
          <span className="text-xl font-semibold text-foreground">Mini Notes</span>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-3">
          <ThemeToggle />
          <Button onClick={onCreateNote} className="shadow-sm">
            <Plus className="h-4 w-4 mr-2" />
            Nova Nota
          </Button>
        </div>
      </div>
    </header>
  )
}

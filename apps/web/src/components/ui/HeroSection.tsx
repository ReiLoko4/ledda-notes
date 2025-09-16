import React from 'react'
import { Button } from './Button'
import { Plus, FileText } from 'lucide-react'

interface HeroSectionProps {
  notesCount: number
  onCreateNote: () => void
}

export const HeroSection: React.FC<HeroSectionProps> = ({ notesCount, onCreateNote }) => {
  return (
    <section className="relative py-20 px-4 text-center bg-gradient-to-b from-muted/30 to-background">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-gradient-to-tr from-secondary/10 to-primary/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative max-w-4xl mx-auto">
        {/* Logo/Icon */}
        <div className="w-16 h-16 mx-auto mb-8 bg-gradient-to-br from-primary to-primary-hover rounded-2xl flex items-center justify-center shadow-lg">
          <FileText className="w-8 h-8 text-white" />
        </div>

        {/* Main heading */}
        <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
          Organize Ideias,
          <br />
          <span className="text-primary">Não Bugs.</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
          Capture e organize suas ideias de forma simples e elegante. 
          Suas notas, sempre acessíveis, sempre organizadas.
        </p>

        {/* Stats */}
        <div className="flex items-center justify-center gap-8 mb-10 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <span>{notesCount} {notesCount === 1 ? 'nota salva' : 'notas salvas'}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-success rounded-full"></div>
            <span>Sempre sincronizado</span>
          </div>
        </div>

        {/* CTA Button */}
        <Button 
          onClick={onCreateNote}
          size="lg"
          className="shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
        >
          <Plus className="h-5 w-5 mr-2" />
          Criar Primeira Nota
        </Button>
      </div>
    </section>
  )
}

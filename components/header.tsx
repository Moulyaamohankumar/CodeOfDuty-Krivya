"use client"

import { Button } from "@/components/ui/button"
import { Menu, Settings, HelpCircle } from "lucide-react"

interface HeaderProps {
  onMenuClick: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={onMenuClick} className="lg:hidden">
            <Menu className="h-5 w-5" />
          </Button>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">TA</span>
            </div>
            <h2 className="text-xl font-semibold">TextAnalyzer</h2>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <HelpCircle className="h-4 w-4" />
            <span className="hidden sm:inline ml-2">Help</span>
          </Button>
          <Button variant="ghost" size="sm">
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline ml-2">Settings</span>
          </Button>
        </div>
      </div>
    </header>
  )
}

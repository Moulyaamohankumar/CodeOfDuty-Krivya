"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X, History, Settings, Info, Zap } from "lucide-react"

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  if (!isOpen) return null

  return (
    <>
      {/* Overlay for mobile */}
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden" onClick={onClose} />

      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-80 bg-sidebar border-r z-50 lg:relative lg:z-auto">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-semibold">Options</h3>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-4 space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Zap className="h-4 w-4" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                <History className="h-4 w-4 mr-2" />
                View History
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                <Settings className="h-4 w-4 mr-2" />
                Preferences
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Info className="h-4 w-4" />
                About Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-fact-based rounded-full"></div>
                  <span>Fact-based content includes verifiable information, statistics, and objective statements.</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-emotion-based rounded-full"></div>
                  <span>Emotion-based content includes opinions, feelings, and subjective expressions.</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </aside>
    </>
  )
}

"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Zap, FileText } from "lucide-react"

interface TextInputProps {
  onAnalyze: (text: string) => void
  isAnalyzing: boolean
}

export function TextInput({ onAnalyze, isAnalyzing }: TextInputProps) {
  const [text, setText] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (text.trim() && !isAnalyzing) {
      onAnalyze(text.trim())
    }
  }

  const handlePasteFromClipboard = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText()
      setText(clipboardText)
    } catch (err) {
      console.error("Failed to read clipboard:", err)
    }
  }

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          Enter Text for Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Textarea
              placeholder="Paste or type the text you want to analyze here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="min-h-32 resize-none focus:ring-2 focus:ring-primary/20"
              disabled={isAnalyzing}
            />
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>{text.length} characters</span>
              <Button type="button" variant="ghost" size="sm" onClick={handlePasteFromClipboard} disabled={isAnalyzing}>
                Paste from clipboard
              </Button>
            </div>
          </div>

          <div className="flex gap-3">
            <Button type="submit" disabled={!text.trim() || isAnalyzing} className="flex-1 sm:flex-none">
              {isAnalyzing ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Zap className="h-4 w-4 mr-2" />
                  Analyze Text
                </>
              )}
            </Button>

            <Button type="button" variant="outline" onClick={() => setText("")} disabled={isAnalyzing}>
              Clear
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Brain, Heart, Loader2 } from "lucide-react"

interface AnalysisResult {
  id: number
  type: "fact" | "emotion"
  content: string
  confidence: number
  source: string
}

interface AnalysisResultsProps {
  results: AnalysisResult[]
  isLoading: boolean
  originalText: string
}

export function AnalysisResults({ results, isLoading, originalText }: AnalysisResultsProps) {
  if (isLoading) {
    return (
      <Card className="shadow-sm">
        <CardContent className="py-12">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <div className="text-center space-y-2">
              <h3 className="font-semibold">Analyzing your text...</h3>
              <p className="text-sm text-muted-foreground">Processing content for facts and emotions</p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const factResults = results.filter((r) => r.type === "fact")
  const emotionResults = results.filter((r) => r.type === "emotion")

  return (
    <div className="space-y-6">
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Analysis Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-fact-based" />
                <span className="font-medium">Fact-based Content</span>
                <Badge className="fact-badge">{factResults.length}</Badge>
              </div>
              <div className="space-y-2">
                {factResults.map((result) => (
                  <div key={result.id} className="text-sm">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-muted-foreground">Confidence</span>
                      <span className="font-medium">{Math.round(result.confidence * 100)}%</span>
                    </div>
                    <Progress value={result.confidence * 100} className="h-2" />
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-emotion-based" />
                <span className="font-medium">Emotion-based Content</span>
                <Badge className="emotion-badge">{emotionResults.length}</Badge>
              </div>
              <div className="space-y-2">
                {emotionResults.map((result) => (
                  <div key={result.id} className="text-sm">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-muted-foreground">Confidence</span>
                      <span className="font-medium">{Math.round(result.confidence * 100)}%</span>
                    </div>
                    <Progress value={result.confidence * 100} className="h-2" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {results.map((result) => (
          <Card
            key={result.id}
            className={`shadow-sm ${result.type === "fact" ? "analysis-card-fact" : "analysis-card-emotion"}`}
          >
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  {result.type === "fact" ? (
                    <Brain className="h-5 w-5 text-fact-based" />
                  ) : (
                    <Heart className="h-5 w-5 text-emotion-based" />
                  )}
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge className={result.type === "fact" ? "fact-badge" : "emotion-badge"}>
                      {result.type === "fact" ? "Fact-based" : "Emotion-based"}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {Math.round(result.confidence * 100)}% confidence
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed">{result.content}</p>
                  <div className="text-xs text-muted-foreground bg-muted/50 p-2 rounded">
                    <strong>Source:</strong> "{result.source}"
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

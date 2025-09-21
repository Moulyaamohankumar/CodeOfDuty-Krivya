"use client"
import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Navigation } from "@/components/navigation"
import { analyzeText, type AnalysisResult } from "@/lib/analysis-engine"
import {
  Brain,
  CheckCircle,
  AlertCircle,
  HelpCircle,
  TrendingUp,
  Heart,
  Tag,
  ExternalLink,
  Newspaper,
  Search,
  Shield,
} from "lucide-react"

export default function ResultsPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [selectedText, setSelectedText] = useState("")
  const [results, setResults] = useState<AnalysisResult[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const text = searchParams.get("text") || ""
    setSelectedText(text)

    if (text) {
      setTimeout(() => {
        analyzeText(text).then((analysisResults) => {
          setResults(analysisResults)
          setIsLoading(false)
        })
      }, 1500)
    } else {
      setIsLoading(false)
    }
  }, [searchParams])

  const getVerdictIcon = (verdict?: string) => {
    switch (verdict) {
      case "true":
        return <CheckCircle className="w-5 h-5 text-fact-based" />
      case "false":
        return <AlertCircle className="w-5 h-5 text-destructive" />
      case "unsure":
        return <HelpCircle className="w-5 h-5 text-emotion-based" />
      default:
        return null
    }
  }

  const getVerdictColor = (verdict?: string) => {
    switch (verdict) {
      case "true":
        return "text-fact-based bg-fact-based-light border-fact-based/30"
      case "false":
        return "text-destructive bg-destructive/10 border-destructive/30"
      case "unsure":
        return "text-emotion-based bg-emotion-based-light border-emotion-based/30"
      default:
        return ""
    }
  }

  const getSentimentColor = (sentiment?: string) => {
    switch (sentiment) {
      case "positive":
        return "text-accent-green bg-accent-green/10 border-accent-green/30"
      case "negative":
        return "text-destructive bg-destructive/10 border-destructive/30"
      case "neutral":
        return "text-muted-foreground bg-muted border-border"
      default:
        return ""
    }
  }

  const handleAnalyzeMore = () => {
    router.push("/extension")
  }

  const handleShareResults = () => {
    if (navigator.share) {
      navigator.share({
        title: "Ask Krivya Analysis Results",
        text: `Analysis results for: "${selectedText.substring(0, 100)}..."`,
        url: window.location.href,
      })
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href).then(() => {
        // You could add a toast notification here
        alert("Results link copied to clipboard!")
      })
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen relative news-background">
        <div className="floating-news-element">
          <Newspaper className="w-8 h-8 text-primary/20" />
        </div>
        <div className="floating-news-element">
          <Search className="w-6 h-6 text-accent/20" />
        </div>
        <div className="floating-news-element">
          <Shield className="w-5 h-5 text-fact-based/20" />
        </div>

        <Navigation />
        <div className="flex items-center justify-center min-h-[80vh]">
          <Card className="p-8 professional-card text-center fade-in">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto pulse-glow">
                <Brain className="w-8 h-8 text-white animate-pulse" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Analyzing News Content...</h3>
              <p className="text-muted-foreground">Processing through Google Cloud AI models</p>
              <div className="space-y-2">
                <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  <span>DISTIL-BERT Classification</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                  <div
                    className="w-2 h-2 bg-accent rounded-full animate-pulse"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <span>Misinformation Detection</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                  <div
                    className="w-2 h-2 bg-fact-based rounded-full animate-pulse"
                    style={{ animationDelay: "0.4s" }}
                  ></div>
                  <span>Generating Results</span>
                </div>
              </div>
              <div className="text-xs text-muted-foreground mt-4">Powered by Google Cloud Gateway API & Storage</div>
            </div>
          </Card>
        </div>
      </div>
    )
  }

  if (!selectedText) {
    return (
      <div className="min-h-screen relative news-background">
        <div className="floating-news-element">
          <Newspaper className="w-8 h-8 text-primary/20" />
        </div>
        <div className="floating-news-element">
          <Search className="w-6 h-6 text-accent/20" />
        </div>

        <Navigation />
        <div className="flex items-center justify-center min-h-[80vh]">
          <Card className="p-8 professional-card text-center">
            <div className="space-y-4">
              <Brain className="w-16 h-16 text-muted-foreground mx-auto" />
              <h3 className="text-xl font-semibold text-foreground">No Text to Analyze</h3>
              <p className="text-muted-foreground">Please select some news content to analyze first.</p>
              <Link href="/extension">
                <Button className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white">
                  Go to Extension Demo
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative news-background">
      <div className="floating-news-element">
        <Newspaper className="w-8 h-8 text-primary/20" />
      </div>
      <div className="floating-news-element">
        <Search className="w-6 h-6 text-accent/20" />
      </div>
      <div className="floating-news-element">
        <TrendingUp className="w-7 h-7 text-fact-based/20" />
      </div>
      <div className="floating-news-element">
        <Shield className="w-5 h-5 text-primary/15" />
      </div>

      <Navigation />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          <Card className="p-6 professional-card fade-in breaking-news-card">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Newspaper className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-semibold text-foreground">Analyzed Content</h2>
              </div>
              <div className="p-4 bg-muted/20 rounded border-l-2 border-l-primary">
                <p className="text-foreground leading-relaxed">{selectedText}</p>
              </div>
            </div>
          </Card>

          <div className="grid lg:grid-cols-2 gap-6">
            {results.map((result, index) => (
              <Card
                key={result.id}
                className={`p-6 professional-card fade-in news-card-hover ${
                  result.type === "fact"
                    ? "fact-check-card border-l-4 border-l-fact-based"
                    : "misinformation-warning border-l-4 border-l-emotion-based"
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-10 h-10 rounded flex items-center justify-center ${
                          result.type === "fact" ? "bg-fact-based text-white" : "bg-emotion-based text-white"
                        }`}
                      >
                        {result.type === "fact" ? <TrendingUp className="w-5 h-5" /> : <Heart className="w-5 h-5" />}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">{result.classification}</h3>
                        <p className="text-sm text-muted-foreground">{result.model}</p>
                      </div>
                    </div>
                    <Badge className={result.type === "fact" ? "fact-badge" : "emotion-badge"}>
                      {result.type === "fact" ? "FACT-CHECK" : "OPINION"}
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground">Confidence</span>
                      <span className="text-sm font-bold text-foreground">{result.confidence}%</span>
                    </div>
                    <Progress
                      value={result.confidence}
                      className={`h-2 ${result.type === "fact" ? "[&>div]:bg-fact-based" : "[&>div]:bg-emotion-based"}`}
                    />
                  </div>

                  {/* Verdict for factual content */}
                  {result.verdict && (
                    <div className={`p-4 rounded border ${getVerdictColor(result.verdict)}`}>
                      <div className="flex items-center space-x-2">
                        {getVerdictIcon(result.verdict)}
                        <span className="font-semibold capitalize">
                          {result.verdict === "unsure" ? "Uncertain" : result.verdict}
                        </span>
                      </div>
                      <p className="text-sm mt-2 opacity-90">
                        {result.verdict === "true" && "Information appears to be accurate based on available data."}
                        {result.verdict === "false" && "Information may be inaccurate or misleading."}
                        {result.verdict === "unsure" &&
                          "Unable to verify with high confidence. Further research needed."}
                      </p>
                    </div>
                  )}

                  {/* Sentiment for emotional content */}
                  {result.sentiment && (
                    <div className={`p-4 rounded border ${getSentimentColor(result.sentiment)}`}>
                      <div className="flex items-center space-x-2">
                        <Heart className="w-4 h-4" />
                        <span className="font-semibold capitalize">{result.sentiment} Sentiment</span>
                      </div>
                      <p className="text-sm mt-2 opacity-90">
                        The emotional tone of this text is predominantly {result.sentiment}.
                      </p>
                    </div>
                  )}

                  <div className="space-y-3">
                    <h4 className="font-medium text-foreground">Analysis</h4>
                    <p className="text-muted-foreground leading-relaxed">{result.content}</p>
                  </div>

                  {result.source && (
                    <div className="space-y-3">
                      <h4 className="font-medium flex items-center space-x-2 text-foreground">
                        <ExternalLink className="w-4 h-4" />
                        <span>Source</span>
                      </h4>
                      <div className="p-3 bg-muted/10 rounded border border-border">
                        <a
                          href={result.source.split(" - ")[1]}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="source-link flex items-center space-x-2 text-primary hover:text-primary/80"
                        >
                          <span>{result.source.split(" - ")[0]}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  )}

                  {/* Entities or Claims */}
                  {result.entities && result.entities.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="font-medium flex items-center space-x-2 text-foreground">
                        <Tag className="w-4 h-4" />
                        <span>Emotional Entities</span>
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {result.entities.map((entity, index) => (
                          <Badge key={index} variant="outline" className="text-xs bg-muted/20">
                            {entity}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {result.factualClaims && result.factualClaims.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="font-medium flex items-center space-x-2 text-foreground">
                        <TrendingUp className="w-4 h-4" />
                        <span>Factual Claims</span>
                      </h4>
                      <div className="space-y-2">
                        {result.factualClaims.map((claim, index) => (
                          <div key={index} className="text-xs bg-muted/20 p-2 rounded border border-border">
                            {claim}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="space-y-3">
                    <h4 className="font-medium text-foreground">Technical Details</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{result.details}</p>
                    <div className="text-xs text-muted-foreground bg-muted/10 p-2 rounded">
                      Processed via Google Cloud Gateway API with secure storage
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={handleAnalyzeMore}
              size="lg"
              className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white px-8 transition-all duration-200 hover:scale-105 breaking-news-card"
            >
              Analyze More Text
            </Button>
            <Button
              onClick={handleShareResults}
              size="lg"
              variant="outline"
              className="professional-card px-8 bg-transparent transition-all duration-200 hover:scale-105"
            >
              Share Results
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

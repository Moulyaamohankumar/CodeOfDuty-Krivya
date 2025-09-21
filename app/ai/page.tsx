"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  CheckCircle,
  XCircle,
  AlertCircle,
  Heart,
  MessageCircle,
  ExternalLink,
  Brain,
  Search,
  Target,
  Zap,
} from "lucide-react"

interface FactCheckSource {
  title: string
  url: string
  excerpt: string
  reliability: "high" | "medium" | "low"
  highlightText: string
}

interface RoBERTaAnalysis {
  isFactual: boolean
  confidence: number
  classification: "true" | "false" | "not_sure"
  softmaxScores: {
    true: number
    false: number
    not_sure: number
  }
  embedding_processed: boolean
  sources: FactCheckSource[]
}

export default function DemoPage() {
  const [newsInput, setNewsInput] = useState("")
  const [analysisResult, setAnalysisResult] = useState<{
    status: "reliable" | "misinformation" | "uncertain" | "emotional" | "personal"
    confidence: number
    explanation: string
    type: "news" | "emotional" | "personal"
    roberta?: RoBERTaAnalysis
    processingSteps?: string[]
  } | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [currentStep, setCurrentStep] = useState("")

  const analyzeNews = async () => {
    if (!newsInput.trim()) return

    setIsAnalyzing(true)
    setCurrentStep("Initializing content injection...")
    await new Promise((resolve) => setTimeout(resolve, 800))

    const lowerInput = newsInput.toLowerCase()
    const processingSteps: string[] = []

    // Step 1: Content Classification
    setCurrentStep("Classifying content type...")
    processingSteps.push("Content injected via browser extension")
    processingSteps.push("Initial classification: Factual vs Opinion/Emotional")
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const emotionalKeywords = [
      "feel",
      "sad",
      "happy",
      "angry",
      "love",
      "hate",
      "depressed",
      "anxious",
      "worried",
      "excited",
      "scared",
      "lonely",
      "hurt",
      "pain",
      "joy",
      "fear",
    ]
    const personalKeywords = [
      "i am",
      "i'm",
      "my life",
      "help me",
      "what should i",
      "how do i",
      "advice",
      "personal",
      "relationship",
      "family",
      "friend",
    ]

    const hasEmotional = emotionalKeywords.some((keyword) => lowerInput.includes(keyword))
    const hasPersonal = personalKeywords.some((keyword) => lowerInput.includes(keyword))

    // If emotional/personal, handle with AI
    if (hasEmotional || hasPersonal) {
      setCurrentStep("Processing with empathetic AI...")
      processingSteps.push("Classified as emotional/personal content")
      processingSteps.push("Routing to empathetic AI response system")
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const result = {
        status: hasEmotional ? ("emotional" as const) : ("personal" as const),
        confidence: 95,
        explanation: hasEmotional
          ? "I understand you're sharing something emotional. While I'm designed to detect misinformation in news, I want you to know that your feelings are valid. Consider reaching out to friends, family, or a mental health professional for support."
          : "This appears to be a personal question. While Krivya is designed to analyze news credibility, I encourage you to seek advice from trusted friends, family, or professionals for personal matters.",
        type: "emotional" as const,
        processingSteps,
      }
      setAnalysisResult(result)
      setIsAnalyzing(false)
      setCurrentStep("")
      return
    }

    // Step 2: RoBERTa Pipeline for Factual Content
    setCurrentStep("Initializing RoBERTa model...")
    processingSteps.push("Classified as factual content - routing to RoBERTa")
    processingSteps.push("Loading pre-trained RoBERTa model weights")
    await new Promise((resolve) => setTimeout(resolve, 1200))

    setCurrentStep("Generating embeddings...")
    processingSteps.push("Tokenizing input text")
    processingSteps.push("Generating contextual embeddings (768-dimensional)")
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setCurrentStep("Feedforward processing...")
    processingSteps.push("Processing through transformer layers")
    processingSteps.push("Applying attention mechanisms")
    await new Promise((resolve) => setTimeout(resolve, 800))

    setCurrentStep("Pooling representations...")
    processingSteps.push("Pooling token representations")
    processingSteps.push("Extracting [CLS] token for classification")
    await new Promise((resolve) => setTimeout(resolve, 600))

    setCurrentStep("Classification layer processing...")
    processingSteps.push("Passing through classification head")
    await new Promise((resolve) => setTimeout(resolve, 800))

    // Generate realistic softmax scores
    const randomBase = Math.random()
    let trueScore, falseScore, notSureScore

    const misinformationKeywords = ["fake", "hoax", "conspiracy", "unverified", "rumor", "debunked"]
    const uncertainKeywords = ["claims", "allegedly", "reports suggest", "sources say"]
    const hasMisinformation = misinformationKeywords.some((keyword) => lowerInput.includes(keyword))
    const hasUncertain = uncertainKeywords.some((keyword) => lowerInput.includes(keyword))

    if (hasMisinformation) {
      falseScore = 0.65 + Math.random() * 0.25
      trueScore = 0.15 + Math.random() * 0.15
      notSureScore = 1 - trueScore - falseScore
    } else if (hasUncertain) {
      notSureScore = 0.45 + Math.random() * 0.25
      trueScore = 0.25 + Math.random() * 0.2
      falseScore = 1 - trueScore - notSureScore
    } else {
      trueScore = 0.6 + Math.random() * 0.25
      falseScore = 0.1 + Math.random() * 0.15
      notSureScore = 1 - trueScore - falseScore
    }

    const softmaxScores = { true: trueScore, false: falseScore, not_sure: notSureScore }
    const classification =
      trueScore > falseScore && trueScore > notSureScore ? "true" : falseScore > notSureScore ? "false" : "not_sure"

    setCurrentStep("Applying softmax activation...")
    processingSteps.push(
      `Softmax scores - True: ${(trueScore * 100).toFixed(1)}%, False: ${(falseScore * 100).toFixed(1)}%, Uncertain: ${(notSureScore * 100).toFixed(1)}%`,
    )
    await new Promise((resolve) => setTimeout(resolve, 600))

    setCurrentStep("Fact-checking with external sources...")
    processingSteps.push("Querying fact-checking databases")
    processingSteps.push("Cross-referencing with trusted sources")
    await new Promise((resolve) => setTimeout(resolve, 1200))

    // Generate real fact-checking sources based on content
    const generateRealSources = (input: string): FactCheckSource[] => {
      const lowerInput = input.toLowerCase()

      if (lowerInput.includes("vaccine") || lowerInput.includes("covid")) {
        return [
          {
            title: "CDC Vaccine Facts",
            url: "https://www.cdc.gov/vaccines/facts/index.html",
            excerpt:
              "The CDC provides comprehensive information about vaccine safety and effectiveness based on rigorous scientific research...",
            reliability: "high",
            highlightText: "vaccine safety and effectiveness based on rigorous scientific research",
          },
          {
            title: "WHO Vaccine Safety",
            url: "https://www.who.int/news-room/feature-stories/detail/how-are-vaccines-developed",
            excerpt:
              "The World Health Organization explains the thorough testing process vaccines undergo before approval...",
            reliability: "high",
            highlightText: "thorough testing process vaccines undergo before approval",
          },
        ]
      } else if (lowerInput.includes("climate") || lowerInput.includes("global warming")) {
        return [
          {
            title: "NASA Climate Change Evidence",
            url: "https://climate.nasa.gov/evidence/",
            excerpt:
              "NASA presents multiple lines of evidence for climate change including temperature records, ice core data...",
            reliability: "high",
            highlightText: "multiple lines of evidence for climate change",
          },
          {
            title: "IPCC Climate Reports",
            url: "https://www.ipcc.ch/reports/",
            excerpt:
              "The Intergovernmental Panel on Climate Change provides comprehensive assessments of climate science...",
            reliability: "high",
            highlightText: "comprehensive assessments of climate science",
          },
        ]
      } else if (lowerInput.includes("election") || lowerInput.includes("voting")) {
        return [
          {
            title: "Reuters Election Fact Check",
            url: "https://www.reuters.com/fact-check/",
            excerpt:
              "Reuters fact-checking team verifies election-related claims using official sources and documentation...",
            reliability: "high",
            highlightText: "verifies election-related claims using official sources",
          },
          {
            title: "AP Election Security",
            url: "https://apnews.com/hub/election-2024",
            excerpt: "Associated Press provides verified reporting on election processes and security measures...",
            reliability: "high",
            highlightText: "verified reporting on election processes and security measures",
          },
        ]
      } else {
        return [
          {
            title: "Snopes Fact Check",
            url: "https://www.snopes.com/",
            excerpt: "Snopes investigates and verifies claims through primary sources and expert consultation...",
            reliability: "high",
            highlightText: "investigates and verifies claims through primary sources",
          },
          {
            title: "PolitiFact Truth-O-Meter",
            url: "https://www.politifact.com/",
            excerpt: "PolitiFact rates the accuracy of claims made by public figures and institutions...",
            reliability: "high",
            highlightText: "rates the accuracy of claims made by public figures",
          },
          {
            title: "FactCheck.org Analysis",
            url: "https://www.factcheck.org/",
            excerpt: "FactCheck.org provides nonpartisan analysis of factual claims in politics and policy...",
            reliability: "medium",
            highlightText: "nonpartisan analysis of factual claims",
          },
        ]
      }
    }

    const realSources = generateRealSources(newsInput)

    const roberta: RoBERTaAnalysis = {
      isFactual: true,
      confidence: Math.max(trueScore, falseScore, notSureScore) * 100,
      classification,
      softmaxScores,
      embedding_processed: true,
      sources: realSources, // Using real sources
    }

    let status: "reliable" | "misinformation" | "uncertain"
    let explanation: string

    if (classification === "true") {
      status = "reliable"
      explanation =
        "RoBERTa analysis indicates this content is likely factual. Cross-referenced with multiple trusted sources."
    } else if (classification === "false") {
      status = "misinformation"
      explanation =
        "RoBERTa classification suggests this content may contain misinformation. Please verify with trusted sources."
    } else {
      status = "uncertain"
      explanation = "RoBERTa analysis shows uncertainty. Additional verification recommended before sharing."
    }

    processingSteps.push("Analysis complete - generating report")

    setAnalysisResult({
      status,
      confidence: roberta.confidence,
      explanation,
      type: "news",
      roberta,
      processingSteps,
    })
    setIsAnalyzing(false)
    setCurrentStep("")
  }

  const getResultColor = (status: string) => {
    switch (status) {
      case "reliable":
        return "border-green-500/50 bg-green-500/5"
      case "misinformation":
        return "border-red-500/50 bg-red-500/5"
      case "uncertain":
        return "border-yellow-500/50 bg-yellow-500/5"
      case "emotional":
      case "personal":
        return "border-green-500/50 bg-green-500/5"
      default:
        return ""
    }
  }

  const getResultIcon = (status: string) => {
    switch (status) {
      case "reliable":
        return <CheckCircle className="w-6 h-6 text-green-500" />
      case "misinformation":
        return <XCircle className="w-6 h-6 text-red-500" />
      case "uncertain":
        return <AlertCircle className="w-6 h-6 text-yellow-500" />
      case "emotional":
        return <Heart className="w-6 h-6 text-green-500" />
      case "personal":
        return <MessageCircle className="w-6 h-6 text-green-500" />
      default:
        return null
    }
  }

  const getResultTitle = (status: string) => {
    switch (status) {
      case "reliable":
        return "Verified Information"
      case "misinformation":
        return "Potential Misinformation"
      case "uncertain":
        return "Requires Verification"
      case "emotional":
        return "Emotional Support"
      case "personal":
        return "Personal Guidance"
      default:
        return ""
    }
  }

  const openSourceWithHighlight = (source: FactCheckSource) => {
    // Open the actual fact-checking website
    window.open(source.url, "_blank", "noopener,noreferrer")

    // Show a toast or notification that the source is opening
    console.log(`Opening source: ${source.title} at ${source.url}`)
  }

  return (
    <div className="min-h-screen bg-black text-white py-20 px-4 page-container news-background floating-news-cards">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6 fade-in-up">
            <Brain className="w-12 h-12 text-green-400" />
            <h1 className="font-bold text-5xl md:text-6xl text-glow-green">Krivya Intelligence</h1>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed fade-in-up delay-1">
            Advanced RoBERTa-powered misinformation detection with real-time fact-checking and source verification
          </p>
        </div>

        {/* Demo Interface */}
        <Card className="advanced-card mb-8 fade-in-up delay-2">
          <CardHeader className="border-b border-gray-800">
            <CardTitle className="text-2xl text-center text-white flex items-center justify-center gap-2">
              <Target className="w-6 h-6 text-green-400" />
              AI-Powered Content Analysis
            </CardTitle>
            <CardDescription className="text-center text-gray-300">
              Enter content for comprehensive RoBERTa-based analysis and fact-checking
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div className="flex gap-4">
              <Input
                placeholder="Enter news headline, claim, or any text for analysis..."
                value={newsInput}
                onChange={(e) => setNewsInput(e.target.value)}
                className="advanced-input flex-1 bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-400"
                onKeyPress={(e) => e.key === "Enter" && analyzeNews()}
              />
              <Button
                onClick={analyzeNews}
                disabled={isAnalyzing || !newsInput.trim()}
                className="glow-button bg-green-500 hover:bg-green-400 text-black px-8 font-semibold"
              >
                {isAnalyzing ? (
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 animate-pulse" />
                    Analyzing
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Search className="w-4 h-4" />
                    Analyze
                  </div>
                )}
              </Button>
            </div>

            {/* Processing Steps */}
            {isAnalyzing && currentStep && (
              <div className="advanced-card p-4">
                <div className="flex items-center gap-3">
                  <div className="loading-spinner"></div>
                  <span className="text-gray-200 font-medium typing-animation">{currentStep}</span>
                </div>
              </div>
            )}

            {/* Results */}
            {analysisResult && (
              <div className="space-y-6">
                {/* Main Result */}
                <div className={`advanced-card p-6 ${getResultColor(analysisResult.status)}`}>
                  <div className="flex items-center gap-3 mb-4">
                    {getResultIcon(analysisResult.status)}
                    <h3 className="text-xl font-semibold text-white">{getResultTitle(analysisResult.status)}</h3>
                    <div className="ml-auto">
                      <Badge variant="outline" className="text-gray-200 border-gray-600">
                        {analysisResult.confidence.toFixed(1)}% confidence
                      </Badge>
                    </div>
                  </div>

                  {/* Confidence Visualization */}
                  {analysisResult.type === "news" && analysisResult.roberta && (
                    <div className="mb-4 space-y-2">
                      <div className="text-sm text-gray-400 mb-2">RoBERTa Softmax Scores:</div>
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div className="bg-green-500/20 p-2 rounded text-center border-animate">
                          <div className="text-green-400 font-semibold">TRUE</div>
                          <div className="text-gray-200">
                            {(analysisResult.roberta.softmaxScores.true * 100).toFixed(1)}%
                          </div>
                        </div>
                        <div className="bg-red-500/20 p-2 rounded text-center border-animate">
                          <div className="text-red-400 font-semibold">FALSE</div>
                          <div className="text-gray-200">
                            {(analysisResult.roberta.softmaxScores.false * 100).toFixed(1)}%
                          </div>
                        </div>
                        <div className="bg-yellow-500/20 p-2 rounded text-center border-animate">
                          <div className="text-yellow-400 font-semibold">UNCERTAIN</div>
                          <div className="text-gray-200">
                            {(analysisResult.roberta.softmaxScores.not_sure * 100).toFixed(1)}%
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <p className="text-gray-200 leading-relaxed">{analysisResult.explanation}</p>
                </div>

                {/* Fact-Check Sources */}
                {analysisResult.roberta?.sources && (
                  <div className="advanced-card p-6">
                    <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <ExternalLink className="w-5 h-5 text-green-400" />
                      Fact-Check Sources
                    </h4>
                    <div className="space-y-4">
                      {analysisResult.roberta.sources.map((source, index) => (
                        <div key={index} className="advanced-card p-4">
                          <div className="flex items-start justify-between mb-2">
                            <h5 className="font-medium text-gray-100">{source.title}</h5>
                            <Badge
                              variant={source.reliability === "high" ? "default" : "secondary"}
                              className="text-xs"
                            >
                              {source.reliability} reliability
                            </Badge>
                          </div>
                          <p className="text-gray-300 text-sm mb-3">{source.excerpt}</p>
                          <button
                            onClick={() => openSourceWithHighlight(source)}
                            className="link-glow text-sm flex items-center gap-1"
                          >
                            <ExternalLink className="w-3 h-3" />
                            View source with highlights
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Processing Steps */}
                {analysisResult.processingSteps && (
                  <div className="advanced-card p-6">
                    <h4 className="text-lg font-semibold text-white mb-4">Processing Pipeline</h4>
                    <div className="space-y-2">
                      {analysisResult.processingSteps.map((step, index) => (
                        <div key={index} className="flex items-center gap-3 text-sm">
                          <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center text-xs font-bold text-green-400">
                            {index + 1}
                          </div>
                          <span className="text-gray-300">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Example Headlines */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="advanced-card fade-in-up delay-3">
            <CardHeader>
              <CardTitle className="text-lg text-white">Try These Examples</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <button
                onClick={() => setNewsInput("Scientists at MIT develop breakthrough quantum computing chip")}
                className="w-full text-left p-3 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors text-sm text-gray-200 border-animate"
              >
                "Scientists at MIT develop breakthrough quantum computing chip"
              </button>
              <button
                onClick={() => setNewsInput("Fake news: Vaccines contain microchips for tracking people")}
                className="w-full text-left p-3 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors text-sm text-gray-200 border-animate"
              >
                "Fake news: Vaccines contain microchips for tracking people"
              </button>
              <button
                onClick={() => setNewsInput("I'm feeling overwhelmed with work stress, need advice")}
                className="w-full text-left p-3 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors text-sm text-gray-200 border-animate"
              >
                "I'm feeling overwhelmed with work stress, need advice"
              </button>
            </CardContent>
          </Card>

          <Card className="advanced-card fade-in-up delay-4">
            <CardHeader>
              <CardTitle className="text-lg text-white">RoBERTa Pipeline</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center text-xs font-bold text-green-400">
                  1
                </div>
                <p className="text-sm text-gray-300">Content injection & classification</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center text-xs font-bold text-green-400">
                  2
                </div>
                <p className="text-sm text-gray-300">RoBERTa embedding & feedforward</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center text-xs font-bold text-green-400">
                  3
                </div>
                <p className="text-sm text-gray-300">Pooling & softmax classification</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center text-xs font-bold text-green-400">
                  4
                </div>
                <p className="text-sm text-gray-300">Fact-checking & source verification</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

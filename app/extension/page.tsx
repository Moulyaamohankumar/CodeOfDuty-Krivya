"use client"
import { useState } from "react"
import type React from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Navigation } from "@/components/navigation"
import { sampleTexts, staticQuestions } from "@/lib/analysis-engine"
import {
  Brain,
  Zap,
  Chrome,
  MousePointer,
  Sparkles,
  RefreshCw,
  HelpCircle,
  Newspaper,
  Search,
  TrendingUp,
  Shield,
} from "lucide-react"
import { useRouter } from "next/navigation"

export default function ExtensionPage() {
  const [selectedText, setSelectedText] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 })
  const router = useRouter()

  const allSampleTexts = [
    ...sampleTexts.factual,
    ...sampleTexts.emotional,
    ...staticQuestions.factual.slice(0, 3).map((q) => q.question),
    ...staticQuestions.emotional.slice(0, 2).map((q) => q.question),
  ]

  const handleTextSelection = (text: string, event: React.MouseEvent) => {
    setSelectedText(text)
    setTooltipPosition({ x: event.clientX, y: event.clientY })
    setShowTooltip(true)
  }

  const handleAnalyze = () => {
    if (!selectedText.trim()) return

    setIsAnalyzing(true)
    setShowTooltip(false)

    // Simulate analysis delay
    setTimeout(() => {
      setIsAnalyzing(false)
      router.push(`/results?text=${encodeURIComponent(selectedText)}`)
    }, 2000)
  }

  const loadRandomSample = () => {
    const randomText = allSampleTexts[Math.floor(Math.random() * allSampleTexts.length)]
    setSelectedText(randomText)
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
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center px-6 py-3 rounded-full professional-card text-sm text-muted-foreground mb-6 breaking-news-card">
            <Shield className="w-4 h-4 mr-2 text-accent" />
            Live News Analysis Demo
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-news-glow typewriter-effect">Extension Demo</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience how Ask Krivya works in your browser. Select any text below to trigger the analysis tooltip.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Simulated webpage content */}
          <div className="space-y-8">
            <Card className="p-8 professional-card news-card-hover">
              <div className="space-y-6">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-3 h-3 bg-rose-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                  <span className="text-sm text-muted-foreground ml-4">news-website.com</span>
                </div>

                <h2 className="text-2xl font-bold mb-4">Sample News Content</h2>

                <div className="space-y-4 text-foreground leading-relaxed">
                  <div className="space-y-4">
                    <div className="p-3 bg-fact-based/10 rounded-lg border-l-2 border-l-fact-based breaking-news-card">
                      <h4 className="text-sm font-medium text-fact-based mb-2">📰 Breaking News Claims:</h4>
                      {staticQuestions.factual.slice(0, 2).map((item, index) => (
                        <p
                          key={`fact-${index}`}
                          className="cursor-pointer hover:bg-muted/20 p-2 rounded transition-colors select-text text-sm mb-2"
                          onMouseUp={(e) => {
                            const selection = window.getSelection()?.toString()
                            if (selection && selection.length > 10) {
                              handleTextSelection(selection, e)
                            }
                          }}
                        >
                          {item.question}
                        </p>
                      ))}
                    </div>

                    <div className="p-3 bg-emotion-based/10 rounded-lg border-l-2 border-l-emotion-based misinformation-warning">
                      <h4 className="text-sm font-medium text-emotion-based mb-2">🚨 Opinion Content:</h4>
                      {staticQuestions.emotional.slice(0, 2).map((item, index) => (
                        <p
                          key={`emotion-${index}`}
                          className="cursor-pointer hover:bg-muted/20 p-2 rounded transition-colors select-text text-sm mb-2"
                          onMouseUp={(e) => {
                            const selection = window.getSelection()?.toString()
                            if (selection && selection.length > 10) {
                              handleTextSelection(selection, e)
                            }
                          }}
                        >
                          {item.question}
                        </p>
                      ))}
                    </div>

                    <div className="p-3 bg-muted/10 rounded-lg fact-check-card">
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">📊 Mixed Content:</h4>
                      {allSampleTexts.slice(0, 2).map((text, index) => (
                        <p
                          key={`mixed-${index}`}
                          className="cursor-pointer hover:bg-muted/20 p-2 rounded transition-colors select-text text-sm mb-2"
                          onMouseUp={(e) => {
                            const selection = window.getSelection()?.toString()
                            if (selection && selection.length > 10) {
                              handleTextSelection(selection, e)
                            }
                          }}
                        >
                          {text}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-accent/10 rounded-lg border border-accent/20">
                  <div className="flex items-center space-x-2 mb-2">
                    <MousePointer className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">Try it out:</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Select any sentence above to see the Ask Krivya tooltip appear, just like it would in your browser!
                  </p>
                </div>
              </div>
            </Card>

            {/* Manual text input */}
            <Card className="p-8 professional-card news-card-hover">
              <h3 className="text-xl font-semibold mb-4">Or Enter Your Own Text</h3>
              <div className="space-y-4">
                <Textarea
                  placeholder="Paste any news article, social media post, or claim you'd like to analyze..."
                  value={selectedText}
                  onChange={(e) => setSelectedText(e.target.value)}
                  className="min-h-[120px] professional-card bg-transparent"
                />
                <div className="flex gap-2">
                  <Button
                    onClick={handleAnalyze}
                    disabled={!selectedText.trim() || isAnalyzing}
                    className="flex-1 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white transition-all duration-200 hover:scale-105 disabled:hover:scale-100 breaking-news-card"
                  >
                    {isAnalyzing ? (
                      <>
                        <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Zap className="w-4 h-4 mr-2" />
                        Analyze Text
                      </>
                    )}
                  </Button>
                  <Button
                    onClick={loadRandomSample}
                    variant="outline"
                    className="professional-card bg-transparent transition-all duration-200 hover:scale-105"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Random Sample
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Extension features */}
          <div className="space-y-8">
            <Card className="p-8 professional-card border-l-4 border-l-primary news-card-hover">
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                    <Chrome className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold">Browser Extension Features</h3>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-medium">Instant News Analysis</h4>
                      <p className="text-sm text-muted-foreground">
                        Select any text on news websites to trigger misinformation detection
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-fact-based rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-medium">Smart Fact-Check Tooltip</h4>
                      <p className="text-sm text-muted-foreground">
                        Non-intrusive popup with "Ask Krivya" verification
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-medium">Real-time Verification</h4>
                      <p className="text-sm text-muted-foreground">Instant classification powered by Google Cloud</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* User Reviews */}
            <Card className="p-10 professional-card border-l-4 border-l-accent news-card-hover">
              <h3 className="text-2xl font-semibold mb-8 text-accent">User Reviews</h3>
              <div className="space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white font-bold">
                      SJ
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">Sarah Johnson</h4>
                      <p className="text-sm text-muted-foreground">Investigative Journalist</p>
                      <div className="flex space-x-1 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className="text-accent text-sm">
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed pl-15">
                    "Ask Krivya has revolutionized my fact-checking workflow. The instant analysis helps me verify
                    claims in real-time while researching stories. Essential tool for any serious journalist."
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-fact-based to-green-500 rounded-full flex items-center justify-center text-white font-bold">
                      DR
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">Dr. Robert Chen</h4>
                      <p className="text-sm text-muted-foreground">Media Studies Professor</p>
                      <div className="flex space-x-1 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className="text-accent text-sm">
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed pl-15">
                    "I recommend Ask Krivya to all my students. It's an excellent educational tool that teaches critical
                    thinking about information sources and helps combat misinformation."
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-emotion-based to-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                      MK
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">Maria Kowalski</h4>
                      <p className="text-sm text-muted-foreground">Graduate Student</p>
                      <div className="flex space-x-1 mt-1">
                        {[...Array(4)].map((_, i) => (
                          <span key={i} className="text-accent text-sm">
                            ★
                          </span>
                        ))}
                        <span className="text-muted-foreground text-sm">★</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed pl-15">
                    "Perfect for research projects! The extension helps me quickly identify reliable sources and spot
                    potential bias in articles. Saves hours of manual fact-checking."
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                      JM
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">James Mitchell</h4>
                      <p className="text-sm text-muted-foreground">Business Analyst</p>
                      <div className="flex space-x-1 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className="text-accent text-sm">
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed pl-15">
                    "Incredibly useful for staying informed without falling for fake news. The confidence scores help me
                    understand how reliable information is before sharing it with my team."
                  </p>
                </div>

                <div className="mt-8 p-6 bg-accent/10 rounded-lg border border-accent/20">
                  <div className="text-center space-y-3">
                    <h4 className="text-lg font-semibold text-accent">Join 25,000+ Active Users</h4>
                    <p className="text-sm text-muted-foreground">
                      Trusted by journalists, researchers, students, and professionals worldwide
                    </p>
                    <div className="flex justify-center space-x-6 text-sm">
                      <div className="text-center">
                        <div className="font-bold text-fact-based">4.8/5</div>
                        <div className="text-muted-foreground">Average Rating</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-primary">98%</div>
                        <div className="text-muted-foreground">Accuracy Rate</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-accent">1M+</div>
                        <div className="text-muted-foreground">Texts Analyzed</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-8 professional-card border-l-4 border-l-accent news-card-hover">
              <h3 className="text-xl font-semibold mb-4 text-accent">Quick Test Questions</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2 mb-3">
                  <HelpCircle className="w-4 h-4 text-accent" />
                  <span className="text-sm font-medium">Try these news examples:</span>
                </div>
                <div className="space-y-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full text-left justify-start text-xs h-auto p-2 bg-transparent transition-all duration-200 hover:scale-105"
                    onClick={() => setSelectedText("The Great Wall of China is visible from space with the naked eye")}
                  >
                    "Great Wall visible from space" (Fact Check)
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full text-left justify-start text-xs h-auto p-2 bg-transparent transition-all duration-200 hover:scale-105"
                    onClick={() => setSelectedText("I absolutely love this new restaurant! The food is amazing")}
                  >
                    "I love this restaurant!" (Opinion Detection)
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full text-left justify-start text-xs h-auto p-2 bg-transparent transition-all duration-200 hover:scale-105"
                    onClick={() => setSelectedText("Water boils at 100 degrees Celsius at sea level")}
                  >
                    "Water boils at 100°C" (Scientific Fact)
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Tooltip simulation */}
      {showTooltip && (
        <div
          className="fixed z-50 professional-card p-3 rounded-lg shadow-lg border border-white/20"
          style={{
            left: tooltipPosition.x + 10,
            top: tooltipPosition.y - 60,
          }}
        >
          <Button
            size="sm"
            onClick={handleAnalyze}
            className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white text-xs"
          >
            <Brain className="w-3 h-3 mr-1" />
            Ask Krivya
          </Button>
        </div>
      )}

      {/* Loading overlay */}
      {isAnalyzing && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
          <Card className="p-8 professional-card text-center">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto pulse-glow">
                <Sparkles className="w-8 h-8 text-white animate-spin" />
              </div>
              <h3 className="text-xl font-semibold">Analyzing News Content...</h3>
              <p className="text-muted-foreground">Google Cloud AI is processing your selection</p>
              <div className="text-xs text-muted-foreground">Powered by Gateway API & Cloud Storage</div>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}

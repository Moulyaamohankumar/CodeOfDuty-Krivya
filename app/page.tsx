"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"
import {
  ArrowRight,
  Brain,
  Chrome,
  Sparkles,
  Shield,
  AlertTriangle,
  CheckCircle,
  Newspaper,
  Search,
  TrendingUp,
} from "lucide-react"

export default function HomePage() {
  const router = useRouter()

  const handleInstallExtension = () => {
    alert("Extension installation would redirect to Chrome Web Store in production")
  }

  const handleViewDemo = () => {
    router.push("/extension")
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

      <Navigation />

      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center space-y-12">
            <div className="space-y-6">
              <div className="inline-flex items-center px-6 py-3 rounded-full professional-card text-sm text-muted-foreground mb-6 breaking-news-card">
                <Shield className="w-4 h-4 mr-2 text-accent" />
                Combat Misinformation with AI
              </div>

              <h1 className="text-6xl lg:text-8xl font-bold text-news-glow leading-tight typewriter-effect">
                Ask Krivya
              </h1>

              <p className="text-xl lg:text-2xl text-muted-foreground font-light max-w-4xl mx-auto leading-relaxed">
                Professional-grade browser extension that instantly analyzes news content, social media posts, and web
                articles to distinguish between
                <span className="text-fact-based font-semibold"> verified facts</span> and
                <span className="text-emotion-based font-semibold"> opinion-based content</span>
              </p>

              <div className="bg-accent/10 border border-accent/20 rounded-lg p-3 max-w-2xl mx-auto">
                <div className="flex items-center space-x-2 mb-2">
                  <AlertTriangle className="w-4 h-4 text-accent" />
                  <span className="text-sm font-medium text-accent">Misinformation Alert</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  73% of people can't distinguish between news and opinion content online. Ask Krivya helps you stay
                  informed.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                onClick={handleInstallExtension}
                size="lg"
                className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white px-12 py-5 text-lg rounded-full transition-all duration-300 hover:scale-105 breaking-news-card"
              >
                <Chrome className="w-5 h-5 mr-3" />
                Add to Chrome
                <ArrowRight className="w-5 h-5 ml-3" />
              </Button>

              <Button
                onClick={handleViewDemo}
                size="lg"
                variant="outline"
                className="professional-card px-12 py-5 text-lg rounded-full transition-all duration-300 hover:scale-105 bg-transparent"
              >
                Try Demo
              </Button>
            </div>

            <div className="flex justify-center items-center space-x-12 text-sm text-muted-foreground pt-8">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-fact-based" />
                <span>Fact-checked results</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-primary" />
                <span>Privacy protected</span>
              </div>
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-accent" />
                <span>Real-time analysis</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-spacing">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold">Professional News Analysis</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Three-stage AI pipeline designed for journalists, researchers, and informed citizens
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 professional-card news-card-hover fact-check-card">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mb-6">
                <span className="text-white font-bold text-xl">1</span>
              </div>
              <h3 className="text-2xl font-semibold mb-4">Content Classification</h3>
              <p className="text-muted-foreground leading-relaxed">
                DISTIL-BERT model trained on news articles and social media posts to identify factual claims vs. opinion
                content
              </p>
              <div className="mt-4 text-xs text-primary font-medium">Accuracy: 94.2% on news content</div>
            </Card>

            <Card className="p-8 professional-card news-card-hover border-l-4 border-l-emotion-based">
              <div className="w-16 h-16 bg-gradient-to-br from-emotion-based to-orange-500 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-white font-bold text-xl">2</span>
              </div>
              <h3 className="text-2xl font-semibold mb-4">Sentiment Analysis</h3>
              <p className="text-muted-foreground leading-relaxed">
                Advanced NER processing identifies emotional language, bias indicators, and subjective statements in
                news content
              </p>
              <div className="mt-4 text-xs text-emotion-based font-medium">Detects 15+ emotion categories</div>
            </Card>

            <Card className="p-8 professional-card news-card-hover border-l-4 border-l-fact-based">
              <div className="w-16 h-16 bg-gradient-to-br from-fact-based to-green-500 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-white font-bold text-xl">3</span>
              </div>
              <h3 className="text-2xl font-semibold mb-4">Fact Verification</h3>
              <p className="text-muted-foreground leading-relaxed">
                RoBERTa-based fact-checking with confidence scoring and source verification for news claims
              </p>
              <div className="mt-4 text-xs text-fact-based font-medium">Cross-references 50M+ sources</div>
            </Card>
          </div>
        </div>
      </section>

      <section className="section-spacing">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl lg:text-5xl font-bold">Stop Misinformation</h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                In an era of information overload, Ask Krivya serves as your personal fact-checker, helping you navigate
                news articles, social media posts, and online content with confidence.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-fact-based mt-1" />
                  <div>
                    <h4 className="font-semibold">Real-time Fact Checking</h4>
                    <p className="text-sm text-muted-foreground">Instant verification of claims and statistics</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-accent mt-1" />
                  <div>
                    <h4 className="font-semibold">Bias Detection</h4>
                    <p className="text-sm text-muted-foreground">Identifies emotional language and opinion markers</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Shield className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold">Source Verification</h4>
                    <p className="text-sm text-muted-foreground">Cross-references claims with trusted sources</p>
                  </div>
                </div>
              </div>
            </div>
            <Card className="p-8 professional-card misinformation-warning">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5 text-warning-orange" />
                  <span className="font-semibold text-warning-orange">Misinformation Detected</span>
                </div>
                <p className="text-sm text-muted-foreground italic">
                  "The vaccine contains microchips for tracking people..."
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Confidence: False</span>
                    <span className="text-destructive font-semibold">97.3%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-destructive h-2 rounded-full" style={{ width: "97%" }}></div>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Verified against WHO, CDC, and peer-reviewed medical sources
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="section-spacing">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <Card className="p-12 professional-card text-center news-card-hover">
            <div className="space-y-8">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto">
                <Brain className="w-10 h-10 text-white" />
              </div>

              <div className="space-y-4">
                <h2 className="text-4xl lg:text-5xl font-bold">Join the Fight Against Misinformation</h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Install Ask Krivya and become part of a community dedicated to accurate, fact-based information
                  sharing
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 justify-center pt-4">
                <Button
                  onClick={handleInstallExtension}
                  size="lg"
                  className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white px-12 py-5 text-lg rounded-full transition-all duration-300 hover:scale-105"
                >
                  <Chrome className="w-5 h-5 mr-3" />
                  Install Extension
                </Button>
                <Button
                  onClick={handleViewDemo}
                  size="lg"
                  variant="outline"
                  className="professional-card px-12 py-5 text-lg rounded-full transition-all duration-300 hover:scale-105 bg-transparent"
                >
                  View Demo
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <footer className="professional-card border-t border-white/10 py-12 mt-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-6 md:mb-0">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-news-glow">Ask Krivya</span>
            </div>

            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
              <div className="text-xs text-muted-foreground text-center md:text-left">
                <div className="mb-1">Powered by Google Cloud</div>
                <div className="flex items-center space-x-4 text-xs">
                  <span>Gateway API</span>
                  <span>•</span>
                  <span>Cloud Storage</span>
                </div>
              </div>

              <div className="flex items-center space-x-8 text-sm text-muted-foreground">
                <Link href="/privacy" className="hover:text-primary transition-colors">
                  Privacy
                </Link>
                <Link href="/terms" className="hover:text-primary transition-colors">
                  Terms
                </Link>
                <Link href="/support" className="hover:text-primary transition-colors">
                  Support
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

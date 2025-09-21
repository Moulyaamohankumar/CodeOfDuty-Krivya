"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Eye, AlertTriangle, Brain, Database, Zap } from "lucide-react"

export default function FeaturesPage() {
  const features = [
    {
      icon: Shield,
      title: "Real-time Fact-Checking",
      description:
        "Advanced AI algorithms analyze content as you browse, cross-referencing claims with verified databases and trusted sources in milliseconds.",
    },
    {
      icon: Eye,
      title: "Source Credibility Analysis",
      description:
        "Comprehensive evaluation of news sources, publishers, and authors with detailed credibility scores based on historical accuracy and bias analysis.",
    },
    {
      icon: AlertTriangle,
      title: "Fake News Alerts",
      description:
        "Immediate notifications when potentially misleading content is detected, with explanations and links to verified alternative sources.",
    },
    {
      icon: Brain,
      title: "AI-Powered Detection",
      description:
        "Machine learning models trained on millions of verified articles to identify patterns, inconsistencies, and markers of misinformation.",
    },
    {
      icon: Database,
      title: "Comprehensive Database",
      description:
        "Access to extensive databases of fact-checked content, verified sources, and historical accuracy records for thorough verification.",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description:
        "Optimized for speed with minimal impact on browsing experience. Get results in under 100ms without slowing down your workflow.",
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white py-20 px-4 page-container news-background floating-news-cards">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-glow-green fade-in-up">Advanced Features</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed fade-in-up delay-1">
            Discover how Krivya's cutting-edge technology protects you from misinformation with intelligent analysis,
            real-time verification, and comprehensive source evaluation.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className={`advanced-card fade-in-up delay-${Math.min(index + 1, 5)}`}>
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-4 rounded-full bg-green-500/10 w-fit">
                  <feature.icon className="w-10 h-10 text-green-400" />
                </div>
                <CardTitle className="text-xl text-white">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-300 leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Technical Details */}
        <div className="mt-20 grid md:grid-cols-2 gap-12">
          <div className="space-y-6 fade-in-up delay-2">
            <h2 className="text-3xl font-bold text-glow-green">How It Works</h2>
            <div className="space-y-4">
              <div className="advanced-card p-4">
                <h3 className="text-lg font-semibold text-white mb-2">1. Content Analysis</h3>
                <p className="text-gray-300">
                  Our AI scans text, images, and metadata to identify potential misinformation markers.
                </p>
              </div>
              <div className="advanced-card p-4">
                <h3 className="text-lg font-semibold text-white mb-2">2. Source Verification</h3>
                <p className="text-gray-300">
                  Cross-reference claims with trusted databases and evaluate source credibility.
                </p>
              </div>
              <div className="advanced-card p-4">
                <h3 className="text-lg font-semibold text-white mb-2">3. Real-time Results</h3>
                <p className="text-gray-300">
                  Receive instant feedback with confidence scores and alternative sources.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6 fade-in-up delay-3">
            <h2 className="text-3xl font-bold text-glow-green">Privacy & Security</h2>
            <div className="space-y-4">
              <div className="advanced-card p-4">
                <h3 className="text-lg font-semibold text-white mb-2">Local Processing</h3>
                <p className="text-gray-300">Most analysis happens locally on your device to protect your privacy.</p>
              </div>
              <div className="advanced-card p-4">
                <h3 className="text-lg font-semibold text-white mb-2">No Data Storage</h3>
                <p className="text-gray-300">We don't store your browsing history or personal information.</p>
              </div>
              <div className="advanced-card p-4">
                <h3 className="text-lg font-semibold text-white mb-2">Encrypted Communication</h3>
                <p className="text-gray-300">All external API calls are encrypted and anonymized for security.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

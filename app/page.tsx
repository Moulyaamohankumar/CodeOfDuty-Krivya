"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Eye, AlertTriangle } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white page-container news-background floating-news-cards">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <h1 className="font-bold text-6xl md:text-8xl mb-6 fade-in-up">
            <span className="text-glow-green">Krivya</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-2xl mx-auto fade-in-up delay-1">
            Fighting Misinformation, One Click at a Time
          </p>
          <Button
            size="lg"
            className="glow-button text-lg px-8 py-4 bg-green-500 hover:bg-green-400 text-black font-semibold fade-in-up delay-2"
          >
            Get Extension
          </Button>
        </div>
      </section>

      {/* Mission Overview */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-bold text-4xl md:text-5xl mb-8 text-glow-green fade-in-up">Our Mission</h2>
          <p className="text-lg text-gray-300 leading-relaxed mb-8 fade-in-up delay-1">
            In an era of information overload, Krivya stands as your digital guardian against misinformation. Our
            advanced AI technology analyzes content in real-time, helping you navigate the digital landscape with
            confidence and clarity.
          </p>
        </div>
      </section>

      {/* Quick Feature Highlights */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-bold text-4xl md:text-5xl text-center mb-16 text-glow-green fade-in-up">Key Features</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="advanced-card fade-in-up delay-1">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 rounded-full bg-green-500/10 w-fit">
                  <Shield className="w-8 h-8 text-green-400" />
                </div>
                <CardTitle className="font-bold text-xl text-white">Real-time Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-300">
                  Instantly verify claims and statements as you browse with our advanced AI algorithms.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="advanced-card fade-in-up delay-2">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 rounded-full bg-green-500/10 w-fit">
                  <Eye className="w-8 h-8 text-green-400" />
                </div>
                <CardTitle className="font-bold text-xl text-white">Source Verification</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-300">
                  Comprehensive credibility scoring and analysis of news sources and publishers.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="advanced-card fade-in-up delay-3">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 rounded-full bg-green-500/10 w-fit">
                  <AlertTriangle className="w-8 h-8 text-green-400" />
                </div>
                <CardTitle className="font-bold text-xl text-white">Smart Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-300">
                  Get immediate warnings about potentially false information with detailed explanations.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}

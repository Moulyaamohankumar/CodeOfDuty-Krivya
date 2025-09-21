"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MessageSquare, Send, Github, Twitter, Linkedin } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setSubmitted(true)
    setIsSubmitting(false)
    setFormData({ name: "", email: "", subject: "", message: "" })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="min-h-screen bg-black text-white py-20 px-4 page-container news-background floating-news-cards">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 fade-in-up">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-glow-green">Get In Touch</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Have questions about Krivya? Want to collaborate or report an issue? We'd love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="advanced-card fade-in-up delay-1">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2 text-white">
                <MessageSquare className="w-6 h-6 text-green-400" />
                Send us a message
              </CardTitle>
              <CardDescription className="text-gray-300">
                Fill out the form below and we'll get back to you as soon as possible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8 text-green-400" />
                  </div>
                  <h3 className="text-xl mb-2 text-white">Message Sent!</h3>
                  <p className="text-gray-300">Thank you for reaching out. We'll respond within 24 hours.</p>
                  <Button onClick={() => setSubmitted(false)} variant="outline" className="mt-4 glow-button">
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-300">
                        Name *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="advanced-input bg-gray-900/50 border-gray-700 text-white"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-300">
                        Email *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="advanced-input bg-gray-900/50 border-gray-700 text-white"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-2 text-gray-300">
                      Subject *
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="advanced-input bg-gray-900/50 border-gray-700 text-white"
                      placeholder="What's this about?"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2 text-gray-300">
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="advanced-input bg-gray-900/50 border-gray-700 text-white resize-none"
                      placeholder="Tell us more about your inquiry..."
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full glow-button bg-green-500 hover:bg-green-400 text-black"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="loading-spinner" />
                        Sending...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Send className="w-4 h-4" />
                        Send Message
                      </div>
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8 fade-in-up delay-2">
            <Card className="advanced-card">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2 text-white">
                  <Mail className="w-5 h-5 text-green-400" />
                  Direct Contact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-1 text-white">General Inquiries</h4>
                  <a href="mailto:hello@krivya.com" className="link-glow text-gray-300">
                    hello@krivya.com
                  </a>
                </div>
                <div>
                  <h4 className="font-medium mb-1 text-white">Technical Support</h4>
                  <a href="mailto:support@krivya.com" className="link-glow text-gray-300">
                    support@krivya.com
                  </a>
                </div>
                <div>
                  <h4 className="font-medium mb-1 text-white">Partnership & Media</h4>
                  <a href="mailto:partnerships@krivya.com" className="link-glow text-gray-300">
                    partnerships@krivya.com
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card className="advanced-card">
              <CardHeader>
                <CardTitle className="text-xl text-white">Connect With Us</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <a
                    href="https://github.com/krivya"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-colors border-animate"
                  >
                    <Github className="w-5 h-5 text-green-400" />
                  </a>
                  <a
                    href="https://twitter.com/krivya"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-colors border-animate"
                  >
                    <Twitter className="w-5 h-5 text-green-400" />
                  </a>
                  <a
                    href="https://linkedin.com/company/krivya"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-colors border-animate"
                  >
                    <Linkedin className="w-5 h-5 text-green-400" />
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card className="advanced-card">
              <CardHeader>
                <CardTitle className="text-xl text-white">Project Information</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-3">
                <p>
                  Krivya is an open-source project dedicated to combating misinformation through advanced AI technology
                  and community collaboration.
                </p>
                <p>
                  Built with RoBERTa-powered detection, real-time fact-checking, and intelligent content analysis to
                  help users navigate the digital information landscape.
                </p>
                <div className="pt-2">
                  <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-medium border border-green-500/30">
                    Open Source
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

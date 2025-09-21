import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"
import { Brain, Users, Shield, Zap, Github, Twitter, Mail } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center space-y-4 mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-3d bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            About Ask Krivya
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Empowering users to distinguish between facts and emotions in the digital age
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div className="space-y-8">
            <Card className="p-8 glass-morphism border-l-4 border-l-primary">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                    <Brain className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold">Our Mission</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  In an era of information overload, Ask Krivya helps users navigate the complex landscape of online
                  content by providing instant, AI-powered analysis to distinguish between factual information and
                  emotional opinions.
                </p>
              </div>
            </Card>

            <Card className="p-8 glass-morphism border-l-4 border-l-fact-based">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-fact-based to-accent rounded-lg flex items-center justify-center">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold">Privacy First</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Your data privacy is our priority. Ask Krivya processes text locally when possible and never stores
                  personal information. All analysis is performed with respect for user privacy and data protection.
                </p>
              </div>
            </Card>
          </div>

          <div className="space-y-8">
            <Card className="p-8 glass-morphism border-l-4 border-l-emotion-based">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-emotion-based to-vibrant-pink rounded-lg flex items-center justify-center">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold">Advanced AI</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Our system uses state-of-the-art AI models including DISTIL-BERT for classification, NER for emotional
                  analysis, and RoBERTa for fact-checking, providing accurate and reliable results.
                </p>
              </div>
            </Card>

            <Card className="p-8 glass-morphism border-l-4 border-l-secondary">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-secondary to-accent rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold">Community Driven</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Built with feedback from researchers, journalists, and everyday users who need reliable tools to
                  navigate information online. Join our community to help improve the platform.
                </p>
              </div>
            </Card>
          </div>
        </div>

        <div className="text-center space-y-8 mb-16">
          <h2 className="text-3xl font-bold">The Technology Behind Ask Krivya</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 glass-morphism card-3d">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center mx-auto">
                  <span className="text-white font-bold">1</span>
                </div>
                <h3 className="text-xl font-semibold">DISTIL-BERT Classification</h3>
                <p className="text-sm text-muted-foreground">
                  Fine-tuned transformer model that performs initial triage to classify text as emotional or factual
                  content with high accuracy.
                </p>
              </div>
            </Card>

            <Card className="p-6 glass-morphism card-3d">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-gradient-to-br from-emotion-based to-vibrant-pink rounded-lg flex items-center justify-center mx-auto">
                  <span className="text-white font-bold">2</span>
                </div>
                <h3 className="text-xl font-semibold">NER Emotional Analysis</h3>
                <p className="text-sm text-muted-foreground">
                  Named Entity Recognition model specialized in identifying emotional content, sentiment polarity, and
                  subjective language patterns.
                </p>
              </div>
            </Card>

            <Card className="p-6 glass-morphism card-3d">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-gradient-to-br from-fact-based to-accent rounded-lg flex items-center justify-center mx-auto">
                  <span className="text-white font-bold">3</span>
                </div>
                <h3 className="text-xl font-semibold">RoBERTa Fact-Checking</h3>
                <p className="text-sm text-muted-foreground">
                  Robust fact-checking model that verifies claims against knowledge bases and provides confidence scores
                  for accuracy assessment.
                </p>
              </div>
            </Card>
          </div>
        </div>

        <Card className="p-12 glass-morphism gradient-shift bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 text-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Get in Touch</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Have questions, feedback, or want to contribute? We'd love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="outline" className="glass-morphism bg-transparent px-8 py-4 text-lg">
                <Mail className="w-5 h-5 mr-2" />
                Contact Us
              </Button>
              <Button size="lg" variant="outline" className="glass-morphism bg-transparent px-8 py-4 text-lg">
                <Github className="w-5 h-5 mr-2" />
                GitHub
              </Button>
              <Button size="lg" variant="outline" className="glass-morphism bg-transparent px-8 py-4 text-lg">
                <Twitter className="w-5 h-5 mr-2" />
                Twitter
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

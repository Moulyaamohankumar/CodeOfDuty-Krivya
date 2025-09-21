// Static backend simulation for Ask Krivya text analysis
// Simulates DISTIL-BERT → NER/RoBERTa workflow without actual AI models

export interface AnalysisResult {
  id: string
  type: "fact" | "emotion"
  classification: string
  content: string
  confidence: number
  details: string
  model: string
  verdict?: "true" | "false" | "unsure"
  entities?: string[]
  sentiment?: "positive" | "negative" | "neutral"
  factualClaims?: string[]
  source?: string
}

// Simulated DISTIL-BERT triage classification
export function performTriageClassification(text: string): "fact" | "emotion" {
  // Emotional indicators
  const emotionalWords = [
    "love",
    "hate",
    "amazing",
    "terrible",
    "incredible",
    "awful",
    "fantastic",
    "horrible",
    "best",
    "worst",
    "beautiful",
    "ugly",
    "perfect",
    "disgusting",
    "wonderful",
    "pathetic",
    "brilliant",
    "stupid",
    "excited",
    "disappointed",
    "thrilled",
    "devastated",
    "happy",
    "sad",
    "angry",
    "frustrated",
    "delighted",
    "annoyed",
    "impressed",
    "shocked",
  ]

  // Factual indicators
  const factualWords = [
    "data",
    "research",
    "study",
    "report",
    "statistics",
    "evidence",
    "according",
    "analysis",
    "findings",
    "results",
    "survey",
    "investigation",
    "experiment",
    "measurement",
    "observation",
    "documentation",
    "record",
    "database",
    "census",
    "poll",
    "metric",
    "percentage",
    "ratio",
  ]

  // Factual patterns
  const hasNumbers = /\d+(\.\d+)?/.test(text)
  const hasPercentages = /%/.test(text)
  const hasDates =
    /\b(19|20)\d{2}\b|\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\b|\b\d{1,2}\/\d{1,2}\/\d{2,4}\b/.test(
      text,
    )
  const hasUnits = /\b\d+\s*(kg|lb|meter|mile|celsius|fahrenheit|dollar|euro|percent)\b/i.test(text)
  const hasCitations = /according to|research shows|study found|data indicates/i.test(text)

  // Emotional patterns
  const hasExclamation = /!/.test(text)
  const hasIntensifiers = /\b(very|extremely|incredibly|absolutely|totally|completely|utterly)\b/i.test(text)
  const hasPersonalPronouns = /\b(I|me|my|mine|we|us|our|you|your)\b/i.test(text)
  const hasSubjectiveLanguage = /\b(think|feel|believe|opinion|personally|seems|appears)\b/i.test(text)

  // Count indicators
  const emotionalScore =
    emotionalWords.filter((word) => text.toLowerCase().includes(word)).length +
    (hasExclamation ? 2 : 0) +
    (hasIntensifiers ? 1 : 0) +
    (hasPersonalPronouns ? 1 : 0) +
    (hasSubjectiveLanguage ? 2 : 0)

  const factualScore =
    factualWords.filter((word) => text.toLowerCase().includes(word)).length +
    (hasNumbers ? 2 : 0) +
    (hasPercentages ? 1 : 0) +
    (hasDates ? 1 : 0) +
    (hasUnits ? 1 : 0) +
    (hasCitations ? 3 : 0)

  // Determine classification
  if (factualScore > emotionalScore) {
    return "fact"
  } else if (emotionalScore > factualScore) {
    return "emotion"
  } else {
    // Tie-breaker: longer, more formal text tends to be factual
    return text.length > 100 && !hasExclamation ? "fact" : "emotion"
  }
}

// Simulated NER emotional analysis
export function performEmotionalAnalysis(text: string): AnalysisResult {
  const entities = extractEmotionalEntities(text)
  const sentiment = analyzeSentiment(text)
  const confidence = calculateEmotionalConfidence(text, entities, sentiment)

  return {
    id: generateId(),
    type: "emotion",
    classification: "Emotional Opinion",
    content: `This text expresses ${sentiment} sentiment with emotional intensity. The content contains subjective opinions and personal feelings rather than verifiable facts.`,
    confidence,
    details: `NER model identified ${entities.length} emotional entities and classified overall sentiment as ${sentiment}. Detected subjective language patterns, personal expressions, and opinion-based statements. Emotional intensity analysis shows ${confidence > 85 ? "high" : confidence > 70 ? "moderate" : "low"} confidence in emotional classification.`,
    model: "NER Sentiment Analyzer",
    entities,
    sentiment,
  }
}

// Simulated RoBERTa fact-checking
export function performFactualAnalysis(text: string): AnalysisResult {
  const factualClaims = extractFactualClaims(text)
  const verdict = determineFactualVerdict(text, factualClaims)
  const confidence = calculateFactualConfidence(text, factualClaims, verdict)

  return {
    id: generateId(),
    type: "fact",
    classification: "Factual Statement",
    content: `This text contains verifiable claims that can be fact-checked against reliable sources. The information appears to be ${verdict === "true" ? "accurate" : verdict === "false" ? "inaccurate" : "uncertain"} based on available evidence.`,
    confidence,
    details: `RoBERTa model analyzed ${factualClaims.length} factual claims and cross-referenced with knowledge bases. Verification process included source credibility assessment, claim consistency checking, and evidence correlation. The model's confidence in this ${verdict} verdict is ${confidence}% based on available supporting evidence.`,
    model: "RoBERTa Fact-Checker",
    verdict,
    factualClaims,
  }
}

// Helper functions for emotional analysis
function extractEmotionalEntities(text: string): string[] {
  const emotionalPatterns = [
    /\b(love|adore|cherish|treasure)\b/gi,
    /\b(hate|despise|loathe|detest)\b/gi,
    /\b(amazing|incredible|fantastic|wonderful|brilliant)\b/gi,
    /\b(terrible|awful|horrible|disgusting|pathetic)\b/gi,
    /\b(excited|thrilled|delighted|overjoyed)\b/gi,
    /\b(disappointed|devastated|heartbroken|crushed)\b/gi,
    /\b(angry|furious|outraged|livid)\b/gi,
    /\b(happy|joyful|cheerful|content)\b/gi,
    /\b(sad|depressed|melancholy|sorrowful)\b/gi,
  ]

  const entities: string[] = []
  emotionalPatterns.forEach((pattern) => {
    const matches = text.match(pattern)
    if (matches) {
      entities.push(...matches.map((match) => match.toLowerCase()))
    }
  })

  return [...new Set(entities)] // Remove duplicates
}

function analyzeSentiment(text: string): "positive" | "negative" | "neutral" {
  const positiveWords = [
    "love",
    "amazing",
    "incredible",
    "fantastic",
    "wonderful",
    "brilliant",
    "excellent",
    "perfect",
    "beautiful",
    "happy",
    "excited",
    "thrilled",
    "delighted",
  ]
  const negativeWords = [
    "hate",
    "terrible",
    "awful",
    "horrible",
    "disgusting",
    "pathetic",
    "worst",
    "ugly",
    "sad",
    "angry",
    "disappointed",
    "devastated",
    "frustrated",
  ]

  const positiveCount = positiveWords.filter((word) => text.toLowerCase().includes(word)).length
  const negativeCount = negativeWords.filter((word) => text.toLowerCase().includes(word)).length

  if (positiveCount > negativeCount) return "positive"
  if (negativeCount > positiveCount) return "negative"
  return "neutral"
}

function calculateEmotionalConfidence(text: string, entities: string[], sentiment: string): number {
  let confidence = 70 // Base confidence

  // Boost confidence based on emotional indicators
  confidence += entities.length * 3 // More emotional entities = higher confidence
  confidence += text.includes("!") ? 5 : 0 // Exclamation marks
  confidence += /\b(I|me|my|feel|think|believe)\b/i.test(text) ? 8 : 0 // Personal language
  confidence += /\b(very|extremely|incredibly|absolutely)\b/i.test(text) ? 4 : 0 // Intensifiers

  // Cap at 99%
  return Math.min(confidence, 99)
}

// Helper functions for factual analysis
function extractFactualClaims(text: string): string[] {
  const claims: string[] = []

  // Look for numerical claims
  const numberMatches = text.match(/\d+(\.\d+)?%?/g)
  if (numberMatches) {
    claims.push(...numberMatches.map((match) => `Numerical claim: ${match}`))
  }

  // Look for date claims
  const dateMatches = text.match(
    /\b(19|20)\d{2}\b|\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+\d{1,2},?\s+\d{4}\b/g,
  )
  if (dateMatches) {
    claims.push(...dateMatches.map((match) => `Date claim: ${match}`))
  }

  // Look for research citations
  const citationMatches = text.match(/according to [^.]+|research shows [^.]+|study found [^.]+/gi)
  if (citationMatches) {
    claims.push(...citationMatches.map((match) => `Research claim: ${match}`))
  }

  return claims
}

function determineFactualVerdict(text: string, claims: string[]): "true" | "false" | "unsure" {
  // Simulate fact-checking logic
  const hasStrongEvidence = claims.length >= 2
  const hasNumbers = /\d/.test(text)
  const hasCitations = /according to|research shows|study found/i.test(text)

  // Random factor to simulate uncertainty in fact-checking
  const randomFactor = Math.random()

  if (hasStrongEvidence && hasCitations && hasNumbers) {
    return randomFactor > 0.2 ? "true" : "unsure"
  } else if (hasNumbers || hasCitations) {
    return randomFactor > 0.4 ? (randomFactor > 0.7 ? "true" : "unsure") : "false"
  } else {
    return randomFactor > 0.6 ? "unsure" : "false"
  }
}

function calculateFactualConfidence(text: string, claims: string[], verdict: string): number {
  let confidence = 75 // Base confidence

  // Boost confidence based on factual indicators
  confidence += claims.length * 4 // More claims = higher confidence
  confidence += /\d+(\.\d+)?%/.test(text) ? 6 : 0 // Percentages
  confidence += /according to|research shows|study found/i.test(text) ? 10 : 0 // Citations
  confidence += text.length > 100 ? 3 : 0 // Longer text tends to be more detailed

  // Adjust based on verdict certainty
  if (verdict === "unsure") {
    confidence = Math.max(confidence - 15, 60) // Lower confidence for uncertain verdicts
  }

  // Cap at 99%
  return Math.min(confidence, 99)
}

// Main analysis function that simulates the complete pipeline
export function analyzeText(text: string): Promise<AnalysisResult[]> {
  return new Promise((resolve) => {
    // Simulate processing delay
    setTimeout(() => {
      // Check if text matches any static questions
      const staticResult = findStaticAnswer(text)
      if (staticResult) {
        resolve([staticResult])
        return
      }

      // Fallback to original dynamic analysis
      const classification = performTriageClassification(text)
      let result: AnalysisResult
      if (classification === "emotion") {
        result = performEmotionalAnalysis(text)
      } else {
        result = performFactualAnalysis(text)
      }
      resolve([result])
    }, 1500) // Simulate 1.5 second processing time
  })
}

// Utility functions
function generateId(): string {
  return Math.random().toString(36).substr(2, 9)
}

// Export sample texts for testing
export const sampleTexts = {
  factual: [
    "Climate change has caused global temperatures to rise by approximately 1.1°C since pre-industrial times, according to NASA data.",
    "The stock market closed at 4,500 points today, representing a 2.3% increase from yesterday's closing price.",
    "Research conducted by Stanford University in 2023 found that 73% of participants showed improved cognitive function after the treatment.",
    "The population of Tokyo is approximately 14 million people as of 2024, making it one of the world's largest metropolitan areas.",
  ],
  emotional: [
    "I absolutely love this new restaurant! The food is amazing and the service is incredible.",
    "This movie was a complete disaster. I can't believe I wasted two hours of my life watching it.",
    "I'm so excited about my upcoming vacation! It's going to be the best trip ever.",
    "I hate how crowded the subway gets during rush hour. It's absolutely terrible and makes me so frustrated.",
  ],
}

export const staticQuestions = {
  factual: [
    {
      question: "The Great Wall of China is visible from space with the naked eye",
      answer: false,
      confidence: 92,
      explanation:
        "This is a common myth. The Great Wall is not visible from space with the naked eye, as confirmed by multiple astronauts and space agencies.",
      source:
        "NASA - https://www.nasa.gov/audience/forstudents/k-4/stories/nasa-knows/what-is-the-great-wall-of-china-k4.html",
      claims: ["Visibility claim: Great Wall from space", "Architectural claim: Wall dimensions"],
    },
    {
      question: "Water boils at 100 degrees Celsius at sea level",
      answer: true,
      confidence: 98,
      explanation:
        "At standard atmospheric pressure (1 atmosphere or 101.325 kPa), pure water boils at exactly 100°C (212°F).",
      source: "Encyclopedia Britannica - https://www.britannica.com/science/boiling-point",
      claims: ["Temperature claim: 100°C", "Pressure claim: sea level conditions"],
    },
    {
      question: "Humans only use 10% of their brain",
      answer: false,
      confidence: 95,
      explanation:
        "Neuroimaging shows that humans use virtually every part of the brain, and most of the brain is active almost all the time.",
      source:
        "Scientific American - https://www.scientificamerican.com/article/do-people-only-use-10-percent-of-their-brains/",
      claims: ["Percentage claim: 10%", "Neurological claim: brain usage"],
    },
    {
      question: "The Earth's core temperature is approximately 6000°C",
      answer: true,
      confidence: 87,
      explanation:
        "The Earth's inner core temperature is estimated to be around 5700-6000°C, similar to the surface temperature of the Sun.",
      source: "Nature Geoscience - https://www.nature.com/articles/ngeo1219",
      claims: ["Temperature claim: 6000°C", "Geological claim: Earth's core"],
    },
    {
      question: "Lightning never strikes the same place twice",
      answer: false,
      confidence: 94,
      explanation:
        "Lightning frequently strikes the same location multiple times, especially tall structures like skyscrapers and towers.",
      source: "National Weather Service - https://www.weather.gov/safety/lightning-myths",
      claims: ["Frequency claim: lightning strikes", "Location claim: same place"],
    },
    {
      question: "Antibiotics are effective against viral infections",
      answer: false,
      confidence: 96,
      explanation:
        "Antibiotics only work against bacterial infections, not viral infections like the common cold or flu.",
      source: "CDC - https://www.cdc.gov/antibiotic-use/community/about/antibiotic-resistance-faqs.html",
      claims: ["Medical claim: antibiotic effectiveness", "Pathogen claim: viral vs bacterial"],
    },
    {
      question: "The human body contains approximately 37 trillion cells",
      answer: true,
      confidence: 85,
      explanation:
        "Recent scientific estimates suggest the human body contains approximately 37.2 trillion cells, though this number varies by individual.",
      source: "PLOS Biology - https://journals.plos.org/plosbiology/article?id=10.1371/journal.pbio.1002533",
      claims: ["Numerical claim: 37 trillion", "Biological claim: human cell count"],
    },
    {
      question: "Gold is heavier than lead",
      answer: true,
      confidence: 99,
      explanation:
        "Gold has a density of 19.3 g/cm³ while lead has a density of 11.3 g/cm³, making gold significantly heavier.",
      source: "Royal Society of Chemistry - https://www.rsc.org/periodic-table/element/79/gold",
      claims: ["Density claim: gold vs lead", "Physical property claim: weight comparison"],
    },
  ],
  emotional: [
    {
      question: "This movie is absolutely terrible and a waste of time",
      answer: "negative",
      confidence: 91,
      explanation:
        "Strong negative sentiment with emotional language including 'absolutely terrible' and 'waste of time'.",
      entities: ["terrible", "waste", "absolutely"],
      sentiment: "negative",
      source: "Sentiment analysis based on emotional language patterns",
    },
    {
      question: "I love spending time with my family during holidays",
      answer: "positive",
      confidence: 88,
      explanation: "Positive emotional expression with personal attachment and affection towards family activities.",
      entities: ["love", "family", "holidays"],
      sentiment: "positive",
      source: "Emotional pattern recognition for personal relationships",
    },
    {
      question: "The weather today is okay, nothing special",
      answer: "neutral",
      confidence: 76,
      explanation: "Neutral sentiment with mild indifference, lacking strong emotional indicators.",
      entities: ["okay", "nothing special"],
      sentiment: "neutral",
      source: "Neutral sentiment classification based on moderate language",
    },
  ],
}

function findStaticAnswer(text: string): AnalysisResult | null {
  const normalizedText = text.toLowerCase().trim()

  // Check factual questions
  for (const item of staticQuestions.factual) {
    if (normalizedText.includes(item.question.toLowerCase()) || item.question.toLowerCase().includes(normalizedText)) {
      return {
        id: generateId(),
        type: "fact",
        classification: "Factual Statement",
        content: `${item.explanation} This claim is ${item.answer ? "TRUE" : "FALSE"}.`,
        confidence: item.confidence,
        details: `RoBERTa fact-checker analyzed this claim against verified sources. ${item.claims.length} factual claims were identified and cross-referenced with reliable databases. Source verification completed with ${item.confidence}% confidence.`,
        model: "RoBERTa Fact-Checker",
        verdict: item.answer ? "true" : "false",
        factualClaims: item.claims,
        source: item.source,
      }
    }
  }

  // Check emotional questions
  for (const item of staticQuestions.emotional) {
    if (normalizedText.includes(item.question.toLowerCase()) || item.question.toLowerCase().includes(normalizedText)) {
      return {
        id: generateId(),
        type: "emotion",
        classification: "Emotional Opinion",
        content: `${item.explanation} Overall sentiment: ${item.sentiment}.`,
        confidence: item.confidence,
        details: `NER sentiment analyzer identified ${item.entities.length} emotional entities and classified the overall sentiment as ${item.sentiment}. Emotional intensity analysis shows ${item.confidence > 85 ? "high" : item.confidence > 70 ? "moderate" : "low"} confidence in this classification.`,
        model: "NER Sentiment Analyzer",
        entities: item.entities,
        sentiment: item.sentiment as "positive" | "negative" | "neutral",
        source: item.source,
      }
    }
  }

  return null
}

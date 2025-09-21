import Link from "next/link"

export default function Footer() {
  return (
    <footer className="py-12 px-4 border-t border-border bg-muted/10">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h3 className="font-poppins text-2xl font-bold text-primary text-glow-aqua">Krivya</h3>
            <p className="font-montserrat text-muted-foreground mt-2">Fighting misinformation together</p>
          </div>
          <div className="flex gap-6">
            <Link
              href="/about"
              className="font-montserrat text-muted-foreground hover:text-primary hover:text-glow-aqua transition-all duration-300"
            >
              Privacy Policy
            </Link>
            <Link
              href="/about"
              className="font-montserrat text-muted-foreground hover:text-secondary hover:text-glow-blue transition-all duration-300"
            >
              Terms of Service
            </Link>
            <Link
              href="/contact"
              className="font-montserrat text-muted-foreground hover:text-accent hover:text-glow-green transition-all duration-300"
            >
              Contact
            </Link>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="font-montserrat text-muted-foreground">
            © 2024 Krivya. Built for the future of information integrity.
          </p>
        </div>
      </div>
    </footer>
  )
}

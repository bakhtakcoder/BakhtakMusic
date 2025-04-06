import Link from "next/link"
import Image from "next/image"
import { Headphones, Github, Twitter, Linkedin, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import MobileMenu from "@/components/mobile-menu"

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-purple-950">
      <header className="container mx-auto py-4 md:py-6 px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Headphones className="h-6 w-6 md:h-8 md:w-8 text-purple-400" />
          <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
            Bakhtak Music
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-white hover:text-purple-400 transition-colors">
            Home
          </Link>
          <Link href="/effects" className="text-white hover:text-purple-400 transition-colors">
            Effects
          </Link>
          <Link href="/about" className="text-white hover:text-purple-400 transition-colors">
            About
          </Link>
        </nav>
        <MobileMenu />
      </header>

      <div className="container mx-auto px-4 py-6 md:py-12">
        <div className="mb-8 md:mb-12 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 md:mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
              About Bakhtak Music
            </span>
          </h1>
          <p className="text-sm md:text-xl text-white/80 max-w-2xl mx-auto">
            Professional audio effects platform developed by Wahab Khan
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-center mb-8 md:mb-16">
          <div className="bg-purple-900/20 rounded-xl p-4 md:p-8">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4">Our Mission</h2>
            <p className="text-sm md:text-base text-white/80 mb-3 md:mb-4">
              Bakhtak Music was created with a simple yet powerful mission: to provide musicians, producers, and audio
              enthusiasts with professional-grade audio effects that are accessible, intuitive, and inspiring.
            </p>
            <p className="text-sm md:text-base text-white/80 mb-3 md:mb-4">
              We believe that audio transformation should be available to everyone, regardless of technical expertise or
              budget constraints. Our platform offers 50 unique audio effects that can transform any sound into
              something magical.
            </p>
            <p className="text-sm md:text-base text-white/80">
              Whether you're a professional music producer looking for that perfect sound or a hobbyist experimenting
              with audio, Bakhtak Music has the tools you need to bring your creative vision to life.
            </p>
          </div>

          <div className="bg-purple-900/20 rounded-xl p-4 md:p-8">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4">About the Developer</h2>
            <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
              <div className="relative h-16 w-16 md:h-20 md:w-20 rounded-full overflow-hidden">
                <Image
                  src="/images/developer.png"
                  alt="Wahab Khan"
                  width={80}
                  height={80}
                  className="object-cover w-full h-full"
                  priority
                />
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-bold text-white">Wahab Khan</h3>
                <p className="text-sm md:text-base text-purple-300">Audio Engineer & Developer</p>
              </div>
            </div>
            <p className="text-sm md:text-base text-white/80 mb-3 md:mb-4">
              Wahab Khan is an experienced audio engineer and web developer with a passion for creating innovative audio
              tools. With over 10 years of experience in audio processing and software development, Wahab has combined
              his expertise to create Bakhtak Music.
            </p>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-purple-800/50 rounded-full h-8 w-8 md:h-10 md:w-10"
              >
                <Github className="h-4 w-4 md:h-5 md:w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-purple-800/50 rounded-full h-8 w-8 md:h-10 md:w-10"
              >
                <Twitter className="h-4 w-4 md:h-5 md:w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-purple-800/50 rounded-full h-8 w-8 md:h-10 md:w-10"
              >
                <Linkedin className="h-4 w-4 md:h-5 md:w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-purple-800/50 rounded-full h-8 w-8 md:h-10 md:w-10"
              >
                <Mail className="h-4 w-4 md:h-5 md:w-5" />
              </Button>
            </div>
          </div>
        </div>

        <div className="bg-purple-900/20 rounded-xl p-4 md:p-8 mb-8 md:mb-12">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4 text-center">Technology Stack</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            <div className="bg-purple-800/30 rounded-lg p-3 md:p-4 text-center">
              <h3 className="text-sm md:text-base text-white font-bold mb-1 md:mb-2">Web Audio API</h3>
              <p className="text-xs md:text-sm text-purple-300">Real-time audio processing</p>
            </div>
            <div className="bg-purple-800/30 rounded-lg p-3 md:p-4 text-center">
              <h3 className="text-sm md:text-base text-white font-bold mb-1 md:mb-2">Next.js</h3>
              <p className="text-xs md:text-sm text-purple-300">React framework</p>
            </div>
            <div className="bg-purple-800/30 rounded-lg p-3 md:p-4 text-center">
              <h3 className="text-sm md:text-base text-white font-bold mb-1 md:mb-2">Framer Motion</h3>
              <p className="text-xs md:text-sm text-purple-300">Animation library</p>
            </div>
            <div className="bg-purple-800/30 rounded-lg p-3 md:p-4 text-center">
              <h3 className="text-sm md:text-base text-white font-bold mb-1 md:mb-2">Tailwind CSS</h3>
              <p className="text-xs md:text-sm text-purple-300">Utility-first CSS</p>
            </div>
          </div>
        </div>
      </div>

      <footer className="container mx-auto py-6 md:py-8 px-4 border-t border-purple-900 text-center text-white/60 text-xs md:text-sm">
        <p>© 2024 Bakhtak Music. Developed by Wahab Khan. All rights reserved.</p>
      </footer>
    </main>
  )
}


"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { useAudioContext } from "@/context/audio-context"

export default function AudioPlayer() {
  const {
    audioUrl,
    isPlaying,
    togglePlay,
    currentTime,
    duration,
    setCurrentTime,
    volume,
    setVolume,
    isMuted,
    toggleMute,
    activeEffects,
    downloadProcessedAudio,
  } = useAudioContext()

  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const animationRef = useRef<number | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const sourceNodeRef = useRef<MediaElementAudioSourceNode | null>(null)

  // Set up audio visualization
  useEffect(() => {
    if (!canvasRef.current || !audioUrl) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")

    if (!ctx) return

    // Set up canvas
    canvas.width = canvas.clientWidth * window.devicePixelRatio
    canvas.height = canvas.clientHeight * window.devicePixelRatio

    // Create a separate audio context just for visualization
    if (!audioContextRef.current) {
      try {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
      } catch (error) {
        console.error("Error creating audio context for visualization:", error)
        return
      }
    }

    // Create analyser node
    if (!analyserRef.current) {
      analyserRef.current = audioContextRef.current.createAnalyser()
      analyserRef.current.fftSize = 256
    }

    const analyser = analyserRef.current
    const bufferLength = analyser.frequencyBinCount
    const dataArray = new Uint8Array(bufferLength)

    // Enhanced visualization with more dynamic elements
    const draw = () => {
      animationRef.current = requestAnimationFrame(draw)

      // Generate random data for visualization when no audio is playing
      for (let i = 0; i < bufferLength; i++) {
        // If playing, create more active visualization
        if (isPlaying) {
          dataArray[i] = Math.random() * 150 + 50 + Math.sin(i * 0.1 + Date.now() * 0.001) * 30
        } else {
          dataArray[i] = Math.random() * 50 + 10 + Math.sin(i * 0.05 + Date.now() * 0.0005) * 10
        }
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const barWidth = (canvas.width / bufferLength) * 2.5
      let x = 0

      for (let i = 0; i < bufferLength; i++) {
        const barHeight = (dataArray[i] / 255) * canvas.height

        // Create more vibrant gradient with multiple color stops
        const gradient = ctx.createLinearGradient(0, canvas.height, 0, canvas.height - barHeight)
        gradient.addColorStop(0, "#ec4899") // Pink
        gradient.addColorStop(0.4, "#d946ef") // Fuchsia
        gradient.addColorStop(0.8, "#a855f7") // Purple
        gradient.addColorStop(1, "#8b5cf6") // Violet

        ctx.fillStyle = gradient

        // Add rounded corners to bars
        const radius = Math.min(barWidth / 2, barHeight / 2, 10)
        ctx.beginPath()
        ctx.moveTo(x + radius, canvas.height)
        ctx.lineTo(x + barWidth - radius, canvas.height)
        ctx.quadraticCurveTo(x + barWidth, canvas.height, x + barWidth, canvas.height - radius)
        ctx.lineTo(x + barWidth, canvas.height - barHeight + radius)
        ctx.quadraticCurveTo(x + barWidth, canvas.height - barHeight, x + barWidth - radius, canvas.height - barHeight)
        ctx.lineTo(x + radius, canvas.height - barHeight)
        ctx.quadraticCurveTo(x, canvas.height - barHeight, x, canvas.height - barHeight + radius)
        ctx.lineTo(x, canvas.height - radius)
        ctx.quadraticCurveTo(x, canvas.height, x + radius, canvas.height)
        ctx.fill()

        // Add glow effect
        ctx.shadowColor = "#a855f7"
        ctx.shadowBlur = 15
        ctx.shadowOffsetX = 0
        ctx.shadowOffsetY = 0

        x += barWidth + 1
      }
    }

    draw()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [audioUrl, isPlaying])

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (audioContextRef.current && audioContextRef.current.state !== "closed") {
        audioContextRef.current.close()
      }
    }
  }, [])

  const handleSeek = (value: number[]) => {
    const newTime = value[0]
    setCurrentTime(newTime)
  }

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0]
    setVolume(newVolume)
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }

  return (
    <motion.div
      className="mb-8 md:mb-12 bg-purple-900/20 rounded-xl p-4 md:p-6 backdrop-blur-sm shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className="mb-4 md:mb-6">
        <canvas ref={canvasRef} className="w-full h-16 md:h-24 rounded-lg bg-purple-900/30" />
      </div>

      <div className="flex items-center gap-2 mb-4">
        <span className="text-xs md:text-sm text-white">{formatTime(currentTime)}</span>
        <Slider
          value={[currentTime]}
          max={duration || 100}
          step={0.1}
          onValueChange={handleSeek}
          className="flex-1 mx-2"
          disabled={!audioUrl}
        />
        <span className="text-xs md:text-sm text-white">{formatTime(duration)}</span>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center justify-center md:justify-start gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-purple-800/50 h-8 w-8 md:h-10 md:w-10"
            disabled={!audioUrl}
          >
            <SkipBack className="h-4 w-4 md:h-5 md:w-5" />
          </Button>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button
              variant="default"
              size="icon"
              className={`${audioUrl ? "bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700" : "bg-purple-800/50"} rounded-full h-10 w-10 md:h-12 md:w-12 shadow-lg`}
              onClick={togglePlay}
              disabled={!audioUrl}
            >
              {isPlaying ? <Pause className="h-4 w-4 md:h-5 md:w-5" /> : <Play className="h-4 w-4 md:h-5 md:w-5" />}
            </Button>
          </motion.div>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-purple-800/50 h-8 w-8 md:h-10 md:w-10"
            disabled={!audioUrl}
          >
            <SkipForward className="h-4 w-4 md:h-5 md:w-5" />
          </Button>
        </div>

        <div className="flex items-center justify-between md:justify-end gap-2">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-purple-800/50 h-8 w-8 md:h-10 md:w-10"
              onClick={toggleMute}
              disabled={!audioUrl}
            >
              {isMuted ? <VolumeX className="h-4 w-4 md:h-5 md:w-5" /> : <Volume2 className="h-4 w-4 md:h-5 md:w-5" />}
            </Button>
            <Slider
              value={[isMuted ? 0 : volume]}
              max={1}
              step={0.01}
              onValueChange={handleVolumeChange}
              className="w-16 md:w-24"
              disabled={!audioUrl}
            />
          </div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="ml-2">
            <Button
              variant="outline"
              className="text-purple-400 border-purple-500 hover:bg-purple-800/50 text-xs md:text-sm h-8 md:h-10 px-2 md:px-4"
              onClick={downloadProcessedAudio}
              disabled={!audioUrl}
              title="Download processed audio"
            >
              <Download className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
              <span>Download MP3</span>
            </Button>
          </motion.div>
        </div>
      </div>

      {activeEffects.length > 0 && (
        <motion.div
          className="mt-4 flex flex-wrap gap-2"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.3 }}
        >
          {activeEffects.map((effect) => (
            <motion.div
              key={effect.id}
              className="bg-purple-500/30 text-white text-xs px-2 py-1 rounded-full"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 10 }}
            >
              {effect.name}
            </motion.div>
          ))}
        </motion.div>
      )}

      {!audioUrl && (
        <div className="mt-4 text-center text-purple-300 text-xs md:text-sm">Upload an audio file to start playing</div>
      )}
    </motion.div>
  )
}


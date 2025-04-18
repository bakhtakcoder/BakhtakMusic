"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Volume2,
  Music,
  Waves,
  Zap,
  Radio,
  Mic2,
  Headphones,
  Disc,
  Wand2,
  Sparkles,
  Gauge,
  Vibrate,
  Phone,
  Megaphone,
  Tv2,
  Mic,
  Shuffle,
  Repeat,
  Rewind,
  FastForward,
  Bluetooth,
  Smartphone,
  Laptop,
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAudioContext } from "@/context/audio-context"

// Define all 50 audio effects
const allEffects = [
  { id: 1, name: "Bass Boost", icon: <Volume2 />, description: "Enhance low frequencies", category: "basic" },
  { id: 2, name: "8D Audio", icon: <Headphones />, description: "Rotating spatial effect", category: "spatial" },
  { id: 3, name: "Reverb", icon: <Waves />, description: "Add spacious echoes", category: "basic" },
  { id: 4, name: "Nightcore", icon: <Zap />, description: "Speed up and pitch shift", category: "basic" },
  { id: 5, name: "Vaporwave", icon: <Radio />, description: "Slow down and deepen", category: "basic" },
  { id: 6, name: "Distortion", icon: <Zap />, description: "Add grit and crunch", category: "basic" },
  { id: 7, name: "Telephone", icon: <Phone />, description: "Old phone filter", category: "basic" },
  { id: 8, name: "Lo-Fi", icon: <Radio />, description: "Vintage quality", category: "basic" },
  { id: 9, name: "Pitch Shift Up", icon: <Music />, description: "Increase pitch", category: "basic" },
  { id: 10, name: "Pitch Shift Down", icon: <Music />, description: "Decrease pitch", category: "basic" },
  { id: 11, name: "Chorus", icon: <Mic2 />, description: "Vocal thickening", category: "basic" },
  { id: 12, name: "Tremolo", icon: <Vibrate />, description: "Amplitude variation", category: "basic" },
  { id: 13, name: "Vibrato", icon: <Vibrate />, description: "Pitch variation", category: "basic" },
  { id: 14, name: "Compressor", icon: <Gauge />, description: "Dynamic control", category: "basic" },
  { id: 15, name: "Delay", icon: <Repeat />, description: "Echo effect", category: "basic" },
  { id: 16, name: "Stereo Widener", icon: <Headphones />, description: "Expand stereo field", category: "spatial" },
  { id: 17, name: "Vinyl", icon: <Disc />, description: "Record player effect", category: "retro" },
  { id: 18, name: "AM Radio", icon: <Radio />, description: "Old radio effect", category: "retro" },
  { id: 19, name: "Bitcrusher", icon: <Laptop />, description: "Reduce bit depth", category: "experimental" },
  { id: 20, name: "Underwater", icon: <Waves />, description: "Submerged sound effect", category: "experimental" },
  { id: 21, name: "Auto-Tune", icon: <Mic />, description: "Pitch correction", category: "vocal" },
  { id: 22, name: "Vocoder", icon: <Mic2 />, description: "Robot voice effect", category: "vocal" },
  { id: 23, name: "Harmonizer", icon: <Music />, description: "Add harmonies", category: "vocal" },
  { id: 24, name: "Voice Changer", icon: <Mic />, description: "Alter voice characteristics", category: "vocal" },
  { id: 25, name: "Whisper", icon: <Mic />, description: "Quiet vocal effect", category: "vocal" },
  { id: 26, name: "Megaphone", icon: <Megaphone />, description: "Loud announcement effect", category: "vocal" },
  { id: 27, name: "Chipmunk", icon: <Mic />, description: "High-pitched voice", category: "vocal" },
  { id: 28, name: "Monster Voice", icon: <Mic />, description: "Deep scary voice", category: "vocal" },
  { id: 29, name: "Mono to Stereo", icon: <Headphones />, description: "Convert mono to stereo", category: "spatial" },
  {
    id: 30,
    name: "Binaural Beat",
    icon: <Headphones />,
    description: "Create frequency difference",
    category: "spatial",
  },
  { id: 31, name: "Ambisonic", icon: <Headphones />, description: "Full-sphere surround", category: "spatial" },
  { id: 32, name: "HRTF", icon: <Headphones />, description: "Head-related transfer function", category: "spatial" },
  { id: 33, name: "Tape Saturation", icon: <Radio />, description: "Analog tape warmth", category: "retro" },
  { id: 34, name: "Cassette", icon: <Radio />, description: "Tape deck sound", category: "retro" },
  { id: 35, name: "VHS Audio", icon: <Tv2 />, description: "Video tape audio quality", category: "retro" },
  { id: 36, name: "Granular", icon: <Sparkles />, description: "Grain synthesis", category: "experimental" },
  { id: 37, name: "Reverse", icon: <Rewind />, description: "Play backwards", category: "experimental" },
  { id: 38, name: "Glitch", icon: <Zap />, description: "Digital artifacts", category: "experimental" },
  { id: 39, name: "Stutter", icon: <Repeat />, description: "Rapid repetition", category: "experimental" },
  {
    id: 40,
    name: "Time Stretch",
    icon: <FastForward />,
    description: "Change speed without pitch",
    category: "experimental",
  },
  { id: 41, name: "Formant Shift", icon: <Music />, description: "Alter vocal formants", category: "vocal" },
  { id: 42, name: "Autotune Extreme", icon: <Mic />, description: "Heavy pitch correction", category: "vocal" },
  {
    id: 43,
    name: "Bluetooth Quality",
    icon: <Bluetooth />,
    description: "Bluetooth audio simulation",
    category: "retro",
  },
  { id: 44, name: "Phone Call", icon: <Smartphone />, description: "Mobile call quality", category: "retro" },
  { id: 45, name: "Stadium Echo", icon: <Waves />, description: "Large venue reverb", category: "spatial" },
  { id: 46, name: "Cathedral", icon: <Waves />, description: "Church acoustics", category: "spatial" },
  { id: 47, name: "Random FX", icon: <Shuffle />, description: "Apply random effects", category: "experimental" },
  { id: 48, name: "Custom Chain", icon: <Wand2 />, description: "Create effect chain", category: "experimental" },
  {
    id: 49,
    name: "Pitch Stretch",
    icon: <Music />,
    description: "Change pitch without speed",
    category: "experimental",
  },
  { id: 50, name: "Flanger", icon: <Waves />, description: "Swirling effect", category: "basic" },
]

export default function EffectsGrid() {
  const [activeTab, setActiveTab] = useState("all")
  const { availableEffects, activeEffects, toggleEffect, audioUrl } = useAudioContext()

  const filteredEffects =
    activeTab === "all" ? allEffects : allEffects.filter((effect) => effect.category === activeTab)

  // Map available effects to their IDs for easy lookup
  const availableEffectIds = availableEffects.map((effect) => effect.id)
  const activeEffectIds = activeEffects.map((effect) => effect.id)

  // Animation variants for grid items
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-white">Audio Effects</h2>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <div className="overflow-x-auto pb-2">
          <TabsList className="grid grid-cols-6 min-w-[500px] mb-4 md:mb-6 bg-purple-900/30">
            <TabsTrigger value="all" className="text-xs md:text-sm">
              All
            </TabsTrigger>
            <TabsTrigger value="basic" className="text-xs md:text-sm">
              Basic
            </TabsTrigger>
            <TabsTrigger value="vocal" className="text-xs md:text-sm">
              Vocal
            </TabsTrigger>
            <TabsTrigger value="spatial" className="text-xs md:text-sm">
              Spatial
            </TabsTrigger>
            <TabsTrigger value="retro" className="text-xs md:text-sm">
              Retro
            </TabsTrigger>
            <TabsTrigger value="experimental" className="text-xs md:text-sm">
              Experimental
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value={activeTab} className="mt-0">
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-4"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {filteredEffects.map((effect) => {
              const isAvailable = availableEffectIds.includes(effect.id)
              const isActive = activeEffectIds.includes(effect.id)

              return (
                <motion.div
                  key={effect.id}
                  className={`${
                    isActive ? "bg-purple-600/40 hover:bg-purple-600/50" : "bg-purple-900/30 hover:bg-purple-800/40"
                  } rounded-xl p-3 md:p-4 cursor-pointer transition-colors ${
                    !isAvailable || !audioUrl ? "opacity-50 pointer-events-none" : ""
                  }`}
                  variants={item}
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(124, 58, 237, 0.5)" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => isAvailable && toggleEffect(effect.id)}
                >
                  <div className="flex flex-col items-center text-center">
                    <motion.div
                      className={`h-8 w-8 md:h-12 md:w-12 rounded-full ${
                        isActive
                          ? "bg-gradient-to-br from-purple-400 to-pink-500"
                          : "bg-gradient-to-br from-purple-500 to-pink-600"
                      } flex items-center justify-center text-white mb-2 md:mb-3`}
                      whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      {effect.icon}
                    </motion.div>
                    <h3 className="text-white text-xs md:text-base font-medium mb-0.5 md:mb-1">{effect.name}</h3>
                    <p className="text-purple-300 text-[10px] md:text-xs">{effect.description}</p>
                    {isActive && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="mt-1 md:mt-2 text-[10px] md:text-xs bg-purple-500/30 px-2 py-0.5 rounded-full text-white"
                      >
                        Active
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}


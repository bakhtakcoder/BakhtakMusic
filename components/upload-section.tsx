"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Upload, FileAudio } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAudioContext } from "@/context/audio-context"

export default function UploadSection() {
  const [isDragging, setIsDragging] = useState(false)
  const { audioFile, setAudioFile } = useAudioContext()

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0]
      if (droppedFile.type.includes("audio")) {
        setAudioFile(droppedFile)
      }
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAudioFile(e.target.files[0])
    }
  }

  return (
    <motion.div
      className="mb-8 md:mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6 text-center">Upload Your Audio</h2>
      <div className="grid md:grid-cols-2 gap-4 md:gap-8">
        <div
          className={`border-2 border-dashed rounded-xl p-4 md:p-8 flex flex-col items-center justify-center h-48 md:h-64 transition-colors ${
            isDragging ? "border-purple-400 bg-purple-900/20" : "border-purple-800 hover:border-purple-600"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input type="file" id="audio-upload" className="hidden" accept="audio/*" onChange={handleFileChange} />
          <FileAudio className="h-8 w-8 md:h-12 md:w-12 text-purple-400 mb-2 md:mb-4" />
          <p className="text-sm md:text-base text-white text-center mb-2 md:mb-4">Click to upload or drag and drop</p>
          <p className="text-xs md:text-sm text-purple-400 text-center mb-4 md:mb-6">MP3, WAV, FLAC or OGG</p>
          <Button
            variant="outline"
            className="border-purple-500 text-purple-400 hover:bg-purple-900/50 text-xs md:text-sm"
            onClick={() => document.getElementById("audio-upload")?.click()}
          >
            <Upload className="mr-2 h-3 w-3 md:h-4 md:w-4" />
            Select File
          </Button>
        </div>

        <div className="bg-purple-900/20 rounded-xl p-4 md:p-6 flex flex-col justify-center">
          {audioFile ? (
            <div>
              <h3 className="text-lg md:text-xl font-medium text-white mb-2">File Ready</h3>
              <p className="text-sm md:text-base text-purple-300 mb-4 truncate">{audioFile.name}</p>
              <div className="h-2 bg-purple-900 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-purple-400 to-pink-500 w-full"></div>
              </div>
              <p className="text-xs md:text-sm text-purple-400 mt-2">Ready to apply effects</p>
            </div>
          ) : (
            <div className="text-center text-white/60">
              <p className="text-sm md:text-base">No file selected</p>
              <p className="text-xs md:text-sm mt-2">Upload an audio file to get started</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}


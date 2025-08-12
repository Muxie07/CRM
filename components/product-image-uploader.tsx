"use client"

import type React from "react"

import { useState, useRef } from "react"
import Image from "next/image"
import { X, Upload, Star, StarOff } from "lucide-react"
import { validateImageFile, createImagePreview } from "@/utils/image-handler"

interface ProductImage {
  id: string
  url: string
  file?: File
  isPrimary: boolean
}

interface ProductImageUploaderProps {
  initialImages?: ProductImage[]
  onChange: (images: ProductImage[]) => void
}

export function ProductImageUploader({ initialImages = [], onChange }: ProductImageUploaderProps) {
  const [images, setImages] = useState<ProductImage[]>(initialImages)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return

    setError(null)
    const file = e.target.files[0]

    // Validate file
    const validation = validateImageFile(file)
    if (!validation.valid) {
      setError(validation.error || "Invalid file")
      return
    }

    try {
      // Create preview
      const preview = await createImagePreview(file)

      // Create new image object
      const newImage: ProductImage = {
        id: `temp-${Date.now()}`,
        url: preview,
        file: file,
        isPrimary: images.length === 0, // Make primary if it's the first image
      }

      // Update images
      const updatedImages = [...images, newImage]
      setImages(updatedImages)
      onChange(updatedImages)

      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    } catch (err) {
      setError("Failed to process image")
      console.error(err)
    }
  }

  const removeImage = (id: string) => {
    const updatedImages = images.filter((img) => img.id !== id)

    // If we removed the primary image, make the first remaining image primary
    if (images.find((img) => img.id === id)?.isPrimary && updatedImages.length > 0) {
      updatedImages[0].isPrimary = true
    }

    setImages(updatedImages)
    onChange(updatedImages)
  }

  const setPrimaryImage = (id: string) => {
    const updatedImages = images.map((img) => ({
      ...img,
      isPrimary: img.id === id,
    }))

    setImages(updatedImages)
    onChange(updatedImages)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        {images.map((image) => (
          <div key={image.id} className="relative group border rounded-md overflow-hidden w-32 h-32">
            <Image
              src={image.url && image.url.trim() !== "" ? image.url : "/placeholder.svg"}
              alt="Product image"
              width={128}
              height={128}
              className="object-cover w-full h-full"
            />

            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
              <button
                type="button"
                onClick={() => removeImage(image.id)}
                className="p-1 bg-red-500 text-white rounded-full"
                aria-label="Remove image"
              >
                <X className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setPrimaryImage(image.id)}
                className={`p-1 ml-2 rounded-full ${
                  image.isPrimary ? "bg-yellow-500 text-white" : "bg-gray-200 text-gray-700"
                }`}
                aria-label={image.isPrimary ? "Primary image" : "Set as primary image"}
              >
                {image.isPrimary ? <Star className="w-4 h-4" /> : <StarOff className="w-4 h-4" />}
              </button>
            </div>

            {image.isPrimary && (
              <div className="absolute top-1 right-1 bg-yellow-500 text-white text-xs px-1 py-0.5 rounded">Primary</div>
            )}
          </div>
        ))}

        <div
          className="border-2 border-dashed border-gray-300 rounded-md w-32 h-32 flex flex-col items-center justify-center cursor-pointer hover:border-gray-400"
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="w-8 h-8 text-gray-400" />
          <span className="text-sm text-gray-500 mt-2">Add Image</span>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            accept="image/jpeg,image/png,image/gif,image/webp"
            className="hidden"
          />
        </div>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <p className="text-sm text-gray-500">
        Upload JPG, PNG, GIF, or WebP images (max 5MB). First image or starred image will be used as the primary product
        image.
      </p>
    </div>
  )
}

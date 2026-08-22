"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"

interface PhoneInputProps {
  value: string
  onChange: (value: string) => void
  id?: string
  placeholder?: string
  className?: string
}

export function PhoneInput({ value, onChange, id, placeholder, className }: PhoneInputProps) {
  const [inputValue, setInputValue] = useState(value)

  useEffect(() => {
    setInputValue(value)
  }, [value])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Basic formatting - you can enhance this as needed
    const input = e.target.value.replace(/\D/g, "")
    let formatted = input

    // Simple US phone formatting as an example
    if (input.length > 0) {
      formatted = input.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3")
    }

    setInputValue(formatted)
    onChange(input) // Pass the raw number to parent
  }

  return (
    <Input
      type="tel"
      id={id}
      value={inputValue}
      onChange={handleChange}
      placeholder={placeholder}
      className={className}
    />
  )
}

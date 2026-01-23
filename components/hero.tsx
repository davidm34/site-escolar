"use client"

import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useEffect, useState } from "react"

function PaintbrushUnderline() {
  return (
    <svg
      className="absolute -bottom-3 left-0 w-full h-6"
      viewBox="0 0 300 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <path
        d="M2 12C20 6 40 10 60 8C80 6 100 12 120 10C140 8 160 5 180 7C200 9 220 14 240 11C260 8 280 6 298 10"
        stroke="#2563eb"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          filter: "url(#roughen)",
        }}
      />
      <defs>
        <filter id="roughen">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
    </svg>
  )
}

export function Hero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/fundo2.jpg"
          alt="Bull silhouette against city skyline"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Dark overlay for text legibility */}
        <div className="absolute inset-0 bg-[#0a1628]/70" />
      </div>

      <div className="relative mx-auto max-w-7xl text-center py-32">
        <h1
          className={`font-serif text-5xl md:text-7xl lg:text-8xl font-normal tracking-tight text-balance mb-8 leading-[1.1] text-white transition-all duration-700 ease-out ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
           Formando cidadãos para o mundo
          <br />
          {/* <span className="relative inline-block italic">
            Capital
            <PaintbrushUnderline />
          </span> */}
        </h1>

        <p
          className={`text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-14 text-pretty leading-relaxed transition-all duration-700 ease-out delay-200 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          As matrículas para o ano letivo de 2026 estão abertas. Ofereça uma educação que une valores humanos e excelência acadêmica para formar cidadãos do mundo.
        </p>

        <div
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 ease-out delay-[400ms] ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <Button
            size="lg"
            className="rounded-none px-14 min-h-[72px] w-[20%] text-base font-medium tracking-wide uppercase gap-3 bg-white text-[#0a1628] hover:bg-primary hover:text-white transition-colors duration-300"
          >
            Nos Contate
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}

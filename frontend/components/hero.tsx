"use client"

import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useEffect, useState } from "react"

export function Hero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    // Seção principal: min-h-screen para ocupar a tela toda, font-fredoka para aplicar a fonte
    <section className="relative min-h-[90vh] lg:min-h-screen w-full overflow-hidden font-fredoka flex items-center font-fredoka">
      
      {/* 1. IMAGEM DE FUNDO */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/images/j1.jpg" // IMPORTANTE: Certifique-se de que a imagem está nesta pasta
          alt="Criança com livro na cabeça e outras brincando ao fundo"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Overlay opcional: se a imagem for muito clara e dificultar a leitura do card branco, descomente a linha abaixo */}
        {/* <div className="absolute inset-0 bg-black/10" /> */}
      </div>

      {/* 2. CARD BRANCO FLUTUANTE */}
      {/* Usamos posicionamento absoluto e responsivo (lg:left-24, etc.) */}
      <div 
        className={`relative z-10 bg-white rounded-[40px] shadow-xl p-12 md:p-18 max-w-md lg:max-w-2xl mx-6 lg:mx-0 lg:left-24 lg:-translate-y-12 transition-all duration-1000 ease-out ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
        }`}
      >
        <h1
          // Cor azul escura da imagem
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-[#3F3D56] text-left"
        >
          Grandes Sonhos
        </h1>
        <h2
          // Cor amarela da imagem
          className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#FDC12D] mt-4 text-left"
        >
          Começam Aqui
        </h2>

        <div className="mt-8 flex justify-start">
          <Button
            size="lg"
            // Cor rosa e formato arredondado do botão da imagem
            className="rounded-full px-8 py-6 text-base md:text-lg font-bold tracking-wide bg-[#EC407A] hover:bg-[#d81b60] text-white transition-colors duration-300 shadow-md"
          >
            Agende uma Visita
          </Button>
        </div>
      </div>

    </section>
  )
}
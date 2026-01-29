"use client"

import { useRef } from "react"
import { ArrowRight, ArrowLeft, Heart, Sparkles, Star } from "lucide-react"
import { AnimateOnScroll } from "./animate-on-scroll"
import Image from "next/image"
import { Button } from "@/components/ui/button"

// Adicionei mais professores para o carrossel ter movimento
const teachers = [
  {
    name: "Tia Carol",
    role: "Coordenação",
    bio: "Cuida de cada detalhe pedagógico com muito amor.",
    image: "/images/teacher1.jpg", 
    color: "border-[#E91E63] text-[#E91E63]", // Rosa
    bg: "bg-[#E91E63]/10",
  },
  {
    name: "Teacher Bruno",
    role: "Inglês",
    bio: "Com ele, aprender uma nova língua é pura diversão e música.",
    image: "/images/teacher2.jpg",
    color: "border-[#00E5FF] text-[#00E5FF]", // Ciano
    bg: "bg-[#00E5FF]/10",
  },
  {
    name: "Tia Ana",
    role: "Maternal I",
    bio: "Especialista em colinhos e nas primeiras descobertas do bebê.",
    image: "/images/teacher3.jpg",
    color: "border-[#FDC12D] text-[#FDC12D]", // Amarelo
    bg: "bg-[#FDC12D]/10",
  },
  {
    name: "Tio João",
    role: "Educação Física",
    bio: "Ensina que correr, pular e brincar faz bem para o corpo e alma.",
    image: "/images/teacher4.jpg", // Placeholder
    color: "border-[#8BC34A] text-[#8BC34A]", // Verde
    bg: "bg-[#8BC34A]/10",
  },
  {
    name: "Tia Bia",
    role: "Artes",
    bio: "Transforma tinta e papel em mundos mágicos de imaginação.",
    image: "/images/teacher5.jpg", // Placeholder
    color: "border-[#9C27B0] text-[#9C27B0]", // Roxo
    bg: "bg-[#9C27B0]/10",
  },
]

export function Team() {
  const carouselRef = useRef<HTMLDivElement>(null)

  // Função para rolar para a esquerda
  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -350, behavior: "smooth" })
    }
  }

  // Função para rolar para a direita
  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 350, behavior: "smooth" })
    }
  }

  return (
    <section id="equipe" className="py-28 px-6 lg:px-8 bg-white font-fredoka overflow-hidden">
      <div className="mx-auto max-w-[1350px]">
        
        {/* Cabeçalho da Seção */}
        <AnimateOnScroll>
          <div className="flex flex-col items-center text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#8BC34A]/10 text-[#8BC34A] text-sm font-bold uppercase tracking-wider mb-6">
              <Heart className="w-4 h-4 fill-current" />
              Quem Cuida Deles
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-[#3F3D56]">
              Nossa Equipe de <span className="text-[#E91E63]">Super-Heróis</span>
            </h2>
            <p className="text-gray-500 max-w-2xl text-xl font-medium">
              Profissionais experientes e cheios de carinho, prontos para guiar seu filho nessa jornada.
            </p>
          </div>
        </AnimateOnScroll>

        {/* --- ÁREA DO CARROSSEL --- */}
        <div className="relative group/carousel">
          
          {/* Botão Seta Esquerda */}
          <button 
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 lg:-translate-x-6 z-10 w-12 h-12 lg:w-16 lg:h-16 bg-white rounded-full shadow-lg border-2 border-[#E91E63] text-[#E91E63] flex items-center justify-center hover:bg-[#E91E63] hover:text-white transition-all duration-300 opacity-0 group-hover/carousel:opacity-100 focus:opacity-100"
            aria-label="Anterior"
          >
            <ArrowLeft className="w-6 h-6 lg:w-8 lg:h-8" strokeWidth={3} />
          </button>

          {/* Container dos Cards (Scrollável) */}
          <div 
            ref={carouselRef}
            className="flex gap-6 overflow-x-auto pb-12 pt-4 px-4 snap-x snap-mandatory scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }} // Esconde barra de rolagem
          >
            {teachers.map((member, index) => (
              <div 
                key={member.name} 
                className="snap-center shrink-0 w-[90%] md:w-[45%] lg:w-[32%]" // Define largura de cada card (1 no mobile, 3 no desktop)
              >
                <div className="group relative h-full">
                  <div className="bg-white rounded-[40px] p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-transparent transform hover:-translate-y-2 h-full flex flex-col">
                    
                    {/* Foto */}
                    <div className={`aspect-square rounded-[30px] mb-6 overflow-hidden border-[6px] ${member.color} p-1`}>
                      <div className="relative w-full h-full rounded-[22px] overflow-hidden">
                          {/* Usei div cinza como fallback se não tiver imagem */}
                          <div className="w-full h-full bg-gray-100 relative">
                            <Image
                              src={member.image} 
                              alt={member.name}
                              fill
                              className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                          </div>
                      </div>
                    </div>

                    {/* Informações */}
                    <div className="text-center mt-auto">
                      <h3 className="font-bold text-2xl mb-2 text-[#3F3D56]">{member.name}</h3>
                      
                      <div className={`inline-block px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wide mb-4 ${member.bg} ${member.color.split(' ')[1]}`}>
                        {member.role}
                      </div>
                      
                      <p className="text-gray-500 font-medium leading-relaxed text-sm">
                        {member.bio}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Botão Seta Direita */}
          <button 
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 lg:translate-x-6 z-10 w-12 h-12 lg:w-16 lg:h-16 bg-white rounded-full shadow-lg border-2 border-[#00E5FF] text-[#00E5FF] flex items-center justify-center hover:bg-[#00E5FF] hover:text-white transition-all duration-300 opacity-0 group-hover/carousel:opacity-100 focus:opacity-100"
            aria-label="Próximo"
          >
            <ArrowRight className="w-6 h-6 lg:w-8 lg:h-8" strokeWidth={3} />
          </button>

        </div>

        {/* Indicador visual de que tem mais conteúdo (opcional) */}
        <div className="flex justify-center gap-2 mt-2">
            {teachers.map((_, i) => (
                <div key={i} className="w-2 h-2 rounded-full bg-gray-200" />
            ))}
        </div>

      </div>
    </section>
  )
}
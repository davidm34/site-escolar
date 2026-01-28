"use client"

import { ArrowRight, Calendar, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AnimateOnScroll } from "./animate-on-scroll"

export function ContactCTA() {
  return (
    <section className="relative py-28 px-6 lg:px-8 bg-[#E91E63] text-white font-fredoka overflow-hidden">
      
      {/* Onda Decorativa no Topo (Transição do branco/cinza para o rosa) */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0]">
        <svg 
          className="relative block w-full h-[50px] md:h-[80px]" 
          data-name="Layer 1" 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
        >
            <path 
                d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
                className="fill-[#FAFAFA]" // A cor deve bater com o fundo da seção anterior (Depoimentos)
            ></path>
        </svg>
      </div>

      <div className="mx-auto max-w-4xl text-center relative z-10 pt-10">
        <AnimateOnScroll>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-8">
            Venha fazer parte da nossa <br/>
            <span className="text-[#FDC12D]">Família Sonho Feliz!</span>
          </h2>
        </AnimateOnScroll>

        <AnimateOnScroll delay={150}>
          <p className="text-xl text-white/90 leading-relaxed mb-12 max-w-2xl mx-auto font-medium">
            As matrículas para 2026 já estão abertas. Agende uma visita, conheça nosso espaço mágico e converse com nossa equipe pedagógica.
          </p>
        </AnimateOnScroll>

        <AnimateOnScroll delay={300}>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">

            <Button
              size="lg"
              className="bg-[#FDC12D] text-[#3F3D56] hover:bg-[#ffca28] px-10 py-7 rounded-full text-lg font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
            >
              Falar no WhatsApp <MessageCircle className="ml-2 w-5 h-5" strokeWidth={2.5} />
            </Button>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
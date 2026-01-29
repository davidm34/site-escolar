"use client"

import Image from "next/image"
import { Sun, Music, Gamepad2, Star } from "lucide-react"
import { AnimateOnScroll } from "./animate-on-scroll"

const highlights = [
  {
    icon: Sun,
    title: "Aulas ao Ar Livre",
    color: "text-[#FDC12D]", // Amarelo Sol
    bg: "bg-[#FDC12D]/10",
    description: "A natureza é nossa sala de aula. Explorar e respirar ar puro faz parte do aprendizado.",
  },
  {
    icon: Gamepad2,
    title: "Inovação e Brincadeiras",
    color: "text-[#00E5FF]", // Azul Ciano
    bg: "bg-[#00E5FF]/10",
    description: "Gamificação e dinâmicas lúdicas para tornar o ensino inesquecível.",
  },
  {
    icon: Music,
    title: "Musical Anual",
    color: "text-[#E91E63]", // Rosa
    bg: "bg-[#E91E63]/10",
    description: "Nossa tradição onde os alunos brilham no palco, desenvolvendo confiança e arte.",
  },
]

export function AboutUs() {
  return (
    <section id="sobre" className="py-20 lg:py-28 px-6 lg:px-8 bg-[#FFFDE7] text-[#3F3D56] font-fredoka overflow-hidden">
      <div className="mx-auto max-w-[1400px]">
        
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* --- LADO ESQUERDO: TEXTO E LISTA --- */}
          <div>
            <AnimateOnScroll>
              {/* Tag de Destaque */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E91E63]/10 text-[#E91E63] text-sm font-bold uppercase tracking-wider mb-6">
                <Star className="w-4 h-4 fill-current" />
                Quem Somos
              </div>

              <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6 text-[#3F3D56]">
                Mais de <span className="text-[#E91E63]">20 Anos</span> Formando Sonhos
              </h2>
              
              <p className="text-lg text-gray-600 leading-relaxed font-medium mb-10">
                A <strong>Escola Sonho Feliz</strong> une tradição e inovação do Maternal ao 9º ano. 
                Formamos cidadãos completos, criativos e felizes, preparados para abraçar o mundo.
              </p>

              {/* Lista Vertical dos Destaques */}
              <div className="space-y-8">
                {highlights.map((item, index) => (
                  <div key={item.title} className="flex gap-5">
                    {/* Ícone com fundo colorido */}
                    <div className={`shrink-0 w-14 h-14 rounded-2xl ${item.bg} flex items-center justify-center`}>
                      <item.icon className={`w-7 h-7 ${item.color}`} strokeWidth={2.5} />
                    </div>
                    
                    {/* Texto do Item */}
                    <div>
                      <h3 className="font-bold text-xl text-[#3F3D56] mb-1">{item.title}</h3>
                      <p className="text-gray-500 font-medium leading-relaxed text-base">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </AnimateOnScroll>
          </div>

          {/* --- LADO DIREITO: IMAGEM --- */}
          <div className="relative h-[500px] lg:h-[700px] w-full rounded-[40px] overflow-hidden shadow-xl border-4 border-white">
             <AnimateOnScroll direction="left" delay={200} className="h-full">
                <Image
                  src="/images/alunos.jpg" 
                  alt="Alunos da Escola Sonho Feliz"
                  fill
                  className="object-cover object-center hover:scale-105 transition-transform duration-700"
                />
                
                {/* Elemento Decorativo Flutuante sobre a imagem (Opcional) */}
                <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-sm p-6 rounded-3xl max-w-xs shadow-lg hidden md:block">
                  <p className="text-[#E91E63] font-bold text-lg mb-1">❤️ Feito com Amor</p>
                  <p className="text-sm text-gray-600 font-medium">Cada detalhe pensado para o bem-estar do seu filho.</p>
                </div>
             </AnimateOnScroll>
          </div>

        </div>
      </div>
    </section>
  )
}
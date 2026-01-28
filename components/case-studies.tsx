"use client"

import { Quote, Star, Heart, ShieldCheck, GraduationCap, MessageCircleHeart } from "lucide-react"
import { AnimateOnScroll } from "./animate-on-scroll"

const testimonials = [
  {
    parent: "Mariana Souza",
    child: "Mãe do Lucas (Maternal II)",
    text: "A evolução do Lucas foi incrível! Ele chegava em casa cantando as músicas e contando histórias. Sinto uma paz enorme em deixá-lo em um lugar com tanto amor.",
    rating: 5,
    tags: [
      { label: "Muito Carinho", icon: Heart },
      { label: "Segurança Total", icon: ShieldCheck },
    ],
    color: "border-[#E91E63]", // Rosa
    iconColor: "text-[#E91E63]",
    bg: "bg-[#E91E63]/5",
  },
  {
    parent: "Roberto Mendes",
    child: "Pai da Sofia (1º Ano)",
    text: "A proposta pedagógica é fantástica. A Sofia aprende brincando e tem prazer em estudar. As aulas ao ar livre fizeram toda a diferença na adaptação dela.",
    rating: 5,
    tags: [
      { label: "Ensino Forte", icon: GraduationCap },
      { label: "Criatividade", icon: Star },
    ],
    color: "border-[#00E5FF]", // Ciano
    iconColor: "text-[#00E5FF]",
    bg: "bg-[#00E5FF]/5",
  },
  {
    parent: "Fernanda Lima",
    child: "Mãe do Enzo (4º Ano)",
    text: "Mudei o Enzo para a Sonho Feliz ano passado e foi a melhor escolha. A equipe é acolhedora e a infraestrutura é perfeita para eles gastarem energia.",
    rating: 5,
    tags: [
      { label: "Espaço Amplo", icon: ShieldCheck },
      { label: "Acolhimento", icon: Heart },
    ],
    color: "border-[#FDC12D]", // Amarelo
    iconColor: "text-[#FDC12D]",
    bg: "bg-[#FDC12D]/5",
  },
]

export function Testimonials() {
  return (
    <section id="depoimentos" className="py-28 px-6 lg:px-8 bg-[#FAFAFA] font-fredoka overflow-hidden">
      <div className="mx-auto max-w-[1350px]">
        <AnimateOnScroll>
          <div className="flex flex-col items-center text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#9C27B0]/10 text-[#9C27B0] text-sm font-bold uppercase tracking-wider mb-6">
              <MessageCircleHeart className="w-4 h-4 fill-current" />
              Depoimentos
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-[#3F3D56]">
              O Que Dizem as <span className="text-[#9C27B0]">Famílias</span>
            </h2>
            <p className="text-gray-500 max-w-2xl text-xl font-medium">
              Histórias reais de quem vive o dia a dia da Escola Sonho Feliz.
            </p>
          </div>
        </AnimateOnScroll>

        <div className="grid lg:grid-cols-3 gap-8">
          {testimonials.map((study, index) => (
            <AnimateOnScroll key={study.parent} delay={index * 150}>
              <div 
                className={`
                  relative h-full flex flex-col
                  bg-white p-8 lg:p-10 
                  rounded-[40px] shadow-lg hover:shadow-xl 
                  border-b-[6px] ${study.color}
                  transition-all duration-300 hover:-translate-y-2
                `}
              >
                {/* Ícone de Citação Decorativo no Fundo */}
                <Quote className={`absolute top-8 right-8 w-12 h-12 opacity-10 ${study.iconColor} rotate-180`} />

                {/* Header do Card (Pai e Filho) */}
                <div className="mb-6 z-10">
                    <h3 className="text-2xl font-bold text-[#3F3D56]">{study.parent}</h3>
                    <span className={`text-sm font-bold uppercase tracking-wide ${study.iconColor}`}>
                      {study.child}
                    </span>
                </div>

                {/* Estrelas */}
                <div className="flex gap-1 mb-6">
                    {[...Array(study.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-[#FDC12D] text-[#FDC12D]" />
                    ))}
                </div>

                {/* Texto do Depoimento */}
                <p className="text-gray-500 font-medium leading-relaxed mb-8 italic z-10 flex-grow">
                  "{study.text}"
                </p>

                {/* Tags de Destaque (Substituindo as métricas) */}
                <div className="flex gap-3 mt-auto pt-6 border-t border-gray-100">
                  {study.tags.map((tag) => (
                    <div key={tag.label} className={`flex items-center gap-2 px-3 py-2 rounded-full ${study.bg}`}>
                      <tag.icon className={`w-4 h-4 ${study.iconColor}`} strokeWidth={2.5} />
                      <span className={`text-[11px] font-bold uppercase tracking-wide ${study.iconColor}`}>{tag.label}</span>
                    </div>
                  ))}
                </div>

              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
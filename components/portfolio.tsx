import Link from "next/link"
import { 
  ArrowUpRight, 
  Globe,          // Inglês e Espanhol
  Heart,          // Inteligência Emocional
  Trophy,         // Ed. Física
  Palette,        // Artes
  PiggyBank,      // Ed. Financeira
  Rocket,         // Empreendedorismo
  Microscope,     // Ciências (Novo/Padrão)
  Music           // Música (Novo/Padrão)
} from "lucide-react"
import { AnimateOnScroll } from "./animate-on-scroll"

const cardColors = [
  "border-b-[#E91E63] group-hover:bg-[#E91E63]/5", // Rosa
  "border-b-[#FDC12D] group-hover:bg-[#FDC12D]/5", // Amarelo
  "border-b-[#00E5FF] group-hover:bg-[#00E5FF]/5", // Ciano
  "border-b-[#8BC34A] group-hover:bg-[#8BC34A]/5", // Verde
  "border-b-[#9C27B0] group-hover:bg-[#9C27B0]/5", // Roxo
  "border-b-[#FF5722] group-hover:bg-[#FF5722]/5", // Laranja
  "border-b-[#3F51B5] group-hover:bg-[#3F51B5]/5", // Indigo (Ciências)
  "border-b-[#795548] group-hover:bg-[#795548]/5", // Marrom (Música)
]

const iconColors = [
  "text-[#E91E63]",
  "text-[#FDC12D]",
  "text-[#00E5FF]",
  "text-[#8BC34A]",
  "text-[#9C27B0]",
  "text-[#FF5722]",
  "text-[#3F51B5]",
  "text-[#795548]",
]

const schoolSubjects = [
  {
    name: "Inglês e Espanhol",
    category: "Idiomas",
    description: "Conectando nossos pequenos com o mundo através de novas línguas desde cedo.",
    url: "#",
    icon: Globe,
  },
  {
    name: "Inteligência Emocional",
    category: "Sentimentos",
    description: "Ensinando a lidar com emoções, empatia e a conviver com os amigos com carinho.",
    url: "#",
    icon: Heart,
  },
  {
    name: "Educação Física",
    category: "Movimento",
    description: "Corpo em movimento! Esportes e brincadeiras para crescer forte e saudável.",
    url: "#",
    icon: Trophy,
  },
  {
    name: "Artes e Teatro",
    category: "Criatividade",
    description: "Pintura, atuação e faz de conta para soltar a imaginação e se expressar livremente.",
    url: "#",
    icon: Palette,
  },
  {
    name: "Educação Financeira",
    category: "Consciência",
    description: "Aprendendo o valor das coisas e a cuidar do futuro de forma divertida e prática.",
    url: "#",
    icon: PiggyBank,
  },
  {
    name: "Empreendedorismo",
    category: "Inovação",
    description: "Pequenos grandes líderes! Criando projetos e transformando ideias em realidade.",
    url: "#",
    icon: Rocket,
  },
  {
    name: "Ciências e Natureza", // Substituindo Robótica
    category: "Descoberta",
    description: "Explorando o mundo ao redor, as plantas, os animais e o meio ambiente.",
    url: "#",
    icon: Microscope,
  },
  {
    name: "Musicalização", // Substituindo Culinária
    category: "Harmonia",
    description: "Ritmo, sons e instrumentos para estimular a audição e a sensibilidade artística.",
    url: "#",
    icon: Music,
  },
]

export function Portfolio() {
  return (
    <section id="portfolio" className="py-28 px-6 lg:px-8 bg-[#FAFAFA] font-fredoka">
      <div className="mx-auto max-w-[1400px]">
        <AnimateOnScroll>
          <div className="mb-16 text-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-[#3F3D56]">
              Nossas Aulas
            </h2>
            <p className="text-muted-foreground max-w-2xl text-xl mx-auto font-medium">
              Uma grade curricular completa pensada para desenvolver todas as habilidades do seu filho.
            </p>
          </div>
        </AnimateOnScroll>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {schoolSubjects.map((subject, index) => (
            <AnimateOnScroll key={subject.name} delay={index * 100}>
              <Link href={subject.url} className="block h-full">
                <div 
                  className={`
                    group relative p-8 h-full 
                    bg-white 
                    rounded-[35px] shadow-sm hover:shadow-xl 
                    border border-gray-100 ${cardColors[index % cardColors.length]} border-b-[6px]
                    transition-all duration-300 transform hover:-translate-y-2 cursor-pointer 
                    flex flex-col items-center text-center
                  `}
                >
                  
                  <div className={`mb-6 mt-4 p-4 rounded-full bg-gray-50 ${iconColors[index % iconColors.length]} bg-opacity-10`}>
                    <subject.icon className={`w-12 h-12 ${iconColors[index % iconColors.length]}`} strokeWidth={2} />
                  </div>

                  <div className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">
                    {subject.category}
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-3 text-[#3F3D56] group-hover:text-[#E91E63] transition-colors">
                    {subject.name}
                  </h3>
                  
                  <p className="text-base text-gray-500 leading-relaxed font-medium">
                    {subject.description}
                  </p>
                </div>
              </Link>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
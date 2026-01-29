"use client"

import { 
  GraduationCap, 
  CalendarCheck, 
  Megaphone, 
  Clock, 
  LogOut, 
  ChevronRight, 
  BellRing 
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

// Dados fictícios do Aluno
const student = {
  name: "Lucas Silva",
  grade: "4º Ano B",
  photo: "/images/student_avatar.jpg", // Coloque um avatar aqui ou use um placeholder
}

// Opções do Menu
const menuItems = [
  {
    title: "Minhas Notas",
    icon: GraduationCap,
    color: "text-[#9C27B0]", // Roxo
    bg: "bg-[#9C27B0]/10",
    border: "border-[#9C27B0]",
    link: "/painel-aluno/notas"
  },
  {
    title: "Frequência",
    icon: CalendarCheck,
    color: "text-[#8BC34A]", // Verde
    bg: "bg-[#8BC34A]/10",
    border: "border-[#8BC34A]",
    link: "/painel-aluno/frequencia"
  },
  {
    title: "Mural de Avisos",
    icon: Megaphone,
    color: "text-[#FDC12D]", // Amarelo
    bg: "bg-[#FDC12D]/10",
    border: "border-[#FDC12D]",
    link: "/painel-aluno/avisos"
  },
  {
    title: "Horário de Aulas",
    icon: Clock,
    color: "text-[#00E5FF]", // Ciano
    bg: "bg-[#00E5FF]/10",
    border: "border-[#00E5FF]",
    link: "/painel-aluno/horario"
  },
]

// Avisos Recentes
const recentNotices = [
  { id: 1, title: "Festa da Família", date: "Hoje", type: "Evento" },
  { id: 2, title: "Trazer material de artes", date: "Amanhã", type: "Lembrete" },
]

export default function StudentDashboard() {
  return (
    <div className="min-h-screen bg-[#FFFDE7] font-fredoka pb-10">
      
      {/* --- CABEÇALHO --- */}
      <header className="bg-white px-6 py-4 shadow-sm border-b-4 border-[#E91E63] flex justify-between items-center sticky top-0 z-50">
        
        {/* Info do Aluno */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full border-2 border-[#E91E63] p-1 overflow-hidden bg-white">
            {/* Avatar Placeholder se não tiver imagem */}
            <div className="w-full h-full bg-gray-200 rounded-full relative overflow-hidden">
               <Image 
                 src={student.photo} 
                 alt={student.name} 
                 fill 
                 className="object-cover"
                 // Fallback simples
                 onError={(e) => { e.currentTarget.style.display = 'none' }} 
               />
               {/* Ícone caso imagem falhe */}
               <div className="absolute inset-0 flex items-center justify-center text-[#E91E63] font-bold text-xl">
                 {student.name.charAt(0)}
               </div>
            </div>
          </div>
          <div>
            <h2 className="text-[#3F3D56] font-bold text-lg leading-none">{student.name}</h2>
            <p className="text-gray-400 text-sm font-medium">{student.grade}</p>
          </div>
        </div>

        {/* Botão Sair */}
        <Link href="/login">
          <Button variant="ghost" className="text-[#E91E63] hover:bg-[#E91E63]/10 hover:text-[#E91E63] font-bold rounded-full gap-2">
            <span className="hidden sm:inline">Sair</span>
            <LogOut className="w-5 h-5" />
          </Button>
        </Link>
      </header>

      <main className="max-w-[1200px] mx-auto px-6 pt-10">
        
        {/* --- BOAS VINDAS --- */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-[#3F3D56]">
            Olá, <span className="text-[#00E5FF]">Lucas!</span> 👋
          </h1>
          <p className="text-gray-500 font-medium text-lg">
            Pronto para aprender coisas novas hoje?
          </p>
        </div>

        {/* --- GRID DE OPÇÕES (MENU PRINCIPAL) --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {menuItems.map((item) => (
            <Link key={item.title} href={item.link}>
              <div 
                className={`
                  bg-white rounded-[30px] p-6 
                  shadow-md hover:shadow-xl hover:-translate-y-2 
                  border-b-[6px] ${item.border}
                  transition-all duration-300 cursor-pointer h-full flex flex-col items-center text-center group
                `}
              >
                {/* Ícone com fundo colorido */}
                <div className={`w-16 h-16 rounded-full ${item.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <item.icon className={`w-8 h-8 ${item.color}`} strokeWidth={2.5} />
                </div>
                
                <h3 className="text-xl font-bold text-[#3F3D56] mb-1">{item.title}</h3>
                <p className="text-sm text-gray-400 font-medium">Visualizar</p>
              </div>
            </Link>
          ))}
        </div>

        {/* --- MURAL DE AVISOS RÁPIDOS --- */}
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Card de Avisos */}
          <div className="lg:col-span-2 bg-white rounded-[30px] p-8 shadow-md border-2 border-gray-100 relative overflow-hidden">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-[#FDC12D]/20 p-2 rounded-xl">
                 <BellRing className="w-6 h-6 text-[#FDC12D]" />
              </div>
              <h3 className="text-xl font-bold text-[#3F3D56]">Últimos Avisos</h3>
            </div>

            <div className="space-y-4">
              {recentNotices.map((notice) => (
                <div key={notice.id} className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 hover:bg-[#FFFDE7] transition-colors group cursor-pointer border border-transparent hover:border-[#FDC12D]/30">
                  <div className="flex items-center gap-4">
                    {/* Bolinha indicadora */}
                    <div className="w-3 h-3 rounded-full bg-[#E91E63]" />
                    <div>
                      <h4 className="font-bold text-[#3F3D56] group-hover:text-[#E91E63] transition-colors">{notice.title}</h4>
                      <span className="text-xs font-bold uppercase tracking-wide text-gray-400 bg-white px-2 py-1 rounded-md border border-gray-200 mt-1 inline-block">
                        {notice.type}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold text-[#00E5FF]">{notice.date}</span>
                    <ChevronRight className="w-5 h-5 text-gray-300 inline-block ml-2" />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 text-center">
              <Button variant="link" className="text-[#FDC12D] font-bold hover:text-[#fbc02d]">
                Ver todos os avisos
              </Button>
            </div>
          </div>

          {/* Card Decorativo / Motivacional */}
          <div className="bg-[#00E5FF] rounded-[30px] p-8 text-white flex flex-col justify-center items-center text-center shadow-lg relative overflow-hidden">
             {/* Círculos decorativos no fundo */}
             <div className="absolute top-[-20px] right-[-20px] w-32 h-32 bg-white/20 rounded-full blur-xl" />
             <div className="absolute bottom-[-20px] left-[-20px] w-24 h-24 bg-white/20 rounded-full blur-xl" />
             
             <GraduationCap className="w-16 h-16 mb-4 text-white drop-shadow-md" />
             <h3 className="text-2xl font-bold mb-2">Você está indo bem!</h3>
             <p className="font-medium text-white/90 mb-6">
               "A educação é a arma mais poderosa que você pode usar para mudar o mundo."
             </p>
             <div className="bg-white/20 rounded-full px-4 py-1 text-sm font-bold">
               ⭐ Turma 4º Ano B
             </div>
          </div>

        </div>

      </main>
    </div>
  )
}
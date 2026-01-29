"use client"

import { 
  FileText,       // Para Notas
  CheckSquare,    // Para Chamada/Frequência
  Megaphone,      // Para Avisos
  Users,          // Para Turmas
  LogOut, 
  ChevronRight,
  ClipboardList 
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

// Dados fictícios do Professor
const teacher = {
  name: "Bruno Lima",
  role: "Professor de Inglês",
  photo: "/images/teacher2.jpg", // Use a mesma imagem do carrossel se tiver, ou placeholder
}

// Ações Principais (Menu)
const actionMenu = [
  {
    title: "Lançar Notas",
    description: "Avaliações e Provas",
    icon: FileText,
    color: "text-[#E91E63]", // Rosa
    bg: "bg-[#E91E63]/10",
    border: "border-[#E91E63]",
    link: "/painel-professor/notas"
  },
  {
    title: "Realizar Chamada",
    description: "Registro de Frequência",
    icon: CheckSquare,
    color: "text-[#00E5FF]", // Ciano
    bg: "bg-[#00E5FF]/10",
    border: "border-[#00E5FF]",
    link: "/painel-professor/frequencia"
  },
  {
    title: "Enviar Avisos",
    description: "Recados para Família",
    icon: Megaphone,
    color: "text-[#FDC12D]", // Amarelo
    bg: "bg-[#FDC12D]/10",
    border: "border-[#FDC12D]",
    link: "/painel-professor/avisos"
  },
  {
    title: "Relatórios",
    description: "Desempenho da Turma",
    icon: ClipboardList,
    color: "text-[#9C27B0]", // Roxo
    bg: "bg-[#9C27B0]/10",
    border: "border-[#9C27B0]",
    link: "/painel-professor/relatorios"
  },
]

// Lista de Turmas do Professor
const myClasses = [
  { id: 1, name: "Maternal II - Tarde", students: 12, nextClass: "Hoje, 14:00" },
  { id: 2, name: "1º Ano A - Manhã", students: 18, nextClass: "Amanhã, 08:00" },
  { id: 3, name: "4º Ano B - Manhã", students: 20, nextClass: "Quarta, 10:30" },
]

export default function TeacherDashboard() {
  return (
    <div className="min-h-screen bg-[#FFFDE7] font-fredoka pb-10">
      
      {/* --- CABEÇALHO --- */}
      <header className="bg-white px-6 py-4 shadow-sm border-b-4 border-[#00E5FF] flex justify-between items-center sticky top-0 z-50">
        
        {/* Info do Professor */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full border-2 border-[#00E5FF] p-1 overflow-hidden bg-white">
            <div className="w-full h-full bg-gray-200 rounded-full relative overflow-hidden">
               <Image 
                 src={teacher.photo} 
                 alt={teacher.name} 
                 fill 
                 className="object-cover"
                 onError={(e) => { e.currentTarget.style.display = 'none' }} 
               />
               <div className="absolute inset-0 flex items-center justify-center text-[#00E5FF] font-bold text-xl">
                 {teacher.name.charAt(0)}
               </div>
            </div>
          </div>
          <div>
            <h2 className="text-[#3F3D56] font-bold text-lg leading-none">Prof. {teacher.name}</h2>
            <p className="text-gray-400 text-sm font-medium">{teacher.role}</p>
          </div>
        </div>

        {/* Botão Sair */}
        <Link href="/login">
          <Button variant="ghost" className="text-[#00E5FF] hover:bg-[#00E5FF]/10 hover:text-[#00E5FF] font-bold rounded-full gap-2">
            <span className="hidden sm:inline">Sair</span>
            <LogOut className="w-5 h-5" />
          </Button>
        </Link>
      </header>

      <main className="max-w-[1200px] mx-auto px-6 pt-10">
        
        {/* --- BOAS VINDAS --- */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#3F3D56]">
              Área do <span className="text-[#E91E63]">Professor</span> 🍎
            </h1>
            <p className="text-gray-500 font-medium text-lg">
              Vamos inspirar nossos alunos hoje?
            </p>
          </div>
          <div className="bg-white px-4 py-2 rounded-full shadow-sm text-sm font-bold text-[#3F3D56] border border-gray-100">
            📅 {new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
          </div>
        </div>

        {/* --- GRID DE AÇÕES RÁPIDAS --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {actionMenu.map((item) => (
            <Link key={item.title} href={item.link}>
              <div 
                className={`
                  bg-white rounded-[30px] p-6 
                  shadow-md hover:shadow-xl hover:-translate-y-2 
                  border-b-[6px] ${item.border}
                  transition-all duration-300 cursor-pointer h-full flex flex-col items-start group
                `}
              >
                <div className={`w-14 h-14 rounded-2xl ${item.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <item.icon className={`w-7 h-7 ${item.color}`} strokeWidth={2.5} />
                </div>
                
                <h3 className="text-xl font-bold text-[#3F3D56] mb-1">{item.title}</h3>
                <p className="text-sm text-gray-400 font-medium">{item.description}</p>
                
                <div className={`mt-auto pt-4 flex items-center text-sm font-bold ${item.color} opacity-0 group-hover:opacity-100 transition-opacity`}>
                  Acessar <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* --- SEÇÃO MINHAS TURMAS --- */}
        <div className="bg-white rounded-[30px] p-8 shadow-md border-2 border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-[#8BC34A]/20 p-2 rounded-xl">
               <Users className="w-6 h-6 text-[#8BC34A]" />
            </div>
            <h3 className="text-2xl font-bold text-[#3F3D56]">Minhas Turmas</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {myClasses.map((turma) => (
              <div key={turma.id} className="border-2 border-gray-100 rounded-[24px] p-5 hover:border-[#8BC34A] transition-colors cursor-pointer group">
                <div className="flex justify-between items-start mb-4">
                  <span className="bg-[#8BC34A]/10 text-[#8BC34A] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                    {turma.students} Alunos
                  </span>
                  <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-[#8BC34A] group-hover:text-white transition-colors">
                    <ChevronRight className="w-5 h-5" />
                  </div>
                </div>
                
                <h4 className="text-xl font-bold text-[#3F3D56] mb-1">{turma.name}</h4>
                <p className="text-sm text-gray-400 font-medium flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#FDC12D]" /> 
                  Próxima aula: {turma.nextClass}
                </p>
              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  )
}
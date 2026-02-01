"use client"

import { 
  UserPlus,       // Adicionar Usuário
  Users,          // Turmas
  Megaphone,      // Avisos
  FileText,       // Notas
  CheckSquare,    // Frequência
  Settings,       // Configurações
  LogOut, 
  Search,
  GraduationCap,
  Briefcase
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

// Dados do Admin
const admin = {
  name: "Diretora Helena",
  role: "Administradora Geral",
  photo: "/images/director_avatar.jpg", // Placeholder
}

// Estatísticas Rápidas
const stats = [
  { label: "Total de Alunos", value: "320", icon: GraduationCap, color: "text-[#E91E63]", bg: "bg-[#E91E63]/10" },
  { label: "Professores", value: "24", icon: Briefcase, color: "text-[#00E5FF]", bg: "bg-[#00E5FF]/10" },
  { label: "Turmas Ativas", value: "12", icon: Users, color: "text-[#FDC12D]", bg: "bg-[#FDC12D]/10" },
]

// Menu de Cadastros (Adicionar)
const registrationMenu = [
  {
    title: "Novo Aluno",
    icon: UserPlus,
    description: "Matricular estudante",
    color: "text-[#E91E63]",
    border: "border-[#E91E63]",
    link: "/painel-admin/novo-aluno"
  },
  {
    title: "Novo Professor",
    icon: UserPlus,
    description: "Cadastrar docente",
    color: "text-[#00E5FF]",
    border: "border-[#00E5FF]",
    link: "/painel-admin/novo-professor"
  },
  {
    title: "Criar Turma",
    icon: Users,
    description: "Nova sala de aula",
    color: "text-[#FDC12D]",
    border: "border-[#FDC12D]",
    link: "/painel-admin/nova-turma"
  },
]

// Lista de Turmas para Gestão (Exemplo para editar notas/frequência)
const classesManagement = [
  { id: 1, name: "Maternal I", teacher: "Tia Ana", status: "Notas Pendentes" },
  { id: 2, name: "Maternal II", teacher: "Tia Carol", status: "Em dia" },
  { id: 3, name: "1º Ano A", teacher: "Prof. Bruno", status: "Em dia" },
  { id: 4, name: "4º Ano B", teacher: "Prof. Marcos", status: "Frequência Pendente" },
]

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-[#FFFDE7] font-fredoka pb-10">
      
      {/* --- CABEÇALHO (Tema Roxo) --- */}
      <header className="bg-white px-6 py-4 shadow-sm border-b-4 border-[#9C27B0] flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full border-2 border-[#9C27B0] p-1 overflow-hidden bg-white">
            <div className="w-full h-full bg-gray-200 rounded-full relative overflow-hidden">
               {/* Avatar Placeholder */}
               <div className="absolute inset-0 flex items-center justify-center text-[#9C27B0] font-bold text-xl">
                 D
               </div>
            </div>
          </div>
          <div>
            <h2 className="text-[#3F3D56] font-bold text-lg leading-none">{admin.name}</h2>
            <p className="text-gray-400 text-sm font-medium">{admin.role}</p>
          </div>
        </div>

        <Link href="/login">
          <Button variant="ghost" className="text-[#9C27B0] hover:bg-[#9C27B0]/10 font-bold rounded-full gap-2">
            <span className="hidden sm:inline">Sair</span>
            <LogOut className="w-5 h-5" />
          </Button>
        </Link>
      </header>

      <main className="max-w-[1200px] mx-auto px-6 pt-10">
        
        {/* --- TÍTULO E BUSCA --- */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-10">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#3F3D56]">
              Painel da <span className="text-[#9C27B0]">Direção</span> 🎓
            </h1>
            <p className="text-gray-500 font-medium text-lg">
              Visão geral e controle da Escola Sonho Feliz.
            </p>
          </div>

          {/* Barra de Busca Global */}
          <div className="relative w-full md:w-96">
            <input 
              type="text" 
              placeholder="Buscar aluno, professor ou turma..." 
              className="w-full pl-12 pr-4 py-3 rounded-full border-2 border-gray-200 focus:border-[#9C27B0] outline-none font-medium text-gray-600 bg-white shadow-sm transition-all"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
        </div>

        {/* --- CARDS DE ESTATÍSTICAS --- */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white p-6 rounded-[24px] shadow-sm border border-gray-100 flex items-center gap-4">
              <div className={`w-14 h-14 rounded-full ${stat.bg} flex items-center justify-center`}>
                <stat.icon className={`w-7 h-7 ${stat.color}`} />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-[#3F3D56]">{stat.value}</h3>
                <p className="text-sm font-bold text-gray-400 uppercase tracking-wide">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* --- COLUNA 1: CADASTROS RÁPIDOS --- */}
          <div className="lg:col-span-1 space-y-6">
            <h3 className="text-xl font-bold text-[#3F3D56] flex items-center gap-2">
              <Settings className="w-5 h-5 text-[#9C27B0]" /> 
              Cadastros
            </h3>
            
            <div className="grid gap-4">
              {registrationMenu.map((item) => (
                <Link key={item.title} href={item.link}>
                  <div className={`bg-white p-4 rounded-[20px] shadow-sm border-l-[6px] ${item.border} hover:shadow-md hover:translate-x-1 transition-all cursor-pointer flex items-center gap-4`}>
                    <div className="bg-gray-50 p-2 rounded-xl">
                      <item.icon className={`w-6 h-6 ${item.color}`} />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#3F3D56]">{item.title}</h4>
                      <p className="text-xs text-gray-400 font-medium">{item.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
              
              {/* Botão de Avisos Gerais */}
              <Link href="/painel-admin/avisos">
                <div className="bg-[#9C27B0] p-4 rounded-[20px] shadow-md hover:shadow-lg hover:bg-[#8e24aa] transition-all cursor-pointer flex items-center gap-4 text-white">
                  <div className="bg-white/20 p-2 rounded-xl">
                    <Megaphone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold">Novo Aviso Geral</h4>
                    <p className="text-xs text-white/80 font-medium">Enviar para toda a escola</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* --- COLUNA 2 e 3: GESTÃO ACADÊMICA (Superpoderes) --- */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-bold text-[#3F3D56] flex items-center gap-2 mb-6">
              <FileText className="w-5 h-5 text-[#9C27B0]" /> 
              Gestão de Turmas (Notas e Frequência)
            </h3>

            <div className="bg-white rounded-[30px] shadow-sm border-2 border-gray-100 overflow-hidden">
              {/* Cabeçalho da Tabela */}
              <div className="grid grid-cols-12 bg-gray-50 p-4 border-b border-gray-100 text-sm font-bold text-gray-400 uppercase tracking-wide">
                <div className="col-span-4">Turma</div>
                <div className="col-span-3">Professor</div>
                <div className="col-span-5 text-right">Ações Rápidas</div>
              </div>

              {/* Lista de Turmas */}
              <div className="divide-y divide-gray-50">
                {classesManagement.map((cls) => (
                  <div key={cls.id} className="grid grid-cols-12 p-5 items-center hover:bg-[#FFFDE7] transition-colors group">
                    
                    <div className="col-span-4 font-bold text-[#3F3D56] text-lg">
                      {cls.name}
                      {/* Badge de status simples */}
                      {cls.status !== "Em dia" && (
                        <span className="block text-[10px] text-red-400 font-bold uppercase mt-1">⚠️ {cls.status}</span>
                      )}
                    </div>
                    
                    <div className="col-span-3 text-gray-500 font-medium text-sm">
                      {cls.teacher}
                    </div>

                    <div className="col-span-5 flex justify-end gap-2">
                      {/* Botões de Ação para Editar QQ Coisa */}
                      <Button size="sm" variant="outline" className="rounded-full border-[#00E5FF] text-[#00E5FF] hover:bg-[#00E5FF] hover:text-white font-bold h-8 text-xs">
                        <FileText className="w-3 h-3 mr-1" /> Notas
                      </Button>
                      <Button size="sm" variant="outline" className="rounded-full border-[#E91E63] text-[#E91E63] hover:bg-[#E91E63] hover:text-white font-bold h-8 text-xs">
                        <CheckSquare className="w-3 h-3 mr-1" /> Freq.
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-4 text-center border-t border-gray-100">
                <Button variant="link" className="text-[#9C27B0] font-bold">Ver todas as turmas</Button>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}
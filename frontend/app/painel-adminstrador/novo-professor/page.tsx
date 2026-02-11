"use client"

import { 
  UserPlus, 
  ChevronLeft, 
  User, 
  BookOpen, 
  Save, 
  Sparkles,
  School,
  GraduationCap
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function CreateTeacherPage() {
  return (
    <div className="min-h-screen bg-[#FFFDE7] font-fredoka p-6 pb-20 relative overflow-hidden flex flex-col items-center">
      
      {/* --- DECORAÇÃO DE FUNDO --- */}
      {/* Bolhas focadas no Ciano (Tema Professor) */}
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-[#00E5FF]/10 rounded-full blur-3xl z-0" />
      <div className="absolute bottom-[-10%] left-[-10%] w-80 h-80 bg-[#E91E63]/10 rounded-full blur-3xl z-0" />

      {/* --- CABEÇALHO DE NAVEGAÇÃO --- */}
      <div className="w-full max-w-4xl z-10 flex items-center justify-between mb-8">
        <Link href="/painel-adminstrador">
          <Button variant="ghost" className="text-[#3F3D56] hover:bg-white/50 hover:text-[#00E5FF] font-bold rounded-full gap-2 pl-2">
            <div className="bg-white p-2 rounded-full shadow-sm">
               <ChevronLeft className="w-5 h-5" strokeWidth={3} />
            </div>
            <span>Voltar para o Painel</span>
          </Button>
        </Link>
      </div>

      {/* --- CONTEÚDO PRINCIPAL --- */}
      <div className="w-full max-w-4xl z-10">
        
        {/* Título da Página */}
        <div className="flex items-center gap-4 mb-8 pl-4">
          <div className="w-16 h-16 bg-[#00E5FF] rounded-[24px] flex items-center justify-center shadow-lg transform rotate-3">
            <UserPlus className="w-8 h-8 text-white" strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#3F3D56]">
              Novo Professor
            </h1>
            <p className="text-gray-500 font-medium">
              Cadastre os dados pessoais e acadêmicos do educador.
            </p>
          </div>
        </div>

        {/* --- FORMULÁRIO (CARD) --- */}
        <div className="bg-white p-8 md:p-10 rounded-[40px] shadow-xl border-b-[8px] border-[#00E5FF] relative">
          
          <Sparkles className="absolute top-8 left-8 w-8 h-8 text-[#00E5FF] opacity-50 animate-pulse hidden md:block" />

          <form className="space-y-8">
            
            {/* SEÇÃO 1: FOTO E DADOS PESSOAIS */}
            <div className="flex flex-col md:flex-row gap-8">
              
              {/* Campos Pessoais */}
              <div className="flex-1 space-y-6">
                <h3 className="text-lg font-bold text-[#00E5FF] uppercase tracking-wider mb-2 flex items-center gap-2">
                  <User className="w-5 h-5" /> Dados Pessoais
                </h3>

                {/* Nome Completo */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-500 ml-2">Nome Completo</label>
                  <input 
                    type="text" 
                    placeholder="Ex: Bruno Lima"
                    className="w-full bg-[#FAFAFA] border-2 border-gray-100 focus:border-[#00E5FF] text-gray-600 rounded-2xl py-3 px-4 outline-none transition-all font-medium h-12"
                  />
                </div>

              </div>
            </div>

            <hr className="border-gray-100 dashed" />

            {/* SEÇÃO 2: DADOS ACADÊMICOS */}
            <div>
              <h3 className="text-lg font-bold text-[#E91E63] uppercase tracking-wider mb-4 flex items-center gap-2">
                <GraduationCap className="w-5 h-5" /> Informações Escolares
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
                
                {/* Disciplina Principal */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-500 ml-2">Disciplina Principal</label>
                  <div className="relative">
                    <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <select className="w-full bg-[#FAFAFA] border-2 border-gray-100 focus:border-[#E91E63] text-gray-600 rounded-2xl py-3 pl-12 pr-4 outline-none transition-all font-medium h-12 appearance-none cursor-pointer">
                      <option value="" disabled selected>Selecione...</option>
                      <option>Polivalente (Pedagogia)</option>
                      <option>Inglês</option>
                      <option>Educação Física</option>
                      <option>Artes</option>
                      <option>Música</option>
                    </select>
                  </div>
                </div>

                {/* Formação / Título */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-500 ml-2">Turma  </label>
                    <div className="relative">
                        <School className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <select className="w-full bg-[#FAFAFA] border-2 border-gray-100 focus:border-[#E91E63] text-gray-600 rounded-2xl py-3 pl-12 pr-4 outline-none transition-all font-medium h-12 appearance-none cursor-pointer">
                            <option value="" disabled selected>Selecione...</option>
                            <option>9° ano</option>
                            <option>8° ano</option>
                            <option>7° ano</option>
                            <option>6° ano</option>
                            <option>5° ano</option>
                        </select>
                    </div>
                </div>

              </div>
            </div>

            {/* BOTÕES DE AÇÃO */}
            <div className="pt-6 flex flex-col-reverse md:flex-row gap-4 justify-end">
              <Link href="/painel-adminstrador" className="w-full md:w-auto">
                <Button variant="ghost" type="button" className="w-full h-14 rounded-full text-gray-400 font-bold hover:bg-gray-100 text-lg">
                  Cancelar
                </Button>
              </Link>
              
              <Button className="w-full md:w-auto h-14 px-10 rounded-full bg-[#00E5FF] hover:bg-[#00bcd4] text-white font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">
                <Save className="mr-2 w-5 h-5" />
                Salvar Professor
              </Button>
            </div>

          </form>
        </div>
      </div>
    </div>
  )
}
"use client"

import { 
  UserPlus, 
  ChevronLeft, 
  User, 
  Users, 
  Save, 
  Sparkles 
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function CreateStudentPage() {
  return (
    <div className="min-h-screen bg-[#FFFDE7] font-fredoka p-6 pb-20 relative overflow-hidden flex flex-col items-center">
      
      {/* --- DECORAÇÃO DE FUNDO --- */}
      {/* Bolhas focadas no Rosa (Tema Aluno) */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-[#E91E63]/10 rounded-full blur-3xl z-0" />
      <div className="absolute bottom-[-10%] right-[-10%] w-80 h-80 bg-[#FDC12D]/10 rounded-full blur-3xl z-0" />

      {/* --- CABEÇALHO DE NAVEGAÇÃO --- */}
      <div className="w-full max-w-2xl z-10 flex items-center justify-between mb-8">
        <Link href="/painel-adminstrador">
          <Button variant="ghost" className="text-[#3F3D56] hover:bg-white/50 hover:text-[#E91E63] font-bold rounded-full gap-2 pl-2">
            <div className="bg-white p-2 rounded-full shadow-sm">
               <ChevronLeft className="w-5 h-5" strokeWidth={3} />
            </div>
            <span>Voltar para o Painel</span>
          </Button>
        </Link>
      </div>

      {/* --- CONTEÚDO PRINCIPAL --- */}
      <div className="w-full max-w-2xl z-10">
        
        {/* Título da Página */}
        <div className="flex items-center gap-4 mb-8 pl-4">
          <div className="w-16 h-16 bg-[#E91E63] rounded-[24px] flex items-center justify-center shadow-lg transform -rotate-3">
            <UserPlus className="w-8 h-8 text-white" strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#3F3D56]">
              Novo Aluno
            </h1>
            <p className="text-gray-500 font-medium">
              Matrícula rápida de estudante.
            </p>
          </div>
        </div>

        {/* --- FORMULÁRIO (CARD) --- */}
        <div className="bg-white p-8 md:p-12 rounded-[40px] shadow-xl border-b-[8px] border-[#E91E63] relative">
          
          <Sparkles className="absolute top-8 right-8 w-8 h-8 text-[#E91E63] opacity-50 animate-pulse hidden md:block" />

          <form className="space-y-8">
            
            {/* Campo 1: Nome do Aluno */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-[#E91E63] ml-2 uppercase tracking-wide">
                Nome Completo
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Ex: Lucas Silva"
                  className="w-full bg-[#FAFAFA] border-2 border-gray-100 focus:border-[#E91E63] text-gray-600 rounded-2xl py-4 pl-12 pr-4 outline-none transition-all font-medium text-lg h-14"
                />
              </div>
            </div>

            {/* Campo 2: Turma (Select) */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-[#E91E63] ml-2 uppercase tracking-wide">
                Turma
              </label>
              <div className="relative">
                <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select className="w-full bg-[#FAFAFA] border-2 border-gray-100 focus:border-[#E91E63] text-gray-600 rounded-2xl py-4 pl-12 pr-4 outline-none transition-all font-medium text-lg h-14 appearance-none cursor-pointer">
                  <option value="" disabled selected>Selecione a turma...</option>
                  <option>Maternal I</option>
                  <option>Maternal II</option>
                  <option>Jardim I</option>
                  <option>Jardim II</option>
                  <option>1º Ano - Fundamental</option>
                  <option>2º Ano - Fundamental</option>
                  <option>3º Ano - Fundamental</option>
                </select>
                {/* Seta do Select Customizada */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                   <ChevronLeft className="w-5 h-5 text-gray-400 -rotate-90" />
                </div>
              </div>
            </div>

            <hr className="border-gray-100 dashed my-6" />

            {/* BOTÕES DE AÇÃO */}
            <div className="flex flex-col-reverse md:flex-row gap-4 justify-end pt-2">
              <Link href="/painel-adminstrador" className="w-full md:w-auto">
                <Button variant="ghost" type="button" className="w-full h-14 rounded-full text-gray-400 font-bold hover:bg-gray-100 text-lg">
                  Cancelar
                </Button>
              </Link>
              
              <Button className="w-full md:w-auto h-14 px-12 rounded-full bg-[#E91E63] hover:bg-[#d81b60] text-white font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">
                <Save className="mr-2 w-5 h-5" />
                Matricular Aluno
              </Button>
            </div>

          </form>
        </div>
      </div>
    </div>
  )
}
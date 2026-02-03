"use client"

import { 
  Users, 
  ChevronLeft, 
  User, 
  Clock, 
  MapPin, 
  Hash, 
  Save, 
  Sparkles,
  BookOpen
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function CreateClassPage() {
  return (
    <div className="min-h-screen bg-[#FFFDE7] font-fredoka p-6 pb-20 relative overflow-hidden flex flex-col items-center">
      
      {/* --- DECORAÇÃO DE FUNDO --- */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-[#FDC12D]/10 rounded-full blur-3xl z-0" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-[#9C27B0]/10 rounded-full blur-3xl z-0" />

      {/* --- CABEÇALHO DE NAVEGAÇÃO --- */}
      <div className="w-full max-w-4xl z-10 flex items-center justify-between mb-8">
        <Link href="/painel-adminstrador">
          <Button variant="ghost" className="text-[#3F3D56] hover:bg-white/50 hover:text-[#9C27B0] font-bold rounded-full gap-2 pl-2">
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
          <div className="w-16 h-16 bg-[#FDC12D] rounded-[24px] flex items-center justify-center shadow-lg transform -rotate-6">
            <Users className="w-8 h-8 text-white" strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#3F3D56]">
              Criar Nova Turma
            </h1>
            <p className="text-gray-500 font-medium">
              Defina o professor, sala e horários da nova classe.
            </p>
          </div>
        </div>

        {/* --- FORMULÁRIO (CARD) --- */}
        <div className="bg-white p-8 md:p-10 rounded-[40px] shadow-xl border-b-[8px] border-[#FDC12D] relative">
          
          <Sparkles className="absolute top-8 right-8 w-8 h-8 text-[#FDC12D] opacity-50 animate-pulse hidden md:block" />

          <form className="space-y-8">
            
            {/* SEÇÃO 1: DADOS BÁSICOS */}
            <div>
              <h3 className="text-lg font-bold text-[#FDC12D] uppercase tracking-wider mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5" /> Informações da Turma
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* Nome da Turma */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-500 ml-2">Nome da Turma</label>
                  <input 
                    type="text" 
                    placeholder="Ex: Maternal II - B"
                    className="w-full bg-[#FAFAFA] border-2 border-gray-100 focus:border-[#FDC12D] text-gray-600 rounded-2xl py-3 px-4 outline-none transition-all font-medium h-12"
                  />
                </div>

                {/* Ano Letivo */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-500 ml-2">Ano Letivo</label>
                  <select className="w-full bg-[#FAFAFA] border-2 border-gray-100 focus:border-[#FDC12D] text-gray-600 rounded-2xl py-3 px-4 outline-none transition-all font-medium h-12 appearance-none cursor-pointer">
                    <option>2026</option>
                    <option>2027</option>
                  </select>
                </div>
              </div>
            </div>

            <hr className="border-gray-100 dashed" />

            {/* SEÇÃO 2: LOGÍSTICA */}
            <div>
              <h3 className="text-lg font-bold text-[#00E5FF] uppercase tracking-wider mb-4 flex items-center gap-2">
                <User className="w-5 h-5" /> Responsáveis e Local
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
                
                {/* Professor Responsável */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-500 ml-2">Professor(a) Regente</label>
                  <div className="relative">
                    <select className="w-full bg-[#FAFAFA] border-2 border-gray-100 focus:border-[#00E5FF] text-gray-600 rounded-2xl py-3 px-4 outline-none transition-all font-medium h-12 appearance-none cursor-pointer">
                      <option value="" disabled selected>Selecione um professor...</option>
                      <option>Tia Ana (Maternal)</option>
                      <option>Prof. Bruno (Inglês)</option>
                      <option>Tia Carol (Coordenação)</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                      <ChevronLeft className="w-4 h-4 text-gray-400 -rotate-90" />
                    </div>
                  </div>
                </div>

                {/* Turno */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-500 ml-2">Turno</label>
                  <div className="flex gap-4">
                    <label className="flex-1 cursor-pointer">
                      <input type="radio" name="turno" className="peer sr-only" />
                      <div className="rounded-2xl border-2 border-gray-100 bg-[#FAFAFA] p-3 text-center text-gray-500 font-bold peer-checked:border-[#00E5FF] peer-checked:text-[#00E5FF] peer-checked:bg-[#00E5FF]/5 transition-all flex items-center justify-center gap-2">
                        <Clock className="w-4 h-4" /> Manhã
                      </div>
                    </label>
                    <label className="flex-1 cursor-pointer">
                      <input type="radio" name="turno" className="peer sr-only" />
                      <div className="rounded-2xl border-2 border-gray-100 bg-[#FAFAFA] p-3 text-center text-gray-500 font-bold peer-checked:border-[#00E5FF] peer-checked:text-[#00E5FF] peer-checked:bg-[#00E5FF]/5 transition-all flex items-center justify-center gap-2">
                        <Clock className="w-4 h-4" /> Tarde
                      </div>
                    </label>
                  </div>
                </div>

                {/* Capacidade Máxima */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-500 ml-2">Capacidade Máxima</label>
                  <div className="relative">
                    <Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input 
                      type="number" 
                      placeholder="Ex: 20"
                      className="w-full bg-[#FAFAFA] border-2 border-gray-100 focus:border-[#00E5FF] text-gray-600 rounded-2xl py-3 pl-12 pr-4 outline-none transition-all font-medium h-12"
                    />
                  </div>
                </div>

                {/* Sala */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-500 ml-2">Sala / Local</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input 
                      type="text" 
                      placeholder="Ex: Sala 04 - Bloco Azul"
                      className="w-full bg-[#FAFAFA] border-2 border-gray-100 focus:border-[#00E5FF] text-gray-600 rounded-2xl py-3 pl-12 pr-4 outline-none transition-all font-medium h-12"
                    />
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
              
              <Button className="w-full md:w-auto h-14 px-10 rounded-full bg-[#FDC12D] hover:bg-[#ffa000] text-[#3F3D56] font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">
                <Save className="mr-2 w-5 h-5" />
                Salvar Turma
              </Button>
            </div>

          </form>
        </div>
      </div>
    </div>
  )
}
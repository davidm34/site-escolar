"use client"

import { User, Lock, ArrowRight, Star, Sparkles, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export default function LoginPage() {
  return (
    // Fundo Amarelo Claro com a fonte Fredoka
    <div className="min-h-screen bg-[#FFFDE7] flex items-center justify-center font-fredoka p-6 relative overflow-hidden">
      
      {/* --- DECORAÇÃO DE FUNDO (Formas coloridas) --- */}
      {/* Bolha Rosa */}
      <div className="absolute top-[-5%] left-[-5%] w-64 h-64 bg-[#E91E63]/10 rounded-full blur-3xl" />
      {/* Bolha Ciano */}
      <div className="absolute bottom-[-5%] right-[-5%] w-80 h-80 bg-[#00E5FF]/10 rounded-full blur-3xl" />
      
      {/* Botão de Voltar Flutuante */}
      <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 text-[#3F3D56] hover:text-[#E91E63] transition-colors font-bold z-20">
        <div className="bg-white p-2 rounded-full shadow-sm">
          <ChevronLeft className="w-6 h-6" strokeWidth={3} />
        </div>
        <span>Voltar para o site</span>
      </Link>

      {/* --- CARD DE LOGIN --- */}
      <div className="relative w-full max-w-md z-10">
        
        {/* Ícone de Mascote ou Logo no Topo */}
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
            <div className="w-24 h-24 bg-white rounded-full border-4 border-[#FDC12D] flex items-center justify-center shadow-lg">
                <Star className="w-12 h-12 text-[#FDC12D] fill-[#FDC12D]" />
            </div>
        </div>

        <div className="bg-white p-8 md:p-12 pt-16 rounded-[40px] shadow-xl border-b-[8px] border-[#00E5FF]">
          
          {/* Cabeçalho do Form */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#3F3D56] mb-2">Bem-vindo!</h1>
            <p className="text-gray-400 font-medium">Área do Aluno e da Família</p>
          </div>

          {/* Inputs */}
          <form className="space-y-6">
            
            {/* Campo Usuário */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-[#E91E63] ml-2 uppercase tracking-wide">
                Usuário ou E-mail
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Digite seu usuário"
                  className="w-full bg-[#FAFAFA] border-2 border-gray-100 focus:border-[#E91E63] text-gray-600 rounded-full py-4 pl-12 pr-4 outline-none transition-all placeholder:text-gray-300 font-medium"
                />
              </div>
            </div>

            {/* Campo Senha */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-[#00E5FF] ml-2 uppercase tracking-wide">
                Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type="password" 
                  placeholder="Sua senha secreta"
                  className="w-full bg-[#FAFAFA] border-2 border-gray-100 focus:border-[#00E5FF] text-gray-600 rounded-full py-4 pl-12 pr-4 outline-none transition-all placeholder:text-gray-300 font-medium"
                />
              </div>
            </div>

            {/* Esqueci a senha */}
            <div className="text-right">
              <a href="#" className="text-sm text-gray-400 hover:text-[#E91E63] font-bold transition-colors">
                Esqueceu a senha?
              </a>
            </div>

            {/* Botão Entrar */}
           <Link href="/painel-aluno" className="block w-full">
              <Button className="w-full bg-[#E91E63] hover:bg-[#d81b60] text-white rounded-full py-7 text-lg font-bold shadow-md hover:shadow-lg hover:-translate-y-1 transition-all mt-4">
                Entrar na Escola <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>

          </form>

          {/* Rodapé do Card */}
          <div className="mt-8 text-center">
            <p className="text-gray-400 text-sm font-medium">
              Ainda não tem acesso? <br/>
              <Link href="/#contato" className="text-[#00E5FF] font-bold hover:underline">
                Fale com a secretaria
              </Link>
            </p>
          </div>
        </div>

        {/* Decoração Flutuante (Estrelinhas) */}
        <Sparkles className="absolute top-20 -right-8 w-8 h-8 text-[#FDC12D] animate-pulse hidden md:block" />
        <Sparkles className="absolute bottom-20 -left-8 w-6 h-6 text-[#E91E63] animate-pulse hidden md:block" />

      </div>
    </div>
  )
}
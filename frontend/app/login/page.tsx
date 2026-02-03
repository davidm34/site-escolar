"use client"

import { useState } from "react" //
import { User, Lock, ArrowRight, Star, Sparkles, ChevronLeft, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation" // Para redirecionar após o login

export default function LoginPage() {
  const router = useRouter()
  
  // Estados para os inputs e mensagens
  const [login, setLogin] = useState("")
  const [senha, setSenha] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [erro, setErro] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErro("")

    try {
      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login, senha }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.erro || "Falha ao entrar")
      }

      // 1. Salvar o Token e as infos do usuário no LocalStorage
      localStorage.setItem("@Escola:token", data.token)
      localStorage.setItem("@Escola:user", JSON.stringify(data.usuario))

      // 2. Redirecionar baseado no CARGO do usuário
      // O seu SQL usa 'administrador', 'professor' e 'aluno'
      if (data.usuario.cargo === "administrador") {
        router.push("/painel-adminstrador")
      } else if (data.usuario.cargo === "professor") {
        router.push("/painel-professor")
      } else {
        router.push("/painel-aluno")
      }

    } catch (err: any) {
      setErro(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#FFFDE7] flex items-center justify-center font-fredoka p-6 relative overflow-hidden">
      
      {/* Botão de Voltar */}
      <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 text-[#3F3D56] hover:text-[#E91E63] transition-colors font-bold z-20">
        <div className="bg-white p-2 rounded-full shadow-sm">
          <ChevronLeft className="w-6 h-6" strokeWidth={3} />
        </div>
        <span>Voltar para o site</span>
      </Link>

      <div className="relative w-full max-w-md z-10">
        <div className="bg-white p-8 md:p-12 pt-16 rounded-[40px] shadow-xl border-b-[8px] border-[#00E5FF]">
          
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#3F3D56] mb-2">Bem-vindo!</h1>
            <p className="text-gray-400 font-medium">Escola Sonho Feliz</p>
          </div>

          {/* Exibição de Erro Amigável */}
          {erro && (
            <div className="bg-red-50 text-red-500 p-3 rounded-xl text-sm font-bold text-center mb-4 animate-shake">
              ⚠️ {erro}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            
            {/* Campo Usuário */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-[#E91E63] ml-2 uppercase tracking-wide">Usuário</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  required
                  type="text" 
                  value={login}
                  onChange={(e) => setLogin(e.target.value)}
                  placeholder="Seu login da escola"
                  className="w-full bg-[#FAFAFA] border-2 border-gray-100 focus:border-[#E91E63] text-gray-600 rounded-full py-4 pl-12 pr-4 outline-none transition-all font-medium"
                />
              </div>
            </div>

            {/* Campo Senha */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-[#00E5FF] ml-2 uppercase tracking-wide">Senha</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  required
                  type="password" 
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  placeholder="Sua senha secreta"
                  className="w-full bg-[#FAFAFA] border-2 border-gray-100 focus:border-[#00E5FF] text-gray-600 rounded-full py-4 pl-12 pr-4 outline-none transition-all font-medium"
                />
              </div>
            </div>

            {/* Botão Entrar com Estado de Carregamento */}
            <Button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#E91E63] hover:bg-[#d81b60] text-white rounded-full py-7 text-lg font-bold shadow-md transition-all mt-4"
            >
              {isLoading ? (
                <Loader2 className="animate-spin w-6 h-6" />
              ) : (
                <>Entrar na Escola <ArrowRight className="ml-2 w-5 h-5" /></>
              )}
            </Button>

          </form>

          <div className="mt-8 text-center text-gray-400 text-sm font-medium">
            Problemas com o acesso? <br/>
            <Link href="/#contato" className="text-[#00E5FF] font-bold hover:underline">Fale com a secretaria</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
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
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function CreateTeacherPage() {
  const router = useRouter()
  
  // Estados para o formulário
  const [nome, setNome] = useState("")
  const [disciplinaId, setDisciplinaId] = useState("")
  const [turmaId, setTurmaId] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const token = localStorage.getItem("@Escola:token")

    try {
      const response = await fetch("http://localhost:3001/professores", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          nome,
          disciplinas: disciplinaId, // Enviando como array conforme esperado
          turmas: turmaId            // Enviando como array conforme esperado
        })

      })

      const data = await response.json()

      if (response.ok) {
        // Exibe as credenciais geradas pelo seu backend
        alert(`Professor criado!\nLogin: ${data.acesso.login}\nSenha: ${data.acesso.senha}`)
        router.push("/painel-adminstrador")
      } else {
        alert(data.erro || "Erro ao criar professor")
      }
    } catch (error) {
      alert("Erro de conexão com o servidor")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#FFFDE7] font-fredoka p-6 pb-20 relative overflow-hidden flex flex-col items-center">
      
      {/* ... DECORAÇÃO DE FUNDO (Mantida) ... */}
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-[#00E5FF]/10 rounded-full blur-3xl z-0" />
      <div className="absolute bottom-[-10%] left-[-10%] w-80 h-80 bg-[#E91E63]/10 rounded-full blur-3xl z-0" />

      {/* --- CABEÇALHO --- */}
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

      <div className="w-full max-w-4xl z-10">
        <div className="flex items-center gap-4 mb-8 pl-4">
          <div className="w-16 h-16 bg-[#00E5FF] rounded-[24px] flex items-center justify-center shadow-lg transform rotate-3">
            <UserPlus className="w-8 h-8 text-white" strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#3F3D56]">Novo Professor</h1>
            <p className="text-gray-500 font-medium">Cadastre os dados e gere o acesso do educador.</p>
          </div>
        </div>

        <div className="bg-white p-8 md:p-10 rounded-[40px] shadow-xl border-b-[8px] border-[#00E5FF] relative">
          <form className="space-y-8" onSubmit={handleSubmit}>
            
            {/* SEÇÃO 1: DADOS PESSOAIS */}
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-[#00E5FF] uppercase tracking-wider flex items-center gap-2">
                <User className="w-5 h-5" /> Dados Pessoais
              </h3>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-500 ml-2">Nome Completo</label>
                <input 
                  required
                  type="text" 
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Ex: Bruno Lima"
                  className="w-full bg-[#FAFAFA] border-2 border-gray-100 focus:border-[#00E5FF] text-gray-600 rounded-2xl py-3 px-4 outline-none transition-all font-medium h-12"
                />
              </div>
            </div>

            <hr className="border-gray-100 dashed" />

            {/* SEÇÃO 2: DADOS ACADÊMICOS */}
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-[#E91E63] uppercase tracking-wider flex items-center gap-2">
                <GraduationCap className="w-5 h-5" /> Informações Escolares
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                
                {/* Disciplina - Importante: Value deve ser o ID do banco */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-500 ml-2">Disciplina Principal</label>
                  <div className="relative">
                    <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <select 
                      required
                      value={disciplinaId}
                      onChange={(e) => setDisciplinaId(e.target.value)}
                      className="w-full bg-[#FAFAFA] border-2 border-gray-100 focus:border-[#E91E63] text-gray-600 rounded-2xl py-3 pl-12 pr-4 outline-none transition-all font-medium h-12 appearance-none cursor-pointer"
                    >
                      <option value="">Selecione...</option>
                      <option value="1">Português</option>
                      <option value="2">Matemática</option>
                      <option value="12">Ensino Infantil</option>
                    </select>
                  </div>
                </div>

                {/* Turma - Importante: Value deve ser o ID do banco */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-500 ml-2">Turma Alocada</label>
                    <div className="relative">
                        <School className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <select 
                          required
                          value={turmaId}
                          onChange={(e) => setTurmaId(e.target.value)}
                          className="w-full bg-[#FAFAFA] border-2 border-gray-100 focus:border-[#E91E63] text-gray-600 rounded-2xl py-3 pl-12 pr-4 outline-none transition-all font-medium h-12 appearance-none cursor-pointer"
                        >
                            <option value="">Selecione...</option>
                            <option value="1">Maternal I</option>
                            <option value="2">Maternal II</option>
                            <option value="3">1° Ano</option>
                        </select>
                    </div>
                </div>
              </div>
            </div>

            {/* BOTÕES */}
            <div className="pt-6 flex flex-col-reverse md:flex-row gap-4 justify-end">
              <Link href="/painel-adminstrador" className="w-full md:w-auto">
                <Button variant="ghost" type="button" className="w-full h-14 rounded-full text-gray-400 font-bold hover:bg-gray-100 text-lg">
                  Cancelar
                </Button>
              </Link>
              
              <Button 
                disabled={loading}
                type="submit"
                className="w-full md:w-auto h-14 px-10 rounded-full bg-[#00E5FF] hover:bg-[#00bcd4] text-white font-bold text-lg shadow-lg transition-all"
              >
                <Save className="mr-2 w-5 h-5" />
                {loading ? "Salvando..." : "Salvar Professor"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
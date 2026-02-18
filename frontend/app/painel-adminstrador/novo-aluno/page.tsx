"use client"

import { 
  Users, 
  ChevronLeft, 
  Search,
  UserPlus,
  Edit,
  Trash2,
  MapPin,
  Loader2,
  GraduationCap,
  Key,
  EyeOff,
  Eye
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { CreateStudentModal } from "@/components/CreateStudentModal"

interface Aluno {
  id: number;
  nome_completo: string;
  turma: string;
  login?: string; 
  senha?: string; 
}

export default function ManageStudentsPage() {
  const [alunos, setAlunos] = useState<Aluno[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [visiblePasswords, setVisiblePasswords] = useState<number[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  const togglePasswordVisibility = (id: number) => {
    setVisiblePasswords(prev => 
      prev.includes(id) ? prev.filter(aId => aId !== id) : [...prev, id]
    )
  }

  const handleSuccess = () => {
    console.log("Aluno criado, atualizando lista...")
    // Recarregar a lista aqui se necessário
  }

  useEffect(() => {
    const fetchAlunos = async () => {
      setIsLoading(true)
      const token = localStorage.getItem("@Escola:token")

      try {
        const response = await fetch("http://localhost:3001/aluno", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        })

        if (response.ok) {
          const data = await response.json()
          setAlunos(data)
        } else {
          setError("Não foi possível carregar a lista de alunos.")
        }
      } catch (err) {
        // Fallback mockado
        setAlunos([
            { id: 901, nome_completo: "Lucas Silva", turma: "4º Ano B", login: "lucas.silva", senha: "abc" },
            { id: 902, nome_completo: "Sofia Mendes", turma: "Maternal II", login: "sofia.mendes", senha: "123" },
            { id: 903, nome_completo: "Enzo Gabriel", turma: "1º Ano A", login: "enzo.gabriel", senha: "456" },
        ])
      } finally {
        setIsLoading(false)
      }
    }

    fetchAlunos()
  }, [])

  return (
    <div className="min-h-screen bg-[#FFFDE7] font-fredoka p-6 pb-20 relative overflow-hidden flex flex-col items-center">
      
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-[#E91E63]/10 rounded-full blur-3xl z-0" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-[#FDC12D]/10 rounded-full blur-3xl z-0" />

      <div className="w-full max-w-6xl z-10 flex items-center justify-between mb-8">
        <Link href="/painel-adminstrador">
          <Button variant="ghost" className="text-[#3F3D56] hover:bg-white/50 hover:text-[#E91E63] font-bold rounded-full gap-2 pl-2">
            <div className="bg-white p-2 rounded-full shadow-sm">
               <ChevronLeft className="w-5 h-5" strokeWidth={3} />
            </div>
            <span>Voltar para o Painel</span>
          </Button>
        </Link>
      </div>

      <div className="w-full max-w-6xl z-10">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          
          <div className="flex items-center gap-4 pl-4">
            <div className="w-16 h-16 bg-[#E91E63] rounded-[24px] flex items-center justify-center shadow-lg transform -rotate-3">
              <GraduationCap className="w-8 h-8 text-white" strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-[#3F3D56]">
                Alunos Matriculados
              </h1>
              <p className="text-gray-500 font-medium">
                Gerencie todos os estudantes da escola.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Buscar aluno..." 
                className="w-full sm:w-72 pl-12 pr-4 py-3 rounded-full border-2 border-white shadow-sm focus:border-[#E91E63] outline-none font-medium text-gray-600 bg-white transition-all"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>

            <Button 
              onClick={() => setIsModalOpen(true)}
              className="w-full sm:w-auto h-12 px-8 rounded-full bg-[#E91E63] hover:bg-[#d81b60] text-white font-bold shadow-md hover:shadow-lg hover:-translate-y-1 transition-all"
            >
              <UserPlus className="mr-2 w-5 h-5" />
              Novo Aluno
            </Button>
          </div>
        </div>

        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-[#E91E63] animate-spin mb-4" />
            <p className="text-[#3F3D56] font-bold text-lg">Buscando alunos...</p>
          </div>
        )}

        {error && !isLoading && (
          <div className="bg-red-50 text-red-500 p-6 rounded-3xl text-center font-bold border-2 border-red-100">
            {error}
          </div>
        )}

        {!isLoading && !error && alunos.length === 0 && (
          <div className="bg-white p-10 rounded-3xl text-center shadow-sm border-2 border-gray-100">
            <p className="text-gray-500 font-bold text-lg">Nenhum aluno matriculado ainda.</p>
          </div>
        )}

        {!isLoading && !error && alunos.length > 0 && (
          <div className="flex flex-col gap-4">
            {alunos.map((aluno) => (
              <div 
                key={aluno.id} 
                className="bg-white rounded-3xl p-5 shadow-sm hover:shadow-md transition-all duration-200 border-l-[8px] border-[#E91E63] flex flex-col xl:flex-row xl:items-center gap-6 group"
              >
                
                {/* 1. Bloco de Identificação */}
                <div className="flex items-center gap-4 xl:w-1/4">
                  <div className="w-14 h-14 rounded-full bg-[#E91E63]/10 text-[#E91E63] flex items-center justify-center font-bold text-2xl shrink-0 uppercase border-2 border-[#E91E63]/20">
                    {aluno.nome_completo.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#3F3D56] leading-tight group-hover:text-[#E91E63] transition-colors">
                      {aluno.nome_completo}
                    </h3>
                    <p className="text-xs text-gray-400 font-bold mt-1 uppercase tracking-wide">
                      Matrícula: #{aluno.id}
                    </p>
                  </div>
                </div>

                {/* 2. Bloco da Turma (Agora ocupa todo o espaço central que era dividido) */}
                <div className="xl:w-1/4">
                  <div className="flex items-center gap-2 bg-[#FDC12D]/10 text-[#d49e1e] px-4 py-3 rounded-2xl w-full border border-[#FDC12D]/20">
                    <MapPin className="w-5 h-5 shrink-0" />
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider opacity-70">Turma</p>
                      <p className="font-bold text-sm leading-tight truncate">{aluno.turma}</p>
                    </div>
                  </div>
                </div>

                {/* 3. Bloco de Acesso */}
                <div className="flex flex-col sm:flex-row gap-3 xl:w-1/3 bg-gray-50 p-3 rounded-2xl border border-gray-100 relative">
                    <div className="absolute -top-3 left-4 bg-white px-2 flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide text-gray-400 border border-gray-100 rounded-full">
                        <Key className="w-3 h-3" /> Acesso da Família
                    </div>
                    
                    <div className="flex-1 mt-1">
                        <p className="text-[10px] font-bold text-gray-400 uppercase">Login</p>
                        <p className="text-sm font-bold text-[#3F3D56] truncate">{aluno.login || 'Não gerado'}</p>
                    </div>
                    
                    <div className="flex-1 mt-1 flex items-center justify-between">
                        <div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase">Senha</p>
                            <p className="text-sm font-bold text-[#E91E63] font-mono tracking-wider">
                                {visiblePasswords.includes(aluno.id) ? (aluno.senha || '---') : '••••••••'}
                            </p>
                        </div>
                        <button 
                            onClick={() => togglePasswordVisibility(aluno.id)}
                            className="p-2 text-gray-400 hover:text-[#E91E63] bg-white rounded-lg border border-gray-200 shadow-sm"
                            title="Mostrar/Esconder Senha"
                        >
                            {visiblePasswords.includes(aluno.id) ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                    </div>
                </div>

                {/* 4. Ações */}
                <div className="flex gap-2 xl:w-auto xl:ml-auto border-t xl:border-t-0 border-gray-100 pt-4 xl:pt-0">
                  <Button 
                    variant="ghost" 
                    className="flex-1 xl:flex-none text-gray-400 hover:text-[#00E5FF] hover:bg-[#00E5FF]/10 font-bold rounded-xl px-3"
                  >
                    <Edit className="w-5 h-5 xl:mr-0 2xl:mr-2" /> 
                    <span className="inline-block xl:hidden 2xl:inline-block">Editar</span>
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    className="flex-1 xl:flex-none text-gray-400 hover:text-[#E91E63] hover:bg-[#E91E63]/10 font-bold rounded-xl px-3"
                  >
                    <Trash2 className="w-5 h-5 xl:mr-0 2xl:mr-2" /> 
                    <span className="inline-block xl:hidden 2xl:inline-block">Remover</span>
                  </Button>
                </div>

              </div>
            ))}
          </div>
        )}

        {!isLoading && alunos.length > 0 && (
          <div className="mt-10 flex justify-center">
            <Button variant="ghost" className="text-[#E91E63] font-bold hover:bg-[#E91E63]/10 rounded-full px-8 py-6">
              Ver mais alunos...
            </Button>
          </div>
        )}

        <CreateStudentModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          onSuccess={handleSuccess}
        />

      </div>
    </div>
  )
}
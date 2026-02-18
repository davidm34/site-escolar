"use client"

import { 
  Users, 
  ChevronLeft, 
  Search,
  UserPlus,
  Edit,
  Trash2,
  BookOpen,
  MapPin,
  Loader2,
  Key, // Ícone para login/senha
  EyeOff, // Ícone para esconder/mostrar senha
  Eye
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { CreateTeacherModal } from "@/components/CreateTeacherModal"

// Interface baseada no retorno da sua API (agora com login/senha)
interface Professor {
  id: number;
  nome: string;
  disciplina: string;
  turma: string;
  login?: string; // Tornando opcional caso a API ainda não retorne
  senha?: string;
}

export default function ManageTeachersPage() {
  const [professores, setProfessores] = useState<Professor[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  // Estado para controlar quais senhas estão visíveis (salva os IDs dos professores)
  const [visiblePasswords, setVisiblePasswords] = useState<number[]>([])

  const togglePasswordVisibility = (id: number) => {
    setVisiblePasswords(prev => 
      prev.includes(id) ? prev.filter(pId => pId !== id) : [...prev, id]
    )
  }

  const handleSuccess = () => {
    console.log("Professor criado, atualizando lista...")
    // Aqui você idealmente chamaria o fetchProfessores novamente para recarregar a lista
  }

  useEffect(() => {
    const fetchProfessores = async () => {
      setIsLoading(true)
      const token = localStorage.getItem("@Escola:token")

      try {
        const response = await fetch("http://localhost:3001/professores", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        })

        if (response.ok) {
          const data = await response.json()
          setProfessores(data)
        } else {
          setError("Não foi possível carregar a lista de professores.")
        }
      } catch (err) {
        // Mock de fallback para você ver o design enquanto a API não responde
        setProfessores([
          { id: 910, nome: "João Silva", disciplina: "Matemática", turma: "9º Ano A", login: "joao.silva", senha: "123" },
          { id: 911, nome: "Maria Souza", disciplina: "História", turma: "1º Ano Médio", login: "maria.souza", senha: "456" }
        ])
        // setError("Erro de conexão com o servidor.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchProfessores()
  }, []) 

  return (
    <div className="min-h-screen bg-[#FFFDE7] font-fredoka p-6 pb-20 relative overflow-hidden flex flex-col items-center">
      
      {/* --- DECORAÇÃO DE FUNDO --- */}
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-[#00E5FF]/10 rounded-full blur-3xl z-0" />
      <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-[#9C27B0]/10 rounded-full blur-3xl z-0" />

      {/* --- CABEÇALHO DE NAVEGAÇÃO --- */}
      <div className="w-full max-w-6xl z-10 flex items-center justify-between mb-8">
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
      <div className="w-full max-w-6xl z-10">
        
        {/* Título e Ações Principais */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          
          <div className="flex items-center gap-4 pl-4">
            <div className="w-16 h-16 bg-[#00E5FF] rounded-[24px] flex items-center justify-center shadow-lg transform rotate-3">
              <Users className="w-8 h-8 text-white" strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-[#3F3D56]">
                Equipe de Professores
              </h1>
              <p className="text-gray-500 font-medium">
                Gerencie todos os educadores da escola.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            {/* Barra de Busca */}
            <div className="relative">
              <input 
                type="text" 
                placeholder="Buscar professor..." 
                className="w-full sm:w-64 pl-12 pr-4 py-3 rounded-full border-2 border-white shadow-sm focus:border-[#00E5FF] outline-none font-medium text-gray-600 bg-white transition-all"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>

            {/* Botão Adicionar */}
            <Button 
                className="w-full sm:w-auto h-12 px-8 rounded-full bg-[#00E5FF] hover:bg-[#00bcd4] text-white font-bold shadow-md hover:shadow-lg hover:-translate-y-1 transition-all" 
                onClick={() => setIsModalOpen(true)}
            >
              <UserPlus className="mr-2 w-5 h-5" />
              Novo Professor
            </Button>
          </div>
        </div>

        {/* ESTADOS DE CARREGAMENTO E ERRO */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-[#00E5FF] animate-spin mb-4" />
            <p className="text-[#3F3D56] font-bold text-lg">Buscando professores...</p>
          </div>
        )}

        {error && !isLoading && (
          <div className="bg-red-50 text-red-500 p-6 rounded-3xl text-center font-bold border-2 border-red-100">
            {error}
          </div>
        )}

        {!isLoading && !error && professores.length === 0 && (
          <div className="bg-white p-10 rounded-3xl text-center shadow-sm border-2 border-gray-100">
            <p className="text-gray-500 font-bold text-lg">Nenhum professor cadastrado ainda.</p>
          </div>
        )}

        {/* --- LISTA HORIZONTAL DE PROFESSORES --- */}
        {!isLoading && !error && professores.length > 0 && (
          <div className="flex flex-col gap-4">
            {professores.map((teacher) => (
              <div 
                key={teacher.id} 
                className="bg-white rounded-3xl p-5 shadow-sm hover:shadow-md transition-all duration-200 border-l-[8px] border-[#00E5FF] flex flex-col xl:flex-row xl:items-center gap-6 group"
              >
                
                {/* 1. Bloco de Identificação (Avatar + Nome) */}
                <div className="flex items-center gap-4 xl:w-1/4">
                  <div className="w-14 h-14 rounded-full bg-[#00E5FF]/10 text-[#00E5FF] flex items-center justify-center font-bold text-2xl shrink-0 uppercase border-2 border-[#00E5FF]/20">
                    {teacher.nome.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#3F3D56] leading-tight group-hover:text-[#00E5FF] transition-colors">
                      {teacher.nome}
                    </h3>
                    <p className="text-xs text-gray-400 font-bold mt-1 uppercase tracking-wide">
                      ID: #{teacher.id}
                    </p>
                  </div>
                </div>

                {/* 2. Bloco Acadêmico (Disciplina e Turma) */}
                <div className="flex flex-col sm:flex-row gap-4 xl:w-1/3">
                  <div className="flex items-center gap-2 bg-[#00E5FF]/10 text-[#009eb0] px-4 py-2 rounded-2xl flex-1 border border-[#00E5FF]/20">
                    <BookOpen className="w-4 h-4 shrink-0" />
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider opacity-70">Disciplina</p>
                      <p className="font-bold text-sm leading-tight truncate">{teacher.disciplina}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 bg-[#FDC12D]/10 text-[#d49e1e] px-4 py-2 rounded-2xl flex-1 border border-[#FDC12D]/20">
                    <MapPin className="w-4 h-4 shrink-0" />
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider opacity-70">Turma</p>
                      <p className="font-bold text-sm leading-tight truncate">{teacher.turma}</p>
                    </div>
                  </div>
                </div>

                {/* 3. Bloco de Acesso (Login/Senha) */}
                <div className="flex flex-col sm:flex-row gap-3 xl:w-1/3 bg-gray-50 p-3 rounded-2xl border border-gray-100 relative">
                    <div className="absolute -top-3 left-4 bg-white px-2 flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide text-gray-400 border border-gray-100 rounded-full">
                        <Key className="w-3 h-3" /> Acesso
                    </div>
                    
                    <div className="flex-1 mt-1">
                        <p className="text-[10px] font-bold text-gray-400 uppercase">Login</p>
                        <p className="text-sm font-bold text-[#3F3D56]">{teacher.login || 'Não gerado'}</p>
                    </div>
                    
                    <div className="flex-1 mt-1 flex items-center justify-between">
                        <div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase">Senha</p>
                            <p className="text-sm font-bold text-[#E91E63] font-mono tracking-wider">
                                {visiblePasswords.includes(teacher.id) ? (teacher.senha || '---') : '••••••••'}
                            </p>
                        </div>
                        <button 
                            onClick={() => togglePasswordVisibility(teacher.id)}
                            className="p-2 text-gray-400 hover:text-[#00E5FF] bg-white rounded-lg border border-gray-200 shadow-sm"
                            title="Mostrar/Esconder Senha"
                        >
                            {visiblePasswords.includes(teacher.id) ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                    </div>
                </div>

                {/* 4. Bloco de Ações (Editar / Remover) */}
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

        {/* Modal de Criação (Mantido igual) */}
        <CreateTeacherModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          onSuccess={handleSuccess}
        />

      </div>
    </div>
  )
}
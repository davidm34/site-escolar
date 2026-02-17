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
  Sparkles,
  Loader2 // Adicionado para o ícone de carregando
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { CreateTeacherModal } from "@/components/CreateTeacherModal"

// Interface baseada no retorno da sua API
interface Professor {
  id: number;
  nome: string;
  disciplina: string;
  turma: string;
}


export default function ManageTeachersPage() {
  // Estados para gerenciar os dados, carregamento e erros
  const [professores, setProfessores] = useState<Professor[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleSuccess = () => {
    console.log("Professor criado, atualizando lista...")
  }

  // useEffect para buscar os dados ao carregar a página
  useEffect(() => {
    const fetchProfessores = async () => {
      setIsLoading(true)
      const token = localStorage.getItem("@Escola:token")

      try {
        const response = await fetch("http://localhost:3001/professores", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` // Incluindo o token por segurança
          }
        })

        console.log(response)

        if (response.ok) {
          const data = await response.json()
          setProfessores(data)
        } else {
          setError("Não foi possível carregar a lista de professores.")
        }
      } catch (err) {
        setError("Erro de conexão com o servidor.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchProfessores()
  }, []) // O array vazio garante que rode apenas 1 vez ao abrir a tela

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
            <Link href="/painel-adminstrador/novo-professor">
              <Button className="w-full sm:w-auto h-12 px-8 rounded-full bg-[#00E5FF] hover:bg-[#00bcd4] text-white font-bold shadow-md hover:shadow-lg hover:-translate-y-1 transition-all" onClick={() => setIsModalOpen(true)}>
                <UserPlus className="mr-2 w-5 h-5" />
                Novo Professor
              </Button>
            </Link>
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

        {/* --- GRID DE PROFESSORES --- */}
        {!isLoading && !error && professores.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {professores.map((teacher) => (
              <div key={teacher.id} className="bg-white rounded-[35px] p-6 shadow-md hover:shadow-xl transition-all duration-300 border-b-[6px] border-[#00E5FF] relative group flex flex-col h-full">
                
                <Sparkles className="absolute top-4 right-4 w-5 h-5 text-[#00E5FF] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Cabeçalho do Card (Foto e Nome) */}
                <div className="flex items-center gap-4 mb-6">
                  {/* AVATAR: Pegando a primeira letra do nome e deixando maiúscula */}
                  <div className="w-14 h-14 rounded-full bg-[#00E5FF]/10 border-2 border-[#00E5FF] flex items-center justify-center text-[#00E5FF] font-bold text-2xl shrink-0 uppercase">
                    {teacher.nome.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#3F3D56] leading-tight">{teacher.nome}</h3>
                    <p className="text-xs text-gray-400 font-bold mt-1 uppercase tracking-wide">ID: {teacher.id}</p>
                  </div>
                </div>

                {/* Corpo do Card (Disciplinas e Turmas) */}
                <div className="space-y-4 flex-grow">
                  
                  {/* Disciplina */}
                  <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wide flex items-center gap-1 mb-2">
                      <BookOpen className="w-3 h-3" /> Disciplina
                    </h4>
                    <span className="inline-block bg-[#00E5FF]/10 text-[#00E5FF] px-3 py-1 rounded-md text-sm font-bold">
                      {teacher.disciplina}
                    </span>
                  </div>

                  {/* Turma */}
                  <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wide flex items-center gap-1 mb-2">
                      <MapPin className="w-3 h-3" /> Turma Atendida
                    </h4>
                    <span className="inline-block bg-[#FDC12D]/10 text-[#FDC12D] border border-[#FDC12D]/20 px-3 py-1 rounded-md text-sm font-bold">
                      {teacher.turma}
                    </span>
                  </div>

                </div>

                {/* Rodapé do Card (Botões de Ação) */}
                <div className="mt-6 pt-4 border-t border-gray-100 flex gap-3">
                  <Button 
                    variant="outline" 
                    className="flex-1 rounded-xl border-gray-200 text-gray-500 hover:text-[#00E5FF] hover:border-[#00E5FF] hover:bg-[#00E5FF]/5 font-bold h-10"
                  >
                    <Edit className="w-4 h-4 mr-2" /> Editar
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="flex-1 rounded-xl border-gray-200 text-gray-500 hover:text-[#E91E63] hover:border-[#E91E63] hover:bg-[#E91E63]/5 font-bold h-10"
                  >
                    <Trash2 className="w-4 h-4 mr-2" /> Remover
                  </Button>
                </div>

              </div>
            ))}
          </div>
        )}

        <CreateTeacherModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          onSuccess={handleSuccess}
        />

      </div>
    </div>
  )
}
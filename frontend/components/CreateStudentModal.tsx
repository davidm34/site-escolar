"use client"

import { 
  UserPlus, 
  X, 
  User, 
  Users, 
  Save, 
  Sparkles 
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react" // <-- Adicionado useEffect

interface CreateStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void; 
}

// Interface para definir o formato da Turma vinda da API
interface Turma {
  id: number;
  nome: string;
}

export function CreateStudentModal({ isOpen, onClose, onSuccess }: CreateStudentModalProps) {
  // Estados do formulário
  const [nome, setNome] = useState("")
  const [turmaSelecionada, setTurmaSelecionada] = useState("")
  const [turmaId, setTurmaId] = useState("")
  const [loading, setLoading] = useState(false)
  
  // Novos estados para as turmas dinâmicas
  const [turmas, setTurmas] = useState<Turma[]>([])
  const [loadingTurmas, setLoadingTurmas] = useState(false)

  // Efeito para buscar as turmas quando o modal for aberto
  useEffect(() => {
    if (isOpen) {
      const fetchTurmas = async () => {
        setLoadingTurmas(true);
        try {
          const token = localStorage.getItem("@Escola:token");
          const response = await fetch("http://localhost:3001/turmas", {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${token}`
            }
          });

          if (response.ok) {
            const data = await response.json();
            setTurmas(data);
          } else {
            console.error("Erro ao carregar as turmas");
          }
        } catch (error) {
          console.error("Erro de conexão ao buscar turmas:", error);
        } finally {
          setLoadingTurmas(false);
        }
      };

      fetchTurmas();
    }
  }, [isOpen]); // O useEffect roda sempre que o 'isOpen' muda

  // Se não estiver aberto, não renderiza nada
  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const token = localStorage.getItem("@Escola:token")

    try {
      const response = await fetch("http://localhost:3001/aluno", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          nome,
          turma: turmaId 
        })
      })

      const data = await response.json()

      if (response.ok) {
        alert(`Aluno criado com sucesso!\nLogin: ${data.acesso?.login}\nSenha: ${data.acesso?.senha}`)
        
        // Limpa os campos
        setNome("")
        setTurmaSelecionada("")
        
        if (onSuccess) onSuccess();
        onClose();
      } else {
        alert(data.erro || "Erro ao matricular aluno.")
      }
    } catch (error) {
      alert("Erro de conexão com o servidor.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 sm:p-6 font-fredoka">
      
      <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[40px] shadow-2xl border-b-[8px] border-[#E91E63] relative p-6 sm:p-10 hide-scrollbar">
        
        <Sparkles className="absolute top-8 right-8 w-8 h-8 text-[#E91E63] opacity-50 animate-pulse hidden md:block" />

        <button 
          onClick={onClose} 
          className="absolute top-6 right-6 text-gray-400 hover:text-[#E91E63] hover:bg-gray-100 p-2 rounded-full transition-colors"
        >
          <X className="w-6 h-6" strokeWidth={3} />
        </button>

        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 bg-[#E91E63] rounded-[20px] flex items-center justify-center shadow-md transform -rotate-3">
            <UserPlus className="w-7 h-7 text-white" strokeWidth={2.5} />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#3F3D56]">Novo Aluno</h2>
            <p className="text-gray-500 font-medium text-sm md:text-base">Matrícula rápida e geração de acesso.</p>
          </div>
        </div>

        <form className="space-y-8" onSubmit={handleSubmit}>
          
          <div className="space-y-2">
            <label className="text-sm font-bold text-[#E91E63] ml-2 uppercase tracking-wide">
              Nome Completo
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                required
                type="text" 
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Ex: Lucas Silva"
                className="w-full bg-[#FAFAFA] border-2 border-gray-100 focus:border-[#E91E63] text-gray-600 rounded-2xl py-4 pl-12 pr-4 outline-none transition-all font-medium text-lg h-14"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-[#E91E63] ml-2 uppercase tracking-wide">
              Turma
            </label>
            <div className="relative">
              <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select 
                required
                value={turmaId}
                onChange={(e) => setTurmaId(e.target.value)}
                disabled={loadingTurmas} // Desabilita enquanto carrega
                className="w-full bg-[#FAFAFA] border-2 border-gray-100 focus:border-[#E91E63] text-gray-600 rounded-2xl py-4 pl-12 pr-4 outline-none transition-all font-medium text-lg h-14 appearance-none cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <option value="" disabled>
                  {loadingTurmas ? "Carregando turmas..." : "Selecione a turma..."}
                </option>
                
                {/* Renderização dinâmica das turmas */}
                {turmas.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.nome}
                  </option>
                ))}

              </select>
            </div>
          </div>

          <hr className="border-gray-100 dashed my-6" />

          <div className="flex flex-col-reverse md:flex-row gap-4 justify-end pt-2">
            <Button 
              onClick={onClose}
              variant="ghost" 
              type="button" 
              className="w-full md:w-auto h-14 rounded-full text-gray-400 font-bold hover:bg-gray-100 text-lg"
            >
              Cancelar
            </Button>
            
            <Button 
              disabled={loading || loadingTurmas}
              type="submit"
              className="w-full md:w-auto h-14 px-12 rounded-full bg-[#E91E63] hover:bg-[#d81b60] text-white font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <Save className="mr-2 w-5 h-5" />
              {loading ? "Matriculando..." : "Matricular Aluno"}
            </Button>
          </div>

        </form>
      </div>
    </div>
  )
}
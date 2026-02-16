"use client"

import { 
  UserPlus, 
  X, // Trocamos o ChevronLeft por um X para fechar o modal
  User, 
  BookOpen, 
  Save, 
  School,
  GraduationCap
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

// Definimos as propriedades que o Modal vai receber
interface CreateTeacherModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void; // Para atualizar a lista após criar
}

export function CreateTeacherModal({ isOpen, onClose, onSuccess }: CreateTeacherModalProps) {
  // Estados para o formulário
  const [nome, setNome] = useState("")
  const [disciplinaId, setDisciplinaId] = useState("")
  const [turmaId, setTurmaId] = useState("")
  const [loading, setLoading] = useState(false)

  // Se isOpen for false, o modal não renderiza nada
  if (!isOpen) return null;

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
          disciplinas: disciplinaId,
          turmas: turmaId 
        })
      })

      const data = await response.json()

      if (response.ok) {
        alert(`Professor criado!\nLogin: ${data.acesso.login}\nSenha: ${data.acesso.senha}`)
        
        // Limpa os campos após o sucesso
        setNome("")
        setDisciplinaId("")
        setTurmaId("")
        
        // Chama a função de sucesso (ex: recarregar lista) e fecha o modal
        if (onSuccess) onSuccess();
        onClose();
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
    // Fundo escuro transparente que ocupa toda a tela (Overlay)
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 sm:p-6 font-fredoka">
      
      {/* Container do Modal (Card branco) */}
      <div className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-[40px] shadow-2xl border-b-[8px] border-[#00E5FF] relative p-6 sm:p-10 hide-scrollbar">
        
        {/* Botão de Fechar [X] no canto superior */}
        <button 
          onClick={onClose} 
          className="absolute top-6 right-6 text-gray-400 hover:text-[#E91E63] hover:bg-gray-100 p-2 rounded-full transition-colors"
        >
          <X className="w-6 h-6" strokeWidth={3} />
        </button>

        {/* Cabeçalho do Modal */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 bg-[#00E5FF] rounded-[20px] flex items-center justify-center shadow-md transform rotate-3">
            <UserPlus className="w-7 h-7 text-white" strokeWidth={2.5} />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#3F3D56]">Novo Professor</h2>
            <p className="text-gray-500 font-medium text-sm md:text-base">Cadastre os dados e gere o acesso escolar.</p>
          </div>
        </div>

        {/* Formulário */}
        <form className="space-y-8" onSubmit={handleSubmit}>
          
          {/* SEÇÃO 1: DADOS PESSOAIS */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-[#00E5FF] uppercase tracking-wider flex items-center gap-2">
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
          <div className="space-y-4">
            <h3 className="text-base font-bold text-[#E91E63] uppercase tracking-wider flex items-center gap-2">
              <GraduationCap className="w-5 h-5" /> Informações Escolares
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              
              {/* Disciplina */}
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
                    <option value="" disabled>Selecione...</option>
                    <option value="1">Português</option>
                    <option value="2">Matemática</option>
                    <option value="12">Ensino Infantil</option>
                  </select>
                </div>
              </div>

              {/* Turma */}
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
                          <option value="" disabled>Selecione...</option>
                          <option value="1">Maternal I</option>
                          <option value="2">Maternal II</option>
                          <option value="3">1° Ano</option>
                      </select>
                  </div>
              </div>
            </div>
          </div>

          {/* BOTÕES */}
          <div className="pt-4 flex flex-col-reverse md:flex-row gap-4 justify-end">
            {/* O botão cancelar agora chama a função onClose */}
            <Button 
              onClick={onClose} 
              variant="ghost" 
              type="button" 
              className="w-full md:w-auto h-14 rounded-full text-gray-400 font-bold hover:bg-gray-100 text-lg"
            >
              Cancelar
            </Button>
            
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
  )
}
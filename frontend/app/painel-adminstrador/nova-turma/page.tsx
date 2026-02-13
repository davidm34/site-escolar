"use client"

import { 
  Users, 
  ChevronLeft, 
  BookOpen, 
  Save, 
  Sparkles,
  Check,
  Loader2 // Ícone de carregamento
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useRouter } from "next/navigation" // Para redirecionar após sucesso

// Lista de Disciplinas Disponíveis 
const availableSubjects = [
  { id: 1, name: "Português", color: "bg-blue-100 text-blue-600 border-blue-200" },
  { id: 2, name: "Matemática", color: "bg-red-100 text-red-600 border-red-200" },
  { id: 3, name: "História", color: "bg-orange-100 text-orange-600 border-orange-200" },
  { id: 4, name: "Geografia", color: "bg-green-100 text-green-600 border-green-200" },
  { id: 5, name: "Ciências", color: "bg-teal-100 text-teal-600 border-teal-200" },
  { id: 6, name: "Redação", color: "bg-indigo-100 text-indigo-600 border-indigo-200" },
  { id: 7, name: "Inglês", color: "bg-pink-100 text-pink-600 border-pink-200" },
  { id: 8, name: "Espanhol", color: "bg-yellow-100 text-yellow-600 border-yellow-200" },
  { id: 9, name: "Educação Física", color: "bg-purple-100 text-purple-600 border-purple-200" },
  { id: 10, name: "Educação Financeira e Empreendedorismo", color: "bg-gray-100 text-gray-600 border-gray-200" },
  { id: 11, name: "Artes", color: "bg-cyan-100 text-cyan-600 border-cyan-200" },
  { id: 12, name: "Ensino Infantil", color: "bg-fuchsia-100 text-fuchsia-600 border-fuchsia-200" },
]

export default function CreateClassPage() {
const router = useRouter();
  const [nomeTurma, setNomeTurma] = useState(""); // Estado para o nome
  const [selectedSubjects, setSelectedSubjects] = useState<{id: number, nome: string}[]>([]);
  const [loading, setLoading] = useState(false);

  const toggleSubject = (id: number, nome: string) => {
    setSelectedSubjects(prev => {
      const isSelected = prev.find(subject => subject.id === id);
      
      if (isSelected) {
        // Se já existe, remove da lista
        return prev.filter(subject => subject.id !== id);
      } else {
        // Se não existe, adiciona o objeto completo
        return [...prev, { id, nome }];
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("@Escola:token");

    console.log(selectedSubjects)

    try {
      const response = await fetch("http://localhost:3001/turmas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` // Garante o envio do token
        },
        body: JSON.stringify({ 
          nome: nomeTurma, 
          disciplinas: selectedSubjects 
        }),
      });

      if (response.ok) {
        alert("Turma criada com sucesso!");
        router.push("/painel-adminstrador");
      } else {
        const errorData = await response.json();
        alert(errorData.erro || "Erro ao criar turma");
      }
    } catch (error) {
      alert("Erro de conexão com o servidor");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-[#FFFDE7] font-fredoka p-6 pb-20 relative overflow-hidden flex flex-col items-center">
      
      {/* Decoração de Fundo */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-[#FDC12D]/10 rounded-full blur-3xl z-0" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-[#9C27B0]/10 rounded-full blur-3xl z-0" />

      {/* Cabeçalho */}
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

      <div className="w-full max-w-4xl z-10">
        
        <div className="flex items-center gap-4 mb-8 pl-4">
          <div className="w-16 h-16 bg-[#FDC12D] rounded-[24px] flex items-center justify-center shadow-lg transform -rotate-6">
            <Users className="w-8 h-8 text-white" strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#3F3D56]">
              Criar Nova Turma
            </h1>
            <p className="text-gray-500 font-medium">
              Defina o nome e a grade curricular da classe.
            </p>
          </div>
        </div>

        {/* Formulário */}
        <div className="bg-white p-8 md:p-10 rounded-[40px] shadow-xl border-b-[8px] border-[#FDC12D] relative">
          
          <Sparkles className="absolute top-8 right-8 w-8 h-8 text-[#FDC12D] opacity-50 animate-pulse hidden md:block" />

          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Campo Nome */}
            <div>
              <h3 className="text-lg font-bold text-[#FDC12D] uppercase tracking-wider mb-4 flex items-center gap-2">
                <Users className="w-5 h-5" /> Identificação
              </h3>
              
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-500 ml-2">Nome da Turma</label>
                <input 
                  type="text" 
                  value={nomeTurma}
                  onChange={(e) => setNomeTurma(e.target.value)}
                  placeholder="Ex: Maternal II - B (Manhã)"
                  className="w-full bg-[#FAFAFA] border-2 border-gray-100 focus:border-[#FDC12D] text-gray-600 rounded-2xl py-4 px-6 outline-none transition-all font-medium text-lg h-16"
                  required
                />
              </div>
            </div>

            <hr className="border-gray-100 dashed" />

            {/* Campo Disciplinas */}
            <div>
              <h3 className="text-lg font-bold text-[#9C27B0] uppercase tracking-wider mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5" /> Disciplinas da Grade
              </h3>
              
              <p className="text-sm text-gray-400 font-medium mb-6 ml-1">
                Clique nas matérias que farão parte desta turma:
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {availableSubjects.map((subject) => {
                  const isSelected = selectedSubjects.some(s => s.id === subject.id);
                  
                  return (
                    <div 
                      key={subject.id}
                      onClick={() => toggleSubject(subject.id, subject.name)}
                      className={`
                        cursor-pointer rounded-2xl border-2 p-4 flex items-center justify-between transition-all duration-200 select-none
                        ${isSelected 
                          ? `${subject.color} shadow-md scale-105 font-bold` 
                          : 'bg-white border-gray-100 text-gray-400 hover:border-gray-200 hover:bg-gray-50'
                        }
                      `}
                    >
                      <span>{subject.name}</span>
                      {isSelected && (
                        <div className="bg-white/20 rounded-full p-1">
                          <Check className="w-4 h-4" strokeWidth={3} />
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
              
              <div className="mt-4 text-right">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">
                  {selectedSubjects.length} disciplinas selecionadas
                </span>
              </div>
            </div>

            {/* Botões */}
            <div className="pt-6 flex flex-col-reverse md:flex-row gap-4 justify-end">
              <Link href="/painel-adminstrador" className="w-full md:w-auto">
                <Button variant="ghost" type="button" className="w-full h-14 rounded-full text-gray-400 font-bold hover:bg-gray-100 text-lg">
                  Cancelar
                </Button>
              </Link>
              
              <Button 
                type="submit" 
                disabled={loading}
                className="w-full md:w-auto h-14 px-12 rounded-full bg-[#FDC12D] hover:bg-[#ffa000] text-[#3F3D56] font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                    Salvando...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 w-5 h-5" />
                    Salvar Turma
                  </>
                )}
              </Button>
            </div>

          </form>
        </div>
      </div>
    </div>
  )
}
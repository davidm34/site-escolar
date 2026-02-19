"use client"

import { 
  ChevronLeft, 
  Save, 
  Calculator, 
  BookOpen, 
  Users,
  Search,
  Loader2,
  GraduationCap
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"

// Tipagem dos dados
interface AlunoNota {
  id: number;
  nome: string;
  avatar: string;
  nota1: string;
  nota2: string;
  nota3: string;
  media: string; // Mudei para string para facilitar o display (toFixed)
}

interface Disciplina {
  id: number;
  nome: string;
}

// Mock de dados do professor (turmas e suas disciplinas)
const dadosProfessor = [
  { 
    id: 1, 
    turma: "Maternal II - Manhã", 
    disciplinas: [
      { id: 10, nome: "Polivalente" } // Caso de disciplina única
    ] 
  },
  { 
    id: 2, 
    turma: "1º Ano A - Tarde", 
    disciplinas: [
      { id: 20, nome: "Português" },
      { id: 21, nome: "Redação" } // Caso de múltiplas disciplinas
    ] 
  },
  { 
    id: 3, 
    turma: "Recreação - Integral", 
    disciplinas: [
      { id: 30, nome: "Educação Física" }
    ] 
  },
]

export default function GradesPage() {
  const [selectedTurmaId, setSelectedTurmaId] = useState<string>("")
  const [selectedDisciplinaId, setSelectedDisciplinaId] = useState<string>("")
  const [disciplinasDisponiveis, setDisciplinasDisponiveis] = useState<Disciplina[]>([])
  
  const [loading, setLoading] = useState(false)
  const [alunos, setAlunos] = useState<AlunoNota[]>([])
  const [searchTerm, setSearchTerm] = useState("")

  // 1. Efeito quando troca a TURMA
  useEffect(() => {
    if (!selectedTurmaId) {
      setDisciplinasDisponiveis([])
      setSelectedDisciplinaId("")
      return
    }

    // Acha a turma selecionada nos dados
    const turmaEncontrada = dadosProfessor.find(t => t.id.toString() === selectedTurmaId)
    
    if (turmaEncontrada) {
      setDisciplinasDisponiveis(turmaEncontrada.disciplinas)

      // LÓGICA DE AUTO-SELEÇÃO
      if (turmaEncontrada.disciplinas.length === 1) {
        // Se só tem uma, já seleciona ela automaticamente
        setSelectedDisciplinaId(turmaEncontrada.disciplinas[0].id.toString())
      } else {
        // Se tem mais de uma, reseta para o professor escolher
        setSelectedDisciplinaId("")
      }
    }
  }, [selectedTurmaId])

  // 2. Efeito quando troca a DISCIPLINA (Carrega os alunos)
  useEffect(() => {
    // Só carrega se tiver Turma E Disciplina selecionadas
    if (!selectedTurmaId || !selectedDisciplinaId) {
      setAlunos([]) // Limpa a tabela se faltar seleção
      return
    }

    setLoading(true)
    // Simulação de Fetch na API
    setTimeout(() => {
      const mockAlunos = [
        { id: 101, nome: "Ana Julia", avatar: "A", nota1: "8.5", nota2: "9.0", nota3: "", media: "5.8" },
        { id: 102, nome: "Bruno Marques", avatar: "B", nota1: "7.0", nota2: "6.5", nota3: "8.0", media: "7.1" },
        { id: 103, nome: "Carlos Eduardo", avatar: "C", nota1: "10", nota2: "10", nota3: "10", media: "10.0" },
        { id: 104, nome: "Daniela Costa", avatar: "D", nota1: "5.5", nota2: "4.0", nota3: "", media: "3.1" },
      ]
      setAlunos(mockAlunos)
      setLoading(false)
    }, 600)
  }, [selectedTurmaId, selectedDisciplinaId])

  // Função para atualizar nota
  const handleNotaChange = (id: number, field: 'nota1' | 'nota2' | 'nota3', value: string) => {
    // Validação: aceita apenas números e ponto, max 10 chars
    if (value && !/^\d*\.?\d*$/.test(value)) return;
    
    // Converte para float para checar limite 10
    const floatVal = parseFloat(value)
    if (floatVal > 10) return;

    setAlunos(prev => prev.map(aluno => {
      if (aluno.id === id) {
        const updatedAluno = { ...aluno, [field]: value }
        
        // Recalcular Média Simples
        const n1 = parseFloat(updatedAluno.nota1) || 0
        const n2 = parseFloat(updatedAluno.nota2) || 0
        const n3 = parseFloat(updatedAluno.nota3) || 0
        
        // Se o campo estiver vazio, não conta na divisão? Ou divide sempre por 3?
        // Aqui assumindo divisão por 3 fixa
        const novaMedia = (n1 + n2 + n3) / 3
        
        return { ...updatedAluno, media: novaMedia.toFixed(1) }
      }
      return aluno
    }))
  }

  const filteredAlunos = alunos.filter(a => 
    a.nome.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-[#FFFDE7] font-fredoka p-6 pb-20 relative overflow-hidden flex flex-col items-center">
      
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-[#00E5FF]/10 rounded-full blur-3xl z-0" />
      <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-[#E91E63]/10 rounded-full blur-3xl z-0" />

      <div className="w-full max-w-6xl z-10 flex items-center justify-between mb-8">
        <Link href="/painel-professor">
          <Button variant="ghost" className="text-[#3F3D56] hover:bg-white/50 hover:text-[#00E5FF] font-bold rounded-full gap-2 pl-2">
            <div className="bg-white p-2 rounded-full shadow-sm">
               <ChevronLeft className="w-5 h-5" strokeWidth={3} />
            </div>
            <span>Voltar</span>
          </Button>
        </Link>
      </div>

      <div className="w-full max-w-6xl z-10">
        
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
          <div className="flex items-center gap-4 pl-4">
            <div className="w-16 h-16 bg-[#E91E63] rounded-[24px] flex items-center justify-center shadow-lg transform -rotate-3">
              <Calculator className="w-8 h-8 text-white" strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-[#3F3D56]">
                Lançar Notas
              </h1>
              <p className="text-gray-500 font-medium">
                Selecione a turma e preencha as avaliações.
              </p>
            </div>
          </div>

          {/* ÁREA DE SELEÇÃO DUPLA (TURMA + DISCIPLINA) */}
          <div className="flex flex-col md:flex-row gap-4 w-full lg:w-auto">
            
            {/* 1. Seletor de Turma */}
            <div className="w-full md:w-64">
              <label className="text-sm font-bold text-[#00E5FF] ml-2 uppercase tracking-wide mb-1 block">
                Turma
              </label>
              <div className="relative">
                <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select 
                  value={selectedTurmaId}
                  onChange={(e) => setSelectedTurmaId(e.target.value)}
                  className="w-full bg-white border-2 border-[#00E5FF]/30 focus:border-[#00E5FF] text-[#3F3D56] rounded-2xl py-3 pl-12 pr-10 outline-none transition-all font-bold shadow-sm appearance-none cursor-pointer h-12 truncate"
                >
                  <option value="" disabled>Selecione...</option>
                  {dadosProfessor.map(t => (
                    <option key={t.id} value={t.id}>{t.turma}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* 2. Seletor de Disciplina */}
            <div className="w-full md:w-64">
              <label className="text-sm font-bold text-[#E91E63] ml-2 uppercase tracking-wide mb-1 block">
                Disciplina
              </label>
              <div className="relative">
                <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select 
                  value={selectedDisciplinaId}
                  onChange={(e) => setSelectedDisciplinaId(e.target.value)}
                  // Se não tem turma, ou se só tem 1 disciplina (auto-fixada), desabilita visualmente ou foca
                  disabled={!selectedTurmaId || disciplinasDisponiveis.length === 0} 
                  className={`
                    w-full border-2 text-[#3F3D56] rounded-2xl py-3 pl-12 pr-10 outline-none transition-all font-bold shadow-sm appearance-none h-12 truncate
                    ${disciplinasDisponiveis.length === 1 
                      ? "bg-gray-100 border-gray-200 text-gray-500 cursor-not-allowed" // Estilo travado
                      : "bg-white border-[#E91E63]/30 focus:border-[#E91E63] cursor-pointer" // Estilo liberado
                    }
                  `}
                >
                  <option value="" disabled>
                    {!selectedTurmaId ? "Aguardando Turma..." : "Selecione..."}
                  </option>
                  {disciplinasDisponiveis.map(d => (
                    <option key={d.id} value={d.id}>{d.nome}</option>
                  ))}
                </select>
              </div>
            </div>

          </div>
        </div>

        {/* --- CONTEÚDO PRINCIPAL --- */}
        {!selectedTurmaId || !selectedDisciplinaId ? (
          // Estado Vazio
          <div className="bg-white/50 border-2 border-dashed border-gray-300 rounded-[40px] p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
            <BookOpen className="w-16 h-16 text-gray-300 mb-4" />
            <h3 className="text-xl font-bold text-gray-400">Aguardando Seleção</h3>
            <p className="text-gray-400">Escolha a turma e a disciplina para ver o diário.</p>
          </div>
        ) : loading ? (
          // Loading
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-[#00E5FF] animate-spin mb-4" />
            <p className="text-[#3F3D56] font-bold text-lg">Carregando notas...</p>
          </div>
        ) : (
          // Tabela de Notas
          <div className="bg-white rounded-[35px] shadow-xl border-b-[8px] border-[#00E5FF] overflow-hidden">
            
            <div className="p-6 border-b border-gray-100 bg-gray-50 flex items-center gap-4">
              <Search className="w-5 h-5 text-gray-400" />
              <input 
                type="text" 
                placeholder="Filtrar aluno por nome..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent outline-none text-[#3F3D56] font-medium w-full placeholder:text-gray-300"
              />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left min-w-[600px]">
                <thead>
                  <tr className="bg-[#00E5FF]/10 text-[#00E5FF]">
                    <th className="p-6 font-bold uppercase text-sm tracking-wider w-[40%]">Aluno</th>
                    <th className="p-6 font-bold uppercase text-sm text-center w-[15%]">Unid. 1</th>
                    <th className="p-6 font-bold uppercase text-sm text-center w-[15%]">Unid. 2</th>
                    <th className="p-6 font-bold uppercase text-sm text-center w-[15%]">Unid. 3</th>
                    <th className="p-6 font-bold uppercase text-sm text-center w-[15%]">Média</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredAlunos.map((aluno) => (
                    <tr key={aluno.id} className="hover:bg-[#FFFDE7] transition-colors group">
                      
                      <td className="p-4 pl-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-[#E91E63]/10 text-[#E91E63] border border-[#E91E63]/20 flex items-center justify-center font-bold text-lg">
                            {aluno.avatar}
                          </div>
                          <div>
                            <p className="font-bold text-[#3F3D56]">{aluno.nome}</p>
                            <p className="text-xs text-gray-400 font-bold">Matrícula: {aluno.id}</p>
                          </div>
                        </div>
                      </td>

                      {['nota1', 'nota2', 'nota3'].map((field, index) => (
                        <td key={index} className="p-2 text-center">
                          <input 
                            type="text"
                            inputMode="decimal"
                            value={aluno[field as keyof AlunoNota] as string}
                            onChange={(e) => handleNotaChange(aluno.id, field as any, e.target.value)}
                            placeholder="-"
                            className="w-16 h-12 bg-gray-50 border-2 border-transparent focus:border-[#00E5FF] focus:bg-white rounded-xl text-center font-bold text-lg text-[#3F3D56] outline-none transition-all placeholder:text-gray-300"
                          />
                        </td>
                      ))}

                      <td className="p-4 text-center">
                        <div className={`
                          inline-flex items-center justify-center w-16 h-10 rounded-xl font-bold text-lg border-2
                          ${parseFloat(aluno.media) >= 6 
                            ? "bg-[#00E5FF]/10 text-[#00E5FF] border-[#00E5FF]/20" 
                            : "bg-[#E91E63]/10 text-[#E91E63] border-[#E91E63]/20"}
                        `}>
                          {isNaN(parseFloat(aluno.media)) ? "-" : aluno.media}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
              <span className="text-sm font-bold text-gray-400">
                Total: {filteredAlunos.length} alunos
              </span>
              <Button className="h-12 px-8 rounded-full bg-[#E91E63] hover:bg-[#d81b60] text-white font-bold shadow-md hover:translate-y-[-2px] transition-all">
                <Save className="mr-2 w-5 h-5" />
                Salvar Notas
              </Button>
            </div>

          </div>
        )}
      </div>
    </div>
  )
}
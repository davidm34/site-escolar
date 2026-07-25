"use client"

import { 
  ChevronLeft, 
  Save, 
  CheckSquare, 
  BookOpen, 
  Users,
  Search,
  Loader2,
  GraduationCap,
  Percent
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"

// Tipagem focada em Frequência Anual
interface AlunoFrequencia {
  id: number;
  nome: string;
  frequencia: string; 
}

interface Disciplina {
  id: number;
  nome: string;
}

interface TurmaProfessor {
  id: number;
  turma: string;
  disciplinas: Disciplina[];
}

export default function AttendancePage() {
  const [dadosProfessor, setDadosProfessor] = useState<TurmaProfessor[]>([])
  const [selectedTurmaId, setSelectedTurmaId] = useState<string>("")
  const [selectedDisciplinaId, setSelectedDisciplinaId] = useState<string>("")
  
  const [disciplinasDisponiveis, setDisciplinasDisponiveis] = useState<Disciplina[]>([])
  const [loading, setLoading] = useState(false)
  const [alunos, setAlunos] = useState<AlunoFrequencia[]>([])
  const [searchTerm, setSearchTerm] = useState("")

  // 1. Efeito para carregar as TURMAS do professor via API
  useEffect(() => {
    const fetchTurmas = async () => {
      // CORREÇÃO AQUI: Voltando para o padrão correto do seu sistema "@Escola:user"
      const savedUser = localStorage.getItem("@Escola:user");
      const token = localStorage.getItem("@Escola:token"); 

      if (savedUser && token) {
        const user = JSON.parse(savedUser);
        const id = user.id;

        try {
          const response = await fetch(`http://localhost:3001/turmas/professores?id=${id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}` 
            }
          });

          if (response.ok) {
            const data = await response.json();
            setDadosProfessor(data);
          }
        } catch (error) {
          console.error("Erro ao carregar turmas:", error);
        }
      }
    };

    fetchTurmas();
  }, []);

  // 2. Efeito quando troca a TURMA selecionada
  useEffect(() => {
    if (!selectedTurmaId) {
      setDisciplinasDisponiveis([])
      setSelectedDisciplinaId("")
      return
    }

    const turmaEncontrada = dadosProfessor.find(t => t.id.toString() === selectedTurmaId)
    
    if (turmaEncontrada) {
      setDisciplinasDisponiveis(turmaEncontrada.disciplinas)
      
      // Auto-selecionar se tiver apenas 1 disciplina
      if (turmaEncontrada.disciplinas.length === 1) {
        setSelectedDisciplinaId(turmaEncontrada.disciplinas[0].id.toString())
      } else {
        setSelectedDisciplinaId("")
      }
    }
  }, [selectedTurmaId, dadosProfessor])

  // 3. Efeito quando troca a DISCIPLINA (Carrega os alunos)
  useEffect(() => {
    const fetchAlunosDaTurma = async () => {
      if (!selectedTurmaId || !selectedDisciplinaId) {
        setAlunos([]);
        return;
      }

      setLoading(true);
      const token = localStorage.getItem("@Escola:token");

      try {
        const response = await fetch(
          `http://localhost:3001/turmas/alunos?turmaId=${selectedTurmaId}&disciplinaId=${selectedDisciplinaId}`, 
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          }
        );

        if (response.ok) {
          const data = await response.json();
          // Todos começam com 100% de frequência por padrão para poupar tempo
          const alunosComFrequencia = data.map((aluno: any) => ({
            id: aluno.id,
            nome: aluno.nome,
            frequencia: "100"
          }));
          setAlunos(alunosComFrequencia);
        }
      } catch (error) {
        console.error("Erro na requisição de alunos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlunosDaTurma();
  }, [selectedTurmaId, selectedDisciplinaId]);

  // Função para lidar com a digitação da porcentagem
  const handleFrequenciaChange = (id: number, value: string) => {
    // Permite apenas números e um ponto decimal
    if (value && !/^\d*\.?\d*$/.test(value)) return;
    
    // Limita o valor máximo a 100
    if (parseFloat(value) > 100) return;

    setAlunos(prev => prev.map(aluno => {
      if (aluno.id === id) {
        return { ...aluno, frequencia: value }
      }
      return aluno
    }))
  }

  const filteredAlunos = alunos.filter(a => 
    a.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Função para salvar a frequência anual
  const handleSave = async () => {
    setLoading(true);
    const token = localStorage.getItem("@Escola:token");

    try {
      const promises = alunos.map(aluno => {
        return fetch(`http://localhost:3001/frequencias/anual`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            aluno_id: aluno.id,
            disciplina_id: selectedDisciplinaId,
            frequencia_anual: parseFloat(aluno.frequencia) || 0 // Converte para número
          })
        });
      });

      const resultados = await Promise.all(promises);
      
      if (resultados.every(res => res.ok)) {
        alert("Frequência anual registrada com sucesso!");
      } else {
        alert("Alguns registros falharam. Verifique as permissões ou conexão.");
      }
    } catch (error) {
      console.error("Erro ao comunicar com o servidor:", error);
      alert("Erro técnico ao salvar a frequência.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDE7] font-fredoka p-6 pb-20 relative overflow-hidden flex flex-col items-center">
      
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-[#00E5FF]/10 rounded-full blur-3xl z-0" />
      <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-[#8BC34A]/10 rounded-full blur-3xl z-0" />

      <div className="w-full max-w-5xl z-10 flex items-center justify-between mb-8">
        <Link href="/painel-professor">
          <Button variant="ghost" className="text-[#3F3D56] hover:bg-white/50 hover:text-[#00E5FF] font-bold rounded-full gap-2 pl-2">
            <div className="bg-white p-2 rounded-full shadow-sm">
               <ChevronLeft className="w-5 h-5" strokeWidth={3} />
            </div>
            <span>Voltar</span>
          </Button>
        </Link>
      </div>

      <div className="w-full max-w-5xl z-10">
        
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
          <div className="flex items-center gap-4 pl-4">
            <div className="w-16 h-16 bg-[#00E5FF] rounded-[24px] flex items-center justify-center shadow-lg transform rotate-3">
              <CheckSquare className="w-8 h-8 text-white" strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-[#3F3D56]">
                Frequência Anual
              </h1>
              <p className="text-gray-500 font-medium">
                Informe a % final de presença do aluno.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 w-full lg:w-auto">
            {/* Turma */}
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
                    <option key={t.id} value={t.id.toString()}>{t.turma}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Disciplina */}
            <div className="w-full md:w-64">
              <label className="text-sm font-bold text-[#E91E63] ml-2 uppercase tracking-wide mb-1 block">
                Disciplina
              </label>
              <div className="relative">
                <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select 
                  value={selectedDisciplinaId}
                  onChange={(e) => setSelectedDisciplinaId(e.target.value)}
                  disabled={!selectedTurmaId || disciplinasDisponiveis.length === 0} 
                  className={`
                    w-full border-2 text-[#3F3D56] rounded-2xl py-3 pl-12 pr-10 outline-none transition-all font-bold shadow-sm appearance-none h-12 truncate
                    ${disciplinasDisponiveis.length === 1 
                      ? "bg-gray-100 border-gray-200 text-gray-500 cursor-not-allowed" 
                      : "bg-white border-[#E91E63]/30 focus:border-[#E91E63] cursor-pointer" 
                    }
                  `}
                >
                  <option value="" disabled>
                    {!selectedTurmaId ? "Aguardando Turma..." : "Selecione..."}
                  </option>
                  {disciplinasDisponiveis.map(d => (
                    <option key={d.id} value={d.id.toString()}>{d.nome}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {!selectedTurmaId || !selectedDisciplinaId ? (
          <div className="bg-white/50 border-2 border-dashed border-gray-300 rounded-[40px] p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
            <BookOpen className="w-16 h-16 text-gray-300 mb-4" />
            <h3 className="text-xl font-bold text-gray-400">Aguardando Seleção</h3>
            <p className="text-gray-400">Escolha a turma e a disciplina para lançar a frequência.</p>
          </div>
        ) : loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-[#00E5FF] animate-spin mb-4" />
            <p className="text-[#3F3D56] font-bold text-lg">Carregando lista de alunos...</p>
          </div>
        ) : (
          <div className="bg-white rounded-[35px] shadow-xl border-b-[8px] border-[#00E5FF] overflow-hidden">
            <div className="p-6 border-b border-gray-100 bg-gray-50 flex items-center gap-4">
              <Search className="w-5 h-5 text-gray-400" />
              <input 
                type="text" 
                placeholder="Buscar aluno por nome..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent outline-none text-[#3F3D56] font-medium w-full placeholder:text-gray-300"
              />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left min-w-[500px]">
                <thead>
                  <tr className="bg-[#00E5FF]/10 text-[#00E5FF]">
                    <th className="p-6 font-bold uppercase text-sm tracking-wider w-2/3">Aluno</th>
                    <th className="p-6 font-bold uppercase text-sm text-center w-1/3">Presença (%)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredAlunos.map((aluno) => {
                    const freqNumber = parseFloat(aluno.frequencia);
                    const isAlert = freqNumber < 75; // Fica vermelho se for menor que 75%

                    return (
                      <tr key={aluno.id} className="hover:bg-[#FFFDE7] transition-colors group">
                        
                        {/* Avatar e Nome */}
                        <td className="p-4 pl-6">
                          <div className="flex items-center gap-3">
                            <div className={`
                              w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg uppercase border-2
                              ${isAlert 
                                ? 'bg-[#E91E63]/10 text-[#E91E63] border-[#E91E63]/20' 
                                : 'bg-[#00E5FF]/10 text-[#00E5FF] border-[#00E5FF]/20'}
                            `}>
                              {aluno.nome.charAt(0)}
                            </div>
                            <div>
                              <p className="font-bold text-[#3F3D56]">{aluno.nome}</p>
                              <p className="text-xs text-gray-400 font-bold">Matrícula: {aluno.id}</p>
                            </div>
                          </div>
                        </td>

                        {/* Input de Porcentagem */}
                        <td className="p-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <input 
                              type="text"
                              inputMode="decimal"
                              value={aluno.frequencia}
                              onChange={(e) => handleFrequenciaChange(aluno.id, e.target.value)}
                              placeholder="100"
                              className={`
                                w-24 h-12 bg-gray-50 border-2 text-center font-bold text-xl outline-none transition-all placeholder:text-gray-300 rounded-xl
                                ${isAlert 
                                  ? 'text-[#E91E63] border-[#E91E63]/30 focus:border-[#E91E63] focus:bg-white' 
                                  : 'text-[#3F3D56] border-transparent focus:border-[#00E5FF] focus:bg-white'}
                              `}
                            />
                            <Percent className={`w-5 h-5 ${isAlert ? 'text-[#E91E63]' : 'text-gray-400'}`} />
                          </div>
                        </td>

                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            
            <div className="p-6 bg-gray-50 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
              <span className="text-sm font-bold text-gray-400">
                Total: {filteredAlunos.length} alunos
              </span>
              
              <Button 
                onClick={handleSave}
                disabled={loading}
                className="w-full sm:w-auto h-12 px-8 rounded-full bg-[#00E5FF] hover:bg-[#00bcd4] text-white font-bold shadow-md hover:translate-y-[-2px] transition-all disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                ) : (
                  <Save className="mr-2 w-5 h-5" />
                )}
                Salvar Frequência
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
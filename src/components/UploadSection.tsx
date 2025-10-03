import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, FileText, X, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface UploadSectionProps {
  onAnalysisComplete: (score: number) => void;
}

const UploadSection = ({ onAnalysisComplete }: UploadSectionProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && (droppedFile.type === "application/pdf" || 
        droppedFile.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document")) {
      setFile(droppedFile);
      toast({
        title: "Arquivo carregado",
        description: `${droppedFile.name} está pronto para análise.`,
      });
    } else {
      toast({
        title: "Formato inválido",
        description: "Por favor, envie apenas arquivos PDF ou DOCX.",
        variant: "destructive",
      });
    }
  }, [toast]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      toast({
        title: "Arquivo carregado",
        description: `${selectedFile.name} está pronto para análise.`,
      });
    }
  };

  const removeFile = () => {
    setFile(null);
    toast({
      title: "Arquivo removido",
      description: "Você pode fazer upload de outro arquivo.",
    });
  };

  const handleAnalyze = async () => {
    if (!file) {
      toast({
        title: "Nenhum arquivo",
        description: "Por favor, faça upload de um artigo primeiro.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    toast({
      title: "Análise iniciada",
      description: "3 IAs estão avaliando seu artigo...",
    });

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/analyze-document`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error('Erro ao analisar documento');
      }

      const data = await response.json();
      
      toast({
        title: "Análise concluída!",
        description: `Nota final: ${data.score}/10`,
      });

      onAnalysisComplete(data.score);
      
    } catch (error) {
      console.error('Erro:', error);
      toast({
        title: "Erro na análise",
        description: "Não foi possível analisar o documento. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <section id="upload-section" className="py-20 bg-muted/30">
      <div className="container px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">
              Faça Upload do seu Artigo
            </h2>
            <p className="text-xl text-muted-foreground">
              Arraste e solte seu arquivo ou clique para selecionar
            </p>
          </div>

          <Card className="border-2 shadow-card">
            <CardContent className="p-8">
              {!file ? (
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`
                    relative border-2 border-dashed rounded-2xl p-12 text-center
                    transition-all duration-300 cursor-pointer
                    ${isDragging 
                      ? 'border-primary bg-primary/5 scale-105' 
                      : 'border-border bg-muted/30 hover:border-primary/50 hover:bg-primary/5'
                    }
                  `}
                >
                  <input
                    type="file"
                    accept=".pdf,.docx"
                    onChange={handleFileInput}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                      <Upload className="w-10 h-10 text-primary" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-lg font-semibold">
                        Arraste seu arquivo aqui
                      </p>
                      <p className="text-muted-foreground">
                        ou clique para selecionar
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Suporta: PDF, DOCX (máx. 20MB)
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center gap-4 p-6 rounded-xl bg-muted border border-border">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <FileText className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold truncate">{file.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={removeFile}
                      className="flex-shrink-0"
                    >
                      <X className="w-5 h-5" />
                    </Button>
                  </div>

                  <Button 
                    onClick={handleAnalyze}
                    size="lg"
                    className="w-full"
                    disabled={isAnalyzing}
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Analisando...
                      </>
                    ) : (
                      'Analisar Artigo'
                    )}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="shadow-soft">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-3">
                  O que analisamos
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">✓</span>
                    Qualidade metodológica
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">✓</span>
                    Relevância científica
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">✓</span>
                    Estrutura e organização
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">✓</span>
                    Citações e referências
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-3">
                  Resultados detalhados
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">★</span>
                    Nota de 0 a 10
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">★</span>
                    Pontos fortes identificados
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">★</span>
                    Áreas de melhoria
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">★</span>
                    Sugestões personalizadas
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UploadSection;

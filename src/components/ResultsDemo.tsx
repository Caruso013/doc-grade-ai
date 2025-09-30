import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, AlertCircle, TrendingUp } from "lucide-react";

const ResultsDemo = () => {
  return (
    <section className="py-20">
      <div className="container px-4">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <Badge variant="outline" className="px-4 py-1">
              Exemplo de Resultado
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold">
              Análise Detalhada
            </h2>
            <p className="text-xl text-muted-foreground">
              Veja como apresentamos os resultados da análise
            </p>
          </div>

          <div className="grid gap-6">
            <Card className="shadow-card border-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl">Nota Geral</CardTitle>
                  <div className="flex items-center gap-2">
                    <span className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                      8.5
                    </span>
                    <span className="text-2xl text-muted-foreground">/10</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Qualidade Metodológica</span>
                      <span className="text-sm font-bold">9.0</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-primary to-primary-glow rounded-full" style={{ width: '90%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Relevância Científica</span>
                      <span className="text-sm font-bold">8.5</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-primary to-primary-glow rounded-full" style={{ width: '85%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Estrutura e Organização</span>
                      <span className="text-sm font-bold">8.0</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-primary to-primary-glow rounded-full" style={{ width: '80%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Citações e Referências</span>
                      <span className="text-sm font-bold">8.5</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-primary to-primary-glow rounded-full" style={{ width: '85%' }} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-accent" />
                    Pontos Fortes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">•</span>
                      <span className="text-sm">Metodologia rigorosa e bem documentada</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">•</span>
                      <span className="text-sm">Revisão bibliográfica abrangente</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">•</span>
                      <span className="text-sm">Resultados estatisticamente significativos</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">•</span>
                      <span className="text-sm">Discussão clara e objetiva</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-primary" />
                    Sugestões de Melhoria
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span className="text-sm">Expandir a seção de limitações do estudo</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span className="text-sm">Incluir mais estudos recentes (2023-2024)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span className="text-sm">Detalhar implicações clínicas práticas</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span className="text-sm">Adicionar tabelas comparativas</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Card className="shadow-soft border-accent/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-accent" />
                  Recomendação Final
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Este artigo demonstra excelente qualidade metodológica e relevância científica. 
                  Recomendamos publicação após pequenas revisões nas áreas identificadas. 
                  O trabalho apresenta contribuição significativa para a área médica e segue 
                  rigorosamente as normas científicas estabelecidas.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResultsDemo;

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ResultsDemoProps {
  score: number | null;
}

const ResultsDemo = ({ score }: ResultsDemoProps) => {
  if (score === null) return null;

  return (
    <section className="py-20">
      <div className="container px-4">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">
              Resultado da Análise
            </h2>
            <p className="text-xl text-muted-foreground">
              Avaliação realizada por 3 sistemas de IA
            </p>
          </div>

          <div className="grid gap-6">
            <Card className="shadow-card border-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl">Nota Final</CardTitle>
                  <div className="flex items-center gap-2">
                    <span className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                      {score.toFixed(1)}
                    </span>
                    <span className="text-2xl text-muted-foreground">/10</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground">
                  Avaliação realizada pela média de 2 IAs especialistas e coordenada por 1 IA delegadora
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

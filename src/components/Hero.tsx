import { Button } from "@/components/ui/button";
import { FileText, Sparkles, TrendingUp } from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";

const Hero = () => {
  const scrollToUpload = () => {
    document.getElementById('upload-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img 
          src={heroBackground} 
          alt="Medical AI Analysis" 
          className="w-full h-full object-cover opacity-5"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background/95 to-accent/10" />
      
      <div className="container relative z-10 px-4 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Análise Científica Inteligente</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent">
              Análise de Artigos
            </span>
            <br />
            <span className="text-foreground">com Inteligência Artificial</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Avalie a qualidade de artigos científicos de forma rápida e precisa. 
            Nossa IA especializada analisa e classifica publicações médicas.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button 
              size="lg" 
              onClick={scrollToUpload}
              className="text-lg px-8 shadow-lg hover:shadow-xl transition-all"
            >
              <FileText className="mr-2 h-5 w-5" />
              Analisar Artigo
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="text-lg px-8"
            >
              Saiba Mais
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
            <div className="p-6 rounded-2xl bg-card border border-border shadow-soft backdrop-blur-sm">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Upload Simples</h3>
              <p className="text-muted-foreground text-sm">
                Faça upload de PDFs ou documentos diretamente
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-card border border-border shadow-soft backdrop-blur-sm">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 mx-auto">
                <Sparkles className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Análise IA</h3>
              <p className="text-muted-foreground text-sm">
                Avaliação automática com critérios científicos
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-card border border-border shadow-soft backdrop-blur-sm">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Nota & Feedback</h3>
              <p className="text-muted-foreground text-sm">
                Receba nota detalhada e sugestões de melhoria
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

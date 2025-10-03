import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Função para simular análise de IA (será substituída por OpenAI)
async function analyzeWithAI(documentText: string, aiRole: string): Promise<number> {
  // TODO: Integrar com OpenAI API
  // const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
  
  // Por enquanto, retorna uma nota simulada
  const simulatedScore = Math.random() * 3 + 7; // Nota entre 7 e 10
  console.log(`${aiRole} avaliou com nota: ${simulatedScore.toFixed(1)}`);
  
  // Simulação de tempo de processamento
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return simulatedScore;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return new Response(
        JSON.stringify({ error: 'Nenhum arquivo enviado' }), 
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Processando arquivo: ${file.name}, tamanho: ${file.size} bytes`);

    // Extrair texto do documento (simplificado para MVP)
    const documentText = await file.text();

    // Sistema de 3 IAs:
    // IA 1: Avaliadora - Foco em metodologia e estrutura
    const scoreAI1 = await analyzeWithAI(documentText, "IA Avaliadora 1 (Metodologia)");

    // IA 2: Avaliadora - Foco em relevância e conteúdo
    const scoreAI2 = await analyzeWithAI(documentText, "IA Avaliadora 2 (Relevância)");

    // IA 3: Delegadora - Analisa as duas avaliações e decide a nota final
    const averageScore = (scoreAI1 + scoreAI2) / 2;
    console.log(`IA Delegadora calculou média: ${averageScore.toFixed(1)}`);

    // Nota final arredondada
    const finalScore = Math.round(averageScore * 10) / 10;

    console.log(`Análise concluída. Nota final: ${finalScore}`);

    return new Response(
      JSON.stringify({ 
        score: finalScore,
        ai1Score: Math.round(scoreAI1 * 10) / 10,
        ai2Score: Math.round(scoreAI2 * 10) / 10,
        message: 'Análise concluída com sucesso'
      }), 
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Erro na análise do documento:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Erro ao processar documento',
        details: error instanceof Error ? error.message : 'Erro desconhecido'
      }), 
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});

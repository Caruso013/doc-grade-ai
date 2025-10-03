import { useState } from "react";
import Hero from "@/components/Hero";
import UploadSection from "@/components/UploadSection";
import ResultsDemo from "@/components/ResultsDemo";

const Index = () => {
  const [analysisScore, setAnalysisScore] = useState<number | null>(null);

  const handleAnalysisComplete = (score: number) => {
    setAnalysisScore(score);
    // Scroll suave até os resultados
    setTimeout(() => {
      document.querySelector('#results-section')?.scrollIntoView({ 
        behavior: 'smooth' 
      });
    }, 100);
  };

  return (
    <div className="min-h-screen">
      <Hero />
      <UploadSection onAnalysisComplete={handleAnalysisComplete} />
      <div id="results-section">
        <ResultsDemo score={analysisScore} />
      </div>
    </div>
  );
};

export default Index;

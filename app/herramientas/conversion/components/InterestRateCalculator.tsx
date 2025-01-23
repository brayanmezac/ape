'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { X } from 'lucide-react'
import { TasaReferencia } from './TasaReferencia'
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible"
import { ChevronDown } from "lucide-react"

const periodosAlAno = {
  diario: 360,
  mensualVencido: 12,
  bimestralVencido: 6,
  trimestralVencido: 4,
  semestralVencido: 2,
  anualVencido: 1,
} as const;

type Periodo = keyof typeof periodosAlAno;

export function InterestRateCalculator() {
  const [rates, setRates] = useState<Record<Periodo, string>>(() => 
    Object.keys(periodosAlAno).reduce((acc, periodo) => ({ ...acc, [periodo]: '' }), {}) as Record<Periodo, string>
  );
  const [error, setError] = useState<string | null>(null);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleInputChange = (periodo: Periodo, value: string) => {
    const cleanedValue = value.replace(/[^0-9.]/g, '');
    setRates(prev => ({ ...prev, [periodo]: cleanedValue }));
  };

  const calculateRates = () => {
    const periodoBase = Object.keys(rates).find(periodo => rates[periodo as Periodo] !== '') as Periodo | undefined;

    if (!periodoBase) {
      setError('Por favor, ingrese al menos una tasa.');
      return;
    }
    
    const valorBase = parseFloat(rates[periodoBase]) / 100;

    if (isNaN(valorBase) || valorBase <= 0) {
      setError('Por favor, ingrese un valor válido mayor que 0.');
      return;
    }

    setError(null); // Clear any existing errors

    const tasaEA = Math.pow((1 + valorBase), periodosAlAno[periodoBase]) - 1;
    
    const tasasCalculadas: Record<Periodo, string> = {} as Record<Periodo, string>;
    Object.entries(periodosAlAno).forEach(([periodo, periodos]) => {
      const tasaCalculada = ((Math.pow((1 + tasaEA), (1 / periodos)) - 1) * 100);
      tasasCalculadas[periodo as Periodo] = tasaCalculada.toFixed(3);
    });

    setRates(tasasCalculadas);
  };

  const clearRates = () => {
    setRates(Object.keys(periodosAlAno).reduce((acc, periodo) => ({ ...acc, [periodo]: '' }), {}) as Record<Periodo, string>);
    setError(null);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        {Object.keys(periodosAlAno).map((periodo) => (
          (periodo === 'mensualVencido' || periodo === 'anualVencido') && (
            <div key={periodo} className="space-y-2">
              <Label htmlFor={periodo}>{periodo.charAt(0).toUpperCase() + periodo.slice(1)}</Label>
              <Input
                id={periodo}
                type="text"
                value={rates[periodo as Periodo]}
                onChange={(e) => handleInputChange(periodo as Periodo, e.target.value)}
                placeholder={`Tasa ${periodo}`}
              />
            </div>
          )
        ))}
      </div>

      <Collapsible 
        open={showAdvanced} 
        onOpenChange={setShowAdvanced}
        className="border rounded-lg p-2"
      >
        <CollapsibleTrigger className="flex w-full items-center justify-between p-2">
          <span>otras conversiones</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${showAdvanced ? 'transform rotate-180' : ''}`} />
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-4 pt-4">
          <div className="space-y-4">
            {Object.keys(periodosAlAno).map((periodo) => (
              (periodo !== 'mensualVencido' && periodo !== 'anualVencido') && (
                <div key={periodo} className="space-y-2">
                  <Label htmlFor={periodo}>{periodo.charAt(0).toUpperCase() + periodo.slice(1)}</Label>
                  <Input
                    id={periodo}
                    type="text"
                    value={rates[periodo as Periodo]}
                    onChange={(e) => handleInputChange(periodo as Periodo, e.target.value)}
                    placeholder={`Tasa ${periodo}`}
                  />
                </div>
              )
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>

      {error && (
        <div className="text-red-500 text-sm">
          {error}
        </div>
      )}

      <div className="flex space-x-2">
        <Button 
          onClick={calculateRates} 
          className="flex-grow bg-[#fe9800] hover:bg-yellow-600"
        >
          Calcular Tasas
        </Button>
        <Button 
          onClick={clearRates} 
          variant="outline" 
          size="icon" 
          className="text-[#fe9800] border-[#fe9800] hover:bg-[#fe9800]/10"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="mt-6 w-full flex flex-col items-center">
        <TasaReferencia />
        <iframe 
          src="https://tradingeconomics.com/embed/?s=corrrmin&v=202410311911V20230410&h=300&w=600&ref=/colombia/interest-rate&type=stepline&d1=2021-12-17&d2=2024-10-31" 
          height="300" 
          width="600"  
          frameBorder="0" 
          scrolling="no"
          loading="lazy"
          className="max-w-full"
        />
        <div className="text-center text-sm mt-2">
          Fuente: <a 
            href="https://tradingeconomics.com/colombia/interest-rate" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-blue-600 hover:underline"
          >
            tradingeconomics.com
          </a>
        </div>
      </div>
    </div>
  );
}
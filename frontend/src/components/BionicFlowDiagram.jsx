import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { 
  Snowflake, 
  Heart, 
  Thermometer,
  Activity,
  Zap,
  Wind,
  Eye
} from 'lucide-react';

const BionicFlowDiagram = ({ bionicCooling, fluidCirculation, vehicleData }) => {
  const [animationSpeed, setAnimationSpeed] = useState(1);
  const [showFlow, setShowFlow] = useState(true);
  const [selectedComponent, setSelectedComponent] = useState(null);

  useEffect(() => {
    const speed = bionicCooling.pulseRate / 72; // Normalize to heart rate
    setAnimationSpeed(speed);
  }, [bionicCooling.pulseRate]);

  const getTemperatureColor = (temp) => {
    if (temp < -20) return '#1e40af'; // Deep blue
    if (temp < -10) return '#3b82f6'; // Blue
    if (temp < 0) return '#06b6d4';   // Cyan
    if (temp < 10) return '#10b981';  // Green
    if (temp < 25) return '#f59e0b';  // Yellow
    if (temp < 40) return '#f97316';  // Orange
    return '#ef4444'; // Red
  };

  const ComponentInfo = ({ component, onClose }) => (
    <div className="absolute top-4 right-4 bg-slate-800/95 border border-slate-600 rounded-lg p-4 min-w-64 z-10">
      <div className="flex justify-between items-center mb-3">
        <h4 className="text-cyan-400 font-semibold">{component.name}</h4>
        <Button variant="ghost" size="sm" onClick={onClose}>×</Button>
      </div>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-slate-400">Temperatura:</span>
          <span style={{ color: getTemperatureColor(component.temp) }}>
            {component.temp}°C
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400">Flujo:</span>
          <span className="text-cyan-400">{component.flow}%</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400">Estado:</span>
          <span className="text-green-400">{component.status}</span>
        </div>
      </div>
    </div>
  );

  return (
    <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-sm">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h4 className="text-lg font-semibold text-cyan-400">
            Diagrama de Flujo Biónico - Red Vascular 2D
          </h4>
          <div className="flex items-center space-x-4">
            <Button
              variant={showFlow ? "default" : "outline"}
              size="sm"
              onClick={() => setShowFlow(!showFlow)}
            >
              <Eye className="w-4 h-4 mr-2" />
              {showFlow ? "Ocultar Flujo" : "Mostrar Flujo"}
            </Button>
            <Badge variant="outline" className="text-purple-400">
              {bionicCooling.pulseRate} BPM
            </Badge>
          </div>
        </div>
        
        <div className="relative bg-gradient-to-br from-slate-800/30 to-slate-900/50 rounded-xl p-8 overflow-hidden min-h-96">
          {selectedComponent && (
            <ComponentInfo 
              component={selectedComponent} 
              onClose={() => setSelectedComponent(null)} 
            />
          )}
          
          {/* Vehicle Schematic */}
          <div className="relative w-full h-80 mx-auto">
            
            {/* Main Vehicle Body */}
            <div 
              className="absolute border-2 border-slate-600/50 rounded-lg bg-slate-700/20"
              style={{
                left: '15%',
                top: '35%',
                width: '70%',
                height: '30%',
              }}
            >
              <div className="absolute inset-2 border border-slate-500/30 rounded"></div>
            </div>
            
            {/* Cooling Core (Heart) */}
            <div 
              className="absolute flex items-center justify-center bg-cyan-500/20 border-2 border-cyan-400 rounded-full cursor-pointer hover:bg-cyan-500/30 transition-all"
              style={{
                left: '45%',
                top: '20%',
                width: '10%',
                height: '15%',
                animation: `pulse ${60/bionicCooling.pulseRate}s infinite`
              }}
              onClick={() => setSelectedComponent({
                name: 'Núcleo Criogénico',
                temp: bionicCooling.temperature,
                flow: bionicCooling.arterialPressure,
                status: bionicCooling.active ? 'ACTIVO' : 'INACTIVO'
              })}
            >
              <Heart className="w-6 h-6 text-cyan-400" />
            </div>
            
            {/* Front Motors */}
            <div 
              className="absolute bg-blue-500/20 border border-blue-400 rounded cursor-pointer hover:bg-blue-500/30 transition-all flex items-center justify-center"
              style={{ left: '80%', top: '25%', width: '8%', height: '12%' }}
              onClick={() => setSelectedComponent({
                name: 'Motor Delantero Izq',
                temp: vehicleData.motorHealth?.front?.temperature || 25,
                flow: fluidCirculation.arterial,
                status: 'REFRIGERADO'
              })}
            >
              <span className="text-xs text-blue-400 font-bold">FL</span>
            </div>
            
            <div 
              className="absolute bg-blue-500/20 border border-blue-400 rounded cursor-pointer hover:bg-blue-500/30 transition-all flex items-center justify-center"
              style={{ left: '80%', top: '55%', width: '8%', height: '12%' }}
              onClick={() => setSelectedComponent({
                name: 'Motor Delantero Der',
                temp: vehicleData.motorHealth?.front?.temperature || 25,
                flow: fluidCirculation.arterial,
                status: 'REFRIGERADO'
              })}
            >
              <span className="text-xs text-blue-400 font-bold">FR</span>
            </div>

            {/* Rear Motors */}
            <div 
              className="absolute bg-red-500/20 border border-red-400 rounded cursor-pointer hover:bg-red-500/30 transition-all flex items-center justify-center"
              style={{ left: '12%', top: '25%', width: '8%', height: '12%' }}
              onClick={() => setSelectedComponent({
                name: 'Motor Trasero Izq',
                temp: vehicleData.motorHealth?.rear?.temperature || 28,
                flow: fluidCirculation.arterial,
                status: 'REFRIGERADO'
              })}
            >
              <span className="text-xs text-red-400 font-bold">RL</span>
            </div>
            
            <div 
              className="absolute bg-red-500/20 border border-red-400 rounded cursor-pointer hover:bg-red-500/30 transition-all flex items-center justify-center"
              style={{ left: '12%', top: '55%', width: '8%', height: '12%' }}
              onClick={() => setSelectedComponent({
                name: 'Motor Trasero Der',
                temp: vehicleData.motorHealth?.rear?.temperature || 28,
                flow: fluidCirculation.arterial,
                status: 'REFRIGERADO'
              })}
            >
              <span className="text-xs text-red-400 font-bold">RR</span>
            </div>
            
            {/* Battery Pack */}
            <div 
              className="absolute bg-green-500/20 border border-green-400 rounded cursor-pointer hover:bg-green-500/30 transition-all flex items-center justify-center"
              style={{ left: '40%', top: '45%', width: '20%', height: '15%' }}
              onClick={() => setSelectedComponent({
                name: 'Paquete de Baterías',
                temp: vehicleData.batteryTemp,
                flow: fluidCirculation.capillary,
                status: 'CRIOGÉNICO ACTIVO'
              })}
            >
              <span className="text-xs text-green-400 font-bold">BATTERY</span>
            </div>

            {/* Arterial Network (Cold Flow) */}
            {showFlow && (
              <>
                {/* Main Arterial Lines */}
                <div className="absolute border-t-4 border-cyan-400/70 arterial-flow"
                     style={{ left: '50%', top: '27%', width: '30%', height: '0' }}></div>
                <div className="absolute border-t-4 border-cyan-400/70 arterial-flow"
                     style={{ left: '20%', top: '27%', width: '30%', height: '0' }}></div>
                <div className="absolute border-r-4 border-cyan-400/70 arterial-flow"
                     style={{ left: '50%', top: '27%', width: '0', height: '20%' }}></div>
                
                {/* Venous Return Lines (Warm Return) */}
                <div className="absolute border-t-4 border-orange-400/60 venous-flow"
                     style={{ left: '48%', top: '62%', width: '32%', height: '0' }}></div>
                <div className="absolute border-t-4 border-orange-400/60 venous-flow"
                     style={{ left: '20%', top: '62%', width: '28%', height: '0' }}></div>
                
                {/* Capillary Networks */}
                {[...Array(6)].map((_, i) => (
                  <div 
                    key={`capillary-${i}`}
                    className="absolute border-l border-green-400/40 capillary-flow"
                    style={{
                      left: `${25 + i * 10}%`,
                      top: '40%',
                      width: '0',
                      height: '25%',
                      animation: `glow ${1 + i * 0.2}s infinite alternate`
                    }}
                  ></div>
                ))}
                
                {/* Flow Particles */}
                {bionicCooling.active && [...Array(8)].map((_, i) => (
                  <div
                    key={`particle-${i}`}
                    className="absolute w-2 h-2 bg-cyan-400 rounded-full flow-particle"
                    style={{
                      left: '50%',
                      top: '27%',
                      animation: `flowParticle ${3 + i * 0.5}s infinite linear`
                    }}
                  ></div>
                ))}
              </>
            )}
            
            {/* Temperature Zones Overlay */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Hot zones */}
              <div 
                className="absolute rounded-full bg-red-400/10 animate-pulse"
                style={{ left: '12%', top: '25%', width: '8%', height: '42%' }}
              ></div>
              <div 
                className="absolute rounded-full bg-red-400/10 animate-pulse"
                style={{ left: '80%', top: '25%', width: '8%', height: '42%' }}
              ></div>
              
              {/* Cool zones */}
              <div 
                className="absolute rounded-full bg-blue-400/10"
                style={{ 
                  left: '45%', 
                  top: '20%', 
                  width: '10%', 
                  height: '15%',
                  animation: `pulse ${60/bionicCooling.pulseRate}s infinite`
                }}
              ></div>
            </div>
          </div>
          
          {/* Status Indicators */}
          <div className="absolute top-4 left-4 space-y-2">
            <div className="flex items-center space-x-2 text-sm">
              <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
              <span className="text-cyan-400">Arterial: {bionicCooling.temperature.toFixed(1)}°C</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
              <span className="text-orange-400">Venoso: {(bionicCooling.temperature + 15).toFixed(1)}°C</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400">Capilar: {fluidCirculation.capillary.toFixed(0)}%</span>
            </div>
          </div>
          
          {/* Pulse Monitor */}
          <div className="absolute bottom-4 right-4 flex items-center space-x-2">
            <Heart 
              className="w-6 h-6 text-purple-400" 
              style={{ animation: `pulse ${60/bionicCooling.pulseRate}s infinite` }}
            />
            <span className="text-purple-400 font-bold">{bionicCooling.pulseRate} BPM</span>
          </div>
          
          {/* Performance Metrics */}
          <div className="absolute bottom-4 left-4 grid grid-cols-2 gap-2 text-xs">
            <div className="bg-slate-800/50 rounded px-2 py-1">
              <span className="text-slate-400">Eficiencia:</span>
              <span className="text-cyan-400 ml-1 font-bold">
                {Math.round((fluidCirculation.arterial + fluidCirculation.venous + fluidCirculation.capillary) / 3)}%
              </span>
            </div>
            <div className="bg-slate-800/50 rounded px-2 py-1">
              <span className="text-slate-400">Transferencia:</span>
              <span className="text-green-400 ml-1 font-bold">12.8 kW</span>
            </div>
          </div>
        </div>
        
        {/* Legend */}
        <div className="mt-6 grid grid-cols-3 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded"></div>
            <span className="text-cyan-400">Flujo Arterial (Frío)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-2 bg-gradient-to-r from-orange-400 to-red-400 rounded"></div>
            <span className="text-orange-400">Retorno Venoso (Caliente)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-2 bg-green-400 rounded animate-pulse"></div>
            <span className="text-green-400">Red Capilar (Micro)</span>
          </div>
        </div>
      </CardContent>
      
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.8; }
        }
        
        @keyframes glow {
          0% { opacity: 0.3; }
          100% { opacity: 0.8; }
        }
        
        @keyframes flowParticle {
          0% { transform: translateX(0) translateY(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateX(200px) translateY(50px); opacity: 0; }
        }
        
        .arterial-flow {
          background: linear-gradient(90deg, transparent, #06b6d4, transparent);
          background-size: 20px 100%;
          animation: flow 2s infinite linear;
        }
        
        .venous-flow {
          background: linear-gradient(90deg, transparent, #f97316, transparent);
          background-size: 20px 100%;
          animation: flow 3s infinite linear reverse;
        }
        
        .capillary-flow {
          background: linear-gradient(180deg, transparent, #10b981, transparent);
          background-size: 100% 10px;
          animation: flowVertical 1.5s infinite linear;
        }
        
        @keyframes flow {
          0% { background-position: -20px 0; }
          100% { background-position: 100% 0; }
        }
        
        @keyframes flowVertical {
          0% { background-position: 0 -10px; }
          100% { background-position: 0 100%; }
        }
      `}</style>
    </Card>
  );
};

export default BionicFlowDiagram;
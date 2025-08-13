import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Switch } from './ui/switch';
import { 
  Snowflake, 
  Heart, 
  Thermometer,
  Droplets,
  Activity,
  Zap,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Waves,
  Wind
} from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import BionicFlowDiagram from './BionicFlowDiagram';

const BionicCooling = ({ bionicCooling, setBionicCooling, vehicleData, disabled }) => {
  const [emergencyCooling, setEmergencyCooling] = useState(false);
  const [cryoBoost, setCryoBoost] = useState(false);
  const [fluidCirculation, setFluidCirculation] = useState({
    arterial: 85,
    venous: 92,
    capillary: 78
  });
  const { toast } = useToast();

  // Simulate fluid circulation
  useEffect(() => {
    const interval = setInterval(() => {
      if (bionicCooling.active && !disabled) {
        setFluidCirculation(prev => ({
          arterial: Math.max(60, Math.min(100, prev.arterial + (Math.random() - 0.5) * 5)),
          venous: Math.max(70, Math.min(100, prev.venous + (Math.random() - 0.5) * 3)),
          capillary: Math.max(50, Math.min(95, prev.capillary + (Math.random() - 0.5) * 8))
        }));
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [bionicCooling.active, disabled]);

  const handleEmergencyCooling = () => {
    setEmergencyCooling(!emergencyCooling);
    if (!emergencyCooling) {
      setBionicCooling(prev => ({
        ...prev,
        temperature: -25,
        pulseRate: 120,
        arterialPressure: 100
      }));
      toast({
        title: "❄️ REFRIGERACIÓN DE EMERGENCIA",
        description: "Criogénico a -25°C activado",
      });
      
      setTimeout(() => {
        setEmergencyCooling(false);
        setBionicCooling(prev => ({
          ...prev,
          temperature: -15,
          pulseRate: 72,
          arterialPressure: 85
        }));
      }, 60000); // 1 minute
    }
  };

  const handleCryoBoost = () => {
    setCryoBoost(!cryoBoost);
    if (!cryoBoost) {
      setBionicCooling(prev => ({
        ...prev,
        pulseRate: prev.pulseRate * 1.5,
        arterialPressure: Math.min(100, prev.arterialPressure + 15)
      }));
      toast({
        title: "🚀 CRYO BOOST ACTIVADO",
        description: "Flujo pulsátil aumentado 50%",
      });
    } else {
      setBionicCooling(prev => ({
        ...prev,
        pulseRate: Math.round(prev.pulseRate / 1.5),
        arterialPressure: Math.max(70, prev.arterialPressure - 15)
      }));
    }
  };

  const getTemperatureColor = (temp) => {
    if (temp < -20) return 'text-blue-600';
    if (temp < -10) return 'text-blue-400';
    if (temp < 0) return 'text-cyan-400';
    if (temp < 10) return 'text-green-400';
    if (temp < 25) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getFlowStatus = (value) => {
    if (value >= 90) return { text: 'Óptimo', color: 'text-green-400' };
    if (value >= 75) return { text: 'Bueno', color: 'text-cyan-400' };
    if (value >= 60) return { text: 'Regular', color: 'text-yellow-400' };
    return { text: 'Bajo', color: 'text-red-400' };
  };

  return (
    <div className="space-y-6">
      
      {/* System Status Overview */}
      <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-blue-400">
              Sistema de Refrigeración Biónica - Arquitectura Vascular
            </h3>
            <div className="flex items-center space-x-4">
              <Badge variant={bionicCooling.active ? "default" : "destructive"} className="text-lg">
                {bionicCooling.active ? "❄️ ACTIVO" : "INACTIVO"}
              </Badge>
              <Switch 
                checked={bionicCooling.active} 
                onCheckedChange={(checked) => setBionicCooling(prev => ({ ...prev, active: checked }))}
                disabled={disabled}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className={`text-3xl font-bold mb-2 ${getTemperatureColor(bionicCooling.temperature)}`}>
                {bionicCooling.temperature.toFixed(1)}°C
              </div>
              <div className="text-sm text-slate-400">Crio-Líquido</div>
              <Progress 
                value={Math.abs(bionicCooling.temperature) * 2} 
                className="h-2 mt-2" 
              />
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2 flex items-center justify-center">
                <Heart className="w-8 h-8 mr-2" />
                {bionicCooling.pulseRate}
              </div>
              <div className="text-sm text-slate-400">BPM Pulsátil</div>
              <Progress value={bionicCooling.pulseRate} className="h-2 mt-2" />
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400 mb-2">
                {bionicCooling.arterialPressure}%
              </div>
              <div className="text-sm text-slate-400">Presión Arterial</div>
              <Progress value={bionicCooling.arterialPressure} className="h-2 mt-2" />
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">
                {bionicCooling.cryoFluidLevel.toFixed(1)}%
              </div>
              <div className="text-sm text-slate-400">Nivel Crio-Fluido</div>
              <Progress value={bionicCooling.cryoFluidLevel} className="h-2 mt-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Emergency Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-sm">
          <CardContent className="p-6">
            <h4 className="text-lg font-semibold text-red-400 mb-4">
              Controles de Emergencia
            </h4>
            
            <div className="space-y-4">
              <Button
                variant={emergencyCooling ? "destructive" : "outline"}
                onClick={handleEmergencyCooling}
                disabled={disabled || !bionicCooling.active}
                className="w-full h-12 font-bold"
              >
                <Snowflake className="w-5 h-5 mr-2" />
                {emergencyCooling ? "EMERGENCIA ACTIVA" : "REFRIGERACIÓN EMERGENCIA"}
              </Button>
              
              <Button
                variant={cryoBoost ? "default" : "outline"}
                onClick={handleCryoBoost}
                disabled={disabled || !bionicCooling.active}
                className="w-full h-12 font-bold"
              >
                <Zap className="w-5 h-5 mr-2" />
                {cryoBoost ? "CRYO BOOST ACTIVO" : "ACTIVAR CRYO BOOST"}
              </Button>
            </div>
            
            {emergencyCooling && (
              <div className="mt-4 p-3 bg-red-900/20 border border-red-500/30 rounded-lg">
                <div className="text-red-400 text-sm font-semibold mb-1">
                  MODO EMERGENCIA ACTIVO
                </div>
                <div className="text-xs text-slate-400">
                  Temperatura criogénica a -25°C. Se desactivará automáticamente en 60 segundos.
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-sm">
          <CardContent className="p-6">
            <h4 className="text-lg font-semibold text-purple-400 mb-4">
              Sistema Pulsátil
            </h4>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-300">Frecuencia de Pulso</span>
                  <span className="text-purple-400 font-bold">{bionicCooling.pulseRate} BPM</span>
                </div>
                <Slider
                  value={[bionicCooling.pulseRate]}
                  onValueChange={(value) => setBionicCooling(prev => ({ ...prev, pulseRate: value[0] }))}
                  min={30}
                  max={150}
                  step={1}
                  className="w-full"
                  disabled={disabled || !bionicCooling.active || cryoBoost}
                />
                <div className="text-xs text-slate-500 mt-1">
                  Imita el latido cardíaco para transferencia óptima de calor
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-center p-2 bg-slate-800/50 rounded">
                  <div className="text-purple-400 font-bold">72 BPM</div>
                  <div className="text-xs text-slate-500">Normal</div>
                </div>
                <div className="text-center p-2 bg-slate-800/50 rounded">
                  <div className="text-purple-400 font-bold">120 BPM</div>
                  <div className="text-xs text-slate-500">Alto rendimiento</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Vascular Network Status */}
      <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-sm">
        <CardContent className="p-6">
          <h4 className="text-lg font-semibold text-cyan-400 mb-6">
            Red Vascular - Flujo de Crio-Líquido en Tiempo Real
          </h4>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Arterial System */}
            <Card className="bg-slate-800/50 border-slate-600">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h5 className="text-red-400 font-semibold flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Sistema Arterial
                  </h5>
                  <Badge variant="outline" className={getFlowStatus(fluidCirculation.arterial).color}>
                    {getFlowStatus(fluidCirculation.arterial).text}
                  </Badge>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-300">Flujo Principal</span>
                    <span className="text-red-400 font-bold">{fluidCirculation.arterial.toFixed(1)}%</span>
                  </div>
                  <Progress value={fluidCirculation.arterial} className="h-3" />
                  
                  <div className="text-xs text-slate-500">
                    Red principal que distribuye crio-líquido frío desde el núcleo hacia todos 
                    los componentes del vehículo.
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <div className="text-slate-400">Presión:</div>
                      <div className="text-red-400 font-bold">{bionicCooling.arterialPressure} PSI</div>
                    </div>
                    <div>
                      <div className="text-slate-400">Velocidad:</div>
                      <div className="text-red-400 font-bold">3.2 m/s</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Venous System */}
            <Card className="bg-slate-800/50 border-slate-600">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h5 className="text-blue-400 font-semibold flex items-center">
                    <Waves className="w-5 h-5 mr-2" />
                    Sistema Venoso
                  </h5>
                  <Badge variant="outline" className={getFlowStatus(fluidCirculation.venous).color}>
                    {getFlowStatus(fluidCirculation.venous).text}
                  </Badge>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-300">Retorno de Fluido</span>
                    <span className="text-blue-400 font-bold">{fluidCirculation.venous.toFixed(1)}%</span>
                  </div>
                  <Progress value={fluidCirculation.venous} className="h-3" />
                  
                  <div className="text-xs text-slate-500">
                    Red de retorno que recolecta el crio-líquido calentado y lo transporta 
                    de vuelta al sistema de enfriamiento.
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <div className="text-slate-400">Temp. Retorno:</div>
                      <div className="text-blue-400 font-bold">{(bionicCooling.temperature + 15).toFixed(1)}°C</div>
                    </div>
                    <div>
                      <div className="text-slate-400">Eficiencia:</div>
                      <div className="text-blue-400 font-bold">94%</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Capillary System */}
            <Card className="bg-slate-800/50 border-slate-600">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h5 className="text-green-400 font-semibold flex items-center">
                    <Activity className="w-5 h-5 mr-2" />
                    Microcapilares
                  </h5>
                  <Badge variant="outline" className={getFlowStatus(fluidCirculation.capillary).color}>
                    {getFlowStatus(fluidCirculation.capillary).text}
                  </Badge>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-300">Flujo Microscópico</span>
                    <span className="text-green-400 font-bold">{fluidCirculation.capillary.toFixed(1)}%</span>
                  </div>
                  <Progress value={fluidCirculation.capillary} className="h-3" />
                  
                  <div className="text-xs text-slate-500">
                    Red de microcapilares nanométricos que proporcionan enfriamiento 
                    de contacto directo en componentes delicados.
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <div className="text-slate-400">Contacto Directo:</div>
                      <div className="text-green-400 font-bold">847 puntos</div>
                    </div>
                    <div>
                      <div className="text-slate-400">Transferencia:</div>
                      <div className="text-green-400 font-bold">12.8 kW</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Bionic Flow Diagram */}
      <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-sm">
        <CardContent className="p-6">
          <h4 className="text-lg font-semibold text-cyan-400 mb-6">
            Diagrama de Flujo Biónico - Red Vascular en Tiempo Real
          </h4>
          
          <div className="relative bg-slate-800/30 rounded-xl p-6 overflow-hidden">
            {/* Vehicle Outline SVG */}
            <svg 
              viewBox="0 0 800 400" 
              className="w-full h-80 mx-auto"
              style={{ filter: 'drop-shadow(0 0 10px rgba(6, 182, 212, 0.3))' }}
            >
              {/* Vehicle Body */}
              <rect x="100" y="150" width="600" height="100" rx="20" 
                    fill="none" stroke="#334155" strokeWidth="2" opacity="0.6"/>
              
              {/* Wheels */}
              <circle cx="200" cy="280" r="30" fill="none" stroke="#475569" strokeWidth="3"/>
              <circle cx="600" cy="280" r="30" fill="none" stroke="#475569" strokeWidth="3"/>
              <circle cx="200" cy="120" r="30" fill="none" stroke="#475569" strokeWidth="3"/>
              <circle cx="600" cy="120" r="30" fill="none" stroke="#475569" strokeWidth="3"/>
              
              {/* Main Components */}
              {/* Front Motors */}
              <rect x="650" y="140" width="40" height="30" rx="5" 
                    fill="#1e40af" opacity="0.7" stroke="#3b82f6" strokeWidth="1"/>
              <text x="665" y="158" fill="#60a5fa" fontSize="10" textAnchor="middle">FL</text>
              <rect x="650" y="230" width="40" height="30" rx="5" 
                    fill="#1e40af" opacity="0.7" stroke="#3b82f6" strokeWidth="1"/>
              <text x="665" y="248" fill="#60a5fa" fontSize="10" textAnchor="middle">FR</text>
              
              {/* Rear Motors */}
              <rect x="110" y="140" width="40" height="30" rx="5" 
                    fill="#dc2626" opacity="0.7" stroke="#ef4444" strokeWidth="1"/>
              <text x="125" y="158" fill="#f87171" fontSize="10" textAnchor="middle">RL</text>
              <rect x="110" y="230" width="40" height="30" rx="5" 
                    fill="#dc2626" opacity="0.7" stroke="#ef4444" strokeWidth="1"/>
              <text x="125" y="248" fill="#f87171" fontSize="10" textAnchor="middle">RR</text>
              
              {/* Battery Pack */}
              <rect x="350" y="180" width="100" height="40" rx="8" 
                    fill="#059669" opacity="0.7" stroke="#10b981" strokeWidth="2"/>
              <text x="400" y="202" fill="#34d399" fontSize="12" textAnchor="middle">BATTERY</text>
              
              {/* Cooling Core */}
              <circle cx="400" cy="120" r="25" 
                      fill="#0891b2" opacity="0.8" stroke="#06b6d4" strokeWidth="2"/>
              <text x="400" y="125" fill="#67e8f9" fontSize="10" textAnchor="middle">CORE</text>
              
              {/* Arterial Network (Cold Flow) - Animated */}
              <defs>
                <linearGradient id="coldFlow" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3b82f6">
                    <animate attributeName="stop-color" 
                             values="#3b82f6;#06b6d4;#0891b2;#3b82f6" 
                             dur="3s" repeatCount="indefinite"/>
                  </stop>
                  <stop offset="50%" stopColor="#06b6d4">
                    <animate attributeName="stop-color" 
                             values="#06b6d4;#0891b2;#3b82f6;#06b6d4" 
                             dur="3s" repeatCount="indefinite"/>
                  </stop>
                  <stop offset="100%" stopColor="#0891b2">
                    <animate attributeName="stop-color" 
                             values="#0891b2;#3b82f6;#06b6d4;#0891b2" 
                             dur="3s" repeatCount="indefinite"/>
                  </stop>
                </linearGradient>
                
                <linearGradient id="hotFlow" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ef4444">
                    <animate attributeName="stop-color" 
                             values="#ef4444;#f97316;#eab308;#ef4444" 
                             dur="2s" repeatCount="indefinite"/>
                  </stop>
                  <stop offset="50%" stopColor="#f97316">
                    <animate attributeName="stop-color" 
                             values="#f97316;#eab308;#ef4444;#f97316" 
                             dur="2s" repeatCount="indefinite"/>
                  </stop>
                  <stop offset="100%" stopColor="#eab308">
                    <animate attributeName="stop-color" 
                             values="#eab308;#ef4444;#f97316;#eab308" 
                             dur="2s" repeatCount="indefinite"/>
                  </stop>
                </linearGradient>
                
                {/* Pulsating Animation */}
                <animate id="pulse" attributeName="r" 
                         values="2;4;2" dur={`${60/bionicCooling.pulseRate}s`} repeatCount="indefinite"/>
              </defs>
              
              {/* Main Arterial Lines (Cold Distribution) */}
              <path d="M 400 145 Q 300 180 130 155" 
                    fill="none" stroke="url(#coldFlow)" strokeWidth="4" opacity="0.8"/>
              <path d="M 400 145 Q 300 220 130 245" 
                    fill="none" stroke="url(#coldFlow)" strokeWidth="4" opacity="0.8"/>
              <path d="M 400 145 Q 500 180 670 155" 
                    fill="none" stroke="url(#coldFlow)" strokeWidth="4" opacity="0.8"/>
              <path d="M 400 145 Q 500 220 670 245" 
                    fill="none" stroke="url(#coldFlow)" strokeWidth="4" opacity="0.8"/>
              <path d="M 400 145 L 400 180" 
                    fill="none" stroke="url(#coldFlow)" strokeWidth="6" opacity="0.9"/>
              
              {/* Venous Return Lines (Hot Return) */}
              <path d="M 150 155 Q 250 200 380 200" 
                    fill="none" stroke="url(#hotFlow)" strokeWidth="3" opacity="0.7"/>
              <path d="M 150 245 Q 250 200 380 200" 
                    fill="none" stroke="url(#hotFlow)" strokeWidth="3" opacity="0.7"/>
              <path d="M 650 155 Q 550 200 420 200" 
                    fill="none" stroke="url(#hotFlow)" strokeWidth="3" opacity="0.7"/>
              <path d="M 650 245 Q 550 200 420 200" 
                    fill="none" stroke="url(#hotFlow)" strokeWidth="3" opacity="0.7"/>
              
              {/* Capillary Network (Micro-circulation) */}
              <g opacity="0.6">
                {/* Front Motor Capillaries */}
                {[...Array(8)].map((_, i) => (
                  <line key={`fl-cap-${i}`} 
                        x1={660 + i * 2} y1="142" 
                        x2={660 + i * 2} y2="168" 
                        stroke="#10b981" strokeWidth="1">
                    <animate attributeName="opacity" 
                             values="0.3;0.8;0.3" 
                             dur={`${1 + i * 0.1}s`} 
                             repeatCount="indefinite"/>
                  </line>
                ))}
                
                {/* Rear Motor Capillaries */}
                {[...Array(8)].map((_, i) => (
                  <line key={`rl-cap-${i}`} 
                        x1={120 + i * 2} y1="142" 
                        x2={120 + i * 2} y2="168" 
                        stroke="#10b981" strokeWidth="1">
                    <animate attributeName="opacity" 
                             values="0.3;0.8;0.3" 
                             dur={`${1.2 + i * 0.1}s`} 
                             repeatCount="indefinite"/>
                  </line>
                ))}
                
                {/* Battery Capillaries */}
                {[...Array(15)].map((_, i) => (
                  <line key={`bat-cap-${i}`} 
                        x1={355 + i * 6} y1="182" 
                        x2={355 + i * 6} y2="218" 
                        stroke="#10b981" strokeWidth="1">
                    <animate attributeName="opacity" 
                             values="0.3;0.8;0.3" 
                             dur={`${0.8 + i * 0.05}s`} 
                             repeatCount="indefinite"/>
                  </line>
                ))}
              </g>
              
              {/* Flow Particles */}
              <g>
                {/* Cold Flow Particles */}
                {[...Array(6)].map((_, i) => (
                  <circle key={`cold-particle-${i}`} r="2" fill="#06b6d4" opacity="0.8">
                    <animateMotion dur={`${3 + i * 0.5}s`} repeatCount="indefinite">
                      <path d="M 400 145 Q 300 180 130 155"/>
                    </animateMotion>
                    <animate attributeName="opacity" 
                             values="0;1;0" 
                             dur={`${3 + i * 0.5}s`} 
                             repeatCount="indefinite"/>
                  </circle>
                ))}
                
                {/* Hot Flow Particles */}
                {[...Array(4)].map((_, i) => (
                  <circle key={`hot-particle-${i}`} r="1.5" fill="#f97316" opacity="0.7">
                    <animateMotion dur={`${4 + i * 0.3}s`} repeatCount="indefinite">
                      <path d="M 150 155 Q 250 200 380 200"/>
                    </animateMotion>
                    <animate attributeName="opacity" 
                             values="0;1;0" 
                             dur={`${4 + i * 0.3}s`} 
                             repeatCount="indefinite"/>
                  </circle>
                ))}
              </g>
              
              {/* Pulsating Core */}
              <circle cx="400" cy="120" r="3" fill="#67e8f9" opacity="0.9">
                <animate attributeName="r" 
                         values="3;8;3" 
                         dur={`${60/bionicCooling.pulseRate}s`} 
                         repeatCount="indefinite"/>
                <animate attributeName="opacity" 
                         values="0.9;0.4;0.9" 
                         dur={`${60/bionicCooling.pulseRate}s`} 
                         repeatCount="indefinite"/>
              </circle>
              
              {/* Temperature Indicators */}
              <text x="50" y="30" fill="#06b6d4" fontSize="14" fontWeight="bold">
                ARTERIAL: {bionicCooling.temperature.toFixed(1)}°C
              </text>
              <text x="50" y="50" fill="#f97316" fontSize="14" fontWeight="bold">
                VENOSO: {(bionicCooling.temperature + 15).toFixed(1)}°C
              </text>
              <text x="50" y="70" fill="#10b981" fontSize="14" fontWeight="bold">
                CAPILAR: {fluidCirculation.capillary.toFixed(0)}% FLUJO
              </text>
              
              {/* Pulse Indicator */}
              <g transform="translate(650, 30)">
                <text x="0" y="0" fill="#a855f7" fontSize="14" fontWeight="bold">
                  PULSO: {bionicCooling.pulseRate} BPM
                </text>
                <circle cx="120" cy="-5" r="5" fill="#a855f7">
                  <animate attributeName="r" 
                           values="3;7;3" 
                           dur={`${60/bionicCooling.pulseRate}s`} 
                           repeatCount="indefinite"/>
                  <animate attributeName="opacity" 
                           values="1;0.3;1" 
                           dur={`${60/bionicCooling.pulseRate}s`} 
                           repeatCount="indefinite"/>
                </circle>
              </g>
            </svg>
            
            {/* Flow Legend */}
            <div className="mt-6 grid grid-cols-3 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-2 bg-gradient-to-r from-blue-500 to-cyan-400 rounded"></div>
                <span className="text-blue-400">Flujo Arterial (Frío)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-2 bg-gradient-to-r from-orange-500 to-yellow-400 rounded"></div>
                <span className="text-orange-400">Retorno Venoso (Caliente)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-2 bg-green-400 rounded"></div>
                <span className="text-green-400">Red Capilar (Micro)</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Temperature Map */}
      <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-sm">
        <CardContent className="p-6">
          <h4 className="text-lg font-semibold text-orange-400 mb-4">
            Mapa Térmico Complementario - Componentes
          </h4>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-slate-800/50 rounded-lg">
              <div className="text-sm text-slate-400 mb-1">Motor Delantero</div>
              <div className={`text-xl font-bold ${getTemperatureColor(vehicleData.motorHealth?.front?.temperature || 25)}`}>
                {(vehicleData.motorHealth?.front?.temperature || 25).toFixed(1)}°C
              </div>
              <Progress value={(vehicleData.motorHealth?.front?.temperature || 25) * 2} className="h-2 mt-2" />
            </div>
            
            <div className="text-center p-4 bg-slate-800/50 rounded-lg">
              <div className="text-sm text-slate-400 mb-1">Motor Trasero</div>
              <div className={`text-xl font-bold ${getTemperatureColor(vehicleData.motorHealth?.rear?.temperature || 28)}`}>
                {(vehicleData.motorHealth?.rear?.temperature || 28).toFixed(1)}°C
              </div>
              <Progress value={(vehicleData.motorHealth?.rear?.temperature || 28) * 2} className="h-2 mt-2" />
            </div>
            
            <div className="text-center p-4 bg-slate-800/50 rounded-lg">
              <div className="text-sm text-slate-400 mb-1">Batería</div>
              <div className={`text-xl font-bold ${getTemperatureColor(vehicleData.batteryTemp)}`}>
                {vehicleData.batteryTemp.toFixed(1)}°C
              </div>
              <Progress value={vehicleData.batteryTemp * 2} className="h-2 mt-2" />
            </div>
            
            <div className="text-center p-4 bg-slate-800/50 rounded-lg">
              <div className="text-sm text-slate-400 mb-1">Inversores</div>
              <div className={`text-xl font-bold ${getTemperatureColor(35)}`}>
                35.2°C
              </div>
              <Progress value={70} className="h-2 mt-2" />
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-slate-800/50 rounded-lg">
            <div className="text-center text-sm text-slate-400">
              <Wind className="w-5 h-5 mx-auto mb-2" />
              <strong>Estado del Sistema:</strong> El sistema biónico mantiene temperaturas óptimas 
              en todos los componentes. Red vascular funcionando a {Math.round((fluidCirculation.arterial + fluidCirculation.venous + fluidCirculation.capillary) / 3)}% de eficiencia.
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BionicCooling;
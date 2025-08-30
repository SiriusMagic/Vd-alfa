import React, { useState } from 'react';
import { Slider } from './ui/slider';
import { Alert, AlertTitle, AlertDescription } from './ui/alert';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Badge } from './ui/badge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './ui/card';
import { 
  Car, Leaf, User, Zap, Settings, Trophy, Thermometer, Wind, Navigation, Shield, Eye, 
  Battery, Activity, Wifi, Phone, Camera, Lock, Lightbulb, MapPin, Wrench, Volume2, Gauge,
  AlertTriangle, CheckCircle, Info, Cpu, Signal, Bluetooth, Clock
} from 'lucide-react';

const FuturisticInterface = () => {
  const [selectedMode, setSelectedMode] = useState('deportivo');
  const [activeControl, setActiveControl] = useState(null);
  const [speed, setSpeed] = useState([85]);
  const [alerts, setAlerts] = useState([
    { id: 1, type: 'info', title: 'Sistema Activo', desc: 'Todos los sistemas funcionando correctamente' }
  ]);

  const modes = [
    { id: 'eco', name: 'Eco', icon: Leaf, desc: 'Máxima eficiencia energética' },
    { id: 'confort', name: 'Confort', icon: User, desc: 'Balance entre rendimiento y comodidad' },
    { id: 'deportivo', name: 'Deportivo', icon: Zap, desc: 'Máximo rendimiento y potencia' },
    { id: 'individual', name: 'Individual', icon: Settings, desc: 'Configuración personalizada' },
    { id: 'offroad', name: 'Off-Road', icon: Trophy, desc: 'Optimizado para terrenos difíciles' }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      {/* Panel Izquierdo Expandido */}
      <div className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col py-4">
        <div className="px-4 mb-6">
          <h2 className="text-lg font-bold text-white">TROPHY 2025</h2>
          <p className="text-xs text-gray-400">Sistema Inteligente</p>
        </div>
        
        <div className="px-4 mb-6">
          <Card className="bg-gray-800/50 border-gray-600">
            <CardHeader className="pb-3">
              <CardTitle className="text-white flex items-center gap-2">
                <Cpu className="w-5 h-5 text-blue-400" />
                Modos de Conducción
              </CardTitle>
              <CardDescription className="text-gray-400">
                Configuraciones optimizadas de rendimiento
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {modes.map((mode) => (
                <Card
                  key={mode.id}
                  className={`cursor-pointer transition-all border ${
                    selectedMode === mode.id 
                      ? 'bg-blue-600/20 border-blue-500 shadow-lg shadow-blue-500/20' 
                      : 'bg-gray-700/50 border-gray-600 hover:bg-gray-600/50'
                  }`}
                  onClick={() => setSelectedMode(mode.id)}
                >
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <mode.icon 
                          size={20} 
                          className={selectedMode === mode.id ? 'text-blue-400' : 'text-gray-400'}
                        />
                        <div>
                          <div className={`font-medium ${selectedMode === mode.id ? 'text-white' : 'text-gray-300'}`}>
                            {mode.name}
                          </div>
                          <div className="text-xs text-gray-400">{mode.desc}</div>
                        </div>
                      </div>
                      {selectedMode === mode.id && (
                        <Badge variant="default" className="bg-blue-600 text-white">
                          Activo
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="px-4 mb-6">
          <Card className="bg-blue-900/20 border-blue-500/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-blue-300 flex items-center gap-2 text-sm">
                <Info className="w-4 h-4" />
                Estado del Sistema
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {alerts.map((alert) => (
                <div key={alert.id} className="flex items-center justify-between">
                  <span className="text-blue-100 text-sm">{alert.desc}</span>
                  <Badge variant="outline" className="text-blue-400 border-blue-400">
                    Activo
                  </Badge>
                </div>
              ))}
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-blue-500/30">
                <span className="text-blue-100 text-xs">Última actualización:</span>
                <Badge variant="secondary" className="text-xs">
                  Ahora
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex-1" />
        <div className="px-4">
          <Card className="bg-gradient-to-b from-orange-900/20 to-yellow-800/20 border-orange-500/30">
            <CardContent className="p-4 text-center">
              <Thermometer className="w-5 h-5 mx-auto mb-2 text-orange-400" />
              <div className="text-lg font-bold text-orange-400">22°C</div>
              <div className="text-xs text-orange-300 mb-2">Temperatura Externa</div>
              <Badge variant="outline" className="text-orange-400 border-orange-400">
                Confortable
              </Badge>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Área Central */}
      <div className="flex-1 relative overflow-hidden">
        {/* Header */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
          <div className="flex items-center space-x-4">
            <div className="bg-gray-800 rounded-full px-3 py-1 text-sm">Climatización</div>
            <div className="bg-gray-800 rounded-full px-3 py-1 text-sm">Auto</div>
          </div>
          <div className="flex items-center space-x-2">
            <Wifi size={16} className="text-blue-400" />
            <div className="text-sm">78%</div>
          </div>
        </div>

        {/* Vehículo Central */}
        <div className="flex items-center justify-center h-full relative">
          <div className="relative w-80 h-48">
            {/* Carrocería del vehículo */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-400 via-slate-500 to-slate-700 rounded-[2.5rem] shadow-2xl transform rotate-6">
              <div className="absolute top-3 left-6 right-6 h-12 bg-gradient-to-b from-slate-200 to-slate-400 rounded-xl opacity-60"></div>
              <div className="absolute top-4 left-2 w-8 h-10 bg-gradient-to-r from-slate-300 to-slate-500 rounded-lg opacity-50"></div>
              <div className="absolute top-4 right-2 w-8 h-10 bg-gradient-to-l from-slate-300 to-slate-500 rounded-lg opacity-50"></div>
              <div className="absolute top-8 left-1 w-3 h-6 bg-white rounded-lg opacity-90"></div>
              <div className="absolute top-8 right-1 w-3 h-6 bg-white rounded-lg opacity-90"></div>
              <div className="absolute bottom-3 left-2 w-2 h-4 bg-red-500 rounded opacity-80"></div>
              <div className="absolute bottom-3 right-2 w-2 h-4 bg-red-500 rounded opacity-80"></div>
            </div>
            
            {/* Ruedas */}
            <div className="absolute -bottom-2 left-8 w-8 h-8 bg-gray-800 rounded-full border-2 border-gray-600">
              <div className="absolute inset-1 bg-gray-700 rounded-full"></div>
            </div>
            <div className="absolute -bottom-2 right-8 w-8 h-8 bg-gray-800 rounded-full border-2 border-gray-600">
              <div className="absolute inset-1 bg-gray-700 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Controles inferiores del vehículo */}
        <div className="absolute bottom-20 left-0 right-0 bg-gray-800/90 backdrop-blur-sm border-t border-gray-700 p-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-3">
              <div className="text-sm font-medium text-white">Modo:</div>
              <div className="px-3 py-1 bg-blue-600 rounded-full text-sm font-medium text-white capitalize">
                {selectedMode}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-lg font-bold text-cyan-400">{speed[0]} km/h</span>
              <div className="w-24 h-2 bg-gray-600 rounded-full">
                <div 
                  className="h-2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full transition-all duration-300" 
                  style={{width: `${(speed[0]/200)*100}%`}}
                />
              </div>
            </div>
          </div>
          <div className="mb-2">
            <div className="text-xs text-gray-400 mb-2">Control de Velocidad (0-200 km/h)</div>
            <Slider 
              value={speed} 
              onValueChange={setSpeed} 
              min={0} 
              max={200} 
              step={5}
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Panel Derecho Expandido */}
      <div className="w-64 bg-gray-800 border-l border-gray-700 flex flex-col py-4">
        <div className="px-4 mb-6">
          <h2 className="text-lg font-bold text-white">Control Touch</h2>
          <p className="text-xs text-gray-400">Sistemas Avanzados</p>
        </div>
        
        <div className="px-4 mb-6">
          <Card className="bg-gray-800/50 border-gray-600">
            <CardHeader className="pb-3">
              <CardTitle className="text-white flex items-center gap-2">
                <Signal className="w-5 h-5 text-cyan-400" />
                Sistemas Avanzados
              </CardTitle>
              <CardDescription className="text-gray-400">
                Monitoreo y control en tiempo real
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { icon: Eye, name: 'Visión 360°', status: 'Activo', variant: 'default', health: 'excellent' },
                { icon: Shield, name: 'Seguridad', status: 'Protegido', variant: 'default', health: 'good' },
                { icon: Battery, name: 'Energía', status: '78%', variant: 'secondary', health: 'good' },
                { icon: Activity, name: 'Diagnóstico', status: 'OK', variant: 'default', health: 'excellent' },
                { icon: Settings, name: 'Configuración', status: 'Manual', variant: 'outline', health: 'normal' },
                { icon: Navigation, name: 'GPS Satelital', status: 'Conectado', variant: 'default', health: 'excellent' }
              ].map((system, i) => (
                <Card
                  key={i}
                  className={`cursor-pointer transition-all border ${
                    activeControl === i 
                      ? 'bg-cyan-600/20 border-cyan-500 shadow-lg' 
                      : 'bg-gray-700/30 border-gray-600 hover:bg-gray-600/30'
                  }`}
                  onClick={() => setActiveControl(i)}
                >
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <system.icon 
                          size={18} 
                          className={activeControl === i ? 'text-cyan-400' : 'text-gray-400'}
                        />
                        <div>
                          <div className={`text-sm font-medium ${activeControl === i ? 'text-white' : 'text-gray-300'}`}>
                            {system.name}
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <div className={`w-2 h-2 rounded-full ${
                              system.health === 'excellent' ? 'bg-green-400' :
                              system.health === 'good' ? 'bg-blue-400' : 'bg-yellow-400'
                            }`} />
                            <span className="text-xs text-gray-400">
                              {system.health === 'excellent' ? 'Excelente' :
                               system.health === 'good' ? 'Bueno' : 'Normal'}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Badge variant={system.variant} className="text-xs">
                        {system.status}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="px-4 mb-6">
          <Alert className="bg-green-900/30 border-green-500/50 text-green-100">
            <CheckCircle className="h-4 w-4" />
            <AlertTitle>Sistema OK</AlertTitle>
            <AlertDescription>Todos los sistemas funcionan correctamente</AlertDescription>
          </Alert>
        </div>

        <div className="flex-1" />
        <div className="px-4 space-y-3">
          <Card className="bg-gradient-to-r from-green-900/20 to-green-800/20 border-green-500/30">
            <CardContent className="p-4 text-center">
              <Battery className="w-6 h-6 mx-auto mb-2 text-green-400" />
              <div className="text-2xl font-bold text-green-400">78%</div>
              <div className="text-xs text-green-300">Batería Principal</div>
              <Badge variant="outline" className="mt-2 text-green-400 border-green-400">
                Óptimo
              </Badge>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-cyan-900/20 to-blue-800/20 border-cyan-500/30">
            <CardContent className="p-4 text-center">
              <Gauge className="w-6 h-6 mx-auto mb-2 text-cyan-400" />
              <div className="text-2xl font-bold text-cyan-400">{speed[0]}</div>
              <div className="text-xs text-cyan-300">Velocidad (km/h)</div>
              <Badge 
                variant={speed[0] > 150 ? "destructive" : speed[0] > 80 ? "secondary" : "default"}
                className="mt-2"
              >
                {speed[0] > 150 ? 'Alta' : speed[0] > 80 ? 'Media' : 'Baja'}
              </Badge>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-900/20 to-purple-800/20 border-blue-500/30">
            <CardContent className="p-4 text-center">
              <Clock className="w-6 h-6 mx-auto mb-2 text-blue-400" />
              <div className="text-lg font-bold text-blue-400">12:34</div>
              <div className="text-xs text-blue-300">Sistema Activo</div>
              <Badge variant="default" className="mt-2 bg-blue-600">
                En Línea
              </Badge>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Barra inferior expandida */}
      <div className="absolute bottom-0 left-64 right-64 bg-gray-900 border-t border-gray-700 p-4">
        <div className="flex justify-between items-center mb-3">
          <div className="text-sm font-medium text-white">Funciones Rápidas</div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-xs text-gray-400">Sistema Conectado</span>
          </div>
        </div>
        <div className="grid grid-cols-5 gap-3">
          {[
            { icon: Navigation, name: 'Navegación', active: true },
            { icon: Thermometer, name: 'Clima', active: false },
            { icon: Volume2, name: 'Audio', active: true },
            { icon: Phone, name: 'Teléfono', active: false },
            { icon: Camera, name: 'Cámara', active: true },
            { icon: Eye, name: 'Seguridad', active: true },
            { icon: Zap, name: 'Energía', active: true },
            { icon: Wifi, name: 'Conectividad', active: true },
            { icon: Settings, name: 'Configuración', active: false },
            { icon: Car, name: 'Vehículo', active: true }
          ].map((func, i) => (
            <button 
              key={i} 
              className={`p-3 rounded-lg transition-all flex flex-col items-center gap-2 ${
                func.active 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' 
                  : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
              }`}
            >
              <func.icon size={18} />
              <span className="text-xs font-medium">{func.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FuturisticInterface;
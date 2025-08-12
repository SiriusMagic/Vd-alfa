import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  Gauge, 
  Battery, 
  Thermometer, 
  Zap, 
  Car, 
  Settings,
  Save,
  RotateCcw,
  Fuel
} from 'lucide-react';
import { mockData, presetConfigs } from '../data/mockData';
import { useToast } from '../hooks/use-toast';

const VehicleInterface = () => {
  const [vehicleData, setVehicleData] = useState(mockData);
  const [driveMode, setDriveMode] = useState('AWD');
  const [powerDistribution, setPowerDistribution] = useState([60, 40]); // [rear, front]
  const [motorControls, setMotorControls] = useState({
    rear: { voltage: 400, amperage: 150 },
    front: { voltage: 380, amperage: 120 }
  });
  const [savedConfigs, setSavedConfigs] = useState(presetConfigs);
  const [activeConfig, setActiveConfig] = useState('Custom');
  const { toast } = useToast();

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setVehicleData(prev => ({
        ...prev,
        speed: prev.speed + (Math.random() - 0.5) * 2,
        batteryTemp: prev.batteryTemp + (Math.random() - 0.5) * 0.5,
        torque: motorControls.rear.amperage + motorControls.front.amperage + (Math.random() - 0.5) * 10
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, [motorControls]);

  const handleDriveModeChange = (mode) => {
    setDriveMode(mode);
    if (mode === 'FWD') {
      setPowerDistribution([0, 100]);
    } else if (mode === 'RWD') {
      setPowerDistribution([100, 0]);
    } else {
      setPowerDistribution([60, 40]);
    }
    toast({
      title: "Modo de tracción cambiado",
      description: `Modo ${mode} activado`,
    });
  };

  const handlePowerDistributionChange = (values) => {
    const rear = values[0];
    const front = 100 - rear;
    setPowerDistribution([rear, front]);
    setActiveConfig('Custom');
  };

  const handleMotorControlChange = (motor, type, value) => {
    setMotorControls(prev => ({
      ...prev,
      [motor]: {
        ...prev[motor],
        [type]: value[0]
      }
    }));
    setActiveConfig('Custom');
  };

  const saveCurrentConfig = () => {
    const newConfig = {
      name: `Config ${savedConfigs.length + 1}`,
      powerDistribution: [...powerDistribution],
      motorControls: { ...motorControls },
      driveMode
    };
    setSavedConfigs(prev => [...prev, newConfig]);
    setActiveConfig(newConfig.name);
    toast({
      title: "Configuración guardada",
      description: `${newConfig.name} guardado exitosamente`,
    });
  };

  const loadConfig = (config) => {
    setPowerDistribution(config.powerDistribution);
    setMotorControls(config.motorControls);
    setDriveMode(config.driveMode);
    setActiveConfig(config.name);
    toast({
      title: "Configuración cargada",
      description: `${config.name} aplicado`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent mb-2">
            CONTROL VEHICULAR ELÉCTRICO
          </h1>
          <p className="text-slate-400">Sistema de gestión avanzada de tracción y potencia</p>
        </div>

        {/* Main Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Speed & Battery Status */}
          <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Gauge className="w-8 h-8 text-cyan-400" />
                <Badge variant="outline" className="text-cyan-400 border-cyan-400">
                  VELOCIDAD
                </Badge>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400 mb-2">
                  {Math.round(vehicleData.speed)} km/h
                </div>
                <Progress value={vehicleData.speed} max={200} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* Battery Status */}
          <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Battery className="w-8 h-8 text-green-400" />
                <Badge variant="outline" className="text-green-400 border-green-400">
                  BATERÍA
                </Badge>
              </div>
              <div className="space-y-3">
                <div className="text-2xl font-bold text-green-400">
                  {vehicleData.batteryLevel}%
                </div>
                <Progress value={vehicleData.batteryLevel} className="h-2" />
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Temp:</span>
                  <span className="text-orange-400 flex items-center">
                    <Thermometer className="w-4 h-4 mr-1" />
                    {Math.round(vehicleData.batteryTemp)}°C
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Torque */}
          <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Zap className="w-8 h-8 text-yellow-400" />
                <Badge variant="outline" className="text-yellow-400 border-yellow-400">
                  TORQUE
                </Badge>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-2">
                  {Math.round(vehicleData.torque)} Nm
                </div>
                <Progress value={vehicleData.torque} max={500} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* Drive Mode */}
          <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Car className="w-8 h-8 text-purple-400" />
                <Badge variant="outline" className="text-purple-400 border-purple-400">
                  TRACCIÓN
                </Badge>
              </div>
              <div className="space-y-2">
                {['FWD', 'RWD', 'AWD'].map((mode) => (
                  <Button
                    key={mode}
                    variant={driveMode === mode ? "default" : "outline"}
                    className={`w-full ${driveMode === mode 
                      ? 'bg-purple-600 hover:bg-purple-700' 
                      : 'border-slate-600 hover:border-purple-400'
                    }`}
                    onClick={() => handleDriveModeChange(mode)}
                  >
                    {mode}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Power Distribution Control */}
        <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-cyan-400">
                Distribución de Potencia AWD
              </h3>
              <Badge className="bg-cyan-600">{activeConfig}</Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Trasera</span>
                  <span className="text-cyan-400 font-bold">{powerDistribution[0]}%</span>
                </div>
                <Slider
                  value={[powerDistribution[0]]}
                  onValueChange={(values) => handlePowerDistributionChange(values)}
                  max={100}
                  step={1}
                  className="w-full"
                  disabled={driveMode !== 'AWD'}
                />
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Delantera</span>
                  <span className="text-cyan-400 font-bold">{powerDistribution[1]}%</span>
                </div>
                <Progress value={powerDistribution[1]} className="h-4" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Motor Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Rear Motor */}
          <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-sm">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-red-400 mb-6">
                Motor Trasero
              </h3>
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-slate-300">Voltaje</span>
                    <span className="text-red-400 font-bold">{motorControls.rear.voltage}V</span>
                  </div>
                  <Slider
                    value={[motorControls.rear.voltage]}
                    onValueChange={(value) => handleMotorControlChange('rear', 'voltage', value)}
                    min={200}
                    max={600}
                    step={5}
                    className="w-full"
                  />
                  <div className="text-xs text-slate-500 mt-1">Velocidad máxima</div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-slate-300">Amperaje</span>
                    <span className="text-red-400 font-bold">{motorControls.rear.amperage}A</span>
                  </div>
                  <Slider
                    value={[motorControls.rear.amperage]}
                    onValueChange={(value) => handleMotorControlChange('rear', 'amperage', value)}
                    min={50}
                    max={300}
                    step={5}
                    className="w-full"
                  />
                  <div className="text-xs text-slate-500 mt-1">Torque máximo</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Front Motor */}
          <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-sm">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-blue-400 mb-6">
                Motor Delantero
              </h3>
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-slate-300">Voltaje</span>
                    <span className="text-blue-400 font-bold">{motorControls.front.voltage}V</span>
                  </div>
                  <Slider
                    value={[motorControls.front.voltage]}
                    onValueChange={(value) => handleMotorControlChange('front', 'voltage', value)}
                    min={200}
                    max={600}
                    step={5}
                    className="w-full"
                  />
                  <div className="text-xs text-slate-500 mt-1">Velocidad máxima</div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-slate-300">Amperaje</span>
                    <span className="text-blue-400 font-bold">{motorControls.front.amperage}A</span>
                  </div>
                  <Slider
                    value={[motorControls.front.amperage]}
                    onValueChange={(value) => handleMotorControlChange('front', 'amperage', value)}
                    min={50}
                    max={300}
                    step={5}
                    className="w-full"
                  />
                  <div className="text-xs text-slate-500 mt-1">Torque máximo</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Configuration Management */}
        <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-green-400">
                Configuraciones Guardadas
              </h3>
              <div className="space-x-2">
                <Button 
                  onClick={saveCurrentConfig}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Guardar Actual
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {savedConfigs.map((config, index) => (
                <Card 
                  key={index}
                  className={`cursor-pointer transition-all ${
                    activeConfig === config.name 
                      ? 'bg-green-600/20 border-green-500' 
                      : 'bg-slate-800/50 border-slate-600 hover:border-green-400'
                  }`}
                  onClick={() => loadConfig(config)}
                >
                  <CardContent className="p-4">
                    <div className="text-sm font-semibold text-green-400 mb-2">
                      {config.name}
                    </div>
                    <div className="text-xs text-slate-400 space-y-1">
                      <div>Modo: {config.driveMode}</div>
                      <div>T: {config.powerDistribution[0]}% / D: {config.powerDistribution[1]}%</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VehicleInterface;
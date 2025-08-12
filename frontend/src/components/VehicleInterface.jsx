import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Switch } from './ui/switch';
import { 
  Gauge, 
  Battery, 
  Thermometer, 
  Zap, 
  Car, 
  Settings,
  Save,
  RotateCcw,
  Eye,
  Shield,
  Mountain,
  Radar,
  Activity,
  AlertTriangle,
  Zap as Lightning,
  Moon,
  FlameKindling,
  ArrowUp,
  ArrowDown,
  Compass,
  Target
} from 'lucide-react';
import { mockData, presetConfigs, suspensionModes, driveProfiles } from '../data/mockData';
import { useToast } from '../hooks/use-toast';
import SuspensionControl from './SuspensionControl';
import SituationalAwareness from './SituationalAwareness'; 
import VirtualTransmission from './VirtualTransmission';
import AdvancedDiagnostics from './AdvancedDiagnostics';

const VehicleInterface = () => {
  const [vehicleData, setVehicleData] = useState(mockData);
  const [driveMode, setDriveMode] = useState('AWD');
  const [powerDistribution, setPowerDistribution] = useState([60, 40]);
  const [motorControls, setMotorControls] = useState({
    rear: { voltage: 400, amperage: 150 },
    front: { voltage: 380, amperage: 120 }
  });
  const [savedConfigs, setSavedConfigs] = useState(presetConfigs);
  const [activeConfig, setActiveConfig] = useState('Custom');
  const [currentGear, setCurrentGear] = useState(2);
  const [driveProfile, setDriveProfile] = useState('Normal');
  const [overdrive, setOverdrive] = useState(false);
  const [hibernationMode, setHibernationMode] = useState(false);
  const [regenMode, setRegenMode] = useState('Standard');
  const { toast } = useToast();

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      if (!hibernationMode) {
        setVehicleData(prev => ({
          ...prev,
          speed: Math.max(0, prev.speed + (Math.random() - 0.5) * 3),
          batteryTemp: prev.batteryTemp + (Math.random() - 0.5) * 0.8,
          torque: motorControls.rear.amperage + motorControls.front.amperage + (Math.random() - 0.5) * 15,
          gForce: {
            x: (Math.random() - 0.5) * 2,
            y: (Math.random() - 0.5) * 1.5,
            z: (Math.random() - 0.5) * 0.8
          },
          pitch: (Math.random() - 0.5) * 20,
          roll: (Math.random() - 0.5) * 15,
          tirePressure: {
            fl: 32 + (Math.random() - 0.5) * 2,
            fr: 32 + (Math.random() - 0.5) * 2,
            rl: 33 + (Math.random() - 0.5) * 2,
            rr: 33 + (Math.random() - 0.5) * 2
          }
        }));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [motorControls, hibernationMode]);

  const handleDriveProfileChange = (profile) => {
    setDriveProfile(profile);
    const profileConfig = driveProfiles.find(p => p.name === profile);
    
    if (profileConfig) {
      setMotorControls(profileConfig.motorControls);
      setPowerDistribution(profileConfig.powerDistribution);
      setDriveMode(profileConfig.driveMode);
    }
    
    toast({
      title: `Modo ${profile} activado`,
      description: profileConfig?.description || "Configuración aplicada",
    });
  };

  const handleOverdriveToggle = () => {
    setOverdrive(!overdrive);
    if (!overdrive) {
      // Boost power for 30 seconds
      setMotorControls(prev => ({
        rear: { voltage: Math.min(600, prev.rear.voltage + 100), amperage: Math.min(300, prev.rear.amperage + 50) },
        front: { voltage: Math.min(600, prev.front.voltage + 100), amperage: Math.min(300, prev.front.amperage + 50) }
      }));
      
      setTimeout(() => {
        setOverdrive(false);
        toast({
          title: "Overdrive desactivado",
          description: "Potencia restaurada a niveles normales",
        });
      }, 30000);
      
      toast({
        title: "⚡ OVERDRIVE ACTIVADO",
        description: "Potencia máxima por 30 segundos",
      });
    }
  };

  const handleHibernationToggle = () => {
    setHibernationMode(!hibernationMode);
    toast({
      title: hibernationMode ? "Despertar del hibernación" : "Modo hibernación activado",
      description: hibernationMode ? "Todos los sistemas activos" : "Sistemas en modo de bajo consumo",
    });
  };

  const handleRegenModeChange = (mode) => {
    setRegenMode(mode);
    toast({
      title: `Regeneración ${mode}`,
      description: mode === 'Aggressive' ? "Freno de motor activado" : "Regeneración estándar",
    });
  };

  const handleDriveModeChange = (mode) => {
    setDriveMode(mode);
    if (mode === 'FWD') {
      setPowerDistribution([0, 100]);
    } else if (mode === 'RWD') {
      setPowerDistribution([100, 0]);
    } else {
      setPowerDistribution([60, 40]);
    }
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header with Status Indicators */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent mb-2">
            TROPHY TRUCK ELÉCTRICO
          </h1>
          <div className="flex justify-center space-x-4 mb-4">
            <Badge variant={hibernationMode ? "destructive" : "default"} className="text-sm">
              {hibernationMode ? "HIBERNACIÓN" : "ACTIVO"}
            </Badge>
            <Badge variant={overdrive ? "destructive" : "outline"} className="text-sm">
              {overdrive ? "⚡ OVERDRIVE" : "NORMAL"}
            </Badge>
            <Badge variant="outline" className="text-sm">
              PERFIL: {driveProfile}
            </Badge>
            <Badge variant="outline" className="text-sm">
              MARCHA: {currentGear}
            </Badge>
          </div>
        </div>

        {/* Emergency Controls */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Button 
            variant={overdrive ? "destructive" : "outline"}
            onClick={handleOverdriveToggle}
            disabled={hibernationMode}
            className="h-16 text-lg font-bold"
          >
            <Lightning className="w-6 h-6 mr-2" />
            {overdrive ? "OVERDRIVE ACTIVO" : "OVERDRIVE"}
          </Button>
          
          <Button 
            variant={hibernationMode ? "default" : "outline"}
            onClick={handleHibernationToggle}
            className="h-16 text-lg"
          >
            <Moon className="w-6 h-6 mr-2" />
            {hibernationMode ? "DESPERTAR" : "HIBERNAR"}
          </Button>
          
          <Button 
            variant={regenMode === 'Aggressive' ? "destructive" : "outline"}
            onClick={() => handleRegenModeChange(regenMode === 'Aggressive' ? 'Standard' : 'Aggressive')}
            disabled={hibernationMode}
            className="h-16 text-lg"
          >
            <FlameKindling className="w-6 h-6 mr-2" />
            REGEN {regenMode.toUpperCase()}
          </Button>
          
          <div className="grid grid-cols-3 gap-2">
            {driveProfiles.map((profile) => (
              <Button
                key={profile.name}
                variant={driveProfile === profile.name ? "default" : "outline"}
                onClick={() => handleDriveProfileChange(profile.name)}
                disabled={hibernationMode}
                className="h-16 text-xs font-bold"
              >
                {profile.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Main Interface Tabs */}
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-slate-800">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-cyan-600">
              <Gauge className="w-4 h-4 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="suspension" className="data-[state=active]:bg-orange-600">
              <Mountain className="w-4 h-4 mr-2" />
              Suspensión
            </TabsTrigger>
            <TabsTrigger value="awareness" className="data-[state=active]:bg-green-600">
              <Eye className="w-4 h-4 mr-2" />
              Sensores
            </TabsTrigger>
            <TabsTrigger value="transmission" className="data-[state=active]:bg-purple-600">
              <Settings className="w-4 h-4 mr-2" />
              Transmisión
            </TabsTrigger>
            <TabsTrigger value="diagnostics" className="data-[state=active]:bg-red-600">
              <Activity className="w-4 h-4 mr-2" />
              Diagnósticos
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
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

              {/* G-Force & Attitude */}
              <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Compass className="w-8 h-8 text-purple-400" />
                    <Badge variant="outline" className="text-purple-400 border-purple-400">
                      ACTITUD
                    </Badge>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>G-Force X:</span>
                      <span className="text-purple-400">{vehicleData.gForce?.x?.toFixed(2)}g</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Pitch:</span>
                      <span className="text-purple-400">{vehicleData.pitch?.toFixed(1)}°</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Roll:</span>
                      <span className="text-purple-400">{vehicleData.roll?.toFixed(1)}°</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Torque & Power */}
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
                      disabled={driveMode !== 'AWD' || hibernationMode}
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
                        disabled={hibernationMode}
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
                        disabled={hibernationMode}
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
                        disabled={hibernationMode}
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
                        disabled={hibernationMode}
                      />
                      <div className="text-xs text-slate-500 mt-1">Torque máximo</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="suspension">
            <SuspensionControl disabled={hibernationMode} />
          </TabsContent>

          <TabsContent value="awareness">
            <SituationalAwareness vehicleData={vehicleData} disabled={hibernationMode} />
          </TabsContent>

          <TabsContent value="transmission">
            <VirtualTransmission 
              currentGear={currentGear}
              setCurrentGear={setCurrentGear}
              motorControls={motorControls}
              setMotorControls={setMotorControls}
              disabled={hibernationMode}
            />
          </TabsContent>

          <TabsContent value="diagnostics">
            <AdvancedDiagnostics vehicleData={vehicleData} motorControls={motorControls} disabled={hibernationMode} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default VehicleInterface;
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
  Target,
  Brain,
  Snowflake,
  Heart,
  Sparkles
} from 'lucide-react';
import { mockData, presetConfigs, suspensionModes, driveProfiles } from '../data/mockData';
import { useToast } from '../hooks/use-toast';
import SuspensionControl from './SuspensionControl';
import SituationalAwareness from './SituationalAwareness'; 
import VirtualTransmission from './VirtualTransmission';
import AdvancedDiagnostics from './AdvancedDiagnostics';
import PowerControlSystem from './PowerControlSystem';
import BionicCooling from './BionicCooling';
import SmartVehicleControl from './SmartVehicleControl';
import ComfortSystems from './ComfortSystems';
import AdvancedDriving from './AdvancedDriving';
import TractionControl from './TractionControl';

const VehicleInterface = () => {
  const [vehicleData, setVehicleData] = useState(mockData);
  const [driveMode, setDriveMode] = useState('AWD');
  const [powerControlMode, setPowerControlMode] = useState('axle'); // 'axle', 'individual', 'ai'
  const [powerDistribution, setPowerDistribution] = useState([60, 40]);
  const [motorControls, setMotorControls] = useState({
    rear: { voltage: 400, amperage: 150 },
    front: { voltage: 380, amperage: 120 }
  });
  const [individualMotorControls, setIndividualMotorControls] = useState({
    rearLeft: { voltage: 400, amperage: 150 },
    rearRight: { voltage: 400, amperage: 150 },
    frontLeft: { voltage: 380, amperage: 120 },
    frontRight: { voltage: 380, amperage: 120 }
  });
  const [aiPowerActive, setAiPowerActive] = useState(false);
  const [bionicCooling, setBionicCooling] = useState({
    active: true,
    temperature: -15, // °C
    pulseRate: 72, // BPM equivalent
    arterialPressure: 85, // %
    venousReturn: 92, // %
    cryoFluidLevel: 94 // %
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
          batteryTemp: bionicCooling.active ? 
            Math.max(15, prev.batteryTemp + (Math.random() - 0.8) * 0.5) : 
            prev.batteryTemp + (Math.random() - 0.5) * 0.8,
          torque: powerControlMode === 'ai' && aiPowerActive ? 
            450 + (Math.random() - 0.5) * 50 :
            (motorControls.rear.amperage + motorControls.front.amperage) + (Math.random() - 0.5) * 15,
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

        // Update bionic cooling system
        setBionicCooling(prev => ({
          ...prev,
          temperature: prev.active ? -15 + (Math.random() - 0.5) * 3 : prev.temperature + 1,
          pulseRate: 72 + (Math.random() - 0.5) * 10,
          arterialPressure: 85 + (Math.random() - 0.5) * 10,
          venousReturn: 92 + (Math.random() - 0.5) * 5,
          cryoFluidLevel: Math.max(50, prev.cryoFluidLevel - 0.01)
        }));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [motorControls, hibernationMode, bionicCooling.active, powerControlMode, aiPowerActive]);

  const handlePowerControlModeChange = (mode) => {
    setPowerControlMode(mode);
    setActiveConfig('Custom');
    
    let description = '';
    switch(mode) {
      case 'axle':
        description = 'Control por ejes delantero y trasero';
        break;
      case 'individual':
        description = 'Control independiente de cada motor';
        break;
      case 'ai':
        description = 'IA gestiona la potencia automáticamente';
        break;
    }
    
    toast({
      title: `Modo de potencia: ${mode.toUpperCase()}`,
      description: description,
    });
  };

  const handleAiPowerToggle = () => {
    setAiPowerActive(!aiPowerActive);
    if (!aiPowerActive) {
      // AI takes control
      setPowerDistribution([70, 30]);
      setMotorControls({
        rear: { voltage: 520, amperage: 220 },
        front: { voltage: 480, amperage: 180 }
      });
      toast({
        title: "🧠 IA ACTIVADA",
        description: "Sistema inteligente optimizando potencia en tiempo real",
      });
    } else {
      toast({
        title: "IA desactivada",
        description: "Control manual restaurado",
      });
    }
  };

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
      
      // Boost bionic cooling
      setBionicCooling(prev => ({ ...prev, pulseRate: 120, arterialPressure: 95 }));
      
      setTimeout(() => {
        setOverdrive(false);
        setBionicCooling(prev => ({ ...prev, pulseRate: 72, arterialPressure: 85 }));
        toast({
          title: "Overdrive desactivado",
          description: "Potencia y refrigeración restauradas",
        });
      }, 30000);
      
      toast({
        title: "⚡ OVERDRIVE + CRIOGÉNICO ACTIVADO",
        description: "Potencia máxima con refrigeración biónica acelerada",
      });
    }
  };

  const handleHibernationToggle = () => {
    setHibernationMode(!hibernationMode);
    setBionicCooling(prev => ({ 
      ...prev, 
      active: hibernationMode, 
      pulseRate: hibernationMode ? 72 : 20 
    }));
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header with Status Indicators */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent mb-2">
            TROPHY TRUCK ELÉCTRICO - SISTEMA INTELIGENTE
          </h1>
          <div className="flex justify-center space-x-4 mb-4">
            <Badge variant={hibernationMode ? "destructive" : "default"} className="text-sm">
              {hibernationMode ? "HIBERNACIÓN" : "ACTIVO"}
            </Badge>
            <Badge variant={overdrive ? "destructive" : "outline"} className="text-sm">
              {overdrive ? "⚡ OVERDRIVE" : "NORMAL"}
            </Badge>
            <Badge variant={bionicCooling.active ? "default" : "destructive"} className="text-sm">
              {bionicCooling.active ? "❄️ CRIOGÉNICO" : "ENFRIAMIENTO OFF"}
            </Badge>
            <Badge variant="outline" className="text-sm">
              POTENCIA: {powerControlMode.toUpperCase()}
            </Badge>
            <Badge variant={aiPowerActive ? "destructive" : "outline"} className="text-sm">
              {aiPowerActive ? "🧠 IA ACTIVA" : "MANUAL"}
            </Badge>
          </div>
        </div>

        {/* Emergency Controls */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
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
          
          <Button 
            variant={bionicCooling.active ? "default" : "destructive"}
            onClick={() => setBionicCooling(prev => ({ ...prev, active: !prev.active }))}
            disabled={hibernationMode}
            className="h-16 text-lg"
          >
            <Snowflake className="w-6 h-6 mr-2" />
            CRIOGÉNICO
          </Button>
          
          <div className="grid grid-cols-3 gap-1">
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
          <TabsList className="grid w-full grid-cols-10 bg-slate-800">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-cyan-600">
              <Gauge className="w-4 h-4 mr-1" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="traction" className="data-[state=active]:bg-teal-600">
              <ArrowLeftRight className="w-4 h-4 mr-1" />
              Tracción
            </TabsTrigger>
            <TabsTrigger value="smart" className="data-[state=active]:bg-purple-600">
              <Sparkles className="w-4 h-4 mr-1" />
              Inteligente
            </TabsTrigger>
            <TabsTrigger value="comfort" className="data-[state=active]:bg-indigo-600">
              <Settings className="w-4 h-4 mr-1" />
              Confort
            </TabsTrigger>
            <TabsTrigger value="driving" className="data-[state=active]:bg-emerald-600">
              <Car className="w-4 h-4 mr-1" />
              Conducción
            </TabsTrigger>
            <TabsTrigger value="power" className="data-[state=active]:bg-yellow-600">
              <Zap className="w-4 h-4 mr-1" />
              Potencia
            </TabsTrigger>
            <TabsTrigger value="cooling" className="data-[state=active]:bg-blue-600">
              <Heart className="w-4 h-4 mr-1" />
              Criogénico
            </TabsTrigger>
            <TabsTrigger value="suspension" className="data-[state=active]:bg-orange-600">
              <Mountain className="w-4 h-4 mr-1" />
              Suspensión
            </TabsTrigger>
            <TabsTrigger value="awareness" className="data-[state=active]:bg-green-600">
              <Eye className="w-4 h-4 mr-1" />
              Sensores
            </TabsTrigger>
            <TabsTrigger value="diagnostics" className="data-[state=active]:bg-red-600">
              <Activity className="w-4 h-4 mr-1" />
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
                      <span className={`flex items-center ${
                        bionicCooling.active ? 'text-blue-400' : 'text-orange-400'
                      }`}>
                        <Thermometer className="w-4 h-4 mr-1" />
                        {Math.round(vehicleData.batteryTemp)}°C
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Bionic Cooling Status */}
              <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Snowflake className="w-8 h-8 text-blue-400" />
                    <Badge variant="outline" className="text-blue-400 border-blue-400">
                      CRIOGÉNICO
                    </Badge>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Temp. Crio:</span>
                      <span className="text-blue-400">{bionicCooling.temperature.toFixed(1)}°C</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Pulso:</span>
                      <span className="text-purple-400 flex items-center">
                        <Heart className="w-4 h-4 mr-1" />
                        {bionicCooling.pulseRate} BPM
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Presión:</span>
                      <span className="text-cyan-400">{bionicCooling.arterialPressure}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Torque & AI Status */}
              <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Zap className="w-8 h-8 text-yellow-400" />
                    <Badge variant="outline" className={aiPowerActive ? "text-purple-400 border-purple-400" : "text-yellow-400 border-yellow-400"}>
                      {aiPowerActive ? "IA TORQUE" : "TORQUE"}
                    </Badge>
                  </div>
                  <div className="text-center">
                    <div className={`text-3xl font-bold mb-2 ${aiPowerActive ? 'text-purple-400' : 'text-yellow-400'}`}>
                      {Math.round(vehicleData.torque)} Nm
                    </div>
                    <Progress value={vehicleData.torque} max={500} className="h-2" />
                    {aiPowerActive && (
                      <div className="text-xs text-purple-400 mt-2 flex items-center justify-center">
                        <Brain className="w-4 h-4 mr-1" />
                        IA optimizando
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="smart">
            <SmartVehicleControl vehicleData={vehicleData} disabled={hibernationMode} />
          </TabsContent>

          <TabsContent value="comfort">
            <ComfortSystems vehicleData={vehicleData} disabled={hibernationMode} />
          </TabsContent>

          <TabsContent value="driving">
            <AdvancedDriving vehicleData={vehicleData} disabled={hibernationMode} />
          </TabsContent>

          <TabsContent value="power">
            <PowerControlSystem 
              powerControlMode={powerControlMode}
              setPowerControlMode={handlePowerControlModeChange}
              powerDistribution={powerDistribution}
              setPowerDistribution={setPowerDistribution}
              motorControls={motorControls}
              setMotorControls={setMotorControls}
              individualMotorControls={individualMotorControls}
              setIndividualMotorControls={setIndividualMotorControls}
              aiPowerActive={aiPowerActive}
              setAiPowerActive={handleAiPowerToggle}
              disabled={hibernationMode}
            />
          </TabsContent>

          <TabsContent value="cooling">
            <BionicCooling 
              bionicCooling={bionicCooling}
              setBionicCooling={setBionicCooling}
              vehicleData={vehicleData}
              disabled={hibernationMode}
            />
          </TabsContent>

          <TabsContent value="suspension">
            <SuspensionControl disabled={hibernationMode} />
          </TabsContent>

          <TabsContent value="awareness">
            <SituationalAwareness vehicleData={vehicleData} disabled={hibernationMode} />
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
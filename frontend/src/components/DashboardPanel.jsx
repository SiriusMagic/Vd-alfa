import React, { useEffect, useMemo, useState } from "react";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { Progress } from "./ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Wifi, Bluetooth, Battery, Gauge, Thermometer } from "lucide-react";

const DashboardPanel = () => {
  const [systemStatus] = useState({ battery: 78, range: 456, connectivity: true, health: 97, cycles: 1247 });
  const [showBattery, setShowBattery] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);
  const [sceneError, setSceneError] = useState(null);

  // Escena 3D: versión robusta sin importmap ni type=module, con fallback a UMD
  const sceneHTML = useMemo(
    () => `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<style>
  html,body { height:100%; margin:0; background:#060a0f; overflow:hidden; }
  #app { position:absolute; inset:0; }
  .hud { position: absolute; left: 12px; top: 10px; color:#7efcff; font: 12px/1.2 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; opacity:.85; letter-spacing:.5px }
  .loader { position:absolute; inset:0; display:flex; align-items:center; justify-content:center; color:#8be4ff; font: 12px ui-monospace; background:rgba(0,0,0,.15) }
  .error { position:absolute; inset:0; padding:12px; color:#ff8b8b; font:12px ui-monospace; background:rgba(120,0,0,.15) }
</style>
</head>
<body>
  <div id="app"></div>
  <div class="hud">clic = focus · doble clic = reset</div>
  <div id="loader" class="loader">Cargando 3D…</div>
  <div id="err" class="error" style="display:none"></div>
  <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>
  <script>
    (async function(){
      const app = document.getElementById('app');
      const loader = document.getElementById('loader');
      const errBox = document.getElementById('err');

      function reportReady(){ loader.style.display='none'; parent.postMessage({ type:'scene_ready' }, '*'); }
      function reportError(e){ loader.style.display='none'; errBox.style.display='block'; errBox.textContent = (e && (e.message||e.toString())) || 'Error desconocido'; parent.postMessage({ type:'scene_error', message: errBox.textContent }, '*'); }

      function buildScene(THREE, OrbitControls){
        try{
          const scene = new THREE.Scene();
          scene.fog = new THREE.FogExp2(0x02060b, 0.06);

          const camera = new THREE.PerspectiveCamera(55, innerWidth/innerHeight, 0.1, 1000);
          camera.position.set(7, 4, 8);

          const renderer = new THREE.WebGLRenderer({ antialias:true, alpha:true });
          renderer.setSize(innerWidth, innerHeight);
          renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
          if (THREE.SRGBColorSpace) renderer.outputColorSpace = THREE.SRGBColorSpace;
          app.appendChild(renderer.domElement);

          const hemi = new THREE.HemisphereLight(0x9cfaff, 0x0a1e2a, 0.9); scene.add(hemi);
          const dir = new THREE.DirectionalLight(0x7ff8ff, 1.2); dir.position.set(5,10,7); scene.add(dir);

          const cyan = new THREE.Color('#4ef3ff');
          const holo = new THREE.MeshPhysicalMaterial({ color: cyan, metalness: 0.1, roughness: 0.15, transmission: 0.85, thickness: 0.4, transparent: true, opacity: 0.35, blending: THREE.AdditiveBlending, envMapIntensity: 0.6 });

          function addEdges(mesh, color=cyan, strength=1){
            const edges = new THREE.EdgesGeometry(mesh.geometry, 35);
            const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color, transparent:true, opacity:0.9 * strength }));
            line.position.copy(mesh.position); line.rotation.copy(mesh.rotation); line.scale.copy(mesh.scale);
            mesh.add(line); return line;
          }

          const car = new THREE.Group(); scene.add(car);

          const body = new THREE.Mesh(new THREE.BoxGeometry(5.2, 1.0, 2.2), holo); body.position.y = 1.2; car.add(body); addEdges(body);
          const cabin = new THREE.Mesh(new THREE.BoxGeometry(2.2, 1.0, 2.1), holo); cabin.position.set(-0.8, 1.8, 0); car.add(cabin); addEdges(cabin);
          const bed = new THREE.Mesh(new THREE.BoxGeometry(2.6, 1.0, 2.15), holo); bed.position.set(1.2, 1.5, 0); car.add(bed); addEdges(bed);

          const glass = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.8, 1.9), holo);
          const degToRad = (THREE.MathUtils && THREE.MathUtils.degToRad) ? THREE.MathUtils.degToRad : (d)=>d*Math.PI/180;
          glass.rotation.z = degToRad(-65); glass.position.set(0.4, 2.0, 0); car.add(glass); addEdges(glass, 0x9cfaff, 1.2);

          function wheel(x,z){ const t = new THREE.TorusGeometry(0.65, 0.18, 12, 48); const m = new THREE.Mesh(t, holo); m.rotation.x = Math.PI/2; m.position.set(x, 0.65, z); addEdges(m); car.add(m); return m; }
          wheel(-1.6,  1.05); wheel(-1.6, -1.05); wheel( 1.8,  1.05); wheel( 1.8, -1.05);

          const engine = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.6, 0.8), new THREE.MeshPhysicalMaterial({ color:0x7efcff, roughness:0.1, transmission:0.6, opacity:0.6, transparent:true, blending:THREE.AdditiveBlending }));
          engine.position.set(-2.0, 1.1, 0); engine.name = 'motor'; car.add(engine); addEdges(engine, 0xffffff, 1.4);

          const batteryGroup = new THREE.Group(); batteryGroup.name = 'battery';
          const batteryBody = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.9, 0.9), new THREE.MeshPhysicalMaterial({ color:0x7CFC00, roughness:0.2, transmission:0.55, opacity:0.5, transparent:true }));
          const batteryCap = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.25, 24), new THREE.MeshPhysicalMaterial({ color:0xb5ff6b, roughness:0.2, transmission:0.6, opacity:0.6, transparent:true }));
          batteryCap.rotation.z = Math.PI/2; batteryCap.position.set(0.95, 0.35, 0); batteryGroup.add(batteryBody); batteryGroup.add(batteryCap);
          batteryGroup.position.set(0.6, 1.1, -0.9); car.add(batteryGroup); addEdges(batteryBody, 0x9cff8a, 1.2);

          const grid = new THREE.GridHelper(40, 40, 0x123744, 0x0c2a33); scene.add(grid);

          const controls = new OrbitControls(camera, renderer.domElement); controls.enableDamping = true; controls.dampingFactor = 0.05; controls.target.set(0,1.2,0);

          const raycaster = new THREE.Raycaster(); const mouse = new THREE.Vector2(); let focusedPart = null;
          const initialCamPos = camera.position.clone(); const initialTarget = controls.target.clone();
          const clickableParts = [engine, batteryGroup];

          function focusOn(part){ if(focusedPart) return; car.children.forEach(c => { if(c !== part) c.visible = false; }); grid.visible = false; gsap.to(camera.position, { duration: 1.2, x: part.position.x + 2, y: part.position.y + 1.5, z: part.position.z + 2, onUpdate: ()=> camera.lookAt(part.position) }); gsap.to(controls.target, { duration:1.2, x: part.position.x, y: part.position.y, z: part.position.z }); focusedPart = part; }
          function resetView(){ if(!focusedPart) return; car.children.forEach(c => c.visible = true); grid.visible = true; gsap.to(camera.position, { duration: 1.2, x: initialCamPos.x, y: initialCamPos.y, z: initialCamPos.z, onUpdate: ()=> camera.lookAt(initialTarget) }); gsap.to(controls.target, { duration:1.2, x: initialTarget.x, y: initialTarget.y, z: initialTarget.z }); focusedPart = null; }

          addEventListener('mousemove', e=>{ mouse.x =  (e.clientX / innerWidth)  * 2 - 1; mouse.y = -(e.clientY / innerHeight) * 2 + 1; });
          addEventListener('click', () => { raycaster.setFromCamera(mouse, camera); const hits = raycaster.intersectObjects(clickableParts, true); if(hits.length > 0 && !focusedPart){ const obj = hits[0].object; const root = (obj.name === 'battery' ? obj : obj.parent?.name === 'battery' ? obj.parent : obj); focusOn(root); if(root.name === 'battery') { parent.postMessage({ type: 'battery_click' }, '*'); } } });
          addEventListener('dblclick', resetView);

          function animate(){ requestAnimationFrame(animate); controls.update(); renderer.render(scene, camera); }
          animate(); reportReady();

          addEventListener('resize', ()=>{ camera.aspect = innerWidth/innerHeight; camera.updateProjectionMatrix(); renderer.setSize(innerWidth, innerHeight); });
        }catch(e){ reportError(e); }
      }

      // Intento 1: ESM dinámico
      try{
        const THREE_NS = await import('https://unpkg.com/three@0.160.0/build/three.module.js');
        const { OrbitControls } = await import('https://unpkg.com/three@0.160.0/examples/jsm/controls/OrbitControls.js');
        buildScene(THREE_NS, OrbitControls);
        return;
      }catch(e){ console.warn('Fallo ESM, probando UMD', e); }

      // Intento 2: UMD fallback
      function loadScript(src){ return new Promise((res, rej)=>{ const s = document.createElement('script'); s.src = src; s.onload=res; s.onerror=()=>rej(new Error('No se pudo cargar '+src)); document.head.appendChild(s); }); }
      try{
        await loadScript('https://unpkg.com/three@0.160.0/build/three.min.js');
        await loadScript('https://unpkg.com/three@0.160.0/examples/js/controls/OrbitControls.js');
        buildScene(window.THREE, window.THREE.OrbitControls);
      }catch(e){ reportError(e); }
    })();
  </script>
</body>
</html>`,
    []
  );

  useEffect(() => {
    const onMsg = (ev) => {
      if (ev?.data?.type === 'battery_click') setShowBattery(true);
      if (ev?.data?.type === 'scene_ready') { setSceneReady(true); setSceneError(null); }
      if (ev?.data?.type === 'scene_error') { setSceneReady(false); setSceneError(ev.data.message || 'Error desconocido'); }
    };
    window.addEventListener('message', onMsg);
    return () => window.removeEventListener('message', onMsg);
  }, []);

  const bottomOptions = [
    "Navegación", "Asiento", "Luces", "Ventanas", "Carga",
    "ISOFIX", "Seguridad", "Conexión", "Notificaciones",
    "Voz", "Pantalla", "Personalización"
  ];

  const autonomyKm = Math.round(systemStatus.battery * 7.5);

  return (
    <div className="flex flex-col h-full">
      <div className="h-12 sm:h-14 bg-gray-900 flex items-center justify-between px-4 sm:px-6 rounded-md">
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="text-sm sm:text-base font-bold text-white">BMW Style</span>
          <Badge className="bg-blue-600 text-xs">Dashboard</Badge>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 text-blue-400">
          <Wifi size={14} />
          <Bluetooth size={14} />
          <span className="text-xs sm:text-sm text-white">{systemStatus.battery}%</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col sm:flex-row gap-4 py-4">
        <div className="flex-1 flex items-center justify-center p-0 sm:p-2 min-h-[360px]">
          <div className="relative w-full h-[380px] sm:h-[460px] rounded-md overflow-hidden border border-slate-800">
            <iframe title="HoloTruck3D" srcDoc={sceneHTML} style={{ width: '100%', height: '100%', border: '0' }} />
            {!sceneReady && !sceneError && (
              <div className="absolute inset-0 flex items-center justify-center text-cyan-200/80 text-xs bg-black/20 pointer-events-none">Inicializando 3D…</div>
            )}
            {sceneError && (
              <div className="absolute inset-0 p-3 text-red-300 text-xs bg-red-900/20">No se pudo inicializar la escena 3D: {sceneError}</div>
            )}
          </div>
        </div>

        <div className="w-full sm:w-80 space-y-3">
          <Card className="bg-slate-900/50 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Gauge className="w-5 h-5 text-cyan-400" />
                <Badge variant="outline" className="text-cyan-400 border-cyan-400">Velocidad</Badge>
              </div>
              <div className="text-2xl font-bold text-cyan-400 mb-1">85 km/h</div>
              <Progress value={42} className="h-2" />
            </CardContent>
          </Card>
          <Card className="bg-slate-900/50 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Battery className="w-5 h-5 text-green-400" />
                <Badge variant="outline" className="text-green-400 border-green-400">Batería</Badge>
              </div>
              <div className="text-2xl font-bold text-green-400 mb-1">{systemStatus.battery}%</div>
              <Progress value={systemStatus.battery} className="h-2" />
            </CardContent>
          </Card>
          <Card className="bg-slate-900/50 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Thermometer className="w-5 h-5 text-orange-400" />
                <Badge variant="outline" className="text-orange-400 border-orange-400">Temperatura</Badge>
              </div>
              <div className="text-2xl font-bold text-orange-400 mb-1">32°C</div>
              <Progress value={64} className="h-2" />
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="h-16 sm:h-20 bg-gray-900 border-t border-gray-700 px-2 sm:px-4 py-2 rounded-md">
        <div className="flex gap-1 sm:gap-2 overflow-x-auto">
          {['Navegación','Asiento','Luces','Ventanas','Carga','ISOFIX','Seguridad','Conexión','Notificaciones','Voz','Pantalla','Personalización'].map((option, i) => (
            <div key={i} className="flex-shrink-0 flex flex-col items-center justify-center w-14 sm:w-16 h-10 sm:h-12 text-xs text-gray-300 bg-gray-800 rounded">
              <span className="text-[10px] leading-none">{option.split(' ')[0]}</span>
            </div>
          ))}
        </div>
      </div>

      <Dialog open={showBattery} onOpenChange={setShowBattery}>
        <DialogContent className="bg-slate-900 border-slate-700 text-white">
          <DialogHeader>
            <DialogTitle>Estado de Batería</DialogTitle>
            <DialogDescription>Detalle de carga, autonomía y salud</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-2">
            <Card className="bg-slate-800/50 border-slate-600">
              <CardContent className="p-4 text-center">
                <div className="text-sm text-slate-400 mb-1">Nivel</div>
                <div className="text-3xl font-bold text-green-400 mb-2">{systemStatus.battery}%</div>
                <Progress value={systemStatus.battery} className="h-2" />
              </CardContent>
            </Card>
            <Card className="bg-slate-800/50 border-slate-600">
              <CardContent className="p-4 text-center">
                <div className="text-sm text-slate-400 mb-1">Autonomía Estimada</div>
                <div className="text-3xl font-bold text-cyan-400 mb-2">{Math.round(systemStatus.battery * 7.5)} km</div>
                <div className="text-xs text-slate-500">≈ 7.5 km por % de carga</div>
              </CardContent>
            </Card>
            <Card className="bg-slate-800/50 border-slate-600">
              <CardContent className="p-4 text-center">
                <div className="text-sm text-slate-400 mb-1">Salud</div>
                <div className="text-3xl font-bold text-blue-400 mb-2">{systemStatus.health}%</div>
                <div className="text-xs text-slate-500">Ciclos: {systemStatus.cycles}</div>
              </CardContent>
            </Card>
            <Card className="bg-slate-800/50 border-slate-600">
              <CardContent className="p-4 text-center">
                <div className="text-sm text-slate-400 mb-1">Tiempo a 100%</div>
                <div className="text-3xl font-bold text-yellow-400 mb-2">{Math.max(0, 100 - systemStatus.battery)} min</div>
                <div className="text-xs text-slate-500">Carga rápida 1%/min (sim)</div>
              </CardContent>
            </Card>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DashboardPanel;
/**
 * Nexus 3D - Interactive Three.js Background & Hero Visuals
 * Creates a glowing 3D cyber grid, floating geometric crystal polyhedra,
 * and an interactive starfield particle system responding to mouse motion.
 */

class Nexus3DScene {
    constructor(canvasId = 'bg-3d-canvas') {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;

        this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
        this.windowHalfX = window.innerWidth / 2;
        this.windowHalfY = window.innerHeight / 2;
        this.shapes = [];
        this.clock = new THREE.Clock();

        this.init();
    }

    init() {
        // Scene setup
        this.scene = new THREE.Scene();
        this.scene.fog = new THREE.FogExp2(0x060913, 0.0018);

        // Camera setup
        this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 2000);
        this.camera.position.z = 800;

        // Renderer setup
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            alpha: true,
            antialias: true,
            powerPreference: "high-performance"
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Build 3D Objects
        this.createLighting();
        this.createParticleConstellation();
        this.createFloatingPolyhedra();
        this.createCyberGrid();

        // Event listeners
        window.addEventListener('resize', () => this.onWindowResize());
        window.addEventListener('mousemove', (e) => this.onMouseMove(e));
        window.addEventListener('touchmove', (e) => this.onTouchMove(e), { passive: true });

        // Start animation loop
        this.animate();
    }

    createLighting() {
        const ambientLight = new THREE.AmbientLight(0x222244, 1.2);
        this.scene.add(ambientLight);

        // Cyan point light
        this.light1 = new THREE.PointLight(0x06b6d4, 3, 1200);
        this.light1.position.set(200, 300, 400);
        this.scene.add(this.light1);

        // Indigo/Violet point light
        this.light2 = new THREE.PointLight(0x8b5cf6, 3, 1200);
        this.light2.position.set(-300, -200, 300);
        this.scene.add(this.light2);

        // Neon Pink accent light
        this.light3 = new THREE.PointLight(0xec4899, 2.5, 1000);
        this.light3.position.set(0, -400, 200);
        this.scene.add(this.light3);
    }

    createParticleConstellation() {
        const particleCount = 700;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);

        const colorPalette = [
            new THREE.Color(0x6366f1), // Indigo
            new THREE.Color(0x06b6d4), // Cyan
            new THREE.Color(0xa855f7), // Purple
            new THREE.Color(0x38bdf8)  // Sky blue
        ];

        for (let i = 0; i < particleCount; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 2200;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 1600;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 1200;

            const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
            colors[i * 3] = color.r;
            colors[i * 3 + 1] = color.g;
            colors[i * 3 + 2] = color.b;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        // Create glowing circular particle texture via canvas
        const pCanvas = document.createElement('canvas');
        pCanvas.width = 32;
        pCanvas.height = 32;
        const ctx = pCanvas.getContext('2d');
        const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
        grad.addColorStop(0, 'rgba(255,255,255,1)');
        grad.addColorStop(0.3, 'rgba(120,200,255,0.8)');
        grad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 32, 32);

        const pTexture = new THREE.CanvasTexture(pCanvas);

        const material = new THREE.PointsMaterial({
            size: 14,
            map: pTexture,
            transparent: true,
            vertexColors: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });

        this.particles = new THREE.Points(geometry, material);
        this.scene.add(this.particles);
    }

    createFloatingPolyhedra() {
        const geometries = [
            new THREE.IcosahedronGeometry(70, 0),
            new THREE.TorusKnotGeometry(45, 12, 64, 16),
            new THREE.OctahedronGeometry(60, 0),
            new THREE.DodecahedronGeometry(55, 0),
            new THREE.TetrahedronGeometry(65, 0)
        ];

        const materials = [
            new THREE.MeshStandardMaterial({
                color: 0x6366f1,
                roughness: 0.15,
                metalness: 0.85,
                wireframe: true
            }),
            new THREE.MeshStandardMaterial({
                color: 0x06b6d4,
                roughness: 0.2,
                metalness: 0.9,
                wireframe: true
            }),
            new THREE.MeshStandardMaterial({
                color: 0xa855f7,
                roughness: 0.25,
                metalness: 0.8,
                wireframe: true
            })
        ];

        // Specific positions for ambient floating backdrop
        const positions = [
            { x: -550, y: 220, z: -150, rotSpeed: 0.008, scale: 1.1 },
            { x: 580, y: 280, z: -200, rotSpeed: -0.006, scale: 1.2 },
            { x: -450, y: -260, z: -100, rotSpeed: 0.007, scale: 0.9 },
            { x: 500, y: -220, z: -180, rotSpeed: -0.009, scale: 1.0 },
            { x: 0, y: 380, z: -350, rotSpeed: 0.005, scale: 1.4 },
            { x: -180, y: -380, z: -280, rotSpeed: 0.006, scale: 0.85 }
        ];

        positions.forEach((pos, idx) => {
            const geo = geometries[idx % geometries.length];
            const mat = materials[idx % materials.length];
            const mesh = new THREE.Mesh(geo, mat);

            mesh.position.set(pos.x, pos.y, pos.z);
            mesh.scale.setScalar(pos.scale);

            // Add inner glowing sphere
            const innerGeo = new THREE.SphereGeometry(25, 16, 16);
            const innerMat = new THREE.MeshBasicMaterial({
                color: mat.color,
                wireframe: false,
                transparent: true,
                opacity: 0.25
            });
            const innerMesh = new THREE.Mesh(innerGeo, innerMat);
            mesh.add(innerMesh);

            this.scene.add(mesh);

            this.shapes.push({
                mesh: mesh,
                initialY: pos.y,
                initialX: pos.x,
                speed: pos.rotSpeed,
                floatSpeed: 0.8 + Math.random() * 0.6,
                offset: Math.random() * Math.PI * 2
            });
        });
    }

    createCyberGrid() {
        const gridHelper = new THREE.GridHelper(2600, 40, 0x3b82f6, 0x1e293b);
        gridHelper.position.y = -500;
        gridHelper.position.z = -200;
        gridHelper.material.opacity = 0.22;
        gridHelper.material.transparent = true;
        this.scene.add(gridHelper);
        this.grid = gridHelper;
    }

    onMouseMove(event) {
        this.mouse.targetX = (event.clientX - this.windowHalfX) * 0.4;
        this.mouse.targetY = (event.clientY - this.windowHalfY) * 0.4;
    }

    onTouchMove(event) {
        if (event.touches.length > 0) {
            this.mouse.targetX = (event.touches[0].clientX - this.windowHalfX) * 0.4;
            this.mouse.targetY = (event.touches[0].clientY - this.windowHalfY) * 0.4;
        }
    }

    onWindowResize() {
        this.windowHalfX = window.innerWidth / 2;
        this.windowHalfY = window.innerHeight / 2;
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        const elapsedTime = this.clock.getElapsedTime();

        // Smooth camera follow mouse
        this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.05;
        this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.05;

        this.camera.position.x = this.mouse.x * 0.4;
        this.camera.position.y = -this.mouse.y * 0.4 + 50;
        this.camera.lookAt(0, 0, 0);

        // Animate floating polyhedra
        this.shapes.forEach((item) => {
            item.mesh.rotation.x += item.speed;
            item.mesh.rotation.y += item.speed * 1.3;
            item.mesh.position.y = item.initialY + Math.sin(elapsedTime * item.floatSpeed + item.offset) * 22;
            item.mesh.position.x = item.initialX + Math.cos(elapsedTime * item.floatSpeed * 0.7 + item.offset) * 12;
        });

        // Rotate particles slowly
        if (this.particles) {
            this.particles.rotation.y = elapsedTime * 0.02;
            this.particles.rotation.x = Math.sin(elapsedTime * 0.01) * 0.05;
        }

        // Pulse point lights
        if (this.light1) {
            this.light1.position.x = Math.sin(elapsedTime * 0.8) * 400;
            this.light1.position.y = Math.cos(elapsedTime * 0.6) * 300 + 100;
        }
        if (this.light2) {
            this.light2.position.x = Math.cos(elapsedTime * 0.7) * 450;
            this.light2.position.z = Math.sin(elapsedTime * 0.5) * 300 + 200;
        }

        this.renderer.render(this.scene, this.camera);
    }
}

// Auto-initialize when window loads
window.addEventListener('DOMContentLoaded', () => {
    if (typeof THREE !== 'undefined') {
        window.nexus3d = new Nexus3DScene('bg-3d-canvas');
    }
});

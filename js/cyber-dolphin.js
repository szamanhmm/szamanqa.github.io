import * as THREE from 'three';
import { GLTFLoader } from './three/GLTFLoader.js';
import { DRACOLoader } from './three/DRACOLoader.js';

(function initCyberDolphin() {
  const canvas = document.getElementById('heroDolphinCanvas');
  const heroSection = document.querySelector('.hero');
  if (!canvas || !heroSection) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const scene = new THREE.Scene();

  const getWidth = () => heroSection.clientWidth || window.innerWidth;
  const getHeight = () => heroSection.clientHeight || 500;

  const camera = new THREE.PerspectiveCamera(38, getWidth() / getHeight(), 0.1, 100);
  camera.position.set(3.8, 1.2, 3.8);
  camera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance'
  });
  renderer.setSize(getWidth(), getHeight());
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

  // Ambient & Directional Cyber Neon Lights
  const ambientLight = new THREE.AmbientLight(0x0284c7, 1.5);
  scene.add(ambientLight);

  const cyanLight = new THREE.DirectionalLight(0x38bdf8, 3.0);
  cyanLight.position.set(5, 5, 4);
  scene.add(cyanLight);

  const neonRimLight = new THREE.DirectionalLight(0x00f5d4, 2.5);
  neonRimLight.position.set(-4, -3, -3);
  scene.add(neonRimLight);

  const dolphinGroup = new THREE.Group();
  scene.add(dolphinGroup);

  // Subtle floating cyber particles around dolphin
  const particleCount = 70;
  const particleGeo = new THREE.BufferGeometry();
  const particlePositions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount * 3; i += 3) {
    particlePositions[i] = (Math.random() - 0.5) * 6;
    particlePositions[i + 1] = (Math.random() - 0.5) * 3;
    particlePositions[i + 2] = (Math.random() - 0.5) * 4;
  }
  particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
  const particleMat = new THREE.PointsMaterial({
    color: 0x38bdf8,
    size: 0.04,
    transparent: true,
    opacity: 0.6,
    blending: THREE.AdditiveBlending
  });
  const particles = new THREE.Points(particleGeo, particleMat);
  dolphinGroup.add(particles);

  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath('draco/gltf/');

  const gltfLoader = new GLTFLoader();
  gltfLoader.setDRACOLoader(dracoLoader);

  let mixer = null;
  let isVisible = true;
  let animationId = null;
  let cyberBodyMat = null;

  function updateResponsiveScale() {
    const width = window.innerWidth;
    if (width < 768) {
      dolphinGroup.scale.set(0.20, 0.20, 0.20);
      dolphinGroup.position.set(0.12, 1.25, 0);
      camera.position.set(4.0, 1.0, 3.8);
      camera.lookAt(0, 0, 0);
    } else if (width < 1200) {
      dolphinGroup.scale.set(0.26, 0.26, 0.26);
      dolphinGroup.position.set(0.25, 1.05, 0);
      camera.position.set(3.8, 0.9, 3.5);
      camera.lookAt(0, 0, 0);
    } else {
      dolphinGroup.scale.set(0.30, 0.30, 0.30);
      dolphinGroup.position.set(0.35, 1.15, 0);
      camera.position.set(3.6, 0.9, 3.4);
      camera.lookAt(0, 0, 0);
    }
    camera.aspect = getWidth() / getHeight();
    camera.updateProjectionMatrix();
    renderer.setSize(getWidth(), getHeight());
  }

  gltfLoader.load(
    'models/dolphin_anim.glb',
    (gltf) => {
      const model = gltf.scene;

      cyberBodyMat = new THREE.MeshStandardMaterial({
        color: 0x0369a1,
        emissive: 0x0284c7,
        emissiveIntensity: 0.5,
        roughness: 0.2,
        metalness: 0.8,
        transparent: true,
        opacity: 0.75
      });

      const cyberWireMat = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        wireframe: true,
        transparent: true,
        opacity: 0.4,
        blending: THREE.AdditiveBlending
      });

      model.traverse((child) => {
        if (child.isSkinnedMesh) {
          child.material = cyberBodyMat;

          // Wireframe overlay tied to skeleton
          const wireMesh = new THREE.SkinnedMesh(child.geometry, cyberWireMat);
          wireMesh.bind(child.skeleton, child.bindMatrix);
          model.add(wireMesh);
        }
      });

      dolphinGroup.add(model);

      mixer = new THREE.AnimationMixer(model);
      if (gltf.animations && gltf.animations.length > 0) {
        const action = mixer.clipAction(gltf.animations[0]);
        action.play();
      }

      updateResponsiveScale();
      renderer.render(scene, camera);
    },
    undefined,
    (err) => {
      console.warn('Dolphin 3D fallback:', err);
    }
  );

  const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
  window.addEventListener('mousemove', (e) => {
    mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
  }, { passive: true });

  const clock = new THREE.Clock();
  clock.start();

  function animate() {
    if (!isVisible) return;
    animationId = requestAnimationFrame(animate);

    const delta = clock.getDelta();
    const elapsedTime = clock.getElapsedTime();

    if (mixer) mixer.update(delta);

    if (cyberBodyMat) {
      cyberBodyMat.emissiveIntensity = 0.4 + 0.25 * Math.sin(elapsedTime * 2.5);
    }

    particles.rotation.y = elapsedTime * 0.05;

    mouse.x += (mouse.targetX - mouse.x) * 0.05;
    mouse.y += (mouse.targetY - mouse.y) * 0.05;

    if (!prefersReducedMotion) {
      dolphinGroup.rotation.y = mouse.x * 0.35;
      dolphinGroup.rotation.x = -mouse.y * 0.2 + Math.sin(elapsedTime * 1.5) * 0.05;
      dolphinGroup.position.y += Math.sin(elapsedTime * 2.0) * 0.0006;
    }

    renderer.render(scene, camera);
  }

  animate();

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      isVisible = entry.isIntersecting;
      if (isVisible) {
        clock.start();
        animate();
      } else if (animationId) {
        cancelAnimationFrame(animationId);
      }
    });
  }, { threshold: 0.05 });
  observer.observe(heroSection);

  window.addEventListener('resize', () => {
    updateResponsiveScale();
  }, { passive: true });
})();

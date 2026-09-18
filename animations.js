/**
 * ANIMATIONS.JS
 * GSAP ScrollTrigger reveals and lightweight Three.js Hero 3D Graphic
 */

document.addEventListener('DOMContentLoaded', () => {
  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion) {
    initGSAPAnimations();
    initThreeJSScene();
  }
});

/**
 * GSAP Scroll & Reveal Animations
 */
function initGSAPAnimations() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  // Hero Section Fade In
  gsap.from('.hero-content', {
    duration: 1,
    y: 30,
    opacity: 0,
    ease: 'power2.out'
  });

  // Staggered Card Reveals
  gsap.utils.toArray('.card-grid, .category-grid, .trust-grid').forEach(grid => {
    gsap.from(grid.children, {
      scrollTrigger: {
        trigger: grid,
        start: 'top 85%'
      },
      duration: 0.6,
      y: 20,
      opacity: 0,
      stagger: 0.15,
      ease: 'power2.out'
    });
  });
}

/**
 * Lightweight, High-Performance Three.js Visual Element
 */
function initThreeJSScene() {
  const container = document.getElementById('hero-webgl-canvas');
  if (!container || typeof THREE === 'undefined') return;

  // Respect low performance / small mobile screens
  if (window.innerWidth < 768) {
    container.style.display = 'none';
    return;
  }

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
  camera.position.z = 5;

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  // Geometry: Elegant rotating medical cross structure
  const group = new THREE.Group();

  const material = new THREE.MeshStandardMaterial({
    color: 0x00a887,
    roughness: 0.3,
    metalness: 0.2
  });

  const box1 = new THREE.Mesh(new THREE.BoxGeometry(2, 0.6, 0.6), material);
  const box2 = new THREE.Mesh(new THREE.BoxGeometry(0.6, 2, 0.6), material);

  group.add(box1);
  group.add(box2);
  scene.add(group);

  // Ambient & Directional Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
  scene.add(ambientLight);

  const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
  dirLight.position.set(5, 5, 5);
  scene.add(dirLight);

  let animationFrameId;

  function animate() {
    animationFrameId = requestAnimationFrame(animate);
    group.rotation.x += 0.005;
    group.rotation.y += 0.008;
    renderer.render(scene, camera);
  }

  animate();

  // Pause rendering when offscreen (Performance Optimization)
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (!animationFrameId) animate();
      } else {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
    });
  });

  observer.observe(container);

  // Resize Listener
  window.addEventListener('resize', () => {
    if (!container.clientWidth || !container.clientHeight) return;
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });
}

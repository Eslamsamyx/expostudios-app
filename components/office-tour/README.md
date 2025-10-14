# Office Tour - 3D Interactive Experience

A professional, immersive 3D office viewer built with Next.js, React Three Fiber, and Three.js. Allows partners and visitors to explore your office space with first-person camera controls.

## Features

### 🎮 First-Person Navigation
- **WASD Keys**: Move forward, backward, left, and right
- **Mouse**: Look around in 360 degrees
- **Shift**: Sprint for faster movement
- **Pointer Lock**: Click to enter immersive mode

### 🎨 Visual Excellence
- **Advanced Lighting**: Three-point lighting setup with ambient, directional, and point lights
- **Environment Mapping**: Realistic reflections using HDR environment maps
- **Contact Shadows**: Soft, realistic shadows beneath objects
- **Fog Effects**: Atmospheric depth perception
- **Smooth Animations**: Loading screen with progress indicator

### 🖥️ Professional UI
- **Welcome Modal**: Clear instructions for first-time visitors
- **Help Panel**: Toggleable controls reference (H key)
- **Fullscreen Support**: Press F or click button (ESC to exit)
- **Top Bar**: Branding and navigation when not exploring
- **Bottom Hints**: Contextual keyboard shortcuts

### ⚡ Performance Optimizations
- **Dynamic Import**: Client-side only rendering (no SSR)
- **Adaptive Pixel Ratio**: Adjusts to device capabilities
- **High-Performance Mode**: WebGL optimizations
- **Progressive Loading**: Shows loading screen during asset fetch
- **Model Preloading**: GLB file cached for instant access

## File Structure

```
components/office-tour/
├── OfficeScene.tsx          # Main 3D canvas and scene setup
├── FirstPersonControls.tsx  # FPS-style camera controls
├── UIOverlay.tsx           # Modals, buttons, and UI elements
├── LoadingScreen.tsx       # Progress indicator during load
└── README.md              # This file

app/[locale]/office-tour/
└── page.tsx               # Next.js route (client component)

public/models/
└── office-3d.glb          # 3D office model (9.3MB)
```

## Usage

### Accessing the Tour

Navigate to: `http://localhost:3001/en/office-tour`

Or any locale: `/[locale]/office-tour` (e.g., `/fr/office-tour`, `/de/office-tour`)

### Controls Reference

| Action | Input | Description |
|--------|-------|-------------|
| Move Forward | W or ↑ | Walk forward |
| Move Backward | S or ↓ | Walk backward |
| Move Left | A or ← | Strafe left |
| Move Right | D or → | Strafe right |
| Sprint | Shift | Move faster |
| Look Around | Mouse | Rotate camera |
| Enter/Exit Lock | Click/ESC | Toggle pointer lock |
| Fullscreen | F | Toggle fullscreen mode |
| Help | H | Show/hide controls |

### Customization

#### Camera Settings (FirstPersonControls.tsx)
```tsx
moveSpeed={5}              // Base movement speed
sprintMultiplier={1.8}     // Speed multiplier when sprinting
mouseSensitivity={0.002}   // Mouse look sensitivity
```

#### Lighting (OfficeScene.tsx)
```tsx
<ambientLight intensity={0.4} />
<directionalLight position={[10, 10, 5]} intensity={1.2} />
<pointLight position={[0, 5, 0]} intensity={0.5} />
```

#### Camera Position
```tsx
camera.position.set(0, 1.6, 5); // X, Y (height), Z
// 1.6m = average eye height
```

## Technical Details

### Dependencies
- **three**: ^0.180.0 - Core 3D engine
- **@react-three/fiber**: ^9.4.0 - React renderer for Three.js
- **@react-three/drei**: ^10.7.6 - Useful helpers and abstractions
- **@react-three/postprocessing**: ^3.0.4 - Visual effects (currently disabled)

### Browser Compatibility
- Modern browsers with WebGL 2.0 support
- Chrome 90+, Firefox 88+, Safari 15+, Edge 90+
- Mobile devices supported (with touch control adaptations)

### Performance Considerations
- Model size: 9.3MB (consider Draco compression for production)
- Target: 60 FPS on mid-range hardware
- Adaptive pixel ratio for mobile devices
- Post-processing disabled for stability and performance

## Future Enhancements

### Potential Features
- [ ] Interactive hotspots (clickable areas with info)
- [ ] Minimap showing current location
- [ ] Teleport to predefined viewpoints
- [ ] Mobile touch controls (joystick + gyroscope)
- [ ] VR mode support (WebXR)
- [ ] Multi-floor navigation
- [ ] Audio ambience and footstep sounds
- [ ] Collision detection with walls
- [ ] Loading screen with office facts/statistics

### Post-Processing (When Needed)
Currently disabled for stability. To re-enable:
```tsx
<EffectComposer>
  <Bloom intensity={0.5} />
  <SSAO samples={11} radius={0.1} />
  <ToneMapping />
</EffectComposer>
```

## Troubleshooting

### Issue: Page shows 500 error
- Ensure all dependencies are installed: `npm install`
- Check that the GLB file exists at `public/models/office-3d.glb`

### Issue: Black screen
- Open browser console (F12) and check for WebGL errors
- Verify your browser supports WebGL 2.0: https://get.webgl.org/webgl2/

### Issue: Low performance
- Reduce shadow quality in OfficeScene.tsx
- Disable fog effects
- Lower the adaptive pixel ratio: `dpr={[1, 1.5]}`

### Issue: Model not loading
- Check file path: `/models/office-3d.glb` (public folder)
- Verify file integrity (9.3MB)
- Check browser network tab for 404 errors

## License

Part of ExpoStudios App - All rights reserved.

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import GIF from 'gif.js';

type AnimationType = 'pulse' | 'swing' | 'bounce' | 'slide';

interface AnimationConfig {
  name: string;
  description: string;
  duration: number;
  frames: number;
}

const animations: Record<AnimationType, AnimationConfig> = {
  pulse: { name: 'Pulse', description: 'Gentle breathing effect', duration: 4, frames: 120 },
  swing: { name: 'Swing', description: 'Pendulum swing motion', duration: 3, frames: 90 },
  bounce: { name: 'Bounce', description: 'Playful bounce', duration: 2, frames: 60 },
  slide: { name: 'Slide', description: 'Gentle slide motion', duration: 3, frames: 90 },
};

function App() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedAnimation, setSelectedAnimation] = useState<AnimationType>('pulse');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  // Get animation variants based on selected type
  const getAnimationVariants = (type: AnimationType) => {
    switch (type) {
      case 'pulse':
        return {
          scale: [1, 1.1, 1],
          opacity: [1, 0.9, 1],
        };
      case 'swing':
        return {
          rotate: [-8, 8, -8],
        };
      case 'bounce':
        return {
          y: [0, -20, 0],
          scale: [1, 1.05, 1],
        };
      case 'slide':
        return {
          x: [-10, 10, -10],
        };
    }
  };

  // IBM Logo - Just the logo, no background
  const IBMLogo = ({ animate = false }: { animate?: boolean }) => {
    return (
      <motion.div
        style={{
          width: '200px',
          height: '200px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <motion.img
          src="/ibm-logo.png"
          alt="IBM Logo"
          animate={animate ? getAnimationVariants(selectedAnimation) : {}}
          transition={{
            duration: animations[selectedAnimation].duration,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            width: '180px',
            height: 'auto',
          }}
        />
      </motion.div>
    );
  };

  const generateGIF = async () => {
    setIsGenerating(true);
    setProgress(0);

    try {
      // Load the IBM logo image
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = '/ibm-logo.png';
      
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });

      const gif = new GIF({
        workers: 2,
        quality: 10,
        width: 200,
        height: 200,
        transparent: 0x000000, // Make black transparent
        workerScript: '/gif.worker.js',
      });

      // Create canvas for rendering
      const canvas = document.createElement('canvas');
      canvas.width = 200;
      canvas.height = 200;
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        throw new Error('Could not get canvas context');
      }

      // Get animation config
      const config = animations[selectedAnimation];
      const totalFrames = config.frames;
      const frameDelay = (config.duration * 1000) / totalFrames;
      
      for (let i = 0; i < totalFrames; i++) {
        // Clear canvas
        ctx.clearRect(0, 0, 200, 200);
        
        const progress = i / totalFrames;
        const logoWidth = 180;
        const logoHeight = (img.height / img.width) * logoWidth;
        
        // Save context
        ctx.save();
        ctx.translate(100, 100);
        
        // Apply animation-specific transformations
        switch (selectedAnimation) {
          case 'pulse': {
            const scale = 1 + 0.1 * Math.sin(progress * Math.PI * 2);
            const opacity = 1 - 0.1 * Math.sin(progress * Math.PI * 2);
            ctx.scale(scale, scale);
            ctx.globalAlpha = opacity;
            break;
          }
          
          case 'swing': {
            // Pendulum swing: rotate back and forth
            const angle = 8 * Math.sin(progress * Math.PI * 2);
            const radians = (angle * Math.PI) / 180;
            ctx.rotate(radians);
            break;
          }
          
          case 'bounce': {
            const bounceY = -20 * Math.abs(Math.sin(progress * Math.PI * 2));
            ctx.translate(0, bounceY);
            const scale = 1 + 0.05 * Math.abs(Math.sin(progress * Math.PI * 2));
            ctx.scale(scale, scale);
            break;
          }
          
          case 'slide': {
            const slideX = 10 * Math.sin(progress * Math.PI * 2);
            ctx.translate(slideX, 0);
            break;
          }
        }
        
        // Draw IBM logo image
        ctx.drawImage(img, -logoWidth / 2, -logoHeight / 2, logoWidth, logoHeight);
        
        ctx.restore();
        
        // Add frame to GIF
        gif.addFrame(ctx, { copy: true, delay: frameDelay });
        
        setProgress(Math.round((i / totalFrames) * 100));
      }

      gif.on('finished', (blob: Blob) => {
        // Create download link
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `ibm-logo-${selectedAnimation}-${Date.now()}.gif`;
        link.click();
        URL.revokeObjectURL(url);
        
        setIsGenerating(false);
        setProgress(100);
      });

      gif.render();
    } catch (error) {
      console.error('Error generating GIF:', error);
      setIsGenerating(false);
      alert('Error generating GIF. Please try again.');
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px',
      maxWidth: '600px',
      margin: '0 auto',
    }}>
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          fontSize: '48px',
          fontWeight: 'bold',
          marginBottom: '16px',
          background: 'linear-gradient(135deg, #0F62FE 0%, #00ffff 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textAlign: 'center',
        }}
      >
        IBM Logo GIF
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        style={{
          fontSize: '18px',
          color: '#C6C6C6',
          marginBottom: '40px',
          textAlign: 'center',
        }}
      >
        Animated IBM logo for email signatures
      </motion.p>

      {/* Animation Selector */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        style={{
          marginBottom: '30px',
          width: '100%',
          maxWidth: '500px',
        }}
      >
        <p style={{
          fontSize: '16px',
          color: '#C6C6C6',
          marginBottom: '12px',
          textAlign: 'center',
          fontWeight: '600',
        }}>
          Choose Animation Style
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: '10px',
        }}>
          {(Object.keys(animations) as AnimationType[]).map((type) => (
            <motion.button
              key={type}
              onClick={() => setSelectedAnimation(type)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                background: selectedAnimation === type
                  ? 'linear-gradient(135deg, #0F62FE 0%, #0353e9 100%)'
                  : 'rgba(38, 38, 38, 0.7)',
                border: selectedAnimation === type
                  ? '2px solid #0F62FE'
                  : '2px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                padding: '12px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
            >
              <div style={{
                fontSize: '14px',
                fontWeight: 'bold',
                color: 'white',
                marginBottom: '4px',
              }}>
                {animations[type].name}
              </div>
              <div style={{
                fontSize: '11px',
                color: '#C6C6C6',
              }}>
                {animations[type].description}
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Preview */}
      <motion.div
        ref={previewRef}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        style={{
          background: 'rgba(38, 38, 38, 0.7)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '20px',
          padding: '40px',
          marginBottom: '40px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        }}
      >
        <IBMLogo animate={true} />
      </motion.div>

      {/* Download Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={generateGIF}
        disabled={isGenerating}
        style={{
          background: isGenerating 
            ? 'linear-gradient(135deg, #666 0%, #888 100%)'
            : 'linear-gradient(135deg, #0F62FE 0%, #0353e9 100%)',
          color: 'white',
          border: 'none',
          padding: '16px 48px',
          fontSize: '18px',
          fontWeight: 'bold',
          borderRadius: '12px',
          cursor: isGenerating ? 'not-allowed' : 'pointer',
          boxShadow: '0 4px 20px rgba(15, 98, 254, 0.4)',
          marginBottom: '20px',
          minWidth: '200px',
        }}
      >
        {isGenerating ? `Generating... ${progress}%` : '📥 Download GIF'}
      </motion.button>

      {/* Info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        style={{
          background: 'rgba(15, 98, 254, 0.1)',
          border: '1px solid rgba(15, 98, 254, 0.3)',
          borderRadius: '12px',
          padding: '20px',
          maxWidth: '400px',
          textAlign: 'center',
        }}
      >
        <p style={{ fontSize: '14px', color: '#C6C6C6', lineHeight: '1.6' }}>
          <strong style={{ color: '#0F62FE' }}>📧 Email Signature Ready</strong>
          <br />
          200×200px • Animated GIF • {animations[selectedAnimation].duration}s loop
          <br />
          Compatible with Gmail, Outlook, Apple Mail
        </p>
      </motion.div>

      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
}

export default App;

// Made with Bob

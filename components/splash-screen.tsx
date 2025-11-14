"use client";
import React, { useEffect, useRef } from 'react'
import Image from "next/image";

const SplashScreen = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const finalImageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const finalImage = finalImageRef.current;

    if (!video || !canvas || !finalImage) return;

    const ctx = canvas.getContext('2d', { 
      willReadFrequently: true,
      alpha: true 
    });
    if (!ctx) return;

    // Initially hide final image completely
    if (finalImage) {
      finalImage.style.opacity = '0';
    }

    // Set canvas size to match viewport
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let animationId: number;
    let isProcessing = false;

    const processVideoFrame = () => {
      if (!isProcessing && video.readyState >= video.HAVE_CURRENT_DATA) {
        isProcessing = true;

        try {
          // Draw video to canvas
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

          // Get pixel data
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imageData.data;

          // Process pixels for masking
          for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];

            // Calculate brightness
            const brightness = (r + g + b) / 3;

            // Dark areas (below threshold) become transparent, bright areas visible
            const threshold = 127;
            if (brightness < threshold) {
              data[i + 3] = 255; // Show final image in dark areas
            } else {
              data[i + 3] = 0;   // Hide final image in bright areas
            }
            
            // Make all pixels white for the mask
            data[i] = 255;
            data[i + 1] = 255;
            data[i + 2] = 255;
          }

          ctx.putImageData(imageData, 0, 0);

          // Apply as mask using multiple methods for cross-browser support
          const maskDataURL = canvas.toDataURL('image/png');
          
          if (finalImage) {
            // Show the image now that we have a mask
            finalImage.style.opacity = '1';
            
            // Try multiple mask properties for better browser support
            finalImage.style.maskImage = `url(${maskDataURL})`;
            finalImage.style.webkitMaskImage = `url(${maskDataURL})`;
            finalImage.style.maskSize = 'cover';
            finalImage.style.webkitMaskSize = 'cover';
            finalImage.style.maskRepeat = 'no-repeat';
            finalImage.style.webkitMaskRepeat = 'no-repeat';
            finalImage.style.maskPosition = 'center';
            finalImage.style.webkitMaskPosition = 'center';
          }
          
        } catch (error) {
          console.error('Error processing video frame:', error);
        }

        isProcessing = false;
      }
      
      animationId = requestAnimationFrame(processVideoFrame);
    };

    // Start video and begin processing
    const startVideo = async () => {
      try {
        await video.play();
        processVideoFrame();
      } catch (error) {
        console.error('Video play failed:', error);
        // Fallback: show final image completely after delay
        setTimeout(() => {
          if (finalImage) {
            finalImage.style.opacity = '1';
            finalImage.style.maskImage = 'none';
            finalImage.style.webkitMaskImage = 'none';
          }
        }, 1000);
      }
    };

    // Wait for video to be ready
    if (video.readyState >= video.HAVE_CURRENT_DATA) {
      startVideo();
    } else {
      video.addEventListener('loadeddata', startVideo, { once: true });
      video.addEventListener('canplay', startVideo, { once: true });
    }

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return (
    <section className='min-h-screen h-screen relative w-screen flex overflow-hidden bg-black'>
      {/* Hidden video element */}
      <video
        ref={videoRef}
        src="/assets/Splash.mp4"
        className="absolute opacity-0 pointer-events-none"
        muted
        loop
        playsInline
        preload="auto"
        crossOrigin="anonymous"
      />

      {/* Canvas for processing video frames (hidden) */}
      <canvas
        ref={canvasRef}
        className="absolute opacity-0 pointer-events-none"
        style={{ display: 'none' }}
      />

      {/* Initial background image - always visible */}
      <div className='absolute h-screen w-screen flex z-10'>
        <Image
          src={'/assets/Splash-Initial.svg'}
          alt={'Splash Screen'}
          width={1920}
          height={1080}
          className='w-full h-full top-0 left-0 object-cover'
          priority
          unoptimized
        />
      </div>

      {/* Final image - revealed by video mask - initially hidden */}
      <div className='absolute h-screen w-screen flex z-20'>
        <Image
          ref={finalImageRef}
          src={'/assets/Splash-Final.svg'}
          alt={'Splash Screen Final'}
          width={1920}
          height={1080}
          className='w-full h-full top-0 left-0 object-cover transition-opacity duration-300'
          priority
          unoptimized
          style={{ opacity: 0 }}
        />
      </div>
    </section>
  )
}

export default SplashScreen

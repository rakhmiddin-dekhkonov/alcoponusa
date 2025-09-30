import React, { useRef, useEffect, useState } from 'react';
// import './PanoramaViewer.css';

const PanoramaViewer = ({ src, autoRotate = true, initialYaw = 0, initialPitch = 0 }) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [rotation, setRotation] = useState({ yaw: initialYaw, pitch: initialPitch });
  const [lastMouse, setLastMouse] = useState({ x: 0, y: 0 });
  const animationRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const image = new Image();
    imageRef.current = image;

    image.crossOrigin = 'anonymous';
    image.onload = () => {
      setIsLoading(false);
      setError(null);
      resizeCanvas();
      renderPanorama();
    };

    image.onerror = () => {
      setIsLoading(false);
      setError('Failed to load 360° image');
    };

    image.src = src;

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [src]);

  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    renderPanorama();
  };

  useEffect(() => {
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  const renderPanorama = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const image = imageRef.current;

    if (!canvas || !ctx || !image || !image.complete) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const fov = 90; // Field of view in degrees
    const aspectRatio = canvas.width / canvas.height;

    // Convert rotation to radians
    const yawRad = (rotation.yaw * Math.PI) / 180;
    const pitchRad = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, (rotation.pitch * Math.PI) / 180));

    // Calculate visible portion of the panorama
    const fovRad = (fov * Math.PI) / 180;
    const halfFovH = fovRad / 2;
    const halfFovV = halfFovH / aspectRatio;

    // Map the visible area to the equirectangular image
    const imageWidth = image.width;
    const imageHeight = image.height;

    // Simple projection - this is a basic implementation
    // For a more accurate projection, you'd want to use proper sphere-to-plane mapping
    const centerX = ((yawRad + Math.PI) / (2 * Math.PI)) * imageWidth;
    const centerY = ((pitchRad + Math.PI / 2) / Math.PI) * imageHeight;

    const viewWidth = (fovRad / (2 * Math.PI)) * imageWidth;
    const viewHeight = (halfFovV * 2 / Math.PI) * imageHeight;

    const sourceX = Math.max(0, centerX - viewWidth / 2);
    const sourceY = Math.max(0, centerY - viewHeight / 2);
    const sourceWidth = Math.min(viewWidth, imageWidth - sourceX);
    const sourceHeight = Math.min(viewHeight, imageHeight - sourceY);

    // Handle wrapping for horizontal edges
    if (sourceX + sourceWidth > imageWidth) {
      // Draw left part
      const leftWidth = imageWidth - sourceX;
      ctx.drawImage(
        image,
        sourceX, sourceY, leftWidth, sourceHeight,
        0, 0, (leftWidth / sourceWidth) * canvas.width, canvas.height
      );
      
      // Draw right part (wrapped)
      const rightWidth = sourceWidth - leftWidth;
      ctx.drawImage(
        image,
        0, sourceY, rightWidth, sourceHeight,
        (leftWidth / sourceWidth) * canvas.width, 0, (rightWidth / sourceWidth) * canvas.width, canvas.height
      );
    } else {
      ctx.drawImage(
        image,
        sourceX, sourceY, sourceWidth, sourceHeight,
        0, 0, canvas.width, canvas.height
      );
    }
  };

  useEffect(() => {
    renderPanorama();
  }, [rotation]);

  // Auto rotation
  useEffect(() => {
    if (!autoRotate || isDragging) return;

    const animate = () => {
      setRotation(prev => ({
        ...prev,
        yaw: prev.yaw + 0.2
      }));
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [autoRotate, isDragging]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setLastMouse({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const deltaX = e.clientX - lastMouse.x;
    const deltaY = e.clientY - lastMouse.y;

    setRotation(prev => ({
      yaw: prev.yaw - deltaX * 0.5,
      pitch: Math.max(-90, Math.min(90, prev.pitch - deltaY * 0.5))
    }));

    setLastMouse({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    setIsDragging(true);
    setLastMouse({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchMove = (e) => {
    e.preventDefault();
    if (!isDragging || !e.touches[0]) return;

    const touch = e.touches[0];
    const deltaX = touch.clientX - lastMouse.x;
    const deltaY = touch.clientY - lastMouse.y;

    setRotation(prev => ({
      yaw: prev.yaw - deltaX * 0.5,
      pitch: Math.max(-90, Math.min(90, prev.pitch - deltaY * 0.5))
    }));

    setLastMouse({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchEnd = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  if (error) {
    return (
      <div className="panorama-error">
        <div className="error-content">
          <div className="error-icon">⚠️</div>
          <h3>Unable to load 360° view</h3>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="panorama-viewer" ref={containerRef}>
      {isLoading && (
        <div className="panorama-loading">
          <div className="loading-spinner"></div>
          <p>Loading 360° view...</p>
        </div>
      )}
      
      <canvas
        ref={canvasRef}
        className={`panorama-canvas ${isLoading ? 'hidden' : ''}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      />
      
      {!isLoading && (
        <div className="panorama-controls">
          <div className="control-hint">
            <span>🖱️ Drag to look around</span>
          </div>
          <div className="rotation-info">
            <small>Yaw: {Math.round(rotation.yaw)}° | Pitch: {Math.round(rotation.pitch)}°</small>
          </div>
        </div>
      )}
    </div>
  );
};

export default PanoramaViewer;
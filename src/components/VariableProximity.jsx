import { forwardRef, useEffect, useMemo, useRef } from 'react';
import { motion } from 'motion/react';
import './VariableProximity.css';

function useAnimationFrame(callback) {
  useEffect(() => {
    let frameId;
    const loop = () => {
      callback();
      frameId = requestAnimationFrame(loop);
    };
    frameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameId);
  }, [callback]);
}

function useMousePositionRef(containerRef) {
  const positionRef = useRef({ x: Number.POSITIVE_INFINITY, y: Number.POSITIVE_INFINITY });
  useEffect(() => {
    const updatePosition = (x, y) => {
      if (!containerRef?.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      positionRef.current = { x: x - rect.left, y: y - rect.top };
    };
    const handleMouseMove = event => updatePosition(event.clientX, event.clientY);
    const handleTouchMove = event => {
      const touch = event.touches[0];
      if (touch) updatePosition(touch.clientX, touch.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [containerRef]);
  return positionRef;
}

const VariableProximity = forwardRef(function VariableProximity({
  label,
  fromFontVariationSettings = "'wght' 560, 'opsz' 24",
  toFontVariationSettings = "'wght' 1000, 'opsz' 144",
  containerRef,
  radius = 145,
  falloff = 'gaussian',
  className = '',
  style,
  ...restProps
}, ref) {
  const letterRefs = useRef([]);
  const mousePositionRef = useMousePositionRef(containerRef);
  const lastPositionRef = useRef({ x: null, y: null });
  const parsedSettings = useMemo(() => {
    const parse = value => new Map(value.split(',').map(item => {
      const [name, amount] = item.trim().split(' ');
      return [name.replace(/['"]/g, ''), Number.parseFloat(amount)];
    }));
    const from = parse(fromFontVariationSettings);
    const to = parse(toFontVariationSettings);
    return Array.from(from.entries()).map(([axis, fromValue]) => ({ axis, fromValue, toValue: to.get(axis) ?? fromValue }));
  }, [fromFontVariationSettings, toFontVariationSettings]);

  useAnimationFrame(() => {
    if (!containerRef?.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const { x, y } = mousePositionRef.current;
    if (lastPositionRef.current.x === x && lastPositionRef.current.y === y) return;
    lastPositionRef.current = { x, y };
    letterRefs.current.forEach(letterRef => {
      if (!letterRef) return;
      const rect = letterRef.getBoundingClientRect();
      const dx = x - (rect.left + rect.width / 2 - containerRect.left);
      const dy = y - (rect.top + rect.height / 2 - containerRect.top);
      const distance = Math.sqrt(dx ** 2 + dy ** 2);
      const normalized = Math.min(Math.max(1 - distance / radius, 0), 1);
      const strength = falloff === 'exponential' ? normalized ** 2 : falloff === 'gaussian' ? Math.exp(-((distance / (radius / 2)) ** 2) / 2) : normalized;
      letterRef.style.fontVariationSettings = parsedSettings.map(({ axis, fromValue, toValue }) => `'${axis}' ${fromValue + (toValue - fromValue) * strength}`).join(', ');
      letterRef.style.transform = `scaleY(${1 + strength * 0.06}) translateY(${-strength * 2}px)`;
    });
  });

  const words = label.split(' ');
  let letterIndex = 0;
  return (
    <span ref={ref} className={`variable-proximity ${className}`} style={style} {...restProps}>
      {words.map((word, wordIndex) => (
        <span className="variable-word" key={`${word}-${wordIndex}`}>
          {word.split('').map(letter => {
            const currentIndex = letterIndex++;
            return <motion.span className="variable-letter" key={currentIndex} ref={element => { letterRefs.current[currentIndex] = element; }} aria-hidden="true">{letter}</motion.span>;
          })}
          {wordIndex < words.length - 1 && <span aria-hidden="true">&nbsp;</span>}
        </span>
      ))}
      <span className="sr-only">{label}</span>
    </span>
  );
});

export default VariableProximity;

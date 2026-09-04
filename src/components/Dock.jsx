import { Children, cloneElement, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import './Dock.css';

function DockItem({ children, className = '', onClick, mouseX, spring, distance, magnification, baseItemSize, label, disabled = false }) {
  const ref = useRef(null);
  const isHovered = useMotionValue(0);
  const mouseDistance = useTransform(mouseX, value => {
    const rect = ref.current?.getBoundingClientRect() ?? { x: 0, width: baseItemSize };
    return value - rect.x - rect.width / 2;
  });
  const targetSize = useTransform(mouseDistance, [-distance, 0, distance], [baseItemSize, magnification, baseItemSize]);
  const size = useSpring(targetSize, spring);
  return (
    <motion.button ref={ref} type="button" disabled={disabled} style={{ width: size, height: size }} onHoverStart={() => isHovered.set(1)} onHoverEnd={() => isHovered.set(0)} onFocus={() => isHovered.set(1)} onBlur={() => isHovered.set(0)} onClick={disabled ? undefined : onClick} className={`dock-item ${className}`} aria-label={label}>
      {Children.map(children, child => cloneElement(child, { isHovered }))}
    </motion.button>
  );
}

function DockLabel({ children, isHovered }) {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => isHovered.on('change', latest => setIsVisible(latest === 1)), [isHovered]);
  return <AnimatePresence>{isVisible && <motion.span initial={{ opacity: 0, y: 3 }} animate={{ opacity: 1, y: -7 }} exit={{ opacity: 0, y: 3 }} transition={{ duration: 0.16 }} className="dock-label" role="tooltip">{children}</motion.span>}</AnimatePresence>;
}

function DockIcon({ children }) { return <span className="dock-icon">{children}</span>; }

export default function Dock({ items = [], className = '', spring = { mass: 0.1, stiffness: 150, damping: 12 }, magnification = 64, distance = 150, panelHeight = 58, dockHeight = 128, baseItemSize = 44 }) {
  const mouseX = useMotionValue(Number.POSITIVE_INFINITY);
  const isHovered = useMotionValue(0);
  const maxHeight = useMemo(() => Math.max(dockHeight, magnification + magnification / 2 + 4), [dockHeight, magnification]);
  const heightRow = useTransform(isHovered, [0, 1], [panelHeight, maxHeight]);
  const height = useSpring(heightRow, spring);
  return (
    <motion.div style={{ height }} className={`dock-outer ${className}`}>
      <motion.div onMouseMove={({ pageX }) => { isHovered.set(1); mouseX.set(pageX); }} onMouseLeave={() => { isHovered.set(0); mouseX.set(Number.POSITIVE_INFINITY); }} className={`dock-panel ${className}`} style={{ height: panelHeight }} role="toolbar" aria-label="Garden navigation">
        {items.map(item => <DockItem key={item.id} {...item} mouseX={mouseX} spring={spring} distance={distance} magnification={magnification} baseItemSize={baseItemSize}><DockIcon>{item.icon}</DockIcon><DockLabel>{item.label}</DockLabel></DockItem>)}
      </motion.div>
    </motion.div>
  );
}

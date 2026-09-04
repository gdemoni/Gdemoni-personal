import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import Dock from './components/Dock.jsx';

function GardenGlyph({ type }) {
  const common = { fill: 'none', stroke: 'currentColor', strokeWidth: 2.2, strokeLinecap: 'round', strokeLinejoin: 'round' };
  if (type === 'about') return <svg viewBox="0 0 32 32"><circle {...common} cx="16" cy="10" r="5"/><path {...common} d="M7 27c1-7 5-10 9-10s8 3 9 10M10 24c4 2 8 2 12 0"/></svg>;
  if (type === 'projects') return <svg viewBox="0 0 32 32"><path {...common} d="M16 27V9M16 18c-6 0-9-3-10-8 6-1 10 2 11 7M16 14c2-6 6-9 11-8 0 6-4 10-11 11"/><path {...common} d="M9 27h14"/></svg>;
  if (type === 'skills') return <svg viewBox="0 0 32 32"><path {...common} d="M9 7l16 16M22 5l5 5-4 4-5-5zM6 24l-1 4 4-1 11-11-3-3z"/></svg>;
  if (type === 'journey') return <svg viewBox="0 0 32 32"><path {...common} d="M6 26C7 18 12 21 13 14s7-4 8-10M6 26h4M19 4h7l-3 4 3 4h-7"/></svg>;
  return <svg viewBox="0 0 32 32"><path {...common} d="M5 10h22v15H5zM5 11l11 9 11-9"/><path {...common} d="M22 10V6h5v8"/></svg>;
}

function GardenDock({ variant = 'ticket' }) {
  const [language, setLanguage] = useState(localStorage.getItem('garden-language') || 'zh');
  const [isGardenOpen, setIsGardenOpen] = useState(document.body.classList.contains('garden-open'));
  const [activePanel, setActivePanel] = useState('about');
  useEffect(() => {
    const handler = event => setLanguage(event.detail?.language || 'zh');
    window.addEventListener('garden-language-change', handler);
    return () => window.removeEventListener('garden-language-change', handler);
  }, []);
  useEffect(() => {
    const observer = new MutationObserver(() => setIsGardenOpen(document.body.classList.contains('garden-open')));
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const handler = event => setActivePanel(event.detail?.id || 'about');
    window.addEventListener('garden-panel-change', handler);
    return () => window.removeEventListener('garden-panel-change', handler);
  }, []);
  const labels = language === 'zh' ? { about: '园丁档案', projects: '项目温室', skills: '工具棚', journey: '成长小径', contact: '花园信箱' } : { about: 'About', projects: 'Projects', skills: 'Skills', journey: 'Journey', contact: 'Contact' };
  const visit = id => {
    if (!document.body.classList.contains('garden-open')) return;
    window.dispatchEvent(new CustomEvent('garden-panel-request', { detail: { id } }));
  };
  const items = useMemo(() => ['about', 'projects', 'skills', 'journey', 'contact'].map(id => ({ id, label: labels[id], icon: <GardenGlyph type={id} />, onClick: () => visit(id) })), [language]);
  const gatedItems = items.map(item => ({ ...item, className: activePanel === item.id ? 'is-active' : '', disabled: variant === 'ticket' || !isGardenOpen }));
  const className = variant === 'ticket' ? 'ticket-dock' : 'garden-screen-dock';
  const sizing = variant === 'garden'
    ? { panelHeight: 54, baseItemSize: 39, magnification: 52, distance: 110, dockHeight: 76 }
    : { panelHeight: 58, baseItemSize: 44, magnification: 62, distance: 130, dockHeight: 92 };
  return <Dock items={gatedItems} className={className} {...sizing} />;
}

const dockRoot = document.getElementById('ticket-dock-root');
const gardenDockRoot = document.getElementById('garden-dock-root');
if (dockRoot) {
  window.__ticketDockReactRoot ??= createRoot(dockRoot);
  window.__ticketDockReactRoot.render(<GardenDock variant="ticket" />);
}
if (gardenDockRoot) {
  window.__gardenDockReactRoot ??= createRoot(gardenDockRoot);
  window.__gardenDockReactRoot.render(<GardenDock variant="garden" />);
}

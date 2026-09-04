// Static paper-grain edges; animation moves the drawing, not its ink texture.
function inkTexture(id) {
  return `<defs><filter id="${id}" x="-12%" y="-12%" width="124%" height="124%" color-interpolation-filters="sRGB">
    <feTurbulence type="fractalNoise" baseFrequency=".48" numOctaves="2" seed="17" result="grain"/>
    <feDisplacementMap in="SourceGraphic" in2="grain" scale=".55" xChannelSelector="R" yChannelSelector="G"/>
  </filter></defs>`;
}

export function drawMarkerDoor() {
  const door = document.querySelector('.door-arch');
  if (!door) return;
  const arch = 'M9 233C5 226 8 211 7 192L8 131C5 109 5 82 15 60C28 29 51 10 76 7C103 3 133 11 151 33C169 52 172 76 173 104L174 178C172 200 176 220 170 235C150 239 130 235 106 237L40 237C27 235 17 240 9 233Z';
  door.insertAdjacentHTML('afterbegin', `<svg class="marker-door-art" viewBox="0 0 180 242" aria-hidden="true">
    ${inkTexture('door-marker-grain')}
    <defs><clipPath id="door-marker-cut"><path d="${arch}"/></clipPath></defs>
    <path d="${arch}" fill="#b4b4b2"/>
    <g clip-path="url(#door-marker-cut)">
      <path d="M38 245L38 114C36 92 46 68 65 57C90 40 131 38 159 53L181 70V246Z" fill="#ececeb"/>
      <g fill="none" stroke="#72726f" stroke-width="7" stroke-linecap="round" opacity=".09">
        <path d="M14 224Q9 119 17 91M23 225Q16 99 36 69M30 192Q24 86 58 48M36 105Q43 55 80 34M65 43Q105 21 132 38"/>
      </g>
    </g>
    <g class="marker-ink" filter="url(#door-marker-grain)">
      <path d="${arch}" stroke-width="4.6"/>
      <path d="M7 179Q5 206 8 229M22 45Q40 15 69 9M131 17Q162 34 169 68M40 237Q86 239 121 237" stroke-width="6.1" opacity=".9"/>
      <path d="M12 236Q41 234 62 237M171 131L173 176" stroke-width="1.5" opacity=".65"/>
      <path d="M10 226L11 240L33 239M148 30Q163 44 169 63" stroke-width="1.2" opacity=".7"/>
    </g>
  </svg>`);
  door.querySelectorAll('.door-arrow').forEach((button, i) => {
    button.innerHTML = `<svg class="marker-arrow-art" viewBox="0 0 44 44" aria-hidden="true">
      ${inkTexture(`arrow-marker-${i}`)}
      <g class="marker-ink" filter="url(#arrow-marker-${i})">
        <path d="M5 4Q18 5 38 3L39 24L38 39Q23 38 4 40L5 19L4 3" stroke-width="1.9"/>
        <path d="M4 24L4 39M29 4L39 3L39 12" stroke-width="2.8"/>
        <g transform="${i === 0 ? 'translate(44 0) scale(-1 1)' : ''}">
          <path d="M10 22Q21 20 34 22M24 12Q29 18 35 22Q28 25 23 32" stroke-width="2.2"/>
          <path d="M12 22L23 21M32 20L35 22L29 25" stroke-width="3" opacity=".8"/>
        </g>
      </g>
    </svg>`;
    button.addEventListener('click', () => {
      if (button.disabled || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const art = door.querySelector('.marker-door-art');
      art.getAnimations().filter(animation => animation.id === 'door-knock').forEach(animation => animation.cancel());
      art.animate([
        { transform: 'rotate(0deg) scaleX(1)' },
        { transform: `rotate(${i ? -2 : 2}deg) scaleX(.95)`, offset: .3 },
        { transform: 'rotate(1deg) scaleX(1.02)', offset: .65 },
        { transform: 'rotate(0deg) scaleX(1)' },
      ], { duration: 600, easing: 'ease-out', id: 'door-knock' });
    }, { capture: true });
  });
}

export function markerVisitor(index) {
  const bodyPaths = [
    'M14 62Q9 50 13 39Q17 30 27 32Q39 32 39 47L36 64Q24 61 14 62Z',
    'M13 62Q8 45 15 37Q24 29 34 35Q42 42 36 63Q23 65 13 62Z',
    'M14 63Q10 50 13 40Q18 32 27 33Q39 33 39 46L37 63Z',
  ];
  return `<svg class="marker-visitor-art" viewBox="0 0 50 100" aria-hidden="true">
    ${inkTexture(`visitor-marker-${index}`)}
    <g class="visitor-speed-lines" fill="none"><path d="M-19 44l12-1M-23 53l15 1M-15 63l8-1"/></g>
    <g class="visitor-rig" filter="url(#visitor-marker-${index})">
      <g class="visitor-leg leg-back"><path d="M29 61Q32 71 30 78"/><g class="visitor-shin"><path d="M30 78Q26 87 29 94L36 95"/></g></g>
      <g class="visitor-leg leg-front"><path d="M21 61Q18 70 21 78"/><g class="visitor-shin"><path d="M21 78Q23 87 21 94L28 95"/></g></g>
      <g class="visitor-upper">
      <g class="visitor-arm-bone arm-back"><path d="M31 38Q39 47 35 54L28 58"/></g>
      <g class="visitor-head">
        <path d="M14 17C10 10 15 4 22 4C32 2 38 11 34 19C30 28 16 26 14 17Z" class="marker-paper"/>
        <path d="M14 17Q14 25 24 25Q33 25 35 17" class="marker-pressure"/>
        <path d="M18 5Q22 2 27 5" class="marker-faint"/>
      </g>
      <g class="visitor-body">
        <path d="${bodyPaths[index]}" class="marker-paper"/>
        <path d="M13 43Q10 51 14 60M17 35Q25 30 33 35" class="marker-pressure"/>
        <path d="M35 36Q41 47 37 56" class="marker-faint"/>
      </g>
      <g class="visitor-arm-bone arm-front"><path d="M17 39Q9 48 14 55L23 57"/></g>
      </g>
    </g>
  </svg>`;
}

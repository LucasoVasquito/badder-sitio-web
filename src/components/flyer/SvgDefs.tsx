// Definiciones SVG de la maqueta, tal cual (DEFS): alambre blanco/negro, púas, warp y bitmap 1-bit.
const DEFS = `<svg width="0" height="0" style="position:absolute"><defs>
<pattern id="barbW" width="120" height="30" patternUnits="userSpaceOnUse"><g fill="none" stroke="#F2EFE6" stroke-width="2.2" stroke-linecap="round"><path d="M0 15 C20 9 40 21 60 15 S100 9 120 15"/><path d="M0 15 C20 21 40 9 60 15 S100 21 120 15"/><path d="M53 3 L67 27 M67 3 L53 27 M50 15 L70 15"/></g></pattern>
<pattern id="barbK" width="120" height="30" patternUnits="userSpaceOnUse"><g fill="none" stroke="#0A0A09" stroke-width="2.4" stroke-linecap="round"><path d="M0 15 C20 9 40 21 60 15 S100 9 120 15"/><path d="M0 15 C20 21 40 9 60 15 S100 21 120 15"/><path d="M53 3 L67 27 M67 3 L53 27 M50 15 L70 15"/></g></pattern>
<pattern id="thornH" width="46" height="24" patternUnits="userSpaceOnUse"><g fill="#F2EFE6"><rect y="9" width="46" height="5"/><polygon points="3,10 6,0 9,10"/><polygon points="13,13 16,24 19,13"/><polygon points="22,10 27,1 30,10"/><polygon points="32,13 36,22 39,13"/><polygon points="40,10 42,4 45,10"/></g></pattern>
<pattern id="thornV" width="24" height="46" patternUnits="userSpaceOnUse"><g fill="#F2EFE6"><rect x="9" width="5" height="46"/><polygon points="10,3 0,6 10,9"/><polygon points="13,13 24,16 13,19"/><polygon points="10,22 1,27 10,30"/><polygon points="13,32 22,36 13,39"/><polygon points="10,40 4,42 10,45"/></g></pattern>
<filter id="warp" x="-10%" y="-20%" width="120%" height="140%"><feTurbulence type="fractalNoise" baseFrequency="0.006 0.05" numOctaves="2" seed="4" result="t"/><feDisplacementMap id="warpMap" in="SourceGraphic" in2="t" scale="14" xChannelSelector="R" yChannelSelector="G"/></filter>
<filter id="bitmap" color-interpolation-filters="sRGB"><feColorMatrix in="SourceGraphic" type="saturate" values="0" result="g"/><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="1" seed="2" result="n"/><feColorMatrix in="n" type="saturate" values="0" result="ng"/><feComposite in="g" in2="ng" operator="arithmetic" k1="0" k2="1.1" k3="0.5" k4="-0.3" result="m"/><feComponentTransfer in="m"><feFuncR type="discrete" tableValues="0 1"/><feFuncG type="discrete" tableValues="0 1"/><feFuncB type="discrete" tableValues="0 1"/></feComponentTransfer></filter>
</defs></svg>`;

export default function SvgDefs() {
  return <div aria-hidden style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }} dangerouslySetInnerHTML={{ __html: DEFS }} />;
}

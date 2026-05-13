# AGENTS.md - TecnoWorld Landing Page

## Project Type
Vanilla HTML/CSS/JS landing page (no frameworks or dependencies)

## File Structure
```
/index.html
/css/style.css
/js/main.js
/data/products.json  (or /js/data.js)
/guia.md             (reference - user-provided requirements)
```

## Key Requirements

- **Mobile-First** design - prioritize smartphone experience
- **Live Search** - filter products in real-time as user types
- **10+ products** across categories: Laptops, Periféricos, Componentes, Suscripciones, Accesorios
- **Placeholders only** - use `https://placehold.co/` for all images
- **Code in Spanish** - all documentation and comments in Spanish

## Sections
- Navbar: sticky with hamburger menu (CSS transitions)
- Hero: placeholder background, title "Te ayudamos a construir tu emprendimiento"
- Catálogo: live search + category filters
- Nosotros: corporate narrative
- Contacto: form with native validation

## CSS Requirements
- `@keyframes` section for:
  - Fade-in/slide-up on scroll
  - Hover effects on product cards
  - Hamburger menu open/close animations

## Notes
- Zero external dependencies - build everything from scratch
- Handle "no results" state gracefully in search
- Maintain aspect ratios on placeholder images
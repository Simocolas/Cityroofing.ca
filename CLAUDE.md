# CLAUDE.md — City Roofing Website

## Critical Rules (Read First)

### Domain
Always use calgarycityroofing.com — NO www prefix
Correct: https://calgarycityroofing.com
Wrong: https://www.calgarycityroofing.com (www causes 404)
Wrong: https://calgarycityroofing.ca (.ca is not in use)
Check: next-sitemap.config.js, robots.txt,
llms.txt, layout.tsx, all Schema JSON-LD urls

### Local Dev
Port: 3001 (not 3000)
Directory: ~/city-roofing-website

### Colors — Never Change These
LoadingScreen.tsx background: #0F0F0F (hardcoded)
Navbar.tsx: transparent → #1A1A1A on scroll
Both must NEVER use cream/light colors.

### Page Structure
Every page = Dark hero + Cream content below
Cream = #F9F7F2, Dark = #1A1A1A

### Red Divider
Between dark hero and cream: standalone <div>
height 3px, background var(--color-primary)
Navbar has NO red line or border.

### Images
Use <img> not next/image for external URLs.
Logo files:
  Navbar/Footer → /images/logo-transparent.png
  LoadingScreen → /images/CityRoofing Black.png

### After Every Change
npm run build → must be 0 errors
Check: homepage, navbar on subpages, 
LoadingScreen background, sitemap domain

# Jamuna V — Portfolio Website

A single-page, responsive portfolio built with HTML5, CSS3, and vanilla JavaScript, using a dark AI/tech aesthetic with neon pink and purple accents.

## Folder structure

```
jamuna-portfolio/
│
├── index.html
├── assets/
│   ├── images/
│   │   └── profile.jpg
│   └── resume/
│       └── Jamuna_V_Resume.pdf   (add this file yourself — see below)
├── css/
│   ├── style.css
│   └── responsive.css
├── js/
│   ├── script.js
│   └── animations.js
└── README.md
```

## 1. Adding the profile photo

Your uploaded photo has already been placed at:

```
assets/images/profile.jpg
```

It's used in both the Hero and About sections. To replace it later, just overwrite that file with a new image of the same name (a square or portrait-orientation photo works best).

## 2. Adding project images (optional)

The current build uses clean CSS-based cards without screenshots, since no real project screenshots were provided. If you'd like to add them later:

1. Save images into `assets/images/` (e.g. `project-heart-disease.png`, `project-kubernetes.png`, `project-shesafe.png`).
2. Reference them inside the relevant `.project-card` in `index.html`.

Do not use unrelated stock photos as placeholders — the current design intentionally keeps the cards text-and-badge based until real screenshots exist.

## 3. Resume PDF

Your resume is included at `assets/resume/Jamuna_V_Resume.pdf`. Both **Download Resume** buttons open it in a new browser tab (use the PDF viewer's download icon to save it). To update it later, replace that file with a new PDF of the same name.

## 4. Running the website locally

You can double-click `index.html` to view the site, or use a local server:

**Option A — Python (already installed on most systems):**
```bash
cd jamuna-portfolio
python3 -m http.server 8000
```
Then open `http://localhost:8000` in your browser.

**Option B — VS Code:**
Install the "Live Server" extension, right-click `index.html`, and choose "Open with Live Server."

**Option C — Node.js:**
```bash
npx serve jamuna-portfolio
```

## 5. Testing responsiveness

Test the site at these widths using your browser's device toolbar (F12 → toggle device toolbar):

- 320px — smallest phones
- 375px — standard phones
- 768px — tablets
- 1024px — small laptops
- 1440px — desktops

Check for:
- No horizontal scrolling at any width
- The hamburger menu opens/closes and closes after tapping a link
- Hero buttons stack vertically on small screens
- Project cards remain readable and tappable
- Images stay within their containers

## 6. Checking accessibility

- Run the page through your browser's Lighthouse audit (Chrome DevTools → Lighthouse → Accessibility).
- Tab through the entire page using only the keyboard — every link, button, tab, and modal should be reachable and show a visible focus outline.
- Open a project's "View Details" modal, confirm you can close it with the **Escape** key or the close button, and that focus returns to the button you opened it from.
- Toggle "reduce motion" in your OS accessibility settings and confirm the typing animation and scroll-reveal effects stop, while all content remains visible.
- Use a screen reader (VoiceOver, NVDA, or ChromeVox) to confirm headings, form labels, and alt text are announced sensibly.

## 7. Uploading to GitHub

```bash
cd jamuna-portfolio
git init
git add .
git commit -m "Initial portfolio website"
git branch -M main
git remote add origin https://github.com/vjamuna200601-wq/jamuna-portfolio.git
git push -u origin main
```
(Create the empty `jamuna-portfolio` repository on GitHub first if it doesn't exist yet.)

## 8. Deploying with GitHub Pages

1. Push the project to GitHub (see above).
2. On GitHub, open the repository → **Settings** → **Pages**.
3. Under "Build and deployment," set **Source** to `Deploy from a branch`.
4. Choose the `main` branch and the `/ (root)` folder, then save.
5. Wait a minute or two, then visit the URL GitHub provides (usually `https://vjamuna200601-wq.github.io/jamuna-portfolio/`).
6. Any future `git push` to `main` will automatically update the live site.

## Final testing checklist

- [ ] All nav links scroll to the correct section
- [ ] Mobile hamburger menu opens, closes, and auto-closes after a link tap
- [ ] Typing animation cycles through all four phrases and respects reduced motion
- [ ] Skills tabs switch panels and are operable with arrow keys
- [ ] Project "View Details" modals open, trap focus, and close via button/Escape/overlay click
- [ ] GitHub buttons open the correct repositories in a new tab
- [ ] All four projects' GitHub buttons open the right repositories
- [ ] Contact form shows validation errors for empty fields and invalid email
- [ ] Contact form shows a clear "frontend prototype" success message on valid submission
- [ ] Both Download Resume buttons open the resume PDF
- [ ] Back-to-top button appears after scrolling and returns smoothly to the top
- [ ] No horizontal scrolling at 320px–1440px widths
- [ ] No console errors in browser DevTools
- [ ] Sufficient color contrast and visible focus outlines throughout

# 🎨 Dynamic UI Editor for Customizable Designs

**Live Demo:** [https://dynamic-ui-phi.vercel.app/](https://dynamic-ui-phi.vercel.app/) 

---

## 📘 Overview
This project is a **Dynamic UI Editor** built with **React + TypeScript + TailwindCSS** that allows users to visually customize a predesigned UI component in real time.  
Users can tweak typography, button styles, gallery layout, and overall design appearance — all reflected instantly in a live preview.

---

## ⚡ Features

### ✴ Typography
- Change font family (Inter, Poppins, Roboto, etc.)
- Adjust font size (10–60px)
- Change font weight (400–700)

### ✴ Button
- Set border radius
- Choose shadow size (none, sm, md, lg)
- Align left, center, or right
- Choose background & text colors

### ✴ Gallery
- Adjust alignment (left, center, right)
- Set image spacing & radius
- Upload images dynamically

### ✴ Layout
- Customize card corner radius
- Adjust container padding
- Pick section background
- Configure stroke color & width

### ✴ Layout Variants
- Toggle between **Layout A** (stacked view) and **Layout B** (side-by-side view)

### ✴ Extra
- JSON Import/Export for configuration
- Responsive across mobile, tablet, and desktop
- Works in both **light and dark mode**

---

## 🏗️ Tech Stack
- **React + TypeScript + Vite**
- **TailwindCSS** for styling
- **Zustand** for global state management
- **Zod** for schema validation
- **Vercel** for deployment

---

## 🧠 Architecture
src/
  components/design/
    DesignPreview.tsx        → Main preview component
    layouts/                  → Layout A and Layout B
    primitives/               → Reusable UI elements (Button, Card, Gallery, etc.)
  editor/
    EditorPanel.tsx           → Complete editor control panel UI
    controls/                 → Sub-controls (Sliders, Selects, Color Pickers, Radio Groups)
  store/
    useConfigStore.ts         → Zustand store for global state management
  config/
    schema.ts, defaults.ts    → Zod schema validation and default configuration
  pages/
    Demo.tsx                  → Main page combining the editor and live preview

    ---
    
## 🚀 Run the Project Locally
# 1. Clone the repository
git clone https://github.com/aastha-0711/Responsive-UI.git

# 2. Navigate into the project folder
cd Responsive-UI

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev


Then open http://localhost:5173
 in your browser. ✅

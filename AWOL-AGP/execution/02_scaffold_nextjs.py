#!/usr/bin/env python3
"""
Workflow 02: Next.js 15 Application Scaffolding Script
Initializes package.json, TypeScript config, Tailwind CSS, and Next.js App Router structure.
"""

import json
import os
import subprocess
import sys

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def setup_package_json():
    pkg_path = os.path.join(BASE_DIR, "package.json")
    if os.path.exists(pkg_path):
        print("[+] package.json already exists.")
        return

    package_data = {
        "name": "awol-online",
        "version": "0.1.0",
        "private": True,
        "scripts": {
            "dev": "next dev",
            "build": "next build",
            "start": "next start",
            "lint": "next lint"
        },
        "dependencies": {
            "next": "^15.1.0",
            "react": "^19.0.0",
            "react-dom": "^19.0.0",
            "lucide-react": "^0.468.0",
            "clsx": "^2.1.1",
            "tailwind-merge": "^2.5.5"
        },
        "devDependencies": {
            "@types/node": "^22.0.0",
            "@types/react": "^19.0.0",
            "@types/react-dom": "^19.0.0",
            "autoprefixer": "^10.4.20",
            "postcss": "^8.4.49",
            "tailwindcss": "^3.4.16",
            "typescript": "^5.7.2"
        }
    }

    with open(pkg_path, "w") as f:
        json.dump(package_data, f, indent=2)
    print("[+] Created package.json")

def setup_configs():
    # tsconfig.json
    tsconfig_path = os.path.join(BASE_DIR, "tsconfig.json")
    if not os.path.exists(tsconfig_path):
        tsconfig = {
            "compilerOptions": {
                "target": "ES2017",
                "lib": ["dom", "dom.iterable", "esnext"],
                "allowJs": True,
                "skipLibCheck": True,
                "strict": True,
                "noEmit": True,
                "esModuleInterop": True,
                "module": "esnext",
                "moduleResolution": "bundler",
                "resolveJsonModule": True,
                "isolatedModules": True,
                "jsx": "preserve",
                "incremental": True,
                "plugins": [{"name": "next"}],
                "paths": {
                    "@/*": ["./src/*"]
                }
            },
            "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
            "exclude": ["node_modules"]
        }
        with open(tsconfig_path, "w") as f:
            json.dump(tsconfig, f, indent=2)
        print("[+] Created tsconfig.json")

    # next.config.ts
    next_cfg = os.path.join(BASE_DIR, "next.config.ts")
    if not os.path.exists(next_cfg):
        with open(next_cfg, "w") as f:
            f.write('import type { NextConfig } from "next";\n\nconst nextConfig: NextConfig = {\n  reactStrictMode: true,\n};\n\nexport default nextConfig;\n')
        print("[+] Created next.config.ts")

    # postcss.config.mjs
    postcss_cfg = os.path.join(BASE_DIR, "postcss.config.mjs")
    if not os.path.exists(postcss_cfg):
        with open(postcss_cfg, "w") as f:
            f.write('/** @type {import("postcss-load-config").Config} */\nconst config = {\n  plugins: {\n    tailwindcss: {},\n    autoprefixer: {},\n  },\n};\nexport default config;\n')
        print("[+] Created postcss.config.mjs")

    # tailwind.config.ts
    tailwind_cfg = os.path.join(BASE_DIR, "tailwind.config.ts")
    if not os.path.exists(tailwind_cfg):
        with open(tailwind_cfg, "w") as f:
            f.write('''import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        mono: ["Courier New", "Courier", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
''')
        print("[+] Created tailwind.config.ts")

def setup_app_structure():
    app_dir = os.path.join(BASE_DIR, "src", "app")
    components_dir = os.path.join(BASE_DIR, "src", "components")
    lib_dir = os.path.join(BASE_DIR, "src", "lib")
    os.makedirs(app_dir, exist_ok=True)
    os.makedirs(components_dir, exist_ok=True)
    os.makedirs(lib_dir, exist_ok=True)

    # globals.css
    css_path = os.path.join(app_dir, "globals.css")
    if not os.path.exists(css_path):
        with open(css_path, "w") as f:
            f.write('''@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --background: #0a0e14;
  --foreground: #e6edf3;
}

body {
  color: var(--foreground);
  background: var(--background);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
}
''')
        print("[+] Created src/app/globals.css")

    # layout.tsx
    layout_path = os.path.join(app_dir, "layout.tsx")
    if not os.path.exists(layout_path):
        with open(layout_path, "w") as f:
            f.write('''import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AgentWorkforce.online | Autonomous AI Workforce Platform",
  description: "Experience autonomous AI workforce operations in real-time. High-impact enterprise dispatch & AI automation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-[#07090e] text-slate-100">
        {children}
      </body>
    </html>
  );
}
''')
        print("[+] Created src/app/layout.tsx")

    # page.tsx placeholder
    page_path = os.path.join(app_dir, "page.tsx")
    if not os.path.exists(page_path):
        with open(page_path, "w") as f:
            f.write('''export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
      <h1 className="text-3xl font-bold tracking-tight text-white mb-2">AgentWorkforce.online</h1>
      <p className="text-slate-400">Autonomous AI Workforce Demonstration Platform</p>
    </main>
  );
}
''')
        print("[+] Created src/app/page.tsx")

def run_npm_install():
    print("[*] Installing npm dependencies with workspace cache...")
    cache_dir = os.path.join(BASE_DIR, ".tmp", ".npm-cache")
    os.makedirs(cache_dir, exist_ok=True)
    res = subprocess.run(
        ["npm", "install", "--legacy-peer-deps", "--cache", cache_dir],
        cwd=BASE_DIR,
        capture_output=True,
        text=True
    )
    if res.returncode != 0:
        print(f"[!] npm install error:\n{res.stderr}", file=sys.stderr)
        sys.exit(res.returncode)
    print("[+] npm install completed successfully.")

def verify_build():
    print("[*] Verifying Next.js compilation...")
    res = subprocess.run(["npm", "run", "build"], cwd=BASE_DIR, capture_output=True, text=True)
    if res.returncode != 0:
        print(f"[!] Next.js build failed:\n{res.stderr}\n{res.stdout}", file=sys.stderr)
        sys.exit(res.returncode)
    print("[+] Next.js build verification PASSED!")

def main():
    print("=== Workflow 02: Next.js 15 Scaffolding ===")
    setup_package_json()
    setup_configs()
    setup_app_structure()
    run_npm_install()
    verify_build()
    print("=== Workflow 02 SUCCESS ===")

if __name__ == "__main__":
    main()

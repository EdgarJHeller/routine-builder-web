import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import {VitePWA} from 'vite-plugin-pwa'

export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            registerType: 'autoUpdate',
            includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'routine-editor-logo-svg.svg'],
            manifest: {
                name: 'Routine Editor',
                short_name: 'RoutineEditor',
                description: 'Minimalistischer Routine Timer',
                theme_color: '#0f172a',
                background_color: '#0f172a',
                display: 'standalone',
                icons: [
                    {
                        src: 'routine-editor-logo-svg.svg',
                        sizes: 'any',
                        type: 'image/svg+xml',
                        purpose: 'any maskable'
                    },
                    {
                        src: 'android-chrome-192x192.png',
                        sizes: '192x192',
                        type: 'image/png',
                        purpose: 'any'
                    },
                    {
                        src: 'android-chrome-512x512.png',
                        sizes: '512x512',
                        type: 'image/png',
                        purpose: 'any maskable'
                    }
                ]
            }
        })
    ],
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: './src/test/setup.js',
        coverage: {
            provider: 'v8',
            reporter: ['text', 'html', 'lcov'],  // add lcov
            include: ['src/**/*.{js,jsx}'],
            exclude: [
                'node_modules/',
                'src/test/',
                '*.config.js',
                'src/main.jsx',
            ]
        }
    },
})
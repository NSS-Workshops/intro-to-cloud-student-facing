import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync, mkdirSync, readdirSync, statSync, readFileSync } from 'fs'
import { join } from 'path'

// Custom plugin to handle chapter assets for both dev and build
function copyChapterAssets() {
  // Cache for asset mappings
  const assetMap = new Map()
  
  // Function to scan and map all chapter assets
  function scanChapterAssets() {
    const chaptersDir = 'src/chapters'
    assetMap.clear()
    
    function scanAssetsFromDir(dir) {
      try {
        const items = readdirSync(dir)
        
        for (const item of items) {
          const fullPath = join(dir, item)
          const stat = statSync(fullPath)
          
          if (stat.isDirectory()) {
            if (item === 'assets') {
              // Found an assets directory, map all files
              const assetFiles = readdirSync(fullPath)
              for (const assetFile of assetFiles) {
                const srcPath = join(fullPath, assetFile)
                assetMap.set(`/assets/${assetFile}`, srcPath)
              }
            } else {
              // Recurse into subdirectories
              scanAssetsFromDir(fullPath)
            }
          }
        }
      } catch (error) {
        console.warn(`Warning: Could not process directory ${dir}:`, error.message)
      }
    }
    
    scanAssetsFromDir(chaptersDir)
  }
  
  return {
    name: 'copy-chapter-assets',
    
    // Handle development server
    configureServer(server) {
      // Scan assets on startup
      scanChapterAssets()
      
      // Add middleware to serve chapter assets during development
      // Handle both /assets and /intro-to-cloud-student-facing/assets paths
      server.middlewares.use((req, res, next) => {
        let assetUrl = req.url
        
        // Handle base path
        if (assetUrl.startsWith('/intro-to-cloud-student-facing/assets/')) {
          assetUrl = assetUrl.replace('/intro-to-cloud-student-facing', '')
        }
        
        if (assetUrl.startsWith('/assets/')) {
          const assetPath = assetMap.get(assetUrl)
          if (assetPath) {
            try {
              const content = readFileSync(assetPath)
              const ext = assetPath.split('.').pop().toLowerCase()
              
              // Set appropriate content type
              const contentTypes = {
                'png': 'image/png',
                'jpg': 'image/jpeg',
                'jpeg': 'image/jpeg',
                'gif': 'image/gif',
                'svg': 'image/svg+xml',
                'webp': 'image/webp'
              }
              
              res.setHeader('Content-Type', contentTypes[ext] || 'application/octet-stream')
              res.setHeader('Cache-Control', 'public, max-age=31536000')
              res.end(content)
              return
            } catch (error) {
              console.warn(`Warning: Could not serve asset ${assetPath}:`, error.message)
            }
          }
        }
        next()
      })
    },
    
    // Handle build
    generateBundle() {
      const chaptersDir = 'src/chapters'
      const outputDir = 'dist/assets'
      
      // Ensure output directory exists
      mkdirSync(outputDir, { recursive: true })
      
      // Function to recursively find and copy assets
      function copyAssetsFromDir(dir) {
        try {
          const items = readdirSync(dir)
          
          for (const item of items) {
            const fullPath = join(dir, item)
            const stat = statSync(fullPath)
            
            if (stat.isDirectory()) {
              if (item === 'assets') {
                // Found an assets directory, copy all files
                const assetFiles = readdirSync(fullPath)
                for (const assetFile of assetFiles) {
                  const srcPath = join(fullPath, assetFile)
                  const destPath = join(outputDir, assetFile)
                  copyFileSync(srcPath, destPath)
                  console.log(`Copied chapter asset: ${srcPath} → ${destPath}`)
                }
              } else {
                // Recurse into subdirectories
                copyAssetsFromDir(fullPath)
              }
            }
          }
        } catch (error) {
          console.warn(`Warning: Could not process directory ${dir}:`, error.message)
        }
      }
      
      copyAssetsFromDir(chaptersDir)
    }
  }
}

export default defineConfig(({ mode }) => {
  // Load env variables based on mode for server access
  // Using empty string as prefix to load all env vars, including those without VITE_ prefix
  const env = loadEnv(mode, process.cwd(), '');

  console.log('OAuth env variables loaded:', {
    lmsDomain: env.VITE_LEARNING_PLATFORM_API ? 'Present' : 'Missing',
  });

  return {
    base: '/intro-to-cloud-student-facing/',
    plugins: [
      react({
        jsxImportSource: '@emotion/react',
        babel: {
          plugins: ['@emotion/babel-plugin']
        }
      }),
      copyChapterAssets() // Add the custom plugin
    ],
    // Make env variables available to client-side code
    define: {
      'process.env.VITE_OAUTH_CLIENT_ID': JSON.stringify(env.VITE_OAUTH_CLIENT_ID),
      'process.env.VITE_PROXY_DOMAIN': JSON.stringify(env.VITE_PROXY_DOMAIN),
      'process.env.VITE_LEARNING_PLATFORM_API': JSON.stringify(env.VITE_LEARNING_PLATFORM_API),
    },
    // Environment Variables:
    // Vite automatically loads env files in the following order:
    // 1. .env                # loaded in all cases
    // 2. .env.local         # loaded in all cases, ignored by git
    // 3. .env.[mode]        # only loaded in specified mode
    // 4. .env.[mode].local  # only loaded in specified mode, ignored by git
    //
    // Only variables prefixed with VITE_ are exposed to your code
    // via import.meta.env.VITE_*
    //
    // Example:
    // VITE_OAUTH_CLIENT_ID in .env.local becomes available as
    // import.meta.env.VITE_OAUTH_CLIENT_ID in your code
  }
})

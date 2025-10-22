import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import { normalizePath } from 'vite'
import { dirname } from 'path'
import { glob } from 'glob'
import { fileURLToPath } from 'url'
import { viteStaticCopy } from 'vite-plugin-static-copy'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig(({ mode }) => {
  // Load env variables based on mode for server access
  // Using empty string as prefix to load all env vars, including those without VITE_ prefix
  const env = loadEnv(mode, process.cwd(), '');

  // Read config.js to get courseName and doAuth
  let courseName = 'Introduction to the Cloud'; // fallback
  
  let baseUrl = env.BASE_URL ? env.BASE_URL : 'intro-to-cloud-student-facing';
  console.log("baseUrl: ",baseUrl);

  let doAuth = false; // fallback
  try {
    const configPath = path.resolve(process.cwd(), 'src/config.js');
    const configContent = fs.readFileSync(configPath, 'utf-8');

    const courseNameMatch = configContent.match(/courseName:\s*["']([^"']+)["']/);
    if (courseNameMatch) {
      courseName = courseNameMatch[1];
      // Transform courseName to URL-friendly format

    }

    const doAuthMatch = configContent.match(/doAuth:\s*(true|false)/);
    if (doAuthMatch) {
      doAuth = doAuthMatch[1] === 'true';
    }
  } catch (error) {
    console.warn('Could not read config.js, using fallback values');
  }

  console.log('OAuth env variables loaded:', {
    lmsDomain: env.VITE_LEARNING_PLATFORM_API ? 'Present' : 'Missing',
  });

    // Custom plugin to replace placeholders in HTML
  const htmlReplacementPlugin = {
    name: 'html-replacement',
    transformIndexHtml(html) {
      return html
        .replace(/%COURSE_NAME%/g, courseName)
        .replace(/%COURSE_URL%/g, baseUrl);
    }
  };

  // Check if any image files exist before adding the static copy plugin
  const imagePattern = path.resolve(__dirname, 'src/sections/**/*.{png,jpg,jpeg,svg,gif,webp,avif}');
  const imageFiles = glob.sync(normalizePath(imagePattern));
  const hasImages = imageFiles.length > 0;

  const plugins = [
    react({
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin'],
        exclude: [/node_modules/, /dist/, /deps/],   // don’t transpile built files
        compact: true
      }
    }),
    htmlReplacementPlugin
  ];
    

    // Only add static copy plugin if images exist
  if (hasImages) {
    plugins.push(
      viteStaticCopy({
        targets: [
          {
            // copy all images from each chapter folder
            src: normalizePath(imagePattern),
            dest: 'assets',
            flatten: false
          }
        ]
      })
    );
  }

  return {
    base: `/${baseUrl}/`,
    plugins,
    // Make env variables available to client-side code
    ...(doAuth && {
      define: {
        'process.env.VITE_OAUTH_CLIENT_ID': JSON.stringify(env.VITE_OAUTH_CLIENT_ID),
        'process.env.VITE_PROXY_DOMAIN': JSON.stringify(env.VITE_PROXY_DOMAIN),
        'process.env.VITE_LEARNING_PLATFORM_API': JSON.stringify(env.VITE_LEARNING_PLATFORM_API),
      },
    }),
  }
})

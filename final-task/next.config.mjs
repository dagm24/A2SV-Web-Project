/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Handle Node.js polyfills for client-side
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
        stream: false,
        url: false,
        zlib: false,
        http: false,
        https: false,
        assert: false,
        os: false,
        path: false,
        util: false,
        events: false,
        buffer: false,
        process: false,
        querystring: false,
        punycode: false,
        domain: false,
        dns: false,
        child_process: false,
        cluster: false,
        module: false,
        vm: false,
        constants: false,
        perf_hooks: false,
        readline: false,
        repl: false,
        string_decoder: false,
        sys: false,
        timers: false,
        tty: false,
        v8: false,
        worker_threads: false,
      };
    }

    // Handle node: protocol imports
    config.resolve.alias = {
      ...config.resolve.alias,
      "node:util": "util",
      "node:events": "events",
      "node:fs": false,
      "node:path": false,
      "node:os": false,
      "node:crypto": false,
      "node:stream": false,
      "node:buffer": false,
      "node:process": false,
    };

    return config;
  },
};

export default nextConfig;

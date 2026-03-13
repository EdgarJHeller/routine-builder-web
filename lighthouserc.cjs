module.exports = {
    ci: {
        collect: {
            staticDistDir: './dist',
            numberOfRuns: 3,
        },
        assert: {
            assertions: {
                'categories:performance':          ['warn', { minScore: 0.9 }],
                'categories:best-practices':       ['warn', { minScore: 0.9 }],
                'categories:accessibility':        ['warn', { minScore: 0.9 }],
                'categories:pwa':                  ['warn', { minScore: 0.8 }],
                'unused-javascript':               'off',
                'network-dependency-tree-insight': 'off',
                'render-blocking-resources':       'warn',
                'render-blocking-insight':         'warn',
            }
        },
        upload: {
            target: 'temporary-public-storage',
        },
    },
};
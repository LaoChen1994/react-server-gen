function MyPackagePlugin() {}

MyPackagePlugin.prototype.apply = function (compiler) {
  // compiler.hooks.entryOption.tap('entry', (ctx, entry) => {
  //   console.log('entry -> ', entry);
  // });

  compiler.hooks.beforeRun.tap('before run', (_compiler) => {
    _compiler.hooks.compilation.tap('before run compilation', (complation) => {
      complation.hooks.buildModule.tap('before run build module', (module) => {
        if ((module.resource || '').indexOf('node_modules') !== -1) {
          console.log('before run build module', module);
        }
      });
    });
  });

  compiler.hooks.afterCompile.tap('after compiler', (_compiler) => {
    _compiler.hooks.compilation.tap('after compiler', (complation) => {
      // complation.hooks.succeedModule.tap('build success module', (module) => {
      //   if ((module.resource || '').indexOf('node_modules') !== -1) {
      //     console.log('build success module', module);
      //   }
      // });
    });
  });

  // compiler.hooks.compilation.tap('myHooks', (compilation) => {
  //   compilation.hooks.afterOptimizeModules.tap('modules', (modules) => {
  //     modules.forEach((item) => console.log(item.resource));
  //   });

  //   compilation.hooks.optimizeChunkIds.tap('chunkIds', (chunks) => {
  //     // const module = modules.find(item => item.resource === '/Users/pidan/Learn/react-server-gen/client/pages/test/app.tsx')
  //     // console.log(module)
  //     // console.log(module.loc)
  //     console.log('chunk ids ->', chunks);
  //   });

  //   compilation.hooks.afterOptimizeChunkIds.tap('successModules', (chunks) => {
  //     // const module = modules.find(item => item.resource === '/Users/pidan/Learn/react-server-gen/client/pages/test/app.tsx')
  //     // console.log(module)
  //     // console.log(module.loc)
  //     console.log('after ids ->', chunks);
  //   });
  // });
};

module.exports = MyPackagePlugin;

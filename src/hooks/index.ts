const reduxDevtoolsExtension = (window as any).__REDUX_DEVTOOLS_EXTENSION__;
const withDevTools = typeof window !== 'undefined' && reduxDevtoolsExtension;

export const devtools: any = withDevTools
  ? reduxDevtoolsExtension.connect({
      name: 'babel-plugin-hooks-devtools',
      trace: true,
    })
  : undefined;

devtools?.init();

export const useWhatChanged = (
  dependencyValue: any,
  dependencyNames: string,
  pathsString: string,
  hookName: string
) => {
  const paths = pathsString.split(',');
  const dependencies: any = {};
  dependencyNames.split(',').forEach((dependencyName, index) => {
    dependencies[dependencyName] = dependencyValue?.[index];
  });

  const actionName = `${hookName}(${dependencyNames}) in ${
    paths[paths.length - 1]
  }`;

  devtools?.send(actionName, {
    dependencies,
    paths: paths.join('/'),
    hookName,
  });
};

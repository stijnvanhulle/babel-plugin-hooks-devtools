import { isObject } from 'lodash';
import type * as BabelCoreNamespace from '@babel/core';
import type { PluginObj, PluginPass } from '@babel/core';

import { transformCode, buildRequire } from './utils';
import { NodePath } from '@babel/traverse';

type Babel = typeof BabelCoreNamespace;

type State = PluginPass & {
  lineNoWhereCallNeedToBeAdded: Record<string, any>;
  lowerlimituwcdebug: number;
  isDoneAddingImport: boolean;
  opts: {
    active: boolean;
  };
};
type Path = NodePath<any> & {
  container: any;
};

// process.env.BABEL_DISABLE_CACHE = '1';

const commentTracker = {
  debug: 'debug',
  debugBelow: 'debug-below',
};

const SetToSupport = ['useEffect', 'useCallback', 'useMemo', 'useLayoutEffect'];

const identifierFactory = (_babel: Babel) => (path: Path, state: State) => {
  const options = state.opts;

  if (!options.active || SetToSupport.indexOf(path.node.name) === -1) {
    return;
  }

  if (
    state.lowerlimituwcdebug !== undefined &&
    parseInt(path?.node?.loc?.start?.line, 10) > state.lowerlimituwcdebug
  ) {
    const lineToInsert = parseInt(path.node.loc.start.line, 10) - 1;
    transformCode({
      lineNo: lineToInsert,
      path,
      state,
    });
    if (!state.lineNoWhereCallNeedToBeAdded) {
      state.lineNoWhereCallNeedToBeAdded = {};
    }
    if (!state.lineNoWhereCallNeedToBeAdded[lineToInsert]) {
      state.lineNoWhereCallNeedToBeAdded = {
        [lineToInsert]: {
          done: false,
        },
      };
    }

    state.lineNoWhereCallNeedToBeAdded[lineToInsert].done = true;
  }
  if (isObject(state.lineNoWhereCallNeedToBeAdded)) {
    Object.keys(state.lineNoWhereCallNeedToBeAdded).forEach((lineNo) => {
      if (!state.lineNoWhereCallNeedToBeAdded[lineNo].done) {
        if (
          parseInt(path?.node?.loc?.start?.line, 10) ===
          parseInt(lineNo) + 1
        ) {
          transformCode({ lineNo, state, path });
        }
      }
    });
  }
};

const programOnEnterFactory = (babel: Babel) => (path: Path, state: State) => {
  const { types } = babel;
  const options = state.opts;

  let uwcDebugBelowEncountered = false;
  if (!options.active) {
    return;
  }

  try {
    path.container.comments.forEach((commentObj: any) => {
      if (commentObj.value.trim() === commentTracker.debug) {
        if (!state.isDoneAddingImport) {
          const ast = buildRequire({
            IMPORT_NAME: types.identifier('__useWhatChangedImport') as any,
            SOURCE: types.stringLiteral(
              '@stijnvanhulle/babel-plugin-hooks-devtools/hooks'
            ) as any,
          });
          try {
            path.unshiftContainer('body', ast as any);
          } catch (e) {
            console.error(
              '@stijnvanhulle/babel-plugin-hooks-devtools error adding import',
              e
            );
          }

          state.isDoneAddingImport = true;
        }

        if (
          isObject(state) &&
          isObject((state as any).lineNoWhereCallNeedToBeAdded)
        ) {
          (state as any).lineNoWhereCallNeedToBeAdded = Object.assign(
            {},
            (state as any).lineNoWhereCallNeedToBeAdded,
            {
              [commentObj.loc.start.line]: {
                done: false,
              },
            }
          );
        } else {
          state.lineNoWhereCallNeedToBeAdded = {
            [commentObj.loc.start.line]: {
              done: false,
            },
          };
        }
      }

      if (
        commentObj.value.trim() === commentTracker.debugBelow &&
        !uwcDebugBelowEncountered
      ) {
        if (!state.isDoneAddingImport) {
          const ast = buildRequire({
            IMPORT_NAME: types.identifier('__useWhatChangedImport') as any,
            SOURCE: types.stringLiteral(
              '@stijnvanhulle/babel-plugin-hooks-devtools/hooks'
            ) as any,
          });
          try {
            path.unshiftContainer('body', ast as any);
          } catch (e) {
            console.error(
              '@stijnvanhulle/babel-plugin-hooks-devtools error adding import',
              e
            );
          }

          state.isDoneAddingImport = true;
        }

        state.lowerlimituwcdebug = commentObj.loc.start.line;
        uwcDebugBelowEncountered = true;
      }
    });
  } catch (e) {
    console.error('@stijnvanhulle/babel-plugin-hooks-devtools error', e);
  }
};

export default (babel: Babel): PluginObj => {
  return {
    visitor: {
      Identifier: identifierFactory(babel) as any,
      Program: {
        exit: () => {},
        enter: programOnEnterFactory(babel) as any,
      },
    },
  };
};

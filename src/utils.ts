import generate from '@babel/generator';
import template from 'babel-template';
import nodePath from 'path';
import * as babelParser from '@babel/parser';

export const transformCode = ({
  lineNo,
  state,
  path,
}: {
  lineNo: string | number;
  state: any;
  path: any;
}) => {
  const parentMemberCallExpression = path.findParent((path: any) =>
    path.isCallExpression()
  );

  if (!parentMemberCallExpression) {
    // return is the it is not a call expression
    return;
  }
  const bodyPath = path.findParent(
    (path: any) => path.parent.type === 'BlockStatement'
  );

  const parentNode = parentMemberCallExpression.node;

  const dependencyArgs = parentNode.arguments[1];
  if (dependencyArgs) {
    if (
      dependencyArgs.type === 'ArrayExpression'
      // dependencyArgs.elements.length > 0
    ) {
      const collectedNames = generate(dependencyArgs, {
        shouldPrintComment: () => false,
      }).code;
      // const parsedPath = nodePath.parse(state.file.opts.filename);
      // console.log('current working directory', path.node.loc.start.line);

      // const currentWorkingDirectory = nodePath
      //   .dirname(state.file.opts.filename)
      //   .split(nodePath.sep)
      //   .pop();
      const splittedPath = state.file.opts.filename.split(nodePath.sep);
      const templateuseWhatChangedFUnctionCall = `
       ____useWhatChanged(${collectedNames},"${collectedNames.slice(
        1,
        -1
      )}", "${splittedPath.slice(-4).join(',')}", "${path.node.name}")
       `;

      const useWhatChangedAst = babelParser.parse(
        templateuseWhatChangedFUnctionCall
      );
      if (
        state.lineNoWhereCallNeedToBeAdded &&
        state.lineNoWhereCallNeedToBeAdded[lineNo]
      ) {
        state.lineNoWhereCallNeedToBeAdded[lineNo].collectionNames =
          collectedNames;
      }

      try {
        bodyPath.insertBefore(useWhatChangedAst);
      } catch (e) {
        console.error('@stijnvanhulle/babel-plugin-hooks-devtools error', e);
      }
      if (
        state.lineNoWhereCallNeedToBeAdded &&
        state.lineNoWhereCallNeedToBeAdded[lineNo]
      ) {
        state.lineNoWhereCallNeedToBeAdded[lineNo].done = true;
      }
    }
  }
};

export const buildRequire = template(`
var IMPORT_NAME = require(SOURCE);
var ____useWhatChanged = IMPORT_NAME.useWhatChanged
`);

import { AST_NODE_TYPES, ESLintUtils, TSESTree } from '@typescript-eslint/experimental-utils';
// import * as tsutils from 'tsutils';
import * as ts from 'typescript';

import { createRule, getConstrainedTypeAtLocation } from '../utils';

const RULE_NAME = 'empty-array-check-with-absent-length';

export const rule = createRule({
    name: RULE_NAME,
    defaultOptions: [],

    meta: {
        type: 'problem',
        docs: {
            description: '',
            recommended: 'error'
        },
        messages: {
            absentLength: 'This is array!!!',
        },
        schema: [],
    },

    create(context) {

        // 1. Grab the TypeScript program from parser services
        const parserServices = ESLintUtils.getParserServices(context);
        const checker = parserServices.program.getTypeChecker();

        function getNodeType(node: TSESTree.Node): ts.Type {
            const tsNode = parserServices.esTreeNodeToTSNodeMap.get(node);
            return getConstrainedTypeAtLocation(checker, tsNode);
        }

        function nodeIsArrayType(node: TSESTree.Expression): boolean {
            const nodeType = getNodeType(node);
            return checker.isArrayType(nodeType);
        }

        function nodeIsTupleType(node: TSESTree.Expression): boolean {
            const nodeType = getNodeType(node);
            return checker.isTupleType(nodeType);
        }

        function nodeIsUnaryNegation(node: TSESTree.Node): node is TSESTree.UnaryExpression {
            return (
              node.type === AST_NODE_TYPES.UnaryExpression &&
              node.prefix &&
              node.operator === '!'
            );
        }

        return {
            IfStatement(node: TSESTree.IfStatement) {
                let condition = node.test;
                if (nodeIsUnaryNegation(condition)) condition = condition.argument; // handling !arr
                if (nodeIsUnaryNegation(condition)) condition = condition.argument; // handling !!arr

                // if (!ASTUtils.isIdentifier(identifier)) return;

                const isArray = nodeIsArrayType(condition) || nodeIsTupleType(condition);
                if (!isArray) return;

                context.report({
                    node,
                    messageId: 'absentLength'
                });
            }
        };
    }
});

export const emptyArrayCheckWithAbsentLengthRuleProvider = { [RULE_NAME]: rule };

// checker.getApparentType(originalNode)
// checker.symbolToString(nodeType.symbol)
// checker.symbolToString(nodeType.types[1].getSymbol())
// checker.getContextualType(originalNode)
// nodeType.types[1].getSymbol().getDeclarations().map(v => v.getText())

// tsutils.isUnionType(nodeType)

// identifier
// originalNode
// originalNode
// nodeType

// get flags
/*
Object.values(ts.TypeFlags)
      .filter(v => typeof v === 'number')
      .filter(v => tsutils.isTypeFlagSet(originalNode, v))
      .map(v => ts.TypeFlags[v])

*/

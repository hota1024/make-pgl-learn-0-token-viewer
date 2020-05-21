import { FC } from 'react'
import {
  Token,
  NumberToken,
  LeftParenthesisToken,
  RightParenthesisToken,
  ReservedToken,
  StringToken,
  CommentToken,
  LexerRuleAnalyzeError,
  NewLineToken,
} from 'make-pgl-learn-0'

export type TokenPreviewProps = {
  tokens: Token[]
  source: string
  error?: LexerRuleAnalyzeError
  className?: string
}

export type TokenStyle = {
  tokenType: new (...args: unknown[]) => Token
  color: string
}

export const TokenPreview: FC<TokenPreviewProps> = ({
  tokens,
  source,
  error,
  className,
}) => {
  tokens = error ? error.context.tokens ?? [] : tokens
  const styles: TokenStyle[] = [
    {
      tokenType: NumberToken,
      color: '#B3E5FC',
    },
    {
      tokenType: LeftParenthesisToken,
      color: '#FFE082',
    },
    {
      tokenType: RightParenthesisToken,
      color: '#FFE082',
    },
    {
      tokenType: ReservedToken,
      color: '#CE93D8',
    },
    {
      tokenType: StringToken,
      color: '#FFE0B2',
    },
    {
      tokenType: CommentToken,
      color: '#689F38',
    },
  ]

  return (
    <>
      <pre className={className}>
        {tokens.map((token, key) => {
          if (token instanceof NewLineToken) {
            return <br />
          }

          const content = source.slice(token.pos.start, token.pos.end + 1)
          const style = styles.find(
            (style) => token instanceof style.tokenType
          ) || {
            color: 'white',
          }

          return (
            <span
              style={{ color: style.color }}
              key={key}
              onClick={() =>
                alert(
                  `${JSON.stringify(
                    {
                      content,
                      token,
                    },
                    undefined,
                    2
                  )}`
                )
              }
              className="token"
            >
              {content}
            </span>
          )
        })}
        {error &&
          (() => {
            const content = error.source.slice(
              error.pos.start,
              error.pos.end + 1
            )
            return (
              <span className="error">
                {content} {`<- ${error.name}: ${error.message}`}
              </span>
            )
          })()}
      </pre>

      <style jsx>{`
        .error {
          color: #f44336;
        }

        .token {
          transition: all 120ms;
          border: 3px;
        }

        .token:hover {
          background: rgba(0, 0, 0, 0.5);
          box-shadow: 0 0 8px rgba(0, 0, 0, 0.35);
          cursor: pointer;
        }
      `}</style>
    </>
  )
}

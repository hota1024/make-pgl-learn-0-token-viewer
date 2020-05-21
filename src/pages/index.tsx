import Head from 'next/head'
import { Lexer, AllRules, Token, LexerRuleAnalyzeError } from 'make-pgl-learn-0'
import { useState, useEffect } from 'react'
import { TokenPreview } from '../components/TokenPreview'

export default function Home() {
  const lexer = new Lexer(AllRules)
  const initialSource = `
// Left : Editor
// Right: Preview
/*********************************************/
/*/ - Reserved tokens                       /*/
/*/   - print                               /*/
/*/ - Literals                              /*/
/*/   - 'Single quote string literal'       /*/
/*/   - "Double quote string literal'       /*/
/*/   - 10 // Number literal                /*/
/*/ - Symbols                               /*/
/*/   - + - * / ( )                         /*/
/*/ - Comments                              /*/
/*/   - // Slash-Slash style inline comment /*/
/*/   - # Inline comment                    /*/
/*/   - /* Range comment */                 /*/
/*********************************************/

// 📔 Examples
print('Hello world') # Hello world!🎉
10 * (20 + 2)
We are keyword

// 🏁 Let's try

`.trim()
  const [tokens, setTokens] = useState<Token[]>([])
  const [source, setSource] = useState(initialSource)
  const [error, setError] = useState<LexerRuleAnalyzeError | undefined>()

  const updateToken = (source: string) => {
    try {
      const tokens = lexer.analyze(source)
      setError(undefined)
      setSource(source)
      setTokens(tokens)
    } catch (error) {
      if (error instanceof LexerRuleAnalyzeError) {
        setError(error)
      }
    }
  }

  useEffect(() => {
    updateToken(initialSource)
  }, [initialSource])

  return (
    <>
      <Head>
        <title>Code Highlighter</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div className="container">
        <textarea
          className="input"
          value={source}
          onChange={(event) => updateToken(event.target.value)}
        ></textarea>
        <TokenPreview
          className="preview"
          tokens={tokens}
          source={source}
          error={error}
        />
      </div>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          background: #1a212a;
        }

        .container {
          display: flex;
          height: 100vh;
        }

        .input,
        .preview {
          color: white;
          width: 100%;
          height: 100%;
          margin: 0;
          padding: 1rem;
          font-family: 'Roboto Mono', monospace;
          letter-spacing: 0.1rem;
        }

        .input {
          background: #202020;
          color: white;
          border: none;
          resize: none;
        }
      `}</style>
    </>
  )
}

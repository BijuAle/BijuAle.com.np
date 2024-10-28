---
title: LaTeX Automations
---

# Template: Letter

letter.tex:
```latex
\documentclass{letter}

\signature{
ALE, Biju
}
\address{Kathmandu}

\begin{document}
\begin{letter}{To the HR \\ Some Institution\\ Some Address}

\opening{Dear ...,}

body...

\closing{Yours Faithfully,}

\end{letter}
\end{document}
```

## Word Count


1. Generate a word count file
   - `texcount.pl -1 -sum document.tex > document.sum`
   - `texcount.pl -1 -sum document.tex -out=document.sum`

2. Include the count:
   - `\newcommand\wordcount{\input{document.sum}}`
   - `\newcommand\wordcount{\input{\jobname.sum}}`

3. Include a detailed summary
   - `texcount.pl document.tex -out=document.sum`
   - `\usepackage{verbatim}`
   - `\newcommand\wordcount{\verbatiminput{\jobname.sum}}`

4. Include multiple files
   - Use `-inc` with `texcount.pl`

# Wrap Text Around Figure

```latex
\begin{wrapfigure}{r}{0.4\linewidth}
\centering
     \includegraphics[width=\linewidth, keepaspectratio]{images/[]}
\caption{[]}
\vspace{-30pt}
\end{wrapfigure}
```

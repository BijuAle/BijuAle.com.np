---
title: Notes on Powers & Roots
date: 2018-04-21
tags: ["Mathematics"]
---

# Exponential Growth

- Case 1: +ve base < 1
    - E.g.: $$(\frac{1}{2})^1, (\frac{1}{2})^2, (\frac{1}{2})^3, (\frac{1}{2})^4, (\frac{1}{2})^5, (\frac{1}{2})^6...$$ or $$\frac{1}{2}, \frac{1}{4}, \frac{1}{8}, \frac{1}{16}, \frac{1}{32}, \frac{1}{64}...$$
    - Higher the exponent smaller the number
- Case 2: -ve base < -1
    - E.g.: $$(-3)^1, (-3)^2, (-3)^3, (-3)^4, (-3)^5$$ or $$-3, -9, -27, -81, -243$$
    - Absolute value increases
    - +,- alternates
- Case 3: -ve base between -1 & 0
    - E.g.: $$(-\frac{1}{2})^1, (-\frac{1}{2})^2, (-\frac{1}{2})^3, (-\frac{1}{2})^4, (-\frac{1}{2})^5, (-\frac{1}{2})^6...$$ or $$-\frac{1}{2}, \frac{1}{4}, -\frac{1}{8}, \frac{1}{16}, -`\frac{1}{32}, \frac{1}{64}...$$
    - Absolute value decreases
    - +,- alternates

# Exponent Properties
- Inverse law: $$b^{-n}=\frac{1}{b^n}$$ and $$(\frac{p}{1})^{-n}=(\frac{q}{p})^n$$
- Product law: $$(ab)^n=a^nb^n$$
- Quotient law: $$(\frac{a}{b})^n=\frac{a^n}{b^n}$$
- Factoring and Distributing: $$P(a\pm b)=Pa \pm Pb$$
- Warning: $$(a \pm b)\neq a^n \pm b^n$$
- Equating powers: If, $$a^m=a^n$$ then, $$m=n$$

# Unit digit of Power
- Unit digit of any product is influenced by the unit digit of the two factors being multiplied. E.g.: $$12\underline{3} \cdot 1\underline{6} = 3886\underline{8}$$
- What is the unit digit of $$57^{123}$$?
    1. Considering only one's place, $$ 7^1 =\underline{7}, 7^2=...\underline{9}, 7^3 = ...\underline{3}, 7^4=...\underline{1}, 7^5 =...\underline{7}$$ 
    2. We restart pattern (1,7,9,3,1,7,9,3...) at multiples of 4. Therefore $$ 7^{120}$$  must be 1
    3. Therefore,$$ 7^{120}$$   has 1 in unit place, $$7^{121}$$  has 7, $$7^{122}$$  has 9 and $$7^{123}$$ has 3
    4. Therefore, the unit digit of $$57^{123}$$ is 3

# Radicals

## Radical Properties
- $$\sqrt{PQ}=\sqrt{P}.\sqrt{Q}$$
- $$\sqrt{\frac{P}{Q}}=\frac{\sqrt{P}}{\sqrt{Q}}$$
- $$b^{\frac{1}{2}}=\sqrt{b}$$
- $$b^{\frac{1}{m}}=\sqrt[m]{b}$$
- $$b^{\frac{m}{n}}=(b^m)^{\frac{1}{n}}=(b^{\frac{1}{n}})^m$$
- $$\sqrt{k^2}=k$$ (only if $$k\geq0$$)
    - E.g.: if $$k=-4, \sqrt{-4^2}\neq -4$$
- Common radical-to-decimals: $$\sqrt{2}=1.4; \sqrt{3}=1.7; \sqrt{5}=2.2$$

## Rationalization
Always rationalize final value (eliminate radical from denominator)
- E.g: $$\frac{1}{\sqrt{5}}=\frac{1}{\sqrt{5}}\cdot \frac{\sqrt{5}}{\sqrt{5}}=\frac{\sqrt{5}}{25}$$
- Sometimes, use conjugate to rationalize the final value. E.g.: $$a^2\cdot b^2=(a+b)(a-b)$$

## Extraneous roots in Radical equations
In a quadratic equation there are 3 possibilities with the final root(s):
- Both root work
- Only 1 root works. E.g.: $$\sqrt{x+3}=x-3$$ has these roots: {1, 6}, but only x = 6 works not x =1
- Both roots do not work (Even if roots exist, they don't work)

## Preservation of Order of Inequality
- If $$b>1$$, $$\sqrt{b}<b$$
- If $$0<b<1$$, $$\sqrt{b}>b$$
- Roots preserve order of inequality
    - if $$0<a<b<c$$ order is preserved when $$0<\sqrt[n]{a}<\sqrt[n]{b}<\sqrt[n]{c}$$
    - E.g. $$\sqrt[4]{50}$$ is between what two positive integers?
        - 16 < 50 < 81 $$\equiv$$ $$0<\sqrt[4]{16}<\sqrt[4]{50}<\sqrt[4]{81}$$ So, $$\sqrt[4]{50}$$ is between 2 and 3
    
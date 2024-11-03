---
title: Random Variable (Function)
date: 2020-07-03
tags: ["Mathematics"]
---

# Definition

Random Variable is also known as: *Random Quantity, Aleatory Variable, Stochastic Variable*.

> Let an experiment be given by the probability space ($$\Omega$$, $$\mathbb{A}$$, $$\mathbb{P}$$) where $$\Omega$$ is the sample space, $$\mathbb{A}$$ is the event space, and $$\mathbb{P}$$ is the probability function.
> A random variable X is a real-valued function on $$\Omega$$.
> $$X:\Omega \rightarrow \mathbb{R}$$

# Neither 'random' nor a 'variable'

The term 'variable' in random variable can evoke the notion of a typical algebraic variable such as the unknown $$x$$ or a variable declared in a computer programme, for example as in the java statement, '*int x*;'. However these are wrong associations to make when it comes to random variable.

Random variable is rather precisely stated, a function akin to the subroutines in computer programmes. And rather it is a deterministic (not random) function i.e. for each input there is an unambiguous value (a real-value which could also be discrete) produced. The keyword here is function. Random variable is a function.

Notation of random variable is almost always given in the uppercase as in $$X$$ as opposed to the algebraic variable in smaller case, $$x$$

# Example 1: Random Variable as Measurement

The notion of a random variable can be understood as a measurement. Consider, in a sample space of players of a basketball team, the height of each player is being measured. The measurement maps each player a real-valued height. Here, the measurement of height can be denoted by the random variable $$H$$.

**Function of Function**  
Lets say the unit of $$H$$ is in inches. To obtain $$H$$ in centimetres, a conversion function is defined as $$\bar{H}=2.54*H$$. A function on a random variable is also a random variable, in this case both $$H$$ & $$\bar{H}$$ are random variables.

Similarly, in the same experiment, for each player along with the height, the weight is also measured. This can be represented as another random variable $$W$$.

# Example 2: Random Variable with Custom Assignment

We can also have random variables obtained by ad hoc rules of value assignments which are not obtained by direct measurements, with scales as in the aforementioned examples. For example, random variable $$X$$ can represent the outcome to 1 and 0 in a coin toss.

| $$\omega:\omega\in\Omega$$ | $$X = \begin{cases} 1, & \text{if }x\text{ is head}\\ 0, & \text{if }x\text{ is tail}\\ \end{cases}$$ |
|--------------------------|-----------------------------------------------------------------------------|
| H                        | 1                                                                           |
| T                        | 0                                                                           |

Likewise, another random variable $$Y$$ can represent any outcome of a die roll, to either 0 or 1, depending upon even or odd top-face seen after the roll.

| $$\omega':\omega'\in\Omega$$ | $$Y = \begin{cases} 0, & \text{if }y\text{ is odd}\\ 1, & \text{if }y\text{ is even} \end{cases}$$ |
|----------------------------|----------------------------------------------------------------------------|
| 1                          | 0                                                                          |
| 2                          | 1                                                                          |
| 3                          | 0                                                                          |
| 4                          | 1                                                                          |
| 5                          | 0                                                                          |
| 6                          | 1                                                                          |


# Short-hand Event Label
> One of the benefits of a random variable is that it allows us to use shorthand labels for events. For example, in case a random variable $$Y$$ we may be interested to obtain the probability of even face. This is easily represented as $$P(Y=1)$$ rather than having to write $$P(\text{'rolling an even face'})$$

# Probability of a Random Variable
In actually computing $$P(Y=1)$$, in $$\Omega$$, we count the occurrence(s) of outcome where $$Y=1$$. And since all outcomes have the uniform probability of $$1/6$$, we multiply the number of occurrences with this probability. Or in other words, we sum all such occurrences. So, $$Y=1$$ occurs 3 times for $$Y(2), Y(4), \& Y(6)$$. Therefore $$P(Y=1)=3*1/6=1/2$$

This can be generalized as:

$$P(X=x) = \sum^{\omega_i\in\Omega:X(\omega_i)=x}_{i=1}P(\omega_i)$$

# Bernoulli Random Variable**  
> **Note**: The random variable seen in above examples assign a real value of either 1 or 0 to all outcomes. However, this is not a necessary assignment, we could have assigned other real values. The former has a special name known as the indicator or characteristic or Bernoulli random variable.

# Expected Value

Also known as: *Expectation, Mathematical Expectation, Population Mean, Mean, Average, First Moment*

> **Definition**  
> Expected Value $$E(X)$$ or $$\mu_X$$, as its name suggests, quantifies the expectation of the value of a random variable $$X$$. It is a function that employs probability-weighted average on each of the outcomes.

$$E(X) = \mu_X = \sum_{i=1}^{\omega_i\in\Omega}X(\omega_i)P(\omega_i)$$

For example, in a die roll

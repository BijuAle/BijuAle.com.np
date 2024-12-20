---
date: 2020-02-03
title: Set Theory
tags: ["Mathematics", "Philosophy"]
---

- Article in progress...

# Key Definitions

The study of sets or **set theory** is foundational to mathematics. In fact, the set-theoretic universe which comprises of actual infinities, is so rich and basic that every objects, theorems, notions, and arguments in mathematics can be represented or deduced as sets. This aspect including the notions of infinity within set theory is regarded highly significant to philosophy.

## Set

A **set** is a well-determined collection of objects also known as **members** or **elements**.

The **order** of elements in a set is immaterial. And **duplication** of elements is truncated to only one instance. Thus, each element exists uniquely in a set.

## Set Notation

The notion of sets are quite intuitive to apprehend. Set-notations
are used to represent them precisely and unambiguously. Following
diagram shows the ways of defining a set.

For instance, set P can represent every presidents of the United States
so far as:
$$P=\{\text{`George Washington'},...\text{`Donald John Trump'}\}$$ The
shorthand with **dummy variable** x is almost always used to
conveniently represent a given set. For instance for the set P, this
would be: $$P=\{x:x\text{ is every POTUS to date.}\}$$

Set-Builder notation is the most precise way of mathematically
representing a set. It is comprised of three parts which are shown in
the example below.

$$
\Omega=\{x:\overbrace{x \in \mathbb{Z} \land 1\leq x \leq 6}^{predicate}\}
$$

The $x$ before the colon is the dummy variable which is instantiated by
the rule that follows after the colon. The rule or logical predicate can
comprise of domain constraints, logical conditions, intervals, and
statements.

Symbol Legend

- $\mid$ or $:$ Such that
- $\in$ Is a member of
- $\notin$ Is not a member of
- $\forall$ For all
- $\exists$ There exists
- $\therefore$ Therefore
- $\lor$ Logical or
- $\land$ Logical and
- $\subset$ Is subset of
- $\subseteq$ Is proper subset of
- $<$ Less than
- $>$ Greater than
- $\leq$ Less than or equal to
- $\geq$ Greater than or equal to

## Special Sets

### Universal Set ($\Omega$)

$\Omega$ is the universal set of discourse which contains all objects in
a well-defined context. Various other symbols are used to denote
universal sets such as $\mathbb{U}, V, S, \text{and } \xi$.

For example, in probability & statistics, it is the sample space of
every outcomes in a probability space. The universal set of outcomes for
a regular die, for instance is given as:
$$\Omega=\{x\in \mathbb{Z}:1\leq x \leq 6\}$$

### Null Set ($\emptyset=\{\}$)

Denotes an empty or a null set i.e. the set with no members or it could
also be the set with impossible events as members. Example: set of
negative faces on a roll of a regular die.

### Numbers as Set

In mathematics, set notations are commonly used to denote number types.
Some of these are:

Symbol Legend

- $\mathbb{Q}$ Rational Numbers
- $\mathbb{R}$ Real Numbers
- $\mathbb{Z}$ Integers
- $\mathbb{N}$ Natural Numbers
- $\mathbb{C}$ Complex numbers
- $\mathbb{I}$ Imaginary Numbers

Here, with regards to the semantic meanings (from probability theory) of
the greek letters, the outcome $\omega$ of an experiment belongs to the
set of its sample space $\Omega$.

## Set Relations

## Set Operations

### Cardinality

Cardinality of set A is the size of A determined by the number of
elements present in A.

Let $A={\{x:x \text{ is every POTUS until 2020}\}}$. The cardinality of
A is denoted as $\#A = 45$

### Union

The union of two sets is denoted as $A \cup B$ and represents elements
in either $A$ or $B$ or both. In other words it is the merged set of
elements from both set $A$ and set $B$.
$$A \cup B = \{x:x \in A\ \lor x \in B\}$$

Properties: $A \cup A = A$;
$A \cup \emptyset = A$; $A \cup \Omega = \Omega$

### Intersection

The intersection of two sets is denoted as $A \cap B$ and represents
common elements between $A$ and $B$ i.e. elements present both $A$ or in
$B$ $$A \cap B = x: x \in A\ \land x \in B$$

Properties: $A \cap A = A$;
$A \cap \Omega = A$; $A \cap \emptyset = \emptyset$

### Complement

The complement of a set A, denoted as $A^c$ (or $\bar{A}$ or
$A\text{'}$) is the set of elements outside of A, within $\Omega$.

Properties: $(A^c)^c = A$; $\emptyset^c = \Omega$;
$\Omega^c = \emptyset$; $A^c \cap A = \emptyset$

# Theorems

## Venn Diagram

A Venn Diagram is a graphical representation of logical relations
between finite sets. A rectangle depicts $\Omega$, which is the sample
space or the universe of discourse. The set of events are enclosed
within the rectangle and are depicted with enclosed curves, almost
always with a circle.

Relation between sets are depicted by overlapping one set over another
if the sets share common elements. Otherwise, disjoint sets are depicted
separately without overlaps. Certain aspects about the relationships ---
for example the intersection --- between two sets are highlighted with
some sort of shading,

The next page (which I have borrowed from MIT mathematician Andrew
Sutherlad) that follows shows beautifully, how venn diagram can
communicate various aspects about the relationship between two sets.

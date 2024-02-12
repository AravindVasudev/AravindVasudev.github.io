---
title:  "Recursion, Graphs, and Dynamic Programming"
date:   2024-02-11 00:00:00 +0530
categories: [programming]
tags: [data structures]
---

This write-up aims to connect graph theory with solving dynamic programming
problems. Instead of delving into the basics of these concepts, we will focus on
building an intuition for using these concepts. We will start by exploring the
idea behind recursion, followed by graphs, and finally wrap up with top-down
dynamic programming.

## Recursion

> Recursion is defining a problem in terms of itself.

What does this even mean? We all would have seen the classic example of
generating the Nth fibonacci sequence using recursion:

```
Fibonacci(0) = 0
Fibonacci(1) = 1
For all n > 1, Fibonacci(n) = Fibonacci(n - 1) + Fibonacci(n - 2)
```

This idea of defining a problem as its subproblems is common in mathematics, and
hence most examples we find is based on equations such as the one above. How
about we focus on solving a lame coding problem with recursion. Say we want to
find the sum of all integers in an array:

```python
def total(arr: List[int]) -> int:
  if not arr:
    return 0

  return arr[0] + total(arr[1:])
```

The above fn has two branches:
  1.  if the array is empty, return 0
  2.  else, return the sum of the first element and the rest of the array.

```python
total([1, 2, 3, 4, 5])
  -> 1 + total([2, 3, 4, 5])
    -> 1 + 2 + total([3, 4, 5])
      -> 1 + 2 + 3 + total([4, 5])
        -> 1 + 2 + 3 + 4 + total([5])
          -> 1 + 2 + 3 + 4 + 5 + total([])
            -> 1 + 2 + 3 + 4 + 5 + 0
```

The stopping condition `if not arr: return 0` that stops the code from stack
overflow is called the base case. And the line that defines the core logic
`return arr[0] + total(arr[1:])` is called the recursive case. This pattern is
common for all recursive functions.

In most examples involving a single recursive call, you might be better off writing
iterative code, especially if your language doesn't support
[tail call optimization](https://en.wikipedia.org/wiki/Tail_call). However, I
personally feel most recursive breakdowns are intuitive.

```python
# Recursive.
def fetchData(id: str, retries=3):
  if retries == 0:
    raise Exception("Request failed.")

  try:
    return request(f"http://foo.bar/{id}")
  except TimeoutError:
    return fetchData(id, retries - 1)

# Iterative.
def fetchData(id: str, retries=3):
  for _ in range(retries):
    try:
      return request(f"http://foo.bar/{id}")
    except TimeoutError:
      pass

  raise Exception("Request failed.")
```

In the above example, we retry the request `retries` times before throwing an
exception. The recursive approach simply mentions throwing an exception when
we are done retrying as its base case and retrying on failure as its recursive
case. It is more intuitive to read in my opinion but YMMV.

## Graphs

Unlike the above example where we only have one recursion call
(one-to-one mapping), for problems that involve one-to-many or many-to-many
mappings, recursive implementations are more intuitive to write over iterative
code.

Say we are writing a function to find all files within a given directory that
ends with a given suffix. We could use an API to get the list of all files
within that directory and do a suffix check. However, directories can have
subdirectories (i.e., one-to-many mappings). Well, we could repeat the same
operations for the subdirectory too recursively:

```
fn find(directory, suffix)
  1. if the directory is empty, stop.
  2. foreach item in directory:
    2.1. if item is a subdirectory, find(item, suffix)
      2.1.1. Add to results.
    2.2. Otherwise, do a suffix check and add to results.
  3. return results.
```

Now let's turn the above recursive definition to code:

```python
def find(path: str, suffix: str) -> List[str]:
  """ Finds files within `path` which match the `suffix`. """
  files = os.listdir(path)

  # if the directory is empty, return [].
  if not files:
    return []

  matches = []
  for file in files:
    filePath = os.path.join(path, file)
    if os.path.isfile(filePath): # If file, check suffix.
        if file.endswith(suffix):
          matches.append(file)
    else: # if subdirectory, recurse.
      matches.extend(find(filePath, suffix))

  return matches
```

As long as we can breakdown the problem into a base case and a recursive case,
problems involving one-to-many and many-to-many mappings are intuitive to solve
with recursion.

Voilà, we just traversed a graph! To be specific, a special kind of graph called
a tree using a technique called Depth-First Search (DFS). When our recursive
code finds a subdirectory, it explores that subdirectory completely before
looking at the rest of the items in the current directory, i.e., it explores
the depth of the the directory tree first and then the breadth, hence the name.

Now let's look at what would change if the problem involved many-to-many
mapping. Let's run the above example with a directory containing recursive
symlinks:

```
foo/
  bar/
    baz/ ---> symlink to foo/

find("/foo", "js")
OSError: [Errno 62] Too many levels of symbolic links: '/foo/bar/bar/bar/bar/bar/bar/bar/bar/bar/bar/bar/bar/bar/bar/bar/bar/bar/bar/bar/bar/bar/bar/bar/bar/bar/bar/bar/bar/bar/bar/bar/bar/bar/bar/bar/bar/bar/bar/bar/bar/bar/bar/bar/bar/bar/bar/bar/bar/bar/bar/bar/bar/bar/bar/bar/bar/bar/bar/bar/bar/bar/bar/bar/bar/bar/bar'
```

The `find()` keeps following the symlink indefinitely until it hits an OS error.
We could patch this function by ensuring we only visited a path once:

```python
def find(path: str, suffix: str, visited: Set[str]) -> List[str]:
  """ Finds files within `path` which match the `suffix`. """
  # Resolve symlink and check if already visited.
  path = os.path.realpath(path)

  if path in visited:
    return []

  visited.add(path)
  files = os.listdir(path)

  # if the directory is empty, return [].
  if not files:
    return []

  matches = []
  for file in files:
    filePath = os.path.join(path, file)
    if os.path.isfile(filePath): # If file, check suffix.
        if file.endswith(suffix):
          matches.append(file)
    else: # if subdirectory, recurse.
      matches.extend(find(filePath, suffix, visited))

  return matches
```

Even though this example might not completely fit the many-to-many template, it
still suffers from the same problem that many-to-many relations have: cycles.
Following these cycles would let us go in an infinite recursion. This can
usually be handled by storing the all the previously visited path and avoiding
those cyclic paths.

How is this tied to graphs you ask? Graph is a mathematical model, in that, you
don't need to define a class or an adjendency matrix to use its algorithms. A
lot of problems which can broken down into recursive definitions can be solved
using graph algorithms.

Now let's use this idea to solve
[decode-ways](https://leetcode.com/problems/decode-ways/) from leetcode. tl;dr
of the description is to find the number of ways the given number can be decoded
into a string.

Let's think of the path you could take to decode the number as a graph:

```
decodeWays("12")
  --> char[1] + decodeWays("2") --> char[1] + char[2] + decodeWays("") # 1 way.
  --> char[12] + decodeWays("") # 1 way.
=========================================
                2 ways
=========================================
```

At every index, we can conditionally decode one or two characters. And based on
that, we could decode the rest of the string. As shown in the above example,
the solution space can hence be represented as a graph. The substring would be
the node and the way to get to it (either by decoding one digit or two) would
be the edge. We could DFS through it the same way we did for the `find()` fn.

```python
class Solution:
    def numDecodings(self, s: str, index: int = 0) -> int:
        # If done decoding the entire string
        # We have found one path.
        if index == len(s):
            return 1

        # If the current digit is "0", we
        # can't decode since the table goes from 1
        # to 26. For example, if the input is,
        # "012", there is no way to decode it.
        if s[index] == "0":
            return 0

        # Number of paths from decoding the current
        # digit.
        ways = self.numDecodings(s, index + 1)

        # If current digit and next digit combined is
        # decodable, add those possibilities too.
        if (index + 1 < len(s) and 
            int(s[index:index+2]) <= 26):
            ways += self.numDecodings(s, index + 2)

        return ways
```

The above problem significantly jumps in complexity compared to the `find()`
example. However, the fundamental idea is the same. By treating the solution
space as a graph, we can DFS through it to reach the end nodes and aggregate
the result.

## Dynamic Programming

If you tried submitting the above example for
[decode-ways](https://leetcode.com/problems/decode-ways/), you would be hit with
a Time Limit Exceeded (TLE). Let's take a look at an example to see why:

```
numDecodings("1111")
  --> char[1] + numDecodings("111") --> char[1] + char[1] + numDecodings("11") --> char[1] + char[1] + char[1] + numDecodings("1") --> char[1] + char[1] + char[1] + char[1]
                                    --> char[1] + char[11] + numDecodings("1") --> char[1] + char[11] + char[1]
  --> char[11] + numDecodings("11")
                                    --> char[11] + char[1] + numDecodings("1") --> char[11] + char[1] + char[1]
                                    --> char[11] + char[11]
```

In the above example, we trace out the entire graph for `1111`. We can clearly
see that there are enough duplicate calls for `numDecodings("11")` and
`numDecodings("1")`. Now imagine tracing the same graph for
`numDecodings("111111111111111111111111111111111111111111111")`. We make a lot
of repeated calls for the same indices. Even though we are not dealing with
infinite recursive issue that we dealt with in the `find()` with symlinks
example, we still have "cycles" that end up repeating the same operation. Since
we make two recursive call for every index, the solution space forms a fully
completed binary tree of height N, where N is the length of the input string. We
know that the number of the nodes in this tree would be 2^N and hence the time
complexity for this implementation would be O(2^N).

If we maintained a visited in a similar fashion and stored the result for each
index, we could cut down all the duplicate computation of `numDecodings`.
By pruning all the duplicate calls, we only call `numDecodings` once for each
index, hence cutting down the time complexity from O(2^N) to O(N).

```python
class Solution:
    # The pythonic way of implementing this would be to use
    # @functools.cache decorator.
    def numDecodings(self, s: str) -> int:
        def decode(index: int, memo: Mapping[int, int]) -> int:
           # If done decoding the entire string
           # We have found one path.
           if index == len(s):
               return 1

           # If the current digit is "0", we
           # can't decode since the table goes from 1
           # to 26. For example, if the input is,
           # "012", there is no way to decode it.
           if s[index] == "0":
               return 0

           # If already computed, return stored result.
           if index in memo:
             return memo[index]

           # Number of paths from decoding the current
           # digit.
           ways = decode(index + 1, memo)

           # If current digit and next digit combined is
           # decodable, add those possibilities too.
           if (index + 1 < len(s) and 
               int(s[index:index+2]) <= 26):
               ways += decode(index + 2, memo)

           # Store the result.
           memo[index] = ways
           return ways

        return decode(0, {})
```

The `memo` here maps the unique state (i.e., the index) to its result. It helps
in avoiding duplicate calculations. And this forms the fundamental idea of
dynamic programming. This problem has "optimal substructure", i.e., the optimal
way to decode `index` is the sum of optimal way to decode `index + 1` and
`index + 2`. Maybe this doesn't make much sense for this problem but this idea
is more handy in problems where optimization is required (see
[coin-change problem](https://leetcode.com/problems/coin-change/)). We also
have "overlapping subproblems", i.e., we recompute same indices over and over
again. Pruning those calls with our `memo` cache significantly reduces
computation.

Voilà, we solved a DP problem! There is definitively a lot more to each of the
topics covered here. But the fundamental take away of this write-up is to build
the intuition to think of your problem space as a graph of inter-connected
states and traversing it optimally. So long!
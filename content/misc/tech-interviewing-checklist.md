---
title:  "My Tech Interviewing Checklist"
date:   2024-08-31 00:00:00 +0530
categories: [programming]
tags: [interview]
---

*Disclaimer: This article is basically a dump of my disorganized notes I took during my interview prep, don't expect it to be good.*

Preparing for coding interviews definitely gets our nerves rattling, even if we’ve been coding for years. No matter how seasoned you are, the pressure of interviews can still be overwhelming.

Before my Google interview, a friend pointed me to the blog [Get that job at Google](https://steve-yegge.blogspot.com/2008/03/get-that-job-at-google.html). The author introduces the concept of the "Interview Anti-Loop" which really stuck with me. It’s basically the idea that, no matter how prepared you are, there will always be someone who thinks you’re not the right fit or a problem you can’t solve on the spot.

And then there are those pesky interview-specific algorithms. A worst example would be swapping two numbers without using a third variable. It’s a tricky problem that defies common intuition, is rarely applicable in real-world coding, and can be solved with a bit of time or a quick search.

To boost my chances during my recent interviews, I put together a list of concepts using the [MoSCoW method](https://en.wikipedia.org/wiki/MoSCoW_method), which I could use to prepare based on how much time I got. I also noted down some interesting interview-specific algorithm styles. I’ll be sharing my personal interview prep list in this post.

## The Ultimate Checklist

### Must Have(s)
Have these or you are probably screwed.

- [ ] Array
  - [ ] Two pointer
  - [ ] Sliding Window
- [ ] String
  - [ ] Substring Problems
- [ ] Hash Map
  - [ ] Storing previously seen values to reduce computation
  - [ ] Tree
    - [ ] Binary & N-ary Tree
    - [ ] Passing value down to the child node
    - [ ] Receiving value from the child node
    - [ ] Trie
    - [ ] BST
- [ ] Graphs
  - [ ] BFS & DFS
  - [ ] Depth-Limited Search
  - [ ] Backtracking
- [ ] Binary Search (& variations)
- [ ] Dynamic Programming
  - [ ] Top-Down
  - [ ] Bottom-Up
  - [ ] Multiple dimensions
- [ ] Prefix/Suffix Sum
- [ ] Heap (Usage)
- [ ] Interval Scheduling Problem

### Should Have(s)
Definitely need but let's hope luck is on your side.

- [ ] Quick Sort
  - [ ] Quick Select
- [ ] Merge Sort
- [ ] Divide and Conquer
- [ ] Union-Find
  - [ ] TBD (Two implementations?)
- [ ] Graphs
  - [ ] DAGs
  - [ ] Topological Sort
  - [ ] Dijkstra's
- [ ] Data Streams
- [ ] Dynamic Programming
  - [ ] Kadane's Algorithm
  - [ ] Subset problem

### Could Have(s)
The hard-to-solve why-would-anyone-ask section.

- [ ] Bidirection BFS
- [ ] Heap Sort
- [ ] Counting Sort
- [ ] Heap (Implementation)
- [ ] Segment Tree
- [ ] Rolling Hash
- [ ] KMP Algorithm
- [ ] Graphs
  - [ ] Minimum Spanning Tree
  - [ ] A* search
  - [ ] Traveling Salesman Problem
  - [ ] Morris Preorder Traversal
- [ ] Math
- [ ] Knapsack Problem
- [ ] P, NP, NP Complete, NP Hard, Weakly NP Complete (Nice to know).
- [ ] Two Heap Technique.

### Won't Have(s)
The I-have-too-much-time section.

- [ ] AVL Tree
- [ ] Red-Black Tree
- [ ] Reservoir Sampling
- [ ] Hash Heap
- [ ] Radix Sort
- [ ] Alias Method
- [ ] Graphs
  - [ ] Bellman-Ford Algorithm
  - [ ] SPFA
  - [ ] Floyd-Warshall algorithm
  - [ ] Eulerian Circuit
  - [ ] Hamiltonian Circuit
  - [ ] Tarjan's strongly connected components algorithm

## The Algorithmic "Hacks"

*I didn't get to document everything and this list is very incomplete.*

### Light-Weight Datastructures
- [ ] Using an integer as set with bitwise operations.
  - [ ] Using an integer[] as set, with the same idea as above.
  - [ ] Using boolean[] as set with using hash as index.
  - https://www.geeksforgeeks.org/space-optimization-using-bit-manipulations/
- [ ] Using array as map with using hash as index.
  - https://leetcode.com/problems/find-all-duplicates-in-an-array/editorial/
- [ ] Using array as stack/queue.
- [ ] Using array as tree.
- [ ] Back pointers for array to reuse memory, see [move-zeros](https://leetcode.com/problems/move-zeroes/description/).

### Bitwise Optimizations
- [ ] x2 => `<<` (shift left)
- [ ] /2 => `>>` (shift right)
- [ ] Find odd or even with `&1`, i.e., `x&1 == 1 iff x is odd`.
- [ ] Re-using unused bits using a bitmask operation.
- [ ] `N%2i == N & (2i - 1)`.

## System Design Pointers

*Just rough notes.*

- Manage Time Better
    - Don’t clarify, let the interviewer disrupt your checkpoints. 
    - Not all numbers are important. QPS is important. Storage is usually important.
    - Memorize all non-functional requirement possibilities, then just shoot them (yes, no).
    - Explain by use cases (read, end to end) vs by sections (API, then data schema, then high level design).
- Have to mention trade-offs (SQL vs NoSQL, push Vs pull, REST Vs GraphQL, sync Vs async, core puzzle).
-  Non-functional checklist 
    - Reliability
    - Scalability
    - Security
    - Durability
    - Latency
    - High Availability Vs Strong Consistency.
- For estimations, don’t just list numbers but explain what choices it guides in your design.

## Some Good Reads

*A Disorganized list of articles that I liked.*

### Coding
- https://www.hackerearth.com/practice/algorithms/dynamic-programming/2-dimensional/tutorial/
- https://www.hackerearth.com/practice/notes/abhinav92003/why-output-the-answer-modulo-109-7/
- https://www.topcoder.com/community/competitive-programming/tutorials/binary-search
- https://codility.com/media/train/3-PrefixSums.pdf
- https://www.hackerrank.com/topics/prefix-sum
- https://www.geeksforgeeks.org/prefix-sum-array-implementation-applications-competitive-programming/
- https://leetcode.com/problems/minimum-window-substring/discuss/26808/Here-is-a-10-line-template-that-can-solve-most-'substring'-problems
- https://www.growingwiththeweb.com/data-structures/binary-heap/build-heap-proof/
- https://www.topcoder.com/thrive/articles/Dynamic%20Programming:%20From%20Novice%20to%20Advanced
- https://leetcode.com/problems/sort-an-array/discuss/277127/7-line-quicksort-to-write-in-interviews-(Python)
- https://stackoverflow.com/questions/10162679/python-delete-element-from-heap
- https://leetcode.com/problems/minimum-path-sum/discuss/584967/Python-Grid-reduction-(Sounds-fancy-but-a-simple-method)-no-additional-space
- https://www.thealgorist.com/Algo/Tree/ThreadedBinTree
- https://iq.opengenus.org/bidirectional-search/
- https://leetcode.com/articles/a-recursive-approach-to-segment-trees-range-sum-queries-lazy-propagation/
- https://leetcode.com/articles/two-pointer-technique/
- https://algodaily.com/lessons/using-the-two-pointer-technique
- https://zengruiwang.medium.com/sliding-window-technique-360d840d5740
- https://leetcode.com/problems/count-number-of-homogenous-substrings/editorial/

### System Design
- https://interviewing.io/mocks/facebook-system-design-design-live-comments
- https://github.com/donnemartin/system-design-primer
- https://gist.github.com/vasanthk/485d1c25737e8e72759f

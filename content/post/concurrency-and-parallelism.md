---
title:  "Concurrency and Parallelelism"
date:   2018-07-30 00:00:00 +0530
categories: [programming]
tags: [concurrency]
---

We live in a universe where literally every system can multiprocess (Some claim 
that the universe itself is a parallel system but I'm going to leave 
that for another blog) but most of our programs are sequential. This is mainly 
because parallel systems are arduous to design.

Concurrent systems grow in complexity exponentially because the more concurrent the 
system gets, more the places it could fail. Handling for all the failable cases is 
what makes concurrent design laborious. Moreover, many developers find it hard 
to differentiate concurrency from parallelism.

## Concurrency Vs Parallelism
Many confuse concurrency with parallelism. I had this very confusion in my college 
days and watching [Rob Pike's "Concurrency is not parallelism"](https://blog.golang.org/concurrency-is-not-parallelism) 
cleared it up for me. I would recommend you to watch it if you suffer from the 
same confusion but if you haven't got 30 minutes, there is a brief summary:

> Parallelism is running tasks at the same time whereas concurrency is a way of 
designing a system in which tasks are designed to not depend on each other.

Consider you are designing a server in which when a user sends a request, you 
read from a database, parse a template, and respond. When the server expands 
to serve more than one user, you can't work parallelly since there is a limit to 
how many parallel tasks a system can do. It would be impossible to design such 
scalable systems we have today with just parallelism.

![concurrency to the rescue](/images/blog/concurrency.jpg)

If you meticulously analyze this problem, you would see that a considerable 
amount the time is wasted waiting for the response from the 
database, a.k.a *blocking*.

Blocking occurs when a task is waiting for some operation to complete. This can 
be I/O, network calls, database calls, file reads, etc. During blocking, a 
process remains idle until it can proceed.

A concurrent system can take advantage of this and run a different task when 
blocked hence utilizing CPU to its max.

![sequential, parallel, and concurrent flow](/images/blog/sequential_parallel_concurrent.svg)

Since the tasks are designed to run independently in concurrent execution, the 
system can effectively switch between them when one is blocked. Back to our 
server problem, the server can be designed to work concurrently so that when 
one task (user request) is blocked due to database call, the process can 
perform another task instead to blocking.

In short, concurrency 
is a design in which two or more tasks can overlap but not necessarily run in 
parallel, though concurrency can be used to achieve parallelism since the order 
of execution of tasks does not matter in a concurrent system.

## Concurrency Techniques
## Threads
[Threads](https://en.wikipedia.org/wiki/Thread_(computing))  have been the 
idiomatic approach to concurrency since its conception. In threading, the 
task is broken down into smaller units called threads which run concurrently 
(or parallelly if the system allows it to).

```python
from threading import Thread

def thread():
    print("Hello")

for _ in range(10):
    Thread(target=thread).start()
```

In the above example, ten concurrent instances of `thread` are created. They can 
run parallelly or overlap. This approach gets complex when the 
threads need to access the same data.

Consider two threads, one trying to increment and the other trying to decrement 
the same memory location. When it is run sequentially, the result would be the old 
value. But when run concurrently, assume the first thread reads the value and 
before it writes the update, the second thread reads the old value and updates the
memory and then the first threads writes. Now the value would be one increment 
from the old. This is called a race condition.

```java
public class RaceConditionDemo {
    private static int data = 0;

    public static void increment() {
        data++;
    }

    public static void decrement() {
        data--;
    }

    public static void main(String[] args) throws InterruptedException {
        // Create 1000 threads to increment and 1000 to decrement `data`
        Thread[] threads = new Thread[2000];
        for (int i = 0; i < 2000; i += 2) {
            threads[i] = new Thread(() -> increment());
            threads[i + 1] = new Thread(() -> decrement());
        }

        // Start all threads
        for (Thread t : threads) {
            t.start();
        }

        // Wait for all to complete
        for (Thread t : threads) {
            t.join();
        }

        // Log data
        System.out.println(data);
    }
}
```
Running the above Java program would yield a different value for each run. 
(Python can never have a race-condition due to its awesome yet outdated 
[GIL](https://en.wikipedia.org/wiki/Global_interpreter_lock)).

Race Condition can be overcome using a lock. A lock makes sure only one thread 
can access the critical section, i.e., the `data` variable here, to avoid 
race-condition.

### Green Threads
[Green threads / Microthreads / Processes (Erlang VM) / Go routines / ...](https://en.wikipedia.org/wiki/Green_threads) 
are conceptual threads that run on the VM rather than running as an actual 
thread. The VM takes care of multiplexing these to actual threads hence these 
are light-weight compared to traditional threads. They take up less memory, 
quicker to start, and a lot can be created. You can hit `java.lang.OutOfMemoryError` 
only with a few thousand threads whereas you can create millions of 
goroutines with a commensurable amount of memory. Since these are language specific, they have 
language-specific pizzazz in them.

For example, Goroutines do not need locks to use shared memory whereas Erlang's 
processes do not have a shared memory at all.

```go
package main

import (
	"fmt"
	"time"
)

func task(i int) {
	fmt.Println(i)
}

func main() {
	for i := 0; i < 10; i++ {
		go task(i)
	}

	time.Sleep(100 * time.Millisecond)
	fmt.Println("done")
}
```

The above is an example of goroutines. In Go, starting a goroutine is as 
simple as calling the function with a `go` keyword in front of it.

### Asynchrony
[Asynchrony](https://en.wikipedia.org/wiki/Asynchrony_(computer_programming)) 
is what I used in the server example. This model 
efficiently utilizes blocking time to run another task. There are various 
approaches to Asynchrony.

#### Callbacks
[Callbacks](https://en.wikipedia.org/wiki/Callback_(computer_programming)) are 
the most basic approach to Asynchronous Programming. It is heavily used in GUI 
development and is the backbone of Node.js.

```js
const fs = require('fs');

fs.readFile('./foo.txt', 'utf8', (err, content) => {
    if (err) throw err;
    console.log(content);
});

console.log('done.');
```

In the above Node.js example, the `fs.readFile` method takes in a callback 
(a function) which it calls when it is done reading the file. This way, 
`console.log('done.')` doesn't have to wait for the file to be read.

Callbacks are used in GUI programming as such:

```python
import tkinter as tk

def click(event):
    print('Hello World')

root = tk.Tk()

btn = tk.Button(root, text='Click me!', padx=10, pady=10)
btn.bind('<Button-1>', click)
btn.pack()

root.mainloop()
```

The above is an example of callbacks using Tkinter. The button's `bind` method 
takes a callback (a function or a lambda) as an input and executes it when the 
button is clicked. This way, the whole program runs in a single thread without 
blocking.

Excessive use of callbacks leads to a problem known as [Callback Hell](http://callbackhell.com/).
Promises were created to overcome this.

#### Promises
Promises / Futures / Deferred / ... are alternatives to callbacks where a 
function, instead of taking a callback, returns a promise object. This object 
can be used to continue after the asynchronous task.

```js
const Promise = require('promise');
const readFile = Promise.denodeify(require('fs').readFile);

let readFilePromise = readFile('./foo.txt', 'utf8'); // returns a Promise

readFilePromise
    .then(content => console.log(content)) // this runs when the promise succeeds i.e., reads the file
    .catch(err => console.error(err)); // this runs when an error occurs
```

The problem in callbacks and promises is that they complicate the flow of the 
program as they have a different mechanism for error handling, looping, etc.
To simplify this, async/await was created.

#### Async / Await
[Async/Await](https://en.wikipedia.org/wiki/Async/await_(computer_programming)) 
lets you write asynchronous code that looks and feels like synchronous code. This 
way one can take advantage of non-blocking flow without much change.

```js
const fs = require('fs');
const Promise = require('promise');
const readFile = Promise.denodeify(require('fs').readFile);

async function main() {
    try {
        return await readFile('./ftest.js', 'utf8');
    } catch (err) {
        return err;
    }
}

main()
    .then(content => console.log(content))
    .catch(err => console.error(err));
```

In the above example, the main function is denoted with the modifier `async` and 
all the asynchronous calls in it are marked with `await`. This way, we can use 
readFile like simple synchronous method.

#### Reactive Programming
[reactive programming](https://en.wikipedia.org/wiki/Reactive_programming) 
has observables and observers who "react" to the events emitted by the 
observables. Observables can be a mouse click, a network call, a socket 
connection, a file stream, etc.

```js
const Rx = require('rx');
const readline = require('readline');
const fs = require('fs');

// Let's reading file line by line from file stream
let rl = readline.createInterface({
    input: fs.createReadStream('foo.txt')
});

// Create an observable from rl
let fileObservable = Rx.Observable.fromEvent(rl, 'line')
                        .takeUntil(Rx.Observable.fromEvent(rl, 'close'));

// Subscribing to the observable takes 3 functions: (onNext, onError, onComplete)
fileObservable.subscribe(
    line => console.log(line),
    err => console.error(err),
    () => console.log('Completed')
)
```

[ReactiveX or Rx](http://reactivex.io/) is a set of tools to do reactive 
programming. In the above example, an observable is created for line by line 
file reading and is subscribed to using the `subscribe` method.

### Coroutines
[Coroutines](https://en.wikipedia.org/wiki/Coroutine) allow functions to pause 
themselves and give control to another function. This way, a function doesn't 
have to completely end to pass its control. Coroutines provide concurrency but 
not parallelism.

```python
def foo():
    print('Coroutine starts')
    while True:
        name = (yield) # returns control to call and restarts from here when invoked when a value
        if name == 'Pikachu':
            print('Pika Pika')
        elif name == 'Charmander':
            print('Char')
        else:
            print('Unidentified')

coroutine = foo()
coroutine.__next__() # prints and stops at `name = (yield)`

coroutine.send('Pikachu') # Pika Pika
coroutine.send('Squirtle') # Unidentified
```

--------------------------------------------------------------------------------

Concurrency has become the fundamental of modern programming as even systems as 
small as mobile phones come with multiple cores. Hence, understanding 
concurrency would let us write efficient and powerful software.

## References
- [Concurrency is not parallelism - Rob Pike](https://blog.golang.org/concurrency-is-not-parallelism)
- [What is RxJS?](https://thinkster.io/tutorials/learn-rxjs-observables/what-is-rxjs)
- [Coroutine in python](https://www.geeksforgeeks.org/coroutine-in-python/)
- [KotlinConf 2017 - Introduction to Coroutines by Roman Elizarov](https://www.youtube.com/watch?v=_hfBv0a09Jc)
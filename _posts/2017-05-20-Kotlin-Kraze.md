---
title:  "My day 1 of learning Kotlin"
date:   2017-05-20 5:00:00 +0530
categories: [programming, android, kotlin]
tags: [kotlin]
---

![](/images/blog/kotlin_1.png)

I was reluctant to learn Android until now because of Java. With all the new
languages out there, Java's verbose nature and lack of syntactic sugar is not the
most pleasing language to code in. Even though language alternatives like Scala,
Clojure, and Kotlin exist for Android, I stuck with hybrid app development due to
the lack of proper documentation for these alternatives.

A couple of days back, the Android team announced first-class support for kotlin
and I started seeing a lot of Kotlin praise and tutorial coming up across the
internet community. I couldn't care less about it until I came across these:

  * [Kotlin is like Typescript](https://gi-no.github.io/kotlin-is-like-typescript/){:target="_blank"}
  * [Swift is like Kotlin](http://nilhcem.com/swift-is-like-kotlin/){:target="_blank"}

Kotlin to Android is what Swift to iOS is. After seeing how close it is to the
languages I already know, I gave it a shot.

--------------------------------------------------------------------------------

## What is Kotlin?

Kotlin is a static-typed programming language that can be compiled to run on
JVM, Javascript, and Native support for MacOS, Linux, and iOS on the way.
Kotlin is a relatively new language and hence unlike Java, it has awesome
features such as lambda expressions, string templates, data classes, nullable
types, getters and setters as property(similar to computed properties in swift),
etc still being completely compatible with Java. Hence, Kotlin can be thrown
into to an existing Java project without making any changes.

After spending a day with it, here are some notable things about Kotlin that I
learnt:

### Semicolon

Semicolons are optional in Kotlin like in many scripting languages.

### main()

Unlike Java, the main entry function in kotlin is a standalone function in the
package scope.

```java
package my.program

fun main(args: Array<String>) {
    println("Hello, world!")
}
```

### Variable Declaration

The variable declaration in Kotlin is done using `var` and `val` with the type
specified after the variable name with a colon.

```java
val foo: Int = 10 // cannot be reassigned
var bar: Int = 5 // can be reassigned
```

Kotlin has automatic type inference system and hence we don't have to specify
the datatype explicitly when it can be inferred.

```java
// The above code can be rewritten as follows
val foo = 10 // cannot be reassigned
var bar = 5 // can be reassigned
```

### Multiline String and String Templates

```java
val multiLineString = """
Lorem ipsum dolor sit amet, consectetur adipiscing elit.
Cras odio felis, pulvinar in eros vitae, pharetra auctor magna.
Pellentesque sit amet nisi vitae lorem scelerisque semper.
"""

val templateString = "The number is $foo, ${bar}"
println(templateString) // The number is 10, 5
```

### Functions

Functions in Kotlin are declared using the keyword `fun`.

```java
fun foo(name: String, favoriteColor: String = "red"): String {
  return "$name likes $favoriteColor"
}

println(foo("Aravind")) // Aravind likes red
println(foo("Aravind", "green")) // Aravind likes green
println(foo("Aravind", favoriteColor="blue")) // Aravind likes blue

// Functions with single line can be written with an equal sign in Kotlin.
fun foo1(name: String, favoriteColor: String = "red") = "$name likes $favoriteColor"

// A function can get variable arguments using the `vararg` keyword
fun bar(vararg numbers: Int): Int {
  return numbers.size
}

println(bar(1, 2, 3)) // 3
println(bar(4, 5, 6, 7, 8)) // 5

// Lambda expressions can be created in Kotlin as follows
val add = {a: Int, b: Int -> a + b}
// the types can be assigned directly to the variable
val subtract: (Int, Int) -> Int = {a, b -> a - b}
// If the expression has only one argument, `it` can be used as the argument directly.
val negate: (Int) -> Int = { -it }

println(add(1, 2)) // 3
println(subtract(1, 2)) // -1
println(negate(1)) // -1

// High Order functions can be created in Kotlin as follows
fun twice(f: (Int, Int) -> Int): (Int, Int) -> Int {
  return {a, b -> f(a, b) * 2}
}

val addTwice = twice(add)
println(addTwice(1, 2)) // 6
```

### Nullable types
Kotlin's type system by default does not allow variables to have null value. For
a variable to hold null, it must be explicitly specified as nullable. A variable
can be declared as nullable by appending `?` to its type.

```java
var nullableVar: String? = "foo" // Can be null
var nonNullableVar: String = "bar" // Cannot be null

nullableVar = null
nonNullableVar = null // compilation error

// Nullable Variables cannot be used directly
println(nonNullableVar.length) // 3
println(nullableVar.length) // error: variable 'nullableVar' can be null

// The value in the nullable type can be accessed using safe calls
// When this method is used, the statement returns null if the value is null
// hence, here the statement's return type is Int?
println(nullableVar?.length) // 3

// The value can also be accessed using Elvis operator
// When accessed with this operator, if the variable is null, then the value after
// the operator is returned
println(nullableVar?.length ?: -1) // 3

// The third option is `!!` operator. This operator resolves to default Java's
// behavior where when the variable is null, a NPE is thrown.
println(nullableVar!!.length) // 3
```

### Classes
Kotlin classes are declared using the `class` keyword. Kotlin classes can have an
optional primary constructor for which the declaration goes in the header.

```java
class Foo {
  ...
}

// Classes with primary constructor.
// The primary constructor is declared in the header itself
class Bar constructor(name: String) {
  ...
}

// If the primary constructor does not have any annotations or visibility modifiers, the constructor keyword can be omitted:
class Bar(name: String) {
  ...
}

// By default, all Kotlin classes are final and can be made inheritable using the open keyword
open class Base {}
class Derived : Base() {}

// The value to the super constructor can be passed from the primary constructor as follows
open class Base2(a: Int) {}
class Derived2(a: Int) : Base2(a) {}

// Objects in Kotlin are created directly without the new keyword like in swift and python
val base = Base()
```

### Data Class
Data Classes are special classes in Kotlin that are created to just hold data.
Data classes can be created as following

```java
data class User(val name: String, val age: Int)
val aravind = User("Aravind", 20)
println(aravind) // User(name=Aravind, age=20)

// Data classes in Kotlin can be initialized into separate variables using
// destructuring declarations, which is similar to Javascript(ES6)'s
// Destructuring assignment
val (name, age) = aravind
println("Hi, $name") // Hi, Aravind
```

### Singletons
Singleton classes can be created in Kotlin using the `object` keyword.

```java
object Example {
    fun foo(): String {
        return "Hello World!"
    }
}

println(Example.foo())
```

### Conditionals

```java

// Kotlin has no ternary operator(?:) and normal if statement is used as
// replacement
val max = if (a > b) a else b

// Kotlin uses `when` statement instead of switch
when (x) {
  0 -> println("0")
  1 -> println("1")
  2, 3 -> println("2 or 3")
  in 4..10 -> print("between 4 to 10")
  else -> println("> 10")
}

// Since single line functions in Kotlin can be declared with `=` symbol, functions
// can have `when` as their single statement
fun check(x: Int) = when(x) {
  0 -> println("0")
  1 -> println("1")
  2, 3 -> println("2 or 3")
  in 4..10 -> print("between 4 to 10")
  else -> println("> 10")
}

// The for statement in Kotlin works similar to python's for statement.
for (item in collection) print(item)

for(i in 0..9) {
    print(i) // 0123456789
}

// The other constructs such as while, do-while, break and continue are similar
// to most of the C-based languages.
```

### Collections
Kotlin does not have dedicated syntax constructs for creating lists or sets.
They are created using methods from its standard library. Moreover, Kotlin
distinguishes between mutable and immutable collections.

```java
// In the below examples, type need not be explicitly set but it is done for understanding

// Lists
val immutableList: List<Int> = listOf(1, 2, 3) // Created using `listof` function.
val mutableList: MutableList<Int> = mutableListOf(4, 5, 6) // Created using `mutableListOf` function.

println(immutableList) // [1, 2, 3]
println(immutableList.first()) // 1
println(immutableList.last()) // 3

mutableList.add(7)
println(mutableList) // [4, 5, 6, 7]

// Sets
val immutableSet: Set<Int> = setOf(1, 2, 3, 3, 3, 3, 3)
val mutableSet: MutableSet<Int> = mutableSetOf(1, 2, 3, 2, 4)

println(immutableSet) // [1, 2, 3]
println(immutableSet.contains(3)) // true

// Maps
val immutableMap: Map<String, Int> = mapOf("a" to 1, "b" to 2, "c" to 3)
val mutableMap: MutableMap<String, Int> = mutableMapOf("a" to 1, "b" to 2, "c" to 3)

println(immutableMap) // {a=1, b=2, c=3}
println(immutableMap["c"]) // 3

mutableMap["d"] = 4
println(immutableMap) // {a=1, b=2, c=3, d=4}
println(mutableMap["d"]) // 4
```

### Smart Casts
In Kotlin, the type of a variable can be check with `is` keyword. The cool
thing about this is that Kotlin tracks these is-checks and casts automatically
when needed.


```java
fun foo(x: Any) {
    if (x is String) {
        println(x) // x is automatically cast to String
    }
    if (x is Int) {
      println(x + 1) // x is automatically cast to Integer
    }
}

foo("hi") // hi
foo(3) // 4

// The above can be rewritten with when statement
fun bar(x: Any) = when(x) {
  is String -> println(x)
  is Int -> println(x + 1)
  else -> println("Error")
}

bar("hello") // Hello
bar(1.0) // Error
```

### Extension Functions
Kotlin allows extending a class with new functionality without
having to inherit from the class or use any type of design pattern such as
Decorator.

```java

fun String.appendWorld(): String {
  return this + " World" // this refers to the calling object
}

"Hello".appendWorld() // Hello World

```

--------------------------------------------------------------------------------

## Kotlin on Android
Since Kotlin is now a first-class language for Android, from Android Studio 3.0,
new projects can be generated with Kotlin as language and existing java files can
be transpiled to Kotlin easily.

![](/images/blog/kotlin_2.png)

Kotlin provides a special extension library for Android called as `kotlin-android-extensions`.
This extension provides synthetic properties to Android.

Using this extension, views with id in the Android layout can be directly accessed
using the id as a variable without using `findViewById()` method.

Secondly, this extension collapses getters and setters in the standard library
into properties. So, for example, to read or write text from a view, the `text`
property can be used instead of using getText() and setText(). The beautiful thing
about this is that it is still possible to use the getters and setters, and when
we use those, the IDE suggests to use the synthetic property's attribute.

kotlin-android-extensions can be added as a plugin to the build.gradle file:

```ruby
apply plugin: 'kotlin-android-extensions'
```

The ids in the layout can be imported as synthetic properties as follows:

```java
import kotlinx.android.synthetic.main.<layout>.*
```

For eg, if the layout has a text view with id `display`, it can be accessed as
follows:

```java
display.text = "Hello world!" // same as ((TextView) findViewById(R.id.display)).setText("Hello world!")
```

Below is the link to a simple calculator program that uses kotlin-android-extensions:
[https://github.com/AravindVasudev/Kalculator](https://github.com/AravindVasudev/Kalculator){:target="_blank"}

--------------------------------------------------------------------------------

## Important Links
Here are some links that helped me get through my day 1 of Kotlin:

  * Installation
    * [Android Studio Canary 1](https://developer.android.com/studio/preview/index.html){:target="_blank"}
    * [Kotlin Command Line Installation](https://kotlinlang.org/docs/tutorials/command-line.html){:target="_blank"}

  * Comparisons with
    * [Java](https://kotlinlang.org/docs/reference/comparison-to-java.html){:target="_blank"}
    * [Swift](http://nilhcem.com/swift-is-like-kotlin/){:target="_blank"}
    * [Swift](https://ragunathjawahar.wordpress.com/2015/03/18/my-first-ios-app-while-learning-kotlin-for-android/){:target="_blank"}
    * [Typescript](https://gi-no.github.io/kotlin-is-like-typescript/){:target="_blank"}

  * Tutorials
    * [Google IO '17](https://www.youtube.com/watch?v=X1RVYt2QKQE){:target="_blank"}
    * [learnxinyminutes.com](https://learnxinyminutes.com/docs/kotlin/){:target="_blank"}
    * [hackernoon.com](https://hackernoon.com/my-first-experiences-with-kotlin-b3fcf5e111f7){:target="_blank"}
    * [kotlinlang.org](https://kotlinlang.org/docs/reference/){:target="_blank"}

  * Kotlin Android extensions
    * [kotlinlang.org](https://kotlinlang.org/docs/tutorials/android-plugin.html){:target="_blank"}
    * [ragunathjawahar.wordpress.com](https://ragunathjawahar.wordpress.com/2015/03/23/kotlin-findviewbyid-dead-as-dinosaurs/){:target="_blank"}

  * Kotlin Android examples
    * [Calculator](https://github.com/AravindVasudev/Kalculator){:target="_blank"}
    * [developer.android.com](https://developer.android.com/samples/index.html?language=kotlin){:target="_blank"}

  * Kotlin on Web
    * [Spring support](https://spring.io/blog/2017/01/04/introducing-kotlin-support-in-spring-framework-5-0){:target="_blank"}
    * Frontend
      * [dzone.com](https://dzone.com/articles/kotlin-for-front-end-developers){:target="_blank"}
      * [kotlinlang.org](https://kotlinlang.org/docs/tutorials/javascript/working-with-javascript.html){:target="_blank"}

  * [Kotlin Native](https://blog.jetbrains.com/kotlin/2017/04/kotlinnative-tech-preview-kotlin-without-a-vm/){:target="_blank"}
  * [Google Blog](https://android-developers.googleblog.com/2017/05/android-announces-support-for-kotlin.html){:target="_blank"}

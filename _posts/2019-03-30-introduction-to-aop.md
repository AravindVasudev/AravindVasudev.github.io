---
title:  "Introduction to Aspect Oriented Programming"
date:   2019-03-30 00:00:00 +0530
categories: [aop]
tags: [aop]
---
In a medium to large codebase, many-a-time, you might notice code that doesn't belong there by design but is necessary. This can be anything from simple logging to transaction handling. As the codebase scales, this keeps adding up to a point where the code becomes laborious to manage.

![codebase on fire!](/images/blog/aop_1.png)

Aspect-Oriented Programming provides a way to modularize these kinds of cross-cutting concerns with _Aspects_. Here is a basic example,

```java
@Aspect
class LoggingAspect { // Aspect
    Logger LOGGER = Logger.getLogger(LoggingAspect.class.getName());

    @After("execution(* *(..))") // Pointcut
    void logExecutionAdvice(JoinPoint joinPoint) { // Advice
        LOGGER.info(joinPoint.getSignature().getName() + " executed");
    }
}
```

### Aspect
An Aspect is a special class that contains the cross-cutting concerns. In Java, this can be created using annotations, like as above, or by using the non-java aspect format.

### Pointcut
A pointcut is a special regex-like string that is used to specify where to inject your code. This can be any point in the program's execution (a.k.a the _joinpoint_). A Joinpoint could be a method-body, a method-call, an exception handler, a class, an object, etc.

### Advice
An advice contains the cross-cutting logic. Based on when to execute, it can be one of the below:

|      Advice Type | Description                                           |
| ---------------: | ----------------------------------------------------- |
|         _Before_ | Runs before the joinpoint's execution.                |
|          _After_ | Runs after the joinpoint's execution.                 |
| _AfterReturning_ | Runs after the successful execution of the joinpoint. |
|  _AfterThrowing_ | Runs after the joinpoint if it throws an exception.   |
|         _Around_ | Gives the before and after control to the advice.     |

Here is a more complex example that you might see in a production environment:

```java
@Aspect
class TransactionAspect {
    @Around("@annotation(com.example.Transaction)") // Injects to joinpoint with @Transaction annotation
    public Object transactionAdvice(ProceedingJoinPoint joinPoint) throws Throwable {
        Object result;
        try {
            TransactionManager.begin();
            Object result = joinPoint.proceed(); // execution returns to the joinpoint
            TransactionManager.commit();
        } catch (Exception e) {
            TransactionManager.rollback();
            throw e;
        }

        return result;
    }
}
```

The above example runs the `@Transaction` annotated methods in a transaction.

![TransactionAspect working](/images/blog/aop_2.svg)

### Weaving
Weaving is the process of injecting cross-cutting concerns into joinpoints. Based on when it is done, it is classified into of the following:

|         Weaving Type | Description                                                                                                                    |
| -------------------: | ------------------------------------------------------------------------------------------------------------------------------ |
|      Runtime Weaving | The advice is injected at runtime. Frameworks like Spring AOP use proxies to achieve this and are comparatively slower.        |
| Compile Time Weaving | The advice is injected during compilation. Frameworks like AspectJ have their own compiler to achieve this.                    |
|       Binary Weaving | The injection is done after compilation, i.e., into class/jar files.                                                           |
|    Load Time Weaving | The injection is done when the classes are loaded by the classloader. Frameworks like AspectJ use a javaagent to achieve this. |

Hope this gave you a basic idea of what AOP can do and all its terminologies. So long!

## References
- [Getting Started with AspectJ](https://www.eclipse.org/aspectj/doc/released/progguide/starting.html)
- [Spring AOP Vs AspectJ](https://www.baeldung.com/spring-aop-vs-aspectj)

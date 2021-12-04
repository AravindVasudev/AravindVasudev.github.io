---
title:  "Writing your first JSP and Servlet using Vim"
date:   2018-06-29 00:00:00 +0530
categories: [JavaBytes]
tags: [JavaBytes]
---

Moving to Java from scripting languages can be a tedious process. A lot of times, it is hard to understand what the IDE does in the background to serve our web application. Hence, I'm writing these quick bite-sized notes as I learn.

Servlets and JSPs run on a Servlet Container such as Apache Tomcat, Jetty, etc. When we write a Servlet in an IDE such as Eclipse, the IDE takes care of building the class and serving it. This note will help you write your first servlet without an IDE (you can even use notepad to follow along).

--------------------------------------------------------------------------------
## Setting up Vim for Java
To begin with, _Syntastic_ is good enough. you can try solutions like _Eclim_,
but I was recommended to move to IDEs once I pick up with the underlying basics 
since Java needs a lot of configuring and building process.

## Tomcat Structure
You can tomcat from [here](https://tomcat.apache.org/download-80.cgi). 

| Directory | Description |
|----------:|:------------|
| _bin_ | contains all tomcat related scripts such as shutdown, startup, etc. |
| _conf_ | contains tomcat configuration files such as _web.xml_ and _server.xml_. |
| _lib_ | contains tomcat required jars including _servlet-api.jar_. |
| _logs_ | all tomcat generated logs are stored here. |
| _temp_ | JVM writes temporary files here. |
| _work_ | stores compiled JSPs and other assests. |
| _webapps_ | contains all webapps deployed by tomcat. _.war_ files placed here are expanded automatically. |
| _WEB-INF_ | contains application related files that aren't served such as _web.xml_, _libraries_, and _servlet class files_. |

## Starting Tomcat
Once you have downloaded tomcat, you can start it by opening your command line/terminal 
in the directory and running `bin/startup.sh`. (`bin/startup.bat` for windows). 
Now tomcat is started in port _8080_.

Similarly, you can quit tomcat by running `bin/shutdown.sh` or `bin/shutdown.bat`.

## Serving JSPs
By default, your `webapps/ROOT` is served. replace the default `index.jsp` with the 
following:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Hello World</title>
</head>
<body>
    <%= "Hello World" %>
</body>
</html>
```

Since JSP files are automatically compiled by Tomcat, you do not need to restart 
the server.

## Compiling and Serving Servlets   
### Write a simple servlet class

```java
import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;

public class Hello extends HttpServlet {
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    response.setContentType("text/html");

    PrintWriter out = response.getWriter();
    out.println("<h1>Hello World</h1>");
    }
}
```

### Compile the servlet class
To compile the servlet class, you need to include `servlet-api.jar` to your 
_CLASSPATH_.

```php
export CLASSPATH=/path/to/tomcat/lib/servlet-api.jar
```
Move the generated _.class_ file to _WEB-INF/classes_.

### Add entry to deployment descriptor (web.xml)
Add the following between `<web-app>` in _WEB-INF/web.xml_:

```xml
<servlet>
<servlet-name>Hello</servlet-name>
<servlet-class>Hello</servlet-class>
</servlet>

<servlet-mapping>
<servlet-name>Hello</servlet-name>
<url-pattern>/hello</url-pattern>
</servlet-mapping>
```

Entry to _web.xml_ works like this:
* First add the servlet class with a name within `<servlet>`.
* Then map that servlet name to a URL within `<servlet-mapping>`.

### Restart tomcat

```php
./bin/shutdown.sh
./bin/startup.sh
```

That's it. Navigate to [http://localhost:8080/hello](http://localhost:8080/hello) to see your servlet. This 
note is the first in my JavaBytes series. Hope this had helped you to know 
what eclipse does under the hood.

So long!
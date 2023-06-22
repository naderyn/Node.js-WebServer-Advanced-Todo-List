# Node.jswebserver
Node.js webserver you can use it by Postman

![1](http://www.jonahnisenson.com/content/images/2018/10/postman-get1.png)


To use the app features using Postman, you can follow these examples:

Add a todo item:

Set the request method to POST.
Set the request URL to http://localhost:3000/todos.
Set the request body to JSON format, providing the necessary properties like name, status, time, and priority.
Send the request.
List todo items based on filters:

Set the request method to GET.
Set the request URL to http://localhost:3000/todos.
Add query parameters to the URL for filtering, such as name, status, or priority.
Send the request.
Update a todo item:

Set the request method to PUT.
Set the request URL to http://localhost:3000/todos/{id}, replacing {id} with the ID of the todo item you want to update.
Set the request body to JSON format, providing the properties you want to update, such as name, status, time, or priority.
Send the request.
Delete a todo item:

Set the request method to DELETE.
Set the request URL to http://localhost:3000/todos/{id}, replacing {id} with the ID of the todo item you want to delete.
Send the request.
Make sure to start the server by running the script, and then use Postman to send requests to the appropriate endpoints with the required data and parameters.

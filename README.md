# Что это?

 Тестовый проект - RESTful сервис хранения сведений о фильмах.

 Используемые технологии:
 - Nest.js
 - MongoDB

# Запуск

 1. Клонировать репозиторий и установить зависимости.
 2. Настроить MongoDB, проверить адрес подключения в *src\\app.module.ts*.
 3. Запустить сервис: `yarn start` / `npm run start`.

# Endpoints

 <details>
 <summary><h2>/movies</h2></summary>

  <details>
  <summary><h3>— GET /movies</h3></summary>

   <details>
   <summary><bold>——</bold> Пример запроса</summary>

   ```http
   GET /movies HTTP/1.1
   ```

   </details>

   <details>
   <summary><bold>——</bold> Пример ответа</summary>

   ```http
   200 OK

   {
       "message": "All movies data found successfully",
       "result": [
           {
               "id": "6495fb7f92363e4d61748694",
               "title": "Harry Potter",
               "description": "It's magic!"
           }
       ],
       "statusCode": 200
   }
   ```

   </details>

  </details>

  <details>
  <summary><h3>— GET /movies/<code>{{id}}</code></h3></summary>

   <details>
   <summary><bold>——</bold> Пример запроса</summary>

   ```http
   GET /movies/{{id}} HTTP/1.1
   ```

   </details>

   <details>
   <summary><bold>——</bold> Пример ответа</summary>

   ```http
   200 OK

   {
       "message": "Movie found successfully",
       "result": {
           "id": "6495fb7f92363e4d61748694",
           "title": "Harry Potter",
           "description": "It's magic!"
       },
       "statusCode": 200
   }
   ```

   </details>

  </details>

  <details>
  <summary><h3>— POST /movies</h3></summary>

   <details>
   <summary><bold>——</bold> Пример запроса</summary>

   ```http
   POST /movies HTTP/1.1
   Authorization: Bearer {{access_token}}

   {
    "title": "Harry Potter",
    "description": "It's magic!"
   }
   ```

   </details>

   <details>
   <summary><bold>——</bold> Пример ответа</summary>

   ```http
   201 Created

   {
       "message": "Movie has been created successfully",
       "result": {
           "id": "6495fb7f92363e4d61748694",
           "title": "Harry Potter",
           "description": "It's magic!"
       },
       "statusCode": 201
   }
   ```

   </details>

   <details>
   <summary><bold>——</bold> Пример ответа при некорректном <code>access_token</code></summary>

   ```http
   {
       "message": "Unauthorized",
       "statusCode": 401
   }
   ```

   </details>

  </details>

  <details>
  <summary><h3>— PUT /movies/<code>{{id}}</code></h3></summary>

   <details>
   <summary><bold>——</bold> Пример запроса</summary>

   ```http
   PUT /movies/{{id}} HTTP/1.1
   Authorization: Bearer {{access_token}}

   {
       "description": "It's magic! More magic!"
   }
   ```

   </details>

   <details>
   <summary><bold>——</bold> Пример ответа</summary>

   ```http
   200 OK

   {
       "message": "Movie has been successfully updated",
       "result": {
           "id": "6495fb7f92363e4d61748694",
           "title": "Harry Potter",
           "description": "It's magic! More magic!"
       },
       "statusCode": 200
   }
   ```

   </details>

   <details>
   <summary><bold>——</bold> Пример ответа при некорректном <code>access_token</code></summary>

   ```http
   {
       "message": "Unauthorized",
       "statusCode": 401
   }
   ```

   </details>

  </details>

  <details>
  <summary><h3>— DELETE /movies/<code>{{id}}</code></h3></summary>

   <details>
   <summary><bold>——</bold> Пример запроса</summary>

   ```http
   DELETE /movies/{{id}} HTTP/1.1
   Authorization: Bearer {{access_token}}
   ```

   </details>

   <details>
   <summary><bold>——</bold> Пример ответа</summary>

   ```http
   200 OK

   {
       "message": "Movie deleted successfully",
       "result": {
           "id": "6495fb7f92363e4d61748694",
           "title": "Harry Potter",
           "description": "It's magic! More magic!"
       },
       "statusCode": 200
   }
   ```

   </details>

   <details>
   <summary><bold>——</bold> Пример ответа при некорректном <code>access_token</code></summary>

   ```http
   {
       "message": "Unauthorized",
       "statusCode": 401
   }
   ```

   </details>

  </details>

 </details>

 <details>
 <summary><h2>/auth</h2></summary>

  <details>
  <summary><h3>— POST /auth/sign-up</h3></summary>

   <details>
   <summary><bold>——</bold> Пример запроса</summary>

   ```http
   POST /auth/sign-up HTTP/1.1

   {
       "login": "login",
       "username": "user",
       "password": "pass"
   }
   ```

   </details>

   <details>
   <summary><bold>——</bold> Пример ответа</summary>

   ```http
   201 Created

   {
       "message": "Account has been created successfully",
       "result": {
           "login": "login",
           "username": "user"
       },
       "statusCode": 201
   }
   ```

   </details>

   <details>
   <summary><bold>——</bold> Пример ответа в случае, если <code>login</code> или <code>username</code> заняты</summary>

   ```http
   400 Bad Request

   {
       "message": "Login or username exists",
       "error": "Bad Request",
       "statusCode": 400
   }
   ```

   </details>

  </details>

  <details>
  <summary><h3>— POST /auth/login</h3></summary>

   <details>
   <summary><bold>——</bold> Пример запроса</summary>

   ```http
   POST /auth/login HTTP/1.1

   {
       "login": "login",
       "password": "pass"
   }
   ```

   </details>

   <details>
   <summary><bold>——</bold> Пример ответа</summary>

   ```http
   200 OK

   {
       "message": "Login completed successfully",
       "result": {
           "access_token": "{{access_token}}"
       },
       "statusCode": 200
   }
   ```

   </details>

   <details>
   <summary><bold>——</bold> Пример ответа, если пользователь не найден или пароль не совпал</summary>

   ```http
   401 Unauthorized

   {
       "message": "Unauthorized",
       "statusCode": 401
   }
   ```

   </details>

  </details>

  <details>
  <summary><h3>— GET /auth/me</h3></summary>

   <details>
   <summary><bold>——</bold> Пример запроса</summary>

   ```http
   GET /auth/me HTTP/1.1
   Authorization: Bearer {{access_token}}
   ```

   </details>

   <details>
   <summary><bold>——</bold> Пример ответа</summary>

   ```http
   200 OK

   {
       "message": "OK",
       "result": {
           "login": "login",
           "username": "user"
       },
       "statusCode": 200
   }
   ```

   </details>

   <details>
   <summary><bold>——</bold> Пример ответа при некорректном <code>{{access_token}}</code></summary>

   ```http
   401 Unauthorized

   {
       "message": "Unauthorized",
       "statusCode": 401
   }
   ```

   </details>

  </details>

 </details>

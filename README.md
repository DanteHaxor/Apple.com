
# Pear.com

Pear is a clone of Apple.com which is an American multinational technology company headquartered in Cupertino, California, United States.

## Features

- Authentication
- Authorization
- Responsive
- Cross platform


## Tech Stack

**Client:** HTML, CSS, Javascript 

**Server:** Node, Express


## Run Locally

Clone the project

```bash
  git clone https://github.com/DanteHaxor/aromatic-desk-2443
```

Go to the project directory

```bash
  cd aromatic-desk-2443
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  node app.js
```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`key`

`mongourl`

`PORT`


## API Reference

#### Welcome

```http
  GET /api
```
#### User Register

```http
  POST /api/user/register
```
#### User Login

```http
  POST /api/user/login
```
#### Admin Register

```http
  POST /api/admin/register
```
#### Admin Login

```http
  POST /api/admin/login
```
#### All Products

```http
  GET /api/products/
```
#### Add Products

```http
  POST /api/products/addproduct
```
#### Update Products

```http
  PATCH /api/products/update/:id
```
#### Delete Products

```http
  DELETE /api/products/delete/:id
```

## Screenshots

![App Screenshot](https://i.imgur.com/NIW25IN.jpeg)
![App Screenshot](https://i.imgur.com/gIZtuhv.jpeg)
![App Screenshot](https://i.imgur.com/Gqs21cN.jpeg)



## Demo
https://pear-z5ta.onrender.com/
## Authors

- [@DanteHaxor](https://github.com/DanteHaxor)


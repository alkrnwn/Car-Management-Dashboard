# ERD
<img src="https://user-images.githubusercontent.com/89620643/194465977-5aa5f5bb-3893-4ce7-9b2b-856aea85ab4a.png" width="420"/>

# Page
- Dashboard Page (GET)  = http://localhost:3000
- Input Page (GET) = http://localhost:3000/add
- Edit Page (GET) = http://localhost:3000/edit/ ```req.params.id```
- Filter Page (GET) = http://localhost:3000/filter?size= ```req.query.size```
- Search Page (GET) = http://localhost:3000/search?name= ```req.query.name```

# API

> ### Create car data (POST)
>  http://localhost:3000/api/v1/add

- request-body 
```
 url : http://localhost:3000/api/v1/add
 method : POST
```


- response-body 
```
{"message": "added"}
```

> ### Read all car data (GET)
> http://localhost:3000/api/v1/getall
- request-body
```
 url : http://localhost:3000/api/v1/getall
 method : GET
```
- response-body 
```
[
    {
        "id": 7,
        "name_car": "Sdfsdf",
        "price": "Rp. 21",
        "photo": "photo-1665127434131-984422856.jpg",
        "id_car_size": 1,
        "size": {
            "id": 1,
            "car_size": "Small",
        }
    },
    {
        "id": 8,
        "name_car": "Pajero Sport ",
        "price": "Rp. 1.000.000",
        "photo": "photo-1665129168030-603374137.jpeg",
        "id_car_size": 3,
        "size": {
            "id": 3,
            "car_size": "Large",
        }
    }
]
```
> ### Read one car data (GET) 
> http://localhost:3000/api/v1/getby/ ```req.params.id```
- request-body
```
 url : http://localhost:3000/api/v1/getby/8
 method : GET
```
- response-body 
```
{
    "id": 8,
    "name_car": "Pajero Sport ",
    "price": "Rp. 1.000.000",
    "photo": "photo-1665129168030-603374137.jpeg",
    "id_car_size": 3,
    "size": {
        "id": 3,
        "car_size": "Large",
    }
}
```

> ### Update car data (POST)
> http://localhost:3000/api/v1/update/ ```req.params.id```

- request-body 
```
 url : http://localhost:3000/api/v1/update/7
 method : POST
```


- response-body 
```
{"message": "updated"}
```

> ### Delete car data (POST)
> http://localhost:3000/api/v1/delete/ ```req.params.id```

- request-body 
```
 url : http://localhost:3000/api/v1/delete/7
 method : POST
```
- response-body 
```
{"message": "deleted"}
```

> ### Create size data (POST)
> http://localhost:3000/api/v1/addSize

- request-body 
```
 url : http://localhost:3000/api/v1/addSize
 method : POST
{
  "car_size": "Ultra Large"
}
```
- response-body 
```
{"message": "deleted"}
```

> ### Read size data (GET)
> http://localhost:3000/api/v1/addSize

- request-body 
```
 url : http://localhost:3000/api/v1/getSize
 method : GET
```
- response-body 
```
[
    {
        "id": 1,
        "car_size": "Small",
    },
    {
        "id": 2,
        "car_size": "Medium",
    },
    {
        "id": 3,
        "car_size": "Large",
    },
    {
        "id": 6,
        "car_size": "Ultra Large",
    }
]
```

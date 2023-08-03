const express = require ('express')
const uuid = require('uuid')
const port = 3001
const app = express ()
app.use(express.json())


const users = []  //numca utilizar

const checkId = (request, response, next) =>{
    const {id} = request.params

    const index = users.findIndex(user =>user.id ===id)

    if(index < 0 ){
        return response.status(404).json({message: "user not found"})
    }

    request.userIndex = index
    request.userId= id

    next()
}

const checkurl = (request, response, next)=>{
    const method = request.method

    const url = request.url

    console.log(`[${method} - ${url}]`)
    
    next()
}

app.get('/users',checkurl, (request, response)=>{     //USUARIOS
    return response.json(users)
})

app.post('/users',checkurl, (request, response)=>{       //ADICIONAR USUARIOS
    const { order, clientName, prince, status } = request.body
    
    const user = { id:uuid.v4(), order, clientName, prince, status } 

    users.push(user)

    return response.status(201).json(user)
})

app.put('/users/:id',checkId,checkurl, (request, response)=>{   //ATUALIZAR USUARIOS
    
    const  { order, clientName, prince, status } =request.body
    const index = request.userIndex
    const id = request.userId

    const updatUser = {id,order, clientName, prince, status  }


    users[index] = updatUser
    return response.json(updatUser)
})

app.delete('/users/:id',checkId,checkurl, (request, response)=>{     //DELETAR
    const index = request.userIndex

    users.splice(index,1)
    
    return response.status (204).json(users)
})
app.get('/users/:id', checkId,checkurl, (request, response)=>{     //USUARIOS
    const  index = request.userIndex

    const check = users[index]
    
    return response.json(check)
})

app.patch('/users/:id', checkId,checkurl, (request, response)=>{  

    const index = request.userIndex

    const findOrder =users[index]

    findOrder.status = "Pronto"

    return response.json(findOrder)


})

app.listen(port, () =>{
    console.log(`serve started ${port}`)
})


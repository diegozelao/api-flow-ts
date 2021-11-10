import { resolve } from "path/posix"

const users = [
  {
    id: '1',
    name: 'Peter Paker',
    email: 'peter@marvel.com'
  },
  {
    id: '2',
    name: 'Bruce Wayne',
    email: 'bruce@dc.com'
  }
]

export class User {
  static findAll(): Promise<any[]>{
    return Promise.resolve(users)
  }
  static findById(id: string): Promise<any>{
    return new Promise(resolve=>{
      const filtrado = users.filter(user=> user.id === id)
      let user = undefined
      if(filtrado.length > 0){
        user = filtrado[0]
      }
      resolve(user)
    })
  }
}

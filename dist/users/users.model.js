"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
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
];
class User {
    static findAll() {
        return Promise.resolve(users);
    }
    static findById(id) {
        return new Promise(resolve => {
            const filtrado = users.filter(user => user.id === id);
            let user = undefined;
            if (filtrado.length > 0) {
                user = filtrado[0];
            }
            resolve(user);
        });
    }
}
exports.User = User;

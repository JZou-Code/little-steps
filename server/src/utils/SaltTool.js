const argon2 = require('argon2');

export class SaltTool{
    options = {
        type: argon2.argon2id,
        // 16 MiB
        memoryCost: 2 ** 14,
        timeCost:   3,
        parallelism: 1,
    };

    async hash(password){
        return argon2.hash(password, this.options);
    }

    async verify(hashPwd, plainPwd){
        return argon2.verify(hashPwd, plainPwd);
    }
}
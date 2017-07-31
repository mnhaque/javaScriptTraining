function createSecretHolder(secret) {
    var local = secret;
    return {
        getSecret: function () {
            return local;
        },
        setSecret: function (secret) {
            local = secret;
        }
    }
}

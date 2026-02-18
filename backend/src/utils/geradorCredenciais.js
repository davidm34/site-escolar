function gerarLogin(nome) {
    if (!nome) return null;

    const partesNome = nome.toLowerCase().trim().split(/\s+/);
    const loginBase = partesNome.length > 1 
        ? `${partesNome[0]}.${partesNome[partesNome.length - 1]}` 
        : partesNome[0];

    return `${loginBase}${Math.floor(100 + Math.random() * 900)}`;
}

function gerarSenha(tamanho = 6) {
    const caracteres = 'abcdefghijkmnopqrstuvwxyz23456789';
    let senhaAleatoria = '';

    for (let i = 0; i < tamanho; i++) {
        senhaAleatoria += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }

    return senhaAleatoria;
}

module.exports = {
    gerarLogin,
    gerarSenha
};
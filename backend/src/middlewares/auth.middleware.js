const jwt = require('jsonwebtoken');

function autenticar(req, res, next) {
    const authHeader = req.headers.authorization;

    // Verifica se o token foi enviado
    if (!authHeader) {
        return res.status(401).json({ erro: 'Token não fornecido' });
    }

    // Espera formato: Bearer TOKEN
    const [type, token] = authHeader.split(' ');

    if (type !== 'Bearer' || !token) {
        return res.status(401).json({ erro: 'Formato de token inválido' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT);

        // Disponibiliza os dados para as próximas camadas
        req.usuario = {
            id: decoded.id,
            cargo: decoded.cargo
        };

        next();
    } catch (err) {
        return res.status(401).json({ erro: 'Token inválido ou expirado' });
    }
}

module.exports = autenticar;

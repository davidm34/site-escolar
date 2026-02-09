function permitir(...cargosPermitidos) {
    return (req, res, next) => {
        const { cargo } = req.usuario;

        if (!cargo) {
            return res.status(403).json({ erro: 'Cargo não identificado' });
        }

        if (!cargosPermitidos.includes(cargo)) {
            return res.status(403).json({ erro: 'Acesso negado' });
        }

        next();
    };
}

module.exports = permitir;

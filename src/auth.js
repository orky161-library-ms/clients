const axios = require("axios")

const auth_mw =  (req, res, next) => {
    axios.get(`http://${process.env.AUTH_SERVICE}/api/auth/verify`,{headers: req.headers}).then(res =>{
        req.decoded = {};
        req.decoded.email = res.data.decoded.email;
        req.decoded.id = res.data.decoded.id;
        req.decoded.role = res.data.decoded.role;
        next();

    }).catch(e =>{
        // console.log(e)
        return res.status(401).json({
            message: 'Auth failed',
        });
    })
};

const permission_mw = (role) => (req, res, next) => {
    if (req.decoded.role === role) {
        next();
        return;
    }
    return res.status(401).json({
        message: 'Permission denied',
    });
};

const equalId_mw = (field = "id") => (req, res, next) => {
    if(req.decoded.role === "ADMIN"){
        next();
        return;
    }

    if (req.params[field] === req.decoded[field]) {
        next();
        return;
    }
    return res.status(401).json({
        message: 'Permission denied',
    });
};

module.exports= {
    auth_mw,
    permission_mw,
    equalId_mw
}

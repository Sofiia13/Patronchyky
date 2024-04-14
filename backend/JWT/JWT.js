const {sign, verify} = require('jsonwebtoken');

const createToken = (user)=>{
    let accType = undefined;
    if(user.tasks == undefined){
         accType = "user";
    }
    else{
         accType = "org"; 
    }
    const accessToken = sign({id: user._id ,accType: accType },  "passwordThatWeNeedtoChange");
    return accessToken;
};

const validateTokenForUser = (req, res, next)=>{
    const accessToken = req.cookies["access-token"];
    if(!accessToken){
        return res.status(400).json({error: "Користувач не має токена"});
    }
    const validToken = verify(accessToken, "passwordThatWeNeedtoChange");
    
    if(!validToken) {
        return res.status(400).json({error: "Некоректний токен"});
    }    

    const decoded = verify(accessToken, "passwordThatWeNeedtoChange");
    if(decoded.accType == "org"){
        return res.status(400).json({error: "Некоректний тип користувача"});
    }

    return next();
};


const validateTokenForOrg = (req, res, next)=>{
    const accessToken = req.cookies["access-token"];
    if(!accessToken){
        return res.status(400).json({error: "Користувач не має токена"});
    }
    const validToken = verify(accessToken, "passwordThatWeNeedtoChange");
    
    if(!validToken) {
        return res.status(400).json({error: "Некоректний токен"});
    }    

    const decoded = verify(accessToken, "passwordThatWeNeedtoChange");
    if(decoded.accType == "user"){
        return res.status(400).json({error: "Некоректний тип користувача"});
    }

    return next();
};

const validateTokenForLogged = (req, res, next)=>{
    const accessToken = req.cookies["access-token"];
    if(accessToken){
        return res.status(400).json({error: 'Користувач є залогіненим'});
    } 
    return next();
};

const validateToken = (req, res, next)=>{
    const accessToken = req.cookies["access-token"];
    if(!accessToken){
        return res.status(400).redirect('/api/login');
    }
    const validToken = verify(accessToken, "passwordThatWeNeedtoChange");
    
    if(!validToken) {
        return res.status(400).json({error: "Некоректний токен"});
    }    
    return next();
};

module.exports= {
    createToken,
    validateToken,
    validateTokenForUser,
    validateTokenForLogged,
    validateTokenForOrg
};
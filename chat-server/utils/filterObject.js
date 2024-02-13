const filterObject = (obj,...allowedFields)=>{
    const newObj = {};
    Object.keys(obj).forEach((e)=>{
        if(allowedFields.includes(e)) newObj[e] = obj[e];
    });
}

module.exports = filterObject;
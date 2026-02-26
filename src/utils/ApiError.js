class ApiError extends Error{
    constructor(
        StatusCode,
        message="something is wrong",
        errors=[],
        statck=""
        
    ){ // override of the methods 
        super(message)
        this.StatusCode=StatusCode
        this.data=null
        this.message=message
        this.sucess=false
        this.errors=errors

    }
}


export {ApiError}
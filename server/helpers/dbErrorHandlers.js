/* 
The validation constraints that are added to the user schema fields will throw error messages if
they're violated when user data is saved to the database. To handle these validation errors and
other errors that the database may throw when we make queries to it, we will define a helper
method that will return a relevant error message that can be propagated in the request-response
cycle as appropriate. 

*/

const getErrorMessage = (err) => {
    let message = ''
    if (err.code) {
        switch (err.code) {
            case 11000:
            case 11001:
                message = getUniqueErrorMessage(err)
                break
            default:
                message = 'Something went wrong'
        }
    } else {
        for (let errName in err.errors) {
            if (err.errors[errName].message) {
                message = err.errors[errName].message
            }
        }
    }
    return message
}

const getUniqueErrorMessage = (err) => {
    let output
    try {
        let filedName = err.message.substring(err.message.lastIndexOf('.$') + 2,
        err.message.lastIndexOf('_1'))
        output = filedName.charAt(0).toUpperCase() + filedName.slice(1) + ' already exists'
    } catch (error) {
        output = 'Unique field already exists'
    }
    return output
}

export default getErrorMessage
import express from 'express'
import cors from 'cors'

const app = express();

app.use(cors())
app.use(express.json())


app.post('/', (req, res, next) => {
    //Set variables
    let operationType = req.body.operation_type
    let integerX = (req.body.x)
    let integerY = (req.body.y)
    let result;

    //valid operations
    const operations = ['addition', 'subtraction', 'multiplication']

    //bonus task handler array - contains base words for the expected operations and thier different variations in english
    const specialTerms = ['add', 'sum', 'plus', 'difference', 'subtract', 'remove', 'take-away', 'take away', 'multipl', 'product', 'times']

    //Checks for invalid operation type - falsy value entries
    if (!operationType) {
        res.status(400).json({
            status: 'fail',
            message: "Invalid operation type"
        })
        return
    }
    //Ensures that value entered is of type number and is an integer
    if (typeof integerX !== 'number' || typeof integerY !== 'number' || !Number.isInteger(integerX) || !Number.isInteger(integerY)) {
        res.status(400).json({
            status: 'fail',
            message: 'One of the values entered is not an integer'
        })
        return
    }
    //This block checks for case where a phrase is entered in operation_type field - Attempts to parse said string
    if (!operations.includes(operationType)) {
        let which = ''
        let specTerm = specialTerms.some((each) => {
            if (operationType.includes(each)) which = each;
            return operationType.includes(each)
        })
        // console.log(specTerm)
        if (specTerm) {
            // console.log(specialTerms.indexOf(which))
            let opType = specialTerms.indexOf(which)
            if (opType === 0 || opType === 1 || opType === 2) operationType = 'addition'
            else if (opType === 8 || opType === 10 || opType === 9) operationType = 'multiplication'
            else operationType = 'subtraction'
        }
    }

    //Perform operation based on validated input
    if (operations.indexOf(operationType) === 0) result = integerX + integerY
    else if (operations.indexOf(operationType) === 1) result = integerX - integerY
    else if (operations.indexOf(operationType) === 2) result = integerX * integerY
    else {
        res.status(400).json({
            status: 'fail',
            message: 'Operation type cannot be parsed by server'
        })
        return
    }

    //Return results
    res.status(200).json({
        slackUsername: 'Tommy',
        result,
        operation_type: operationType

    })
})


const port = process.env.PORT || 9000
const server = app.listen(port, () => {
    console.log(`App is running on port ${port}`)
})
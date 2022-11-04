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

    //bonus task handler array
    // const specialTerms = ['add', 'sum', 'difference', 'subtract', 'take-away', 'take away', 'multiply', 'product', ]

    //The two if blocks below validate that the entry is expected and sends back a response if not
    if (!operationType || !operations.includes(operationType)) {
        res.status(400).json({
            status: 'fail',
            message: "Invalid operation type"
        })
        return
    }
    if (typeof integerX !== 'number' || typeof integerY !== 'number' || !Number.isInteger(integerX) || !Number.isInteger(integerY)) {
        res.status(400).json({
            status: 'fail',
            message: 'One of the values entered is not an integer'
        })
        return
    }
    // if (!operations.includes(operationType)) {
    //     let which = ''
    //     let specTerm = specialTerms.some((each, index) => {
    //         if( operationType.includes(each)){
    //             which = each;

    //         }
    //     })
    //     if (specTerm) {
    //         console.log(specialTerms.indexOf(specTerm))
    //         if (specialTerms.indexOf(specTerm) === 0 || specialTerms.indexOf(specTerm) === 1) operationType = 'addition'
    //         else if (specialTerms.indexOf(specTerm) === 6 || specialTerms.indexOf(specTerm) === 7) operationType = 'multiplication'
    //         else operationType = 'subtraction'
    //     }
    // }

    //Perform operation based on validated input
    if (operations.indexOf(operationType) === 0) result = integerX + integerY
    else if (operations.indexOf(operationType) === 1) result = integerX - integerY
    else result = integerX * integerY

    //Return results
    res.status(200).json({
        slackUsername: 'Tommy',
        operation_type: operationType,
        result
    })
})


const port = process.env.PORT || 9000
const server = app.listen(port, () => {
    console.log(`App is running on port ${port}`)
})
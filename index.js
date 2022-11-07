// Your code here
function createEmployeeRecord(arr){

const employee = {
    firstName: arr[0],
    familyName: arr[1],
    title: arr[2],
    payPerHour: arr[3],
    timeInEvents: [],
    timeOutEvents: []
}

return employee
}

function createEmployeeRecords(arr){
    const arrayOfEmployees = []

    for(let i = 0; i < arr.length; i++){
       arrayOfEmployees.push(createEmployeeRecord(arr[i]))
    }

    return arrayOfEmployees
}

//Created a function to split date and time
function splitTimeIn(timeIn){
    return timeIn.split(" ")
}

function createTimeInEvent(empObj, dateString){
    const timeInData = splitTimeIn(dateString)//Array of date and time, looks like => [(2014-02-28), (1400)]
    const timeInEvent = {
        type: 'TimeIn',
        hour: parseInt(timeInData[1]),
        date: timeInData[0]
    }

    empObj.timeInEvents.push(timeInEvent)
    return empObj
}


function splitTimeOut(timeOut){
    return timeOut.split(" ")
}

function createTimeOutEvent(empObj, dateString){
    const timeOutData = splitTimeOut(dateString)//Array of date and time, looks like => [(2014-02-28), (1400)]
    const timeOutEvent = {
        type: 'TimeOut',
        hour: parseInt(timeOutData[1]),
        date: timeOutData[0]
    }

    empObj.timeOutEvents.push(timeOutEvent)
    return empObj
}

function findWorkOnDate(timeEventsOfEmployee, date){
    const timeEvent = timeEventsOfEmployee.find(timeEvent => timeEvent.date === date)
    return timeEvent
}

function hoursWorkedOnDate(empObj, dateString){
   const timeInEvent = findWorkOnDate(empObj.timeInEvents,dateString)
   const timeOutEvent = findWorkOnDate(empObj.timeOutEvents,dateString)

   const duration = (timeOutEvent.hour - timeInEvent.hour)/100
   return duration
}

function wagesEarnedOnDate(empObj, dateString){
    const payOwed = (empObj.payPerHour * (hoursWorkedOnDate(empObj,dateString)))
    return payOwed
}


function allWagesFor(employee) {
    const dates = employee.timeInEvents.map(timeInEvent => timeInEvent.date); //Array of dates by given employee

    let allWages = 0;

    dates.forEach(date => {
        allWages = allWages + wagesEarnedOnDate(employee, date);
    });

    return allWages;
}

function calculatePayroll(arrayOfEmployees){
    let allWages = 0
    arrayOfEmployees.forEach(employee => {
        allWages = allWages + allWagesFor(employee)
    })

    return allWages
}
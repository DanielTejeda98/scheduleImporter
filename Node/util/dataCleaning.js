//Utility to clean up data and return arrays

//Takes in Data parameter, returns the start time of a shift.
function getStartTimes(data) {
  //data comes in form month/day : start time - end time
  shiftArray = []
  shiftStarts = []
  let index = 0
  shiftArray = data.split("\n")
  shiftArray.forEach(shift => {
    if(!shift.includes('Not Scheduled'))
    {
      shiftStarts[index] = shift.substring(shift.indexOf(":") + 1, shift.lastIndexOf("-")).trim()
      index++
    }
    else
    {
      shiftStarts[index] = 'NA'
      index++
    }
  });

  return shiftStarts
}
//Takes in Data parameter, returns the end time of a shift.
function getEndTimes(data) {
  //data comes in form month/day : start time - end time
  shiftArray = []
  shiftEnd = []
  let index = 0
  shiftArray = data.split("\n")
  shiftArray.forEach(shift => {
    if(!shift.includes('Not Scheduled'))
    {
      shiftEnd[index] = shift.substring(shift.indexOf("-") + 1).trim()
      index++
    }
    else
    {
      shiftEnd[index] = 'NA'
      index++
    }
  });

  return shiftEnd
}
//Takes in Data parameter, returns the dates in the data.
function getDates(data) {
  shiftArray = []
  shiftDates = []
  let index = 0
  shiftArray = data.split("\n")
  shiftArray.forEach(shift =>
    {
      //TODO: Get information on the year of the schedule and add it to the date information

      //TODO: Handle Year changes (A week that has December and January)
        //if index !7 month == 12 and day == 31, add 1 to the year for the following indexes

      shiftDates[index] = shift.substring(0, shift.indexOf(':')).trim()
      index++
    })

    return shiftDates
}

module.exports = {
  getStartTimes,
  getEndTimes,
  getDates
}
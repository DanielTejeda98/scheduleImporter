const express = require('express')
const { getStartTimes, getEndTimes, getDates } = require('./util/dataCleaning')

const app = express()

app.use(express.static('./public'))

app.use(express.json())

app.get('/api/v1/getSchedule', (req, res) =>
{
  console.log(`Get schedule called with username and password ${req.body.username} ${req.body.password}!`)
  const spawn = require("child_process").spawn
  const pythonProcess = spawn('python', ["../PythonScripts/scraper.py", req.body.username, req.body.password])
  console.log("PythonProsses started!")
  getData()

  function getData() {
    pythonProcess.stdout.on('data', (data) =>
    {
      data = data.toString()
      console.log(data + '\n')
      //Check if we found the end of the data
      if(data.includes('ENDOFDATA'))
      {
        //Clean up the data
        data = data.substring(data.indexOf("STARTOFDATA\n") + 13, data.lastIndexOf("\nENDOFDATA"))
        console.log(data)
        res.json({dates: getDates(data), startTimes: getStartTimes(data), endTimes: getEndTimes(data)})
      }
      else 
      {
        //Recursively call getData if ENDOFDATA delimiter is not found
        getData()
      }
    })
  }
})

app.get('/test', (req, res) =>
{
  console.log("TEST CALLED")
  res.send("this is a test")
})


app.listen(8001, console.log("server online..."))
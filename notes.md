USER EXPERIENCE

1. Visit App
2. Click button to open risk survey
  a. Fill out risk survey (5 q's)
  b. On Submit, add each answer to the user object stored on the client
3. Show input with investment % question & text explaining
  a. on submit, add to user object
4. Change text with new input asking for company ticker
  a. on submit, add ticker to user object
  b. post request to server with user obj

var sendToServer = {
  surveyResults: [],
  fractionOfWealth: 0.5,
  ticker: 'string'
};

5. When the server successfully sends a response
  a. Display a table with metrics.
  b. If time, explainations on MPT















<-------------DONE-------------->
Server side
1. Get user obj - DONE
2. Check ticker against db - DONE
  a. if there, return correlation - DONE
  b. if not, compute save & return - DONE
3. Compute metrics of this format - DONE

{
  riskyAsset: Number,
  bond: Number,
  financialMean: Number,
  financialStd: Number,
  totalWealthMean: Number,
  totalWealthSD: Number,
  riskAversion: Number,
  correlation: Number,
  fractionOfWealth: Number
}

4. Send this object as the response - DONE


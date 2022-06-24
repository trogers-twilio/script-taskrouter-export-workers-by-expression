# script-taskrouter-export-workers-by-expression

# Pre-requisites
Node.js, preferably a LTS release. This script was tested using Node.js version 14.18.1
 
# Setup
1. Clone the repository, open a terminal, and change to the repo directory
2. Run `npm install`
3. Copy or rename `.env.sample` to `.env`
4. Edit the `.env` file with the appropriate values for the target Twilio account

# Using the script
To run the script, simply use the command:

```bash
node index.js
```

To limit the worker export to only workers matching a target worker expression:

1. Open the `index.js` file
2. Find the portion of the code executing the `client.taskrouter.workspaces(TASKROUTER_WORKSPACE_SID).workers.list` request
3. Uncomment the `targetWorkersExpression` property of that request's parameter
4. Change the `targetWorkersExpression` property value to the desired query. You can learn more about expression syntax from the article [Using TaskRouter Expressions](https://www.twilio.com/docs/taskrouter/expression-syntax)
5. Save the changes to `index.js` and run the script again

The exported workers are stored in a CSV file in the same directory as the script.


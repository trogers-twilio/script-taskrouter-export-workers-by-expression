# script-taskrouter-export-workers-by-expression

## Pre-requisites

Node.js, preferably a LTS release. This script was tested using Node.js version 16.18.1

## Setup

1. Clone the repository, open a terminal, and change to the repo directory
2. Run `npm install`
3. Copy or rename `.env.sample` to `.env`
4. Edit the `.env` file with the appropriate values for the target Twilio account
5. Copy or rename `config.sample.js` to `config.js`
6. Edit the `config.js` file with the desired values (see below for more details on each property)

## Config.js Properties

| Property Name            | Description                                                                                                                                                                                                                                             |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| csvFilenamePrefix        | String value to use as the start of the CSV filename                                                                                                                                                                                                    |
| outputDirectory          | Name of the directory to put any files created by the script                                                                                                                                                                                            |
| targetWorkersExpression  | Expression for filtering which workers are retrieved. An expression of '' will return all workers. Learn more about possible expressions in the [Taskrouter Expression Syntax Documentation](https://www.twilio.com/docs/taskrouter/expression-syntax). |
| workerAttributesToExport | Worker attribute JSON properties to include as separate columns in CSV                                                                                                                                                                                  |
| workerPropertiesToExport | Properties of the TaskRouter worker to include as separate columns in CSV                                                                                                                                                                               |

## Using the script

To run the script, simply use the command:

```bash
node index.js
```

The exported workers are stored in a CSV file in the directory defined in the `outputDirectory` property in the `config.js` file.

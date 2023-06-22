module.exports = {
  // String value to use as the start of the CSV filename
  csvFilenamePrefix: 'workers',
  // Name of the directory to put any files created by the script
  outputDirectory: 'output',
  // Expression for filtering which workers are retrieved. An expression
  // of '' will return all workers. https://www.twilio.com/docs/taskrouter/expression-syntax
  targetWorkersExpression: '',
  // Worker attribute JSON properties to include as separate columns in CSV
  workerAttributesToExport: [
    'full_name',
    'location',
    'routing.skills',
  ],
  // Properties of the TaskRouter worker to include as separate columns in CSV
  workerPropertiesToExport: [
    'sid',
    'friendlyName',
    'dateCreated',
  ]
}
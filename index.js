const Twilio = require('twilio');
const moment = require('moment');
const { parse } = require('json2csv');
const { writeFile } = require('node:fs/promises');
require('dotenv').config();

const {
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  TASKROUTER_WORKSPACE_SID,
  WORKER_PROPERTIES,
  WORKER_ATTRIBUTES,
  CSV_FILENAME_PREFIX
} = process.env;

const client = Twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

const workersToExport = new Map();

const getWorkersByExpression = async () => {
  return client.taskrouter
    .workspaces(TASKROUTER_WORKSPACE_SID)
    .workers
    .list({
      pageSize: 1000,
      /* Uncomment the line below to search based on a target worker expression
         and modify the expression as appropriate for your query */
      //targetWorkersExpression: 'manager == ""'
    });
};

const populateWorkerMetadata = (worker) => {
  const populatedWorker = {};

  const desiredProperties = WORKER_PROPERTIES.split(',');
  for (const prop of desiredProperties) {
    populatedWorker[prop] = worker[prop]
  }

  const desiredAttributes = WORKER_ATTRIBUTES.split(',');
  const workerAttributes = JSON.parse(worker.attributes);
  for (const attr of desiredAttributes) {
    if (attr.includes('.')) {
      const splitAttr = attr.split('.');

      populatedWorker[attr] = workerAttributes[splitAttr[0]]
        ? workerAttributes[splitAttr[0]][splitAttr[1]]
        : "";
    } else {
      populatedWorker[attr] = workerAttributes[attr];
    }
  }

  workersToExport.set(worker.sid, populatedWorker);
}

const exportWorkersToFile = async () => {
  const workersArray = Array.from(workersToExport.values());

  console.log('Parsing workers array to CSV format');
  const workersCsv = parse(workersArray);

  const fileNameWithTimestamp = `${CSV_FILENAME_PREFIX}_${moment().format('YYYY-MM-DDTHH-mm-ssZZ')}.csv`
  console.log('Writing workers to file', fileNameWithTimestamp);
  await writeFile(fileNameWithTimestamp, workersCsv);
  console.log('Workers CSV file created');
}

const runScript = async () => {
  console.log('Retrieving workers');
  const workers = await getWorkersByExpression();
  console.log(`Retrieved ${workers.length} workers`);

  console.log('Populating worker metadata');
  for (const worker of workers) {
    populateWorkerMetadata(worker);
  }

  await exportWorkersToFile();
}

runScript();

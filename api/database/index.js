const { Spanner } = require('@google-cloud/spanner');
const config = require('../../config');

const spanner = new Spanner({
  projectId: config.get('GCLOUD_PROJECT_ID'),
});

const instanceId = config.get('GCLOUD_SPANNER_INSTANCE_ID');
const databaseId = config.get('GCLOUD_SPANNER_DATABASE_ID');
const instance = spanner.instance(instanceId);
const db = instance.database(databaseId, { min: 10 });

const checkReadiness = () => db.run({ sql: 'SELECT 1' });

module.exports = {
  checkReadiness,
  db,
};

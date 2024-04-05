/**
 * How to run script:
 * 1. Open MongoDB Compass
 *
 * 2. Back up the db first before you do anything. Export the
 * original json/csv of the collection that you will be touching
 *
 * 3. Open the mongo shell at the bottom. Please test at
 * the test db first before you start on prod db
 *
 * 4. Connect to the MongoDB server by running either one
 * of these commands:
 * use hmcchk_db;
 * use hmcchk_db_test;
 *
 * 5. Copy and paste the script below to the shell
 */

// Add id for all formFields
db.form.updateMany(
  { formFields: { $ne: null, $type: 'array' } },
  { $set: { 'formFields.$[].id': ObjectId() } }
);

// Find documents in the collection
const documents = db.form.find({ formFields: { $ne: null, $type: 'array' } });

// Loop through the documents
documents.forEach((doc) => {
  // Loop through the options field in formFields array
  doc.formFields.forEach((field) => {
    if (field.fieldName !== 'prefill') return; // Skip if not prefill field

    field.options.forEach((option) => {
      console.log(`${doc._id} | ${option} -- UPDATING`);

      // Create a new formField object
      const newFormField = {
        id: ObjectId(),
        fieldName: option,
        fieldType: 'prefill',
        required: true,
      };

      // Insert the new formField object into the formFields array
      doc.formFields.push(newFormField);
    });
  });

  // Remove the original prefill field
  doc.formFields = doc.formFields.filter((field) => {
    return field.fieldName !== 'prefill';
  });

  // Update the document with the modified formFields array
  db.form.updateOne({ _id: doc._id }, { $set: { formFields: doc.formFields } });

  console.log(`${doc._id} -- UPDATED`);
});

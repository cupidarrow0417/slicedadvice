const mongoose = require("mongoose");
module.exports = {
  async up(db, client) {
    // TODO write your migration here.
    // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: true}});

    // await db.collection("expertise posts").updateMany({}, {
    //   $set: { linkedPosts: [] },
    // })

    // Update all expertise posts categories to have the category "Engineering"
    await db.collection("expertise posts").updateMany({}, {
      $set: { category: "Engineering" },
    })
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});

    // Update all expertise posts categories to have the category "Career Growth"
    await db.collection("expertise posts").updateMany({}, {
      $set: { category: "Career Growth" },
    })
  }
};

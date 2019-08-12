const getTableData = async (req, res, db) => {
  try {
    let data = await db.select("*").from("testtable1");
    if (!data.length) {
      res.json({ dataExists: "false" });
    }
    res.json(data);
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ dbError: "db error" });
  }
};

const postTableData = async (req, res, db) => {
  console.log(req.body);
  const { first, last, email, phone, location, hobby } = req.body;
  const added = new Date();

  try {
    let item = await db("testtable1")
      .insert({ first, last, email, phone, location, hobby, added })
      .returning("*");
    res.json(item);
  } catch (err) {
    res.status(400).json({ dbError: "db error" });
  }
};

// const postTableData = (req, res, db) => {
//   const { first, last, email, phone, location, hobby } = req.body;
//   const added = new Date();
//   db("testtable1")
//     .insert({ first, last, email, phone, location, hobby, added })
//     .returning("*")
//     .then(item => {
//       res.json(item);
//     })
//     .catch(err => res.status(400).json({ dbError: "db error" }));
// };

const putTableData = async (req, res, db) => {
  const { id, first, last, email, phone, location, hobby } = req.body;

  try {
    let item = await db("testtable1")
      .where({ id })
      .update({ first, last, email, phone, location, hobby })
      .returning("*");
    res.json(item);
  } catch (err) {
    res.status(400).json({ dbError: "db error" });
  }
};

const deleteTableData = async (req, res, db) => {
  const { id } = req.body;

  try {
    let item = await db("testtable1")
      .where({ id })
      .del()
      .returning("*");

    res.json(item);
  } catch (err) {
    res.status(400).json({ dbError: "db error" });
  }
};

module.exports = { getTableData, postTableData, putTableData, deleteTableData };

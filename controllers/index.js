const getTableData = async (req, res, db) => {
  try {
    let res = await db.select("*").from("testtable1");
    let items = res.json(items);

    if (!items.length) {
      res.json({ dataExists: "false" });
    }
  } catch (err) {
    res.status(400).json({ dbError: "db error" });
  }
};

const postTableData = async (req, res, db) => {
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

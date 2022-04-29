const Airtable = require("airtable");
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_KEY
);

const table = base("coffee-stores");

const createCoffeeStore = async (req, res) => {
  if (req.method === "POST") {
    const { id, name, neighborhood, imgUrl, voting } = req.body;

    res.status(200).json({ message: "Hello there" });
  } else {
    res.status(400).json({ message: "Id is missing" });
  }
};

export default createCoffeeStore;

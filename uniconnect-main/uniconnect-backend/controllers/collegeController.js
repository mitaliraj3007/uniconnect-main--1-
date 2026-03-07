export const getColleges = (req, res) => {
  res.json([
    { id: 1, name: "IIT Delhi" },
    { id: 2, name: "NIT Trichy" },
    { id: 3, name: "Meerut University" },
  ]);
};
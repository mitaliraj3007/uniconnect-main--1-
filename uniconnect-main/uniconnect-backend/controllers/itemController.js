// Add this new controller function
export const updateItemStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Make sure it's a valid status
    if (!['Available', 'Rented', 'Sold'].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const updatedItem = await Item.findByIdAndUpdate(
      id, 
      { status }, 
      { new: true }
    );

    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: "Failed to update status", error });
  }
};
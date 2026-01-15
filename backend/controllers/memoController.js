
import Memory from "../models/Memory.js";

export const getAllMemos = async (req, res) => {
   try {
       const memos = await Memory.find();
       res.status(200).json(memos);
   } catch (error) {
       console.error("Error in getAllMemos", error);
       res.status(500).json({
           message: "Internal server error"
       })
   }
};

export const postMemo = async (req, res) => {
    try {
      const {title, content, creator} = req.body;
      const newMemo = new Memory({title, content, creator});
      const savedMemo = await newMemo.save();
      res.status(201).json({
         savedMemo
      });
    } catch (error) {
        console.error("Error in postMemo", error);
        res.status(500).json({
            message: "Internal server error"
        })
    }
}

export const updateMemo = async (req, res) => {
    const { id } = req.params;
    const { title, description, creator } = req.body;

    try {
        const updatedMemory = await Memory.findByIdAndUpdate(
            id,
            { title, description, creator },
            { new: true }
        );

        if (!updatedMemory) {
            return res.status(404).json({ message: "Memory not found" });
        }

        res.status(200).json(updatedMemory);
    } catch (error) {
        console.error("Error in updateMemo", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const deleteMemo = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedMemory = await Memory.findByIdAndDelete(id);
        if (!deletedMemory) {
            return res.status(404).json({ message: "Memory not found" });
        }
        res.status(200).json({ message: "Memory deleted successfully", deletedMemory });
    } catch (error) {
        console.error("Error in deleteMemo:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getById = async (req, res) => {
    const { id } = req.params;
    try {
        const memory = await Memory.findById(id);
        if(!memory) {
            return res.status(404).json({ message: "Memory not found" });
        }
        res.status(200).json({
            message: "Fetched the Memory",
            memory});
    } catch(error) {
        console.error("Error in getById", error);
        res.status(500).json({
            message: "Internal server error"
        })
    }
}
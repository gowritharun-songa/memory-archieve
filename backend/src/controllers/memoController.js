export const getAllMemos = (req, res) => {
    res.status(200).json({
        message: "fetched all the notes"
    })
};

export const postMemo = (req, res) => {
    res.status(200).json({
        msg: "posted the memory"
    })
}

export const updateMemo = (req, res) => {
    res.status(200).json({
        msg: "updated the memory"
    })
}

export const deleteMemo = (req, res) => {
    res.status(200).json({
        "message": "deleted the memory"
    })
};
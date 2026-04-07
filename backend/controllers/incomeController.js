const xlsx = require('xlsx');
const Income = require("..//models/Income");

// Add Income
exports.addIncome = async (req,res) => {
    const userId = req.user.id;

    try{
        const { icon, source, amount, date } = req.body;

        // Validation check for missing fields
        if(!source || !amount || !date){
            return res.status(400).json({ message: "All fields are required" });
        }

        const newIncome = new Income({
            userId,
            icon,
            source,
            amount,
            date: new Date(date)
        });

        await newIncome.save();
        res.status(200).json(newIncome);
    } catch (error){
        res.status(500).json({ message: "Server Error" });
    }
};

// Get all Income
exports.getAllIncome = async (req,res) => {
    const userId = req.user.id;

    try{
        const income = await Income.find({ userId }).sort({ date: -1 });
        res.json(income);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
}

// Delete Income
exports.deleteIncome = async (req,res) => {
    const userId = req.user.id;

    try{
        const deletedIncome = await Income.findOneAndDelete({
            _id: req.params.id,
            userId,
        });

        if (!deletedIncome) {
            return res.status(404).json({ message: "Income not found" });
        }

        res.json({ message: "Income deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error"});
    }
}

// Download Income Excel 
exports.downloadIncomeExcel = async (req,res) => {
    const userId = req.user.id;

    try{
        const income = await Income.find({ userId }).sort({ date: -1 });

        // Prepare data for Excel
        const data = income.map((item) => ({
            Source: item.source,
            Amount: item.amount,
            Date: new Date(item.date).toLocaleDateString("en-GB"),
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        ws["!cols"] = [
            { wch: 20 },
            { wch: 12 },
            { wch: 15 },
        ];
        xlsx.utils.book_append_sheet(wb, ws, "Income");
        const buffer = xlsx.write(wb, { bookType: "xlsx", type: "buffer" });

        res.setHeader(
            "Content-Disposition",
            'attachment; filename="income_details.xlsx"'
        );
        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        res.send(buffer);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }

}

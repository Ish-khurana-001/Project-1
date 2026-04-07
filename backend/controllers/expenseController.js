const xlsx = require('xlsx');
const Expense = require("..//models/Expense");

// Add Expense
exports.addExpense = async (req,res) => {
    const userId = req.user.id;

    try{
        const { icon, category, amount, date } = req.body;

        // Validation check for missing fields
        if(!category || !amount || !date){
            return res.status(400).json({ message: "All fields are required" });
        }

        const newExpense = new Expense({
            userId,
            icon,
            category,
            amount,
            date: new Date(date)
        });

        await newExpense.save();
        res.status(200).json(newExpense);
    } catch (error){
        res.status(500).json({ message: "Server Error" });
    }
};

// Get all Expenses
exports.getAllExpense = async (req,res) => {
    const userId = req.user.id;

    try{
        const expense = await Expense.find({ userId }).sort({ date: -1 });
        res.json(expense);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
}

// Delete Expense
exports.deleteExpense = async (req,res) => {
    const userId = req.user.id;

    try{
        const deletedExpense = await Expense.findOneAndDelete({
            _id: req.params.id,
            userId,
        });

        if (!deletedExpense) {
            return res.status(404).json({ message: "Expense not found" });
        }

        res.json({ message: "Expense deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error"});
    }
}

// Download Expense Excel 
exports.downloadExpenseExcel = async (req,res) => {
    const userId = req.user.id;

    try{
        const expense = await Expense.find({ userId }).sort({ date: -1 });

        // Prepare data for Excel
        const data = expense.map((item) => ({
            Category: item.category,
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
        xlsx.utils.book_append_sheet(wb, ws, "Expense");
        const buffer = xlsx.write(wb, { bookType: "xlsx", type: "buffer" });

        res.setHeader(
            "Content-Disposition",
            'attachment; filename="expense_details.xlsx"'
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

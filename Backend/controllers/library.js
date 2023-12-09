const BookManager = require('../models/library');

exports.postAddBook = async(req,res)=>{
    try{
        const book = BookManager.create({...req.body});
        res.json(book);
        // console.log(req.body);
    }
    catch(err){
        console.log(err);
    }
}

exports.getAddBook = async(req,res)=>{
    try{
        const books = await BookManager.findAll();
        res.json(books);
    }
    catch(err){
        console.log(err)
    }
}

exports.returnBook = async (req, res) => {
    try {
        const id = req.query.id;
        const fine = req.query.fine;

        // Update the book record
        const result = await BookManager.update(
            { fine: fine, returned_book: true, returned_date:new Date().toLocaleString() },
            { where: { id: id } }
        );
        const returnedBook = await BookManager.findByPk(id);
        console.log(returnedBook);
        res.json(returnedBook);

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error.' });
    }
};